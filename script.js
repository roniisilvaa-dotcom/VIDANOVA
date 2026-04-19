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
const calendarMonthLabel = document.querySelector("#calendar-month-label");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarPrev = document.querySelector("#calendar-prev");
const calendarNext = document.querySelector("#calendar-next");
const selectedDateLabel = document.querySelector("#selected-date-label");
const agendaForm = document.querySelector("#agenda-form");
const agendaTimeInput = document.querySelector("#agenda-time-input");
const agendaTitleInput = document.querySelector("#agenda-title-input");
const agendaEventsList = document.querySelector("#agenda-events-list");
const agendaSummaryInput = document.querySelector("#agenda-summary-input");
const installBanner = document.querySelector("#install-banner");
const installButton = document.querySelector("#install-button");
const userGreeting = document.querySelector("#user-greeting");
const logoutButton = document.querySelector("#logout-button");
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
}

function saveTopTen() {
  localStorage.setItem("ela-em-ordem:top-ten", JSON.stringify(topTenItems));
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
      text.textContent = `${eventItem.time || "--:--"} - ${eventItem.title}`;

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
    });

    calendarGrid.appendChild(button);
  }
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

    if (installBanner) {
      installBanner.hidden = false;
    }
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    if (installBanner) {
      installBanner.hidden = true;
    }
  });

  if (installButton) {
    installButton.addEventListener("click", async () => {
      if (!deferredInstallPrompt) {
        return;
      }

      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;

      if (installBanner) {
        installBanner.hidden = true;
      }
    });
  }
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
  });
}

if (agendaForm) {
  agendaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = agendaTitleInput.value.trim();
    const time = agendaTimeInput.value || "";

    if (!title) {
      return;
    }

    ensureAgendaDay(selectedDateKey).events.push({
      id: crypto.randomUUID(),
      time,
      title,
    });

    saveAgendaStore();
    renderAgendaEvents();
    renderCalendar();
    agendaForm.reset();
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
registerServiceWorker();
setupInstallPrompt();
