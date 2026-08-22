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
  t.igual(CB.partida.SEGUNDOS_ITEM.sinPrisa, 0,
    'el modo sin prisa deja el límite de tiempo en cero, no en «mucho»');
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
