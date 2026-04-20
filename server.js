const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET =
  process.env.JWT_SECRET || "sua_chave_secreta_super_segura_mudar_em_producao";
const DATABASE_URL = process.env.DATABASE_URL;
const DATA_FILE = path.join(__dirname, "vida-nova-fallback.json");

const isUsingDatabase = Boolean(DATABASE_URL);
const pool = isUsingDatabase
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: shouldUseSsl(DATABASE_URL)
        ? {
            rejectUnauthorized: false,
          }
        : false,
    })
  : null;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname)));

function shouldUseSsl(connectionString) {
  return !/sslmode=disable/i.test(connectionString);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getTokenPayload(token) {
  return jwt.verify(token, JWT_SECRET);
}

function getDefaultStore() {
  return {
    counters: {
      user: 1,
      appData: 1,
      activity: 1,
    },
    users: [],
    appData: [],
    activityLog: [],
  };
}

async function ensureFallbackFile() {
  if (!fs.existsSync(DATA_FILE)) {
    await fsp.writeFile(DATA_FILE, JSON.stringify(getDefaultStore(), null, 2));
  }
}

async function readStore() {
  await ensureFallbackFile();
  const raw = await fsp.readFile(DATA_FILE, "utf8");
  return raw ? JSON.parse(raw) : getDefaultStore();
}

async function writeStore(store) {
  await fsp.writeFile(DATA_FILE, JSON.stringify(store, null, 2));
}

async function query(text, params = []) {
  return pool.query(text, params);
}

async function initDb() {
  if (!isUsingDatabase) {
    await ensureFallbackFile();
    return;
  }

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar_url TEXT,
      subscription_url TEXT,
      subscription_active BOOLEAN DEFAULT FALSE,
      subscription_expires TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS avatar_url TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS subscription_url TEXT
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

async function findUserByEmail(email) {
  if (isUsingDatabase) {
    const result = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0] || null;
  }

  const store = await readStore();
  return store.users.find((user) => user.email === email) || null;
}

async function findUserById(id) {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT id, name, email, avatar_url, subscription_url, subscription_active
       FROM users
       WHERE id = $1`,
      [id],
    );
    return result.rows[0] || null;
  }

  const store = await readStore();
  const user = store.users.find((item) => item.id === id);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url || "",
    subscription_url: user.subscription_url || "",
    subscription_active: user.subscription_active,
  };
}

async function createUser({ name, email, password, avatarUrl = "", subscriptionUrl = "" }) {
  if (isUsingDatabase) {
    const result = await query(
      `INSERT INTO users (name, email, password, avatar_url, subscription_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, avatar_url, subscription_url, subscription_active`,
      [name, email, password, avatarUrl, subscriptionUrl],
    );

    return result.rows[0];
  }

  const store = await readStore();
  const user = {
    id: store.counters.user++,
    name,
    email,
    password,
    avatar_url: avatarUrl,
    subscription_url: subscriptionUrl,
    subscription_active: false,
    subscription_expires: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.users.push(user);
  await writeStore(store);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url || "",
    subscription_url: user.subscription_url || "",
    subscription_active: user.subscription_active,
  };
}

async function emailInUse(email, excludedUserId = null) {
  if (!email) {
    return false;
  }

  if (isUsingDatabase) {
    const result = excludedUserId
      ? await query(`SELECT id FROM users WHERE email = $1 AND id <> $2 LIMIT 1`, [
          email,
          excludedUserId,
        ])
      : await query(`SELECT id FROM users WHERE email = $1 LIMIT 1`, [email]);

    return Boolean(result.rows[0]);
  }

  const store = await readStore();
  return store.users.some(
    (user) => user.email === email && (excludedUserId === null || user.id !== excludedUserId),
  );
}

async function getUserWithPasswordById(id) {
  if (isUsingDatabase) {
    const result = await query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  const store = await readStore();
  return store.users.find((user) => user.id === id) || null;
}

async function logActivity(userId, action, details) {
  try {
    if (isUsingDatabase) {
      await query(
        `INSERT INTO activity_log (user_id, action, details) VALUES ($1, $2, $3)`,
        [userId, action, details],
      );
      return;
    }

    const store = await readStore();
    store.activityLog.push({
      id: store.counters.activity++,
      user_id: userId,
      action,
      details,
      created_at: new Date().toISOString(),
    });
    await writeStore(store);
  } catch (error) {
    console.error("Erro ao registrar atividade:", error.message);
  }
}

async function saveUserData(userId, dataType, dataKey, dataValue) {
  if (isUsingDatabase) {
    await query(
      `INSERT INTO app_data (user_id, data_type, data_key, data_value, updated_at)
       VALUES ($1, $2, $3, $4::jsonb, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, data_type, data_key)
       DO UPDATE SET
         data_value = EXCLUDED.data_value,
         updated_at = CURRENT_TIMESTAMP`,
      [userId, dataType, dataKey, JSON.stringify(dataValue)],
    );
    return;
  }

  const store = await readStore();
  const existing = store.appData.find(
    (item) =>
      item.user_id === userId &&
      item.data_type === dataType &&
      item.data_key === dataKey,
  );

  if (existing) {
    existing.data_value = dataValue;
    existing.updated_at = new Date().toISOString();
  } else {
    store.appData.push({
      id: store.counters.appData++,
      user_id: userId,
      data_type: dataType,
      data_key: dataKey,
      data_value: dataValue,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  await writeStore(store);
}

async function getUserData(userId, dataType) {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT data_key, data_value FROM app_data WHERE user_id = $1 AND data_type = $2`,
      [userId, dataType],
    );

    const data = {};
    result.rows.forEach((row) => {
      data[row.data_key] = row.data_value;
    });
    return data;
  }

  const store = await readStore();
  const data = {};

  store.appData
    .filter((item) => item.user_id === userId && item.data_type === dataType)
    .forEach((item) => {
      data[item.data_key] = item.data_value;
    });

  return data;
}

async function updateUserProfile(
  userId,
  { name, email, password, avatarUrl, subscriptionUrl },
) {
  if (isUsingDatabase) {
    const updates = [];
    const params = [];

    if (name) {
      params.push(String(name).trim());
      updates.push(`name = $${params.length}`);
    }

    if (password) {
      params.push(password);
      updates.push(`password = $${params.length}`);
    }

    if (email) {
      params.push(normalizeEmail(email));
      updates.push(`email = $${params.length}`);
    }

    if (avatarUrl !== undefined) {
      params.push(avatarUrl || "");
      updates.push(`avatar_url = $${params.length}`);
    }

    if (subscriptionUrl !== undefined) {
      params.push(subscriptionUrl || "");
      updates.push(`subscription_url = $${params.length}`);
    }

    if (!updates.length) {
      return null;
    }

    params.push(userId);
    const result = await query(
      `UPDATE users
       SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${params.length}
       RETURNING id, name, email, avatar_url, subscription_url, subscription_active`,
      params,
    );

    return result.rows[0] || null;
  }

  const store = await readStore();
  const user = store.users.find((item) => item.id === userId);

  if (!user) {
    return null;
  }

  if (name) {
    user.name = String(name).trim();
  }

  if (password) {
    user.password = password;
  }

  if (email) {
    user.email = normalizeEmail(email);
  }

  if (avatarUrl !== undefined) {
    user.avatar_url = avatarUrl || "";
  }

  if (subscriptionUrl !== undefined) {
    user.subscription_url = subscriptionUrl || "";
  }

  user.updated_at = new Date().toISOString();
  await writeStore(store);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar_url: user.avatar_url || "",
    subscription_url: user.subscription_url || "",
    subscription_active: user.subscription_active,
  };
}

async function deleteUserAccount(userId) {
  if (isUsingDatabase) {
    await query(`DELETE FROM users WHERE id = $1`, [userId]);
    return;
  }

  const store = await readStore();
  store.users = store.users.filter((user) => user.id !== userId);
  store.appData = store.appData.filter((item) => item.user_id !== userId);
  store.activityLog = store.activityLog.filter((item) => item.user_id !== userId);
  await writeStore(store);
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

    if (await emailInUse(normalizedEmail)) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      avatarUrl: "",
      subscriptionUrl: "",
    });

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
      storageMode: isUsingDatabase ? "neon" : "fallback",
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

    const user = await findUserByEmail(normalizedEmail);
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
        avatar_url: user.avatar_url || "",
        subscription_url: user.subscription_url || "",
        subscription_active: user.subscription_active,
      },
      storageMode: isUsingDatabase ? "neon" : "fallback",
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
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    res.json({
      success: true,
      user,
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
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

    await saveUserData(decoded.id, dataType, dataKey, dataValue);

    res.json({
      success: true,
      message: "Dados salvos com sucesso!",
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.post("/api/data/get", async (req, res) => {
  try {
    const { token, dataType } = req.body;
    const decoded = getTokenPayload(token);
    const data = await getUserData(decoded.id, dataType);

    res.json({
      success: true,
      data,
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.post("/api/user/update", async (req, res) => {
  try {
    const { token, name, email, password, avatarUrl, subscriptionUrl } = req.body;
    const decoded = getTokenPayload(token);
    const normalizedEmail = normalizeEmail(email);

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    if (normalizedEmail && (await emailInUse(normalizedEmail, decoded.id))) {
      return res.status(400).json({ error: "Este email já está em uso." });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const user = await updateUserProfile(decoded.id, {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      avatarUrl,
      subscriptionUrl,
    });

    if (!user) {
      return res.json({ success: true, message: "Nada para atualizar." });
    }

    res.json({
      success: true,
      message: "Perfil atualizado com sucesso!",
      user,
      storageMode: isUsingDatabase ? "neon" : "fallback",
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
    const user = await getUserWithPasswordById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    await deleteUserAccount(decoded.id);

    res.json({
      success: true,
      message: "Conta deletada permanentemente!",
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    if (isUsingDatabase) {
      await query("SELECT 1");
    } else {
      await ensureFallbackFile();
    }

    res.json({
      status: "ok",
      message: isUsingDatabase
        ? "Servidor Vida Nova funcionando com Neon/Postgres!"
        : "Servidor Vida Nova funcionando em modo fallback local.",
      storageMode: isUsingDatabase ? "neon" : "fallback",
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
      console.log(
        isUsingDatabase
          ? "Banco de dados: Neon / PostgreSQL"
          : `Banco de dados: fallback local em ${DATA_FILE}`,
      );
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  if (pool) {
    await pool.end();
  }
  console.log("Conexão com banco encerrada.");
  process.exit(0);
});

startServer();
