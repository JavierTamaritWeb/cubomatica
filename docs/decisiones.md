> **Documentación interna. No se distribuye con el juego.**

# Cubomática — Registro de decisiones cerradas

> Cubomática 1.0.0

Fecha de apertura: **25 de julio de 2026**.
Fuente: `PLAN.md` v2. Este fichero es la **fase F-1** de §18: los cinco documentos que
la Regla Cero exige cerrar **antes** de escribir una línea de F0.

Ningún valor de este fichero está marcado «por definir».

---

## Documento 1 — Fórmula de puntuación y sus 30 casos (PLAN §11)

```js
CB.puntuacion.calcular(item, rtMs, estado):
  Pb = item.puntosBase
  tI = item.tIdeal ; tL = item.tLimite
  if (tL - tI < 500) tL = tI + 500          // guarda de división por cero

  mT = (estado.modoTiempo === 'sinPrisa')
       ? 0.85
       : clamp(1.4 - 0.8 * (rtMs - tI) / (tL - tI), 0.6, 1.4)

  if (estado.azar)          puntos = 0, gemas = 0
  else if (estado.correcto) fIntento = (intento === 1) ? 1.0 : 0.4
                            puntos = round(Pb * mT * fIntento)
                            gemas  = max(1, round(puntos / 50))
  else                      puntos = 0, gemas = 0     // NUNCA negativo

  guardas: !isFinite → 0
```

`mT` se calcula **siempre con la `d` base del nivel**, sea cual sea el modo de tiempo.
El modo solo cambia **cuándo se agota el tiempo**, nunca **cómo se puntúa** (antifarmeo).

**Los 30 casos exactos** (`pruebas/casos-formulas.js`, sin tolerancia):

| # | Nivel | Pb | rt | tI | tL | modo | int. | corr. | azar | mT | puntos | gemas |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| C01 | S9 | 100 | 8000 | 8000 | 24000 | normal | 1 | sí | no | 1,40 | 140 | 3 |
| C02 | S9 | 100 | 4000 | 8000 | 24000 | normal | 1 | sí | no | 1,40 | 140 | 3 |
| C03 | S9 | 100 | 600 | 8000 | 24000 | normal | 1 | sí | no | 1,40 | 140 | 3 |
| C04 | S9 | 100 | 12000 | 8000 | 24000 | normal | 1 | sí | no | 1,20 | 120 | 2 |
| C05 | S9 | 100 | 16000 | 8000 | 24000 | normal | 1 | sí | no | 1,00 | 100 | 2 |
| C06 | S9 | 100 | 24000 | 8000 | 24000 | normal | 1 | sí | no | 0,60 | 60 | 1 |
| C07 | S9 | 100 | 35000 | 8000 | 24000 | normal | 1 | sí | no | 0,60 | 60 | 1 |
| C08 | S9 | 100 | 12000 | 8000 | 24000 | normal | 2 | sí | no | 1,20 | 48 | 1 |
| C09 | S9 | 100 | 12000 | 8000 | 24000 | normal | 1 | no | no | 1,20 | 0 | 0 |
| C10 | S9 | 100 | 900 | 8000 | 24000 | normal | 1 | no | sí | 1,40 | 0 | 0 |
| C11 | S9 | 100 | 12000 | 8000 | 24000 | conCalma | 1 | sí | no | 1,20 | 120 | 2 |
| C12 | S9 | 100 | 12000 | 8000 | 24000 | sinPrisa | 1 | sí | no | 0,85 | 85 | 2 |
| C13 | S9 | 100 | 4000 | 8000 | 24000 | sinPrisa | 1 | sí | no | 0,85 | 85 | 2 |
| C14 | S9 | 100 | 30000 | 8000 | 24000 | sinPrisa | 1 | sí | no | 0,85 | 85 | 2 |
| C15 | N3 | 80 | 6000 | 6000 | 18000 | normal | 1 | sí | no | 1,40 | 112 | 2 |
| C16 | N3 | 80 | 12000 | 6000 | 18000 | normal | 1 | sí | no | 1,00 | 80 | 2 |
| C17 | N3 | 80 | 18000 | 6000 | 18000 | normal | 1 | sí | no | 0,60 | 48 | 1 |
| C18 | R8 | 110 | 9000 | 9000 | 27000 | normal | 1 | sí | no | 1,40 | 154 | 3 |
| C19 | R8 | 110 | 18000 | 9000 | 27000 | normal | 1 | sí | no | 1,00 | 110 | 2 |
| C20 | R8 | 110 | 27000 | 9000 | 27000 | normal | 1 | sí | no | 0,60 | 66 | 1 |
| C21 | R8 | 110 | 18000 | 9000 | 27000 | normal | 2 | sí | no | 1,00 | 44 | 1 |
| C22 | M4 | 100 | 7000 | 7000 | 21000 | normal | 1 | sí | no | 1,40 | 140 | 3 |
| C23 | M4 | 100 | 14000 | 7000 | 21000 | normal | 1 | sí | no | 1,00 | 100 | 2 |
| C24 | M4 | 100 | 21000 | 7000 | 21000 | normal | 1 | sí | no | 0,60 | 60 | 1 |
| C25 | P3 | 160 | 20000 | 20000 | 50000 | normal | 1 | sí | no | 1,40 | 224 | 4 |
| C26 | P3 | 160 | 35000 | 20000 | 50000 | normal | 1 | sí | no | 1,00 | 160 | 3 |
| C27 | P3 | 160 | 50000 | 20000 | 50000 | normal | 1 | sí | no | 0,60 | 96 | 2 |
| C28 | P3 | 160 | 35000 | 20000 | 50000 | normal | 2 | sí | no | 1,00 | 64 | 1 |
| C29 | E4 | 90 | 10000 | 10000 | 26000 | normal | 1 | sí | no | 1,40 | 126 | 3 |
| C30 | V1 | 70 | 7000 | 7000 | 20000 | normal | 1 | sí | no | 1,40 | 98 | 2 |

**Aserciones A1-A6:** A1 tres fallos no bajan el marcador · A2 C03 da 140 y `azar===false`
· A3 `85 < 140` y `85 > 60` · A4 `bonoFinal(*,*,*,0,0) = {factor:1, extras:[], total:0}`
· A5 los casos de penalización dan exactamente 0 · A6 `bonoFinal(0.92,true,true,15,1500)`
→ `factor 1,45`, `total 675`.

**Bono final:**
```js
factor = 1.0
 + (precision1er >= 0.90 ? 0.20 : precision1er >= 0.75 ? 0.10 : 0)
 + (sinDanio ? 0.15 : 0) + (maraton ? 0.10 : 0)
total  = max(0, round(puntosSesion * (factor - 1)))
preguntas === 0 → {factor:1, extras:[], total:0}
```

---

## Documento 2 — Valores base por familia y los 92 niveles (PLAN §8)

| Familia | `puntosBase` | `tIdeal` (ms) | `tLimite` (ms) | `betaBase` |
|---|---|---|---|---|
| N numeración | 80 | 6000 | 18000 | 880 – 1180 |
| S sumas | 100 | 8000 | 24000 | 940 – 1260 |
| R restas | 110 | 9000 | 27000 | 980 – 1320 |
| M multiplicación | 100 | 7000 | 21000 | 1140 – 1360 |
| P problemas | 160 | 20000 | 50000 | 1040 – 1420 |
| E dinero | 90 | 10000 | 26000 | 940 – 1220 |
| V vocabulario | 70 | 7000 | 20000 | 880 – 1100 |

Guarda obligatoria: `if (tLimite - tIdeal < 500) tLimite = tIdeal + 500;`

**Dificultad interna `D`:** 1 = números pequeños · 2 = estándar · 3 = límite del rango.
Sube tras **3 aciertos consecutivos a primer intento**; baja tras **2 fallos**.
Se persiste en `perfil.niveles[id].D`. No cambia el rango declarado del nivel.

**Reparto:** N 16 · S 16 · R 14 · M 10 · P 20 · E 8 · V 8 = **92 niveles**.
La tabla completa con rango, llevadas, `trimestreSugerido`, formato, saber y criterios
es el anexo §8.3 de `PLAN.md` y se materializa en `js/17-catalogo.js`.

**Techo por trimestre:** T1 ≤ 199 · T2 ≤ 599 · T3 ≤ 999.

**Restas:** con `ampliacion:false`, **como máximo UNA llevada** y **prohibido el 0** en
cualquier columna del minuendo que exija préstamo. R14 (doble llevada y cero intermedio)
es ampliación tras `flagAdulto:'restasDobleLlevada'`, apagada por defecto.

**Multiplicación:** con `tablas69 === false`, **ambos** factores en `{0,1,2,3,4,5,10}`.
Con el flag, ambos en `{0..10}`. Nunca > 10.

---

## Documento 3 — Claves de almacenamiento y migración (PLAN §15)

| Clave | Contenido |
|---|---|
| `cubomatica.perfil.<id>` | Objeto `Perfil` completo |
| `cubomatica.perfiles.indice` | `[{id, mote, avatar, ultimoISO}]` |
| `cubomatica.ultimoPerfil` | id del último perfil activo |
| `cubomatica.ajustes` | `{volumen, silencio, modoAula, modoProyeccion}` — del **aparato** |
| `cubomatica.esquema` | Entero: versión de esquema global |

`CB.almacen.VERSION_ESQUEMA = 2`. **La versión va en el objeto, nunca en la clave.**
Los literales `'cubomatica.…'` solo pueden aparecer en `js/01-almacen.js` (grep de §14.4).

**Precedencia de ajustes:** `cubomatica.ajustes` solo contiene lo físico del aparato;
todo lo pedagógico y de accesibilidad vive en `perfil.ajustes`. No hay herencia implícita.

**Migración:** cada paso **añade** campos con valor por defecto y **jamás borra**.
Si `perfil.version > VERSION_ESQUEMA`, `leer()` no carga y devuelve `{error:'perfil-mas-nuevo'}`.
Ante una excepción, `perfilNuevoDesdeRestos()` conserva id, mote, gemas, puntosTotales,
logros, cromos y glosario.

**Escritura en dos fases:** `clave.tmp` → verificación con `JSON.parse` → `clave` →
borrado del `.tmp`. `sanear()` convierte `NaN`/`Infinity` en `0` antes de serializar.

**Fechas:** `CB.util.hoyISO()` construye `YYYY-MM-DD` con `getFullYear/getMonth/getDate`.
**`toISOString` está prohibido en todo el proyecto** (daría el día anterior después de
las 22:00 en horario peninsular de verano). `diasEntre()` compara a mediodía local.
`CB.util.ahora()` usa `performance.now()` cuando existe: es monotónica.

**Poda:** respuestas 800 (doméstico) / 150 (aula) · historial 60 / 20 ·
`diasJugados` y `tiempoPantallaPorDia` últimos 120 días · `ejemplos` máx. 3 ·
`rtMuestras` máx. 12. Se ejecuta al cerrar partida, en `pagehide` y en `CB.arranque()`.

---

## Documento 4 — Las 18 pantallas y sus ids (PLAN §14.3)

| # | id | Título | Condición de entrada |
|---|---|---|---|
| 1 | `p-portada` | Cubomática | Siempre |
| 2 | `p-perfiles` | ¿Quién juega? | Si hay >1 perfil o ninguno |
| 3 | `p-calibracion` | (sin título visible) | Primera partida del perfil |
| 4 | `p-mapa` | La Cantera | Tras JUGAR |
| 5 | `p-cantera` | Mis vetas | Desde el mapa o el fin de partida |
| 6 | `p-partida` | (HUD) | `CB.partida.iniciar()` |
| 7 | `p-reparacion` | Vamos a verlo | 2.º fallo de un ítem |
| 8 | `p-descanso` | ¡Descanso! | Cada 6-8 ítems |
| 9 | `p-jefe` | (nombre del jefe) | Niveles nucleares del mundo completados |
| 10 | `p-fin` | Fin de la expedición | Cualquier `motivoFin` |
| 11 | `p-casa` | Mi álbum | Desde el mapa |
| 12 | `p-glosario` | Diccionario de Bloques | Desde el mapa |
| 13 | `p-ajustes` | Ajustes | Desde la portada o la pausa |
| 14 | `p-adulto` | Personas adultas | Tras la puerta parental |
| 15 | `p-informe` | Informe | Desde `p-adulto`. `class="imprimible"` |
| 16 | `p-creditos` | Créditos | Desde la portada |
| 17 | `p-ayuda` | Ayuda | Desde la portada o el mapa. Maqueta estática, sin `alEntrar` |
| 18 | `p-error` | Se ha soltado un bloque | `window.onerror` / `unhandledrejection` |

El botón **Salir** es visible en todas salvo `p-portada` y `p-error`.

---

## Documento 5 — La regla de las luces, el tiempo y el azar (PLAN §12.1)

```
1. El tiempo agotado NUNCA apaga una luz, en ninguna circunstancia.
   Ni el primero, ni ninguno. (WCAG 2.2.1 Timing Adjustable, nivel A.)

2. La detección de azar NUNCA apaga una luz.

3. Se apaga una luz ÚNICAMENTE al fallar el SEGUNDO intento de un ítem,
   después de haber visto la tarjeta de reparación.

4. SALVAGUARDA ANTI-BLOQUEO:
   · 3 tiempos agotados CONSECUTIVOS  ⇒ cambio automático a modo «Sin prisa»
     con el aviso «Vamos con más calma».
   · 6 tiempos agotados EN LA PARTIDA ⇒ fin amable con motivoFin:'pausa'
     y el progreso guardado íntegro.

5. Tope de luces en partida: 5.   Luces iniciales: 3.
6. El exceso sobre el tope NO se convierte en gemas: va a perfil.vidasReserva (máx. 2).
7. Al apagarse la 3.ª luz: pantalla «Fin de la expedición» conservando el 100 % de las
   gemas y TODO el progreso de destrezas. NUNCA se pierde lo aprendido.
```

**Penalización del azar** (requisito 7): `puntos = 0`, `gemas = 0`, rompe la racha, no
cuenta para logros, sin bono de rapidez; en los 3 ítems siguientes, segundo toque de
confirmación y bloqueo de habilitación a 1200 ms; a la 3.ª detección de la sesión se
fuerza un micro-descanso. **Nunca apaga una luz, nunca resta puntos ya ganados, nunca
bloquea contenido.**

**Detección:** `azar = !correcto && (S1..S4).length >= 2`, con
`S1: rt < max(700 ms, 0,15 × mediana personal de la destreza)`.
La primera línea de `evaluar()` es `if (correcto) return {azar:false}`: el invariante
«un acierto rápido nunca es azar» queda garantizado **por construcción**.

**Luces extra:** «Vuelta al pozo», «Veta restaurada» y «Reto bonus superado».
Máximo **2 luces concedidas por partida**. Desactivados en Cantera Tranquila.

---

## Decisiones tomadas durante la implementación

| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-07-25 | `CB.util.ahora()` se define como función de plataforma en `00-nucleo.js` y **está exenta** del grep `window\.` porque necesita `window.performance`. La exención se declara aquí, no se descubre al fallar el test. | El grep de frontera de §14.4 se aplica a `00-nucleo.js`; sin esta exención declarada fallaría contra código correcto y la reacción típica sería desactivar el test. Se implementa con `typeof performance !== 'undefined'`, que **no menciona `window.`** y por tanto pasa el grep sin excepción. |
| 2026-07-25 | Los micro-descansos y el bloque raro se sirven desde `40-partida.js`, no desde un módulo propio. | No justifican un fichero: el recuento de 43 scripts es un contrato verificado por `casos-carga.js`. |
| 2026-07-25 | `pruebas/pruebas.html` carga los mismos 43 scripts con rutas `../`. | Evita duplicar el contrato de orden en dos sitios. |

## Contradicciones internas del plan detectadas al implementar

Las tres se detectaron al ejecutar los invariantes sobre 36.800 ítems generados.
Ninguna es una desviación por comodidad: en los tres casos el texto del plan era
**imposible de cumplir tal cual estaba escrito**.

### C1 — Invariante 4 mutilaba la tabla del 2 (§8.3 vs. §13)

**El conflicto.** §8.3 declara `M4 | Tabla del 2 | factores 2 × 0-10`. El
invariante 4 exigía que **ambos** factores estuvieran en `{0,1,2,3,4,5,10}`. Bajo
esa lectura, la tabla del 2 solo podía practicarse para ×0,1,2,3,4,5 y ×10:
faltaban ×6, ×7, ×8 y ×9, **más de un tercio de la única tabla que el plan
declara nuclear**. El requisito 1 del usuario quedaba a medias de hecho.

**Resolución.** Se conserva la intención declarada del invariante («que 4 × 8 no
pase dentro del nivel de la tabla del 4, porque 4 × 8 es un hecho de la tabla del
8») con una regla que sí la expresa:

```
tablas69 === false → al menos UNO de los factores ∈ {2, 5, 10}
                     O AMBOS ≤ 5 (matriz y suma reiterada, M1-M3)
tablas69 === true  → ambos ∈ {0..10}
siempre            → ningún factor > 10
```

Comprobado: `2×7` ✓ · `5×9` ✓ · `10×8` ✓ · `3×4` ✓ · `4×8` ✗ · `3×8` ✗ · `6×7` ✗.
Como M9 y M10 (tablas del 3 y del 4) son ampliación bloqueada tras el flag, con
el flag apagado el factor fijo siempre pertenece a `{2,5,10}`.

Cardinalidades corregidas en consecuencia: M4, M5, M6, M9, M10 de 7 a **11**;
M7 de 21 a **33**.

### C2 — Invariante 12 exigía cero colisiones (imposible)

**El conflicto.** «En 200 generaciones con semillas distintas, los ítems únicos
son ≥ min(200, 0,8 × cardinalidad)». Con cardinalidad ≥ 250 eso pide 200 únicos
en 200 tiradas, es decir **cero colisiones**. Por el problema del cumpleaños, la
esperanza de valores distintos al extraer 200 veces de un espacio de 250 es
`250·(1−(1−1/250)^200) ≈ 138`. El test habría fallado siempre contra generadores
correctos, y la reacción típica habría sido desactivarlo.

**Resolución.** Se compara con la esperanza bajo muestreo uniforme y se exige el
75 % de ella (`CB.catalogo.variedadSuficiente`). Un generador colapsado, o que
solo recorra una esquina de su rango, sigue fallando en rojo.

Cardinalidades mal declaradas y corregidas: **E6** de 120 a **34** (17 precios ×
~2 billetes válidos) y **V5** de 56 a **28** (14 inicios × 2 longitudes).

### C3 — Reparto de niveles por mundo (§5.2)

El encabezado decía «24+24+22+22 = 92» pero las propias listas de `CB.MUNDOS`
suman **24+26+18+24 = 92**. Manda la lista, que es el contenido real. El total
sigue siendo 92 y CU7 (unión exacta, sin repetidos ni huérfanos) lo verifica.

### C5 — El motor adaptativo no podía converger (§13.2 vs. §8.1)

**El conflicto.** Tres piezas incompatibles entre sí:

1. La actualización de Elo clásica `theta += K·(acierto − esperado)`.
2. La banda objetivo `[theta − 60, theta + 120]`.
3. La afirmación de que esa banda da «probabilidad de acierto ≈ 0,80-0,88».

Con la logística de Elo, un ítem cuya β iguala a θ da el **50 %**, no el 80 %.
Y el Elo clásico converge al punto donde el acierto observado iguala a la
expectativa; con adivinanza `c` y desliz `s`, ese punto fijo está en
`L = c/(c+s)`, que para el teclado (c = 0,02, s = 0,10) es el **16,7 %**.

El niño sintético lo dejó a la vista: **43,9 %** el flojo y **64,2 %** el medio,
cayendo, en lugar del 75-92 % que el propio plan exige como criterio de HECHO
de F1. Y un **55 %** de partidas del niño flojo se quedaban sin luces antes del
ítem 8, contra el «< 5 %» exigido. Es decir: el niño que más necesita el juego
era justo al que el juego machacaba.

**Resolución, en tres piezas coherentes entre sí:**

| Pieza | Antes | Ahora | Por qué |
|---|---|---|---|
| Regla de actualización | Elo clásico | `theta += K·(acierto − 0,80)` (Robbins-Monro) | Converge exactamente al punto donde el niño acierta el 80 %, sea cual sea su adivinanza o su desliz. Y da a `theta` un significado explicable: «la dificultad a la que este niño acierta 8 de cada 10». |
| Banda de elección | `[θ−60, θ+120]` | `[θ−420, θ−260]` | Para acertar 8 de cada 10, el ítem tiene que estar unos 340 puntos **por debajo** de la competencia, no por encima. |
| Escala de `betaBase` | 880 – 1420 | **320 – 1280** | Con β mínima 880, el nivel más fácil del catálogo —contar ocho bloques— quedaba fuera del alcance de un niño flojo. El motor no tenía **nada suficientemente fácil que ofrecer**. |

`puntosBase`, `tIdeal` y `tLimite` **no se tocan**: son el contrato de los 30
casos de puntuación.

**Resultado medido** (niño sintético independiente, 40 sesiones, tres perfiles):

| θ_real | Acierto | Partidas cortas |
|---|---|---|
| 700 (flojo) | **76,3 %** | 0,0 % |
| 1000 (medio) | **86,1 %** | 0,0 % |
| 1400 (avanzado) | **90,2 %** | 0,0 % |

Las `betaBase` son una **calibración inicial razonada, no una medida**. F10 las
recalcula con 10-15 niños reales mediante `pruebas/calibrar-beta.js`, que es
exactamente para lo que el plan reserva esa fase.

### C4 — El par de contraste `[--foco-oro, --bg-texto-panel] ≥ 3,0` (§10.3)

Inalcanzable: el oro `#F5C518` sobre crema `#FFF6E5` da **1,54:1**, y ningún oro
reconocible como tal llega a 3:1 sobre un fondo claro. Se implementa un
indicador de foco de **dos tonos** (oro + anillo oscuro `#241C14`), que es la
solución correcta para WCAG 2.4.11 y 1.4.11 porque contrasta con lo que tiene al
lado en ambos sentidos. Pares verificados: `[--foco-oro, --foco-borde] = 10,3:1`
y `[--foco-borde, --bg-texto-panel] = 15,8:1`.

Además, `--btn-primario-texto` pasa de crema a `#241C14`: el crema sobre el verde
`#5AA02C` da 3,05:1 y no llega al 4,5 exigido para texto normal.

---

## Cambios pedidos después de la entrega

### P1 — Música de fondo (9 pistas aportadas por el usuario)

El plan decía «cero ficheros de audio» y todo el sonido se sintetizaba con Web
Audio. Eso cambia: hay nueve mp3 en `audio/`. La justificación completa, la
trazabilidad de nombres, el reparto por pantalla, la normalización y los puntos
de bucle están en **`docs/musica.md`**. Lo que hay que saber sin abrir ese
documento:

- **No pasan por `CB.audio.maestro`.** Meter un fichero en un `AudioContext`
  exige `decodeAudioData()` sobre un `ArrayBuffer`, es decir `fetch()`, y sobre
  `file://` eso está bloqueado por CORS. Un `<audio src="...">` relativo se
  carga como subrecurso del documento, igual que una hoja de estilo, y funciona
  con doble clic. El criterio de «se abre con doble clic» manda.
- **El silencio del aparato alcanza a la música a mano**, desde
  `CB.audio.silenciar()`. Es la única costura entre los dos sistemas de sonido y
  está en un solo sitio.
- **Se renombraron las nueve pistas.** Seis nombres originales llevaban marcas
  registradas de terceros en el nombre del fichero. Renombrar era la única forma
  de no meterlas en `audio/`, en `js/07-musica.js` y en la pantalla de créditos.
- **El presupuesto de peso se partió en dos**: 900 KB de código (el que protegía
  el arranque) y 60 MB de música, con lista cerrada de ficheros. Un solo tope de
  60 MB habría dejado al código engordar setenta veces sin que nadie lo notara.

### P2 — Cuenta atrás de 30 s con reloj de arena y «Hurry up!»

**Esto contradice a propósito el §11.4 del plan**, que decía literalmente que la
rapidez suma pero nunca resta y que jamás habría una cuenta atrás corriendo
mientras el niño piensa. Se cambia porque se pidió expresamente. Queda escrito
aquí porque dentro de seis meses alguien va a leer el §11.4 y va a pensar que el
reloj es un error.

Lo que **no** se ha cambiado, y son las dos cosas que no dependen del gusto:

1. **Quedarse sin tiempo no apaga ninguna luz.** `CB.vidas.timeout()` sigue
   devolviendo las mismas luces. Un reloj en pantalla invita a suponer que al
   llegar a cero pasa algo malo; no pasa. Lo comprueba `casos-reloj.js`.
2. **«Sin prisa» apaga la cuenta atrás entera.** La WCAG 2.2.1 exige que un
   límite de tiempo se pueda desactivar, y esto es material escolar sujeto a la
   EN 301 549. `CB.partida.SEGUNDOS_ITEM.sinPrisa` vale 0 y hay un test que lo
   fija.

Efectos secundarios de poner 30 s planos:

- **`tIdeal` y `tLimite` por familia dejan de gobernar cuándo se agota el
  tiempo**, pero siguen gobernando el bono por rapidez de §11.7 intacto. Antes
  el temporizador era invisible y podía durar distinto en cada pregunta; ahora
  se ve, y un reloj que dura distinto sin decir por qué desconcierta más de lo
  que ayuda.
- **«Con calma» y «Normal» pasan a ser el mismo tiempo.** El ×2 de «Con calma»
  vivía justo en ese temporizador. Recuperar la diferencia es cambiar un número
  en `CB.partida.SEGUNDOS_ITEM`.
- **Los problemas de enunciado son el punto flojo.** 30 s incluyen leer tres
  frases antes de empezar a pensar. Es lo primero que hay que mirar en el
  pilotaje con niños (F0.5) y se sube en `SEGUNDOS_ITEM` y en ningún otro sitio.

Dos fallos que solo aparecieron al verlo en pantalla, y que valen por sí solos
la sesión de navegador:

- **El cartel «Hurry up!» quieto tapaba la fila del ⌫, el 0 y el OK.** Es decir:
  el aviso de que queda poco tiempo tapaba el botón con el que se contesta,
  justo en los diez segundos de prisa. Ahora cruza la pantalla de abajo arriba
  en 1,9 s y no se queda en ningún sitio, que además es lo que se pidió al pie
  de la letra.
- **`.zona-juego > *:not(.cielo) { position: relative }` le ganaba por cascada
  al `position: absolute` del cartel.** Su `top: 38%` pasaba a ser un
  desplazamiento relativo y el cartel se dibujaba 250 px por debajo del borde
  inferior de la pantalla: invisible, sin ningún error en consola y sin ningún
  test en rojo. Se arregló excluyéndolo en las dos reglas de `06-biomas.css`.

Y un fallo de la propia auditoría, del mismo tipo que el que ya se había
corregido para JS: **`auditar.sh` grepeaba el CSS con los comentarios dentro**,
así que un comentario que decía «cero `border-radius`» suspendía la auditoría.
Ahora se despiezan los comentarios de CSS antes de grepear, y hay una prueba
negativa que confirma que las tres reglas de estilo siguen cazando infracciones
de verdad.

---

## Auditoría de errores (1.0.0)

Cinco defectos encontrados y corregidos, más un riesgo latente acotado. Todos
salieron de ejecutar el juego, no de leerlo: los cinco convivían con 295
comprobaciones en verde y la auditoría de entrega en verde.

### E1 — La llave del panel del adulto mandaba a la pantalla de error

**El más grave.** `CB.pantallas.alEntrar['p-adulto']` llamaba a
`CB.adulto.abrir()`, y `abrir()` empezaba llamando a `CB.pantallas.ir('p-adulto')`.
Es decir: `ir()` invocaba al handler y el handler volvía a invocar a `ir()`.
Recursión infinita, desbordamiento de pila, y el `catch` de `ir()` lo convertía
en «algo ha ido mal».

Consecuencia real: **el panel del adulto nunca fue accesible.** Con él quedaban
fuera de alcance los ajustes, el informe imprimible, la exportación del progreso
y los interruptores de las tablas del 6 al 9, los céntimos y la doble llevada.

Arreglado en dos capas: `abrir()` ya no navega —los otros siete handlers solo
pintan, que es el contrato—, y `ir()` lleva un cerrojo de reentrada para que
esta clase de fallo no pueda volver a ocurrir en silencio en otra pantalla.

**Por qué no lo cazó nadie:** no había una sola prueba que ENTRARA en una
pantalla. `casos-carga.js` comprobaba que las 17 `<section>` existieran, que es
comprobar la maqueta. Ahora entra en las 16 navegables y exige que ninguna falle.

### E2 — El «toc» del toque prematuro se multiplicaba por ítem

`CB.componentes.conectarToc()` registra un oyente sobre `#item-respuesta`, que es
un nodo **permanente** del `index.html`, y se llama desde los siete componentes
de respuesta, es decir **una vez por ítem**. En el ítem 12 había once oyentes, y
un solo toque prematuro reproducía el efecto «toc» **once veces simultáneas**.

Medido en navegador, no deducido: `11 oyentes → 11 reproducciones por toque`.
Cuanto más jugaba el niño, más fuerte el chasquido. Arreglado con un cerrojo por
contenedor, marcado con un atributo visible en el inspector.

### E3 — Un perfil dañado hacía que el botón JUGAR no hiciera nada

`CB.almacen.leerCrudo()` se traga el fallo de `JSON.parse` y devuelve `null`,
exactamente igual que cuando el perfil **no existe**. Y `CB.perfiles.activar()`
hace `if (!p) return;`.

Resultado: con un perfil corrupto, pulsar JUGAR sobre su tarjeta **no hacía
absolutamente nada**. Ni mensaje, ni error, ni pantalla nueva. Un niño toca el
botón, no pasa nada, lo vuelve a tocar, sigue sin pasar nada. Y el adulto no
tenía forma de enterarse de que había progreso guardado ya ilegible.

Arreglado distinguiendo las dos situaciones (`CB.almacen.existeCrudo`) y
devolviendo el centinela `{error: 'perfil-ilegible'}` que `activar()` ya sabía
tratar. El aviso sale **en la lista de perfiles**, no en la pantalla de error:
allí hay algo que hacer —elegir otro minero o crear uno— y en la de error no.

### E4 — El «fin amable» a los 6 tiempos agotados es inalcanzable

`casos-motor.js` validaba en verde, bajo el rótulo `SALVAGUARDA`, que a los 6
tiempos agotados el juego ofrece un fin amable. La función pura lo hace. **El
juego no puede llegar ahí**: a los 3 tiempos seguidos, `cambiaModo` pone la
partida en «Sin prisa», que apaga el cronómetro, y desde ese momento no puede
volver a agotarse el tiempo. El contador se queda clavado en 3.

No se cambia el comportamiento, porque el comportamiento es el bueno: quitarle
el reloj a un niño que va agobiado es mejor intervención que terminarle la
sesión. Lo que se corrige es la **mentira del test**, que hacía creer que hay dos
protecciones cuando hay una. Un test en verde sobre una rama que el juego no
puede ejecutar es justo el fraude que `casos-curriculo.js` dice no querer.

### E5 — La auditoría de estilo grepeaba el CSS con los comentarios dentro

Ya corregido durante la implementación del reloj, pero se anota aquí porque es
del mismo tipo: un comentario que decía «cero `border-radius`» suspendía la
auditoría. Hay ahora una prueba negativa que confirma que las tres reglas de
estilo siguen cazando infracciones de verdad.

### R1 — Riesgo latente: doce globales con nombres genéricos

Sin módulos ni empaquetador, toda `function nombre()` en el ámbito de fichero
acaba en `window`. Hoy hay doce: `ls`, `tramo`, `comparacion`, `serie`,
`itemSuma`, `itemResta`, `itemMult`, `tabla`, `cuantos`, `itemVocab`, `digitos`
y `desdeDigitos`. **No chocan por suerte, no por diseño.** El día que el script
45 declare otra `function tabla()`, la segunda pisa a la primera en silencio y
la multiplicación deja de funcionar sin un solo error en consola.

No se refactoriza a IIFE recién publicada la 1.0.0: envolver ocho ficheros que
empiezan con `var CB = CB || {};` es exactamente el cambio que rompe todo por un
descuido. Se acota con una lista cerrada en `casos-carga.js`, de modo que añadir
un global obliga a escribirlo allí, que es el momento exacto de mirar si el
nombre ya está cogido.

### Lo que se comprobó y estaba bien

- **Cero fugas de temporizadores** en 3 partidas de 25 ítems (13 → 9 → 5 vivos,
  nodos DOM estables en ~620).
- **Cuota de disco llena**: guarda en memoria, marca `sinDisco`, la partida
  continúa y el panel del adulto lo dice.
- **Perfil con forma imposible** (`destrezas` como cadena, `historial` como
  número): el saneador lo arregla sin lanzar.
- **Los 4 jefes**, ganados y perdidos, incluido el tope de 20 turnos.
- **Camino del tiempo agotado** completo: las luces no bajan y a los 3 seguidos
  cambia a «Sin prisa».
- **Ningún error** en las 17 pantallas ni en el panel del adulto entero, con sus
  17 interruptores, el CSV y el informe imprimible.

### Segunda ronda (1.1.0) — accesibilidad, pantalla pequeña y datos

**E6 — Se podía exportar el progreso pero no volver a meterlo.**
`CB.almacen.validarImportado()` estaba escrito, con lista blanca de campos,
mote de lista cerrada, color validado contra patrón y recorte de arrays, y
tenía pruebas. No lo llamaba ningún botón. Mientras tanto, el README y el
propio `CB.LEGAL.LIMITACION` dicen que la copia con «Exportar» es el remedio a
que el progreso viva solo en un navegador. Ese remedio no funcionaba.
Añadido «Restaurar copia (.json)» en la sección Datos del panel del adulto.

**E7 — Tres pantallas sin encabezado.** Partida, calibración e informe. Rompía
dos cosas a la vez: `CB.pantallas.ir()` busca el `<h1>` para llevarle el foco
al entrar y lo dejaba en `<body>`, y la navegación por encabezados de un lector
de pantalla no tenía dónde agarrarse. Se resuelven con un `<h1>` de clase
`.solo-lectores`: visible para el lector, sin ocupar espacio donde el espacio
es lo único que hay.

**E8 — El mapa saltaba de h1 a h3** en las tarjetas de mundo.

**E9 — La maqueta de pruebas no tenía encabezados**, así que comprobaba una
estructura que no se parecía a la del juego. Es el mismo problema de fondo que
E1: una maqueta que se aleja del original deja de servir para comprobar nada.

#### Lo que se comprobó y estaba bien

- Cero controles sin nombre accesible en las 17 pantallas.
- Partida completa **solo con teclado**, incluida la rejilla del teclado
  numérico con flechas y el avance hasta la micropausa.
- A 760 × 463 no se sale ningún botón y todos miden 64 × 64 (por encima del
  mínimo de la WCAG, por debajo de los 96 × 96 que aspira el plan: en pantallas
  pequeñas el objetivo propio no se alcanza, y conviene saberlo).
- Por debajo de 420 px de alto salta el aviso de girar el dispositivo, que tapa
  la pantalla y evita que se juegue en un espacio donde no cabe el teclado.
- Ida y vuelta de exportar/restaurar **idéntica** tras un `localStorage.clear()`.
- Importación hostil neutralizada: HTML en el mote, inyección CSS en el color,
  `../../etc/passwd` en el id y un array de 50.000 entradas recortado a 800.
- La suite es **determinista**: 308 comprobaciones en tres ejecuciones seguidas,
  con el mismo reparto por bloque.

#### Lo que sigue SIN comprobar, y hay que decirlo

- **`file://`**. Es el modo principal de uso —el del doble clic— y la
  herramienta de navegador de esta sesión se niega a abrir URLs `file://`. Todo
  se ha probado por `http://localhost`. La música se carga con elementos
  `<audio>` y rutas relativas, que es justo lo que podría comportarse distinto.
- **Firefox y Safari.** Todo se ha probado solo en Chrome.
- **Un lector de pantalla de verdad** (VoiceOver, NVDA). Se ha comprobado la
  estructura —nombres accesibles, encabezados, región viva, orden de foco—, que
  es condición necesaria y no suficiente.
- **Toque real en una tableta.** Todos los toques han sido sintéticos.

### Tercera ronda (1.2.0) — compatibilidad

**E10 — En iPad la música no se podía silenciar.** En iOS,
`HTMLMediaElement.volume` es de SOLO LECTURA: asignarle un valor no hace nada y
leerlo devuelve siempre 1. Está documentado por Apple —el volumen lo manda el
botón físico— y todo `07-musica.js` se apoyaba en esa propiedad. En el iPad de
6.ª generación, que es objetivo declarado del proyecto:

- silenciar el juego **no silenciaba la música**, que es exactamente lo que el
  comentario de `CB.audio.silenciar()` llama «el fallo más visible posible»;
- «Baja», «Media» y «Alta» sonaban igual, a tope;
- la normalización por pista no hacía nada y volvían los 8 dB de desnivel;
- el fundido cruzado no fundía: 900 ms con **dos pistas a la vez** a todo volumen;
- el agachado durante la voz tampoco funcionaba, justo en el aparato donde más
  falta hace.

Se detecta una vez, escribiendo `0.123` y releyendo. Cuando el volumen está
bloqueado solo hay dos estados —sonando o parado— y se usa `pause()`. Es peor
que un fundido y mucho mejor que lo anterior. El fundido del bucle se ignora a
propósito en ese modo: parar y arrancar en cada vuelta sonaría peor que la
costura que el fundido venía a tapar.

**Nueva herramienta: `pruebas/comprobar-doble-clic.html`.** La laguna que yo no
podía cerrar es `file://`, el modo principal de uso. Esta página se abre con
doble clic y comprueba en el sitio lo que solo ahí se puede comprobar: que el
navegador deja guardar el progreso, que las texturas se generan y que **las
nueve pistas de música se leen**. Si se abre por `http` lo dice y no da un
veredicto falso.

#### Compatibilidad revisada contra la línea base declarada

Chrome/Edge 100+, Firefox 100+, Safari 15.4+. No hay ni una API por encima:
cero `?.`, cero `??`, cero campos privados, cero `structuredClone`, `.at()`,
`replaceAll`, `Object.fromEntries` ni `Intl`. En CSS, ni `:has()`, ni
`@container`, ni `color-mix`, ni unidades `dvh`. Lo más nuevo que se usa es
`:focus-visible`, que entra justo en Safari 15.4, y lleva su respaldo con
`:not(:focus-visible)`.

También estaban ya bien resueltos: el prefijo `webkitAudioContext`, el
`-webkit-clip-path` de los bulbos del reloj de arena, `touch-action:
manipulation` para quitar el retardo de 300 ms del táctil, la regla de guarda
`[hidden] { display: none !important; }` —sin ella, cualquier `display` de una
clase anula el atributo `hidden` y las pantallas dejan de ocultarse— y el modo
privado de Safari, donde `localStorage` lanza al escribir y `ls()` devuelve
`null` para que entre el respaldo en memoria.

### Cuarta ronda (1.3.0) — doble envío, datos y registro de regresiones

**E11 — Machacar OK registraba una respuesta por pulsación.** Los botones no se
deshabilitan al responder: siguen en pantalla mientras se ve el mensaje. Medido
por la interfaz real: **seis toques en OK = seis respuestas registradas y 18
gemas en vez de 3**.

Y lo grave no eran las gemas. Cada toque metía **una observación más en el motor
adaptativo**, así que la competencia estimada de esa destreza se movía seis veces
por un solo ítem; y el informe del adulto contaba seis intentos donde hubo uno.
Machacar el botón es exactamente lo que hace un niño de 7 años cuando la
respuesta le sale sola, de modo que el juego falseaba en silencio lo único que
promete medir, y lo hacía más cuanto más entusiasmado estaba el niño.

Cerrojo de una respuesta por intento, que se abre en `pintarRespuesta()`: el
único sitio donde se construye la zona de respuesta, y por el que pasan tanto el
ítem nuevo como el segundo intento tras un fallo.

**E12 — Pasar el objeto de destreza creaba una destreza basura.**
`CB.adaptativo.actualizar()` espera el slug. Al pasarle el objeto, JavaScript lo
convertía en `"[object Object]"`, se creaba una destreza con ese nombre, se
guardaba en el perfil del niño y salía en el informe del adulto; mientras tanto
la destreza de verdad no se actualizaba nunca. Es el fallo que cometió esta
misma auditoría, y costó tres intentos verlo porque nada se quejaba. Ahora los
13 slugs son lista cerrada y cualquier otra cosa lanza.

**Nuevo: `pruebas/casos-regresiones.js`.** Registro único de los doce fallos ya
corregidos, con el guardián de cada uno o el fichero donde vive. La regla que
declara: *un fallo corregido sin prueba vuelve*.

#### Lo que se comprobó y estaba bien

- **Crecimiento del perfil guardado**: 120 partidas de 20 ítems —un curso
  escolar jugando a diario— y el perfil se estabiliza en **241 KB**. El podado
  acota `respuestas` en 800 y `historial` en 60; solo crece la lista de días
  jugados, a unos 50 bytes por partida.
- **Modo aula**: con los topes de aula el perfil baja a **54 KB**, y 30 niños
  ocupan 1,58 MB, holgado dentro de los 5 MB típicos de un navegador. Con la
  cuota llena se sigue jugando y se avisa al adulto.
- **Motor adaptativo, 3000 ítems por perfil**: `candidatos()` **nunca** devuelve
  la lista vacía, que es lo que terminaría una partida en el ítem 0; no aparecen
  destrezas inventadas; y con acierto del 80 % —el objetivo de diseño— la
  competencia estimada converge en 560-1248 sin saturar ninguno de los dos topes.
  La saturación con aciertos del 95 % o del 35 % es artefacto del simulador, que
  mantiene la tasa fija independientemente de la dificultad; un niño real no.

### Quinta ronda (1.4.0) — logros, borrado e impresión

Ronda de rendimiento bajo, y eso también es un resultado: dos de las tres zonas
estaban bien. Se anota lo comprobado para no volver a mirarlo.

**E13 — Ctrl+P desde cualquier pantalla imprimía un folio en blanco.** La hoja
de impresión fuerza `.imprimible[hidden] { display: block !important; }`, que
gana por especificidad a la guarda `[hidden] { display: none !important; }`. El
informe se imprime, por tanto, se esté donde se esté; y con el contenedor vacío
—que es como está hasta que alguien lo genera desde el panel del adulto— salía
una hoja en blanco sin una sola pista de qué había pasado. Ahora el contenedor
trae una línea que dice dónde se genera, y `imprimirInforme()` la sustituye.

#### Comprobado y correcto

**Los tres logros que dan vida extra funcionan de punta a punta.** Es el
requisito 10 del encargo y merecía la comprobación completa después de lo del
panel del adulto: `vuelta_al_pozo`, `veta_restaurada` y `reto_bonus` están
declarados con `luz: true`, los tres eventos se disparan desde `40-partida.js`
con el contexto que sus condiciones necesitan, `filtrarConLuz` los reconoce y
`CB.vidas.conceder()` sube la luz de verdad. Además están bien acotados: tope de
2 por partida, `vuelta_al_pozo` no se cobra dos veces, y al llegar al tope de 5
luces se guarda en reserva en vez de perderse. En Cantera Tranquila no se
conceden, porque allí no hay luces.

**El borrado de perfil es correcto y está bien protegido.** Hay que escribir la
palabra BORRAR —con la palabra mal escrita no pasa nada—, y al confirmar se
quita del índice, se borra la clave del disco, `ultimoPerfil` pasa al perfil que
queda en vez de apuntar a un fantasma, el perfil activo se anula, el panel del
adulto vuelve a bloquearse y se navega a la lista. Ni un cabo suelto.

**La hoja de impresión está bien construida:** A4 con márgenes, fondo blanco y
texto negro forzados, se ocultan HUD, barra de herramientas, botones, cielo,
nubes y partículas, se quitan las URL de los enlaces, los tamaños van en puntos
y los `h2` llevan `break-after: avoid` para no quedarse solos a pie de página.

#### Dos falsos positivos míos, que también conviene anotar

Esta ronda produjo dos sustos que no eran nada: leí `CB.logros.CONCEDEN_LUZ`
como si guardara objetos cuando guarda ids, y pulsé «Confirmar» del borrado sin
escribir la palabra. Los dos «fallos» eran errores de quien auditaba. Se anota
porque el patrón se repite —de trece hallazgos, varios intentos fueron míos— y
porque la conclusión práctica es la contraria de la que parece: cuando algo
parece roto, lo primero que hay que dudar es del arnés de prueba.

---

## Sexta ronda — la que se hizo mirando la pantalla

Las cinco rondas anteriores leyeron el DOM, la lógica, los contratos, los
contrastes y la accesibilidad. Ninguna **miró** el juego. Los cuatro fallos de
esta ronda salieron de una captura de pantalla enviada por quien lo estaba
usando, no de ejecutar nada.

Conviene decirlo sin adornos porque cambia dónde hay que buscar la próxima vez:
las cinco rondas terminaron en verde y con la conclusión de que el rendimiento
por ronda ya no compensaba. Era verdad **para el método que estaba usando**. El
método tenía un punto ciego del tamaño de una pantalla entera.

### E14 — el botón «Leer» de la calibración no hacía nada

`CB.partida.accionLeer()` empieza con `if (!e || !e.itemActual) return;`. La
calibración no crea `CB.partida.estado` a propósito —sin cronómetro, sin luces y
sin puntuación, para que las cuatro preguntas de colocación no parezcan un
examen— así que el botón salía por ese `return` y no ocurría nada.

Es el botón de «vuélvemelo a leer», en la primera pantalla que ve un niño al
pulsar JUGAR, en el momento en que menos sabe qué se espera de él. Ahora esa
rama lee `CB.calibracion.consignaActual`, sin tocar ningún cronómetro porque
allí no hay ninguno.

### E15 — el botón de silencio no reflejaba el silencio

Hay un botón de sonido por barra (calibración y partida) y el silencio es uno
solo, del aparato. El manejador actualizaba **el botón pulsado** y nada más, con
tres consecuencias: el otro botón se quedaba mintiendo, el ajuste guardado se
restauraba al arrancar sin que ningún icono se enterara (silencio real con icono
de altavoz encendido) y `aria-pressed` no existía hasta el primer clic, de modo
que un lector de pantalla no podía decir si estaba pulsado.

`CB.partida.sincronizarSonido()` los pone de acuerdo a todos, y se llama también
al arrancar, que es donde estaba el caso feo.

### E16 — un dibujo de 26 px no dice qué hace un botón

«Leer en voz alta» era 🔊 y «Silenciar» es 🔈: dos altavoces casi idénticos en
la misma barra. La comprobación de nombres accesibles pasaba —los `aria-label`
sí eran distintos— pero un niño de 7 años no lee `aria-label`.

El primer arreglo fue cambiar 🔊 por 🗣, y la respuesta de quien lo probó fue
literal: «este botón es muy confuso, no sé para qué sirve». Tenía razón, y el
segundo intento es la decisión que queda: **icono y palabra**, `🔊 Leer`,
`💡 Pista`, `⏸ Pausa`, `🔈 Sonido`. Cambiar de emoji solo cambia de qué se
duda; la palabra es lo que quita la duda. «Leer» y «Pista» están dentro de lo
que lee un niño de 2.º, y el `aria-label` conserva la frase larga.

Queda como regla: en este proyecto **ningún control se explica solo con un
dibujo**, y `casos-regresiones.js` lo comprueba.

### E17 — la calibración era la única zona de juego sin paisaje

`<div class="zona-juego">` a secas, sin `bioma` y sin `.cielo`: fondo
transparente, o sea un rectángulo marrón liso, inmediatamente después de una
portada con cielo, nubes y hierba. La partida sí declaraba las dos cosas. Es la
primera impresión del juego y era la peor pantalla de todas.

### Dos fallos en las propias pruebas

**Dos comprobaciones de música dependían del foco de la ventana.**
`aplicarVolumenes()` no reanuda la música si `document.hidden`, que es la
conducta correcta —no se arranca sonido en una pestaña de fondo—, pero las
pruebas leían la visibilidad del navegador real. Daban rojo sobre código bueno
en cuanto alguien lanzaba la suite y se iba a mirar otra cosa. Ahora la
visibilidad se fija a mano y se comprueban las dos ramas a propósito.

**`CB.pruebas.ejecutar()` no tenía cerrojo.** Las suites se encadenan con
`setTimeout`, así que una segunda llamada no cancela la primera: las dos cadenas
escriben en el mismo `#salida` y suman en el mismo contador. Se llegaron a ver
23 cajas para 15 suites y 541 comprobaciones donde hay 340. Lo caro no es el
número: es que durante un rato la conclusión fue **«la suite no es
determinista»**, y eso habría mandado a alguien a buscar un fallo que no existe.
Basta con pulsar dos veces «Suite rápida» para reproducirlo.

Relacionado, y anotado en `CLAUDE.md`: la suite hay que ejecutarla **con la
pestaña delante**. Chrome estrangula los `setTimeout` en segundo plano y una
ejecución de 10 s se va más allá de 80 s o se para en seco. El sufijo
`· NNNN ms` solo se añade al terminar la última suite: un resumen sin él sigue
en marcha, por muy verde que se vea.

### La causa única

Las tres primeras (E14, E15, E16) tienen una sola explicación: **la barra de
herramientas no existía en la maqueta de `pruebas.html`**. No se puede probar lo
que no está. Ya está, con su paisaje, en las dos pantallas que la llevan, y por
eso el arreglo de fondo de esta ronda no es ninguno de los cuatro parches sino
la maqueta.

### Lo que sigue sin poder hacerse desde aquí

Sin cambios respecto a la ronda anterior, salvo uno que ya no está: **mirar**.
Esta ronda demuestra que una captura de pantalla enviada por quien juega vale
más que una ronda entera de auditoría automática. Siguen fuera de alcance
Firefox, Safari, un lector de pantalla real, el táctil de verdad, `file://` con
doble clic (`pruebas/comprobar-doble-clic.html`), y F0.5 y F10, que necesitan
niños.

### P3 — retirada del botón «Leer en voz alta»

Pedida en firme después de probar la sexta ronda: «elimina el boton leer no
sirve para nada». Se retira de las dos barras que lo llevaban (calibración y
partida).

Lo que **no** se retira, porque nadie lo pidió y quitarlo sí tocaría la
accesibilidad de fondo:

- la consigna y el enunciado **se siguen leyendo solos** al aparecer;
- la tecla `L` (`CB.a11y.MAPA.leer`) sigue llamando a `CB.partida.accionLeer()`,
  que por eso se conserva entera;
- el resaltado palabra a palabra sigue siendo el respaldo cuando el aparato no
  tiene voz en español.

Queda una hipótesis sin comprobar que conviene anotar por si vuelve el tema: si
al pulsarlo no sonaba nada, la causa más probable no era el diseño sino la falta
de una voz española instalada en el equipo, en cuyo caso el botón caía al
resaltado silencioso y parecía muerto. No se investigó porque la petición fue
retirarlo, no arreglarlo; si algún día se echa en falta, ahí está el primer
sitio donde mirar.

El guardián E14 de `casos-regresiones.js` se conserva y cambia de significado:
ya no protege un botón, protege que la lectura funcione también donde no hay
partida —la calibración—, que era el fallo real de origen.

### P4 — que se pueda ver bien con Live Server

Pedido en firme: «haz que se pueda ver perfectamente en Live Server». El
diagnóstico previo era correcto pero la conclusión no: no bastaba con decir «usa
otro servidor». Live Server recarga la pestaña entera cada vez que cambia un
fichero que vigila, y jugando eso mata la partida a media pregunta. Con la
cuenta atrás de 30 s y el aviso a los 10, una recarga a destiempo hace creer que
esas dos cosas están rotas. Reproducido a propósito: partida a 29 s con 7 gemas,
`touch` a un `.js`, y de vuelta a la pantalla de perfiles con el reloj en 30.

Se ataca por dos lados, y el segundo importa mucho más que el primero.

**1. Configuración.** `.vscode/settings.json` con `liveServer.settings.ignoreFiles`
para `docs`, `pruebas`, `audio`, `*.md`, `*.txt` y los guiones. El CSS no hace
falta ignorarlo: Live Server lo inyecta en caliente sin recargar, que es justo
lo que se quiere.

**2. Que la recarga deje de doler, venga de donde venga.** Esto es lo que vale.
`pagehide` ya guardaba la partida —también cuando la recarga la provoca otro— y
`reanudarGuardada()` ya existía, probada y enganchada al botón JUGAR. Lo único
que faltaba era la vuelta automática: se aterrizaba en la portada y había que
pulsar JUGAR, de modo que una recarga parecía un reinicio espontáneo.

Ahora, si al arrancar hay una partida guardada hace menos de un minuto, se
reanuda sola. La ventana es corta a propósito: en un minuto lo único que cabe es
una recarga. Pasado ese minuto se aterriza en la portada y JUGAR sigue
ofreciendo reanudar durante 24 h, que es la conducta de siempre; sin el límite,
un niño que abre el juego por la mañana se encontraría metido de golpe en la
expedición de ayer sin haber tocado nada.

Hizo falta un campo nuevo: `partidaEnCurso.guardadaTs`. `iniciadaTs` dice cuándo
EMPEZÓ la partida, no cuándo se guardó, y con una partida de diez minutos la
distinción es justo la que importa. La decisión vive en `CB.arranque.esRecarga()`,
extraída a función precisamente para poder probarla (E18).

Esto no es una concesión a una herramienta de desarrollo: un F5 sin querer, un
iPad reciclando la pestaña o un navegador que se cierra solo producen exactamente
lo mismo, y hasta ahora costaban la partida.

### E19 — la calibración no decía lo que era

Encontrado tirando del hilo de «hago doble clic en index.html y no funciona la
cuenta atrás ni el Hurry up». `file://` es un origen distinto de
`http://localhost`, así que allí no hay perfiles: se empieza de cero, y empezar
de cero significa CALIBRACIÓN, que no tiene reloj a propósito.

Pero el fallo real no es ese, es que la pantalla no lo explicaba. Su `<h1>` era
`solo-lectores`, o sea invisible: cuatro preguntas sueltas, sin título, sin saber
cuántas eran y sin reloj. Cualquiera deduce que la cuenta atrás está rota, y esa
es la deducción correcta a partir de lo que se ve.

Ahora la pantalla lleva título visible y una línea que dice dónde está y por qué
no hay reloj: «Pregunta N de 4 · Sin reloj y sin puntos: solo para saber por
dónde empezar». El reloj sigue sin aparecer en la calibración, y esa parte de la
decisión no cambia: ponerle cronómetro a la prueba de colocación falsearía la
medida y asustaría al niño en su primer minuto de juego.

### P5 — «poner Jugar es muy muy muy confuso»

El diagnóstico lo dio quien lo estaba usando, y es exacto: el problema no era el
flujo, era el RÓTULO. El botón decía siempre «JUGAR» y la primera vez llevaba a
cuatro preguntas de colocación sin reloj, sin luces y sin puntos. La colocación
es necesaria y no debe parecer un examen —por eso no lleva cronómetro, y esa
parte no cambia— pero anunciarla como una partida es una promesa rota. Y era la
PRIMERA impresión del juego.

`CB.arranque.rotuloJugar(perfil)` devuelve TEXTO, nunca navega:

    sin minero o sin calibrar  →  EMPEZAR
    partida a medias           →  SEGUIR JUGANDO
    resto                      →  JUGAR

Debajo, `CB.arranque.pistaJugar()` dice qué viene: «Primero, 4 preguntas para
saber por dónde empezar. Sin reloj y sin puntos.» Con eso, las tres cosas que
más confusión dieron en toda la sesión —que JUGAR no lleva a jugar, que ahí no
hay reloj y que la partida guardada existe— quedan dichas antes de pulsar, en
vez de descubrirse a base de sorpresas.

Se pintan desde `alEntrar['p-portada']`, que PINTA y no navega, como exige el
contrato que dejó E1.

Detalle que casi se cuela: la primera versión puso la pista directamente sobre
el cielo y era ilegible. El cielo es color DECORATIVO, y la regla de
`01-variables.css` dice que el texto vive solo sobre `--bg-texto-*`. Va sobre
panel crema.

### E20 — el juego no contaba la regla de las luces

La regla (Documento 5) es correcta y no se toca: una luz se apaga SOLO al fallar
el segundo intento, tras la tarjeta de reparación. Lo que fallaba es que el
juego no la contaba en ningún momento.

Al primer fallo no pasaba nada visible —no caía la gema y ya está—, así que
quien jugaba concluía, razonablemente, que el juego no se entera de los errores:
«cuando cometes un error no resta vidas». Y cuando por fin se apagaba la luz,
ocurría en el HUD, arriba del todo, mientras se miraba la tarjeta de reparación:
la luz desaparecía sin causa aparente y varias pantallas después del fallo que
la costó.

Dos frases, en los dos momentos en que importan: «Te queda otro intento» al
primer fallo, y «Se ha apagado una luz. Te quedan N» cuando se apaga. Sin
regañar y sin números negativos (§3.4).

### E22, E23, E24 — auditoría jugando la partida entera

Ronda hecha con el juego delante, recorriendo el camino real: portada → minero
nuevo → calibración → mapa → cantera → expedición completa → fin → otra
expedición → pausa. Tres hallazgos, los tres del mismo tipo: el juego hacía lo
correcto y no lo contaba.

**E22 — los mensajes se escribían en una pantalla oculta.** `CB.ui.mensaje()`
iba siempre a `#item-mensaje`, que vive dentro de la pantalla de partida.
Mientras se calibra esa pantalla está oculta, así que el «¡Muy bien!» de cada
una de las cuatro preguntas se escribía donde nadie podía verlo: cuatro
preguntas seguidas sin una sola reacción. Nodo propio `#cal-mensaje` y
`CB.ui.nodoMensaje()` eligiendo según la pantalla, el mismo patrón que ya usaba
`32-componentes.js` para `cal-respuesta` / `item-respuesta`.

**E23 — la calibración terminaba en silencio.** Contestabas la cuarta pregunta y
aparecías en el mapa. Nadie decía que aquello era la preparación ni que el juego
empieza ahora. Una prueba que no anuncia que termina no se distingue de una
partida que se ha roto — y así se describió: «empiezas con una demo y no avisa
que es una demo».

**E24 — la pausa aterrizaba en un menú de configuración.** «Pausa» llevaba a una
pantalla titulada «Ajustes», con cinco opciones y la vuelta al juego en el
último sitio de la lista. Un niño que pausa no ha venido a configurar nada. El
flag `desdePausa` ya se pasaba desde `CB.partida.pausar()` y no lo usaba nadie:
ahora el título dice «En pausa» y «◀ Seguir cavando» es el primer botón.

**Verificado y correcto** en el mismo recorrido: entrar por mapa y cantera abre
la expedición; contestar bien suma gemas; fallar dos veces lleva a la
reparación, que exige tocar los tres pasos antes de habilitar «Lo pillo»; al
confirmarla se apaga una luz de verdad y el HUD la pinta en gris; la expedición
termina en «Fin de la expedición» con gemas, bono y lo dominado; «Otra
expedición» encadena con gemas a 0 y las tres luces; la pausa para el reloj y
«Seguir cavando» lo reanuda. Cero errores de consola en todo el recorrido.

---

## Octava ronda — el cambio de stack (1.7.0)

Se pide otro stack: **HTML + SCSS con BEM + Sass + JS vanilla + Gulp 5**, con
`dist/` minificada, responsive en 480/768/1024/1200/1400, accesibilidad completa
y caché sin conexión.

Nada de eso convive con «no hay compilación», que era la premisa de la que salían
todas las decisiones anteriores. Así que el objetivo real de la migración no es
añadir Gulp: es **trasladar las invariantes existentes a la forma nueva sin
perder ni una**. `pruebas/auditar.sh` tiene que seguir siendo una puerta.

### Las cuatro decisiones de partida

| | Decisión | Por qué |
|---|---|---|
| Despliegue | **doble clic + PWA** | un Service Worker no se registra en `file://` (exige contexto seguro). `dist/index.html` se abre con doble clic igual que hoy y el SW solo actúa servido por HTTP, fallando en silencio si no |
| `dist/` en git | **sí se versiona** | quien clona o baja el ZIP de GitHub sigue jugando sin instalar node, que es el modo de uso principal declarado |
| BEM | **completo** | ~125 renombrados. Hoy hay 28 modificadores correctos y **cero** `bloque__elemento`: no hay un solo `__` en las 1 721 líneas de CSS |
| Caché | **armazón siempre, música a petición** | el armazón minificado son ~300 KB; la música 42 MB. En un aula de 25 tabletas, precachear serían ~1 GB simultáneos, y `cache.addAll()` es atómico: una pista que falle tira las nueve y, dentro de `install`, impide instalar también el armazón |

También: `1.7.0` y no `2.0.0`. La regla escrita es que el mayor sube cuando cambia
el formato del perfil guardado, y esta migración no lo toca. Es contraintuitivo
porque cambia todo lo demás, y por eso se escribe.

### El cruce de clases (fase 0)

Antes de renombrar nada hace falta el juez, porque **una clase renombrada en el
CSS y no en el JS no produce ningún error**: `CB.ui.crear('div', 'veta-icono')`
sigue creando el div, sale sin estilo, la consola queda limpia y la suite sigue
en verde. Con ~150 clases repartidas entre CSS, HTML y JS ese es el único modo de
fallo real del renombrado.

`herramientas/cruzar-clases.mjs` (Node puro, sin dependencias, bloque 8 de la
auditoría) cruza en las dos direcciones: toda clase declarada en el CSS se usa, y
toda clase que se aplica existe en el CSS.

**No vive en la suite del navegador**, y eso es un cambio respecto al plan
inicial: `pruebas/pruebas.html` monta maquetas reducidas de las 17 pantallas, no
el `index.html` real, así que contra esas maquetas media clase del juego
parecería no usarse. El cruce necesita leer los ficheros de verdad.

Dos precisiones distintas a propósito, porque las dos direcciones quieren cosas
opuestas: pasarse recogiendo literales es **seguro** en la dirección «CSS → uso»
(a lo sumo una clase muerta pasa por viva) y **peligroso** en la dirección «uso →
CSS», donde una frase en español se denunciaría como clase inexistente. Así que
la primera usa todos los literales del fichero y la segunda solo los sitios donde
una cadena *es* una clase — que son exactamente los que tocará el codemod.

Las clases que el JS construye por concatenación no llevan lista a mano: **todo
literal que termina en `-`, `--` o `__` es un prefijo** y habilita cualquier
clase que empiece por él. `js/30-ui.js` contiene `'zona-juego bioma bioma--'` y
`'cielo cielo--'`, así que los 4 biomas y los 6 cielos quedan justificados solos,
y el sistema obliga a que toda construcción futura deje un prefijo visible.

### CSS muerto retirado

El cruce encontró **15 clases declaradas que no usaba nadie**, verificadas una a
una con grep sobre `js/`, `datos/` e `index.html`. Se retiran, y no se dejan
comentadas, por la misma doctrina que `06-biomas.css` ya aplica a los tres biomas
de v2: no se guarda CSS muerto. El historial de git lo conserva entero.

- **Cinco animaciones con sus `@keyframes`**: `.estalla` (el bloque estalla al
  acertar), `.agrieta` (se agrieta al fallar), `.veta-sube`, `.brillo-cofre`,
  `.bloque-raro`. Y `.mano-cursor` con `mano-señala`. Se comprobó antes de
  borrarlas que la realimentación **sí existe** por otra vía: al acertar,
  `.destello` sobre el botón más el surtidor de partículas; al fallar, la tarjeta
  de reparación, que sustituyó al bloque agrietado cuando se fijó la regla de las
  luces.
- **`.oculto-visual`**: hacía lo mismo que `.solo-lectores`, que es la que usan
  los `<h1>`. Dos utilidades para lo mismo es una de más.
- **`.panel-bloque--oscuro` y `--aviso`**, `.fila--separada`, `.sobre-textura`,
  `.bandas-terreno`, `.rejilla-adulto`, `.enunciado .numero-dato`.
- **`.barra-carga`** no estaba muerta pero no era del juego: la única página que
  la pinta es `pruebas/pruebas.html`, para su propia barra de progreso. Se muda a
  la hoja en línea de esa página.

De 168 clases a 153.

### E25 — el ajuste de movimiento del juego apagaba menos que el del sistema

Encontrado al limpiar las listas, y es un fallo de accesibilidad en producción,
no un detalle de estilo.

Hay dos maneras de pedir menos movimiento: `prefers-reduced-motion`, del sistema
operativo, y la clase `:root.sin-movimiento`, que enciende el ajuste visible
dentro del juego. Las dos listas de selectores estaban escritas a mano, dos
veces, a cuarenta líneas de distancia, y se habían separado: la del sistema
apagaba 21 animaciones y la del juego 11. **Quien apagaba el movimiento desde los
ajustes —el único sitio donde un niño de 7 años puede hacerlo— seguía viendo
diez**: las criaturas flotando, saltando, asintiendo, girando y goteando, el
musgo creciendo y el destello del botón.

Nadie lo veía porque comparar veinte selectores a ojo no lo hace nadie. Las dos
listas son ahora idénticas (15 y 15) y el guardián las compara **leyendo el CSS
realmente cargado**, así que da igual cómo se escriban mañana: a mano, con un
mixin de Sass o con un bucle.

Dos detalles del guardián que costaron encontrarlos:

1. **Chrome no serializa `animation: none !important` tal cual.** Lo expande a
   `animation: auto ease 0s 1 normal none running none !important`, así que
   buscar `/animation: *none/` en `cssText` no casa jamás. Se pregunta por la
   propiedad (`r.style.animationName === 'none'`), que es lo semántico. Es
   también la razón de que el bloque 3 de la auditoría deba mirar el CSS
   expandido y nunca el minificado.
2. **Comparar dos listas vacías da «idénticas».** Sin una tercera afirmación de
   que la lista del sistema no es trivial, el guardián pasaría en verde sobre un
   fichero al que alguien le hubiera quitado el bloque entero. Y pasó: la primera
   versión del guardián salió en verde en dos de sus tres comprobaciones
   precisamente por eso.

### Dos cosas más que nadie comprobaba

- **`pruebas/pruebas.html` cargaba 8 hojas de estilo, no 9**: le faltaba
  `css/08-imprimir.css` desde siempre, así que `casos-marca.js` y
  `casos-contraste.js` nunca la miraron. Añadida; sus reglas van todas dentro de
  `@media print` y no cambian nada en pantalla.
- **La cabecera de `casos-regresiones.js` se había quedado en E17** aunque el
  fichero ya tenía guardianes hasta E24. Puesta al día hasta E25.

Base de la suite: **368 comprobaciones, 0 fallos**.

### El andamiaje del build (fase 1)

`package.json`, `gulpfile.js` en CommonJS, `manifiesto.json` **generado leyendo
`index.html`** (no escrito a mano) y `.gitignore` reescrito: su cabecera declaraba
por escrito que este proyecto no tenía compilación, y ya no es verdad.

**`manifiesto.json` es la fuente única del orden de carga.** Vivía en tres sitios
—`index.html`, `pruebas/pruebas.html` y contado en `auditar.sh`— y `CLAUDE.md`
tenía que pedirle al humano que los sincronizara. Eso no es un contrato, es un
fallo esperando. `index.html` gana dos marcadores (`GUIONES:INICIO/FIN` y
`ESTILOS:INICIO/FIN`) y `gulp html` sustituye cada bloque por una sola etiqueta.

#### E26 — la auditoría no se ponía roja: se colgaba

El plan preveía que `dist/` y `node_modules/` la pusieran en rojo el primer día,
por tres motivos a la vez. La realidad fue peor: `grep -r` y `find` recorriendo
415 paquetes **agotaron un tiempo de espera de cinco minutos sin llegar a
imprimir nada**. Una auditoría en rojo se investiga; una que se cuelga se
desactiva, y ahí muere la puerta de entrega.

Se poda con `-prune` y no con `-not -path`: `-not` visita igualmente cada fichero
del árbol podado. De colgarse a **0,62 s**.

Los tres motivos, por si vuelven: el grep de marca entraba en
`dist/js/cubomatica.js`, que contiene el texto de `00-nucleo.js` con su `CB.LEGAL`
y **no está en la lista de exentos, que va por nombre de fichero**; el `find` de
binarios sacaba cientos de PNG de la interfaz web de browser-sync; y el de peso
medía ~120 MB contra un tope de 900 KB.

Y saltó una cuarta, que no estaba prevista y es la más divertida: **el propio
`gulpfile.js` disparaba la lista negra**, porque el regex que le dice a terser qué
comentarios conservar nombraba la marca. La salida no fue eximir el fichero
—cada exención debilita el grep— sino quitar la palabra: el aviso de no
afiliación vive en `CB.LEGAL.AVISO`, que es una **cadena**, y terser no toca las
cadenas. Verificado: aparece una vez en el minificado, y ahora la auditoría lo
comprueba.

#### Los contadores 44/44/17/9 mueren, y lo que nace es más fuerte

Medían «se carga lo que hay que cargar, en su orden» de la única manera posible
sin build: contando etiquetas. Con un bundle, `dist/index.html` tiene **un**
`<script>` y contar deja de significar nada.

`herramientas/comprobar-dist.mjs` (Node puro, bloque 5c) los sustituye por una
cadena de cinco eslabones anclada en el manifiesto. El cuarto es el que importa:
**se reconstruye el bundle en memoria y se compara byte a byte** con el de disco.
Tres líneas, y demuestra dos cosas de una vez —que el orden es correcto y que
`dist/` está al día. Sin ella, la auditoría puede pasar en verde sobre una
entrega de hace tres días, que es el peor fallo posible porque es verde y es
falso. Comprobado que se pone roja tocando una fuente sin reconstruir.

Detalles que costaron:

- **El bundle legible no lleva sourcemap.** La línea `//# sourceMappingURL=…` son
  39 bytes que rompen la igualdad byte a byte y obligarían a normalizar antes de
  comparar. Un mapa de origen ahí tampoco aporta nada: el fichero *son* las
  fuentes pegadas. El minificado sí lo conserva.
- **`grep -c` cuenta líneas, y el HTML minificado es una línea.**
  `grep -c '<section id="p-' dist/index.html` devuelve **1**, no 17. Toda
  comprobación sobre `dist/` cuenta ocurrencias, nunca líneas. Es la misma
  familia que la expansión de `animation` de E25: el texto de un artefacto
  generado no se parece al que escribió una persona.

#### Presupuestos: de uno a tres

| presupuesto | qué mide | ahora | tope |
|---|---|---|---|
| fuentes | `css/ js/ datos/ pruebas/` + raíz | 820 KB | < 1 100 KB |
| **arranque** | `index.html` + **exactamente lo que referencia** | **309 KB** | < 400 KB |
| música | `audio/*.mp3` | 42 MB | < 60 MB |

El de arranque es el que sustituye de verdad a los 900 KB de antes, porque es lo
que querían proteger. No se pesa la carpeta `dist/` entera: dentro conviven el
bundle minificado que se sirve y el legible que solo usan la auditoría y la
suite, así que pesarla daría más del doble de lo que nadie descarga.

`dist/audio/` son **enlaces duros** a `audio/`: 42 MB que no se duplican en disco
en cada build, con caída a copia con aviso —no con error— si el sistema de
ficheros no los admite. En la fase 2, cuando `index.html` se mude a `src/`, esa
tarea desaparece y `audio/` pasa a ser `dist/audio/` con un `git mv`.

**Verificado jugando `dist/index.html`**: reanuda la expedición guardada con sus
gemas y sus tres luces, el reloj corre, las texturas se inyectan como `data:` URI,
los 12 globales están en `window`, los 92 niveles se cargan y las rutas de audio
resuelven dentro de `dist/`. Un guion, una hoja, cero errores de consola.

### El movimiento a `src/` (fase 2)

`git mv` de `index.html`, `js/`, `datos/` y `css/` a `src/`, y de `audio/` a
`dist/audio/`. Git detectó **58 renombrados**, así que `git log --follow` sigue
funcionando fichero a fichero.

Los 9 MP3 viven ahora **directamente en `dist/audio/`** y gulp no los toca nunca.
No se compilan desde nada —ya son el artefacto— y con `dist/` versionada,
tenerlos además en `audio/` duplicaría 42 MB en el árbol de trabajo de todo el
que clone. La contrapartida es que `gulp limpiar` borra rutas concretas en vez de
arrasar la carpeta, y eso hay que recordarlo al añadir salidas nuevas.

#### La suite pasa a probar lo que se entrega

`pruebas/pruebas.html` cargaba las 9 hojas y los 44 guiones a mano. Con un paso
de construcción eso deja de valer: un fallo de orden de concatenación, o un
fichero que el manifiesto olvidara, **no aparecería hasta que un niño abriera
`dist/index.html`** — que es justo el modo de fallo que introduce la migración.

Ahora hay dos páginas, las dos contra `dist/`:

- `pruebas.html` → el bundle legible. Es la de trabajar: una traza que apunta a
  `cubomatica.min.js:1:48231` es un impuesto permanente.
- `pruebas-min.html` → el minificado. Es **la** prueba que valida la
  configuración entera de terser.

Y el contador «44 scripts» de `casos-carga.js` muere aquí. Medía «están las 44
aportaciones a `CB`» contando etiquetas; con un bundle hay una. El invariante se
parte en dos, cada mitad donde puede comprobarse de verdad: la auditoría cuenta
ficheros en disco y los cruza con el manifiesto, y el navegador comprueba que el
bundle **defina** lo que tiene que definir —los 37 espacios de nombre, los 7
generadores, los 92 niveles, los 4 mundos, los 12 globales—, que siempre fue la
comprobación buena.

#### Lo que encontró la página del minificado, el primer día

Tres fallos que ninguna otra cosa podía ver. Los tres de la misma familia: **el
texto de un artefacto generado no se parece al que escribió una persona.**

**Dos guardianes de E11 leían el código fuente de una función.**
`CB.partida.pintarRespuesta.toString().indexOf('respondido = false')`. Terser
escribe `n.respondido=!1` y los dos se pusieron rojos. La regla que sale de aquí,
y que vale para todo `casos-regresiones.js`: *leer el fuente de una función solo
es válido para literales de cadena y nombres de propiedad* —que terser conserva,
porque `mangle.properties` está prohibido—, **nunca para nombres de variable,
espacios ni comillas**. Los dos pasan a comprobar conducta.

**Y uno pasaba en falso verde, que es peor.**
`pintarMundos.toString().indexOf("crear('h3'") === -1` afirmaba que las tarjetas
de mundo ya no son `h3`. Contra el minificado, terser escribe las cadenas con
comillas dobles, así que el texto buscado no aparece nunca y la afirmación pasaba
sin haber comprobado nada. **Una afirmación en negativo sobre texto generado es
un falso verde permanente.** Ahora se pinta el mapa de verdad y se mira el DOM,
que es donde vive el problema.

**Una verificación WCAG se estaba saltando en silencio.** `casos-contraste.js`
solo aceptaba hex de seis dígitos; cssnano acorta `#000000` a `#000` —CSS igual
de válido— y el par de alto contraste devolvía `null`. El modo de fallo es lo
grave: la línea 59 hace `saltar()`, no `ok(false)`. **No se ponía roja: se ponía
gris**, y el resumen seguía diciendo «TODO EN VERDE» con una obligación legal sin
verificar. Se arregla en dos sitios: `hex()` acepta las dos formas, y **se exige
que no se salte ningún par**, que es la comprobación que faltaba desde el
principio.

Base de las dos suites: **371 comprobaciones, 0 fallos, 0 saltadas**, tanto
contra el bundle legible como contra el minificado.

### CSS → SCSS sin tocar una sola clase (fase 3)

`git mv` de los nueve `.css` a parciales numerados, más `app.scss` como
único punto de entrada y `_herramientas.scss` **vacío a propósito**: los mixins
son la fase siguiente. Separar los dos pasos no es ceremonia, es lo único que
permite distinguir «Sass lo compila distinto» de «he escrito mal un mixin», que
es exactamente la duda que convierte una migración de 1 721 líneas en un acto de
fe.

Se conservan los nueve nombres numerados en vez de adoptar 7-1 porque **la
numeración *es* la cascada**, y aquí eso es carga útil: `_06-biomas.scss` dedica
seis líneas de comentario a explicar que su `position: relative` gana por venir
después de `_04-pantallas.scss`. Una estructura `components/ layout/ pages/`
esconde esa relación y la rompe la primera vez que alguien reordena un `@use`.

Dos trampas de Sass, las dos con solución de una línea y las dos escritas en el
fichero: `@use` **no es transitivo**, y los nueve necesitan `as *` porque Sass
deriva el espacio de nombres del nombre del fichero y «00-fuentes» no es un
identificador válido —empieza por dígito.

#### El criterio: comparar árboles, no texto

`herramientas/comparar-css.mjs` (postcss, de un solo uso) aplana las dos hojas a
una lista de declaraciones con su ruta de selectores y las compara. El texto
cambia por razones que no significan nada y no cambia por una que significaría
mucho: una declaración perdida en medio de un bloque.

Hubo que normalizar cuatro reserializaciones de Sass que producían 91 líneas de
ruido: comillas simples a dobles, `.08em` a `0.08em`, `[aria-disabled="true"]` a
`[aria-disabled=true]`, `rgba(0,0,0,.45)` a `rgba(0, 0, 0, 0.45)`, más el
`@charset "UTF-8"` que añade al principio. Lo que **no** se normaliza, a
propósito: mayúsculas de los hex, unidades, y el orden y la presencia de cada
declaración. Ahí es donde viviría un error de verdad.

Resultado: **1166 declaraciones antes, 1166 después**, y seis diferencias, todas
en `content:` y todas explicadas:

- dos son Sass resolviendo escapes que no eran ambiguos (`"\25C6\00A0"` → `"◆ "`,
  idéntico para el navegador);
- cuatro son la corrección de E27.

#### E27 — la leyenda del informe decía «●਍ominado»

El comparador lo encontró, y no es cosmético.

Los cuatro rótulos del semáforo del panel del adulto se escribían con la primera
letra pegada a un escape: `content: "\25CF\00A0dominado\00A0\2014\00A0"`. **Un
escape CSS consume hasta seis dígitos hexadecimales**, y la «d» de «dominado» es
un dígito hexadecimal: el navegador leía `\00A0D` —U+0A0D, un carácter
devanagari— y se comía la letra. Con «datos» era peor, porque «da» son dos
dígitos: `\00A0da` daba U+A0DA y desaparecían dos letras.

Comprobado en el navegador antes de tocar nada: los puntos de código eran
`25cf **a0d** 6f 6d 69 6e 61 64 6f`, es decir `●` + U+0A0D + «ominado». Los
cuatro rótulos llevaban así desde el principio.

No lo vio nadie por dos razones que conviene recordar: el informe del adulto se
mira poco, y **el color y el símbolo sí salían bien**. La regla del proyecto de
no fiar nunca un estado al color solo hizo que el fallo fuera invisible; el
semáforo seguía comunicando su estado por forma y por color, y solo el texto
—que es la parte que hace falta al imprimir en blanco y negro— estaba roto.

Se arregla escribiendo los caracteres tal cual, con espacios duros de verdad
(U+00A0) para conservar la intención original. El guardián lee el texto **real**
que el navegador pone en el `::before`, así que da igual cómo se escriba mañana.

#### La comprobación de «dist/ al día», para el CSS

Con el JS basta con reconstruir el bundle en memoria: es una concatenación pura.
Con el CSS ya no, porque Sass no concatena, genera. Recompilar desde la auditoría
exigiría `sass-embedded`, y la auditoría tiene que correr en un clon limpio sin
`npm install`.

Solución: `gulp build` escribe `dist/.huellas.json` con el sha1 de cada fuente de
estilo y la auditoría lo recalcula. Cero dependencias, y detecta igualmente un
`.scss` tocado sin reconstruir.

Y muere el último de los cuatro contadores: `ls css/*.css == 9`. Medía que la
cascada estuviera completa cuando la cascada **era** la lista de `<link>`. Ahora
la declara el orden de los `@use` de `app.scss`, y se verifica en dos
direcciones contra el manifiesto. Contar ficheros habría seguido pasando en verde
con un `@use` olvidado.

Base de las dos suites: **372 comprobaciones, 0 fallos, 0 saltadas**.

### Mixins y bucles (fase 4)

Lo que hace `_herramientas.scss` no es ahorrar líneas.

**Dos de las tres reglas duras del proyecto eran reglas de disciplina.** Cero
desenfoque y cero *easing* se cumplían porque quien escribía se acordaba, y la
auditoría lo comprobaba después con un grep. `bisel()` y `paso()` **no tienen
parámetro** donde meter un desenfoque ni una curva: el tercer valor de cada capa
de sombra lo pone el mixin y siempre es `0`, y el escalonado de la transición
también. A través de ellos, escribir una sombra difusa o una transición suave no
es que esté prohibido; es que no se puede.

Un grep que falla te dice que te has equivocado. Un mixin sin ese parámetro hace
que no llegues a equivocarte. La auditoría gana las dos reglas **en positivo y
sobre la fuente**: cero `transition:` fuera del mixin, cero color suelto fuera de
`_variables.scss`.

#### El criterio, otra vez: diff vacío

Se aplicó por pasos, compilando y comparando árboles después de cada uno. Los
cinco pasos dieron **diff vacío, declaración a declaración y en orden**:

| paso | qué |
|---|---|
| mapas | 39 `--deco-*` de `$materiales`, 6 `--cielo-*`, 8 `--tex-*` |
| `animar()` | 18 animaciones |
| `desactivar-movimiento()` | las dos listas de E25 pasan a ser una |
| `bisel()` / `bisel-lateral()` | 16 sombras |
| `@each` | 4 biomas (que se escribían **dos** veces), 6 cielos, 6 estados de veta; `paso()` en las 2 transiciones |

El comparador ganó su sueldo una vez: al convertir los estados de veta, saqué el
`color` del estado bloqueado fuera del bucle y lo emití al final. Semánticamente
da igual —ningún otro selector toca ese `color`— pero el diff lo marcó como
reordenamiento, y se corrigió con un `@if` dentro del bucle. Sin esa comprobación
nadie lo habría visto, y la próxima vez podría no dar igual.

#### Los 42 colores sueltos

La cabecera de `_variables.scss` lleva desde 1.0.0 declarando que allí vive
«la única fuente de verdad de medidas y colores». Había **42 literales
hexadecimales repartidos por cinco hojas**: 21 blancos, 11 negros y 10 tonos
sueltos.

Importa más de lo que parece: `:root.alto-contraste` reescribe dieciséis
variables, y un `#FFFFFF` literal dentro de un bisel no se entera de nada. Con
nombre, el modo de alto contraste puede alcanzarlo el día que haga falta.

Aquí el diff **no** es vacío por definición, así que se verificó de otra manera:
un comprobador que exige que **toda** diferencia sea exactamente la sustitución
prevista. Resultado: cero declaraciones sin explicar, y exactamente 11
declaraciones nuevas, que son las 11 variables.

#### Consecuencia: el cruce de clases cambia de sujeto

Con `@each`, media docena de clases **no existen literalmente en ningún `.scss`**:
`.bioma--pradera`, `.cielo--0`…`--5` y los seis `.veta[data-estado]` los genera
Sass por interpolación. `herramientas/cruzar-clases.mjs` leía las fuentes y las
denunciaba a todas como inexistentes.

Pasa a leer `dist/css/cubomatica.css`, que además es lo correcto: lo que hay que
cruzar es lo que se **sirve**. Y si el compilado no está, se salta con aviso en
vez de producir una lista larguísima de falsos positivos — que es exactamente lo
que hace que alguien acabe desactivando una auditoría.

Peso: 85 KB de SCSS generan 101 KB de CSS expandido y 37 KB minificado.
Las dos suites siguen en **372 comprobaciones, 0 fallos, 0 saltadas**.

### El renombrado a BEM (fase 5)

La fase peligrosa, y lo es por su modo de fallo: **suite en verde y pantalla
rota**. `CB.ui.crear('div', 'veta-icono')` sigue creando el div si la clase ya no
existe. No lanza, no avisa, la consola queda limpia.

**43 renombrados** en 17 ficheros: SCSS, los tres HTML y ocho ficheros de JS.
`pruebas/mapa-bem.json` los declara uno a uno **con su motivo**, porque dentro de
seis meses el motivo es lo único que queda.

#### Las dos decisiones que hacen que el codemod sea seguro

**1. Sustitución en dos fases con centinelas.** Cada nombre pasa primero por un
centinela y solo al final los centinelas se convierten en su destino. Sin esto,
aplicar `{veta → veta}` y `{veta-icono → veta__icono}` en el orden equivocado
produce `.veta__icono-icono` — y, lo grave, produce **lo mismo en el CSS y en el
JS**, así que el cruce de clases lo daría por bueno. Es el único fallo que la red
de seguridad no ve, y este es su remedio.

**2. En JS no se toca texto plano.** Solo literales que están en posición de
clase: 2.º argumento de `CB.ui.crear`/`boton`, `.className`, `classList.*`,
`setAttribute('class')` y los selectores de `querySelector`/`closest`. La razón
es concreta: `valor`, `etiqueta`, `dato`, `grupo`, `ico`, `entra`, `viva` y
`gira` son palabras españolas corrientes, y el JS está lleno de cadenas que el
niño lee en pantalla. Un `sed` global reescribiría la interfaz.

Y una tercera regla del propio mapa: **cero sustituciones para una entrada es un
error**, no un aviso. Significa que el mapa está desfasado y quien lo lea mañana
creerá que ese renombrado se hizo.

#### Lo que el codemod NO puede ver, y quién lo atrapa

`js/30-ui.js` aplica las cinco animaciones de las criaturas desde un **array** y
una **tabla de consulta**: `['flota','saltito',…].forEach(c => el.classList.remove(c))`
y `{acierto:'saltito',…}[estado]`. Ahí `classList` recibe una *variable*, así que
ningún análisis de posición sirve. Hubo que tocarlas a mano.

Lo importante es quién las habría atrapado si se olvidan: la **dirección 1** del
cruce. `.criatura--flota` habría quedado en el CSS sin que nadie la nombrase, y
se habría denunciado como muerta. Las dos direcciones del cruce cubren los dos
lados del olvido, y por eso existen las dos.

#### La verificación que cierra la fase

Además del cruce a cero, se comprobó lo más fuerte posible: **aplicar el mapa al
CSS anterior tiene que dar exactamente el CSS nuevo**, declaración a declaración
y en orden. 1177 = 1177, cero diferencias. Ningún selector cambió por otro
motivo que no fuera una entrada del mapa.

#### Los 20 selectores por `#id` → 0

Estilar a través de un id ata el estilo a que ese nodo sea único y se llame así,
con una especificidad que solo se vence con otro id — de hecho había un
`#p-portada #portada-pista` con **dos**, puesto ahí para ganarle a una clase.

Los 14 de `_07-adulto.scss` colapsan a 7 con `.pantalla--documento` y `:is()`.
Los de `_04-pantallas.scss` se reparten entre `.pantalla--portada`, `--juego`,
`--reparacion`, `--fin` y `--error`. Y `#aviso-gira` y `#region-viva`, que son
nodos únicos del documento, también pasan a clase: dejarlos convertía la regla en
«casi cero», y «casi cero» no se puede auditar.

**Los ids siguen en el HTML.** Los necesitan `getElementById`,
`CB.pantallas.IDS` y los `data-ir`. Lo que se ha quitado es estilar *por* ellos.

#### El resultado

De **cero** `bloque__elemento` en 1 721 líneas a **29**. La familia del reloj, que
se escribía de dos maneras incompatibles (`.reloj-*` y la abreviatura `.ra-*`),
es una sola con nueve elementos; la colisión real —`.reloj-arena` es el objeto y
`.ra-arena` la arena de dentro, y los dos querían `__arena`— se resolvió con
`reloj__grano`.

Verificado jugando: portada, calibración con la barra de icono **y** rótulo,
mapa, cantera, expedición con el reloj de arena dibujándose, acierto con gemas, y
el panel del adulto. Las dos suites en **372 comprobaciones, 0 fallos**.

### Responsive 480 / 768 / 1024 / 1200 / 1400 (fase 6)

Hasta 1.6.0 el proyecto tenía **cero `min-width`**. Los cinco puntos de ruptura
que existían eran de **altura** —900/780/660/600/420— y estaban ahí para una sola
cosa: que la última fila del teclado 3×4 no se corte. El eje de anchura no era un
reescalado de nada: era enteramente nuevo.

#### E30 — el reparto de competencias

Añadir anchura sin pensarlo habría hecho que los dos ejes se pisaran. Un proyector
de 1400×700 recibiría «grande» por anchura y «pequeño» por altura, y ganaría el
que estuviera escrito más abajo en el fichero — que no es una decisión, es un
accidente.

> La **anchura** decide **cuántas columnas** y el ancho del contenedor.
> La **altura** decide **el lado del botón**.

Y cuando las dos tienen algo que decir sobre el mismo número, **cada una escribe
su propia variable** y el valor final es el menor de las dos:

```css
--lado-deseado: 96px;   /* lo escribe SOLO la anchura */
--lado-techo:   96px;   /* lo escribe SOLO la altura  */
--lado-respuesta: min(var(--lado-deseado), var(--lado-techo));
```

Así se **combinan** en vez de competir, y el orden dentro del fichero deja de
importar. Sin esto, cinco anchuras × cinco alturas serían veinticinco
combinaciones escritas a mano.

Verificado midiendo el valor calculado en seis viewports:

| viewport | lado | quién manda |
|---|---:|---|
| 500×723 | 72 | anchura pide 80, altura permite 72 |
| 800×812 | 80 | anchura pide 96, altura permite 80 |
| 1260×812 | 80 | anchura pide 112, altura permite 80 |
| 1460×812 | 80 | anchura pide 128, altura permite 80 |
| **1460×583** | **64** | **anchura pide 128, altura permite 64** |

La última fila es la prueba: ancho de sobra, alto escaso, y gana la restricción.

Hay **una excepción documentada**: en `max-height: 660px` la altura sí decide
columnas, y despliega el teclado de 3×4 a 6×2. Es que a esa altura el 3×4 no cabe
de ninguna manera.

#### Nada de `clamp()`, y no es capricho

Pasos discretos, todos múltiplos de `--u` = 4px: **64 / 80 / 96 / 112 / 128**.

La estética es voxel: 90 capas de sombra con desenfoque 0 sobre una retícula de
4px. Un `clamp()` fluido da 83,4px y el bisel de 4px se dibuja a 3,7 con
antialias — exactamente lo que 1 721 líneas llevan evitando. `min()` sí, porque
elige entre dos valores ya discretos; no interpola.

También hay una regla de emisión obligatoria: los `@media (min-width)` que tocan
variables de `:root` van **antes** de los tres bloques `:root.<clase>`. Tienen la
misma especificidad, así que gana el orden, y la intención es que la clase gane al
punto de ruptura —`modo-proyeccion` sube el lado a 150px para una pizarra.

#### El suelo de 64 px se comprueba, no se confía

WCAG 2.5.8 pide 24×24. Aquí son 96 por diseño, porque el usuario tiene 7 años, y
el suelo declarado es 64. **El riesgo no es incumplirlo hoy: es que un punto de
ruptura futuro baje de 64 sin que nadie lo note**, porque nadie redimensiona el
navegador a diez tamaños antes de entregar.

La auditoría lee todas las asignaciones a `--lado-deseado` y `--lado-techo` del
CSS compilado, estén dentro de una media query o fuera, y toma la menor.

#### E31 — un píxel de margen contra el reflow

`@media (max-width: 319px)` disparaba «Gira el dispositivo». A **zoom 400 % sobre
1280px el viewport CSS es exactamente 320px**, que es el criterio de conformidad
WCAG 1.4.10. Un píxel de margen: cualquier redondeo del navegador lo mostraba en
un escritorio con la letra grande — es decir, justo al usuario que más necesita
que no salga. Baja a 299, y la auditoría lo vigila.

#### El efecto colateral previsto

`casos-contraste.js` leía `--lado-respuesta` con `parseInt(getPropertyValue(…))`.
Ahora es un `min()`, y `getPropertyValue` devuelve el **texto sin resolver**:
`parseInt` da `NaN` y `NaN >= 64` es `false`. Se habría puesto roja el día del
responsive por una razón que no tiene nada que ver con el tamaño del botón.

Estaba previsto, y la solución ya estaba escrita en el mismo fichero unas líneas
más abajo: la sonda de render que usaba para `--e3`, que también es un `calc()`.
Va en el mismo commit, no después.

Las dos suites siguen en **372 comprobaciones, 0 fallos**, y a 520px de viewport
no hay desbordamiento horizontal (`scrollWidth === clientWidth`).

### Accesibilidad (fase 7)

Lo que ya se verificaba: contraste par a par, glifos medidos con `measureText`,
límite de tiempo desactivable, foco de dos tonos, un `<h1>` por pantalla, palabra
visible en todo botón de barra. Lo que **no miraba nadie** era la navegación.

#### E32 — las diecisiete secciones no eran regiones

Una `<section>` sin nombre accesible **no cuenta como landmark**: no aparece en
la lista de regiones del lector de pantalla. Eran diecisiete secciones que, para
quien navega por regiones, no existían como tales.

Se arregla sin añadir una sola palabra de texto que traducir o mantener:
`CB.pantallas.ir()` apunta el `aria-labelledby` de la sección a su propio `<h1>`,
que ya existe y que `casos-carga.js` ya garantiza que es exactamente uno.

Y `role="main"` va **solo en la visible**. Diecisiete «main» simultáneos no es
que sean incorrectos: es que dejan de significar nada, que es peor.

#### E33 — lo urgente iba detrás de la cola

Había una sola región viva, `polite`, y por ella pasaba todo: «¡Muy bien!», «has
ganado 3 gemas», «se ha apagado una luz» y «quedan diez segundos». Una región
`polite` se anuncia cuando el lector termina y **respetando el orden de
llegada**, así que el aviso urgente se leía después del festivo — con la pregunta
ya cerrada.

Nace `#region-urgente` con `role="alert"` y `CB.a11y.urgente()`. Va **solo** para
lo que caduca: los diez segundos y la luz que se apaga, cuyo mensaje visible dura
2,2 s antes de que la pantalla pase sola. Todo lo demás sigue en la educada,
porque un lector que interrumpe cada tres segundos es inutilizable.

Y el test exige que la región **la use alguien**: una región viva que existe y
nadie escribe es una comprobación que no comprueba nada.

#### El enlace de salto que se puso y se quitó

Se añadió un «Ir a la respuesta» dando por supuesto que en la pantalla de partida
había que tabular por la barra de herramientas —Pista, Pausa, Sonido, Salir—
antes de llegar a los números: cuatro tabulaciones por pregunta, treinta veces
por expedición.

**Se comprobó el DOM y es al revés.** El orden es `<h1>` → HUD (nada enfocable) →
respuestas → barra. La barra va la última.

Así que el enlace se retira. Resolvía un problema inexistente, y su comentario
habría mentido en el código durante años. **Un mecanismo de accesibilidad cuyo
motivo declarado es falso es peor que no tenerlo: parece trabajo hecho y no lo
es.** WCAG 2.4.1 se cumple igualmente, por dos vías que ya existían y que ahora
sí se comprueban —el foco viaja al `<h1>` en cada navegación (técnica G1) y las
secciones son regiones con nombre (ARIA11)— más una comprobación nueva de que la
barra es lo último del orden de tabulación.

#### `prefers-contrast` y `forced-colors`

El ajuste de alto contraste solo existía **dentro** del juego: quien lo pide en
el sistema tenía además que encontrarlo en los ajustes. Los dieciséis overrides
pasan a un `@mixin alto-contraste` usado en los dos contextos —una lista, dos
sitios, exactamente el remedio de E25.

`_09-forzado.scss` es nuevo, y este proyecto es **especialmente vulnerable**:
todo su relieve son 55 `box-shadow` inset con 90 capas, y `forced-colors: active`
sustituye `background` y `color` pero **no toca `box-shadow`**. Sin el fichero, el
resultado sería lo peor de los dos mundos: fondos del sistema con biseles de la
paleta del juego encima. Se cambian por `border` real, que sí se traduce, y la
luz apagada se distingue por trazo discontinuo — porque en `forced-colors` el
color lo elige el sistema y la forma es lo único que queda.

**Honestidad: `forced-colors` no se puede probar automáticamente.** Chrome lo
emula en las herramientas de desarrollo, y ahí queda, en la lista manual. Decirlo
es mejor que fingir lo contrario.

#### Un falso positivo que conviene recordar

La primera versión del test de tabulación miraba el documento entero y cazaba los
botones de la **propia página de pruebas** — «Suite rápida», el enlace a
`pruebas.html` del texto de la página del minificado. Herramienta, no producto.
Se acotó a las diecisiete secciones del juego. Un falso positivo en una
comprobación de accesibilidad acaba igual que cualquier otro: en que alguien la
desactiva.

Las dos suites: **388 comprobaciones, 0 fallos**.

### Service worker y caché sin conexión (fase 8)

Lo primero, porque es lo que más se malentiende: **el juego ya funcionaba sin
internet**. Cero `fetch`, cero CDN, cero fuentes remotas. Abrir `dist/index.html`
con doble clic y jugar una expedición entera no toca la red ni una vez.

Entonces, ¿para qué un service worker? Para tres cosas, y ninguna es «que
funcione sin conexión»:

1. Que siga funcionando **cuando el servidor se apaga** — el caso real es un
   colegio que sirve el juego desde un portátil que se apaga a las 14:00.
2. Arrancar sin idas y venidas de revalidación.
3. La música sin conexión, bajo control explícito de un adulto.

#### E34 — que no estorbe donde no puede vivir

Un service worker **no se registra en `file://`**: exige contexto seguro. Y el
modo de uso principal de este proyecto es el doble clic. Así que lo importante no
es registrarlo, es que **no haga ruido cuando no puede**.

Puede fallar de **dos maneras según el motor**: unos lanzan un `SecurityError`
síncrono y otros devuelven una promesa rechazada. Hacen falta las dos
protecciones — el `try/catch` y el segundo callback del `.then()`. Sin el
segundo, la consola imprime «Uncaught (in promise)»: no rompe nada, pero ensucia
una consola que está limpia, y **una consola sucia es lo primero que un maestro
lee como «está roto»**.

Con `CB.offline.DISPONIBLE === false` no cambia nada visible. Ningún cartel de
«modo sin conexión no disponible»: un aviso sobre algo que nadie ha pedido es
ruido.

#### E35 — la suite no puede cachearse a sí misma

Si `pruebas.html` registrara un worker, cachearía la propia suite: el siguiente
cambio de código se serviría desde la caché y el síntoma sería «las pruebas no
son deterministas», que `ejecutor.js` ya identifica como la conclusión más cara
posible, porque lleva a desconfiar de todo lo demás.

La protección ya existía: el registro va detrás del
`if (!document.getElementById('btn-jugar')) return;` del único
`DOMContentLoaded`, que es la misma guarda que impide que la suite arranque una
partida. Lo que se ha añadido es comprobarlo.

#### Los 42 MB, y por qué no van en el precache

| caché | contenido | política |
|---|---|---|
| `cubomatica-armazon-<VER>-<HUELLA>` | HTML + CSS min + JS min + manifest, ~300 KB | precache en `install` |
| `cubomatica-musica-<MAYOR>` | los 9 MP3, 42 MB | **vacía**; solo la llena el botón del adulto |

`cache.addAll()` es **atómico**: una sola pista que falle tira las nueve. Y como
el precache va dentro de `waitUntil`, ese fallo impediría instalar **también** el
armazón de 300 KB. Se perdería todo por querer ganar de más. Aritmética de aula,
además: 42 MB × 25 tabletas ≈ 1 GB simultáneos.

La descarga va **de una en una**, con progreso y cancelación, y una pista que
falle no tira las otras ocho. Y va en el panel del adulto, detrás de la puerta
parental, porque descargar 42 MB en el disco de un aparato escolar es una
decisión informada de una persona adulta, no un efecto colateral de darle a
jugar.

#### Contra el peor fallo posible

El peor fallo de un service worker no es que no cachee: es que **sirva una
versión vieja para siempre**. En un aula, veinticinco aparatos con el juego de la
semana pasada y nadie sabiendo por qué. Cuatro medidas, ninguna sobra:

- el nombre de la caché lleva la **versión** y además una **huella sha1 del
  contenido**, para el caso «se corrige un fallo sin subir de versión»;
- `activate` borra toda caché de armazón que no sea la actual;
- **sin `skipWaiting()` ni `clients.claim()`**: la versión nueva entra en el
  siguiente arranque, porque cambiar el JS bajo los pies de una partida en curso
  es peor que esperar y este juego se abre veinticinco veces al día;
- y un botón **«Borrar lo guardado y recargar»** en el panel del adulto, que es
  lo que un maestro puede pulsar sin saber qué es un service worker.

La caché de música se indexa por versión **mayor**, no completa: los nueve MP3
son una lista cerrada que no cambia, y volver a bajar 42 MB porque se ha tocado
el CSS es inaceptable en la conexión de un colegio.

#### El icono, sin un solo binario

El bloque 4 de la auditoría prohíbe cualquier fichero de imagen, y sin `icons` el
navegador no ofrece instalar. Se resuelve con un **SVG en `data:` URI dentro del
propio `.webmanifest`**, generado por gulp: no es un fichero, no dispara el
`find` de binarios, y es texto. `"orientation": "any"`, no `"landscape"`: el
juego funciona en las dos y avisa por **tamaño**, no por orientación — forzarla
se lo quitaría a quien tiene la tableta fijada en vertical por su propia
configuración de accesibilidad.

#### Verificado apagando el servidor

Registrado el worker en `localhost`, **se mató el proceso del servidor** y se
recargó: el juego arranca, los 92 niveles cargan y las 17 pantallas responden.
Y se distinguió de una caché de navegador: lo que no está en el armazón devuelve
`504 sin conexión` —respuesta que fabrica el propio worker cuando la red falla— y
lo que sí está devuelve `200` con sus 38 982 bytes.

Los contadores contratados pasan de **44 a 45** guiones, a propósito y con la
auditoría cambiada en el mismo commit.

Las dos suites: **394 comprobaciones, 0 fallos**.

### La auditoría se reescribe en Node (fase 9)

Cuatro razones, y la primera es la que decide:

1. **Había dos implementaciones y ya habían divergido.** `auditar.bat` cubría
   **cinco de los ocho bloques**: le faltaban la versión, la documentación y el
   peso. Mantener dos veces la misma lógica es exactamente el fallo que esta
   auditoría persigue en el resto del proyecto —«un número repetido a mano en
   tres sitios está mal en dos en cuanto alguien se despista una vez»— aplicado a
   sí misma.
2. **Dependía de `python3` y de `perl`.** En Windows no hay ninguno de los dos
   por defecto, y por eso el `.bat` estaba capado. Node ya es obligatorio desde
   que hay compilación, así que el problema desaparece en vez de repartirse.
3. Los bloques nuevos no son trabajo de `grep`: el 3 lee **un** fichero compilado
   en vez de nueve fuentes, y el 5 cruza tres estructuras contra un manifiesto.
4. `node --check` y la extracción de los doce globales necesitan Node igual.

400 líneas de shell pasan a **24**; `auditar.bat`, a 20. Windows recupera los
tres bloques que le faltaban y desaparece la posibilidad de que vuelvan a
separarse.

#### Se validó contra sí misma antes de sustituir nada

Las dos corrieron en paralelo y se compararon sus salidas ordenadas: **55
comprobaciones el `.sh`, 56 el `.mjs`**, y cada línea que solo aparecía en una
tenía su equivalente en la otra con distinta redacción. La de más es la quinta
réplica de la versión, en `dist/sw.js`, que el shell no comprobaba.

#### E36 — la lista negra nunca escaneó los `.mjs`

Lo encontró el port, el primer día: la nueva implementación se puso roja contra
`herramientas/comprobar-dist.mjs`, que nombraba la marca para contar sus
apariciones en el bundle.

El motivo de que el shell no lo viera es de una línea: su lista de extensiones
era `--include='*.js'`, y **`*.js` no casa con `.mjs`**. Las tres herramientas
nuevas —unas mil líneas— nunca se escanearon.

La salida no fue eximir el fichero. Se cambió la comprobación para que busque la
**frase** del aviso («No está afiliada») en vez de la marca: no dispara la lista
negra, no hace falta una exención nueva que la debilite, y además es mejor
comprobación —lo que importa es que sobreviva la declaración de no afiliación, no
que aparezca un nombre.

#### La autoprueba

Una auditoría que no se prueba a sí misma puede llevar meses en verde por estar
rota, y nadie se entera porque el verde es justo lo que se espera.
`npm run autoprueba` introduce violaciones reales en un fichero temporal
—`Math.random` en un fichero puro, una clave de almacenamiento fuera de
`01-almacen`, un `toISOString`— y comprueba que las ve.

Y comprueba el caso inverso, que es el que de verdad falla: la **misma violación
escrita dentro de un comentario NO debe contar**. Sin el despiece de comentarios,
la auditoría se pone roja contra código correcto, que es el fallo E5 y la razón
de que exista `sin-comentarios.py`.

#### Verificado como clon limpio

- **Cero dependencias**: los tres ficheros solo importan de `node:`. Se movió
  `node_modules/` fuera y la auditoría siguió en verde.
- **Sin `dist/`**: se salta con aviso lo que necesita construir, en vez de
  fallar. Un rojo falso acaba siempre igual, en que alguien desactiva la
  auditoría.
- Y un diagnóstico que costó un intento: al borrar `dist/` entera salían tres
  rojos crípticos sobre pistas y créditos. **`dist/audio/` no es una carpeta
  generada** —los nueve MP3 están versionados— así que ahora dice exactamente
  eso, con el `git checkout` que lo arregla.

### Entrega 1.7.0 (fase 10)

**1.7.0, no 2.0.0.** La regla escrita del proyecto es que el número mayor sube
cuando cambia el formato del perfil guardado, porque eso obliga a migrar
`01-almacen.js` y es lo único que puede romperle el progreso a un niño. Esta
migración cambia el stack entero y **no toca el formato del perfil**. Es
contraintuitivo, y por eso se escribe: alguien pondría 2.0.0 «porque es grande».

La versión pasa a tener **cinco réplicas**: las cuatro que escribe una persona
—README, CHANGELOG, LEEME, `package.json`— más `dist/sw.js`, que la inyecta gulp
leyendo `CB.VERSION` y por tanto no puede desviarse. La auditoría comprueba las
cinco.

#### Sin tarea de empaquetado, y por qué

El plan preveía un `gulp empaquetar` que generase un ZIP. Se descarta: con
`dist/` versionada, el botón «Download ZIP» de GitHub ya trae todo, y un ZIP
propio ahorraría **1,4 MB de 43** —un 3 %—. No compensa mantener un camino de
código que depende del `zip` del sistema (que en Windows no existe) y que se
pudre sin que nadie lo note, porque nadie lo ejecuta hasta el día que hace falta.

Para repartir el juego basta con copiar `dist/`, que es autosuficiente. Está
dicho en el README.

#### Lo que sigue fuera de alcance, sin cambios

- **`file://` por doble clic**: la herramienta de navegador rechaza esas URL.
  `pruebas/comprobar-doble-clic.html` existe para eso y ahora comprueba también
  que el modo sin conexión no se queje donde no puede funcionar.
- Firefox y Safari: solo se ha conducido Chrome.
- Un lector de pantalla real (VoiceOver, NVDA) y el táctil en una tableta.
- `forced-colors`, que se emula en las herramientas de desarrollo.
- **F0.5** (pilotaje en papel con 3 niños) y **F10** (calibración de β con 10-15
  niños). Siguen necesitando niños de verdad, no código.

#### Estado final

| | 1.6.0 | 1.7.0 |
|---|---|---|
| Comprobaciones | 365 | **394** en dos suites |
| Fallos registrados | E1–E24 | **E1–E36** |
| Guiones | 44 | 45 |
| `bloque__elemento` | 0 | **29** |
| Selectores por `#id` | 20 | **0** |
| `min-width` | 0 | **5** |
| Descarga de arranque | ~800 KB | **319 KB** |
| Auditoría | 400 líneas de shell + un espejo capado | 24 líneas + `.mjs` sin dependencias |

---

## Novena ronda — limpieza y auditoría severa (26 de julio de 2026)

Encargo de dos partes: **quitar lo que sobra** y **buscar fallos en serio**. Es
la primera ronda que se hace *después* de una entrega en verde, y eso condiciona
todo lo que sigue: no había ningún síntoma que perseguir. Nueve hallazgos, y lo
que los une es que **casi todos estaban en verde**.

### El método que los encontró

Ninguno salió de leer código buscando errores. Salieron de dos gestos repetidos:

1. **Probar el detector contra la violación**, no el código contra el detector.
   A cada comprobación que dice «cero X» se le dio una X inventada a ver si la
   veía. Ahí aparecieron los cuatro huecos del bloque 3.
2. **Volver a meter el fallo ya corregido** y comprobar que el guardián nuevo se
   pone rojo. Ahí aparecieron los dos verdes falsos de la propia prueba, que sin
   este paso se habrían quedado dentro para siempre — verdes, y sin medir nada.

### Los tres fallos de comportamiento

**E37 · «Listo: las 9 pistas están guardadas» sin haber guardado ninguna.**
`descargarMusica()` avanzaba el contador igual al acertar y al fallar, y luego
informaba `ok: true` mirando solo si había terminado. Con las nueve pistas
caídas, el panel del adulto daba por buena una descarga vacía.

Lo grave no es el `if`: es **a quién se lo dice**. Quien lee ese mensaje es un
adulto decidiendo si puede llevarse la tableta a un aula sin wifi. Y el juego no
se rompía por ello, así que no había ningún camino por el que esto se descubriera
antes del aula.

**E38 · una cuarta copia de la lista de música.** Los nombres de los nueve mp3
estaban escritos a mano en `45-offline.js`. Las otras tres copias —`dist/audio/`,
la tabla de `07-musica.js`, `CREDITOS.txt`— sí las cruzaba la auditoría entre sí;
la cuarta no la miraba nadie, y era la única sin dueño declarado.

Su modo de fallo estaba tapado **por partida doble**: renombrar un fichero
dejaba la música sonando con normalidad —`07-musica.js` sí tenía la ruta buena— y
solo rompía la descarga sin conexión, que a su vez informaba de éxito por culpa
de E37. Dos defectos independientes que se ocultaban el uno al otro. Ahora las
rutas se derivan de `CB.musica`, su dueño único.

**`gulp dev` vigilaba 10 de los 12 `.scss`.** El manifiesto declara los diez
parciales —lo que se compila y en qué orden— y el vigilante usaba esa lista tal
cual. Fuera quedaban el punto de entrada y `_herramientas.scss`, es decir **el
fichero donde viven todos los mixins**: el sitio que más se toca al ajustar el
diseño era el único que no reconstruía al guardar. El síntoma no es un error, es
que la pantalla no cambia — que se lee como «el mixin no funciona».

### E39 · Las tres reglas duras no protegían lo que decían

Cuatro huecos, todos por la misma causa: **cero se escribe de muchas maneras y el
regex solo conocía una**.

| se colaba | por qué |
|---|---|
| `border-radius: 0.5rem` | el filtro que perdona el cero casaba con el **cero inicial** de «0.5rem» |
| `box-shadow: 0 0 4px` | exigía `px` en los desplazamientos, y en CSS el cero no lleva unidad |
| `box-shadow: inset 0 0 8px` | lo mismo, y todo el relieve del juego es inset |
| `transition: opacity 90ms` | no nombra ninguna función — y la **función por defecto en CSS es `ease`** |

**Ninguno escondía una violación real**: se comprobó con detectores correctos y
el CSS estaba limpio. Lo que fallaba era la garantía, no el resultado — pero una
garantía que no garantiza es peor que no tenerla, porque ocupa su sitio.

Los tres detectores se reescribieron leyendo declaración a declaración y capa a
capa, y en positivo donde se puede: en vez de enumerar las maneras de ser suave
—que incluyen no decir nada—, exigir la única admitida de ser escalonado
(`steps(`).

Y la **autoprueba pasó de 4 casos a 16**. Antes cubría tres greps del bloque 2 y
**ninguno** del bloque 3, que es donde estaban los cuatro agujeros: la autoprueba
no llegaba hasta la comprobación rota, así que daba la misma tranquilidad que no
tenerla y además la firmaba.

Dos más de la misma familia, encontradas de paso:

- El grep de colores excluía `_herramientas.scss` **por accidente**: heredaba la
  exclusión puesta para que el mixin `paso()` pudiera escribir `transition:`. Los
  39 hex del mapa de materiales llevaban meses sin mirarse mientras el verde
  afirmaba «todos con nombre en `_variables.scss`». Ahora cada exclusión se
  nombra por su motivo y no se hereda.
- La comprobación del aviso de girar exigía que **ningún** `max-width` del
  proyecto pasara de 300px. Pasaba solo porque hoy hay uno. El primer
  `@media (max-width: 767px)` legítimo —lo más normal en una hoja responsiva—
  habría tumbado la construcción con un mensaje sobre el aviso de girar. Un rojo
  que miente sobre su causa acaba desactivado, y se lleva por delante la
  comprobación que sí valía.

### Los dos verdes falsos de la prueba nueva

Aparecieron al sembrar el fallo E37 a propósito. Se dejan escritos porque los dos
son trampas de plataforma, no descuidos:

**1. El ejecutor no esperaba.** Llamaba a `s.fn()` y pasaba a la siguiente suite
en el mismo turno. Cualquier comprobación sobre algo asíncrono acababa escrita
como «si todavía no ha llegado, pasa» — o sea, **pasaba siempre**. Ahora una
suite puede devolver una promesa y la cadena la espera; el rechazo cuenta como
fallo en vez de imprimir «Uncaught (in promise)» y dejar la cadena colgada.

**2. `window.caches = doble` no hace nada.** Es una propiedad definida **solo con
getter**: sin setter, en modo no estricto la asignación se pierde en silencio. La
prueba medía la CacheStorage real, donde las nueve pistas fallan igualmente
porque `audio/x.mp3` resuelto desde `/pruebas/` da 404. **Salía verde midiendo
otra cosa.**

Lo destapó su complementaria: la comprobación del camino bueno —«cuando las nueve
entran de verdad, sí informa `ok:true`»— es imposible de satisfacer con la caché
real. Sin esa segunda mitad, la primera habría seguido verde y falsa
indefinidamente. **Una aserción negativa necesita casi siempre su positiva al
lado**; sola, no distingue «funciona» de «no se ha ejercitado».

La solución: `Object.defineProperty` (la propiedad **sí** es configurable),
restaurando el **descriptor** original y no el valor, más un centinela que
comprueba que el doble se ha instalado de verdad.

### Referencias que apuntaban a nada

- **Los mapas de origen.** `dist/js/cubomatica.min.js` y `.min.css` terminaban
  con un `sourceMappingURL` hacia dos ficheros que `.gitignore` excluía. Con
  `dist/` versionada, eso está roto en **todos** los clones menos en el que acaba
  de construir. Las dos salidas eran malas —publicar 977 KB generados en cada
  construcción, o dejar la referencia colgando—, así que se dejan de emitir: la
  depuración ya la cubre mejor `dist/js/cubomatica.js`, que no es una
  reconstrucción aproximada sino las fuentes pegadas byte a byte.
- **`LICENCIAS-TERCEROS.md`, que sí se distribuye**, apuntaba a
  `css/00-fuentes.css`, desaparecido en la migración. Igual en los tres ficheros
  de `docs/licencias/` y en `CLAUDE.md`.
- **`CLAUDE.md` afirmaba que la auditoría despieza comentarios con
  `sin-comentarios.py` y un `perl` en línea.** Las dos cosas se fueron con la
  auditoría de shell en 1.7.0.
- **`pruebas/mapa-bem.json` decía que «lo verifica el bloque 8 de la auditoría».**
  No lo hace ni lo ha hecho nunca. **No se ha arreglado haciendo que lo lea**: un
  guardián que comprobara que los nombres viejos ya no aparecen sería un
  generador de falsos rojos, porque `valor`, `dato`, `grupo`, `etiqueta` y
  `entra` son palabras españolas corrientes y propiedades de objeto que salen por
  todo el código sin ser clases — exactamente la razón por la que el codemod
  trabajaba sobre el AST y no con `sed`. Quien cubre ese fallo por la vía buena
  es `cruzar-clases.mjs`. Se corrigió el texto y se explicó por qué no se
  «arregla».
- **`.gitignore` reservaba `pruebas/vendor/` para axe-core, que nunca se añadió.**
  La fase 7 se entregó sin él; la accesibilidad se comprueba con `casos-a11y.js`
  escrito a mano. Una regla que aparta un fichero inexistente sugiere que existe.
- **`.gitignore` apartaba `.vscode/`.** Daba igual hasta 1.7.0, cuando
  `index.html` estaba en la raíz y Live Server acertaba solo. Ahora `src/` no es
  servible, y la corrección que apunta Live Server a `dist/` vivía en un solo
  ordenador mientras todo el que clonara caía en la trampa que creó la migración.
  Pasa a versionarse.

### Lo borrado, con la prueba de que nadie lo usaba

| fichero | por qué |
|---|---|
| `herramientas/comparar-css.mjs` | de un solo uso: probó la fidelidad CSS→SCSS de las fases 3 y 4, y ya no existe CSS de 1.6.0 contra el que comparar |
| `herramientas/renombrar-bem.mjs` | codemod aplicado e irreversible; volver a pasarlo sobre un árbol ya renombrado solo puede hacer daño |
| `pruebas/sin-comentarios.py` | la auditoría en Node lleva su propio despiece desde 1.7.0 |
| `pruebas/fixtures/perfilV1.json` | ningún código lo lee, y ninguno **puede**: sin `fetch` en `file://`. La prueba de migración usa un objeto en línea que cubre las mismas afirmaciones |

`pruebas/mapa-bem.json` **se conserva**: es el acta de 43 renombrados
irreversibles con su motivo, y dentro de seis meses el motivo es lo único que
queda.

### Lo que se deja anotado sin tocar

El service worker responde a una petición con rango (`Range`) devolviendo la
respuesta completa de 200 que hay en caché. Es el patrón habitual al cachear
medios y **Chrome lo tolera**; donde suele romper la reproducción es en
**Safari**, que sigue sin probarse. No se toca porque arreglarlo a ciegas, sin
poder comprobarlo en el motor donde falla, es cambiar código que hoy funciona por
código que nadie ha visto funcionar.

#### Estado final

| | tras la 8.ª ronda | tras la 9.ª |
|---|---|---|
| Comprobaciones de la suite | 394 | **405** en dos suites |
| Comprobaciones de la auditoría | 56 | 56 — las mismas, pero tres ya no mienten |
| Casos de la autoprueba | 4 | **16** |
| Fallos registrados | E1–E36 | **E1–E39** |
| Ficheros de herramientas | 4 | **2** |
| Referencias colgando en `dist/` | 2 | **0** |

---

## Ronda 10 · Segunda auditoría severa — versión 1.7.1 (26-27 de julio de 2026)

**Por qué 1.7.1 y no 1.8.0 ni 2.0.0.** La tercera cifra: no entra ninguna
capacidad nueva, solo se corrige lo que ya decía que hacía. La primera queda
donde está porque **el formato del perfil guardado no cambia**: E45 añade
`rachaD` y `fallosD` a `perfil.niveles[*]`, y un perfil que no los traiga vale 0
—que es exactamente con lo que empezaban—, así que no hay migración que escribir
en `01-almacen.js`. Añadir campos con valor por defecto nunca la exige; lo que la
exigiría es cambiarles el significado a los que ya existen.

Segunda pasada del mismo encargo, leyendo esta vez el **motor y el bucle de
juego** en lugar de las herramientas. Siete fallos, y ninguno de ellos era un
descuido de escritura: los siete estaban en verde bajo 56 comprobaciones de
auditoría, 405 de suite y un cruce de clases limpio.

### Los tres sitios donde estaban, que es lo aprovechable

**1. Una función que no llama nadie.** `CB.partida.marcarLectura()` llevaba desde
1.0.0 escrita, comentada y correcta, y su único invocador era `responder()` — el
instante exacto de contestar. Todos los problemas de enunciado registraban rt = 0
(medido: 3.743 ms reales → 0 ms). Consecuencias en tres sistemas a la vez:
multiplicador de tiempo al tope y 3 gemas de bono en cada problema; 0 ms en los
20 subtipos del informe del adulto; y, en el antiazar, S1 disparada siempre, de
modo que al tercer problema fallado seguido entraba también S3 y **el niño que
lee despacio quedaba marcado como que responde al azar**.

*Por qué no se veía*: en un proyecto sin módulos, una función que no se llama no
produce error, ni aviso, ni cobertura roja. Simplemente no ocurre.

**2. Una propiedad que no existe.** `CB.musica.claveDePantalla()` leía
`CB.partida.estado.mundoId`; el estado que monta `iniciar()` guarda `mundo`, el
objeto. `mundoId` es el nombre del **parámetro** de `iniciar({mundoId:…})`.
Resultado: bosque, río y mina no sonaron jamás.

*Por qué no se veía*: leer una propiedad mal escrita en JavaScript devuelve
`undefined`, y aquí `undefined` caía en un respaldo razonable. **Y su prueba lo
consagraba**: `casos-musica.js` construía a mano `{mundoId: m.id}`, una forma que
`iniciar()` no emite nunca, copiada de la propia línea con el fallo. Un test
escrito mirando la implementación acaba de acuerdo con ella. La regla que queda:
*cuando existe una función que produce la entrada, no se construye a mano*.

**3. Una regla aplicada en un sitio de tres.** El cerrojo de «una respuesta por
intento» lo puso E11 en `CB.partida.responder`, con un comentario largo
explicando el peligro general. Los otros dos sitios donde se contesta se quedaron
sin él: en el jefe, cinco toques = cinco bloques (ocho lo derriban antes del
segundo turno); en la calibración, cinco toques = cinco aciertos sobre cuatro
ítems, y esos cuatro aciertos son lo **único** que fija `trimestreDeducido`, es
decir el techo de números de todo el juego a partir de ese momento. La regla que
queda: *cuando el comentario de un arreglo explica un peligro general, hay que
buscar los demás sitios que lo comparten*.

Lo mismo, en pequeño, con E46: la confirmación doble del antiazar se aplicaba al
toque y no a Enter.

### Dos comprobaciones mecánicas que salen de aquí

- **Todo `while` de `src/` lleva tope.** `42-jefes.js` tenía el único que no, y
  colgaba la pestaña en el 22,9 % de los combates contra Cristalina —barrido
  exhaustivo del espacio real, 1,29 % de los turnos—. Como el rng va sembrado con
  perfil + mundo + fecha, al niño al que le toca le vuelve a tocar cada intento
  de ese día.
- **Ningún campo con guion bajo puede llevar estado que deba sobrevivir a un
  guardado.** `CB.almacen.sanear()` los descarta por diseño, y así se llamaban
  los contadores que hacen SUBIR la dificultad `D` — que por tanto solo sabía
  bajar, porque bajar sí persistía en `D`.

### Y dos guardianes nuevos que nacieron en falso verde

Se rehicieron antes de darlos por buenos, y las dos causas son de las que
repiten:

- una afirmación **sobre el texto fuente** de una función (`!/mundoId/.test(…)`)
  se puso roja contra código correcto en cuanto el comentario del propio arreglo
  explicó qué era `mundoId`. `toString()` incluye los comentarios en el bundle
  legible y no en el minificado: una afirmación negativa sobre el fuente que
  discrepa entre las dos páginas de prueba es la misma trampa de siempre.
- otro tecleaba una cifra en el turno siguiente a montar el teclado, con el
  bloqueo de construcción todavía echado: la cifra no entraba, y «con
  confirmación pendiente el primer Enter no contesta» pasaba **porque no había
  nada que contestar**.

Los siete guardianes se validaron **volviendo a meter cada fallo** en las fuentes
y comprobando que el suyo —y solo el suyo— se pone rojo. E40 se barrió aparte, en
Node y contra el bundle ya construido (7.290 turnos de la mecánica que colgaba),
porque su modo de fallo es colgarse y una suite colgada no es una suite roja.

### Nota de método: la caché del navegador

Durante esta ronda una ejecución dio «405 comprobaciones, 0 fallos» **sobre un
fichero de pruebas de hace tres cambios**: Chrome reutilizó tanto el bundle como
los `casos-*.js` a través de una recarga normal, y el número de comprobaciones no
cambió, que es justo lo que lo hace invisible. Las páginas de prueba se sirven
ahora con `Cache-Control: no-store`, y antes de fiarse de un verde se comprueba
algo del bundle recién construido en lugar de suponer que la recarga lo trajo.

#### Estado final

| | tras la 9.ª ronda | tras la 10.ª |
|---|---|---|
| Comprobaciones de la suite | 405 | **443** en dos suites |
| Comprobaciones de la auditoría | 56 | 56 |
| Casos de la autoprueba | 16 | 16 |
| Fallos registrados | E1–E39 | **E1–E46** |
| `while` sin tope en `src/` | 1 | **0** |

---

# Ronda 11 · Celebrar sin cansar — versión 1.8.0 (27 de julio de 2026)

Petición del usuario, en dos tiempos. Primero: *«genera un plan exacto y preciso para
mejorar el juego… muy educativo, pero muy divertido y fácil de jugar (que no es lo mismo
que fácil de resolver). Me gusta mucho el efecto visual del "Hurry up", haz lo mismo con
todos los mensajes de felicitación o de ánimo. Crea tests para controlar errores antiguos
y nuevos.»* Y después, una precisión que cambió el diseño entero: *«no tienen que tener
exactamente el mismo formato que el "Hurry up" para no hacer monótonos los mensajes, al
contrario, tienen que sorprender.»*

## Nota de método: la auditoría multiagente no se pudo hacer

Se lanzó un workflow de cinco lentes —pedagogía, diversión, facilidad, cintas y pruebas—
con crítica adversaria por lente. **Murió entero: los seis agentes fallaron por límite
semanal de uso y el diario no guardó ni un resultado parcial.** El plan de trabajo de
1.8.0, retirado en 1.23.2 por estar ya ejecutado, y lo que se implementó salieron de una
lectura directa del código; el detalle permanece en el historial de Git.

Se anota porque cambia lo que se puede afirmar: **las fases de la cinta, el escalón 4 y
las pruebas están apoyadas línea a línea**; las de diversión y fricción quedaron como
direcciones con menos evidencia y **no se han implementado**. Cuando haya cuota, esas dos
lentes merecen lanzarse antes de tocar nada más.

## D-R11-1 · El repertorio, y por qué no es un efecto repetido

La primera versión del plan proponía llevar *el mismo* efecto del «Hurry up» a las
felicitaciones. Está mal, y el usuario lo señaló antes de que se escribiera una línea: un
niño acierta entre veinte y treinta veces por sesión. Un efecto idéntico **deja de
celebrar al tercero** y pasa a ser una espera con adorno.

La regla que ordena la tabla es la contraria de la intuitiva: **el espectáculo es
inversamente proporcional a la frecuencia**. Lo que se ve veinte veces por sesión es lo
más corto (`cinta-sello`, 900 ms, un sello que se estampa sin desplazarse); lo que casi no
pasa puede pararlo todo (`cinta-bandera`, 1800 ms, cuatro veces en la vida de un perfil).

Tres capas contra la monotonía, y hacen falta las tres:

1. **Significado.** La forma dice algo verdadero. Las cuatro categorías de acierto ya
   estaban calculadas en `CB.mensajes.categoriaAcierto()` desde el primer día —superación,
   descubrimiento, esfuerzo, procedimiento— y no se veían por ningún sitio. Se les pone
   cuerpo, no se inventa señal nueva.
2. **Novedad.** El grito sale de una bolsa barajada: `CB.mensajes.sacarDeBolsa()`, el mismo
   mecanismo que ya impedía repetir mensaje. No se añadió nada; se reutilizó.
3. **Rareza.** `cinta-veta-madre` sale con el bloque raro, 1 de cada 20. Sin algo que casi
   nunca se ve no hay sorpresa: hay rotación. Y el bloque raro llevaba desde siempre dando
   un cromo **sin que se notara nada**.

## D-R11-2 · El grito va en la cinta; el procedimiento, no

Decisión que estuvo a punto de salir al revés. Los mensajes de acierto de la categoría A
son `'¡Muy bien! {proc}'`, y `{proc}` es una frase larga: «Has pedido prestada una decena y
la has deshecho bien». **Esa frase es la única parte del mensaje que enseña algo**, y no se
lee de refilón mientras cruza la pantalla en 900 ms.

Así que se parte: la cinta lleva un **grito corto de material nuevo** (24 + 12 cadenas de
≤ 16 caracteres en `CB.datos.MENSAJES.GRITOS`), y el mensaje entero se queda quieto en
`#item-mensaje` como hasta ahora. **Ninguna de las 84 + 48 plantillas se ha tocado**, y por
tanto ninguna prueba de `casos-mensajes.js` se rompió.

Se descartó la alternativa —cortar el mensaje por el primer `!`— porque la categoría B son
frases de una pieza («¡Lo has vuelto a intentar y ha salido!», 37 caracteres) y no tienen
por dónde partirse. Una heurística que funciona en una categoría de cuatro es la tercera
familia de fallo de este proyecto.

Los gritos de ánimo van **sin exclamación** y en otro registro: detrás de un fallo, un
cartel gritando se lee como burla. Y pasan por las mismas dos listas negras que los 132
mensajes (E53), porque un criterio aplicado en un sitio de dos es exactamente E44.

## D-R11-3 · Un nodo, y ningún número duplicado

`.aviso-prisa` → `.cinta--prisa`; `#aviso-prisa` → `#cinta`. **Un solo nodo por pantalla.**
No es ahorro: dos cintas superpuestas son ilegibles, y mientras hubiera un nodo por aviso,
que no coincidieran dependía de la disciplina de quien escribe. Ahora es imposible por
construcción. `CB.ui.cinta.nodoDe()` resuelve la de la pantalla visible en cada llamada, y
no la cachea: la partida y el jefe tienen la suya, y cachear la primera dejaba al jefe
escribiendo en un nodo oculto de otra pantalla.

Y muere `CB.ui.reloj.MS_CARTEL = 1900`, que valía eso «porque es exactamente lo que dura
`prisa-cruza`» —copiado a ojo, con un comentario avisando de que si divergían el cartel
desaparecía a media pantalla—. Con nueve coreografías habrían sido nueve copias.

**El reparto nuevo: el CSS es dueño de la forma, el JS es dueño del tiempo.** El mixin
`coreografia()` emite `animation-name`, `animation-timing-function: steps(n, end)` y
`animation-fill-mode`, y **no acepta duración**; la pone `CB.ui.cinta.COREOGRAFIAS`. Ningún
número vive en dos sitios, así que no hay nada que sincronizar.

El parpadeo del «Hurry up!» se movió al hijo `.cinta__texto`. Si siguiera en la cinta
habría que declarar dos animaciones en la misma propiedad, y entonces la duración que
escribe el JS afectaría también al parpadeo. En el hijo, sus 300 ms viven solo en el CSS.

## D-R11-4 · El escalón 4: cuatro versiones declarado y sin implementar

La escalera anti-frustración declara **cinco** escalones en `2A-escalera.js`. El cuarto
—«volvemos un paso atrás al prerrequisito»— no se aplicaba. `CB.grafo.prerrequisitoDominado()`
estaba escrita, probada por `casos-motor.js` y documentada *«para el escalón 4 de la
escalera»*… y **no la llamaba nadie**. El juego seguía preguntando lo que el niño no
entendía y de ahí saltaba a retirarle el concepto.

Es la primera de las tres familias que ya se cobraron siete fallos en verde en la ronda 10:
**una función que nadie llama no falla, simplemente no ocurre.**

Dos decisiones dentro de la corrección:

- **Se dice.** «Vamos a por uno más fácil de este mismo tema. Luego volvemos.» Cambiar el
  nivel en silencio hace que un niño que ve aparecer algo mucho más fácil concluya que el
  juego se ha estropeado o que le está dando lástima. Y se dice **después** de pintar,
  porque `servirItem()` empieza ocultando el mensaje: ponerlo antes era no ponerlo.
- **Degrada, no inventa.** Sin ningún prerrequisito dominado no se hace nada y el fallo
  siguiente cae en el escalón 5, como antes. Inventar un nivel no superado convertiría
  «volvemos un paso atrás» en mentira y le pondría delante algo aún más difícil.

Y se extrae `CB.partida.aplicarEscalon()`. Mientras la decisión vivía dentro del callback
de la tarjeta de reparación, **la única forma de comprobarla era leer el código**, que es
exactamente como el escalón 4 pasó cuatro versiones sin que nada se pusiera rojo.

## D-R11-5 · Lo que se descartó, y por qué

- **Ocultar los diez logros «reservados a la versión 2».** El plan lo daba por un problema
  visible —«un niño ve diez huecos inalcanzables»—. Al comprobarlo: `CB.logros.LISTA` no la
  lee ninguna pantalla, solo `24-logros.js` internamente. No hay nada que ocultar. La
  premisa era falsa y la corrección habría sido humo.
- **Las fases de diversión y fricción.** Sin la auditoría multiagente, la evidencia no da
  para tocarlas. Quedan escritas en el plan, sin implementar y dichas como tales.

## D-R11-6 · Los guardianes, y los dos que nacieron rotos

Nueve nuevos, E47-E55, y **los nueve validados sembrando el fallo** en `src/`,
reconstruyendo y comprobando que se ponía rojo el que debía. Dos no lo hicieron:

- **E51 estaba en verde con el fallo dentro.** Comprobaba las clases y el valor de
  `_salida`, y las dos cosas sobreviven a quitar la cancelación: reasignar `className`
  repone las clases igual, y `_salida` cambia igual al programar el segundo temporizador.
  El fallo real —el temporizador de la primera cinta sigue vivo y esconde la segunda a
  media animación— solo se ve **espiando `clearTimeout`**. Y el doble se afirma instalado,
  por lo que se aprendió con `window.caches`.
- **E55 se puso rojo contra código correcto**, porque copié el umbral de la escalera (4)
  en vez de preguntárselo (es 3). Ahora lo busca recorriendo `siguienteEscalon()`. Escribir
  el número dos veces es literalmente E43.

Dos comprobaciones mecánicas nuevas en `auditar.mjs`, y **la primera tapa un agujero que
abrió esta misma versión**:

- **`animation-timing-function` en forma larga.** El grep de la regla dura solo miraba
  `animation:` abreviado. El mixin `coreografia()` emite longhands, así que la regla del
  proyecto habría dejado de mirar precisamente las nueve animaciones más nuevas — **en
  verde**. Lección general: al escribir un grep de regla dura, preguntarse qué *forma* de
  la propiedad se está mirando; el punto ciego es siempre la que no se pensó.
- **`@keyframes` que no dispara nadie.** Una animación muerta no da error: no se ve. Es lo
  que les pasó a las cinco retiradas en 1.7.0, ahí versión tras versión.

Las dos, validadas sembrando la violación.

## D-R11-7 · Dos trampas de medición nuevas, las dos propias

Ninguna era del código; las dos hacían que la comprobación midiera otra cosa:

- **Filtrar `CB.pruebas.suites` con la autoejecución en marcha.** La página corre sola al
  cargar. Truncar el array a mitad de carrera deja al ejecutor sin suites, y **imprime un
  resumen verde de un subconjunto**: 248/0 en vez de 489/0, sin que nada avise. Hay que
  esperar al sufijo `· NNNN ms`.
- **Medir una animación en una pestaña de segundo plano.** Chrome la estrangula:
  `getAnimations()[0].currentTime` se queda clavado en 0 con `playState: 'running'`, y toda
  medida de opacidad o de posición sale del fotograma 0. La forma fiable es **mover la
  animación a mano** (`pause()` y asignar `currentTime`), que además es determinista. Así
  se comprobó que ninguna de las nueve coreografías llega al teclado: la más baja es
  `sube`, con el borde inferior en 522 px contra un teclado que empieza en 555.

Y una tercera, que es la de siempre: congelar la animación **no congela el temporizador de
salida**. La cinta se escondía sola entre dos llamadas y la primera captura salió sin ella.

## Estado al cerrar 1.8.0

| | 1.7.1 | 1.8.0 |
|---|---|---|
| Comprobaciones de la suite | 443 | **489** en dos suites |
| Comprobaciones de la auditoría | 56 | **58** |
| Fallos registrados | E1–E46 | **E1–E55** |
| Coreografías de la cinta | 1 | **9** |
| Efectos de sonido | 12 | 12 |
| Escalones de la escalera implementados | 4 de 5 | **5 de 5** |

---

# Ronda 12 · La variedad estaba en el sitio equivocado — versión 1.8.1 (28 de julio de 2026)

Corrección de 1.8.0, señalada por el usuario el mismo día: *«pero has hecho que los avisos
tengan el mismo formato de "Hurry up", eso no es lo que pedí»*. Tenía razón.

## D-R12-1 · Variar el recorrido no es variar la celebración

1.8.0 dio a cada momento su propia coreografía —nueve recorridos— y se dio el trabajo por
hecho. Pero las nueve eran **la misma banda**: mismo ancho, mismo sitio, misma tipografía,
mismo tamaño. Lo único que cambiaba era por dónde entraba y por dónde salía.

**La forma es lo que se reconoce; la trayectoria casi no se nota.** Un niño que acierta
veinte veces por sesión ve el mismo rectángulo veinte veces, y que unas veces suba y otras
caiga no lo convierte en veinte cosas distintas. El diagnóstico correcto es que había que
cambiar el **vehículo**, no el camino.

Ahora hay seis: insignia, criatura, cinta, cartel, sacudida y nada. La regla que ordenaba
la tabla —el espectáculo es inversamente proporcional a la frecuencia— no cambia, pero
hasta ahora no se cumplía de verdad: la celebración del 60 % de los casos era una banda a
pantalla completa igual que las demás, solo que más corta. Ahora es un «+1» de un renglón
junto al contador de gemas, que no tapa nada y no detiene nada.

## D-R12-2 · Una prueba puede blindar el fallo

El detalle que más conviene recordar de esta ronda. El guardián E47, escrito en 1.8.0 con
buena intención, decía: *«ningún modificador de cinta reposiciona el cartel»*. Es decir,
**la monotonía estaba sostenida por una prueba en verde**. Corregir el diseño exigía primero
borrar el guardián que lo impedía.

La regla que queda: **cuando una comprobación impide la corrección, la comprobación es parte
del fallo.** E47 pasa de prohibir el movimiento a prohibir la invasión: lo que no se puede
tolerar no es que un cartel se coloque distinto, es que se meta en la zona con la que el
niño contesta.

## D-R12-3 · El mismo fallo de posición, por tercera vez

El cartel del logro salía a **887 px de altura, fuera de la pantalla**, con las 519
comprobaciones en verde. Causa: `_06-biomas.scss` pone `position: relative` a todo hijo
directo de `.zona-juego` que no esté en su lista de exclusiones, y gana por orden de
cascada. En 1.7.0 le pasó al aviso de prisa; en 1.8.0 se añadió `.cinta` a la lista; en
1.8.1 se añadió el cartel y se olvidó apuntarlo.

**Lo cazó mirar la pantalla, no una prueba.** Es la lección E14-E17 otra vez, y van tres.

Ahora E47 compara la `position` **calculada** de los superpuestos, que es lo único que ve
este fallo: el elemento existe, tiene su texto, tiene su animación, y simplemente está
donde nadie lo ve. Y el cartel bajó del 30 % al 12 % de altura porque a 30 rozaba la fila
alta del teclado en una pantalla de 812 px — medido con `getBoundingClientRect()`, no
estimado.

## D-R12-4 · Lo que se retira, y por qué no se comenta

Seis coreografías de cinta con sus `@keyframes`, y los doce gritos de ánimo. No se dejan
comentadas: la comprobación de animaciones huérfanas que nació en 1.8.0 no lo habría
permitido, y hace bien. Los gritos de ánimo se van porque el ánimo dejó de tener cartel y
**no hay dónde escribirlos**; un dato que no se pinta en ningún sitio acaba pareciendo que
sí. `CB.mensajes.grito()` deja de recibir el tipo.

Detrás de un fallo no se celebra: se acompaña. El vehículo del ánimo es Rocarr asintiendo,
un gesto que ya existía y que un niño lee sin que se lo expliquen.

## D-R12-5 · Los guardianes de un fallo de diseño

E56-E58, y son distintos de todos los anteriores porque el fallo que vigilan no es un error
de lógica: es una decisión estética equivocada. Lo que se puede medir de eso —y por tanto
lo que se mide— es la **diversidad de la tabla**: al menos cuatro vehículos distintos,
ninguno con más de la mitad de las celebraciones, y la más frecuente entre las más cortas y
sin usar la banda.

Validados sembrando el fallo original —devolver los ocho momentos a la cinta—: ocho
comprobaciones rojas repartidas entre los tres.

## Estado al cerrar 1.8.1

| | 1.8.0 | 1.8.1 |
|---|---|---|
| Comprobaciones de la suite | 489 | **520** |
| Comprobaciones de la auditoría | 58 | 58 |
| Fallos registrados | E1–E55 | **E1–E58** |
| Vehículos de celebración | 1 (nueve recorridos) | **6** |
| Coreografías de cinta | 9 | **3** |
| Efectos de sonido | 12 | 12 |

---

# Ronda 13 · Fase 6 del plan: tres conductos sin conectar — versión 1.9.0 (28 de julio de 2026)

Primera fase ejecutada del plan que devolvieron las dos lentes que faltaban. Las tres
correcciones son de la misma familia —E41, E55 y ahora estas— y ya van cinco: **una
función escrita, documentada y correcta a la que no llama nadie no falla; simplemente no
ocurre**.

## D-R13-1 · `atras()` y `ir()` hacían cosas distintas

`ir()` ejecutaba el manejador de salida; `atras()` no. Con solo dos manejadores
registrados, eso significaba que la mitad de las salidas del juego no limpiaban nada. El
síntoma tampoco era un error: era el salvavidas de la tarjeta de reparación leyendo los
tres pasos, veinticinco segundos después, sobre otra pantalla.

**La lección general, que vale más que el arreglo:** cuando dos funciones son caminos
alternativos para lo mismo —entrar y salir de una pantalla—, la regla que aplica una tiene
que aplicarla la otra. Es la tercera familia de la ronda 10 (E44: el cerrojo de una
respuesta estaba en la partida y faltaba en el jefe y en la calibración) vista desde otro
lado.

Y de paso se cerró el efecto colateral que se ve al leerlo: Escape en la reparación
llevaba al mapa con `CB.partida.estado` vivo detrás. Ahora pausa, como en la partida. Se
eligió pausar antes que meter `p-reparacion` en `SIN_SALIR` porque no inventa pantallas.

## D-R13-2 · Marcar donde se monta, no adivinar por el formato

Las siete frases de presentación existían desde el principio. El plan proponía resolverlas
desde `item.formato`, y **eso habría estado mal**: las claves de `PRESENTACION` son nombres
de componente (`ordenarFila`, `selectorSigno`) y `item.formato` trae otros (`ordenar`,
`signo`). Un `PRESENTACION[formato]` habría devuelto `undefined` en cuatro de siete casos
sin fallar nunca: la familia de E42 exacta.

Además el componente real no se deduce del formato: un problema monta `selectorDatos` o
`tecladoBloques` según el trimestre, y `opciones4` cae a teclado si los distractores no dan
para cuatro. Así que se marca **en los nueve sitios donde se monta**, que son nueve líneas
de una línea cada una, y `presentar()` se niega a pintar una clave que no conozca.

**Tipo de mensaje neutro.** El plan decía de usar `'animo'`. Se probó y estaba mal: ese par
de colores es el del fallo, y estrenar una balanza quedaba como una reprimenda. Nace
`data-tipo="aviso"` reutilizando el par del panel, ya medido en `casos-contraste.js`: cero
pares nuevos que verificar.

## D-R13-3 · Leer en voz alta: lo que NO se hizo es la mitad de la decisión

La documentación llevaba desde la primera versión afirmando que «la consigna se lee sola al
aparecer». Era falso: solo había una llamada a la región viva.

Lo que **no** se ha hecho, y por qué, importa tanto como lo que sí:

- **No se usa `CB.voz.leerOGuiar`.** Cae en `lecturaGuiada`, y esa función **no comprueba
  `CB.voz.activa`** —solo lo hace `leer`—. Sería audio que arranca solo y no se puede
  apagar desde los ajustes: WCAG 2.2 1.4.2 incumplido, en material escolar sujeto a la
  norma.
- **No se lee sin voz española instalada.** La guiada va a 1000 ms por palabra: veinticinco
  segundos de resaltado con el cronómetro corriendo, y todos los problemas se agotarían por
  tiempo en un Chromebook.
- **No se leen las operaciones.** Decir «seis menos tres» en voz alta no ayuda a nadie y
  alarga cada ítem.
- **El altavoz no vuelve a la barra.** De ahí se retiró a petición expresa (P3). Va dentro
  del enunciado, que es donde está lo que hay que oír, y llama a una variante que **no
  levanta el bloqueo antiazar**: un altavoz encima de la pregunta se roza sin querer, y ese
  roce anularía de un toque la única protección contra responder al tuntún.

## D-R13-4 · Un guardián que no cazó su siembra, y dos que medían otra cosa

De los tres guardianes nuevos, **E60 no se puso rojo al sembrar el fallo**. Comprobaba
`necesitaPresentacion` y `marcarVisto` por separado —dos funciones que llevaban años siendo
correctas— y no el conducto, que era lo que faltaba. El propio plan lo había anticipado con
esta frase: *«un guardián que solo comprueba la primera vez pasa en verde con la función a
medio conectar»*. Pasó exactamente eso.

Y dos veces se midió lo que no era:

- **E61 pasaba en vacío.** Escribía `estado.itemActual` a mano y luego llamaba a
  `servirItem()`, que genera el suyo propio desde el guion — y el mundo M1 no sirve
  problemas de enunciado. La mitad A daba verde por no haber servido ningún problema, no
  por tener la voz apagada. Lo delató la mitad B al ponerse roja.
- **E60 se puso rojo contra código correcto**, porque `CB.partida.iniciar()` **ya sirve el
  primer ítem**, y la llamada extra a `servirItem()` estaba midiendo la pantalla después de
  que el segundo ítem la limpiara.

Las dos son la misma equivocación con dos caras: **construir el escenario a mano en vez de
dejar que lo produzca la función real, y no preguntarle luego a esa función en qué estado
lo dejó.**

## Estado al cerrar 1.9.0

| | 1.8.1 | 1.9.0 |
|---|---|---|
| Comprobaciones de la suite | 520 | **548** |
| Comprobaciones de la auditoría | 58 | 58 |
| Fallos registrados | E1–E58 | **E1–E61** |
| Fases del plan ejecutadas | 0 de 10 | **1 de 10** (fase 6) |
| Componentes que se presentan | 0 de 7 | **7 de 7** |

---

# Ronda 14 · Fase 7 del plan: el teclado que mentía 800 ms — versión 1.9.1 (29 de julio de 2026)

## D-R14-1 · La especificidad como fuente de fallos accesibles

Las tres correcciones de esta fase son **la misma clase de fallo**: una regla más
específica pisando a la que declara un estado, sin que nadie se entere porque el elemento
sigue ahí y sigue funcionando.

- `.teclado-bloques .btn-bloque[data-tecla="ok"]` (0,3,0) pisaba a `.btn-bloque:disabled`
  (0,2,0), y el OK se quedaba verde con el teclado bloqueado.
- La excepción de `desactivar-movimiento()` con su prefijo valía (0,2,1) y pisaba al
  mismo `:disabled`, anulando el hundido justo en el ajuste que más lo necesita.

**La lección para la próxima:** cuando una regla declara un ESTADO —bloqueado,
seleccionado, con error—, hay que preguntarse qué otras reglas del proyecto tienen más
especificidad sobre los mismos elementos. Un estado que se pinta con una sola declaración
es un estado que cualquier regla temática puede borrar en silencio.

## D-R14-2 · Medir el contraste sobre el botón, no sobre los tokens

`casos-contraste.js` medía pares de variables. Eso comprueba lo que alguien **quiso**;
entre eso y lo que se **ve** caben la especificidad y la cascada. E63 monta el teclado de
verdad, lo pilla deshabilitado y mide `getComputedStyle` de cada tecla: es lo único que
podía ver que una de las doce tenía otro fondo.

Y afirma primero que las teclas están deshabilitadas. Sin eso, si el bloqueo no llegara a
aplicarse la prueba mediría botones activos —que sí son de colores distintos, a propósito—
y pasaría en verde midiendo justo lo contrario.

## D-R14-3 · Los números, medidos

| par | ratio | veredicto |
|---|---|---|
| `#6E6E6E` sobre `#8C8C8C` (lo que había) | **1,52:1** | muy por debajo de 4,5 |
| `--btn-texto` `#241C14` sobre `#8C8C8C` | **4,99:1** | el elegido |
| `--gris-carbon` `#33302B` sobre `#8C8C8C` | **3,91:1** | descartado: no llega |
| blanco sobre `#8C8C8C` (alto contraste sin línea propia) | **3,36:1** | descartado |
| blanco sobre `#333333` (alto contraste, el elegido) | **12,63:1** | |

El plan decía que el blanco sobre piedra daba 2,9:1 y que era «peor que hoy». Medido, son
3,36:1 y es mejor que el 1,52 de partida. La conclusión no cambia —no llega a 4,5 y hace
falta su propia línea— pero **el número del plan estaba mal y conviene dejarlo dicho**: un
plan verificado no es un plan exacto.

## D-R14-4 · Un guardián que se habría puesto rojo midiera lo que midiera

La mitad de E62 que comprueba el hundido nació midiendo `getComputedStyle().transform`
sobre un botón de la maqueta. En la maqueta de pruebas los botones **no tienen caja de
composición** —`getBoundingClientRect()` da 0— y Chrome devuelve `transform: none` para
todo elemento sin renderizar. Daba `none` incluso poniéndole `style.transform` a mano.

Es un modo de fallo nuevo en la lista y merece nombre propio: **un guardián que no puede
dar verde nunca es tan inútil como uno que no puede dar rojo**, y se detecta igual — al
sembrar. Ahora lee las dos reglas que compiten en el CSSOM y comprueba la relación entre
ellas, que además es el invariante de verdad: la excepción del movimiento no puede
alcanzar a los botones bloqueados.

## Estado al cerrar 1.9.1

| | 1.9.0 | 1.9.1 |
|---|---|---|
| Comprobaciones de la suite | 548 | **561** |
| Fallos registrados | E1–E61 | **E1–E63** |
| Fases del plan ejecutadas | 1 de 10 | **2 de 10** (fases 6 y 7) |
| Peor contraste del teclado bloqueado | 1,52:1 | **4,99:1** |

---

# Ronda 15 · Fase 8 del plan: deshacer, confirmar y no salir por un roce — versión 1.10.0 (29 de julio de 2026)

## D-R15-1 · Deshacer sin peaje, no confirmar con peaje

`ordenarFila` y la fase de datos de `selectorDatos` se contestaban solas y no dejaban
retirar nada. Un dedo que se va obligaba a **terminar mal el ítem a propósito**, y el
registro guardaba «falló ordenar» o `faseFallada = 'datos'`: le atribuye al niño un
problema de comprensión que no tiene, y ese registro alimenta el informe del adulto.

La tentación era pedir un OK. Se descartó: metería un toque obligatorio en **cada** ítem
de esos formatos —quien acierta a la primera lo pagaría— y choca con la decisión ya
cerrada de omitir la fase 1 cuando hay exactamente dos números, que existe justamente
«para no hacer perder el tiempo con una decisión que no existe» (§9.6).

**La regla que queda: el arreglo de un error no puede cobrarle nada a quien no se
equivoca.** Deshacer cuesta un toque solo a quien lo necesita; confirmar se lo cobra a
todos.

## D-R15-2 · Una regla en tres sitios de siete

`pedirConfirmacion` la aplicaban `tecladoBloques`, `opciones4` y `balanza`. Se la
saltaban `selectorSigno`, la fase 3 de `selectorDatos`, `ordenarFila` y `monedas`. Es E44
otra vez, con cuatro huecos en vez de dos.

Y en los dos últimos la respuesta se dispara sola, sin OK del que colgar la
confirmación. La solución —colgarla del gesto **que cierra** la respuesta: la última
pieza, la moneda que alcanza el importe— **exige poder deshacer**, porque si no un «toca
otra vez» sobre la última pieza no tendría segunda oportunidad posible. De ahí que 8.1
vaya antes que 8.2 en el plan; el orden no era estético.

## D-R15-3 · Un cerrojo que no cierra es peor que ninguno

Para «Salir» se descartó `pedirConfirmacion`: empieza con
`if (!_confirmacionPendiente) { alConfirmar(); return; }`, y esa bandera solo vale `true`
cuando el antiazar ha disparado. En una partida normal habría sido un **no-operativo**:
verde en las pruebas, roto en el juego.

Y el cerrojo propio nació con el mismo tipo de agujero: **no soltaba el armado al
confirmar**. El botón se quedaba armado para siempre, de modo que al volver a una partida
el primer roce en Salir la habría terminado sin aviso — el fallo que el cerrojo venía a
impedir, entrando por la puerta de atrás. Lo cazó la **tercera** aserción de E66, la de
la caducidad, que era la que parecía menos importante de las tres.

Se extrae `CB.partida.soltarSalida()` porque hay **dos** salidas del ciclo —confirmar y
caducar— y una de las dos siempre se olvida cuando esto se escribe en línea.

## D-R15-4 · Contar no es marcar

`disponibles` es una pieza por valor, sin repeticiones: pagar 6 € es tocar tres veces la
moneda de 2 €. Poner `aria-pressed="true"` habría convertido un contador en un
interruptor —decirle «pulsado» al lector de pantalla de un botón que hay que seguir
pulsando— que es mal uso de ARIA, WCAG 4.1.2. Se cuenta con `data-veces`.

Y la fila visible de lo cogido —«2 € + 2 € + 1 €»— es lo que de verdad descarga la
memoria: con solo el total, quien va por 5 € no sabe si ha cogido dos de 2 y una de 1 o
una de 5, y **no puede comprobarlo**.

## D-R15-5 · Sembrar la vacuidad hay que hacerlo bien

El plan pedía sembrar la vacuidad quitando la espera al desbloqueo de `montar()`. Al
primer intento la siembra **no valía**: la versión «sin esperar» seguía esperando un tic
de `setInterval` de 20 ms, y el desbloqueo llega antes. Todo salió verde y por un momento
pareció que los guardianes no dependían de la espera.

Sembrada de verdad —resolución inmediata— los guardianes **se ponen rojos** en «los dos
primeros toques entran de verdad → obtenido 0». Eso es lo que se quería demostrar: fallan
ruidosamente en vez de pasar en verde sin haber tocado nada.

**Lección: una siembra que no pone nada rojo hay que sospecharla antes de celebrarla.**
Puede ser que el guardián sea bueno; puede ser que la siembra no siembre.

## D-R15-6 · El presupuesto de peso se parte en dos

La auditoría se puso roja por 1 KB: 1 101 sobre un tope de 1 100. El desbordamiento era
**enteramente de `pruebas/`** —`casos-regresiones.js` había pasado de 1 358 a 2 473 líneas
en cinco rondas de guardianes—.

Subir el número a 1 200 y seguir habría sido aflojar el guardián hasta que deje de decir
nada, que es como mueren estos topes. Se parte: **lo que se compila < 900 KB** (ahí sí,
engordar es un problema) y **las pruebas < 500 KB** (que crezcan es lo que se quiere). El
tope que de verdad protege el arranque no es ninguno de los dos: es la descarga inicial
de < 400 KB, y ese no se toca.

## Estado al cerrar 1.10.0

| | 1.9.1 | 1.10.0 |
|---|---|---|
| Comprobaciones de la suite | 561 | **595** |
| Comprobaciones de la auditoría | 58 | **59** |
| Fallos registrados | E1–E63 | **E1–E67** |
| Fases del plan ejecutadas | 2 de 10 | **3 de 10** (6, 7 y 8) |
| Formatos que piden confirmación | 3 de 7 | **7 de 7** |
| Formatos donde se puede deshacer | 2 de 7 | **4 de 7** |

---

# Ronda 16 · Fase 9 del plan: tres teclados, uno solo bien — versión 1.11.0 (29 de julio de 2026)

## D-R16-1 · Una copia no se desincroniza de golpe

La fase 3 de `selectorDatos` no nació mal: nació **igual**. Se desincronizó porque cada
mejora del teclado original —el sonido del ⌫, el `aria-live` del visor, el respeto por
`CB.partida.bloqueado`, la confirmación del antiazar— se hizo en un sitio y no en el otro.
Seis diferencias, ninguna introducida a propósito.

Y una de ellas es puro azar tipográfico: `data-tecla="OK"` en mayúsculas frente a `"ok"`,
lo que hace que `[data-tecla="ok"]` no lo alcance. Ese OK llevaba toda la vida sin recibir
el verde del botón primario, y nadie lo vio porque nadie compara dos teclados en la misma
pantalla.

**La regla: dos implementaciones de la misma cosa no se mantienen sincronizadas por
disciplina.** O se unifican o divergen; no hay tercer estado estable. Es la misma lección
que E25 (dos listas de movimiento reducido) y E43 (dos implementaciones de la escalera),
y van tres.

## D-R16-2 · Lo que hay que vigilar al unificar no es lo que se unifica

Unificar dos teclados es mecánico y se ve en pantalla al primer intento. Lo que **no** se
ve es que la respuesta viaja con cuatro campos de diagnóstico —`datosElegidos`,
`signoElegido`, `faseDatosOk`, `faseOperacionOk`— que alimentan el informe del adulto por
fases. Perderlos al envolver el callback no rompe nada visible: el juego sigue jugándose
igual y el informe empieza a mentir.

E68 los comprueba uno a uno, y esa es su razón de existir. El resto de sus asertos —que
el ⌫ suene, que el visor tenga `aria-live`— son la parte fácil.

## D-R16-3 · Un séptimo formato sin la protección de los 800 ms

Encontrado al mirar el orden de las líneas: `selectorDatos` ignoraba su propio
`opciones.bloqueoMs` y ponía `CB.partida.bloqueado = false` **después** de pintar. Era el
único de los siete formatos que no protegía contra el toque heredado del ítem anterior.

No estaba en el plan. Salió de leer el código para hacer otra cosa, que es de donde salen
casi todos los de esta serie.

## D-R16-4 · Un guardián que se pone rojo contra código correcto

**E65 bajó a «6 de 7» al unificar los teclados.** Comprobaba la confirmación del antiazar
con `/pedirConfirmacion/.test(String(CB.componentes[f]))`, y `selectorDatos` dejó de
contener la palabra porque ahora delega. La confirmación seguía funcionando; el guardián
no podía verla.

Es exactamente la fragilidad que este proyecto ya tenía anotada: **leer el texto fuente de
una función solo vale para literales de cadena y nombres de propiedad**. Aquí se estaba
usando para inferir comportamiento, que es justo lo que no aguanta un cambio de estructura.

Se corrige en dos mitades, y las dos hacen falta: el barrido acepta la delegación —cubre
seis formatos en dos líneas y eso vale— y el séptimo pasa a comprobarse **conduciendo las
tres fases** y tocando el OK dos veces. Un barrido barato para lo ancho, una conducción
cara para lo que el barrido ya no puede ver.

## Estado al cerrar 1.11.0

| | 1.10.0 | 1.11.0 |
|---|---|---|
| Comprobaciones de la suite | 595 | **612** |
| Fallos registrados | E1–E67 | **E1–E68** |
| Fases del plan ejecutadas | 3 de 10 | **4 de 10** (6, 7, 8 y 9) |
| Construcciones de teclado en el código | 2 | **1** |
| Formatos con bloqueo de 800 ms | 6 de 7 | **7 de 7** |

---

# Ronda 17 · Fase 10 del plan: cinco premios que no se enseñaban — versión 1.12.0 (29 de julio de 2026)

## D-R17-1 · Calcular, guardar y no decir es una forma de no hacerlo

Los cinco casos de esta fase comparten la misma estructura: el juego hacía el trabajo
—elegía el cromo, marcaba el reto, concedía el logro, abría el mundo, batía el récord—, lo
escribía en el perfil, y **no lo decía**. Ninguno daba error. El juego funcionaba y el niño
no se enteraba.

Es una familia distinta de las tres que ya estaban anotadas (una función que nadie llama,
una propiedad que no existe, una regla en un sitio de tres). Aquí la función se llama, el
dato existe y la regla se aplica: lo que falta es la última línea, la que lo pone en
pantalla. **Y es la que nunca falla una prueba**, porque el estado queda correcto.

Regla que queda: cuando algo se escribe en el perfil, preguntarse quién lo lee. Si la
respuesta es «el informe del adulto» o «nadie», hay que mirarlo dos veces.

## D-R17-2 · El panel «Hoy además», y por qué se declara

El orden de lectura de `p-fin` (§3.7) es contrato cerrado. Los hitos podían haberse metido
dentro de `#fin-dominado`, y habría sido más barato, pero ese panel se titula «Lo que has
dominado hoy» y un mundo abierto no es una destreza dominada: el rótulo habría empezado a
mentir.

Panel propio, entre lo dominado y las gemas, porque **los hitos van antes que el
recuento**. Y se declara aquí, que es lo que pide el contrato, en vez de cambiarlo de
tapadillo.

## D-R17-3 · Dos guardianes míos que ramificaban en vez de afirmar

El hallazgo de método de esta ronda, y es incómodo porque es la segunda vez que aparece con
otra cara.

E72 y E73 estaban escritos así:

```js
if (elHitoOcurrio) { ...comprobarlo... } else { t.ok(true, 'no tocaba'); }
```

Con el fallo sembrado —capturar los mundos abiertos DESPUÉS de abrirlos— la condición era
falsa siempre, el guardián se iba por el `else` y **daba verde**. Es la vacuidad de E46
disfrazada de prudencia: parece defensivo y en realidad es un guardián que se apaga solo
justo cuando hace falta.

**Un guardián que solo comprueba cuando la cosa ocurre no comprueba que la cosa ocurra.**
Si el escenario se puede montar de forma determinista, se monta y se afirma; si no se
puede, no hay guardián, hay decoración.

## D-R17-4 · Y un escenario montado sobre una propiedad inexistente

El montaje de E72 marcaba los niveles de M1 filtrando por `nivel.mundo === 'M1'`. **El
nivel no guarda su mundo**: no existe esa propiedad. El filtro no marcaba nada, ningún
nivel quedaba superado, el mundo no se abría y cuatro aserciones se ponían rojas contra
código correcto.

Se le pregunta ahora a `CB.catalogo.nuclearesDe('M1')`, que es quien lo sabe. Suponer la
forma de un dato ajeno en vez de preguntársela al módulo que lo produce es exactamente lo
que se cobró E42, y van dos veces en esta serie.

## D-R17-5 · Efecto colateral que se declara, no se esconde

Resolver el cromo antes del grito mueve `CB.util.elegir` por delante de `sacarDeBolsa`, y
eso **cambia el orden de consumo del RNG sembrado**. Una partida sigue siendo reproducible
desde su semilla —que es la propiedad que importa— pero deja de dar la misma secuencia que
daba antes de esta versión. Va escrito en el commit y aquí.

## Estado al cerrar 1.12.0

| | 1.11.0 | 1.12.0 |
|---|---|---|
| Comprobaciones de la suite | 612 | **639** |
| Fallos registrados | E1–E68 | **E1–E73** |
| Fases del plan ejecutadas | 4 de 10 | **5 de 10** (6, 7, 8, 9 y 10) |
| Paneles de `p-fin` | 3 | **4** (declarado) |
| Nodos de cinta | 2 | **3** (partida, jefe, fin) |

---

# Ronda 18 · Fase 11 del plan: textos que prometían de más — versión 1.13.0 (29 de julio de 2026)

## D-R18-1 · Arreglar el texto, no la economía

El cofre del descanso prometía gemas y no daba ninguna. La tentación era darlas —parece más
generoso— y estaba mal por tres motivos que se comprobaron uno a uno: rompe el invariante de
la moneda visible, convierte al cofre en el único de los cinco descansos que paga, y **ni
siquiera se vería**, porque `servirItem` no llama a `pintarHUD` y el premio no aparecería
hasta el acierto siguiente.

**Cuando el texto y el código no coinciden, la pregunta es cuál de los dos está bien.** Aquí
el código: la economía del juego está cerrada y medida, y el texto se escribió describiendo
una mecánica que nunca se implementó. Si algún día se quiere esa mecánica, es una decisión de
economía y va aquí, no un arreglo de texto.

## D-R18-2 · La misma cosa contada con dos criterios

El saludo del mapa contaba una cosa (`R < 0.7`) y la Cantera pintaba otra (`oxidada`, que
exige haber sido sólida antes). Los dos números coinciden en un perfil maduro y divergen del
todo en la primera semana, que es justo cuando el niño empieza.

Y el efecto era el peor posible: **la única razón honesta que este juego se dio para volver
mañana** —el musgo— quedaba, vista por un niño, como una frase que no se corresponde con
nada de lo que hay en pantalla.

Regla: si un texto cuenta algo que además se dibuja, el recuento y el dibujo tienen que salir
del **mismo predicado**, no de dos que se parecen. Es la misma familia que E25 (dos listas de
movimiento) y R16 (dos teclados), y van cuatro.

## D-R18-3 · Un guardián que costó tres intentos, los tres por lo mismo

E75 es el guardián más caro de escribir de toda la serie, y no por difícil: por tres
equivocaciones **mías, en la prueba**, encadenadas y todas de la misma familia.

1. **Construí la destreza a mano** y le puse `ultimoISO`. La propiedad se llama
   `ultimoRepasoISO`. `recuperabilidad()` devolvía 1, no había destrezas vencidas, y dos
   aserciones se pusieron rojas contra código correcto. Es E42 exacto, por tercera vez en
   esta serie.
2. Con eso arreglado, **el guardián no cazaba su siembra**: comprobaba `conMusgo()` en
   abstracto y no tocaba el saludo del mapa por ningún sitio. Verde con el fallo dentro.
3. Al añadir la mitad que conduce el saludo, **llamé a la función equivocada**: el saludo no
   lo escribe `pintar()` sino `pintarMundos()`. El texto se quedaba como estaba, el número
   leído era 0, el esperado era 0, y **volvía a dar verde**.

La tercera es la más instructiva, porque es una vacuidad que no se ve: dos ceros que
coinciden por motivos distintos. Se arregla con un **centinela**: se escribe una marca en el
nodo, se llama a la función y se afirma que alguien la ha borrado. Si el código no pinta, el
guardián lo dice en vez de comparar basura con basura.

**Lo que hay que sacar de aquí: sembrar no basta si el guardián no toca el camino real.** Un
guardián que comprueba la función pura y no el sitio donde se usa está probando la mitad que
ya funcionaba.

## Estado al cerrar 1.13.0

| | 1.12.0 | 1.13.0 |
|---|---|---|
| Comprobaciones de la suite | 639 | **658** |
| Fallos registrados | E1–E73 | **E1–E76** |
| Fases del plan ejecutadas | 5 de 10 | **6 de 10** (6 a 11) |
| Textos que prometen de más | 3 | **0** |

---

# Ronda 19 · Fase 12 del plan: el jefe — versión 1.14.0 (29 de julio de 2026)

## D-R19-1 · La única excepción a que la música la mande el bus

`CB.jefes.terminar()` llama a `CB.musica.poner('victoria')` directamente. Es el único sitio
del juego donde la música no viene de `CB.bus.emitir('pantalla', …)`, y se hace a propósito:
`terminar()` **no cambia de pantalla**, pinta la victoria encima de `p-jefe`, así que el bus
no llega a hablar y el tema del jefe seguiría sonando mientras el mundo se cierra.

Está anotado en tres sitios —la tabla de `07-musica.js`, `CLAUDE.md` y aquí— y el motivo de
anotarlo tres veces es concreto: **una tabla que se lee como completa y no lo es miente más
que no tenerla**. `CB.musica.PANTALLAS` sigue con sus 17 entradas y el contrato de
`casos-musica.js` intacto; lo que cambia es que ya no es la única fuente.

## D-R19-2 · Lo que se descartó, y no por barato

El distintivo «sin un fallo» encendido durante el combate se descartó **aunque era trivial
de implementar**. Es literalmente la racha que se pierde: un contador que solo puede ir a
peor, mirándose durante ocho turnos. Este proyecto lo tiene declarado como patrón oscuro
prohibido, y además contradice la regla escrita en la cabecera del propio fichero del jefe:
aquí no se puede perder nada.

Se queda como **recuerdo retrospectivo** en la tarjeta del mundo. La misma información,
después, sin fabricar miedo mientras se juega.

## D-R19-3 · Un guardián rojo contra código correcto, por asincronía

E78 falló al primer intento. `CB.jefes.responder()` programa `turno()` con `setTimeout`, y
`terminar()` —que es quien escribe `jefeSinFallos`— **solo se llama desde `turno()`**. Un
bucle síncrono de ocho respuestas baja los bloques a cero y no termina el combate jamás.

Es una variante nueva del error de montaje: no es que el escenario tenga la forma
equivocada, es que **el escenario no llega a completarse** porque el código real avanza por
temporizador y la prueba va por bucle. Se conduce el turno a mano, que es lo que haría el
temporizador.

## D-R19-4 · Un verde que había que explicar antes de creérselo

La suite pasó de 56 s a **905 ms con más comprobaciones**. Un salto así es sospechoso por
definición, y la regla de esta casa es no dar por bueno un verde sin saber qué lo produjo.

No era un atajo ni una suite perdida: 55 registradas, 55 renderizadas, 673 casos. Los 56 s
eran **la pestaña en segundo plano**, con Chrome estrangulando a un tic por segundo los
`setTimeout(…, 0)` que encadenan las suites — la trampa que `CLAUDE.md` ya documentaba, vista
por primera vez desde el lado contrario: no una suite que se cuelga, sino una que parecía
tardar y no tardaba.

## Estado al cerrar 1.14.0

| | 1.13.0 | 1.14.0 |
|---|---|---|
| Comprobaciones de la suite | 658 | **673** |
| Fallos registrados | E1–E76 | **E1–E79** |
| Fases del plan ejecutadas | 6 de 10 | **7 de 10** (6 a 12) |
| Anuncios en el combate del jefe | solo el fallo | **acierto y fallo** |
| Escrituras muertas en el perfil | 1 (`jefeSinFallos`) | **0** |

---

# Ronda 20 · Fase 13 del plan: tiempo de lectura y música — versión 1.15.0 (29 de julio de 2026)

## D-R20-1 · 350 ms por palabra, y por qué no 700

El ritmo real de un lector de 2.º es 60-90 palabras por minuto, o sea unos 700 ms por
palabra. Aplicarlo habría sido lo «correcto» y está mal: las 13 palabras del mensaje típico
darían 9,1 s, recortados al tope 3200, y **el juego se congelaría 5,2 s en casi todos los
aciertos, doce veces por sesión**.

Eso contradice de frente el principio rector de todo este plan —la fricción vive en la
matemática y en ningún otro sitio—, y convertiría la recompensa en un peaje. Con 350 se dobla
el tiempo de lectura sin que el bucle deje de ser un bucle.

**La lección: un número correcto en abstracto puede ser el número equivocado en su sitio.**
El criterio no era «cuánto tarda en leerse» sino «cuánto puede esperar un niño de 7 años sin
que la recompensa se convierta en castigo».

## D-R20-2 · Un parámetro opcional en vez de un global

`espera()` gana un tercer argumento opcional. La alternativa —un global con el último
mensaje— habría sido menos código y habría cambiado **todas** las llamadas a la vez, incluidas
las tres que existen para comprobar que nada cambia.

Y eso es exactamente lo que se comprobó sembrándolo: con el global, los tres `t.igual` de E54
se ponen rojos. **Esos tres asertos son el guardián de verdad de esta fase**, y por eso se ha
escrito al lado por qué no se pueden borrar por parecer redundantes.

## D-R20-3 · El presupuesto que se mueve se dice

Alargar la espera de cada acierto no toca el presupuesto de tiempo por ítem: toca el reloj de
pared, `limiteSesionMin`. La sesión de 20 minutos pierde unos 20 s de ítems.

Es poco, y aun así va escrito en el commit y aquí. Un cambio que consume presupuesto sin
decirlo es como el que rompe un contrato sin declararlo: funciona hasta que alguien mide.

## D-R20-4 · La monotonía que fabricaba el motor

De nueve pistas normalizadas, con puntos de entrada y de bucle medidos uno a uno, el niño oía
siempre los mismos treinta primeros segundos: cada reparación y cada descanso ponen `'calma'`,
y al volver la pista del mundo empezaba otra vez desde su entrada. Cinco o seis idas y venidas
por partida.

Es el mismo tipo de defecto que la ronda 12 de las cintas —**variedad que existe en los datos
y que el motor no deja llegar a quien juega**—, aquí en la banda sonora. Diez líneas.

Se guarda en memoria de sesión, no en el perfil: `07-musica.js` es adaptador de plataforma y
puede tener estado, pero el almacén no es esto.

## D-R20-5 · Afirmar la recuperación, no el guardado

E82 podría haber comprobado que `CB.musica.posiciones['mundoPradera']` existe. Habría pasado
en verde con el fallo entero dentro, porque lo que faltaba no era guardar: era **usar** lo
guardado.

Es la misma forma de la debilidad que ya apareció en E60 —comprobar las dos funciones sueltas
y no el conducto— y en E75 —comprobar la función pura y no el sitio donde se usa—. Van tres, y
la regla que las une es corta: **el guardián tiene que mirar el efecto, no el mecanismo.**

## Estado al cerrar 1.15.0

| | 1.14.0 | 1.15.0 |
|---|---|---|
| Comprobaciones de la suite | 673 | **687** |
| Fallos registrados | E1–E79 | **E1–E82** |
| Fases del plan ejecutadas | 7 de 10 | **8 de 10** (6 a 13) |
| Números del bucle fuera de la fuente única | 1 | **0** |
| Tiempo de lectura del mensaje de acierto | 1600 ms fijos | **hasta 3200 según longitud** |

---

# Ronda 21 · Fase 14 del plan: cuánto queda — versión 1.16.0 (29 de julio de 2026)

## D-R21-1 · La lección estaba aprendida en el mismo repositorio

La calibración escribe «Pregunta 3 de 4» y tiene un comentario explicando por qué se añadió.
La expedición —siete minutos, entre 8 y 20 ítems, longitud variable— no decía nada. El único
indicador de avance era el cielo, que es `aria-hidden`.

Merece anotarse porque no es un descuido de escritura: es una lección aplicada en un sitio y
no en el otro, con cuatro meses de diferencia entre los dos. **La misma familia que las tres
ya registradas** —una regla en un sitio de tres, dos listas que se separan, dos teclados— y
la quinta vez que aparece en esta serie.

## D-R21-2 · Se pinta donde el índice significa lo que debe

El plan proponía ampliar las cinco llamadas a `pintarHUD`. Correcto, pero insuficiente: en
`trasAcierto`, `e.indice` es todavía el del ítem que se acaba de responder —lo incrementa
`siguiente()`, después—, así que la fila habría ido **un bloque por detrás toda la partida**.

Se pinta también en `servirItem`, donde `indice` es exactamente el número de ítems ya
servidos. No es una llamada de más: es la única donde el número quiere decir lo que la fila
enseña.

## D-R21-3 · El máximo no manda cuando no hay sitio

El plan pedía comprobar el ancho con 20 bloques en el escalón más estrecho, y decía
literalmente que «cabe sin desplazar el reloj» no estaba verificado en ningún sitio. **No
cabía.**

A 320 px el HUD apretaba la galería hasta 10 px de ancho: los 20 bloques se apilaban en una
columna y el HUD pasaba de 72 a 254 px de alto. El `max-width: 40%` no lo impidió, y ese es
el detalle que conviene recordar: **en un contenedor flex, cuando no hay sitio el que decide
es `flex-shrink`, no `max-width`.** Un máximo solo limita hacia arriba.

Y por debajo de 480 px —donde las luces solas ocupan 160— no caben ni 128 px de galería. Ahí
la misma información va en texto, «7/20». **No se esconde: se dice de otra manera.** Esconder
habría sido más fácil y habría dejado sin saber cuánto queda justo en la pantalla más
pequeña, que es donde menos se ve el cielo.

## D-R21-4 · Afirmar el nodo antes de medir nada

E83 empieza comprobando que `#hud-galeria` existe en la maqueta. Sin eso, `pintarHUD` sale
por su `if` y todas las aserciones siguientes comparan cero bloques con cero esperados: verde
perfecto, comprobación nula.

Es la cuarta vez en esta serie que la vacuidad llega por la misma puerta —un nodo que falta
en el mock— y por eso está escrito como primera línea del guardián y no al final.

## Estado al cerrar 1.16.0

| | 1.15.0 | 1.16.0 |
|---|---|---|
| Comprobaciones de la suite | 687 | **698** |
| Fallos registrados | E1–E82 | **E1–E83** |
| Fases del plan ejecutadas | 8 de 10 | **9 de 10** (6 a 14) |
| Indicadores de avance visibles | 0 | **1** (galería del HUD) |

---

# Ronda 22 · Fase 15 del plan: el primer minuto — versión 1.17.0 (29 de julio de 2026)

Última fase del plan que devolvieron las dos lentes que faltaban. Diez fases, de la 6 a la 15.

## D-R22-1 · Una frase que promete y una pantalla que no cumple

La calibración decía «Ahora sí empieza el juego: con reloj, con luces y con gemas» y llevaba
a un menú con tres tarjetas bloqueadas. Es exactamente E21 —«el botón dice lo que va a
pasar»— un escalón más adelante, y con la asimetría de que JUGAR costaba dos toques hasta el
primer ítem mientras CANTERA TRANQUILA costaba uno.

Se cambió el destino y **también la frase**, que añade «Puedes parar cuando quieras con
Pausa»: si el salto va directo a una expedición con reloj, decirlo forma parte del arreglo.
Cambiar solo el destino habría sido cambiar de sitio la promesa incumplida.

## D-R22-2 · Enfocar no es navegar

En `alEntrar['p-mapa']`, con un solo mundo abierto, el foco va al botón de cavar. La regla
cerrada desde E1 es que **un `alEntrar` pinta y no navega** —un handler que llama a `ir()`
sobre su propia pantalla recursa hasta desbordar la pila—, y mover el foco no es navegar. Se
deja escrito porque la distinción es fina y el próximo que lea el handler tiene que poder
saber por qué esto sí y `ir()` no.

## D-R22-3 · El plan proponía un guardián que no guardaba nada

El plan pedía proteger el orden —el salto tiene que ir después de `guardarPerfil`, porque
`servirItem` lee `perfil.trimestreDeducido`— con una aserción sobre ese campo.

**No protege nada.** La deducción es síncrona y el salto es diferido 3400 ms: para cuando el
temporizador dispara, el trimestre ya está escrito pase lo que pase. Sembrar el orden
equivocado deja esa aserción en verde.

Lo que sí protege el orden son las dos aserciones de **estado previo**: «justo después de
`terminar()` seguimos en la calibración» y «no hay partida todavía». Se ponen rojas en cuanto
alguien deja de diferir el salto, que es la única forma real de romper esto.

Y se descubrió **sembrando**: la primera siembra —mover la línea del `setTimeout` dentro de la
función— no puso nada rojo, y con razón, porque mover una llamada diferida dentro de un cuerpo
síncrono no cambia cuándo se ejecuta. **Una siembra que no pone nada rojo hay que sospecharla
antes de celebrarla**, y esta vez la sospecha señalaba al plan, no al guardián.

## Cierre del plan

| | al empezar (1.8.0) | al terminar (1.17.0) |
|---|---|---|
| Comprobaciones de la suite | 443 | **704** |
| Fallos registrados | E1–E46 | **E1–E84** |
| Comprobaciones de la auditoría | 56 | **59** |
| Fases del plan ejecutadas | 0 de 10 | **10 de 10** |

Lo que queda fuera y sigue fuera: **F0.5** (pilotaje en papel con tres niños) y **F10**
(calibración β con diez o quince). Ninguna de las dos se puede hacer con código, y los
`betaBase` actuales siguen siendo una calibración razonada y no una medida. Conviene que la
próxima persona que lea esto no lo confunda con trabajo pendiente de programar.

---

# Ronda 23 · Saber dónde estás — versión 1.18.0 (29 de julio de 2026)

Dos cosas preguntadas desde la silla, no encontradas leyendo código: *«te pierdes fácilmente
porque no sabes en qué nivel estás»* y *«cuando preguntas qué moneda es, pon la moneda»*. Las
dos resultaron ser el mismo tipo de fallo: información que el juego tiene y no enseña.

## D-R23-1 · El barajado no se toca

La petición fue «cuando haya superado un nivel, un mensaje como el Hurry up que diga Nivel
superado y a qué nivel vamos ahora». Debajo hay un modelo mental razonable: la expedición es
una secuencia de niveles y se pasa de uno al siguiente.

El juego no funciona así. `construirGuion()` termina con `CB.util.barajar(guion, rng)`, así
que los ítems de una veta van **repartidos** por toda la expedición. La forma obvia de hacer
literal lo de «pasar de nivel» sería agrupar el guion por vetas.

**No se hace.** La práctica intercalada retiene mejor que la agrupada, y agrupar sería
cambiar la pedagogía para que cuadre la maqueta. Lo que se arregla es lo que faltaba —decir
en qué veta se está y cuándo se cierra— no lo que ya funcionaba.

## D-R23-2 · «Superado» tiene que ser verdad, y hay tres caminos de vuelta

Con el guion barajado, una veta que se deja atrás puede volver por tres sitios, y la frase
solo es honesta si se descartan los tres:

1. **quedan ítems suyos en el guion** — se cuentan;
2. **debe un repaso** — un ítem fallado dos veces se reinserta entre 3 y 5 ítems después, y
   eso vive en `colaRepaso`, así que se cuenta también;
3. **se le agotó el tiempo** — y este **no deja rastro en ninguna cola**. Es el agujero que
   los otros dos no tapan, y por eso existe `e.vetasSinCerrar`.

`quedanDeLaVeta()` cuenta **de más** a propósito: una reinserción consume el hueco de un ítem
del guion, así que el número es un techo, no una cifra exacta. De los dos errores posibles
solo uno es aceptable — equivocarse por arriba es callarse una vez; equivocarse por abajo es
cantar «superado» y volver a servir esa veta tres ítems después.

Y se pregunta **al servir el ítem siguiente**, no al acertar el anterior: en el momento del
acierto todavía no se sabe qué veta viene —una reinserción puede colarse por delante—, así
que anunciarla entonces sería adivinar.

## D-R23-3 · Apartar no es esconder

Por debajo de 480 px el nombre del mundo no cabe junto al de la veta. La solución intuitiva
—`display: none`— lo saca **también** del árbol de accesibilidad, y entonces quien navega con
lector de pantalla tiene *menos* información en la pantalla estrecha que en la ancha. Se usan
las declaraciones de `.solo-lectores`: sigue leyéndose, solo que no se ve.

La otra alternativa, un `aria-label` en el `<p>`, está descartada: ARIA prohíbe nombrar un
párrafo y axe lo marca.

## D-R23-4 · El fichero decía la regla y el nivel no la cumplía

La cabecera de `15-gen-dinero.js` lleva desde el primer día diciendo que monedas y billetes
son conjuntos separados y que «el juego los distingue **siempre** visual y verbalmente». Se
cumplía al pagar y al contar. No se cumplía en E1 —«toca la moneda de 2 euros»—, que es la
única pregunta cuyo objeto es distinguirlos: las cuatro opciones eran cuatro botones de
madera iguales con un número dentro.

Leído al revés: se acertaba buscando el 2 del enunciado. Se podía sacar el nivel entero sin
haber mirado nunca una moneda.

Familia nueva y vale la pena nombrarla: **el fichero enuncia una regla que su propio código
incumple en un sitio**. No es un dato que no se pinta (E70) ni una función que nadie llama
(E41): es una invariante escrita en prosa, cumplida en dos de tres sitios, y sin nada que la
comprobara. Cuando una cabecera diga «siempre», conviene ir a contar los sitios.

## D-R23-5 · Dos números con un nombre no son un número duplicado

E47 declaraba `TOPE = 45` y la comparación de arriba usaba un `30` escrito a mano. Leído
deprisa: constante muerta y número duplicado, el patrón que este proyecto persigue desde
`MS_CARTEL`. Se unificó en 30 y se puso roja la otra mitad del guardián, porque el cartel del
logro se declara al 38 % y ahí está bien.

Eran **dos reglas distintas**: un fotograma que se mueve no puede bajar del 30 % —taparía el
teclado justo cuando se va a tocar—, una colocación fija puede llegar al 45 % porque se queda
quieta. Lo único que sobraba era el nombre común. Ahora son `TOPE_FOTOGRAMA` y
`TOPE_COLOCACION`.

La lección es simétrica de la de `MS_CARTEL` y conviene tenerla al lado: **antes de unificar
dos números iguales, comprobar que miden lo mismo**.

## D-R23-6 · El guardián que medía el `hidden`

E88 nació pidiendo `offsetHeight > 0` sobre el rótulo. Las diecisiete secciones de la maqueta
de pruebas viven dentro de un `<div hidden>`, así que devolvía 0 — igual que para el HUD y
para la galería. Es exactamente el error de `getComputedStyle().transform`, que vale `none`
en un elemento sin caja: **una medida de maqueta hecha sobre un árbol oculto mide el
`hidden`, no la maqueta**.

Se destapa, se mide y se vuelve a tapar. Y se afirma que destapar ha servido de algo, porque
la tentación evidente el día que esto se rompa es relajar la aserción a `>= 0`, que quedaría
verde para siempre sin comprobar nada.

## D-R23-7 · E47 se ganó el sueldo

La primera versión de la coreografía `cinta-sube` entraba desde el 180 % y se paraba con
opacidad 1 en el 120 y en el 60: se sentaba encima del teclado durante más de medio segundo.
La paró un guardián escrito hace quince versiones para otro fallo, antes de que llegara a
ninguna pantalla. Los tres peldaños caben ahora en el 28 %.

## D-R23-8 · No hay imágenes, y no es una carencia

Preguntado por qué las monedas no son fotos de monedas: **el proyecto no admite un solo
fichero binario**. El bloque 4 de la auditoría falla ante cualquiera, y la razón es la de
siempre —`dist/` se abre con doble clic desde `file://`, sin servidor y sin red—. Todo lo que
se ve está dibujado: el reloj de arena, las gemas, el terreno, las texturas (que las genera
`js/02-texturas.js` como data: URI al arrancar).

Así que la pregunta útil no es «¿dónde están las imágenes?» sino «¿qué hace reconocible una
moneda?». Y la respuesta no es el dibujo del anverso, que un niño de siete años no mira: es
que la de 1 € tiene el aro dorado y el centro plateado y la de 2 € al revés, y que el billete
de 20 es azul y más pequeño que el de 50, que es naranja. Eso se dibuja con `box-shadow`
inset de desenfoque cero y cabe en la regla dura.

Además, dibujarlas así **no reproduce** ningún billete: son cuadrados de colores con una
cifra. Un facsímil de un billete de euro tiene reglas propias del BCE, y no hace falta
entrar ahí para enseñar a distinguir cinco denominaciones.

## D-R23-9 · Un `min-height` que era también un techo

`.mensaje-resultado` pedía tres líneas —`--tam-texto-min * 3`— y daba una. Dos cosas a la
vez, y las dos fáciles de no ver:

1. `box-sizing: border-box` es global, así que esos 60 px incluían los 32 de relleno.
2. En un contenedor flex bajo presión, `min-height` no es solo un suelo: es **hasta dónde se
   deja encoger** la caja. Un valor pensado como mínimo funcionaba de máximo.

Lo que se recortaba era la frase de procedimiento, que es la única parte del mensaje que
enseña algo — y en 1.15.0 se midió cuánto tiempo hacía falta para leerla sin comprobar que
cupiera. Medir el tiempo de lectura de un texto que no cabe es la misma familia que contar
las gemas fuera del contador.

**Queda pendiente y se deja escrito**: en una ventana de 755 px de alto la zona superior son
135 px y el enunciado solo ya pide 147, así que el reparto vertical de `p-partida` merece una
revisión con medidas en los diez tamaños de referencia. No se hace de paso, y no se disimula.

## D-R23-10 · Las monedas dibujadas, a petición expresa

Se dejó escrito arriba (D-R23-8) que el proyecto no admite imágenes y que la pieza se dibuja
con CSS. Preguntado de nuevo y pedido expresamente que se vean las monedas reales, se hace —y
la restricción de fondo no se rompe, porque nunca fue «no puede haber dibujos» sino **«no
puede haber ficheros binarios»**.

La salida es la que ya usaban las ocho texturas del terreno: se genera al arrancar y se
publica como `data:` URI en una variable CSS. Aquí en SVG en vez de canvas, porque lo que hay
que dibujar son círculos, estrellas y arcos. Trece kilobytes para las siete piezas.

Lo único que hubo que decidir de verdad: **la cifra no va dentro del dibujo**. Un número
grabado en el SVG no crece con `letra-grande`, no crece con `modo-proyeccion` y no aparece en
ningún par de contraste medido — es decir, deja de obedecer a los tres ajustes de
accesibilidad que este proyecto tiene la obligación legal de respetar. Así que el SVG trae el
metal, el aro, las doce estrellas, el continente y la ventana con arco, y **deja libre la
franja central** donde el DOM sigue escribiendo el número como texto de verdad. Por eso las
estrellas de los billetes van arriba a la derecha, como en la bandera, y no en corro
alrededor del centro: ahí taparían la cifra.

Y se conserva el color plano debajo. Si `generarDinero()` no llegara a ejecutarse, las siete
piezas siguen teniendo su color y su ancho, que ya las distinguen. El dibujo mejora el
reconocimiento; no lo sostiene.

## D-R23-11 · El decimotercer efecto de sonido

La tabla de doce efectos era contrato y sube a trece. No se hace a la ligera: la regla del
proyecto es que cambiar uno de estos números obliga a cambiar la comprobación que lo afirma,
**a propósito y en el mismo commit**, y eso es exactamente lo que se ha hecho
(`casos-reloj.js`).

Se planteó reutilizar el «toc», que ya existe, y es peor: el «toc» significa «aún no» —suena
cuando se toca durante los 800 ms de construcción— y usarlo también para «sí» borraría la
única distinción sonora que hay entre las dos respuestas posibles al mismo gesto. Un sonido
que significa dos cosas opuestas no significa ninguna.

Y el clic es el más flojo y el más corto de los trece por la misma razón que el «+1» es la
celebración más pequeña: **se oye cien veces por sesión**. El espectáculo es inversamente
proporcional a la frecuencia, y eso vale para el oído igual que para la vista.

## D-R23-12 · Por qué el modo desarrollo enseñaba lo de antes

`npm run dev` ya tenía watch desde 1.7.0. Recompilaba bien y recargaba bien, y en pantalla no
cambiaba nada — que es la peor forma de estar roto, porque parece que el cambio no funciona.

La causa es el propio service worker del juego: `js/45-offline.js` lo registra bajo HTTP y
cachea el armazón con política **cache-first**, así que una vez instalado deja de importar lo
que responda el servidor. Es el riesgo R7 que el plan preveía para un aula de veinticinco
Chromebooks, ocurriendo en la máquina de quien desarrolla.

La salida es un `sw.js` de desarrollo que se da de baja a sí mismo y borra las cachés, más
`Cache-Control: no-store` en todo. Y una salida de la salida: `CON_SW=1 npm run dev` sirve el
real, porque el modo sin conexión es una función entregada y hay que poder mirarla.

**Y son dos servidores, no uno.** browser-sync inyecta su cliente como un `<script>` más en
cada HTML que sirve, y `casos-carga.js` comprueba que la página de pruebas cargue un solo
guion. Esa comprobación tiene razón —el día que alguien vuelva a partir el juego en 45
`<script>` sueltos tiene que ponerse roja— así que lo que se aparta es browser-sync, no la
comprobación. 8080 el juego con recarga en vivo; 8081 las pruebas, servidas tal cual. Su
`snippetOptions.blacklist` habría bastado en teoría; en esta versión apaga la inyección
entera, y se comprobó antes de confiar en ella.

---

# Ronda 24 — que la tecla suene, y suene una vez (1.19.0)

## D-R24-1 · No hay un sonido nuevo: es el mismo clic

Se pidió que al pulsar una tecla sonara algo. La primera tentación es un efecto propio para
el teclado, y sería un error: el acto es el mismo —«mi pulsación ha entrado»— y darle dos
voces distintas obligaría al niño a aprender que significan lo mismo. La tabla se queda en
**trece efectos**, que sigue siendo contrato.

Distinguir el dedo de la tecla solo tendría sentido si hubiera algo distinto que decir, y no
lo hay: el juego responde igual a las dos.

## D-R24-2 · La regla es «un gesto, un sonido», y no una lista

El clic de botón entregado en 1.18.0 traía una lista de tres excepciones escrita a mano —el
botón deshabilitado, la moneda, el de silenciar— y nació corta: la tecla del teclado numérico
ya trae su «picar» y el ⌫ su «toc», así que **cada cifra que escribía un niño sonaba dos
veces**, con el clic tapando justo el sonido que dice algo. La regla estaba bien escrita en el
comentario de su propio guardián; lo que falló fue enumerar a mano dónde se aplica. Es la
familia de E44-E46, otra vez.

Ahora `CB.audio.emitidos` cuenta las peticiones de sonido y el clic genérico se pide **al
final del gesto y solo si el gesto ha sido mudo**. La diferencia práctica: un componente que
gane voz propia mañana queda cubierto sin que nadie se acuerde de venir aquí.

Se cuenta la **petición** y no el sonido, y **antes** de mirar el contexto de audio. Si se
contara después, en la página de pruebas —donde no hay `AudioContext`— el contador no se
movería nunca y la regla se comprobaría en el vacío: verde, diciendo nada.

## D-R24-3 · Por qué la decisión se toma en un `setTimeout(0)`

En captura todavía no ha sonado nada, así que ahí no se puede decidir. En burbuja se podría,
pero bastaría un `stopPropagation()` de cualquier manejador —hoy no hay ninguno; mañana no se
sabe— para dejar mudo ese botón concreto sin que nada fallara. El temporizador conserva la
captura, que es lo que da inmunidad, y aun así decide al final.

El precio es un retraso de un fotograma como mucho, inaudible en un sonido de 35 ms. La
contrapartida es un orden mejor: primero lo que significa algo, y el clic solo si no había
nada que significar.

Y hay un caso que el contador no puede ver, porque su sonido llega en **otro evento**: el
botón deshabilitado, cuyo «toc» lo emite `pointerdown`. Esa excepción sigue escrita, y es la
única.

## D-R24-4 · Las dos excepciones del teclado que no son de sonido

**La autorepetición.** Un dedo apoyado en el 7 dispara treinta teclas por segundo. Eso no es
pulsar treinta veces y sonaría a ametralladora.

**Enter y Espacio sobre algo activable.** El navegador los convierte en un clic de verdad, del
que ya se encarga el otro oyente. Con Enter el contador bastaría —el clic llega dentro de la
misma tarea—, pero con Espacio no: el clic no se dispara hasta que se **suelta** la tecla,
mucho después de que el temporizador haya decidido. Se tratan igual los dos, porque una regla
que depende de cuándo despacha el navegador un evento sintético es una regla que se rompe
sola.

Escribir en un campo tampoco suena. El único que hay es la puerta parental, y ahí la
confirmación de que la tecla ha entrado es el carácter, que se ve; un clic por letra sería
ruido. No es una excepción por sonido, es que escribir no es pulsar un mando.

## D-R24-5 · Cualquier gesto abre el audio, y uno sintético no

El contexto de Web Audio nace suspendido y solo lo despierta un gesto del usuario. Lo
despertaban dos botones: JUGAR y CANTERA TRANQUILA. Quien empezaba por «Ajustes», por «¿Quién
juega?» o navegando con el teclado no oía **nada** hasta llegar a la portada — con lo que la
promesa de 1.18.0, «todos los botones suenan», era falsa justo en los primeros toques de la
sesión, que son los que enseñan que el juego responde. Se abre ya con cualquier toque o tecla,
igual que `CB.musica.iniciar()` hace con `reintentar()` desde 1.7.0 y por el mismo motivo.

Un evento sintético **no** lo abre. No es una concesión a las pruebas: el navegador no
concede activación a un `dispatchEvent`, así que llamar ahí a `iniciar()` solo deja un
contexto suspendido que nadie va a reanudar. Que la suite —que dispara veintitantos clics de
mentira— siga muda es la consecuencia, no el motivo.

## D-R24-6 · El botón de silenciar ya no necesita estar exento

Estaba en la lista con este argumento: «sonaría justo el clic que pide que no suene nada». Al
mirarlo con el contador delante resulta que no: el manejador silencia **antes**, el clic
diferido llega después y sale por un maestro con ganancia 0. Medido en el navegador, no
deducido. Y en el sentido contrario —al volver a activar el sonido— el clic ahora suena, que
es exactamente la confirmación que hacía falta.

La moneda tampoco necesita exención: calla porque **suena** su «gema», no porque esté escrita
en una lista. La diferencia importa el día que alguien añada una pieza nueva.

## D-R25-1 · Las monedas ahora son fotografías, y el binario deja de estar prohibido

Contradice de frente a **D-R23-8** («no hay imágenes, y no es una carencia») y a **D-R23-10**
(«las monedas dibujadas»). Se anota como contradicción y no como matiz, porque el argumento
que sostenía las dos era, en parte, falso.

Lo que decían D-R23-8 y el comentario de `03-sprites.js` era: *el proyecto no admite un solo
fichero binario, porque `dist/` se abre con doble clic desde `file://` y una imagen suelta
sería una petición de red que ahí no existe.* La primera mitad es verdad —el bloque 4 de la
auditoría lo prohíbe— y **la segunda no lo es**: una imagen es un SUBRECURSO, igual que
`<link rel="stylesheet">` o los nueve `<audio>`, y `file://` la sirve sin pedir nada a la red.
Lo que prohibía las imágenes era una línea de `auditar.mjs` escrita por nosotros, no el
navegador. Una regla del proyecto puede cambiarse; una restricción del entorno, no. Durante
dos versiones se confundieron, y la consecuencia fue rediseñar el dinero entero para esquivar
un obstáculo que no estaba.

**Qué se gana.** El saber A.5 pide *reconocer* las monedas y los billetes. D-R23-10 dio la
respuesta correcta a la pregunta equivocada: dibujó lo que distingue una pieza de otra —el
bimetal, el color, el ancho— y con eso se aprende a distinguir SIETE RECTÁNGULOS ENTRE SÍ,
que no es lo mismo que reconocer una moneda en la mano. La foto sí es lo mismo.

**Con qué condiciones.** Las mismas tres con las que se abrió la puerta a la música, porque
son las que hacen que esto sea una excepción y no un agujero:

1. lista **cerrada**, escrita en `auditar.mjs`: doce piezas, ni una más;
2. comprobada **en los dos sentidos** —ni falta ninguna, ni sobra ninguna—;
3. y cada pieza tiene que estar **declarada Y consumida en el CSS compilado**, porque un
   fichero que no usa nadie es peso muerto que nadie volverá a mirar.

Todo lo demás sigue prohibido: una fuente, un icono, una captura. Y las ocho texturas del
terreno **siguen dibujándose en canvas**, donde el argumento sí se sostiene: son ruido de
16×16 que como fichero pesaría más que el código que lo genera.

**Lo que NO cambia** es lo único que D-R23-10 acertó de pleno: **la cifra no va dentro de la
imagen**. Un número grabado en el fichero no crece con `letra-grande`, no crece con
`modo-proyeccion` y no se puede medir en un par de contraste. Lo que sí cambia es dónde cae:
antes iba ENCIMA del dibujo, que dejaba libre la franja central a propósito; ahora baja a una
**cinta opaca debajo de la imagen**, porque sobre una fotografía el hueco lo decide el grabado
del billete y no nosotros. Efecto lateral que conviene ver: los seis pares de contraste de
`casos-contraste.js` —uno por color de pieza— se convierten en **uno solo**, el de la cinta.
Menos comprobaciones y más honestas: sobre una foto no hay contraste que medir.

**Tamaños reales, a escala.** 3,1 px/mm las monedas, con la de 1 € como ancla en sus 72 px de
siempre; 0,85 px/mm los billetes. Sale gratis lo que antes había que inventar: el billete
crece con el valor, y la moneda de 10 céntimos es MÁS PEQUEÑA que la de 5 —que es verdad, y es
la trampa que tiene el dinero de verdad—.

**Qué es y qué no es.** No son facsímiles: son fotografías **de una sola cara, a un cuarto del
tamaño real**, con finalidad didáctica y sin más pretensiones. El billete de 100 € que se nos
pasó lleva encima los recuadros rojos del diagrama del BCE que señala las medidas de
seguridad; se advirtió y se pidió usarlo igual, y a 125 px de ancho apenas se ven. La
procedencia de las once restantes **no está verificada** —quedó anotado en
`LICENCIAS-TERCEROS.md` y en `docs/dinero.md`, igual que se hizo con la música—.

## D-R25-2 · Una pieza de céntimo no es un número

Al meter las cinco monedas de céntimo, lo natural era llamarlas por su número. Y ahí choca
todo: 5, 10, 20 y 50 **ya son** los cuatro billetes. Con un número por pieza pasan dos cosas,
y la segunda es la mala:

- el CSS selecciona la fotografía por ese número, así que «la moneda de 20 céntimos» se
  pintaría con la foto del billete de 20 €;
- y `40-partida.js` corrige con `Number(valor) === Number(item.respuesta)`, que para dos
  piezas distintas del mismo número **da cierto**: tocar el billete de 5 € acertaría la
  pregunta «toca la moneda de 5 céntimos».

Se nombran `'c5'`, `'c20'`. El precio es que **la respuesta de esas preguntas no es un
número**, y eso hay que pagarlo en tres sitios, los tres anotados:

1. `40-partida.js` compara cadenas en una rama propia. Sin ella, `Number('c20')` es `NaN`,
   `NaN === NaN` es falso y la pregunta se falla SIEMPRE, incluso tocando la moneda buena —un
   nivel imposible de superar sin un solo error en consola—;
2. `casos-generadores.js` exime al invariante 1 (respuesta en `[0,999]`) y al 3 (sin
   decimales), con una exención estrecha: solo la respuesta, solo si es cadena, y solo en un
   ítem que pide dibujar piezas;
3. y los distractores fijos **dejan de pasar por el motor de distractores**, en la partida y
   en la prueba. Con los euros solo se calculaba de más; con `'c20'` el motor hace aritmética
   con una cadena.

La alternativa era un segundo atributo numérico y una unidad implícita, que es la forma de
tener el mismo choque escondido un nivel más abajo.


# Ronda 26 — dos columnas cuando hay sitio, y lo que se vio al medir (1.21.0)

## D-R26-1 · El reparto en dos columnas va por ANCHURA y desde 1200 px

En vertical el reparto arriba/abajo es el correcto y no se toca: el pulgar llega al tercio
inferior y el enunciado queda a la vista por encima. En una pantalla ancha —portátil,
proyector, pizarra— ese mismo reparto deja dos franjas de aire a los lados y obliga a un
barrido vertical largo entre la pregunta y el teclado, que es el recorrido que el niño repite
en cada uno de los veinte ítems de una expedición.

Va por la anchura porque así lo manda la regla de los dos ejes (`_herramientas.scss`): la
anchura decide cuántas columnas, la altura decide el lado del botón. Una columna más es
anchura. Por eso este cambio no toca `--lado` ni ningún tamaño.

Y desde 1200 y no desde 1024: por debajo el aparato es una tableta apaisada, que se sujeta
con las dos manos, y ahí el alcance del pulgar sigue mandando sobre el barrido de la vista.

**Las dos mitades se arriman al centro**, no se centra cada una en la suya. Centrando cada
mitad, en 1440 px el enunciado queda a 360 y el teclado a 1080: setecientos píxeles, más que
los cuatrocientos del reparto vertical. Se habría cambiado un recorrido largo por otro más
largo, que es la forma más fácil de que un cambio de maquetación parezca una mejora y no lo
sea.

Solo afecta a `p-partida`. El jefe y la calibración tienen otra maqueta (`.contenido`,
`#cal-respuesta`) y no comparten estas clases.

## D-R26-2 · Centrar y desplazar a la vez esconde por arriba, y la salida es `safe`

Una caja que centra (`justify-content: center`) y además desborda con barra
(`overflow-y: auto`) reparte el sobrante a los **dos** lados. Lo que sale por arriba no se
recupera de ninguna manera, porque `scrollTop` no puede ser negativo. Con el enunciado largo
de un problema más el mensaje de resultado —que tiene un suelo de tres líneas— el niño veía
el enunciado cortado por su primera línea y la barra solo le llevaba hacia abajo.

`safe center` es exactamente esto: centra mientras quepa, se porta como `start` en cuanto
desborda. Se aplica en **los dos ejes**, porque con `overflow-y: auto` el eje horizontal pasa
también a `auto` y una fila de piezas de dinero más ancha que la columna se recortaba por la
izquierda por el mismo motivo; y en cualquier otra alineación posicional de esa caja, que es
por lo que el `flex-end` del reparto nuevo es `safe flex-end`.

Un navegador que no conozca la palabra descarta la declaración entera y se queda en `start`:
se pierde el centrado, no se pierde contenido. Es la degradación que se quería.

La alternativa era centrar con márgenes automáticos (`margin-block: auto`), que tampoco
recortan. Se descartó por ser dos declaraciones y un hijo envoltorio donde `safe` es una
palabra.

## D-R26-3 · Los seis recortes que aparecieron al medir, y por qué ninguno se veía

Con el cambio hecho se midió la pantalla en quince tamaños de ventana, de 320×420 a
2560×1440, cruzados con «Letra grande» y «Modo proyección». Salieron seis fallos, **todos
anteriores** a esta versión, todos en verde en la auditoría, en las 824 comprobaciones de
entonces y en el cruce de clases. Ninguno se ve leyendo la hoja de estilos:

- **E96** — `:root.modo-proyeccion` escribía `--lado-respuesta` a mano, que es el *resultado*
  del `min()` de los dos ejes. En un proyector de 1200×700 la fila del OK caía fuera. Y como
  el selector lleva clase, ganaba por **especificidad**: ningún `:root { --lado-techo }`
  posterior podía bajarlo, así que los tres escalones de altura nombran ahora también la
  clase. La nota de `_variables.scss` que decía «gana el orden de origen» vale entre
  selectores de la misma especificidad, y solo ahí.
- **E97** — la excepción documentada del 6×2 se pedía por altura sin mirar la anchura. Seis
  columnas de 64 px con sus huecos son 424: en 360×640 dos columnas se salían.
- **E98** — el suelo de 64 px por tecla no se negocia, así que hay ventanas soportadas
  (320×480) donde el teclado no cabe. Ahí el OK era **inalcanzable** y la pregunta no se podía
  contestar. La zona de la respuesta lleva ya barra, como la del enunciado.
- **E99** — «CUBOMÁTICA» mide 337 px con sus rellenos: en 320 salía descabezado. Se arregla
  dejándolo partirse, **no** fijando un tamaño de letra para móviles: `--tam-titulo` es lo que
  gobiernan «Letra grande» y el modo proyección, y un literal ahí habría anulado los dos
  ajustes justo donde más falta hacen.
- **E100** — los cuatro botones de la barra no caben en 320 px y el de Sonido, el único que
  apaga la música, quedaba cortado contra el borde. La barra envuelve antes que encoger
  teclas.

Los seis guardianes (E95-E100) **miden**, no leen CSS. `getComputedStyle` habría dicho
`safe center` y habría quedado verde aunque el navegador no lo aplicara; y una aserción
condicionada a la ventana real está verde en toda máquina ancha por no aplicar, que es la
peor forma de estar verde. Por eso E99 y E100 miden dentro de una caja de 320 px en vez de
mirar la ventana.

## D-R26-4 · El instrumental también engaña: veinte Chrome con el mismo puerto

Durante parte de esta ronda las mediciones fueron falsas y coherentes. El guion de medida
lanzaba Chrome con un puerto de depuración fijo y lo mataba sin matar el árbol de procesos:
quedaban instancias vivas, y las ejecuciones nuevas se conectaban a la **primera** que había
ganado el puerto, es decir a un navegador con el CSS de hacía tres compilaciones. Las medidas
salían plausibles y equivocadas, y una corrección ya aplicada parecía no funcionar.

Es la misma familia que la caché de las páginas de prueba, y la misma lección: antes de
creerse una medida, comprobar que la está tomando el código que se acaba de escribir. El
guion lleva ahora un puerto por proceso y mata el grupo entero.

---

## D-1.23.0 — La segunda pasada de BEM, y por qué esta vez la vigila una herramienta

En 1.7.0 se renombraron 43 clases y se pasó de cero `bloque__elemento` a 29. Lo
que quedó fuera era la mayoría, y con ella el problema de fondo: **no había forma
de saber, mirando un nombre, si era un bloque o el hijo de otra cosa**. Convivían
`luces` y `luz`, `pasos-reparacion` y `paso-reparacion`, `caras-animo` y
`cara-animo` — el plural y el singular haciendo de jerarquía, que es una
convención que solo existe en la cabeza de quien la escribió. Y `.pieza__cifra`
llevaba dos versiones siendo un elemento **huérfano**: no había ningún bloque
`.pieza` en toda la hoja.

**La gramática está en `docs/convencion-bem.md`** y son nueve reglas. Las tres que
mandan: un solo nivel de `__`; cero descendencia entre bloques; cero estilado por
etiqueta dentro de un bloque.

**El reparto de quién comprueba qué es la parte que hay que recordar.** stylelint
(E104) comprueba la FORMA de un nombre y no puede comprobar el SENTIDO: que `luz`
debería llamarse `luces__luz` no lo sabe ninguna herramienta, lo decide una
persona y queda escrito con su motivo en `pruebas/mapa-bem-2.json`. Presentar
stylelint como «el guardián de BEM» habría sido exactamente el tipo de verde que
este proyecto persigue: el que se da por comprobado sin comprobarse.

**El sustituto de la descendencia es una variable, no un selector más largo.**
`.panel-bloque .texto-menor` y sus seis hermanas hacían que un bloque cambiara de
aspecto según quién lo contuviera. Ahora el contenedor declara `--texto-sec` y el
bloque la consume con un valor por defecto. Es mejor por tres motivos concretos:
funciona con contenedores que aún no existen, no depende del orden de la cascada
—que aquí es carga útil y conviene no gastarla en esto—, y `casos-contraste.js`
lo sigue midiendo igual porque mide valores calculados. El mismo remedio se
aplicó al tamaño de las criaturas dentro de la pantalla de juego.

**Las dos redes nuevas no dependen de los nombres, y por eso valen.**
`retrato-pantallas.mjs` fotografía las 18 pantallas a tres anchos y compara
sha256: si un renombrado cambia un píxel, se ve. `volcado-css.mjs` compara la
hoja declaración a declaración y, con `--mapa`, exige que aplicar los
renombrados al volcado viejo dé exactamente el nuevo — el criterio con el que se
cerró 1.7.0. Las dos tuvieron que aprender lo suyo: los retratos salían idénticos
porque el service worker servía el CSS de la pasada anterior, y el volcado
comparaba `.a, .visor-respuesta` con `.a, .respuesta__visor` como si fueran
reglas distintas por no reordenar la lista tras renombrar.

**Lo que se arregló ANTES de tocar una sola clase, y no es un detalle.** Tres
comprobaciones se ponían verdes solas cuando su selector dejaba de encontrar
algo: `casos-contraste.js` se saltaba en silencio las ocho clases con texto —que
son obligación legal—, `casos-a11y.js` daba por ordenada una barra ausente y
`casos-fuente.js` medía la tipografía del `body`. Un renombrado las habría
apagado sin que nadie se enterara. Arregladas primero, la primera cazó dos clases
el mismo día. En la misma línea: el bloque 8 daba verde sin `dist/` construido,
afirmando «cero clases muertas» sin haber cruzado nada.

**Tres presupuestos de peso, no dos.** `herramientas/` deja de contar como fuente
compilada. No se compila ni se entrega: es utillaje de verificación, de la misma
naturaleza que `pruebas/`. Contarlo con `src/` hacía que comprobar más pareciera
que el juego había engordado, que es lo contrario de lo que ese tope quiere
decir. El que protege a quien juega sigue siendo el de la descarga de arranque.

**El codemod se borra al terminar**, como el de 1.7.0: volver a pasarlo sobre un
árbol ya renombrado solo puede hacer daño. Su regex aprendió tres exclusiones y
las tres por un caso real —`$luz` es un parámetro de mixin, `#visor-respuesta` es
un id (los ids no se renombran) y `@` empieza una at-rule—, y la del id la
descubrió el guardián E68 poniéndose rojo, que es exactamente para lo que está.

---

## D-1.23.1 — La estructura Sass y dónde debe vivir cada explicación

La carpeta plana de SCSS mezclaba orden de cascada y responsabilidad. Se adopta
una estructura 7-1 ajustada al tamaño real del proyecto: `app.scss` es la única
entrada; `manifiesto.json` conserva el orden de los diez parciales que emiten la
cascada; `_herramientas.scss` contiene los mixins; el resto se reparte entre
`abstracts`, `base`, `components`, `layout`, `pages`, `themes` y `utilities`.
Las carpetas clasifican, pero no deciden el orden.

`abstracts/_variables.scss` es la fuente única de configuración Sass y de
propiedades personalizadas globales. No se llevan allí las variables temporales
de un algoritmo ni las propiedades personalizadas privadas de un componente:
las primeras no son configuración y mover las segundas a `:root` cambiaría su
alcance. Los consumidores de mapas importan `variables` explícitamente para que
la dependencia sea visible.

Los comentarios de las hojas habían acumulado decisiones, relatos de fallos ya
cerrados y descripciones literales del selector siguiente. Eso duplicaba esta
documentación y publicaba el texto interno en el CSS expandido. El criterio queda
así: en SCSS solo `//`, solo para explicar un porqué no evidente —accesibilidad,
compatibilidad, especificidad, orden o contrato con JavaScript—. La historia y
las alternativas descartadas viven aquí.

El modo vigilancia sigue el mismo contrato: los diez parciales del manifiesto,
la entrada y los mixins forman las doce fuentes que pueden cambiar el CSS. Gulp
vigila las doce; `manifiesto.json` requiere reiniciar el proceso porque se carga
una sola vez al arrancar.

---

## D-1.23.2 — El orden no forma parte del nombre del parcial

Los prefijos `00-` a `09-` duplicaban una información que ya tiene un único
dueño comprobable: `manifiesto.json`. Se retiran de los nueve parciales y la
cascada no cambia; `app.scss`, el manifiesto y la auditoría siguen comparando el
mismo orden. Las referencias anteriores a nombres numerados en este documento
describen correctamente las versiones en las que se tomaron aquellas decisiones.

`_herramientas.scss` pasa a `_mixins.scss`. Las dependencias Sass compartidas
dejan de entrar en el espacio global: `v` identifica variables y `m` identifica
mixins en todos sus consumidores. Así una llamada como `m.bisel()` declara su
procedencia sin obligar a conocer qué `@use ... as *` se ejecutó antes.

El plan de mejoras de 1.8.0 se elimina del árbol actual porque ya estaba
ejecutado y duplicaba el historial. Sus decisiones estables viven aquí y el
documento original permanece recuperable en Git.

---

## D-1.23.3 — Calidad JavaScript y comentarios que justifican código

La aplicación conserva scripts clásicos concatenados sobre `window.CB`. Pasar a
ES Modules rompería el uso principal mediante doble clic y el contrato de carga
que verifica la suite. La mejora de calidad se hace dentro de esa frontera:
ESLint analiza fuentes, datos, pruebas, herramientas y construcción; impide
variables implícitas, código inalcanzable, comparaciones inseguras y errores de
promesas, y fija techos de complejidad, profundidad, tamaño y anidamiento.
`npm run entregar` ejecuta esta puerta antes de construir.

El validador de problemas y el panel adulto se dividen por responsabilidad sin
cambiar su API pública. Los callbacks asíncronos guardan la identidad del estado
y del ítem que los creó: si el niño cambia de pantalla o empieza otra partida,
el callback anterior termina sin tocar el estado nuevo. El ejecutor captura los
errores globales y las promesas rechazadas para que una excepción tardía no
pueda convivir con un resumen verde.

Los comentarios JavaScript habían llegado al 25 % de las líneas. Se reduce al
10 % con una regla equivalente a la adoptada para Sass: el ejecutable conserva
contratos JSDoc, invariantes, seguridad, compatibilidad y motivos no evidentes;
no conserva relatos cronológicos, alternativas ya descartadas ni descripciones
literales de la instrucción siguiente. Ese historial vive en este documento y
en `CHANGELOG.md`, donde puede leerse sin interrumpir el flujo del código.

BrowserSync se retira por dos motivos unidos: su árbol mantenía cinco avisos de
seguridad altos y hacía más difícil garantizar qué se inyectaba en cada página.
El servidor de desarrollo usa `node:http`, separa juego y pruebas, aplica
`Cache-Control: no-store` y recarga solo el juego mediante eventos enviados por
el servidor. No se añade ninguna dependencia de producción.

---

## D-1.23.5 — El foco se quita con `@supports`, no con un respaldo por selector

`:focus { outline: none }` seguido de un respaldo escrito para `button` y
`[tabindex]` parece la receta clásica, y tiene dos agujeros que no se ven
leyendo el CSS. El primero es de cobertura: un `<input>` no es ninguna de las
dos cosas, así que el campo de la puerta parental —el único campo de texto del
juego— se quedaba sin ningún indicador de foco. El segundo es de orden: el
respaldo existe para navegadores sin `:focus-visible`, pero al escribirse como
una regla más se aplicaba también donde `:focus-visible` sí funciona, de modo
que el navegador moderno recibía el anillo del ratón y el antiguo seguía sin
recibir nada en los campos.

La forma correcta invierte la pregunta. `:focus` pinta el anillo para todos los
controles, sin excepciones, que es lo que necesita quien navega con teclado y lo
que exige WCAG 2.4.7. Encima, `@supports selector(:focus-visible)` lo retira
únicamente donde el navegador sabe distinguir teclado de ratón
(`:focus:not(:focus-visible)`). El caso por defecto pasa a ser el accesible y la
optimización estética queda condicionada a que el navegador la entienda; antes
era al revés. E110 comprueba las dos mitades en `_base.scss`, porque ninguna de
las dos funciona sin la otra.

Del mismo repaso salen tres arreglos de nombre y estado que comparten causa: un
control cuyo texto visible es «Sí» o «No» no tiene nombre accesible propio, lo
tiene la fila entera. Los ajustes del niño y los del panel adulto componen ahora
su nombre con `aria-labelledby` —etiqueta más valor— y publican `aria-pressed`;
el grupo de ánimo del final declara `role="group"` rotulado por su pregunta; y
la puerta parental relaciona instrucción, campo y error (`aria-describedby`,
`aria-errormessage`, `aria-invalid`, `role="alert"`) y devuelve el foco al campo
que hay que corregir. Su `inputmode="numeric"` era además falso de origen: la
respuesta siempre fue una palabra de una frase, nunca un número.

La suite se mira a sí misma con el mismo rasero (E111): el resumen es
`role="status"` con `aria-busy`, la barra es un `role="progressbar"` con
`aria-valuenow` real en vez de una anchura que solo se ve, y
`comprobar-doble-clic.html` carga el bundle minificado que necesitaba para poder
preguntar por `CB.offline`.

---

## D-1.23.6 — El respaldo de una variable es una decisión de diseño, no una red

`.texto--menor` se escribió en 1.23.0 como `color: var(--texto-sec,
var(--texto-sec-claro))`. La primera mitad es el patrón bueno: el contenedor
declara y el bloque consume, de modo que el bloque no cambia por quien lo
contiene. La segunda mitad —el respaldo— pasó desapercibida como si fuera una
red de seguridad, y no lo es: es el color que se aplica siempre que nadie
declare nada, o sea, **el caso por defecto**. Y el elegido era el claro, que
solo funciona sobre fondo oscuro. Cualquier contenedor claro que no declarase la
variable quedaba en 1,5:1 sin que fallara nada. Le pasó al panel adulto: seis
notas —las que explican por qué una tabla de multiplicar está desactivada— y el
error de la puerta parental.

La lección es la misma que en 1.23.5 con `@supports`: **cuando algo tiene un
caso por defecto y un caso declarado, el que hay que acertar es el por defecto**.
El arreglo no toca `.texto--menor`; hace que `.pantalla--documento` declare
`--texto-sec` en la misma regla donde ya declaraba su fondo. Quien pone el
fondo pone la tinta.

El segundo fallo salió al comprobar el primero en «Alto contraste», y era peor:
el panel entero, blanco sobre blanco, setenta nodos a 1:1. El modo de alto
contraste está construido como una **paleta**, un mixin que reescribe variables
en `:root` — decisión buena, porque no hay reglas nuevas que mantener— pero la
paleta cambiaba las tintas y no las superficies. `--texto-principal` pasaba a
blanco mientras `.adulto__caja` seguía pintada con `--blanco`.

Lo interesante es por qué no se arregla apagando `--blanco`: esa variable no es
una superficie, es **luz** — la cara iluminada de todos los biseles voxel y el
color de las nubes. Ponerla negra en alto contraste habría borrado el relieve de
todo el juego. Que un mismo valor sirviera de luz y de superficie es lo que
escondía el fallo, así que la superficie se separa en `--bg-caja` y la paleta ya
puede apagarla. Con ella van `--crema-fila` y `--peligro-suave`, que solo se usan
como fondo. En cambio `--bg-texto-aviso` se queda ámbar en los dos modos: es un
papel propio, y lo que hacía falta era que quienes lo usan declarasen su tinta
—`.adulto__aviso` ya lo hacía; la cabecera de tabla y la marca del glosario, no.

E112 no se añadió a la tabla de `PARES`, y esa es la parte que conviene recordar.
Los quince pares medían combinaciones **previstas**: `--texto-sec-claro` contra
`--bg-pantalla`, que es oscuro, y pasaba. Ninguno era falso. Lo que ocurría en el
DOM era una pareja que nadie había declarado, y una tabla de parejas previstas no
puede contener la que nadie previó. Por eso E112 monta la caja con el módulo que
la construye, la cuelga de `#p-adulto` —fuera de su contenedor mediría justo lo
que no falla— y mide el color calculado contra el fondo real, en los dos modos.
Se comprobó sembrando el defecto: 18 nodos en rojo.

Queda pendiente, y declarado: las vetas **activas** siguen flojas en alto
contraste (3,4:1 y 1,55:1), porque su superficie es el color del bioma y la tinta
pasa a blanca. Separar «color de bioma» de «superficie de pieza» toca los biseles
de todo el juego y las 54 capturas de `retrato-pantallas.mjs`. Las vetas
**bloqueadas** no se tocan: WCAG 1.4.3 exime a los componentes inactivos, y su
gris es precisamente el lenguaje de «cerrado».

---

## D-1.23.7 — Un color que sirve para dos cosas no se puede cambiar para una

La veta se pintaba con `var(--deco-arena)`, `var(--deco-piedra)` y los demás
tonos del bioma, directamente. Leído en el SCSS parece lo correcto: el estado
«aprendiendo» es arena, y arena es `--deco-arena`. El problema aparece cuando
hay que cambiarlo en un solo sitio, porque **ese tono no era solo de la veta**:
pinta también los biseles, las nubes y los fondos de bioma. En alto contraste
había que apagarlo para que el rótulo se leyera, y apagarlo habría borrado el
relieve de todo el juego. La variable no se podía tocar ni dejar quieta.

Es la misma forma del fallo de `--blanco` en 1.23.6, y por eso conviene
enunciarla aparte: **cuando un mismo valor hace de identidad visual y de
superficie, deja de poder cambiarse por una de las dos razones**. La salida es
la misma las dos veces: dar a la pieza una superficie que sea solo suya
—`--bg-veta-<estado>`, con el tono del bioma como valor— y dejar que la paleta
la apague. En modo normal no cambia ni un color; en alto contraste, las seis
superficies se van a negro y el estado se sigue leyendo por el icono y por el
texto, que es lo que exige la regla de «nunca solo color».

El segundo fallo era más pequeño y más viejo. `.veta` estaba en la lista de
contenedores que declaran `--texto-sec: var(--texto-secundario)`, junto a
`.panel-bloque` y los demás. Esa tinta está calculada para un panel crema, y la
superficie más clara de una veta es la piedra: encima, el secundario se queda en
3,24:1. Estar en la lista correcta no basta si el valor que declara es el de otro
sitio; la veta declara ahora el principal, que da 4,99:1 en el peor de sus cinco
estados abiertos.

E113 se apoya en que los seis estados existen dos veces: en `$estados-veta` del
SCSS y en `CB.memoria.ETIQUETA` del JS. La prueba recorre los del JS, porque son
los que el juego sabe escribir, y por eso detecta también el caso que no se me
habría ocurrido comprobar: un estado nuevo al que nadie le dé superficie no
falla, simplemente **hereda la de debajo**. Por eso comprueba antes que la veta
pinta fondo opaco propio, y sólo después mide el ratio. Al bloqueado lo mide
igual pero no le exige nada —WCAG 1.4.3 exime a los componentes inactivos—, y
esa distinción se escribe en la prueba en vez de dejarla fuera, que es como se
convierten en invisibles.

Con esto no queda texto activo por debajo del mínimo en ninguna de las 18
pantallas, en ninguno de los dos modos.

---

## D-2.0.0 · Tres modos de juego, y la ventaja fuera de la fórmula

Se pidió partir el juego en tres modos —Fácil sin reloj, Normal con dos minutos,
Experto con treinta segundos— y que las recompensas fueran **mejores y más
frecuentes** cuanto más corto el reloj. La mitad de eso era recuperar algo
perdido: el eje ya existía con tres valores, dos de los cuales daban los mismos
30 s desde que se pusieron planos, y el párrafo de §11.4 de este mismo documento
ya avisaba de que recuperar la diferencia era cambiar un número.

La otra mitad chocaba de frente con una decisión cerrada. `js/20-puntuacion.js`
dice, y `casos-formulas.js` vigila con su aserción A3, que **el modo solo cambia
cuándo se agota el tiempo, nunca cómo se puntúa**, y que el modo sin reloj no
puede ser ni el que más puntúa ni el que menos. Su motivo no es de gusto: el
modo sin reloj es la salida que exige la WCAG 2.2.1, y castigarlo con puntos
castiga al niño que lo necesita, no al que lo elige.

**No hacía falta romperla, y esa es la decisión estructural.** `calcular()` no se
ha tocado: los 30 casos exactos de §11.7 dan los mismos valores y Fácil conserva
dentro de la fórmula su multiplicador fijo de 0,85, que sigue sin ser ni el
máximo ni el mínimo. La ventaja del modo vive **fuera**, en `js/2B-modos.js`,
como cinco palancas aditivas y visibles: una gema por acertar a la primera, un
punto más de bono de rapidez, dos probabilidades de sorpresa y un extra de bono
final con su propio rótulo en la pantalla de fin. La fórmula mide la respuesta;
el modo mide el reto aceptado. Son dos cosas distintas y ahora se calculan en dos
sitios distintos.

Tres cosas que no se deducen del código:

**Por qué existe «Quitar el reloj sin cambiar de modo».** Con las cinco palancas,
Fácil pasa a ser el camino que menos recompensa, y Fácil es a la vez la salida
obligatoria de la 2.2.1. La letra de la norma se cumple —el límite se puede
desactivar—, pero la equidad no: un niño con dislexia o con lentitud de
procesamiento no elige Fácil, lo necesita. El ajuste vive en el panel del
adulto, detrás de la puerta parental, porque **necesitar más tiempo no es elegir
menos reto**, y son dos decisiones de personas distintas. E123 comprueba que
apaga el reloj en los tres modos y que ninguna palanca lo consulta.

**Por qué la migración es la que es.** El mapa lo ordena una sola regla: a nadie
se le acorta el reloj. `sinPrisa` → Fácil es idéntico; el viejo `conCalma` —el
que traía casi todo el mundo— gana 90 s al pasar a Normal; y el viejo `normal`
conserva sus 30 s exactos al pasar a Experto.

Eso último obligó a partir en dos una función que había nacido siendo una.
`normal` existe en los dos vocabularios con dos significados: era el modo de 30 s
y ahora es el de 120. Una `normalizar()` que intentara ser idempotente y migrar a
la vez tenía que elegir, y elegía mal **en silencio**: el niño que jugaba en el
viejo «Normal» se quedaba en el nuevo Normal, con 90 s de más, y su récord se
comparaba contra otro modo. Lo cazó la propia prueba de la migración el primer
día. Hay ahora `migrarDesdeV2()`, que corre una vez detrás de la guarda
`perfil.version < 3`, y `normalizar()`, que es defensiva y no sabe nada de la
migración. **Cuando un nombre significa dos cosas, una sola función no puede
servir para las dos.**

**Por qué el rótulo del extra no nombra un reloj.** Decía «Reto de 30 segundos», y
con el ajuste de accesibilidad activado el niño recibe el extra de su modo sin
haber tenido ninguna cuenta atrás. Nombra el modo, que es siempre cierto.

Y una que sí se ve, pero solo si se mide: Normal empieza en **120**, que son tres
dígitos donde `.reloj__cifra` medía dos. A 320 px eso no lanza ningún error —la
cifra empuja la fila del HUD y se recorta contra el borde—, que es exactamente la
familia de E99-E100. El ancho se calcula ahora contra el modo más largo de la
tabla y lo comprueba E125.

---

## D-3.0.0 · Los cursos de Primaria, la mezcla 80/20 y la promoción (Fase 0)

Se pidió que el juego cubriera de 1.º a 6.º de Primaria, con tres reglas: el
alumno juega en su curso; en torno a un 20 % de las preguntas son de cursos
anteriores, **barajadas** con las demás (confianza sin regalar las fáciles al
principio); y al dominar todo el curso, una felicitación grande anuncia el paso
al siguiente y el perfil sube solo. Esta entrega es la **Fase 0**: la
infraestructura entera más el contenido de 1.º (21 niveles sobre los
generadores existentes). El sentido numérico de 3.º-6.º, y después medida,
estocástico, algebraico y espacial, llegan por fases (el plan completo está en
`docs/plan-cursos.md` si se materializa, y en el plan aprobado de la sesión).

Las decisiones que hay que conocer antes de tocar esto:

- **El catálogo es una tabla POR CURSO** (`CB.catalogo.TABLAS`), no una columna
  nueva: el campo opcional 14 (`saberSecundario`) hace peligroso añadir
  columnas, y las 92 filas de 2.º quedan literalmente intactas. El parser
  estampa `nivel.curso` desde la clave.
- **La beta se interpola por familia×curso, con `BETA_CURSO` (2.º = 0).** La
  interpolación vieja repartía el rango de la familia sobre el TOTAL de filas:
  añadir un nivel recalculaba las betas de todos los demás y desplazaba el
  emparejamiento adaptativo de todos los perfiles guardados, sin que nada
  fallara. E127 congela las 92 betas de 2.º literalmente; si un cambio legítimo
  debe moverlas, se cambia ese guardián a propósito y se anota aquí.
- **El curso vive en la raíz del perfil** (`perfil.curso`, esquema v4), no en
  `ajustes`: los ajustes se copian al crear el siguiente perfil y el hermano
  pequeño heredaría el curso del mayor. `cursosCompletados` es el cerrojo de la
  promoción: una vez por curso, aunque el adulto baje y vuelva a subir.
- **Se declara al crear el perfil y solo el adulto lo cambia después.** El curso
  se DECLARA (dato administrativo); el trimestre se sigue DEDUCIENDO en la
  calibración (§7.2). No son la misma clase de dato y por eso no se preguntan
  en el mismo sitio.
- **La cuota del 20 % se cobra en el relleno del guion, ítem a ítem**, y el
  barajado final de siempre la reparte: no hay «bloque de repaso» al principio.
  El repaso prefiere destrezas vencidas por la curva de olvido, luego niveles
  no superados, luego azar. En 1.º la cuota es cero. E128 mide la proporción
  agregada sobre 50 semillas: [10 %, 30 %].
- **Un prerrequisito de un curso anterior se da por satisfecho** (quien entra
  en 4.º no ha «superado» nada de 3.º dentro del juego); un nivel de un curso
  posterior está bloqueado. Ambas reglas viven en `CB.grafo.estado`, así que
  frontera, cantera y desbloqueados las heredan de una vez.
- **El progreso de mundo se mide sobre los nucleares del curso activo**: sin
  ese filtro, añadir los 21 niveles de 1.º habría bajado de golpe la fracción
  de todos los perfiles de 2.º, con el mismo mapa de repente menos completo.
- **Si el curso siguiente no tiene contenido todavía, dominar el actual es
  maestría, no promoción**: el perfil no salta a un curso vacío. Consecuencia
  asumida: quien domine 2.º antes de que exista 3.º queda anotado en
  `cursosCompletados` y NO será promovido automáticamente cuando 3.º llegue;
  el adulto lo sube a mano. Es preferible a re-celebrar o a auto-promociones
  retroactivas sorpresa.
- **Los jefes escalan por rangos, no por temática** (`CB.jefes.RANGO_CURSO`).
  Pendiente declarado: mecánicas temáticas por curso (división en los jefes de
  4.º, etc.) — que esta línea no deje que se convierta en mentira silenciosa.
- **La vitrina de premios lee el perfil, no inventa datos** (`CB.casa.premios`):
  diplomas de curso, guardianes, récords por modo y logros v1. Lo no ganado se
  enseña cerrado, como los cromos (E136).
