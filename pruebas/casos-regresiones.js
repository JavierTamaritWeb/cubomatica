/* ============================================================================
   casos-regresiones.js — REGISTRO DE FALLOS YA CORREGIDOS
   ----------------------------------------------------------------------------
   Cada fallo encontrado en una auditoría deja aquí un guardián. La regla es
   simple: un fallo corregido sin prueba vuelve. Este fichero existe para que
   nadie tenga que acordarse.

   Los diecisiete fallos y dónde vive el guardián de cada uno. Los que no están
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

   E14-E17 salieron de MIRAR UNA CAPTURA, no de ejecutar pruebas, y es la
   lección más cara de todas: cinco rondas de auditoría comprobaron el DOM, la
   lógica, los contrastes y los contratos, y ninguna MIRÓ la pantalla. La barra
   de herramientas ni siquiera existía en la maqueta de pruebas.html. Ahora sí
   está, con su paisaje, en las dos pantallas que la llevan.

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

  /* Y el cerrojo se abre al reconstruir la zona de respuesta, o el segundo
     intento tras un fallo quedaría bloqueado para siempre. */
  t.ok(CB.partida.pintarRespuesta.toString().indexOf('respondido = false') !== -1,
    'E11 · pintarRespuesta() vuelve a abrir el cerrojo para el segundo intento');
  t.ok(CB.partida.responder.toString().indexOf('e.respondido') !== -1,
    'E11 · el cerrojo sigue estando en responder()');

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

  /* Y el mapa en concreto, que es donde pasó: sus tarjetas son h2 */
  t.ok(CB.mapaDestrezas.pintarMundos.toString().indexOf("crear('h3'") === -1,
    'E8 · las tarjetas de mundo ya no se pintan como h3');

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

  function iconoDe(b) { var i = b.querySelector('.ico'); return (i || b).textContent.trim(); }

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
    var r = b.querySelector('.rotulo');
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
});
