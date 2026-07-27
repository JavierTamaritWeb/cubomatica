> **Documentación interna. No se distribuye con el juego.**

# Plan 1.8.0 — celebrar bien, enseñar más, estorbar menos

## Cómo se ha escrito este plan, y qué le falta

Se lanzó una auditoría multiagente de cinco lentes (pedagogía, diversión, facilidad,
cintas y pruebas) con crítica adversaria por lente. **Murió entera: los seis agentes
fallaron por límite semanal de uso y el diario no guardó ni un resultado parcial.** Este
plan lo ha escrito una sola lectura del código, directa.

Consecuencia honesta, y conviene tenerla presente al leer: **la fase 1 y la fase 5 están
apoyadas en código leído línea a línea** y son ejecutables tal cual. Las fases 3 y 4
(diversión y fricción) están apoyadas en menos evidencia de la que merecerían — son
direcciones correctas con ejemplos verificados, no un barrido exhaustivo. Cuando haya
cuota, la lente de pedagogía y la de diversión merecen volver a lanzarse.

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
