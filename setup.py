#!/usr/bin/env python3
"""
setup.py - Script de Setup Automático (funciona em Windows, Mac e Linux)
Execute: python3 setup.py
"""

import os
import sys
import subprocess
import secrets
import shutil
from pathlib import Path

def print_header(text):
    print("\n" + "=" * 50)
    print(f"🎉 {text}")
    print("=" * 50 + "\n")

def print_success(text):
    print(f"✅ {text}")

def print_error(text):
    print(f"❌ {text}")

def print_info(text):
    print(f"ℹ️  {text}")

def check_nodejs():
    """Verifica se Node.js está instalado"""
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        print_success(f"Node.js encontrado: {result.stdout.strip()}")
        return True
    except FileNotFoundError:
        print_error("Node.js não encontrado!")
        print_info("Instale em: https://nodejs.org")
        return False

def install_dependencies():
    """Instala dependências do projeto"""
    print("\n⏳ Instalando dependências (isso leva 2-3 minutos)...\n")
    
    try:
        subprocess.run(['npm', 'install'], check=True)
        print_success("Dependências instaladas!")
        return True
    except subprocess.CalledProcessError:
        print_error("Erro ao instalar dependências")
        return False

def create_env_file():
    """Cria arquivo .env se não existir"""
    env_path = Path('.env')
    env_example_path = Path('.env.example')
    
    if env_path.exists():
        print_success("Arquivo .env já existe")
        return True
    
    print("\n📝 Criando arquivo .env...")
    
    if not env_example_path.exists():
        print_error("Arquivo .env.example não encontrado")
        return False
    
    # Copiar .env.example para .env
    shutil.copy(env_example_path, env_path)
    
    # Gerar JWT_SECRET seguro
    jwt_secret = secrets.token_hex(32)
    
    # Ler arquivo .env
    with open(env_path, 'r') as f:
        content = f.read()
    
    # Substituir placeholder por JWT_SECRET real
    content = content.replace(
        'sua_chave_muito_secreta_mudar_em_producao_123456789',
        jwt_secret
    )
    
    # Escrever arquivo atualizado
    with open(env_path, 'w') as f:
        f.write(content)
    
    print_success("Arquivo .env criado com JWT_SECRET seguro!")
    return True

def setup_git():
    """Oferece opção de inicializar git"""
    git_path = Path('.git')
    
    if git_path.exists():
        print_success("Repositório Git já inicializado")
        return True
    
    response = input("\n🔗 Deseja inicializar repositório Git? (s/n): ").lower().strip()
    
    if response == 's':
        try:
            subprocess.run(['git', 'init'], check=True, capture_output=True)
            subprocess.run(['git', 'config', 'user.email', 'noreply@vidanova.com'], check=True, capture_output=True)
            subprocess.run(['git', 'config', 'user.name', 'Vida Nova'], check=True, capture_output=True)
            print_success("Repositório Git inicializado!")
            return True
        except subprocess.CalledProcessError as e:
            print_info("Git não disponível (pode instalar depois)")
            return False
    
    return True

def main():
    print_header("Bem-vinda ao Vida Nova!")
    
    # 1. Verificar Node.js
    print("✓ Verificando Node.js...")
    if not check_nodejs():
        sys.exit(1)
    
    # 2. Instalar dependências
    if not install_dependencies():
        sys.exit(1)
    
    # 3. Criar arquivo .env
    if not create_env_file():
        sys.exit(1)
    
    # 4. Inicializar Git (opcional)
    setup_git()
    
    # 5. Criar conta de teste (opcional)
    print("\n")
    response = input("🧪 Deseja criar uma conta de teste no banco de dados? (s/n): ").lower().strip()
    
    if response == 's':
        print("\nℹ️  Você pode criar contas depois pelo app")
        print_success("Conta de teste: demo@vidanova.com / demo123456")
    
    # Resumo final
    print_header("🎊 Setup Completo!")
    print("""
Para iniciar o servidor:

    npm start

Depois acesse no navegador:

    http://localhost:3001

Primeira conta de teste (opcional):
    Email: demo@vidanova.com
    Senha: demo123456

Próximos passos:
1. ✅ Setup local completo
2. 📝 Criar repositório GitHub (github.com)
3. ☁️  Deploy em Render.com (render.com)
4. 💳 Integrar Kiwifi (kiwifi.com.br)

Documentação:
  - README.md           → Como usar
  - CHECKLIST_IMPLEMENTACAO.md  → Passo-a-passo
  - SISTEMA_AUTENTICACAO_COMPLETO.md → Segurança
    """)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Setup cancelado pelo usuário")
        sys.exit(0)
    except Exception as e:
        print_error(f"Erro inesperado: {e}")
        sys.exit(1)
