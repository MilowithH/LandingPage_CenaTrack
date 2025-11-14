# 🛠️ GUÍA DE CONFIGURACIÓN LOCAL

**Proyecto:** LandingPage_CenaTrack  
**Última actualización:** 13 de noviembre de 2025

---

## 📋 REQUISITOS

- Node.js 14+ (si usas bundler)
- Un navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git

---

## 🚀 INSTALACIÓN Y CONFIGURACIÓN

### 1. Clonar el Repositorio

```bash
git clone https://github.com/MilowithH/LandingPage_CenaTrack.git
cd LandingPage_CenaTrack
```

### 2. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus credenciales de Firebase
# NO comitees este archivo
```

Contenido de `.env.local`:
```env
REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_auth_domain.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://tu_project.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=tu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=865907759041
REACT_APP_FIREBASE_APP_ID=1:865907759041:web:xxx
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXX
```

### 3. Servir Localmente

#### Opción A: Con Python (Más fácil)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Opción B: Con Node.js
```bash
# Instalar http-server globalmente
npm install -g http-server

# Ejecutar
http-server -p 8000
```

#### Opción C: Con VS Code
```bash
# Instalar extensión "Live Server"
# Click derecho en index.html → "Open with Live Server"
```

Luego acceder a: **http://localhost:8000**

---

## 🧪 TESTING DE RESPONSIVIDAD

### Chrome DevTools
1. Abre el navegador en http://localhost:8000
2. Presiona **F12** para abrir DevTools
3. Presiona **Ctrl+Shift+M** (o icono de dispositivo)
4. Prueba en:
   - iPhone SE (375px)
   - iPhone 12 (390px)
   - iPad (768px)
   - Desktop (1920px)

### Puntos de Quiebre Verificar
```css
/* Mobile */
< 640px  - Optimización máxima
640px    - sm
768px    - md (tablet)
1024px   - lg (desktop)
1280px   - xl (desktop grande)
1536px   - 2xl (ultra ancho)
```

### Checklist de Testing

- [ ] Navbar se colapsa en móvil
- [ ] Menú móvil es accesible
- [ ] Mapa se ajusta a pantalla
- [ ] Tipografía es legible
- [ ] Botones son clickeables (48x48px)
- [ ] Footer es responsive
- [ ] No hay scroll horizontal
- [ ] Imágenes se cargan correctamente
- [ ] Colores tienen contraste suficiente

---

## 🗺️ TESTING DEL MAPA

### Configurar Geolocalización Falsa

En Chrome DevTools:
1. **F12** → **Sensors** (o Menu → More Tools → Sensors)
2. Selecciona "Geolocation"
3. Elige una ubicación predefinida o personalizada
4. El mapa debería mostrar el marcador

### Ubicación de Cenabastos (Real)
```
Latitud: 7.9245969061005835
Longitud: -72.49189616570473
```

Puedes verificar en: https://maps.google.com y pegar: `7.9245969061005835, -72.49189616570473`

---

## 🔒 SEGURIDAD EN DESARROLLO

### ⚠️ NO HACER NUNCA

```bash
# ❌ NO comitees credenciales
git add .env.local
git commit -m "Add credentials"

# ❌ NO expongas credenciales en commits
git push origin master

# ❌ NO compartas credenciales por chat/email
```

### ✅ HACER SIEMPRE

```bash
# Verificar que .env.local está en .gitignore
cat .gitignore | grep .env

# Antes de cada commit
git status  # Verifica que .env.local NO aparezca

# Usar variables de entorno en desarrollo
cat .env.local  # Solo localmente
```

### Si Accidentalmente Commiteaste Credenciales

```bash
# Opción 1: Cambiar credenciales en Firebase Console INMEDIATAMENTE
# Opción 2: Remover del historio de git
git filter-branch --tree-filter 'rm -f .env.local' HEAD

# Opción 3: Regenerar todas las credenciales
```

---

## 🐛 DEBUGGING

### Verificar Console Errors

```bash
# Abre la consola de JavaScript
F12 → Console

# Busca mensajes de error
# Particularmente sobre geolocalización y Firebase
```

### Common Issues

#### "Firebase is not defined"
```javascript
// Problema: Las credenciales no están configuradas
// Solución: Revisa que .env.local existe y tiene valores

// En el navegador, verifica:
console.log(window.FIREBASE_CONFIG)
```

#### "Geolocation permission denied"
```javascript
// En Chrome: Settings → Privacy → Site settings → Location
// Permite la ubicación para localhost:8000
```

#### Mapa no carga
```javascript
// Verifica en console:
console.log('Leaflet version:', L.version)
console.log('Map element:', document.getElementById('map'))
```

---

## 📊 PERFORMANCE TESTING

### Lighthouse (Chrome)
1. **F12** → **Lighthouse** tab
2. Selecciona "Mobile" o "Desktop"
3. Click "Analyze page load"

Objetivos:
- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Verificar Carga de Recursos
```javascript
// En console:
performance.getEntriesByType('resource').forEach(r => {
    console.log(r.name, 'took', r.duration, 'ms');
});
```

---

## 🔄 WORKFLOW DE DESARROLLO

### 1. Crear rama para cambios
```bash
git checkout -b feature/mi-feature
```

### 2. Hacer cambios
```bash
# Edita archivos, prueba localmente
npm test  # (si aplica)
```

### 3. Verificar cambios
```bash
# Revisa la página en diferentes tamaños
# F12 → Device Toolbar
```

### 4. Commit
```bash
git add .
git commit -m "Feature: Descripción breve de los cambios"
```

### 5. Push
```bash
git push origin feature/mi-feature
```

### 6. Pull Request
- Abre PR en GitHub
- Describe los cambios
- Espera aprobación

---

## 📚 RECURSOS ÚTILES

### Documentación
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Leaflet Maps Docs](https://leafletjs.com/reference.html)
- [Firebase Docs](https://firebase.google.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

### Herramientas
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Responsively App](https://responsively.app/) - Testing responsive
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificar colores
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance

### Extensiones Chrome Recomendadas
- WaveDevTools (Accesibilidad)
- React DevTools
- Redux DevTools
- JSON Viewer

---

## 🎓 COMANDOS ÚTILES

### Git
```bash
# Ver estado
git status

# Ver cambios
git diff

# Ver historial
git log --oneline

# Descartar cambios
git checkout -- archivo.html

# Limpiar archivos no tracked
git clean -fd
```

### Development
```bash
# Buscar en archivos
grep -r "palabra" . --include="*.js" --include="*.html"

# Contar líneas de código
find . -name "*.html" -o -name "*.css" -o -name "*.js" | xargs wc -l
```

---

## 🆘 SOPORTE

Si encuentras problemas:

1. **Revisa los logs:**
   ```bash
   # En console del navegador
   console.error()  # Busca mensajes de error
   ```

2. **Consulta la documentación:**
   - `CAMBIOS_REALIZADOS.md` - Cambios recientes
   - `ANALISIS_Y_MEJORAS.md` - Problemas conocidos
   - `RESUMEN_CAMBIOS.md` - Overview general

3. **Crea un issue en GitHub:**
   - Describe el problema
   - Incluye pasos para reproducir
   - Adjunta screenshots/videos

4. **Contacta al equipo:**
   - Slack/Discord del equipo
   - Email del maintainer

---

**¡Listo para empezar a desarrollar!** 🚀
