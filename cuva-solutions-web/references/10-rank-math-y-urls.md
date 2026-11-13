# 10. Reglas de Rank Math y arquitectura de URLs

Lee este archivo antes de escribir cualquier pilar o satélite y antes de definir URLs en la etapa 4. Cada pieza del blog debe pasar las pruebas de Rank Math, el plugin de SEO para WordPress, con puntaje verde (80 o más sobre 100), aunque el sitio sea estático. Rank Math solo revisa señales on-page: ayuda a no olvidar nada, pero nunca reemplaza la calidad del contenido ni la experiencia del negocio (`08-blog-y-articulos.md`).

Regla de oro: **se cumple la prueba sin sacrificar la naturalidad.** Si una regla obliga a una frase que suena forzada, gana la frase natural y se anota en Por validar. Un 85 que se lee como persona vale más que un 100 que suena a robot.

## Contenido

1. Palabra clave principal y secundarias
2. Las pruebas de Rank Math, una por una
3. Título SEO y meta descripción
4. Arquitectura de URLs
5. URLs en WordPress con Rank Math
6. Configuración recomendada de Rank Math
7. Lista de revisión Rank Math por pieza

---

## 1. Palabra clave principal y secundarias

- **Una palabra clave principal por URL** (Focus Keyword), única en todo el sitio. Sale de `mapa-de-contenido.csv`, columna `keyword`.
- **De 2 a 4 secundarias** (columna `secundarias`). En Rank Math se cargan después de la principal, separadas por coma. Rank Math gratis permite hasta 5 palabras clave por entrada.
- La principal se escribe como la busca la gente, en minúsculas y sin signos: `cada cuanto hacer mantenimiento aire acondicionado`. Las tildes no afectan la coincidencia en Rank Math, pero el texto visible siempre lleva tildes correctas.
- Si una palabra clave larga no cabe natural en el título, usa una variante corta como principal y la larga como secundaria.

## 2. Las pruebas de Rank Math, una por una

### SEO básico

| Prueba | Qué pide | Cómo se cumple aquí |
|---|---|---|
| Palabra clave en el título SEO | La principal dentro del `<title>` | `titulo_seo` o `titulo` la incluyen completa |
| Palabra clave en la meta descripción | La principal dentro de la descripción | Una vez, en la primera mitad de la frase |
| Palabra clave en la URL | La principal o su forma corta en el slug | Slug de 3 a 6 palabras con la palabra clave (sección 4) |
| Palabra clave al inicio del contenido | En el primer 10 % del texto | En la primera o segunda frase de la respuesta directa |
| Palabra clave en el contenido | Aparece en el cuerpo | Ver densidad abajo |
| Largo del contenido | Más de 600 palabras; puntaje completo desde 2.500 | Pilares de 3.000 o más, satélites de 1.500 o más (08, secciones 3 y 4) |

### SEO adicional

| Prueba | Qué pide | Cómo se cumple aquí |
|---|---|---|
| Palabra clave en subtítulos | La principal en al menos un `h2` o `h3` | En uno o dos `h2`, nunca en todos |
| Palabra clave en el `alt` de una imagen | Una imagen con la principal en su texto alternativo | La imagen destacada o la primera del texto, con un `alt` que describe la foto y nombra el tema |
| Densidad de la palabra clave | Entre 1 % y 1,5 % (Rank Math avisa arriba de 2,5 %) | En 3.000 palabras, de 30 a 45 apariciones sumando principal y variantes cercanas. Si suena repetido, usa variantes y sinónimos: la naturalidad gana |
| Largo de la URL | Menos de 75 caracteres, contando el dominio | Sección 4 |
| Enlaces externos | Al menos uno a una fuente de autoridad | Entidades oficiales, normas, fabricantes o estudios con fecha |
| Enlaces externos dofollow | Al menos un enlace externo sin `nofollow` | Las fuentes de autoridad van sin `nofollow`. Patrocinados con `rel="sponsored"` |
| Enlaces internos | Al menos uno | Las reglas de silo ya piden pilar, 2 o 3 hermanos y "Sigue leyendo" |
| Palabra clave nunca usada antes | La principal no está asignada a otra entrada | El mapa la hace única. `auditar-seo.mjs` lo comprueba |

### Legibilidad del título

| Prueba | Qué pide | Cómo se cumple sin sonar a anzuelo |
|---|---|---|
| Palabra clave al inicio del título | En la primera mitad del título SEO | "Mantenimiento de aire acondicionado: cada cuánto hacerlo" |
| Título con sentimiento | Una palabra con carga positiva o negativa | Palabras honestas: "errores", "evitar", "fácil", "seguro", "caro", "mejor". Nunca exageraciones que el artículo no cumple |
| Título con palabra poderosa | Una palabra de impacto | "guía", "completa", "probado", "real", "rápido", "paso a paso". Una sola, que sea cierta |
| Título con número | Un número | Años, pasos, rangos o cantidades reales: "7 señales", "en 2026", "3 errores". Si no hay número honesto, se deja sin él |

### Legibilidad del contenido

| Prueba | Qué pide | Cómo se cumple aquí |
|---|---|---|
| Tabla de contenido | Índice con enlaces a los subtítulos | `nav.articulo-indice` en toda pilar y en todo satélite con 5 `h2` o más. En WordPress, el bloque de índice de Rank Math |
| Párrafos cortos | Ningún párrafo de más de 120 palabras | Párrafos de 2 a 4 frases. Máximo 4 líneas en celular |
| Imágenes o videos | Al menos un medio en el contenido | Pilares con 4 o más imágenes; satélites con 2 o más, además de la destacada |

## 3. Título SEO y meta descripción

- **Título SEO:** de 50 a 60 caracteres, palabra clave en la primera mitad, una palabra con sentimiento o poderosa y, si es honesto, un número. Sin la marca si no cabe; la plantilla la agrega con el separador.
- **Meta descripción:** de 140 a 160 caracteres, con la palabra clave una vez, la respuesta o el beneficio concreto y una invitación clara. Sin comillas dobles.
- **Título visible (h1):** puede ser distinto del título SEO, más conversacional. También incluye la palabra clave.
- Fórmulas de título que funcionan y se leen humanas:
  - `[Palabra clave]: [respuesta corta o beneficio] ([año o número])`
  - `[Número] [señales, errores, pasos] de [palabra clave] que [consecuencia real]`
  - `[Palabra clave] en [ciudad]: precios reales y de qué dependen`

## 4. Arquitectura de URLs

La arquitectura replica el silo en la URL. Las reglas generales están en `06-arquitectura-silo.md`, sección 2. Lo que agrega Rank Math:

| Página | URL | Ejemplo |
|---|---|---|
| Inicio | `/` | `https://tunegocio.com/` |
| Pilar | `/[palabra-clave-pilar]/` | `/mantenimiento-aire-acondicionado/` |
| Satélite | `/[pilar]/[palabra-clave-satelite]/` | `/mantenimiento-aire-acondicionado/cada-cuanto-hacerlo/` |
| Servicio dentro del silo | `/[pilar]/[servicio]/` | `/mantenimiento-aire-acondicionado/para-empresas/` |
| Blog (vitrina) | `/blog/` | |
| Autor | `/autores/[nombre-apellido]/` | |

Reglas:

1. **Menos de 75 caracteres en total, contando `https://` y el dominio.** Si el dominio es largo, el slug del satélite se acorta. El slug del satélite no repite la palabra clave de la pilar: ya está en la carpeta.
2. **Palabra clave en el slug.** La de la pilar en su carpeta; la del satélite, en su forma corta, en el último tramo.
3. **Dos niveles como máximo:** pilar y satélite. Nada de `/blog/categoria/2026/11/titulo/`.
4. **Sin palabras vacías** ("de", "el", "la", "para", "y") salvo que sin ellas cambie el sentido.
5. Minúsculas, guiones, sin tildes, sin eñes, sin fechas, con barra final y nunca cambian después de publicar (301 si cambian).
6. El slug de la pilar coincide con el nombre de la carpeta en `contenido/` y con el `slug` del silo en `sitio.json`.

## 5. URLs en WordPress con Rank Math

WordPress no anida entradas por defecto. Para que la URL refleje el silo, elige una de estas dos formas y anótala en el LEEME:

| Opción | Cómo se arma | Cuándo conviene |
|---|---|---|
| **A. Páginas con padre (recomendada)** | Cada pilar es una página. Cada satélite es una página hija de su pilar (Atributos de página, Superior). La URL sale sola: `/pilar/satelite/` | Sitios de servicios con silos fijos. Es la que respeta exacto el mapa |
| **B. Entradas con categoría** | Enlaces permanentes en `/%category%/%postname%/`. Cada silo es una categoría con el slug de la pilar. En Rank Math, General, Enlaces, activa "Quitar base de categoría" | Blogs que publican mucho y quieren usar el editor de entradas. La pilar va como página de categoría con contenido real, nunca como lista vacía |

En las dos: una sola categoría por entrada, sin etiquetas indexables (Rank Math, Títulos y Meta, Etiquetas: noindex) y sin archivos de fecha ni de autor duplicados si el sitio tiene una sola persona autora.

Con el exporte de `construir-sitio.mjs --exportar` cada página trae su URL, su palabra clave y su silo: al importar, carga la palabra clave en el campo Focus Keyword de Rank Math y el título y la descripción en sus campos.

## 6. Configuración recomendada de Rank Math

La persona inicia sesión; tú la guías.

- **Asistente:** modo Avanzado, tipo de sitio "Pequeña empresa" o "Negocio local", con el logo y los datos idénticos a `sitio.json`.
- **Sitemap:** activado, con páginas, entradas y categorías del silo. Sin etiquetas ni adjuntos.
- **Títulos y Meta:** separador igual al de `sitio.json`; noindex en etiquetas, archivos de fecha, resultados de búsqueda y adjuntos.
- **Schema:** Article o BlogPosting en satélites, Service o LocalBusiness en pilares que venden, FAQ desde el bloque de preguntas. Nada de reseñas que no estén visibles en la página.
- **Redirecciones:** activado. Cada URL vieja con su 301.
- **Enlaces:** "Quitar base de categoría" si se usa la opción B; enlaces externos de fuentes en la misma pestaña o en nueva, sin `nofollow`.
- **Breadcrumbs:** activadas, con el silo como nivel intermedio.
- **Search Console y Analytics:** conectados desde Rank Math, General, Analytics.

## 7. Lista de revisión Rank Math por pieza

Cada pilar y cada satélite pasa esta lista antes de marcarse `estado: listo`, junto con la de `08`, sección 9.

- [ ] Palabra clave principal única y de 2 a 4 secundarias.
- [ ] Palabra clave en el título SEO (primera mitad), la meta descripción, la URL, el `h1` y el primer 10 % del texto.
- [ ] Palabra clave en uno o dos `h2` o `h3` y en el `alt` de una imagen.
- [ ] Densidad cercana a 1 % a 1,5 %, sin frases forzadas.
- [ ] Título SEO de 50 a 60 caracteres, con sentimiento o palabra poderosa y número si es honesto.
- [ ] Meta descripción de 140 a 160 caracteres.
- [ ] URL de menos de 75 caracteres con dominio, dentro de su silo.
- [ ] Pilar con 3.000 palabras o más; satélite con 1.500 o más, sin relleno.
- [ ] Al menos un enlace externo dofollow a una fuente de autoridad y los enlaces internos del silo.
- [ ] Índice de contenido, párrafos de menos de 120 palabras e imágenes en el cuerpo.
- [ ] Se lee 100 % humano (`09-escritura-humana.md`, sección 6).
