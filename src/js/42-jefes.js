/* ============================================================================
   42-jefes.js — Los 4 jefes, cada uno con una mecánica PROPIA
   ----------------------------------------------------------------------------
   NINGÚN JEFE APAGA LUCES (PLAN §12.9). El plan v1 le daba al jefe «armadura de
   10 bloques y daño 1-3», es decir, capacidad de quitar vidas en el momento de
   máxima fatiga y máxima expectativa. Un niño que recorre un mundo entero y
   pierde en el jefe se queda sin la recompensa de cierre: es el punto de
   abandono clásico.

   Aquí el fallo solo REPARA un bloque de la armadura: el combate se alarga,
   nunca se pierde. Tope de 20 turnos, pasado el cual el jefe cede igualmente.
   Vocabulario: «bloques que caen», NUNCA «daño». Sin vocabulario de combate.

   Y cada jefe usa una MECÁNICA DISTINTA, no una lista de preguntas más difíciles
   (criterio de HECHO de F6).
   ========================================================================== */

var CB = CB || {};
CB.jefes = CB.jefes || {};

CB.jefes.TOPE_TURNOS = 20;
CB.jefes.BLOQUES = 8;

CB.jefes.DEFINICION = {
  Tronquete: {
    mundo: 'M1', icono: '🌳',
    mecanica: 'ramas',
    intro: 'Tronquete tiene cuatro ramas. Elige cuál talas primero.'
  },
  Ranacubo: {
    mundo: 'M2', icono: '🐸',
    mecanica: 'nenufares',
    intro: 'Ranacubo salta de nenúfar en nenúfar. ¿Dónde caerá?'
  },
  Cristalina: {
    mundo: 'M3', icono: '💠',
    mecanica: 'reflejo',
    intro: 'Cristalina refleja el cuento. Elige los datos que sirven.'
  },
  Brasita: {
    mundo: 'M4', icono: '🔥',
    mecanica: 'restaurar',
    intro: 'Brasita apaga bloques de la matriz. Restaura el que falta.'
  }
};

CB.jefes.estado = null;

CB.jefes.iniciar = function (mundoId) {
  var mundo = CB.catalogo.getMundo(mundoId);
  if (!mundo) return null;
  var def = CB.jefes.DEFINICION[mundo.jefe];
  var perfil = CB.perfil;

  CB.jefes.estado = {
    mundo: mundo, jefe: mundo.jefe, def: def,
    bloques: CB.jefes.BLOQUES, turno: 0, sinFallos: true,
    respondido: false,
    rng: CB.util.mulberry32(CB.util.hash32(perfil.id + mundoId + CB.util.hoyISO()))
  };

  CB.pantallas.ir('p-jefe');
  var n = document.getElementById('jefe-nombre');
  if (n) n.textContent = mundo.jefe;
  var c = document.getElementById('jefe-criatura');
  if (c) c.textContent = def.icono;
  var av = document.getElementById('jefe-aviso');
  if (av) av.textContent = 'Aquí no se apagan luces. Aquí solo se cavan bloques.';

  CB.jefes.pintarArmadura();
  CB.jefes.turno();
  return CB.jefes.estado;
};

CB.jefes.pintarArmadura = function () {
  var e = CB.jefes.estado;
  var cont = document.getElementById('jefe-armadura');
  if (!cont) return;
  CB.ui.vaciar(cont);
  var i;
  for (i = 0; i < CB.jefes.BLOQUES; i++) {
    var b = CB.ui.crear('b');
    b.setAttribute('data-caido', i < (CB.jefes.BLOQUES - e.bloques) ? 'si' : 'no');
    cont.appendChild(b);
  }
  cont.setAttribute('aria-label', 'Quedan ' + e.bloques + ' bloques por caer');
};

/* ── Un turno, con la mecánica propia de cada jefe ──────────────────────── */
CB.jefes.turno = function () {
  var e = CB.jefes.estado, perfil = CB.perfil;
  if (!e) return;

  if (e.bloques <= 0 || e.turno >= CB.jefes.TOPE_TURNOS) {
    CB.jefes.terminar(e.bloques <= 0);
    return;
  }
  e.turno++;
  e.respondido = false;          // se abre el cerrojo del turno nuevo

  var enun = document.getElementById('jefe-enunciado');
  var opc = document.getElementById('jefe-opciones');
  CB.ui.vaciar(enun);
  CB.ui.vaciar(opc);

  var m = e.def.mecanica;

  if (m === 'ramas') {
    /* Hay que ELEGIR QUÉ RAMA atacar: cada rama es una operación distinta. */
    enun.appendChild(CB.ui.crear('p', 'enunciado', 'Elige la rama cuyo resultado sea ' +
      CB.jefes.prepararRamas(e, opc) + '.'));
    return;
  }

  if (m === 'nenufares') {
    /* Hay que ANTICIPAR dónde caerá: es una serie, no una operación suelta. */
    var salto = CB.util.elegir(e.rng, [2, 5, 10]);
    var inicio = CB.util.ent(e.rng, salto, 40);
    var serie = [inicio, inicio + salto, inicio + salto * 2];
    var destino = inicio + salto * 3;
    enun.appendChild(CB.ui.crear('p', 'enunciado',
      'Ranacubo salta: ' + serie.join(', ') + '… ¿A qué nenúfar irá?'));
    CB.jefes.opciones(opc, destino, [destino + salto, destino - salto, destino + 1]);
    return;
  }

  if (m === 'reflejo') {
    /* Hay que ELEGIR LOS DATOS correctos antes de operar. */
    var a = CB.util.ent(e.rng, 5, 40), b = CB.util.ent(e.rng, 1, a);
    var sobra = CB.util.ent(e.rng, 1, 9);
    enun.appendChild(CB.ui.crear('p', 'enunciado',
      'Cristalina refleja: ' + a + ', ' + b + ' y ' + sobra + '.'));
    enun.appendChild(CB.ui.crear('p', 'texto-menor',
      '¿Cuánto queda al quitar ' + b + ' de ' + a + '?'));
    CB.jefes.opciones(opc, a - b, [a + b, a - b + sobra, a - sobra]);
    return;
  }

  /* restaurar: la multiplicación como matriz a la que le falta una pieza */
  var f = CB.util.elegir(e.rng, [2, 5, 10]);
  var g = CB.util.ent(e.rng, 2, 10);
  enun.appendChild(CB.ui.crear('p', 'enunciado',
    'Brasita ha apagado la matriz de ' + f + ' × ' + g + '.'));
  enun.appendChild(CB.ui.matriz(f, g));
  enun.appendChild(CB.ui.crear('p', 'texto-menor', '¿Cuántos bloques hay que restaurar?'));
  CB.jefes.opciones(opc, f * g, [f * g - f, f * g + f, f + g]);
};

CB.jefes.prepararRamas = function (e, opc) {
  var objetivo = CB.util.ent(e.rng, 10, 60);
  var ramas = [], i, a, b;
  for (i = 0; i < 4; i++) {
    if (i === 0) { a = CB.util.ent(e.rng, 1, objetivo); b = objetivo - a; }
    else {
      a = CB.util.ent(e.rng, 1, 60);
      b = CB.util.ent(e.rng, 1, 40);
      if (a + b === objetivo) b += 1;
    }
    ramas.push({ a: a, b: b, valor: a + b });
  }
  ramas = CB.util.barajar(ramas, e.rng);
  ramas.forEach(function (r) {
    var b2 = CB.ui.boton(r.a + ' + ' + r.b, '', function () {
      CB.jefes.responder(r.valor === objetivo);
    });
    opc.appendChild(b2);
  });
  return objetivo;
};

/* EL RELLENO TIENE QUE AVANZAR SIEMPRE. La versión anterior calculaba el
   candidato como `correcta + lista.length` DENTRO del bucle: si ese número ya
   estaba en la lista no se añadía nada, la longitud no cambiaba, y la siguiente
   vuelta calculaba exactamente el mismo candidato. Bucle infinito, pestaña
   colgada, y el niño pierde la partida entera sin un solo error en consola.

   No era teórico ni raro: pasa siempre que un distractor coincide con otro y la
   lista se queda en tres. Barrido exhaustivo del espacio real de la mecánica
   «reflejo» de Cristalina: 1,29 % de los turnos, es decir el 22,9 % de los
   combates de veinte turnos. Y como el rng va sembrado con perfil+mundo+fecha,
   al niño al que le toca le vuelve a tocar cada vez que lo reintenta ese día.

   Ahora el candidato depende de un contador propio que sube en cada vuelta, con
   tope explícito además: el desplazamiento es la garantía, el tope es el
   cinturón. Si aun así no se llegara a cuatro, se sirven las que haya —tres
   opciones son un turno raro; una pestaña colgada es una partida perdida. */
CB.jefes.opciones = function (cont, correcta, distractores) {
  var e = CB.jefes.estado;
  var lista = [{ v: correcta, ok: true }];

  function anadir(v) {
    if (v === correcta || !(v >= 0) || v > 999) return false;
    if (lista.some(function (x) { return x.v === v; })) return false;
    lista.push({ v: v, ok: false });
    return true;
  }

  distractores.forEach(anadir);

  var paso = 1;
  while (lista.length < 4 && paso <= 20) {
    anadir(correcta + paso);
    if (lista.length < 4) anadir(correcta - paso);
    paso++;
  }

  CB.util.barajar(lista, e.rng).forEach(function (o) {
    cont.appendChild(CB.ui.boton(String(o.v), '', function () {
      CB.jefes.responder(o.ok);
    }));
  });
};

/* UNA RESPUESTA POR TURNO, igual que en la partida (ver el cerrojo `respondido`
   de CB.partida.responder y el porqué largo que lleva al lado). Aquí faltaba, y
   el jefe es donde más se nota: los cuatro botones siguen en pantalla los 900 ms
   que dura la animación de los bloques y NO se deshabilitan, así que ocho toques
   rápidos en la opción correcta tiraban los ocho bloques de la armadura y el
   combate se acababa antes del primer turno. Medido: 5 toques, 5 bloques.

   Y no era solo el atajo. Cada toque encolaba otro setTimeout(turno, 900), de
   modo que el enunciado se repintaba encima de sí mismo y el contador de turnos
   avanzaba de cinco en cinco hacia el tope de veinte. */
CB.jefes.responder = function (correcto) {
  var e = CB.jefes.estado;
  if (!e || e.respondido) return;
  e.respondido = true;

  if (correcto) {
    e.bloques--;
    CB.audio.sfx('picar');
    CB.ui.particulasDe(document.getElementById('jefe-armadura'), 'var(--deco-piedra)');
  } else {
    /* El fallo REPARA un bloque: alarga el combate, nunca lo pierde.
       CB.vidas.fallo() devuelve luces SIN CAMBIO en modo jefe. */
    e.sinFallos = false;
    e.bloques = Math.min(CB.jefes.BLOQUES, e.bloques + 1);
    CB.audio.sfx('fallo');
    CB.a11y.anunciar('Ese bloque vuelve a su sitio. Sigue intentándolo.');
  }
  CB.jefes.pintarArmadura();
  setTimeout(function () { CB.jefes.turno(); }, 900);
};

CB.jefes.terminar = function (porBloques) {
  var e = CB.jefes.estado, perfil = CB.perfil;
  if (!e) return;

  if (!perfil.mundos[e.mundo.id]) {
    perfil.mundos[e.mundo.id] = { desbloqueado: true, gemasNivel: 0,
                                  nivelesCompletados: 0, jefe: false, jefeSinFallos: false };
  }
  perfil.mundos[e.mundo.id].jefe = true;
  if (e.sinFallos) perfil.mundos[e.mundo.id].jefeSinFallos = true;

  /* Pasado el tope de turnos el jefe cede igualmente, con recompensa menor. */
  var gemas = porBloques ? 25 : 10;
  perfil.gemas += gemas;

  var nuevos = CB.logros.comprobar('jefe', {
    perfil: perfil, modo: 'jefe', hoyISO: CB.util.hoyISO(), jefeSuperado: true
  });
  var i;
  for (i = 0; i < nuevos.length; i++) CB.a11y.anunciar('Logro: ' + nuevos[i].nombre);

  CB.audio.sfx('subirNivel');
  CB.almacen.guardarPerfil(perfil);

  var enun = document.getElementById('jefe-enunciado');
  var opc = document.getElementById('jefe-opciones');
  CB.ui.vaciar(enun); CB.ui.vaciar(opc);
  enun.appendChild(CB.ui.crear('h2', null, '¡' + e.jefe + ' abre el paso!'));
  enun.appendChild(CB.ui.crear('p', 'texto-lectura',
    'Has ganado ' + gemas + ' gemas y el mundo queda cerrado con una victoria.'));
  opc.appendChild(CB.ui.boton('Volver al mapa', 'btn-bloque--primario btn-bloque--medio',
    function () { CB.pantallas.ir('p-mapa'); }));

  CB.jefes.estado = null;
};
