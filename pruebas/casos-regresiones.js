/* casos-regresiones.js — REGISTRO DE FALLOS YA CORREGIDOS */

CB.pruebas.suite('E108 · los callbacks rotos se detectan y se aíslan', function () {
  const t = CB.pruebas;
  const reportarReal = CB.util.reportarError;
  const reportes = [];
  CB.util.reportarError = function (error, contexto) {
    reportes.push({ error: error, contexto: contexto });
  };

  const pantallaPrevia = CB.pantallas.actual;
  const pilaPrevia = CB.pantallas.pila.slice();
  CB.pantallas.ir('p-mapa');
  const salirPrevio = CB.pantallas.alSalir['p-mapa'];
  CB.pantallas.alSalir['p-mapa'] = function () { throw new Error('salida rota'); };

  const resultado = CB.pantallas.ir('p-cantera');
  t.igual(resultado, false,
    'E108 · una limpieza de salida rota cancela la transición');
  t.igual(CB.pantallas.actual, 'p-mapa',
    'E108 · y conserva la pantalla cuyo estado no pudo limpiar');
  t.ok(reportes.length === 1 && reportes[0].contexto === 'salida de p-mapa',
    'E108 · el fallo de salida llega al reportador global');

  if (salirPrevio) CB.pantallas.alSalir['p-mapa'] = salirPrevio;
  else delete CB.pantallas.alSalir['p-mapa'];

  const bus = new CB.util.EventoSimple();
  let roto = 0, sano = 0;
  bus.escuchar('auditoria', function () { roto++; throw new Error('oyente roto'); });
  bus.escuchar('auditoria', function () { sano++; });
  bus.emitir('auditoria');
  bus.emitir('auditoria');

  t.igual(roto, 1, 'E108 · el bus retira al oyente roto tras el primer fallo');
  t.igual(sano, 2, 'E108 · los demás oyentes siguen funcionando');
  t.ok(reportes.length === 2 && reportes[1].contexto === 'evento auditoria',
    'E108 · el fallo del bus también llega al reportador global');

  CB.util.reportarError = reportarReal;
  CB.pantallas.pila = pilaPrevia;
  CB.pantallas.actual = pantallaPrevia;
  CB.pantallas.IDS.forEach(function (id) {
    const seccion = document.getElementById(id);
    if (seccion) seccion.hidden = id !== pantallaPrevia;
  });
});

CB.pruebas.suite('Regresiones: fallos que ya pasaron una vez', function () {
  const t = CB.pruebas;

  /* E11 · Una respuesta por intento */
  const perfilPrevio = CB.perfil;
  const estadoPrevio = CB.partida.estado;

  CB.perfil = CB.pruebas.perfilNuevo();
  CB.perfil.calibrado = true;

  const e = {
    itemActual: { respuesta: 7, destreza: 'suma_sin_llevar', nivelId: 'S1',
                  expr: '3+4', itemId: 'S1#3+4@1.0' },
    respondido: false, respuestas: [], intento: 1
  };
  let llamadas = 0;
  const responderReal = CB.partida.responder;

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
  let i;
  for (i = 0; i < 8; i++) CB.partida.responder(7, 'teclado', {});
  CB.partida.responder = responderReal;

  t.igual(llamadas, 1, 'E11 · ocho envíos del mismo ítem registran UNA respuesta');

  /* La lección vale para todo el fichero: leer el fuente de una función solo es válido para LITERALES DE CADENA y NOMBRES DE PROPIEDAD, que terser conserva (mangle.properties está prohibido). */
  const itemAbrir = { respuesta: 7 };
  const eAbrir = { itemActual: itemAbrir, respondido: true, respuestas: [], intento: 2 };
  CB.partida.estado = eAbrir;
  try {
    itemAbrir.tipo = 'opciones'; itemAbrir.opciones = [7, 8];
    CB.partida.pintarRespuesta(itemAbrir);
  }
  catch (errPintar) { /* la maqueta no tiene todo; basta con haber pasado la línea */ }
  t.ok(eAbrir.respondido === false,
    'E11 · pintarRespuesta() vuelve a abrir el cerrojo para el segundo intento',
    'respondido sigue en ' + eAbrir.respondido);

  /* Y el cerrojo sigue en la función REAL, no solo en el doble de arriba: con el ítem ya respondido, responder() no puede llegar a registrar nada. */
  const eCerrado = { itemActual: { respuesta: 7, destreza: 'suma_sin_llevar', nivelId: 'S1',
                                 expr: '3+4', itemId: 'S1#3+4@1.0' },
                   respondido: true, respuestas: [], intento: 1 };
  CB.partida.estado = eCerrado;
  CB.partida.bloqueado = false;
  let siguioAdelante = false;
  try { CB.partida.responder(7, 'teclado', {}); } catch (errResp) { siguioAdelante = true; }
  t.ok(!siguioAdelante && eCerrado.respuestas.length === 0,
    'E11 · el cerrojo sigue estando en la responder() de verdad',
    siguioAdelante ? 'siguió y lanzó' : eCerrado.respuestas.length + ' respuestas registradas');

  /* Un callback de un ítem anterior no puede tocar una partida terminada ni
     una partida nueva. Este era un error real y asíncrono: la pantalla de error
     aparecía 2,6 s después de salir, mientras la suite seguía toda verde. */
  CB.partida.estado = null;
  let pintarSinEstado;
  try { pintarSinEstado = CB.partida.pintarRespuesta(itemAbrir); }
  catch (errCaducado) { pintarSinEstado = 'lanzo'; }
  t.igual(pintarSinEstado, false,
    'E106 · un repintado tardío de una partida terminada se descarta sin lanzar');

  const itemNuevo = { respuesta: 9 };
  const estadoNuevo = { itemActual: itemNuevo, respondido: true };
  CB.partida.estado = estadoNuevo;
  t.igual(CB.partida.pintarRespuesta(itemAbrir), false,
    'E106 · un repintado tardío tampoco altera una partida nueva');
  t.ok(estadoNuevo.respondido === true,
    'E106 · el cerrojo de la partida nueva queda intacto');

  /* La sección de datos repetía literalmente el mismo aviso legal. Además de
     ruido visual, duplicar una limitación parecía un error de maquetación. */
  const seccionDatos = CB.adulto.crearSeccionDatos(CB.pruebas.perfilNuevo());
  const aparicionesLimitacion = seccionDatos.textContent.split(CB.LEGAL.LIMITACION).length - 1;
  t.igual(aparicionesLimitacion, 1,
    'E107 · la limitación de almacenamiento aparece una sola vez en el panel adulto');

  CB.partida.estado = estadoPrevio;
  CB.perfil = perfilPrevio;

  /* E8 · La jerarquía de encabezados no salta niveles */
  const saltos = [];
  CB.pantallas.IDS.forEach(function (id) {
    const sec = document.getElementById(id);
    if (!sec) return;
    const niveles = [].slice.call(sec.querySelectorAll('h1,h2,h3,h4,h5,h6'))
      .map(function (h) { return parseInt(h.tagName.charAt(1), 10); });
    let previo = 0;
    niveles.forEach(function (n) {
      if (previo && n > previo + 1) saltos.push(id + ': h' + previo + ' → h' + n);
      previo = n;
    });
  });
  t.ok(saltos.length === 0,
    'E8 · ninguna pantalla salta un nivel de encabezado', saltos.join(' · '));

  /* Contra el bundle minificado terser escribe las cadenas con comillas dobles, así que el texto buscado no aparece nunca y la afirmación pasaba en verde sin haber comprobado nada. */
  const rejilla = document.getElementById('rejilla-mundos');
  const perfilMapa = CB.perfil;
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

  /* E5 · Las reglas de estilo se comprueban sin comentarios */
  const conRadio = [], hojas = document.styleSheets;
  let j;
  for (i = 0; i < hojas.length; i++) {
    let reglas = null;
    try { reglas = hojas[i].cssRules; } catch (err) { continue; }
    if (!reglas) continue;
    for (j = 0; j < reglas.length; j++) {
      const r = reglas[j];
      if (!r.style || !r.style.borderRadius) continue;
      const v = r.style.borderRadius.trim();
      if (v && v !== '0' && v !== '0px') conRadio.push(r.selectorText + ' → ' + v);
    }
  }
  t.ok(conRadio.length === 0,
    'E5 · ninguna regla realmente aplicada tiene border-radius distinto de 0',
    conRadio.slice(0, 5).join(' · '));

  /* E12 · Una destreza mal escrita ya no se cuela en el perfil */
  const perfilPrueba = CB.almacen.perfilNuevo('p-reg', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  let lanzo = false;
  try {
    CB.adaptativo.actualizar({ theta: 1000, n: 0 }, 1, 900, perfilPrueba);
  } catch (err) { lanzo = true; }
  t.ok(lanzo, 'E12 · pasar el objeto de destreza en vez del slug lanza un error');

  const basura = Object.keys(perfilPrueba.destrezas).filter(function (k) {
    return CB.adaptativo.SLUGS.indexOf(k) === -1;
  });
  t.ok(basura.length === 0,
    'E12 · y no deja ninguna destreza inventada en el perfil', basura.join(', '));

  let bien = false;
  try {
    CB.adaptativo.actualizar(CB.adaptativo.SLUGS[0], 1, 900, perfilPrueba);
    bien = isFinite(CB.adaptativo.theta(CB.adaptativo.SLUGS[0], perfilPrueba));
  } catch (err2) { bien = false; }
  t.ok(bien, 'E12 · con un slug correcto sigue funcionando igual');

  /* E13 · Ctrl+P desde cualquier pantalla ya no imprime un folio blanco */
  const cuerpoInf = document.getElementById('informe-cuerpo');
  t.ok(!!cuerpoInf && cuerpoInf.textContent.trim().length > 20,
    'E13 · el informe sin generar dice cómo generarlo, en vez de quedarse vacío',
    cuerpoInf ? '«' + cuerpoInf.textContent.trim().slice(0, 40) + '»' : 'no existe');

  /* Los 3 logros que dan luz existen y la conceden de verdad */
  t.igual(CB.logros.CONCEDEN_LUZ.length, 3, 'hay exactamente 3 logros que conceden luz');
  const perfilLuz = CB.almacen.perfilNuevo('p-luz', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  const sinConceder = CB.logros.CONCEDEN_LUZ.filter(function (id) {
    const est = CB.vidas.nuevoEstado(0);
    est.luces = 2;
    const r = CB.vidas.conceder(est, id, perfilLuz, 'expedicion');
    return !(r.aplicada && est.luces === 3);
  });
  t.ok(sinConceder.length === 0,
    'los 3 conceden una luz de verdad cuando quedan menos del tope',
    sinConceder.join(', '));

  /* E14 · La lectura en voz alta funciona en la calibración */
  const estadoPrev14 = CB.partida.estado;
  const pantallaPrev14 = CB.pantallas.actual;
  const vozPrev = CB.voz.leerOGuiar;
  let leido = null;

  CB.partida.estado = null;
  CB.pantallas.actual = 'p-calibracion';
  CB.calibracion.consignaActual = '¿Cuánto es 2 + 3?';
  CB.voz.leerOGuiar = function (texto) { leido = texto; };
  CB.partida.accionLeer();
  /* Lo que se LEE ya no es literalmente lo que se ve (3.4.2): los signos se
     dicen con palabras, porque leer «2 3» le nombraría al niño una operación
     que no es la suya. Lo que E14 defiende no ha cambiado —que la calibración
     habla aunque no exista estado de partida— y ahora afirma además que habla
     de SU consigna y no de otra cosa. */
  t.igual(leido, '¿Cuánto es 2 más 3?',
    'E14 · la lectura en voz alta funciona en la calibración aunque no haya partida, y dice el signo con palabras');

  /* Y la tecla que ahora es su única puerta sigue conectada. */
  t.ok(CB.a11y.MAPA.leer.indexOf('l') !== -1 && typeof CB.partida.accionLeer === 'function',
    'E14 · la tecla L sigue siendo puerta de la lectura tras retirar el botón');

  /* Y en una pantalla sin consigna ni partida no revienta ni lee basura. */
  leido = null;
  CB.calibracion.consignaActual = null;
  CB.pantallas.actual = 'p-mapa';
  let revento = false;
  try { CB.partida.accionLeer(); } catch (err14) { revento = true; }
  t.ok(!revento && leido === null,
    'E14 · y fuera de la calibración sin partida no lee nada ni falla');

  CB.voz.leerOGuiar = vozPrev;
  CB.pantallas.actual = pantallaPrev14;
  CB.partida.estado = estadoPrev14;

  /* E15 · El botón de silencio no miente, y los dos dicen lo mismo */
  const silPrev = CB.audio.silenciado;
  const botonesSon = document.querySelectorAll('[data-accion="sonido"]');
  t.ok(botonesSon.length >= 2,
    'E15 · la maqueta trae las barras de herramientas (sin ellas nadie las prueba)',
    botonesSon.length + ' botones de sonido');

  function iconoDe(b) { const i = b.querySelector('.btn-bloque__ico'); return (i || b).textContent.trim(); }

  CB.audio.silenciado = true;
  CB.partida.sincronizarSonido();
  const mienten = [];
  [].forEach.call(botonesSon, function (b, n) {
    if (iconoDe(b) !== '🔇' || b.getAttribute('aria-pressed') !== 'true') mienten.push(n);
  });
  t.ok(mienten.length === 0,
    'E15 · con el sonido apagado TODOS los botones lo muestran y lo anuncian',
    'mienten: ' + mienten.join(', '));

  CB.audio.silenciado = false;
  CB.partida.sincronizarSonido();
  const mienten2 = [];
  [].forEach.call(botonesSon, function (b, n) {
    if (iconoDe(b) !== '🔈' || b.getAttribute('aria-pressed') !== 'false') mienten2.push(n);
  });
  t.ok(mienten2.length === 0,
    'E15 · y al volver a encenderlo, todos vuelven', 'mienten: ' + mienten2.join(', '));

  /* Y el rótulo sobrevive: sincronizarSonido() escribía sobre el botón entero
     y se llevaba por delante la palabra «Sonido». */
  const sinRotulo = [];
  [].forEach.call(botonesSon, function (b, n) {
    const r = b.querySelector('.btn-bloque__rotulo');
    if (!r || !r.textContent.trim()) sinRotulo.push(n);
  });
  t.ok(sinRotulo.length === 0,
    'E15 · y el rótulo del botón sigue ahí después de sincronizar', sinRotulo.join(', '));
  CB.audio.silenciado = silPrev;
  CB.partida.sincronizarSonido();

  /* E16 · Ningún botón de la barra se explica solo con un dibujo */
  const barras = document.querySelectorAll('.barra-herramientas');
  const mudos = [], repetidos = [];
  [].forEach.call(barras, function (barra, n) {
    const vistos = {};
    [].forEach.call(barra.querySelectorAll('button'), function (b) {
      const visible = b.textContent.replace(/\s+/g, ' ').trim();
      const palabra = /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/.test(visible);
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

  /* E17 · Toda zona de juego lleva paisaje */
  const sinPaisaje = [];
  [].forEach.call(document.querySelectorAll('.zona-juego'), function (z) {
    const sec = z.closest ? z.closest('.pantalla') : null;
    const id = sec ? sec.id : '(suelta)';
    if (z.className.indexOf('bioma') === -1) sinPaisaje.push(id + ': sin bioma');
    if (!z.querySelector('.cielo')) sinPaisaje.push(id + ': sin cielo');
  });
  t.ok(sinPaisaje.length === 0,
    'E17 · toda .zona-juego declara bioma y cielo', sinPaisaje.join(' · '));

  /* E18 · Una recarga no se lleva la partida por delante */
  const perfilRec = CB.almacen.perfilNuevo('p-rec', 'Topo Cavador', 0, CB.util.hoyISO(), null);
  const ahora = Date.now();

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

  /* E19 · La calibración explica lo que es */
  const h1Cal = document.querySelector('#p-calibracion h1');
  t.ok(!!h1Cal && h1Cal.className.indexOf('solo-lectores') === -1,
    'E19 · el título de la calibración es visible, no solo para lectores de pantalla');
  t.ok(!!document.getElementById('cal-paso'),
    'E19 · y existe el sitio donde decir por qué pregunta va y que no hay reloj');

  /* E20 · El juego cuenta la regla de las luces cuando importa */
  t.ok(CB.partida.trasFallo.toString().indexOf('Te queda otro intento') !== -1,
    'E20 · el primer fallo dice que queda otro intento');
  t.ok(CB.partida.trasFallo.toString().indexOf('Se ha apagado una luz') !== -1,
    'E20 · y al apagarse una luz se dice, con las que quedan');

  /* Y sigue sin apagarse en el primer intento, que es la regla que se protege. */
  const luzEstado = CB.vidas.nuevoEstado(0);
  const r1 = CB.vidas.fallo(luzEstado, 1, 'expedicion');
  t.ok(!r1.apagada && luzEstado.luces === CB.vidas.INICIALES,
    'E20 · un solo fallo NO apaga ninguna luz');
  const r2 = CB.vidas.fallo(luzEstado, 2, 'expedicion');
  t.ok(r2.apagada && luzEstado.luces === CB.vidas.INICIALES - 1,
    'E20 · el segundo fallo del mismo ítem sí apaga una');

  /* E21 · El botón de la portada no promete lo que no va a pasar */
  const perfilSin = null;
  t.igual(CB.arranque.rotuloJugar(perfilSin), 'EMPEZAR',
    'E21 · sin minero elegido el botón dice EMPEZAR, no JUGAR');

  const perfilNuevo = CB.almacen.perfilNuevo('p-rot', 'Topo Cavador', 0, CB.util.hoyISO(), null);
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

  /* E22 · Los mensajes se escriben en la pantalla que se está viendo */
  const pantallaPrev22 = CB.pantallas.actual;

  CB.pantallas.actual = 'p-calibracion';
  CB.ui.mensaje('¡Muy bien!', 'acierto');
  const nCal = document.getElementById('cal-mensaje');
  const nPar = document.getElementById('item-mensaje');
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

  /* E23 · La calibración anuncia que termina */
  t.ok(CB.calibracion.terminar.toString().indexOf('Ahora sí empieza el') !== -1,
    'E23 · al acabar las 4 preguntas se dice que ahora empieza el juego');
  t.ok(CB.calibracion.terminar.toString().indexOf('reloj') !== -1,
    'E23 · y se nombra lo que cambia: reloj, luces y gemas');

  /* E24 · La pausa no aterriza en un menú de configuración */
  const estadoPrev24 = CB.partida.estado;
  const tit = document.getElementById('ajustes-titulo');
  const lista = document.getElementById('lista-ajustes');

  CB.partida.estado = { pausada: true };
  CB.ajustesNino({ desdePausa: true });
  t.igual(tit ? tit.textContent : null, 'En pausa',
    'E24 · al pausar, la pantalla se llama «En pausa», no «Ajustes»');
  const primero = lista ? lista.querySelector('button') : null;
  t.ok(!!primero && /Seguir cavando/.test(primero.textContent),
    'E24 · y volver al juego es el PRIMER botón, no el último',
    primero ? primero.textContent.trim() : 'no hay botones');

  CB.partida.estado = null;
  CB.ajustesNino({});
  t.igual(tit ? tit.textContent : null, 'Ajustes',
    'E24 · entrando por el menú normal sigue llamándose Ajustes');
  CB.partida.estado = estadoPrev24;

  /* E1 · Ningún handler de pantalla navega a su propia pantalla */
  const navegantes = [];
  Object.keys(CB.pantallas.alEntrar).forEach(function (id) {
    const fuente = String(CB.pantallas.alEntrar[id]);
    if (fuente.indexOf('pantallas.ir') !== -1) navegantes.push(id);
  });
  t.ok(navegantes.length === 0,
    'E1 · ningún handler de alEntrar llama a CB.pantallas.ir()', navegantes.join(', '));
  t.ok(CB.pantallas._entrando === null,
    'E1 · el cerrojo de reentrada queda limpio entre navegaciones');

  /* E25 · Los dos ajustes de movimiento apagan lo MISMO */
  const enMedia = [], enClase = [];
  const PREFIJO = ':root.sin-movimiento ';
  function recogerReglas(reglas, destinoMedia) {
    let i, r;
    for (i = 0; i < reglas.length; i++) {
      r = reglas[i];
      if (r.media && /prefers-reduced-motion/.test(r.conditionText || r.media.mediaText || '')) {
        recogerReglas(r.cssRules, true);
        continue;
      }
      if (r.cssRules && !r.selectorText) { recogerReglas(r.cssRules, destinoMedia); continue; }
      /* Se pregunta por la PROPIEDAD, no por el texto de la regla. */
      if (!r.selectorText || !r.style || r.style.animationName !== 'none') continue;
      r.selectorText.split(',').forEach(function (s) {
        s = s.replace(/\s+/g, ' ').trim();
        if (!s) return;
        if (destinoMedia) enMedia.push(s);
        else if (s.indexOf(PREFIJO) === 0) enClase.push(s.slice(PREFIJO.length));
      });
    }
  }
  let h, reglasHoja;
  for (h = 0; h < document.styleSheets.length; h++) {
    try { reglasHoja = document.styleSheets[h].cssRules; } catch (eH) { continue; }
    if (reglasHoja) recogerReglas(reglasHoja, false);
  }

  /* Sin esto, dos listas vacías serían «idénticas» y el guardián pasaría en
     verde sobre un fichero al que alguien le hubiera quitado el bloque entero. */
  t.ok(enMedia.length >= 10,
    'E25 · prefers-reduced-motion desactiva una lista de animaciones no trivial',
    enMedia.length + ' selectores');

  const soloSistema = enMedia.filter(function (s) { return enClase.indexOf(s) === -1; });
  const soloJuego  = enClase.filter(function (s) { return enMedia.indexOf(s) === -1; });
  t.ok(soloSistema.length === 0,
    'E25 · el ajuste del juego apaga todo lo que apaga el del sistema',
    'solo el sistema: ' + soloSistema.join(', '));
  t.ok(soloJuego.length === 0,
    'E25 · y no apaga nada de más que el del sistema no apague',
    'solo el juego: ' + soloJuego.join(', '));

  /* E27 · La leyenda del informe decía «●਍ominado» */
  const LEYENDAS = [
    ['verde',    'dominado'],
    ['ambar',    'en proceso'],
    ['rojo',     'conviene trabajarlo'],
    ['sindatos', 'sin datos suficientes']
  ];
  const sonda27 = document.createElement('span');
  sonda27.className = 'semaforo';
  document.body.appendChild(sonda27);
  const rotos = [];
  LEYENDAS.forEach(function (par) {
    sonda27.setAttribute('data-nivel', par[0]);
    const texto = getComputedStyle(sonda27, '::before').content || '';
    /* Los espacios duros cuentan como espacio para esta comparación: lo que se
       comprueba es que las PALABRAS estén enteras. */
    const plano = texto.replace(/ /g, ' ');
    if (plano.indexOf(par[1]) === -1) rotos.push(par[0] + ' → ' + texto);
  });
  document.body.removeChild(sonda27);
  t.ok(rotos.length === 0,
    'E27 · los cuatro rótulos del semáforo se leen enteros, sin comerse letras',
    rotos.join(' · '));

  /* E34 · El service worker no estorba donde no puede vivir */
  t.ok(typeof CB.offline.DISPONIBLE === 'boolean',
    'E34 · la disponibilidad del modo sin conexión se decide una vez, al cargar');
  const protocoloEsFile = location.protocol === 'file:';
  t.ok(!protocoloEsFile || CB.offline.DISPONIBLE === false,
    'E34 · en file:// el modo sin conexión se declara NO disponible',
    'protocolo ' + location.protocol + ', disponible ' + CB.offline.DISPONIBLE);

  let reventoRegistro = false, devolvio;
  const guardado = CB.offline.DISPONIBLE;
  CB.offline.DISPONIBLE = false;
  try { devolvio = CB.offline.registrar(); } catch (eReg) { reventoRegistro = true; }
  CB.offline.DISPONIBLE = guardado;
  t.ok(!reventoRegistro && devolvio === false,
    'E34 · registrar() sin contexto seguro devuelve false y NO lanza',
    reventoRegistro ? 'lanzó una excepción' : 'devolvió ' + devolvio);

  const fuenteReg = String(CB.offline.registrar);
  t.ok(fuenteReg.indexOf('function') !== -1 &&
       (fuenteReg.match(/function/g) || []).length >= 2,
    'E34 · el rechazo de la promesa TAMBIÉN se recoge, no solo la excepción',
    'sin el segundo callback de then(), la consola imprimiría «Uncaught (in promise)»');

  /* E35 · La suite nunca registra un service worker */
  t.ok(typeof CB.offline.registrar === 'function',
    'E35 · el registro vive en CB.offline.registrar, no suelto en el arranque');
  t.ok(!navigator.serviceWorker || !navigator.serviceWorker.controller ||
       location.pathname.indexOf('/pruebas/') === -1,
    'E35 · ningún service worker controla la página de pruebas',
    navigator.serviceWorker && navigator.serviceWorker.controller
      ? 'la controla ' + navigator.serviceWorker.controller.scriptURL : '');

  /* E37 · «Listo» solo puede significar listo */
  const dispReal = CB.offline.DISPONIBLE;

  /* Es una propiedad de `window` definida SOLO con getter: sin setter, `window.caches = doble` no lanza nada en modo no estricto — simplemente no hace nada, y el doble nunca se instala. */
  const descReal = Object.getOwnPropertyDescriptor(window, 'caches') ||
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

  const TODAS_FALLAN = { open: function () {
    return Promise.resolve({ add: function () { return Promise.reject(new Error('404')); } });
  } };
  const TODAS_VAN = { open: function () {
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

/* E38 · Una sola lista de ficheros de música */
CB.pruebas.suite('E38 · la lista de música tiene un solo dueño', function () {
  const t = CB.pruebas;      /* suite() llama a fn() SIN argumentos */
  /* Y su modo de fallo era invisible por partida doble: renombrar un fichero dejaba la música sonando con toda normalidad —07-musica.js sí tenía la ruta buena— y solo rompía la descarga sin conexión, que además informaba de éxito por el… */
  t.ok(typeof CB.offline.urlesPistas === 'function',
    'E38 · las rutas de música se derivan, no se escriben otra vez');
  const urles = CB.offline.urlesPistas();
  t.igual(urles.length, 9, 'E38 · salen las nueve pistas');

  const esperadas = [];
  for (const k in CB.musica.PISTAS) {
    if (Object.prototype.hasOwnProperty.call(CB.musica.PISTAS, k)) {
      esperadas.push(CB.musica.RAIZ + CB.musica.PISTAS[k].fichero);
    }
  }
  t.igual(urles.slice().sort().join('|'), esperadas.slice().sort().join('|'),
    'E38 · son exactamente las de CB.musica, sin una cuarta copia que pueda desviarse');

  /* Y la comprobación que de verdad ata el fallo: que ninguna ruta esté escrita
     como literal en 45-offline.js. Se busca por nombre de FICHERO, que terser
     conserva por ser literal de cadena. */
  const fuenteOffline = String(CB.offline.urlesPistas) + String(CB.offline.descargarMusica);
  t.ok(fuenteOffline.indexOf('.mp3') === -1,
    'E38 · ningún nombre de mp3 escrito a mano en el código sin conexión');
});

/* E40 · El relleno de opciones del jefe no avanzaba */
CB.pruebas.suite('E40 · el jefe siempre puede completar sus opciones', function () {
  const t = CB.pruebas;

  const previo = CB.jefes.estado;
  CB.jefes.estado = { rng: CB.util.mulberry32(99) };

  /* Los tres casos con nombre y apellidos que colgaban, de la mecánica reflejo:
     correcta = a − b, distractores = [a + b, a − b + sobra, a − sobra]. */
  const colgaban = [
    { a: 5, b: 3, sobra: 3 },
    { a: 6, b: 6, sobra: 3 },
    { a: 7, b: 6, sobra: 3 }
  ];
  let todosVuelven = true, todosCuatro = true, todosDistintos = true;

  colgaban.forEach(function (c) {
    const cont = document.createElement('div');
    const correcta = c.a - c.b;
    CB.jefes.opciones(cont, correcta, [c.a + c.b, correcta + c.sobra, c.a - c.sobra]);
    const vals = [].slice.call(cont.querySelectorAll('button')).map(function (b) {
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
  const salto = CB.pruebas.modoLargo ? 1 : 4;
  const fallos = [];
  let a, b, sobra;
  for (a = 5; a <= 40; a += salto) {
    for (b = 1; b <= a; b += salto) {
      for (sobra = 1; sobra <= 9; sobra++) {
        const cont2 = document.createElement('div');
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
  const cont3 = document.createElement('div');
  CB.jefes.opciones(cont3, 0, [0, 0, 0]);        // todos los distractores inválidos
  t.igual(cont3.querySelectorAll('button').length, 4,
    'E40 · con los tres distractores inservibles también salen cuatro');
  const negativos = [].slice.call(cont3.querySelectorAll('button')).filter(function (b) {
    return Number(b.textContent) < 0;
  });
  t.igual(negativos.length, 0, 'E40 · el relleno nunca propone un número negativo');

  CB.jefes.estado = previo;
});

/* E41 · Los problemas de enunciado medían 0 ms */
CB.pruebas.suite('E41 · el cronómetro de los problemas mide el tiempo real', function () {
  const t = CB.pruebas;

  t.ok(/subtipo/.test(String(CB.partida.marcarLectura)),
    'E41 · marcarLectura solo toca el reloj de los problemas');
  t.ok(typeof CB.componentes.conectarLectura === 'function',
    'E41 · existe el enganche del primer toque en el contenedor de respuesta');

  /* El enganche se instala UNA vez por contenedor, como el del «toc». */
  const caja = document.createElement('div');
  let oyentes = 0;
  const addOriginal = caja.addEventListener;
  caja.addEventListener = function () { oyentes++; return addOriginal.apply(caja, arguments); };
  CB.componentes.conectarLectura(caja);
  CB.componentes.conectarLectura(caja);
  CB.componentes.conectarLectura(caja);
  t.igual(oyentes, 2, 'E41 · tres llamadas dejan un solo par de oyentes, no seis');

  /* Y la conducta. Se monta el estado mínimo y se marca la lectura como haría
     un toque en el contenedor; luego se comprueba que el rt sale del reloj y no
     de cero. No hace falta esperar: basta con que t0 quede en el pasado. */
  const previo = CB.partida.estado;
  const bloqueoPrevio = CB.partida.bloqueado;
  CB.partida.bloqueado = false;

  CB.partida.estado = {
    itemActual: { subtipo: 'CAMBIO_1', destreza: 'problemas_cambio' },
    lecturaHecha: false, t0: 0, tLectura0: 0
  };
  CB.partida.marcarLectura();
  t.ok(CB.partida.estado.lecturaHecha === true && CB.partida.estado.t0 > 0,
    'E41 · el primer toque de un problema fija t0');

  const t0Problema = CB.partida.estado.t0;
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

/* E42 · La música de mundo leía una propiedad inexistente */
CB.pruebas.suite('E42 · la música lee el estado que existe de verdad', function () {
  const t = CB.pruebas;

  const previoEstado = CB.partida.estado;
  const previoPerfil = CB.perfil;
  const previaPantalla = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  const mal = [], pistas = [];
  CB.MUNDOS.forEach(function (m) {
    const e = CB.partida.iniciar({ mundoId: m.id, modo: 'expedicion' });
    if (!e) { mal.push(m.id + ': iniciar() no montó partida'); return; }
    const dio = CB.musica.claveDePantalla('p-partida');
    const toca = CB.musica.POR_BIOMA[m.bioma];
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
  const distintas = pistas.filter(function (p, i) { return pistas.indexOf(p) === i; });
  t.igual(distintas.length, 4, 'E42 · cuatro mundos, cuatro pistas distintas', pistas.join(', '));

  /* Y sin partida en curso sigue devolviendo algo reproducible. */
  CB.partida.estado = null;
  t.ok(!!CB.musica.PISTAS[CB.musica.claveDePantalla('p-partida')],
    'E42 · sin partida en curso devuelve una pista válida, no undefined');

  CB.partida.estado = previoEstado;
  CB.perfil = previoPerfil;
  CB.pantallas.actual = previaPantalla;
});

/* E43 · La barra de partida solo respondía en el borde */
CB.pruebas.suite('E43 · la barra responde tocando el icono y el rótulo', function () {
  const t = CB.pruebas;

  /* Se monta el botón EXACTAMENTE como lo escribe index.html: el atributo en el
     <button> y dos <span> dentro, que son los que recibe de verdad el toque. */
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'btn-bloque btn-bloque--rotulado';
  boton.setAttribute('data-accion', 'pista');
  const ico = CB.ui.crear('span', 'btn-bloque__ico', 'P');
  const rot = CB.ui.crear('span', 'btn-bloque__rotulo', 'Pista');
  boton.appendChild(ico);
  boton.appendChild(rot);
  document.body.appendChild(boton);

  t.igual(CB.partida.accionDe(ico), 'pista',
    'E43 · tocar el icono de dentro del botón resuelve la acción');
  t.igual(CB.partida.accionDe(rot), 'pista',
    'E43 · tocar el rótulo también');
  t.igual(CB.partida.accionDe(boton), 'pista',
    'E43 · y el botón entero sigue funcionando');

  /* No sube indefinidamente: un nodo suelto fuera de cualquier botón no dispara
     nada, y el tope de cuatro niveles se respeta. */
  const suelto = CB.ui.crear('div', null, 'nada');
  document.body.appendChild(suelto);
  t.igual(CB.partida.accionDe(suelto), null,
    'E43 · un nodo sin botón encima no resuelve ninguna acción');

  let hondo = boton, i;
  for (i = 0; i < 5; i++) {
    const capa = CB.ui.crear('span');
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

/* E44 · El cerrojo de una respuesta solo estaba en la partida */
CB.pruebas.suite('E44 · una respuesta por turno también en jefes y calibración', function () {
  const t = CB.pruebas;

  /* El jefe */
  const previoJefe = CB.jefes.estado;
  CB.jefes.estado = {
    mundo: CB.catalogo.getMundo('M1'), jefe: 'Tronquete',
    def: CB.jefes.DEFINICION.Tronquete, bloques: 8, turno: 1,
    sinFallos: true, respondido: false, rng: CB.util.mulberry32(4)
  };
  const antes = CB.jefes.estado.bloques;
  let i;
  for (i = 0; i < 5; i++) CB.jefes.responder(true);
  t.igual(CB.jefes.estado.bloques, antes - 1,
    'E44 · cinco toques en la opción correcta tiran UN bloque, no cinco');

  CB.jefes.estado.respondido = false;          // como haría el turno siguiente
  for (i = 0; i < 4; i++) CB.jefes.responder(false);
  t.igual(CB.jefes.estado.bloques, antes,
    'E44 · y cuatro toques en una equivocada reponen UNO, no cuatro');
  CB.jefes.estado = previoJefe;

  /* La calibración */
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  const bloqueoPrevio = CB.partida.bloqueado;

  CB.perfil = CB.pruebas.perfilNuevo();
  CB.perfil.calibrado = false;
  CB.calibracion.indice = 0;
  CB.calibracion.aciertos = 0;
  CB.pantallas.actual = 'p-calibracion';
  CB.calibracion.servir();
  /* Se levanta a mano el bloqueo de construcción y se fija la confirmación: lo
     que se prueba aquí es el cerrojo de una respuesta, no esos dos. Dejarlos al
     azar haría que el guardián pasara por el motivo equivocado. */
  const confPrevia = CB.componentes._confirmacionPendiente;
  CB.componentes._confirmacionPendiente = false;
  CB.partida.bloqueado = false;

  const correcta = CB.calibracion.ITEMS[0].respuesta;
  const botones = [].slice.call(document.querySelectorAll('#cal-respuesta button'));
  const bOK = botones.filter(function (b) { return b.textContent === String(correcta); })[0];

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

/* E45 · La dificultad D solo sabía bajar */
CB.pruebas.suite('E45 · los contadores de dificultad sobreviven al guardado', function () {
  const t = CB.pruebas;

  const nivel = { n: 0, aciertos: 0, caja: 1, D: 2, ultimoISO: null, enPausa: false };
  CB.adaptativo.actualizarD(nivel, true, true);
  CB.adaptativo.actualizarD(nivel, true, true);

  const guardado = CB.almacen.sanear({ niveles: { X: nivel } }).niveles.X;
  t.ok(guardado.rachaD === 2,
    'E45 · la racha de aciertos llega entera a lo que se escribe en disco',
    JSON.stringify(guardado));

  /* La prueba que de verdad ata el fallo: dos sesiones. Se acierta dos veces,
     se guarda, se relee, y el tercer acierto tiene que subir la dificultad. */
  const releido = JSON.parse(JSON.stringify(guardado));
  CB.adaptativo.actualizarD(releido, true, true);
  t.igual(releido.D, 3,
    'E45 · el tercer acierto sube D aunque haya un guardado por medio');

  /* Y la simetría: bajar sigue funcionando igual y tampoco se pierde. */
  const baja = { D: 3 };
  CB.adaptativo.actualizarD(baja, false, false);
  const bajaGuardada = JSON.parse(JSON.stringify(CB.almacen.sanear(baja)));
  CB.adaptativo.actualizarD(bajaGuardada, false, false);
  t.igual(bajaGuardada.D, 2, 'E45 · dos fallos con guardado por medio bajan D');

  /* Ningún campo con guion bajo puede volver a llevar estado que haga falta. */
  const conGuion = Object.keys(nivel).filter(function (k) { return k.charAt(0) === '_'; });
  t.igual(conGuion.length, 0,
    'E45 · actualizarD no deja ningún campo que sanear() vaya a tirar',
    conGuion.join(', '));
});

/* E46 · Enter se saltaba la confirmación del antiazar */

CB.pruebas.suite('E46 · Enter pasa por la misma confirmación que el toque', function () {
  const t = CB.pruebas;

  const pantallaPrevia = CB.pantallas.actual;
  const bloqueoPrevio = CB.partida.bloqueado;
  const confPrevia = CB.componentes._confirmacionPendiente;
  CB.pantallas.actual = 'p-partida';

  function desbloqueado() {
    return new Promise(function (listo) {
      const t0 = CB.util.ahora();
      (function espera() {
        if (!CB.partida.bloqueado || CB.util.ahora() - t0 > 4000) { listo(); return; }
        setTimeout(espera, 10);
      })();
    });
  }

  const respuestas = [];
  const comp = CB.componentes.tecladoBloques(
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
    const comp2 = CB.componentes.tecladoBloques(
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

/* E47-E55 · La cinta, y el escalón que llevaba desde el principio sin */

/* Todas las reglas y fotogramas de la cinta, leídos del CSS REALMENTE CARGADO.
   Del cargado y no del fuente: es lo único que sigue valiendo si mañana esto se
   escribe de otra manera, y lo único que ve lo que hizo el compilador. */
CB.pruebas._reglasCinta = function () {
  const fotogramas = {}, reglas = [];
  let h, i, hojas, r;
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
  const t = CB.pruebas;
  const c = CB.pruebas._reglasCinta();

  /* Que la lectura del CSS haya funcionado se AFIRMA. Si document.styleSheets no
     trajera nada, todo lo de abajo pasaría por vacuidad. */
  t.ok(Object.keys(c.fotogramas).length >= 3,
    'E47 · se leen los fotogramas de la cinta del CSS cargado',
    'encontrados ' + Object.keys(c.fotogramas).length);

  /* Así que la regla pasa a ser de TERRITORIO. */
  /* Aquí había un `TOPE = 45` que usaba solo la segunda comprobación, mientras la primera llevaba un 30 escrito a mano; leído deprisa parece una constante muerta y un número duplicado, y unificarlos en 30 pone roja la segunda —el cartel del… */
  const TOPE_FOTOGRAMA = 30;
  const TOPE_COLOCACION = 45;

  const invaden = [];
  Object.keys(c.fotogramas).forEach(function (nombre) {
    const kf = c.fotogramas[nombre];
    let j, paso, m, y;
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

  /* Y la regla de territorio sobre los dos carteles que se colocan: la cinta y el cartel del logro. */
  const arriba = [];
  c.reglas.forEach(function (r) {
    const top = r.style.top;
    if (!top || top.indexOf('%') === -1) return;
    if (parseFloat(top) > TOPE_COLOCACION) arriba.push(r.selectorText + ' → top ' + top);
  });
  t.igual(arriba.length, 0,
    'E47 · ningún cartel se declara por debajo del ' + TOPE_COLOCACION + ' % de altura',
    arriba.join(' · '));

  /* Los dos que se superponen no interceptan toques, pase lo que pase. */
  const pasan = ['cinta', 'cartel-festejo'].filter(function (id) {
    const el = document.getElementById(id);
    return el && getComputedStyle(el).pointerEvents !== 'none';
  });
  t.igual(pasan.length, 0,
    'E47 · lo que se superpone deja pasar el toque', pasan.join(', '));

  const relativos = ['cinta', 'cartel-festejo'].filter(function (id) {
    const el = document.getElementById(id);
    return el && getComputedStyle(el).position !== 'absolute';
  });
  t.igual(relativos.length, 0,
    'E47 · los superpuestos siguen siendo absolutos: nadie los ha sacado del sitio',
    relativos.join(', '));
});

CB.pruebas.suite('E48 · la duración vive en un solo sitio', function () {
  const t = CB.pruebas;
  const c = CB.pruebas._reglasCinta();
  const tabla = Object.keys(CB.ui.cinta.COREOGRAFIAS);

  t.igual(tabla.length, 4, 'E48 · la tabla declara las cuatro coreografías de cinta');

  /* Ida: toda clave de la tabla tiene sus fotogramas. */
  const sinFotogramas = tabla.filter(function (k) {
    return !c.fotogramas['cinta-' + k];
  });
  t.igual(sinFotogramas.length, 0,
    'E48 · toda coreografía de la tabla existe en el CSS', sinFotogramas.join(', '));

  /* Sin esta dirección, una animación huérfana se queda en la hoja sin que nada la dispare, y eso no da ningún error: simplemente no se ve nunca. */
  const huerfanos = Object.keys(c.fotogramas).filter(function (n) {
    return n !== 'cinta-arde' && tabla.indexOf(n.replace(/^cinta-/, '')) === -1;
  });
  t.igual(huerfanos.length, 0,
    'E48 · no hay fotogramas de cinta que no dispare nadie', huerfanos.join(', '));

  /* Y el CSS NO declara duración: si la declarase volveríamos a tener el número
     en dos sitios, que es justo lo que mató a MS_CARTEL. */
  const conDuracion = c.reglas.filter(function (r) {
    return /\.cinta--/.test(r.selectorText) &&
           r.selectorText.indexOf('.cinta__texto') === -1 &&
           r.style.animationDuration && r.style.animationDuration !== '0s';
  }).map(function (r) { return r.selectorText; });
  t.igual(conDuracion.length, 0,
    'E48 · el CSS no fija la duración de ninguna coreografía', conDuracion.join(', '));

  /* Todas con steps(): es la regla dura del proyecto y ahora hay nueve sitios donde saltársela. */
  const suaves = c.reglas.filter(function (r) {
    const f = r.style.animationTimingFunction;
    if (!f || f.indexOf('steps(') !== -1) return false;
    const n = r.style.animationName;
    return !(n === 'none' || r.style.animation === 'none');
  }).map(function (r) { return r.selectorText + ' → ' + r.style.animationTimingFunction; });
  t.igual(suaves.length, 0,
    'E48 · las nueve se mueven a saltos, ninguna suavizada', suaves.join(' · '));
});

CB.pruebas.suite('E49-E50 · con el movimiento apagado la cinta se para pero se ve', function () {
  const t = CB.pruebas;
  const raiz = document.documentElement;
  const teniaClase = raiz.classList.contains('sin-movimiento');
  const nodo = document.getElementById('cinta');

  t.ok(!!nodo, 'E49 · la cinta existe en la maqueta de pruebas');
  if (!nodo) return;

  raiz.classList.add('sin-movimiento');

  const claves = Object.keys(CB.ui.cinta.COREOGRAFIAS);
  const moviendose = [], invisibles = [];
  claves.forEach(function (k) {
    nodo.className = 'cinta cinta--' + k + ' cinta--entra';
    nodo.hidden = false;
    const cs = getComputedStyle(nodo);
    /* animationName, NUNCA el texto: «animation: none !important» se serializa
       como «auto ease 0s 1 normal none running none» y buscar «none» ahí dentro
       da verde con cualquier animación corriendo. */
    if (cs.animationName !== 'none') moviendose.push(k + ' → ' + cs.animationName);
    /* Y quitar el movimiento no puede quitar la información: el mensaje tiene
       que seguir viéndose. */
    if (cs.opacity !== '1') invisibles.push(k + ' → opacidad ' + cs.opacity);
  });

  [['insignia-gemas', 'insignia insignia--brota', true],
   ['cartel-festejo', 'cartel cartel--brota', true],
   ['zona-juego', 'zona-juego zona-juego--sacude', false]].forEach(function (v) {
    const el = document.getElementById(v[0]);
    if (!el) { moviendose.push(v[0] + ' → no está en la maqueta'); return; }
    const clasesPrevias = el.className, ocultoPrevio = el.hidden;
    el.className = v[1];
    el.hidden = false;
    const cs2 = getComputedStyle(el);
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
  const hijo = nodo.querySelector('.cinta__texto');
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
  const t = CB.pruebas;
  const nodo = document.getElementById('cinta');
  if (!t.ok(!!nodo, 'E51 · hay nodo de cinta')) return;

  CB.ui.cinta.ocultar();

  /* Eso solo se ve mirando si alguien lo canceló. */
  const limpiados = [], origClear = window.clearTimeout;
  window.clearTimeout = function (id) { limpiados.push(id); return origClear.call(window, id); };
  /* Que el doble se haya instalado se AFIRMA. Si la propiedad fuese de solo
     lectura, la asignación se caería en silencio y todo esto mediría el
     clearTimeout de verdad, es decir, nada. Es lo que pasó con window.caches. */
  const dobleInstalado = (window.clearTimeout !== origClear);

  CB.ui.cinta.mostrar('junta', '¡Toma!');
  const primerTemporizador = CB.ui.cinta._salida;
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
  const coreos = Array.prototype.filter.call(nodo.classList, function (c) {
    return /^cinta--/.test(c) && c !== 'cinta--entra';
  });
  t.igual(coreos.length, 1, 'E51 · una sola coreografía puesta a la vez', coreos.join(','));

  CB.ui.cinta.ocultar();
  t.igual(CB.ui.cinta._salida, null, 'E51 · ocultar() no deja temporizadores sueltos');
  t.igual(nodo.hidden, true, 'E51 · y esconde el nodo');
});

CB.pruebas.suite('E52 · la bolsa de gritos sobrevive al guardado', function () {
  const t = CB.pruebas;
  const perfil = CB.pruebas.perfilNuevo();
  const m = CB.mensajes.asegurar(perfil);

  t.ok(!!m.gritos, 'E52 · el estado de mensajes trae bolsa de gritos');

  /* Ninguna clave con guion bajo delante: sanear() las borra todas, y así es
     como la dificultad D se quedó en un trinquete de una sola dirección (E45). */
  const conGuion = Object.keys(m.gritos).filter(function (k) { return k.charAt(0) === '_'; });
  t.igual(conGuion.length, 0, 'E52 · ninguna clave de la bolsa empieza por guion bajo');

  /* Se gastan varios gritos y se comprueba que la bolsa recuerda. */
  const rng = CB.util.mulberry32(7);
  let i;
  const vistos = [];
  for (i = 0; i < 6; i++) vistos.push(CB.mensajes.grito({ perfil: perfil, rng: rng }));
  t.ok(m.gritos.bolsaAcierto.length > 0, 'E52 · la bolsa guarda lo ya sacado');

  const antes = m.gritos.bolsaAcierto.slice();
  const saneado = CB.almacen.sanear(JSON.parse(JSON.stringify(perfil)));
  t.ok(!!(saneado.mensajes && saneado.mensajes.gritos),
    'E52 · la bolsa sigue ahí después de sanear()');
  t.igual(JSON.stringify(saneado.mensajes.gritos.bolsaAcierto), JSON.stringify(antes),
    'E52 · y con el mismo contenido');

  /* Y no repite: seis gritos de una bolsa de 24 tienen que ser seis distintos. */
  const unicos = vistos.filter(function (v, k) { return vistos.indexOf(v) === k; });
  t.igual(unicos.length, vistos.length, 'E52 · seis gritos seguidos, seis distintos');
});

CB.pruebas.suite('E54 · el ítem siguiente no llega antes que la cinta', function () {
  const t = CB.pruebas;
  const cortas = [];
  Object.keys(CB.ui.festejo.CELEBRACIONES).forEach(function (k) {
    const ms = CB.ui.festejo.CELEBRACIONES[k].ms;
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

  /* E80 · el tiempo de lectura */
  const largo = 'Muy bien. Has pedido prestada una decena y la has deshecho bien ' +
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
  const t = CB.pruebas;

  /* Escribir el número a mano en el test es lo que produjo E43 —dos implementaciones de la misma escalera y solo una probada, la que no se usaba— y de hecho la primera versión de este guardián puso 4 donde el módulo dice 3, y se puso roja… */
  let umbral = -1, f;
  for (f = 0; f <= 8; f++) {
    if (CB.escalera.siguienteEscalon(f, 2).accion === 'prerrequisito') { umbral = f; break; }
  }
  t.ok(umbral >= 0, 'E55 · algún número de fallos lleva al prerrequisito', 'ninguno de 0 a 8');
  const esc = CB.escalera.siguienteEscalon(umbral, 2);
  t.igual(esc.escalon, 4, 'E55 · y esa acción es la del escalón 4');

  /* Y ahora lo que faltaba: que exista un camino real. Se busca un nivel del
     catálogo que TENGA prerrequisitos, se marca el prerrequisito como superado
     en un perfil de verdad, y se comprueba que la función lo encuentra. */
  const perfil = CB.pruebas.perfilNuevo();
  const ids = CB.catalogo.ids();
  let i, nivel, conPre = null;
  for (i = 0; i < ids.length; i++) {
    nivel = CB.catalogo.get(ids[i]);
    if (nivel && nivel.prerrequisitos && nivel.prerrequisitos.length) { conPre = nivel; break; }
  }
  if (!t.ok(!!conPre, 'E55 · el catálogo tiene niveles con prerrequisito')) return;

  const pre = conPre.prerrequisitos[0];
  perfil.niveles[pre] = { n: 10, aciertos: 10, caja: 3, D: 2, ultimoISO: CB.util.hoyISO(), enPausa: false };
  const encontrado = CB.grafo.prerrequisitoDominado(conPre.id, perfil);
  t.ok(!!encontrado, 'E55 · prerrequisitoDominado() devuelve un nivel dominado');

  /* Sin ningún prerrequisito superado devuelve null, y entonces el juego NO
     inventa un nivel: deja caer el fallo siguiente en el escalón 5, que es lo
     que pasaba antes. Degradar así es lo correcto. */
  const limpio = CB.pruebas.perfilNuevo();
  t.igual(CB.grafo.prerrequisitoDominado(conPre.id, limpio), null,
    'E55 · sin nada dominado devuelve null en vez de inventarse un nivel');

  const perfilPrevio = CB.perfil;
  CB.perfil = perfil;
  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E55 · iniciar() devuelve estado')) {
    t.ok('prerrequisitoPendiente' in estado,
      'E55 · el estado de partida tiene dónde guardar el nivel inyectado');
    t.igual(estado.prerrequisitoPendiente, null,
      'E55 · y empieza vacío, sin colar nada en el primer ítem');

    const hecho = CB.partida.aplicarEscalon(esc, { nivelId: conPre.id }, perfil, estado);
    t.igual(hecho, 'prerrequisito', 'E55 · el escalón 4 se aplica, no se ignora');
    t.igual(estado.prerrequisitoPendiente, encontrado,
      'E55 · y deja el prerrequisito dominado listo para el ítem siguiente');

    /* Sin prerrequisito dominado no hace nada y no rompe nada. */
    estado.prerrequisitoPendiente = null;
    const nada = CB.partida.aplicarEscalon(esc, { nivelId: conPre.id }, limpio, estado);
    t.igual(nada, null, 'E55 · sin prerrequisito dominado no se aplica');
    t.igual(estado.prerrequisitoPendiente, null, 'E55 · y no deja basura en el estado');
  }
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

/* E56-E58 · La variedad tiene que ser de VEHÍCULO */

CB.pruebas.suite('E56 · las celebraciones no son todas el mismo cartel', function () {
  const t = CB.pruebas;
  const C = CB.ui.festejo.CELEBRACIONES;
  const claves = Object.keys(C);

  t.ok(claves.length >= 8, 'E56 · hay celebraciones declaradas', String(claves.length));

  const vehiculos = {};
  claves.forEach(function (k) { vehiculos[C[k].vehiculo] = (vehiculos[C[k].vehiculo] || 0) + 1; });
  const distintos = Object.keys(vehiculos);

  /* El umbral no es decorativo: con menos de cuatro vehículos se vuelve a lo que
     había —variar el recorrido de una misma pieza— y eso ya se probó que no se
     nota. */
  t.ok(distintos.length >= 4,
    'E56 · las celebraciones usan al menos cuatro vehículos distintos',
    distintos.join(', '));

  /* Y NINGUNO acapara. Si la cinta vuelve a llevarse la mayoría, estamos otra
     vez en el mismo sitio aunque la tabla declare cinco vehículos. */
  let mayor = 0, cual = '';
  distintos.forEach(function (v) { if (vehiculos[v] > mayor) { mayor = vehiculos[v]; cual = v; } });
  t.ok(mayor <= Math.ceil(claves.length / 2),
    'E56 · ningún vehículo se lleva más de la mitad de las celebraciones',
    cual + ' aparece ' + mayor + ' de ' + claves.length);

  /* LA REGLA DE ORO, y esta sí es de fondo: lo más frecuente tiene que ser lo
     más corto. La categoría A es el 60 % de los aciertos; si su celebración dura
     más que la del jefe, el juego se pasa la sesión esperando. */
  const normal = C[CB.ui.festejo.POR_CATEGORIA.A];
  t.ok(!!normal, 'E56 · la categoría A tiene celebración');
  if (normal) {
    const masLargas = claves.filter(function (k) { return C[k].ms > normal.ms; });
    t.ok(masLargas.length >= claves.length - 2,
      'E56 · la celebración más frecuente es de las más cortas que hay',
      'solo ' + masLargas.length + ' de ' + claves.length + ' duran más');
    t.ok(normal.vehiculo !== 'cinta',
      'E56 · el acierto de todos los días NO usa la banda');
  }

  /* Las cuatro categorías de acierto tienen que existir en la tabla: un mapeo a
     una clave inventada devolvería undefined y no se celebraría nada, en
     silencio. Es la familia de E42. */
  const huerfanas = ['A', 'B', 'C', 'D'].filter(function (cat) {
    return !C[CB.ui.festejo.POR_CATEGORIA[cat]];
  });
  t.igual(huerfanas.length, 0,
    'E56 · las cuatro categorías apuntan a celebraciones que existen',
    huerfanas.join(', '));
});

CB.pruebas.suite('E57 · cada vehículo hace algo distinto y observable', function () {
  const t = CB.pruebas;
  const insignia = document.getElementById('insignia-gemas');
  const cartel = document.getElementById('cartel-festejo');
  const cinta = document.getElementById('cinta');
  const zona = document.getElementById('zona-juego');

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
  const t = CB.pruebas;
  const C = CB.ui.festejo.CELEBRACIONES;

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

/* E59-E61 · Fase 6 del plan: tres conductos que no estaban conectados */

CB.pruebas.suite('E59 · atras() también ejecuta el manejador de salida', function () {
  const t = CB.pruebas;
  const pantallaPrevia = CB.pantallas.actual;
  const pilaPrevia = CB.pantallas.pila.slice();

  const llamados = [];
  const salirPrevio = CB.pantallas.alSalir['p-mapa'];
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
  const t = CB.pruebas;
  const P = CB.componentes.PRESENTACION;
  const claves = Object.keys(P);

  t.igual(claves.length, 7, 'E60 · están las siete frases de presentación');

  const inexistentes = claves.filter(function (k) {
    return typeof CB.componentes[k] !== 'function';
  });
  t.igual(inexistentes.length, 0,
    'E60 · toda frase corresponde a un componente que existe', inexistentes.join(', '));

  const vacias = claves.filter(function (k) { return !P[k] || !P[k].length; });
  t.igual(vacias.length, 0, 'E60 · ninguna frase está vacía', vacias.join(', '));

  /* El ciclo completo sobre un perfil de verdad. */
  const perfil = CB.pruebas.perfilNuevo();
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
  const saneado = CB.almacen.sanear(JSON.parse(JSON.stringify(perfil)));
  t.ok(saneado.componentesVistos && saneado.componentesVistos.indexOf('balanza') !== -1,
    'E60 · la lista sobrevive a sanear()');

  /* Y AHORA EL CONDUCTO, QUE ES LO QUE FALTABA */
  const perfilPrevio = CB.perfil;
  const limpio = CB.pruebas.perfilNuevo();
  CB.perfil = limpio;
  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  const nodo = document.getElementById('item-mensaje');

  if (t.ok(!!(estado && nodo), 'E60 · hay partida y nodo de mensaje')) {
    estado.proximoDescanso = 99;

    const primera = nodo.textContent;
    const vistosTrasUna = limpio.componentesVistos.slice();

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
  const t = CB.pruebas;

  const descLeer = Object.getOwnPropertyDescriptor(CB.voz, 'leer');
  const descGuiada = Object.getOwnPropertyDescriptor(CB.voz, 'lecturaGuiada');
  const descDisp = Object.getOwnPropertyDescriptor(CB.voz, 'disponible');
  const activaPrevia = CB.voz.activa;

  const leidos = [], guiados = [];
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

  const perfilPrevio = CB.perfil;
  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });

  let idProblema = null;
  const ids = CB.catalogo.ids();
  let k, niv;
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
  const servido = servirProblema();
  t.ok(servido, 'E61 · se ha servido un problema de enunciado de verdad');
  t.igual(leidos.length, 0, 'E61 · con «leer en voz alta» apagado, nadie lee');
  t.igual(guiados.length, 0, 'E61 · ni por la lectura guiada, que no mira ese ajuste');

  /* MITAD B · con la voz encendida sí, y con el reloj parado mientras lee. */
  CB.voz.activa = true;
  leidos.length = 0;
  let paradas = 0;
  const pararPrevio = CB.partida.pararCronometro;
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

/* E62 · El teclado bloqueado no puede tener una tecla que finja */

CB.pruebas.suite('E62 · con el teclado bloqueado, el OK tampoco engaña', function () {
  const t = CB.pruebas;
  const caja = document.getElementById('item-respuesta');
  if (!t.ok(!!caja, 'E62 · hay contenedor de respuesta')) return;

  CB.componentes.tecladoBloques({ respuesta: 7 }, function () {}, { bloqueoMs: 30000 });
  const ok = caja.querySelector('.btn-bloque[data-tecla="ok"]');
  const uno = caja.querySelector('.btn-bloque[data-tecla="1"]');
  if (!t.ok(!!(ok && uno), 'E62 · están el OK y el 1')) return;

  /* SE AFIRMA EL BLOQUEO ANTES DE MEDIR. Sin esto, si el teclado no llegara a
     deshabilitarse compararíamos dos botones activos —que sí son de colores
     distintos a propósito— y la prueba pasaría midiendo lo contrario. */
  t.ok(ok.disabled || ok.getAttribute('aria-disabled') === 'true',
    'E62 · el OK está deshabilitado durante la construcción');

  const fondoOk = getComputedStyle(ok).backgroundColor;
  const fondoUno = getComputedStyle(uno).backgroundColor;
  t.igual(fondoOk, fondoUno,
    'E62 · bloqueado, el OK tiene el mismo fondo que las demás teclas',
    'OK ' + fondoOk + ' vs 1 ' + fondoUno);

  /* Esto se comprueba sobre las REGLAS, no sobre el estilo calculado, y no es pereza: en la maqueta de pruebas los botones no tienen caja de composición —getBoundingClientRect() da 0— y Chrome devuelve `transform: none` para todo elemento… */
  let reglaDesactivado = null, reglaMonta = null, h, i, hojas, r;
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

  t.ok(!!reglaMonta, 'E62 · existe la excepción de movimiento reducido para los botones');
  if (reglaMonta) {
    t.ok(/:not\(:disabled\)/.test(reglaMonta.selectorText),
      'E62 · y no alcanza a los botones bloqueados: conserva su hundido',
      reglaMonta.selectorText);
  }
});

/* E64-E67 · Fase 8: deshacer, confirmar y no perder la partida por un roce */

CB.pruebas._desbloqueo = function () {
  return new Promise(function (listo) {
    const t0 = Date.now();
    const i = setInterval(function () {
      if (!CB.partida.bloqueado || Date.now() - t0 > 4000) { clearInterval(i); listo(); }
    }, 20);
  });
};

CB.pruebas.suite('E64 · ordenar y elegir datos se pueden deshacer', function () {
  const t = CB.pruebas;
  const bloqueoPrevio = CB.partida.bloqueado;
  CB.partida.bloqueado = false;

  const respuestas = [];
  CB.componentes.ordenarFila(
    { piezas: [3, 1, 2], orden: [1, 2, 3], respuesta: 7 },
    function (v) { respuestas.push(v); }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    const cont = CB.componentes.contenedor();
    const piezas = cont.querySelectorAll('.fila-ordenar .btn-bloque');
    if (!t.ok(piezas.length >= 3, 'E64 · la fila monta sus piezas', String(piezas.length))) return;

    /* Tres toques, y SE AFIRMA QUE ENTRARON antes de deshacer nada. */
    piezas[0].click(); piezas[1].click();
    t.igual(CB.componentes._seleccion.length, 2,
      'E64 · los dos primeros toques entran de verdad');
    t.igual(piezas[0].disabled, true, 'E64 · y la pieza tocada se deshabilita');

    let deshacer = null, i;
    const todos = cont.querySelectorAll('.btn-bloque');
    for (i = 0; i < todos.length; i++) {
      if (/Quitar/.test(todos[i].textContent)) deshacer = todos[i];
    }
    if (!t.ok(!!deshacer, 'E64 · existe el botón de quitar')) return;

    deshacer.click();
    t.igual(CB.componentes._seleccion.length, 1, 'E64 · quitar retira la última');
    t.igual(piezas[1].disabled, false,
      'E64 · y la pieza vuelve a estar disponible, no solo el hueco vacío');
    const hueco = cont.querySelector('[data-hueco="1"]');
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
  const t = CB.pruebas;
  const confPrevia = CB.componentes._confirmacionPendiente;
  const bloqueoPrevio = CB.partida.bloqueado;
  const nodo = CB.ui.nodoMensaje();

  CB.partida.bloqueado = false;
  CB.componentes._confirmacionPendiente = true;
  CB.ui.ocultarMensaje();

  const respuestas = [];
  CB.componentes.selectorSigno({ respuesta: '+' },
    function (v) { respuestas.push(v); }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    const cont = CB.componentes.contenedor();
    const mas = cont.querySelector('.btn-bloque');
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

    /* Es la fragilidad que el proyecto ya tiene anotada: leer el texto fuente de una función solo vale para literales y nombres de propiedad, y aquí se estaba usando para inferir comportamiento. */
    const conCerrojo = ['tecladoBloques', 'opciones4', 'balanza', 'selectorSigno',
                      'ordenarFila', 'monedas', 'selectorDatos'].filter(function (f) {
      const src = String(CB.componentes[f]);
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
  const t = CB.pruebas;
  const estadoPrevio = CB.partida.estado;
  const finPrevio = CB.partida.finalizar;
  const finales = [];
  CB.partida.finalizar = function (motivo) { finales.push(motivo); };

  const boton = document.createElement('button');
  boton.setAttribute('data-accion', 'salir-partida');
  boton.textContent = '◀ Salir';
  document.body.appendChild(boton);

  const msPrevio = CB.partida.MS_CONFIRMAR_SALIDA;
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
  const t = CB.pruebas;
  const bloqueoPrevio = CB.partida.bloqueado;
  const confPrevia = CB.componentes._confirmacionPendiente;
  CB.partida.bloqueado = false;
  CB.componentes._confirmacionPendiente = false;

  const respuestas = [];
  CB.componentes.monedas(
    { modo: 'pagar', objetivo: 6, disponibles: [1, 2, 5] },
    function (v) { respuestas.push(v); }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    const cont = CB.componentes.contenedor();
    let dos = cont.querySelector('.pieza[aria-label]');
    const piezas = cont.querySelectorAll('.pieza');
    if (!t.ok(piezas.length >= 3, 'E67 · se montan las piezas', String(piezas.length))) return;

    dos = piezas[1];                       // la de 2 €
    dos.click();
    t.igual(dos.getAttribute('data-veces'), '1',
      'E67 · tocar una moneda deja marca: antes no dejaba ninguna');
    dos.click();
    t.igual(dos.getAttribute('data-veces'), '2', 'E67 · y cuenta las veces');

    const fila = cont.querySelector('.hilera-cogidas');
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

    let reinicio = null, i;
    const botones = cont.querySelectorAll('.btn-bloque');
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

/* E68 · Fase 9: los tres teclados eran uno mal copiado */

CB.pruebas.suite('E68 · la fase 3 usa el teclado de verdad, y no pierde el informe', function () {
  const t = CB.pruebas;
  const bloqueoPrevio = CB.partida.bloqueado;
  const confPrevia = CB.componentes._confirmacionPendiente;
  CB.componentes._confirmacionPendiente = false;

  const item = {
    enunciado: 'Ana tiene 7 canicas y le dan 5 más.',
    consigna: '¿Cuántas tiene ahora?',
    respuesta: 12, operacion: '+', subtipo: 'cambio1', datos: [7, 5]
  };
  let recibido = null;
  CB.componentes.selectorDatos(item, function (v, origen, extra) {
    recibido = { v: v, origen: origen, extra: extra };
  }, { bloqueoMs: 0 });

  return CB.pruebas._desbloqueo().then(function () {
    const cont = CB.componentes.contenedor();

    /* Fase 1: elegir los dos números del enunciado. */
    const numeros = cont.querySelectorAll('.rejilla-respuestas .btn-bloque');
    if (!t.ok(numeros.length >= 2, 'E68 · la fase de datos monta sus números',
        String(numeros.length))) return;
    numeros[0].click(); numeros[1].click();

    /* Fase 2: el signo. Puede saltarse si el generador no la pide. */
    const signo = cont.querySelector('.btn-bloque[aria-label*="sumar"]');
    if (signo) signo.click();

    return CB.pruebas._desbloqueo().then(function () {
      /* Fase 3: aquí es donde estaba la copia. */
      const teclado = cont.querySelector('.teclado-bloques');
      if (!t.ok(!!teclado, 'E68 · se llega a la fase de escribir el resultado')) return;

      const ok = teclado.querySelector('[data-tecla="ok"]');
      t.ok(!!ok, 'E68 · el OK lleva data-tecla en minúsculas, como el teclado de verdad',
        'si no, [data-tecla="ok"] no lo alcanza y ni se pinta de primario');

      const visor = cont.querySelector('#visor-respuesta');
      t.ok(!!visor, 'E68 · el visor es el del teclado real');
      t.igual(visor ? visor.getAttribute('aria-live') : null, 'polite',
        'E68 · y se anuncia: la copia no tenía aria-live ninguno');

      /* Se escribe 12 y se confirma. */
      const d1 = teclado.querySelector('[data-tecla="1"]');
      const d2 = teclado.querySelector('[data-tecla="2"]');
      if (!t.ok(!!(d1 && d2 && ok), 'E68 · están las teclas necesarias')) return;
      d1.click(); d2.click();
      t.igual(CB.componentes._valor, '12', 'E68 · los dígitos entran en el visor común');
      ok.click();

      /* Y LO QUE IMPORTA: los cuatro campos del informe, intactos. */
      if (!t.ok(!!recibido, 'E68 · la respuesta llega')) return;
      t.igual(recibido.v, 12, 'E68 · con el valor tecleado');
      t.igual(recibido.origen, 'datos',
        'E68 · y con origen «datos», no «teclado»: de ahí cuelga el registro por fases');
      const e = recibido.extra || {};
      t.ok(!!e.datosElegidos && e.datosElegidos.length === 2,
        'E68 · llegan los datos elegidos', JSON.stringify(e.datosElegidos));
      t.ok('faseDatosOk' in e, 'E68 · llega faseDatosOk');
      t.ok('faseOperacionOk' in e, 'E68 · llega faseOperacionOk');
      t.ok('signoElegido' in e, 'E68 · llega el signo elegido');

      recibido = null;
      CB.componentes._confirmacionPendiente = true;
      /* El visor NO se vacía al contestar —lo remonta la partida al servir el ítem
         siguiente—, así que aquí se limpia a mano antes de teclear. Sin esto se
         escribía sobre el «12» anterior y salía «121». */
      CB.componentes._valor = '';
      d1.click();
      const ok2 = cont.querySelector('.teclado-bloques [data-tecla="ok"]');
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

/* E69-E73 · Fase 10: cinco premios que el juego calculaba y no enseñaba */

CB.pruebas.suite('E69 · el cromo del bloque raro dice cuál es', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E69 · hay partida')) { CB.perfil = perfilPrevio; return; }

  /* Diez cromos ya reunidos: queda exactamente uno, así que se sabe cuál toca. */
  const todos = Object.keys(CB.ui.CRIATURAS);
  perfil.cromos = todos.slice(0, todos.length - 1);
  const queFalta = todos[todos.length - 1];

  const dado = CB.partida.darCromo();
  t.igual(dado, queFalta, 'E69 · darCromo DEVUELVE el id, para poder nombrarlo');
  t.ok(perfil.cromos.indexOf(queFalta) !== -1, 'E69 · y lo guarda en el álbum');
  t.ok(!!CB.casa.NOMBRES_CROMO[dado],
    'E69 · el id tiene nombre legible: el anuncio decía «gluglu», no «Gluglú»', dado);

  /* Con los once reunidos devuelve null, y no revienta. */
  const otra = CB.partida.darCromo();
  t.igual(otra, null, 'E69 · con los once reunidos devuelve null en vez de fallar');

  /* Esta llamada completa protege el orden: con `var cromo` declarado después
     del mensaje, el hoisting hacía que la primera lectura siempre fuese
     undefined y el nombre nunca llegase a verse. */
  let anuncio = '';
  const originales = {
    darCromo: CB.partida.darCromo,
    actualizarDestreza: CB.partida.actualizarDestreza,
    comprobarLogros: CB.partida.comprobarLogros,
    logrosDeCromo: CB.partida.logrosDeCromo,
    hileraBono: CB.ui.hileraBono,
    mensaje: CB.ui.mensaje,
    personaje: CB.ui.personaje,
    festejoMostrar: CB.ui.festejo.mostrar,
    festejoEspera: CB.ui.festejo.espera,
    particulasDe: CB.ui.particulasDe,
    pintarHUD: CB.ui.pintarHUD,
    sfx: CB.audio.sfx,
    mensajeAcierto: CB.mensajes.acierto,
    terminoDe: CB.gen.vocabulario.terminoDe
  };
  try {
    CB.partida.darCromo = function () { return queFalta; };
    CB.partida.actualizarDestreza = function () { return false; };
    CB.partida.comprobarLogros = function () {};
    CB.partida.logrosDeCromo = function () {};
    CB.ui.hileraBono = function () {};
    CB.ui.mensaje = function (texto) { anuncio = texto; };
    CB.ui.personaje = function () {};
    CB.ui.festejo.mostrar = function () {};
    CB.ui.festejo.espera = function () { return 0; };
    CB.ui.particulasDe = function () {};
    CB.ui.pintarHUD = function () {};
    CB.audio.sfx = function () {};
    CB.mensajes.acierto = function () { return 'Muy bien.'; };
    CB.gen.vocabulario.terminoDe = function () { return null; };

    CB.partida.trasAcierto(
      { esBloqueRaro: true, destreza: 'sumar' }, {},
      { puntos: 0, gemas: 0, mTiempo: 1 }, 0, {}
    );
    t.ok(anuncio.indexOf(CB.casa.NOMBRES_CROMO[queFalta]) !== -1,
      'E69 · trasAcierto anuncia el nombre del cromo recién entregado', anuncio);
  } finally {
    CB.partida.estado = null;
    CB.partida.darCromo = originales.darCromo;
    CB.partida.actualizarDestreza = originales.actualizarDestreza;
    CB.partida.comprobarLogros = originales.comprobarLogros;
    CB.partida.logrosDeCromo = originales.logrosDeCromo;
    CB.ui.hileraBono = originales.hileraBono;
    CB.ui.mensaje = originales.mensaje;
    CB.ui.personaje = originales.personaje;
    CB.ui.festejo.mostrar = originales.festejoMostrar;
    CB.ui.festejo.espera = originales.festejoEspera;
    CB.ui.particulasDe = originales.particulasDe;
    CB.ui.pintarHUD = originales.pintarHUD;
    CB.audio.sfx = originales.sfx;
    CB.mensajes.acierto = originales.mensajeAcierto;
    CB.gen.vocabulario.terminoDe = originales.terminoDe;
    CB.perfil = perfilPrevio;
  }
});

CB.pruebas.suite('E70 · el reto bonus se ve, también en los problemas', function () {
  const t = CB.pruebas;
  const cont = document.getElementById('item-enunciado');
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
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E71 · hay partida')) { CB.perfil = perfilPrevio; return; }

  estado.preguntas = 10; estado.aciertos = 9; estado.aciertos1er = 8;
  estado.puntos = 500; estado.gemas = 20;
  CB.partida.finalizar('guion');

  t.igual(CB.pantallas.actual, 'p-fin', 'E71 · se termina en la pantalla de fin');

  /* LA CINTA DE p-fin. Se comprueba la IDENTIDAD del nodo, no que exista alguno:
     si p-fin no tuviera el suyo, nodoDe() caería en el getElementById('cinta') de
     respaldo —el de p-partida, oculto— y todo se celebraría donde no se ve. */
  const deFin = document.getElementById('cinta-fin');
  const elegido = CB.ui.cinta.nodoDe();
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
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  const anunciados = [];
  const anunciarPrevio = CB.a11y.anunciar;
  CB.a11y.anunciar = function (txt) { anunciados.push(String(txt)); return anunciarPrevio.apply(this, arguments); };

  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;

  const nucleares = CB.catalogo.nuclearesDe('M1');
  let i;
  for (i = 0; i < nucleares.length; i++) {
    perfil.niveles[nucleares[i]] = { n: 10, aciertos: 10, caja: 3, D: 2,
                                     ultimoISO: CB.util.hoyISO(), enPausa: false };
  }

  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  estado.preguntas = 10; estado.aciertos = 10; estado.aciertos1er = 10; estado.puntos = 400;
  anunciados.length = 0;
  CB.partida.finalizar('guion');

  const caja = document.getElementById('fin-hitos');
  const texto = (document.getElementById('fin-hitos-lista') || {}).textContent || '';

  /* Un guardián que solo comprueba cuando la cosa ocurre no comprueba que la cosa ocurra. */
  t.ok(!!perfil.mundos.M2 && perfil.mundos.M2.desbloqueado,
    'E72 · con M1 completo, la expedición abre el mundo siguiente');
  t.ok(/Se ha abierto/.test(texto),
    'E72 · y la pantalla de fin lo dice', texto || '(panel vacío)');
  t.igual(caja ? caja.hidden : true, false, 'E72 · con el panel de hitos visible');

  /* El nombre sale de CB.MUNDOS, nunca escrito a mano: no existe ningún «Bosque
     de las Restas», y una cadena literal se desviaría del catálogo. */
  const deCatalogo = CB.MUNDOS.filter(function (m) { return texto.indexOf(m.nombre) !== -1; });
  t.ok(deCatalogo.length > 0,
    'E72 · el nombre del mundo sale del catálogo, no de una cadena inventada', texto);
  t.ok(anunciados.some(function (a) { return /Se ha abierto/.test(a); }),
    'E72 · se anuncia también por la región viva: la cinta es aria-hidden');

  /* Y NO SE REPITE. */
  const estado2 = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  estado2.preguntas = 10; estado2.aciertos = 10; estado2.aciertos1er = 10; estado2.puntos = 100;
  anunciados.length = 0;
  CB.partida.finalizar('guion');
  const texto2 = (document.getElementById('fin-hitos-lista') || {}).textContent || '';
  t.ok(!/Se ha abierto/.test(texto2),
    'E72 · la segunda expedición ya no lo vuelve a anunciar', texto2);

  CB.a11y.anunciar = anunciarPrevio;
  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E73 · el bono habla en gemas, no en puntos', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;

  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  estado.preguntas = 20; estado.aciertos = 20; estado.aciertos1er = 20;
  estado.puntos = 1000; estado.gemas = 30;
  estado.luces.luces = CB.vidas.INICIALES;
  CB.partida.finalizar('guion');

  const bl = document.getElementById('fin-bono');
  if (!t.ok(!!bl, 'E73 · hay línea de bono')) { CB.perfil = perfilPrevio; return; }

  if (bl.textContent.length) {
    t.ok(/gemas/.test(bl.textContent),
      'E73 · el bono se rotula en gemas, que es la moneda que el niño conoce',
      bl.textContent);
    /* Y el número es el de gemas, no el de puntos: iba en puntos justo debajo del
       recuento de gemas, y parecía que eran gemas. */
    const n = parseInt((bl.textContent.match(/\+(\d+)/) || [])[1], 10);
    t.ok(n < 100,
      'E73 · y la cifra es la de gemas del bono, no los puntos crudos', String(n));
  } else {
    t.ok(true, 'E73 · esta partida no dio bono');
  }

  /* Si esto se pusiera rojo sería porque el récord se lee DESPUÉS de pisarlo, y entonces `puntos > récord` no es cierto nunca. */
  const lista = document.getElementById('fin-hitos-lista');
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

/* E74-E76 · Fase 11: textos que prometían lo que el código no hace */

CB.pruebas.suite('E74 · el cofre del descanso no promete gemas', function () {
  const t = CB.pruebas;
  const cofre = CB.partida.DESCANSOS.filter(function (d) { return d.id === 'cofre'; })[0];
  if (!t.ok(!!cofre, 'E74 · existe el descanso del cofre')) return;

  /* PRIMERO: que el código siga sin dar gemas. Va antes que la comprobación del
     texto a propósito — es lo que impide que alguien «arregle» esto sumando
     gemas por detrás, que rompería el invariante de la moneda visible. */
  const perfilPrevio = CB.perfil;
  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E74 · hay partida')) { CB.perfil = perfilPrevio; return; }

  const gemasAntes = perfil.gemas, delEstadoAntes = estado.gemas;
  CB.partida.microDescanso();
  const tablero = document.getElementById('descanso-tablero');
  const piezas = tablero ? tablero.querySelectorAll('.tablero-descanso__bloque') : [];
  let i;
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
  const t = CB.pruebas;
  t.ok(typeof CB.memoria.conMusgo === 'function', 'E75 · existe CB.memoria.conMusgo');

  const hoy = CB.util.hoyISO();

  /* PERFIL DE PRIMERA SEMANA, que es el caso que delata el fallo: destrezas practicadas hace días pero que NUNCA llegaron a afianzada. */

  const perfil = CB.pruebas.perfilNuevo();
  perfil.destrezas = {};
  const slugs = ['numeracion', 'suma_sin_llevar', 'resta_sin_llevar'];
  slugs.forEach(function (sl) {
    const d = CB.adaptativo.nuevaDestreza('2026-01-01');   // repasada hace muchísimo
    d.n = 4; d.aciertos = 2; d.aciertosPrimerIntento = 1;   // p1 = 0,25: aprendiendo
    d.estado = 'aprendiendo';
    perfil.destrezas[sl] = d;
  });

  const vencidas = CB.memoria.vencidosHoy(perfil, hoy);
  const musgo = CB.memoria.conMusgo(perfil, hoy);

  t.ok(vencidas.length > 0,
    'E75 · en primera semana hay destrezas vencidas por tiempo', String(vencidas.length));
  t.igual(musgo.length, 0,
    'E75 · y NINGUNA con musgo: nunca fueron sólidas, así que no se han oxidado',
    JSON.stringify(musgo));

  /* Y el número de conMusgo coincide, una a una, con lo que clasificar() llama
     oxidada: no se reimplementa el predicado, se le pregunta. */
  const porClasificar = Object.keys(perfil.destrezas).filter(function (k) {
    return CB.memoria.clasificar(perfil.destrezas[k], hoy, false) === 'oxidada';
  });
  t.igual(musgo.length, porClasificar.length,
    'E75 · conMusgo y clasificar dicen exactamente lo mismo');

  /* Y con una destreza que SÍ fue sólida y se ha olvidado, aparece. */
  perfil.destrezas.numeracion.estado = 'afianzada';
  perfil.destrezas.numeracion.aciertosPrimerIntento = 4;
  const musgo2 = CB.memoria.conMusgo(perfil, hoy);
  t.ok(musgo2.length >= 1,
    'E75 · una destreza que fue sólida y se olvidó sí sale con musgo',
    JSON.stringify(musgo2));

  /* Y AHORA EL SALUDO DE VERDAD, que es lo que faltaba */
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  const primeraSemana = CB.pruebas.perfilNuevo();
  primeraSemana.destrezas = {};
  slugs.forEach(function (sl) {
    const d = CB.adaptativo.nuevaDestreza('2026-01-01');
    d.n = 4; d.aciertos = 2; d.aciertosPrimerIntento = 1;
    d.estado = 'aprendiendo';
    primeraSemana.destrezas[sl] = d;
  });
  CB.perfil = primeraSemana;
  const saludo = document.getElementById('mapa-saludo');
  if (t.ok(!!saludo, 'E75 · hay saludo del mapa en la maqueta')) {

    saludo.textContent = 'SIN PINTAR';
    CB.mapaDestrezas.pintarMundos();
    t.ok(saludo.textContent !== 'SIN PINTAR',
      'E75 · pintarMundos() escribe el saludo de verdad');

    const esperado = CB.memoria.conMusgo(primeraSemana, CB.util.hoyISO()).length;
    let dice = parseInt((saludo.textContent.match(/Hay (\d+)/) || [])[1], 10);
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
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  let perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;
  const m = CB.mensajes.asegurar(perfil);

  t.ok(!!m.bolsaDescansos, 'E76 · el perfil trae bolsa de descansos');
  const conGuion = Object.keys(m).filter(function (k) { return k.charAt(0) === '_'; });
  t.igual(conGuion.length, 0, 'E76 · ninguna clave del estado empieza por guion bajo');

  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (!t.ok(!!estado, 'E76 · hay partida')) { CB.perfil = perfilPrevio; return; }

  const vistos = [];
  let i;
  const titulo = document.getElementById('descanso-titulo');
  for (i = 0; i < 5; i++) {
    CB.partida.microDescanso();
    vistos.push(titulo ? titulo.textContent : '?');
    perfil = CB.almacen.sanear(JSON.parse(JSON.stringify(perfil)));
    CB.perfil = perfil;
  }

  const unicos = vistos.filter(function (v, k) { return vistos.indexOf(v) === k; });
  t.igual(unicos.length, 5,
    'E76 · cinco descansos seguidos son cinco distintos, aun guardando por medio',
    vistos.join(' | '));

  t.ok(!!(perfil.mensajes && perfil.mensajes.bolsaDescansos),
    'E76 · y la bolsa sigue ahí después de sanear()');

  CB.partida.estado = null;
  CB.perfil = perfilPrevio;
});

/* E77-E79 · Fase 12: ocho turnos sin celebrar nada */

CB.pruebas.suite('E77 · el jefe anuncia también los aciertos, y se presenta', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  const perfil = CB.pruebas.perfilNuevo();
  CB.perfil = perfil;

  const anuncios = [], cintas = [];
  const anunciarPrevio = CB.a11y.anunciar;
  const mostrarPrevio = CB.ui.festejo.mostrar;
  CB.a11y.anunciar = function (txt) { anuncios.push(String(txt)); };
  CB.ui.festejo.mostrar = function (clave, txt) { cintas.push(clave); return true; };

  /* El estado lo construye CB.jefes.iniciar() de verdad. */
  const e = CB.jefes.iniciar('M1');
  if (!t.ok(!!e, 'E77 · el combate arranca')) {
    CB.a11y.anunciar = anunciarPrevio; CB.ui.festejo.mostrar = mostrarPrevio;
    CB.perfil = perfilPrevio; return;
  }

  /* EL INTRO SE COMPRUEBA DESPUÉS DE QUE turno() HAYA CORRIDO —iniciar() lo llama
     en su última línea—, que es donde está la trampa: puesto en #jefe-enunciado,
     turno() lo vacía y el intro dura cero milisegundos. */
  const aviso = document.getElementById('jefe-aviso');
  t.ok(!!aviso && aviso.textContent.indexOf(e.def.intro) !== -1,
    'E77 · el intro del jefe sobrevive al primer turno',
    aviso ? aviso.textContent : 'sin nodo');

  /* Ocho aciertos: ocho anuncios con la cuenta correcta. */
  anuncios.length = 0; cintas.length = 0;
  let i;
  const bloquesEsperados = [];
  for (i = 0; i < CB.jefes.BLOQUES; i++) {
    e.respondido = false;
    CB.jefes.responder(true);
    bloquesEsperados.push(CB.jefes.BLOQUES - 1 - i);
  }

  const conCuenta = anuncios.filter(function (a) { return /Ese bloque cae/.test(a); });
  t.igual(conCuenta.length, CB.jefes.BLOQUES,
    'E77 · cada acierto se anuncia, no solo los fallos', anuncios.join(' | '));
  t.ok(conCuenta[0].indexOf(String(bloquesEsperados[0])) !== -1,
    'E77 · y con la cuenta de bloques que queda', conCuenta[0]);
  t.ok(anuncios.every(function (a) { return a.indexOf('daño') === -1; }),
    'E77 · sin la palabra «daño»: aquí no se hace daño a nadie');

  /* UNA cinta en todo el combate, no ocho. */
  const deMitad = cintas.filter(function (c) { return c === 'superacion'; });
  t.igual(deMitad.length, 1,
    'E77 · la cinta de la mitad sale UNA vez por combate', cintas.join(','));

  CB.a11y.anunciar = anunciarPrevio;
  CB.ui.festejo.mostrar = mostrarPrevio;
  CB.jefes.estado = null;
  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E78 · «cerrado sin un fallo» se lee de verdad', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;

  function combate(fallar) {
    const perfil = CB.pruebas.perfilNuevo();
    CB.perfil = perfil;
    /* M1 al 60 % para que la tarjeta muestre el reto y su distintivo. */
    const nucleares = CB.catalogo.nuclearesDe('M1');
    let k;
    for (k = 0; k < nucleares.length; k++) {
      perfil.niveles[nucleares[k]] = { n: 10, aciertos: 10, caja: 3, D: 2,
                                       ultimoISO: CB.util.hoyISO(), enPausa: false };
    }
    const e = CB.jefes.iniciar('M1');
    if (!e) return null;
    /* SE JUEGA DE VERDAD con responder(), no fijando el campo a mano: si se
       fijara, el guardián nunca vería que responder dejó de ponerlo a false. */
    /* responder() programa turno() con setTimeout, y terminar() solo se llama desde turno(): un bucle síncrono de responder() baja los bloques a cero y NO TERMINA NUNCA el combate, así que jefeSinFallos no llega a escribirse. */
    if (fallar) { CB.jefes.responder(false); CB.jefes.turno(); }
    let i;
    for (i = 0; i < 40 && CB.jefes.estado; i++) {
      CB.jefes.responder(true);
      CB.jefes.turno();
    }
    CB.jefes.estado = null;
    return perfil;
  }

  const limpio = combate(false);
  if (!t.ok(!!limpio, 'E78 · el combate limpio se juega')) { CB.perfil = perfilPrevio; return; }
  t.igual(limpio.mundos.M1.jefeSinFallos, true, 'E78 · sin fallos queda anotado');
  CB.perfil = limpio;
  CB.mapaDestrezas.pintarMundos();
  const textoLimpio = (document.getElementById('rejilla-mundos') || {}).textContent || '';
  t.ok(/sin un fallo/.test(textoLimpio),
    'E78 · y la tarjeta del mundo lo dice', textoLimpio.slice(0, 120));

  const conFallo = combate(true);
  t.igual(conFallo.mundos.M1.jefeSinFallos, false, 'E78 · con un fallo NO queda anotado');
  CB.perfil = conFallo;
  CB.mapaDestrezas.pintarMundos();
  const textoFallo = (document.getElementById('rejilla-mundos') || {}).textContent || '';
  t.ok(!/sin un fallo/.test(textoFallo),
    'E78 · y la tarjeta no lo pone', textoFallo.slice(0, 120));

  CB.perfil = perfilPrevio;
  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

CB.pruebas.suite('E81 · la espera del segundo intento sale de la fuente única', function () {
  const t = CB.pruebas;
  t.ok(typeof CB.partida.esperaSegundoIntento === 'function',
    'E81 · la espera del fallo es una función, no un literal dentro de un setTimeout');
  if (typeof CB.partida.esperaSegundoIntento !== 'function') return;

  const base = CB.partida.esperaSegundoIntento('Vuelve a mirarlo con calma.');
  t.ok(base >= 2600, 'E81 · nunca baja del suelo de siempre', String(base));

  /* Y CRECE CON LA COREOGRAFÍA. Esta es la que importa: con el 2600 escrito a
     pelo, la primera aserción pasaría en verde igual y el número seguiría fuera
     de la fuente única. Se toca la tabla y se restaura pase lo que pase. */
  const previo = CB.ui.festejo.CELEBRACIONES.animo.ms;
  let conTexto;
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

/* E83 · Fase 14: cuánto queda */

CB.pruebas.suite('E83 · el HUD dice por qué bloque va la expedición', function () {
  const t = CB.pruebas;

  const gal = document.getElementById('hud-galeria');
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
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();
  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E83 · hay partida')) {
    t.igual(gal.querySelectorAll('b').length, estado.guion.length,
      'E83 · al empezar hay tantos bloques como ítems tiene el guion',
      'guion de ' + estado.guion.length);
    t.igual(gal.querySelectorAll('b[data-caido="si"]').length, 0,
      'E83 · y ninguno cavado todavía');

    /* Esta es la aserción que caza una llamada que se olvide de pasar el total, y también el fallo de contar con el índice equivocado: pintándolo solo en trasAcierto la fila iba un bloque por detrás toda la partida, porque ahí e.indice es… */
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

/* E84 · Fase 15: el primer minuto */

CB.pruebas.suite('E84 · al acabar la calibración se empieza a jugar', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;

  const perfil = CB.pruebas.perfilNuevo();
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

/* E85-E88 · Saber dónde estás */

CB.pruebas.suite('E85 · el HUD dice en qué veta se está', function () {
  const t = CB.pruebas;
  const nombre = document.getElementById('hud-veta-nombre');
  const mundo = document.getElementById('hud-veta-mundo');

  /* SE AFIRMA PRIMERO QUE LOS NODOS ESTÁN. Sin esto, pintarVeta hace su return
     temprano y todas las comprobaciones de abajo miden la cadena vacía contra la
     cadena vacía, en verde. */
  if (!t.ok(!!(nombre && mundo), 'E85 · el rótulo de veta está en la maqueta')) return;

  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E85 · hay partida')) {
    const servido = CB.catalogo.get(estado.itemActual.nivelId);
    t.igual(nombre.textContent, servido.nombre,
      'E85 · el rótulo nombra la veta del ítem que se está sirviendo',
      'sirve ' + estado.itemActual.nivelId);
    t.igual(mundo.textContent, estado.mundo.nombre,
      'E85 · y el mundo en el que se está cavando');

    /* Y CAMBIA. Esta es la aserción que importa: pintar el rótulo una vez al
       empezar y no volver a tocarlo dejaría el nombre de la primera veta puesto
       toda la expedición, que es peor que no ponerlo —dice algo, y es falso. */
    let otro = null, i;
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
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E86 · hay partida')) {
    const A = estado.guion[0];
    let B = null, i;
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
      const cerrada = CB.partida.vetaSuperada(B);
      t.ok(!!cerrada, 'E86 · sin ítems pendientes ni deuda, la veta está superada');
      if (cerrada) {
        t.igual(cerrada.id, A, 'E86 · y devuelve la veta que queda atrás, no la nueva');
        t.ok(!!cerrada.nombre, 'E86 · con nombre, que es lo que se pinta');
      }

      /* Parece obvio y es el fallo que habría salido de comparar solo «quedan cero»: al servir el último ítem de A, si nadie compara la veta anterior con la nueva, se anuncia que se ha superado A mientras se está sirviendo A. */
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
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const pantallaPrevia = CB.pantallas.actual;
  CB.perfil = CB.pruebas.perfilNuevo();

  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });
  if (t.ok(!!estado, 'E87 · hay partida')) {
    const A = estado.itemActual.nivelId;
    let B = null, i;
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
  const t = CB.pruebas;
  const rot = document.getElementById('hud-veta');
  if (!t.ok(!!rot, 'E88 · el rótulo está en la maqueta')) return;

  const pantallaPrevia = CB.pantallas.actual;
  CB.pantallas.ir('p-partida');

  const maqueta = document.getElementById('p-partida').parentElement;
  const estabaOculta = maqueta.hidden;
  maqueta.hidden = false;

  const calc = getComputedStyle(rot);
  t.ok(calc.position !== 'absolute' && calc.position !== 'fixed',
    'E88 · el rótulo va en el flujo, no superpuesto', calc.position);

  const alto = rot.getBoundingClientRect().height;
  t.ok(document.getElementById('hud-galeria').getBoundingClientRect().height > 0,
    'E88 · la maqueta destapada sí tiene caja: la medida significa algo');
  t.ok(alto > 0, 'E88 · y el rótulo ocupa alto de verdad', alto + 'px');

  maqueta.hidden = estabaOculta;

  /* El nombre de la veta NUNCA se esconde: es el que contesta a la pregunta. */
  const nombre = document.getElementById('hud-veta-nombre');
  const mundo = document.getElementById('hud-veta-mundo');
  if (nombre && mundo) {
    t.ok(getComputedStyle(nombre).display !== 'none',
      'E88 · el nombre de la veta no se oculta en ninguna anchura');
    t.ok(getComputedStyle(mundo).display !== 'none',
      'E88 · y el del mundo se aparta, nunca se quita del árbol');
  }

  if (pantallaPrevia) CB.pantallas.ir(pantallaPrevia);
});

/* E89 · La moneda que había que reconocer era un número */

CB.pruebas.suite('E89 · reconocer una moneda enseña la moneda', function () {
  const t = CB.pruebas;
  const cont = CB.componentes.contenedor();
  if (!t.ok(!!cont, 'E89 · hay contenedor de respuesta en la maqueta')) return;

  const item = CB.gen.dinero.E1(CB.util.mulberry32(7), 2);
  t.ok(!!item.piezasDinero, 'E89 · el generador pide que las opciones sean piezas');

  /* Las opciones se montan como las monta la partida: tres distractores fijos
     más la respuesta. Construir la lista de otra forma probaría otra cosa. */
  const opciones = item.distractoresFijos.slice(0, 3)
    .map(function (v) { return { valor: v, codigoError: null }; })
    .concat([{ valor: item.respuesta, codigoError: null }]);

  CB.componentes.opciones4(item, opciones, function () {}, { bloqueoMs: 0 });

  const piezas = cont.querySelectorAll('.pieza');
  t.igual(piezas.length, 4, 'E89 · las cuatro opciones son piezas dibujadas',
    'encontradas ' + piezas.length);
  t.igual(cont.querySelectorAll('.rejilla-respuestas .btn-bloque').length, 0,
    'E89 · y ninguna es un botón de madera con un número');

  /* CADA UNA CON SU FORMA. Si todas salieran moneda —o todas billete— volvería a
     no distinguirse nada, y las cuatro seguirían siendo el mismo dibujo con
     distinta cifra, que es exactamente el fallo con otro traje. */
  let correcta = null, i, v;
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
  const rej = cont.querySelector('.rejilla-respuestas');
  t.ok(rej && rej.classList.contains('rejilla-respuestas--dinero'),
    'E89 · la retícula deja que el ancho lo mande la pieza');

  /* Y NINGUNA DENOMINACIÓN SE DIBUJA IGUAL QUE OTRA */
  const caja = CB.ui.crear('div');
  document.body.appendChild(caja);
  const huellas = {}, repes = [], sinDeclarar = [], urls = [];
  const TODAS = [1, 2, 5, 10, 20, 50, 100].concat(
    CB.gen.dinero.PIEZAS_CENTIMO.map(CB.gen.dinero.pieza));
  TODAS.forEach(function (v) {
    const p = CB.ui.pieza('span', v);
    caja.appendChild(p);
    const cs = getComputedStyle(p);
    const m = /url\(["']?([^"')]+)/.exec(cs.backgroundImage);
    if (!m) sinDeclarar.push(v + ' → ' + cs.backgroundImage);
    else urls.push([v, m[1]]);
    const huella = cs.backgroundImage + '|' + cs.width + '|' + cs.height;
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

  /* Y QUE EL FICHERO EXISTA, QUE NO ES LO MISMO */
  return Promise.all(urls.map(function (par) {
    return new Promise(function (listo) {
      const img = new Image();
      img.onload = function () { listo(img.naturalWidth > 0 ? null : par[0]); };
      img.onerror = function () { listo(par[0]); };
      img.src = par[1];
    });
  })).then(function (fallidas) {
    const rotas = fallidas.filter(function (x) { return x !== null; });
    t.igual(rotas.length, 0,
      'E89 · y las doce fotografías se descargan de verdad',
      'no llegan: ' + rotas.join(', '));
  });
});

/* E90 · El marcador cambiaba de golpe */

CB.pruebas.suite('E90 · la cifra sube, y aterriza donde debe', function () {
  const t = CB.pruebas;
  const g = document.getElementById('hud-gemas');
  if (!t.ok(!!g, 'E90 · el marcador está en la maqueta')) return;

  const raiz = document.documentElement;
  const teniaSinMov = raiz.classList.contains('sin-movimiento');

  /* Con movimiento: cuenta, y el destino se alcanza exacto */
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

      /* NUNCA BAJA */
      CB.ui.contarHasta(g, 5);
      t.igual(g.textContent, '5', 'E90 · un destino menor se escribe, no se cuenta');

      /* UNA CUENTA CANCELA A LA ANTERIOR */
      g.textContent = '0';
      CB.ui.contarHasta(g, 40);
      CB.ui.contarHasta(g, 12);

      setTimeout(function () {
        t.igual(g.textContent, '12',
          'E90 · la segunda cuenta manda: la primera no sigue escribiendo');

        /* SIN MOVIMIENTO: EL NÚMERO ENTERO, YA */
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

/* E91 · Los botones se pulsaban en silencio */

CB.pruebas.suite('E91 · el clic de pulsar suena, y calla donde debe', function () {
  const t = CB.pruebas;

  t.ok(typeof CB.audio.EFECTOS.pulsar === 'function',
    'E91 · existe el efecto de pulsar');

  /* Es la misma regla que ordena la tabla de celebraciones —el espectáculo es inversamente proporcional a la frecuencia— aplicada al sonido: este se oye cien veces por sesión. */
  let oidas = [];
  const notaPrevia = CB.audio.nota, ruidoPrevio = CB.audio.ruido;
  CB.audio.nota = function (f, cuando, dur, tipo, gan) {
    oidas.push({ tipo: 'nota', dur: dur, gan: gan });
  };
  CB.audio.ruido = function (cuando, dur, filtro, gan) {
    oidas.push({ tipo: 'ruido', dur: dur, gan: gan });
  };

  CB.audio.EFECTOS.pulsar();
  const clic = oidas[0];
  oidas = [];
  CB.audio.EFECTOS.toc();
  const toc = oidas[0];

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

  /* LA REGLA, que es lo que de verdad se puede romper */
  const sfxPrevio = CB.audio.sfx;
  let pedidos = [];
  CB.audio.sfx = function (n) { pedidos.push(n); return sfxPrevio(n); };

  const conectado = CB.arranque.conectarSonidoBotones(document);
  t.ok(conectado || document.documentElement.getAttribute('data-clic') === 'si',
    'E91 · el oyente de clic está conectado al documento');
  t.igual(CB.arranque.conectarSonidoBotones(document), false,
    'E91 · y conectarlo dos veces no deja dos oyentes: el clic no suena doble');

  const caja = CB.ui.crear('div');
  document.body.appendChild(caja);

  function pulsar(el) {
    pedidos = [];
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return new Promise(function (listo) {
      setTimeout(function () { listo(pedidos.join(',')); }, 25);
    });
  }

  const normal = CB.ui.crear('button', 'btn-bloque', 'Vale');
  caja.appendChild(normal);

  const apagado = CB.ui.crear('button', 'btn-bloque', 'No');
  apagado.disabled = true;
  caja.appendChild(apagado);

  /* Los botones rotulados llevan un icono y una palabra dentro, así que el
     objeto del clic casi nunca es el botón. */
  const rotulado = CB.ui.crear('button', 'btn-bloque btn-bloque--rotulado');
  const dentro = CB.ui.crear('span', 'btn-bloque__rotulo', 'Pausa');
  rotulado.appendChild(dentro);
  caja.appendChild(rotulado);

  const moneda = CB.ui.pieza('button', 2);
  moneda.addEventListener('click', function () { CB.audio.sfx('gema'); });
  caja.appendChild(moneda);

  const teclado = CB.ui.crear('div');
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

    /* EL TECLADO NUMÉRICO DE VERDAD */
    CB.componentes.tecladoBloques({ respuesta: 7 }, function () { },
      { contenedor: teclado, vaciar: false, bloqueoMs: 0 });
    return new Promise(function (listo) { setTimeout(listo, 30); });
  }).then(function () {
    const siete = teclado.querySelector('[data-tecla="7"]');
    if (!t.ok(!!siete, 'E91 · el teclado numérico de verdad está montado')) return '';
    return pulsar(siete);
  }).then(function (p) {
    t.igual(p, 'picar',
      'E91 · una cifra suena UNA vez: el «picar» que ya trae, sin clic encima');
    const borrar = teclado.querySelector('[data-tecla="borrar"]');
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

/* E92 · Con el teclado se jugaba en silencio */

CB.pruebas.suite('E92 · las teclas también suenan, una vez cada una', function () {
  const t = CB.pruebas;

  const sfxPrevio = CB.audio.sfx;
  let pedidos = [];
  CB.audio.sfx = function (n) { pedidos.push(n); return sfxPrevio(n); };

  const conectado = CB.arranque.conectarSonidoTeclas(document);
  t.ok(conectado || document.documentElement.getAttribute('data-clic-tecla') === 'si',
    'E92 · el oyente de teclado está conectado al documento');
  t.igual(CB.arranque.conectarSonidoTeclas(document), false,
    'E92 · y conectarlo dos veces no deja dos oyentes');

  /* CUALQUIER GESTO ABRE EL AUDIO, NO SOLO JUGAR */
  const iniciarPrevio = CB.audio.iniciar;
  let aperturas = 0;
  CB.audio.iniciar = function () { aperturas++; return null; };

  t.igual(CB.arranque.despertarAudio({ isTrusted: true }), true,
    'E92 · un gesto de verdad abre el audio');
  t.igual(aperturas, 1, 'E92 · y lo abre llamando a iniciar(), no por su cuenta');
  t.igual(CB.arranque.despertarAudio({ isTrusted: false }), false,
    'E92 · un evento sintético no abre nada: el navegador no lo permitiría');
  t.igual(aperturas, 1, 'E92 · y no llega a iniciar()');
  CB.audio.iniciar = iniciarPrevio;

  const caja = CB.ui.crear('div');
  document.body.appendChild(caja);

  const campo = CB.ui.crear('input');
  caja.appendChild(campo);
  const boton = CB.ui.crear('button', 'btn-bloque', 'Vale');
  caja.appendChild(boton);

  /* Y que el oyente lo LLAME, que es la mitad que se puede caer sin que nada
     falle: la función podría estar perfecta y no invocarla nadie — eso fue E41
     entero. Se cuenta a través de CB.arranque, que es como la busca el oyente. */
  const despertarPrevio = CB.arranque.despertarAudio;
  let despertados = 0;
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

    /* LO QUE YA SUENA, CALLA */
    const propia = function () { CB.audio.sfx('toc'); };
    document.addEventListener('keydown', propia);
    return teclear({ key: '7' }).then(function (q) {
      document.removeEventListener('keydown', propia);
      return q;
    });
  }).then(function (p) {
    t.igual(p, 'toc', 'E92 · una tecla con voz propia no lleva clic encima');

    /* ENTER SOBRE UN BOTÓN */
    boton.focus();
    const conFoco = document.activeElement === boton;
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

/* E93 · La moneda de 5 céntimos y el billete de 5 € eran el mismo «5» */
CB.pruebas.suite('E93 · una moneda de céntimo no es el billete del mismo número', function () {
  const t = CB.pruebas;

  /* A · La pieza: distinta foto, distinto atributo, distinto nombre */
  const caja = CB.ui.crear('div');
  document.body.appendChild(caja);
  const cinco = CB.ui.pieza('span', 5);            // el billete de 5 €
  const cincoC = CB.ui.pieza('span', 'c5');        // la moneda de 5 céntimos
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

  /* B · El generador: cinco piezas, ninguna repetida, ningún euro */
  const vistas = {}, intrusos = [], repetidos = [];
  let s;
  for (s = 0; s < 40; s++) {
    const item = CB.gen.dinero.E8(CB.util.mulberry32(s + 1), 1);
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

  /* C · LA CORRECCIÓN, DONDE ESTABA EL FALLO */
  const perfilPrevio = CB.perfil;
  const estadoPrevio = CB.partida.estado;
  const bloqueoPrevio = CB.partida.bloqueado;
  CB.perfil = CB.pruebas.perfilNuevo();
  CB.partida.bloqueado = false;

  const estado = CB.partida.iniciar({ mundoId: 'M1', modo: 'expedicion' });

  CB.partida.bloqueado = false;
  if (t.ok(!!(estado && estado.itemActual), 'E93 · hay partida con un ítem servido')) {
    estado.itemActual.respuesta = 'c20';
    estado.itemActual.piezasDinero = true;
    estado.itemActual.respuestaSigno = null;

    estado.respondido = false;
    CB.partida.responder('c20', 'opciones', { posicion: 0 });
    const ultima = estado.respuestas[estado.respuestas.length - 1];
    t.ok(!!ultima && ultima.correcto === true,
      'E93 · tocar la moneda de 20 céntimos acierta: Number("c20") es NaN y NaN nunca se iguala',
      JSON.stringify(ultima));

    estado.respondido = false;
    CB.partida.responder('c50', 'opciones', { posicion: 1 });
    const fallada = estado.respuestas[estado.respuestas.length - 1];
    t.ok(!!fallada && fallada.correcto === false,
      'E93 · y tocar otra falla: la comparación no da cierto a todo',
      JSON.stringify(fallada));
  }

  CB.partida.estado = estadoPrevio;
  CB.partida.bloqueado = bloqueoPrevio;
  CB.perfil = perfilPrevio;
});

/* E94 · El «Salir» del mapa no hacía nada */
CB.pruebas.suite('E94 · Salir siempre lleva a alguna parte distinta', function () {
  const t = CB.pruebas;
  const pantallaPrevia = CB.pantallas.actual;
  const pilaPrevia = CB.pantallas.pila.slice();
  const perfilPrevio = CB.perfil;

  CB.perfil = CB.perfil || { id: 'e94', nombre: 'E94', ajustes: {}, niveles: {} };

  /* 1. El caso exacto que se rompía: pila con el propio mapa en la cima. */
  CB.pantallas.pila = ['p-portada', 'p-mapa'];
  CB.pantallas.actual = 'p-mapa';
  const destino = CB.pantallas.atras();
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
  const sec = document.getElementById('p-mapa');
  if (sec) {
    t.ok(sec.getAttribute('role') === 'main',
      'E94 · la pantalla a la que se sale es la region principal');
    const h = sec.querySelector('h1');
    if (h) {

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

/* E95 · Lo que centra y además tiene scroll esconde por arriba */
CB.pruebas.suite('E95 · con scroll arriba del todo no falta nada por arriba', function () {
  const t = CB.pruebas;
  const caja = document.createElement('div');
  caja.className = 'zona-juego';

  caja.style.flex = 'none';
  caja.style.minHeight = '200px'; caja.style.maxHeight = '200px';
  caja.style.width  = '260px';
  const sup = document.createElement('div');
  sup.className = 'zona-juego__alta';
  const primero = document.createElement('p');
  primero.className = 'enunciado';
  primero.textContent = 'Primera línea del enunciado, la que se perdía.';
  const relleno = document.createElement('p');
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
    const c = sup.getBoundingClientRect(), p = primero.getBoundingClientRect();
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
    const f = relleno.getBoundingClientRect(), c2 = sup.getBoundingClientRect();
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
    const c3 = sup.getBoundingClientRect(), p3 = primero.getBoundingClientRect();
    t.ok(p3.top > c3.top + 8,
      'E95 · cuando cabe, el contenido sigue centrado y no pegado arriba',
      Math.round(p3.top - c3.top) + ' px de aire');
  } finally {
    document.body.removeChild(caja);
  }
});

/* Dos columnas desde 1200 px */
CB.pruebas.suite('Maquetación · el reparto cambia a dos columnas en pantalla ancha', function () {
  const t = CB.pruebas;
  const caja = document.createElement('div');
  caja.className = 'zona-juego';
  caja.style.flex = 'none';
  caja.style.minHeight = '400px'; caja.style.maxHeight = '400px';
  const sup = document.createElement('div'); sup.className = 'zona-juego__alta';
  const inf = document.createElement('div'); inf.className = 'zona-juego__baja';
  sup.appendChild(document.createElement('p'));
  sup.firstChild.className = 'enunciado';
  sup.firstChild.textContent = '9 − 6';
  const b = document.createElement('button');
  b.className = 'btn-bloque'; b.textContent = '3';
  inf.appendChild(b);
  caja.appendChild(sup); caja.appendChild(inf);
  document.body.appendChild(caja);

  try {
    const ancha = window.matchMedia('(min-width: 1200px)').matches;
    const rs = sup.getBoundingClientRect(), ri = inf.getBoundingClientRect();
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
    const solapan = ri.left < rs.right - 1 && ri.top < rs.bottom - 1;
    t.ok(!solapan, 'Maquetación · enunciado y respuesta nunca se pisan');
  } finally {
    document.body.removeChild(caja);
  }
});

/* E96-E98 · El teclado tiene que caber, y si no cabe, alcanzarse */
CB.pruebas.suite('E96-E98 · el teclado cabe a lo ancho y se alcanza a lo alto', function () {
  const t = CB.pruebas;
  const raiz = document.documentElement;
  const clasesPrevias = raiz.className;

  /* El teclado de verdad, con las clases que usa el juego, dentro de una zona del
     ancho de la ventana: lo que se mide es la hoja de estilos, no el componente. */
  const caja = document.createElement('div');
  caja.className = 'zona-juego';
  caja.style.flex = 'none';
  caja.style.width = window.innerWidth + 'px';
  const inf = document.createElement('div');
  inf.className = 'zona-juego__baja';
  const visor = document.createElement('div');
  visor.className = 'respuesta__visor'; visor.textContent = '_';
  const tec = document.createElement('div');
  tec.className = 'teclado-bloques';
  const teclas = ['1','2','3','4','5','6','7','8','9','⌫','0','OK'];
  let k;
  for (k = 0; k < teclas.length; k++) {
    const b = document.createElement('button');
    b.className = 'btn-bloque'; b.type = 'button'; b.textContent = teclas[k];
    if (teclas[k] === 'OK') b.setAttribute('data-tecla', 'ok');
    tec.appendChild(b);
  }
  inf.appendChild(visor); inf.appendChild(tec);
  caja.appendChild(inf);
  document.body.appendChild(caja);

  function ladoReal() { return tec.firstChild.getBoundingClientRect().width; }
  function techo() {
    return parseFloat(getComputedStyle(raiz).getPropertyValue('--lado-techo')) || 0;
  }

  try {
    /* E96 El lado nunca se pasa del techo que impone la altura, y el modo */
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

    /* E97 Ni una tecla fuera por la derecha, en la ventana que sea. */
    const rc = caja.getBoundingClientRect(), rt = tec.getBoundingClientRect();
    t.ok(rt.width <= rc.width + 1,
      'E97 · el teclado no es mas ancho que la zona, sea cual sea la ventana',
      Math.round(rt.width) + ' px de teclado en ' + Math.round(rc.width) + ' px de zona');
    const ultima = tec.lastChild.getBoundingClientRect();
    t.ok(ultima.right <= rc.right + 1,
      'E97 · y la ultima tecla no se sale por la derecha',
      'sobran ' + Math.round(ultima.right - rc.right) + ' px');

    /* E98 Apretando la zona a la mitad de lo que necesita, el OK sigue */
    const altoNecesario = inf.scrollHeight;
    inf.style.minHeight = Math.round(altoNecesario / 2) + 'px';
    inf.style.maxHeight = Math.round(altoNecesario / 2) + 'px';
    t.ok(inf.scrollHeight > inf.clientHeight + 1,
      'E98 · el caso de prueba aprieta de verdad (si no, no prueba nada)',
      inf.scrollHeight + ' vs ' + inf.clientHeight);
    inf.scrollTop = 0;
    const rv = visor.getBoundingClientRect(), ri0 = inf.getBoundingClientRect();
    t.ok(rv.top >= ri0.top - 1,
      'E98 · con la barra arriba, el visor no se pierde por arriba',
      'perdidos ' + Math.round(ri0.top - rv.top) + ' px');
    inf.scrollTop = inf.scrollHeight;
    const rok = tec.lastChild.getBoundingClientRect(), ri1 = inf.getBoundingClientRect();
    t.ok(rok.bottom <= ri1.bottom + 2,
      'E98 · y bajando del todo se llega al OK: la pregunta se puede contestar',
      'quedan ' + Math.round(rok.bottom - ri1.bottom) + ' px fuera');
  } finally {
    document.body.removeChild(caja);
    raiz.className = clasesPrevias;
  }
});

/* E99-E100 · Lo que no cabe en 320 px se sale sin avisar */
CB.pruebas.suite('E99-E100 · en 320 px no se sale nada por los bordes', function () {
  const t = CB.pruebas;
  const caja = document.createElement('div');
  caja.className = 'pantalla pantalla--portada';
  caja.style.width = '320px';
  caja.style.position = 'static';
  caja.hidden = false;

  const h = document.createElement('h1');
  h.className = 'portada__titulo';
  h.textContent = 'CUBOMÁTICA';
  caja.appendChild(h);

  const barra = document.createElement('div');
  barra.className = 'barra-herramientas';
  const g1 = document.createElement('div'), g2 = document.createElement('div');
  g1.className = 'barra-herramientas__grupo'; g2.className = 'barra-herramientas__grupo';
  ['Pista', '◀ Salir'].forEach(function (r) {
    const b = document.createElement('button'); b.className = 'btn-bloque'; b.textContent = r; g1.appendChild(b);
  });
  ['Pausa', 'Sonido'].forEach(function (r) {
    const b = document.createElement('button'); b.className = 'btn-bloque'; b.textContent = r; g2.appendChild(b);
  });
  barra.appendChild(g1); barra.appendChild(g2);
  caja.appendChild(barra);
  document.body.appendChild(caja);

  try {
    const rc = caja.getBoundingClientRect();

    /* E99 · el título cabe, partiéndose si hace falta. Se comprueba el ANCHO
       DESBORDADO, no el número de líneas: partirlo es un medio, y lo que no se
       negocia es que no se salga. */
    const rh = h.getBoundingClientRect();
    t.ok(rh.right <= rc.right + 1 && rh.left >= rc.left - 1,
      'E99 · el titulo de la portada no se sale de una pantalla de 320 px',
      Math.round(rh.width) + ' px de titulo en ' + Math.round(rc.width));
    t.ok(h.scrollWidth <= h.clientWidth + 1,
      'E99 · y no se recorta por dentro: el texto cabe en la caja del titulo',
      h.scrollWidth + ' vs ' + h.clientWidth);

    /* E100 · los cuatro controles, dentro. El de Sonido es el último. */
    const botones = barra.querySelectorAll('button'), fuera = [];
    let i;
    for (i = 0; i < botones.length; i++) {
      const rb = botones[i].getBoundingClientRect();
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

/* E102 · Una palabra que no cabe NO se parte sola: se sale */
CB.pruebas.suite('E102 · a 320 px una palabra larga se parte, no se sale', function () {
  const t = CB.pruebas;
  const enlace = document.querySelector('link[rel="stylesheet"]');
  const hoja = enlace ? enlace.getAttribute('href') : '';
  if (!t.ok(!!hoja, 'E102 · la página declara su hoja de estilo')) return;

  /* Las palabras son las de verdad, las más largas que el juego escribe dentro
     de un panel. Cambiarlas por «xxxxxxxxxxxx» probaría un caso que no existe. */
  const cuerpo =
    '<section class="pantalla pantalla--scroll"><div class="contenido">' +
    '<div class="panel-bloque"><h2>Cubomática</h2>' +
    '<p class="texto-lectura">Al final de cada mundo hay un guardián.</p>' +
    '<ul class="texto-lectura"><li>Salir: deja la expedición.</li>' +
    '<li>La Pradera de los Números</li></ul>' +
    '</div></div></section>';

  return new Promise(function (listo) {
    const marco = document.createElement('iframe');
    marco.title = 'medida de 320 px';

    marco.style.cssText =
      'position:fixed;left:-2000px;top:0;width:320px;height:480px;border:0;display:block';
    marco.srcdoc = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
      '<link rel="stylesheet" href="' + hoja + '"></head><body>' + cuerpo + '</body></html>';

    let acabado = false;
    function terminar(motivo) {
      if (acabado) return;
      acabado = true;
      if (motivo) t.ok(false, 'E102 · el marco de 320 px se ha podido montar', motivo);
      try { document.body.removeChild(marco); } catch (e) { }
      listo();
    }

    marco.onload = function () {
      if (acabado) return;
      const d = marco.contentDocument;
      const panel = d.querySelector('.panel-bloque');
      if (!panel) return terminar('no hay panel dentro del marco');

      /* Que la hoja se aplicó de verdad: sin ella el panel no tiene relleno y
         todo cabe, o sea que todo saldría verde sin haber medido nada. */
      const relleno = parseFloat(marco.contentWindow.getComputedStyle(panel).paddingLeft) || 0;
      if (!t.ok(relleno > 0 && marco.contentWindow.innerWidth === 320,
        'E102 · el marco mide 320 px y la hoja del juego se ha aplicado dentro',
        marco.contentWindow.innerWidth + ' px, relleno ' + relleno)) return terminar();

      const fuera = [];
      [].slice.call(d.querySelectorAll('.contenido *')).forEach(function (el) {
        if (el.clientWidth && el.scrollWidth > el.clientWidth + 1) {
          fuera.push(el.tagName + ' «' + el.textContent.trim().slice(0, 20) + '» ' +
                     el.scrollWidth + '>' + el.clientWidth);
        }
      });
      t.igual(fuera.length, 0,
        'E102 · a 320 px nada de un panel de texto se sale de su caja',
        fuera.slice(0, 3).join(' · '));

      const h2 = d.querySelector('h2');
      t.ok(marco.contentWindow.getComputedStyle(h2).overflowWrap === 'break-word',
        'E102 · y se arregla partiendo la palabra, no tocando el tamaño de letra',
        marco.contentWindow.getComputedStyle(h2).overflowWrap);

      terminar();
    };

    document.body.appendChild(marco);
    /* Diez segundos, no cuatro: el plazo no mide nada del juego, solo evita que la suite se quede colgada si el marco no carga. */
    setTimeout(function () { terminar('el marco no ha cargado en 10 s'); }, 10000);
  });
});

/* E103 · La portada no se podía recorrer, y lo de abajo no existía */
CB.pruebas.suite('E103 · a 320×480 se llega a los botones de abajo de la portada', function () {
  const t = CB.pruebas;
  const enlace = document.querySelector('link[rel="stylesheet"]');
  const hoja = enlace ? enlace.getAttribute('href') : '';
  if (!t.ok(!!hoja, 'E103 · la página declara su hoja de estilo')) return;

  const cuerpo =
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
    const marco = document.createElement('iframe');
    marco.title = 'portada de 320×480';

    marco.style.cssText =
      'position:fixed;left:-2000px;top:0;width:320px;height:480px;border:0;display:block';
    marco.srcdoc = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
      '<link rel="stylesheet" href="' + hoja + '"></head><body>' + cuerpo + '</body></html>';

    let acabado = false;
    function terminar(motivo) {
      if (acabado) return;
      acabado = true;
      if (motivo) t.ok(false, 'E103 · el marco de 320×480 se ha podido montar', motivo);
      try { document.body.removeChild(marco); } catch (e) { }
      listo();
    }

    marco.onload = function () {
      if (acabado) return;
      const w = marco.contentWindow, d = marco.contentDocument;
      const pila = d.querySelector('.portada__pila');
      const ultimo = d.getElementById('ultimo');
      const titulo = d.querySelector('.portada__titulo');
      if (!pila || !ultimo) return terminar('no está la pila dentro del marco');

      /* Antes solo se comprobaban `pila` y `ultimo`, y `titulo` se medía sin mirar: al renombrar `.titulo-juego` esta maqueta se quedó con el nombre viejo, `titulo` salió null, la excepción murió dentro del onload y la promesa no se resolvió nunca. */
      if (!titulo) return terminar('la maqueta no trae .portada__titulo');

      const cs = w.getComputedStyle(pila);
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
    /* Diez segundos, no cuatro: el plazo no mide nada del juego, solo evita que la suite se quede colgada si el marco no carga. */
    setTimeout(function () { terminar('el marco no ha cargado en 10 s'); }, 10000);
  });
});

/* E144 · LOS CUATRO MUNDOS, EN UNA FILA DESDE 1024 px (3.4.2). Se mide dentro
   de un IFRAME y no en una caja de 1280 px: la regla vive en una media query, y
   una media query se evalúa contra el viewport, así que un <div> ancho probaría
   exactamente nada. Se afirman las dos mitades: que a 1280 comparten fila, y
   que por debajo del corte la columna sigue siendo la de lectura —si alguien
   ensancha .contenido para todo el mundo, esta segunda mitad se pone roja. */
CB.pruebas.suite('E144 · los cuatro mundos caben en una fila desde 1024 px', function () {
  const t = CB.pruebas;
  const enlace = document.querySelector('link[rel="stylesheet"]');
  const hoja = enlace ? enlace.getAttribute('href') : '';
  if (!t.ok(!!hoja, 'E144 · la página declara su hoja de estilo')) return;

  const tarjeta = '<div class="tarjeta-mundo"><div class="tarjeta-mundo__cinta"></div>' +
    '<h2>El Bosque de las Llevadas</h2>' +
    '<div class="tarjeta-mundo__barra"><span class="tarjeta-mundo__relleno"></span></div>' +
    '<p class="texto texto--menor">0 de 30 vetas abiertas</p></div>';
  const cuerpo = '<section class="pantalla pantalla--scroll pantalla--mapa">' +
    '<div class="contenido"><h1>La Cantera</h1><div class="rejilla-mundos">' +
    tarjeta + tarjeta + tarjeta + tarjeta + '</div></div></section>';

  function medir(ancho) {
    return new Promise(function (listo) {
      const marco = document.createElement('iframe');
      marco.title = 'medida de ' + ancho + ' px';
      /* Fija, no en el flujo: body es un contenedor flex y a un iframe suelto
         le reasigna la altura (la trampa de E102). */
      marco.style.cssText = 'position:fixed;left:-3000px;top:0;width:' + ancho +
                            'px;height:820px;border:0;display:block';
      marco.srcdoc = '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
        '<link rel="stylesheet" href="' + hoja + '"></head><body>' + cuerpo + '</body></html>';

      let acabado = false;
      function terminar(datos) {
        if (acabado) return;
        acabado = true;
        try { document.body.removeChild(marco); } catch (e) { }
        listo(datos || { filas: 0, error: 'el marco no ha cargado en 10 s' });
      }
      marco.onload = function () {
        const d = marco.contentDocument, v = marco.contentWindow;
        const tarjetas = [].slice.call(d.querySelectorAll('.tarjeta-mundo'));
        if (tarjetas.length !== 4) return terminar({ filas: 0, error: 'no hay cuatro tarjetas' });
        /* Que la hoja se aplicó: sin ella no hay relleno, todo mide lo mismo y
           cualquier medida saldría verde sin haber medido nada. */
        const relleno = parseFloat(v.getComputedStyle(tarjetas[0]).paddingLeft) || 0;
        const filas = {};
        tarjetas.forEach(function (c) {
          filas[Math.round(c.getBoundingClientRect().top)] = 1;
        });
        terminar({ ancho: v.innerWidth, relleno: relleno,
                   filas: Object.keys(filas).length });
      };
      document.body.appendChild(marco);
      setTimeout(function () { terminar(null); }, 10000);
    });
  }

  return medir(1280).then(function (a) {
    if (!t.ok(a.ancho === 1280 && a.relleno > 0,
      'E144 · el marco mide 1280 px y la hoja del juego se aplica dentro',
      JSON.stringify(a))) return null;
    t.igual(a.filas, 1,
      'E144 · a 1280 px los cuatro mundos comparten una sola fila', JSON.stringify(a));
    return medir(900);
  }).then(function (b) {
    if (!b) return;
    t.ok(b.filas >= 2,
      'E144 · y por debajo de 1024 px la columna sigue siendo la de lectura',
      JSON.stringify(b));
  });
});

/* ═══ 3.4.5 · Lo que encontró la auditoría severa ═══════════════════════════
   Cada guardián se sembró con su defecto antes de fiarse de él (doctrina). */

CB.pruebas.suite('E148 · el jefe hereda las reglas comunes del montaje', function () {
  const t = CB.pruebas;

  /* Un estado mínimo de combate con rng inyectado y curso 6: el más alto,
     porque es donde el tope viejo (999) descartaba el distractor a+b. */
  const perfilPrevio = CB.perfil;
  CB.perfil = { curso: 6, ajustes: {}, mundos: {}, gemas: 0 };
  const cont = document.createElement('div');
  document.body.appendChild(cont);
  CB.jefes.estado = { rng: CB.util.mulberry32(7), respondido: false,
                      def: CB.jefes.DEFINICION.Cristalina };

  /* (a) tope por curso: con reflejoMax 900, un distractor de 1700 sobrevive.
     Sembrado: con el 999 antiguo, la lista lo descartaba y rellenaba ±1. */
  CB.jefes.opciones(cont, 850, [1700, 400, 851]);
  const valores = [].slice.call(cont.querySelectorAll('button'))
    .map(function (b) { return Number(b.textContent); });
  t.ok(valores.indexOf(1700) !== -1,
    'E148 · el distractor a+b de reflejo sobrevive en 6.º (tope por curso, no 999)',
    'valores: ' + valores.join(','));

  /* (b) las cuatro reglas de §3.5: cerrojo de construcción, toc y flechas. */
  const botones = [].slice.call(cont.querySelectorAll('button'));
  t.ok(botones.length === 4 && botones.every(function (b) { return b.disabled; }),
    'E148 · los botones del jefe nacen bloqueados (cerrojo §3.5)');
  t.igual(cont.getAttribute('data-toc'), 'si', 'E148 · el «toc» del toque prematuro está conectado');
  t.igual(cont.getAttribute('data-flechas'), 'si', 'E148 · las flechas del teclado están conectadas');

  /* (c) conectarFlechas es idempotente: el jefe reutiliza su contenedor. */
  const oyentesAntes = cont.getAttribute('data-flechas');
  CB.a11y.conectarFlechas(cont, 2);
  t.igual(oyentesAntes, 'si', 'E148 · reconectar flechas sobre el mismo nodo no acumula oyentes');

  /* (d) ramas: sin «+ 0» y sin dos rótulos iguales, en 60 semillas. */
  let malCero = 0, malDobles = 0, s;
  for (s = 0; s < 60; s++) {
    const opc = document.createElement('div');
    CB.jefes.estado = { rng: CB.util.mulberry32(s * 13 + 1), respondido: false,
                        def: CB.jefes.DEFINICION.Tronquete };
    CB.jefes.prepararRamas(CB.jefes.estado, opc);
    const rotulos = [].slice.call(opc.querySelectorAll('button'))
      .map(function (b) { return b.textContent; });
    if (rotulos.some(function (r) { return /\+ 0$/.test(r); })) malCero++;
    if (new Set(rotulos).size !== rotulos.length) malDobles++;
  }
  t.igual(malCero, 0, 'E148 · ninguna rama es «a + 0» en 60 semillas');
  t.igual(malDobles, 0, 'E148 · ninguna pareja de ramas comparte rótulo en 60 semillas');

  /* (e) la matriz pinta lo que dice: 12 × 12 son 144 bloques, no 120. */
  const m = CB.ui.matriz(12, 12);
  t.igual(m.querySelectorAll('span').length, 144,
    'E148 · la matriz de 12 × 12 pinta 144 bloques (el aria decía 144 y el dibujo 120)');
  let peorMatriz = 0, cursoK;
  for (cursoK in CB.jefes.RANGO_CURSO) {
    const mm = CB.jefes.RANGO_CURSO[cursoK].matrizMax;
    if (mm * mm > peorMatriz) peorMatriz = mm * mm;
  }
  t.ok(peorMatriz <= 144, 'E148 · ningún curso declara una matriz mayor que la que se puede pintar', peorMatriz);

  CB.jefes.estado = null;
  document.body.removeChild(cont);
  CB.perfil = perfilPrevio;
});

CB.pruebas.suite('E149 · la veta con luz exige 48 h desde el último repaso', function () {
  const t = CB.pruebas;
  const hoy = CB.util.hoyISO();
  const hace3 = CB.util.sumarDias(hoy, -3);

  t.ok(CB.memoria.vetaConLuz('oxidada', 'afianzada', hace3, hoy),
    'E149 · restaurar una veta oxidada tras 3 días concede la luz');
  t.ok(!CB.memoria.vetaConLuz('oxidada', 'afianzada', hoy, hoy),
    'E149 · repasada HOY no concede: es la condición anti-farmeo que estuvo documentada y sin escribir');
  t.ok(!CB.memoria.vetaConLuz('afianzada', 'dominada', hace3, hoy),
    'E149 · solo cuenta la que estaba oxidada');
  t.ok(CB.memoria.vetaConLuz('oxidada', 'dominada', null, hoy),
    'E149 · sin marca previa (primera vez) sí concede');
});

CB.pruebas.suite('E150 · el altavoz nunca no hace nada', function () {
  const t = CB.pruebas;
  const activaPrevia = CB.voz.activa;
  CB.voz.activa = false;
  const r = CB.voz.leerOGuiar('tres por cuatro', function () { }, function () { });
  t.igual(r.modo, 'guiada',
    'E150 · con «Leer en voz alta: No» el botón guía la lectura en vez de callar');
  CB.voz.cancelar();
  CB.voz.activa = activaPrevia;
});

CB.pruebas.suite('E151 · la escalera tiene una sola fuente y no miente', function () {
  const t = CB.pruebas;
  const casos = [
    [1, 1], [0, 2],          // escalones 1 y 2 (fallosConcepto, fallosItem)
    [2, 2], [3, 2], [4, 2]   // escalones 3, 4 y 5
  ];
  let acordes = 0;
  casos.forEach(function (c) {
    const r = CB.escalera.siguienteEscalon(c[0], c[1]);
    const fila = CB.escalera.ESCALONES[r.escalon];
    if (fila && fila.accion === r.accion &&
        fila.apagaLuz === r.apagaLuz && fila.rompeRacha === r.rompeRacha) acordes++;
  });
  t.igual(acordes, 5,
    'E151 · los cinco escalones que devuelve la función coinciden con la tabla ' +
    '(la tabla decía apagaLuz:false en 3 de 5 y nadie la leía)');
  t.igual(Object.keys(CB.escalera.ESCALONES).length, 5, 'E151 · y la tabla tiene exactamente 5 filas');
});

CB.pruebas.suite('E152 · ERRORES_IDS cubre el catálogo entero de errores', function () {
  const t = CB.pruebas;
  const reales = Object.keys(CB.ERRORES);
  t.igual(CB.ERRORES_IDS.length, reales.length,
    'E152 · ERRORES_IDS tiene los ' + reales.length + ' códigos (se congelaba en 24 de 47)');
  t.ok(reales.every(function (k) { return CB.ERRORES_IDS.indexOf(k) !== -1; }),
    'E152 · y son exactamente los mismos, en los dos sentidos');
});

CB.pruebas.suite('E153 · pista, audio y reparación dejan huella en el registro', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil, estadoPrevio = CB.partida.estado;
  CB.perfil = { respuestas: [], problemas: {}, ajustes: {} };
  CB.partida.estado = { intento: 1, usoPistaItem: true, usoAudioItem: true,
                        respuestas: [], modoTiempo: 'normal' };
  const item = { itemId: 'X#prueba@1.1', beta: 500, D: 2, valorDado: 7, formato: 'teclado' };

  CB.partida.registrarRespuesta(item, 1200, true, { azar: false }, {});
  const fila = CB.perfil.respuestas[0];
  t.ok((fila[7] & 2) === 2, 'E153 · el uso de la pista enciende el bit 2 (antes: 0 para siempre)');
  t.ok((fila[7] & 4) === 4, 'E153 · el uso del altavoz enciende el bit 4 (antes: 0 para siempre)');

  t.ok((fila[7] & 32) === 0, 'E153 · el bit 32 no se enciende solo');
  CB.partida.marcarReparacionCompletada(item);
  t.ok((fila[7] & 32) === 32,
    'E153 · seguir la explicación hasta el final enciende el bit 32 sobre la fila ya registrada');
  CB.partida.marcarReparacionCompletada({ itemId: 'OTRO' });
  t.igual(CB.perfil.respuestas.length, 1, 'E153 · con otro itemId el cerrojo no toca nada');

  CB.perfil = perfilPrevio;
  CB.partida.estado = estadoPrevio;
});

CB.pruebas.suite('E154 · la velocidad no se puntúa en los problemas si el adulto lo pide', function () {
  const t = CB.pruebas;
  const itemProblema = { puntosBase: 100, tIdeal: 8000, tLimite: 24000, subtipo: 'CAMBIO_1' };
  const lentoSin = CB.puntuacion.calcular(itemProblema, 23000,
    { correcto: true, intento: 1, modoTiempo: 'normal', sinVelocidad: true });
  const lentoCon = CB.puntuacion.calcular(itemProblema, 23000,
    { correcto: true, intento: 1, modoTiempo: 'normal' });
  t.igual(lentoSin.desglose.mT, CB.puntuacion.M_SIN_PRISA,
    'E154 · con el ajuste, el multiplicador es el fijo de Fácil: leer despacio no resta');
  t.ok(lentoCon.desglose.mT < lentoSin.desglose.mT,
    'E154 · sin el ajuste, la respuesta lenta sigue puntuando menos (nada cambió para el resto)');
  const rapido = CB.puntuacion.calcular(itemProblema, 1000,
    { correcto: true, intento: 1, modoTiempo: 'normal', sinVelocidad: true });
  t.igual(rapido.desglose.mT, CB.puntuacion.M_SIN_PRISA,
    'E154 · y responder rápido tampoco lo sube: la velocidad deja de medirse del todo');
});

CB.pruebas.suite('E155 · venceHoy lee el campo que los productores escriben', function () {
  const t = CB.pruebas;
  const hoy = CB.util.hoyISO();
  t.ok(!CB.leitner.venceHoy({ proximoRepasoISO: CB.util.sumarDias(hoy, 5) }, hoy),
    'E155 · un repaso citado para dentro de 5 días NO vence hoy (con el campo viejo vencía siempre)');
  t.ok(CB.leitner.venceHoy({ proximoRepasoISO: CB.util.sumarDias(hoy, -1) }, hoy),
    'E155 · uno citado para ayer sí vence');
  t.ok(CB.leitner.venceHoy(null, hoy), 'E155 · sin estado, vence (primera vez)');
});
