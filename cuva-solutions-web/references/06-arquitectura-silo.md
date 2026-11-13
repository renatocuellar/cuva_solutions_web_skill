# 06. Arquitectura SILO y mapa de contenido

Lee este archivo en la etapa 4 y vuelve a él cada vez que agregues páginas. Un silo agrupa todo lo que el sitio sabe de un tema en una sola rama: una página pilar arriba y sus páginas de soporte abajo, enlazadas entre sí con reglas fijas. Así Google y los asistentes con IA entienden de qué es experto el sitio, la autoridad fluye hacia las páginas que venden y la persona encuentra lo siguiente que necesita sin buscar.

## Contenido

1. La forma del sitio
2. URLs
3. Las 10 reglas de enlazado
4. Diseñar los silos
5. Los 10 artículos de cada silo
6. El mapa de contenido
7. Cómo se organizan los archivos del proyecto
8. Menú, migas de pan y bloques automáticos
9. Crecer el sitio sin romper el silo
10. Errores comunes

---

## 1. La forma del sitio

```
Inicio  /
├── Silo A  /silo-a/                 ← página pilar (vende el servicio A y resume el tema)
│   ├── /silo-a/articulo-1/          ← páginas de soporte: artículos y páginas de servicio específicas
│   ├── /silo-a/articulo-2/
│   └── ... (mínimo 10)
├── Silo B  /silo-b/
│   └── ...
├── (mínimo 5 silos)
├── /blog/                           ← índice editorial: muestra lo último de cada silo
├── /nosotros/   /contacto/          ← páginas de confianza y conversión
└── /autores/nombre/                 ← una página por autor (E-E-A-T)
```

- **Profundidad máxima: 3 clics desde el inicio.** Inicio, pilar, artículo.
- **El silo es el tema, no el formato.** No hay una rama "blog" con todo adentro: cada artículo vive en el silo de su tema. `/blog/` es una vitrina que enlaza hacia los silos.
- **La pilar vende y enseña.** Responde la pregunta grande del tema, explica el servicio, muestra prueba y lleva al botón principal. Desde ahí se ramifica a cada subtema.
- **Extensión mínima:** pilar de 3.000 palabras o más; cada satélite de 1.500 o más. Sin relleno: si un tema no da para 1.500 palabras útiles, se fusiona con otro satélite (`08-blog-y-articulos.md`, secciones 3 y 4).
- **Mínimo 5 silos y 10 artículos por silo.** Es el piso para mostrar autoridad temática. Si un tema no da para 10 artículos útiles, no es un silo: es un artículo dentro de otro silo.
- **Las páginas de servicio específicas** (por ejemplo, "mantenimiento para empresas") viven dentro de su silo como páginas de soporte, con las mismas reglas.

## 2. URLs

| Página | URL |
|---|---|
| Inicio | `/` |
| Pilar | `/mantenimiento-aire-acondicionado/` |
| Artículo o servicio del silo | `/mantenimiento-aire-acondicionado/cada-cuanto-hacer-mantenimiento/` |
| Índice editorial | `/blog/` |
| Autor | `/autores/nombre-apellido/` |
| Páginas base | `/nosotros/`, `/contacto/`, `/politica-de-privacidad/` |

Reglas:

- Minúsculas, palabras separadas por guion, sin tildes ni eñes (`diseno`, `ninos`), sin fechas y sin números de versión.
- De 3 a 6 palabras. Sin palabras vacías al inicio ("el", "la", "de") salvo que se pierda el sentido.
- El slug del silo es su tema principal; el del artículo, su pregunta o tema resumido.
- Siempre con barra final. La URL canónica es exactamente esa.
- Una URL nunca cambia después de publicar. Si cambia, va una redirección 301 de la vieja a la nueva y se anota en el LEEME.
- Si el sitio viejo existe, haz la tabla de redirecciones antes de publicar: cada URL vieja con tráfico apunta a la nueva más parecida, nunca todas al inicio.
- **Reglas de Rank Math para URLs:** menos de 75 caracteres contando `https://` y el dominio, palabra clave en el slug, el slug del satélite no repite la palabra clave de la pilar porque ya está en la carpeta, y dos niveles como máximo. En WordPress, el silo se arma con páginas hijas o con categorías sin base. Todo el detalle en `10-rank-math-y-urls.md`, secciones 4 y 5.

**Nombres.** En esta skill "satélite" y "artículo de soporte" son lo mismo: cada página que cuelga de una pilar. En el CSV y en las cabeceras el `tipo` sigue siendo `articulo`.

## 3. Las 10 reglas de enlazado

Son el silo. El script `auditar-seo.mjs` comprueba las marcadas con (A).

1. **Cada artículo enlaza a su pilar** en los primeros párrafos, con un texto descriptivo, además de las migas de pan. (A)
2. **La pilar enlaza a todos sus artículos** publicados, agrupados por subtema. El script lo inserta solo (sección 8). (A)
3. **Cada artículo enlaza a 2 o 3 artículos hermanos** del mismo silo, dentro del texto, donde ayuden a seguir leyendo. El bloque "Sigue leyendo" suma otros 3 automáticos.
4. **Entre silos, solo de pilar a pilar o de artículo a otra pilar.** Nunca de un artículo a un artículo de otro silo. Máximo un enlace a otro silo por artículo, y solo si la persona lo necesita para decidir. (A)
5. **Cada página de soporte lleva a la acción:** un bloque con el botón principal hacia la pilar (si la pilar vende) o hacia contacto.
6. **El menú solo enlaza pilares**, blog y contacto. Nada de menús con 40 artículos.
7. **Textos de enlace que describen el destino.** Nada de "clic aquí", "leer más", "ver más" ni "aquí". La palabra clave exacta de la pilar va como texto de enlace una vez por página como máximo; las demás veces, variantes naturales. (A)
8. **Ninguna página huérfana:** cada página publicada recibe al menos un enlace de su propio silo. (A)
9. **Ningún enlace interno roto ni a borradores.** Si un artículo enlaza a otro que todavía no se publica, el enlace espera. (A)
10. **Enlaces internos sin `nofollow`** y siempre con `<a href>` real, nunca con JavaScript. (A)

## 4. Diseñar los silos

Parte de los silos aprobados en la etapa 2 (`05-investigacion-y-competencia.md`, sección 8). Para cada uno define:

- **Tema y pregunta grande** que responde la pilar.
- **Servicio que vende** y su botón (el mismo verbo de todo el sitio).
- **Palabra clave principal de la pilar** y de 3 a 5 variantes.
- **Entidades del tema:** nombres de cosas, normas, materiales, marcas, lugares y conceptos que un experto mencionaría. Ayudan a que los buscadores y los asistentes entiendan de qué va el contenido.
- **Límite del silo:** qué no entra. Si dos silos se pisan, uno se come al otro en las búsquedas.

Prueba de cada silo: ¿un cliente que lee todo este silo termina listo para contratar el servicio de la pilar? Si no, falta un artículo o sobra un tema.

## 5. Los 10 artículos de cada silo

Cubre todo el recorrido del cliente. Esta matriz es el punto de partida; cambia los tipos según lo que encontraste en la investigación, pero cada silo cubre las cuatro intenciones.

| # | Tipo | Intención | Forma del título (ejemplo de forma, no de texto) |
|---|---|---|---|
| 1 | Guía base | Aprender | Qué es [tema] y cómo funciona |
| 2 | Señales o síntomas | Resolver | Cómo saber si necesitas [servicio] |
| 3 | Proceso | Aprender | Cómo es [servicio] paso a paso y qué esperar |
| 4 | Costos | Comparar | Cuánto cuesta [servicio] en [país o ciudad] y de qué depende |
| 5 | Cómo elegir | Comparar | Cómo elegir [proveedor o producto]: lista de revisión |
| 6 | Comparativa | Comparar | [Opción A] o [opción B]: cuál conviene según tu caso |
| 7 | Errores | Resolver | Errores comunes al [hacer o contratar algo] y cómo evitarlos |
| 8 | Dudas y mitos | Aprender | Preguntas frecuentes sobre [tema], respondidas |
| 9 | Caso real | Contratar | Caso: cómo resolvimos [problema] para [tipo de cliente] |
| 10 | Segmento | Contratar | [Servicio] para [empresas, hogares, sector] |

Reglas:

- **Una pregunta principal por URL.** Si dos artículos responden la misma pregunta, compiten entre sí (canibalización). Se fusionan o se separan por intención.
- **El caso real (9) exige datos reales.** Si el cliente no tiene casos que contar, ese lugar lo toma otro tipo y se anota en Por validar.
- **Páginas por ciudad solo con presencia real** (oficina, equipo o servicio comprobable en esa ciudad) y contenido propio de esa ciudad. Las páginas que solo cambian el nombre de la ciudad son páginas puerta y Google las trata como spam.
- **Cada artículo tiene algo que solo este negocio puede decir:** un dato de experiencia, una foto propia, un rango de precio, un error que ve seguido. Si no lo tiene, queda el marcador `[DATO DE EXPERIENCIA]` y se pide.

## 6. El mapa de contenido

Es la tabla que se aprueba en la etapa 4. Se entrega como `mapa-de-contenido.csv` (se abre en Excel o Google Sheets) y un resumen en el mensaje. Usa la plantilla `assets/mapa-de-contenido.csv`.

| Columna | Qué lleva |
|---|---|
| `silo` | Slug del silo |
| `url` | URL final |
| `tipo` | `pilar`, `articulo` o `servicio` |
| `titulo` | Título visible (h1) |
| `keyword` | Palabra clave principal, única en todo el mapa |
| `secundarias` | De 2 a 5 variantes, separadas por `;` |
| `intencion` | aprender, resolver, comparar o contratar |
| `pregunta` | La pregunta exacta que responde (AEO) |
| `entidades` | Conceptos que debe mencionar, separados por `;` |
| `experiencia` | El dato propio del negocio que lo hace único, o `[DATO DE EXPERIENCIA]` |
| `enlaza_a` | URLs internas que debe enlazar en el texto, separadas por `;` |
| `volumen` | Número real de una herramienta, o `por validar` |
| `prioridad` | De 3 a 9 (sección 4.2 de `05`) |
| `ola` | En qué ronda se escribe y publica: 1, 2, 3... |
| `estado` | `pendiente`, `borrador`, `listo` o `publicado` |

En el mensaje de aprobación muestra por silo: la pilar, sus 10 artículos con título y pregunta, y la ola. Lo técnico (entidades, secundarias) se queda en el CSV.

**Olas de publicación.** La ola 1 lleva todas las pilares y de 3 a 4 artículos por silo, los de prioridad más alta. Así el sitio sale completo en estructura y cada silo ya tiene sustancia. Las olas siguientes completan cada silo. Publicar por olas permite revisar con cuidado cada artículo; la calidad pesa más que la velocidad.

## 7. Cómo se organizan los archivos del proyecto

Para un sitio de varias páginas, cada página se escribe una sola vez como fragmento y el script `construir-sitio.mjs` arma el sitio final: cabecera, menú, migas de pan, datos estructurados, enlaces del silo, sitemap y robots. Así 55 páginas comparten el mismo diseño sin copiar y pegar, y un cambio en el menú se aplica a todo el sitio.

```
mi-sitio/
├── sitio.json                      ← datos del negocio, silos, autores, dominio
├── plantillas/
│   ├── base.html                   ← el diseño común (cabecera, pie, botón fijo)
│   ├── articulo.html               ← opcional: diseño propio para artículos
│   └── pilar.html                  ← opcional: diseño propio para pilares
├── contenido/
│   ├── inicio.html                 → /
│   ├── nosotros.html               → /nosotros/
│   ├── contacto.html               → /contacto/
│   ├── blog.html                   → /blog/ (si no existe, se genera)
│   ├── autores/nombre-apellido.html → /autores/nombre-apellido/
│   └── mantenimiento-aire-acondicionado/
│       ├── index.html              → /mantenimiento-aire-acondicionado/ (la pilar)
│       └── cada-cuanto-hacer-mantenimiento.html → /mantenimiento-aire-acondicionado/cada-cuanto-hacer-mantenimiento/
├── publico/                        ← se copia tal cual: css/, js/, img/, fonts/, vendor/, favicon.ico
├── investigacion/                  ← informe, competencia, mapa-de-contenido.csv
├── LEEME.md
└── dist/                           ← el sitio final que se publica (lo genera el script)
```

- El nombre de la carpeta es el slug del silo y el nombre del archivo es el slug del artículo.
- `sitio.json` se arma con `assets/sitio.ejemplo.json`. Cada silo de la carpeta `contenido/` debe estar en `silos` de `sitio.json`.
- `plantillas/base.html` se diseña desde cero para cada marca con la dirección de arte aprobada. `assets/plantilla-base.html` muestra solo los marcadores técnicos que debe tener; no es un diseño.

### 7.1 Cabecera de cada fragmento

Cada archivo de `contenido/` empieza con un comentario con sus datos. Ejemplo:

```html
<!--
titulo: Cada cuánto hacer mantenimiento al aire acondicionado
descripcion: Frecuencia recomendada según el uso, señales de que ya toca y qué pasa si lo dejas pasar. Con datos de más de [CIFRA] equipos atendidos en [CIUDAD].
tipo: articulo
keyword: cada cuanto hacer mantenimiento aire acondicionado
pregunta: ¿Cada cuánto se hace mantenimiento a un aire acondicionado?
fecha: 2026-11-13
actualizado: 2026-11-13
autor: nombre-apellido
imagen: /img/blog/frecuencia-mantenimiento.webp
imagen_alt: Técnico revisando el filtro de un equipo minisplit
estado: listo
orden: 2
-->
<article class="articulo">
  ...el contenido, desde el h1...
</article>
```

| Campo | Obligatorio | Notas |
|---|---|---|
| `titulo` | Sí | Es el h1 y la base del `<title>` |
| `titulo_seo` | No | Si el `<title>` debe ser distinto del h1. Sin él: `titulo` + separador + marca |
| `descripcion` | Sí | De 120 a 160 caracteres |
| `tipo` | Sí | `inicio`, `pilar`, `articulo`, `servicio`, `pagina`, `blog`, `autor`, `contacto`, `nosotros` |
| `keyword` | En pilares, artículos y servicios | Única en todo el sitio |
| `pregunta` | En artículos | La pregunta que responde |
| `servicio` | En pilares y servicios que venden | Nombre del servicio: genera los datos estructurados de tipo Service |
| `fecha`, `actualizado` | En artículos | Formato `AAAA-MM-DD`. `actualizado` cambia solo con cambios reales |
| `autor` | En artículos | La clave del autor en `sitio.json` |
| `imagen`, `imagen_alt` | Recomendado | Imagen para compartir y para los datos estructurados |
| `estado` | Sí | `listo` se publica; `borrador` no se construye |
| `orden` | No | Orden dentro del silo |
| `noindex` | No | `si` para páginas de gracias o pruebas |

El fragmento lleva el `h1` y todo el contenido. No lleva `<html>`, `<head>`, menú ni pie: eso lo pone la plantilla.

### 7.2 Comandos

```bash
node scripts/construir-sitio.mjs mi-sitio            # arma mi-sitio/dist/
node scripts/construir-sitio.mjs mi-sitio --servir   # además abre el sitio en http://localhost:4321
node scripts/construir-sitio.mjs mi-sitio --borradores  # incluye borradores con noindex, solo para revisar
node scripts/construir-sitio.mjs mi-sitio --exportar    # además deja .construccion/contenido.json para WordPress, Shopify o Content&Co
node scripts/auditar-seo.mjs mi-sitio/dist          # revisa SEO, silo y enlaces; deja auditoria-seo.md
```

Requisitos: Node 18 o más. No instala nada.

## 8. Menú, migas de pan y bloques automáticos

La plantilla tiene marcadores con dos llaves que el script reemplaza. La lista completa está en `assets/plantilla-base.html`. Los que arman el silo:

| Marcador | Qué pone |
|---|---|
| `{{menu}}` | Lista con las pilares, blog, contacto y lo que diga `menu_extra`, con `aria-current` en la página actual |
| `{{migas}}` | Migas de pan visibles (Inicio › Silo › Artículo), con sus datos estructurados |
| `{{relacionados}}` | En artículos: bloque "Sigue leyendo" con la pilar y 3 hermanos del silo |
| `{{pie_silos}}` | Lista de pilares para el pie |
| `{{meta_articulo}}` | Autor y fechas visibles de publicación y actualización |
| `{{caja_autor}}` | Caja del autor con su cargo y enlace a su página |

Dentro de un fragmento:

- `<!-- cuva:lista-articulos -->` en una pilar inserta la lista de todos sus artículos publicados. Si la pilar no lo tiene, la lista va al final.
- `<!-- cuva:blog -->` en `contenido/blog.html` inserta los artículos de todos los silos agrupados.
- `<section data-faq>` con un `<details>` por pregunta genera los datos estructurados de preguntas frecuentes (FAQPage) a partir de lo visible.

Las clases que genera el script empiezan con `cuva-` (`.cuva-migas`, `.cuva-relacionados`, `.cuva-menu`). Se estilizan en el CSS de la marca con su dirección de arte, como cualquier otra pieza.

## 9. Crecer el sitio sin romper el silo

- Artículo nuevo: primero va al mapa, se revisa que su pregunta no exista ya, y luego se escribe en su carpeta.
- Silo nuevo: carpeta nueva, entrada en `sitio.json`, pilar y mínimo 10 artículos planeados antes de publicarlo en el menú.
- Cada 3 a 6 meses: revisa en Search Console qué páginas bajan, actualiza datos y fecha `actualizado`, y fusiona artículos que compiten entre sí (con redirección 301).
- Si un artículo empieza a atraer búsquedas de otro silo, no lo cambies de silo: escribe el artículo que falta en el silo correcto y enlázalo desde su pilar.

## 10. Errores comunes

- Un silo "blog" con todo adentro y categorías sin texto. Las categorías son las pilares, con contenido real.
- Artículos que enlazan a cualquier otro artículo del sitio "porque está relacionado": el silo se diluye.
- Menú con todos los artículos o pie con 60 enlaces.
- Dos artículos para la misma pregunta con distinto título.
- Cambiar URLs después de publicar sin redirección.
- Silos armados por volumen de búsqueda sin relación con lo que vende el negocio.
- Pilares que solo listan artículos, sin responder nada ni vender.
