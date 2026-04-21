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

const initialAgendaEvents = {
  "2026-04-13": {
    summary: "",
    events: [
      { id: crypto.randomUUID(), title: "Reunião Camila", time: "10:00", endTime: "11:00", location: "", color: "#a6d4ff", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Preparo atendimento Valeria", time: "11:00", endTime: "12:45", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Almoço", time: "12:00", endTime: "1:00", location: "", color: "#e0d5ff", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Preparo atendimento Valeria", time: "12:45", endTime: "1:30", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Editar Youtube + capas + thumbnail", time: "2:30", endTime: "5:30", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Confeccao 10", time: "7:00", endTime: "9:00", location: "", color: "#bfe8d6", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Dormir, 9:30pm", time: "21:30", endTime: "23:00", location: "", color: "#a6d4ff", category: "Pessoal" },
    ],
    tasks: [],
  },
  "2026-04-14": {
    summary: "",
    events: [
      { id: crypto.randomUUID(), title: "Reunião Origem Chem. 9:59am", time: "09:00", endTime: "10:30", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Editar shorts", time: "10:15", endTime: "11:00", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Programar/ Youtube (shorts)", time: "11:00", endTime: "12:00", location: "", color: "#a6d4ff", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Almoço", time: "12:00", endTime: "1:00", location: "", color: "#e0d5ff", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Sessão I | Consultoria de imagem - Valéria Maia", time: "1:00", endTime: "2:30", location: "", color: "#a6d4ff", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Ação Afiliadas - Ação Afiliadas GE", time: "2:30", endTime: "5:30", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Dormir, 9:30pm", time: "21:30", endTime: "23:00", location: "", color: "#a6d4ff", category: "Pessoal" },
    ],
    tasks: [],
  },
  "2026-04-15": {
    summary: "",
    events: [
      { id: crypto.randomUUID(), title: "Projeto Marlene (não terminei)", time: "9:45", endTime: "10:00", location: "", color: "#bfe8d6", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Editar shorts", time: "10:15", endTime: "11:00", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Programar/ Youtube (shorts)", time: "11:00", endTime: "12:00", location: "", color: "#a6d4ff", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Almoço", time: "12:00", endTime: "1:00", location: "", color: "#e0d5ff", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Projeto Marlene Oliveira", time: "1:00", endTime: "3:00", location: "", color: "#bfe8d6", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Visitar lar no hospital", time: "6:00", endTime: "9:30", location: "", color: "#f8bfd3", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Dormir, 11pm", time: "23:00", endTime: "23:59", location: "", color: "#a6d4ff", category: "Pessoal" },
    ],
    tasks: [],
  },
  "2026-04-16": {
    summary: "",
    events: [
      { id: crypto.randomUUID(), title: "SESSÃO 10 | Giselly Ramos | Formação/Mentoria na 11", time: "10:00", endTime: "11:00", location: "", color: "#a6d4ff", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Laços de Moda - Laços de Moda", time: "12:00", endTime: "1:00", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Almoço", time: "12:00", endTime: "1:00", location: "", color: "#e0d5ff", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Programar shorts - tiktok", time: "1:00", endTime: "5:00", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Cuidado", time: "6:00", endTime: "7:30", location: "", color: "#ddd2ff", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Dormir, 11:30pm", time: "23:30", endTime: "23:59", location: "", color: "#a6d4ff", category: "Pessoal" },
    ],
    tasks: [],
  },
  "2026-04-17": {
    summary: "",
    events: [
      { id: crypto.randomUUID(), title: "Laços de Moda - Laços de Moda", time: "12:00", endTime: "1:00", location: "", color: "#f8bfd3", category: "Trabalho" },
      { id: crypto.randomUUID(), title: "Almoço", time: "12:00", endTime: "1:00", location: "", color: "#e0d5ff", category: "Pessoal" },
    ],
    tasks: [],
  },
  "2026-04-18": {
    summary: "",
    events: [
      { id: crypto.randomUUID(), title: "Cuido", time: "6:00", endTime: "10:30", location: "", color: "#a6d4ff", category: "Pessoal" },
    ],
    tasks: [],
  },
  "2026-04-19": {
    summary: "",
    events: [
      { id: crypto.randomUUID(), title: "Tarefa pendente", time: "8:00", endTime: "9:00", location: "", color: "#a6d4ff", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Lavar e secar cabelo, 9:30", time: "09:30", endTime: "11:00", location: "", color: "#ddd2ff", category: "Pessoal" },
      { id: crypto.randomUUID(), title: "Dormir, 11:30pm", time: "23:30", endTime: "23:59", location: "", color: "#a6d4ff", category: "Pessoal" },
    ],
    tasks: [],
  },
};

const defaultCalendars = [
  { id: "pessoal", name: "Pessoal", color: "#4285f4", visible: true },
  { id: "trabalho", name: "Trabalho", color: "#34a853", visible: true },
  { id: "casa", name: "Casa", color: "#fbbc04", visible: true },
  { id: "espiritual", name: "Espiritual", color: "#a142f4", visible: true },
];

const initialFinanceRecords = [
  { id: crypto.randomUUID(), title: "Anuidade", date: "2025-03-02", type: "planning", category: "Pessoal", amount: 41.66, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Google drive", date: "2026-03-26", type: "planning", category: "Pessoal", amount: 49.99, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "IOF compra internacional", date: "2026-03-23", type: "planning", category: "Pessoal", amount: 3.65, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Presente mae do Roni", date: "2026-03-20", type: "planning", category: "Pessoal", amount: 228.9, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Opus clip", date: "2026-03-20", type: "variable", category: "Pessoal", amount: 105.04, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Telefone Vivo", date: "2026-03-13", type: "fixed", category: "Pessoal", amount: 105.04, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Greatpages", date: "2026-03-07", type: "planning", category: "Pessoal", amount: 69.9, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Trafego (meta)", date: "2026-03-04", type: "planning", category: "Pessoal", amount: 150.3, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Microsoft", date: "2026-03-04", type: "planning", category: "Pessoal", amount: 12, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Simple Organic", date: "2026-03-04", type: "variable", category: "Pessoal", amount: 192.8, installments: 2, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "IOF compra internacional", date: "2026-03-04", type: "planning", category: "Pessoal", amount: 1.89, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "IOF compra internacional", date: "2026-03-04", type: "variable", category: "Pessoal", amount: 251.43, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Icloud", date: "2026-03-03", type: "planning", category: "Pessoal", amount: 19.9, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Posto Dakota", date: "2026-03-03", type: "variable", category: "Pessoal", amount: 150, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Iphone", date: "2026-03-03", type: "planning", category: "Pessoal", amount: 19.69, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Sorvete 4D", date: "2026-03-03", type: "impulse", category: "Pessoal", amount: 54.25, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Compra shopping China", date: "2026-03-03", type: "variable", category: "Pessoal", amount: 7183.93, installments: 1, startMonth: 2, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Móveis escritório", date: "2026-02-08", type: "planning", category: "Pessoal", amount: 224.96, installments: 2, startMonth: 1, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Móveis escritório", date: "2026-02-04", type: "planning", category: "Pessoal", amount: 111.06, installments: 2, startMonth: 1, color: "#ffc885" },
  { id: crypto.randomUUID(), title: "Móveis escritório", date: "2026-02-03", type: "planning", category: "Pessoal", amount: 353.2, installments: 2, startMonth: 1, color: "#ffc885" },
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
const calendarMiniLabel = document.querySelector("#calendar-mini-label");
const calendarList = document.querySelector("#calendar-list");
const calendarAddButton = document.querySelector("#calendar-add-button");
const agendaCreateButton = document.querySelector("#agenda-create-button");
const agendaSearchInput = document.querySelector("#agenda-search-input");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarMiniGrid = document.querySelector("#calendar-mini-grid");
const calendarPrev = document.querySelector("#calendar-prev");
const calendarNext = document.querySelector("#calendar-next");
const calendarToday = document.querySelector("#calendar-today");
const calendarDayViewButton = document.querySelector("#calendar-day-view");
const calendarMonthViewButton = document.querySelector("#calendar-month-view");
const calendarWeekViewButton = document.querySelector("#calendar-week-view");
const calendarYearViewButton = document.querySelector("#calendar-year-view");
const calendarScheduleViewButton = document.querySelector("#calendar-schedule-view");
const calendarCustomViewButton = document.querySelector("#calendar-custom-view");
const calendarCustomDaysInput = document.querySelector("#calendar-custom-days-input");
const customDaysField = document.querySelector("#custom-days-field");
const calendarMonthShell = document.querySelector("#calendar-month-shell");
const weekViewShell = document.querySelector("#week-view-shell");
const yearViewShell = document.querySelector("#year-view-shell");
const scheduleViewShell = document.querySelector("#schedule-view-shell");
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
const agendaGuestsInput = document.querySelector("#agenda-guests-input");
const agendaCalendarInput = document.querySelector("#agenda-calendar-input");
const agendaCategoryInput = document.querySelector("#agenda-category-input");
const agendaRecurrenceInput = document.querySelector("#agenda-recurrence-input");
const agendaColorInput = document.querySelector("#agenda-color-input");
const agendaDescriptionInput = document.querySelector("#agenda-description-input");
const agendaEventsList = document.querySelector("#agenda-events-list");
const agendaSummaryInput = document.querySelector("#agenda-summary-input");
const installBanner = document.querySelector("#install-banner");
const installHelpButton = document.querySelector("#install-help-button");
const installChromeButton = document.querySelector("#install-chrome-button");
const subscriptionGate = document.querySelector("#subscription-gate");
const subscriptionGateStatus = document.querySelector("#subscription-gate-status");
const subscriptionGateCopy = document.querySelector("#subscription-gate-copy");
const subscriptionRenewButton = document.querySelector("#subscription-renew-button");
const subscriptionOpenSettings = document.querySelector("#subscription-open-settings");
const userGreeting = document.querySelector("#user-greeting");
const logoutButton = document.querySelector("#logout-button");
const settingsButton = document.querySelector("#settings-button");
const homeButton = document.querySelector("#home-button");
const sidebarAdminLink = document.querySelector("#sidebar-admin-link");
const mobileAdminLink = document.querySelector("#mobile-admin-link");
const adminShortcutCard = document.querySelector("#admin-shortcut-card");
const adminDashboardCard = document.querySelector("#admin-dashboard-card");
const adminOpenPanel = document.querySelector("#admin-open-panel");
const adminRefreshUsers = document.querySelector("#admin-refresh-users");
const adminUsersList = document.querySelector("#admin-users-list");
const adminFeedback = document.querySelector("#admin-feedback");
const adminTotalUsers = document.querySelector("#admin-total-users");
const adminActiveUsers = document.querySelector("#admin-active-users");
const adminPendingUsers = document.querySelector("#admin-pending-users");
const adminInactiveUsers = document.querySelector("#admin-inactive-users");
const adminAdminUsers = document.querySelector("#admin-admin-users");
const adminSearchInput = document.querySelector("#admin-search-input");
const adminStatusFilter = document.querySelector("#admin-status-filter");
const adminRoleFilter = document.querySelector("#admin-role-filter");
const adminActivityList = document.querySelector("#admin-activity-list");
const goHomeButtons = document.querySelectorAll("[data-go-home]");
const topbarAvatar = document.querySelector("#topbar-avatar");
const topbarEmail = document.querySelector("#topbar-email");
const topbarPlan = document.querySelector("#topbar-plan");
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
const calendarModalGuests = document.querySelector("#calendar-modal-guests");
const calendarModalCalendar = document.querySelector("#calendar-modal-calendar");
const calendarModalCategory = document.querySelector("#calendar-modal-category");
const calendarModalRecurrence = document.querySelector("#calendar-modal-recurrence");
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
const installPlatformStatus = document.querySelector("#install-platform-status");
const calendarModalTasks = document.querySelector("#calendar-modal-tasks");
const financeFilterButtons = document.querySelectorAll("[data-finance-filter]");
const interactiveStats = document.querySelectorAll(".interactive-stat");
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
const pageLinks = document.querySelectorAll("[data-page-link]");
const pageViews = document.querySelectorAll("[data-page-view]");
const dashboardOpenButtons = document.querySelectorAll("[data-dashboard-open]");
const persistFields = document.querySelectorAll("[data-persist-key]");
const tabShells = document.querySelectorAll("[data-tab-group]");
const dreamVisionUpload = document.querySelector("#dream-vision-upload");
const dreamVisionGallery = document.querySelector("#dream-vision-gallery");
const plannerDreamVisionUpload = document.querySelector("#planner-dream-vision-upload");
const plannerDreamVisionGallery = document.querySelector("#planner-dream-vision-gallery");
const plannerTaskForms = document.querySelectorAll(".planner-task-form");
const plannerTaskLists = document.querySelectorAll("[data-planner-list]");
const projectUploads = document.querySelectorAll("[data-project-upload]");
const projectGalleries = document.querySelectorAll("[data-project-gallery]");
const settingsProfileForm = document.querySelector("#settings-profile-form");
const settingsPasswordForm = document.querySelector("#settings-password-form");
const settingsNameInput = document.querySelector("#settings-name-input");
const settingsEmailInput = document.querySelector("#settings-email-input");
const settingsAvatarInput = document.querySelector("#settings-avatar-input");
const settingsAvatarPreview = document.querySelector("#settings-avatar-preview");
const settingsProfileName = document.querySelector("#settings-profile-name");
const settingsProfileEmail = document.querySelector("#settings-profile-email");
const settingsSubscriptionUrl = document.querySelector("#settings-subscription-url");
const settingsProfileFeedback = document.querySelector("#settings-profile-feedback");
const settingsPasswordInput = document.querySelector("#settings-password-input");
const settingsPasswordConfirmInput = document.querySelector("#settings-password-confirm-input");
const settingsPasswordFeedback = document.querySelector("#settings-password-feedback");
const settingsAccentColor = document.querySelector("#settings-accent-color");
const settingsRenewButton = document.querySelector("#settings-renew-button");
const settingsOpenRenewal = document.querySelector("#settings-open-renewal");
const settingsOpenInstall = document.querySelector("#settings-open-install");
const settingsSubscriptionStatus = document.querySelector("#settings-subscription-status");
const settingsRenewalLabel = document.querySelector("#settings-renewal-label");
const customizableGrids = document.querySelectorAll(".customizable-grid");
const draggableCards = document.querySelectorAll(".draggable-card");
const isTouchDevice =
  window.matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;
const AUTH_TOKEN_KEY = "vida-nova:auth-token";
const AUTH_USER_KEY = "vida-nova:auth-user";
const LEGACY_SESSION_KEY = "ela-em-ordem:session";
const CLOUD_STATE_TYPE = "app_state";
const CLOUD_STATE_KEY = "main";

let tasks = [...initialTasks];
let verseIndex = new Date().getDate() % verses.length;
let activeCard = null;
let draggedCard = null;
let deferredInstallPrompt = null;
let calendarCursor = new Date();
let selectedDateKey = formatDateKey(new Date());
let agendaView = localStorage.getItem("ela-em-ordem:agenda-view") || "week";
let agendaStore = JSON.parse(localStorage.getItem("ela-em-ordem:agenda-events") || "{}");
let calendarStore = JSON.parse(localStorage.getItem("vida-nova:calendar-store") || "null") || defaultCalendars.map((calendar) => ({ ...calendar }));
let agendaSearchQuery = localStorage.getItem("vida-nova:agenda-search") || "";
let customAgendaDays = Number(localStorage.getItem("vida-nova:custom-days") || 4);

// Load initial demo events if agenda is empty
if (Object.keys(agendaStore).length === 0) {
  agendaStore = { ...initialAgendaEvents };
}

let activeFinanceFilter = localStorage.getItem("ela-em-ordem:finance-filter") || "all";
let financeStore = JSON.parse(localStorage.getItem("ela-em-ordem:finance") || "{}");
let calculatorExpression = "0";
let moduleStore = JSON.parse(localStorage.getItem("vida-nova:modules") || "{}");
let plannerBoardStore = JSON.parse(localStorage.getItem("vida-nova:planner-boards") || "{}");
let activeModule = null;
let activePage = "dashboard";
let currentSession = null;
let adminUsersCache = [];
let adminActivityCache = [];
let syncTimeoutId = null;
let syncInFlight = null;
let isHydratingCloudState = false;
let pendingAvatarData = "";

function getAuthStorage() {
  return window.sessionStorage;
}

function clearLegacyAuthCache() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(LEGACY_SESSION_KEY);
}

financeStore = {
  planIncome: Number(financeStore.planIncome || 0),
  planExpense: Number(financeStore.planExpense || 0),
  goal: Number(financeStore.goal || 0),
  notes: String(financeStore.notes || ""),
  records: Array.isArray(financeStore.records) && financeStore.records.length > 0 ? financeStore.records : [...initialFinanceRecords],
};

const editableCardDefaults = Array.from(editableCards).reduce((defaults, card) => {
  defaults[card.dataset.cardId] = extractCardData(card);
  return defaults;
}, {});

function requireSession() {
  const authStorage = getAuthStorage();
  const savedUser = authStorage.getItem(AUTH_USER_KEY);
  const token = authStorage.getItem(AUTH_TOKEN_KEY);

  if (!savedUser || !token) {
    clearLegacyAuthCache();
    window.location.href = "./login.html";
    throw new Error("Sessao nao encontrada");
  }

  const session = JSON.parse(savedUser);
  authStorage.setItem(
    LEGACY_SESSION_KEY,
    JSON.stringify({
      id: session.id,
      name: session.name,
      email: session.email,
      createdAt: new Date().toISOString(),
    }),
  );
  currentSession = session;
  return session;
}

function getAuthToken() {
  return getAuthStorage().getItem(AUTH_TOKEN_KEY) || "";
}

function clearAuthSession() {
  const authStorage = getAuthStorage();
  authStorage.removeItem(AUTH_TOKEN_KEY);
  authStorage.removeItem(AUTH_USER_KEY);
  authStorage.removeItem(LEGACY_SESSION_KEY);
  clearLegacyAuthCache();
}

function persistUserSession(user, token = getAuthToken()) {
  const authStorage = getAuthStorage();
  authStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  if (token) {
    authStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  authStorage.setItem(
    LEGACY_SESSION_KEY,
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date().toISOString(),
    }),
  );
  clearLegacyAuthCache();
  currentSession = user;
}

function getSessionInitials(session = currentSession) {
  const source = String(session?.name || "Vida Nova").trim();
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "VN";
}

function renderAvatar(target, avatarUrl, fallbackText = getSessionInitials()) {
  if (!target) {
    return;
  }

  if (avatarUrl) {
    target.classList.add("has-image");
    target.innerHTML = `<img src="${escapeHtml(avatarUrl)}" alt="Foto do perfil" />`;
    return;
  }

  target.classList.remove("has-image");
  target.textContent = fallbackText;
}

function mixColor(hex, ratio = 0.3) {
  const value = String(hex || "#c55b84").replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : value.padEnd(6, "0").slice(0, 6);

  const channel = (index) => {
    const base = Number.parseInt(normalized.slice(index, index + 2), 16);
    const mixed = Math.round(base + (255 - base) * ratio);
    return mixed.toString(16).padStart(2, "0");
  };

  return `#${channel(0)}${channel(2)}${channel(4)}`;
}

function setFeedback(element, message, type = "") {
  if (!element) {
    return;
  }

  element.textContent = message || "";
  element.classList.remove("is-success", "is-error");
  if (type) {
    element.classList.add(type === "error" ? "is-error" : "is-success");
  }
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
    const error = new Error(data.error || "Erro na comunicacao com o servidor.");
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

function hasActiveSubscription(session = currentSession) {
  return Boolean(session?.subscription_active);
}

function isAdminSession(session = currentSession) {
  return Boolean(session?.is_admin || session?.role === "admin");
}

function canAccessLockedApp(session = currentSession) {
  return isAdminSession(session) || hasActiveSubscription(session);
}

function updateSubscriptionGate(session = currentSession) {
  if (!subscriptionGate) {
    return;
  }

  const active = canAccessLockedApp(session);
  subscriptionGate.classList.toggle("hidden", active);
  subscriptionGate.setAttribute("aria-hidden", active ? "true" : "false");
  document.body.classList.toggle("subscription-locked", !active);

  if (active) {
    return;
  }

  const status = String(session?.subscription_status || "pending");
  if (subscriptionGateStatus) {
    subscriptionGateStatus.textContent =
      status === "late" ? "Em atraso" : status === "inactive" ? "Inativa" : "Pendente";
  }
  if (subscriptionGateCopy) {
    subscriptionGateCopy.textContent =
      status === "late"
        ? "Sua assinatura esta em atraso. Atualize o pagamento para reativar todos os recursos do app."
        : status === "inactive"
          ? "Sua assinatura esta inativa. Seus dados continuam guardados, mas o app fica bloqueado ate a renovacao."
          : "Sua assinatura ainda nao foi ativada. Seus dados ficam salvos, mas o app so sera liberado quando o pagamento for confirmado.";
  }
}

function getSubscriptionLabel(session = currentSession) {
  const status = String(session?.subscription_status || "pending");
  if (status === "active") {
    return "Conta ativa";
  }
  if (status === "late") {
    return "Pagamento em atraso";
  }
  if (status === "inactive") {
    return "Assinatura inativa";
  }
  return "Aguardando ativacao";
}

function getAllowedPageForSession(requestedPage, session = currentSession) {
  if (requestedPage === "admin" && !isAdminSession(session)) {
    return "dashboard";
  }

  if (!canAccessLockedApp(session)) {
    return requestedPage === "configuracoes" ? "configuracoes" : "configuracoes";
  }

  return requestedPage;
}

function setAdminVisibility(target, visible) {
  if (!target) {
    return;
  }

  target.classList.toggle("hidden", !visible);
  target.setAttribute("aria-hidden", visible ? "false" : "true");
}

function renderAdminSummary(summary = {}) {
  if (adminTotalUsers) {
    adminTotalUsers.textContent = String(summary.totalUsers || 0);
  }
  if (adminActiveUsers) {
    adminActiveUsers.textContent = String(summary.activeUsers || 0);
  }
  if (adminPendingUsers) {
    adminPendingUsers.textContent = String(summary.pendingUsers || 0);
  }
  if (adminInactiveUsers) {
    adminInactiveUsers.textContent = String(summary.inactiveUsers || 0);
  }
  if (adminAdminUsers) {
    adminAdminUsers.textContent = String(summary.adminUsers || 0);
  }
}

function createAdminUserRow(user) {
  const article = document.createElement("article");
  article.className = "admin-user-row";

  const expiresValue = user.subscription_expires
    ? String(user.subscription_expires).slice(0, 10)
    : "";

  article.innerHTML = `
    <div class="admin-user-main">
      <div>
        <strong>${escapeHtml(user.name || "Sem nome")}</strong>
        <small>${escapeHtml(user.email || "")}</small>
      </div>
      <div class="admin-user-badges">
        <span class="admin-badge">${escapeHtml(user.role || "user")}</span>
        <span class="admin-badge">${escapeHtml(user.subscription_status || "pending")}</span>
      </div>
    </div>
    <div class="admin-user-meta">
      <span>Entradas salvas: ${escapeHtml(String(user.data_entries || 0))}</span>
      <span>Criada em: ${escapeHtml(formatAdminDate(user.created_at))}</span>
      <span>Ultima atividade: ${escapeHtml(formatAdminDateTime(user.last_activity_at))}</span>
    </div>
    <div class="admin-user-controls">
      <label>
        Papel
        <select data-admin-role>
          <option value="user"${user.role === "admin" ? "" : " selected"}>Usuaria</option>
          <option value="admin"${user.role === "admin" ? " selected" : ""}>Admin</option>
        </select>
      </label>
      <label>
        Assinatura
        <select data-admin-status>
          <option value="active"${user.subscription_status === "active" ? " selected" : ""}>Ativa</option>
          <option value="pending"${user.subscription_status === "pending" ? " selected" : ""}>Pendente</option>
          <option value="late"${user.subscription_status === "late" ? " selected" : ""}>Em atraso</option>
          <option value="inactive"${user.subscription_status === "inactive" || user.subscription_status === "expired" ? " selected" : ""}>Inativa</option>
        </select>
      </label>
      <label>
        Expira em
        <input data-admin-expires type="date" value="${escapeHtml(expiresValue)}" />
      </label>
      <label>
        Link checkout / renovacao
        <input data-admin-subscription-url type="url" value="${escapeHtml(user.subscription_url || "")}" placeholder="https://..." />
      </label>
    </div>
    <div class="admin-user-actions">
      <button class="primary-button" type="button" data-admin-save="${escapeHtml(String(user.id))}">Salvar</button>
    </div>
  `;

  return article;
}

function formatAdminDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("pt-BR");
}

function formatAdminDateTime(value) {
  if (!value) {
    return "Sem registro";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Sem registro";
  }

  return date.toLocaleString("pt-BR");
}

function getFilteredAdminUsers() {
  const query = String(adminSearchInput?.value || "").trim().toLowerCase();
  const status = String(adminStatusFilter?.value || "all");
  const role = String(adminRoleFilter?.value || "all");

  return adminUsersCache.filter((user) => {
    const matchesQuery =
      !query ||
      String(user.name || "").toLowerCase().includes(query) ||
      String(user.email || "").toLowerCase().includes(query);
    const matchesStatus =
      status === "all" ||
      (status === "inactive"
        ? ["inactive", "expired", "late"].includes(String(user.subscription_status || ""))
        : String(user.subscription_status || "") === status);
    const matchesRole = role === "all" || String(user.role || "user") === role;
    return matchesQuery && matchesStatus && matchesRole;
  });
}

function renderAdminUsers(users = adminUsersCache) {
  if (!adminUsersList) {
    return;
  }

  adminUsersList.innerHTML = "";

  if (!users.length) {
    adminUsersList.innerHTML = '<div class="admin-empty-state">Nenhuma usuaria cadastrada ainda.</div>';
    return;
  }

  users.forEach((user) => {
    adminUsersList.appendChild(createAdminUserRow(user));
  });
}

function renderAdminActivity(activity = adminActivityCache) {
  if (!adminActivityList) {
    return;
  }

  adminActivityList.innerHTML = "";

  if (!activity.length) {
    adminActivityList.innerHTML = '<div class="admin-empty-state">Ainda nao ha atividades registradas.</div>';
    return;
  }

  activity.forEach((item) => {
    const entry = document.createElement("article");
    entry.className = "admin-activity-item";
    entry.innerHTML = `
      <strong>${escapeHtml(item.action || "atividade")}</strong>
      <div>${escapeHtml(item.details || "Sem detalhes.")}</div>
      <small>${escapeHtml(item.name || item.email || "Sistema")} • ${escapeHtml(formatAdminDateTime(item.created_at))}</small>
    `;
    adminActivityList.appendChild(entry);
  });
}

async function loadAdminDashboard() {
  if (!isAdminSession()) {
    return;
  }

  try {
    setFeedback(adminFeedback, "Atualizando painel admin...");
    const [summaryResponse, usersResponse, activityResponse] = await Promise.all([
      apiPost("/api/admin/summary", { token: getAuthToken() }),
      apiPost("/api/admin/users", { token: getAuthToken() }),
      apiPost("/api/admin/activity", { token: getAuthToken() }),
    ]);

    adminUsersCache = usersResponse.users || [];
    adminActivityCache = activityResponse.activity || [];
    renderAdminSummary(summaryResponse.summary || {});
    renderAdminUsers(getFilteredAdminUsers());
    renderAdminActivity(adminActivityCache);
    setFeedback(adminFeedback, "Painel admin atualizado.", "success");
  } catch (error) {
    setFeedback(adminFeedback, error.message, "error");
  }
}

function syncAdminUi(session = currentSession) {
  const adminActive = isAdminSession(session);
  setAdminVisibility(sidebarAdminLink, adminActive);
  setAdminVisibility(mobileAdminLink, adminActive);
  setAdminVisibility(adminShortcutCard, adminActive);
  setAdminVisibility(adminDashboardCard, adminActive);

  const allowedPage = getAllowedPageForSession(activePage, session);
  if (allowedPage !== activePage) {
    setActivePage(allowedPage, false);
  }
}

function getSavedCardsState() {
  return Array.from(editableCards).reduce((savedCards, card) => {
    const value = localStorage.getItem(`ela-em-ordem:${card.dataset.cardId}`);
    if (value) {
      savedCards[card.dataset.cardId] = JSON.parse(value);
    }
    return savedCards;
  }, {});
}

function getSavedGridOrders() {
  return Array.from(customizableGrids).reduce((savedGrids, grid) => {
    const value = localStorage.getItem(`ela-em-ordem:grid:${grid.dataset.gridId}`);
    if (value) {
      savedGrids[grid.dataset.gridId] = JSON.parse(value);
    }
    return savedGrids;
  }, {});
}

function getPersistedFieldState() {
  return Array.from(persistFields).reduce((savedFields, field) => {
    const key = field.dataset.persistKey;
    if (!key) {
      return savedFields;
    }

    const storedValue = localStorage.getItem(`vida-nova:field:${key}`);
    if (storedValue !== null) {
      savedFields[key] = storedValue;
    }

    return savedFields;
  }, {});
}

function collectCloudState() {
  return {
    tasks,
    agendaStore,
    financeStore,
    moduleStore,
    plannerBoardStore,
    persistedFields: getPersistedFieldState(),
    plannerDreamImages: getStoredDreamVisionImages("planner"),
    dreamImages: getStoredDreamVisionImages("main"),
    notes: notesInput?.value || localStorage.getItem("ela-em-ordem:notes") || "",
    theme: document.body.dataset.theme || localStorage.getItem("ela-em-ordem:theme") || "light",
    layout: document.body.dataset.layout || localStorage.getItem("ela-em-ordem:layout") || "soft",
    accentColor:
      localStorage.getItem("vida-nova:accent-color") ||
      getComputedStyle(document.documentElement).getPropertyValue("--berry").trim() ||
      "#c55b84",
    agendaView,
    calendarStore,
    agendaSearchQuery,
    customAgendaDays,
    financeFilter: activeFinanceFilter,
    cards: getSavedCardsState(),
    gridOrders: getSavedGridOrders(),
  };
}

function createEmptyCloudState() {
  return {
    tasks: [],
    agendaStore: {},
    financeStore: {
      planIncome: 0,
      planExpense: 0,
      goal: 0,
      notes: "",
      records: [],
    },
    moduleStore: {},
    plannerBoardStore: {},
    persistedFields: {},
    plannerDreamImages: [],
    dreamImages: [],
    notes: "",
    theme: localStorage.getItem("ela-em-ordem:theme") || "light",
    layout: localStorage.getItem("ela-em-ordem:layout") || "soft",
    accentColor: localStorage.getItem("vida-nova:accent-color") || "#c55b84",
    agendaView: "week",
    calendarStore: defaultCalendars.map((calendar) => ({ ...calendar })),
    agendaSearchQuery: "",
    customAgendaDays: 4,
    financeFilter: "all",
    cards: {},
    gridOrders: {},
  };
}

function applyPersistedFieldState(fields = {}) {
  persistFields.forEach((field) => {
    const key = field.dataset.persistKey;
    if (!key) {
      return;
    }

    const nextValue = Object.prototype.hasOwnProperty.call(fields, key) ? fields[key] : "";
    field.value = nextValue;
    if (nextValue) {
      localStorage.setItem(`vida-nova:field:${key}`, nextValue);
    } else {
      localStorage.removeItem(`vida-nova:field:${key}`);
    }
  });
}

function applyCloudState(state) {
  if (!state || typeof state !== "object") {
    return;
  }

  isHydratingCloudState = true;

  tasks = Array.isArray(state.tasks) ? state.tasks : [...initialTasks];
  agendaStore =
    state.agendaStore && Object.keys(state.agendaStore).length > 0
      ? state.agendaStore
      : { ...initialAgendaEvents };
  financeStore = {
    planIncome: Number(state.financeStore?.planIncome || 0),
    planExpense: Number(state.financeStore?.planExpense || 0),
    goal: Number(state.financeStore?.goal || 0),
    notes: String(state.financeStore?.notes || ""),
    records:
      Array.isArray(state.financeStore?.records)
        ? state.financeStore.records
        : [...initialFinanceRecords],
  };
  moduleStore = state.moduleStore && typeof state.moduleStore === "object" ? state.moduleStore : {};
  plannerBoardStore =
    state.plannerBoardStore && typeof state.plannerBoardStore === "object" ? state.plannerBoardStore : {};
  agendaView = state.agendaView || "week";
  calendarStore = Array.isArray(state.calendarStore) && state.calendarStore.length
    ? state.calendarStore
    : defaultCalendars.map((calendar) => ({ ...calendar }));
  agendaSearchQuery = state.agendaSearchQuery || "";
  customAgendaDays = Number(state.customAgendaDays || 4);
  activeFinanceFilter = state.financeFilter || "all";

  localStorage.setItem("ela-em-ordem:agenda-events", JSON.stringify(agendaStore));
  localStorage.setItem("ela-em-ordem:finance", JSON.stringify(financeStore));
  localStorage.setItem("vida-nova:modules", JSON.stringify(moduleStore));
  localStorage.setItem("vida-nova:planner-boards", JSON.stringify(plannerBoardStore));
  localStorage.setItem("ela-em-ordem:notes", state.notes || "");
  localStorage.setItem("ela-em-ordem:theme", state.theme || "light");
  localStorage.setItem("ela-em-ordem:layout", state.layout || "soft");
  localStorage.setItem("vida-nova:accent-color", state.accentColor || "#c55b84");
  localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
  localStorage.setItem("vida-nova:calendar-store", JSON.stringify(calendarStore));
  localStorage.setItem("vida-nova:agenda-search", agendaSearchQuery);
  localStorage.setItem("vida-nova:custom-days", String(customAgendaDays));
  localStorage.setItem("ela-em-ordem:finance-filter", activeFinanceFilter);

  editableCards.forEach((card) => {
    localStorage.removeItem(`ela-em-ordem:${card.dataset.cardId}`);
  });
  Object.entries(state.cards || {}).forEach(([cardId, cardState]) => {
    localStorage.setItem(`ela-em-ordem:${cardId}`, JSON.stringify(cardState));
  });

  customizableGrids.forEach((grid) => {
    localStorage.removeItem(`ela-em-ordem:grid:${grid.dataset.gridId}`);
  });
  Object.entries(state.gridOrders || {}).forEach(([gridId, gridState]) => {
    localStorage.setItem(`ela-em-ordem:grid:${gridId}`, JSON.stringify(gridState));
  });

  saveDreamVisionImages(Array.isArray(state.dreamImages) ? state.dreamImages : [], "main");
  saveDreamVisionImages(Array.isArray(state.plannerDreamImages) ? state.plannerDreamImages : [], "planner");
  applyPersistedFieldState(state.persistedFields || {});

  isHydratingCloudState = false;
}

function scheduleCloudSync() {
  if (isHydratingCloudState || !getAuthToken() || !hasActiveSubscription()) {
    return;
  }

  window.clearTimeout(syncTimeoutId);
  syncTimeoutId = window.setTimeout(() => {
    syncInFlight = apiPost("/api/data/save", {
      token: getAuthToken(),
      dataType: CLOUD_STATE_TYPE,
      dataKey: CLOUD_STATE_KEY,
      dataValue: collectCloudState(),
    }).catch((error) => {
      console.error("Erro ao sincronizar dados:", error);
    });
  }, 250);
}

async function initializeAuthenticatedState() {
  const token = getAuthToken();
  
  if (!token) {
    clearAuthSession();
    window.location.href = "./login.html";
    throw new Error("Token de autenticacao ausente");
  }

  try {
    const verifyResponse = await apiPost("/api/auth/verify", { token });
    persistUserSession(verifyResponse.user, token);
    if (!hasActiveSubscription(verifyResponse.user)) {
      hydrateSessionUI(verifyResponse.user);
      setActivePage("configuracoes", false);
      return;
    }
  } catch (error) {
    clearAuthSession();
    window.location.href = "./login.html";
    throw new Error("Sessao invalida ou expirada");
  }

  try {
    const response = await apiPost("/api/data/get", {
      token,
      dataType: CLOUD_STATE_TYPE,
    });
    const savedState = response.data?.[CLOUD_STATE_KEY];

    if (savedState) {
      applyCloudState(savedState);
    } else {
      applyCloudState(createEmptyCloudState());
      scheduleCloudSync();
    }
  } catch (error) {
    if (error.status === 403) {
      if (error.payload?.user) {
        persistUserSession(error.payload.user, token);
        hydrateSessionUI(error.payload.user);
        setActivePage("configuracoes", false);
      }
      return;
    }

    console.warn("Nao foi possivel carregar dados da nuvem.", error);
    const localState = JSON.parse(localStorage.getItem("vida-nova:cloud-state") || "null");
    if (localState) {
      applyCloudState(localState);
    }
  }
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

if (changeVerseButton) {
  changeVerseButton.addEventListener("click", cycleVerse);
}

function setActivePage(pageName, syncHash = true) {
  const availablePages = Array.from(pageViews).map((view) => view.dataset.pageView);
  const requestedPage = availablePages.includes(pageName) ? pageName : "dashboard";
  const nextPage = getAllowedPageForSession(requestedPage);
  activePage = nextPage;

  pageViews.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.pageView === nextPage);
  });

  pageLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.pageLink === nextPage);
  });

  if (syncHash && window.location.hash !== `#${nextPage}`) {
    history.replaceState(null, "", `#${nextPage}`);
  }

  if (nextPage === "admin" && isAdminSession()) {
    loadAdminDashboard();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
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
  scheduleCloudSync();
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

function toSoftColor(hex, alpha = 0.24) {
  const value = String(hex || "#c55b84").replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : value.padEnd(6, "0").slice(0, 6);
  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getRoundedTimeFromOffset(offsetY) {
  const minutesFromStart = Math.max(0, Math.round(offsetY / 20) * 15);
  const totalMinutes = 360 + minutesFromStart;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function saveFinanceStore() {
  localStorage.setItem("ela-em-ordem:finance", JSON.stringify(financeStore));
  scheduleCloudSync();
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
  scheduleCloudSync();
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

function saveCalendarStore() {
  localStorage.setItem("vida-nova:calendar-store", JSON.stringify(calendarStore));
  scheduleCloudSync();
}

function getCalendarById(calendarId) {
  return (
    calendarStore.find((calendar) => calendar.id === calendarId) ||
    calendarStore[0] ||
    { id: "pessoal", name: "Pessoal", color: "#4285f4", visible: true }
  );
}

function getVisibleCalendarIds() {
  return new Set(calendarStore.filter((calendar) => calendar.visible).map((calendar) => calendar.id));
}

function eventMatchesSearch(eventItem) {
  if (!agendaSearchQuery.trim()) {
    return true;
  }

  const search = agendaSearchQuery.trim().toLowerCase();
  const haystack = [
    eventItem.title,
    eventItem.description,
    eventItem.location,
    eventItem.link,
    eventItem.category,
    eventItem.calendarName,
    ...(Array.isArray(eventItem.guests) ? eventItem.guests : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(search);
}

function getFilteredEventsForDate(dateKey) {
  const visibleCalendars = getVisibleCalendarIds();
  return ensureAgendaDay(dateKey).events.filter((eventItem) => {
    const calendarId = eventItem.calendarId || "pessoal";
    return visibleCalendars.has(calendarId) && eventMatchesSearch(eventItem);
  });
}

function getDatesInCurrentRange() {
  if (agendaView === "month" || agendaView === "year") {
    const year = calendarCursor.getFullYear();
    const month = calendarCursor.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: totalDays }, (_, index) =>
      formatDateKey(new Date(year, month, index + 1)),
    );
  }

  if (agendaView === "schedule") {
    const start = getWeekStart(selectedDateKey);
    return Array.from({ length: 14 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return formatDateKey(date);
    });
  }

  const start = getWeekStart(selectedDateKey);
  const daysToShow =
    agendaView === "day" ? 1 : agendaView === "custom" ? Math.max(2, Math.min(10, customAgendaDays)) : 7;

  return Array.from({ length: daysToShow }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return formatDateKey(date);
  });
}

function getEventsInRange(dateKeys) {
  return dateKeys.flatMap((dateKey) =>
    getFilteredEventsForDate(dateKey).map((eventItem) => ({ ...eventItem, dateKey })),
  );
}

function renderCalendarSelectors() {
  if (agendaCalendarInput) {
    agendaCalendarInput.innerHTML = calendarStore
      .map(
        (calendar) =>
          `<option value="${escapeHtml(calendar.id)}">${escapeHtml(calendar.name)}</option>`,
      )
      .join("");
  }

  if (calendarModalCalendar) {
    calendarModalCalendar.innerHTML = calendarStore
      .map(
        (calendar) =>
          `<option value="${escapeHtml(calendar.id)}">${escapeHtml(calendar.name)}</option>`,
      )
      .join("");
  }
}

function renderCalendarList() {
  if (!calendarList) {
    return;
  }

  calendarList.innerHTML = calendarStore
    .map(
      (calendar) => `
        <label class="calendar-list-item">
          <span class="calendar-list-main">
            <input type="checkbox" data-calendar-toggle="${escapeHtml(calendar.id)}" ${
              calendar.visible ? "checked" : ""
            } />
            <span class="calendar-swatch" style="background:${escapeHtml(calendar.color)}"></span>
            <span>${escapeHtml(calendar.name)}</span>
          </span>
          <button class="calendar-options-button" type="button" data-calendar-edit="${escapeHtml(calendar.id)}">•••</button>
        </label>
      `,
    )
    .join("");
}

function openCalendarModal(dateKey, prefill = {}) {
  if (!calendarModal) {
    return;
  }
  selectedDateKey = dateKey;
  const dayData = ensureAgendaDay(dateKey);
  calendarModalTitle.textContent = formatDisplayDate(dateKey);
  calendarModalDate.value = dateKey;
  if (calendarModalTime) {
    calendarModalTime.value = prefill.time || "";
  }
  if (calendarModalEndTime) {
    calendarModalEndTime.value = prefill.endTime || "";
  }
  if (calendarModalLocation) {
    calendarModalLocation.value = prefill.location || "";
  }
  if (calendarModalLink) {
    calendarModalLink.value = prefill.link || "";
  }
  if (calendarModalGuests) {
    calendarModalGuests.value = Array.isArray(prefill.guests) ? prefill.guests.join(", ") : "";
  }
  if (calendarModalCalendar) {
    calendarModalCalendar.value = prefill.calendarId || calendarStore[0]?.id || "pessoal";
  }
  if (calendarModalCategory) {
    calendarModalCategory.value = prefill.category || "Pessoal";
  }
  if (calendarModalRecurrence) {
    calendarModalRecurrence.value = prefill.recurrence || "none";
  }
  if (calendarModalColor) {
    calendarModalColor.value = prefill.color || getCalendarById(prefill.calendarId).color || "#4285f4";
  }
  if (calendarModalDescription) {
    calendarModalDescription.value = prefill.description || "";
  }
  if (calendarModalTitleInput) {
    calendarModalTitleInput.value = prefill.title || "";
  }
  calendarModalList.innerHTML = "";
  const visibleEvents = getFilteredEventsForDate(dateKey);
  if (visibleEvents.length) {
    visibleEvents
      .slice()
      .sort((a, b) => (a.time || "").localeCompare(b.time || ""))
      .forEach((eventItem) => {
        const calendar = getCalendarById(eventItem.calendarId);
        const item = document.createElement("li");
        item.className = "task-item";

        const text = document.createElement("span");
        text.className = "task-text";
        text.innerHTML = `<strong><span class="event-color-dot" style="background:${escapeHtml(eventItem.color || calendar.color)}"></span>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))} - ${escapeHtml(eventItem.title)}</strong><small>${escapeHtml(calendar.name)} | ${escapeHtml(eventItem.category || "Pessoal")} | ${escapeHtml(eventItem.location || "Sem local")}${eventItem.guests?.length ? ` | ${escapeHtml(eventItem.guests.join(", "))}` : ""}${eventItem.link ? ` | <a href="${escapeHtml(eventItem.link)}" target="_blank" rel="noreferrer">abrir link</a>` : ""}</small>`;

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
  calendarModalEmpty.hidden = visibleEvents.length > 0 || dayData.tasks.length > 0;
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
  updateInstallUi();
  installModal.classList.remove("hidden");
  installModal.setAttribute("aria-hidden", "false");
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

  return {
    isIos,
    isAndroid,
    isMac,
    isWindows,
    isStandalone,
  };
}

function updateInstallUi() {
  const context = getInstallContext();

  if (!installPlatformStatus || !installModalChromeButton) {
    return;
  }

  if (context.isStandalone) {
    installPlatformStatus.textContent =
      "O app ja esta instalado neste dispositivo. Se quiser, use o pacote ZIP apenas para backup local do projeto.";
    installModalChromeButton.textContent = "App ja instalado";
    installModalChromeButton.disabled = true;
    return;
  }

  installModalChromeButton.disabled = false;

  if (deferredInstallPrompt) {
    installPlatformStatus.textContent =
      "Este dispositivo aceita instalacao direta. Toque em instalar e confirme no navegador para adicionar o app.";
    installModalChromeButton.textContent = "Instalar agora";
    return;
  }

  if (context.isIos) {
    installPlatformStatus.textContent =
      "No iPhone ou iPad, abra no Safari, toque em Compartilhar e depois em “Adicionar a Tela de Inicio”.";
    installModalChromeButton.textContent = "Abrir instrucoes para iPhone/iPad";
    return;
  }

  if (context.isAndroid) {
    installPlatformStatus.textContent =
      "No Android, use Chrome ou Edge, abra o menu do navegador e toque em “Instalar app” ou “Adicionar a tela inicial”.";
    installModalChromeButton.textContent = "Ver como instalar no Android";
    return;
  }

  if (context.isMac) {
    installPlatformStatus.textContent =
      "No Mac, abra o app publicado em Chrome ou Edge e use o icone de instalacao na barra de endereco ou a opcao “Instalar app”.";
    installModalChromeButton.textContent = "Ver como instalar no Mac";
    return;
  }

  if (context.isWindows) {
    installPlatformStatus.textContent =
      "No Windows, abra o app em Chrome ou Edge e use o menu do navegador para instalar como aplicativo.";
    installModalChromeButton.textContent = "Ver como instalar no Windows";
    return;
  }

  installPlatformStatus.textContent =
    "Abra este link publicado em um navegador compativel com PWA para instalar o app. Em iPhone/iPad a instalacao e manual; em Android, Mac e Windows pode haver prompt automatico.";
  installModalChromeButton.textContent = "Ver instrucoes";
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
    color: "#4285f4",
    category: "Pessoal",
    endTime: eventItem.time || "09:00",
    link: "",
    guests: [],
    recurrence: "none",
    calendarId: eventItem.category === "Trabalho" ? "trabalho" : "pessoal",
    ...eventItem,
  }));

  return agendaStore[dateKey];
}

function parseNaturalLanguageEvent(inputValue, baseDateKey = selectedDateKey) {
  const text = String(inputValue || "").trim();
  const lowered = text.toLowerCase();
  const result = {
    title: text,
    dateKey: baseDateKey,
    time: "",
    endTime: "",
  };

  const tomorrow = /amanh[ãa]/.test(lowered);
  const today = /\bhoje\b/.test(lowered);
  const hourMatch = lowered.match(/(?:às|as)?\s*(\d{1,2})(?:[:h](\d{2}))?/);

  const date = new Date(`${baseDateKey}T12:00:00`);
  if (tomorrow) {
    date.setDate(date.getDate() + 1);
  } else if (today) {
    // base date already selected
  }

  if (hourMatch) {
    const hours = Number(hourMatch[1]);
    const minutes = Number(hourMatch[2] || 0);
    result.time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const end = new Date(2000, 0, 1, hours, minutes + 60);
    result.endTime = `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
  }

  result.dateKey = formatDateKey(date);
  result.title = text
    .replace(/amanh[ãa]/gi, "")
    .replace(/\bhoje\b/gi, "")
    .replace(/(?:às|as)?\s*\d{1,2}(?:[:h]\d{2})?/gi, "")
    .replace(/\s+/g, " ")
    .trim() || text;

  return result;
}

function saveAgendaStore() {
  localStorage.setItem("ela-em-ordem:agenda-events", JSON.stringify(agendaStore));
  scheduleCloudSync();
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

  getFilteredEventsForDate(selectedDateKey)
    .slice()
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""))
    .forEach((eventItem) => {
      const calendar = getCalendarById(eventItem.calendarId);
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
        <strong><span class="event-color-dot" style="background:${escapeHtml(eventItem.color || calendar.color)}"></span>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))} - ${escapeHtml(eventItem.title)}</strong>
        <small>${escapeHtml(calendar.name)} | ${escapeHtml(eventItem.category || "Pessoal")} | ${escapeHtml(eventItem.location || "Sem local")} | ${escapeHtml(eventItem.description || "Sem descricao")}${eventItem.link ? ` | <a href="${escapeHtml(eventItem.link)}" target="_blank" rel="noreferrer">abrir link</a>` : ""}</small>
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
  renderScheduleView();
  renderYearView();
}

function renderMiniCalendar() {
  if (!calendarMiniGrid || !calendarMiniLabel) {
    return;
  }

  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const todayKey = formatDateKey(new Date());

  calendarMiniLabel.textContent = firstDay.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  calendarMiniGrid.innerHTML = "";

  for (let index = 0; index < 42; index += 1) {
    const dayNumber = index - startOffset + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= totalDays;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-mini-day";

    if (!isCurrentMonth) {
      button.classList.add("is-muted");
      button.disabled = true;
      button.textContent = "";
      calendarMiniGrid.appendChild(button);
      continue;
    }

    const date = new Date(year, month, dayNumber);
    const dateKey = formatDateKey(date);
    button.textContent = String(dayNumber);

    if (dateKey === selectedDateKey) {
      button.classList.add("is-selected");
    }

    if (dateKey === todayKey) {
      button.classList.add("is-today");
    }

    button.addEventListener("click", () => {
      selectedDateKey = dateKey;
      calendarCursor = new Date(date.getFullYear(), date.getMonth(), 1);
      renderCalendar();
      renderAgendaEvents();
      if (["week", "day", "custom"].includes(agendaView)) {
        openCalendarModal(dateKey);
      }
    });

    calendarMiniGrid.appendChild(button);
  }
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

  if (["week", "day", "custom"].includes(agendaView)) {
    const weekStart = getWeekStart(selectedDateKey);
    const daysCount =
      agendaView === "day" ? 1 : agendaView === "custom" ? Math.max(2, Math.min(10, customAgendaDays)) : 7;
    const rangeEnd = new Date(weekStart);
    rangeEnd.setDate(weekStart.getDate() + daysCount - 1);
    calendarMonthLabel.textContent = `${weekStart.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })} - ${rangeEnd.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}`;
  } else if (agendaView === "year") {
    calendarMonthLabel.textContent = String(year);
  } else if (agendaView === "schedule") {
    const range = getDatesInCurrentRange();
    const first = new Date(`${range[0]}T12:00:00`);
    const last = new Date(`${range[range.length - 1]}T12:00:00`);
    calendarMonthLabel.textContent = `${first.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })} - ${last.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`;
  }

  renderMiniCalendar();

  if (calendarMonthShell && weekViewShell && calendarMonthViewButton && calendarWeekViewButton) {
    const isMonthView = agendaView === "month";
    const isGridRangeView = ["week", "day", "custom"].includes(agendaView);
    calendarMonthShell.classList.toggle("hidden", !isMonthView);
    weekViewShell.classList.toggle("hidden", !isGridRangeView);
    if (yearViewShell) {
      yearViewShell.classList.toggle("hidden", agendaView !== "year");
    }
    if (scheduleViewShell) {
      scheduleViewShell.classList.toggle("hidden", agendaView !== "schedule");
    }
    calendarMonthViewButton.classList.toggle("is-active", isMonthView);
    calendarWeekViewButton.classList.toggle("is-active", agendaView === "week");
    if (calendarDayViewButton) {
      calendarDayViewButton.classList.toggle("is-active", agendaView === "day");
    }
    if (calendarYearViewButton) {
      calendarYearViewButton.classList.toggle("is-active", agendaView === "year");
    }
    if (calendarScheduleViewButton) {
      calendarScheduleViewButton.classList.toggle("is-active", agendaView === "schedule");
    }
    if (calendarCustomViewButton) {
      calendarCustomViewButton.classList.toggle("is-active", agendaView === "custom");
    }
    if (customDaysField) {
      customDaysField.classList.toggle("is-visible", agendaView === "custom");
    }
  }

  calendarGrid.innerHTML = "";

  for (let index = 0; index < 42; index += 1) {
    const dayNumber = index - startOffset + 1;
    const isCurrentMonth = dayNumber > 0 && dayNumber <= totalDays;
    const date = new Date(year, month, isCurrentMonth ? dayNumber : 1);
    const dateKey = isCurrentMonth ? formatDateKey(date) : "";
    const dayData = isCurrentMonth ? ensureAgendaDay(dateKey) : null;
    const visibleEvents = isCurrentMonth ? getFilteredEventsForDate(dateKey) : [];

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

    const eventCount = visibleEvents.length;
    const taskCount = dayData.tasks.length;
    const metaParts = [];
    if (eventCount) {
      metaParts.push(`${eventCount} compromisso${eventCount > 1 ? "s" : ""}`);
    }
    if (taskCount) {
      metaParts.push(`${taskCount} tarefa${taskCount > 1 ? "s" : ""}`);
    }
    const eventDots = visibleEvents
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

  if (!["week", "day", "custom"].includes(agendaView)) {
    return;
  }

  const weekStart = getWeekStart(selectedDateKey);
  const daysToShow =
    agendaView === "day" ? 1 : agendaView === "custom" ? Math.max(2, Math.min(10, customAgendaDays)) : 7;
  const hours = Array.from({ length: 17 }, (_, index) => 6 + index);
  weekHoursColumn.innerHTML = hours
    .map((hour) => `<div class="week-hour-label">${String(hour).padStart(2, "0")}:00</div>`)
    .join("");

  weekViewHeader.innerHTML = `<div class="week-corner-spacer" aria-hidden="true"></div>${Array.from({ length: daysToShow }, (_, dayIndex) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + dayIndex);
    const dateKey = formatDateKey(date);
    const isSelected = dateKey === selectedDateKey;
    return `<button type="button" class="week-day-head${isSelected ? " is-selected" : ""}" data-week-date="${dateKey}">
      <span>${date.toLocaleDateString("pt-BR", { weekday: "short" })}</span>
      <strong>${date.toLocaleDateString("pt-BR", { day: "2-digit" })}</strong>
      <small>${date.toLocaleDateString("pt-BR", { month: "short" })}</small>
    </button>`;
  }).join("")}`;

  const todayKey = formatDateKey(new Date());
  const now = new Date();
  const currentTop = ((now.getHours() * 60 + now.getMinutes() - 360) / 15) * 20;

  weekColumns.innerHTML = Array.from({ length: daysToShow }, (_, dayIndex) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + dayIndex);
    const dateKey = formatDateKey(date);
    const blocks = getFilteredEventsForDate(dateKey)
      .slice()
      .sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")))
      .map((eventItem) => {
        const [startHour = 6, startMinute = 0] = String(eventItem.time || "06:00").split(":").map(Number);
        const startTotal = startHour * 60 + startMinute;
        const minutesFromStart = Math.max(0, startTotal - 360);
        const top = (minutesFromStart / 15) * 20;
        const height = Math.max(20, (getEventDurationMinutes(eventItem) / 15) * 20);
        const baseColor = eventItem.color || getCalendarById(eventItem.calendarId).color || "#4285f4";
        return `<button type="button" class="week-event-block" data-event-date="${dateKey}" data-event-id="${escapeHtml(eventItem.id)}" style="top:${top}px;height:${height}px;background:${toSoftColor(baseColor, 0.24)};border-color:${escapeHtml(baseColor)}">
          <strong>${escapeHtml(eventItem.title)}</strong>
          <small>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))}${eventItem.location ? ` • ${escapeHtml(eventItem.location)}` : ""}</small>
        </button>`;
      })
      .join("");

    const currentIndicator =
      dateKey === todayKey && currentTop >= 0
        ? `<div class="current-time-indicator" style="top:${currentTop}px"><span></span></div>`
        : "";

    return `<div class="week-day-column" data-week-column="${dateKey}">
      <button type="button" class="week-column-hit" data-week-date="${dateKey}" aria-label="Abrir dia ${dateKey}"></button>
      ${currentIndicator}
      ${blocks}
    </div>`;
  }).join("");
}

function renderYearView() {
  if (!yearViewShell) {
    return;
  }

  const year = calendarCursor.getFullYear();
  const todayKey = formatDateKey(new Date());
  const weekdayLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

  yearViewShell.innerHTML = Array.from({ length: 12 }, (_, monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1);
    const firstWeekday = firstDay.getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const cells = [];

    for (let index = 0; index < firstWeekday; index += 1) {
      cells.push('<span class="year-month-empty" aria-hidden="true"></span>');
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const dateKey = formatDateKey(new Date(year, monthIndex, day));
      const visibleCount = getFilteredEventsForDate(dateKey).length;
      const isToday = dateKey === todayKey;
      const isSelected = dateKey === selectedDateKey;
      const label = new Date(`${dateKey}T12:00:00`).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      cells.push(
        `<button type="button" class="year-month-day${visibleCount ? " has-events" : ""}${isToday ? " is-today" : ""}${isSelected ? " is-selected" : ""}" data-year-date="${dateKey}" aria-label="${label}">${day}</button>`,
      );
    }

    while (cells.length % 7 !== 0) {
      cells.push('<span class="year-month-empty" aria-hidden="true"></span>');
    }

    return `<article class="year-month-card">
      <strong>${firstDay.toLocaleDateString("pt-BR", { month: "long" })}</strong>
      <div class="year-month-weekdays">${weekdayLabels.map((label) => `<span>${label}</span>`).join("")}</div>
      <div class="year-month-grid">${cells.join("")}</div>
    </article>`;
  }).join("");
}

function renderScheduleView() {
  if (!scheduleViewShell) {
    return;
  }

  const events = getEventsInRange(getDatesInCurrentRange())
    .sort((left, right) => {
      const leftStamp = `${left.dateKey} ${left.time || "00:00"}`;
      const rightStamp = `${right.dateKey} ${right.time || "00:00"}`;
      return leftStamp.localeCompare(rightStamp);
    });

  scheduleViewShell.innerHTML = events.length
    ? events
        .map((eventItem) => {
          const calendar = getCalendarById(eventItem.calendarId);
          return `<article class="schedule-event-card">
            <div class="schedule-event-date">
              <strong>${formatDisplayDate(eventItem.dateKey)}</strong>
              <small>${escapeHtml(formatTimeRange(eventItem.time, eventItem.endTime))}</small>
            </div>
            <div class="schedule-event-content">
              <span class="event-color-dot" style="background:${escapeHtml(eventItem.color || calendar.color)}"></span>
              <div>
                <strong>${escapeHtml(eventItem.title)}</strong>
                <small>${escapeHtml(calendar.name)} | ${escapeHtml(eventItem.location || "Sem local")}</small>
              </div>
            </div>
          </article>`;
        })
        .join("")
    : `<div class="schedule-empty-state">Nenhum evento encontrado neste periodo.</div>`;
}

function renderNextAgendaCard() {
  if (!agendaNextTitle || !agendaNextMeta) {
    return;
  }

  const events = getFilteredEventsForDate(selectedDateKey)
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

function hydrateSessionUI(session) {
  if (!session) {
    return;
  }

  if (userGreeting) {
    userGreeting.textContent = `Bem-vinda, ${session.name}`;
  }

  renderAvatar(topbarAvatar, session.avatar_url, getSessionInitials(session));
  renderAvatar(settingsAvatarPreview, session.avatar_url, getSessionInitials(session));

  if (settingsProfileName) {
    settingsProfileName.textContent = session.name || "Vida Nova";
  }
  if (topbarEmail) {
    topbarEmail.textContent = session.email || "Seu email aparece aqui";
  }
  if (settingsProfileEmail) {
    settingsProfileEmail.textContent = session.email || "Seu email aparece aqui";
  }
  if (settingsNameInput) {
    settingsNameInput.value = session.name || "";
  }
  if (settingsEmailInput) {
    settingsEmailInput.value = session.email || "";
  }
  if (settingsSubscriptionUrl) {
    settingsSubscriptionUrl.value = session.subscription_url || "";
  }
  if (settingsSubscriptionStatus) {
    settingsSubscriptionStatus.textContent = getSubscriptionLabel(session);
  }
  if (topbarPlan) {
    topbarPlan.textContent = isAdminSession(session)
      ? `Admin • ${getSubscriptionLabel(session)}`
      : getSubscriptionLabel(session);
  }
  if (settingsRenewalLabel) {
    settingsRenewalLabel.textContent = session.subscription_url
      ? "Link pronto para abrir"
      : "Configurar link";
  }
  if (settingsRenewButton) {
    settingsRenewButton.disabled = !session.subscription_url;
  }
  if (settingsOpenRenewal) {
    settingsOpenRenewal.disabled = !session.subscription_url;
  }

  updateSubscriptionGate(session);
  syncAdminUi(session);
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
    updateInstallUi();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    updateInstallUi();
  });
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("ela-em-ordem:theme", theme);

  themeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeChoice === theme);
  });
  scheduleCloudSync();
}

function setAccentColor(color, shouldSync = true) {
  const nextColor =
    typeof color === "string" && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color.trim())
      ? color.trim()
      : "#c55b84";
  const glowColor = mixColor(nextColor, 0.36);

  document.documentElement.style.setProperty("--berry", nextColor);
  document.documentElement.style.setProperty("--berry-glow", glowColor);
  localStorage.setItem("vida-nova:accent-color", nextColor);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", nextColor);
  }

  if (settingsAccentColor) {
    settingsAccentColor.value = nextColor;
  }

  if (shouldSync) {
    scheduleCloudSync();
  }
}

function setLayout(layout) {
  document.body.dataset.layout = layout;
  localStorage.setItem("ela-em-ordem:layout", layout);

  layoutButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.layoutChoice === layout);
  });
  scheduleCloudSync();
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
  scheduleCloudSync();
}

function saveGridOrder(grid) {
  const order = Array.from(grid.children)
    .map((card) => card.dataset.cardId)
    .filter(Boolean);

  localStorage.setItem(`ela-em-ordem:grid:${grid.dataset.gridId}`, JSON.stringify(order));
  scheduleCloudSync();
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

if (settingsAccentColor) {
  settingsAccentColor.addEventListener("input", () => {
    setAccentColor(settingsAccentColor.value);
  });
}

if (settingsButton) {
  settingsButton.addEventListener("click", () => {
    setActivePage("configuracoes");
  });
}

if (homeButton) {
  homeButton.addEventListener("click", () => {
    setActivePage("dashboard");
  });
}

goHomeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActivePage("dashboard");
  });
});

if (settingsAvatarInput) {
  settingsAvatarInput.addEventListener("change", async () => {
    const file = settingsAvatarInput.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 1024 * 1024) {
      setFeedback(settingsProfileFeedback, "Escolha uma imagem de ate 1 MB.", "error");
      settingsAvatarInput.value = "";
      return;
    }

    try {
      pendingAvatarData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Falha ao ler a imagem."));
        reader.readAsDataURL(file);
      });

      renderAvatar(settingsAvatarPreview, pendingAvatarData, getSessionInitials());
      renderAvatar(topbarAvatar, pendingAvatarData, getSessionInitials());
      setFeedback(settingsProfileFeedback, "Foto pronta para salvar no perfil.", "success");
    } catch (error) {
      setFeedback(settingsProfileFeedback, "Nao foi possivel ler a foto.", "error");
    }
  });
}

if (settingsProfileForm) {
  settingsProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = settingsNameInput?.value.trim() || "";
    const email = settingsEmailInput?.value.trim() || "";
    const subscriptionUrl = settingsSubscriptionUrl?.value.trim() || "";

    if (!name || !email) {
      setFeedback(settingsProfileFeedback, "Preencha nome e email para salvar o perfil.", "error");
      return;
    }

    try {
      const response = await apiPost("/api/user/update", {
        token: getAuthToken(),
        name,
        email,
        avatarUrl: pendingAvatarData || currentSession?.avatar_url || "",
        subscriptionUrl,
      });

      persistUserSession(response.user, getAuthToken());
      pendingAvatarData = response.user.avatar_url || "";
      hydrateSessionUI(response.user);
      scheduleCloudSync();
      setFeedback(settingsProfileFeedback, "Perfil atualizado com sucesso.", "success");
    } catch (error) {
      setFeedback(settingsProfileFeedback, error.message, "error");
    }
  });
}

if (settingsPasswordForm) {
  settingsPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = settingsPasswordInput?.value || "";
    const confirmPassword = settingsPasswordConfirmInput?.value || "";

    if (!password) {
      setFeedback(settingsPasswordFeedback, "Digite a nova senha.", "error");
      return;
    }

    if (password !== confirmPassword) {
      setFeedback(settingsPasswordFeedback, "As senhas nao conferem.", "error");
      return;
    }

    try {
      await apiPost("/api/user/update", {
        token: getAuthToken(),
        password,
      });

      settingsPasswordForm.reset();
      setFeedback(settingsPasswordFeedback, "Senha atualizada com sucesso.", "success");
    } catch (error) {
      setFeedback(settingsPasswordFeedback, error.message, "error");
    }
  });
}

function openRenewalLink() {
  const renewalUrl = settingsSubscriptionUrl?.value.trim() || currentSession?.subscription_url || "";
  if (!renewalUrl) {
    setFeedback(
      settingsProfileFeedback,
      "Cadastre primeiro o link de renovacao da Kiwify ou do seu checkout.",
      "error",
    );
    setActivePage("configuracoes");
    return;
  }

  window.open(renewalUrl, "_blank", "noopener,noreferrer");
}

if (settingsRenewButton) {
  settingsRenewButton.addEventListener("click", openRenewalLink);
}

if (settingsOpenRenewal) {
  settingsOpenRenewal.addEventListener("click", openRenewalLink);
}

if (settingsOpenInstall) {
  settingsOpenInstall.addEventListener("click", () => {
    openInstallModal();
  });
}

if (subscriptionRenewButton) {
  subscriptionRenewButton.addEventListener("click", openRenewalLink);
}

if (subscriptionOpenSettings) {
  subscriptionOpenSettings.addEventListener("click", () => {
    setActivePage("configuracoes");
  });
}

if (adminOpenPanel) {
  adminOpenPanel.addEventListener("click", () => {
    setActivePage("admin");
    loadAdminDashboard();
  });
}

if (adminRefreshUsers) {
  adminRefreshUsers.addEventListener("click", () => {
    loadAdminDashboard();
  });
}

[adminSearchInput, adminStatusFilter, adminRoleFilter].forEach((control) => {
  if (!control) {
    return;
  }

  control.addEventListener("input", () => {
    renderAdminUsers(getFilteredAdminUsers());
  });

  control.addEventListener("change", () => {
    renderAdminUsers(getFilteredAdminUsers());
  });
});

interactiveStats.forEach((card) => {
  card.addEventListener("click", () => {
    const target = document.querySelector(card.dataset.scrollTarget || "");
    if (target) {
      const targetPage = target.closest("[data-page-view]")?.dataset.pageView;
      if (targetPage) {
        setActivePage(targetPage);
      }
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if ("focus" in target) {
        target.focus({ preventScroll: true });
      }
    }
  });
});

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const page = link.dataset.pageLink;
    if (!page) {
      return;
    }
    event.preventDefault();
    setActivePage(page);
  });
});

dashboardOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetPage = button.dataset.dashboardOpen;
    if (targetPage) {
      setActivePage(targetPage);
    }
  });
});

document.addEventListener("click", (event) => {
  const dashboardTrigger = event.target.closest("[data-dashboard-open]");
  if (dashboardTrigger) {
    const targetPage = dashboardTrigger.dataset.dashboardOpen;
    if (targetPage) {
      event.preventDefault();
      setActivePage(targetPage);
    }
  }

  const verseTrigger = event.target.closest("#change-verse-button");
  if (verseTrigger && verseTrigger !== changeVerseButton) {
    event.preventDefault();
    cycleVerse();
  }
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
    scheduleCloudSync();
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

    const parsed = parseNaturalLanguageEvent(agendaTitleInput.value, agendaDateInput.value || selectedDateKey);
    const targetDate = agendaDateInput.value || parsed.dateKey || selectedDateKey;
    const title = parsed.title.trim();
    const time = agendaTimeInput.value || parsed.time || "";
    const endTime = agendaEndTimeInput.value || parsed.endTime || "";
    const location = agendaLocationInput.value.trim();
    const link = agendaLinkInput.value.trim();
    const guests = agendaGuestsInput?.value
      .split(",")
      .map((guest) => guest.trim())
      .filter(Boolean);
    const calendarId = agendaCalendarInput?.value || calendarStore[0]?.id || "pessoal";
    const category = agendaCategoryInput.value || "Pessoal";
    const color = agendaColorInput.value || getCalendarById(calendarId).color || "#4285f4";
    const recurrence = agendaRecurrenceInput?.value || "none";
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
      guests,
      calendarId,
      recurrence,
      category,
      color,
      description,
    });

    selectedDateKey = targetDate;
    saveAgendaStore();
    renderAgendaEvents();
    renderCalendar();
    renderScheduleView();
    agendaForm.reset();
    if (agendaCalendarInput) {
      agendaCalendarInput.value = calendarStore[0]?.id || "pessoal";
    }
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
    } else if (agendaView === "year") {
      calendarCursor = new Date(calendarCursor.getFullYear() - 1, 0, 1);
    } else if (agendaView === "schedule") {
      const current = new Date(`${selectedDateKey}T12:00:00`);
      current.setDate(current.getDate() - 14);
      selectedDateKey = formatDateKey(current);
      calendarCursor = new Date(current);
    } else {
      const current = new Date(`${selectedDateKey}T12:00:00`);
      current.setDate(
        current.getDate() -
          (agendaView === "day" ? 1 : agendaView === "custom" ? Math.max(2, Math.min(10, customAgendaDays)) : 7),
      );
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
    } else if (agendaView === "year") {
      calendarCursor = new Date(calendarCursor.getFullYear() + 1, 0, 1);
    } else if (agendaView === "schedule") {
      const current = new Date(`${selectedDateKey}T12:00:00`);
      current.setDate(current.getDate() + 14);
      selectedDateKey = formatDateKey(current);
      calendarCursor = new Date(current);
    } else {
      const current = new Date(`${selectedDateKey}T12:00:00`);
      current.setDate(
        current.getDate() +
          (agendaView === "day" ? 1 : agendaView === "custom" ? Math.max(2, Math.min(10, customAgendaDays)) : 7),
      );
      selectedDateKey = formatDateKey(current);
      calendarCursor = new Date(current);
    }
    renderCalendar();
    renderWeekView();
    renderAgendaEvents();
  });
}

if (calendarToday) {
  calendarToday.addEventListener("click", () => {
    const today = new Date();
    selectedDateKey = formatDateKey(today);
    calendarCursor = new Date(today.getFullYear(), today.getMonth(), 1);
    renderCalendar();
    renderWeekView();
    renderAgendaEvents();
  });
}

if (calendarMonthViewButton) {
  calendarMonthViewButton.addEventListener("click", () => {
    agendaView = "month";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    scheduleCloudSync();
    renderCalendar();
    renderWeekView();
  });
}

if (calendarDayViewButton) {
  calendarDayViewButton.addEventListener("click", () => {
    agendaView = "day";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    scheduleCloudSync();
    renderCalendar();
    renderWeekView();
    renderAgendaEvents();
  });
}

if (calendarWeekViewButton) {
  calendarWeekViewButton.addEventListener("click", () => {
    agendaView = "week";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    scheduleCloudSync();
    renderCalendar();
    renderWeekView();
  });
}

if (calendarYearViewButton) {
  calendarYearViewButton.addEventListener("click", () => {
    agendaView = "year";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    scheduleCloudSync();
    renderCalendar();
    renderYearView();
  });
}

if (calendarScheduleViewButton) {
  calendarScheduleViewButton.addEventListener("click", () => {
    agendaView = "schedule";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    scheduleCloudSync();
    renderCalendar();
    renderScheduleView();
  });
}

if (calendarCustomViewButton) {
  calendarCustomViewButton.addEventListener("click", () => {
    agendaView = "custom";
    localStorage.setItem("ela-em-ordem:agenda-view", agendaView);
    scheduleCloudSync();
    renderCalendar();
    renderWeekView();
    renderAgendaEvents();
  });
}

if (calendarCustomDaysInput) {
  calendarCustomDaysInput.value = String(customAgendaDays);
  calendarCustomDaysInput.addEventListener("input", () => {
    customAgendaDays = Math.max(2, Math.min(10, Number(calendarCustomDaysInput.value || 4)));
    localStorage.setItem("vida-nova:custom-days", String(customAgendaDays));
    if (agendaView === "custom") {
      renderCalendar();
      renderWeekView();
      renderAgendaEvents();
    }
    scheduleCloudSync();
  });
}

if (agendaSearchInput) {
  agendaSearchInput.value = agendaSearchQuery;
  agendaSearchInput.addEventListener("input", () => {
    agendaSearchQuery = agendaSearchInput.value;
    localStorage.setItem("vida-nova:agenda-search", agendaSearchQuery);
    renderAgendaEvents();
    renderCalendar();
    renderWeekView();
    renderScheduleView();
    renderYearView();
    scheduleCloudSync();
  });
}

if (agendaCalendarInput) {
  agendaCalendarInput.addEventListener("change", () => {
    const calendar = getCalendarById(agendaCalendarInput.value);
    if (agendaColorInput && calendar?.color) {
      agendaColorInput.value = calendar.color;
    }
  });
}

if (calendarModalCalendar) {
  calendarModalCalendar.addEventListener("change", () => {
    const calendar = getCalendarById(calendarModalCalendar.value);
    if (calendarModalColor && calendar?.color) {
      calendarModalColor.value = calendar.color;
    }
  });
}

if (agendaCreateButton) {
  agendaCreateButton.addEventListener("click", () => {
    openCalendarModal(selectedDateKey);
  });
}

if (calendarAddButton) {
  calendarAddButton.addEventListener("click", () => {
    const name = window.prompt("Nome do calendario");
    if (!name) {
      return;
    }
    const nextId = `calendar-${crypto.randomUUID()}`;
    calendarStore.push({
      id: nextId,
      name: name.trim(),
      color: "#7c4dff",
      visible: true,
    });
    saveCalendarStore();
    renderCalendarSelectors();
    renderCalendarList();
  });
}

if (calendarList) {
  calendarList.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-calendar-toggle]");
    if (toggle) {
      const calendar = calendarStore.find((item) => item.id === toggle.dataset.calendarToggle);
      if (calendar) {
        calendar.visible = toggle.checked;
        saveCalendarStore();
        renderCalendarList();
        renderCalendar();
        renderAgendaEvents();
      }
      return;
    }

    const editButton = event.target.closest("[data-calendar-edit]");
    if (editButton) {
      const calendar = calendarStore.find((item) => item.id === editButton.dataset.calendarEdit);
      if (!calendar) {
        return;
      }
      const nextName = window.prompt("Editar nome do calendario", calendar.name);
      if (nextName) {
        calendar.name = nextName.trim();
        saveCalendarStore();
      }
      renderCalendarSelectors();
      renderCalendarList();
      renderAgendaEvents();
      renderCalendar();
    }
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await apiPost("/api/auth/logout", { token: getAuthToken() });
    } catch (error) {
      console.error("Erro ao encerrar sessao:", error);
    }

    clearAuthSession();
    window.location.href = "./login.html";
  });
}

if (adminUsersList) {
  adminUsersList.addEventListener("click", async (event) => {
    const saveButton = event.target.closest("[data-admin-save]");
    if (!saveButton) {
      return;
    }

    const row = saveButton.closest(".admin-user-row");
    const userId = saveButton.dataset.adminSave;
    if (!row || !userId) {
      return;
    }

    const role = row.querySelector("[data-admin-role]")?.value || "user";
    const subscriptionStatus = row.querySelector("[data-admin-status]")?.value || "pending";
    const subscriptionExpires = row.querySelector("[data-admin-expires]")?.value || null;
    const subscriptionUrl = row.querySelector("[data-admin-subscription-url]")?.value.trim() || "";

    saveButton.disabled = true;
    setFeedback(adminFeedback, "Salvando ajuste da usuaria...");

    try {
      const response = await apiPost("/api/admin/users/update", {
        token: getAuthToken(),
        userId: Number(userId),
        role,
        subscriptionStatus,
        subscriptionActive: subscriptionStatus === "active",
        subscriptionExpires,
        subscriptionUrl,
      });

      renderAdminSummary(response.summary || {});
      await loadAdminDashboard();
      setFeedback(adminFeedback, "Controle da usuaria atualizado.", "success");
    } catch (error) {
      setFeedback(adminFeedback, error.message, "error");
    } finally {
      saveButton.disabled = false;
    }
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
    scheduleCloudSync();
    renderFinance();
  });
});

function setupPersistedFields() {
  persistFields.forEach((field) => {
    const key = field.dataset.persistKey;
    if (!key) {
      return;
    }
    const savedValue = localStorage.getItem(`vida-nova:field:${key}`);
    if (savedValue !== null) {
      field.value = savedValue;
    }
    field.addEventListener("input", () => {
      localStorage.setItem(`vida-nova:field:${key}`, field.value);
      scheduleCloudSync();
    });
  });
}

function getDreamVisionStorageKey(scope = "main") {
  return scope === "planner" ? "vida-nova:planner-dream-vision-images" : "vida-nova:dream-vision-images";
}

function getStoredDreamVisionImages(scope = "main") {
  return JSON.parse(localStorage.getItem(getDreamVisionStorageKey(scope)) || "[]");
}

function saveDreamVisionImages(images, scope = "main") {
  localStorage.setItem(getDreamVisionStorageKey(scope), JSON.stringify(images));
  scheduleCloudSync();
}

function renderDreamVisionGallery(images = getStoredDreamVisionImages(), scope = "main") {
  const targetGallery = scope === "planner" ? plannerDreamVisionGallery : dreamVisionGallery;

  if (!targetGallery) {
    return;
  }

  targetGallery.innerHTML = "";

  if (!images.length) {
    targetGallery.innerHTML =
      '<div class="dream-empty-state">Adicione imagens do seu mural de sonhos para montar sua visao.</div>';
    return;
  }

  images.forEach((image, index) => {
    const card = document.createElement("figure");
    card.className = "dream-vision-card";
    card.innerHTML = `
      <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.name || `Imagem ${index + 1}`)}" />
      <button type="button" class="task-remove dream-remove-button" data-dream-remove="${index}" data-dream-scope="${scope}">Remover</button>
    `;
    targetGallery.appendChild(card);
  });
}

function savePlannerBoardStore() {
  localStorage.setItem("vida-nova:planner-boards", JSON.stringify(plannerBoardStore));
  scheduleCloudSync();
}

function getPlannerBoard(boardKey) {
  if (!plannerBoardStore[boardKey]) {
    plannerBoardStore[boardKey] = [];
  }
  return plannerBoardStore[boardKey];
}

function renderPlannerBoards() {
  plannerTaskLists.forEach((list) => {
    const boardKey = list.dataset.plannerList;
    const items = getPlannerBoard(boardKey);
    list.innerHTML = "";

    if (!items.length) {
      list.innerHTML = '<li class="planner-task-empty">Nenhuma tarefa ainda. Adicione a primeira prioridade.</li>';
      return;
    }

    items.forEach((item) => {
      const entry = document.createElement("li");
      entry.className = `planner-task-card${item.done ? " is-done" : ""}`;
      entry.innerHTML = `
        <button type="button" class="planner-task-check" data-planner-toggle="${escapeHtml(boardKey)}:${escapeHtml(item.id)}" aria-label="Marcar tarefa"></button>
        <span class="planner-task-text">${escapeHtml(item.text)}</span>
        <button type="button" class="task-remove" data-planner-remove="${escapeHtml(boardKey)}:${escapeHtml(item.id)}">Excluir</button>
      `;
      list.appendChild(entry);
    });
  });
}

function setupPlannerBoards() {
  renderPlannerBoards();

  plannerTaskForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const boardKey = form.dataset.plannerBoard;
      const input = form.querySelector(".planner-task-input");
      const text = input?.value.trim() || "";

      if (!boardKey || !text) {
        return;
      }

      getPlannerBoard(boardKey).unshift({
        id: crypto.randomUUID(),
        text,
        done: false,
      });

      if (input) {
        input.value = "";
      }

      savePlannerBoardStore();
      renderPlannerBoards();
    });
  });

  plannerTaskLists.forEach((list) => {
    list.addEventListener("click", (event) => {
      const toggleButton = event.target.closest("[data-planner-toggle]");
      if (toggleButton) {
        const [boardKey, itemId] = String(toggleButton.dataset.plannerToggle || "").split(":");
        const items = getPlannerBoard(boardKey);
        const task = items.find((entry) => entry.id === itemId);
        if (task) {
          task.done = !task.done;
          savePlannerBoardStore();
          renderPlannerBoards();
        }
        return;
      }

      const removeButton = event.target.closest("[data-planner-remove]");
      if (!removeButton) {
        return;
      }

      const [boardKey, itemId] = String(removeButton.dataset.plannerRemove || "").split(":");
      plannerBoardStore[boardKey] = getPlannerBoard(boardKey).filter((entry) => entry.id !== itemId);
      savePlannerBoardStore();
      renderPlannerBoards();
    });
  });
}

function getProjectAttachmentKey(projectKey) {
  return `vida-nova:project-attachments:${projectKey}`;
}

function getStoredProjectAttachments(projectKey) {
  return JSON.parse(localStorage.getItem(getProjectAttachmentKey(projectKey)) || "[]");
}

function saveProjectAttachments(projectKey, files) {
  localStorage.setItem(getProjectAttachmentKey(projectKey), JSON.stringify(files));
}

function renderProjectAttachments(projectKey) {
  const gallery = document.querySelector(`[data-project-gallery="${projectKey}"]`);
  if (!gallery) {
    return;
  }

  const files = getStoredProjectAttachments(projectKey);
  gallery.innerHTML = "";

  if (!files.length) {
    gallery.innerHTML =
      '<div class="project-empty-state">Nenhum anexo ou referencia adicionados ainda.</div>';
    return;
  }

  files.forEach((file, index) => {
    const item = document.createElement("article");
    item.className = "project-attachment-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(file.name || `Arquivo ${index + 1}`)}</strong>
        <small>${escapeHtml(file.type || "Referencia")}</small>
      </div>
      <button type="button" class="task-remove" data-project-remove="${projectKey}:${index}">Excluir</button>
    `;
    gallery.appendChild(item);
  });
}

function renderAllProjectAttachments() {
  projectGalleries.forEach((gallery) => {
    renderProjectAttachments(gallery.dataset.projectGallery);
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

function setupDreamVisionUpload() {
  const uploadConfigs = [
    { input: dreamVisionUpload, gallery: dreamVisionGallery, scope: "main" },
    { input: plannerDreamVisionUpload, gallery: plannerDreamVisionGallery, scope: "planner" },
  ];

  uploadConfigs.forEach(({ input, gallery, scope }) => {
    if (!input || !gallery) {
      return;
    }

    renderDreamVisionGallery(getStoredDreamVisionImages(scope), scope);

    input.addEventListener("change", () => {
      const files = Array.from(input.files || []).filter((file) => file.type.startsWith("image/"));

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
              reader.onerror = () => reject(new Error("Falha ao carregar imagem do mural."));
              reader.readAsDataURL(file);
            }),
        ),
      )
        .then((images) => {
          const stored = getStoredDreamVisionImages(scope);
          const nextImages = [...stored, ...images].slice(-12);
          saveDreamVisionImages(nextImages, scope);
          renderDreamVisionGallery(nextImages, scope);
          input.value = "";
        })
        .catch((error) => {
          console.error(error);
        });
    });

    gallery.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-dream-remove]");
      if (!removeButton) {
        return;
      }

      const removeIndex = Number(removeButton.dataset.dreamRemove);
      const removeScope = removeButton.dataset.dreamScope || scope;
      const nextImages = getStoredDreamVisionImages(removeScope).filter((_, index) => index !== removeIndex);
      saveDreamVisionImages(nextImages, removeScope);
      renderDreamVisionGallery(nextImages, removeScope);
    });
  });
}

function setupProjectUploads() {
  renderAllProjectAttachments();

  projectUploads.forEach((input) => {
    input.addEventListener("change", () => {
      const projectKey = input.dataset.projectUpload;
      if (!projectKey) {
        return;
      }

      const files = Array.from(input.files || []);
      const existingFiles = getStoredProjectAttachments(projectKey);
      const nextFiles = [
        ...existingFiles,
        ...files.map((file) => ({
          name: file.name,
          type: file.type || "Arquivo",
          size: file.size || 0,
        })),
      ].slice(-12);

      saveProjectAttachments(projectKey, nextFiles);
      renderProjectAttachments(projectKey);
      input.value = "";
    });
  });

  projectGalleries.forEach((gallery) => {
    gallery.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-project-remove]");
      if (!removeButton) {
        return;
      }

      const [projectKey, itemIndex] = String(removeButton.dataset.projectRemove || "").split(":");
      const nextFiles = getStoredProjectAttachments(projectKey).filter(
        (_, index) => index !== Number(itemIndex),
      );
      saveProjectAttachments(projectKey, nextFiles);
      renderProjectAttachments(projectKey);
    });
  });
}

function formatCalculatorDisplay(expression) {
  return String(expression || "0").replace(/\*/g, "×").replace(/\//g, "÷");
}

function appendCalculatorValue(value) {
  const operators = new Set(["+", "-", "*", "/"]);
  const current = calculatorExpression === "Erro" ? "0" : calculatorExpression;
  const lastChar = current.slice(-1);

  if (/\d/.test(value)) {
    calculatorExpression = current === "0" ? value : `${current}${value}`;
    return;
  }

  if (value === ".") {
    const currentNumber = current.split(/[+\-*/()]/).pop() || "";
    if (currentNumber.includes(".")) {
      return;
    }

    calculatorExpression =
      current === "0" || operators.has(lastChar) || lastChar === "("
        ? `${current === "0" ? "" : current}0.`
        : `${current}.`;
    return;
  }

  if (value === "(") {
    calculatorExpression =
      current === "0" || operators.has(lastChar) || lastChar === "("
        ? `${current === "0" ? "" : current}(`
        : `${current}*(`;
    return;
  }

  if (value === ")") {
    const openCount = (current.match(/\(/g) || []).length;
    const closeCount = (current.match(/\)/g) || []).length;
    if (openCount <= closeCount || operators.has(lastChar) || lastChar === "(") {
      return;
    }
    calculatorExpression = `${current})`;
    return;
  }

  if (operators.has(value)) {
    if (current === "0") {
      if (value === "-") {
        calculatorExpression = "-";
      }
      return;
    }

    if (operators.has(lastChar)) {
      calculatorExpression = `${current.slice(0, -1)}${value}`;
      return;
    }

    if (lastChar === "." || lastChar === "(") {
      return;
    }

    calculatorExpression = `${current}${value}`;
  }
}

function evaluateCalculatorExpression() {
  const normalized = String(calculatorExpression || "0").trim();

  if (!normalized || normalized === "Erro") {
    calculatorExpression = "0";
    return;
  }

  if (!/^[0-9+\-*/().\s]+$/.test(normalized)) {
    calculatorExpression = "Erro";
    return;
  }

  const openCount = (normalized.match(/\(/g) || []).length;
  const closeCount = (normalized.match(/\)/g) || []).length;
  if (openCount !== closeCount || /[+\-*/.(]$/.test(normalized)) {
    calculatorExpression = "Erro";
    return;
  }

  try {
    const result = Function(`"use strict"; return (${normalized})`)();
    calculatorExpression =
      typeof result === "number" && Number.isFinite(result)
        ? String(Number.parseFloat(result.toFixed(8)))
        : "Erro";
  } catch {
    calculatorExpression = "Erro";
  }
}

function renderCalculator() {
  if (calculatorDisplay) {
    calculatorDisplay.textContent = formatCalculatorDisplay(calculatorExpression);
  }
}

if (calculatorDisplay) {
  calculatorKeys.forEach((key) => {
    key.addEventListener("click", () => {
      const action = key.dataset.calcAction;
      const value = key.dataset.calcValue;

      if (action === "clear") {
        calculatorExpression = "0";
      } else if (action === "equals") {
        evaluateCalculatorExpression();
      } else if (value) {
        appendCalculatorValue(value);
      }

      renderCalculator();
    });
  });

  renderCalculator();
}

moduleOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModuleModal(button.dataset.module);
  });
});

moduleOpenCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("button, input, textarea, select, a")) {
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
    const parsed = parseNaturalLanguageEvent(calendarModalTitleInput.value, targetDate);
    const title = parsed.title.trim();

    if (!title) {
      return;
    }

    const calendarId = calendarModalCalendar?.value || calendarStore[0]?.id || "pessoal";

    ensureAgendaDay(targetDate).events.push({
      id: crypto.randomUUID(),
      time: calendarModalTime.value || parsed.time || "",
      endTime: calendarModalEndTime.value || parsed.endTime || "",
      title,
      location: calendarModalLocation.value.trim(),
      link: calendarModalLink.value.trim(),
      guests: calendarModalGuests?.value
        .split(",")
        .map((guest) => guest.trim())
        .filter(Boolean),
      calendarId,
      category: calendarModalCategory.value || "Pessoal",
      recurrence: calendarModalRecurrence?.value || "none",
      color: calendarModalColor.value || getCalendarById(calendarId).color || "#4285f4",
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
      const bounds = column.getBoundingClientRect();
      const offsetY = Math.max(0, event.clientY - bounds.top);
      const startTime = getRoundedTimeFromOffset(offsetY);
      const [hours, minutes] = startTime.split(":").map(Number);
      const endDate = new Date(2000, 0, 1, hours, minutes + 30);
      const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(
        endDate.getMinutes(),
      ).padStart(2, "0")}`;
      openCalendarModal(selectedDateKey, {
        time: startTime,
        endTime,
      });
    }
  });
}

if (yearViewShell) {
  yearViewShell.addEventListener("click", (event) => {
    const button = event.target.closest("[data-year-date]");
    if (!button) {
      return;
    }
    selectedDateKey = button.dataset.yearDate;
    calendarCursor = new Date(`${selectedDateKey}T12:00:00`);
    agendaView = "month";
    renderCalendar();
    renderAgendaEvents();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.target.closest("input, textarea, select")) {
    return;
  }

  if (event.key === "c") {
    event.preventDefault();
    openCalendarModal(selectedDateKey);
  }

  if (event.key === "t") {
    event.preventDefault();
    const today = new Date();
    selectedDateKey = formatDateKey(today);
    calendarCursor = new Date(today.getFullYear(), today.getMonth(), 1);
    renderCalendar();
    renderAgendaEvents();
  }

  if (event.key === "/") {
    event.preventDefault();
    agendaSearchInput?.focus();
  }
});

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
  scheduleCloudSync();
  openEditor(activeCard);
});

async function bootApp() {
  await initializeAuthenticatedState();

  if (notesInput) {
    notesInput.value = localStorage.getItem("ela-em-ordem:notes") || "";
  }

  setTheme(localStorage.getItem("ela-em-ordem:theme") || "light");
  setLayout(localStorage.getItem("ela-em-ordem:layout") || "soft");
  setAccentColor(localStorage.getItem("vida-nova:accent-color") || "#c55b84", false);
  hydrateSessionUI(requireSession());
  restoreGridOrders();
  restoreSavedCards();
  initializeDragAndDrop();
  renderCalendarSelectors();
  renderCalendarList();
  setActivePage(window.location.hash.replace("#", "") || "dashboard", false);
  renderVerse();
  renderTasks();
  renderCalendar();
  renderAgendaEvents();
  renderFinance();
  renderDashboardMirror();
  renderModuleCards();
  setupPersistedFields();
  setupPlannerBoards();
  setupTabs();
  setupDreamVisionUpload();
  setupProjectUploads();
  registerServiceWorker();
  setupInstallPrompt();
  updateInstallUi();
}

bootApp().catch((error) => {
  console.error("Erro ao iniciar o app:", error);
  clearAuthSession();
  window.location.href = "./login.html";
});
