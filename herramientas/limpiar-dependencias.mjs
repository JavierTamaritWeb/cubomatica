import { rmSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const raizModulos = resolve('node_modules');

function leerArbol() {
  const resultado = spawnSync(npm, ['ls', '--all', '--json'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024
  });
  if (resultado.error) throw resultado.error;
  return JSON.parse(resultado.stdout);
}

function encontrarSobrantes(dependencias, directorio, salida) {
  if (!dependencias) return;
  Object.keys(dependencias).forEach((nombre) => {
    const dependencia = dependencias[nombre];
    const ruta = join(directorio, nombre);
    if (dependencia.extraneous) salida.push(ruta);
    encontrarSobrantes(dependencia.dependencies, join(ruta, 'node_modules'), salida);
  });
}

let arbol;
try {
  arbol = leerArbol();
} catch (error) {
  console.error('No se pudo inspeccionar node_modules:', error.message);
  process.exit(1);
}

const sobrantes = [];
encontrarSobrantes(arbol.dependencies, raizModulos, sobrantes);

/* Si sobra un padre no hace falta borrar además sus hijos. */
const objetivos = sobrantes.filter((ruta) => !sobrantes.some((padre) =>
  padre !== ruta && ruta.startsWith(padre + sep)));

objetivos.forEach((ruta) => {
  const segura = resolve(ruta);
  if (!segura.startsWith(raizModulos + sep)) {
    throw new Error('Ruta de dependencia fuera de node_modules: ' + segura);
  }
  rmSync(segura, { recursive: true, force: true });
  console.log('Eliminada dependencia ajena al lockfile:', segura.slice(raizModulos.length + 1));
});

let restante;
try {
  restante = leerArbol().problems || [];
} catch (error) {
  console.error('No se pudo verificar la limpieza:', error.message);
  process.exit(1);
}

if (restante.length) {
  restante.forEach((problema) => console.error('  - ' + problema));
  process.exit(1);
}

console.log(objetivos.length
  ? 'Dependencias sobrantes eliminadas: ' + objetivos.length + '.'
  : 'Dependencias: no había paquetes sobrantes.');
