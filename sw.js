const CACHE_NAME = "vida-nova-v9";
const CACHE_DYNAMIC = "vida-nova-dynamic-v8";
const APP_SHELL = [
  "./",
  "./index.html",
  "./login.html",
  "./mobile.html",
  "./styles.css",
  "./script.js",
  "./login.js",
  "./mobile.js",
  "./manifest.webmanifest",
  "./icon.svg?v=nv3",
  "./icon-192.png?v=nv3",
  "./icon-512.png?v=nv3",
  "./apple-touch-icon.png?v=nv3",
  "./apple-touch-icon-180.png?v=nv3",
  "./mstile-150.png",
];

// Install event - cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL).catch(() => {
        // If some resources fail, continue anyway
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== CACHE_DYNAMIC)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch event - Network first, then cache
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Remove _v param (adicionado pelo polling de versão) para não poluir o cache
  if (url.searchParams.has("_v")) {
    url.searchParams.delete("_v");
    const cleanRequest = new Request(url.toString(), { headers: request.headers, mode: "same-origin", credentials: request.credentials });
    event.respondWith(fetch(cleanRequest, { cache: "no-store" }).catch(() => caches.match(cleanRequest)));
    return;
  }

  // version.json is always fetched from network — never cached
  if (url.pathname.endsWith("/version.json")) {
    event.respondWith(fetch(request, { cache: "no-store" }).catch(() => new Response("{}", { status: 503 })));
    return;
  }

  // Handle same-origin requests
  if (url.origin === location.origin) {
    // HTML nunca fica em cache — sempre busca da rede para garantir versão nova
    const isHtml =
      url.pathname.endsWith(".html") ||
      url.pathname === "/" ||
      url.pathname === "";

    if (isHtml) {
      event.respondWith(
        fetch(request, { cache: "no-store" }).catch(() => caches.match(request))
      );
      return;
    }

    const isAppAsset =
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".webmanifest") ||
      url.pathname.endsWith(".svg") ||
      url.pathname.endsWith(".png");

    if (isAppAsset) {
      // Network first, atualiza cache, fallback offline
      event.respondWith(
        fetch(request, { cache: "no-cache" })
          .then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          })
          .catch(() => caches.match(request))
      );
      return;
    }
  }

  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request)
        .then((response) => {
          if (response.ok && request.method === "GET") {
            const responseClone = response.clone();
            caches.open(CACHE_DYNAMIC).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback
          return new Response(
            "Sem conexão. Alguns dados podem não estar disponíveis.",
            { status: 503, statusText: "Service Unavailable" }
          );
        });
    })
  );
});

// Handle messages from clients
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("push", (event) => {
  let data = { title: "Vida Nova", body: "Você tem uma novidade!", url: "./" };
  try {
    if (event.data) {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    }
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icon-192.png?v=nv3",
      badge: "./icon-192.png?v=nv3",
      data: { url: data.url },
      vibrate: [200, 100, 200],
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || "./index.html";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(targetUrl).catch(() => {});
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }

      return Promise.resolve();
    }),
  );
});
