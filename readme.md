# CenaTrack — Carpeta `Oficial`

Última actualización: 2025-11-12

Este README describe de forma completa y profesional el contenido, propósito y flujos de trabajo de la carpeta `Oficial` del proyecto CenaTrack (Landing / Manual de Usuario). Está escrito en español y está pensado para desarrolladores, diseñadores y mantenedores que trabajan sobre la landing y la documentación del producto.

## Resumen del proyecto

La carpeta `Oficial` contiene la versión pública y estática de la landing page y del manual de usuario de CenaTrack. Es una colección de archivos HTML/CSS/JS estáticos que usan Tailwind CSS (vía CDN en el markup actual), fuentes personalizadas incluidas en `fonts/` y algunos recursos de mapa en `datamap/`.

Objetivo principal:

- Proveer una página de aterrizaje (marketing) y una página de manual de usuario con estilos compartidos y navegación coherente.

Audiencias:

- Usuarios finales que leen el manual.
- Visitantes que descubren la solución en la landing.
- Desarrolladores que desean mantener o desplegar la versión estática.

## Estructura de la carpeta

Ruta: `c:\Users\USER\Desktop\CenaTrack\LandingPage_CenaTrack\Oficial`

Contenido principal:

- `landingpage.html` — Página de aterrizaje principal (estilos y navegación principales).
- `manual_Usuario.html` — Manual de usuario (documentación) que comparte la barra de navegación y estilos con la landing.
- `readme.md` — (Este archivo) Documentación técnica y guía de uso para la carpeta `Oficial`.
- `tailwind.config.js` — Configuración local de Tailwind (presente por referencia; en la versión estática la página usa CDN, pero el archivo permite evolucionar a una build basada en Tailwind CLI/Node).
- `datamap/` — Recursos relacionados con el mapa (galpones.js, localidades.js, map.js). Usados por la app y por demos en la landing/manual.
- `fonts/` — Fuentes personalizadas (Colombia Regular/Bold/Itálica, etc.) utilizadas para la estética del proyecto.

## Archivos clave y su propósito

- `landingpage.html`

  - Contiene la interfaz pública (hero, características, footer) y la navegación principal.
  - Usa Tailwind vía CDN (`https://cdn.tailwindcss.com`) y define estilos custom en <style> para compatibilidad con `Colombia` y `Inter`.

- `manual_Usuario.html`

  - Manual interactivo/documentado con índice lateral (scroll-spy), tablas y secciones.
  - Incluye el header adaptado desde `landingpage.html` y scripts para el menú móvil y scroll-spy.
  - Nota: En esta versión se añadió soporte para usar una imagen de fondo en la sección `#manual-header` (ver instrucciones más abajo).

- `datamap/*.js`

  - Contienen datos estáticos o utilidades para renderizar marcadores/galpones en mapas. Recomendado revisar su licencia/atribución si se comparte públicamente.

- `fonts/`
  - Asegúrate de que los archivos `.ttf` referenciados en `<style>@font-face` existan en esta carpeta. Si faltan, el navegador usará `Inter` como fallback.

## Requisitos y dependencias

- Navegador moderno (Chrome, Edge, Firefox, Safari) — para ver correctamente fuentes y CSS.
- Node/npm (opcional) — si quieres construir un pipeline con Tailwind (no obligatorio para la versión CDN).
- Python (opcional) — para servir localmente con `python -m http.server`.

## Desarrollo local — pasos rápidos (Windows PowerShell)

Si sólo quieres visualizar y probar las páginas en tu máquina, la forma más rápida es servir la carpeta con un servidor estático.

1. Abrir PowerShell en la carpeta `Oficial`.

2. Servir con Python (si tienes Python 3 instalado):

```powershell
# desde la carpeta Oficial
python -m http.server 8000
# abrir en el navegador: http://localhost:8000/landingpage.html
```

3. Alternativa: usar una extensión de VS Code como "Live Server" para servir la carpeta localmente.

4. Edición rápida: los archivos son estáticos — editar `landingpage.html` o `manual_Usuario.html` y recargar el navegador.

### Opcional: usar Tailwind con build local

Si necesitas usar utilidades de Tailwind no disponibles en CDN o generar CSS purgado optimizado, crea un proyecto Node con Tailwind CLI y configura `tailwind.config.js`.

Resumen breve:

```powershell
npm init -y
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
# configurar input/output en postcss/tailwind y luego compilar
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

Reemplaza en los HTML la referencia al CDN por tu `dist/output.css`.

## Cómo trabajar con las fuentes

- Las fuentes están definidas mediante `@font-face` en los estilos embebidos. Asegúrate de mantener los ficheros dentro de `fonts/` con los nombres esperados (ej.: `Colombia-Regular.ttf`, `Colombia-Bold.ttf`, etc.).
- Si obtienes errores de fuente o falta la fuente, el navegador mostrará la fuente fallback. Para debugging inspecciona en DevTools > Network para confirmar que los `.ttf` se están cargando.

## Añadir/usar la imagen de fondo del header (instrucciones)

En la versión actual del `manual_Usuario.html` se añadió un `background-image` inline que apunta a `landingheader.jpg`. Para que se muestre correctamente:

1. Coloca la imagen (por ejemplo `landingheader.jpg`) en la misma carpeta `Oficial` o ajusta la ruta en el atributo `style` del header (`url('ruta/a/imagen.jpg')`).
2. Recomendaciones de la imagen:
   - Formato: JPG o WEBP (webp recomendado para menor tamaño).
   - Tamaño: 1920×1080 o 2560×1440 para hero de alta resolución; optimiza a calidad 60-80% para web.
   - Licencia: usar imágenes propias o libres de derechos (Unsplash, Pexels) y conservar atribución si es necesario.
3. Si la imagen no aparece, verifica:
   - Nombre y ruta (case-insensitive en Windows, pero cuidado en servidores Unix).
   - Permisos del archivo.
   - Que el CSS inline no haya sido sobrescrito por otra regla.

Ejemplo de actualización del header (si prefieres usar CSS externo):

```html
<header
  id="manual-header"
  class="..."
  style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('assets/landingheader.webp'); background-size: cover; background-position: center;"
>
  ...
</header>
```

## Notas de diseño y accesibilidad

- Se añadió una superposición oscura (`linear-gradient`) para asegurar contraste con el texto blanco del header. Mantén contraste de al menos 4.5:1 para texto normal según WCAG.
- Usa atributos `alt` en todas las imágenes (logo, etc.) para accesibilidad.
- Revisa comportamiento en móvil: el menú móvil debe cerrar al seleccionar un enlace — esto ya está implementado en el script inline.

## Troubleshooting — problemas comunes y soluciones

- Problema: "La imagen de fondo no se muestra" → Solución: comprobar ruta, nombre y extensiones, o abrir DevTools > Network.
- Problema: "Fuentes no cargan" → Solución: confirmar que `fonts/*.ttf` existe, revisar rutas en `@font-face` y habilitar CORS si las sirves desde otro origen.
- Problema: "El menú móvil no abre" → Solución: comprobar consola (JS error) y confirmar que el botón `#mobile-menu-button` existe y que el script se ejecuta después del DOMContentLoaded.

## Deploy (opciones rápidas para archivos estáticos)

- GitHub Pages: subir el repo y activar Pages para la rama `main` (carpeta raíz o `gh-pages`).
- Netlify / Vercel: arrastrar y soltar la carpeta `Oficial` o conectar el repositorio.
- Servidores estáticos: servir la carpeta `Oficial` con nginx o cualquier CDN.

## Buenas prácticas y mantenimiento

- Mantén las fuentes en `fonts/` y evita referencias absolutas a rutas locales.
- Versiona cambios relevantes del `landingheader.jpg` y del `tailwind.config.js`.
- Cuando actualices Tailwind añade pruebas visuales (capturas) para validar que no se rompa el header o el menú.

## Contribuir / Contacto

- Si tienes sugerencias o cambios: crea un fork y un pull request con descripciones claras del cambio.
- Autor / Contacto del proyecto (según la cabecera del manual):
  - Equipo: Cristhian Camilo Durán, Jesús Duván Pérez, Juan Diego Monsalve, Jesús Antonio García.
  - Instructor: Mario Alexander Velasco Vera.
  - Soporte: cenatrack.soporte@gmail.com

## Licencia

Incluye aquí la licencia que prefieras (ej. MIT) o la política de derechos de autor del equipo. Si no hay licencia definida, el código y los activos se consideran con todos los derechos reservados.

---

