const CACHE_NAME = "apiecuador-v9";

// Archivos principales para abrir ApiEcuador y sus módulos recientes sin conexión.
// Las fotografías externas y los enlaces oficiales siguen necesitando Internet.
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./documentos-trashumancia.html",
  "./floraciones-ecuador.html",
  "./modulo-01.html",
  "./modulo-02.html",
  "./modulo-03.html",
  "./modulo-04.html",
  "./modulo-05.html",
  "./modulo-06.html",
  "./modulo-07.html",
  "./modulo-08.html",
  "./modulo-09.html",
  "./modulo-10.html",
  "./modulo-11.html",
  "./modulo-12.html",
  "./modulo-13.html",
  "./modulo-14.html",
  "./modulo-15.html",
  "./modulo-16.html",
  "./modulo-17.html",
  "./modulo-18.html",
  "./modulo-19.html",
  "./modulo-20.html",
  "./modulo-21.html",
  "./modulo-22.html",
  "./modulo-23.html",
  "./modulo-24.html",
  "./modulo-25.html",
  "./modulo-26.html",
  "./modulo-27.html",
  "./modulo-28.html",
  "./modulo-29.html",
  "./modulo-30.html",
  "./modulo-31.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key.startsWith("apiecuador-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  // Primero intenta la versión más reciente; si no hay conexión, usa la copia local.
  event.respondWith(
    fetch(request).then((response) => {
      if (response && response.ok && new URL(request.url).origin === self.location.origin) {
        const copy = response.clone();
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        );
      }
      return response;
    }).catch(() => caches.match(request).then((cached) => {
      if (cached) return cached;
      if (request.mode === "navigate") return caches.match("./index.html");
      return Response.error();
    }))
  );
});
