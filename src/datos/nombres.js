/* nombres.js — 40 nombres propios para los enunciados (20 F + 20 M) */

var CB = CB || {};
CB.datos = CB.datos || {};

CB.datos.NOMBRES_F = [
  'Ana', 'Eva', 'Sara', 'Marta', 'Julia', 'Laia', 'Noa', 'Emma', 'Iris', 'Alba',
  'Nora', 'Elsa', 'Lola', 'Vega', 'Aixa', 'Nadia', 'Yasmin', 'Fatma', 'Lin', 'Zoe'
];

CB.datos.NOMBRES_M = [
  'Leo', 'Hugo', 'Bruno', 'Pablo', 'Marc', 'Pau', 'Jan', 'Nil', 'Iker', 'Mario',
  'Nico', 'Iván', 'Adam', 'Omar', 'Amir', 'Karim', 'Wei', 'Dani', 'Raúl', 'Toño'
];

/* Nombres prohibidos: colisionan con la lista negra de marca o con personajes
   de terceros. `pruebas/casos-problemas.js` comprueba que ninguno aparece. */
CB.datos.NOMBRES_PROHIBIDOS = ['Alex', 'Álex', 'Steve', 'Herobrine', 'Notch'];
