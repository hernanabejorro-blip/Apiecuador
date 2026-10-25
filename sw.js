const CACHE_NAME = "apiecuador-v4";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon.svg", "./modulo-01.html", "./modulo-02.html", "./modulo-03.html", "./modulo-04.html", "./modulo-05.html", "./modulo-06.html", "./modulo-07.html", "./modulo-08.html", "./modulo-09.html", "./modulo-10.html", "./modulo-11.html", "./modulo-12.html", "./modulo-21.html", "./modulo-22.html", "./modulo-23.html", "./modulo-24.html", "./modulo-25.html", "./modulo-26.html", "./modulo-27.html", "./modulo-28.html", "./modulo-29.html", "./modulo-30.html", "./modulo-31.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
