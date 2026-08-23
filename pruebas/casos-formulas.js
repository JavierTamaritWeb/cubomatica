/* casos-formulas.js — Los 30 casos de PLAN §11.7 + las 6 aserciones A1-A6 */

CB.pruebas.suite('Puntuación: los 30 casos exactos (§11.7)', function () {
  const t = CB.pruebas;

  const N = {
    S9: { Pb: 100, tI: 8000,  tL: 24000 },
    N3: { Pb: 80,  tI: 6000,  tL: 18000 },
    R8: { Pb: 110, tI: 9000,  tL: 27000 },
    M4: { Pb: 100, tI: 7000,  tL: 21000 },
    P3: { Pb: 160, tI: 20000, tL: 50000 },
    E4: { Pb: 90,  tI: 10000, tL: 26000 },
    V1: { Pb: 70,  tI: 7000,  tL: 20000 }
  };

  /* id, nivel, rt, modo, intento, correcto, azar, mT, puntos, gemas */
  const CASOS = [
    ['C01','S9', 8000,'normal',  1,1,0, 1.40, 140, 3],
    ['C02','S9', 4000,'normal',  1,1,0, 1.40, 140, 3],
    ['C03','S9',  600,'normal',  1,1,0, 1.40, 140, 3],
    ['C04','S9',12000,'normal',  1,1,0, 1.20, 120, 2],
    ['C05','S9',16000,'normal',  1,1,0, 1.00, 100, 2],
    ['C06','S9',24000,'normal',  1,1,0, 0.60,  60, 1],
    ['C07','S9',35000,'normal',  1,1,0, 0.60,  60, 1],
    ['C08','S9',12000,'normal',  2,1,0, 1.20,  48, 1],
    ['C09','S9',12000,'normal',  1,0,0, 1.20,   0, 0],
    ['C10','S9',  900,'normal',  1,0,1, 1.40,   0, 0],
    ['C11','S9',12000,'experto',1,1,0, 1.20, 120, 2],
    ['C12','S9',12000,'facil',  1,1,0, 0.85,  85, 2],
    ['C13','S9', 4000,'facil',  1,1,0, 0.85,  85, 2],
    ['C14','S9',30000,'facil',  1,1,0, 0.85,  85, 2],
    ['C15','N3', 6000,'normal',  1,1,0, 1.40, 112, 2],
    ['C16','N3',12000,'normal',  1,1,0, 1.00,  80, 2],
    ['C17','N3',18000,'normal',  1,1,0, 0.60,  48, 1],
    ['C18','R8', 9000,'normal',  1,1,0, 1.40, 154, 3],
    ['C19','R8',18000,'normal',  1,1,0, 1.00, 110, 2],
    ['C20','R8',27000,'normal',  1,1,0, 0.60,  66, 1],
    ['C21','R8',18000,'normal',  2,1,0, 1.00,  44, 1],
    ['C22','M4', 7000,'normal',  1,1,0, 1.40, 140, 3],
    ['C23','M4',14000,'normal',  1,1,0, 1.00, 100, 2],
    ['C24','M4',21000,'normal',  1,1,0, 0.60,  60, 1],
    ['C25','P3',20000,'normal',  1,1,0, 1.40, 224, 4],
    ['C26','P3',35000,'normal',  1,1,0, 1.00, 160, 3],
    ['C27','P3',50000,'normal',  1,1,0, 0.60,  96, 2],
    ['C28','P3',35000,'normal',  2,1,0, 1.00,  64, 1],
    ['C29','E4',10000,'normal',  1,1,0, 1.40, 126, 3],
    ['C30','V1', 7000,'normal',  1,1,0, 1.40,  98, 2]
  ];

  let i, c, base, r, malos = 0;
  for (i = 0; i < CASOS.length; i++) {
    c = CASOS[i];
    base = N[c[1]];
    r = CB.puntuacion.calcular(
      { puntosBase: base.Pb, tIdeal: base.tI, tLimite: base.tL },
      c[2],
      { correcto: !!c[5], azar: !!c[6], intento: c[4], modoTiempo: c[3] }
    );
    if (Math.abs(r.mTiempo - c[7]) > 1e-9 || r.puntos !== c[8] || r.gemas !== c[9]) {
      malos++;
      t.ok(false, c[0] + ' (' + c[1] + ', rt ' + c[2] + ', ' + c[3] + ')',
           'mT ' + r.mTiempo + '/' + c[7] + '  pts ' + r.puntos + '/' + c[8] +
           '  gemas ' + r.gemas + '/' + c[9]);
    }
  }
  t.ok(malos === 0, 'los 30 casos dan el valor exacto, sin tolerancia',
       malos + ' casos discrepan');

  /* Las 6 aserciones */
  const it = { puntosBase: 100, tIdeal: 8000, tLimite: 24000 };

  /* A1 — tres fallos consecutivos NO bajan el marcador */
  const est = { puntos: 500 };
  const antes = est.puntos;
  let k;
  for (k = 0; k < 3; k++) {
    const f = CB.puntuacion.calcular(it, 12000, { correcto: false, intento: 1, modoTiempo: 'normal' });
    CB.puntuacion.acumular(est, f.puntos);
  }
  t.igual(est.puntos, antes, 'A1 · tres fallos dejan el marcador idéntico');

  /* A2 — C03: acierto legítimo en 600 ms da 140 y NO es azar */
  const c03 = CB.puntuacion.calcular(it, 600, { correcto: true, intento: 1, modoTiempo: 'normal' });
  const az = CB.antiazar.evaluar({ destreza: 'suma_llevada' }, 600, true, [], {});
  t.ok(c03.puntos === 140 && az.azar === false,
       'A2 · acierto en 600 ms = 140 puntos y azar === false',
       'puntos ' + c03.puntos + ', azar ' + az.azar);

  /* A3 — Fácil (sin reloj) no es ni el que más puntúa ni el que menos DENTRO de
     la fórmula. La ventaja de los modos con reloj vive fuera, en CB.modos, y por
     eso esta aserción sigue midiendo lo que medía. */
  const c01 = CB.puntuacion.calcular(it, 8000,  { correcto: true, intento: 1, modoTiempo: 'normal' });
  const c12 = CB.puntuacion.calcular(it, 12000, { correcto: true, intento: 1, modoTiempo: 'facil' });
  const c06 = CB.puntuacion.calcular(it, 24000, { correcto: true, intento: 1, modoTiempo: 'normal' });
  t.ok(c12.puntos < c01.puntos && c12.puntos > c06.puntos,
       'A3 · 85 < 140 y 85 > 60 (antifarmeo del modo sin reloj)',
       c12.puntos + ' vs ' + c01.puntos + ' / ' + c06.puntos);

  /* A4 — salir en el primer ítem no produce NaN */
  const b0 = CB.puntuacion.bonoFinal(0.9, true, true, 0, 0);
  t.ok(b0.factor === 1 && b0.total === 0 && b0.extras.length === 0,
       'A4 · bonoFinal con 0 preguntas devuelve {1, [], 0} sin NaN');

  /* A5 — los casos de penalización dan exactamente 0, jamás negativo */
  let negativos = 0;
  CB.modos.ORDEN.forEach(function (m) {
    [true, false].forEach(function (azar) {
      const r2 = CB.puntuacion.calcular(it, 12000,
        { correcto: false, azar: azar, intento: 1, modoTiempo: m });
      if (r2.puntos !== 0 || r2.gemas !== 0) negativos++;
    });
  });
  t.igual(negativos, 0, 'A5 · los 6 casos de penalización dan exactamente 0');

  /* A6 — bono final */
  const b6 = CB.puntuacion.bonoFinal(0.92, true, true, 15, 1500);
  t.ok(Math.abs(b6.factor - 1.45) < 1e-9 && b6.total === 675,
       'A6 · bonoFinal(0,92, sí, sí, 15, 1500) = factor 1,45 y total 675',
       'factor ' + b6.factor + ', total ' + b6.total);

  /* Invariante global: ningún valor negativo en ninguna combinación */
  let neg = 0, rt, intento;
  for (rt = 0; rt <= 60000; rt += 2500) {
    for (intento = 1; intento <= 2; intento++) {
      CB.modos.ORDEN.forEach(function (m2) {
        [true, false].forEach(function (c2) {
          [true, false].forEach(function (a2) {
            const x = CB.puntuacion.calcular(it, rt,
              { correcto: c2, azar: a2, intento: intento, modoTiempo: m2 });
            if (x.puntos < 0 || x.gemas < 0 || !isFinite(x.puntos)) neg++;
          });
        });
      });
    }
  }
  t.igual(neg, 0, 'ninguna combinación de la fórmula produce negativos ni NaN');
});
