/* Offline support.
   - The page, code and styles are fetched fresh whenever there is a connection
     (network first), so an update shows up on the next visit. The cached copy
     is only used offline.
   - Audio, fonts and images are served from the cache (cache first). Clips
     carry ?v=AUDIO_VERSION in their address, so new recordings get new
     addresses and are never confused with old ones.
   Bump CACHE on every release, and AUDIO_VERSION (here and in app.js) whenever
   the clips change. */
const CACHE = "cat-button-v16";
const AUDIO_VERSION = "5";

const SHELL = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "scene.js",
  "vendor/three.module.min.js",
  "manifest.webmanifest",
  "fonts/fredoka-latin.woff2",
  "assets/temptations-logo.png",
  "assets/icon-192.png",
  "assets/icon-512.png"
];
// English clips up front; other languages are cached the first time they play.
const CLIPS = [
  "audio/en/01.mp3?v=" + AUDIO_VERSION,
  "audio/en/02.mp3?v=" + AUDIO_VERSION,
  "audio/en/03.mp3?v=" + AUDIO_VERSION,
  "audio/en/04.mp3?v=" + AUDIO_VERSION,
  "audio/en/05.mp3?v=" + AUDIO_VERSION,
  "audio/en/06.mp3?v=" + AUDIO_VERSION,
  "audio/en/07.mp3?v=" + AUDIO_VERSION,
  "audio/en/08.mp3?v=" + AUDIO_VERSION,
  "audio/en/09.mp3?v=" + AUDIO_VERSION,
  "audio/en/10.mp3?v=" + AUDIO_VERSION,
  "audio/en/11.mp3?v=" + AUDIO_VERSION,
  "audio/en/12.mp3?v=" + AUDIO_VERSION
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => Promise.all([...SHELL, ...CLIPS].map(url =>
      // "reload" skips the browser's own HTTP cache, so nothing stale is copied in.
      fetch(new Request(url, { cache: "reload" })).then(res => {
        if (!res.ok) throw new Error(url + " " + res.status);
        return cache.put(url, res);
      })
    ))).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const old = (await caches.keys()).filter(k => k !== CACHE);
    await Promise.all(old.map(k => caches.delete(k)));
    await self.clients.claim();
    // Replacing an older version: reload open pages so they drop the old
    // lines and voice now. (A page from an older release has no code of its
    // own to do this.) A first-ever visit has no old cache and is left alone.
    if (old.length) {
      const pages = await self.clients.matchAll({ type: "window" });
      pages.forEach(page => page.navigate(page.url).catch(() => {}));
    }
  })());
});

// Safari asks for audio in byte ranges and will not play a whole-file answer
// from a service worker, so a cached clip is sliced to the range it asked for.
async function ranged(req, res) {
  const range = req.headers.get("range");
  if (!range) return res;
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  let start = m && m[1] ? Number(m[1]) : 0;
  let end = m && m[2] ? Number(m[2]) : size - 1;
  if (m && !m[1] && m[2]) { start = Math.max(0, size - Number(m[2])); end = size - 1; }
  end = Math.min(end, size - 1);
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes"
    }
  });
}

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  const isStatic = /\/(audio|fonts|assets)\//.test(url.pathname);
  if (isStatic) {
    event.respondWith(caches.match(req.url).then(hit => {
      if (hit) return ranged(req, hit);
      return fetch(req).then(res => {
        if (res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req.url, copy));
        }
        return res;
      });
    }));
    return;
  }

  // Page, code, styles: network first, cache when offline.
  event.respondWith(
    fetch(req).then(res => {
      if (res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then(hit => hit || (req.mode === "navigate" ? caches.match("./") : undefined)))
  );
});
