#!/usr/bin/env python3
"""Retira comentarios de JavaScript antes de auditar.

Por que existe: los greps de frontera de PLAN §14.4 buscan `document.`,
`Math.random` y `toISOString`. Esas mismas cadenas aparecen, inevitablemente, en
los COMENTARIOS que documentan por que estan prohibidas. Sin este filtro la
auditoria se pone en rojo contra codigo perfectamente correcto, y la reaccion
tipica ante un test que grita en falso es desactivarlo. Ese era, literalmente,
el defecto que el plan reprochaba a su propia version anterior.

Uso:  python3 sin-comentarios.py fichero.js [fichero2.js ...]
Salida: las lineas de codigo, prefijadas con «ruta:numero:» para que grep -n
        siga dando una referencia util.
"""

import sys


def limpiar(texto):
    """Elimina // y /* */ respetando cadenas y expresiones regulares."""
    salida = []
    i, n = 0, len(texto)
    en_cadena = None          # ', " o `
    en_linea = False
    en_bloque = False
    escapado = False

    while i < n:
        c = texto[i]
        siguiente = texto[i + 1] if i + 1 < n else ''

        if en_linea:
            if c == '\n':
                en_linea = False
                salida.append(c)
            i += 1
            continue

        if en_bloque:
            if c == '*' and siguiente == '/':
                en_bloque = False
                i += 2
                continue
            # se conservan los saltos para no descuadrar los numeros de linea
            salida.append('\n' if c == '\n' else ' ')
            i += 1
            continue

        if en_cadena:
            salida.append(c)
            if escapado:
                escapado = False
            elif c == '\\':
                escapado = True
            elif c == en_cadena:
                en_cadena = None
            i += 1
            continue

        if c in ('"', "'", '`'):
            en_cadena = c
            salida.append(c)
            i += 1
            continue

        if c == '/' and siguiente == '/':
            en_linea = True
            i += 2
            continue

        if c == '/' and siguiente == '*':
            en_bloque = True
            i += 2
            continue

        salida.append(c)
        i += 1

    return ''.join(salida)


def main():
    if len(sys.argv) < 2:
        return 0
    for ruta in sys.argv[1:]:
        try:
            with open(ruta, encoding='utf-8') as f:
                contenido = f.read()
        except OSError:
            continue
        for numero, linea in enumerate(limpiar(contenido).split('\n'), 1):
            if linea.strip():
                print('%s:%d:%s' % (ruta, numero, linea))
    return 0


if __name__ == '__main__':
    sys.exit(main())
