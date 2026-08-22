> **Documentación interna. No se distribuye con el juego.**

# Las doce piezas de dinero — trazabilidad y cómo se regeneran

`dist/img/` contiene doce ficheros WebP, 64 KB entre todos. Son las cinco monedas
de céntimo, las dos de euro y los cinco billetes.

**No se compilan desde nada.** Igual que `dist/audio/`, están versionados en git y
`gulp` no los toca: `limpiar()` borra rutas concretas y `img/` no es una de ellas.
Si desaparecen, no falta construir — falta recuperarlas:

```bash
git checkout -- dist/img
```

## Procedencia — NO VERIFICADA

Las once fotografías de partida llegaron en una carpeta local
(`~/Desktop/euros/moneda-sin-fondo/`) sin nota de origen. Preguntado
expresamente, la respuesta fue **«no lo sé / de una búsqueda»**, y su finalidad
declarada es **didáctica, sin más pretensiones**.

Queda anotado como deuda, con el mismo criterio que se aplicó a la música en
`docs/musica.md`: se dice lo que se sabe y se dice que no está comprobado, en vez
de inventar una atribución que quede bonita. Está declarado igualmente en
`LICENCIAS-TERCEROS.md`, que es el fichero que sí se distribuye.

El billete de **100 €** viene de un fichero aparte (`~/Desktop/100-euros.svg`, un
JPEG dentro de un SVG) que lleva **impresos los recuadros rojos** del diagrama del
BCE señalando las medidas de seguridad. Se advirtió antes de usarlo y se pidió
usarlo igual; a los 125 px de ancho a los que se pinta apenas se distinguen. Si
algún día aparece una foto limpia, se sustituye ese fichero y no hay nada más que
tocar.

Los billetes de **20 y 50 €** llevan la palabra MUESTRA impresa en el original.
No se ha quitado, y es mejor así.

## Qué son, en términos de reproducción

Fotografías **de una sola cara**, pintadas a **~25 % del tamaño real** (0,85 px por
milímetro sobre unos originales de 120 a 147 mm de ancho). No son facsímiles, no
son imprimibles a tamaño y no se parecen a dinero en la mano: son material de
aula para aprender a distinguir denominaciones.

## Los tamaños, y por qué son esos

Cada pieza se pinta a su tamaño real a escala, y de ahí sale gratis la pista de
tamaño que un niño usa sin que se la expliquen.

**Monedas — 3,1 px/mm**, con la de 1 € como ancla porque ya medía 72 px y no
había motivo para moverla:

| Pieza | Diámetro real | CSS  | Fichero |
|-------|---------------|------|---------|
| 1 c   | 16,25 mm      |  50  | `pieza-c1.webp`  |
| 10 c  | 19,75 mm      |  61  | `pieza-c10.webp` |
| 5 c   | 21,25 mm      |  66  | `pieza-c5.webp`  |
| 20 c  | 22,25 mm      |  69  | `pieza-c20.webp` |
| 1 €   | 23,25 mm      |  72  | `pieza-1.webp`   |
| 50 c  | 24,25 mm      |  75  | `pieza-c50.webp` |
| 2 €   | 25,75 mm      |  80  | `pieza-2.webp`   |

Ordenadas por tamaño y no por valor a propósito: **la de 10 céntimos es más
pequeña que la de 5**, y la de 50 más grande que la de 1 €. Es verdad, y es la
trampa que tiene el dinero de verdad.

**Billetes — 0,85 px/mm.** El tope no es la escala: es que dos billetes y 16 px de
hueco tienen que caber en los 288 px útiles de la pantalla más estrecha del
proyecto. El de 100 se queda en 125 px de ancho, justo por debajo.

| Pieza | Real (mm) | CSS      | Fichero |
|-------|-----------|----------|---------|
| 5 €   | 120 × 62  | 102 × 53 | `pieza-5.webp`   |
| 10 €  | 127 × 67  | 108 × 57 | `pieza-10.webp`  |
| 20 €  | 133 × 72  | 113 × 61 | `pieza-20.webp`  |
| 50 €  | 140 × 77  | 119 × 65 | `pieza-50.webp`  |
| 100 € | 147 × 82  | 125 × 70 | `pieza-100.webp` |

Cada fichero se genera **al doble** de su caja CSS, que es lo que necesita una
tableta de doble densidad y ni un píxel más.

## Cómo se regeneran

Con ImageMagick y `cwebp`, desde la carpeta con los originales. El `-trim` es lo
que hace que la escala signifique algo: los originales traen márgenes distintos
cada uno, y sin recortarlos «3,1 px/mm» sería 3,1 px/mm de foto, no de moneda.

```bash
SRC=~/Desktop/euros/moneda-sin-fondo
OUT=dist/img

# monedas: cuadradas, con el fondo transparente conservado
moneda() {  # fichero destino ladoCSS
  magick "$SRC/$1.png" -trim +repage -resize $(($3*2))x$(($3*2)) \
    -background none -gravity center -extent $(($3*2))x$(($3*2)) /tmp/m.png
  cwebp -quiet -q 82 -alpha_q 90 -m 6 /tmp/m.png -o "$OUT/$2.webp"
}
moneda 1-cent  pieza-c1  50
moneda 10-cent pieza-c10 61
moneda 5-cent  pieza-c5  66
moneda 20-cent pieza-c20 69
moneda 1-euro  pieza-1   72
moneda 50-cent pieza-c50 75
moneda 2-euros pieza-2   80

# billetes: sin transparencia, y el `!` fuerza la caja exacta
billete() {  # fichero destino ancho alto
  magick "$SRC/$1.png" -trim +repage -resize $(($3*2))x$(($4*2))! /tmp/b.png
  cwebp -quiet -q 82 -m 6 /tmp/b.png -o "$OUT/$2.webp"
}
billete 5-euros  pieza-5   102 53
billete 10-euros pieza-10  108 57
billete 20-euros pieza-20  113 61
billete 50-euros pieza-50  119 65
```

El de 100 sale del SVG con el JPEG dentro:

```bash
magick ~/Desktop/100-euros.svg -trim +repage -resize 250x140! /tmp/b100.png
cwebp -quiet -q 82 -m 6 /tmp/b100.png -o dist/img/pieza-100.webp
```

**WebP y no PNG** porque son fotografías: en PNG las mismas doce pasan de 64 KB a
más de 400. El suelo de aparatos declarado —Chromebook de 2019, iPad de 6.ª
generación— lo soporta de sobra (Chrome 32 y Safari 14).

## Dónde tocarlas si cambian

Cuatro sitios, y los cuatro se comprueban solos:

1. `src/scss/abstracts/_variables.scss` — las declara como `--pieza-*`;
2. `src/scss/components/_componentes.scss` — el tamaño de cada una;
3. `gulpfile.js` — la lista que entra en el armazón del service worker;
4. `pruebas/auditar.mjs` — la lista cerrada del bloque 4.

Si una falta, sobra o no la usa el CSS, la auditoría se pone roja. Y si un fichero
está declarado pero no llega a descargarse, lo caza el guardián E89 de
`casos-regresiones.js`, que las carga las doce y mira `naturalWidth` — probado
escondiendo una a propósito, que es la única forma de saber que un guardián mira.
