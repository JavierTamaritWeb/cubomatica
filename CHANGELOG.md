# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado semántico: la primera cifra sube solo cuando cambia el formato del
perfil guardado, porque eso obliga a migrar `js/01-almacen.js` y es lo único
que puede romperle el progreso a un niño.

La versión de referencia es `CB.VERSION` en `js/00-nucleo.js`. Este fichero y
`README.md` la repiten, y `pruebas/auditar.sh` comprueba que las tres coinciden.

---

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

- Base de comprobaciones: **329 → 340**, determinista, 0 fallos.
- Guardianes nuevos en `pruebas/casos-regresiones.js`: E14, E15, E16, E17.

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
