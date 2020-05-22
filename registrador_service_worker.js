if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service_worker.js')
            .then( (regis) => {console.log('Service worker registrado!', regis)} )
            .catch( (erro) => {console.log('Erro ao registrar o meu service worker', erro) })
    })
};