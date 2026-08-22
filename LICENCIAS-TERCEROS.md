# Lo que no cubre la licencia MIT

> Cubomática 1.20.0

El fichero [`LICENSE`](LICENSE) es MIT a secas, sin una coma añadida, para que
GitHub y las herramientas automáticas la detecten bien. Cubre el **código**, los
**estilos**, los **datos de contenido** y la **documentación** de este
repositorio. Estas cuatro cosas quedan fuera.

## 1. La música — `audio/*.mp3`

**No está bajo MIT.**

Las nueve pistas son obra de sus autores y se usan bajo la **Pixabay Content
License**, que permite el uso comercial y no comercial dentro de un proyecto
pero **prohíbe venderlas o distribuirlas por separado**, fuera de él.

Cada pista está acreditada con autor e identificador en
[`audio/CREDITOS.txt`](audio/CREDITOS.txt) y en la pantalla de Créditos del
juego. Los ficheros son los originales, sin recortar ni recodificar: lo único
que se cambió fue el nombre.

**Si reutilizas este proyecto**, la música te llega con esa licencia y no con la
MIT. Puedes redistribuirla como parte del juego; no extraigas los `.mp3` para
publicarlos sueltos.

La procedencia está **inferida del patrón de nombre de los ficheros**, que
corresponde a la convención de descarga de Pixabay, y no verificada contra la
página de descarga. Está anotado en `docs/musica.md`.

## 2. El texto del currículo — `datos/curriculo-rd157.js`

Son **citas literales** del Real Decreto 157/2022, de 1 de marzo, por el que se
establecen la ordenación y las enseñanzas mínimas de la Educación Primaria
(BOE núm. 52, de 2 de marzo de 2022, referencia BOE-A-2022-3296).

El texto de una disposición legal española no es objeto de propiedad
intelectual (art. 13 del Texto Refundido de la Ley de Propiedad Intelectual).
Se reproduce citando su origen completo.

**La secuenciación por curso y trimestre de este juego es propia**, no del Real
Decreto: la norma fija los saberes **por ciclo**, y por eso el campo del
catálogo se llama `trimestreSugerido` y no `trimestre`.

## 3. Las doce fotografías de dinero — `img/*.webp`

**No están bajo MIT**, y su procedencia **no está verificada**.

Son doce fotografías de monedas y billetes de euro que se usan para que la
pregunta «toca la moneda de 2 euros» enseñe una moneda de 2 euros. Llegaron al
proyecto en una carpeta local, sin nota de origen, y preguntado expresamente por
su procedencia la respuesta fue que **no se sabe**. Se declara así en vez de
inventar una atribución, con el mismo criterio que se aplicó a la música.

**Su finalidad es didáctica, sin más pretensiones.** Se pintan **de una sola
cara** y a **~25 % del tamaño real**: no son facsímiles, no son imprimibles a
tamaño y no sirven para nada que no sea aprender a distinguir denominaciones. Los
billetes de 20 y 50 llevan además la palabra MUESTRA impresa en el original.

Si reutilizas este proyecto y necesitas certeza sobre estas imágenes, **cámbialas
por unas cuyo origen conozcas**: son doce ficheros en `img/`, están declarados en
una lista cerrada y `docs/dinero.md` explica cómo se regeneran.

## 4. Las fuentes de mapa de píxeles

El proyecto **no incluye ningún fichero de fuente**. Se declaran con `local()`
en `src/scss/_00-fuentes.scss` y se usan únicamente si el sistema ya las tiene
instaladas; si no, la cascada cae en la pila monoespaciada del sistema.

Las licencias **SIL Open Font License** de Silkscreen y de Press Start 2P están
en [`docs/licencias/`](docs/licencias) a título informativo, para quien quiera
instalarlas o empaquetarlas.

## Y una cosa que no es una licencia pero se pregunta igual

Cubomática es una obra **original e independiente**. La estética de mundo de
cubos es un género artístico y no es apropiable; todos los nombres, criaturas,
texturas y efectos de sonido del juego son de creación propia y están generados
por código. El detalle completo está en [`AVISO-LEGAL.txt`](AVISO-LEGAL.txt).
