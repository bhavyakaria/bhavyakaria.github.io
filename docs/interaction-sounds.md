# Interaction Sound Design Plan

Status: **Decisions resolved — implementation in progress** (phases 0–2 done, phase 3 tuning pending owner's ears).

## 1. Goals & Non-Goals

**Goals**

- Add subtle, gesture-caused sounds that reinforce the site's minimal,
  monospace aesthetic — a "signature" layer, not a gimmick.
- Minimal payload: six tiny CC0 samples (~27KB total, 16-bit WAV),
  decoded async after load — zero impact on initial render.
- Fully optional for users: visible mute toggle, persisted across sessions.

**Non-goals**

- No background music or ambience.
- No sounds on page load (violates the causality principle).
- No hover sounds (repetition tolerance — hover fires dozens of times per visit).
- No success/error sounds (site has no forms; pattern reserved for future features).

**Design principles (from first-principles analysis)**

1. **Causality** — every sound is triggered by a discrete user gesture, within ~30ms.
2. **Metaphor** — sound matches the physical metaphor of the interaction (toggle =
   two-pitch detent, navigation = soft tick).
3. **Earcons, not samples** — abstract synthesized tones match the iA Writer Mono /
   minimalist design better than literal real-world recordings.
4. **Repetition tolerance** — frequent interactions get quieter, simpler sounds;
   rarer interactions (theme toggle) get slightly richer character.
5. **Restraint** — 30–200ms durations, volume just above the threshold of noticeability,
   no frequencies below ~150Hz or above ~10kHz.

---

## 2. Approach: How We Add Sound

### 2.1 Sound source: Kenney samples via Web Audio

| Option | Verdict |
|---|---|
| **Kenney "Interface Sounds" samples** | ✅ **Chosen.** Crisp real clicks — CC0, no attribution required. Selected files by objective analysis (duration, crest factor, spectral centroid, dominant pitch) and vendored into `public/sounds/` as 16-bit 44.1kHz mono WAV (~27KB total). WAV decodes in every browser including pre-2020 Safari; for these ultra-short files it's also smaller than OGG. Played through a small Web Audio engine (`fetch` → `decodeAudioData` → `BufferSource`), sub-millisecond latency. |
| ZzFX synthesis | ❌ Replaced. Procedural sine clicks sounded synthetic; real samples give the crisp physical texture we want. (ZzFX used for early prototyping — valuable for rapid iteration, but samples won for character.) |
| Howler.js | ❌ Overkill. Our engine is ~15 lines of Web Audio; a playback library adds nothing. |
| Tone.js | ❌ Music-oriented synthesis framework; wrong tool for sample ticks. |

**How it's added without touching dependencies:** the 6 files in use are
converted from the Kenney pack (OGG → WAV via ffmpeg) into `public/sounds/`
(with `License.txt`). No `package.json` change → no lockfile churn.

The source pack folder (`kenney_interface-sounds/`) is gitignored; only the
vendored files ship.

### 2.2 Architecture

```
public/
  sounds/*.wav            ← vendored CC0 samples + License.txt, never modified
  ui-sound.js             ← our module: sound mapping + event hooks (single source of truth)
  sound-lab.html          ← tuning bench (dev tool, noindex)

src/layouts/BaseLayout.astro
  → <script type="module" src="/ui-sound.js"></script>   (end of body)
  → mute toggle button (#sound-toggle) added to <nav> next to theme toggle
```

**Why a single global module instead of per-component hooks:**

- The site is a multi-page app; a `document`-level click listener survives
  every navigation and requires **zero changes to page templates**.
- Interactions are classified by selector, not by instrumenting each link.
- All tunable values (frequencies, volumes, durations) live in **one constants
  object** at the top of `ui-sound.js` — the tuning phase edits one file.

**Module responsibilities (`public/ui-sound.js`):**

1. **AudioContext unlock** — browsers block audio until a user gesture.
   On the first `pointerdown`/`keydown` anywhere, resume ZzFX's context
   (silently, no sound played). After that, all gesture-triggered plays work.
2. **Mute state** — resolution order: explicit user choice
   (`localStorage["ui-sound-muted"]`) → `navigator.getAutoplayPolicy("audiocontext")`
   → audible (ON). Because browsers only allow audio after a user gesture, the
   policy is **re-checked on the first gesture**: a load-time "disallowed"
   verdict is lifted (auto-unmute) unless the user made an explicit choice or
   the browser still reports audio blocked. The mute button toggles and
   persists; unmuting plays a confirmation tick.
3. **Sound definitions** — file → volume mappings from section 3.2, plus `play(name)`
   (BufferSource + GainNode per click).
4. **Event delegation** — one `click` listener classifies the target:

| Target (closest match) | Sound |
|---|---|
| `#theme-toggle` | `toggle-light` or `toggle-dark` (reads `data-theme` *after* the existing inline handler has flipped it — bubble phase guarantees ordering) |
| `#sound-toggle` | silent when muting; confirmation `tick` when unmuting |
| `a[href]` (internal) | `tick` |
| `a[href]` (external / `mailto:`) | `tick-external` (rising — the sound "leaves" the site) |
| `[data-sound="tick-newer"/"tick-older"]` | pagination direction (pitch maps to direction) |
| `[data-sound="none"]` | silent (escape hatch for future links) |
| `[data-sound="..."]` override | named sound (future special cases) |

Listening to `click` (not `pointerdown`) means keyboard activation
(Tab → Enter) also triggers sounds — accessibility for free.

### 2.3 Why no build integration

`public/` is served verbatim by Astro and GitHub Pages — no bundler config.
The module script is deferred (standard for `type="module"`); samples are
fetched and decoded asynchronously after load, so nothing blocks rendering.
Files are cached by the browser and shared across pages.

---

## 3. Target Interactions & User Flows

### 3.1 Interaction inventory

| # | Interaction | Location | Frequency | Sound |
|---|---|---|---|---|
| 1 | Theme toggle ◑ (dark ⇄ light) | Nav | Low–medium | **Signature sound** — two-pitch detent (earcon with mechanical metaphor) |
| 2 | Nav links (home/blog/projects/resume) | Nav | Medium | Soft tick |
| 3 | Inline links (posts, github, external, profile) | Body | Medium | `tick`; external/`mailto:` links get `tick-external` (ascending) |
| 4 | Pagination (older/newer) | Blog | Low | `tick-newer` (higher) / `tick-older` (lower) |
| 5 | Tag chips | Post pages | Low | Soft tick |
| 6 | 404 → Home link | 404 page | Rare | Soft tick (no load sound — see non-goals) |
| 7 | Hover (any) | Everywhere | Very high | **Silence** (deliberate) |
| 8 | Mute toggle | Nav | Low | Tick on unmute only |
| 9 | Future: forms, copy buttons | — | — | Pattern reserved: `success` (ascending) / `error` (descending) |

### 3.2 Sound palette (current mapping — tuned by ear in phase 3)

All files are Kenney CC0 samples, vendored in `public/sounds/` as 16-bit WAV
(for universal support, including pre-2020 Safari). Selection was made by
objective analysis: duration ≤ ~60ms for ticks, spectral centroid
(brightness) and dominant pitch for state/direction mapping, crest factor for
crisp attack.

| Sound | File | Character (from spectral analysis) | Volume | Notes |
|---|---|---|---|---|
| `tick` | `click_004.wav` | 22ms, 6kHz centroid, noisy — crisp bright click | 0.30 | The workhorse; short enough to survive 20 rapid clicks |
| `tick-external` | `select_008.wav` | 60ms, 7kHz centroid, dominant 7.9kHz — high "ting" | 0.30 | Clearly above `tick` — reads as leaving the site |
| `tick-newer` | `select_001.wav` | 40ms, dominant 2.1kHz | 0.30 | Same family as `tick-older`, higher pitch |
| `tick-older` | `select_002.wav` | 40ms, dominant 594Hz | 0.30 | Pitch maps direction: older = lower |
| `toggle-light` | `tick_001.wav` | 45ms, 5.6kHz centroid, sharp attack — bright | 0.40 | Rising/bright = state gained |
| `toggle-dark` | `click_001.wav` | 97ms, dominant 227Hz + bright transient — deep "thock" | 0.40 | Falling/deep = state lost |

Alternatives for future tweaks live in the gitignored `kenney_interface-sounds/`
pack; the tuning bench at `/sound-lab.html` can be pointed at new files if the
palette ever changes.

Rules encoded in the mapping:

- **Pitch maps to state:** ascending = on/forward, descending = off/back.
- **Volume maps to frequency of use:** tick (constant) < toggle (occasional).
- **Timbre maps to role:** tick = sine + slight noise (physical, subtle);
  toggle = purer tone, longer, slightly louder (signature, memorable).
- **Envelope:** instant attack (≤10ms) + exponential decay. No sustain, ever.

### 3.3 User flows covered

1. **Explore:** land → read home → nav to blog → open post → back. Every hop ticks; rhythm stays consistent.
2. **Theme flip:** the one moment with a distinctive sound — the "brand moment".
3. **Paginate / filter tags:** ticks keep the affordance consistent with nav.
4. **Error recovery:** 404 → Home link ticks; navigation still feels responsive.
5. **Opt-out:** user mutes (silently), state persists; unmute confirms with a tick.

---

## 4. Making It Best for Users

1. **Default ON, visible opt-out.** Sounds only play in response to gestures,
   so defaulting ON is safe. Default muted state is resolved via
   `navigator.getAutoplayPolicy("audiocontext")` at load ("disallowed" → muted),
   re-checked on first gesture (browsers permit audio after a gesture, so the
   mute lifts automatically unless the user chose otherwise). Explicit user
   choice always wins and persists in `localStorage`.
    Mute toggle: inline SVG speaker icons matching the site's typographic style —
    audible (volume waves) / muted (X), stroke="currentColor" for identical
    monochrome rendering on macOS/Windows/Linux.
2. **Gesture-locked.** No audio ever plays without a user action (browser
   autoplay policy is satisfied by design; also the causality principle).
3. **Latency.** ZzFX plays synchronously inside the click handler — effectively
   0ms. The sound lands with the visual state change, never after.
4. **Calibrated quiet.** Target: "noticeable on first listen, ignorable on the
   fiftieth." Master volume tuned so ticks sit just above threshold; users on
   laptops with speakers shouldn't flinch.
5. **Repetition tolerance.** 20 rapid clicks must remain tolerable — the tick
   passes by being short and low-volume; no long tails, no reverb, no melody
   that gets stuck.
6. **Accessibility & preferences.**
   - All sounds < 200ms, no low-frequency content — safe for users sensitive to noise.
   - Works with keyboard: `click` delegation covers Enter/Space activation.
    - No `prefers-reduced-sound` media query exists; the mute toggle is the
      mechanism (inline SVG icons, accessible `aria-label` and `title`).
7. **Performance.** ~27KB of samples + ~4KB JS, all fetched/decoded async
   after load; zero impact on initial render, no memory growth (each playback
   node is released after it ends).
8. **Mobile.** Works identically; iOS silent switch mutes web audio (OS
   behavior, correct to respect). Volumes stay low for phone speakers.
9. **Consistency across the MPA.** Same module on every page → identical
   sounds everywhere; the site feels like one instrument, not a patchwork.

---

## 5. Implementation Phases

| Phase | Work | Files touched | Status |
|---|---|---|---|
| 0 | Approve plan & decisions (7) | this doc | ✅ Done — all four decisions resolved |
| 1 | Vendor Kenney CC0 samples into `public/sounds/`; rewrite `ui-sound.js` engine to Web Audio sample playback (AudioContext, decode, BufferSource) | `public/sounds/`, `public/ui-sound.js` | ✅ Done (ZzFX removed) |
| 2 | Add script tags + mute button to `BaseLayout`; wire delegation + pagination `data-sound` attributes | `src/layouts/BaseLayout.astro`, `src/pages/blog/[...page].astro`, `src/pages/blog/tag/[tag]/[...page].astro` | ✅ Done |
| 3 | Tuning session: audition in `/sound-lab.html`, swap files, adjust volumes; finalize constants | `public/ui-sound.js` | ⏳ Pending (needs owner's ears) |
| 4 | `npm run build` + manual test matrix (section 6) | — | ⏳ Pending |
| 5 | Ship | — | ⏳ Pending |

Each phase is independently revertible (git). No lockfile changes in any phase.

## 6. Acceptance Criteria

- [ ] `npm run build` succeeds.
- [ ] No sound before first user gesture; first click anywhere unlocks audio.
- [ ] Default mute honors `navigator.getAutoplayPolicy("audiocontext")`; explicit choice persists and wins.
- [ ] Theme toggle plays ascending sound → light, descending sound → dark.
- [ ] Nav links, inline links, pagination, tags all tick (≤60ms latency, inaudible delay).
- [ ] 20 rapid clicks stay tolerable.
- [ ] Mute button: silences immediately, persists across reloads and pages; unmute plays confirmation tick.
- [ ] Keyboard: Tab + Enter on nav link triggers tick.
- [ ] Tested on Chrome, Firefox, Safari (desktop) + one mobile browser; WAV decoding covers pre-2020 Safari.
- [ ] Site still loads with JS-cached-off fresh visit; sounds add ~27KB fetched lazily.

## 7. Resolved Decisions

| # | Decision | Resolution |
|---|---|---|
| 7.1 | Default mute state | Detect via `navigator.getAutoplayPolicy("audiocontext")` — "disallowed" at load → muted. Re-checked on first gesture (auto-unmute if now allowed), unless the user made an explicit choice. Explicit choice persists and always wins. |
| 7.2 | Mute toggle glyph | Inline SVG speaker icons (volume-2 / volume-x style, currentColor) — identical monochrome rendering everywhere. |
| 7.3 | External-link variant | `tick-external`: same tick character with an ascending pitch slide — signals navigation away from the site. |
| 7.4 | Pagination direction variant | `tick-newer` (higher pitch) / `tick-older` (lower pitch) via `data-sound` attributes on pagination links. |
