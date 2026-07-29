# Registro de cambios

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado semántico: la primera cifra sube solo cuando cambia el formato del
perfil guardado, porque eso obliga a migrar `js/01-almacen.js` y es lo único
que puede romperle el progreso a un niño.

La versión de referencia es `CB.VERSION` en `src/js/00-nucleo.js`. La repiten
este fichero, `README.md`, `LEEME.txt` y `package.json`; `dist/sw.js` la lleva
también, pero esa la inyecta gulp y no puede desviarse.
`pruebas/auditar.mjs` comprueba que las cinco coincidan.

---

## [1.11.0] — 2026-07-29

**Segunda cifra: el teclado de los problemas gana seis cosas que no tenía.** Fase 9 del
plan. El perfil guardado no cambia.

### Había tres teclados y solo uno estaba bien

La tercera fase de `selectorDatos` —escribir el resultado de un problema— era una copia
del teclado, y llevaba desincronizada desde que se escribió. No es un rincón: se usa en
**todos** los problemas de enunciado desde el segundo trimestre.

| | La copia | El original |
|---|---|---|
| ⌫ | mudo | suena |
| dígito | mudo | suena |
| visor | un `div` pelado | con `role="status"` y `aria-live` |
| bloqueo de 800 ms | no lo miraba | sí |
| `data-tecla` del OK | `"OK"` en mayúsculas | `"ok"` |
| teclado físico | no había | dígitos, ⌫ y Enter |

La de las mayúsculas es la que remata: `[data-tecla="ok"]` distingue mayúsculas, así que
ese OK **ni siquiera recibía el verde** del botón primario.

Ahora la fase 3 delega en `tecladoBloques`, que acepta un contenedor ajeno. Queda **una
sola construcción de teclado** en todo el proyecto, y la fase 3 gana de paso el manejo
por teclado físico, que no tenía: se jugaba con el dedo o no se jugaba.

### Y un séptimo formato sin la protección de los 800 ms

Al mirarlo de cerca: `selectorDatos` **ignoraba su propio `opciones.bloqueoMs`** —pasaba
0 a `montar()`— y además ponía `CB.partida.bloqueado = false` al final, **después** de
pintar. Era el único de los siete formatos sin la protección contra el toque heredado del
ítem anterior. La línea se mueve antes de pintar.

### Pruebas: 595 → 612

**E68**, y lo que vigila no es nada de lo de arriba: vigila que los **cuatro campos de
diagnóstico** lleguen intactos a `alResponder`. De ellos sale el informe del adulto, y no
se ven en pantalla. Unificar teclados es fácil; que el informe empiece a decir que el niño
falla la comprensión lectora cuando lo que falla es la cuenta no da ningún error.

Sembrado —borrar `faseDatosOk` del envoltorio— se pone rojo exactamente ahí.

### Un guardián que se puso rojo contra código correcto

**E65 bajó a «6 de 7»** al unificar los teclados: comprobaba la confirmación del antiazar
leyendo el **texto fuente** de cada formato, y `selectorDatos` dejó de contener la palabra
porque ahora delega. La confirmación seguía ahí; el guardián no podía verla.

Es la fragilidad que el proyecto ya tiene anotada —leer `toString()` solo vale para
literales y nombres de propiedad—, usada aquí para inferir comportamiento. El barrido se
queda porque cubre seis formatos de un vistazo y acepta la delegación, y el séptimo lo
comprueba E68 **conduciendo las tres fases** y tocando el OK dos veces, que es la única
forma honesta de saberlo.

---

## [1.10.0] — 2026-07-29

**Segunda cifra: entran capacidades.** Fase 8 del plan. El perfil guardado no cambia.

Cuatro cosas que un niño de 7 años no podía hacer y debía poder.

### Deshacer, en los dos formatos que no dejaban

`ordenarFila` se contestaba sola al colocar la última pieza y no había forma de
retirar ninguna: tocar el 5 cuando se quería el 3 obligaba a **terminar mal el ítem a
propósito**. Y el registro guardaba «falló ordenar». Lo mismo en la fase de datos de
`selectorDatos`, que además saltaba de fase sola y anotaba `faseFallada = 'datos'` —
que es atribuirle al niño un problema de comprensión lectora cuando lo que ha pasado es
que se le ha ido el dedo.

Ahora: un ⌫ en la fila de ordenar, destocar en la fase de datos, y un
«◀ Cambiar los números» en la fase siguiente para cuando ya ha saltado.

**Sin OK y sin peaje**: se sigue contestando al colocar la última pieza, así que el caso
bueno no cuesta ni un toque más. Exigir un OK habría metido un toque obligatorio en cada
ítem de esos formatos, que es lo contrario de lo que se busca.

### La confirmación de dos toques era invisible, y la pedían tres de siete

`pedirConfirmacion` hundía el botón 300 ms —indistinguible del `:active` de cualquier
botón— y llamaba a `CB.a11y.anunciar`, que escribe en una región con
`clip: rect(0 0 0 0)`. Justo después de decidir que el niño va al tuntún, el juego le
cambiaba la regla de entrada y **se lo contaba solo a un lector de pantalla**.

Ahora se ve, con `CB.ui.mensaje`. Se **sustituye** el anuncio en vez de añadirlo, porque
`CB.ui.mensaje` ya anuncia por dentro y dejar los dos haría que el lector lo dijera dos
veces.

Y la piden los siete formatos, no tres. Se la saltaban `selectorSigno`, la fase 3 de
`selectorDatos`, `ordenarFila` y `monedas` — el patrón E44 entero. En los dos últimos la
respuesta se dispara sola, así que la confirmación cuelga del gesto que la cierra: la
última pieza, la moneda que alcanza el importe. **Por eso esta parte necesitaba el ⌫**:
sin poder deshacer, un «toca otra vez» sobre la última pieza no tendría segunda
oportunidad posible.

### «◀ Salir» ya no termina la expedición de un roce

Estaba abajo a la derecha, a 16 px del botón de sonido y del mismo tamaño: la zona del
pulgar que sujeta la tableta. Un roce y se acababa.

Ahora pide **dos toques** y el aviso cambia el **texto** del botón —«◀ Salir de
verdad»—, no su color: nunca solo color, y aquí además el color queda debajo del dedo.
El armado **caduca a los 3 s**. Y el botón se muda al grupo de la izquierda, con Pista,
lejos de esa mano.

No se usa `pedirConfirmacion`: esa función empieza con
`if (!_confirmacionPendiente) { alConfirmar(); return; }`, y esa bandera solo vale `true`
cuando el antiazar ha disparado. En una partida normal habría sido un no-operativo — un
cerrojo que no cierra, verde en las pruebas y roto en el juego.

### Tocar una moneda no dejaba ninguna marca

El manejador sumaba al total y la pieza seguía idéntica. Pagar 6 € es tocar tres veces
la moneda de 2 €, y las tres veces la moneda se quedaba igual. Había además una regla
CSS muerta para `[aria-pressed="true"]`, un atributo que **nadie ponía nunca** sobre una
moneda.

Ahora se **cuenta** con `data-veces` —no se marca con `aria-pressed`, que convertiría un
contador en un interruptor y le diría «pulsado» al lector de pantalla de un botón que
hay que seguir pulsando (WCAG 4.1.2)— y hay una **fila visible de lo cogido**:
«2 € + 2 € + 1 €». Es lo que de verdad descarga la memoria: el niño ve la suma, no solo
el resultado. «Empezar de nuevo» borra las marcas y vacía la fila.

Y monedas y billetes no son `.btn-bloque`, así que durante los 800 ms de construcción no
recibían ni el «toc» ni la sacudida: se tocaban y no pasaba nada de nada. Ahora sí.

### Pruebas: 561 → 595

**E64** a **E67**. El plan los llamaba E61-E64; esos números ya estaban gastados.

Los cuatro validados con su siembra, y E65 además **señala cuál** de los siete formatos
se ha saltado la confirmación en vez de caerse en bloque — si un fallo en uno tumbara los
siete asertos, no sabríamos cuál.

Y la siembra de vacuidad, que es la que importaba: sin esperar al desbloqueo de
`montar()`, los guardianes **se ponen rojos** en «los dos primeros toques entran de
verdad → obtenido 0», en vez de pasar en verde por no haber tocado nada. Al primer
intento la siembra no valía —seguía esperando un tic de 20 ms, y el desbloqueo llega
antes—, así que hubo que sembrarla dos veces para que dijera algo.

### Un fallo del propio arreglo, cazado por su guardián

`pedirSalida` no soltaba el cerrojo al confirmar: el botón se quedaba armado para
siempre, y al volver a una partida el primer roce en Salir la habría terminado sin aviso
— el fallo que el cerrojo venía a impedir, entrando por la puerta de atrás. Lo cazó la
**tercera** aserción de E66, la de la caducidad, que era la que parecía menos importante.

---

## [1.9.1] — 2026-07-29

**Tercera cifra: corrige, no añade.** Fase 7 del plan. El perfil guardado no se toca.

El teclado se deshabilita 800 ms al montar cada ítem, para que un toque heredado del
ítem anterior no conteste el siguiente. **El bloqueo es correcto y no se toca.** Lo que
estaba mal es cómo se veía.

### El OK era la única tecla que fingía estar viva

`.teclado-bloques .btn-bloque[data-tecla="ok"]` tiene especificidad (0,3,0) y
`.btn-bloque:disabled` (0,2,0). Ganaba el verde: once teclas de piedra y hundidas, y
justo la que el niño quiere pulsar, brillante. No es un detalle estético — es la
diferencia entre «espera un momento» y «pulsa, que no pasa nada», y lo segundo se lee
como que el juego está roto.

Se apaga con los **dos** selectores, `:disabled` y `[aria-disabled="true"]`, porque la
regla base cubre los dos y dejar uno fuera reabre el agujero por la otra puerta.

### Las cifras estaban a 1,52:1

El texto del botón bloqueado era `--deco-piedra-osc` sobre `--deco-piedra`: **#6E6E6E
sobre #8C8C8C = 1,52:1 medido**, frente al 4,5 que exige WCAG 1.4.3. Durante 800 ms por
ítem, treinta veces por sesión, no se distinguía el 7 del 1.

Ahora el texto es el mismo del botón activo: **4,99:1**. Entre activo y bloqueado
cambian el fondo, el bisel invertido y el hundido —tres señales que no son el color— y
no la legibilidad de la cifra. `--gris-carbon` habría sido lo intuitivo y da **3,91:1**:
no llega, y no se usa.

Nacen `--btn-fondo-desactivado` y `--btn-texto-desactivado`, con su propia línea en el
mixin de alto contraste: ese mixin reescribe `--btn-texto` a blanco y **no toca**
`--deco-piedra`, así que sin ella el bloqueado quedaría a **3,36:1**. Con el fondo del
hundido, 12,63:1.

### Y con el movimiento apagado se perdía el hundido

`desactivar-movimiento()` emitía `.btn-bloque--monta { opacity: 1; transform: none; }`.
Con el prefijo `:root.sin-movimiento ` eso vale (0,2,1) y le gana a `.btn-bloque:disabled`
(0,2,0): anulaba también el hundido. Para quien juega con el movimiento apagado —el
ajuste que más lo necesita— el color quedaba como única señal. Ahora la excepción lleva
`:not(:disabled)`.

### Pruebas: 548 → 561

**E62** (ninguna tecla finge estar viva; la excepción de movimiento no alcanza a los
bloqueados) y **E63**, en `casos-contraste.js`, que mide el par sobre **un botón montado
de verdad**, no sobre los tokens: entre lo que dicen los tokens y lo que se ve caben la
especificidad y la cascada, que es justo lo que dejaba el OK verde.

Validados con las tres siembras que pedía el plan, reconstruyendo entre cada una porque
los guardianes miden `dist/` y no `src/`.

Una corrección al propio guardián durante el camino: la mitad que comprobaba el hundido
medía `getComputedStyle().transform` en la maqueta, donde los botones **no tienen caja de
composición** y Chrome devuelve `none` para todo elemento sin renderizar — daba `none`
incluso con un `style.transform` puesto a mano. Se habría puesto rojo midiera lo que
midiera. Ahora lee las dos reglas que compiten y comprueba la relación entre ellas.

---

## [1.9.0] — 2026-07-28

**Segunda cifra: entran tres capacidades.** El perfil guardado no cambia de forma
incompatible —`componentesVistos` ya existía en el esqueleto desde la primera
versión, sin que nadie lo escribiera— así que no hay migración.

Es la **fase 6** del plan que devolvieron las dos lentes que faltaban
(`docs/plan-mejoras-1.8.0.md`): tres funciones escritas, documentadas y que no
llamaba nadie. Ninguna era un error de lógica. La familia de E41 y E55, y van cinco.

### `atras()` no limpiaba nada

`ir()` ejecuta el manejador de salida de la pantalla que deja; `atras()` no lo hacía
en ningún punto. Solo hay dos registrados —apagar los temporizadores de la tarjeta de
reparación y parar el reloj de la partida— así que **la mitad de las salidas del juego
no limpiaban**.

El síntoma no era un error: era el salvavidas de la reparación poniéndose a leer los
tres pasos en voz alta, a los 25 segundos, **encima de otra pantalla**. Y Escape en la
reparación llevaba al mapa dejando la expedición viva detrás; ahora pausa, como en la
partida.

### Los siete componentes se presentan la primera vez que se ven

`CB.componentes.PRESENTACION` tenía las siete frases escritas —«Toca la moneda de 2
euros», «¿Cuál pesa más? 8 y 5»— con sus dos funciones de apoyo, y **cero referencias
fuera de su propio fichero**. `componentesVistos` se declaraba en el perfil, se
reparaba en la migración y estaba en los campos permitidos; no lo escribía nadie. Un
niño veía la balanza por primera vez sin una sola frase que le dijera qué hacer,
teniéndola escrita.

Se marca **donde se monta cada componente**, no adivinando desde `item.formato`: las
claves son nombres de función (`ordenarFila`, `selectorSigno`) y el formato dice otra
cosa (`ordenar`, `signo`), y además el componente real depende de condiciones de
ejecución. Resolverlo por el formato habría dado `undefined` en casi todos los casos
sin fallar — la familia de E42.

Las presentaciones se pintan con un tipo de mensaje **neutro** nuevo. Con el par del
fallo, que fue lo primero que se probó, estrenar una pantalla parecía una reprimenda.

### El enunciado se lee solo, y antes no

`docs/decisiones.md` y un comentario de `src/index.html` daban por vivo que «la
consigna se lee sola al aparecer». **Era falso desde la primera versión**: lo único que
había era una llamada a la región viva, que es texto para un lector de pantalla, no
voz. La única puerta era la tecla L, en un juego cuyo aparato objetivo declarado es un
iPad.

Ahora se lee, con tres condiciones y las tres importan: solo problemas de enunciado,
solo con el ajuste encendido y solo si hay voz española instalada. **No se usa
`leerOGuiar`**, que cae en `lecturaGuiada` y esa no mira `CB.voz.activa`: sería audio
que arranca solo y no se puede apagar, WCAG 2.2 1.4.2. Y en un Chromebook sin voz
española iría a 1000 ms por palabra —25 s de resaltado con el reloj corriendo— y todos
los problemas se agotarían por tiempo. El cronómetro se para mientras lee.

Además, un altavoz **dentro del enunciado**, donde está lo que hay que oír. No vuelve
a la barra: de ahí se retiró a petición expresa. Llama a una variante que **no levanta
el bloqueo antiazar**, porque un altavoz encima de la pregunta se roza sin querer y ese
roce anularía de un toque la única protección contra responder al tuntún.

### Pruebas: 520 → 548

**E59**, **E60** y **E61**. El plan los llamaba E56-E58, pero esos números se los llevó
1.8.1 mientras el plan esperaba; se numeran por orden de escritura.

Sembrados los tres fallos, **E60 no se puso rojo**: comprobaba las dos funciones
sueltas, que llevaban años siendo correctas, y no el conducto que faltaba. Es
literalmente lo que el plan había anticipado. Reescrito para servir un ítem de verdad y
mirar la pantalla, caza la siembra.

Y dos correcciones de las propias pruebas, las dos por medir lo que no era:

- **E61 pasaba en vacío.** Forzaba `estado.itemActual` a mano y luego llamaba a
  `servirItem()`, que genera el suyo desde el guion — y el mundo M1 no sirve problemas
  de enunciado. No se leía nada por no haber problema, no por tener la voz apagada.
- **E60 se ponía rojo contra código correcto**, porque `CB.partida.iniciar()` ya sirve
  el primer ítem y la llamada extra a `servirItem()` medía la pantalla ya limpiada.

---

## [1.8.1] — 2026-07-28

**Tercera cifra: esto corrige 1.8.0, no añade nada.** El formato del perfil no cambia
—`perfil.mensajes.gritos` pierde una bolsa que nunca llegó a llenarse— y no hay
migración.

### El fallo: nueve celebraciones que eran el mismo cartel

1.8.0 dio a cada momento su propia coreografía: nueve recorridos distintos. Pero las
nueve eran **la misma banda**: mismo ancho, mismo sitio, misma tipografía, mismo
tamaño. Cambiar la trayectoria no cambia la forma, y la forma es lo que se reconoce.
Un niño no veía nueve celebraciones; veía el mismo rectángulo entrando de nueve
maneras, veinte veces por sesión. Que es exactamente lo que había que evitar.

Y había una segunda capa, peor: el guardián E47 escrito en 1.8.0 decía «ningún
modificador de cinta reposiciona el cartel». **La monotonía estaba blindada por una
prueba.** Cuando una comprobación impide la corrección, la comprobación es parte del
fallo.

### La corrección: seis vehículos, no seis recorridos

| Momento | Vehículo | ms |
|---|---|---|
| acierto normal (60 % de los casos) | **insignia**: «+1» junto al contador de gemas | 700 |
| esfuerzo | **criatura**: Cubi salta | 1100 |
| superación (acierta tras fallar) | **cinta** | 1300 |
| racha, veta o mundo nuevo | **criatura**: Chispa gira + partículas | 1400 |
| logro o luz extra | **cartel** centrado con bisel | 1600 |
| jefe derrotado | **cinta** | 1800 |
| bloque raro (1 de cada 20) | **sacudida** de la cantera entera | 1200 |
| ánimo, tras fallar | **criatura**: Rocarr asiente. Sin cartel, sin grito | 1100 |

La regla que ordenaba la tabla no cambia y ahora sí se cumple: **el espectáculo es
inversamente proporcional a la frecuencia**. Lo que sale en seis de cada diez aciertos
es un «+1» de un renglón que no tapa nada y no para nada. La banda queda para tres
momentos, y por eso vuelve a significar algo.

Sin efectos de sonido nuevos: siguen siendo doce.

### Retirado

- **Seis coreografías de cinta** (`sello`, `sube`, `cascada`, `estalla`, `veta-madre`,
  `posa`) con sus `@keyframes`. No se «desactivan comentadas»: la comprobación de
  animaciones huérfanas que nació en 1.8.0 no lo habría permitido, y hace bien.
- **Los doce gritos de ánimo.** El ánimo dejó de tener cartel, así que no hay dónde
  escribirlos, y un dato que no se pinta en ningún sitio acaba pareciendo que sí.
  `CB.mensajes.grito()` deja de recibir el tipo: solo hay una bolsa.

### Un fallo encontrado mirando la pantalla, con la suite en verde

El cartel del logro salía a **887 px de altura, fuera de la vista**. Causa:
`_06-biomas.scss` pone `position: relative` a todo hijo directo de `.zona-juego` que no
esté en su lista de exclusiones, y gana por orden de cascada. Se añadió `.cinta` a esa
lista en 1.8.0 y se olvidó `.cartel` en 1.8.1. Es **el mismo fallo que el comentario de
ese fichero documenta desde 1.7.0**, cometido otra vez.

Ninguna prueba lo veía. Ahora E47 compara la `position` **calculada** de los dos
superpuestos, que es la única comprobación que lo caza. Y el cartel bajó del 30 % al
12 % de altura porque a 30 rozaba la fila alta del teclado en una pantalla de 812 px:
medido, no supuesto.

### Pruebas: 489 → 520

**E56** (las celebraciones no comparten vehículo, y la más frecuente es de las más
cortas), **E57** (cada vehículo hace algo distinto y observable) y **E58** (el ánimo no
se celebra). Validados sembrando el fallo original —devolver los ocho momentos a la
cinta—: salen ocho comprobaciones rojas repartidas entre los tres.

---

## [1.8.0] — 2026-07-27

**Segunda cifra: entra capacidad nueva y el perfil guardado no cambia de forma
incompatible.** La bolsa de gritos (`perfil.mensajes.gritos`) la crea
`CB.mensajes.asegurar()` si falta, así que un perfil de 1.7.1 abre en 1.8.0 sin
migración y la primera cifra se queda donde está.

### La cinta: un cartel, nueve coreografías

El «Hurry up!» era el único momento del juego con espectáculo, y gustaba. Pero
llevar *ese mismo* efecto a las felicitaciones habría sido el error contrario:
un niño acierta entre veinte y treinta veces por sesión, y un efecto idéntico
deja de celebrar al tercero — pasa a ser una espera con adorno.

Así que hay repertorio, con tres capas para que no canse:

1. **La forma significa algo.** Las cuatro categorías de acierto ya existían en
   `js/25-mensajes.js` desde el primer día —superación, descubrimiento, esfuerzo,
   procedimiento— y no se veían por ninguna parte. Ahora cada una tiene su
   coreografía. Acertar a la segunda después de haber fallado ya no se celebra
   igual que acertar a la primera.
2. **No se repite.** El grito sale de una bolsa barajada, el mismo mecanismo que
   ya impedía repetir mensaje.
3. **Hay algo que casi nunca se ve.** El bloque raro (1 de cada 20) se lleva
   `cinta-veta-madre`, la más lenta y la de más pasos. Sin algo raro no hay
   sorpresa; solo hay rotación.

Y la regla que ordena la tabla: **el espectáculo es inversamente proporcional a
la frecuencia**. El acierto de todos los días se lleva la más corta y limpia
(900 ms); las largas se reservan para el jefe, la luz extra y el bloque raro.

| Coreografía | ms | pasos | Cuándo |
|---|---|---|---|
| `cinta-sello` | 900 | 6 | acierto normal (categoría A) |
| `cinta-sube` | 1100 | 8 | esfuerzo (B) |
| `cinta-junta` | 1300 | 10 | superación (C) |
| `cinta-cascada` | 1500 | 12 | descubrimiento (D) |
| `cinta-estalla` | 1600 | 12 | logro o luz extra |
| `cinta-bandera` | 1800 | 14 | jefe derrotado |
| `cinta-veta-madre` | 2000 | 16 | bloque raro |
| `cinta-posa` | 800 | 6 | ánimo, tras fallar |
| `cinta-prisa` | 1900 | 18 | «Hurry up!», sin cambios |

**Lo que la cinta NO se lleva es lo que enseña.** El mensaje entero sigue quieto
en `#item-mensaje`: «Has pedido prestada una decena y la has deshecho bien» no se
lee de refilón, y esa frase es la única parte del mensaje que educa. La cinta
lleva un grito corto, material nuevo, de dos listas de 24 y 12. Ninguna de las
84 + 48 plantillas se ha tocado.

Nada de esto varía por color solo: cada coreografía cambia recorrido, duración y
número de pasos, y el glifo repite las dos formas de `.mensaje-resultado`.
Con `prefers-reduced-motion` o `sin-movimiento`, las nueve se paran y **las nueve
siguen viéndose**: quitar movimiento no puede quitar información.

### Un solo nodo, y ningún número duplicado

`.aviso-prisa` pasa a `.cinta--prisa`, y `#aviso-prisa` a `#cinta`. **Un solo
nodo por pantalla**: dos cintas superpuestas son ilegibles, y mientras hubiera un
nodo por aviso, evitar que coincidieran era disciplina. Ahora es imposible.

Y desaparece `CB.ui.reloj.MS_CARTEL = 1900`, que valía eso «porque es lo que dura
`prisa-cruza`», copiado a mano, con un comentario avisando de lo frágil que era.
Con nueve coreografías habrían sido nueve copias. El reparto ahora: **el CSS es
dueño de la forma** (fotogramas y número de pasos), **el JS es dueño del tiempo**
(`CB.ui.cinta.COREOGRAFIAS`). Ningún número vive en dos sitios.

La espera antes del ítem siguiente pasa a `max(la de siempre, duración + 400 ms)`.
Nunca se encoge: acortarla recortaría tiempo de lectura.

### El escalón 4, que llevaba desde la primera versión sin existir

La escalera anti-frustración declaraba **cinco** escalones. El cuarto —«volvemos
un paso atrás al prerrequisito»— estaba declarado en `2A-escalera.js`,
`CB.grafo.prerrequisitoDominado()` estaba escrita y documentada *para él*, y **no
la llamaba nadie**. El juego seguía preguntando lo que el niño no entendía, y de
ahí saltaba a retirarle el concepto.

Ahora, al cuarto fallo seguido de un concepto, se cuela por delante del guion un
ítem de un prerrequisito **ya dominado**, y se dice: «Vamos a por uno más fácil de
este mismo tema. Luego volvemos.» Se dice, en vez de cambiar el nivel en
silencio, porque un niño que ve aparecer algo mucho más fácil sin explicación
concluye que el juego se ha estropeado o que le está dando lástima.

Si no hay ningún prerrequisito dominado no se hace nada y el fallo siguiente cae
en el escalón 5, como antes. Nunca se inventa un nivel.

La decisión se extrae a `CB.partida.aplicarEscalon()` a propósito: mientras vivía
dentro del callback de la tarjeta de reparación, la única forma de comprobar el
escalón 4 era leer el código, y leer el código es exactamente como pasó varias
versiones sin implementar sin que nada se pusiera rojo.

### Pruebas: 443 → 489 comprobaciones

Nueve guardianes nuevos, **E47-E55**, y los nueve validados sembrando el fallo a
propósito y comprobando que se ponía rojo el que debía. Dos no lo hicieron a la
primera:

- **E51 estaba en verde con el fallo dentro.** Comprobaba clases y el valor de
  `_salida`, y las dos cosas sobreviven a quitar la cancelación: reasignar
  `className` repone las clases igual, y `_salida` cambia igual al programar el
  segundo temporizador. El fallo real —el temporizador de la primera cinta se
  queda vivo y esconde la segunda a media animación— solo se ve espiando
  `clearTimeout`. Y el doble se afirma instalado, por lo de `window.caches`.
- **E55 se puso rojo contra código correcto**, porque copié el umbral de la
  escalera (4) en vez de preguntárselo (es 3). Ahora se le pregunta.

Además, dos comprobaciones mecánicas nuevas en `auditar.mjs`, y la primera tapa
un agujero que abrió esta misma versión:

- **`animation-timing-function` en forma larga.** El grep de la regla dura solo
  miraba `animation:` abreviado, y el mixin `coreografia()` emite longhands. Sin
  esto, la regla del proyecto habría dejado de mirar precisamente las nueve
  animaciones más nuevas — en verde.
- **`@keyframes` que no dispara nadie.** Una animación muerta no da error: no se
  ve. Es lo que les pasó a las cinco retiradas en 1.7.0, ahí versión tras versión.

Las dos, también validadas sembrando la violación.

### Retirado

- `CB.ui.reloj.MS_CARTEL` y `CB.ui.reloj.aviso`: la cinta es dueña de lo suyo.
- El `sfx('cofre')` duplicado de `darCromo()`, que sonaba dos veces seguidas.
- El `sfx('acierto')` fijo de `trasAcierto()`: ahora el sonido lo trae la
  coreografía, y por eso una superación no suena igual que un acierto normal.
  Sin efectos nuevos: los 12 de `04-audio.js` siguen siendo doce.

---

## [1.7.1] — 2026-07-27

**Solo correcciones.** La tercera cifra, y no la segunda, porque no entra nada
nuevo; y no la primera, porque el formato del perfil guardado no cambia: E45
**añade** dos campos a `perfil.niveles[*]` (`rachaD` y `fallosD`) y un perfil que
no los traiga vale 0, que es como empezaban. Ningún niño necesita migración.

### Décima ronda: **segunda auditoría severa** (26 y 27 de julio)

Segunda pasada de búsqueda de fallos, esta vez leyendo el motor y el bucle de
juego línea a línea en vez de las herramientas. Salieron **siete**, y los siete
estaban en verde: 56 comprobaciones de auditoría, 405 de suite y cero clases
descuadradas, todas correctas y ninguna mirando hacia donde estaba el problema.

**El que cuelga la pestaña**

- **E40 · bucle infinito en el combate contra Cristalina.** `CB.jefes.opciones()`
  completa hasta cuatro botones cuando los distractores propuestos no llegan, y
  calculaba el candidato como `correcta + lista.length` **dentro** del `while`:
  si ese número ya estaba en la lista no se añadía nada, la longitud no cambiaba
  y la vuelta siguiente calculaba exactamente el mismo candidato. Barrido
  exhaustivo del espacio real de la mecánica «reflejo»: **1,29 % de los turnos,
  es decir el 22,9 % de los combates**. Y como el rng va sembrado con
  perfil + mundo + fecha, al niño al que le toca le vuelve a tocar cada vez que
  lo reintenta ese día: «se cuelga en Cristalina», todos los días, hasta mañana.
  Sin error en consola y sin nada que mirar. Es el único `while` del proyecto que
  no llevaba tope.

**Lo que falseaba la medida**

- **E41 · todos los problemas de enunciado medían 0 ms.**
  `CB.partida.marcarLectura()` existía, estaba bien escrita y **no la llamaba
  nadie** salvo `responder()`, o sea el instante exacto de contestar. Medido en
  navegador: 3.743 ms reales de lectura y razonamiento → rt registrado **0**. Con
  eso, el multiplicador de tiempo salía siempre 1,4 —el tope— y con él las 3
  gemas de bono por rapidez en **todos** los problemas, tardara lo que tardara: la
  familia que más cuesta era la que más premiaba. El informe del adulto daba 0 ms
  en los 20 subtipos. Y en el antiazar, rt = 0 dispara S1 siempre, así que tres
  problemas fallados seguidos añadían S3 y **el niño que lee despacio quedaba
  marcado como que responde al tuntún** — con el rt de verdad, cero señales.
- **E45 · la dificultad interna `D` solo sabía bajar.** `CB.almacen.sanear()`
  descarta por diseño toda clave que empiece por `_`, y los contadores de
  `actualizarD` se llamaban `_racha` y `_fallos`: se borraban en cada guardado
  mientras que `D` sí se guardaba. Subir exigía tres aciertos seguidos del mismo
  nivel **dentro de una sola sesión** (y una partida sirve como mucho tres ítems
  del mismo nivel); bajar bastaban dos fallos, y además persistía. Un niño que
  mejora se quedaba con los ítems fáciles de su peor día.

**Lo que no respondía**

- **E42 · tres de las cuatro pistas de mundo no sonaron nunca.**
  `claveDePantalla()` leía `CB.partida.estado.mundoId`; el estado que monta
  `iniciar()` guarda `mundo`, el objeto. `mundoId` es el nombre del *parámetro*
  de `iniciar({mundoId:…})`, y ahí se quedó. Bosque, río y mina no sonaron jamás
  y toda expedición sonaba a pradera: no hay error, no hay silencio, suena
  música, solo que siempre la misma. **Su test lo daba por bueno porque construía
  el estado a mano con la forma equivocada, copiada de la línea del fallo.**
- **E43 · la barra de partida solo respondía en el borde.** `conectarBarra` leía
  `data-accion` de `ev.target`, y los cuatro botones llevan dentro los dos
  `<span>` que exigen E15/E16 (icono y palabra visible). El toque cae en el span,
  que no tiene el atributo. Pista, Pausa, Sonido y Salir no hacían nada salvo que
  se acertara en los pocos píxeles de padding — y el botón se hunde igual, porque
  eso es CSS. `31-pantallas.js` ya subía por el árbol para `data-ir` desde 1.0.0.

**Reglas que solo se aplicaban a la mitad**

- **E44 · el cerrojo de una respuesta solo estaba en la partida.** E11 lo arregló
  en `CB.partida.responder` y dejó escrito el porqué; los otros dos sitios donde
  se contesta se quedaron sin él. En el jefe los botones viven los 900 ms de la
  animación: **cinco toques, cinco bloques**, y ocho derriban al jefe entero antes
  del segundo turno. En la calibración viven los 1.300 ms del mensaje: **cinco
  toques dan cinco aciertos sobre cuatro ítems**, y esos cuatro aciertos son lo
  único que fija `trimestreDeducido`, o sea el techo de números de todo el juego.
- **E46 · Enter se saltaba la confirmación doble del antiazar.** La rama de Enter
  llamaba a `alResponder` directamente en vez de pasar por `pulsa('OK')`, que es
  quien consulta `pedirConfirmacion()`. La medida se le aplicaba a quien juega
  tocando y no a quien juega con teclado. F8 pide poder jugar una partida entera
  solo con teclado; lo que no pide es que el teclado tenga otras reglas.

**Además**

- `CB.partida.accionDe()` sale del oyente de la barra y pasa a ser función propia:
  se puede comprobar sin instalar un oyente de documento en la suite, que además
  se quedaría puesto y contaría doble en la segunda ejecución.
- `trasFallo` calculaba `CB.escalera.siguienteEscalon()` en una variable que no
  leía nadie y volvía a escribir los umbrales a mano más abajo — dos
  implementaciones de la misma escalera, y probada solo la que no se usaba. Ahora
  decide `CB.escalera`. El escalón 4 sigue sin implementación, pero ahora se ve.
- Suite: **405 → 443** comprobaciones. Los siete guardianes se validaron
  **volviendo a meter cada fallo** y comprobando que el suyo se pone rojo; E40 se
  barrió aparte, en Node y contra el bundle construido, porque su modo de fallo
  es colgarse y una suite colgada no es roja.
- Dos de los guardianes nuevos nacieron en falso verde y hubo que rehacerlos: uno
  afirmaba sobre el **texto fuente** de una función y su propio comentario nuevo
  contenía la palabra buscada; el otro tecleaba antes de que expirase el bloqueo
  de construcción, así que «el primer Enter no contesta» pasaba porque no había
  nada escrito. Los dos son la misma lección que este proyecto lleva tres rondas
  aprendiendo, ahora también dentro de las pruebas.

---

## [1.7.0] — 2026-07-26

### Novena ronda: **limpieza y auditoría severa** (26 de julio)

Repaso posterior a la migración, con dos encargos: quitar lo que sobra y buscar
fallos en serio. Salieron **nueve**, y el patrón que los une es que **casi todos
estaban en verde**.

**Fallos de comportamiento**

- **E37 · «Listo: las 9 pistas están guardadas» sin haber guardado ninguna.**
  `descargarMusica()` avanzaba el contador igual al acertar y al fallar, y luego
  informaba `ok: true` mirando solo si había terminado. Con las nueve pistas
  caídas —un 404, el servidor apagado a media descarga— el panel del adulto daba
  por buena una descarga vacía. Quien lo lee es quien decide si puede llevarse la
  tableta a un sitio sin wifi.
- **E38 · una cuarta copia de la lista de música.** Los nombres de los nueve mp3
  estaban escritos a mano en `45-offline.js`; las otras tres copias
  (`dist/audio/`, la tabla de `07-musica.js`, `CREDITOS.txt`) sí las cruzaba la
  auditoría entre sí. Su modo de fallo era invisible **por partida doble**:
  renombrar un fichero dejaba la música sonando con normalidad y solo rompía la
  descarga sin conexión, que además informaba de éxito por culpa de E37. Ahora
  las rutas salen de `CB.musica`, su dueño único.
- **`gulp dev` vigilaba 10 de los 12 `.scss`.** Fuera quedaban el punto de
  entrada y `_herramientas.scss`, o sea **el fichero donde viven todos los
  mixins**: el sitio que más se toca al ajustar el diseño era el único que no
  reconstruía al guardar. El síntoma no es un error, es que la pantalla no
  cambia — que se lee como «el mixin no funciona».

**Guardianes que no guardaban** (E39). Las tres reglas duras de estilo tenían
cuatro huecos, todos por la misma causa: **cero se escribe de muchas maneras y
el regex solo conocía una**.

| se colaba | por qué |
|---|---|
| `border-radius: 0.5rem` | el filtro que perdona el cero casaba con el **cero inicial** de «0.5rem» |
| `box-shadow: 0 0 4px` | exigía `px` en los desplazamientos, y en CSS el cero no lleva unidad |
| `box-shadow: inset 0 0 8px` | lo mismo, y todo el relieve del juego es inset |
| `transition: opacity 90ms` | no nombra ninguna función — y la **función por defecto en CSS es `ease`** |

Ninguno escondía una violación real: el CSS estaba limpio. Lo que fallaba era la
garantía, no el resultado. Los detectores se reescribieron leyendo declaración a
declaración y capa a capa, y la **autoprueba pasó de 4 casos a 16**: antes cubría
tres greps del bloque 2 y **ninguno** del bloque 3 — justo donde estaban los
cuatro agujeros.

Además: el grep de colores excluía `_herramientas.scss` **por accidente** —
heredaba la exclusión puesta para `transition:` — mientras el verde afirmaba
«todos con nombre en `_01-variables.scss`»; y la comprobación del aviso de girar
exigía que **ningún** `max-width` del proyecto pasara de 300px, así que el primer
punto de ruptura legítimo habría tumbado la construcción con un mensaje sobre
otra cosa.

**Dos verdes falsos en la propia prueba nueva**, encontrados sembrando el fallo a
propósito para ver si el guardián se ponía rojo:

1. El ejecutor llamaba a `s.fn()` y pasaba a la siguiente suite **en el mismo
   turno**. Cualquier comprobación sobre algo asíncrono se escribía como «si
   todavía no ha llegado, pasa» — o sea, pasaba siempre. Ahora una suite puede
   devolver una promesa y la cadena la espera.
2. `window.caches = doble` **no hace nada**: es una propiedad definida solo con
   getter y en modo no estricto la asignación se pierde en silencio. La prueba
   medía la CacheStorage real, donde las nueve pistas fallan igual por 404 — y
   salía verde midiendo otra cosa. Lo destapó su complementaria, la del camino
   bueno, imposible de satisfacer con la caché real.

**Referencias colgando**

- `dist/js/cubomatica.min.js` y `.min.css` terminaban con un `sourceMappingURL`
  hacia dos ficheros que `.gitignore` excluía. Con `dist/` versionada, eso está
  roto en **todos** los clones salvo el que acaba de construir. Se dejan de
  emitir: la depuración ya la cubre mejor `dist/js/cubomatica.js`, que no es una
  reconstrucción aproximada sino las fuentes pegadas byte a byte.
- `LICENCIAS-TERCEROS.md` —que **sí se distribuye**— apuntaba a
  `css/00-fuentes.css`, que dejó de existir en la migración. Igual en los tres
  ficheros de `docs/licencias/` y en `CLAUDE.md`.
- `pruebas/mapa-bem.json` afirmaba que «lo verifica el bloque 8 de la auditoría».
  No lo hace ni lo ha hecho nunca. No se ha arreglado haciendo que lo lea, porque
  un guardián así sería un generador de falsos rojos: `valor`, `dato`, `grupo`,
  `etiqueta` y `entra` son palabras corrientes que salen por todo el código sin
  ser clases — que es justo por lo que el codemod trabajaba sobre el AST. Quien
  cubre ese fallo de verdad es `cruzar-clases.mjs`.
- `.gitignore` reservaba `pruebas/vendor/` para **axe-core, que nunca se añadió**:
  la fase 7 se entregó sin él y la accesibilidad se comprueba con `casos-a11y.js`
  escrito a mano. Y apartaba `.vscode/`, con lo que la corrección que apunta Live
  Server a `dist/` —necesaria justo porque `src/index.html` dejó de ser
  servible— vivía en un solo ordenador mientras todo el que clonara caía en la
  trampa que creó la migración.

**Borrado**, con la evidencia de que nadie los usa:

| fichero | por qué |
|---|---|
| `herramientas/comparar-css.mjs` | de un solo uso; probó la fidelidad CSS→SCSS de las fases 3 y 4 y ya no hay CSS de 1.6.0 contra el que comparar |
| `herramientas/renombrar-bem.mjs` | codemod aplicado e irreversible; volver a pasarlo solo puede hacer daño |
| `pruebas/sin-comentarios.py` | la auditoría en Node lleva su propio despiece desde 1.7.0 |
| `pruebas/fixtures/perfilV1.json` | ningún código lo lee, y ninguno **puede**: sin `fetch` en `file://`. La prueba de migración usa un objeto en línea |

**Suite**: 394 → **405** comprobaciones, 0 fallos, en los dos bundles.
**Auditoría**: 56 comprobaciones, las mismas de antes — lo que cambia no es cuántas son, sino que tres de ellas comprueban de verdad lo que dicen. La autoprueba pasa de 4 casos a 16.

Queda anotado, porque no se ha tocado: el service worker responde a una petición
con rango (`Range`) devolviendo la respuesta completa de 200 que hay en caché.
Chrome lo tolera; **Safari es donde esto suele romper la reproducción**, y Safari
sigue sin probarse.

### Octava ronda: **el cambio de stack**

Otro stack: **HTML + SCSS con BEM + Sass + JS vanilla + Gulp 5**, con `dist/`
minificada, responsive en cinco puntos de anchura, accesibilidad completa y caché
sin conexión.

Nada de eso convivía con «no hay compilación», que era la premisa de la que
salían todas las decisiones anteriores. Así que el objetivo real no fue añadir
Gulp: fue **trasladar las invariantes existentes a la forma nueva sin perder ni
una**. La auditoría tenía que seguir siendo una puerta.

**Lo que NO cambia**, y es la decisión que gobierna el resto: `dist/index.html`
se abre con **doble clic** desde `file://`, igual que antes. `dist/` se versiona
en git para que «clona y juega» siga siendo verdad sin instalar nada.

### El paso de construcción

- **Gulp 5** con `sass-embedded`, `terser` y `cssnano`. `npm run entregar` =
  construir + auditar, y esa es la puerta.
- **`manifiesto.json` es la fuente única del orden de carga.** Vivía en tres
  sitios a la vez y `CLAUDE.md` tenía que pedirle al humano que los
  sincronizara. Lo consumen el gulpfile, el HTML, las dos páginas de pruebas y
  la auditoría.
- **Las fuentes se mudan a `src/`** (58 renombrados detectados por git, historial
  intacto) y los nueve MP3 a `dist/audio/`, que es su única casa.
- **Dos bundles**: uno legible, idéntico byte a byte a la concatenación del
  manifiesto, y uno minificado. Terser va con `ecma: 5` y sin manglear el nivel
  superior ni las propiedades — lo segundo reescribiría las claves de
  `localStorage` y dejaría ilegible el perfil guardado de todo niño.
- **La suite prueba lo que se entrega**: `pruebas.html` contra el bundle legible
  y `pruebas-min.html` contra el minificado, que es lo que valida terser entero.

### SCSS con BEM

- Los nueve `.css` pasan a parciales `.scss`, **conservando los nombres
  numerados**: la numeración *es* la cascada, y `_06-biomas.scss` documenta que
  su `position: relative` gana por venir después.
- **`bisel()` y `paso()` no tienen parámetro** de desenfoque ni de curva. Dos
  reglas que se cumplían por disciplina pasan a ser imposibles de romper.
- Mapas y bucles: 39 colores decorativos, 6 cielos, 8 texturas, 4 biomas (que se
  escribían dos veces), 6 estados de veta.
- **43 clases renombradas a BEM**: de **cero** `bloque__elemento` a **29**. Y de
  **20** selectores por `#id` a **cero**.
- Los 42 colores sueltos repartidos por cinco hojas pasan a tener nombre.

### Responsive

Cinco puntos de anchura (480/768/1024/1200/1400) que **no se pelean** con los
cinco de altura que ya existían: la anchura decide columnas, la altura decide el
lado del botón, y cuando las dos opinan gana el `min()` de las dos. Pasos
discretos de 64/80/96/112/128 px — nada de `clamp()`, que rompería la retícula
de 4 px.

### Accesibilidad

- Las 17 pantallas pasan a ser **regiones con nombre**; sin él no eran landmarks.
- **Dos regiones vivas**: la educada y la urgente. Lo que caduca ya no se lee
  detrás de la cola.
- `prefers-contrast: more` y `forced-colors`, con el relieve traducido a bordes.

### Sin conexión

Service worker que **falla en silencio en `file://`** y no ensucia la consola.
Precache del armazón (~300 KB); la música (42 MB) solo por botón explícito en el
panel del adulto, pista a pista y con cancelación.

### La auditoría

Reescrita en Node: de 400 líneas de shell a 24 más un `.mjs` sin una sola
dependencia. `auditar.bat` cubría cinco de los ocho bloques y ahora cubre los
ocho. Con **autoprueba**: comprueba que ve lo que dice que ve.

### Once fallos encontrados (E25–E36)

| | |
|---|---|
| **E25** | El ajuste «sin movimiento» del juego apagaba 11 animaciones y el del sistema 21. Quien lo apagaba desde los ajustes seguía viendo diez. |
| **E26** | Con `node_modules` la auditoría no se ponía roja: **se colgaba**, que es peor. |
| **E27** | La leyenda del informe decía **«●਍ominado»**: un escape CSS se comía la primera letra de cada palabra. Llevaba así desde el principio. |
| **E28** | Una clase renombrada en el CSS y no en el JS no da ningún error. |
| **E29** | Estilar por `#id` ata el estilo a un nodo único; había veinte, y uno con **dos**. |
| **E30** | Anchura y altura habrían competido por el lado del botón. |
| **E31** | «Gira el dispositivo» a 319 px, y a zoom 400 % el viewport es 320 justos. |
| **E32** | Las 17 secciones no tenían nombre accesible. |
| **E33** | Lo urgente y lo festivo compartían región viva. |
| **E34** | Registrar el worker en `file://` ensuciaba una consola limpia. |
| **E35** | El worker cachearía la propia suite. |
| **E36** | La lista negra nunca escaneó los `.mjs`: `*.js` no casa con `.mjs`. |

Y **un mecanismo que se puso y se quitó**: un enlace «Ir a la respuesta» añadido
dando por supuesto que había que tabular por la barra de herramientas antes de
llegar a los números. Se comprobó el DOM y es al revés. Se retiró: un mecanismo
de accesibilidad cuyo motivo declarado es falso parece trabajo hecho y no lo es.

### Números

| | 1.6.0 | 1.7.0 |
|---|---|---|
| Comprobaciones | 365 | **394** |
| Fallos registrados | E1–E24 | **E1–E36** |
| Guiones | 44 | 45 |
| `bloque__elemento` | 0 | 29 |
| Selectores por `#id` | 20 | 0 |
| `min-width` | 0 | 5 |
| Descarga de arranque | ~800 KB | **319 KB** |


## [1.6.0] — 2026-07-25

Séptima ronda: **la auditoría de si se entiende**. Todo lo de aquí abajo salió
de que alguien usara el juego, no de leer código. Las seis rondas anteriores
comprobaron que el código cumpliera la especificación —y la cumplía— pero nadie
había comprobado si un humano entiende lo que está pasando delante de él.

Los siete defectos comparten causa: **el juego hacía lo correcto y no lo
contaba**.

### Corregido

- **El botón de la portada prometía lo que no iba a pasar.** Decía siempre
  «JUGAR» y la primera vez llevaba a cuatro preguntas de colocación sin reloj,
  sin luces y sin puntos. Ahora `CB.arranque.rotuloJugar()` decide: **EMPEZAR**
  sin calibrar, **SEGUIR JUGANDO** con partida a medias, **JUGAR** el resto. Y
  debajo, una línea dice qué viene. (E21)
- **Los mensajes se escribían en una pantalla oculta.** `CB.ui.mensaje()` iba
  siempre a `#item-mensaje`, que vive dentro de la pantalla de partida; durante
  la calibración esa pantalla está oculta, así que el «¡Muy bien!» de cada una
  de las cuatro preguntas se escribía donde nadie podía verlo. Cuatro preguntas
  seguidas sin una sola reacción. (E22)
- **La calibración terminaba en silencio.** Contestabas la cuarta y aparecías en
  el mapa, sin que nadie dijera que aquello era la preparación ni que el juego
  empieza ahora. Descrito así por quien lo probó: «empiezas con una demo y no
  avisa que es una demo». (E23)
- **La pausa aterrizaba en un menú de configuración.** «Pausa» llevaba a una
  pantalla titulada «Ajustes», con cinco opciones y la vuelta al juego en el
  último sitio de la lista. Ahora se llama **«En pausa»** y «◀ Seguir cavando»
  es el primer botón. El flag `desdePausa` ya se pasaba y no lo usaba nadie. (E24)
- **El juego no contaba su propia regla de las luces.** Al primer fallo no pasaba
  nada visible y parecía que no se enteraba de los errores; y la luz se apagaba
  en el HUD mientras se miraba la reparación, sin causa aparente. Dos frases:
  «Te queda otro intento» y «Se ha apagado una luz. Te quedan N». La regla no
  cambia. (E20)
- **Una recarga costaba la partida.** `pagehide` ya la guardaba y
  `reanudarGuardada()` ya existía; faltaba la vuelta automática. Si al arrancar
  hay una partida guardada hace menos de un minuto, se reanuda sola. (E18)
- **La calibración no decía lo que era.** Su `<h1>` era invisible. Ahora lleva
  título visible y «Pregunta N de 4 · Sin reloj y sin puntos». (E19)

### Añadido

- **`.vscode/settings.json`**: configuración de Live Server para este proyecto,
  para que guardar un fichero no tire la partida de quien está jugando.
- **Campo `partidaEnCurso.guardadaTs`**: `iniciadaTs` decía cuándo EMPEZÓ la
  partida, no cuándo se guardó, y con una partida de diez minutos la distinción
  es justo la que importa.

### Verificado jugando

Recorrido completo —portada, minero nuevo, calibración, mapa, cantera,
expedición entera, fin, otra expedición y pausa— con **cero errores de consola**:
acertar suma gemas; fallar dos veces lleva a la reparación, que exige tocar los
tres pasos; al confirmarla se apaga una luz de verdad y el HUD la pinta en gris;
la expedición termina con gemas, bono y lo dominado; «Otra expedición» encadena.

### Contratos

- Base de comprobaciones: **347 → 365**, determinista, 0 fallos.
- Guardianes nuevos en `pruebas/casos-regresiones.js`: E20, E21, E22, E23, E24.

## [1.5.0] — 2026-07-25

Sexta ronda: **la primera que se hizo mirando la pantalla en vez de leyendo el
DOM**. Las cinco anteriores comprobaron lógica, contratos, contrastes y
accesibilidad, y ninguna vio nada de lo que hay aquí abajo. Salió todo de una
captura de pantalla enviada por quien lo estaba usando.

### Corregido

- **El botón «Leer» de la calibración no hacía nada.** `accionLeer()` sale por
  su primer `return` si no hay `CB.partida.estado`, y la calibración no crea
  ninguno a propósito (sin reloj, sin luces, sin puntuación, para que no parezca
  un examen). Era el botón de «vuélvemelo a leer» en la primera pantalla de la
  vida del niño, y estaba muerto. (E14)
- **El botón de silencio no reflejaba el silencio.** Se actualizaba solo el
  botón pulsado, de los dos que hay; el ajuste guardado se restauraba al
  arrancar sin que ningún icono se enterara —silencio real con icono de altavoz
  encendido— y `aria-pressed` no existía hasta el primer clic. (E15)
- **Los botones de la barra no se entendían.** «Leer en voz alta» y «Silenciar»
  eran dos altavoces casi idénticos. Ahora todos llevan **icono y palabra**
  (`🔊 Leer`, `💡 Pista`, `⏸ Pausa`, `🔈 Sonido`): un dibujo de 26 px no dice
  qué hace un botón, y cambiar de emoji solo cambia de qué se duda. (E16)
- **La calibración era la única zona de juego sin paisaje.** `<div
  class="zona-juego">` a secas, sin bioma ni cielo: un rectángulo marrón liso
  justo después de una portada con nubes y hierba. (E17)

### Añadido

- **`.vscode/settings.json`** con la configuración de Live Server para este
  proyecto: ignora los cambios que no tienen por qué interrumpir a quien juega
  (`docs`, `pruebas`, `audio`, `*.md`) y deja que el CSS se inyecte en caliente
  sin recargar.
- **Una recarga ya no se lleva la partida.** `pagehide` ya la guardaba; faltaba
  la vuelta. Si al arrancar hay una partida guardada hace menos de un minuto
  —lo único que cabe ahí es una recarga— se reanuda sola. Pasado ese minuto se
  aterriza en la portada y JUGAR sigue ofreciendo reanudar durante 24 h. (E18)
- **La calibración explica lo que es.** Su `<h1>` era `solo-lectores`, o sea
  invisible: cuatro preguntas sueltas, sin título, sin saber cuántas eran y sin
  reloj. Ahora lleva título visible y «Pregunta N de 4 · Sin reloj y sin puntos:
  solo para saber por dónde empezar». (E19)

### Retirado

- **El botón «Leer en voz alta» de la barra**, a petición expresa. Estaba en la
  calibración y en la partida. La lectura del enunciado **no desaparece**: la
  consigna se sigue leyendo sola al aparecer, y la tecla `L` la repite. Lo que
  se va es el botón.

### Corregido en las pruebas

- **Dos comprobaciones de música dependían de que la ventana tuviera el foco.**
  `aplicarVolumenes()` no reanuda si `document.hidden`, que es lo correcto, pero
  las pruebas lo leían del navegador real: daban rojo sobre código bueno en
  cuanto alguien miraba a otro sitio. Ahora la visibilidad se fija a mano y se
  comprueban **las dos** ramas.
- **`CB.pruebas.ejecutar()` no tenía cerrojo.** Las suites se encadenan con
  `setTimeout`, así que una segunda llamada no cancelaba la primera: las dos
  cadenas escribían en el mismo sitio y sumaban en el mismo contador. Se veían
  23 cajas para 15 suites y 541 comprobaciones donde hay 340 — y parecía que la
  suite no era determinista, que es la conclusión más cara posible. Basta con
  pulsar dos veces «Suite rápida».
- **La barra de herramientas no existía en `pruebas.html`.** Esa es la causa
  única de que cinco rondas no vieran E14, E15 ni E16: no se puede probar lo que
  no está en la maqueta. Ya está, con su paisaje, en las dos pantallas que la
  llevan.

### Contratos

- Base de comprobaciones: **329 → 347**, determinista, 0 fallos.
- Guardianes nuevos en `pruebas/casos-regresiones.js`: E14 a E19.

## [1.4.0] — 2026-07-25

Quinta ronda: logros, borrado de perfil e impresión.

### Corregido

- **Ctrl+P desde cualquier pantalla imprimía un folio en blanco.** La hoja de
  impresión hace que el informe se imprima siempre, se esté donde se esté, y
  hasta generarlo el contenedor está vacío. Ahora trae una línea que dice dónde
  se genera.

### Verificado y correcto

- **Los tres logros que dan vida extra funcionan de punta a punta** (requisito 10
  del encargo): están declarados, sus eventos se disparan con el contexto que
  necesitan, y conceden la luz de verdad. Bien acotados además: tope de 2 por
  partida, sin cobrar dos veces, y con reserva al llegar al tope de 5.
- **El borrado de perfil** exige escribir BORRAR y deja índice, disco,
  `ultimoPerfil`, perfil activo y bloqueo del panel coherentes.
- **La hoja de impresión**: A4, blanco y negro forzados, sin HUD ni botones ni
  decoración, tamaños en puntos y `break-after: avoid` en los encabezados.
- **329 comprobaciones**, 0 fallos.

---

## [1.3.0] — 2026-07-25

Cuarta ronda: el fallo que falseaba las mediciones del juego.

### Corregido

- **Machacar OK registraba una respuesta por pulsación.** Los botones no se
  deshabilitan al responder, así que seis toques daban seis respuestas y 18
  gemas en vez de 3. Lo grave no eran las gemas: cada toque metía una
  observación más en el motor adaptativo y un intento más en el informe del
  adulto. Machacar el botón es lo que hace un niño de 7 años cuando la respuesta
  le sale sola.
- **Pasar el objeto de destreza en vez de su nombre creaba una destreza basura**
  llamada `[object Object]` en el perfil del niño, sin que nada se quejara.

### Añadido

- **`pruebas/casos-regresiones.js`**: registro único de los doce fallos ya
  corregidos, con el guardián de cada uno. La regla que declara es que un fallo
  corregido sin prueba vuelve.
- **326 comprobaciones**, 0 fallos, en suite rápida y larga.

### Verificado y correcto

- El perfil guardado se estabiliza en 241 KB tras un curso escolar entero; en
  modo aula, 54 KB por niño y 1,58 MB para treinta.
- En 3000 ítems por perfil, el motor nunca se queda sin candidatos y converge
  sin saturar al 80 % de acierto, que es su objetivo de diseño.

---

## [1.2.0] — 2026-07-25

Tercera ronda: compatibilidad con Safari, Firefox e iPad.

### Corregido

- **En iPad la música no se podía silenciar.** En iOS, `HTMLMediaElement.volume`
  es de solo lectura: asignarle un valor no hace nada. Como todo el reproductor
  se apoyaba en esa propiedad, en un iPad —objetivo declarado del proyecto—
  silenciar el juego no silenciaba la música, los tres niveles de volumen sonaban
  igual, el fundido cruzado dejaba dos pistas a la vez a todo volumen y el
  agachado durante la voz no funcionaba. Ahora se detecta el aparato y, cuando el
  volumen está bloqueado, se usa parar y reanudar.

### Añadido

- **`pruebas/comprobar-doble-clic.html`**: se abre con doble clic y comprueba en
  el sitio lo único que solo puede comprobarse ahí — que el navegador deja
  guardar el progreso, que las texturas se generan y que las nueve pistas de
  música se leen desde `file://`. Si se abre por `http`, lo dice en vez de dar un
  veredicto falso.
- **315 comprobaciones**, 0 fallos.

### Revisado y correcto

Ni una API por encima de la línea base declarada (Chrome/Edge 100+, Firefox 100+,
Safari 15.4+): cero `?.`, cero `??`, cero campos privados, y en CSS ni `:has()`,
ni `@container`, ni `color-mix`, ni unidades `dvh`. Ya estaban resueltos el
prefijo `webkitAudioContext`, `-webkit-clip-path`, `touch-action: manipulation`,
la regla de guarda `[hidden]` y el modo privado de Safari.

---

## [1.1.0] — 2026-07-25

Segunda ronda de auditoría: accesibilidad, pantallas pequeñas y datos.

### Añadido

- **Restaurar copia (.json)** en el panel del adulto. `validarImportado()`
  existía, estaba probado y **no lo llamaba nadie**: se podía sacar una copia
  del progreso y no se podía volver a meter, que es justo lo que el README
  recomienda hacer cada trimestre. Exportar sin importar es un botón que promete
  algo que no cumple.
- Encabezado en **partida, calibración e informe**, que no tenían ninguno. Sin
  `<h1>`, `CB.pantallas.ir()` no encontraba dónde llevar el foco y lo dejaba en
  `<body>`, y quien navega por encabezados con un lector de pantalla no sabía
  que había cambiado de sitio. Van con una clase que los muestra al lector y no
  ocupa espacio en pantalla.

### Corregido

- Las tarjetas de mundo del mapa saltaban de `<h1>` a `<h3>`, rompiendo la
  navegación por encabezados.
- La maqueta de `pruebas/pruebas.html` no tenía encabezados: comprobaba una
  estructura que no se parecía a la del juego.

### Verificado y correcto

- **Cero controles sin nombre accesible** en las 17 pantallas.
- **Partida completa solo con teclado**: flechas por la rejilla, dígitos, OK y
  avance hasta la micropausa, sin tocar el ratón.
- **Viewport pequeño**: a 760 × 463 no se sale ningún botón y todos miden
  64 × 64. Por debajo de 420 px de alto salta el aviso de girar el dispositivo.
- **Ida y vuelta de exportar/restaurar idéntica** tras borrar el navegador
  entero.
- **Importación hostil neutralizada**: HTML en el mote, inyección CSS en el
  color, `../../etc/passwd` en el identificador y un array de 50.000 entradas.
- **308 comprobaciones, 0 fallos, deterministas.**

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
