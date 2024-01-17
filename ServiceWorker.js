const cacheName = "DefaultCompany-SuicaGame-1.0";
const contentToCache = [
    "Build/index.loader.js",
    "Build/ba54b8f000c10f641682113a025d3a22.js.unityweb",
    "Build/e777ccbb90dddade4503ec4d00450c2e.data.unityweb",
    "Build/861f4f77ff64bbda818e4761c6fefdba.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
