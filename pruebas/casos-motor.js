/* casos-motor.js — El niño sintético INDEPENDIENTE, el DAG, las fechas, la */

CB.pruebas.suite('Motor: grafo, luces, azar y escalera', function () {
  const t = CB.pruebas;

  /* DAG */
  t.ok(CB.grafo.esAciclico(), 'el grafo de prerrequisitos es acíclico');
  const h = CB.grafo.huerfanos();
  t.ok(h.length === 0, 'todo nivel es alcanzable desde los que no tienen prerrequisitos',
       h.join(', '));
  const amp = CB.grafo.ampliacionesComoPrerrequisito();
  t.ok(amp.length === 0, 'CU5 · ninguna ampliación es prerrequisito de un nivel nuclear',
       amp.join(' | '));

  /* candidatos() NUNCA devuelve vacío, ni con el perfil recién creado */
  const perfil = CB.pruebas.perfilNuevo();
  const vacios = CB.adaptativo.SLUGS.filter(function (s) {
    return CB.catalogo.candidatos(s, CB.adaptativo.elegirBeta(s, perfil), perfil).length === 0;
  });
  t.ok(vacios.length === 0, 'candidatos() nunca devuelve [] para ninguna de las 13 destrezas',
       vacios.join(', '));

  /* La regla de las luces (§12.1) */
  const est = CB.vidas.nuevoEstado(0);
  t.igual(est.luces, 3, 'la partida empieza con 3 luces');

  let k, r;
  for (k = 0; k < 10; k++) r = CB.vidas.timeout(est);
  t.igual(est.luces, 3, 'REGLA 1 · diez tiempos agotados NO apagan ninguna luz');
  t.ok(r.finAmable && r.motivoFin === 'pausa',
       'la función pura ofrece fin amable a los 6 tiempos agotados');

  /* PERO ESO NO PASA NUNCA EN UNA PARTIDA, y decirlo importa: este test estaba escrito como «SALVAGUARDA», dando a entender que el juego tiene DOS protecciones para un niño que se queda sin tiempo una y otra vez. */
  t.ok(CB.vidas.TIMEOUTS_CAMBIA_MODO < CB.vidas.TIMEOUTS_FIN,
       'el cambio de modo llega ANTES que el fin amable, y por eso lo hace inalcanzable',
       CB.vidas.TIMEOUTS_CAMBIA_MODO + ' < ' + CB.vidas.TIMEOUTS_FIN);
  t.igual(CB.modos.msDeItem('facil'), 0,
       'y Fácil apaga el reloj: por eso, tras el cambio de modo, ya no puede haber más tiempos agotados');

  const est2 = CB.vidas.nuevoEstado(0);
  let c3 = null;
  for (k = 0; k < 3; k++) c3 = CB.vidas.timeout(est2);
  t.ok(c3.cambiaModo, 'SALVAGUARDA · 3 tiempos agotados consecutivos cambian a «Sin prisa»');

  const est3 = CB.vidas.nuevoEstado(0);
  CB.vidas.azar(est3);
  t.igual(est3.luces, 3, 'REGLA 2 · la detección de azar NO apaga ninguna luz');

  const est4 = CB.vidas.nuevoEstado(0);
  const f1 = CB.vidas.fallo(est4, 1, 'expedicion');
  t.ok(est4.luces === 3 && f1.abreReparacion === false && f1.apagada === false,
       'REGLA 3a · el PRIMER fallo da pista y no apaga luz');
  const f2 = CB.vidas.fallo(est4, 2, 'expedicion');
  t.ok(est4.luces === 2 && f2.apagada === true,
       'REGLA 3b · solo el SEGUNDO fallo apaga una luz');

  const estJ = CB.vidas.nuevoEstado(0);
  CB.vidas.fallo(estJ, 2, 'jefe');
  t.igual(estJ.luces, 3, 'ningún jefe apaga luces (§12.9)');

  const estT = CB.vidas.nuevoEstado(0);
  CB.vidas.fallo(estT, 2, 'tranquila');
  t.igual(estT.luces, 3, 'en Cantera Tranquila no se puede perder (§3.8)');

  /* Tope, reserva y antifarmeo */
  const perfilV = CB.pruebas.perfilNuevo();
  const estV = CB.vidas.nuevoEstado(0);
  const r1 = CB.vidas.conceder(estV, 'vuelta_al_pozo', perfilV, 'expedicion');
  const r2 = CB.vidas.conceder(estV, 'vuelta_al_pozo', perfilV, 'expedicion');
  t.ok(r1.aplicada && !r2.aplicada && r2.motivoRechazo === 'ya_cobrado',
       'ANTIFARMEO · «Vuelta al pozo» solo se cobra una vez por partida');

  const estV2 = CB.vidas.nuevoEstado(0);
  let conc = 0;
  for (k = 0; k < 5; k++) {
    if (CB.vidas.conceder(estV2, 'reto_bonus', perfilV, 'expedicion').aplicada) conc++;
  }
  t.ok(conc <= CB.vidas.MAX_CONCEDIDAS_PARTIDA,
       'ANTIFARMEO · máximo 2 luces concedidas por partida', conc + ' concedidas');

  const estV3 = CB.vidas.nuevoEstado(0);
  estV3.luces = CB.vidas.TOPE;
  const perfilV3 = CB.pruebas.perfilNuevo();
  const rr = CB.vidas.conceder(estV3, 'reto_bonus', perfilV3, 'expedicion');
  t.ok(!rr.aplicada && rr.guardada && perfilV3.vidasReserva === 1,
       'al tope, la luz se GUARDA en reserva y no se convierte en gemas (§12.7)');
  t.ok(CB.vidas.conceder === CB.vidas.conceder && CB.vidas.gemasSustitutas === undefined,
       'gemasSustitutas está eliminada de la API');

  const estTr = CB.vidas.nuevoEstado(0);
  t.ok(!CB.vidas.conceder(estTr, 'reto_bonus', perfilV, 'tranquila').aplicada,
       'los logros de luz están desactivados en Cantera Tranquila');

  /* Los 3 logros que conceden luz existen y son de la versión 1 */
  t.igual(CB.logros.CONCEDEN_LUZ.length, 3, 'exactamente 3 logros conceden luz');
  t.igual(CB.logros.V1.length, 10, 'exactamente 10 logros tienen version:1');
  t.igual(CB.logros.LISTA.length, 24, 'la lista declara 24 logros');
  const luzNoV1 = CB.logros.LISTA.filter(function (l) { return l.luz && l.version !== 1; });
  t.igual(luzNoV1.length, 0, 'los 3 logros de luz son evaluables en v1');

  /* Anti-azar */
  const perfilA = CB.pruebas.perfilNuevo();
  let falsos = 0, rt;
  for (rt = 50; rt < 3000; rt += 25) {
    if (CB.antiazar.evaluar({ destreza: 'suma_llevada' }, rt, true, [], perfilA).azar) falsos++;
  }
  t.igual(falsos, 0, 'INVARIANTE BLINDADO · ningún acierto se marca como azar, a ningún rt');

  const med = CB.antiazar.medianaPersonal('suma_llevada', perfilA);
  t.ok(med > 0, 'medianaPersonal nunca devuelve 0 con destrezas nuevas', String(med));

  const unaSenal = CB.antiazar.evaluar({ destreza: 'suma_llevada', valorDado: 5 },
                                     100, false, [], perfilA);
  t.ok(!unaSenal.azar && unaSenal.senales.length === 1,
       'con una sola señal NO se marca azar (hacen falta ≥2)',
       JSON.stringify(unaSenal.senales));

  const histo = [{ posicion: 1, rtMs: 300, correcto: false },
               { posicion: 1, rtMs: 300, correcto: false },
               { posicion: 1, rtMs: 300, correcto: false }];
  const dos = CB.antiazar.evaluar({ destreza: 'suma_llevada', valorDado: 5 },
                                200, false, histo, perfilA);
  t.ok(dos.azar && dos.senales.length >= 2,
       'con ≥2 señales sí se marca azar', JSON.stringify(dos.senales));
  t.ok(CB.antiazar.EFECTOS.apagaLuz === false && CB.antiazar.EFECTOS.restaPuntosGanados === false,
       'los efectos del azar no apagan luz ni restan puntos ganados');

  /* Escalera anti-frustración */
  t.igual(CB.escalera.siguienteEscalon(0, 1).escalon, 1, 'escalón 1 · pista al primer fallo');
  t.igual(CB.escalera.siguienteEscalon(0, 2).escalon, 2, 'escalón 2 · reparación al segundo');
  t.igual(CB.escalera.siguienteEscalon(2, 2).escalon, 3, 'escalón 3 · baja D y pasa a opciones');
  t.igual(CB.escalera.siguienteEscalon(3, 2).escalon, 4, 'escalón 4 · sirve un prerrequisito');
  const e5 = CB.escalera.siguienteEscalon(4, 2);
  t.ok(e5.escalon === 5 && e5.accion === 'enPausa' && e5.silencioso,
       'escalón 5 · retira el concepto SIN decirle nada al niño');
  t.ok(!!e5.notaAdulto, 'el escalón 5 deja nota para el adulto');

  const perfilE = CB.pruebas.perfilNuevo();
  CB.escalera.pausarConcepto(perfilE, 'S9');
  t.ok(perfilE.niveles.S9.enPausa, 'pausarConcepto marca enPausa');
  t.igual(CB.escalera.levantarPausas(perfilE), 1,
    'las pausas se levantan al empezar la sesión siguiente');
});

CB.pruebas.suite('Motor: el niño sintético independiente', function () {
  const t = CB.pruebas;

  function simular(thetaReal, sesiones, semilla) {
    const rng = CB.util.mulberry32(semilla);
    const perfil = CB.pruebas.perfilNuevo();
    const theta = {};
    let aciertos = 0, total = 0, partidasCortas = 0, s, i;

    CB.adaptativo.SLUGS.forEach(function (k) { theta[k] = thetaReal; });

    for (s = 0; s < sesiones; s++) {
      let itemsSesion = 0, lucesRestantes = 3;
      for (i = 0; i < 15 && lucesRestantes > 0; i++) {
        const slug = CB.adaptativo.SLUGS[i % CB.adaptativo.SLUGS.length];
        const banda = CB.adaptativo.elegirBeta(slug, perfil);
        const cands = CB.catalogo.candidatos(slug, banda, perfil);
        const nivel = cands[Math.floor(rng() * cands.length)];
        const beta = nivel.betaBase;

        const c = (nivel.formato === 'opciones4') ? 0.25 : 0.02;   // adivinanza
        const desliz = 0.10;
        const p = c + (1 - c - desliz) / (1 + Math.pow(10, (beta - theta[slug]) / 400));
        const acierto = rng() < p;

        total++; itemsSesion++;
        if (acierto) aciertos++;
        else {
          /* segundo intento tras la reparación */
          if (rng() < p) { /* aprende */ } else lucesRestantes--;
        }

        CB.adaptativo.registrar(slug, {
          correcto: acierto, intento: 1, rtMs: 9000, beta: beta, ejemplo: ''
        }, perfil, CB.util.hoyISO());

        const en = perfil.niveles[nivel.id] ||
                 (perfil.niveles[nivel.id] = { n: 0, aciertos: 0, caja: 1, D: 2,
                                               ultimoISO: null, enPausa: false });
        en.n++; if (acierto) en.aciertos++;
      }
      if (lucesRestantes <= 0 && itemsSesion < 8) partidasCortas++;
      CB.adaptativo.SLUGS.forEach(function (k) { theta[k] += 8; });   // aprendizaje
    }
    return { tasa: aciertos / total, partidasCortas: partidasCortas / sesiones,
             perfil: perfil, total: total };
  }

  [['flojo', 700], ['medio', 1000], ['avanzado', 1400]].forEach(function (par, idx) {
    const r = simular(par[1], 40, 1234 + idx * 77);
    t.ok(r.tasa >= 0.75 && r.tasa <= 0.92,
      'niño ' + par[0] + ' (θ_real ' + par[1] + ') se estabiliza entre 75 % y 92 %',
      (r.tasa * 100).toFixed(1) + ' % en ' + r.total + ' ítems');
    t.ok(r.partidasCortas < 0.05,
      'niño ' + par[0] + ': menos del 5 % de partidas apagan las 3 luces antes del ítem 8',
      (r.partidasCortas * 100).toFixed(1) + ' %');
  });
});

CB.pruebas.suite('Motor: fechas, memoria, cuota y almacenamiento', function () {
  const t = CB.pruebas;

  /* toISOString está prohibido: hoyISO debe dar el día LOCAL */
  const d = new Date(2026, 6, 25, 23, 30, 0);        // 25 jul 2026, 23:30 local
  t.igual(CB.util.hoyISO(d), '2026-07-25',
    'hoyISO da el día local incluso a las 23:30 (toISOString daría el 24)');
  t.igual(CB.util.diasEntre('2026-03-28', '2026-03-30'), 2,
    'diasEntre es inmune al cambio de hora (compara a mediodía)');
  t.igual(CB.util.diasEntre('2026-07-25', '2026-07-25'), 0, 'diasEntre de un día consigo mismo');

  /* Curva de olvido */
  const estado = { ultimoRepasoISO: '2026-07-25', estabilidadDias: 4,
                 n: 20, aciertosPrimerIntento: 19, estado: 'dominada' };
  t.ok(Math.abs(CB.memoria.recuperabilidad(estado, '2026-07-25') - 1) < 1e-9,
    'R = 1 el mismo día del repaso');
  t.ok(Math.abs(CB.memoria.recuperabilidad(estado, '2026-07-29') - 0.5) < 1e-9,
    'R = 0,5 tras una vida media (4 días con S=4)');
  t.igual(CB.memoria.clasificar(estado, '2026-08-20', false), 'oxidada',
    'una destreza dominada y olvidada pasa a «oxidada» (musgo)');
  t.ok(CB.memoria.recuperabilidad({ ultimoRepasoISO: '2027-01-01', estabilidadDias: 4 },
                                  '2026-07-25') === 1,
    'una fecha futura no produce R > 1 ni NaN');

  /* Fechas futuras recortadas al cargar */
  const p = CB.pruebas.perfilNuevo();
  p.creadoISO = '2099-01-01';
  p.diario.diasJugados = ['2099-01-01', '2026-07-20'];
  CB.almacen.recortarFechasFuturas(p);
  t.ok(p.creadoISO === CB.util.hoyISO(),
    'una fecha futura (reloj mal puesto) se recorta a hoy en vez de romper la racha');
  const creciente = p.diario.diasJugados.every(function (x, i, a) {
    return i === 0 || a[i - 1] <= x;
  });
  t.ok(creciente, 'diario.diasJugados queda estrictamente creciente');

  /* Migración: NUNCA pierde nada */
  const v1 = {
    version: 1, id: 'p-viejo', mote: 'Topo Cavador', avatar: 3, gemas: 1240,
    puntosTotales: 18420, mejorPuntuacion: 2640,
    logros: { a: { cobrado: true }, b: { cobrado: true }, c: { cobrado: true } },
    cromos: ['blopi', 'tronquete'], glosario: ['sumando', 'decena'],
    destrezas: { suma_llevada: { theta: 1180, n: 34, aciertos: 29 } },
    historial: [{ fechaISO: '2026-07-20', preguntas: 15, aciertos: 13, precision: 0.73 }],
    diario: { diasJugados: ['2026-07-20'] }, respuestas: []
  };
  const mig = CB.almacen.migrar(JSON.parse(JSON.stringify(v1)));
  t.igual(mig.version, 3, 'migrar lleva el perfil a la versión de esquema vigente');
  t.igual(mig.gemas, 1240, 'la migración NO pierde ni una gema');
  t.igual(Object.keys(mig.logros).length, 3, 'la migración NO pierde ni un logro');
  t.igual(mig.cromos.length, 2, 'la migración NO pierde ni un cromo');
  t.igual(Object.keys(mig.problemas).length, 20, 'la migración añade las 20 claves de problemas');
  t.igual(mig.destrezas.suma_llevada.estabilidadDias, 1, 'añade estabilidadDias por defecto');
  t.igual(mig.destrezas.suma_llevada.estado, 'nuevo', 'añade estado por defecto');
  /* El único récord de un perfil v1 se ganó con 30 s de reloj, que es lo que
     hoy es Experto: se desglosa por modo en v2 y viaja con su reloj en v3. */
  t.igual(mig.mejorPuntuacion.experto, 2640, 'mejorPuntuacion se desglosa por modo');
  t.ok(mig.historial[0].precision1er === 0.73 && mig.historial[0].precisionTotal != null,
    'el campo ambiguo «precision» de v1 se desdobla');

  /* Un perfil más nuevo que el juego NO se carga */
  const futuro = CB.almacen.validarImportado({ version: 99, mote: 'Topo Cavador' },
                                           CB.datos.MOTES);
  t.ok(!futuro.ok && futuro.motivo === 'version',
    'un perfil de versión superior se rechaza en lugar de corromperse');

  /* Importación: la única superficie de ataque del proyecto */
  const sucio = CB.almacen.validarImportado({
    version: 2, id: '<script>x</script>', mote: '<img src=x onerror=alert(1)>',
    colorBloque: 'red; background:url(javascript:1)', avatar: 999,
    respuestas: new Array(5000).fill([0, 'x', 0, 0, 0, 0, 0, 0]),
    campoDesconocido: 'debe desaparecer'
  }, CB.datos.MOTES);
  t.ok(sucio.ok, 'un fichero manipulado se sanea en vez de rechazarse');
  t.ok(CB.datos.MOTES.indexOf(sucio.perfil.mote) !== -1,
    'el mote se sustituye por uno de la lista cerrada de 120', sucio.perfil.mote);
  t.igual(sucio.perfil.colorBloque, '#5AA02C', 'colorBloque no válido cae al valor por defecto');
  t.igual(sucio.perfil.avatar, 15, 'avatar se acota a [0,15]');
  t.ok(/^[A-Za-z0-9-]+$/.test(sucio.perfil.id), 'el id se regenera si trae caracteres raros');
  t.igual(sucio.perfil.respuestas.length, 800, 'los arrays desmedidos se truncan');
  t.ok(sucio.perfil.campoDesconocido === undefined,
    'las claves desconocidas de primer nivel se descartan (lista blanca)');

  /* sanear: NaN e Infinity → 0 */
  const s = CB.almacen.sanear({ a: NaN, b: Infinity, c: [NaN, 3], d: { e: -Infinity } });
  t.ok(s.a === 0 && s.b === 0 && s.c[0] === 0 && s.d.e === 0,
    'sanear convierte NaN e Infinity en 0 antes de serializar');

  /* Cuota del modo aula */
  let bytes = 0, i;
  for (i = 0; i < 30; i++) {
    const pa = CB.pruebas.perfilNuevo();
    pa.id = 'p-aula-' + i;
    pa.respuestas = new Array(150).fill([1784972745678, 'S9#56+78', 1180, 2, 9100, 1, 134, 0]);
    pa.historial = new Array(20).fill({ fechaISO: '2026-07-25', modo: 'expedicion',
      mundo: 'M2', seg: 412, preguntas: 15, aciertos: 13, puntos: 2140, gemas: 58 });
    bytes += JSON.stringify(CB.almacen.sanear(pa)).length * 2;
  }
  t.ok(bytes < 4000000,
    '30 perfiles llenos en modo aula ocupan menos de 4 MB',
    Math.round(bytes / 1024) + ' KB');

  /* Poda */
  const pp = CB.pruebas.perfilNuevo();
  pp.respuestas = new Array(3000).fill([0, 'x', 0, 0, 0, 0, 0, 0]);
  pp.diario.diasJugados = [];
  for (i = 0; i < 300; i++) pp.diario.diasJugados.push('2026-01-01');
  pp.destrezas.suma_llevada = { rtMuestras: new Array(80).fill(9000),
                                ejemplosFallados: new Array(30).fill('x') };
  CB.almacen.podar(pp, {});
  t.ok(pp.respuestas.length <= 800, 'podar recorta respuestas al tope doméstico');
  t.ok(pp.diario.diasJugados.length <= 120, 'podar recorta diasJugados a 120');
  t.ok(pp.destrezas.suma_llevada.rtMuestras.length <= 12, 'podar recorta rtMuestras a 12');
  t.ok(pp.destrezas.suma_llevada.ejemplosFallados.length <= 3, 'podar recorta ejemplos a 3');

  /* Cuota de bloques del guion */
  const pg = CB.pruebas.perfilNuevo();
  CB.catalogo.ids().forEach(function (id) {
    pg.niveles[id] = { n: 5, aciertos: 5, caja: 2, D: 2, ultimoISO: CB.util.hoyISO(), enPausa: false };
  });
  const guion = CB.partida.construirGuion(pg, CB.MUNDOS[1],
                                        CB.util.mulberry32(99), 'expedicion');
  const problemas = guion.filter(function (id) { return CB.catalogo.get(id).letra === 'P'; });
  t.ok(guion.length >= CB.partida.MIN_ITEMS && guion.length <= CB.partida.MAX_ITEMS,
    'el guion tiene entre 8 y 20 ítems', String(guion.length));
  t.ok(problemas.length >= 2,
    'CUOTA · toda partida de ≥10 ítems sirve al menos 2 problemas de enunciado',
    problemas.length + ' problemas en ' + guion.length + ' ítems');

  const repes = {};
  let maxRep = 0;
  guion.forEach(function (id) {
    repes[id] = (repes[id] || 0) + 1;
    if (repes[id] > maxRep) maxRep = repes[id];
  });
  t.ok(maxRep <= CB.partida.MAX_REPETICIONES,
    'ningún nivel se repite más de ' + CB.partida.MAX_REPETICIONES + ' veces en un guion',
    'máximo ' + maxRep);

  /* El guion nunca sale vacío ni con un perfil recién creado */
  const pv = CB.pruebas.perfilNuevo();
  const gv = CB.partida.construirGuion(pv, CB.MUNDOS[0], CB.util.mulberry32(7), 'expedicion');
  t.ok(gv.length >= CB.partida.MIN_ITEMS,
    'con un perfil nuevo el guion tiene al menos 8 ítems', String(gv.length));

  /* Reinserción de Leitner */
  const cola = CB.leitner.nuevaCola();
  CB.leitner.programarReinsercion(cola, 'S9', 4, CB.util.mulberry32(3));
  t.igual(CB.leitner.tocaReinsertar(cola, 2), null, 'la reinserción no llega antes de tiempo');
  t.igual(CB.leitner.tocaReinsertar(cola, 10), 'S9', 'el ítem fallado vuelve entre 3 y 5 después');
});
