const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_FILES = [
  '/',
  '/index.html',
  '/blinker.html',
  '/manifest.json',
  '/assets/bio-leaves.png',
  '/assets/dp.png',
  '/assets/location.png',
  '/assets/tg.png',
  '/assets/icons/cdn.css',
  '/assets/icons/uicons-regular-rounded.eot',
  '/assets/icons/uicons-regular-rounded.woff',
  '/assets/icons/uicons-regular-rounded.woff2'
];

// Install event – cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES))
  );
});

// Activate event – clean old caches if any
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// Fetch event – serve from cache or fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
