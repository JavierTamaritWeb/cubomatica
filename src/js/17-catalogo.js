/* 17-catalogo.js — Los 92 niveles y los 4 mundos. ESTE FICHERO ES UN CONTRATO. */

var CB = CB || {};
CB.catalogo = CB.catalogo || {};

/* Valores base por familia */
CB.catalogo.FAMILIAS = {
  N: { puntosBase: 80,  tIdeal: 6000,  tLimite: 18000, beta: [320, 1000] },
  S: { puntosBase: 100, tIdeal: 8000,  tLimite: 24000, beta: [340, 1120] },
  R: { puntosBase: 110, tIdeal: 9000,  tLimite: 27000, beta: [380, 1160] },
  M: { puntosBase: 100, tIdeal: 7000,  tLimite: 21000, beta: [780, 1180] },
  P: { puntosBase: 160, tIdeal: 20000, tLimite: 50000, beta: [620, 1280] },
  E: { puntosBase: 90,  tIdeal: 10000, tLimite: 26000, beta: [400, 1040] },
  V: { puntosBase: 70,  tIdeal: 7000,  tLimite: 20000, beta: [320, 920] }
};

CB.catalogo.TABLA = [
  /* Numeración: 16 */
  ['N1','Contar y recontar','numeracion',0,99,0,1,'opciones4','A.1',['1.1','5.1'],[],22,false,null,'A.2.c'],
  ['N2','Leer y escribir hasta 99','numeracion',0,99,0,1,'teclado','A.2.b',['6.1'],['N1'],90,false,null],
  ['N3','Decenas y unidades','valor_posicional',0,99,0,1,'opciones4','A.4.a',['1.2','6.1'],['N1'],178,false,null],
  ['N4','Mayor, menor, igual','numeracion',0,99,0,1,'balanza','A.4.b',['5.1','6.1'],['N1'],300,false,null],
  ['N5','Series de 2 en 2 y de 10 en 10','numeracion',0,99,0,1,'ordenar','A.4.a',['3.1'],['N1'],160,false,null],
  ['N6','Pares e impares','numeracion',0,99,0,1,'opciones4','A.4.b',['3.1'],['N1'],99,false,null],
  ['N7','La recta numérica','numeracion',0,199,0,1,'ordenar','A.2.b',['1.2'],['N2'],400,false,null],
  ['N8','Números hasta 199','numeracion',0,199,0,1,'teclado','A.2.b',['6.1'],['N2'],100,false,null],
  ['N9','La centena: C, D y U','valor_posicional',0,599,0,2,'opciones4','A.4.a',['1.2','6.1'],['N3','N8'],500,false,null],
  ['N10','Comparar y ordenar hasta 599','numeracion',0,599,0,2,'balanza','A.4.b',['5.1'],['N4','N8'],600,false,null],
  ['N11','Series de 5 en 5 y de 100 en 100','numeracion',0,599,0,2,'ordenar','A.4.a',['3.1'],['N5','N9'],200,false,null],
  ['N12','Descomponer C + D + U','valor_posicional',0,599,0,2,'teclado','A.2.b',['1.2','6.2'],['N9'],499,false,null,'A.2.c'],
  ['N13','Aproximar a la decena','numeracion',0,599,0,2,'opciones4','A.2.a',['2.1'],['N3'],540,false,null],
  ['N14','Ordinales hasta el 20.º','numeracion',1,20,0,2,'opciones4','A.4.b',['6.1'],['N1'],160,false,null],
  ['N15','Números hasta 999','numeracion',0,999,0,3,'teclado','A.2.b',['6.1'],['N12'],800,false,null],
  ['N16','Comparar y aproximar hasta 999','numeracion',0,999,0,3,'balanza','A.4.b',['2.1','5.1'],['N10','N13'],900,false,null,'A.2.a'],

  /* Sumas: 16 */
  ['S1','Sumas hasta 10','suma_sin_llevar',0,10,0,1,'teclado','A.3.b',['2.1'],[],66,false,null],
  ['S2','Sumas hasta 20 sin llevar','suma_sin_llevar',0,20,0,1,'teclado','A.3.b',['2.1'],['S1'],55,false,null],
  ['S3','Dobles hasta 10 + 10','suma_sin_llevar',0,20,0,1,'opciones4','A.3.a',['3.1'],['S1'],10,false,null],
  ['S4','Sumar 10','suma_sin_llevar',0,99,0,1,'teclado','A.3.a',['3.1'],['S1'],89,false,null],
  ['S5','DU + U sin llevar','suma_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['S2'],405,false,null],
  ['S6','DU + DU sin llevar','suma_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['S5'],900,false,null],
  ['S7','DU + U con llevada','suma_llevada',0,199,1,1,'teclado','A.3.b',['2.1','6.2'],['S5'],360,false,null],
  ['S8','DU + DU con una llevada','suma_llevada',0,99,1,2,'teclado','A.3.b',['2.1','6.2'],['S6','S7'],700,false,null],
  ['S9','DU + DU con llevada hasta 199','suma_llevada',0,199,1,2,'teclado','A.3.b',['2.1','6.2'],['S8'],1200,false,null],
  ['S10','Tres sumandos de una cifra','suma_llevada',0,27,1,2,'teclado','A.3.b',['2.1'],['S2'],500,false,null],
  ['S11','CDU + DU sin llevar','suma_sin_llevar',0,599,0,2,'teclado','A.3.b',['2.1'],['S6','N9'],1500,false,null],
  ['S12','CDU + DU con una llevada','suma_llevada',0,599,1,2,'teclado','A.3.b',['2.1','6.2'],['S11','S8'],1500,false,null],
  ['S13','Sumar decenas completas','suma_sin_llevar',0,599,0,2,'opciones4','A.3.a',['3.1'],['S4'],441,false,null],
  ['S14','CDU + CDU sin llevar','suma_sin_llevar',0,999,0,3,'teclado','A.3.b',['2.1'],['S11'],2000,false,null],
  ['S15','CDU + CDU con una llevada','suma_llevada',0,999,1,3,'teclado','A.3.b',['2.1','6.2'],['S14','S12'],2000,false,null],
  ['S16','Tres sumandos con decenas','suma_llevada',0,999,1,3,'teclado','A.3.b',['2.1'],['S10','S13'],1800,false,null],

  /* Restas: 14 */
  ['R1','Restas hasta 10','resta_sin_llevar',0,10,0,1,'teclado','A.3.b',['2.1'],[],66,false,null],
  ['R2','Restas hasta 20 sin llevar','resta_sin_llevar',0,20,0,1,'teclado','A.3.b',['2.1'],['R1'],66,false,null],
  ['R3','Restar 10','resta_sin_llevar',0,99,0,1,'teclado','A.3.a',['3.1'],['R1'],89,false,null],
  ['R4','DU − U sin llevar','resta_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['R2'],405,false,null],
  ['R5','DU − DU sin llevar','resta_sin_llevar',0,99,0,1,'teclado','A.3.b',['2.1'],['R4'],900,false,null],
  ['R6','Complementos a 10 y a 100','resta_sin_llevar',0,100,0,2,'teclado','A.4.c',['3.1','5.1'],['R1'],18,false,null],
  ['R7','DU − U con una llevada','resta_llevada',0,99,1,2,'teclado','A.3.b',['2.1','6.2'],['R4'],360,false,null],
  ['R8','DU − DU con una llevada','resta_llevada',0,99,1,2,'teclado','A.3.b',['2.1','6.2'],['R5','R7'],700,false,null],
  ['R9','Restar decenas completas','resta_sin_llevar',0,599,0,2,'opciones4','A.3.a',['3.1'],['R3'],441,false,null],
  ['R10','CDU − DU sin llevar','resta_sin_llevar',0,599,0,2,'teclado','A.3.b',['2.1'],['R5','N9'],1500,false,null],
  ['R11','CDU − DU con una llevada','resta_llevada',0,599,1,3,'teclado','A.3.b',['2.1','6.2'],['R10','R8'],1500,false,null],
  ['R12','CDU − CDU sin llevar','resta_sin_llevar',0,999,0,3,'teclado','A.3.b',['2.1'],['R10'],2000,false,null],
  ['R13','CDU − CDU con una llevada','resta_llevada',0,999,1,3,'teclado','A.3.b',['2.1','6.2'],['R12','R11'],2000,false,null],
  ['R14','Restas con doble llevada','resta_llevada',0,999,2,3,'teclado','A.3.b',['2.1'],['R13'],1500,true,'restasDobleLlevada'],

  /* Multiplicación: 10 (M1-M8 iniciación nuclear de T3; M9-M10 ampliación) */
  ['M1','Veces: la suma reiterada','multiplicacion',2,5,0,3,'opciones4','A.3.b',['1.2','5.1'],['S1'],16,false,null],
  ['M2','Filas y columnas','multiplicacion',2,5,0,3,'opciones4','A.3.b',['1.2','6.1'],['M1'],16,false,null],
  ['M3','Del dibujo a «a × b»','multiplicacion',2,5,0,3,'teclado','A.3.b',['6.2'],['M2'],16,false,null],
  ['M4','Tabla del 2','multiplicacion',0,20,0,3,'teclado','A.3.a',['3.1'],['M3'],11,false,null],
  ['M5','Tabla del 10','multiplicacion',0,100,0,3,'teclado','A.3.a',['3.1'],['M3'],11,false,null],
  ['M6','Tabla del 5','multiplicacion',0,50,0,3,'teclado','A.3.a',['3.1'],['M3'],11,false,null],
  ['M7','Mezcla del 2, del 5 y del 10','multiplicacion',0,100,0,3,'teclado','A.3.a',['3.1','5.1'],['M4','M5','M6'],33,false,null],
  ['M8','Dobles y mitades','multiplicacion',0,20,0,3,'opciones4','A.3.a',['3.1'],['M4'],20,false,null],
  ['M9','Tabla del 3','multiplicacion',0,30,0,3,'teclado','A.3.a',['3.1'],['M7'],11,true,'tablas69'],
  ['M10','Tabla del 4','multiplicacion',0,40,0,3,'teclado','A.3.a',['3.1'],['M7'],11,true,'tablas69'],

  /* Problemas de enunciado: 20 */
  ['P1','Cambio: cuántos hay ahora','problemas_cambio',0,99,0,1,'teclado','A.3.b',['1.1','2.1','2.2'],['S1'],600,false,null],
  ['P2','Cambio: cuántos quedan','problemas_cambio',0,99,0,1,'teclado','A.3.b',['1.1','2.1','2.2'],['R1'],600,false,null],
  ['P3','Combinación: el total','problemas_combinacion',0,99,0,1,'teclado','A.3.b',['1.1','2.1','2.2'],['S2'],600,false,null],
  ['P4','Combinación: una parte','problemas_combinacion',0,99,0,2,'teclado','A.3.b',['1.1','2.1','2.2'],['R2','P3'],600,false,null],
  ['P5','Comparación: cuántos más','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.2'],['R4'],600,false,null],
  ['P6','Comparación: cuántos menos','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.2'],['R4'],600,false,null],
  ['P7','Cambio: cuánto ha ganado','problemas_cambio',0,99,0,2,'teclado','A.4.c',['1.1','2.1','2.2'],['P1'],600,false,null],
  ['P8','Cambio: cuánto ha perdido','problemas_cambio',0,99,0,2,'teclado','A.4.c',['1.1','2.1','2.2'],['P2'],600,false,null],
  ['P9','Comparación: el otro tiene más','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P5'],600,false,null],
  ['P10','Comparación: el otro tiene menos','problemas_comparacion',0,99,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P6'],600,false,null],
  ['P11','Igualación: cuánto falta','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P5'],600,false,null],
  ['P12','Igualación: cuánto sobra','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P6'],600,false,null],
  ['P13','Cambio: cuánto tenía antes (+)','problemas_cambio',0,99,0,3,'teclado','A.4.c',['1.1','2.1','2.3'],['P7'],600,true,null],
  ['P14','Cambio: cuánto tenía antes (−)','problemas_cambio',0,99,0,3,'teclado','A.4.c',['1.1','2.1','2.3'],['P8'],600,true,null],
  ['P15','Comparación: referente con más','problemas_comparacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P9'],600,true,null],
  ['P16','Comparación: referente con menos','problemas_comparacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P10'],600,true,null],
  ['P17','Igualación: referido con añadir','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,true,null],
  ['P18','Igualación: referido con quitar','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P12'],600,true,null],
  ['P19','Igualación: referente con añadir','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,true,null],
  ['P20','Igualación: referente con quitar','problemas_igualacion',0,99,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P12'],600,true,null],

  /* Dinero: 8 */
  ['E1','Monedas y billetes: reconocerlos','dinero',0,100,0,1,'opciones4','A.5',['5.2','6.1'],[],7,false,null],
  ['E2','Contar con monedas de 1 y 2 €','dinero',0,20,0,1,'monedas','A.5',['2.1','5.2'],['E1','S1'],250,false,null],
  ['E3','Contar con billetes','dinero',0,100,0,2,'monedas','A.5',['2.1','5.2'],['E1'],120,false,null],
  ['E4','Equivalencias entre billetes','dinero',0,100,0,2,'opciones4','A.5',['3.1','5.1'],['E3'],10,false,null],
  ['E5','Pagar con importe exacto','dinero',0,50,0,2,'monedas','A.5',['2.1','2.2'],['E2'],48,false,null],
  ['E6','El cambio','dinero',0,20,0,3,'teclado','A.5',['2.1','2.2'],['E5','R4'],34,false,null,'A.4.c'],
  ['E7','La compra: gasto total','dinero',0,99,0,3,'teclado','A.5',['2.1','2.2'],['E5','S6'],400,false,null,'A.3.b'],
  ['E8','Céntimos y equivalencias','dinero',5,100,0,3,'opciones4','A.5',['5.2'],['E4'],4,true,'centimos'],

  /* Vocabulario: 8 */
  ['V1','Las palabras de la suma','vocabulario',0,0,0,2,'opciones4','A.3.b',['6.1'],['S1'],6,false,null],
  ['V2','Las palabras de la resta','vocabulario',0,0,0,2,'opciones4','A.3.b',['6.1'],['R1'],6,false,null],
  ['V3','Unidades, decenas, centenas','vocabulario',0,0,0,3,'opciones4','A.4.a',['6.1'],['N3'],6,false,null],
  ['V4','Comparar','vocabulario',0,99,0,3,'balanza','A.4.b',['6.1'],['N4'],300,false,null],
  ['V5','Orden y posición','vocabulario',1,20,0,3,'ordenar','A.4.b',['6.1'],['N14'],28,false,null],
  ['V6','Las palabras del dinero','vocabulario',0,0,0,3,'opciones4','A.5',['6.1','5.2'],['E1'],6,false,null],
  ['V7','Veces, doble y mitad','vocabulario',0,0,0,3,'opciones4','A.3.a',['6.1'],['M1'],6,false,null],
  ['V8','Las palabras de los problemas','vocabulario',0,0,0,3,'opciones4','A.3.b',['6.1','1.1'],['P1'],6,false,null]
];

/* Los 4 niveles con dato sobrante (§9.4): solo en 3.er trimestre y NUNCA en la
   primera partida del niño. */
CB.catalogo.CON_DATO_SOBRANTE = ['P3', 'P4', 'P7', 'P8'];

/* Categoría declarada de la multiplicación (§6.5). */
CB.catalogo.CATEGORIA_MULT = {
  M1: 'INICIACION_2_CURSO', M2: 'INICIACION_2_CURSO', M3: 'INICIACION_2_CURSO',
  M4: 'INICIACION_2_CURSO', M5: 'INICIACION_2_CURSO', M6: 'INICIACION_2_CURSO',
  M7: 'INICIACION_2_CURSO', M8: 'INICIACION_2_CURSO',
  M9: 'AMPLIACION', M10: 'AMPLIACION'
};

/* Construcción de los objetos Nivel */
CB.catalogo._porId = {};
CB.catalogo._ids = [];

(function () {
  const familiaDe = { N: 'numeracion', S: 'sumas', R: 'restas', M: 'multiplicacion',
                    P: 'problemas', E: 'dinero', V: 'vocabulario' };
  const contadorFamilia = {};

  CB.catalogo.TABLA.forEach(function (fila) {
    const id = fila[0];
    const letra = id.charAt(0);
    const fam = CB.catalogo.FAMILIAS[letra];
    contadorFamilia[letra] = (contadorFamilia[letra] || 0) + 1;

    /* betaBase repartida por la familia: los primeros niveles en la parte baja
       del rango, los últimos en la alta. */
    const total = CB.catalogo.TABLA.filter(function (f) {
      return f[0].charAt(0) === letra;
    }).length;
    const pos = (total > 1) ? (contadorFamilia[letra] - 1) / (total - 1) : 0;
    const beta = Math.round(fam.beta[0] + pos * (fam.beta[1] - fam.beta[0]));

    const tI = fam.tIdeal;
    let tL = fam.tLimite;
    if (tL - tI < 500) tL = tI + 500;          // guarda obligatoria (§8.1)

    const nivel = {
      id: id,
      nombre: fila[1],
      familia: familiaDe[letra],
      letra: letra,
      destreza: fila[2],
      rango: [fila[3], fila[4]],
      llevadas: fila[5],
      trimestreSugerido: fila[6],
      formato: fila[7],
      curriculo: { saber: fila[8], criterios: fila[9].slice(),
                   saberSecundario: fila[14] || null },
      prerrequisitos: fila[10].slice(),
      cardinalidad: fila[11],
      ampliacion: !!fila[12],
      flagAdulto: fila[13],
      categoria: CB.catalogo.CATEGORIA_MULT[id] || null,
      datoSobrante: CB.catalogo.CON_DATO_SOBRANTE.indexOf(id) !== -1,
      retoBonus: true,
      puntosBase: fam.puntosBase,
      tIdeal: tI,
      tLimite: tL,
      betaBase: beta,
      diagnostico: true
    };

    /* El generador se resuelve por familia y por id. */
    const mod = { N: CB.gen.numeracion, S: CB.gen.sumas, R: CB.gen.restas,
                M: CB.gen.multiplicacion, P: CB.gen.problemas,
                E: CB.gen.dinero, V: CB.gen.vocabulario }[letra];

    nivel.generar = (function (m, i) {
      return function (rng, D, ctx) {
        const fn = m[i];
        if (!fn) return null;
        const base = fn(rng, D || 2, ctx || {});
        if (!base) return null;
        base.nivelId = i;
        base.destreza = base.destreza || nivel.destreza;
        base.D = D || 2;
        base.puntosBase = nivel.puntosBase;
        base.tIdeal = nivel.tIdeal;
        base.tLimite = nivel.tLimite;
        base.beta = nivel.betaBase;
        base.ampliacion = nivel.ampliacion;
        if (base.diagnostico == null) base.diagnostico = nivel.diagnostico;
        return base;
      };
    })(mod, id);

    CB.catalogo._porId[id] = nivel;
    CB.catalogo._ids.push(id);
  });
})();

/* API */
CB.catalogo.get  = function (id) { return CB.catalogo._porId[id] || null; };
CB.catalogo.ids  = function () { return CB.catalogo._ids.slice(); };
CB.catalogo.todos = function () {
  return CB.catalogo._ids.map(function (i) { return CB.catalogo._porId[i]; });
};

CB.catalogo.porDestreza = function (slug) {
  return CB.catalogo.todos().filter(function (n) { return n.destreza === slug; });
};

CB.catalogo.porTrimestreSugerido = function (t) {
  return CB.catalogo.todos().filter(function (n) { return n.trimestreSugerido <= t; });
};

CB.catalogo.tIdealDe = function (slug) {
  const l = CB.catalogo.porDestreza(slug);
  return l.length ? l[0].tIdeal : 8000;
};

CB.catalogo.desbloqueados = function (perfil) {
  return CB.grafo.desbloqueados(perfil).map(function (id) { return CB.catalogo.get(id); });
};

/* candidatos() NUNCA devuelve []. */
CB.catalogo.candidatos = function (slug, banda, perfil) {
  const abiertos = CB.catalogo.porDestreza(slug).filter(function (n) {
    if (CB.grafo.estado(n.id, perfil) !== 'abierta') return false;
    const e = perfil && perfil.niveles ? perfil.niveles[n.id] : null;
    if (e && e.enPausa) return false;                  // escalón 5 de la escalera
    return true;
  });

  const min = banda[0], max = banda[1];
  let i, sel;

  /* 1) dentro de la banda */
  sel = abiertos.filter(function (n) { return n.betaBase >= min && n.betaBase <= max; });
  if (sel.length) return sel;

  /* 2) ensanchar ±150, hasta 3 veces */
  for (i = 1; i <= 3; i++) {
    sel = abiertos.filter(function (n) {
      return n.betaBase >= min - 150 * i && n.betaBase <= max + 150 * i;
    });
    if (sel.length) return sel;
  }

  /* 3) el abierto de esa destreza con β más cercana a θ */
  if (abiertos.length) {
    const centro = (min + max) / 2;
    abiertos.sort(function (a, b) {
      return Math.abs(a.betaBase - centro) - Math.abs(b.betaBase - centro);
    });
    return [abiertos[0]];
  }

  /* 4) la destreza no tiene ningún nivel abierto: se cae a la frontera global */
  const frontera = CB.grafo.frontera(perfil);
  if (frontera.length) return [CB.catalogo.get(frontera[0])];

  /* 5) solo posible si el perfil no tiene NINGÚN nivel abierto, situación
     imposible: el catálogo declara ≥1 nivel con prerrequisitos:[] por bloque.
     Aun así, se devuelve algo antes que dejar la partida sin ítems. */
  return [CB.catalogo.get('S1')];
};

/* Los 4 mundos (§5.2). Tabla CERRADA */
CB.MUNDOS = [
  { id: 'M1', nombre: 'La Pradera de los Números', bioma: 'pradera', jefe: 'Tronquete',
    jefeIcono: '🌳',
    niveles: ['N1','N2','N3','N4','N5','N6','N7','N8',
              'S1','S2','S3','S4','S5','S6','S7',
              'R1','R2','R3','R4','R5',
              'P1','P2','E1','E2'] },

  { id: 'M2', nombre: 'El Bosque de las Llevadas', bioma: 'bosque', jefe: 'Ranacubo',
    jefeIcono: '🐸',
    niveles: ['N9','N10','N11','N12','N13',
              'S8','S9','S10','S11','S12','S13',
              'R6','R7','R8','R9','R10',
              'P3','P4','P5','P6','P7','P8',
              'E3','E4','V1','V2'] },

  { id: 'M3', nombre: 'El Río de los Problemas', bioma: 'rio', jefe: 'Cristalina',
    jefeIcono: '💠',
    niveles: ['N14','S14','R11','R12',
              'P9','P10','P11','P12','P13','P14','P15','P16',
              'E5','E6','V3','V4','V5','V6'] },

  { id: 'M4', nombre: 'La Mina de las Veces', bioma: 'mina', jefe: 'Brasita',
    jefeIcono: '🔥', distintivo: 'INICIACIÓN',
    niveles: ['N15','N16','S15','S16','R13','R14',
              'P17','P18','P19','P20','E7','E8',
              'M1','M2','M3','M4','M5','M6','M7','M8','M9','M10',
              'V7','V8'] }
];

CB.catalogo.mundoDe = function (nivelId) {
  let i;
  for (i = 0; i < CB.MUNDOS.length; i++) {
    if (CB.MUNDOS[i].niveles.indexOf(nivelId) !== -1) return CB.MUNDOS[i];
  }
  return null;
};

CB.catalogo.getMundo = function (id) {
  let i;
  for (i = 0; i < CB.MUNDOS.length; i++) if (CB.MUNDOS[i].id === id) return CB.MUNDOS[i];
  return null;
};

/* Niveles NUCLEARES de un mundo: los que no son ampliación. Un mundo se
   desbloquea al completar el 60 % de los nucleares del anterior (§5.3): no el
   100 %, porque bloquear por perfección es un muro. */
CB.catalogo.nuclearesDe = function (mundoId) {
  const m = CB.catalogo.getMundo(mundoId);
  if (!m) return [];
  return m.niveles.filter(function (id) {
    const n = CB.catalogo.get(id);
    return n && !n.ampliacion;
  });
};

CB.catalogo.progresoMundo = function (mundoId, perfil) {
  const nucleares = CB.catalogo.nuclearesDe(mundoId);
  let hechos = 0, i;
  for (i = 0; i < nucleares.length; i++) {
    if (CB.grafo.superado(nucleares[i], perfil)) hechos++;
  }
  return { hechos: hechos, total: nucleares.length,
           fraccion: nucleares.length ? hechos / nucleares.length : 0 };
};

/* INVARIANTE 12 (variedad) — reformulado */
CB.catalogo.unicosEsperados = function (cardinalidad, tiradas) {
  const C = Math.max(1, cardinalidad);
  return C * (1 - Math.pow(1 - 1 / C, tiradas));
};

CB.catalogo.variedadSuficiente = function (nivelId, unicos, tiradas) {
  const n = CB.catalogo.get(nivelId);
  if (!n) return true;
  const esperados = CB.catalogo.unicosEsperados(n.cardinalidad, tiradas);
  return unicos >= 0.75 * esperados;
};

CB.catalogo.mundoDesbloqueado = function (mundoId, perfil) {
  let i, idx = -1;
  for (i = 0; i < CB.MUNDOS.length; i++) if (CB.MUNDOS[i].id === mundoId) idx = i;
  if (idx <= 0) return true;                       // M1 abierto desde el minuto 1
  return CB.catalogo.progresoMundo(CB.MUNDOS[idx - 1].id, perfil).fraccion >= 0.6;
};
