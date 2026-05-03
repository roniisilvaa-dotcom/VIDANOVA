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
const paywallBlock = document.querySelector("#paywall-block");
const loginBlock = document.querySelector("#login-block");
const loginNote = document.querySelector("#login-note");
const showLoginFormButton = document.querySelector("#show-login-form");
const backToPaywallButton = document.querySelector("#back-to-paywall");
const paywallSubscribeBtn = document.querySelector("#paywall-subscribe-btn");
const createAccountButton = document.querySelector("[data-create-account]");
const togglePasswordButton = document.querySelector("#toggle-password");
const googleLoginButton = document.querySelector("#google-login-button");
const appleLoginButton = document.querySelector("#apple-login-button");

const AUTH_TOKEN_KEY = "vida-nova:auth-token";
const AUTH_USER_KEY = "vida-nova:auth-user";
const LEGACY_SESSION_KEY = "ela-em-ordem:session";
const FALLBACK_PUBLIC_APP_URL = "https://vidanova-1.onrender.com";

let authMode = "login";
let deferredInstallPrompt = null;
let _paywallVisible = true;

function showPaywall() {
  _paywallVisible = true;
  if (paywallBlock) paywallBlock.style.display = "";
  paywallBlock?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showLoginSection() {
  _paywallVisible = false;
  if (paywallBlock) paywallBlock.style.display = "";
  if (loginBlock) loginBlock.style.display = "";
  if (loginForm) loginForm.style.display = "";
  if (loginNote) loginNote.style.display = "";
}

async function loadAppConfig() {
  try {
    const res = await fetch(getApiUrl("/api/config"));
    if (!res.ok) throw new Error("Config indisponivel");
    const config = await res.json();

    if (paywallSubscribeBtn && config.checkoutUrl) {
      paywallSubscribeBtn.href = config.checkoutUrl;
    }


  } catch {}

  if (paywallSubscribeBtn && (!paywallSubscribeBtn.href || paywallSubscribeBtn.getAttribute("href") === "#")) {
    paywallSubscribeBtn.href = getPublishedAppUrl();
  }
}

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
  document.body.classList.toggle("auth-register-mode", isRegister);
  authTitle.textContent = isRegister ? "Criar conta" : "Entre na sua conta";
  authSubmit.textContent = isRegister ? "Criar conta" : "Entrar agora";
  nameField.classList.toggle("hidden-field", !isRegister);
  confirmPasswordField.classList.toggle("hidden-field", !isRegister);
  loginName.required = isRegister;
  loginConfirmPassword.required = isRegister;
  modeLoginButton.classList.toggle("is-active", !isRegister);
  modeRegisterButton.classList.toggle("is-active", isRegister);
  setFeedback("");
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

function getApiUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (window.location.protocol === "file:") {
    return `${FALLBACK_PUBLIC_APP_URL}${path}`;
  }

  return path;
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
  const response = await fetch(getApiUrl(url), {
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

    const user = response.user;
    const isAdmin = user?.is_admin || user?.role === "admin";
    const hasSubscription = user?.subscription_status === "active";

    if (!isAdmin && !hasSubscription) {
      getAuthStorage().removeItem(AUTH_TOKEN_KEY);
      getAuthStorage().removeItem(AUTH_USER_KEY);
      getAuthStorage().removeItem(LEGACY_SESSION_KEY);
      clearLegacyAuthCache();
      return;
    }

    window.location.href = getPostLoginTarget(response.user);
  } catch {
    getAuthStorage().removeItem(AUTH_TOKEN_KEY);
    getAuthStorage().removeItem(AUTH_USER_KEY);
    getAuthStorage().removeItem(LEGACY_SESSION_KEY);
    clearLegacyAuthCache();
  }
}

if (showLoginFormButton) {
  showLoginFormButton.addEventListener("click", () => showLoginSection());
}

if (backToPaywallButton) {
  backToPaywallButton.addEventListener("click", () => showPaywall());
}

if (modeLoginButton) {
  modeLoginButton.addEventListener("click", () => setMode("login"));
}

if (modeRegisterButton) {
  modeRegisterButton.addEventListener("click", () => setMode("register"));
}

if (createAccountButton) {
  createAccountButton.addEventListener("click", () => {
    showLoginSection();
    setMode("register");
    loginName?.focus();
  });
}

if (togglePasswordButton && loginPassword) {
  togglePasswordButton.addEventListener("click", () => {
    const showPassword = loginPassword.type === "password";
    loginPassword.type = showPassword ? "text" : "password";
    togglePasswordButton.textContent = showPassword ? "●" : "◌";
    togglePasswordButton.setAttribute("aria-label", showPassword ? "Ocultar senha" : "Mostrar senha");
  });
}

function handleSocialLogin(provider) {
  setFeedback(
    `Entrada com ${provider} ainda nao esta configurada. Use e-mail e senha ou toque em Assinar agora.`,
    "error",
  );
}

if (googleLoginButton) {
  googleLoginButton.addEventListener("click", () => handleSocialLogin("Google"));
}

if (appleLoginButton) {
  appleLoginButton.addEventListener("click", () => handleSocialLogin("Apple"));
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

      const user = response.user;
      const isAdmin = user?.is_admin || user?.role === "admin";
      const hasSubscription = user?.subscription_status === "active";

      if (!isAdmin && !hasSubscription) {
        getAuthStorage().removeItem(AUTH_TOKEN_KEY);
        getAuthStorage().removeItem(AUTH_USER_KEY);
        getAuthStorage().removeItem(LEGACY_SESSION_KEY);
        clearLegacyAuthCache();

        const subscriptionUrl = user?.subscription_url || "";
        const subStatus = String(user?.subscription_status || "pending");
        let msg;
        if (subStatus === "pending") {
          msg = isRegister
            ? "Conta criada! Assine agora para liberar o acesso completo ao app."
            : "Sua conta está aguardando ativação. Assine para liberar o acesso.";
        } else if (subStatus === "late") {
          msg = "Seu pagamento está em atraso. Regularize para reativar o acesso. Seus dados estão seguros.";
        } else {
          msg = "Sua assinatura está inativa. Seus dados continuam guardados — renove para voltar a usar o app.";
        }
        setFeedback(msg, "error");
        if (paywallSubscribeBtn && subscriptionUrl) {
          paywallSubscribeBtn.href = subscriptionUrl;
        }
        showPaywall();
        authSubmit.disabled = false;
        demoAccess.disabled = false;
        return;
      }

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
showLoginSection();
loadAppConfig();
redirectIfAuthenticated();

// Auto-update: reload login page when a new version is deployed
(async function startLoginVersionPolling() {
  const fetchVersion = async () => {
    try {
      const res = await fetch("./version.json?_=" + Date.now(), { cache: "no-store" });
      if (!res.ok) return null;
      const data = await res.json();
      return data.buildTime || data.version || null;
    } catch {
      return null;
    }
  };

  const baseline = await fetchVersion();
  if (!baseline) return;

  let _reloadScheduled = false;

  const check = async () => {
    if (_reloadScheduled) return;
    const latest = await fetchVersion();
    if (latest && latest !== baseline) {
      _reloadScheduled = true;
      try {
        if ("caches" in window) {
          const keys = await window.caches.keys();
          await Promise.all(keys.map((k) => window.caches.delete(k)));
        }
      } catch {}
      setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.set("_v", latest);
        window.location.replace(url.toString());
      }, 400);
    }
  };

  setInterval(check, 15000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") check();
  });
  window.addEventListener("focus", () => check());
})();
