# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado semántico: la primera cifra sube solo cuando cambia el formato del
perfil guardado, porque eso obliga a migrar `js/01-almacen.js` y es lo único
que puede romperle el progreso a un niño.

La versión de referencia es `CB.VERSION` en `src/js/00-nucleo.js`. La repiten
este fichero, `README.md`, `LEEME.txt` y `package.json`; `dist/sw.js` la lleva
también, pero esa la inyecta gulp y no puede desviarse.
`pruebas/auditar.mjs` comprueba que las cinco coincidan.

---

## [3.4.5] — 2026-08-23

Una auditoría severa con cuatro frentes: identidad de los ítems, paridad del
jefe, contadores que mentían al adulto y minas desarmadas.

### Corregido
- **La identidad del ítem (`expr`) no codificaba todo su contenido en trece
  niveles** (E147/INV13). `serie()` no codificaba cuántos términos (que dependen
  de D, y el último ES la respuesta) — N5, N11, N21; G1–G7 no codificaban los
  nombres de las categorías (en G3 la respuesta es un nombre); A3/A4 no
  codificaban los colores (la respuesta es un color); B9 confundía cuadrado con
  rombo (ambos con 4 lados). Trece cardinalidades re-medidas (10.000 tiradas).
  El enunciado de los problemas y la decoración de los visuales quedan fuera
  a propósito: compartir identidad ahí es lo deseado.
- **El jefe era el tercer sitio de tres, cinco veces** (E148): no anunciaba su
  pregunta a un lector de pantalla (solo el resultado); construía botones sin el
  cerrojo de 800 ms, sin foco, sin «toc» y sin flechas; su tope de distractores
  seguía en el 999 de 2.º (en 5.º-6.º el distractor a+b de reflejo se descartaba
  siempre); la matriz de Brasita se truncaba en 120 bloques cuando 12 × 12 son
  144 (el aria decía la verdad y el dibujo mentía); y dos ramas de Tronquete
  podían compartir rótulo, o valer «15 + 0». Además: barra de sonido en el
  combate (única pantalla sin silencio), la tecla L ya lee la pregunta del jefe,
  el logro de jefe se VE además de oírse, y salir del combate desarma el turno
  pendiente.
- **Tres contadores del panel adulto mentían desde siempre** (E153/E154): los
  bits de pista y audio no tenían productor (el CSV decía «0 pistas, 0 audio» a
  perpetuidad); el booleano de «explicación seguida hasta el final» se enviaba
  y el receptor lo tiraba (0 % eterno); y el ajuste «No puntuar la velocidad en
  los problemas» existía desde 3.0.0 sin que lo leyera nadie — ahora aplica el
  multiplicador fijo de Fácil, solo en problemas y solo si el adulto lo pide.
- **La regla de las 48 h del logro «Veta restaurada» estaba documentada en dos
  sitios y escrita en ninguno** (E149): `hanPasado48h` existía y nadie la
  llamaba (la familia de `marcarLectura`). El predicado completo vive ahora en
  `CB.memoria.vetaConLuz`, capturando la marca de tiempo ANTES de que
  `repasado()` la pise.
- **Minas desarmadas**: `ERRORES_IDS` se congelaba con 24 de 47 códigos (se
  calculaba antes de las altas de 3.1.0–3.4.0) — al final del fichero y con
  guardián E152; `venceHoy` leía `proximoRepaso` cuando los productores
  escriben `proximoRepasoISO` (E155); la tabla `ESCALONES` mentía en 3 de sus
  5 filas y nadie la leía — ahora es la única fuente y `siguienteEscalon` la
  consume (E151); `reglaSimple` (§13.2) leía un campo sin productor y solo
  podía devolver 0 — retirada (D-3.4.5); tres ítems de 19g emitían
  `operacion: '−'` (U+2212) cuando todos los consumidores comparan con el
  ASCII `'-'` (INV14); los códigos J/K declaraban una tarjeta de reparación
  que el niño nunca ve; `explicadorDe` cubría 25 de 26 destrezas.
- **El altavoz «nunca no hace nada» — ahora es verdad** (E150): con «Leer en
  voz alta: No» y una voz española instalada, el botón no hacía nada; ahora
  guía la lectura (resaltar no es sonido). La lectura guiada de la calibración
  resaltaba sobre el nodo oculto de la partida; cada pantalla resalta ya en su
  contenedor. Y la descarga de música tiene el botón «Cancelar» cuya rama de
  resultado existía desde 1.x sin que ningún botón la alcanzara.

## [3.4.4] — 2026-08-23

**El botón «Pista» no daba ninguna pista en 127 de los 308 niveles, y el jefe
no tenía botón de leer.** Dos defectos de la misma forma: una tabla que se
escribió para el juego de un solo curso y no creció con el catálogo, y una
regla puesta en dos sitios de tres.

### Corregido

- `MENSAJES.PISTAS` y `MENSAJES.PROCEDIMIENTOS` tenían 13 de las 26 destrezas.
  En las otras trece —división, fracciones, decimales, porcentajes, enteros,
  medida, tiempo, datos, azar, patrones, álgebra, geometría y espacio— el botón
  contestaba «Léelo otra vez con calma», que no es una pista, y el elogio decía
  «Has resuelto el bloque», que no nombra ningún procedimiento y por tanto no
  enseña nada. Son 127 niveles, todo lo añadido desde 3.1.0. Escritas las 26
  pistas y los 26 elogios que faltaban.
- El altavoz «Leer» se puso en 3.4.2 en la partida y en la calibración, y el
  **jefe** se quedó mudo: sus cuatro mecánicas pintan la pregunta por su
  cuenta. Ahora hay un dueño único, `CB.ui.ponerAltavoz()`, que decide a la vez
  si hay algo que leer y qué se pronuncia; `CB.jefes.turno()` lo llama UNA vez
  para las cuatro mecánicas (extraídas a `CB.jefes.pintarMecanica`), así que
  una quinta que se añada mañana lo hereda sin acordarse de nada.
- La lectura guiada acepta ahora el contenedor donde resaltar, en vez de tener
  clavado `#item-enunciado`: sin eso, el altavoz del jefe habría hablado sin
  resaltar nada para quien no tiene voz española instalada.

### Añadido

- Guardián **E146**: las dos tablas de mensajes se comprueban contra la lista
  CERRADA de destrezas y EN LOS DOS SENTIDOS (nada que falte, nada que sobre),
  como CU8 con los códigos de error, y además se pulsa la acción real del botón
  para las 26 y se comprueba que sale la pista de ESA destreza.
- **E143** recorre ahora los tres pintores de preguntas, con las cuatro
  mecánicas del jefe una por una.

### Cambiado

- `t.igual(slugs.length, 13, …)` derivaba de un número escrito a mano y siguió
  diciendo 13 mientras el catálogo pasaba a 26; ahora deriva de
  `CB.adaptativo.SLUGS.length`, que es la lista cerrada de verdad.
- El guardián de los rangos del jefe hacía `/rangos/.test(String(CB.jefes.turno))`
  y se puso rojo al mover las mecánicas a su propia función, con el juego
  intacto. Reescrito para medir el efecto: los números del jefe de 6.º superan
  a los del de 1.º y los de 1.º se quedan dentro de su fila.

---

## [3.4.3] — 2026-08-23

**Un botón pulsado con el ratón se quedaba plano y hundido para siempre.** La
regla que RETIRA el anillo de foco cuando el foco viene del ratón hacía
`box-shadow: none`, y en este juego el bisel de cada botón ES un `box-shadow`:
el `:focus` de arriba solo pone `outline`, así que ese `box-shadow: none` no
retiraba nada y solo podía destruir el relieve de quien lo tuviera.

Se vio en el altavoz «Leer» porque es el único botón que se queda en pantalla
después de pulsarlo — los demás navegan, se repintan con el ítem siguiente o
desaparecen —, pero la regla es de `*`: **le pasaba a todos**. Comprobado
sembrando el defecto: el botón «Pista» también se quedaba sin bisel tras el
clic, con el de «Sonido» intacto al lado.

### Corregido

- La retirada del anillo del ratón toca solo el `outline`. El anillo del
  teclado no cambia: en los botones lo dibuja el `outline` dorado de 4 px
  —`.btn-bloque` gana a `:focus-visible` por orden de origen, así que la sombra
  de foco nunca llegó a aplicarse ahí— y en los campos de texto sigue igual.
- Guardián **E145**, con sus dos mitades: el efecto en un botón de verdad y la
  regla que está cargada. La segunda es la que caza el defecto sembrado; la
  primera depende de si el navegador cree que el foco vino del teclado, y eso
  no se puede fijar desde una prueba — escrita sola habría estado verde sobre
  un juego roto.

---

## [3.4.2] — 2026-08-23

**Leer la pregunta en voz alta, en TODAS las preguntas.** Hasta aquí el altavoz
🔊 solo lo tenían los problemas de enunciado, con el argumento de que en «6 − 3»
no hay nada que leer; pero entre el problema y la operación pelada están las
otras trescientas preguntas del juego —«¿Qué letra está en la columna 2?», «¿De
qué hay MÁS?», «¿Cuántos ejes de simetría tiene?»—, que son texto puro, y un
niño con dislexia o afasia no podía hacerse leer ninguna. La pantalla de
calibración, que son las cuatro primeras preguntas de su vida, no tenía botón en
absoluto: un comentario del código afirmaba desde hacía versiones que sí.

### Añadido

- El altavoz aparece en toda pregunta que tenga algo que leer, en la partida y
  en la calibración. La regla es «si hay algo que leer, hay botón», no «botón
  siempre»: un ítem que fuera solo dibujo no lo lleva.
- `CB.voz.textoDeItem()`, dueño único de qué se pronuncia. Los signos se dicen
  con palabras — «48 menos 48», «3 por 4», «5 más un hueco igual a 12» — porque
  la síntesis de voz no pronuncia «−», «×», «·» ni «□» de forma fiable y leer
  «48 48» le nombraría al niño una operación que no es la suya. La letra «x» NO
  está en esa tabla: convertiría «¿Cuánto vale x?» en «¿Cuánto vale por?».
- La lectura guiada (el camino de quien no tiene voz española instalada) resalta
  también las consignas de una sola línea; antes no resaltaba nada fuera de los
  problemas y el botón parecía roto justo para quien más lo necesita.
- Los cuatro mundos caben en UNA fila desde 1024 px: `.contenido` consume
  `--ancho-contenido` con el ancho de lectura de 720 px como reserva y el mapa
  declara el suyo. El ancho de lectura no cambia para nadie más.
- Guardianes **E143** (el altavoz, medido montando los pintores reales) y
  **E144** (los cuatro mundos, medidos en un iframe de 1280 px porque una media
  query se evalúa contra el viewport), los dos sembrados con su defecto.

### Cambiado

- E14 afirmaba que la calibración lee **literalmente** su consigna; ahora afirma
  que la lee diciendo el signo con palabras. Lo que defendía —que la calibración
  habla aunque no exista estado de partida— no ha cambiado.

---

## [3.4.1] — 2026-08-23

**Auditoría severa de 3.4.0.** Un arnés adversario (30.000 tiradas por nivel
nuevo, `simular()` de todos los códigos aplicables contra cada ítem, humo de
la tarjeta de reparación y prueba de identidad del `expr`) encontró un
defecto real: el `expr` de K2, K4 y K5 codificaba solo la fila 1 de la
cuadrícula, así que dos ítems con cuadrículas y respuestas DISTINTAS podían
compartir identidad — el anti-repetición de la partida los trataría como el
mismo ítem y el recuento de variedad los infracontaba.

### Corregido

- El `expr` de K2, K4 y K5 lleva ahora el tablero entero; sus cardinalidades
  se re-midieron (7000 · 7000 · 6709) y E142 exige que toda letra del tablero
  esté en el `expr`, para que el defecto no pueda volver sin ruido.

### Auditado sin cambio

- Los `simular()` antiguos de la familia N pueden devolver la respuesta
  correcta en niveles de conteo (E-N-POS sobre N17): inofensivo por
  construcción — el motor de distractores descarta la colisión y el
  diagnóstico solo compara con respuestas erróneas.
- Los aria de la fila de vagonetas, la figura y el gráfico siguen la doctrina
  documentada (el visual canta lo que el ojo ve); no se tocan.

---

## [3.4.0] — 2026-08-23

**Fase 4 de los cursos: el sentido algebraico (bloque D) y el sentido espacial
(bloque C), en los seis cursos.** Con esto el juego declara cubiertos los
cinco sentidos del área. 25 niveles nuevos (catálogo: 308) en cuatro familias
— **U** patrones, **X** álgebra, **J** geometría y **K** espacio — con dos
guiones nuevos (manifiesto 54 → 56): seguir series y descubrir su regla, el
robot de la cuadrícula, igualdades con hueco en las cuatro operaciones y la
incógnita con nombre de letra; figuras planas y polígonos, ángulos recto,
agudo, obtuso y llano, cuerpos geométricos, el tercer ángulo del triángulo,
los grados de la vuelta, posición y coordenadas en cuadrículas, ejes de
simetría, el plano de puntos y la traslación.

### Añadido

- `js/19h-gen-algebra.js` (U1-U6, X1-X6) y `js/19i-gen-espacial.js` (J1-J7,
  K1-K6), con cardinalidades MEDIDAS por un arnés de 10.000 tiradas por nivel.
- Tres visuales DOM nuevos en `30-ui.js`, sin una sola imagen: la figura plana
  (el círculo no se dibuja jamás: el vóxel no tiene curvas), el ángulo de dos
  brazos girados estáticamente (que canta sus grados en el aria) y la
  cuadrícula de letras (que canta cada letra con su columna y su fila).
- 5 códigos de error con su recomendación (47 en total: 36 con `simular()`,
  11 sin diagnóstico): repetir el término de la serie, rellenar el hueco
  sumando los dos números visibles, olvidar un ángulo del triángulo, mover el
  punto en la dirección contraria y leer las coordenadas al revés.
- 13 saberes nuevos en `curriculo-rd157.js` (7 del bloque D, 6 del C), todos
  con nivel; 4 destrezas nuevas (26 en `CB.adaptativo.SLUGS`).
- Guardianes E141 (los visuales espaciales se montan y se miden) y E142 (el
  algebraico y el espacial son inequívocos: series reconstruibles, huecos cuyo
  error nunca es la respuesta, 180 exactos, cuadrículas sin trampa).

### Cambiado

- `CB.LEGAL.ALCANCE` y `bloques.C/D.cubierto` cambian JUNTOS con su guardián,
  como manda la doctrina: el juego trabaja ahora los cinco sentidos y sigue
  sin sustituir al aula.
- Toda pregunta de coordenadas declara su convenio en la consigna — primero la
  columna, después la fila, y la fila 1 es la de abajo — para que la respuesta
  sea inequívoca por construcción (la lección de E140, aplicada al espacio).

---

## [3.3.0] — 2026-08-23

**Fase 3 de los cursos: el sentido estocástico (bloque E), en los seis
cursos.** 19 niveles nuevos (catálogo: 283) en dos familias — **G** datos y
**A** azar — con un guion nuevo (manifiesto 53 → 54): leer gráficos de barras
y pictogramas, sumar y comparar sobre el gráfico, la media, la moda y el
rango, y el azar desde «seguro o imposible» hasta la regla de Laplace y la
frecuencia esperada de un experimento. El **gráfico de barras es un visual
vóxel dibujado en DOM** — un bloque por unidad, una columna por etiqueta,
nada que dependa del color — y canta sus datos en el aria-label (E139). Las
preguntas de azar son **inequívocas por construcción**: «posible» a secas
nunca es opción, los recuentos ganadores son estrictos y las bolsas dicen sus
números con palabras (E140). **`CB.LEGAL.ALCANCE` y `bloques.E.cubierto`
cambian juntos con su guardián**: el juego ya declara que cubre A, B y E y
que NO cubre C ni D. 22 destrezas, 42 códigos de error. El esquema de perfil
no cambia (v4).

## [3.2.0] — 2026-08-23

**Fase 2 de los cursos: el sentido de la medida (bloque B), en los seis
cursos.** 21 niveles nuevos (catálogo: 264) en dos familias — **B** magnitudes
y **H** tiempo — con un guion nuevo (manifiesto 52 → 53): comparar y medir,
conversiones de longitud, masa y capacidad por curso (con coma desde 5.º),
perímetro y área, y la lectura del reloj desde «en punto» hasta los minutos,
más horas↔minutos↔segundos. El **reloj analógico es un visual vóxel dibujado
en DOM** — esfera cuadrada con bisel, manecillas como rectángulos girados con
transform estático (nada se anima) — y canta su hora en el aria-label, como
el conteo canta sus bloques (E137). **`CB.LEGAL.ALCANCE` y
`bloques.B.cubierto` cambian juntos con su guardián**: el juego ya declara
que cubre A y B y que NO cubre C, D ni E. 20 destrezas, 37 códigos de error.
El esquema de perfil no cambia (v4).

## [3.1.0] — 2026-08-23

**Fase 1 de los cursos: el sentido numérico de 3.º a 6.º.** 130 niveles nuevos
(catálogo: 243), cinco familias nuevas — **D** división, **F** fracciones,
**C** decimales, **T** porcentajes, **Z** enteros — en seis guiones nuevos
(manifiesto 46 → 52), con 18 destrezas adaptativas, 35 códigos de error (24 +
11) y los saberes del sentido numérico de 2.º y 3.er ciclo transcritos en
`datos/curriculo-rd157.js`. El teclado gana la tecla de coma y la de signo
(solo cuando el ítem las pide), dimensiona sus cifras por el rango del nivel,
y el anti-azar y los distractores escalan con el curso. Presupuesto de
arranque 400 → 480 KB, documentado (D-3.1.0). El esquema de perfil NO cambia
(v4): por eso es 3.1.0 y no 4.0.0. Deuda declarada: problemas multiplicativos
y transcripción literal de los criterios de 2.º-3.er ciclo.

## [3.0.0] — 2026-08-23

**Primera cifra por su única razón: cambia el formato del perfil guardado.**
`VERSION_ESQUEMA` pasa a 4: el perfil gana `curso` y `cursosCompletados` en la
raíz, y la migración estampa curso 2 a todo perfil anterior (es el único curso
que el juego había tenido nunca). Ningún niño pierde progreso ni récords.

### Añadido — Fase 0 de los cursos 1.º-6.º

- **El curso de Primaria como eje del juego.** El catálogo pasa de una tabla a
  `CB.catalogo.TABLAS`, una tabla POR CURSO con el mismo formato de fila; cada
  nivel lleva `nivel.curso`. Hoy hay dos cursos con contenido: 1.º (21 niveles
  nuevos, N17-N22 · S17-S21 · R15-R18 · P21-P24 · E9-E10, sobre los generadores
  existentes con rangos bajos) y 2.º (los 92 originales, fila a fila intactos).
  Total: **113 niveles**. Los cursos 3.º-6.º llegan por fases (sentido numérico
  primero; después medida, estocástico, algebraico y espacial).
- **El curso se elige al crear el perfil** («¿En qué curso de Primaria está?»,
  con un botón por curso disponible) **y después solo lo cambia el adulto** en
  su panel, tras la puerta parental. La caja de ajustes del adulto aprende
  `raiz:true` para los datos que viven en la raíz del perfil y no en
  `perfil.ajustes` (E131).
- **La mezcla 80/20** (`construirGuion`): en torno al 80 % del guion es del
  curso del perfil y el 20 % de cursos anteriores — repaso barajado con el
  resto, nunca «las fáciles primero». La selección del repaso prefiere
  destrezas vencidas por la curva de olvido, luego niveles no superados, luego
  azar; en 1.º la cuota es cero. Guardián E128: proporción medida sobre 50
  semillas.
- **Promoción con felicitación** (E129): al dominar todos los niveles nucleares
  del curso (la definición de siempre: n≥3 y ≥60 %), el cartel grande anuncia
  «¡Pasas a X.º!», el perfil sube de curso él solo y `cursosCompletados` impide
  que vuelva a dispararse. Dominar el último curso disponible es maestría, no
  un salto a un curso vacío.
- **Techo numérico por curso**: `techoTrimestre` se convierte en
  `techoCurso[curso][trimestre]` (2.º intacto: 199/599/999; 1.º: 20/59/99), con
  el alias viejo apuntando a la fila de 2.º. Única lectura de producción:
  `CB.partida.techoDe(perfil)`.
- **Calibración por curso**: los 4 ítems fijos pasan a `CB.calibracion.BANCOS`
  (el banco de 2.º es el original; 1.º trae el suyo).
- **Jefes escalados por curso** (`CB.jefes.RANGO_CURSO`): las
  cuatro mecánicas leen sus rangos de una tabla por curso; la temática nueva
  por curso queda pospuesta y anotada.
- **La vitrina de premios**, en «Mi álbum»: diplomas de curso, guardianes
  vencidos, récords por modo y los 10 logros de la v1, leídos del perfil — la
  vitrina no inventa datos. Lo no ganado se enseña cerrado, como los cromos:
  una vitrina con huecos dice «esto se puede ganar» (E136).
- La ayuda explica el curso, el repaso, la promoción y la vitrina (E126);
  guardianes E126-E136 en `pruebas/auditar.mjs` y el nuevo
  `pruebas/casos-cursos.js`.

### Estructural

- **Las betas de 2.º no se mueven ni un punto.** La interpolación de `betaBase`
  pasa a familia×curso con desplazamiento por curso (`BETA_CURSO`, 2.º a 0):
  añadir niveles ya no recalcula las betas de los demás cursos. E127 congela
  las 92 literalmente.
- Un prerrequisito de un curso anterior al del perfil se da por satisfecho
  (E134); el contenido de cursos posteriores está bloqueado hasta llegar a él.
- El progreso de mundo se mide sobre los nucleares del curso activo: añadir
  1.º no hizo bajar la fracción de ningún perfil de 2.º.

## [2.0.0] — 2026-08-23

**Primera cifra**, y por la única razón que la sube: **cambia el formato del
perfil guardado**. `VERSION_ESQUEMA` pasa a 3 y `js/01-almacen.js` migra los
perfiles existentes. Ningún niño pierde progreso ni récords.

### Añadido

- **Tres modos de juego** — Fácil (sin reloj), Normal (2 min) y Experto (30 s).
  El eje ya existía con tres valores, pero dos daban los mismos 30 s desde que se
  pusieron planos; §11.4 de `docs/decisiones.md` ya avisaba de que recuperar la
  diferencia era cambiar un número.
- `src/js/2B-modos.js` (fuente 46) — **fuente única** de los tres modos: los
  segundos, los rótulos y las cinco palancas de recompensa. Antes los segundos
  estaban en `40-partida.js` y los rótulos escritos a mano en `99-arranque.js` y
  `41-panel-adulto.js` a la vez.
- **Cinco palancas de recompensa**, mejores y más frecuentes cuanto más corto el
  reloj: una gema extra por acertar a la primera, un punto más de bono de
  rapidez, la probabilidad del bloque raro (3 % / 5 % / 9 %), la del reto bonus
  (15 % / 25 % / 40 %) y un extra de bono final con su rótulo en `p-fin`.
- **Botón de modo en el mapa** (`#btn-modo`): elegir cómo se cava, en la misma
  pantalla donde se elige dónde. También se cambia desde Ajustes y desde la pausa.
- **«Quitar el reloj sin cambiar de modo»** en el panel del adulto: apaga la
  cuenta atrás en cualquiera de los tres modos **sin bajar las recompensas**.
  Necesitar más tiempo no es elegir menos reto.
- `historial` guarda ahora el modo de cada sesión: sin él, el adulto veía
  puntuaciones que no podía comparar entre sí.
- Guardianes **E114-E125**, en `pruebas/casos-modos.js` y `pruebas/auditar.mjs`.

### Cambiado

- La ventaja del modo vive **fuera** de `CB.puntuacion.calcular()`. Los 30 casos
  exactos de §11.7 dan los mismos valores y Fácil conserva su multiplicador fijo
  de 0,85: el antifarmeo de §11.3 y la aserción A3 siguen significando lo mismo.
- `bonoFinal` gana un sexto parámetro **opcional**; sin él devuelve exactamente
  lo que devolvía, que es lo que permite que A6 siga valiendo sin tocarla.
- `.reloj__cifra` pasa de `2.2ch` a `3.2ch`: Normal empieza en 120 y son tres
  dígitos donde la caja medía dos. A 320 px eso no lanzaba ningún error, se
  recortaba contra el borde.
- La pantalla de ayuda explica los tres modos. E124 comprueba que nombra los tres
  y que los tiempos que promete son los de la tabla.

### Corregido

- **La migración de un nombre que significa dos cosas.** `normal` era el modo de
  30 s y ahora es el de 120. Una sola función que intentara ser idempotente y
  migrar a la vez elegía mal en silencio: el niño del viejo «Normal» se quedaba
  en el nuevo Normal —con 90 s de más— y su récord se comparaba contra otro modo.
  Están separadas: `migrarDesdeV2()` corre una vez tras `perfil.version < 3`, y
  `normalizar()` es defensiva y no sabe nada de la migración.

### Migración del perfil (v2 → v3)

Una sola regla la ordena: **a nadie se le acorta el reloj**.

| Antes | Reloj | Después | Reloj |
|---|---|---|---|
| `sinPrisa` | 0 | `facil` | 0 |
| `conCalma` | 30 s | `normal` | **120 s** |
| `normal` | 30 s | `experto` | 30 s |

`mejorPuntuacion` viaja con el mismo mapa: ningún récord se pierde.

---

## [1.23.7] — 2026-08-23

**Tercera cifra.** Las vetas activas, que era lo que 1.23.6 dejó declarado como
pendiente. Sin cambios en el formato del perfil guardado ni en la API `CB.*`.

### Corregido

- **En «Alto contraste» el rótulo de una veta abierta no se leía**: blanco sobre
  arena, 1,55:1, y 3,36:1 sobre la piedra. La veta se pintaba con
  `var(--deco-<tono>)`, y ese tono **no es solo suyo** —pinta biseles, nubes y
  fondos de bioma—, así que la paleta no podía apagarlo sin borrar el relieve del
  juego entero. Cada estado gana ahora una superficie que sí es solo suya,
  `--bg-veta-<estado>`, con el tono del bioma como valor; la paleta de alto
  contraste ya puede apagarla, igual que hizo con `--bg-caja` en 1.23.6. En modo
  normal no cambia ni un color.
- **El texto de estado de una veta abierta se quedaba en 3,24:1** («sin empezar»
  sobre la piedra). La veta declaraba `--texto-sec: var(--texto-secundario)`,
  que es la tinta de un panel crema, no la de su propia superficie. Con el
  principal llega a 4,99:1 en el peor de los cinco estados abiertos.
- Con esto, **cero texto activo por debajo del mínimo WCAG en las 18 pantallas,
  en los dos modos** (antes: 6 nodos en normal y 91 en alto contraste). Lo que
  queda son componentes inactivos —vetas cerradas, cromos y mundos bloqueados,
  términos aún no encontrados—, que WCAG 1.4.3 exime y cuyo gris es el lenguaje
  de «cerrado».

### Pruebas

- **E113** cruza las dos mitades: los seis estados los escribe `CB.memoria`, así
  que todo estado que el JS sabe escribir tiene que tener superficie propia y
  leerse en los dos modos. Pinta las vetas con `CB.mapaDestrezas.pintar()` y va
  cambiando el mismo `data-estado` que escribe el juego cuando el niño avanza; no
  fabrica ninguna veta a mano. Comprueba además que la superficie **no se hereda**
  —un estado sin la suya no pinta nada y coge la de abajo, que es justo el fallo—
  y mide el bloqueado sin exigirle nada, para que no pase por no medirse.
  Verificado sembrando el defecto: 17 comprobaciones en rojo.

## [1.23.6] — 2026-08-23

**Tercera cifra.** Contraste del panel adulto, en los dos modos. Sin cambios en
el formato del perfil guardado ni en la API pública `CB.*`.

### Corregido

- **Las notas que explican por qué un ajuste está desactivado no se leían.**
  «El Real Decreto 157/2022 sitúa la construcción de las tablas en el segundo
  ciclo», y otras cinco, salían a 1,5:1 sobre el blanco de su caja. `.texto--menor`
  consume `var(--texto-sec, var(--texto-sec-claro))` —el contenedor declara, el
  bloque consume, como en 1.23.0— y el panel adulto no declaraba la variable, así
  que caía al respaldo, que es el color pensado para fondo OSCURO. Ahora
  `.pantalla--documento` declara su `--texto-sec` junto al fondo que ya declaraba:
  quien pone el fondo pone la tinta (WCAG 1.4.3).
- **En «Alto contraste» el panel adulto era blanco sobre blanco.** 70 nodos a
  1:1, invisibles; las filas de la tabla a 1,13 y las cabeceras a 1,19. El modo
  reescribe la tinta a blanco y `--bg-texto-panel` a negro, pero no tocaba las
  superficies claras fijas. `--blanco` no podía apagarse —es la luz de todos los
  biseles y de las nubes—, así que la superficie de las cajas se separa en
  `--bg-caja`, y la paleta de alto contraste apaga también `--crema-fila` y
  `--peligro-suave`. Las cabeceras de tabla y la marca del glosario declaran su
  propia tinta sobre el ámbar, como ya hacía `.adulto__aviso`.

### Pruebas

- **E112** no mide variables: monta la caja de ajustes con el módulo que la
  construye, la cuelga de `#p-adulto` —porque es el contenedor quien declara la
  variable— y mide el color calculado de cada nodo contra el fondo que de verdad
  tiene debajo, con y sin alto contraste. La tabla de `PARES` no era falsa: medía
  las parejas que el diseño pretende, y el fallo fue una pareja que nadie declaró.
  Verificado sembrando el defecto: 18 nodos en rojo antes del arreglo.

### Pendiente (resuelto en 1.23.7)

- Las vetas **activas** (`nuevo`, `aprendiendo`) quedan en 3,4:1 y 1,55:1 en alto
  contraste, por la misma causa: superficie de bioma clara y tinta que pasa a
  blanca. Separar «color de bioma» de «superficie de pieza» toca los biseles de
  todo el juego y las 54 capturas de `retrato-pantallas.mjs`, y merece su propia
  versión. Los estados **bloqueados** se dejan como están: son componentes
  inactivos, que WCAG 1.4.3 exime, y su gris es el lenguaje de «cerrado».

## [1.23.5] — 2026-08-23

**Tercera cifra.** Accesibilidad de formularios, controles y foco visible, sin
cambiar el formato del perfil guardado ni la API pública `CB.*`.

### Corregido

- El foco vuelve a verse en TODOS los controles, no solo en los botones.
  `:focus { outline: none }` borraba el anillo de partida y un respaldo escrito
  solo para `button` y `[tabindex]` dejaba fuera los campos de texto: quien
  navega con teclado no sabía dónde estaba. Ahora `:focus` pinta el anillo para
  todo el mundo y `@supports selector(:focus-visible)` lo retira del ratón solo
  donde el navegador entiende esa distinción, en vez de fiarlo a un respaldo que
  además del ratón silenciaba al teclado (WCAG 2.4.7, 2.4.11).
- La puerta parental pedía teclado numérico (`inputmode="numeric"`) para una
  respuesta que siempre es una PALABRA de una frase. El campo acepta texto,
  declara su instrucción con `aria-describedby`, apunta a su mensaje con
  `aria-errormessage`, se marca `aria-invalid` al fallar y recupera el foco; el
  mensaje es `role="alert"`, así que se anuncia solo (WCAG 1.3.5, 3.3.1, 3.3.3).
- Los ajustes —los del niño y los del panel adulto— anunciaban «Sí» o «No» sin
  decir de qué. Cada control toma su nombre de la etiqueta más su propio valor
  (`aria-labelledby`) y expone `aria-pressed`, de modo que un lector de pantalla
  dice «Letra grande, Sí, activado» donde antes decía «Sí» (WCAG 4.1.2).
- El estado de ánimo del final es un `role="group"` rotulado por su pregunta, y
  sus tres caras nacen con `aria-pressed` explícito.

### Pruebas

- Las dos páginas de la suite anuncian su resultado (`role="status"`,
  `aria-busy`) y exponen la barra como `role="progressbar"` con `aria-valuenow`
  real, en vez de una anchura que solo se ve. `comprobar-doble-clic.html` carga
  el bundle minificado —sin él nunca podía comprobar `CB.offline`— y anuncia sus
  dos veredictos.
- **E110** protege el nombre, el estado y el error de los controles: la parte
  que vive en la maqueta y en el SCSS, en `auditar.mjs`; la que genera
  JavaScript, en `pruebas/casos-a11y.js`, montando de verdad los ajustes del
  niño, la caja de ajustes del adulto y un fallo de la puerta parental.
  **E111** protege lo que las propias páginas de prueba deben anunciar.

## [1.23.4] — 2026-08-23

**Tercera cifra.** Reauditoría, correcciones defensivas y modernización de
variables sin cambiar el formato del perfil guardado ni la API pública `CB.*`.

### Cambiado

- Las variables locales usan `const` por defecto y `let` cuando se reasignan.
  Solo permanece `var CB = CB || {};` en la cabecera de los scripts clásicos,
  donde evita la redeclaración del espacio global al concatenarlos.
- ESLint incorpora una regla propia que rechaza cualquier otro `var` y
  `prefer-const` impide conservar un `let` que nunca se reasigna.
- Sass Embedded se actualiza a 1.103.1. La instalación comprueba además que
  `node_modules` coincida con el bloqueo y elimina respaldos opcionales que npm
  deja fuera del árbol activo.

### Corregido

- Los fallos al salir de una pantalla cancelan la transición y llegan al
  capturador global; los errores de un oyente del bus se aíslan antes de
  informarse para evitar bucles. E108 conserva ambos comportamientos.
- El arnés resuelve la música contra `dist/audio/` y E109 exige una respuesta
  HTTP 200 con tipo `audio/mpeg`, en vez de aceptar un elemento apuntando a 404.
- El juego y las dos páginas de pruebas llevan favicon embebido, sin peticiones
  fallidas a `favicon.ico`.
- El anuncio de un bloque raro recibe ahora el cromo antes de construir el
  mensaje. El hoisting de `var` ocultaba siempre el nombre recién obtenido; E69
  ejecuta el flujo completo para impedir la regresión.

### Pruebas

- **864 comprobaciones, 0 fallos** en modalidad rápida y larga, contra los
  bundles legible y minificado, sin excepciones, errores de consola ni
  respuestas HTTP fallidas.

## [1.23.3] — 2026-08-23

**Tercera cifra.** Refactorización y endurecimiento del JavaScript sin cambiar
el formato del perfil guardado ni la API pública `CB.*`.

### Cambiado

- El JavaScript cuenta con una puerta de calidad reproducible mediante ESLint,
  integrada en `npm run estilo` y en `npm run entregar`. Comprueba errores
  semánticos y limita complejidad, profundidad, tamaño y anidamiento sin romper
  el contrato ES2017 clásico del bundle.
- El validador de problemas y el panel adulto se dividen en funciones con una
  sola responsabilidad y nombres explícitos. La API pública `CB.*` y el formato
  del perfil permanecen intactos.
- Las herramientas y pruebas eliminan variables muertas, escapes innecesarios y
  retornos accidentales desde ejecutores de promesas.
- Los comentarios JavaScript se reducen del 25 % al 10 % del código: quedan
  contratos, invariantes, seguridad y títulos breves; el relato histórico sigue
  centralizado en este registro y en `docs/decisiones.md`.
- `gulp dev` deja de depender de BrowserSync: dos servidores HTTP pequeños,
  construidos con Node, sirven el juego y las pruebas con `no-store`, recarga
  por eventos y protección frente a recorridos de ruta.
- El requisito de desarrollo pasa a Node 20.19 o posterior, compatible con la
  puerta de calidad JavaScript actual.

### Corregido

- La limitación del almacenamiento local ya no aparece duplicada en la sección
  de datos del panel adulto; E107 impide que vuelva a repetirse.
- Los callbacks diferidos de partida, jefes, componentes y calibración comprueban
  que el estado y el ítem siguen vigentes. Ya no pueden modificar una partida
  nueva ni lanzar una excepción después de abandonar la anterior; E106 cubre
  esta carrera.
- El ejecutor de pruebas convierte `error` y `unhandledrejection` en fallos de la
  suite, evitando un resumen verde cuando una excepción asíncrona queda fuera de
  una prueba.

### Seguridad

- Se elimina BrowserSync y su árbol de dependencias. Las cinco vulnerabilidades
  altas detectadas en la auditoría de paquetes quedan en cero, incluido el
  parche de `nanoid`.

### Pruebas

- **854 comprobaciones, 0 fallos** en modalidad rápida y larga, contra los
  bundles legible y minificado, sin excepciones ni errores de consola.

## [1.23.2] — 2026-08-22

**Tercera cifra.** Limpieza de la arquitectura Sass y de la documentación; no
cambia el formato del perfil guardado ni el funcionamiento del juego.

### Cambiado

- **Namespaces Sass explícitos**: las variables se importan como `v` y los
  mixins como `m`; todos los `@include` indican ahora de qué módulo proceden.
- **Parciales SCSS sin prefijos numéricos**: `_fuentes.scss`, `_base.scss`,
  `_animaciones.scss`, `_componentes.scss`, `_pantallas.scss`, `_biomas.scss`,
  `_adulto.scss`, `_imprimir.scss` y `_forzado.scss`. El orden sigue perteneciendo
  exclusivamente a `manifiesto.json`, no al nombre de los ficheros.
- **El módulo de mixins se llama `_mixins.scss`** en código, vigilancia, huellas,
  auditorías y documentación.
- La documentación operativa y las notas de licencia apuntan a las rutas
  actuales y declaran la versión vigente.

### Eliminado

- **`docs/plan-mejoras-1.8.0.md`**, un plan ya ejecutado que duplicaba el registro
  estable de `CHANGELOG.md` y `docs/decisiones.md`; permanece recuperable en el
  historial de Git.

---

## [1.23.1] — 2026-08-22

**Tercera cifra.** Reorganización interna de Sass y documentación; no cambia el
formato del perfil guardado ni el funcionamiento del juego.

### Cambiado

- **SCSS organizado por responsabilidad**: `app.scss` sustituye a
  `cubomatica.scss` como único punto de entrada y los parciales pasan a
  `abstracts/`, `base/`, `components/`, `layout/`, `pages/`, `themes/` y
  `utilities/`. El orden de la cascada continúa declarado por
  `manifiesto.json` y se comprueba contra el disco y los `@use`.
- **`abstracts/_variables.scss` es la fuente única de variables globales.**
  Reúne mapas de materiales, cielos, biomas, estados, puntos de ruptura, la
  lista de movimiento reducido y las propiedades personalizadas globales. Las
  variables temporales de mixins y las propiedades privadas de componentes
  conservan su alcance local.
- **Comentarios SCSS reducidos a decisiones útiles**: 2.915 líneas pasan a
  1.829. Los 40 comentarios restantes usan `//`, explican restricciones no
  evidentes y no se publican dentro del CSS compilado. El historial extenso se
  mantiene en `docs/decisiones.md`.
- **El modo de desarrollo vigila la estructura nueva.** `npm run dev`,
  `npx gulp watch` y `npx gulp` permanecen activos; observan los diez parciales
  del manifiesto, `app.scss` y `_herramientas.scss`.

### Corregido

- La auditoría y el comprobador de `dist/` recorren las carpetas SCSS de forma
  recursiva. La regla de color exige ahora que los literales se declaren solo en
  `_variables.scss`.
- `package-lock.json` deja de declarar la versión obsoleta 1.22.0 y vuelve a
  coincidir con el paquete y la aplicación.
- README y LEEME reflejan la estructura actual, el modo vigilancia y la descarga
  de arranque medida: 368 KB.

---

## [1.23.0] — 2026-08-22

**Segunda cifra.** La hoja de estilo pasa a tener una sola gramática, y la
comprueba una herramienta en vez de la memoria de quien escribe. **No cambia un
solo píxel**: las 54 fotos de las 18 pantallas a tres anchos son idénticas antes
y después. El perfil guardado no cambia.

### Cambiado

- **28 clases renombradas a BEM** (`pruebas/mapa-bem-2.json` es el acta, con el
  motivo de cada una). La familia grande son elementos que llevaban nombre de
  bloque, y en varios casos la jerarquía se insinuaba con plural/singular, que es
  una convención que solo existía en la cabeza de quien la escribió:
  `luz` → `luces__luz`, `paso-reparacion` → `reparacion__paso`,
  `cara-animo` → `animo__cara`, `zona-superior` → `zona-juego__alta`.
- **`.pieza__cifra` deja de ser un elemento huérfano.** No existía ningún bloque
  `.pieza`; los bloques eran `.moneda` y `.billete`, que son la misma pieza con
  otra fotografía. Ahora son `.pieza--moneda` y `.pieza--billete`, y la regla que
  compartían por enumeración es el bloque.
- **`.texto-menor` y `.texto-lectura`** pasan a `.texto--menor` y
  `.texto--lectura`; **`.operacion`** a `.enunciado--operacion`.
- **Siete selectores de descendencia entre bloques, fuera.** `.panel-bloque
  .texto-menor` y sus hermanos hacían que un bloque cambiara de aspecto según
  quién lo contuviera, que es justo lo que un bloque no puede hacer. Ahora el
  contenedor **declara una variable** (`--texto-sec`) y el texto la consume con
  un valor por defecto: funciona con contenedores que aún no existen y no depende
  del orden de la cascada. Lo mismo con el tamaño de las criaturas en la pantalla
  de juego (`--lado-criatura`).
- **Cero estilado por etiqueta dentro de un bloque**: `.armadura-jefe > b`,
  `.galeria-avance > b`, `.manojo-decena > b` y `.barra-progreso-mundo > i` pasan
  a ser elementos con nombre. Una etiqueta no es un nombre: cambia por
  accesibilidad o por maquetación y se lleva el estilo por delante.
- **Cuatro duplicaciones a mixin**: la fila que envuelve y se centra (estaba
  copiada **siete** veces), la ocultación visual (dos), el par de colores del
  control apagado (tres) y el freno de movimiento reducido (dos contextos, la
  misma forma que tenía E25 antes de romperse).

### Añadido

- **`docs/convencion-bem.md`**: las nueve reglas con su motivo, qué comprueba
  cada herramienta y **qué no comprueba ninguna**, y el orden en que se renombra
  una clase sin romper nada.
- **stylelint** (`npm run estilo`) con la gramática BEM en un regex propio, y
  cada regla apagada con su motivo escrito al lado en `stylelint.config.mjs` —por
  eso es un `.mjs` y no un `.json`: un `"regla": null` sin explicación es
  indistinguible de un descuido. La notación de rango en `@media` y el `:not()`
  complejo se quedan apagados porque son Safari 16.4 y el suelo declarado es 15.4.
- **E104** (bloque 9 de la auditoría): stylelint comprueba la **forma** de cada
  nombre. **E105**: cero descendencia entre bloques en el CSS compilado, con la
  lista blanca declarada —los cuatro estados de `:root` y el selector estructural
  de `_06-biomas.scss`—. Los dos verificados sembrando la violación.
- **`herramientas/retrato-pantallas.mjs`**: conduce Chrome por CDP, entra en las
  18 pantallas a 320, 768 y 1200 px y guarda el sha256 de cada foto. Es lo único
  que puede demostrar que un renombrado no cambió nada de lo que se ve. Va con
  las cachés apagadas —el juego registra un service worker en cuanto no está en
  `file://`— y con perfil de Chrome nuevo en cada pasada.
- **`herramientas/volcado-css.mjs`**: la hoja compilada, declaración a
  declaración. Con `--mapa` aplica los renombrados al volcado anterior y exige
  que dé exactamente el nuevo, que es el criterio con el que se cerró el
  renombrado de 1.7.0.

### Corregido

- **Tres comprobaciones que se ponían verdes solas.** `casos-contraste.js`
  saltaba en silencio los selectores que no encontraba —ocho clases con texto que
  son obligación legal—, `casos-a11y.js` daba por buena una barra de herramientas
  ausente y `casos-fuente.js` medía la tipografía del `body` cuando `.enunciado`
  no existía. Las tres se arreglaron **antes** de renombrar nada; si no, el
  renombrado las habría apagado sin que nadie se enterara. La primera cazó dos
  clases el mismo día.
- **El bloque 8 daba verde sin `dist/`.** Sin CSS compilado, el cruce de clases
  salía con código 0 y la auditoría escribía «cero clases muertas» sin haber
  cruzado nada. Con `--estricto` ahora es rojo.
- **El mensaje de fallo de E103 mentía**: decía «el marco no ha cargado» cuando
  el marco había cargado y lo que faltaba era un elemento de su maqueta. Un
  mensaje que miente cuesta más que no tenerlo.

### Presupuestos

- **Tres cubos, no dos**: `herramientas/` deja de contar como fuente compilada y
  tiene el suyo (< 100 KB). No se compila ni se entrega: es utillaje de
  verificación, de la misma naturaleza que `pruebas/`. Contarlo con `src/` hacía
  que comprobar más pareciera que el juego había engordado. El techo que protege
  a quien juega sigue siendo el de la descarga de arranque, < 400 KB.

---

## [1.22.0] — 2026-08-22

**Segunda cifra.** Una pantalla nueva, la decimoctava: **Ayuda**. El perfil
guardado no cambia.

### Corregido

- **A 320 px una palabra larga no se partía: se salía de su panel** (E102). Sin
  barra, sin error y sin nada que se pusiera rojo, igual que E99-E100 un nivel
  más afuera. «expedición», «guardianes» o «Cubomática» no caben en los ~145 px
  que deja una línea dentro de un panel a ese ancho. Se permite partir la
  palabra —solo por debajo de 480 px, solo cuando no cabe— y la lista devuelve
  la mitad de su sangría.
- **La fila de abajo de la portada era inalcanzable a 320×480** (E103), y lo era
  desde antes de que este botón la hiciera de cuatro. `.pantalla--portada` es
  `overflow: hidden` a propósito —las nubes y el cielo van fuera de flujo y
  sacarían barras por decorado—, así que lo que no cabía a lo alto no se
  alcanzaba de ninguna forma. La barra la lleva ahora `.pila-centro`, con la
  alineación `safe` de E95 en los dos ejes.
- Los dos guardianes **miden dentro de un `<iframe>` de 320 px**, no en una caja
  de 320 px: el arreglo vive en `@media (max-width: 479px)` y una media query se
  evalúa contra el viewport, así que el truco de E99-E100 habría medido el
  estado roto creyendo que medía el arreglado. El marco va `position: fixed`
  porque `body` es un flex y un iframe suelto es un ítem flexible cuyo alto se
  reasigna —midió 150 px—, y antes de medir nada se comprueba que el marco mide
  320 y que la hoja se aplicó dentro.

### Añadido

- **Pantalla de Ayuda (`p-ayuda`)**, con botón propio en la portada y en el mapa.
  Cuenta el juego entero —qué es, cómo se responde, las tres luces, el reloj de
  arena, las gemas, los cuatro botones de la barra, qué pasa al fallar, los
  cuatro mundos y sus guardianes, el descanso, el álbum, el diccionario, los
  perfiles, los ajustes, la cantera tranquila, las teclas y la llave del panel
  de personas adultas— **escrito para quien juega**: frases cortas, palabras de
  2.º de Primaria y una idea por línea. Lo que hasta ahora solo estaba en
  `README.md`, que un niño de siete años no abre.
- El juego pasa de **17 a 18 pantallas**. El número es contrato en cinco sitios
  —`CB.pantallas.IDS`, `CB.musica.PANTALLAS`, `casos-carga.js`, `casos-a11y.js`
  y el bloque 5 de `auditar.mjs`— y los cinco se han cambiado a la vez y a
  propósito.
- **E101**: la ayuda es maqueta estática, así que la vigila la **auditoría** y no
  la página de pruebas, que solo vería su maqueta reducida comprobándose contra
  sí misma. Comprueba que la pantalla exista con su `<h1>` y su salida, que
  algún botón lleve a ella, y que los cuatro mundos que nombra sean exactamente
  los que declara `js/17-catalogo.js`: renombrar un mundo y dejar el nombre
  viejo en la ayuda no da ningún error, solo deja al niño leyendo un mapa que ya
  no existe.

---

## [1.21.0] — 2026-08-22

**Segunda cifra.** La pantalla de la expedición se reparte en dos columnas
cuando hay sitio, y con la auditoría de maquetación que vino detrás salieron seis
recortes, todos anteriores a esta versión. El perfil guardado no cambia.

### Desde 1200 px, el enunciado a la izquierda y la respuesta a la derecha

En vertical el reparto arriba/abajo es el bueno: el pulgar llega al tercio de
abajo y la pregunta queda a la vista por encima. En un portátil, un proyector o
una pizarra ese mismo reparto deja dos franjas de aire a los lados y obliga a un
barrido vertical largo entre la pregunta y el teclado, que es justo el recorrido
que el niño repite en cada ítem.

Puestos en fila caben de un golpe de vista, y el enunciado deja de competir por
la altura con la última fila del teclado.

Las dos mitades **se arriman al centro** en vez de centrarse cada una en la suya:
con las dos centradas, en 1440 px el enunciado quedaba a 360 y el teclado a 1080
—setecientos píxeles de barrido, más de los cuatrocientos que había en vertical—
y se habría cambiado un recorrido largo por otro más largo.

Va por ANCHURA y desde 1200, siguiendo la regla de los dos ejes: la anchura
decide cuántas columnas, la altura decide el lado del botón. Por debajo de 1200
el sitio es de una tableta apaisada, que se sujeta con las dos manos, y ahí el
alcance del pulgar sigue mandando sobre el barrido de la vista. La cinta, el
cartel y el cielo no se enteran del cambio: están fuera del flujo.

### Auditoría de maquetación: tres fallos más, todos anteriores a esta versión

Se midió la pantalla de la expedición en quince tamaños de ventana, de 320×420 a
2560×1440, cruzados con «Letra grande» y «Modo proyección». Los tres fallos que
salieron estaban en verde en todo lo que se mira hoy, y ninguno se ve leyendo la
hoja de estilos.

**El modo proyección se saltaba el reparto de los dos ejes (E96).** Escribía
`--lado-respuesta: 150px` directamente, que es el *resultado* del `min()` entre
lo que pide la anchura y lo que permite la altura. En un proyector de 1200×700 el
teclado 3×4 a 150 px no cabe: la fila del OK quedaba fuera de la zona de juego.
Ahora escribe los dos ejes. Y como `:root.modo-proyeccion` le gana a `:root` por
**especificidad** —no por orden—, los tres escalones de altura nombran también la
clase; sin eso, ningún techo posterior podía bajarla. La nota de
`_variables.scss` que decía «gana el orden de origen» vale entre selectores de
la misma especificidad, y en cuanto uno lleva clase deja de valer.

**Las seis columnas se pedían por altura sin mirar la anchura (E97).** La
excepción documentada —«en 660 px de alto el 3×4 no cabe, se despliega a 6×2»—
no comprobaba que hubiera sitio a lo ancho: seis columnas de 64 px con sus huecos
son 424 px, y en un móvil de 360×640, que entra por altura, dos columnas se
salían por la derecha sin barra que las alcanzara. Ahora la excepción pide además
480 px de ancho.

**Y donde el teclado no cabe, ahora se alcanza (E98).** El suelo de 64 px por
tecla no se negocia, así que hay ventanas soportadas —320×480; el aviso de «gira
el aparato» solo salta por debajo de 320×420— donde el teclado más su visor no
caben de ninguna manera. Ahí el OK quedaba casi cien píxeles por debajo del borde
y no había forma de llegar a él: la pregunta no se podía contestar. La zona de la
respuesta lleva ahora barra, como la del enunciado, con la misma alineación
`safe`. Lo mismo pasaba con el modo proyección encendido en cualquier móvil.

Tras el arreglo, los quince tamaños × cinco combinaciones no pierden nada por
ningún borde, no solapan y no obligan a desplazar la página a lo ancho.

Recorridas después las **diecisiete pantallas** en cinco tamaños, aparecieron dos
recortes más, los dos en 320 px de ancho —tamaño soportado— y los dos silenciosos,
porque no provocaban barra horizontal ni error: simplemente se cortaban contra el
borde.

**El título de la portada salía descabezado (E99).** «CUBOMÁTICA» en la
tipografía de píxel, más sus dos rellenos, mide 337 px: ocho por cada lado fuera
de la pantalla. Se arregla dejando que se parta y ajustando el relleno lateral en
la anchura más estrecha, **no** fijando un tamaño de letra para móviles: el
tamaño lo mandan «Letra grande» y el modo proyección, y un número escrito a mano
ahí habría anulado los dos ajustes justo donde más falta hacen.

**El botón de Sonido quedaba cortado (E100).** Los cuatro controles de la barra
—Pista, Salir, Pausa, Sonido— no caben en una fila de 320 px, y el último se
salía nueve píxeles. Es el único que apaga la música. La barra pasa a dos filas
antes que encoger botones por debajo del suelo de 64 px.

También se quitó un ternario sin efecto en el panel del adulto
(`CB.perfil ? 'p-portada' : 'p-portada'`), que no cambiaba nada pero sugería una
intención perdida.

### La zona del enunciado escondía las primeras líneas, y no era de ahora

`.zona-superior` era a la vez caja centrada y caja con barra de desplazamiento.
Mientras el contenido cabe, `justify-content: center` lo centra y no pasa nada;
en cuanto **no** cabe —un problema con enunciado largo más el mensaje de
resultado, que tiene un suelo de tres líneas— el centrado reparte el sobrante a
los dos lados, y lo que se sale por arriba no se puede recuperar de ninguna
manera, porque `scrollTop` no puede ser negativo. El enunciado se veía cortado
por la primera línea y la barra solo llevaba hacia abajo.

Se arregla con `safe center`, la palabra clave que existe para esto: centra
mientras quepa y se porta como `start` en cuanto desborda. Va en **los dos ejes**
—con `overflow-y: auto` el eje horizontal pasa también a `auto`, así que una fila
de piezas de dinero más ancha que la columna se recortaba por la izquierda por el
mismo motivo— y también en la alineación al centro del reparto nuevo, que es otra
alineación posicional y recortaba igual.

El guardián (E95) **no lee el CSS**: `getComputedStyle` diría «safe center» y
quedaría verde aunque el navegador no lo aplicase. Mide lo único que le importa a
quien juega: con la barra arriba del todo, si se ve la primera línea. Y comprueba
lo contrario, que cuando cabe se sigue centrando, para que el arreglo no pueda
ser «alinear siempre arriba», que quita el recorte quitando la maquetación.

---

## [1.20.1] — 2026-08-22

**Tercera cifra.** Un botón que no hacía nada. El perfil guardado no cambia.

### El «Salir» del mapa no salía a ninguna parte

`CB.pantallas.atras()` sacaba **una** entrada de la pila; si resultaba ser una
pantalla de flujo —partida, jefe, descanso, reparación, error— la descartaba y
caía al destino de reserva, que con perfil activo es el mapa. Estando ya en el
mapa, eso es repintar la misma pantalla: el botón parecía muerto, sin error en
consola y sin nada que ver.

No era un rincón raro, era **el camino normal del juego**. Portada → mapa →
expedición → fin → SALIR deja la pila en `[p-portada, p-mapa]` con el mapa
delante, porque `atras()` no apila; el siguiente Salir se sacaba el mapa a sí
mismo. Lo mismo al volver del jefe, que va a `p-mapa` por su cuenta, y al
abandonar una expedición a medias.

Ahora `atras()` descarta **todas** las entradas que no sirven —las de flujo y la
propia pantalla actual— y solo cuando la pila se agota recurre a la reserva, que
para el mapa es la portada y nunca él mismo. `p-fin` entra en la lista de
pantallas sin vuelta por el mismo motivo que las demás: es el resumen de una
expedición que ya terminó.

### Y de paso, salir dejaba de ser accesible

`atras()` tenía copiados a mano el barrido de `hidden`, el aviso al bus y —desde
1.19.0, dos versiones tarde— el manejador de salida. Lo que **no** tenía era el
foco en el `<h1>`, el `aria-labelledby` de la sección ni el `role="main"`, que
`ir()` sí pone. Salir con «Salir» dejaba el foco en un botón ya oculto y la
pantalla nueva sin nombre accesible; entrar con `ir()` hacía las dos cosas bien.
Ahora `atras()` calcula el destino y **delega en `ir()`**, con un cerrojo
(`_volviendo`) que impide apilar la pantalla que se abandona: sin él, atrás se
convierte en adelante y dos «Salir» seguidos se quedan dando vueltas entre dos
pantallas.

Guardián: **E94** en `pruebas/casos-regresiones.js`, siete comprobaciones sobre
la conducta —dónde se acaba— y no sobre la implementación.

---

## [1.20.0] — 2026-08-14

**Segunda cifra.** El dinero se ve. El perfil guardado no cambia.

### Las monedas y los billetes eran cuadrados de colores

El saber A.5 del RD 157/2022 pide reconocer las monedas de 1 y 2 euros y los
billetes. Lo que había para reconocerlas era un cuadrado dorado con un número
dentro y cinco rectángulos que se distinguían por el ancho. Se puede sacar el
nivel entero leyendo el número del enunciado y buscando ese número, sin haber
mirado nunca una moneda — que es exactamente lo que el nivel dice que enseña.

Ahora son **doce fotografías** en `dist/img/`, 64 KB entre todas:

- las cinco monedas de céntimo, las dos de euro y los cinco billetes;
- **cada una a su tamaño real**, a escala (3,1 px/mm las monedas tomando la de
  1 € como ancla, 0,85 px/mm los billetes). De ahí sale gratis que el billete
  crezca con el valor y que la moneda de 10 céntimos sea más pequeña que la de
  5, que es verdad y es la trampa que tiene el dinero de verdad;
- la **cifra baja a una cinta propia** debajo de la imagen en vez de ir encima:
  sobre una fotografía no se lee, y sobre una fotografía tampoco hay contraste
  que medir. Sigue siendo del DOM, así que sigue creciendo con «Letra grande».

El motivo por el que hasta hoy se dibujaban en SVG —«la auditoría no admite un
solo binario»— era cierto como regla y falso como restricción técnica: una imagen
es un subrecurso, igual que la hoja de estilos, y `file://` la abre sin pedir
nada a la red. Lo que las prohibía era una línea del bloque 4 de `auditar.mjs`.
Se abre igual que se abrió para la música: **lista cerrada, comprobada en los dos
sentidos, y cada pieza tiene que estar declarada Y consumida en el CSS**. Todo lo
demás sigue prohibido.

Las doce entran en el armazón del service worker. La música no: son 64 KB contra
42 MB, y un juego sin red que se queda mudo sigue siendo el juego.

### Y ya se puede preguntar por los céntimos

La ampliación de céntimos existía desde 1.0.0 y solo sabía preguntar cuántas
monedas de 20 hacen un euro, que es una división. Con las cinco fotografías, E8
gana la otra mitad —**reconocer la moneda**— y en el primer nivel es la única que
sale, porque dividir entre 20 ahí todavía no toca.

### E93 · la moneda de 5 céntimos y el billete de 5 € eran el mismo «5»

Los cuatro valores de céntimo chocan con los cuatro billetes. Con un solo número
por pieza, «toca la moneda de 20 céntimos» se habría pintado con la foto del
billete de 20 € y se habría dado por buena tocándolo. Las piezas de céntimo se
nombran `'c20'`, y eso abre el fallo simétrico: `Number('c20')` es `NaN`, así que
la pregunta se falla siempre, incluso acertando. Guardián en
`casos-regresiones.js`, con partida de verdad y comprobado sembrando el fallo.

## [1.19.0] — 2026-07-29

**Segunda cifra.** Suena la tecla, y suena UNA vez. El perfil guardado no cambia.

### Con el teclado se jugaba en silencio

Se puede jugar una partida entera solo con el teclado —es criterio de HECHO de F8, no una
comodidad—, y esa partida se jugaba muda. Las cifras sí sonaban, porque el «picar» lo pone
el componente; pero **Enter, Escape, el Tab, las flechas que mueven el foco por la rejilla,
la L de leer y la P de pista no sonaban nunca**, y fuera de las tres pantallas de juego no
sonaba ninguna tecla, porque el manejador de teclado devuelve pronto. Quien juega con el
teclado —que casi siempre es quien no puede usar el dedo— tenía la mitad de la confirmación
que tiene el resto.

Ahora toda tecla suena, con el mismo clic corto y flojo de los botones. Cuatro cosas no son
un gesto sobre el juego y siguen calladas: la **autorepetición** (un dedo apoyado dispara
treinta teclas por segundo, y eso sonaría a ametralladora), los **modificadores solos** y
los **atajos del navegador**, **escribir en un campo** —el único es la puerta parental, y
ahí la confirmación es el carácter, que se ve— y **Enter o Espacio sobre algo activable**,
porque el navegador ya los convierte en un clic de verdad.

### El clic tapaba justo el sonido que decía algo

Buscando dónde colocar el sonido de las teclas apareció que el de los botones, que se
entregó en 1.18.0, sonaba **dos veces** en el sitio que más se usa: escribir una cifra daba
el «picar» del teclado *y* el clic encima, y borrar daba el «toc» *y* el clic. La regla
estaba escrita desde el primer día —«un clic que se añade encima de un sonido que ya dice
algo no informa, tapa»— pero se aplicaba con una lista de tres excepciones escrita a mano, y
la lista nació corta. Es la familia de fallos que este proyecto ya conoce: una regla buena
aplicada en tres sitios de cinco.

Ya no hay lista. `CB.audio` cuenta las peticiones de sonido, y el clic genérico —de botón o
de tecla— **se pide al final del gesto y solo si el gesto ha sido mudo**. Cualquier
componente que gane voz propia mañana queda cubierto sin tocar nada. Queda una sola
excepción escrita, la única que el contador no puede ver porque su sonido llega en otro
evento: el botón deshabilitado, que durante los 800 ms de construcción ya tiene su «toc» de
madera, y ese dice lo contrario —«aún no»—.

### Y cualquier gesto abre el audio, no solo JUGAR

El contexto de Web Audio nace suspendido y solo lo despierta un gesto del usuario. Los dos
únicos sitios que lo despertaban eran los botones **JUGAR** y **CANTERA TRANQUILA**, así que
quien empezaba tocando «Ajustes», «¿Quién juega?» o el panel del adulto —o quien navegaba
con el teclado— no oía **nada** en los primeros toques de la sesión, que son justamente los
que enseñan que el juego responde. Se abre ya con cualquier toque o tecla. Un evento
sintético no abre nada: el navegador no lo permitiría, y de paso la página de pruebas, que
dispara veintitantos clics de mentira, sigue muda.

### Comprobado

- **792 comprobaciones**, 0 fallos, en las dos páginas —legible y minificada—. Eran 773.
- Auditoría en verde, 59 de 59.
- **E91** deja de enumerar excepciones y pasa a montar el **teclado de verdad** para pulsar
  su tecla: el fallo estaba ahí, no en un botón inventado. **E92** es nuevo.
- Los tres guardianes se han validado **volviendo a sembrar el fallo**: con el clic
  inmediato salen en rojo las cuatro comprobaciones del sonido doble (`"pulsar,picar"`
  donde se espera `"picar"`); anulando `esActivable` y `esCampo`, las tres del teclado.
- En el juego real: Tab desde la primera pantalla suena y abre el audio, Enter sobre un
  botón suena una vez, la cifra da un «picar» y el ⌫ un «toc».

## [1.18.0] — 2026-07-29

**Segunda cifra.** Dos cosas que se preguntaban y una que se cazó por el camino. El perfil
guardado no cambia.

### En el juego se sabe cuánto queda y no en qué se está

El HUD contaba las luces, los bloques cavados y los segundos. En **qué** se está —qué se
está practicando— no lo decía nadie. Una expedición encadena hasta veinte ítems de siete
vetas distintas, **barajados**, y el nombre de la veta solo aparecía en la Cantera, dos
pantallas atrás y antes de empezar. Visto desde la silla, la pregunta cambiaba de tema sin
causa cada pocos ítems.

Ahora hay un **rótulo de veta** bajo el HUD: el mundo en versalitas y el nombre de la veta
en la tipografía de lectura. Se repinta en cada ítem. Por debajo de 480 px el nombre del
mundo se aparta con las declaraciones de `.solo-lectores` —no con `display: none`— para que
no salga del árbol de accesibilidad: quien usa lector de pantalla no puede tener **menos**
información en la pantalla estrecha que en la ancha.

### «¡Nivel superado!», y sin mentir

Al cerrarse una veta y empezar otra, una **cinta** —el vehículo del «Hurry up!»— cruza con
el grito `¡Nivel superado!`, y el mensaje quieto dice cuál se ha terminado y cuál empieza.
Reparto de siempre: la cinta cruza en 1,4 s y ahí no cabe nada que haya que leer.

Lo que costó trabajo no fue mostrarlo, fue que fuese **verdad**. Con el guion barajado, una
veta que se deja atrás puede volver por tres caminos, y hay que descartar los tres:

1. que le queden ítems por servir en el guion;
2. que deba un repaso, porque un ítem fallado dos veces vuelve entre 3 y 5 ítems después;
3. que se le agotara el tiempo — el único que **no deja rastro en ninguna cola**, y por eso
   hay ahora un mapa de vetas sin cerrar.

`quedanDeLaVeta()` cuenta **de más** a propósito: una reinserción consume el hueco de un
ítem del guion, así que el número es un techo. De los dos errores posibles solo uno es
aceptable — callarse una vez, nunca cantar «superado» y volver a servir esa veta tres ítems
después.

**El barajado no se toca.** Agrupar el guion por vetas habría hecho literal lo de «pasar de
nivel», pero la práctica intercalada retiene mejor que la agrupada: eso es cambiar la
pedagogía para que cuadre la maqueta.

### «Toca la moneda de 2 euros» se acertaba buscando el 2

`15-gen-dinero.js` abre diciendo que monedas y billetes son conjuntos separados y que «el
juego los distingue siempre visual y verbalmente». Lo cumplía al pagar y al contar, donde la
pieza se dibuja —el cuadrado de oro, el rectángulo verde—, y **no** lo cumplía en E1, que es
la única pregunta cuyo objeto es distinguirlos: las cuatro opciones salían como cuatro
botones de madera idénticos con un número dentro.

Dicho al revés: se podía sacar el nivel entero sin haber mirado nunca una moneda. Ahora las
opciones **son** las piezas, con su forma y su tamaño, y con el nombre completo —«la moneda
de 2 euros»— como nombre accesible, no el «2 €» que llevan escrito.

### Dos números con un nombre, en el propio guardián

E47 declaraba `TOPE = 45` y comparaba contra un `30` escrito a mano unas líneas más arriba.
Leído deprisa parece una constante muerta; unificarlo pone rojo el cartel del logro, que se
declara al 38 % y ahí está bien. **Son dos reglas distintas**: un fotograma que se mueve no
puede bajar del 30 % —taparía el teclado justo cuando se va a tocar—, una colocación fija
puede llegar al 45 %. Ahora se llaman `TOPE_FOTOGRAMA` y `TOPE_COLOCACION`.

Y E47 se ganó el sueldo por el camino: la primera versión de la coreografía `cinta-sube`
entraba desde el 180 % y se paraba en el 120 y en el 60, es decir, se sentaba encima del
teclado durante más de medio segundo. La paró antes de llegar a la pantalla.

### Las siete piezas de dinero eran dos rectángulos

Un cuadrado de oro para las dos monedas y un rectángulo verde para los cinco billetes: lo
único que separaba una pieza de otra era la cifra escrita encima. Ahora se dibujan como lo
que son.

Las monedas son **bimetálicas y del revés una de otra**, igual que las de verdad: la de 1 €
lleva el aro dorado y el centro plateado; la de 2 €, al contrario. Es la diferencia que usa
cualquiera para separarlas en la mano sin mirar el número.

Los billetes llevan **su color y su tamaño**: gris el de 5, cobre el de 10, azul el de 20,
naranja el de 50, verde el de 100, y el ancho crece con el valor. Cuatro de los cinco colores
son los reales; el del 10 tira a cobre porque la paleta de trece materiales no tiene un rojo y
añadir uno reordenaría las 39 variables `--deco-*`, que son contrato.

Y encima del color va el **dibujo**, a petición expresa: `js/03-sprites.js` genera las siete
piezas en SVG y las publica como `--pieza-*`, exactamente igual que las ocho texturas del
terreno. Las monedas llevan el aro bimetálico, las doce estrellas y la silueta del
continente; los billetes, la ventana con arco, el corro de estrellas y la banda holográfica.

**No hay ni un fichero de imagen** —la auditoría no admite un solo binario, porque `dist/` se
abre con doble clic desde `file://` y una imagen suelta sería una petición de red que ahí no
existe—: son 13 KB de SVG en `data:` URI, generados al arrancar. No son facsímiles de ningún
billete, son dibujos.

Tres cosas que no son de gusto:

- **la cifra NO va dentro del SVG.** La sigue escribiendo el DOM encima, para que crezca con
  `letra-grande` y con `modo-proyeccion` y para que siga midiéndose en los pares de contraste.
  Un número dibujado dentro de la imagen no obedecería a los ajustes de accesibilidad;
- por eso el motivo de cada pieza **deja libre la franja central**, y las estrellas de los
  billetes van arriba a la derecha como en la bandera, no en corro alrededor del número;
- **sin SVG se queda el color plano**, que es lo que ya distinguía las piezas. El dibujo
  mejora el reconocimiento, no lo sostiene.

Nunca solo color: cada pieza lleva su cifra, su propio ancho y su dibujo. Los siete pares de
contraste están **medidos** en `casos-contraste.js`; el más justo es el del 10, con 4,7:1
sobre un mínimo de 4,5.

De paso, las tres copias de «crear una pieza» —opciones, pagar y contar— pasan a una:
`CB.ui.pieza()`.

### El marcador cambiaba de golpe

Donde ponía 12 ponía 15 en el fotograma siguiente. Toda la ganancia se contaba **fuera** del
número —la insignia «+1» que brota al lado, la hilera de «+2 por rapidez»— y el sitio donde
de verdad vive la puntuación no se enteraba.

Ahora sube de uno en uno, con tope de ocho pasos para que 40 gemas al final de la partida no
sean cuatro segundos de espera, y la cifra da un salto de cuatro pasos mientras tanto. Tres
reglas que no son de gusto:

- **el último paso escribe el destino exacto**, nunca el acumulado de las divisiones;
- **nunca cuenta hacia atrás** — empezar partida repinta el HUD con 0 mientras el nodo guarda
  las de la anterior, y el marcador solo sube (§3.4);
- **con el movimiento apagado se escribe el número entero**: se quita el movimiento, no el
  dato.

### El mensaje que enseña se recortaba a una línea

`.mensaje-resultado` declaraba `min-height: --tam-texto-min * 3` — tres líneas — y daba una:
`box-sizing: border-box` es global, así que los 60 px incluían los 32 de relleno. Y bajo
presión de flex ese `min-height` no es solo un suelo, es también hasta dónde puede encogerse
la caja, así que en una ventana de portátil el mensaje se quedaba en la primera línea.

Lo que se perdía no era decoración: el mensaje de acierto lleva la frase de procedimiento,
que es **la única parte que enseña algo**. En 1.15.0 se midió cuánto tiempo hacía falta para
leerla sin comprobar que cupiera.

Queda pendiente algo más grande y se deja escrito: en una ventana de 755 px de alto la zona
superior son 135 px y el enunciado solo ya pide 147. El reparto vertical entero merece una
revisión con medidas, y eso no se hace de paso.

### Todos los botones suenan al pulsarse

Sonaba lo que **pasa** —el acierto, el fallo, la gema, la luz que se apaga— pero no el acto de
tocar. Un botón de navegación, uno de ajustes o el de pausa se pulsaban sin ninguna respuesta
sonora, y en una pantalla táctil de aula eso es la mitad de la confirmación que hay.

Nace el **decimotercer** efecto, `pulsar`. La tabla de doce era contrato y sube a trece a
propósito, con su comprobación cambiada en el mismo commit. Es el sonido más frecuente del
juego y por eso el más corto y el más flojo de los trece —35 ms y ganancia 0,12, contra los
0,22 del «toc»—: la misma regla que ordena las celebraciones, aplicada al sonido.

Un solo oyente delegado, en captura, porque la mitad de los botones los crea el JS en tiempo
de ejecución. Tres excepciones, las tres porque ya suena algo: el botón deshabilitado (ahí
manda el «toc» de construcción, que dice «aún no»), las monedas y billetes (traen su «gema»)
y el propio botón de silenciar, que sonaría justo al pedir que no suene nada.

Vive **fuera del `DOMContentLoaded`**, y eso es lo que lo hace comprobable: el arranque
devuelve pronto cuando no hay `#btn-jugar` —así evitan las páginas de prueba echar a andar un
juego— así que un oyente registrado ahí dentro no existiría en la suite y E91 habría medido
el vacío.

### `npm run dev` recompilaba y enseñaba lo de antes

El watch ya existía. Lo que no funcionaba era verlo: `dist/index.html` registra un service
worker con política **cache-first**, así que en cuanto se instala una vez deja de importar lo
que diga el servidor. Guardabas, gulp recompilaba, browser-sync recargaba, y en pantalla no
cambiaba nada. Es el riesgo R7 del plan —«el SW sirve una versión vieja para siempre»— en
local.

Ahora `gulp dev` sirve un `sw.js` **que se suicida**: se instala, borra todas las cachés, se
da de baja y renavega las pestañas. Con `CON_SW=1 npm run dev` se sirve el real, que hace
falta para poder mirar el modo sin conexión. Y todo va con `Cache-Control: no-store`, porque
Chrome reutiliza alegremente un bundle de hace tres ediciones y eso no se distingue de
funcionar.

**Dos servidores, no uno.** 8080 el juego con recarga en vivo; 8081 las dos páginas de prueba,
servidas tal cual. Se intentó con uno: browser-sync inyecta su cliente como un `<script>` más
en cada HTML, y `casos-carga.js` comprueba —con razón— que la página de pruebas cargue **un
solo guion**. Su `snippetOptions.blacklist` debería excluir una ruta; en esta versión apaga la
inyección entera, y entonces lo que se pierde es la recarga del juego. La comprobación se
queda como está y lo que se separa son los servidores.

El watch cubre además `pruebas/*.js` y `pruebas/*.html`: no hay nada que recompilar, pero
avisa por consola de que toca F5.

### Guardianes

**E85** el HUD no decía en qué veta se está · **E86** «Nivel superado» sin comprobar que no
quedara nada · **E87** el tiempo agotado no deja deuda en ninguna cola · **E88** el rótulo
pintado y fuera de la vista · **E89** reconocer una moneda enseñando un número · **E90** el
marcador saltaba sin que se viera cambiar · **E91** los botones se pulsaban en silencio.

E90 también nació roto, y de la misma familia que E88: miraba el contador en la línea
siguiente a lanzar la cuenta y esperaba ver ya el destino. Una cuenta que acaba de empezar
sigue valiendo 0. Lo que hay que mirar de una animación no es el valor inmediato: es **dónde
aterriza**.

E88 nació roto y conviene que quede escrito: pedía `offsetHeight > 0` sobre una maqueta que
vive dentro de un `<div hidden>`, así que medía 0 para el rótulo, para el HUD y para la
galería por igual. Es el mismo error que ya cazó a este proyecto con `transform`, que vale
`none` en un elemento sin caja. Ahora destapa la maqueta, **afirma que destaparla ha servido
de algo** y vuelve a taparla.

## [1.17.0] — 2026-07-29

**Segunda cifra.** Fase 15 del plan, la última. El perfil guardado no cambia.

### «Ahora sí empieza el juego» y aparecía un menú

La calibración termina diciendo literalmente *«Ahora sí empieza el juego: con reloj, con
luces y con gemas»*, y a los 3,4 s llevaba a **p-mapa**: un menú con tres tarjetas
bloqueadas —«Se abre al cavar más vetas del mundo anterior»— y una jugable. Es E21 un
escalón más adelante: una frase que promete una cosa y una pantalla que hace otra.

Y una asimetría que lo remataba: JUGAR costaba dos toques hasta el primer ítem y CANTERA
TRANQUILA, uno.

Ahora se empieza a jugar. Incondicional y sin riesgo: `terminar()` corre una vez por perfil
y en ese instante M1 es el único mundo abierto, así que no se le quita ninguna decisión a
nadie. La frase de cierre añade «Puedes parar cuando quieras con Pausa», porque el salto es
directo a una expedición con reloj.

Y en el mapa, cuando solo hay un mundo abierto, el foco va al único botón que hace algo:
quien navega con teclado recorría tres tarjetas bloqueadas antes de llegar a él. **Enfocar no
es navegar**, así que el contrato de que un `alEntrar` pinta sigue intacto.

`p-mapa` sigue existiendo, sigue siendo alcanzable desde JUGAR y desde `atras()`, y el
recorrido de `casos-carga.js` por las 16 navegables no cambia.

### Pruebas: 698 → 704

**E84**, que devuelve una promesa: el salto vive dentro de un `setTimeout` de 3400 ms y
medir en el mismo turno daría siempre «sigue en la calibración» — verde sin comprobar nada.

**Una corrección al plan.** Proponía proteger el orden con una aserción sobre
`perfil.trimestreDeducido`, y **no protege nada**: la deducción es síncrona y el salto es
diferido, así que para cuando el temporizador dispara, el trimestre ya está escrito pase lo
que pase. Sembrar el orden equivocado deja el guardián en verde.

Lo que sí protege el orden son las dos aserciones de **estado previo** —«justo después de
`terminar()` seguimos en la calibración» y «no hay partida todavía»—, que se ponen rojas en
cuanto alguien deja de diferir el salto. Se descubrió sembrando: la primera siembra no puso
nada rojo, y una siembra que no pone nada rojo hay que sospecharla antes de celebrarla.

### El plan queda terminado

Diez fases, de la 6 a la 15. **443 → 704 comprobaciones** y **E46 → E84** desde que empezó.

---

## [1.16.0] — 2026-07-29

**Segunda cifra.** Fase 14 del plan. El perfil guardado no cambia.

### No había forma de saber cuánto queda

El HUD tenía luces, reloj y gemas. Lo único que codificaba el avance de la expedición era
el **cielo**, y el cielo es `aria-hidden`. El guion tiene entre 8 y 20 ítems y su longitud
cambia de partida en partida, así que un niño de siete años no podía saber si iba por la
mitad o por el final.

La lección ya estaba aprendida en este mismo código **para cuatro preguntas** —la
calibración escribe «Pregunta 3 de 4» y hay un comentario explicando por qué se añadió— y en
la expedición de siete minutos no se había aplicado.

Nace la galería del HUD: un bloque por ítem, **los cavados en oro**. Los bloques caen, no
quedan: un contador que baja se lee como cuenta atrás, y aquí no hay ninguna. El dibujo es
decoración y la información va en el `aria-label`, reescrito en cada pintado.

### Se pinta al servir, no al acertar

El plan proponía ampliar las cinco llamadas a `pintarHUD`. Se hizo, y además se pinta en
`servirItem`, porque en `trasAcierto` **`e.indice` es todavía el del ítem que se acaba de
responder**: la fila habría ido un bloque por detrás toda la partida. En `servirItem`,
`indice` es exactamente el número de ítems ya servidos, que es lo que la fila tiene que
decir.

### Un defecto de anchura que nadie había medido

El plan pedía comprobar el ancho con 20 bloques en el escalón más estrecho, diciendo que
«cabe sin desplazar el reloj» no estaba verificado en ningún sitio. **No cabía.** A 320 px el
HUD apretaba la galería hasta 10 px, los 20 bloques se apilaban en una columna y el HUD
pasaba de 72 a **254 px de alto**.

El `max-width: 40%` no lo impedía: cuando no hay sitio, el que manda es el encogimiento y no
el máximo. Ahora `flex: 0 0 auto`, ancho fijo de 128 px y dos filas como tope. Y por debajo
de 480 px —donde las luces solas ocupan 160— la misma información va en **texto**, «7/20»,
que ocupa una cuarta parte. No se esconde: se dice de otra manera.

Medido después en cuatro anchuras: el HUD se queda en 72 px en las cuatro y la galería no
pisa el reloj en ninguna.

### Pruebas: 687 → 698

**E83**, que **empieza afirmando que el nodo existe en la maqueta**: sin eso, `pintarHUD`
sale por su `if` y todo lo demás pasaría por vacuidad, cero bloques contra cero esperados.
Sembrado quitando el nodo del mock, esa primera aserción se pone roja y el resto ni corre.

Y una llamada parcial —solo `{luces, gemas}`— se caza con la aserción del avance real, no con
las de la fila estática.

---

## [1.15.0] — 2026-07-29

**Segunda cifra.** Fase 13 del plan. El perfil guardado no cambia.

### La frase que enseña se borraba a los 1600 ms

El mensaje de acierto son 13-15 palabras y la espera era de 1600 ms: **560 palabras por
minuto**, para un lector de 2.º que va a 60-90. La única parte del mensaje que enseña algo
—la frase de procedimiento— no se leía nunca.

`CB.ui.festejo.espera()` gana un **tercer parámetro opcional**: 350 ms por palabra, tope
3200. Opcional a propósito: sin él devuelve exactamente lo que devolvía antes, y por eso las
llamadas y los guardianes viejos siguen valiendo. Un global habría cambiado todas a la vez.

**No 700 ms por palabra**, que sería el ritmo real: esas 13 palabras darían 9,1 s recortados
al tope, y el juego se congelaría 5,2 s en casi todos los aciertos, doce veces por sesión —
lo contrario del principio de que la fricción vive en la matemática y en ningún otro sitio.

**Presupuesto que se mueve, y se dice:** no el de tiempo por ítem, sino el reloj de pared.
La sesión de 20 minutos pierde unos 20 s de ítems.

### El último número suelto del bucle

La espera del primer fallo era un `2600` escrito a pelo dentro de un `setTimeout`; las otras
dos ya pasaban por la fuente única. Ahora es `CB.partida.esperaSegundoIntento()`, que además
se puede probar: un literal dentro de un temporizador no se comprueba sin leer el código.

**Descartado**: recortar el suelo quitando los 800 ms de construcción en el segundo intento.
`iniciarCronometro` tiene `MS_CONSTRUCCION` cableado en tres sitios, y habilitar los botones
antes deja el `t0` en el futuro: **rt negativo**, multiplicador de tiempo al tope, bono máximo
por rapidez, y esa muestra envenenada entra en el detector de azar. Es el patrón de E40.

### La música volvía al segundo cero en cada reparación y en cada descanso

Ambas pantallas ponen `'calma'`, y al volver `poner()` soltaba el canal y creaba elemento
nuevo colocándolo en su punto de entrada. Con un fallo de cada dos llevando a reparación y un
descanso cada 6-8 ítems son cinco o seis idas y venidas por partida: de nueve pistas
normalizadas y con puntos de bucle medidos, el niño oía siempre los mismos treinta primeros
segundos. **Monotonía fabricada por el motor.**

`CB.musica.posiciones` guarda dónde se quedó cada pista y `poner()` retoma ahí. Es estado de
**sesión** —`07-musica.js` es adaptador de plataforma y puede tenerlo—, y no se persiste en el
perfil. Se recorta al guardar para no reanudar dentro del fundido de bucle, donde la pista
entraría baja.

### Pruebas: 673 → 687

**E80**, **E81** y **E82**, y las tres siembras se comportaron exactamente como el plan
predecía:

- Leer el texto de un global en vez del parámetro tumba **los tres `t.igual` originales de
  E54**. Son el guardián de verdad de este cambio: si siguen valiendo, el tercer parámetro no
  se ha colado en las llamadas de dos argumentos.
- Devolver el `2600` literal tumba solo la **segunda** aserción de E81. La primera sola
  pasaría en verde con el número a pelo, que es el fallo entero.
- Guardar la posición sin usarla tumba la **recuperación** y no la existencia. Un guardián
  que solo comprobara que `posiciones['mundoPradera']` existe pasaría en verde con el fallo
  dentro.

---

## [1.14.0] — 2026-07-29

**Segunda cifra: el combate del jefe gana lo que no tenía.** Fase 12 del plan. El perfil
guardado no cambia.

Ocho turnos en los que acertar hacía bajar un bloque, sonar y tirar partículas. **Nada
más.**

### Al acertar, silencio; al fallar, voz

El único anuncio de todo el combate era el del fallo. Para un lector de pantalla eso es el
reparto exactamente al revés: se calla lo que sale bien y se dice lo que sale mal. Ahora
cada acierto anuncia «Ese bloque cae. Quedan N.» — «cae», nunca «daño»: aquí no se hace
daño a nadie.

### El intro del jefe no lo leía nadie

Los cuatro `intro` —«Tronquete tiene cuatro ramas. Elige cuál talas primero.»— llevaban
escritos desde siempre y no se pintaban en ningún sitio. Van a `#jefe-aviso` y **no** a
`#jefe-enunciado`: `iniciar()` llama a `turno()` en su última línea y `turno()` empieza
vaciando el enunciado, así que ahí el intro habría durado cero milisegundos.

### Una cinta por combate, y en el sitio justo

Cuando la armadura se parte por la mitad. **Una vez, no cada turno** —el espectáculo es
inversamente proporcional a la frecuencia— y no en el último bloque, que cancelaría la
`'bandera'` del final. La espera del turno siguiente la manda la tabla del festejo y no un
900 copiado a mano: sin eso el cartel seguiría en pantalla mientras aparece la pregunta
nueva.

**Descartado**: el distintivo «sin un fallo» encendido durante el combate. Es la racha que
se pierde, patrón oscuro que este proyecto declara prohibido, y contradice la regla del
propio jefe: aquí no se puede perder nada.

### `jefeSinFallos` era una escritura muerta

Se escribía en el combate, se declaraba en tres sitios del esqueleto del perfil y **no lo
leía nadie en todo el proyecto**. Se lee ahora en la tarjeta del mundo, como recuerdo
retrospectivo: «cerrado sin un fallo». No se enseña durante el combate, así que no fabrica
miedo.

### La victoria sonaba a jefe

`terminar()` **no cambia de pantalla**: pinta la victoria encima de `p-jefe`. Como la
música la manda el bus y el bus solo habla al cambiar de pantalla, seguía sonando el tema
del peligro en el único instante que el juego se reserva para pararlo todo — cuatro veces
en la vida de un perfil.

Es **la única excepción del juego** a que la música la mande el bus, y va anotada como tal
en la tabla de `07-musica.js`, en `CLAUDE.md` y en `docs/decisiones.md`. Si no, el próximo
que lea la tabla la creerá completa. El siguiente cambio de pantalla repone el tema solo.

### Pruebas: 658 → 673

**E77**, **E78** y **E79**, los tres con el estado construido por `CB.jefes.iniciar()` de
verdad — este proyecto ya se comió una vez el fabricar la forma del estado a mano.

E78 se puso rojo contra código correcto: `responder()` programa `turno()` con `setTimeout`
y `terminar()` solo se llama desde `turno()`, así que un bucle síncrono de respuestas baja
los bloques a cero y **no termina nunca el combate**. Ahora conduce el turno a mano.

### Nota de método

El tiempo de la suite cayó de 56 s a 905 ms **con más comprobaciones**, y eso no se dio por
bueno: se comprobó que las 55 suites registradas eran las 55 renderizadas y los 673 casos,
los 673. Los 56 s eran la pestaña **en segundo plano**, con Chrome estrangulando los
`setTimeout` que encadenan las suites. Es la trampa que este proyecto ya tenía documentada,
vista por primera vez desde el otro lado.

---

## [1.13.0] — 2026-07-29

**Segunda cifra: el perfil gana una clave aditiva.** Fase 11 del plan. `asegurar()` la
crea si falta, así que no hay migración.

Tres textos que prometían lo que el código no hace.

### El cofre del descanso prometía gemas y no daba ninguna

Dos mentiras encadenadas: el título decía «¿En qué cofre está la gema?» y el aviso «En los
tres cofres hay gemas. Elige uno.» El manejador solo marca el cofre como roto, tira
partículas y suena: **no suma ni una gema**, y los tres cofres siguen pulsables, así que
«Elige uno» tampoco era verdad. El comentario del código invocaba la regla de no poner
cofres opacos y el resultado era peor: un cofre transparente y vacío.

Se corrige el **texto**, no la economía, y por tres motivos verificados: regalar gemas
rompería el invariante de la moneda visible; haría del cofre el único de los cinco
descansos que paga; y ni siquiera se vería, porque `servirItem` no llama a `pintarHUD` y el
premio no aparecería hasta el acierto siguiente.

### El musgo se contaba con un criterio y se pintaba con otro

El saludo del mapa contaba `vencidosHoy()` —`R < 0.7`— y lo llamaba «vetas con musgo». El
musgo se pinta cuando `clasificar()` dice `'oxidada'`, que exige **además** haber estado
antes en afianzada o dominada.

En la primera semana ninguna destreza ha llegado a afianzada, así que `oxidada` es
imposible mientras `vencidosHoy` ya cuenta media docena: **«Hay 5 vetas con musgo
esperándote» y ni una hoja verde en la Cantera**. La única razón honesta que este juego se
dio para volver mañana era, vista por un niño, una frase que no se correspondía con nada.

Nace `CB.memoria.conMusgo()`, con el **mismo predicado** que pinta la Cantera. Se cuentan
destrezas, no niveles: son 13 frente a 92, y «hay 24 vetas con musgo» a un niño de 7 años
es una deuda, no una invitación. `CB.partida` sigue usando `vencidosHoy` para elegir qué
servir: son dos preguntas distintas y solo una se le enseña al niño.

### Los cinco descansos se sorteaban con reemplazo

El comentario decía «en bolsa para que no se repitan» y la línea sorteaba con reemplazo:
con tres descansos por sesión, un **52 %** de ver dos veces el mismo. Ahora van en la bolsa
barajada que ya existe, en `perfil.mensajes.bolsaDescansos` —**sin guion bajo**, porque
`sanear()` borra esas claves— y creada también en `asegurar()`, que es el conducto para los
perfiles ya guardados.

### Pruebas: 639 → 658

**E74**, **E75** y **E76**. Y E75 costó tres intentos, los tres por el mismo tipo de error
**en la prueba, no en el código**:

1. Construí la destreza a mano con `ultimoISO`, **una propiedad que no existe**:
   `recuperabilidad()` lee `ultimoRepasoISO`. Devolvía 1, no había ninguna destreza vencida
   y dos aserciones se ponían rojas contra código correcto.
2. Con eso arreglado, el guardián **no cazaba su siembra**: comprobaba `conMusgo()` en
   abstracto y no tocaba el saludo por ningún sitio.
3. Al añadir la mitad que conduce el saludo, llamé a `pintar()` — y el saludo **no lo
   escribe `pintar()` sino `pintarMundos()`—, así que el texto se quedaba como estaba, el
   número leído era 0, el esperado era 0, y **volvía a dar verde con el fallo dentro**.

Ahora marca el nodo con un centinela y afirma que alguien lo ha reescrito antes de comparar
nada.

---

## [1.12.0] — 2026-07-29

**Segunda cifra: cinco premios que el juego calculaba, guardaba y no enseñaba.** Fase 10
del plan. El perfil guardado no cambia.

Ninguno era un fallo de cálculo, y por eso ninguno daba error: el juego funcionaba y el
niño no se enteraba.

### El cromo del bloque raro no decía cuál era

`darCromo()` guardaba el cromo y su única salida era un anuncio **con el id crudo** —«el
cromo de gluglu», no «Gluglú»— que solo oye un lector de pantalla. El premio más raro del
juego, uno de cada veinte ítems, se entregaba sin decir qué era.

Ahora la cinta grita el nombre y el mensaje quieto lo explica —**concatenado, nunca
sustituyendo** la frase de procedimiento, que es la única parte que enseña—. Con los once
reunidos devuelve `null` y queda el grito normal.

Y algo que nadie había visto: `darCromo` comprobaba logros por dentro, y `aplicarLogros`
pinta su propia cinta, que empieza por **ocultar la anterior**. En el ítem donde cae el
quinto cromo y salta «Coleccionista», la cinta del cromo se cancelaba a sí misma. Es E51
llegando por una ruta que E51 no vigila.

### El reto bonus estaba en los datos y no en la pantalla

Se calculaba, se guardaba y concedía una **luz extra** sin que el niño supiera por qué. El
distintivo va ahora arriba del todo en `pintarItem`, **antes del `return` de la rama de los
problemas de enunciado**: puesto al final no se vería nunca justo donde `D === 3` es más
probable.

### Los logros de fin se celebraban sobre una pantalla que desaparece

Se aplicaban estando aún en `p-partida` y nueve líneas después la pantalla cambiaba.
«Primer pico», «Cantero» y «Vuelvo mañana» sonaban y no se veían, porque el único nodo de
cinta vivía dentro de `p-partida`.

Ahora `p-fin` tiene el suyo, y un panel nuevo —**«Hoy además»**— entre lo dominado y las
gemas. El orden de lectura de §3.7 es contrato cerrado: el cambio está declarado en
`docs/decisiones.md`, no metido de tapadillo.

Los logros se **encolan**: si caían dos en el mismo ítem, la segunda cinta cancelaba a la
primera. Y el nombre del logro pasa al mensaje quieto, porque en la cinta no cabe —«Reto
bonus superado» son 19 caracteres y el tope es 16—.

### Se desbloqueaba un mundo entero y no lo decía nadie

Abrir el Bosque, el Río o la Mina son los tres hitos más grandes de la vida de un perfil y
ocurrían **sin una sola línea de interfaz**. Ahora se dice en texto, se anuncia por la
región viva —la cinta es `aria-hidden` por diseño— y el nombre sale de `CB.MUNDOS`, nunca
escrito a mano.

### El bono hablaba en puntos debajo de las gemas

«+450 de bono» en **puntos**, justo debajo del recuento de **gemas**. Parecían gemas y no
lo eran. Ahora dice las gemas del bono, que ya están dentro de `#fin-gemas`: es
literalmente verdad y es la moneda que el niño conoce. Los puntos siguen sin enseñarse.

Y la mejor expedición se celebra **sin cifra**, contra el récord del mismo modo, que es el
antifarmeo ya cerrado.

### Efecto colateral declarado

Resolver el cromo antes del grito cambia el orden de consumo del RNG sembrado. La partida
sigue siendo reproducible desde su semilla, pero **deja de dar la misma secuencia que
antes**.

### Pruebas: 612 → 639

**E69** a **E73**. Cinco siembras, y dos de ellas destaparon guardianes míos que
**ramificaban en vez de afirmar**: E72 y E73 decían «si el hito ocurrió, compruébalo», así
que con el fallo sembrado —capturar los mundos abiertos *después* de abrirlos— la condición
era falsa siempre y el guardián se iba por el `else` en verde. Un guardián que solo
comprueba cuando la cosa ocurre no comprueba que la cosa ocurra.

Y el montaje de E72 filtraba por `nivel.mundo`, **una propiedad que no existe**: el nivel
no guarda su mundo. No marcaba ningún nivel y cuatro aserciones se ponían rojas contra
código correcto. Ahora se le pregunta a `CB.catalogo.nuclearesDe()`.

---

## [1.11.0] — 2026-07-29

**Segunda cifra: el teclado de los problemas gana seis cosas que no tenía.** Fase 9 del
plan. El perfil guardado no cambia.

### Había tres teclados y solo uno estaba bien

La tercera fase de `selectorDatos` —escribir el resultado de un problema— era una copia
del teclado, y llevaba desincronizada desde que se escribió. No es un rincón: se usa en
**todos** los problemas de enunciado desde el segundo trimestre.

| | La copia | El original |
|---|---|---|
| ⌫ | mudo | suena |
| dígito | mudo | suena |
| visor | un `div` pelado | con `role="status"` y `aria-live` |
| bloqueo de 800 ms | no lo miraba | sí |
| `data-tecla` del OK | `"OK"` en mayúsculas | `"ok"` |
| teclado físico | no había | dígitos, ⌫ y Enter |

La de las mayúsculas es la que remata: `[data-tecla="ok"]` distingue mayúsculas, así que
ese OK **ni siquiera recibía el verde** del botón primario.

Ahora la fase 3 delega en `tecladoBloques`, que acepta un contenedor ajeno. Queda **una
sola construcción de teclado** en todo el proyecto, y la fase 3 gana de paso el manejo
por teclado físico, que no tenía: se jugaba con el dedo o no se jugaba.

### Y un séptimo formato sin la protección de los 800 ms

Al mirarlo de cerca: `selectorDatos` **ignoraba su propio `opciones.bloqueoMs`** —pasaba
0 a `montar()`— y además ponía `CB.partida.bloqueado = false` al final, **después** de
pintar. Era el único de los siete formatos sin la protección contra el toque heredado del
ítem anterior. La línea se mueve antes de pintar.

### Pruebas: 595 → 612

**E68**, y lo que vigila no es nada de lo de arriba: vigila que los **cuatro campos de
diagnóstico** lleguen intactos a `alResponder`. De ellos sale el informe del adulto, y no
se ven en pantalla. Unificar teclados es fácil; que el informe empiece a decir que el niño
falla la comprensión lectora cuando lo que falla es la cuenta no da ningún error.

Sembrado —borrar `faseDatosOk` del envoltorio— se pone rojo exactamente ahí.

### Un guardián que se puso rojo contra código correcto

**E65 bajó a «6 de 7»** al unificar los teclados: comprobaba la confirmación del antiazar
leyendo el **texto fuente** de cada formato, y `selectorDatos` dejó de contener la palabra
porque ahora delega. La confirmación seguía ahí; el guardián no podía verla.

Es la fragilidad que el proyecto ya tiene anotada —leer `toString()` solo vale para
literales y nombres de propiedad—, usada aquí para inferir comportamiento. El barrido se
queda porque cubre seis formatos de un vistazo y acepta la delegación, y el séptimo lo
comprueba E68 **conduciendo las tres fases** y tocando el OK dos veces, que es la única
forma honesta de saberlo.

---

## [1.10.0] — 2026-07-29

**Segunda cifra: entran capacidades.** Fase 8 del plan. El perfil guardado no cambia.

Cuatro cosas que un niño de 7 años no podía hacer y debía poder.

### Deshacer, en los dos formatos que no dejaban

`ordenarFila` se contestaba sola al colocar la última pieza y no había forma de
retirar ninguna: tocar el 5 cuando se quería el 3 obligaba a **terminar mal el ítem a
propósito**. Y el registro guardaba «falló ordenar». Lo mismo en la fase de datos de
`selectorDatos`, que además saltaba de fase sola y anotaba `faseFallada = 'datos'` —
que es atribuirle al niño un problema de comprensión lectora cuando lo que ha pasado es
que se le ha ido el dedo.

Ahora: un ⌫ en la fila de ordenar, destocar en la fase de datos, y un
«◀ Cambiar los números» en la fase siguiente para cuando ya ha saltado.

**Sin OK y sin peaje**: se sigue contestando al colocar la última pieza, así que el caso
bueno no cuesta ni un toque más. Exigir un OK habría metido un toque obligatorio en cada
ítem de esos formatos, que es lo contrario de lo que se busca.

### La confirmación de dos toques era invisible, y la pedían tres de siete

`pedirConfirmacion` hundía el botón 300 ms —indistinguible del `:active` de cualquier
botón— y llamaba a `CB.a11y.anunciar`, que escribe en una región con
`clip: rect(0 0 0 0)`. Justo después de decidir que el niño va al tuntún, el juego le
cambiaba la regla de entrada y **se lo contaba solo a un lector de pantalla**.

Ahora se ve, con `CB.ui.mensaje`. Se **sustituye** el anuncio en vez de añadirlo, porque
`CB.ui.mensaje` ya anuncia por dentro y dejar los dos haría que el lector lo dijera dos
veces.

Y la piden los siete formatos, no tres. Se la saltaban `selectorSigno`, la fase 3 de
`selectorDatos`, `ordenarFila` y `monedas` — el patrón E44 entero. En los dos últimos la
respuesta se dispara sola, así que la confirmación cuelga del gesto que la cierra: la
última pieza, la moneda que alcanza el importe. **Por eso esta parte necesitaba el ⌫**:
sin poder deshacer, un «toca otra vez» sobre la última pieza no tendría segunda
oportunidad posible.

### «◀ Salir» ya no termina la expedición de un roce

Estaba abajo a la derecha, a 16 px del botón de sonido y del mismo tamaño: la zona del
pulgar que sujeta la tableta. Un roce y se acababa.

Ahora pide **dos toques** y el aviso cambia el **texto** del botón —«◀ Salir de
verdad»—, no su color: nunca solo color, y aquí además el color queda debajo del dedo.
El armado **caduca a los 3 s**. Y el botón se muda al grupo de la izquierda, con Pista,
lejos de esa mano.

No se usa `pedirConfirmacion`: esa función empieza con
`if (!_confirmacionPendiente) { alConfirmar(); return; }`, y esa bandera solo vale `true`
cuando el antiazar ha disparado. En una partida normal habría sido un no-operativo — un
cerrojo que no cierra, verde en las pruebas y roto en el juego.

### Tocar una moneda no dejaba ninguna marca

El manejador sumaba al total y la pieza seguía idéntica. Pagar 6 € es tocar tres veces
la moneda de 2 €, y las tres veces la moneda se quedaba igual. Había además una regla
CSS muerta para `[aria-pressed="true"]`, un atributo que **nadie ponía nunca** sobre una
moneda.

Ahora se **cuenta** con `data-veces` —no se marca con `aria-pressed`, que convertiría un
contador en un interruptor y le diría «pulsado» al lector de pantalla de un botón que
hay que seguir pulsando (WCAG 4.1.2)— y hay una **fila visible de lo cogido**:
«2 € + 2 € + 1 €». Es lo que de verdad descarga la memoria: el niño ve la suma, no solo
el resultado. «Empezar de nuevo» borra las marcas y vacía la fila.

Y monedas y billetes no son `.btn-bloque`, así que durante los 800 ms de construcción no
recibían ni el «toc» ni la sacudida: se tocaban y no pasaba nada de nada. Ahora sí.

### Pruebas: 561 → 595

**E64** a **E67**. El plan los llamaba E61-E64; esos números ya estaban gastados.

Los cuatro validados con su siembra, y E65 además **señala cuál** de los siete formatos
se ha saltado la confirmación en vez de caerse en bloque — si un fallo en uno tumbara los
siete asertos, no sabríamos cuál.

Y la siembra de vacuidad, que es la que importaba: sin esperar al desbloqueo de
`montar()`, los guardianes **se ponen rojos** en «los dos primeros toques entran de
verdad → obtenido 0», en vez de pasar en verde por no haber tocado nada. Al primer
intento la siembra no valía —seguía esperando un tic de 20 ms, y el desbloqueo llega
antes—, así que hubo que sembrarla dos veces para que dijera algo.

### Un fallo del propio arreglo, cazado por su guardián

`pedirSalida` no soltaba el cerrojo al confirmar: el botón se quedaba armado para
siempre, y al volver a una partida el primer roce en Salir la habría terminado sin aviso
— el fallo que el cerrojo venía a impedir, entrando por la puerta de atrás. Lo cazó la
**tercera** aserción de E66, la de la caducidad, que era la que parecía menos importante.

---

## [1.9.1] — 2026-07-29

**Tercera cifra: corrige, no añade.** Fase 7 del plan. El perfil guardado no se toca.

El teclado se deshabilita 800 ms al montar cada ítem, para que un toque heredado del
ítem anterior no conteste el siguiente. **El bloqueo es correcto y no se toca.** Lo que
estaba mal es cómo se veía.

### El OK era la única tecla que fingía estar viva

`.teclado-bloques .btn-bloque[data-tecla="ok"]` tiene especificidad (0,3,0) y
`.btn-bloque:disabled` (0,2,0). Ganaba el verde: once teclas de piedra y hundidas, y
justo la que el niño quiere pulsar, brillante. No es un detalle estético — es la
diferencia entre «espera un momento» y «pulsa, que no pasa nada», y lo segundo se lee
como que el juego está roto.

Se apaga con los **dos** selectores, `:disabled` y `[aria-disabled="true"]`, porque la
regla base cubre los dos y dejar uno fuera reabre el agujero por la otra puerta.

### Las cifras estaban a 1,52:1

El texto del botón bloqueado era `--deco-piedra-osc` sobre `--deco-piedra`: **#6E6E6E
sobre #8C8C8C = 1,52:1 medido**, frente al 4,5 que exige WCAG 1.4.3. Durante 800 ms por
ítem, treinta veces por sesión, no se distinguía el 7 del 1.

Ahora el texto es el mismo del botón activo: **4,99:1**. Entre activo y bloqueado
cambian el fondo, el bisel invertido y el hundido —tres señales que no son el color— y
no la legibilidad de la cifra. `--gris-carbon` habría sido lo intuitivo y da **3,91:1**:
no llega, y no se usa.

Nacen `--btn-fondo-desactivado` y `--btn-texto-desactivado`, con su propia línea en el
mixin de alto contraste: ese mixin reescribe `--btn-texto` a blanco y **no toca**
`--deco-piedra`, así que sin ella el bloqueado quedaría a **3,36:1**. Con el fondo del
hundido, 12,63:1.

### Y con el movimiento apagado se perdía el hundido

`desactivar-movimiento()` emitía `.btn-bloque--monta { opacity: 1; transform: none; }`.
Con el prefijo `:root.sin-movimiento ` eso vale (0,2,1) y le gana a `.btn-bloque:disabled`
(0,2,0): anulaba también el hundido. Para quien juega con el movimiento apagado —el
ajuste que más lo necesita— el color quedaba como única señal. Ahora la excepción lleva
`:not(:disabled)`.

### Pruebas: 548 → 561

**E62** (ninguna tecla finge estar viva; la excepción de movimiento no alcanza a los
bloqueados) y **E63**, en `casos-contraste.js`, que mide el par sobre **un botón montado
de verdad**, no sobre los tokens: entre lo que dicen los tokens y lo que se ve caben la
especificidad y la cascada, que es justo lo que dejaba el OK verde.

Validados con las tres siembras que pedía el plan, reconstruyendo entre cada una porque
los guardianes miden `dist/` y no `src/`.

Una corrección al propio guardián durante el camino: la mitad que comprobaba el hundido
medía `getComputedStyle().transform` en la maqueta, donde los botones **no tienen caja de
composición** y Chrome devuelve `none` para todo elemento sin renderizar — daba `none`
incluso con un `style.transform` puesto a mano. Se habría puesto rojo midiera lo que
midiera. Ahora lee las dos reglas que compiten y comprueba la relación entre ellas.

---

## [1.9.0] — 2026-07-28

**Segunda cifra: entran tres capacidades.** El perfil guardado no cambia de forma
incompatible —`componentesVistos` ya existía en el esqueleto desde la primera
versión, sin que nadie lo escribiera— así que no hay migración.

Es la **fase 6** del plan que devolvieron las dos lentes que faltaban
(`docs/plan-mejoras-1.8.0.md`): tres funciones escritas, documentadas y que no
llamaba nadie. Ninguna era un error de lógica. La familia de E41 y E55, y van cinco.

### `atras()` no limpiaba nada

`ir()` ejecuta el manejador de salida de la pantalla que deja; `atras()` no lo hacía
en ningún punto. Solo hay dos registrados —apagar los temporizadores de la tarjeta de
reparación y parar el reloj de la partida— así que **la mitad de las salidas del juego
no limpiaban**.

El síntoma no era un error: era el salvavidas de la reparación poniéndose a leer los
tres pasos en voz alta, a los 25 segundos, **encima de otra pantalla**. Y Escape en la
reparación llevaba al mapa dejando la expedición viva detrás; ahora pausa, como en la
partida.

### Los siete componentes se presentan la primera vez que se ven

`CB.componentes.PRESENTACION` tenía las siete frases escritas —«Toca la moneda de 2
euros», «¿Cuál pesa más? 8 y 5»— con sus dos funciones de apoyo, y **cero referencias
fuera de su propio fichero**. `componentesVistos` se declaraba en el perfil, se
reparaba en la migración y estaba en los campos permitidos; no lo escribía nadie. Un
niño veía la balanza por primera vez sin una sola frase que le dijera qué hacer,
teniéndola escrita.

Se marca **donde se monta cada componente**, no adivinando desde `item.formato`: las
claves son nombres de función (`ordenarFila`, `selectorSigno`) y el formato dice otra
cosa (`ordenar`, `signo`), y además el componente real depende de condiciones de
ejecución. Resolverlo por el formato habría dado `undefined` en casi todos los casos
sin fallar — la familia de E42.

Las presentaciones se pintan con un tipo de mensaje **neutro** nuevo. Con el par del
fallo, que fue lo primero que se probó, estrenar una pantalla parecía una reprimenda.

### El enunciado se lee solo, y antes no

`docs/decisiones.md` y un comentario de `src/index.html` daban por vivo que «la
consigna se lee sola al aparecer». **Era falso desde la primera versión**: lo único que
había era una llamada a la región viva, que es texto para un lector de pantalla, no
voz. La única puerta era la tecla L, en un juego cuyo aparato objetivo declarado es un
iPad.

Ahora se lee, con tres condiciones y las tres importan: solo problemas de enunciado,
solo con el ajuste encendido y solo si hay voz española instalada. **No se usa
`leerOGuiar`**, que cae en `lecturaGuiada` y esa no mira `CB.voz.activa`: sería audio
que arranca solo y no se puede apagar, WCAG 2.2 1.4.2. Y en un Chromebook sin voz
española iría a 1000 ms por palabra —25 s de resaltado con el reloj corriendo— y todos
los problemas se agotarían por tiempo. El cronómetro se para mientras lee.

Además, un altavoz **dentro del enunciado**, donde está lo que hay que oír. No vuelve
a la barra: de ahí se retiró a petición expresa. Llama a una variante que **no levanta
el bloqueo antiazar**, porque un altavoz encima de la pregunta se roza sin querer y ese
roce anularía de un toque la única protección contra responder al tuntún.

### Pruebas: 520 → 548

**E59**, **E60** y **E61**. El plan los llamaba E56-E58, pero esos números se los llevó
1.8.1 mientras el plan esperaba; se numeran por orden de escritura.

Sembrados los tres fallos, **E60 no se puso rojo**: comprobaba las dos funciones
sueltas, que llevaban años siendo correctas, y no el conducto que faltaba. Es
literalmente lo que el plan había anticipado. Reescrito para servir un ítem de verdad y
mirar la pantalla, caza la siembra.

Y dos correcciones de las propias pruebas, las dos por medir lo que no era:

- **E61 pasaba en vacío.** Forzaba `estado.itemActual` a mano y luego llamaba a
  `servirItem()`, que genera el suyo desde el guion — y el mundo M1 no sirve problemas
  de enunciado. No se leía nada por no haber problema, no por tener la voz apagada.
- **E60 se ponía rojo contra código correcto**, porque `CB.partida.iniciar()` ya sirve
  el primer ítem y la llamada extra a `servirItem()` medía la pantalla ya limpiada.

---

## [1.8.1] — 2026-07-28

**Tercera cifra: esto corrige 1.8.0, no añade nada.** El formato del perfil no cambia
—`perfil.mensajes.gritos` pierde una bolsa que nunca llegó a llenarse— y no hay
migración.

### El fallo: nueve celebraciones que eran el mismo cartel

1.8.0 dio a cada momento su propia coreografía: nueve recorridos distintos. Pero las
nueve eran **la misma banda**: mismo ancho, mismo sitio, misma tipografía, mismo
tamaño. Cambiar la trayectoria no cambia la forma, y la forma es lo que se reconoce.
Un niño no veía nueve celebraciones; veía el mismo rectángulo entrando de nueve
maneras, veinte veces por sesión. Que es exactamente lo que había que evitar.

Y había una segunda capa, peor: el guardián E47 escrito en 1.8.0 decía «ningún
modificador de cinta reposiciona el cartel». **La monotonía estaba blindada por una
prueba.** Cuando una comprobación impide la corrección, la comprobación es parte del
fallo.

### La corrección: seis vehículos, no seis recorridos

| Momento | Vehículo | ms |
|---|---|---|
| acierto normal (60 % de los casos) | **insignia**: «+1» junto al contador de gemas | 700 |
| esfuerzo | **criatura**: Cubi salta | 1100 |
| superación (acierta tras fallar) | **cinta** | 1300 |
| racha, veta o mundo nuevo | **criatura**: Chispa gira + partículas | 1400 |
| logro o luz extra | **cartel** centrado con bisel | 1600 |
| jefe derrotado | **cinta** | 1800 |
| bloque raro (1 de cada 20) | **sacudida** de la cantera entera | 1200 |
| ánimo, tras fallar | **criatura**: Rocarr asiente. Sin cartel, sin grito | 1100 |

La regla que ordenaba la tabla no cambia y ahora sí se cumple: **el espectáculo es
inversamente proporcional a la frecuencia**. Lo que sale en seis de cada diez aciertos
es un «+1» de un renglón que no tapa nada y no para nada. La banda queda para tres
momentos, y por eso vuelve a significar algo.

Sin efectos de sonido nuevos: siguen siendo doce.

### Retirado

- **Seis coreografías de cinta** (`sello`, `sube`, `cascada`, `estalla`, `veta-madre`,
  `posa`) con sus `@keyframes`. No se «desactivan comentadas»: la comprobación de
  animaciones huérfanas que nació en 1.8.0 no lo habría permitido, y hace bien.
- **Los doce gritos de ánimo.** El ánimo dejó de tener cartel, así que no hay dónde
  escribirlos, y un dato que no se pinta en ningún sitio acaba pareciendo que sí.
  `CB.mensajes.grito()` deja de recibir el tipo: solo hay una bolsa.

### Un fallo encontrado mirando la pantalla, con la suite en verde

El cartel del logro salía a **887 px de altura, fuera de la vista**. Causa:
`_06-biomas.scss` pone `position: relative` a todo hijo directo de `.zona-juego` que no
esté en su lista de exclusiones, y gana por orden de cascada. Se añadió `.cinta` a esa
lista en 1.8.0 y se olvidó `.cartel` en 1.8.1. Es **el mismo fallo que el comentario de
ese fichero documenta desde 1.7.0**, cometido otra vez.

Ninguna prueba lo veía. Ahora E47 compara la `position` **calculada** de los dos
superpuestos, que es la única comprobación que lo caza. Y el cartel bajó del 30 % al
12 % de altura porque a 30 rozaba la fila alta del teclado en una pantalla de 812 px:
medido, no supuesto.

### Pruebas: 489 → 520

**E56** (las celebraciones no comparten vehículo, y la más frecuente es de las más
cortas), **E57** (cada vehículo hace algo distinto y observable) y **E58** (el ánimo no
se celebra). Validados sembrando el fallo original —devolver los ocho momentos a la
cinta—: salen ocho comprobaciones rojas repartidas entre los tres.

---

## [1.8.0] — 2026-07-27

**Segunda cifra: entra capacidad nueva y el perfil guardado no cambia de forma
incompatible.** La bolsa de gritos (`perfil.mensajes.gritos`) la crea
`CB.mensajes.asegurar()` si falta, así que un perfil de 1.7.1 abre en 1.8.0 sin
migración y la primera cifra se queda donde está.

### La cinta: un cartel, nueve coreografías

El «Hurry up!» era el único momento del juego con espectáculo, y gustaba. Pero
llevar *ese mismo* efecto a las felicitaciones habría sido el error contrario:
un niño acierta entre veinte y treinta veces por sesión, y un efecto idéntico
deja de celebrar al tercero — pasa a ser una espera con adorno.

Así que hay repertorio, con tres capas para que no canse:

1. **La forma significa algo.** Las cuatro categorías de acierto ya existían en
   `js/25-mensajes.js` desde el primer día —superación, descubrimiento, esfuerzo,
   procedimiento— y no se veían por ninguna parte. Ahora cada una tiene su
   coreografía. Acertar a la segunda después de haber fallado ya no se celebra
   igual que acertar a la primera.
2. **No se repite.** El grito sale de una bolsa barajada, el mismo mecanismo que
   ya impedía repetir mensaje.
3. **Hay algo que casi nunca se ve.** El bloque raro (1 de cada 20) se lleva
   `cinta-veta-madre`, la más lenta y la de más pasos. Sin algo raro no hay
   sorpresa; solo hay rotación.

Y la regla que ordena la tabla: **el espectáculo es inversamente proporcional a
la frecuencia**. El acierto de todos los días se lleva la más corta y limpia
(900 ms); las largas se reservan para el jefe, la luz extra y el bloque raro.

| Coreografía | ms | pasos | Cuándo |
|---|---|---|---|
| `cinta-sello` | 900 | 6 | acierto normal (categoría A) |
| `cinta-sube` | 1100 | 8 | esfuerzo (B) |
| `cinta-junta` | 1300 | 10 | superación (C) |
| `cinta-cascada` | 1500 | 12 | descubrimiento (D) |
| `cinta-estalla` | 1600 | 12 | logro o luz extra |
| `cinta-bandera` | 1800 | 14 | jefe derrotado |
| `cinta-veta-madre` | 2000 | 16 | bloque raro |
| `cinta-posa` | 800 | 6 | ánimo, tras fallar |
| `cinta-prisa` | 1900 | 18 | «Hurry up!», sin cambios |

**Lo que la cinta NO se lleva es lo que enseña.** El mensaje entero sigue quieto
en `#item-mensaje`: «Has pedido prestada una decena y la has deshecho bien» no se
lee de refilón, y esa frase es la única parte del mensaje que educa. La cinta
lleva un grito corto, material nuevo, de dos listas de 24 y 12. Ninguna de las
84 + 48 plantillas se ha tocado.

Nada de esto varía por color solo: cada coreografía cambia recorrido, duración y
número de pasos, y el glifo repite las dos formas de `.mensaje-resultado`.
Con `prefers-reduced-motion` o `sin-movimiento`, las nueve se paran y **las nueve
siguen viéndose**: quitar movimiento no puede quitar información.

### Un solo nodo, y ningún número duplicado

`.aviso-prisa` pasa a `.cinta--prisa`, y `#aviso-prisa` a `#cinta`. **Un solo
nodo por pantalla**: dos cintas superpuestas son ilegibles, y mientras hubiera un
nodo por aviso, evitar que coincidieran era disciplina. Ahora es imposible.

Y desaparece `CB.ui.reloj.MS_CARTEL = 1900`, que valía eso «porque es lo que dura
`prisa-cruza`», copiado a mano, con un comentario avisando de lo frágil que era.
Con nueve coreografías habrían sido nueve copias. El reparto ahora: **el CSS es
dueño de la forma** (fotogramas y número de pasos), **el JS es dueño del tiempo**
(`CB.ui.cinta.COREOGRAFIAS`). Ningún número vive en dos sitios.

La espera antes del ítem siguiente pasa a `max(la de siempre, duración + 400 ms)`.
Nunca se encoge: acortarla recortaría tiempo de lectura.

### El escalón 4, que llevaba desde la primera versión sin existir

La escalera anti-frustración declaraba **cinco** escalones. El cuarto —«volvemos
un paso atrás al prerrequisito»— estaba declarado en `2A-escalera.js`,
`CB.grafo.prerrequisitoDominado()` estaba escrita y documentada *para él*, y **no
la llamaba nadie**. El juego seguía preguntando lo que el niño no entendía, y de
ahí saltaba a retirarle el concepto.

Ahora, al cuarto fallo seguido de un concepto, se cuela por delante del guion un
ítem de un prerrequisito **ya dominado**, y se dice: «Vamos a por uno más fácil de
este mismo tema. Luego volvemos.» Se dice, en vez de cambiar el nivel en
silencio, porque un niño que ve aparecer algo mucho más fácil sin explicación
concluye que el juego se ha estropeado o que le está dando lástima.

Si no hay ningún prerrequisito dominado no se hace nada y el fallo siguiente cae
en el escalón 5, como antes. Nunca se inventa un nivel.

La decisión se extrae a `CB.partida.aplicarEscalon()` a propósito: mientras vivía
dentro del callback de la tarjeta de reparación, la única forma de comprobar el
escalón 4 era leer el código, y leer el código es exactamente como pasó varias
versiones sin implementar sin que nada se pusiera rojo.

### Pruebas: 443 → 489 comprobaciones

Nueve guardianes nuevos, **E47-E55**, y los nueve validados sembrando el fallo a
propósito y comprobando que se ponía rojo el que debía. Dos no lo hicieron a la
primera:

- **E51 estaba en verde con el fallo dentro.** Comprobaba clases y el valor de
  `_salida`, y las dos cosas sobreviven a quitar la cancelación: reasignar
  `className` repone las clases igual, y `_salida` cambia igual al programar el
  segundo temporizador. El fallo real —el temporizador de la primera cinta se
  queda vivo y esconde la segunda a media animación— solo se ve espiando
  `clearTimeout`. Y el doble se afirma instalado, por lo de `window.caches`.
- **E55 se puso rojo contra código correcto**, porque copié el umbral de la
  escalera (4) en vez de preguntárselo (es 3). Ahora se le pregunta.

Además, dos comprobaciones mecánicas nuevas en `auditar.mjs`, y la primera tapa
un agujero que abrió esta misma versión:

- **`animation-timing-function` en forma larga.** El grep de la regla dura solo
  miraba `animation:` abreviado, y el mixin `coreografia()` emite longhands. Sin
  esto, la regla del proyecto habría dejado de mirar precisamente las nueve
  animaciones más nuevas — en verde.
- **`@keyframes` que no dispara nadie.** Una animación muerta no da error: no se
  ve. Es lo que les pasó a las cinco retiradas en 1.7.0, ahí versión tras versión.

Las dos, también validadas sembrando la violación.

### Retirado

- `CB.ui.reloj.MS_CARTEL` y `CB.ui.reloj.aviso`: la cinta es dueña de lo suyo.
- El `sfx('cofre')` duplicado de `darCromo()`, que sonaba dos veces seguidas.
- El `sfx('acierto')` fijo de `trasAcierto()`: ahora el sonido lo trae la
  coreografía, y por eso una superación no suena igual que un acierto normal.
  Sin efectos nuevos: los 12 de `04-audio.js` siguen siendo doce.

---

## [1.7.1] — 2026-07-27

**Solo correcciones.** La tercera cifra, y no la segunda, porque no entra nada
nuevo; y no la primera, porque el formato del perfil guardado no cambia: E45
**añade** dos campos a `perfil.niveles[*]` (`rachaD` y `fallosD`) y un perfil que
no los traiga vale 0, que es como empezaban. Ningún niño necesita migración.

### Décima ronda: **segunda auditoría severa** (26 y 27 de julio)

Segunda pasada de búsqueda de fallos, esta vez leyendo el motor y el bucle de
juego línea a línea en vez de las herramientas. Salieron **siete**, y los siete
estaban en verde: 56 comprobaciones de auditoría, 405 de suite y cero clases
descuadradas, todas correctas y ninguna mirando hacia donde estaba el problema.

**El que cuelga la pestaña**

- **E40 · bucle infinito en el combate contra Cristalina.** `CB.jefes.opciones()`
  completa hasta cuatro botones cuando los distractores propuestos no llegan, y
  calculaba el candidato como `correcta + lista.length` **dentro** del `while`:
  si ese número ya estaba en la lista no se añadía nada, la longitud no cambiaba
  y la vuelta siguiente calculaba exactamente el mismo candidato. Barrido
  exhaustivo del espacio real de la mecánica «reflejo»: **1,29 % de los turnos,
  es decir el 22,9 % de los combates**. Y como el rng va sembrado con
  perfil + mundo + fecha, al niño al que le toca le vuelve a tocar cada vez que
  lo reintenta ese día: «se cuelga en Cristalina», todos los días, hasta mañana.
  Sin error en consola y sin nada que mirar. Es el único `while` del proyecto que
  no llevaba tope.

**Lo que falseaba la medida**

- **E41 · todos los problemas de enunciado medían 0 ms.**
  `CB.partida.marcarLectura()` existía, estaba bien escrita y **no la llamaba
  nadie** salvo `responder()`, o sea el instante exacto de contestar. Medido en
  navegador: 3.743 ms reales de lectura y razonamiento → rt registrado **0**. Con
  eso, el multiplicador de tiempo salía siempre 1,4 —el tope— y con él las 3
  gemas de bono por rapidez en **todos** los problemas, tardara lo que tardara: la
  familia que más cuesta era la que más premiaba. El informe del adulto daba 0 ms
  en los 20 subtipos. Y en el antiazar, rt = 0 dispara S1 siempre, así que tres
  problemas fallados seguidos añadían S3 y **el niño que lee despacio quedaba
  marcado como que responde al tuntún** — con el rt de verdad, cero señales.
- **E45 · la dificultad interna `D` solo sabía bajar.** `CB.almacen.sanear()`
  descarta por diseño toda clave que empiece por `_`, y los contadores de
  `actualizarD` se llamaban `_racha` y `_fallos`: se borraban en cada guardado
  mientras que `D` sí se guardaba. Subir exigía tres aciertos seguidos del mismo
  nivel **dentro de una sola sesión** (y una partida sirve como mucho tres ítems
  del mismo nivel); bajar bastaban dos fallos, y además persistía. Un niño que
  mejora se quedaba con los ítems fáciles de su peor día.

**Lo que no respondía**

- **E42 · tres de las cuatro pistas de mundo no sonaron nunca.**
  `claveDePantalla()` leía `CB.partida.estado.mundoId`; el estado que monta
  `iniciar()` guarda `mundo`, el objeto. `mundoId` es el nombre del *parámetro*
  de `iniciar({mundoId:…})`, y ahí se quedó. Bosque, río y mina no sonaron jamás
  y toda expedición sonaba a pradera: no hay error, no hay silencio, suena
  música, solo que siempre la misma. **Su test lo daba por bueno porque construía
  el estado a mano con la forma equivocada, copiada de la línea del fallo.**
- **E43 · la barra de partida solo respondía en el borde.** `conectarBarra` leía
  `data-accion` de `ev.target`, y los cuatro botones llevan dentro los dos
  `<span>` que exigen E15/E16 (icono y palabra visible). El toque cae en el span,
  que no tiene el atributo. Pista, Pausa, Sonido y Salir no hacían nada salvo que
  se acertara en los pocos píxeles de padding — y el botón se hunde igual, porque
  eso es CSS. `31-pantallas.js` ya subía por el árbol para `data-ir` desde 1.0.0.

**Reglas que solo se aplicaban a la mitad**

- **E44 · el cerrojo de una respuesta solo estaba en la partida.** E11 lo arregló
  en `CB.partida.responder` y dejó escrito el porqué; los otros dos sitios donde
  se contesta se quedaron sin él. En el jefe los botones viven los 900 ms de la
  animación: **cinco toques, cinco bloques**, y ocho derriban al jefe entero antes
  del segundo turno. En la calibración viven los 1.300 ms del mensaje: **cinco
  toques dan cinco aciertos sobre cuatro ítems**, y esos cuatro aciertos son lo
  único que fija `trimestreDeducido`, o sea el techo de números de todo el juego.
- **E46 · Enter se saltaba la confirmación doble del antiazar.** La rama de Enter
  llamaba a `alResponder` directamente en vez de pasar por `pulsa('OK')`, que es
  quien consulta `pedirConfirmacion()`. La medida se le aplicaba a quien juega
  tocando y no a quien juega con teclado. F8 pide poder jugar una partida entera
  solo con teclado; lo que no pide es que el teclado tenga otras reglas.

**Además**

- `CB.partida.accionDe()` sale del oyente de la barra y pasa a ser función propia:
  se puede comprobar sin instalar un oyente de documento en la suite, que además
  se quedaría puesto y contaría doble en la segunda ejecución.
- `trasFallo` calculaba `CB.escalera.siguienteEscalon()` en una variable que no
  leía nadie y volvía a escribir los umbrales a mano más abajo — dos
  implementaciones de la misma escalera, y probada solo la que no se usaba. Ahora
  decide `CB.escalera`. El escalón 4 sigue sin implementación, pero ahora se ve.
- Suite: **405 → 443** comprobaciones. Los siete guardianes se validaron
  **volviendo a meter cada fallo** y comprobando que el suyo se pone rojo; E40 se
  barrió aparte, en Node y contra el bundle construido, porque su modo de fallo
  es colgarse y una suite colgada no es roja.
- Dos de los guardianes nuevos nacieron en falso verde y hubo que rehacerlos: uno
  afirmaba sobre el **texto fuente** de una función y su propio comentario nuevo
  contenía la palabra buscada; el otro tecleaba antes de que expirase el bloqueo
  de construcción, así que «el primer Enter no contesta» pasaba porque no había
  nada escrito. Los dos son la misma lección que este proyecto lleva tres rondas
  aprendiendo, ahora también dentro de las pruebas.

---

## [1.7.0] — 2026-07-26

### Novena ronda: **limpieza y auditoría severa** (26 de julio)

Repaso posterior a la migración, con dos encargos: quitar lo que sobra y buscar
fallos en serio. Salieron **nueve**, y el patrón que los une es que **casi todos
estaban en verde**.

**Fallos de comportamiento**

- **E37 · «Listo: las 9 pistas están guardadas» sin haber guardado ninguna.**
  `descargarMusica()` avanzaba el contador igual al acertar y al fallar, y luego
  informaba `ok: true` mirando solo si había terminado. Con las nueve pistas
  caídas —un 404, el servidor apagado a media descarga— el panel del adulto daba
  por buena una descarga vacía. Quien lo lee es quien decide si puede llevarse la
  tableta a un sitio sin wifi.
- **E38 · una cuarta copia de la lista de música.** Los nombres de los nueve mp3
  estaban escritos a mano en `45-offline.js`; las otras tres copias
  (`dist/audio/`, la tabla de `07-musica.js`, `CREDITOS.txt`) sí las cruzaba la
  auditoría entre sí. Su modo de fallo era invisible **por partida doble**:
  renombrar un fichero dejaba la música sonando con normalidad y solo rompía la
  descarga sin conexión, que además informaba de éxito por culpa de E37. Ahora
  las rutas salen de `CB.musica`, su dueño único.
- **`gulp dev` vigilaba 10 de los 12 `.scss`.** Fuera quedaban el punto de
  entrada y `_herramientas.scss`, o sea **el fichero donde viven todos los
  mixins**: el sitio que más se toca al ajustar el diseño era el único que no
  reconstruía al guardar. El síntoma no es un error, es que la pantalla no
  cambia — que se lee como «el mixin no funciona».

**Guardianes que no guardaban** (E39). Las tres reglas duras de estilo tenían
cuatro huecos, todos por la misma causa: **cero se escribe de muchas maneras y
el regex solo conocía una**.

| se colaba | por qué |
|---|---|
| `border-radius: 0.5rem` | el filtro que perdona el cero casaba con el **cero inicial** de «0.5rem» |
| `box-shadow: 0 0 4px` | exigía `px` en los desplazamientos, y en CSS el cero no lleva unidad |
| `box-shadow: inset 0 0 8px` | lo mismo, y todo el relieve del juego es inset |
| `transition: opacity 90ms` | no nombra ninguna función — y la **función por defecto en CSS es `ease`** |

Ninguno escondía una violación real: el CSS estaba limpio. Lo que fallaba era la
garantía, no el resultado. Los detectores se reescribieron leyendo declaración a
declaración y capa a capa, y la **autoprueba pasó de 4 casos a 16**: antes cubría
tres greps del bloque 2 y **ninguno** del bloque 3 — justo donde estaban los
cuatro agujeros.

Además: el grep de colores excluía `_herramientas.scss` **por accidente** —
heredaba la exclusión puesta para `transition:` — mientras el verde afirmaba
«todos con nombre en `_variables.scss`»; y la comprobación del aviso de girar
exigía que **ningún** `max-width` del proyecto pasara de 300px, así que el primer
punto de ruptura legítimo habría tumbado la construcción con un mensaje sobre
otra cosa.

**Dos verdes falsos en la propia prueba nueva**, encontrados sembrando el fallo a
propósito para ver si el guardián se ponía rojo:

1. El ejecutor llamaba a `s.fn()` y pasaba a la siguiente suite **en el mismo
   turno**. Cualquier comprobación sobre algo asíncrono se escribía como «si
   todavía no ha llegado, pasa» — o sea, pasaba siempre. Ahora una suite puede
   devolver una promesa y la cadena la espera.
2. `window.caches = doble` **no hace nada**: es una propiedad definida solo con
   getter y en modo no estricto la asignación se pierde en silencio. La prueba
   medía la CacheStorage real, donde las nueve pistas fallan igual por 404 — y
   salía verde midiendo otra cosa. Lo destapó su complementaria, la del camino
   bueno, imposible de satisfacer con la caché real.

**Referencias colgando**

- `dist/js/cubomatica.min.js` y `.min.css` terminaban con un `sourceMappingURL`
  hacia dos ficheros que `.gitignore` excluía. Con `dist/` versionada, eso está
  roto en **todos** los clones salvo el que acaba de construir. Se dejan de
  emitir: la depuración ya la cubre mejor `dist/js/cubomatica.js`, que no es una
  reconstrucción aproximada sino las fuentes pegadas byte a byte.
- `LICENCIAS-TERCEROS.md` —que **sí se distribuye**— apuntaba a
  `css/00-fuentes.css`, que dejó de existir en la migración. Igual en los tres
  ficheros de `docs/licencias/` y en `CLAUDE.md`.
- `pruebas/mapa-bem.json` afirmaba que «lo verifica el bloque 8 de la auditoría».
  No lo hace ni lo ha hecho nunca. No se ha arreglado haciendo que lo lea, porque
  un guardián así sería un generador de falsos rojos: `valor`, `dato`, `grupo`,
  `etiqueta` y `entra` son palabras corrientes que salen por todo el código sin
  ser clases — que es justo por lo que el codemod trabajaba sobre el AST. Quien
  cubre ese fallo de verdad es `cruzar-clases.mjs`.
- `.gitignore` reservaba `pruebas/vendor/` para **axe-core, que nunca se añadió**:
  la fase 7 se entregó sin él y la accesibilidad se comprueba con `casos-a11y.js`
  escrito a mano. Y apartaba `.vscode/`, con lo que la corrección que apunta Live
  Server a `dist/` —necesaria justo porque `src/index.html` dejó de ser
  servible— vivía en un solo ordenador mientras todo el que clonara caía en la
  trampa que creó la migración.

**Borrado**, con la evidencia de que nadie los usa:

| fichero | por qué |
|---|---|
| `herramientas/comparar-css.mjs` | de un solo uso; probó la fidelidad CSS→SCSS de las fases 3 y 4 y ya no hay CSS de 1.6.0 contra el que comparar |
| `herramientas/renombrar-bem.mjs` | codemod aplicado e irreversible; volver a pasarlo solo puede hacer daño |
| `pruebas/sin-comentarios.py` | la auditoría en Node lleva su propio despiece desde 1.7.0 |
| `pruebas/fixtures/perfilV1.json` | ningún código lo lee, y ninguno **puede**: sin `fetch` en `file://`. La prueba de migración usa un objeto en línea |

**Suite**: 394 → **405** comprobaciones, 0 fallos, en los dos bundles.
**Auditoría**: 56 comprobaciones, las mismas de antes — lo que cambia no es cuántas son, sino que tres de ellas comprueban de verdad lo que dicen. La autoprueba pasa de 4 casos a 16.

Queda anotado, porque no se ha tocado: el service worker responde a una petición
con rango (`Range`) devolviendo la respuesta completa de 200 que hay en caché.
Chrome lo tolera; **Safari es donde esto suele romper la reproducción**, y Safari
sigue sin probarse.

### Octava ronda: **el cambio de stack**

Otro stack: **HTML + SCSS con BEM + Sass + JS vanilla + Gulp 5**, con `dist/`
minificada, responsive en cinco puntos de anchura, accesibilidad completa y caché
sin conexión.

Nada de eso convivía con «no hay compilación», que era la premisa de la que
salían todas las decisiones anteriores. Así que el objetivo real no fue añadir
Gulp: fue **trasladar las invariantes existentes a la forma nueva sin perder ni
una**. La auditoría tenía que seguir siendo una puerta.

**Lo que NO cambia**, y es la decisión que gobierna el resto: `dist/index.html`
se abre con **doble clic** desde `file://`, igual que antes. `dist/` se versiona
en git para que «clona y juega» siga siendo verdad sin instalar nada.

### El paso de construcción

- **Gulp 5** con `sass-embedded`, `terser` y `cssnano`. `npm run entregar` =
  construir + auditar, y esa es la puerta.
- **`manifiesto.json` es la fuente única del orden de carga.** Vivía en tres
  sitios a la vez y `CLAUDE.md` tenía que pedirle al humano que los
  sincronizara. Lo consumen el gulpfile, el HTML, las dos páginas de pruebas y
  la auditoría.
- **Las fuentes se mudan a `src/`** (58 renombrados detectados por git, historial
  intacto) y los nueve MP3 a `dist/audio/`, que es su única casa.
- **Dos bundles**: uno legible, idéntico byte a byte a la concatenación del
  manifiesto, y uno minificado. Terser va con `ecma: 5` y sin manglear el nivel
  superior ni las propiedades — lo segundo reescribiría las claves de
  `localStorage` y dejaría ilegible el perfil guardado de todo niño.
- **La suite prueba lo que se entrega**: `pruebas.html` contra el bundle legible
  y `pruebas-min.html` contra el minificado, que es lo que valida terser entero.

### SCSS con BEM

- Los nueve `.css` pasan a parciales `.scss`, **conservando los nombres
  numerados**: la numeración *es* la cascada, y `_06-biomas.scss` documenta que
  su `position: relative` gana por venir después.
- **`bisel()` y `paso()` no tienen parámetro** de desenfoque ni de curva. Dos
  reglas que se cumplían por disciplina pasan a ser imposibles de romper.
- Mapas y bucles: 39 colores decorativos, 6 cielos, 8 texturas, 4 biomas (que se
  escribían dos veces), 6 estados de veta.
- **43 clases renombradas a BEM**: de **cero** `bloque__elemento` a **29**. Y de
  **20** selectores por `#id` a **cero**.
- Los 42 colores sueltos repartidos por cinco hojas pasan a tener nombre.

### Responsive

Cinco puntos de anchura (480/768/1024/1200/1400) que **no se pelean** con los
cinco de altura que ya existían: la anchura decide columnas, la altura decide el
lado del botón, y cuando las dos opinan gana el `min()` de las dos. Pasos
discretos de 64/80/96/112/128 px — nada de `clamp()`, que rompería la retícula
de 4 px.

### Accesibilidad

- Las 17 pantallas pasan a ser **regiones con nombre**; sin él no eran landmarks.
- **Dos regiones vivas**: la educada y la urgente. Lo que caduca ya no se lee
  detrás de la cola.
- `prefers-contrast: more` y `forced-colors`, con el relieve traducido a bordes.

### Sin conexión

Service worker que **falla en silencio en `file://`** y no ensucia la consola.
Precache del armazón (~300 KB); la música (42 MB) solo por botón explícito en el
panel del adulto, pista a pista y con cancelación.

### La auditoría

Reescrita en Node: de 400 líneas de shell a 24 más un `.mjs` sin una sola
dependencia. `auditar.bat` cubría cinco de los ocho bloques y ahora cubre los
ocho. Con **autoprueba**: comprueba que ve lo que dice que ve.

### Once fallos encontrados (E25–E36)

| | |
|---|---|
| **E25** | El ajuste «sin movimiento» del juego apagaba 11 animaciones y el del sistema 21. Quien lo apagaba desde los ajustes seguía viendo diez. |
| **E26** | Con `node_modules` la auditoría no se ponía roja: **se colgaba**, que es peor. |
| **E27** | La leyenda del informe decía **«●਍ominado»**: un escape CSS se comía la primera letra de cada palabra. Llevaba así desde el principio. |
| **E28** | Una clase renombrada en el CSS y no en el JS no da ningún error. |
| **E29** | Estilar por `#id` ata el estilo a un nodo único; había veinte, y uno con **dos**. |
| **E30** | Anchura y altura habrían competido por el lado del botón. |
| **E31** | «Gira el dispositivo» a 319 px, y a zoom 400 % el viewport es 320 justos. |
| **E32** | Las 17 secciones no tenían nombre accesible. |
| **E33** | Lo urgente y lo festivo compartían región viva. |
| **E34** | Registrar el worker en `file://` ensuciaba una consola limpia. |
| **E35** | El worker cachearía la propia suite. |
| **E36** | La lista negra nunca escaneó los `.mjs`: `*.js` no casa con `.mjs`. |

Y **un mecanismo que se puso y se quitó**: un enlace «Ir a la respuesta» añadido
dando por supuesto que había que tabular por la barra de herramientas antes de
llegar a los números. Se comprobó el DOM y es al revés. Se retiró: un mecanismo
de accesibilidad cuyo motivo declarado es falso parece trabajo hecho y no lo es.

### Números

| | 1.6.0 | 1.7.0 |
|---|---|---|
| Comprobaciones | 365 | **394** |
| Fallos registrados | E1–E24 | **E1–E36** |
| Guiones | 44 | 45 |
| `bloque__elemento` | 0 | 29 |
| Selectores por `#id` | 20 | 0 |
| `min-width` | 0 | 5 |
| Descarga de arranque | ~800 KB | **319 KB** |


## [1.6.0] — 2026-07-25

Séptima ronda: **la auditoría de si se entiende**. Todo lo de aquí abajo salió
de que alguien usara el juego, no de leer código. Las seis rondas anteriores
comprobaron que el código cumpliera la especificación —y la cumplía— pero nadie
había comprobado si un humano entiende lo que está pasando delante de él.

Los siete defectos comparten causa: **el juego hacía lo correcto y no lo
contaba**.

### Corregido

- **El botón de la portada prometía lo que no iba a pasar.** Decía siempre
  «JUGAR» y la primera vez llevaba a cuatro preguntas de colocación sin reloj,
  sin luces y sin puntos. Ahora `CB.arranque.rotuloJugar()` decide: **EMPEZAR**
  sin calibrar, **SEGUIR JUGANDO** con partida a medias, **JUGAR** el resto. Y
  debajo, una línea dice qué viene. (E21)
- **Los mensajes se escribían en una pantalla oculta.** `CB.ui.mensaje()` iba
  siempre a `#item-mensaje`, que vive dentro de la pantalla de partida; durante
  la calibración esa pantalla está oculta, así que el «¡Muy bien!» de cada una
  de las cuatro preguntas se escribía donde nadie podía verlo. Cuatro preguntas
  seguidas sin una sola reacción. (E22)
- **La calibración terminaba en silencio.** Contestabas la cuarta y aparecías en
  el mapa, sin que nadie dijera que aquello era la preparación ni que el juego
  empieza ahora. Descrito así por quien lo probó: «empiezas con una demo y no
  avisa que es una demo». (E23)
- **La pausa aterrizaba en un menú de configuración.** «Pausa» llevaba a una
  pantalla titulada «Ajustes», con cinco opciones y la vuelta al juego en el
  último sitio de la lista. Ahora se llama **«En pausa»** y «◀ Seguir cavando»
  es el primer botón. El flag `desdePausa` ya se pasaba y no lo usaba nadie. (E24)
- **El juego no contaba su propia regla de las luces.** Al primer fallo no pasaba
  nada visible y parecía que no se enteraba de los errores; y la luz se apagaba
  en el HUD mientras se miraba la reparación, sin causa aparente. Dos frases:
  «Te queda otro intento» y «Se ha apagado una luz. Te quedan N». La regla no
  cambia. (E20)
- **Una recarga costaba la partida.** `pagehide` ya la guardaba y
  `reanudarGuardada()` ya existía; faltaba la vuelta automática. Si al arrancar
  hay una partida guardada hace menos de un minuto, se reanuda sola. (E18)
- **La calibración no decía lo que era.** Su `<h1>` era invisible. Ahora lleva
  título visible y «Pregunta N de 4 · Sin reloj y sin puntos». (E19)

### Añadido

- **`.vscode/settings.json`**: configuración de Live Server para este proyecto,
  para que guardar un fichero no tire la partida de quien está jugando.
- **Campo `partidaEnCurso.guardadaTs`**: `iniciadaTs` decía cuándo EMPEZÓ la
  partida, no cuándo se guardó, y con una partida de diez minutos la distinción
  es justo la que importa.

### Verificado jugando

Recorrido completo —portada, minero nuevo, calibración, mapa, cantera,
expedición entera, fin, otra expedición y pausa— con **cero errores de consola**:
acertar suma gemas; fallar dos veces lleva a la reparación, que exige tocar los
tres pasos; al confirmarla se apaga una luz de verdad y el HUD la pinta en gris;
la expedición termina con gemas, bono y lo dominado; «Otra expedición» encadena.

### Contratos

- Base de comprobaciones: **347 → 365**, determinista, 0 fallos.
- Guardianes nuevos en `pruebas/casos-regresiones.js`: E20, E21, E22, E23, E24.

## [1.5.0] — 2026-07-25

Sexta ronda: **la primera que se hizo mirando la pantalla en vez de leyendo el
DOM**. Las cinco anteriores comprobaron lógica, contratos, contrastes y
accesibilidad, y ninguna vio nada de lo que hay aquí abajo. Salió todo de una
captura de pantalla enviada por quien lo estaba usando.

### Corregido

- **El botón «Leer» de la calibración no hacía nada.** `accionLeer()` sale por
  su primer `return` si no hay `CB.partida.estado`, y la calibración no crea
  ninguno a propósito (sin reloj, sin luces, sin puntuación, para que no parezca
  un examen). Era el botón de «vuélvemelo a leer» en la primera pantalla de la
  vida del niño, y estaba muerto. (E14)
- **El botón de silencio no reflejaba el silencio.** Se actualizaba solo el
  botón pulsado, de los dos que hay; el ajuste guardado se restauraba al
  arrancar sin que ningún icono se enterara —silencio real con icono de altavoz
  encendido— y `aria-pressed` no existía hasta el primer clic. (E15)
- **Los botones de la barra no se entendían.** «Leer en voz alta» y «Silenciar»
  eran dos altavoces casi idénticos. Ahora todos llevan **icono y palabra**
  (`🔊 Leer`, `💡 Pista`, `⏸ Pausa`, `🔈 Sonido`): un dibujo de 26 px no dice
  qué hace un botón, y cambiar de emoji solo cambia de qué se duda. (E16)
- **La calibración era la única zona de juego sin paisaje.** `<div
  class="zona-juego">` a secas, sin bioma ni cielo: un rectángulo marrón liso
  justo después de una portada con nubes y hierba. (E17)

### Añadido

- **`.vscode/settings.json`** con la configuración de Live Server para este
  proyecto: ignora los cambios que no tienen por qué interrumpir a quien juega
  (`docs`, `pruebas`, `audio`, `*.md`) y deja que el CSS se inyecte en caliente
  sin recargar.
- **Una recarga ya no se lleva la partida.** `pagehide` ya la guardaba; faltaba
  la vuelta. Si al arrancar hay una partida guardada hace menos de un minuto
  —lo único que cabe ahí es una recarga— se reanuda sola. Pasado ese minuto se
  aterriza en la portada y JUGAR sigue ofreciendo reanudar durante 24 h. (E18)
- **La calibración explica lo que es.** Su `<h1>` era `solo-lectores`, o sea
  invisible: cuatro preguntas sueltas, sin título, sin saber cuántas eran y sin
  reloj. Ahora lleva título visible y «Pregunta N de 4 · Sin reloj y sin puntos:
  solo para saber por dónde empezar». (E19)

### Retirado

- **El botón «Leer en voz alta» de la barra**, a petición expresa. Estaba en la
  calibración y en la partida. La lectura del enunciado **no desaparece**: la
  consigna se sigue leyendo sola al aparecer, y la tecla `L` la repite. Lo que
  se va es el botón.

### Corregido en las pruebas

- **Dos comprobaciones de música dependían de que la ventana tuviera el foco.**
  `aplicarVolumenes()` no reanuda si `document.hidden`, que es lo correcto, pero
  las pruebas lo leían del navegador real: daban rojo sobre código bueno en
  cuanto alguien miraba a otro sitio. Ahora la visibilidad se fija a mano y se
  comprueban **las dos** ramas.
- **`CB.pruebas.ejecutar()` no tenía cerrojo.** Las suites se encadenan con
  `setTimeout`, así que una segunda llamada no cancelaba la primera: las dos
  cadenas escribían en el mismo sitio y sumaban en el mismo contador. Se veían
  23 cajas para 15 suites y 541 comprobaciones donde hay 340 — y parecía que la
  suite no era determinista, que es la conclusión más cara posible. Basta con
  pulsar dos veces «Suite rápida».
- **La barra de herramientas no existía en `pruebas.html`.** Esa es la causa
  única de que cinco rondas no vieran E14, E15 ni E16: no se puede probar lo que
  no está en la maqueta. Ya está, con su paisaje, en las dos pantallas que la
  llevan.

### Contratos

- Base de comprobaciones: **329 → 347**, determinista, 0 fallos.
- Guardianes nuevos en `pruebas/casos-regresiones.js`: E14 a E19.

## [1.4.0] — 2026-07-25

Quinta ronda: logros, borrado de perfil e impresión.

### Corregido

- **Ctrl+P desde cualquier pantalla imprimía un folio en blanco.** La hoja de
  impresión hace que el informe se imprima siempre, se esté donde se esté, y
  hasta generarlo el contenedor está vacío. Ahora trae una línea que dice dónde
  se genera.

### Verificado y correcto

- **Los tres logros que dan vida extra funcionan de punta a punta** (requisito 10
  del encargo): están declarados, sus eventos se disparan con el contexto que
  necesitan, y conceden la luz de verdad. Bien acotados además: tope de 2 por
  partida, sin cobrar dos veces, y con reserva al llegar al tope de 5.
- **El borrado de perfil** exige escribir BORRAR y deja índice, disco,
  `ultimoPerfil`, perfil activo y bloqueo del panel coherentes.
- **La hoja de impresión**: A4, blanco y negro forzados, sin HUD ni botones ni
  decoración, tamaños en puntos y `break-after: avoid` en los encabezados.
- **329 comprobaciones**, 0 fallos.

---

## [1.3.0] — 2026-07-25

Cuarta ronda: el fallo que falseaba las mediciones del juego.

### Corregido

- **Machacar OK registraba una respuesta por pulsación.** Los botones no se
  deshabilitan al responder, así que seis toques daban seis respuestas y 18
  gemas en vez de 3. Lo grave no eran las gemas: cada toque metía una
  observación más en el motor adaptativo y un intento más en el informe del
  adulto. Machacar el botón es lo que hace un niño de 7 años cuando la respuesta
  le sale sola.
- **Pasar el objeto de destreza en vez de su nombre creaba una destreza basura**
  llamada `[object Object]` en el perfil del niño, sin que nada se quejara.

### Añadido

- **`pruebas/casos-regresiones.js`**: registro único de los doce fallos ya
  corregidos, con el guardián de cada uno. La regla que declara es que un fallo
  corregido sin prueba vuelve.
- **326 comprobaciones**, 0 fallos, en suite rápida y larga.

### Verificado y correcto

- El perfil guardado se estabiliza en 241 KB tras un curso escolar entero; en
  modo aula, 54 KB por niño y 1,58 MB para treinta.
- En 3000 ítems por perfil, el motor nunca se queda sin candidatos y converge
  sin saturar al 80 % de acierto, que es su objetivo de diseño.

---

## [1.2.0] — 2026-07-25

Tercera ronda: compatibilidad con Safari, Firefox e iPad.

### Corregido

- **En iPad la música no se podía silenciar.** En iOS, `HTMLMediaElement.volume`
  es de solo lectura: asignarle un valor no hace nada. Como todo el reproductor
  se apoyaba en esa propiedad, en un iPad —objetivo declarado del proyecto—
  silenciar el juego no silenciaba la música, los tres niveles de volumen sonaban
  igual, el fundido cruzado dejaba dos pistas a la vez a todo volumen y el
  agachado durante la voz no funcionaba. Ahora se detecta el aparato y, cuando el
  volumen está bloqueado, se usa parar y reanudar.

### Añadido

- **`pruebas/comprobar-doble-clic.html`**: se abre con doble clic y comprueba en
  el sitio lo único que solo puede comprobarse ahí — que el navegador deja
  guardar el progreso, que las texturas se generan y que las nueve pistas de
  música se leen desde `file://`. Si se abre por `http`, lo dice en vez de dar un
  veredicto falso.
- **315 comprobaciones**, 0 fallos.

### Revisado y correcto

Ni una API por encima de la línea base declarada (Chrome/Edge 100+, Firefox 100+,
Safari 15.4+): cero `?.`, cero `??`, cero campos privados, y en CSS ni `:has()`,
ni `@container`, ni `color-mix`, ni unidades `dvh`. Ya estaban resueltos el
prefijo `webkitAudioContext`, `-webkit-clip-path`, `touch-action: manipulation`,
la regla de guarda `[hidden]` y el modo privado de Safari.

---

## [1.1.0] — 2026-07-25

Segunda ronda de auditoría: accesibilidad, pantallas pequeñas y datos.

### Añadido

- **Restaurar copia (.json)** en el panel del adulto. `validarImportado()`
  existía, estaba probado y **no lo llamaba nadie**: se podía sacar una copia
  del progreso y no se podía volver a meter, que es justo lo que el README
  recomienda hacer cada trimestre. Exportar sin importar es un botón que promete
  algo que no cumple.
- Encabezado en **partida, calibración e informe**, que no tenían ninguno. Sin
  `<h1>`, `CB.pantallas.ir()` no encontraba dónde llevar el foco y lo dejaba en
  `<body>`, y quien navega por encabezados con un lector de pantalla no sabía
  que había cambiado de sitio. Van con una clase que los muestra al lector y no
  ocupa espacio en pantalla.

### Corregido

- Las tarjetas de mundo del mapa saltaban de `<h1>` a `<h3>`, rompiendo la
  navegación por encabezados.
- La maqueta de `pruebas/pruebas.html` no tenía encabezados: comprobaba una
  estructura que no se parecía a la del juego.

### Verificado y correcto

- **Cero controles sin nombre accesible** en las 17 pantallas.
- **Partida completa solo con teclado**: flechas por la rejilla, dígitos, OK y
  avance hasta la micropausa, sin tocar el ratón.
- **Viewport pequeño**: a 760 × 463 no se sale ningún botón y todos miden
  64 × 64. Por debajo de 420 px de alto salta el aviso de girar el dispositivo.
- **Ida y vuelta de exportar/restaurar idéntica** tras borrar el navegador
  entero.
- **Importación hostil neutralizada**: HTML en el mote, inyección CSS en el
  color, `../../etc/passwd` en el identificador y un array de 50.000 entradas.
- **308 comprobaciones, 0 fallos, deterministas.**

---

## [1.0.1] — 2026-07-25

Auditoría de errores. Cinco defectos, todos convivían con la suite en verde.

### Corregido

- **El botón de la llave abría la pantalla de error en vez del panel del
  adulto.** El handler de entrada a `p-adulto` navegaba a su propia pantalla y
  desbordaba la pila. El panel —ajustes, informe imprimible, exportación y los
  interruptores de tablas del 6 al 9, céntimos y doble llevada— **nunca había
  sido accesible**. `CB.pantallas.ir()` lleva ahora un cerrojo de reentrada para
  que la misma clase de fallo no pueda repetirse en otra pantalla.
- **El efecto de toque prematuro se multiplicaba.** El oyente se registraba una
  vez por ítem sobre un nodo permanente: en el ítem 12 sonaba once veces a la
  vez, y a más juego, más fuerte.
- **Un perfil dañado dejaba el botón JUGAR inerte y mudo.** Leer un perfil
  ilegible devolvía lo mismo que leer un perfil inexistente. Ahora se distinguen
  y el aviso sale en la lista de perfiles, donde el adulto puede hacer algo.
- **El «fin amable» a los 6 tiempos agotados era inalcanzable** y una prueba lo
  daba por bueno bajo el rótulo `SALVAGUARDA`. El comportamiento real es
  correcto —a los 3 tiempos se quita el reloj— pero ahora la prueba lo dice.
- **La auditoría de estilo grepeaba el CSS con los comentarios dentro**, así que
  un comentario que documentaba una prohibición la hacía saltar.

### Añadido

- Se entra de verdad en las 16 pantallas navegables en cada ejecución de la
  suite. Antes solo se comprobaba que las `<section>` existieran.
- Lista cerrada de los doce auxiliares globales del proyecto: sin módulos, un
  nombre repetido en un fichero nuevo pisaría al anterior en silencio.
- **382 comprobaciones** (antes 295), 0 fallos.

---

## [1.0.0] — 2026-07-25

Primera versión completa y jugable. Se abre con doble clic sobre `index.html`,
sin instalación, sin servidor, sin red y sin datos personales.

### Contenido

- **92 niveles** repartidos en **4 mundos**: 16 de numeración, 16 de sumas,
  14 de restas, 10 de iniciación a la multiplicación, 20 de problemas de
  enunciado, 8 de dinero y 8 de vocabulario matemático.
- Los **20 niveles de problemas** cubren una estructura semántica cada uno
  —cambio, combinación, comparación e igualación, con la incógnita en distintas
  posiciones—, que es lo que permite distinguir «falla las restas» de «no
  comprende este tipo de problema».
- Alcance curricular declarado sobre el **bloque A (sentido numérico)** y, de
  forma transversal, el **bloque F (socioafectivo)** de los saberes básicos del
  primer ciclo del **RD 157/2022** (BOE núm. 52, de 2 de marzo de 2022). Los
  bloques B, C, D y E se declaran expresamente **no cubiertos**.
- **84 mensajes de enhorabuena y 48 de ánimo**, sin repetir el mismo dos veces
  seguidas. **120 motes**, **60 objetos de colección** y **48 términos** de
  diccionario.

### Motor

- **Motor adaptativo por destreza** (13 destrezas, no por nivel): regla de tasa
  objetivo al 80 % de acierto, banda de dificultad por debajo de la competencia
  estimada, y repaso espaciado con curva de olvido y cajas de Leitner.
- **Puntuación que valora el tiempo sin castigarlo**: la rapidez suma un bono
  que se enseña al acertar, nunca resta.
- **Detección de respuesta al azar**: exige dos señales concurrentes y una
  respuesta correcta rápida nunca se marca como azar. No puntúa, pero tampoco
  apaga una luz ni acusa al niño de nada.
- **Tres luces de casco** en lugar de vidas. Se apagan solo al segundo fallo del
  mismo ítem: ni el tiempo agotado ni el azar apagan ninguna. Al perder las tres
  se conserva el 100 % de las gemas y todo el progreso.
- **Luces extra** por tres logros bonus alcanzables dentro de una misma partida.
- **Tarjeta de reparación** con seis explicadores paso a paso, con puerta de
  interacción real: hay que recorrer los tres pasos, no esperar a que se
  habilite un botón.
- **Escalera anti-frustración de 5 escalones**, con un quinto escalón para el
  cuarto fallo seguido del mismo concepto.

### Presentación

- Estética de mundo de cubos generada **íntegramente por código**: texturas con
  `canvas`, sprites como mapas de píxeles y 12 efectos de sonido sintetizados
  con Web Audio. Cero ficheros de imagen y cero ficheros de fuente.
- **Nueve pistas de música** de fondo, una por mundo más el tema principal, con
  fundido cruzado al cambiar de pantalla, normalización de volumen por pista y
  puntos de bucle medidos para no meter silencio al dar la vuelta.
- **Cuenta atrás de 30 s por ítem** con reloj de arena de bloques y aviso
  «Hurry up!» a los diez segundos.

### Accesibilidad

- **WCAG 2.2 AA / EN 301 549**: contraste medido par a par sobre las variables
  CSS calculadas, nunca color como único canal, foco de dos tonos, botones de
  96 × 96, lectura en voz alta, letra grande y respeto a
  `prefers-reduced-motion`.
- El límite de tiempo se puede **desactivar por completo** desde el modo «Sin
  prisa», como exige la WCAG 2.2.1.

### Privacidad

- Cero red, cero cuentas, cero analítica y cero datos personales. El niño se
  identifica con un mote de una lista cerrada de 120, nunca con su nombre real.
  Todo el progreso vive en el `localStorage` del navegador.

### Verificación

- **295 comprobaciones automáticas** en `pruebas/pruebas.html`, incluidos los
  30 casos exactos de la fórmula de puntuación y las 8 comprobaciones
  curriculares CU1-CU8.
- **`pruebas/auditar.sh`**, la auditoría que bloquea la entrega: frontera de
  arquitectura, reglas de estilo, cero activos externos no declarados, contrato
  de carga y presupuesto de peso.

### Pendiente para una versión futura

Dos fases del plan siguen sin hacer porque necesitan niños, no código:
el **pilotaje de papel** con 3 niños y la **calibración de campo** con 10-15,
que es la que convertiría los valores `betaBase` actuales —una calibración
razonada— en una medida. Está explicado en `docs/mapa-curricular.md`.
