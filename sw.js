const CACHE_NAME = "vida-nova-v4";
const CACHE_DYNAMIC = "vida-nova-dynamic-v4";
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
  
  // Handle same-origin requests
  if (url.origin === location.origin) {
    const isAppAsset =
      url.pathname.endsWith(".html") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".webmanifest") ||
      url.pathname.endsWith(".svg") ||
      url.pathname.endsWith(".png");

    if (isAppAsset) {
      // Network first, fallback to cache for app assets
      event.respondWith(
        fetch(request)
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
