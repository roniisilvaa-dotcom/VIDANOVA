// server.js - Backend Vida Nova com Node.js + Express

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_super_segura_mudar_em_producao";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Inicializar banco de dados SQLite
const dbPath = path.join(__dirname, "vida-nova.db");
const db = new sqlite3.Database(dbPath);

// Criar tabelas
db.serialize(() => {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      subscription_active BOOLEAN DEFAULT 0,
      subscription_expires TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de dados da aplicação (agenda, financas, etc)
  db.run(`
    CREATE TABLE IF NOT EXISTS app_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      data_type TEXT NOT NULL,
      data_key TEXT NOT NULL,
      data_value TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  // Tabela de log de atividades
  db.run(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      action TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

// ==================== ROTAS DE AUTENTICAÇÃO ====================

// 1. CADASTRO - Registrar novo usuário
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validações
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Senhas não correspondem" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    // Verificar se email já existe
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Erro no servidor" });
      }

      if (row) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserir novo usuário
      db.run(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword],
        function (err) {
          if (err) {
            return res.status(500).json({ error: "Erro ao criar usuário" });
          }

          // Gerar token JWT
          const token = jwt.sign(
            { id: this.lastID, email: email, name: name },
            JWT_SECRET,
            { expiresIn: "30d" }
          );

          // Log de atividade
          db.run(`INSERT INTO activity_log (user_id, action, details) VALUES (?, ?, ?)`, [
            this.lastID,
            "user_registered",
            `Novo usuário registrado: ${name}`,
          ]);

          res.status(201).json({
            success: true,
            message: "Cadastro realizado com sucesso!",
            token: token,
            user: {
              id: this.lastID,
              name: name,
              email: email,
            },
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// 2. LOGIN - Autenticar usuário
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Buscar usuário
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Erro no servidor" });
      }

      if (!user) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      // Verificar senha
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ error: "Email ou senha incorretos" });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "30d" }
      );

      // Log de atividade
      db.run(`INSERT INTO activity_log (user_id, action, details) VALUES (?, ?, ?)`, [
        user.id,
        "user_login",
        `Login realizado às ${new Date().toISOString()}`,
      ]);

      res.json({
        success: true,
        message: "Login realizado com sucesso!",
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          subscription_active: user.subscription_active,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// 3. VERIFICAR TOKEN - Validar autenticação
app.post("/api/auth/verify", (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Verificar se usuário ainda existe
    db.get("SELECT id, name, email, subscription_active FROM users WHERE id = ?", 
      [decoded.id], 
      (err, user) => {
        if (err || !user) {
          return res.status(401).json({ error: "Usuário não encontrado" });
        }

        res.json({
          success: true,
          user: user,
        });
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

// 4. LOGOUT - Limpar sessão
app.post("/api/auth/logout", (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    db.run(
      `INSERT INTO activity_log (user_id, action, details) VALUES (?, ?, ?)`,
      [decoded.id, "user_logout", `Logout realizado às ${new Date().toISOString()}`]
    );

    res.json({ success: true, message: "Logout realizado com sucesso!" });
  } catch (error) {
    res.json({ success: true }); // Logout sempre bem-sucedido no frontend
  }
});

// ==================== ROTAS DE DADOS ====================

// 5. SALVAR DADOS (Agenda, Financas, Notas, etc)
app.post("/api/data/save", (req, res) => {
  try {
    const { token, dataType, dataKey, dataValue } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);

    // Verificar se já existe este dado
    db.get(
      `SELECT id FROM app_data WHERE user_id = ? AND data_type = ? AND data_key = ?`,
      [decoded.id, dataType, dataKey],
      (err, row) => {
        if (err) return res.status(500).json({ error: "Erro no servidor" });

        if (row) {
          // Atualizar existente
          db.run(
            `UPDATE app_data SET data_value = ?, updated_at = CURRENT_TIMESTAMP 
             WHERE user_id = ? AND data_type = ? AND data_key = ?`,
            [JSON.stringify(dataValue), decoded.id, dataType, dataKey],
            (err) => {
              if (err) return res.status(500).json({ error: "Erro ao salvar dados" });
              res.json({ success: true, message: "Dados atualizados!" });
            }
          );
        } else {
          // Inserir novo
          db.run(
            `INSERT INTO app_data (user_id, data_type, data_key, data_value) 
             VALUES (?, ?, ?, ?)`,
            [decoded.id, dataType, dataKey, JSON.stringify(dataValue)],
            (err) => {
              if (err) return res.status(500).json({ error: "Erro ao salvar dados" });
              res.json({ success: true, message: "Dados salvos!" });
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Não autorizado" });
  }
});

// 6. BUSCAR DADOS
app.post("/api/data/get", (req, res) => {
  try {
    const { token, dataType } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    db.all(
      `SELECT data_key, data_value FROM app_data WHERE user_id = ? AND data_type = ?`,
      [decoded.id, dataType],
      (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar dados" });

        const data = {};
        rows.forEach((row) => {
          data[row.data_key] = JSON.parse(row.data_value);
        });

        res.json({ success: true, data: data });
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Não autorizado" });
  }
});

// ==================== ROTAS DE USUÁRIO ====================

// 7. ATUALIZAR PERFIL
app.post("/api/user/update", (req, res) => {
  try {
    const { token, name, password } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    let updateQuery = "UPDATE users SET updated_at = CURRENT_TIMESTAMP";
    const params = [];

    if (name) {
      updateQuery += ", name = ?";
      params.push(name);
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ error: "Senha deve ter no mínimo 6 caracteres" });
      }
      updateQuery += ", password = ?";
      params.push(bcrypt.hashSync(password, 10));
    }

    updateQuery += " WHERE id = ?";
    params.push(decoded.id);

    db.run(updateQuery, params, (err) => {
      if (err) return res.status(500).json({ error: "Erro ao atualizar perfil" });

      res.json({ success: true, message: "Perfil atualizado com sucesso!" });
    });
  } catch (error) {
    res.status(401).json({ error: "Não autorizado" });
  }
});

// 8. DELETAR CONTA
app.post("/api/user/delete", (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);

    // Buscar usuário e verificar senha
    db.get("SELECT password FROM users WHERE id = ?", [decoded.id], async (err, user) => {
      if (err || !user) return res.status(500).json({ error: "Erro no servidor" });

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      // Deletar dados do usuário
      db.run("DELETE FROM app_data WHERE user_id = ?", [decoded.id]);
      db.run("DELETE FROM activity_log WHERE user_id = ?", [decoded.id]);
      db.run("DELETE FROM users WHERE id = ?", [decoded.id], (err) => {
        if (err) return res.status(500).json({ error: "Erro ao deletar conta" });

        res.json({ success: true, message: "Conta deletada permanentemente!" });
      });
    });
  } catch (error) {
    res.status(401).json({ error: "Não autorizado" });
  }
});

// ==================== HEALTH CHECK ====================
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor Vida Nova funcionando!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Vida Nova rodando em http://localhost:${PORT}`);
  console.log(`📊 Banco de dados: ${dbPath}`);
});

process.on("SIGINT", () => {
  db.close();
  console.log("Banco de dados fechado.");
  process.exit(0);
});
