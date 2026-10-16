/* Caches everything the button needs, so it works offline after the first visit.
   English audio is cached up front; Spanish, Italian and French clips are cached
   the first time each one plays.
   Bump CACHE whenever any file changes (new recordings, new lines, new logo),
   or returning visitors keep the old copies. */
const CACHE = "cat-button-v4";

const FILES = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "fonts/fredoka-latin.woff2",
  "assets/temptations-logo.png",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "audio/en/01.mp3",
  "audio/en/02.mp3",
  "audio/en/03.mp3",
  "audio/en/04.mp3",
  "audio/en/05.mp3",
  "audio/en/06.mp3",
  "audio/en/07.mp3",
  "audio/en/08.mp3",
  "audio/en/09.mp3",
  "audio/en/10.mp3",
  "audio/en/11.mp3",
  "audio/en/12.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first, then network; whole (200) responses are kept for next time.
// Same-origin GETs only.
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.status === 200 && !req.headers.has("range")) {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(req, copy));
      }
      return res;
    }))
  );
});
