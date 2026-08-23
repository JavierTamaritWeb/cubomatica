# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Cubomática 1.23.5** — a Spanish-language maths game for 2nd grade of Primary school (7–8 years old), built on the official Spanish curriculum (RD 157/2022). Everything — code, comments, identifiers, docs, UI — is in Spanish. Keep writing in Spanish.

## A build step, but the same target: double-click, no network

Until 1.6.0 there was no `package.json`, no bundler and no server. 1.7.0 adds Gulp 5, but **the deployment target did not change**: `dist/index.html` opens by double-click from `file://`, with no server, exactly as before. Everything below still follows from that:

- Sources live in `src/`. Gulp concatenates them in a **contracted order** into one bundle, each file assigning onto one global `CB` object. No ES modules, no `import`.
- ES2017 strict subset with `var` and function expressions: no `?.`, no `??`, no private fields. Baseline hardware is a 2019 school Chromebook and a 6th-gen iPad. `terser` runs with `ecma: 5` so it can't rewrite that away.
- **No `fetch`, no `XMLHttpRequest`, no `import()` anywhere** in the game — CORS blocks them on `file://`. Anything that needs to read a file must be a subresource (`<script>`, `<link>`, `<audio>`, `<img>`, `url()`).
- **Binaries are allowed only from a closed, declared list.** Two lists exist: the nine MP3s and the twelve money photographs in `dist/img/` (64 KB). Audit block 4 checks both ways — nothing missing, nothing extra — and additionally that every piece is *declared and consumed* in the compiled CSS. For two versions the project believed the ban was technical ("a file would be a network request `file://` can't make"); it never was. An image is a subresource. What forbade them was a line in `auditar.mjs`. Before designing around a constraint, check whether it's the environment's or ours.
- **`dist/` is committed to git.** That is the only reason "clone the repo and double-click" stays true for a teacher with no tooling.

**`manifiesto.json` owns the load order.** It used to live in three places at once. `gulpfile.js`, `gulp html`, the test pages and the audit all read it; nothing repeats it.

**SCSS follows a 7-1-style layout** (1.23.2). `src/scss/app.scss` is the only entry point; the ten cascade-bearing partials are declared in `manifiesto.json`, while `abstracts/_mixins.scss` contains mixins. Shared Sass symbols use explicit namespaces (`v` for variables and `m` for mixins), and partial filenames describe responsibility without cascade-number prefixes; `manifiesto.json` remains the sole owner of load order. Global Sass configuration and global custom properties belong in `abstracts/_variables.scss`; component-scoped custom properties stay with their component because moving them to `:root` changes behaviour. SCSS comments use silent `//` syntax and explain only non-obvious constraints. Long history belongs in `docs/decisiones.md`.

**Development commands keep watching** (1.23.2). `npm run dev`, `npx gulp watch` and bare `npx gulp` build first and then wait for changes. The watcher covers all ten manifest partials plus `app.scss` and `_mixins.scss`. A change to `manifiesto.json` requires restarting Gulp because it is loaded once through `require()`.

## Commands

```bash
npm install                      # once
npm run build                    # gulp build → dist/
npm run dev                      # build + local servers + live reload + watch
npm run estilo                   # ESLint (JS) + stylelint (SCSS)
npm run entregar                 # estilo && build && auditar — THE DELIVERY GATE
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
- Results land in `document.getElementById('resumen').textContent`. Current baseline: **873 checks, 0 failures** (deterministic).
- **The page auto-runs on load.** Filtering `CB.pruebas.suites` while that run is in flight truncates the list *mid-race*: the runner stops early and prints a green summary for a subset — 248/0 instead of 489. Wait for the `· NNNN ms` suffix before touching the array.
- **Serve the test pages with `Cache-Control: no-store`.** Chrome will happily reuse a cached `dist/js/cubomatica.js` or `casos-*.js` across a reload, so a green summary can be measuring code from three edits ago — and the check count won't necessarily change, which is what makes it invisible. Before trusting a run, assert something about the bundle you just built (`/paso <= 20/.test(String(CB.jefes.opciones))`, a function that should now exist) rather than assuming the reload did it.
- **Run it in a foreground tab.** Chrome throttles `setTimeout` in a background tab, and the suites are chained with `setTimeout(…, 0)`: backgrounded, a 10 s run stretches past 80 s or stalls outright. A partial `resumen` is easy to mistake for a finished one — the `· NNNN ms` suffix is only appended when the last suite ends, so a summary without it is still running.

**Every bug ever fixed has a guard, and `pruebas/casos-regresiones.js` is where most of them live.** One hundred and eleven found so far (E1-E111). The newest ones do not all sit in that file: a defect is guarded wherever it can actually be measured, so E109-E111 live in `pruebas/auditar.mjs`, `pruebas/casos-a11y.js` and `pruebas/casos-musica.js` — `grep -rl E1NN pruebas/` is how you find one. The rule has not changed: a bug fixed without a test comes back. Add the guard before closing any defect.

**Celebration is a table of vehicles, not a table of trajectories** (`CB.ui.festejo.CELEBRACIONES`, 1.8.1). 1.8.0 shipped nine choreographies that were all the same band — same width, same place, same type — and varying the path does not vary what a child recognises. Worse, the E47 guard written alongside it forbade any modifier from repositioning the band, so the monotony was *held in place by a test*. When a check blocks the fix, the check is part of the bug. The rule that orders the table only works once the vehicle differs: spectacle is inversely proportional to frequency, so the 60 %-case is a one-line `+1` beside the gem counter and the band is reserved for three rare moments.

**`_biomas.scss` sets `position: relative` on every direct child of `.pantalla` and `.zona-juego` not in its exclusion list, and wins on cascade order.** Any new overlay that forgets to add itself there keeps its `top` but stops being absolute, and lands hundreds of pixels below the fold: invisible, with nothing failing. This has now happened twice — the hurry-up notice in 1.7.0 and the achievement cartel in 1.8.1, the second time with 519 green checks. E47 compares the *computed* `position` of the overlays; that is the only check that sees it.

**The money is photographs, and the figure lives beside them, not on them** (1.20.0). Twelve WebP files in `dist/img/`, each drawn at its real size to scale — 3,1 px/mm for coins anchored on the 1 € at 72 px, 0,85 px/mm for notes. That is why the 10 c coin is *smaller* than the 5 c: it is true, and it is the trap real money has. Two things follow that are structural:

- **The figure is DOM, never baked into the file.** A numeral inside the image doesn't grow with `letra-grande` or `modo-proyeccion` and can't be measured in a contrast pair — three accessibility settings this project is legally obliged to honour. It used to sit *on top* of the drawing (the SVG left the middle band free on purpose); over a photograph the free space is decided by the engraving, so it moved to an opaque `.pieza__cifra` strip *below* the image. Side effect worth knowing: the six per-colour contrast pairs collapse into one, the strip's.
- **A cent coin is `'c20'`, not `20`.** The four cent values collide with the four notes, so one number per piece would have painted "the 20-cent coin" with the 20 € note's photo *and* accepted it as correct (`Number(20) === Number(20)`). The price is that the answer is not a number: `40-partida.js` compares strings in its own branch (without it `Number('c20')` is `NaN` and the question is failed *always*, even when answered right), `casos-generadores.js` exempts INV1/INV3 narrowly, and fixed distractors skip the distractor engine in both the game and the test.

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

**`atras()` computes a destination and delegates to `ir()`; it never navigates by hand** (1.20.1). For three versions it kept its own copy of the `hidden` sweep, the bus event and — added two versions late — the `alSalir` call, while never gaining the focus move, the `aria-labelledby` or the `role="main"` that `ir()` does. And it popped exactly **one** entry: if that entry was a flow screen it fell straight to the reserve destination, which with a profile loaded is `p-mapa` — so the map's own "Salir" repainted the map and looked dead, on the most ordinary path in the game (portada → mapa → expedition → fin → SALIR leaves the map on top of the stack, because `atras()` does not push). It now discards *every* unusable entry — `CB.pantallas.SIN_VUELTA`, which includes `p-fin`, plus the current screen — and only then falls back, never to the screen it is already on. `_volviendo` is the one thing it keeps of its own: without it `ir()` would push the screen being left and "back" would become "forward". Guard: E94.

**A box that centres and also scrolls hides content above, unrecoverably** (1.21.0). `.zona-juego__alta` (then `.zona-superior`) had `justify-content: center` and `overflow-y: auto`. While the content fits, nothing happens; the moment it doesn't — a word problem's long enunciado plus `.mensaje-resultado`, which has a three-line floor — centring splits the overflow to *both* sides, and what sticks out above can never be reached, because `scrollTop` cannot be negative. The child saw the enunciado cut off at its first line and the bar only went down. The fix is the `safe` keyword (`align-items: safe center`, `justify-content: safe center`): centre while it fits, behave as `start` the moment it overflows. It goes on **both axes** — with `overflow-y: auto` the horizontal axis also computes to `auto`, so a row of money pieces wider than the column clipped on the left for the same reason — and on any other positional alignment in that box: the two-column layout's `align-items: flex-end` reintroduced the exact same clipping and is now `safe flex-end`. E95 does **not** read the CSS: `getComputedStyle` would report `safe center` and stay green even where the browser ignored it, so it measures the only consequence that matters — with the bar at the top, is the first line visible? — and asserts the converse too, that content which fits is still centred.

**The stylesheet has one grammar now, and a tool checks it** (1.23.0, E104-E105). `docs/convencion-bem.md` holds the nine rules; `stylelint.config.mjs` enforces the *shape* of every class name (kebab-case, a single `__`, zero `#id`, nesting ≤ 2) and **cannot** enforce the *sense* — that `luz` should be `luces__luz` is a human decision, and it lives with its motive in `pruebas/mapa-bem-2.json`. Three things are worth carrying forward. First, **a block may not change because of who contains it**: the seven `.panel-bloque .texto-menor` selectors became a container that *declares* `--texto-sec` and a block that consumes it with a fallback — it works with containers that don't exist yet and doesn't depend on cascade order. E105 greps the compiled CSS for block-to-block descent against a closed whitelist (the four `:root` states, and the structural `.pantalla > *:not(…)` of `_biomas.scss`, whose `:not()` contents are deliberately ignored). Second, **a rename is only safe with two nets that don't depend on names**: `herramientas/retrato-pantallas.mjs` (54 screenshots, sha256, zero pixels changed) and `herramientas/volcado-css.mjs` (declaration-by-declaration, applying the map to the old dump must give the new one). Third, the rename's own codemod is deleted after use, exactly as in 1.7.0: running it again over an already-renamed tree can only do harm.

**A rename turns silent-green tests into a trap, so fix them first** (1.23.0). Three checks passed by *not measuring*: `casos-contraste.js` returned early on any selector it couldn't find — eight text classes that are a legal obligation — `casos-a11y.js` treated a missing toolbar as an ordered one, and `casos-fuente.js` measured the `body` font when `.enunciado` was absent. They were hardened **before** any class moved; the first one caught two renamed classes the same afternoon. The helper they use, `CB.pruebas.claseEnHoja()`, asks `document.styleSheets` — the rules actually loaded, so it works against both the readable and the minified page — and returns `null` when the browser won't hand them over (`file://`), which the caller must treat as a failure with instructions, never as permission to skip.

**A media query is not a box: measuring in a 320 px `<div>` tests the broken state** (1.22.0, E102-E103). The E99-E100 trick — build a 320 px box on the test page and measure inside it — cannot see any fix that lives in `@media (max-width: 479px)`, because a media query is evaluated against the *viewport*, and the page's viewport is whatever the machine is. Both new guards therefore measure inside a **320 px `<iframe>`**, which has a viewport of its own, built with `srcdoc` plus the page's own stylesheet link (so `pruebas-min.html` tests the minified CSS). Two traps came with it: the iframe must be `position: fixed`, because `body` is a flex container and a plain iframe is a flex item whose height gets reassigned — it silently measured 150 px; and the guard asserts `innerWidth === 320` *and* that the stylesheet actually applied (a panel with no padding means nothing overflows and everything passes). Two real defects came out: at 320 px a word longer than about ten characters — «expedición», «guardianes», «Cubomática» — does not break on its own and simply sticks out of its panel, and `.pantalla--portada` is `overflow: hidden` on purpose (clouds and sky are out of flow), so the bottom row of the portada was unreachable at 320×480 and had been since before the Ayuda button was added to it. The scrollbar now belongs to `.pila-centro`, with the `safe` alignment of E95 on both axes.

**The help screen is static markup, and that is why the audit owns it** (1.22.0, E101). `p-ayuda` has no `alEntrar`: what it explains are the rules of the game, which do not change between plays, and painting it from JS would only add one more place for the text to go stale unnoticed. The consequence for testing is the interesting part: the browser suite mounts a *reduced* mock of every screen, so a guard written there would be checking the mock against itself. The real file is in front of `auditar.mjs`, so that is where the three checks live — the screen exists with its `<h1>` and its way out, some button leads to it, and the four worlds it names are the four `js/17-catalogo.js` declares. Renaming a world and leaving the old name in the help throws no error; it just leaves a child reading a map that no longer exists.

**320 px wide is a supported size, and things that don't fit there clip silently** (1.21.0, E99-E100). No horizontal scrollbar appears, nothing throws — the content is just cut off against the edge. Two cases: the portada's «CUBOMÁTICA» title (337 px with its padding, so eight px off each side) and the fourth toolbar button, Sonido, the only control that mutes the music. The title is fixed by letting it wrap plus a tighter side padding under 480 px — **not** by writing a font size for narrow screens, because `--tam-titulo` is what «Letra grande» and `modo-proyeccion` steer, and a literal there would disable both settings exactly where they matter most. The toolbar wraps to two rows rather than shrinking keys below the 64 px floor. Both guards measure inside a 320 px box, never against the real window: a window-conditional assertion is green on every wide machine for the wrong reason.

**The keypad must fit across, and where it cannot, it must be reachable** (1.21.0, E96-E98). Three defects found by measuring the game screen at fifteen window sizes crossed with «Letra grande» and «Modo proyección» — all three green under everything the project checks today, none visible by reading the stylesheet. (1) `:root.modo-proyeccion` wrote `--lado-respuesta: 150px` directly — the *result* of the two-axis `min()` — so a 1200×700 projector put the OK row outside the play area; it now writes both axes, and because a class selector beats `:root` on **specificity, not order**, the three height steps name `:root.modo-proyeccion` too. The note in `_variables.scss` that says "origin order wins" only holds between selectors of equal specificity. (2) The documented 6×2 exception was asked by height and never checked width: six 64 px columns plus gaps are 424 px, so a 360×640 phone lost two columns off the right edge; it now also requires `min-width: 480px`. (3) The 64 px floor per key is non-negotiable, so at supported sizes like 320×480 the keypad simply does not fit — and `.zona-juego__baja` (then `.zona-inferior`) had no scrollbar, which made the OK unreachable and the question unanswerable. It now scrolls, like the enunciado's zone, with the same `safe` alignment.

**From 1200 px the game screen is two columns: enunciado left, answer right** (1.21.0). `.zona-juego` turns `row` at `desde(escritorio)`. By width, not height — the two-axis rule: width decides how many columns, height decides the button side. The two halves *hug the centre* (`safe flex-end` / `flex-start`), because centring each half in itself puts 700 px between question and keypad on a 1440 screen, which is a longer sweep than the vertical layout it replaced. Below 1200 the device is a landscape tablet held in two hands, where thumb reach still outranks eye sweep. `.cinta`, `.cartel` and `.cielo` are unaffected: they are out of flow, which is what the exclusion list in `_biomas.scss` is for.

**`alEntrar` handlers paint; they must never navigate.** A handler that calls `CB.pantallas.ir()` on its own screen recurses until the stack blows, and `ir()`'s `catch` turns that into the generic error screen rather than a stack trace. This shipped in 1.0.0 and made the adult panel unreachable. `ir()` now carries a re-entrancy latch, and `casos-carga.js` enters all 16 navigable screens on every run.

## Contracts that tests enforce

Changing any of these numbers means changing the test that asserts it, on purpose:

- **45 sources** on disk *and* in `manifiesto.json` — equality is checked both ways, so a new file nobody declared is a failure · **18 screens** · **10 SCSS partials** in the manifest, **12 `.scss` files** on disk (the manifest owns the ten that get `@use`d, in order; `app.scss` and `abstracts/_mixins.scss` are the entry point and the mixins) · **9 music tracks** · **13 SFX** · **12 money pieces** in `dist/img/`, listed identically in `gulpfile.js` (service-worker shell) and `auditar.mjs`
- **92 levels** across **4 worlds**, no repeats and no orphans (`casos-curriculo.js`, CU1–CU8)
- **24 error codes = 24 recommendations**, same key set
- **30 exact scoring cases**, no tolerance (`casos-formulas.js`)
- Five weight budgets, not one: **compiled sources < 900 KB**, **tests < 500 KB**, **tooling (`herramientas/`) < 100 KB** — split off in 1.23.0, because that directory is neither compiled nor shipped and counting it with `src/` made *checking more* look like the game had grown (split off in 1.10.0 — the single 1100 KB budget was breached entirely by guard growth, and raising it would have loosened the guard until it said nothing), **boot download < 400 KB** (`index.html` plus exactly what it references — this is the one that protects startup), **music < 60 MB**

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

`js/04-audio.js` synthesises 13 SFX through Web Audio. `js/07-musica.js` plays 9 MP3s through `<audio>` elements, because putting a file into an `AudioContext` needs `decodeAudioData()` on an `ArrayBuffer` — i.e. `fetch()` — which `file://` blocks. The two paths never meet, so **`CB.audio.silenciar()` reaches the music by hand**; that call is the only seam and must stay.

**One gesture, one sound** (1.19.0). The generic click — `pulsar`, on every button *and* every key — is requested at the end of the gesture and only if the gesture stayed silent: `CB.audio.emitidos` counts sound *requests*, the delegates in `99-arranque.js` note it before and compare after, in a `setTimeout(0)` that keeps the listener in the capture phase (immune to `stopPropagation`) while still deciding last. This replaced a hand-written list of three exempt buttons which was born short — the keypad digit already brings its `picar` and the ⌫ its `toc`, so every digit a child typed sounded twice, with the click covering the sound that meant something. The counter must increment **before** the `ctx` check, or the whole rule tests green against nothing on a page with no `AudioContext`. One exception survives, the only one the counter cannot see because its sound arrives on a *different event*: the disabled button, whose `toc` comes from `pointerdown`. And any gesture opens the AudioContext, not just JUGAR — but a synthetic one does not: the browser grants no activation to `dispatchEvent`, so calling `iniciar()` there only leaves a suspended context (and it is what keeps the suite mute).

Music is driven off `CB.bus.emitir('pantalla', id)`, emitted by `CB.pantallas.ir()`, `atras()` and `fallo()` — with **one deliberate exception**: `CB.jefes.terminar()` calls `CB.musica.poner('victoria')` directly, because it paints the victory *on top of* `p-jefe` without changing screen, so the bus never fires and the boss theme would keep playing through the one moment the game reserves for stopping everything. It is annotated in the table in `07-musica.js` and in `docs/decisiones.md`; the next screen change restores the theme by itself. All 18 screens are in `CB.musica.PANTALLAS`, `null` meaning deliberate silence, so adding a screen and forgetting the music is a test failure rather than a silence nobody notices.

## Accessibility constraints that are legal, not preferences

This is school material subject to **EN 301 549 / WCAG 2.2 AA**:

- Any time limit must be disableable — `CB.partida.SEGUNDOS_ITEM.sinPrisa === 0` is asserted by `casos-reloj.js`.
- Never colour alone: every state that uses colour also changes shape, size, text or motion.
- `prefers-reduced-motion` and `:root.sin-movimiento` must both be handled, at the end of `src/scss/base/_animaciones.scss`. They come from **one list** through `desactivar-movimiento()` emitted twice, because for months they were two hand-kept lists and the in-game setting silently missed ten animations (E27). Removing motion may not remove information.
- Contrast pairs are measured against computed CSS variables in `casos-contraste.js`, not asserted by hand.

**The accessible case must be the default, and the optimisation the exception** (1.23.5, E110). `:focus { outline: none }` plus a fallback ring written for `button` and `[tabindex]` is the classic recipe and it had two holes that reading the CSS does not show. The first is coverage: an `<input>` is neither of those, so the parental gate's field — the only text field in the game — had no focus indicator at all. The second is order: the fallback exists for browsers without `:focus-visible`, but written as an ordinary rule it also applied where `:focus-visible` works, so the modern browser got the mouse ring and the old one still got nothing on fields. The fix inverts the question — `:focus` paints the ring for every control, and `@supports selector(:focus-visible)` withdraws it only where the browser can tell keyboard from mouse. **When a fallback and an enhancement disagree, ask which one runs when the feature query fails**; that is the one that has to be correct.

**A control whose visible text is «Sí» or «No» has no accessible name of its own** — the row has it. The child's settings and the adult panel's compose theirs with `aria-labelledby` (label plus value) and publish `aria-pressed`, so a screen reader says «Letra grande, Sí, activado» where it used to say «Sí». Same review: the parental gate wires instruction, field and error together (`aria-describedby`, `aria-errormessage`, `aria-invalid`, `role="alert"`) and returns focus to the field to correct; its `inputmode="numeric"` was false from the start, since the answer was always a word. The half that lives in the markup and the SCSS is checked in `auditar.mjs`; the half JavaScript generates is checked in `pruebas/casos-a11y.js`, which mounts the real controls rather than asserting on source text. **E111 holds the test pages to the same standard** — the summary is a `role="status"` with `aria-busy`, the bar a real `role="progressbar"`.

## Before changing behaviour, read `docs/decisiones.md`

It is the record of closed decisions (scoring formula, per-family base values, storage keys and migration, the 17 screen ids, the single wording of the lives rule) plus **C1–C5**: internal contradictions in `PLAN.md` found while implementing, and **P1–P2**: the two changes requested after delivery (music, and the visible 30 s countdown, which deliberately contradicts PLAN §11.4).

`PLAN.md` is the 3 000-line spec. Where it and `docs/decisiones.md` disagree, the decisions document wins and explains why. `docs/musica.md` does the same for the audio assets.

Two things remain undone because they need real children, not code: **F0.5** (paper pilot, 3 children) and **F10** (β calibration with 10–15 children — the current `betaBase` values are documented as a reasoned calibration, not a measurement).
