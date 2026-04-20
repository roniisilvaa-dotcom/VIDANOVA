# Guia de Compatibilidade e Instalação - Vida Nova

## 🌐 Compatibilidade Cross-Platform

A aplicação **Vida Nova** é totalmente compatível com os seguintes dispositivos e navegadores:

### 📱 iOS (iPhone, iPad)
- **Navegador**: Safari, Chrome
- **Instalação**: 
  1. Abra a URL no Safari
  2. Clique em "Compartilhar" (Share icon)
  3. Selecione "Adicionar à Tela Inicial" (Add to Home Screen)
  4. Nomear e confirmar
- **Recursos**: Acesso offline, notificações push, full-screen

### 🤖 Android
- **Navegador**: Chrome, Firefox, Samsung Internet
- **Instalação**:
  1. Abra a URL no Chrome
  2. Clique no menu (⋮) no canto superior direito
  3. Selecione "Instalar app" ou "Adicionar à tela inicial"
  4. Confirmar instalação
- **Recursos**: Acesso offline, modo fullscreen, integração com sistema

### 💻 Windows
- **Navegadores**: Edge, Chrome, Firefox
- **Instalação via Web**:
  1. Abra a URL no Edge/Chrome
  2. Clique no ícone de instalação (na barra de endereço)
  3. Confirmar
- **Instalação via ZIP**:
  1. Baixe o arquivo `VIDA_NOVA_APP.zip`
  2. Extraia em uma pasta
  3. Abra `index.html` no navegador
- **Recursos**: Atalhos de aplicativo, modo fullscreen

### 🍎 macOS
- **Navegadores**: Safari, Chrome, Firefox
- **Instalação**:
  1. Abra a URL no navegador
  2. **Safari**: Menu → Arquivo → Adicionar à Dock
  3. **Chrome/Firefox**: Menu → Mais ferramentas → Criar atalho
- **Instalação via ZIP**:
  1. Baixe `VIDA_NOVA_APP.zip`
  2. Descompacte
  3. Abra `index.html` no navegador
- **Recursos**: Modo fullscreen, sidebar

### 📲 Tablet (iPadOS/Android)
- Mesmas instruções de iOS/Android
- **Otimizado para**: Telas maiores (7-12 polegadas)
- **Layout**: Automático responsive

## 🔄 Sincronização de Dados

- **Armazenamento Local**: Todos os dados são salvos localmente no dispositivo
- **LocalStorage**: Agenda, finanças, tarefas e notas sincronizam via localStorage
- **Offline**: Funciona completamente sem internet
- **Backup**: Os dados persitem mesmo após fechar o navegador

## 🛡️ Segurança

- ✅ Content Security Policy (CSP) habilitada
- ✅ Compatível com HTTPS
- ✅ Service Worker para cache seguro
- ✅ Sem requisitos de permissões perigosas

## ⚙️ Navegadores Suportados

| Navegador | Versão Mínima | Plataforma |
|-----------|---------------|-----------|
| Chrome | 51+ | Windows, macOS, Android, Linux |
| Safari | 11+ | iOS, macOS |
| Firefox | 54+ | Windows, macOS, Android, Linux |
| Edge | 15+ | Windows |
| Samsung Internet | 5+ | Android |
| Opera | 38+ | Windows, macOS, Android, Linux |

## 🚀 Características Habilitadas

- ✅ PWA (Progressive Web App)
- ✅ Offline-first
- ✅ Installable
- ✅ Standalone mode
- ✅ Home screen shortcut
- ✅ Responsive design
- ✅ Touch optimized
- ✅ Notch/Safe area aware

## 💾 Backup e Restauração

Para fazer backup de seus dados:
1. Abra o DevTools (F12)
2. Application → LocalStorage → URL da aplicação
3. Copie todos os dados começando com "ela-em-ordem:" ou "vida-nova:"
4. Salve em um arquivo seguro

Para restaurar:
1. Limpe o LocalStorage anterior
2. Cole os dados salvos

## 📞 Suporte

Se encontrar problemas:
1. Limpe cache e cookies
2. Reinstale a aplicação
3. Tente um navegador diferente
4. Verifique sua conexão de internet

---

**Versão**: 1.0  
**Data**: Abril 2026  
**Plataformas**: iOS, Android, Windows, macOS, Linux, Tablet
