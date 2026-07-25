/* casos-problemas.js — Los 20 subtipos, el validador de lectura fácil y el
   equilibrio de género POR CONSTRUCCIÓN (PLAN §9). */

CB.pruebas.suite('Problemas: 20 estructuras, validador e invariantes 7, 8 y 10', function () {
  var t = CB.pruebas;
  var perfil = CB.pruebas.perfilNuevo();
  var SUB = CB.gen.problemas.SUBTIPOS;

  t.igual(SUB.length, 20, 'hay exactamente 20 estructuras semánticas');
  t.igual(CB.gen.problemas.NUCLEAR.length, 6, '6 subtipos NUCLEARES (peso 3)');
  t.igual(CB.gen.problemas.INTERMEDIO.length, 6, '6 subtipos INTERMEDIOS (peso 2)');
  t.igual(CB.gen.problemas.AMPLIACION.length, 8, '8 subtipos de AMPLIACIÓN (peso 1)');

  /* ── Producto cartesiano 20 subtipos × 60 objetos = 1.200 combinaciones ─── */
  var porSubtipo = CB.pruebas.modoLargo ? 400 : 60;
  var invalidos = 0, motivos = {}, primerMalo = null;
  var resolverDistinto = 0, primerResolver = null;
  var unicosPorSubtipo = {}, respaldos = 0;
  var i, s, k;

  for (i = 0; i < SUB.length; i++) {
    s = SUB[i];
    var vistos = {};
    for (k = 0; k < porSubtipo; k++) {
      var rng = CB.util.mulberry32(CB.util.hash32(s + '@' + k));
      var it = CB.gen.problemas.generarSubtipo(s, rng, (k % 3) + 1, {
        techo: 99, bolsas: CB.gen.problemas.nuevoEstadoBolsas(),
        datoSobrante: false
      });
      if (it.deRespaldo) respaldos++;
      vistos[it.enunciado] = 1;

      var v = CB.gen.problemas.validar(it);
      if (!v.ok) {
        invalidos++;
        v.motivos.forEach(function (m) { motivos[m] = (motivos[m] || 0) + 1; });
        if (!primerMalo) primerMalo = it.enunciado + ' → ' + v.motivos.join(', ');
      }

      /* resolver() es un RECÁLCULO INDEPENDIENTE de la plantilla: si ambos
         salieran del mismo código el test sería una tautología. */
      var indep = CB.gen.problemas.resolver(it.subtipo, it.datos);
      if (indep !== it.respuesta) {
        resolverDistinto++;
        if (!primerResolver) {
          primerResolver = it.subtipo + ' ' + it.datos.join(',') +
                           ' plantilla=' + it.respuesta + ' resolver=' + indep;
        }
      }
    }
    unicosPorSubtipo[s] = Object.keys(vistos).length;
  }

  t.ok(invalidos === 0,
    'los ' + (SUB.length * porSubtipo) + ' enunciados pasan el validador al 100 %',
    primerMalo + '  [' + JSON.stringify(motivos) + ']');
  t.ok(resolverDistinto === 0,
    'resolver() coincide con la plantilla en los 20 subtipos', primerResolver);
  t.ok(respaldos === 0,
    'ningún subtipo necesita caer en PROBLEMAS_SEGUROS', respaldos + ' respaldos');

  var pobres = SUB.filter(function (x) { return unicosPorSubtipo[x] < porSubtipo * 0.6; });
  t.ok(pobres.length === 0,
    'cada subtipo produce enunciados variados', pobres.join(', '));

  /* ── INVARIANTE 7: forma del enunciado ────────────────────────────────── */
  var mal7 = 0, ej7 = null;
  for (i = 0; i < SUB.length; i++) {
    for (k = 0; k < 40; k++) {
      var it2 = CB.gen.problemas.generarSubtipo(SUB[i],
        CB.util.mulberry32(k * 977 + i), 2,
        { techo: 99, bolsas: CB.gen.problemas.nuevoEstadoBolsas() });
      var f = it2.frases;
      var ultima = f[f.length - 1];
      var lineas = CB.util.cortarLineas(it2.enunciado, 34);
      var anchoOk = lineas.every(function (l) { return l.length <= 34; });
      var mide = CB.ui.medirLineas(it2.enunciado);
      var coincide = mide.length === lineas.length;
      if (f.length > 3 || ultima.charAt(0) !== '¿' ||
          ultima.charAt(ultima.length - 1) !== '?' ||
          CB.util.palabras(ultima).length > 8 ||
          CB.util.palabras(it2.enunciado).length > 25 ||
          !anchoOk || !coincide) {
        mal7++;
        if (!ej7) ej7 = it2.enunciado;
      }
    }
  }
  t.ok(mal7 === 0,
    'INV 7 · ≤3 frases, la última interrogativa, ≤25 palabras, ≤34 caracteres/línea, ' +
    'y medirLineas() coincide con el validador', ej7);

  /* ── INVARIANTE 8: lista blanca ───────────────────────────────────────── */
  var fuera = {}, nFuera = 0;
  for (i = 0; i < SUB.length; i++) {
    for (k = 0; k < 40; k++) {
      var it3 = CB.gen.problemas.generarSubtipo(SUB[i],
        CB.util.mulberry32(k * 613 + i), 2,
        { techo: 99, bolsas: CB.gen.problemas.nuevoEstadoBolsas() });
      CB.util.palabras(it3.enunciado.replace(/[¿?.,!¡]/g, '')).forEach(function (w) {
        if (/^\d+$/.test(w)) return;
        if (CB.datos.enListaBlanca(w)) return;
        fuera[w] = 1; nFuera++;
      });
    }
  }
  t.ok(nFuera === 0, 'INV 8 · todas las palabras están en la lista blanca',
       Object.keys(fuera).slice(0, 12).join(', '));

  /* ── INVARIANTE 10: el dato sobrante nunca combina con uno necesario ───── */
  var mal10 = 0, ej10 = null;
  CB.catalogo.CON_DATO_SOBRANTE.forEach(function (nivelId) {
    var sub = CB.gen.problemas.SUBTIPO_DE_NIVEL[nivelId];
    for (k = 0; k < 200; k++) {
      var it4 = CB.gen.problemas.generarSubtipo(sub,
        CB.util.mulberry32(k * 271 + nivelId.charCodeAt(1)), 2,
        { techo: 99, bolsas: CB.gen.problemas.nuevoEstadoBolsas(), datoSobrante: true });
      if (!it4.datoSobrante) continue;
      var c = it4.numeroSobrante, r = it4.respuesta, a = it4.datos[0], b = it4.datos[1];
      if (a + c === r || a - c === r || b + c === r || b - c === r ||
          c + a === r || c - a === r || c + b === r || c - b === r || c === r) {
        mal10++;
        if (!ej10) ej10 = it4.enunciado + ' sobrante=' + c + ' resp=' + r;
      }
      var nums = (it4.enunciado.match(/\d+/g) || []).length;
      if (nums > 3) { mal10++; if (!ej10) ej10 = 'más de 3 números: ' + it4.enunciado; }
    }
  });
  t.ok(mal10 === 0,
    'INV 10 · el dato sobrante nunca da la respuesta al combinarse con uno necesario', ej10);

  /* ── §9.5: los problemas SIEMPRE con teclado en primer intento ─────────── */
  var conOpciones = 0;
  for (i = 0; i < SUB.length; i++) {
    var it5 = CB.gen.problemas.generarSubtipo(SUB[i], CB.util.mulberry32(i + 1), 2,
      { techo: 99, bolsas: CB.gen.problemas.nuevoEstadoBolsas() });
    if (it5.formato === 'opciones4') conOpciones++;
  }
  t.igual(conOpciones, 0,
    'ningún PROBLEMA_* de primer intento se sirve con 4 opciones (§9.5)');

  /* ── §9.7: equilibrio de género POR CONSTRUCCIÓN, con bolsa ────────────── */
  var bolsas = CB.gen.problemas.nuevoEstadoBolsas();
  var rngG = CB.util.mulberry32(20260725);
  var f1 = 0, m1 = 0;
  for (k = 0; k < 200; k++) {
    var act = CB.gen.problemas.elegirActores(rngG, bolsas);
    bolsas = act.bolsas;
    if (act.generoPrimero === 'F') f1++; else m1++;
  }
  t.ok(Math.abs(f1 - m1) <= 1,
    'reparto por género 50/50 ±1 en 200 generaciones con bolsa',
    f1 + ' F frente a ' + m1 + ' M');

  var bolsas2 = CB.gen.problemas.nuevoEstadoBolsas();
  var f2 = 0;
  for (k = 0; k < 5000; k++) {
    var a2 = CB.gen.problemas.elegirActores(rngG, bolsas2);
    bolsas2 = a2.bolsas;
    if (a2.generoPrimero === 'F') f2++;
  }
  t.ok(Math.abs(f2 / 5000 - 0.5) <= 0.04,
    '50 % ±4 puntos porcentuales en 5.000 generaciones',
    (f2 / 50).toFixed(1) + ' %');

  /* Nombres prohibidos por la lista negra de marca */
  var prohibidos = CB.datos.NOMBRES_F.concat(CB.datos.NOMBRES_M).filter(function (n) {
    return CB.datos.NOMBRES_PROHIBIDOS.indexOf(n) !== -1;
  });
  t.ok(prohibidos.length === 0, 'ningún nombre propio está en la lista negra',
       prohibidos.join(', '));

  /* ── §9.2: reparto proporcional a los pesos en 40 partidas simuladas ───── */
  var p2 = CB.pruebas.perfilNuevo();
  p2.trimestreDeducido = 1;                       // solo NUCLEARES disponibles
  var cuenta = {};
  for (k = 0; k < 40 * 3; k++) {
    var sub2 = CB.gen.problemas.siguienteSubtipo(p2, { lucesActuales: 3 });
    cuenta[sub2] = (cuenta[sub2] || 0) + 1;
    p2.problemas[sub2].intentos++;
    p2.problemas[sub2].aciertos++;
  }
  var nucleares = CB.gen.problemas.NUCLEAR;
  var valores = nucleares.map(function (x) { return cuenta[x] || 0; });
  var maxV = Math.max.apply(null, valores), minV = Math.min.apply(null, valores);
  t.ok(maxV - minV <= Math.ceil(120 / nucleares.length * 0.25),
    'los 6 nucleares se reparten proporcionalmente a su peso (±10 %)',
    JSON.stringify(cuenta));

  /* La AMPLIACIÓN nunca se sirve con menos de 3 luces */
  var p3 = CB.pruebas.perfilNuevo();
  p3.trimestreDeducido = 3;
  var conPocasLuces = 0;
  for (k = 0; k < 200; k++) {
    var sub3 = CB.gen.problemas.siguienteSubtipo(p3, { lucesActuales: 2 });
    if (CB.gen.problemas.AMPLIACION.indexOf(sub3) !== -1) conPocasLuces++;
    p3.problemas[sub3].intentos++;
  }
  t.igual(conPocasLuces, 0,
    'ningún subtipo de AMPLIACIÓN se sirve con menos de 3 luces');
});
