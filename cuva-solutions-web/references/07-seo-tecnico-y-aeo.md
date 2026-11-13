# 07. SEO técnico y AEO

Lee este archivo en las etapas 5 y 6 (construcción y revisión) y en la publicación. Cubre lo que hace que un sitio con mucho diseño y movimiento sea, al mismo tiempo, el más fácil de leer para Google, Bing y los asistentes con IA. Lo que el script `construir-sitio.mjs` genera solo está marcado con (S); lo demás lo escribes tú.

Datos verificados en noviembre de 2026. Las fuentes oficiales están al final; si pasaron más de 6 meses, revísalas antes de prometer algo.

## Contenido

1. Lo que dice Google sobre IA y lo que no hay que hacer
2. Rastreo e indexación
3. El diseño y las animaciones no pueden esconder el contenido
4. Head de cada página
5. Datos estructurados
6. robots.txt, sitemap y llms.txt
7. Velocidad: Core Web Vitals
8. Escribir para que te citen (AEO)
9. SEO local y entidad de marca
10. Varios países o idiomas
11. Medición después de publicar
12. Fuentes

---

## 1. Lo que dice Google sobre IA y lo que no hay que hacer

En mayo de 2026 Google publicó su guía para las funciones con IA de su buscador (AI Overviews y Modo IA). Lo central:

- Para aparecer como fuente basta con que la página esté indexada y pueda mostrarse en la búsqueda con fragmento. No hay requisitos técnicos extra.
- Optimizar para las respuestas con IA es optimizar para la búsqueda: es SEO. AEO y GEO son el mismo trabajo bien hecho.
- Lo que se puede ignorar: archivos especiales para IA como `llms.txt`, partir el contenido en trozos para la IA, reescribir textos "para robots", fabricar menciones de la marca y obsesionarse con los datos estructurados.
- Lo que sí pesa: contenido útil, original y con experiencia propia (lo que Google llama contenido que no es "commodity"), sitio técnicamente sano, buena experiencia en la página, información clara del negocio y sus productos o servicios.

Otros asistentes (ChatGPT, Perplexity, Claude, Copilot) usan sus propios índices y rastreadores, pero premian lo mismo: páginas rastreables con respuestas claras, datos verificables y una marca reconocible. Por eso esta skill no hace trucos: hace el mejor sitio sobre su tema.

Reglas que vienen de las políticas de spam de Google y aplican a todo el sitio:

- **Contenido a escala sin valor:** publicar muchas páginas hechas para posicionar, sin aportar nada, está penalizado, las escriba una persona o una IA. Por eso cada artículo lleva experiencia propia del negocio y pasa la revisión de `08-blog-y-articulos.md`.
- **Páginas puerta:** páginas casi iguales que solo cambian la ciudad o la palabra clave.
- **Menciones y reseñas falsas,** también en datos estructurados.

## 2. Rastreo e indexación

- Todo el contenido principal está en el HTML que llega del servidor. Ningún texto, enlace o imagen importante depende de que corra JavaScript. Esta skill escribe HTML estático, así que se cumple si no lo rompes con la animación (sección 3).
- Enlaces con `<a href="/ruta/">`. Menús, pestañas y acordeones con el contenido en el HTML; el JavaScript solo los abre y cierra. En el acordeón usa `<details>` o contenido oculto con CSS que sigue en el HTML.
- Una URL canónica por página, absoluta, con `https://` y barra final (S).
- `noindex` solo en páginas de gracias, pruebas o duplicados (S, con `noindex: si`).
- Código de estado 200 en las páginas publicadas y 404 real en las que no existen. En Netlify y la mayoría de hostings, una página `404.html` en la raíz sirve como página de error.
- Imágenes con `alt` que describe lo que se ve, `width`, `height` y `loading="lazy"` salvo la principal.
- Nada importante dentro de imágenes de texto: los títulos son texto real.

## 3. El diseño y las animaciones no pueden esconder el contenido

El nivel de diseño de esta skill es alto y el movimiento es parte de la marca. Estas reglas hacen que no le cueste posiciones:

1. **El elemento principal de la primera pantalla (LCP) nunca arranca invisible.** Si el titular o la foto del hero empiezan con `opacity: 0`, el navegador no cuenta el LCP hasta que aparecen y la métrica empeora. Anima la decoración, la cortina o el recorrido (`transform`); el titular está visible desde el primer cuadro o aparece en menos de 0.3 s.
2. **El preloader vive solo en el inicio**, solo en la primera visita, con tope de 1.2 s en celular y salto con un toque. Nunca en pilares ni artículos. Cada página que llega desde Google o una IA abre directo en su contenido.
3. **SplitText con accesibilidad activa:** GSAP desde la 3.13 agrega `aria-label` al elemento dividido y oculta los pedazos a lectores de pantalla (`aria: "auto"`, valor por defecto). No lo desactives. El texto original sigue en el HTML.
4. **Los artículos se mueven poco:** revelado discreto al bajar, barra de progreso de lectura si la dirección la pide, y nada más. En un artículo la protagonista es la lectura.
5. **Sin Lenis en artículos largos con índice** si rompe los saltos a `#ancla`. Si lo usas, conecta los enlaces internos (`03-animaciones.md`, sección 4).
6. **Lo que se ve sin JavaScript es lo que lee el rastreador.** La revisión con JavaScript apagado (`scripts/revisar-sitio.mjs`) es también una revisión de SEO.
7. **Fuentes con `font-display: swap`** y los dos pesos del primer pantallazo precargados, para que el texto aparezca enseguida.

## 4. Head de cada página

El script arma el `<head>` técnico con estos datos (S). En una landing de una sola página lo escribes tú igual.

```html
<html lang="es-CO" class="no-js">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Cada cuánto hacer mantenimiento al aire acondicionado | Marca</title>
<meta name="description" content="...">
<link rel="canonical" href="https://www.dominio.com/silo/articulo/">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#......">
<meta property="og:type" content="article">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://www.dominio.com/img/blog/....jpg">
<meta property="og:url" content="https://www.dominio.com/silo/articulo/">
<meta property="og:locale" content="es_CO">
<meta property="og:site_name" content="Marca">
<meta property="article:published_time" content="2026-11-13">
<meta property="article:modified_time" content="2026-11-13">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<script type="application/ld+json">{ ...sección 5... }</script>
```

Reglas del título y la descripción:

| Página | `<title>` | Descripción |
|---|---|---|
| Inicio | Servicio principal en ciudad o país + marca | Qué haces, para quién, dónde y la acción |
| Pilar | Tema o servicio + promesa corta + marca | Qué resuelve y qué encuentra en la página |
| Artículo | La pregunta o el tema tal como se busca + marca | La respuesta en una frase y qué más trae |
| Servicio | Servicio + para quién + ciudad + marca | Beneficio concreto y la acción |

- Título de 50 a 60 caracteres; si la marca no cabe, se quita de los artículos con `titulo_seo`.
- Descripción de 120 a 160 caracteres, escrita para que den ganas de hacer clic. Google a veces la reemplaza; igual se escribe.
- Un `h1` por página, igual o muy cercano al `<title>`. Títulos en orden: `h2` por sección, `h3` dentro.
- Ningún título ni descripción repetido en dos páginas (lo revisa `auditar-seo.mjs`).

## 5. Datos estructurados

Los datos estructurados (JSON-LD) describen en código lo que la página ya muestra: quién es el negocio, qué servicio ofrece, quién escribió el artículo, en qué parte del sitio está. Ayudan a que los buscadores entiendan la página; no sustituyen al contenido.

### 5.1 Qué va en cada página (S)

El script arma un `@graph` por página con nodos que se enlazan por `@id`:

| Página | Nodos |
|---|---|
| Todas | `WebSite`, el negocio (`Organization` o el subtipo de `LocalBusiness` que diga `sitio.json`), `WebPage` |
| Todas menos el inicio | `BreadcrumbList` |
| Pilar y blog | `CollectionPage` en lugar de `WebPage` |
| Pilar o servicio con campo `servicio` | `Service` con el negocio como proveedor y el área que atiende |
| Artículo | `BlogPosting` con autor (`Person`), fechas, imagen, sección (el silo) e idioma |
| Autor | `ProfilePage` con su `Person` |
| Cualquiera con `<section data-faq>` | `FAQPage` con las preguntas visibles |

### 5.2 Lo que tú cuidas

- **Solo datos reales y visibles en la página.** Nada de calificaciones (`aggregateRating`), reseñas, precios ni premios que no estén en el sitio y sean verdaderos.
- **El negocio igual en todas partes:** nombre, dirección, teléfono y horario idénticos en `sitio.json`, en el pie del sitio, en el Perfil de Empresa de Google y en directorios.
- **`sameAs`** con las URLs oficiales de la marca (Instagram, LinkedIn, Facebook, YouTube, Perfil de Empresa en Google) y, por autor, sus perfiles profesionales. Ayuda a que los buscadores y los asistentes reconozcan la marca y al autor como entidades.
- **Preguntas frecuentes:** desde el 7 de mayo de 2026 Google ya no muestra resultados enriquecidos de FAQ en ningún sitio. El marcado `FAQPage` sigue siendo válido y describe bien el contenido, así que se genera solo cuando la sección es visible. No prometas desplegables en Google.
- **HowTo:** Google dejó de mostrarlo en 2023. No lo uses.
- Valida con validator.schema.org (estructura) y con la Prueba de resultados enriquecidos de Google (lo que Google aún muestra: migas de pan, artículos, negocio local, productos, eventos).

### 5.3 Ejemplo de lo que genera en un artículo

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": "https://www.dominio.com/#website", "url": "https://www.dominio.com/", "name": "Marca", "inLanguage": "es-CO", "publisher": { "@id": "https://www.dominio.com/#negocio" } },
    { "@type": "HVACBusiness", "@id": "https://www.dominio.com/#negocio", "name": "Marca", "url": "https://www.dominio.com/", "logo": "https://www.dominio.com/img/logo.png", "telephone": "+57...", "address": { "@type": "PostalAddress", "addressLocality": "Bogotá", "addressCountry": "CO" }, "sameAs": ["https://www.instagram.com/..."] },
    { "@type": "WebPage", "@id": "https://www.dominio.com/silo/articulo/#webpage", "url": "https://www.dominio.com/silo/articulo/", "name": "...", "isPartOf": { "@id": "https://www.dominio.com/#website" }, "breadcrumb": { "@id": "https://www.dominio.com/silo/articulo/#migas" } },
    { "@type": "BreadcrumbList", "@id": "https://www.dominio.com/silo/articulo/#migas", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.dominio.com/" } ] },
    { "@type": "BlogPosting", "headline": "...", "datePublished": "2026-11-13", "dateModified": "2026-11-13", "author": { "@id": "https://www.dominio.com/#autor-nombre-apellido" }, "publisher": { "@id": "https://www.dominio.com/#negocio" }, "articleSection": "Mantenimiento", "mainEntityOfPage": { "@id": "https://www.dominio.com/silo/articulo/#webpage" } },
    { "@type": "Person", "@id": "https://www.dominio.com/#autor-nombre-apellido", "name": "...", "jobTitle": "...", "url": "https://www.dominio.com/autores/nombre-apellido/", "sameAs": ["https://www.linkedin.com/in/..."] }
  ]
}
```

## 6. robots.txt, sitemap y llms.txt

### 6.1 robots.txt (S)

Por defecto el script deja entrar a todos los buscadores y a los rastreadores de búsqueda de IA, y apunta al sitemap. Bloquear un rastreador de búsqueda de IA saca al sitio de las respuestas de ese asistente.

Hay tres tipos de rastreadores de IA. Explícale a la persona la diferencia y que ella decida el segundo:

| Tipo | Ejemplos | Qué hacen | Por defecto |
|---|---|---|---|
| Búsqueda | `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Googlebot`, `Bingbot`, `Applebot` | Indexan para mostrar y citar el sitio en respuestas | Permitidos, siempre |
| Entrenamiento | `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `meta-externalagent` | Recolectan contenido para entrenar modelos | Permitidos; se bloquean si la persona lo pide (`"entrenamiento": false` en `sitio.json`) |
| A pedido de un usuario | `ChatGPT-User`, `Claude-User`, `Perplexity-User`, `Google-Agent` | Abren una página cuando alguien se lo pide al asistente | Permitidos |

Bloquear `Google-Extended` no afecta la posición en Google ni la aparición en AI Overviews, que usan a `Googlebot`. Para un negocio que quiere ser recomendado, dejar el entrenamiento abierto ayuda a que los modelos conozcan la marca; es su decisión y va en Por validar.

**Revisa también el CDN.** Cloudflare y otros proveedores tienen opciones para bloquear bots de IA, y en dominios nuevos de Cloudflare pueden venir activadas. Si el sitio pasa por Cloudflare, revisa la sección de bots o de rastreadores de IA y deja pasar a los de búsqueda.

### 6.2 sitemap.xml (S)

- Solo páginas que se indexan, con su URL canónica y `lastmod` con la fecha real de la última modificación.
- Se registra en Google Search Console y en Bing Webmaster Tools (Bing alimenta a Copilot y a otros buscadores con IA).
- Cada ola de artículos se publica con el sitemap actualizado.

### 6.3 llms.txt (S, opcional)

Es un archivo en Markdown en la raíz que lista las páginas más importantes del sitio para agentes de IA. Google dijo en junio de 2026 que no lo usa y que no ayuda ni perjudica en su buscador, y los estudios de registros muestran que casi ningún rastreador lo pide. Chrome Lighthouse lo revisa en su auditoría de navegación con agentes. Cuesta casi nada y el script lo genera si `"llms_txt": true`. Dilo así a la persona: es un extra para agentes, no una palanca de posicionamiento.

## 7. Velocidad: Core Web Vitals

| Métrica | Qué mide | Meta (en el 75 % de las visitas) |
|---|---|---|
| LCP | Cuánto tarda en verse lo principal | 2.5 s o menos |
| INP | Qué tan rápido responde al tocar o hacer clic | 200 ms o menos |
| CLS | Cuánto se mueve el contenido mientras carga | 0.1 o menos |

Lo que más ayuda en estos sitios: hero en WebP con `fetchpriority="high"` y sin `lazy`, fuentes precargadas, librerías con `defer`, cero preloader fuera del inicio, imágenes con medidas, nada de video pesado arriba, efectos de mouse solo con puntero fino y animaciones solo con `transform` y `opacity`. El detalle de peso está en `04-calidad-y-publicacion.md` (1.7 y 1.8). La medida real sale de pagespeed.web.dev y del informe de Métricas web principales de Search Console cuando hay tráfico.

## 8. Escribir para que te citen (AEO)

Esto aplica a pilares, servicios y artículos. El detalle de cómo se escribe un artículo está en `08-blog-y-articulos.md`.

1. **Respuesta directa arriba.** Las primeras 2 o 3 frases de la página responden la pregunta del título sin rodeos. Debajo de cada `h2` que sea pregunta, la primera frase la responde.
2. **Títulos con las preguntas reales** de los clientes, en sus palabras.
3. **Datos concretos con fuente y fecha:** rangos de precio, plazos, medidas, requisitos, normas. Un asistente cita lo verificable.
4. **Experiencia propia visible:** "En los equipos que revisamos en [ciudad]..." con datos del negocio. Es lo que ninguna otra fuente tiene.
5. **Formatos que se entienden de un vistazo** donde ayuden: tabla comparativa, lista de pasos, lista de revisión, definición en una frase.
6. **Autor real con credenciales** y fecha de actualización visibles.
7. **Nombres completos de las cosas** la primera vez (la entidad): la norma con su número, el material con su nombre, la ciudad completa.
8. **Una página, una pregunta principal.** Las preguntas cercanas van como `h2` dentro o en su propio artículo si tienen otra intención.

No hace falta escribir raro para la IA ni partir el texto en trozos: Google lo dijo expresamente. Se escribe para personas, claro y con sustancia.

## 9. SEO local y entidad de marca

Para negocios con atención en una ciudad o región:

- **Perfil de Empresa en Google** completo, con la misma información del sitio, categorías correctas, fotos reales y reseñas reales. Es lo primero que la persona tiene que tener; si no existe, va en pendientes con el paso a paso.
- **Nombre, dirección y teléfono idénticos** en el sitio, el perfil, redes y directorios del país.
- **`LocalBusiness` con su subtipo** (`Dentist`, `LegalService`, `HVACBusiness`, `MedicalBusiness`, `Store`...) en `sitio.json`, con `areaServed` y horario.
- **Página de contacto con mapa, dirección y horario** en texto.
- **Reseñas reales:** se piden a clientes reales con el enlace del perfil. Nunca se escriben ni se compran.
- **Bing Places** si el mercado lo amerita: alimenta a Bing y a Copilot.
- **Menciones reales:** directorios del sector, cámaras de comercio, medios locales, alianzas. Nunca menciones compradas ni coordinadas.

## 10. Varios países o idiomas

Si el sitio apunta a varios países con contenido distinto (precios, normas, moneda) o a varios idiomas:

- Una carpeta por país o idioma (`/co/`, `/mx/`, `/en/`) con su propio `sitio.json` o con el campo `idioma` por versión.
- Etiquetas `hreflang` recíprocas entre versiones equivalentes y una `x-default`. Agrégalas a la plantilla de cada versión; el script no las genera.
- No dupliques el mismo texto cambiando solo la moneda: cada versión tiene que aportar lo de su país.

## 11. Medición después de publicar

- **Google Search Console:** verificar el dominio, enviar el sitemap, revisar Indexación de páginas a la semana y Rendimiento al mes. Las respuestas con IA de Google se cuentan dentro del tráfico web normal.
- **Bing Webmaster Tools:** importar desde Search Console y enviar el sitemap.
- **GA4 o la analítica que use:** revisar visitas que llegan de `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com` y `claude.ai` en Adquisición, por fuente o referencia.
- **Prueba AEO mensual:** repetir los prompts de `05-investigacion-y-competencia.md` (5.1) y anotar si el sitio aparece citado.
- **Revisión trimestral:** páginas con impresiones y posición entre 5 y 20 se refuerzan primero; artículos que no reciben nada en 6 meses se mejoran o se fusionan.

## 12. Fuentes

- Google Search Central, "AI features and your website" y "Optimizing your website for generative AI features on Google Search" (mayo de 2026, actualizada en junio y julio de 2026).
- Google Search Central, documentación de datos estructurados FAQPage: aviso de fin de los resultados enriquecidos de FAQ desde el 7 de mayo de 2026.
- Google Search Central, políticas de spam (contenido a escala, páginas puerta).
- Documentación de rastreadores de OpenAI, Anthropic, Perplexity y Google (listas de user agents y tokens de robots.txt).
- web.dev, umbrales de Core Web Vitals.
