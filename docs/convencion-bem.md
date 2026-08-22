> **Documentación interna. No se distribuye con el juego.** Vive en `docs/`, que
> la auditoría excluye del barrido de marca y del paquete que abre un profesor.

# La gramática de las clases (BEM, en español)

Este documento existe porque hasta 1.22.0 la nomenclatura era **disciplina**: BEM
se aplicaba donde alguien se acordaba. Convivían `luces` y `luz`,
`pasos-reparacion` y `paso-reparacion`, y `zona-superior` —que es una región de
`zona-juego`— tenía nombre de bloque. Nadie podía saber, mirando un nombre, si
era un bloque o el hijo de otra cosa.

Las tres reglas duras del estilo voxel dejaron de ser disciplina el día que
`bisel()` y `paso()` se quedaron sin parámetro donde meter un desenfoque o una
curva: no es que esté prohibido, es que no se puede. Esto hace lo mismo con los
nombres, en la medida en que una herramienta puede: **la forma** la comprueba
`stylelint.config.mjs`; **el sentido** —qué es bloque y qué es elemento— lo
decide una persona, y por eso está escrito aquí.

---

## Las nueve reglas

### R1 · Un bloque es un sustantivo en kebab-case

El guion forma parte del nombre y **no** significa jerarquía:

```
.btn-bloque      .panel-bloque      .tarjeta-mundo      .barra-herramientas
```

Un bloque tiene sentido por sí solo y se puede llevar a otra pantalla sin
cambiarle una línea.

### R2 · Todo hijo que no tiene sentido fuera de su bloque es `bloque__elemento`

Un solo nivel de `__`. `a__b__c` describe un árbol, y un árbol no es un
componente: si aparece, es que falta un bloque.

```
.luces__luz          (antes .luz)
.zona-juego__alta    (antes .zona-superior)
.reparacion__paso    (antes .paso-reparacion)
```

**Elemento huérfano no existe.** Había uno: `.pieza__cifra`, sin ningún bloque
`.pieza` en toda la hoja. Los bloques reales eran `.moneda` y `.billete`, que son
la misma pieza con otra foto: ahora son `.pieza--moneda` y `.pieza--billete`.

### R3 · El modificador nunca va solo

`bloque--mod` y `bloque__elemento--mod` siempre acompañados de su base en el
marcado:

```html
<span class="luces__luz luces__luz--recien-encendida">
<p class="texto texto--menor">
```

Una clase que empieza por `--` en el HTML es un error, no un atajo.

### R4 · Cero descendencia entre bloques

Un bloque **no cambia por dónde está**. Esto estaba en siete selectores:

```scss
/* antes */
.panel-bloque .texto-menor,
.tarjeta-mundo .texto-menor,
.cromo .texto-menor { color: var(--texto-secundario); }
```

El bloque `texto` no puede saber quién lo contiene. Lo que sí puede es **pedir un
color y aceptar el que le den**: el contenedor declara la variable, el bloque la
consume con un valor por defecto.

```scss
/* ahora */
.panel-bloque { --texto-sec: var(--texto-secundario); }
.texto--menor  { color: var(--texto-sec, var(--texto-sec-claro)); }
```

Es mejor que la cadena de descendencia por tres motivos: funciona con
contenedores que aún no existen, no depende del orden de la cascada, y
`casos-contraste.js` sigue midiéndolo igual porque mide valores calculados.

**Excepciones, declaradas y cerradas** (las mismas que conoce el guardián E105):

| Excepción | Por qué |
|---|---|
| `:root.sin-movimiento .x`, `:root.letra-grande`… | Son estados globales (R8), no bloques |
| `.pantalla > *:not(.cielo):not(.cinta):not(.cartel)` | Garantiza que todo hijo directo entra en el flujo. Convertirlo en clase obligaría a marcar cada nodo nuevo a mano, que es el fallo que evita (E47) |
| `.pantalla--documento :is(h1,h2,h3)`, `.adulto__tabla th` | Tipografía de documento: estila contenido, no acopla bloques |

### R5 · Cero estilado por etiqueta dentro de un bloque

```scss
.armadura-jefe > b     →  .jefe__bloque
.galeria-avance > b    →  .galeria-avance__bloque
.manojo-decena > b     →  .manojo-decena__palo
```

Una etiqueta no es un nombre: `b` puede cambiar por accesibilidad o por
maquetación y llevarse el estilo por delante.

### R6 · Las utilidades son bloques, y en el marcado van con su modificador

```
.texto .texto--menor      .texto .texto--lectura
.fila  .fila--centro      .solo-lectores      .imprimible      .no-imprimir
```

`.solo-lectores` o `.imprimible` son bloques de una sola pieza y se quedan como
están: son nombres completos, no modificadores sueltos.

### R7 · Los estados globales viven en `:root`, y son cuatro

`letra-grande`, `modo-proyeccion`, `alto-contraste`, `sin-movimiento`. Los
enciende `js/06-a11y.js` y ninguno se aplica a otro nodo. La lista es cerrada: un
quinto estado global es una decisión, no un detalle de implementación.

### R8 · Los estados de instancia se quedan en `[data-*]`

```
.veta[data-estado]   .luces__luz[data-estado]   .semaforo[data-nivel]
.reparacion__paso[data-hecho]   .pieza[data-valor]
```

Son 45 reglas. **No se convierten en clases modificadoras**, y la razón no es la
pereza: esos atributos los escribe el JS, los leen las pruebas y varios forman
parte del árbol de accesibilidad. Pasarlos a clases multiplicaría el `classList`
de cada nodo sin ganar una sola comprobación.

Lo que sí obliga la convención: el atributo **acompaña** a una clase BEM, nunca
la sustituye. `[data-roto]` a secas no estila nada.

### R9 · No se guarda CSS muerto

Si una clase deja de usarse se borra, no se comenta. Lo denuncia
`herramientas/cruzar-clases.mjs` en su dirección 1 y el historial de git lo
conserva entero.

---

## Lo que comprueba cada herramienta

| Herramienta | Qué ve | Qué NO ve |
|---|---|---|
| `npm run estilo` (stylelint) | La **forma**: kebab-case, un solo `__`, cero `#id`, anidamiento ≤ 2, ≤ 3 compuestos | Si `luz` debería llamarse `luces__luz`. Eso es sentido, no forma |
| `herramientas/cruzar-clases.mjs` | Que toda clase usada exista y toda clase existente se use, cruzando CSS ↔ HTML ↔ JS | Los selectores de atributo, y las familias construidas por concatenación (`bioma--`, `cinta--`), que quedan amnistiadas por prefijo |
| Bloque 9 de `auditar.mjs` (E104) | Que stylelint corre y está verde | — |
| Bloque 9b (E105) | Descendencia entre bloques en el CSS compilado, contra la lista blanca de R4 | — |
| `herramientas/retrato-pantallas.mjs` | Que **no ha cambiado un píxel** en 18 pantallas × 3 anchos | Nada de lo que no se ve: `@media print`, estados sin foto |
| `herramientas/volcado-css.mjs` | Que no ha cambiado **una declaración**, aplicando el mapa de renombrados | Si el cambio era intencionado: eso lo dice quien lo hizo |

---

## Cómo se renombra una clase sin romper nada

El orden importa, y no es opinable:

1. **Antes de tocar nada**: `npm run build`, luego la línea base de
   `retrato-pantallas.mjs` y la de `volcado-css.mjs`.
2. La entrada va a `pruebas/mapa-bem-2.json` **con su motivo**. Dentro de seis
   meses el motivo es lo único que queda.
3. La sustitución es **en dos fases con centinelas**. Aplicar `{veta → veta}` y
   `{veta-icono → veta__icono}` en el orden equivocado produce
   `.veta__icono-icono`, y lo produce igual en el CSS y en el JS: el cruce de
   clases lo daría por bueno. Es el único fallo que la red no ve.
4. En JS **solo se tocan posiciones de clase** —2.º argumento de `CB.ui.crear` y
   `CB.ui.boton`, `.className`, `classList.*`, `setAttribute('class')` y los
   selectores de `querySelector`/`closest`—. Nunca texto plano: `valor`,
   `etiqueta`, `dato`, `grupo`, `ico`, `entra`, `viva`, `gira` y `operacion` son
   palabras corrientes y propiedades de objeto.
5. **A mano, porque ningún analizador las ve**: la lista `$animados` de
   `_05-animaciones.scss` (son selectores en texto), las animaciones de criatura
   de `js/30-ui.js` (salen de un array y de una tabla de consulta), el
   `'btn-bloque '` que `CB.ui.boton` antepone siempre, y las familias que se
   construyen concatenando (`bioma--`, `cielo--`, `cinta--`).
6. Se reconstruye y se comprueban las seis cosas de la tabla de arriba. Un
   retrato distinto detiene la entrega hasta explicarlo.
