# Página web del SME Student Chapter UNA Puno

Sitio institucional del capítulo estudiantil de la Society for Mining, Metallurgy & Exploration (SME) en la Universidad Nacional del Altiplano, Puno. Lo mantiene Brandon Quispe (junta directiva del chapter).

- URL: https://smeunapuno.github.io
- Alojamiento: GitHub Pages, rama `main`, carpeta raíz. Cada push publica en 1 o 2 minutos; los navegadores guardan caché hasta unos 10 minutos (probar con Ctrl + Shift + R o incógnito).
- No hay proceso de compilación: son archivos HTML, CSS y JS estáticos. Se editan directamente.
- Idioma de todo el contenido y de los mensajes de commit: español.
- **Commits sin atribución a Claude:** no agregar líneas `Co-Authored-By` ni `Claude-Session` (ni ninguna otra mención a Claude) en los mensajes de commit ni en pull requests. El usuario pidió que Claude no aparezca como colaborador del repositorio.
- **Autor de los commits:** `Brandon Quispe <brandonquispetapia@gmail.com>` (su cuenta principal de GitHub). Usar `git -c user.name="Brandon Quispe" -c user.email="brandonquispetapia@gmail.com" commit ...` si la configuración del entorno tiene otro autor.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: portada animada del Titicaca (`#intro`), diapositivas (`#hero`), franja con frase y 3 tarjetas, carrusel de próximas actividades, tarjetas grandes "Sobre nosotros" y "Únete", franja oscura "Lo que hicimos este año" |
| `nosotros.html` | Misión y visión, qué es SME, alianzas |
| `actividades.html` | Próximas actividades (con fecha y "Próximamente"), lo que hicimos este año (Arequipa, CONEIMIN, voluntariado), ponencias y talleres |
| `beneficios.html` | Becas, prácticas y cursos del chapter; becas internacionales SME; membresías |
| `unete.html` | Pasos para formar parte, correo y redes |
| `styles.css` | Todo el estilo, incluida la portada animada (al final) |
| `main.js` | Tema claro/oscuro, menú de celular, diapositivas, carruseles, visor de imágenes y portada animada |
| `img/` | Imágenes en WebP (máximo unos 1200 píxeles de lado, calidad 80) |
| `IMAGENES PARA LA PAGINA/` | Fotos originales subidas por el usuario (JPG). La web usa las copias en WebP de `img/` |
| `favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`, `icon-*.png` | Ícono con el logo del chapter |
| `.nojekyll` | Evita que GitHub Pages procese el sitio con Jekyll |

**Partes repetidas en las 5 páginas:** `<head>`, barra de navegación (`<header class="nav">`), pie de página (`<footer class="footer">`), el SVG oculto con las curvas del Titicaca (`<g id="lk">`) y el visor de imágenes (`#lb`). Si se cambia el menú o el pie, hay que cambiarlo en las 5 páginas.

## Estilo visual

- Inspirado en smenet.org (sin copiarlo): barra superior negra con enlaces en verde lima, tarjetas blancas con borde superior azul o lima, títulos con serifa, pie de página negro con títulos en lima.
- Tipografías (Google Fonts): **Alegreya** para títulos y botones, **Roboto** para texto.
- Colores (variables en `:root` y `[data-theme=dark]` de `styles.css`): azul SME `#0089d0`, lima SME `#bed62f`.
- Identidad propia: **las curvas de nivel del lago Titicaca** (contorno real, datos de Natural Earth). Están definidas una vez por página en `<g id="lk">` y se reutilizan con `<svg viewBox="120 120 760 760"><use href="#lk"/></svg>`. Los colores se controlan con las variables CSS `--tc`, `--ti`, `--to`.
- Modo claro y oscuro: por defecto sigue la configuración del dispositivo; el botón de la barra guarda la elección en `localStorage` (`sme-theme`).
- La portada animada del Titicaca solo aparece en `index.html`, una vez por visita (`sessionStorage` `sme-intro`), y se salta si la URL trae un `#ancla`.
- Sin animaciones al hacer scroll ni efectos recargados: el usuario pidió una web "normal", sobria e institucional.

## Componentes principales (clases)

- `.slide` (diapositiva de portada), `.tile` (tarjeta azul), `.band-sand` / `.band-dark` (franjas con curvas del Titicaca de fondo), `.ev` (tarjeta de actividad con flyer y fecha en `.date`), `.card.soon` (actividad sin fecha), `.feat` (tarjeta grande con foto), `.imgcard` (tarjeta con foto en franja oscura), `.banner` (encabezado de páginas interiores), `.section` / `.section.alt`, `.split`, `.figure` (imagen con pie), `.price` (membresía), `.cta` (franja azul "¿Quieres ser parte?").
- Cualquier elemento con `data-full="img/…"` abre esa imagen en el visor.
- **Espacios para foto:** `<div class="ph">…<span class="ph-label">…Espacio para foto: …</span></div>`. Para poner la foto real, reemplazar todo el `div.ph` por `<img src="img/nombre.webp" alt="descripción">` dentro del mismo contenedor (`.bg`, `.img`, `.tile .img`, `.feat .bg`). En `.ph-box` reemplazar el bloque completo por una `figure.figure`.

## Tareas frecuentes

**Agregar una actividad:** guardar el flyer en `img/` como WebP; copiar un `<article class="ev">` existente en `index.html` (dentro de `.track`) y en `actividades.html` (dentro de `.grid4.evgrid`); cambiar fecha, etiqueta, título, texto e imagen. Las actividades sin flyer van como `.card.soon` en "Próximamente".

**Cuando una actividad ya pasó:** quitarla de "Próximas actividades" en ambas páginas y, si vale la pena, agregar su flyer a "Ponencias y talleres" en `actividades.html`.

**Antes de publicar:** revisar en ancho de computadora (1440 píxeles) y de celular (390 píxeles), en modo claro y oscuro, abrir el menú de celular y confirmar que nada se sale horizontalmente de la pantalla.

## Pendientes (a noviembre de 2026)

- 3 espacios para foto por llenar: tarjeta "Únete" de Inicio, encabezado de Únete y Arequipa: sorteo de becas.
- Fechas por confirmar: día exacto de ASIMET Mining Titans (noviembre de 2026) y II Encuentro de SME en Cusco.
- Confirmar si la foto del auditorio del Colegio de Ingenieros (`img/cip.webp`) es del viaje a Arequipa.
- Las actividades de noviembre (9, 12 y 16) vencen pronto; el I Encuentro de Egresados es el 4 y 5 de diciembre.

## Decisiones de contenido (respetarlas)

- Tono simple y directo, pensado para estudiantes. Nada de frases de marketing exageradas.
- Es una presentación institucional del chapter, no una página de inducción.
- Becas, prácticas y cursos del chapter se otorgan a **los miembros más activos y colaborativos, sean o no de la junta directiva**.
- No publicar teléfonos ni correos personales: solo el correo del chapter (smestudentchapterunap@gmail.com) y las redes. El número 958 381 899 aparece solo porque está en el flyer público del Encuentro de Egresados.
- No usar fotos de personas sacadas de internet. Fotos de paisajes o minería con licencia libre sí (Unsplash, dominio público), pero las de personas deben ser del chapter.
- No afirmar datos sin fuente: se quitaron cifras no verificadas (montos de becas, "descargas ilimitadas", "fundada en 1871").
- Si se agregan unidades o cifras en textos, escribirlas completas (por ejemplo, "dólares estadounidenses al año").
