#!/bin/bash
# setup.sh - Script de Setup Automático para Vida Nova
# Execute: bash setup.sh

echo "🎉 Bem-vinda ao Vida Nova!"
echo "=================================================="
echo ""

# 1. Verificar se Node.js está instalado
echo "✓ Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "Instale em: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# 2. Instalar dependências
echo "⏳ Instalando dependências (isso leva 2-3 minutos)..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas!"
echo ""

# 3. Criar arquivo .env se não existir
if [ ! -f ".env" ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    
    # Gerar chave JWT segura
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    
    # Colocar chave no .env
    sed -i '' "s/sua_chave_muito_secreta_mudar_em_producao_123456789/$JWT_SECRET/" .env
    
    echo "✅ Arquivo .env criado com JWT_SECRET seguro!"
else
    echo "✅ Arquivo .env já existe"
fi

echo ""
echo "=================================================="
echo "🎊 Setup completo! Pronto para rodar!"
echo "=================================================="
echo ""
echo "Para iniciar o servidor, execute:"
echo ""
echo "  npm start"
echo ""
echo "Depois acesse: http://localhost:3001"
echo ""
echo "Primeira conta de teste:"
echo "  Email: demo@vidanova.com"
echo "  Senha: demo123456"
echo ""
