/* stylelint.config.mjs — la gramática de la hoja de estilo, vigilada */

/* BEM, en español y en kebab-case: bloque luces, panel-bloque, btn-bloque bloque__elemento luces__luz, reloj__arena bloque--modificador pantalla--juego bloque__elemento--mod reloj__cifra--late Un solo nivel de `__`, porque un `a__b__c`… */
const BEM = '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$';

export default {
  extends: 'stylelint-config-standard-scss',
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    /* La gramática */
    'selector-class-pattern': [BEM, {
      message: (s) => `«${s}» no es BEM: bloque, bloque__elemento, bloque--modificador (kebab-case, un solo __)`,
      resolveNestedSelectors: true
    }],
    /* Estilar por id ata el estilo a que ese nodo sea único y se llame así, y
       solo se vence con otro id. Eran veinte; son cero desde 1.7.0. */
    'selector-max-id': 0,
    /* La cascada de este proyecto vive en el orden de los diez parciales, no en
       selectores largos. Tres compuestos dan para `:root.sin-movimiento .x`. */
    'selector-max-compound-selectors': 3,
    'max-nesting-depth': [2, { ignoreAtRules: ['media', 'supports', 'each', 'for', 'if', 'else', 'include'] }],
    'shorthand-property-no-redundant-values': true,

    /* Apagadas, y por qué */

    /* LA CASCADA ES CARGA ÚTIL. `_biomas.scss` gana a `_pantallas.scss`
       por venir después, y está documentado con seis líneas de comentario.
       Esta regla pediría reordenar justo eso. */
    'no-descending-specificity': null,

    'media-feature-range-notation': null,
    'selector-not-notation': null,

    /* `clip: rect(0 0 0 0)` está «obsoleta» y es la receta de ocultación visual
       que entienden todos los lectores de pantalla, incluidos los viejos.
       `clip-path` sola deja fuera casos que aquí son obligación legal. */
    'property-no-deprecated': null,
    'property-no-vendor-prefix': null,

    /* ESTILO DE LA CASA, deliberado y consistente en todas las hojas: una regla corta cabe en una línea, los colores se escriben enteros en `_variables.scss` —el único fichero que puede escribirlos— y las líneas en blanco las decide quien… */
    'declaration-block-single-line-max-declarations': null,
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'declaration-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'scss/dollar-variable-empty-line-before': null,
    'color-hex-length': null,
    'value-keyword-case': null,
    'alpha-value-notation': null,
    'color-function-notation': null,
    'color-function-alias-notation': null
  }
};
