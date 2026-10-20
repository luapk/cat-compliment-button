/* Cat Compliment Button: tap, shuffle, speak. No server, no data collected. */
(() => {
  /* ---------- copy, one block per language ----------
     Line N of a language plays audio/<code>/NN.mp3 (01, 02, ...), so the order
     of `lines` must match the audio files, and all four lists must hold the
     same jokes in the same order. "{n}" in the copy becomes the number of lines. */
  const COPY = {
    en: {
      name: "English",
      speech: "en-GB",
      ui: {
        how: "How it works",
        subtitles: "Subtitles",
        hint: "Tap for a compliment",
        small: "Sound up.",
        press: "Press for a compliment from your cat",
        langs: "Language",
        close: "Close",
        view: "View angle",
        settings: "Settings",
        top: "Top"
      },
      guide: {
        title: "How it works",
        steps: [
          "Tap the button. Your cat tells you exactly what it thinks of you.",
          "There are {n} compliments. You’ll hear every one before any repeats.",
          "Turn Subtitles on to read along, or off to just listen.",
          "Change the view angle in Settings, the cog at the top.",
          "Pick your language with the flag at the top."
        ],
        note: "Best viewed on a tablet. Turn the sound up.",
        trainTitle: "How to train your cat",
        train: [
          "Lay the tablet flat on the floor where your cat likes to lounge, and let them have a good sniff.",
          "Tap the button yourself, then give a Temptations treat straight away, so the sound means treats.",
          "Put a treat on the button. When a paw or nose presses it, praise them and reward with another treat.",
          "Keep it short, a few minutes a day. Soon they’ll press it on their own to tell you how wonderful you are."
        ],
        treatTitle: "How to treat your cat with Temptations",
        treats: [
          "Shake the pack. Your cat will come running.",
          "Use a treat as a reward: after play, a brush or a trip to the vet.",
          "Make them work for it: toss one to chase, or hide a few for a treasure hunt.",
          "Keep treats a treat. Follow the feeding guide on the pack, adjust main meals to match, and always leave fresh water out."
        ]
      },
      lines: [
        "I didn't know supermodels could work from home.",
        "Katie's new man is shorter than you.",
        "But more important is your charm. Intellect. Hairline. Biceps.",
        "I always dream about you when I nap… and I nap a lot, so that's a really good compliment.",
        "Thanks for everything daddy. Is it weird if I call you daddy?",
        "Dang, you're looking like a snack right now.",
        "Your hair is full and glossy. Have you been licking it?",
        "Who's a cutie patootie? It is you.",
        "You are a real cool guy.",
        "I want to spend all nine of my lives with you.",
        "You have a very natural head shape.",
        "Your skin's so good it's like you're aging in reverse. Stop, you'll be a little baby soon!"
      ],
      spoken: {} // spoken wording where it differs from the subtitle (none at present)
    },
    es: {
      name: "Español",
      speech: "es-ES",
      ui: {
        how: "Cómo funciona",
        subtitles: "Subtítulos",
        hint: "Toca para recibir un cumplido",
        small: "Sube el volumen.",
        press: "Pulsa para recibir un cumplido de tu gato",
        langs: "Idioma",
        close: "Cerrar",
        view: "Ángulo de vista",
        settings: "Ajustes",
        top: "Arriba"
      },
      guide: {
        title: "Cómo funciona",
        steps: [
          "Toca el botón. Tu gato te dirá exactamente lo que piensa de ti.",
          "Hay {n} cumplidos. Los oirás todos antes de que se repita ninguno.",
          "Activa los subtítulos para leerlos, o desactívalos para solo escuchar.",
          "Cambia el ángulo de vista en Ajustes, el engranaje de arriba.",
          "Elige el idioma con la bandera de arriba."
        ],
        note: "Se ve mejor en una tableta. Sube el volumen.",
        trainTitle: "Cómo entrenar a tu gato",
        train: [
          "Deja la tableta en el suelo, donde a tu gato le gusta descansar, y deja que la olfatee bien.",
          "Pulsa tú el botón y dale enseguida un premio Temptations, para que el sonido signifique premio.",
          "Pon un premio sobre el botón. Cuando lo pulse con la pata o el hocico, felicítalo y dale otro premio.",
          "Sesiones cortas, unos minutos al día. Pronto lo pulsará por su cuenta para dedicarte sus cumplidos."
        ],
        treatTitle: "Cómo premiar a tu gato con Temptations",
        treats: [
          "Agita el paquete. Tu gato vendrá corriendo.",
          "Usa un premio como recompensa: después de jugar, de cepillarlo o de ir al veterinario.",
          "Haz que se lo gane: lánzale uno para que lo persiga, o esconde unos cuantos para una búsqueda del tesoro.",
          "Que los premios sigan siendo un premio. Sigue la guía de alimentación del paquete, ajusta sus comidas principales y déjale siempre agua fresca."
        ]
      },
      lines: [
        "No sabía que las supermodelos podían teletrabajar.",
        "El nuevo novio de Katie es más bajito que tú.",
        "Pero lo más importante: tu encanto. Tu intelecto. Tu pelo. Tus bíceps.",
        "Siempre sueño contigo cuando duermo la siesta… y duermo muchas siestas, así que es un cumplido enorme.",
        "Gracias por todo, papi. ¿Es raro que te llame papi?",
        "Vaya, estás para comerte ahora mismo.",
        "Tienes el pelo abundante y brillante. ¿Te lo has estado lamiendo?",
        "¿Quién es la cosa más bonita? Eres tú.",
        "Eres un tío muy guay.",
        "Quiero pasar mis siete vidas contigo.",
        "Tienes una forma de cabeza muy natural.",
        "Tu piel está tan bien que parece que rejuveneces. ¡Para, que pronto serás un bebé!"
      ],
      spoken: {} // spoken wording where it differs from the subtitle (none at present)
    },
    it: {
      name: "Italiano",
      speech: "it-IT",
      ui: {
        how: "Come funziona",
        subtitles: "Sottotitoli",
        hint: "Tocca per un complimento",
        small: "Alza il volume.",
        press: "Premi per un complimento dal tuo gatto",
        langs: "Lingua",
        close: "Chiudi",
        view: "Angolo di vista",
        settings: "Impostazioni",
        top: "Dall’alto"
      },
      guide: {
        title: "Come funziona",
        steps: [
          "Tocca il pulsante. Il tuo gatto ti dirà esattamente cosa pensa di te.",
          "Ci sono {n} complimenti. Li sentirai tutti prima che uno si ripeta.",
          "Attiva i sottotitoli per leggere, o disattivali per ascoltare e basta.",
          "Cambia l’angolo di vista in Impostazioni, l’ingranaggio in alto.",
          "Scegli la lingua con la bandierina in alto."
        ],
        note: "Ideale su tablet. Alza il volume.",
        trainTitle: "Come addestrare il tuo gatto",
        train: [
          "Appoggia il tablet sul pavimento dove il tuo gatto ama riposare e lascia che lo annusi per bene.",
          "Tocca tu il pulsante e dagli subito un premio Temptations, così il suono vorrà dire premio.",
          "Metti un premio sul pulsante. Quando lo preme con la zampa o il naso, lodalo e dagli un altro premio.",
          "Sessioni brevi, pochi minuti al giorno. Presto lo premerà da solo per farti i suoi complimenti."
        ],
        treatTitle: "Come premiare il tuo gatto con Temptations",
        treats: [
          "Scuoti la confezione. Il tuo gatto arriverà di corsa.",
          "Usa un premio come ricompensa: dopo il gioco, la spazzolata o la visita dal veterinario.",
          "Fagliela guadagnare: lanciane uno da rincorrere, o nascondine qualcuno per una caccia al tesoro.",
          "Un premio deve restare un premio. Segui le indicazioni sulla confezione, adatta i pasti principali e lascia sempre acqua fresca."
        ]
      },
      lines: [
        "Non sapevo che le top model potessero lavorare da casa.",
        "Il nuovo ragazzo di Katie è più basso di te.",
        "Ma la cosa più importante è il tuo fascino. Intelletto. Chioma. Bicipiti.",
        "Ti sogno sempre quando faccio il pisolino… e faccio un sacco di pisolini, quindi è un gran complimento.",
        "Grazie di tutto, papi. È strano se ti chiamo papi?",
        "Accidenti, sei proprio un bocconcino in questo momento.",
        "Hai i capelli folti e lucidi. Te li sei leccati?",
        "Chi è il più carino del mondo? Sei tu.",
        "Sei un tipo davvero figo.",
        "Voglio passare tutte e sette le mie vite con te.",
        "Hai una forma della testa molto naturale.",
        "Hai una pelle così bella che sembri ringiovanire. Basta, tra poco sarai un neonato!"
      ],
      spoken: {} // spoken wording where it differs from the subtitle (none at present)
    },
    fr: {
      name: "Français",
      speech: "fr-FR",
      ui: {
        how: "Comment ça marche",
        subtitles: "Sous-titres",
        hint: "Touche pour un compliment",
        small: "Monte le son.",
        press: "Appuie pour un compliment de ton chat",
        langs: "Langue",
        close: "Fermer",
        view: "Angle de vue",
        settings: "Réglages",
        top: "Dessus"
      },
      guide: {
        title: "Comment ça marche",
        steps: [
          "Touche le bouton. Ton chat te dit exactement ce qu’il pense de toi.",
          "Il y a {n} compliments. Tu les entendras tous avant qu’un seul se répète.",
          "Active les sous-titres pour lire, ou coupe-les pour simplement écouter.",
          "Change l’angle de vue dans Réglages, la roue dentée en haut.",
          "Choisis ta langue avec le drapeau en haut."
        ],
        note: "Idéal sur tablette. Monte le son.",
        trainTitle: "Comment dresser ton chat",
        train: [
          "Pose la tablette à plat par terre, là où ton chat aime se prélasser, et laisse-le bien la renifler.",
          "Touche toi-même le bouton, puis donne-lui tout de suite une friandise Temptations\u00a0: le son voudra dire friandise.",
          "Pose une friandise sur le bouton. Quand il appuie avec la patte ou le museau, félicite-le et donne-lui une autre friandise.",
          "Des séances courtes, quelques minutes par jour. Bientôt, il appuiera tout seul pour te faire ses compliments."
        ],
        treatTitle: "Comment récompenser ton chat avec Temptations",
        treats: [
          "Secoue le sachet. Ton chat arrivera en courant.",
          "Offre une friandise en récompense : après le jeu, le brossage ou une visite chez le vétérinaire.",
          "Fais-la-lui mériter : lance-en une à attraper, ou caches-en quelques-unes pour une chasse au trésor.",
          "Une friandise doit rester une friandise. Suis le guide d’alimentation sur le sachet, adapte ses repas principaux et laisse toujours de l’eau fraîche."
        ]
      },
      lines: [
        "Je ne savais pas que les top-modèles pouvaient télétravailler.",
        "Le nouveau copain de Katie est plus petit que toi.",
        "Mais le plus important, c'est ton charme. Ton intellect. Tes cheveux. Tes biceps.",
        "Je rêve toujours de toi pendant mes siestes… et je fais beaucoup de siestes, alors c'est un sacré compliment.",
        "Merci pour tout, daddy. C'est bizarre si je t'appelle daddy\u00a0?",
        "Waouh, tu es à croquer en ce moment.",
        "Tes cheveux sont épais et brillants. Tu les as léchés\u00a0?",
        "Qui c'est le plus mignon\u00a0? C'est toi.",
        "T'es vraiment un mec cool.",
        "Je veux passer mes neuf vies avec toi.",
        "Tu as une forme de tête très naturelle.",
        "Ta peau est si belle qu'on dirait que tu rajeunis. Arrête, tu vas bientôt redevenir un bébé\u00a0!"
      ],
      spoken: {} // spoken wording where it differs from the subtitle (none at present)
    }
  };
  const LANGS = Object.keys(COPY);
  const COUNT = COPY.en.lines.length;

  const $ = id => document.getElementById(id);

  // scene.js swaps in the 3D button once it is drawn. If it has not managed
  // that in a few seconds (blocked, very slow, or no module support), show the
  // CSS drawing instead of an empty space; a late 3D button still takes over.
  setTimeout(() => document.documentElement.classList.remove("gl-wait"), 4000);
  const stage = $("stage"), fit = $("fit"), press = $("press");
  const bubbleWrap = $("bubbleWrap"), bubble = $("bubble"), lineEl = $("line"), live = $("live");
  const ccBtn = $("cc"), howBtn = $("howBtn"), how = $("how");
  const langBtn = $("langBtn"), langMenu = $("langMenu");
  const langOpts = [...document.querySelectorAll(".lang-opt")];

  /* ---------- remembered settings (per device; fine if storage is blocked) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };
  let lang = LANGS.includes(store.get("catbutton.lang")) ? store.get("catbutton.lang") : "en";
  let subs = store.get("catbutton.subs") !== "off";

  /* ---------- fit the 440x340 stage to the screen ----------
     The button takes whatever height is left once the nav, the subtitle space,
     the hint and the footer are measured, so short laptop screens and tall
     tablets both get the largest button that fits. */
  const hintEl = document.querySelector(".hint");
  function resize() {
    const w = window.innerWidth - 32;
    const used = 76 /* nav */ + 52 /* footer */ + bubbleWrap.offsetHeight + hintEl.offsetHeight + 20 /* gaps */;
    const h = window.innerHeight - used;
    const k = Math.max(0.5, Math.min(2.2, w / 440, h / 340));
    stage.style.transform = `scale(${k})`;
    fit.style.width = `${440 * k}px`;
    fit.style.height = `${340 * k}px`;
  }
  window.addEventListener("resize", resize);
  resize();

  /* ---------- viewing angle: the slider is the tilt away from straight down,
     0 (looking down on the button) to 90 (level with it, side on) ---------- */
  const viewInput = $("view");
  const angle = () => 90 - Number(viewInput.value);
  const viewText = () => (viewInput.value === "0" ? COPY[lang].ui.top : `${viewInput.value}°`);
  function setView(fromSlider) {
    const rad = angle() * Math.PI / 180;
    stage.style.setProperty("--s", Math.sin(rad).toFixed(4));
    stage.style.setProperty("--c", Math.cos(rad).toFixed(4));
    viewInput.setAttribute("aria-valuetext", viewText());
    if (fromSlider) store.set("catbutton.view", viewInput.value);
  }
  {
    const saved = Number(store.get("catbutton.view"));
    if (store.get("catbutton.view") !== null && saved >= 0 && saved <= 90) viewInput.value = String(saved);
  }
  viewInput.addEventListener("input", () => setView(true));
  setView(false);

  /* ---------- shuffle bag: every line once before any repeats ---------- */
  let bag = [], last = -1;
  function nextIndex() {
    if (!bag.length) {
      bag = [...Array(COUNT).keys()];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag[0] === last) bag.push(bag.shift());
    }
    last = bag.shift();
    return last;
  }

  /* ---------- sound: a thunk on press ---------- */
  let ac = null;
  function audio() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = new AC();
    }
    if (ac.state === "suspended") ac.resume();
    return ac;
  }
  function thunk() {
    const a = audio(); if (!a) return;
    const t = a.currentTime;
    const o = a.createOscillator(), g = a.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(170, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    o.connect(g).connect(a.destination);
    o.start(t); o.stop(t + 0.18);
  }

  /* ---------- fallback voice: the device's own, only if a clip will not play ---------- */
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  // The cat is female: prefer a female voice in the chosen language.
  const FEMALE = /samantha|karen|moira|tessa|serena|kate|victoria|fiona|susan|hazel|zira|libby|sonia|female|m[oó]nica|paulina|marisol|helena|laura|elvira|alice|federica|elsa|isabella|am[eé]lie|audrey|marie|julie|hortense|denise/i;
  let voice = null;
  function pickVoice() {
    voice = null;
    if (!synth) return;
    const code = COPY[lang].speech.toLowerCase();
    const vs = synth.getVoices().filter(v => v.lang.replace("_", "-").toLowerCase().startsWith(code.slice(0, 2)));
    if (!vs.length) return;
    const exact = vs.filter(v => v.lang.replace("_", "-").toLowerCase() === code);
    voice = exact.find(v => FEMALE.test(v.name)) || vs.find(v => FEMALE.test(v.name)) || exact[0] || vs[0];
  }
  if (synth) {
    pickVoice();
    synth.addEventListener?.("voiceschanged", pickVoice);
  }
  function speakFallback(i) {
    if (!synth) return;
    synth.cancel();
    const c = COPY[lang];
    const u = new SpeechSynthesisUtterance(c.spoken[i] || c.lines[i]);
    if (voice) u.voice = voice;
    u.lang = COPY[lang].speech;
    // Flat and a touch slow reads as robotic without dropping into a male register.
    u.pitch = 1.1;
    u.rate = 0.9;
    synth.speak(u);
  }

  /* ---------- the recorded voice ---------- */
  // Bump AUDIO_VERSION (here and in sw.js) whenever the clips change: the new
  // address makes every browser fetch the new recording instead of a saved one.
  const AUDIO_VERSION = "5";
  const clipUrl = i => `audio/${lang}/${String(i + 1).padStart(2, "0")}.mp3?v=${AUDIO_VERSION}`;
  // One element, played straight from the tap so phones allow it. An <audio>
  // element also plays with an iPhone on silent, which Web Audio does not.
  const player = new Audio();
  player.preload = "auto";
  function speak(i) {
    synth?.cancel();
    player.pause();
    player.src = clipUrl(i);
    player.currentTime = 0;
    const p = player.play();
    // A missing or blocked clip falls back to the device's own voice.
    if (p && p.catch) p.catch(() => speakFallback(i));
  }
  function hush() {
    player.pause();
    synth?.cancel();
  }

  /* ---------- the speech bubble (subtitles) ---------- */
  let typer = null;
  const escape = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function clearBubble() {
    clearInterval(typer);
    lineEl.textContent = "";
    bubble.classList.add("idle");
  }
  // Subtitles: each new sentence starts on its own line. Only where the next
  // word opens a sentence (capital, or Spanish ¿ ¡), so "I nap... and I nap"
  // stays together.
  const sentenceLines = t => t.replace(/([.?!…])\s+(?=[A-ZÀ-ÖØ-Þ¿¡"“‘'])/g, "$1\n");
  function show(text) {
    // Screen readers always get the line, subtitles on or off.
    live.textContent = text;
    clearInterval(typer);
    if (!subs) return;
    bubble.classList.remove("idle", "pop");
    void bubble.offsetWidth;
    bubble.classList.add("pop");
    text = sentenceLines(text);
    let i = 0;
    lineEl.textContent = "";
    const caret = '<span class="caret">|</span>';
    typer = setInterval(() => {
      i++;
      lineEl.innerHTML = escape(text.slice(0, i)) + (i < text.length ? caret : "");
      if (i >= text.length) clearInterval(typer);
    }, 34);
  }
  function setSubs(on) {
    subs = on;
    ccBtn.setAttribute("aria-checked", String(on));
    bubbleWrap.classList.toggle("off", !on);
    if (!on) clearBubble();
    store.set("catbutton.subs", on ? "on" : "off");
  }

  /* ---------- language ---------- */
  function fillList(el, items) {
    el.textContent = "";
    items.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      el.appendChild(li);
    });
  }
  function setLang(code) {
    lang = code;
    const c = COPY[code];
    document.documentElement.lang = code;
    $("howLabel").textContent = c.ui.how;
    $("ccLabel").textContent = c.ui.subtitles;
    ccBtn.setAttribute("aria-label", c.ui.subtitles);
    $("hintMain").textContent = c.ui.hint;
    $("hintSmall").textContent = c.ui.small;
    press.setAttribute("aria-label", c.ui.press);
    langMenu.setAttribute("aria-label", c.ui.langs);
    langBtn.setAttribute("aria-label", `${c.ui.langs}: ${c.name}`);
    langOpts.forEach(o => o.setAttribute("aria-checked", String(o.dataset.lang === code)));
    // The bar shows only the chosen flag.
    const chosen = langOpts.find(o => o.dataset.lang === code);
    $("langFlag").replaceChildren(chosen.querySelector("svg").cloneNode(true));
    $("howTitle").textContent = c.guide.title;
    fillList($("howSteps"), c.guide.steps.map(t => t.replace("{n}", COUNT)));
    $("howNote").textContent = c.guide.note;
    $("trainTitle").textContent = c.guide.trainTitle;
    fillList($("trainSteps"), c.guide.train);
    $("treatTitle").textContent = c.guide.treatTitle;
    fillList($("treatList"), c.guide.treats);
    $("howClose").setAttribute("aria-label", c.ui.close);
    $("viewTop").textContent = c.ui.top;
    $("viewLabel").textContent = c.ui.view;
    $("setTitle").textContent = c.ui.settings;
    setBtn.setAttribute("aria-label", c.ui.settings);
    setBtn.title = c.ui.settings;
    viewInput.setAttribute("aria-valuetext", viewText());
    hush();
    clearBubble();
    pickVoice();
    store.set("catbutton.lang", code);
  }

  /* ---------- settings panel: the cog opens it ---------- */
  const setBtn = $("setBtn"), setPanel = $("setPanel");
  const settingsOpen = () => !setPanel.hidden;
  function openSettings() {
    closeMenu(false);
    setPanel.hidden = false;
    setBtn.setAttribute("aria-expanded", "true");
    viewInput.focus();
  }
  function closeSettings(returnFocus) {
    if (!settingsOpen()) return;
    setPanel.hidden = true;
    setBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) setBtn.focus();
  }
  setBtn.addEventListener("click", () => (settingsOpen() ? closeSettings(true) : openSettings()));
  setPanel.addEventListener("keydown", e => {
    if (e.key === "Escape") { e.preventDefault(); closeSettings(true); }
  });
  document.addEventListener("pointerdown", e => {
    if (settingsOpen() && !e.target.closest(".settings")) closeSettings(false);
  });

  /* ---------- language menu: the flag in the bar opens the four choices ---------- */
  const menuOpen = () => !langMenu.hidden;
  function openMenu() {
    closeSettings(false);
    langMenu.hidden = false;
    langBtn.setAttribute("aria-expanded", "true");
    (langOpts.find(o => o.dataset.lang === lang) || langOpts[0]).focus();
  }
  function closeMenu(returnFocus) {
    if (!menuOpen()) return;
    langMenu.hidden = true;
    langBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) langBtn.focus();
  }
  langBtn.addEventListener("click", () => (menuOpen() ? closeMenu(true) : openMenu()));
  langOpts.forEach(o => o.addEventListener("click", () => {
    setLang(o.dataset.lang);
    closeMenu(true);
  }));
  langMenu.addEventListener("keydown", e => {
    const i = langOpts.indexOf(document.activeElement);
    const go = n => { e.preventDefault(); langOpts[(n + langOpts.length) % langOpts.length].focus(); };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(langOpts.length - 1);
    else if (e.key === "Escape") { e.preventDefault(); closeMenu(true); }
    else if (e.key === "Tab") closeMenu(false);
  });
  // A tap anywhere else closes it.
  document.addEventListener("pointerdown", e => {
    if (menuOpen() && !e.target.closest(".lang")) closeMenu(false);
  });
  ccBtn.addEventListener("click", () => setSubs(ccBtn.getAttribute("aria-checked") !== "true"));

  /* ---------- How it works ---------- */
  function openHow() {
    closeMenu(false);
    closeSettings(false);
    hush();
    if (how.showModal) how.showModal(); else how.setAttribute("open", "");
  }
  function closeHow() {
    if (how.close) how.close(); else how.removeAttribute("open");
  }
  howBtn.addEventListener("click", openHow);
  $("howClose").addEventListener("click", closeHow);
  // A tap on the dimmed backdrop closes it too.
  how.addEventListener("click", e => { if (e.target === how) closeHow(); });

  /* ---------- press mechanics ---------- */
  let downAt = 0;
  function down() {
    if (stage.classList.contains("is-down")) return;
    downAt = performance.now();
    stage.classList.add("is-down");
    thunk();
    navigator.vibrate?.(12);
  }
  function up() {
    if (!stage.classList.contains("is-down")) return;
    const wait = Math.max(0, 110 - (performance.now() - downAt));
    setTimeout(() => stage.classList.remove("is-down"), wait);
  }
  function fire() {
    const i = nextIndex();
    show(COPY[lang].lines[i]);
    speak(i);
  }

  // While a menu or the settings panel is open, a tap on the button only closes it.
  let swallow = false;
  press.addEventListener("pointerdown", e => {
    if (menuOpen() || settingsOpen()) { swallow = true; return; }
    if (e.button === 0) down();
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => press.addEventListener(ev, up));
  press.addEventListener("keydown", e => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) down();
  });
  press.addEventListener("keyup", e => { if (e.key === " " || e.key === "Enter") up(); });
  press.addEventListener("click", () => {
    if (swallow) { swallow = false; return; }
    // Clicks without a pointer press (keyboard, assistive tech) still get the full squash.
    if (!stage.classList.contains("is-down") && performance.now() - downAt > 400) { down(); up(); }
    fire();
  });
  press.addEventListener("contextmenu", e => e.preventDefault());

  setLang(lang);
  setSubs(subs);

  /* ---------- offline: cache the page and its files after the first visit ---------- */
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    // When an update takes over from an older version, reload once so the new
    // lines and voice show straight away rather than on the next visit.
    if (navigator.serviceWorker.controller) {
      let reloaded = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloaded) return;
        reloaded = true;
        location.reload();
      });
    }
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
