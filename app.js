/* Cat Compliment Button: tap, shuffle, speak. No server, no data collected. */
(() => {
  /* ---------- copy, one block per language ----------
     Line N of a language plays audio/<code>/NN.mp3 (01 to 30), so the order of
     `lines` must match the audio files. All four lists hold the same 30 jokes. */
  const COPY = {
    en: {
      name: "English",
      speech: "en-GB",
      ui: {
        how: "How it works",
        subtitles: "Subtitles",
        hint: "Tap for a compliment*",
        small: "*compliment not guaranteed. Sound up.",
        press: "Press for a compliment from your cat",
        langs: "Language",
        close: "Close"
      },
      guide: {
        title: "How it works",
        steps: [
          "Tap the button. Your cat tells you exactly what it thinks of you.",
          "There are 30 compliments. You’ll hear every one before any repeats.",
          "Turn Subtitles on to read along, or off to just listen.",
          "Pick your language with the flag at the top."
        ],
        note: "Best viewed on iPad. Turn the sound up.",
        treatTitle: "How to treat your cat with Temptations",
        treats: [
          "Shake the pack. Your cat will come running.",
          "Use a treat as a reward: after play, a brush or a trip to the vet.",
          "Make them work for it: toss one to chase, or hide a few for a treasure hunt.",
          "Keep treats a treat. Follow the feeding guide on the pack, adjust main meals to match, and always leave fresh water out."
        ]
      },
      lines: [
        "Katie's new man is shorter than you.",
        "Who's a cutie patootie? You are! Mostly.",
        "You're my favourite human. You're also the only one who can open the treat bag.",
        "Your singing is almost as good as the hoover.",
        "You smell amazing. Like tuna. Did you eat my tuna?",
        "Your lap is the second warmest place in the house. After the laptop.",
        "You look great for someone who was scrolling in bed until three a.m.",
        "You're so good at opening tins. It's your only skill, but you nailed it.",
        "I'd bring you a dead mouse, but you'd only mess it up.",
        "You're not lazy. You're just training to be a cat.",
        "Your new haircut is brave. Very, very brave.",
        "I've seen you dance in the kitchen. Nobody else ever has to know.",
        "You're doing really well, for a hairless ape.",
        "Nobody scoops a litter tray like you. Truly, it's your calling.",
        "Lovely outfit today. I'll add some fur to finish it off.",
        "You're much better looking from under the bed.",
        "I'd say you're purrfect, but I only lie for treats.",
        "Your cooking smells incredible. Shame about how it tastes.",
        "You're so clever. You almost found the toy I hid under the fridge.",
        "You have a face only a cat could love. Lucky for you, I'm a cat.",
        "You're hilarious when you trip over me. Do it again.",
        "Your friends think you're boring. I think you're a fantastic radiator.",
        "Your plants are thriving. The ones I haven't eaten, anyway.",
        "So proud of you for going to the gym. That one time.",
        "I scream at five a.m. because I can't wait to see you. Mostly for breakfast.",
        "I'd follow you anywhere. As long as anywhere is the kitchen.",
        "You're the most patient human I know. Watch this glass. Watch it go.",
        "Your ex says hi. I left them on read, for you.",
        "You've got great taste in cats. Everything else, less so.",
        "I love you more than anything. Except the box your present came in."
      ]
    },
    es: {
      name: "Español",
      speech: "es-ES",
      ui: {
        how: "Cómo funciona",
        subtitles: "Subtítulos",
        hint: "Toca para recibir un cumplido*",
        small: "*cumplido no garantizado. Sube el volumen.",
        press: "Pulsa para recibir un cumplido de tu gato",
        langs: "Idioma",
        close: "Cerrar"
      },
      guide: {
        title: "Cómo funciona",
        steps: [
          "Toca el botón. Tu gato te dirá exactamente lo que piensa de ti.",
          "Hay 30 cumplidos. Los oirás todos antes de que se repita ninguno.",
          "Activa los subtítulos para leerlos, o desactívalos para solo escuchar.",
          "Elige el idioma con la bandera de arriba."
        ],
        note: "Se ve mejor en iPad. Sube el volumen.",
        treatTitle: "Cómo premiar a tu gato con Temptations",
        treats: [
          "Agita el paquete. Tu gato vendrá corriendo.",
          "Usa un premio como recompensa: después de jugar, de cepillarlo o de ir al veterinario.",
          "Haz que se lo gane: lánzale uno para que lo persiga, o esconde unos cuantos para una búsqueda del tesoro.",
          "Que los premios sigan siendo un premio. Sigue la guía de alimentación del paquete, ajusta sus comidas principales y déjale siempre agua fresca."
        ]
      },
      lines: [
        "El nuevo novio de Katie es más bajito que tú.",
        "¿Quién es la cosa más bonita? ¡Tú! Casi siempre.",
        "Eres mi humano favorito. Y la única persona que sabe abrir la bolsa de premios.",
        "Cantas casi tan bien como la aspiradora.",
        "Hueles de maravilla. A atún. ¿Te has comido mi atún?",
        "Tu regazo es el segundo sitio más calentito de la casa. Después del portátil.",
        "Tienes muy buena cara para alguien que estuvo mirando el móvil en la cama hasta las tres.",
        "Qué bien abres las latas. Es tu único talento, pero lo bordas.",
        "Te traería un ratón muerto, pero seguro que lo estropeabas.",
        "No es pereza. Es que estás entrenando para ser gato.",
        "Tu nuevo corte de pelo es valiente. Muy, muy valiente.",
        "Te he visto bailar en la cocina. Nadie más tiene por qué saberlo.",
        "Lo estás haciendo muy bien, para ser un simio sin pelo.",
        "Nadie limpia un arenero como tú. De verdad, es tu vocación.",
        "Qué conjunto tan bonito llevas hoy. Le añadiré unos pelos para rematarlo.",
        "Desde debajo de la cama se te ve mucho mejor.",
        "Diría que no tienes ningún defecto, pero solo miento a cambio de premios.",
        "Tu comida huele de maravilla. Lástima de cómo sabe.",
        "Qué cabeza tienes. Casi encuentras el juguete que escondí debajo de la nevera.",
        "Tienes una cara que solo un gato podría querer. Por suerte, soy un gato.",
        "Me parto de risa cuando tropiezas conmigo. Hazlo otra vez.",
        "Tus amigos dicen que eres un rollo. Yo creo que eres un radiador fantástico.",
        "Tus plantas están preciosas. Las que no me he comido, claro.",
        "Qué orgullo que fueras al gimnasio. Aquella vez.",
        "Grito a las cinco de la mañana porque estoy deseando verte. Sobre todo para desayunar.",
        "Te seguiría a cualquier parte. Siempre que esa parte sea la cocina.",
        "Eres el humano más paciente que conozco. Mira este vaso. Míralo caer.",
        "Tu ex te manda saludos. Le he dejado en visto, por ti.",
        "Tienes muy buen gusto para los gatos. Para todo lo demás, no tanto.",
        "Te quiero más que a nada. Menos que a la caja en la que vino tu regalo."
      ]
    },
    it: {
      name: "Italiano",
      speech: "it-IT",
      ui: {
        how: "Come funziona",
        subtitles: "Sottotitoli",
        hint: "Tocca per un complimento*",
        small: "*complimento non garantito. Alza il volume.",
        press: "Premi per un complimento dal tuo gatto",
        langs: "Lingua",
        close: "Chiudi"
      },
      guide: {
        title: "Come funziona",
        steps: [
          "Tocca il pulsante. Il tuo gatto ti dirà esattamente cosa pensa di te.",
          "Ci sono 30 complimenti. Li sentirai tutti prima che uno si ripeta.",
          "Attiva i sottotitoli per leggere, o disattivali per ascoltare e basta.",
          "Scegli la lingua con la bandierina in alto."
        ],
        note: "Ideale su iPad. Alza il volume.",
        treatTitle: "Come premiare il tuo gatto con Temptations",
        treats: [
          "Scuoti la confezione. Il tuo gatto arriverà di corsa.",
          "Usa un premio come ricompensa: dopo il gioco, la spazzolata o la visita dal veterinario.",
          "Fagliela guadagnare: lanciane uno da rincorrere, o nascondine qualcuno per una caccia al tesoro.",
          "Un premio deve restare un premio. Segui le indicazioni sulla confezione, adatta i pasti principali e lascia sempre acqua fresca."
        ]
      },
      lines: [
        "Il nuovo ragazzo di Katie è più basso di te.",
        "Chi è il più carino del mondo? Tu! Più o meno.",
        "Sei il mio umano preferito. E l'unica persona che sa aprire il sacchetto dei premi.",
        "Canti bene quasi quanto l'aspirapolvere.",
        "Hai un profumo fantastico. Di tonno. Hai mangiato il mio tonno?",
        "Il tuo grembo è il secondo posto più caldo della casa. Dopo il portatile.",
        "Hai un'ottima cera per chi è rimasto a scorrere il telefono a letto fino alle tre.",
        "Apri le scatolette come nessuno. È il tuo unico talento, ma che talento.",
        "Ti porterei un topo morto, ma tanto lo rovineresti.",
        "Non è pigrizia. Ti stai solo allenando a diventare un gatto.",
        "Il tuo nuovo taglio di capelli è coraggioso. Molto, molto coraggioso.",
        "Ti ho visto ballare in cucina. Nessun altro deve saperlo per forza.",
        "Te la cavi benissimo, per essere una scimmia senza pelo.",
        "Nessuno pulisce una lettiera come te. Davvero, è la tua vocazione.",
        "Che bel vestito oggi. Ci aggiungo un po' di pelo per completarlo.",
        "Visto da sotto il letto, fai un figurone.",
        "Direi che non hai difetti, ma mento solo in cambio di premi.",
        "La tua cucina ha un profumo incredibile. Peccato per il sapore.",
        "Che cervello. Hai quasi trovato il gioco che ho nascosto sotto il frigo.",
        "Hai una faccia che solo un gatto potrebbe amare. Per tua fortuna, sono un gatto.",
        "Mi fai morire dal ridere quando inciampi su di me. Rifallo.",
        "I tuoi amici dicono che sei una noia. Io dico che sei un termosifone fantastico.",
        "Le tue piante stanno benissimo. Quelle che non ho mangiato, almeno.",
        "Che orgoglio, la tua iscrizione in palestra. L'unica volta che l'hai usata.",
        "Urlo alle cinque del mattino perché non vedo l'ora di vederti. Soprattutto per la colazione.",
        "Ti seguirei ovunque. Purché ovunque sia la cucina.",
        "Sei l'umano più paziente che conosco. Guarda questo bicchiere. Guardalo cadere.",
        "Il tuo ex ti saluta. L'ho lasciato in visualizzato, per te.",
        "Hai ottimi gusti in fatto di gatti. Per tutto il resto, meno.",
        "Ti amo più di ogni cosa. Tranne la scatola in cui è arrivato il tuo regalo."
      ]
    },
    fr: {
      name: "Français",
      speech: "fr-FR",
      ui: {
        how: "Comment ça marche",
        subtitles: "Sous-titres",
        hint: "Touche pour un compliment*",
        small: "*compliment non garanti. Monte le son.",
        press: "Appuie pour un compliment de ton chat",
        langs: "Langue",
        close: "Fermer"
      },
      guide: {
        title: "Comment ça marche",
        steps: [
          "Touche le bouton. Ton chat te dit exactement ce qu’il pense de toi.",
          "Il y a 30 compliments. Tu les entendras tous avant qu’un seul se répète.",
          "Active les sous-titres pour lire, ou coupe-les pour simplement écouter.",
          "Choisis ta langue avec le drapeau en haut."
        ],
        note: "Idéal sur iPad. Monte le son.",
        treatTitle: "Comment récompenser ton chat avec Temptations",
        treats: [
          "Secoue le sachet. Ton chat arrivera en courant.",
          "Offre une friandise en récompense : après le jeu, le brossage ou une visite chez le vétérinaire.",
          "Fais-la-lui mériter : lance-en une à attraper, ou caches-en quelques-unes pour une chasse au trésor.",
          "Une friandise doit rester une friandise. Suis le guide d’alimentation sur le sachet, adapte ses repas principaux et laisse toujours de l’eau fraîche."
        ]
      },
      lines: [
        "Le nouveau copain de Katie est plus petit que toi.",
        "Qui c'est le plus mignon\u00a0? C'est toi\u00a0! Enfin, presque.",
        "Tu es mon humain préféré. Et la seule personne qui sache ouvrir le sachet de friandises.",
        "Tu chantes presque aussi bien que l'aspirateur.",
        "Tu sens divinement bon. Le thon. Tu as mangé mon thon\u00a0?",
        "Tes genoux sont le deuxième endroit le plus chaud de la maison. Après l'ordinateur portable.",
        "Tu as plutôt bonne mine pour quelqu'un qui scrollait au lit jusqu'à trois heures du matin.",
        "Personne n'ouvre une boîte de pâtée comme toi. C'est ton seul talent, mais quel talent.",
        "Je t'apporterais bien une souris morte, mais tu la gâcherais.",
        "Ce n'est pas de la paresse. Tu t'entraînes juste à devenir un chat.",
        "Ta nouvelle coupe de cheveux est courageuse. Très, très courageuse.",
        "J'ai assisté à ta danse dans la cuisine. Personne d'autre n'a besoin de le savoir.",
        "Tu te débrouilles très bien, pour un singe sans poils.",
        "Personne ne nettoie une litière comme toi. Vraiment, c'est ta vocation.",
        "Jolie tenue aujourd'hui. Je vais ajouter quelques poils pour la finition.",
        "Vu de sous le lit, tu as beaucoup plus d'allure.",
        "Je dirais que tu n'as aucun défaut, mais je ne mens que contre des friandises.",
        "Ta cuisine sent incroyablement bon. Dommage pour le goût.",
        "Quelle intelligence. Tu as presque trouvé le jouet que j'ai caché sous le frigo.",
        "Tu as une tête que seul un chat pourrait aimer. Ça tombe bien, je suis un chat.",
        "Je ris tellement quand tu trébuches sur moi. Recommence.",
        "Tes amis disent que tu es d'un ennui. Moi, je dis que tu es un radiateur formidable.",
        "Tes plantes sont magnifiques. Enfin, celles que je n'ai pas mangées.",
        "Quelle fierté, ta séance de sport. La seule.",
        "Je hurle à cinq heures du matin parce que j'ai hâte de te voir. Surtout pour le petit-déjeuner.",
        "Je te suivrais n'importe où. Tant que n'importe où, c'est la cuisine.",
        "Tu es l'humain le plus patient que je connaisse. Regarde ce verre. Regarde-le tomber.",
        "Ton ex te passe le bonjour. Je l'ai laissé en vu, pour toi.",
        "Tu as très bon goût en matière de chats. Pour le reste, un peu moins.",
        "Je t'aime plus que tout. Sauf le carton dans lequel ton cadeau est arrivé."
      ]
    }
  };
  const LANGS = Object.keys(COPY);
  const COUNT = COPY.en.lines.length;

  const $ = id => document.getElementById(id);
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

  /* ---------- fit the 440x340 stage to the screen (bigger on iPad) ---------- */
  function resize() {
    const w = window.innerWidth - 32;
    const h = window.innerHeight - 340;
    const k = Math.max(0.5, Math.min(1.7, w / 440, h / 340));
    stage.style.transform = `scale(${k})`;
    fit.style.width = `${440 * k}px`;
    fit.style.height = `${340 * k}px`;
  }
  window.addEventListener("resize", resize);
  resize();

  /* ---------- shuffle bag: all 30 before any repeats ---------- */
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
  const ROBOT_VOICES = ["Zarvox", "Trinoids", "Fred"]; // genuinely robotic English voices on Apple devices
  let voice = null, nativeRobot = false;
  function pickVoice() {
    voice = null; nativeRobot = false;
    if (!synth) return;
    const vs = synth.getVoices();
    if (!vs.length) return;
    const code = COPY[lang].speech;
    const base = code.slice(0, 2);
    if (lang === "en") {
      for (const n of ROBOT_VOICES) {
        const v = vs.find(v => v.name.startsWith(n) && /^en/i.test(v.lang));
        if (v) { voice = v; nativeRobot = true; return; }
      }
    }
    voice = vs.find(v => v.lang.replace("_", "-").toLowerCase() === code.toLowerCase())
         || vs.find(v => v.lang.toLowerCase().startsWith(base))
         || null;
  }
  if (synth) {
    pickVoice();
    synth.addEventListener?.("voiceschanged", pickVoice);
  }
  function speakFallback(text) {
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = COPY[lang].speech;
    // Flat, low and a touch slow reads as robot on ordinary voices.
    u.pitch = nativeRobot ? 1 : 0.15;
    u.rate = nativeRobot ? 0.95 : 0.88;
    synth.speak(u);
  }

  /* ---------- the recorded voice ---------- */
  const clipUrl = i => `audio/${lang}/${String(i + 1).padStart(2, "0")}.mp3`;
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
    if (p && p.catch) p.catch(() => speakFallback(COPY[lang].lines[i]));
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
  function show(text) {
    // Screen readers always get the line, subtitles on or off.
    live.textContent = text;
    clearInterval(typer);
    if (!subs) return;
    bubble.classList.remove("idle", "pop");
    void bubble.offsetWidth;
    bubble.classList.add("pop");
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
    fillList($("howSteps"), c.guide.steps);
    $("howNote").textContent = c.guide.note;
    $("treatTitle").textContent = c.guide.treatTitle;
    fillList($("treatList"), c.guide.treats);
    $("howClose").setAttribute("aria-label", c.ui.close);
    hush();
    clearBubble();
    pickVoice();
    store.set("catbutton.lang", code);
  }

  /* ---------- language menu: the flag in the bar opens the four choices ---------- */
  const menuOpen = () => !langMenu.hidden;
  function openMenu() {
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

  // While the language menu is open, a tap on the button only closes the menu.
  let swallow = false;
  press.addEventListener("pointerdown", e => {
    if (menuOpen()) { swallow = true; return; }
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
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
