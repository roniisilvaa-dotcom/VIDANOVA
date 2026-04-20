# 🌟 Vida Nova - Planner Feminino Premium

> Um planner web completo para organizar rotina, agenda, financas, espiritualidade e vida pessoal.

## 🚀 Quick Start (30 segundos)

### Desenvolvimento Local

```bash
# 1. Instale dependências
npm install

# 2. Crie arquivo .env
cp .env.example .env

# 3. Inicie servidor
npm start

# 4. Abra no navegador
http://localhost:3001
```

**Pronto!** App rodando localmente com banco de dados SQLite.

---

## 📱 Recursos

✅ **Agenda** - Calendário interativo com agenda semanal  
✅ **Financas** - Controle de entradas, saídas e planejamento  
✅ **Rotina** - Checklist diário de tarefas  
✅ **Anotações** - Bloco de notas com sincronização  
✅ **Múltiplos Usuários** - Autenticação segura com JWT  
✅ **Offline-first** - Funciona sem internet (PWA)  
✅ **Responsivo** - Desktop, tablet, mobile  

---

## 🔐 Autenticação

### Registro
```bash
POST /api/auth/register
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

### Login
```bash
POST /api/auth/login
{
  "email": "maria@email.com",
  "password": "senha123"
}

Resposta:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Maria Silva",
    "email": "maria@email.com"
  }
}
```

### Usar Token
```javascript
// No frontend, salve o token
localStorage.setItem('auth_token', token);

// Em cada requisição, envie:
fetch('/api/data/get', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

---

## 💾 Armazenamento de Dados

### Como Funciona

1. **Banco de Dados Local** (SQLite)
   - Para desenvolvimento e testes
   - Arquivo único: `vida-nova.db`
   - Backup fácil

2. **Banco de Dados em Produção** (PostgreSQL)
   - Quando fizer deploy em Render
   - Automático e seguro
   - Suporta muitos usuários

### Estrutura do Banco

```
users
├── id (PRIMARY KEY)
├── name
├── email (UNIQUE)
├── password (HASH com bcryptjs)
├── subscription_active
├── subscription_expires
└── created_at

app_data
├── id (PRIMARY KEY)
├── user_id (FOREIGN KEY)
├── data_type (agenda, financas, etc)
├── data_key
├── data_value (JSON)
└── created_at
```

---

## 🌐 Deploy em Render.com

### Passo 1: GitHub Setup
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Crie repositório no GitHub
# Push para GitHub
git push -u origin main
```

### Passo 2: Criar Aplicação em Render

1. Acesse [render.com](https://render.com)
2. Clique "New +"
3. Selecione "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Name**: vida-nova
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Free tier**: Selecione
6. Clique "Create Web Service"

### Passo 3: Configurar Variáveis de Ambiente

No painel do Render:
1. Vá para "Environment"
2. Adicione variáveis do `.env.example`
3. Gere `JWT_SECRET` forte: https://openssl.rand-hex 32
4. Salve

### Passo 4: Banco de Dados

#### Opção A: SQLite (Simples)
- Usa arquivo local
- Pronto para começar
- Sem custos

#### Opção B: PostgreSQL (Recomendado)
1. No painel Render, clique "New +"
2. Selecione "PostgreSQL"
3. Configure com free tier
4. Copie connection string
5. Cole em `DATABASE_URL` no web service

### Passo 5: Deploy

```bash
# Cada push para GitHub dispara novo deploy automático
git push

# Verifique em:
https://vida-nova.onrender.com
```

---

## 💳 Integração Kiwifi (Pagamentos)

### 1. Criar Produto
1. Acesse painel Kiwifi
2. Crie produto "Vida Nova - Acesso Premium"
3. Preço: R$ 37/mês (sugerido)
4. Tipo: Assinatura recorrente

### 2. Configurar Webhook
No Kiwifi → Configurações → Webhooks:
```
URL: https://vida-nova.onrender.com/api/kiwifi/webhook
Eventos: payment.approved, payment.cancelled
```

### 3. Integrar no Frontend
```javascript
// No index.html, adicione:
function redirectToKiwifi() {
  // Link do seu produto Kiwifi
  window.location.href = 'https://kiwifi.com.br/seu-link';
}
```

---

## 📊 Estrutura de Pastas

```
/vida-nova
├── index.html           # App principal
├── login.html           # Página de login
├── mobile.html          # Versão mobile
├── styles.css           # Estilos
├── script.js            # Lógica da app
├── login.js             # Lógica de login
├── server.js            # Backend Node.js
├── package.json         # Dependências
├── manifest.webmanifest # PWA config
├── sw.js                # Service Worker
├── icon.svg             # Ícone
├── .env.example         # Variáveis (exemplo)
├── .gitignore           # Arquivos ignorados
└── vida-nova.db         # Banco de dados (SQLite)
```

---

## 🔒 Segurança

### ✅ Implementado

- [x] Senhas hasheadas com bcryptjs
- [x] Tokens JWT com expiração (30 dias)
- [x] Validação de email em cada requisição
- [x] HTTPS obrigatório em produção
- [x] CORS configurado
- [x] Cada usuário vê apenas seus dados
- [x] Proteção contra SQL injection (SQLite com prepared statements)

### ⚠️ Não Esqueça

- [ ] Mude `JWT_SECRET` no `.env` de produção
- [ ] Use HTTPS sempre
- [ ] Configure `FRONTEND_URL` correto em produção
- [ ] Backup automático do banco de dados
- [ ] Monitore logs de erro

---

## 🐛 Troubleshooting

### "Erro: EADDRINUSE: address already in use"
```bash
# Outra app está usando porta 3001
# Mude em server.js ou use:
PORT=3002 npm start
```

### "Erro: Cannot find module 'express'"
```bash
# Instale dependências
npm install
```

### "Erro: Database locked"
```bash
# SQLite tem apenas um usuário por vez
# Em produção, mude para PostgreSQL
```

### "Login não funciona"
```bash
# Verifique:
1. Server.js está rodando (npm start)
2. Campo email/senha não estão vazios
3. Usuário foi registrado antes
4. Abra DevTools (F12) e veja logs
```

---

## 📈 Escalabilidade

### Fase 1: Desenvolvimento (Grátis)
- SQLite local
- Localhost
- Você + amigos testando

### Fase 2: Beta (R$ 30-50/mês)
- Render free tier
- PostgreSQL free tier
- Até ~1000 mulheres

### Fase 3: Produção (R$ 100-300/mês)
- Render paid tier
- PostgreSQL paid tier
- 5000+ mulheres
- CDN (Cloudflare)

---

## 📞 Suporte

**Documentações úteis:**
- [Express.js](https://expressjs.com)
- [JWT.io](https://jwt.io)
- [SQLite](https://www.sqlite.org)
- [PostgreSQL](https://www.postgresql.org)
- [Render Docs](https://render.com/docs)
- [Kiwifi API](https://docs.kiwifi.com.br)

---

## 📝 Roadmap

- [ ] Backup automático
- [ ] Exportar dados (CSV/PDF)
- [ ] Importar dados
- [ ] Notificações push
- [ ] Integração WhatsApp
- [ ] Dashboard admin
- [ ] Relatórios de uso
- [ ] API pública (para integrações)

---

## 📄 Licença

MIT License - Venda livre, crédito à Vida Nova

---

## 💝 Agradecimentos

Feito com ❤️ para mulheres que querem organizar suas vidas

---

**Versão**: 1.0.0  
**Data**: Abril 2026  
**Status**: Pronto para produção ✅
