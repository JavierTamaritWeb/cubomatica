import { spawnSync } from 'node:child_process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const resultado = spawnSync(npm, ['ls', '--all', '--json'], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024
});

if (resultado.error) {
  console.error('No se pudo inspeccionar node_modules:', resultado.error.message);
  process.exit(1);
}

let arbol;
try {
  arbol = JSON.parse(resultado.stdout);
} catch (error) {
  console.error('npm ls no devolvió JSON válido:', error.message);
  process.exit(1);
}

const problemas = arbol.problems || [];
if (problemas.length) {
  console.error('node_modules no coincide con package-lock.json:');
  problemas.forEach((problema) => console.error('  - ' + problema));
  console.error('Ejecuta npm run dependencias:limpiar.');
  process.exit(1);
}

console.log('Dependencias instaladas: árbol limpio y reproducible.');
