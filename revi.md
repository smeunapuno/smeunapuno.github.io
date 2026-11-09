# Página web del SME Student Chapter UNA Puno

Sitio institucional del capítulo estudiantil de la Society for Mining, Metallurgy & Exploration (SME) en la Universidad Nacional del Altiplano, Puno. Lo mantiene Brandon Quispe (junta directiva del chapter).

- URL: https://smeunapuno.github.io
- Alojamiento: GitHub Pages, rama `main`, carpeta raíz. Cada push publica en 1 o 2 minutos; los navegadores guardan caché hasta unos 10 minutos (probar con Ctrl + Shift + R o incógnito).
- **Versión de caché:** las 5 páginas cargan `styles.css?v=…` y `main.js?v=…`. Al cambiar el CSS o el JS, subir ese número en las 5 páginas. Si se reemplaza una imagen manteniendo el nombre, agregarle también `?v=…` donde se usa.
- No hay proceso de compilación: son archivos HTML, CSS y JS estáticos. Se editan directamente.
- Idioma de todo el contenido y de los mensajes de commit: español.
- **Mensajes de commit:** solo el resumen del cambio. Sin líneas de coautoría (`Co-Authored-By`) ni enlaces de sesión al final, tampoco en pull requests.
- **Autor de los commits:** `Brandon Quispe <brandonquispetapia@gmail.com>` (su cuenta principal de GitHub). Usar `git -c user.name="Brandon Quispe" -c user.email="brandonquispetapia@gmail.com" commit ...` si la configuración del entorno tiene otro autor.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: portada animada del Titicaca (`#intro`), diapositivas (`#hero`), franja con frase y 3 tarjetas, carrusel de próximas actividades, tarjetas grandes "Sobre nosotros" y "Únete", franja oscura "Lo que hicimos este año" |
| `nosotros.html` | Misión y visión (solo tarjetas, sin fotos, para no repetir imágenes de otras páginas), qué es SME (franja oscura `.band-sme`), alianzas (franja beige) |
| `actividades.html` | Próximas actividades (carrusel) y "Próximamente", lo que hicimos este año (tarjetas `.exp` sobre franja con curvas del Titicaca), ponencias y talleres |
| `beneficios.html` | Becas, prácticas y cursos del chapter; becas internacionales SME; membresías |
| `unete.html` | Pasos para formar parte, correo y redes |
| `styles.css` | Todo el estilo, incluida la portada animada (al final) |
| `main.js` | Tema claro/oscuro, menú de celular, diapositivas, carruseles, visor de imágenes y portada animada |
| `img/` | Imágenes en WebP (máximo unos 1200 píxeles de lado, calidad 80). Excepción: las fotos de la portada (`#hero`) van en HD, 1920 píxeles de ancho, calidad 82, con sufijo `-hd` |
| `originals/` | Fotos originales en JPG. La web usa las copias en WebP de `img/` |
| `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `icon-*.png` | Ícono con el logo del chapter |
| `.nojekyll` | Evita que GitHub Pages procese el sitio con Jekyll |

**Partes repetidas en las 5 páginas:** `<head>`, barra de navegación (`<header class="nav">`), pie de página (`<footer class="footer">`), el SVG oculto con las curvas del Titicaca (`<g id="lk">`) y el visor de imágenes (`#lb`). Si se cambia el menú o el pie, hay que cambiarlo en las 5 páginas. El pie incluye el crédito "Dirección y desarrollo por: Brandon Quispe Tapia" con un ícono pequeño que enlaza a su LinkedIn (`.footer .credit`); mantenerlo discreto.

## Estilo visual

- Inspirado en smenet.org (sin copiarlo): barra superior oscura semitransparente sobre la portada y los encabezados (se vuelve sólida al bajar, clase `.solid` desde `main.js`), con enlaces en verde lima, tarjetas blancas con borde superior azul o lima, títulos con serifa, pie de página negro con títulos en lima.
- Tipografías (Google Fonts): **Alegreya** para títulos y botones, **Roboto** para texto.
- Colores (variables en `:root` y `[data-theme=dark]` de `styles.css`): azul SME `#0089d0`, lima SME `#bed62f`.
- Identidad propia: **las curvas de nivel del lago Titicaca** (contorno real, datos de Natural Earth). Están definidas una vez por página en `<g id="lk">` y se reutilizan con `<svg viewBox="120 120 760 760"><use href="#lk"/></svg>`. Los colores se controlan con las variables CSS `--tc`, `--ti`, `--to`.
- Modo claro y oscuro: por defecto sigue la configuración del dispositivo; el botón de la barra guarda la elección en `localStorage` (`sme-theme`).
- La portada animada del Titicaca solo aparece en `index.html`, una vez por visita (`sessionStorage` `sme-intro`), y se salta si la URL trae un `#ancla`.
- **Portada (diapositivas de `#hero`): solo paisajes mineros en HD**, con sombras oscuras en los bordes. Nada de fotos pequeñas estiradas.
- Sin animaciones al hacer scroll ni efectos recargados: la web debe ser sobria e institucional.

## Componentes principales (clases)

- `.slide` (diapositiva de portada), `.tile` (tarjeta azul), `.band-sand` / `.band-dark` (franjas con curvas del Titicaca de fondo), `.ev` (tarjeta de actividad con flyer y fecha en `.date`), `.card.soon` (actividad sin fecha), `.feat` (tarjeta grande con foto), `.imgcard` (tarjeta con foto en franja oscura), `.banner` (encabezado de páginas interiores), `.section` / `.section.alt`, `.split`, `.figure` (imagen con pie), `.price` (membresía), `.cta` (franja azul "¿Quieres ser parte?"), `.exp` (tarjeta de "Lo que hicimos": foto de portada con `.badge`, texto y miniaturas `.thumbs` que abren el visor).
- Cualquier elemento con `data-full="img/…"` abre esa imagen en el visor.
- **Espacios para foto:** `<div class="ph">…<span class="ph-label">…Espacio para foto: …</span></div>`. Para poner la foto real, reemplazar todo el `div.ph` por `<img src="img/nombre.webp" alt="descripción">` dentro del mismo contenedor (`.bg`, `.img`, `.tile .img`, `.feat .bg`). En `.ph-box` reemplazar el bloque completo por una `figure.figure`.

## Tareas frecuentes

**Agregar una actividad:** guardar el flyer en `img/` como WebP; copiar un `<article class="ev">` existente en `index.html` y en `actividades.html` (en ambos, dentro de `.track`); cambiar fecha, etiqueta, título, texto e imagen. Las actividades sin flyer van como `.card.soon` en "Próximamente".

**Cuando una actividad ya pasó:** quitarla de "Próximas actividades" en ambas páginas y, si vale la pena, agregar su flyer a "Ponencias y talleres" en `actividades.html`.

**Antes de publicar:** revisar en 1920, 1440, 1024 y 390 píxeles de ancho (las fotos de fondo se recortan distinto en cada uno; ajustar con `object-position`), en modo claro y oscuro, abrir el menú de celular y confirmar que nada se sale horizontalmente de la pantalla.

## Pendientes (a noviembre de 2026)

- Portada: diapositiva 1 = mina a tajo abierto (HD); diapositiva 2 = maqueta de una operación minera (HD); diapositiva 3 = Puno (HD, no es minero). Falta un paisaje minero en HD para reemplazar la de Puno.
- Ya no quedan espacios para foto vacíos. El encabezado de Únete y la tarjeta "Únete al chapter" de Inicio usan `img/grupo-visita-mina.webp` (foto grupal recortada sin el marco ni el logo del original).
- Fechas por confirmar: día exacto de ASIMET Mining Titans (noviembre de 2026) y II Encuentro de SME en Cusco.
- Confirmado: la foto del auditorio del Colegio de Ingenieros (`img/cip.webp`) y la foto con el roll-up banner (`img/arequipa-banner.webp`) son del viaje a Arequipa.
- Las actividades de noviembre (9, 12 y 16) vencen pronto; el I Encuentro de Egresados es el 4 y 5 de diciembre.

## Decisiones de contenido (respetarlas)

- Tono simple y directo, pensado para estudiantes. Nada de frases de marketing exageradas.
- Es una presentación institucional del chapter, no una página de inducción.
- Becas, prácticas y cursos del chapter se otorgan **solo a los 20 miembros más activos**, que van sumando puntos de forma constante al participar y colaborar, **sean o no de la junta directiva**.
- Contacto público: correo del chapter (smestudentchapterunap@gmail.com), redes y el WhatsApp del presidente, 958 381 899 (enlace `https://wa.me/51958381899`, en el pie de las 5 páginas y en Únete). No publicar otros teléfonos ni correos personales.
- No usar fotos de personas sacadas de internet. Fotos de paisajes o minería con licencia libre sí (Unsplash, dominio público), pero las de personas deben ser del chapter.
- **Proyecto aún no público:** en próximas actividades hay una tarjeta "Próximamente" (`.ev-teaser`) que muestra solo la silueta del emblema (`img/proximamente.svg`, sin el nombre ni el año). No publicar el nombre, el logo completo ni detalles del proyecto en la web, en los commits ni en este archivo hasta que Brandon lo autorice. Los logos originales no se suben al repositorio.
- No afirmar datos sin fuente: se quitaron cifras no verificadas (montos de becas, "descargas ilimitadas", "fundada en 1871").
- Cifras de "Qué es SME" (Nosotros) verificadas en smenet.org en noviembre de 2026: más de 15,000 miembros en más de 100 países (página de contacto de SME), sede en Englewood, Colorado (no Denver), organización sin fines de lucro 501(c)(3), y presencia en 7 países de Latinoamérica: Argentina, Brasil, Chile, Colombia, Ecuador, México y Perú (artículo "SME Latin America" de Mining Engineering).
- Si se agregan unidades o cifras en textos, escribirlas completas (por ejemplo, "dólares estadounidenses al año").
