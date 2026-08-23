#!/usr/bin/env node
/* retrato-pantallas.mjs — la foto de las 18 pantallas, para renombrar sin miedo */

import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PUERTO = 9337;
const ANCHOS = [320, 768, 1200];
const ALTO = 800;

const arg = (nombre, porDefecto) => {
  const i = process.argv.indexOf(nombre);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : porDefecto;
};
const COMPARAR = process.argv.includes('--comparar');
const DIR = arg('--dir', join(tmpdir(), 'cubomatica-retratos'));
const URL_JUEGO = arg('--url', 'http://localhost:8081/dist/index.html');
const HUELLAS = join(DIR, 'huellas.json');

const dormir = (ms) => new Promise((resolver) => {
  setTimeout(resolver, ms);
});

/* El guion que se evalúa DENTRO de la página */
const PREPARAR = `(async function () {
  const esperar = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  document.documentElement.classList.add('sin-movimiento');
  if (CB.audio) CB.audio.silenciar(true);
  const p = CB.almacen.perfilNuevo('p-retrato', 'Topo Cavador', 0, '2026-01-01', null);
  p.calibrado = true;
  p.trimestreDeducido = 3;
  p.ajustes.modoTiempo = 'facil';
  CB.perfil = p;
  CB.almacen.guardarPerfil(p);
  CB.adulto.desbloqueado = true;
  await esperar(60);
  return CB.pantallas.IDS.join(',');
})()`;

/* Cada pantalla se deja en su estado de verdad: entrar a pelo en la partida
   pinta una zona de juego vacía, y una foto de la nada no prueba nada. */
const guionDe = (id) => `(async function () {
  const esperar = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  const id = ${JSON.stringify(id)};
  try {
    if (id === 'p-partida') { CB.partida.iniciar({ mundoId: 'M1' }); await esperar(900); }
    else if (id === 'p-jefe') { CB.partida.iniciar({ mundoId: 'M1' }); await esperar(400); CB.jefes.iniciar('M1'); await esperar(400); }
    else if (id === 'p-descanso') { CB.partida.iniciar({ mundoId: 'M1' }); await esperar(400); CB.partida.microDescanso(); await esperar(300); }
    else if (id === 'p-fin') { CB.partida.iniciar({ mundoId: 'M1' }); await esperar(300); CB.partida.finalizar('fin'); await esperar(700); }
    else if (id === 'p-informe') { CB.adulto.imprimirInforme(CB.perfil.id); await esperar(400); }
    else if (id === 'p-error') { CB.pantallas.fallo(new Error('retrato')); await esperar(200); }
    else { CB.pantallas.ir(id); await esperar(300); }
  } catch (e) {
    return 'ERROR: ' + e.message;
  }
  /* El foco pinta un contorno de 4 px: en una foto eso es ruido que depende de
     por dónde se pasó antes, no del estilo. */
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  await esperar(120);
  return CB.pantallas.actual;
})()`;

/* Conductor CDP mínimo */
function conectar(ws) {
  const sock = new WebSocket(ws);
  let id = 0;
  const pend = new Map();
  const listo = new Promise((r) => { sock.onopen = r; });
  sock.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
  };
  return {
    listo,
    enviar(metodo, params, sessionId) {
      const mid = ++id;
      return new Promise((res) => {
        pend.set(mid, res);
        sock.send(JSON.stringify({ id: mid, method: metodo, params: params || {}, sessionId }));
      });
    },
    cerrar() { sock.close(); }
  };
}

async function esperarDevTools() {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + PUERTO + '/json/version');
      if (r.ok) return (await r.json()).webSocketDebuggerUrl;
    } catch (e) { }
    await dormir(250);
  }
  throw new Error('DevTools no respondió en el puerto ' + PUERTO);
}

mkdirSync(DIR, { recursive: true });
/* Perfil de Chrome nuevo en cada pasada: uno reutilizado conserva el service
   worker ya registrado y su caché, que es la misma trampa de arriba por otra
   puerta. */
rmSync(join(DIR, 'perfil-chrome'), { recursive: true, force: true });

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--mute-audio',
  '--hide-scrollbars', '--force-device-scale-factor=1',
  '--remote-debugging-port=' + PUERTO,
  '--user-data-dir=' + join(DIR, 'perfil-chrome'),
  'about:blank'
], { stdio: 'ignore' });

const huellas = {};
const incidencias = [];

try {
  const c = conectar(await esperarDevTools());
  await c.listo;

  for (const ancho of ANCHOS) {
    for (let i = 0; ; i++) {
      /* UNA PESTAÑA POR FOTO. Es más lento y es lo correcto: el estado que deja
         una pantalla —una partida a medias, un jefe vivo— se cuela en la
         siguiente y la foto deja de ser de lo que dice ser. */
      const { result: { targetId } } = await c.enviar('Target.createTarget', { url: 'about:blank' });
      const { result: { sessionId } } = await c.enviar('Target.attachToTarget', { targetId, flatten: true });

      /* Que la herramienta VE los cambios sí está demostrado: con una regla de más al final del minificado, `--comparar` se pone rojo y nombra las quince fotos de las cinco pantallas que llevan ese bloque. */
      await c.enviar('Network.enable', {}, sessionId);
      await c.enviar('Network.setBypassServiceWorker', { bypass: true }, sessionId);
      await c.enviar('Network.setCacheDisabled', { cacheDisabled: true }, sessionId);
      await c.enviar('Emulation.setDeviceMetricsOverride',
        { width: ancho, height: ALTO, deviceScaleFactor: 1, mobile: false }, sessionId);
      await c.enviar('Page.navigate', { url: URL_JUEGO }, sessionId);
      await dormir(1500);

      const prep = await c.enviar('Runtime.evaluate',
        { expression: PREPARAR, awaitPromise: true, returnByValue: true }, sessionId);
      const ids = String(prep.result?.result?.value || '').split(',').filter(Boolean);
      if (!ids.length) throw new Error('no se han podido leer CB.pantallas.IDS');
      if (i >= ids.length) { await c.enviar('Target.closeTarget', { targetId }); break; }
      const id = ids[i];

      const r = await c.enviar('Runtime.evaluate',
        { expression: guionDe(id), awaitPromise: true, returnByValue: true, timeout: 30000 }, sessionId);
      const aterrizo = r.result?.result?.value;
      if (aterrizo !== id) incidencias.push(`${id}@${ancho}: acabó en ${aterrizo}`);

      const foto = await c.enviar('Page.captureScreenshot', { format: 'png' }, sessionId);
      const datos = foto.result?.data;
      if (!datos) { incidencias.push(`${id}@${ancho}: sin imagen`); }
      else {
        const buf = Buffer.from(datos, 'base64');
        const clave = `${id}@${ancho}`;
        huellas[clave] = createHash('sha256').update(buf).digest('hex');
        writeFileSync(join(DIR, `${id}-${ancho}.png`), buf);
      }
      await c.enviar('Target.closeTarget', { targetId });
    }
  }
  c.cerrar();
} finally {
  chrome.kill('SIGKILL');
}

const nombres = Object.keys(huellas).sort();
if (!COMPARAR) {
  writeFileSync(HUELLAS, JSON.stringify(huellas, null, 1) + '\n');
  console.log(`RETRATOS  ·  ${nombres.length} imágenes en ${DIR}`);
  console.log(`  huellas guardadas en ${HUELLAS}`);
  if (incidencias.length) console.log('  avisos:\n   ' + incidencias.join('\n   '));
} else {
  if (!existsSync(HUELLAS)) {
    console.log('RETRATOS  ·  ROJO: no hay línea base. Ejecuta el guion sin --comparar antes de tocar nada.');
    process.exit(1);
  }
  const base = JSON.parse(readFileSync(HUELLAS, 'utf8'));
  const distintas = nombres.filter((k) => base[k] !== huellas[k]);
  const perdidas = Object.keys(base).filter((k) => !(k in huellas));
  const nuevas = nombres.filter((k) => !(k in base));
  if (distintas.length || perdidas.length || nuevas.length) {
    console.log('RETRATOS  ·  ROJO');
    if (distintas.length) console.log('  cambian: ' + distintas.join(', '));
    if (perdidas.length) console.log('  faltan:  ' + perdidas.join(', '));
    if (nuevas.length) console.log('  sobran:  ' + nuevas.join(', '));
    console.log('  las imágenes están en ' + DIR + ' para mirarlas una al lado de otra');
    process.exit(1);
  }
  console.log(`RETRATOS  ·  ${nombres.length} imágenes idénticas a la línea base`);
  if (incidencias.length) console.log('  avisos:\n   ' + incidencias.join('\n   '));
}
