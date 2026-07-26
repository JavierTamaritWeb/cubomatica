#!/bin/bash
# ============================================================================
# auditar.sh — envoltorio. La auditoría de verdad es pruebas/auditar.mjs.
# ----------------------------------------------------------------------------
# Hasta 1.6.0 esto eran 400 líneas de shell y auditar.bat era su espejo para
# Windows. El espejo YA HABÍA DIVERGIDO: cubría cinco de los ocho bloques —le
# faltaban la versión, la documentación y el peso— porque dependía de python3 y
# de perl, que en Windows no vienen de serie.
#
# Mantener dos implementaciones de la misma lógica es exactamente el fallo que
# esta auditoría persigue en el resto del proyecto, aplicado a sí misma. Ahora
# hay una, en Node, sin una sola dependencia, y estos dos ficheros solo la
# llaman.
# ============================================================================

cd "$(dirname "$0")/.." || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo "Hace falta Node 20 o superior para auditar. Instálalo desde nodejs.org."
  echo "(Para JUGAR no hace falta nada: abre dist/index.html con doble clic.)"
  exit 2
fi

exec node pruebas/auditar.mjs "$@"
