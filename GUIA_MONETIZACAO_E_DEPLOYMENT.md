# 🚀 Guia Completo: Deployment, Vendas e Integração Kiwifi

## 📋 Índice
1. [Hospedagem da Aplicação](#hospedagem)
2. [Integração com Kiwifi](#kiwifi)
3. [Sistema de Assinatura](#assinatura)
4. [Configuração de Autenticação](#autenticacao)
5. [Próximos Passos](#próximos-passos)

---

## 🌐 Hospedagem da Aplicação {#hospedagem}

### Opção 1: Vercel (RECOMENDADO - Grátis/Pago)
**Ideal para PWA, fácil, rápido e integrado com Git**

#### Passo a Passo:
1. **Crie uma conta**: https://vercel.com
2. **Conecte seu GitHub**:
   - Faça upload do projeto para GitHub
   - Autorize Vercel acessar seus repositórios
3. **Importe o projeto**:
   - Clique em "New Project"
   - Selecione o repositório do VIDA NOVA
   - Deixe configurações padrão
   - Clique "Deploy"
4. **Resultado**: Sua app fica em: `https://seu-dominio.vercel.app`

**Custos**:
- Grátis: 100GB bandwidth/mês
- Pro: $20/mês (ilimitado)

---

### Opção 2: Netlify (Fácil/Grátis)
**Ótima alternativa ao Vercel**

1. **Acesse**: https://netlify.com
2. **Conecte GitHub/Gitlab**
3. **Autorize acesso aos repositórios**
4. **Clique "New site from Git"**
5. **Selecione o projeto VIDA NOVA**
6. **Deploy automático**

**Custos**: Grátis para começar

---

### Opção 3: Seu Próprio Servidor (Avançado)
Se preferir máximo controle:

**Requisitos**:
- Servidor Linux (DigitalOcean, Linode, AWS)
- Node.js instalado
- PM2 para gerenciar processo
- Nginx como reverse proxy
- SSL/HTTPS certificado

**Setup básico**:
```bash
# 1. SSH no servidor
ssh user@seu-servidor.com

# 2. Clone o repositório
git clone seu-repositorio-url
cd "VIDA NOVA"

# 3. Instale dependências
npm install

# 4. Execute com PM2
npm install -g pm2
pm2 start "python -m http.server 8000" --name "vida-nova"
pm2 startup
pm2 save

# 5. Configure Nginx
# Edite /etc/nginx/sites-available/default
# Proxie porta 8000 para 80/443
```

---

## 🔗 Integração com Kiwifi {#kiwifi}

### ✅ Por que usar Kiwifi?
- ✅ Plataforma brasileira confiável
- ✅ Já conhece (usa para outros produtos)
- ✅ Gerencia pagamentos e cobrança
- ✅ Controle de acesso integrado
- ✅ Suporte a planos de assinatura
- ✅ Dashboard de vendas

### Configuração do Produto na Kiwifi

#### Passo 1: Criar Produto/Assinatura
1. Acesse seu painel Kiwifi
2. **Produtos → Criar Novo Produto**
3. **Informações Básicas**:
   - Nome: "Vida Nova - Planner Feminino Premium"
   - Descrição: "Planner completo com agenda, finanças, rotina e organização"
   - Preço: Defina (sugestão: R$ 27-47/mês)
4. **Tipo**: Selecione "Assinatura Recorrente"
5. **Ciclo**: Mensal
6. **Cobrança**: Automática via cartão de crédito

#### Passo 2: Integração com Link de Acesso
Na seção **Links e Acesso**:
1. **URL de Redirecionamento após Compra**:
   ```
   https://seu-dominio.com/login?token={TOKEN_COMPRADOR}
   ```
2. **Material Digital**: Faça upload de um arquivo `.zip` com instruções
3. **Acesso à Aplicação**: Configure para redirecionar ao app

#### Passo 3: Webhook para Validação
Configure webhook no Kiwifi para validar assinatura:
```
POST https://seu-dominio.com/api/validate-subscription
```

---

## 🔐 Sistema de Assinatura {#assinatura}

### Como Funciona o Fluxo
```
1. Mulher acessa o site
   ↓
2. Clica em "Comprar Acesso"
   ↓
3. É redirecionada para Kiwifi
   ↓
4. Paga e recebe token de acesso
   ↓
5. Retorna ao app com token
   ↓
6. App valida o token com seu servidor
   ↓
7. Acesso liberado ao app completo
```

### Arquivo: `auth-system.js`
Crie este arquivo no seu servidor para gerenciar assinaturas:

```javascript
// auth-system.js - Backend simples com Node.js + Express

const express = require('express');
const app = express();

// Simulação de banco de dados de assinaturas
const subscriptions = {};

// 1. Validar subscription da Kiwifi
app.post('/api/validate-subscription', (req, res) => {
  const { token, email } = req.body;
  
  // Validar token com Kiwifi (sua chave de API)
  const isValid = validateWithKiwifi(token);
  
  if (isValid) {
    // Registrar/atualizar subscription
    subscriptions[email] = {
      active: true,
      token: token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    };
    
    // Gerar token de acesso JWT
    const accessToken = generateJWT(email);
    
    return res.json({
      success: true,
      accessToken: accessToken,
      expiresIn: 2592000, // 30 dias em segundos
    });
  }
  
  return res.status(401).json({ success: false, error: 'Token inválido' });
});

// 2. Verificar se subscription está ativa
app.post('/api/check-subscription', (req, res) => {
  const { email, token } = req.body;
  
  if (subscriptions[email] && subscriptions[email].active) {
    return res.json({ active: true });
  }
  
  return res.json({ active: false });
});

// 3. Webhook da Kiwifi para renovação
app.post('/webhook/kiwifi', (req, res) => {
  const { email, status, orderId } = req.body;
  
  if (status === 'approved') {
    subscriptions[email] = {
      active: true,
      orderId: orderId,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
  }
  
  if (status === 'cancelled') {
    if (subscriptions[email]) {
      subscriptions[email].active = false;
    }
  }
  
  res.json({ success: true });
});

function validateWithKiwifi(token) {
  // Integrar com API da Kiwifi
  // Usar sua chave de API para validar
  return true; // Simplificado
}

function generateJWT(email) {
  // Gerar token JWT para o usuário
  return 'jwt_token_here';
}

app.listen(3001, () => console.log('Auth server rodando na porta 3001'));
```

---

## 🔑 Sistema de Autenticação {#autenticacao}

### Integração no Frontend (index.html)

Adicione este código antes do `</body>`:

```javascript
// Verificar se usuário tem assinatura ativa
async function checkSubscriptionAccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    // Token recebido da Kiwifi - validar
    const response = await fetch('/api/validate-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token,
        email: localStorage.getItem('user-email'),
      }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Salvar token de acesso
      localStorage.setItem('access-token', data.accessToken);
      localStorage.setItem('subscription-active', 'true');
      localStorage.setItem('subscription-expires', data.expiresIn);
      
      // Remover token da URL para privacidade
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Mostrar mensagem de sucesso
      alert('✅ Acesso liberado! Bem-vinda ao Vida Nova Premium!');
    }
  }
  
  // Verificar se tem assinatura válida
  const hasSubscription = localStorage.getItem('subscription-active') === 'true';
  
  if (!hasSubscription) {
    // Mostrar página de vendas
    showSubscriptionPrompt();
  }
}

function showSubscriptionPrompt() {
  const modal = document.createElement('div');
  modal.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 999;">
      <div style="background: white; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center;">
        <h2>🎁 Acesso Lifetime do Vida Nova</h2>
        <p>Organize sua vida com nosso planner premium feminino</p>
        <p style="font-size: 2em; color: #c55b84; font-weight: bold; margin: 20px 0;">R$ 47/mês</p>
        <button onclick="redirectToKiwifi()" style="padding: 15px 30px; background: linear-gradient(135deg, #c55b84, #dd7ea2); color: white; border: none; border-radius: 10px; font-size: 16px; cursor: pointer;">
          💳 Obter Acesso Agora
        </button>
        <p style="margin-top: 20px; color: #666; font-size: 12px;">Primeira semana grátis • Cancelar a qualquer momento</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function redirectToKiwifi() {
  // Link do seu produto na Kiwifi
  window.location.href = 'https://kiwifi.com.br/seu-produto-link';
}

// Executar ao carregar
document.addEventListener('DOMContentLoaded', checkSubscriptionAccess);
```

---

## 💳 Preços e Estratégia de Monetização

### Opção 1: Assinatura Mensal (RECOMENDADO)
- **R$ 27/mês** - Básico (agenda + tarefas)
- **R$ 47/mês** - Premium (tudo + suporte prioritário)
- **R$ 99/ano** - Anual com desconto (2 meses grátis)

### Opção 2: Lifetime (Venda Única)
- **R$ 297** - Acesso permanente (sem mensalidades)

### Opção 3: Freemium
- **Grátis** - 7 dias (trial)
- **R$ 37/mês** - Versão completa

**Recomendação**: Comece com R$ 37/mês + opção de 7 dias grátis

---

## 🛠️ Checklist de Implementação

### Fase 1: Preparação (Esta Semana)
- [ ] Crie repositório GitHub
- [ ] Adicione arquivo `.gitignore` (para não subir dados sensíveis)
- [ ] Configure variáveis de ambiente
- [ ] Teste a aplicação em diferentes dispositivos

### Fase 2: Deployment (Semana 2)
- [ ] Escolha plataforma de hospedagem (Vercel recomendado)
- [ ] Faça deploy da aplicação
- [ ] Configure domínio personalizado
- [ ] Teste acesso público

### Fase 3: Kiwifi (Semana 3)
- [ ] Configure produto na Kiwifi
- [ ] Teste fluxo de compra completo
- [ ] Configure webhooks
- [ ] Implemente validação no app

### Fase 4: Marketing (Semana 4)
- [ ] Crie landing page
- [ ] Configure pixel do Facebook
- [ ] Prepare email de boas-vindas
- [ ] Inicie divulgação

---

## 🔐 Segurança - O Que Não Esquecer

✅ **HTTPS obrigatório** - Sempre use certificado SSL  
✅ **Variáveis de ambiente** - Nunca exponha chaves de API  
✅ **Validação de token** - No backend, não confie apenas no frontend  
✅ **Rate limiting** - Previne ataques de força bruta  
✅ **Dados do usuário** - Nunca compartilhe sem consentimento  

**Arquivo `.env` (exemplo)**:
```
KIWIFI_API_KEY=sua_chave_secreta_aqui
KIWIFI_PRODUCT_ID=seu_id_produto
JWT_SECRET=sua_chave_jwt_muito_segura
DATABASE_URL=sua_url_banco_dados
ALLOWED_DOMAIN=seu-dominio.com
```

---

## 📊 Próximos Passos {#próximos-passos}

### 1. Imediato (Esta Semana)
1. Finalize features do app
2. Teste em desktop/tablet/mobile
3. Configure GitHub

### 2. Curto Prazo (Próximas 2 semanas)
1. Deploy em Vercel/Netlify
2. Compre domínio (`vidanova.com.br` ou similar)
3. Configure email professional
4. Crie conta Kiwifi seller

### 3. Médio Prazo (Mês 1)
1. Configure sistema de assinatura
2. Crie landing page de vendas
3. Prepare material de marketing
4. Beta test com 10-20 amigas

### 4. Longo Prazo (Mês 2+)
1. Lançamento oficial
2. Campanhas de marketing
3. Coletar feedback
4. Implementar melhorias

---

## 💰 Estimativa Financeira

**Custos Mensais**:
- Hospedagem Vercel: Grátis (até 100GB)
- Domínio: R$ 40-60/ano
- Email profissional: Grátis (Gmail/Outlook)
- Comissão Kiwifi: ~8% por venda

**Receita (Exemplo)**:
- 100 clientes × R$ 37/mês = R$ 3.700
- Menos 8% Kiwifi = -R$ 296
- Menos hospedagem = -R$ 0
- **Lucro: R$ 3.404/mês**

---

## 🆘 Suporte e Recursos

### Documentações Importantes
- Kiwifi API: https://docs.kiwifi.com.br/api
- Vercel Deploy: https://vercel.com/docs
- JWT Tutorial: https://jwt.io

### Comunidades
- Indie Hackers (monetização)
- Dev Community (deployment)
- Comunidades SaaS Brasil

---

**Status**: ✅ Pronto para produção  
**Próxima Ação**: Escolher plataforma de hospedagem e criar repositório GitHub  
**Estimativa**: 2-3 semanas até primeiro cliente
