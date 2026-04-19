const loginForm = document.querySelector("#login-form");
const loginName = document.querySelector("#login-name");
const loginEmail = document.querySelector("#login-email");
const demoAccess = document.querySelector("#demo-access");

function saveSession(name, email) {
  localStorage.setItem(
    "ela-em-ordem:session",
    JSON.stringify({
      name,
      email,
      createdAt: new Date().toISOString(),
    }),
  );

  window.location.href = "./index.html";
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSession(loginName.value.trim(), loginEmail.value.trim());
  });
}

if (demoAccess) {
  demoAccess.addEventListener("click", () => {
    saveSession("Visitante", "demo@elaemordem.app");
  });
}
