#!/usr/bin/env node
// construir-sitio.mjs: arma un sitio estático con arquitectura SILO a partir de fragmentos de contenido.
//
// Uso:
//   node scripts/construir-sitio.mjs <carpeta-del-proyecto> [opciones]
//
// Opciones:
//   --servir [puerto]   después de construir, sirve dist/ en http://localhost:4321 (o el puerto indicado)
//   --borradores        incluye las páginas con estado: borrador, con noindex y aviso visible (solo para revisar)
//   --exportar          deja además .construccion/contenido.json (para importar en WordPress, Shopify o Content&Co)
//   --dist <ruta>       carpeta de salida (por defecto <proyecto>/dist)
//
// Lee:  sitio.json, plantillas/*.html, contenido/**/*.html, publico/**
// Deja: dist/ con cada página en /silo/articulo/index.html, sitemap.xml, robots.txt, llms.txt (opcional),
//       y, fuera de dist (no se publica), .construccion/mapa.json para auditar-seo.mjs. Resumen en la consola.
// Estructura y campos: references/06-arquitectura-silo.md (sección 7).
// Requisitos: Node 18 o más. No instala nada.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path';
import { contenidoPorClase, escapar, marcadores, quitarEtiquetas } from './lib/html.mjs';

const args = process.argv.slice(2);
const banderas = new Set(args.filter((a) => a.startsWith('--')));
const posicionales = [];
let puerto = 4321, distArg = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--servir' && args[i + 1] && /^\d+$/.test(args[i + 1])) { puerto = Number(args[++i]); continue; }
  if (a === '--dist') { distArg = args[++i]; continue; }
  if (!a.startsWith('--')) posicionales.push(a);
}
const conocidas = new Set(['--servir', '--borradores', '--exportar', '--dist', '--ayuda', '--help']);
for (const b of banderas) if (!conocidas.has(b)) salir(`No conozco la opción ${b}.`);
if (banderas.has('--ayuda') || banderas.has('--help') || !posicionales[0]) {
  console.log('Uso: node scripts/construir-sitio.mjs <carpeta-del-proyecto> [--servir [puerto]] [--borradores] [--exportar] [--dist ruta]');
  process.exit(posicionales[0] ? 0 : 1);
}

function salir(msg) { console.error(`\nNo se pudo construir el sitio.\n${msg}\n`); process.exit(1); }
const avisos = [];
const avisar = (m) => { if (!avisos.includes(m)) avisos.push(m); };

const RAIZ = resolve(posicionales[0]);
const DIST = resolve(distArg || join(RAIZ, 'dist'));
const CONTENIDO = join(RAIZ, 'contenido');
const PLANTILLAS = join(RAIZ, 'plantillas');
const PUBLICO = join(RAIZ, 'publico');

// ---------- Configuración ----------

if (!existsSync(join(RAIZ, 'sitio.json'))) salir(`No encuentro sitio.json en ${RAIZ}. Usa assets/sitio.ejemplo.json como base.`);
let cfg;
try { cfg = JSON.parse(readFileSync(join(RAIZ, 'sitio.json'), 'utf8')); }
catch (e) { salir(`sitio.json no es JSON válido: ${e.message}`); }

for (const campo of ['dominio', 'idioma', 'marca', 'silos']) if (!cfg[campo]) salir(`Falta "${campo}" en sitio.json.`);
if (!/^https:\/\//.test(cfg.dominio)) salir('"dominio" debe empezar con https:// (por ejemplo https://www.tunegocio.com).');
const DOMINIO = cfg.dominio.replace(/\/+$/, '');
const SEP = cfg.separador_titulo ?? ' | ';
const TEXTOS = { inicio: 'Inicio', blog: 'Blog', sigue_leyendo: 'Sigue leyendo', por: 'Por', publicado: 'Publicado', actualizado: 'Actualizado', en_este_silo: 'En esta guía', borrador: 'Borrador: esta página no se publica', ...(cfg.textos || {}) };
const SILOS = new Map(cfg.silos.map((s) => [s.slug, s]));
for (const s of cfg.silos) if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.slug)) salir(`El slug de silo "${s.slug}" debe ir en minúsculas, sin tildes y con guiones.`);
const AUTORES = cfg.autores || {};
const abs = (u) => (!u ? '' : /^https?:\/\//.test(u) ? u : DOMINIO + (u.startsWith('/') ? u : '/' + u));
const hoy = new Date().toISOString().slice(0, 10);
const version = new Date().toISOString().replace(/\D/g, '').slice(0, 12);

// ---------- Leer contenido ----------

function leerFragmento(archivo) {
  const texto = readFileSync(archivo, 'utf8');
  const m = texto.match(/^\s*<!--([\s\S]*?)-->/);
  const datos = {};
  if (m) {
    for (const linea of m[1].split(/\r?\n/)) {
      const kv = linea.match(/^\s*([a-z_]+)\s*:\s*(.*?)\s*$/i);
      if (kv) datos[kv[1].toLowerCase()] = kv[2];
    }
  } else avisar(`${rel(archivo)}: no tiene cabecera de datos (comentario al inicio).`);
  return { datos, cuerpo: m ? texto.slice(m[0].length).trim() : texto.trim() };
}
const rel = (p) => relative(RAIZ, p).split(sep).join('/');
const SLUG_OK = /^[a-z0-9]+(-[a-z0-9]+)*$/;

if (!existsSync(CONTENIDO)) salir('No encuentro la carpeta contenido/.');
const paginas = [];
const TIPOS_RAIZ = { inicio: 'inicio', blog: 'blog', contacto: 'contacto', nosotros: 'nosotros', '404': 'pagina' };

function agregar(archivo, url, silo, tipoPorDefecto) {
  const { datos, cuerpo } = leerFragmento(archivo);
  const tipo = (datos.tipo || tipoPorDefecto).toLowerCase();
  const estado = (datos.estado || '').toLowerCase();
  if (!estado) avisar(`${rel(archivo)}: sin "estado"; se toma como listo.`);
  if (estado === 'borrador' && !banderas.has('--borradores')) return;
  if (!datos.titulo) avisar(`${rel(archivo)}: sin "titulo".`);
  if (!datos.descripcion && url !== '/404.html') avisar(`${rel(archivo)}: sin "descripcion".`);
  paginas.push({
    archivo, url, silo, tipo, datos, cuerpo,
    borrador: estado === 'borrador',
    noindex: estado === 'borrador' || /^(si|sí|true|1)$/i.test(datos.noindex || '') || url === '/404.html',
    orden: Number(datos.orden || 999),
    mtime: statSync(archivo).mtime.toISOString().slice(0, 10),
  });
}

for (const entrada of readdirSync(CONTENIDO, { withFileTypes: true })) {
  const ruta = join(CONTENIDO, entrada.name);
  if (entrada.isFile() && extname(entrada.name) === '.html') {
    const slug = basename(entrada.name, '.html');
    if (slug === 'inicio') agregar(ruta, '/', null, 'inicio');
    else if (slug === '404') agregar(ruta, '/404.html', null, 'pagina');
    else {
      if (!SLUG_OK.test(slug)) avisar(`${rel(ruta)}: el nombre debe ir en minúsculas, sin tildes y con guiones.`);
      agregar(ruta, `/${slug}/`, null, TIPOS_RAIZ[slug] || 'pagina');
    }
  } else if (entrada.isDirectory()) {
    const carpeta = entrada.name;
    const esAutores = carpeta === 'autores';
    if (!esAutores && !SILOS.has(carpeta)) { avisar(`contenido/${carpeta}/ no está en "silos" de sitio.json; se omite.`); continue; }
    for (const f of readdirSync(ruta)) {
      if (extname(f) !== '.html') continue;
      const slug = basename(f, '.html');
      if (slug !== 'index' && !SLUG_OK.test(slug)) avisar(`contenido/${carpeta}/${f}: el nombre debe ir en minúsculas, sin tildes y con guiones.`);
      if (esAutores) agregar(join(ruta, f), `/autores/${slug}/`, null, 'autor');
      else if (slug === 'index') agregar(join(ruta, f), `/${carpeta}/`, carpeta, 'pilar');
      else agregar(join(ruta, f), `/${carpeta}/${slug}/`, carpeta, 'articulo');
    }
  }
}

if (!paginas.some((p) => p.url === '/')) salir('Falta contenido/inicio.html.');
if (!paginas.some((p) => p.url === '/blog/')) {
  paginas.push({
    archivo: null, url: '/blog/', silo: null, tipo: 'blog', borrador: false, noindex: false, orden: 0, mtime: hoy,
    datos: { titulo: cfg.blog?.titulo || TEXTOS.blog, descripcion: cfg.blog?.descripcion || '', estado: 'listo' },
    cuerpo: `<h1>${escapar(cfg.blog?.titulo || TEXTOS.blog)}</h1>\n${cfg.blog?.intro ? `<p>${escapar(cfg.blog.intro)}</p>\n` : ''}<!-- cuva:blog -->`,
  });
  if (!cfg.blog?.descripcion) avisar('El índice /blog/ se generó sin descripción: agrega "blog": { "descripcion": "..." } en sitio.json.');
}

const porUrl = new Map(paginas.map((p) => [p.url, p]));
const pilar = (silo) => porUrl.get(`/${silo}/`);
const delSilo = (silo) => paginas
  .filter((p) => p.silo === silo && p.tipo !== 'pilar' && !p.noindex)
  .sort((a, b) => a.orden - b.orden || (a.datos.titulo || '').localeCompare(b.datos.titulo || '', 'es'));
const siloInfo = (slug) => SILOS.get(slug) || { slug, nombre: slug };

// ---------- Plantillas ----------

if (!existsSync(join(PLANTILLAS, 'base.html'))) salir('Falta plantillas/base.html. Revisa assets/plantilla-base.html para los marcadores que debe tener.');
const cachePlantillas = new Map();
function plantillaPara(tipo) {
  if (cachePlantillas.has(tipo)) return cachePlantillas.get(tipo);
  const archivo = [join(PLANTILLAS, `${tipo}.html`), join(PLANTILLAS, 'base.html')].find(existsSync);
  // Los comentarios de documentación que mencionan marcadores se quitan para no reemplazarlos por error
  let t = readFileSync(archivo, 'utf8').replace(/<!--[\s\S]*?-->\n?/g, (c) => (c.includes('{{') ? '' : c));
  for (let i = 0; i < 4; i++) {
    t = t.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, n) => {
      const parte = join(PLANTILLAS, 'partes', `${n}.html`);
      if (!existsSync(parte)) { avisar(`Falta plantillas/partes/${n}.html.`); return ''; }
      return readFileSync(parte, 'utf8').replace(/<!--[\s\S]*?-->\n?/g, (c) => (c.includes('{{') ? '' : c));
    });
  }
  cachePlantillas.set(tipo, t);
  return t;
}

// ---------- Piezas HTML ----------

const fechaLarga = (iso) => {
  try { return new Intl.DateTimeFormat(cfg.idioma, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso + 'T12:00:00Z')); }
  catch { return iso; }
};

function menu(p) {
  const items = [];
  for (const s of cfg.silos) {
    const pp = pilar(s.slug);
    if (!pp || pp.noindex) continue;
    const actual = p.url === pp.url ? ' aria-current="page"' : '';
    const activo = p.silo === s.slug ? ' class="cuva-activo"' : '';
    items.push(`<li${activo}><a href="${pp.url}"${actual}>${escapar(s.menu || s.nombre)}</a></li>`);
  }
  const extra = cfg.menu_extra || [
    porUrl.has('/blog/') && { texto: TEXTOS.blog, url: '/blog/' },
    porUrl.has('/contacto/') && { texto: porUrl.get('/contacto/').datos.menu || 'Contacto', url: '/contacto/' },
  ].filter(Boolean);
  for (const e of extra) {
    const actual = p.url === e.url ? ' aria-current="page"' : '';
    items.push(`<li${e.clase ? ` class="${escapar(e.clase)}"` : ''}><a href="${escapar(e.url)}"${actual}>${escapar(e.texto)}</a></li>`);
  }
  return `<ul class="cuva-menu">\n${items.join('\n')}\n</ul>`;
}

function pieSilos() {
  const items = cfg.silos.map((s) => pilar(s.slug)).filter((pp) => pp && !pp.noindex)
    .map((pp) => `<li><a href="${pp.url}">${escapar(siloInfo(pp.silo).nombre)}</a></li>`);
  return `<ul class="cuva-pie-silos">\n${items.join('\n')}\n</ul>`;
}

function migasDatos(p) {
  if (p.url === '/' || p.url === '/404.html') return [];
  const lista = [{ nombre: TEXTOS.inicio, url: '/' }];
  if (p.silo && p.tipo !== 'pilar') lista.push({ nombre: siloInfo(p.silo).nombre, url: `/${p.silo}/` });
  if (p.tipo === 'autor' && porUrl.has('/nosotros/')) lista.push({ nombre: porUrl.get('/nosotros/').datos.titulo || 'Nosotros', url: '/nosotros/' });
  lista.push({ nombre: p.datos.miga || p.datos.titulo || '', url: p.url });
  return lista;
}

function migas(p) {
  const d = migasDatos(p);
  if (!d.length) return '';
  const lis = d.map((m, i) => i === d.length - 1
    ? `<li aria-current="page">${escapar(m.nombre)}</li>`
    : `<li><a href="${m.url}">${escapar(m.nombre)}</a></li>`);
  return `<nav class="cuva-migas" aria-label="Migas de pan">\n<ol>\n${lis.join('\n')}\n</ol>\n</nav>`;
}

function itemLista(a, claseExtra = '') {
  return `<li${claseExtra ? ` class="${claseExtra}"` : ''}><a href="${a.url}"><span class="cuva-lista-titulo">${escapar(a.datos.titulo || '')}</span></a>${a.datos.descripcion ? `<p class="cuva-lista-desc">${escapar(a.datos.descripcion)}</p>` : ''}</li>`;
}

function listaArticulos(silo) {
  const arts = delSilo(silo);
  if (!arts.length) return '';
  return `<ul class="cuva-lista-articulos">\n${arts.map((a) => itemLista(a)).join('\n')}\n</ul>`;
}

function relacionados(p) {
  if (!p.silo || p.tipo === 'pilar') return '';
  const pp = pilar(p.silo);
  const hermanos = delSilo(p.silo);
  const i = hermanos.findIndex((h) => h.url === p.url);
  const elegidos = [];
  for (let k = 1; k <= hermanos.length && elegidos.length < 3; k++) {
    const h = hermanos[(i + k + hermanos.length) % hermanos.length];
    if (h && h.url !== p.url && !elegidos.includes(h)) elegidos.push(h);
  }
  const items = [pp && !pp.noindex ? itemLista(pp, 'cuva-relacionado-pilar') : '', ...elegidos.map((h) => itemLista(h))].filter(Boolean);
  if (!items.length) return '';
  return `<aside class="cuva-relacionados" aria-labelledby="cuva-relacionados-titulo">\n<h2 id="cuva-relacionados-titulo" class="cuva-relacionados-titulo">${escapar(TEXTOS.sigue_leyendo)}</h2>\n<ul>\n${items.join('\n')}\n</ul>\n</aside>`;
}

function blogIndice() {
  const secciones = [];
  for (const s of cfg.silos) {
    const arts = delSilo(s.slug).slice().sort((a, b) => (b.datos.fecha || '').localeCompare(a.datos.fecha || ''));
    const pp = pilar(s.slug);
    if (!arts.length && !pp) continue;
    const titulo = pp ? `<a href="${pp.url}">${escapar(s.nombre)}</a>` : escapar(s.nombre);
    secciones.push(`<section class="cuva-blog-silo" id="silo-${s.slug}">\n<h2>${titulo}</h2>\n${s.descripcion_corta ? `<p>${escapar(s.descripcion_corta)}</p>\n` : ''}<ul class="cuva-lista-articulos">\n${arts.map((a) => itemLista(a)).join('\n')}\n</ul>\n</section>`);
  }
  return secciones.join('\n');
}

const autorDe = (p) => (p.datos.autor && AUTORES[p.datos.autor]) || null;
function autorUrl(clave) {
  const a = AUTORES[clave];
  if (!a) return null;
  return a.url || (porUrl.has(`/autores/${clave}/`) ? `/autores/${clave}/` : null);
}

function metaArticulo(p) {
  if (!['articulo', 'servicio'].includes(p.tipo) && !p.datos.fecha) return '';
  const a = autorDe(p);
  if (p.datos.autor && !a) avisar(`${rel(p.archivo)}: el autor "${p.datos.autor}" no está en "autores" de sitio.json.`);
  const partes = [];
  if (a) {
    const u = autorUrl(p.datos.autor);
    partes.push(`<span class="cuva-meta-autor">${escapar(TEXTOS.por)} ${u ? `<a href="${u}" rel="author">${escapar(a.nombre)}</a>` : escapar(a.nombre)}</span>`);
  }
  if (p.datos.fecha) partes.push(`<span class="cuva-meta-fecha">${escapar(TEXTOS.publicado)} <time datetime="${escapar(p.datos.fecha)}">${fechaLarga(p.datos.fecha)}</time></span>`);
  if (p.datos.actualizado && p.datos.actualizado !== p.datos.fecha) partes.push(`<span class="cuva-meta-actualizado">${escapar(TEXTOS.actualizado)} <time datetime="${escapar(p.datos.actualizado)}">${fechaLarga(p.datos.actualizado)}</time></span>`);
  return partes.length ? `<p class="cuva-meta-articulo">${partes.join(' <span aria-hidden="true">·</span> ')}</p>` : '';
}

function cajaAutor(p) {
  const a = autorDe(p);
  if (!a) return '';
  const u = autorUrl(p.datos.autor);
  return `<aside class="cuva-autor">\n${a.foto ? `<img class="cuva-autor-foto" src="${escapar(a.foto)}" alt="${escapar(a.nombre)}" width="96" height="96" loading="lazy">\n` : ''}<p class="cuva-autor-nombre">${u ? `<a href="${u}" rel="author">${escapar(a.nombre)}</a>` : escapar(a.nombre)}</p>\n${a.cargo ? `<p class="cuva-autor-cargo">${escapar(a.cargo)}</p>\n` : ''}${a.bio ? `<p class="cuva-autor-bio">${escapar(a.bio)}</p>\n` : ''}</aside>`;
}

function faqDe(cuerpo) {
  const items = [];
  const reSec = /<section\b[^>]*\bdata-faq\b[^>]*>([\s\S]*?)<\/section>/gi;
  let s;
  while ((s = reSec.exec(cuerpo))) {
    const reD = /<details\b[^>]*>([\s\S]*?)<\/details>/gi;
    let d;
    while ((d = reD.exec(s[1]))) {
      const q = d[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
      if (!q) continue;
      const pregunta = quitarEtiquetas(q[1]);
      const respuesta = quitarEtiquetas(d[1].replace(q[0], ''));
      if (pregunta && respuesta) items.push({ pregunta, respuesta });
    }
    // El acordeón de references/03-animaciones.md (sección 14): .qa__q con la pregunta y .qa__a con la respuesta
    const qs = contenidoPorClase(s[1], 'qa__q'), as = contenidoPorClase(s[1], 'qa__a');
    qs.forEach((q, i) => {
      const pregunta = quitarEtiquetas(q), respuesta = quitarEtiquetas(as[i] || '');
      if (pregunta && respuesta) items.push({ pregunta, respuesta });
    });
  }
  return items;
}

// ---------- Datos estructurados ----------

function nodoNegocio() {
  const n = cfg.negocio || {};
  const nodo = {
    '@type': n.tipo || 'Organization',
    '@id': `${DOMINIO}/#negocio`,
    name: n.nombre || cfg.marca,
    url: `${DOMINIO}/`,
  };
  if (cfg.logo) nodo.logo = abs(cfg.logo);
  if (n.imagen || cfg.og_imagen_defecto) nodo.image = abs(n.imagen || cfg.og_imagen_defecto);
  if (n.descripcion || cfg.descripcion) nodo.description = n.descripcion || cfg.descripcion;
  if (n.telefono) nodo.telephone = n.telefono;
  if (n.email) nodo.email = n.email;
  if (n.direccion) nodo.address = { '@type': 'PostalAddress', ...Object.fromEntries(Object.entries({
    streetAddress: n.direccion.calle, addressLocality: n.direccion.ciudad, addressRegion: n.direccion.region,
    postalCode: n.direccion.codigo_postal, addressCountry: n.direccion.pais,
  }).filter(([, v]) => v)) };
  if (n.geo?.lat && n.geo?.lng) nodo.geo = { '@type': 'GeoCoordinates', latitude: n.geo.lat, longitude: n.geo.lng };
  if (n.horario?.length) nodo.openingHours = n.horario;
  if (n.area_servida?.length) nodo.areaServed = n.area_servida;
  if (n.precio_rango) nodo.priceRange = n.precio_rango;
  if (n.redes?.length) nodo.sameAs = n.redes;
  if (n.fundacion) nodo.foundingDate = n.fundacion;
  return nodo;
}

function nodoPersona(clave) {
  const a = AUTORES[clave];
  if (!a) return null;
  const u = autorUrl(clave);
  return Object.fromEntries(Object.entries({
    '@type': 'Person', '@id': `${DOMINIO}/#autor-${clave}`, name: a.nombre, jobTitle: a.cargo, url: u ? abs(u) : undefined,
    image: a.foto ? abs(a.foto) : undefined, sameAs: a.redes?.length ? a.redes : undefined, knowsAbout: a.sabe_de?.length ? a.sabe_de : undefined,
    worksFor: { '@id': `${DOMINIO}/#negocio` },
  }).filter(([, v]) => v !== undefined));
}

function jsonld(p, faq) {
  const url = abs(p.url);
  const g = [
    { '@type': 'WebSite', '@id': `${DOMINIO}/#website`, url: `${DOMINIO}/`, name: cfg.marca, inLanguage: cfg.idioma, publisher: { '@id': `${DOMINIO}/#negocio` } },
    nodoNegocio(),
  ];
  const tipoPagina = { pilar: 'CollectionPage', blog: 'CollectionPage', contacto: 'ContactPage', nosotros: 'AboutPage', autor: 'ProfilePage' }[p.tipo] || 'WebPage';
  const pagina = { '@type': tipoPagina, '@id': `${url}#webpage`, url, name: p.datos.titulo_seo || p.datos.titulo, isPartOf: { '@id': `${DOMINIO}/#website` }, inLanguage: cfg.idioma };
  if (p.datos.descripcion) pagina.description = p.datos.descripcion;
  if (p.datos.imagen) pagina.primaryImageOfPage = { '@type': 'ImageObject', url: abs(p.datos.imagen) };
  if (p.url === '/') pagina.about = { '@id': `${DOMINIO}/#negocio` };
  const m = migasDatos(p);
  if (m.length) {
    pagina.breadcrumb = { '@id': `${url}#migas` };
    g.push({ '@type': 'BreadcrumbList', '@id': `${url}#migas`, itemListElement: m.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.nombre, item: abs(x.url) })) });
  }
  g.splice(2, 0, pagina);
  if (p.tipo === 'articulo') {
    const art = {
      '@type': 'BlogPosting', '@id': `${url}#articulo`, headline: p.datos.titulo, description: p.datos.descripcion,
      datePublished: p.datos.fecha, dateModified: p.datos.actualizado || p.datos.fecha, inLanguage: cfg.idioma,
      mainEntityOfPage: { '@id': `${url}#webpage` }, publisher: { '@id': `${DOMINIO}/#negocio` },
      articleSection: p.silo ? siloInfo(p.silo).nombre : undefined, image: p.datos.imagen ? abs(p.datos.imagen) : undefined,
      author: p.datos.autor && AUTORES[p.datos.autor] ? { '@id': `${DOMINIO}/#autor-${p.datos.autor}` } : { '@id': `${DOMINIO}/#negocio` },
      about: p.datos.keyword ? { '@type': 'Thing', name: p.datos.keyword } : undefined,
    };
    g.push(Object.fromEntries(Object.entries(art).filter(([, v]) => v !== undefined && v !== '')));
    if (!p.datos.fecha) avisar(`${rel(p.archivo)}: artículo sin "fecha".`);
  }
  if (p.datos.autor && AUTORES[p.datos.autor]) g.push(nodoPersona(p.datos.autor));
  if (p.tipo === 'autor') {
    const clave = basename(p.url.replace(/\/$/, ''));
    const persona = nodoPersona(clave);
    if (persona) { pagina.mainEntity = { '@id': persona['@id'] }; if (!g.some((n) => n['@id'] === persona['@id'])) g.push(persona); }
    else avisar(`${rel(p.archivo)}: no hay autor "${clave}" en sitio.json.`);
  }
  if (p.datos.servicio) {
    g.push(Object.fromEntries(Object.entries({
      '@type': 'Service', '@id': `${url}#servicio`, name: p.datos.servicio, serviceType: p.datos.servicio, description: p.datos.descripcion,
      provider: { '@id': `${DOMINIO}/#negocio` }, areaServed: cfg.negocio?.area_servida?.length ? cfg.negocio.area_servida : undefined, url,
    }).filter(([, v]) => v !== undefined)));
  }
  if (faq.length) {
    g.push({ '@type': 'FAQPage', '@id': `${url}#preguntas`, mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.pregunta, acceptedAnswer: { '@type': 'Answer', text: f.respuesta } })) });
  }
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': g }).replace(/</g, '\\u003c')}</script>`;
}

// ---------- Head ----------

function head(p, faq) {
  const tituloSeo = p.datos.titulo_seo || (p.tipo === 'inicio' ? (p.datos.titulo || cfg.marca) : `${p.datos.titulo}${SEP}${cfg.marca}`);
  const canonical = abs(p.url);
  const og = abs(p.datos.imagen_og || p.datos.imagen || cfg.og_imagen_defecto);
  const lineas = [
    `<title>${escapar(tituloSeo)}</title>`,
    p.datos.descripcion ? `<meta name="description" content="${escapar(p.datos.descripcion)}">` : '',
    p.url !== '/404.html' ? `<link rel="canonical" href="${canonical}">` : '',
    `<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
    cfg.color_tema ? `<meta name="theme-color" content="${escapar(cfg.color_tema)}">` : '',
    `<meta property="og:type" content="${p.tipo === 'articulo' ? 'article' : 'website'}">`,
    `<meta property="og:title" content="${escapar(p.datos.titulo || tituloSeo)}">`,
    p.datos.descripcion ? `<meta property="og:description" content="${escapar(p.datos.descripcion)}">` : '',
    og ? `<meta property="og:image" content="${escapar(og)}">` : '',
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:locale" content="${escapar(cfg.locale_og || cfg.idioma.replace('-', '_'))}">`,
    `<meta property="og:site_name" content="${escapar(cfg.marca)}">`,
    p.tipo === 'articulo' && p.datos.fecha ? `<meta property="article:published_time" content="${escapar(p.datos.fecha)}">` : '',
    p.tipo === 'articulo' && (p.datos.actualizado || p.datos.fecha) ? `<meta property="article:modified_time" content="${escapar(p.datos.actualizado || p.datos.fecha)}">` : '',
    `<meta name="twitter:card" content="summary_large_image">`,
    `<link rel="sitemap" type="application/xml" href="/sitemap.xml">`,
    jsonld(p, faq),
  ];
  return lineas.filter(Boolean).join('\n');
}

// ---------- Construir ----------

if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
if (existsSync(PUBLICO)) cpSync(PUBLICO, DIST, { recursive: true });
else avisar('No hay carpeta publico/: no se copiaron CSS, JS ni imágenes.');

const keywords = new Map();
const pendientes = [];
const exportar = [];
let desconocidos = new Set();

for (const p of paginas) {
  let cuerpo = p.cuerpo;
  if (p.tipo === 'pilar') {
    const lista = listaArticulos(p.silo);
    cuerpo = cuerpo.includes('<!-- cuva:lista-articulos -->')
      ? cuerpo.replace('<!-- cuva:lista-articulos -->', lista)
      : cuerpo + (lista ? `\n<section class="cuva-silo-indice">\n<h2>${escapar(siloInfo(p.silo).titulo_indice || TEXTOS.en_este_silo)}</h2>\n${lista}\n</section>` : '');
  }
  if (cuerpo.includes('<!-- cuva:blog -->')) cuerpo = cuerpo.replace('<!-- cuva:blog -->', blogIndice());
  if (p.borrador) cuerpo = `<p class="cuva-aviso-borrador" role="note">${escapar(TEXTOS.borrador)}</p>\n${cuerpo}`;

  const h1s = (cuerpo.match(/<h1\b/gi) || []).length;
  if (h1s !== 1 && p.archivo) avisar(`${rel(p.archivo)}: tiene ${h1s} h1 (debe tener 1).`);
  const faq = faqDe(cuerpo);

  if (p.datos.keyword && !p.noindex) {
    const k = p.datos.keyword.toLowerCase().trim();
    if (keywords.has(k)) avisar(`Palabra clave repetida "${p.datos.keyword}" en ${keywords.get(k)} y ${p.url}: compiten entre sí.`);
    else keywords.set(k, p.url);
  }
  if (['articulo', 'pilar', 'servicio'].includes(p.tipo) && !p.datos.keyword && !p.noindex) avisar(`${p.url}: sin "keyword".`);
  const d = p.datos.descripcion || '';
  if (d && (d.length < 110 || d.length > 170)) avisar(`${p.url}: la descripción tiene ${d.length} caracteres (meta: 120 a 160).`);

  const plantilla = plantillaPara(p.tipo);
  let metaArt = metaArticulo(p);
  if (metaArt && cuerpo.includes('<!-- cuva:meta -->')) { cuerpo = cuerpo.replace('<!-- cuva:meta -->', metaArt); metaArt = ''; }
  else if (metaArt && !/\{\{\s*meta_articulo\s*\}\}/.test(plantilla) && /<\/h1>/i.test(cuerpo)) { cuerpo = cuerpo.replace(/<\/h1>/i, (x) => `${x}\n${metaArt}`); metaArt = ''; }

  const valores = {
    idioma: cfg.idioma, head: head(p, faq), titulo: escapar(p.datos.titulo || ''), descripcion: escapar(d),
    canonical: abs(p.url), url: p.url, tipo: p.tipo, silo: p.silo || '', marca: escapar(cfg.marca),
    color_tema: escapar(cfg.color_tema || ''), anio: String(new Date().getFullYear()), version,
    menu: menu(p), pie_silos: pieSilos(), migas: migas(p), relacionados: relacionados(p),
    meta_articulo: metaArt, caja_autor: ['articulo', 'servicio'].includes(p.tipo) ? cajaAutor(p) : '',
    contenido: cuerpo,
  };
  let html = plantilla.replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (todo, k) => {
    if (k in valores) return valores[k];
    desconocidos.add(k);
    return '';
  });
  if (!/\{\{\s*head\s*\}\}/.test(plantilla)) avisar(`La plantilla de "${p.tipo}" no tiene {{head}}: faltan título, metas y datos estructurados.`);
  // El contenido no debe traer marcadores {{...}} sin resolver
  html = html.replace(/\{\{\s*[a-z_]+\s*\}\}/g, '');

  const destino = p.url === '/404.html' ? join(DIST, '404.html') : join(DIST, ...p.url.split('/').filter(Boolean), 'index.html');
  mkdirSync(join(destino, '..'), { recursive: true });
  writeFileSync(destino, html);

  const pend = marcadores(quitarEtiquetas(cuerpo));
  if (pend.length) pendientes.push({ url: p.url, marcadores: pend });
  if (banderas.has('--exportar') && !p.noindex) {
    exportar.push({ url: p.url, url_completa: abs(p.url), tipo: p.tipo, silo: p.silo, slug: basename(p.url.replace(/\/$/, '')) || 'inicio',
      titulo: p.datos.titulo, titulo_seo: p.datos.titulo_seo || null, descripcion: d, keyword: p.datos.keyword || null,
      fecha: p.datos.fecha || null, actualizado: p.datos.actualizado || null, autor: p.datos.autor || null,
      imagen: p.datos.imagen || null, imagen_alt: p.datos.imagen_alt || null, html: cuerpo });
  }
}
if (desconocidos.size) avisar(`Marcadores de plantilla que no conozco (quedaron vacíos): ${[...desconocidos].map((k) => `{{${k}}}`).join(', ')}.`);

// ---------- sitemap, robots, llms ----------

const indexables = paginas.filter((p) => !p.noindex).sort((a, b) => a.url.localeCompare(b.url));
const lastmod = (p) => p.datos.actualizado || p.datos.fecha || p.mtime;
writeFileSync(join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexables.map((p) => `  <url><loc>${abs(p.url)}</loc><lastmod>${lastmod(p)}</lastmod></url>`).join('\n')}\n</urlset>\n`);

if (existsSync(join(PUBLICO, 'robots.txt'))) avisar('Se usó publico/robots.txt tal cual. Revisa que apunte al sitemap y que no bloquee buscadores.');
else {
  const ia = cfg.rastreadores_ia || {};
  const bloques = ['# robots.txt generado por CUVA Solutions Web Skill', '# Buscadores y rastreadores de búsqueda de IA (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot): permitidos.', 'User-agent: *', 'Allow: /', ''];
  if (ia.entrenamiento === false) {
    bloques.push('# La persona decidió no permitir el uso del sitio para entrenar modelos de IA.');
    for (const b of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'meta-externalagent']) bloques.push(`User-agent: ${b}`, 'Disallow: /', '');
  }
  if (ia.busqueda === false) avisar('"busqueda": false en rastreadores_ia no se aplica: bloquear la búsqueda de IA saca al sitio de las respuestas. Si de verdad lo quiere, escribe publico/robots.txt a mano.');
  bloques.push(`Sitemap: ${DOMINIO}/sitemap.xml`, '');
  writeFileSync(join(DIST, 'robots.txt'), bloques.join('\n'));
}

if (cfg.llms_txt) {
  const linea = (p) => `- [${p.datos.titulo}](${abs(p.url)})${p.datos.descripcion ? `: ${p.datos.descripcion}` : ''}`;
  const base = ['/', '/nosotros/', '/contacto/'].map((u) => porUrl.get(u)).filter((p) => p && !p.noindex);
  const partes = [`# ${cfg.marca}`, '', `> ${cfg.descripcion || cfg.negocio?.descripcion || ''}`.trim(), '', '## Páginas principales', ...base.map(linea), ''];
  for (const s of cfg.silos) {
    const pp = pilar(s.slug);
    const arts = delSilo(s.slug);
    if (!pp && !arts.length) continue;
    partes.push(`## ${s.nombre}`, ...(pp && !pp.noindex ? [linea(pp)] : []), ...arts.map(linea), '');
  }
  writeFileSync(join(DIST, 'llms.txt'), partes.join('\n'));
}

const CONSTRUCCION = join(dirname(DIST), '.construccion');
mkdirSync(CONSTRUCCION, { recursive: true });
writeFileSync(join(CONSTRUCCION, 'mapa.json'), JSON.stringify({
  generado: new Date().toISOString(), dominio: DOMINIO, idioma: cfg.idioma,
  silos: cfg.silos.map((s) => ({ slug: s.slug, nombre: s.nombre, pilar: pilar(s.slug)?.url || null, keyword: pilar(s.slug)?.datos.keyword || null })),
  paginas: paginas.map((p) => ({ url: p.url, tipo: p.tipo, silo: p.silo, titulo: p.datos.titulo || '', keyword: p.datos.keyword || null, pregunta: p.datos.pregunta || null, noindex: p.noindex, borrador: p.borrador, archivo: p.archivo ? rel(p.archivo) : null })),
}, null, 2));
if (banderas.has('--exportar')) writeFileSync(join(CONSTRUCCION, 'contenido.json'), JSON.stringify(exportar, null, 2));

// ---------- Resumen ----------

const articulosPorSilo = cfg.silos.map((s) => ({ s, n: delSilo(s.slug).length, pilar: !!pilar(s.slug) }));
console.log(`\nSitio construido en ${relative(process.cwd(), DIST) || '.'}`);
console.log(`Páginas: ${paginas.length} (${indexables.length} se indexan)`);
for (const { s, n, pilar: tienePilar } of articulosPorSilo) console.log(`  ${tienePilar ? '✓' : '✗'} ${s.nombre}: pilar ${tienePilar ? 'sí' : 'falta'}, ${n} artículos${n < 10 ? ' (meta: 10 o más)' : ''}`);
if (cfg.silos.length < 5) avisar(`El sitio tiene ${cfg.silos.length} silos (meta: 5 o más).`);
for (const { s, pilar: t } of articulosPorSilo) if (!t) avisar(`El silo "${s.slug}" no tiene pilar (contenido/${s.slug}/index.html).`);
if (pendientes.length) {
  console.log(`\nMarcadores sin llenar en ${pendientes.length} páginas:`);
  for (const x of pendientes.slice(0, 30)) console.log(`  ${x.url}: ${x.marcadores.join(' ')}`);
}
if (avisos.length) { console.log(`\nAvisos (${avisos.length}):`); for (const a of avisos) console.log(`  · ${a}`); }
console.log('\nSiguiente paso: node scripts/auditar-seo.mjs ' + (relative(process.cwd(), DIST) || '.') + '\n');

// ---------- Servidor local ----------

if (banderas.has('--servir')) {
  const tipos = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.webm': 'video/webm' };
  createServer((req, res) => {
    let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let archivo = join(DIST, ruta);
    if (!archivo.startsWith(DIST)) { res.writeHead(403); return res.end(); }
    if (existsSync(archivo) && statSync(archivo).isDirectory()) {
      if (!ruta.endsWith('/')) { res.writeHead(301, { Location: ruta + '/' }); return res.end(); }
      archivo = join(archivo, 'index.html');
    }
    if (!existsSync(archivo)) {
      const e404 = join(DIST, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(existsSync(e404) ? readFileSync(e404) : 'No encontrado');
    }
    res.writeHead(200, { 'Content-Type': tipos[extname(archivo).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(readFileSync(archivo));
  }).listen(puerto, () => console.log(`Sitio en http://localhost:${puerto}  (Ctrl+C para cerrar)\n`));
}
