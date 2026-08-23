> **Documentación interna. No se distribuye con el juego.**

# Plan — Tres modos de juego (Fácil / Normal / Experto)

> Cubomática 2.0.0
> Estado: **implementado en 2.0.0**.

## 0. Lo que se pide, y lo que ya existe

Pedido:

| Modo | Cuenta atrás | Recompensas |
|---|---|---|
| Fácil | no aparece | las más flojas |
| Normal | 2 min | intermedias |
| Experto | 30 s | **mejores y más frecuentes** |

Lo que hay hoy en el código, y que casi nadie recuerda: **el eje ya existe**.
`perfil.ajustes.modoTiempo` tiene tres valores (`conCalma`, `normal`, `sinPrisa`)
y `CB.partida.SEGUNDOS_ITEM = { normal: 30, conCalma: 30, sinPrisa: 0 }`. Dos de
los tres valen lo mismo, y `docs/decisiones.md:392` lo dice con todas las letras:

> «Con calma» y «Normal» pasan a ser el mismo tiempo. El ×2 de «Con calma» vivía
> justo en ese temporizador. **Recuperar la diferencia es cambiar un número en
> `CB.partida.SEGUNDOS_ITEM`.**

Así que la mitad del trabajo es *recuperar* una distinción que se perdió, no
inventar una. La otra mitad —las recompensas escalonadas— sí es nueva, y es la
que choca con una decisión cerrada. Ver §1.

---

## 1. El único conflicto real, y cómo se resuelve

`docs/decisiones.md:37` y `js/20-puntuacion.js:39` fijan una regla:

> **El modo solo cambia CUÁNDO se agota el tiempo, nunca CÓMO se puntúa**
> (antifarmeo, §11.3).

Y `casos-formulas.js` la vigila con la aserción A3: «Sin prisa» no puede ser ni
el modo que más puntúa ni el que menos. Su motivo es de accesibilidad: el modo
sin reloj es la salida que exige la WCAG 2.2.1, y castigarlo con puntos castiga
al niño que lo necesita, no al que lo elige.

Lo pedido —recompensas mejores en Experto— rompe esa regla si se implementa
dentro de `CB.puntuacion.calcular()`. **No hace falta hacerlo ahí.**

**La resolución, y es la decisión estructural de todo el plan:**

1. `CB.puntuacion.calcular()` **no se toca**. Los 30 casos exactos de §11.7 y las
   seis aserciones A1-A6 siguen valiendo palabra por palabra. Dentro de la
   fórmula, Fácil conserva su `M_SIN_PRISA = 0,85`, que sigue sin ser ni el
   máximo (1,40) ni el mínimo (0,60): **A3 sigue verde y sigue significando lo
   mismo.**
2. La ventaja del modo vive **fuera** de la fórmula, como una capa aditiva y
   visible: gemas extra, probabilidades de sorpresa y un extra de bono final con
   su propio rótulo en la pantalla de fin. Nada de eso puede volver negativo un
   marcador ni convertir un fallo en premio: solo multiplica o suma sobre lo ya
   ganado.

Esto no es un rodeo para esquivar el test. Es la forma correcta: **la fórmula
mide la respuesta; el modo mide el reto que el niño ha aceptado.** Son dos cosas
distintas y ahora se calculan en dos sitios distintos.

### 1.1 Lo que sigue quedando desequilibrado, y la propuesta

Aun con la capa fuera de la fórmula, el resultado global es que **Fácil pasa a
ser el camino que menos recompensa**, y Fácil es a la vez la salida obligatoria
de la WCAG 2.2.1. La letra de la norma se cumple —el límite se puede desactivar,
que es lo único que 2.2.1 exige— pero la equidad no: un niño con dislexia o con
lentitud de procesamiento no elige Fácil, lo necesita.

**Propuesta:** separar la *necesidad* de la *elección* con un solo booleano en el
panel adulto (detrás de la puerta parental, que es el mecanismo que este proyecto
ya usa para «esto lo decide un adulto»):

```
ajustes.sinLimiteTiempo: false
```

Con él activado, el reloj se apaga **en cualquiera de los tres modos** y el nivel
de recompensa **no cambia**. Son ~6 líneas y es lo que hace defendible el resto
del plan ante EN 301 549. Su guardián está en §6 (E123).

> **Decisión abierta.** Si se descarta, el plan sigue funcionando y el juego
> sigue cumpliendo la letra de la 2.2.1; lo que se pierde es la respuesta a «¿y
> el niño que no puede jugar con reloj?». Recomiendo incluirlo.

---

## 2. La tabla de modos: un fichero nuevo, y ningún número duplicado

Fichero nuevo **`src/js/2B-modos.js`**, capa 20-2A (motor, **puro**: sin `document`,
sin `window`, sin `Math.random`, sin `localStorage`).

```js
CB.modos.TABLA = {
  facil:   { etiqueta: 'Fácil',   segundos:   0,
             gemaPrimera: 0, rapidezExtra: 0, probCromo: 0.03, probReto: 0.15, bonoFinal: 0    },
  normal:  { etiqueta: 'Normal',  segundos: 120,
             gemaPrimera: 0, rapidezExtra: 0, probCromo: 0.05, probReto: 0.25, bonoFinal: 0.10 },
  experto: { etiqueta: 'Experto', segundos:  30,
             gemaPrimera: 1, rapidezExtra: 1, probCromo: 0.09, probReto: 0.40, bonoFinal: 0.25 }
};
CB.modos.ORDEN = ['facil', 'normal', 'experto'];
CB.modos.POR_DEFECTO = 'normal';
```

Más seis funciones puras: `msDeItem`, `probCromo`, `probReto`, `gemasDeAcierto`,
`rapidezDe`, `normalizar` (§4).

**La tabla es la fuente única.** Hoy los tres nombres visibles están escritos a
mano en dos ficheros a la vez (`99-arranque.js:269` y `41-panel-adulto.js:460`) y
los segundos en un tercero. Al terminar, cada número y cada rótulo existe una vez.

**No crea un cuarto borde duro de orden de carga.** Los tres bordes de
`CLAUDE.md` lo son porque hay lecturas *en tiempo de definición*. Aquí todas las
lecturas de la tabla son en tiempo de llamada, incluida la de `20-puntuacion.js`,
que se carga antes. `CB.partida.SEGUNDOS_ITEM` **desaparece**: si sobreviviera
como copia, sería el número duplicado que este proyecto lleva tres versiones
persiguiendo.

Contrato: **45 fuentes → 46**, en `manifiesto.json` (tras `js/2A-escalera.js`), en
disco y en `CLAUDE.md`. La auditoría compara disco contra manifiesto en los dos
sentidos, así que declararlo mal es un rojo, no un silencio.

---

## 3. Las cinco palancas de recompensa, una por una

Cada una es un mecanismo **que ya existe**; el plan solo le pone el modo delante.

| # | Palanca | Dónde vive hoy | Fácil | Normal | Experto | Qué pide de las dos |
|---|---|---|---|---|---|---|
| 1 | Gema por acierto a la primera | nueva, en `trasAcierto` | +0 | +0 | **+1** | mejores |
| 2 | Bono de rapidez | `gemasDeRapidez` (0-3) | 0 (\*) | 0-3 | **0-4** | mejores |
| 3 | Bloque raro → cromo | `PROB_BLOQUE_RARO = 0.05` | 3 % | 5 % | **9 %** | más frecuentes |
| 4 | Reto bonus → cartel de logro | literal `0.25` en `40-partida.js:288` | 15 % | 25 % | **40 %** | más frecuentes |
| 5 | Extra de bono final | `bonoFinal`, factor | +0 | +0,10 | **+0,25** | mejores |

(\*) Fácil ya saca 0 hoy sin tocar nada: su `mT` es fijo 0,85 y
`gemasDeRapidez(0,85) === 0`. Es la única de las cinco que sale gratis.

Detalles que no son opcionales:

- **(1)** solo cae con `intento === 1` y `azar === false`. Un acierto en segundo
  intento vale lo que valía; responder al azar sigue sin puntuar (requisito 7).
- **(2)** el `+1` de Experto se aplica **solo si el bono base ya era > 0**. No
  puede convertir una respuesta lenta en premio, que es exactamente lo que la
  palanca no debe hacer. `CB.ui.hileraBono` pinta N iconos en bucle: 4 cabe sin
  tocar el DOM ni el CSS.
- **(3)** el álbum tiene **11 cromos** y `darCromo()` devuelve `null` cuando están
  todos, así que el 9 % no infla nada sin fondo: acelera una colección finita.
- **(4)** exige además `D === 3` y `nivel.retoBonus`, condiciones que no cambian.
  El 40 % se aplica sobre un conjunto ya estrecho.
- **(5)** `CB.puntuacion.bonoFinal` gana un **sexto parámetro opcional**
  `modoTiempo`, con el mismo patrón —y por el mismo motivo— que el tercer
  parámetro de `CB.ui.festejo.espera`: sin él la función devuelve exactamente lo
  que devolvía, y **la aserción A6 sigue verde sin tocarla**. Dos rótulos nuevos
  en `ETIQUETA_EXTRA`: `modoNormal: 'Reto de 2 minutos'`,
  `modoExperto: 'Reto de 30 segundos'`. Aparecen en la lista de extras de `p-fin`,
  que es donde el niño ve por qué ha ganado más.

**El récord no necesita nada.** `perfil.mejorPuntuacion` ya está separado por modo
(`40-partida.js:1101`), así que una marca de Experto nunca vuelve inalcanzable la
de Fácil. Ese antifarmeo ya estaba cerrado y sigue cerrado.

**Lo que sí necesita el informe del adulto:** añadir `modoTiempo` a la entrada de
`perfil.historial` (`40-partida.js:1110`). Sin eso, el adulto ve puntuaciones que
no puede comparar entre sí y no sabe por qué.

---

## 4. Renombrado y migración de perfiles guardados

`conCalma` / `normal` / `sinPrisa` → `facil` / `normal` / `experto`.

**El mapa, elegido con una sola regla: a nadie se le acorta el reloj.**

| Antiguo | Segundos hoy | Nuevo | Segundos | Efecto para ese niño |
|---|---|---|---|---|
| `sinPrisa` | 0 | `facil` | 0 | idéntico |
| `conCalma` (por defecto) | 30 | `normal` | 120 | **gana 90 s** |
| `normal` | 30 | `experto` | 30 | reloj idéntico, sube de nivel de premio |

Ningún perfil existente ve el reloj acortarse ni las recompensas bajar. Los
valores de `mejorPuntuacion` viajan con la misma tabla:
`{normal: X, conCalma: Y, sinPrisa: Z}` → `{experto: X, normal: Y, facil: Z}`.

Esto **cambia el formato del perfil guardado**, y `CLAUDE.md` fija qué implica:

> Bump the major only when the saved-profile format changes, because that forces
> a migration in `01-almacen.js`.

Es decir: `CB.almacen.VERSION_ESQUEMA` **2 → 3**, bloque `if (p.version < 3)` en
`migrar()`, y la versión del juego pasa a **2.0.0**.

> **Alternativa, si 2.0.0 parece desproporcionado:** dejar el esquema en 2 y hacer
> el remapeo con una `CB.modos.normalizar(perfil)` idempotente llamada siempre
> desde `migrar()`. Sale gratis y la partida funciona igual. El coste exacto es
> este: un perfil escrito por el juego nuevo y abierto por un build viejo no
> queda protegido por la guarda `p.version > VERSION_ESQUEMA`; el build viejo
> leería `modoTiempo: 'experto'`, caería al respaldo de 30 s (inofensivo) y
> compararía el récord contra una clave que no existe, perdiendo la marca en
> silencio. **Recomiendo el bump a 2.0.0**; es literalmente el caso para el que
> se escribió esa regla.

`CB.almacen.sanear()` no estorba: ninguna clave nueva empieza por `_`.

---

## 5. Fichero por fichero

### Nuevos
- **`src/js/2B-modos.js`** — la tabla y sus seis funciones puras.
- **`pruebas/casos-modos.js`** — la suite nueva (§6). Alta en `pruebas/pruebas.html`
  **y** en `pruebas/pruebas-min.html`, que son ficheros a mano, no generados.

### Motor
- **`js/20-puntuacion.js`** — dos cambios y ninguno más: `'sinPrisa'` → `'facil'`
  en la línea 36, y el sexto parámetro de `bonoFinal` + los dos rótulos.
  `calcular()` conserva su fórmula intacta.
- **`js/40-partida.js`** —
  - `SEGUNDOS_ITEM` y `msDeItem` **se eliminan** (pasan a `CB.modos`); las llamadas
    de `iniciarCronometro` apuntan a `CB.modos.msDeItem`, y ahí se consulta
    `ajustes.sinLimiteTiempo` (§1.1).
  - `PROB_BLOQUE_RARO` y el literal `0.25` de `esRetoBonus` → `CB.modos.probCromo` /
    `CB.modos.probReto`.
  - `trasAcierto`: la gema extra y el `+1` de rapidez, **por una sola función**
    (`CB.modos.gemasDeAcierto`), porque `e.gemas` y `perfil.gemas` se suman en dos
    sitios y sumar a mano en dos sitios es cómo se descuadra un marcador.
  - `iniciar()`: `modoTiempo: (modo === 'tranquila') ? 'facil' : (perfil.ajustes.modoTiempo || CB.modos.POR_DEFECTO)`.
  - `finalizar()`: `claveModo` con los nombres nuevos, sexto parámetro a
    `bonoFinal`, y `modoTiempo` en la entrada de `historial`.
  - `tiempoAgotado()`: la bajada automática tras 3 tiempos agotados pasa a `facil`.
    **Y baja también el nivel de premio, a propósito:** es un modo, no dos cosas.
    Eso además cierra la puerta a farmear —agotar el tiempo aposta cuesta tres
    ítems a cero puntos para conseguir *menos* recompensa— y el niño puede volver
    a subir desde la pausa cuando quiera.
- **`js/01-almacen.js`** — `VERSION_ESQUEMA = 3`; `modoTiempo: 'normal'` y
  `sinLimiteTiempo: false` en `perfilNuevo`; `mejorPuntuacion` con las claves
  nuevas; bloque de migración `< 3`.

### Interfaz
- **`js/99-arranque.js:268-276`** — la fila «El reloj» pasa a «Modo de juego» y deja
  de tener su propio `{conCalma:…}`: lee `CB.modos.ORDEN` y `TABLA[x].etiqueta`.
- **`js/41-panel-adulto.js:459`** — igual, más la fila nueva de `sinLimiteTiempo`
  con su `nota` explicando para quién es.
- **`src/index.html`** —
  - `#hud-segundos` deja de traer el literal `30` (se pinta al arrancar).
  - **`p-ayuda`, líneas 480-484 y 561**: hoy dicen «30 segundos» y nombran los tres
    ajustes viejos del reloj. Es texto estático y por eso su guardián vive en
    `auditar.mjs` (E101). Se reescribe a los tres modos.
  - **Discrecional:** un `#btn-modo` en `p-mapa` junto a JUGAR que cicla el modo y
    lo muestra. Es lo que convierte «tres ajustes» en «tres modos de juego» a ojos
    del niño. Si se añade y algún módulo cachea el nodo, hay que darlo de alta en
    las secciones simuladas de las dos páginas de prueba.
- **`src/scss/components/_componentes.scss:189`** — `.reloj__cifra { min-width: 2.2ch }`
  → `3.2ch`. Con 120 s la cifra tiene **tres dígitos** y hoy la caja está medida
  para dos: a 320 px eso empuja la fila del HUD, que es exactamente la familia de
  defecto de E99/E100 (a 320 px nada desborda visiblemente, se recorta callado).
- **`CB.ui.reloj.SEG_PRISA = 10`** — **no se toca**. «Hurry up!» significa «quedan
  diez segundos» en los tres modos: un número, un significado. Hacerlo relativo
  sería un segundo número que mantener.

### Herramientas
- **`herramientas/retrato-pantallas.mjs:36`** — `'sinPrisa'` → `'facil'`. Los 54
  retratos cambian donde el reloj sea visible; hay que rebasar la línea base a
  conciencia, no dejar que el sha256 lo pase por alto.

---

## 6. Guardianes

Tests existentes que **cambian a propósito** (no son roturas, son contratos):

- `casos-reloj.js:7-20` — las claves pasan a `facil|normal|experto`;
  `msDeItem('normal') === 120000`, `msDeItem('experto') === 30000`, y sigue en pie
  la salvaguarda legal `msDeItem('facil') === 0`. El modo desconocido cae a 120000.
- `casos-a11y.js:116` — pasa a `CB.modos.TABLA.facil.segundos === 0`.
- `casos-formulas.js` — **los 30 valores no cambian**. Solo los nombres: C11
  `conCalma`→`normal`, C12-C14 `sinPrisa`→`facil`, y los dos arrays literales
  `['normal','conCalma','sinPrisa']` pasan a `CB.modos.ORDEN`. A3 conserva su
  significado y su motivo.
- `casos-motor.js:37` — mismo renombrado.
- `casos-carga.js` — fija los 12 globales de nivel superior; `2B-modos.js` no
  añade ninguno (todo cuelga de `CB.modos`), así que no debe moverse. Si se mueve,
  es que algo se ha declarado mal.

Suite nueva `casos-modos.js`, **E114-E123**:

- **E114** la tabla declara exactamente tres modos y sus segundos son 0 / 120 / 30.
- **E115** el orden de recompensa es estricto y se comprueba **recorriendo la
  tabla**, no a mano: para cada una de las cinco palancas, `facil ≤ normal < experto`.
  Una palanca nueva que alguien añada desordenada falla aquí sola.
- **E116** `bonoFinal` sin sexto parámetro devuelve exactamente lo de antes.
- **E117** el modo **no** entra en `calcular()`: mismo `rt` y mismo ítem dan los
  mismos puntos en Normal y en Experto, y en Fácil los 0,85 de siempre.
- **E118** la gema extra de Experto cae solo con `intento === 1` y nunca con `azar`.
- **E119** el `+1` de rapidez no convierte un 0 en un 1 en ningún modo.
- **E120** migración: un perfil v2 con cada uno de los tres valores viejos sale con
  el nuevo, y `mejorPuntuacion` conserva los puntos en la clave que le toca.
- **E121** en Fácil el reloj no aparece: `arrancar(0)` deja `#hud-reloj[hidden]`.
- **E122** tres tiempos agotados seguidos llevan a `facil` y desde ahí no puede
  volver a agotarse el tiempo (la propiedad que ya documenta `40-partida.js:499`).
- **E123** `sinLimiteTiempo` pone el reloj a cero **en los tres modos** y no cambia
  ninguna de las cinco palancas.

En `auditar.mjs`:

- **E124** la pantalla de ayuda nombra exactamente los tres ids de `CB.modos.TABLA`
  —misma forma que la comprobación de los cuatro mundos de E101—. Renombrar un
  modo y dejar el nombre viejo en la ayuda no lanza ningún error hoy; deja a un
  niño leyendo instrucciones de un juego que ya no existe.
- **E125** guardián de 320 px con el patrón `<iframe srcdoc>` de E102/E103: con
  `120` en la cifra, la fila del HUD no desborda. Medido en un iframe con
  viewport propio, nunca en un `<div>`, y afirmando `innerWidth === 320` y que la
  hoja se aplicó.

**Sembrar antes de confiar.** Cada guardián se valida reintroduciendo el defecto:
poner Experto por debajo de Normal en una palanca (E115), quitar la guarda de
`intento` (E118), dejar `2.2ch` en la cifra (E125). Un guardián verde que no se ha
visto rojo no ha demostrado nada.

---

## 7. Documentación

- **`CLAUDE.md`** — contrato 45 → 46 fuentes; `js/2B-modos.js` declarado fuente
  única de los modos igual que `js/17-catalogo.js` lo es de los 92 niveles; línea
  base de comprobaciones; rango E1-E125.
- **`docs/decisiones.md`** — `D-2.0.0`, con las tres cosas que dentro de seis meses
  nadie va a poder deducir del código: (a) por qué la ventaja del modo vive fuera
  de `calcular()` y no dentro; (b) por qué Fácil conserva el 0,85 y por qué eso
  mantiene A3 con su sentido original; (c) por qué la migración nunca acorta el
  reloj de nadie. Y actualizar el párrafo de la línea 392, que dice que la
  diferencia entre «Con calma» y «Normal» se perdió: se recupera aquí.
- **`CHANGELOG.md`**, **`README.md`**, **`LEEME.txt`**, **`package.json`** — versión
  replicada; la auditoría falla si alguna deriva.

---

## 8. Orden de trabajo

Cinco pasos, cada uno verde antes del siguiente. El orden importa: **el
renombrado se separa del cambio de comportamiento**, que es la lección de 1.23.0
—un renombrado convierte los tests que no miden en una trampa, así que primero se
hace el movimiento que no cambia nada y se comprueba que de verdad no cambia nada.

1. `2B-modos.js` + manifiesto + migración + E114/E115/E120. **Nadie lo usa aún.**
2. Renombrado completo en código, tests y herramientas, **con los segundos viejos**
   (0/30/30). Verde = el renombrado está limpio y ninguna otra cosa se ha movido.
3. Los segundos de verdad (0/120/30) + cifra a `3.2ch` + ayuda + selector de modo.
   E121, E124, E125.
4. Las cinco palancas, **una por confirmación**, cada una con su guardián y su
   siembra. E116, E117, E118, E119, E122.
5. `sinLimiteTiempo` (E123) + documentación + versión.

Cierre, sin atajos: `npm run entregar` (nunca `auditar.sh` a secas: pasa en verde
sobre un `dist/` de hace tres días), **las dos** páginas de prueba —legible y
minificada— en **pestaña en primer plano**, y una pasada real en Chrome jugando un
ítem en cada uno de los tres modos. Lo que hay que mirar en esa pasada, porque no
lo ve ningún test:

- **Los problemas de enunciado en Experto.** `docs/decisiones.md:395` ya avisa:
  «30 s incluyen leer tres frases antes de empezar a pensar. Es lo primero que hay
  que mirar en el pilotaje con niños (F0.5)». Ahora esos 30 s son además el modo
  que más premia, así que la tentación de elegirlo es mayor. Si el pilotaje dice
  que no da tiempo, el arreglo es un `segundos` por familia de ítem en la tabla de
  modos **y en ningún otro sitio**.
