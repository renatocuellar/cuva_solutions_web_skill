#!/usr/bin/env node
// auditar-seo.mjs: revisa el SEO on-page, el silo y los enlaces de un sitio estático ya construido.
//
// Uso:
//   node scripts/auditar-seo.mjs <carpeta-dist> [--salida <carpeta>] [--estricto]
//
// Revisa por página: título, descripción, h1, orden de títulos, canonical, robots, idioma, imagen para compartir,
// datos estructurados (que sean JSON válido y qué tipos traen), imágenes sin alt o sin medidas, palabras
// (mínimo 3.000 en pilares y 1.500 en satélites), pruebas de Rank Math (palabra clave en título, descripción,
// URL, primer 10 %, subtítulos y alt, densidad, largo de URL, enlaces externos, índice y párrafos largos),
// marcadores [ASÍ] sin llenar, textos de enlace genéricos y nofollow interno.
// Revisa en todo el sitio: enlaces internos rotos, páginas huérfanas, profundidad desde el inicio,
// reglas del silo (artículo → pilar, pilar → artículos, nada de artículo → artículo de otro silo),
// títulos, descripciones y palabras clave repetidas, sitemap.xml y robots.txt.
// Usa .construccion/mapa.json (lo deja construir-sitio.mjs junto a dist) para saber silo, tipo y palabra clave
// de cada página. Sin ese archivo, deduce el silo por la primera parte de la URL.
//
// Deja auditoria-seo.md y auditoria-seo.json en --salida (por defecto, junto a dist) y un resumen en consola.
// Termina con código 1 si hay errores (con --estricto, también si hay avisos).

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import * as H from './lib/html.mjs';

const args = process.argv.slice(2);
const pos = [];
let salidaArg = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--salida') salidaArg = args[++i];
  else if (!args[i].startsWith('--')) pos.push(args[i]);
}
const estricto = args.includes('--estricto');
if (!pos[0]) { console.log('Uso: node scripts/auditar-seo.mjs <carpeta-dist> [--salida carpeta] [--estricto]'); process.exit(1); }
const DIST = resolve(pos[0]);
if (!existsSync(DIST)) { console.error(`No encuentro ${DIST}`); process.exit(1); }
const SALIDA = resolve(salidaArg || join(dirname(DIST), 'auditoria'));

// ---------- Leer páginas ----------

function archivosHtml(dir) {
  const lista = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const r = join(dir, e.name);
    if (e.isDirectory()) lista.push(...archivosHtml(r));
    else if (e.name.endsWith('.html')) lista.push(r);
  }
  return lista;
}
const aUrl = (archivo) => {
  const r = relative(DIST, archivo).split(sep).join('/');
  if (r === 'index.html') return '/';
  if (r.endsWith('/index.html')) return '/' + r.slice(0, -'index.html'.length);
  return '/' + r;
};

const archivoMapa = [join(dirname(DIST), '.construccion', 'mapa.json'), join(DIST, '_mapa.json')].find(existsSync);
const mapa = archivoMapa ? JSON.parse(readFileSync(archivoMapa, 'utf8')) : null;
const infoMapa = new Map((mapa?.paginas || []).map((p) => [p.url, p]));
const pilarDeSilo = new Map((mapa?.silos || []).map((s) => [s.slug, s]));

const paginas = archivosHtml(DIST).map((archivo) => {
  const html = readFileSync(archivo, 'utf8');
  const url = aUrl(archivo);
  const segs = url.split('/').filter(Boolean);
  const m = infoMapa.get(url);
  const robots = (H.meta(html, 'name', 'robots') || '').toLowerCase();
  const principal = H.bloque(html, 'main') ?? H.bloque(html, 'body') ?? html;
  return {
    archivo, url, html, principal,
    silo: m ? m.silo : (segs.length >= 1 && !['blog', 'autores', 'contacto', 'nosotros'].includes(segs[0]) && !url.endsWith('.html') ? segs[0] : null),
    tipo: m ? m.tipo : (url === '/' ? 'inicio' : segs.length === 1 ? 'pilar' : segs.length === 2 ? 'articulo' : 'pagina'),
    keyword: m?.keyword || null,
    noindex: robots.includes('noindex'),
    es404: url === '/404.html',
  };
});
const porUrl = new Map(paginas.map((p) => [p.url, p]));
const dominio = mapa?.dominio || (H.linkRel(porUrl.get('/')?.html || '', 'canonical') || '').replace(/\/$/, '') || null;

// ---------- Hallazgos ----------

const hallazgos = [];
const add = (nivel, url, regla, detalle) => hallazgos.push({ nivel, url, regla, detalle });
const ERR = 'error', AV = 'aviso', INFO = 'info';

function normalizar(href, desde) {
  if (!href || /^(mailto:|tel:|javascript:|#|data:|sms:|whatsapp:)/i.test(href)) return null;
  let u;
  try { u = new URL(href, (dominio || 'https://local.invalid') + desde); } catch { return null; }
  const base = new URL(dominio || 'https://local.invalid');
  if (u.host !== base.host) return null;
  return decodeURIComponent(u.pathname);
}

const grafo = new Map(); // url -> Set(destinos)
const entrantes = new Map();
const titulos = new Map(), descripciones = new Map(), keywordsVistas = new Map();

for (const p of paginas) {
  const { html, url } = p;
  const t = H.titulo(html);
  const d = H.meta(html, 'name', 'description');
  const canon = H.linkRel(html, 'canonical');
  const lang = H.idioma(html);
  const ogImg = H.meta(html, 'property', 'og:image');
  const hs = H.encabezados(p.principal);
  const h1 = H.encabezados(html).filter((h) => h.nivel === 1);
  const ld = H.jsonLd(html);
  const tipos = H.tiposJsonLd(ld);
  const texto = H.quitarEtiquetas(p.principal);
  p.palabras = H.contarPalabras(texto);
  p.tipos = tipos;

  if (p.es404) { if (!p.noindex) add(AV, url, '404', 'La página 404 debería llevar noindex.'); continue; }

  if (!t) add(ERR, url, 'titulo', 'Sin <title>.');
  else {
    if (t.length < 30 || t.length > 65) add(AV, url, 'titulo', `El título tiene ${t.length} caracteres (meta: 50 a 60): "${t}"`);
    if (!p.noindex) { if (titulos.has(t)) add(ERR, url, 'titulo-repetido', `Mismo título que ${titulos.get(t)}.`); else titulos.set(t, url); }
  }
  if (!d) add(ERR, url, 'descripcion', 'Sin meta descripción.');
  else {
    if (d.length < 110 || d.length > 170) add(AV, url, 'descripcion', `La descripción tiene ${d.length} caracteres (meta: 120 a 160).`);
    if (!p.noindex) { if (descripciones.has(d)) add(ERR, url, 'descripcion-repetida', `Misma descripción que ${descripciones.get(d)}.`); else descripciones.set(d, url); }
  }
  if (h1.length !== 1) add(ERR, url, 'h1', `Tiene ${h1.length} h1 (debe tener 1).`);
  let anterior = 1;
  for (const h of hs) { if (h.nivel > anterior + 1) { add(AV, url, 'orden-titulos', `Salta de h${anterior} a h${h.nivel} en "${h.texto.slice(0, 60)}".`); break; } anterior = h.nivel; }
  if (!lang) add(ERR, url, 'idioma', 'Falta lang en <html>.');
  if (!canon) add(ERR, url, 'canonical', 'Sin URL canónica.');
  else if (!/^https:\/\//.test(canon)) add(ERR, url, 'canonical', `La canónica debe ser absoluta con https: ${canon}`);
  else if (dominio && canon !== dominio + url) add(AV, url, 'canonical', `La canónica (${canon}) no coincide con la URL de la página (${dominio + url}).`);
  if (!ogImg) add(AV, url, 'og-image', 'Sin imagen para compartir (og:image).');
  else if (!/^https?:\/\//.test(ogImg)) add(ERR, url, 'og-image', 'og:image debe ser una dirección completa con https.');
  if (!ld.length) add(AV, url, 'datos-estructurados', 'Sin datos estructurados (JSON-LD).');
  for (const b of ld) if (!b.ok) add(ERR, url, 'datos-estructurados', `JSON-LD inválido: ${b.error}`);
  if (p.tipo === 'articulo' && !tipos.some((x) => /Article|BlogPosting|NewsArticle/.test(x))) add(AV, url, 'datos-estructurados', 'Artículo sin BlogPosting o Article.');
  if (url !== '/' && !tipos.includes('BreadcrumbList')) add(AV, url, 'migas', 'Sin BreadcrumbList.');
  if (tipos.includes('AggregateRating') || tipos.includes('Review')) add(AV, url, 'datos-estructurados', 'Trae calificaciones o reseñas en JSON-LD: confirma que son reales y visibles en la página.');

  for (const img of H.imagenes(p.principal)) {
    const src = (img.src || img['data-src'] || '').split('/').pop();
    if (img.alt === undefined) add(ERR, url, 'imagen-alt', `Imagen sin alt: ${src}`);
    if (!img.width || !img.height) add(AV, url, 'imagen-medidas', `Imagen sin width o height: ${src}`);
  }

  const pend = H.marcadores(H.quitarEtiquetas(html.replace(/<script\b[\s\S]*?<\/script>/gi, '')));
  if (pend.length) add(AV, url, 'marcadores', `Marcadores sin llenar: ${pend.join(' ')}`);
  // Extensión mínima CUVA: pilar 3.000+, satélite 1.500+ (08, secciones 3 y 4). Se cuenta el <article> si existe.
  const cuerpoHtml = H.bloque(p.principal, 'article') ?? p.principal;
  const cuerpoTexto = H.quitarEtiquetas(cuerpoHtml);
  const palabrasCuerpo = H.contarPalabras(cuerpoTexto);
  const MINIMO = { pilar: 3000, articulo: 1500 }[p.tipo];
  if (MINIMO && !p.noindex && palabrasCuerpo < MINIMO) add(ERR, url, 'extension', `${p.tipo === 'pilar' ? 'Pilar' : 'Satélite'} con ${palabrasCuerpo} palabras: el mínimo es ${MINIMO.toLocaleString('es')}. Súmale sustancia (casos, tablas, pasos, ejemplos), nunca relleno.`);

  // Pruebas de Rank Math (10-rank-math-y-urls.md, sección 2)
  if (p.keyword && !p.noindex && ['pilar', 'articulo', 'servicio'].includes(p.tipo)) {
    const N = (s = '') => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
    const kw = N(p.keyword);
    const VACIAS = new Set(['de', 'del', 'la', 'el', 'los', 'las', 'en', 'y', 'para', 'por', 'con', 'un', 'una', 'a', 'al', 'que', 'se', 'tu', 'mi']);
    const kwPalabras = kw.split(' ').filter((w) => w && !VACIAS.has(w));
    const RM = (regla, detalle) => add(AV, url, `rankmath-${regla}`, detalle);
    const tN = N(t || '');
    if (!tN.includes(kw)) RM('titulo', `La palabra clave "${p.keyword}" no está en el título SEO.`);
    else if (tN.indexOf(kw) > tN.length / 2) RM('titulo-inicio', 'La palabra clave está en la segunda mitad del título: llévala al inicio.');
    if (!N(d || '').includes(kw)) RM('descripcion', 'La palabra clave no está en la meta descripción.');
    const urlN = N(url);
    if (!kwPalabras.every((w) => urlN.includes(w))) RM('url', `La URL no contiene las palabras de la palabra clave (${kwPalabras.join(', ')}).`);
    const largoUrl = ((dominio || '') + url).length;
    if (dominio && largoUrl > 75) RM('url-largo', `La URL mide ${largoUrl} caracteres con el dominio (máximo 75).`);
    const cuerpoN = N(cuerpoTexto);
    const pos = cuerpoN.indexOf(kw);
    if (pos < 0) RM('contenido', 'La palabra clave exacta no aparece en el contenido.');
    else if (pos > cuerpoN.length * 0.1) RM('inicio-contenido', 'La palabra clave no aparece en el primer 10 % del contenido.');
    const apariciones = pos < 0 ? 0 : cuerpoN.split(kw).length - 1;
    const densidad = palabrasCuerpo ? (apariciones / palabrasCuerpo) * 100 : 0;
    if (densidad > 2.5) RM('densidad', `Densidad de ${densidad.toFixed(2)} %: suena repetido, usa variantes (meta 1 % a 1,5 %).`);
    else if (densidad < 0.5 && palabrasCuerpo > 300) RM('densidad', `Densidad de ${densidad.toFixed(2)} %: la palabra clave casi no aparece (meta 1 % a 1,5 %, sumando variantes naturales).`);
    if (!H.encabezados(cuerpoHtml).some((h) => h.nivel >= 2 && h.nivel <= 3 && N(h.texto).includes(kw))) RM('subtitulos', 'La palabra clave no está en ningún h2 o h3.');
    if (!H.imagenes(cuerpoHtml).some((img) => N(img.alt || '').includes(kw))) RM('alt', 'Ninguna imagen del contenido tiene la palabra clave en su alt.');
    if (H.imagenes(cuerpoHtml).length < (p.tipo === 'pilar' ? 4 : 2)) RM('imagenes', `Pocas imágenes en el contenido (meta: ${p.tipo === 'pilar' ? 4 : 2} o más).`);
    const externos = H.enlaces(cuerpoHtml).filter((a) => /^https?:\/\//i.test(a.href) && (!dominio || !a.href.startsWith(dominio)));
    if (!externos.length) RM('enlace-externo', 'Sin enlaces externos a fuentes de autoridad.');
    else if (!externos.some((a) => !/nofollow|sponsored|ugc/.test(a.rel))) RM('enlace-externo-dofollow', 'Todos los enlaces externos llevan nofollow: al menos una fuente de autoridad va dofollow.');
    const h2 = H.encabezados(cuerpoHtml).filter((h) => h.nivel === 2).length;
    if ((p.tipo === 'pilar' || h2 >= 5) && !/articulo-indice|rank-math-toc|wp-block-rank-math-toc|class="[^"]*\btoc\b/i.test(cuerpoHtml)) RM('indice', 'Falta el índice de contenido (Table of Contents).');
    const largos = [...cuerpoHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => H.contarPalabras(H.quitarEtiquetas(m[1]))).filter((n) => n > 120);
    if (largos.length) RM('parrafos', `${largos.length} párrafo(s) de más de 120 palabras: divídelos.`);
  }

  if (p.keyword && !p.noindex) {
    const k = p.keyword.toLowerCase();
    if (keywordsVistas.has(k)) add(ERR, url, 'canibalizacion', `Misma palabra clave "${p.keyword}" que ${keywordsVistas.get(k)}.`);
    else keywordsVistas.set(k, url);
  }

  const destinos = new Set();
  for (const a of H.enlaces(html)) {
    const dest = normalizar(a.href, url);
    if (!dest) continue;
    const esArchivo = /\.[a-z0-9]{2,5}$/i.test(dest) && !dest.endsWith('.html');
    if (esArchivo) { if (!existsSync(join(DIST, dest))) add(ERR, url, 'enlace-roto', `Archivo enlazado que no existe: ${dest}`); continue; }
    const destNorm = dest.endsWith('/') || dest.endsWith('.html') ? dest : dest + '/';
    if (!porUrl.has(destNorm)) { add(ERR, url, 'enlace-roto', `Enlace a una página que no existe o es borrador: ${a.href} ("${a.texto.slice(0, 50)}")`); continue; }
    if (dest !== destNorm) add(AV, url, 'enlace-sin-barra', `Enlace sin barra final: ${a.href}`);
    if (a.rel.includes('nofollow')) add(AV, url, 'nofollow-interno', `Enlace interno con nofollow: ${a.href}`);
    if (H.ANCLAS_GENERICAS.includes(a.texto.toLowerCase().replace(/[.…→›»\s]+$/u, '').trim())) add(AV, url, 'ancla-generica', `Texto de enlace genérico "${a.texto}" hacia ${dest}.`);
    if (porUrl.get(destNorm).noindex && !p.noindex) add(AV, url, 'enlace-a-noindex', `Enlaza a una página con noindex: ${destNorm}`);
    if (destNorm !== url) destinos.add(destNorm);
  }
  grafo.set(url, destinos);
  for (const d2 of destinos) { if (!entrantes.has(d2)) entrantes.set(d2, new Set()); entrantes.get(d2).add(url); }
}

// ---------- Reglas del silo ----------

const indexables = paginas.filter((p) => !p.noindex && !p.es404);
const silos = new Map();
for (const p of indexables) if (p.silo) { if (!silos.has(p.silo)) silos.set(p.silo, []); silos.get(p.silo).push(p); }

for (const [silo, lista] of silos) {
  const pilarUrl = pilarDeSilo.get(silo)?.pilar || `/${silo}/`;
  const pilarP = porUrl.get(pilarUrl);
  const soporte = lista.filter((p) => p.url !== pilarUrl);
  if (!pilarP) { add(ERR, pilarUrl, 'silo-sin-pilar', `El silo "${silo}" no tiene pilar publicada.`); continue; }
  if (soporte.length < 10) add(AV, pilarUrl, 'silo-articulos', `El silo "${silo}" tiene ${soporte.length} páginas de soporte publicadas (meta: 10 o más).`);
  const desdePilar = grafo.get(pilarUrl) || new Set();
  for (const s of soporte) {
    if (!desdePilar.has(s.url)) add(ERR, pilarUrl, 'pilar-a-articulo', `La pilar no enlaza a ${s.url}.`);
    const textoSinBloques = H.quitarPorClase(H.quitarPorClase(s.principal, 'cuva-migas'), 'cuva-relacionados');
    const enTexto = H.enlaces(textoSinBloques).some((a) => normalizar(a.href, s.url) === pilarUrl);
    const enTodo = (grafo.get(s.url) || new Set()).has(pilarUrl);
    if (!enTodo) add(ERR, s.url, 'articulo-a-pilar', `No enlaza a su pilar ${pilarUrl}.`);
    else if (!enTexto) add(AV, s.url, 'articulo-a-pilar', `Enlaza a su pilar solo desde las migas o "Sigue leyendo": agrega el enlace dentro del texto.`);
    const pilarKw = pilarP.keyword?.toLowerCase();
    if (pilarKw) {
      const exactas = H.enlaces(textoSinBloques).filter((a) => normalizar(a.href, s.url) === pilarUrl && a.texto.toLowerCase() === pilarKw).length;
      if (exactas > 1) add(AV, s.url, 'ancla-exacta', `Usa ${exactas} veces la palabra clave exacta de la pilar como texto de enlace (máximo 1).`);
    }
    let haciaOtrasPilares = 0;
    const textoPropio = H.quitarPorClase(H.quitarPorClase(s.principal, 'cuva-migas'), 'cuva-relacionados');
    for (const a of H.enlaces(textoPropio)) {
      const dest = normalizar(a.href, s.url);
      if (!dest) continue;
      const dn = dest.endsWith('/') ? dest : dest + '/';
      const destino = porUrl.get(dn);
      if (!destino || !destino.silo || destino.silo === silo) continue;
      if (destino.tipo === 'pilar') haciaOtrasPilares++;
      else add(ERR, s.url, 'cruce-de-silo', `Enlaza a un artículo de otro silo (${dn}). Entre silos solo se enlaza a la pilar.`);
    }
    if (haciaOtrasPilares > 1) add(AV, s.url, 'cruce-de-silo', `Enlaza a ${haciaOtrasPilares} pilares de otros silos (máximo 1).`);
  }
}
if (silos.size < 5) add(AV, '/', 'silos', `El sitio tiene ${silos.size} silos con páginas publicadas (meta: 5 o más).`);

// Huérfanas y profundidad
for (const p of indexables) {
  if (p.url === '/') continue;
  const desde = [...(entrantes.get(p.url) || [])].filter((u) => u !== p.url);
  if (!desde.length) add(ERR, p.url, 'huerfana', 'Ninguna página enlaza aquí.');
}
const profundidad = new Map([['/', 0]]);
const cola = ['/'];
while (cola.length) {
  const u = cola.shift();
  for (const d of grafo.get(u) || []) if (!profundidad.has(d)) { profundidad.set(d, profundidad.get(u) + 1); cola.push(d); }
}
for (const p of indexables) {
  const n = profundidad.get(p.url);
  if (n === undefined && p.url !== '/') add(ERR, p.url, 'profundidad', 'No se llega desde el inicio siguiendo enlaces.');
  else if (n > 3) add(AV, p.url, 'profundidad', `Está a ${n} clics del inicio (meta: 3 o menos).`);
}

// ---------- sitemap y robots ----------

const smArchivo = join(DIST, 'sitemap.xml');
if (!existsSync(smArchivo)) add(ERR, '/sitemap.xml', 'sitemap', 'No hay sitemap.xml.');
else {
  const locs = [...readFileSync(smArchivo, 'utf8').matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
  const enSm = new Set(locs.map((l) => { try { return decodeURIComponent(new URL(l).pathname); } catch { return l; } }));
  for (const p of indexables) if (!enSm.has(p.url)) add(ERR, '/sitemap.xml', 'sitemap', `Falta en el sitemap: ${p.url}`);
  for (const u of enSm) { const p = porUrl.get(u); if (!p) add(ERR, '/sitemap.xml', 'sitemap', `El sitemap lista una página que no existe: ${u}`); else if (p.noindex) add(ERR, '/sitemap.xml', 'sitemap', `El sitemap lista una página con noindex: ${u}`); }
  if (dominio && locs.some((l) => !l.startsWith(dominio))) add(ERR, '/sitemap.xml', 'sitemap', `Hay direcciones que no empiezan con ${dominio}.`);
}
const rbArchivo = join(DIST, 'robots.txt');
if (!existsSync(rbArchivo)) add(ERR, '/robots.txt', 'robots', 'No hay robots.txt.');
else {
  const rb = readFileSync(rbArchivo, 'utf8');
  if (!/^\s*sitemap\s*:/im.test(rb)) add(AV, '/robots.txt', 'robots', 'robots.txt no indica el sitemap.');
  const grupos = [];
  let actual = null;
  for (const linea of rb.split(/\r?\n/)) {
    const l = linea.replace(/#.*/, '').trim();
    const ua = l.match(/^user-agent\s*:\s*(.+)$/i);
    if (ua) { if (!actual || actual.reglas.length) { actual = { agentes: [], reglas: [] }; grupos.push(actual); } actual.agentes.push(ua[1].trim().toLowerCase()); continue; }
    const r = l.match(/^(allow|disallow)\s*:\s*(.*)$/i);
    if (r && actual) actual.reglas.push({ tipo: r[1].toLowerCase(), ruta: r[2].trim() });
  }
  for (const bot of ['*', 'googlebot', 'bingbot', 'oai-searchbot', 'claude-searchbot', 'perplexitybot', 'applebot']) {
    const g = grupos.find((x) => x.agentes.includes(bot));
    if (g && g.reglas.some((r) => r.tipo === 'disallow' && r.ruta === '/') && !g.reglas.some((r) => r.tipo === 'allow' && r.ruta === '/')) add(ERR, '/robots.txt', 'robots', `robots.txt bloquea todo el sitio a ${bot}.`);
  }
}

// ---------- Reporte ----------

const errores = hallazgos.filter((h) => h.nivel === ERR);
const avisosL = hallazgos.filter((h) => h.nivel === AV);
const resumenSilos = [...silos].map(([s, l]) => ({ silo: s, paginas: l.length, palabras: l.reduce((n, p) => n + (p.palabras || 0), 0) }));
mkdirSync(SALIDA, { recursive: true });
writeFileSync(join(SALIDA, 'auditoria-seo.json'), JSON.stringify({ fecha: new Date().toISOString(), dominio, paginas: paginas.length, indexables: indexables.length, silos: resumenSilos, errores: errores.length, avisos: avisosL.length, hallazgos }, null, 2));

const porRegla = (lista) => {
  const g = new Map();
  for (const h of lista) { if (!g.has(h.regla)) g.set(h.regla, []); g.get(h.regla).push(h); }
  return [...g].map(([r, hs]) => `### ${r} (${hs.length})\n\n${hs.map((h) => `- \`${h.url}\` ${h.detalle}`).join('\n')}\n`).join('\n');
};
const md = [
  `# Auditoría SEO`, '',
  `Fecha: ${new Date().toISOString().slice(0, 10)} · Dominio: ${dominio || 'sin canónica en el inicio'} · Páginas: ${paginas.length} (${indexables.length} se indexan)`, '',
  `**Errores: ${errores.length} · Avisos: ${avisosL.length}**`, '',
  '## Silos', '', '| Silo | Páginas publicadas | Palabras |', '|---|---|---|',
  ...resumenSilos.map((s) => `| ${s.silo} | ${s.paginas} | ${s.palabras.toLocaleString('es')} |`), '',
  '## Errores', '', errores.length ? porRegla(errores) : 'Ninguno.', '',
  '## Avisos', '', avisosL.length ? porRegla(avisosL) : 'Ninguno.', '',
].join('\n');
writeFileSync(join(SALIDA, 'auditoria-seo.md'), md);

console.log(`\nAuditoría SEO de ${relative(process.cwd(), DIST) || '.'}: ${paginas.length} páginas, ${indexables.length} se indexan, ${silos.size} silos.`);
for (const s of resumenSilos) console.log(`  ${s.silo}: ${s.paginas} páginas, ${s.palabras.toLocaleString('es')} palabras`);
console.log(`\nErrores: ${errores.length}   Avisos: ${avisosL.length}`);
for (const h of errores.slice(0, 25)) console.log(`  ✗ ${h.url}  ${h.detalle}`);
if (errores.length > 25) console.log(`  ... y ${errores.length - 25} más`);
for (const h of avisosL.slice(0, 15)) console.log(`  · ${h.url}  ${h.detalle}`);
if (avisosL.length > 15) console.log(`  ... y ${avisosL.length - 15} avisos más`);
console.log(`\nReporte completo: ${relative(process.cwd(), join(SALIDA, 'auditoria-seo.md'))}\n`);
process.exit(errores.length || (estricto && avisosL.length) ? 1 : 0);
