/* casos-cursos.js — Cursos 1.º-6.º (3.0.0): E127-E140 */

CB.pruebas.suite('Cursos: betas congeladas, mezcla 80/20 y promoción', function () {
  const t = CB.pruebas;

  /* E127 · LAS 92 BETAS DE 2.º, CONGELADAS LITERALMENTE. La beta se interpola
     por posición dentro de la familia: antes de 3.0.0, añadir un solo nivel a
     una familia recalculaba la beta de todos los demás y desplazaba el
     emparejamiento adaptativo de los perfiles guardados sin que nada fallara.
     La interpolación es ahora por familia×CURSO justo para que esto no pase;
     este volcado es lo único que lo puede ver. Si un cambio legítimo tiene que
     mover estas betas, este guardián se cambia A PROPÓSITO y se anota en
     docs/decisiones.md, nunca de pasada. */
  const BETAS_2 = {
    N1: 320, N2: 365, N3: 411, N4: 456, N5: 501, N6: 547, N7: 592, N8: 637,
    N9: 683, N10: 728, N11: 773, N12: 819, N13: 864, N14: 909, N15: 955, N16: 1000,
    S1: 340, S2: 392, S3: 444, S4: 496, S5: 548, S6: 600, S7: 652, S8: 704,
    S9: 756, S10: 808, S11: 860, S12: 912, S13: 964, S14: 1016, S15: 1068, S16: 1120,
    R1: 380, R2: 440, R3: 500, R4: 560, R5: 620, R6: 680, R7: 740, R8: 800,
    R9: 860, R10: 920, R11: 980, R12: 1040, R13: 1100, R14: 1160,
    M1: 780, M2: 824, M3: 869, M4: 913, M5: 958, M6: 1002, M7: 1047, M8: 1091,
    M9: 1136, M10: 1180,
    P1: 620, P2: 655, P3: 689, P4: 724, P5: 759, P6: 794, P7: 828, P8: 863,
    P9: 898, P10: 933, P11: 967, P12: 1002, P13: 1037, P14: 1072, P15: 1106,
    P16: 1141, P17: 1176, P18: 1211, P19: 1245, P20: 1280,
    E1: 400, E2: 491, E3: 583, E4: 674, E5: 766, E6: 857, E7: 949, E8: 1040,
    V1: 320, V2: 406, V3: 491, V4: 577, V5: 663, V6: 749, V7: 834, V8: 920
  };
  const betasMovidas = Object.keys(BETAS_2).filter(function (id) {
    const n = CB.catalogo.get(id);
    return !n || n.betaBase !== BETAS_2[id];
  });
  t.ok(betasMovidas.length === 0,
    'E127 · las 92 betas de 2.º no se han movido ni un punto',
    betasMovidas.map(function (id) {
      const n = CB.catalogo.get(id);
      return id + ': ' + (n ? n.betaBase : 'ausente') + ' ≠ ' + BETAS_2[id];
    }).join(', '));
  t.ok(Object.keys(BETAS_2).length === 92, 'el volcado cubre los 92 niveles de 2.º');
  t.igual(CB.catalogo.BETA_CURSO[2], 0, 'el desplazamiento de beta de 2.º es 0');

  /* E134 · el grafo y los cursos: lo de cursos anteriores se abre, lo de
     cursos posteriores no existe todavía. */
  const p2 = CB.pruebas.perfilNuevo();
  t.igual(CB.catalogo.cursoDe(p2), 2, 'un perfil nuevo es de 2.º (el curso del catálogo original)');
  t.igual(CB.grafo.estado('N22', p2), 'abierta',
    'E134 · para un perfil de 2.º, un nivel de 1.º con prerrequisitos sin superar está abierto: ' +
    'los prerrequisitos de cursos anteriores se dan por satisfechos');
  const p1 = CB.pruebas.perfilNuevo();
  p1.curso = 1;
  t.igual(CB.grafo.estado('N22', p1), 'bloqueado',
    'para un perfil de 1.º, N22 sigue su cadena normal de prerrequisitos');
  t.igual(CB.grafo.estado('S1', p1), 'bloqueado',
    'E134 · para un perfil de 1.º, el contenido de 2.º no existe todavía');
  t.ok(CB.grafo.desbloqueados(p1).every(function (id) {
    return CB.catalogo.get(id).curso === 1;
  }), 'todos los niveles desbloqueados de un perfil de 1.º son de 1.º');

  /* E132 · cada mundo tiene contenido nuclear de cada curso disponible: sin
     esto, un curso podría quedarse sin nada que cavar en un mundo entero. */
  const pobres = [];
  CB.MUNDOS.forEach(function (m) {
    CB.catalogo.cursosDisponibles().forEach(function (c) {
      const n = CB.catalogo.nuclearesDe(m.id, c).length;
      if (n < 3) pobres.push(m.id + '×' + c + '.º: ' + n);
    });
  });
  t.ok(pobres.length === 0,
    'E132 · cada mundo tiene al menos 3 niveles nucleares de cada curso disponible',
    pobres.join(', '));

  t.ok(CB.catalogo.cursosDisponibles().join(',') === '1,2,3,4,5,6',
    'E135 · los seis cursos de Primaria están disponibles (3.1.0)');

  /* El progreso de mundo se mide sobre el curso activo: los 21 niveles de 1.º
     no pueden hacer que el mapa de un perfil de 2.º parezca menos completo. */
  const p2b = CB.pruebas.perfilNuevo();
  CB.catalogo.nuclearesDe('M1', 2).forEach(function (id) {
    p2b.niveles[id] = { n: 10, aciertos: 10, caja: 3, D: 2, ultimoISO: null, enPausa: false };
  });
  t.igual(CB.catalogo.progresoMundo('M1', p2b).fraccion, 1,
    'con los nucleares de 2.º de M1 superados, el progreso de un perfil de 2.º es 100 %');
});

CB.pruebas.suite('Cursos: la mezcla 80/20 del guion', function () {
  const t = CB.pruebas;

  function perfilConTodoAbierto(curso) {
    const p = CB.pruebas.perfilNuevo();
    p.curso = curso;
    CB.catalogo.todos().forEach(function (n) {
      if (n.curso > curso || n.ampliacion) return;
      p.niveles[n.id] = { n: 10, aciertos: 8, caja: 2, D: 2, ultimoISO: null, enPausa: false };
    });
    return p;
  }

  /* E128 · en torno al 20 % del guion es de cursos anteriores, y BARAJADO. Se
     mide agregado sobre 50 semillas para que el azar de una partida no mande. */
  const p2 = perfilConTodoAbierto(2);
  let total = 0, inferiores = 0, primeraPosInferior = 0, s;
  for (s = 0; s < 50; s++) {
    const rng = CB.util.mulberry32(1000 + s);
    const guion = CB.partida.construirGuion(p2, CB.MUNDOS[0], rng, 'expedicion');
    guion.forEach(function (id, i) {
      total++;
      if (CB.catalogo.get(id).curso < 2) {
        inferiores++;
        if (i < guion.length / 2) primeraPosInferior++;
      }
    });
  }
  const prop = inferiores / total;
  t.ok(prop >= 0.10 && prop <= 0.30,
    'E128 · la proporción de repaso de cursos anteriores queda entre el 10 % y el 30 %',
    (prop * 100).toFixed(1) + ' % en ' + total + ' ítems');
  t.ok(primeraPosInferior > 0,
    'E128 · el repaso está BARAJADO: también cae en la primera mitad del guion',
    primeraPosInferior + ' de ' + inferiores);

  /* Curso 1: no hay cursos anteriores, la cuota es cero. */
  const p1 = perfilConTodoAbierto(1);
  let fuera = 0;
  for (s = 0; s < 20; s++) {
    const rng1 = CB.util.mulberry32(2000 + s);
    CB.partida.construirGuion(p1, CB.MUNDOS[0], rng1, 'expedicion').forEach(function (id) {
      if (CB.catalogo.get(id).curso !== 1) fuera++;
    });
  }
  t.igual(fuera, 0, 'E128 · un guion de 1.º es 100 % de 1.º: no hay curso anterior que repasar');

  /* E130 · el techo numérico viaja con el curso. La mitad medible sin partida:
     el generador de problemas respeta el techo que el curso le pasa. La mitad
     del cableado: servirItem lee techoCurso (el nombre de la propiedad
     sobrevive a terser; mangle.properties está prohibido). */
  t.ok(/techoDe/.test(String(CB.partida.servirItem)) &&
       /techoCurso/.test(String(CB.partida.techoDe)),
    'E130 · servirItem pide el techo a techoDe, y techoDe lo lee de techoCurso');
  const pT = CB.pruebas.perfilNuevo();
  pT.curso = 1; pT.trimestreDeducido = 3;
  t.igual(CB.partida.techoDe(pT), 99, 'E130 · techo de 1.º en T3: 99');
  pT.curso = 2;
  t.igual(CB.partida.techoDe(pT), 999, 'E130 · techo de 2.º en T3: 999 (el de siempre)');
  let fueraDeTecho = 0;
  for (s = 0; s < 200; s++) {
    const it = CB.gen.problemas.generarSubtipo('CAMBIO_1', CB.util.mulberry32(s), 2,
      { techo: 20 });
    if (it && !it.deRespaldo) {
      it.datos.forEach(function (d) { if (d > 20) fueraDeTecho++; });
      if (it.respuesta > 20) fueraDeTecho++;
    }
  }
  t.igual(fueraDeTecho, 0,
    'E130 · con techo 20 (1.º, T1), ningún dato ni respuesta de un problema lo supera');
});

CB.pruebas.suite('Cursos: promoción, panel del adulto y perfil', function () {
  const t = CB.pruebas;

  function dominar(p, curso) {
    CB.catalogo.nuclearesDeCurso(curso).forEach(function (n) {
      p.niveles[n.id] = { n: 10, aciertos: 10, caja: 3, D: 3, ultimoISO: null, enPausa: false };
    });
  }

  /* E129 · la promoción: una vez, hacia arriba, y nunca hacia un curso vacío. */
  const p = CB.pruebas.perfilNuevo();
  p.curso = 1;
  t.igual(CB.partida.comprobarPromocion(p), null,
    'sin dominar el curso no hay promoción');
  dominar(p, 1);
  t.igual(CB.partida.comprobarPromocion(p), 2,
    'E129 · con todos los nucleares de 1.º superados, se promociona a 2.º');
  t.igual(p.curso, 2, 'el perfil sube de curso él solo');
  t.ok(p.cursosCompletados.indexOf(1) !== -1, 'el curso completado queda anotado');
  t.igual(CB.partida.comprobarPromocion(p), null,
    'E129 · la promoción de un curso dispara UNA vez');
  p.curso = 1;
  t.igual(CB.partida.comprobarPromocion(p), null,
    'E129 · si el adulto baja el curso, el cerrojo de cursosCompletados evita re-celebrar');
  p.curso = 2;
  dominar(p, 2);
  t.igual(CB.partida.comprobarPromocion(p), 3,
    'E129 · con 3.º publicado (3.1.0), dominar 2.º promociona a 3.º');
  t.igual(p.curso, 3, 'el perfil sube a 3.º');
  p.curso = 6;
  dominar(p, 6);
  t.igual(CB.partida.comprobarPromocion(p), 'maestria',
    'E129 · dominar 6.º es maestría: no hay curso al que saltar');
  t.igual(p.curso, 6, 'el perfil se queda en 6.º');

  /* E131 · la caja del adulto con raiz:true lee y escribe la RAÍZ del perfil,
     no perfil.ajustes. Se pulsa el botón de verdad, con guardado y repintado
     sustituidos para no tocar el almacén real. */
  const entradaCurso = CB.adulto.AJUSTES.filter(function (a) { return a.k === 'curso'; })[0];
  t.ok(!!entradaCurso && entradaCurso.raiz === true && typeof entradaCurso.ops === 'function',
    'E131 · el panel del adulto declara el ajuste «curso» con raiz:true');

  const pAdulto = CB.pruebas.perfilNuevo();
  const guardarPrevio = CB.almacen.guardarPerfil;
  const pintarPrevio = CB.adulto.pintar;
  let guardado = null;
  try {
    CB.almacen.guardarPerfil = function (perfil) { guardado = perfil; };
    CB.adulto.pintar = function () {};
    const caja = CB.adulto.cajaAjustes(pAdulto);
    const boton1 = caja.querySelector('#adulto-ajuste-curso-opcion-0');
    t.ok(!!boton1 && boton1.textContent === '1.º',
      'la primera opción de curso es 1.º', boton1 ? boton1.textContent : 'ausente');
    boton1.click();
    t.igual(pAdulto.curso, 1, 'E131 · pulsar la opción escribe perfil.curso (la raíz)');
    t.ok(pAdulto.ajustes.curso === undefined,
      'E131 · y NO escribe perfil.ajustes.curso: raiz:true significa raíz');
    t.ok(guardado === pAdulto, 'el cambio se guarda');
  } finally {
    CB.almacen.guardarPerfil = guardarPrevio;
    CB.adulto.pintar = pintarPrevio;
  }

  /* E133 · exportar e importar conserva el curso y lo sanea. Curso 1 adrede:
     el saneado cae a 2 por defecto, así que un curso que NO sea 2 es lo único
     que distingue «sobrevivió» de «se perdió y lo tapó el valor por defecto». */
  const pExp = CB.pruebas.perfilNuevo();
  pExp.curso = 1;
  pExp.cursosCompletados = [1];
  const vuelta = CB.almacen.validarImportado(JSON.parse(CB.almacen.exportar(pExp)),
                                             CB.datos.MOTES);
  t.ok(vuelta.ok && vuelta.perfil.curso === 1,
    'E133 · el curso sobrevive a exportar e importar');
  t.ok(vuelta.perfil.cursosCompletados.join(',') === '1',
    'E133 · cursosCompletados también');
  const sucio = CB.almacen.validarImportado({ version: 4, mote: 'x', curso: 999,
    cursosCompletados: ['a', 3, 99] }, CB.datos.MOTES);
  t.ok(sucio.ok && sucio.perfil.curso === 6,
    'un curso imposible se recorta al rango 1-6', String(sucio.perfil.curso));
  t.ok(sucio.perfil.cursosCompletados.join(',') === '3',
    'cursosCompletados se filtra a enteros 1-6', sucio.perfil.cursosCompletados.join(','));

  /* La migración v4, sobre un perfil v3 real. */
  const v3 = CB.pruebas.perfilNuevo();
  delete v3.curso;
  delete v3.cursosCompletados;
  v3.version = 3;
  const m = CB.almacen.migrar(v3);
  t.ok(m.version === 4 && m.curso === 2 && m.cursosCompletados.length === 0,
    'E133 · un perfil v3 migra a v4 con curso 2 y cursosCompletados vacío');

  /* E135 · el paso de curso al crear perfil: pinta un botón por curso
     disponible y crearConCurso estampa el elegido. Sin tocar el almacén. */
  const cont = document.getElementById('lista-perfiles');
  if (cont) {
    CB.perfiles.crear();
    const botones = cont.querySelectorAll('.fila button');
    t.igual(botones.length, CB.catalogo.cursosDisponibles().length,
      'E135 · el selector ofrece un botón por curso disponible');
    t.ok(botones.length && botones[0].textContent === '1.º',
      'y el primero es 1.º', botones.length ? botones[0].textContent : '');
    CB.perfiles.pintar();          // deshace el paso sin crear nada
  } else {
    t.ok(false, 'E135 · falta #lista-perfiles en la página de pruebas: el selector no se puede medir');
  }

  const activarPrevio = CB.perfiles.activar;
  const guardarPrevio2 = CB.almacen.guardarPerfil;
  const fijarPrevio = CB.almacen.fijarUltimoPerfil;
  let creado = null;
  try {
    CB.perfiles.activar = function () {};
    CB.almacen.fijarUltimoPerfil = function () {};
    CB.almacen.guardarPerfil = function (perfil) { creado = perfil; };
    CB.perfiles.crearConCurso(1);
    t.ok(!!creado && creado.curso === 1,
      'E135 · crearConCurso(1) crea el perfil en 1.º', creado ? String(creado.curso) : 'nada');
  } finally {
    CB.perfiles.activar = activarPrevio;
    CB.almacen.guardarPerfil = guardarPrevio2;
    CB.almacen.fijarUltimoPerfil = fijarPrevio;
  }

  /* Los jefes leen la tabla de rangos por curso. */
  t.ok(!!CB.jefes.RANGO_CURSO[1] && !!CB.jefes.RANGO_CURSO[2],
    'los jefes declaran rangos para 1.º y 2.º');
  t.ok(/rangos/.test(String(CB.jefes.turno)) && /RANGO_CURSO/.test(String(CB.jefes.rangos)),
    'las mecánicas de jefe piden sus rangos por curso');

  /* La calibración tiene banco por curso y el de 2.º es el original. */
  t.ok(!!CB.calibracion.BANCOS[1] && CB.calibracion.BANCOS[1].length === 4,
    'hay banco de calibración de 1.º con 4 ítems');
  t.ok(CB.calibracion.BANCOS[2][3].respuesta === 43,
    'el banco de 2.º es el original (28 + 15 = 43)');

  /* E136 · LA VITRINA DE PREMIOS no inventa datos: refleja el perfil. */
  const pV = CB.pruebas.perfilNuevo();
  const vacia = CB.casa.premios(pV);
  const esperados = CB.catalogo.cursosDisponibles().length + CB.MUNDOS.length +
                    CB.modos.ORDEN.length + 10;
  t.igual(vacia.length, esperados,
    'E136 · la vitrina declara diplomas + guardianes + récords + los 10 logros v1');
  t.igual(vacia.filter(function (p) { return p.tiene; }).length, 0,
    'E136 · con un perfil nuevo, la vitrina está entera por ganar');

  pV.cursosCompletados = [1];
  pV.mundos.M1.jefe = true;
  pV.mejorPuntuacion.experto = 1200;
  pV.logros.primer_pico = { cobrado: true };
  const conPremios = CB.casa.premios(pV);
  t.igual(conPremios.filter(function (p) { return p.tiene; }).length, 4,
    'E136 · diploma, guardián, récord y logro aparecen ganados cuando el perfil los tiene');
  t.ok(conPremios.some(function (p) { return p.tiene && p.nombre === 'Diploma de 1.º'; }),
    'E136 · el diploma de curso existe y nombra su curso');

  /* E137 · EL RELOJ ANALÓGICO (3.2.0) pinta sus manecillas con el ángulo del
     ítem: a las 3:30, la corta va en 105° (90 + media hora de arrastre) y la
     larga en 180°. Se mide el transform REAL, no se lee el código. Y como el
     conteo canta sus bloques, el reloj canta su hora en el aria-label: para
     quien no ve la esfera, la etiqueta es la esfera. */
  const reloj = CB.ui.relojAnalogico(3, 30);
  const manecillas = Array.from(reloj.querySelectorAll('span')).filter(function (s) {
    return /rotate\(/.test(s.style.transform || '');
  });
  const angulos = manecillas.map(function (s) {
    return parseFloat((s.style.transform.match(/rotate\(([-\d.]+)deg\)/) || [])[1]);
  }).sort(function (a, b) { return a - b; });
  t.ok(angulos.length === 2 && angulos[0] === 105 && angulos[1] === 180,
    'E137 · a las 3:30 la manecilla corta va en 105° y la larga en 180°',
    'ángulos: ' + angulos.join(', '));
  t.ok(/3/.test(reloj.getAttribute('aria-label')) &&
       /30/.test(reloj.getAttribute('aria-label')),
    'E137 · el aria-label del reloj dice la hora que marca',
    reloj.getAttribute('aria-label'));
  const item = CB.gen.tiempo.H1(CB.util.mulberry32(7), 2);
  t.ok(item.visual && item.visual.tipo === 'reloj' &&
       item.respuesta === item.visual.horas,
    'E137 · H1 pregunta la hora que su propio reloj marca');

  /* E138 · Las OPCIONES-FRASE no desbordan su botón (3.2.0). «10 y media» en
     la celda cuadrada de una cifra se salía por los lados sin que nada
     fallara. Se monta el componente real y se MIDE el desbordamiento; leer el
     CSS diría «auto» y se quedaría tan ancho. */
  (function () {
    const itemHora = {
      formato: 'opciones4',
      consigna: '¿Qué hora marca el reloj?',
      respuesta: '10 y media', respuestaFraccion: true,
      distractoresFijos: ['10 en punto', '11 y media', '11 en punto']
    };
    const ops = itemHora.distractoresFijos.map(function (v) { return { valor: v }; })
      .concat([{ valor: itemHora.respuesta }]);
    CB.componentes.opciones4(itemHora, ops, function () {});
    /* Dentro del contenedor donde opciones4 ACABA de montar: el documento
       entero puede tener rejillas viejas de otras suites, y en una SEGUNDA
       pasada querySelector devolvía la primera de ellas (sin el modificador
       de texto) — verde a la primera, rojo al repetir. */
    const rej = CB.componentes.contenedor().querySelector('.rejilla-respuestas');
    if (!t.ok(!!rej, 'E138 · el componente de opciones se ha montado')) return;
    t.ok(rej.classList.contains('rejilla-respuestas--texto'),
      'E138 · las opciones-frase activan el modificador de texto');
    const desbordados = Array.from(rej.querySelectorAll('button')).filter(function (b) {
      return b.scrollWidth > b.clientWidth + 1;
    });
    t.ok(desbordados.length === 0,
      'E138 · ninguna opción-frase desborda su botón',
      desbordados.map(function (b) {
        return b.textContent + ' (' + b.scrollWidth + '>' + b.clientWidth + ')';
      }).join(', '));
  })();

  const contV = document.getElementById('vitrina-premios');
  if (contV) {
    CB.casa.pintarVitrina(pV);
    const tarjetas = contV.querySelectorAll('.cromo');
    const cerradas = contV.querySelectorAll('.cromo--bloqueado');
    t.igual(tarjetas.length, conPremios.length,
      'E136 · la vitrina pinta una tarjeta por premio');
    t.igual(cerradas.length, conPremios.length - 4,
      'E136 · los premios que faltan se enseñan cerrados, como los cromos');
    const resumenV = document.getElementById('vitrina-resumen');
    t.ok(!!resumenV && resumenV.textContent.indexOf('4 de ' + conPremios.length) === 0,
      'E136 · el resumen cuenta los premios ganados',
      resumenV ? resumenV.textContent : 'sin resumen');
  } else {
    t.ok(false, 'E136 · falta #vitrina-premios en la página de pruebas');
  }

  /* E139 · EL GRÁFICO DE BARRAS (3.3.0) pinta un bloque por unidad y una
     columna por categoría, y canta sus datos en el aria-label. Se monta el
     componente real y se CUENTAN los bloques: leer el código diría que sí. */
  (function () {
    const graf = CB.ui.graficoBarras(
      [{ nombre: 'perros', valor: 4 }, { nombre: 'gatos', valor: 2 }], 1);
    const columnas = graf.firstChild ? Array.from(graf.firstChild.children) : [];
    t.igual(columnas.length, 2, 'E139 · una columna por categoría');
    const bloquesDe = columnas.map(function (col) {
      return Array.from(col.querySelectorAll('span')).filter(function (s) {
        return !s.textContent;
      }).length;
    });
    t.ok(bloquesDe[0] === 4 && bloquesDe[1] === 2,
      'E139 · cada columna apila tantos bloques como vale su dato',
      'bloques: ' + bloquesDe.join(', '));
    const etiqueta = graf.getAttribute('aria-label') || '';
    t.ok(graf.getAttribute('role') === 'img' &&
         etiqueta.indexOf('perros, 4') !== -1 && etiqueta.indexOf('gatos, 2') !== -1,
      'E139 · el aria-label del gráfico dice sus datos', etiqueta);
    const picto = CB.ui.graficoBarras([{ nombre: 'peces', valor: 3 }], 5);
    t.ok(picto.textContent.indexOf('Cada bloque vale 5') !== -1,
      'E139 · el pictograma declara cuánto vale cada bloque');
    const itemG1 = CB.gen.datos.G1(CB.util.mulberry32(11), 2);
    const filaPreguntada = itemG1.visual.filas.filter(function (f) {
      return itemG1.consigna.indexOf(f.nombre) !== -1;
    })[0];
    t.ok(!!filaPreguntada && filaPreguntada.valor === itemG1.respuesta,
      'E139 · G1 pregunta por la barra que su propio gráfico pinta');
  })();

  /* E140 · EL AZAR ES INEQUÍVOCO (3.3.0). «Posible» a secas jamás es opción
     (cuando algo es seguro también es posible), así que se mide lo único que
     lo garantiza: en «más/menos probable» el recuento ganador es ESTRICTO, en
     «imposible» el color de la respuesta no está en la bolsa, en «seguro» sí,
     y toda probabilidad-fracción tiene los casos favorables arriba. */
  (function () {
    let s, malA3 = 0, malA1 = 0, malFrac = 0;
    for (s = 0; s < 50; s++) {
      const rng = CB.util.mulberry32(s * 131 + 7);
      const a3 = CB.gen.azar.A3(rng, 2);
      const tr = a3.expr.match(/^a3_(\d+)-(\d+)-(\d+)_(\d)$/);
      if (!tr) { malA3++; continue; }
      const cuentas = [+tr[1], +tr[2], +tr[3]];
      const mejor = +tr[4];
      if (!cuentas.every(function (c, j) { return j === mejor || cuentas[mejor] > c; })) malA3++;

      const a1 = CB.gen.azar.A1(CB.util.mulberry32(s * 17 + 3), 2);
      const sale = a1.consigna.indexOf(a1.respuesta) !== -1;
      if (/IMPOSIBLE/.test(a1.consigna) ? sale : !sale) malA1++;

      const a5 = CB.gen.azar.A5(CB.util.mulberry32(s * 23 + 5), 2);
      const fr = String(a5.respuesta).split('/');
      if (fr.length !== 2 || +fr[0] >= +fr[1]) malFrac++;
      a5.distractoresFijos.forEach(function (f) {
        if (!/^\d+\/\d+$/.test(f)) malFrac++;
      });
    }
    t.igual(malA3, 0, 'E140 · en «más probable» el recuento ganador es estricto en 50 semillas');
    t.igual(malA1, 0, 'E140 · «seguro» está en la bolsa e «imposible» no, en 50 semillas');
    t.igual(malFrac, 0, 'E140 · toda probabilidad-fracción es propia y bien formada');
  })();
});
