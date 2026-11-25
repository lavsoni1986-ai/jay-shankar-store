// ============================================================
// Service Worker — Jay Shankar Readymade Store
// Hardened PWA / TWA cache strategy
// ============================================================

const CACHE_NAME = 'js-store-static-v2';
const CACHE_PREFIX = 'js-store-';

// Essential static assets for shell and branding
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-maskable-512x512.png',
  '/images/jay-shankar-js-logo.png',
  '/images/jay-shankar-full-logo.png',
];

// Install: pre-cache static shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[SW] Pre-caching failed:', err);
      })
  );
});

// Activate: clean up ONLY outdated caches in our application namespace
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: safe caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Only handle HTTP/HTTPS GET requests from same origin
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // 2. Strict bypass: never cache API, Admin, Auth, or Private endpoints
  const isAuthOrAdmin =
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.includes('/login') ||
    url.pathname.includes('/logout');

  if (isAuthOrAdmin) {
    return;
  }

  // 3. Static Assets (_next/static, images, icons, fonts): Cache-first with network fallback
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff2');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            // Check for no-store / private headers
            const cacheControl = networkResponse.headers.get('Cache-Control') || '';
            if (!cacheControl.includes('no-store') && !cacheControl.includes('private')) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 4. Navigation (HTML Pages, catalogue, products): Network-first with Cache fallback to guarantee freshness
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cacheControl = networkResponse.headers.get('Cache-Control') || '';
            if (!cacheControl.includes('no-store') && !cacheControl.includes('private')) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return caches.match('/');
          });
        })
    );
  }
});
