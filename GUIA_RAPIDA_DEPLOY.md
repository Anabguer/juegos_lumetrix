# 🚀 GUÍA RÁPIDA - Deploy Lumetrix a Hostalia

## ⚡ Deploy en 3 pasos

### 1️⃣ Build del proyecto

```bash
cd frontend
npm run build:hostalia
```

Esto genera:
- ✅ `dist/game.bundle.js` - Bundle React compilado
- ✅ `dist/game.bundle.js.map` - Source map para debugging
- ✅ `dist/deploy_manifest.txt` - Manifiesto de archivos

### 2️⃣ Copiar a carpeta de producción

```bash
npm run deploy:copy
```

Esto copia automáticamente:
- `dist/game.bundle.js` → `PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/`
- `dist/game.bundle.js.map` → `PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/`

### 3️⃣ Subir a Hostalia por FTP

Usar FileZilla / cliente FTP favorito:

```
Local:  C:\Proyectos\Lumetrix\PARA_HOSTALIA\sistema_apps_upload\*
Remoto: /sistema_apps_upload/
```

**⚠️ IMPORTANTE**: Subir TODA la carpeta `sistema_apps_upload/` completa.

---

## 🧪 Testing antes de subir

### Test local (opcional)

```bash
npm run test:smoke
```

Esto inicia un servidor local en `http://localhost:8080` que simula la estructura de Hostalia.

1. Abre `http://localhost:8080/app_lumetrix.html`
2. Verifica que el juego carga correctamente
3. Verifica que no hay errores 404 en consola
4. Presiona `Ctrl+C` para ver el reporte de test

---

## 📋 Checklist de deploy

Antes de subir, verificar:

- [ ] `npm run build:hostalia` ejecutado sin errores
- [ ] `npm run deploy:copy` completado exitosamente
- [ ] Archivo `PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/game.bundle.js` actualizado
- [ ] Fecha de modificación del bundle es reciente
- [ ] Smoke test pasó (opcional pero recomendado)

Después de subir a Hostalia:

- [ ] Probar en navegador: `https://tu-dominio.com/app_lumetrix.html`
- [ ] Verificar que el juego carga (no se queda en pantalla de carga)
- [ ] Probar que el audio funciona
- [ ] Probar que las imágenes cargan
- [ ] Probar login/registro (si aplica)
- [ ] Verificar en consola del navegador que no hay errores

---

## 🛠️ Comandos útiles

### Desarrollo

```bash
cd frontend
npm run dev          # Servidor de desarrollo con hot reload
```

### Build completo

```bash
npm run build:hostalia  # Build + generar manifiesto
npm run deploy:copy     # Copiar a PARA_HOSTALIA
```

### Testing

```bash
npm run test:smoke   # Test servidor local
```

### Solo build (sin manifiesto)

```bash
npm run build        # Build básico de Vite
```

---

## 🔧 Troubleshooting

### Error: "No se encontró game.bundle.js"

**Solución**: Ejecutar `npm run build` primero.

```bash
cd frontend
npm install          # Si es primera vez
npm run build
```

### Error: "No existe el directorio de destino"

**Solución**: Verificar estructura de carpetas. Debe existir:

```
Lumetrix/
├── frontend/
│   ├── dist/            (se crea con npm run build)
│   └── scripts/
└── PARA_HOSTALIA/
    └── sistema_apps_upload/
        └── sistema_apps_api/
            └── lumetrix/
                └── js/
```

### El juego no carga en Hostalia

1. **Verificar ruta del bundle**:
   - Debe estar en: `/sistema_apps_upload/sistema_apps_api/lumetrix/js/game.bundle.js`
   - Probar acceso directo: `https://tu-dominio.com/sistema_apps_api/lumetrix/js/game.bundle.js`

2. **Verificar consola del navegador**:
   - Abrir DevTools (F12)
   - Ver errores en Console
   - Ver requests fallidos en Network tab

3. **Verificar permisos en servidor**:
   ```bash
   chmod 644 /sistema_apps_upload/sistema_apps_api/lumetrix/js/game.bundle.js
   chmod 755 /sistema_apps_upload/sistema_apps_api/lumetrix/js/
   ```

### Errores 404 en imágenes/audio

**Causa**: Rutas incorrectas o archivos no subidos.

**Solución**: Verificar que TODA la carpeta `PARA_HOSTALIA/sistema_apps_upload/` se subió completa, incluyendo subcarpetas `img/` y archivos `.mp3`.

### El audio no suena

**Causa**: Navegadores modernos bloquean audio hasta interacción del usuario.

**Solución**: Esto es normal. El audio se activa después del primer toque/click en el juego.

---

## 📞 Archivos de utilidad en servidor

Una vez desplegado, puedes acceder a:

- `https://tu-dominio.com/sistema_apps_api/lumetrix/phpinfo.php` - Info de PHP
- `https://tu-dominio.com/sistema_apps_api/lumetrix/test_db.php` - Test conexión DB
- `https://tu-dominio.com/sistema_apps_api/lumetrix/db_health.php` - Health check DB
- `https://tu-dominio.com/sistema_apps_api/lumetrix/whoami.php` - Usuario actual
- `https://tu-dominio.com/__ping.php` - Ping general del servidor

⚠️ **IMPORTANTE**: Estos archivos deben protegerse o eliminarse en producción final.

---

## 🎯 Workflow completo recomendado

```bash
# 1. Hacer cambios en código
cd frontend/src/
# ... editar App.jsx ...

# 2. Probar en desarrollo
cd ..
npm run dev
# Probar en http://localhost:5173

# 3. Build para producción
npm run build:hostalia

# 4. Copiar a carpeta de producción
npm run deploy:copy

# 5. (Opcional) Test local
npm run test:smoke

# 6. Subir por FTP
# FileZilla: PARA_HOSTALIA/sistema_apps_upload/ → /sistema_apps_upload/

# 7. Verificar en producción
# https://tu-dominio.com/app_lumetrix.html
```

---

## 📚 Más información

Para detalles completos sobre la arquitectura y proceso de deploy, consultar:

- **INFORME_DESPLIEGUE_HOSTALIA.md** - Informe técnico completo
- **RESUMEN_PROYECTO_LUMETRIX.md** - Resumen del proyecto
- **NIVELES_Y_MECANICAS.md** - Documentación de mecánicas del juego

---

**Última actualización**: 2025-10-08  
**Versión**: 1.0.0

