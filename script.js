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

const headlineVerseText = document.querySelector("#headline-verse-text");
const headlineVerseReference = document.querySelector("#headline-verse-reference");
const changeVerseButton = document.querySelector("#change-verse-button");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskProgress = document.querySelector("#task-progress");
const notesInput = document.querySelector("#notes-input");
const summarySpotlight = document.querySelector("#summary-spotlight");
const focusCount = document.querySelector("#focus-count");
const focusProgress = document.querySelector("#focus-progress");
const agendaNextTitle = document.querySelector("#agenda-next-title");
const agendaNextMeta = document.querySelector("#agenda-next-meta");
const graphRoutine = document.querySelector("#graph-routine");
const graphAgenda = document.querySelector("#graph-agenda");
const graphFinance = document.querySelector("#graph-finance");
const calendarMonthLabel = document.querySelector("#calendar-month-label");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarPrev = document.querySelector("#calendar-prev");
const calendarNext = document.querySelector("#calendar-next");
const calendarMonthViewButton = document.querySelector("#calendar-month-view");
const calendarWeekViewButton = document.querySelector("#calendar-week-view");
const calendarMonthShell = document.querySelector("#calendar-month-shell");
const weekViewShell = document.querySelector("#week-view-shell");
const weekViewHeader = document.querySelector("#week-view-header");
const weekColumns = document.querySelector("#week-columns");
const weekHoursColumn = document.querySelector("#week-hours-column");
const selectedDateLabel = document.querySelector("#selected-date-label");
const agendaForm = document.querySelector("#agenda-form");
const agendaDateInput = document.querySelector("#agenda-date-input");
const agendaTimeInput = document.querySelector("#agenda-time-input");
const agendaEndTimeInput = document.querySelector("#agenda-end-time-input");
const agendaTitleInput = document.querySelector("#agenda-title-input");
const agendaLocationInput = document.querySelector("#agenda-location-input");
const agendaLinkInput = document.querySelector("#agenda-link-input");
const agendaCategoryInput = document.querySelector("#agenda-category-input");
const agendaColorInput = document.querySelector("#agenda-color-input");
const agendaDescriptionInput = document.querySelector("#agenda-description-input");
const agendaEventsList = document.querySelector("#agenda-events-list");
const agendaSummaryInput = document.querySelector("#agenda-summary-input");
const installBanner = document.querySelector("#install-banner");
const installHelpButton = document.querySelector("#install-help-button");
const installChromeButton = document.querySelector("#install-chrome-button");
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
const financePanelBalance = document.querySelector("#finance-panel-balance");
const financePanelCaption = document.querySelector("#finance-panel-caption");
const calculatorDisplay = document.querySelector("#calculator-display");
const calculatorKeys = document.querySelectorAll(".calc-key");
const financeEntryForm = document.querySelector("#finance-entry-form");
const financeEntryType = document.querySelector("#finance-entry-type");
const financeEntryCategory = document.querySelector("#finance-entry-category");
const financeEntryAmount = document.querySelector("#finance-entry-amount");
const financeEntryTitle = document.querySelector("#finance-entry-title");
const financeEntryDate = document.querySelector("#finance-entry-date");
const financeEntryInstallments = document.querySelector("#finance-entry-installments");
const financeEntryStartMonth = document.querySelector("#finance-entry-start-month");
const financeEntryColor = document.querySelector("#finance-entry-color");
const financeRecordsList = document.querySelector("#finance-records-list");
const financeTableBody = document.querySelector("#finance-table-body");
const financePlanningPreview = document.querySelector("#finance-planning-preview");
const financeSavingsDisplay = document.querySelector("#finance-savings-display");
const financeFixedDisplay = document.querySelector("#finance-fixed-display");
const financeVariableDisplay = document.querySelector("#finance-variable-display");
const financeImpulseDisplay = document.querySelector("#finance-impulse-display");
const financeNotesInput = document.querySelector("#finance-notes-input");
const financeComparisonGrid = document.querySelector("#finance-comparison-grid");
const moduleOpenButtons = document.querySelectorAll(".module-open-button");
const moduleOpenCards = document.querySelectorAll(".module-open-card");
const calendarModal = document.querySelector("#calendar-modal");
const calendarModalClose = document.querySelector("#calendar-modal-close");
const calendarModalTitle = document.querySelector("#calendar-modal-title");
const calendarModalEmpty = document.querySelector("#calendar-modal-empty");
const calendarModalList = document.querySelector("#calendar-modal-list");
const calendarTaskForm = document.querySelector("#calendar-task-form");
const calendarTaskInput = document.querySelector("#calendar-task-input");
const calendarDayTaskList = document.querySelector("#calendar-day-task-list");
const calendarModalForm = document.querySelector("#calendar-modal-form");
const calendarModalDate = document.querySelector("#calendar-modal-date");
const calendarModalTime = document.querySelector("#calendar-modal-time");
const calendarModalEndTime = document.querySelector("#calendar-modal-end-time");
const calendarModalTitleInput = document.querySelector("#calendar-modal-title-input");
const calendarModalLocation = document.querySelector("#calendar-modal-location");
const calendarModalLink = document.querySelector("#calendar-modal-link");
const calendarModalCategory = document.querySelector("#calendar-modal-category");
const calendarModalColor = document.querySelector("#calendar-modal-color");
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
const installModalChromeButton = document.querySelector("#install-modal-chrome-button");
const calendarModalTasks = document.querySelector("#calendar-modal-tasks");
const financeFilterButtons = document.querySelectorAll("[data-finance-filter]");
const interactiveStats = document.querySelectorAll(".interactive-stat");
const workspaceSurfaceButtons = document.querySelectorAll("[data-open-surface]");
const workspaceSurfaceBackButtons = document.querySelectorAll("[data-close-surface]");
const workspaceScrollHomeButtons = document.querySelectorAll("[data-scroll-home]");
const plannerPersistFields = document.querySelectorAll("[data-persist-key]");
const tabShells = document.querySelectorAll("[data-tab-group]");
const plannerVisionUpload = document.querySelector("#planner-vision-upload");
const plannerVisionGallery = document.querySelector("#planner-vision-gallery");
const editCardButtons = document.querySelectorAll("[data-edit-card]");
const modulePreviewLists = {
  wardrobe: document.querySelector("#wardrobe-preview-list"),
  home: document.querySelector("#home-preview-list"),
  body: document.querySelector("#body-preview-list"),
  travel: document.querySelector("#travel-preview-list"),
  spiritual: document.querySelector("#spiritual-preview-list"),
};
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
let deferredInstallPrompt = null;
let calendarCursor = new Date();
let selectedDateKey = formatDateKey(new Date());
let agendaView = localStorage.getItem("ela-em-ordem:agenda-view") || "month";
let agendaStore = JSON.parse(localStorage.getItem("ela-em-ordem:agenda-events") || "{}");
let activeFinanceFilter = localStorage.getItem("ela-em-ordem:finance-filter") || "all";
let financeStore = JSON.parse(localStorage.getItem("ela-em-ordem:finance") || "{}");
let calculatorExpression = "0";
let moduleStore = JSON.parse(localStorage.getItem("vida-nova:modules") || "{}");
let activeModule = null;

function isCompactAgendaViewport() {
  return window.matchMedia("(max-width: 720px)").matches;
}

financeStore = {
  planIncome: Number(financeStore.planIncome || 0),
  planExpense: Number(financeStore.planExpense || 0),
  goal: Number(financeStore.goal || 0),
  notes: String(financeStore.notes || ""),
  records: Array.isArray(financeStore.records) ? financeStore.records : [],
};

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
  if (headlineVerseText) {
    headlineVerseText.textContent = verse.text;
  }
  if (headlineVerseReference) {
    headlineVerseReference.textContent = verse.reference;
  }
}

function cycleVerse() {
  verseIndex = (verseIndex + 1) % verses.length;
  renderVerse();
}

function openWorkspaceSurface(surfaceId) {
  const target = document.querySelector(`#${surfaceId}`);
  if (!target) {
    return;
  }

  if (surfaceId === "planner-detail") {
    target.classList.remove("hidden");
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeWorkspaceSurface(surfaceId) {
  const target = document.querySelector(`#${surfaceId}`);
  if (!target) {
    return;
  }

  target.classList.add("hidden");
  const homeTarget = document.querySelector("#workspace-home") || document.querySelector("#dashboard");
  homeTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupPlannerPersistedFields() {
  plannerPersistFields.forEach((field) => {
    const key = field.dataset.persistKey;
    if (!key) {
      return;
    }

    const savedValue = localStorage.getItem(`vida-nova:planner:${key}`);
    if (savedValue !== null) {
      if (field.type === "checkbox") {
        field.checked = savedValue === "true";
      } else {
        field.value = savedValue;
      }
    }

    const eventName = field.tagName === "SELECT" || field.type === "checkbox" ? "change" : "input";
    field.addEventListener(eventName, () => {
      const value = field.type === "checkbox" ? String(field.checked) : field.value;
      localStorage.setItem(`vida-nova:planner:${key}`, value);
    });
  });
}

function setupTabs() {
  tabShells.forEach((shell) => {
    shell.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-tab-target]");
      if (!trigger) {
        return;
      }

      const target = trigger.dataset.tabTarget;
      const buttons = shell.querySelectorAll("[data-tab-target]");
      const panels = shell.querySelectorAll("[data-tab-panel]");

      buttons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.tabTarget === target);
      });

      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
      });
    });
  });
}

function getStoredPlannerVisionImages() {
  return JSON.parse(localStorage.getItem("vida-nova:planner-vision-images") || "[]");
}

function savePlannerVisionImages(images) {
  localStorage.setItem("vida-nova:planner-vision-images", JSON.stringify(images));
}

function renderPlannerVisionGallery(images = getStoredPlannerVisionImages()) {
  if (!plannerVisionGallery) {
    return;
  }

  plannerVisionGallery.innerHTML = "";

  if (!images.length) {
    plannerVisionGallery.innerHTML =
      '<div class="module-note">Adicione imagens para compor o mural dos sonhos da sua planner.</div>';
    return;
  }

  images.forEach((image, index) => {
    const wrapper = document.createElement("figure");
    wrapper.className = "dream-vision-card";
    wrapper.innerHTML = `
      <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.name || `Imagem ${index + 1}`)}" />
      <button type="button" class="task-remove dream-remove-button" data-planner-image-remove="${index}">Remover</button>
    `;
    plannerVisionGallery.appendChild(wrapper);
  });
}

function setupPlannerVisionUpload() {
  if (!plannerVisionUpload || !plannerVisionGallery) {
    return;
  }

  renderPlannerVisionGallery();

  plannerVisionUpload.addEventListener("change", () => {
    const files = Array.from(plannerVisionUpload.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve({
                name: file.name,
                src: String(reader.result || ""),
              });
            reader.onerror = () => reject(new Error("Falha ao ler imagem da planner."));
            reader.readAsDataURL(file);
          }),
      ),
    )
      .then((images) => {
        const nextImages = [...getStoredPlannerVisionImages(), ...images].slice(-12);
        savePlannerVisionImages(nextImages);
        renderPlannerVisionGallery(nextImages);
        plannerVisionUpload.value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  });

  plannerVisionGallery.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-planner-image-remove]");
    if (!removeButton) {
      return;
    }

    const removeIndex = Number(removeButton.dataset.plannerImageRemove);
    const nextImages = getStoredPlannerVisionImages().filter((_, index) => index !== removeIndex);
    savePlannerVisionImages(nextImages);
    renderPlannerVisionGallery(nextImages);
  });
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

function formatTimeRange(startTime, endTime) {
  if (!startTime && !endTime) {
    return "--:--";
  }
  if (!endTime) {
    return startTime || "--:--";
  }
  return `${startTime || "--:--"} - ${endTime}`;
}

function getEventDurationMinutes(eventItem) {
  const [startHour = 0, startMinute = 0] = String(eventItem.time || "00:00")
    .split(":")
    .map(Number);
  const [endHour = startHour, endMinute = startMinute + 30] = String(
    eventItem.endTime || eventItem.time || "00:30",
  )
    .split(":")
    .map(Number);
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;
  return Math.max(15, endTotal - startTotal);
}

function getWeekStart(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay());
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function renderFinance() {
  const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const records = financeStore.records || [];
  const filteredRecords =
    activeFinanceFilter === "all"
      ? records
      : records.filter((entry) => entry.type === activeFinanceFilter);
  const recordedIncome = records
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
  const recordedExpense = fixed + variable + impulse + savings;
  const planIncome = Number(financeStore.planIncome || 0);
  const planExpense = Number(financeStore.planExpense || 0);
  const income = recordedIncome || planIncome;
  const expense = recordedExpense || planExpense;
  const goal = Number(financeStore.goal || 0);
  const balance = income - expense;

  if (financeIncomeInput) {
    financeIncomeInput.value = planIncome || "";
  }
  if (financeExpenseInput) {
    financeExpenseInput.value = planExpense || "";
  }
  if (financeGoalInput) {
    financeGoalInput.value = goal || "";
  }
  if (financeNotesInput) {
    financeNotesInput.value = financeStore.notes || "";
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
  if (financePanelBalance) {
    financePanelBalance.textContent = formatCurrency(balance);
  }
  if (financeCaption) {
    financeCaption.textContent =
      records.length > 0
        ? `Lancamentos ativos: entradas ${formatCurrency(recordedIncome)} | saidas ${formatCurrency(recordedExpense)}`
        : `Planejamento base: entradas ${formatCurrency(planIncome)} | saidas ${formatCurrency(planExpense)}`;
  }
  if (financePanelCaption) {
    financePanelCaption.textContent =
      records.length > 0
        ? `Lancamentos ativos: entradas ${formatCurrency(recordedIncome)} | saidas ${formatCurrency(recordedExpense)}`
        : `Planejamento base: entradas ${formatCurrency(planIncome)} | saidas ${formatCurrency(planExpense)}`;
  }
  if (financePlanningPreview) {
    financePlanningPreview.textContent = planningItems.length
      ? `${planningItems[planningItems.length - 1].title} | ${planningItems.length} planejamento(s) ativo(s)`
      : "Nenhum planejamento registrado.";
  }
  financeFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.financeFilter === activeFinanceFilter);
  });
  if (financeTableBody) {
    financeTableBody.innerHTML = "";

    if (!filteredRecords.length) {
      financeTableBody.innerHTML =
        '<tr><td colspan="18">Nenhum lancamento cadastrado ainda.</td></tr>';
    } else {
      filteredRecords
        .slice()
        .reverse()
        .forEach((entry) => {
          const row = document.createElement("tr");
          const dateText = entry.date
            ? new Date(`${entry.date}T12:00:00`).toLocaleDateString("pt-BR")
            : "--/--/----";
          const installments = Number(entry.installments || 1);
          const installmentAmount = Number(entry.amount || 0) / Math.max(1, installments);
          const startMonth = Number.isFinite(Number(entry.startMonth))
            ? Number(entry.startMonth)
            : entry.date
              ? new Date(`${entry.date}T12:00:00`).getMonth()
              : 0;
          const monthCells = monthLabels
            .map((_, index) => {
              const active = index >= startMonth && index < startMonth + installments;
              return `<td><span class="finance-month-mark${active ? " is-active" : ""}"></span></td>`;
            })
            .join("");

          row.innerHTML = `
            <td><span class="finance-badge" style="background:${escapeHtml(entry.color || "#ffd166")}">${escapeHtml(entry.title)}</span><br><small>${escapeHtml(entry.category || "Sem categoria")}</small></td>
            <td>${dateText}</td>
            <td>${formatCurrency(entry.amount)}</td>
            <td>${installments}</td>
            <td>${formatCurrency(installmentAmount)}</td>
            ${monthCells}
            <td><button type="button" class="task-remove finance-remove-button" data-finance-id="${escapeHtml(entry.id)}">Excluir</button></td>
          `;
          financeTableBody.appendChild(row);
      });
    }
  }

  if (financeComparisonGrid) {
    const monthlyTotals = monthLabels.map((label, index) => {
      const monthRecords = records.filter((entry) => {
        const date = entry.date ? new Date(`${entry.date}T12:00:00`) : null;
        return date ? date.getMonth() === index : Number(entry.startMonth || 0) === index;
      });
      const monthIncome = monthRecords
        .filter((entry) => entry.type === "income")
        .reduce((total, entry) => total + Number(entry.amount || 0), 0);
      const monthExpense = monthRecords
        .filter((entry) => entry.type !== "income")
        .reduce((total, entry) => total + Number(entry.amount || 0), 0);
      return {
        label,
        income: monthIncome,
        expense: monthExpense,
        balance: monthIncome - monthExpense,
      };
    });

    financeComparisonGrid.innerHTML = monthlyTotals
      .map(
        (month) => `
          <article class="detail-card">
            <span class="metric-label">${month.label}</span>
            <strong>${formatCurrency(month.balance)}</strong>
            <small>Entradas ${formatCurrency(month.income)} | Saidas ${formatCurrency(month.expense)}</small>
          </article>
        `,
      )
      .join("");
  }

  if (financeRecordsList) {
    financeRecordsList.innerHTML = "";
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
  moduleModalList.innerHTML = "";

  if (!items.length) {
    moduleModalList.innerHTML =
      '<li class="task-item"><span class="task-text">Nada cadastrado ainda.</span></li>';
    return;
  }

  items
    .slice()
    .reverse()
    .forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "task-item";

      const text = document.createElement("span");
      text.className = "task-text";
      text.innerHTML = `<strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.category || "Sem categoria")} | ${escapeHtml(item.description || "Sem descricao")}</small>`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "task-remove";
      remove.textContent = "Excluir";
      remove.addEventListener("click", () => {
        moduleStore[activeModule] = moduleStore[activeModule].filter(
          (currentItem) => currentItem.id !== item.id,
        );
        saveModuleStore();
        renderModuleList();
        renderModuleCards();
      });

      listItem.append(text, remove);
      moduleModalList.appendChild(listItem);
    });
}

function renderModuleCards() {
  Object.entries(modulePreviewLists).forEach(([moduleKey, listElement]) => {
    if (!listElement) {
      return;
    }

    const items = getModuleItems(moduleKey).slice(-3).reverse();
    listElement.innerHTML = items.length
      ? items
          .map(
            (item) =>
              `<li><strong>${escapeHtml(item.title)}</strong><br><small>${escapeHtml(item.category || "Sem categoria")}</small></li>`,
          )
          .join("")
      : "<li>Nada cadastrado ainda.</li>";
  });
}

function openCalendarModal(dateKey) {
  if (!calendarModal) {
    return;
  }
  selectedDateKey = dateKey;
  const dayData = ensureAgendaDay(dateKey);
  calendarModalTitle.textContent = formatDisplayDate(dateKey);
  calendarModalDate.value = dateKey;
  if (calendarModalColor) {
    calendarModalColor.value = "#c55b84";
  }
  calendarModalList.innerHTML = "";
  if (dayData.events.length) {
    dayData.events
      .slice()
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""))
      .forEach((eventItem) => {
        const item = document.createElement("li");
        item.className = "task-item";

        const text = document.createElement("span");
        text.className = "task-text";
        text.innerHTML = `<strong><span class="event-color-dot" style="background:${escapeHtml(eventItem.color || "#c55b84")}"></span>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))} - ${escapeHtml(eventItem.title)}</strong><small>${escapeHtml(eventItem.category || "Pessoal")} | ${escapeHtml(eventItem.location || "Sem local")} | ${escapeHtml(eventItem.description || "Sem descricao")}${eventItem.link ? ` | <a href="${escapeHtml(eventItem.link)}" target="_blank" rel="noreferrer">abrir link</a>` : ""}</small>`;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "task-remove";
        remove.textContent = "Excluir";
        remove.addEventListener("click", () => {
          agendaStore[dateKey].events = agendaStore[dateKey].events.filter(
            (currentEvent) => currentEvent.id !== eventItem.id,
          );
          saveAgendaStore();
          openCalendarModal(dateKey);
          renderAgendaEvents();
          renderCalendar();
        });

        item.append(text, remove);
        calendarModalList.appendChild(item);
      });
  }
  if (calendarDayTaskList) {
    calendarDayTaskList.innerHTML = "";
    if (dayData.tasks.length) {
      dayData.tasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = `task-item${task.done ? " done" : ""}`;

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "task-check";
        toggle.setAttribute("aria-label", "Concluir tarefa do dia");
        toggle.addEventListener("click", () => {
          agendaStore[dateKey].tasks = agendaStore[dateKey].tasks.map((currentTask) =>
            currentTask.id === task.id ? { ...currentTask, done: !currentTask.done } : currentTask,
          );
          saveAgendaStore();
          openCalendarModal(dateKey);
          renderCalendar();
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "task-remove";
        remove.textContent = "Excluir";
        remove.addEventListener("click", () => {
          agendaStore[dateKey].tasks = agendaStore[dateKey].tasks.filter(
            (currentTask) => currentTask.id !== task.id,
          );
          saveAgendaStore();
          openCalendarModal(dateKey);
          renderCalendar();
        });

        item.append(toggle, text, remove);
        calendarDayTaskList.appendChild(item);
      });
    } else {
      calendarDayTaskList.innerHTML =
        '<li class="task-item"><span class="task-text">Nenhuma tarefa cadastrada para este dia.</span></li>';
    }
  }
  calendarModalEmpty.hidden = dayData.events.length > 0 || dayData.tasks.length > 0;
  if (calendarModalTasks) {
    calendarModalTasks.innerHTML = tasks.length
      ? tasks
          .map(
            (task) =>
              `<li class="${task.done ? "is-done" : ""}">${escapeHtml(task.text)}</li>`,
          )
          .join("")
      : "<li>Nenhuma tarefa cadastrada.</li>";
  }
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

async function triggerInstallFlow() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    return;
  }

  openInstallModal();
}

function closeInstallModal() {
  if (!installModal) {
    return;
  }
  installModal.classList.add("hidden");
  installModal.setAttribute("aria-hidden", "true");
}

function renderDashboardMirror() {
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

  if (graphFinance) {
    const records = financeStore.records || [];
    const income = records
      .filter((entry) => entry.type === "income")
      .reduce((total, entry) => total + Number(entry.amount || 0), 0);
    const expense = records
      .filter((entry) => entry.type !== "income")
      .reduce((total, entry) => total + Number(entry.amount || 0), 0);
    const ratio = income > 0 ? Math.max(10, Math.min(100, ((income - expense) / income) * 100)) : 10;
    graphFinance.style.width = `${ratio}%`;
  }
}

if (changeVerseButton) {
  changeVerseButton.addEventListener("click", cycleVerse);
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
    agendaStore[dateKey] = { summary: "", events: [], tasks: [] };
  }

  if (!Array.isArray(agendaStore[dateKey].events)) {
    agendaStore[dateKey].events = [];
  }

  if (!Array.isArray(agendaStore[dateKey].tasks)) {
    agendaStore[dateKey].tasks = [];
  }

  agendaStore[dateKey].events = agendaStore[dateKey].events.map((eventItem) => ({
    color: "#c55b84",
    category: "Pessoal",
    endTime: eventItem.time || "09:00",
    link: "",
    ...eventItem,
  }));

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
        <strong><span class="event-color-dot" style="background:${escapeHtml(eventItem.color || "#c55b84")}"></span>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))} - ${escapeHtml(eventItem.title)}</strong>
        <small>${escapeHtml(eventItem.category || "Pessoal")} | ${escapeHtml(eventItem.location || "Sem local")} | ${escapeHtml(eventItem.description || "Sem descricao")}${eventItem.link ? ` | <a href="${escapeHtml(eventItem.link)}" target="_blank" rel="noreferrer">abrir link</a>` : ""}</small>
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
  renderWeekView();
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

  if (agendaView === "week") {
    const weekStart = getWeekStart(selectedDateKey);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    calendarMonthLabel.textContent = `${weekStart.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} - ${weekEnd.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}`;
  }

  if (calendarMonthShell && weekViewShell && calendarMonthViewButton && calendarWeekViewButton) {
    const isMonthView = agendaView === "month";
    calendarMonthShell.classList.toggle("hidden", !isMonthView);
    weekViewShell.classList.toggle("hidden", isMonthView);
    calendarMonthViewButton.classList.toggle("is-active", isMonthView);
    calendarWeekViewButton.classList.toggle("is-active", !isMonthView);
  }

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
    const taskCount = dayData.tasks.length;
    const metaParts = [];
    if (eventCount) {
      metaParts.push(`${eventCount} compromisso${eventCount > 1 ? "s" : ""}`);
    }
    if (taskCount) {
      metaParts.push(`${taskCount} tarefa${taskCount > 1 ? "s" : ""}`);
    }
    const eventDots = dayData.events
      .slice(0, 3)
      .map(
        (eventItem) =>
          `<span class="event-color-dot" style="background:${escapeHtml(eventItem.color || "#c55b84")}"></span>`,
      )
      .join("");
    button.innerHTML = `
      <span class="calendar-day-number">${dayNumber}</span>
      <span class="calendar-day-dots">${eventDots}</span>
      <span class="calendar-day-meta">${metaParts.length ? metaParts.join(" • ") : "Livre"}</span>
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

function renderWeekView() {
  if (!weekColumns || !weekHoursColumn || !weekViewHeader) {
    return;
  }

  const weekStart = getWeekStart(selectedDateKey);
  const isCompactView = isCompactAgendaViewport();
  const hours = Array.from({ length: 17 }, (_, index) => 6 + index);
  weekHoursColumn.innerHTML = isCompactView
    ? ""
    : hours
        .map((hour) => `<div class="week-hour-label">${String(hour).padStart(2, "0")}:00</div>`)
        .join("");

  weekViewHeader.innerHTML = isCompactView
    ? ""
    : Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + dayIndex);
    const dateKey = formatDateKey(date);
    const isSelected = dateKey === selectedDateKey;
    return `<button type="button" class="week-day-head${isSelected ? " is-selected" : ""}" data-week-date="${dateKey}">
      <span>${date.toLocaleDateString("pt-BR", { weekday: "short" })}</span>
      <strong>${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</strong>
    </button>`;
  }).join("");

  weekColumns.innerHTML = Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + dayIndex);
    const dateKey = formatDateKey(date);
    const dayData = ensureAgendaDay(dateKey);
    const blocks = dayData.events
      .slice()
      .sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")))
      .map((eventItem) => {
        if (isCompactView) {
          return `<button type="button" class="week-event-block week-event-block-mobile" data-event-date="${dateKey}" data-event-id="${escapeHtml(eventItem.id)}" style="background:${escapeHtml(eventItem.color || "#c55b84")}">
            <strong>${escapeHtml(eventItem.title)}</strong>
            <small>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))}</small>
          </button>`;
        }
        const [startHour = 6, startMinute = 0] = String(eventItem.time || "06:00").split(":").map(Number);
        const startTotal = startHour * 60 + startMinute;
        const minutesFromStart = Math.max(0, startTotal - 360);
        const top = (minutesFromStart / 15) * 20;
        const height = Math.max(20, (getEventDurationMinutes(eventItem) / 15) * 20);
        return `<button type="button" class="week-event-block" data-event-date="${dateKey}" data-event-id="${escapeHtml(eventItem.id)}" style="top:${top}px;height:${height}px;background:${escapeHtml(eventItem.color || "#c55b84")}">
          <strong>${escapeHtml(eventItem.title)}</strong>
          <small>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))}</small>
        </button>`;
      })
      .join("");

    const compactLabel = isCompactView
      ? `<div class="week-day-mobile-label">
          <span>${date.toLocaleDateString("pt-BR", { weekday: "long" })}</span>
          <strong>${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</strong>
        </div>`
      : "";

    return `<div class="week-day-column${isCompactView ? " is-mobile" : ""}" data-week-column="${dateKey}">
      ${compactLabel}
      <button type="button" class="week-column-hit" data-week-date="${dateKey}" aria-label="Abrir dia ${dateKey}"></button>
      ${blocks}
    </div>`;
  }).join("");
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
  agendaNextMeta.textContent = `${formatTimeRange(nextEvent.time, nextEvent.endTime)} | ${nextEvent.location || "Sem local"}`;
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

interactiveStats.forEach((card) => {
  card.addEventListener("click", () => {
    const target = document.querySelector(card.dataset.scrollTarget || "");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if ("focus" in target) {
        target.focus({ preventScroll: true });
      }
    }
  });
});

workspaceSurfaceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const surfaceId = button.dataset.openSurface;
    if (surfaceId) {
      openWorkspaceSurface(surfaceId);
      return;
    }

    if (button.dataset.module) {
      openModuleModal(button.dataset.module);
    }
  });
});

workspaceSurfaceBackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const surfaceId = button.dataset.closeSurface;
    if (surfaceId) {
      closeWorkspaceSurface(surfaceId);
    }
  });
});

workspaceScrollHomeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const homeTarget = document.querySelector(`#${button.dataset.scrollHome}`) || document.querySelector("#dashboard");
    homeTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

editCardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = document.querySelector(`[data-card-id="${button.dataset.editCard}"]`);
    if (card) {
      openEditor(card);
    }
  });
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
    const endTime = agendaEndTimeInput.value || "";
    const location = agendaLocationInput.value.trim();
    const link = agendaLinkInput.value.trim();
    const category = agendaCategoryInput.value || "Pessoal";
    const color = agendaColorInput.value || "#c55b84";
    const description = agendaDescriptionInput.value.trim();

    if (!title) {
      return;
    }

    ensureAgendaDay(targetDate).events.push({
      id: crypto.randomUUID(),
      time,
      endTime,
      title,
      location,
      link,
      category,
      color,
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
    if (agendaView === "month") {
      calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
    } else {
      const current = new Date(`${selectedDateKey}T12:00:00`);
      current.setDate(current.getDate() - 7);
      selectedDateKey = formatDateKey(current);
      calendarCursor = new Date(current);
    }
    renderCalendar();
    renderWeekView();
    renderAgendaEvents();
  });
}

if (calendarNext) {
  calendarNext.addEventListener("click", () => {
    if (agendaView === "month") {
      calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
    } else {
      const current = new Date(`${selectedDateKey}T12:00:00`);
      current.setDate(current.getDate() + 7);
      selectedDateKey = formatDateKey(current);
      calendarCursor = new Date(current);
    }
    renderCalendar();
    renderWeekView();
    renderAgendaEvents();
  });
}

if (calendarMonthViewButton) {
  calendarMonthViewButton.addEventListener("click", () => {
    agendaView = "month";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    renderCalendar();
    renderWeekView();
  });
}

if (calendarWeekViewButton) {
  calendarWeekViewButton.addEventListener("click", () => {
    agendaView = "week";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    renderCalendar();
    renderWeekView();
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

if (financeIncomeInput) {
  financeIncomeInput.addEventListener("input", () => {
    financeStore.planIncome = Number(financeIncomeInput.value || 0);
    saveFinanceStore();
    renderFinance();
  });
}

if (financeExpenseInput) {
  financeExpenseInput.addEventListener("input", () => {
    financeStore.planExpense = Number(financeExpenseInput.value || 0);
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
    const installments = Math.max(1, Number(financeEntryInstallments?.value || 1));
    const date = financeEntryDate?.value || "";
    const startMonth = Number(financeEntryStartMonth?.value || (date ? new Date(`${date}T12:00:00`).getMonth() : 0));

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
      category: financeEntryCategory?.value.trim() || "Sem categoria",
      color: financeEntryColor?.value || "#ffd166",
      date,
      installments,
      startMonth,
    });

    saveFinanceStore();
    renderFinance();
    financeEntryForm.reset();
  });
}

if (financeNotesInput) {
  financeNotesInput.addEventListener("input", () => {
    financeStore.notes = financeNotesInput.value;
    saveFinanceStore();
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".finance-remove-button");
  if (!button) {
    return;
  }

  financeStore.records = financeStore.records.filter(
    (currentEntry) => currentEntry.id !== button.dataset.financeId,
  );
  saveFinanceStore();
  renderFinance();
});

financeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFinanceFilter = button.dataset.financeFilter || "all";
    localStorage.setItem("ela-em-ordem:finance-filter", activeFinanceFilter);
    renderFinance();
  });
});

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
    if (button.dataset.openSurface) {
      openWorkspaceSurface(button.dataset.openSurface);
      return;
    }
    openModuleModal(button.dataset.module);
  });
});

moduleOpenCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("button, input, textarea, select, a")) {
      return;
    }
    if (card.dataset.openSurface) {
      openWorkspaceSurface(card.dataset.openSurface);
      return;
    }
    openModuleModal(card.dataset.module);
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
    renderModuleCards();
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
      endTime: calendarModalEndTime.value || "",
      title,
      location: calendarModalLocation.value.trim(),
      link: calendarModalLink.value.trim(),
      category: calendarModalCategory.value || "Pessoal",
      color: calendarModalColor.value || "#c55b84",
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

if (calendarTaskForm) {
  calendarTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const targetDate = calendarModalDate?.value || selectedDateKey;
    const text = calendarTaskInput?.value.trim();

    if (!text) {
      return;
    }

    ensureAgendaDay(targetDate).tasks.push({
      id: crypto.randomUUID(),
      text,
      done: false,
    });

    selectedDateKey = targetDate;
    saveAgendaStore();
    openCalendarModal(targetDate);
    renderCalendar();
    renderAgendaEvents();
    calendarTaskForm.reset();
  });
}

if (installHelpButton) {
  installHelpButton.addEventListener("click", () => {
    openInstallModal();
  });
}

if (installChromeButton) {
  installChromeButton.addEventListener("click", async () => {
    await triggerInstallFlow();
  });
}

if (installModalChromeButton) {
  installModalChromeButton.addEventListener("click", async () => {
    await triggerInstallFlow();
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

if (weekViewHeader) {
  weekViewHeader.addEventListener("click", (event) => {
    const button = event.target.closest("[data-week-date]");
    if (!button) {
      return;
    }
    selectedDateKey = button.dataset.weekDate;
    calendarCursor = new Date(`${selectedDateKey}T12:00:00`);
    renderCalendar();
    renderAgendaEvents();
    openCalendarModal(selectedDateKey);
  });
}

if (weekColumns) {
  weekColumns.addEventListener("click", (event) => {
    const eventBlock = event.target.closest("[data-event-date]");
    if (eventBlock) {
      selectedDateKey = eventBlock.dataset.eventDate;
      renderAgendaEvents();
      openCalendarModal(selectedDateKey);
      return;
    }

    const column = event.target.closest("[data-week-date]");
    if (column) {
      selectedDateKey = column.dataset.weekDate;
      calendarCursor = new Date(`${selectedDateKey}T12:00:00`);
      renderCalendar();
      renderAgendaEvents();
      openCalendarModal(selectedDateKey);
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
renderCalendar();
renderAgendaEvents();
renderFinance();
renderDashboardMirror();
renderModuleCards();
setupPlannerPersistedFields();
setupTabs();
setupPlannerVisionUpload();
registerServiceWorker();
setupInstallPrompt();
