/* ============================================================================
   41-panel-adulto.js — Panel para familias y maestros
   ----------------------------------------------------------------------------
   LA PUERTA PARENTAL ES DE LECTURA, NO DE CÁLCULO. Poner una multiplicación
   difícil como cerradura en un juego de matemáticas enseña exactamente lo
   contrario de lo que el juego defiende: que las matemáticas son un muro. Se
   pide localizar una palabra concreta en una frase, que un adulto resuelve en
   dos segundos y un lector de 2.º no.

   HONESTIDAD DEL INFORME (PLAN §17.3): se distingue siempre entre lo que el
   juego MIDE y lo que NO mide, y solo se emiten hipótesis de error a partir de
   evidencia DISCRIMINANTE. Si dos códigos empatan, se cuentan ambos y no se
   afirma ninguno.
   ========================================================================== */

var CB = CB || {};
CB.adulto = CB.adulto || {};

CB.adulto.desbloqueado = false;
CB.adulto.FRASES_PUERTA = [
  { frase: 'La cantera guarda muchas gemas azules', n: 4 },
  { frase: 'Los mineros bajan temprano con su pico', n: 3 },
  { frase: 'El musgo crece sobre las piedras antiguas', n: 5 },
  { frase: 'Una vagoneta cruza el túnel cargada', n: 2 }
];

/* PINTA el panel; NO navega hasta él.

   Esta función es el handler de CB.pantallas.alEntrar['p-adulto'], y llamaba
   como primera línea a CB.pantallas.ir('p-adulto'). Es decir: ir() invocaba al
   handler, y el handler volvía a llamar a ir(). Recursión infinita, desbordamiento
   de pila, y el catch de ir() mandaba al usuario a la pantalla de error.

   Efecto real: pulsar la llave de la portada NUNCA abría el panel del adulto.
   Se iba a «algo ha ido mal». Con ello quedaban fuera de alcance los ajustes,
   el informe imprimible, la exportación del progreso y los interruptores de las
   tablas del 6 al 9 y de los céntimos.

   Los otros siete handlers de alEntrar solo pintan, que es el contrato. Este era
   el único que navegaba. */
CB.adulto.abrir = function () {
  var puerta = document.getElementById('adulto-puerta');
  var contenido = document.getElementById('adulto-contenido');

  if (CB.adulto.desbloqueado) {
    puerta.hidden = true;
    contenido.hidden = false;
    CB.adulto.pintar();
    return;
  }
  puerta.hidden = false;
  contenido.hidden = true;

  var reto = CB.adulto.FRASES_PUERTA[
    CB.util.hash32(CB.util.hoyISO()) % CB.adulto.FRASES_PUERTA.length];
  var orden = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta', 'sexta'];

  var preg = document.getElementById('adulto-pregunta');
  preg.textContent = 'Para entrar, escribe la ' + orden[reto.n - 1] +
                     ' palabra de esta frase: «' + reto.frase + '»';

  var campo = document.getElementById('adulto-respuesta');
  var error = document.getElementById('adulto-error');
  campo.value = '';
  error.hidden = true;

  document.getElementById('adulto-entrar').onclick = function () {
    var esperada = CB.util.palabras(reto.frase)[reto.n - 1].toLowerCase();
    if (CB.util.normalizar(campo.value) === CB.util.normalizar(esperada)) {
      CB.adulto.desbloqueado = true;
      puerta.hidden = true;
      contenido.hidden = false;
      CB.adulto.pintar();
    } else {
      error.hidden = false;
    }
  };
};

/* ── Las 10 métricas ────────────────────────────────────────────────────── */
CB.adulto.metricas = function (perfil) {
  var hoy = CB.util.hoyISO();
  var h = perfil.historial || [];
  var ultimas = h.slice(-10);

  var segTotal = 0, preg = 0, ac = 0, ac1 = 0, azar = 0, luces = 0, i;
  for (i = 0; i < ultimas.length; i++) {
    segTotal += ultimas[i].seg || 0;
    preg += ultimas[i].preguntas || 0;
    ac += ultimas[i].aciertos || 0;
    ac1 += ultimas[i].aciertos1erIntento || 0;
    azar += ultimas[i].azares || 0;
    luces += ultimas[i].lucesApagadas || 0;
  }

  var dominadas = [], flojas = [], k, d;
  for (k in perfil.destrezas) {
    if (!Object.prototype.hasOwnProperty.call(perfil.destrezas, k)) continue;
    d = perfil.destrezas[k];
    if (d.estado === 'dominada') dominadas.push(k);
    if (d.n >= 6 && CB.adaptativo.precision1er(d) < 0.5) flojas.push(k);
  }

  var repCompletas = 0, repTotal = 0;
  (perfil.respuestas || []).forEach(function (r) {
    var flags = r[7] || 0;
    if (flags & 1) { repTotal++; if (flags & 32) repCompletas++; }
  });

  return {
    m1_tiempoHoy: (perfil.diario.tiempoPantallaPorDia || {})[hoy] || 0,
    m2_partidas: h.length,
    m2_duracionMedia: ultimas.length ? Math.round(segTotal / ultimas.length) : 0,
    m3_precisionTotal: preg ? (ac / preg) : null,
    m3_precision1er: preg ? (ac1 / preg) : null,
    m4_semaforo: CB.adulto.semaforo(perfil),
    m5_dominadas: dominadas,
    m5_flojas: flojas,
    m6_subtipos: perfil.problemas || {},
    m7_errores: perfil.errores || {},
    m8_azares: azar,
    m9_reparaciones: repTotal ? (repCompletas / repTotal) : null,
    m9_reparacionesTotal: repTotal,
    m10_animo: (perfil.animo || []).slice(-5),
    lucesApagadas: luces,
    diasJugados: (perfil.diario.diasJugados || []).length
  };
};

/* Semáforo por bloque. NUNCA solo color: la clase CSS añade símbolo y texto. */
CB.adulto.semaforo = function (perfil) {
  var bloques = {
    'Numeración': ['numeracion', 'valor_posicional'],
    'Sumas': ['suma_sin_llevar', 'suma_llevada'],
    'Restas': ['resta_sin_llevar', 'resta_llevada'],
    'Tablas (iniciación)': ['multiplicacion'],
    'Problemas': ['problemas_cambio', 'problemas_combinacion',
                  'problemas_comparacion', 'problemas_igualacion'],
    'Dinero': ['dinero'],
    'Vocabulario': ['vocabulario']
  };
  var out = [], nombre, slugs, n = 0, p = 0, i, d;

  for (nombre in bloques) {
    if (!Object.prototype.hasOwnProperty.call(bloques, nombre)) continue;
    slugs = bloques[nombre]; n = 0; p = 0;
    for (i = 0; i < slugs.length; i++) {
      d = perfil.destrezas[slugs[i]];
      if (d && d.n) { n += d.n; p += (d.aciertosPrimerIntento || 0); }
    }
    /* Con menos de 6 observaciones NO se emite juicio: «sin datos suficientes»
       es una respuesta honesta y «rojo» con n=2 no lo es. */
    var nivel;
    if (n < 6) nivel = 'sindatos';
    else if (p / n >= 0.8) nivel = 'verde';
    else if (p / n >= 0.55) nivel = 'ambar';
    else nivel = 'rojo';
    out.push({ bloque: nombre, nivel: nivel, n: n,
               precision: n ? Math.round(p / n * 100) : null });
  }
  return out;
};

/* ── Pintado del panel ──────────────────────────────────────────────────── */
CB.adulto.pintar = function () {
  var perfil = CB.perfil;
  var cont = document.getElementById('adulto-contenido');
  if (!perfil || !cont) return;
  CB.ui.vaciar(cont);

  var m = CB.adulto.metricas(perfil);

  cont.appendChild(CB.ui.crear('h1', null, 'Panel de personas adultas'));
  cont.appendChild(CB.ui.crear('p', null, perfil.mote + ' · ' + m.diasJugados +
    (m.diasJugados === 1 ? ' día jugado' : ' días jugados')));

  /* Alcance declarado, LITERAL, en la primera pantalla del panel (§1.3). */
  var aviso = CB.ui.crear('div', 'adulto-aviso');
  aviso.appendChild(CB.ui.crear('h3', null, 'Qué mide y qué no mide este juego'));
  aviso.appendChild(CB.ui.crear('p', null, CB.LEGAL.ALCANCE));
  aviso.appendChild(CB.ui.crear('p', null, CB.LEGAL.SECUENCIACION));
  aviso.appendChild(CB.ui.crear('p', null, CB.LEGAL.MULTIPLICACION));
  aviso.appendChild(CB.ui.crear('p', null,
    'Esto NO es una evaluación ni un diagnóstico. Es un registro de lo que ha ' +
    'hecho en la pantalla. El criterio del maestro y la observación en el aula ' +
    'están por encima de cualquier número de esta pantalla.'));
  cont.appendChild(aviso);

  if (CB.almacen.sinDisco) {
    var alerta = CB.ui.crear('div', 'adulto-aviso');
    alerta.appendChild(CB.ui.crear('h3', null, 'Aviso: no se está guardando en disco'));
    alerta.appendChild(CB.ui.crear('p', null,
      'El navegador no permite guardar. El progreso de esta sesión se perderá ' +
      'al cerrar. Revisa la configuración de privacidad del navegador.'));
    cont.appendChild(alerta);
  }

  /* ── Métricas 1-3 ──────────────────────────────────────────────────── */
  var caja1 = CB.ui.crear('div', 'adulto-caja');
  caja1.appendChild(CB.ui.crear('h2', null, 'De un vistazo'));
  CB.adulto.metrica(caja1, 'Tiempo de pantalla hoy',
    Math.round(m.m1_tiempoHoy / 60) + ' min');
  CB.adulto.metrica(caja1, 'Expediciones completadas', String(m.m2_partidas));
  CB.adulto.metrica(caja1, 'Duración media de la partida',
    Math.round(m.m2_duracionMedia / 60) + ' min ' + (m.m2_duracionMedia % 60) + ' s');
  CB.adulto.metrica(caja1, 'Aciertos (últimas 10 partidas)',
    m.m3_precisionTotal == null ? 'sin datos' : Math.round(m.m3_precisionTotal * 100) + ' %');
  CB.adulto.metrica(caja1, 'Aciertos a la primera',
    m.m3_precision1er == null ? 'sin datos' : Math.round(m.m3_precision1er * 100) + ' %');
  caja1.appendChild(CB.ui.crear('p', null,
    'Lo esperable en 2.º es entre el 80 % y el 90 % de aciertos. Por debajo, el ' +
    'juego bajará solo la dificultad; por encima, la subirá.'));
  cont.appendChild(caja1);

  /* ── Métrica 4: semáforo ───────────────────────────────────────────── */
  var caja2 = CB.ui.crear('div', 'adulto-caja');
  caja2.appendChild(CB.ui.crear('h2', null, 'Por bloques de contenido'));
  var tabla = CB.ui.crear('table', 'tabla-adulto');
  var thead = CB.ui.crear('thead');
  var trh = CB.ui.crear('tr');
  ['Bloque', 'Situación', 'Preguntas'].forEach(function (t) {
    trh.appendChild(CB.ui.crear('th', null, t));
  });
  thead.appendChild(trh); tabla.appendChild(thead);
  var tbody = CB.ui.crear('tbody');
  m.m4_semaforo.forEach(function (s) {
    var tr = CB.ui.crear('tr');
    tr.appendChild(CB.ui.crear('td', null, s.bloque));
    var td = CB.ui.crear('td');
    var sp = CB.ui.crear('span', 'semaforo',
      s.precision == null ? '' : (s.precision + ' %'));
    sp.setAttribute('data-nivel', s.nivel);
    td.appendChild(sp);
    tr.appendChild(td);
    tr.appendChild(CB.ui.crear('td', null, String(s.n)));
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);
  caja2.appendChild(tabla);
  cont.appendChild(caja2);

  /* ── Métrica 6: la matriz de los 20 subtipos ───────────────────────── */
  var caja3 = CB.ui.crear('div', 'adulto-caja');
  caja3.appendChild(CB.ui.crear('h2', null, 'Problemas de enunciado, por tipo'));
  caja3.appendChild(CB.ui.crear('p', null,
    'Dos problemas con los mismos números y la misma operación tienen ' +
    'dificultades muy distintas según cómo estén contados. Esta tabla es la ' +
    'información más accionable del panel.'));
  var t2 = CB.ui.crear('table', 'tabla-adulto matriz-subtipos');
  var th2 = CB.ui.crear('tr');
  ['Tipo de problema', 'Intentos', 'Aciertos', 'Tiempo medio'].forEach(function (t) {
    th2.appendChild(CB.ui.crear('th', null, t));
  });
  t2.appendChild(th2);
  CB.gen.problemas.SUBTIPOS.forEach(function (s) {
    var p = m.m6_subtipos[s];
    if (!p || !p.intentos) return;
    var tr = CB.ui.crear('tr');
    tr.appendChild(CB.ui.crear('td', null, CB.adulto.NOMBRE_SUBTIPO[s] || s));
    var td1 = CB.ui.crear('td', 'matriz-subtipos__dato', String(p.intentos)); tr.appendChild(td1);
    var td2 = CB.ui.crear('td', 'matriz-subtipos__dato',
      p.aciertos + ' (' + Math.round(p.aciertos / p.intentos * 100) + ' %)');
    tr.appendChild(td2);
    tr.appendChild(CB.ui.crear('td', 'matriz-subtipos__dato', Math.round(p.rtMedioMs / 1000) + ' s'));
    t2.appendChild(tr);
  });
  caja3.appendChild(t2);
  cont.appendChild(caja3);

  /* ── Métrica 7: errores frecuentes con su actividad de 10 minutos ──── */
  var caja4 = CB.ui.crear('div', 'adulto-caja');
  caja4.appendChild(CB.ui.crear('h2', null, 'Qué conviene trabajar'));
  var codigos = Object.keys(m.m7_errores).filter(function (c) {
    return m.m7_errores[c].vecesDiscriminante >= 2;
  }).sort(function (a, b) {
    return m.m7_errores[b].vecesDiscriminante - m.m7_errores[a].vecesDiscriminante;
  }).slice(0, 3);

  if (!codigos.length) {
    caja4.appendChild(CB.ui.crear('p', null,
      'Todavía no hay evidencia suficiente para señalar un error concreto. ' +
      'Hacen falta al menos dos respuestas que apunten sin ambigüedad al mismo ' +
      'procedimiento.'));
  } else {
    codigos.forEach(function (c) {
      var rec = CB.datos.RECOMENDACIONES[c];
      if (!rec) return;
      caja4.appendChild(CB.ui.crear('h3', null, rec.frase));
      caja4.appendChild(CB.ui.crear('p', null, '10 minutos: ' + rec.actividad));
      var ejemplos = (m.m7_errores[c].ejemplos || []).join(' · ');
      if (ejemplos) caja4.appendChild(CB.ui.crear('p', 'texto-menor', 'Ejemplos: ' + ejemplos));
      caja4.appendChild(CB.ui.boton('Imprimir ficha de refuerzo', 'btn-adulto', function () {
        CB.adulto.fichaRefuerzo(perfil, c);
      }));
    });
  }
  cont.appendChild(caja4);

  /* ── Métricas 8-10 ─────────────────────────────────────────────────── */
  var caja5 = CB.ui.crear('div', 'adulto-caja');
  caja5.appendChild(CB.ui.crear('h2', null, 'Cómo está jugando'));
  CB.adulto.metrica(caja5, 'Respuestas muy rápidas sin acertar', String(m.m8_azares));
  caja5.appendChild(CB.ui.crear('p', 'texto-menor',
    'El juego no se lo reprocha nunca: solo deja de puntuar esa pregunta y da ' +
    'un momento de pausa. Si el número es alto, suele indicar cansancio o que ' +
    'la dificultad está por encima, no mala intención.'));
  CB.adulto.metrica(caja5, 'Explicaciones seguidas hasta el final',
    m.m9_reparaciones == null ? 'sin datos'
      : Math.round(m.m9_reparaciones * 100) + ' % de ' + m.m9_reparacionesTotal);
  CB.adulto.metrica(caja5, 'Luces apagadas (últimas 10 partidas)', String(m.lucesApagadas));
  if (m.m10_animo.length) {
    var caras = ['me ha costado', 'normal', 'contento'];
    CB.adulto.metrica(caja5, 'Cómo dice que se ha sentido',
      m.m10_animo.map(function (a) { return caras[a.cara] || '?'; }).join(', '));
  }
  cont.appendChild(caja5);

  /* ── Ajustes ───────────────────────────────────────────────────────── */
  cont.appendChild(CB.adulto.cajaAjustes(perfil));

  /* ── Sin conexión ──────────────────────────────────────────────────────
     SOLO aparece si de verdad se puede: con doble clic desde file:// no hay
     service worker y la sección no existe. Nada de «esta función no está
     disponible»: un aviso sobre algo que el usuario no ha pedido es ruido.

     Y va AQUÍ, en el panel del adulto, detrás de la puerta parental, porque
     descargar 42 MB en el disco de un aparato escolar es una decisión informada
     de una persona adulta, no un efecto colateral de darle a jugar. */
  if (CB.offline && CB.offline.DISPONIBLE) {
    var cajaSC = CB.ui.crear('div', 'adulto-caja');
    cajaSC.appendChild(CB.ui.crear('h2', null, 'Sin conexión'));
    cajaSC.appendChild(CB.ui.crear('p', null,
      'El juego ya funciona sin internet: no pide nada a la red. Lo único que ' +
      'no se guarda por su cuenta es la música, porque son 42 MB.'));

    var estadoSC = CB.ui.crear('p', 'texto-menor', 'Comprobando…');
    cajaSC.appendChild(estadoSC);
    CB.offline.musicaGuardada(function (n) {
      estadoSC.textContent = n === 0
        ? 'Ahora mismo no hay ninguna pista guardada.'
        : 'Guardadas ' + n + ' de 9 pistas.';
    });

    var filaSC = CB.ui.crear('div', 'fila');
    var btnBajar = CB.ui.boton('Descargar la música (42 MB)', 'btn-adulto', function () {
      btnBajar.disabled = true;
      estadoSC.textContent = 'Descargando… 0 de 9';
      CB.offline.descargarMusica(
        function (intentadas, total) {
          estadoSC.textContent = 'Descargando… ' + intentadas + ' de ' + total;
        },
        /* El mensaje distingue los tres finales, porque antes los tres decían
           «Listo»: terminar sin fallos, terminar con pistas caídas, y no haber
           podido empezar. Decir «guardadas» cuando no lo están es lo que hace
           que alguien se lleve la tableta a un sitio sin wifi. */
        function (r) {
          btnBajar.disabled = false;
          var n = r.hechas || 0;
          if (r.ok) {
            estadoSC.textContent = 'Listo: las ' + n + ' pistas están guardadas.';
          } else if (r.fallos) {
            estadoSC.textContent = 'Guardadas ' + n + ' de 9. ' + r.fallos +
              (r.fallos === 1 ? ' pista no se ha podido descargar' : ' pistas no se han podido descargar') +
              '. Comprueba la conexión y vuelve a intentarlo.';
          } else if (r.motivo === 'cancelado') {
            estadoSC.textContent = 'Descarga cancelada. Guardadas ' + n + ' de 9.';
          } else {
            estadoSC.textContent = 'No se ha podido guardar ninguna pista. Puedes volver a intentarlo.';
          }
          CB.a11y.anunciar(estadoSC.textContent);
        });
    });
    filaSC.appendChild(btnBajar);

    /* El botón que un maestro puede pulsar sin saber qué es un service worker
       cuando algo se queda pegado. Es el remedio contra el peor fallo posible de
       esta parte: una versión vieja servida desde la caché para siempre. */
    filaSC.appendChild(CB.ui.boton('Borrar lo guardado y recargar', 'btn-adulto btn-adulto--peligro',
      function () {
        CB.offline.olvidarTodo(function () { location.reload(); });
      }));
    cajaSC.appendChild(filaSC);
    cont.appendChild(cajaSC);
  }

  /* ── Datos ─────────────────────────────────────────────────────────── */
  var caja7 = CB.ui.crear('div', 'adulto-caja');
  caja7.appendChild(CB.ui.crear('h2', null, 'Datos'));
  caja7.appendChild(CB.ui.crear('p', null, CB.LEGAL.PRIVACIDAD));
  caja7.appendChild(CB.ui.crear('p', null, CB.LEGAL.LIMITACION));

  var fila = CB.ui.crear('div', 'fila');
  fila.appendChild(CB.ui.boton('Ver informe imprimible', 'btn-adulto', function () {
    CB.adulto.imprimirInforme(perfil.id);
  }));
  fila.appendChild(CB.ui.boton('Descargar CSV', 'btn-adulto', function () {
    CB.adulto.descargarCSV(perfil);
  }));
  fila.appendChild(CB.ui.boton('Exportar copia (.json)', 'btn-adulto', function () {
    CB.adulto.descargar(CB.almacen.exportar(perfil),
      'cubomatica-' + perfil.mote.replace(/\s+/g, '-') + '.json', 'application/json');
  }));

  /* RESTAURAR. Faltaba, y su ausencia dejaba sin efecto la única respuesta que
     el proyecto da a su propia limitación estructural: el README dice «haz una
     copia con Exportar al terminar cada trimestre», y esa copia no se podía
     volver a meter. Exportar sin importar es un botón que promete algo que no
     cumple. CB.almacen.validarImportado() ya existía, estaba probado y no lo
     llamaba nadie.

     El fichero lo elige la persona adulta en su propio disco: no hay red, no
     hay servidor y no se lee nada que no se haya señalado a mano. */
  fila.appendChild(CB.ui.boton('Restaurar copia (.json)', 'btn-adulto', function () {
    CB.adulto.restaurar(caja7);
  }));
  caja7.appendChild(fila);

  var aviso = CB.ui.crear('p', 'texto-menor');
  aviso.id = 'adulto-aviso-datos';
  aviso.setAttribute('role', 'status');
  caja7.appendChild(aviso);

  var borrar = CB.ui.boton('Borrar este perfil', 'btn-adulto btn-adulto--peligro', function () {
    CB.adulto.confirmarBorrado(perfil, caja7);
  });
  caja7.appendChild(borrar);
  cont.appendChild(caja7);

  cont.appendChild(CB.ui.boton('◀ Salir', 'btn-bloque', function () {
    /* Sin ternario: las dos ramas decían 'p-portada'. Al panel se entra por la
       puerta parental de la portada, y a la portada se vuelve, haya perfil o no. */
    CB.pantallas.ir('p-portada');
  }));
};

CB.adulto.metrica = function (cont, etiqueta, valor) {
  var d = CB.ui.crear('div', 'metrica');
  d.appendChild(CB.ui.crear('span', null, etiqueta));
  d.appendChild(CB.ui.crear('span', 'metrica__valor', valor));
  cont.appendChild(d);
};

CB.adulto.NOMBRE_SUBTIPO = {
  CAMBIO_1: 'Cambio · cuántos hay ahora',
  CAMBIO_2: 'Cambio · cuántos quedan',
  CAMBIO_3: 'Cambio · cuánto ha ganado',
  CAMBIO_4: 'Cambio · cuánto ha perdido',
  CAMBIO_5: 'Cambio · cuánto tenía antes (más)',
  CAMBIO_6: 'Cambio · cuánto tenía antes (menos)',
  COMBINACION_1: 'Juntar · el total',
  COMBINACION_2: 'Juntar · una parte',
  COMPARACION_1: 'Comparar · cuántos más',
  COMPARACION_2: 'Comparar · cuántos menos',
  COMPARACION_3: 'Comparar · el otro tiene más',
  COMPARACION_4: 'Comparar · el otro tiene menos',
  COMPARACION_5: 'Comparar · referente con más',
  COMPARACION_6: 'Comparar · referente con menos',
  IGUALACION_1: 'Igualar · cuánto falta',
  IGUALACION_2: 'Igualar · cuánto sobra',
  IGUALACION_3: 'Igualar · referido, añadir',
  IGUALACION_4: 'Igualar · referido, quitar',
  IGUALACION_5: 'Igualar · referente, añadir',
  IGUALACION_6: 'Igualar · referente, quitar'
};

/* ── Ajustes pedagógicos (viven en perfil.ajustes, §15.2) ───────────────── */
CB.adulto.AJUSTES = [
  { k: 'modoTiempo', t: 'Reloj', tipo: 'opciones',
    ops: [['conCalma', 'Con calma (recomendado)'], ['normal', 'Normal'], ['sinPrisa', 'Sin prisa']] },
  { k: 'noPuntuarVelocidadProblemas', t: 'No puntuar la velocidad en los problemas', tipo: 'bool' },
  { k: 'voz', t: 'Lectura en voz alta', tipo: 'bool' },
  { k: 'letraGrande', t: 'Letra grande', tipo: 'bool' },
  { k: 'altoContraste', t: 'Alto contraste', tipo: 'bool' },
  { k: 'tablas69', t: 'Activar las tablas del 3, 4, 6, 7, 8 y 9', tipo: 'bool',
    nota: 'El Real Decreto 157/2022 sitúa la construcción de las tablas en el segundo ciclo.' },
  { k: 'centimos', t: 'Activar los céntimos', tipo: 'bool',
    nota: 'El saber de primer ciclo cita solo monedas de 1 y 2 euros y billetes.' },
  { k: 'restasDobleLlevada', t: 'Activar restas con doble llevada', tipo: 'bool',
    nota: 'Contenido de 3.º. Activarlo suele producir frustración en 2.º.' },
  { k: 'limiteSesionMin', t: 'Límite de sesión', tipo: 'opciones',
    ops: [[10, '10 min'], [15, '15 min'], [20, '20 min'], [30, '30 min']] }
];

CB.adulto.cajaAjustes = function (perfil) {
  var caja = CB.ui.crear('div', 'adulto-caja');
  caja.appendChild(CB.ui.crear('h2', null, 'Ajustes'));

  CB.adulto.AJUSTES.forEach(function (a) {
    var fila = CB.ui.crear('div', 'metrica');
    var izq = CB.ui.crear('span');
    izq.appendChild(CB.ui.crear('span', null, a.t));
    if (a.nota) izq.appendChild(CB.ui.crear('p', 'texto-menor', a.nota));
    fila.appendChild(izq);

    if (a.tipo === 'bool') {
      var b = CB.ui.boton(perfil.ajustes[a.k] ? 'Sí' : 'No', 'btn-adulto', function () {
        perfil.ajustes[a.k] = !perfil.ajustes[a.k];
        b.textContent = perfil.ajustes[a.k] ? 'Sí' : 'No';
        CB.a11y.aplicarAjustes(perfil.ajustes, CB.almacen.ajustesDispositivo());
        CB.almacen.guardarPerfil(perfil);
      });
      b.className = 'btn-adulto';
      fila.appendChild(b);
    } else {
      var sel = CB.ui.crear('span');
      a.ops.forEach(function (op) {
        var b2 = CB.ui.crear('button', 'btn-adulto', op[1]);
        b2.type = 'button';
        if (perfil.ajustes[a.k] === op[0]) b2.style.fontWeight = 'bold';
        b2.addEventListener('click', function () {
          perfil.ajustes[a.k] = op[0];
          CB.almacen.guardarPerfil(perfil);
          CB.adulto.pintar();
        });
        sel.appendChild(b2);
      });
      fila.appendChild(sel);
    }
    caja.appendChild(fila);
  });

  /* Ajustes del APARATO, separados: en modo aula con 30 perfiles, mezclarlos
     hace que el maestro no entienda por qué a 12 alumnos no les aparece (§15.2). */
  var ap = CB.almacen.ajustesDispositivo();
  var f2 = CB.ui.crear('div', 'metrica');
  f2.appendChild(CB.ui.crear('span', null, 'Modo aula (hasta 30 perfiles)'));
  var ba = CB.ui.boton(ap.modoAula ? 'Sí' : 'No', 'btn-adulto', function () {
    ap.modoAula = !ap.modoAula;
    CB.almacen.guardarAjustesDispositivo(ap);
    ba.textContent = ap.modoAula ? 'Sí' : 'No';
  });
  f2.appendChild(ba);
  caja.appendChild(f2);

  var f3 = CB.ui.crear('div', 'metrica');
  f3.appendChild(CB.ui.crear('span', null, 'Modo proyección (pizarra digital)'));
  var bp = CB.ui.boton(ap.modoProyeccion ? 'Sí' : 'No', 'btn-adulto', function () {
    ap.modoProyeccion = !ap.modoProyeccion;
    CB.almacen.guardarAjustesDispositivo(ap);
    CB.a11y.aplicarAjustes(perfil.ajustes, ap);
    bp.textContent = ap.modoProyeccion ? 'Sí' : 'No';
  });
  f3.appendChild(bp);
  caja.appendChild(f3);

  return caja;
};

/* ── Informe imprimible ─────────────────────────────────────────────────── */
CB.adulto.imprimirInforme = function (perfilId) {
  var perfil = CB.perfil;
  var m = CB.adulto.metricas(perfil);
  var cuerpo = document.getElementById('informe-cuerpo');
  CB.ui.vaciar(cuerpo);

  cuerpo.appendChild(CB.ui.crear('h1', null, 'Cubomática — informe de ' + perfil.mote));
  cuerpo.appendChild(CB.ui.crear('p', null,
    'Fecha: ' + CB.util.hoyISO() + ' · ' + m.diasJugados + ' días jugados · ' +
    m.m2_partidas + ' expediciones'));

  var av = CB.ui.crear('div', 'adulto-aviso');
  av.appendChild(CB.ui.crear('p', null, CB.LEGAL.ALCANCE));
  av.appendChild(CB.ui.crear('p', null, CB.LEGAL.SECUENCIACION));
  av.appendChild(CB.ui.crear('p', null,
    'Este informe NO es una evaluación ni un diagnóstico clínico.'));
  cuerpo.appendChild(av);

  cuerpo.appendChild(CB.ui.crear('h2', null, 'Por bloques'));
  var t = CB.ui.crear('table', 'tabla-adulto');
  var trh = CB.ui.crear('tr');
  ['Bloque', 'Situación', 'Preguntas'].forEach(function (x) {
    trh.appendChild(CB.ui.crear('th', null, x));
  });
  t.appendChild(trh);
  m.m4_semaforo.forEach(function (s) {
    var tr = CB.ui.crear('tr');
    tr.appendChild(CB.ui.crear('td', null, s.bloque));
    var td = CB.ui.crear('td');
    var sp = CB.ui.crear('span', 'semaforo', s.precision == null ? '' : s.precision + ' %');
    sp.setAttribute('data-nivel', s.nivel);
    td.appendChild(sp); tr.appendChild(td);
    tr.appendChild(CB.ui.crear('td', null, String(s.n)));
    t.appendChild(tr);
  });
  cuerpo.appendChild(t);

  var cods = Object.keys(m.m7_errores).filter(function (c) {
    return m.m7_errores[c].vecesDiscriminante >= 2;
  }).slice(0, 3);
  cuerpo.appendChild(CB.ui.crear('h2', null, 'Qué conviene trabajar en casa o en el aula'));
  if (!cods.length) {
    cuerpo.appendChild(CB.ui.crear('p', null,
      'Sin evidencia suficiente para señalar un procedimiento concreto.'));
  } else {
    cods.forEach(function (c) {
      var rec = CB.datos.RECOMENDACIONES[c];
      if (!rec) return;
      cuerpo.appendChild(CB.ui.crear('h3', null, rec.frase));
      cuerpo.appendChild(CB.ui.crear('p', null, rec.actividad));
    });
  }

  cuerpo.appendChild(CB.ui.crear('p', 'pie-informe',
    CB.LEGAL.NORMA + ' — ' + CB.LEGAL.PRIVACIDAD));

  CB.pantallas.ir('p-informe');
  var b = document.getElementById('btn-imprimir');
  if (b) b.onclick = function () { window.print(); };
};

/* ── Ficha de refuerzo en papel: 10 ítems del tipo exacto que falla ─────── */
CB.adulto.fichaRefuerzo = function (perfil, codigoError) {
  var rec = CB.datos.RECOMENDACIONES[codigoError];
  var err = CB.ERRORES[codigoError];
  if (!rec || !err) return;

  var cuerpo = document.getElementById('informe-cuerpo');
  CB.ui.vaciar(cuerpo);

  var ficha = CB.ui.crear('div', 'ficha-refuerzo');
  ficha.appendChild(CB.ui.crear('h1', null, 'Ficha de refuerzo · ' + perfil.mote));
  ficha.appendChild(CB.ui.crear('p', null, rec.frase));
  ficha.appendChild(CB.ui.crear('p', null, 'Antes de la ficha: ' + rec.actividad));

  var niveles = CB.catalogo.todos().filter(function (n) {
    return n.letra === err.familia && !n.ampliacion;
  });
  var nivel = niveles[Math.floor(niveles.length / 2)] || niveles[0];

  var rej = CB.ui.crear('div', 'rejilla-ejercicios');
  var i;
  for (i = 0; i < 10 && nivel; i++) {
    var rng = CB.util.mulberry32(CB.util.hash32(perfil.id + codigoError + i));
    var item = nivel.generar(rng, 2, { ajustes: perfil.ajustes, techo: 999,
                                       bolsas: CB.gen.problemas.nuevoEstadoBolsas() });
    if (!item) continue;
    rej.appendChild(CB.ui.crear('div', 'ficha-refuerzo__ejercicio',
      (item.consigna || item.enunciado || '') + '  ='));
  }
  ficha.appendChild(rej);
  ficha.appendChild(CB.ui.crear('p', 'ficha-refuerzo__pie',
    'Cubomática · ficha generada el ' + CB.util.hoyISO() +
    ' · sin datos personales · ' + CB.LEGAL.NORMA));
  cuerpo.appendChild(ficha);

  CB.pantallas.ir('p-informe');
  var b = document.getElementById('btn-imprimir');
  if (b) b.onclick = function () { window.print(); };
};

/* ── CSV ────────────────────────────────────────────────────────────────── */
CB.adulto.descargarCSV = function (perfil) {
  var lineas = ['fecha;itemId;nivel;destreza;beta;D;rt_ms;correcta;valor_dado;flags'];
  (perfil.respuestas || []).forEach(function (r) {
    var nivelId = String(r[1]).split('#')[0];
    var nivel = CB.catalogo.get(nivelId);
    var f = new Date(r[0]);
    lineas.push([
      CB.util.hoyISO(f), r[1], nivelId, nivel ? nivel.destreza : '',
      r[2], r[3], r[4], r[5], r[6], r[7]
    ].join(';'));
  });
  CB.adulto.descargar(lineas.join('\n'),
    'cubomatica-' + perfil.mote.replace(/\s+/g, '-') + '.csv', 'text/csv');
};

CB.adulto.descargar = function (texto, nombre, tipo) {
  try {
    var blob = new Blob([texto], { type: tipo + ';charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  } catch (e) {
    CB.a11y.anunciar('No se ha podido descargar el fichero en este navegador.');
  }
};

/* Borrar exige escribir la palabra BORRAR (§15.8). */
/* Restaurar un perfil desde un .json exportado.

   Todo lo que entra pasa por CB.almacen.validarImportado(), que es la ÚNICA
   superficie de ataque del proyecto: recorta a los campos permitidos, obliga a
   que el mote salga de la lista cerrada de 120, valida el color contra un
   patrón y acota el tamaño de los arrays. Aquí no se salta ni un paso. */
CB.adulto.restaurar = function (cont) {
  var aviso = document.getElementById('adulto-aviso-datos');
  function decir(t) {
    if (aviso) aviso.textContent = t;
    CB.a11y.anunciar(t);
  }

  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.style.display = 'none';

  input.addEventListener('change', function () {
    var f = input.files && input.files[0];
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) {
      decir('Ese fichero es demasiado grande para ser una copia de Cubomática.');
      return;
    }
    var lector = new FileReader();
    lector.onerror = function () { decir('No se ha podido leer el fichero.'); };
    lector.onload = function () {
      var crudo;
      try {
        crudo = JSON.parse(String(lector.result));
      } catch (e) {
        decir('Ese fichero no es una copia de Cubomática: no se entiende su contenido.');
        return;
      }
      var v = CB.almacen.validarImportado(crudo, CB.datos.MOTES);
      if (!v.ok) {
        decir(v.motivo === 'version'
          ? 'Esa copia viene de una versión más nueva del juego. Actualiza Cubomática antes de restaurarla.'
          : 'Ese fichero no tiene la forma de una copia de Cubomática.');
        return;
      }

      var p = v.perfil;
      var idx = CB.almacen.indice();
      var existe = idx.some(function (e) { return e.id === p.id; });
      /* Si ya hay un perfil con ese id, se restaura ENCIMA: es lo que espera
         quien recupera su propia copia. Si es nuevo, se añade al índice. */
      CB.almacen.guardarPerfil(p);
      if (!existe) {
        idx.push({ id: p.id, mote: p.mote, avatar: p.avatar });
        CB.almacen.guardarIndice(idx);
      }
      CB.almacen.fijarUltimoPerfil(p.id);
      decir('Copia restaurada: ' + p.mote + (existe ? ' (se ha sustituido el perfil que había)' : '') + '.');
      CB.perfiles.activar(p.id);
    };
    lector.readAsText(f);
  });

  if (cont) cont.appendChild(input);
  input.click();
};

CB.adulto.confirmarBorrado = function (perfil, cont) {
  var caja = CB.ui.crear('div', 'adulto-aviso');
  caja.appendChild(CB.ui.crear('p', null,
    'Esto borra para siempre el progreso de ' + perfil.mote +
    '. Escribe BORRAR para confirmar.'));
  var campo = CB.ui.crear('input');
  campo.type = 'text';
  campo.setAttribute('aria-label', 'Escribe BORRAR');
  caja.appendChild(campo);
  caja.appendChild(CB.ui.boton('Confirmar', 'btn-adulto btn-adulto--peligro', function () {
    if (campo.value.trim().toUpperCase() !== 'BORRAR') return;
    CB.almacen.borrarPerfil(perfil.id);
    CB.perfil = null;
    CB.adulto.desbloqueado = false;
    CB.pantallas.ir('p-perfiles');
  }));
  cont.appendChild(caja);
};
