const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET =
  process.env.JWT_SECRET || "sua_chave_secreta_super_segura_mudar_em_producao";
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL não configurada. Defina a connection string do Neon.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: shouldUseSsl(DATABASE_URL)
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname)));

function shouldUseSsl(connectionString) {
  return !/sslmode=disable/i.test(connectionString);
}

async function query(text, params = []) {
  return pool.query(text, params);
}

async function initDb() {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      subscription_active BOOLEAN DEFAULT FALSE,
      subscription_expires TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS app_data (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      data_type TEXT NOT NULL,
      data_key TEXT NOT NULL,
      data_value JSONB,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, data_type, data_key)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      action TEXT NOT NULL,
      details TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE INDEX IF NOT EXISTS idx_app_data_user_type
    ON app_data (user_id, data_type)
  `);

  await query(`
    CREATE INDEX IF NOT EXISTS idx_activity_log_user
    ON activity_log (user_id, created_at DESC)
  `);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getTokenPayload(token) {
  return jwt.verify(token, JWT_SECRET);
}

async function logActivity(userId, action, details) {
  try {
    await query(
      `INSERT INTO activity_log (user_id, action, details) VALUES ($1, $2, $3)`,
      [userId, action, details],
    );
  } catch (error) {
    console.error("Erro ao registrar atividade:", error.message);
  }
}

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Senhas não correspondem" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    const existingUser = await query(`SELECT id FROM users WHERE email = $1`, [
      normalizedEmail,
    ]);

    if (existingUser.rows[0]) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertResult = await query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, subscription_active`,
      [String(name).trim(), normalizedEmail, hashedPassword],
    );

    const user = insertResult.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    await logActivity(user.id, "user_registered", `Novo usuário registrado: ${user.name}`);

    res.status(201).json({
      success: true,
      message: "Cadastro realizado com sucesso!",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res
        .status(400)
        .json({ error: "Email e senha são obrigatórios" });
    }

    const userResult = await query(`SELECT * FROM users WHERE email = $1`, [
      normalizedEmail,
    ]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    await logActivity(
      user.id,
      "user_login",
      `Login realizado às ${new Date().toISOString()}`,
    );

    res.json({
      success: true,
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        subscription_active: user.subscription_active,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/auth/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const decoded = getTokenPayload(token);
    const result = await query(
      `SELECT id, name, email, subscription_active FROM users WHERE id = $1`,
      [decoded.id],
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

app.post("/api/auth/logout", async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = getTokenPayload(token);
    await logActivity(
      decoded.id,
      "user_logout",
      `Logout realizado às ${new Date().toISOString()}`,
    );
    res.json({ success: true, message: "Logout realizado com sucesso!" });
  } catch (error) {
    res.json({ success: true });
  }
});

app.post("/api/data/save", async (req, res) => {
  try {
    const { token, dataType, dataKey, dataValue } = req.body;
    const decoded = getTokenPayload(token);

    await query(
      `INSERT INTO app_data (user_id, data_type, data_key, data_value, updated_at)
       VALUES ($1, $2, $3, $4::jsonb, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, data_type, data_key)
       DO UPDATE SET
         data_value = EXCLUDED.data_value,
         updated_at = CURRENT_TIMESTAMP`,
      [decoded.id, dataType, dataKey, JSON.stringify(dataValue)],
    );

    res.json({ success: true, message: "Dados salvos com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.post("/api/data/get", async (req, res) => {
  try {
    const { token, dataType } = req.body;
    const decoded = getTokenPayload(token);

    const result = await query(
      `SELECT data_key, data_value FROM app_data WHERE user_id = $1 AND data_type = $2`,
      [decoded.id, dataType],
    );

    const data = {};
    result.rows.forEach((row) => {
      data[row.data_key] = row.data_value;
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.post("/api/user/update", async (req, res) => {
  try {
    const { token, name, password } = req.body;
    const decoded = getTokenPayload(token);
    const updates = [];
    const params = [];

    if (name) {
      params.push(String(name).trim());
      updates.push(`name = $${params.length}`);
    }

    if (password) {
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Senha deve ter no mínimo 6 caracteres" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      params.push(hashedPassword);
      updates.push(`password = $${params.length}`);
    }

    if (!updates.length) {
      return res.json({ success: true, message: "Nada para atualizar." });
    }

    params.push(decoded.id);
    const result = await query(
      `UPDATE users
       SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${params.length}
       RETURNING id, name, email, subscription_active`,
      params,
    );

    res.json({
      success: true,
      message: "Perfil atualizado com sucesso!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.post("/api/user/delete", async (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = getTokenPayload(token);

    const result = await query(`SELECT password FROM users WHERE id = $1`, [
      decoded.id,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    await query(`DELETE FROM users WHERE id = $1`, [decoded.id]);

    res.json({
      success: true,
      message: "Conta deletada permanentemente!",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await query("SELECT 1");
    res.json({
      status: "ok",
      message: "Servidor Vida Nova funcionando com Neon/Postgres!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Falha na conexão com o banco de dados.",
    });
  }
});

async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Servidor Vida Nova rodando na porta ${PORT}`);
      console.log("Banco de dados: Neon / PostgreSQL");
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await pool.end();
  console.log("Conexão com banco encerrada.");
  process.exit(0);
});

startServer();
