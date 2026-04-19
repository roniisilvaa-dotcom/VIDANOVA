const verses = [
  {
    text: "Entrega o teu caminho ao Senhor; confia nele, e ele o fara.",
    reference: "Salmos 37:5",
  },
  {
    text: "A mulher sabia edifica a sua casa, mas a tola a derruba com as proprias maos.",
    reference: "Proverbios 14:1",
  },
  {
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
  },
  {
    text: "Lancando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vos.",
    reference: "1 Pedro 5:7",
  },
  {
    text: "Ensina-nos a contar os nossos dias, para que alcancemos coracao sabio.",
    reference: "Salmos 90:12",
  },
];

const initialTasks = [
  { id: crypto.randomUUID(), text: "Separar a roupa de amanha", done: true },
  { id: crypto.randomUUID(), text: "Registrar os gastos do dia", done: false },
  { id: crypto.randomUUID(), text: "Planejar a alimentacao da semana", done: false },
  { id: crypto.randomUUID(), text: "Leitura biblica e oracao", done: true },
];

const verseText = document.querySelector("#daily-verse-text");
const verseReference = document.querySelector("#daily-verse-reference");
const newVerseButton = document.querySelector("#new-verse-button");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskProgress = document.querySelector("#task-progress");
const notesInput = document.querySelector("#notes-input");
const topTenForm = document.querySelector("#top-ten-form");
const topTenInput = document.querySelector("#top-ten-input");
const topTenList = document.querySelector("#top-ten-list");
const topTenCount = document.querySelector("#top-ten-count");
const dashboardTop10Preview = document.querySelector("#dashboard-top10-preview");
const dashboardNotesPreview = document.querySelector("#dashboard-notes-preview");
const summarySpotlight = document.querySelector("#summary-spotlight");
const focusCount = document.querySelector("#focus-count");
const focusProgress = document.querySelector("#focus-progress");
const agendaNextTitle = document.querySelector("#agenda-next-title");
const agendaNextMeta = document.querySelector("#agenda-next-meta");
const graphRoutine = document.querySelector("#graph-routine");
const graphAgenda = document.querySelector("#graph-agenda");
const graphTop10 = document.querySelector("#graph-top10");
const calendarMonthLabel = document.querySelector("#calendar-month-label");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarPrev = document.querySelector("#calendar-prev");
const calendarNext = document.querySelector("#calendar-next");
const selectedDateLabel = document.querySelector("#selected-date-label");
const agendaForm = document.querySelector("#agenda-form");
const agendaDateInput = document.querySelector("#agenda-date-input");
const agendaTimeInput = document.querySelector("#agenda-time-input");
const agendaTitleInput = document.querySelector("#agenda-title-input");
const agendaLocationInput = document.querySelector("#agenda-location-input");
const agendaDescriptionInput = document.querySelector("#agenda-description-input");
const agendaEventsList = document.querySelector("#agenda-events-list");
const agendaSummaryInput = document.querySelector("#agenda-summary-input");
const installBanner = document.querySelector("#install-banner");
const installHelpButton = document.querySelector("#install-help-button");
const userGreeting = document.querySelector("#user-greeting");
const logoutButton = document.querySelector("#logout-button");
const financeIncomeInput = document.querySelector("#finance-income-input");
const financeExpenseInput = document.querySelector("#finance-expense-input");
const financeGoalInput = document.querySelector("#finance-goal-input");
const financeIncomeDisplay = document.querySelector("#finance-income-display");
const financeExpenseDisplay = document.querySelector("#finance-expense-display");
const financeBalanceDisplay = document.querySelector("#finance-balance-display");
const financeGoalDisplay = document.querySelector("#finance-goal-display");
const financeStatusDisplay = document.querySelector("#finance-status-display");
const financeBalanceHero = document.querySelector("#finance-balance-hero");
const financeCaption = document.querySelector("#finance-caption");
const calculatorDisplay = document.querySelector("#calculator-display");
const calculatorKeys = document.querySelectorAll(".calc-key");
const financeEntryForm = document.querySelector("#finance-entry-form");
const financeEntryType = document.querySelector("#finance-entry-type");
const financeEntryAmount = document.querySelector("#finance-entry-amount");
const financeEntryTitle = document.querySelector("#finance-entry-title");
const financeRecordsList = document.querySelector("#finance-records-list");
const financePlanningPreview = document.querySelector("#finance-planning-preview");
const financeSavingsDisplay = document.querySelector("#finance-savings-display");
const financeFixedDisplay = document.querySelector("#finance-fixed-display");
const financeVariableDisplay = document.querySelector("#finance-variable-display");
const financeImpulseDisplay = document.querySelector("#finance-impulse-display");
const moduleOpenButtons = document.querySelectorAll(".module-open-button");
const calendarModal = document.querySelector("#calendar-modal");
const calendarModalClose = document.querySelector("#calendar-modal-close");
const calendarModalTitle = document.querySelector("#calendar-modal-title");
const calendarModalEmpty = document.querySelector("#calendar-modal-empty");
const calendarModalList = document.querySelector("#calendar-modal-list");
const calendarModalForm = document.querySelector("#calendar-modal-form");
const calendarModalDate = document.querySelector("#calendar-modal-date");
const calendarModalTime = document.querySelector("#calendar-modal-time");
const calendarModalTitleInput = document.querySelector("#calendar-modal-title-input");
const calendarModalLocation = document.querySelector("#calendar-modal-location");
const calendarModalDescription = document.querySelector("#calendar-modal-description");
const moduleModal = document.querySelector("#module-modal");
const moduleModalClose = document.querySelector("#module-modal-close");
const moduleModalTitle = document.querySelector("#module-modal-title");
const moduleModalCopy = document.querySelector("#module-modal-copy");
const moduleModalForm = document.querySelector("#module-modal-form");
const moduleModalList = document.querySelector("#module-modal-list");
const moduleEntryTitle = document.querySelector("#module-entry-title");
const moduleEntryCategory = document.querySelector("#module-entry-category");
const moduleEntryDescription = document.querySelector("#module-entry-description");
const installModal = document.querySelector("#install-modal");
const installModalClose = document.querySelector("#install-modal-close");
const editableCards = document.querySelectorAll(".editable-card");
const editorModal = document.querySelector("#editor-modal");
const editorForm = document.querySelector("#editor-form");
const editorClose = document.querySelector("#editor-close");
const editorTitle = document.querySelector("#editor-title");
const editorHeading = document.querySelector("#editor-heading");
const editorSubheading = document.querySelector("#editor-subheading");
const editorBody = document.querySelector("#editor-body");
const editorList = document.querySelector("#editor-list");
const editorListGroup = document.querySelector("#editor-list-group");
const editorReset = document.querySelector("#editor-reset");
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const layoutButtons = document.querySelectorAll("[data-layout-choice]");
const customizableGrids = document.querySelectorAll(".customizable-grid");
const draggableCards = document.querySelectorAll(".draggable-card");
const isTouchDevice =
  window.matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

let tasks = [...initialTasks];
let verseIndex = new Date().getDate() % verses.length;
let activeCard = null;
let draggedCard = null;
let topTenItems = JSON.parse(localStorage.getItem("ela-em-ordem:top-ten") || "[]");
let deferredInstallPrompt = null;
let calendarCursor = new Date();
let selectedDateKey = formatDateKey(new Date());
let agendaStore = JSON.parse(localStorage.getItem("ela-em-ordem:agenda-events") || "{}");
let financeStore = JSON.parse(
  localStorage.getItem("ela-em-ordem:finance") ||
    '{"goal":0,"records":[]}',
);
let calculatorExpression = "0";
let moduleStore = JSON.parse(localStorage.getItem("vida-nova:modules") || "{}");
let activeModule = null;

const editableCardDefaults = Array.from(editableCards).reduce((defaults, card) => {
  defaults[card.dataset.cardId] = extractCardData(card);
  return defaults;
}, {});

function requireSession() {
  const session = localStorage.getItem("ela-em-ordem:session");
  if (!session) {
    const guestSession = {
      name: "Visitante",
      email: "demo@elaemordem.app",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("ela-em-ordem:session", JSON.stringify(guestSession));
    return guestSession;
  }

  return JSON.parse(session);
}

function hydrateSessionUI(session) {
  if (!session || !userGreeting) {
    return;
  }

  userGreeting.textContent = `Bem-vinda, ${session.name}`;
}

function renderVerse() {
  const verse = verses[verseIndex];
  verseText.textContent = `"${verse.text}"`;
  verseReference.textContent = verse.reference;
}

function updateTaskProgress() {
  const doneCount = tasks.filter((task) => task.done).length;
  taskProgress.textContent = `${doneCount} de ${tasks.length}`;
  if (focusCount) {
    focusCount.textContent = `${tasks.length} tarefas`;
  }
  if (focusProgress) {
    focusProgress.textContent = `${doneCount} concluidas`;
  }
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " done" : ""}`;

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "task-check";
    toggleButton.setAttribute("aria-label", "Concluir tarefa");
    toggleButton.addEventListener("click", () => {
      tasks = tasks.map((currentTask) =>
        currentTask.id === task.id
          ? { ...currentTask, done: !currentTask.done }
          : currentTask,
      );
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "task-remove";
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", () => {
      tasks = tasks.filter((currentTask) => currentTask.id !== task.id);
      renderTasks();
    });

    item.append(toggleButton, taskText, removeButton);
    taskList.appendChild(item);
  });

  updateTaskProgress();
  renderDashboardMirror();
}

function renderTopTen() {
  if (!topTenList || !topTenCount) {
    return;
  }

  topTenList.innerHTML = "";

  topTenItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = `task-item${item.done ? " done" : ""}`;

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "task-check";
    toggleButton.setAttribute("aria-label", "Concluir prioridade");
    toggleButton.addEventListener("click", () => {
      topTenItems = topTenItems.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, done: !currentItem.done }
          : currentItem,
      );
      saveTopTen();
      renderTopTen();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = item.text;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "task-remove";
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", () => {
      topTenItems = topTenItems.filter((currentItem) => currentItem.id !== item.id);
      saveTopTen();
      renderTopTen();
    });

    listItem.append(toggleButton, text, removeButton);
    topTenList.appendChild(listItem);
  });

  topTenCount.textContent = `${topTenItems.length} de 10`;
  renderDashboardMirror();
}

function saveTopTen() {
  localStorage.setItem("ela-em-ordem:top-ten", JSON.stringify(topTenItems));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function saveFinanceStore() {
  localStorage.setItem("ela-em-ordem:finance", JSON.stringify(financeStore));
}

function renderFinance() {
  const records = financeStore.records || [];
  const income = records
    .filter((entry) => entry.type === "income")
    .reduce((total, entry) => total + Number(entry.amount || 0), 0);
  const fixed = records
    .filter((entry) => entry.type === "fixed")
    .reduce((total, entry) => total + Number(entry.amount || 0), 0);
  const variable = records
    .filter((entry) => entry.type === "variable")
    .reduce((total, entry) => total + Number(entry.amount || 0), 0);
  const impulse = records
    .filter((entry) => entry.type === "impulse")
    .reduce((total, entry) => total + Number(entry.amount || 0), 0);
  const savings = records
    .filter((entry) => entry.type === "savings")
    .reduce((total, entry) => total + Number(entry.amount || 0), 0);
  const planningItems = records.filter((entry) => entry.type === "planning");
  const expense = fixed + variable + impulse + savings;
  const goal = Number(financeStore.goal || 0);
  const balance = income - expense;

  if (financeGoalInput) {
    financeGoalInput.value = goal || "";
  }
  if (financeIncomeDisplay) {
    financeIncomeDisplay.textContent = formatCurrency(income);
  }
  if (financeExpenseDisplay) {
    financeExpenseDisplay.textContent = formatCurrency(expense);
  }
  if (financeBalanceDisplay) {
    financeBalanceDisplay.textContent = formatCurrency(balance);
  }
  if (financeGoalDisplay) {
    financeGoalDisplay.textContent = formatCurrency(goal);
  }
  if (financeSavingsDisplay) {
    financeSavingsDisplay.textContent = formatCurrency(savings);
  }
  if (financeFixedDisplay) {
    financeFixedDisplay.textContent = formatCurrency(fixed);
  }
  if (financeVariableDisplay) {
    financeVariableDisplay.textContent = formatCurrency(variable);
  }
  if (financeImpulseDisplay) {
    financeImpulseDisplay.textContent = formatCurrency(impulse);
  }
  if (financeStatusDisplay) {
    financeStatusDisplay.textContent =
      balance >= goal && goal > 0
        ? "Meta coberta"
        : balance > 0
          ? "Saldo positivo"
          : "Ajustar planejamento";
  }
  if (financeBalanceHero) {
    financeBalanceHero.textContent = formatCurrency(balance);
  }
  if (financeCaption) {
    financeCaption.textContent = `Entradas ${formatCurrency(income)} | Saidas ${formatCurrency(expense)}`;
  }
  if (financePlanningPreview) {
    financePlanningPreview.textContent = planningItems.length
      ? planningItems[planningItems.length - 1].title
      : "Nenhum planejamento registrado.";
  }
  if (financeRecordsList) {
    financeRecordsList.innerHTML = records.length
      ? records
          .slice()
          .reverse()
          .slice(0, 6)
          .map(
            (entry) =>
              `<li class="task-item"><span class="task-text"><strong>${escapeHtml(entry.title)}</strong><small>${escapeHtml(entry.type)} | ${formatCurrency(entry.amount)}</small></span></li>`,
          )
          .join("")
      : '<li class="task-item"><span class="task-text">Nenhum lancamento cadastrado.</span></li>';
  }
}

function getModuleItems(moduleKey) {
  if (!moduleStore[moduleKey]) {
    moduleStore[moduleKey] = [];
  }
  return moduleStore[moduleKey];
}

function saveModuleStore() {
  localStorage.setItem("vida-nova:modules", JSON.stringify(moduleStore));
}

const moduleConfig = {
  wardrobe: {
    title: "Guarda-roupa inteligente",
    copy: "Cadastre looks, pecas, faltas, desejos e observacoes do guarda-roupa.",
  },
  home: {
    title: "Gestao da casa",
    copy: "Cadastre tarefas, rotinas, compras e observacoes da casa.",
  },
  body: {
    title: "Corpo e autocuidado",
    copy: "Cadastre estado atual, metas, rotinas e marcos de autocuidado.",
  },
  travel: {
    title: "Planejador de viagens",
    copy: "Cadastre destinos, custos, listas e etapas da viagem.",
  },
  spiritual: {
    title: "Metas com Deus",
    copy: "Cadastre metas espirituais, leituras, cultos, pedidos e reflexoes.",
  },
};

function openModuleModal(moduleKey) {
  activeModule = moduleKey;
  const config = moduleConfig[moduleKey];
  if (!config || !moduleModal) {
    return;
  }

  moduleModalTitle.textContent = config.title;
  moduleModalCopy.textContent = config.copy;
  renderModuleList();
  moduleModal.classList.remove("hidden");
  moduleModal.setAttribute("aria-hidden", "false");
}

function closeModuleModal() {
  if (!moduleModal) {
    return;
  }
  moduleModal.classList.add("hidden");
  moduleModal.setAttribute("aria-hidden", "true");
  activeModule = null;
}

function renderModuleList() {
  if (!activeModule || !moduleModalList) {
    return;
  }

  const items = getModuleItems(activeModule);
  moduleModalList.innerHTML = items.length
    ? items
        .map(
          (item) =>
            `<li class="task-item"><span class="task-text"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.category || "Sem categoria")} | ${escapeHtml(item.description || "Sem descricao")}</small></span></li>`,
        )
        .join("")
    : '<li class="task-item"><span class="task-text">Nada cadastrado ainda.</span></li>';
}

function openCalendarModal(dateKey) {
  if (!calendarModal) {
    return;
  }
  selectedDateKey = dateKey;
  const dayData = ensureAgendaDay(dateKey);
  calendarModalTitle.textContent = formatDisplayDate(dateKey);
  calendarModalDate.value = dateKey;
  calendarModalList.innerHTML = dayData.events.length
    ? dayData.events
        .slice()
        .sort((a, b) => (a.time || "").localeCompare(b.time || ""))
        .map(
          (eventItem) =>
            `<li class="task-item"><span class="task-text"><strong>${escapeHtml(eventItem.time || "--:--")} - ${escapeHtml(eventItem.title)}</strong><small>${escapeHtml(eventItem.location || "Sem local")} | ${escapeHtml(eventItem.description || "Sem descricao")}</small></span></li>`,
        )
        .join("")
    : "";
  calendarModalEmpty.hidden = dayData.events.length > 0;
  calendarModal.classList.remove("hidden");
  calendarModal.setAttribute("aria-hidden", "false");
  renderAgendaEvents();
  renderCalendar();
}

function closeCalendarModal() {
  if (!calendarModal) {
    return;
  }
  calendarModal.classList.add("hidden");
  calendarModal.setAttribute("aria-hidden", "true");
}

function openInstallModal() {
  if (!installModal) {
    return;
  }
  installModal.classList.remove("hidden");
  installModal.setAttribute("aria-hidden", "false");
}

function closeInstallModal() {
  if (!installModal) {
    return;
  }
  installModal.classList.add("hidden");
  installModal.setAttribute("aria-hidden", "true");
}

function renderDashboardMirror() {
  if (dashboardTop10Preview) {
    const previewItems = topTenItems.slice(0, 4);
    dashboardTop10Preview.innerHTML = previewItems.length
      ? previewItems
          .map(
            (item) =>
              `<li class="${item.done ? "is-done" : ""}">${escapeHtml(item.text)}</li>`,
          )
          .join("")
      : "<li>Nenhuma prioridade adicionada ainda.</li>";
  }

  if (dashboardNotesPreview) {
    const noteText = (localStorage.getItem("ela-em-ordem:notes") || "").trim();
    dashboardNotesPreview.textContent = noteText
      ? `${noteText.slice(0, 140)}${noteText.length > 140 ? "..." : ""}`
      : "Suas anotacoes aparecem aqui.";
  }

  if (summarySpotlight) {
    const summary = ensureAgendaDay(selectedDateKey).summary?.trim() || "";
    summarySpotlight.textContent = summary
      ? `${summary.slice(0, 80)}${summary.length > 80 ? "..." : ""}`
      : "Seu resumo aparece aqui";
  }

  if (graphRoutine) {
    const doneTasks = tasks.filter((task) => task.done).length;
    graphRoutine.style.width = `${tasks.length ? (doneTasks / tasks.length) * 100 : 12}%`;
  }

  if (graphAgenda) {
    const currentEvents = ensureAgendaDay(selectedDateKey).events.length;
    graphAgenda.style.width = `${Math.min(100, 15 + currentEvents * 18)}%`;
  }

  if (graphTop10) {
    const doneTop10 = topTenItems.filter((item) => item.done).length;
    graphTop10.style.width = `${topTenItems.length ? (doneTop10 / topTenItems.length) * 100 : 10}%`;
  }
}

function formatDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function formatDisplayDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ensureAgendaDay(dateKey) {
  if (!agendaStore[dateKey]) {
    agendaStore[dateKey] = { summary: "", events: [] };
  }

  return agendaStore[dateKey];
}

function saveAgendaStore() {
  localStorage.setItem("ela-em-ordem:agenda-events", JSON.stringify(agendaStore));
}

function renderAgendaEvents() {
  if (!agendaEventsList || !agendaSummaryInput || !selectedDateLabel) {
    return;
  }

  const dayData = ensureAgendaDay(selectedDateKey);
  selectedDateLabel.textContent = formatDisplayDate(selectedDateKey);
  agendaSummaryInput.value = dayData.summary || "";
  if (agendaDateInput) {
    agendaDateInput.value = selectedDateKey;
  }
  agendaEventsList.innerHTML = "";

  dayData.events
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))
    .forEach((eventItem) => {
      const item = document.createElement("li");
      item.className = "task-item";

      const time = document.createElement("button");
      time.type = "button";
      time.className = "task-check";
      time.textContent = "";
      time.setAttribute("aria-label", "Compromisso");

      const text = document.createElement("span");
      text.className = "task-text";
      text.innerHTML = `
        <strong>${escapeHtml(eventItem.time || "--:--")} - ${escapeHtml(eventItem.title)}</strong>
        <small>${escapeHtml(eventItem.location || "Sem local")} | ${escapeHtml(eventItem.description || "Sem descricao")}</small>
      `;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "task-remove";
      remove.textContent = "Remover";
      remove.addEventListener("click", () => {
        agendaStore[selectedDateKey].events = agendaStore[selectedDateKey].events.filter(
          (currentEvent) => currentEvent.id !== eventItem.id,
        );
        saveAgendaStore();
        renderAgendaEvents();
        renderCalendar();
      });

      item.append(time, text, remove);
      agendaEventsList.appendChild(item);
    });

  renderNextAgendaCard();
  renderDashboardMirror();
}

function renderCalendar() {
  if (!calendarGrid || !calendarMonthLabel) {
    return;
  }

  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const todayKey = formatDateKey(new Date());

  calendarMonthLabel.textContent = firstDay.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  calendarGrid.innerHTML = "";

  for (let index = 0; index < 42; index += 1) {
    const dayNumber = index - startOffset + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= totalDays;
    const date = new Date(year, month, isCurrentMonth ? dayNumber : 1);
    const dateKey = isCurrentMonth ? formatDateKey(date) : "";
    const dayData = isCurrentMonth ? ensureAgendaDay(dateKey) : null;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";

    if (!isCurrentMonth) {
      button.classList.add("is-muted");
      button.disabled = true;
      button.innerHTML = '<span class="calendar-day-number"></span><span class="calendar-day-meta"></span>';
      calendarGrid.appendChild(button);
      continue;
    }

    if (dateKey === todayKey) {
      button.classList.add("is-today");
    }

    if (dateKey === selectedDateKey) {
      button.classList.add("is-selected");
    }

    const eventCount = dayData.events.length;
    button.innerHTML = `
      <span class="calendar-day-number">${dayNumber}</span>
      <span class="calendar-day-meta">${eventCount ? `${eventCount} compromisso${eventCount > 1 ? "s" : ""}` : "Livre"}</span>
    `;

    button.addEventListener("click", () => {
      selectedDateKey = dateKey;
      renderCalendar();
      renderAgendaEvents();
      openCalendarModal(dateKey);
    });

    calendarGrid.appendChild(button);
  }
}

function renderNextAgendaCard() {
  if (!agendaNextTitle || !agendaNextMeta) {
    return;
  }

  const events = ensureAgendaDay(selectedDateKey).events
    .slice()
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  if (!events.length) {
    agendaNextTitle.textContent = "Nenhum compromisso";
    agendaNextMeta.textContent = formatDisplayDate(selectedDateKey);
    return;
  }

  const nextEvent = events[0];
  agendaNextTitle.textContent = nextEvent.title;
  agendaNextMeta.textContent = `${nextEvent.time || "--:--"} | ${nextEvent.location || "Sem local"}`;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function setupInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
  });
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("ela-em-ordem:theme", theme);

  themeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeChoice === theme);
  });
}

function setLayout(layout) {
  document.body.dataset.layout = layout;
  localStorage.setItem("ela-em-ordem:layout", layout);

  layoutButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.layoutChoice === layout);
  });
}

function extractCardData(card) {
  return {
    heading: card.querySelector("h3, strong")?.textContent?.trim() || "",
    subheading: card.querySelector(".eyebrow, span")?.textContent?.trim() || "",
    body: card.querySelector("blockquote, p:not(.eyebrow), small")?.textContent?.trim() || "",
    list: Array.from(card.querySelectorAll("li, .schedule-item, .metric-row > div")).map((item) =>
      item.textContent.replace(/\s+/g, " ").trim(),
    ),
  };
}

function openEditor(card) {
  activeCard = card;
  const cardType = card.dataset.cardType || "text";
  const data = extractCardData(card);

  editorTitle.textContent = data.heading || "Bloco";
  editorHeading.value = data.heading;
  editorSubheading.value = data.subheading;
  editorBody.value = data.body;
  editorList.value = data.list.join("\n");
  editorListGroup.style.display = cardType === "text" ? "none" : "grid";

  editorModal.classList.remove("hidden");
  editorModal.setAttribute("aria-hidden", "false");
}

function closeEditor() {
  editorModal.classList.add("hidden");
  editorModal.setAttribute("aria-hidden", "true");
  activeCard = null;
}

function applyCardData(card, data) {
  const cardType = card.dataset.cardType || "text";
  const eyebrow = card.querySelector(".eyebrow, span");
  const heading = card.querySelector("h3, strong");
  const body = card.querySelector("blockquote, p:not(.eyebrow), small");
  const listItems = String(data.list || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  if (eyebrow) {
    eyebrow.textContent = data.subheading || eyebrow.textContent;
  }

  if (heading) {
    heading.textContent = data.heading || heading.textContent;
  }

  if (body && cardType !== "list" && cardType !== "mixed") {
    body.textContent =
      body.tagName === "BLOCKQUOTE" ? `"${data.body || ""}"` : data.body || body.textContent;
  }

  if (cardType === "list" || cardType === "mixed") {
    const list = card.querySelector(".mini-list, .roadmap-list, .schedule-list");

    if (list) {
      list.innerHTML = "";

      listItems.forEach((itemText) => {
        const item = document.createElement(list.classList.contains("schedule-list") ? "div" : "li");

        if (list.classList.contains("schedule-list")) {
          item.className = "schedule-item";
          item.textContent = itemText;
        } else {
          item.textContent = itemText;
        }

        list.appendChild(item);
      });
    }

    if (cardType === "mixed") {
      const note = card.querySelector(".module-note");
      if (note) {
        note.textContent = data.body || note.textContent;
      }
    }
  }

  if (card.dataset.cardId === "verse-panel") {
    const reference = card.querySelector(".verse-reference");
    if (reference) {
      reference.textContent = data.subheading || reference.textContent;
    }
  }
}

function saveCardState(card) {
  localStorage.setItem(`ela-em-ordem:${card.dataset.cardId}`, JSON.stringify(extractCardData(card)));
}

function saveGridOrder(grid) {
  const order = Array.from(grid.children)
    .map((card) => card.dataset.cardId)
    .filter(Boolean);

  localStorage.setItem(`ela-em-ordem:grid:${grid.dataset.gridId}`, JSON.stringify(order));
}

function restoreGridOrders() {
  customizableGrids.forEach((grid) => {
    const savedValue = localStorage.getItem(`ela-em-ordem:grid:${grid.dataset.gridId}`);
    if (!savedValue) {
      return;
    }

    const order = JSON.parse(savedValue);
    order.forEach((cardId) => {
      const card = grid.querySelector(`[data-card-id="${cardId}"]`);
      if (card) {
        grid.appendChild(card);
      }
    });
  });
}

function restoreSavedCards() {
  editableCards.forEach((card) => {
    const savedValue = localStorage.getItem(`ela-em-ordem:${card.dataset.cardId}`);
    if (!savedValue) {
      return;
    }

    applyCardData(card, JSON.parse(savedValue));
  });
}

function handleGridDragOver(event) {
  event.preventDefault();

  if (!draggedCard) {
    return;
  }

  const grid = event.currentTarget;
  grid.classList.add("drag-over");

  const targetCard = event.target.closest(".draggable-card");
  if (!targetCard || targetCard === draggedCard || targetCard.parentElement !== grid) {
    return;
  }

  const bounds = targetCard.getBoundingClientRect();
  const insertAfter = event.clientY > bounds.top + bounds.height / 2;
  grid.insertBefore(draggedCard, insertAfter ? targetCard.nextSibling : targetCard);
}

function initializeDragAndDrop() {
  if (isTouchDevice) {
    draggableCards.forEach((card) => {
      card.removeAttribute("draggable");
    });
    return;
  }

  draggableCards.forEach((card) => {
    card.addEventListener("dragstart", () => {
      draggedCard = card;
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      if (card.parentElement?.matches(".customizable-grid")) {
        saveGridOrder(card.parentElement);
      }

      customizableGrids.forEach((grid) => grid.classList.remove("drag-over"));
      card.classList.remove("dragging");
      draggedCard = null;
    });
  });

  customizableGrids.forEach((grid) => {
    grid.addEventListener("dragover", handleGridDragOver);
    grid.addEventListener("dragleave", () => {
      grid.classList.remove("drag-over");
    });
    grid.addEventListener("drop", () => {
      grid.classList.remove("drag-over");
      saveGridOrder(grid);
    });
  });
}

editableCards.forEach((card) => {
  if (isTouchDevice) {
    return;
  }

  card.addEventListener("click", (event) => {
    if (draggedCard || event.target.closest("button, input, textarea, form, a")) {
      return;
    }

    openEditor(card);
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.themeChoice);
  });
});

layoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLayout(button.dataset.layoutChoice);
  });
});

newVerseButton.addEventListener("click", () => {
  verseIndex = (verseIndex + 1) % verses.length;
  renderVerse();
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) {
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    text: taskText,
    done: false,
  });

  taskInput.value = "";
  renderTasks();
});

if (notesInput) {
  notesInput.value = localStorage.getItem("ela-em-ordem:notes") || "";
  notesInput.addEventListener("input", () => {
    localStorage.setItem("ela-em-ordem:notes", notesInput.value);
    renderDashboardMirror();
  });
}

if (topTenForm) {
  topTenForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = topTenInput.value.trim();
    if (!value || topTenItems.length >= 10) {
      return;
    }

    topTenItems.unshift({
      id: crypto.randomUUID(),
      text: value,
      done: false,
    });

    saveTopTen();
    renderTopTen();
    topTenInput.value = "";
  });
}

if (agendaSummaryInput) {
  agendaSummaryInput.addEventListener("input", () => {
    ensureAgendaDay(selectedDateKey).summary = agendaSummaryInput.value;
    saveAgendaStore();
    renderDashboardMirror();
  });
}

if (agendaForm) {
  agendaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const targetDate = agendaDateInput.value || selectedDateKey;
    const title = agendaTitleInput.value.trim();
    const time = agendaTimeInput.value || "";
    const location = agendaLocationInput.value.trim();
    const description = agendaDescriptionInput.value.trim();

    if (!title) {
      return;
    }

    ensureAgendaDay(targetDate).events.push({
      id: crypto.randomUUID(),
      time,
      title,
      location,
      description,
    });

    selectedDateKey = targetDate;
    saveAgendaStore();
    renderAgendaEvents();
    renderCalendar();
    agendaForm.reset();
  });
}

if (agendaDateInput) {
  agendaDateInput.addEventListener("change", () => {
    if (!agendaDateInput.value) {
      return;
    }

    selectedDateKey = agendaDateInput.value;
    const [year, month] = selectedDateKey.split("-").map(Number);
    calendarCursor = new Date(year, month - 1, 1);
    renderCalendar();
    renderAgendaEvents();
  });
}

if (calendarPrev) {
  calendarPrev.addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
    renderCalendar();
  });
}

if (calendarNext) {
  calendarNext.addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
    renderCalendar();
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("ela-em-ordem:session");
    window.location.href = "./login.html";
  });
}

if (financeGoalInput) {
  financeGoalInput.addEventListener("input", () => {
    financeStore.goal = Number(financeGoalInput.value || 0);
    saveFinanceStore();
    renderFinance();
  });
}

if (financeEntryForm) {
  financeEntryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const type = financeEntryType.value;
    const amount = Number(financeEntryAmount.value || 0);
    const title = financeEntryTitle.value.trim();

    if (!title || !amount) {
      return;
    }

    if (!financeStore.records) {
      financeStore.records = [];
    }

    financeStore.records.push({
      id: crypto.randomUUID(),
      type,
      amount,
      title,
    });

    saveFinanceStore();
    renderFinance();
    financeEntryForm.reset();
  });
}

if (calculatorDisplay) {
  calculatorKeys.forEach((key) => {
    key.addEventListener("click", () => {
      const action = key.dataset.calcAction;
      const value = key.dataset.calcValue;

      if (action === "clear") {
        calculatorExpression = "0";
      } else if (action === "equals") {
        try {
          // Limited to calculator button input only.
          const result = Function(`"use strict"; return (${calculatorExpression})`)();
          calculatorExpression = String(Number.isFinite(result) ? result : 0);
        } catch {
          calculatorExpression = "Erro";
        }
      } else if (value) {
        calculatorExpression =
          calculatorExpression === "0" || calculatorExpression === "Erro"
            ? value
            : `${calculatorExpression}${value}`;
      }

      calculatorDisplay.textContent = calculatorExpression;
    });
  });
}

moduleOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModuleModal(button.dataset.module);
  });
});

if (moduleModalForm) {
  moduleModalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeModule) {
      return;
    }

    const title = moduleEntryTitle.value.trim();
    if (!title) {
      return;
    }

    getModuleItems(activeModule).push({
      id: crypto.randomUUID(),
      title,
      category: moduleEntryCategory.value.trim(),
      description: moduleEntryDescription.value.trim(),
    });

    saveModuleStore();
    renderModuleList();
    moduleModalForm.reset();
  });
}

if (moduleModalClose) {
  moduleModalClose.addEventListener("click", closeModuleModal);
}

if (moduleModal) {
  moduleModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeModule === "true") {
      closeModuleModal();
    }
  });
}

if (calendarModalClose) {
  calendarModalClose.addEventListener("click", closeCalendarModal);
}

if (calendarModal) {
  calendarModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeCalendar === "true") {
      closeCalendarModal();
    }
  });
}

if (calendarModalForm) {
  calendarModalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const targetDate = calendarModalDate.value || selectedDateKey;
    const title = calendarModalTitleInput.value.trim();

    if (!title) {
      return;
    }

    ensureAgendaDay(targetDate).events.push({
      id: crypto.randomUUID(),
      time: calendarModalTime.value || "",
      title,
      location: calendarModalLocation.value.trim(),
      description: calendarModalDescription.value.trim(),
    });

    selectedDateKey = targetDate;
    saveAgendaStore();
    renderAgendaEvents();
    renderCalendar();
    openCalendarModal(targetDate);
    calendarModalForm.reset();
  });
}

if (installHelpButton) {
  installHelpButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      return;
    }
    openInstallModal();
  });
}

if (installModalClose) {
  installModalClose.addEventListener("click", closeInstallModal);
}

if (installModal) {
  installModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeInstall === "true") {
      closeInstallModal();
    }
  });
}

editorClose.addEventListener("click", closeEditor);

editorModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeEditor === "true") {
    closeEditor();
  }
});

editorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!activeCard) {
    return;
  }

  const nextData = {
    heading: editorHeading.value.trim(),
    subheading: editorSubheading.value.trim(),
    body: editorBody.value.trim(),
    list: editorList.value,
  };

  applyCardData(activeCard, nextData);
  saveCardState(activeCard);
  closeEditor();
});

editorReset.addEventListener("click", () => {
  if (!activeCard) {
    return;
  }

  const original = editableCardDefaults[activeCard.dataset.cardId];
  applyCardData(activeCard, {
    ...original,
    list: original.list.join("\n"),
  });
  localStorage.removeItem(`ela-em-ordem:${activeCard.dataset.cardId}`);
  openEditor(activeCard);
});

setTheme(localStorage.getItem("ela-em-ordem:theme") || "light");
setLayout(localStorage.getItem("ela-em-ordem:layout") || "soft");
hydrateSessionUI(requireSession());
restoreGridOrders();
restoreSavedCards();
initializeDragAndDrop();
renderVerse();
renderTasks();
renderTopTen();
renderCalendar();
renderAgendaEvents();
renderFinance();
renderDashboardMirror();
registerServiceWorker();
setupInstallPrompt();
