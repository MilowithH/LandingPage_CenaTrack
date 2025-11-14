# ⚡ INICIO RÁPIDO - 5 MINUTOS

**Para empezar a trabajar con los cambios realizados:**

---

## 🚀 Paso 1: Configurar Firebase (2 min)

```bash
# Desde la carpeta del proyecto
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales reales:
```env
REACT_APP_FIREBASE_API_KEY=tu_clave_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_dominio.firebaseapp.com
# ... resto de credenciales
```

⚠️ **IMPORTANTE:** NO comitees `.env.local`

---

## 🌐 Paso 2: Servir Localmente (1 min)

**Opción A - Más Fácil (Python):**
```bash
python -m http.server 8000
# O en Python 2:
python -m SimpleHTTPServer 8000
```

**Opción B - Con Node (Si tienes npm):**
```bash
npx http-server -p 8000
```

Luego abre: **http://localhost:8000**

---

## 📱 Paso 3: Probar Responsividad (1 min)

En Chrome:
1. Abre DevTools: **F12**
2. Activa Device Mode: **Ctrl+Shift+M**
3. Prueba en:
   - iPhone SE (375px) ✓
   - iPad (768px) ✓
   - Desktop (1920px) ✓

---

## ✅ Paso 4: Validar Cambios (1 min)

En la consola del navegador (F12 → Console):

```javascript
// Verificar Firebase configurado
console.log(window.firebaseConfig !== undefined);  // true

// Verificar mapa
console.log(document.getElementById('map'));  // <div id="map">

// Verificar ARIA labels
console.log(
    document.getElementById('mobile-menu-button')
    .getAttribute('aria-label')
);  // "Abrir menú móvil"
```

✅ Si ves todos los mensajes correctos = **¡Funciona!**

---

## 📊 Archivos Importantes

```
.env.example           ← Template (copiar a .env.local)
.gitignore             ← Protege archivos sensibles
index.html             ← Archivo principal (modificado)

📄 CAMBIOS_REALIZADOS.md   ← Lee esto primero
📄 SETUP_LOCAL.md           ← Guía completa
📄 VALIDACION_CHECKLIST.md  ← Antes de deployment
```

---

## 🐛 Si Algo Falla

### Mapa no carga
```javascript
// En console:
console.log(L);  // ¿Está Leaflet cargado?
console.log(document.getElementById('map'));  // ¿Existe el div?
```

### Firebase error
```
Verificar que .env.local existe y tiene valores
Recarga la página (Ctrl+Shift+R fuerza reload)
Abre DevTools → Network → Busca errores
```

### Geolocalización no funciona
```
Chrome: Settings → Privacy → Site settings → Location → Allow
Safari: Permite la ubicación cuando pregunta
```

---

## 🎯 Checklist Rápido

- [ ] Copié `.env.example` a `.env.local`
- [ ] Agregué credenciales reales
- [ ] Ejecuté `http.server` o equivalente
- [ ] Abrí http://localhost:8000
- [ ] Revisé en móvil (DevTools)
- [ ] Console sin errores
- [ ] Leí `CAMBIOS_REALIZADOS.md`

---

## 📚 Documentación Disponible

| Cuando... | Lee... |
|-----------|--------|
| Necesitas detalles técnicos | `CAMBIOS_REALIZADOS.md` |
| Quieres configurar bien | `SETUP_LOCAL.md` |
| Necesitas validar todo | `VALIDACION_CHECKLIST.md` |
| Resumen ejecutivo | `README_MEJORAS.md` |
| Este archivo es rápido | `INICIO_RAPIDO.md` |

---

**¿Listo?** ⚡

Ejecuta el servidor y abre http://localhost:8000

¡Que disfrutes! 🚀
