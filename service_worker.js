const CACHE_NAME = 'DPR_Firebird_Query_v0.0.0';

const FILES = [
    '/index.html',

    '/css/styles.css',
    '/css/getmdl-select-master/getmdl-select-min.css',

    '/js/aplicacao.js',
    '/js/getmdl-select-master/getmdl-select.min.js',

    '/images/icon.png',
    '/images/icon-72.png',
    '/images/icon-144.png',
    '/images/icon-192.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => (cache.addAll(FILES)))
    )
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => (response || fetch(event.request)))
            .catch( erro => (console.log("Erro ao dar fetch: ", erro)))
    )
});
