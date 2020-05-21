const CACHE_NAME = 'DPR_Firebird_Query_v0.0.0';

const FILES = [
    'index.html',
    'favicon.ico',
    'manifest.json',
    'service_worker.js',

    'css/styles.css',
    'css/getmdl-select-master/getmdl-select.min.css',

    'js/aplicacao.js',
    'js/getmdl-select-master/getmdl-select.min.js',

    'images/icon.png',
    'images/icon-72.png',
    'images/icon-144.png',
    'images/icon-192.png',
    'images/android-chrome-512x512.png',
    'images/apple-touch-icon.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(FILES)
                    .catch(erro => console.log("Erro ao carregar arquivo para cache: ", erro))
            })
    );
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

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                return response || fetch(event.request);
            })
            .catch(erro => console.log("Erro ao carregar arquivo do cache: ", erro))
    )
});
