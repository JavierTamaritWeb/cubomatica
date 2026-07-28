> **Documentación interna. No se distribuye con el juego.**

# Plan 1.8.0 — celebrar bien, enseñar más, estorbar menos

## Cómo se ha escrito este plan, y qué le falta

Se lanzó una auditoría multiagente de cinco lentes (pedagogía, diversión, facilidad,
cintas y pruebas) con crítica adversaria por lente. **Murió entera: los seis agentes
fallaron por límite semanal de uso y el diario no guardó ni un resultado parcial.** Las
fases 1 a 5 de este documento las escribió una sola lectura del código, directa.

De ahí que las fases 1 (la cinta), 2 (el escalón 4) y 5 (los guardianes) quedaran apoyadas
en código leído línea a línea, y **se implementaron en 1.8.0**; mientras que las fases 3 y
4 —fricción y diversión— se quedaron en direcciones con ejemplos sueltos, y **no se
tocaron**.

**Las dos lentes que faltaban se lanzaron después**, con el guion que quedó versionado en
`.claude/workflows/lentes-pendientes.js`: cinco agentes, dos exploraciones, dos críticas
adversarias y una síntesis. Su resultado es la **continuación** que va al final de este
documento, a partir de la fase 6, y sustituye a las fases 3 y 4 de aquí arriba, que se
quedan como lo que eran: una anotación provisional.

Antes de darla por buena se comprobaron en el código cinco de las afirmaciones que la
sostienen, porque un agente puede citar un fichero y una línea que no dicen lo que afirma.
Las cinco resultaron ciertas: `CB.componentes.PRESENTACION` no la llama nadie,
`CB.pantallas.atras()` no ejecuta `alSalir`, `p-reparacion` no está en `SIN_SALIR`,
`CB.voz.lecturaGuiada` no comprueba `CB.voz.activa` —solo lo hace `leer`— y
`perfil.mundos[id].jefeSinFallos` se escribe y no se lee jamás.

---

## Principio rector

> **La fricción vive en la matemática. En ningún otro sitio.**

De ahí salen las tres reglas que ordenan todo lo que viene:

1. **El espectáculo es inversamente proporcional a la frecuencia.** Lo que se ve veinte
   veces por sesión tiene que ser corto y limpio; lo que se ve una vez puede pararlo todo.
   Un mismo efecto repetido veinte veces deja de celebrar al tercero: pasa a ser una espera.
2. **La forma dice algo verdadero.** Acertar al segundo intento después de haber fallado no
   es lo mismo que acertar a la primera, y no puede celebrarse igual.
3. **Quitar movimiento no puede quitar información.** Es obligación legal (EN 301 549 /
   WCAG 2.2 AA), y aquí además es la comprobación que más veces ha salvado el proyecto.

---

# Fase 1 · La cinta de festejo · REVERSIBLE

Es la petición explícita del usuario y la fase más detallada del plan.

## 1.1 De qué se parte

| Pieza | Dónde | Qué hace hoy |
|---|---|---|
| `.aviso-prisa` | `src/scss/_03-componentes.scss:251` | cinta de fondo sólido, ancho completo, `top: 38%`, `z-index: 620`, `pointer-events: none` |
| `prisa-cruza` | `src/scss/_05-animaciones.scss:164` | 1900 ms, `steps(18, end)`: entra por abajo, rebota, se para en el centro, sale por arriba |
| `prisa-arde` | `src/scss/_05-animaciones.scss:177` | 300 ms × 6: oro → brasa → blanco |
| `CB.ui.reloj.gritar()` | `src/js/30-ui.js:678` | quita la clase, fuerza reflow con `void offsetWidth`, la repone, `sfx('prisa')`, `CB.a11y.urgente()`, oculta a los `MS_CARTEL = 1900` |
| `CB.ui.mensaje()` | `src/js/30-ui.js:216` | escribe `textContent` en un nodo **quieto** y anuncia por la región *polite* |

Y el detalle que condiciona todo el diseño: los mensajes de acierto de la categoría A son
`'¡Muy bien! {proc}'` (`src/datos/mensajes.js:156`), donde `{proc}` es una frase larga de
procedimiento — «Has pedido prestada una decena y la has deshecho bien»
(`src/datos/mensajes.js:52`). **Esa segunda parte es la carga educativa del mensaje.** No
puede cruzar la pantalla en 1900 ms: hay que poder leerla con calma.

## 1.2 El reparto: grito arriba, procedimiento quieto

- **La cinta lleva un GRITO corto** (≤ 14 caracteres). Nada más.
- **`#item-mensaje` sigue llevando el mensaje entero, quieto**, tal cual hoy, con su
  `min-height` de tres líneas y su marca de forma ◆/■ (`_03-componentes.scss:503-513`).

Ningún mensaje de `src/datos/mensajes.js` se toca, ninguna de las 84 + 48 plantillas
cambia, y **ninguna prueba de `casos-mensajes.js` se rompe**. El grito es material nuevo.

**Nace `CB.datos.MENSAJES.GRITOS`** en `src/datos/mensajes.js`: dos listas cortas.

| Lista | Nº | Registro | Ejemplos |
|---|---|---|---|
| `GRITOS.acierto` | 24 | exclamativo | `¡Toma!` · `¡Eso es!` · `¡Ahí está!` · `¡Bloque!` · `¡Clavado!` · `¡Se abre!` |
| `GRITOS.animo` | 12 | **sereno, sin exclamación** | `Casi` · `Otra vez` · `Mira aquí` · `Con calma` |

Los ánimos van sin exclamación a propósito: un cartel gritando encima de un fallo es
crueldad decorada. Las **dos listas negras** de `casos-mensajes.js` (M5 elogio de persona,
M6 registro impropio) se aplican también a `GRITOS` — es un guardián nuevo, no algo que
salga solo.

## 1.3 El repertorio: ocho coreografías

CSS define **la forma**; JS define **la duración**. Todas con `steps()`, que es lo único
que la auditoría permite.

| # | Coreografía | ms | pasos | Recorrido | Cuándo sale | Sonido |
|---|---|---|---|---|---|---|
| 1 | `cinta-sello` | 900 | 6 | escala 2.4 → 1 con un paso de rebote, sin desplazarse | acierto categoría **A** (el caso por defecto, ~60 %) | `acierto` |
| 2 | `cinta-sube` | 1100 | 8 | sube desde abajo y **se queda**, sin salir | acierto **B** (esfuerzo, le ha costado) | `acierto` |
| 3 | `cinta-junta` | 1300 | 10 | dos mitades entran por izquierda y derecha y se encuentran en el centro | acierto **C** (superación: acierta tras fallar o tras reparación) | `subirNivel` |
| 4 | `cinta-cascada` | 1500 | 12 | cae desde arriba con rebote, arde oro → cristal | acierto **D** (racha ≥ 3, veta o mundo nuevo) | `gema` |
| 5 | `cinta-estalla` | 1600 | 12 | del centro hacia fuera, tres pasos de sobreimpulso | logro desbloqueado / luz extra | `luzExtra` |
| 6 | `cinta-bandera` | 1800 | 14 | se despliega horizontal, como una tela que se estira | jefe derrotado | `cofre` |
| 7 | `cinta-veta-madre` | 2000 | 16 | **RARA**: las letras entran una a una | bloque raro (`PROB_BLOQUE_RARO = 0.05`, `src/js/40-partida.js:24`) | `cofre` |
| 8 | `cinta-posa` | 800 | 6 | baja un 40 % y se posa. Tonos piedra, no oro | **ánimo** (fallo) | ninguno; ya suena `fallo` |

Las cuatro primeras se enganchan a las categorías que **ya existen y ya se calculan**:
`CB.mensajes.categoriaAcierto()` (`src/js/25-mensajes.js:67`) devuelve A, B, C o D con
prioridad C > D > B > A. No hay que inventar señales: están todas en `trasAcierto`
(`src/js/40-partida.js:559-563`) — `e.rachaPrimerIntento`, `vetaNueva`, `e.intento === 2`,
`punt.mTiempo`, `item.esBloqueRaro`.

**Cero efectos de sonido nuevos.** Los doce actuales (`acierto`, `fallo`, `luzApagada`,
`luzExtra`, `picar`, `toc`, `gema`, `subirNivel`, `rocarr`, `gluglu`, `prisa`, `cofre`,
`src/js/04-audio.js:102`) cubren las ocho coreografías. El contrato de 12 no se toca.

### Las tres capas contra la monotonía

1. **Significado** — la tabla de arriba. La forma codifica qué ha pasado.
2. **Novedad** — dentro de una misma coreografía, el **grito** no se repite hasta agotar la
   bolsa. Se reutiliza tal cual `CB.mensajes.sacarDeBolsa()` (`src/js/25-mensajes.js:109`),
   que ya hace exactamente esto para los mensajes.
3. **Rareza** — la coreografía 7 sale una de cada veinte. Sin algo que casi nunca se ve no
   hay sorpresa; solo hay rotación.

**Trampa de guardado, y es la que se cobró E45:** el estado de la bolsa nueva se persiste en
el perfil como `perfil.mensajes.bolsaGritos`. **Ni un campo con guion bajo delante**, porque
`CB.almacen.sanear()` borra todas esas claves y la bolsa se reiniciaría en cada guardado —
que es exactamente el fallo que hizo que la dificultad `D` fuera un trinquete de una sola
dirección.

**Aleatoriedad:** la elección va por el RNG sembrado que ya recibe `CB.mensajes.acierto()`
vía `ctx.rng`. `Math.random` está prohibido y una partida tiene que ser reproducible desde
su semilla.

## 1.4 Los tiempos, que es donde esto se rompe

Hoy: acierto → `setTimeout(siguiente, 1600)` (`src/js/40-partida.js:586`); fallo →
`setTimeout(siguiente, 2200)` (`src/js/40-partida.js:469`). **Una coreografía de 2000 ms no
cabe en 1600.**

Regla, y no se cambia caso por caso:

```
espera = max(esperaActual, duracion + 500)
```

Los 500 ms son para leer lo que quedó escrito, no para ver el final de la animación. Y el
`max` garantiza que **el juego nunca va más deprisa que hoy**: acortar la espera recortaría
tiempo de lectura, que es justo lo contrario de lo que se busca.

| Coreografía | ms | espera acierto | espera fallo |
|---|---|---|---|
| `cinta-sello` | 900 | 1600 | — |
| `cinta-sube` | 1100 | 1600 | — |
| `cinta-junta` | 1300 | 1800 | — |
| `cinta-cascada` | 1500 | 2000 | — |
| `cinta-estalla` | 1600 | 2100 | — |
| `cinta-bandera` | 1800 | 2300 | — |
| `cinta-veta-madre` | 2000 | 2500 | — |
| `cinta-posa` | 800 | — | 2200 |

### Contra la desincronización CSS↔JS

Hoy `CB.ui.reloj.MS_CARTEL = 1900` es **una constante copiada a mano** del CSS, y el propio
comentario de `src/js/30-ui.js:577-579` avisa de que si divergen el cartel desaparece a
media pantalla o se queda un rectángulo invisible tapando.

**Fuente única: la tabla de JS.**

```js
CB.ui.cinta.COREOGRAFIAS = {
  sello:      { ms:  900, pasos:  6, sfx: 'acierto' },
  sube:       { ms: 1100, pasos:  8, sfx: 'acierto' },
  /* … */
};
```

`CB.ui.cinta.mostrar()` escribe `el.style.animationDuration = ms + 'ms'`. El CSS define solo
los `@keyframes` y el `steps()`; la duración la pone JS. Así no hay dos números que
mantener. Y como el mixin `desactivar-movimiento()` emite `animation: none !important`
(`src/scss/_herramientas.scss:167`), **el `!important` sigue ganándole al estilo en línea**:
el movimiento reducido se impone igual.

## 1.5 Un solo nodo, o la colisión es inevitable

Dos cintas superpuestas son ilegibles. La única forma de que eso no pueda pasar es que
**haya un solo nodo**: el `#aviso-prisa` de `src/index.html:184` pasa a `#cinta`, y
`.aviso-prisa` pasa a ser `.cinta.cinta--prisa`.

Es un renombrado de clase, y en este proyecto un renombrado a medias no da ningún error:
**el elemento simplemente sale sin estilo** (es la lección de E28). El juez es
`herramientas/cruzar-clases.mjs`, que cruza CSS ↔ HTML ↔ JS en las dos direcciones y es lo
único capaz de verlo. Va en su propio sub-commit, antes de añadir ninguna coreografía.

Sitios a tocar, todos: `src/index.html:184`, `src/js/30-ui.js:590,678,680,699`,
`src/scss/_03-componentes.scss:251`, `src/scss/_05-animaciones.scss:183,209`,
`src/scss/_herramientas.scss:175`.

**Y las páginas de prueba montan `<section>` reducidas: hay que añadir `#cinta` a los mocks**
o `CB.ui.cinta.montar()` cacheará `null` y todos los guardianes nuevos pasarán en verde sin
comprobar nada.

Encadenamiento: `mostrar()` empieza cancelando lo anterior — `clearTimeout`, quitar la clase
de coreografía, `void offsetWidth`, poner la nueva. Mismo patrón que `gritar()` ya usa.

## 1.6 Lo que no varía nunca

- **No tapar la fila del borrado, el 0 y el OK.** Ya pasó una vez y está contado en
  `src/scss/_03-componentes.scss:236-250`: el aviso de que quedaba poco tiempo caía justo
  encima del botón con el que se contesta. Ninguna coreografía baja del 38 % de altura, y
  todas conservan `pointer-events: none`.
- **Nunca color solo.** La variedad está en el recorrido, la duración y el número de pasos.
  El tono acompaña; no distingue.
- **Movimiento apagado.** Las ocho entran en la lista `$animados` de
  `src/scss/_05-animaciones.scss:206-210` — una sola lista, dos contextos, por el mixin. Y
  cada una necesita su línea de excepción como la que ya tiene el cartel de prisa en
  `_herramientas.scss:175`: **la cinta sigue apareciendo, quieta en el centro, el mismo
  tiempo, y se va sin recorrido.** El grito es información; el movimiento solo es la gracia.
- **Región viva.** Las felicitaciones van por *polite*, nunca por *urgente*: no caducan. Y
  se anuncia **el mensaje completo, una sola vez** — el grito no se anuncia, porque un lector
  de pantalla que oye «¡Toma!» y a continuación «¡Toma gema! Has llevado bien la decena» oye
  lo mismo dos veces.
- **El idioma.** «Hurry up!» está en inglés porque así se pidió. Todo lo demás sigue en
  español.

## 1.7 Presupuesto

~140 líneas de SCSS (8 bloques de `@keyframes` + el mixin de geometría) y ~90 de JS, más 36
cadenas cortas de datos. Del orden de **3 KB minificados y comprimidos** sobre los 319 KB de
descarga de arranque: el presupuesto de 400 KB no corre peligro.

## 1.8 Hecho cuando

Las ocho coreografías se ven en las cuatro anchuras de referencia, ninguna toca la fila
inferior del teclado, con `prefers-reduced-motion` las ocho aparecen y se leen quietas, y
una partida entera de veinte ítems no repite grito.

**Guardianes nuevos: E47-E54.** Todos en `pruebas/casos-regresiones.js`.

| | Qué atrapa | Cómo |
|---|---|---|
| **E47** | una coreografía tapaba la fila del `⌫`, el `0` y el `OK` | monta teclado y cinta en el mock y compara `getBoundingClientRect()` |
| **E48** | la duración del CSS y la del JS se desincronizaron | todas las claves de `COREOGRAFIAS` tienen `@keyframes` en `document.styleSheets`, **y al revés**: todo `@keyframes cinta-*` está en la tabla |
| **E49** | una coreografía nueva no entró en `$animados` | con `:root.sin-movimiento`, `getComputedStyle(el).animationName === 'none'` para las ocho. **`animationName`, nunca el texto**: `animation: none !important` se serializa como `auto ease 0s 1 normal none running none` |
| **E50** | con el movimiento apagado el mensaje desaparecía | `opacity === '1'` y `textContent` no vacío en ese mismo estado |
| **E51** | dos cintas seguidas se pisaban | dos `mostrar()` encadenados dejan una sola clase de coreografía y un solo temporizador |
| **E52** | la bolsa de gritos no sobrevivía al guardado | la clave no empieza por `_` y sigue ahí tras `CB.almacen.sanear()` |
| **E53** | los gritos nuevos se saltaban las listas negras | M5 y M6 de `casos-mensajes.js` barren también `GRITOS` |
| **E54** | el juego pasaba al ítem siguiente antes de acabar la cinta | para las ocho, `espera >= ms + 400` |

---

# Fase 2 · El escalón 4, que lleva desde el principio sin existir · REVERSIBLE

**Esto es un agujero educativo, no una mejora.** La escalera antifrustración declara cinco
escalones (`src/js/2A-escalera.js:18-23`) y el cuarto es `prerrequisito`: al cuarto fallo
seguido de un concepto, el juego debería **retroceder al prerrequisito ya dominado** y
dejar que el niño lo resuelva, en vez de seguir preguntando lo que no entiende.

No se aplica. `trasFallo` atiende `enPausa` y `bajarD_opciones` y nada más; el propio código
lo dice en `src/js/40-partida.js:648`.

Y es exactamente la primera de las tres familias de fallo que ya se cobraron siete defectos
en verde: **una función que nadie llama.** `CB.grafo.prerrequisitoDominado()`
(`src/js/29-grafo.js:78`) está escrita, documentada — su comentario dice literalmente «para
el escalón 4 de la escalera» — y no la invoca nadie.

**Qué se hace:** en `trasFallo`, rama `esc.accion === 'prerrequisito'`: pedir el
prerrequisito dominado, inyectar **un** ítem de ese nivel, y volver. Con un mensaje que no
mienta: «Vamos a por uno más fácil de este mismo tema, y luego volvemos.» El escalón 5
(`enPausa`) sigue detrás como está.

**Contrato tocado:** ninguno de los verificados. **Guardián E55.**

---

# Fase 3 · Fricción que no es matemática · REVERSIBLE

Dirección con menos evidencia acumulada que las dos anteriores: son puntos verificados, no
un barrido completo.

1. **El bloqueo de 800 ms al montar el teclado.** `CB.componentes.montar()` bloquea
   síncronamente y desbloquea en un temporizador. Está para que un toque heredado del ítem
   anterior no responda al siguiente, y eso es correcto. Lo que hay que comprobar es si el
   niño recibe **alguna señal** de que aún no puede tocar, o si simplemente pulsa y no pasa
   nada — que se lee como que el juego está roto.
2. **Deshacer.** Revisar qué puede tocar un niño de 7 años sin poder volver atrás.
3. **Toques hasta el primer ítem** desde la portada. Contarlos y recortar lo que sobre.

**Hecho cuando:** cada punto tiene su medida antes y después. **Guardianes: los que salgan,
numerados de corrido desde E56.**

---

# Fase 4 · Recompensa variable · REVERSIBLE

La fase 1 arregla ya la mitad de esto: hoy toda celebración tiene la misma forma.

Lo que queda por mirar, con la evidencia que hay:

- **Diez logros reservados para «la versión 2»** (`src/js/24-logros.js:76-85`): están
  declarados, tienen nombre, y su descripción dice «Reservado para la versión 2». Un niño
  que abre la pantalla de logros ve diez huecos que no puede conseguir. O se implementan o
  no se enseñan.
- **El bloque raro** (1 de cada 20) da un cromo y nada más. Con la coreografía 7 de la fase 1
  pasa a *sentirse* raro, que es lo que le faltaba.

---

# Fase 5 · Los guardianes viejos y lo que ninguna red ve · REVERSIBLE

Los 46 fallos corregidos tienen guardián. **No todos los guardianes valen lo mismo**, y este
proyecto ya se ha llevado dos sustos con guardianes que estaban en verde por el motivo
equivocado.

## 5.1 Repasar E1-E46 buscando tres patrones concretos

- **Asertos negativos sobre el texto fuente.** `fn.toString()` incluye los comentarios en el
  bundle legible y no en el minificado, así que un `!/algo/.test(String(fn))` puede ponerse
  rojo contra código correcto en cuanto un comentario nombre lo que se arregló — pasó ya con
  el guardián de E42. Regla: **afirmar comportamiento, no ausencia de texto.**
- **Asertos que pasan por vacuidad.** El de E46 comprobaba que el primer Enter no contestaba
  cuando no había nada que contestar. Todo guardián que dependa de un estado previo tiene que
  **afirmar primero que ese estado se alcanzó.**
- **Entradas construidas a mano.** `casos-musica.js` fabricaba `{mundoId: m.id}`, una forma
  que `CB.partida.iniciar()` no emite nunca, copiada de la línea que tenía el fallo. Regla:
  **si una función real produce el dato, que lo produzca ella.**

**Método, y es lo que separa esto de mirar el código y opinar: sembrar el fallo.** Reintroducir
cada defecto en `src/`, reconstruir, y comprobar que se pone rojo el guardián que debe. Los
siete de la ronda anterior se validaron así y dos de ellos no atrapaban nada.

## 5.2 Comprobaciones mecánicas nuevas en `auditar.mjs`

Node puro, sin dependencias, como el resto:

- **Todo `@keyframes` del CSS compilado lo referencia alguna regla.** Una animación muerta no
  da error: no se ve, y nadie se entera.
- **Todo `animation:` del CSS compilado lleva `steps(`.** Hoy se comprueban las tres reglas
  duras, pero conviene afirmar **la forma permitida** en vez de enumerar las prohibidas: el
  *timing* por defecto de CSS es `ease`, así que una transición suave puede no escribir nunca
  la palabra. Es como se colaron los cuatro huecos de E39.
- **Cruce `CB.ui.cinta.COREOGRAFIAS` ↔ `@keyframes cinta-*`**, en las dos direcciones, dentro
  de `herramientas/cruzar-clases.mjs`, que ya hace este tipo de cruce para las clases.

**Punto ciego conocido, a respetar al escribirlas:** un literal de expresión regular que
contenga una doble barra parece el comienzo de un comentario de línea, y el despojador de
comentarios se come el resto de la línea, que queda invisible para todos los `grep`. Ninguna
fuente tiene uno hoy. Si hace falta, `[/]{2}`.

**Hecho cuando:** `npm run autoprueba` dispara cada comprobación nueva contra una violación
inventada y la ve. Una auditoría que no se prueba a sí misma puede llevar meses rota y verde.

---

# Fuera de alcance, y por qué

- **Nuevos mundos, niveles o destrezas.** Los 92 niveles en 4 mundos son contrato verificado
  (`casos-curriculo.js`, CU1-CU8) y el alcance curricular está declarado por escrito frente
  al RD 157/2022. Ampliarlo es otra conversación, no una mejora.
- **Imágenes, fuentes o binarios.** Cero ficheros de imagen es una propiedad del proyecto,
  no una casualidad: las texturas se generan con `canvas` y los efectos con Web Audio.
- **Multijugador, tablas de clasificación, comparación entre niños.** El README declara
  explícitamente que el juego no compara. No se toca.
- **F0.5 y F10** (pilotaje en papel con 3 niños; calibración β con 10-15). Siguen pendientes
  y **siguen sin poder hacerse con código**: necesitan niños reales. Los `betaBase` actuales
  son una calibración razonada, no una medida, y así hay que seguir diciéndolo.
- **Reescribir `.aviso-prisa` como componente genérico más allá de la cinta.** El renombrado
  de la fase 1.5 es el mínimo necesario para que no haya colisión. Nada más.

---

# Versión: 1.8.0

Segunda cifra. Entra capacidad nueva —el repertorio de cintas y el escalón 4— y **el formato
del perfil guardado no cambia de forma incompatible**: `perfil.mensajes.bolsaGritos` es una
clave que `CB.mensajes.asegurar()` crea si falta, igual que hace hoy con las demás bolsas.
Un perfil de 1.7.1 abre en 1.8.0 sin migración, así que la primera cifra se queda donde
está — la regla escrita del proyecto es que solo sube cuando el formato obliga a migrar en
`src/js/01-almacen.js`.

Réplicas a actualizar, las seis: `src/js/00-nucleo.js` (fuente), `README.md`,
`CHANGELOG.md`, `LEEME.txt`, `package.json` y `dist/sw.js` (la inyecta gulp).

---

# Verificación

```bash
npm run entregar        # build + auditoría: la puerta
npm run autoprueba      # ¿ve la auditoría lo que dice que ve?
node herramientas/cruzar-clases.mjs
```

Suite en **las dos páginas**, en pestaña en primer plano y **servidas sin caché**:
`pruebas/pruebas.html` y `pruebas/pruebas-min.html`. Base esperada tras el plan: **443 + los
guardianes nuevos**, 0 fallos. Antes de dar por bueno un verde, afirmar algo del bundle recién
construido (`CB.VERSION`, una función que ahora debe existir): una recarga normal de Chrome
reutiliza el bundle y los `casos-*.js`, y entonces el verde mide el código de hace tres
cambios sin que el número de comprobaciones lo delate.

**A mano, porque no se automatiza:**

1. Doble clic en `dist/index.html`, partida entera, consola limpia.
2. Las ocho coreografías vistas de verdad, incluida la rara — forzar `PROB_BLOQUE_RARO = 1`
   temporalmente para verla.
3. `prefers-reduced-motion` emulado en DevTools **y** el ajuste del propio juego: las dos
   rutas, porque llevaron meses desincronizadas (E25).
4. Una sesión de veinte ítems seguidos comprobando que no se repite grito ni se repite
   coreografía dentro del mismo nivel de significado.

---

<!-- A partir de aquí, la continuación que devolvieron las dos lentes que
     faltaban (diversión y facilidad de jugar), ya filtrada por su crítica
     adversaria. Guion: .claude/workflows/lentes-pendientes.js -->

# Plan 1.8.0 → 1.9.0 · continuación: diversión y facilidad

> Continuación de `docs/plan-mejoras-1.8.0.md`. Las fases 1, 2 y 5 están cerradas.
> Esto es lo que las dos lentes que faltaban (diversión, facilidad) devolvieron, ya
> filtrado por su crítica adversaria. Todo lo marcado «incumple-restricción» o
> «descartar» está en **Fuera de alcance**, con el motivo.

## Qué ordena estas diez fases

El principio rector no cambia: **la fricción vive en la matemática y en ningún otro sitio**.
Lo que las dos lentes añaden es una segunda regla que sale del propio código:

> **Lo que el juego mide y no enseña, no existe.**

Las tres familias de fallo que ya costaron E40-E46 vuelven a estar aquí enteras:
`CB.componentes.PRESENTACION` (`src/js/32-componentes.js:550`) no la llama nadie,
`perfil.mundos[id].jefeSinFallos` (`src/js/42-jefes.js:254`) solo se escribe, y
`CB.pantallas.atras()` (`src/js/31-pantallas.js:108`) aplica la mitad de la regla que
`ir()` aplica entera.

**Cero ficheros nuevos.** Las 45 fuentes siguen siendo 45 y `manifiesto.json` no se toca.
Cero efectos de sonido nuevos, cero pistas nuevas, cero imágenes.

---

# Fase 6 · Tres funciones escritas que nadie llama · REVERSIBLE

La familia E40/E41 otra vez. Ninguna de las tres es un error de lógica: son conductos que
no se conectaron.

## 6.1 `atras()` se salta `alSalir`

`ir()` ejecuta el manejador de salida con su `try/catch` en `src/js/31-pantallas.js:34-36`.
`atras()` (`src/js/31-pantallas.js:108-127`) no lo hace en ningún punto. Los dos únicos
manejadores registrados son `alSalir['p-reparacion']` (`src/js/99-arranque.js:384`) y
`alSalir['p-partida']` (`src/js/99-arranque.js:390`), así que **la mitad de las salidas del
juego no limpian nada**.

Consecuencia medible: `p-reparacion` no está en `SIN_SALIR` (`src/js/31-pantallas.js:18`,
que solo lleva `p-portada` y `p-error`) y el manejador de Escape
(`src/js/31-pantallas.js:181`) manda a `atras()` toda pantalla que no sea esas dos ni
`p-partida`. Escape en la tarjeta de reparación deja vivos el `setInterval(revisar, 400)`
y el salvavidas de `src/js/30-ui.js:442-454`, que a `tarjeta.salvavidasMs` (≥ 25 000 ms,
`src/js/26-reparacion.js:34`) habilita un botón invisible y llama a `CB.voz.leer` con los
tres pasos, **encima de otra pantalla**.

**Qué se hace.** Copiar las tres líneas de `src/js/31-pantallas.js:34-36` al **principio**
de `atras()`, antes de calcular el destino: leen `CB.pantallas.actual` y `atras()` lo
reescribe en la línea 121. Y cerrar el efecto colateral que se ve al leerlo: `atras()`
remapea `p-reparacion` a `p-mapa` (`src/js/31-pantallas.js:113-116`), de modo que el niño
sale de la reparación al mapa con `CB.partida.estado` todavía vivo. O `p-reparacion` entra
en `SIN_SALIR`, o Escape ahí se comporta como en `p-partida` (pausa). **Se elige pausa**:
es la que no inventa una pantalla nueva.

**Guardián E56** · `pruebas/casos-regresiones.js`.
Entrar en `p-reparacion` con una tarjeta real, afirmar **primero** que
`CB.ui._timersReparacion !== null`, llamar a `atras()`, y afirmar que quedó a `null`. Más
la vuelta simétrica: tras `atras()` desde `p-partida`, el reloj está parado.

**Que no nazca roto.** Sembrar: quitar las tres líneas de `atras()`. Tiene que ponerse roja
la aserción del `null`. Si el guardián sigue verde es porque no afirmó primero el estado
previo — es exactamente la vacuidad de E46.

## 6.2 La presentación de cada formato, escrita y muerta

`CB.componentes.PRESENTACION` (`src/js/32-componentes.js:550-558`) tiene las siete frases
de §7.3 escritas. `necesitaPresentacion` (`:560`) y `marcarVisto` (`:565`) también.
**Cero referencias fuera del propio fichero.** `componentesVistos` se declara en el
esqueleto (`src/js/01-almacen.js:195`), se repara en la migración (`:264`) y está en
`CAMPOS_PERMITIDOS` (`:443`) — y nadie lo escribe nunca.

Un niño ve la balanza o el selector de datos por primera vez sin una sola frase de
presentación, teniéndolas escritas.

**Qué se hace.** En `CB.partida.pintarRespuesta` (`src/js/40-partida.js:297`), antes de
montar el formato: si `CB.componentes.necesitaPresentacion(perfil, formato)`, pintar la
frase con `CB.ui.mensaje(CB.componentes.PRESENTACION[formato], 'animo')` y llamar a
`marcarVisto`. Media docena de líneas. El formato se resuelve donde ya se resuelve
(`src/js/40-partida.js:303` para problemas, `:311` en adelante para el resto).

**Guardián E57** · `pruebas/casos-regresiones.js`.
Servir un ítem de un formato no visto sobre un perfil recién creado y afirmar que
`perfil.componentesVistos` lo contiene y que `#item-mensaje` no está vacío; servir el mismo
formato otra vez y afirmar que ya no se repite la frase.

**Que no nazca roto.** Sembrar: dejar la llamada a `marcarVisto` y quitar la de
`necesitaPresentacion` (o al revés). La segunda mitad del guardián —«no se repite»— tiene
que ponerse roja. Un guardián que solo comprueba la primera vez pasa en verde con la
función a medio conectar.

**Residuo.** `componentesVistos` empieza a llenarse. Es aditivo, `sanear()` lo respeta (no
lleva `_`) y `podar()` no lo toca: un perfil escrito por 1.9.0 abre en 1.8.0.

## 6.3 En la partida nadie lee el enunciado en voz alta

`docs/decisiones.md:821` da por vivo que «la consigna y el enunciado se siguen leyendo solos
al aparecer», y `src/index.html:194-197` lo declara por escrito. Es falso:
`CB.partida.servirItem()` solo hace `CB.a11y.anunciar(item.consigna || item.enunciado || '')`
(`src/js/40-partida.js:284`) — región viva, no voz. No hay ni una llamada a `CB.voz.*` en
todo `40-partida.js` fuera de `accionLeer` (`:1248`). La única puerta es la tecla L
(`src/js/06-a11y.js:74`), y el aparato objetivo declarado es un iPad de 6.ª generación.

**Qué NO se hace, y por qué.** No se dispara `CB.voz.leerOGuiar` automáticamente.
`CB.voz.lecturaGuiada` (`src/js/05-voz.js:93`) **no comprueba `CB.voz.activa`** —solo lo
comprueba `leer`, en `:56`—, así que el ajuste «Leer en voz alta = No»
(`src/js/99-arranque.js:309`) no la apagaría: audio que arranca solo y no se puede parar es
WCAG 2.2 1.4.2. Y en un Chromebook sin voz española caería siempre en la guiada a
`MS_POR_PALABRA = 1000` (`src/js/05-voz.js:18`): ~25 s de resaltado con el cronómetro
corriendo, y todos los problemas se agotarían por tiempo.

**Qué se hace.**

1. En `servirItem()`, tras `src/js/40-partida.js:284`, solo si `item.subtipo` (el mismo
   criterio que usa `marcarLectura`) y solo si `CB.voz.activa && CB.voz.disponible()`:
   `CB.partida.pararCronometro();` y
   `CB.voz.leer(item.enunciado || item.consigna, function () { CB.partida.iniciarCronometro(true); });`
   Sin voz española no se dispara nada. `CB.voz.leer` ya devuelve `false` y llama a
   `alTerminar` en ese caso (`src/js/05-voz.js:55-62`), así que el cronómetro se restablece
   igual en el peor caso. El anuncio va primero y la voz después, como en
   `src/js/99-arranque.js:72-73`.
2. Vía táctil: **un botón de altavoz dentro de `#item-enunciado`**, no en la barra —P3
   retiró el de la barra (`docs/decisiones.md:813-816`) y esto no lo devuelve—. Llama a una
   variante de `accionLeer` **sin** la línea `CB.partida.bloqueado = false`
   (`src/js/40-partida.js:1246`): ese roce anularía de un toque el bloqueo antiazar de
   1200 ms (`src/js/21-antiazar.js`, aplicado en `src/js/40-partida.js:310`). Va fuera de
   `#item-respuesta`, así que no toca el `t0` que protege `conectarLectura`
   (`src/js/32-componentes.js:98-106`).
3. Corregir el comentario de `src/index.html:194-197`, que hoy declara algo que no pasa.

**Guardián E58** · `pruebas/casos-regresiones.js`, **en dos mitades** porque una sola pasa en
vacío.
Mitad A: con `CB.voz.activa = false`, servir un problema y afirmar que ni `CB.voz.leer` ni
`CB.voz.lecturaGuiada` recibieron nada (dobles instalados con `Object.defineProperty` y
restaurados por descriptor, no por asignación).
Mitad B: con voz simulada disponible, afirmar que recibió `item.enunciado` **y** que
`CB.partida.estado.temporizador` quedó a `null` mientras leía.

**Que no nazca roto.** Sembrar dos veces: (a) quitar la condición `CB.voz.activa` → la
mitad A tiene que ponerse roja; (b) quitar el `pararCronometro()` → la segunda aserción de
la mitad B tiene que ponerse roja. Si la mitad B pasa sin instalar el doble, es que estaba
midiendo `undefined`.

**Hecho cuando (Fase 6).** Escape en `p-reparacion` no deja ningún temporizador vivo,
medido en consola; la primera balanza de un perfil nuevo trae su frase; y un problema de
enunciado con voz española se lee solo con el reloj parado. **Contrato tocado: ninguno de
los verificados.**

---

# Fase 7 · El teclado que miente durante 800 ms · REVERSIBLE

`CB.componentes.montar()` deshabilita los doce botones (`src/js/32-componentes.js:41`) con
`MS_CONSTRUCCION = 800` (`:20`), aplicado a **todos** los ítems por
`src/js/40-partida.js:310`. El bloqueo es correcto. Lo que no lo es es cómo se ve.

## 7.1 El OK es la única tecla que sigue pareciendo viva

`.btn-bloque:disabled, .btn-bloque[aria-disabled="true"]`
(`src/scss/_03-componentes.scss:66-72`) tiene especificidad (0,2,0).
`.teclado-bloques .btn-bloque[data-tecla="ok"]` (`src/scss/_03-componentes.scss:362-367`)
tiene (0,3,0) y pone `background: var(--btn-primario)`. En `dist/css/cubomatica.css` están
en las líneas 820 y 1271, en ese orden. **Gana el verde.** Once teclas de piedra hundidas y
la que el niño quiere pulsar, brillante y mentirosa.

Y hay un agravante legal que nadie había visto: `desactivar-movimiento()` emite
`#{$prefijo}.btn-bloque--monta { opacity: 1; transform: none; }`
(`src/scss/_herramientas.scss:194`). Con el prefijo `:root.sin-movimiento ` eso es (0,2,1),
que gana a `.btn-bloque:disabled` (0,2,0) y **anula también el hundido**. Para quien juega
con el movimiento apagado —el ajuste que más lo necesita— el color queda como única señal.
Quitar movimiento no puede quitar información.

**Qué se hace.** En `src/scss/_03-componentes.scss`, después de la línea 367:

```scss
.teclado-bloques .btn-bloque[data-tecla="ok"]:disabled,
.teclado-bloques .btn-bloque[data-tecla="ok"][aria-disabled="true"] {
  background: var(--deco-piedra);
  color: var(--btn-texto);
}
```

Los dos selectores, porque la regla base de `:66-67` cubre los dos y dejar uno fuera reabre
el agujero por la otra puerta. Y en `src/scss/_herramientas.scss:194`, restringir la
excepción a `.btn-bloque--monta:not(:disabled)`, para que el hundido no dependa del ajuste
de movimiento.

Nota de precisión, que evita perseguir un fantasma: el defecto es **solo** del teclado de
`tecladoBloques`. La fase 3 de `selectorDatos` emite `data-tecla="OK"` en mayúsculas
(`src/js/32-componentes.js:514` pasa `{ tecla: t }` con `t = 'OK'`, y `CB.ui.boton` lo
vuelca literal, `src/js/30-ui.js:36-41`), y `[data-tecla="ok"]` distingue mayúsculas: ahí el
OK sí se apaga. Eso se arregla en la Fase 9, no aquí.

**Guardián E59** · `pruebas/casos-regresiones.js`.
Montar `tecladoBloques` con `bloqueoMs` alto y comparar
`getComputedStyle(ok).backgroundColor` con el de la tecla `'1'`: iguales. Más, con
`:root.sin-movimiento` puesto, afirmar que el `transform` calculado del OK deshabilitado
**no** es `none`. Mismo tipo de comprobación que E49 hace con `animationName`.

**Que no nazca roto.** Sembrar: quitar el selector nuevo del SCSS y reconstruir. La primera
igualdad tiene que ponerse roja. Y sembrar aparte: devolver `transform: none` al mixin → la
segunda tiene que ponerse roja. **Hay que reconstruir entre siembra y siembra**: el guardián
mide `dist/`, no `src/`.

## 7.2 Los dígitos deshabilitados están a 1,5:1

`.btn-bloque:disabled` pinta `color: var(--deco-piedra-osc)` sobre
`background: var(--deco-piedra)` (`src/scss/_03-componentes.scss:69-70`). Los valores salen
de `piedra: (#8C8C8C, #6E6E6E, #ADADAD)` (`src/scss/_herramientas.scss:29`): **#6E6E6E sobre
#8C8C8C = 1,52:1**, medido. Durante 800 ms por ítem no se distingue el 7 del 1.
`pruebas/casos-contraste.js:109` solo comprueba que `--deco-piedra` sea un color plano; no
mide este par.

**Qué se hace.** Cambiar la línea 69 a `color: var(--btn-texto)`. **#241C14 sobre #8C8C8C =
4,99:1**, medido, no estimado — y es el mismo color de texto que lleva el botón activo, así
que entre activo y bloqueado solo cambia el fondo más el bisel invertido y el hundido, que
es justo lo que se quiere decir.

`--gris-carbon` (#33302B, `src/scss/_01-variables.scss:143`) da **3,91:1**, no 4,9: no llega
al 4,5 de WCAG 1.4.3 y este proyecto ya se comió un fallo por creerse un contraste sin
medirlo. No se usa.

Y el modo de alto contraste necesita su propia línea: el mixin de
`src/scss/_01-variables.scss:217-234` reescribe `--btn-texto` a `#FFFFFF` y **no toca**
`--deco-piedra`, con lo que blanco sobre #8C8C8C son 2,9:1, peor que hoy. Se le da al estado
deshabilitado fondo `#333333` y texto `#FFFFFF`, que es lo que ya usa para
`--btn-fondo-hundido`.

**Guardián E60** · `pruebas/casos-contraste.js` (ampliación deliberada del conjunto de
pares; hoy son los cuatro de texto de `src/scss/_01-variables.scss:75-79`), con la entrada
correspondiente anotada en la cabecera de `pruebas/casos-regresiones.js`.
Medir el par del botón deshabilitado real —`getComputedStyle` sobre un botón montado, no los
tokens a mano— y exigir ≥ 4,5:1. Y repetirlo con `:root.alto-contraste` puesto.

**Que no nazca roto.** Sembrar: devolver `--deco-piedra-osc` a la línea 69 y reconstruir. La
comprobación tiene que dar 1,52 y ponerse roja. Cuidado con el trampantojo conocido: cssnano
acorta `#000000` a `#000`, así que el lector de hexadecimales tiene que leer las dos formas.

**Hecho cuando (Fase 7).** Con el teclado bloqueado, las doce teclas tienen el mismo fondo
calculado y los dígitos se leen; en `:root.sin-movimiento` siguen hundidas; en
`:root.alto-contraste` el par mide ≥ 4,5:1. **Contrato tocado:** `casos-contraste.js` gana un
par, a propósito. Ningún número contratado.

---

# Fase 8 · Deshacer, confirmar, y no perder la expedición por un roce · REVERSIBLE

## 8.1 Dos de los siete formatos no se pueden deshacer

`ordenarFila` (`src/js/32-componentes.js:337-355`): cada pieza tocada se empuja a
`_seleccion`, se escribe en el hueco, `b.disabled = true`, y al llenar el último hueco
**contesta sola**. `selectorDatos` fase «datos» (`:457-463`): sale por
`if (b.getAttribute('aria-pressed') === 'true') return;` sin desmarcar, y al llegar a
`necesarios` **salta de fase sola**. `tecladoBloques` sí tiene ⌫ (`:159-162`) y `monedas` sí
tiene «Empezar de nuevo» (`:400-402`).

El niño toca el 5 cuando quería el 3 y tiene que terminar mal a propósito. Y el registro que
se guarda marca `faseFallada = 'datos'` (`src/js/40-partida.js:825-827`), que atribuye al
niño un problema de comprensión lectora que no tiene.

**Qué se hace — deshacer sin peaje, no confirmar con peaje.** Exigir un OK añadiría un toque
obligatorio a cada ítem de esos formatos, que es lo contrario de esta lente, y chocaría con
`src/js/32-componentes.js:452-455`, que omite la fase 1 cuando hay exactamente dos números
«para no hacer perder el tiempo con una decisión que no existe» (§9.6).

- `ordenarFila`: **un** botón ⌫ junto a la fila de piezas (`src/js/32-componentes.js:336`)
  que haga `pop()` de `_seleccion`, deje el hueco en `'·'`, devuelva `disabled = false` y
  quite `btn-bloque--hundido` a la pieza de ese valor, y suene `CB.audio.sfx('toc')` como el
  ⌫ del teclado (`:161`). **Sin OK**: se sigue contestando al llenar el último hueco, así que
  el número de toques del caso bueno no cambia.
- `selectorDatos` fase «datos»: permitir destocar mientras se esté en esa fase. Y para el
  caso de que ya haya saltado, un botón **«◀ Cambiar los números»** en la fase «operación»
  que devuelva `fase = 'datos'`, vacíe `elegidos` y llame a `pintarFase()`. Un toque solo
  cuando hace falta, cero toques cuando no.

**Guardián E61** · `pruebas/casos-regresiones.js`.
Tocar tres piezas y deshacer dos: `_seleccion` queda con una, el segundo hueco vacío y la
pieza deshabilitada vuelve a estar habilitada. Y para `selectorDatos`: tocar dos números,
volver con «Cambiar los números», afirmar que `elegidos` está vacío y que ningún botón
conserva `aria-pressed="true"`.

**Que no nazca roto.** La trampa de `montar()` es obligatoria aquí: bloquea síncronamente y
desbloquea en un temporizador, así que hay que **esperar al desbloqueo y afirmar que el
primer toque entró** antes de deshacer nada. Sembrar: quitar el `disabled = false` del ⌫ →
tiene que ponerse roja la aserción de la pieza rehabilitada, no solo la de `_seleccion`.

## 8.2 La confirmación de dos toques del antiazar es muda

`CB.componentes.pedirConfirmacion` (`src/js/32-componentes.js:119-133`) hunde el botón
300 ms —indistinguible del `:active` normal de `src/scss/_03-componentes.scss:59-64`— y
`CB.a11y.anunciar('Toca otra vez para confirmar.')` (`:132`), que va a `#region-viva`, con
`clip: rect(0 0 0 0)` (`src/scss/_03-componentes.scss:556`). Justo después de decidir que el
niño va al tuntún, el juego le cambia la regla de entrada **y solo se lo cuenta a un lector
de pantalla**.

**Qué se hace.**

1. **Sustituir, no añadir**: en `:132`, cambiar el `anunciar` por
   `CB.ui.mensaje('Toca otra vez para confirmar.', 'animo')`. `CB.ui.mensaje` ya llama por
   dentro a `CB.a11y.anunciar` (`src/js/30-ui.js:222`), así que añadirlo sin quitar el otro
   haría que el lector lo dijera dos veces. `#item-mensaje` lleva su marca de forma ■.
   **No se usa la cinta**: podría pisarse con la del fallo, que es el defecto que cerró E51.
2. **Extender la confirmación a los cuatro formatos que se la saltan, no a dos.** Es el
   patrón E44 entero: hoy solo la aplican `tecladoBloques` (`:166`), `opciones4` (`:226`) y
   `balanza` (`:299`). Se la saltan `selectorSigno` (`:264-267`), la fase 3 de
   `selectorDatos` (`:496-509`), `ordenarFila` (`:338-355`) y `monedas` en modo pagar
   (`:387-395`). En los dos últimos la respuesta se dispara sola: la confirmación cuelga del
   gesto que la cierra —la última pieza, la pieza que alcanza el importe—, y **por eso esta
   fase va después de 8.1**, que es la que da el ⌫ del que colgarla.

Se dice a propósito: **cambia el comportamiento de cuatro formatos**, y solo cuando el
antiazar ha disparado.

**Guardián E62** · `pruebas/casos-regresiones.js`, **sobre los cuatro**.
Con `CB.componentes._confirmacionPendiente = true`, esperar al desbloqueo de `montar()`,
afirmar que el primer gesto **no** produjo respuesta y que `#item-mensaje` lleva la frase, y
que el segundo sí.

**Que no nazca roto.** Sembrar: quitar `pedirConfirmacion` de uno solo de los cuatro. El
guardián tiene que ponerse rojo **en ese formato**, no en bloque — si un fallo en uno tumba
los cuatro asertos, no sabremos cuál. Y sembrar la vacuidad: quitar la espera al desbloqueo;
el primer toque se pierde por el early return de `:158` y todo pasa en verde sin comprobar
nada.

## 8.3 «◀ Salir» acaba la expedición de un toque

`src/index.html:203`, en el mismo `.barra-herramientas__grupo` que Pausa y Sonido, abajo a la
derecha, a `--e3` = 16 px del de sonido, y del mismo tamaño. `src/js/40-partida.js:1325`:
`if (a === 'salir-partida') CB.partida.finalizar('salida');` — sin diálogo, que es una
decisión correcta y deliberada. Un roce del pulgar que sujeta la tableta y se acabó.

Precisión honesta, porque el daño se exageró: `finalizar` guarda el historial
(`src/js/40-partida.js:1094`), suma `puntosTotales` (`:1085`), conserva gemas y destrezas y
pinta la pantalla de fin. Lo que se pierde es el resto de la sesión y `partidaEnCurso`
(`:1117`), no los siete minutos de trabajo. Aun así, un roce no puede terminar nada.

**Qué se hace — cerrojo propio, NO `pedirConfirmacion`.** `pedirConfirmacion` empieza con
`if (!CB.componentes._confirmacionPendiente) { alConfirmar(); return; }`
(`src/js/32-componentes.js:120`), y esa bandera solo se pone a `true` cuando el antiazar ha
detectado azar (`src/js/40-partida.js:309`). En una partida normal vale `false`: pasar
`salir-partida` por ahí sería un no-operativo.

En `CB.partida.conectarBarra` (`src/js/40-partida.js:1308-1326`), latch de dos toques con
caducidad: primer toque → `data-confirmando="si"`, **`textContent = '◀ Salir de verdad'`**
(cambio de texto, no de color: «nunca color solo» es obligación legal),
`CB.ui.mensaje('Toca otra vez para salir. La expedición se guarda.', 'animo')` y un
`setTimeout` de ~3000 ms que restaure el rótulo y quite el atributo. Segundo toque dentro de
la ventana → `CB.partida.finalizar('salida')`.

Y el cambio que de verdad evita el roce y no cuesta lógica: **mover el botón de
`src/index.html:203` al grupo de la izquierda**, junto a Pista (`:199`), dejando Pausa y
Sonido solos en la zona del pulgar.

**Guardián E63** · `pruebas/casos-regresiones.js`.
Un toque deja `CB.partida.estado` distinto de `null` y el rótulo cambiado. Dos toques
seguidos lo dejan a `null`. Un toque y esperar la caducidad lo deja vivo con el rótulo
restaurado.

**Que no nazca roto.** Sembrar: dejar el `finalizar('salida')` directo. El primer aserto
—«un toque no termina»— tiene que ponerse rojo. La tercera aserción (caducidad) es la que se
olvida y la que atrapa el latch que nunca se suelta.

## 8.4 Tocar una moneda no deja ninguna marca

`src/js/32-componentes.js:387-395`: el `click` suma a `total`, escribe el marcador y suena
`gema`. La pieza sigue idéntica. Y `.moneda`/`.billete` no son `.btn-bloque`, así que ni
`:disabled` (`src/scss/_03-componentes.scss:66`) ni el «toc» de `src/js/32-componentes.js:85`
las alcanzan durante los 800 ms. Hay además una regla muerta:
`.moneda[aria-pressed="true"], .billete[aria-pressed="true"]`
(`src/scss/_03-componentes.scss:468-472`), y ningún `aria-pressed` se pone nunca sobre una
moneda.

**Qué se hace — contar, no marcar.** `disponibles: CB.gen.dinero.MONEDAS.concat([5, 10, 20])`
(`src/js/15-gen-dinero.js:141`) es **una pieza por valor, sin repeticiones**, y el manejador
no tiene cerrojo: pagar 6 € es tocar tres veces la moneda de 2 €. Poner `aria-pressed="true"`
convertiría un contador en un interruptor: le diría «pulsado» al lector de pantalla de un
botón que hay que seguir pulsando (mal uso de ARIA, WCAG 4.1.2).

- En el `click`, **antes** de la comprobación del objetivo de `:392` (si no, la última moneda
  nunca se vería marcada): `var veces = (parseInt(b.getAttribute('data-veces'), 10) || 0) + 1;
  b.setAttribute('data-veces', veces);`
- Una **fila visible de lo cogido** —`2 € + 2 € + 1 €`— junto al marcador de `:377`. Es lo
  que de verdad descarga la memoria: el niño ve la suma, no solo el resultado.
- Sustituir la regla muerta de `:468-472` por `.moneda[data-veces], .billete[data-veces]` con
  el mismo `outline`/`translateY` (el `outline` que ya usa cumple las tres reglas duras), y
  dar a `.moneda`/`.billete` estados `:active` y `:disabled` junto a `:443-466`, con
  `--deco-piedra` de fondo e `translateY(var(--bisel))`. Ampliar la condición de
  `src/js/32-componentes.js:85` para que el «toc» las alcance.
- **«Empezar de nuevo» (`:400-402`) limpia `data-veces` de todas las piezas y vacía la
  fila.** Hoy solo pone `total = 0`: con lo anterior y sin esto, tras reiniciar quedarían
  marcadas, que es peor que no marcar nada.

**Guardián E64** · `pruebas/casos-regresiones.js`, **sobre comportamiento**:
`herramientas/cruzar-clases.mjs` no ve selectores de atributo, así que afirmar que la regla
existe no vale.
Tocar dos veces la misma moneda deja `data-veces="2"` y la fila muestra dos piezas; pulsar
«Empezar de nuevo» las borra.

**Que no nazca roto.** Sembrar: mover el `setAttribute` detrás de la comprobación del
objetivo. La aserción de la fila con la última pieza tiene que ponerse roja. Y sembrar el
reinicio a medias: quitar la limpieza de «Empezar de nuevo» → la tercera aserción, roja.

**Hecho cuando (Fase 8).** Medida de toques por ítem antes y después en los cuatro formatos
tocados, escrita en el commit: el caso bueno no sube ni un toque en `ordenarFila` ni en
`selectorDatos` con dos números. Y un roce en la esquina inferior derecha ya no termina nada.
**Contrato tocado: ninguno de los verificados.** `pruebas/casos-*.js` no toca hoy
`ordenarFila`, `selectorDatos` ni `monedas` (cero ocurrencias): nace red donde no había.

---

# Fase 9 · Los tres teclados pasan a ser uno · REVERSIBLE

La fase 3 de `selectorDatos` (`src/js/32-componentes.js:495-517`) es una copia
desincronizada de `tecladoBloques`. Se usa en **todos** los problemas de enunciado desde el
segundo trimestre (`src/js/40-partida.js:303-304`):

| Diferencia | Copia (fase 3) | Original |
|---|---|---|
| ⌫ | mudo | `sfx('toc')` (`:161`) |
| dígito | mudo | `sfx('picar')` (`:174`) |
| visor | `crear('div','visor-respuesta')` pelado (`:492`) | `id` + `role="status"` + `aria-live` + `aria-label` (`:142-146`) |
| OK | sin `pedirConfirmacion` | `:166` |
| `pulsa` | no mira `CB.partida.bloqueado` | `:158` |
| `data-tecla` | `"OK"` **mayúsculas** (`:514`) | `"ok"` (`:178`) |

La última es la que remata: `[data-tecla="ok"]` distingue mayúsculas, así que el OK de la
fase 3 ni siquiera recibe el verde primario. Tres copias del mismo teclado y ninguna igual.

**Qué se hace.**

1. Añadir `opciones.contenedor` a `tecladoBloques`: `opciones.contenedor ||
   CB.componentes.contenedor()` en `src/js/32-componentes.js:138`. Unas diez líneas.
2. La fase 3 delega montando sobre `zona`, **envolviendo el callback para conservar intactos
   los cuatro campos de diagnóstico** de `:503-508` (`datosElegidos`, `signoElegido`,
   `faseDatosOk`, `faseOperacionOk`) y el origen `'datos'`: los lee `registrarRespuesta`
   (`src/js/40-partida.js:825-827`) y de ahí sale el informe del adulto.
3. Tras delegar, `CB.componentes.actual.tipo` valdría `'tecladoBloques'`: reasignarlo a
   `'selectorDatos'` después de la llamada. Y vigilar el orden con
   `if (CB.partida) CB.partida.bloqueado = false;` (`:524`), que se ejecuta **después** de
   `pintarFase()` y pisaría el bloqueo que ponga `montar()`.

Riesgo menor del temido: `CB.componentes.actual` no lo lee nadie fuera de
`32-componentes.js`. La fase 3 gana además manejo de teclado, que hoy no tiene
(`tecla: function () { return false; }`, `:526`).

**Guardián E65** · `pruebas/casos-regresiones.js`.
En la fase 3: un dígito suena, el visor tiene `aria-live`, el OK lleva `data-tecla="ok"` en
minúsculas, **y** los cuatro campos de diagnóstico llegan intactos a `alResponder`.

**Que no nazca roto.** Sembrar: borrar `faseDatosOk` del envoltorio. La cuarta aserción tiene
que ponerse roja. Es la que importa: unificar teclados es fácil, perder el informe del adulto
por el camino es el fallo real y no se ve en pantalla.

**Hecho cuando.** `grep -c "teclado-bloques" src/js/32-componentes.js` deja de encontrar dos
construcciones distintas, y la fase 3 se comporta igual que el teclado de operaciones en
sonido, visor, bloqueo y confirmación. **Contrato tocado: ninguno.** El contrato del informe
del adulto sigue idéntico, y eso lo comprueba el guardián.

---

# Fase 10 · Que el premio diga qué es · REVERSIBLE

Cinco momentos que el juego calcula, guarda y no enseña.

## 10.1 El cromo del bloque raro solo existe para el lector de pantalla

`CB.partida.darCromo()` (`src/js/40-partida.js:914-929`) hace `perfil.cromos.push(c)` (`:921`)
y su única salida es `CB.a11y.anunciar('Bloque raro: has encontrado el cromo de ' + c)`
(`:924`) — con el **id crudo**, `gluglu`, no el nombre. La cinta ya salió antes (`:606`) con
un grito genérico de la bolsa, porque `darCromo` se llama después (`:615`). El premio más
raro del juego —1 de cada 20 ítems, `PROB_BLOQUE_RARO`, `src/js/40-partida.js:275`— se
entrega sin decir qué es.

Y hay algo peor que nadie había visto: `darCromo` llama a `aplicarLogros` (`:928`), y
`aplicarLogros` hace `CB.ui.cinta.mostrar('estalla', '¡Logro!')` (`:896`), que **cancela la
cinta `veta-madre` recién puesta** —`mostrar()` empieza por `ocultar()`,
`src/js/30-ui.js:635`— justo en el ítem donde cae el 5.º cromo y salta «Coleccionista»
(`src/js/24-logros.js:60-63`).

**Qué se hace.** `CB.casa.NOMBRES_CROMO` (`src/js/44-casa.js:13-18`) tiene los once nombres y
el más largo, `Cristalina`, son 10 caracteres: cabe en el tope de 16 del grito
(`pruebas/casos-mensajes.js:64-66`).

1. `darCromo()` **devuelve** el id o `null`, y hace `push` + anuncio. La comprobación de
   logros de cromo se llama **después** de la cinta, para que `estalla` no pise a
   `veta-madre`.
2. En `trasAcierto`, resolver antes de la línea 603:
   `var cromo = item.esBloqueRaro ? CB.partida.darCromo() : null;` y
   `var grito = cromo ? ('¡' + CB.casa.NOMBRES_CROMO[cromo] + '!') : CB.mensajes.grito('acierto', {...});`
   Si `cromo` es `null` —los once ya reunidos, `return` de `src/js/40-partida.js:919`— queda
   el grito normal.
3. El mensaje quieto **se concatena, nunca se sustituye** (D-R11-2: el `{proc}` es la única
   parte que enseña): `msg = msg + ' Bloque raro: ' + NOMBRE + ' es tuyo. Está en tu álbum.'`
   antes de `CB.ui.mensaje` (`:594`).
4. El anuncio de `:924` dice el nombre, no el id, y es el **único** `anunciar` de ese ítem:
   `CB.a11y.anunciar` reescribe `#region-viva` de una vez y dos anuncios en el mismo turno se
   tapan.

**Efecto colateral que hay que declarar:** mover `darCromo` por delante del grito cambia el
orden de consumo del RNG sembrado (`CB.util.elegir` en `:920` frente a `sacarDeBolsa`). La
partida sigue siendo reproducible desde su semilla, pero **deja de dar la misma secuencia que
hoy**. Va escrito en el commit.

**Guardián E66** · `pruebas/casos-regresiones.js`.
Con `esBloqueRaro` forzado y un perfil con 10 cromos: el texto de la cinta contiene el nombre
del cromo recién añadido a `perfil.cromos`, y el mensaje quieto sigue conteniendo el `{proc}`
resuelto. Con los 11 reunidos, el texto de la cinta vuelve a ser uno de
`CB.datos.MENSAJES.GRITOS.acierto`.

**Que no nazca roto.** Sembrar: devolver `darCromo` a su sitio de después de la cinta. La
primera aserción, roja. Y sembrar el caso del final: dejar `posibles` vacío sin la rama
`null` → la aserción de los 11 reunidos tiene que ponerse roja, no reventar con excepción.
**Nada de `fn.toString()`**: se afirma el `textContent` del nodo, no el fuente.

## 10.2 El reto bonus está marcado en los datos y no en la pantalla

`item.esRetoBonus = (estadoNivel.D === 3) && (e.rng() < 0.25) && nivel.retoBonus;`
(`src/js/40-partida.js:274`), y `retoBonus: true` lo llevan los 92 niveles
(`src/js/17-catalogo.js:226`). El único consumidor es `src/js/40-partida.js:883`, hacia uno
de los tres logros que conceden luz (`src/js/24-logros.js:34-37`). `CB.ui.pintarItem`
(`src/js/30-ui.js:89`) no lo lee en ninguna línea. El niño recibe una luz extra sin saber por
qué.

**Qué se hace.** En `pintarItem`, inmediatamente después de
`cont.className = 'panel-bloque'` (`src/js/30-ui.js:93`) y **antes** de la rama de problemas
que hace `return` en `:105` —si no, no se vería nunca en los problemas, que es justo donde
`D === 3` es más probable—: `if (item.esRetoBonus) cont.appendChild(CB.ui.crear('span',
'distintivo', 'reto'));` La clase `.distintivo` ya existe
(`src/scss/_04-pantallas.scss:110`) y ya se usa en JS (`src/js/43-mapa-destrezas.js:139`):
cero CSS nuevo, cero riesgo en el cruce de clases. Es texto: cumple «nunca color solo».

Nada de anunciarlo por separado: `servirItem` anuncia la consigna en
`src/js/40-partida.js:284` y se taparían. Se compone una sola cadena:
`CB.a11y.anunciar((item.esRetoBonus ? 'Reto. ' : '') + (item.consigna || item.enunciado || ''))`.

Al acertarlo, la coreografía pasa a `'estalla'` con el grito `'¡Reto!'` (6 caracteres), sin
tocar el mensaje quieto. **Fallarlo no cambia nada** y el rótulo no lleva contador: es una
etiqueta, no una advertencia.

**Guardián E67** · `pruebas/casos-regresiones.js`.
Con `esRetoBonus` forzado, el distintivo aparece **tanto en un ítem de cálculo como en uno
con `frases`** (la rama del `return`), y sin él no aparece.

**Que no nazca roto.** Sembrar: mover el `appendChild` al final del cuerpo de `pintarItem`.
La mitad del ítem con `frases` tiene que ponerse roja y la de cálculo seguir verde. Si las
dos siguen verdes, el guardián no está construyendo un ítem con `frases` de verdad.

## 10.3 Los logros de fin de partida se celebran sobre una pantalla que desaparece

`aplicarLogros(CB.logros.comprobar('finPartida', ...))` corre en
`src/js/40-partida.js:1112` estando aún en `p-partida`; nueve líneas después, `pintarFin`
(`:1121`) hace `CB.pantallas.ir('p-fin')` (`:1141`). El único `#cinta` está en
`src/index.html:185`, dentro de `#p-partida`; `p-fin` (`src/index.html:252-283`) no tiene
ninguno, y `nodoDe()` resuelve `.pantalla:not([hidden]) .cinta` (`src/js/30-ui.js:624-627`).
«Primer pico», «Cantero» y «Vuelvo mañana» (`src/js/24-logros.js:45-73`) suenan y no se ven.

Y los que sí se ven, en partida, dicen siempre `'¡Logro!'` (`src/js/40-partida.js:896`): el
nombre solo lo oye un lector de pantalla. Si caen dos a la vez, el bucle de `:894-911` llama a
`mostrar()` dos veces y la segunda cancela la primera (`src/js/30-ui.js:635`).

**Qué se hace.**

1. **El grito de la cinta sigue siendo corto y fijo** (`'¡Logro!'` / `'¡Luz extra!'`). Usar
   `l.nombre` no cabe: «Reto bonus superado» y «Guardián del bloque»
   (`src/js/24-logros.js:34-37` y `:55-58`) son 19 caracteres, la cinta va a
   `font-size: clamp(26px, 6vw, 52px)` (`src/scss/_03-componentes.scss:271`) y el tope del
   proyecto para el texto de cinta es 16 (`pruebas/casos-mensajes.js:64-66`). Lo que se añade
   es `CB.ui.mensaje('Logro: ' + l.nombre, 'acierto')` en la rama sin luz
   (`src/js/40-partida.js:894-897`), junto al anuncio que ya existe. Ahí deja de haber
   información que solo oye un lector de pantalla, que es el defecto real.
2. **Encolar el segundo logro**: pintarlo con `setTimeout(..., CB.ui.cinta.espera('estalla',
   0))` para que no se cancelen (lección E51).
3. **Nodo de cinta en `p-fin`**:
   `<div class="cinta" aria-hidden="true" hidden><span class="cinta__texto"></span></div>`,
   hermano de `.contenido`, más los dos mocks (`pruebas/pruebas.html:112` y
   `pruebas/pruebas-min.html`). **Y antes, medir dónde cae**: `.cinta` es
   `position: absolute; top: 38%` (`src/scss/_03-componentes.scss:261-263`) y en `p-fin` no
   hay ningún antepasado posicionado, así que cae al 38 % del viewport, encima del panel de
   gemas, en la única pantalla cuyo trabajo es que se lea — y `p-fin` es `pantalla--scroll`.
   Si tapa, `.pantalla--fin { position: relative; }` y una posición propia para
   `.pantalla--fin .cinta`, sin `border-radius`, sin sombra difusa, sin transición suavizada.
4. Los logros de fin van en un **`.panel-bloque` propio con su `<h2>`**, después del panel de
   «Lo que has dominado hoy» (`src/js/40-partida.js:1159`) y antes del de gemas (`:1176`).
   Meterlos dentro de `#fin-dominado` contradice el rótulo del panel (`src/index.html:257`).
   **El orden de lectura de §3.7 es contrato cerrado: el cambio se declara en
   `docs/decisiones.md` como decisión nueva, no de tapadillo.**

**Guardián E68** · `pruebas/casos-regresiones.js`.
`finalizar()` con un logro de `finPartida` forzado deja el nombre **visible en `p-fin`
después de que `ir('p-fin')` haya corrido**. Y la cinta escribe en el nodo de `p-fin`, no en
el de `p-partida`: se comprueba comparando la identidad del nodo que devuelve `nodoDe()`.

**Que no nazca roto.** Sembrar dos veces: (a) quitar el nodo de cinta de `p-fin` en el mock →
la segunda aserción, roja (si sigue verde, `nodoDe()` está cayendo en el
`getElementById('cinta')` de respaldo y el guardián no comprueba nada — es la trampa
documentada en el plan 1.5); (b) dos logros en el mismo tick sin encolar → tiene que quedar
una sola clase de coreografía, y eso ya lo ve E51, que debe seguir verde.

## 10.4 Se desbloquea un mundo entero y nadie se entera

`CB.partida.desbloquearMundos()` (`src/js/40-partida.js:1116`, función en `:1125-1136`)
escribe `perfil.mundos[m.id].desbloqueado = true` **sin una sola línea de interfaz**. Abrir
el Bosque, el Río o la Mina son los tres hitos más grandes de la vida de un perfil y ocurren
en silencio, en el mismo instante en que la pantalla de fin dice lo de siempre.

**Qué se hace.** En `finalizar`, antes de la línea 1116:

```js
var abiertosAntes = {};
CB.MUNDOS.forEach(function (m) {
  abiertosAntes[m.id] = !!(perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado);
});
```

Después de `desbloquearMundos()`, buscar el que cambió y pasarlo a `pintarFin`. Allí, después
del panel de «Lo que has dominado hoy» y antes del de gemas:

- **Una línea de texto de verdad**, `'Se ha abierto ' + nuevo.nombre + '.'`, con
  `nuevo.nombre` sacado de `CB.MUNDOS`. **Nunca una cadena escrita a mano**: no existe
  ningún «Bosque de las Restas»; los cuatro nombres están en `src/js/17-catalogo.js:335-355`.
- `CB.a11y.anunciar('Se ha abierto ' + nuevo.nombre)`. **Obligatorio, no opcional**: la cinta
  es `aria-hidden="true"` por diseño (`src/index.html:182-185`), así que sin esta línea el
  hito más grande del juego seguiría sin existir para un lector de pantalla.
- Y **solo si existe nodo de cinta en `p-fin`** (10.3),
  `CB.ui.cinta.mostrar('bandera', '¡Paso abierto!')` — 13 caracteres, el mismo grito que ya
  usa el jefe en `src/js/42-jefes.js:268`.

Ninguno de los cinco textos de `src/js/40-partida.js:1148-1154` se reescribe: se **añade** una
línea. Limitación aceptada y escrita: `desbloquearMundos()` lo llama también `pintarMundos`
(`src/js/43-mapa-destrezas.js:122`), así que un perfil importado que abra el mundo desde el
mapa no verá la celebración. Se declara; no se persigue.

**Guardián E69** · `pruebas/casos-regresiones.js`.
Dos `finalizar()` seguidos sobre el mismo perfil anuncian el mundo **una sola vez**, y el
nombre anunciado sale de `CB.MUNDOS`.

**Que no nazca roto.** Sembrar: capturar `abiertosAntes` **después** de `desbloquearMundos()`
en vez de antes. La aserción del «una sola vez» seguirá verde y la del primer anuncio se
pondrá roja — que es la señal de que el guardián mira el sitio correcto. Sembrar también el
nombre a mano: sustituir `nuevo.nombre` por una cadena literal → la comparación contra
`CB.MUNDOS` tiene que ponerse roja.

## 10.5 La mejor expedición se calcula, se guarda por modo, y no se enseña

`src/js/40-partida.js:1088-1091` escribe `perfil.mejorPuntuacion[claveModo]`. El grep en
`src/js/` solo encuentra `01-almacen.js:193` y `:276-280` (esqueleto y migración) y esas
líneas: **ninguna lectura en la interfaz del niño**.

Y hay una confusión de unidades encima: el bono se rotula `'+' + bono.total + ' de bono'`
(`src/js/40-partida.js:1182`) en **puntos**, justo debajo del recuento de **gemas**
(`src/index.html:262-265`). Parece que son gemas y no lo son.

**Qué se hace — dos cambios, ninguno expone los puntos.** La moneda visible es la gema
(`docs/decisiones.md:27-31`), el orden de lectura de §3.7 es cerrado y `PLAN.md:2855` aplaza
el récord personal visible a v2. Enseñar la cifra reabriría todo eso sin necesidad.

1. **Rotular el bono en la unidad que el niño conoce.** El bono **ya** se convierte en gemas
   en `src/js/40-partida.js:1083-1084` (`Math.round(bono.total / 50)`, sumado a `e.gemas` y a
   `perfil.gemas`). Así que `'+' + Math.max(0, Math.round(bono.total / 50)) + ' gemas de
   bono: ' + extras…` es literalmente verdad: esas gemas ya están dentro de `#fin-gemas`.
2. **La celebración del récord sin cifra.** Leer `perfil.mejorPuntuacion[claveModo]`
   **antes** de pisarlo en `:1090`, pasar el booleano a `pintarFin` y, si es `true`, una
   línea propia «¡Tu mejor expedición!» más `CB.a11y.anunciar`. La cinta `'estalla'` solo si
   `p-fin` tiene nodo (10.3); el texto funciona sin ella.

Nunca «te ha faltado poco». Nunca comparación entre niños. Y siempre contra el récord del
**mismo** `claveModo` (`src/js/40-partida.js:1087`), que es el antifarmeo cerrado en
`src/js/24-logros.js:15-16`.

**Guardián E70** · `pruebas/casos-regresiones.js`.
Un `finalizar()` que bate el récord del modo pinta la línea; el siguiente, con menos puntos,
no. Batir el récord de `normal` **no** dispara la celebración en `sinPrisa`. Y el rótulo del
bono contiene «gemas» y el número `round(bono.total / 50)`, no `bono.total`.

**Que no nazca roto.** Sembrar: leer el récord después de pisarlo (`:1090`). La primera
aserción se pone roja porque `e.puntos > récord` deja de ser cierto nunca. Sembrar la tercera:
volver a `bono.total` en el rótulo.

**Hecho cuando (Fase 10).** Partida a mano con `PROB_BLOQUE_RARO = 1` temporalmente: el
cromo se nombra en la cinta y en el mensaje quieto; un ítem con `D = 3` enseña «reto»; una
partida que abre mundo lo dice en texto y por la región viva; y `#fin-bono` no vuelve a
hablar en puntos. **Contrato tocado:** el orden de lectura de `p-fin` (§3.7) gana un panel,
declarado en `docs/decisiones.md`. Ninguno de los verificados por número.

---

# Fase 11 · Textos que prometen lo que el código no hace · REVERSIBLE

## 11.1 El cofre del descanso promete gemas y no entrega ninguna

Dos mentiras encadenadas. El título:
`{ id: 'cofre', titulo: '¡Descanso! ¿En qué cofre está la gema?' }`
(`src/js/40-partida.js:964`). Y el aviso:
`'En los tres cofres hay gemas. Elige uno.'` (`:983`). El manejador que se instala nueve
líneas más abajo (`:993-997`) solo hace `data-roto="si"`, partículas y `sfx('cofre')`. **No
se suma nada a `e.gemas` ni a `perfil.gemas`**, y los tres cofres siguen pulsables: «Elige
uno» tampoco es verdad. El comentario de `:981-982` invoca §21.4 —nada de cofres opacos— y el
resultado es peor: un cofre transparente y vacío.

**Qué se hace — la rama honesta, riesgo cero.** Cambiar los dos textos por algo que describa
lo que el código hace: título `'¡Descanso! Rompe los cofres de piedra'`, aviso
`'Tres cofres de piedra. Rómpelos todos.'`. El `aria-label` de `:992` se queda en `'Cofre'`.
Cero cambios en la economía, cero en `src/js/20-puntuacion.js`, cero riesgo sobre los 30
casos exactos.

**Por qué no se regalan las gemas.** Tres motivos verificados: (a) `servirItem`
(`src/js/40-partida.js:211-294`) **no llama a `pintarHUD` en ninguna línea** —las únicas
llamadas están en `:205, 625, 685, 902, 1065`—, así que las gemas no aparecerían hasta el
siguiente acierto: un premio que se promete, se da y no se ve; (b) rompería el invariante
declarado de la moneda visible (`gemas = max(1, round(puntos/50))` al acertar, 0 al fallar,
`docs/decisiones.md:27-31`); (c) el descanso `'cofre'` sería el único de los cinco que paga.
Si algún día se quiere la mecánica de `PLAN.md:649` entera, es una decisión de economía y va
a `docs/decisiones.md`, no un arreglo de texto.

**Guardián E71** · `pruebas/casos-regresiones.js`.
Tras un micro-descanso `'cofre'` completo (tocar los tres), `perfil.gemas` y
`CB.partida.estado.gemas` no han cambiado, y ni el título ni el aviso contienen la palabra
«gema».

**Que no nazca roto.** Sembrar: devolver el texto viejo. La segunda mitad, roja. La primera
mitad (las gemas quietas) es la que impide que alguien «arregle» el texto sumando gemas por
detrás.

## 11.2 El musgo se cuenta en una unidad y se pinta con otro criterio

El saludo del mapa usa `CB.memoria.vencidosHoy(perfil, hoy)`
(`src/js/43-mapa-destrezas.js:115-118`) y lo llama «vetas con musgo». Esa función
(`src/js/28-memoria.js:88-100`) devuelve **destrezas** con `R < 0.7`. La Cantera solo pinta
🌿 cuando `CB.memoria.clasificar` dice `'oxidada'`, que exige `eraSolida && R < 0.6`
(`src/js/28-memoria.js:63`) — es decir, haber estado antes en afianzada o dominada.

En la primera semana ninguna destreza ha llegado a afianzada: `oxidada` es imposible mientras
`vencidosHoy` ya cuenta media docena. «Hay 5 vetas con musgo esperándote» y ni una hoja verde
en la Cantera. La única razón honesta que el proyecto se dio para volver mañana
(`src/js/28-memoria.js:6-10`) es, vista por un niño de 7 años, una frase que no se
corresponde con nada.

**Qué se hace.** Función pura nueva en `src/js/28-memoria.js` (capa 20-2A: sin DOM, sin fecha
propia, recibe `hoyISO`):

```js
CB.memoria.conMusgo = function (perfil, hoyISO) { /* slugs con clasificar(...) === 'oxidada' */ };
```

**Mismo predicado que pinta la Cantera y misma unidad que la frase.** No se cuentan niveles:
13 destrezas frente a 92 niveles, y «Hay 24 vetas con musgo» a un niño de 7 años es una deuda,
no una invitación — además la Cantera por defecto solo pinta los del mundo actual
(`src/js/43-mapa-destrezas.js:37`), así que un recuento sobre el catálogo entero volvería a
no cuadrar.

El saludo de `:115` pasa a usarla. Si el conjunto no es vacío pero ninguno cae en el mundo
actual, la frase lleva además el nombre del mundo donde están, para que el niño pueda
encontrarlas. Con 0, frase verdadera y accionable, no silencio.

`CB.partida` sigue usando `vencidosHoy` en `src/js/40-partida.js:77` para elegir qué servir:
son dos preguntas distintas y solo una se le enseña al niño.

**Guardián E72** · `pruebas/casos-regresiones.js`.
Perfil construido con destrezas en estado `'afianzada'` y último repaso hace N días: el número
del saludo es **exactamente** el número de iconos 🌿 que pinta `CB.mapaDestrezas.pintar()`
sobre ese mismo perfil. Se cuentan los nodos del DOM, no se reimplementa el predicado.

**Que no nazca roto.** Sembrar: devolver `vencidosHoy` al saludo. La igualdad tiene que
ponerse roja **con el perfil de primera semana**, que es el caso que la delata; con un perfil
maduro los dos números pueden coincidir por casualidad y el guardián pasaría en verde con el
fallo dentro. El perfil se construye con las funciones reales (`CB.adaptativo.nuevaDestreza`,
`CB.memoria.repasado`), nunca a mano — es la lección de E42.

## 11.3 Los cinco micro-descansos no van en bolsa

El comentario de `src/js/40-partida.js:960` dice «en bolsa para que no se repitan» y la línea
971 hace `CB.util.elegir(e.rng, CB.partida.DESCANSOS)`, que es un **sorteo con reemplazo**.
Con tres descansos por sesión hay un 52 % de que salga dos veces el mismo (1 − 5·4·3/125).

**Qué se hace.** `perfil.mensajes.bolsaDescansos` —**sin guion bajo**, porque
`CB.almacen.sanear()` borra esas claves (E45)—, creado en el esqueleto de
`src/js/01-almacen.js:204-206` **y en `CB.mensajes.asegurar()`**
(`src/js/25-mensajes.js:51-62`): los perfiles ya guardados no lo traen, y ese es exactamente
el conducto que E52 dejó documentado. Sortear con
`CB.mensajes.sacarDeBolsa(perfil.mensajes, 'bolsaDescansos', CB.partida.DESCANSOS.length, [], [], 0, e.rng)`
(`src/js/25-mensajes.js:118`) en lugar de `CB.util.elegir`. Y corregir el comentario
mentiroso de `:960`.

`mensajes` ya está en `CB.almacen.CAMPOS_PERMITIDOS` (`src/js/01-almacen.js:443`), así que
sobrevive a exportar/importar, y `podar()` (`:390-433`) no lo toca.

**Guardián E73** · `pruebas/casos-regresiones.js`, calcado del E52.
Cinco descansos seguidos **con un `guardarPerfil`/`cargarPerfil` por medio** dan los cinco ids
distintos. Y la clave no empieza por `_` y sigue ahí tras `CB.almacen.sanear()`.

**Que no nazca roto.** Sembrar dos veces: (a) renombrar la clave a `_bolsaDescansos` → la
mitad del `sanear()` tiene que ponerse roja; (b) quitar la línea de `asegurar()` y probar
sobre un perfil sin el campo → tiene que ponerse roja, no lanzar excepción. Sin el
`guardarPerfil` por medio, el guardián pasa en verde con la bolsa que se reinicia en cada
guardado, que es literalmente el fallo de E45.

**Fuera de esta fase, a propósito: diferenciar los cinco descansos.** El cuerpo de
`microDescanso` (`src/js/40-partida.js:987-1000`) pinta los mismos 8 botones
`bloque-rompible` para los cinco, y los títulos prometen cinco juegos. Diferenciarlos exige
nodos nuevos en `#p-descanso` y en los dos mocks —`CB.ui.personaje` sale por su `return` si no
encuentra `#cri-<quien>` (`src/js/30-ui.js:293-295`) y esos nodos solo existen dentro de
`#p-partida` (`src/index.html:171-174`), que es la familia E40 otra vez— más CSS nuevo que
pasar por las tres reglas duras y revalidar el suelo táctil de 64 px. **Es una fase entera y
no cabe en 1.9.0.** La bolsa arregla la mitad medible del problema por diez líneas.

**Hecho cuando (Fase 11).** Ningún texto del juego promete algo que el código no hace, medido
recorriendo los cinco descansos y el saludo del mapa con un perfil de primera semana y otro de
tercera. **Contrato tocado: ninguno.** El formato del perfil gana una clave aditiva que
`asegurar()` crea: no hay migración en `01-almacen.js`.

---

# Fase 12 · El jefe: ocho turnos sin celebrar nada · REVERSIBLE

Acertar hace `e.bloques--`, `sfx('picar')` y partículas (`src/js/42-jefes.js:229-232`).
**Nada más.** El único anuncio del combate es el del fallo
(`'Ese bloque vuelve a su sitio. Sigue intentándolo.'`, `:239`): para un lector de pantalla,
silencio absoluto al acertar y voz solo al fallar, que es el reparto exactamente al revés. La
cinta aparece una vez, al final (`:268`). Los cuatro textos `intro` de `:28, 33, 38, 43` no
los lee nadie: `iniciar()` escribe en `#jefe-aviso` la frase fija de `:68`.

## 12.1 Simetría, intro y una sola cinta

- **(b) Anuncio del acierto**, que es el arreglo de accesibilidad y el más barato: en
  `:229-232`, `CB.a11y.anunciar('Ese bloque cae. Quedan ' + e.bloques + '.')`. Vocabulario de
  la cabecera del fichero: «cae», nunca «daño». No hay colisión de región viva porque
  `turno()` no anuncia.
- **(a) Pintar `e.def.intro` en un nodo que `turno()` no vacíe.** `iniciar()` llama a
  `turno()` en la línea siguiente (`:70-71`) y `turno()` empieza vaciando `#jefe-enunciado` y
  `#jefe-opciones` (`:101-104`): el intro en `#jefe-enunciado` duraría cero milisegundos. Va
  debajo de `#jefe-nombre` (`:63-64`) o en `#jefe-aviso`, encima de la frase de las luces.
- **(c) Una sola cinta por combate**, al caer el bloque que parte la armadura por la mitad
  (`e.bloques === CB.jefes.BLOQUES / 2`), y respetando la fuente única de duración:
  `setTimeout(function () { CB.jefes.turno(); }, mitad ? CB.ui.cinta.espera('sello', 900) : 900)`.
  Sin eso, `sello` dura 900 ms (`src/js/30-ui.js:593`) y el turno siguiente se repinta
  exactamente a los 900 ms (`src/js/42-jefes.js:242`): el cartel seguiría en pantalla, al 38 %
  del viewport, mientras aparece la pregunta nueva. **Una vez, no cada turno**: el espectáculo
  es inversamente proporcional a la frecuencia. Y no en el último bloque, porque cancelaría la
  `'bandera'` del final (`src/js/30-ui.js:635`).

**Descartado: el distintivo «sin un fallo» que se apaga.** Es literalmente la racha que se
pierde, que este proyecto declara patrón oscuro prohibido (`src/js/28-memoria.js:7-10`), y
contradice la cabecera del propio fichero: en el jefe no se puede perder nada
(`src/js/42-jefes.js:4-11`).

**Guardián E74** · `pruebas/casos-regresiones.js`.
Estado construido con `CB.jefes.iniciar('M1')` de verdad. Ocho aciertos: `CB.a11y.anunciar`
recibió ocho cadenas con la cuenta correcta, y `CB.ui.cinta.mostrar` se llamó **exactamente
una vez con `'sello'`** en todo el combate. Más: `#jefe-nombre` o `#jefe-aviso` contiene
`e.def.intro` **después** de que `turno()` haya corrido.

**Que no nazca roto.** Sembrar: poner el intro en `#jefe-enunciado`. La tercera aserción tiene
que ponerse roja — si sigue verde es que el guardián lo comprueba antes de `turno()`, y
entonces no comprueba nada.

## 12.2 `jefeSinFallos` es una escritura muerta

`perfil.mundos[id].jefeSinFallos` se escribe en `src/js/42-jefes.js:254` y se declara en
`src/js/01-almacen.js:199-202` y `src/js/40-partida.js:1131`. **Ni una lectura en todo el
proyecto.**

**Qué se hace.** Leerlo en la tarjeta del mundo (`src/js/43-mapa-destrezas.js:158-167`) como
rótulo retrospectivo, «cerrado sin un fallo», con la clase `.distintivo` que ya se usa ahí
(`:139`). Es un recuerdo, no una apuesta: no se enseña durante el combate, así que no fabrica
miedo.

**Guardián E75** · `pruebas/casos-regresiones.js`.
Tras un combate con un fallo, la tarjeta **no** lo pone; tras uno sin fallos, sí. El combate
se juega de verdad con `CB.jefes.iniciar` / `CB.jefes.responder`, no fijando el campo a mano.

**Que no nazca roto.** Sembrar: `e.sinFallos = false` incondicional en `:254`. La segunda
mitad, roja. Si se fija el campo a mano en el test, el guardián nunca vería que `responder`
dejó de ponerlo a `false`.

## 12.3 La victoria del jefe suena a jefe

`'p-jefe': 'jefe'` y `'p-fin': 'victoria'` (`src/js/07-musica.js:77-78`).
`CB.jefes.terminar` (`src/js/42-jefes.js:245-281`) **no cambia de pantalla**: pinta
«¡Tronquete abre el paso!», las 25 gemas y la cinta `'bandera'` (`:268`) sobre `p-jefe`, y
solo sale con «Volver al mapa» (`:277`). Cuatro veces en la vida de un perfil, y en el único
instante que el juego se reserva para pararlo todo, la música sigue diciendo que hay peligro.

**Qué se hace.** En `terminar`, **después** de `CB.ui.cinta.mostrar('bandera', …)` (`:268`)
—esa cinta dispara su propio `sfx('cofre')` y el orden importa para que no se solapen—:
`CB.musica.poner('victoria')`. `42-jefes.js` es capa 30-99: puede. No se toca
`CB.musica.PANTALLAS`, así que el contrato de las 17 pantallas de
`pruebas/casos-musica.js:83-105` sigue intacto, y el siguiente `CB.bus.emitir('pantalla', …)`
—el de «Volver al mapa»— repone el tema solo, porque `poner()` solo ignora la llamada cuando
la clave coincide (`src/js/07-musica.js:330`).

**Obligatorio**: es el único sitio del juego donde la música no la manda el bus. El comentario
de la tabla en `src/js/07-musica.js:58-62` debe decir que hay UNA excepción y dónde está, y la
excepción se anota en `docs/decisiones.md`. Si no, el próximo que lea la tabla pensará que
miente.

**Guardián E76** · `pruebas/casos-musica.js`.
Estado construido con `CB.jefes.iniciar('M1')` **de verdad** (lección de E42, ya recogida en
`src/js/07-musica.js:442-446`). Tras `CB.jefes.terminar(true)`,
`CB.musica.pistaActual === 'victoria'`; tras `CB.pantallas.ir('p-mapa')`, `'temaPrincipal'`.

**Que no nazca roto.** Sembrar: quitar la llamada. La primera aserción, roja. Y sembrar la
construcción a mano del estado —`{mundo: ...}` fabricado— para comprobar que el guardián
falla al arrancar en vez de pasar en verde: es exactamente cómo `casos-musica.js` estuvo años
de acuerdo con el fallo que tenía que denunciar.

**Hecho cuando (Fase 12).** Un combate entero a mano: se oye la cuenta de bloques con
VoiceOver, se ve el intro del jefe, la cinta de la mitad sale una vez y la música cambia a
victoria en el mismo instante que aparece «abre el paso». **Contrato tocado:** las 9 pistas y
las 17 pantallas siguen intactas; `CB.musica.PANTALLAS` no se toca.

---

# Fase 13 · Tiempo de lectura y música que no vuelve al segundo cero · REVERSIBLE

## 13.1 La frase que enseña se borra a los 1600 ms

`CB.ui.mensaje(msg, 'acierto')` (`src/js/40-partida.js:594`) y
`setTimeout(siguiente, CB.ui.cinta.espera(coreo, 1600))` (`:629-630`). Para `'sello'` —el
60 % de los aciertos— eso es `max(1600, 1300) = 1600 ms`, y `siguiente()` → `servirItem()`
empieza con `CB.ui.ocultarMensaje()` (`:215`). El mensaje típico —plantilla de
`src/datos/mensajes.js:165` más procedimiento de `:38`— son 13-15 palabras. **560 palabras por
minuto.** Un lector de 2.º va a 60-90. La única parte que enseña algo nunca se lee.

**Qué se hace — tercer parámetro opcional, no un global.** `pruebas/casos-regresiones.js:1645,
1647, 1649` son tres `t.igual` **exactos** (`espera('sello',1600) === 1600`,
`espera('veta-madre',1600) === 2400`, `espera('inventada',1600) === 1600`). Sobreviven solo si
las llamadas de dos argumentos siguen dando lo mismo. En `src/js/30-ui.js:615`:

```js
CB.ui.cinta.espera = function (clave, minimoMs, texto) {
  var co = CB.ui.cinta.COREOGRAFIAS[clave];
  var m = minimoMs || 0;
  var extra = texto ? CB.util.palabras(texto).length * 350 : 0;
  return Math.min(3200, Math.max(m, co ? co.ms + 400 : 0, extra));
};
```

**350 ms/palabra, tope 3200.** Con 700 ms/palabra las 13 palabras típicas darían 9100 ms,
recortados al tope: **prácticamente todos los aciertos de categoría A congelarían el juego
5,2 s, doce veces por sesión**, que contradice de frente el principio rector del plan
(`docs/plan-mejoras-1.8.0.md:26-28`). Con 350 y tope 3200 se dobla el tiempo de lectura sin
convertir cada acierto en una espera.

Llamadas: `src/js/40-partida.js:630` con `CB.ui.cinta.espera(coreo, 1600, msg)`.

**Presupuesto que de verdad se mueve, y hay que escribirlo en el commit:** no es
`OBJETIVO_S = 420` (`src/js/40-partida.js:18`), que es presupuesto de tiempo de ítem, sino el
reloj de pared, `perfil.ajustes.limiteSesionMin || 20` (`src/js/40-partida.js:948`), que corta
con `finalizar('limiteSesion')`. La sesión de 20 min pierde ~20 s de ítems.

**Guardián E77** · ampliación de la suite E54 en `pruebas/casos-regresiones.js`, **dos casos
nuevos dichos a propósito**: `espera` con texto largo da 3200; `espera` **sin** texto da
exactamente lo de hoy. La segunda es la que impide que el cambio se cuele en las llamadas
viejas.

**Que no nazca roto.** Sembrar: leer la longitud del texto de un estado global en vez de del
parámetro. Los tres `t.igual` originales de E54 tienen que ponerse rojos. Si siguen verdes, la
firma se ha cambiado de forma incompatible sin que nadie se entere.

## 13.2 La espera del fallo es el último número suelto del bucle

`src/js/40-partida.js:662-666`: `setTimeout(..., 2600)` a pelo, con la cinta `'posa'` de
800 ms. Las otras dos esperas del bucle sí pasan por la fuente única (`:493-494` y `:629-630`).

**Qué se hace — solo esto:**
`CB.ui.cinta.espera('posa', 2600, 'Esta no suma gemas. Te queda otro intento. ' + pista)`.
Misma duración de suelo, cero números del bucle fuera de la fuente única, y hereda el escalado
por longitud de 13.1.

**Descartado: recortar el segundo intento quitando el suelo de 800 ms.**
`CB.partida.iniciarCronometro` se llama justo después (`:665`) y tiene `MS_CONSTRUCCION`
cableado en **tres** sitios: `e.t0 = CB.util.ahora() + 800` (`:407`), el arranque del reloj
(`:415-417`) y el límite (`:419-421`). Habilitar los botones a 0 con `t0` 800 ms en el futuro
da **rt negativo**: `mT` al tope, bono máximo por rapidez, y esa muestra entra en `rtMuestras`
del detector de azar (`src/js/21-antiazar.js`). Es exactamente el patrón de E40. Además la
construcción visible de 800 ms es criterio de fase entregado (`PLAN.md:2701`).

**Guardián E78** · `pruebas/casos-regresiones.js`.
Exponer la espera del fallo como función pura (`CB.partida.esperaSegundoIntento(pista)`) y
afirmar que devuelve `>= 2600` y que crece si se sube temporalmente
`COREOGRAFIAS['posa'].ms` — restaurándolo en el `finally`.

**Que no nazca roto.** Sembrar: devolver el `2600` literal. La segunda aserción, roja. La
primera sola pasaría en verde con el número a pelo, que es el fallo entero.

## 13.3 La música del mundo vuelve al segundo cero en cada reparación y en cada descanso

`'p-descanso': 'calma'` y `'p-reparacion': 'calma'` (`src/js/07-musica.js:73-74`). Al volver a
`p-partida`, `poner()` no encuentra la clave igual (`:330`), suelta el canal y crea elemento
nuevo colocándolo en `entra` (`:343-352`); `soltar()` (`:290-298`) no guarda nada. Cada segundo
fallo lleva a reparación y cada 6-8 ítems hay descanso: cinco o seis idas y venidas por
partida. De nueve pistas normalizadas y con puntos de bucle medidos, el niño oye siempre los
mismos primeros treinta segundos. Monotonía fabricada por el motor.

**Qué se hace.** Tabla `CB.musica.posiciones = {}` en `src/js/07-musica.js`. `soltar()` apunta
`posiciones[c.clave] = c.el.currentTime` antes de liberar; `poner()` arranca ahí si existe.
`07-musica.js` es adaptador de plataforma (capa 00-07): puede tener estado de sesión. **No se
persiste en el perfil** — es estado de sesión, y esto no es el almacén.

Tres precisiones:

1. **Recortar al guardar y al usar**:
   `pos = CB.util.clamp(pos, p.entra, Math.max(p.entra, p.sale - CB.musica.S_BUCLE))`
   (`S_BUCLE = 1.4`, `src/js/07-musica.js:131`), para no reanudar dentro del fundido de bucle
   de `:171-184`, donde el factor entra por debajo de 1 y la pista sonaría baja.
2. `soltar()` lo llaman `parar()` (`:418-421`) y el propio `poner()` sobre el canal destino
   (`:344`): guardar ahí cubre las tres rutas. Se acepta que la posición guardada llega
   ~900 ms después de que el niño dejara de oírla, por el fundido.
3. Diez líneas, cero ficheros nuevos, cero peso.

**Guardián E79** · `pruebas/casos-musica.js`. Afirma la **recuperación**, no el guardado.
Sobre un elemento de audio real: `poner('mundoPradera')`, fijar `currentTime = 40`,
`poner('calma')`, volver a `poner('mundoPradera')`, y comprobar que
`canales[activo].el.currentTime` está cerca de 40 y **no** de `entra`. Asignar `currentTime`
antes del metadato es lo que un `try/catch` puede tragarse en silencio (`:352`).

**Que no nazca roto.** Sembrar: guardar la posición pero no usarla en `poner()`. La aserción
tiene que ponerse roja. Un guardián que solo comprueba que `posiciones['mundoPradera']`
existe pasa en verde con el fallo entero dentro — es el error que hay que evitar.

**Hecho cuando (Fase 13).** Cinco idas y venidas a reparación en una partida y la pista del
mundo avanza; y el mensaje de acierto se queda en pantalla el doble de tiempo que hoy sin que
la sesión de 20 min pierda más de 25 s de ítems, medido. **Contrato tocado:** E54 gana dos
casos, a propósito. Las 9 pistas siguen siendo 9.

---

# Fase 14 · Cuánto queda · REVERSIBLE

El HUD (`src/index.html:146-163`) tiene luces, reloj y gemas, y `CB.ui.pintarHUD`
(`src/js/30-ui.js:55-71`) pinta esas tres. Lo único que codifica el avance es el cielo,
`CB.ui.pintarBioma(e.mundo.bioma, e.indice / Math.max(1, e.guion.length))`
(`src/js/40-partida.js:282`), y `.cielo` es `aria-hidden="true"` (`src/index.html:166`). El
guion tiene entre 8 y 20 ítems (`src/js/40-partida.js:20-21`) y su longitud cambia de partida
en partida.

La lección ya está aprendida en este código para cuatro preguntas: la calibración escribe
«Pregunta ‹i+1› de ‹total›» (`src/js/99-arranque.js:62-63`) y el comentario de `:58-59`
explica por qué se añadió. En la expedición de siete minutos no se aplicó.

**Qué se hace.**

1. **Ampliar el objeto, no leer un global.** `pintarHUD` recibe `{luces, gemas}` y los cinco
   sitios que la llaman le pasan literalmente eso (`src/js/40-partida.js:205, 625, 685, 902,
   1065`). Se les añade `indice: e.indice, total: e.guion.length` **en las cinco** —en `:205`
   aún no hay guion pintado: 0 y la longitud recién construida— y en `src/js/30-ui.js:55` se
   pinta la hilera **solo `if (estado.total)`**, para que una llamada parcial no borre la fila.
2. **El nodo**, dentro del `.hud` de `src/index.html:146`:
   `<div id="hud-galeria" class="galeria-avance" role="img"></div>`, con `aria-label`
   «Bloque 3 de 12» actualizado en cada pintado. Reutiliza el dibujo de `.armadura-jefe > b` /
   `[data-caido="si"]` (`src/scss/_04-pantallas.scss:180-187`), cuyo
   `box-shadow: inset 4px 4px 0 0` no lleva desenfoque y pasa la auditoría.
3. **Los bloques CAEN, no quedan.** Un contador que baja se lee como cuenta atrás. Se pinta lo
   hecho.
4. **Los dos mocks**, `pruebas/pruebas.html` (junto a `:85`) y `pruebas/pruebas-min.html`, o
   `getElementById` devuelve `null`, `pintarHUD` sale por el `if` y las comprobaciones pasan en
   verde sin comprobar nada. La clase nueva entra en `herramientas/cruzar-clases.mjs` en las
   dos direcciones.
5. **Comprobar el ancho con 20 bloques en el escalón de altura más bajo** antes de darlo por
   bueno. Que «cabe sin desplazar el reloj» no está verificado en ningún sitio.

A favor del diseño, verificado: `siguiente()` hace `e.indice++` siempre
(`src/js/40-partida.js:935`) y el ítem del escalón 4 se sirve **en lugar del** ítem del guion
en ese índice, así que el total de bloques servidos es `guion.length` y la hilera no miente.

**Guardián E80** · `pruebas/casos-regresiones.js`.
**Empieza afirmando que `#hud-galeria` existe en la maqueta**, y solo entonces: con `indice` 3
de 12 hay 12 bloques y 3 con `data-caido="si"`, y el `aria-label` dice «Bloque 3 de 12».

**Que no nazca roto.** Sembrar dos veces: (a) quitar el nodo del mock → la primera aserción,
roja (si no lo comprueba, todo el resto pasa por vacuidad); (b) pasar solo `{luces, gemas}` en
una de las cinco llamadas → el conteo de bloques tiene que ponerse rojo tras esa llamada, no
antes.

**Hecho cuando.** Partida de 20 ítems en la anchura más estrecha de referencia: la hilera cabe,
el reloj no se desplaza, y la fila cuenta lo mismo que el cielo. **Contrato tocado: ninguno de
los numerados.** Los mocks cambian, que es obligación declarada en `CLAUDE.md`.

---

# Fase 15 · El primer minuto · REVERSIBLE

`CB.calibracion.terminar()` dice «¡Ya está! … Ahora sí empieza el juego: con reloj, con luces
y con gemas.» (`src/js/99-arranque.js:140-141`) y a los 3400 ms hace
`CB.pantallas.ir('p-mapa')` (`:148-151`). `p-mapa` es `pantalla--scroll`, y las tarjetas las
construye `src/js/43-mapa-destrezas.js:124-173`: solo la de M1 lleva «Cavar aquí» (`:159-160`)
y las otras tres dicen «Se abre al cavar más vetas del mundo anterior» (`:169-170`).

La frase dice literalmente que el juego empieza y aparece un menú. Es E21 un escalón más
adelante. Y la asimetría remata: JUGAR (`:438`) cuesta dos toques hasta el primer ítem;
CANTERA TRANQUILA (`:447`), uno.

**Qué se hace.** En el mismo `setTimeout` de 3400 ms, sustituir `CB.pantallas.ir('p-mapa')`
por `CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' })`. **Sin añadir `ir()`**:
`iniciar()` navega solo (`CB.pantallas.ir('p-partida')`, `src/js/40-partida.js:204`, seguido
de `pintarBioma`, `pintarHUD` y `servirItem`).

`{ mundoId: 'M1' }` es la forma **correcta** —`CB.catalogo.getMundo(opciones.mundoId || 'M1')`
en `src/js/40-partida.js:148`, y `iniciar()` escribe `estado.mundo` en `:165`—, la misma que
ya usan `src/js/43-mapa-destrezas.js:160` y `src/js/99-arranque.js:456`. No repite E42.

Es seguro hacerlo incondicional: `terminar()` corre una vez por perfil (`perfil.calibrado`,
`:122`) y en ese instante M1 es el único mundo abierto, así que no se le quita ninguna
decisión al niño. Y tiene que seguir yendo **después** del `CB.almacen.guardarPerfil(perfil)`
de `:132`, porque `iniciar()` → `servirItem` lee `perfil.trimestreDeducido`
(`src/js/40-partida.js:258-263`) y esa deducción se acaba de escribir en `:121`.

Se ajusta la frase de cierre para que no mienta en la otra dirección: se añade «Puedes parar
cuando quieras con Pausa», porque el salto es directo a una expedición con reloj.

Y la segunda mitad, que se sostiene sola: en `CB.pantallas.alEntrar['p-mapa']`, si solo hay un
mundo desbloqueado, `CB.a11y.enfocar` sobre «Cavar aquí», para que quien navega con teclado no
recorra tres tarjetas bloqueadas. **Enfocar no es navegar**, así que no rompe el contrato de
que un `alEntrar` pinta (E1).

**Guardián E81** · `pruebas/casos-regresiones.js`.
Tras `terminar()` y su temporizador, `CB.partida.estado` no es `null`,
`CB.pantallas.actual === 'p-partida'` y `CB.partida.estado.mundo.id === 'M1'`.

**Que no nazca roto.** Sembrar: mover la llamada delante del `guardarPerfil`. La tercera
aserción seguirá verde y hay que añadir una cuarta —`perfil.trimestreDeducido` es el que
acaba de deducirse, no el valor por defecto— porque ese es el fallo silencioso que el orden
protege. Y la suite tiene que **esperar el temporizador**, no medir en el mismo turno: es la
lección de `ejecutor.js` recogida en el plan 1.5.

**Hecho cuando.** Perfil nuevo, doble clic en `dist/index.html`: de la última pregunta de la
calibración al primer ítem de la expedición **sin ningún toque intermedio**, contado.
**Contrato tocado: ninguno.** `p-mapa` sigue existiendo, sigue siendo alcanzable desde JUGAR
(`src/js/99-arranque.js:438`) y desde `atras()`; el recorrido de `casos-carga.js` por las 16
navegables no cambia, y `docs/decisiones.md:165` («p-mapa | La Cantera | Tras JUGAR») sigue
siendo cierto: la calibración no es JUGAR.

---

# Reversibilidad, contratos y residuo

| Fase | Reversibilidad | Contrato verificado que toca |
|---|---|---|
| 6.1, 6.3 | REVERSIBLE | ninguno |
| 6.2 | REVERSIBLE en código · residuo inocuo: `componentesVistos` empieza a llenarse | ninguno |
| 7.1 | REVERSIBLE | ninguno |
| 7.2 | REVERSIBLE | `casos-contraste.js` gana un par, a propósito |
| 8.1-8.4 | REVERSIBLE | ninguno (los tres formatos no tenían prueba: nace red) |
| 9 | REVERSIBLE | ninguno; el contrato del informe del adulto se conserva y se guarda |
| 10.1 | REVERSIBLE · **cambia la secuencia del RNG a semilla igual** | ninguno |
| 10.2 | REVERSIBLE | ninguno |
| 10.3 | REVERSIBLE | **§3.7, orden de lectura de `p-fin`**: gana un panel. Declarado en `docs/decisiones.md` |
| 10.4, 10.5 | REVERSIBLE | ninguno |
| 11.1, 11.2 | REVERSIBLE | ninguno |
| 11.3 | REVERSIBLE en código · residuo inocuo: `perfil.mensajes.bolsaDescansos` | ninguno |
| 12.1, 12.2 | REVERSIBLE | ninguno |
| 12.3 | REVERSIBLE | 9 pistas y 17 pantallas intactas; se añade una excepción documentada al bus |
| 13.1, 13.2 | REVERSIBLE | **E54 gana dos casos**, a propósito |
| 13.3 | REVERSIBLE | ninguno |
| 14 | REVERSIBLE | ninguno numerado; los dos mocks cambian |
| 15 | REVERSIBLE | ninguno |

**Ninguna fase es IRREVERSIBLE.** Ningún campo del perfil se borra, se renombra ni cambia de
tipo; los dos que nacen (`bolsaDescansos`) o empiezan a escribirse (`componentesVistos`) son
aditivos, no llevan `_`, están o entran en `CAMPOS_PERMITIDOS` y los crea `asegurar()`. Un
perfil escrito por esta versión abre en 1.8.0.

**Números que se mueven, todos a propósito:** 45 fuentes → 45. 17 pantallas → 17. 92 niveles →
92. 24 códigos = 24 recomendaciones. 30 casos exactos de puntuación → 30 **intactos**, porque
se descartó regalar gemas en el cofre. 9 pistas → 9. 12 efectos → 12. Suite: **489 + 26
guardianes**, en las dos páginas. Auditoría: 58 comprobaciones, sin cambios.

**Peso.** Cero ficheros nuevos, cero imágenes, cero fuentes. Se estima < 4 KB minificados y
comprimidos sobre los ~319 KB de descarga de arranque: el techo de 400 KB no corre peligro.
Se verifica igualmente con `npm run entregar`, que es quien lo mide.

---

# Fuera de alcance, y por qué

**Descartado por la crítica (no vuelve a proponerse):**

- **Regalar gemas en el cofre del descanso.** `servirItem` no llama a `pintarHUD`
  (`src/js/40-partida.js:211-294`), así que el premio no se vería hasta el siguiente acierto;
  y rompe el invariante de la moneda visible de `docs/decisiones.md:27-31`. Se arregla el
  texto, que es la rama honesta y de riesgo cero.
- **Enseñarle los puntos al niño en `p-fin`.** La moneda visible es la gema
  (`docs/decisiones.md:27-31`) y `PLAN.md:2855` aplaza el récord personal a v2. La confusión
  de unidades se arregla rotulando el bono en gemas, que ya es literalmente verdad
  (`src/js/40-partida.js:1083`).
- **`CB.voz.leerOGuiar` automático en la partida.** `lecturaGuiada`
  (`src/js/05-voz.js:93`) no mira `CB.voz.activa`: sería audio que arranca solo y no se puede
  parar, WCAG 2.2 1.4.2. Y a 1000 ms/palabra agotaría por tiempo todos los problemas.
- **Un toque en `#item-enunciado` que invoque `accionLeer()`.** Arrastra
  `CB.partida.bloqueado = false` (`src/js/40-partida.js:1246`) y anula de un roce el bloqueo
  antiazar de 1200 ms.
- **`pedirConfirmacion` para el botón Salir.** Es un no-operativo fuera del antiazar
  (`src/js/32-componentes.js:120`) y su guardián nacería rojo el día uno.
- **`aria-pressed` sobre las monedas.** `disponibles` es una pieza por valor
  (`src/js/15-gen-dinero.js:141`) y la misma moneda se toca varias veces: convertir un
  contador en interruptor es mal uso de ARIA, WCAG 4.1.2.
- **El distintivo «sin un fallo» encendido durante el combate del jefe.** Es la racha que se
  pierde, patrón oscuro declarado prohibido (`src/js/28-memoria.js:7-10`), y contradice la
  cabecera de `src/js/42-jefes.js:4-11`. Solo queda el rótulo retrospectivo.
- **Recortar el bloqueo de 800 ms en el segundo intento.** `MS_CONSTRUCCION` está cableado en
  tres sitios del cronómetro (`src/js/40-partida.js:407, 417, 421`) y desincronizarlos daría
  rt negativo, bono máximo por rapidez y muestras envenenadas en el antiazar: el patrón E40.
- **700 ms/palabra en la espera del mensaje.** Congelaría el juego 5,2 s doce veces por
  sesión. Se usan 350 con tope 3200.
- **Contar niveles en el saludo del musgo.** 92 niveles frente a 13 destrezas, y la Cantera
  solo pinta el mundo actual (`src/js/43-mapa-destrezas.js:37`): el número volvería a no
  cuadrar y «24 vetas con musgo» es una deuda, no una invitación.
- **Exigir un OK en `ordenarFila` y en la fase «datos».** Añade un toque obligatorio a cada
  ítem de esos formatos y choca con `src/js/32-componentes.js:452-455` (§9.6). Se da deshacer
  sin peaje.

**Fuera por tamaño, no por error:**

- **Diferenciar de verdad los cinco micro-descansos.** Nodos nuevos en `#p-descanso` y en los
  dos mocks (`CB.ui.personaje` sale por su `return` si no encuentra `#cri-<quien>`,
  `src/js/30-ui.js:293-295`), CSS nuevo por las tres reglas duras y revalidación del suelo
  táctil. Es una fase entera. En 1.9.0 entra solo la bolsa (11.3).
- **Los diez logros «reservados a la versión 2».** Cerrado en 1.8.0: `CB.logros.LISTA` no la
  pinta ninguna pantalla, el niño no ve ningún hueco. No se reabre.

**Fuera por política del proyecto, sin cambios:** mundos, niveles o destrezas nuevos
(contrato `casos-curriculo.js` CU1-CU8 frente al RD 157/2022); imágenes, fuentes o binarios;
multijugador, clasificaciones o comparación entre niños; **F0.5** y **F10**, que necesitan
niños reales y no código — los `betaBase` siguen siendo una calibración razonada, no una
medida, y así hay que seguir diciéndolo.

---

# Versión: 1.9.0

**Segunda cifra.** Entra capacidad: la lectura en voz alta del enunciado en la partida, la
presentación de cada formato, el deshacer en dos formatos, la hilera de avance del HUD, la
memoria de posición de la música y cinco celebraciones que antes no existían.

**La primera cifra se queda.** La regla del proyecto es que solo sube cuando el formato del
perfil obliga a migrar en `src/js/01-almacen.js`. No obliga: `perfil.mensajes.bolsaDescansos`
la crea `CB.mensajes.asegurar()` (`src/js/25-mensajes.js:51-62`), igual que hoy hace con
`gritos` (`:60`), y `componentesVistos` ya está en el esqueleto
(`src/js/01-almacen.js:195`), en la reparación (`:264`) y en `CAMPOS_PERMITIDOS` (`:443`).
Un perfil de 1.8.0 abre en 1.9.0 sin migración.

**Réplicas a actualizar, las seis:** `src/js/00-nucleo.js:258` (fuente), `README.md`,
`CHANGELOG.md`, `LEEME.txt`, `package.json` y `dist/sw.js` (la inyecta gulp). `auditar.mjs`
falla si divergen.

---

# Verificación

```bash
npm run entregar        # build + auditoría: la puerta. Nunca auditar.sh solo.
npm run autoprueba      # ¿ve la auditoría lo que dice que ve?
node herramientas/cruzar-clases.mjs
```

Suite en **las dos páginas**, en pestaña en **primer plano** y **servidas con
`Cache-Control: no-store`**: `pruebas/pruebas.html` y `pruebas/pruebas-min.html`. Base
esperada: **489 + los guardianes nuevos**, 0 fallos, y el sufijo `· NNNN ms` presente (sin él,
la suite sigue corriendo).

Antes de dar por bueno un verde, afirmar algo del bundle recién construido —`CB.VERSION`,
`typeof CB.memoria.conMusgo === 'function'`, `CB.ui.cinta.espera.length === 3`—: una recarga
normal de Chrome reutiliza el bundle y los `casos-*.js`, y entonces el verde mide el código de
hace tres cambios sin que el número de comprobaciones lo delate.

**Orden obligatorio de sub-commits, por dependencias:**
6.1 → 6.2 → 6.3 · 7.1 → 7.2 · **8.1 → 8.2** → 8.3 → 8.4 · 9 · **10.3 → 10.4 → 10.5**,
10.1 y 10.2 en cualquier momento · 11 · 12 · **13.1 → 13.2** → 13.3 · 14 · 15.

**A mano, porque no se automatiza:**

1. Doble clic en `dist/index.html`, perfil nuevo, de la calibración al primer ítem sin toque
   intermedio, partida entera, consola limpia.
2. `PROB_BLOQUE_RARO = 1` temporalmente: el cromo se nombra en la cinta y en el mensaje quieto.
3. Teclado bloqueado en las cuatro anchuras de referencia: doce teclas iguales, dígitos
   legibles. Repetir con `:root.sin-movimiento` y con `:root.alto-contraste`.
4. Combate de jefe completo con VoiceOver activo: acierto y fallo se oyen los dos.
5. Cinco idas y venidas a reparación: la pista del mundo avanza, no reinicia.
6. Sesión de 20 ítems cronometrada, antes y después de 13.1, con el número escrito en el
   commit.