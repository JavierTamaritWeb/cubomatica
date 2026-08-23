> **Documentación interna. No se distribuye con el juego.**

# Mapa curricular

> Cubomática 1.23.5

> **ADVERTENCIA NORMATIVA.** El **Real Decreto 157/2022, de 1 de marzo, por el que
> se establecen la ordenación y las enseñanzas mínimas de la Educación Primaria
> (BOE núm. 52, de 2 de marzo de 2022; referencia BOE-A-2022-3296)** fija saberes
> básicos y criterios de evaluación **POR CICLO** (1.er ciclo = 1.º y 2.º juntos),
> **no por curso ni por trimestre**. La distribución por curso y por trimestre que
> aparece en esta tabla es una **secuenciación PROPIA del proyecto**, basada en la
> práctica de aula habitual; no procede del Real Decreto ni de ningún decreto
> autonómico. **Debe confirmarse con la programación didáctica del centro.**
>
> Por eso el campo del catálogo se llama `trimestreSugerido` y nunca `trimestre`.

## Comunidad autónoma de referencia

El proyecto se entrega alineado con la **norma estatal**, que es la base común de
toda la escuela pública española. **No se fija una comunidad de referencia**
porque no se dispone del dato de dónde se va a usar el juego, y fijarla sin ese
dato sería inventar.

Decretos autonómicos identificados durante la redacción, citados solo por su
identificación formal y **sin atribuirles ninguna frase literal**:

- **Decreto 106/2022, de 5 de agosto, del Consell**, de ordenación y currículo de
  la etapa de Educación Primaria (DOGV), modificado por el Decreto 96/2026.
- **Decreto 211/2022, de 10 de noviembre**, por el que se establece la ordenación
  y el currículo de la Educación Primaria en la Comunidad Autónoma de Canarias
  (BOC núm. 231, de 23 de noviembre de 2022).

### Cómo adaptar la secuenciación a tu comunidad

El reparto por curso puede variar entre comunidades. Todo lo secuenciado por
curso en este proyecto está marcado como decisión propia. Para adaptarlo:

1. Abra `js/17-catalogo.js` y ajuste la columna `trimestreSugerido` de la tabla.
2. Si su comunidad sitúa la multiplicación antes o después, ajuste los niveles
   M1-M8 y revise el aviso de `CB.LEGAL.MULTIPLICACION` en `js/00-nucleo.js`.
3. Los techos numéricos por trimestre están en `CB.CURRICULO.techoTrimestre`.
4. Ejecute `pruebas/pruebas.html`: `casos-curriculo.js` comprobará que ningún
   nivel excede el techo de su trimestre.

## Techos numéricos por trimestre (decisión propia)

| Trimestre sugerido | Techo | Justificación |
|---|---|---|
| T1 | ≤ 199 | Repaso de la decena y del valor posicional de 1.º; centena al final |
| T2 | ≤ 599 | Centena ya introducida |
| T3 | ≤ 999 | Techo de los saberes A.1 y A.2.b del primer ciclo, literal |

## Origen de los 48 términos del Diccionario de Bloques

> **Diccionario de Bloques: 48 términos de un glosario PROPIO del proyecto,
> seleccionado para dar cobertura al criterio de evaluación 6.1 del RD 157/2022
> (1.er ciclo). La cifra 48 y la selección son decisiones de este proyecto, no
> una enumeración oficial.**

El criterio 6.1 dice literalmente: *«Reconocer lenguaje matemático sencillo
presente en la vida cotidiana, adquiriendo vocabulario específico básico»*. **No
enumera términos ni contiene lista alguna.**

**«minuendo» y «sustraendo»** son terminología que el RD no sitúa explícitamente
en primer ciclo. Van marcados en el juego con el distintivo **«palabra de
mayores»** y no cuentan para ningún requisito de progresión.

## Origen de la lista blanca de los enunciados

> **Lista blanca propia del proyecto, pendiente de revisión por un maestro de
> primer ciclo. No procede de ningún corpus de frecuencia léxica infantil.**

Se construye con: los sustantivos concretos de los 60 objetos contables, los 40
nombres propios, los verbos de ganar y de perder, los 48 términos del Diccionario
y los conectores del español básico. Se declara así, y **nunca** como «validada
por corpus», porque no se dispone de un corpus infantil citable.

## Contenidos de 2.º: incluidos o fuera de alcance

| Contenido | Decisión | Dónde |
|---|---|---|
| Sumas de tres sumandos | Incluido | S10, S16 |
| Aproximación a la decena | Incluido | N13, N16 |
| Números ordinales hasta el 20.º | Incluido | N14, V5 |
| Pares e impares | Incluido | N6 |
| Doble y mitad (solo en palabras) | Incluido | M8, V7 |
| Series de 2, 5, 10 y 100 | Incluido | N5, N11 |
| Comparación con `=` y `≠` | Incluido | N4, N10 |
| Comparación con `<` y `>` | Incluido **con nota**: decisión propia, dentro del componente balanza | N4, N10 |
| Problemas de dos operaciones | **Fuera de alcance de v1** | — |
| Monedas de céntimo | **Ampliación apagada**: el saber A.5 de 1.er ciclo cita solo monedas de 1 y 2 € y billetes; los céntimos son de 2.º ciclo | E8 |
| Restas con doble llevada y cero intermedio | **Ampliación apagada**: contenido de 3.º | R14 |
| Tablas del 3, 4, 6, 7, 8 y 9 | **Ampliación apagada**: el RD sitúa la construcción de las tablas en 2.º ciclo | M9, M10 |
| Fracciones, decimales y negativos | **Prohibidos** (invariante 3) | — |

## Citas que se retiraron por no ser verificables

| Cita del plan original | Estado | Qué se hizo |
|---|---|---|
| «los 48 términos del criterio 6.1» | **Falsa.** El criterio 6.1 no enumera términos | Se declara el glosario como propio del proyecto |
| Frase literal atribuida al decreto canario sobre modelos manipulativos | **No verificable** | Se retiró la atribución; la tabla del 100 se declara decisión propia |
| «el currículo valenciano incluye la multiplicación en primer ciclo» | **No verificada** | Se retiró la afirmación normativa; ver §6.5 |

---

## Tabla completa: nivel ↔ saber ↔ criterios ↔ trimestre sugerido

| id | Nombre | Rango | Llev. | T | Formato | Saber | Criterios | Destreza | β | Ampl. |
|---|---|---|---|---|---|---|---|---|---|---|
| N1 | Contar y recontar | 0-99 | — | 1 | opciones4 | A.1 + A.2.c | 1.1, 5.1 | numeracion | 320 | no |
| N2 | Leer y escribir hasta 99 | 0-99 | — | 1 | teclado | A.2.b | 6.1 | numeracion | 365 | no |
| N3 | Decenas y unidades | 0-99 | — | 1 | opciones4 | A.4.a | 1.2, 6.1 | valor_posicional | 411 | no |
| N4 | Mayor, menor, igual | 0-99 | — | 1 | balanza | A.4.b | 5.1, 6.1 | numeracion | 456 | no |
| N5 | Series de 2 en 2 y de 10 en 10 | 0-99 | — | 1 | ordenar | A.4.a | 3.1 | numeracion | 501 | no |
| N6 | Pares e impares | 0-99 | — | 1 | opciones4 | A.4.b | 3.1 | numeracion | 547 | no |
| N7 | La recta numérica | 0-199 | — | 1 | ordenar | A.2.b | 1.2 | numeracion | 592 | no |
| N8 | Números hasta 199 | 0-199 | — | 1 | teclado | A.2.b | 6.1 | numeracion | 637 | no |
| N9 | La centena: C, D y U | 0-599 | — | 2 | opciones4 | A.4.a | 1.2, 6.1 | valor_posicional | 683 | no |
| N10 | Comparar y ordenar hasta 599 | 0-599 | — | 2 | balanza | A.4.b | 5.1 | numeracion | 728 | no |
| N11 | Series de 5 en 5 y de 100 en 100 | 0-599 | — | 2 | ordenar | A.4.a | 3.1 | numeracion | 773 | no |
| N12 | Descomponer C + D + U | 0-599 | — | 2 | teclado | A.2.b + A.2.c | 1.2, 6.2 | valor_posicional | 819 | no |
| N13 | Aproximar a la decena | 0-599 | — | 2 | opciones4 | A.2.a | 2.1 | numeracion | 864 | no |
| N14 | Ordinales hasta el 20.º | 1-20 | — | 2 | opciones4 | A.4.b | 6.1 | numeracion | 909 | no |
| N15 | Números hasta 999 | 0-999 | — | 3 | teclado | A.2.b | 6.1 | numeracion | 955 | no |
| N16 | Comparar y aproximar hasta 999 | 0-999 | — | 3 | balanza | A.4.b + A.2.a | 2.1, 5.1 | numeracion | 1000 | no |
| S1 | Sumas hasta 10 | 0-10 | — | 1 | teclado | A.3.b | 2.1 | suma_sin_llevar | 340 | no |
| S2 | Sumas hasta 20 sin llevar | 0-20 | — | 1 | teclado | A.3.b | 2.1 | suma_sin_llevar | 392 | no |
| S3 | Dobles hasta 10 + 10 | 0-20 | — | 1 | opciones4 | A.3.a | 3.1 | suma_sin_llevar | 444 | no |
| S4 | Sumar 10 | 0-99 | — | 1 | teclado | A.3.a | 3.1 | suma_sin_llevar | 496 | no |
| S5 | DU + U sin llevar | 0-99 | — | 1 | teclado | A.3.b | 2.1 | suma_sin_llevar | 548 | no |
| S6 | DU + DU sin llevar | 0-99 | — | 1 | teclado | A.3.b | 2.1 | suma_sin_llevar | 600 | no |
| S7 | DU + U con llevada | 0-199 | 1 | 1 | teclado | A.3.b | 2.1, 6.2 | suma_llevada | 652 | no |
| S8 | DU + DU con una llevada | 0-99 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | suma_llevada | 704 | no |
| S9 | DU + DU con llevada hasta 199 | 0-199 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | suma_llevada | 756 | no |
| S10 | Tres sumandos de una cifra | 0-27 | 1 | 2 | teclado | A.3.b | 2.1 | suma_llevada | 808 | no |
| S11 | CDU + DU sin llevar | 0-599 | — | 2 | teclado | A.3.b | 2.1 | suma_sin_llevar | 860 | no |
| S12 | CDU + DU con una llevada | 0-599 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | suma_llevada | 912 | no |
| S13 | Sumar decenas completas | 0-599 | — | 2 | opciones4 | A.3.a | 3.1 | suma_sin_llevar | 964 | no |
| S14 | CDU + CDU sin llevar | 0-999 | — | 3 | teclado | A.3.b | 2.1 | suma_sin_llevar | 1016 | no |
| S15 | CDU + CDU con una llevada | 0-999 | 1 | 3 | teclado | A.3.b | 2.1, 6.2 | suma_llevada | 1068 | no |
| S16 | Tres sumandos con decenas | 0-999 | 1 | 3 | teclado | A.3.b | 2.1 | suma_llevada | 1120 | no |
| R1 | Restas hasta 10 | 0-10 | — | 1 | teclado | A.3.b | 2.1 | resta_sin_llevar | 380 | no |
| R2 | Restas hasta 20 sin llevar | 0-20 | — | 1 | teclado | A.3.b | 2.1 | resta_sin_llevar | 440 | no |
| R3 | Restar 10 | 0-99 | — | 1 | teclado | A.3.a | 3.1 | resta_sin_llevar | 500 | no |
| R4 | DU − U sin llevar | 0-99 | — | 1 | teclado | A.3.b | 2.1 | resta_sin_llevar | 560 | no |
| R5 | DU − DU sin llevar | 0-99 | — | 1 | teclado | A.3.b | 2.1 | resta_sin_llevar | 620 | no |
| R6 | Complementos a 10 y a 100 | 0-100 | — | 2 | teclado | A.4.c | 3.1, 5.1 | resta_sin_llevar | 680 | no |
| R7 | DU − U con una llevada | 0-99 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | resta_llevada | 740 | no |
| R8 | DU − DU con una llevada | 0-99 | 1 | 2 | teclado | A.3.b | 2.1, 6.2 | resta_llevada | 800 | no |
| R9 | Restar decenas completas | 0-599 | — | 2 | opciones4 | A.3.a | 3.1 | resta_sin_llevar | 860 | no |
| R10 | CDU − DU sin llevar | 0-599 | — | 2 | teclado | A.3.b | 2.1 | resta_sin_llevar | 920 | no |
| R11 | CDU − DU con una llevada | 0-599 | 1 | 3 | teclado | A.3.b | 2.1, 6.2 | resta_llevada | 980 | no |
| R12 | CDU − CDU sin llevar | 0-999 | — | 3 | teclado | A.3.b | 2.1 | resta_sin_llevar | 1040 | no |
| R13 | CDU − CDU con una llevada | 0-999 | 1 | 3 | teclado | A.3.b | 2.1, 6.2 | resta_llevada | 1100 | no |
| R14 | Restas con doble llevada | 0-999 | 2 | 3 | teclado | A.3.b | 2.1 | resta_llevada | 1160 | **SÍ** (restasDobleLlevada) |
| M1 | Veces: la suma reiterada | 2-5 | — | 3 | opciones4 | A.3.b | 1.2, 5.1 | multiplicacion | 780 | no |
| M2 | Filas y columnas | 2-5 | — | 3 | opciones4 | A.3.b | 1.2, 6.1 | multiplicacion | 824 | no |
| M3 | Del dibujo a «a × b» | 2-5 | — | 3 | teclado | A.3.b | 6.2 | multiplicacion | 869 | no |
| M4 | Tabla del 2 | 0-20 | — | 3 | teclado | A.3.a | 3.1 | multiplicacion | 913 | no |
| M5 | Tabla del 10 | 0-100 | — | 3 | teclado | A.3.a | 3.1 | multiplicacion | 958 | no |
| M6 | Tabla del 5 | 0-50 | — | 3 | teclado | A.3.a | 3.1 | multiplicacion | 1002 | no |
| M7 | Mezcla del 2, del 5 y del 10 | 0-100 | — | 3 | teclado | A.3.a | 3.1, 5.1 | multiplicacion | 1047 | no |
| M8 | Dobles y mitades | 0-20 | — | 3 | opciones4 | A.3.a | 3.1 | multiplicacion | 1091 | no |
| M9 | Tabla del 3 | 0-30 | — | 3 | teclado | A.3.a | 3.1 | multiplicacion | 1136 | **SÍ** (tablas69) |
| M10 | Tabla del 4 | 0-40 | — | 3 | teclado | A.3.a | 3.1 | multiplicacion | 1180 | **SÍ** (tablas69) |
| P1 | Cambio: cuántos hay ahora | 0-99 | — | 1 | teclado | A.3.b | 1.1, 2.1, 2.2 | problemas_cambio | 620 | no |
| P2 | Cambio: cuántos quedan | 0-99 | — | 1 | teclado | A.3.b | 1.1, 2.1, 2.2 | problemas_cambio | 655 | no |
| P3 | Combinación: el total | 0-99 | — | 1 | teclado | A.3.b | 1.1, 2.1, 2.2 | problemas_combinacion | 689 | no |
| P4 | Combinación: una parte | 0-99 | — | 2 | teclado | A.3.b | 1.1, 2.1, 2.2 | problemas_combinacion | 724 | no |
| P5 | Comparación: cuántos más | 0-99 | — | 2 | teclado | A.4.b | 1.1, 2.1, 2.2 | problemas_comparacion | 759 | no |
| P6 | Comparación: cuántos menos | 0-99 | — | 2 | teclado | A.4.b | 1.1, 2.1, 2.2 | problemas_comparacion | 794 | no |
| P7 | Cambio: cuánto ha ganado | 0-99 | — | 2 | teclado | A.4.c | 1.1, 2.1, 2.2 | problemas_cambio | 828 | no |
| P8 | Cambio: cuánto ha perdido | 0-99 | — | 2 | teclado | A.4.c | 1.1, 2.1, 2.2 | problemas_cambio | 863 | no |
| P9 | Comparación: el otro tiene más | 0-99 | — | 2 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_comparacion | 898 | no |
| P10 | Comparación: el otro tiene menos | 0-99 | — | 2 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_comparacion | 933 | no |
| P11 | Igualación: cuánto falta | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_igualacion | 967 | no |
| P12 | Igualación: cuánto sobra | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_igualacion | 1002 | no |
| P13 | Cambio: cuánto tenía antes (+) | 0-99 | — | 3 | teclado | A.4.c | 1.1, 2.1, 2.3 | problemas_cambio | 1037 | **SÍ** (null) |
| P14 | Cambio: cuánto tenía antes (−) | 0-99 | — | 3 | teclado | A.4.c | 1.1, 2.1, 2.3 | problemas_cambio | 1072 | **SÍ** (null) |
| P15 | Comparación: referente con más | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_comparacion | 1106 | **SÍ** (null) |
| P16 | Comparación: referente con menos | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_comparacion | 1141 | **SÍ** (null) |
| P17 | Igualación: referido con añadir | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_igualacion | 1176 | **SÍ** (null) |
| P18 | Igualación: referido con quitar | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_igualacion | 1211 | **SÍ** (null) |
| P19 | Igualación: referente con añadir | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_igualacion | 1245 | **SÍ** (null) |
| P20 | Igualación: referente con quitar | 0-99 | — | 3 | teclado | A.4.b | 1.1, 2.1, 2.3 | problemas_igualacion | 1280 | **SÍ** (null) |
| E1 | Monedas y billetes: reconocerlos | 0-100 | — | 1 | opciones4 | A.5 | 5.2, 6.1 | dinero | 400 | no |
| E2 | Contar con monedas de 1 y 2 € | 0-20 | — | 1 | monedas | A.5 | 2.1, 5.2 | dinero | 491 | no |
| E3 | Contar con billetes | 0-100 | — | 2 | monedas | A.5 | 2.1, 5.2 | dinero | 583 | no |
| E4 | Equivalencias entre billetes | 0-100 | — | 2 | opciones4 | A.5 | 3.1, 5.1 | dinero | 674 | no |
| E5 | Pagar con importe exacto | 0-50 | — | 2 | monedas | A.5 | 2.1, 2.2 | dinero | 766 | no |
| E6 | El cambio | 0-20 | — | 3 | teclado | A.5 + A.4.c | 2.1, 2.2 | dinero | 857 | no |
| E7 | La compra: gasto total | 0-99 | — | 3 | teclado | A.5 + A.3.b | 2.1, 2.2 | dinero | 949 | no |
| E8 | Céntimos y equivalencias | 5-100 | — | 3 | opciones4 | A.5 | 5.2 | dinero | 1040 | **SÍ** (centimos) |
| V1 | Las palabras de la suma | 0-0 | — | 2 | opciones4 | A.3.b | 6.1 | vocabulario | 320 | no |
| V2 | Las palabras de la resta | 0-0 | — | 2 | opciones4 | A.3.b | 6.1 | vocabulario | 406 | no |
| V3 | Unidades, decenas, centenas | 0-0 | — | 3 | opciones4 | A.4.a | 6.1 | vocabulario | 491 | no |
| V4 | Comparar | 0-99 | — | 3 | balanza | A.4.b | 6.1 | vocabulario | 577 | no |
| V5 | Orden y posición | 1-20 | — | 3 | ordenar | A.4.b | 6.1 | vocabulario | 663 | no |
| V6 | Las palabras del dinero | 0-0 | — | 3 | opciones4 | A.5 | 6.1, 5.2 | vocabulario | 749 | no |
| V7 | Veces, doble y mitad | 0-0 | — | 3 | opciones4 | A.3.a | 6.1 | vocabulario | 834 | no |
| V8 | Las palabras de los problemas | 0-0 | — | 3 | opciones4 | A.3.b | 6.1, 1.1 | vocabulario | 920 | no |

**Total: 92 niveles.**

## Saberes del bloque A y niveles que los cubren

- **A.1** — «Conteo. Estrategias variadas de conteo y recuento sistemático en situaciones de la vida cotidiana en cantidades hasta el 999.»
  → N1
- **A.2.a** — «Cantidad. Estimaciones razonadas de cantidades en contextos de resolución de problemas.»
  → N13, N16
- **A.2.b** — «Cantidad. Lectura, representación (incluida la recta numérica y con materiales manipulativos), composición, descomposición y recomposición de números naturales hasta 999.»
  → N2, N7, N8, N12, N15
- **A.2.c** — «Cantidad. Representación de una misma cantidad de distintas formas (manipulativa, gráfica o numérica) y estrategias de elección de la representación adecuada para cada situación o problema.»
  → N1, N12
- **A.3.a** — «Sentido de las operaciones. Estrategias de cálculo mental con números naturales hasta 999.»
  → S3, S4, S13, R3, R9, M4, M5, M6, M7, M8, M9, M10, V7
- **A.3.b** — «Sentido de las operaciones. Suma y resta de números naturales resueltas con flexibilidad y sentido: utilidad en situaciones contextualizadas, estrategias y herramientas de resolución y propiedades.»
  → S1, S2, S5, S6, S7, S8, S9, S10, S11, S12, S14, S15, S16, R1, R2, R4, R5, R7, R8, R10, R11, R12, R13, R14, M1, M2, M3, P1, P2, P3, P4, E7, V1, V2, V8
- **A.4.a** — «Relaciones. Sistema de numeración de base diez (hasta el 999): aplicación de las relaciones que genera en las operaciones.»
  → N3, N5, N9, N11, V3
- **A.4.b** — «Relaciones. Números naturales en contextos de la vida cotidiana: comparación y ordenación.»
  → N4, N6, N10, N14, N16, P5, P6, P9, P10, P11, P12, P15, P16, P17, P18, P19, P20, V4, V5
- **A.4.c** — «Relaciones. Relaciones entre la suma y la resta: aplicación en contextos cotidianos.»
  → R6, P7, P8, P13, P14, E6
- **A.5** — «Educación financiera. Sistema monetario europeo: monedas (1, 2 euros) y billetes de euro (5, 10, 20, 50 y 100), valor y equivalencia.»
  → E1, E2, E3, E4, E5, E6, E7, E8, V6
