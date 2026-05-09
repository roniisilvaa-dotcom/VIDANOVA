/**
 * ============================================================
 * VIDA NOVA — YouTube Notifications
 * Arquivo: yt-notify.js
 * 
 * Adicione no index.html antes de </body>:
 * <script src="yt-notify.js"></script>
 * 
 * Coloque o sino no topbar (dentro de .topbar-actions):
 * <div class="yt-bell-wrapper" style="position:relative;">
 *   <button class="yt-bell-btn" id="yt-bell-btn" aria-label="Vídeos novos da Camila">
 *     <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
 *       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
 *       <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
 *     </svg>
 *     <span class="yt-bell-badge" id="yt-bell-badge"></span>
 *   </button>
 *   <div class="yt-panel" id="yt-panel"></div>
 * </div>
 * ============================================================
 */

;(function () {
  'use strict';

  /* ── Configuração ── */
  const CONFIG = {
    CHANNEL_HANDLE: '@eusoucamilarocha',
    CHANNEL_ID:     'UCxxxxxxxxxxxxxxxxx', // será resolvido via RSS
    RSS_URL:        'https://www.youtube.com/feeds/videos.xml?channel_id=',
    // Proxy CORS para buscar RSS (gratuito)
    CORS_PROXY:     'https://api.allorigins.win/get?url=',
    CHECK_INTERVAL: 15 * 60 * 1000,   // Verificar a cada 15 min
    STORAGE_KEY:    'vn_yt_videos',
    UNREAD_KEY:     'vn_yt_unread',
    MAX_ITEMS:      10,
    CHANNEL_URL:    'https://www.youtube.com/@eusoucamilarocha',
    // ID do canal da Camila (obtido manualmente)
    KNOWN_CHANNEL_ID: 'UCiZCp6fMBzAlMlDvgNJhK3g',
  };

  /* ── Estado ── */
  let storedVideos  = [];
  let unreadIds     = [];
  let panelIsOpen   = false;

  /* ── Utilidades ── */
  function loadState() {
    try {
      storedVideos = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
      unreadIds    = JSON.parse(localStorage.getItem(CONFIG.UNREAD_KEY)  || '[]');
    } catch (e) {
      storedVideos = []; unreadIds = [];
    }
  }

  function saveState() {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(storedVideos));
      localStorage.setItem(CONFIG.UNREAD_KEY,  JSON.stringify(unreadIds));
    } catch (e) {}
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins < 2)   return 'Agora mesmo';
    if (mins < 60)  return `${mins} minutos atrás`;
    if (hours < 24) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    if (days < 7)   return `${days} dia${days > 1 ? 's' : ''} atrás`;
    return new Date(dateStr).toLocaleDateString('pt-BR', { day:'2-digit', month:'short' });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Busca RSS do YouTube ── */
  async function fetchYouTubeRSS() {
    const rssUrl   = CONFIG.RSS_URL + CONFIG.KNOWN_CHANNEL_ID;
    const proxyUrl = CONFIG.CORS_PROXY + encodeURIComponent(rssUrl);

    try {
      const res  = await fetch(proxyUrl, { signal: AbortSignal.timeout(10000) });
      const json = await res.json();
      const xml  = json.contents;

      const parser = new DOMParser();
      const doc    = parser.parseFromString(xml, 'application/xml');
      const entries = Array.from(doc.querySelectorAll('entry'));

      return entries.slice(0, CONFIG.MAX_ITEMS).map(entry => {
        const videoId   = entry.querySelector('videoId')?.textContent || '';
        const title     = entry.querySelector('title')?.textContent    || '';
        const published = entry.querySelector('published')?.textContent || '';
        const thumb     = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        const url       = `https://www.youtube.com/watch?v=${videoId}`;
        return { id: videoId, title, published, thumb, url };
      });
    } catch (err) {
      console.warn('[VN YT] Erro ao buscar RSS:', err.message);
      return null;
    }
  }

  /* ── Processa novos vídeos ── */
  async function checkForNewVideos(isFirstLoad = false) {
    const videos = await fetchYouTubeRSS();
    if (!videos || !videos.length) return;

    const prevIds     = storedVideos.map(v => v.id);
    const newVideos   = videos.filter(v => !prevIds.includes(v.id));

    storedVideos = videos;

    if (!isFirstLoad && newVideos.length > 0) {
      // Marcar como não-lidos
      newVideos.forEach(v => { if (!unreadIds.includes(v.id)) unreadIds.push(v.id); });
      saveState();

      // Mostrar notificação toast para cada novo vídeo (máx 2)
      newVideos.slice(0, 2).forEach((v, i) => {
        setTimeout(() => showToast(v), i * 600);
      });
    } else {
      saveState();
    }

    updateBadge();
    if (panelIsOpen) renderPanel();
  }

  /* ── Toast notification ── */
  function showToast(video) {
    let wrap = document.getElementById('yt-notify-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'yt-notify-wrap';
      wrap.className = 'yt-notify-wrap';
      document.body.appendChild(wrap);
    }

    const card = document.createElement('div');
    card.className = 'yt-notify-card';
    card.innerHTML = `
      <div class="yt-notify-icon">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.53 3.6 12 3.6 12 3.6s-7.53 0-9.38.47A3.01 3.01 0 0 0 .5 6.2C0 8.05 0 12 0 12s0 3.95.5 5.8a3.01 3.01 0 0 0 2.12 2.13C4.47 20.4 12 20.4 12 20.4s7.53 0 9.38-.47a3.01 3.01 0 0 0 2.12-2.13C24 15.95 24 12 24 12s0-3.95-.5-5.8z"/>
          <path d="M9.75 15.02l6.25-3.02-6.25-3.02v6.04z" fill="#FF0000"/>
        </svg>
      </div>
      <div class="yt-notify-body">
        <div class="yt-notify-label">📹 Novo vídeo da Camila!</div>
        <div class="yt-notify-title">${escapeHtml(video.title)}</div>
        <div class="yt-notify-sub">${timeAgo(video.published)}</div>
        <a href="${video.url}" target="_blank" rel="noopener" class="yt-notify-btn">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="#c9395f"><polygon points="5,3 19,12 5,21"/></svg>
          Assistir agora
        </a>
      </div>
      <button class="yt-notify-close" aria-label="Fechar">×</button>
    `;

    wrap.appendChild(card);

    // Animar entrada
    requestAnimationFrame(() => {
      requestAnimationFrame(() => card.classList.add('is-visible'));
    });

    // Auto-fechar após 8 seg
    const timer = setTimeout(() => dismissToast(card), 8000);

    card.querySelector('.yt-notify-close').addEventListener('click', () => {
      clearTimeout(timer);
      dismissToast(card);
    });
  }

  function dismissToast(card) {
    card.classList.remove('is-visible');
    card.classList.add('is-hiding');
    setTimeout(() => card.remove(), 400);
  }

  /* ── Badge do sino ── */
  function updateBadge() {
    const badge = document.getElementById('yt-bell-badge');
    if (!badge) return;
    if (unreadIds.length > 0) {
      badge.classList.add('has-new');
    } else {
      badge.classList.remove('has-new');
    }
  }

  /* ── Painel de notificações ── */
  function renderPanel() {
    const panel = document.getElementById('yt-panel');
    if (!panel) return;

    if (!storedVideos.length) {
      panel.innerHTML = `
        <div class="yt-panel-head">
          <h4>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF0000"><path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.53 3.6 12 3.6 12 3.6s-7.53 0-9.38.48A3 3 0 0 0 .5 6.2C0 8.05 0 12 0 12s0 3.95.5 5.8a3 3 0 0 0 2.12 2.12C4.47 20.4 12 20.4 12 20.4s7.53 0 9.38-.48a3 3 0 0 0 2.12-2.12C24 15.95 24 12 24 12s0-3.95-.5-5.8z"/><path d="M9.75 15.02l6.25-3.02-6.25-3.02v6.04z" fill="white"/></svg>
            Vídeos da Camila
          </h4>
        </div>
        <div class="yt-panel-empty">Carregando vídeos...</div>
      `;
      return;
    }

    const items = storedVideos.slice(0, CONFIG.MAX_ITEMS).map(v => {
      const isUnread = unreadIds.includes(v.id);
      return `
        <a href="${v.url}" target="_blank" rel="noopener"
           class="yt-panel-item${isUnread ? ' is-unread' : ''}"
           data-vid="${v.id}">
          <div class="yt-panel-thumb-placeholder">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
          <div class="yt-panel-info">
            <div class="yt-panel-title">${escapeHtml(v.title)}</div>
            <div class="yt-panel-meta">${timeAgo(v.published)}</div>
          </div>
          ${isUnread ? '<div class="yt-panel-unread-dot"></div>' : ''}
        </a>
      `;
    }).join('');

    panel.innerHTML = `
      <div class="yt-panel-head">
        <h4>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF0000"><path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.53 3.6 12 3.6 12 3.6s-7.53 0-9.38.48A3 3 0 0 0 .5 6.2C0 8.05 0 12 0 12s0 3.95.5 5.8a3 3 0 0 0 2.12 2.12C4.47 20.4 12 20.4 12 20.4s7.53 0 9.38-.48a3 3 0 0 0 2.12-2.12C24 15.95 24 12 24 12s0-3.95-.5-5.8z"/><path d="M9.75 15.02l6.25-3.02-6.25-3.02v6.04z" fill="white"/></svg>
          Vídeos da Camila
        </h4>
        ${unreadIds.length > 0 ? `<button class="yt-panel-mark-all" id="yt-mark-all">Marcar todos</button>` : ''}
      </div>
      <div class="yt-panel-list">${items}</div>
      <div class="yt-panel-footer">
        <a href="${CONFIG.CHANNEL_URL}" target="_blank" rel="noopener" class="yt-panel-cta">
          Ver canal completo
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8h10M8 4l5 4-5 4"/></svg>
        </a>
      </div>
    `;

    // Marcar todos como lidos
    const markAll = document.getElementById('yt-mark-all');
    if (markAll) {
      markAll.addEventListener('click', e => {
        e.stopPropagation();
        unreadIds = [];
        saveState();
        updateBadge();
        renderPanel();
      });
    }

    // Marcar individual ao clicar
    panel.querySelectorAll('.yt-panel-item').forEach(item => {
      item.addEventListener('click', () => {
        const vid = item.dataset.vid;
        unreadIds = unreadIds.filter(id => id !== vid);
        saveState();
        updateBadge();
      });
    });
  }

  /* ── Toggle painel ── */
  function togglePanel() {
    const panel = document.getElementById('yt-panel');
    if (!panel) return;
    panelIsOpen = !panelIsOpen;
    panel.classList.toggle('is-open', panelIsOpen);
    if (panelIsOpen) renderPanel();
  }

  /* ── Fechar painel ao clicar fora ── */
  document.addEventListener('click', e => {
    if (!e.target.closest('.yt-bell-wrapper')) {
      const panel = document.getElementById('yt-panel');
      if (panel) { panel.classList.remove('is-open'); panelIsOpen = false; }
    }
  });

  /* ── Injetar sino no topbar ── */
  function injectBell() {
    // Evitar duplicata
    if (document.getElementById('yt-bell-btn')) return;

    const actions = document.querySelector('.topbar-actions');
    if (!actions) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'yt-bell-wrapper';
    wrapper.style.position = 'relative';
    wrapper.innerHTML = `
      <button class="yt-bell-btn" id="yt-bell-btn" aria-label="Vídeos novos da Camila Rocha" title="Canal da Camila no YouTube">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="yt-bell-badge" id="yt-bell-badge"></span>
      </button>
      <div class="yt-panel" id="yt-panel"></div>
    `;

    // Inserir antes do primeiro filho dos actions
    actions.insertBefore(wrapper, actions.firstChild);

    document.getElementById('yt-bell-btn').addEventListener('click', e => {
      e.stopPropagation();
      togglePanel();
    });
  }

  /* ── Injetar container de toasts ── */
  function injectToastWrap() {
    if (document.getElementById('yt-notify-wrap')) return;
    const wrap = document.createElement('div');
    wrap.id = 'yt-notify-wrap';
    wrap.className = 'yt-notify-wrap';
    document.body.appendChild(wrap);
  }

  /* ── Banner de aviso no dashboard ── */
  function injectYTBanner() {
    if (document.getElementById('vn-yt-banner')) return;

    const verseArea = document.querySelector('.verse-banner');
    if (!verseArea || !verseArea.parentNode) return;

    const banner = document.createElement('div');
    banner.id = 'vn-yt-banner';
    banner.style.cssText = `
      background: #fff;
      border: 1px solid #f0dce6;
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      cursor: pointer;
    `;
    banner.innerHTML = `
      <div style="width:36px;height:36px;border-radius:8px;background:#FF0000;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
      <div style="flex:1;min-width:0;">
        <p id="vn-yt-banner-title" style="font-size:13px;font-weight:500;color:#2a1f28;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Canal da Camila Rocha</p>
        <p style="font-size:11px;color:#9a8a94;font-weight:300;">Clique para ver os vídeos mais recentes</p>
      </div>
      <span id="vn-yt-new-badge" style="display:none;background:#c9395f;color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:60px;white-space:nowrap;">NOVO</span>
    `;

    banner.addEventListener('click', () => {
      window.open('https://www.youtube.com/@eusoucamilarocha', '_blank', 'noopener');
    });

    verseArea.parentNode.insertBefore(banner, verseArea);
  }

  /* ── Atualiza banner do dashboard com último vídeo ── */
  function updateDashboardBanner() {
    if (!storedVideos.length) return;
    const latest = storedVideos[0];
    const titleEl = document.getElementById('vn-yt-banner-title');
    const badge   = document.getElementById('vn-yt-new-badge');
    if (titleEl) titleEl.textContent = latest.title;
    if (badge && unreadIds.includes(latest.id)) badge.style.display = 'block';
  }

  /* ── Bootstrap ── */
  async function init() {
    loadState();

    // Aguardar DOM
    const ready = () => document.readyState === 'complete' || document.readyState === 'interactive';
    if (!ready()) await new Promise(r => document.addEventListener('DOMContentLoaded', r));

    // Pequeno delay para o app principal carregar
    await new Promise(r => setTimeout(r, 800));

    injectToastWrap();
    injectBell();
    updateBadge();

    // Tentar injetar banner (pode falhar se DOM ainda não tiver verse-banner)
    setTimeout(() => {
      injectYTBanner();
    }, 2000);

    // Primeira verificação (sem toasts)
    await checkForNewVideos(true);
    updateDashboardBanner();

    // Verificações periódicas
    setInterval(async () => {
      await checkForNewVideos(false);
      updateDashboardBanner();
    }, CONFIG.CHECK_INTERVAL);

    // Re-injetar sino se a página mudar de rota
    document.addEventListener('click', e => {
      if (e.target.closest('[data-page-link]') || e.target.closest('[data-go-home]')) {
        setTimeout(() => {
          if (!document.getElementById('yt-bell-btn')) injectBell();
        }, 300);
      }
    });
  }

  init().catch(err => console.warn('[VN YT] Erro:', err));

})();
