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

## Documento 4 — Las 17 pantallas y sus ids (PLAN §14.3)

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
| 17 | `p-error` | Se ha soltado un bloque | `window.onerror` / `unhandledrejection` |

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
