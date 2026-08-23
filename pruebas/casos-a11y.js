/* casos-a11y.js — lo que EN 301 549 obliga y ninguna otra suite miraba */

CB.pruebas.suite('Accesibilidad: navegación, regiones y nombres', function () {
  const t = CB.pruebas;

  const ENFOCABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
                  'select:not([disabled]), textarea:not([disabled]), ' +
                  '[tabindex]:not([tabindex="-1"])';

  /* 1. Saltarse los bloques repetidos (WCAG 2.4.1) */
  const enPartida = document.getElementById('p-partida');
  if (enPartida) {
    const orden = [].slice.call(enPartida.querySelectorAll(ENFOCABLE));
    const barra = enPartida.querySelector('.barra-herramientas');

    t.ok(!!barra, 'la partida tiene barra de herramientas que ordenar');
    const primeroDeBarra = orden.findIndex
      ? orden.findIndex(function (el) { return barra && barra.contains(el); })
      : -1;
    const hayFueraDespues = primeroDeBarra >= 0 && orden.slice(primeroDeBarra)
      .some(function (el) { return !barra.contains(el); });
    t.ok(!hayFueraDespues,
      'en la partida, la barra de herramientas es lo ÚLTIMO del orden de tabulación',
      'hay algo enfocable después de la barra');
  }

  /* 2. Cero tabindex positivo */
  const positivos = [].slice.call(document.querySelectorAll('[tabindex]'))
    .filter(function (el) { return parseInt(el.getAttribute('tabindex'), 10) > 0; });
  t.ok(positivos.length === 0, 'ningún elemento lleva un tabindex positivo',
    positivos.length + ' encontrados');

  /* 3. El Tab no se va a una pantalla que no se ve */
  const previa = CB.pantallas.actual;
  const fugas = [];
  CB.pantallas.IDS.forEach(function (id) {
    if (id === 'p-error') return;
    try { CB.pantallas.ir(id); } catch (e) { return; }
    const seccion = document.getElementById(id);
    if (!seccion) return;
    /* Solo se miran las OTRAS pantallas del juego. */
    CB.pantallas.IDS.forEach(function (otro) {
      if (otro === id) return;
      const s2 = document.getElementById(otro);
      if (!s2) return;
      [].slice.call(s2.querySelectorAll(ENFOCABLE)).forEach(function (el) {
        if (el.closest('[hidden]')) return;        // correctamente fuera del orden
        fugas.push(id + ' alcanza ' + otro + ' → ' + (el.id || el.className || el.tagName));
      });
    });
  });
  t.ok(fugas.length === 0,
    'estando en cualquier pantalla, el Tab no alcanza nada de las otras diecisiete',
    fugas.slice(0, 5).join(' · '));

  /* 4. Las dieciocho son regiones con nombre */
  const sinNombre = [], sinMain = [];
  CB.pantallas.IDS.forEach(function (id) {
    if (id === 'p-error') return;
    try { CB.pantallas.ir(id); } catch (e) { return; }
    const s = document.getElementById(id);
    if (!s) return;
    const idEtiqueta = s.getAttribute('aria-labelledby');
    const etiqueta = idEtiqueta ? document.getElementById(idEtiqueta) : null;
    if (!etiqueta || !etiqueta.textContent.trim()) sinNombre.push(id);
    if (s.getAttribute('role') !== 'main') sinMain.push(id);
    /* Y solo UNA lleva role=main: dieciocho «main» a la vez no es incorrecto,
       es que deja de significar nada. */
    const otras = CB.pantallas.IDS.filter(function (o) {
      const e = document.getElementById(o);
      return o !== id && e && e.getAttribute('role') === 'main';
    });
    if (otras.length) sinMain.push(id + ' comparte main con ' + otras.join(','));
  });
  t.ok(sinNombre.length === 0,
    'las 17 pantallas navegables tienen nombre accesible, tomado de su <h1>',
    sinNombre.join(', '));
  t.ok(sinMain.length === 0,
    'y en cada momento hay exactamente una con role="main": la visible',
    sinMain.slice(0, 4).join(' · '));

  if (previa) { try { CB.pantallas.ir(previa); } catch (e) { } }

  /* 5. DOS regiones vivas, con papeles distintos */
  const educada = document.getElementById('region-viva');
  const urgente = document.getElementById('region-urgente');
  t.ok(!!educada && educada.getAttribute('aria-live') === 'polite',
    'la región educada existe y es aria-live="polite"');
  t.ok(!!urgente && urgente.getAttribute('aria-live') === 'assertive' &&
       urgente.getAttribute('role') === 'alert',
    'la región urgente existe, es assertive y tiene role="alert"');
  if (urgente && educada) {
    CB.a11y.urgente('quedan cinco segundos');
    t.igual(urgente.textContent, 'quedan cinco segundos',
      'CB.a11y.urgente() escribe en la urgente');
    t.ok(educada.textContent.indexOf('quedan cinco') === -1,
      'y NO en la educada: son dos canales, no dos nombres del mismo');
    /* Un lector no repite un texto idéntico consecutivo; se alterna un espacio
       para forzar el segundo anuncio, igual que hace anunciar(). */
    CB.a11y.urgente('quedan cinco segundos');
    t.ok(urgente.textContent !== 'quedan cinco segundos',
      'el mismo aviso dos veces seguidas se fuerza para que se vuelva a leer');
    urgente.textContent = '';
  }

  /* 6. Todo interruptor dice si está pulsado */
  const conmutadores = [].slice.call(document.querySelectorAll('[data-accion="sonido"]'));
  const sinEstado = conmutadores.filter(function (b) {
    return b.getAttribute('aria-pressed') === null;
  });
  t.ok(conmutadores.length > 0 && sinEstado.length === 0,
    'los ' + conmutadores.length + ' botones de sonido declaran aria-pressed',
    sinEstado.length + ' sin declararlo');

  /* 7. El movimiento se puede apagar y el reloj también */
  t.igual(CB.modos.TABLA.facil.segundos, 0,
    'el modo Fácil deja el límite de tiempo en cero, no en «mucho»');
  t.ok(typeof CB.a11y.aplicarAjustes === 'function',
    'existe el punto donde se aplican los ajustes de accesibilidad del perfil');

  /* 8. Y la región urgente la USA alguien */
  const fuenteReloj = String(CB.ui.reloj.gritar || '');
  const fuenteFallo = String(CB.partida.trasFallo || '');
  t.ok(fuenteReloj.indexOf('urgente') !== -1,
    'el aviso de los diez segundos va por la región urgente, no por la educada');
  t.ok(fuenteFallo.indexOf('urgente') !== -1,
    'y el de la luz que se apaga también: los dos caducan');
  t.ok(String(CB.partida.pintarFin || '').indexOf('a11y.urgente') === -1,
    'pero el resumen del final NO interrumpe: eso no caduca');
});

CB.pruebas.suite('E110 · formularios y controles exponen nombre, estado y error', function () {
  const t = CB.pruebas;
  const perfilPrevio = CB.perfil;
  const estadoPrevio = CB.partida.estado;
  CB.perfil = CB.pruebas.perfilNuevo();
  CB.partida.estado = null;

  function nombreReferenciado(el) {
    const ids = (el.getAttribute('aria-labelledby') || '').trim().split(/\s+/).filter(Boolean);
    return ids.map(function (id) {
      const n = document.getElementById(id);
      return n ? n.textContent.trim() : '';
    }).filter(Boolean).join(' ');
  }

  CB.ajustesNino({});
  const controlesNino = [].slice.call(
    document.querySelectorAll('#lista-ajustes .ajuste button')
  );
  const sinNombreNino = controlesNino.filter(function (b) {
    return !/\S+\s+\S+/.test(nombreReferenciado(b));
  });
  t.ok(controlesNino.length >= 5 && sinNombreNino.length === 0,
    'E110 · cada ajuste infantil se anuncia con etiqueta y valor',
    sinNombreNino.length + ' controles sin nombre completo');

  const conmutadoresNino = controlesNino.filter(function (b) {
    return /Sonido|Letra grande|Leer en voz alta/.test(nombreReferenciado(b));
  });
  t.ok(conmutadoresNino.length === 3 && conmutadoresNino.every(function (b) {
    return /^(true|false)$/.test(b.getAttribute('aria-pressed') || '');
  }), 'E110 · los tres ajustes binarios infantiles exponen su estado');

  const soporte = document.createElement('div');
  soporte.hidden = true;
  soporte.appendChild(CB.adulto.cajaAjustes(CB.perfil));
  document.body.appendChild(soporte);
  const controlesAdulto = [].slice.call(soporte.querySelectorAll('button'));
  const sinNombreAdulto = controlesAdulto.filter(function (b) {
    return !/\S+\s+\S+/.test(nombreReferenciado(b));
  });
  t.ok(controlesAdulto.length > 10 && sinNombreAdulto.length === 0,
    'E110 · cada ajuste adulto se anuncia con etiqueta y valor',
    sinNombreAdulto.length + ' controles sin nombre completo');
  t.ok(controlesAdulto.every(function (b) {
    return /^(true|false)$/.test(b.getAttribute('aria-pressed') || '');
  }), 'E110 · los ajustes adultos exponen qué opción está activa');
  soporte.parentNode.removeChild(soporte);

  CB.adulto.desbloqueado = false;
  CB.adulto.abrir();
  const campo = document.getElementById('adulto-respuesta');
  const error = document.getElementById('adulto-error');
  let focoPedido = false;
  const enfocarReal = campo.focus;
  campo.focus = function () { focoPedido = true; };
  t.ok(campo.getAttribute('aria-describedby') === 'adulto-pregunta' &&
       campo.getAttribute('aria-errormessage') === 'adulto-error',
    'E110 · la puerta parental relaciona instrucción, campo y mensaje de error');
  campo.value = 'respuesta incorrecta';
  document.getElementById('adulto-entrar').click();
  t.ok(campo.getAttribute('aria-invalid') === 'true' &&
       campo.getAttribute('aria-describedby').indexOf('adulto-error') !== -1 && !error.hidden &&
       error.getAttribute('role') === 'alert',
    'E110 · un fallo marca el campo y anuncia el mensaje');
  t.ok(focoPedido,
    'E110 · tras el fallo se pide devolver el foco al campo que hay que corregir');
  campo.focus = enfocarReal;

  const grupoAnimo = document.querySelector('#fin-animo .animo');
  const caras = [].slice.call(document.querySelectorAll('#fin-animo .animo__cara'));
  t.ok(grupoAnimo && grupoAnimo.getAttribute('role') === 'group' && caras.length === 3,
    'E110 · el estado de ánimo es un grupo de tres controles');
  t.ok(caras.every(function (b) { return b.getAttribute('aria-pressed') === 'false'; }),
    'E110 · las tres opciones nacen con un estado explícito');

  CB.perfil = perfilPrevio;
  CB.partida.estado = estadoPrevio;
});

/* E143 · LEER LA PREGUNTA EN VOZ ALTA, EN TODAS LAS PREGUNTAS (3.4.2). Hasta
   aquí el altavoz solo lo tenían los problemas de enunciado y la pantalla de
   calibración no lo tenía en absoluto, así que un niño con dislexia o afasia
   podía hacerse leer el problema de las patatas y ninguna de las otras
   trescientas preguntas —ni las cuatro primeras de su vida—. Se mide montando
   los pintores REALES y mirando el DOM que producen, no leyendo el código. */
CB.pruebas.suite('A11y: el altavoz de la pregunta (E143)', function () {
  const t = CB.pruebas;
  const cont = document.getElementById('item-enunciado');
  if (!cont) { t.ok(false, 'E143 · falta #item-enunciado en la página de pruebas'); return; }

  const estadoPrevio = CB.partida.estado;
  const pantallaPrevia = CB.pantallas.actual;
  const indicePrevio = CB.calibracion.indice;
  const itemsPrevios = CB.calibracion.ITEMS;

  /* La voz se dobla con defineProperty y se restaura por descriptor: asignar
     sobre ella y confiar es el error clásico de esta suite. Además mantiene la
     suite MUDA, que es un contrato del proyecto. */
  const descLeer = Object.getOwnPropertyDescriptor(CB.voz, 'leer');
  const descDisp = Object.getOwnPropertyDescriptor(CB.voz, 'disponible');
  const leidos = [];
  Object.defineProperty(CB.voz, 'leer', { configurable: true, writable: true,
    value: function (texto) { leidos.push(texto || ''); return true; } });
  Object.defineProperty(CB.voz, 'disponible', { configurable: true, writable: true,
    value: function () { return true; } });

  /* 1 · Una pregunta que NO es problema de enunciado lleva su altavoz. */
  const preguntaConVisual = {
    formato: 'opciones4', consigna: 'Mira el gráfico. ¿De qué hay MÁS?',
    visual: { tipo: 'barras', filas: [{ nombre: 'perros', valor: 3 },
                                      { nombre: 'gatos', valor: 1 }] }
  };
  CB.ui.pintarItem(preguntaConVisual);
  const alt = cont.querySelector('.enunciado__altavoz');
  t.ok(!!alt && alt.tagName === 'BUTTON',
    'E143 · una pregunta que no es problema de enunciado lleva su botón de leer');
  t.ok(!!alt && /voz alta/.test(alt.getAttribute('aria-label') || ''),
    'E143 · y el botón dice para qué sirve',
    alt ? alt.getAttribute('aria-label') : 'sin botón');

  /* 2 · Y al pulsarlo se lee de verdad, con el texto de ESA pregunta. */
  CB.partida.estado = { itemActual: preguntaConVisual };
  leidos.length = 0;
  if (alt) alt.click();
  t.ok(leidos.length > 0 && (leidos[0] || '').indexOf('gráfico') !== -1,
    'E143 · al pulsarlo se lee la pregunta que hay en pantalla', leidos.join(' | '));

  /* 3 · El problema de enunciado no ha perdido el suyo. */
  CB.ui.pintarItem({ formato: 'teclado', subtipo: 'CAMBIO',
    frases: ['Wei tiene 9 patatas.', '¿Cuántas le quedan?'],
    enunciado: 'Wei tiene 9 patatas. ¿Cuántas le quedan?' });
  t.ok(!!cont.querySelector('.enunciado__altavoz'),
    'E143 · el problema de enunciado conserva el suyo');

  /* 4 · La regla es «si hay algo que leer, hay botón», no «botón siempre». */
  CB.ui.pintarItem({ formato: 'teclado', consigna: '' });
  t.ok(!cont.querySelector('.enunciado__altavoz'),
    'E143 · un ítem sin nada que leer no pinta el botón');

  /* 5 · Los signos se DICEN. Leer «48 48» sería peor que no leer: le nombra al
     niño una operación que no es la suya. */
  t.igual(CB.voz.textoDeItem({ consigna: '48 − 48' }), '48 menos 48',
    'E143 · la resta se lee «menos», no como un silencio entre dos números');
  t.igual(CB.voz.textoDeItem({ consigna: '3 · 4' }), '3 por 4',
    'E143 · el punto de multiplicar se lee «por»');
  t.igual(CB.voz.textoDeItem({ consigna: '5 + □ = 12' }), '5 más un hueco igual a 12',
    'E143 · el hueco del álgebra se nombra en vez de saltárselo');

  /* 6 · Y la incógnita x SOBREVIVE: meter la letra «x» en la tabla de signos
     convertiría «¿Cuánto vale x?» en «¿Cuánto vale por?». */
  const conIncognita = CB.voz.textoDeItem({
    consigna: 'La incógnita: x + 40 = 55. ¿Cuánto vale x?' });
  t.ok(conIncognita.indexOf('x') !== -1 && conIncognita.indexOf('por') === -1 &&
       conIncognita.indexOf('más') !== -1,
    'E143 · la incógnita x se lee como x, no como «por»', conIncognita);

  /* 7 · La lectura guiada —el camino de quien no tiene voz instalada— resalta
     también una consigna de una sola línea. */
  CB.ui.pintarItem({ formato: 'opciones4', consigna: 'Mira la cuadrícula. ¿Qué letra hay?' });
  CB.ui.resaltarPalabra(0, 'Mira');
  t.ok(!!cont.querySelector('.enunciado__linea--activa'),
    'E143 · la lectura guiada resalta una consigna de una línea');
  CB.ui.resaltarLinea(-1);
  t.ok(!cont.querySelector('.enunciado__linea--activa'),
    'E143 · y le quita el resaltado al terminar');

  /* 8 · La calibración: las cuatro primeras preguntas de su vida. */
  CB.partida.estado = null;
  CB.calibracion.ITEMS = CB.calibracion.BANCOS[2];
  CB.calibracion.indice = 0;
  CB.calibracion.servir();
  const altCal = document.querySelector('#cal-enunciado .enunciado__altavoz');
  t.ok(!!altCal, 'E143 · la calibración también tiene su altavoz');
  leidos.length = 0;
  if (altCal) altCal.click();
  t.ok(leidos.length > 0 && (leidos[0] || '').length > 0,
    'E143 · y al pulsarlo se lee su consigna', leidos.join(' | '));

  CB.ui.vaciar(document.getElementById('cal-enunciado'));
  CB.calibracion.indice = indicePrevio;
  CB.calibracion.ITEMS = itemsPrevios;
  CB.pantallas.actual = pantallaPrevia;
  CB.partida.estado = estadoPrevio;
  if (descLeer) Object.defineProperty(CB.voz, 'leer', descLeer);
  if (descDisp) Object.defineProperty(CB.voz, 'disponible', descDisp);
});
