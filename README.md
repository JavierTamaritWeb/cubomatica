# Cubomática

**Versión 1.0.1**

**Juego educativo de matemáticas para 2.º de Educación Primaria (7-8 años).**
Lema: *«las Matemáticas son muy divertidas»*. Aprender divirtiéndose.

Sin instalación, sin servidor, sin red, sin cuentas y sin datos personales.
**Se abre con doble clic sobre `index.html`.**

Lo que trae cada versión está en [`CHANGELOG.md`](CHANGELOG.md). El número de
versión vive en `CB.VERSION` (`js/00-nucleo.js`) y se ve en la pantalla de
Créditos del juego.

---

## Cómo se juega

El niño o la niña es un **minero de la Cantera del Saber**. Cada pregunta bien resuelta
pica un bloque. Cada nivel dominado ilumina una **veta** del mapa de la cantera. Las
vetas que no se repasan se cubren de **musgo** y hay que restaurarlas: esa es la razón
honesta para volver mañana.

- **3 luces de cristal en el casco.** Cuando se apagan las tres, termina la expedición
  conservando el 100 % de las gemas y todo el progreso. Nunca se pierde lo aprendido.
- **Se ganan luces extra** con tres logros bonus, alcanzables dentro de una misma partida.
- **La rapidez suma**, nunca resta: el bono se muestra al acertar («+2 por rapidez»),
  jamás como una cuenta atrás que corre mientras el niño piensa.
- **Responder al azar no puntúa**, pero tampoco apaga una luz ni acusa al niño de nada.
- Al fallar, primero aparece una pista; solo al segundo fallo aparece la tarjeta de
  reparación, que enseña el procedimiento paso a paso.

## Contenido

| Bloque | Niveles |
|---|---|
| Numeración | 16 |
| Sumas | 16 |
| Restas | 14 |
| Multiplicación (iniciación) | 10 |
| Problemas de enunciado | 20 |
| Dinero | 8 |
| Vocabulario matemático | 8 |
| **Total** | **92** |

Los 20 niveles de problemas cubren **una estructura semántica cada uno** (cambio,
combinación, comparación e igualación, con la incógnita en distintas posiciones). Esa
es la diferencia entre saber que un niño «falla las restas» y saber exactamente qué
tipo de problema no comprende.

## Alcance curricular declarado

> **Cubomática trabaja el bloque A (Sentido numérico) y, de forma transversal, el
> bloque F (Sentido socioafectivo) de los saberes básicos del primer ciclo de
> Matemáticas del Real Decreto 157/2022, de 1 de marzo, por el que se establecen la
> ordenación y las enseñanzas mínimas de la Educación Primaria (BOE núm. 52, de 2 de
> marzo de 2022). NO trabaja los bloques B (sentido de la medida: longitud, masa,
> capacidad, tiempo, reloj y calendario), C (sentido espacial: figuras y posición),
> D (sentido algebraico: patrones e igualdades) ni E (sentido estocástico: datos y
> azar): esos saberes se trabajan en el aula y este juego no los sustituye.**

El Real Decreto fija los saberes **por ciclo** (1.º y 2.º juntos), no por curso ni por
trimestre. **La secuenciación por curso y trimestre de este juego es propia** y debe
confirmarse con la programación didáctica del centro.

**Sobre las tablas de multiplicar:** las tablas del **2, del 5 y del 10** se practican
como iniciación en el tercer trimestre, tal como es habitual en el aula de 2.º. El
Real Decreto 157/2022 sitúa la construcción de las tablas de multiplicar en el segundo
ciclo, por lo que el resto de tablas está desactivado salvo que la persona adulta lo
active.

**Fuera de alcance de la versión 1**, declarado expresamente: problemas de dos
operaciones, fracciones, decimales y números negativos.

## Qué NO es

- No es una evaluación, ni una nota, ni un test de capacidad.
- No compara al niño con otros niños. No hay percentiles ni ranking.
- No sustituye al maestro ni al material manipulativo. El panel del adulto propone
  precisamente lo contrario: 10 minutos con regletas, monedas o palillos.

## Privacidad

No se recoge ningún dato personal. No hay servidor, ni red, ni cuentas, ni analítica.
El niño se identifica con un **mote** de una lista cerrada de 120 («Topo Cavador»),
nunca con su nombre real. Todo el progreso vive en el `localStorage` de este navegador.

> **Limitación estructural:** sin servidor, el progreso vive solo en este navegador. Si
> cambias de ordenador o limpias el navegador, se pierde. Haz una copia con «Exportar»
> al terminar cada trimestre.

## Aviso legal y de marca

Consulta **`AVISO-LEGAL.txt`**, que es el único lugar del proyecto donde se detalla la
ausencia de afiliación con terceros. La estética voxel de bloques es un **género** y no
es apropiable; todos los nombres, criaturas, texturas y efectos de sonido de este juego
son originales y están generados por código.

## Música

Las **nueve pistas** de música son obra de otras personas: música libre de derechos
descargada de Pixabay y usada bajo la *Pixabay Content License*, que permite el uso
comercial y no comercial. Están acreditadas una a una en **`audio/CREDITOS.txt`** y en
la pantalla de **Créditos** del juego. Los ficheros no se han modificado.

Cada mundo tiene su propia música, y el tema principal suena en todos los menús. La
música se ajusta aparte de los efectos, en **Ajustes → Música**, con cuatro niveles
(*No · Baja · Media · Alta*), y se agacha sola mientras la voz lee un enunciado.

## Estructura

```
index.html          Único fichero de entrada. Doble clic.
css/                9 hojas de estilo (00-08)
js/                 37 scripts: plataforma, generadores, motor, interfaz
datos/              7 ficheros de contenido, incluido el currículo literal del RD
audio/              9 pistas de música + CREDITOS.txt
pruebas/            Suite propia. Abre pruebas/pruebas.html
docs/               Documentación interna. NO se distribuye con el juego.
servir.command      Plan B para macOS si el navegador restringe file://
servir.bat          Plan B para Windows
```

Cero ficheros de imagen, cero dependencias, cero peticiones de red. Las texturas se
generan con `canvas`, los efectos de sonido con Web Audio y los sprites con mapas de
píxeles. Los únicos ficheros binarios son las nueve pistas de música.

**Peso: unos 43 MB**, de los cuales 42 MB son música y menos de 1 MB es el juego
entero. Cabe de sobra en cualquier memoria USB, pero **no cabe en un correo**: para
repartirlo en un centro, usa un USB o una carpeta compartida.

## Pruebas

Abre **`pruebas/pruebas.html`** con doble clic para la suite rápida. Los tests que
necesitan leer ficheros del disco requieren servidor local: ejecuta `servir.command`
(macOS) o `servir.bat` (Windows) y abre `http://localhost:8000/pruebas/pruebas.html`.

La auditoría que bloquea la entrega es `pruebas/auditar.sh` (o `auditar.bat`).

## Navegadores soportados

Chrome / Edge 100+, Firefox 100+, Safari 15.4+. Sintaxis ES2017 estricta: el juego
funciona en el Chromebook escolar de 2019 y en el iPad de 6.ª generación.

## Licencia

Código, estilos, datos y documentación: **MIT** (ver [`LICENSE`](LICENSE)). Puedes
usarlo, copiarlo y adaptarlo, también en un aula, citando la autoría.

**La música no está bajo MIT**, ni el texto citado del Real Decreto, ni las fuentes.
Las nueve pistas son de sus autores y se usan bajo la *Pixabay Content License*,
que permite el uso dentro de un proyecto pero prohíbe distribuirlas por separado.
Están acreditadas en [`audio/CREDITOS.txt`](audio/CREDITOS.txt) y en la pantalla de
Créditos del juego. Las tres excepciones, explicadas:
**[`LICENCIAS-TERCEROS.md`](LICENCIAS-TERCEROS.md)**.
