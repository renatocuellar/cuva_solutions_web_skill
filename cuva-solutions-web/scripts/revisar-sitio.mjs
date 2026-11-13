#!/usr/bin/env node
// revisar-sitio.mjs: revisa un sitio estático con Chrome sin ventana y deja capturas y un reporte.
//
// Uso:
//   node scripts/revisar-sitio.mjs <ruta-o-url> <carpeta-salida> [opciones]
//
// Ejemplos:
//   node scripts/revisar-sitio.mjs index.html revision
//   node scripts/revisar-sitio.mjs . revision                  (una carpeta: abre su index.html)
//   node scripts/revisar-sitio.mjs direccion-de-arte.html revision-muestra --firma
//   node scripts/revisar-sitio.mjs https://citas.tunegocio.com revision-en-vivo
//
// Opciones:
//   --firma         guarda además cuadros de la primera pantalla a 0.3, 0.8, 1.4, 2.2, 3.2 y 4.5 s
//                   para revisar la animación firma a media animación
//   --sin-tramos    no guarda la página por tramos (solo primera pantalla y completa)
//   --solo-celular  solo revisa 375 x 812
//
// Qué hace en celular (375 x 812, táctil) y en escritorio (1440 x 900):
//   1. Espera a que termine la entrada (o hasta 9 s si una capa fija sigue tapando la página)
//      y captura la primera pantalla.
//   2. Baja por toda la página para disparar las animaciones de entrada.
//   3. Captura la página completa sin que se repita aunque mida más de 8,000 px, y por tramos
//      de dos pantallas para poder leerla de cerca.
//   4. Mide desbordes de lado, errores de consola, archivos que no cargaron, imágenes rotas,
//      fuentes que fallaron y contenido que se quedó oculto (transparente, invisible o atorado
//      debajo de su máscara).
//   5. Repite en celular con "Reducir movimiento" y sin JavaScript: primera pantalla y contenido oculto.
// Escribe resultado.json y las capturas en la carpeta de salida, y un resumen en español en la consola.
//
// Requisitos: Node 18 o más y Google Chrome (si no lo encuentra, usa Microsoft Edge o Chromium).
// No instala nada con npm. Si Chrome está en otro lugar, indícalo con la variable CHROME_PATH:
//   Mac o Linux:          CHROME_PATH="/ruta/a/chrome" node scripts/revisar-sitio.mjs index.html revision
//   Windows (PowerShell): $env:CHROME_PATH="C:\ruta\chrome.exe"; node scripts\revisar-sitio.mjs index.html revision
// Si la conexión por tubería falla en tu sistema, el script prueba solo por puerto (necesita Node 22 o más);
// para forzarlo: REVISAR_POR_PUERTO=1 node scripts/revisar-sitio.mjs ...
// El perfil de Chrome se crea en la carpeta temporal del sistema y se borra al terminar.

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { platform, tmpdir } from 'node:os';
import { basename, delimiter, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const AYUDA = `Uso: node scripts/revisar-sitio.mjs <ruta-o-url> <carpeta-salida> [--firma] [--sin-tramos] [--solo-celular]
Ejemplo: node scripts/revisar-sitio.mjs index.html revision`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const miles = (n) => Math.round(n).toLocaleString('es-MX');

function salir(mensaje) {
  console.error(`\nNo se pudo hacer la revisión.\n${mensaje}\n`);
  process.exit(1);
}

// ---------- Requisitos y argumentos ----------

const versionNode = Number(process.versions.node.split('.')[0]);
if (versionNode < 18) {
  salir(`Este script necesita Node 18 o más y tienes Node ${process.versions.node}.\nDescarga la versión LTS en nodejs.org, instálala y vuelve a correrlo.`);
}

const args = process.argv.slice(2);
const banderas = new Set(args.filter((a) => a.startsWith('--')));
const [entrada, carpetaSalida] = args.filter((a) => !a.startsWith('--'));
if (banderas.has('--ayuda') || banderas.has('--help')) { console.log(AYUDA); process.exit(0); }
if (!entrada) { console.error(AYUDA); process.exit(1); }
const conocidas = new Set(['--firma', '--sin-tramos', '--solo-celular']);
for (const b of banderas) if (!conocidas.has(b)) salir(`No conozco la opción ${b}.\n${AYUDA}`);

function aDireccion(texto) {
  if (/^(https?|file):/i.test(texto)) return texto;
  let ruta = resolve(texto);
  if (!existsSync(ruta)) salir(`No encuentro "${texto}".\nDebe ser el index.html del sitio, la carpeta que lo contiene o una dirección https://.`);
  if (statSync(ruta).isDirectory()) {
    ruta = join(ruta, 'index.html');
    if (!existsSync(ruta)) salir(`La carpeta no tiene index.html: ${ruta}`);
  }
  return pathToFileURL(ruta).href;
}

const URL_SITIO = aDireccion(entrada);
const SALIDA = resolve(carpetaSalida || 'revision');
mkdirSync(SALIDA, { recursive: true });

// ---------- Buscar Chrome ----------

function buscarChrome() {
  const propia = process.env.CHROME_PATH;
  if (propia) {
    if (existsSync(propia)) return propia;
    salir(`La variable CHROME_PATH dice "${propia}", pero ahí no hay ningún archivo.\nCorrige la ruta o quita la variable para que el script busque Chrome solo.`);
  }
  const so = platform();
  const candidatos = [];
  if (so === 'darwin') {
    for (const dir of ['/Applications', join(process.env.HOME || '', 'Applications')]) {
      candidatos.push(
        join(dir, 'Google Chrome.app/Contents/MacOS/Google Chrome'),
        join(dir, 'Chromium.app/Contents/MacOS/Chromium'),
        join(dir, 'Microsoft Edge.app/Contents/MacOS/Microsoft Edge'),
        join(dir, 'Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'),
      );
    }
  } else if (so === 'win32') {
    const raices = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA].filter(Boolean);
    for (const r of raices) candidatos.push(join(r, 'Google', 'Chrome', 'Application', 'chrome.exe'));
    for (const r of raices) candidatos.push(join(r, 'Microsoft', 'Edge', 'Application', 'msedge.exe'));
  } else {
    const nombres = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge', 'microsoft-edge-stable'];
    const carpetas = (process.env.PATH || '').split(delimiter).filter(Boolean)
      .concat(['/usr/bin', '/usr/local/bin', '/snap/bin', '/opt/google/chrome']);
    for (const n of nombres) for (const c of carpetas) candidatos.push(join(c, n));
  }
  const hallado = candidatos.find((c) => existsSync(c));
  if (hallado) return hallado;
  salir([
    'No encontré Google Chrome en esta computadora.',
    'Instálalo desde google.com/chrome y vuelve a correr el script.',
    'Si ya lo tienes en otro lugar, dile dónde está con la variable CHROME_PATH:',
    '  Mac o Linux:          CHROME_PATH="/ruta/a/chrome" node scripts/revisar-sitio.mjs index.html revision',
    '  Windows (PowerShell): $env:CHROME_PATH="C:\\ruta\\chrome.exe"; node scripts\\revisar-sitio.mjs index.html revision',
  ].join('\n'));
}

// ---------- Conexión con Chrome (protocolo DevTools) ----------

class Conexion {
  constructor(enviarTexto) {
    this.enviarTexto = enviarTexto;
    this.id = 0;
    this.pendientes = new Map();
    this.oyentes = new Set();
    this.cerrada = false;
  }
  recibir(texto) {
    let m;
    try { m = JSON.parse(texto); } catch { return; }
    if (m.id !== undefined && this.pendientes.has(m.id)) {
      const p = this.pendientes.get(m.id);
      this.pendientes.delete(m.id);
      clearTimeout(p.reloj);
      if (m.error) p.rechazar(new Error(`${p.metodo}: ${m.error.message}`));
      else p.resolver(m.result);
      return;
    }
    if (m.method) for (const fn of this.oyentes) fn(m);
  }
  enviar(metodo, params = {}, sessionId, espera = 60000) {
    if (this.cerrada) return Promise.reject(new Error('Chrome ya se cerró'));
    return new Promise((resolver, rechazar) => {
      const id = ++this.id;
      const reloj = setTimeout(() => { this.pendientes.delete(id); rechazar(new Error(`Chrome no respondió a ${metodo}`)); }, espera);
      this.pendientes.set(id, { resolver, rechazar, reloj, metodo });
      const msg = { id, method: metodo, params };
      if (sessionId) msg.sessionId = sessionId;
      try { this.enviarTexto(JSON.stringify(msg)); } catch (e) { clearTimeout(reloj); this.pendientes.delete(id); rechazar(e); }
    });
  }
  cerrar(motivo) {
    this.cerrada = true;
    for (const p of this.pendientes.values()) { clearTimeout(p.reloj); p.rechazar(new Error(motivo)); }
    this.pendientes.clear();
  }
}

function argumentosChrome(perfil) {
  const a = [
    '--headless=new', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-sync', '--mute-audio', '--allow-file-access-from-files',
    '--autoplay-policy=no-user-gesture-required', `--user-data-dir=${perfil}`,
  ];
  if (platform() === 'linux' && typeof process.getuid === 'function' && process.getuid() === 0) a.push('--no-sandbox');
  return a;
}

// Forma principal: por tubería (--remote-debugging-pipe). No necesita WebSocket ni puertos, sirve desde Node 18.
async function abrirPorTuberia(exe, perfil) {
  const proc = spawn(exe, [...argumentosChrome(perfil), '--remote-debugging-pipe', 'about:blank'],
    { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
  let registro = '';
  proc.stderr.on('data', (d) => { registro = (registro + d).slice(-3000); });
  const haciaChrome = proc.stdio[3];
  const desdeChrome = proc.stdio[4];
  haciaChrome.on('error', () => {});
  desdeChrome.on('error', () => {});
  const con = new Conexion((t) => haciaChrome.write(t + '\0'));
  let resto = '';
  desdeChrome.setEncoding('utf8');
  desdeChrome.on('data', (trozo) => {
    resto += trozo;
    let i;
    while ((i = resto.indexOf('\0')) >= 0) { const msg = resto.slice(0, i); resto = resto.slice(i + 1); con.recibir(msg); }
  });
  proc.on('exit', () => con.cerrar('Chrome se cerró'));
  proc.on('error', () => con.cerrar('Chrome no pudo abrirse'));
  try {
    const v = await con.enviar('Browser.getVersion', {}, undefined, 15000);
    return { proc, con, version: v.product, forma: 'tubería', registro: () => registro };
  } catch (e) {
    proc.kill('SIGKILL');
    throw new Error(`${e.message}. ${registro.split('\n').filter(Boolean).slice(-2).join(' ')}`);
  }
}

// Respaldo: por puerto y WebSocket (Node 22 o más trae WebSocket incluido).
async function abrirPorPuerto(exe, perfil) {
  if (typeof globalThis.WebSocket !== 'function') {
    throw new Error('Tu versión de Node no trae WebSocket. Instala Node 22 o más (versión LTS en nodejs.org) y vuelve a intentarlo.');
  }
  const proc = spawn(exe, [...argumentosChrome(perfil), '--remote-debugging-port=0', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
  let registro = '';
  proc.stderr.on('data', (d) => { registro = (registro + d).slice(-3000); });
  const archivoPuerto = join(perfil, 'DevToolsActivePort');
  let lineas = null;
  for (let i = 0; i < 80 && !lineas; i++) {
    await sleep(250);
    if (existsSync(archivoPuerto)) {
      const l = readFileSync(archivoPuerto, 'utf8').split('\n');
      if (l[0] && l[1]) lineas = l;
    }
  }
  if (!lineas) { proc.kill('SIGKILL'); throw new Error('Chrome no abrió su puerto de revisión en 20 s.'); }
  const ws = new WebSocket(`ws://127.0.0.1:${lineas[0].trim()}${lineas[1].trim()}`);
  await new Promise((ok, mal) => { ws.onopen = ok; ws.onerror = () => mal(new Error('No pude conectarme con Chrome por WebSocket.')); });
  const con = new Conexion((t) => ws.send(t));
  ws.onmessage = (e) => con.recibir(typeof e.data === 'string' ? e.data : String(e.data));
  ws.onclose = () => con.cerrar('Chrome cerró la conexión');
  proc.on('exit', () => con.cerrar('Chrome se cerró'));
  const v = await con.enviar('Browser.getVersion', {}, undefined, 15000);
  return { proc, con, version: v.product, forma: 'puerto', registro: () => registro, ws };
}

async function nuevaPestana(con) {
  const { targetId } = await con.enviar('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await con.enviar('Target.attachToTarget', { targetId, flatten: true });
  const eventos = [];
  const oyente = (m) => { if (m.sessionId === sessionId) eventos.push(m); };
  con.oyentes.add(oyente);
  const send = (metodo, params = {}, espera) => con.enviar(metodo, params, sessionId, espera);
  const evaluar = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  const cerrar = async () => {
    con.oyentes.delete(oyente);
    try { await con.enviar('Target.closeTarget', { targetId }, undefined, 5000); } catch { /* ya cerrada */ }
  };
  return { send, evaluar, eventos, cerrar };
}

// ---------- Lo que se mide dentro de la página ----------

// Describe un elemento para que se pueda encontrar en el código: etiqueta, id, clases y su texto.
const DESCRIBIR = `const describir = (el) => {
  const clases = typeof el.className === 'string' ? el.className.trim().split(/\\s+/).filter(Boolean).slice(0, 2) : [];
  const texto = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('alt') || '').trim().replace(/\\s+/g, ' ').slice(0, 50);
  return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (clases.length ? '.' + clases.join('.') : '') + (texto ? ' "' + texto + '"' : '');
};`;

// Una capa fija que tapa casi toda la pantalla (un preloader o una intro que no se quitó).
const JS_CAPA = `(() => { ${DESCRIBIR}
  const W = innerWidth, H = innerHeight;
  for (const [x, y] of [[W / 2, H / 2], [W / 2, H * 0.25], [W / 2, H * 0.75]]) {
    let el = document.elementFromPoint(x, y);
    while (el && el !== document.body && el !== document.documentElement) {
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed') {
        const r = el.getBoundingClientRect();
        if (r.width >= W * 0.9 && r.height >= H * 0.7 && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.05) return describir(el);
        break;
      }
      el = el.parentElement;
    }
  }
  return null;
})()`;

const JS_BOTONES = `(() => { ${DESCRIBIR}
  return [...document.querySelectorAll('a[href], button')].filter((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return r.width >= 20 && r.height >= 20 && r.top >= 0 && r.bottom <= innerHeight + 1 && r.left >= -1 && r.right <= innerWidth + 1
      && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.5 && !el.closest('[aria-hidden="true"], [inert]');
  }).slice(0, 12).map((el) => ({
    texto: (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\\s+/g, ' ').slice(0, 50) || describir(el),
    destino: el.getAttribute('href') || '(botón)',
    alto: Math.round(el.getBoundingClientRect().height),
  }));
})()`;

const JS_METRICAS = `(() => { ${DESCRIBIR}
  const W = document.documentElement.clientWidth;
  const de = document.documentElement;
  // Paneles cerrados a propósito: el menú o un acordeón que su botón marca con aria-expanded="false".
  const cerrados = [...document.querySelectorAll('[aria-controls][aria-expanded="false"]')]
    .flatMap((b) => b.getAttribute('aria-controls').split(/\s+/)).map((id) => document.getElementById(id)).filter(Boolean);
  const fueraDeLaVista = (el) => el.closest('[aria-hidden="true"], [inert], [hidden], details:not([open]) > :not(summary), dialog:not([open]), template, noscript')
    || cerrados.some((c) => c.contains(el));
  const dentroDeFijo = (el) => { for (let p = el; p && p !== document.body; p = p.parentElement) { const pos = getComputedStyle(p).position; if (pos === 'fixed') return true; } return false; };

  // 1. Elementos que se salen de lado. Los que recorta un contenedor (una marquesina, un carrusel) no cuentan.
  const fuera = [], cortados = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0 || (r.right <= W + 1 && r.left >= -1)) continue;
    if (fueraDeLaVista(el) || dentroDeFijo(el)) continue;
    let recortaUnContenedor = false, recortaLaPagina = false;
    for (let p = el.parentElement; p; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox !== 'visible') { if (p === document.body || p === de) recortaLaPagina = true; else recortaUnContenedor = true; break; }
    }
    if (recortaUnContenedor) continue;
    let yaContado = false;
    for (const ya of [...fuera, ...cortados]) if (ya.el.contains(el)) { yaContado = true; break; }
    if (yaContado) continue;
    (recortaLaPagina ? cortados : fuera).push({ el, derecha: Math.round(r.right), izquierda: Math.round(r.left) });
  }

  // 2. Contenido que se quedó oculto después de bajar por toda la página.
  const ocultos = [];
  const esContenido = (el) => /^(IMG|SVG|VIDEO|PICTURE|BUTTON|A|INPUT|SELECT|TEXTAREA|H1|H2|H3|H4|P|LI|FIGURE)$/i.test(el.tagName)
    || [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  for (const el of document.querySelectorAll('body *')) {
    if (/^(SCRIPT|STYLE|LINK|META|BR|SOURCE|TRACK)$/.test(el.tagName)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if (fueraDeLaVista(el) || dentroDeFijo(el)) continue;
    if (ocultos.some((o) => o.el.contains(el))) continue;
    const cs = getComputedStyle(el);
    let motivo = null;
    if (parseFloat(cs.opacity) < 0.05) motivo = 'transparente (opacity 0)';
    else if (cs.visibility === 'hidden' && esContenido(el)) motivo = 'invisible (visibility hidden)';
    else if (esContenido(el)) {
      // Texto atorado debajo de su máscara: su contenedor recorta y el texto quedó fuera, arriba o abajo.
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const ov = getComputedStyle(p).overflowY;
        if (ov === 'visible') continue;
        const rp = p.getBoundingClientRect();
        if (rp.height >= 2 && (r.top >= rp.bottom - 1 || r.bottom <= rp.top + 1)) motivo = 'fuera de su máscara (no subió a su lugar)';
        break;
      }
    }
    if (motivo) ocultos.push({ el, motivo });
  }

  // 3. Imágenes rotas y fuentes.
  const rotas = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && (i.currentSrc || i.getAttribute('src'))).map((i) => i.getAttribute('src'));
  const fuentes = { cargadas: [], noCargaron: [] };
  for (const f of document.fonts) {
    const familia = f.family.replace(/["']/g, '');
    if (f.status === 'loaded' && !fuentes.cargadas.includes(familia)) fuentes.cargadas.push(familia);
    if (f.status === 'error') fuentes.noCargaron.push(familia + ' ' + f.weight + (f.style !== 'normal' ? ' ' + f.style : ''));
  }

  return {
    altoPagina: de.scrollHeight,
    anchoDocumento: de.scrollWidth,
    anchoVentana: W,
    elementosFuera: fuera.slice(0, 15).map((x) => ({ elemento: describir(x.el), borde: x.derecha > W ? 'derecho, llega a ' + x.derecha + ' px' : 'izquierdo, empieza en ' + x.izquierda + ' px' })),
    cortadosEnElBorde: cortados.slice(0, 15).map((x) => ({ elemento: describir(x.el), borde: x.derecha > W ? 'derecho, llega a ' + x.derecha + ' px' : 'izquierdo, empieza en ' + x.izquierda + ' px' })),
    contenidoOculto: ocultos.slice(0, 20).map((o) => ({ elemento: describir(o.el), motivo: o.motivo })),
    totalOcultos: ocultos.length,
    imagenesRotas: rotas,
    fuentes,
    librerias: {
      gsap: window.gsap ? window.gsap.version : false,
      ScrollTrigger: !!window.ScrollTrigger,
      SplitText: !!window.SplitText,
      Lenis: !!window.Lenis,
      lenisActivo: de.classList.contains('lenis'),
    },
    titulo: document.title,
    h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.trim().replace(/\\s+/g, ' ').slice(0, 80)),
  };
})()`;

// ---------- Capturas ----------

const MAX_ALTO_IMAGEN = 16000; // Chrome no pinta más de unos 16,384 px de alto en una captura: después repite desde arriba.

async function guardarCaptura(p, archivo, params) {
  const r = await p.send('Page.captureScreenshot', { format: 'png', ...params }, 120000);
  writeFileSync(join(SALIDA, archivo), Buffer.from(r.data, 'base64'));
  return archivo;
}

async function capturaCompleta(p, v, nombre) {
  const lm = await p.send('Page.getLayoutMetrics');
  const alto = Math.ceil((lm.cssContentSize || lm.contentSize).height);
  // Para que no se repita, la captura completa se toma a 1x (y más chica si ni así cabe).
  // Así se evita el límite de Chrome: a 2x, una página de más de ~8,000 px se repetía desde arriba.
  await p.send('Emulation.setDeviceMetricsOverride', { width: v.ancho, height: v.alto, deviceScaleFactor: 1, mobile: v.movil });
  const escala = Math.min(v.movil ? 1 : 0.6, MAX_ALTO_IMAGEN / alto);
  const archivo = await guardarCaptura(p, `${nombre}-completa.png`, {
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: v.ancho, height: alto, scale: escala },
  });
  await p.send('Emulation.setDeviceMetricsOverride', { width: v.ancho, height: v.alto, deviceScaleFactor: v.dpr, mobile: v.movil });
  return { archivo, alto, escala: +escala.toFixed(3) };
}

async function capturaPorTramos(p, v, nombre, alto) {
  const tramo = v.alto * 2;
  if (alto <= tramo * 1.25) return [];
  mkdirSync(join(SALIDA, 'tramos'), { recursive: true });
  await p.send('Emulation.setDeviceMetricsOverride', { width: v.ancho, height: v.alto, deviceScaleFactor: 1, mobile: v.movil });
  const escala = v.movil ? 1 : 0.6;
  const lista = [];
  for (let y = 0, n = 1; y < alto; y += tramo, n++) {
    const h = Math.min(tramo, alto - y);
    const archivo = `tramos/${nombre}-${String(n).padStart(2, '0')}.png`;
    await guardarCaptura(p, archivo, { captureBeyondViewport: true, clip: { x: 0, y, width: v.ancho, height: h, scale: escala } });
    lista.push({ archivo, desde: y, hasta: y + h });
  }
  await p.send('Emulation.setDeviceMetricsOverride', { width: v.ancho, height: v.alto, deviceScaleFactor: v.dpr, mobile: v.movil });
  return lista;
}

// ---------- Errores de consola y de red ----------

function leerEventos(eventos) {
  const urls = new Map();
  const errores = [], avisos = [], fallidas = [];
  for (const e of eventos) {
    const pr = e.params || {};
    if (e.method === 'Network.requestWillBeSent') urls.set(pr.requestId, pr.request.url);
    else if (e.method === 'Runtime.exceptionThrown') {
      const d = pr.exceptionDetails || {};
      const donde = d.url ? ` (${d.url.split('/').pop()}:${(d.lineNumber ?? 0) + 1})` : '';
      errores.push(((d.exception && d.exception.description) || d.text || 'Error').split('\n')[0] + donde);
    } else if (e.method === 'Runtime.consoleAPICalled' && (pr.type === 'error' || pr.type === 'assert')) {
      errores.push(pr.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 300));
    } else if (e.method === 'Runtime.consoleAPICalled' && pr.type === 'warning') {
      avisos.push(pr.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 200));
    } else if (e.method === 'Log.entryAdded' && pr.entry.level === 'error') {
      errores.push(`${pr.entry.text}${pr.entry.url ? ' ' + pr.entry.url : ''}`.slice(0, 300));
    } else if (e.method === 'Network.loadingFailed' && !pr.canceled) {
      fallidas.push({ archivo: urls.get(pr.requestId) || '(desconocido)', error: pr.errorText });
    } else if (e.method === 'Network.responseReceived' && pr.response.status >= 400) {
      fallidas.push({ archivo: pr.response.url, error: `HTTP ${pr.response.status}` });
    }
  }
  const unicos = (a) => [...new Set(a)];
  const vistas = new Set();
  return {
    errores: unicos(errores).slice(0, 20),
    avisos: unicos(avisos).slice(0, 10),
    fallidas: fallidas.filter((f) => { const k = f.archivo + f.error; if (vistas.has(k)) return false; vistas.add(k); return true; }).slice(0, 20),
  };
}

// ---------- Revisión de una vista ----------

async function esperarCarga(p, desde, limite = 20000) {
  while (Date.now() - desde < limite) {
    if (p.eventos.some((e) => e.method === 'Page.loadEventFired')) return true;
    await sleep(100);
  }
  return false;
}

async function evaluarSeguro(p, expr) {
  try { return await p.evaluar(expr); } catch { return null; }
}

async function revisarVista(con, v) {
  const p = await nuevaPestana(con);
  const r = { tamaño: `${v.ancho} x ${v.alto}` };
  try {
    await p.send('Page.enable');
    await p.send('Runtime.enable');
    await p.send('Log.enable');
    await p.send('Network.enable');
    await p.send('Emulation.setDeviceMetricsOverride', { width: v.ancho, height: v.alto, deviceScaleFactor: v.dpr, mobile: v.movil });
    await p.send('Emulation.setTouchEmulationEnabled', v.movil ? { enabled: true, maxTouchPoints: 5 } : { enabled: false });
    await p.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: v.sinMovimiento ? 'reduce' : 'no-preference' }] });
    if (v.sinJS) await p.send('Emulation.setScriptExecutionDisabled', { value: true });

    const t0 = Date.now();
    const nav = await p.send('Page.navigate', { url: URL_SITIO });
    if (nav.errorText) {
      let pista = '';
      if (/ACCESS_DENIED|FILE_NOT_FOUND/.test(nav.errorText) && URL_SITIO.startsWith('file:')) {
        pista = '\nSi el sitio está en el Escritorio, en Documentos o en Descargas, la Mac puede estar bloqueando el acceso: copia la carpeta del sitio a otra ubicación (por ejemplo tu carpeta personal) y vuelve a correr el script.';
      }
      throw new Error(`Chrome no pudo abrir ${URL_SITIO} (${nav.errorText}).${pista}`);
    }

    // Cuadros de la animación firma (opcional)
    if (v.firma) {
      mkdirSync(join(SALIDA, 'firma'), { recursive: true });
      r.firma = [];
      for (const s of [0.3, 0.8, 1.4, 2.2, 3.2, 4.5]) {
        await sleep(Math.max(0, t0 + s * 1000 - Date.now()));
        const archivo = await guardarCaptura(p, `firma/${v.nombre}-${s.toFixed(1)}s.png`, {});
        r.firma.push({ archivo, segundo: +((Date.now() - t0) / 1000).toFixed(2) });
      }
    }

    const cargo = await esperarCarga(p, t0);
    if (!cargo) r.aviso = 'La página no terminó de cargar en 20 s; la revisión siguió con lo que había.';

    // Esperar a que termine la entrada: mínimo 3.5 s; si una capa fija tapa la página, hasta 9 s.
    const minimo = v.sinJS ? 1200 : v.sinMovimiento ? 2000 : 3500;
    await sleep(Math.max(0, t0 + minimo - Date.now()));
    let capa = await evaluarSeguro(p, JS_CAPA);
    while (capa && Date.now() - t0 < 9000) { await sleep(300); capa = await evaluarSeguro(p, JS_CAPA); if (!capa) await sleep(1000); }
    r.capaQueTapa = capa ? `${capa} sigue tapando la pantalla a los ${((Date.now() - t0) / 1000).toFixed(1)} s` : null;

    r.capturas = { primeraPantalla: await guardarCaptura(p, `${v.nombre}-primera-pantalla.png`, {}) };
    r.botonesEnPrimeraPantalla = (await evaluarSeguro(p, JS_BOTONES)) || [];

    // Bajar por toda la página para disparar las entradas (no en las pruebas de reducir movimiento ni sin JS:
    // ahí todo debe verse desde el principio, sin bajar).
    if (v.recorrer) {
      const paso = Math.round(v.alto * 0.6);
      for (let y = 0, n = 0; n < 250; y += paso, n++) {
        const alto = await evaluarSeguro(p, 'document.documentElement.scrollHeight');
        if (alto === null || y > alto) break;
        await evaluarSeguro(p, `window.scrollTo({ top: ${y}, behavior: 'instant' })`);
        await sleep(300);
      }
      await sleep(1200);
    }

    const m = await evaluarSeguro(p, JS_METRICAS);
    if (m) Object.assign(r, m);
    else r.aviso = (r.aviso ? r.aviso + ' ' : '') + 'No se pudieron medir los elementos de la página.';

    if (v.completa) {
      await evaluarSeguro(p, "window.scrollTo({ top: 0, behavior: 'instant' })");
      await sleep(800);
      const c = await capturaCompleta(p, v, v.nombre);
      r.capturas.completa = c.archivo;
      r.capturas.escalaCompleta = c.escala;
      if (v.tramos) r.capturas.tramos = await capturaPorTramos(p, v, v.nombre, c.alto);
    }

    const ev = leerEventos(p.eventos);
    r.erroresConsola = ev.errores;
    r.avisosConsola = ev.avisos;
    r.archivosQueNoCargaron = ev.fallidas;
  } finally {
    await p.cerrar();
  }
  return r;
}

// ---------- Resumen en español ----------

function resumir(nombre, r, v) {
  const lineas = [];
  const malos = [];
  const pantallas = r.altoPagina ? (r.altoPagina / v.alto).toFixed(1) : null;
  lineas.push(`\n${v.titulo} (${r.tamaño})${r.altoPagina ? ` · la página mide ${miles(r.altoPagina)} px, unas ${pantallas} pantallas` : ''}`);
  const linea = (ok, bien, mal) => { lineas.push(`  ${ok ? 'bien   ' : 'REVISAR'}  ${ok ? bien : mal}`); if (!ok) malos.push(`${v.titulo}: ${mal}`); };
  if (r.aviso) lineas.push(`  aviso    ${r.aviso}`);
  if (r.capaQueTapa !== undefined) linea(!r.capaQueTapa, 'Ninguna capa tapa la página al terminar la entrada', `Una capa fija tapa la página: ${r.capaQueTapa}`);
  if (r.anchoDocumento !== undefined) {
    linea(r.anchoDocumento <= v.ancho, 'Sin desborde de lado', `La página se sale de lado: mide ${r.anchoDocumento} px de ancho en vez de ${v.ancho}. Culpables: ${r.elementosFuera.map((e) => e.elemento).slice(0, 4).join('; ') || 'revisa elementosFuera'}`);
    if (r.anchoDocumento <= v.ancho && r.elementosFuera.length) linea(false, '', `${r.elementosFuera.length} elementos pasan del borde: ${r.elementosFuera.map((e) => e.elemento).slice(0, 3).join('; ')}`);
    if (r.cortadosEnElBorde.length) linea(false, '', `${r.cortadosEnElBorde.length} elementos se cortan en el borde de la pantalla (la página los recorta): ${r.cortadosEnElBorde.map((e) => e.elemento).slice(0, 3).join('; ')}`);
  }
  if (r.totalOcultos !== undefined) linea(r.totalOcultos === 0, 'Ningún contenido se quedó oculto', `${r.totalOcultos} elementos se quedaron ocultos: ${r.contenidoOculto.slice(0, 3).map((o) => `${o.elemento}, ${o.motivo}`).join('; ')}`);
  if (r.imagenesRotas) linea(r.imagenesRotas.length === 0, 'Sin imágenes rotas', `Imágenes rotas: ${r.imagenesRotas.slice(0, 4).join(', ')}`);
  linea(r.erroresConsola.length === 0, 'Consola sin errores', `${r.erroresConsola.length} errores en la consola. El primero: ${r.erroresConsola[0]}`);
  linea(r.archivosQueNoCargaron.length === 0, 'Todos los archivos cargaron', `${r.archivosQueNoCargaron.length} archivos no cargaron: ${r.archivosQueNoCargaron.slice(0, 3).map((f) => `${f.archivo.split('/').pop()} (${f.error})`).join(', ')}`);
  if (r.fuentes) {
    linea(r.fuentes.noCargaron.length === 0, `Fuentes cargadas: ${r.fuentes.cargadas.join(', ') || 'solo las del sistema'}`,
      `Fuentes que no cargaron: ${r.fuentes.noCargaron.join(', ')} (el navegador puso otra en su lugar)`);
  }
  if (r.librerias && v.recorrer) {
    const l = r.librerias;
    const usa = [l.gsap && `GSAP ${l.gsap}`, l.ScrollTrigger && 'ScrollTrigger', l.SplitText && 'SplitText', l.Lenis && `Lenis${l.lenisActivo ? ' (activo)' : ' (cargado, sin activar)'}`].filter(Boolean);
    lineas.push(`  info     Librerías: ${usa.join(', ') || 'ninguna'}`);
  }
  if (r.botonesEnPrimeraPantalla && v.recorrer) {
    lineas.push(`  info     Botones completos en la primera pantalla: ${r.botonesEnPrimeraPantalla.map((b) => `"${b.texto}" (${b.alto} px)`).join(', ') || 'ninguno'}`);
  }
  if (r.avisosConsola && r.avisosConsola.some((a) => /GSAP target/i.test(a))) lineas.push(`  aviso    GSAP no encontró algunos elementos: ${r.avisosConsola.filter((a) => /GSAP target/i.test(a)).slice(0, 3).join(' | ')}`);
  return { lineas, malos };
}

// ---------- Principal ----------

const VISTAS = [
  { nombre: 'celular', titulo: 'Celular', ancho: 375, alto: 812, dpr: 2, movil: true, recorrer: true, completa: true },
  { nombre: 'escritorio', titulo: 'Escritorio', ancho: 1440, alto: 900, dpr: 1, movil: false, recorrer: true, completa: true },
  { nombre: 'celular-reducir-movimiento', titulo: 'Celular con Reducir movimiento', ancho: 375, alto: 812, dpr: 2, movil: true, sinMovimiento: true },
  { nombre: 'celular-sin-javascript', titulo: 'Celular sin JavaScript', ancho: 375, alto: 812, dpr: 2, movil: true, sinJS: true },
].filter((v) => !(banderas.has('--solo-celular') && v.nombre === 'escritorio'))
  .map((v) => ({ ...v, tramos: v.completa && !banderas.has('--sin-tramos'), firma: banderas.has('--firma') && v.recorrer }));

const exe = buscarChrome();
const perfil = mkdtempSync(join(tmpdir(), 'revisar-sitio-'));
let chrome = null;

async function cerrarChrome() {
  if (!chrome) return;
  const { proc, con, ws } = chrome;
  chrome = null;
  try { await con.enviar('Browser.close', {}, undefined, 3000); } catch { /* ya se cerró */ }
  try { ws && ws.close(); } catch { /* nada */ }
  if (proc.exitCode === null) {
    await Promise.race([new Promise((r) => proc.once('exit', r)), sleep(3000)]);
    if (proc.exitCode === null) { proc.kill('SIGKILL'); await Promise.race([new Promise((r) => proc.once('exit', r)), sleep(2000)]); }
  }
}

function borrarPerfil() {
  try { rmSync(perfil, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }); } catch { /* Windows a veces tarda en soltar archivos */ }
}

process.on('SIGINT', async () => { await cerrarChrome(); borrarPerfil(); process.exit(130); });

const resultado = {
  revisado: new Date().toISOString(),
  sitio: URL_SITIO,
  navegador: null,
  resumen: { todoBien: false, revisar: [] },
  vistas: {},
};

try {
  try {
    if (process.env.REVISAR_POR_PUERTO) throw new Error('se pidió usar el puerto (REVISAR_POR_PUERTO)');
    chrome = await abrirPorTuberia(exe, join(perfil, 'a'));
  } catch (e1) {
    try {
      chrome = await abrirPorPuerto(exe, join(perfil, 'b'));
    } catch (e2) {
      throw new Error(`No pude abrir Chrome sin ventana (${basename(exe)}).\nPor tubería: ${e1.message}\nPor puerto: ${e2.message}`);
    }
  }
  resultado.navegador = `${chrome.version} (${exe})`;
  console.log(`Revisando ${URL_SITIO}\ncon ${chrome.version}. Tarda de 30 a 90 segundos según el largo de la página.`);

  const lineas = [];
  for (const v of VISTAS) {
    const r = await revisarVista(chrome.con, v);
    resultado.vistas[v.nombre] = r;
    const s = resumir(v.nombre, r, v);
    lineas.push(...s.lineas);
    resultado.resumen.revisar.push(...s.malos);
  }
  resultado.resumen.todoBien = resultado.resumen.revisar.length === 0;
  const cel = resultado.vistas.celular;
  if (cel && cel.altoPagina > 8000) {
    resultado.resumen.nota = `La página mide ${miles(cel.altoPagina)} px en celular. La captura completa va a 1x para que no se repita; para leerla de cerca usa las capturas de la carpeta tramos.`;
  }
  writeFileSync(join(SALIDA, 'resultado.json'), JSON.stringify(resultado, null, 2));

  console.log(lineas.join('\n'));
  console.log(resultado.resumen.todoBien
    ? '\nResultado: no encontré problemas técnicos. Falta revisar a ojo las capturas: que se vea propio y que nada se encime.'
    : `\nResultado: hay ${resultado.resumen.revisar.length} puntos por revisar (detalle en resultado.json).`);
  if (resultado.resumen.nota) console.log(resultado.resumen.nota);
  console.log(`Capturas y reporte en: ${SALIDA}`);
} catch (e) {
  console.error(`\nNo se pudo terminar la revisión.\n${e.message}`);
  process.exitCode = 1;
} finally {
  await cerrarChrome();
  borrarPerfil();
}
