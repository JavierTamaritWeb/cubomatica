@echo off
REM ===========================================================================
REM auditar.bat - envoltorio. La auditoria de verdad es pruebas\auditar.mjs.
REM ---------------------------------------------------------------------------
REM Este fichero era un espejo del .sh y cubria CINCO de los ocho bloques: le
REM faltaban la version, la documentacion y el peso, porque dependia de python3
REM y de perl. Windows recupera ahora los tres que le faltaban, y ademas deja de
REM existir la posibilidad de que los dos vuelvan a separarse.
REM ===========================================================================

cd /d "%~dp0.."

where node >nul 2>nul
if errorlevel 1 (
  echo Hace falta Node 20 o superior para auditar. Instalalo desde nodejs.org.
  echo Para JUGAR no hace falta nada: abre dist\index.html con doble clic.
  exit /b 2
)

node pruebas\auditar.mjs %*
