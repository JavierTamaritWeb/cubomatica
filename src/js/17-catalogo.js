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
  V: { puntosBase: 70,  tIdeal: 7000,  tLimite: 20000, beta: [320, 920] },
  /* Familias de 3.º-6.º (3.1.0). Los rangos de beta son RELATIVOS, como los
     de arriba: el desplazamiento por curso (BETA_CURSO) los sitúa. */
  D: { puntosBase: 120, tIdeal: 9000,  tLimite: 27000, beta: [400, 1000] },
  F: { puntosBase: 120, tIdeal: 10000, tLimite: 30000, beta: [450, 1050] },
  C: { puntosBase: 110, tIdeal: 9000,  tLimite: 27000, beta: [450, 1050] },
  T: { puntosBase: 130, tIdeal: 12000, tLimite: 36000, beta: [500, 1100] },
  Z: { puntosBase: 100, tIdeal: 8000,  tLimite: 24000, beta: [400, 1000] },
  /* Sentido de la medida (3.2.0): B magnitudes y H tiempo. */
  B: { puntosBase: 100, tIdeal: 9000,  tLimite: 27000, beta: [400, 1000] },
  H: { puntosBase: 100, tIdeal: 9000,  tLimite: 27000, beta: [380, 980] },
  /* Sentido estocástico (3.3.0): G datos y A azar. */
  G: { puntosBase: 110, tIdeal: 10000, tLimite: 30000, beta: [380, 980] },
  A: { puntosBase: 110, tIdeal: 10000, tLimite: 30000, beta: [420, 1020] }
};

/* Las tablas de niveles, POR CURSO. Cada curso es una tabla con el MISMO
   formato de fila de siempre; el parser recorre los cursos en orden y estampa
   nivel.curso desde la clave. Las 92 filas de 2.º no se tocan: el campo
   opcional 14 (saberSecundario) hace peligroso añadir columnas, y la beta se
   interpola por familia×curso justo para que las de 2.º no se muevan. */
CB.catalogo.TABLAS = {
  /* ——— 1.º de Primaria (3.0.0): 21 niveles sobre los generadores existentes
     con rangos bajos. Techos de curso: 20 / 59 / 99 por trimestre. ——— */
  1: [
  /* Numeración: 6 */
  ['N17','Contar hasta 12','numeracion',0,12,0,1,'opciones4','A.1',['1.1','5.1'],[],11,false,null],
  ['N18','Leer y escribir hasta 20','numeracion',0,20,0,1,'teclado','A.2.b',['6.1'],['N17'],20,false,null],
  ['N19','Mayor o menor hasta 20','numeracion',0,20,0,1,'balanza','A.4.b',['5.1','6.1'],['N17'],120,false,null],
  ['N20','Leer y escribir hasta 59','numeracion',0,59,0,2,'teclado','A.2.b',['6.1'],['N18'],39,false,null],
  ['N21','Series de 1 en 1 y de 2 en 2','numeracion',0,59,0,2,'ordenar','A.4.a',['3.1'],['N18'],140,false,null],
  ['N22','El anterior y el posterior','numeracion',0,99,0,3,'teclado','A.2.b',['1.2'],['N20'],150,false,null],

  /* Sumas: 5 */
  ['S17','Sumar 1, 2 y 3','suma_sin_llevar',0,13,0,1,'teclado','A.3.b',['2.1'],[],30,false,null],
  ['S18','Sumar sin pasar de 20','suma_sin_llevar',0,20,0,2,'teclado','A.3.b',['2.1'],['S17'],90,false,null],
  ['S19','Sumar decenas enteras','suma_sin_llevar',0,50,0,2,'opciones4','A.3.a',['3.1'],['S18'],10,false,null],
  ['S20','Sumas de dos cifras sin llevar','suma_sin_llevar',0,99,0,3,'teclado','A.3.b',['2.1'],['S18'],800,false,null],
  ['S21','Pasar de 10: la primera llevada','suma_llevada',0,18,1,3,'teclado','A.3.b',['2.1','6.2'],['S18'],30,false,null],

  /* Restas: 4 */
  ['R15','Quitar 1, 2 y 3','resta_sin_llevar',0,10,0,1,'teclado','A.3.b',['2.1'],[],20,false,null],
  ['R16','Restar sin pasar de 20','resta_sin_llevar',0,20,0,2,'teclado','A.3.b',['2.1'],['R15'],80,false,null],
  ['R17','Restar decenas enteras','resta_sin_llevar',0,50,0,2,'opciones4','A.3.a',['3.1'],['R16'],10,false,null],
  ['R18','Restas de dos cifras sin llevar','resta_sin_llevar',0,99,0,3,'teclado','A.3.b',['2.1'],['R16'],800,false,null],

  /* Problemas: 4 */
  ['P21','Cambio: gano y cuento','problemas_cambio',0,20,0,2,'teclado','A.3.b',['1.1','2.1','2.2'],['S17'],600,false,null],
  ['P22','Cambio: pierdo y cuento','problemas_cambio',0,20,0,2,'teclado','A.3.b',['1.1','2.1','2.2'],['R15'],600,false,null],
  ['P23','Combinación: juntar todo','problemas_combinacion',0,59,0,3,'teclado','A.3.b',['1.1','2.1','2.2'],['S18'],600,false,null],
  ['P24','Combinación: la otra parte','problemas_combinacion',0,59,0,3,'teclado','A.3.b',['1.1','2.1','2.2'],['P23'],600,false,null],

  /* Dinero: 2 */
  ['E9','Contar monedas hasta 10 euros','dinero',0,10,0,2,'monedas','A.5',['2.1','5.2'],['S17'],40,false,null],
  ['E10','Pagar justo hasta 20 euros','dinero',0,20,0,3,'monedas','A.5',['2.1','2.2'],['E9'],19,false,null],
  /* Medida y tiempo (3.2.0): 2 */
  ['B1','Medir con bloques','medida',0,10,0,2,'teclado','B1.a',['5.2','1.2'],['N17'],6,false,null],
  ['H1','La hora en punto','tiempo',0,12,0,3,'teclado','B1.b',['5.2','6.1'],['N18'],8,false,null],
  /* Datos y azar (3.3.0): 2 */
  ['G1','El gráfico de los juguetes','datos',0,9,0,2,'teclado','E1.a',['1.2','5.2'],['N17'],1052,false,null],
  ['A1','Seguro o imposible','azar',0,0,0,3,'opciones4','E1.b',['3.1','5.2'],['N17'],19,false,null]
  ],

  /* ——— 2.º de Primaria: los 92 originales. ——— */
  2: [
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
  ['V8','Las palabras de los problemas','vocabulario',0,0,0,3,'opciones4','A.3.b',['6.1','1.1'],['P1'],6,false,null],
  /* Medida y tiempo (3.2.0): 3 */
  ['B2','Centímetros y metros','medida',0,900,0,3,'teclado','B1.a',['5.2','2.1'],['N9'],11,false,null],
  ['B3','¿Con qué se mide?','medida',0,0,0,3,'opciones4','B1.a',['5.2','6.1'],['E1'],4,false,null],
  ['H2','En punto y y media','tiempo',0,12,0,3,'opciones4','B1.b',['5.2','6.1'],['H1'],16,false,null],
  /* Datos y azar (3.3.0): 3 */
  ['G2','Leer el gráfico de barras','datos',0,12,0,2,'teclado','E1.a',['1.2','6.1'],['G1'],5939,false,null],
  ['G3','El que más y el que menos','datos',0,12,0,3,'opciones4','E1.a',['1.1','5.1'],['G2'],5184,false,null],
  ['A2','La bolsa de las bolas','azar',0,0,0,3,'opciones4','E1.b',['3.1','5.2'],['A1'],484,false,null]
  ],

  /* ——— 3.º de Primaria (3.1.0): 36 niveles. Techos 999 / 9.999 / 99.999. ——— */
  3: [
  ['N23','Aproximar a la centena','numeracion',0,999,0,1,'opciones4','A2.2',['2.1'],['N13'],546,false,null],
  ['N24','Leer y escribir hasta 9.999','numeracion',0,9999,0,2,'teclado','A2.1',['6.1'],['N15'],4027,false,null],
  ['N25','Las unidades de millar','valor_posicional',0,9999,0,2,'opciones4','A2.2',['1.2','6.1'],['N24'],6020,false,null],
  ['N26','Comparar hasta 9.999','numeracion',0,9999,0,2,'balanza','A2.2',['5.1'],['N24'],6838,false,null],
  ['N27','Aproximar al millar','numeracion',0,9999,0,2,'opciones4','A2.2',['2.1'],['N23','N24'],3822,false,null],
  ['N28','Leer y escribir hasta 99.999','numeracion',0,99999,0,3,'teclado','A2.1',['6.1'],['N24'],6563,false,null],
  ['N29','Ordenar números grandes','numeracion',0,99999,0,3,'ordenar','A2.2',['5.1'],['N26','N28'],7000,false,null],
  ['S22','Sumas con dos llevadas','suma_llevada',0,999,2,1,'teclado','A2.7',['2.1','6.2'],['S15'],6503,false,null],
  ['S23','Sumas de cuatro cifras','suma_llevada',0,9999,1,2,'teclado','A2.7',['2.1'],['S22'],6997,false,null],
  ['S24','Sumar centenas y millares de cabeza','suma_sin_llevar',0,9999,0,3,'opciones4','A2.7',['3.1'],['S13'],503,false,null],
  ['R19','Restas con dos llevadas','resta_llevada',0,999,2,1,'teclado','A2.7',['2.1','6.2'],['R13'],6542,false,null],
  ['R20','Restas de cuatro cifras','resta_llevada',0,9999,1,2,'teclado','A2.7',['2.1'],['R19'],6997,false,null],
  ['R21','Restar centenas de cabeza','resta_sin_llevar',0,9999,0,3,'opciones4','A2.7',['3.1'],['R9'],560,false,null],
  ['M11','La tabla del 6','multiplicacion',0,60,0,1,'teclado','A2.3',['3.1'],['M7'],7,false,null],
  ['M12','Las tablas del 7, del 8 y del 9','multiplicacion',0,90,0,1,'teclado','A2.3',['3.1'],['M11'],23,false,null],
  ['M13','Todas las tablas','multiplicacion',0,100,0,2,'teclado','A2.3',['3.1','5.1'],['M12'],69,false,null],
  ['M14','Por una cifra, sin llevada','multiplicacion',0,999,0,2,'teclado','A2.3',['2.1'],['M13'],26,false,null],
  ['M15','Por una cifra, con llevada','multiplicacion',0,999,1,3,'teclado','A2.3',['2.1','6.2'],['M14'],856,false,null],
  ['M16','Por 10 y por 100','multiplicacion',0,9999,0,3,'teclado','A2.3',['3.1'],['M13'],137,false,null],
  ['D1','Repartir en partes iguales','division',0,50,0,1,'opciones4','A2.3',['1.2','5.1'],['M7'],25,false,null],
  ['D2','Dividir con el 2, el 5 y el 10','division',0,100,0,1,'teclado','A2.3',['3.1'],['D1'],21,false,null],
  ['D3','Dividir con todas las tablas','division',0,100,0,2,'teclado','A2.3',['3.1'],['D2','M13'],56,false,null],
  ['D4','La división con resto','division',0,100,0,2,'teclado','A2.3',['2.1','6.2'],['D3'],403,false,null],
  ['D5','Dos cifras entre una','division',0,99,0,3,'teclado','A2.3',['2.1'],['D4'],109,false,null],
  ['D6','La prueba de la división','division',0,999,0,3,'teclado','A2.3',['5.1','6.2'],['D4'],853,false,null],
  ['F1','Mitades, tercios y cuartos','fracciones',0,12,0,2,'opciones4','A2.4',['1.2','6.1'],['N3'],2,false,null],
  ['F2','¿Qué fracción está pintada?','fracciones',0,12,0,2,'opciones4','A2.4',['1.2','6.1'],['F1'],23,false,null],
  ['F3','La fracción de una cantidad','fracciones',0,100,0,3,'teclado','A2.4',['2.1'],['F2','D3'],53,false,null],
  ['F4','Comparar fracciones sencillas','fracciones',0,12,0,3,'opciones4','A2.4',['5.1'],['F2'],49,false,null],
  ['P25','Igualar: cuánto falta (3.º)','problemas_igualacion',0,999,0,1,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,false,null],
  ['P26','Cuánto tenía antes de ganar','problemas_cambio',0,999,0,2,'teclado','A.4.c',['1.1','2.1','2.3'],['P7'],600,false,null],
  ['P27','Cuánto tenía antes de perder','problemas_cambio',0,999,0,2,'teclado','A.4.c',['1.1','2.1','2.3'],['P8'],600,false,null],
  ['P28','Comparar: referente con más (3.º)','problemas_comparacion',0,999,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P9'],600,false,null],
  ['P29','Comparar: referente con menos (3.º)','problemas_comparacion',0,999,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P10'],600,false,null],
  ['E11','Céntimos: contar y equivaler','dinero',0,300,0,2,'teclado','A2.6',['2.1','5.2'],['E4'],16,false,null],
  ['E12','La compra grande','dinero',0,999,0,3,'teclado','A2.6',['2.1','2.2'],['E7'],1481,false,null],
  /* Medida y tiempo (3.2.0): 4 */
  ['B4','De metros a centímetros','medida',0,900,0,1,'teclado','B2.a',['5.2','2.1'],['B2'],11,false,null],
  ['B5','Gramos y kilos','medida',0,9000,0,2,'teclado','B2.a',['5.2','2.1'],['B4'],11,false,null],
  ['B6','El perímetro','medida',0,100,0,3,'teclado','B2.c',['1.2','2.1'],['M13','B4'],44,false,null],
  ['H3','Los cuartos','tiempo',0,12,0,2,'opciones4','B2.b',['5.2','6.1'],['H2'],33,false,null],
  /* Datos y azar (3.3.0): 3 */
  ['G4','Los votos de la clase','datos',0,24,0,1,'teclado','E2.a',['1.2','2.1'],['G2','S18'],6361,false,null],
  ['G5','¿Cuántos más?','datos',0,12,0,2,'teclado','E2.a',['1.1','2.1'],['G4','R16'],6409,false,null],
  ['A3','Más probable','azar',0,9,0,3,'opciones4','E2.b',['3.1','5.2'],['A2'],352,false,null]
  ],

  /* ——— 4.º de Primaria: 34 niveles. Techos 99.999 / 499.999 / 999.999. ——— */
  4: [
  ['N30','Hasta el medio millón','numeracion',0,499999,0,2,'teclado','A2.1',['6.1'],['N28'],6899,false,null],
  ['N31','Hasta 999.999','numeracion',0,999999,0,3,'teclado','A2.1',['6.1'],['N30'],6927,false,null],
  ['N32','Aproximar a la decena de millar','numeracion',0,99999,0,1,'opciones4','A2.2',['2.1'],['N27'],6533,false,null],
  ['N33','Descomponer números grandes','valor_posicional',0,99999,0,1,'teclado','A2.2',['1.2','6.2'],['N28'],6618,false,null],
  ['S25','Sumas de números grandes','suma_llevada',0,99999,1,1,'teclado','A2.7',['2.1'],['S23'],7000,false,null],
  ['S26','Estimar sumas','suma_sin_llevar',0,9999,0,2,'opciones4','A2.7',['2.1','5.1'],['N27'],6865,false,null,'A.2.a'],
  ['R22','Restas de números grandes','resta_llevada',0,99999,1,1,'teclado','A2.7',['2.1'],['R20'],7000,false,null],
  ['R23','Estimar restas','resta_sin_llevar',0,9999,0,2,'opciones4','A2.7',['2.1','5.1'],['S26'],6911,false,null,'A.2.a'],
  ['M17','Por dos cifras','multiplicacion',0,9999,1,2,'teclado','A2.3',['2.1','6.2'],['M15'],3271,false,null],
  ['M18','Por decenas enteras','multiplicacion',0,9999,0,1,'teclado','A2.3',['3.1'],['M17'],492,false,null],
  ['M19','El doble y el triple de grandes','multiplicacion',0,9999,0,3,'teclado','A2.7',['3.1'],['M15'],3964,false,null],
  ['M20','Por 1.000','multiplicacion',0,999999,0,3,'teclado','A2.3',['3.1'],['M16'],698,false,null],
  ['D7','Tres cifras entre una','division',0,999,0,1,'teclado','A2.3',['2.1'],['D5'],1129,false,null],
  ['D8','Con resto y números grandes','division',0,999,0,2,'teclado','A2.3',['2.1','6.2'],['D7'],3014,false,null],
  ['D9','Dividir entre 10, 100 y 1.000','division',0,99999,0,2,'teclado','A2.3',['3.1'],['M16'],205,false,null],
  ['D10','Entre dos cifras: iniciación','division',0,999,0,3,'teclado','A2.3',['2.1'],['D8'],28,false,null],
  ['D11','La mitad, el tercio y el cuarto','division',0,9999,0,3,'teclado','A2.7',['3.1'],['D8'],3182,false,null],
  ['F5','Fracciones equivalentes','fracciones',0,20,0,1,'opciones4','A2.4',['3.1','5.1'],['F2'],12,false,null],
  ['F6','La fracción de una cantidad grande','fracciones',0,500,0,2,'teclado','A2.4',['2.1'],['F3'],1070,false,null],
  ['F7','Mayor que un entero','fracciones',0,12,0,2,'opciones4','A2.4',['5.1','6.1'],['F5'],9,false,null],
  ['F8','Sumar con el mismo denominador','fracciones',0,24,0,3,'opciones4','A2.4',['2.1'],['F5'],86,false,null],
  ['F9','La fracción y el decimal','fracciones',0,10,0,3,'opciones4','A2.5',['5.1'],['C1','F5'],2,false,null,'A2.4'],
  ['C1','Las décimas','decimales',0,10,0,2,'teclado','A2.5',['6.1','6.2'],['E11'],62,false,null],
  ['C2','Las centésimas','decimales',0,10,0,2,'teclado','A2.5',['6.1','6.2'],['C1'],693,false,null],
  ['C3','Sumar decimales','decimales',0,20,0,3,'teclado','A2.5',['2.1'],['C2'],2024,false,null],
  ['C4','Restar decimales','decimales',0,10,0,3,'teclado','A2.5',['2.1'],['C3'],2406,false,null],
  ['C5','El dinero con coma','decimales',0,10,0,3,'teclado','A2.6',['2.1','5.2'],['C3'],49,false,null,'A2.5'],
  ['P30','Igualar: referido, añadir (4.º)','problemas_igualacion',0,999,0,1,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,false,null],
  ['P31','Igualar: referido, quitar (4.º)','problemas_igualacion',0,999,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P12'],600,false,null],
  ['P32','Juntar: la otra parte (4.º)','problemas_combinacion',0,999,0,2,'teclado','A.3.b',['1.1','2.1','2.2'],['P4'],600,false,null],
  ['P33','Cuánto tenía antes (4.º)','problemas_cambio',0,999,0,3,'teclado','A.4.c',['1.1','2.1','2.3'],['P7'],600,false,null],
  ['P34','Comparar: referente con más (4.º)','problemas_comparacion',0,999,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P9'],600,false,null],
  ['E13','El cambio con céntimos','dinero',0,10,0,3,'teclado','A2.6',['2.1','2.2'],['C4','E6'],10,false,null,'A2.5'],
  ['E14','El presupuesto','dinero',0,999,0,2,'teclado','A2.6',['2.1','2.2'],['E12'],6001,false,null],
  /* Medida y tiempo (3.2.0): 4 */
  ['B7','Kilómetros y metros','medida',0,9000,0,1,'teclado','B2.a',['5.2','2.1'],['B4'],11,false,null],
  ['B8','Litros y mililitros','medida',0,9000,0,2,'teclado','B2.a',['5.2','2.1'],['B5'],11,false,null],
  ['B9','Perímetros de figuras','medida',0,120,0,2,'teclado','B2.c',['2.1','3.1'],['B6'],32,false,null],
  ['H4','El reloj de minutos','tiempo',0,12,0,3,'opciones4','B2.b',['5.2','6.1'],['H3'],92,false,null],
  /* Datos y azar (3.3.0): 3 */
  ['G6','El pictograma','datos',0,80,0,1,'teclado','E2.a',['1.2','5.1'],['G4','M13'],1933,false,null],
  ['G7','La encuesta entera','datos',0,48,0,2,'teclado','E2.a',['1.1','2.1'],['G4'],3604,false,null],
  ['A4','Menos probable','azar',0,9,0,3,'opciones4','E2.b',['3.1','5.2'],['A3'],352,false,null]
  ],

  /* ——— 5.º de Primaria: 29 niveles. Techos 999.999 / 9.999.999 / íd. ——— */
  5: [
  ['N34','Los millones','numeracion',0,9999999,0,2,'teclado','A3.1',['6.1'],['N31'],62,false,null],
  ['N35','El valor de cada cifra','valor_posicional',0,999999,0,1,'opciones4','A3.1',['1.2','6.1'],['N31'],6987,false,null],
  ['N36','Múltiplos','numeracion',0,144,0,1,'opciones4','A3.2',['3.1','5.1'],['M13'],49,false,null],
  ['N37','Divisores','numeracion',0,60,0,2,'opciones4','A3.2',['3.1','5.1'],['N36','D3'],38,false,null],
  ['N38','Divisible entre 2, 3, 5 y 10','numeracion',0,999,0,3,'opciones4','A3.2',['3.1'],['N36'],761,false,null],
  ['N39','Aproximar números grandes','numeracion',0,9999999,0,2,'opciones4','A3.1',['2.1'],['N32'],6997,false,null],
  ['M21','Decenas por decenas','multiplicacion',0,99999,0,1,'teclado','A2.7',['3.1'],['M18'],89,false,null],
  ['M22','Operaciones combinadas','multiplicacion',0,999,0,2,'teclado','A3.3',['2.1','6.2'],['M15'],1629,false,null],
  ['D12','Entre dos cifras','division',0,9999,0,1,'teclado','A3.4',['2.1'],['D10'],532,false,null],
  ['D13','Exacta y entera','division',0,9999,0,2,'teclado','A3.4',['2.1','6.2'],['D12'],5489,false,null],
  ['D14','Números grandes entre una cifra','division',0,99999,0,2,'teclado','A3.4',['2.1'],['D8'],6462,false,null],
  ['D15','Cocientes con ceros','division',0,99999,0,3,'teclado','A3.4',['2.1','6.2'],['D12'],623,false,null],
  ['F10','Simplificar fracciones','fracciones',0,25,0,1,'opciones4','A3.5',['3.1'],['F5'],19,false,null],
  ['F11','El denominador común','fracciones',0,40,0,2,'teclado','A3.5',['2.1','5.1'],['F10'],5,false,null],
  ['F12','Sumar y restar: mismo denominador','fracciones',0,24,0,1,'opciones4','A3.5',['2.1'],['F8'],203,false,null],
  ['F13','La fracción de una cantidad (5.º)','fracciones',0,999,0,2,'teclado','A3.5',['2.1'],['F6'],2009,false,null],
  ['F14','El número mixto','fracciones',0,25,0,3,'teclado','A3.5',['6.1','6.2'],['F12'],21,false,null],
  ['F15','De la fracción al decimal','fracciones',0,10,0,3,'teclado','A3.6',['5.1'],['F9'],5,false,null,'A3.5'],
  ['C6','Comparar decimales','decimales',0,10,0,1,'opciones4','A3.6',['5.1'],['C2'],403,false,null],
  ['C7','Sumar y restar decimales (5.º)','decimales',0,20,0,1,'teclado','A3.6',['2.1'],['C3','C4'],5967,false,null],
  ['C8','Un decimal por un entero','decimales',0,99,0,2,'teclado','A3.6',['2.1'],['C7','M15'],498,false,null],
  ['C9','La coma y las potencias de 10','decimales',0,999,0,2,'teclado','A3.6',['3.1'],['C7','M16'],1241,false,null],
  ['C10','Un decimal entre un entero','decimales',0,99,0,3,'teclado','A3.6',['2.1'],['C7','D5'],498,false,null],
  ['C11','Redondear decimales','decimales',0,10,0,3,'teclado','A3.6',['2.1'],['C6','N23'],503,false,null],
  ['P35','Igualar: referente, añadir (5.º)','problemas_igualacion',0,999,0,1,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,false,null],
  ['P36','Igualar: referente, quitar (5.º)','problemas_igualacion',0,999,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P12'],600,false,null],
  ['P37','Cuánto tenía antes de perder (5.º)','problemas_cambio',0,999,0,2,'teclado','A.4.c',['1.1','2.1','2.3'],['P8'],600,false,null],
  ['P38','Comparar: referente con menos (5.º)','problemas_comparacion',0,999,0,3,'teclado','A.4.b',['1.1','2.1','2.3'],['P10'],600,false,null],
  ['P39','Juntar: el total (5.º)','problemas_combinacion',0,999,0,3,'teclado','A.3.b',['1.1','2.1','2.2'],['P3'],600,false,null],
  /* Medida y tiempo (3.2.0): 4 */
  ['B10','El sistema métrico','medida',0,9999,0,1,'teclado','B3.a',['5.2','2.1'],['B7','C1'],178,false,null],
  ['B11','El área del rectángulo','medida',0,81,0,2,'teclado','B3.b',['1.2','2.1'],['B6','M13'],44,false,null],
  ['B12','Masa y capacidad con coma','medida',0,9999,0,2,'teclado','B3.a',['5.2','2.1'],['B8'],118,false,null],
  ['H5','Horas y minutos','tiempo',0,300,0,3,'teclado','B3.c',['2.1','5.2'],['H4','M13'],33,false,null],
  /* Datos y azar (3.3.0): 4 */
  ['G8','La moda','datos',0,12,0,1,'teclado','E3.a',['1.1','6.1'],['G7'],4151,false,null],
  ['G9','La media','datos',0,20,0,2,'teclado','E3.a',['2.1','5.1'],['G8','D3'],1695,false,null],
  ['G10','El rango','datos',0,20,0,2,'teclado','E3.a',['2.1','6.1'],['G8'],6302,false,null],
  ['A5','La probabilidad como fracción','azar',0,10,0,3,'opciones4','E3.b',['1.2','5.1'],['A4','F2'],176,false,null]
  ],

  /* ——— 6.º de Primaria: 31 niveles. Techo 9.999.999 en los tres. ——— */
  6: [
  ['N40','Potencias','numeracion',0,144,0,1,'teclado','A3.3',['3.1','6.1'],['M13'],10,false,null],
  ['N41','La raíz cuadrada exacta','numeracion',0,144,0,1,'teclado','A3.3',['3.1'],['N40'],7,false,null],
  ['N42','El mínimo común múltiplo','numeracion',0,40,0,2,'teclado','A3.2',['2.1','5.1'],['N36'],7,false,null],
  ['N43','El máximo común divisor','numeracion',0,30,0,2,'teclado','A3.2',['2.1','5.1'],['N37'],7,false,null],
  ['N44','Las potencias de 10','numeracion',0,1000000,0,3,'teclado','A3.3',['3.1'],['N40','M16'],7,false,null],
  ['Z1','Bajo cero: el termómetro','enteros',-24,24,0,1,'teclado','A3.8',['1.1','5.2'],['R8'],105,false,null],
  ['Z2','El ascensor','enteros',-11,11,0,1,'teclado','A3.8',['1.1','5.2'],['Z1'],24,false,null],
  ['Z3','Comparar enteros','enteros',-10,10,0,2,'opciones4','A3.8',['5.1'],['Z1'],6760,false,null],
  ['Z4','La recta con negativos','enteros',-10,10,0,3,'teclado','A3.8',['1.2'],['Z3'],26,false,null],
  ['C12','Operaciones con decimales (6.º)','decimales',0,99,0,1,'teclado','A3.6',['2.1'],['C7'],5050,false,null],
  ['C13','Dividir entre 0,5 y 0,25','decimales',0,120,0,2,'teclado','A3.6',['3.1','5.1'],['C10'],40,false,null],
  ['C14','Porcentaje, decimal y fracción','decimales',0,10,0,3,'teclado','A3.7',['5.1'],['T1','C11'],7,false,null,'A3.6'],
  ['C15','El ticket de la compra','decimales',0,20,0,2,'teclado','A2.6',['1.1','2.1'],['C12'],700,false,null,'A3.6'],
  ['F16','Sumar: distinto denominador','fracciones',0,24,0,1,'opciones4','A3.5',['2.1'],['F11'],5,false,null],
  ['F17','Restar: distinto denominador','fracciones',0,24,0,2,'opciones4','A3.5',['2.1'],['F16'],5,false,null],
  ['F18','Una fracción por un entero','fracciones',0,50,0,2,'teclado','A3.5',['2.1'],['F13'],70,false,null],
  ['F19','La fracción de una fracción','fracciones',0,12,0,3,'opciones4','A3.5',['3.1'],['F16'],4,false,null],
  ['F20','La fracción mayor','fracciones',0,12,0,3,'opciones4','A3.5',['5.1'],['F10'],3074,false,null],
  ['T1','El tanto por ciento','porcentajes',0,100,0,1,'opciones4','A3.7',['1.2','5.1'],['F3'],66,false,null],
  ['T2','El 10, el 25 y el 50 por ciento','porcentajes',0,999,0,1,'teclado','A3.7',['3.1'],['T1'],203,false,null],
  ['T3','El descuento','porcentajes',0,999,0,2,'teclado','A3.7',['1.1','2.1'],['T2'],249,false,null],
  ['T4','La subida','porcentajes',0,999,0,2,'teclado','A3.7',['1.1','2.1'],['T2'],165,false,null],
  ['T5','La proporción directa','porcentajes',0,999,0,3,'teclado','A3.7',['1.1','2.1'],['D3'],215,false,null],
  ['T6','Cualquier porcentaje','porcentajes',0,999,0,3,'teclado','A3.7',['2.1'],['T2','M17'],162,false,null],
  ['D16','Divisores grandes','division',0,9999,0,1,'teclado','A3.4',['2.1'],['D13'],3439,false,null],
  ['D17','Estimar el cociente','division',0,9999,0,2,'opciones4','A3.4',['2.1','5.1'],['D16'],1992,false,null,'A.2.a'],
  ['P40','Igualar: referente, añadir (6.º)','problemas_igualacion',0,999,0,1,'teclado','A.4.b',['1.1','2.1','2.3'],['P11'],600,false,null],
  ['P41','Igualar: referente, quitar (6.º)','problemas_igualacion',0,999,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P12'],600,false,null],
  ['P42','Comparar: referente con más (6.º)','problemas_comparacion',0,999,0,2,'teclado','A.4.b',['1.1','2.1','2.3'],['P9'],600,false,null],
  ['P43','Cuánto tenía antes (6.º)','problemas_cambio',0,999,0,3,'teclado','A.4.c',['1.1','2.1','2.3'],['P7'],600,false,null],
  ['P44','Juntar: la otra parte (6.º)','problemas_combinacion',0,999,0,3,'teclado','A.3.b',['1.1','2.1','2.2'],['P4'],600,false,null],
  /* Medida y tiempo (3.2.0): 4 */
  ['B13','Área del cuadrado y del triángulo','medida',0,144,0,1,'teclado','B3.b',['2.1'],['B11'],46,false,null],
  ['B14','Conversiones con coma','medida',0,9999,0,2,'teclado','B3.a',['2.1','5.2'],['B10','C2'],660,false,null],
  ['B15','Problemas de medida','medida',0,9999,0,3,'teclado','B2.c',['1.1','2.1'],['B9','D3'],239,false,null,'B3.a'],
  ['H6','Minutos y segundos','tiempo',0,3600,0,2,'teclado','B3.c',['2.1','5.2'],['H5','M16'],11,false,null],
  /* Datos y azar (3.3.0): 4 */
  ['G11','La media del gráfico','datos',0,20,0,1,'teclado','E3.a',['1.2','2.1'],['G9'],580,false,null],
  ['G12','Media, moda y rango','datos',0,20,0,2,'teclado','E3.a',['2.1','6.1'],['G9','G10'],5623,false,null],
  ['A6','La regla de Laplace','azar',0,10,0,2,'opciones4','E3.b',['1.2','5.1'],['A5'],19,false,null],
  ['A7','Las veces que saldrá','azar',0,60,0,3,'teclado','E3.c',['2.1','3.1'],['A6','D3'],65,false,null]
  ]
};

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

/* Desplazamiento de beta por curso. La interpolación se hace DENTRO de cada
   familia×curso y luego se suma este offset: con 2.º a 0 y posiciones
   intactas, las 92 betas originales quedan byte a byte como estaban, que es lo
   que protege el emparejamiento adaptativo de los perfiles ya guardados
   (guardián E127, con el volcado literal de las 92). */
CB.catalogo.BETA_CURSO = { 1: -160, 2: 0, 3: 150, 4: 300, 5: 450, 6: 600 };

/* Fracción del rango de beta de la familia que ocupa cada curso. Sin esto,
   los 5 niveles de sumas de 1.º se repartían el MISMO rango que los 16 de
   2.º y «8 + 5» (S21) salía con β960: catalogado más difícil que una llevada
   de tres cifras. Un curso con pocos niveles ocupa un tramo corto. 2.º queda
   en 1 — sus 92 betas no se mueven (E127). */
CB.catalogo.ANCHO_BETA_CURSO = { 1: 0.4, 2: 1, 3: 0.8, 4: 0.8, 5: 0.8, 6: 0.8 };

/* Tope del SALTO de beta entre niveles consecutivos de una familia×curso
   (3.2.0). Sin él, una familia con dos niveles en un curso repartía el rango
   ENTERO entre ambos: «¿Con qué se mide?» (B3, 2.º) salía con β1000 — más
   difícil que una suma de tres cifras con llevada — y el niño sintético flojo
   caía por debajo del 75 %. En las familias pobladas de 2.º el salto real es
   de 45-91 puntos, así que este tope no las toca: E127 lo certifica. */
CB.catalogo.PASO_BETA_MAX = 130;

CB.catalogo.CURSOS = [];

/* Lo que cada curso tiene PERMITIDO en sus números (3.1.0). La comparten la
   producción (distractores, teclado) y los invariantes de la suite: un solo
   dueño, o el guardián y el juego acabarían discrepando en silencio. */
CB.catalogo.LIMITES_CURSO = {
  1: { max: 999 },
  2: { max: 999 },
  3: { max: 99999 },
  4: { max: 999999, decimales: true },
  5: { max: 9999999, decimales: true },
  6: { max: 9999999, decimales: true, negativos: true, min: -99 }
};

(function () {
  const familiaDe = { N: 'numeracion', S: 'sumas', R: 'restas', M: 'multiplicacion',
                    P: 'problemas', E: 'dinero', V: 'vocabulario',
                    D: 'division', F: 'fracciones', C: 'decimales',
                    T: 'porcentajes', Z: 'enteros',
                    B: 'medida', H: 'tiempo',
                    G: 'datos', A: 'azar' };

  const cursos = [];
  let c;
  for (c in CB.catalogo.TABLAS) {
    if (Object.prototype.hasOwnProperty.call(CB.catalogo.TABLAS, c)) cursos.push(Number(c));
  }
  cursos.sort(function (a, b) { return a - b; });
  CB.catalogo.CURSOS = cursos;

  cursos.forEach(function (curso) {
  const tabla = CB.catalogo.TABLAS[curso];
  const contadorFamilia = {};

  tabla.forEach(function (fila) {
    const id = fila[0];
    const letra = id.charAt(0);
    const fam = CB.catalogo.FAMILIAS[letra];
    contadorFamilia[letra] = (contadorFamilia[letra] || 0) + 1;

    /* betaBase repartida por la familia DEL CURSO: los primeros niveles en la
       parte baja del rango, los últimos en la alta. */
    const total = tabla.filter(function (f) {
      return f[0].charAt(0) === letra;
    }).length;
    const pos = (total > 1) ? (contadorFamilia[letra] - 1) / (total - 1) : 0;
    const ancho = CB.catalogo.ANCHO_BETA_CURSO[curso] || 1;
    const spanEfectivo = Math.min(ancho * (fam.beta[1] - fam.beta[0]),
                                  CB.catalogo.PASO_BETA_MAX * Math.max(1, total - 1));
    const beta = Math.round(fam.beta[0] + pos * spanEfectivo) +
                 (CB.catalogo.BETA_CURSO[curso] || 0);

    const tI = fam.tIdeal;
    let tL = fam.tLimite;
    if (tL - tI < 500) tL = tI + 500;          // guarda obligatoria (§8.1)

    const nivel = {
      id: id,
      curso: curso,
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
                E: CB.gen.dinero, V: CB.gen.vocabulario,
                D: CB.gen.division, F: CB.gen.fracciones, C: CB.gen.decimales,
                T: CB.gen.porcentajes, Z: CB.gen.enteros,
                B: CB.gen.medida, H: CB.gen.tiempo,
                G: CB.gen.datos, A: CB.gen.azar }[letra];

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
        /* El rango del nivel viaja con el ítem (3.1.0): el teclado dimensiona
           sus cifras con él y el anti-azar acota qué respuesta es imposible.
           Sin esto, los dos seguirían clavados en el 999 de 2.º. */
        base.rangoNivel = nivel.rango;
        if (base.diagnostico == null) base.diagnostico = nivel.diagnostico;
        return base;
      };
    })(mod, id);

    CB.catalogo._porId[id] = nivel;
    CB.catalogo._ids.push(id);
  });
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

/* El curso activo de un perfil. 2 por defecto: es el curso del catálogo
   original y el que la migración v4 estampa a todos los perfiles anteriores. */
CB.catalogo.cursoDe = function (perfil) {
  return (perfil && perfil.curso) || 2;
};

CB.catalogo.nivelesDeCurso = function (curso) {
  return CB.catalogo.todos().filter(function (n) { return n.curso === curso; });
};

CB.catalogo.nuclearesDeCurso = function (curso) {
  return CB.catalogo.nivelesDeCurso(curso).filter(function (n) { return !n.ampliacion; });
};

CB.catalogo.slugsDeCurso = function (curso) {
  const vistos = {}, out = [];
  CB.catalogo.nivelesDeCurso(curso).forEach(function (n) {
    if (!vistos[n.destreza]) { vistos[n.destreza] = true; out.push(n.destreza); }
  });
  return out;
};

/* Los cursos que se pueden ELEGIR: los que tienen contenido nuclear. Los
   selectores de UI (creación de perfil, panel del adulto) se alimentan de aquí
   y crecen solos cuando una fase añade la tabla de un curso nuevo. */
CB.catalogo.cursosDisponibles = function () {
  return CB.catalogo.CURSOS.filter(function (c) {
    return CB.catalogo.nuclearesDeCurso(c).length > 0;
  });
};

/* candidatos() NUNCA devuelve []. Solo sirve niveles del curso del perfil o de
   cursos anteriores (el contenido de cursos superiores no existe para el
   niño), y PREFIERE el curso del perfil: el emparejador adaptativo empareja
   dentro del curso, y el repaso de cursos anteriores es trabajo de la cuota
   del guion, no de esta función. Sin esa preferencia, el niño sintético de
   casos-motor.js bajaba del 75 % de acierto: le caían niveles de 1.º en la
   banda que su curso ya cubría. */
CB.catalogo.candidatos = function (slug, banda, perfil) {
  const cursoTope = CB.catalogo.cursoDe(perfil);
  let abiertos = CB.catalogo.porDestreza(slug).filter(function (n) {
    if (n.curso > cursoTope) return false;
    if (CB.grafo.estado(n.id, perfil) !== 'abierta') return false;
    const e = perfil && perfil.niveles ? perfil.niveles[n.id] : null;
    if (e && e.enPausa) return false;                  // escalón 5 de la escalera
    return true;
  });
  const delCurso = abiertos.filter(function (n) { return n.curso === cursoTope; });
  if (delCurso.length) abiertos = delCurso;

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

  /* 4) la destreza no tiene ningún nivel abierto: se cae a la frontera global,
     prefiriendo también aquí el curso del perfil. */
  const frontera = CB.grafo.frontera(perfil);
  const fronteraDelCurso = frontera.filter(function (id) {
    const n = CB.catalogo.get(id);
    return n && n.curso === cursoTope;
  });
  const filaFrontera = fronteraDelCurso.length ? fronteraDelCurso : frontera;
  if (filaFrontera.length) return [CB.catalogo.get(filaFrontera[0])];

  /* 5) solo posible si el perfil no tiene NINGÚN nivel abierto, situación
     imposible: el catálogo declara ≥1 nivel con prerrequisitos:[] por bloque.
     Aun así, se devuelve algo antes que dejar la partida sin ítems — y del
     curso del niño, no S1 a secas: para un perfil de 1.º, S1 es de 2.º. */
  const primero = CB.catalogo.nuclearesDeCurso(cursoTope)[0];
  return [primero || CB.catalogo.get('S1')];
};

/* Los 4 mundos (§5.2). Tabla CERRADA */
CB.MUNDOS = [
  { id: 'M1', nombre: 'La Pradera de los Números', bioma: 'pradera', jefe: 'Tronquete',
    jefeIcono: '🌳',
    niveles: ['N1','N2','N3','N4','N5','N6','N7','N8',
              'S1','S2','S3','S4','S5','S6','S7',
              'R1','R2','R3','R4','R5',
              'P1','P2','E1','E2',
              'N17','N18','S17','R15','P21',
              'N23','N24','N25','N26','N27','N28','N29','S24','R21',
              'N30','N31','N32','N33','S26','R23',
              'N34','N35','N36','N37','N38','N39',
              'N40','N41','N42','N43','N44','Z1','Z2','Z3','Z4',
              'H1','H2','H3','H4','H5','H6',
              'G1','G2','G3','A1','A2'] },

  { id: 'M2', nombre: 'El Bosque de las Llevadas', bioma: 'bosque', jefe: 'Ranacubo',
    jefeIcono: '🐸',
    niveles: ['N9','N10','N11','N12','N13',
              'S8','S9','S10','S11','S12','S13',
              'R6','R7','R8','R9','R10',
              'P3','P4','P5','P6','P7','P8',
              'E3','E4','V1','V2',
              'N19','N20','S18','R16','E9',
              'S22','S23','R19','R20','E11','E12',
              'S25','R22','C1','C2','C3','C4','C5','E13','E14',
              'C6','C7','C8','C9','C10','C11',
              'C12','C13','C14','C15',
              'B2','B3','B5','B8','B12','B14',
              'G4','G5','G7'] },

  { id: 'M3', nombre: 'El Río de los Problemas', bioma: 'rio', jefe: 'Cristalina',
    jefeIcono: '💠',
    niveles: ['N14','S14','R11','R12',
              'P9','P10','P11','P12','P13','P14','P15','P16',
              'E5','E6','V3','V4','V5','V6',
              'N21','S19','R17','P22','E10',
              'F1','F2','F3','F4','P25','P26','P27','P28','P29',
              'F5','F6','F7','F8','F9','P30','P31','P32','P33','P34',
              'F10','F11','F12','F13','F14','F15','P35','P36','P37','P38','P39',
              'F16','F17','F18','F19','F20','P40','P41','P42','P43','P44',
              'B1','B4','B7','B10','B15',
              'A3','A4','A5','A6','A7'] },

  { id: 'M4', nombre: 'La Mina de las Veces', bioma: 'mina', jefe: 'Brasita',
    jefeIcono: '🔥', distintivo: 'INICIACIÓN',
    niveles: ['N15','N16','S15','S16','R13','R14',
              'P17','P18','P19','P20','E7','E8',
              'M1','M2','M3','M4','M5','M6','M7','M8','M9','M10',
              'V7','V8',
              'N22','S20','S21','R18','P23','P24',
              'M11','M12','M13','M14','M15','M16','D1','D2','D3','D4','D5','D6',
              'M17','M18','M19','M20','D7','D8','D9','D10','D11',
              'M21','M22','D12','D13','D14','D15',
              'T1','T2','T3','T4','T5','T6','D16','D17',
              'B6','B9','B11','B13',
              'G6','G8','G9','G10','G11','G12'] }
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
   100 %, porque bloquear por perfección es un muro.
   El 2.º parámetro es opcional: con él, solo los nucleares de ESE curso. */
CB.catalogo.nuclearesDe = function (mundoId, curso) {
  const m = CB.catalogo.getMundo(mundoId);
  if (!m) return [];
  return m.niveles.filter(function (id) {
    const n = CB.catalogo.get(id);
    if (!n || n.ampliacion) return false;
    if (curso != null && n.curso !== curso) return false;
    return true;
  });
};

/* El progreso de un mundo se mide SOLO sobre los nucleares del curso activo.
   Sin este filtro, al añadir los niveles de 1.º a los cuatro mundos la
   fracción de todos los perfiles de 2.º habría bajado de golpe — el mismo
   mapa, de repente menos completo, sin que el niño hubiera hecho nada. */
CB.catalogo.progresoMundo = function (mundoId, perfil) {
  const nucleares = CB.catalogo.nuclearesDe(mundoId, CB.catalogo.cursoDe(perfil));
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
