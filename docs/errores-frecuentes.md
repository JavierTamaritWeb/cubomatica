> **Documentación interna. No se distribuye con el juego.**

# Los 24 códigos de error y su actividad de aula

> Cubomática 2.0.0

Tabla de referencia. La fuente de verdad es `datos/recomendaciones.js`, y
`casos-curriculo.js` (CU8) verifica que este conjunto de claves coincide
exactamente con el de `CB.ERRORES`.

**18 códigos tienen `simular()`** y por tanto generan distractores diagnósticos.
Los **6 restantes declaran `diagnostico:false`**: pertenecen a vocabulario,
estimación, ordenación o fallo de puro cálculo, donde simular un valor numérico
erróneo no produce ninguna hipótesis discriminante.

El informe **solo acumula evidencia de respuestas discriminantes**: si dos
códigos explican igual de bien la misma respuesta, se cuentan los dos y no se
afirma ninguno. Hacen falta **dos apariciones discriminantes** para que un error
aparezca en el panel.


## Sumas

### `E-S-LLEV-OLV`

**Qué pasa:** Suma bien las columnas pero se olvida de llevar la decena.

**Pista que da el juego:** «Mira si al sumar las unidades pasas de diez.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Con 20 palillos y gomas: que sume 8 + 5 juntando palillos y que ATE un manojo de 10 en cuanto lo consiga. El manojo atado es la llevada. Repetidlo con 7 + 6 y 9 + 4 antes de volver a escribir nada en papel.

### `E-S-LLEV-ESCR`

**Qué pasa:** Escribe en la casilla el resultado entero de la columna, en vez de dejar solo las unidades y llevar el resto.

**Pista que da el juego:** «En la casilla de las unidades solo cabe hasta el 9.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Cajita de las unidades: dibujad dos cajas, una para unidades y otra para decenas, y decid en voz alta «en la caja de las unidades solo cabe hasta 9». Que reparta 13 fichas entre las dos cajas él mismo.

### `E-S-LLEV-DOBLE`

**Qué pasa:** Lleva la decena, pero luego la vuelve a sumar otra vez.

**Pista que da el juego:** «La decena que llevas se usa una sola vez.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Que escriba la llevada arriba con lápiz y la TACHE en cuanto la use. Ver la marca tachada le da la señal de que esa decena ya está gastada.

### `E-S-COL`

**Qué pasa:** Descoloca las columnas: suma una decena con una unidad.

**Pista que da el juego:** «Coloca las unidades debajo de las unidades.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Papel cuadriculado, una cifra por cuadro. Diez minutos copiando cinco sumas en la cuadrícula SIN resolverlas: el objetivo del día es solo colocar.


## Restas

### `E-R-INV`

**Qué pasa:** Cuando el número de arriba es menor, resta al revés: quita el pequeño del grande dentro de la columna. Es el error de resta más común de 2.º.

**Pista que da el juego:** «Si el de arriba es más pequeño, pide una decena prestada.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Con 3 monedas de 1 € en la mano, pedidle 8 €. Que diga en voz alta «no puedo, necesito cambio». Cambiad un billete de 10 por 10 monedas y que lo vuelva a intentar. La palabra clave es CAMBIO, no «al revés».

### `E-R-PREST-OLV`

**Qué pasa:** Pide prestada la decena, pero se olvida de quitarle 1 a la columna de al lado.

**Pista que da el juego:** «Si pides una decena, a las decenas les queda una menos.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Regletas o palillos: que DESATE físicamente el manojo de 10 y compruebe que ahora hay un manojo menos. Contad juntos los manojos antes y después.

### `E-R-PREST-DOBLE`

**Qué pasa:** Al pedir prestado, resta dos veces de la columna de al lado.

**Pista que da el juego:** «La decena prestada se descuenta una sola vez.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Que tache la decena prestada mientras lo dice en alto: «me llevo una, ya está gastada». Cinco restas con llevada, tachando siempre.

### `E-R-CERO`

**Qué pasa:** Se atasca cuando hay un cero en el número de arriba y hay que pedir prestado a través de él.

**Pista que da el juego:** «Cuando hay un cero, se pide prestado a la columna de más allá.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Esto es contenido de 3.º: el juego no se lo va a volver a proponer. Si aun así queréis trabajarlo, usad monedas: 1 billete de 100 se cambia por 10 de 10, y uno de esos por 10 monedas de 1.

### `E-R-SUMA`

**Qué pasa:** Suma cuando había que restar. Suele ser lectura rápida del signo.

**Pista que da el juego:** «¿El resultado tiene que ser mayor o menor que el número de partida?»

**Explicador de la tarjeta de reparación:** `rectaNumerica`

**10 minutos de aula:** Tarjetas con + y − boca abajo. Saca una, y que diga en voz alta si el resultado va a ser MAYOR o MENOR que el número de partida, antes de operar.


## Numeración

### `E-N-POS`

**Qué pasa:** Confunde el valor de las cifras según su lugar: lee 34 donde pone 43.

**Pista que da el juego:** «Mira qué lugar ocupa cada cifra.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Tabla de valor posicional en una hoja, con dos columnas: D y U. Dictadle seis números y que coloque una ficha en cada columna antes de escribirlos.

### `E-N-CERO`

**Qué pasa:** Se salta el cero de en medio: escribe 37 donde pone 307.

**Pista que da el juego:** «El cero también ocupa su sitio.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** Con tres cajas (C, D, U) y garbanzos: pedidle 307 y que vea que la caja de las decenas se queda VACÍA, y que el cero es justo lo que dice eso.

### `E-N-SERIE`  *(sin simulación: no diagnóstico)*

**Qué pasa:** Se pierde en las series: se salta un paso o cambia el salto a mitad de camino.

**Pista que da el juego:** «Comprueba que todos los saltos son iguales.»

**Explicador de la tarjeta de reparación:** `rectaNumerica`

**10 minutos de aula:** Contad juntos de 2 en 2 y de 5 en 5 dando palmadas, subiendo y BAJANDO. Bajar es lo que casi nunca se practica y es donde aparece el fallo.

### `E-N-APROX`  *(sin simulación: no diagnóstico)*

**Qué pasa:** Aproxima a la decena equivocada, casi siempre hacia abajo.

**Pista que da el juego:** «Mira a qué decena está más cerca.»

**Explicador de la tarjeta de reparación:** `rectaNumerica`

**10 minutos de aula:** Recta numérica dibujada de 0 a 100 en una tira de papel. Marcad el número y preguntadle a qué decena está MÁS CERCA. Es una pregunta de distancia, no de cálculo.

### `E-N-ORDEN`  *(sin simulación: no diagnóstico)*

**Qué pasa:** Ordena los números al revés, o se lía cuando le piden «de mayor a menor».

**Pista que da el juego:** «Empieza por el más pequeño.»

**Explicador de la tarjeta de reparación:** `rectaNumerica`

**10 minutos de aula:** Cartas del 1 al 20 boca arriba en la mesa. Que las ordene primero de menor a mayor y luego al revés, diciendo en alto en qué sentido va.


## Multiplicación

### `E-M-SUMA`

**Qué pasa:** Suma los dos factores en vez de multiplicar: para 3 × 4 responde 7.

**Pista que da el juego:** «Multiplicar es repetir el mismo número varias veces.»

**Explicador de la tarjeta de reparación:** `matrizFilasColumnas`

**10 minutos de aula:** Hueveras o cajas de 4: que ponga 3 huevos en cada una de las 4 y cuente. Multiplicar es «cuántos hay en total si repito ese grupo».

### `E-M-VECINO`

**Qué pasa:** Da el resultado de al lado en la tabla: para 5 × 6 responde 35.

**Pista que da el juego:** «Canta la tabla entera desde el principio.»

**Explicador de la tarjeta de reparación:** `matrizFilasColumnas`

**10 minutos de aula:** Cantad la tabla del 5 completa, subiendo, y luego preguntadle solo el que falla. Suele ser recuperación de memoria, no falta de comprensión.

### `E-M-CERO`

**Qué pasa:** Se atasca con el 0 y con el 1: para 4 × 0 responde 4.

**Pista que da el juego:** «Cuatro platos con cero galletas siguen siendo cero galletas.»

**Explicador de la tarjeta de reparación:** `matrizFilasColumnas`

**10 minutos de aula:** Cuatro platos vacíos sobre la mesa: «hay cuatro platos con cero galletas cada uno, ¿cuántas galletas hay?». Que lo diga mirando los platos.


## Problemas

### `E-P-PALCLAVE`

**Qué pasa:** Se guía por la palabra suelta y no por lo que cuenta el problema: ve «más» y suma, aunque el problema pidiera restar.

**Pista que da el juego:** «No te fíes solo de la palabra: mira lo que cuenta el problema.»

**Explicador de la tarjeta de reparación:** `barrasComparativas`

**10 minutos de aula:** Leedle el problema y que lo DIBUJE con dos barras, una por cada personaje, antes de escribir ninguna cuenta. La barra enseña quién tiene más sin depender de la palabra.

### `E-P-TODOSDATOS`

**Qué pasa:** Usa todos los números que aparecen, incluido el que no hacía falta.

**Pista que da el juego:** «Mira si todos los números del cuento te sirven.»

**Explicador de la tarjeta de reparación:** `barrasComparativas`

**10 minutos de aula:** Subrayad juntos SOLO los datos que sirven, y tachad el que sobra, antes de operar. Preguntadle: «¿este número para qué te sirve?».

### `E-P-CALCULO`  *(sin simulación: no diagnóstico)*

**Qué pasa:** Entiende el problema y elige bien la operación: falla solo al calcular. Esto NO es un problema de comprensión lectora.

**Pista que da el juego:** «El planteamiento está bien. Repasa solo la cuenta.»

**Explicador de la tarjeta de reparación:** `columnasCDU`

**10 minutos de aula:** No trabajéis el problema: trabajad la cuenta suelta. Cinco minutos de la operación concreta que falla, sin enunciado, es lo que hace falta.


## Dinero

### `E-E-VALOR`

**Qué pasa:** Cuenta las piezas en vez de su valor: tres monedas de 2 € le parecen 3 €.

**Pista que da el juego:** «No cuentes las monedas: cuenta lo que vale cada una.»

**Explicador de la tarjeta de reparación:** `monedas`

**10 minutos de aula:** Monedas de verdad sobre la mesa. Que haga montones por valor y cuente «de dos en dos» los de 2 €. Comparad un montón de tres monedas de 1 € con otro de dos monedas de 2 €.

### `E-E-CAMBIO`

**Qué pasa:** Al calcular el cambio suma en vez de restar.

**Pista que da el juego:** «Para saber el cambio hay que quitar el precio.»

**Explicador de la tarjeta de reparación:** `monedas`

**10 minutos de aula:** Jugad a la tienda de verdad, con monedas. Que sea él quien cobre y devuelva el cambio contando hacia arriba desde el precio.


## Vocabulario

### `E-V-TERMINO`  *(sin simulación: no diagnóstico)*

**Qué pasa:** Confunde dos términos del vocabulario matemático.

**Pista que da el juego:** «Piensa en qué operación te pide esa palabra.»

**Explicador de la tarjeta de reparación:** `rectaNumerica`

**10 minutos de aula:** Tarjetas con la palabra por una cara y un dibujo por la otra. Cinco minutos de emparejar. El vocabulario se aprende por uso, no por definición.

### `E-V-SINONIMO`  *(sin simulación: no diagnóstico)*

**Qué pasa:** Reconoce la palabra suelta pero no la reconoce dentro de una frase.

**Pista que da el juego:** «Lee la frase entera antes de decidir.»

**Explicador de la tarjeta de reparación:** `rectaNumerica`

**10 minutos de aula:** Que sea él quien INVENTE un problema usando la palabra. Inventar el problema exige entender la palabra mucho más que resolverlo.
