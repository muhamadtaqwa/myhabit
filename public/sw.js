// MyHabit Minimal PWA Service Worker (Installable without offline caching)
const CACHE_NAME = 'myhabit-v3';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Online passthrough fetch handler - fulfills PWA installability criteria
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // When completely offline, standard network failure
            return new Response('Anda sedang offline. Buka kembali saat terhubung internet.', {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
        })
    );
});
