// lib/html.mjs: utilidades sin dependencias para leer HTML generado o descargado.
// No es un parser completo: está pensado para medir SEO (títulos, metas, enlaces, JSON-LD, texto).

export const decodificar = (s = '') =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

export const escapar = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function quitarEtiquetas(html = '') {
  return decodificar(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

export const contarPalabras = (texto = '') => (texto.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;

export function atributos(etiqueta = '') {
  const attrs = {};
  const re = /([^\s=<>"'\/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  const cuerpo = etiqueta.replace(/^<\s*[\w:-]+/, '').replace(/\/?>$/, '');
  let m;
  while ((m = re.exec(cuerpo))) attrs[m[1].toLowerCase()] = decodificar(m[2] ?? m[3] ?? m[4] ?? '');
  return attrs;
}

export function etiquetas(html, nombre) {
  const re = new RegExp(`<${nombre}\\b[^>]*>`, 'gi');
  return (html.match(re) || []).map(atributos);
}

export function meta(html, clave, valor) {
  const t = etiquetas(html, 'meta').find((a) => (a[clave] || '').toLowerCase() === valor.toLowerCase());
  return t ? t.content ?? '' : null;
}

export function linkRel(html, rel) {
  const t = etiquetas(html, 'link').find((a) => (a.rel || '').toLowerCase().split(/\s+/).includes(rel));
  return t ? t.href ?? '' : null;
}

export function titulo(html) {
  const m = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return m ? quitarEtiquetas(m[1]) : null;
}

export function idioma(html) {
  const m = html.match(/<html\b[^>]*>/i);
  return m ? atributos(m[0]).lang || null : null;
}

export function encabezados(html) {
  const lista = [];
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html))) lista.push({ nivel: Number(m[1]), texto: quitarEtiquetas(m[2]) });
  return lista;
}

export function enlaces(html) {
  const lista = [];
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const a = atributos(`<a ${m[1]}>`);
    if (a.href === undefined) continue;
    lista.push({ href: a.href, texto: quitarEtiquetas(m[2]) || a['aria-label'] || a.title || '', rel: (a.rel || '').toLowerCase() });
  }
  return lista;
}

export function imagenes(html) {
  return etiquetas(html, 'img');
}

export function jsonLd(html) {
  const bloques = [];
  const re = /<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try { bloques.push({ ok: true, datos: JSON.parse(m[1].trim()) }); }
    catch (e) { bloques.push({ ok: false, error: e.message }); }
  }
  return bloques;
}

export function tiposJsonLd(bloques) {
  const tipos = new Set();
  const visitar = (n) => {
    if (Array.isArray(n)) return n.forEach(visitar);
    if (!n || typeof n !== 'object') return;
    const t = n['@type'];
    if (t) [].concat(t).forEach((x) => tipos.add(x));
    Object.values(n).forEach(visitar);
  };
  bloques.filter((b) => b.ok).forEach((b) => visitar(b.datos));
  return [...tipos].sort();
}

export function bloque(html, etiqueta) {
  const m = html.match(new RegExp(`<${etiqueta}\\b[^>]*>([\\s\\S]*)<\\/${etiqueta}>`, 'i'));
  return m ? m[1] : null;
}

// Quita del HTML los elementos cuya etiqueta de apertura tiene una clase dada (maneja anidado simple del mismo tipo).
export function quitarPorClase(html, clase) {
  const re = new RegExp(`<(\\w+)\\b[^>]*class\\s*=\\s*["'][^"']*\\b${clase}\\b[^"']*["'][^>]*>`, 'i');
  let salida = html;
  for (let i = 0; i < 50; i++) {
    const m = re.exec(salida);
    if (!m) break;
    const tag = m[1].toLowerCase();
    let pos = m.index + m[0].length, nivel = 1;
    const reTag = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    reTag.lastIndex = pos;
    let t;
    while (nivel > 0 && (t = reTag.exec(salida))) {
      if (t[0][1] === '/') nivel--; else if (!t[0].endsWith('/>')) nivel++;
      pos = reTag.lastIndex;
    }
    salida = salida.slice(0, m.index) + ' ' + salida.slice(pos);
  }
  return salida;
}

// Devuelve el HTML interior de cada elemento cuya etiqueta de apertura tiene la clase dada, en orden.
export function contenidoPorClase(html, clase) {
  const salida = [];
  const re = new RegExp(`<(\\w+)\\b[^>]*class\\s*=\\s*["'][^"']*\\b${clase}\\b[^"']*["'][^>]*>`, 'gi');
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase();
    const inicio = m.index + m[0].length;
    const reTag = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    reTag.lastIndex = inicio;
    let nivel = 1, t, fin = html.length;
    while (nivel > 0 && (t = reTag.exec(html))) {
      if (t[0][1] === '/') nivel--; else if (!t[0].endsWith('/>')) nivel++;
      if (nivel === 0) fin = t.index;
    }
    salida.push(html.slice(inicio, fin));
  }
  return salida;
}

// Marcadores pendientes: [TEXTO EN MAYÚSCULAS] con al menos 3 caracteres.
export function marcadores(texto = '') {
  return [...new Set(texto.match(/\[[A-ZÁÉÍÓÚÜÑ0-9][A-ZÁÉÍÓÚÜÑ0-9 ,.:;\/()'"¿?¡!+-]{2,}\]/g) || [])];
}

export const ANCLAS_GENERICAS = ['clic aquí', 'click aquí', 'haz clic aquí', 'aquí', 'leer más', 'lee más', 'ver más', 'más información', 'click here', 'read more', 'here', 'saber más'];
