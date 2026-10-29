// MyHabit Minimal PWA Service Worker (Installable without offline caching)
const CACHE_NAME = 'myhabit-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
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
