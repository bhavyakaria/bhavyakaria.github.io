// Interaction sounds for bhavyakaria.github.io
//
// Design plan & rationale: docs/interaction-sounds.md
// Sound files: Kenney "Interface Sounds" 1.0 (CC0) vendored in /sounds/,
// converted to 16-bit 44.1kHz mono WAV for universal support (incl. pre-2020 Safari).
//
// Engine: Web Audio API sample playback. Buffers are fetched and decoded on
// load; each play is a BufferSource + GainNode — sub-millisecond latency,
// no audio files fetched at click time.
// All tunable values live in SOUNDS and MASTER_VOLUME below.

const STORAGE_KEY = "ui-sound-muted";

// ---------------------------------------------------------------------------
// Sound palette (file choices tuned by ear; volumes in phase 3)
//
// Selection logic (see docs/interaction-sounds.md):
// - tick: crisp short click — the workhorse, must survive 20 rapid clicks
// - external: high "ting" — the sound "leaves" the site
// - pagination: same family, pitch maps to direction (newer higher)
// - theme toggle: bright click → light, deep "thock" → dark
// ---------------------------------------------------------------------------
export const SOUNDS = {
  tick: { file: "/sounds/click_004.wav", volume: 0.3 },

  "tick-external": { file: "/sounds/select_008.wav", volume: 0.3 },

  "tick-newer": { file: "/sounds/select_001.wav", volume: 0.3 },
  "tick-older": { file: "/sounds/select_002.wav", volume: 0.3 },

  "toggle-light": { file: "/sounds/tick_001.wav", volume: 0.4 },
  "toggle-dark": { file: "/sounds/click_001.wav", volume: 0.4 },
};

// Single knob for overall loudness (tune in phase 3 alongside SOUNDS).
// Exported for the tuning bench at /sound-lab.html.
export const MASTER_VOLUME = 0.6;

// ---------------------------------------------------------------------------
// Audio engine
// ---------------------------------------------------------------------------
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const buffers = new Map();

for (const [name, def] of Object.entries(SOUNDS)) {
  loadBuffer(name, def.file);
}

async function loadBuffer(name, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    buffers.set(name, await ctx.decodeAudioData(await res.arrayBuffer()));
  } catch (err) {
    // Missing/unplayable file — fail silently, clicks just stay quiet.
    console.warn(`ui-sound: failed to load ${url}`, err);
  }
}

function play(name) {
  if (muted) return;
  const def = SOUNDS[name];
  const buffer = buffers.get(name);
  if (!def || !buffer) return;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.value = def.volume * MASTER_VOLUME;
  src.connect(gain).connect(ctx.destination);
  src.start();
}

// ---------------------------------------------------------------------------
// Mute state
//
// Priority: explicit user choice (localStorage) > autoplay policy > audible.
// Browsers only permit audio after a user gesture, so the policy is re-checked
// on the first gesture: a "disallowed" verdict at load flips to "allowed" once
// the user has interacted — unless the browser blocks audio outright.
// ---------------------------------------------------------------------------
// Storage can throw in privacy modes — sounds still work, mute just won't persist.
function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function policyDisallowsAudio() {
  if (typeof navigator.getAutoplayPolicy !== "function") return false;
  try {
    return navigator.getAutoplayPolicy("audiocontext") === "disallowed";
  } catch {
    return false; // API quirks → assume audible
  }
}

function resolveMuted() {
  const stored = storageGet(STORAGE_KEY);
  if (stored !== null) return stored === "1";
  return policyDisallowsAudio();
}

let muted = resolveMuted();
let userChoseMute = storageGet(STORAGE_KEY) !== null;

function updateMuteButton() {
  const btn = document.getElementById("sound-toggle");
  if (!btn) return;
  // Speaker icons, forced to text presentation (U+FE0E) so they render as
  // monochrome glyphs matching the site's ◑ typographic aesthetic.
  // 🔇 = muted, 🔈 = audible.
  btn.textContent = muted ? "\u{1F507}\uFE0E" : "\u{1F508}\uFE0E";
  btn.setAttribute("aria-label", muted ? "Unmute sounds" : "Mute sounds");
  btn.setAttribute("title", muted ? "Unmute sounds" : "Mute sounds");
}

function setMuted(next) {
  muted = next;
  userChoseMute = true;
  storageSet(STORAGE_KEY, next ? "1" : "0");
  updateMuteButton();
}

// ---------------------------------------------------------------------------
// AudioContext unlock (autoplay policy)
// ---------------------------------------------------------------------------
let unlocked = false;

function unlock() {
  if (unlocked) return;
  unlocked = true;
  // Contexts created before the first user gesture start suspended.
  if (ctx.state === "suspended") ctx.resume();
  // Now that audio is gesture-unlocked, lift the load-time "disallowed" mute
  // unless the user made an explicit choice or the browser still blocks audio.
  if (!userChoseMute && muted && !policyDisallowsAudio()) {
    muted = false;
    updateMuteButton();
  }
}

document.addEventListener("pointerdown", unlock, { passive: true });
document.addEventListener("keydown", unlock, { passive: true });

// ---------------------------------------------------------------------------
// Interaction classification
// ---------------------------------------------------------------------------
function isExternalLink(a) {
  if (a.protocol === "mailto:") return true;
  return a.hostname !== "" && a.hostname !== location.hostname;
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const el = event.target.closest("button, a[href]");
  if (!el) return;

  // Mute toggle: silent when muting, confirmation tick when unmuting.
  if (el.id === "sound-toggle") {
    setMuted(!muted);
    if (!muted) play("tick");
    return;
  }

  // Theme toggle: the inline onclick has already flipped data-theme
  // (our listener runs in the bubble phase at document level).
  if (el.id === "theme-toggle") {
    const theme = document.documentElement.getAttribute("data-theme");
    play(theme === "light" ? "toggle-light" : "toggle-dark");
    return;
  }

  // Explicit override (pagination direction, future special cases).
  const override = el.getAttribute("data-sound");
  if (override !== null) {
    if (override !== "none") play(override);
    return;
  }

  // Every other link: tick, with a rising variant for external navigation.
  if (el.tagName === "A" && el.href) {
    play(isExternalLink(el) ? "tick-external" : "tick");
  }
});
