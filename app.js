/* Cat Compliment Button: tap, shuffle, speak. No server, no data collected. */
(() => {
  const LINES = [
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
  ];

  const $ = id => document.getElementById(id);
  const stage = $("stage"), fit = $("fit"), press = $("press");
  const bubble = $("bubble"), lineEl = $("line"), sub = $("sub");

  /* ---------- fit the 440x340 stage to the screen ---------- */
  function resize() {
    const w = window.innerWidth - 32;
    const h = window.innerHeight - 250;
    const k = Math.max(0.5, Math.min(1.25, w / 440, h / 340));
    stage.style.transform = `scale(${k})`;
    fit.style.width = `${440 * k}px`;
    fit.style.height = `${340 * k}px`;
  }
  window.addEventListener("resize", resize);
  resize();

  /* ---------- shuffle bag: all 30 before any repeats ---------- */
  let bag = [], last = -1, heard = new Set();
  function nextLine() {
    if (!bag.length) {
      bag = [...LINES.keys()];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag[0] === last) bag.push(bag.shift());
    }
    last = bag.shift();
    heard.add(last);
    return LINES[last];
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
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  const ROBOT_VOICES = ["Zarvox", "Trinoids", "Fred"]; // genuinely robotic voices on Apple devices
  let voice = null, nativeRobot = false;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices();
    if (!vs.length) return;
    for (const n of ROBOT_VOICES) {
      const v = vs.find(v => v.name.startsWith(n) && /^en/i.test(v.lang));
      if (v) { voice = v; nativeRobot = true; return; }
    }
    nativeRobot = false;
    voice = vs.find(v => /^en[-_]GB/i.test(v.lang))
         || vs.find(v => /^en/i.test(v.lang))
         || vs[0];
  }
  if (synth) {
    pickVoice();
    synth.addEventListener?.("voiceschanged", pickVoice);
  }

  // Only used if the recorded clip will not play.
  function speakFallback(text) {
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : "en-GB";
    // Flat, low and a touch slow reads as robot on ordinary voices.
    u.pitch = nativeRobot ? 1 : 0.15;
    u.rate = nativeRobot ? 0.95 : 0.88;
    u.volume = 1;
    synth.speak(u);
  }

  /* ---------- the recorded voice: line N plays audio/NN.mp3 (01 to 30) ---------- */
  // To swap in new recordings, replace the files and keep the names.
  const clipUrl = i => `audio/${String(i + 1).padStart(2, "0")}.mp3`;
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
    if (p && p.catch) p.catch(() => speakFallback(LINES[i]));
  }

  /* ---------- typewriter in the bubble ---------- */
  let typer = null;
  function show(text) {
    clearInterval(typer);
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
  const escape = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

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
    setTimeout(() => {
      stage.classList.remove("is-down");
    }, wait);
  }
  function fire() {
    const text = nextLine();
    show(text);
    speak(last);
    sub.textContent = heard.size >= LINES.length
      ? "You've heard all 30. The cat is not sorry."
      : `${heard.size} of ${LINES.length} heard. Sound up.`;
  }

  press.addEventListener("pointerdown", e => { if (e.button === 0) down(); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => press.addEventListener(ev, up));
  press.addEventListener("keydown", e => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) down();
  });
  press.addEventListener("keyup", e => { if (e.key === " " || e.key === "Enter") up(); });
  press.addEventListener("click", () => {
    // Clicks without a pointer press (keyboard, assistive tech) still get the full squash.
    if (!stage.classList.contains("is-down") && performance.now() - downAt > 400) { down(); up(); }
    fire();
  });
  press.addEventListener("contextmenu", e => e.preventDefault());

  /* ---------- offline: cache the page, logo, font and clips after first visit ---------- */
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
