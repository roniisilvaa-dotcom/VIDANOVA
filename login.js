const loginForm = document.querySelector("#login-form");
const loginName = document.querySelector("#login-name");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginConfirmPassword = document.querySelector("#login-confirm-password");
const authTitle = document.querySelector("#auth-title");
const authSubmit = document.querySelector("#auth-submit");
const authFeedback = document.querySelector("#auth-feedback");
const demoAccess = document.querySelector("#demo-access");
const modeLoginButton = document.querySelector("#mode-login");
const modeRegisterButton = document.querySelector("#mode-register");
const nameField = document.querySelector("#name-field");
const confirmPasswordField = document.querySelector("#confirm-password-field");
const loginLiveLink = document.querySelector("#login-live-link");
const loginInstallButton = document.querySelector("#login-install-button");
const loginInstallStatus = document.querySelector("#login-install-status");

const AUTH_TOKEN_KEY = "vida-nova:auth-token";
const AUTH_USER_KEY = "vida-nova:auth-user";
const LEGACY_SESSION_KEY = "ela-em-ordem:session";
const FALLBACK_PUBLIC_APP_URL = "https://vidanova-1.onrender.com";

let authMode = "login";
let deferredInstallPrompt = null;

function getAuthStorage() {
  const localToken = window.localStorage.getItem(AUTH_TOKEN_KEY);
  const sessionToken = window.sessionStorage.getItem(AUTH_TOKEN_KEY);
  const localUser = window.localStorage.getItem(AUTH_USER_KEY);
  const sessionUser = window.sessionStorage.getItem(AUTH_USER_KEY);

  if ((!localToken || !localUser) && sessionToken && sessionUser) {
    window.localStorage.setItem(AUTH_TOKEN_KEY, sessionToken);
    window.localStorage.setItem(AUTH_USER_KEY, sessionUser);
  }

  if (!window.localStorage.getItem(LEGACY_SESSION_KEY)) {
    const legacySession = window.sessionStorage.getItem(LEGACY_SESSION_KEY);
    if (legacySession) {
      window.localStorage.setItem(LEGACY_SESSION_KEY, legacySession);
    }
  }

  return window.localStorage;
}

function clearLegacyAuthCache() {
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_USER_KEY);
  window.sessionStorage.removeItem(LEGACY_SESSION_KEY);
}

function setFeedback(message, type = "neutral") {
  if (!authFeedback) {
    return;
  }

  authFeedback.textContent = message;
  authFeedback.dataset.state = type;
}

function setMode(mode) {
  authMode = mode;

  const isRegister = mode === "register";
  authTitle.textContent = isRegister ? "Criar conta" : "Entrar no app";
  authSubmit.textContent = isRegister ? "Criar conta" : "Entrar agora";
  nameField.classList.toggle("hidden-field", !isRegister);
  confirmPasswordField.classList.toggle("hidden-field", !isRegister);
  loginName.required = isRegister;
  loginConfirmPassword.required = isRegister;
  modeLoginButton.classList.toggle("is-active", !isRegister);
  modeRegisterButton.classList.toggle("is-active", isRegister);
  setFeedback(
    isRegister
      ? "Crie uma conta para liberar o armazenamento separado por usuaria."
      : "Entre com seu e-mail e senha para acessar seus dados.",
  );
}

function saveSession(token, user) {
  const storage = getAuthStorage();
  storage.setItem(AUTH_TOKEN_KEY, token);
  storage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  storage.setItem(
    LEGACY_SESSION_KEY,
    JSON.stringify({
      name: user.name,
      email: user.email,
      id: user.id,
      createdAt: new Date().toISOString(),
    }),
  );
  clearLegacyAuthCache();
}

function getPostLoginTarget(user) {
  return user?.is_admin || user?.role === "admin" ? "./index.html#admin" : "./index.html";
}

function getPublishedAppUrl() {
  if (window.location.protocol === "file:") {
    return FALLBACK_PUBLIC_APP_URL;
  }

  if (window.location.origin && /^https?:/i.test(window.location.origin)) {
    return window.location.origin;
  }

  return FALLBACK_PUBLIC_APP_URL;
}

function getInstallContext() {
  const ua = navigator.userAgent || "";
  const isIos = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMac = /Macintosh|Mac OS X/i.test(ua) && !isIos;
  const isWindows = /Windows/i.test(ua);
  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  return { isIos, isAndroid, isMac, isWindows, isStandalone };
}

function refreshInstallLinks() {
  if (loginLiveLink) {
    loginLiveLink.href = getPublishedAppUrl();
  }
}

function updateLoginInstallUi() {
  if (!loginInstallButton || !loginInstallStatus) {
    return;
  }

  const context = getInstallContext();

  if (context.isStandalone) {
    loginInstallButton.textContent = "App ja instalado";
    loginInstallButton.disabled = true;
    loginInstallStatus.textContent =
      "O app já está instalado neste dispositivo. Agora é só entrar com a conta.";
    return;
  }

  loginInstallButton.disabled = false;

  if (deferredInstallPrompt) {
    loginInstallButton.textContent = "Instalar agora";
    loginInstallStatus.textContent =
      "Este dispositivo aceita instalação direta. Toque em instalar para adicionar o app.";
    return;
  }

  if (context.isIos) {
    loginInstallButton.textContent = "Abrir no Safari";
    loginInstallStatus.textContent =
      "No iPhone/iPad, abra no Safari e use Compartilhar > Adicionar à Tela de Início. Em Chrome ou navegadores dentro de outros apps essa opção pode não aparecer.";
    return;
  }

  if (context.isAndroid) {
    loginInstallButton.textContent = "Abrir no Chrome";
    loginInstallStatus.textContent =
      "No Android, abra no Chrome e toque em “Instalar app” ou “Adicionar à tela inicial”.";
    return;
  }

  if (context.isMac) {
    loginInstallButton.textContent = "Abrir para instalar no Mac";
    loginInstallStatus.textContent =
      "No Mac, abra a versão publicada no Chrome ou Edge e use “Instalar app” no navegador.";
    return;
  }

  if (context.isWindows) {
    loginInstallButton.textContent = "Abrir para instalar no Windows";
    loginInstallStatus.textContent =
      "No Windows, abra a versão publicada no Chrome ou Edge e instale como aplicativo.";
    return;
  }

  loginInstallButton.textContent = "Abrir app";
  loginInstallStatus.textContent =
    "Abra a versão publicada do app para instalar e depois entre com sua conta normalmente.";
}

function openPublishedInstallPage() {
  window.open(getPublishedAppUrl(), "_blank", "noopener,noreferrer");
}

async function triggerLoginInstallFlow() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    updateLoginInstallUi();
    return;
  }

  openPublishedInstallPage();
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Nao foi possivel concluir a solicitacao.");
  }

  return data;
}

async function redirectIfAuthenticated() {
  const token = getAuthStorage().getItem(AUTH_TOKEN_KEY);
  if (!token) {
    return;
  }

  try {
    const response = await postJson("/api/auth/verify", { token });
    saveSession(token, response.user);
    window.location.href = getPostLoginTarget(response.user);
  } catch {
    getAuthStorage().removeItem(AUTH_TOKEN_KEY);
    getAuthStorage().removeItem(AUTH_USER_KEY);
    getAuthStorage().removeItem(LEGACY_SESSION_KEY);
    clearLegacyAuthCache();
  }
}

if (modeLoginButton) {
  modeLoginButton.addEventListener("click", () => setMode("login"));
}

if (modeRegisterButton) {
  modeRegisterButton.addEventListener("click", () => setMode("register"));
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;
    const isRegister = authMode === "register";

    if (!email || !password) {
      setFeedback("Preencha o login e a senha para continuar.", "error");
      return;
    }

    if (isRegister) {
      const name = loginName.value.trim();
      const confirmPassword = loginConfirmPassword.value;

      if (!name) {
        setFeedback("Informe seu nome para criar a conta.", "error");
        return;
      }

      if (password !== confirmPassword) {
        setFeedback("As senhas nao coincidem.", "error");
        return;
      }
    }

    authSubmit.disabled = true;
    demoAccess.disabled = true;
    setFeedback(isRegister ? "Criando sua conta..." : "Entrando na sua conta...");

    try {
      const payload = isRegister
        ? {
            name: loginName.value.trim(),
            email,
            password,
            confirmPassword: loginConfirmPassword.value,
          }
        : {
            email,
            password,
          };

      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const response = await postJson(endpoint, payload);

      saveSession(response.token, response.user);
      setFeedback("Acesso liberado. Redirecionando...", "success");
      window.location.href = getPostLoginTarget(response.user);
    } catch (error) {
      setFeedback(error.message, "error");
    } finally {
      authSubmit.disabled = false;
      demoAccess.disabled = false;
    }
  });
}

if (demoAccess) {
  demoAccess.addEventListener("click", () => {
    setMode("login");
    setFeedback(
      "O acesso demo foi desativado. Entre com uma conta real cadastrada no servidor.",
      "error",
    );
  });
}

if (loginInstallButton) {
  loginInstallButton.addEventListener("click", async () => {
    await triggerLoginInstallFlow();
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateLoginInstallUi();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  updateLoginInstallUi();
});

clearLegacyAuthCache();
refreshInstallLinks();
setMode("login");
updateLoginInstallUi();
redirectIfAuthenticated();
