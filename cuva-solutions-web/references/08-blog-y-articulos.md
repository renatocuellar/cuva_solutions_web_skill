# 08. Blog y artículos: cómo se escribe cada pieza

Lee este archivo antes de escribir la primera pilar o el primer artículo, y en cada ola de producción. Un sitio con 5 silos y 50 artículos solo funciona si cada artículo es mejor que lo que ya existe sobre su pregunta. Si son 50 textos promedio, el sitio pesa menos que uno con 10 buenos.

## Contenido

1. Antes de escribir: el brief
2. Entrevista de experiencia con la persona
3. Estructura de una pilar
4. Estructura de un artículo
5. Reglas de escritura
6. Imágenes
7. Diseño de lectura
8. Producción por olas
9. Revisión de cada artículo antes de marcarlo listo
10. Actualizar y mantener

---

## 1. Antes de escribir: el brief

Cada artículo sale de su fila en `mapa-de-contenido.csv`. Antes de escribirlo, completa este brief (no se muestra a la persona salvo que lo pida):

```
Artículo: [título]  ·  URL: [url]  ·  Silo: [silo]
Pregunta principal: [pregunta exacta]
Respuesta en dos frases: [lo que debe quedar claro aunque solo lea el inicio]
Intención: [aprender | resolver | comparar | contratar]
Lector: [quién es y en qué momento está]
Preguntas secundarias (h2): [de 3 a 6, de la investigación]
Entidades que debe nombrar: [...]
Experiencia del negocio que entra: [dato, caso, foto, precio, error frecuente] o [DATO DE EXPERIENCIA]
Fuentes externas para datos: [norma, entidad oficial, fabricante, estudio con fecha]
Enlaces internos: pilar [url] · hermanos [url, url] · otra pilar si aplica [url]
Acción al final: [botón principal y a dónde lleva]
Qué tiene que tener para ganarle a lo que ya existe: [lo que encontraste en la sección 4 de 05]
```

Si en "qué tiene que tener para ganarle" no tienes nada, el artículo todavía no está listo para escribirse.

## 2. Entrevista de experiencia con la persona

Es el insumo que convierte un artículo correcto en uno único. Hazla en la etapa 4, por silo, con preguntas cortas que la persona pueda contestar por audio o por WhatsApp:

1. ¿Qué es lo que más te preguntan los clientes sobre [tema]?
2. ¿Qué error ves seguido y cuánto le cuesta al cliente?
3. ¿Cuánto cuesta normalmente, en rango, y de qué depende?
4. ¿Cuánto tarda y cuáles son los pasos reales de tu proceso?
5. Cuéntame un caso: qué problema traía, qué hiciste y qué pasó. ¿Se puede contar con nombre?
6. ¿Qué haces distinto a tu competencia en esto?
7. ¿Qué le recomendarías a alguien que no te va a contratar?
8. ¿Tienes fotos o videos propios de esto?

Con 8 respuestas por silo hay material para sus 10 artículos. Lo que no conteste queda como marcador visible y en pendientes. Nunca se rellena con datos inventados: ni casos, ni cifras, ni años de experiencia, ni clientes.

## 3. Estructura de una pilar

La pilar es la mejor página del sitio sobre su tema y la que vende el servicio del silo.

1. **H1 con el tema o el servicio** y, debajo, la respuesta corta a la pregunta grande en 2 o 3 frases.
2. **Botón principal** en la primera pantalla.
3. **Para quién es y qué resuelve:** el problema en las palabras del cliente.
4. **El servicio:** qué incluye, cómo funciona el proceso y qué recibe el cliente.
5. **Prueba:** casos, fotos propias, credenciales, testimonios reales o su marcador.
6. **Guía del tema:** un resumen de cada subtema con enlace al artículo que lo desarrolla. Aquí va `<!-- cuva:lista-articulos -->` o los enlaces escritos dentro del texto.
7. **Costos o cómo se cotiza:** rangos reales con fecha, o el proceso para cotizar.
8. **Preguntas frecuentes** del servicio en `<section data-faq>`.
9. **Cierre con el botón principal.**

Extensión orientativa: lo necesario para cubrir el tema sin relleno, normalmente entre 1.500 y 3.000 palabras. Se diseña como una landing: con la dirección de arte completa, su gesto de movimiento por sección y los elementos gráficos de la marca.

## 4. Estructura de un artículo

```html
<!-- cabecera del fragmento: 06, sección 7.1 -->
<article class="articulo">
  <header>
    <h1>[Título: la pregunta o el tema como se busca]</h1>
    <p class="articulo-respuesta">[Respuesta directa en 2 o 3 frases. Si solo lee esto, ya obtuvo lo que buscaba.]</p>
    {{meta_articulo}} va en la plantilla, junto al título
  </header>

  <nav class="articulo-indice" aria-label="En este artículo">[índice con enlaces a cada h2, si tiene 5 o más]</nav>

  <p>[Contexto corto y enlace a la pilar con texto descriptivo.]</p>

  <h2>[Pregunta secundaria 1]</h2>
  <p>[Primera frase: la respuesta. Luego el detalle, el ejemplo y el dato con su fuente.]</p>

  <h2>[Pregunta secundaria 2]</h2>
  <table>[si hay comparación o precios]</table>

  <h2>[Lo que vemos en (negocio): experiencia propia]</h2>
  <p>[Dato del negocio, caso o error frecuente. O el marcador [DATO DE EXPERIENCIA].]</p>

  <section data-faq>
    <h2>Preguntas frecuentes</h2>
    <details><summary>[Pregunta]</summary><p>[Respuesta en 1 a 3 frases]</p></details>
  </section>

  <aside class="articulo-accion">[Bloque con el botón principal, con el verbo de todo el sitio]</aside>

  <footer class="articulo-fuentes"><h2>Fuentes</h2><ul><li>[Fuente con fecha]</li></ul></footer>
</article>
```

Notas:

- **Extensión según la intención,** no por número: una pregunta puntual se responde bien en 800 a 1.200 palabras; una guía o comparativa, en 1.500 a 2.500. Si alcanza con menos, menos.
- **El índice** va solo en artículos con 5 `h2` o más.
- **Preguntas frecuentes** de 3 a 5, distintas de los `h2`.
- **Fuentes** solo si se usaron datos externos. Entidades oficiales, normas, fabricantes y estudios con fecha. Nunca se inventa una fuente ni un enlace.
- **El caso real** lleva permiso del cliente para nombrarlo; sin permiso se describe sin datos que lo identifiquen.

## 5. Reglas de escritura

1. **Primero la respuesta, después el porqué.** En el artículo y en cada sección.
2. **En español de la persona y de su país:** vocabulario, moneda y medidas locales. De tú o de usted según su marca, igual en todo el sitio.
3. **Frases cortas y voz activa.** Un párrafo, una idea. Máximo 4 líneas en celular.
4. **Concreto sobre general:** "entre 3 y 6 meses según el uso" en lugar de "periódicamente".
5. **Cero relleno:** sin introducciones sobre "en el mundo de hoy", sin repetir el título, sin conclusiones que resumen lo que acaba de leer.
6. **Que se lea como lo escribió una persona que sabe del tema** y lo quiere contar bien: con un hilo de principio a fin, ejemplos y opinión fundamentada del negocio. Si la persona tiene la skill `humanizer` o una propia de estilo, pásale el texto.
7. **Muletillas de texto automático fuera:** "en conclusión", "cabe destacar", "es importante mencionar", "sumérgete", "descubre", "potencia", "en el dinámico mundo", "no solo X sino también Y", listas de tres adjetivos, rayas largas para conectar ideas.
8. **Cada afirmación con sustento:** experiencia del negocio, fuente externa con fecha o razonamiento claro. Lo que no se pueda sostener, se quita.
9. **Nada de salud, finanzas o legal sin respaldo profesional:** en esos temas el autor tiene credenciales visibles o el artículo cita a la autoridad correspondiente, y se aclara cuándo consultar a un profesional.
10. **Palabra clave con naturalidad:** en el `h1`, en la primera frase y donde caiga sola. Nunca repetida para posicionar.

## 6. Imágenes

- **Una imagen destacada por artículo** (también se usa para compartir) y de 1 a 3 dentro del texto donde expliquen algo.
- **Fotos propias primero.** Si no hay, ilustración o composición con los elementos gráficos de la marca (`01-identidad-y-referencia.md`, 3.2). Las imágenes generadas con IA solo como ilustración, nunca simulando fotos del negocio, su equipo o sus clientes.
- WebP, de 30 a 150 KB, con `width`, `height`, `loading="lazy"` y `alt` que describe la imagen. La destacada se exporta además en JPG de 1200 x 630 para compartir.
- Nombre de archivo descriptivo: `filtro-minisplit-sucio.webp`, no `IMG_2034.webp`.

## 7. Diseño de lectura

Los artículos son parte del diseño, no una plantilla de blog genérica. Se diseñan en la hoja de muestra de la etapa 3 (una pantalla de artículo) con la dirección de arte de la marca.

- Ancho de texto de 60 a 75 caracteres por línea en escritorio.
- Texto base de 17 a 18 px en celular y de 18 a 20 px en escritorio, con interlineado de 1.5 a 1.7.
- Títulos con la tipografía de la marca; texto largo con la más legible del sistema.
- La respuesta directa destacada con un recurso de la marca (un trazo, un color suave, un elemento gráfico propio).
- Tablas que se desplazan dentro de su caja en celular, sin romper el ancho de la página.
- El bloque de acción, la caja de autor y "Sigue leyendo" con piezas de la marca.
- Movimiento mínimo: revelado discreto y, si la dirección lo pide, barra de progreso. Sin preloader.

## 8. Producción por olas

1. La ola 1 se escribe en la etapa 5, junto con el sitio: todas las pilares y de 3 a 4 artículos por silo.
2. Cada ola siguiente: de 5 a 10 artículos por ronda, todos del mismo silo cuando se pueda (comparten entrevista, entidades y fuentes).
3. Al empezar cada ronda, di cuáles artículos van y cuántas respuestas vas a necesitar.
4. Cada artículo pasa la revisión de la sección 9, se marca `estado: listo`, se construye el sitio y se corre `auditar-seo.mjs`.
5. Al cerrar la ronda: actualiza el estado en el mapa, agrega a los hermanos ya publicados los enlaces hacia los nuevos y entrega la lista de lo publicado y de los marcadores pendientes.

## 9. Revisión de cada artículo antes de marcarlo listo

- [ ] Responde la pregunta en las primeras 2 o 3 frases.
- [ ] Tiene al menos un dato de experiencia del negocio, o el marcador está anotado en pendientes.
- [ ] Ningún dato inventado: cada cifra tiene fuente y fecha o viene de la persona.
- [ ] Mejor que lo que existe hoy para su pregunta: tiene lo anotado en el brief.
- [ ] Enlaza a su pilar en los primeros párrafos, a 2 o 3 hermanos y, como máximo, a una pilar de otro silo.
- [ ] Ningún enlace a borradores ni a páginas que no existen.
- [ ] Un solo `h1`, `h2` en forma de pregunta donde corresponde, preguntas frecuentes visibles.
- [ ] Título de 50 a 60 caracteres y descripción de 120 a 160, únicos en el sitio.
- [ ] Imagen destacada con `alt`, medidas y peso correcto.
- [ ] Se lee de corrido, con hilo, sin muletillas ni relleno.
- [ ] Autor y fechas correctas en la cabecera del fragmento.

## 10. Actualizar y mantener

- Cambia `actualizado` solo cuando cambies contenido real (datos, precios, secciones). Cambiar la fecha sin cambiar nada es engañoso para el lector.
- Revisa los artículos de costos y normas al menos una vez al año.
- Si dos artículos compiten por la misma búsqueda en Search Console, fusiónalos en el mejor y redirige el otro.
- Cuando se publica un artículo nuevo, agrega enlaces hacia él desde 2 o 3 hermanos que ya existen.
