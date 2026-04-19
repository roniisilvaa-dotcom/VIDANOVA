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

const session = JSON.parse(
  localStorage.getItem("ela-em-ordem:session") ||
    JSON.stringify({ name: "Visitante", email: "demo@elaemordem.app" }),
);

const agendaStore = JSON.parse(localStorage.getItem("ela-em-ordem:agenda-events") || "{}");
let topTenItems = JSON.parse(localStorage.getItem("ela-em-ordem:top-ten") || "[]");

function ensureDay() {
  if (!agendaStore[todayKey]) {
    agendaStore[todayKey] = { summary: "", events: [] };
  }

  return agendaStore[todayKey];
}

function saveAgenda() {
  localStorage.setItem("ela-em-ordem:agenda-events", JSON.stringify(agendaStore));
}

function saveTopTen() {
  localStorage.setItem("ela-em-ordem:top-ten", JSON.stringify(topTenItems));
}

function renderEvents() {
  const day = ensureDay();
  mobileEvents.innerHTML = "";

  day.events
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))
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

mobileGreeting.textContent = `Ela em Ordem, ${session.name}`;
mobileDateLabel.textContent = today.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
mobileSummary.value = ensureDay().summary || "";
mobileNotes.value = localStorage.getItem("ela-em-ordem:notes") || "";

mobileSummary.addEventListener("input", () => {
  ensureDay().summary = mobileSummary.value;
  saveAgenda();
});

mobileNotes.addEventListener("input", () => {
  localStorage.setItem("ela-em-ordem:notes", mobileNotes.value);
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

renderEvents();
renderTopTen();
