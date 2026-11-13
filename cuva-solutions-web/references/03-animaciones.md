# 03. Animaciones: de la identidad al movimiento

Aquí no hay animaciones listas para pegar. El movimiento de cada sitio se diseña con lo que entrega la persona: su identidad (logo, colores, tipografías y elementos gráficos) y la referencia que eligió en Pinterest. Primero se decide cómo se mueve su marca (sección 0); esa decisión se presenta para aprobación junto con el resto de la dirección de arte, y solo después se construye.

## Índice: lee solo lo que necesitas

Este archivo es largo. Abre solo las secciones que pide tu etapa.

| Sección | Para qué sirve |
|---|---|
| [0. De la identidad al movimiento](#0-de-la-identidad-al-movimiento) | Diseñar cómo se mueve la marca: ritmo, firma, coreografía y ficha de movimiento. 0.9 dice cómo se arma por dentro la hoja de muestra |
| [1. Elegir el nivel](#1-elegir-el-nivel-ligero-o-avanzado) | Decidir si el sitio lleva librerías (avanzado) o no (ligero) |
| [2. Cargar las librerías](#2-cargar-las-librerías-gsap-315-y-lenis-13) | Versiones exactas y URLs; 2.2 y 2.3 son para claude.ai (un solo archivo, escrito por partes) |
| [3. Cimientos](#3-cimientos-clase-js-banderas-safe-y-orden-de-mainjs) | Arranque seguro, banderas, tokens de movimiento `M` y orden de `main.js` |
| [4. Lenis](#4-scroll-suave-con-lenis-conectado-a-scrolltrigger) | Scroll con inercia conectado a ScrollTrigger y enlaces internos |
| [5. Reloj compartido](#5-reloj-compartido-y-velocidad-del-scroll) | Un solo ciclo de animación para todo lo que se mueve sin parar |
| [6. Preloader](#6-preloader-con-la-firma-de-la-marca) | Pantalla de carga con la firma; 6.1 trae las piezas para armar firmas y cortinas |
| [7. Entrada del hero](#7-entrada-del-hero) | Cómo entra la portada y cómo termina la firma dentro de ella |
| [8. Títulos con SplitText](#8-títulos-con-splittext-por-líneas-palabras-o-letras) | Títulos que suben por líneas, con aire en la máscara para colitas y cursivas |
| [9. Revelados, ilustraciones y trazos](#9-revelado-al-hacer-scroll-ilustraciones-y-trazos-de-la-marca) | Entradas al bajar; 9.2 trazos que se dibujan; 9.3 un trazo que lleva hasta el botón |
| [10. Marquesina](#10-marquesina-infinita) | Texto que corre sin fin, en CSS o con JS |
| [11. Videos](#11-videos-que-solo-corren-en-pantalla-y-carril-de-videos) | Videos que solo corren en pantalla y carril de videos |
| [12. Contadores](#12-contadores) | Cifras reales que cuentan al aparecer |
| [13. Botón magnético](#13-botón-magnético-solo-con-mouse) | Botón que sigue al mouse; 13.1 estados del botón sin perder contraste |
| [14. Acordeón](#14-acordeón-de-preguntas-frecuentes-accesible) | Preguntas frecuentes accesibles |
| [15. Barra fija en celular](#15-barra-fija-en-celular) | Botón de contacto a un pulgar de distancia, con o sin formulario |
| [16. Efectos con el scroll](#16-efectos-pegados-al-scroll-y-tarjetas-apiladas-solo-en-escritorio) | Parallax, aperturas y tarjetas apiladas en escritorio |
| [17. Menos movimiento](#17-menos-movimiento-prefers-reduced-motion) | Qué se apaga con "Reducir movimiento", también en la hoja de muestra |
| [18. Rendimiento](#18-reglas-de-rendimiento) | Reglas para que todo vaya fluido en celular |
| [19. Versión sin librerías](#19-versión-sin-librerías-para-sitios-ligeros) | Equivalentes ligeros para tarjetas, gracias y guías |
| [20. Verificación](#20-verificación-antes-de-entregar) | Lo que se comprueba del movimiento antes de entregar |

Qué leer en cada etapa:
- **Etapa 3, dirección de arte y hoja de muestra:** sección 0 (sobre todo 0.3, 0.7, 0.8 y 0.9) y, para construir la muestra, 2, 3, 4 (si la ficha usa Lenis), 6.1, 7, 8, 9.2, 9.3, 13.1 y 17.
- **Etapa 5, construcción:** 1 a 5 siempre; de 6 a 16 solo lo que pide la coreografía; 19 si el nivel es ligero; 2.2 y 2.3 si trabajas en claude.ai.
- **Etapa 6, revisión:** 20, `references/04-calidad-y-publicacion.md` y `07-seo-tecnico-y-aeo.md` (sección 3).

Los bloques de código de este archivo son ingredientes técnicos, no diseños. Salen de cuatro sitios reales ya publicados (landing de conferencias, página de gracias, tarjeta de contacto y guía paso a paso) y ya probaron que funcionan en producción. Por eso su parte técnica se respeta siempre: arranque seguro, respaldos, accesibilidad y rendimiento. Lo que se ve y se siente (qué se mueve, con qué curva, cuánto tarda, cuánto recorre, en qué dirección y en qué orden) cambia en cada marca. Los números que traen los ejemplos son los de la landing de referencia y sirven para leer el código; si se quedan tal cual, todos los sitios terminan moviéndose igual que ella.

Ninguno de estos efectos necesita otra skill: son HTML, CSS y JS con librerías públicas.

**Movimiento y SEO.** En los sitios con arquitectura SILO, el movimiento convive con el posicionamiento. Antes de construir, lee `07-seo-tecnico-y-aeo.md`, sección 3. Lo esencial: el titular y la imagen principal nunca arrancan invisibles, el preloader vive solo en el inicio y en la primera visita (tope de 1.2 s en celular), los artículos se mueven poco y todo el contenido está en el HTML aunque el JavaScript no corra.

Cómo usarlo:
1. Diseña el movimiento con la identidad y la referencia (sección 0) y resúmelo en la ficha de movimiento (0.7).
2. Presenta la ficha con la dirección de arte y espera el sí.
3. Elige el nivel (sección 1), arma librerías y cimientos (2 a 5) y convierte la ficha en tokens de movimiento (3.3).
4. Toma solo los ingredientes que pide la coreografía (6 a 16, o 19 en el nivel ligero) y adáptalos. Cada uno dice qué se adapta a la marca; lo demás es técnica y no se toca.
5. Pasa la verificación de la sección 20 antes de entregar.

Las secciones 2 a 5, 17, 18 y 20 son técnica pura y se aplican igual en cualquier marca. La única excepción son los valores de los tokens de 3.3, que salen de la ficha.

Convenciones de los ejemplos:
- Tokens de color: `--brand` (color principal), `--ink` (oscuro casi negro), `--bg` (fondo claro). Tokens de movimiento: `--ease`, `--ease-io`, `--ease-pop`, `--dur`, `--dist` y `--t-hover` en CSS, y el objeto `M` en JS (sección 3.3). Si el sistema de diseño del proyecto usa otros nombres, usa esos.
- Ayudantes que asume todo el código: `d`, `html`, `$`, `$$`, `RM`, `FINE`, `SAVE_DATA`, `hasGSAP`, `safe`, `M`, `lenis` y `tickers`. Se definen en las secciones 3, 4 y 5.
- Lo que va entre corchetes, como `[PRIMERA LÍNEA]`, lo llena la persona. Nunca lo rellenes con datos inventados.
- **Los números de los ejemplos no se copian.** Las curvas, duraciones, recorridos, escalonados, tiempos de la firma y colores que aparecen aquí (de la landing de referencia o de las marcas de ejemplo de 0.8) solo enseñan a leer el código y a razonar. Cada valor del sitio sale de la ficha de movimiento aprobada de esa marca.

---

## 0. De la identidad al movimiento

El movimiento es parte de la identidad, igual que el color o la tipografía. El mismo ingrediente (un título que sube línea por línea) dice cosas distintas según su curva, su tiempo y su recorrido: rápido y con rebote se siente juguetón; lento y sin rebote, elegante; corto y seco, serio. Por eso no existe un movimiento por defecto. Cada sitio se diseña con lo que entrega la persona y se aprueba antes de construir.

Lo que necesitas antes de diseñar el movimiento:
- **Identidad:** logo (de preferencia en SVG), colores, tipografías y elementos gráficos (formas, patrones, trazos, ilustraciones, íconos, tratamiento de fotos).
- **Referencia de Pinterest:** una o varias capturas y, si lo dijo, qué le gusta de cada una.
- **Cómo quiere que se sienta su marca**, en tres palabras. Si no las dio, dedúcelas de su identidad y su referencia, y confírmalas en la ficha de movimiento (0.7).
- **Tipo de página y acción única:** una tarjeta de contacto aguanta menos movimiento que una landing larga.

El análisis completo de la referencia y la dirección de arte general están en `references/01-identidad-y-referencia.md`. Esta sección cubre solo el movimiento.

### 0.1 Leer la personalidad en la identidad

| Lo que ves en su identidad | Lo que sugiere para el movimiento |
|---|---|
| Letras de terminaciones redondeadas, formas orgánicas, colores cálidos o pastel | Calidez: curvas suaves, recorridos cortos, rebote apenas perceptible, flotados lentos |
| Serif de alto contraste, mucho blanco, líneas finas, paleta corta y oscura | Sobriedad o lujo: fundidos, trazos que se dibujan, cero rebote; tiempos contenidos (sobrio) o largos (lujo) |
| Grotesca pesada o condensada, colores saturados, stickers, bloques planos | Energía: entradas rápidas con recorrido largo, rebote marcado, marquesinas |
| Personaje ilustrado o mascota | Juego: piezas que brincan y flotan; el personaje puede ser parte de la firma |
| Retícula visible, números, íconos de línea, letra monoespaciada | Precisión: líneas y números que avanzan en orden, de izquierda a derecha |
| Fotografía documental, del equipo o de su trabajo como protagonista | Que las fotos manden: aperturas con clip-path y cambios de escala, nada encima de ellas |

Si la identidad apunta a un lado y la persona dijo otra cosa ("quiero que se sienta divertida" con un logo muy serio), dilo en la ficha y propón un punto medio. Su palabra pesa más que tu lectura, pero el resultado tiene que verse coherente con su logo.

### 0.2 De la personalidad al ritmo

Cada personalidad se traduce en cinco decisiones: la curva (el carácter), la duración (el tempo), el recorrido (cuánto se desplaza algo al entrar), el escalonado (la respiración entre piezas que entran juntas) y el rebote (el humor). Esta tabla es un punto de partida, no una regla:

| Personalidad | Curva de entrada (GSAP / CSS) | Duración base | Recorrido | Escalonado | Rebote | Bucles y efectos de mouse | Inercia de Lenis |
|---|---|---|---|---|---|---|---|
| Cálida y cercana | `power3.out` / `cubic-bezier(.25,1,.5,1)` | 0.9 a 1.1 s | 24 a 32 px | 0.08 a 0.1 s | Suave (`back.out(1.2)`), solo en piezas pequeñas | Flotados lentos de 8 a 10 s; sin cursor; magnético suave u omitido | 0.09 |
| Sobria y confiable | `power2.out` / `cubic-bezier(.33,1,.68,1)` | 0.6 a 0.8 s | 12 a 20 px, o solo fundido | 0.05 a 0.07 s | Ninguno | Ninguno: sin cursor, sin magnético, sin inclinación | 0.12, o sin Lenis |
| Enérgica y creativa | `expo.out` / `cubic-bezier(.16,1,.3,1)` | 0.8 a 1.2 s | 60 a 120 px, con giro | 0.04 a 0.06 s | Marcado (`back.out(2)`, `elastic.out(1,.5)`) | Marquesinas, sellos que giran, magnético, cursor con etiqueta | 0.09 |
| Lujosa y editorial | `power4.out` / `cubic-bezier(.22,1,.36,1)` | 1.3 a 1.8 s | 0 a 30 px; fotos que bajan de escala 1.12 a 1 | 0.12 a 0.18 s | Ninguno | Casi nada; parallax lento | 0.07 |
| Técnica y precisa | `power3.inOut` / `cubic-bezier(.76,0,.24,1)` | 0.6 a 0.9 s | 16 px; líneas que se dibujan | 0.03 a 0.05 s | Ninguno | Contadores y líneas que avanzan con el scroll | 0.1 |

- Las personalidades se mezclan. Elige una base y toma un rasgo de una segunda: un despacho contable cálido y preciso usa la curva cálida y le suma las líneas que se dibujan de la técnica.
- Referencia real: la landing de conferencias de referencia es juguetona y enérgica. Usa `expo.out` de 1 a 1.4 s, 40 px, escalonado de 0.09 s, `back.out` y `elastic.out` en sellos e ilustraciones, sellos que giran y Lenis en 0.095. Sus números aparecen en los ingredientes como ejemplo, no como valor por defecto.
- Los valores elegidos se vuelven los tokens de movimiento (3.3): el objeto `M` en JS y `--ease`, `--ease-io`, `--ease-pop`, `--dur` y `--dist` en CSS. Los ingredientes los leen de ahí.

### 0.3 La animación firma

La firma es el movimiento que solo puede ser de esta marca: si le cambias el logo, deja de tener sentido. Es lo primero que ve la persona (en el preloader, la intro o la entrada del hero) y vuelve a aparecer a lo largo del sitio.

De dónde sale:

| Pieza de la marca | Cómo se vuelve firma | Lo que necesitas |
|---|---|---|
| Logotipo (las letras) | Se arma letra por letra: cada una sale de una ranura o cae en su lugar | SVG con cada letra como pieza separada |
| Isotipo o símbolo | Se arma por piezas, se dibuja su contorno o gira y se asienta como un sello | SVG con las piezas separadas |
| Trazo característico (subrayado, firma manuscrita, onda, flecha) | Se dibuja como si alguien lo trazara | SVG con el trazo como línea (stroke); si es un relleno, se descubre con una máscara |
| Forma de la marca (hoja, gota, círculo, estrella, ángulo) | Se vuelve la cortina o la ventana por donde aparece el sitio | La forma en SVG o descrita con clip-path |
| Personaje o ilustración | Acompaña la carga: en la landing de referencia, el personaje en patín avanza sobre la barra | La ilustración en PNG o WebP transparente |
| Color | Bloques del color de marca que barren la pantalla en una dirección propia | Los tokens de color |

Reglas:
1. **Corta.** La entrada de la firma dura de 1.2 a 2.5 s y todo el preloader menos de 3.5 s; en la segunda visita de la sesión, la mitad. Se salta con un toque.
2. **No deforma el logo.** No se estira, no cambia proporciones ni usa colores fuera de su paleta. Se arma, se dibuja o se descubre; nunca se distorsiona.
3. **Termina legible.** El logo completo se queda quieto al menos 0.4 s antes de salir.
4. **Rima.** La firma reaparece por lo menos en dos lugares más, siempre con el mismo gesto: el menú móvil, el footer (el logo que se arma con el scroll), el separador de la marquesina, un sello giratorio, el ícono del botón principal o el mensaje de éxito del formulario. Esa repetición hace que el sitio se sienta de una sola pieza.
5. **Del tamaño de una firma.** En el preloader, el logo ocupa de 40 a 70 % del ancho en celular y no más de 420 px en escritorio. Es firma, no protagonista. Con un logo horizontal con lema, revisa que el lema se lea (7 px de alto o más); si no, la firma usa la versión compacta (símbolo y nombre) y se anota "por validar".
6. **Termina en la portada real.** El último cuadro de la firma es la portada tal como se queda: el titular, el botón principal y la imagen protagonista en su lugar. Nunca termina en un recuadro vacío ni en el logo solo en medio de la pantalla. Cuando se pueda, el gesto conecta con la acción principal: el trazo de la marca que se dibuja termina en el botón, la forma que se abre deja ver el botón, la pieza que se arma se posa junto a él (el trazo hasta el botón está en 9.3).

Si la persona no tiene fotos, la imagen protagonista de la portada se arma con las piezas de su marca: una composición propia con su símbolo, sus formas y sus colores, con escala y ritmo (por ejemplo, la pieza principal y dos o tres más chicas de la misma familia que aparecen una por una). El logo ampliado tal cual no cuenta: se ve como ícono de app o como relleno. Esa composición es el escenario natural de la firma.

Dónde vive: dentro de la portada real. En el nivel avanzado puede empezar en el preloader (sección 6) y terminar en la entrada del hero; en el nivel ligero, en la intro (19.3) seguida de la portada; si la página no lleva preloader (marcas sobrias, páginas que dependen de buscadores), toda la firma corre dentro de la entrada del hero (sección 7). En cualquier caso termina en la portada. El código de varias firmas y cortinas de salida está en 6.1: son puntos de partida para combinar y ajustar, no un catálogo del cual escoger.

Preparar el SVG del logo:
- Ábrelo y revisa cómo está armado. Cada letra o pieza que se vaya a animar debe ser su propio `<path>` (o un `<symbol>` reutilizado con `<use>`) con una clase.
- Si todo el logo es un solo trazado, las letras no se separan sin redibujarlas. Anima el logo completo o usa el isotipo, y pide el archivo fuente (Illustrator, Figma o un SVG exportado de Canva).
- Limpia lo que estorba: estilos internos, `fill:none` heredados (un logo con `fill:none` no se ve), transformaciones raras y capas ocultas.
- Si el nombre o el lema vienen como texto (`<text>`, sin convertir a curvas), no se pueden animar letra por letra y en celulares sin esa fuente se ven con otra. Pide la versión en curvas. Mientras llega, usa el logo tal cual, sin cambiarle la tipografía, anima el bloque completo y anótalo por validar. Para saberlo: `grep -c '<text' logo.svg` (más de 0 es texto sin convertir).
- Si solo existe en PNG, anima el bloque completo (escala de 0.92 a 1 y opacidad, o una máscara que lo descubre) y anota en pendientes pedir el SVG.

### 0.4 Animar los elementos gráficos propios

Los elementos de la marca sustituyen a la decoración genérica. Antes de agregar un adorno, pregúntate qué forma de su identidad puede hacer ese papel.

| Elemento de la marca | Cómo se mueve | Dónde funciona | Ingrediente |
|---|---|---|---|
| Formas y patrones (hojas, ondas, círculos, estrellas) | Flotan lento, respiran (escala de 1 a 1.03), giran como sello o se desplazan en capas con el scroll | Fondo del hero, separadores, sello junto al titular | 9.1 (flotado), 16 (parallax), CSS con `rotate` |
| Trazos (subrayados, flechas, contornos, íconos de línea) | Se dibujan al entrar o conforme bajas | Bajo la palabra clave de un título, entre secciones, en el proceso | 9.2 y 19.8 |
| Ilustraciones o personaje | Brincan a su lugar y flotan; asoman por el borde de una tarjeta | Junto a servicios, proceso, contacto y footer | 9.1 |
| Fotos con tratamiento (duotono, recorte, marco con la forma de la marca) | Se abren con un clip-path con la forma o el radio de la marca; bajan de escala; parallax interno | Hero, banners, equipo, trabajos | 16 |
| Bloques de color | Barren en la dirección propia de la marca | Cortina del preloader, menú, cambio entre secciones | 6.1 y 16 |
| Tipografía como elemento (una palabra en script, un número gigante) | Se dibuja o sube por letras | Titular del hero, cifras | 8 y 12 |
| Texturas (grano, papel) | Quietas | Fondos | Nunca animes `filter` sobre áreas grandes |

Reglas:
- Cada elemento tiene un solo comportamiento en todo el sitio. Si la hoja flota, flota siempre igual; si el subrayado se dibuja, se dibuja en todos los títulos que lo lleven.
- Para animar piezas por dentro, el SVG va escrito en el HTML, no como `<img>`. Lo decorativo lleva `aria-hidden="true"`.
- No inventes formas que la marca no tiene (partículas, manchas, confeti de colores ajenos). Si la identidad no trae elementos gráficos, el movimiento se apoya en la tipografía, el color y las fotos. También puedes proponer uno derivado del logo (una pieza del isotipo, la curva de una letra) y presentarlo como propuesta en la ficha.

### 0.5 Coreografía por sección

La coreografía decide qué se mueve en cada sección, con qué intensidad y en qué orden. Se arma después de la estructura de secciones (`references/02-estructura-y-copy.md`) y se agrega como columna a esa tabla.

Reglas:
- **Un gesto protagonista por sección**, derivado de la marca o de la referencia, y entradas discretas (con los tokens de `M`) para todo lo demás.
- **Intensidad en tres niveles.** El nivel 3 solo aparece en dos o tres momentos: el hero, una sección de prueba (trabajos, videos) y el cierre o el footer. Después de una sección intensa va una tranquila.
- **Precio, formulario y preguntas, en calma.** Nada se mueve mientras alguien lee una cifra o llena un campo.
- **La dirección cuenta algo.** Subir es aparecer; de izquierda a derecha es avanzar (proceso, pasos); desde el centro es foco (una cifra, un sello). Una vez elegida, se respeta.
- **Mismo tipo de pieza, mismo gesto.** Todos los títulos entran igual y todos los botones responden igual.

Formato de la partitura:

| # | Sección | Intensidad | Gesto protagonista | Entrada del resto | Disparo | Sale de |
|---|---|---|---|---|---|---|
| 1 | Hero | 3 | [FIRMA Y TITULAR POR LÍNEAS] | Textos y botones en cascada | Al cargar | Logo |
| 2 | [SECCIÓN] | 1, 2 o 3 | [GESTO] | Revelado con `M` | Una vez o con el scroll | Identidad o referencia |

"Una vez" se programa con `once: true`; "con el scroll", con `scrub` (sección 16).

### 0.6 Lo que sugiere la referencia de Pinterest

Una captura de Pinterest no se mueve: el movimiento se deduce de su composición. Léela y tradúcela así (la última columna dice qué secciones de este archivo tienen los ingredientes técnicos):

| Lo que ves en la referencia | Movimiento que sugiere | Cuidado con | Ingredientes |
|---|---|---|---|
| Tipografía gigante, interlineado cerrado, poco texto | Líneas que suben desde una ranura; con el scroll, líneas que se separan | Partir por letras los textos largos | 7, 8 y 16 |
| Mucho espacio en blanco, retícula ordenada, paleta neutra | Fundidos lentos, recorridos cortos, scroll con inercia | Rebotes o marquesinas que rompan la calma | 4 y 9 |
| Fotos a sangre o recortes grandes | Aperturas con clip-path, fotos que bajan de escala, parallax dentro del marco | Una foto del mismo alto que su marco: al moverse se ven los bordes | 16 |
| Fotos o video como protagonista | Carril de videos, revelados con máscara, video de fondo con el tratamiento de la marca | Videos pesados o que corren fuera de pantalla | 11 y 16 |
| Collage, stickers y piezas encimadas y giradas | Piezas que brincan con giro al azar y luego flotan; inclinación con el mouse | Llenar todas las secciones de piezas sueltas | 9.1 y 13 |
| Bloques de color planos, tipografía condensada, aire de póster | Barridos de color, cortes secos, marquesinas | Perder contraste y legibilidad | 6.1 y 10 |
| Oscuro, luces, aire de lujo | Cortinas lentas, imágenes que aparecen desde la penumbra, cero rebotes | Que la oscuridad venga de la referencia y no de la marca (manda la identidad) | 6 y 7 |
| Formas orgánicas, degradados suaves | Curvas suaves, formas que respiran, flotados lentos | Animar degradados grandes o `blur`, que en celular son caros | 9.1 |
| Líneas finas, números, retícula visible | Líneas que se dibujan, números que cuentan, revelado de izquierda a derecha | Contar cifras que no existen | 9.2 y 12 |
| Columnas desfasadas, asimetría editorial | Parallax por capas a distintas velocidades | Exagerarlo en celular; ahí va mucho más suave | 16 |
| Tarjetas en fila con radios grandes | Entradas en cascada; inclinación leve con el mouse | Carruseles anclados que secuestran el scroll | 9 y 13 |
| Casi vacío, minimalista | Muy poco movimiento y bien hecho: un revelado por sección y la firma | Rellenar el vacío con efectos | 9 o 19 |

Reglas:
- **De la referencia se toma la estructura y la sensación**, nunca sus textos, fotos, logos ni una copia exacta del diseño. Tampoco su intro ni su secuencia de movimiento cuadro por cuadro: si la referencia es un video o un sitio en vivo, describe qué se mueve y a qué ritmo, y tradúcelo a la firma y los tokens de esta marca.
- **Si hay varias referencias**, toma de cada una algo distinto y dilo en la ficha ("de la primera, la tipografía gigante; de la segunda, cómo se abren las fotos").
- **Cuando la referencia y la identidad chocan, manda la identidad.** Si la referencia es un póster frenético y la marca es un despacho legal, conserva su retícula y su tipografía grande, y baja la energía: líneas que suben sin rebote y nada de marquesinas.
- Pregunta solo si no queda claro qué le gusta de la imagen: "¿Qué te atrajo de esta: la tipografía, las fotos, el orden o la sensación general?".

### 0.7 La ficha de movimiento: se aprueba antes de construir

El movimiento se presenta como parte de la dirección de arte (`references/01-identidad-y-referencia.md`), en la aprobación del sistema de diseño. No se construye ninguna sección animada sin ese sí.

```text
FICHA DE MOVIMIENTO: [MARCA]
Se siente: [TRES PALABRAS], porque [SEÑALES DE SU IDENTIDAD Y LO QUE DIJO LA PERSONA]
Ritmo: entradas de [X] s con curva [NOMBRE] ([CUBIC-BEZIER]), recorren [X] px,
  escalonado de [X] s, rebote [EN QUÉ PIEZAS, O NINGUNO]
Firma: [QUÉ PIEZA DEL LOGO O DE LA MARCA SE ANIMA Y CÓMO], dura [X] s.
  Reaparece en: [LUGARES]
Elementos de marca en movimiento: [ELEMENTO]: [MOVIMIENTO] en [SECCIÓN]
Coreografía: [TABLA DE 0.5]
De la referencia tomamos: [ESTRUCTURA Y SENSACIÓN]. No tomamos: [LO QUE SE DEJA FUERA]
El sitio no hará: [POR EJEMPLO: CURSOR PERSONALIZADO, MARQUESINAS, REBOTES]
Nivel: [LIGERO O AVANZADO] (sección 1)
```

La ficha completa, con curvas, duraciones y recorridos, es la nota técnica: se convierte en los tokens (3.3) y termina en el LEEME. En el mensaje de la etapa 3 y en la hoja de muestra se explica con frases sencillas ("todo entra despacio y sin rebotes, como una página que se abre"), sin nombres de curvas, píxeles ni segundos.

Que la persona lo vea y no solo lo lea: en `direccion-de-arte.html` (la hoja de muestra de la etapa 3) la firma corre dentro de la portada real y termina en ella, con un botón "Ver de nuevo". Cómo se arma por dentro está en 0.9. Se aprueba junto con la dirección de arte, con la misma pregunta: "¿Así se siente tu marca?". Ajustar la ficha cuesta minutos; cambiar el carácter del movimiento a media construcción obliga a retocar cada sección.

### 0.8 Tres marcas, tres movimientos

Las tres son marcas de ejemplo para mostrar el método, no clientes reales. Fíjate cómo los mismos ingredientes cambian de carácter.

**No copies valores de estos ejemplos.** Sirven para ver cómo se razona, no para elegir uno y cambiarle el color. Si el caso real se parece a un ejemplo (mismo giro, mismo tipo de logo, misma sensación), cambia al menos la firma, la cortina y todos los valores de `M`, y saca cada gesto de las piezas de esa marca. Si al terminar la ficha coincide con un ejemplo en la curva, la duración y el recorrido a la vez, revísala: probablemente se copió.

**A. Panadería de barrio: cálida y cercana**
- Identidad: logotipo en una serif redonda y gruesa, isotipo de una concha (el pan dulce) con las líneas de su costra, café tostado y canela con acento rosa mexicano sobre blanco harina, un sello redondo con el año de fundación e ilustraciones de pan de trazo grueso.
- Referencia de Pinterest: el menú impreso de una cafetería, con fotos de pan recortadas sobre fondos de color plano, precios grandes y etiquetas pegadas un poco chuecas.
- Ritmo: `power3.out`, 0.85 s, 34 px, escalonado de 0.07 s; rebote corto (`back.out(1.7)`) solo en los panes y el sello. Lenis en 0.1.
- Firma: las líneas de la costra de la concha se marcan una por una, como si alguien las trazara con el cuchillo, y la concha se infla con un rebote corto. Preloader de 1.8 s, sin barra ni porcentaje; la cortina se parte desde el centro hacia los lados, como un pan que se abre, y deja ver la portada: la foto del pan del día, el titular y el sello "Desde [AÑO]", que se estampa junto al botón "Haz tu pedido" al final. Rima: la concha se infla en el ícono del botón al pasar el mouse, sus líneas separan las secciones y el sello gira lento en el footer.
- Elementos de marca: los panes ilustrados brincan a su lugar sin giro; las etiquetas de precio entran con una inclinación leve, como si se pegaran; la textura de la costra queda quieta de fondo.
- Coreografía: portada 3 (firma y titular por líneas), pan del día 2 (panes que brincan), cómo pedir 2 (tres pasos con una línea que avanza), pedidos especiales 1, horarios y ubicación 1, preguntas 1.
- No hará: cursor personalizado, marquesinas rápidas, rebote en textos ni parallax en celular.

**B. Despacho legal: sobrio y confiable**
- Identidad: logotipo en serif de alto contraste, monograma de línea fina dentro de un marco cuadrado, azul marino, gris piedra y blanco hueso; fotos del equipo en blanco y negro; sin ilustraciones.
- Referencia de Pinterest: un sitio editorial con retícula visible, líneas de 1 px que separan secciones y titulares grandes en serif.
- Ritmo: `power2.out`, 0.7 s, 16 px (los párrafos, solo fundido), escalonado de 0.06 s, sin rebote. Lenis en 0.12.
- Firma: sin preloader, porque en un despacho nada debe tapar el contenido. El monograma se dibuja con un trazo continuo en 1.4 s dentro de la entrada del hero y su relleno aparece al final, mientras el titular entra con un fundido. Rima: las líneas de la retícula se dibujan de izquierda a derecha al entrar cada sección y el monograma se dibuja en el footer.
- Elementos de marca: líneas de 1 px y el marco del monograma. Las fotos en blanco y negro bajan de escala de 1.06 a 1 en 1.6 s.
- Coreografía: hero 2, áreas de práctica 1 (lista numerada con la línea que se dibuja; al pasar el mouse el renglón se recorre 6 px), trayectoria 2 (cifras reales con fuente que cuentan en 1.6 s), equipo 2 (fotos que se abren de abajo hacia arriba), contacto 1.
- No hará: rebotes, giros, marquesinas, botones magnéticos, cursor personalizado ni ilustraciones que flotan.

**C. Estudio creativo: enérgico y atrevido**
- Identidad: logotipo en una grotesca extendida muy pesada, isotipo de estrella de ocho puntas, rojo tomate y negro con acento lila, stickers de trazo grueso.
- Referencia de Pinterest: un póster tipográfico con letras enormes que se salen del borde, collage de stickers girados y bloques de color planos.
- Ritmo: `expo.out`, 0.9 s, 80 px con giro, escalonado de 0.04 s; rebote marcado (`back.out(2)`) en sellos y `elastic.out(1,.5)` en stickers. Lenis en 0.09.
- Firma: la estrella entra girando media vuelta y se asienta con rebote; las letras del logo caen encima una por una. Sale con dos barridos en diagonal, rojo y negro. Rima: la estrella gira como sello junto al titular, separa las palabras de la marquesina y está en el ícono del botón; el logo del footer se arma con el scroll.
- Elementos de marca: stickers que brincan con giro al azar y luego flotan; bloques de color que barren en diagonal entre secciones.
- Coreografía: hero 3 (titular gigante que se separa con el scroll), marquesina de servicios 2 (acelera con el scroll), proyectos 3 (foto que sigue al cursor), proceso 2 (línea que se dibuja), precios 1 (solo legibilidad), contacto 2 (botón magnético), footer 3 (logo que se arma).
- No hará: secciones ancladas ni scroll horizontal, rebote en párrafos (el texto largo entra sin rebote) ni dos secciones de intensidad 3 seguidas.

El mismo ingrediente en las tres marcas:

| Ingrediente | A. Panadería | B. Despacho | C. Estudio |
|---|---|---|---|
| Tokens `M` (3.3) | `power3.out`, 0.85 s, 34 px, 0.07 s | `power2.out`, 0.7 s, 16 px, 0.06 s | `expo.out`, 0.9 s, 80 px, 0.04 s |
| Preloader o intro (6, 19.3) | Preloader de 1.8 s sin barra; cortina que se parte desde el centro | No hay; la firma corre en el hero | Preloader de 2.5 s con barridos diagonales; versión corta en la segunda visita |
| Dónde termina la firma (0.3) | Sello que se estampa junto al botón | Monograma completo junto al titular | Estrella que se queda girando junto al titular |
| Títulos (8) | Por líneas desde la ranura | Fundido de 12 px, sin máscara | Por líneas desde la ranura; la palabra clave por letras con rebote |
| Revelados (9) | Cascada corta y viva | Fundido corto | Cascada rápida con giro leve |
| Ilustraciones y trazos (9.1, 9.2) | Panes que brincan sin giro; líneas de la concha que se dibujan | Líneas de 1 px que se dibujan | Stickers con giro al azar y `elastic`; flotado de 5 s |
| Marquesina (10) | Lenta (25 px/s) con los panes del día, la concha como separador, sin inclinarse | No hay | Rápida, acelera e inclina con el scroll; estrella como separador |
| Botón principal (13) | Texto que rueda; la concha del ícono se infla; sin magnético | Subrayado que se dibuja; sin magnético | Magnético, texto que rueda, estrella que gira |
| Efectos con el scroll (16) | Línea de los pasos para pedir que avanza | Fotos en blanco y negro que bajan de escala | Titular que se separa; barridos de color |

Los tokens de cada una (el detalle está en 3.3). Cada sitio declara un solo `M`:

```js
// A. Panadería cálida
const M = { ease: 'power3.out', easeIO: 'power2.inOut', pop: 'back.out(1.7)', dur: 0.85, stagger: 0.07, dist: 34, lerp: 0.1 };
```

```js
// B. Despacho sobrio: pop igual a ease, así ningún ingrediente rebota
const M = { ease: 'power2.out', easeIO: 'power2.inOut', pop: 'power2.out', dur: 0.7, stagger: 0.06, dist: 16, lerp: 0.12 };
```

```js
// C. Estudio enérgico
const M = { ease: 'expo.out', easeIO: 'expo.inOut', pop: 'back.out(2)', dur: 0.9, stagger: 0.04, dist: 80, lerp: 0.09 };
```

```css
/* A */ :root{--ease:cubic-bezier(.25,1,.5,1);--ease-io:cubic-bezier(.65,0,.35,1);--ease-pop:cubic-bezier(.34,1.56,.64,1);--dur:.85s;--dist:34px;--t-hover:.4s}
/* B */ :root{--ease:cubic-bezier(.33,1,.68,1);--ease-io:cubic-bezier(.65,0,.35,1);--ease-pop:var(--ease);--dur:.7s;--dist:16px;--t-hover:.3s}
/* C */ :root{--ease:cubic-bezier(.16,1,.3,1);--ease-io:cubic-bezier(.87,0,.13,1);--ease-pop:cubic-bezier(.34,1.68,.68,1);--dur:.9s;--dist:80px;--t-hover:.45s}
```

### 0.9 La hoja de muestra (direccion-de-arte.html): cómo se arma por dentro

Es la página que la persona abre en la etapa 2 para aprobar la dirección de arte. No es el sitio: es una muestra corta de cómo se verá y se moverá su marca. Qué se ve lo decide la dirección de arte (`references/01-identidad-y-referencia.md`); aquí está lo técnico.

**Orden y largo**
1. Arriba de todo, la portada real: su titular, su botón principal y su composición, con la animación firma corriendo al abrir y terminando en esa portada (0.3, regla 6). Justo debajo, un botón "Ver de nuevo".
2. Después, solo lo visual explicado con frases sencillas: la paleta con el papel de cada color, las letras con textos reales, los elementos gráficos dibujados, un botón con su hover y una tarjeta.
3. De 6 a 8 pantallas de celular como máximo: unos 5,000 a 6,500 px de alto a 375 px de ancho. El resumen de `scripts/revisar-sitio.mjs` dice cuántas pantallas mide.
4. Nada de jerga en el texto visible: ni píxeles, ni nombres de curvas, ni proporciones de contraste, ni nombres de tokens, ni versiones de librerías. Esos valores van al LEEME.
5. Un aviso discreto de que es una hoja de muestra y no se publica, corto para que no se parta en dos renglones a 375 px.

**Mismas librerías que el sitio**
- La muestra carga las mismas librerías, en las mismas versiones y de la misma forma que el sitio (2.1 en Claude Code, 2.2 en claude.ai). Usa los mismos ayudantes (3.2), los mismos tokens `M` (3.3) y la misma función de la firma. Así, lo que la persona aprueba es lo que verá después.
- Si la ficha usa Lenis, la muestra también lo crea (sección 4), para que la persona sienta la inercia que está aprobando. El reporte de `revisar-sitio.mjs` debe decir "Lenis (activo)".
- Si las librerías no cargan, todo se ve completo y quieto: la guardia `no-js`/`js` (3.1) y `hasGSAP` (3.2) funcionan igual que en el sitio, y "Ver de nuevo" se esconde.

**Reducir movimiento**
- Con "Reducir movimiento" activado nada se reproduce solo: la portada aparece completa desde el inicio.
- "Ver de nuevo" muestra una versión sin desplazamientos (solo fundidos cortos) y un aviso explica que la animación completa se ve con ese ajuste apagado.

```html
<section class="portada" data-portada>
  <!-- la portada real: titular, botón principal y composición. Las piezas que entran llevan data-pieza -->
</section>
<p class="muestra__controles">
  <button type="button" class="muestra__repetir" data-ver-de-nuevo>Ver de nuevo</button>
  <span class="muestra__aviso" data-aviso-rm hidden>Tienes activado "Reducir movimiento": aquí ves una versión sin desplazamientos. Apágalo para ver la animación completa.</span>
</p>
```

```js
// Va después de los ayudantes (3.2) y de M (3.3). firmaPortada() es la misma función que usará el sitio:
// arma la línea de tiempo de la firma dentro de la portada (6.1 y 7), la reproduce y la devuelve.
safe(() => {
  const repetir = $('[data-ver-de-nuevo]');
  const aviso = $('[data-aviso-rm]');
  if (!hasGSAP) { if (repetir) repetir.hidden = true; return; }   // sin librerías: completa y quieta
  if (RM) {                                                      // nada corre solo
    if (aviso) aviso.hidden = false;
    if (repetir) repetir.addEventListener('click', () => {
      gsap.fromTo('[data-portada] [data-pieza]', { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, stagger: 0.12, ease: 'none' });   // solo fundidos, sin desplazar nada
    });
    return;
  }
  let tl = null;
  Promise.race([d.fonts ? d.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
    .then(() => { tl = firmaPortada(); });
  if (repetir) repetir.addEventListener('click', () => { if (tl) tl.restart(); });
});
```

`tl.restart()` vuelve a correr la misma línea de tiempo desde el principio. No llames otra vez a `firmaPortada()` para repetir: si la firma divide un título con SplitText, lo volvería a dividir encima del anterior.

**Revisarla antes de enseñarla**
- En Claude Code, ábrela en la vista previa a 375 px. Si el panel no está disponible o está oculto, corre `node "<carpeta de la skill>/scripts/revisar-sitio.mjs" direccion-de-arte.html revision-muestra --firma` (sección 2 de `04-calidad-y-publicacion.md`). Con `--firma` guarda la portada a los 0.3, 0.8, 1.4, 2.2, 3.2 y 4.5 s: mira esos cuadros para encontrar una máscara que corta una pieza a media animación o una firma que termina en un recuadro vacío.
- En claude.ai, entrégala como archivo para descargar y abrir en Chrome: el panel de vista previa de claude.ai puede no cargar las fuentes ni las animaciones. Como ahí no la puedes ver funcionando, dilo y pide una captura si algo se ve raro. Si tienes ejecución de código, comprueba al menos que el JS no tenga errores de sintaxis (extrae el bloque y corre `node --check`) y que todo el contenido se vea sin JavaScript.

### Errores típicos

- Saltarse esta sección y usar los números de los ingredientes tal como vienen: todos los sitios terminan moviéndose como la landing de referencia.
- Tomar un ejemplo de 0.8 porque el giro se parece y cambiarle solo los colores.
- Elegir efectos de un catálogo ("pon tarjetas apiladas y una marquesina") en lugar de derivarlos de la marca y de la referencia.
- Copiar la intro o la secuencia de movimiento de la referencia, o usar sus textos, fotos o logos.
- Una firma genérica (un círculo que gira, un logo que solo aparece con fundido) cuando la marca tiene piezas para algo propio.
- Una firma que corre aparte y termina en un recuadro vacío, en lugar de terminar en la portada real con su botón.
- El logo ampliado como única imagen de la portada cuando no hay fotos.
- Estirar, recolorear o deformar el logo para animarlo.
- Dar la misma intensidad a todas las secciones.
- Decorar con formas que la marca no tiene.
- Una hoja de muestra larga, con código o medidas técnicas, o sin las librerías que usará el sitio.
- Construir antes de que la persona apruebe la ficha.

---

## 1. Elegir el nivel: ligero o avanzado

| Página | Nivel | Por qué |
|---|---|---|
| Landing de servicios larga, con 8 o más secciones y scroll narrativo | **Avanzado**: GSAP + ScrollTrigger + SplitText + Lenis | Títulos que suben línea por línea, efectos pegados al scroll, seguimiento del mouse fluido y scroll con inercia |
| Tarjeta de contacto, página de gracias, guía, agenda o cualquier página de una sola acción | **Ligero**: sin librerías (sección 19) | Abre al instante desde un QR con datos móviles y no depende de ningún CDN |
| Sitio corto de 3 a 5 secciones | Ligero; sube a avanzado solo si la persona quiere títulos por líneas o parallax | Menos peso, mismo acabado en el 80 % de los efectos |

Peso del nivel avanzado (versiones de la sección 2): gsap 72 KB, ScrollTrigger 44 KB, SplitText 8 KB y Lenis 20 KB, unos 145 KB sin comprimir. Vale la pena en una landing larga; en una tarjeta de contacto, no.

El nivel lo decide el tipo de página; la personalidad de la marca decide la intensidad dentro del nivel. Un despacho sobrio con una landing larga puede ir en nivel avanzado por SplitText y los efectos con el scroll, sin un solo rebote ni marquesina.

Reglas de dirección para los dos niveles:
- **Un gesto protagonista por sección**, sacado de la coreografía (0.5), y entradas discretas para lo demás. Si todo se mueve igual de fuerte, nada destaca y el sitio cansa.
- **Las curvas de la ficha en todo el sitio** (sección 3.3). Repetir las mismas es lo que hace que el movimiento se sienta caro y coherente.
- **Lo funcional antes que lo bonito.** Menú, preguntas, formulario y botones funcionan aunque no haya animación.
- **Nada se queda oculto si algo falla.** Todo estado oculto vive bajo `.js` o se pone con `gsap.set`, y todo intro tiene salida por tiempo.

---

## 2. Cargar las librerías: GSAP 3.15 y Lenis 1.3

Versiones fijas de esta skill:
- **gsap 3.15.1**, que ya trae ScrollTrigger y SplitText. Todos los plugins de GSAP son gratuitos desde 2025, también para sitios comerciales de clientes. No existe ningún "SplitText de pago" que haya que conseguir aparte.
- **lenis 1.3.27**.

Versiones confirmadas en el registro de npm el 13 de noviembre de 2026: son las últimas estables de ese día. Ya existe una beta de GSAP 4: no uses betas en sitios de clientes. Si pasaron meses, confirma la versión con `npm view gsap version` y `npm view lenis version`, pruébala con la hoja de muestra y actualiza este archivo. Nunca uses `@latest`, `gsap@3` ni rutas sin número: el día que cambie la versión, algo dejará de funcionar sin que nadie haya tocado el sitio.

### 2.1 Claude Code: librerías dentro del proyecto (preferido)

Descárgalas a la carpeta `vendor/` del proyecto para no depender de un CDN:

```bash
mkdir -p vendor
curl -fsSL -o vendor/gsap.min.js https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js
curl -fsSL -o vendor/ScrollTrigger.min.js https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/ScrollTrigger.min.js
curl -fsSL -o vendor/SplitText.min.js https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/SplitText.min.js
curl -fsSL -o vendor/lenis.min.js https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js
head -c 60 vendor/SplitText.min.js   # debe decir "SplitText 3.15.1"
```

La opción `-f` hace que `curl` falle en lugar de guardar una página de error como si fuera la librería.

Al final del `<body>`, en este orden y todas con `defer` (defer respeta el orden):

```html
<script src="vendor/gsap.min.js" defer></script>
<script src="vendor/ScrollTrigger.min.js" defer></script>
<script src="vendor/SplitText.min.js" defer></script>
<script src="vendor/lenis.min.js" defer></script>
<script src="js/main.js?v=20261012a" defer></script>
```

El `?v=` se cambia cada vez que se edita `main.js` o el CSS, porque algunos hostings (Hostinger, por ejemplo) guardan la versión anterior en caché.

### 2.2 Un solo archivo HTML (claude.ai)

En claude.ai la vista previa carga scripts de cdnjs.cloudflare.com y de cdn.jsdelivr.net/npm/, y fuentes solo de Google Fonts. Usa GSAP y Lenis desde jsDelivr (`/npm/`), con la versión exacta: jsDelivr publica cada versión de npm el mismo día, y cdnjs a veces tarda; si algo no carga, la página se ve completa igual. Aun así, el panel de vista previa puede mostrar la página sin sus fuentes o sin movimiento: la hoja de muestra y el sitio se revisan descargados y abiertos en Chrome. El CSS de Lenis (sección 4) va dentro del `<style>`; no hace falta enlazar `lenis.css`.

Fuentes en el `<head>`, desde Google Fonts con `preconnect` (en un solo archivo no hay `woff2` propios que precargar):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=[FUENTE DE TÍTULOS]:wght@[PESOS]&family=[FUENTE DE TEXTO]:wght@[PESOS]&display=swap">
```

Si una fuente variable tiene ejes propios (Fraunces trae `SOFT`, `WONK` y `opsz` además del grosor), pide esos ejes en la URL o se quedan fijos en su valor de fábrica. Van en orden alfabético, primero los de minúscula y luego los de mayúscula, y después se fija su valor con `font-variation-settings`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&display=swap">
```

```css
.titulo{font-family:'Fraunces',Georgia,serif;font-variation-settings:'SOFT' [VALOR],'WONK' [VALOR]}  /* los valores salen de la dirección de arte */
```

Librerías al final del `<body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/SplitText.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js" defer></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    /* aquí va todo el código de main.js */
  });
</script>
```

Por qué `DOMContentLoaded`: un `<script>` escrito dentro del HTML ignora `defer` y se ejecuta en cuanto el navegador lo lee, antes que las librerías. Sin esa envoltura, `gsap` todavía no existe, el código cree que GSAP falló y la página queda estática. Los scripts con `defer` siempre terminan antes de `DOMContentLoaded`.

Alternativas si un CDN no carga:
- GSAP en cdnjs: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.1/gsap.min.js`, y lo mismo con `ScrollTrigger.min.js` y `SplitText.min.js`. Antes de usarlo, confirma que la versión ya está publicada ahí; si da 404, quédate en jsDelivr.
- Lenis no está en cdnjs (da 404). Alternativa: `https://unpkg.com/lenis@1.3.27/dist/lenis.min.js`.
- Si Lenis no carga, no pasa nada grave: el código revisa `window.Lenis` y deja el scroll nativo. En el archivo descargado y abierto en Chrome sí carga.

Opcionales, solo si la ficha de movimiento los pide (misma versión):
- **CustomEase**, para que GSAP use exactamente la misma curva que el CSS (sección 3.3): `https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/CustomEase.min.js` o `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.1/CustomEase.min.js`.
- **MorphSVGPlugin**, solo si la firma necesita que una forma de la marca se convierta en otra (una gota que se vuelve hoja): `https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/MorphSVGPlugin.min.js` o `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.1/MorphSVGPlugin.min.js`. Para trazos que se dibujan no hace falta ningún plugin (sección 9.2).

Van después de gsap y antes de `main.js`, también con `defer`, y se registran igual: `gsap.registerPlugin(CustomEase)`.

### 2.3 claude.ai: el archivo se escribe por partes

Un `index.html` completo, con estilos, secciones, GSAP, SplitText, Lenis y datos estructurados, no cabe en una sola respuesta. Si intentas escribirlo de una vez, la respuesta se corta y no queda ningún archivo. Por eso se construye por partes con la herramienta de archivos: primero se crea y luego se edita.

1. **Antes de empezar, di cuántas respuestas vas a necesitar.** Por ejemplo: "Lo voy a construir en 4 respuestas: base y estilos, secciones de arriba, secciones de abajo y la parte que lo mueve. Entre una y otra escribe «continúa»".
2. **Primera parte, el esqueleto.** Crea `index.html` con el `<head>` completo (metadatos, fuentes con `preconnect`, favicon), todo el `<style>` con los tokens y los estilos base, y en el `<body>` un par de comentarios por sección, todavía vacía: `<!-- ===== INICIO Servicios ===== -->` y `<!-- ===== FIN Servicios ===== -->`. Al final van las librerías y un `<script>` vacío.
3. **Partes siguientes, sección por sección.** Llena una o dos secciones por respuesta, en el espacio entre sus comentarios. Si una sección necesita estilos propios, agrégalos al final del `<style>` en la misma respuesta.
4. **Última parte, el JS.** Todo el código dentro de `DOMContentLoaded` (2.2), en el orden de 3.4.
5. **Para corregir, edita solo el pedazo que cambia.** No vuelvas a escribir el archivo completo para arreglar un detalle.
6. **Orden de entrega:** primero `index.html` completo, después el LEEME y al final la lista de revisión para la persona (sección 3 de `04-calidad-y-publicacion.md`). Así, si la conversación se corta al final, el sitio ya está completo.

Al terminar cada parte, revisa que el archivo siga bien cerrado: cada sección con su cierre y el `<style>` y el `<script>` completos. Si tienes ejecución de código, extrae el `<script>` y corre `node --check` sobre él. Como en claude.ai no hay navegador para probarlo, dilo claramente al entregar y da la lista de revisión.

### Errores típicos

- Intentar escribir todo el `index.html` en una sola respuesta en claude.ai.
- Escribir el código en línea sin `DOMContentLoaded` cuando las librerías llevan `defer`.
- Cargar ScrollTrigger antes que gsap, o `main.js` en el `<head>` sin `defer`.
- Cargar GSAP dos veces (local y por CDN). Se pisan los plugins registrados.
- Olvidar `gsap.registerPlugin(ScrollTrigger)` y `gsap.registerPlugin(SplitText)`.
- Usar versiones sin fijar o `@latest`.

---

## 3. Cimientos: clase js, banderas, safe() y orden de main.js

### 3.1 Guardia no-js / js

```html
<html lang="es-CO" class="no-js">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <!-- ...estilos... -->
  <script>document.documentElement.className=document.documentElement.className.replace('no-js','js');</script>
</head>
```

Esa línea corre antes de que se pinte la página. Regla: **todo estado oculto para animar se escribe bajo `.js`** (`.js .hero__line-in{...}`) o se aplica con `gsap.set` desde el JS. Si el JavaScript falla o se bloquea, la clase `js` no existe o se quita, y la página se ve completa y quieta.

### 3.2 Banderas y safe()

```js
const d = document;
const html = d.documentElement;
const $ = (s, c = d) => c.querySelector(s);
const $$ = (s, c = d) => [...c.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;         // pidió menos movimiento
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;     // hay mouse o trackpad de verdad
const SAVE_DATA = !!(navigator.connection && navigator.connection.saveData); // modo ahorro de datos
const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
const safe = (fn) => { try { fn(); } catch (e) { console.warn('[sitio]', e); } };

if (!hasGSAP) html.classList.remove('js');   // sin GSAP: todo visible y quieto
else {
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true }); // la barra del navegador del celular no recalcula todo
}
```

Cada módulo va dentro de `safe(() => { ... })`. Si el muro de logos truena, el acordeón y el formulario siguen vivos.

### 3.3 Tokens de movimiento de la marca

Los valores salen de la ficha de movimiento aprobada (0.7). Se declaran una sola vez y los ingredientes los leen: así cambiar el carácter del sitio es cambiar siete valores, no cuarenta líneas.

```css
:root{
  --ease: cubic-bezier(.22,1,.36,1);       /* entradas: la curva de la marca (pareja de M.ease) */
  --ease-io: cubic-bezier(.65,0,.35,1);    /* cortinas, menú, paneles (pareja de M.easeIO) */
  --ease-pop: cubic-bezier(.34,1.56,.64,1); /* piezas pequeñas; en marcas sobrias, var(--ease) */
  --dur: 1.1s;                             /* duración base de una entrada (pareja de M.dur) */
  --dist: 40px;                            /* cuánto recorre un revelado (pareja de M.dist) */
  --t-hover: .55s;                         /* transiciones de hover */
}
```

```js
// No hay valores por defecto: estos son los de la landing de referencia y solo sirven para leer el código.
// Antes de construir, cámbialos por los de la ficha aprobada (ejemplos de otras marcas en 0.8).
const M = {
  ease: 'expo.out',        // entradas de texto y bloques
  easeIO: 'expo.inOut',    // cortinas, paneles, menú
  pop: 'back.out(1.7)',    // piezas pequeñas: sellos, números, íconos; en marcas sobrias, igual a ease
  dur: 1.1,                // duración base de una entrada, en segundos
  stagger: 0.09,           // separación entre piezas que entran juntas
  dist: 40,                // píxeles que recorre un revelado
  lerp: 0.095,             // inercia de Lenis; 0 para no usar Lenis
};
```

Qué token usa cada cosa:

| Uso | GSAP | CSS y Web Animations API |
|---|---|---|
| Entradas de texto y bloques | `M.ease`, `M.dur`, `M.stagger`, `M.dist` | `var(--ease)`, `var(--dur)`, `var(--dist)` |
| Cortinas, paneles, menú | `M.easeIO` | `var(--ease-io)` |
| Piezas pequeñas (sellos, números, íconos, stickers) | `M.pop` | `var(--ease-pop)` |
| Hovers | | `var(--t-hover) var(--ease)` |
| Todo lo que va con `scrub` | `'none'` siempre: es técnica, no marca | |
| Flotado de ida y vuelta | `sine.inOut` con `yoyo`, en cualquier marca | `ease-in-out` |

Parejas entre GSAP y CSS para que el CSS y el JS se muevan igual. Se verificaron con CustomEase: la diferencia máxima en toda la curva es menor a 0.04.

| GSAP | CSS | | GSAP | CSS |
|---|---|---|---|---|
| `power1.out` | `cubic-bezier(.5,1,.89,1)` | | `power2.inOut` | `cubic-bezier(.65,0,.35,1)` |
| `power2.out` | `cubic-bezier(.33,1,.68,1)` | | `power3.inOut` | `cubic-bezier(.76,0,.24,1)` |
| `power3.out` | `cubic-bezier(.25,1,.5,1)` | | `expo.inOut` | `cubic-bezier(.87,0,.13,1)` |
| `power4.out` | `cubic-bezier(.22,1,.36,1)` | | `sine.inOut` | `cubic-bezier(.37,0,.63,1)` |
| `expo.out` | `cubic-bezier(.16,1,.3,1)` | | `back.out(1.2)` | `cubic-bezier(.34,1.4,.64,1)` |
| | | | `back.out(1.7)` | `cubic-bezier(.34,1.56,.64,1)` |
| | | | `back.out(2)` | `cubic-bezier(.34,1.68,.68,1)` |

`elastic.out` no tiene pareja en `cubic-bezier`: en CSS usa `--ease-pop`. La landing de referencia combina `--ease: cubic-bezier(.22,1,.36,1)` (que equivale a `power4.out`) con `expo.out` en GSAP; están lo bastante cerca. Si la marca necesita exactamente la misma curva en los dos lados, registra la del CSS con CustomEase (sección 2):

```js
if (hasGSAP && window.CustomEase) {           // justo después de declarar M, antes de cualquier animación
  gsap.registerPlugin(CustomEase);
  CustomEase.create('marca', '.22,1,.36,1');  // los mismos cuatro números de --ease
  M.ease = 'marca';
}
```

Lo que no depende de la marca: los bucles infinitos siempre son lentos (un sello gira en 14 a 22 s, una forma flota en 6 a 10 s), incluso en marcas enérgicas, y todo lo que va con `scrub` usa `'none'`.

### 3.4 Orden de main.js

```js
(() => {
  'use strict';
  // 1. Ayudantes y banderas (3.2) y tokens de movimiento M (3.3)
  // 2. Lenis (4) y reloj compartido (5)
  // 3. Lo que debe servir siempre y no necesita GSAP: videos (11.1), marquesina con JS (10.2),
  //    carril de videos (11.2), menú, anclas (4), preguntas (14), formulario y barra fija (15)
  if (!hasGSAP) { startHeroVideo(); return; }   // video del hero sin animación (11.1)
  // 4. Efectos de mouse, solo con FINE (13)
  if (RM) { const pl = $('.preloader'); pl && pl.remove(); return; } // (17)
  // 5. Estados iniciales con gsap.set (7, 9)
  // 6. Efectos de scroll (8 a 12 y 16)
  // 7. Arranque: preloader, entrada del hero, títulos y ScrollTrigger.refresh() (6)
})();
```

Marca en el HTML qué se anima con atributos (`data-reveal`, `data-split`, `data-pop`, `data-draw`, `data-count`, `data-marquee`, `data-vrow`, `data-magnetic`, `data-tilt`). Así una sección nueva se anima sin tocar el JS, y como el JS lee los tokens de `M`, entra con el carácter de la marca.

### Errores típicos

- Esconder en CSS sin `.js` (`[data-reveal]{opacity:0}`): si el JS falla, la página queda en blanco.
- Un solo bloque gigante sin `safe()`: un error en cualquier efecto apaga todos los demás.
- Poner el menú, el acordeón o el formulario después de `if (RM) return`: dejan de funcionar justo para quien pidió menos movimiento.

---

## 4. Scroll suave con Lenis conectado a ScrollTrigger

**Cuándo usarlo:** solo en el nivel avanzado. Es la sensación premium número uno con rueda de mouse y trackpad. En celular Lenis deja el scroll nativo del dedo (su opción `syncTouch` viene apagada y así debe quedarse). No se crea si la persona pidió menos movimiento.

```js
let lenis = null;
if (hasGSAP && !RM && window.Lenis && M.lerp) {
  lenis = new Lenis({ lerp: M.lerp, smoothWheel: true, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);        // ScrollTrigger se entera de cada movimiento
  gsap.ticker.add((t) => lenis.raf(t * 1000));     // un solo reloj para los dos
  gsap.ticker.lagSmoothing(0);                     // nunca se desfasan tras un cuadro pesado
}
```

`lerp` es la inercia y sale de la ficha (`M.lerp`): 0.07 se siente pausado y lujoso, 0.12 directo y sobrio. 0.095 es el de la landing de referencia. Con `M.lerp = 0` el sitio usa el scroll nativo, una opción válida para marcas sobrias.

CSS de Lenis. Son las reglas de `lenis.css` 1.3.27 más la última, que evita el doble suavizado:

```css
html.lenis, html.lenis body { height: auto; }
.lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }
.lenis [data-lenis-prevent], .lenis [data-lenis-prevent-wheel], .lenis [data-lenis-prevent-touch], .lenis [data-lenis-prevent-vertical], .lenis [data-lenis-prevent-horizontal] { overscroll-behavior: contain; }
.lenis.lenis-smooth iframe { pointer-events: none; }
.lenis.lenis-autoToggle { transition-property: overflow; transition-duration: 1ms; transition-behavior: allow-discrete; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
```

Pausar y reanudar: `lenis.stop()` mientras corre el preloader y mientras el menú móvil está abierto; `lenis.start()` al terminar. Cualquier zona con scroll propio (un menú largo, una lista que se recorre de lado, un modal) lleva `data-lenis-prevent` para que la rueda la mueva a ella y no a la página.

Enlaces internos suaves, con o sin Lenis:

```js
const scrollToEl = (el, instant) => {
  if (lenis) lenis.scrollTo(el, { offset: -10, duration: instant ? 0 : 1.5, immediate: !!instant });
  else el.scrollIntoView({ behavior: RM || instant ? 'auto' : 'smooth' });
};
d.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  const el = hash.length > 1 && d.getElementById(hash.slice(1));
  if (!el) return;
  e.preventDefault();
  scrollToEl(el);
  history.replaceState(null, '', hash);   // la URL cambia sin brincar
});
```

Si la barra de navegación tapa el inicio de las secciones, usa como `offset` su altura en negativo. Si alguien entra con un `#ancla` en la URL, espera a que termine el preloader y llama `scrollToEl(el, true)`.

### Errores típicos

- Dejar `html{scroll-behavior:smooth}` en el CSS: el navegador y Lenis suavizan a la vez y el scroll da tirones.
- No conectar `lenis.on('scroll', ScrollTrigger.update)`: las animaciones se disparan tarde o se quedan atrás.
- Activar `autoRaf: true` y además `gsap.ticker.add`: dos relojes moviendo lo mismo.
- Olvidar `gsap.ticker.lagSmoothing(0)`: tras un cuadro pesado, Lenis y GSAP se desfasan.
- Poner `height:100%` y `overflow:hidden` en `html` o `body`, o meter la página en un contenedor con su propio scroll: Lenis y los `position: sticky` dejan de funcionar.
- No detener Lenis con el menú abierto: la página se mueve detrás del menú.

---

## 5. Reloj compartido y velocidad del scroll

**Cuándo usarlo:** para todo lo que se mueve sin parar (marquesinas con JS, carriles de video, historias, barras de progreso). Un solo `requestAnimationFrame` para todo gasta menos batería que diez.

```js
const tickers = new Set();
let lastT = performance.now();
const loop = (now) => {
  const dt = Math.min((now - lastT) / 1000, 0.1);  // segundos desde el cuadro anterior, con tope
  lastT = now;
  tickers.forEach((fn) => fn(dt, now));
  requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
```

Cada módulo se registra con `tickers.add((dt) => { ... })` y mueve las cosas por tiempo: `x -= velocidadEnPxPorSegundo * dt`. Así la velocidad es la misma en pantallas de 60 y de 120 Hz. El tope de 0.1 s evita que todo pegue un brinco al regresar a la pestaña.

Velocidad del scroll, para que marquesinas y carriles aceleren cuando la persona baja rápido y cambien de sentido cuando sube:

```js
const scrollBoost = (cap, k) => {
  const s = { boost: 0, dir: 1 };
  let last = window.scrollY;
  const on = (y, v) => {
    const vel = v !== undefined ? v : y - last;
    last = y;
    if (Math.abs(vel) > 0.5) s.dir = vel > 0 ? 1 : -1;
    s.boost = Math.min(Math.max(s.boost, Math.abs(vel) * k), cap);
  };
  if (lenis) lenis.on('scroll', (l) => on(l.scroll, l.velocity));
  else window.addEventListener('scroll', () => on(window.scrollY), { passive: true });
  return s;
};
// En cada cuadro: velocidad = base * (1 + s.boost / 8); después s.boost *= 0.9 para que se apague solo.
```

### Errores típicos

- Mover por cuadro (`x -= 1`): en un monitor de 120 Hz todo corre al doble.
- Un `requestAnimationFrame` por módulo.
- Seguir calculando lo que está fuera de pantalla. Cada módulo revisa si es visible con IntersectionObserver.

---

## 6. Preloader con la firma de la marca

**Cuándo usarlo:** en la landing avanzada, cuando hay fuentes o una foto de hero que conviene tapar mientras cargan. Es el escenario de la firma (0.3): presenta la marca como el intro de un video y deja todo listo para la entrada del hero. En páginas que se abren desde un QR usa la versión ligera de la sección 19.3, de unos 3 segundos. Si la ficha dice que nada debe tapar el contenido (marcas sobrias, páginas que viven de buscadores), no lleva preloader: la firma corre dentro de la entrada del hero (sección 7). Si el logo solo existe en PNG, anima el logo completo (escala y opacidad), no letra por letra.

**Qué se adapta a la marca:** la firma (qué pieza del logo se anima y cómo), la cortina de salida (dirección, forma y colores), la barra y el contador (son opcionales; la ilustración que avanza sobre la barra es parte de la firma de la landing de referencia, no de todas) y los tiempos.

**Qué no se toca:** el tope de espera, el salto con un toque, el respaldo por tiempo, la versión corta en la segunda visita, detener Lenis y quitar el nodo al terminar.

**En sitios con SEO (arquitectura SILO):** el preloader va solo en el inicio y solo en la primera visita, con tope de 1.2 s en celular. Pilares, servicios y artículos nunca lo llevan, porque la gente llega a ellas desde Google o desde un asistente y espera ver la respuesta. Mide el LCP con y sin preloader (`04-calidad-y-publicacion.md`, 1.8); si lo empeora, la firma pasa a la entrada del hero, sin capa encima.

HTML. La estructura sirve para cualquier firma; lo que cambia es lo que va dentro del SVG (6.1):

```html
<div class="preloader" aria-hidden="true">
  <div class="preloader__panel preloader__panel--a"></div>
  <div class="preloader__panel preloader__panel--b"></div>
  <div class="preloader__inner">
    <svg class="preloader__logo" viewBox="0 0 [ANCHO] [ALTO]" fill="currentColor">
      <!-- las piezas de la firma: letras, piezas del isotipo o trazos (6.1). Ejemplo con letras: -->
      <use href="#logo-1" class="pl-letter"/><use href="#logo-2" class="pl-letter"/><use href="#logo-3" class="pl-letter"/>
    </svg>
    <!-- opcionales: barra y contador -->
    <div class="preloader__bar"><span></span></div>
    <p class="preloader__meta"><span>[NOMBRE DE LA MARCA]</span><span><b class="js-count">0</b>%</span></p>
  </div>
</div>
```

CSS. Solo existe con `.js`; sin JavaScript no aparece. La animación `soltar` es el último respaldo: si `main.js` truena antes de arrancar (un error de sintaxis, una ruta mal escrita), a los 10 s el preloader se vuelve invisible y deja pasar los clics, aunque ningún JS lo quite:

```css
.preloader{display:none}
.js .preloader{display:flex;position:fixed;inset:0;z-index:1500;align-items:center;justify-content:center;color:#fff;
  animation:soltar 0s 10s forwards}
@keyframes soltar{to{visibility:hidden}}
.preloader__panel{position:absolute;inset:0}
.preloader__panel--a{background:var(--brand);z-index:2}     /* colores de la cortina: los de la ficha */
.preloader__panel--b{background:var(--ink);z-index:1}
.preloader__inner{position:relative;z-index:3;width:min(400px,68vw)}
.preloader__logo{width:100%;height:auto;overflow:hidden}          /* las letras salen de una ranura */
.pl-letter{transform-box:fill-box;transform-origin:50% 100%}
.preloader__bar{margin-top:40px;height:3px;background:rgba(255,255,255,.25);border-radius:3px;overflow:hidden}
.preloader__bar span{display:block;height:100%;background:#fff;transform-origin:left;transform:scaleX(0)}
.preloader__meta{display:flex;justify-content:space-between;margin-top:14px;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase}
.js-count{font-variant-numeric:tabular-nums;font-weight:inherit}
```

JS:

```js
function preloader(done, { firma, cortina }) {
  const pl = $('.preloader');
  let started = false;
  const start = () => {                       // lanza la entrada del hero una sola vez
    if (started) return;
    started = true;
    if (pl) pl.style.pointerEvents = 'none';
    done();
  };
  const cleanup = () => {
    if (pl) pl.remove();
    lenis && lenis.start();
    try { sessionStorage.setItem('pl-visto', '1'); } catch (e) { /* modo privado */ }
  };
  if (!pl) { start(); return; }

  let seen = null;
  try { seen = sessionStorage.getItem('pl-visto'); } catch (e) { /* sin almacenamiento */ }
  const count = $('.js-count', pl);
  const bar = $('.preloader__bar span', pl);
  const prog = { v: 0 };
  const HOLD = 1.7;                              // segundos que dura la carga si las fuentes llegan rápido
  lenis && lenis.stop();
  window.scrollTo(0, 0);

  const heroImg = $('[data-hero-img]') || $('.hero img');
  const ready = Promise.race([
    Promise.all([
      d.fonts ? d.fonts.ready : Promise.resolve(),
      heroImg && heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve(),
    ]),
    new Promise((r) => setTimeout(r, 2600)),   // tope: nunca esperar más de 2.6 s
  ]);

  const tl = gsap.timeline({ paused: true, onComplete: cleanup });
  const entrada = firma.in(pl);                  // la firma de la marca (6.1)
  tl.add(entrada, 0);
  if (count || bar) tl.to(prog, {                // barra y contador, solo si existen
    v: 100,
    duration: HOLD,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (count) count.textContent = Math.round(prog.v);
      if (bar) bar.style.transform = `scaleX(${prog.v / 100})`;
    },
  }, 0);
  tl.addLabel('salida', Math.max(entrada.duration() + 0.4, HOLD)); // el logo completo se lee antes de salir
  tl.add(firma.out(pl), 'salida');
  const extras = $$('.preloader__bar, .preloader__meta', pl);
  if (extras.length) tl.to(extras, { opacity: 0, y: -10, duration: 0.35 }, 'salida');
  tl.add(cortina(pl), 'salida+=0.2');
  tl.add(start, 'salida+=0.55');                 // el hero entra mientras sale la cortina
  if (seen) tl.timeScale(2);                     // visita repetida en la sesión: versión corta

  ready.then(() => tl.play());
  pl.addEventListener('click', () => tl.timeScale(4).play(), { once: true }); // un toque lo adelanta
  setTimeout(() => {                             // respaldo: pestaña oculta o animaciones congeladas
    if (pl.isConnected) { tl.kill(); cleanup(); start(); }
  }, 8000);
}

// Arranque, al final de main.js. La firma y la cortina son las de la ficha (6.1).
preloader(() => {
  safe(heroIntro);       // 7
  splitReveals();        // 8
  ScrollTrigger.refresh();
}, { firma: firmaLetras, cortina: cortinaSube });
window.addEventListener('load', () => ScrollTrigger.refresh());
```

### 6.1 Firmas y cortinas: ingredientes para armar la de cada marca

Cada firma es un par de funciones que devuelven una línea de tiempo: `in` (entra) y `out` (sale). Cada cortina es una función que devuelve la salida de los paneles. Estas son las piezas con las que se arma la firma que diseñaste en 0.3: combínalas, cambia las piezas del SVG y ajusta los tiempos. Ninguna es la firma de una marca por sí sola.

```js
// Letras que salen de una ranura (la de la landing de referencia). SVG: una pieza por letra con class="pl-letter".
const firmaLetras = {
  in: (root) => gsap.timeline()
    .from($$('.pl-letter', root), { yPercent: 120, rotate: 10, duration: 0.95, stagger: 0.07, ease: M.pop }),
  out: (root) => gsap.timeline()
    .to($$('.pl-letter', root), { yPercent: -120, duration: 0.55, stagger: 0.04, ease: 'power3.in' }),
};

// Trazo que se dibuja (monograma o firma de línea fina). SVG: class="firma-trazo" en las líneas
// y, opcional, class="firma-relleno" en lo que aparece al final.
const firmaTrazo = {
  in: (root) => {
    const lines = $$('.firma-trazo', root);
    lines.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
    const tl = gsap.timeline().to(lines, { strokeDashoffset: 0, duration: 1.4, stagger: 0.15, ease: 'power2.inOut' });
    const fill = $$('.firma-relleno', root);
    if (fill.length) tl.from(fill, { opacity: 0, duration: 0.6, ease: M.ease }, '-=0.3');
    return tl;
  },
  out: (root) => gsap.timeline().to($('svg', root), { opacity: 0, y: -8, duration: 0.5, ease: 'power2.in' }),
};

// Isotipo que se arma por piezas (hojas, gotas, puntas de una estrella). SVG: class="firma-pieza";
// el nombre, si va, con class="firma-nombre".
const firmaPiezas = {
  in: (root) => {
    const tl = gsap.timeline().from($$('.firma-pieza', root), {
      scale: 0,
      rotate: (i) => (i % 2 ? 18 : -18),
      transformOrigin: '50% 100%',   // de donde "nace" la pieza: la base de una hoja, el centro de una estrella
      duration: M.dur, stagger: 0.12, ease: M.pop,
    });
    const name = $$('.firma-nombre', root);
    if (name.length) tl.from(name, { opacity: 0, y: 12, duration: M.dur * 0.8, ease: M.ease }, '-=0.4');
    return tl;
  },
  out: (root) => gsap.timeline()
    .to($$('.firma-pieza, .firma-nombre', root), { opacity: 0, scale: 0.92, duration: 0.4, stagger: 0.04, ease: 'power2.in' }),
};

// Cortinas de salida. Los paneles van en el orden del HTML: primero sale el de encima.
const cortinaSube = (root) => gsap.timeline()           // dos paneles que suben (landing de referencia)
  .to($('.preloader__panel--a', root), { yPercent: -100, duration: 0.9, ease: M.easeIO })
  .to($('.preloader__panel--b', root), { yPercent: -100, duration: 0.9, ease: M.easeIO }, 0.12);

const cortinaFunde = (root) => gsap.timeline()          // fundido sereno: marcas sobrias o lujosas
  .to($$('.preloader__panel', root), { autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'power1.inOut' });

const cortinaCirculo = (root) => gsap.timeline()        // se recoge hacia el centro, donde estaba el isotipo
  .fromTo($$('.preloader__panel', root),
    { clipPath: 'circle(75% at 50% 50%)' },
    { clipPath: 'circle(0% at 50% 50%)', duration: 1, stagger: 0.1, ease: M.easeIO });

const cortinaDiagonal = (root) => gsap.timeline()       // barrido en diagonal: marcas enérgicas
  .fromTo($$('.preloader__panel', root),
    { clipPath: 'polygon(0% 0%, 200% 0%, 0% 200%)' },
    { clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%)', duration: 0.9, stagger: 0.12, ease: M.easeIO });
```

CSS de la firma de trazo (GSAP calcula solo el origen de las piezas de un SVG):

```css
.firma-trazo{fill:none;stroke:currentColor;stroke-width:[GROSOR DEL TRAZO DEL LOGO];stroke-linecap:round;stroke-linejoin:round}
```

Notas:
- Las líneas de `firmaTrazo` deben ser `<path>`, `<line>`, `<polyline>`, `<circle>` o `<rect>` escritos dentro del SVG; `getTotalLength()` no funciona en `<use>`. Si el trazo del logo es un relleno (una pincelada con grosor variable), no se dibuja: se descubre con `clipPath` de `inset(0 100% 0 0)` a `inset(0 0% 0 0)`.
- Para mezclar dos firmas (el isotipo se arma y después las letras salen de su ranura), une las dos entradas en una sola línea de tiempo: `in: (root) => gsap.timeline().add(firmaPiezas.in(root)).add(firmaLetras.in(root), '-=0.3')`, y haz lo mismo con las salidas.
- Si no hay preloader, la misma firma corre dentro de la entrada del hero (sección 7): `.add(firmaTrazo.in($('.hero__firma')), 0)`.
- La entrada del hero puede continuar el gesto de la cortina: si la cortina se recoge hacia el centro, que la foto del hero crezca desde el centro.

- Si la firma incluye una ilustración o un ícono de la marca que avanza sobre la barra (en la landing de referencia, el personaje en patín), muévelo con `transform` y no con `left`: mide el ancho una vez (`const tw = track.clientWidth`), crea `const setX = gsap.quickSetter(rider, 'x', 'px')`, pon `gsap.set(rider, { xPercent: -50 })` y en el `onUpdate` de la barra llama `setX(tw * prog.v / 100)`.

### Errores típicos

- Usar la firma de otra marca (las letras con rebote de la landing de referencia) en lugar de la que salió de la ficha.
- Una firma que nunca se queda quieta: el logo no alcanza a leerse completo antes de salir.
- Preloader sin tope de tiempo: con internet lento la persona ve el logo diez segundos y se va.
- Durar lo mismo en cada visita. La versión corta con `sessionStorage` evita que se vuelva molesto.
- Esconderlo o mostrarlo con CSS sin `.js`: si GSAP no carga, la página queda tapada para siempre.
- No quitar el nodo al terminar: queda una capa invisible que bloquea los clics.
- Olvidar `lenis.stop()`: la persona baja por debajo del preloader y la entrada del hero ocurre fuera de pantalla.
- Animar con `left` o `width` en cada cuadro. Usa `transform`.
- Intentar letra por letra con un logo en PNG.

---

## 7. Entrada del hero

**Cuándo usarla:** siempre en el nivel avanzado. Los primeros dos segundos definen la percepción de calidad. Las piezas entran encimadas en el tiempo, no una tras otra: así se siente como una pieza editada y no como bloques que aparecen por turnos.

**Qué se adapta a la marca:** qué piezas entran, en qué orden y con qué gesto (es la fila del hero en la coreografía, 0.5); las curvas, tiempos y recorridos, que salen de `M`; si el titular sube desde una ranura o entra con un fundido; y si la firma vive aquí porque no hay preloader. El hero de un despacho sobrio puede ser solo el titular en fundido y la foto bajando de escala; el de un estudio enérgico lleva todas estas piezas y un sello de la marca que gira.

**Qué no se toca:** el estado oculto bajo `.js`, el `gsap.set` que toma el control, el video que arranca después y el rescate por tiempo cuando no hay preloader.

HTML del titular con máscara. El contenedor recorta y la línea sube desde abajo:

```html
<h1 class="hero__title">
  <span class="hero__line"><span class="hero__line-in">[PRIMERA LÍNEA]</span></span>
  <span class="hero__line"><span class="hero__line-in">[SEGUNDA LÍNEA]</span></span>
</h1>
```

```css
.hero{min-height:100svh}                                   /* svh, no vh: en celular no brinca */
.hero__line{display:block;overflow:hidden;padding:.02em .04em .06em 0}
.hero__line-in{display:block}
.js .hero__line-in{transform:translateY(112%);animation:lineaRescate 0s 12s forwards} /* oculto desde el primer pintado, solo con JS */
@keyframes lineaRescate{to{transform:none}}                /* respaldo si main.js truena: a los 12 s el titular aparece */
@media (prefers-reduced-motion:reduce){ .js .hero__line-in{transform:none} }
```

El rescate a los 12 s no estorba cuando todo funciona: para entonces GSAP ya dejó las líneas en su lugar, que es el mismo estado que pone la animación.

Aire en la máscara: el `padding` de arriba alcanza para letras sin colita. Con cursivas o con letras como g, j, p o y, la máscara muerde la colita y la inclinación. Dale aire sin mover el texto, con padding y margen negativo del mismo tamaño, y sube el recorrido inicial para que la línea siga bien escondida antes de entrar:

```css
.hero__line{padding:.15em .12em .15em 0;margin:-.15em -.12em -.15em 0}
.js .hero__line-in{transform:translateY(130%)}   /* y en el JS: gsap.set('.hero__line-in', { yPercent: 130, y: 0 }) */
```

Los adornos dibujados bajo una palabra del titular (un subrayado, un trazo de la marca) no van dentro de `.hero__line`: la máscara los cortaría. Van fuera, en un SVG con `position:absolute` sobre el contenedor del titular, igual que en los títulos de sección (8).

JS:

```js
gsap.set('.hero__line-in', { yPercent: 112, y: 0 });   // GSAP toma el control del estado que puso el CSS

function heroIntro() {
  gsap.timeline({ defaults: { ease: M.ease } })
    .to('.hero__line-in', { yPercent: 0, duration: M.dur * 1.3, stagger: M.stagger * 1.3 }, 0)
    .from('[data-hero-img]', { yPercent: 22, scale: 1.12, duration: M.dur * 1.45 }, 0)
    .from('.hero__meta > *', { y: M.dist * 0.75, opacity: 0, duration: M.dur, stagger: M.stagger }, 0.2)
    .from('.hero__badge', { scale: 0, duration: M.dur * 1.3, ease: M.pop }, 0.35)   // un sello o forma de la marca
    .from('.hero__actions > *', { y: M.dist * 0.75, opacity: 0, duration: M.dur, stagger: M.stagger }, 0.45)
    .from('.nav__inner', { y: -40, opacity: 0, duration: M.dur }, 0.3)
    .add(startHeroVideo, 0.6);   // el video de fondo arranca después, nunca al cargar
}
```

Borra las líneas de piezas que la página no tenga y agrega las que pida la coreografía. Los números al final (0, 0.2, 0.35...) son el momento en que empieza cada pieza dentro de la línea de tiempo; que se encimen es lo que da el acabado. Con los tokens de la landing de referencia (`M.dur` 1.1, `M.stagger` 0.09, `M.dist` 40) esta línea de tiempo da casi los mismos tiempos que la landing de referencia; con los de otra marca, cambia de carácter sin tocar nada más.

Si la ficha dice que el titular entra con un fundido y no desde una ranura (marcas sobrias), quita la máscara y usa la variante sin preloader de abajo con el titular marcado como `data-hero-in`. Si la firma vive en el hero, agrégala al inicio: `.add(firmaTrazo.in($('.hero__firma')), 0)` (sección 6.1).

**La firma termina en esta portada.** Haya o no preloader, la última pieza de la línea de tiempo deja la portada completa: titular, imagen protagonista y botón principal en su lugar. Si el gesto de la marca conecta con la acción (un trazo que llega al botón, una forma que se abre y lo deja ver), agrégalo al final, para que el último movimiento lleve la vista al botón: con el trazo de 9.3, `const camino = trazarCamino();` en la primera línea de `heroIntro()` y `.add(dibujarCamino(camino), '-=0.3')` al final de la línea de tiempo. La misma función que arma esta línea de tiempo es la que usa la hoja de muestra (0.9).

**Sin preloader:** esconde lo del primer pantallazo desde el CSS y anímalo con `autoAlpha`, que maneja opacidad y visibilidad a la vez. La animación de rescate muestra todo a los 4 s aunque el JS falle a medio camino:

```css
.js [data-hero-in]{visibility:hidden;animation:rescate 0s 4s forwards}
@keyframes rescate{to{visibility:visible}}
@media (prefers-reduced-motion:reduce){ .js [data-hero-in]{visibility:visible} }
```

```js
// heroIntro sin preloader: el .fromTo reemplaza a los .from() de las piezas chicas
function heroIntro() {
  gsap.timeline({ defaults: { ease: M.ease } })
    .fromTo('[data-hero-in]', { autoAlpha: 0, y: M.dist * 0.75 },
      { autoAlpha: 1, y: 0, duration: M.dur, stagger: M.stagger }, 0.2)
    .from('[data-hero-img]', { scale: 1.12, duration: M.dur * 1.45 }, 0)   // borra lo que la página no tenga
    .add(startHeroVideo, 0.6);
}
// arranca cuando estén las fuentes, con tope de tiempo
Promise.race([d.fonts ? d.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
  .then(() => { safe(heroIntro); splitReveals(); ScrollTrigger.refresh(); });
```

### Errores típicos

- Animar las piezas una después de otra en fila. Encímalas.
- Esconder el titular solo desde el JS: se ve un destello del texto antes de que desaparezca.
- Esconder en CSS con porcentaje y no avisarle a GSAP. Sin `gsap.set(..., { yPercent: 112, y: 0 })`, GSAP lee ese desplazamiento como píxeles y la línea termina corrida o pega un brinco.
- Arrancar un video pesado al cargar la página. Va a los 0.6 s y solo si se permite reproducir solo (sección 11).
- Usar `100vh` para la altura: en celular la barra del navegador la cambia y todo brinca.
- Poner `data-reveal` en elementos del hero: se animan debajo del preloader y nadie los ve entrar.

---

## 8. Títulos con SplitText por líneas, palabras o letras

**Cuándo usarlo:** en los `h2` de sección. Es el efecto editorial más reconocible de los sitios premium: el texto parece salir de una ranura.
- `lines` (por defecto): títulos de dos o más líneas. Divide por líneas reales según el ancho de pantalla, así no hay cortes raros en celular.
- `words`: frases cortas de una línea o una palabra destacada.
- `chars`: solo palabras sueltas o muy cortas, tipo logotipo. Nunca en párrafos.

**Qué se adapta a la marca:** el modo (por líneas en casi todas; por letras solo en la palabra clave de una marca enérgica), la curva, la duración y el escalonado (de `M`), y si el texto sube desde una ranura o solo aparece. Si la ficha dice que los títulos no suben desde una ranura (marca sobria o lujosa), cambia `yPercent: cfg[0]` por `opacity: 0, y: M.dist * 0.75` y quita `mask`.

**Qué no se toca:** dividir después de las fuentes, `autoSplit` con la animación devuelta en `onSplit` y que sin SplitText los títulos se queden visibles.

HTML:

```html
<h2 class="h2" data-split>[TÍTULO DE LA SECCIÓN]</h2>
<h2 class="h2" data-split="words">[FRASE CORTA]</h2>
<p class="big-word" data-split="chars">[PALABRA]</p>
```

JS:

```js
const splitReveals = () => safe(() => {
  if (!window.SplitText) { $$('[data-split]').forEach(colocarTrazo); return; } // sin SplitText, títulos visibles
  $$('[data-split]').forEach((el) => {
    const mode = ['words', 'chars'].includes(el.dataset.split) ? el.dataset.split : 'lines';
    // [recorrido en %, factor de la duración base, factor del escalonado base]
    // 130 y 125 % porque la máscara tiene aire (abajo): con menos, la pieza se asoma antes de entrar
    const cfg = { lines: [130, 1, 1], words: [125, 0.9, 0.45], chars: [125, 0.8, 0.22] }[mode];
    SplitText.create(el, {
      type: mode === 'chars' ? 'words, chars' : mode,  // con letras, también palabras: así no se parten
      mask: mode,                                      // cada pieza dentro de una máscara
      linesClass: 'linea', wordsClass: 'palabra', charsClass: 'letra', // sus máscaras: linea-mask, palabra-mask, letra-mask
      autoSplit: true,                                 // vuelve a dividir al cambiar ancho o fuente
      onSplit: (self) => {
        colocarTrazo(el);                              // adorno bajo la palabra clave, si lo hay (abajo)
        return gsap.from(self[mode], {                 // devolver la animación es obligatorio con autoSplit
          yPercent: cfg[0],
          duration: M.dur * cfg[1],
          stagger: M.stagger * cfg[2],
          ease: M.ease,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  });
});
```

Se llama después del preloader (o después de `document.fonts.ready` si no hay preloader), porque el corte de líneas cambia cuando entra la fuente real. SplitText (desde la 3.13) ya pone `aria-label` en el título y esconde las piezas a los lectores de pantalla: no hace falta nada extra.

**Aire en la máscara.** La máscara recorta justo al alto de la línea, así que muerde las colitas (g, j, p, y) y la inclinación de las cursivas. SplitText le pone a cada máscara la clase de su pieza más `-mask` (`linea` queda `linea-mask`). Dales aire con padding y margen negativo del mismo tamaño: la máscara crece y el texto no se mueve.

```css
.linea-mask,.palabra-mask{padding:.15em .12em .15em 0;margin:-.15em -.12em -.15em 0}
```

Usa nombres de clase de una sola palabra, sin guiones: SplitText le agrega `-mask` a cada palabra de la clase, y con `mi-linea` la máscara quedaría `mi-mask-linea-mask`.

**Adornos bajo una palabra.** Un subrayado o un trazo de la marca bajo la palabra clave no va dentro del título que se divide: la máscara lo cortaría y SplitText lo trataría como texto. Marca la palabra con un `<span class="clave">` (SplitText conserva los `span` de adentro) y pon el trazo como hermano del título:

```html
<div class="titulo-trazo">
  <h2 class="h2" data-split>[TEXTO DEL TÍTULO] <span class="clave">[PALABRA CLAVE]</span></h2>
  <svg class="trazo trazo--bajo" data-draw viewBox="0 0 [ANCHO] [ALTO]" aria-hidden="true" focusable="false"><path d="[TRAZO DE LA MARCA]"/></svg>
</div>
```

```css
.titulo-trazo{position:relative}
.trazo--bajo{position:absolute;left:0;top:0;width:0;height:auto;pointer-events:none}
```

```js
// Coloca el trazo bajo la palabra clave con su posición real. Corre en cada onSplit (también al girar
// el celular), antes de crear la animación, cuando las líneas todavía están en su lugar.
const colocarTrazo = (titulo) => {
  const caja = titulo.parentElement;
  // SplitText puede dejar copias vacías del span al cortar líneas: se toma la que tiene ancho
  const clave = $$('.clave', titulo).filter((e) => e.getBoundingClientRect().width > 0).pop();
  const trazo = caja && $('.trazo--bajo', caja);
  if (!clave || !trazo) return;
  const c = caja.getBoundingClientRect();
  const r = clave.getBoundingClientRect();
  Object.assign(trazo.style, { left: `${r.left - c.left}px`, top: `${r.bottom - c.top}px`, width: `${r.width}px` });
};
```

La palabra clave debe quedar en un solo renglón (una o dos palabras cortas); si se parte en dos líneas, el trazo mide las dos juntas. El dibujo del trazo es el de 9.2.

### Errores típicos

- Dividir antes de que cargue la fuente: las líneas quedan mal cortadas.
- Con `autoSplit: true`, no devolver la animación dentro de `onSplit`: al girar el celular el texto se queda oculto o se duplica la animación.
- Dividir por letras un párrafo: cientos de nodos, lento y difícil para lectores de pantalla.
- Usar `data-split` en el titular del hero sin preloader: el texto parpadea. En el hero usa la máscara de la sección 7.
- Interlineado muy cerrado en títulos divididos: las letras con colita (g, p, y) se cortan en la máscara. Usa 1.02 o más en los `h2` y dale aire a la máscara (arriba); con cursivas, revisa el título a media animación.
- Meter un subrayado o un trazo dentro del título que se divide: queda cortado o se divide como texto.

---

## 9. Revelado al hacer scroll, ilustraciones y trazos de la marca

**Cuándo usarlo:** etiquetas, párrafos, botones, tarjetas y listas de todo el sitio. Con un atributo en el HTML todo se revela igual, y `ScrollTrigger.batch` agrupa lo que entra a la vez para que aparezca en cascada.

**Qué se adapta a la marca:** recorrido, duración, curva y escalonado, que salen de `M`. Una marca sobria apenas se desplaza (16 px) y entra rápido; una enérgica recorre más y puede entrar con un giro leve (`rotate: 2`). Las variantes 9.1 y 9.2 existen solo si la marca tiene ilustraciones o trazos propios.

**Qué no se toca:** los estados ocultos con `gsap.set` (solo si GSAP cargó), `once: true` y `batch`.

```html
<p class="lead" data-reveal>[TEXTO]</p>
<a class="btn" href="#contacto" data-reveal>[VERBO DEL BOTÓN PRINCIPAL]</a>
```

```js
// estados iniciales: solo existen si GSAP cargó
gsap.set('[data-reveal]', { y: M.dist, opacity: 0 });

safe(() => {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: M.dur, ease: M.ease, stagger: M.stagger, overwrite: true }),
  });
});
```

`start: 'top 90%'` significa: cuando el borde de arriba del elemento llega al 90 % de la altura de la pantalla.

### 9.1 Ilustraciones o piezas de la marca que brincan y luego flotan

**Qué se adapta a la marca:** este código es la versión de la landing de referencia, juguetona y con personaje: escala desde 0.45, giro al azar y rebote elástico. En una marca cálida, entra desde `scale: 0.85` sin giro y con `ease: M.pop`, y flota en 9 s. En una sobria no se usa. Lo que brinca debe ser de la marca (su personaje, sus stickers, su isotipo), nunca un adorno genérico.

```html
<img class="ilus" data-pop src="img/[ILUSTRACION].webp" alt="" width="700" height="620" loading="lazy">
```

```css
.ilus{pointer-events:none;user-select:none}
.ilus.is-floating{animation:ilusFloat 6s ease-in-out infinite}
/* translate y rotate individuales: no pisan el transform que escribe GSAP */
@keyframes ilusFloat{0%,100%{translate:0 0;rotate:0deg}50%{translate:0 -12px;rotate:-1.5deg}}
```

```js
gsap.set('[data-pop]', { scale: 0.45, rotate: () => gsap.utils.random(-16, 16), y: 60, opacity: 0 });
safe(() => {
  $$('[data-pop]').forEach((img) => {
    gsap.to(img, {
      scale: 1, rotate: 0, y: 0, opacity: 1,
      duration: 1.5,
      ease: 'elastic.out(1,.55)',
      scrollTrigger: { trigger: img, start: 'top 94%', once: true },
      onComplete: () => img.classList.add('is-floating'),
    });
  });
});
```

En una marca juguetona, el giro al azar hace que cada pieza se sienta distinta y no una copia de la anterior.

### 9.2 Trazos y formas de la marca que se dibujan

**Cuándo usarlo:** cuando la identidad trae trazos propios (un subrayado, una onda, una flecha, el contorno de su isotipo, íconos de línea) o líneas finas de retícula. Se dibujan como si alguien los trazara: bajo la palabra clave de un título al entrar, o a lo largo de una sección conforme bajas. No necesita ningún plugin.

**Qué se adapta a la marca:** el trazo (sale de su identidad, no de un banco de formas), el grosor y el color (tokens), la curva y la duración (de `M`) y si se dibuja una vez o con el scroll.

```html
<svg class="trazo" data-draw viewBox="0 0 [ANCHO] [ALTO]" aria-hidden="true" focusable="false">
  <path d="[TRAZO TOMADO DE LA IDENTIDAD]"/>
</svg>
<!-- data-draw-scrub para que avance con el scroll, por ejemplo una línea larga entre secciones -->
```

```css
.trazo{display:block;width:100%;height:auto;overflow:visible}
.trazo :is(path,line,polyline,circle,ellipse,rect){fill:none;stroke:var(--brand);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
```

```js
safe(() => {
  $$('[data-draw]').forEach((svg) => {
    const lines = $$('path, line, polyline, circle, ellipse, rect', svg);
    lines.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
    const scrub = svg.hasAttribute('data-draw-scrub');
    gsap.to(lines, {
      strokeDashoffset: 0,
      duration: M.dur * 1.4,
      stagger: M.stagger,
      ease: scrub ? 'none' : M.ease,
      scrollTrigger: scrub
        ? { trigger: svg, start: 'top 85%', end: 'bottom 40%', scrub: true }
        : { trigger: svg, start: 'top 88%', once: true },
    });
  });
});
```

`getTotalLength()` mide cada línea y con ese largo se esconde y se dibuja. Como el `gsap.set` solo corre si GSAP cargó y va después de `if (RM) return`, sin JavaScript o con menos movimiento el trazo se ve completo. La versión sin librerías está en 19.8.

Si el trazo de la marca es un relleno (una pincelada con grosor variable), no tiene línea que dibujar: descúbrelo con `gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: M.dur, ease: M.ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })`.

### 9.3 Un trazo de la marca que lleva hasta el botón principal

**Cuándo usarlo:** cuando la marca tiene un trazo propio (un tallo, un hilo, una costura, una línea de su logo) que puede terminar en la acción principal. Es la forma más clara de cumplir la regla 6 de 0.3: el último gesto de la firma lleva la vista al botón. Como la portada cambia entre celular y escritorio, el camino se calcula con las posiciones reales y se recalcula si cambia el ancho.

**Qué se adapta a la marca:** de dónde sale (la imagen protagonista, el logo, el titular), cómo curva (una S suave, un ángulo recto, un zigzag de costura), su grosor y color (tokens) y si remata con una pieza de la marca junto al botón.

**Qué no se toca:** el SVG detrás del botón y sin recibir clics, medir antes de que la entrada mueva las piezas, recalcular sin repetir la animación y que, con menos movimiento o sin GSAP, el camino se vea completo y quieto.

```html
<section class="hero">
  <svg class="camino" aria-hidden="true" focusable="false"><path/></svg>
  <!-- titular; la imagen protagonista lleva data-camino-desde y el botón principal data-camino-hasta -->
</section>
```

```css
.hero{position:relative}
.camino{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0}
.camino path{fill:none;stroke:var(--brand);stroke-width:[GROSOR DEL TRAZO DE LA MARCA];stroke-linecap:round}
[data-camino-hasta]{position:relative;z-index:1}   /* el botón queda encima del trazo */
```

```js
// Dibuja el camino con las posiciones reales: del pie de la imagen protagonista a la parte de arriba del botón.
const trazarCamino = () => {
  const svg = $('.hero .camino');
  const desde = $('[data-camino-desde]');
  const hasta = $('[data-camino-hasta]');
  if (!svg || !desde || !hasta) return null;
  const h = svg.getBoundingClientRect();
  const a = desde.getBoundingClientRect();
  const b = hasta.getBoundingClientRect();
  const x1 = a.left + a.width * 0.5 - h.left, y1 = a.bottom - h.top;
  const x2 = b.left + b.width * 0.5 - h.left, y2 = b.top - h.top;
  const ym = (y1 + y2) / 2;
  svg.setAttribute('viewBox', `0 0 ${h.width} ${h.height}`);
  const path = $('path', svg);
  path.setAttribute('d', `M${x1},${y1} C${x1},${ym} ${x2},${ym} ${x2},${y2}`);  // una S suave: cámbiala por el gesto de la marca
  return path;
};

// Lo dibuja como si alguien lo trazara. Se agrega al final de la entrada del hero (sección 7).
const dibujarCamino = (path) => {
  if (!path) return gsap.timeline();
  const L = path.getTotalLength();
  return gsap.timeline().fromTo(path, { strokeDasharray: L, strokeDashoffset: L },
    { strokeDashoffset: 0, duration: M.dur * 1.4, ease: M.ease });
};

// En la parte que corre siempre (3.4, punto 3): lo deja completo y lo recalcula si cambia el ancho.
safe(trazarCamino);
let anchoCamino = window.innerWidth;
let rCamino;
window.addEventListener('resize', () => {
  if (window.innerWidth === anchoCamino) return;   // en celular la barra del navegador cambia solo el alto
  anchoCamino = window.innerWidth;
  clearTimeout(rCamino);
  rCamino = setTimeout(() => safe(() => {
    const path = trazarCamino();
    if (path && hasGSAP) gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0 });
  }), 200);
});
```

En `heroIntro()` (sección 7), mide primero y anima al final: `const camino = trazarCamino();` va en la primera línea, antes de crear los `.from()` (que mueven la imagen y el botón a su posición de salida), y `.add(dibujarCamino(camino), '-=0.3')` va al final de la línea de tiempo. Si mides después, el camino apunta a donde estaban las piezas al empezar y no a donde terminan.

### Errores típicos

- Poner `data-reveal` en un elemento que tiene `transition: transform` en el CSS (por ejemplo, una tarjeta con efecto hover): GSAP y la transición se pelean y el movimiento da saltos. Envuelve la tarjeta en un `<div data-reveal>` o quita `transform` de su transición.
- Esconder `[data-reveal]` en el CSS sin `.js`.
- Olvidar `once: true`: los elementos parpadean cada vez que la persona sube y baja.
- Crear un ScrollTrigger por elemento con cientos de elementos. Usa `batch`.
- Usar el mismo escalonado en un lote grande: al saltar con el menú o recargar a media página, decenas de elementos entran en fila y tardan varios segundos. En `onEnter`, limita la cascada total: `stagger: Math.min(M.stagger, 0.6 / lote.length)`, y lo que ya quedó arriba de la pantalla muéstralo al instante con `gsap.set`.
- Dibujar un trazo con punta redonda (`stroke-linecap: round`) usando `strokeDasharray: L` y `strokeDashoffset: L`: queda un puntito visible antes de que empiece. Usa `strokeDasharray: L + ' ' + (L + grosor)` y `strokeDashoffset: L + grosor`.
- Animar la ilustración con `transform` en el CSS mientras GSAP también la mueve. El flotado va con `translate` y `rotate` sueltos.
- Usar el brinco elástico con giro de 9.1 en una marca que no es juguetona.
- Dibujar trazos que la marca no tiene, o meter el SVG como `<img>`: así no se puede animar por dentro.
- Usar `vector-effect: non-scaling-stroke` en un trazo que se dibuja: el largo medido puede dejar de coincidir con el dibujado y el trazo termina antes o se ve cortado.

---

## 10. Marquesina infinita

**Cuándo usarla:** para dar ritmo y repetir palabras secundarias (servicios, temas, "Agenda tu sesión"). Rompe la verticalidad de la página. No la uses para la promesa principal: nadie lee texto que se mueve. Empieza por la versión CSS; la versión con JS es el extra del nivel avanzado.

**Qué se adapta a la marca:** si existe (en una marca sobria o lujosa casi nunca), su velocidad (lenta en una marca cálida, rápida en una enérgica), el separador (el isotipo o una forma de la marca en SVG con `aria-hidden`, no un punto genérico), la tipografía y si se inclina al acelerar con el scroll (solo marcas enérgicas).

**Qué no se toca:** dos grupos idénticos, el segundo con `aria-hidden`, recorrer exactamente la mitad y no mover lo que está fuera de pantalla.

### 10.1 Versión CSS (ligera)

```html
<div class="marquee">
  <div class="marquee__track">
    <div class="marquee__group">
      <span>[SERVICIO 1]</span><i class="marquee__sep" aria-hidden="true"></i>
      <span>[SERVICIO 2]</span><i class="marquee__sep" aria-hidden="true"></i>
      <span>[SERVICIO 3]</span><i class="marquee__sep" aria-hidden="true"></i>
    </div>
    <div class="marquee__group" aria-hidden="true">
      <!-- copia idéntica del primer grupo -->
    </div>
  </div>
</div>
```

```css
.marquee{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.marquee__track{display:flex;width:max-content;animation:marquee 30s linear infinite}
.marquee__group{display:flex;align-items:center;flex:none;gap:.5em;padding-right:.5em}
.marquee__sep{width:.25em;height:.25em;border-radius:50%;background:currentColor;flex:none}
@keyframes marquee{to{transform:translateX(-50%)}}
@media (hover:hover){ .marquee:hover .marquee__track{animation-play-state:paused} }
@media (prefers-reduced-motion:reduce){ .marquee__track{animation:none} }
```

El truco: dos grupos idénticos y la pista se recorre exactamente la mitad. Por eso el espacio va como `padding-right` dentro de cada grupo y no como `gap` en la pista; con `gap` la mitad no cuadra y se ve un salto en cada vuelta.

### 10.2 Versión con JS: acelera con el scroll (avanzada)

Misma estructura, sin la animación CSS, con `data-marquee` en la pista:

```html
<div class="marquee__track" data-marquee data-speed="90"> ...dos grupos... </div>
<!-- data-reverse en otra pista para que corra al revés -->
```

```css
[data-marquee]{display:flex;width:max-content;will-change:transform}
```

```js
safe(() => {
  const tracks = $$('[data-marquee]').map((track) => ({
    track,
    speed: +track.dataset.speed || 90,                    // px por segundo
    rev: track.hasAttribute('data-reverse') ? -1 : 1,
    x: 0, w: 0, visible: true,
  }));
  if (!tracks.length || RM) return;
  const measure = () => tracks.forEach((m) => { m.w = m.track.firstElementChild.getBoundingClientRect().width; });
  measure();
  window.addEventListener('resize', measure);
  d.fonts && d.fonts.ready.then(measure);                 // el ancho cambia cuando entra la fuente real
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ens) => ens.forEach((en) => {
      const m = tracks.find((t) => t.track === en.target);
      if (m) m.visible = en.isIntersecting;
    }), { rootMargin: '100px' });
    tracks.forEach((m) => io.observe(m.track));
  }
  const s = scrollBoost(60, 0.9);                         // sección 5
  const SKEW = 0.18;                                      // inclinación al acelerar; 0 si la marca no debe inclinarse
  tickers.add((dt) => {
    s.boost *= 0.9;                                       // la aceleración se apaga sola
    tracks.forEach((m) => {
      if (!m.visible || !m.w) return;
      m.x -= m.speed * (1 + s.boost / 8) * dt * m.rev * s.dir;
      if (m.x <= -m.w) m.x += m.w;
      if (m.x > 0) m.x -= m.w;
      const skew = (-s.boost * SKEW * s.dir).toFixed(2);  // se inclina al acelerar
      m.track.style.transform = `translate3d(${m.x.toFixed(2)}px,0,0) skewX(${skew}deg)`;
    });
  });
  if (hasGSAP) gsap.from('[data-marquee] span', {        // entrada: cada palabra sube
    yPercent: 100, opacity: 0, duration: M.dur, stagger: M.stagger * 0.5, ease: M.ease,
    scrollTrigger: { trigger: '[data-marquee]', start: 'top 92%', once: true },
  });
});
```

Este bloque no depende de GSAP (usa el reloj de la sección 5): colócalo antes de `if (!hasGSAP) return`, como indica el orden de la sección 3.4.

### Errores típicos

- Grupos más angostos que la pantalla: aparece un hueco. Repite los elementos dentro de cada grupo hasta que un grupo sea más ancho que la pantalla más grande.
- Segundo grupo sin `aria-hidden="true"`: el lector de pantalla lee todo dos veces.
- Medir el ancho antes de que cargue la fuente: la vuelta pega un salto. Mide otra vez con `document.fonts.ready` y al cambiar el tamaño.
- Usar un símbolo que la fuente no trae (✺, ✦) como separador: sale en otra fuente o como cuadro. Usa un círculo con CSS o un SVG.
- Pausar con `:hover` sin `@media (hover:hover)`: en celular se queda pausada después de tocarla.
- Mover con `left` o `margin-left`, o seguir moviendo lo que está fuera de pantalla.

---

## 11. Videos que solo corren en pantalla y carril de videos

### 11.1 Cualquier video decorativo: carga y reproducción solo en pantalla

**Cuándo usarlo:** en todo video que se reproduce solo (fondo del hero, clips de trabajos, historias). Ningún video descarga nada al abrir la página; solo corren los dos o tres que se ven. Así un muro de 30 clips es viable en celular.

Especificación de cada clip: 4 a 5 segundos, sin audio, MP4 H.264, 720 px de ancho, alrededor de medio MB (nunca más de 1.5 MB) y una portada WebP de unos 10 KB.

Esta parte es técnica y se aplica igual en cualquier marca. Lo que cambia por marca es el tratamiento visual del video (a color, en blanco y negro, en duotono con el color de marca) y eso se decide en la dirección de arte.

```html
<video muted playsinline loop preload="none"
       data-poster="video/[CLIP].webp" data-src="video/[CLIP].mp4"
       aria-label="[QUÉ SE VE EN EL CLIP]"></video>
```

```js
const canAutoplay = !RM && !SAVE_DATA;
const setPoster = (v) => { if (v.dataset.poster) { v.poster = v.dataset.poster; delete v.dataset.poster; } };
const loadVideo = (v) => {
  setPoster(v);
  if (v.dataset.src && !v.dataset.loaded) { v.src = v.dataset.src; v.dataset.loaded = '1'; }
};
const playVideo = (v) => {
  if (!v || !canAutoplay) return;
  loadVideo(v);
  const p = v.play();
  if (p && p.catch) p.catch(() => {});        // algunos navegadores lo bloquean: se queda la portada
};
const watchVideo = (v) => {
  if (!('IntersectionObserver' in window)) { setPoster(v); playVideo(v); return; }
  new IntersectionObserver(([en], io) => {      // portada: cuando falta poco para verse
    if (en.isIntersecting) { setPoster(v); io.disconnect(); }
  }, { rootMargin: '800px 0px' }).observe(v);
  new IntersectionObserver(([en]) => {          // reproducción: solo mientras se ve
    if (en.isIntersecting) playVideo(v); else v.pause();
  }, { rootMargin: '0px 200px', threshold: 0.05 }).observe(v);
};
safe(() => $$('video[data-src]:not([data-hero-video])').forEach(watchVideo));

// Video de fondo del hero: lo arranca la entrada del hero (sección 7)
const startHeroVideo = () => { const v = $('[data-hero-video]'); if (v) watchVideo(v); };
```

Esto va antes de `if (!hasGSAP) return`: los videos funcionan aunque GSAP no cargue. Con menos movimiento o con ahorro de datos solo se ve la portada. Si un video es contenido (una entrevista, un testimonio en video), no es decorativo: ponle `controls` y `src` normal con `preload="none"`, o usa la fachada de YouTube de la sección 19.7.

### 11.2 Carril de videos tipo banda transportadora (avanzado)

**Cuándo usarlo:** para mostrar muchos momentos reales del trabajo sin un solo botón de play: prueba social en movimiento. Dos filas que corren en sentidos opuestos. Si la persona no tiene video, el mismo patrón funciona con fotos de trabajos.

**Qué se adapta a la marca:** la velocidad de cada fila (`data-speed`), el radio de las esquinas (el de los tokens de forma), cuánto crece el clip al pasar el mouse, la entrada del muro y si la sección es protagonista (intensidad 3) o un fondo tranquilo. En una marca pausada, filas lentas (20 a 30 px/s) y sin aceleración por scroll.

**Qué no se toca:** clones con `aria-hidden`, frenar solo con mouse, videos que corren solo en pantalla y la versión que se recorre con el dedo cuando hay menos movimiento.

```html
<div class="vwall">
  <div class="vrow" data-vrow data-speed="46">
    <figure class="vclip" style="--ar:720/390">
      <div class="vclip__media"><video muted playsinline loop preload="none" data-poster="video/[CLIP].webp" data-src="video/[CLIP].mp4" aria-label="[QUÉ SE VE]"></video></div>
      <figcaption><b>[LUGAR O CLIENTE]</b><span>[DETALLE]</span></figcaption>
    </figure>
    <!-- de 6 a 10 clips por fila -->
  </div>
  <div class="vrow vrow--b" data-vrow data-speed="38" data-reverse> ... </div>
</div>
```

```css
.vwall{display:flex;flex-direction:column;gap:clamp(18px,2.2vw,30px);
  mask-image:linear-gradient(90deg,transparent 0,#000 5%,#000 95%,transparent 100%)}
.vrow{--h:clamp(230px,22vw,360px);position:relative;display:flex;gap:16px;height:calc(var(--h) + 42px);overflow:hidden}
.vrow--b{--h:clamp(190px,17vw,280px)}
.vrow.is-live{display:block}
.vrow.is-live .vclip{position:absolute;left:0;top:0}
.vclip{flex:none;margin:0;will-change:transform}
.vclip__media{height:var(--h);aspect-ratio:var(--ar);border-radius:20px;overflow:hidden;background:#161616;
  transition:transform .7s var(--ease),border-radius .7s var(--ease)}
.vclip video{width:100%;height:100%;object-fit:cover}
.vclip:hover .vclip__media{transform:scale(1.035);border-radius:28px}  /* el hover va en el hijo, no en .vclip */
.vclip figcaption{display:flex;gap:8px;margin-top:12px;font-size:.84rem;white-space:nowrap}
@media (max-width:699px){ .vrow{--h:230px} .vrow--b{--h:190px} }
```

```js
safe(() => {
  const rows = $$('[data-vrow]');
  if (!rows.length) return;
  $$('[data-vrow] video').forEach(watchVideo);      // portadas y reproducción (11.1); los clones se vigilan al crearlos
  if (RM) { rows.forEach((r) => { r.style.overflowX = 'auto'; }); return; } // se recorre con el dedo
  const state = rows.map((row) => ({
    row,
    speed: +row.dataset.speed || 40,
    dir: row.hasAttribute('data-reverse') ? -1 : 1,
    off: 0, tiles: [], xs: [], ws: [], W: 0, hover: false, visible: true, cloned: false,
  }));
  const measure = (st, gap) => {
    st.tiles = $$('.vclip', st.row);
    st.ws = st.tiles.map((t) => t.getBoundingClientRect().width);
    st.W = st.ws.reduce((a, w) => a + w + gap, 0);
  };
  const layout = (st) => {
    st.row.classList.remove('is-live');
    $$('.vclip', st.row).forEach((t) => { t.style.transform = ''; });
    const gap = parseFloat(getComputedStyle(st.row).columnGap) || 16;
    measure(st, gap);
    if (!st.cloned) {                              // si no llenan la pantalla, se clona la fila
      const base = st.tiles.slice();
      for (let n = 0; n < 3 && st.W < window.innerWidth + Math.max(...st.ws) + 80; n++) {
        base.forEach((t) => {
          const c = t.cloneNode(true);
          c.setAttribute('aria-hidden', 'true');
          st.row.appendChild(c);
          const v = $('video', c);
          if (v) watchVideo(v);
        });
        measure(st, gap);
      }
      st.cloned = true;
    }
    let x = 0;
    st.xs = st.ws.map((w) => { const p = x; x += w + gap; return p; });
    st.row.classList.add('is-live');
  };
  const relayout = () => state.forEach(layout);
  relayout();
  let rT;
  window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(relayout, 200); });
  d.fonts && d.fonts.ready.then(relayout);
  state.forEach((st) => {
    st.row.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') st.hover = true; });
    st.row.addEventListener('pointerleave', () => { st.hover = false; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { st.visible = en.isIntersecting; }, { rootMargin: '200px' }).observe(st.row);
    }
  });
  const s = scrollBoost(50, 1);
  tickers.add((dt) => {
    s.boost *= 0.92;
    const mobile = window.innerWidth < 700 ? 1.9 : 1;  // en celular más rápido, si no, no se nota
    state.forEach((st) => {
      if (!st.visible || !st.W) return;
      const sp = st.speed * mobile * (st.hover ? 0.3 : 1) * (1 + s.boost / 9);
      st.off -= sp * dt * st.dir * s.dir;
      for (let i = 0; i < st.tiles.length; i++) {
        const w = st.ws[i];
        const x = (((st.xs[i] + st.off + w) % st.W) + st.W) % st.W - w;  // el que sale por un lado entra por el otro
        st.tiles[i].style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      }
    });
  });
});
```

Este bloque tampoco depende de GSAP: va antes de `if (!hasGSAP) return` y antes de `if (RM) return`, para que con menos movimiento la fila se convierta en una tira que se recorre con el dedo y muestre sus portadas. Si usas este carril, quita `[data-vrow] video` del `watchVideo` general de 11.1 (por ejemplo con `video[data-src]:not([data-hero-video]):not([data-vrow] video)`) para no vigilar dos veces el mismo video.

### Errores típicos

- Botón de play, punto de grabación o textos encima de los clips. Se pidió quitarlos en la landing de referencia: los clips pasan solos y el lugar va debajo.
- Clips largos, con audio o pesados, o todos reproduciéndose a la vez.
- Frenar con el mouse sin filtrar `e.pointerType === 'mouse'`: en celular el toque dispara `pointerenter`, `pointerleave` no siempre llega y la fila se queda lenta para siempre.
- No clonar: en pantallas anchas aparece un hueco.
- Clones sin `aria-hidden`.
- Poner el hover con `transform` en `.vclip`, que es el que se mueve cada cuadro. El hover va en `.vclip__media`.
- Misma velocidad en celular que en escritorio: en pantalla chica casi no se nota el movimiento.

---

## 12. Contadores

**Cuándo usarlos:** en la prueba más fuerte del sitio (clientes atendidos, años, proyectos, alcance), siempre con cifras reales que dio la persona y con fuente y fecha a la vista. Solo vale animar números con recorrido (326, 17.5, 1,026,218); contar de 0 a 1 se ve raro.

**Qué se adapta a la marca:** la duración y la curva del conteo (2.4 s con `power3.out` en la landing de referencia; 1.6 s con `power2.out` en una marca sobria) y si las cifras son protagonistas o un dato discreto. Que existan depende de que haya cifras reales, no de la marca.

**Qué no se toca:** la cifra final escrita en el HTML, `tabular-nums` y la fuente con fecha.

```html
<!-- Los números de este ejemplo solo muestran el formato. Cada cifra real la da la persona, con su fuente y fecha. -->
<p class="stat">
  <span class="stat__num"><span data-count="1026218" data-format="int">1,026,218</span></span>
  <span class="stat__label">[QUÉ MIDE]</span>
</p>
<p class="stat"><span class="stat__num"><span data-count="17.5" data-decimals="1">17.5</span> M</span></p>
<p class="fineprint">Cifras de [FUENTE], [MES Y AÑO].</p>
```

```css
.stat__num{font-variant-numeric:tabular-nums}   /* el ancho no tiembla mientras cuenta */
```

```js
safe(() => {
  $$('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    if (isNaN(end)) return;
    const dec = +el.dataset.decimals || 0;
    const fmt = (v) => (el.dataset.format === 'int' ? Math.round(v).toLocaleString(document.documentElement.lang || 'es') : v.toFixed(dec));
    const o = { v: 0 };
    el.textContent = fmt(0);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 2.4, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(o.v); } }),
    });
  });
});
```

La cifra final ya está escrita en el HTML: la ven Google, quien no tiene JavaScript y quien pidió menos movimiento. Los prefijos y sufijos (+, M, %, años) van fuera del `<span data-count>`. La versión sin librerías está en la sección 19.4.

### Errores típicos

- Escribir `0` en el HTML y dejar que el JS ponga la cifra: si el JS falla, la prueba más fuerte del sitio dice 0.
- Poner `data-count="[CIFRA]"` con un marcador: no es número. Si la cifra no está confirmada, deja el marcador visible como texto y sin `data-count`.
- Cifras sin fuente ni fecha, o inventadas para rellenar.
- Olvidar `tabular-nums`: el renglón baila mientras cuenta.

---

## 13. Botón magnético, solo con mouse

**Cuándo usarlo:** en uno o dos botones principales (el del hero y el del formulario). El botón se acerca al puntero como si tuviera resorte. Solo existe con mouse fino y sin menos movimiento.

**Qué se adapta a la marca:** si existe (sí en marcas enérgicas o juguetonas; en una cálida, apenas perceptible; en una sobria o lujosa, nunca), la fuerza (0.22 y 0.32 en la landing de referencia; 0.1 para algo sutil) y el resorte (`elastic.out` en la de referencia; `power3.out` sin rebote en una marca cálida). El texto que rueda (abajo) sirve en casi cualquier marca y toma `--t-hover` y `--ease`; el ícono del botón puede ser una pieza de la marca que gira o se balancea.

**Qué no se toca:** solo con `FINE` y sin `RM`, `quickTo` en lugar de un tween por movimiento, y nada de `transition: transform` en el mismo botón.

```html
<a class="btn btn--primary" href="#contacto" data-magnetic>
  <span class="roll" data-text="[VERBO DEL BOTÓN]">[VERBO DEL BOTÓN]</span>
</a>
```

```js
if (FINE && !RM) safe(() => {
  $$('[data-magnetic]').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.8, ease: 'elastic.out(1,.4)' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.8, ease: 'elastic.out(1,.4)' });
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.22);
      yTo((e.clientY - r.top - r.height / 2) * 0.32);
    });
    btn.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
});
```

`quickTo` crea la animación una vez y solo le pasa el valor nuevo en cada movimiento del mouse. Con el mismo patrón se hace la inclinación 3D de una tarjeta (`data-tilt`): `gsap.set(el, { transformPerspective: 1000 })` y dos `quickTo` sobre `rotationX` y `rotationY` (hasta 8 grados en tarjetas, 18 en una pieza protagonista como un celular dibujado).

Complemento en CSS, sin JS: el texto que rueda al pasar el mouse.

```css
.roll{position:relative;display:inline-block;overflow:hidden;vertical-align:top;line-height:1.3}
.roll::after{content:attr(data-text);position:absolute;left:0;top:100%;width:100%}
.roll,.roll::after{transition:transform var(--t-hover) var(--ease)}
a:hover .roll,button:hover .roll,a:focus-visible .roll{transform:translateY(-100%)}
```

### 13.1 Estados del botón principal sin perder contraste

El botón principal usa su propio token, `--cta`, con el color que la persona eligió para la acción (no siempre es `--brand`). Cada estado conserva el contraste AA: 4.5 a 1 entre la letra y el fondo del botón (cómo medirlo: sección 1.5 de `04-calidad-y-publicacion.md`).

Cómo se decide, en este orden:
1. **Letra:** blanca si contrasta con `--cta`. Si no, la letra va con el color oscuro de la marca (`--ink`). Si tampoco alcanza, se oscurece `--cta` lo justo para que una de las dos pase, y se anota por validar.
2. **Hover:** normalmente se oscurece un poco. Si oscurecer baja el contraste con la letra (pasa cuando la letra es oscura), se aclara.
3. **Presionado:** si cambiar el color rompe el contraste, se resuelve con escala o forma: el botón se hunde un poco o cambia su radio, sin cambiar de color.
4. **Foco con teclado:** un contorno visible con un color que contraste con el fondo de la página.

```css
:root{
  --cta: [COLOR DE LA ACCIÓN];          /* el que la persona eligió para botones */
  --cta-ink: [BLANCO O --ink];          /* la letra que sí contrasta con --cta */
  --cta-hover: [UN POCO MÁS OSCURO, O MÁS CLARO SI LA LETRA ES OSCURA];
}
.btn--primary{background:var(--cta);color:var(--cta-ink);
  transition:background-color var(--t-hover) var(--ease),scale .15s var(--ease)}
@media (hover:hover){ .btn--primary:hover{background:var(--cta-hover)} }
.btn--primary:active{scale:.97}                                          /* se hunde sin cambiar de color */
.btn--primary:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
```

`scale` va como propiedad suelta y no dentro de `transform`, para no pelear con el botón magnético (13), que escribe `transform` desde GSAP.

### Errores típicos

- Crear un `gsap.to` en cada `pointermove`: satura el navegador. Usa `quickTo`.
- Activarlo en celular: no hay puntero que seguir y el botón se queda corrido después del toque.
- Darle `transition: transform` en CSS al mismo botón: pelea con GSAP.
- Factores mayores a 0.4: el botón se aleja del clic.
- Ponerlo en todos los botones: pierde el efecto y distrae.

---

## 14. Acordeón de preguntas frecuentes accesible

**Cuándo usarlo:** en la sección de preguntas frecuentes, con objeciones reales que dio la persona (qué incluye, tiempos, precios, cómo se aparta). Funciona con teclado y lector de pantalla y anima la altura real sin medir nada con JS.

**Qué se adapta a la marca:** el ícono (un + que se vuelve -, o una pieza de la marca que gira o se abre), los colores y el radio de las tarjetas, que salen de los tokens. La mecánica es técnica: no se toca.

**SEO:** envuelve la lista en `<section data-faq>`. Las respuestas quedan en el HTML aunque estén cerradas, y `construir-sitio.mjs` lee cada `.qa__q` con su `.qa__a` (o cada `<details>`) para generar los datos estructurados de preguntas frecuentes. En artículos largos, `<details>` con `<summary>` es la opción más simple: se abre sin JavaScript.

```html
<section data-faq>
<h2>Preguntas frecuentes</h2>
<div class="faq__list">
  <div class="qa">
    <h3>
      <button class="qa__q" type="button" aria-expanded="false">
        [PREGUNTA REAL]
        <span class="qa__icon" aria-hidden="true"></span>
      </button>
    </h3>
    <div class="qa__a"><div><p>[RESPUESTA]</p></div></div>
  </div>
</div>
</section>
```

```css
.qa{border-radius:20px;background:#fff;border:1px solid var(--line);transition:border-color .3s,box-shadow .4s}
.qa.is-open{border-color:var(--brand)}
.qa h3{font-size:inherit;font-weight:inherit}
.qa__q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 24px;text-align:left;font-weight:600;
  background:none;border:0;color:inherit;font-family:inherit;font-size:inherit;cursor:pointer}   /* quita el estilo gris del botón */
.qa__icon{position:relative;width:34px;height:34px;border-radius:50%;background:var(--bg);flex:none;transition:background-color .3s,transform .5s var(--ease)}
.qa__icon::before,.qa__icon::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2px;margin:-1px 0 0 -6px;background:currentColor;border-radius:2px;transition:transform .5s var(--ease)}
.qa__icon::after{transform:rotate(90deg)}
.qa.is-open .qa__icon{background:var(--brand);color:#fff;transform:rotate(180deg)}
.qa.is-open .qa__icon::after{transform:rotate(0deg)}                 /* el + se vuelve - */
/* Sin JS las respuestas quedan abiertas: el estado cerrado solo existe bajo .js */
.qa__a{display:grid;grid-template-rows:1fr}
.js .qa__a{grid-template-rows:0fr}
.js .qa.is-open .qa__a{grid-template-rows:1fr}
/* La transición se enciende hasta que el JS terminó de cerrar (clase qa-listo en <html>) */
.qa-listo .qa__a{transition:grid-template-rows .55s var(--ease)}
.qa__a > div{overflow:hidden}
.qa__a p{padding:0 24px 24px}
```

```js
safe(() => {
  const items = $$('.qa');
  items.forEach((qa, n) => {
    const b = $('.qa__q', qa);
    const a = $('.qa__a', qa);
    a.id = `qa-${n + 1}`;
    a.setAttribute('role', 'region');
    b.setAttribute('aria-controls', a.id);
    a.inert = true;                                   // cerrada: fuera del tabulador y del lector
    b.addEventListener('click', () => {
      const open = !qa.classList.contains('is-open');
      items.forEach((o) => {                          // una abierta a la vez
        if (o === qa || !o.classList.contains('is-open')) return;
        o.classList.remove('is-open');
        $('.qa__q', o).setAttribute('aria-expanded', 'false');
        $('.qa__a', o).inert = true;
      });
      qa.classList.toggle('is-open', open);
      b.setAttribute('aria-expanded', String(open));
      a.inert = !open;
      if (hasGSAP) setTimeout(() => ScrollTrigger.refresh(), 650); // cuando termina la transición
    });
  });
  const first = items[0];                             // la primera abierta
  if (first) {
    first.classList.add('is-open');
    $('.qa__q', first).setAttribute('aria-expanded', 'true');
    $('.qa__a', first).inert = false;
  }
});
```

Va antes de `if (!hasGSAP) return` y antes de `if (RM) return`. El `setTimeout` de 650 ms coincide con la transición de 0.55 s; si cambias una, cambia la otra. En el nivel ligero también sirve `<details>` y `<summary>`: funciona sin JS, aunque abre sin animación.

### Errores típicos

- Cerrar las preguntas al cargar con la transición encendida: ScrollTrigger mide la página más alta de lo que queda y lo de abajo (contacto, botón) se queda invisible al llegar desde el menú. Al final del módulo: `requestAnimationFrame(() => { document.documentElement.classList.add('qa-listo'); window.ScrollTrigger && ScrollTrigger.refresh(); });`
- Dejar `grid-template-rows: 0fr` fuera de `.js`: sin JavaScript las respuestas no se ven.

- Un `<div>` con clic en lugar de un `<button>`: no funciona con teclado.
- Animar la altura con `max-height: 1000px`: el tiempo se siente mal y corta respuestas largas.
- No llamar `ScrollTrigger.refresh()`: como la página cambió de altura, las animaciones de más abajo se disparan en el lugar equivocado.
- Dejar los enlaces de respuestas cerradas alcanzables con Tab. Para eso es `inert`.
- Preguntas inventadas. Salen de lo que de verdad le preguntan a la persona.

---

## 15. Barra fija en celular

**Cuándo usarla:** en sitios de servicios con un botón principal. En celular el contacto queda a un pulgar de distancia, que es donde se cierra la mayoría de las solicitudes. Aparece cuando los botones principales ya quedaron arriba y se esconde cuando el formulario o el cierre está en pantalla, para no duplicar ni tapar.

```html
<a href="#contacto" class="btn btn--primary" data-cta-start>[VERBO DEL BOTÓN]</a>  <!-- botón del hero -->
...
<div class="mobile-cta" aria-hidden="true">
  <a href="#contacto" class="btn btn--primary" tabindex="-1">[VERBO DEL BOTÓN]</a>
  <a href="https://wa.me/[NÚMERO CON LADA]?text=[MENSAJE CODIFICADO]" class="mobile-cta__wa"
     target="_blank" rel="noopener" aria-label="WhatsApp" tabindex="-1"><!-- ícono --></a>
</div>
```

```css
.mobile-cta{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:1000;
  display:none;gap:8px;transform:translateY(160%);transition:transform .6s var(--ease)}
.mobile-cta.is-visible{transform:none}
.mobile-cta .btn{flex:1}
.mobile-cta__wa{width:54px;height:54px;border-radius:14px;background:#25D366;color:#fff;display:grid;place-items:center;flex:none}
@media (max-width:900px){
  .mobile-cta{display:flex}
  .footer{padding-bottom:90px}    /* que la barra no tape lo último del sitio */
}
```

`env(safe-area-inset-bottom)` solo funciona con `viewport-fit=cover` en la meta viewport (sección 3.1); sin eso, la barra de inicio del iPhone tapa los botones.

```js
safe(() => {
  const bar = $('.mobile-cta');
  const startEl = $('[data-cta-start]') || $('.hero');
  const endEl = $('#contacto');
  if (!bar || !startEl || !('IntersectionObserver' in window)) return;
  let past = false;
  let atEnd = false;
  const update = () => {
    const on = past && !atEnd;
    bar.classList.toggle('is-visible', on);
    bar.setAttribute('aria-hidden', String(!on));
    $$('a, button', bar).forEach((el) => { el.tabIndex = on ? 0 : -1; });  // escondida: el teclado no cae ahí
  };
  new IntersectionObserver(([e]) => {
    past = !e.isIntersecting && e.boundingClientRect.top < 0;   // ya quedó arriba, no abajo
    update();
  }).observe(startEl);
  if (endEl) new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; update(); }, { threshold: 0.15 }).observe(endEl);
  update();
});
```

Con IntersectionObserver no hace falta escuchar el scroll ni medir en cada cuadro.

**Sin formulario** (la persona solo quiere WhatsApp): el botón principal de la barra abre WhatsApp directo, con `target="_blank" rel="noopener"`, y la barra se esconde al llegar a la sección de contacto, que es `#contacto` en el código de arriba. Cada botón lleva su propio mensaje prellenado, codificado con `encodeURIComponent`, para que la persona sepa desde dónde le escriben: el de la barra, el de la portada y el de cada servicio, que incluye el nombre del servicio. Por ejemplo, `https://wa.me/[NÚMERO CON LADA]?text=` seguido de `encodeURIComponent('Hola, vi tu página y quiero información de [SERVICIO]')`. Escribe el enlace ya codificado en el HTML, para que funcione aunque el JS falle.

### Errores típicos

- Mostrarla desde el inicio: duplica el botón del hero.
- No esconderla en el formulario: tapa los campos y el botón de enviar.
- Olvidar `viewport-fit=cover` o `env(safe-area-inset-bottom)`.
- Dejar sus enlaces con `tabindex` normal mientras está escondida.
- Mostrarla en escritorio.
- No dejar espacio al final del footer: tapa los últimos enlaces.

---

## 16. Efectos pegados al scroll y tarjetas apiladas solo en escritorio

**Cuándo usarlos:** para el gesto protagonista de una sección. Con `scrub` la animación no tiene duración propia: sigue al scroll. Siempre con `ease: 'none'`. `scrub: true` va pegado al dedo; `scrub: 1` agrega un segundo de suavizado, útil en piezas grandes como el logo del footer.

**Qué se adapta a la marca:** cuál de estos efectos es el protagonista de cada sección (lo dice la coreografía, 0.5), la forma de la apertura (un `inset` con el radio de la marca, un círculo, la silueta de su isotipo), la dirección del parallax y cuánto se desplaza (poco en marcas sobrias, más en enérgicas) y qué pieza se arma en el footer (el logo letra por letra, el isotipo que se dibuja). Los ejemplos de abajo son los de la landing de referencia.

**Qué no se toca:** `ease: 'none'` con `scrub`, nada de pins largos ni scroll horizontal anclado, y las tarjetas apiladas solo en escritorio.

```js
safe(() => {
  // Parallax del hero: capas a distinta velocidad dan profundidad sin 3D real
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('.hero__line:nth-child(1)', { xPercent: -16, ease: 'none' }, 0)
    .to('.hero__line:nth-child(2)', { xPercent: 12, ease: 'none' }, 0)
    .to('[data-hero-img]', { yPercent: 12, ease: 'none' }, 0)
    .to('.hero__meta, .hero__actions', { opacity: 0, y: -50, ease: 'none' }, 0);

  // Banner que se abre como cortina, con la imagen interior en parallax
  gsap.fromTo('.banner', { clipPath: 'inset(10% 8% 10% 8% round 36px)' }, {
    clipPath: 'inset(0% 0% 0% 0% round 36px)', ease: 'none',
    scrollTrigger: { trigger: '.banner', start: 'top 92%', end: 'top 35%', scrub: true },
  });
  gsap.fromTo('.banner img', { yPercent: -7 }, {             // la imagen mide 116 % de alto: nunca se ven bordes
    yPercent: 7, ease: 'none',
    scrollTrigger: { trigger: '.banner', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  // Línea que se dibuja en el proceso (CSS: span con transform-origin:left y transform:scaleX(0))
  gsap.to('.steps__line span', { scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 70%', scrub: true } });

  // Logo del footer que se arma letra por letra
  gsap.from('.footer__logo .fl', { yPercent: 110, rotation: 6, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer__logo', start: 'top 98%', end: 'bottom bottom', scrub: 1 } });
});
```

CSS del banner: `.banner{position:relative;overflow:hidden}` y `.banner img{position:absolute;inset:-8% 0;width:100%;height:116%;object-fit:cover}`.

Tarjetas apiladas, solo arriba de 900 px. En celular el CSS les quita el sticky y el scroll es normal:

```css
.fcard{position:sticky;top:calc(var(--nav-h, 84px) + 16px + var(--i, 0) * 14px);transform-origin:50% 0}
.fcard::after{content:"";position:absolute;inset:0;border-radius:inherit;background:#000;opacity:var(--dim, 0);pointer-events:none}
@media (max-width:900px){ .fcard{position:relative;top:auto} }
.formats{overflow-x:clip}   /* clip y no hidden: hidden rompe position:sticky */
```

```js
safe(() => {
  const cards = $$('.fcard');
  cards.forEach((c, i) => c.style.setProperty('--i', i));
  gsap.matchMedia().add('(min-width: 901px)', () => {
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.9 + i * 0.015, '--dim': 0.38, ease: 'none',  // la de atrás se encoge y se oscurece
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
      });
    });
  });
});
```

`gsap.matchMedia` crea los efectos solo en escritorio y los deshace solo si la ventana se achica.

### Errores típicos

- Usar `expo.out` u otra curva con `scrub`: el movimiento deja de coincidir con el dedo.
- Fijar (pin) secciones largas o hacer scroll horizontal anclado. En la landing de referencia se sintió como scroll trabado y se rehízo como cuadrícula. Prohibido en celular; en escritorio, solo efectos cortos.
- `overflow: hidden` en una sección con sticky adentro: el sticky deja de pegarse. Usa `overflow-x: clip`.
- Parallax con una imagen del mismo alto que su marco: al moverse se ven los bordes.

---

## 17. Menos movimiento: prefers-reduced-motion

Hay personas a las que el movimiento les provoca mareo o distracción y lo desactivan en su sistema. Respetarlo es accesibilidad real.

| Con "Reducir movimiento" activado | Qué pasa |
|---|---|
| Lenis | No se crea; scroll nativo |
| Preloader o intro | Se quita al instante (o se desvanece en 0.35 s en la versión ligera) |
| Titular del hero y revelados | Visibles desde el inicio |
| Firma, trazos y formas de la marca | Completos y quietos: el logo se ve entero desde el inicio |
| Marquesinas | Quietas |
| Carriles de video | Se recorren con el dedo (`overflow-x: auto`) |
| Videos | No se reproducen solos; se ve la portada |
| Contadores | Se queda la cifra escrita en el HTML |
| Cursor, magnéticos, inclinación, parallax con mouse | No existen |
| Menú, preguntas, formulario, barra fija, enlaces | Funcionan igual |
| Hoja de muestra (`direccion-de-arte.html`) | Nada se reproduce solo; "Ver de nuevo" muestra una versión con fundidos y sin desplazamientos, con un aviso de que la animación completa se ve sin ese ajuste (0.9) |

JS: la bandera `RM` (sección 3.2) decide, y `if (RM) return` va después de montar todo lo funcional y antes de crear cualquier animación de scroll. Esta tabla es igual para todas las marcas: con menos movimiento la identidad sigue ahí (logo, colores, formas), solo se apaga el movimiento.

CSS global, al final de la hoja de estilos:

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important;transition-delay:0s!important;scroll-behavior:auto!important}
  .js .hero__line-in{transform:none}
  .marquee__track{animation:none}
}
```

Cómo probarlo: en Mac, Ajustes del Sistema, Accesibilidad, Pantalla, Reducir movimiento. En Chrome, Herramientas para desarrolladores, panel Rendering (Renderización), opción "Emulate CSS media feature prefers-reduced-motion". Recarga la página después de cambiarlo: la bandera se lee al cargar.

### Errores típicos

- Solo apagar las transiciones CSS y dejar Lenis, los bucles y el autoplay.
- Salir del JS antes de montar menú, acordeón y formulario.
- Esconder algo bajo `.js` sin su versión visible con menos movimiento.

---

## 18. Reglas de rendimiento

1. **Anima solo `transform` y `opacity`.** `clip-path` y `filter` solo en piezas puntuales. Nunca `width`, `height`, `top`, `left` ni `margin` en algo que se mueve en cada cuadro. Excepción consciente: el acordeón anima `grid-template-rows` una vez por clic.
2. **CSS y GSAP se reparten las propiedades.** GSAP escribe `transform`; el CSS de ese mismo elemento usa `translate`, `rotate` y `scale` sueltos. Si los dos escriben `transform`, uno borra al otro. Por eso el sello gira por CSS mientras GSAP lo mueve con el mouse.
3. **`will-change` con mesura.** Solo en lo que se mueve sin parar: pistas de marquesina, clips del carril y, si acaso, el botón magnético principal. Nunca `*{will-change:transform}` ni en decenas de elementos: cada uno se vuelve una capa en la tarjeta gráfica y en celular se acaba la memoria. No lo pongas en lo que se anima una sola vez.
4. **Nada de pins largos ni scroll horizontal anclado en celular.** Usa `gsap.matchMedia` para limitar efectos de escritorio (sección 16).
5. **`ScrollTrigger.refresh()` cada vez que cambie la altura de la página:** al terminar el preloader (después de dividir títulos), en `window` `load`, al terminar la transición del acordeón y después de insertar contenido. Las imágenes con `width` y `height` reservan su espacio y no mueven nada al cargar; si alguna no los tiene, refresca al cargarla y agrupa las llamadas:

   ```js
   let rf;
   const refreshSoon = () => { clearTimeout(rf); rf = setTimeout(() => ScrollTrigger.refresh(), 150); };
   $$('img').forEach((img) => { if (!img.complete) img.addEventListener('load', refreshSoon, { once: true }); });
   ```

   La solución de fondo es que todas las imágenes lleven `width` y `height`. `refresh()` cuesta, no lo llames en cada scroll.
6. **`ScrollTrigger.config({ ignoreMobileResize: true })`** para que la barra del navegador del celular, que aparece y desaparece, no recalcule todo.
7. **Mide después de `document.fonts.ready`:** anchos de marquesinas, corte de líneas, posición de la línea del proceso.
8. **`quickTo` para todo lo que sigue al mouse.** Un `gsap.to` por movimiento satura el navegador.
9. **Un solo `requestAnimationFrame`, movimiento por tiempo (`dt`) y nada de trabajo fuera de pantalla.** IntersectionObserver para pausar, y en cualquier `setInterval` revisa `document.hidden`.
10. **Escuchas de scroll con `{ passive: true }`** y sin leer medidas del DOM en cada evento. Para saber si algo se ve, IntersectionObserver.
11. **Videos y medios:** `preload="none"`, reproducción solo en pantalla, portadas diferidas, clips cortos y ligeros (sección 11). Solo la foto del hero se precarga con `fetchpriority="high"`; todo lo demás lleva `loading="lazy"`.
12. **Sin scroll lateral:** `html{overflow-x:hidden}` y `body{overflow-x:clip}`. Los contenedores con sticky usan `overflow-x: clip`.
13. **Evita animar** `filter: blur()` sobre áreas grandes, `box-shadow`, y `backdrop-filter` en elementos que se mueven. Son caros en celular.

---

## 19. Versión sin librerías para sitios ligeros

Para tarjetas de contacto, páginas de gracias, guías y agendas cortas. Logra el 80 % del acabado con unas líneas y cero dependencias: el navegador ya trae IntersectionObserver, transiciones CSS y Web Animations API (`element.animate`). Usa la misma guardia `no-js`/`js` de la sección 3.1.

Ligero no quiere decir genérico: la ficha de movimiento (0.7) manda igual. Las curvas, duraciones y recorridos salen de los tokens CSS de la sección 3.3 (`--ease`, `--ease-io`, `--ease-pop`, `--dur`, `--dist`), y el JS los lee de ahí para que el CSS y las animaciones con `element.animate` se muevan igual. La firma de la marca vive en la intro (19.3).

```js
(() => {
  const html = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = getComputedStyle(html);
  const EASE = css.getPropertyValue('--ease').trim() || 'ease-out';         // las curvas de la ficha
  const EASE_IO = css.getPropertyValue('--ease-io').trim() || 'ease-in-out';
  // Si un bloque truena, se quita la clase js y todo queda visible y quieto
  const safe = (fn) => { try { fn(); } catch (e) { console.warn('[sitio]', e); html.classList.remove('js'); } };
  // Las funciones de 19.2 a 19.8 van aquí y se llaman al final, cada una dentro de safe:
  // safe(intro); safe(drawLengths); safe(reveals); safe(counters); ...
})();
```

### 19.1 Equivalencias

| Nivel avanzado | Nivel ligero |
|---|---|
| Preloader con GSAP (6) | Intro con Web Animations API (19.3) |
| `ScrollTrigger.batch` (9) | IntersectionObserver con clases (19.2) |
| SplitText por líneas (8) | Líneas escritas a mano con máscara (19.5) |
| Firmas de 6.1 | La misma idea con `element.animate` (19.3) |
| Trazos que se dibujan (9.2) | Trazos con transición CSS (19.8) |
| Contador con GSAP (12) | Contador con `requestAnimationFrame` (19.4) |
| Marquesina con JS (10.2) | Marquesina CSS (10.1) |
| Lenis | Scroll nativo; `html{scroll-behavior:smooth}` para las anclas |
| Botón magnético y parallax | Se omiten; el texto que rueda (13) es CSS puro |

### 19.2 Revelado con IntersectionObserver

```css
.js [data-reveal]{opacity:0;translate:0 var(--dist)}
.js [data-reveal].is-in{opacity:1;translate:0 0;transition:opacity var(--dur) var(--ease),translate calc(var(--dur) * 1.1) var(--ease)}
```

```js
function reveals() {
  const items = $$('[data-reveal], [data-reveal-lines], [data-draw]');
  if (!('IntersectionObserver' in window) || reduce) { items.forEach((i) => i.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e, i) => {
      e.target.style.transitionDelay = `${i * 80}ms`;   // los que entran juntos, en cascada
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
  items.forEach((i) => io.observe(i));
}
```

Se usa la propiedad `translate` y no `transform` para no chocar con los hovers que sí usan `transform`.

### 19.3 Intro con la firma de la marca, se salta con un toque y tiene respaldo

**Qué se adapta a la marca:** la firma (aquí, las letras que salen de una ranura de la tarjeta de contacto de referencia), el mensaje corto, los colores y la dirección de los paneles, y los tiempos. Las otras firmas de 6.1 se traducen igual a `element.animate`; por ejemplo, un trazo que se dibuja:

```js
const L = path.getTotalLength();
path.style.strokeDasharray = `${L}px`;
path.animate([{ strokeDashoffset: `${L}px` }, { strokeDashoffset: '0px' }],
  { duration: 1400, easing: EASE_IO, fill: 'forwards' });
```

**Qué no se toca:** el bloqueo del scroll mientras dura, el salto con un toque, el respaldo por tiempo, `close()` que se puede llamar varias veces y la versión que solo se desvanece con menos movimiento.

```html
<div class="intro" aria-hidden="true">
  <div class="intro__panel intro__panel--a"></div>
  <div class="intro__panel intro__panel--b"></div>
  <div class="intro__inner">
    <svg class="intro__logo" viewBox="0 0 [ANCHO] [ALTO]" fill="currentColor">
      <use href="#logo-1" class="il"/><use href="#logo-2" class="il"/><use href="#logo-3" class="il"/>
    </svg>
    <p class="intro__msg"><span>[MENSAJE CORTO, POR EJEMPLO "CONECTEMOS"]</span></p>
  </div>
</div>
```

```css
.intro{display:none}
.js .intro{display:flex;position:fixed;inset:0;z-index:1500;align-items:center;justify-content:center;color:#fff;cursor:pointer;
  animation:soltar 0s 6s forwards}             /* último respaldo si el JS truena: a los 6 s deja de tapar (sección 6) */
@keyframes soltar{to{visibility:hidden}}
.intro__panel{position:absolute;inset:0}
.intro__panel--a{background:var(--brand);z-index:2}
.intro__panel--b{background:var(--ink);z-index:1}
.intro__inner{position:relative;z-index:3;width:min(420px,66vw);display:flex;flex-direction:column;align-items:center}
.intro__logo{width:100%;height:auto;overflow:hidden}
.intro__logo .il{transform:translateY(105%)}
.intro__msg{overflow:hidden;margin-top:26px;font-size:.9rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
.intro__msg span{display:block;transform:translateY(110%)}
body.is-locked{overflow:hidden}
```

```js
function intro() {
  const el = $('.intro');
  let closed = false;
  const close = () => {                              // se puede llamar varias veces sin problema
    if (closed) return;
    closed = true;
    document.body.classList.add('is-ready');         // dispara la entrada del contenido
    el && el.remove();
    document.body.classList.remove('is-locked');
  };
  if (!el) return close();
  if (reduce || !el.animate) {                       // menos movimiento: solo se desvanece
    el.style.transition = 'opacity .35s';
    el.style.opacity = '0';
    setTimeout(close, 380);
    return;
  }
  document.body.classList.add('is-locked');
  setTimeout(close, 4500);                           // respaldo si el navegador congela las animaciones
  const letters = $$('.il', el);
  const msg = $('.intro__msg span', el);
  const up = [{ transform: 'translateY(105%)' }, { transform: 'translateY(0)' }];
  letters.forEach((l, i) => l.animate(up, { duration: 800, delay: 120 + i * 80, easing: EASE, fill: 'forwards' }));
  if (msg) msg.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }],
    { duration: 800, delay: 600, easing: EASE, fill: 'forwards' });
  let out = false;
  const leave = () => {
    if (out) return;
    out = true;
    clearTimeout(hold);
    const exit = [{ transform: 'translateY(0)' }, { transform: 'translateY(-105%)' }];
    letters.forEach((l, i) => l.animate(exit, { duration: 600, delay: i * 50, easing: EASE_IO, fill: 'forwards' }));
    if (msg) msg.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-110%)' }],
      { duration: 600, easing: EASE_IO, fill: 'forwards' });
    const panel = [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }];
    $('.intro__panel--a', el).animate(panel, { duration: 950, delay: 300, easing: EASE_IO, fill: 'forwards' });
    const b = $('.intro__panel--b', el).animate(panel, { duration: 950, delay: 430, easing: EASE_IO, fill: 'forwards' });
    setTimeout(() => document.body.classList.add('is-ready'), 700); // el contenido entra bajo la cortina
    b.onfinish = close;
  };
  const hold = setTimeout(leave, 1650);              // tarjeta: 1.65 s; página de gracias: hasta 2 s
  el.addEventListener('click', leave, { once: true });
}
```

En una tarjeta de contacto el intro completo dura unos 3 segundos. Si la página depende de buscadores o de la velocidad, hazlo más corto o no lo pongas.

### 19.4 Contador con requestAnimationFrame

```js
function counters() {
  if (reduce || !('IntersectionObserver' in window)) return;  // se queda la cifra del HTML
  const run = (el) => {
    const end = parseFloat(el.dataset.count);
    if (isNaN(end)) return;
    const dec = parseInt(el.dataset.decimals || '0', 10);
    // mismo formato que la cifra del HTML: con data-format="int", separador de miles (1,026,218)
    const fmt = (v) => (el.dataset.format === 'int' ? Math.round(v).toLocaleString(document.documentElement.lang || 'es') : v.toFixed(dec));
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 1400);
      el.textContent = fmt(end * (1 - Math.pow(1 - p, 3)));  // frena al final
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
  }), { threshold: 0.6 });
  $$('[data-count]').forEach((n) => io.observe(n));
}
```

### 19.5 Títulos por líneas sin SplitText

Escribe las líneas a mano en el HTML. En celular una línea puede ocupar dos renglones; no pasa nada, la máscara las contiene.

```html
<h2 class="lines" data-reveal-lines>
  <span class="line"><span>[PRIMERA LÍNEA]</span></span>
  <span class="line"><span>[SEGUNDA LÍNEA]</span></span>
</h2>
```

```css
.lines .line{display:block;overflow:hidden;padding-bottom:.06em}
.lines .line > span{display:block}
.js .lines .line > span{translate:0 110%;transition:translate 1s var(--ease)}
.js .lines.is-in .line > span{translate:0 0}
.js .lines .line:nth-child(2) > span{transition-delay:.09s}
.js .lines .line:nth-child(3) > span{transition-delay:.18s}
```

El IntersectionObserver de 19.2 ya incluye `[data-reveal-lines]`. Los retrasos de cada línea (0.09 s y 0.18 s) son el escalonado de la landing de referencia: usa el de la ficha.

### 19.6 Marquesina

Usa la versión CSS de la sección 10.1, con la velocidad, el separador y la tipografía de la marca.

### 19.7 Video de YouTube con fachada

Un iframe de YouTube carga cerca de un megabyte de scripts y cookies aunque nadie le dé play. Muestra una portada propia y crea el iframe solo al tocar:

```html
<div class="video" data-yt="[ID DEL VIDEO]" style="aspect-ratio:16/9">
  <button class="video__btn" type="button" aria-label="Ver video: [TÍTULO]">
    <img src="img/[PORTADA].webp" alt="" width="1280" height="720" loading="lazy">
  </button>
</div>
```

```js
$$('.video[data-yt]').forEach((v) => {
  const btn = $('.video__btn', v);
  btn.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${v.dataset.yt}?autoplay=1&rel=0&playsinline=1`;
    f.title = btn.getAttribute('aria-label') || 'Video';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    v.appendChild(f);
    btn.remove();
  }, { once: true });
});
```

### 19.8 Trazos de la marca que se dibujan, sin librerías

La versión ligera de 9.2. Mismo HTML (`<svg class="trazo" data-draw>`) y mismo estilo de línea.

```css
.js [data-draw] :is(path,line,polyline,circle,ellipse,rect){stroke-dasharray:var(--len);stroke-dashoffset:var(--len)}
.js [data-draw].is-in :is(path,line,polyline,circle,ellipse,rect){stroke-dashoffset:0;transition:stroke-dashoffset calc(var(--dur) * 1.4) var(--ease)}
```

```js
function drawLengths() {   // llámala antes de reveals(): mide cada línea y la esconde
  $$('[data-draw] :is(path, line, polyline, circle, ellipse, rect)').forEach((p) => {
    p.style.setProperty('--len', `${Math.ceil(p.getTotalLength())}px`);
  });
}
```

`reveals()` (19.2) ya observa `[data-draw]` y le agrega `is-in` al entrar. Mientras `--len` no exista (el JS no corrió o falló), la regla no aplica y el trazo se ve completo. Con menos movimiento, `reveals()` marca todo como visible desde el inicio.

### Errores típicos

- Botones que arrancan ocultos y solo aparecen cuando corre `requestAnimationFrame`: con la pestaña en segundo plano nunca corre y los botones se quedan invisibles. Todo lo oculto necesita un temporizador de respaldo.
- Intro sin salto con un toque ni tiempo máximo.
- Animar `transform` en `[data-reveal]` cuando la tarjeta también tiene hover con `transform`: el revelado reemplaza la transición del hover. Usa `translate` o envuelve la tarjeta.
- Cargar GSAP en una tarjeta de contacto solo para un revelado.

---

## 20. Verificación antes de entregar

La lista completa de calidad está en `references/04-calidad-y-publicacion.md`. Lo propio del movimiento:

1. **375 px y escritorio (1366 o 1440 px).** Sin scroll lateral: `document.documentElement.scrollWidth` debe ser 375 o menos. Compara contra 375 y no contra `innerWidth`, que en la emulación puede crecer con la página. Para encontrar al culpable:

   ```js
   [...document.querySelectorAll('body *')]
     .filter((e) => e.getBoundingClientRect().right > 376)
     .map((e) => e.tagName + '.' + e.className)
   ```

   Ignora lo que vive dentro de un contenedor con overflow oculto, como las pistas de marquesina.
2. **Con "Reducir movimiento" activado:** todo el contenido visible; menú, preguntas y formulario funcionan.
3. **Sin GSAP:** bloquea la URL de `gsap.min.js` en las herramientas para desarrolladores (Network, Block request URL) o renombra el archivo un momento. La página debe verse completa y quieta. **Con `main.js` roto** (cambia su ruta un momento), el preloader deja de tapar a los 10 s y el titular aparece a los 12 s por los rescates de CSS. Con el panel de vista previa oculto esos rescates tampoco avanzan; para probarlos, adelanta su reloj: `$('.preloader').getAnimations().forEach((a) => { a.currentTime = 13000; })`.
4. **Consola sin errores** y sin avisos "GSAP target not found". Un `.from()` con un selector que no existe en la página deja dos avisos, uno con el nombre y otro sin nombre; borra esa línea de la línea de tiempo.
5. **Capturas confiables.** Si el panel de vista previa está oculto, `requestAnimationFrame` se congela y las capturas salen a medio animar. Tampoco se disparan los IntersectionObserver: la barra fija, los revelados ligeros y los videos no reaccionan al scroll aunque el código esté bien. Revisa esa lógica midiendo con `getBoundingClientRect()` o con el panel visible. Antes de concluir que algo está roto: llama `gsap.ticker.tick()` varias veces, o inyecta `<style>*{transition:none!important}</style>` y agrega a mano las clases finales (`is-in`, `is-visible`). Para moverte por la página usa `lenis.scrollTo(y, { immediate: true })` o `window.scrollTo({ top: y, behavior: 'instant' })`; con scroll suave la captura sale a medio camino.
6. **Celular real** (un iPhone y un Android): la barra fija respeta la zona inferior del iPhone, los videos corren solo en pantalla (con el modo de ahorro de batería del iPhone no se reproducen solos y debe verse la portada) y el preloader no se siente largo.
7. **Recalcular:** abre una pregunta frecuente y revisa que lo de más abajo se anime en su lugar; gira el celular y revisa que los títulos divididos se reacomoden.
8. **Fiel a la ficha aprobada.** Las curvas, tiempos y recorridos salen de `M` y de los tokens CSS: busca en el JS curvas o duraciones escritas a mano que se hayan quedado de los ejemplos (`'expo.out'`, `'back.out(1.7)'`, `duration: 1.1`) y cámbialas por las de la marca. La firma aparece en la entrada y en sus lugares de rima, la intensidad de cada sección sigue la partitura y no hay ningún gesto, texto ni imagen copiado de la referencia.
9. **La firma termina en la portada real.** El último cuadro de la entrada es la portada completa, con el botón principal a la vista en 375 x 812. Revisa también la firma a media animación: una máscara puede cortar una pieza y verse como una franja recortada.
10. **Sin vista previa, con el script.** En Claude Code, si el panel de vista previa no está disponible o está oculto, `scripts/revisar-sitio.mjs` revisa con Chrome sin ventana: capturas a 375 x 812 y 1440 x 900, cuadros de la firma con `--firma`, desbordes, consola, contenido oculto, Reducir movimiento y sin JavaScript. Cómo correrlo y leerlo: sección 2 de `04-calidad-y-publicacion.md`. En claude.ai no hay navegador: dilo al entregar y da la lista de revisión de la sección 3 de ese mismo archivo.
11. **El movimiento no le cuesta al SEO.** El titular y la imagen principal están visibles desde el primer cuadro o en menos de 0.3 s; ninguna página que no sea el inicio tiene preloader; con JavaScript apagado se lee todo el contenido (`07-seo-tecnico-y-aeo.md`, sección 3).
