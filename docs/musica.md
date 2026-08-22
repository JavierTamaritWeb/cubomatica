> **Documentación interna. No se distribuye con el juego.**

# Música — trazabilidad y decisiones

> Cubomática 1.23.3

## 1. Origen de los ficheros

Las nueve pistas las aportó el usuario el 25 de julio de 2026, ya descargadas,
declarándolas «música libre de derechos». El patrón de nombre
`<autor>-<titulo-seo>-<id>.mp3` y los identificadores numéricos corresponden a
la convención de descarga de **Pixabay**, cuya *Content License* permite el uso
comercial y no comercial y no exige atribución. **Esa procedencia está inferida
del nombre del fichero, no verificada contra la página de descarga**: si alguna
pista viniera de otro sitio, hay que revisar su licencia antes de publicar.

## 2. Equivalencia de nombres

Los ficheros están copiados **bit a bit**; solo cambia el nombre.

| En el juego            | Fichero original                                                  |
|------------------------|-------------------------------------------------------------------|
| `tema-principal.mp3`   | `musicinmedia-chiptune-symphony-8bit-game-theme-music-381366.mp3` |
| `mundo-pradera.mp3`    | `tunetank-game-roblox-gaming-background-music-347589.mp3`         |
| `mundo-bosque.mp3`     | `maksymmalko-game-gaming-background-music-385611.mp3`             |
| `mundo-rio.mp3`        | `viacheslavstarostin-game-gaming-minecraft-background-music-370830.mp3` |
| `mundo-mina.mp3`       | `maksymmalko-roblox-minecraft-fortnite-video-game-music-358426.mp3` |
| `jefe.mp3`             | `u_z2x0wum3cm-minecraft-run-music-394978 (1).mp3`                 |
| `calma.mp3`            | `unrealmicikcz12-mystic-realm-of-minecraft-235545.mp3`            |
| `cantera.mp3`          | `tatamusic-gaming-minecraft-game-gaming-music-423630.mp3`         |
| `victoria.mp3`         | `musicinmedia-chiptune-happiness-retro-8bit-game-music-453214.mp3` |

**Por qué se renombraron.** Seis de los nueve nombres originales contienen
literalmente marcas registradas de terceros (son palabras clave de posicionamiento
que el autor puso al subir el fichero, no el título de la obra). Todo el proyecto
está construido sobre la regla de §21.1 de no arrastrar esas marcas a ningún
fichero que se entregue, y `pruebas/auditar.sh` la comprueba con un `grep`
recursivo. Un fichero de audio llamado así habría metido la marca en el nombre
del fichero, en el `<script>` que lo referencia y en la lista de créditos: los
tres sitios donde el plan había decidido expresamente que no apareciera.

Esta tabla es el único punto del repositorio donde se conserva la correspondencia,
y vive en `docs/` precisamente porque `docs/` está excluido del `grep` de marca
(está declarado no distribuible en la cabecera de cada fichero).

## 3. Reparto de pistas

El reparto se decidió por el título y por dos medidas objetivas (volumen medio y
duración). **No se decidió escuchando las pistas**: cambiar cualquier asignación
es editar una línea de la tabla `CB.musica.PISTAS` en `js/07-musica.js`.

| Pista            | Dónde suena                                                      | Duración | Volumen medio |
|------------------|------------------------------------------------------------------|----------|---------------|
| `tema-principal` | portada, perfiles, calibración, mapa, ajustes, informe, adulto, créditos, error | 2:20 | −14,6 dB |
| `cantera`        | cantera, álbum y glosario                                        | 1:16     | −12,0 dB |
| `mundo-pradera`  | partida en M1                                                    | 1:48     | −13,4 dB |
| `mundo-bosque`   | partida en M2                                                    | 3:12     | −12,1 dB |
| `mundo-rio`      | partida en M3                                                    | 2:35     | −20,1 dB |
| `mundo-mina`     | partida en M4                                                    | 4:02     | −16,7 dB |
| `jefe`           | pantalla de jefe                                                 | 1:56     | −17,5 dB |
| `calma`          | micropausa, reparación, informe y panel del adulto               | 4:00     | −17,0 dB |
| `victoria`       | pantalla de fin                                                  | 1:49     | −11,9 dB |

Criterios usados:

- **El tema principal es el que pidió el usuario**, y suena en todo lo que no es
  juego: es lo primero que se oye al abrir y lo que devuelve la sensación de
  «estoy en casa» al salir de una partida.
- **Un mundo, una música.** Las cuatro pistas de partida se reparten por bioma,
  de modo que cambiar de mundo se oye antes de leerse. Las más largas van a los
  mundos con más niveles (M4: 24 niveles, 4:02 de música).
- **`calma` es la más tranquila y la más larga** de las candidatas: la
  micropausa y la tarjeta de reparación son los dos momentos en los que el niño
  tiene que leer y pensar sin prisa, y son también los dos momentos en los que
  habla la voz. Ahí la música se agacha además al 30 %.
- **`jefe` es la de título más urgente** («run»). Es el único sitio donde se
  quiere tensión.

## 4. Normalización por pista

Las nueve pistas se midieron con `ffmpeg -af volumedetect`. El rango va de
−11,9 dB a −20,1 dB: **8,2 dB de diferencia**, más que suficiente para que al
pasar del mapa a una partida en el Río la música se caiga y al volver dé un
salto. Un niño no lo describiría como «desnivel de loudness»; bajaría el volumen
del portátil y ya no volvería a subirlo.

Se corrige en el reproductor, no en el fichero:

```
ganancia = 10^((−16 − volumenMedio) / 20)
```

con el objetivo en −16 dB, y el volumen efectivo del elemento `<audio>` es
`clamp(volumenElegido × ganancia, 0, 1)`.

**El `clamp` es lo que fija los cuatro niveles del ajuste.** Hay ganancias por
encima de 1 (1,603 en `mundo-rio`, que venía 4 dB por debajo del resto), así que
si el nivel más alto multiplicado por la ganancia mayor se pasa de 1, el recorte
cae justo sobre la pista que necesitaba el empujón: la normalización se
desactiva sola y vuelve el desnivel que venía a quitar. De ahí que «Alta» valga
0,62 (0,62 × 1,603 = 0,994) y no 1, y que la escala sea 0 / 0,20 / 0,40 / 0,62
con «Media» por defecto. `pruebas/casos-musica.js` lo comprueba, de modo que
añadir mañana una pista más floja que `mundo-rio` suspende el test en vez de
recortar en silencio.

Se descartó recodificar con `loudnorm` (que mide EBU R128 de verdad, en vez de
usar el volumen medio como aproximación) para no tocar los ficheros que aportó
el usuario. Si algún día se recodifican, hay que poner todas las ganancias a 1.

## 5. Puntos de bucle

Cinco de las nueve pistas terminan en silencio y dos empiezan con silencio. Con
`audio.loop = true` a secas, el bucle mete entre uno y tres segundos de nada
cada vez que da la vuelta. Los puntos se midieron con `silencedetect` a −45 dB y
están declarados en la tabla como `entra` y `sale`: el reproductor funde y
vuelve a `entra` al llegar a `sale`, sin pasar por el silencio.

| Pista            | `entra` | `sale`  | Duración real |
|------------------|---------|---------|---------------|
| `tema-principal` | 0       | 137,0   | 140,1         |
| `mundo-pradera`  | 0       | 108,4   | 108,5         |
| `mundo-bosque`   | 0,40    | 191,6   | 191,7         |
| `mundo-rio`      | 0       | 153,4   | 154,6         |
| `mundo-mina`     | 0,45    | 240,0   | 242,2         |
| `jefe`           | 0       | 116,0   | 116,1         |
| `calma`          | 0       | 239,9   | 240,0         |
| `cantera`        | 0       | 72,8    | 76,0          |
| `victoria`       | 0       | 105,5   | 108,7         |

Esto **no** hace la costura inaudible: la mayoría de estas pistas no están
compuestas para enlazar consigo mismas, y el corte se seguirá notando. Lo que
elimina es el agujero de silencio, que es lo que se oye como «se ha roto».

## 6. Peso

42 MB, contra los 653 KB que ocupaba todo el resto del juego. Es una decisión
consciente y tiene consecuencias reales:

- El juego **sigue funcionando sin red**: los ficheros son locales y se cargan
  como subrecurso de un documento `file://`, igual que las hojas de estilo.
- El juego **ya no cabe cómodamente en un correo**. Para repartirlo en un
  colegio hay que usar una memoria USB o una carpeta compartida.
- Se carga **bajo demanda**: el elemento `<audio>` de una pista no existe hasta
  que esa pista suena, y se suelta (`removeAttribute('src')` + `load()`) en
  cuanto termina de fundirse hacia fuera. En una partida normal se leen de disco
  tres o cuatro ficheros, no nueve, y nunca hay más de dos decodificados a la
  vez.
- Si hiciera falta reducirlo, recodificar a 128 kbps mono lo dejaría en unos
  10 MB con una pérdida de calidad que en un altavoz de portátil de aula no se
  distingue. No se ha hecho por la razón del punto 4: son los ficheros del
  usuario.

El presupuesto de peso de `auditar.sh` se ha partido en dos por esto: el código
sigue teniendo su tope de 900 KB, que era el que protegía el tiempo de arranque,
y la música tiene el suyo aparte, de 60 MB, con la lista de ficheros cerrada.

## 7. Lo que no se ha comprobado

- **Nadie ha escuchado las nueve pistas seguidas** en el contexto del juego. El
  reparto es defendible por título, duración y volumen, pero solo escuchando se
  sabe si `mundo-rio` pega con un mundo de problemas de enunciado o si `jefe`
  asusta en vez de animar.
- **Nadie ha comprobado el efecto de dos horas de bucle.** Una pista de 1:16 en
  la cantera se repite 15 veces si un niño se queda mirando el álbum.
- **No hay medida de si la música ayuda o estorba** a la resolución de problemas
  de enunciado. Hay literatura en las dos direcciones para carga cognitiva alta.
  Por eso el ajuste de música tiene un «No» explícito y llega hasta el silencio
  total en un solo toque, y por eso se agacha al 30 % cuando habla la voz.
