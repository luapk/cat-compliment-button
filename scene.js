/* The button, rendered in 3D (three.js, MIT, vendored in vendor/).

   It draws into a canvas behind the existing page button, which stays the thing
   people actually press (app.js handles taps, sound and subtitles). This file
   only watches two things: the #stage "is-down" class for the press, and the
   #view slider for the camera angle. If WebGL is not available, it does
   nothing and the CSS drawing of the button stays on screen. */

import * as THREE from "./vendor/three.module.min.js";

const fit = document.getElementById("fit");
const stage = document.getElementById("stage");
const viewInput = document.getElementById("view");

/* ---------- sizes, in arbitrary units (1 unit = 100px of the old drawing) ---------- */
const BASE_R = 1.7, BASE_H = 0.7;   // red base
const CAP_R = 1.2, CAP_H = 0.64;    // yellow cap
const CAP_SEAT = 0.66;              // where the cap's bottom sits
const PRESS = 0.3;                  // how far the cap sinks when pressed

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
} catch {
  renderer = null;
}

if (renderer) start();

function start() {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping; // keeps the brand red and yellow true
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = "gl-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  fit.prepend(renderer.domElement);

  const scene = new THREE.Scene();

  // Reflections come from a little product-photo studio: softboxes to the left,
  // right and behind, a warm grey room, and nothing straight overhead, so
  // looking down on the glossy coat does not mirror a ceiling light.
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x4a443c);
  const softbox = (w, h, x, y, z, power) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    m.material.color.setScalar(power);
    m.position.set(x, y, z);
    m.lookAt(0, 0.5, 0);
    studio.add(m);
  };
  softbox(6, 4, -7, 4.5, 2.5, 3.2);   // key softbox, left
  softbox(3, 5, 7, 3, -1, 1.6);       // narrow strip, right
  softbox(9, 1.2, 0, 5.5, -6, 2.6);   // long strip behind, top
  softbox(7, 2, 0, 1.2, 8, 0.7);      // low bounce in front
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio, 0.035).texture;
  scene.environmentIntensity = 0.6;

  // Key light from the top left, casting the cap's soft shadow onto the base.
  const key = new THREE.DirectionalLight(0xfff2dc, 3.3);
  key.position.set(-2.6, 8, 3.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 20 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 4;
  scene.add(key);
  // A cool fill from the right so the shadow side is not dead.
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.35);
  fill.position.set(4, 3, 2);
  scene.add(fill);
  // A rim light from behind to separate the edges from the yellow page.
  const rim = new THREE.DirectionalLight(0xffffff, 1.3);
  rim.position.set(1.5, 2.5, -5);
  scene.add(rim);

  /* ---------- shapes: turned profiles, so every edge is rounded ---------- */
  const arc = (pts, cx, cy, r, a0, a1, n = 10) => {
    for (let i = 0; i <= n; i++) {
      const a = a0 + (a1 - a0) * (i / n);
      pts.push(new THREE.Vector2(cx + r * Math.cos(a), cy + r * Math.sin(a)));
    }
  };
  const SEG = 160;

  // Base: soft, slightly bellied rim like a moulded housing, with a gentle
  // dish where the cap sits.
  const baseProfile = [new THREE.Vector2(0, 0), new THREE.Vector2(BASE_R - 0.12, 0)];
  arc(baseProfile, BASE_R - 0.12, 0.12, 0.12, -Math.PI / 2, 0, 8);
  baseProfile.push(new THREE.Vector2(BASE_R + 0.025, 0.3));
  baseProfile.push(new THREE.Vector2(BASE_R, 0.46));
  arc(baseProfile, BASE_R - 0.24, BASE_H - 0.24, 0.24, 0, Math.PI / 2, 14);
  baseProfile.push(new THREE.Vector2(CAP_R + 0.14, BASE_H - 0.01));
  arc(baseProfile, CAP_R + 0.06, BASE_H - 0.09, 0.08, Math.PI / 2, Math.PI, 6); // lip into the well
  baseProfile.push(new THREE.Vector2(CAP_R - 0.02, CAP_SEAT - PRESS - 0.05));
  baseProfile.push(new THREE.Vector2(0, CAP_SEAT - PRESS - 0.05));
  const baseGeo = new THREE.LatheGeometry(baseProfile, SEG);

  // Cap: straight side, crisp rounded top edge, very slightly domed top.
  const capProfile = [new THREE.Vector2(0, 0), new THREE.Vector2(CAP_R - 0.03, 0)];
  arc(capProfile, CAP_R - 0.03, 0.03, 0.03, -Math.PI / 2, 0, 4);
  capProfile.push(new THREE.Vector2(CAP_R, CAP_H - 0.11));
  arc(capProfile, CAP_R - 0.11, CAP_H - 0.11, 0.11, 0, Math.PI / 2, 12);
  capProfile.push(new THREE.Vector2(CAP_R * 0.6, CAP_H + 0.012));
  capProfile.push(new THREE.Vector2(0, CAP_H + 0.018));
  const capGeo = new THREE.LatheGeometry(capProfile, SEG);

  /* ---------- materials: coated moulded plastic, not toy shine ---------- */
  // A satin body under a thin glossy coat: soft colour shading, crisp highlights.
  const red = new THREE.MeshPhysicalMaterial({
    color: 0xc4100b, roughness: 0.55, metalness: 0,
    clearcoat: 1, clearcoatRoughness: 0.12
  });
  const yellow = new THREE.MeshPhysicalMaterial({
    color: 0xffc000, roughness: 0.5, metalness: 0,
    clearcoat: 1, clearcoatRoughness: 0.1
  });

  const base = new THREE.Mesh(baseGeo, red);
  base.castShadow = true;
  base.receiveShadow = true;
  scene.add(base);

  const cap = new THREE.Group();
  const capMesh = new THREE.Mesh(capGeo, yellow);
  capMesh.castShadow = true;
  capMesh.receiveShadow = true;
  cap.add(capMesh);
  scene.add(cap);

  // The logo, printed flat on the cap's top.
  const logoMat = new THREE.MeshPhysicalMaterial({
    transparent: true, roughness: 0.45, clearcoat: 1, clearcoatRoughness: 0.1,
    polygonOffset: true, polygonOffsetFactor: -2, depthWrite: false
  });
  const logo = new THREE.Mesh(new THREE.PlaneGeometry(1.86, 1.86 * 151 / 281), logoMat);
  logo.rotation.x = -Math.PI / 2;
  logo.position.y = CAP_H + 0.02;
  logo.receiveShadow = true;
  cap.add(logo);
  new THREE.TextureLoader().load("assets/temptations-logo.png", tex => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    logoMat.map = tex;
    // The logo lights itself a little, so its whites read as white under the
    // studio lighting instead of greying off; black stays black.
    logoMat.emissive = new THREE.Color(0xffffff);
    logoMat.emissiveMap = tex;
    logoMat.emissiveIntensity = 0.4;
    logoMat.needsUpdate = true;
    render();
  });

  // Ground: the key light's shadow, plus a soft contact shadow right under the rim.
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ opacity: 0.16 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 60, 128, 128, 128);
  grad.addColorStop(0, "rgba(70,30,0,0.55)");
  grad.addColorStop(0.62, "rgba(70,30,0,0.32)");
  grad.addColorStop(1, "rgba(70,30,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const contactTex = new THREE.CanvasTexture(c);
  contactTex.colorSpace = THREE.SRGBColorSpace;
  const contact = new THREE.Mesh(
    new THREE.PlaneGeometry(BASE_R * 2.5, BASE_R * 2.5),
    new THREE.MeshBasicMaterial({ map: contactTex, transparent: true, depthWrite: false })
  );
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = 0.002;
  scene.add(contact);

  /* ---------- camera: elevation from the view slider (90 = straight down) ---------- */
  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
  const target = new THREE.Vector3(0, 0.35, 0);
  function placeCamera() {
    // Slider = tilt from straight down (0) to level with the table (90).
    const deg = Math.min(89.9, 90 - Number(viewInput ? viewInput.value : 45));
    const rad = THREE.MathUtils.degToRad(deg);
    // Aim at the button's middle: low on it from above, halfway up from the side.
    target.y = 0.35 + 0.35 * Math.cos(rad);
    const dist = 12;
    camera.position.set(0, target.y + dist * Math.sin(rad), dist * Math.cos(rad));
    camera.lookAt(target);
  }

  // The canvas is CANVAS_SCALE times the button's box (see .gl-canvas), so the
  // soft shadows fade out well before its edges instead of being cut off.
  const CANVAS_SCALE = 1.6;
  function size() {
    const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Fit the button's width (plus its shadow) into the middle of the frame at any angle.
    const dist = 12, halfW = (BASE_R + 0.45) * CANVAS_SCALE, halfH = (BASE_R + 0.35) * CANVAS_SCALE;
    const fromWidth = 2 * Math.atan(halfW / dist / camera.aspect);
    const fromHeight = 2 * Math.atan(halfH / dist);
    camera.fov = THREE.MathUtils.radToDeg(Math.max(fromWidth, fromHeight));
    camera.updateProjectionMatrix();
  }

  /* ---------- press: the cap sinks into the well ---------- */
  let press = 0, pressTarget = 0, raf = 0, last = 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function setCap() { cap.position.y = CAP_SEAT - PRESS * press; }
  function tick(t) {
    const dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
    last = t;
    const speed = pressTarget > press ? 28 : 16; // down fast, up a little slower
    press += (pressTarget - press) * Math.min(1, dt * speed);
    if (Math.abs(pressTarget - press) < 0.002 || reduce) press = pressTarget;
    setCap();
    render();
    if (press !== pressTarget) raf = requestAnimationFrame(tick);
    else { raf = 0; last = 0; }
  }
  function animate() { if (!raf) raf = requestAnimationFrame(tick); }

  function render() { renderer.render(scene, camera); }

  new MutationObserver(() => {
    pressTarget = stage.classList.contains("is-down") ? 1 : 0;
    animate();
  }).observe(stage, { attributes: true, attributeFilter: ["class"] });

  if (viewInput) viewInput.addEventListener("input", () => { placeCamera(); render(); });
  new ResizeObserver(() => { size(); render(); }).observe(fit);

  setCap();
  placeCamera();
  size();
  render();
  // Hide the CSS drawing only once the 3D one is on screen.
  document.documentElement.classList.add("gl");

  renderer.domElement.addEventListener("webglcontextlost", e => {
    e.preventDefault();
    document.documentElement.classList.remove("gl"); // fall back to the CSS button
  });
}
