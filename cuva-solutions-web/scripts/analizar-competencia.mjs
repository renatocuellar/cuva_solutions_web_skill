#!/usr/bin/env node
// analizar-competencia.mjs: lee sitios de la competencia y deja un reporte para la matriz de competencia.
//
// Uso:
//   node scripts/analizar-competencia.mjs <url> [<url> ...] [--salida <carpeta>] [--max 15]
//
// Por cada sitio: robots.txt (sitemaps y si bloquea rastreadores de IA), sitemap.xml (cuántas URLs y cómo se
// agrupan), la página de inicio y hasta --max páginas (enlaces del inicio y una muestra del sitemap por sección).
// Por página: título, descripción, h1, h2, h3, palabras, tipos de datos estructurados, autor y fechas,
// enlaces internos y externos, imágenes sin alt y si el contenido está en el HTML (sin depender de JavaScript).
//
// Deja <salida>/resumen.md y <salida>/datos.json. No copia textos: solo mide estructura.
// Necesita salida a internet desde la terminal (Claude Code en tu computadora). Si no hay, usa WebFetch
// como dice references/05-investigacion-y-competencia.md, sección 3.3.
// Requisitos: Node 18 o más.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as H from './lib/html.mjs';

const args = process.argv.slice(2);
const urls = [];
let salida = 'investigacion/competencia', max = 15;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--salida') salida = args[++i];
  else if (args[i] === '--max') max = Math.max(1, Math.min(40, Number(args[++i]) || 15));
  else if (!args[i].startsWith('--')) urls.push(args[i]);
}
if (!urls.length) { console.log('Uso: node scripts/analizar-competencia.mjs <url> [<url> ...] [--salida carpeta] [--max 15]'); process.exit(1); }

const UA = 'Mozilla/5.0 (compatible; CUVA-Analizador/1.0; revisión de estructura SEO)';
const BOTS_IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot', 'Googlebot'];
const SECUNDARIOS = new Set(['PostalAddress', 'ListItem', 'Answer', 'Question', 'GeoCoordinates', 'ImageObject', 'Thing', 'Offer', 'ContactPoint', 'OpeningHoursSpecification', 'EntryPoint', 'SearchAction', 'PropertyValue', 'Rating', 'Country', 'City', 'Place']);
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

async function traer(url, intentos = 2) {
  for (let i = 0; i < intentos; i++) {
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 20000);
      const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,application/xml,text/plain,*/*' }, redirect: 'follow', signal: c.signal });
      clearTimeout(t);
      const texto = await r.text();
      return { ok: r.ok, status: r.status, url: r.url, texto, tipo: r.headers.get('content-type') || '' };
    } catch (e) {
      if (i === intentos - 1) return { ok: false, status: 0, url, texto: '', error: e.cause?.code || e.message };
      await esperar(800);
    }
  }
}

function leerRobots(texto) {
  const grupos = [];
  let g = null;
  const sitemaps = [];
  for (const linea of texto.split(/\r?\n/)) {
    const l = linea.replace(/#.*/, '').trim();
    let m;
    if ((m = l.match(/^sitemap\s*:\s*(\S+)/i))) { sitemaps.push(m[1]); continue; }
    if ((m = l.match(/^user-agent\s*:\s*(.+)$/i))) { if (!g || g.reglas.length) { g = { agentes: [], reglas: [] }; grupos.push(g); } g.agentes.push(m[1].trim().toLowerCase()); continue; }
    if ((m = l.match(/^(allow|disallow)\s*:\s*(.*)$/i)) && g) g.reglas.push({ tipo: m[1].toLowerCase(), ruta: m[2].trim() });
  }
  const grupoDe = (bot) => grupos.find((x) => x.agentes.includes(bot.toLowerCase())) || grupos.find((x) => x.agentes.includes('*'));
  const bloqueaTodo = (bot) => { const x = grupoDe(bot); return !!x && x.reglas.some((r) => r.tipo === 'disallow' && r.ruta === '/') && !x.reglas.some((r) => r.tipo === 'allow' && r.ruta === '/'); };
  const permitido = (ruta) => {
    const x = grupos.find((y) => y.agentes.includes('*'));
    if (!x) return true;
    let mejor = null;
    for (const r of x.reglas) if (r.ruta && ruta.startsWith(r.ruta) && (!mejor || r.ruta.length > mejor.ruta.length)) mejor = r;
    return !mejor || mejor.tipo === 'allow';
  };
  return { sitemaps, bloqueaTodo, permitido, grupos };
}

async function leerSitemaps(iniciales, origen) {
  const pendientes = [...new Set(iniciales.length ? iniciales : [`${origen}/sitemap.xml`, `${origen}/sitemap_index.xml`])];
  const vistos = new Set(), urlsSm = new Set();
  let leidos = 0;
  while (pendientes.length && leidos < 12 && urlsSm.size < 5000) {
    const sm = pendientes.shift();
    if (vistos.has(sm)) continue;
    vistos.add(sm);
    if (sm.endsWith('.gz')) continue;
    const r = await traer(sm, 1);
    leidos++;
    if (!r.ok || !/<(urlset|sitemapindex)\b/i.test(r.texto)) continue;
    const locs = [...r.texto.matchAll(/<loc>\s*(?:<!\[CDATA\[)?\s*([^<\]]+?)\s*(?:\]\]>)?\s*<\/loc>/g)].map((m) => H.decodificar(m[1]));
    if (/<sitemapindex\b/i.test(r.texto)) pendientes.push(...locs);
    else locs.forEach((u) => urlsSm.add(u));
  }
  return [...urlsSm];
}

function analizarPagina(html, url, origen) {
  const principal = H.bloque(html, 'main') ?? H.bloque(html, 'article') ?? H.bloque(html, 'body') ?? html;
  const hs = H.encabezados(html);
  const ld = H.jsonLd(html);
  const tipos = H.tiposJsonLd(ld).filter((t) => !SECUNDARIOS.has(t));
  const links = H.enlaces(html);
  let internos = 0, externos = 0;
  for (const a of links) {
    try { const u = new URL(a.href, url); if (!/^https?:$/.test(u.protocol)) continue; if (u.origin === origen) internos++; else externos++; } catch {}
  }
  const imgs = H.imagenes(principal);
  const textoBody = H.quitarEtiquetas(H.bloque(html, 'body') ?? html);
  const encontrarFecha = () => {
    const metas = H.meta(html, 'property', 'article:modified_time') || H.meta(html, 'property', 'article:published_time');
    if (metas) return metas.slice(0, 10);
    const m = JSON.stringify(ld.filter((b) => b.ok).map((b) => b.datos)).match(/"date(Modified|Published)"\s*:\s*"([^"]{10})/);
    return m ? m[2] : null;
  };
  const autor = H.meta(html, 'name', 'author') || (JSON.stringify(ld.filter((b) => b.ok).map((b) => b.datos)).match(/"author"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"/) || [])[1] || null;
  return {
    url,
    titulo: H.titulo(html),
    descripcion: H.meta(html, 'name', 'description'),
    canonical: H.linkRel(html, 'canonical'),
    robots: H.meta(html, 'name', 'robots'),
    idioma: H.idioma(html),
    h1: hs.filter((h) => h.nivel === 1).map((h) => h.texto),
    h2: hs.filter((h) => h.nivel === 2).map((h) => h.texto).slice(0, 30),
    h3: hs.filter((h) => h.nivel === 3).map((h) => h.texto).slice(0, 40),
    preguntas: hs.filter((h) => h.nivel >= 2 && /¿|\?/.test(h.texto)).map((h) => h.texto).slice(0, 30),
    palabras: H.contarPalabras(H.quitarEtiquetas(principal)),
    contenido_en_html: H.contarPalabras(textoBody) > 150,
    datos_estructurados: tipos,
    json_ld_invalido: ld.filter((b) => !b.ok).length,
    autor,
    fecha: encontrarFecha(),
    enlaces_internos: internos,
    enlaces_externos: externos,
    imagenes: imgs.length,
    imagenes_sin_alt: imgs.filter((i) => i.alt === undefined || i.alt === '').length,
    tablas: (principal.match(/<table\b/gi) || []).length,
    listas: (principal.match(/<(ol|ul)\b/gi) || []).length,
    whatsapp: /wa\.me|api\.whatsapp\.com/i.test(html),
    formulario: /<form\b/i.test(html),
  };
}

const segmento = (u) => { try { return new URL(u).pathname.split('/').filter(Boolean)[0] || '(raíz)'; } catch { return '?'; } };
const esPagina = (u) => !/\.(jpg|jpeg|png|gif|webp|svg|pdf|zip|mp4|css|js|xml|txt|ico|woff2?)(\?|$)/i.test(u);

const resultados = [];
for (const entrada of urls) {
  let base;
  try { base = new URL(/^https?:\/\//.test(entrada) ? entrada : `https://${entrada}`); } catch { console.log(`URL inválida: ${entrada}`); continue; }
  const origen = base.origin;
  console.log(`\n→ ${origen}`);
  const sitio = { origen, entrada: base.href, robots: null, sitemap: { urls: 0, secciones: {} }, paginas: [], errores: [] };

  const rb = await traer(`${origen}/robots.txt`, 1);
  if (rb.status === 0) {
    sitio.errores.push(`No hay conexión con ${origen} (${rb.error}). ¿La terminal tiene salida a internet?`);
    resultados.push(sitio);
    console.log(`  Sin conexión (${rb.error}).`);
    continue;
  }
  const robots = rb.ok ? leerRobots(rb.texto) : leerRobots('');
  sitio.robots = { existe: rb.ok, sitemaps: robots.sitemaps, bloquea: BOTS_IA.filter((b) => robots.bloqueaTodo(b)) };

  let urlsSm = (await leerSitemaps(robots.sitemaps, origen)).filter(esPagina);
  if (!urlsSm.length && robots.sitemaps.length) urlsSm = (await leerSitemaps([], origen)).filter(esPagina);
  sitio.sitemap.urls = urlsSm.length;
  for (const u of urlsSm) { const s = segmento(u); sitio.sitemap.secciones[s] = (sitio.sitemap.secciones[s] || 0) + 1; }
  console.log(`  robots.txt: ${rb.ok ? 'sí' : 'no'} · sitemap: ${urlsSm.length} URLs`);

  const inicio = await traer(base.href);
  if (!inicio.ok) { sitio.errores.push(`El inicio respondió ${inicio.status}.`); resultados.push(sitio); continue; }
  const elegidas = [inicio.url];
  const delInicio = H.enlaces(inicio.texto).map((a) => { try { const u = new URL(a.href, inicio.url); u.hash = ''; u.search = ''; return u.href; } catch { return null; } })
    .filter((u) => u && u.startsWith(origen) && esPagina(u));
  for (const u of delInicio) if (elegidas.length < Math.ceil(max / 2) && !elegidas.includes(u)) elegidas.push(u);
  const porSeccion = {};
  for (const u of urlsSm) (porSeccion[segmento(u)] ||= []).push(u);
  const secciones = Object.keys(porSeccion).sort((a, b) => porSeccion[b].length - porSeccion[a].length);
  for (let ronda = 0; elegidas.length < max && ronda < 50; ronda++) {
    let agrego = false;
    for (const s of secciones) {
      const u = porSeccion[s][ronda];
      if (u && !elegidas.includes(u) && elegidas.length < max) { elegidas.push(u); agrego = true; }
    }
    if (!agrego) break;
  }

  for (const u of elegidas) {
    const ruta = new URL(u).pathname;
    if (!robots.permitido(ruta)) { sitio.errores.push(`robots.txt no permite revisar ${ruta}`); continue; }
    const r = u === inicio.url ? inicio : await traer(u);
    if (!r.ok || !/html/i.test(r.tipo || 'html')) { sitio.errores.push(`${ruta} respondió ${r.status}`); continue; }
    sitio.paginas.push(analizarPagina(r.texto, r.url, origen));
    process.stdout.write('.');
    await esperar(600);
  }
  console.log(` ${sitio.paginas.length} páginas revisadas`);
  resultados.push(sitio);
}

// ---------- Reporte ----------

const dir = resolve(salida);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'datos.json'), JSON.stringify({ fecha: new Date().toISOString(), sitios: resultados }, null, 2));

const md = [`# Análisis de competencia`, '', `Fecha: ${new Date().toISOString().slice(0, 10)}. Mide estructura; los textos de la competencia no se copian.`, ''];
md.push('## Comparación rápida', '', '| Sitio | URLs en sitemap | Páginas revisadas | Palabras promedio | Datos estructurados | Con autor | Con fecha | Bloquea IA |', '|---|---|---|---|---|---|---|---|');
for (const s of resultados) {
  const n = s.paginas.length || 1;
  const tipos = [...new Set(s.paginas.flatMap((p) => p.datos_estructurados))];
  md.push(`| ${s.origen} | ${s.sitemap.urls} | ${s.paginas.length} | ${Math.round(s.paginas.reduce((a, p) => a + p.palabras, 0) / n)} | ${tipos.join(', ') || 'ninguno'} | ${s.paginas.filter((p) => p.autor).length}/${s.paginas.length} | ${s.paginas.filter((p) => p.fecha).length}/${s.paginas.length} | ${s.robots?.bloquea?.join(', ') || 'no'} |`);
}
md.push('');
for (const s of resultados) {
  md.push(`## ${s.origen}`, '');
  if (s.errores.length) md.push('Avisos: ' + s.errores.join(' · '), '');
  const secs = Object.entries(s.sitemap.secciones).sort((a, b) => b[1] - a[1]).slice(0, 15);
  if (secs.length) md.push('**Cómo agrupa sus URLs (sitemap):** ' + secs.map(([k, v]) => `\`/${k}/\` ${v}`).join(' · '), '');
  for (const p of s.paginas) {
    md.push(`### ${p.url}`, '',
      `- Título: ${p.titulo || 'FALTA'}`,
      `- Descripción: ${p.descripcion || 'FALTA'}`,
      `- H1: ${p.h1.join(' / ') || 'FALTA'}`,
      `- Palabras: ${p.palabras} · Tablas: ${p.tablas} · Listas: ${p.listas} · Imágenes: ${p.imagenes} (${p.imagenes_sin_alt} sin alt)`,
      `- Datos estructurados: ${p.datos_estructurados.join(', ') || 'ninguno'}${p.json_ld_invalido ? ` (${p.json_ld_invalido} inválidos)` : ''}`,
      `- Autor: ${p.autor || 'no'} · Fecha: ${p.fecha || 'no'} · Enlaces internos: ${p.enlaces_internos} · Externos: ${p.enlaces_externos}`,
      `- Contenido en el HTML: ${p.contenido_en_html ? 'sí' : 'no (depende de JavaScript)'} · WhatsApp: ${p.whatsapp ? 'sí' : 'no'} · Formulario: ${p.formulario ? 'sí' : 'no'}`,
      p.h2.length ? `- H2: ${p.h2.join(' · ')}` : null,
      p.preguntas.length ? `- Preguntas que responde: ${p.preguntas.join(' · ')}` : null,
      '');
  }
}
md.push('## Para completar a mano', '', 'Con este reporte, llena los puntos 2, 3, 4, 10, 12, 13 y 14 de la lista de análisis (`references/05-investigacion-y-competencia.md`, 3.2) y arma la matriz y las brechas (sección 6).', '');
writeFileSync(join(dir, 'resumen.md'), md.filter((l) => l !== null).join('\n'));
console.log(`\nReporte: ${join(salida, 'resumen.md')}\n`);
