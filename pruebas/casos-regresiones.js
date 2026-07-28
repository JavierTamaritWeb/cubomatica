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
     E32 Las 17 <section> no tenían nombre accesible: para un       casos-a11y.js
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
   _03-componentes.scss. Con nueve coreografías en vez de una, la probabilidad de
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
     _03-componentes.scss. Así que la regla pasa a ser de TERRITORIO. */
  var TOPE = 45;          // % de altura por debajo del cual no baja nada visible

  var invaden = [];
  Object.keys(c.fotogramas).forEach(function (nombre) {
    var kf = c.fotogramas[nombre], j, paso, m, y;
    for (j = 0; j < kf.cssRules.length; j++) {
      paso = kf.cssRules[j];
      if (paso.style.opacity === '0') continue;          // invisible: da igual
      m = /translateY\(\s*(-?[\d.]+)%/.exec(paso.style.transform || '');
      if (!m) continue;
      y = parseFloat(m[1]);
      if (y > 30) invaden.push(nombre + ' @' + paso.keyText + ' → ' + y + '%');
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
    if (parseFloat(top) > TOPE) arriba.push(r.selectorText + ' → top ' + top);
  });
  t.igual(arriba.length, 0,
    'E47 · ningún cartel se declara por debajo del ' + TOPE + ' % de altura',
    arriba.join(' · '));

  /* Los dos que se superponen no interceptan toques, pase lo que pase. */
  var pasan = ['cinta', 'cartel-festejo'].filter(function (id) {
    var el = document.getElementById(id);
    return el && getComputedStyle(el).pointerEvents !== 'none';
  });
  t.igual(pasan.length, 0,
    'E47 · lo que se superpone deja pasar el toque', pasan.join(', '));

  /* Y SIGUEN SIENDO ABSOLUTOS. Esto no es una comprobación de estilo: es la
     única que ve el fallo que ya se ha cometido dos veces. _06-biomas.scss pone
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

  t.igual(tabla.length, 3, 'E48 · la tabla declara las tres coreografías de cinta');

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
