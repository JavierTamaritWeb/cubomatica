# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Cubomática 1.7.1** — a Spanish-language maths game for 2nd grade of Primary school (7–8 years old), built on the official Spanish curriculum (RD 157/2022). Everything — code, comments, identifiers, docs, UI — is in Spanish. Keep writing in Spanish.

## A build step, but the same target: double-click, no network

Until 1.6.0 there was no `package.json`, no bundler and no server. 1.7.0 adds Gulp 5, but **the deployment target did not change**: `dist/index.html` opens by double-click from `file://`, with no server, exactly as before. Everything below still follows from that:

- Sources live in `src/`. Gulp concatenates them in a **contracted order** into one bundle, each file assigning onto one global `CB` object. No ES modules, no `import`.
- ES2017 strict subset with `var` and function expressions: no `?.`, no `??`, no private fields. Baseline hardware is a 2019 school Chromebook and a 6th-gen iPad. `terser` runs with `ecma: 5` so it can't rewrite that away.
- **No `fetch`, no `XMLHttpRequest`, no `import()` anywhere** in the game — CORS blocks them on `file://`. Anything that needs to read a file must be a subresource (`<script>`, `<link>`, `<audio>`).
- **`dist/` is committed to git.** That is the only reason "clone the repo and double-click" stays true for a teacher with no tooling.

**`manifiesto.json` owns the load order.** It used to live in three places at once. `gulpfile.js`, `gulp html`, the test pages and the audit all read it; nothing repeats it.

## Commands

```bash
npm install                      # once
npm run build                    # gulp build → dist/
npm run dev                      # build + browser-sync on dist/ + watch
npm run entregar                 # build && auditar — THE DELIVERY GATE
npm run autoprueba               # meta-test: does the audit see what it says it sees?
node pruebas/auditar.mjs         # the audit itself; .sh and .bat are 3-line wrappers
node herramientas/cruzar-clases.mjs   # the CSS↔HTML↔JS class cross-check, standalone
```

**Never run `auditar.sh` alone before a delivery.** It can pass green over a `dist/` built three days ago — that is the worst possible failure because it is green and it is false. `npm run entregar` builds first. (Block 5c does catch a stale `dist/`, by rebuilding the bundle in memory and comparing it byte for byte; `entregar` means you never have to rely on that.)

Tests run **in a browser** (they need DOM, canvas, `getComputedStyle` and font metrics), and there are two pages, both generated against `dist/` — **the suite tests what ships, not the sources**:

- `pruebas/pruebas.html` → the readable bundle. Use this one; a stack trace pointing into `cubomatica.min.js:1:48231` helps nobody.
- `pruebas/pruebas-min.html` → the minified bundle. This is what validates the whole terser configuration: flip `mangle.toplevel` and twelve checks go red. **Run both before closing anything.**

Both need `npm run build` first; without it they say so instead of hanging on "Preparando…".

- **Suite rápida** button, or `CB.pruebas.ejecutar(false)` in the console.
- **Suite larga** button, or `CB.pruebas.ejecutar(true)` — same assertion count, but generators run 10× more items (`CB.pruebas.modoLargo` gates the sample size).
- **Run one suite**: filter before running.
  ```js
  CB.pruebas.suites = CB.pruebas.suites.filter(s => /Música/.test(s.nombre));
  CB.pruebas.ejecutar(false);
  ```
- Results land in `document.getElementById('resumen').textContent`. Current baseline: **639 checks, 0 failures** (deterministic).
- **The page auto-runs on load.** Filtering `CB.pruebas.suites` while that run is in flight truncates the list *mid-race*: the runner stops early and prints a green summary for a subset — 248/0 instead of 489. Wait for the `· NNNN ms` suffix before touching the array.
- **Serve the test pages with `Cache-Control: no-store`.** Chrome will happily reuse a cached `dist/js/cubomatica.js` or `casos-*.js` across a reload, so a green summary can be measuring code from three edits ago — and the check count won't necessarily change, which is what makes it invisible. Before trusting a run, assert something about the bundle you just built (`/paso <= 20/.test(String(CB.jefes.opciones))`, a function that should now exist) rather than assuming the reload did it.
- **Run it in a foreground tab.** Chrome throttles `setTimeout` in a background tab, and the suites are chained with `setTimeout(…, 0)`: backgrounded, a 10 s run stretches past 80 s or stalls outright. A partial `resumen` is easy to mistake for a finished one — the `· NNNN ms` suffix is only appended when the last suite ends, so a summary without it is still running.

**Every bug ever fixed has a guard in `pruebas/casos-regresiones.js`.** Its header lists all seventy-three found so far (E1-E73) and where each guard lives. The rule it states: a bug fixed without a test comes back. Add to it before closing any defect.

**Celebration is a table of vehicles, not a table of trajectories** (`CB.ui.festejo.CELEBRACIONES`, 1.8.1). 1.8.0 shipped nine choreographies that were all the same band — same width, same place, same type — and varying the path does not vary what a child recognises. Worse, the E47 guard written alongside it forbade any modifier from repositioning the band, so the monotony was *held in place by a test*. When a check blocks the fix, the check is part of the bug. The rule that orders the table only works once the vehicle differs: spectacle is inversely proportional to frequency, so the 60 %-case is a one-line `+1` beside the gem counter and the band is reserved for three rare moments.

**`_06-biomas.scss` sets `position: relative` on every direct child of `.pantalla` and `.zona-juego` not in its exclusion list, and wins on cascade order.** Any new overlay that forgets to add itself there keeps its `top` but stops being absolute, and lands hundreds of pixels below the fold: invisible, with nothing failing. This has now happened twice — the hurry-up notice in 1.7.0 and the achievement cartel in 1.8.1, the second time with 519 green checks. E47 compares the *computed* `position` of the overlays; that is the only check that sees it.

**The cinta is one of those vehicles.** One node per screen — `.cinta` plus `.cinta--<coreografía>` — now shared by three moments: the `Hurry up!`, the recovery after a failure, and the boss victory. Two invariants that are structural, not stylistic:

- **No number exists twice.** CSS owns the shape (`@keyframes` + `steps(n)`, via the `coreografia()` mixin, which has *no duration parameter*); JS owns the time (`CB.ui.cinta.COREOGRAFIAS`). This replaced `MS_CARTEL = 1900`, a constant hand-copied from the stylesheet whose own comment warned it would drift. E48 cross-checks both directions.
- **The mixin emits longhands**, so the audit's `animation:`-shorthand grep for `steps(` stopped seeing the newest animations. Block 3 gained an `animation-timing-function` check for exactly this. When you add a rule to the hard-rule greps, ask which *form* of the property you are matching — the blind spot is always the form you didn't think of.

Message text splits in two on purpose: the cinta carries a short grito from `CB.datos.MENSAJES.GRITOS`, and the full message — including the `{proc}` sentence, which is the only part that teaches — stays still in `#item-mensaje`. Don't move the procedure onto the cinta; it cannot be read in 900 ms.

**Where the last seven came from, because none of them was a typo.** E40-E46 were all green under 56 audit checks, 405 suite checks and a clean class cross-check. Three families, and each one is a place worth looking first:

- **A function nobody calls.** `CB.partida.marcarLectura()` was correct, documented, and only invoked from `responder()` — the instant of answering — so every word problem recorded rt = 0, which handed out the maximum speed bonus and made the anti-guess detector flag slow readers. Nothing fails when a function is never reached.
- **A property that doesn't exist.** `CB.musica.claveDePantalla()` read `estado.mundoId`; `iniciar()` writes `estado.mundo`. `undefined` fell through to the fallback, so three of the four world themes never played. In a codebase with no types and no modules, a misspelled property read is silent by construction — grep cross-module `.estado.` accesses when in doubt.
- **A rule applied in one place out of three.** The "one answer per attempt" latch existed only in `CB.partida.responder`; the boss fight and the calibration each had the identical hole (5 taps = 5 blocks; 5 taps = 5 correct out of 4 items, which sets the child's trimester ceiling). When a fix's comment explains a general hazard, search for the other sites that share it.

Two more mechanical checks worth keeping: every `while` in `src/` must have a bound (`42-jefes.js` had the only one that didn't, and it hung the tab in 22.9 % of one boss's fights), and `CB.almacen.sanear()` drops every key starting with `_`, so **no `_`-prefixed field may hold state that needs to survive a save** — that is what made difficulty `D` a one-way ratchet.

`auditar.mjs` block 8 runs `herramientas/cruzar-clases.mjs` — a zero-dependency Node cross-check of every CSS class against HTML and JS, in both directions. It is the only thing that can see a half-finished rename: a class renamed in the CSS and not in the JS throws no error, it just renders unstyled. It reads the real files on purpose; the browser suite mounts reduced mock sections, so half the game's classes would look unused there.

Both test pages load ONE bundle plus mock `<section>`s. Adding a source file means adding it to `manifiesto.json` and nowhere else — that is the point of the manifest. But when you add a DOM node that a module caches at runtime, add it to the mocks.

## The architecture frontier (enforced, not aspirational)

`src/js/00-nucleo.js`, `src/js/10-*` … `js/18-*`, and `src/js/20-*` … `src/js/2A-*` are **pure**. In those files:

- no `document.`, `window.`, `localStorage`, `navigator.`
- no `Math.random` — all randomness goes through the injected seeded RNG (`CB.util.mulberry32`), so a game is reproducible from its seed
- no `toISOString` anywhere in the project (it returns the previous day after 22:00 in Spain) — use `CB.util.hoyISO()`
- storage key literals (`'cubomatica.'`) exist **only** in `src/js/01-almacen.js`

Note the flip side: with no modules, every top-level `function name()` lands on `window`. There are twelve, with names as generic as `tabla` and `serie`; `casos-carga.js` pins the exact list so a colliding thirteenth fails a test instead of silently shadowing.

`pruebas/auditar.mjs` greps for these after stripping comments — with its own `sinComentariosJS`, in Node, no `python3` and no `perl` (those went with the shell audit in 1.7.0; `sin-comentarios.py` is gone). The comment stripping exists because a comment documenting a prohibition used to trip the grep for it — if you add a check, strip comments first.

Its blind spot, if you extend it: a regex literal containing `\/\/` looks like the start of a line comment, so the rest of that line is stripped and becomes invisible to every grep. No source file has one today. Prefer `[/]{2}` or a character class if you ever need one in `src/`.

## Load-order tiers

| Range | Layer | Rule |
|---|---|---|
| `datos/*.js` (7) | content tables | loaded first |
| `js/00`–`js/07` | platform adapters | may touch DOM/Web Audio/`localStorage`; this is where the outside world is allowed in |
| `js/10`–`js/18` | generators + catalogue | pure |
| `js/20`–`js/2A` | engine (scoring, anti-guess, lives, adaptive, memory, DAG) | pure |
| `js/30`–`js/99` | UI, screens, game loop | DOM lives here |

Reordering is what breaks; concatenating is safe. There are exactly **three hard edges**, and everything else is order-independent (a previous version of this file claimed `25-mensajes.js` and `14-gen-problemas.js` read `CB.datos` at definition time — they do not; no `js/*.js` does):

1. `datos/nombres.js` + `datos/objetos.js` → `datos/vocabulario.js`, whose IIFE builds `LISTA_BLANCA`
2. `js/10`…`js/16` → `js/17-catalogo.js`, whose IIFE captures references to the seven generator objects
3. `js/31-pantallas.js` → `js/99-arranque.js`, which registers 8 `alEntrar` and 2 `alSalir` at definition time

`js/99-arranque.js` holds the project's **only** `DOMContentLoaded`, and it returns early when `#btn-jugar` is absent — that is what stops the test pages from booting a game, and (since 1.7.0) what stops them from registering a service worker that would cache the suite itself.

**`alEntrar` handlers paint; they must never navigate.** A handler that calls `CB.pantallas.ir()` on its own screen recurses until the stack blows, and `ir()`'s `catch` turns that into the generic error screen rather than a stack trace. This shipped in 1.0.0 and made the adult panel unreachable. `ir()` now carries a re-entrancy latch, and `casos-carga.js` enters all 16 navigable screens on every run.

## Contracts that tests enforce

Changing any of these numbers means changing the test that asserts it, on purpose:

- **45 sources** on disk *and* in `manifiesto.json` — equality is checked both ways, so a new file nobody declared is a failure · **17 screens** · **10 SCSS partials** in the manifest, **12 `.scss` files** on disk (the manifest owns the ten that get `@use`d, in order; `cubomatica.scss` and `_herramientas.scss` are the entry point and the mixins) · **9 music tracks** · **12 SFX**
- **92 levels** across **4 worlds**, no repeats and no orphans (`casos-curriculo.js`, CU1–CU8)
- **24 error codes = 24 recommendations**, same key set
- **30 exact scoring cases**, no tolerance (`casos-formulas.js`)
- Four weight budgets, not one: **compiled sources < 900 KB**, **tests < 500 KB** (split off in 1.10.0 — the single 1100 KB budget was breached entirely by guard growth, and raising it would have loosened the guard until it said nothing), **boot download < 400 KB** (`index.html` plus exactly what it references — this is the one that protects startup), **music < 60 MB**

**Anything checked against `dist/` counts occurrences, never lines.** `grep -c '<section id="p-' dist/index.html` returns **1**, not 17, because the minified HTML is a single line. Same family of trap: `animation: none !important` serialises as `animation: auto ease 0s 1 normal none running none`, so match on `style.animationName`, not on text; and cssnano shortens `#000000` to `#000`, which silently *skipped* a WCAG contrast pair until `hex()` learned to read both forms.

**Seed the bug before you trust the guard.** Every self-check written here that turned out to be broken looked correct and was green. Three that only surfaced by reintroducing the defect on purpose:

- **Zero has many spellings in CSS**, and the hard-rule regexes knew one. `border-radius: 0.5rem` slipped past the filter that forgives zero, because `0.5rem` *starts* with `0`; `box-shadow: 0 0 4px` slipped past a regex demanding `px` on the offsets; `transition: opacity 90ms` slipped past a search for `ease` — CSS's **default timing function is `ease`**, so a smooth transition need never write the word. Read declaration by declaration and layer by layer, and prefer asserting the one permitted form (`steps(`) over enumerating the forbidden ones.
- **`window.caches = doble` does nothing.** It is getter-only, so in sloppy mode the assignment is silently dropped and your test measures the real CacheStorage. Use `Object.defineProperty` (it *is* configurable), restore the saved **descriptor**, and assert the double actually installed.
- **A suite may return a promise and the runner awaits it** (`ejecutor.js`). Before that it called `s.fn()` and moved on in the same turn, so every assertion about async work was written as "if it hasn't arrived yet, pass" — which passes always.
- **`CB.componentes.montar()` blocks synchronously and unblocks in a timer**, even with `bloqueoMs: 0`. Type a digit on the line after building a keypad and `pulsa()` takes its early return, so the visor stays empty — and "the first Enter must not answer" then passes because there was nothing to answer. Await the unblock, then assert the digit actually landed before testing anything downstream of it.
- **Don't construct a module's input by hand when a real function produces it.** `casos-musica.js` built `{mundoId: m.id}` — a shape `CB.partida.iniciar()` never emits — copied from the very line that had the bug, so test and code agreed with each other for the whole life of the project while three of the four world themes never played. Build the state with `iniciar()` and ask the module about *that* object.

**Reading a function's source (`fn.toString().indexOf(…)`) is only valid for string literals and property names.** Terser preserves those (`mangle.properties` is forbidden — it would rewrite the localStorage keys of every saved profile). It does not preserve variable names, spacing or quote style. The dangerous case is a *negative* assertion: `indexOf("crear('h3'") === -1` passed for years and then passed for the wrong reason, because terser writes double quotes. Assert behaviour instead. And `toString()` **includes comments** in the readable bundle but not in the minified one, so `!/mundoId/.test(String(fn))` went red against correct code the moment the fix's own comment explained what `mundoId` used to be — a negative source assertion that disagrees between the two test pages is the same trap wearing a different hat.
- **The version string**: `CB.VERSION` in `js/00-nucleo.js` is the single source. `README.md`, `CHANGELOG.md` and `LEEME.txt` repeat it and `auditar.mjs` fails if they drift. Bump the major only when the saved-profile format changes, because that forces a migration in `01-almacen.js`.

`js/17-catalogo.js` is the single source of truth for the 92 levels and 4 worlds and is explicitly a contract file.

## Two rules that look like style and are not

**CSS**: zero `border-radius` other than 0, zero blurred `box-shadow` (3rd value must be 0), zero eased transitions — all motion is `steps()`. This is the voxel aesthetic and `auditar.mjs` fails the build on any of the three — and the self-test (`npm run autoprueba`) now fires all three against invented violations, because for a while they only looked like they did.

**Trademark**: a blacklist grep runs over every distributed file. `docs/` is excluded (declared non-distributable), and `AVISO-LEGAL.txt`, `js/00-nucleo.js` (`CB.LEGAL`), `datos/nombres.js` and `pruebas/casos-marca.js` are exempt because they *declare* the blacklist. Never let a third-party mark into a filename, an identifier or user-visible text. This is why the nine music files were renamed.

## Sound is split in two, deliberately

`js/04-audio.js` synthesises 12 SFX through Web Audio. `js/07-musica.js` plays 9 MP3s through `<audio>` elements, because putting a file into an `AudioContext` needs `decodeAudioData()` on an `ArrayBuffer` — i.e. `fetch()` — which `file://` blocks. The two paths never meet, so **`CB.audio.silenciar()` reaches the music by hand**; that call is the only seam and must stay.

Music is driven off `CB.bus.emitir('pantalla', id)`, emitted by `CB.pantallas.ir()`, `atras()` and `fallo()`. All 17 screens are in `CB.musica.PANTALLAS`, `null` meaning deliberate silence, so adding a screen and forgetting the music is a test failure rather than a silence nobody notices.

## Accessibility constraints that are legal, not preferences

This is school material subject to **EN 301 549 / WCAG 2.2 AA**:

- Any time limit must be disableable — `CB.partida.SEGUNDOS_ITEM.sinPrisa === 0` is asserted by `casos-reloj.js`.
- Never colour alone: every state that uses colour also changes shape, size, text or motion.
- `prefers-reduced-motion` and `:root.sin-movimiento` must both be handled, at the end of `src/scss/_05-animaciones.scss`. They come from **one list** through `desactivar-movimiento()` emitted twice, because for months they were two hand-kept lists and the in-game setting silently missed ten animations (E27). Removing motion may not remove information.
- Contrast pairs are measured against computed CSS variables in `casos-contraste.js`, not asserted by hand.

## Before changing behaviour, read `docs/decisiones.md`

It is the record of closed decisions (scoring formula, per-family base values, storage keys and migration, the 17 screen ids, the single wording of the lives rule) plus **C1–C5**: internal contradictions in `PLAN.md` found while implementing, and **P1–P2**: the two changes requested after delivery (music, and the visible 30 s countdown, which deliberately contradicts PLAN §11.4).

`PLAN.md` is the 3 000-line spec. Where it and `docs/decisiones.md` disagree, the decisions document wins and explains why. `docs/musica.md` does the same for the audio assets.

Two things remain undone because they need real children, not code: **F0.5** (paper pilot, 3 children) and **F10** (β calibration with 10–15 children — the current `betaBase` values are documented as a reasoned calibration, not a measurement).
