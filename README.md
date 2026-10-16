# Temptations Cat Compliment Button

A 3D Temptations button. Tap it and your cat delivers one of 30 backhanded
compliments in a robot voice, typed out in a speech bubble at the same time.
All 30 play before any line repeats.

It is a static site: plain HTML, CSS and JavaScript. No build step, no
framework, no server code, no database, no login, no cookies, and no personal
data collected. After the first visit it works offline.

## What's in the folder

```
index.html             the page
styles.css             the 3D button, bubble and layout (pure CSS, no images)
app.js                 the 30 lines, shuffle, press animation, audio playback
sw.js                  offline cache (service worker)
manifest.webmanifest   lets people "Add to Home Screen" with an icon
vercel.json            security headers and caching for Vercel
assets/
  temptations-logo.png the logo on the button cap
  icon-*.png           home-screen and browser icons
audio/
  01.mp3 ... 30.mp3    one clip per line, in the same order as LINES in app.js
fonts/
  fredoka-latin.woff2  the UI font, hosted here rather than on Google Fonts
  OFL.txt              its licence (SIL Open Font License)
```

## Run it locally

Any static file server works. From this folder:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000. Opening `index.html` straight from disk also
works, except for offline caching, which needs http.

## Put it on GitHub

1. Create a new **private** repository on GitHub (the logo is a Mars trademark).
2. Upload the contents of this folder to it, either by dragging the files into
   GitHub's "Add file > Upload files" page, or from a terminal:

   ```bash
   git init
   git add .
   git commit -m "Cat Compliment Button"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

## Deploy on Vercel

1. In Vercel, **Add New > Project** and import the GitHub repository.
2. Framework preset: **Other**. Leave Build Command and Output Directory empty
   (the root folder is the site).
3. Deploy. Every push to `main` redeploys automatically.

To serve it on the Temptations domain, add the domain under the project's
**Settings > Domains**, or have the main site link or proxy to the Vercel URL.

`vercel.json` sets a strict Content Security Policy (only this site's own files
may load), `nosniff`, a referrer policy and a permissions policy that turns off
camera, microphone and location. `frame-ancestors 'self'` stops other sites
framing the page; if the Temptations site needs to embed it in an iframe, add
that domain there.

## Swapping in the Adam&Eve recordings

The clips in `audio/` are synthetic placeholders made with eSpeak NG. To use the
final recordings:

1. Supply 30 files named `01.mp3` to `30.mp3`. File `NN.mp3` is line NN of
   `LINES` in `app.js` (01 is "Katie's new man is shorter than you.").
2. Suggested spec: MP3, mono, 44.1 or 48 kHz, 64 to 96 kbps, silence trimmed,
   loudness matched (around -16 LUFS) so no line is louder than the others.
3. Replace the files in `audio/`, keeping the names.
4. In `sw.js`, change `CACHE = "cat-button-v1"` to `v2` (and so on each time),
   so returning visitors get the new files instead of their cached copies.
5. Commit and push. Vercel redeploys.

If a clip is missing or will not play, the button falls back to the device's
own text-to-speech voice reading the line, so it never goes silent.

## Changing the lines

The lines are the `LINES` list at the top of `app.js`. The order matters: line
1 plays `audio/01.mp3`, and so on. If you add, remove or reorder lines, keep the
audio files in step, update the list of clips in `sw.js`, and bump `CACHE`.
The "x of 30 heard" counter uses the length of the list automatically.

## Behaviour notes for testing

- **Sound:** plays through an `<audio>` element started directly from the tap,
  which phones allow, and which still plays with an iPhone's silent switch on.
  The short press "thunk" uses Web Audio and may be muted by the silent switch.
- **Vibration:** a tiny buzz on Android. iPhone browsers do not let web pages
  vibrate, so iPhone gets the sound only.
- **Accessibility:** the button is a real `<button>` with a label, works with
  Space and Enter, the line is announced to screen readers (`aria-live`), and
  animations are switched off for people who ask for reduced motion.
- **Data:** nothing is stored or sent. The heard counter lives in memory and
  resets on reload. If analytics are wanted, add them through the site's
  consent setup and add the analytics host to the CSP in `vercel.json`.

## Before going live

- Legal and brand sign-off on all 30 lines and on the logo use.
- Usage rights for the Adam&Eve recordings (app and web, markets, term).
- Real-device testing: iPhone Safari, Android Chrome, desktop browsers.
- Replace the logo with a high-resolution or SVG version if available; the
  current one is 281 x 151 pixels.
