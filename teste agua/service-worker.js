const CACHE_NAME = 'agua-lembrete-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/12 Tempo Perdido.mp3',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Abrindo cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o recurso do cache se estiver disponível
        if (response) {
          return response;
        }
        
        // Caso contrário, busca na rede
        return fetch(event.request)
          .then((response) => {
            // Verifica se obtivemos uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone a resposta
            const responseToCache = response.clone();
            
            // Adiciona ao cache para uso futuro
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
});

// Limpar caches antigos quando houver nova versão
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Se este cache não está na whitelist, exclua-o
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 