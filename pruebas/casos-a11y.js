/* ============================================================================
   casos-a11y.js — lo que EN 301 549 obliga y ninguna otra suite miraba
   ----------------------------------------------------------------------------
   El proyecto ya verificaba contraste (casos-contraste.js), glifos
   (casos-fuente.js) y que el límite de tiempo sea desactivable
   (casos-reloj.js). Lo que no miraba nadie era la NAVEGACIÓN: si el orden de
   tabulación se sale de la pantalla, si las dieciocho secciones tienen nombre,
   si hay una manera de saltarse la barra de herramientas.

   Esto es material escolar sujeto a EN 301 549 / WCAG 2.2 AA. No es una
   preferencia; es una obligación legal, y una obligación sin comprobación es
   una afirmación.

   LO QUE AQUÍ NO SE PUEDE COMPROBAR, y se dice en vez de fingir: `forced-colors`
   (hay que emularlo en las herramientas del navegador), un lector de pantalla
   real, y el táctil en una tableta de verdad. Están en la lista manual de
   docs/decisiones.md.
   ========================================================================== */

CB.pruebas.suite('Accesibilidad: navegación, regiones y nombres', function () {
  var t = CB.pruebas;

  var ENFOCABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
                  'select:not([disabled]), textarea:not([disabled]), ' +
                  '[tabindex]:not([tabindex="-1"])';

  /* ── 1. Saltarse los bloques repetidos (WCAG 2.4.1) ─────────────────────
     AQUÍ HUBO UN ENLACE «Ir a la respuesta», Y SE QUITÓ PORQUE SU MOTIVO ERA
     FALSO. Se puso dando por hecho que en la pantalla de partida había que
     tabular por la barra de herramientas —Pista, Pausa, Sonido, Salir— antes de
     llegar a los números. Se comprobó el DOM y es al revés: el orden es
     <h1> → HUD (nada enfocable) → respuestas → barra. La barra va la última.

     El enlace no resolvía nada, y su comentario habría mentido en el código
     durante años. Un mecanismo de accesibilidad cuyo motivo declarado es falso
     es peor que no tenerlo: parece trabajo hecho y no lo es.

     El criterio SÍ se cumple, por dos vías que ya existían y ahora se
     comprueban: CB.pantallas.ir() lleva el foco al <h1> de la pantalla nueva en
     cada navegación —que es la técnica G1/ARIA11— y las secciones son regiones
     con nombre (apartado 4). */
  var enPartida = document.getElementById('p-partida');
  if (enPartida) {
    var orden = [].slice.call(enPartida.querySelectorAll(ENFOCABLE));
    var barra = enPartida.querySelector('.barra-herramientas');
    var primeroDeBarra = orden.findIndex
      ? orden.findIndex(function (el) { return barra && barra.contains(el); })
      : -1;
    var hayFueraDespues = primeroDeBarra >= 0 && orden.slice(primeroDeBarra)
      .some(function (el) { return !barra.contains(el); });
    t.ok(!hayFueraDespues,
      'en la partida, la barra de herramientas es lo ÚLTIMO del orden de tabulación',
      'hay algo enfocable después de la barra');
  }

  /* ── 2. Cero tabindex positivo ──────────────────────────────────────────
     Un tabindex positivo saca a su elemento del orden del documento y lo mete
     antes que TODO lo demás, incluido el enlace de salto. Es la manera más
     rápida de romper la navegación por teclado sin que se note mirando. */
  var positivos = [].slice.call(document.querySelectorAll('[tabindex]'))
    .filter(function (el) { return parseInt(el.getAttribute('tabindex'), 10) > 0; });
  t.ok(positivos.length === 0, 'ningún elemento lleva un tabindex positivo',
    positivos.length + ' encontrados');

  /* ── 3. El Tab no se va a una pantalla que no se ve ─────────────────────
     Dieciocho <section> apiladas en el MISMO documento, diecisiete ocultas. El
     atributo `hidden` sí saca del orden de tabulación, pero basta un
     `display: block` en algún sitio, o un nodo enfocable colgado fuera de una
     sección, para que Tab salte a una pantalla invisible. Con dieciocho
     apiladas eso no es hipotético.

     Se comprueba estructuralmente y no por render, para que valga también en la
     maqueta de esta página: todo enfocable que NO esté en la pantalla actual
     tiene que estar dentro de algo con `hidden`. */
  var previa = CB.pantallas.actual;
  var fugas = [];
  CB.pantallas.IDS.forEach(function (id) {
    if (id === 'p-error') return;
    try { CB.pantallas.ir(id); } catch (e) { return; }
    var seccion = document.getElementById(id);
    if (!seccion) return;
    /* Solo se miran las OTRAS pantallas del juego. Mirar el documento entero
       cazaba tambien los botones de esta misma pagina de pruebas, que es
       herramienta y no producto: un falso positivo que acaba en que alguien
       desactiva la comprobacion. */
    CB.pantallas.IDS.forEach(function (otro) {
      if (otro === id) return;
      var s2 = document.getElementById(otro);
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

  /* ── 4. Las dieciocho son regiones con nombre ──────────────────────────
     Una <section> SIN nombre accesible no cuenta como landmark y no aparece en
     la lista de regiones del lector de pantalla. Eran dieciocho secciones que
     para un lector no existían como tales. */
  var sinNombre = [], sinMain = [];
  CB.pantallas.IDS.forEach(function (id) {
    if (id === 'p-error') return;
    try { CB.pantallas.ir(id); } catch (e) { return; }
    var s = document.getElementById(id);
    if (!s) return;
    var idEtiqueta = s.getAttribute('aria-labelledby');
    var etiqueta = idEtiqueta ? document.getElementById(idEtiqueta) : null;
    if (!etiqueta || !etiqueta.textContent.trim()) sinNombre.push(id);
    if (s.getAttribute('role') !== 'main') sinMain.push(id);
    /* Y solo UNA lleva role=main: dieciocho «main» a la vez no es incorrecto,
       es que deja de significar nada. */
    var otras = CB.pantallas.IDS.filter(function (o) {
      var e = document.getElementById(o);
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

  /* ── 5. DOS regiones vivas, con papeles distintos ───────────────────────
     Había una sola, `polite`, y por ella pasaba «has ganado 3 gemas» y «te
     quedan 5 segundos». Una región polite respeta el orden de llegada, así que
     lo urgente se leía DESPUÉS de lo festivo, que es tarde. */
  var educada = document.getElementById('region-viva');
  var urgente = document.getElementById('region-urgente');
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

  /* ── 6. Todo interruptor dice si está pulsado ───────────────────────────
     Un botón que cambia de estado sin aria-pressed le dice al lector «botón
     Sonido» las dos veces: ni el niño ni el adulto saben si está silenciado.
     Es exactamente el fallo E15, pero para quien no ve el icono. */
  var conmutadores = [].slice.call(document.querySelectorAll('[data-accion="sonido"]'));
  var sinEstado = conmutadores.filter(function (b) {
    return b.getAttribute('aria-pressed') === null;
  });
  t.ok(conmutadores.length > 0 && sinEstado.length === 0,
    'los ' + conmutadores.length + ' botones de sonido declaran aria-pressed',
    sinEstado.length + ' sin declararlo');

  /* ── 7. El movimiento se puede apagar y el reloj también ────────────────
     Los dos son requisitos de conformidad, no ajustes de gusto: WCAG 2.2.1
     (tiempo ajustable) y 2.3.3 (animación desde interacción). Se comprueba que
     la manera de apagarlos EXISTE, que es lo que se puede comprobar aquí; que
     hagan efecto lo verifican casos-reloj.js y el guardián de E25. */
  t.igual(CB.partida.SEGUNDOS_ITEM.sinPrisa, 0,
    'el modo sin prisa deja el límite de tiempo en cero, no en «mucho»');
  t.ok(typeof CB.a11y.aplicarAjustes === 'function',
    'existe el punto donde se aplican los ajustes de accesibilidad del perfil');

  /* ── 8. Y la región urgente la USA alguien ──────────────────────────────
     Una región que existe y no la escribe nadie es una comprobación que no
     comprueba nada: el test pasa y el usuario no oye el aviso. Se exige que los
     dos mensajes que CADUCAN vayan por ella —los diez segundos y la luz que se
     apaga— y que el resto siga en la educada, porque un lector que interrumpe
     cada tres segundos es inutilizable. */
  var fuenteReloj = String(CB.ui.reloj.gritar || '');
  var fuenteFallo = String(CB.partida.trasFallo || '');
  t.ok(fuenteReloj.indexOf('urgente') !== -1,
    'el aviso de los diez segundos va por la región urgente, no por la educada');
  t.ok(fuenteFallo.indexOf('urgente') !== -1,
    'y el de la luz que se apaga también: los dos caducan');
  t.ok(String(CB.partida.pintarFin || '').indexOf('a11y.urgente') === -1,
    'pero el resumen del final NO interrumpe: eso no caduca');
});
