const CACHE_NAME = 'DPR_Firebird_Query_v0.0.0';

const FILES = [
    '/index.html',

    '/css/*.css',
    '/css/getmdl-select-master/*.css',

    '/js/aplicacao.js',
    '/js/getmdl-select-master/*.js',

    '/images/*.png'
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
    )
});
