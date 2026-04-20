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

const AUTH_TOKEN_KEY = "vida-nova:auth-token";
const AUTH_USER_KEY = "vida-nova:auth-user";
const LEGACY_SESSION_KEY = "ela-em-ordem:session";

let authMode = "login";

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
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  localStorage.setItem(
    LEGACY_SESSION_KEY,
    JSON.stringify({
      name: user.name,
      email: user.email,
      id: user.id,
      createdAt: new Date().toISOString(),
    }),
  );
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
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) {
    return;
  }

  try {
    const response = await postJson("/api/auth/verify", { token });
    saveSession(token, response.user);
    window.location.href = "./index.html";
  } catch {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(LEGACY_SESSION_KEY);
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
      setFeedback("Preencha e-mail e senha para continuar.", "error");
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
      window.location.href = "./index.html";
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
    loginEmail.value = "demo@vidanova.app";
    loginPassword.value = "123456";
    setMode("login");
    setFeedback(
      "A demonstracao agora depende de uma conta criada no servidor. Se quiser, posso ligar isso a uma conta demo real.",
      "neutral",
    );
  });
}

setMode("login");
redirectIfAuthenticated();
