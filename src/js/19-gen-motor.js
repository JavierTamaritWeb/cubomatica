/* 19-gen-motor.js — Ayudas compartidas por los generadores de 3.º-6.º (3.1.0).
   PURO: sin DOM y sin Math.random; todo rng viene inyectado. Los decimales se
   construyen SIEMPRE como entero escalado dividido UNA vez entre 10 o 100:
   así parseFloat(lo tecleado) y la respuesta son el mismo doble exacto. */

var CB = CB || {};
CB.gen = CB.gen || {};
CB.gen.motor = {};

/* Un número grande, legible: 45 231 (espacio, nunca punto: el guardián de los
   decimales busca [,.] pegado a cifra, y el punto de millar lo pisaría). */
CB.gen.motor.sep = function (n) {
  const s = String(Math.round(Math.abs(n)));
  let out = '', i;
  for (i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += ' ';
    out += s.charAt(i);
  }
  return (n < 0 ? '−' : '') + out;
};

/* Entero escalado → texto con coma: coma(345, 100) = '3,45'. */
CB.gen.motor.coma = function (escalado, escala) {
  const neg = escalado < 0 ? '−' : '';
  const abs = Math.abs(escalado);
  const ent = Math.floor(abs / escala);
  let dec = String(abs % escala);
  while (dec.length < String(escala).length - 1) dec = '0' + dec;
  dec = dec.replace(/0+$/, '');
  return neg + ent + (dec.length ? ',' + dec : '');
};

/* Entero escalado → Number exacto: dec(345, 100) = 3.45. UNA división. */
CB.gen.motor.dec = function (escalado, escala) { return escalado / escala; };

CB.gen.motor.mcd = function (a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { const t = a % b; a = b; b = t; }
  return a || 1;
};

CB.gen.motor.mcm = function (a, b) {
  return (a * b) / CB.gen.motor.mcd(a, b);
};

/* La fracción como texto: es la RESPUESTA de los ítems de fracción (una
   cadena, como 'c20' en el dinero: el motor de distractores hace aritmética
   y una fracción no es un número tecleable). */
CB.gen.motor.fstr = function (num, den) { return num + '/' + den; };

/* Recorre [min, max] según D, igual que tramo() en 10-gen-numeracion. */
CB.gen.motor.tramo = function (min, max, D, rng) {
  return CB.gen.numeracion._tramo(min, max, D, rng);
};
