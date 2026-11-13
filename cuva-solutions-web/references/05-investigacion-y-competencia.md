# 05. Investigación: competencia, búsquedas y preguntas reales

Lee este archivo en la etapa 2. Aquí se decide de qué va a hablar el sitio, contra quién compite y qué tiene que tener para que Google y los asistentes con IA (ChatGPT, Gemini, Perplexity, Claude, Copilot) lo elijan como respuesta. El diseño se decide después, en la etapa 3. La investigación manda sobre la arquitectura; el diseño la hace irresistible.

## Contenido

1. Qué pedir a la persona
2. Dos tipos de referencia web: de diseño y de competencia
3. Cómo analizar un sitio de la competencia
4. Investigar lo que la gente busca
5. Investigar lo que responden los asistentes con IA
6. Matriz de competencia y brechas
7. Qué traemos y qué nunca se trae
8. Informe de investigación para aprobación
9. Errores comunes

---

## 1. Qué pedir a la persona

Pide solo lo que no tengas. Si pegó una ficha o un brief, toma de ahí cada dato.

| Dato | Para qué sirve | Si no lo tiene |
|---|---|---|
| Qué vende, a quién y en qué país o ciudad | Define el mercado de búsqueda y el idioma (`es-CO`, `es-MX`, `es-CL`...) | Obligatorio |
| Su servicio más rentable y la acción que quiere (cotizar, agendar, comprar, escribir por WhatsApp) | Define las páginas que venden y el botón principal | Obligatorio |
| De 2 a 5 competidores con su URL | Matriz de competencia | Búscalos tú con 3 a 5 búsquedas de su servicio y su ciudad, y confírmalos con la persona |
| Sitios web que le gustan por su diseño (cualquier giro) | Referencia de diseño, igual que Pinterest | Se usan las de Pinterest o se proponen direcciones desde su identidad |
| Palabras con las que sus clientes lo buscan | Semillas de búsqueda | Sácalas de cómo describe su negocio y de sus clientes, y confírmalas |
| Preguntas que le hacen sus clientes antes de comprar | Contenido AEO, preguntas frecuentes, artículos | Obligatorio pedir al menos 10. Son el material más valioso del sitio |
| Datos de experiencia: casos, años, procesos, rangos de precio, errores que ve, fotos propias | Lo que ningún competidor puede copiar | Marcador `[DATO DE EXPERIENCIA]` y pregunta en la etapa 4 |
| Acceso o exportes de Search Console, Google Ads, Semrush, Ahrefs o Ubersuggest | Volúmenes reales de búsqueda | Se prioriza por intención y valor; el volumen queda "por validar" |
| Sitio actual, si existe | URLs que hay que conservar o redirigir | Sitio nuevo |

**Regla de oro de la investigación: nunca inventes volúmenes de búsqueda, dificultad, tráfico de la competencia ni posiciones.** Si no vienen de una herramienta o de un exporte que te dio la persona, no existen. Escribe "por validar" y explica cómo conseguir el dato (Planificador de palabras clave de Google Ads gratis, o la herramienta que ya pague).

---

## 2. Dos tipos de referencia web: de diseño y de competencia

La persona puede mandar URLs con dos intenciones distintas. Pregunta cuál es cada una si no lo dijo; una misma URL puede ser las dos.

**Referencia de diseño.** Funciona igual que una captura de Pinterest (`01-identidad-y-referencia.md`, sección 2): se toma la estructura y la sensación, nunca sus textos, fotos ni logos. Con una URL tienes algo más que una captura: el movimiento real, el ritmo de scroll y cómo resuelve el celular. Pide además una captura de lo que más le gusta, porque WebFetch lee el texto y no ve el diseño. Si tienes navegador (Claude en Chrome o el navegador integrado), ábrela, recórrela a 375 px y a escritorio y toma capturas tú.

**Referencia de competencia.** Sirve para saber qué cubren, cómo se organizan, qué señales de confianza muestran y dónde fallan. De aquí sale la arquitectura y el plan de contenido. Su diseño importa poco.

---

## 3. Cómo analizar un sitio de la competencia

### 3.1 Qué revisas de cada sitio

Por cada competidor revisa estas páginas, en este orden:

1. `/robots.txt` y `/sitemap.xml` (o `/sitemap_index.xml`): cuántas páginas tiene, cómo agrupa las URLs, si bloquea a los rastreadores de IA.
2. La página de inicio.
3. De 2 a 4 páginas de servicio, las más cercanas a lo que vende tu cliente.
4. El índice del blog y de 3 a 5 artículos (los que aparecen en las búsquedas de la sección 4).
5. Contacto o "nosotros", para ver señales de confianza.

No revises más de 15 páginas por competidor. Respeta su `robots.txt`.

### 3.2 Lista de análisis: 14 puntos

| # | Qué miras | Qué anotas |
|---|---|---|
| 1 | Arquitectura | Cómo agrupa las URLs (`/servicios/`, `/blog/categoria/`), profundidad en clics, si hay silos reales o todo cuelga del blog |
| 2 | Páginas que venden | Cuántas, una por servicio o todo en una, si tienen precio o rango |
| 3 | Temas que cubre | Lista de temas del blog agrupados, cuántos artículos por tema |
| 4 | Intención que atiende | Qué etapa cubre: aprender, comparar, decidir, contratar |
| 5 | Títulos y metadatos | `title`, descripción, `h1` y los `h2` de cada página revisada |
| 6 | Profundidad | Palabras aproximadas, si responde directo arriba o da vueltas, si usa tablas, pasos, ejemplos, fotos propias |
| 7 | Preguntas que responde | Las preguntas explícitas (títulos con "¿...?", secciones de preguntas frecuentes) |
| 8 | Datos estructurados | Tipos de JSON-LD que usa: Organization, LocalBusiness, Service, Article, BreadcrumbList, FAQPage, Person, Product |
| 9 | Autoría y experiencia | Si los artículos tienen autor con nombre, credenciales, fecha de actualización, fuentes citadas |
| 10 | Señales de confianza | Casos, testimonios con nombre, logos de clientes, certificaciones, años, ubicación física, Perfil de Empresa en Google |
| 11 | Enlazado interno | Si los artículos enlazan a la página que vende, migas de pan, artículos relacionados |
| 12 | Conversión | Botón principal, WhatsApp, formulario, qué tan rápido llega a la acción |
| 13 | Técnico | Si el contenido se ve sin JavaScript, velocidad percibida, si funciona bien en celular |
| 14 | Debilidad explotable | Lo que hace mal o no hace: contenido viejo, sin respuesta directa, sin precios, sin casos, sin páginas por servicio |

### 3.3 Cómo leerlo según tus herramientas

**Con terminal y salida a internet (Claude Code en la computadora de la persona):** corre el analizador de la skill. Lee el sitemap, revisa hasta 15 páginas y deja un reporte con los puntos 1, 5, 6, 7, 8, 9 y 11 medidos.

```bash
node scripts/analizar-competencia.mjs https://competidor1.com https://competidor2.com --salida investigacion/competencia --max 15
```

Deja `investigacion/competencia/resumen.md` (para leer) y `datos.json` (para comparar). Los puntos 2, 3, 4, 10, 12, 13 y 14 los completas tú leyendo el reporte y las páginas.

**Sin salida a internet desde la terminal (Claude en la nube, claude.ai):** usa WebFetch página por página con una instrucción precisa, por ejemplo:

> "Lista el title, la meta descripción, el h1 y todos los h2 y h3 en orden. Di qué tipos de datos estructurados (JSON-LD) aparecen, si hay autor y fecha, cuántas palabras tiene aproximadamente y a qué páginas del mismo sitio enlaza."

WebFetch convierte la página a texto y a veces pierde el JSON-LD. Si el punto 8 no sale, anótalo como "no verificado" y, si hay navegador disponible, revísalo ahí con `document.querySelectorAll('script[type="application/ld+json"]')`.

**Con navegador (Claude en Chrome o el navegador integrado):** úsalo para los puntos 12 y 13, para las capturas de diseño y para el JSON-LD.

---

## 4. Investigar lo que la gente busca

### 4.1 De semillas a temas

1. Arma de 5 a 10 semillas: el servicio con sus sinónimos, el problema que resuelve y el resultado que busca el cliente, cada uno con y sin ciudad.
2. Por cada semilla haz una búsqueda web y anota los 5 primeros resultados: qué tipo de página gana (servicio, guía, lista, comparativa, directorio, video, foro). Eso dice la intención: si ganan guías, una página de venta no va a posicionar para esa búsqueda.
3. Por cada semilla busca variantes en forma de pregunta: "cuánto cuesta", "cómo elegir", "qué es mejor", "vale la pena", "cada cuánto", "requisitos", "errores", "vs". Anota las preguntas que se repiten en los resultados.
4. Agrupa todo por tema. Cada grupo grande con suficiente demanda y relación con lo que vende es candidato a silo.

### 4.2 Intención y valor

Clasifica cada tema y cada pregunta:

| Intención | Qué busca | Qué página la atiende | Valor para el negocio |
|---|---|---|---|
| Aprender | Entender un tema | Artículo de guía o definición | Bajo a medio: atrae y educa |
| Comparar | Opciones, precios, diferencias | Comparativa, guía de costos, "cómo elegir" | Alto: está decidiendo |
| Contratar | Proveedor en su zona | Página de servicio, página pilar que vende | Muy alto |
| Resolver | Un problema puntual | Artículo de solución con pasos | Medio: genera confianza |

Prioriza con esta fórmula sencilla y explícala así a la persona: **prioridad = cercanía a la venta + qué tan bien podemos responderlo con su experiencia + qué tan débil está la competencia en ese tema.** Cada factor de 1 a 3. El volumen entra cuando hay datos reales.

### 4.3 Si la persona tiene datos

- **Search Console:** exporta Consultas y Páginas de los últimos 12 meses. Las consultas con impresiones y posición entre 5 y 20 son las oportunidades más rápidas.
- **Semrush, Ahrefs, Ubersuggest o Planificador de Google Ads:** pide un CSV de palabras clave con volumen del país. Úsalo para ordenar dentro de cada silo, nunca para inventar los que faltan.
- **Google Trends:** sirve para estacionalidad y para comparar dos términos. Si no lo puedes consultar, pide una captura.

---

## 5. Investigar lo que responden los asistentes con IA

Los asistentes arman su respuesta buscando en la web y citan fuentes. Para aparecer, el sitio tiene que ser rastreable, claro y la mejor respuesta disponible. Google lo dice así en su guía de mayo de 2026: optimizar para sus funciones con IA es optimizar para la búsqueda, o sea, buen SEO. No hay atajo técnico.

### 5.1 Prompts de prueba

Arma de 10 a 15 preguntas como las haría un cliente real, por ejemplo:

- "¿Cuál es la mejor empresa de [servicio] en [ciudad]?"
- "¿Cuánto cuesta [servicio] en [país] en [año]?"
- "¿Qué debo revisar antes de contratar [servicio]?"
- "[Opción A] o [opción B]: ¿qué me conviene si [situación]?"

Pide a la persona que las haga en ChatGPT (con búsqueda), Gemini o el Modo IA de Google, y Perplexity, y que te mande capturas o te pegue qué fuentes citan. Tú haz las mismas búsquedas en la web y anota qué sitios salen.

Anota por pregunta: quién aparece citado, qué tipo de página es y qué tiene en común (respuesta directa arriba, tabla de precios, lista de pasos, fecha reciente, autor experto). Esa lista se repite en la medición después de publicar (`07-seo-tecnico-y-aeo.md`, sección 9).

### 5.2 Qué buscan los asistentes en una fuente

- Una respuesta clara y temprana a la pregunta exacta.
- Datos concretos con fuente y fecha: precios, plazos, requisitos, medidas.
- Experiencia propia que no está en otros sitios: casos, fotos, procesos, errores vistos.
- Coherencia de la marca en la web: mismo nombre, dirección y teléfono en el sitio, en el Perfil de Empresa de Google y en directorios; menciones reales en medios, foros y redes. Las menciones compradas o fabricadas no sirven y Google las trata como spam.

---

## 6. Matriz de competencia y brechas

### 6.1 Matriz

Una fila por competidor y una para tu cliente (estado actual o "sitio nuevo"). Columnas cortas:

| Sitio | Páginas en sitemap | Silos o temas | Páginas por servicio | Blog: artículos y temas | Respuesta directa | Datos estructurados | Autor y fecha | Confianza | Punto débil |
|---|---|---|---|---|---|---|---|---|---|

### 6.2 Brechas

Tres listas:

1. **Temas que cubren y nosotros no:** obligatorios para competir.
2. **Temas o preguntas que nadie responde bien:** la oportunidad más rápida. Nadie da precios, nadie compara, nadie explica el proceso con fotos reales, nadie actualizó desde hace dos años.
3. **Formatos que faltan:** calculadora, tabla comparativa, guía paso a paso con fotos, glosario, página por ciudad donde sí hay presencia real.

### 6.3 Ángulo para ganar

De 3 a 5 apuestas concretas, cada una con su porqué. Ejemplo de forma (los datos son de cada caso):

- "Publicar rangos de precio reales con fecha: ningún competidor lo hace y es la pregunta que más se repite."
- "Un silo completo de mantenimiento: los competidores solo hablan de venta."
- "Casos con fotos propias en cada página de servicio."

---

## 7. Qué traemos y qué nunca se trae

| Se trae de la competencia | Nunca se trae |
|---|---|
| Los temas y preguntas que el mercado ya demostró que importan | Sus textos, ni reescritos con otras palabras |
| La organización que funciona (qué agrupa con qué) | Sus fotos, ilustraciones, videos o logos |
| Los tipos de página que ganan cada búsqueda | Sus datos, cifras o casos presentados como del cliente |
| Las señales de confianza que el cliente también tiene | Sus testimonios o reseñas |
| Los tipos de datos estructurados útiles | Su marca, su tono reconocible o su diseño exacto |
| Lo que les falta, para hacerlo mejor | Afirmaciones que el cliente no puede respaldar |

Prueba rápida para cada idea: si sale de la competencia, ¿el cliente la puede decir con su propia experiencia y sus datos? Si no, no entra.

---

## 8. Informe de investigación para aprobación

Va en lenguaje sencillo, máximo 900 palabras en el mensaje. El detalle completo va en `investigacion/informe.md`.

```
## Lo que encontré (resumen en 5 líneas)

## Tu competencia en una tabla
[matriz corta]

## Dónde podemos ganar
[3 a 5 apuestas con su porqué]

## Propuesta de silos (los grandes temas del sitio)
| Silo | Qué cubre | Por qué | Página que vende |
[mínimo 5]

## Lo que falta para hacerlo mejor que ellos
[datos de experiencia, fotos, precios, casos: preguntas concretas]

## Por validar
[lo que decidiste tú]

¿Te hacen sentido estos temas para tu negocio?
```

Los silos se aprueban aquí porque son una decisión de negocio: definen el menú, las páginas que venden y el plan de contenido. El detalle de cada silo (URLs, artículos, enlaces) se arma en la etapa 4 con `06-arquitectura-silo.md`.

---

## 9. Errores comunes

- Inventar volúmenes de búsqueda o "dificultad" para que la tabla se vea completa.
- Copiar la estructura de artículos de un competidor punto por punto: sale un contenido que ya existe y no hay razón para preferirlo.
- Elegir silos por volumen sin relación con lo que vende: llega tráfico que nunca compra.
- Analizar 40 páginas de cada competidor. Con 10 a 15 bien elegidas basta.
- Confundir referencia de diseño con referencia de competencia y terminar con el diseño del competidor.
- Olvidar preguntar por los datos de experiencia. Sin ellos, los 50 artículos se parecen a todo lo demás que ya está en internet.
