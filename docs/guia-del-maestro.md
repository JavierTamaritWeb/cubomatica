> **Documentación interna. No se distribuye con el juego.**

# Guía del maestro — Cubomática

> Cubomática 2.0.0

Dos páginas. Lo que hace falta saber antes de ponerlo en un aula de 2.º.

---

## 1. Qué es y qué NO es

**Es** un juego de 6-9 minutos por partida para practicar el **sentido numérico**
de 2.º: numeración, sumas, restas, iniciación a las tablas del 2, del 5 y del 10,
problemas de enunciado, dinero y vocabulario matemático.

**No es** una evaluación, ni una nota, ni un test de capacidad, ni un instrumento
de diagnóstico. El panel de personas adultas es un registro de lo que el niño ha
hecho en la pantalla, nada más.

### Alcance curricular declarado

> Cubomática trabaja el bloque **A (Sentido numérico)** y, de forma transversal,
> el bloque **F (Sentido socioafectivo)** de los saberes básicos del primer ciclo
> de Matemáticas del **Real Decreto 157/2022, de 1 de marzo** (BOE núm. 52, de 2
> de marzo de 2022). **NO trabaja** los bloques B (medida), C (espacial),
> D (algebraico) ni E (estocástico).

El Real Decreto fija los saberes **por ciclo**, no por curso ni por trimestre. La
secuenciación por trimestres del juego es **propia** y debe confirmarse con la
programación didáctica del centro. Por eso el campo interno se llama
`trimestreSugerido`.

### Sobre las tablas de multiplicar

Las tablas del **2, del 5 y del 10** entran en el recorrido nuclear del tercer
trimestre, tal como es habitual en el aula de 2.º. El RD 157/2022 sitúa la
construcción de las tablas en el **segundo ciclo**; por eso las del 3, 4, 6, 7, 8
y 9 están **desactivadas** salvo que usted las active en el panel.

Toda multiplicación se presenta **siempre** con matriz de filas y columnas y con
la suma reiterada **antes** que el resultado. No se pide recuperación de memoria
sin haber construido el concepto.

---

## 2. Los 20 tipos de problema: por qué es lo más útil del panel

Dos problemas con los mismos números y la misma operación tienen dificultades
radicalmente distintas según cómo estén contados. Un problema de **cambio con
incógnita en el resultado** («tenía 12, gana 5, ¿cuántos tiene?») lo resuelve casi
todo el grupo. Uno de **comparación con referente desconocido** («tiene 12, tiene
5 más que Leo, ¿cuántos tiene Leo?») lo resuelve menos de un tercio.

Saber que un alumno «falla las restas» no sirve de nada. Saber que resuelve
`CAMBIO_2` al 95 % y `COMPARACION_5` al 0 % es un dato accionable el lunes.

El juego reparte los tipos **ponderados**: los nucleares tres veces más que los de
ampliación, y los de ampliación solo en el tercer trimestre y nunca con menos de
tres luces.

---

## 3. Lo que el juego NO mide, y conviene tener presente

- **No mide comprensión lectora.** El cronómetro de puntuación no arranca hasta
  que el niño toca el enunciado: un lector lento no sale penalizado.
- **No mide la CE7 ni la CE8.** La carita del final de la partida es un registro
  de estado de ánimo declarado por el niño, no una evaluación socioafectiva.
- **No detecta discalculia.** Si un alumno acumula fallos del mismo tipo, el juego
  retira ese contenido de la sesión y se lo dice a usted. Eso es una señal para
  observar, no un diagnóstico.
- **Las hipótesis de error solo aparecen con evidencia discriminante.** Si dos
  errores distintos explican la misma respuesta, no se afirma ninguno.

---

## 4. Veinte minutos de aula

**Gran grupo (10 min).** Active el **modo proyección** en el panel: tipografía
×1,6 y un ítem por pantalla. Proyecte y resuelva en voz alta pidiendo el
procedimiento, no el resultado: «¿por qué llevas una decena?».

**Individual (10 min).** Cree un perfil por alumno (**modo aula**, hasta 30). Cada
uno hace una expedición. Al terminar, el panel le da el semáforo por bloques y,
si hay evidencia suficiente, hasta tres errores con su actividad manipulativa de
10 minutos y una ficha de refuerzo imprimible.

**Lo importante:** la ficha y la actividad son de **material manipulativo**, no de
más pantalla. El remedio de un error de procedimiento no está en repetirlo en una
tableta.

---

## 5. Ajustes que conviene tocar

| Ajuste | Cuándo |
|---|---|
| **Reloj → Sin prisa** | Alumno con ansiedad ante el tiempo, TDAH o lectura muy lenta. Está pensado para usarse. |
| **No puntuar la velocidad en los problemas** | Dislexia o retraso lector. Por alumno. |
| **Letra grande** | Baja visión. |
| **Cantera Tranquila** | Alumno que lo está pasando mal: sin luces, sin reloj, con reparación inmediata. Sigue contando para el mapa de destrezas. |
| **Límite de sesión** | 10, 15, 20 o 30 minutos. Nunca corta un ítem a medias. |

**No active** las tablas del 3 al 9, los céntimos ni las restas de doble llevada
salvo que sepa que ese alumno concreto está preparado: son contenido de otro
curso y el juego los tiene apagados por criterio, no por olvido.

---

## 6. Privacidad

No hay servidor, ni red, ni cuentas, ni analítica. El alumno se identifica con un
**mote** de una lista cerrada («Topo Cavador»), nunca con su nombre. Todo vive en
el `localStorage` del navegador de ese dispositivo.

**Consecuencia práctica:** si limpia el navegador o cambia de equipo, el progreso
se pierde. Exporte una copia al terminar cada trimestre desde el panel.
