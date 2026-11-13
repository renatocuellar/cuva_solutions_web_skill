# 04. Calidad y publicación

Lee este archivo cuando el sitio ya esté construido: en la revisión antes de entregar y en la publicación con QR. Tiene tres partes: la lista de calidad que recorres antes de entregar, cómo revisar según dónde trabajes, y la publicación paso a paso con dominio, DNS, Search Console y QR. Lo técnico de SEO y AEO (head, datos estructurados, robots, sitemap, velocidad) está explicado en `07-seo-tecnico-y-aeo.md`; aquí se comprueba.

La lista de calidad empieza por la pregunta que más le importa a la persona: ¿se ve propio? Su sitio se diseñó desde cero con su identidad y con la referencia que eligió en Pinterest, así que lo primero es comprobar que eso se nota. Un sitio rápido y sin errores que parece plantilla no cumple lo que pidió. Después vienen las comprobaciones técnicas.

Los pasos de publicación están escritos para la persona, que no es técnica. Dáselos tal cual, cambiando solo el nombre de su carpeta, su dominio y su servicio. Cuando una palabra técnica aparezca por primera vez (DNS, caché, SSL), explícala en media línea.

## Contenido

1. Lista de calidad antes de entregar (empieza por "¿Se ve propio?", sección 1.1)
2. Cómo revisar en Claude Code (con la vista previa o, si no está, con `scripts/revisar-sitio.mjs`)
3. Cómo revisar si trabajas en claude.ai (archivos que se guardan junto al HTML y lista de revisión para la persona)
4. Versionado con `?v=` para que se vean los cambios
5. Antes de publicar: preparar la carpeta
6. Opción A: Netlify Drop (arrastrar la carpeta)
7. Opción B: Hostinger (con subdominio y SSL)
8. Opción C: Vercel
9. Conectar un dominio o un subdominio
10. Si dice que no se encuentra el sitio
11. QR con logo que se lea bien
12. Después de publicar (incluye el alta en Google Search Console y Bing)

---

## 1. Lista de calidad antes de entregar

No entregues ni publiques hasta que todo esto pase. Comprueba con datos (los fragmentos de código de abajo se pegan en la consola del navegador o los corres tú en la vista previa) y no solo con capturas: una captura puede salir a medio animar y hacerte creer que algo está roto, o que algo roto está bien. En Claude Code, `scripts/revisar-sitio.mjs` (sección 2) mide de una vez el desborde, la consola, los archivos que no cargan, las imágenes rotas, las fuentes, el contenido oculto, Reducir movimiento y JavaScript apagado; lo demás se revisa con los fragmentos y a ojo.

### Lista corta (cópiala en el mensaje de entrega con cada punto marcado)

**¿Se ve propio?** Va primero. Si algo de este bloque falla, el sitio no está terminado aunque todo lo técnico pase.

- [ ] Usa los colores, las tipografías y los elementos gráficos de su marca, y nada que no venga de ella.
- [ ] La animación firma existe, tiene que ver con su logo o con sus elementos y termina en la portada real, con el botón principal a la vista.
- [ ] La referencia se nota en la estructura y en la sensación, pero no se copió.
- [ ] Nada parece plantilla genérica.
- [ ] Los textos y los datos de contacto son reales: los dio la persona o ella los aprobó; no hay nada inventado y lo que falta es un marcador visible.

**¿Funciona bien?**

- [ ] Sin scroll horizontal en 360 y 375 px.
- [ ] Ningún texto, botón o ilustración encimado ni cortado, en celular y en escritorio (1366 o 1440 px).
- [ ] Botones y enlaces importantes de al menos 44 px de alto.
- [ ] Contraste suficiente en todos los textos.
- [ ] Todas las imágenes con `width` y `height`.
- [ ] Primera carga ligera: meta de menos de 1 MB sin contar videos, máximo 2 MB.
- [ ] LCP (lo que tarda en verse lo principal) menor a 2.5 s en celular.
- [ ] Título, descripción, idioma, URL canónica y `theme-color`.
- [ ] Imagen para compartir de 1200 x 630 que aparece al pegar el enlace en WhatsApp.
- [ ] Favicon e ícono para iPhone.
- [ ] Enlaces de WhatsApp, correo y teléfono probados uno por uno; cada botón de WhatsApp con su propio mensaje.
- [ ] Formulario probado vacío, incompleto y completo (si la persona no quiso formulario, los botones de servicio abren WhatsApp con el nombre del servicio).
- [ ] Con Reducir movimiento activado, todo se ve y funciona.
- [ ] Con JavaScript apagado, todo el contenido se ve.
- [ ] Consola sin errores y sin archivos que no cargan.
- [ ] Ningún marcador [ASÍ] sin llenar, o la persona decidió publicarlo así.
- [ ] Probado en un celular real.

**¿Lo encuentran Google y los asistentes con IA?** En sitios de varias páginas, corre `node scripts/auditar-seo.mjs dist` y copia su resumen en la entrega.

- [ ] `auditar-seo.mjs` sin errores: títulos y descripciones únicos, un `h1` por página, canónicas correctas, datos estructurados válidos, sin enlaces rotos ni páginas huérfanas.
- [ ] El silo se cumple: cada artículo enlaza a su pilar dentro del texto, cada pilar enlaza a todos sus artículos y ningún artículo enlaza a un artículo de otro silo.
- [ ] Mínimo 5 silos con su pilar; los silos con menos de 10 artículos publicados tienen su ola siguiente en el mapa.
- [ ] `sitemap.xml` con todas las páginas que se indexan y ninguna con `noindex`; `robots.txt` apunta al sitemap y no bloquea buscadores ni rastreadores de búsqueda de IA.
- [ ] Cada artículo publicado pasó la revisión de `08-blog-y-articulos.md` (sección 9).
- [ ] El titular y la imagen principal no arrancan invisibles y solo el inicio tiene preloader (`07-seo-tecnico-y-aeo.md`, sección 3).
- [ ] Nombre, dirección, teléfono y horario idénticos en el sitio, en `sitio.json` y en el Perfil de Empresa en Google.

### 1.1 ¿Se ve propio?

La persona no pidió un sitio bonito cualquiera: pidió uno que se sienta de su marca y que tenga algo de lo que le gustó en su referencia. Esta revisión va antes de las técnicas porque, si falla, hay que rediseñar secciones, y eso cambia todo lo demás.

Ten a la vista tres cosas:

- La captura (o capturas) de la referencia que eligió en Pinterest.
- La dirección de arte que la persona aprobó antes de construir (ver `references/01-identidad-y-referencia.md`): qué se tomó de la referencia, qué elementos de su marca se usan y cuál es la animación firma.
- Capturas del sitio en escritorio y en 375 px, sección por sección.

Lo que se construyó debe coincidir con lo que se aprobó. Si algo cambió en el camino, no lo escondas: en la entrega dices qué cambió y por qué.

#### Su marca: colores, tipografías y elementos

- Los colores salen de las variables de `:root`, y esas variables son los HEX de su marca más los neutros que se derivaron de ella en la dirección de arte (fondo, líneas, texto secundario). Fuera de `:root` no debería haber colores escritos a mano, salvo blanco, negro o transparencias de los mismos tokens.
- Las fuentes que se ven son las suyas y cargaron de verdad. Si el archivo de la fuente falla, el navegador pone una genérica sin avisar y la página pierde carácter.
- Sus elementos gráficos (isotipo, formas, trazos, texturas, patrones, ilustraciones, fotos propias) aparecen en varias secciones y cumplen una función: separan, enmarcan, guían la vista o acompañan el movimiento. Un logo en la barra de arriba y nada más no es identidad.
- El logo se respeta: sin deformarlo, sin cambiarle colores fuera de sus versiones oficiales y con aire alrededor. Acompaña; el protagonista es lo que gana el cliente.
- Si el logo en SVG trae el nombre o el lema como texto (sin convertir a curvas), se verá con otra letra en los celulares que no tengan esa fuente. No se le cambia la tipografía: queda tal cual y en pendientes va "pedir el logo en curvas". Para saberlo, `document.querySelectorAll('svg text').length` en la consola (más de 0 es texto).

Para ver qué colores y fuentes usa de verdad la página, baja por toda la página para que cargue todo y pega en la consola:

```js
// Colores y fuentes que usa la página, de más a menos usados
const colores = new Map(), fuentes = new Map();
document.querySelectorAll('body *').forEach((el) => {
  if (!el.getClientRects().length) return;
  const cs = getComputedStyle(el);
  ['color', 'backgroundColor', 'borderTopColor'].forEach((p) => {
    const v = cs[p];
    if (v === 'rgba(0, 0, 0, 0)' || (p === 'borderTopColor' && cs.borderTopWidth === '0px')) return;
    colores.set(v, (colores.get(v) || 0) + 1);
  });
  const f = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
  fuentes.set(f, (fuentes.get(f) || 0) + 1);
});
const aHex = (c) => { if (!c.startsWith('rgb')) return c; const [r, g, b, a] = c.match(/[\d.]+/g).map(Number); return '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('').toUpperCase() + (a !== undefined && a < 1 ? ` al ${Math.round(a * 100)} %` : ''); };
console.table([...colores].sort((x, y) => y[1] - x[1]).map(([c, n]) => ({ color: aHex(c), elementos: n })));
console.table([...fuentes].map(([f, n]) => ({ fuente_declarada: f, elementos: n })));
console.table([...document.fonts].filter((f) => f.status !== 'unloaded').map((f) => ({ fuente_cargada: f.family, peso: f.weight, estado: f.status })));
```

Cómo leerlo:

- Cada color de la primera tabla debe ser uno de los tokens del sitio, blanco, negro o una transparencia de esos. Un morado, un gris azulado o un verde que nadie eligió es una opción por defecto que se coló: cámbialo por el token que corresponde.
- En la tercera tabla, su fuente debe aparecer con estado `loaded`. Si dice `error` o no aparece, la página la está sustituyendo: revisa la ruta del archivo `woff2` o el enlace de Google Fonts.

#### La animación firma

Es el momento que hace que el sitio solo pueda ser de esa marca. Por ejemplo: una entrada que arma el logo pieza por pieza, una forma de su isotipo que se vuelve la cortina entre secciones, un trazo de sus ilustraciones que se dibuja con el scroll, o un ritmo de movimiento que va con su personalidad.

- Existe y aparece donde se acordó en la dirección de arte (casi siempre en la entrada o en el hero).
- Vive dentro de la portada real y termina en ella: el último cuadro es el titular, la imagen protagonista y el botón principal en su lugar, no un recuadro vacío ni el logo solo. Cuando se pudo, el gesto lleva la vista al botón.
- Si la persona no tiene fotos, la imagen protagonista es una composición hecha con las piezas de su marca, no el logo ampliado.
- Puedes explicar en una frase qué tiene que ver con su logo o con sus elementos: "las tres piezas del isotipo llegan desde los bordes y forman el logo". Si la frase sirve para cualquier marca ("las letras aparecen con un desvanecido"), no es firma, es un efecto genérico.
- El carácter del movimiento va con la personalidad acordada: velocidad, curvas y rebote. Una marca serena no rebota; una juguetona no se mueve con la rigidez de un banco.
- Se ve bien en celular, no solo en escritorio.
- Si es una entrada, se salta con un toque y tiene temporizador de respaldo. Con Reducir movimiento se ve su versión quieta, normalmente el logo completo. Las reglas técnicas están en `references/03-animaciones.md`.
- Se usa con medida: puede volver al final (por ejemplo, en el footer) para cerrar el círculo, pero no se repite en cada sección.

#### La referencia: estructura y sensación, no copia

De la referencia se toma lo que se acordó en la dirección de arte: composición, retícula, ritmo, jerarquía tipográfica, tratamiento de imagen y tipo de movimiento. Pon la captura de Pinterest junto al sitio y revisa:

- Lo acordado se reconoce. Si la referencia tenía, por ejemplo, un titular enorme que se cruza con la foto y mucho aire entre bloques, el sitio lo tiene, pero hecho con su marca.
- Nada de la referencia llegó al sitio: ni sus textos, ni sus fotos, ni su logo, ni sus ilustraciones o íconos. Los colores y las tipografías salen de la marca de la persona, no de la referencia.
- No es una copia exacta de la distribución. Proporciones, orden y detalles se adaptaron a su contenido y a su marca.
- Prueba del logo cambiado: imagina el sitio con el logo de quien hizo la referencia. Si pasaría por suyo, se copió de más.
- Prueba del logo tapado: tapa el logo y el nombre en una captura del hero. Si se siente de cualquier negocio y no de esta marca, falta identidad.

#### Nada parece plantilla genérica

Una página se ve de plantilla cuando sus decisiones no salen ni de la marca ni de la referencia: son las opciones por defecto. La señal es la combinación, no una pieza suelta: un título centrado por sí solo está bien si viene de su marca o de su referencia. Señales que la delatan:

- Hero con título centrado, subtítulo gris y dos botones, todo junto, sobre un degradado que no es de su paleta.
- Filas de tres tarjetas iguales con un ícono de librería, un título y dos líneas, repetidas en varias secciones.
- Una palabra en cursiva de acento en casi todos los títulos. Se vuelve muletilla: va en la portada y, a lo mucho, en un título más.
- Íconos genéricos o emojis como protagonistas en lugar de sus propios elementos.
- Fotos de banco de imágenes o ilustraciones de relleno.
- Todo entra igual (el mismo desvanecido hacia arriba en cada bloque) y ninguna sección tiene un gesto propio.
- Una fuente genérica (la del sistema, Inter, Roboto, Arial) cuando su marca usa otra.
- Efectos de moda sin relación con la marca: vidrio esmerilado, brillos neón, partículas, texto con degradado, manchas y ondas decorativas.
- Frases que podrían ser de cualquier negocio: "Soluciones a tu medida", "Llevamos tu negocio al siguiente nivel".

Cada sección debe poder responder: ¿qué de esto viene de su marca y qué de su referencia? Si la respuesta es "nada", rediséñala antes de seguir.

#### Textos reales del cliente

- Cada texto visible sale de la ficha del proyecto o de lo que la persona escribió. Los que redactaste tú (titular, descripción de un servicio) los aprobó en la estructura.
- Nada inventado: testimonios, cifras, clientes, logos, precios, premios, fechas ni datos de contacto. Lo que falte va como marcador visible y se lista (sección 1.17).
- Sin testimonios ni cifras, la prueba y la confianza van juntas en una sola sección, con sus credenciales reales y un solo marcador `[TESTIMONIO REAL DE CLIENTE]`. Nunca una sección vacía.
- Datos de contacto que parecen de relleno (muchos ceros, dígitos repetidos, ejemplo.com) siguen "por confirmar" hasta que la persona los confirme (sección 1.12).
- Ningún texto viene de la referencia ni de una página de ejemplo, y no hay texto de relleno.

```js
// Texto de relleno que se haya quedado
document.body.innerText.match(/lorem ipsum|dolor sit amet|(tu|su) (título|texto|nombre|empresa|negocio) aquí|nombre del cliente|ejemplo\.com|example\.com/gi);
```

Si devuelve `null`, no hay relleno.

#### Para cerrar esta revisión

En el mensaje de entrega, antes de la lista corta, explícale a la persona en tres líneas:

1. Qué se tomó de su referencia (por ejemplo, "la retícula asimétrica y el titular que se cruza con la foto").
2. Qué elementos de su marca se usaron y dónde.
3. Cuál es la animación firma y qué tiene que ver con su logo o sus elementos.

### 1.2 Sin scroll horizontal en 360 y 375 px

Es la queja más común en celular: la página "baila" hacia los lados. Revisa a 375 px (iPhone) y a 360 px (Android más común).

Trampa conocida: en la emulación de celular, `innerWidth` puede crecer junto con lo que se sale de la pantalla (una página de 375 px que se desborda llega a reportar 422). Compara siempre contra el ancho que estás probando, no contra `innerWidth`.

```js
// Pega esto con la vista en 375 px (cambia W a 360 para la otra prueba)
const W = 375;
const se = document.scrollingElement;
console.log('Ancho del documento:', se.scrollWidth, '| Ancho de prueba:', W);
// Culpables: elementos cuyo borde derecho pasa del ancho de prueba
console.table([...document.querySelectorAll('body *')]
  .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > W + 1; })
  .slice(0, 25)
  .map((el) => ({ elemento: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''), derecha: Math.round(el.getBoundingClientRect().right) })));
```

Cómo leerlo: los elementos dentro de una marquesina, un carrusel o una tira girada que están recortados a propósito (su contenedor tiene `overflow: hidden` o `clip`) son normales. Busca los demás. Arreglos que funcionaron en sitios reales:

- `body { overflow-x: clip }` y `html { overflow-x: hidden }`.
- Columnas de grid con `minmax(0, 1fr)` en lugar de `1fr`: un `1fr` no se encoge por debajo de su contenido.
- `min-width: 0` en hijos de flex o grid que tienen textos largos o `white-space: nowrap`.
- Ocultar el botón del menú superior por debajo de 700 px cuando ya existe la barra fija de abajo.
- Contenedores con elementos sticky: `overflow-x: clip`, nunca `hidden` (hidden rompe el sticky).

### 1.3 Textos que no se enciman ni se cortan

Revisa a 375 px y en escritorio, sección por sección. Lo que más se encima:

- Ilustraciones que salen por el borde de una tarjeta: resérvales espacio con margen o padding.
- Notas debajo de los precios o de un formulario: dales su propio bloque con margen superior.
- Botones que se parten en dos líneas: si dos botones no caben lado a lado, apílalos (el principal a todo lo ancho).
- Chips o etiquetas que empujan el botón principal fuera de la primera pantalla: menos chips, textos más cortos, `white-space: nowrap`.
- Nombres largos en tarjetas (redes, servicios): acórtalos o pasa el detalle a un renglón propio con letra chica.
- Decoraciones que en escritorio quedan detrás de la foto principal.
- Logo del menú mal medido. Se mide por la altura del nombre: de 14 a 18 px de alto. Si el lema queda por debajo de 7 px, va la versión compacta (símbolo y nombre) y se anota por validar. Acompaña, no es el protagonista.

En páginas cortas (tarjeta de contacto, gracias), comprueba además que el botón principal se vea completo en la primera pantalla de 375 x 812. En una landing, que el botón de la portada también se vea ahí. El resumen de `scripts/revisar-sitio.mjs` lista los botones que quedan completos en la primera pantalla, con su alto.

### 1.4 Botones y áreas táctiles de al menos 44 px

Botones, enlaces del menú, íconos de redes, campos del formulario y botones de la barra fija: 44 x 44 px como mínimo y al menos 8 px de separación entre uno y otro. Los enlaces dentro de un párrafo no cuentan.

```js
console.table([...document.querySelectorAll('a, button, input, select, textarea, summary, [role="button"]')]
  .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44) && !el.closest('p'); })
  .map((el) => ({ texto: (el.textContent || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 40), alto: Math.round(el.getBoundingClientRect().height), ancho: Math.round(el.getBoundingClientRect().width) })));
```

Revisa a mano lo que salga: un ícono de 24 px puede estar bien si su área clicable (el padding del enlace) llega a 44.

Campos del formulario: letra de 16 px o más. Si es más chica, el iPhone hace zoom al tocar el campo y la página se descuadra.

### 1.5 Contraste

Mínimos (WCAG AA): 4.5 a 1 para texto normal; 3 a 1 para texto grande (24 px o más, o 18.7 px en negrita), íconos y bordes de campos.

Dónde suele fallar:

- El color de marca sobre negro. Ejemplo real con los colores de la landing de referencia (con otra marca, haz la misma cuenta con sus tokens): el azul #1450FB sobre #0A0A0A da 3.4 a 1. Sirve para títulos grandes, no para texto chico; para texto chico sobre oscuro se usa una versión clara del mismo color (#8FB0FF da 9.3 a 1). Blanco sobre ese azul da 5.9 a 1, así que funciona.
- Gris claro sobre blanco o sobre crema, sobre todo en notas pequeñas y en los textos de ejemplo de los campos (placeholder).
- Texto blanco encima de una foto: ponle un degradado oscuro debajo del texto.
- Texto sobre el color de acento (crema, amarillo, verde claro).

Para medir: el inspector de Chrome muestra la proporción al hacer clic en un color, o usa webaim.org/resources/contrastchecker. En la consola:

```js
const lum = (h) => { const c = h.replace('#', '').match(/\w\w/g).map((x) => parseInt(x, 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
ratio('#1450FB', '#0A0A0A'); // 3.37
```

### 1.6 Imágenes con width y height

Toda `<img>` lleva `width` y `height` con su tamaño real (el CSS la escala igual). Así el navegador reserva el espacio y el contenido no brinca mientras cargan. Los contenedores de video llevan `aspect-ratio`.

```js
console.table([...document.images].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).map((i) => ({ imagen: (i.currentSrc || i.src).split('/').pop() })));
```

Para medir si algo brinca (CLS, meta menor a 0.1):

```js
let cls = 0;
new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
// baja por toda la página y luego:
console.log('CLS:', cls.toFixed(3));
```

### 1.7 Peso total

Un sitio muy animado solo se siente pro si abre rápido con datos móviles. Presupuesto base (los sitios de referencia lo cumplen):

| Pieza | Meta |
|---|---|
| Primera carga, sin videos | menos de 1 MB; máximo 2 MB |
| Foto principal (hero) | WebP de 640 px para celular y 1100 px para escritorio, de 40 a 100 KB cada una |
| Otras imágenes | WebP de 30 a 150 KB, con `loading="lazy"`; ninguna arriba de 300 KB |
| Ilustraciones con fondo transparente | WebP de 35 a 90 KB |
| Fuentes | woff2, de 2 a 5 pesos, solo caracteres latinos |
| CSS y JS propios | menos de 150 KB juntos |
| GSAP, ScrollTrigger, SplitText y Lenis | unos 140 KB en total, minificados |
| Clips de video | de 4 a 5 s, mudos, 720 px, de 0.5 a 1.5 MB, con `preload="none"`; solo se descargan al llegar a su sección |
| Video del hero | máximo 1.5 MB, mudo, arranca después de la entrada |
| Imagen para compartir | JPG de 1200 x 630, menos de 300 KB |

Para medir, carga la página sin caché (ventana de incógnito recién abierta o "Disable cache" en la pestaña Network), no hagas scroll y pega:

```js
const kb = (n) => Math.round(n / 1024) + ' KB';
const recursos = performance.getEntriesByType('resource');
const nav = performance.getEntriesByType('navigation')[0];
console.log('Primera carga:', kb(recursos.reduce((s, e) => s + e.transferSize, 0) + (nav ? nav.transferSize : 0)));
console.table(recursos.sort((a, b) => b.transferSize - a.transferSize).slice(0, 10).map((e) => ({ archivo: e.name.split('/').pop().split('?')[0], peso: kb(e.transferSize) })));
```

Si un archivo marca 0 KB, vino de la caché; repite en incógnito. Lo que más pesa casi siempre es una foto sin convertir a WebP o un video que se carga desde el inicio.

### 1.8 LCP: que lo principal aparezca rápido

LCP es el tiempo en que se pinta lo más grande del primer pantallazo (normalmente la foto o el titular del hero). Meta: menos de 2.5 s en celular.

Lo que lo mejora:

- La foto del hero se precarga con `fetchpriority="high"`, en dos tamaños elegidos con `media`, y nunca lleva `loading="lazy"`.
- Las fuentes del primer pantallazo se precargan (dos pesos) y usan `font-display: swap`. En claude.ai, con un solo archivo y las fuentes de Google Fonts, no hay archivos que precargar: van dos `preconnect`, a fonts.googleapis.com y a fonts.gstatic.com (este con `crossorigin`), y `&display=swap` en la URL (`03-animaciones.md`, 2.2).
- El preloader tiene un tope de tiempo (en sitios con SEO, 1.2 s como máximo y solo en el inicio: `07-seo-tecnico-y-aeo.md`, sección 3) y dura menos en visitas repetidas. Si PageSpeed marca un LCP alto por culpa del preloader, acórtalo o quítalo en celular.
- Nada de video pesado como primera pieza.

Para medir en la vista previa:

```js
new PerformanceObserver((l) => { const e = l.getEntries().at(-1); console.log('LCP:', Math.round(e.startTime), 'ms', e.element); }).observe({ type: 'largest-contentful-paint', buffered: true });
```

Con la página ya publicada, el número real sale de pagespeed.web.dev (pestaña Móvil).

### 1.9 Títulos y metadatos

```html
<html lang="es-CO" class="no-js">  <!-- el idioma y país del sitio: es-CO, es-MX, es-CL... -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>[Servicio principal] en [Ciudad] | [Nombre del negocio]</title>
<meta name="description" content="[Una o dos frases claras: qué haces, para quién y cómo contactarte.]">
<link rel="canonical" href="https://[tu-dominio]/">
<meta name="theme-color" content="[COLOR PRINCIPAL EN HEX]">
<meta property="og:type" content="website">
<meta property="og:title" content="[Título para compartir]">
<meta property="og:description" content="[Frase corta para compartir]">
<meta property="og:image" content="https://[tu-dominio]/img/og-imagen.jpg">
<meta property="og:url" content="https://[tu-dominio]/">
<meta property="og:locale" content="es_CO">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
```

Reglas:

- Título de 50 a 60 caracteres, escrito para personas: qué ofreces y quién eres.
- Descripción de 120 a 160 caracteres, en una o dos frases naturales.
- Un solo `h1` por página y los títulos en orden (h2 por sección, h3 dentro).
- `canonical`, `og:url` y `og:image` con la dirección completa con `https://`.
- `theme-color` con el color principal: pinta la barra del navegador en celular.
- Páginas de evento, de gracias o guías para asistentes: `<meta name="robots" content="noindex, follow">`. La página principal de servicios sí se indexa.
- Datos estructurados solo con datos reales. Nunca calificaciones ni reseñas inventadas. En sitios de varias páginas los genera `construir-sitio.mjs` (`07-seo-tecnico-y-aeo.md`, sección 5); en una landing de una página, escribe un `@graph` con `WebSite`, el negocio (`LocalBusiness` con su subtipo, `ProfessionalService` u `Organization`; `Person` si el negocio es una persona) y, si hay preguntas frecuentes visibles, `FAQPage`.
- En sitios de varias páginas no escribas este head a mano: lo arma el script con `{{head}}` y tú solo agregas favicon, fuentes y CSS en la plantilla.
- Si el formulario pide datos personales o la página usa Pixel o analítica, enlaza el aviso de privacidad del negocio. Si no lo tiene, anótalo en pendientes.

Revisión rápida:

```js
const m = (s) => document.querySelector(s)?.getAttribute('content') || document.querySelector(s)?.getAttribute('href') || 'FALTA';
console.table({ title: document.title + ` (${document.title.length})`, description: m('meta[name="description"]') + ` (${m('meta[name="description"]').length})`, lang: document.documentElement.lang || 'FALTA', canonical: m('link[rel="canonical"]'), themeColor: m('meta[name="theme-color"]'), ogImage: m('meta[property="og:image"]'), h1: document.querySelectorAll('h1').length });
```

### 1.10 Imagen para compartir

Es la tarjeta que aparece al mandar el enlace por WhatsApp, Facebook o LinkedIn.

- 1200 x 630 px, JPG, menos de 300 KB (WhatsApp a veces no muestra imágenes más pesadas).
- Logo, una frase corta en letra grande y, si hay, la foto de la persona, con los colores, la tipografía y algún elemento de su marca: es la primera impresión del sitio, así que sigue su misma dirección de arte. Lo importante al centro, porque algunas apps la recortan en cuadro.
- Se hace en Canva con ese tamaño, o en Claude Code con un HTML de 1200 x 630 capturado con Chrome sin ventana (una captura a la vez, cada una con su propio perfil, esperando a que exista el archivo).
- Solo funciona con la página publicada y la URL completa con `https://`.
- Para probarla: pega el enlace en un chat de WhatsApp contigo mismo. WhatsApp y Facebook guardan la vista previa: si cambias la imagen, prueba con el enlace más `?v=2` o usa developers.facebook.com/tools/debug y "Volver a extraer".

### 1.11 Favicon

- `favicon.ico` de 32 x 32 (o 48 x 48) en la raíz del sitio.
- `favicon.svg` con el isotipo (el símbolo, no el logo completo).
- `apple-touch-icon.png` de 180 x 180 con fondo de color sólido: si es transparente, el iPhone le pone fondo negro.
- Herramienta sencilla: realfavicongenerator.net. En claude.ai, con un solo archivo, el favicon puede ir dentro del HTML como SVG: `<link rel="icon" href="data:image/svg+xml,...">`. El `apple-touch-icon.png` sí es un archivo aparte que la persona guarda junto al HTML (tabla de la sección 3).

### 1.12 Enlaces de WhatsApp, correo y teléfono

- WhatsApp: `https://wa.me/` más el número en formato internacional, sin `+`, espacios ni guiones. Con el código de su país (la lista está en `02-estructura-y-copy.md`, sección 8). El mensaje prellenado va codificado: `?text=Hola%2C%20quiero%20cotizar`.
- El número es el mismo en todos los botones, en el JS del formulario y en el LEEME. Confírmalo con la persona; no lo copies de un sitio viejo. Si parece de relleno (muchos ceros o dígitos repetidos), sigue "por confirmar": todos los botones llevarían a un número que no existe.
- Cada botón lleva su propio mensaje prellenado, para que la persona sepa desde dónde le escriben: el de la portada, el de la barra fija y el de cada servicio (con el nombre del servicio).
- Sin formulario (solo WhatsApp): los botones de servicio abren WhatsApp directo con ese mensaje, y la barra fija del celular se esconde al llegar a la sección de contacto. Con formulario: el formulario arma el mensaje y abre `wa.me` con el texto codificado con `encodeURIComponent`.
- Correo: `mailto:correo@dominio.com?subject=Quiero%20cotizar`. Escribe el correo también como texto visible, porque en una computadora sin app de correo configurada el enlace no hace nada.
- Teléfono: `tel:+` con el código de país y el número, sin espacios (`tel:+57[NÚMERO]`).
- Siempre con `target="_blank" rel="noopener"` en WhatsApp.

Para revisarlos todos de un vistazo:

```js
console.table([...document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], a[href^="mailto:"], a[href^="tel:"]')].map((a) => ({ boton: a.textContent.trim().slice(0, 30), destino: decodeURIComponent(a.href) })));
```

Y para encontrar números que parecen de relleno:

```js
// Números con 5 o más ceros seguidos, o con un mismo dígito repetido 6 veces
[...new Set([...document.querySelectorAll('a[href*="wa.me"], a[href^="tel:"]')].map((a) => (a.href.match(/\d{10,13}/) || [''])[0]))]
  .filter((n) => /0{5,}|(\d)\1{5,}/.test(n));
```

Si devuelve una lista vacía, ningún número parece de relleno.

Después, la persona toca cada tipo de botón en su celular: que abra el chat correcto con el mensaje bien escrito, con acentos y signos.

### 1.13 Formulario

Si la persona no quiso formulario, salta esta sección: lo que se prueba son los botones de WhatsApp (1.12).

Pruebas mínimas:

1. Enviar vacío: aparece el error, el foco va al primer campo que falta y el mensaje de error se anuncia (`role="alert"`).
2. Llenar solo los obligatorios: abre WhatsApp con el mensaje.
3. Llenar todo con acentos y ñ (por ejemplo "Peña, Querétaro"): el mensaje sale con acentos, saltos de línea y la fecha en formato largo.
4. El botón de correo abre el correo con asunto y cuerpo.
5. Los botones "Cotizar [servicio]" de la página preseleccionan la opción correcta y llevan al formulario.
6. En celular, el teclado no tapa el botón de enviar y los campos no hacen zoom.

Para que tú lo pruebes sin abrir WhatsApp ni mandar nada a nombre de nadie, intercepta la ventana antes de enviar:

```js
window.open = (url) => { console.log(decodeURIComponent(url)); return null; };
// ahora llena el formulario y dale Enviar: el mensaje completo aparece en la consola
```

El envío real lo hace la persona, a su propio WhatsApp, para ver cómo llega.

### 1.14 Reducir movimiento (prefers-reduced-motion)

Con la opción activada debe pasar esto: no hay preloader, el hero se ve sin animar, no hay scroll suave, nada corre solo (marquesinas, carriles de video, historias), los videos no se reproducen solos y todo el contenido está visible. Menú, preguntas frecuentes y formulario funcionan.

Cómo activarla:

- Mac: Ajustes del Sistema > Accesibilidad > Pantalla > Reducir movimiento.
- iPhone: Ajustes > Accesibilidad > Movimiento > Reducir movimiento.
- Android: Ajustes > Accesibilidad > Quitar animaciones (el nombre cambia según la marca).
- Windows: Configuración > Accesibilidad > Efectos visuales > Efectos de animación, apagado.
- Chrome, sin tocar el sistema: abre las herramientas para desarrolladores, presiona Cmd + Shift + P (Ctrl + Shift + P en Windows), escribe "reduced motion" y elige "Emulate CSS prefers-reduced-motion: reduce".

Recarga la página después de activarla: el código decide al cargar.

### 1.15 JavaScript apagado

Con JS apagado todo el contenido debe verse (sin animación). Si algo queda invisible, un estado oculto se escribió fuera de la clase `.js`. En Chrome: Cmd + Shift + P, escribe "Disable JavaScript", recarga y revisa. Vuelve a activarlo al terminar ("Enable JavaScript").

### 1.16 Consola sin errores

Abre la consola y recarga: no debe haber nada en rojo. Para listar archivos que no cargaron:

```js
console.table(performance.getEntriesByType('resource').filter((e) => e.responseStatus >= 400).map((e) => ({ estado: e.responseStatus, archivo: e.name })));
```

Causas frecuentes:

- **Mayúsculas en nombres de archivo.** La Mac no distingue `Foto.webp` de `foto.webp`; el servidor sí. Funciona en la computadora y se rompe al publicar. Todo en minúsculas.
- Espacios, acentos o ñ en nombres de archivo.
- Rutas de la computadora (`/Users/...`, `C:\...`, `file:///`) en lugar de rutas relativas (`img/foto.webp`).
- Una librería sin versión o que no cargó. El sitio debe verse igual (por la guardia `no-js`/`js` y el try/catch de cada módulo), pero el error se corrige.
- Un atributo `allow` del iframe de YouTube con permisos de más genera advertencias; deja solo los necesarios.

Busca rutas de la computadora en los archivos:

```bash
grep -rn "/Users/\|C:\\\\\|file:///" index.html css js
```

### 1.17 Marcadores sin llenar

Ningún dato inventado llega a publicarse. Busca los marcadores que quedaron:

```js
document.body.innerText.match(/\[[^\]\n]{2,60}\]/g);
```

```bash
grep -n "\[[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9 ,.]*\]" index.html
```

Muéstrale la lista a la persona. Cada marcador se llena con un dato real o se quita la sección. Solo se publica con marcadores si ella lo decide expresamente.

### 1.18 Prueba en un celular real

La emulación no sustituye a un teléfono. Antes de dar por terminado:

- iPhone con Safari y Android con Chrome, con datos móviles y no solo WiFi.
- Gira el celular a horizontal y regresa.
- La barra fija de abajo no tapa botones ni queda debajo de la barra de inicio del iPhone.
- Abre la página desde el enlace de la bio de Instagram y desde un chat de WhatsApp: esos navegadores internos a veces bloquean ventanas nuevas, el portapapeles o descargas como el `.vcf`.
- Si hay botón de guardar contacto, pruébalo en iPhone (abre la ficha) y en Android (se descarga y aparece el aviso).
- Escanea el QR.
- Algunos navegadores de Android (como Samsung Internet) fuerzan modo oscuro: revisa que todo se lea. Ayuda declarar fondos explícitos y `<meta name="color-scheme" content="light">` si el sitio no tiene versión oscura.

Para probar en el celular antes de publicar, lo más sencillo es publicar en una dirección de prueba (Netlify Drop con la sesión iniciada, o un subdominio de prueba) y abrirla desde el teléfono.

---

## 2. Cómo revisar en Claude Code

### Abrir la vista previa

La persona puede pedir: "Abre la vista previa del sitio". Tú creas `.claude/launch.json` con un servidor estático y abres la vista previa:

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "sitio", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8765"], "port": 8765 }
  ]
}
```

Si el servidor falla con "Operation not permitted" (macOS protege el Escritorio y Documentos), copia el sitio a una carpeta temporal y sírvelo desde ahí. `python3 -m http.server` falla antes de leer `--directory`, así que cambia de carpeta dentro del propio comando:

```bash
rsync -a --delete "[carpeta del sitio]/" "[carpeta temporal]/site/"
```

```json
{ "name": "sitio", "runtimeExecutable": "python3", "runtimeArgs": ["-c", "import os; os.chdir('[carpeta temporal]/site'); from http.server import test, SimpleHTTPRequestHandler; test(SimpleHTTPRequestHandler, port=8765, bind='127.0.0.1')"], "port": 8765 }
```

Repite el `rsync` después de cada cambio, porque la vista previa sirve la copia.

### Si no hay vista previa: scripts/revisar-sitio.mjs

Si el panel de vista previa no está disponible o está oculto (si está oculto, las animaciones se congelan), revisa con Chrome sin ventana, es decir, Chrome trabajando en segundo plano sin abrirse en la pantalla. La skill trae un script para eso:

```bash
node "<carpeta de la skill>/scripts/revisar-sitio.mjs" index.html revision
node "<carpeta de la skill>/scripts/revisar-sitio.mjs" direccion-de-arte.html revision-muestra --firma
```

**Sitio de varias páginas:** las rutas empiezan con `/`, así que no se abren bien como archivo. Sirve el sitio con `node "<carpeta de la skill>/scripts/construir-sitio.mjs" mi-sitio --servir` y revisa por dirección: el inicio, una pilar y un artículo de cada plantilla (`http://localhost:4321/`, `http://localhost:4321/silo/`, `http://localhost:4321/silo/articulo/`).

`<carpeta de la skill>` es la ruta que Claude Code muestra al cargar la skill ("Base directory for this skill"). El primer dato es el `index.html`, la carpeta del sitio o una dirección `https://`; el segundo, la carpeta donde se guarda la revisión. Requiere Node 18 o más y Google Chrome (si no lo encuentra, usa Microsoft Edge o Chromium; si Chrome está en otro lugar, se indica con la variable `CHROME_PATH`). No instala nada y borra al terminar el perfil temporal de Chrome que crea. Si el sitio está en el Escritorio o en Documentos y Chrome no lo puede abrir, el script lo avisa: copia la carpeta a otro lugar y vuelve a correrlo.

Qué hace, en 375 x 812 (celular, táctil) y en 1440 x 900 (escritorio):
- Espera a que termine la entrada (hasta 9 s si una capa fija sigue tapando la página) y captura la primera pantalla.
- Baja por toda la página para disparar las animaciones y captura la página completa y por tramos.
- Mide desborde de lado, errores de consola, archivos que no cargaron, imágenes rotas, fuentes que fallaron, contenido que se quedó oculto (transparente, invisible o atorado debajo de su máscara), las librerías cargadas (y si Lenis quedó activo) y los botones completos en la primera pantalla.
- Repite en celular con Reducir movimiento y con JavaScript apagado: ahí todo debe verse desde el principio, sin bajar.

Opciones: `--firma` guarda la portada a los 0.3, 0.8, 1.4, 2.2, 3.2 y 4.5 s en `firma/` (para ver la firma a media animación); `--sin-tramos` no guarda los tramos; `--solo-celular` se salta el escritorio.

Cómo leer el resultado:
- En la consola sale un resumen en español: "bien" o "REVISAR" por cada punto, y cuánto mide la página en pantallas de celular.
- `resultado.json` tiene el detalle: cada elemento que se sale o se quedó oculto aparece con su etiqueta, sus clases y su texto, para encontrarlo en el código.
- Las capturas no se dan por buenas sin verlas: abre la primera pantalla, los tramos y los cuadros de la firma y míralos. El script encuentra errores técnicos; si se ve propio, si algo se encima o si la firma corta una pieza solo se ve en la imagen.
- La carpeta de la revisión es de trabajo: no se sube al servidor (sección 5).

**Capturas de páginas largas.** Chrome no pinta más de unos 16,384 px de alto en una sola captura. En celular, a doble resolución, eso es una página de unos 8,000 px: lo que pasa de ahí se repite desde arriba y parece que la página está duplicada. Por eso el script toma la captura completa a resolución normal (y más chica si ni así cabe) y además guarda la página por tramos de dos pantallas en `tramos/`, que son las que se leen de cerca. Si haces capturas a mano de una página larga, hazlas por tramos o a resolución normal.

### Tamaños que revisas

| Tamaño | Para qué |
|---|---|
| 375 x 812 (preset de celular) | iPhone; la revisión principal |
| 360 x 780 | Android más común |
| 768 x 1024 | Tableta, donde suelen cambiar las cuadrículas |
| 1366 x 768 y 1440 x 900 | Escritorio: decoraciones, sticky y columnas |

Recarga la página cada vez que cambies de tamaño: el código decide al cargar si hay mouse (efectos de cursor, magnéticos, inclinación) o pantalla táctil. Al terminar, regresa la vista al tamaño de escritorio.

### Orden de la revisión

1. Carga la página y espera a que termine la entrada. Mira la animación firma completa, en escritorio y en 375 px, y comprueba que termina en la portada real con el botón a la vista.
2. Baja sección por sección con `window.scrollTo({ top: Y, behavior: 'instant' })`. Con `'smooth'` o `'auto'` (si el CSS tiene scroll suave) la captura sale a medio camino.
3. Toma capturas en 375 px y en escritorio de cada sección. Sin vista previa, los pasos 1 a 3 los hace `scripts/revisar-sitio.mjs` (con `--firma` para la entrada); después mira sus capturas.
4. Pon esas capturas junto a la referencia de Pinterest y la dirección aprobada, y pasa la sección 1.1 completa, incluido el fragmento de colores y fuentes. Si algo no se ve propio, corrígelo antes de seguir: lo técnico se revisa sobre el diseño final.
5. Compara las mismas capturas con la lista de la sección 1.3 (textos encimados o cortados).
6. Corre los demás fragmentos de la sección 1: scroll horizontal, áreas táctiles, imágenes sin medidas, peso, LCP, metadatos, enlaces, consola y marcadores.
7. Prueba el formulario con `window.open` interceptado (sección 1.13).

### Animaciones congeladas en la vista previa

Si el panel de vista previa está oculto, la pestaña queda en segundo plano, `requestAnimationFrame` se detiene y las animaciones se quedan a la mitad. No concluyas que algo está roto por una captura. En su lugar:

- Con GSAP, avanza el reloj: llama `gsap.ticker.tick()` varias veces con pausas de medio segundo.
- Sin GSAP, inyecta `<style>*{transition:none!important;animation:none!important}</style>` y agrega a mano las clases finales (`is-in`, `is-visible`, `is-ready`) antes de capturar.
- Revisa estados por JS: `getComputedStyle(el).opacity`, `el.className`.

Lo que sí debes confirmar: aunque la animación no corra, los temporizadores de respaldo muestran el contenido (el intro se quita solo a los pocos segundos y ningún botón queda en opacidad 0). Ver `references/03-animaciones.md`.

Si nada de esto alcanza para ver la animación de verdad, usa `scripts/revisar-sitio.mjs` (arriba): Chrome sin ventana no congela las animaciones.

### Frases que la persona puede usar

- "Pon lado a lado mi referencia y la página, y dime qué tomaste de la referencia y qué es de mi marca."
- "¿Qué parte de la página podría ser de cualquier negocio? Hazla más mía."
- "Revisa la página en 360 y 375 px y dime si algo se sale de la pantalla o se encima."
- "Pasa la lista de calidad completa y dime qué falla."
- "Revisa la consola y dime si hay errores."
- "Mide el peso de la primera carga y el LCP."
- "Prueba el formulario sin abrir WhatsApp y enséñame el mensaje que se enviaría."
- "Enséñame capturas en celular y en escritorio de cada sección."
- "Revisa la página con el script de revisión y enséñame cómo se ve la entrada a media animación."

---

## 3. Cómo revisar si trabajas en claude.ai

En claude.ai no hay navegador: Claude escribe el archivo, pero no lo puede abrir para probarlo. Por eso la revisión se reparte así:

1. **Claude lo dice claramente al entregar.** Por ejemplo: "No pude probar la página en un navegador. Revísala con esta lista y mándame capturas de lo que se vea raro".
2. **La persona descarga el archivo y lo abre en Chrome.** El panel de vista previa de claude.ai puede mostrar la página sin sus fuentes o sin animaciones aunque esté bien hecha. Vale igual para la hoja de muestra (`direccion-de-arte.html`) y para el sitio.
3. **Claude entrega una lista de revisión paso a paso**, escrita para ese sitio: con los nombres reales de sus botones y secciones y lo que debe pasar al tocarlos. La base está abajo.
4. **La persona manda capturas** y Claude corrige con lo que ve en ellas.

Antes de entregar, si tiene ejecución de código, Claude comprueba al menos que el JS no tenga errores de sintaxis (extrae el `<script>` y corre `node --check`) y que ningún contenido quede oculto fuera de `.js`. El orden de entrega es: `index.html` completo, el LEEME y al final esta lista (`03-animaciones.md`, 2.3).

### Archivos que se guardan junto al HTML

Claude entrega un solo archivo HTML. Lo demás lo guarda la persona en la misma carpeta, con los nombres y las carpetas exactas que usa el HTML. Claude se los da en una tabla como esta, con los nombres reales:

| Archivo | Dónde va | Medida | Para qué |
|---|---|---|---|
| `index.html` | En la carpeta del sitio | | La página |
| Fotos, por ejemplo `img/[NOMBRE]-640.webp` y `img/[NOMBRE]-1100.webp` | Carpeta `img` | Las que indique Claude; la principal en 640 y 1100 px de ancho | Las fotos del sitio |
| `img/og-imagen.jpg` | Carpeta `img` | 1200 x 630, JPG de menos de 300 KB | La tarjeta que aparece al mandar el enlace por WhatsApp (1.10) |
| `favicon.ico` | Junto a `index.html` | 32 x 32 o 48 x 48 | El ícono de la pestaña. Si Claude lo puso dentro del HTML como SVG, este archivo no hace falta (1.11) |
| `img/apple-touch-icon.png` | Carpeta `img` | 180 x 180, con fondo de color sólido | El ícono cuando alguien guarda la página en la pantalla de su iPhone |

Con la ejecución de código activa, Claude también puede preparar las fotos: la persona las sube y le pide que se las regrese achicadas, en WebP y con los nombres de la tabla, en un `.zip`.

### Lista de revisión para la persona (base)

Claude la adapta a cada sitio y la entrega con estas palabras o parecidas:

1. Crea una carpeta con el nombre de tu negocio, en minúsculas y sin espacios. Guarda adentro `index.html` y los archivos de la tabla, con esos nombres exactos.
2. Abre Chrome y arrastra `index.html` a una ventana.
3. Abre las herramientas para desarrolladores: Cmd + Option + I en Mac, Ctrl + Shift + I en Windows.
4. Activa el modo celular: Cmd + Shift + M (Ctrl + Shift + M en Windows). Arriba elige "iPhone SE" (375 px) y recarga la página con Cmd + R (Ctrl + R).
5. Mira la entrada completa. Debe pasar esto: [QUÉ SE MUEVE Y CÓMO TERMINA, por ejemplo "se dibuja el trazo, aparece el titular y todo termina con el botón «[BOTÓN PRINCIPAL]» a la vista"]. Si te la perdiste, recarga.
6. Baja despacio por toda la página. En cada sección revisa que nada se salga de lado, que ningún texto se encime o se corte y que todo aparezca (que nada se quede en blanco).
7. Toca cada botón. [BOTÓN] debe abrir WhatsApp con el mensaje "[MENSAJE]". (Claude escribe un renglón por cada botón: portada, barra de abajo, cada servicio y contacto.)
8. Abre y cierra las preguntas frecuentes, y el menú si lo hay.
9. Cambia el ancho a 360 (escríbelo arriba, donde dice 375) y recarga. Repite el paso 6 rápido.
10. Quita el modo celular (Cmd + Shift + M) y revisa la página en tamaño de computadora.
11. Abre la pestaña Console. Si hay algo en rojo, cópialo y pégamelo tal cual.
12. Abre tu referencia de Pinterest a un lado: ¿se siente de tu marca?, ¿reconoces lo que te gustó sin que sea una copia?, ¿la animación de tu logo o de tus elementos se ve bien también en el modo celular? Lo que no te convenza, dímelo con un ejemplo concreto ("aquí se ve genérico", "quiero más de mis formas en esta sección").
13. Mándame capturas: la primera pantalla en modo celular y cualquier cosa que se vea rara. En Mac: Cmd + Shift + 4 y arrastra sobre lo que quieres capturar. En Windows: Windows + Shift + S.

Para la hoja de muestra de la etapa 2 bastan los pasos 2 a 5, el 12 y el 13.

### Revisiones extra en Chrome

- Para correr los fragmentos de código de la sección 1, pégalos en la consola. La primera vez Chrome pide escribir "allow pasting" (o "permitir pegar") para dejarte pegar.
- Para Reducir movimiento y JavaScript apagado, usa los atajos de las secciones 1.14 y 1.15.
- La pestaña Lighthouse da una calificación de velocidad; con la página ya publicada, pagespeed.web.dev da números más reales.

Abierto como archivo local (`file:///`) algunas cosas no funcionan igual que publicado: la vista previa al compartir, el `.vcf` como contacto y ciertos videos. Esas se prueban ya publicadas.

---

## 4. Versionado con ?v= para que se vean los cambios

Los navegadores y muchos hostings (Hostinger lo hace) guardan una copia del CSS y del JS para que la página cargue más rápido. Esa copia se llama caché. Si cambias `styles.css` pero el enlace sigue igual, los visitantes siguen viendo la versión anterior y parece que el cambio no se subió.

En sitios de varias páginas no hace falta hacerlo a mano: usa `?v={{version}}` en la plantilla y `construir-sitio.mjs` pone la fecha y hora de cada construcción. En una landing de un solo archivo, la solución es agregar un número de versión al enlace y cambiarlo en cada cambio:

```html
<link rel="stylesheet" href="css/styles.css?v=20261012">
<script src="js/main.js?v=20261012" defer></script>
```

Reglas:

- Usa la fecha (año, mes, día). Si cambias dos veces el mismo día, agrega una letra: `20261012b`.
- Cada vez que cambies CSS o JS, cambia el `?v=` en `index.html` **y sube también `index.html`**. Si solo subes el CSS, el `index.html` viejo sigue pidiendo la versión vieja.
- Si reemplazas una imagen con el mismo nombre (por ejemplo, una ilustración recortada de nuevo), agrégale `?v=2` donde se usa.
- Lo mismo con la imagen para compartir: WhatsApp y Facebook guardan la anterior (sección 1.10).
- Para ver tus propios cambios sin esperar: recarga forzada (Cmd + Shift + R en Mac, Ctrl + Shift + R en Windows) o ventana de incógnito.
- En un solo archivo HTML (claude.ai) el CSS y el JS van dentro, así que solo aplica a imágenes y videos.
- Netlify y Vercel limpian su caché en cada publicación, pero el `?v=` no estorba y protege de la caché del navegador.

Anota en el LEEME el `?v=` vigente.

---

## 5. Antes de publicar: preparar la carpeta

Revisa esto antes de cualquiera de las tres opciones:

1. **`index.html` en la raíz de la carpeta.** El servidor busca exactamente ese nombre, en minúsculas. Si trabajaste en claude.ai y el archivo se llama `pagina.html`, renómbralo a `index.html`. **En un sitio de varias páginas se publica solo la carpeta `dist/`** que arma `construir-sitio.mjs`: ya trae cada página en su carpeta, `sitemap.xml`, `robots.txt` y los archivos de `publico/`. Nunca subas `contenido/`, `plantillas/`, `investigacion/` ni `.construccion/`.
2. **Nombres de archivo en minúsculas, sin espacios, sin acentos ni ñ:** `foto-portada.webp`, no `Foto Portada.WEBP`.
3. **Rutas relativas** en el HTML y el CSS (`img/foto.webp`), nunca rutas de tu computadora.
4. **Qué no se sube:** la carpeta `qr/`, `.claude/`, carpetas de trabajo (`tools/`, `prompts/`, originales), las carpetas de revisión con capturas (`revision/` y parecidas), la hoja de muestra `direccion-de-arte.html`, la carpeta con las capturas de la referencia de Pinterest (no son tuyas y no deben quedar públicas), videos sin comprimir y archivos de diseño (PSD, AI, Figma). El LEEME se puede quedar fuera; si lo subes, es público, así que no lleva contraseñas ni datos privados.
5. **Archivos ocultos:** `.htaccess` empieza con punto y el Finder lo esconde. Para verlo: Cmd + Shift + punto. Si existe, va en la subida (solo sirve en Hostinger y hostings parecidos).
6. **Para subir en zip:** entra a la carpeta, selecciona su contenido (`index.html`, las carpetas `css`, `js`, `img`, `fonts`, `video` y `vendor`, `favicon.ico` y `.htaccess`), no la carpeta de afuera, y dale clic derecho > Comprimir. Si al extraer aparece una carpeta `__MACOSX`, bórrala: es basura que agrega la Mac.

### Si Claude te ayuda a publicar desde el navegador

- Tú inicias sesión en tus cuentas (hosting, DNS, dominio). Claude nunca escribe tus contraseñas.
- Antes de entrar a un panel, Claude confirma que el navegador conectado es el de tu computadora y no otro equipo con la misma cuenta.
- Claude te avisa antes de borrar, sobrescribir o publicar algo, y espera tu sí.

### ¿Cuál opción elegir?

| | A. Netlify Drop | B. Hostinger | C. Vercel |
|---|---|---|---|
| Para quién | Quien no tiene hosting y quiere publicar hoy | Quien ya paga hosting con su dominio | Quien trabaja en Claude Code o usa GitHub |
| Cómo se sube | Arrastrando la carpeta | Zip por el administrador de archivos | Un comando en Claude Code, o conectando GitHub |
| SSL (candado) | Automático | Gratis, se activa en el panel | Automático |
| `.htaccess` | No funciona (usa `_headers`) | Funciona | No funciona (usa `vercel.json`) |
| Costo | Plan gratis para empezar; revisa sus límites vigentes | Incluido en tu plan | El plan gratis (Hobby) es solo para uso personal no comercial; un sitio de negocio requiere el plan Pro |

---

## 6. Opción A: Netlify Drop (arrastrar la carpeta)

La forma más rápida de tener el sitio en internet, sin configurar nada. Primero la cuenta, después la carpeta: Netlify Drop funciona sin cuenta, pero así el enlace queda protegido con una contraseña temporal y se borra si no lo reclamas pronto.

1. Crea una cuenta gratuita en **netlify.com** (con tu correo o con Google) e inicia sesión.
2. Ya con la sesión iniciada, entra a **app.netlify.com/drop**.
3. Arrastra la carpeta del sitio (la que tiene `index.html` adentro) al recuadro de la página.
4. En unos segundos te da una dirección como `nombre-al-azar-123.netlify.app`. Ábrela en tu celular. Si te pide contraseña o el sitio aparece como privado, entra a su configuración y cámbialo a público.
5. Cambia ese nombre: entra a la configuración del sitio (Site o Project configuration) y busca "Change name". Quedará como `tunegocio.netlify.app`.
6. **Para actualizar:** entra a tu sitio en Netlify > pestaña Deploys y arrastra otra vez la carpeta completa al recuadro de esa página. Siempre la carpeta completa, no solo el archivo que cambió.
7. **Para usar tu dominio:** Domain management > Add a domain y escribe tu dominio o subdominio. Netlify te muestra qué registro crear en tu DNS (sección 9). El candado de seguridad (SSL) se activa solo unos minutos después de que el dominio apunte.

Si el sitio tiene un archivo de contacto `.vcf`, en Netlify no sirve el `.htaccess`. Crea en la raíz un archivo llamado `_headers` (sin extensión) con esto, cambiando el nombre del archivo:

```
/contacto.vcf
  Content-Type: text/vcard; charset=utf-8
  Content-Disposition: inline; filename=contacto.vcf
```

---

## 7. Opción B: Hostinger (con subdominio y SSL)

Es un flujo ya probado con sitios publicados. En hostings con cPanel (Banahosting, Hostgator y la mayoría) los pasos son los mismos con otros nombres: Subdominios, Administrador de archivos dentro de `public_html`, y SSL con AutoSSL o Let's Encrypt. Los nombres de los menús de hPanel cambian a veces; si no encuentras uno, busca la palabra en el buscador del panel.

### 7.1 Si tu DNS no está en Hostinger, crea primero el registro

Si tu dominio usa Cloudflare u otro proveedor para el DNS (sección 9.1 para saberlo), crea el registro A del subdominio **antes** de crear el subdominio en Hostinger y antes de abrirlo en cualquier dispositivo. La IP es la misma que tiene el registro A de tu dominio principal, o la que aparece como IP del sitio en el panel de Hostinger. En Cloudflare, déjalo en **Solo DNS (nube gris)**: con la nube naranja Hostinger no puede emitir el certificado SSL.

Si tu DNS está en Hostinger, al crear el subdominio el registro se crea solo.

### 7.2 Crear el subdominio

1. Entra a hPanel > Sitios web > Administrar (o Panel) en tu dominio.
2. Busca **Subdominios** (suele estar dentro de Dominios).
3. Escribe el nombre, por ejemplo `citas`, y créalo. Su carpeta queda en `public_html/citas`.

Si vas a publicar en el dominio principal (`tunegocio.com`), no necesitas subdominio: la carpeta es `public_html`.

### 7.3 Subir los archivos

1. Ve a **Archivos > Administrador de archivos** y entra a la carpeta del subdominio (`public_html/citas`).
2. Si hay un archivo de bienvenida de Hostinger (por ejemplo `default.php`), bórralo.
3. Usa el botón de subir (flecha hacia arriba) y elige tu zip.
4. Clic derecho sobre el zip > **Extraer**. Cuando pida el nombre de la carpeta, escribe un punto (`.`) para que los archivos queden en la carpeta actual, y acepta **sobrescribir** los existentes.
5. Revisa que `index.html` quedó directo en `public_html/citas`, no dentro de otra carpeta (`public_html/citas/mi-sitio/index.html` no funciona).
6. Borra el zip del servidor.

Si el zip pesa mucho y la subida falla, divídelo en varios (por ejemplo, uno con los videos y otro con lo demás) y extráelos en la misma carpeta. Cuando Claude sube por el navegador, trabaja con zips de menos de 10 MB.

### 7.4 Activar el candado (SSL)

1. En hPanel ve a **Seguridad > SSL**.
2. Instala el certificado gratuito para tu subdominio. Si el DNS ya apunta, se instala solo en unos minutos.
3. Si aparece la opción **Forzar HTTPS**, actívala.
4. Abre `https://citas.tunegocio.com` y revisa que aparezca el candado.

### 7.5 Para actualizar

Sube un zip solo con lo que cambió (o todo) y extráelo con `.` y sobrescribir. Si cambiaste CSS o JS, el zip incluye `index.html` con el `?v=` nuevo (sección 4).

---

## 8. Opción C: Vercel

Conviene si trabajas en Claude Code o ya usas GitHub. Antes de elegirla: el plan gratis (Hobby) de Vercel es solo para proyectos personales no comerciales. El sitio de un negocio de servicios es comercial, así que lo correcto es el plan Pro. Si no quieres pagar, usa Netlify o tu hosting.

### Desde Claude Code (sin GitHub)

1. Crea tu cuenta en vercel.com.
2. Pídele a Claude: "Publica esta carpeta en Vercel".
3. Claude corre `npx vercel login`. Se abre el navegador y tú confirmas el inicio de sesión.
4. Claude corre `npx vercel` en la carpeta del sitio, sin lo que no se sube (sección 5). La primera vez pregunta si quieres configurar el proyecto, en qué cuenta y con qué nombre; es un sitio estático, así que no lleva comando de compilación y la carpeta de salida es la raíz.
5. La primera publicación de un proyecto nuevo ya queda en producción, en `nombre.vercel.app`. Ábrela en tu celular.
6. **Para actualizar:** `npx vercel` sube los cambios a una dirección de prueba; cuando esté bien, `npx vercel --prod` los publica en la dirección principal.

### Desde GitHub

Sube la carpeta a un repositorio y en vercel.com elige Add New > Project > importa ese repositorio. Cada vez que subas cambios a GitHub, Vercel publica solo.

### Dominio

En el proyecto: Settings > Domains > Add y escribe tu dominio o subdominio. Vercel muestra el registro exacto que debes crear (sección 9). Copia el valor tal como aparece.

Si hay un `.vcf`, crea `vercel.json` en la raíz:

```json
{
  "headers": [
    { "source": "/contacto.vcf", "headers": [ { "key": "Content-Type", "value": "text/vcard; charset=utf-8" } ] }
  ]
}
```

Nota para Claude: si haces muchas consultas automáticas seguidas (por ejemplo, un ciclo de `curl`) contra un sitio en Vercel, su protección puede mostrarle a tu computadora un reto de seguridad (error 403). No es que el sitio esté caído; ábrelo en el navegador o desde otra red.

---

## 9. Conectar un dominio o un subdominio

### 9.1 Conceptos en una línea

- **Dominio:** `tunegocio.com`. **Subdominio:** `citas.tunegocio.com`, una dirección extra que no cuesta más.
- **DNS:** la agenda que le dice a internet a qué servidor ir cuando alguien escribe tu dominio.
- **Dónde está tu DNS:** no siempre donde compraste el dominio. En el panel donde lo compraste busca "Nameservers" o "Servidores de nombres": si dicen `cloudflare`, tu DNS está en Cloudflare; si dicen `hostinger` o `dns-parking`, está en Hostinger. Los registros se crean ahí, no en otro lado.

### 9.2 Qué registro crear

| Tu sitio vive en | Dominio principal (`tunegocio.com`) | Subdominio (`citas.tunegocio.com`) |
|---|---|---|
| Hostinger u otro hosting con IP | Registro **A**, nombre `@`, valor: la IP del hosting | Registro **A**, nombre `citas`, valor: la IP del hosting |
| Netlify | El registro que indique Netlify al agregar el dominio | **CNAME**, nombre `citas`, valor: `tusitio.netlify.app` |
| Vercel | El registro **A** que indique Vercel | **CNAME**, nombre `citas`, valor: el que muestre Vercel |

- **A** apunta a una IP (números). **CNAME** apunta a otro nombre. El dominio principal casi nunca acepta CNAME; por eso lleva A.
- Para que `www.tunegocio.com` también funcione, agrega un CNAME `www` hacia tu dominio principal o el que indique tu hosting.
- TTL (tiempo que se guarda la respuesta): déjalo en Automático.

### 9.3 Reglas para no romper nada

- **Crea el registro antes de abrir o probar el subdominio** en cualquier dispositivo (sección 10).
- **Solo agrega.** No borres ni cambies registros MX, TXT o CNAME que ya existan: suelen ser del correo y de verificaciones, y si los tocas el correo deja de funcionar.
- Si ya existe un registro con el mismo nombre (por ejemplo un `www` viejo), edítalo en lugar de crear uno repetido.
- En Cloudflare, el registro va en **Solo DNS (nube gris)**, al menos hasta que el SSL esté activo. Con Hostinger, déjalo así siempre.
- Agregar un registro en un DNS que ya funciona tarda minutos. Cambiar los nameservers de un dominio puede tardar de horas a un par de días.

---

## 10. Si dice que no se encuentra el sitio

| Lo que ves | Causa probable | Qué hacer |
|---|---|---|
| "No se puede acceder a este sitio", `DNS_PROBE_FINISHED_NXDOMAIN` o `ERR_NAME_NOT_RESOLVED` | El DNS todavía no responde, o tu red guardó un "no existe" | Ver los pasos de abajo |
| "Tu conexión no es privada" o sin candado | El certificado SSL todavía no se emite | Espera de 5 a 30 minutos; revisa la nube gris en Cloudflare y que el SSL esté instalado en el panel |
| Página de bienvenida del hosting, "Index of /" o error 403 | No hay `index.html` en la carpeta correcta | Revisa que `index.html` esté directo en la carpeta del subdominio y en minúsculas |
| Error 404 en una sección o imagen | Ruta mal escrita o mayúsculas en el nombre | Corrige el nombre en minúsculas y vuelve a subir |
| La página se ve sin diseño | No se subieron las carpetas `css` o `js`, o las rutas apuntan a otro lado | Sube la carpeta completa y revisa rutas relativas |
| Subiste cambios y no se ven | Caché | Cambia el `?v=`, sube `index.html` y prueba en incógnito |
| El enlace en WhatsApp sale sin imagen | Vista previa guardada o imagen pesada | Sección 1.10 |

### Cuando el DNS no encuentra el sitio

1. **Revisa el registro** en el panel donde de verdad está tu DNS (sección 9.1): nombre correcto, tipo correcto y valor sin espacios.
2. **Prueba con datos móviles.** Apaga el WiFi del celular y ábrelo. Si con datos móviles sí abre, el sitio está bien y es tu red.
3. **Espera unos 30 minutos.** Si alguien abrió el subdominio antes de que existiera el registro, la red (el módem o el proveedor de internet) guarda la respuesta "no existe" por un rato, aunque el registro ya esté creado. A los visitantes nuevos no les pasa, porque nunca preguntaron antes.
4. **Comprueba desde fuera de tu red:** abre dns.google y escribe tu subdominio. Si aparece la IP o el nombre correcto en la respuesta, el DNS ya está bien.
5. Si cambiaste nameservers, la espera puede ser de varias horas.

Nota para Claude: no consultes un subdominio con `dig` o `nslookup` antes de que exista su registro, porque dejas el "no existe" guardado en la red de la persona. Para comprobar, usa el panel del DNS o una consulta DNS sobre HTTPS:

```bash
curl -s -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=citas.tunegocio.com&type=A'
```

---

## 11. QR con logo que se lea bien

### Reglas

- **Apunta a tu dominio propio** (`https://citas.tunegocio.com`), no a un acortador ni a un servicio de "QR dinámico" que cobra mensualidad y se desactiva si dejas de pagar. Así cambias el contenido de la página sin reimprimir.
- **URL corta.** Menos caracteres hacen un QR menos denso, que se lee más rápido y de más lejos. Evita parámetros largos.
- **Corrección de errores nivel H** (recupera hasta 30 % del código). Es obligatoria si pones un logo al centro; sin ella, el logo rompe la lectura.
- **Logo al centro, chico y sobre fondo sólido:** como máximo una cuarta parte del ancho del QR, dentro de un cuadro limpio (blanco o del color de marca) que no deje módulos cortados. Nunca encima de los tres cuadros de las esquinas.
- **Contraste:** módulos oscuros sobre fondo claro. No lo inviertas (claro sobre oscuro falla en algunos lectores) ni uses degradados o colores pálidos.
- **Margen blanco alrededor** de al menos 4 módulos.
- **Los tres cuadros de las esquinas** pueden ir del color de marca, siempre que sea oscuro y que estén completos.
- **Escribe la dirección en texto** junto al QR, para quien no pueda escanear.

### Tamaño impreso

Regla práctica: la distancia de lectura es unas 10 veces el ancho del QR.

| Dónde | Tamaño mínimo |
|---|---|
| Tarjeta de presentación | 2 cm de lado (mejor 2.5 cm) |
| Volante, mesa o etiqueta | 3 a 4 cm |
| Póster leído a 1 o 2 m | 10 a 20 cm |
| Lona leída a 5 m | 50 cm |
| Diapositiva proyectada | Que ocupe cerca de la mitad del alto de la pantalla |

### Cómo hacerlo

- **Sin código:** QRCode Monkey (qrcode-monkey.com) o una herramienta parecida que permita subir el logo y elegir corrección de errores alta (H). Descarga en SVG para imprenta y en PNG grande para digital.
- **En Claude Code:** con Python y `segno`, en un entorno virtual dentro de la carpeta temporal. Si una dependencia falla, reinstálala en lugar de insistir.

```python
import segno
qr = segno.make_qr("https://citas.tunegocio.com", error="h")
OSCURO = "#0A0A0A"  # cambia por el color oscuro de la marca; debe contrastar bien con el blanco
qr.save("qr.svg", scale=10, border=4, dark=OSCURO, light="#FFFFFF")
qr.save("qr.png", scale=60, border=4, dark=OSCURO, light="#FFFFFF")
# Para el logo: deja libre un cuadro central (en sitios ya publicados, 9 x 9 módulos),
# pinta encima un cuadro sólido con el isotipo y no toques los tres ojos de las esquinas.
```

Entregables: SVG para imprenta, PNG de 2048 px para digital, una versión toda en negro para impresión a una tinta y, si es para un evento, una diapositiva de 1920 x 1080 con el QR grande, la dirección escrita y una frase de qué encontrarán, hecha con los colores, la tipografía y los elementos del sitio.

### Probarlo antes de imprimir

1. Léelo de vuelta con un lector de códigos en tamaño completo y reducido a unos 220 px (en Claude Code: Vision en macOS, o `zxing-cpp` con Python). Debe abrir exactamente tu URL.
2. Escanéalo con la cámara de un iPhone y de un Android.
3. Imprime una prueba a tamaño real y escanéala a la distancia a la que se va a leer, también con poca luz.
4. Si va en diapositiva, escanéala proyectada desde el fondo del salón.
5. Solo después de esto se manda a imprimir el tiraje completo.

---

## 12. Después de publicar (incluye el alta en Google Search Console y Bing)

### Revisión con la página en vivo

- [ ] Abre la dirección con `https://` en tu celular, con datos móviles.
- [ ] Escribe la dirección con `http://` y comprueba que te manda a `https://`.
- [ ] Si configuraste `www`, comprueba que también abre.
- [ ] Pega el enlace en WhatsApp y revisa la vista previa (imagen, título y frase).
- [ ] Corre pagespeed.web.dev en Móvil y revisa LCP y peso.
- [ ] Manda una solicitud de prueba con el formulario a tu propio WhatsApp.
- [ ] Escanea el QR impreso.

### Darlo de alta en buscadores (sitios con SEO)

La persona inicia sesión con su cuenta de Google; tú la guías.

1. **Google Search Console** (search.google.com/search-console): agrega la propiedad de tipo Dominio y verifícala con el registro TXT que pide, en su DNS (sección 9). Luego, en Sitemaps, envía `https://[su-dominio]/sitemap.xml`.
2. En Inspección de URLs, pide indexar el inicio y las pilares. Los artículos los encuentra solos por el sitemap y los enlaces.
3. **Bing Webmaster Tools** (bing.com/webmasters): "Importar desde Google Search Console" trae el sitio y el sitemap en un paso. Bing alimenta a Copilot y a otros buscadores con IA.
4. **Perfil de Empresa en Google:** que el sitio web apunte al dominio nuevo y que nombre, dirección y teléfono sean idénticos a los del sitio.
5. **Analítica:** GA4 o la que use, con el aviso de privacidad enlazado. Anota en el LEEME cómo ver las visitas que llegan de asistentes con IA (`07-seo-tecnico-y-aeo.md`, sección 11).
6. **Si pasa por Cloudflare:** revisa que la protección de bots no bloquee a los rastreadores de búsqueda de IA (`07`, sección 6.1).
7. **Cada ola nueva de artículos:** construir, auditar, publicar `dist/` completo y reenviar el sitemap en Search Console.

### Actualiza el LEEME

Agrega o actualiza la sección "Dónde vive y cómo publicar":

- URL en vivo y fecha de publicación.
- Dónde está alojado (Netlify, Hostinger o Vercel) y en qué carpeta o proyecto.
- Dónde está el DNS y qué registro se creó (tipo, nombre y valor).
- Estado del SSL.
- Cómo actualizar, paso a paso, y el `?v=` vigente.
- Qué no se sube al servidor (`qr/`, `.claude/`, carpetas de trabajo y de revisión, `direccion-de-arte.html`, capturas de la referencia).
- Dirección de arte en pocas líneas: qué se tomó de la referencia, qué elementos de la marca se usan y dónde, y cuál es la animación firma. Así, cuando la persona pida cambios meses después, Claude mantiene el mismo carácter en lugar de volver a opciones genéricas.
- La nota técnica que no va en la hoja de muestra: colores con su HEX y su papel, fuentes y pesos, tokens de movimiento (curvas, duraciones, recorridos), contrastes medidos y versiones de las librerías.
- "Por validar": lo que Claude decidió por la persona desde la etapa 2 (por ejemplo, la letra del botón, la versión compacta del logo o un dato que parecía de relleno), para que lo confirme.
- Pendientes por confirmar y marcadores que quedaron.
- En sitios con SEO: los silos y su estado (artículos publicados y por publicar en cada ola), la tabla de redirecciones si había sitio viejo, dónde están `mapa-de-contenido.csv` y `sitio.json`, la decisión sobre rastreadores de entrenamiento de IA, y el calendario de la prueba AEO mensual y la revisión trimestral.

Cierra el mensaje de entrega con la URL, los archivos del QR, el LEEME actualizado y la lista de pendientes.
