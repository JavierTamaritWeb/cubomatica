/* casos-generadores.js — Los 12 invariantes de generación (PLAN §19.1) */

CB.pruebas.suite('Generadores: los 12 invariantes', function () {
  const t = CB.pruebas;
  const porNivel = CB.pruebas.modoLargo ? 10000 : 1000;
  const ids = CB.catalogo.ids();

  const fallos = {
    inv1: 0, inv2: 0, inv3: 0, inv4: 0, inv5: 0, inv5bis: 0, inv5ter: 0,
    inv6: 0, inv11: 0, inv12: 0, nulos: 0
  };
  const ejemplos = {};
  const FORMATOS = ['opciones4', 'teclado', 'signo', 'balanza', 'ordenar', 'monedas', 'datos'];
  let totalItems = 0, conOpciones = 0;

  function anota(clave, texto) {
    fallos[clave]++;
    if (!ejemplos[clave]) ejemplos[clave] = texto;
  }

  ids.forEach(function (id) {
    const nivel = CB.catalogo.get(id);
    const unicos = {};
    let nUnicos = 0, s;

    for (s = 0; s < porNivel; s++) {
      const rng = CB.util.mulberry32(CB.util.hash32(id + '#' + s));
      const item = nivel.generar(rng, (s % 3) + 1, {
        ajustes: { tablas69: nivel.flagAdulto === 'tablas69',
                   centimos: nivel.flagAdulto === 'centimos',
                   restasDobleLlevada: nivel.flagAdulto === 'restasDobleLlevada' },
        techo: 999,
        bolsas: CB.gen.problemas.nuevoEstadoBolsas()
      });
      if (!item) { anota('nulos', id + ' devuelve null'); break; }
      totalItems++;
      if (!unicos[item.expr]) { unicos[item.expr] = 1; nUnicos++; }

      /* La exención es ESTRECHA a propósito: solo la respuesta, solo si es una cadena, y solo en un ítem que pide dibujar piezas. */
      const esPieza = (item.piezasDinero === true && typeof item.respuesta === 'string');

      /* INV 1 — operandos y respuesta en [0, 999] */
      if (!esPieza && !(item.respuesta >= 0 && item.respuesta <= 999)) {
        anota('inv1', id + ' respuesta ' + item.respuesta);
      }
      if (esPieza && !CB.gen.dinero.esCentimo(item.respuesta)) {
        anota('inv1', id + ' respuesta en cadena que no es una pieza: ' + item.respuesta);
      }
      (item.operandos || []).forEach(function (o) {
        if (!(o >= 0 && o <= 999)) anota('inv1', id + ' operando ' + o);
      });

      /* INV 2 — toda resta con resultado ≥ 0 */
      if (item.operacion === '-' && item.respuesta < 0) anota('inv2', id);

      /* INV 3 — sin decimales, sin negativos, sin fracción */
      if (!esPieza && item.respuesta !== Math.round(item.respuesta)) anota('inv3', id + ' decimal');
      const txt = (item.consigna || '') + (item.enunciado || '');
      if (/[,.]\d|\d\/\d|½|¼/.test(txt)) anota('inv3', id + ' notación prohibida: ' + txt);

      /* INV 4 — factores de multiplicación */
      if (nivel.letra === 'M' &&
          !CB.gen.multiplicacion.factoresValidos(item, nivel.flagAdulto === 'tablas69')) {
        anota('inv4', id + ' factores ' + (item.operandos || []).join('×'));
      }

      /* INV 5-bis — formato de la lista cerrada de 7 */
      if (FORMATOS.indexOf(item.formato) === -1) anota('inv5bis', id + ' ' + item.formato);

      /* LOS FIJOS NO PASAN POR EL MOTOR, igual que en `40-partida.js`: cuando el generador ya ha elegido las tres, llamar al motor de distractores medía una lista que la partida no llega a montar nunca. */
      if (item.formato === 'opciones4' && item.distractoresFijos) {
        conOpciones++;
        const fijas = item.distractoresFijos.slice(0, 3);
        if (fijas.length !== 3) anota('inv5', id + ' ' + fijas.length + ' distractores fijos');
        if (new Set(fijas.concat([item.respuesta])).size !== 4) {
          anota('inv5', id + ' opciones fijas repetidas');
        }
        if (fijas.indexOf(item.respuesta) !== -1) anota('inv5ter', id + ' (fijas)');
      } else if (item.formato === 'opciones4' && !item.distractoresTexto) {
        const d = CB.distractores.para(item, CB.util.mulberry32(s + 7));
        if (d.formato === 'opciones4') {
          conOpciones++;
          const vals = d.opciones.map(function (o) { return o.valor; });
          if (d.opciones.length !== 4) anota('inv5', id + ' ' + d.opciones.length + ' opciones');
          if (new Set(vals).size !== 4) anota('inv5', id + ' opciones repetidas');
          if (vals.filter(function (v) { return v === item.respuesta; }).length !== 1) {
            anota('inv5', id + ' la correcta no aparece exactamente una vez');
          }
          d.opciones.forEach(function (o) {
            if (o.valor < 0) anota('inv5', id + ' distractor negativo');
            if (!o.correcta && o.valor === item.respuesta) anota('inv5ter', id);
            const lim = o.intencionado ? 1999 : 999;
            if (o.valor > lim) anota('inv1', id + ' distractor ' + o.valor + ' > ' + lim);
            if (!o.correcta && !o.intencionado && o.codigoError &&
                Math.abs(o.valor - item.respuesta) > Math.max(20, 0.5 * item.respuesta)) {
              anota('inv6', id + ' distractor lejano ' + o.valor + ' vs ' + item.respuesta);
            }
          });
        }
      } else if (item.formato !== 'opciones4' && item.formato !== 'balanza') {
        if (item.opciones != null) anota('inv5', id + ' opciones no nulas en ' + item.formato);
      }

      /* INV 11 — restas nucleares: una llevada como máximo y sin cero prestado */
      if (nivel.letra === 'R' && !nivel.ampliacion && item.operandos) {
        if (item.llevadas > 1) {
          anota('inv11', id + ' ' + item.expr + ' con ' + item.llevadas + ' llevadas');
        }
        if (CB.gen.restas.ceroEnColumnaDePrestamo(item.operandos[0], item.operandos[1])) {
          anota('inv11', id + ' ' + item.expr + ' pide prestado a través del 0');
        }
      }
    }

    /* INV 12 — variedad, contra la esperanza bajo muestreo uniforme */
    if (!CB.catalogo.variedadSuficiente(id, nUnicos, porNivel)) {
      anota('inv12', id + ' únicos ' + nUnicos + ' de cardinalidad ' + nivel.cardinalidad);
    }
  });

  t.ok(fallos.nulos === 0, 'ningún nivel devuelve null', ejemplos.nulos);
  t.ok(fallos.inv1 === 0, 'INV 1 · operandos y respuesta en [0,999]; distractores acotados', ejemplos.inv1);
  t.ok(fallos.inv2 === 0, 'INV 2 · toda resta con resultado ≥ 0', ejemplos.inv2);
  t.ok(fallos.inv3 === 0, 'INV 3 · sin decimales, sin negativos, sin notación de fracción', ejemplos.inv3);
  t.ok(fallos.inv4 === 0, 'INV 4 · factores de multiplicación dentro de lo declarado', ejemplos.inv4);
  t.ok(fallos.inv5 === 0, 'INV 5 · formato y opciones coherentes', ejemplos.inv5);
  t.ok(fallos.inv5bis === 0, 'INV 5-bis · formato de la lista cerrada de 7', ejemplos.inv5bis);
  t.ok(fallos.inv5ter === 0, 'INV 5-ter · ningún distractor igual a la respuesta', ejemplos.inv5ter);
  t.ok(fallos.inv6 === 0, 'INV 6 · distractores plausibles salvo los intencionados', ejemplos.inv6);
  t.ok(fallos.inv11 === 0, 'INV 11 · restas nucleares con una sola llevada y sin cero prestado', ejemplos.inv11);
  t.ok(fallos.inv12 === 0, 'INV 12 · variedad suficiente en todos los niveles', ejemplos.inv12);

  t.ok(totalItems >= porNivel * 90, 'se han generado ' + totalItems + ' ítems');
  t.ok(conOpciones > 0, 'se han verificado ' + conOpciones + ' juegos de 4 opciones');

  /* Contraejemplo explícito de F2: con el flag apagado, ningún ítem puede ser un
     hecho propio de las tablas del 3, 4, 6, 7, 8 o 9. */
  let prohibidos = 0, m, s2;
  const nivelesM = ['M1','M2','M3','M4','M5','M6','M7','M8'];   // los nucleares
  for (m = 0; m < nivelesM.length; m++) {
    const nv = CB.catalogo.get(nivelesM[m]);
    for (s2 = 0; s2 < 2000; s2++) {
      const it2 = nv.generar(CB.util.mulberry32(s2 * 31 + m), (s2 % 3) + 1,
                           { ajustes: { tablas69: false } });
      if (it2 && !CB.gen.multiplicacion.factoresValidos(it2, false)) prohibidos++;
    }
  }
  t.igual(prohibidos, 0,
    'con tablas69 apagado, 16.000 ítems de M1-M8 y ninguno es hecho de las tablas 3,4,6,7,8,9');
});
