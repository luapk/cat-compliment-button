# Temptations Cat Compliment Button

A 3D Temptations button. Tap it and your cat delivers one of 12 backhanded
compliments in a female robot voice, with optional subtitles in a speech
bubble. All 12 play before any line repeats. Available in English (default), Spanish,
Italian and French, picked from the flag in the nav bar. A "How it works"
sheet explains the button and how to treat your cat with Temptations.

It is a static site: plain HTML, CSS and JavaScript. No build step, no
framework, no server code, no database, no login, no cookies, and no personal
data collected. After the first visit it works offline.

## What's in the folder

```
index.html             the page
scene.js               the button in 3D (three.js): modelled shapes, studio lighting,
                       glossy coated plastic, soft shadows; camera follows the
                       view slider and the cap sinks on press
vendor/                three.js (MIT licence, see vendor/three-LICENSE.txt), served
                       from this site because the security policy allows only
                       this site's own scripts
styles.css             layout, bubble, nav, and a CSS drawing of the button that
                       shows only if a device cannot do 3D (WebGL)
app.js                 all copy in 4 languages (COPY), shuffle, press, audio,
                       subtitles switch, language menu, How it works sheet
sw.js                  offline cache (service worker)
manifest.webmanifest   lets people "Add to Home Screen" with an icon
vercel.json            security headers and caching for Vercel
assets/
  temptations-logo.png the logo on the button cap
  icon-*.png           home-screen and browser icons
audio/
  en/01.mp3 ... 12.mp3 one clip per line, in the same order as COPY.en.lines
  es/  it/  fr/        the same 12 lines in Spanish, Italian and French
fonts/
  fredoka-latin.woff2  the UI font, hosted here rather than on Google Fonts
  OFL.txt              its licence (SIL Open Font License)
```

## Password

The whole site sits behind a password screen, checked on Vercel's servers by
`middleware.js` (Vercel Routing Middleware) before any file is sent. Without
the password nobody gets the page, the code or the recordings; only the login
screen's own font, logo and stylesheet are public.

- The password is never stored as text, only as a hash. By default it is
  checked against `BUILT_IN_HASH` in `middleware.js` (the launch password).
- To change it, add a `SITE_PASSWORD` environment variable in Vercel
  (Settings > Environment Variables, Production and Preview) and redeploy. If
  set, it replaces the built-in one, and everyone has to enter the new one.
- A correct password sets a cookie that lasts 30 days on that device.
- Locally (`python3 -m http.server`) there is no middleware, so no password.

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

**English (`audio/en/`) is the recorded voice**, delivered 19/10/26 ("Jamie
Compliments"). Each file was renamed to the number of the line it says:

| File | Recording | Line |
| --- | --- | --- |
| 01 | Supermodels Wfh | I didn't know supermodels could work from home. |
| 02 | Katie | Katie's new man is shorter than you. |
| 03 | More Important | But more important is your charm. Intellect. Hairline. Biceps. |
| 04 | Dream About You | I always dream about you when I nap... |
| 05 | Daddy | Thanks for everything daddy. Is it weird if I call you daddy? |
| 06 | Ling Like A Snack | Dang, you're looking like a snack right now. |
| 07 | Glossy Hair | Your hair is full and glossy. Have you been licking it? |
| 08 | Cutie Patootie | Who's a cutie patootie? It is you. |
| 09 | Cool Guy | You are a real cool guy. |
| 10 | Nine Lives | I want to spend all nine of my lives with you. |
| 11 | Natural Head Shape | You have a very natural head shape. |
| 12 | Good Skin | Your skin's so good it's like you're aging in reverse... |

The subtitles were checked against the recordings with a speech-to-text pass
(Whisper small.en): lines 3 and 6 were rewritten to match what is said.

Spanish, Italian and French are still synthetic placeholders made with Kokoro, an
open-source speech model (Apache 2.0 licence): the voice Isabella (`bf_isabella`,
British) for English, and Dora, Sara and Siwis for Spanish, Italian and French,
all with a robot effect added in ffmpeg (echo, tremolo, high-pass). To use the
final recordings:

1. Supply 12 files per language named `01.mp3` to `12.mp3`, in `audio/en/`,
   `audio/es/`, `audio/it/` and `audio/fr/`. File `NN.mp3` is line NN of that
   language's `lines` in `app.js` (01 is "I didn't know supermodels could work
   from home." and its translations). The voice is female.
2. Suggested spec: MP3, mono, 44.1 or 48 kHz, 64 to 96 kbps, silence trimmed,
   loudness matched (around -16 LUFS) so no line is louder than the others.
3. Replace the files in `audio/`, keeping the names.
4. Bump `AUDIO_VERSION` in BOTH `app.js` and `sw.js` (2, 3, 4 ...) and the
   number in `CACHE = "cat-button-v5"` in `sw.js`. The new version gives every
   clip a new address, so no phone can keep playing an old recording it saved.
5. Commit and push. Vercel redeploys.

If a clip is missing or will not play, the button falls back to the device's
own text-to-speech voice reading the line, so it never goes silent.

## Changing the copy

Every word on screen lives in `COPY` at the top of `app.js`: one block per
language with the interface labels (`ui`), the How it works sheet (`guide`) and
the 12 `lines`. The order of `lines` matters: line 1 plays `audio/<lang>/01.mp3`,
and so on, and all four languages must keep the same number of lines. If you
add, remove or reorder lines, keep the audio files in step, update the English
clip list in `sw.js`, and bump `CACHE`.

The translations are first drafts. Have a native speaker in each market check
the jokes and the treat guidance before launch.

## Settings people can change

- **Subtitles** (nav bar) shows or hides the speech bubble. Screen readers get
  every line either way.
- **Language** (the flag in the nav bar; press it to choose). English is the default.
- **View angle** (Settings, the cog in the nav bar), a tilt from straight down (0) to
  level with the button, side on (90). It starts at 45.
  It moves the 3D camera; the CSS fallback drawing follows the same angle.
- All three are remembered on that device only (browser storage); nothing is sent.

## Behaviour notes for testing

- **Sound:** plays through an `<audio>` element started directly from the tap,
  which phones allow, and which still plays with an iPhone's silent switch on.
  The short press "thunk" uses Web Audio and may be muted by the silent switch.
- **Vibration:** a tiny buzz on Android. iPhone browsers do not let web pages
  vibrate, so iPhone gets the sound only.
- **Accessibility:** the button is a real `<button>` with a label, works with
  Space and Enter, the line is announced to screen readers (`aria-live`), and
  animations are switched off for people who ask for reduced motion.
- **Data:** nothing is sent anywhere. The only thing stored is the subtitles and
  language choice, in the browser on that device. If analytics are wanted, add them through the site's
  consent setup and add the analytics host to the CSP in `vercel.json`.

## Mars footer

Copied from the footer of temptationstreats.com (US): a slim line on the main
screen (copyright, Privacy, Legal, Accessibility), and the small print with the
full trademark notice at the bottom of How it works. It stays in English in
every language, because it is Mars's legal wording and the pages are English.

Linked now (addresses confirmed on mars.com): Privacy Statement
(mars.com/privacy), Legal (mars.com/legal), Accessibility
(mars.com/accessibility), Supply Chain Transparency
(mars.com/about/policies-and-practices/ca-supply-chain-transparency-act).

Still to add once Mars confirms the US addresses: Site Owner, Modern Slavery
Act, Cookie Notice, Your Privacy Choices, and the Follow Us social links.
Deliberately left out: Cookie Settings and Ad Choices (the site sets no
advertising or analytics cookies, only the essential password cookie),
COVID-19 Response, Careers, and the newsletter sign-up.

## Before going live

- Legal and brand sign-off on all 12 lines and on the logo use.
- Usage rights for the Adam&Eve recordings (app and web, markets, term).
- Real-device testing: iPhone Safari, Android Chrome, desktop browsers.
- Replace the logo with a high-resolution or SVG version if available; the
  current one is 281 x 151 pixels.
