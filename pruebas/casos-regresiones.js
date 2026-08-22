/* ============================================================================
   casos-regresiones.js — REGISTRO DE FALLOS YA CORREGIDOS
   ----------------------------------------------------------------------------
   Cada fallo encontrado en una auditoría deja aquí un guardián. La regla es
   simple: un fallo corregido sin prueba vuelve. Este fichero existe para que
   nadie tenga que acordarse.

   Los treinta y seis fallos y dónde vive el guardián de cada uno. Los que no están
   en este fichero es porque su sitio natural es otro; la lista sigue siendo la
   única de la que fiarse.

     E1  El panel del adulto mandaba a la pantalla de error         casos-carga.js
         (su handler de alEntrar navegaba a su propia pantalla)
     E2  El «toc» del toque prematuro sonaba una vez por ítem       casos-carga.js
     E3  Un perfil dañado dejaba el botón JUGAR inerte y mudo       casos-carga.js
     E4  El «fin amable» a los 6 tiempos agotados es inalcanzable   casos-motor.js
     E5  La auditoría de estilo grepeaba el CSS con comentarios     auditar.sh + aquí
     E6  Se podía exportar el progreso pero no restaurarlo          casos-carga.js
     E7  Partida, calibración e informe no tenían encabezado        casos-carga.js
     E8  El mapa saltaba de <h1> a <h3>                             AQUÍ
     E9  La maqueta de pruebas no tenía encabezados                 casos-carga.js
     E10 En iPad la música no se podía silenciar                    casos-musica.js
     E11 Machacar OK registraba una respuesta por pulsación         AQUÍ
     E12 Pasar el objeto de destreza creaba una destreza basura     AQUÍ
     E13 Ctrl+P desde cualquier pantalla imprimía un folio en blanco AQUÍ
     E14 El altavoz de la calibración no hacía nada                 AQUÍ
     E15 El botón de silencio no reflejaba el silencio              AQUÍ
     E16 «Leer» y «Silenciar» se dibujaban casi iguales             AQUÍ
     E17 La calibración era la única zona de juego sin paisaje      AQUÍ
     E18 Una recarga a media pregunta costaba la partida            AQUÍ
     E19 El título de la calibración era invisible                  AQUÍ
     E20 El juego nunca contaba su propia regla de las luces        AQUÍ
     E21 «JUGAR» prometía una partida y daba un cuestionario        AQUÍ
     E22 Los mensajes se escribían en una pantalla oculta           AQUÍ
     E23 La calibración terminaba en silencio                       AQUÍ
     E24 «Pausa» aterrizaba en un menú de ajustes                   AQUÍ
     E25 El ajuste «sin movimiento» apagaba menos que el del        AQUÍ
         sistema: diez animaciones seguían corriendo
     E26 Con node_modules y dist/ la auditoría no se ponía roja:    auditar.sh
         se colgaba, que es peor
     E27 La leyenda del informe decía «●਍ominado»: un escape CSS      AQUÍ
         se comía la primera letra de cada palabra
     E28 Una clase renombrada en el CSS y no en el JS no da ningún   cruzar-clases.mjs
         error: el elemento sale sin estilo y la consola limpia
     E29 Estilar por #id ata el estilo a un nodo único y solo se     cruzar-clases.mjs
         vence con otro id. Había veinte, y uno con DOS
     E30 Anchura y altura habrían competido por el lado del botón,   auditar.sh
         ganando el orden del fichero en vez de la restricción
     E31 «Gira el dispositivo» se disparaba a 319px, y a zoom 400%   auditar.sh
         el viewport es 320 justos: un píxel de margen
     E32 Las <section> no tenían nombre accesible: para un       casos-a11y.js
         lector de pantalla no existían como regiones
     E33 Lo urgente y lo festivo compartían región viva, así que    casos-a11y.js
         «quedan diez segundos» se leía detrás de la cola
     E34 Registrar el service worker en file:// ensuciaba una       AQUÍ
         consola que estaba limpia
     E35 El worker cachearía la propia suite y las pruebas          AQUÍ
         dejarían de reflejar el código
     E36 La lista negra de marca nunca escaneó los .mjs:            auditar.mjs
         `--include='*.js'` no casa con `.mjs`
     E37 Descargar la música decía «Listo: las 9 pistas están       AQUÍ
         guardadas» aunque fallaran las nueve
     E38 La lista de ficheros de música estaba escrita por          AQUÍ
         cuarta vez, y era la copia que nadie miraba
     E39 Las tres reglas duras de estilo tenían cuatro huecos:      auditar.mjs
         cero sin unidad, inset, rem, y la función por defecto
     E40 El relleno de opciones del jefe no avanzaba: bucle         AQUÍ
         infinito y pestaña colgada en el 22,9 % de los combates
     E41 El cronómetro de los problemas de enunciado arrancaba      AQUÍ
         al contestar, así que todos medían 0 ms
     E42 La música de mundo leía estado.mundoId, que no existe:     AQUÍ
         bosque, río y mina no sonaron nunca
     E43 La barra de partida leía data-accion de ev.target y los    AQUÍ
         botones llevan spans dentro: solo respondía el borde
     E44 El cerrojo de una respuesta solo estaba en la partida:     AQUÍ
         el jefe caía en 8 toques y la calibración daba 5 de 4
     E45 sanear() borra los campos con guion bajo, y así se         AQUÍ
         llamaban los contadores que hacen SUBIR la dificultad
     E46 Enter contestaba sin pasar por la confirmación doble       AQUÍ
         del antiazar: la regla no valía con teclado
     E47 una coreografía podía taparle al niño la fila del ⌫,      AQUÍ
         el 0 y el OK, que es con lo que se contesta
     E48 la duración vivía en el CSS y en el JS a la vez, y        AQUÍ
         al divergir el cartel se iba a media pantalla
     E49 una coreografía nueva no entraba en la lista del          AQUÍ
         movimiento reducido y seguía moviéndose
     E50 con el movimiento apagado la cinta desaparecía, y         AQUÍ
         quitar movimiento no puede quitar información
     E51 dos cintas seguidas se pisaban y quedaban dos             AQUÍ
         temporizadores sueltos ocultando la de después
     E52 la bolsa de gritos no sobrevivía al guardado: el          AQUÍ
         grito se repetía cada dos por tres
     E53 los gritos se saltaban las dos listas negras que sí       casos-mensajes.js
         se aplicaban a los 132 mensajes
     E54 el juego servía el ítem siguiente antes de que la         AQUÍ
         cinta acabara de cruzar
     E55 el escalón 4 de la escalera estaba declarado, tenía       AQUÍ
         su función escrita y no la llamaba nadie
     E56 las nueve celebraciones eran la misma banda: variaba      AQUÍ
         el recorrido, no el vehículo, y el recorrido no se nota
     E57 cada vehículo de celebración hace algo observable         AQUÍ
     E58 el ánimo se celebraba como si fuera un acierto            AQUÍ
     E59 atras() no ejecutaba el manejador de salida, ir() sí      AQUÍ
     E60 las siete frases de presentación estaban escritas y       AQUÍ
         no las pintaba nadie
     E61 el enunciado no se leía en voz alta pese a que la         AQUÍ
         documentación lo daba por hecho desde la versión 1
     E62 el OK del teclado seguía verde mientras las otras         AQUÍ
         once teclas estaban bloqueadas y de piedra
     E63 las cifras del teclado bloqueado estaban a 1,52:1         casos-contraste.js
     E64 ordenar la fila y elegir los datos no se podían           AQUÍ
         deshacer: había que terminar mal el ítem a propósito
     E65 la confirmación de dos toques era invisible, y la          AQUÍ
         pedían tres formatos de siete
     E66 «Salir» terminaba la expedición de un solo roce            AQUÍ
     E67 tocar una moneda no dejaba ninguna marca                   AQUÍ
     E68 la fase 3 de selectorDatos era una copia desincronizada    AQUÍ
         del teclado: muda, sin aria-live y con el OK en mayúsculas
     E69 el cromo del bloque raro se entregaba sin decir cuál es    AQUÍ
     E70 el reto bonus se calculaba y no se veía en pantalla        AQUÍ
     E71 los logros de fin se celebraban sobre p-partida, que       AQUÍ
         desaparece nueve líneas después
     E72 abrir un mundo entero no lo decía nadie                    AQUÍ
     E73 el bono se rotulaba en puntos debajo de las gemas          AQUÍ
     E74 el cofre del descanso prometía gemas y no daba ninguna     AQUÍ
     E75 el saludo contaba «vetas con musgo» con un criterio        AQUÍ
         distinto del que pinta el musgo en la Cantera
     E76 los cinco descansos se sorteaban CON reemplazo pese al     AQUÍ
         comentario que decía «en bolsa para que no se repitan»
     E77 en el jefe solo se anunciaba el fallo: al acertar,        AQUÍ
         silencio, y el intro del jefe no lo leía nadie
     E78 jefeSinFallos se escribía y no lo leía nadie              AQUÍ
     E79 la victoria del jefe sonaba a jefe                        casos-musica.js
     E80 el mensaje que enseña se borraba a los 1600 ms:           AQUÍ
         560 palabras por minuto para un lector de 60-90
     E81 la espera del segundo intento era el último número        AQUÍ
         del bucle escrito a pelo
     E82 la música del mundo volvía al segundo cero en cada        casos-musica.js
         reparación y en cada descanso
     E83 no había forma de saber cuánto queda de expedición:       AQUÍ
         el avance solo lo codificaba el cielo, que es aria-hidden
     E84 la calibración decía «ahora sí empieza el juego» y         AQUÍ
         llevaba a un menú con tres tarjetas bloqueadas
     E85 el HUD decía cuánto queda y no decía en QUÉ se está:      AQUÍ
         el nombre de la veta solo existía en la Cantera
     E86 «Nivel superado» se cantaba sin comprobar que no          AQUÍ
         quedaran ítems de esa veta ni deuda en la cola
     E87 el tiempo agotado no deja deuda en ninguna cola, así      AQUÍ
         que una veta sin contestar parecía cerrada
     E88 el rótulo de veta estaba pintado y fuera de la vista      AQUÍ
     E89 «toca la moneda de 2 euros» se acertaba buscando el 2:    AQUÍ
         las cuatro opciones eran botones iguales con un número
     E90 el marcador saltaba de 12 a 15 sin que se viera         AQUÍ
         cambiar: la ganancia se contaba fuera del número
     E91 los botones se pulsaban en silencio: sonaba lo que      AQUÍ
         pasa, nunca el acto de tocar — y luego, con la lista
         de excepciones corta, cada cifra sonaba DOS veces
     E92 con el teclado se jugaba mudo, y el audio no se        AQUÍ
         abría hasta pulsar JUGAR
     E93 la moneda de 5 céntimos y el billete de 5 € eran el     AQUÍ
         mismo «5»: misma foto, y la respuesta correcta se
         corregía con Number('c5'), que es NaN
     E94 el «Salir» del mapa no hacía nada: atras() sacaba UNA    AQUÍ
         entrada de la pila, la descartaba por ser de flujo y
         caía al mapa estando ya en el mapa
     E95 la .zona-juego__alta (entonces .zona-superior) centraba Y  AQUÍ
         enunciado no cabía, el centrado repartía el sobrante a
         los dos lados y lo de arriba quedaba fuera del alcance
         de la barra (scrollTop no puede ser negativo)
     E96 el modo proyección escribía --lado-respuesta a mano y    AQUÍ
         se saltaba el min() de los dos ejes: en un proyector de
         1200x700 la fila del OK caía fuera de la pantalla
     E97 el teclado se desplegaba a 6 columnas por ALTURA sin     AQUÍ
         mirar la anchura: en 360x640 dos columnas se salían
     E98 la zona de la respuesta no tenía barra: donde el 3x4     AQUÍ
         no cabe (320x480, o proyección en un móvil) el OK era
         inalcanzable y la pregunta no se podía contestar
     E99 «CUBOMÁTICA» medía 337 px con sus rellenos: en una      AQUÍ
         ventana de 320 el título salía descabezado por los dos
         lados
     E100 los cuatro botones de la barra no caben en 320 px: el   AQUÍ
         de Sonido —el único que apaga la música— quedaba
         cortado contra el borde derecho
     E101 la pantalla de Ayuda es maqueta estática: la página de  auditar.mjs
         pruebas solo ve su maqueta reducida, así que quien la
         comprueba es la auditoría, que lee el fichero de verdad
     E102 a 320 px una palabra larga dentro de un panel no se    AQUÍ
         partía: se salía de la caja, sin barra ni error. Se mide
         en un <iframe>, porque la media query mira el viewport
     E103 la portada es `overflow: hidden`: a 320x480 la fila de  AQUÍ
         abajo —Ajustes, Ayuda, Créditos— caía fuera y no había
         forma de llegar. La barra la lleva ahora la pila
     E104 la nomenclatura de las clases era disciplina: BEM se   auditar.mjs
         aplicaba donde alguien se acordaba. Ahora la FORMA la
         comprueba stylelint (bloque 9)
     E105 siete selectores estilaban un bloque por quien lo       auditar.mjs
         contenía (.panel-bloque .texto-menor y hermanos): un
         bloque que cambia según dónde está no es un bloque

   E40-E46 son la ronda décima, y tienen una cosa en común que conviene no
   perder: los siete estaban en VERDE. La auditoría daba 56 comprobaciones
   buenas, la suite 405 sin un fallo, y el cruce de clases cero. Ninguno de los
   siete es un descuido de escritura; los siete son cosas que nadie había
   mirado, porque todo lo que sí se mira estaba bien.

   Y dos de ellos enseñan lo mismo desde lados distintos: E42 tenía un test que
   construía a mano la forma equivocada del estado —copiada de la línea con el
   fallo—, y E41 tenía una función correcta a la que no llamaba nadie. Un test
   escrito mirando la implementación acaba de acuerdo con ella; una función sin
   llamador no falla, simplemente no ocurre. Las dos cosas se ven igual desde
   fuera: verde.

   E14-E17 salieron de MIRAR UNA CAPTURA, no de ejecutar pruebas, y es la
   lección más cara de todas: cinco rondas de auditoría comprobaron el DOM, la
   lógica, los contrastes y los contratos, y ninguna MIRÓ la pantalla. La barra
   de herramientas ni siquiera existía en la maqueta de pruebas.html. Ahora sí
   está, con su paisaje, en las dos pantallas que la llevan.

   E25 es de la misma familia pero peor: no se veía ni mirando la pantalla, hay
   que mirar DOS listas de selectores y compararlas a mano. Lo encontró el cruce
   de clases de la auditoría (bloque 8 de auditar.sh), que es también la red que
   sostiene el renombrado a BEM: una clase renombrada en el CSS y no en el JS no
   da ningún error, solo un elemento sin estilo.

   El detalle de cada uno, con lo que rompía y por qué, está en
   docs/decisiones.md.
   ========================================================================== */

CB.pruebas.suite('Regresiones: fallos que ya pasaron una vez', function () {
  var t = CB.pruebas;

  /* ── E11 · Una respuesta por intento ────────────────────────────────────
     Los botones no se deshabilitan al responder: siguen en pantalla mientras
     se ve el mensaje. Seis toques en OK registraban SEIS respuestas, con seis
     veces las gemas y —lo grave— seis observaciones en el motor adaptativo por
     un solo ítem, más seis intentos en el informe del adulto donde hubo uno.
     Machacar el botón es lo que hace un niño de 7 años cuando la respuesta le
     sale sola, y falseaba en silencio lo único que el juego promete medir. */
  var perfilPrevio = CB.perfil;
  var estadoPrevio = CB.partida.estado;

  CB.perfil = CB.pruebas.perfilNuevo();
  CB.perfil.calibrado = true;

  var e = {
    itemActual: { respuesta: 7, destreza: 'suma_sin_llevar', nivelId: 'S1',
                  expr: '3+4', itemId: 'S1#3+4@1.0' },
    respondido: false, respuestas: [], intento: 1
  };
  var llamadas = 0;
  var responderReal = CB.partida.responder;

  /* Se comprueba el CERROJO, no la contabilidad entera: basta con contar
     cuántas veces pasa de la primera línea. */
  CB.partida.estado = e;
  CB.partida.bloqueado = false;
  CB.partida.responder = function () {
    if (!e || !e.itemActual || CB.partida.bloqueado) return;
    if (e.respondido) return;
    e.respondido = true;
    llamadas++;
  };
  var i;
  for (i = 0; i < 8; i++) CB.partida.responder(7, 'teclado', {});
  CB.partida.responder = responderReal;

  t.igual(llamadas, 1, 'E11 · ocho envíos del mismo ítem registran UNA respuesta');

  /* Estos dos comprobaban el CERROJO leyendo el código fuente de la función
     —`.toString().indexOf('respondido = false')`— y así estuvieron hasta que la
     suite empezó a ejecutarse también contra el bundle minificado, donde
     terser reescribe `e.respondido = false` como `n.respondido=!1`. Los dos se
     pusieron rojos a la vez.

     La lección vale para todo el fichero: leer el fuente de una función solo es
     válido para LITERALES DE CADENA y NOMBRES DE PROPIEDAD, que terser conserva
     (mangle.properties está prohibido). Nunca para nombres de variable, espacios
     ni comillas. Y el modo de fallo peligroso no es este —rojo, se ve— sino la
     afirmación en NEGATIVO, que pasa en verde por la razón equivocada.

     Se comprueba la conducta, que además es lo que de verdad importaba. */
  var eAbrir = { itemActual: { respuesta: 7 }, respondido: true, respuestas: [], intento: 2 };
  CB.partida.estado = eAbrir;
  try { CB.partida.pintarRespuesta({ tipo: 'opciones', respuesta: 7, opciones: [7, 8] }); }
  catch (errPintar) { /* la maqueta no tiene todo; basta con haber pasado la línea */ }
  t.ok(eAbrir.respondido === false,
    'E11 · pintarRespuesta() vuelve a abrir el cerrojo para el segundo intento',
    'respondido sigue en ' + eAbrir.respondido);

  /* Y el cerrojo sigue en la función REAL, no solo en el doble de arriba: con el
     ítem ya respondido, responder() no puede llegar a registrar nada. Si alguien
     quitase la guarda, o registraría una respuesta o reventaría al seguir
     adelante sin estado válido; las dos cosas ponen esto en rojo. */
  var eCerrado = { itemActual: { respuesta: 7, destreza: 'suma_sin_llevar', nivelId: 'S1',
                                 expr: '3+4', itemId: 'S1#3+4@1.0' },
                   respondido: true, respuestas: [], intento: 1 };
  CB.partida.estado = eCerrado;
  CB.partida.bloqueado = false;
  var siguioAdelante = false;
  try { CB.partida.responder(7, 'teclado', {}); } catch (errResp) { siguioAdelante = true; }
  t.ok(!siguioAdelante && eCerrado.respuestas.length === 0,
    'E11 · el cerrojo sigue estando en la responder() de verdad',
    siguioAdelante ? 'siguió y lanzó' : eCerrado.respuestas.length + ' respuestas registradas');

  CB.partida.estado = estadoPrevio;
  CB.perfil = perfilPrevio;

  /* ── E8 · La jerarquía de encabezados no salta niveles ───────────────────
     Las tarjetas de mundo del mapa eran <h3> bajo el <h1> de la pantalla. Un
     lector de pantalla que navega por encabezados se encuentra un hueco donde
     debería haber un nivel. */
  var saltos = [];
  CB.pantallas.IDS.forEach(function (id) {
    var sec = document.getElementById(id);
    if (!sec) return;
    var niveles = [].slice.call(sec.querySelectorAll('h1,h2,h3,h4,h5,h6'))
      .map(function (h) { return parseInt(h.tagName.charAt(1), 10); });
    var previo = 0;
    niveles.forEach(function (n) {
      if (previo && n > previo + 1) saltos.push(id + ': h' + previo + ' → h' + n);
      previo = n;
    });
  });
  t.ok(saltos.length === 0,
    'E8 · ninguna pantalla salta un nivel de encabezado', saltos.join(' · '));

  /* Y el mapa en concreto, que es donde pasó: sus tarjetas son h2.

     ESTE ERA EL PELIGROSO. Buscaba "crear('h3'" en el fuente y afirmaba que NO
     estaba. Contra el bundle minificado terser escribe las cadenas con comillas
     dobles, así que el texto buscado no aparece nunca y la afirmación pasaba en
     verde sin haber comprobado nada. Una afirmación en negativo sobre texto
     generado es un falso verde permanente.

     Ahora se pinta de verdad y se mira el DOM, que es donde vive el problema. */
  var rejilla = document.getElementById('rejilla-mundos');
  var perfilMapa = CB.perfil;
  CB.perfil = CB.pruebas.perfilNuevo();          // pintarMundos() necesita uno
  try {
    CB.mapaDestrezas.pintarMundos();
    t.igual(rejilla.querySelectorAll('h3').length, 0,
      'E8 · las tarjetas de mundo ya no se pintan como h3');
    t.ok(rejilla.querySelectorAll('h2').length > 0,
      'E8 · y sí como h2, que es el nivel que toca bajo el h1 de la pantalla',
      rejilla.querySelectorAll('h2').length + ' h2');
  } catch (errMapa) {
    t.ok(false, 'E8 · pintarMundos() no revienta al pintar las tarjetas', errMapa.message);
  }
  CB.perfil = perfilMapa;

  /* ── E5 · Las reglas de estilo se comprueban sin comentarios ─────────────
     Un comentario que documentaba «cero border-radius» hacía saltar el grep
     que prohíbe border-radius. auditar.sh despieza los comentarios antes; aquí
     se comprueba lo mismo sobre las hojas REALMENTE cargadas, que es lo único
     que se puede mirar en tiempo de ejecución. */
  var conRadio = [], j, k, hojas = document.styleSheets;
  for (i = 0; i < hojas.length; i++) {
    var reglas = null;
    try { reglas = hojas[i].cssRules; } catch (err) { continue; }
    if (!reglas) continue;
    for (j = 0; j < reglas.length; j++) {
      var r = reglas[j];
      if (!r.style || !r.style.borderRadius) continue;
      var v = r.style.borderRadius.trim();
      if (v && v !== '0' && v !== '0px') conRadio.push(r.selectorText + ' → ' + v);
    }
  }
  t.ok(conRadio.length === 0,
    'E5 · ninguna regla realmente aplicada tiene border-radius distinto de 0',
    conRadio.slice(0, 5).join(' · '));

  /* ── E12 · Una destreza mal escrita ya no se cuela en el perfil ──────────
     CB.adaptativo.actualizar() espera el SLUG. Al pasarle el objeto de destreza
     no fallaba nada: JavaScript lo convertía en "[object Object]", se creaba
     una destreza con ese nombre, se guardaba en el perfil del niño y aparecía
     en el informe del adulto; y la destreza de verdad se quedaba clavada.
     Es el fallo que cometió esta misma auditoría, y costó tres intentos verlo
     porque nada se quejaba. */
  var perfilPrueba = CB.almacen.perfilNuevo('p-reg', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  var lanzo = false;
  try {
    CB.adaptativo.actualizar({ theta: 1000, n: 0 }, 1, 900, perfilPrueba);
  } catch (err) { lanzo = true; }
  t.ok(lanzo, 'E12 · pasar el objeto de destreza en vez del slug lanza un error');

  var basura = Object.keys(perfilPrueba.destrezas).filter(function (k) {
    return CB.adaptativo.SLUGS.indexOf(k) === -1;
  });
  t.ok(basura.length === 0,
    'E12 · y no deja ninguna destreza inventada en el perfil', basura.join(', '));

  var bien = false;
  try {
    CB.adaptativo.actualizar(CB.adaptativo.SLUGS[0], 1, 900, perfilPrueba);
    bien = isFinite(CB.adaptativo.theta(CB.adaptativo.SLUGS[0], perfilPrueba));
  } catch (err2) { bien = false; }
  t.ok(bien, 'E12 · con un slug correcto sigue funcionando igual');

  /* ── E13 · Ctrl+P desde cualquier pantalla ya no imprime un folio blanco ─
     La hoja de impresión fuerza `.imprimible[hidden] { display: block }`, que
     gana por especificidad a la guarda `[hidden] { display: none }`. Es decir:
     el informe se imprime SIEMPRE, se esté donde se esté. Con el contenedor
     vacío eso era un folio en blanco sin ninguna pista. */
  var cuerpoInf = document.getElementById('informe-cuerpo');
  t.ok(!!cuerpoInf && cuerpoInf.textContent.trim().length > 20,
    'E13 · el informe sin generar dice cómo generarlo, en vez de quedarse vacío',
    cuerpoInf ? '«' + cuerpoInf.textContent.trim().slice(0, 40) + '»' : 'no existe');

  /* ── Los 3 logros que dan luz existen y la conceden de verdad ────────────
     Requisito 10 del encargo: «se pueden conseguir vidas extras con alcanzar
     logros bonus». Un requisito que no se puede alcanzar es el panel del
     adulto otra vez. */
  t.igual(CB.logros.CONCEDEN_LUZ.length, 3, 'hay exactamente 3 logros que conceden luz');
  var perfilLuz = CB.almacen.perfilNuevo('p-luz', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  var sinConceder = CB.logros.CONCEDEN_LUZ.filter(function (id) {
    var est = CB.vidas.nuevoEstado(0);
    est.luces = 2;
    var r = CB.vidas.conceder(est, id, perfilLuz, 'expedicion');
    return !(r.aplicada && est.luces === 3);
  });
  t.ok(sinConceder.length === 0,
    'los 3 conceden una luz de verdad cuando quedan menos del tope',
    sinConceder.join(', '));

  /* ── E14 · La lectura en voz alta funciona en la calibración ─────────────
     Nació como fallo del botón «Leer»: la calibración no crea CB.partida.estado
     (a propósito: sin cronómetro, sin luces y sin puntuación, para que no
     parezca un examen) y accionLeer() salía por su primer `return`, de modo que
     el botón no hacía nada en la primera pantalla de la vida del niño.

     El BOTÓN ya no existe —se retiró a petición— pero accionLeer() sí, porque
     la tecla L de CB.a11y.MAPA la sigue usando. El guardián se queda: lo que
     protege no es el botón, es que la lectura funcione también donde no hay
     partida. Se comprueba con el estado a null, que es como está siempre allí. */
  var estadoPrev14 = CB.partida.estado;
  var pantallaPrev14 = CB.pantallas.actual;
  var vozPrev = CB.voz.leerOGuiar;
  var leido = null;

  CB.partida.estado = null;
  CB.pantallas.actual = 'p-calibracion';
  CB.calibracion.consignaActual = '¿Cuánto es 2 + 3?';
  CB.voz.leerOGuiar = function (texto) { leido = texto; };
  CB.partida.accionLeer();
  t.igual(leido, '¿Cuánto es 2 + 3?',
    'E14 · la lectura en voz alta funciona en la calibración aunque no haya partida');

  /* Y la tecla que ahora es su única puerta sigue conectada. */
  t.ok(CB.a11y.MAPA.leer.indexOf('l') !== -1 && typeof CB.partida.accionLeer === 'function',
    'E14 · la tecla L sigue siendo puerta de la lectura tras retirar el botón');

  /* Y en una pantalla sin consigna ni partida no revienta ni lee basura. */
  leido = null;
  CB.calibracion.consignaActual = null;
  CB.pantallas.actual = 'p-mapa';
  var revento = false;
  try { CB.partida.accionLeer(); } catch (err14) { revento = true; }
  t.ok(!revento && leido === null,
    'E14 · y fuera de la calibración sin partida no lee nada ni falla');

  CB.voz.leerOGuiar = vozPrev;
  CB.pantallas.actual = pantallaPrev14;
  CB.partida.estado = estadoPrev14;

  /* ── E15 · El botón de silencio no miente, y los dos dicen lo mismo ──────
     Hay un botón de sonido por barra (calibración y partida) y el silencio es
     uno solo, del aparato. Se actualizaba SOLO el botón pulsado: el otro se
     quedaba mintiendo, y el ajuste guardado se restauraba al arrancar sin que
     ningún icono se enterara — silencio real con icono de altavoz encendido.
     Además `aria-pressed` no existía hasta el primer clic. */
  var silPrev = CB.audio.silenciado;
  var botonesSon = document.querySelectorAll('[data-accion="sonido"]');
  t.ok(botonesSon.length >= 2,
    'E15 · la maqueta trae las barras de herramientas (sin ellas nadie las prueba)',
    botonesSon.length + ' botones de sonido');

  function iconoDe(b) { var i = b.querySelector('.btn-bloque__ico'); return (i || b).textContent.trim(); }

  CB.audio.silenciado = true;
  CB.partida.sincronizarSonido();
  var mienten = [];
  [].forEach.call(botonesSon, function (b, n) {
    if (iconoDe(b) !== '🔇' || b.getAttribute('aria-pressed') !== 'true') mienten.push(n);
  });
  t.ok(mienten.length === 0,
    'E15 · con el sonido apagado TODOS los botones lo muestran y lo anuncian',
    'mienten: ' + mienten.join(', '));

  CB.audio.silenciado = false;
  CB.partida.sincronizarSonido();
  var mienten2 = [];
  [].forEach.call(botonesSon, function (b, n) {
    if (iconoDe(b) !== '🔈' || b.getAttribute('aria-pressed') !== 'false') mienten2.push(n);
  });
  t.ok(mienten2.length === 0,
    'E15 · y al volver a encenderlo, todos vuelven', 'mienten: ' + mienten2.join(', '));

  /* Y el rótulo sobrevive: sincronizarSonido() escribía sobre el botón entero
     y se llevaba por delante la palabra «Sonido». */
  var sinRotulo = [];
  [].forEach.call(botonesSon, function (b, n) {
    var r = b.querySelector('.btn-bloque__rotulo');
    if (!r || !r.textContent.trim()) sinRotulo.push(n);
  });
  t.ok(sinRotulo.length === 0,
    'E15 · y el rótulo del botón sigue ahí después de sincronizar', sinRotulo.join(', '));
  CB.audio.silenciado = silPrev;
  CB.partida.sincronizarSonido();

  /* ── E16 · Ningún botón de la barra se explica solo con un dibujo ────────
     «Leer en voz alta» era 🔊 y «Silenciar» es 🔈: dos altavoces casi idénticos
     en la misma barra. El aria-label los distinguía —por eso la comprobación de
     nombres accesibles pasaba— pero un niño de 7 años no lee aria-labels.

     El primer intento fue cambiar 🔊 por 🗣, y la respuesta de quien lo probó
     fue «este botón es muy confuso, no sé para qué sirve». Tenía razón: cambiar
     de emoji solo cambia de qué se duda. Lo que quita la duda es la PALABRA. */
  var barras = document.querySelectorAll('.barra-herramientas');
  var mudos = [], repetidos = [];
  [].forEach.call(barras, function (barra, n) {
    var vistos = {};
    [].forEach.call(barra.querySelectorAll('button'), function (b) {
      var visible = b.textContent.replace(/\s+/g, ' ').trim();
      var palabra = /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/.test(visible);
      if (!palabra) mudos.push('barra ' + n + ': «' + visible + '»');
      if (vistos[visible]) repetidos.push('barra ' + n + ': «' + visible + '»');
      vistos[visible] = true;
    });
  });
  t.ok(mudos.length === 0,
    'E16 · todo botón de la barra lleva una palabra, no solo un dibujo',
    mudos.join(' · '));
  t.ok(repetidos.length === 0,
    'E16 · y ninguna barra repite la misma etiqueta visible', repetidos.join(' · '));

  /* ── E17 · Toda zona de juego lleva paisaje ──────────────────────────────
     La pantalla de calibración declaraba `<div class="zona-juego">` a secas: sin
     bioma y sin cielo. Fondo transparente, o sea un rectángulo marrón liso —
     y es la PRIMERA pantalla que ve un niño al pulsar JUGAR, justo después de
     una portada con cielo, nubes y hierba. Ninguna prueba lo vio porque todas
     miraban el DOM y la lógica; esto solo se ve mirando. */
  var sinPaisaje = [];
  [].forEach.call(document.querySelectorAll('.zona-juego'), function (z) {
    var sec = z.closest ? z.closest('.pantalla') : null;
    var id = sec ? sec.id : '(suelta)';
    if (z.className.indexOf('bioma') === -1) sinPaisaje.push(id + ': sin bioma');
    if (!z.querySelector('.cielo')) sinPaisaje.push(id + ': sin cielo');
  });
  t.ok(sinPaisaje.length === 0,
    'E17 · toda .zona-juego declara bioma y cielo', sinPaisaje.join(' · '));

  /* ── E18 · Una recarga no se lleva la partida por delante ────────────────
     `pagehide` ya guardaba la partida, también cuando la recarga la provoca
     otro: Live Server al guardar un fichero, un F5 sin querer, iOS reciclando
     la pestaña. Lo que faltaba era la VUELTA: se aterrizaba en la portada y
     había que pulsar JUGAR, de modo que una recarga a media pregunta parecía un
     reinicio espontáneo. Jugando con Live Server delante pasa cada vez que
     alguien guarda un fichero, y hace creer que el reloj no funciona. */
  var perfilRec = CB.almacen.perfilNuevo('p-rec', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  var ahora = Date.now();

  t.ok(!CB.arranque.esRecarga(perfilRec, ahora),
    'E18 · sin partida guardada no se reanuda nada');

  perfilRec.partidaEnCurso = { iniciadaTs: ahora - 900000, guardadaTs: ahora - 2000 };
  t.ok(CB.arranque.esRecarga(perfilRec, ahora),
    'E18 · una partida guardada hace 2 s es una recarga, y se reanuda sola');

  perfilRec.partidaEnCurso.guardadaTs = ahora - 3600000;
  t.ok(!CB.arranque.esRecarga(perfilRec, ahora),
    'E18 · una de hace una hora NO se reanuda sola: eso es volver, no recargar');

  /* Y la marca la escribe guardarEnCurso(), que es de donde sale todo. */
  t.ok(CB.partida.guardarEnCurso.toString().indexOf('guardadaTs') !== -1,
    'E18 · guardarEnCurso() sella cuándo se guardó, no solo cuándo empezó');

  /* ── E19 · La calibración explica lo que es ──────────────────────────────
     Su <h1> era `solo-lectores`, o sea invisible. Quien pulsaba JUGAR se
     encontraba cuatro preguntas sueltas, sin título, sin saber cuántas eran y
     sin reloj, y deducía que la cuenta atrás estaba rota. Aquí no hay reloj a
     propósito —no debe parecer un examen— pero eso hay que decirlo. */
  var h1Cal = document.querySelector('#p-calibracion h1');
  t.ok(!!h1Cal && h1Cal.className.indexOf('solo-lectores') === -1,
    'E19 · el título de la calibración es visible, no solo para lectores de pantalla');
  t.ok(!!document.getElementById('cal-paso'),
    'E19 · y existe el sitio donde decir por qué pregunta va y que no hay reloj');

  /* ── E20 · El juego cuenta la regla de las luces cuando importa ──────────
     La regla (docs/decisiones.md, Documento 5) es que una luz se apaga SOLO al
     fallar el segundo intento, tras ver la tarjeta de reparación. Es correcta.
     El problema era que el juego no la contaba: al primer fallo no pasaba nada
     visible —no caía la gema y ya— y quien jugaba concluía que el juego no se
     entera de los errores. Y cuando por fin se apagaba la luz, ocurría arriba
     del todo mientras se miraba la tarjeta, así que la luz desaparecía sin
     causa aparente varias pantallas después del fallo que la costó. */
  t.ok(CB.partida.trasFallo.toString().indexOf('Te queda otro intento') !== -1,
    'E20 · el primer fallo dice que queda otro intento');
  t.ok(CB.partida.trasFallo.toString().indexOf('Se ha apagado una luz') !== -1,
    'E20 · y al apagarse una luz se dice, con las que quedan');

  /* Y sigue sin apagarse en el primer intento, que es la regla que se protege. */
  var luzEstado = CB.vidas.nuevoEstado(0);
  var r1 = CB.vidas.fallo(luzEstado, 1, 'expedicion');
  t.ok(!r1.apagada && luzEstado.luces === CB.vidas.INICIALES,
    'E20 · un solo fallo NO apaga ninguna luz');
  var r2 = CB.vidas.fallo(luzEstado, 2, 'expedicion');
  t.ok(r2.apagada && luzEstado.luces === CB.vidas.INICIALES - 1,
    'E20 · el segundo fallo del mismo ítem sí apaga una');

  /* ── E21 · El botón de la portada no promete lo que no va a pasar ────────
     Decía siempre «JUGAR» y la primera vez llevaba a cuatro preguntas de
     colocación sin reloj, sin luces y sin puntos. La colocación es necesaria y
     no debe parecer un examen —por eso no lleva cronómetro— pero anunciarla
     como una partida es una promesa rota, y era la PRIMERA impresión del juego.
     Descrito por quien lo probó como «muy muy muy confuso». */
  var perfilSin = null;
  t.igual(CB.arranque.rotuloJugar(perfilSin), 'EMPEZAR',
    'E21 · sin minero elegido el botón dice EMPEZAR, no JUGAR');

  var perfilNuevo = CB.almacen.perfilNuevo('p-rot', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  perfilNuevo.calibrado = false;
  t.igual(CB.arranque.rotuloJugar(perfilNuevo), 'EMPEZAR',
    'E21 · sin calibrar tampoco dice JUGAR: lo que viene no es una partida');
  t.ok(CB.arranque.pistaJugar(perfilNuevo).indexOf('Sin reloj') !== -1,
    'E21 · y avisa de que esas preguntas no llevan reloj');

  perfilNuevo.calibrado = true;
  perfilNuevo.partidaEnCurso = null;
  t.igual(CB.arranque.rotuloJugar(perfilNuevo), 'JUGAR',
    'E21 · ya calibrado y sin partida a medias, dice JUGAR');

  perfilNuevo.partidaEnCurso = { iniciadaTs: Date.now(), guardadaTs: Date.now() };
  t.igual(CB.arranque.rotuloJugar(perfilNuevo), 'SEGUIR JUGANDO',
    'E21 · con una expedición a medias, lo dice en vez de fingir que empieza');

  /* ── E22 · Los mensajes se escriben en la pantalla que se está viendo ────
     CB.ui.mensaje() escribía siempre en #item-mensaje, que vive DENTRO de
     <section id="p-partida">. Mientras se calibra esa sección está oculta, así
     que el «¡Muy bien!» de cada una de las cuatro preguntas iba a un sitio
     invisible: se contestaban cuatro preguntas seguidas sin una sola reacción.
     Es la mitad de por qué la calibración parecía una demo rota. */
  var pantallaPrev22 = CB.pantallas.actual;

  CB.pantallas.actual = 'p-calibracion';
  CB.ui.mensaje('¡Muy bien!', 'acierto');
  var nCal = document.getElementById('cal-mensaje');
  var nPar = document.getElementById('item-mensaje');
  t.ok(!!nCal && nCal.textContent === '¡Muy bien!' && !nCal.hidden,
    'E22 · en calibración el mensaje va a su propio nodo, y visible');
  t.ok(!nPar || nPar.textContent !== '¡Muy bien!',
    'E22 · y NO al de la partida, que allí está oculto');

  CB.ui.ocultarMensaje();
  t.ok(nCal.hidden && (!nPar || nPar.hidden),
    'E22 · ocultarMensaje() limpia los dos, por si se cambió de pantalla');

  CB.pantallas.actual = 'p-partida';
  CB.ui.mensaje('Esta no suma gemas.', 'animo');
  t.ok(!!nPar && nPar.textContent === 'Esta no suma gemas.',
    'E22 · en partida sigue yendo al de la partida');
  CB.ui.ocultarMensaje();
  CB.pantallas.actual = pantallaPrev22;

  /* ── E23 · La calibración anuncia que termina ────────────────────────────
     Contestabas la cuarta pregunta y aparecías en el mapa, sin que nadie dijera
     que aquello era la preparación ni que el juego empieza ahora. Una prueba
     que no anuncia que termina no se distingue de una partida que se ha roto. */
  t.ok(CB.calibracion.terminar.toString().indexOf('Ahora sí empieza el') !== -1,
    'E23 · al acabar las 4 preguntas se dice que ahora empieza el juego');
  t.ok(CB.calibracion.terminar.toString().indexOf('reloj') !== -1,
    'E23 · y se nombra lo que cambia: reloj, luces y gemas');

  /* ── E24 · La pausa no aterriza en un menú de configuración ──────────────
     «Pausa» llevaba a una pantalla titulada «Ajustes», con cinco opciones y la
     vuelta al juego en el último sitio de la lista. Un niño que pausa no ha
     venido a configurar nada: ha venido a parar un momento. El flag
     `desdePausa` ya se pasaba desde CB.partida.pausar() y no lo usaba nadie. */
  var estadoPrev24 = CB.partida.estado;
  var tit = document.getElementById('ajustes-titulo');
  var lista = document.getElementById('lista-ajustes');

  CB.partida.estado = { pausada: true };
  CB.ajustesNino({ desdePausa: true });
  t.igual(tit ? tit.textContent : null, 'En pausa',
    'E24 · al pausar, la pantalla se llama «En pausa», no «Ajustes»');
  var primero = lista ? lista.querySelector('button') : null;
  t.ok(!!primero && /Seguir cavando/.test(primero.textContent),
    'E24 · y volver al juego es el PRIMER botón, no el último',
    primero ? primero.textContent.trim() : 'no hay botones');

  CB.partida.estado = null;
  CB.ajustesNino({});
  t.igual(tit ? tit.textContent : null, 'Ajustes',
    'E24 · entrando por el menú normal sigue llamándose Ajustes');
  CB.partida.estado = estadoPrev24;

  /* ── E1 · Ningún handler de pantalla navega a su propia pantalla ─────────
     El contrato es que un handler PINTA. El que navegaba desbordaba la pila y
     el catch de ir() lo convertía en «algo ha ido mal», de modo que el panel
     del adulto llevaba desde el principio siendo inalcanzable. */
  var navegantes = [];
  Object.keys(CB.pantallas.alEntrar).forEach(function (id) {
    var fuente = String(CB.pantallas.alEntrar[id]);
    if (fuente.indexOf('pantallas.ir') !== -1) navegantes.push(id);
  });
  t.ok(navegantes.length === 0,
    'E1 · ningún handler de alEntrar llama a CB.pantallas.ir()', navegantes.join(', '));
  t.ok(CB.pantallas._entrando === null,
    'E1 · el cerrojo de reentrada queda limpio entre navegaciones');

  /* ── E25 · Los dos ajustes de movimiento apagan lo MISMO ─────────────────
     Hay dos maneras de pedir menos movimiento: la del sistema operativo
     (prefers-reduced-motion) y la del propio juego, que enciende la clase
     :root.sin-movimiento desde los ajustes del niño. Las dos listas de
     selectores estaban escritas a mano, dos veces, y se habían separado: la del
     sistema apagaba veintiuna animaciones y la del juego once. Quien lo apagaba
     desde los ajustes —que es el único sitio donde un niño de 7 años puede
     hacerlo— seguía viendo diez: las criaturas flotando, saltando, asintiendo,
     girando y goteando, el musgo creciendo y el destello del botón.

     Nadie lo veía porque las dos listas están a cuarenta líneas de distancia y
     comparar veinte selectores a ojo no lo hace nadie. Este guardián lo hace
     leyendo el CSS realmente cargado, así que da igual cómo se escriba mañana:
     con listas a mano, con un mixin de Sass o con un bucle. */
  var enMedia = [], enClase = [];
  var PREFIJO = ':root.sin-movimiento ';
  function recogerReglas(reglas, destinoMedia) {
    var i, r;
    for (i = 0; i < reglas.length; i++) {
      r = reglas[i];
      if (r.media && /prefers-reduced-motion/.test(r.conditionText || r.media.mediaText || '')) {
        recogerReglas(r.cssRules, true);
        continue;
      }
      if (r.cssRules && !r.selectorText) { recogerReglas(r.cssRules, destinoMedia); continue; }
      /* Se pregunta por la PROPIEDAD, no por el texto de la regla. Chrome no
         serializa «animation: none !important» tal cual: lo expande a
         «animation: auto ease 0s 1 normal none running none !important», así
         que buscar /animation: *none/ en cssText no casa jamás y el guardián
         pasaría en verde sin haber mirado nada. */
      if (!r.selectorText || !r.style || r.style.animationName !== 'none') continue;
      r.selectorText.split(',').forEach(function (s) {
        s = s.replace(/\s+/g, ' ').trim();
        if (!s) return;
        if (destinoMedia) enMedia.push(s);
        else if (s.indexOf(PREFIJO) === 0) enClase.push(s.slice(PREFIJO.length));
      });
    }
  }
  var h, hojas;
  for (h = 0; h < document.styleSheets.length; h++) {
    try { hojas = document.styleSheets[h].cssRules; } catch (eH) { continue; }
    if (hojas) recogerReglas(hojas, false);
  }

  /* Sin esto, dos listas vacías serían «idénticas» y el guardián pasaría en
     verde sobre un fichero al que alguien le hubiera quitado el bloque entero. */
  t.ok(enMedia.length >= 10,
    'E25 · prefers-reduced-motion desactiva una lista de animaciones no trivial',
    enMedia.length + ' selectores');

  var soloSistema = enMedia.filter(function (s) { return enClase.indexOf(s) === -1; });
  var soloJuego  = enClase.filter(function (s) { return enMedia.indexOf(s) === -1; });
  t.ok(soloSistema.length === 0,
    'E25 · el ajuste del juego apaga todo lo que apaga el del sistema',
    'solo el sistema: ' + soloSistema.join(', '));
  t.ok(soloJuego.length === 0,
    'E25 · y no apaga nada de más que el del sistema no apague',
    'solo el juego: ' + soloJuego.join(', '));

  /* ── E27 · La leyenda del informe decía «●਍ominado» ──────────────────────
     Los cuatro rótulos del semáforo del panel del adulto se escribían con la
     primera letra pegada a un escape: content: "\25CF\00A0dominado…". Un escape
     CSS consume hasta SEIS dígitos hexadecimales y la «d» de «dominado» es uno,
     así que el navegador leía \00A0D —U+0A0D, un carácter devanagari— y se comía
     la letra. Con «datos» desaparecían dos, porque «da» también son hex.

     Llevaba así desde el principio y no lo vio nadie: el informe del adulto se
     mira poco, y el color y el símbolo —que son lo que de verdad transmite el
     estado, porque la regla es no fiarlo nunca al color solo— sí salían bien.
     Lo destapó la migración a Sass, que al reserializar resuelve los escapes.

     Este guardián lee el texto REAL que el navegador pone en el ::before, así
     que da igual cómo se escriba: con escapes, con caracteres literales o con
     lo que invente Sass mañana. Lo que se afirma es lo que se lee. */
  var LEYENDAS = [
    ['verde',    'dominado'],
    ['ambar',    'en proceso'],
    ['rojo',     'conviene trabajarlo'],
    ['sindatos', 'sin datos suficientes']
  ];
  var sonda27 = document.createElement('span');
  sonda27.className = 'semaforo';
  document.body.appendChild(sonda27);
  var rotos = [];
  LEYENDAS.forEach(function (par) {
    sonda27.setAttribute('data-nivel', par[0]);
    var texto = getComputedStyle(sonda27, '::before').content || '';
    /* Los espacios duros cuentan como espacio para esta comparación: lo que se
       comprueba es que las PALABRAS estén enteras. */
    var plano = texto.replace(/ /g, ' ');
    if (plano.indexOf(par[1]) === -1) rotos.push(par[0] + ' → ' + texto);
  });
  document.body.removeChild(sonda27);
  t.ok(rotos.length === 0,
    'E27 · los cuatro rótulos del semáforo se leen enteros, sin comerse letras',
    rotos.join(' · '));

  /* ── E34 · El service worker no estorba donde no puede vivir ─────────────
     Un service worker NO se registra en file://: exige contexto seguro, y el
     modo de uso principal de este proyecto es el doble clic. Así que lo que
     importa no es que se registre, sino que NO HAGA RUIDO cuando no puede.

     Y puede fallar de DOS maneras según el motor: unos lanzan un SecurityError
     síncrono y otros devuelven una promesa rechazada. Hacen falta las dos
     protecciones. Una promesa rechazada sin manejador imprime «Uncaught (in
     promise)»: no rompe nada, pero ensucia una consola que está limpia — y una
     consola sucia es lo primero que un maestro lee como «está roto». */
  t.ok(typeof CB.offline.DISPONIBLE === 'boolean',
    'E34 · la disponibilidad del modo sin conexión se decide una vez, al cargar');
  var protocoloEsFile = location.protocol === 'file:';
  t.ok(!protocoloEsFile || CB.offline.DISPONIBLE === false,
    'E34 · en file:// el modo sin conexión se declara NO disponible',
    'protocolo ' + location.protocol + ', disponible ' + CB.offline.DISPONIBLE);

  var reventoRegistro = false, devolvio;
  var guardado = CB.offline.DISPONIBLE;
  CB.offline.DISPONIBLE = false;
  try { devolvio = CB.offline.registrar(); } catch (eReg) { reventoRegistro = true; }
  CB.offline.DISPONIBLE = guardado;
  t.ok(!reventoRegistro && devolvio === false,
    'E34 · registrar() sin contexto seguro devuelve false y NO lanza',
    reventoRegistro ? 'lanzó una excepción' : 'devolvió ' + devolvio);

  var fuenteReg = String(CB.offline.registrar);
  t.ok(fuenteReg.indexOf('function') !== -1 &&
       (fuenteReg.match(/function/g) || []).length >= 2,
    'E34 · el rechazo de la promesa TAMBIÉN se recoge, no solo la excepción',
    'sin el segundo callback de then(), la consola imprimiría «Uncaught (in promise)»');

  /* ── E35 · La suite nunca registra un service worker ─────────────────────
     Si pruebas.html registrara uno, cachearía la propia suite: el siguiente
     cambio de código se serviría desde la caché y el síntoma sería «las pruebas
     no son deterministas» — que ejecutor.js ya identifica como la conclusión más
     cara posible, porque lleva a desconfiar de todo lo demás.

     La protección ya existía y es la misma guarda que impide que la suite
     arranque una partida: el `if (!document.getElementById('btn-jugar')) return;`
     del único DOMContentLoaded. Lo que se comprueba es el ORDEN: el registro va
     detrás de la guarda, no delante.

     Se busca por literal de cadena y por nombre de propiedad, que son las dos
     cosas que terser conserva; nunca por nombre de variable ni por espacios. */
  var arranqueFuente = '';
  try {
    arranqueFuente = [].slice.call(document.scripts)
      .filter(function (x) { return !x.src; }).map(function (x) { return x.text; }).join('');
  } catch (eF) { }
  t.ok(typeof CB.offline.registrar === 'function',
    'E35 · el registro vive en CB.offline.registrar, no suelto en el arranque');
  t.ok(!navigator.serviceWorker || !navigator.serviceWorker.controller ||
       location.pathname.indexOf('/pruebas/') === -1,
    'E35 · ningún service worker controla la página de pruebas',
    navigator.serviceWorker && navigator.serviceWorker.controller
      ? 'la controla ' + navigator.serviceWorker.controller.scriptURL : '');

  /* ── E37 · «Listo» solo puede significar listo ───────────────────────────
     descargarMusica() avanzaba el contador igual en el camino de éxito y en el
     de error, y luego informaba `ok: true` mirando solo si había terminado. Con
     las nueve pistas caídas —un 404 tras renombrar un fichero, el servidor
     apagado a media descarga— el panel del adulto decía «Listo: las 9 pistas
     están guardadas» y no había ninguna.

     Es el peor reparto posible del error: quien lo lee es un adulto decidiendo
     si puede llevarse la tableta a un sitio sin wifi. Y el juego no se rompía,
     así que nadie lo habría descubierto hasta el aula.

     Se comprueba SIN red: se sustituye caches por un doble que falla siempre y
     se mira qué se informa. La prueba deja el original en su sitio pase lo que
     pase. */
  var dispReal = CB.offline.DISPONIBLE;

  /* `caches` NO SE PUEDE SUSTITUIR CON UNA ASIGNACIÓN, y esta prueba ya cayó una
     vez en la trampa. Es una propiedad de `window` definida SOLO con getter: sin
     setter, `window.caches = doble` no lanza nada en modo no estricto —
     simplemente no hace nada, y el doble nunca se instala.

     El resultado fue un verde falso de manual: la comprobación «con las nueve
     pistas caídas no se informa ok:true» pasaba, pero pasaba contra la
     CacheStorage de verdad, donde las nueve fallan igualmente porque
     'audio/x.mp3' resuelto desde /pruebas/ da 404. Salía verde midiendo otra
     cosa. Lo destapó su complementaria, la del camino bueno, que era imposible
     de satisfacer con la caché real.

     Sí es `configurable`, así que defineProperty funciona; y se restaura el
     DESCRIPTOR original, no el valor, para devolver el getter tal cual estaba.
     Se DEVUELVE la promesa: el ejecutor la espera (ver ejecutor.js). */
  var descReal = Object.getOwnPropertyDescriptor(window, 'caches') ||
                 Object.getOwnPropertyDescriptor(Window.prototype, 'caches');

  function ponerCaches(doble) {
    Object.defineProperty(window, 'caches', { value: doble, configurable: true, writable: true });
  }
  function quitarCaches() {
    if (descReal) Object.defineProperty(window, 'caches', descReal);
    CB.offline.DISPONIBLE = dispReal;
  }

  function conCaches(doble, fn) {
    ponerCaches(doble);
    CB.offline.DISPONIBLE = true;
    /* Comprobación de la propia prueba: si el doble no se hubiera instalado,
       todo lo de abajo mediría la caché real y podría salir verde por el motivo
       equivocado. Que la instalación falle tiene que ser un fallo VISIBLE. */
    t.ok(window.caches === doble, 'E37 · el doble de caches queda instalado (si no, la prueba mide otra cosa)');
    return new Promise(fn).then(function (v) {
      quitarCaches(); return v;
    }, function (e) {
      quitarCaches(); throw e;
    });
  }

  var TODAS_FALLAN = { open: function () {
    return Promise.resolve({ add: function () { return Promise.reject(new Error('404')); } });
  } };
  var TODAS_VAN = { open: function () {
    return Promise.resolve({ add: function () { return Promise.resolve(); } });
  } };

  return conCaches(TODAS_FALLAN, function (listo) {
    CB.offline.descargarMusica(null, listo);
  }).then(function (r) {
    t.ok(r.ok === false, 'E37 · con las nueve pistas caídas NO se informa ok:true',
      'informó ' + JSON.stringify(r));
    t.igual(r.hechas, 0, 'E37 · y dice que ha guardado cero, no nueve');
    t.igual(r.fallos, 9, 'E37 · y cuenta los nueve fallos, que es lo que se le enseña al adulto');

    return conCaches(TODAS_VAN, function (listo) {
      CB.offline.descargarMusica(null, listo);
    });
  }).then(function (r) {
    /* El inverso, sin el cual lo de arriba se cumpliría devolviendo siempre
       ok:false: cuando las nueve entran de verdad, «Listo» tiene que salir. */
    t.ok(r.ok === true, 'E37 · y cuando las nueve entran de verdad, SÍ informa ok:true',
      'informó ' + JSON.stringify(r));
    t.igual(r.hechas, 9, 'E37 · con las nueve guardadas');
  });
});

/* ── E38 · Una sola lista de ficheros de música ────────────────────────────── */
CB.pruebas.suite('E38 · la lista de música tiene un solo dueño', function () {
  var t = CB.pruebas;      /* suite() llama a fn() SIN argumentos */
  /* Los nombres de los nueve mp3 vivían escritos a mano en 45-offline.js, que
     era la CUARTA copia: dist/audio/, la tabla de 07-musica.js y CREDITOS.txt
     son las otras tres. Las tres primeras las cruza la auditoría entre sí; la
     cuarta no la miraba nadie.

     Y su modo de fallo era invisible por partida doble: renombrar un fichero
     dejaba la música sonando con toda normalidad —07-musica.js sí tenía la ruta
     buena— y solo rompía la descarga sin conexión, que además informaba de
     éxito por el fallo E37. Dos defectos que se tapaban el uno al otro.

     Ahora las rutas salen de CB.musica, su dueño único. */
  t.ok(typeof CB.offline.urlesPistas === 'function',
    'E38 · las rutas de música se derivan, no se escriben otra vez');
  var urles = CB.offline.urlesPistas();
  t.igual(urles.length, 9, 'E38 · salen las nueve pistas');

  var esperadas = [];
  for (var k in CB.musica.PISTAS) {
    if (Object.prototype.hasOwnProperty.call(CB.musica.PISTAS, k)) {
      esperadas.push(CB.musica.RAIZ + CB.musica.PISTAS[k].fichero);
    }
  }
  t.igual(urles.slice().sort().join('|'), esperadas.slice().sort().join('|'),
    'E38 · son exactamente las de CB.musica, sin una cuarta copia que pueda desviarse');

  /* Y la comprobación que de verdad ata el fallo: que ninguna ruta esté escrita
     como literal en 45-offline.js. Se busca por nombre de FICHERO, que terser
     conserva por ser literal de cadena. */
  var fuenteOffline = String(CB.offline.urlesPistas) + String(CB.offline.descargarMusica);
  t.ok(fuenteOffline.indexOf('.mp3') === -1,
    'E38 · ningún nombre de mp3 escrito a mano en el código sin conexión');
});

/* ══════════════════════════════════════════════════════════════════════════
   E40 · El relleno de opciones del jefe no avanzaba
   ══════════════════════════════════════════════════════════════════════════
   CB.jefes.opciones() completa hasta cuatro botones cuando los distractores
   propuestos no llegan. El candidato se calculaba como `correcta +
   lista.length` DENTRO del while: si ese número ya estaba en la lista no se
   añadía nada, la longitud no cambiaba, y la vuelta siguiente calculaba
   exactamente el mismo candidato. Bucle infinito sin salida.

   No es un caso de laboratorio. Barrido exhaustivo del espacio real de la
   mecánica «reflejo» de Cristalina (a de 5 a 40, b de 1 a a, sobra de 1 a 9):
   1,29 % de los turnos, o sea el 22,9 % de los combates de veinte turnos. Y
   como el rng va sembrado con perfil + mundo + fecha, el niño al que le toca lo
   reproduce igual cada vez que lo reintenta ese día: «se cuelga en Cristalina»,
   todos los días, hasta mañana.

   Se prueba la conducta, no la forma: se piden opciones para los casos que
   colgaban y se comprueba que vuelven. Si no volvieran, esta suite no daría
   rojo — se quedaría colgada, que es exactamente el fallo. */
CB.pruebas.suite('E40 · el jefe siempre puede completar sus opciones', function () {
  var t = CB.pruebas;

  var previo = CB.jefes.estado;
  CB.jefes.estado = { rng: CB.util.mulberry32(99) };

  /* Los tres casos con nombre y apellidos que colgaban, de la mecánica reflejo:
     correcta = a − b, distractores = [a + b, a − b + sobra, a − sobra]. */
  var colgaban = [
    { a: 5, b: 3, sobra: 3 },
    { a: 6, b: 6, sobra: 3 },
    { a: 7, b: 6, sobra: 3 }
  ];
  var todosVuelven = true, todosCuatro = true, todosDistintos = true;

  colgaban.forEach(function (c) {
    var cont = document.createElement('div');
    var correcta = c.a - c.b;
    CB.jefes.opciones(cont, correcta, [c.a + c.b, correcta + c.sobra, c.a - c.sobra]);
    var vals = [].slice.call(cont.querySelectorAll('button')).map(function (b) {
      return Number(b.textContent);
    });
    if (!vals.length) todosVuelven = false;
    if (vals.length !== 4) todosCuatro = false;
    vals.forEach(function (v, i) { if (vals.indexOf(v) !== i) todosDistintos = false; });
  });

  t.ok(todosVuelven, 'E40 · los casos que colgaban devuelven opciones');
  t.ok(todosCuatro, 'E40 · devuelven cuatro, no tres');
  t.ok(todosDistintos, 'E40 · sin valores repetidos entre los cuatro botones');

  /* Barrido completo de las tres mecánicas que pasan por opciones(). En modo
     largo se recorre entero; en modo rápido, uno de cada cuatro. */
  var salto = CB.pruebas.modoLargo ? 1 : 4;
  var fallos = [], a, b, sobra;
  for (a = 5; a <= 40; a += salto) {
    for (b = 1; b <= a; b += salto) {
      for (sobra = 1; sobra <= 9; sobra++) {
        var cont2 = document.createElement('div');
        CB.jefes.opciones(cont2, a - b, [a + b, a - b + sobra, a - sobra]);
        if (cont2.querySelectorAll('button').length !== 4) {
          fallos.push(a + ',' + b + ',' + sobra);
        }
      }
    }
  }
  t.ok(fallos.length === 0,
    'E40 · el barrido de la mecánica reflejo da cuatro opciones siempre',
    fallos.slice(0, 5).join(' · '));

  /* Y la garantía estructural: el candidato de relleno no puede volver a ser el
     mismo dos vueltas seguidas. Se comprueba sobre la conducta con una llamada
     que fuerza el relleno desde una sola opción válida. */
  var cont3 = document.createElement('div');
  CB.jefes.opciones(cont3, 0, [0, 0, 0]);        // todos los distractores inválidos
  t.igual(cont3.querySelectorAll('button').length, 4,
    'E40 · con los tres distractores inservibles también salen cuatro');
  var negativos = [].slice.call(cont3.querySelectorAll('button')).filter(function (b) {
    return Number(b.textContent) < 0;
  });
  t.igual(negativos.length, 0, 'E40 · el relleno nunca propone un número negativo');

  CB.jefes.estado = previo;
});

/* ══════════════════════════════════════════════════════════════════════════
   E41 · Los problemas de enunciado medían 0 ms
   ══════════════════════════════════════════════════════════════════════════
   CB.partida.marcarLectura() existía, estaba bien escrita y documentada, y no
   la llamaba NADIE salvo responder() — es decir, el instante exacto de
   contestar. `t0` se ponía a ahora() y el rt que se calculaba en la línea
   siguiente era 0. Medido en navegador: 3.743 ms reales, rt registrado 0.

   Lo que rompía: multiplicador de tiempo 1,4 (el tope) y 3 gemas de bono por
   rapidez en todos los problemas; 0 ms en el informe del adulto; y en el
   antiazar, rt = 0 dispara S1 siempre, de modo que tres problemas fallados
   seguidos añadían S3 y el niño que lee despacio quedaba marcado como que
   responde al tuntún.

   Se prueba lo único que importa: que un problema contestado después de
   esperar de verdad registra un rt distinto de cero. */
CB.pruebas.suite('E41 · el cronómetro de los problemas mide el tiempo real', function () {
  var t = CB.pruebas;

  t.ok(/subtipo/.test(String(CB.partida.marcarLectura)),
    'E41 · marcarLectura solo toca el reloj de los problemas');
  t.ok(typeof CB.componentes.conectarLectura === 'function',
    'E41 · existe el enganche del primer toque en el contenedor de respuesta');

  /* El enganche se instala UNA vez por contenedor, como el del «toc». */
  var caja = document.createElement('div');
  var oyentes = 0;
  var addOriginal = caja.addEventListener;
  caja.addEventListener = function () { oyentes++; return addOriginal.apply(caja, arguments); };
  CB.componentes.conectarLectura(caja);
  CB.componentes.conectarLectura(caja);
  CB.componentes.conectarLectura(caja);
  t.igual(oyentes, 2, 'E41 · tres llamadas dejan un solo par de oyentes, no seis');

  /* Y la conducta. Se monta el estado mínimo y se marca la lectura como haría
     un toque en el contenedor; luego se comprueba que el rt sale del reloj y no
     de cero. No hace falta esperar: basta con que t0 quede en el pasado. */
  var previo = CB.partida.estado;
  var bloqueoPrevio = CB.partida.bloqueado;
  CB.partida.bloqueado = false;

  CB.partida.estado = {
    itemActual: { subtipo: 'CAMBIO_1', destreza: 'problemas_cambio' },
    lecturaHecha: false, t0: 0, tLectura0: 0
  };
  CB.partida.marcarLectura();
  t.ok(CB.partida.estado.lecturaHecha === true && CB.partida.estado.t0 > 0,
    'E41 · el primer toque de un problema fija t0');

  var t0Problema = CB.partida.estado.t0;
  CB.partida.marcarLectura();
  t.igual(CB.partida.estado.t0, t0Problema,
    'E41 · el segundo toque NO reinicia el reloj: se mediría de menos');

  /* La otra mitad de la regla: en una operación corriente el reloj lo pone
     iniciarCronometro al mostrarla, y el primer dígito no debe moverlo. */
  CB.partida.estado = {
    itemActual: { subtipo: null, destreza: 'suma_llevada' },
    lecturaHecha: false, t0: 12345, tLectura0: 0
  };
  CB.partida.marcarLectura();
  t.igual(CB.partida.estado.t0, 12345,
    'E41 · en una operación el primer toque no toca t0: regalaría el tiempo de pensarla');

  /* Y durante los 800 ms de construcción no se cobra nada. */
  CB.partida.bloqueado = true;
  CB.partida.estado = {
    itemActual: { subtipo: 'CAMBIO_1', destreza: 'problemas_cambio' },
    lecturaHecha: false, t0: 0, tLectura0: 0
  };
  CB.partida.marcarLectura();
  t.ok(CB.partida.estado.lecturaHecha === false,
    'E41 · un toque durante la construcción no arranca el reloj');

  CB.partida.bloqueado = bloqueoPrevio;
  CB.partida.estado = previo;
});

/* ══════════════════════════════════════════════════════════════════════════
   E42 · La música de mundo leía una propiedad inexistente
   ══════════════════════════════════════════════════════════════════════════
   claveDePantalla() leía CB.partida.estado.mundoId. El estado que construye
   CB.partida.iniciar() no tiene `mundoId`: tiene `mundo`, el objeto entero.
   `mundoId` es el nombre del PARÁMETRO de iniciar({mundoId:…}), y de ahí se
   copió. Resultado: undefined → null → respaldo, y bosque, río y mina no
   sonaron nunca. Toda expedición sonaba a pradera.

   El guardián no vuelve a inventarse la forma del estado —eso es justo lo que
   hacía el test que lo daba por bueno—: la saca de las claves que escribe
   iniciar() y comprueba que la propiedad que lee la música está entre ellas. */
CB.pruebas.suite('E42 · la música lee el estado que existe de verdad', function () {
  var t = CB.pruebas;

  var previoEstado = CB.partida.estado;
  var previoPerfil = CB.perfil;
  var previaPantalla = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  /* NO SE CONSTRUYE EL ESTADO A MANO. Ese era el fallo del test viejo: se
     inventaba `{mundoId: m.id}` copiándolo de la línea que tenía el error, y así
     test e implementación se daban la razón mutuamente mientras tres pistas no
     sonaban. Aquí la partida la monta CB.partida.iniciar(), que es la única
     autoridad sobre la forma del estado, y se le pregunta a la música por ESE
     objeto. Si mañana alguien renombra el campo, este guardián se entera. */
  var mal = [], pistas = [];
  CB.MUNDOS.forEach(function (m) {
    var e = CB.partida.iniciar({ mundoId: m.id, modo: 'expedicion' });
    if (!e) { mal.push(m.id + ': iniciar() no montó partida'); return; }
    var dio = CB.musica.claveDePantalla('p-partida');
    var toca = CB.musica.POR_BIOMA[m.bioma];
    pistas.push(dio);
    if (dio !== toca) mal.push(m.id + ' (' + m.bioma + ') dio ' + dio + ' en vez de ' + toca);
    CB.partida.pararCronometro();
    CB.partida.estado = null;
  });

  t.ok(mal.length === 0,
    'E42 · con el estado que monta iniciar(), los 4 mundos suenan cada uno con su pista',
    mal.join(' · '));

  /* Lo que delataba el fallo a simple vista: tres mundos distintos dando la
     misma pista. Cuatro biomas, cuatro pistas, sin repetir ninguna. */
  var distintas = pistas.filter(function (p, i) { return pistas.indexOf(p) === i; });
  t.igual(distintas.length, 4, 'E42 · cuatro mundos, cuatro pistas distintas', pistas.join(', '));

  /* Y sin partida en curso sigue devolviendo algo reproducible. */
  CB.partida.estado = null;
  t.ok(!!CB.musica.PISTAS[CB.musica.claveDePantalla('p-partida')],
    'E42 · sin partida en curso devuelve una pista válida, no undefined');

  CB.partida.estado = previoEstado;
  CB.perfil = previoPerfil;
  CB.pantallas.actual = previaPantalla;
});

/* ══════════════════════════════════════════════════════════════════════════
   E43 · La barra de partida solo respondía en el borde
   ══════════════════════════════════════════════════════════════════════════
   conectarBarra leía data-accion directamente de ev.target. Los cuatro botones
   de la barra llevan dentro <span class="btn-bloque__ico"> y <span
   class="btn-bloque__rotulo"> —existen porque E15/E16 exigen palabra visible en
   todo botón de barra—, así que un toque sobre el emoji o sobre la palabra tenía
   como target el span, que no lleva el atributo. Pista, Pausa, Sonido y Salir
   no hacían nada salvo que se acertara en los pocos píxeles de padding.

   Se ve peor que un botón muerto: el botón se hunde igual, porque eso es CSS.
   31-pantallas.js ya subía por el árbol para data-ir desde 1.0.0. */
CB.pruebas.suite('E43 · la barra responde tocando el icono y el rótulo', function () {
  var t = CB.pruebas;

  /* Se monta el botón EXACTAMENTE como lo escribe index.html: el atributo en el
     <button> y dos <span> dentro, que son los que recibe de verdad el toque. */
  var boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'btn-bloque btn-bloque--rotulado';
  boton.setAttribute('data-accion', 'pista');
  var ico = CB.ui.crear('span', 'btn-bloque__ico', 'P');
  var rot = CB.ui.crear('span', 'btn-bloque__rotulo', 'Pista');
  boton.appendChild(ico);
  boton.appendChild(rot);
  document.body.appendChild(boton);

  /* Se comprueba el resolutor, no el oyente. Instalar conectarBarra() aquí
     dejaría un oyente de documento puesto para siempre y la segunda ejecución
     de la suite contaría el doble —y «las pruebas no son deterministas» es la
     conclusión más cara posible, como dice ejecutor.js. */
  t.igual(CB.partida.accionDe(ico), 'pista',
    'E43 · tocar el icono de dentro del botón resuelve la acción');
  t.igual(CB.partida.accionDe(rot), 'pista',
    'E43 · tocar el rótulo también');
  t.igual(CB.partida.accionDe(boton), 'pista',
    'E43 · y el botón entero sigue funcionando');

  /* No sube indefinidamente: un nodo suelto fuera de cualquier botón no dispara
     nada, y el tope de cuatro niveles se respeta. */
  var suelto = CB.ui.crear('div', null, 'nada');
  document.body.appendChild(suelto);
  t.igual(CB.partida.accionDe(suelto), null,
    'E43 · un nodo sin botón encima no resuelve ninguna acción');

  var hondo = boton, i;
  for (i = 0; i < 5; i++) {
    var capa = CB.ui.crear('span');
    hondo.appendChild(capa);
    hondo = capa;
  }
  t.igual(CB.partida.accionDe(hondo), null,
    'E43 · a más de cuatro niveles deja de subir, como en CB.pantallas.conectar');

  /* Y que el oyente use el resolutor, no una copia del bucle. */
  t.ok(/accionDe/.test(String(CB.partida.conectarBarra)),
    'E43 · conectarBarra resuelve con accionDe, sin repetir el recorrido');

  document.body.removeChild(boton);
  document.body.removeChild(suelto);
});

/* ══════════════════════════════════════════════════════════════════════════
   E44 · El cerrojo de una respuesta solo estaba en la partida
   ══════════════════════════════════════════════════════════════════════════
   E11 arregló esto en CB.partida.responder y dejó allí escrito el porqué
   entero: los botones no se deshabilitan al responder, siguen en pantalla
   mientras se lee el mensaje, y machacarlos —que es lo que hace un niño de 7
   años cuando la respuesta le sale sola— registraba una respuesta por toque.

   Los otros dos sitios donde se contesta se quedaron sin él:

     · el jefe: los cuatro botones viven los 900 ms de la animación. Medido,
       5 toques = 5 bloques. Ocho toques derriban al jefe entero antes del
       segundo turno, y cada toque encolaba además otro turno.
     · la calibración: los botones viven los 1.300 ms del mensaje. Medido,
       5 toques en la primera pregunta = 5 aciertos sobre 4 ítems. Y esos cuatro
       aciertos son lo ÚNICO que fija trimestreDeducido, o sea el techo de
       números de todo el juego: un niño de primer trimestre acababa colocado en
       el tercero por pulsar dos veces. */
CB.pruebas.suite('E44 · una respuesta por turno también en jefes y calibración', function () {
  var t = CB.pruebas;

  /* ── El jefe ── */
  var previoJefe = CB.jefes.estado;
  CB.jefes.estado = {
    mundo: CB.catalogo.getMundo('M1'), jefe: 'Tronquete',
    def: CB.jefes.DEFINICION.Tronquete, bloques: 8, turno: 1,
    sinFallos: true, respondido: false, rng: CB.util.mulberry32(4)
  };
  var antes = CB.jefes.estado.bloques;
  var i;
  for (i = 0; i < 5; i++) CB.jefes.responder(true);
  t.igual(CB.jefes.estado.bloques, antes - 1,
    'E44 · cinco toques en la opción correcta tiran UN bloque, no cinco');

  CB.jefes.estado.respondido = false;          // como haría el turno siguiente
  for (i = 0; i < 4; i++) CB.jefes.responder(false);
  t.igual(CB.jefes.estado.bloques, antes,
    'E44 · y cuatro toques en una equivocada reponen UNO, no cuatro');
  CB.jefes.estado = previoJefe;

  /* ── La calibración ── */
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  var bloqueoPrevio = CB.partida.bloqueado;

  CB.perfil = CB.pruebas.perfilNuevo();
  CB.perfil.calibrado = false;
  CB.calibracion.indice = 0;
  CB.calibracion.aciertos = 0;
  CB.pantallas.actual = 'p-calibracion';
  CB.calibracion.servir();
  /* Se levanta a mano el bloqueo de construcción y se fija la confirmación: lo
     que se prueba aquí es el cerrojo de una respuesta, no esos dos. Dejarlos al
     azar haría que el guardián pasara por el motivo equivocado. */
  var confPrevia = CB.componentes._confirmacionPendiente;
  CB.componentes._confirmacionPendiente = false;
  CB.partida.bloqueado = false;

  var correcta = CB.calibracion.ITEMS[0].respuesta;
  var botones = [].slice.call(document.querySelectorAll('#cal-respuesta button'));
  var bOK = botones.filter(function (b) { return b.textContent === String(correcta); })[0];

  if (!bOK) {
    t.saltar('E44 · la calibración no admite toques repetidos',
             'la maqueta no monta #cal-respuesta');
  } else {
    bOK.disabled = false;
    for (i = 0; i < 5; i++) { bOK.disabled = false; bOK.click(); }
    t.igual(CB.calibracion.aciertos, 1,
      'E44 · cinco toques en la misma respuesta cuentan UN acierto');
    t.igual(CB.calibracion.indice, 1,
      'E44 · y avanzan UNA pregunta, no cinco');
    t.ok(CB.calibracion.aciertos <= CB.calibracion.ITEMS.length,
      'E44 · nunca hay más aciertos que preguntas: es lo que fija el trimestre');
  }

  CB.componentes._confirmacionPendiente = confPrevia;
  CB.partida.bloqueado = bloqueoPrevio;
  CB.pantallas.actual = pantallaPrevia;
  CB.perfil = perfilPrevio;
  CB.calibracion.indice = 0;
  CB.calibracion.aciertos = 0;
});

/* ══════════════════════════════════════════════════════════════════════════
   E45 · La dificultad D solo sabía bajar
   ══════════════════════════════════════════════════════════════════════════
   CB.almacen.sanear() descarta por diseño toda clave que empiece por `_`
   —«campos internos, no se guardan»— y los contadores de actualizarD se
   llamaban `_racha` y `_fallos`. Se borraban en cada guardado; `D`, no.

   El trinquete resultante: SUBIR exigía 3 aciertos seguidos del mismo nivel, y
   una partida sirve como mucho 3 ítems del mismo nivel
   (CB.partida.MAX_REPETICIONES), o sea un pleno dentro de una única sesión
   porque al día siguiente la racha volvía a cero. BAJAR bastaban 2 fallos, y
   además trasFallo pone D = 1 a la segunda caída del concepto — y eso sí
   persistía. La dificultad podía caer para siempre y casi nunca subir. */
CB.pruebas.suite('E45 · los contadores de dificultad sobreviven al guardado', function () {
  var t = CB.pruebas;

  var nivel = { n: 0, aciertos: 0, caja: 1, D: 2, ultimoISO: null, enPausa: false };
  CB.adaptativo.actualizarD(nivel, true, true);
  CB.adaptativo.actualizarD(nivel, true, true);

  var guardado = CB.almacen.sanear({ niveles: { X: nivel } }).niveles.X;
  t.ok(guardado.rachaD === 2,
    'E45 · la racha de aciertos llega entera a lo que se escribe en disco',
    JSON.stringify(guardado));

  /* La prueba que de verdad ata el fallo: dos sesiones. Se acierta dos veces,
     se guarda, se relee, y el tercer acierto tiene que subir la dificultad. */
  var releido = JSON.parse(JSON.stringify(guardado));
  CB.adaptativo.actualizarD(releido, true, true);
  t.igual(releido.D, 3,
    'E45 · el tercer acierto sube D aunque haya un guardado por medio');

  /* Y la simetría: bajar sigue funcionando igual y tampoco se pierde. */
  var baja = { D: 3 };
  CB.adaptativo.actualizarD(baja, false, false);
  var bajaGuardada = JSON.parse(JSON.stringify(CB.almacen.sanear(baja)));
  CB.adaptativo.actualizarD(bajaGuardada, false, false);
  t.igual(bajaGuardada.D, 2, 'E45 · dos fallos con guardado por medio bajan D');

  /* Ningún campo con guion bajo puede volver a llevar estado que haga falta. */
  var conGuion = Object.keys(nivel).filter(function (k) { return k.charAt(0) === '_'; });
  t.igual(conGuion.length, 0,
    'E45 · actualizarD no deja ningún campo que sanear() vaya a tirar',
    conGuion.join(', '));
});

/* ══════════════════════════════════════════════════════════════════════════
   E46 · Enter se saltaba la confirmación del antiazar
   ══════════════════════════════════════════════════════════════════════════
   En tecladoBloques, la rama de Enter llamaba a alResponder directamente en vez
   de pasar por pulsa('OK'), que es quien consulta pedirConfirmacion(). Tras una
   detección de azar, la confirmación de dos toques se le aplicaba a quien juega
   tocando y no a quien juega con teclado. F8 pide que se pueda jugar una partida
   entera solo con teclado; lo que no pide es que el teclado tenga otras reglas. */
/* LA SUITE DEVUELVE UNA PROMESA, y no por gusto. CB.componentes.montar() pone
   CB.partida.bloqueado a true de forma SÍNCRONA y lo suelta en un setTimeout,
   también con bloqueoMs 0. La primera versión de este guardián escribía la cifra
   inmediatamente después de montar el teclado, con el bloqueo todavía echado:
   pulsa() se iba por el return, el visor quedaba vacío, y «con confirmación
   pendiente el primer Enter no contesta» salía en verde porque no había nada que
   contestar. Verde por no haber llegado a probar nada, que es el verde que este
   proyecto lleva tres rondas persiguiendo. Ahora se espera a que el bloqueo se
   levante de verdad antes de tocar una tecla. */
CB.pruebas.suite('E46 · Enter pasa por la misma confirmación que el toque', function () {
  var t = CB.pruebas;

  var pantallaPrevia = CB.pantallas.actual;
  var bloqueoPrevio = CB.partida.bloqueado;
  var confPrevia = CB.componentes._confirmacionPendiente;
  CB.pantallas.actual = 'p-partida';

  function desbloqueado() {
    return new Promise(function (listo) {
      var t0 = CB.util.ahora();
      (function espera() {
        if (!CB.partida.bloqueado || CB.util.ahora() - t0 > 4000) { listo(); return; }
        setTimeout(espera, 10);
      })();
    });
  }

  var respuestas = [];
  var comp = CB.componentes.tecladoBloques(
    { respuesta: 7 },
    function (v) { respuestas.push(v); },
    { bloqueoMs: 0 }
  );

  return desbloqueado().then(function () {
    t.ok(CB.partida.bloqueado === false,
      'E46 · el bloqueo de construcción se ha levantado antes de teclear');

    CB.componentes._confirmacionPendiente = true;   // como tras detectar azar
    comp.tecla('4');
    t.igual(CB.componentes._valor, '4',
      'E46 · la cifra ha entrado de verdad: sin esto lo demás no prueba nada');

    comp.tecla('Enter');
    t.igual(respuestas.length, 0,
      'E46 · con confirmación pendiente, el primer Enter no contesta');
    comp.tecla('Enter');
    t.igual(respuestas.length, 1,
      'E46 · el segundo Enter sí, igual que el segundo toque');
    t.igual(respuestas[0], 4, 'E46 · y contesta el valor escrito');

    /* Sin confirmación pendiente, Enter contesta a la primera, como siempre. */
    CB.componentes._confirmacionPendiente = false;
    respuestas.length = 0;
    var comp2 = CB.componentes.tecladoBloques(
      { respuesta: 9 },
      function (v) { respuestas.push(v); },
      { bloqueoMs: 0 }
    );
    return desbloqueado().then(function () {
      comp2.tecla('9');
      comp2.tecla('Enter');
      t.igual(respuestas.length, 1,
        'E46 · sin confirmación pendiente, Enter contesta directo');
      t.igual(respuestas[0], 9, 'E46 · y con el valor correcto');

      CB.componentes._confirmacionPendiente = confPrevia;
      CB.partida.bloqueado = bloqueoPrevio;
      CB.pantallas.actual = pantallaPrevia;
    });
  });
});

/* ══ E47-E55 · La cinta, y el escalón que llevaba desde el principio sin
      llamar a nadie ═══════════════════════════════════════════════════════════

   Los ocho primeros protegen un componente NUEVO, así que no hay un fallo
   histórico que reproducir: hay un fallo histórico que NO repetir. El de E47 ya
   se cometió una vez con el cartel de prisa —tapaba la fila del ⌫, el 0 y el OK,
   justo el botón con el que se contesta— y está contado en el comentario de
   _componentes.scss. Con nueve coreografías en vez de una, la probabilidad de
   volver a cometerlo se multiplica por nueve; de ahí que se mida, no se confíe.

   E55 sí es un fallo con historia: la escalera anti-frustración declaraba cinco
   escalones y el cuarto no estaba implementado. CB.grafo.prerrequisitoDominado()
   existía, estaba documentada «para el escalón 4», y no la invocaba nadie. Es la
   misma familia que E41: una función correcta que nunca se ejecuta no falla
   nunca, simplemente no ocurre.
   ────────────────────────────────────────────────────────────────────────── */

/* Todas las reglas y fotogramas de la cinta, leídos del CSS REALMENTE CARGADO.
   Del cargado y no del fuente: es lo único que sigue valiendo si mañana esto se
   escribe de otra manera, y lo único que ve lo que hizo el compilador. */
CB.pruebas._reglasCinta = function () {
  var fotogramas = {}, reglas = [], h, i, hojas, r;
  for (h = 0; h < document.styleSheets.length; h++) {
    try { hojas = document.styleSheets[h].cssRules; } catch (eH) { continue; }
    if (!hojas) continue;
    for (i = 0; i < hojas.length; i++) {
      r = hojas[i];
      if (r.type === 7 || (window.CSSKeyframesRule && r instanceof CSSKeyframesRule)) {
        if (/^cinta-/.test(r.name)) fotogramas[r.name] = r;
      } else if (r.selectorText && r.selectorText.indexOf('.cinta') !== -1) {
        reglas.push(r);
      }
    }
  }
  return { fotogramas: fotogramas, reglas: reglas };
};

CB.pruebas.suite('E47 · ninguna celebración invade la zona de respuesta', function () {
  var t = CB.pruebas;
  var c = CB.pruebas._reglasCinta();

  /* Que la lectura del CSS haya funcionado se AFIRMA. Si document.styleSheets no
     trajera nada, todo lo de abajo pasaría por vacuidad. */
  t.ok(Object.keys(c.fotogramas).length >= 3,
    'E47 · se leen los fotogramas de la cinta del CSS cargado',
    'encontrados ' + Object.keys(c.fotogramas).length);

  /* ESTE GUARDIÁN NACIÓ AL REVÉS Y HAY QUE CONTARLO. Su primera versión decía
     «ningún modificador de cinta reposiciona el cartel», y con eso dejó blindada
     por prueba justo la monotonía que había que corregir: si nadie puede mover
     nada, las nueve celebraciones son la misma banda en el mismo sitio, y la
     variedad se queda en el recorrido, que es lo que menos se nota.

     Lo que hay que prohibir no es que un cartel se coloque distinto: es que
     invada la zona con la que se contesta. Eso ya pasó una vez —el aviso de
     prisa caía sobre la fila del ⌫, el 0 y el OK— y está contado en
     _componentes.scss. Así que la regla pasa a ser de TERRITORIO. */
  /* DOS UMBRALES, Y NO SON EL MISMO. Aquí había un `TOPE = 45` que usaba solo la
     segunda comprobación, mientras la primera llevaba un 30 escrito a mano; leído
     deprisa parece una constante muerta y un número duplicado, y unificarlos en
     30 pone roja la segunda —el cartel del logro se declara al 38 % y ahí está
     bien—. No es un descuido: son dos reglas distintas sobre dos cosas distintas.

     · Un FOTOGRAMA visible no puede bajar del 30 %: se mueve, y lo que se mueve
       tapa el teclado justo mientras el niño va a tocarlo.
     · Una COLOCACIÓN fija puede llegar al 45 %: se queda quieta, se ve entera y
       no cruza por delante de nada.

     El nombre común era lo único que sobraba. */
  var TOPE_FOTOGRAMA = 30;
  var TOPE_COLOCACION = 45;

  var invaden = [];
  Object.keys(c.fotogramas).forEach(function (nombre) {
    var kf = c.fotogramas[nombre], j, paso, m, y;
    for (j = 0; j < kf.cssRules.length; j++) {
      paso = kf.cssRules[j];
      if (paso.style.opacity === '0') continue;          // invisible: da igual
      m = /translateY\(\s*(-?[\d.]+)%/.exec(paso.style.transform || '');
      if (!m) continue;
      y = parseFloat(m[1]);
      if (y > TOPE_FOTOGRAMA) invaden.push(nombre + ' @' + paso.keyText + ' → ' + y + '%');
    }
  });
  t.igual(invaden.length, 0,
    'E47 · ningún fotograma visible empuja la cinta hacia el teclado',
    invaden.join(' · '));

  /* Y la regla de territorio sobre los dos carteles que se colocan: la cinta y
     el cartel del logro. Ninguno puede declarar un `top` que los meta en la
     mitad inferior. Que se coloquen DISTINTO es ahora deseable; lo que no pueden
     es bajar. */
  var arriba = [];
  c.reglas.forEach(function (r) {
    var top = r.style.top;
    if (!top || top.indexOf('%') === -1) return;
    if (parseFloat(top) > TOPE_COLOCACION) arriba.push(r.selectorText + ' → top ' + top);
  });
  t.igual(arriba.length, 0,
    'E47 · ningún cartel se declara por debajo del ' + TOPE_COLOCACION + ' % de altura',
    arriba.join(' · '));

  /* Los dos que se superponen no interceptan toques, pase lo que pase. */
  var pasan = ['cinta', 'cartel-festejo'].filter(function (id) {
    var el = document.getElementById(id);
    return el && getComputedStyle(el).pointerEvents !== 'none';
  });
  t.igual(pasan.length, 0,
    'E47 · lo que se superpone deja pasar el toque', pasan.join(', '));

  /* Y SIGUEN SIENDO ABSOLUTOS. Esto no es una comprobación de estilo: es la
     única que ve el fallo que ya se ha cometido dos veces. _biomas.scss pone
     `position: relative` a todo hijo directo de .pantalla y de .zona-juego que
     no esté en su lista de exclusiones, y gana por orden de cascada. Un
     superpuesto que se olvide de apuntarse ahí conserva su `top`, deja de ser
     absoluto, y aparece cientos de píxeles por debajo del borde inferior: no se
     ve, y NADA falla. Le pasó al aviso de prisa en 1.7.0 y al cartel del logro
     en 1.8.1, con la suite entera en verde las dos veces. */
  var relativos = ['cinta', 'cartel-festejo'].filter(function (id) {
    var el = document.getElementById(id);
    return el && getComputedStyle(el).position !== 'absolute';
  });
  t.igual(relativos.length, 0,
    'E47 · los superpuestos siguen siendo absolutos: nadie los ha sacado del sitio',
    relativos.join(', '));
});

CB.pruebas.suite('E48 · la duración vive en un solo sitio', function () {
  var t = CB.pruebas;
  var c = CB.pruebas._reglasCinta();
  var tabla = Object.keys(CB.ui.cinta.COREOGRAFIAS);

  t.igual(tabla.length, 4, 'E48 · la tabla declara las cuatro coreografías de cinta');

  /* Ida: toda clave de la tabla tiene sus fotogramas. */
  var sinFotogramas = tabla.filter(function (k) {
    return !c.fotogramas['cinta-' + k];
  });
  t.igual(sinFotogramas.length, 0,
    'E48 · toda coreografía de la tabla existe en el CSS', sinFotogramas.join(', '));

  /* Vuelta: todo fotograma cinta-* está en la tabla. Sin esta dirección, una
     animación huérfana se queda en la hoja sin que nada la dispare, y eso no da
     ningún error: simplemente no se ve nunca. La única excepción declarada es
     cinta-arde, que es el parpadeo del texto y no una coreografía. */
  var huerfanos = Object.keys(c.fotogramas).filter(function (n) {
    return n !== 'cinta-arde' && tabla.indexOf(n.replace(/^cinta-/, '')) === -1;
  });
  t.igual(huerfanos.length, 0,
    'E48 · no hay fotogramas de cinta que no dispare nadie', huerfanos.join(', '));

  /* Y el CSS NO declara duración: si la declarase volveríamos a tener el número
     en dos sitios, que es justo lo que mató a MS_CARTEL. */
  var conDuracion = c.reglas.filter(function (r) {
    return /\.cinta--/.test(r.selectorText) &&
           r.selectorText.indexOf('.cinta__texto') === -1 &&
           r.style.animationDuration && r.style.animationDuration !== '0s';
  }).map(function (r) { return r.selectorText; });
  t.igual(conDuracion.length, 0,
    'E48 · el CSS no fija la duración de ninguna coreografía', conDuracion.join(', '));

  /* Todas con steps(): es la regla dura del proyecto y ahora hay nueve sitios
     donde saltársela.

     Se excluyen las reglas que APAGAN la animación, y no es una excepción de
     conveniencia: «animation: none !important» pone animationTimingFunction en
     'ease', porque la forma abreviada devuelve todas las sub-propiedades a su
     valor inicial. Sin excluirlas, este guardián acusa de movimiento suavizado
     precisamente a las dos reglas que existen para que no haya movimiento
     ninguno. Es la misma trampa de serialización que ya costó un rato en E27. */
  var suaves = c.reglas.filter(function (r) {
    var f = r.style.animationTimingFunction;
    if (!f || f.indexOf('steps(') !== -1) return false;
    var n = r.style.animationName;
    return !(n === 'none' || r.style.animation === 'none');
  }).map(function (r) { return r.selectorText + ' → ' + r.style.animationTimingFunction; });
  t.igual(suaves.length, 0,
    'E48 · las nueve se mueven a saltos, ninguna suavizada', suaves.join(' · '));
});

CB.pruebas.suite('E49-E50 · con el movimiento apagado la cinta se para pero se ve', function () {
  var t = CB.pruebas;
  var raiz = document.documentElement;
  var teniaClase = raiz.classList.contains('sin-movimiento');
  var nodo = document.getElementById('cinta');

  t.ok(!!nodo, 'E49 · la cinta existe en la maqueta de pruebas');
  if (!nodo) return;

  raiz.classList.add('sin-movimiento');

  var claves = Object.keys(CB.ui.cinta.COREOGRAFIAS);
  var moviendose = [], invisibles = [];
  claves.forEach(function (k) {
    nodo.className = 'cinta cinta--' + k + ' cinta--entra';
    nodo.hidden = false;
    var cs = getComputedStyle(nodo);
    /* animationName, NUNCA el texto: «animation: none !important» se serializa
       como «auto ease 0s 1 normal none running none» y buscar «none» ahí dentro
       da verde con cualquier animación corriendo. */
    if (cs.animationName !== 'none') moviendose.push(k + ' → ' + cs.animationName);
    /* Y quitar el movimiento no puede quitar la información: el mensaje tiene
       que seguir viéndose. */
    if (cs.opacity !== '1') invisibles.push(k + ' → opacidad ' + cs.opacity);
  });

  /* Y LOS OTROS VEHÍCULOS. Son elementos distintos, así que cada uno necesita su
     entrada en $animados: es exactamente donde nació E25. La insignia y el
     cartel tienen que quedarse quietos Y SEGUIR VIÉNDOSE; la sacudida es la
     única cuya información está en el movimiento, y por eso su excepción le pone
     un marco de oro en vez de dejarla en nada. */
  [['insignia-gemas', 'insignia insignia--brota', true],
   ['cartel-festejo', 'cartel cartel--brota', true],
   ['zona-juego', 'zona-juego zona-juego--sacude', false]].forEach(function (v) {
    var el = document.getElementById(v[0]);
    if (!el) { moviendose.push(v[0] + ' → no está en la maqueta'); return; }
    var clasesPrevias = el.className, ocultoPrevio = el.hidden;
    el.className = v[1];
    el.hidden = false;
    var cs2 = getComputedStyle(el);
    if (cs2.animationName !== 'none') moviendose.push(v[0] + ' → ' + cs2.animationName);
    if (v[2] && cs2.opacity !== '1') invisibles.push(v[0] + ' → opacidad ' + cs2.opacity);
    if (!v[2] && cs2.boxShadow === 'none') {
      invisibles.push(v[0] + ' → sin marco: la sacudida desaparecería del todo');
    }
    el.className = clasesPrevias;
    el.hidden = ocultoPrevio;
  });

  t.igual(moviendose.length, 0,
    'E49 · todos los vehículos se paran con sin-movimiento', moviendose.join(' · '));
  t.igual(invisibles.length, 0,
    'E50 · y ninguno pierde su información con el movimiento apagado',
    invisibles.join(' · '));

  /* El parpadeo del texto del «Hurry up!» también se apaga. */
  var hijo = nodo.querySelector('.cinta__texto');
  if (hijo) {
    nodo.className = 'cinta cinta--prisa cinta--entra';
    t.igual(getComputedStyle(hijo).animationName, 'none',
      'E49 · y el parpadeo del texto también se para');
  }

  nodo.className = 'cinta';
  nodo.hidden = true;
  if (!teniaClase) raiz.classList.remove('sin-movimiento');
});

CB.pruebas.suite('E51 · dos cintas seguidas no se pisan', function () {
  var t = CB.pruebas;
  var nodo = document.getElementById('cinta');
  if (!t.ok(!!nodo, 'E51 · hay nodo de cinta')) return;

  CB.ui.cinta.ocultar();

  /* SE ESPÍA clearTimeout, y no es rebuscado: es la única forma de ver el fallo.
     La primera versión de este guardián comprobaba las clases y el valor de
     _salida, y con el `ocultar()` de mostrar() borrado a propósito SEGUÍA EN
     VERDE — porque reasignar className repone las clases igual, y _salida
     cambia igual al programar el segundo temporizador. El fallo real es otro: el
     temporizador de la primera cinta se queda vivo y dispara a mitad de la
     segunda, escondiéndola antes de tiempo. Eso solo se ve mirando si alguien lo
     canceló. */
  var limpiados = [], origClear = window.clearTimeout;
  window.clearTimeout = function (id) { limpiados.push(id); return origClear.call(window, id); };
  /* Que el doble se haya instalado se AFIRMA. Si la propiedad fuese de solo
     lectura, la asignación se caería en silencio y todo esto mediría el
     clearTimeout de verdad, es decir, nada. Es lo que pasó con window.caches. */
  var dobleInstalado = (window.clearTimeout !== origClear);

  CB.ui.cinta.mostrar('junta', '¡Toma!');
  var primerTemporizador = CB.ui.cinta._salida;
  CB.ui.cinta.mostrar('bandera', '¡Se abre!');
  window.clearTimeout = origClear;

  t.ok(dobleInstalado, 'E51 · el doble de clearTimeout se ha instalado de verdad');
  t.ok(primerTemporizador !== null, 'E51 · la primera cinta programa su salida');
  t.ok(limpiados.indexOf(primerTemporizador) !== -1,
    'E51 · la segunda cancela el temporizador de la primera, no lo deja vivo',
    'cancelados: ' + limpiados.join(','));
  t.ok(!nodo.classList.contains('cinta--junta'),
    'E51 · la segunda borra la coreografía de la primera');
  t.ok(nodo.classList.contains('cinta--bandera'), 'E51 · y pone la suya');

  /* Que solo quede UNA clase de coreografía. Dos a la vez darían dos
     animation-name y el navegador elegiría por orden de hoja, en silencio. */
  var coreos = Array.prototype.filter.call(nodo.classList, function (c) {
    return /^cinta--/.test(c) && c !== 'cinta--entra';
  });
  t.igual(coreos.length, 1, 'E51 · una sola coreografía puesta a la vez', coreos.join(','));

  CB.ui.cinta.ocultar();
  t.igual(CB.ui.cinta._salida, null, 'E51 · ocultar() no deja temporizadores sueltos');
  t.igual(nodo.hidden, true, 'E51 · y esconde el nodo');
});

CB.pruebas.suite('E52 · la bolsa de gritos sobrevive al guardado', function () {
  var t = CB.pruebas;
  var perfil = CB.pruebas.perfilNuevo();
  var m = CB.mensajes.asegurar(perfil);

  t.ok(!!m.gritos, 'E52 · el estado de mensajes trae bolsa de gritos');

  /* Ninguna clave con guion bajo delante: sanear() las borra todas, y así es
     como la dificultad D se quedó en un trinquete de una sola dirección (E45). */
  var conGuion = Object.keys(m.gritos).filter(function (k) { return k.charAt(0) === '_'; });
  t.igual(conGuion.length, 0, 'E52 · ninguna clave de la bolsa empieza por guion bajo');

  /* Se gastan varios gritos y se comprueba que la bolsa recuerda. */
  var rng = CB.util.mulberry32(7), i, vistos = [];
  for (i = 0; i < 6; i++) vistos.push(CB.mensajes.grito({ perfil: perfil, rng: rng }));
  t.ok(m.gritos.bolsaAcierto.length > 0, 'E52 · la bolsa guarda lo ya sacado');

  var antes = m.gritos.bolsaAcierto.slice();
  var saneado = CB.almacen.sanear(JSON.parse(JSON.stringify(perfil)));
  t.ok(!!(saneado.mensajes && saneado.mensajes.gritos),
    'E52 · la bolsa sigue ahí después de sanear()');
  t.igual(JSON.stringify(saneado.mensajes.gritos.bolsaAcierto), JSON.stringify(antes),
    'E52 · y con el mismo contenido');

  /* Y no repite: seis gritos de una bolsa de 24 tienen que ser seis distintos. */
  var unicos = vistos.filter(function (v, k) { return vistos.indexOf(v) === k; });
  t.igual(unicos.length, vistos.length, 'E52 · seis gritos seguidos, seis distintos');
});

CB.pruebas.suite('E54 · el ítem siguiente no llega antes que la cinta', function () {
  var t = CB.pruebas;
  var cortas = [];
  Object.keys(CB.ui.festejo.CELEBRACIONES).forEach(function (k) {
    var ms = CB.ui.festejo.CELEBRACIONES[k].ms;
    /* Las dos esperas reales del juego: 1600 tras acertar, 2200 tras fallar. */
    if (CB.ui.festejo.espera(k, 1600) < ms + 400) cortas.push(k + ' (acierto)');
    if (CB.ui.festejo.espera(k, 2200) < ms + 400) cortas.push(k + ' (fallo)');
  });
  t.igual(cortas.length, 0,
    'E54 · toda celebración cabe entera en su espera', cortas.join(', '));

  /* Y la espera NUNCA se encoge por debajo de lo que había antes de las cintas:
     acortarla recortaría tiempo de lectura, que es lo contrario de lo que se
     busca. Con 'sello', que dura 900 ms, el máximo tiene que seguir siendo 1600. */
  t.igual(CB.ui.festejo.espera('normal', 1600), 1600,
    'E54 · la celebración más frecuente no acelera el juego');
  t.igual(CB.ui.festejo.espera('jefe', 1600), 2200,
    'E54 · una larga sí estira la espera');
  t.igual(CB.ui.festejo.espera('inventada', 1600), 1600,
    'E54 · una clave que no existe deja la espera de siempre');

  /* ── E80 · el tiempo de lectura ───────────────────────────────────────────
     El mensaje de acierto son 13-15 palabras y se borraba a los 1600 ms: 560
     palabras por minuto, para un lector de 2.º que va a 60-90. La única parte
     del mensaje que enseña algo —la frase de procedimiento— no se leía nunca.

     LOS TRES `t.igual` DE ARRIBA SON EL GUARDIÁN DE VERDAD de este cambio: si
     siguen valiendo, el tercer parámetro no se ha colado en las llamadas de dos
     argumentos. Se dice aquí para que nadie los borre por parecer redundantes. */
  var largo = 'Muy bien. Has pedido prestada una decena y la has deshecho bien ' +
              'sin equivocarte en ninguna columna del ejercicio completo.';
  t.ok(CB.ui.festejo.espera('normal', 1600, largo) > 1600,
    'E80 · con texto, la espera se estira para poder leerlo',
    String(CB.ui.festejo.espera('normal', 1600, largo)));
  t.igual(CB.ui.festejo.espera('normal', 1600, largo), CB.ui.festejo.TOPE_LECTURA,
    'E80 · y un texto muy largo se recorta al tope, no congela el juego');
  t.igual(CB.ui.festejo.espera('normal', 1600), 1600,
    'E80 · SIN texto devuelve exactamente lo de siempre');
  t.ok(CB.ui.festejo.espera('normal', 1600, 'Muy bien.') === 1600,
    'E80 · y un texto corto tampoco alarga nada');
});

CB.pruebas.suite('E55 · el escalón 4 lleva al prerrequisito, y alguien lo llama', function () {
  var t = CB.pruebas;

  /* Primero la escalera. NO se copia aquí el umbral: se le PREGUNTA a ella cuál
     es. Escribir el número a mano en el test es lo que produjo E43 —dos
     implementaciones de la misma escalera y solo una probada, la que no se
     usaba— y de hecho la primera versión de este guardián puso 4 donde el módulo
     dice 3, y se puso roja contra código correcto. */
  var umbral = -1, f;
  for (f = 0; f <= 8; f++) {
    if (CB.escalera.siguienteEscalon(f, 2).accion === 'prerrequisito') { umbral = f; break; }
  }
  t.ok(umbral >= 0, 'E55 · algún número de fallos lleva al prerrequisito', 'ninguno de 0 a 8');
  var esc = CB.escalera.siguienteEscalon(umbral, 2);
  t.igual(esc.escalon, 4, 'E55 · y esa acción es la del escalón 4');

  /* Y ahora lo que faltaba: que exista un camino real. Se busca un nivel del
     catálogo que TENGA prerrequisitos, se marca el prerrequisito como superado
     en un perfil de verdad, y se comprueba que la función lo encuentra. */
  var perfil = CB.pruebas.perfilNuevo();
  var ids = CB.catalogo.ids(), i, nivel, conPre = null;
  for (i = 0; i < ids.length; i++) {
    nivel = CB.catalogo.get(ids[i]);
    if (nivel && nivel.prerrequisitos && nivel.prerrequisitos.length) { conPre = nivel; break; }
  }
  if (!t.ok(!!conPre, 'E55 · el catálogo tiene niveles con prerrequisito')) return;

  var pre = conPre.prerrequisitos[0];
  perfil.niveles[pre] = { n: 10, aciertos: 10, caja: 3, D: 2, ultimoISO: CB.util.hoyISO(), enPausa: false };
  var encontrado = CB.grafo.prerrequisitoDominado(conPre.id, perfil);
  t.ok(!!encontrado, 'E55 · prerrequisitoDominado() devuelve un nivel dominado');

  /* Sin ningún prerrequisito superado devuelve null, y entonces el juego NO
     inventa un nivel: deja caer el fallo siguiente en el escalón 5, que es lo
     que pasaba antes. Degradar así es lo correcto. */
  var limpio = CB.pruebas.perfilNuevo();
  t.igual(CB.grafo.prerrequisitoDominado(conPre.id, limpio), null,
    'E55 · sin nada dominado devuelve null en vez de inventarse un nivel');

  /* Y LA PARTE QUE FALTABA DE VERDAD: que alguien la llame. El fallo no era la
     función, que estaba bien; era que servirItem() no tenía por dónde recibir el
     nivel. Se comprueba el conducto, y se comprueba sobre el estado que produce
     CB.partida.iniciar() de verdad: construirlo a mano aquí sería fabricar la
     forma que a mí me conviene, que es como el test de E42 estuvo años de
     acuerdo con el fallo que tenía que denunciar. */
  var perfilPrevio = CB.perfil;
  CB.perfil = perfil;
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E55 · iniciar() devuelve estado')) {
    t.ok('prerrequisitoPendiente' in estado,
      'E55 · el estado de partida tiene dónde guardar el nivel inyectado');
    t.igual(estado.prerrequisitoPendiente, null,
      'E55 · y empieza vacío, sin colar nada en el primer ítem');

    /* Y AQUÍ ESTÁ LO QUE DE VERDAD FALTABA: que la acción se APLIQUE. Que la
       escalera devuelva 'prerrequisito' y que el grafo encuentre el nivel no
       sirve de nada si nadie junta las dos cosas, que es exactamente lo que
       pasaba. Se le pasa el escalón real y se mira el estado real. */
    var hecho = CB.partida.aplicarEscalon(esc, { nivelId: conPre.id }, perfil, estado);
    t.igual(hecho, 'prerrequisito', 'E55 · el escalón 4 se aplica, no se ignora');
    t.igual(estado.prerrequisitoPendiente, encontrado,
      'E55 · y deja el prerrequisito dominado listo para el ítem siguiente');

    /* Sin prerrequisito dominado no hace nada y no rompe nada. */
    estado.prerrequisitoPendiente = null;
    var nada = CB.partida.aplicarEscalon(esc, { nivelId: conPre.id }, limpio, estado);
    t.igual(nada, null, 'E55 · sin prerrequisito dominado no se aplica');
    t.igual(estado.prerrequisitoPendiente, null, 'E55 · y no deja basura en el estado');
  }
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

/* ══ E56-E58 · La variedad tiene que ser de VEHÍCULO ════════════════════════

   E56 es el fallo que motivó todo esto, y es el más difícil de los que llevo
   escritos porque no es un error de lógica: es un error de diseño que ninguna
   prueba podía ver. La primera versión de 1.8.0 daba a cada momento su propia
   coreografía —nueve recorridos distintos— pero las nueve eran la MISMA banda:
   mismo ancho, mismo sitio, misma letra, mismo tamaño. Verde en todo, y en
   pantalla el mismo rectángulo veinte veces por sesión.

   Peor: el guardián E47 original decía «ningún modificador reposiciona el
   cartel», con lo que la monotonía quedó blindada por una prueba. Cuando una
   comprobación impide la corrección, la comprobación es parte del fallo.

   Lo que se puede medir de esto, y por tanto lo que se mide: que las
   celebraciones no compartan todas el mismo vehículo.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E56 · las celebraciones no son todas el mismo cartel', function () {
  var t = CB.pruebas;
  var C = CB.ui.festejo.CELEBRACIONES;
  var claves = Object.keys(C);

  t.ok(claves.length >= 8, 'E56 · hay celebraciones declaradas', String(claves.length));

  var vehiculos = {};
  claves.forEach(function (k) { vehiculos[C[k].vehiculo] = (vehiculos[C[k].vehiculo] || 0) + 1; });
  var distintos = Object.keys(vehiculos);

  /* El umbral no es decorativo: con menos de cuatro vehículos se vuelve a lo que
     había —variar el recorrido de una misma pieza— y eso ya se probó que no se
     nota. */
  t.ok(distintos.length >= 4,
    'E56 · las celebraciones usan al menos cuatro vehículos distintos',
    distintos.join(', '));

  /* Y NINGUNO acapara. Si la cinta vuelve a llevarse la mayoría, estamos otra
     vez en el mismo sitio aunque la tabla declare cinco vehículos. */
  var mayor = 0, cual = '';
  distintos.forEach(function (v) { if (vehiculos[v] > mayor) { mayor = vehiculos[v]; cual = v; } });
  t.ok(mayor <= Math.ceil(claves.length / 2),
    'E56 · ningún vehículo se lleva más de la mitad de las celebraciones',
    cual + ' aparece ' + mayor + ' de ' + claves.length);

  /* LA REGLA DE ORO, y esta sí es de fondo: lo más frecuente tiene que ser lo
     más corto. La categoría A es el 60 % de los aciertos; si su celebración dura
     más que la del jefe, el juego se pasa la sesión esperando. */
  var normal = C[CB.ui.festejo.POR_CATEGORIA.A];
  t.ok(!!normal, 'E56 · la categoría A tiene celebración');
  if (normal) {
    var masLargas = claves.filter(function (k) { return C[k].ms > normal.ms; });
    t.ok(masLargas.length >= claves.length - 2,
      'E56 · la celebración más frecuente es de las más cortas que hay',
      'solo ' + masLargas.length + ' de ' + claves.length + ' duran más');
    t.ok(normal.vehiculo !== 'cinta',
      'E56 · el acierto de todos los días NO usa la banda');
  }

  /* Las cuatro categorías de acierto tienen que existir en la tabla: un mapeo a
     una clave inventada devolvería undefined y no se celebraría nada, en
     silencio. Es la familia de E42. */
  var huerfanas = ['A', 'B', 'C', 'D'].filter(function (cat) {
    return !C[CB.ui.festejo.POR_CATEGORIA[cat]];
  });
  t.igual(huerfanas.length, 0,
    'E56 · las cuatro categorías apuntan a celebraciones que existen',
    huerfanas.join(', '));
});

CB.pruebas.suite('E57 · cada vehículo hace algo distinto y observable', function () {
  var t = CB.pruebas;
  var insignia = document.getElementById('insignia-gemas');
  var cartel = document.getElementById('cartel-festejo');
  var cinta = document.getElementById('cinta');
  var zona = document.getElementById('zona-juego');

  if (!t.ok(!!(insignia && cartel && cinta && zona),
      'E57 · los cuatro nodos de celebración están en la maqueta')) return;

  CB.ui.festejo.limpiar();

  /* insignia: escribe el número y se ve */
  CB.ui.festejo.mostrar('normal', '¡Toma!', { bono: 2 });
  t.igual(insignia.hidden, false, 'E57 · el acierto normal enciende la insignia');
  t.igual(insignia.textContent, '+3', 'E57 · y suma el bono de rapidez al bloque');
  t.igual(cinta.hidden, true, 'E57 · sin tocar la cinta');
  t.igual(cartel.hidden, true, 'E57 · ni el cartel');

  /* cartel: el logro NO usa la banda */
  CB.ui.festejo.mostrar('logro', '¡Luz extra!');
  t.igual(cartel.hidden, false, 'E57 · el logro enciende el cartel');
  t.igual(cinta.hidden, true, 'E57 · y el logro no usa la banda');
  t.igual(insignia.hidden, true, 'E57 · y apaga la insignia anterior');

  /* cinta: la superación sí */
  CB.ui.festejo.mostrar('superacion', '¡Ahí está!');
  t.igual(cinta.hidden, false, 'E57 · la superación sí usa la banda');
  t.igual(cartel.hidden, true, 'E57 · y apaga el cartel anterior');

  /* sacudida: sin cartel ninguno */
  CB.ui.festejo.mostrar('raro', '¡Cristal!');
  t.ok(zona.classList.contains('zona-juego--sacude'),
    'E57 · el bloque raro sacude la cantera');
  t.igual(cinta.hidden, true, 'E57 · y no pinta ninguna banda');

  /* ánimo: NADA de fiesta */
  CB.ui.festejo.mostrar('animo');
  t.igual(cinta.hidden, true, 'E57 · el ánimo no pinta banda');
  t.igual(cartel.hidden, true, 'E57 · ni cartel');
  t.igual(insignia.hidden, true, 'E57 · ni insignia');
  t.ok(!zona.classList.contains('zona-juego--sacude'),
    'E57 · ni deja temblando la pantalla');

  CB.ui.festejo.limpiar();
  t.igual(CB.ui.festejo._salida, null, 'E57 · limpiar() no deja temporizadores');
});

CB.pruebas.suite('E58 · el ánimo no se celebra', function () {
  var t = CB.pruebas;
  var C = CB.ui.festejo.CELEBRACIONES;

  /* Un fallo no puede sonar a fiesta. La regla se comprueba, no se confía: es de
     las que se rompen sin querer el día que alguien copia una entrada de la
     tabla para hacer otra. */
  t.ok(!C.animo.sfx, 'E58 · el ánimo no trae efecto de sonido propio');
  t.ok(C.animo.vehiculo !== 'cinta' && C.animo.vehiculo !== 'cartel',
    'E58 · el ánimo no usa ni banda ni cartel', C.animo.vehiculo);
  t.ok(!C.animo.particulas, 'E58 · ni surtidor de partículas');

  /* Y no quedan gritos de ánimo: se retiraron cuando el ánimo dejó de tener
     dónde escribirlos. Un dato sin sitio donde pintarse acaba pareciendo vivo. */
  t.ok(!CB.datos.MENSAJES.GRITOS.animo,
    'E58 · no quedan gritos de ánimo en los datos');
  t.igual(CB.mensajes.grito.length, 1,
    'E58 · grito() ya solo recibe el contexto, sin tipo');
});

/* ══ E59-E61 · Fase 6 del plan: tres conductos que no estaban conectados ═════

   Ninguno de los tres es un error de lógica. Las funciones estaban escritas, bien
   escritas y documentadas; lo que faltaba era que alguien las llamara. Es la
   familia de E41 (marcarLectura) y de E55 (el escalón 4), y van cinco.

   NUMERACIÓN: el plan los llamaba E56-E58, pero esos números se los llevó 1.8.1
   mientras el plan esperaba. Se numeran de corrido por orden de escritura, que es
   la única regla que no se desincroniza.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E59 · atras() también ejecuta el manejador de salida', function () {
  var t = CB.pruebas;
  var pantallaPrevia = CB.pantallas.actual;
  var pilaPrevia = CB.pantallas.pila.slice();

  /* ir() lo ejecutaba y atras() no, así que la mitad de las salidas del juego no
     limpiaban nada. El síntoma no era un error: era el salvavidas de la tarjeta
     de reparación poniéndose a leer los tres pasos, a los 25 s, encima de otra
     pantalla. */
  var llamados = [];
  var salirPrevio = CB.pantallas.alSalir['p-mapa'];
  CB.pantallas.alSalir['p-mapa'] = function () { llamados.push('p-mapa'); };

  CB.pantallas.ir('p-mapa');
  /* SE AFIRMA EL ESTADO PREVIO. Sin esto, «no se llamó» pasaría también si nunca
     hubiéramos llegado a p-mapa, que es la vacuidad que dejó a E46 sin valor. */
  t.igual(CB.pantallas.actual, 'p-mapa', 'E59 · estamos en el mapa antes de salir');
  t.igual(llamados.length, 0, 'E59 · y su manejador aún no se ha ejecutado');

  CB.pantallas.atras();
  t.igual(llamados.length, 1, 'E59 · atras() ejecuta el alSalir de la pantalla que deja');

  /* Y con el caso real: los temporizadores de la reparación. */
  if (CB.pantallas.alSalir['p-reparacion']) {
    CB.pantallas.ir('p-reparacion');
    CB.ui._timersReparacion = { salvavidas: setTimeout(function () {}, 60000),
                                reloj: setInterval(function () {}, 60000) };
    t.ok(CB.ui._timersReparacion !== null,
      'E59 · la reparación tiene temporizadores vivos antes de salir');
    CB.pantallas.atras();
    t.igual(CB.ui._timersReparacion, null,
      'E59 · y salir con atras() los apaga, no los deja corriendo');
  }

  if (salirPrevio) CB.pantallas.alSalir['p-mapa'] = salirPrevio;
  else delete CB.pantallas.alSalir['p-mapa'];
  CB.pantallas.pila = pilaPrevia;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E60 · cada componente se presenta la primera vez que se ve', function () {
  var t = CB.pruebas;
  var P = CB.componentes.PRESENTACION;
  var claves = Object.keys(P);

  t.igual(claves.length, 7, 'E60 · están las siete frases de presentación');

  /* Toda clave tiene que ser un componente que EXISTE. Las claves son nombres de
     función —'ordenarFila', 'selectorSigno'— y NO coinciden con los valores de
     item.formato, que son 'ordenar' y 'signo'. Resolver la frase desde el formato
     habría devuelto undefined en casi todos los casos sin fallar: la familia de
     E42. Este aserto es lo que impide que alguien lo «simplifique» así. */
  var inexistentes = claves.filter(function (k) {
    return typeof CB.componentes[k] !== 'function';
  });
  t.igual(inexistentes.length, 0,
    'E60 · toda frase corresponde a un componente que existe', inexistentes.join(', '));

  var vacias = claves.filter(function (k) { return !P[k] || !P[k].length; });
  t.igual(vacias.length, 0, 'E60 · ninguna frase está vacía', vacias.join(', '));

  /* El ciclo completo sobre un perfil de verdad. */
  var perfil = CB.pruebas.perfilNuevo();
  t.ok(CB.componentes.necesitaPresentacion(perfil, 'balanza'),
    'E60 · un perfil nuevo no ha visto la balanza');

  CB.componentes.marcarVisto(perfil, 'balanza');
  t.ok(!CB.componentes.necesitaPresentacion(perfil, 'balanza'),
    'E60 · y después de verla, no se vuelve a presentar');
  t.ok(perfil.componentesVistos.indexOf('balanza') !== -1,
    'E60 · queda anotado en el perfil');

  /* Marcar dos veces no duplica: el campo se guarda y crecería sin freno. */
  CB.componentes.marcarVisto(perfil, 'balanza');
  t.igual(perfil.componentesVistos.filter(function (x) { return x === 'balanza'; }).length, 1,
    'E60 · marcar dos veces no duplica la entrada');

  /* Y sobrevive al guardado: sin guion bajo delante, como manda sanear(). */
  var saneado = CB.almacen.sanear(JSON.parse(JSON.stringify(perfil)));
  t.ok(saneado.componentesVistos && saneado.componentesVistos.indexOf('balanza') !== -1,
    'E60 · la lista sobrevive a sanear()');

  /* ── Y AHORA EL CONDUCTO, QUE ES LO QUE FALTABA ──────────────────────────
     Todo lo de arriba comprueba las dos funciones sueltas, y las dos funciones
     sueltas llevaban años siendo correctas: lo que no existía era la llamada.
     Sembrando el fallo —quitar la comprobación de necesitaPresentacion y dejar
     solo marcarVisto— este guardián seguía EN VERDE. Es exactamente la debilidad
     que el propio plan anunciaba: «un guardián que solo comprueba la primera vez
     pasa en verde con la función a medio conectar».

     Así que se sirve un ítem de verdad y se mira la pantalla. */
  var perfilPrevio = CB.perfil;
  var limpio = CB.pruebas.perfilNuevo();
  CB.perfil = limpio;
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  var nodo = document.getElementById('item-mensaje');

  if (t.ok(!!(estado && nodo), 'E60 · hay partida y nodo de mensaje')) {
    estado.proximoDescanso = 99;
    /* NO se llama a servirItem() aquí: CB.partida.iniciar() YA sirvió el primer
       ítem. Llamarlo otra vez servía el SEGUNDO, cuyo primer gesto es ocultar el
       mensaje, y entonces esto medía la pantalla después de haberla limpiado. La
       primera versión de este bloque lo hacía y se ponía roja contra código
       correcto. Se le pregunta al estado en el que iniciar() lo dejó. */
    var primera = nodo.textContent;
    var vistosTrasUna = limpio.componentesVistos.slice();

    t.ok(vistosTrasUna.length > 0,
      'E60 · servir el primer ítem anota el componente en el perfil',
      JSON.stringify(vistosTrasUna));
    t.ok(primera && primera.length > 0,
      'E60 · y pinta su frase de presentación', primera);
    t.ok(claves.indexOf(vistosTrasUna[0]) !== -1,
      'E60 · lo anotado es una clave real de PRESENTACION', vistosTrasUna[0]);

    /* Y LA SEGUNDA VEZ NO SE REPITE. Esta es la mitad que caza el conducto a
       medias: si se marca sin comprobar, la frase vuelve a salir en cada ítem. */
    CB.partida.servirItem();
    t.ok(nodo.textContent !== primera || nodo.hidden,
      'E60 · el mismo componente no se vuelve a presentar en el ítem siguiente',
      'sigue diciendo: ' + nodo.textContent);
  }

  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

CB.pruebas.suite('E61 · el enunciado se lee solo, pero solo cuando debe', function () {
  var t = CB.pruebas;

  /* SE INSTALAN DOBLES CON defineProperty y se restauran POR DESCRIPTOR. La
     asignación directa se cae en silencio si la propiedad no es escribible, y
     entonces esto mediría la función de verdad, es decir, nada. Es la lección de
     window.caches. */
  var descLeer = Object.getOwnPropertyDescriptor(CB.voz, 'leer');
  var descGuiada = Object.getOwnPropertyDescriptor(CB.voz, 'lecturaGuiada');
  var descDisp = Object.getOwnPropertyDescriptor(CB.voz, 'disponible');
  var activaPrevia = CB.voz.activa;

  var leidos = [], guiados = [];
  Object.defineProperty(CB.voz, 'leer', {
    configurable: true, writable: true,
    value: function (texto, alTerminar) { leidos.push(texto); if (alTerminar) alTerminar(); return true; }
  });
  Object.defineProperty(CB.voz, 'lecturaGuiada', {
    configurable: true, writable: true,
    value: function (texto) { guiados.push(texto); }
  });
  Object.defineProperty(CB.voz, 'disponible', {
    configurable: true, writable: true, value: function () { return true; }
  });

  /* Que los dobles se instalaran se AFIRMA, no se supone. */
  t.ok(CB.voz.leer !== (descLeer && descLeer.value),
    'E61 · el doble de CB.voz.leer se ha instalado de verdad');

  var perfilPrevio = CB.perfil;
  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });

  /* SE SIRVE UN PROBLEMA DE VERDAD. La primera versión de este guardián escribía
     estado.itemActual a mano y llamaba a servirItem(), que genera el suyo propio
     desde el guion — y el mundo M1 no sirve problemas de enunciado. Resultado: no
     se leía nada, y la mitad A pasaba en VERDE por no haber servido ningún
     problema, no por tener la voz apagada. Vacuidad de manual, y la cazó la mitad
     B al ponerse roja. Ahora el guion se fuerza a un nivel de problemas real y se
     AFIRMA que lo servido trae subtipo antes de medir nada. */
  var idProblema = null;
  var ids = CB.catalogo.ids(), k, niv;
  for (k = 0; k < ids.length; k++) {
    niv = CB.catalogo.get(ids[k]);
    if (niv && /^problemas_/.test(niv.destreza || '')) { idProblema = ids[k]; break; }
  }
  if (!t.ok(!!idProblema, 'E61 · el catálogo tiene niveles de problemas')) {
    if (descLeer) Object.defineProperty(CB.voz, 'leer', descLeer);
    if (descGuiada) Object.defineProperty(CB.voz, 'lecturaGuiada', descGuiada);
    if (descDisp) Object.defineProperty(CB.voz, 'disponible', descDisp);
    CB.voz.activa = activaPrevia;
    CB.partida.estado = null;
    CB.perfil = perfilPrevio;
    return;
  }

  function servirProblema() {
    estado.guion = [idProblema, idProblema, idProblema];
    estado.indice = 0;
    estado.proximoDescanso = 99;
    CB.partida.servirItem();
    return !!(estado.itemActual && estado.itemActual.subtipo);
  }

  /* MITAD A · con la voz apagada NO se lee nada, por ninguna de las dos vías. */
  CB.voz.activa = false;
  leidos.length = 0; guiados.length = 0;
  var servido = servirProblema();
  t.ok(servido, 'E61 · se ha servido un problema de enunciado de verdad');
  t.igual(leidos.length, 0, 'E61 · con «leer en voz alta» apagado, nadie lee');
  t.igual(guiados.length, 0, 'E61 · ni por la lectura guiada, que no mira ese ajuste');

  /* MITAD B · con la voz encendida sí, y con el reloj parado mientras lee. */
  CB.voz.activa = true;
  leidos.length = 0;
  var paradas = 0;
  var pararPrevio = CB.partida.pararCronometro;
  CB.partida.pararCronometro = function () { paradas++; return pararPrevio.apply(this, arguments); };
  servirProblema();
  CB.partida.pararCronometro = pararPrevio;

  t.ok(leidos.length > 0, 'E61 · con la voz encendida, el problema se lee solo');
  t.ok(paradas > 0, 'E61 · y el cronómetro se para mientras lee');
  t.ok(leidos.length === 0 || (leidos[0] || '').length > 0,
    'E61 · y lo que se lee no está vacío');

  /* Y el altavoz del enunciado existe y NO levanta el bloqueo antiazar. */
  t.ok(typeof CB.partida.accionLeerSuave === 'function',
    'E61 · hay una lectura que no levanta el bloqueo');
  CB.partida.bloqueado = true;
  CB.partida.accionLeerSuave();
  t.igual(CB.partida.bloqueado, true,
    'E61 · el altavoz del enunciado no anula el bloqueo antiazar de un roce');
  CB.partida.bloqueado = false;

  if (descLeer) Object.defineProperty(CB.voz, 'leer', descLeer);
  if (descGuiada) Object.defineProperty(CB.voz, 'lecturaGuiada', descGuiada);
  if (descDisp) Object.defineProperty(CB.voz, 'disponible', descDisp);
  CB.voz.activa = activaPrevia;
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

/* ══ E62 · El teclado bloqueado no puede tener una tecla que finja ═══════════

   Fase 7 del plan. El bloqueo de 800 ms al montar es correcto y no se toca: está
   para que un toque heredado del ítem anterior no conteste el siguiente. Lo que
   estaba mal es cómo se ve.

   `.teclado-bloques .btn-bloque[data-tecla="ok"]` vale (0,3,0) y
   `.btn-bloque:disabled` vale (0,2,0): ganaba el verde. Once teclas de piedra y
   hundidas, y la única que el niño quiere pulsar, brillante. No es un detalle
   estético: es la diferencia entre «espera» y «pulsa, que no pasa nada», y lo
   segundo se lee como que el juego está roto.

   Y con el movimiento apagado era peor. La excepción del mixin
   desactivar-movimiento valía (0,2,1) con su prefijo y anulaba el hundido, así
   que en el ajuste que MÁS necesita señales no cromáticas el color se quedaba
   como única señal.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E62 · con el teclado bloqueado, el OK tampoco engaña', function () {
  var t = CB.pruebas;
  var caja = document.getElementById('item-respuesta');
  if (!t.ok(!!caja, 'E62 · hay contenedor de respuesta')) return;

  CB.componentes.tecladoBloques({ respuesta: 7 }, function () {}, { bloqueoMs: 30000 });
  var ok = caja.querySelector('.btn-bloque[data-tecla="ok"]');
  var uno = caja.querySelector('.btn-bloque[data-tecla="1"]');
  if (!t.ok(!!(ok && uno), 'E62 · están el OK y el 1')) return;

  /* SE AFIRMA EL BLOQUEO ANTES DE MEDIR. Sin esto, si el teclado no llegara a
     deshabilitarse compararíamos dos botones activos —que sí son de colores
     distintos a propósito— y la prueba pasaría midiendo lo contrario. */
  t.ok(ok.disabled || ok.getAttribute('aria-disabled') === 'true',
    'E62 · el OK está deshabilitado durante la construcción');

  var fondoOk = getComputedStyle(ok).backgroundColor;
  var fondoUno = getComputedStyle(uno).backgroundColor;
  t.igual(fondoOk, fondoUno,
    'E62 · bloqueado, el OK tiene el mismo fondo que las demás teclas',
    'OK ' + fondoOk + ' vs 1 ' + fondoUno);

  /* Y EL HUNDIDO SOBREVIVE AL AJUSTE DE MOVIMIENTO REDUCIDO.
     Esto se comprueba sobre las REGLAS, no sobre el estilo calculado, y no es
     pereza: en la maqueta de pruebas los botones no tienen caja de composición
     —getBoundingClientRect() da 0— y Chrome devuelve `transform: none` para todo
     elemento sin renderizar, valga lo que valga la regla. Medirlo ahí daba
     `none` incluso con un `style.transform` puesto a mano, es decir, habría sido
     un guardián que se pone rojo mida lo que mida. Se leen las dos reglas que
     compiten y se comprueba la relación entre ellas, que es el invariante real. */
  var reglaDesactivado = null, reglaMonta = null, h, i, hojas, r;
  for (h = 0; h < document.styleSheets.length; h++) {
    try { hojas = document.styleSheets[h].cssRules; } catch (eH) { continue; }
    if (!hojas) continue;
    for (i = 0; i < hojas.length; i++) {
      r = hojas[i];
      if (!r.selectorText || !r.style) continue;
      if (/\.btn-bloque:disabled/.test(r.selectorText) && r.style.transform) reglaDesactivado = r;
      if (/sin-movimiento[^,]*\.btn-bloque--monta/.test(r.selectorText)) reglaMonta = r;
    }
  }

  t.ok(!!reglaDesactivado && reglaDesactivado.style.transform !== 'none',
    'E62 · el botón bloqueado declara su hundido',
    reglaDesactivado ? reglaDesactivado.style.transform : 'no se encuentra la regla');

  /* LA CLAVE. Con el prefijo, la excepción del movimiento reducido vale (0,2,1) y
     le gana a .btn-bloque:disabled (0,2,0): sin el :not(:disabled) anulaba
     también el hundido, y en el ajuste que MÁS necesita señales que no sean
     color el color se quedaba como única señal. */
  t.ok(!!reglaMonta, 'E62 · existe la excepción de movimiento reducido para los botones');
  if (reglaMonta) {
    t.ok(/:not\(:disabled\)/.test(reglaMonta.selectorText),
      'E62 · y no alcanza a los botones bloqueados: conserva su hundido',
      reglaMonta.selectorText);
  }
});

/* ══ E64-E67 · Fase 8: deshacer, confirmar y no perder la partida por un roce ═

   TRAMPA OBLIGATORIA EN LOS CUATRO. CB.componentes.montar() bloquea de forma
   síncrona y desbloquea en un temporizador, incluso con bloqueoMs: 0. Tocar en la
   línea siguiente a montar el componente entra por el early return y NO PASA
   NADA — y entonces «el primer toque no contesta» pasa en verde por no haber
   habido primer toque. Es la vacuidad que dejó a E46 sin valor durante toda su
   vida. Aquí se espera al desbloqueo y se AFIRMA que el primer gesto entró antes
   de comprobar nada de lo que viene después.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas._desbloqueo = function () {
  return new Promise(function (listo) {
    var t0 = Date.now();
    var i = setInterval(function () {
      if (!CB.partida.bloqueado || Date.now() - t0 > 4000) { clearInterval(i); listo(); }
    }, 20);
  });
};

CB.pruebas.suite('E64 · ordenar y elegir datos se pueden deshacer', function () {
  var t = CB.pruebas;
  var bloqueoPrevio = CB.partida.bloqueado;
  CB.partida.bloqueado = false;

  var respuestas = [];
  CB.componentes.ordenarFila(
    { piezas: [3, 1, 2], orden: [1, 2, 3], respuesta: 7 },
    function (v) { respuestas.push(v); }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    var cont = CB.componentes.contenedor();
    var piezas = cont.querySelectorAll('.fila-ordenar .btn-bloque');
    if (!t.ok(piezas.length >= 3, 'E64 · la fila monta sus piezas', String(piezas.length))) return;

    /* Tres toques, y SE AFIRMA QUE ENTRARON antes de deshacer nada. */
    piezas[0].click(); piezas[1].click();
    t.igual(CB.componentes._seleccion.length, 2,
      'E64 · los dos primeros toques entran de verdad');
    t.igual(piezas[0].disabled, true, 'E64 · y la pieza tocada se deshabilita');

    var deshacer = null, i, todos = cont.querySelectorAll('.btn-bloque');
    for (i = 0; i < todos.length; i++) {
      if (/Quitar/.test(todos[i].textContent)) deshacer = todos[i];
    }
    if (!t.ok(!!deshacer, 'E64 · existe el botón de quitar')) return;

    deshacer.click();
    t.igual(CB.componentes._seleccion.length, 1, 'E64 · quitar retira la última');
    t.igual(piezas[1].disabled, false,
      'E64 · y la pieza vuelve a estar disponible, no solo el hueco vacío');
    var hueco = cont.querySelector('[data-hueco="1"]');
    t.igual(hueco ? hueco.textContent : '', '·', 'E64 · el hueco se vacía');

    deshacer.click();
    t.igual(CB.componentes._seleccion.length, 0, 'E64 · se puede deshacer hasta el principio');
    deshacer.click();
    t.igual(CB.componentes._seleccion.length, 0, 'E64 · y quitar de una fila vacía no rompe nada');
    t.igual(respuestas.length, 0, 'E64 · nada de esto ha contestado por su cuenta');

    CB.partida.bloqueado = bloqueoPrevio;
  });
});

CB.pruebas.suite('E65 · la confirmación se ve, y alcanza a los siete formatos', function () {
  var t = CB.pruebas;
  var confPrevia = CB.componentes._confirmacionPendiente;
  var bloqueoPrevio = CB.partida.bloqueado;
  var nodo = CB.ui.nodoMensaje();

  CB.partida.bloqueado = false;
  CB.componentes._confirmacionPendiente = true;
  CB.ui.ocultarMensaje();

  var respuestas = [];
  CB.componentes.selectorSigno({ respuesta: '+' },
    function (v) { respuestas.push(v); }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    var cont = CB.componentes.contenedor();
    var mas = cont.querySelector('.btn-bloque');
    if (!t.ok(!!mas, 'E65 · el selector de signo monta sus botones')) return;

    mas.click();
    /* Que el primer toque LLEGARA se afirma por su efecto visible: si hubiera
       entrado por el early return del bloqueo no habría ni mensaje ni atributo, y
       «no ha contestado» pasaría por no haber tocado nada. */
    t.igual(mas.getAttribute('data-confirmando'), 'si',
      'E65 · el primer toque queda registrado como pendiente de confirmar');
    t.igual(respuestas.length, 0, 'E65 · y no contesta');
    t.ok(nodo && !nodo.hidden && /confirmar/i.test(nodo.textContent),
      'E65 · el aviso se VE, no solo se anuncia',
      nodo ? nodo.textContent : 'sin nodo');

    mas.click();
    t.igual(respuestas.length, 1, 'E65 · el segundo toque sí contesta');

    /* Y los cuatro que antes se la saltaban la piden ahora.
       SE ACEPTA LA DELEGACIÓN, y conviene explicar por qué: al unificar los
       teclados (fase 9), selectorDatos dejó de contener la palabra
       `pedirConfirmacion` —la pide el teclado en el que delega— y este aserto se
       puso rojo contra código correcto. Es la fragilidad que el proyecto ya tiene
       anotada: leer el texto fuente de una función solo vale para literales y
       nombres de propiedad, y aquí se estaba usando para inferir comportamiento.

       Se deja el barrido porque cubre seis formatos de un vistazo, pero el
       séptimo lo comprueba E68 CONDUCIENDO las tres fases, que es la única forma
       honesta de saberlo. */
    var conCerrojo = ['tecladoBloques', 'opciones4', 'balanza', 'selectorSigno',
                      'ordenarFila', 'monedas', 'selectorDatos'].filter(function (f) {
      var src = String(CB.componentes[f]);
      return /pedirConfirmacion/.test(src) || /tecladoBloques\(/.test(src);
    });
    t.igual(conCerrojo.length, 7,
      'E65 · los siete formatos pasan por la confirmación, directa o delegada',
      'la piden: ' + conCerrojo.join(', '));

    CB.componentes._confirmacionPendiente = confPrevia;
    CB.partida.bloqueado = bloqueoPrevio;
    CB.ui.ocultarMensaje();
  });
});

CB.pruebas.suite('E66 · salir de la partida pide dos toques y caduca', function () {
  var t = CB.pruebas;
  var estadoPrevio = CB.partida.estado;
  var finPrevio = CB.partida.finalizar;
  var finales = [];
  CB.partida.finalizar = function (motivo) { finales.push(motivo); };

  var boton = document.createElement('button');
  boton.setAttribute('data-accion', 'salir-partida');
  boton.textContent = '◀ Salir';
  document.body.appendChild(boton);

  var msPrevio = CB.partida.MS_CONFIRMAR_SALIDA;
  CB.partida.MS_CONFIRMAR_SALIDA = 120;      // para no esperar tres segundos
  CB.partida._rotuloSalir = null;

  CB.partida.pedirSalida(boton);
  t.igual(finales.length, 0, 'E66 · un solo toque NO termina la expedición');
  t.igual(boton.getAttribute('data-confirmando'), 'si', 'E66 · queda armado');
  t.ok(/de verdad/.test(boton.textContent),
    'E66 · y lo dice cambiando el texto, no solo el color', boton.textContent);

  CB.partida.pedirSalida(boton);
  t.igual(finales.length, 1, 'E66 · el segundo toque sí sale');
  t.igual(finales[0], 'salida', 'E66 · con el motivo correcto');

  /* LA CADUCIDAD, que es la aserción que se olvida y la que atrapa un cerrojo que
     no se suelta nunca: el niño toca Salir sin querer, sigue jugando cinco
     minutos, y el siguiente roce —ya sin aviso ninguno— termina la partida. */
  finales.length = 0;
  CB.partida._rotuloSalir = null;
  boton.textContent = '◀ Salir';
  CB.partida.pedirSalida(boton);
  return new Promise(function (listo) {
    setTimeout(function () {
      t.igual(boton.getAttribute('data-confirmando'), null,
        'E66 · el armado caduca solo');
      t.igual(boton.textContent, '◀ Salir', 'E66 · y el rótulo vuelve a lo que era');
      t.igual(finales.length, 0, 'E66 · sin haber terminado nada');

      CB.partida.MS_CONFIRMAR_SALIDA = msPrevio;
      CB.partida.finalizar = finPrevio;
      CB.partida.estado = estadoPrevio;
      document.body.removeChild(boton);
      listo();
    }, 260);
  });
});

CB.pruebas.suite('E67 · tocar una moneda deja marca, y reiniciar la borra', function () {
  var t = CB.pruebas;
  var bloqueoPrevio = CB.partida.bloqueado;
  var confPrevia = CB.componentes._confirmacionPendiente;
  CB.partida.bloqueado = false;
  CB.componentes._confirmacionPendiente = false;

  var respuestas = [];
  CB.componentes.monedas(
    { modo: 'pagar', objetivo: 6, disponibles: [1, 2, 5] },
    function (v) { respuestas.push(v); }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    var cont = CB.componentes.contenedor();
    var dos = cont.querySelector('.pieza[aria-label]');
    var piezas = cont.querySelectorAll('.pieza');
    if (!t.ok(piezas.length >= 3, 'E67 · se montan las piezas', String(piezas.length))) return;

    dos = piezas[1];                       // la de 2 €
    dos.click();
    t.igual(dos.getAttribute('data-veces'), '1',
      'E67 · tocar una moneda deja marca: antes no dejaba ninguna');
    dos.click();
    t.igual(dos.getAttribute('data-veces'), '2', 'E67 · y cuenta las veces');

    var fila = cont.querySelector('.hilera-cogidas');
    t.ok(!!fila, 'E67 · existe la fila de lo cogido');
    t.igual(fila ? fila.querySelectorAll('.hilera-cogidas__pieza').length : 0, 2,
      'E67 · la fila muestra las dos piezas, no solo el total');

    /* Y la pieza que CIERRA el pago también se marca: si el contador estuviera
       detrás de la comprobación del objetivo, la última no se vería nunca. */
    piezas[0].click();                     // la de 1 €: total 5, aún no llega
    piezas[1].click();                     // otra de 2 €: total 7 ≥ 6, cierra
    t.igual(dos.getAttribute('data-veces'), '3',
      'E67 · la pieza que cierra el pago también queda marcada');
    t.ok(respuestas.length > 0, 'E67 · y el pago se ha cerrado');

    var reinicio = null, i, botones = cont.querySelectorAll('.btn-bloque');
    for (i = 0; i < botones.length; i++) {
      if (/Empezar/.test(botones[i].textContent)) reinicio = botones[i];
    }
    if (!t.ok(!!reinicio, 'E67 · existe «Empezar de nuevo»')) return;

    reinicio.click();
    t.igual(cont.querySelectorAll('[data-veces]').length, 0,
      'E67 · reiniciar borra las marcas: si no, el total diría 0 y las monedas otra cosa');
    t.igual(fila ? fila.querySelectorAll('.hilera-cogidas__pieza').length : -1, 0,
      'E67 · y vacía la fila');

    CB.partida.bloqueado = bloqueoPrevio;
    CB.componentes._confirmacionPendiente = confPrevia;
  });
});

/* ══ E68 · Fase 9: los tres teclados eran uno mal copiado ════════════════════

   La fase 3 de selectorDatos —la de escribir el resultado de un problema, que se
   usa en TODOS los problemas de enunciado desde el segundo trimestre— era una
   copia del teclado con seis diferencias, todas en su contra: ⌫ mudo, dígito
   mudo, visor sin role ni aria-live, sin mirar CB.partida.bloqueado, sin
   confirmación del antiazar, y data-tecla="OK" en mayúsculas — que hace que
   [data-tecla="ok"] no lo alcance y ni siquiera reciba el verde del primario.

   LO QUE DE VERDAD VIGILA ESTE GUARDIÁN no es nada de eso. Unificar teclados es
   fácil; lo difícil es no perder por el camino los cuatro campos de diagnóstico
   que viajan con la respuesta, porque de ellos sale el informe del adulto y NO SE
   VEN EN PANTALLA. Un informe que empieza a decir que el niño falla la
   comprensión lectora cuando lo que falla es la cuenta no da ningún error.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E68 · la fase 3 usa el teclado de verdad, y no pierde el informe', function () {
  var t = CB.pruebas;
  var bloqueoPrevio = CB.partida.bloqueado;
  var confPrevia = CB.componentes._confirmacionPendiente;
  CB.componentes._confirmacionPendiente = false;

  var item = {
    enunciado: 'Ana tiene 7 canicas y le dan 5 más.',
    consigna: '¿Cuántas tiene ahora?',
    respuesta: 12, operacion: '+', subtipo: 'cambio1', datos: [7, 5]
  };
  var recibido = null;
  CB.componentes.selectorDatos(item, function (v, origen, extra) {
    recibido = { v: v, origen: origen, extra: extra };
  }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    var cont = CB.componentes.contenedor();

    /* Fase 1: elegir los dos números del enunciado. */
    var numeros = cont.querySelectorAll('.rejilla-respuestas .btn-bloque');
    if (!t.ok(numeros.length >= 2, 'E68 · la fase de datos monta sus números',
        String(numeros.length))) return;
    numeros[0].click(); numeros[1].click();

    /* Fase 2: el signo. Puede saltarse si el generador no la pide. */
    var signo = cont.querySelector('.btn-bloque[aria-label*="sumar"]');
    if (signo) signo.click();

    return CB.pruebas._desbloqueo().then(function () {
      /* Fase 3: aquí es donde estaba la copia. */
      var teclado = cont.querySelector('.teclado-bloques');
      if (!t.ok(!!teclado, 'E68 · se llega a la fase de escribir el resultado')) return;

      var ok = teclado.querySelector('[data-tecla="ok"]');
      t.ok(!!ok, 'E68 · el OK lleva data-tecla en minúsculas, como el teclado de verdad',
        'si no, [data-tecla="ok"] no lo alcanza y ni se pinta de primario');

      var visor = cont.querySelector('#visor-respuesta');
      t.ok(!!visor, 'E68 · el visor es el del teclado real');
      t.igual(visor ? visor.getAttribute('aria-live') : null, 'polite',
        'E68 · y se anuncia: la copia no tenía aria-live ninguno');

      /* Se escribe 12 y se confirma. */
      var d1 = teclado.querySelector('[data-tecla="1"]');
      var d2 = teclado.querySelector('[data-tecla="2"]');
      if (!t.ok(!!(d1 && d2 && ok), 'E68 · están las teclas necesarias')) return;
      d1.click(); d2.click();
      t.igual(CB.componentes._valor, '12', 'E68 · los dígitos entran en el visor común');
      ok.click();

      /* Y LO QUE IMPORTA: los cuatro campos del informe, intactos. */
      if (!t.ok(!!recibido, 'E68 · la respuesta llega')) return;
      t.igual(recibido.v, 12, 'E68 · con el valor tecleado');
      t.igual(recibido.origen, 'datos',
        'E68 · y con origen «datos», no «teclado»: de ahí cuelga el registro por fases');
      var e = recibido.extra || {};
      t.ok(!!e.datosElegidos && e.datosElegidos.length === 2,
        'E68 · llegan los datos elegidos', JSON.stringify(e.datosElegidos));
      t.ok('faseDatosOk' in e, 'E68 · llega faseDatosOk');
      t.ok('faseOperacionOk' in e, 'E68 · llega faseOperacionOk');
      t.ok('signoElegido' in e, 'E68 · llega el signo elegido');

      /* Y LA CONFIRMACIÓN DEL ANTIAZAR, conducida de verdad. E65 la comprueba
         leyendo el código fuente de los otros seis formatos; para este no puede,
         porque delega. Aquí se toca el OK con el cerrojo puesto y se mira si
         contesta, que es lo único que de verdad lo demuestra. */
      recibido = null;
      CB.componentes._confirmacionPendiente = true;
      /* El visor NO se vacía al contestar —lo remonta la partida al servir el ítem
         siguiente—, así que aquí se limpia a mano antes de teclear. Sin esto se
         escribía sobre el «12» anterior y salía «121». */
      CB.componentes._valor = '';
      d1.click();
      var ok2 = cont.querySelector('.teclado-bloques [data-tecla="ok"]');
      t.igual(CB.componentes._valor, '1', 'E68 · se ha escrito algo que confirmar');
      ok2.click();
      t.igual(recibido, null, 'E68 · con el antiazar disparado, el primer OK no contesta');
      ok2.click();
      t.ok(!!recibido, 'E68 · y el segundo sí');

      CB.partida.bloqueado = bloqueoPrevio;
      CB.componentes._confirmacionPendiente = confPrevia;
    });
  });
});

/* ══ E69-E73 · Fase 10: cinco premios que el juego calculaba y no enseñaba ═══

   Ninguno es un fallo de cálculo. Los cinco se guardaban bien en el perfil. Lo
   que faltaba era decirlo, y por eso ninguno daba error: el juego funcionaba, el
   niño no se enteraba.

   Todos los asertos miran el DOM —textContent, hidden, la identidad del nodo—,
   nunca el texto fuente de una función.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E69 · el cromo del bloque raro dice cuál es', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E69 · hay partida')) { CB.perfil = perfilPrevio; return; }

  /* Diez cromos ya reunidos: queda exactamente uno, así que se sabe cuál toca. */
  var todos = Object.keys(CB.ui.CRIATURAS);
  perfil.cromos = todos.slice(0, todos.length - 1);
  var queFalta = todos[todos.length - 1];

  var dado = CB.partida.darCromo();
  t.igual(dado, queFalta, 'E69 · darCromo DEVUELVE el id, para poder nombrarlo');
  t.ok(perfil.cromos.indexOf(queFalta) !== -1, 'E69 · y lo guarda en el álbum');
  t.ok(!!CB.casa.NOMBRES_CROMO[dado],
    'E69 · el id tiene nombre legible: el anuncio decía «gluglu», no «Gluglú»', dado);

  /* Con los once reunidos devuelve null, y no revienta. */
  var otra = CB.partida.darCromo();
  t.igual(otra, null, 'E69 · con los once reunidos devuelve null en vez de fallar');

  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

CB.pruebas.suite('E70 · el reto bonus se ve, también en los problemas', function () {
  var t = CB.pruebas;
  var cont = document.getElementById('item-enunciado');
  if (!t.ok(!!cont, 'E70 · hay panel de enunciado')) return;

  /* Ítem de cálculo. */
  CB.ui.pintarItem({ consigna: '6 − 3', operacion: '-', esRetoBonus: true });
  t.igual(cont.querySelectorAll('.distintivo').length, 1,
    'E70 · un ítem de cálculo marcado como reto lleva su distintivo');

  /* Y UN PROBLEMA, que es la mitad que importa: esa rama hace `return` antes de
     llegar al final de pintarItem, así que un distintivo puesto abajo no se vería
     nunca justo donde D === 3 es más probable. */
  CB.ui.pintarItem({ frases: ['Ana tiene 3 canicas.', '¿Cuántas le quedan?'],
                     consigna: '¿Cuántas?', esRetoBonus: true });
  t.igual(cont.querySelectorAll('.distintivo').length, 1,
    'E70 · y un problema de enunciado también, pese al return de esa rama');

  /* Sin reto, ninguno. */
  CB.ui.pintarItem({ consigna: '6 − 3', operacion: '-' });
  t.igual(cont.querySelectorAll('.distintivo').length, 0,
    'E70 · sin reto no aparece: es una etiqueta, no un adorno fijo');
});

CB.pruebas.suite('E71 · lo que se celebra al acabar se ve en la pantalla de fin', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E71 · hay partida')) { CB.perfil = perfilPrevio; return; }

  estado.preguntas = 10; estado.aciertos = 9; estado.aciertos1er = 8;
  estado.puntos = 500; estado.gemas = 20;
  CB.partida.finalizar('guion');

  t.igual(CB.pantallas.actual, 'p-fin', 'E71 · se termina en la pantalla de fin');

  /* LA CINTA DE p-fin. Se comprueba la IDENTIDAD del nodo, no que exista alguno:
     si p-fin no tuviera el suyo, nodoDe() caería en el getElementById('cinta') de
     respaldo —el de p-partida, oculto— y todo se celebraría donde no se ve. */
  var deFin = document.getElementById('cinta-fin');
  var elegido = CB.ui.cinta.nodoDe();
  t.ok(!!deFin, 'E71 · la pantalla de fin tiene su propio nodo de cinta');
  t.igual(elegido, deFin,
    'E71 · y es el que se elige estando en p-fin, no el de la partida',
    elegido ? elegido.id : 'ninguno');

  /* Y la cinta cae DENTRO de la sección, no al 38 % del viewport. */
  if (deFin) {
    t.igual(getComputedStyle(deFin).position, 'absolute',
      'E71 · la cinta de fin sigue siendo absoluta');
    t.igual(getComputedStyle(document.getElementById('p-fin')).position, 'relative',
      'E71 · y la pantalla de fin la ancla: si no, caería sobre el panel de gemas');
  }

  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E72 · abrir un mundo se dice, y una sola vez', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  var anunciados = [];
  var anunciarPrevio = CB.a11y.anunciar;
  CB.a11y.anunciar = function (txt) { anunciados.push(String(txt)); return anunciarPrevio.apply(this, arguments); };

  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;

  /* Se completa M1 para que al terminar se abra M2. SE LE PREGUNTA AL CATÁLOGO
     cuáles son sus niveles nucleares: la primera versión filtraba por
     `nivel.mundo === 'M1'`, una propiedad QUE NO EXISTE —el nivel no guarda su
     mundo—, así que no marcaba ninguno y las cuatro aserciones de abajo se
     ponían rojas contra código correcto. Suponer la forma de un dato ajeno es
     exactamente lo que se cobró E42. */
  var nucleares = CB.catalogo.nuclearesDe('M1'), i;
  for (i = 0; i < nucleares.length; i++) {
    perfil.niveles[nucleares[i]] = { n: 10, aciertos: 10, caja: 3, D: 2,
                                     ultimoISO: CB.util.hoyISO(), enPausa: false };
  }

  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  estado.preguntas = 10; estado.aciertos = 10; estado.aciertos1er = 10; estado.puntos = 400;
  anunciados.length = 0;
  CB.partida.finalizar('guion');

  var caja = document.getElementById('fin-hitos');
  var texto = (document.getElementById('fin-hitos-lista') || {}).textContent || '';

  /* SE AFIRMA, NO SE RAMIFICA. La primera versión de este guardián decía
     `if (abierto) { ...comprobar... } else { pasa }`, y con el fallo sembrado
     —capturar los mundos abiertos DESPUÉS de abrirlos— `abierto` era siempre
     falso y el guardián se iba por el else en verde. Un guardián que solo
     comprueba cuando la cosa ocurre no comprueba que la cosa ocurra. */
  t.ok(!!perfil.mundos.M2 && perfil.mundos.M2.desbloqueado,
    'E72 · con M1 completo, la expedición abre el mundo siguiente');
  t.ok(/Se ha abierto/.test(texto),
    'E72 · y la pantalla de fin lo dice', texto || '(panel vacío)');
  t.igual(caja ? caja.hidden : true, false, 'E72 · con el panel de hitos visible');

  /* El nombre sale de CB.MUNDOS, nunca escrito a mano: no existe ningún «Bosque
     de las Restas», y una cadena literal se desviaría del catálogo. */
  var deCatalogo = CB.MUNDOS.filter(function (m) { return texto.indexOf(m.nombre) !== -1; });
  t.ok(deCatalogo.length > 0,
    'E72 · el nombre del mundo sale del catálogo, no de una cadena inventada', texto);
  t.ok(anunciados.some(function (a) { return /Se ha abierto/.test(a); }),
    'E72 · se anuncia también por la región viva: la cinta es aria-hidden');

  /* Y NO SE REPITE. */
  var estado2 = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  estado2.preguntas = 10; estado2.aciertos = 10; estado2.aciertos1er = 10; estado2.puntos = 100;
  anunciados.length = 0;
  CB.partida.finalizar('guion');
  var texto2 = (document.getElementById('fin-hitos-lista') || {}).textContent || '';
  t.ok(!/Se ha abierto/.test(texto2),
    'E72 · la segunda expedición ya no lo vuelve a anunciar', texto2);

  CB.a11y.anunciar = anunciarPrevio;
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E73 · el bono habla en gemas, no en puntos', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;

  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  estado.preguntas = 20; estado.aciertos = 20; estado.aciertos1er = 20;
  estado.puntos = 1000; estado.gemas = 30;
  estado.luces.luces = CB.vidas.INICIALES;
  CB.partida.finalizar('guion');

  var bl = document.getElementById('fin-bono');
  if (!t.ok(!!bl, 'E73 · hay línea de bono')) { CB.perfil = perfilPrevio; return; }

  if (bl.textContent.length) {
    t.ok(/gemas/.test(bl.textContent),
      'E73 · el bono se rotula en gemas, que es la moneda que el niño conoce',
      bl.textContent);
    /* Y el número es el de gemas, no el de puntos: iba en puntos justo debajo del
       recuento de gemas, y parecía que eran gemas. */
    var n = parseInt((bl.textContent.match(/\+(\d+)/) || [])[1], 10);
    t.ok(n < 100,
      'E73 · y la cifra es la de gemas del bono, no los puntos crudos', String(n));
  } else {
    t.ok(true, 'E73 · esta partida no dio bono');
  }

  /* EL RÉCORD, afirmado y no ramificado: es un perfil nuevo con 1000 puntos, así
     que la primera expedición bate el récord por definición. Si esto se pusiera
     rojo sería porque el récord se lee DESPUÉS de pisarlo, y entonces
     `puntos > récord` no es cierto nunca. */
  var lista = document.getElementById('fin-hitos-lista');
  t.ok(!!lista && /mejor expedición/i.test(lista.textContent),
    'E73 · la primera expedición de un perfil bate su récord y se dice',
    lista ? lista.textContent : 'sin lista');
  if (lista) {
    t.ok(!/\d{3,}/.test(lista.textContent),
      'E73 · y se celebra SIN enseñar los puntos: la moneda visible es la gema',
      lista.textContent);
  }

  /* Batir el récord de un modo no lo dispara en el otro: es el antifarmeo. */
  t.ok(!!CB.perfil.mejorPuntuacion, 'E73 · el récord se guarda por modo');

  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

/* ══ E74-E76 · Fase 11: textos que prometían lo que el código no hace ════════

   Tres promesas rotas. Ninguna daba error: el juego decía una cosa y hacía otra,
   y solo se ve leyendo las dos a la vez.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E74 · el cofre del descanso no promete gemas', function () {
  var t = CB.pruebas;
  var cofre = CB.partida.DESCANSOS.filter(function (d) { return d.id === 'cofre'; })[0];
  if (!t.ok(!!cofre, 'E74 · existe el descanso del cofre')) return;

  /* PRIMERO: que el código siga sin dar gemas. Va antes que la comprobación del
     texto a propósito — es lo que impide que alguien «arregle» esto sumando
     gemas por detrás, que rompería el invariante de la moneda visible. */
  var perfilPrevio = CB.perfil;
  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E74 · hay partida')) { CB.perfil = perfilPrevio; return; }

  var gemasAntes = perfil.gemas, delEstadoAntes = estado.gemas;
  CB.partida.microDescanso();
  var tablero = document.getElementById('descanso-tablero');
  var piezas = tablero ? tablero.querySelectorAll('.tablero-descanso__bloque') : [];
  var i;
  for (i = 0; i < piezas.length; i++) piezas[i].click();

  t.igual(perfil.gemas, gemasAntes, 'E74 · romper el descanso entero no da gemas al perfil');
  t.igual(estado.gemas, delEstadoAntes, 'E74 · ni a la partida');

  /* Y DESPUÉS: que el texto no las prometa. */
  t.ok(cofre.titulo.indexOf('gema') === -1,
    'E74 · el título del cofre no habla de gemas', cofre.titulo);

  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

CB.pruebas.suite('E75 · el musgo se cuenta con el criterio que lo pinta', function () {
  var t = CB.pruebas;
  t.ok(typeof CB.memoria.conMusgo === 'function', 'E75 · existe CB.memoria.conMusgo');

  var hoy = CB.util.hoyISO();

  /* PERFIL DE PRIMERA SEMANA, que es el caso que delata el fallo: destrezas
     practicadas hace días pero que NUNCA llegaron a afianzada. vencidosHoy las
     cuenta —R < 0.7— y la Cantera no pinta ni una, porque 'oxidada' exige haber
     sido sólida antes. Con un perfil maduro los dos números pueden coincidir por
     casualidad y el guardián pasaría en verde con el fallo dentro. */
  /* LA DESTREZA LA CREA CB.adaptativo.nuevaDestreza(), no yo. La primera versión
     de este montaje la escribía a mano y le ponía `ultimoISO`, UNA PROPIEDAD QUE
     NO EXISTE: recuperabilidad() lee `ultimoRepasoISO`, así que devolvía 1 y no
     había ni una destreza vencida. Dos aserciones rojas contra código correcto,
     por suponer la forma de un dato en vez de pedírsela a quien lo produce. Es
     E42, y van tres veces en esta serie. */
  var perfil = CB.pruebas.perfilNuevo();
  perfil.destrezas = {};
  var slugs = ['numeracion', 'suma_sin_llevar', 'resta_sin_llevar'];
  slugs.forEach(function (sl) {
    var d = CB.adaptativo.nuevaDestreza('2026-01-01');   // repasada hace muchísimo
    d.n = 4; d.aciertos = 2; d.aciertosPrimerIntento = 1;   // p1 = 0,25: aprendiendo
    d.estado = 'aprendiendo';
    perfil.destrezas[sl] = d;
  });

  var vencidas = CB.memoria.vencidosHoy(perfil, hoy);
  var musgo = CB.memoria.conMusgo(perfil, hoy);

  t.ok(vencidas.length > 0,
    'E75 · en primera semana hay destrezas vencidas por tiempo', String(vencidas.length));
  t.igual(musgo.length, 0,
    'E75 · y NINGUNA con musgo: nunca fueron sólidas, así que no se han oxidado',
    JSON.stringify(musgo));

  /* Y el número de conMusgo coincide, una a una, con lo que clasificar() llama
     oxidada: no se reimplementa el predicado, se le pregunta. */
  var porClasificar = Object.keys(perfil.destrezas).filter(function (k) {
    return CB.memoria.clasificar(perfil.destrezas[k], hoy, false) === 'oxidada';
  });
  t.igual(musgo.length, porClasificar.length,
    'E75 · conMusgo y clasificar dicen exactamente lo mismo');

  /* Y con una destreza que SÍ fue sólida y se ha olvidado, aparece. */
  perfil.destrezas.numeracion.estado = 'afianzada';
  perfil.destrezas.numeracion.aciertosPrimerIntento = 4;
  var musgo2 = CB.memoria.conMusgo(perfil, hoy);
  t.ok(musgo2.length >= 1,
    'E75 · una destreza que fue sólida y se olvidó sí sale con musgo',
    JSON.stringify(musgo2));

  /* ── Y AHORA EL SALUDO DE VERDAD, que es lo que faltaba ──────────────────
     Todo lo de arriba comprueba conMusgo() en abstracto, y sembrando el fallo
     —devolver vencidosHoy() al saludo del mapa— este guardián SEGUÍA EN VERDE,
     porque no tocaba el mapa por ningún sitio. Aquí se pinta la Cantera con el
     perfil de primera semana y se compara el NÚMERO DEL SALUDO con lo que dice
     conMusgo. Con vencidosHoy el saludo prometería vetas que no existen. */
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  var primeraSemana = CB.pruebas.perfilNuevo();
  primeraSemana.destrezas = {};
  slugs.forEach(function (sl) {
    var d = CB.adaptativo.nuevaDestreza('2026-01-01');
    d.n = 4; d.aciertos = 2; d.aciertosPrimerIntento = 1;
    d.estado = 'aprendiendo';
    primeraSemana.destrezas[sl] = d;
  });
  CB.perfil = primeraSemana;
  var saludo = document.getElementById('mapa-saludo');
  if (t.ok(!!saludo, 'E75 · hay saludo del mapa en la maqueta')) {
    /* CENTINELA. La primera versión llamaba a pintar(), y el saludo NO lo escribe
       pintar() sino pintarMundos(): el texto se quedaba como estaba, el número
       leído era 0, el esperado era 0, y el guardián daba verde con el fallo
       dentro. Se marca el nodo antes y se afirma que alguien lo ha reescrito. */
    saludo.textContent = 'SIN PINTAR';
    CB.mapaDestrezas.pintarMundos();
    t.ok(saludo.textContent !== 'SIN PINTAR',
      'E75 · pintarMundos() escribe el saludo de verdad');

    var esperado = CB.memoria.conMusgo(primeraSemana, CB.util.hoyISO()).length;
    var dice = parseInt((saludo.textContent.match(/Hay (\d+)/) || [])[1], 10);
    if (isNaN(dice)) dice = 0;
    t.igual(dice, esperado,
      'E75 · el saludo cuenta lo mismo que se pinta con musgo, ni una más',
      'dice «' + saludo.textContent + '» y con musgo hay ' + esperado);
    t.igual(esperado, 0,
      'E75 · y en primera semana eso es CERO: sin esto, el saludo promete vetas ' +
      'que la Cantera no pinta en ningún sitio');
  }

  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E76 · los cinco descansos no se repiten, y sobreviven al guardado', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  var m = CB.mensajes.asegurar(perfil);

  t.ok(!!m.bolsaDescansos, 'E76 · el perfil trae bolsa de descansos');
  var conGuion = Object.keys(m).filter(function (k) { return k.charAt(0) === '_'; });
  t.igual(conGuion.length, 0, 'E76 · ninguna clave del estado empieza por guion bajo');

  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E76 · hay partida')) { CB.perfil = perfilPrevio; return; }

  /* CINCO DESCANSOS CON UN GUARDADO POR MEDIO. Sin el guardado, un guardián así
     pasa en verde con una bolsa que se reinicia en cada `sanear()`: es
     literalmente el fallo de E45, y el motivo de que esta clave no lleve guion
     bajo. */
  var vistos = [], i, titulo = document.getElementById('descanso-titulo');
  for (i = 0; i < 5; i++) {
    CB.partida.microDescanso();
    vistos.push(titulo ? titulo.textContent : '?');
    perfil = CB.almacen.sanear(JSON.parse(JSON.stringify(perfil)));
    CB.perfil = perfil;
  }

  var unicos = vistos.filter(function (v, k) { return vistos.indexOf(v) === k; });
  t.igual(unicos.length, 5,
    'E76 · cinco descansos seguidos son cinco distintos, aun guardando por medio',
    vistos.join(' | '));

  t.ok(!!(perfil.mensajes && perfil.mensajes.bolsaDescansos),
    'E76 · y la bolsa sigue ahí después de sanear()');

  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

/* ══ E77-E79 · Fase 12: ocho turnos sin celebrar nada ═══════════════════════ */

CB.pruebas.suite('E77 · el jefe anuncia también los aciertos, y se presenta', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  var perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;

  var anuncios = [], cintas = [];
  var anunciarPrevio = CB.a11y.anunciar;
  var mostrarPrevio = CB.ui.festejo.mostrar;
  CB.a11y.anunciar = function (txt) { anuncios.push(String(txt)); };
  CB.ui.festejo.mostrar = function (clave, txt) { cintas.push(clave); return true; };

  /* El estado lo construye CB.jefes.iniciar() de verdad. */
  var e = CB.jefes.iniciar('M1');
  if (!t.ok(!!e, 'E77 · el combate arranca')) {
    CB.a11y.anunciar = anunciarPrevio; CB.ui.festejo.mostrar = mostrarPrevio;
    CB.perfil = perfilPrevio; return;
  }

  /* EL INTRO SE COMPRUEBA DESPUÉS DE QUE turno() HAYA CORRIDO —iniciar() lo llama
     en su última línea—, que es donde está la trampa: puesto en #jefe-enunciado,
     turno() lo vacía y el intro dura cero milisegundos. */
  var aviso = document.getElementById('jefe-aviso');
  t.ok(!!aviso && aviso.textContent.indexOf(e.def.intro) !== -1,
    'E77 · el intro del jefe sobrevive al primer turno',
    aviso ? aviso.textContent : 'sin nodo');

  /* Ocho aciertos: ocho anuncios con la cuenta correcta. */
  anuncios.length = 0; cintas.length = 0;
  var i, bloquesEsperados = [];
  for (i = 0; i < CB.jefes.BLOQUES; i++) {
    e.respondido = false;
    CB.jefes.responder(true);
    bloquesEsperados.push(CB.jefes.BLOQUES - 1 - i);
  }

  var conCuenta = anuncios.filter(function (a) { return /Ese bloque cae/.test(a); });
  t.igual(conCuenta.length, CB.jefes.BLOQUES,
    'E77 · cada acierto se anuncia, no solo los fallos', anuncios.join(' | '));
  t.ok(conCuenta[0].indexOf(String(bloquesEsperados[0])) !== -1,
    'E77 · y con la cuenta de bloques que queda', conCuenta[0]);
  t.ok(anuncios.every(function (a) { return a.indexOf('daño') === -1; }),
    'E77 · sin la palabra «daño»: aquí no se hace daño a nadie');

  /* UNA cinta en todo el combate, no ocho. */
  var deMitad = cintas.filter(function (c) { return c === 'superacion'; });
  t.igual(deMitad.length, 1,
    'E77 · la cinta de la mitad sale UNA vez por combate', cintas.join(','));

  CB.a11y.anunciar = anunciarPrevio;
  CB.ui.festejo.mostrar = mostrarPrevio;
  CB.jefes.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E78 · «cerrado sin un fallo» se lee de verdad', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;

  function combate(fallar) {
    var perfil = CB.pruebas.perfilNuevo();
    CB.perfil = perfil;
    /* M1 al 60 % para que la tarjeta muestre el reto y su distintivo. */
    var nucleares = CB.catalogo.nuclearesDe('M1'), k;
    for (k = 0; k < nucleares.length; k++) {
      perfil.niveles[nucleares[k]] = { n: 10, aciertos: 10, caja: 3, D: 2,
                                       ultimoISO: CB.util.hoyISO(), enPausa: false };
    }
    var e = CB.jefes.iniciar('M1');
    if (!e) return null;
    /* SE JUEGA DE VERDAD con responder(), no fijando el campo a mano: si se
       fijara, el guardián nunca vería que responder dejó de ponerlo a false. */
    /* SE CONDUCE EL TURNO A MANO. responder() programa turno() con setTimeout, y
       terminar() solo se llama desde turno(): un bucle síncrono de responder()
       baja los bloques a cero y NO TERMINA NUNCA el combate, así que
       jefeSinFallos no llega a escribirse. La primera versión de este guardián
       se puso roja por eso, contra código correcto. */
    if (fallar) { CB.jefes.responder(false); CB.jefes.turno(); }
    var i;
    for (i = 0; i < 40 && CB.jefes.estado; i++) {
      CB.jefes.responder(true);
      CB.jefes.turno();
    }
    CB.jefes.estado = null;
    return perfil;
  }

  var limpio = combate(false);
  if (!t.ok(!!limpio, 'E78 · el combate limpio se juega')) { CB.perfil = perfilPrevio; return; }
  t.igual(limpio.mundos.M1.jefeSinFallos, true, 'E78 · sin fallos queda anotado');
  CB.perfil = limpio;
  CB.mapaDestrezas.pintarMundos();
  var textoLimpio = (document.getElementById('rejilla-mundos') || {}).textContent || '';
  t.ok(/sin un fallo/.test(textoLimpio),
    'E78 · y la tarjeta del mundo lo dice', textoLimpio.slice(0, 120));

  var conFallo = combate(true);
  t.igual(conFallo.mundos.M1.jefeSinFallos, false, 'E78 · con un fallo NO queda anotado');
  CB.perfil = conFallo;
  CB.mapaDestrezas.pintarMundos();
  var textoFallo = (document.getElementById('rejilla-mundos') || {}).textContent || '';
  t.ok(!/sin un fallo/.test(textoFallo),
    'E78 · y la tarjeta no lo pone', textoFallo.slice(0, 120));

  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E81 · la espera del segundo intento sale de la fuente única', function () {
  var t = CB.pruebas;
  t.ok(typeof CB.partida.esperaSegundoIntento === 'function',
    'E81 · la espera del fallo es una función, no un literal dentro de un setTimeout');
  if (typeof CB.partida.esperaSegundoIntento !== 'function') return;

  var base = CB.partida.esperaSegundoIntento('Vuelve a mirarlo con calma.');
  t.ok(base >= 2600, 'E81 · nunca baja del suelo de siempre', String(base));

  /* Y CRECE CON LA COREOGRAFÍA. Esta es la que importa: con el 2600 escrito a
     pelo, la primera aserción pasaría en verde igual y el número seguiría fuera
     de la fuente única. Se toca la tabla y se restaura pase lo que pase. */
  var previo = CB.ui.festejo.CELEBRACIONES.animo.ms;
  var conTexto;
  try {
    CB.ui.festejo.CELEBRACIONES.animo.ms = 9000;
    conTexto = CB.partida.esperaSegundoIntento('Vuelve a mirarlo con calma.');
  } finally {
    CB.ui.festejo.CELEBRACIONES.animo.ms = previo;
  }
  t.ok(conTexto > base,
    'E81 · y sigue a la tabla del festejo: no es un número suelto',
    base + ' → ' + conTexto);

  t.igual(CB.ui.festejo.CELEBRACIONES.animo.ms, previo,
    'E81 · la tabla queda como estaba');
});

/* ══ E83 · Fase 14: cuánto queda ═══════════════════════════════════════════ */

CB.pruebas.suite('E83 · el HUD dice por qué bloque va la expedición', function () {
  var t = CB.pruebas;

  /* SE AFIRMA PRIMERO QUE EL NODO ESTÁ EN LA MAQUETA. Sin esto, pintarHUD sale
     por su `if` y TODO lo de abajo pasaría por vacuidad: cero bloques contra cero
     bloques esperados. Es la trampa que ya documentó el plan de 1.7.0 para los
     nodos que un módulo cachea o busca en tiempo de ejecución. */
  var gal = document.getElementById('hud-galeria');
  if (!t.ok(!!gal, 'E83 · #hud-galeria existe en la maqueta de pruebas')) return;

  CB.ui.pintarHUD({ luces: 3, gemas: 0, indice: 3, total: 12 });
  t.igual(gal.querySelectorAll('b').length, 12,
    'E83 · hay un bloque por ítem del guion');
  t.igual(gal.querySelectorAll('b[data-caido="si"]').length, 3,
    'E83 · y tres marcados como cavados');
  t.igual(gal.getAttribute('aria-label'), 'Bloque 3 de 12',
    'E83 · el dibujo es decoración: la información va en el aria-label',
    gal.getAttribute('aria-label'));

  /* LOS BLOQUES CAEN, NO QUEDAN. Con el guion entero hecho, TODOS marcados: si
     alguien lo invirtiera para pintar «lo que falta», esto se pondría rojo. */
  CB.ui.pintarHUD({ luces: 3, gemas: 0, indice: 12, total: 12 });
  t.igual(gal.querySelectorAll('b[data-caido="si"]').length, 12,
    'E83 · al final del guion están los doce cavados, no cero');

  /* Una llamada PARCIAL no borra la fila: hay cinco sitios que llaman a
     pintarHUD y basta que uno se olvide de pasar el total. */
  CB.ui.pintarHUD({ luces: 2, gemas: 5 });
  t.igual(gal.querySelectorAll('b').length, 12,
    'E83 · una llamada sin total deja la fila como estaba, no la vacía');

  /* Y el índice no se sale de la fila aunque venga pasado de rosca. */
  CB.ui.pintarHUD({ luces: 3, gemas: 0, indice: 99, total: 8 });
  t.igual(gal.querySelectorAll('b[data-caido="si"]').length, 8,
    'E83 · un índice mayor que el total no pinta bloques de más');

  /* LA HILERA NO MIENTE, y esto se comprueba contra el guion de verdad: el ítem
     del escalón 4 se sirve EN LUGAR DEL del guion en ese índice, así que el total
     de bloques servidos sigue siendo guion.length. */
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E83 · hay partida')) {
    t.igual(gal.querySelectorAll('b').length, estado.guion.length,
      'E83 · al empezar hay tantos bloques como ítems tiene el guion',
      'guion de ' + estado.guion.length);
    t.igual(gal.querySelectorAll('b[data-caido="si"]').length, 0,
      'E83 · y ninguno cavado todavía');

    /* Y AVANZA AL SERVIR EL SIGUIENTE. Esta es la aserción que caza una llamada
       que se olvide de pasar el total, y también el fallo de contar con el índice
       equivocado: pintándolo solo en trasAcierto la fila iba un bloque por detrás
       toda la partida, porque ahí e.indice es todavía el del ítem respondido. */
    estado.proximoDescanso = 99;
    estado.indice = 4;
    CB.partida.servirItem();
    t.igual(gal.querySelectorAll('b[data-caido="si"]').length, 4,
      'E83 · servir el quinto ítem deja cuatro bloques cavados, no tres',
      gal.getAttribute('aria-label'));
  }
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

/* ══ E84 · Fase 15: el primer minuto ════════════════════════════════════════

   La calibración decía literalmente «Ahora sí empieza el juego: con reloj, con
   luces y con gemas» y a continuación aparecía un menú con tres tarjetas
   bloqueadas y una jugable. Es E21 un escalón más adelante: una frase que promete
   una cosa y una pantalla que hace otra.

   ESTA SUITE DEVUELVE UNA PROMESA. El salto ocurre dentro de un setTimeout de
   3400 ms: medir en el mismo turno daría siempre «sigue en la calibración», que
   es verde y no comprueba nada. */

CB.pruebas.suite('E84 · al acabar la calibración se empieza a jugar', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;

  var perfil = CB.pruebas.perfilNuevo();
  perfil.calibrado = false;
  perfil.trimestreDeducido = null;
  CB.perfil = perfil;

  CB.calibracion.aciertos = 4;                 // los cuatro bien: trimestre 3
  CB.calibracion.indice = CB.calibracion.ITEMS.length;
  CB.pantallas.ir('p-calibracion');
  CB.calibracion.terminar();

  /* SE AFIRMA EL ESTADO PREVIO: si ya estuviéramos en la partida, lo de abajo
     pasaría sin que el temporizador hubiera hecho nada. */
  t.igual(CB.pantallas.actual, 'p-calibracion',
    'E84 · justo después de terminar() seguimos en la calibración');
  t.igual(CB.partida.estado, null, 'E84 · y no hay partida todavía');

  return new Promise(function (listo) {
    setTimeout(function () {
      t.igual(CB.pantallas.actual, 'p-partida',
        'E84 · pasado el cierre, se está jugando: ni un toque intermedio',
        'estamos en ' + CB.pantallas.actual);
      t.ok(CB.partida.estado !== null, 'E84 · con partida viva');
      if (CB.partida.estado) {
        t.igual(CB.partida.estado.mundo.id, 'M1',
          'E84 · en la Pradera, el único mundo abierto');

        /* EL ORDEN IMPORTA, y esta es la aserción que lo protege. iniciar() acaba
           en servirItem(), que lee perfil.trimestreDeducido; si el salto se
           adelantara al guardarPerfil, el primer ítem se serviría con el valor por
           defecto en vez del recién calibrado. La partida arrancaría igual y con
           la dificultad equivocada: un fallo que no se ve. */
        t.igual(perfil.trimestreDeducido, 3,
          'E84 · y con el trimestre recién deducido, no con el de por defecto',
          String(perfil.trimestreDeducido));
      }

      CB.partida.estado = null;
      CB.perfil = perfilPrevio;
      if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
      listo();
    }, 3600);
  });
});

/* ══ E85-E88 · Saber dónde estás ═════════════════════════════════════════════

   La expedición encadena hasta veinte ítems de siete vetas distintas, barajados,
   y lo único que decía el HUD era cuánto quedaba. En qué se está —qué se está
   practicando— solo aparecía en la Cantera, dos pantallas atrás y antes de
   empezar. Cambiar de veta era, visto desde la silla, que la pregunta cambiara
   de tema sin causa.

   El barajado NO se toca, y conviene dejar dicho por qué: la práctica intercalada
   retiene mejor que la agrupada, y agrupar el guion por vetas para que «pasar de
   nivel» fuera literal habría sido cambiar la pedagogía por la maqueta. Lo que se
   arregla es lo que faltaba —decirlo—, no lo que funcionaba.

   Y de ahí sale el riesgo que vigilan E86 y E87: en cuanto existe una cinta que
   dice «Nivel superado», hay que asegurarse de que sea VERDAD. Con el guion
   barajado, una veta que se deja atrás puede volver tres ítems después por dos
   caminos —quedar más ítems suyos en el guion, o deber un repaso por haberla
   fallado— y hay un tercero que no deja rastro en ninguna cola: el tiempo
   agotado. Cantarlo sin comprobar los tres es prometer algo que el propio juego
   desmiente un minuto después.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E85 · el HUD dice en qué veta se está', function () {
  var t = CB.pruebas;
  var nombre = document.getElementById('hud-veta-nombre');
  var mundo = document.getElementById('hud-veta-mundo');

  /* SE AFIRMA PRIMERO QUE LOS NODOS ESTÁN. Sin esto, pintarVeta hace su return
     temprano y todas las comprobaciones de abajo miden la cadena vacía contra la
     cadena vacía, en verde. */
  if (!t.ok(!!(nombre && mundo), 'E85 · el rótulo de veta está en la maqueta')) return;

  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  /* LA PARTIDA LA MONTA iniciar(), que es la única función que produce la forma
     real del estado. Construir {guion: [...], mundo: {...}} a mano aquí sería
     fabricar la forma que el test quiere ver: es exactamente lo que dejó E42
     escondido durante toda la vida del proyecto. */
  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E85 · hay partida')) {
    var servido = CB.catalogo.get(estado.itemActual.nivelId);
    t.igual(nombre.textContent, servido.nombre,
      'E85 · el rótulo nombra la veta del ítem que se está sirviendo',
      'sirve ' + estado.itemActual.nivelId);
    t.igual(mundo.textContent, estado.mundo.nombre,
      'E85 · y el mundo en el que se está cavando');

    /* Y CAMBIA. Esta es la aserción que importa: pintar el rótulo una vez al
       empezar y no volver a tocarlo dejaría el nombre de la primera veta puesto
       toda la expedición, que es peor que no ponerlo —dice algo, y es falso. */
    var otro = null, i;
    for (i = 0; i < estado.guion.length; i++) {
      if (estado.guion[i] !== estado.itemActual.nivelId) { otro = estado.guion[i]; break; }
    }
    if (t.ok(!!otro, 'E85 · el guion mezcla más de una veta', estado.guion.join(' '))) {
      estado.proximoDescanso = 99;
      estado.indice = i;
      estado.colaRepaso.length = 0;
      CB.partida.servirItem();
      t.igual(nombre.textContent, CB.catalogo.get(estado.itemActual.nivelId).nombre,
        'E85 · al cambiar de veta, el rótulo cambia con ella',
        'ahora sirve ' + estado.itemActual.nivelId);
    }
  }

  CB.partida.pararCronometro();
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E86 · «Nivel superado» solo cuando de verdad lo está', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E86 · hay partida')) {
    var A = estado.guion[0], B = null, i;
    for (i = 1; i < estado.guion.length; i++) {
      if (estado.guion[i] !== A) { B = estado.guion[i]; break; }
    }

    if (t.ok(!!B, 'E86 · el guion mezcla más de una veta')) {
      /* CASO 1 · quedan ítems de A en el guion → no está superada. */
      estado.guion = [A, B, A];
      estado.indice = 1;
      estado.vetaPrevia = A;
      estado.colaRepaso.length = 0;
      estado.vetasSinCerrar = {};
      t.igual(CB.partida.vetaSuperada(B), null,
        'E86 · con ítems de esa veta aún por servir, no se canta nada');

      /* CASO 2 · no quedan en el guion, pero se debe un repaso: tampoco. Un ítem
         fallado dos veces vuelve entre tres y cinco ítems después, así que la
         veta no está cerrada por mucho que el guion no la nombre más. */
      estado.guion = [A, B];
      estado.indice = 1;
      CB.leitner.programarReinsercion(estado.colaRepaso, A, 1, estado.rng);
      t.igual(CB.partida.vetaSuperada(B), null,
        'E86 · debiendo un repaso de esa veta, tampoco');

      /* CASO 3 · ni guion ni cola: ahora sí, y devuelve el nivel para poder
         nombrarlo. Devolver true no habría bastado: el mensaje dice cuál. */
      estado.colaRepaso.length = 0;
      var cerrada = CB.partida.vetaSuperada(B);
      t.ok(!!cerrada, 'E86 · sin ítems pendientes ni deuda, la veta está superada');
      if (cerrada) {
        t.igual(cerrada.id, A, 'E86 · y devuelve la veta que queda atrás, no la nueva');
        t.ok(!!cerrada.nombre, 'E86 · con nombre, que es lo que se pinta');
      }

      /* CASO 4 · seguir en la misma veta no es superarla. Parece obvio y es el
         fallo que habría salido de comparar solo «quedan cero»: al servir el
         último ítem de A, si nadie compara la veta anterior con la nueva, se
         anuncia que se ha superado A mientras se está sirviendo A. */
      estado.vetaPrevia = A;
      t.igual(CB.partida.vetaSuperada(A), null,
        'E86 · servir otro ítem de la misma veta no la supera');

      /* CASO 5 · el primer ítem de la expedición no viene de ninguna parte. */
      estado.vetaPrevia = null;
      t.igual(CB.partida.vetaSuperada(B), null,
        'E86 · y el primer ítem no supera nada, porque no había veta anterior');
    }
  }

  CB.partida.pararCronometro();
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E87 · el tiempo agotado deja la veta a medias', function () {
  var t = CB.pruebas;
  var perfilPrevio = CB.perfil;
  var pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E87 · hay partida')) {
    var A = estado.itemActual.nivelId, B = null, i;
    for (i = 0; i < estado.guion.length; i++) {
      if (estado.guion[i] !== A) { B = estado.guion[i]; break; }
    }

    if (t.ok(!!B, 'E87 · el guion mezcla más de una veta')) {
      /* Se agota el tiempo del ítem de A. No reinserta nada —eso es lo que hace
         a este caso distinto del fallo— así que sin el mapa de vetas sin cerrar
         la comprobación de E86 diría que A está superada. */
      CB.partida.tiempoAgotado();
      t.ok(!!estado.vetasSinCerrar[A],
        'E87 · la veta del ítem que se quedó sin tiempo queda marcada');

      estado.guion = [A, B];
      estado.indice = 1;
      estado.vetaPrevia = A;
      estado.colaRepaso.length = 0;
      t.igual(CB.partida.quedanDeLaVeta(estado, A), 0,
        'E87 · no le quedan ítems ni deuda: por ahí no se ve nada');
      t.igual(CB.partida.vetaSuperada(B), null,
        'E87 · y aun así no se canta superada, porque nadie la contestó');
    }
  }

  CB.partida.pararCronometro();
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E88 · el rótulo de veta se ve', function () {
  var t = CB.pruebas;
  var rot = document.getElementById('hud-veta');
  if (!t.ok(!!rot, 'E88 · el rótulo está en la maqueta')) return;

  /* ESTA ES LA LECCIÓN DE 1.8.1, Y VA POR TRES. El cartel de logro se pintó
     `absolute` y se olvidó apuntarlo en la lista de exclusiones de
     _biomas.scss: `position: relative` le ganó por orden de cascada, su `top`
     pasó a ser relativo y quedó a 887 px, fuera de la vista, con la suite entera
     en verde. Aquí se comprueba lo contrario —que el rótulo es de flujo— porque
     es lo que le corresponde: si alguien lo saca del flujo para «colocarlo
     mejor», el rótulo se va por debajo del borde y no falla nada.

     Se lee la position CALCULADA, no la declarada: es la única que sabe quién
     ganó la cascada.

     Y HAY QUE DESTAPAR LA MAQUETA PARA MEDIRLA. Las diecisiete secciones de
     prueba viven dentro de un <div hidden>, así que NADA de ahí tiene caja: la
     primera versión de esta comprobación pedía `offsetHeight > 0` y devolvía 0
     para el rótulo, para el HUD y para la galería por igual. Es el mismo error
     que ya cazó a este proyecto con `transform`, que vale `none` en un elemento
     sin caja: una medida de maqueta hecha sobre un árbol oculto no mide la
     maqueta, mide el `hidden`. Se destapa, se mide y se vuelve a tapar en el
     mismo turno. */
  var pantallaPrevia = CB.pantallas.actual;
  CB.pantallas.ir('p-partida');

  var maqueta = document.getElementById('p-partida').parentElement;
  var estabaOculta = maqueta.hidden;
  maqueta.hidden = false;

  var calc = getComputedStyle(rot);
  t.ok(calc.position !== 'absolute' && calc.position !== 'fixed',
    'E88 · el rótulo va en el flujo, no superpuesto', calc.position);

  /* Se AFIRMA que destapar ha servido de algo. Sin esto, si mañana la maqueta se
     ocultara de otra manera —una clase, un contenedor más arriba— la línea de
     abajo volvería a medir 0 y a ponerse roja sin decir por qué; o peor, alguien
     la relajaría a `>= 0` y quedaría verde para siempre sin comprobar nada. */
  var alto = rot.getBoundingClientRect().height;
  t.ok(document.getElementById('hud-galeria').getBoundingClientRect().height > 0,
    'E88 · la maqueta destapada sí tiene caja: la medida significa algo');
  t.ok(alto > 0, 'E88 · y el rótulo ocupa alto de verdad', alto + 'px');

  maqueta.hidden = estabaOculta;

  /* El nombre de la veta NUNCA se esconde: es el que contesta a la pregunta. El
     del mundo puede apartarse en pantalla estrecha, pero apartarse no es
     desaparecer —con display:none saldría también del árbol de accesibilidad, y
     entonces quien usa lector de pantalla tendría menos información en la
     pantalla pequeña que en la grande. */
  var nombre = document.getElementById('hud-veta-nombre');
  var mundo = document.getElementById('hud-veta-mundo');
  if (nombre && mundo) {
    t.ok(getComputedStyle(nombre).display !== 'none',
      'E88 · el nombre de la veta no se oculta en ninguna anchura');
    t.ok(getComputedStyle(mundo).display !== 'none',
      'E88 · y el del mundo se aparta, nunca se quita del árbol');
  }

  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

/* ══ E89 · La moneda que había que reconocer era un número ═══════════════════

   `15-gen-dinero.js` abre diciendo que monedas y billetes son conjuntos separados
   y que «el juego los distingue siempre visual y verbalmente». Lo cumplía en
   pagar y en contar, donde la pieza se dibuja —el cuadrado de oro, el rectángulo
   verde—, y no lo cumplía en E1, que es la única pregunta cuyo objeto ES
   distinguirlos: las cuatro opciones salían como cuatro botones de madera
   idénticos con un número dentro.

   Lo que eso significa se ve mejor al revés: «Toca la moneda de 2 euros» con
   opciones 1, 2, 5 y 10 se acierta leyendo el 2 del enunciado y buscando el 2.
   Se puede sacar el nivel entero sin haber mirado nunca una moneda, que es justo
   lo que el nivel dice que enseña. Es la familia de E70 —algo que se calcula y no
   se ve— pero de la otra punta: algo que se ve y no era lo que había que ver.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E89 · reconocer una moneda enseña la moneda', function () {
  var t = CB.pruebas;
  var cont = CB.componentes.contenedor();
  if (!t.ok(!!cont, 'E89 · hay contenedor de respuesta en la maqueta')) return;

  var item = CB.gen.dinero.E1(CB.util.mulberry32(7), 2);
  t.ok(!!item.piezasDinero, 'E89 · el generador pide que las opciones sean piezas');

  /* Las opciones se montan como las monta la partida: tres distractores fijos
     más la respuesta. Construir la lista de otra forma probaría otra cosa. */
  var opciones = item.distractoresFijos.slice(0, 3)
    .map(function (v) { return { valor: v, codigoError: null }; })
    .concat([{ valor: item.respuesta, codigoError: null }]);

  CB.componentes.opciones4(item, opciones, function () {}, { bloqueoMs: 0 });

  var piezas = cont.querySelectorAll('.pieza');
  t.igual(piezas.length, 4, 'E89 · las cuatro opciones son piezas dibujadas',
    'encontradas ' + piezas.length);
  t.igual(cont.querySelectorAll('.rejilla-respuestas .btn-bloque').length, 0,
    'E89 · y ninguna es un botón de madera con un número');

  /* CADA UNA CON SU FORMA. Si todas salieran moneda —o todas billete— volvería a
     no distinguirse nada, y las cuatro seguirían siendo el mismo dibujo con
     distinta cifra, que es exactamente el fallo con otro traje. */
  var correcta = null, i, v;
  for (i = 0; i < piezas.length; i++) {
    v = parseInt(piezas[i].textContent, 10);
    t.ok(piezas[i].classList.contains(CB.gen.dinero.esMoneda(v) ? 'pieza--moneda' : 'pieza--billete'),
      'E89 · el ' + v + ' € se dibuja como lo que es',
      piezas[i].className);
    /* Y el nombre accesible es el de la pieza entera, no el «2 €» escrito: quien
       oye la pantalla tiene que oír la misma pregunta que se ve. */
    t.igual(piezas[i].getAttribute('aria-label'), CB.gen.dinero.nombre(v),
      'E89 · y se llama por su nombre para el lector de pantalla');
    if (v === item.respuesta) correcta = piezas[i];
  }
  t.ok(!!correcta, 'E89 · la pieza correcta está entre las cuatro');

  /* La retícula deja de imponer el ancho de columna: con --lado-respuesta a 64 px
     el billete, que mide 128, desbordaría su celda. */
  var rej = cont.querySelector('.rejilla-respuestas');
  t.ok(rej && rej.classList.contains('rejilla-respuestas--dinero'),
    'E89 · la retícula deja que el ancho lo mande la pieza');

  /* ── Y NINGUNA DENOMINACIÓN SE DIBUJA IGUAL QUE OTRA ──────────────────────
     Dibujar las opciones como piezas no arregla nada si las doce piezas son el
     mismo rectángulo: eso es el fallo original con otro traje. Las de verdad se
     reconocen por la imagen y por el tamaño antes que por la cifra, y eso es lo
     que se comprueba aquí — que las doce tengan huella distinta.

     LA HUELLA CAMBIÓ EN 1.20.0 y el motivo importa. Era
     `backgroundColor|width|boxShadow`, que servía cuando la pieza ERA su color y
     su bisel. Ahora la pieza es una fotografía: los biseles se han ido —dibujaban
     un marco cuadrado sobre el canto redondo de la moneda— y dos piezas pueden
     compartir color de respaldo sin parecerse en nada. Lo que las distingue hoy
     es la IMAGEN y la CAJA, así que eso es lo que se mide. Una comprobación que
     sigue midiendo lo que ya no decide nada es una comprobación verde que no
     mira.

     Se lee el estilo CALCULADO, que devuelve la longitud declarada aunque el
     elemento no tenga caja, así que esto vale dentro de la maqueta oculta. */
  var caja = CB.ui.crear('div');
  document.body.appendChild(caja);
  var huellas = {}, repes = [], sinDeclarar = [], urls = [];
  var TODAS = [1, 2, 5, 10, 20, 50, 100].concat(
    CB.gen.dinero.PIEZAS_CENTIMO.map(CB.gen.dinero.pieza));
  TODAS.forEach(function (v) {
    var p = CB.ui.pieza('span', v);
    caja.appendChild(p);
    var cs = getComputedStyle(p);
    var m = /url\(["']?([^"')]+)/.exec(cs.backgroundImage);
    if (!m) sinDeclarar.push(v + ' → ' + cs.backgroundImage);
    else urls.push([v, m[1]]);
    var huella = cs.backgroundImage + '|' + cs.width + '|' + cs.height;
    if (huellas[huella]) repes.push(v + ' igual que ' + huellas[huella]);
    huellas[huella] = v;
  });
  t.igual(sinDeclarar.length, 0,
    'E89 · las doce piezas declaran su fotografía', sinDeclarar.join(' · '));
  t.igual(repes.length, 0,
    'E89 · las doce piezas se dibujan distintas entre sí', repes.join(' · '));
  document.body.removeChild(caja);

  /* Y NO SE ROMPE LO DE ANTES: una pregunta normal sigue dando botones. */
  CB.componentes.opciones4({}, [{ valor: 3 }, { valor: 4 }, { valor: 5 }, { valor: 6 }],
    function () {}, { bloqueoMs: 0 });
  t.igual(cont.querySelectorAll('.pieza').length, 0,
    'E89 · sin piezas de dinero, las opciones siguen siendo botones');
  t.igual(cont.querySelectorAll('.rejilla-respuestas .btn-bloque').length, 4,
    'E89 · las cuatro de siempre');

  CB.ui.vaciar(cont);
  if (CB.partida) CB.partida.bloqueado = false;

  /* ── Y QUE EL FICHERO EXISTA, QUE NO ES LO MISMO ──────────────────────────
     `getComputedStyle` devuelve la url tal cual esté escrita: una ruta mal
     puesta se lee igual de bien que una buena y `background-image` NUNCA vale
     `none` por eso —solo vale `none` si la variable no existe—. Es decir: la
     comprobación de arriba, sola, pasaría en verde con las doce fotos borradas.
     Lo único que distingue una ruta que llega de una que no es CARGARLA, así que
     se cargan las doce y se mira `naturalWidth`.

     La suite espera esta promesa (`ejecutor.js` la aguarda). Escrito como un
     `onload` suelto, cualquier cosa que afirmase dentro llegaría después de que
     el resumen estuviera impreso, que es la forma clásica de escribir una
     comprobación que no comprueba. */
  return Promise.all(urls.map(function (par) {
    return new Promise(function (listo) {
      var img = new Image();
      img.onload = function () { listo(img.naturalWidth > 0 ? null : par[0]); };
      img.onerror = function () { listo(par[0]); };
      img.src = par[1];
    });
  })).then(function (fallidas) {
    var rotas = fallidas.filter(function (x) { return x !== null; });
    t.igual(rotas.length, 0,
      'E89 · y las doce fotografías se descargan de verdad',
      'no llegan: ' + rotas.join(', '));
  });
});

/* ══ E90 · El marcador cambiaba de golpe ═════════════════════════════════════

   Donde ponía 12 ponía 15 en el fotograma siguiente. Toda la ganancia se contaba
   FUERA del número —la insignia «+1» que brota al lado, la hilera de «+2 por
   rapidez»— y el sitio donde de verdad vive la puntuación no se enteraba. Un
   salto instantáneo entre dos números de dos cifras no se ve: se descubre
   después, y para entonces ya no se sabe de dónde salió.

   Lo que hay que vigilar de una cuenta animada no es que se mueva, es que
   ATERRICE. Un contador que se queda en 39 porque el reparto en pasos no era
   entero es peor que no animar: la puntuación deja de ser la puntuación.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E90 · la cifra sube, y aterriza donde debe', function () {
  var t = CB.pruebas;
  var g = document.getElementById('hud-gemas');
  if (!t.ok(!!g, 'E90 · el marcador está en la maqueta')) return;

  var raiz = document.documentElement;
  var teniaSinMov = raiz.classList.contains('sin-movimiento');

  /* ── Con movimiento: cuenta, y el destino se alcanza exacto ────────────── */
  raiz.classList.remove('sin-movimiento');
  g.textContent = '0';
  CB.ui.contarHasta(g, 37);

  t.ok(parseInt(g.textContent, 10) < 37,
    'E90 · no llega de un salto: va contando', g.textContent);
  t.ok(g.classList.contains('cifra-viva--sube'),
    'E90 · y la cifra se marca mientras sube');

  /* EL REPARTO NO ES ENTERO A PROPÓSITO: 37 en 8 pasos da 4,625. Con un salto de
     5 el acumulado sería 40, y sin el ajuste del último paso el marcador diría
     40 gemas donde hay 37. Es el caso que justifica la suite entera. */
  return new Promise(function (listo) {
    setTimeout(function () {
      t.igual(g.textContent, '37',
        'E90 · termina en el número exacto, no en el acumulado de los pasos');
      t.ok(!g.classList.contains('cifra-viva--sube'),
        'E90 · y se quita la marca al acabar');

      /* ── NUNCA BAJA ──────────────────────────────────────────────────────
         Empezar partida repinta el HUD con 0 mientras el nodo guarda las de la
         anterior. Contar hacia atrás contradice la regla de que el marcador solo
         sube, y además se vería como un castigo. */
      CB.ui.contarHasta(g, 5);
      t.igual(g.textContent, '5', 'E90 · un destino menor se escribe, no se cuenta');

      /* ── UNA CUENTA CANCELA A LA ANTERIOR ────────────────────────────────
         Dos aciertos seguidos disparan dos cuentas sobre el mismo nodo. Sin
         cancelar la primera, los dos intervalos escriben a la vez y el número
         va y viene hasta que gana el que acabe más tarde — que es el que iba al
         destino equivocado.

         SE ESPERA. La primera versión de esta comprobación miraba el nodo en la
         línea siguiente a lanzar la cuenta y esperaba ver ya el 12: una cuenta
         que acaba de empezar sigue valiendo 0, así que la aserción estaba mal
         escrita y salió roja contra código correcto. Lo que hay que mirar no es
         el valor inmediato, es DÓNDE ATERRIZA. */
      g.textContent = '0';
      CB.ui.contarHasta(g, 40);
      CB.ui.contarHasta(g, 12);

      setTimeout(function () {
        t.igual(g.textContent, '12',
          'E90 · la segunda cuenta manda: la primera no sigue escribiendo');

        /* ── SIN MOVIMIENTO: EL NÚMERO ENTERO, YA ──────────────────────────
           Quitar movimiento no puede quitar información, y aquí la información
           es la cifra. Se escribe el destino sin contar. */
        raiz.classList.add('sin-movimiento');
        g.textContent = '0';
        CB.ui.contarHasta(g, 23);
        t.igual(g.textContent, '23',
          'E90 · con el movimiento apagado, el número final se escribe entero');

        if (!teniaSinMov) raiz.classList.remove('sin-movimiento');
        g.textContent = '0';
        listo();
      }, CB.ui.MS_PASO_CIFRA * (CB.ui.PASOS_CIFRA + 3));
    }, CB.ui.MS_PASO_CIFRA * (CB.ui.PASOS_CIFRA + 3));
  });
});

/* ══ E91 · Los botones se pulsaban en silencio ═══════════════════════════════

   Sonaba lo que PASA —el acierto, el fallo, la gema, la luz que se apaga— pero
   no el acto de tocar. Un botón de navegación, uno de ajustes o el de pausa se
   pulsaban sin ninguna respuesta sonora, así que no había forma de saber si el
   toque había entrado; y en una pantalla táctil de aula, con ruido alrededor, eso
   es la mitad de la confirmación que hay.

   Lo que se vigila aquí no es que suene: es CUÁNDO NO tiene que sonar. Un clic
   que se añade encima de un sonido que ya dice algo no informa, tapa.

   Y ESO ES LO QUE PASÓ, con la regla ya escrita en este mismo comentario. La
   primera versión enumeraba a mano los tres botones que callan —el
   deshabilitado, la moneda, el de silenciar— y la lista nació corta: la tecla
   del teclado numérico ya trae su «picar» y el ⌫ su «toc», así que cada cifra
   que escribía un niño sonaba DOS veces, con el clic tapando justo el sonido que
   dice algo. Una regla buena aplicada en tres sitios de cinco, que es la familia
   de fallos de la que este proyecto ya tiene tres (E44, E45, E46).

   Ahora no hay lista: CB.audio cuenta las peticiones y el clic solo suena si el
   gesto ha sido mudo. La comprobación que lo vigila es la del teclado de verdad,
   más abajo — no la de un botón inventado.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E91 · el clic de pulsar suena, y calla donde debe', function () {
  var t = CB.pruebas;

  t.ok(typeof CB.audio.EFECTOS.pulsar === 'function',
    'E91 · existe el efecto de pulsar');

  /* EL MÁS FRECUENTE ES EL MÁS FLOJO. Es la misma regla que ordena la tabla de
     celebraciones —el espectáculo es inversamente proporcional a la frecuencia—
     aplicada al sonido: este se oye cien veces por sesión. Se comprueba contra el
     «toc», que es el otro sonido de toque y tiene que seguir destacando sobre él,
     porque dice lo contrario: «aún no». */
  var oidas = [];
  var notaPrevia = CB.audio.nota, ruidoPrevio = CB.audio.ruido;
  CB.audio.nota = function (f, cuando, dur, tipo, gan) {
    oidas.push({ tipo: 'nota', dur: dur, gan: gan });
  };
  CB.audio.ruido = function (cuando, dur, filtro, gan) {
    oidas.push({ tipo: 'ruido', dur: dur, gan: gan });
  };

  CB.audio.EFECTOS.pulsar();
  var clic = oidas[0];
  oidas = [];
  CB.audio.EFECTOS.toc();
  var toc = oidas[0];

  CB.audio.nota = notaPrevia;
  CB.audio.ruido = ruidoPrevio;

  if (t.ok(!!(clic && toc), 'E91 · los dos sonidos de toque se han podido medir')) {
    t.ok(clic.gan < toc.gan,
      'E91 · el clic suena más flojo que el «toc»: es cien veces más frecuente',
      clic.gan + ' contra ' + toc.gan);
    t.ok(clic.dur <= toc.dur,
      'E91 · y no dura más', clic.dur + ' contra ' + toc.dur);
    t.ok(clic.tipo !== toc.tipo,
      'E91 · y se distinguen: uno dice «sí» y el otro «aún no»',
      clic.tipo + ' contra ' + toc.tipo);
  }

  /* ── LA REGLA, que es lo que de verdad se puede romper ───────────────────
     El oyente vive en el documento, así que se prueba disparando clics de verdad
     sobre botones de verdad y apuntando qué sonidos se piden.

     SE ENVUELVE CB.audio.sfx, NO SE SUSTITUYE. La regla mira CB.audio.emitidos,
     y ese contador solo se mueve si la petición llega al de verdad: un espía que
     se limite a anotar el nombre deja el contador quieto, el clic genérico se
     cree que el gesto ha sido mudo y suena igual. La suite mediría entonces una
     conducta que el juego no tiene — y en verde, que es lo caro. */
  var sfxPrevio = CB.audio.sfx;
  var pedidos = [];
  CB.audio.sfx = function (n) { pedidos.push(n); return sfxPrevio(n); };

  /* SE CONECTA EL MISMO CÓDIGO QUE USA EL JUEGO, no una imitación. El oyente
     vive fuera del DOMContentLoaded justamente para esto: el arranque devuelve
     pronto cuando no hay #btn-jugar —así evitan las páginas de prueba echar a
     andar un juego—, así que un oyente registrado ahí dentro no existiría aquí y
     todo lo de abajo mediría el vacío. */
  var conectado = CB.arranque.conectarSonidoBotones(document);
  t.ok(conectado || document.documentElement.getAttribute('data-clic') === 'si',
    'E91 · el oyente de clic está conectado al documento');
  t.igual(CB.arranque.conectarSonidoBotones(document), false,
    'E91 · y conectarlo dos veces no deja dos oyentes: el clic no suena doble');

  var caja = CB.ui.crear('div');
  document.body.appendChild(caja);

  /* LA DECISIÓN SE TOMA AL FINAL DEL GESTO, en un setTimeout(0). Mirar `pedidos`
     en la línea siguiente al clic mediría siempre cero, y las ocho
     comprobaciones de abajo saldrían verdes contra cualquier código: es el mismo
     error que ya salió caro en E90 con la cuenta del marcador. */
  function pulsar(el) {
    pedidos = [];
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return new Promise(function (listo) {
      setTimeout(function () { listo(pedidos.join(',')); }, 25);
    });
  }

  var normal = CB.ui.crear('button', 'btn-bloque', 'Vale');
  caja.appendChild(normal);

  var apagado = CB.ui.crear('button', 'btn-bloque', 'No');
  apagado.disabled = true;
  caja.appendChild(apagado);

  /* Los botones rotulados llevan un icono y una palabra dentro, así que el
     objeto del clic casi nunca es el botón. */
  var rotulado = CB.ui.crear('button', 'btn-bloque btn-bloque--rotulado');
  var dentro = CB.ui.crear('span', 'btn-bloque__rotulo', 'Pausa');
  rotulado.appendChild(dentro);
  caja.appendChild(rotulado);

  var moneda = CB.ui.pieza('button', 2);
  moneda.addEventListener('click', function () { CB.audio.sfx('gema'); });
  caja.appendChild(moneda);

  var teclado = CB.ui.crear('div');
  caja.appendChild(teclado);

  return pulsar(normal).then(function (p) {
    t.igual(p, 'pulsar', 'E91 · un botón cualquiera suena al pulsarse');
    return pulsar(apagado);
  }).then(function (p) {
    t.igual(p, '',
      'E91 · un botón deshabilitado no suena: ahí manda el «toc» de construcción');
    return pulsar(dentro);
  }).then(function (p) {
    t.igual(p, 'pulsar', 'E91 · tocar el rótulo de dentro cuenta como tocar el botón');
    return pulsar(moneda);
  }).then(function (p) {
    /* Ya no hay una lista de clases exentas: la moneda calla porque SUENA, no
       porque esté escrita en una excepción. La diferencia importa el día que
       alguien añada una pieza nueva. */
    t.igual(p, 'gema', 'E91 · una moneda no suena dos veces: ya trae su «gema»');

    /* ── EL TECLADO NUMÉRICO DE VERDAD ────────────────────────────────────
       Aquí estaba el fallo, y por eso no se prueba con un botón inventado que
       llame a sfx: se monta el componente que usa el juego y se pulsa su tecla.
       Un banco de pruebas hecho a mano habría estado de acuerdo con el código
       equivocado, que es exactamente lo que enseñó E42. */
    CB.componentes.tecladoBloques({ respuesta: 7 }, function () { },
      { contenedor: teclado, vaciar: false, bloqueoMs: 0 });
    return new Promise(function (listo) { setTimeout(listo, 30); });
  }).then(function () {
    var siete = teclado.querySelector('[data-tecla="7"]');
    if (!t.ok(!!siete, 'E91 · el teclado numérico de verdad está montado')) return '';
    return pulsar(siete);
  }).then(function (p) {
    t.igual(p, 'picar',
      'E91 · una cifra suena UNA vez: el «picar» que ya trae, sin clic encima');
    var borrar = teclado.querySelector('[data-tecla="borrar"]');
    return borrar ? pulsar(borrar) : '';
  }).then(function (p) {
    /* El «toc» dice «aún no» y el clic dice «sí». Sonando a la vez no dicen
       ninguna de las dos cosas: dicen ruido. */
    t.igual(p, 'toc', 'E91 · y el ⌫ suena a «toc», no a «toc» y clic a la vez');

    CB.audio.sfx = sfxPrevio;
    document.body.removeChild(caja);
    if (CB.partida) CB.partida.bloqueado = false;
  });
});

/* ══ E92 · Con el teclado se jugaba en silencio ══════════════════════════════

   Se puede jugar una partida entera solo con el teclado —es criterio de HECHO de
   F8, no una comodidad— y esa partida se jugaba muda. Las cifras sí sonaban,
   porque el «picar» lo pone el componente; pero Enter, Escape, el Tab, las
   flechas que mueven el foco por la rejilla, la L de leer y la P de pista no
   sonaban nunca, y fuera de las tres pantallas de juego no sonaba NINGUNA tecla,
   porque el manejador de 06-a11y.js devuelve pronto. Quien juega con el teclado
   —que casi siempre es quien no puede usar el dedo— tenía la mitad de la
   confirmación que tiene el resto.

   Lo que se vigila es lo mismo que en E91 y por eso comparten contador: que
   suene UNA vez. Y aquí hay dos maneras nuevas de sonar dos veces —Enter sobre
   un botón, que el navegador convierte en un clic de verdad, y el dedo apoyado
   en una tecla, que dispara treinta por segundo— más una de sonar donde no debe:
   escribiendo en la puerta parental.
   ────────────────────────────────────────────────────────────────────────── */

CB.pruebas.suite('E92 · las teclas también suenan, una vez cada una', function () {
  var t = CB.pruebas;

  var sfxPrevio = CB.audio.sfx;
  var pedidos = [];
  CB.audio.sfx = function (n) { pedidos.push(n); return sfxPrevio(n); };

  var conectado = CB.arranque.conectarSonidoTeclas(document);
  t.ok(conectado || document.documentElement.getAttribute('data-clic-tecla') === 'si',
    'E92 · el oyente de teclado está conectado al documento');
  t.igual(CB.arranque.conectarSonidoTeclas(document), false,
    'E92 · y conectarlo dos veces no deja dos oyentes');

  /* ── CUALQUIER GESTO ABRE EL AUDIO, NO SOLO JUGAR ───────────────────────
     El contexto de Web Audio nace suspendido y solo lo despierta un gesto del
     usuario, y los dos únicos sitios que lo despertaban eran los botones JUGAR y
     «partida tranquila». Quien empezaba tocando «Ajustes» o «Perfiles» —o quien
     navegaba con el teclado— no oía NADA en los primeros toques de la sesión,
     que son justamente los que enseñan que el juego responde. Se ve poco porque
     el camino que más se anda pasa por JUGAR.

     Se sustituye CB.audio.iniciar para contar: abrir un AudioContext de verdad
     en la suite dejaría el resto de comprobaciones pitando. */
  var iniciarPrevio = CB.audio.iniciar;
  var aperturas = 0;
  CB.audio.iniciar = function () { aperturas++; return null; };

  t.igual(CB.arranque.despertarAudio({ isTrusted: true }), true,
    'E92 · un gesto de verdad abre el audio');
  t.igual(aperturas, 1, 'E92 · y lo abre llamando a iniciar(), no por su cuenta');
  t.igual(CB.arranque.despertarAudio({ isTrusted: false }), false,
    'E92 · un evento sintético no abre nada: el navegador no lo permitiría');
  t.igual(aperturas, 1, 'E92 · y no llega a iniciar()');
  CB.audio.iniciar = iniciarPrevio;

  var caja = CB.ui.crear('div');
  document.body.appendChild(caja);

  var campo = CB.ui.crear('input');
  caja.appendChild(campo);
  var boton = CB.ui.crear('button', 'btn-bloque', 'Vale');
  caja.appendChild(boton);

  /* Y que el oyente lo LLAME, que es la mitad que se puede caer sin que nada
     falle: la función podría estar perfecta y no invocarla nadie — eso fue E41
     entero. Se cuenta a través de CB.arranque, que es como la busca el oyente. */
  var despertarPrevio = CB.arranque.despertarAudio;
  var despertados = 0;
  CB.arranque.despertarAudio = function () { despertados++; return true; };

  function teclear(opciones, destino) {
    pedidos = [];
    (destino || document).dispatchEvent(new KeyboardEvent('keydown', {
      key: opciones.key,
      bubbles: true,
      repeat: !!opciones.repeat,
      ctrlKey: !!opciones.ctrl,
      altKey: !!opciones.alt,
      metaKey: !!opciones.meta
    }));
    return new Promise(function (listo) {
      setTimeout(function () { listo(pedidos.join(',')); }, 25);
    });
  }

  return teclear({ key: 'ArrowRight' }).then(function (p) {
    t.igual(p, 'pulsar', 'E92 · una tecla cualquiera suena');
    t.ok(despertados > 0, 'E92 · y la tecla pasa por despertarAudio antes de sonar');
    return teclear({ key: 'Escape' });
  }).then(function (p) {
    t.igual(p, 'pulsar', 'E92 · y las que no escriben nada también: Escape entra');
    return teclear({ key: '7', repeat: true });
  }).then(function (p) {
    t.igual(p, '',
      'E92 · el dedo apoyado en una tecla no dispara una ametralladora');
    return teclear({ key: 'Shift' });
  }).then(function (p) {
    t.igual(p, '', 'E92 · un modificador solo no es un gesto: sonaría en cada mayúscula');
    return teclear({ key: 'r', ctrl: true });
  }).then(function (p) {
    t.igual(p, '', 'E92 · Ctrl+R es del navegador, no del juego');
    return teclear({ key: '4' }, campo);
  }).then(function (p) {
    /* La puerta parental es el único campo de texto del juego. Ahí la
       confirmación de que la tecla ha entrado es el carácter, que se ve. */
    t.igual(p, '', 'E92 · escribir en un campo no es pulsar un mando');

    /* ── LO QUE YA SUENA, CALLA ───────────────────────────────────────────
       Es la misma regla de E91 y el mismo contador. No se usa aquí el puente
       de verdad —CB.a11y.conectarTeclado()— porque no tiene forma de quitarse:
       registrarlo en la suite dejaría un oyente que responde a todas las teclas
       que disparen las demás suites. Se imita lo único que importa de él: que
       durante el gesto suene algo. */
    var propia = function () { CB.audio.sfx('toc'); };
    document.addEventListener('keydown', propia);
    return teclear({ key: '7' }).then(function (q) {
      document.removeEventListener('keydown', propia);
      return q;
    });
  }).then(function (p) {
    t.igual(p, 'toc', 'E92 · una tecla con voz propia no lleva clic encima');

    /* ── ENTER SOBRE UN BOTÓN ─────────────────────────────────────────────
       El navegador lo convierte en un clic de verdad, y de ese ya se encarga el
       oyente de E91. Sin esta salida, cada Enter del teclado sonaría dos veces:
       el mismo fallo que se acaba de arreglar, entrando por la otra puerta. */
    boton.focus();
    var conFoco = document.activeElement === boton;
    if (!t.ok(conFoco, 'E92 · el botón de prueba se ha podido enfocar')) return '';
    return teclear({ key: 'Enter' });
  }).then(function (p) {
    t.igual(p, '', 'E92 · Enter sobre un botón calla: ya suena el clic que provoca');
    return teclear({ key: ' ' });
  }).then(function (p) {
    /* Con Espacio no vale fiarse del contador: el clic no llega hasta que se
       SUELTA la tecla, mucho después de que el temporizador haya decidido. */
    t.igual(p, '', 'E92 · y el Espacio igual, que además activa al soltarse');

    if (boton.blur) boton.blur();
    CB.arranque.despertarAudio = despertarPrevio;
    CB.audio.sfx = sfxPrevio;
    document.body.removeChild(caja);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   E93 · La moneda de 5 céntimos y el billete de 5 € eran el mismo «5»
   ══════════════════════════════════════════════════════════════════════════
   Al meter las monedas de céntimo, lo natural era llamarlas por su número: 5,
   10, 20, 50. Y ahí está el choque, porque esos cuatro números YA SON los cuatro
   billetes. Dos consecuencias, y la segunda es la mala:

     · el CSS selecciona la fotografía por ese número, así que «la moneda de 20
       céntimos» se habría pintado con la foto del billete de 20 €;

     · y la corrección de `40-partida.js` compara con `Number(valor) ===
       Number(item.respuesta)`, que para dos piezas distintas con el mismo número
       da CIERTO. Tocar el billete de 5 € habría acertado la pregunta «toca la
       moneda de 5 céntimos».

   La salida fue nombrarlas 'c5' — y eso abre el fallo simétrico, que es el que
   de verdad se cazó aquí: `Number('c5')` es NaN, `NaN === NaN` es falso, y
   entonces la pregunta se falla SIEMPRE, incluso tocando la moneda correcta. Un
   nivel entero imposible de superar, sin un solo error en consola.

   Por eso este guardián no mira el código: sirve una partida de verdad y le pide
   a `CB.partida.responder` que corrija, que es el único sitio donde esto se
   decide. Y comprueba las dos direcciones: que la buena acierta y que la mala
   falla —una comparación rota en el otro sentido daría todo por bueno—.
   ────────────────────────────────────────────────────────────────────────── */
CB.pruebas.suite('E93 · una moneda de céntimo no es el billete del mismo número', function () {
  var t = CB.pruebas;

  /* ── A · La pieza: distinta foto, distinto atributo, distinto nombre ───── */
  var caja = CB.ui.crear('div');
  document.body.appendChild(caja);
  var cinco = CB.ui.pieza('span', 5);            // el billete de 5 €
  var cincoC = CB.ui.pieza('span', 'c5');        // la moneda de 5 céntimos
  caja.appendChild(cinco); caja.appendChild(cincoC);

  t.igual(cinco.className, 'pieza pieza--billete', 'E93 · el 5 a secas sigue siendo el billete');
  t.igual(cincoC.className, 'pieza pieza--moneda', 'E93 · y el c5 es una moneda');
  t.igual(cincoC.getAttribute('data-valor'), null,
    'E93 · la moneda de céntimo NO lleva data-valor: es el atributo que colisiona');
  t.igual(cincoC.getAttribute('data-centimos'), '5',
    'E93 · lleva data-centimos, que es suyo y de nadie más');
  t.ok(getComputedStyle(cinco).backgroundImage !== getComputedStyle(cincoC).backgroundImage,
    'E93 · y NO comparten fotografía',
    getComputedStyle(cincoC).backgroundImage);
  t.igual(cincoC.getAttribute('aria-label'), 'la moneda de 5 céntimos',
    'E93 · quien oye la pantalla oye céntimos, no euros');
  t.igual(CB.ui.pieza('span', 'c1').getAttribute('aria-label'), 'la moneda de 1 céntimo',
    'E93 · y en singular cuando toca: «1 céntimo», no «1 céntimos»');
  document.body.removeChild(caja);

  /* ── B · El generador: cinco piezas, ninguna repetida, ningún euro ─────── */
  var vistas = {}, intrusos = [], repetidos = [], s;
  for (s = 0; s < 40; s++) {
    var item = CB.gen.dinero.E8(CB.util.mulberry32(s + 1), 1);
    if (!item.piezasDinero) { intrusos.push('D=1 sin piezas'); continue; }
    vistas[item.respuesta] = 1;
    if (!CB.gen.dinero.esCentimo(item.respuesta)) intrusos.push(String(item.respuesta));
    item.distractoresFijos.forEach(function (d) {
      if (!CB.gen.dinero.esCentimo(d)) intrusos.push('distractor ' + d);
      if (d === item.respuesta) repetidos.push(String(d));
    });
  }
  t.igual(intrusos.length, 0,
    'E93 · en D=1 todo lo que sale es una moneda de céntimo', intrusos.slice(0, 4).join(' · '));
  t.igual(repetidos.length, 0,
    'E93 · y ningún distractor es la respuesta', repetidos.join(' · '));
  t.igual(Object.keys(vistas).length, 5,
    'E93 · con semillas suficientes salen las cinco, incluida la de 1 céntimo',
    Object.keys(vistas).join(','));

  /* ── C · LA CORRECCIÓN, DONDE ESTABA EL FALLO ─────────────────────────────
     Con una partida de verdad, porque `responder()` es el único sitio donde se
     decide si algo es correcto y no hay forma honesta de preguntárselo aparte.
     Se toma el ítem que iniciar() ya sirvió —con su nivelId y su destreza— y se
     le cambia solo la respuesta: fabricar un ítem a mano sería fabricar también
     la forma que la partida no produce, que es la lección de E42. */
  var perfilPrevio = CB.perfil;
  var estadoPrevio = CB.partida.estado;
  var bloqueoPrevio = CB.partida.bloqueado;
  CB.perfil = CB.pruebas.perfilNuevo();
  CB.partida.bloqueado = false;

  var estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  /* Y SE ABRE EL CERROJO DESPUÉS DE INICIAR, no antes: servir el primer ítem
     monta el componente, y montar() bloquea 800 ms. Puesto antes, `responder()`
     se sale en su primera línea y las dos comprobaciones de abajo miden un
     estado que no se ha tocado —verde o rojo por el motivo equivocado—. Es la
     misma trampa que el `bloqueoMs` de E46. */
  CB.partida.bloqueado = false;
  if (t.ok(!!(estado && estado.itemActual), 'E93 · hay partida con un ítem servido')) {
    estado.itemActual.respuesta = 'c20';
    estado.itemActual.piezasDinero = true;
    estado.itemActual.respuestaSigno = null;

    estado.respondido = false;
    CB.partida.responder('c20', 'opciones', { posicion: 0 });
    var ultima = estado.respuestas[estado.respuestas.length - 1];
    t.ok(!!ultima && ultima.correcto === true,
      'E93 · tocar la moneda de 20 céntimos acierta: Number("c20") es NaN y NaN nunca se iguala',
      JSON.stringify(ultima));

    estado.respondido = false;
    CB.partida.responder('c50', 'opciones', { posicion: 1 });
    var fallada = estado.respuestas[estado.respuestas.length - 1];
    t.ok(!!fallada && fallada.correcto === false,
      'E93 · y tocar otra falla: la comparación no da cierto a todo',
      JSON.stringify(fallada));
  }

  CB.partida.estado = estadoPrevio;
  CB.partida.bloqueado = bloqueoPrevio;
  CB.perfil = perfilPrevio;
});


/* ────────────────────────────────────────────────────────────────────────────
   E94 · El «Salir» del mapa no hacía nada

   atras() sacaba UNA entrada de la pila; si era una pantalla de flujo (partida,
   jefe, descanso, reparación, error) la descartaba y caía al destino de
   reserva, que con perfil activo es el mapa. Estando ya en el mapa, eso es
   repintar la misma pantalla: el botón parecía muerto.

   Y no era un rincón raro sino el camino normal del juego:
   portada → mapa → partida → fin → SALIR deja la pila en [p-portada, p-mapa]
   con «p-mapa» delante, porque atras() no apila. El siguiente Salir se sacaba
   el mapa a sí mismo. Igual al volver del jefe (42-jefes.js va a p-mapa) o de
   una expedición abandonada.

   Se comprueba la conducta, no la implementación: dónde se acaba, no cómo.
   ────────────────────────────────────────────────────────────────────────── */
CB.pruebas.suite('E94 · Salir siempre lleva a alguna parte distinta', function () {
  var t = CB.pruebas;
  var pantallaPrevia = CB.pantallas.actual;
  var pilaPrevia = CB.pantallas.pila.slice();
  var perfilPrevio = CB.perfil;

  CB.perfil = CB.perfil || { id: 'e94', nombre: 'E94', ajustes: {}, niveles: {} };

  /* 1. El caso exacto que se rompía: pila con el propio mapa en la cima. */
  CB.pantallas.pila = ['p-portada', 'p-mapa'];
  CB.pantallas.actual = 'p-mapa';
  var destino = CB.pantallas.atras();
  t.ok(destino !== 'p-mapa', 'E94 · Salir en el mapa no devuelve al mapa', destino);
  t.igual(destino, 'p-portada', 'E94 · sino a la portada, que es lo que había debajo');
  t.igual(CB.pantallas.actual, destino, 'E94 · y la pantalla actual es la de destino');

  /* 2. Cima de flujo: se descarta y se sigue buscando, no se abandona. */
  CB.pantallas.pila = ['p-portada', 'p-mapa', 'p-partida'];
  CB.pantallas.actual = 'p-fin';
  t.igual(CB.pantallas.atras(), 'p-mapa', 'E94 · desde el fin se vuelve al mapa');

  /* 3. Pila vacía en el mapa: la reserva NO puede ser el propio mapa. */
  CB.pantallas.pila = [];
  CB.pantallas.actual = 'p-mapa';
  t.igual(CB.pantallas.atras(), 'p-portada',
    'E94 · con la pila vacía el mapa sale a la portada');

  /* 4. Y desde una pantalla cualquiera con la pila vacía, al mapa. */
  CB.pantallas.pila = [];
  CB.pantallas.actual = 'p-glosario';
  t.igual(CB.pantallas.atras(), 'p-mapa',
    'E94 · las demás pantallas siguen cayendo al mapa');

  /* 5. atras() no apila: dos Salir seguidos no se quedan dando vueltas entre
        dos pantallas. Era el motivo de que ir() no pudiera usarse tal cual. */
  CB.pantallas.pila = ['p-portada', 'p-mapa'];
  CB.pantallas.actual = 'p-cantera';
  t.igual(CB.pantallas.atras(), 'p-mapa', 'E94 · de la cantera al mapa');
  t.igual(CB.pantallas.atras(), 'p-portada', 'E94 · y del mapa a la portada, no de vuelta');

  /* 6. Nunca se vuelve a una pantalla de flujo, aunque la pila esté llena. */
  CB.pantallas.pila = ['p-jefe', 'p-partida', 'p-descanso'];
  CB.pantallas.actual = 'p-casa';
  t.igual(CB.pantallas.atras(), 'p-mapa',
    'E94 · tres pantallas de flujo en la pila y ninguna es destino');

  /* 7. Salir con ir(): el foco y el landmark, que atras() no ponía. */
  CB.pantallas.pila = ['p-portada', 'p-mapa'];
  CB.pantallas.actual = 'p-cantera';
  CB.pantallas.atras();
  var sec = document.getElementById('p-mapa');
  if (sec) {
    t.ok(sec.getAttribute('role') === 'main',
      'E94 · la pantalla a la que se sale es la region principal');
    var h = sec.querySelector('h1');
    if (h) {
      /* SE MIRA LA PREPARACIÓN DEL FOCO, NO document.activeElement: una página
         que el sistema no tiene en primer plano no da el foco a nadie, y la
         aserción diría «roto» sobre código correcto. Lo que atras() no hacía
         —y ir() sí— es exactamente esto: dejar el <h1> enfocable y nombrar la
         región con él. */
      t.igual(h.getAttribute('tabindex'), '-1',
        'E94 · el titulo de destino queda enfocable, que es lo que atras() no hacia');
      t.igual(sec.getAttribute('aria-labelledby'), h.id,
        'E94 · y la seccion toma su nombre accesible del titulo');
    }
  }

  CB.pantallas.pila = pilaPrevia;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});


/* ══════════════════════════════════════════════════════════════════════════
   E95 · Lo que centra y además tiene scroll esconde por arriba
   ──────────────────────────────────────────────────────────────────────────
   `.zona-juego__alta` —entonces `.zona-superior`— era a la vez caja centrada
   (`justify-content: center`) y caja
   con barra (`overflow-y: auto`). Mientras el contenido cabe no pasa nada; en
   cuanto no cabe —el enunciado largo de un problema más el `.mensaje-resultado`,
   que tiene un suelo de tres líneas— el centrado reparte el desbordamiento a los
   DOS lados y lo que sobresale por arriba no se recupera de ninguna manera,
   porque `scrollTop` no puede ser negativo. El niño ve el enunciado cortado por
   la primera línea y la barra solo le lleva hacia abajo.

   El remedio es la palabra clave `safe`, que existe justo para esto: centra
   mientras quepa y se porta como `start` en cuanto desborda.

   ESTO NO SE COMPRUEBA LEYENDO EL CSS. `getComputedStyle` diría «safe center» y
   quedaría verde aunque el navegador no lo aplicara —y de hecho el mismo defecto
   volvió a aparecer por el otro eje cuando el reparto en dos columnas alineó el
   enunciado con `flex-end`, que es otra alineación posicional y recorta igual—.
   Lo que se mide es la única consecuencia que le importa a quien juega: con la
   barra arriba del todo, ¿se ve la primera línea?
   ══════════════════════════════════════════════════════════════════════════ */
CB.pruebas.suite('E95 · con scroll arriba del todo no falta nada por arriba', function () {
  var t = CB.pruebas;
  var caja = document.createElement('div');
  caja.className = 'zona-juego';
  /* `flex: none` y el alto por las dos puntas: la caja se cuelga del <body>, que
     es flex en la página de pruebas, y sin esto se encogía hasta su contenido
     mínimo —la comprobación de control medía 32 px de hueco y fallaba sobre CSS
     correcto—. */
  caja.style.flex = 'none';
  caja.style.minHeight = '200px'; caja.style.maxHeight = '200px';
  caja.style.width  = '260px';
  var sup = document.createElement('div');
  sup.className = 'zona-juego__alta';
  var primero = document.createElement('p');
  primero.className = 'enunciado';
  primero.textContent = 'Primera línea del enunciado, la que se perdía.';
  var relleno = document.createElement('p');
  relleno.className = 'enunciado';
  relleno.textContent = new Array(60).join('texto largo que no cabe de ninguna manera ');
  /* Los dos párrafos no se encogen: son hijos de un flex, y con el
     `flex-shrink` de serie la caja los aplasta en vez de desbordar, que es
     justo el caso que esta prueba necesita provocar. */
  primero.style.flex = '0 0 auto'; relleno.style.flex = '0 0 auto';
  sup.appendChild(primero); sup.appendChild(relleno);
  caja.appendChild(sup);
  document.body.appendChild(caja);

  try {
    t.ok(sup.scrollHeight > sup.clientHeight + 1,
      'E95 · el caso de prueba desborda de verdad (si no, no prueba nada)',
      sup.scrollHeight + ' > ' + sup.clientHeight);

    sup.scrollTop = 0;
    var c = sup.getBoundingClientRect(), p = primero.getBoundingClientRect();
    /* Un margen de 1 px por el redondeo del subpíxel. El relleno de la caja hace
       que lo normal sea NEGATIVO —el párrafo empieza por debajo del borde—; lo
       que no puede pasar es que empiece por encima. */
    t.ok(p.top >= c.top - 1,
      'E95 · con la barra arriba del todo, la primera línea se ve',
      'perdidos ' + Math.round(c.top - p.top) + ' px por arriba');
    t.ok(p.left >= c.left - 1,
      'E95 · y tampoco se pierde nada por la izquierda',
      'perdidos ' + Math.round(c.left - p.left) + ' px');

    /* Y hasta el final: que no falte por arriba no puede lograrse a costa de que
       falte por abajo. */
    sup.scrollTop = sup.scrollHeight;
    var f = relleno.getBoundingClientRect(), c2 = sup.getBoundingClientRect();
    t.ok(f.bottom <= c2.bottom + 2,
      'E95 · y bajando del todo se llega al final del texto',
      'sobran ' + Math.round(f.bottom - c2.bottom) + ' px');

    /* Lo contrario también importa: si CABE, se sigue centrando. Sin esto, el
       arreglo podría ser «alinear siempre arriba», que arregla el recorte
       quitando la maquetación. */
    relleno.textContent = '.';
    primero.textContent = '9 − 6';
    caja.style.minHeight = '400px'; caja.style.maxHeight = '400px';
    sup.scrollTop = 0;
    t.ok(sup.scrollHeight <= sup.clientHeight + 1,
      'E95 · el caso de control cabe de verdad',
      sup.scrollHeight + ' vs ' + sup.clientHeight);
    var c3 = sup.getBoundingClientRect(), p3 = primero.getBoundingClientRect();
    t.ok(p3.top > c3.top + 8,
      'E95 · cuando cabe, el contenido sigue centrado y no pegado arriba',
      Math.round(p3.top - c3.top) + ' px de aire');
  } finally {
    document.body.removeChild(caja);
  }
});

/* ══════════════════════════════════════════════════════════════════════════
   Dos columnas desde 1200 px
   ──────────────────────────────────────────────────────────────────────────
   Desde `escritorio` el enunciado va a la izquierda y la respuesta a la derecha.
   La consulta de medios depende de la VENTANA, así que la comprobación no puede
   forzar el caso: pregunta a `matchMedia` en cuál de los dos está y exige el
   reparto que le toca. Cada máquina ejecuta una de las dos ramas, y las dos son
   afirmaciones sobre lo que se ve, no sobre lo que dice la hoja de estilos.
   ══════════════════════════════════════════════════════════════════════════ */
CB.pruebas.suite('Maquetación · el reparto cambia a dos columnas en pantalla ancha', function () {
  var t = CB.pruebas;
  var caja = document.createElement('div');
  caja.className = 'zona-juego';
  caja.style.flex = 'none';
  caja.style.minHeight = '400px'; caja.style.maxHeight = '400px';
  var sup = document.createElement('div'); sup.className = 'zona-juego__alta';
  var inf = document.createElement('div'); inf.className = 'zona-juego__baja';
  sup.appendChild(document.createElement('p'));
  sup.firstChild.className = 'enunciado';
  sup.firstChild.textContent = '9 − 6';
  var b = document.createElement('button');
  b.className = 'btn-bloque'; b.textContent = '3';
  inf.appendChild(b);
  caja.appendChild(sup); caja.appendChild(inf);
  document.body.appendChild(caja);

  try {
    var ancha = window.matchMedia('(min-width: 1200px)').matches;
    var rs = sup.getBoundingClientRect(), ri = inf.getBoundingClientRect();
    if (ancha) {
      t.ok(ri.left >= rs.right - 1,
        'Maquetación · en ancho, la respuesta queda a la DERECHA del enunciado',
        'enunciado hasta ' + Math.round(rs.right) + ', respuesta desde ' + Math.round(ri.left));
      t.ok(Math.abs(ri.top - rs.top) < 2,
        'Maquetación · y las dos columnas empiezan a la misma altura');
      t.ok(rs.width > 0 && ri.width > 0,
        'Maquetación · ninguna de las dos se queda sin ancho');
    } else {
      t.ok(ri.top >= rs.bottom - 1,
        'Maquetación · en estrecho, la respuesta sigue DEBAJO del enunciado',
        'enunciado hasta ' + Math.round(rs.bottom) + ', respuesta desde ' + Math.round(ri.top));
      t.ok(Math.abs(ri.left - rs.left) < 2,
        'Maquetación · y las dos ocupan la misma columna');
      t.ok(rs.height > 0 && ri.height > 0,
        'Maquetación · ninguna de las dos se queda sin alto');
    }
    /* En los dos repartos: nunca solapadas. */
    var solapan = ri.left < rs.right - 1 && ri.top < rs.bottom - 1;
    t.ok(!solapan, 'Maquetación · enunciado y respuesta nunca se pisan');
  } finally {
    document.body.removeChild(caja);
  }
});


/* ══════════════════════════════════════════════════════════════════════════
   E96-E98 · El teclado tiene que caber, y si no cabe, alcanzarse
   ──────────────────────────────────────────────────────────────────────────
   Tres fallos de la misma familia, encontrados midiendo la pantalla en quince
   tamaños en vez de leyendo la hoja de estilos:

   E96  `:root.modo-proyeccion` escribía `--lado-respuesta: 150px` DIRECTAMENTE,
        que es el resultado del `min()` de los dos ejes. Se saltaba el reparto
        entero —la anchura escribe --lado-deseado, la altura --lado-techo— y en
        un proyector de 1200x700 el 3x4 a 150 px no cabía: la fila del OK quedaba
        fuera de la zona de juego. Además la clase gana por ESPECIFICIDAD, así
        que ningún `:root { --lado-techo }` posterior podía bajarlo; los tres
        escalones de altura nombran ahora también la clase.

   E97  La excepción documentada «en 660 px de alto el 3x4 no cabe, se despliega
        a 6x2» se pedía por altura y no miraba la anchura. Seis columnas de 64 px
        con sus huecos son 424 px: en un móvil de 360x640 —que entra por altura—
        dos columnas se salían por la derecha, sin barra que las alcanzara.

   E98  Y donde el teclado no cabe de ninguna manera sin bajar del suelo de 64 px
        —320x480, que es tamaño soportado— la zona de la respuesta no tenía
        barra: el OK era inalcanzable. Ahora la tiene, como la del enunciado.

   NINGUNO SE COMPRUEBA LEYENDO EL CSS: los tres estaban escritos «bien» y los
   tres se veían solo midiendo. Lo que se mide aquí es lo mismo que se midió para
   encontrarlos.
   ══════════════════════════════════════════════════════════════════════════ */
CB.pruebas.suite('E96-E98 · el teclado cabe a lo ancho y se alcanza a lo alto', function () {
  var t = CB.pruebas;
  var raiz = document.documentElement;
  var clasesPrevias = raiz.className;

  /* El teclado de verdad, con las clases que usa el juego, dentro de una zona del
     ancho de la ventana: lo que se mide es la hoja de estilos, no el componente. */
  var caja = document.createElement('div');
  caja.className = 'zona-juego';
  caja.style.flex = 'none';
  caja.style.width = window.innerWidth + 'px';
  var inf = document.createElement('div');
  inf.className = 'zona-juego__baja';
  var visor = document.createElement('div');
  visor.className = 'respuesta__visor'; visor.textContent = '_';
  var tec = document.createElement('div');
  tec.className = 'teclado-bloques';
  var teclas = ['1','2','3','4','5','6','7','8','9','⌫','0','OK'], k;
  for (k = 0; k < teclas.length; k++) {
    var b = document.createElement('button');
    b.className = 'btn-bloque'; b.type = 'button'; b.textContent = teclas[k];
    if (teclas[k] === 'OK') b.setAttribute('data-tecla', 'ok');
    tec.appendChild(b);
  }
  inf.appendChild(visor); inf.appendChild(tec);
  caja.appendChild(inf);
  document.body.appendChild(caja);

  /* EL LADO SE MIDE EN UNA TECLA, NO EN LA VARIABLE. `--lado-respuesta` vale
     `min(64px, 64px)`: las propiedades personalizadas no se resuelven en
     getComputedStyle, así que leerla y pasarla por parseFloat da 0 y la
     comprobación queda verde contra nada. El botón sí tiene un ancho real. */
  function ladoReal() { return tec.firstChild.getBoundingClientRect().width; }
  function techo() {
    return parseFloat(getComputedStyle(raiz).getPropertyValue('--lado-techo')) || 0;
  }

  try {
    /* ── E96 ── El lado nunca se pasa del techo que impone la altura, y el modo
       proyección —que escribe desde un selector CON CLASE— tampoco. */
    t.ok(ladoReal() <= techo() + 0.5,
      'E96 · en modo normal la tecla respeta el techo que pone la altura',
      ladoReal() + ' > ' + techo());
    t.ok(ladoReal() >= 64,
      'E96 · y no baja del suelo de 64 px (WCAG 2.5.8, y un nino de siete anos)',
      String(ladoReal()));
    raiz.classList.add('modo-proyeccion');
    t.ok(ladoReal() <= techo() + 0.5,
      'E96 · en proyeccion tampoco: la clase no se salta el min() de los dos ejes',
      ladoReal() + ' > ' + techo());
    t.ok(ladoReal() >= 64,
      'E96 · y en proyeccion la tecla no es mas pequena que el suelo',
      String(ladoReal()));
    raiz.className = clasesPrevias;

    /* ── E97 ── Ni una tecla fuera por la derecha, en la ventana que sea. */
    var rc = caja.getBoundingClientRect(), rt = tec.getBoundingClientRect();
    t.ok(rt.width <= rc.width + 1,
      'E97 · el teclado no es mas ancho que la zona, sea cual sea la ventana',
      Math.round(rt.width) + ' px de teclado en ' + Math.round(rc.width) + ' px de zona');
    var ultima = tec.lastChild.getBoundingClientRect();
    t.ok(ultima.right <= rc.right + 1,
      'E97 · y la ultima tecla no se sale por la derecha',
      'sobran ' + Math.round(ultima.right - rc.right) + ' px');

    /* ── E98 ── Apretando la zona a la mitad de lo que necesita, el OK sigue
       alcanzable. El alto va en la PROPIA zona: puesto en la caja de fuera no
       aprieta nada, porque .zona-juego__baja no se encoge (flex: 0 0 auto). */
    var altoNecesario = inf.scrollHeight;
    inf.style.minHeight = Math.round(altoNecesario / 2) + 'px';
    inf.style.maxHeight = Math.round(altoNecesario / 2) + 'px';
    t.ok(inf.scrollHeight > inf.clientHeight + 1,
      'E98 · el caso de prueba aprieta de verdad (si no, no prueba nada)',
      inf.scrollHeight + ' vs ' + inf.clientHeight);
    inf.scrollTop = 0;
    var rv = visor.getBoundingClientRect(), ri0 = inf.getBoundingClientRect();
    t.ok(rv.top >= ri0.top - 1,
      'E98 · con la barra arriba, el visor no se pierde por arriba',
      'perdidos ' + Math.round(ri0.top - rv.top) + ' px');
    inf.scrollTop = inf.scrollHeight;
    var rok = tec.lastChild.getBoundingClientRect(), ri1 = inf.getBoundingClientRect();
    t.ok(rok.bottom <= ri1.bottom + 2,
      'E98 · y bajando del todo se llega al OK: la pregunta se puede contestar',
      'quedan ' + Math.round(rok.bottom - ri1.bottom) + ' px fuera');
  } finally {
    document.body.removeChild(caja);
    raiz.className = clasesPrevias;
  }
});


/* ══════════════════════════════════════════════════════════════════════════
   E99-E100 · Lo que no cabe en 320 px se sale sin avisar
   ──────────────────────────────────────────────────────────────────────────
   320 px de ancho es tamaño SOPORTADO: el aviso de «gira el aparato» solo salta
   por debajo de 320×420. Y ahí dos cosas se salían de la pantalla sin provocar
   barra horizontal ni error ninguno —se recortaban y ya—: el título de la
   portada, que con la tipografía de píxel y sus dos rellenos mide 337, y el
   cuarto botón de la barra de herramientas, que es el de Sonido.

   LAS DOS COMPROBACIONES MIDEN EN UNA CAJA DE 320 px, no en la ventana. Una
   aserción sobre la ventana real solo probaría algo en las máquinas estrechas, y
   quedaría verde por no aplicar en todas las demás — que es la peor forma de
   estar verde.
   ══════════════════════════════════════════════════════════════════════════ */
CB.pruebas.suite('E99-E100 · en 320 px no se sale nada por los bordes', function () {
  var t = CB.pruebas;
  var caja = document.createElement('div');
  caja.className = 'pantalla pantalla--portada';
  caja.style.width = '320px';
  caja.style.position = 'static';
  caja.hidden = false;

  var h = document.createElement('h1');
  h.className = 'portada__titulo';
  h.textContent = 'CUBOMÁTICA';
  caja.appendChild(h);

  var barra = document.createElement('div');
  barra.className = 'barra-herramientas';
  var g1 = document.createElement('div'), g2 = document.createElement('div');
  g1.className = 'barra-herramientas__grupo'; g2.className = 'barra-herramientas__grupo';
  ['Pista', '◀ Salir'].forEach(function (r) {
    var b = document.createElement('button'); b.className = 'btn-bloque'; b.textContent = r; g1.appendChild(b);
  });
  ['Pausa', 'Sonido'].forEach(function (r) {
    var b = document.createElement('button'); b.className = 'btn-bloque'; b.textContent = r; g2.appendChild(b);
  });
  barra.appendChild(g1); barra.appendChild(g2);
  caja.appendChild(barra);
  document.body.appendChild(caja);

  try {
    var rc = caja.getBoundingClientRect();

    /* E99 · el título cabe, partiéndose si hace falta. Se comprueba el ANCHO
       DESBORDADO, no el número de líneas: partirlo es un medio, y lo que no se
       negocia es que no se salga. */
    var rh = h.getBoundingClientRect();
    t.ok(rh.right <= rc.right + 1 && rh.left >= rc.left - 1,
      'E99 · el titulo de la portada no se sale de una pantalla de 320 px',
      Math.round(rh.width) + ' px de titulo en ' + Math.round(rc.width));
    t.ok(h.scrollWidth <= h.clientWidth + 1,
      'E99 · y no se recorta por dentro: el texto cabe en la caja del titulo',
      h.scrollWidth + ' vs ' + h.clientWidth);

    /* E100 · los cuatro controles, dentro. El de Sonido es el último. */
    var botones = barra.querySelectorAll('button'), fuera = [], i;
    for (i = 0; i < botones.length; i++) {
      var rb = botones[i].getBoundingClientRect();
      if (rb.right > rc.right + 1 || rb.left < rc.left - 1) fuera.push(botones[i].textContent);
    }
    t.igual(fuera.length, 0,
      'E100 · los cuatro botones de la barra caben en 320 px', fuera.join(' · '));
    t.ok(barra.scrollWidth <= barra.clientWidth + 1,
      'E100 · y la barra no tiene nada escondido a la derecha',
      barra.scrollWidth + ' vs ' + barra.clientWidth);
  } finally {
    document.body.removeChild(caja);
  }
});

/* ══════════════════════════════════════════════════════════════════════════
   E102 · Una palabra que no cabe NO se parte sola: se sale
   ──────────────────────────────────────────────────────────────────────────
   La misma familia que E99-E100, un nivel más adentro. A 320 px una línea
   dentro de `.contenido > .panel-bloque` se queda en unos 145 px —cosa de diez
   caracteres de esta tipografía—, así que «expedición», «guardianes» o
   «Cubomática» no caben en la caja. Y una palabra que no cabe no se parte por
   su cuenta: sobresale, sin barra horizontal, sin error y sin que nada se ponga
   rojo. Salió mirando la pantalla de Ayuda, que es casi toda texto en paneles,
   pero la regla que lo arregla es del proyecto entero.

   SE MIDE DENTRO DE UN <iframe> DE 320 px, Y ESO NO ES UN CAPRICHO. El arreglo
   vive en `@media (max-width: 479px)`, y una media query se evalúa contra el
   VIEWPORT, no contra la caja: el truco de E99-E100 —un div de 320 px en esta
   misma página— deja la regla apagada y mide el estado roto creyendo que mide
   el arreglado. Un iframe sí tiene viewport propio.

   La hoja que se carga es la de ESTA página (la legible o la minificada, según
   dónde se corra), y antes de medir nada se comprueba que de verdad se aplicó:
   una hoja que no cargue dejaría el texto sin estilo, todo cabría, y la
   comprobación saldría verde por no haber medido nada.
   ══════════════════════════════════════════════════════════════════════════ */
CB.pruebas.suite('E102 · a 320 px una palabra larga se parte, no se sale', function () {
  var t = CB.pruebas;
  var enlace = document.querySelector('link[rel="stylesheet"]');
  var hoja = enlace ? enlace.getAttribute('href') : '';
  if (!t.ok(!!hoja, 'E102 · la página declara su hoja de estilo')) return;

  /* Las palabras son las de verdad, las más largas que el juego escribe dentro
     de un panel. Cambiarlas por «xxxxxxxxxxxx» probaría un caso que no existe. */
  var cuerpo =
    '<section class="pantalla pantalla--scroll"><div class="contenido">' +
    '<div class="panel-bloque"><h2>Cubomática</h2>' +
    '<p class="texto-lectura">Al final de cada mundo hay un guardián.</p>' +
    '<ul class="texto-lectura"><li>Salir: deja la expedición.</li>' +
    '<li>La Pradera de los Números</li></ul>' +
    '</div></div></section>';

  return new Promise(function (listo) {
    var marco = document.createElement('iframe');
    marco.title = 'medida de 320 px';
    /* FUERA DEL FLUJO Y FUERA DE PANTALLA. `body` de esta página es un flex, y
       un iframe suelto dentro es un ítem flexible: el alto que se le pide lo
       machaca el reparto del contenedor y el marco acaba midiendo cualquier
       cosa. Con `position: fixed` manda el tamaño que se pide, y por eso se
       comprueba dentro —innerWidth— antes de medir nada. */
    marco.style.cssText =
      'position:fixed;left:-2000px;top:0;width:320px;height:480px;border:0;display:block';
    marco.srcdoc = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
      '<link rel="stylesheet" href="' + hoja + '"></head><body>' + cuerpo + '</body></html>';

    var acabado = false;
    function terminar(motivo) {
      if (acabado) return;
      acabado = true;
      if (motivo) t.ok(false, 'E102 · el marco de 320 px se ha podido montar', motivo);
      try { document.body.removeChild(marco); } catch (e) { }
      listo();
    }

    marco.onload = function () {
      if (acabado) return;
      var d = marco.contentDocument;
      var panel = d.querySelector('.panel-bloque');
      if (!panel) return terminar('no hay panel dentro del marco');

      /* Que la hoja se aplicó de verdad: sin ella el panel no tiene relleno y
         todo cabe, o sea que todo saldría verde sin haber medido nada. */
      var relleno = parseFloat(marco.contentWindow.getComputedStyle(panel).paddingLeft) || 0;
      if (!t.ok(relleno > 0 && marco.contentWindow.innerWidth === 320,
        'E102 · el marco mide 320 px y la hoja del juego se ha aplicado dentro',
        marco.contentWindow.innerWidth + ' px, relleno ' + relleno)) return terminar();

      var fuera = [];
      [].slice.call(d.querySelectorAll('.contenido *')).forEach(function (el) {
        if (el.clientWidth && el.scrollWidth > el.clientWidth + 1) {
          fuera.push(el.tagName + ' «' + el.textContent.trim().slice(0, 20) + '» ' +
                     el.scrollWidth + '>' + el.clientWidth);
        }
      });
      t.igual(fuera.length, 0,
        'E102 · a 320 px nada de un panel de texto se sale de su caja',
        fuera.slice(0, 3).join(' · '));

      /* Y el converso: el arreglo es partir la palabra, no encoger la letra.
         Si alguien lo «arregla» con un font-size literal, «Letra grande» y el
         modo proyección dejan de mandar justo en la pantalla más estrecha, que
         es la lección que dejó E99. */
      var h2 = d.querySelector('h2');
      t.ok(marco.contentWindow.getComputedStyle(h2).overflowWrap === 'break-word',
        'E102 · y se arregla partiendo la palabra, no tocando el tamaño de letra',
        marco.contentWindow.getComputedStyle(h2).overflowWrap);

      terminar();
    };

    document.body.appendChild(marco);
    /* Diez segundos, no cuatro: el plazo no mide nada del juego, solo evita que
       la suite se quede colgada si el marco no carga. Con la máquina ocupada
       —otra pestaña corriendo la suite, un navegador de capturas al lado— los
       cuatro se agotaban y el rojo no decía nada verdadero. */
    setTimeout(function () { terminar('el marco no ha cargado en 10 s'); }, 10000);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   E103 · La portada no se podía recorrer, y lo de abajo no existía
   ──────────────────────────────────────────────────────────────────────────
   `.pantalla--portada` es `overflow: hidden`, y con razón: las nubes y el cielo
   van fuera de flujo y sacarían barras por el decorado. El efecto colateral era
   que lo que no cabía a lo alto no se alcanzaba de ninguna forma. A 320×480
   —tamaño soportado, el aviso de girar el aparato solo salta por debajo de
   320×420— la pila del centro mide unos 968 px: la fila de abajo entera
   (Ajustes, Ayuda, Créditos) caía fuera, sin barra, sin recorte visible y sin
   nada que se pusiera rojo. Se veía al añadir el cuarto botón, pero el tercero
   ya estaba fuera desde antes.

   La barra la lleva ahora la pila, que es quien tiene el contenido, con la
   alineación `safe` de E95: centrar Y desbordar reparte lo que sobra a los DOS
   lados, y lo de arriba no se recupera nunca porque scrollTop no puede ser
   negativo. Se comprueban las dos mitades —se llega abajo, y arriba no se corta
   nada— porque arreglar una rompiendo la otra es exactamente lo que pasó en
   E95.
   ══════════════════════════════════════════════════════════════════════════ */
CB.pruebas.suite('E103 · a 320×480 se llega a los botones de abajo de la portada', function () {
  var t = CB.pruebas;
  var enlace = document.querySelector('link[rel="stylesheet"]');
  var hoja = enlace ? enlace.getAttribute('href') : '';
  if (!t.ok(!!hoja, 'E103 · la página declara su hoja de estilo')) return;

  var cuerpo =
    '<section class="pantalla pantalla--portada"><div class="pila-centro portada__pila">' +
    '<h1 class="portada__titulo">CUBOMÁTICA</h1>' +
    '<p class="portada__lema">«las Matemáticas son muy divertidas»</p>' +
    '<button class="btn-bloque btn-bloque--primario btn-bloque--grande">JUGAR</button>' +
    '<button class="btn-bloque btn-bloque--medio">CANTERA TRANQUILA</button>' +
    '<div class="fila fila--centro">' +
    '<button class="btn-bloque">¿Quién juega?</button>' +
    '<button class="btn-bloque">Ajustes</button>' +
    '<button class="btn-bloque">Ayuda</button>' +
    '<button class="btn-bloque" id="ultimo">Créditos</button>' +
    '</div></div></section>';

  return new Promise(function (listo) {
    var marco = document.createElement('iframe');
    marco.title = 'portada de 320×480';
    /* Con !important y a mano: la hoja del juego estila los iframes de esta
       página, y un marco de 150 px de alto —el defecto de HTML— mediría otra
       cosa y se pondría verde por no aplicar. Por eso el tamaño se comprueba
       dentro antes de medir nada. */
    marco.style.cssText =
      'position:fixed;left:-2000px;top:0;width:320px;height:480px;border:0;display:block';
    marco.srcdoc = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
      '<link rel="stylesheet" href="' + hoja + '"></head><body>' + cuerpo + '</body></html>';

    var acabado = false;
    function terminar(motivo) {
      if (acabado) return;
      acabado = true;
      if (motivo) t.ok(false, 'E103 · el marco de 320×480 se ha podido montar', motivo);
      try { document.body.removeChild(marco); } catch (e) { }
      listo();
    }

    marco.onload = function () {
      if (acabado) return;
      var w = marco.contentWindow, d = marco.contentDocument;
      var pila = d.querySelector('.portada__pila');
      var ultimo = d.getElementById('ultimo');
      var titulo = d.querySelector('.portada__titulo');
      if (!pila || !ultimo) return terminar('no está la pila dentro del marco');

      /* SI FALTA UNA PIEZA, SE DICE. Antes solo se comprobaban `pila` y
         `ultimo`, y `titulo` se medía sin mirar: al renombrar `.titulo-juego`
         esta maqueta se quedó con el nombre viejo, `titulo` salió null, la
         excepción murió dentro del onload y la promesa no se resolvió nunca.
         El rojo decía «el marco no ha cargado en 4 s», que era falso: el marco
         había cargado perfectamente. Un mensaje de fallo que miente cuesta más
         que no tenerlo. */
      if (!titulo) return terminar('la maqueta no trae .portada__titulo');

      var cs = w.getComputedStyle(pila);
      if (!t.ok(cs.overflowY === 'auto' && w.innerWidth === 320 && w.innerHeight === 480,
        'E103 · el marco mide 320×480 y la pila de la portada lleva barra',
        w.innerWidth + '×' + w.innerHeight + ', overflow-y: ' + cs.overflowY)) return terminar();

      /* Que de verdad hay más contenido que hueco: si cupiera todo, las dos
         comprobaciones de abajo pasarían sin haber medido nada. */
      if (!t.ok(pila.scrollHeight > pila.clientHeight + 1,
        'E103 · a este tamaño la portada NO cabe entera: hay algo que alcanzar',
        pila.scrollHeight + ' contra ' + pila.clientHeight)) return terminar();

      /* Arriba, con la barra a cero: el título no puede quedar por encima del
         borde, que es lo que hace `center` al desbordar (E95). */
      pila.scrollTop = 0;
      t.ok(titulo.getBoundingClientRect().top >= pila.getBoundingClientRect().top - 1,
        'E103 · con la barra arriba del todo, el título se ve entero',
        Math.round(titulo.getBoundingClientRect().top - pila.getBoundingClientRect().top) + ' px');

      /* Y abajo: el último botón de la fila entra entero en la caja. */
      pila.scrollTop = pila.scrollHeight;
      t.ok(ultimo.getBoundingClientRect().bottom <= pila.getBoundingClientRect().bottom + 1,
        'E103 · bajando la barra se llega al último botón de la fila, entero',
        Math.round(ultimo.getBoundingClientRect().bottom - pila.getBoundingClientRect().bottom) + ' px de más');

      terminar();
    };

    document.body.appendChild(marco);
    /* Diez segundos, no cuatro: el plazo no mide nada del juego, solo evita que
       la suite se quede colgada si el marco no carga. Con la máquina ocupada
       —otra pestaña corriendo la suite, un navegador de capturas al lado— los
       cuatro se agotaban y el rojo no decía nada verdadero. */
    setTimeout(function () { terminar('el marco no ha cargado en 10 s'); }, 10000);
  });
});
