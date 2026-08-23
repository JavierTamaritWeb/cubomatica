# Cubomática

**Versión 3.4.7**

**Juego educativo de matemáticas para 2.º de Educación Primaria (7-8 años).**
Lema: *«las Matemáticas son muy divertidas»*. Aprender divirtiéndose.

Sin instalación, sin servidor, sin red, sin cuentas y sin datos personales.
**Se abre con doble clic sobre `index.html`.**

Lo que trae cada versión está en [`CHANGELOG.md`](CHANGELOG.md). El número de
versión vive en `CB.VERSION` (`src/js/00-nucleo.js`) y se ve en la pantalla de
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
- **El botón «Ayuda»** —en la portada y en el mapa— explica el juego entero con
  palabras de 2.º: cómo se responde, las luces, el reloj, las gemas, los cuatro
  botones de la barra, los mundos y sus guardianes, los ajustes y las teclas.
  Está escrito para que lo lea el niño, no la familia.

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
dist/               LO QUE SE JUEGA. Se versiona en git a propósito.
  index.html          Doble clic aquí. No hace falta instalar nada.
  css/  js/           Una hoja y un guion, compilados desde src/
  audio/              9 pistas + CREDITOS.txt. No se generan: son el artefacto.
  sw.js               Service worker (solo actúa servido por HTTP)
src/                LAS FUENTES. No se sirven tal cual.
  index.html          Plantilla; gulp sustituye los bloques marcados
  scss/               Sass organizado por responsabilidad
    abstracts/          variables globales y mixins
    base/ components/   base, animaciones y componentes
    layout/ pages/      pantallas y estilos de página
    themes/ utilities/  biomas, impresión y colores forzados
    app.scss            único punto de entrada
  js/  datos/         45 guiones en orden contratado
manifiesto.json     FUENTE ÚNICA del orden de carga
gulpfile.js         El paso de construcción
herramientas/       Cruce de clases, cadena del manifiesto, comparador de CSS
pruebas/            Suite (dos páginas) y auditar.mjs, la puerta de entrega
docs/               Documentación interna. NO se distribuye con el juego.
```

Cero fuentes y cero peticiones de red. Las texturas se generan con `canvas`, los
efectos de sonido con Web Audio y los sprites con mapas de píxeles. Los únicos
ficheros binarios son las nueve pistas de música y las doce fotografías de las
monedas y los billetes (64 KB las doce), que están ahí porque reconocer una
moneda de 2 € es literalmente lo que pide el currículo y un cuadrado de color con
un 2 dentro no enseña eso.

**Peso: unos 43 MB**, de los cuales 42 MB son música. Lo que el navegador
descarga al arrancar son **349 KB**. Cabe de sobra en cualquier memoria USB, pero
**no cabe en un correo**: para repartirlo en un centro, usa un USB o una carpeta
compartida.

Para repartirlo basta con **copiar la carpeta `dist/`**: es autosuficiente. No
hay una tarea que genere un ZIP a propósito — `dist/` está versionada, así que el
botón «Download ZIP» de GitHub ya trae todo, y un ZIP propio ahorraría 1,4 MB de
43. No compensa mantener un camino de código que se pudre sin que nadie lo note.

## Para jugar: nada

Abre `dist/index.html` con doble clic. No hay que instalar nada, no hace falta
internet y no se envía ningún dato a ninguna parte.

## Para desarrollar

Hace falta [Node 20.19 o superior](https://nodejs.org).

```bash
npm install          # una vez
npm run build        # compila src/ → dist/
npm run dev          # build + servidores + vigilancia y recarga
npm run estilo       # ESLint para JS + stylelint para SCSS
npm run entregar     # estilo + build + auditoría: LA PUERTA DE ENTREGA
npm run autoprueba   # ¿ve la auditoría lo que dice que ve?
```

`npm run dev`, `npx gulp watch` y `npx gulp` permanecen activos esperando
cambios. Vigilan los diez parciales del manifiesto, `app.scss` y
`abstracts/_mixins.scss`; al guardar reconstruyen `dist/` y recargan el
juego. Si cambia `manifiesto.json`, hay que reiniciar el proceso porque Gulp lo
lee una sola vez al arrancar.

El SCSS sigue una estructura 7-1 adaptada al proyecto. Los comentarios usan
`//` para documentar únicamente decisiones no evidentes y no se incluyen en el
CSS compilado. El historial y las justificaciones extensas viven en
`docs/decisiones.md`.

Los parciales ya no llevan números en el nombre: el orden de la cascada lo
declara únicamente `manifiesto.json`. Las variables se consumen mediante el
namespace `v` y los mixins mediante `m`, desde `abstracts/_variables.scss` y
`abstracts/_mixins.scss` respectivamente.

En JavaScript se documentan contratos, invariantes y decisiones no evidentes.
El historial de errores y las explicaciones extensas pertenecen a
`CHANGELOG.md` y `docs/decisiones.md`, no a los ficheros ejecutables.

Las variables locales usan `const` por defecto y `let` únicamente cuando hay
reasignación. La excepción deliberada es `var CB = CB || {};` al comienzo de
los scripts clásicos: esos 45 ficheros se concatenan en un único bundle y
comparten ese espacio de nombres global; repetir allí `let` o `const` produciría
un error de redeclaración. ESLint impide introducir cualquier otro `var`.

Desde 1.7.0 el proyecto tiene compilación. Hasta 1.6.0 no la tenía, y la razón de
que ahora sí es concreta: SCSS con BEM, minificado, responsive y caché sin
conexión no caben sin un paso intermedio. Lo que **no** ha cambiado es el destino:
`dist/` se versiona precisamente para que «clona el repositorio y abre el HTML»
siga siendo verdad para quien no tiene Node ni ganas de instalarlo.

## Pruebas

**¿Funciona con doble clic en tu ordenador?** Abre
**`pruebas/comprobar-doble-clic.html`** haciendo doble clic sobre el fichero.
Comprueba en unos segundos que se puede guardar el progreso, que las texturas se
generan, que las nueve pistas se leen y que el modo sin conexión no se queja
donde no puede funcionar. Es la única comprobación que hay que hacer así.

La suite son **dos páginas**, y hay que mirar las dos:

- `pruebas/pruebas.html` — contra el bundle legible. Es la de trabajar.
- `pruebas/pruebas-min.html` — contra el minificado. Es la que valida la
  configuración del minificador: si alguien la «optimiza», doce comprobaciones se
  ponen rojas.

Las dos necesitan `npm run build` antes; sin él lo dicen en vez de quedarse en
blanco. Base actual: **864 comprobaciones, 0 fallos**.

Sírvelas con la caché desactivada. Una recarga normal de Chrome reutiliza tanto
el bundle como los `casos-*.js`, y entonces el verde que sale mide el código de
hace tres cambios sin que el número de comprobaciones lo delate.

La auditoría que bloquea la entrega es `pruebas/auditar.mjs` — `auditar.sh` y
`auditar.bat` solo la llaman. No usa ni una dependencia, así que corre en un clon
recién descargado.

**Nunca la ejecutes sola antes de entregar**: puede pasar en verde sobre un
`dist/` construido hace tres días, que es el peor fallo posible porque es verde y
es falso. `npm run entregar` comprueba además que `node_modules` no contenga
paquetes ajenos a `package-lock.json`, construye desde las fuentes y audita el
resultado. `npm ci` ejecuta esa limpieza automáticamente; también puede lanzarse
a mano con `npm run dependencias:limpiar`.

## Navegadores soportados

Chrome / Edge 100+, Firefox 100+, Safari 15.4+. Sintaxis ES2017 estricta: el juego
funciona en el Chromebook escolar de 2019 y en el iPad de 6.ª generación.

Desde 1.21.0 la maquetación usa la palabra clave `safe` en el centrado de las dos
zonas de la partida (Chrome 93+, Safari 16, Firefox 63+). Un navegador que no la
entienda **descarta esa declaración y alinea al principio**, que es justo la
degradación buscada: se pierde el centrado y no se pierde ni una línea de texto
ni una tecla. Nada del juego depende de ella para funcionar.

## Licencia

Código, estilos, datos y documentación: **MIT** (ver [`LICENSE`](LICENSE)). Puedes
usarlo, copiarlo y adaptarlo, también en un aula, citando la autoría.

**La música no está bajo MIT**, ni el texto citado del Real Decreto, ni las fuentes.
Las nueve pistas son de sus autores y se usan bajo la *Pixabay Content License*,
que permite el uso dentro de un proyecto pero prohíbe distribuirlas por separado.
Están acreditadas en [`audio/CREDITOS.txt`](audio/CREDITOS.txt) y en la pantalla de
Créditos del juego. Las tres excepciones, explicadas:
**[`LICENCIAS-TERCEROS.md`](LICENCIAS-TERCEROS.md)**.
