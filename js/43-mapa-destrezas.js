/* ============================================================================
   43-mapa-destrezas.js — La Cantera: el mapa de vetas del niño
   ----------------------------------------------------------------------------
   POR DEFECTO SOLO EL MUNDO ACTUAL (PLAN §20, mejora 1). Presentar 92 vetas de
   golpe a un niño de 7 años produce parálisis, no competencia percibida: la
   misma pantalla que pretende sostener su motivación acabaría documentando su
   incompetencia. «Ver toda la cantera» es una vista secundaria.

   Es una recompensa INFORMATIVA en lugar de numérica: el niño ve crecer su
   conocimiento, no su marcador. Es el antídoto contra el efecto de
   sobrejustificación.
   ========================================================================== */

var CB = CB || {};
CB.mapaDestrezas = CB.mapaDestrezas || {};

CB.mapaDestrezas.verTodo = false;

CB.mapaDestrezas.mundoActual = function (perfil) {
  var i, m, ultimo = CB.MUNDOS[0];
  for (i = 0; i < CB.MUNDOS.length; i++) {
    m = CB.MUNDOS[i];
    if (perfil.mundos[m.id] && perfil.mundos[m.id].desbloqueado) ultimo = m;
  }
  return ultimo;
};

CB.mapaDestrezas.pintar = function () {
  var perfil = CB.perfil;
  if (!perfil) return;
  var hoy = CB.util.hoyISO();
  var cont = document.getElementById('rejilla-vetas');
  if (!cont) return;
  CB.ui.vaciar(cont);

  var mundo = CB.mapaDestrezas.mundoActual(perfil);
  var ids = CB.mapaDestrezas.verTodo ? CB.catalogo.ids() : mundo.niveles;
  var frontera = CB.grafo.frontera(perfil);

  var pista = document.getElementById('cantera-pista');
  if (pista) {
    pista.textContent = CB.mapaDestrezas.verTodo
      ? 'Toda la cantera'
      : 'Lo siguiente que puedes cavar — ' + mundo.nombre;
  }

  var conteo = { bloqueado: 0, nuevo: 0, aprendiendo: 0, afianzada: 0, dominada: 0, oxidada: 0 };

  ids.forEach(function (id) {
    var nivel = CB.catalogo.get(id);
    if (!nivel) return;
    var bloqueado = CB.grafo.estado(id, perfil) === 'bloqueado';
    var d = perfil.destrezas[nivel.destreza];
    var estadoNivel = perfil.niveles[id];

    var estado;
    if (bloqueado) estado = 'bloqueado';
    else if (!estadoNivel || !estadoNivel.n) estado = 'nuevo';
    else estado = CB.memoria.clasificar(d, hoy, false);
    conteo[estado] = (conteo[estado] || 0) + 1;

    var veta = CB.ui.crear('div', 'veta');
    veta.setAttribute('data-estado', estado);
    veta.setAttribute('role', 'img');
    /* Nunca solo color: icono + nombre + estado en texto (§10.4). */
    veta.setAttribute('aria-label', nivel.nombre + ': ' + CB.memoria.ETIQUETA[estado]);
    veta.appendChild(CB.ui.crear('span', 'veta-icono', CB.memoria.ICONO[estado]));
    veta.appendChild(CB.ui.crear('span', null, nivel.nombre));
    veta.appendChild(CB.ui.crear('span', 'texto-menor', CB.memoria.ETIQUETA[estado]));

    if (frontera.indexOf(id) !== -1) veta.classList.add('frontera');
    if (estado === 'oxidada') veta.classList.add('musgo-crece');
    if (nivel.ampliacion) {
      var dist = CB.ui.crear('span', 'distintivo', 'ampliación');
      veta.appendChild(dist);
    }
    cont.appendChild(veta);
  });

  var ley = document.getElementById('leyenda-vetas');
  if (ley) {
    CB.ui.vaciar(ley);
    ['dominada', 'afianzada', 'aprendiendo', 'oxidada', 'nuevo', 'bloqueado'].forEach(function (k) {
      if (!conteo[k]) return;
      var s = CB.ui.crear('span', null,
        CB.memoria.ICONO[k] + ' ' + conteo[k] + ' ' + CB.memoria.ETIQUETA[k] + '   ');
      ley.appendChild(s);
    });
    if (conteo.oxidada) {
      ley.appendChild(CB.ui.crear('p', 'texto-menor',
        'Las vetas con musgo se repasan en dos minutos.'));
    }
  }

  var btn = document.getElementById('btn-toda-cantera');
  if (btn) {
    btn.textContent = CB.mapaDestrezas.verTodo ? 'Ver solo mi mundo' : 'Ver toda la cantera';
    btn.onclick = function () {
      CB.mapaDestrezas.verTodo = !CB.mapaDestrezas.verTodo;
      CB.mapaDestrezas.pintar();
    };
  }
};

/* ── El mapa de mundos ──────────────────────────────────────────────────── */
CB.mapaDestrezas.pintarMundos = function () {
  var perfil = CB.perfil;
  if (!perfil) return;
  var cont = document.getElementById('rejilla-mundos');
  if (!cont) return;
  CB.ui.vaciar(cont);

  var saludo = document.getElementById('mapa-saludo');
  if (saludo) {
    var vencidos = CB.memoria.vencidosHoy(perfil, CB.util.hoyISO());
    saludo.textContent = vencidos.length
      ? ('Hay ' + vencidos.length + (vencidos.length === 1 ? ' veta' : ' vetas') +
         ' con musgo esperándote.')
      : ('Hola, ' + perfil.mote + '.');
  }

  CB.partida.desbloquearMundos();

  CB.MUNDOS.forEach(function (m) {
    var estado = perfil.mundos[m.id] || { desbloqueado: false };
    var prog = CB.catalogo.progresoMundo(m.id, perfil);
    var tarjeta = CB.ui.crear('div', 'tarjeta-mundo');
    tarjeta.setAttribute('data-bloqueado', estado.desbloqueado ? 'no' : 'si');

    var cinta = CB.ui.crear('div', 'cinta-bioma');
    cinta.setAttribute('data-bioma', m.bioma);
    tarjeta.appendChild(cinta);

    tarjeta.appendChild(CB.ui.crear('h3', null, m.nombre));

    /* M4 lleva el distintivo INICIACIÓN con nota tocable que explica en lenguaje
       llano por qué la multiplicación es iniciación (§6.5). */
    if (m.distintivo) {
      var d = CB.ui.crear('button', 'distintivo', m.distintivo);
      d.type = 'button';
      d.addEventListener('click', function () {
        CB.a11y.anunciar(CB.LEGAL.MULTIPLICACION);
        var nota = document.getElementById('nota-iniciacion');
        if (!nota) {
          nota = CB.ui.crear('p', 'texto-menor');
          nota.id = 'nota-iniciacion';
          tarjeta.appendChild(nota);
        }
        nota.textContent = CB.LEGAL.MULTIPLICACION;
      });
      tarjeta.appendChild(d);
    }

    tarjeta.appendChild(CB.ui.barra(prog.fraccion));
    tarjeta.appendChild(CB.ui.crear('p', 'texto-menor',
      prog.hechos + ' de ' + prog.total + ' vetas abiertas'));

    if (estado.desbloqueado) {
      tarjeta.appendChild(CB.ui.boton('Cavar aquí', 'btn-bloque--primario btn-bloque--ancho',
        function () { CB.partida.iniciar({ mundoId: m.id, modo: 'expedicion' }); }));

      /* El jefe NO bloquea el paso al mundo siguiente: cierra el mundo con una
         victoria (§5.3). */
      if (prog.fraccion >= 0.6) {
        tarjeta.appendChild(CB.ui.boton(m.jefeIcono + ' Reto: ' + m.jefe, 'btn-bloque--ancho',
          function () { CB.jefes.iniciar(m.id); }));
      }
    } else {
      tarjeta.appendChild(CB.ui.crear('p', 'texto-menor',
        'Se abre al cavar más vetas del mundo anterior.'));
    }
    cont.appendChild(tarjeta);
  });
};
