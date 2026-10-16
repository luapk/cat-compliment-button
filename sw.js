/* Caches everything the button needs, so it works offline after the first visit.
   Bump CACHE whenever any file changes (new recordings, new lines, new logo),
   or returning visitors keep the old copies. */
const CACHE = "cat-button-v1";

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
  "audio/01.mp3",
  "audio/02.mp3",
  "audio/03.mp3",
  "audio/04.mp3",
  "audio/05.mp3",
  "audio/06.mp3",
  "audio/07.mp3",
  "audio/08.mp3",
  "audio/09.mp3",
  "audio/10.mp3",
  "audio/11.mp3",
  "audio/12.mp3",
  "audio/13.mp3",
  "audio/14.mp3",
  "audio/15.mp3",
  "audio/16.mp3",
  "audio/17.mp3",
  "audio/18.mp3",
  "audio/19.mp3",
  "audio/20.mp3",
  "audio/21.mp3",
  "audio/22.mp3",
  "audio/23.mp3",
  "audio/24.mp3",
  "audio/25.mp3",
  "audio/26.mp3",
  "audio/27.mp3",
  "audio/28.mp3",
  "audio/29.mp3",
  "audio/30.mp3"
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

// Cache first, network as fallback. Same-origin GETs only.
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
