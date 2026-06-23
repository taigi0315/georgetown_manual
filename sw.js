/* Service worker for The Choi Family Manual (TASK-014).
   Conservative strategy so the family is never stuck on a stale page:
   - HTML  -> network-first (online always gets the latest; offline falls back to cache)
   - same-origin assets (images, manifest, icons) -> cache-first with background refresh
   - cross-origin (Google Fonts) -> stale-while-revalidate, best-effort
   Bump VERSION on each release to invalidate old caches. */
const VERSION = 'v3.8';
const SHELL_CACHE = 'choi-shell-' + VERSION;
const RUNTIME_CACHE = 'choi-runtime-' + VERSION;

const SHELL = [
  './',
  './index.html',
  './agent.html',
  './cards.json',
  './manifest.webmanifest',
  './images/icon_192.png',
  './images/icon_512.png',
  './images/icon_maskable_512.png',
  './images/apple_touch_icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== SHELL_CACHE && k !== RUNTIME_CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  // HTML: network-first.
  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Same-origin static assets: cache-first, refresh in the background.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // Cross-origin (fonts): stale-while-revalidate.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
