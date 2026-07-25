# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado semántico: la primera cifra sube solo cuando cambia el formato del
perfil guardado, porque eso obliga a migrar `js/01-almacen.js` y es lo único
que puede romperle el progreso a un niño.

La versión de referencia es `CB.VERSION` en `js/00-nucleo.js`. Este fichero y
`README.md` la repiten, y `pruebas/auditar.sh` comprueba que las tres coinciden.

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
