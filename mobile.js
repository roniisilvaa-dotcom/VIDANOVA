const mobileGreeting = document.querySelector("#mobile-greeting");
const mobileDateLabel = document.querySelector("#mobile-date-label");
const mobileSummary = document.querySelector("#mobile-summary");
const mobileTime = document.querySelector("#mobile-time");
const mobileTitle = document.querySelector("#mobile-title");
const mobileAddEvent = document.querySelector("#mobile-add-event");
const mobileEvents = document.querySelector("#mobile-events");
const mobileTop10Input = document.querySelector("#mobile-top10-input");
const mobileTop10Add = document.querySelector("#mobile-top10-add");
const mobileTop10List = document.querySelector("#mobile-top10-list");
const mobileNotes = document.querySelector("#mobile-notes");

const today = new Date();
const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
  today.getDate(),
).padStart(2, "0")}`;

const AUTH_TOKEN_KEY = "vida-nova:auth-token";
const AUTH_USER_KEY = "vida-nova:auth-user";
const LEGACY_SESSION_KEY = "ela-em-ordem:session";
const CLOUD_STATE_TYPE = "app_state";
const CLOUD_STATE_KEY = "main";

let session = null;
let cloudState = null;
let agendaStore = {};
let topTenItems = [];
let syncTimeoutId = null;
let syncInFlight = null;
let isHydratingMobileState = false;

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

function clearAuthSession() {
  const storage = getAuthStorage();
  storage.removeItem(AUTH_TOKEN_KEY);
  storage.removeItem(AUTH_USER_KEY);
  storage.removeItem(LEGACY_SESSION_KEY);
  clearLegacyAuthCache();
}

function getAuthToken() {
  return getAuthStorage().getItem(AUTH_TOKEN_KEY) || "";
}

function persistUserSession(user, token = getAuthToken()) {
  const storage = getAuthStorage();
  storage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  if (token) {
    storage.setItem(AUTH_TOKEN_KEY, token);
  }
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
  session = user;
}

async function apiPost(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error || "Nao foi possivel concluir a requisicao.");
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

function ensureDay() {
  if (!agendaStore[todayKey]) {
    agendaStore[todayKey] = { summary: "", events: [] };
  }

  return agendaStore[todayKey];
}

function createEmptyCloudState() {
  return {
    agendaStore: {},
    notes: "",
    mobileTopTenItems: [],
  };
}

function collectMobileCloudState() {
  return {
    ...(cloudState || createEmptyCloudState()),
    agendaStore,
    notes: mobileNotes?.value || "",
    mobileTopTenItems: topTenItems,
  };
}

function applyMobileState(state) {
  const safeState = state && typeof state === "object" ? state : createEmptyCloudState();
  isHydratingMobileState = true;

  cloudState = safeState;
  agendaStore =
    safeState.agendaStore && typeof safeState.agendaStore === "object" ? safeState.agendaStore : {};
  topTenItems = Array.isArray(safeState.mobileTopTenItems) ? safeState.mobileTopTenItems : [];

  window.localStorage.setItem("ela-em-ordem:agenda-events", JSON.stringify(agendaStore));
  window.localStorage.setItem("ela-em-ordem:top-ten", JSON.stringify(topTenItems));
  window.localStorage.setItem("ela-em-ordem:notes", safeState.notes || "");

  mobileSummary.value = ensureDay().summary || "";
  mobileNotes.value = safeState.notes || "";

  renderEvents();
  renderTopTen();
  isHydratingMobileState = false;
}

function scheduleCloudSync() {
  if (isHydratingMobileState || !getAuthToken()) {
    return;
  }

  window.clearTimeout(syncTimeoutId);
  syncTimeoutId = window.setTimeout(() => {
    syncInFlight = apiPost("/api/data/save", {
      token: getAuthToken(),
      dataType: CLOUD_STATE_TYPE,
      dataKey: CLOUD_STATE_KEY,
      dataValue: collectMobileCloudState(),
    }).catch((error) => {
      console.error("Erro ao sincronizar dados mobile:", error);
    });
  }, 250);
}

function saveAgenda() {
  window.localStorage.setItem("ela-em-ordem:agenda-events", JSON.stringify(agendaStore));
  scheduleCloudSync();
}

function saveTopTen() {
  window.localStorage.setItem("ela-em-ordem:top-ten", JSON.stringify(topTenItems));
  scheduleCloudSync();
}

function renderEvents() {
  const day = ensureDay();
  mobileEvents.innerHTML = "";

  day.events
    .slice()
    .sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")))
    .forEach((eventItem) => {
      const item = document.createElement("li");
      item.className = "mobile-item";

      const check = document.createElement("button");
      check.type = "button";
      check.className = "mobile-check";
      check.setAttribute("aria-label", "Compromisso");

      const text = document.createElement("span");
      text.className = "mobile-item-text";
      text.textContent = `${eventItem.time || "--:--"} - ${eventItem.title}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "mobile-remove";
      remove.textContent = "Remover";
      remove.addEventListener("click", () => {
        agendaStore[todayKey].events = agendaStore[todayKey].events.filter(
          (currentEvent) => currentEvent.id !== eventItem.id,
        );
        saveAgenda();
        renderEvents();
      });

      item.append(check, text, remove);
      mobileEvents.appendChild(item);
    });
}

function renderTopTen() {
  mobileTop10List.innerHTML = "";

  topTenItems.forEach((itemData) => {
    const item = document.createElement("li");
    item.className = `mobile-item${itemData.done ? " done" : ""}`;

    const check = document.createElement("button");
    check.type = "button";
    check.className = "mobile-check";
    check.setAttribute("aria-label", "Concluir prioridade");
    check.addEventListener("click", () => {
      topTenItems = topTenItems.map((currentItem) =>
        currentItem.id === itemData.id
          ? { ...currentItem, done: !currentItem.done }
          : currentItem,
      );
      saveTopTen();
      renderTopTen();
    });

    const text = document.createElement("span");
    text.className = "mobile-item-text";
    text.textContent = itemData.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "mobile-remove";
    remove.textContent = "Remover";
    remove.addEventListener("click", () => {
      topTenItems = topTenItems.filter((currentItem) => currentItem.id !== itemData.id);
      saveTopTen();
      renderTopTen();
    });

    item.append(check, text, remove);
    mobileTop10List.appendChild(item);
  });
}

async function initializeMobileApp() {
  const token = getAuthToken();
  const savedUser = getAuthStorage().getItem(AUTH_USER_KEY);

  if (!token || !savedUser) {
    clearAuthSession();
    window.location.href = "./login.html";
    throw new Error("Sessao nao encontrada");
  }

  try {
    const verifyResponse = await apiPost("/api/auth/verify", { token });
    persistUserSession(verifyResponse.user, token);
  } catch (error) {
    clearAuthSession();
    window.location.href = "./login.html";
    throw new Error("Sessao invalida ou expirada");
  }

  mobileGreeting.textContent = `Vida Nova, ${session.name}`;
  mobileDateLabel.textContent = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  try {
    const response = await apiPost("/api/data/get", {
      token,
      dataType: CLOUD_STATE_TYPE,
    });
    const savedState = response.data?.[CLOUD_STATE_KEY];

    if (savedState) {
      applyMobileState(savedState);
    } else {
      const fallbackState = createEmptyCloudState();
      fallbackState.agendaStore = JSON.parse(window.localStorage.getItem("ela-em-ordem:agenda-events") || "{}");
      fallbackState.mobileTopTenItems = JSON.parse(window.localStorage.getItem("ela-em-ordem:top-ten") || "[]");
      fallbackState.notes = window.localStorage.getItem("ela-em-ordem:notes") || "";
      applyMobileState(fallbackState);
      scheduleCloudSync();
    }
  } catch (error) {
    console.warn("Nao foi possivel carregar os dados mobile da nuvem.", error);
    applyMobileState({
      agendaStore: JSON.parse(window.localStorage.getItem("ela-em-ordem:agenda-events") || "{}"),
      mobileTopTenItems: JSON.parse(window.localStorage.getItem("ela-em-ordem:top-ten") || "[]"),
      notes: window.localStorage.getItem("ela-em-ordem:notes") || "",
    });
  }

  mobileSummary.addEventListener("input", () => {
    ensureDay().summary = mobileSummary.value;
    saveAgenda();
  });

  mobileNotes.addEventListener("input", () => {
    window.localStorage.setItem("ela-em-ordem:notes", mobileNotes.value);
    scheduleCloudSync();
  });

  mobileAddEvent.addEventListener("click", () => {
    const title = mobileTitle.value.trim();
    if (!title) {
      return;
    }

    ensureDay().events.push({
      id: crypto.randomUUID(),
      time: mobileTime.value || "",
      title,
    });

    saveAgenda();
    mobileTime.value = "";
    mobileTitle.value = "";
    renderEvents();
  });

  mobileTop10Add.addEventListener("click", () => {
    const value = mobileTop10Input.value.trim();
    if (!value || topTenItems.length >= 10) {
      return;
    }

    topTenItems.unshift({
      id: crypto.randomUUID(),
      text: value,
      done: false,
    });

    saveTopTen();
    mobileTop10Input.value = "";
    renderTopTen();
  });
}

initializeMobileApp().catch((error) => {
  console.error("Erro ao iniciar a versao mobile:", error);
});
