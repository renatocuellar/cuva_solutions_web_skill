# 01. Identidad y referencia: de la marca del cliente a una dirección de arte propia

Lee este archivo en las etapas 1 y 3: cuando recibes los materiales de la persona, cuando analizas la referencia que vio en Pinterest o en un sitio web y cuando propones la dirección de arte que se aprueba antes de construir. La investigación de competencia y búsquedas (etapa 2) está en `05-investigacion-y-competencia.md`.

No hay plantilla base: lees la referencia, entiendes qué le gusta de ella, la fusionas con su identidad y propones una dirección de arte propia, con elementos gráficos y movimiento hechos para esa marca. El orden no cambia: recibir la identidad, preparar los materiales, leer la referencia, fusionar las dos, presentar la dirección, esperar un sí y solo entonces construir.

## Contenido

1. Recibir y preparar la identidad
2. Leer una referencia de Pinterest o de un sitio web
3. Fusionar identidad y referencia en una dirección de arte original
4. Si la persona no tiene identidad
5. Errores comunes
6. Lista antes de construir

---

## 1. Recibir y preparar la identidad

### 1.1 La carpeta de materiales

Pide todo en una sola carpeta, en Drive o en su computadora, con esta forma. En Claude Code, que la ponga dentro del proyecto o te diga la ruta. En claude.ai, que adjunte los archivos en el chat: máximo 20 archivos por chat, imágenes en JPEG, PNG, GIF o WebP, de menos de 8000 px por lado y menos de 30 MB. Primero logo, referencias y foto principal; después, solo sus mejores fotos de trabajo. Las imágenes van directo en el chat y no en los archivos de un Proyecto, porque de ahí Claude solo lee el texto.

```text
materiales/
  logo/              SVG de cada versión y del símbolo por separado
  colores-y-tipo/    HEX, nombre de la tipografía, manual de marca si existe
  elementos/         patrones, íconos, texturas, formas propias
  foto-principal/    foto de medio cuerpo o cuerpo completo
  fotos/             trabajo, clientes, eventos, espacio, producto
  ilustraciones/     PNG con fondo transparente o sobre blanco liso
  videos/            originales, con lugar y fecha de cada uno
  logos-clientes/    solo de clientes reales y con permiso
  referencias/       capturas de Pinterest y lo que le gusta de cada una
```

Si tiene manual de identidad, pídelo primero: ahí suelen estar los HEX exactos, las tipografías, el espacio que se deja alrededor del logo y los usos prohibidos. Respeta esos usos prohibidos aunque la referencia sugiera lo contrario.

Revisa todo lo que llegó y arma la ficha de identidad (1.12) antes de opinar sobre diseño.

### 1.2 Logo

**Lo ideal:** SVG en todas sus versiones: a color, blanco, negro y el símbolo (isotipo) por separado. El SVG se ve nítido en cualquier tamaño, pesa poco, se pinta con CSS y, sobre todo, se puede animar por partes.

**Si solo hay PNG:** que mida 2000 px o más de ancho y tenga fondo transparente. Con PNG la entrada anima el logo completo (escala, opacidad, máscara), no pieza por pieza. Díselo a la persona así: "Con tu logo en SVG puedo armarlo letra por letra en la entrada; con PNG entra completo".

**En claude.ai:** el chat no acepta archivos .svg (solo JPEG, PNG, GIF y WebP). El logo llega en PNG para que lo veas y, si tiene SVG, su código pegado en la conversación (lo abre con TextEdit o Bloc de notas y copia todo desde `<svg`). Con el código puedes leerlo, separarlo y animarlo dentro del archivo único. Si solo tienes el código y no puedes dibujarlo con tu herramienta de código, pide el PNG antes de describir el logo: nunca supongas cómo se ve.

**Comprueba que el SVG sea vector de verdad.** Si adentro hay una etiqueta `<image` o un texto larguísimo con `base64`, es una foto metida en un SVG: no sirve para animar ni para pintar con CSS. Pide el original a quien diseñó el logo, exportado desde Illustrator, Figma o Affinity.

```bash
grep -c '<image\|base64' logo.svg                                  # más de 0: es un PNG disfrazado
grep -c '<text' logo.svg                                           # más de 0: letras como texto, sin convertir a curvas
grep -o 'fill="#[0-9A-Fa-f]\{3,6\}"' logo.svg | sort | uniq -c     # colores que trae el archivo
grep -o 'font-family="[^"]*"' logo.svg | sort -u                   # fuentes de las que depende el texto
```

**Letras como texto (`<text>`).** Hay logos que son vector pero traen el nombre o el lema como texto escrito con una fuente (Georgia, Arial o la que sea), sin convertir a curvas. Cada dispositivo lo dibuja con la fuente que tenga instalada: en un Android sin Georgia, el nombre sale con otra letra. Además, así no se puede animar letra por letra. Qué hacer:

- En la ficha va como **por preparar**. Pide a quien lo diseñó la versión con el texto convertido a curvas (en Illustrator: Texto, Crear contornos; en Figma: Flatten o Aplanar).
- Mientras llega, usa el logo tal cual, sin cambiar su tipografía ni sustituirla por otra parecida.
- Avisa a la persona en palabras simples ("en algunos celulares tu nombre puede verse con otra letra hasta que tengamos el logo en curvas") y anótalo en Por validar.

**Separa las piezas para poder animarlo.** Para que una entrada arme el logo, cada pieza (cada letra, el símbolo, el ®, una línea) tiene que ser un trazo propio:

- Si el SVG ya trae cada letra como `<path>` aparte, mételas en un sprite: un SVG escondido al inicio del `<body>` con cada pieza como `<g id>` dentro de `<defs>`, con sus coordenadas originales. Cualquier `<svg>` con el mismo `viewBox` del logo que las use con `<use>` las muestra cada una en su lugar. El mismo dibujo sirve para la entrada, la barra de navegación, el footer y el favicon. En la landing de referencia el logo vive así: una pieza por letra (`logo-l1`, `logo-l2`...), el registro (`logo-reg`) y el símbolo (`logo-iso`).
- Si todas las letras son un solo trazo compuesto, separarlas a mano es frágil. Pide a quien lo diseñó que lo exporte con las letras desagrupadas (en Illustrator: Objeto, Trazado compuesto, Liberar). Si no hay forma, anima el logo completo y busca otra pieza para la firma de movimiento: el símbolo, una línea, un subrayado.
- Usa `fill="currentColor"` para que el logo tome el color del texto donde esté (blanco sobre el color de marca, oscuro sobre fondo claro) sin necesitar tres archivos.
- Cada pieza gira y sube desde su base con `transform-box: fill-box; transform-origin: 50% 100%`.

```html
<!-- Sprite: va una sola vez, al inicio del body -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <g id="logo-1"><path d="[TRAZO DE LA PRIMERA LETRA]"/></g>
    <g id="logo-2"><path d="[TRAZO DE LA SEGUNDA LETRA]"/></g>
  </defs>
  <symbol id="iso" viewBox="0 0 [ANCHO DEL SÍMBOLO] [ALTO]"><path d="[TRAZO DEL SÍMBOLO]"/></symbol>
</svg>

<!-- Donde se use: mismo viewBox que el logo original -->
<svg class="logo" viewBox="0 0 [ANCHO DEL LOGO] [ALTO]" fill="currentColor" role="img" aria-label="[NOMBRE DE LA MARCA]">
  <use href="#logo-1" class="logo__pieza"/><use href="#logo-2" class="logo__pieza"/>
</svg>
```

```css
.logo__pieza{transform-box:fill-box;transform-origin:50% 100%}
```

**Tamaño:** el logo es firma, no protagonista. En el menú se mide por la altura legible del nombre, no por el ancho del archivo: el nombre de la marca debe medir de 14 a 18 px de alto. Así funciona igual con un logo corto y con uno horizontal con lema (con un ancho fijo de 96 px, un logo de proporción 3.8 a 1 deja su lema en unos 2.6 px, ilegible).

- Para calcularlo: alto del SVG en el menú = alto deseado del nombre x (alto total del logo ÷ alto del nombre dentro del archivo). Si el nombre ocupa el 40 % del alto del logo, para un nombre de 16 px el SVG va a 40 px de alto.
- Si con esa altura el lema queda por debajo de 7 px, usa una versión compacta (símbolo y nombre, sin lema) y anótalo en Por validar. El lema completo puede vivir en el footer o en la portada.
- En el footer el logo puede crecer (en la landing de referencia, `min(300px, 56vw)`) sin quitarle el lugar al mensaje: ahí el dueño lo vio enorme y se achicó. El protagonista del sitio es lo que gana el cliente.

**Espacio alrededor y usos prohibidos:** si el manual los define, respétalos. Si no, deja alrededor del logo por lo menos la altura de una de sus letras.

### 1.3 Colores con roles

Pide los colores en HEX (por ejemplo `#1450FB`) y tómalos del archivo oficial, no de una captura de pantalla: las capturas cambian el tono, y un azul "parecido" se nota junto al logo. Si la persona no los sabe, léelos tú del SVG con el comando de arriba.

Un HEX suelto no basta. Cada color necesita un rol; así se usa con disciplina y el sitio se ve de marca y no de collage.

| Rol | Para qué | Cómo se obtiene |
|---|---|---|
| Principal (`--brand`) | Cejas, enlaces, fondos de las secciones protagonistas | El color de la marca, exacto |
| Acción (`--cta`) | Fondo del botón principal y de los botones de servicio | El color que la persona eligió para botones: puede ser el principal o el acento. Su contraste se resuelve abajo |
| Texto sobre la acción (`--cta-ink`) | La letra del botón | Blanco, o el oscuro de la marca si el blanco no pasa |
| Principal presionado | Hover y estado activo de enlaces y piezas del color principal | El principal de 10 a 15 % más oscuro |
| Principal suave | Fondo de íconos, halo de foco, chips | El principal muy aclarado |
| Principal para texto sobre oscuro | Cejas y enlaces sobre fondo oscuro | El principal aclarado hasta que pase contraste |
| Oscuro (`--ink`) | Texto, secciones oscuras, footer | El negro del manual o un casi negro |
| Fondo (`--bg`) | Fondo general | El de la identidad. En marcas claras, un blanco cálido o tintado se ve más cuidado que el blanco puro |
| Superficie (`--surface`) | Tarjetas y formularios | Blanco o el fondo un paso más claro |
| Línea (`--line`) | Bordes y separadores | Entre el fondo y el texto secundario, muy sutil |
| Texto secundario (`--muted`) | Párrafos de apoyo | Gris que pase contraste sobre el fondo |
| Acento | Detalles: un sello, un subrayado, un sticker | El secundario de la marca; se usa poco |
| Error | Mensajes del formulario | Rojo, solo para errores |

Así quedaron los roles en la landing de referencia, como ejemplo de cómo se llenan y no como paleta para reutilizar: principal `#1450FB` (también es el color de la acción, con letra blanca), presionado `#0D3ED1`, suave `#DCE5FB`, para texto sobre oscuro `#8FB0FF`, oscuro `#0A0A0A`, fondo `#F6F5F1` y acento crema `#FCE9D3`.

**Contraste.** Comprueba cada pareja de texto y fondo que vas a usar: 4.5 a 1 para texto normal; 3 a 1 para títulos grandes (24 px o más, o 18.7 px en negrita) y para bordes de botones y campos. El caso de la landing de referencia lo explica: el azul con texto blanco da 5.88 y pasa, pero el mismo azul como texto sobre el negro da 3.37 y no pasa; por eso existe `#8FB0FF`, que sobre negro da 9.26. Un color que no pasa como texto se usa en superficies grandes, en formas o en detalles, no en letras.

**El color del botón (`--cta`).** La letra del botón casi siempre es texto normal, así que necesita 4.5 a 1. Resuélvelo en este orden:

1. Letra blanca, si pasa sobre el color que la persona eligió para botones.
2. Si no pasa, letra con el color oscuro de la marca (`--cta-ink: var(--ink)`).
3. Si tampoco alcanza, oscurece el botón lo justo para que pase con una de las dos, y anótalo en Por validar.

Hover y presionado no pueden romper lo que ya pasó. Si oscurecer el botón baja el contraste, el hover se aclara en vez de oscurecerse, y el estado presionado se resuelve con escala o forma (un hundimiento con `scale: .97`, un radio que cambia) en lugar de color. Caso de la prueba con una alumna: su terracota para botones daba 2.95 a 1 con letra blanca (no pasa) y 5.03 con la tinta de su marca (pasa); oscurecerlo al presionar bajaba a 4.29, así que el presionado se resolvió con escala.

```js
// Pega en la consola. Solo HEX de 6 dígitos.
const lum = (hex) => {
  const c = hex.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
ratio('#1450FB', '#FFFFFF'); // 5.88: texto blanco sobre el principal, pasa
```

Para la persona: webaim.org/resources/contrastchecker hace lo mismo sin código. Los números de contraste van al LEEME, no al mensaje ni a la hoja de muestra: a la persona le dices "el botón lleva letra oscura para que se lea bien".

**Cuánto de cada color.** La proporción la sugiere la referencia (cómo usa el color, punto 3 de la sección 2.2); el rol de cada color lo pone la identidad. Como regla general, el principal aparece con intención (cejas, una o dos secciones completas y los botones si son de ese color) y el acento casi no se ve, salvo en los botones cuando la persona lo eligió para ellos. Si el principal está en todo, deja de llamar la atención.

### 1.4 Tipografías

Pide el nombre exacto y los pesos que usa, por ejemplo "Poppins 400, 500, 600, 700 y 800".

- **De Google Fonts.** En Claude Code descarga los `woff2` (subconjunto latino) y sírvelos desde la carpeta `fonts/` del proyecto: cargan más rápido y no dependen de otro servidor. Para obtenerlos, pide la hoja de estilos de Google Fonts con un user agent de navegador moderno y baja los archivos que lista. En claude.ai enlázalas desde Google Fonts con `display=swap`.
- **Propia o de pago.** Pide los archivos con licencia para web. Si llegan en OTF o TTF, conviértelos a woff2 (en Claude Code con `fonttools`, si está instalado; la persona puede usar transfonter.org). Sin licencia web no se publica: propón la alternativa más parecida de Google Fonts y díselo.
- **Pesos:** de 2 a 5. Cada peso es un archivo que se descarga.
- **Caracteres:** prueba que la fuente tenga ñ, acentos, ¿, ¡, comillas y cualquier símbolo que vayas a usar. En la página de gracias de referencia un sello usaba ✺, que Poppins no trae, y se cambió por •.
- **Una o dos familias.** Una sola funciona si tiene buenos pesos. Dos, solo si cumplen roles distintos: una con carácter para titulares y otra cómoda para leer.
- **Fuentes variables con ejes propios.** Algunas fuentes traen perillas además del grosor. Fraunces, por ejemplo, trae `opsz` (tamaño óptico), `SOFT` (suavidad) y `WONK` (letras traviesas). La URL normal de Google Fonts no las trae, y si la suavidad fue una decisión de marca, se pierde. Pide los ejes en la URL, en orden alfabético y primero los de minúsculas (`ital,opsz,wght,SOFT,WONK`), y fija su valor con `font-variation-settings` para no depender del valor por defecto. En Claude Code, los woff2 que bajes de esa misma hoja de estilos ya traen los ejes.

```html
<!-- claude.ai: desde Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=[FAMILIA]:wght@400;600;800&display=swap" rel="stylesheet">

<!-- Fuente variable con ejes propios: rango de cada eje, en el mismo orden que sus nombres -->
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&display=swap" rel="stylesheet">
```

```css
/* Los valores salen de la dirección de arte de esta marca */
h1,h2,h3{font-variation-settings:"SOFT" [0 A 100],"WONK" [0 O 1]}
```

```css
/* Claude Code: archivos dentro del proyecto */
@font-face{font-family:"[FAMILIA]";src:url(../fonts/[familia]-700.woff2) format("woff2");font-weight:700;font-display:swap}
```

Los dos pesos que se ven en el primer pantallazo se precargan con `<link rel="preload" as="font" type="font/woff2" crossorigin>`.

### 1.5 Elementos gráficos de la marca

Son lo que más separa un sitio de una plantilla: patrones, formas, íconos propios, texturas, un sello, una mascota, una manera particular de recortar las fotos. Pregunta: "¿Tu marca tiene algún elemento que se repita en tus redes, empaques o presentaciones?" Muchas veces lo tienen y no lo consideran parte de la identidad.

- En SVG si son formas; en PNG transparente si son ilustración o textura.
- Si no hay ninguno, los derivas del logo (3.2). Nunca los sacas de la referencia.

### 1.6 Fotos

**Foto principal.** Vertical, de medio cuerpo o cuerpo completo, de 1500 px de alto o más, con buena luz y fondo simple. Es la pieza que más mejora el resultado: una persona real recortada junto al titular o sobre su color de marca se ve de agencia; una foto de banco de imágenes, no.

**Recorte del sujeto:**
- Para la persona: remove.bg, Photoroom o Canva Pro (Quitar fondo).
- En Claude Code en una Mac se puede recortar con la detección de personas del sistema (Vision); así se hizo la foto del hero de la landing de referencia.
- Revisa siempre con zoom al 200 %: pelo, dientes, lentes, ropa blanca y bordes. El recorte automático se come lo blanco y deja halos.
- Pruébala sobre el color de marca y sobre el oscuro antes de darla por buena.

**Tamaños y peso.** WebP en dos anchos, 640 px para celular y 1100 px para escritorio, con calidad de 75 a 80. Peso objetivo: de 40 a 100 KB cada una (en la landing de referencia, 43 KB y 92 KB). Las demás fotos, WebP de 30 a 150 KB y ninguna arriba de 300 KB, con una versión chica (`-sm`) para miniaturas. Para la persona: squoosh.app.

```bash
# En Claude Code, si la computadora tiene cwebp
cwebp -q 78 -resize 640 0 foto.png -o foto-640.webp
cwebp -q 78 -resize 1100 0 foto.png -o foto-1100.webp
```

```html
<picture>
  <source media="(min-width: 700px)" srcset="img/[nombre]-1100.webp">
  <img src="img/[nombre]-640.webp" width="1100" height="[ALTO A 1100 PX]" alt="[QUIÉN ES Y QUÉ HACE]" fetchpriority="high">
</picture>
```

**Sin fotos.** No se rellena con fotos de banco ni con imágenes generadas que parezcan del negocio. La imagen protagonista se arma con las piezas de su marca (3.2), y lo que falte queda como recuadro con la proporción correcta y el nombre del archivo esperado.

**Tratamiento.** Color natural, blanco y negro, duotono con el color de marca, con grano, con sombra: no se decide por costumbre. Sale de la referencia (punto 5 de 2.2) y de la personalidad de la marca. En la landing de referencia la foto va en escala de grises sobre el azul porque esa era la composición de la referencia y porque así el azul es el único color fuerte del hero.

### 1.7 Ilustraciones

- PNG con fondo transparente. Si llegan sobre blanco, el recorte quita solo el blanco que toca las orillas (relleno desde los bordes), no "todo lo blanco": un recorte por color le borró los pantalones blancos al personaje de la marca y hubo que rehacerlo.
- Revisa cada una sobre el color de marca y sobre el oscuro: así aparecen los halos y los huecos.
- WebP transparente de 35 a 90 KB, con `width` y `height`.
- Un mismo estilo en todo el sitio. Si son decorativas, `alt=""`; si aportan información, un `alt` que la describa.
- Repetir el mismo recurso en varias secciones es lo que crea sensación de marca. En la landing de referencia hay una ilustración del personaje en casi cada sección.

### 1.8 Logos de clientes

- Solo de clientes reales y con permiso para mostrarlos. Nunca agregues una marca "para que se vea bien".
- En SVG de una sola tinta. Se consiguen en la sección de prensa o brand kit de cada marca, o en simpleicons.org.
- Revisa que el SVG tenga relleno: uno de la landing de referencia traía `fill:none` y no se veía como máscara.
- Píntalos con máscara CSS. Así todos toman el mismo color del diseño, cambian al pasar el mouse y se leen como respaldo ordenado y no como collage. `--w` equilibra el peso visual (de 24 % para logos cuadrados a 74 % para logos alargados) y `--ar` es la proporción ancho entre alto del SVG.

```css
.logo-mask{display:block;width:var(--w,60%);aspect-ratio:var(--ar,3);background-color:currentColor;
  -webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;
  -webkit-mask-size:contain;mask-size:contain}
```

```html
<i class="logo-mask" role="img" aria-label="[MARCA]"
   style="-webkit-mask-image:url(img/logos/[marca].svg);mask-image:url(img/logos/[marca].svg);--w:62%;--ar:2.58"></i>
```

### 1.9 Videos

- Originales, no reenviados por WhatsApp, que los comprime. Con una lista del lugar y la fecha de cada uno: el lugar va debajo del clip, nunca encima.
- Se convierten en clips de 4 a 5 segundos, sin audio, en MP4 (H.264), de unos 720 px de ancho y de 0.5 a 1.5 MB.
- Cada clip lleva un poster: un cuadro del clip en WebP de unos 10 KB.
- Para la persona: CapCut (cortar, quitar el audio y exportar en 720p).
- En Claude Code, si la computadora tiene ffmpeg:

```bash
ffmpeg -ss 12 -t 4.5 -i original.mov -an -vf "scale=720:-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart clip.mp4
ffmpeg -ss 1 -i clip.mp4 -frames:v 1 -c:v libwebp -quality 75 clip.webp
```

Si no hay ffmpeg (en la Mac de la landing de referencia no lo había y se usó un script propio con AVFoundation), pide a la persona que los saque en CapCut. Cómo se cargan y reproducen está en `03-animaciones.md` (sección 11).

### 1.10 Favicon e imagen para compartir

**Favicon.** Sale del símbolo, no del logo completo: a 32 px un logo con letras no se lee. Si la marca no tiene símbolo, usa la inicial con su tipografía sobre su color.
- `favicon.svg` con el símbolo, `favicon.ico` de 32 x 32 y `apple-touch-icon.png` de 180 x 180 con fondo sólido (si es transparente, el iPhone le pone fondo negro).
- Para la persona: realfavicongenerator.net.
- En claude.ai, la tabla de archivos que la persona guarda junto al HTML incluye el favicon, `apple-touch-icon.png` de 180 px y `og-imagen.jpg` de 1200 x 630. El favicon también puede ir en línea como SVG dentro del HTML.

**Imagen para compartir (og:image).** Es la tarjeta que aparece al mandar el enlace por WhatsApp o redes, y es la primera impresión del sitio para quien lo recibe. Mide 1200 x 630 px, en JPG de menos de 300 KB. Diséñala con la misma dirección de arte del sitio: el logo, una frase corta en grande, la foto de la persona si la hay, y lo importante al centro, porque algunas apps la recortan en cuadro. Se hace en Canva o, en Claude Code, como un HTML de 1200 x 630 capturado con Chrome sin ventana. La verificación de las dos está en `04-calidad-y-publicacion.md` (1.10 y 1.11).

### 1.11 Herramientas para preparar materiales sin saber de código

| Para qué | Herramienta |
|---|---|
| Quitar el fondo de fotos e ilustraciones | remove.bg, Photoroom, Canva Pro |
| Cambiar tamaño y convertir a WebP | squoosh.app, calidad de 75 a 80 |
| Cortar videos, quitar el audio y exportar en 720p | CapCut |
| Logos de marcas en SVG de un color | simpleicons.org |
| Fuentes para web | fonts.google.com |
| Convertir una fuente propia a woff2 | transfonter.org |
| Saber el HEX exacto de un color | Canva o Figma: seleccionar el elemento y copiar el código |
| Revisar el contraste de dos colores | webaim.org/resources/contrastchecker |
| Favicon en todos los tamaños | realfavicongenerator.net |
| Imagen para compartir | Canva, diseño de 1200 x 630 |
| Guardar referencias | Un tablero de Pinterest y capturas del pin completo |

En Claude Code, buena parte de esta preparación la puedes hacer tú: convertir, cambiar tamaños, sacar clips y posters. Igual pide a la persona que revise los recortes con sus propios ojos.

### 1.12 Ficha de identidad

Al terminar la revisión, resume en una tabla corta. Cada pieza queda como **listo**, **por preparar** (y quién la prepara), **por confirmar** (un dato que llegó pero parece de prueba) o **falta** (y qué pasa mientras).

Revisa en especial:

- **Contacto que parece de relleno.** Un WhatsApp con muchos ceros o dígitos repetidos (52 33 0000 0000), un correo o dominio con ejemplo.com o "tucorreo": cumplen el formato, pero si nadie los revisa, todos los botones llevan a un número falso. Van como **por confirmar** y su pregunta entra en las de la etapa 2.
- **Logo con letras como texto** (`<text>` en el SVG, ver 1.2): **por preparar**.
- **Colores que no contrastan** en el papel que la persona les dio (por ejemplo, el color de botones con letra blanca): **por preparar**, y lo resuelves tú con la regla de 1.3.

En el mensaje de la etapa 2 la ficha va corta, justo debajo del resumen: todo lo que está listo en un solo renglón y, en tabla, solo lo que está por preparar, por confirmar o falta. La ficha completa pasa al LEEME.

```markdown
| Pieza | Estado | Nota |
|---|---|---|
| Todo esto | Listo | Colores, tipografía, 2 referencias, servicios, precios y preguntas frecuentes |
| Logo | Por preparar | Tu nombre está escrito como texto y no en curvas: pide la versión en curvas a quien lo diseñó; mientras, lo uso tal cual |
| WhatsApp | Por confirmar | [CÓDIGO DE PAÍS] [NÚMERO] parece número de prueba: confírmamelo |
| Foto principal | Falta | Armo la portada con piezas de tu marca; cuando tengas foto, la cambiamos |
| Elementos gráficos | Falta | Los derivo de tu logo |
| Testimonios | Falta | Junto prueba y confianza en una sola sección con tus credenciales |
| Logos de clientes | Falta | La sección se quita hasta tener permiso |
```

Lo mínimo para pasar a la dirección de arte: logo, color principal y al menos una referencia. Si no trae referencia, pídele que guarde de 2 a 3 en Pinterest buscando "web design [su giro]", "landing page [estilo que le guste]" o "portfolio website", y que anote qué le gusta de cada una. Si no tiene logo ni colores, ve a la sección 4.

---

## 2. Leer una referencia de Pinterest o de un sitio web

### 2.1 Qué pedir y cómo recibirla

- De 1 a 3 capturas de diseños web que le gusten. Mejor el pin completo que un pedazo. Si el pin enlaza a la fuente (Dribbble, Behance o el sitio real), pide también el enlace.
- De cada una, en sus palabras, qué le gusta. "Me gusta cómo el texto gigante queda detrás de la persona" vale más que "me gusta todo".
- Una que NO le guste, si la tiene. Dice tanto como las otras.
- En Claude Code, que las ponga en `materiales/referencias/` y ábrelas para verlas. En claude.ai, que las adjunte en el mensaje.

Ten presente qué es casi siempre un pin de diseño web:

- **Una imagen fija.** El movimiento no se ve; lo deduces tú (punto 9 de 2.2) y lo apruebas con la persona en la hoja de dirección de arte.
- **Muchas veces un concepto, no un sitio real.** Textos de relleno, fotos de banco y sin versión de celular. Tú diseñas la versión que sí funciona en 375 px.
- **A veces solo el hero.** El resto de la página lo diseñas con la misma lógica.

Las imágenes de la referencia nunca se usan en el sitio ni se enlazan desde Pinterest. Son material de estudio.

**Si la referencia es un sitio web (una URL):** se lee con la misma lista de 2.2 y las mismas reglas de lo que se toma y lo que no (3.1). Tiene dos ventajas sobre una captura: se ve el movimiento real y cómo resuelve el celular. Si tienes navegador (Claude en Chrome o el navegador integrado), recórrelo a 375 px y en escritorio y toma tus capturas; si no, pide a la persona capturas de lo que más le gusta y una grabación corta del scroll. WebFetch sirve para leer su estructura de secciones, no para ver el diseño. Si la URL es de un competidor, además pasa por el análisis de competencia (`05-investigacion-y-competencia.md`, sección 3): de ahí salen temas y estructura de contenido, nunca su diseño exacto.

### 2.2 Lista de análisis

Recorre los nueve puntos con cada referencia. Anota observaciones concretas y medibles, no adjetivos: "titular de 3 palabras en dos líneas que ocupa el 70 % del ancho, con interlineado muy cerrado" sirve; "titular impactante" no.

1. **Composición y retícula.** ¿Cuántas columnas se adivinan? ¿Simétrica o descentrada? ¿Los elementos respetan una rejilla estricta o la rompen (texto detrás de una foto, una imagen que se sale del borde, piezas encimadas)? ¿Dónde está el punto focal del hero? ¿Qué tan ancho es el contenido respecto a la pantalla? Ejemplo de nota: "rejilla de 12 columnas, hero cargado a la izquierda, foto que se sale por la derecha".
2. **Jerarquía tipográfica.** ¿Cuántos tamaños hay y qué tan grande es el salto entre el titular y el texto? ¿Mayúsculas o caja normal? ¿Peso? ¿Interlineado y espacio entre letras? ¿Con serifa, sin serifa, condensada, de exhibición? ¿Hay cejas (etiquetas chicas sobre los títulos)? Anota el estilo ("grotesca condensada muy pesada"), no el nombre de la fuente: la fuente la pone la identidad.
3. **Uso del color.** No qué colores son, sino cómo se usan: ¿un fondo dominante y un acento puntual? ¿Bloques grandes de color que alternan por sección? ¿Todo neutro y el color solo en botones? ¿Claro u oscuro? ¿Mucho o poco contraste? Esto se traduce en la proporción con la que usarás los colores de la identidad, no en los colores mismos.
4. **Espacio en blanco.** ¿Las secciones respiran o están apretadas? ¿Cuánto aire hay alrededor del titular? ¿Márgenes laterales generosos? Anótalo en relación: "entre secciones hay casi una pantalla de aire", "el texto ocupa un tercio del ancho".
5. **Tratamiento de fotos.** ¿Color natural, blanco y negro, duotono, con grano? ¿Recortadas sin fondo, en rectángulos, en círculos, con esquinas redondeadas? ¿De borde a borde o chicas dentro de tarjetas? ¿Las personas miran a cámara? Esto define cómo se preparan las fotos de la persona (1.6).
6. **Formas y recursos gráficos.** Líneas, círculos, estrellas, sellos, flechas, rejillas, cintas de texto, stickers, texturas, íconos. ¿Qué tan redondeadas son las esquinas? ¿Bordes finos o gruesos? ¿Sombras largas, duras o ninguna? Estos no se copian: se anota su función ("un sello circular que da sensación de firma") para cumplirla con formas de la marca (3.2).
7. **Densidad.** ¿Mucha información por pantalla, como una revista o un tablero, o una idea por pantalla, como un cartel? Decide cuánto texto cabe en cada sección.
8. **Tono.** ¿Qué personalidad transmite? Elige tres adjetivos concretos: sobrio, juguetón, técnico, lujoso, crudo, cálido, editorial, rebelde. Compáralos con la personalidad de la marca. Si no coinciden, la marca gana y la referencia aporta solo estructura.
9. **Qué movimiento sugiere.** Aunque sea una imagen fija, el diseño insinúa cómo se movería. Tradúcelo con la tabla de `03-animaciones.md` (0.6), que también dice qué ingredientes técnicos usar. Esa tabla dice qué tipo de movimiento cabe; cómo se mueve exactamente lo decide la personalidad de la marca (3.3).

Para cerrar, cruza la frase de la persona con tus nueve puntos. Si dijo "me gusta lo limpio", casi siempre es el espacio en blanco y la densidad baja, no los colores. Lo que a ella le gustó es lo primero que tiene que sobrevivir en la propuesta.

### 2.3 Ficha de lectura

Llena una por referencia. Es para ti y también la enseñas resumida en la propuesta.

```markdown
**Referencia 1** ([nombre del archivo o enlace])
Lo que le gusta, en sus palabras: "[...]"
- Composición y retícula:
- Jerarquía tipográfica:
- Uso del color:
- Espacio en blanco:
- Tratamiento de fotos:
- Formas y recursos:
- Densidad:
- Tono: [tres adjetivos]
- Movimiento que sugiere:
Lo que tomo: [2 o 3 decisiones]
Lo que dejo: [lo que no aplica a esta marca o no funciona en celular]
```

### 2.4 Varias referencias

- Elige una como base de la estructura y usa las otras para detalles concretos: "el tratamiento de foto de la 2", "las cintas de texto de la 3". Mezclarlas por partes iguales da un sitio sin carácter.
- Si se contradicen (una oscura y lujosa, otra pastel y juguetona), no adivines. Pregunta cuál se parece más a cómo quiere que lo vean sus clientes.
- La que NO le gusta es una lista de cosas a evitar. Anótala en la propuesta.

### 2.5 Lo que de una referencia no se traslada

- **Lo que no se lee en celular:** texto sobre fotos sin contraste, letra gris clarita, texto de 12 px, tres o cuatro columnas delgadas. Diseña desde ya cómo se apila en 375 px.
- **Lo que traba el scroll:** secciones ancladas con scroll horizontal. En la landing de referencia se quitó una porque el dueño sintió que la página se atoraba.
- **Lo que el negocio no tiene:** cifras, logos de clientes, testimonios, premios. Si la referencia tiene un muro de logos y la persona no tiene clientes que den permiso, esa sección no va hasta tener permiso. Nunca se rellena.
- **La estética que pelea con su identidad.** Si la referencia es oscura con brillos y la marca es clara y cálida, de la referencia tomas la composición y el ritmo, no la oscuridad. Ese fue justo el error del caso real de la sección 5.

---

## 3. Fusionar identidad y referencia en una dirección de arte original

### 3.1 Qué se toma y qué nunca

| Se toma de la referencia | Lo pone la identidad | Nunca se toma |
|---|---|---|
| Estructura: retícula, orden y proporción de los bloques | Colores con sus roles | Sus textos, frases o titulares, ni cambiados de palabras |
| Ritmo: alternancia de secciones, densidad, aire | Tipografía | Sus fotos, ilustraciones o videos |
| Jerarquía: qué tan grande es el titular frente al resto | Logo, símbolo y elementos gráficos | Su logo o los de sus clientes |
| Sensación y tono | Fotos, ilustraciones y videos propios | Íconos, patrones o recursos dibujados para esa marca |
| Tipo de movimiento que sugiere | Personalidad del movimiento: curvas, tiempos, firma | La copia del diseño: misma retícula, mismo orden y mismos elementos uno a uno |

**Cómo saber si ya es copia.** Pon tu propuesta junto a la referencia. Si alguien que no sabe de diseño diría "es la misma página con otros colores", es copia. Las señales: el mismo hero pieza por pieza, el mismo orden en todas las secciones, los mismos recursos gráficos (la misma estrella, el mismo sello) y los mismos textos con otras palabras. La fórmula sana: de cada referencia, 2 o 3 decisiones; lo demás sale de la marca. No es solo cuestión de derechos de autor: una marca que se parece a otra pierde lo que la hace reconocible.

Dos pruebas antes de enseñar cualquier propuesta: si tapas el logo, se reconoce la marca por sus formas, sus colores y su manera de moverse; y si le pusieras el logo de quien hizo la referencia, no pasaría por suya. Si falla una, no está lista.

**Cuando la persona pide justo la composición de su referencia.** Pasa seguido: "me gusta el título grande y centrado, la imagen al centro y el menú mínimo" es casi toda la portada de la referencia. Consérvala, porque es lo que le gustó, pero agrégale un gesto propio de la marca que rompa el molde: un trazo del logo que sale del marco de la imagen y baja hasta el botón, una forma de la marca que recorta la foto, un elemento propio que cruza la retícula. Con ese gesto, la segunda prueba se pasa con holgura y no por poco.

**Señales de plantilla.** En la portada, la señal no es un recurso suelto sino la combinación completa: título centrado, subtítulo gris y dos botones sobre un degradado ajeno a la paleta. Un título centrado por sí solo está bien si viene de la marca o de la referencia. En el resto del sitio: filas de tres tarjetas iguales con ícono de librería, todo entrando con el mismo desvanecido y efectos de moda sin relación con la marca (vidrio esmerilado, neón, partículas, texto con degradado).

**Ejemplo real: la landing de conferencias de referencia.** La referencia de composición fue una plantilla de eventos (ITconf). De ella se tomó la idea del hero: portada de un solo color, la persona en escala de grises, titular gigante en mayúsculas partido en dos líneas y video de fondo en duotono. Todo lo demás salió de la identidad del conferencista: el azul `#1450FB` de su SVG oficial, Poppins, el fondo claro cálido, las tarjetas blancas muy redondeadas, su frase "Ideas que se quedan", su foto recortada, el video de aplausos de sus propias conferencias, las ilustraciones de su personaje en cada sección y su logo armándose letra por letra en la entrada y en el footer. El hero comparte la idea con la referencia; cada pieza es de la marca.

### 3.2 Elementos gráficos propios, derivados de la marca

Si la marca no trae elementos gráficos, no los tomes de la referencia: derívalos del logo y del tono. Así el sitio no se parece a ningún otro.

**Paso 1. Inventario de formas del logo.** Abre el SVG y anota de 3 a 5 rasgos: ¿curvas o ángulos? ¿Esquinas redondeadas o filosas? ¿Trazo grueso o fino? ¿Hay un punto, una diagonal, un círculo o un remate especial en alguna letra? ¿Tiene inclinación?

**Paso 2. Conviértelos en un sistema.**

| Rasgo del logo | Se vuelve |
|---|---|
| El símbolo completo | Separador en las cintas de texto, viñeta de listas, avatar, favicon, centro de un sello, marca de agua en una sección oscura |
| Sus curvas o esquinas | El radio de botones y tarjetas: un logo filoso pide radios chicos; uno redondo, radios generosos |
| El grosor de su trazo | El grosor de íconos, líneas y bordes |
| Su inclinación | El ángulo de las cintas giradas, de las tarjetas o de los subrayados |
| Un punto, un remate o una forma especial | Un patrón de fondo, el marcador de las cejas, la forma del cursor |
| El nombre de la marca | Un sello circular con el texto girando, una cinta de texto, el logo grande del footer |

En la landing de referencia el símbolo de la marca separa las palabras en la cinta de temas, es el avatar de las historias dentro del celular y el ícono de la lista de credenciales, y el logo se arma letra por letra al abrir y al cerrar la página.

**Paso 3. Íconos.** Una sola familia, con el mismo grosor de trazo que el logo. Si usas una librería (Lucide, Phosphor o Tabler), ajusta `stroke-width` al grosor del logo y no mezcles familias.

**Paso 4. Texturas y patrones, solo si la marca los aguanta.** Grano, papel, semitono o rejilla funcionan en marcas editoriales o artesanales; en una marca limpia y tecnológica ensucian. Hazlos en CSS o en SVG ligero, nunca con una imagen pesada de fondo.

**Paso 5. La imagen protagonista cuando no hay fotos.** Arma una composición propia con las piezas de la marca: su símbolo como protagonista, acompañado de formas que salen de él (el mismo trazo más largo, la misma silueta en otros tamaños y en otros colores de su paleta, un marco con la forma de su logo). El logo o el símbolo ampliado tal cual no es una imagen protagonista: se lee como ícono de app o como recuadro de relleno, y es lo más pobre junto a la portada de la referencia. Por ejemplo, para un carpintero cuyo símbolo es un ángulo, varias piezas con ese ángulo que encajan hasta formar el marco del titular. Esta composición es también el escenario natural de la animación firma (3.3).

Tres recursos que salen de cualquier logo. Ajusta tamaños, opacidad y ángulos a la marca; no los copies tal cual de un proyecto a otro.

```css
/* Patrón con el símbolo, muy tenue, sobre una sección oscura */
.patron{position:relative;isolation:isolate}
.patron::before{content:"";position:absolute;inset:0;z-index:-1;opacity:.06;background:currentColor;pointer-events:none;
  -webkit-mask:url(../img/iso.svg) 0 0/56px 56px repeat;mask:url(../img/iso.svg) 0 0/56px 56px repeat}

/* Duotono de marca: los blancos se vuelven el color principal y los negros se quedan */
.duo{background:var(--brand);isolation:isolate}
.duo img{filter:grayscale(1) contrast(1.1);mix-blend-mode:multiply}
```

```html
<!-- Sello circular con el nombre de la marca. textLength = perímetro del círculo (2 x 3.1416 x 46 = 289),
     así el texto cierra parejo. Gira por CSS con rotate, que no choca con GSAP. -->
<svg class="sello" viewBox="0 0 120 120" aria-hidden="true">
  <defs><path id="circulo" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
  <text font-size="11" letter-spacing="2" fill="currentColor">
    <textPath href="#circulo" textLength="289" lengthAdjust="spacing">[NOMBRE DE LA MARCA] • [FRASE CORTA] • </textPath>
  </text>
  <use href="#iso" x="42" y="42" width="36" height="36"/>
</svg>
```

```js
// El símbolo se dibuja con un trazo y luego se rellena. El path debe estar en el HTML,
// no dentro de un <use>, porque a lo que está dentro de un <use> no se le puede animar el trazo.
// El estado oculto lo pone gsap.set: si el JS falla, el símbolo se ve completo.
safe(() => {
  const p = document.querySelector('.firma path');
  const L = p.getTotalLength();
  gsap.set(p, { strokeDasharray: L, strokeDashoffset: L, fillOpacity: 0 });
  gsap.timeline()
    .to(p, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' })
    .to(p, { fillOpacity: 1, duration: 0.5 }, '-=0.3');
});
/* CSS: .firma path{stroke:currentColor;stroke-width:2} */
```

### 3.3 Movimiento con la personalidad de la marca

El movimiento también es identidad, y se diseña con la sección 0 de `03-animaciones.md`: la personalidad se traduce en curva, duración, recorrido y rebote (0.2), la firma sale de una pieza de la marca (0.3), cada elemento gráfico tiene un solo comportamiento (0.4) y cada sección un gesto protagonista (0.5). Todo se resume en la ficha de movimiento (0.7): sus valores técnicos van al LEEME, y en el mensaje de aprobación el movimiento se cuenta con palabras. Lo que conviene tener a la mano al proponer:

**La firma, en pocas palabras.** Un gesto que solo tiene esta marca, hecho con sus propios elementos, que aparece al abrir y vuelve al cerrar: el logo que se arma con sus piezas, el símbolo que se dibuja y se rellena, una cortina con la forma de su isotipo, su personaje que avanza sobre la barra de carga. El símbolo que crece hasta cubrir la pantalla funciona mejor con formas llenas, sin huecos al centro. En la landing de referencia el logo se arma letra por letra al abrir y otra vez en el footer.

**La firma vive en la portada real.** No es una pieza aparte que termina en un recuadro vacío: corre dentro de la portada y termina en ella, con el titular, el botón y la imagen protagonista en su lugar. Cuando se pueda, conecta con la acción principal. Por ejemplo, un trazo de la marca que se sigue dibujando fuera de la imagen y termina junto al botón (en celular, con una curva corta). Así la idea de la dirección se ve en la primera pantalla y no solo se explica.

**Si el caso se parece a un ejemplo.** Los ejemplos de esta skill y de `03-animaciones.md` (0.8) muestran cómo se piensa, no qué hacer. Si la marca real se parece a uno (mismo giro, misma forma de logo, misma idea de firma), cambia al menos la firma, la cortina y todos los valores de movimiento. Nunca uses los números del ejemplo.

**La coreografía de la entrada.** Escríbela como guion de video, con piezas que se enciman en el tiempo y no una tras otra:

```text
0.0 s  paneles con el color de marca cubren la pantalla
0.1 s  las letras del logo suben una por una, 0.07 s entre cada una
0.9 s  el símbolo gira y se asienta con un rebote corto
1.6 s  las letras salen hacia arriba y los paneles se abren como cortina
1.9 s  el titular del hero entra por líneas y la foto sube y se asienta
```

Lo que no se negocia (detalle en `03-animaciones.md`): toda entrada se salta con un toque y tiene un tope de tiempo que libera la página; ningún texto ni botón depende de que termine; se respeta a quien pidió menos movimiento; un gesto protagonista por sección y entradas discretas para lo demás; en páginas que se abren desde un QR, la entrada dura unos 3 segundos o menos.

### 3.4 Traducir la dirección a tokens

Antes de escribir cualquier sección, declara el sistema en `:root`. Los nombres de movimiento son los mismos que usa `03-animaciones.md` (3.3), donde también está su pareja en JS (el objeto `M`). Todos los valores salen de esta identidad y de esta dirección; ninguno se copia de un proyecto anterior.

```css
:root{
  /* Color: identidad (1.3) */
  --brand:#[PRINCIPAL];
  --brand-press:#[PRINCIPAL MÁS OSCURO];
  --brand-soft:#[PRINCIPAL MUY CLARO];
  --brand-on-dark:#[PRINCIPAL CLARO PARA TEXTO SOBRE OSCURO];
  --cta:#[COLOR QUE ELIGIÓ PARA BOTONES, YA CON CONTRASTE RESUELTO];
  --cta-ink:#[BLANCO U OSCURO DE LA MARCA, EL QUE PASE];
  --ink:#[OSCURO];
  --bg:#[FONDO];
  --surface:#[TARJETAS];
  --line:#[BORDES];
  --muted:#[TEXTO SECUNDARIO];
  --accent:#[ACENTO];
  --error:#[ROJO];
  /* Tipografía: identidad (1.4) */
  --font-display:"[FAMILIA DE TITULARES]",system-ui,sans-serif;
  --font-body:"[FAMILIA DE TEXTO]",system-ui,sans-serif;
  /* Forma: derivada del logo (3.2) */
  --r-xl:[ ]px; --r-lg:[ ]px; --r-md:[ ]px; --r-sm:[ ]px;
  /* Movimiento: ficha de movimiento (03-animaciones.md, 0.7 y 3.3) */
  --ease:cubic-bezier([ ]);
  --ease-io:cubic-bezier([ ]);
  --ease-pop:cubic-bezier([ ]);
  --dur:[ ]s;
  --dist:[ ]px;
  --t-hover:[ ]s;
  /* Espacio y ritmo: referencia (2.2) */
  --gutter:clamp(16px,4vw,[ ]px);
  --maxw:[ ]px;
  --section-y:clamp([ ]px,[ ]vw,[ ]px);
}
```

- **Escala tipográfica con `clamp()`.** El salto entre titular y texto lo da la referencia: enorme en un cartel, moderado en una revista. Para calcular el titular gigante: tamaño en vw ≈ porcentaje del ancho que ocupa la línea en la referencia, entre el número de letras de tu línea por 0.65 (ancho promedio de una mayúscula de palo seco). Una línea de 9 letras que ocupa el 70 % del ancho da 70 / (9 x 0.65) ≈ 12vw; en la landing de referencia el titular quedó en 12.2vw. Ajusta con la fuente real. A mayor tamaño, interlineado más cerrado y espacio entre letras negativo.
- **Sombras.** Solo si la referencia o la marca las usan. Si van, largas y suaves, con spread negativo y teñidas del color del elemento, nunca la sombra gris corta que viene por defecto.
- **Ritmo de fondos.** Decide qué secciones van sobre el color de marca, cuáles sobre el oscuro y cuáles sobre el fondo claro, según cómo usa el color la referencia. Alternar fondos marca el ritmo sin líneas divisorias.
- **Cursiva de acento.** Si la dirección usa una palabra en cursiva (o en otro color) dentro de los títulos, va en la portada y, a lo mucho, en un título más. En los demás, el acento lo ponen los elementos de la marca. Repetida en todos los títulos se vuelve muletilla de plantilla "editorial".
- **Dónde viven estos valores.** En el `:root` de la hoja de muestra y del sitio, y en el LEEME. En el mensaje y en la hoja de muestra se explican con palabras: "el botón es terracota con letra oscura", no `--cta` ni sus números.

### 3.5 Presentar la propuesta para aprobación

La persona solo tiene que decir "sí" o "cambia esto". Todo el mensaje de la etapa 3 cabe en unas 700 palabras, ficha incluida, y empieza con lo que tiene que aprobar. El detalle visual vive en `direccion-de-arte.html` (3.6) y el detalle técnico en el LEEME.

**Sin jerga, ni en el mensaje ni en la hoja de muestra.** Nada de px, cubic-bezier, ratios de contraste, nombres de tokens, pesos como "Inter 600" ni versiones de librerías. Los HEX sí, porque son de su marca. Di "letra gruesa", "entra despacio", "el botón lleva letra oscura para que se lea bien". Los valores técnicos van al LEEME en la etapa 4.

```markdown
**Lo que tienes que aprobar**
1. La idea: [nombre corto y la frase que la resume].
2. Tus colores y tus letras: [en palabras, con el papel de cada color].
3. Lo que hace única tu página: [los elementos de tu marca, en una línea].
4. Cómo abre tu página: [la animación firma en una línea].
5. Lo que necesito de ti: [cuántas preguntas hay abajo].

**Tu ficha** [lo listo en un renglón; en tabla solo lo que está por preparar, por confirmar o falta]

## Dirección de arte: [nombre corto]
**La idea en una frase.** [...]
**De tu referencia tomo:** 1. [...] 2. [...] 3. [...] **No tomo:** [...]
**De tu marca:** [cada color con su HEX y su papel], [letras], [logo y símbolo]
**Elementos propios:** [de 3 a 5, y de qué parte de tu marca sale cada uno]
**Imagen principal:** [tus fotos y su tratamiento, o la composición con piezas de tu marca]
**Movimiento:** [personalidad en tres palabras]. Firma, paso a paso: [3 a 5 pasos cortos que terminan en tu portada]
**Lo que no haremos:** [lo de la referencia que no aplica y lo que dijiste que no te gusta]

**Otra opción:** [3 líneas: una dirección más sobria o más atrevida, por si esta no te convence]

**Por validar** (lo que decidí yo por ti): [lista corta]

**Cómo ver la muestra:** [en Claude Code, capturas en celular y en computadora; en claude.ai, descárgala y ábrela en Chrome, y así la ves en modo celular]

¿Así se siente tu marca?

**Antes de seguir necesito** (solo lo indispensable, máximo 5):
1. [...]
```

- **Una pregunta de aprobación** ("¿Así se siente tu marca?") y, separadas, **hasta 5 preguntas de datos indispensables** (un WhatsApp por confirmar, una cédula, un precio). Nunca una lista de opciones técnicas.
- **Una dirección principal y siempre una alternativa en 3 líneas.** Dos direcciones completas solo cuando no hay referencia, cuando las referencias se contradicen y la persona no supo elegir (2.4) o cuando no tiene identidad (sección 4).
- **Por validar.** Desde esta etapa, lo que decidiste por la persona (el botón con letra oscura, el logo compacto en el menú, una portada sin foto, un texto que escribiste tú) va en esa lista. Crece en la etapa 3 y se junta en el LEEME en la etapa 4.
- **Si aprueba con cambios menores** (un color de apoyo, un texto, un tamaño), aplícalos, dilo en una línea y sigue a la etapa 4 en el mismo mensaje. **Si pide cambios de fondo** (otra idea, otra paleta, otra firma), pregunta qué exactamente, actualiza la dirección y la muestra, vuelve a enseñarla y espera.
- No construyas sin un sí claro. Si la persona pide "hazlo todo de una vez", junta en un solo mensaje lo que falte de materiales y estructura, pero esta propuesta se presenta y se aprueba antes de construir, siempre.

### 3.6 La hoja de muestra: direccion-de-arte.html

Es una sola página que la persona ve antes de que exista el sitio. Ver el movimiento antes de construir evita el "no era lo que imaginaba" cuando ya está hecho. No se publica.

**Qué lleva, en este orden:**

1. **Arriba de todo, la portada real:** su titular, su botón, su composición y su imagen protagonista (fotos o la composición de 3.2), con la animación firma corriendo y terminando en esa portada. Un botón "Ver de nuevo" la repite. La firma no termina en un recuadro vacío ni vive en otra parte de la hoja.
2. **La paleta,** con el papel de cada color en una frase ("el verde va en títulos y en el pie de página"). Si una muestra se parece al fondo, lleva borde para que se distinga.
3. **Las letras,** con textos reales del negocio: el titular, un título de sección y un párrafo.
4. **Los elementos gráficos dibujados,** cada uno con su frase de dónde sale. Si se mueve, un botón "Ver cómo se mueve".
5. **Un botón** con su efecto al pasar el mouse y al tocarlo, y **una tarjeta**.
6. **En sitios con blog, una pantalla de artículo:** el inicio de un artículo real del mapa (título, respuesta directa, autor y fecha, un `h2`, un párrafo, una tabla corta) con su tipografía de lectura, y el bloque de acción. Así la persona aprueba también cómo se leen los 50 artículos (`08-blog-y-articulos.md`, sección 7).

**Reglas:**

- **De 6 a 9 pantallas de celular como máximo** (la pantalla de artículo cuenta). Nada de tablas largas, código ni medidas a la vista. Si un aviso como "Hoja de muestra, no se publica" se parte en dos renglones, acórtalo.
- **El mensaje y la muestra dicen lo mismo.** Ningún color fuera de su paleta sin decirlo: si agregas un tono de apoyo, sale de sus colores (más claro o más oscuro), aparece en la paleta de la muestra y va en Por validar. Si el mensaje dice "el titular va en tres renglones en celular", así se ve en la muestra.
- **Las mismas librerías que usará el sitio,** con las mismas versiones, para que la firma se vea igual. Si no cargan, todo se ve completo y quieto: los estados ocultos van solo bajo `.js` o con `gsap.set`, con rescate por tiempo. No prometas en el mensaje un movimiento que la muestra no tiene: si dices que el scroll se siente suave, Lenis tiene que estar cargado.
- **Con "Reducir movimiento"** nada se reproduce solo. "Ver de nuevo" muestra una versión sin desplazamientos (solo aparece y se desvanece), con una nota corta: "La animación completa se ve sin el ajuste de reducir movimiento".
- **Kit técnico** en `03-animaciones.md`: carga de librerías (2), cimientos y tokens de movimiento (3), firmas y cortinas (6.1), entrada del hero (7), títulos por líneas (8), trazos que se dibujan (9.2) y menos movimiento (17).

**Revisión antes de enseñarla:**

- **En Claude Code:** revísala a 375 x 812 y a 1440 x 900 en la vista previa o, si el panel no está disponible o está oculto, con `scripts/revisar-sitio.mjs` de esta skill (Chrome sin ventana). Confirma que las librerías cargaron (`window.gsap`, `window.Lenis`), que nada queda oculto al final y que el botón de la portada se ve en la primera pantalla a 375 x 812 (procura que también a 1440 x 900). Mira la firma en varios momentos, no solo al final (con la opción `--firma`, el script guarda cuadros a media animación): así aparecen las máscaras que cortan una pieza a la mitad. Enséñale capturas.
- **En claude.ai:** entrégala como archivo para descargar. Explícale cómo abrirla en Chrome y cómo verla en modo celular (`04-calidad-y-publicacion.md`, sección 3), y avísale que el panel de vista previa de claude.ai puede mostrarla sin sus letras ni su movimiento. Dile con claridad que no pudiste verla funcionando y pídele una captura si algo se ve raro. Si tienes herramienta de código, revisa al menos que el JS no tenga errores de sintaxis y que todo el contenido se vea sin JavaScript.

---

## 4. Si la persona no tiene identidad

Muchos emprendedores llegan sin logo ni colores definidos. No detengas el proyecto: arma una **identidad mínima** para lanzar, márcala como provisional y recomiéndale que después la trabaje con un diseñador.

### 4.1 Tres preguntas

1. ¿Con qué tres palabras quieres que te describan tus clientes?
2. ¿A quién le hablas? Edad, sector y qué tan formal.
3. ¿Qué marcas te gustan, aunque sean de otro giro, y cuáles no?

Más su referencia de Pinterest, que aquí pesa más porque no hay identidad que la equilibre.

### 4.2 Lo mínimo

- **Dos colores:** un principal con carácter y un oscuro, más un fondo (blanco cálido, crema, gris muy claro, o un oscuro si la personalidad lo pide). Las variantes del principal (presionado, suave y para texto sobre oscuro) se derivan como en 1.3. Evita el color obvio del giro (el azul de confianza para todo, el verde para todo lo de salud) si no aporta: busca uno que pueda ser suyo. Comprueba el contraste antes de proponerlo.
- **Una o dos tipografías de Google Fonts.** Una con buenos pesos basta. Si son dos, una con carácter para titulares y otra cómoda para leer.
- **Logo provisional:** el nombre del negocio escrito con la tipografía de titulares, con un ajuste propio (un peso, un espacio entre letras, un punto o un acento del color principal), y un símbolo simple: la inicial dentro de una forma. Dile con claridad que es un logo provisional para lanzar, no un logotipo profesional.
- **Un elemento gráfico** sacado de la forma de la inicial o del tono (3.2).

### 4.3 Parejas de partida por personalidad

Son un punto de partida para pensar, no una plantilla. Cambian según la referencia y el giro, y cada una se prueba con ñ, acentos, ¿ y ¡.

| Personalidad | Titulares | Texto |
|---|---|---|
| Editorial, sobria | Fraunces o Instrument Serif | Inter o DM Sans |
| Cercana, cálida | Bricolage Grotesque u Outfit | DM Sans o Nunito Sans |
| Juguetona, creativa | Syne o Unbounded | Manrope o Plus Jakarta Sans |
| Técnica, precisa | Space Grotesk o Archivo | Inter o IBM Plex Sans |
| Audaz, de cartel | Anton o Bebas Neue, solo en mayúsculas | Archivo o Inter |
| Elegante, de lujo | Cormorant Garamond o Playfair Display | Manrope o Lato |

### 4.4 Cómo presentarla

Dos direcciones como máximo y bien distintas entre sí (por ejemplo, una sobria y una audaz), cada una con su paleta, su tipografía, su logo provisional y su portada en `direccion-de-arte.html` (3.6). Que elija una o diga qué mezclar. A partir de ahí sigue igual que con cualquier identidad: tokens, propuesta y aprobación. Anota en el LEEME que la identidad es provisional y en qué fecha se definió.

---

## 5. Errores comunes

### Caso real: arrancar con una estética que no era su identidad

En un proyecto real, la primera versión de una landing de conferencias salió con azul eléctrico, negro, brillos y la tipografía Clash Display, tomados de su web anterior y de su media kit. El dueño la rechazó: su identidad vigente es la que usa en sus aplicaciones (Poppins, azul `#1450FB`, negro, fondo claro cálido, tarjetas blancas muy redondeadas y sus ilustraciones). Hubo que tirar la primera versión completa.

Lo que se aprendió:

- **Pregunta cuál es la identidad vigente.** Una marca puede tener materiales viejos (web anterior, media kit, presentaciones) con otra estética. Confirma cuál manda antes de diseñar.
- **Pide una muestra de lo que usa hoy:** su app, su Instagram, una presentación reciente. Compárala con los archivos que te dio.
- **Una referencia oscura y llamativa no es la identidad del cliente.** La referencia aporta composición y ritmo; el color y la tipografía los pone la marca.
- **Presenta la dirección antes de construir.** Con la dirección de arte aprobada en su hoja de muestra, ese error cuesta minutos, no una versión completa.

### Otros errores

1. **Usar una plantilla con otro nombre.** El mismo hero, el mismo preloader y las mismas curvas para todos los clientes. Cada marca tiene su firma.
2. **Copiar la referencia.** Sus textos con otras palabras, sus fotos, su estrella, el orden completo de sus secciones. Toma 2 o 3 decisiones; lo demás sale de la marca.
3. **Tomar los colores de la referencia** o de una captura de pantalla, en lugar del archivo oficial.
4. **Prometer un logo armado letra por letra** con un SVG que es un PNG disfrazado, que tiene las letras soldadas o que trae el nombre como `<text>`. Revísalo antes de proponer la firma.
5. **El logo enorme, o medido por el ancho.** Es firma, no protagonista, y se mide por la altura legible del nombre (1.2). En la landing de referencia se achicó en el footer, en la entrada y en la franja de marcas.
6. **Confiar en el recorte automático.** Se come ropa blanca, pelo o dientes y deja halos. Revisa al 200 % sobre el color de marca y sobre oscuro.
7. **Logos de clientes invisibles o a todo color.** Un SVG con `fill:none` no se ve como máscara; logos en sus colores originales compiten con la marca.
8. **Una fuente sin los caracteres del español** o sin el símbolo que usaste. Pruébala con ñ, acentos, ¿ y ¡.
9. **Videos reenviados por WhatsApp,** largos o con audio. Clips de 4 a 5 segundos, mudos y con poster.
10. **Demasiadas referencias mezcladas por partes iguales.** Una manda la estructura; las otras aportan detalles.
11. **Creer que el pin muestra el movimiento real.** Es una imagen fija: el movimiento lo propones tú y se aprueba en `direccion-de-arte.html`.
12. **Rellenar lo que la referencia tiene y el negocio no:** cifras, clientes, testimonios, premios. Se pide o se marca con un marcador visible ([TESTIMONIO REAL DE CLIENTE], [CIFRA, FUENTE Y FECHA]); nunca se inventa.
13. **Demasiados recursos gráficos.** Si cada sección estrena un recurso distinto, ninguno se vuelve marca. Pocos y repetidos.
14. **El color principal en todas partes.** Deja de llamar la atención. Úsalo con intención.
15. **Construir sin aprobación de la dirección de arte.**
16. **El logo ampliado como imagen protagonista.** Se ve como ícono de app. Arma una composición con las piezas de la marca (3.2, paso 5).
17. **La firma separada de la portada.** Una firma que termina en un recuadro vacío no enseña cómo abre la página. Corre dentro de la portada real y termina en ella (3.3).
18. **Una hoja de muestra larga y técnica.** Veintidós pantallas con cubic-bezier, px y ratios no las revisa nadie que no sea diseñador. De 6 a 8 pantallas y frases sencillas (3.6).
19. **Prometer un movimiento que la muestra no tiene.** Si el mensaje habla de un scroll suave y Lenis no cargó, la persona aprueba algo que nunca sintió.
20. **Un mensaje de aprobación de 1,800 palabras.** Las preguntas importantes quedan al fondo. Resumen de 5 líneas arriba y unas 700 palabras en total (3.5).
21. **La cursiva de acento en todos los títulos.** Se vuelve muletilla. En la portada y, a lo mucho, en un título más (3.4).
22. **Copiar un ejemplo de las references** porque el caso se parece (otra nutrióloga, otra hoja en el logo). Cambia la firma, la cortina y todos los valores (3.3).
23. **Publicar un contacto de relleno.** Un WhatsApp con puros ceros cumple el formato y manda a todos los botones a un número falso. Va como "por confirmar" (1.12).

---

## 6. Lista antes de construir

- [ ] Ficha de identidad con cada pieza en listo, por preparar, por confirmar o falta, y los datos de contacto revisados.
- [ ] Logo revisado: vector real, sin `<text>` (o pedido en curvas y avisado), sus versiones y las piezas separadas, o decidido animarlo completo. Tamaño en el menú por la altura del nombre.
- [ ] Colores con roles y contraste comprobado en cada pareja de texto y fondo que se usará, incluido el botón (`--cta`) con su hover y su presionado.
- [ ] Tipografía con licencia para web, pesos definidos, ejes propios pedidos y fijados si es variable, y caracteres del español probados.
- [ ] Fotos recortadas, revisadas al 200 % y en WebP de 640 y 1100 px.
- [ ] Ficha de lectura de cada referencia con los nueve puntos.
- [ ] Lista de lo que se toma y lo que no, y prueba de "¿es copia?" superada.
- [ ] De 3 a 5 elementos gráficos propios, derivados de la marca, e imagen protagonista resuelta (fotos o composición con piezas de la marca).
- [ ] Personalidad de movimiento y firma dentro de la portada real.
- [ ] Tokens declarados en `:root`.
- [ ] `direccion-de-arte.html` con la portada y la firma arriba, de 6 a 8 pantallas de celular, sin jerga, revisada en celular y escritorio (o con el aviso de que no se pudo ver, en claude.ai).
- [ ] Mensaje con resumen de 5 líneas, unas 700 palabras, alternativa en 3 líneas, lista Por validar y preguntas separadas.
- [ ] Un sí claro de la persona.
