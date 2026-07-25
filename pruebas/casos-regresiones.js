/* ============================================================================
   casos-regresiones.js — REGISTRO DE FALLOS YA CORREGIDOS
   ----------------------------------------------------------------------------
   Cada fallo encontrado en una auditoría deja aquí un guardián. La regla es
   simple: un fallo corregido sin prueba vuelve. Este fichero existe para que
   nadie tenga que acordarse.

   Los trece fallos y dónde vive el guardián de cada uno. Los que no están en
   este fichero es porque su sitio natural es otro; la lista sigue siendo la
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
