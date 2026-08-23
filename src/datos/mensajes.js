/* mensajes.js — 84 mensajes de acierto (4 × 21) y 48 de ánimo (2 × 24) */

var CB = CB || {};
CB.datos = CB.datos || {};

CB.datos.MENSAJES = {};

/* Frases de procedimiento, por destreza (13 slugs × 3) */
CB.datos.MENSAJES.PROCEDIMIENTOS = {
  numeracion: [
    'Has leído el número entero, sin saltarte ninguna cifra.',
    'Has contado sin perderte por el camino.',
    'Has visto qué número va antes y cuál va después.'
  ],
  valor_posicional: [
    'Has colocado cada cifra en su sitio: centenas, decenas y unidades.',
    'Has sabido cuánto vale cada cifra según el lugar que ocupa.',
    'Has separado las decenas de las unidades.'
  ],
  suma_sin_llevar: [
    'Has sumado primero las unidades y después las decenas.',
    'Has juntado las dos cantidades sin equivocarte de columna.',
    'Has sumado ordenado, columna a columna.'
  ],
  suma_llevada: [
    'Has llevado bien la decena a la columna de al lado.',
    'Al pasar de diez has llevado una decena, justo como toca.',
    'Has recordado la llevada. Eso es lo más difícil de todo.'
  ],
  resta_sin_llevar: [
    'Has restado unidades con unidades y decenas con decenas.',
    'Has quitado la cantidad justa.',
    'Has restado columna a columna, sin mezclarlas.'
  ],
  resta_llevada: [
    'Has pedido prestada una decena y la has deshecho bien.',
    'Has desatado un manojo de diez para poder restar.',
    'Has llevado la resta con préstamo hasta el final.'
  ],
  multiplicacion: [
    'Has contado las filas y las columnas.',
    'Has visto que multiplicar es sumar el mismo número varias veces.',
    'Has recordado cuántas veces cabe ese número.'
  ],
  problemas_cambio: [
    'Has visto qué tenía al principio y qué pasó después.',
    'Has entendido si la cantidad crecía o se hacía más pequeña.',
    'Has seguido el cuento hasta el final antes de operar.'
  ],
  problemas_combinacion: [
    'Has juntado las dos partes para formar el todo.',
    'Has visto que las dos cantidades formaban un mismo grupo.',
    'Has separado la parte del total.'
  ],
  problemas_comparacion: [
    'Has comparado las dos cantidades sin dejarte llevar por la palabra.',
    'Has visto quién tenía más y cuánto más.',
    'Has medido la diferencia entre los dos.'
  ],
  problemas_igualacion: [
    'Has calculado cuánto falta para que los dos tengan lo mismo.',
    'Has igualado las dos cantidades.',
    'Has visto cuánto había que mover de un lado al otro.'
  ],
  dinero: [
    'Has contado las monedas y los billetes por su valor.',
    'Has sabido cuánto vale cada moneda.',
    'Has calculado bien el cambio.'
  ],
  vocabulario: [
    'Has recordado qué significa esa palabra de matemáticas.',
    'Has usado la palabra exacta.',
    'Has reconocido el término a la primera.'
  ],

  /* Cursos 3.º-6.º y bloques B, E, D y C. Se añadieron en 3.4.4: la tabla se
     escribió con los 13 slugs de 2.º y no creció con el catálogo, así que en
     127 de los 308 niveles el elogio decía «Has resuelto el bloque» —un elogio
     de procedimiento que no nombra el procedimiento no enseña nada— y la pista
     era «Léelo otra vez con calma». */
  division: [
    'Has repartido en partes iguales, sin que sobre nadie.',
    'Has buscado cuántas veces cabe un número dentro del otro.',
    'Has usado la tabla al revés para encontrar el cociente.'
  ],
  fracciones: [
    'Has mirado en cuántas partes iguales está partido el todo.',
    'Has contado las partes que se toman y las que hay en total.',
    'Has comparado las fracciones fijándote en sus partes.'
  ],
  decimales: [
    'Has puesto la coma en su sitio antes de operar.',
    'Has colocado las décimas debajo de las décimas.',
    'Has leído el número con coma sin perder ninguna cifra.'
  ],
  porcentajes: [
    'Has calculado la parte que le toca a cada cien.',
    'Has sacado el tanto por ciento paso a paso.',
    'Has visto qué parte del total te pedían.'
  ],
  enteros: [
    'Has sabido a qué lado del cero cae cada número.',
    'Has contado hacia abajo del cero sin perderte.',
    'Has usado la recta para moverte entre los positivos y los negativos.'
  ],
  medida: [
    'Has usado la unidad que le va bien a lo que se mide.',
    'Has cambiado de unidad contando bien los ceros.',
    'Has medido primero y comparado después, en ese orden.'
  ],
  tiempo: [
    'Has mirado primero la manecilla corta y después la larga.',
    'Has pasado de horas a minutos sin liarte.',
    'Has leído el reloj entero antes de responder.'
  ],
  datos: [
    'Has seguido la barra desde su etiqueta hasta arriba.',
    'Has contado los bloques uno a uno, sin saltarte ninguno.',
    'Has comparado las barras mirando su altura.'
  ],
  azar: [
    'Has mirado cuántas hay de cada color antes de decidir.',
    'Has separado lo que es seguro de lo que es imposible.',
    'Has contado los casos que valen entre todos los que hay.'
  ],
  patrones: [
    'Has descubierto de cuánto en cuánto va la serie.',
    'Has aplicado el salto al último número, sin repetirlo.',
    'Has seguido las instrucciones en orden, una a una.'
  ],
  algebra: [
    'Has buscado el número que deja la igualdad verdadera.',
    'Has comprobado los dos lados del igual.',
    'Has despejado la incógnita paso a paso.'
  ],
  geometria: [
    'Has contado los lados y los vértices sin repetir ninguno.',
    'Has reconocido la figura por cómo es, no por cómo está puesta.',
    'Has mirado la abertura del ángulo antes de darle nombre.'
  ],
  espacio: [
    'Has dicho primero la columna y después la fila.',
    'Has localizado la casilla siguiendo las dos referencias.',
    'Has movido el punto en la dirección que te decían.'
  ]
};

/* Pistas de procedimiento para el fallo (13 slugs × 2) */
CB.datos.MENSAJES.PISTAS = {
  numeracion: [
    'Fíjate bien en cuántas cifras tiene el número.',
    'Cuenta otra vez, despacio.'
  ],
  valor_posicional: [
    'Mira qué lugar ocupa cada cifra.',
    'Separa las decenas de las unidades.'
  ],
  suma_sin_llevar: [
    'Suma primero las unidades y después las decenas.',
    'Cuida de no mezclar las columnas.'
  ],
  suma_llevada: [
    'Mira si al sumar las unidades pasas de diez.',
    'Si pasas de diez, hay que llevar una decena.'
  ],
  resta_sin_llevar: [
    'Quita unidades a unidades y decenas a decenas.',
    'Coloca bien las dos cantidades antes de restar.'
  ],
  resta_llevada: [
    'Mira si puedes quitar sin pedir prestado.',
    'Si el de arriba es más pequeño, pide una decena prestada.'
  ],
  multiplicacion: [
    'Cuenta las filas y luego las columnas.',
    'Prueba a sumar ese número tantas veces.'
  ],
  problemas_cambio: [
    'Vuelve a leer qué tenía al principio.',
    'Mira si al final tiene más o tiene menos.'
  ],
  problemas_combinacion: [
    'Mira si te piden el total o solo una parte.',
    'Las dos cantidades juntas forman el todo.'
  ],
  problemas_comparacion: [
    'No te fíes solo de la palabra: mira quién tiene más.',
    'Piensa cuánto le falta a uno para llegar al otro.'
  ],
  problemas_igualacion: [
    'Piensa cuánto hay que mover para que tengan lo mismo.',
    'Mira cuál tiene menos y cuánto le falta.'
  ],
  dinero: [
    'Cuenta primero los billetes y luego las monedas.',
    'Mira cuánto vale cada moneda.'
  ],
  vocabulario: [
    'Piensa qué operación te pide esa palabra.',
    'Lee la palabra otra vez, sin prisa.'
  ],

  /* Las mismas 13 que en PROCEDIMIENTOS, y por el mismo motivo (3.4.4). La
     primera señala DÓNDE mirar; la segunda empuja un paso, sin dar la
     respuesta: una pista que resuelve el ítem no es una pista. */
  division: [
    'Piensa cuántas veces cabe el número pequeño en el grande.',
    'Repártelo en partes iguales y cuenta cuánto va en cada una.'
  ],
  fracciones: [
    'Mira en cuántas partes iguales está partido el todo.',
    'Abajo van todas las partes; arriba, las que se toman.'
  ],
  decimales: [
    'Coloca las comas una debajo de otra antes de operar.',
    'La primera cifra después de la coma son las décimas.'
  ],
  porcentajes: [
    'El tanto por ciento es lo que le toca a cada cien.',
    'Busca primero el 10 % o la mitad, y sigue desde ahí.'
  ],
  enteros: [
    'Mira a qué lado del cero está cada número.',
    'Bajar del cero es seguir contando hacia el otro lado.'
  ],
  medida: [
    'Piensa qué unidad le va bien a eso que se mide.',
    'Al cambiar de unidad, cuenta bien los ceros.'
  ],
  tiempo: [
    'La manecilla corta dice la hora; la larga, los minutos.',
    'Una hora entera son sesenta minutos.'
  ],
  datos: [
    'Busca la etiqueta y sube por SU barra con el dedo.',
    'Cuenta los bloques de uno en uno, sin saltarte ninguno.'
  ],
  azar: [
    'Cuenta cuántas hay de cada color antes de decidir.',
    'Lo que no está en la bolsa no puede salir nunca.'
  ],
  patrones: [
    'Mira cuánto va de un número al siguiente.',
    'Ese mismo salto se lo aplicas al último número.'
  ],
  algebra: [
    'Prueba un número y comprueba si los dos lados valen igual.',
    'El hueco es lo que falta para llegar al otro lado.'
  ],
  geometria: [
    'Cuenta los lados siguiendo el borde con el dedo.',
    'El ángulo recto es el de la esquina de un folio.'
  ],
  espacio: [
    'Primero la columna, después la fila. La fila 1 es la de abajo.',
    'Recorre la columna con un dedo y la fila con el otro.'
  ]
};

/* ACIERTO — 4 categorías × EXACTAMENTE 21 = 84 */

/* A) PROCEDIMIENTO — nombran lo que ha hecho. Las 21 llevan {proc}. */
CB.datos.MENSAJES.acierto_A = [
  '¡Muy bien! {proc}',
  '¡Eso es! {proc}',
  '¡Bloque picado! {proc}',
  '¡Exacto! {proc}',
  '¡Justo así! {proc}',
  '¡Toma gema! {proc}',
  '¡Perfecto! {proc}',
  '¡Ahí está! {proc}',
  '¡Bien hecho! {proc}',
  '¡Lo has clavado! {proc}',
  '¡Adelante! {proc}',
  '¡Se abre la veta! {proc}',
  '¡Correcto! {proc}',
  '¡Buen pico! {proc}',
  '¡Así se cava! {proc}',
  '¡Cae el bloque! {proc}',
  '¡Muy bien visto! {proc}',
  '¡Estupendo! {proc}',
  '¡Bloque limpio! {proc}',
  '¡Buen trabajo! {proc}',
  '¡La cantera se ilumina! {proc}'
];

/* B) ESFUERZO — elogian el proceso de intentarlo, nunca el rasgo. */
CB.datos.MENSAJES.acierto_B = [
  '¡Lo has vuelto a intentar y ha salido!',
  '¡No lo has dejado y ha caído el bloque!',
  '¡Has seguido cavando hasta el final!',
  '¡Te lo has tomado con calma y ha funcionado!',
  '¡Has pensado antes de tocar y se nota!',
  '¡Has aguantado y lo has sacado!',
  '¡Ese ha costado y aun así ha salido!',
  '¡Has mirado con cuidado y has acertado!',
  '¡Paso a paso, y ya está!',
  '¡Has trabajado ese bloque hasta el final!',
  '¡Lo has revisado y ha valido la pena!',
  '¡Has vuelto a comprobarlo antes de responder!',
  '¡Con calma se pican mejor los bloques!',
  '¡Has insistido y la piedra ha cedido!',
  '¡Cada intento acerca, y este ha entrado!',
  '¡Has cavado despacio y has llegado!',
  '¡No te has rendido con este!',
  '¡Has tomado carrerilla y ha salido!',
  '¡Has puesto atención y se ha notado!',
  '¡Este te ha llevado tiempo y lo has conseguido!',
  '¡Has probado de otra manera y ha funcionado!'
];

/* C) SUPERACIÓN — tras la tarjeta de reparación o un concepto difícil. */
CB.datos.MENSAJES.acierto_C = [
  '¡Antes se te resistía y ahora lo tienes!',
  '¡Lo has aprendido hace un momento y ya te sale!',
  '¡Has arreglado el bloque que se te cayó!',
  '¡Lo que fallaste antes, ahora te sale!',
  '¡Esa veta se te atragantaba y la has abierto!',
  '¡Has vuelto al pozo y has salido con gema!',
  '¡Justo eso era lo que había que hacer!',
  '¡Has cogido el truco!',
  '¡Ese fallo de antes te ha servido!',
  '¡Ahora sí lo tienes!',
  '¡Has remontado ese bloque!',
  '¡Rocarr te lo enseñó y lo has usado!',
  '¡Segunda vez y bloque picado!',
  '¡Ese ya no se te escapa!',
  '¡Lo has vuelto a mirar y esta vez ha entrado!',
  '¡Has reparado la grieta sin ayuda!',
  '¡Lo difícil ya lo has pasado!',
  '¡Has dado la vuelta a ese bloque!',
  '¡Se te resistía y ya no!',
  '¡Ahora entiendes por dónde iba!',
  '¡Has salido del apuro con el pico bien puesto!'
];

/* D) DESCUBRIMIENTO — racha, mundo nuevo, veta que se ilumina. */
CB.datos.MENSAJES.acierto_D = [
  '¡Vas encadenando bloques!',
  '¡La veta se ilumina!',
  '¡Chispa gira de lo contenta que está!',
  '¡Se abre un camino nuevo en la cantera!',
  '¡Otro bloque más para la racha!',
  '¡Estás abriendo galería!',
  '¡La cantera se llena de luz!',
  '¡Ese ha sido un buen filón!',
  '¡Vas cavando hondo!',
  '¡La racha sigue viva!',
  '¡Blopi ha dado un bote!',
  '¡Ahí había cristal escondido!',
  '¡Suena el pico contra la roca buena!',
  '¡Vas dejando el túnel bien recto!',
  '¡Otra gema para el saco!',
  '¡La veta empieza a brillar!',
  '¡Has encontrado el filón!',
  '¡Se oye eco: la galería es larga!',
  '¡Vagoneto pasa cargado de gemas!',
  '¡El mapa se te queda pequeño!',
  '¡Sigue esa veta, que da gemas!'
];

/* ÁNIMO — 2 categorías × EXACTAMENTE 24 = 48 */

/* P1) MIRA OTRA VEZ — señalan DÓNDE mirar. Las 24 llevan {pista}. */
CB.datos.MENSAJES.animo_P1 = [
  '¡Casi! {pista}',
  '¡Estaba cerca! {pista}',
  '¡Este se ha escapado! {pista}',
  '¡No pasa nada! {pista}',
  '¡Vamos a verlo otra vez! {pista}',
  '¡Buen intento! {pista}',
  '¡Le has dado casi! {pista}',
  '¡Ese bloque es duro! {pista}',
  '¡Un momento y lo tienes! {pista}',
  '¡Prueba otra vez! {pista}',
  '¡Estabas muy cerca! {pista}',
  '¡Nos falta poco! {pista}',
  '¡A ver por dónde se rompe! {pista}',
  '¡Con calma! {pista}',
  '¡Otra pasada y cae! {pista}',
  '¡Este se resiste! {pista}',
  '¡Falta un golpe de pico! {pista}',
  '¡Sin prisa! {pista}',
  '¡Mira por aquí! {pista}',
  '¡Vamos paso a paso! {pista}',
  '¡Un vistazo más! {pista}',
  '¡Casi lo tienes! {pista}',
  '¡No se ha roto todavía! {pista}',
  '¡Vuelve a intentarlo! {pista}'
];

/* P2) EL ERROR ENSEÑA — normalizan el fallo. Criterio 7.2 del RD, literal:
   «valorando el error como una oportunidad de aprendizaje». */
CB.datos.MENSAJES.animo_P2 = [
  'Equivocarse es parte de cavar. Seguimos.',
  'Hasta los mineros expertos fallan muchos golpes. Sigue.',
  'Este bloque no ha caído. El siguiente puede.',
  'Nadie pica una veta a la primera. Adelante.',
  'Rocarr también falla, y mira lo mayor que es.',
  'De los bloques que no caen se aprende el truco.',
  'Aquí no se pierde nada por probar.',
  'Ese fallo te dice por dónde seguir cavando.',
  'Ha fallado el golpe, no quien lo da.',
  'Vamos otra vez, que hay galería de sobra.',
  'Todo el mundo tropieza con esa piedra.',
  'Ya sabes una manera que no funciona. Eso es un avance.',
  'Sigue con el pico en la mano.',
  'Este bloque necesita más de un golpe.',
  'Con tranquilidad, que la cantera no se acaba.',
  'Un fallo no apaga ninguna luz por sí solo.',
  'Lo importante es volver a levantar el pico.',
  'Esa veta se abre poco a poco.',
  'Aquí se viene a aprender, no a acertar siempre.',
  'El siguiente bloque puede ser el bueno.',
  'Los fallos dejan marcas que enseñan el camino.',
  'Nada roto: solo un bloque que sigue ahí.',
  'Se aprende cavando, y estás cavando.',
  'Este ha salido torcido. Enderezamos y seguimos.'
];

/* Listas planas y su contrato de tamaño */
CB.datos.MENSAJES.CATEGORIAS_ACIERTO = ['A', 'B', 'C', 'D'];
CB.datos.MENSAJES.CATEGORIAS_ANIMO   = ['P1', 'P2'];

CB.datos.MENSAJES.acierto = []
  .concat(CB.datos.MENSAJES.acierto_A)
  .concat(CB.datos.MENSAJES.acierto_B)
  .concat(CB.datos.MENSAJES.acierto_C)
  .concat(CB.datos.MENSAJES.acierto_D);

CB.datos.MENSAJES.animo = []
  .concat(CB.datos.MENSAJES.animo_P1)
  .concat(CB.datos.MENSAJES.animo_P2);

/* GRITOS: lo que va escrito en la cinta */
CB.datos.MENSAJES.GRITOS = {
  acierto: [
    '¡Toma!', '¡Eso es!', '¡Ahí está!', '¡Bloque!', '¡Clavado!', '¡Se abre!',
    '¡Justo!', '¡Muy bien!', '¡Cae!', '¡Exacto!', '¡Buen pico!', '¡Adelante!',
    '¡Limpio!', '¡Así se cava!', '¡Perfecto!', '¡Sigue!', '¡Correcto!',
    '¡Bien visto!', '¡Vamos!', '¡Otra veta!', '¡Chispa!', '¡Buen golpe!',
    '¡Ya está!', '¡Cristal!'
  ]
};

/* Listas negras: viven aquí para que casos-mensajes.js y casos-motes las
   compartan sin duplicar el criterio en dos sitios. */
CB.datos.MENSAJES.NEGRA_PERSONA = [
  'listo', 'lista', 'inteligente', 'genio', 'crack', 'campeon', 'campeona',
  'maquina', 'fenomeno', 'eres el mejor', 'que listo', 'que lista', 'listillo',
  'sabio', 'sabia'
];

CB.datos.MENSAJES.NEGRA_REGISTRO = [
  'wow', 'cool', 'top', 'super', 'campeoncito', 'mi nino', 'cielo', 'carino',
  'chaval', 'sos ', 'tenes ', 'podes ', 'ahorita', 'platicar'
];
