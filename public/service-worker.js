const CACHE_NAME = 'v2';
const urlsToCache = [
  '/', // Cache the root page
  '/index.html',
  '/favicon.png',
  '/logo192.png',
  '/manifest.json',
  // You can add other URLs to cache, such as CSS, JS, images, etc.
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js',
  'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js',
];

// Install event: caching static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serving cached assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return the cached response
      if (response) {
        return response;
      }
      // Otherwise, fetch the resource from the network
      return fetch(event.request).catch(() => {
        // If both the cache and network fail, return a fallback offline page (optional)
        return caches.match('/offline.html');
      });
    })
  );
});

// Activate event: cleaning up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
