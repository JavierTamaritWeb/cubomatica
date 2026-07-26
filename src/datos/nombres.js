/* ============================================================================
   nombres.js — 40 nombres propios para los enunciados (20 F + 20 M)
   ----------------------------------------------------------------------------
   Criterios (PLAN §9.7):
     · 1 o 2 sílabas: un lector de 7 años no debe gastar su presupuesto de
       decodificación en el nombre, sino en la estructura del problema.
     · Diversidad real del aula de la escuela pública española.
     · Sin tilde en la medida de lo posible, para no añadir carga ortográfica.
     · El género se ALTERNA por construcción con BolsaBarajada, no se sortea:
       el equilibrio 50/50 con muestreo aleatorio es matemáticamente inalcanzable
       en 200 extracciones (σ ≈ 7).

   LISTA NEGRA DE NOMBRES: quedan excluidos los que colisionan con la auditoría
   de marca de §21.1 o con personajes de terceros.
   ========================================================================== */

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
