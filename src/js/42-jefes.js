/* 42-jefes.js — Los 4 jefes, cada uno con una mecánica PROPIA */

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
  const mundo = CB.catalogo.getMundo(mundoId);
  if (!mundo) return null;
  const def = CB.jefes.DEFINICION[mundo.jefe];
  const perfil = CB.perfil;

  CB.jefes.estado = {
    mundo: mundo, jefe: mundo.jefe, def: def,
    bloques: CB.jefes.BLOQUES, turno: 0, sinFallos: true,
    respondido: false,
    rng: CB.util.mulberry32(CB.util.hash32(perfil.id + mundoId + CB.util.hoyISO()))
  };

  CB.pantallas.ir('p-jefe');
  const n = document.getElementById('jefe-nombre');
  if (n) n.textContent = mundo.jefe;
  const c = document.getElementById('jefe-criatura');
  if (c) c.textContent = def.icono;

  const av = document.getElementById('jefe-aviso');
  if (av) {
    av.textContent = (def && def.intro ? def.intro + ' ' : '') +
                     'Aquí no se apagan luces. Aquí solo se cavan bloques.';
  }

  CB.jefes.pintarArmadura();
  CB.jefes.turno();
  return CB.jefes.estado;
};

CB.jefes.pintarArmadura = function () {
  const e = CB.jefes.estado;
  const cont = document.getElementById('jefe-armadura');
  if (!cont) return;
  CB.ui.vaciar(cont);
  let i;
  for (i = 0; i < CB.jefes.BLOQUES; i++) {
    const b = CB.ui.crear('b', 'jefe__bloque');
    b.setAttribute('data-caido', i < (CB.jefes.BLOQUES - e.bloques) ? 'si' : 'no');
    cont.appendChild(b);
  }
  cont.setAttribute('aria-label', 'Quedan ' + e.bloques + ' bloques por caer');
};

/* Un turno, con la mecánica propia de cada jefe */
CB.jefes.turno = function () {
  const e = CB.jefes.estado;
  if (!e) return;

  if (e.bloques <= 0 || e.turno >= CB.jefes.TOPE_TURNOS) {
    CB.jefes.terminar(e.bloques <= 0);
    return;
  }
  e.turno++;
  e.respondido = false;          // se abre el cerrojo del turno nuevo

  const enun = document.getElementById('jefe-enunciado');
  const opc = document.getElementById('jefe-opciones');
  CB.ui.vaciar(enun);
  CB.ui.vaciar(opc);

  const m = e.def.mecanica;

  if (m === 'ramas') {
    /* Hay que ELEGIR QUÉ RAMA atacar: cada rama es una operación distinta. */
    enun.appendChild(CB.ui.crear('p', 'enunciado', 'Elige la rama cuyo resultado sea ' +
      CB.jefes.prepararRamas(e, opc) + '.'));
    return;
  }

  if (m === 'nenufares') {
    /* Hay que ANTICIPAR dónde caerá: es una serie, no una operación suelta. */
    const salto = CB.util.elegir(e.rng, [2, 5, 10]);
    const inicio = CB.util.ent(e.rng, salto, 40);
    const serie = [inicio, inicio + salto, inicio + salto * 2];
    const destino = inicio + salto * 3;
    enun.appendChild(CB.ui.crear('p', 'enunciado',
      'Ranacubo salta: ' + serie.join(', ') + '… ¿A qué nenúfar irá?'));
    CB.jefes.opciones(opc, destino, [destino + salto, destino - salto, destino + 1]);
    return;
  }

  if (m === 'reflejo') {
    /* Hay que ELEGIR LOS DATOS correctos antes de operar. */
    const a = CB.util.ent(e.rng, 5, 40), b = CB.util.ent(e.rng, 1, a);
    const sobra = CB.util.ent(e.rng, 1, 9);
    enun.appendChild(CB.ui.crear('p', 'enunciado',
      'Cristalina refleja: ' + a + ', ' + b + ' y ' + sobra + '.'));
    enun.appendChild(CB.ui.crear('p', 'texto texto--menor',
      '¿Cuánto queda al quitar ' + b + ' de ' + a + '?'));
    CB.jefes.opciones(opc, a - b, [a + b, a - b + sobra, a - sobra]);
    return;
  }

  /* restaurar: la multiplicación como matriz a la que le falta una pieza */
  const f = CB.util.elegir(e.rng, [2, 5, 10]);
  const g = CB.util.ent(e.rng, 2, 10);
  enun.appendChild(CB.ui.crear('p', 'enunciado',
    'Brasita ha apagado la matriz de ' + f + ' × ' + g + '.'));
  enun.appendChild(CB.ui.matriz(f, g));
  enun.appendChild(CB.ui.crear('p', 'texto texto--menor', '¿Cuántos bloques hay que restaurar?'));
  CB.jefes.opciones(opc, f * g, [f * g - f, f * g + f, f + g]);
};

CB.jefes.prepararRamas = function (e, opc) {
  const objetivo = CB.util.ent(e.rng, 10, 60);
  let ramas = [], i, a, b;
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
    const b2 = CB.ui.boton(r.a + ' + ' + r.b, '', function () {
      CB.jefes.responder(r.valor === objetivo);
    });
    opc.appendChild(b2);
  });
  return objetivo;
};

/* Bucle infinito, pestaña colgada, y el niño pierde la partida entera sin un solo error en consola. */
CB.jefes.opciones = function (cont, correcta, distractores) {
  const e = CB.jefes.estado;
  const lista = [{ v: correcta, ok: true }];

  function anadir(v) {
    if (v === correcta || !(v >= 0) || v > 999) return false;
    if (lista.some(function (x) { return x.v === v; })) return false;
    lista.push({ v: v, ok: false });
    return true;
  }

  distractores.forEach(anadir);

  let paso = 1;
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

/* Y no era solo el atajo. */
CB.jefes.responder = function (correcto) {
  const e = CB.jefes.estado;
  if (!e || e.respondido) return;
  e.respondido = true;

  let mitad = false;
  if (correcto) {
    e.bloques--;
    CB.audio.sfx('picar');
    CB.ui.particulasDe(document.getElementById('jefe-armadura'), 'var(--deco-piedra)');
    /* SIMETRÍA. El único anuncio del combate era el del fallo: para un lector de
       pantalla, silencio al acertar y voz al fallar — el reparto exactamente al
       revés. «Cae», nunca «daño»: aquí no se hace daño a nadie. */
    CB.a11y.anunciar('Ese bloque cae. Quedan ' + e.bloques + '.');
    /* UNA cinta por combate, cuando la armadura se parte por la mitad. Una vez y
       no cada turno: el espectáculo es inversamente proporcional a la frecuencia.
       Y no en el último bloque, que cancelaría la 'bandera' del final. */
    mitad = (e.bloques === Math.floor(CB.jefes.BLOQUES / 2));
    if (mitad) CB.ui.festejo.mostrar('superacion', '¡A la mitad!');
  } else {
    /* El fallo REPARA un bloque: alarga el combate, nunca lo pierde.
       CB.vidas.fallo() devuelve luces SIN CAMBIO en modo jefe. */
    e.sinFallos = false;
    e.bloques = Math.min(CB.jefes.BLOQUES, e.bloques + 1);
    CB.audio.sfx('fallo');
    CB.a11y.anunciar('Ese bloque vuelve a su sitio. Sigue intentándolo.');
  }
  CB.jefes.pintarArmadura();
  /* La espera la manda la tabla del festejo, no un 900 copiado a mano: sin esto
     el cartel de la mitad seguiría en pantalla mientras aparece la pregunta
     nueva, porque el turno se repinta exactamente a los 900 ms. */
  setTimeout(function () {
    if (CB.jefes.estado === e) CB.jefes.turno();
  },
             mitad ? CB.ui.festejo.espera('superacion', 900) : 900);
};

CB.jefes.terminar = function (porBloques) {
  const e = CB.jefes.estado, perfil = CB.perfil;
  if (!e) return;

  if (!perfil.mundos[e.mundo.id]) {
    perfil.mundos[e.mundo.id] = { desbloqueado: true, gemasNivel: 0,
                                  nivelesCompletados: 0, jefe: false, jefeSinFallos: false };
  }
  perfil.mundos[e.mundo.id].jefe = true;
  if (e.sinFallos) perfil.mundos[e.mundo.id].jefeSinFallos = true;

  /* Pasado el tope de turnos el jefe cede igualmente, con recompensa menor. */
  const gemas = porBloques ? 25 : 10;
  perfil.gemas += gemas;

  const nuevos = CB.logros.comprobar('jefe', {
    perfil: perfil, modo: 'jefe', hoyISO: CB.util.hoyISO(), jefeSuperado: true
  });
  let i;
  for (i = 0; i < nuevos.length; i++) CB.a11y.anunciar('Logro: ' + nuevos[i].nombre);

  /* La cinta más larga del juego, y puede permitírselo: se ve cuatro veces en
     toda la vida de un perfil, una por mundo. Trae su propio sonido. */
  CB.ui.festejo.mostrar('jefe', '¡Paso abierto!');
  /* El siguiente emit del bus —«Volver al mapa»— repone el tema solo. */
  CB.musica.poner('victoria');
  CB.almacen.guardarPerfil(perfil);

  const enun = document.getElementById('jefe-enunciado');
  const opc = document.getElementById('jefe-opciones');
  CB.ui.vaciar(enun); CB.ui.vaciar(opc);
  enun.appendChild(CB.ui.crear('h2', null, '¡' + e.jefe + ' abre el paso!'));
  enun.appendChild(CB.ui.crear('p', 'texto texto--lectura',
    'Has ganado ' + gemas + ' gemas y el mundo queda cerrado con una victoria.'));
  opc.appendChild(CB.ui.boton('Volver al mapa', 'btn-bloque--primario btn-bloque--medio',
    function () { CB.pantallas.ir('p-mapa'); }));

  CB.jefes.estado = null;
};
