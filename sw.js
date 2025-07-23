const cacheName='simon-v2';
const appFiles=[
    'index.html',
    'lose.html',
    'win.html',
    'home.html',
    'principale.html',
    'style.css',
    'manifest.json',
    'sw.js',
    'app.js',
];

// Caches all the PWA shell files (appFiles array) when the app is launched
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(appFiles);
        })
    );
});


// Called when the service worker is started
self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activate');
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== cacheName) {
                        console.log('[Service Worker] Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Intercetta le richieste e restituisce il contenuto dalla cache
self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
