# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Cubomática 1.0.0** — a Spanish-language maths game for 2nd grade of Primary school (7–8 years old), built on the official Spanish curriculum (RD 157/2022). Everything — code, comments, identifiers, docs, UI — is in Spanish. Keep writing in Spanish.

## No build step, no dependencies, no network

There is no `package.json`, no bundler, no transpiler and no server. The deployment target is **double-clicking `index.html` from `file://`**. Every design decision downstream follows from that:

- 44 `<script src>` tags in `index.html`, in a **contracted order**, each assigning onto one global `CB` object. No ES modules, no `import`.
- ES2017 strict subset with `var` and function expressions: no `?.`, no `??`, no private fields. Baseline hardware is a 2019 school Chromebook and a 6th-gen iPad.
- **No `fetch`, no `XMLHttpRequest`, no `import()` anywhere** — CORS blocks them on `file://`. Anything that needs to read a file must be a subresource (`<script>`, `<link>`, `<audio>`).

## Commands

```bash
bash pruebas/auditar.sh          # THE DELIVERY GATE. Must be green. auditar.bat on Windows.
bash servir.command              # local server, auto-picks a free port from 8000 (servir.bat on Windows)
node --check js/07-musica.js     # syntax check a single file (node is used for nothing else)
```

Tests run **in a browser** (they need DOM, canvas, `getComputedStyle` and font metrics). Open `pruebas/pruebas.html` by double-click, or via the local server for the checks that need HTTP.

- **Suite rápida** button, or `CB.pruebas.ejecutar(false)` in the console.
- **Suite larga** button, or `CB.pruebas.ejecutar(true)` — same assertion count, but generators run 10× more items (`CB.pruebas.modoLargo` gates the sample size).
- **Run one suite**: filter before running.
  ```js
  CB.pruebas.suites = CB.pruebas.suites.filter(s => /Música/.test(s.nombre));
  CB.pruebas.ejecutar(false);
  ```
- Results land in `document.getElementById('resumen').textContent`. Current baseline: **294 checks, 0 failures**.

`pruebas/pruebas.html` loads the same 44 scripts with a `../` prefix plus mock `<section>`s. When you add a script to `index.html` you must add it here too, and when you add a DOM node that a module caches at runtime, add it to the mocks.

## The architecture frontier (enforced, not aspirational)

`js/00-nucleo.js`, `js/10-*` … `js/18-*`, and `js/20-*` … `js/2A-*` are **pure**. In those files:

- no `document.`, `window.`, `localStorage`, `navigator.`
- no `Math.random` — all randomness goes through the injected seeded RNG (`CB.util.mulberry32`), so a game is reproducible from its seed
- no `toISOString` anywhere in the project (it returns the previous day after 22:00 in Spain) — use `CB.util.hoyISO()`
- storage key literals (`'cubomatica.'`) exist **only** in `js/01-almacen.js`

`auditar.sh` greps for these after stripping comments (`pruebas/sin-comentarios.py` for JS, an inline `perl` for CSS). The comment stripping exists because a comment documenting a prohibition used to trip the grep for it — if you add a check, strip comments first.

## Load-order tiers

| Range | Layer | Rule |
|---|---|---|
| `datos/*.js` (7) | content tables | loaded first; `25-mensajes.js` and `14-gen-problemas.js` read them at definition time |
| `js/00`–`js/07` | platform adapters | may touch DOM/Web Audio/`localStorage`; this is where the outside world is allowed in |
| `js/10`–`js/18` | generators + catalogue | pure |
| `js/20`–`js/2A` | engine (scoring, anti-guess, lives, adaptive, memory, DAG) | pure |
| `js/30`–`js/99` | UI, screens, game loop | DOM lives here |

`js/99-arranque.js` holds the project's **only** `DOMContentLoaded`, and it returns early when `#btn-jugar` is absent — that is what stops the test page from booting a game.

## Contracts that tests enforce

Changing any of these numbers means changing the test that asserts it, on purpose:

- **44 scripts** on disk and in `index.html` · **17 screens** · **9 stylesheets** · **9 music tracks** · **12 SFX**
- **92 levels** across **4 worlds**, no repeats and no orphans (`casos-curriculo.js`, CU1–CU8)
- **24 error codes = 24 recommendations**, same key set
- **30 exact scoring cases**, no tolerance (`casos-formulas.js`)
- Code weight **< 900 KB**; music weight **< 60 MB** (two separate budgets on purpose — one budget would let the code balloon unnoticed)
- **The version string**: `CB.VERSION` in `js/00-nucleo.js` is the single source. `README.md`, `CHANGELOG.md` and `LEEME.txt` repeat it and `auditar.sh` fails if they drift. Bump the major only when the saved-profile format changes, because that forces a migration in `01-almacen.js`.

`js/17-catalogo.js` is the single source of truth for the 92 levels and 4 worlds and is explicitly a contract file.

## Two rules that look like style and are not

**CSS**: zero `border-radius` other than 0, zero blurred `box-shadow` (3rd value must be 0), zero eased transitions — all motion is `steps()`. This is the voxel aesthetic and `auditar.sh` fails the build on any of the three.

**Trademark**: a blacklist grep runs over every distributed file. `docs/` is excluded (declared non-distributable), and `AVISO-LEGAL.txt`, `js/00-nucleo.js` (`CB.LEGAL`), `datos/nombres.js` and `pruebas/casos-marca.js` are exempt because they *declare* the blacklist. Never let a third-party mark into a filename, an identifier or user-visible text. This is why the nine music files were renamed.

## Sound is split in two, deliberately

`js/04-audio.js` synthesises 12 SFX through Web Audio. `js/07-musica.js` plays 9 MP3s through `<audio>` elements, because putting a file into an `AudioContext` needs `decodeAudioData()` on an `ArrayBuffer` — i.e. `fetch()` — which `file://` blocks. The two paths never meet, so **`CB.audio.silenciar()` reaches the music by hand**; that call is the only seam and must stay.

Music is driven off `CB.bus.emitir('pantalla', id)`, emitted by `CB.pantallas.ir()`, `atras()` and `fallo()`. All 17 screens are in `CB.musica.PANTALLAS`, `null` meaning deliberate silence, so adding a screen and forgetting the music is a test failure rather than a silence nobody notices.

## Accessibility constraints that are legal, not preferences

This is school material subject to **EN 301 549 / WCAG 2.2 AA**:

- Any time limit must be disableable — `CB.partida.SEGUNDOS_ITEM.sinPrisa === 0` is asserted by `casos-reloj.js`.
- Never colour alone: every state that uses colour also changes shape, size, text or motion.
- `prefers-reduced-motion` and `:root.sin-movimiento` must both be handled, at the end of `css/05-animaciones.css`. Removing motion may not remove information.
- Contrast pairs are measured against computed CSS variables in `casos-contraste.js`, not asserted by hand.

## Before changing behaviour, read `docs/decisiones.md`

It is the record of closed decisions (scoring formula, per-family base values, storage keys and migration, the 17 screen ids, the single wording of the lives rule) plus **C1–C5**: internal contradictions in `PLAN.md` found while implementing, and **P1–P2**: the two changes requested after delivery (music, and the visible 30 s countdown, which deliberately contradicts PLAN §11.4).

`PLAN.md` is the 3 000-line spec. Where it and `docs/decisiones.md` disagree, the decisions document wins and explains why. `docs/musica.md` does the same for the audio assets.

Two things remain undone because they need real children, not code: **F0.5** (paper pilot, 3 children) and **F10** (β calibration with 10–15 children — the current `betaBase` values are documented as a reasoned calibration, not a measurement).
