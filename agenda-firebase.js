// agenda-firebase.js — Sincronização Firebase Firestore para agenda do Vida Nova
// Integração do super-calendar: eventos salvos na nuvem via Google Account

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAzWAGpK-ebXP0KAjHad3oBOIOMbqdY35Y',
  authDomain: 'ai-studio-applet-webapp-554dc.firebaseapp.com',
  projectId: 'ai-studio-applet-webapp-554dc',
  storageBucket: 'ai-studio-applet-webapp-554dc.firebasestorage.app',
  messagingSenderId: '319793857888',
  appId: '1:319793857888:web:5500cd5c092492a4068a05',
};
const FIRESTORE_DB_ID = 'ai-studio-fd6ec519-ec91-4b48-bbef-3593cca385cf';

const fbApp = initializeApp(FIREBASE_CONFIG, 'vida-nova-agenda');
const auth = getAuth(fbApp);
const db = getFirestore(fbApp, FIRESTORE_DB_ID);

let currentUser = null;
let firestoreUnsubscribe = null;
let isMergingFromFirestore = false;
let syncDebounceTimer = null;

// ─── Conversão de formatos ───────────────────────────────────────────────────

function toFirestoreData(dateKey, ev, userId) {
  const timeStr = ev.time || '00:00';
  const endTimeStr = ev.endTime || '';
  const [sh, sm] = timeStr.split(':').map(Number);
  const start = new Date(dateKey);
  start.setHours(sh, sm, 0, 0);

  let end;
  if (endTimeStr) {
    const [eh, em] = endTimeStr.split(':').map(Number);
    end = new Date(dateKey);
    end.setHours(eh, em, 0, 0);
    if (end <= start) end = new Date(start.getTime() + 60 * 60 * 1000);
  } else {
    end = new Date(start.getTime() + 60 * 60 * 1000);
  }

  const color = /^#[0-9A-Fa-f]{6}$/.test(ev.color || '') ? ev.color : '#4285f4';

  return {
    userId,
    localId: ev.id,
    title: (ev.title || '').slice(0, 200),
    description: ev.description ? String(ev.description).slice(0, 2000) : null,
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end),
    isAllDay: !ev.time,
    color,
    location: ev.location ? String(ev.location).slice(0, 500) : null,
    calendarId: ev.calendarId || null,
    category: ev.category || null,
    recurrence: ev.recurrence || null,
    reminderMinutes: typeof ev.reminderMinutes === 'number' ? ev.reminderMinutes : null,
  };
}

function fromFirestoreDoc(docSnap) {
  const data = docSnap.data();
  const start = data.start.toDate();
  const end = data.end.toDate();

  const dateKey = [
    start.getFullYear(),
    String(start.getMonth() + 1).padStart(2, '0'),
    String(start.getDate()).padStart(2, '0'),
  ].join('-');

  const pad = (n) => String(n).padStart(2, '0');
  const time = data.isAllDay ? '' : `${pad(start.getHours())}:${pad(start.getMinutes())}`;
  const endTime = data.isAllDay ? '' : `${pad(end.getHours())}:${pad(end.getMinutes())}`;

  return {
    dateKey,
    event: {
      id: data.localId || docSnap.id,
      firestoreId: docSnap.id,
      title: data.title || '',
      time,
      endTime,
      description: data.description || '',
      location: data.location || '',
      color: data.color || '#4285f4',
      calendarId: data.calendarId || 'pessoal',
      category: data.category || 'Pessoal',
      recurrence: data.recurrence || 'none',
      reminderMinutes: data.reminderMinutes ?? 15,
      guests: [],
      link: '',
    },
  };
}

// ─── Sync Firestore → Local ──────────────────────────────────────────────────

function mergeFirestoreSnapshot(docs) {
  const store = window._vnAgendaStore;
  if (!store || !window.ensureAgendaDay) return;

  isMergingFromFirestore = true;
  try {
    const firestoreIds = new Set(docs.map((d) => d.id));

    // Remover eventos deletados no Firestore
    Object.keys(store).forEach((dateKey) => {
      const day = store[dateKey];
      if (day && Array.isArray(day.events)) {
        day.events = day.events.filter(
          (ev) => !ev.firestoreId || firestoreIds.has(ev.firestoreId)
        );
      }
    });

    // Adicionar/atualizar eventos do Firestore
    docs.forEach((docSnap) => {
      const { dateKey, event } = fromFirestoreDoc(docSnap);
      const day = window.ensureAgendaDay(dateKey);
      const idx = day.events.findIndex(
        (ev) => ev.firestoreId === event.firestoreId || ev.id === event.id
      );
      if (idx >= 0) {
        day.events[idx] = { ...day.events[idx], ...event };
      } else {
        day.events.push(event);
      }
    });

    // Persiste localmente sem disparar novo sync ao Firebase
    localStorage.setItem('ela-em-ordem:agenda-events', JSON.stringify(store));

    // Re-renderiza
    ['renderAgendaEvents', 'renderCalendar', 'renderWeekView', 'renderScheduleView'].forEach(
      (fn) => typeof window[fn] === 'function' && window[fn]()
    );
  } finally {
    isMergingFromFirestore = false;
  }
}

// ─── Listener Firestore ──────────────────────────────────────────────────────

function startListener(uid) {
  stopListener();
  const q = query(collection(db, 'events'), where('userId', '==', uid));
  firestoreUnsubscribe = onSnapshot(
    q,
    (snapshot) => {
      mergeFirestoreSnapshot(snapshot.docs);
      updateSyncLabel('✓ Sincronizado', 2500);
    },
    (err) => {
      console.error('[AgendaFirebase] Erro listener:', err);
      updateSyncLabel('⚠ Erro de conexão', 3000);
    }
  );
}

function stopListener() {
  if (firestoreUnsubscribe) {
    firestoreUnsubscribe();
    firestoreUnsubscribe = null;
  }
}

// ─── Sync Local → Firestore ──────────────────────────────────────────────────

async function syncAllToFirestore() {
  if (!currentUser || isMergingFromFirestore) return;
  const uid = currentUser.uid;
  const store = window._vnAgendaStore;
  if (!store) return;

  setSyncing(true);
  try {
    // Buscar todos os eventos do usuário no Firestore
    const snapshot = await getDocs(
      query(collection(db, 'events'), where('userId', '==', uid))
    );
    const existingByLocalId = new Map(
      snapshot.docs.map((d) => [d.data().localId, d])
    );
    const existingByFirestoreId = new Map(snapshot.docs.map((d) => [d.id, d]));

    // Coletar eventos locais
    const localEvents = [];
    Object.entries(store).forEach(([dateKey, day]) => {
      (day?.events || []).forEach((ev) => {
        if (ev.title) localEvents.push({ dateKey, ev });
      });
    });

    const localIds = new Set(localEvents.map(({ ev }) => ev.id));

    // Criar / atualizar
    for (const { dateKey, ev } of localEvents) {
      const fsData = toFirestoreData(dateKey, ev, uid);
      const existingDoc = existingByLocalId.get(ev.id) || existingByFirestoreId.get(ev.firestoreId);

      if (existingDoc) {
        await updateDoc(existingDoc.ref, {
          ...fsData,
          updatedAt: serverTimestamp(),
        });
        ev.firestoreId = existingDoc.id;
      } else if (!ev.firestoreId) {
        const ref = await addDoc(collection(db, 'events'), {
          ...fsData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        ev.firestoreId = ref.id;
      }
    }

    // Deletar eventos removidos localmente
    for (const docSnap of snapshot.docs) {
      const localId = docSnap.data().localId;
      if (localId && !localIds.has(localId)) {
        await deleteDoc(docSnap.ref);
      }
    }

    localStorage.setItem('ela-em-ordem:agenda-events', JSON.stringify(store));
    updateSyncLabel('✓ Sincronizado', 2500);
  } catch (err) {
    console.error('[AgendaFirebase] Erro ao sincronizar:', err);
    updateSyncLabel('⚠ Erro ao sincronizar', 3500);
  } finally {
    setSyncing(false);
  }
}

// Debounce: sync 1.5s após última alteração
function onEventsSaved(store) {
  if (!currentUser || isMergingFromFirestore) return;
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(() => syncAllToFirestore(), 1500);
}

// ─── Auth ────────────────────────────────────────────────────────────────────

async function signIn() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    if (err.code !== 'auth/popup-closed-by-user') {
      console.error('[AgendaFirebase] Erro login:', err);
      updateSyncLabel('⚠ Erro ao entrar', 3000);
    }
  }
}

async function signOutUser() {
  try {
    stopListener();
    await fbSignOut(auth);
  } catch (err) {
    console.error('[AgendaFirebase] Erro logout:', err);
  }
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  updateAuthUI(user);
  if (user) {
    startListener(user.uid);
  } else {
    stopListener();
  }
});

// ─── UI ──────────────────────────────────────────────────────────────────────

function buildUI() {
  const agendaPanel = document.querySelector('.agenda-panel');
  if (!agendaPanel) return;

  const bar = document.createElement('div');
  bar.className = 'agenda-sync-bar';
  bar.id = 'agenda-sync-bar';
  bar.innerHTML = `
    <div class="agenda-sync-left">
      <span class="agenda-sync-icon" id="agenda-sync-icon">☁️</span>
      <span class="agenda-sync-label" id="agenda-sync-label">Sincronizar com Google</span>
    </div>
    <button class="agenda-sync-btn" id="agenda-sync-btn" type="button">
      Entrar com Google
    </button>
  `;

  const viewTabs = agendaPanel.querySelector('#agenda-view-tabs');
  if (viewTabs) {
    viewTabs.insertAdjacentElement('afterend', bar);
  } else {
    agendaPanel.appendChild(bar);
  }

  document.getElementById('agenda-sync-btn').addEventListener('click', () => {
    if (currentUser) signOutUser();
    else signIn();
  });
}

function updateAuthUI(user) {
  const label = document.getElementById('agenda-sync-label');
  const btn = document.getElementById('agenda-sync-btn');
  const icon = document.getElementById('agenda-sync-icon');
  if (!label || !btn) return;

  if (user) {
    const name = user.displayName || user.email;
    label.textContent = `Sincronizado • ${name}`;
    btn.textContent = 'Desconectar';
    btn.classList.add('is-connected');
    if (icon) icon.textContent = '🟢';
  } else {
    label.textContent = 'Sincronizar com Google';
    btn.textContent = 'Entrar com Google';
    btn.classList.remove('is-connected');
    if (icon) icon.textContent = '☁️';
  }
}

function updateSyncLabel(msg, duration = 0) {
  const label = document.getElementById('agenda-sync-label');
  if (!label || !currentUser) return;
  const saved = label.textContent;
  label.textContent = msg;
  if (duration > 0) {
    setTimeout(() => {
      if (label && currentUser) {
        label.textContent = `Sincronizado • ${currentUser.displayName || currentUser.email}`;
      }
    }, duration);
  }
}

function setSyncing(active) {
  const icon = document.getElementById('agenda-sync-icon');
  if (!icon) return;
  if (active) {
    icon.textContent = '🔄';
    icon.style.animation = 'spin 1s linear infinite';
  } else {
    icon.textContent = currentUser ? '🟢' : '☁️';
    icon.style.animation = '';
  }
}

// ─── Exposição pública para script.js ───────────────────────────────────────

window.agendaFirebase = {
  signIn,
  signOut: signOutUser,
  onEventsSaved,
  getUser: () => currentUser,
};

// Inicializa UI quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildUI);
} else {
  buildUI();
}
