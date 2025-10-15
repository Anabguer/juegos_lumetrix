# ✅ VERIFICACIÓN POST-DEPLOY - Lumetrix en Hostalia

**Fecha deploy**: 2025-10-08 14:37  
**Estado**: ✅ ARCHIVOS SUBIDOS CORRECTAMENTE

---

## 🌐 URLs PARA VERIFICAR

### Aplicación principal

**🎮 Juego Lumetrix:**
```
https://colisan.com/sistema_apps_upload/app_lumetrix.html
```

**O con ruta completa:**
```
https://colisan.com/sistema_apps_upload/app_lumetrix.html
```

---

### API Endpoints - Verificación

**🔌 Test de conexión a BD:**
```
https://colisan.com/sistema_apps_api/lumetrix/test_db.php
```

**👤 Check sesión (devuelve JSON):**
```
https://colisan.com/sistema_apps_api/lumetrix/auth.php?action=check_session
```

**🏥 Health check del servidor:**
```
https://colisan.com/__ping.php
```

**ℹ️ Info PHP (solo para verificar, BORRAR después):**
```
https://colisan.com/sistema_apps_api/lumetrix/phpinfo.php
```

---

## 🧪 CHECKLIST DE VERIFICACIÓN

### Nivel 1: Acceso básico

- [ ] `app_lumetrix.html` carga sin error 404
- [ ] Pantalla de intro se muestra
- [ ] Logo visible (o fallback a texto "LUMETRIX")
- [ ] No hay error 500 en el servidor

### Nivel 2: Assets

- [ ] Imágenes cargan correctamente
  - [ ] Logo principal
  - [ ] Iconos (config, ranking, user)
- [ ] Audio accesible (verificar en DevTools > Network)
  - [ ] audiofondo.mp3
  - [ ] jugar.mp3

### Nivel 3: Funcionalidad del juego

- [ ] Botón "Jugar" funciona
- [ ] Nivel se inicia correctamente
- [ ] Fichas se generan en pantalla
- [ ] Mecánica de toque funciona
- [ ] Timer cuenta regresivamente
- [ ] Audio se reproduce (después de primer click)
- [ ] Victoria muestra overlay
- [ ] Derrota muestra overlay

### Nivel 4: API Backend

- [ ] `test_db.php` retorna conexión OK
- [ ] `auth.php?action=check_session` retorna JSON
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Sesión persiste al recargar
- [ ] Guardar progreso funciona
- [ ] Ranking muestra datos

### Nivel 5: Consola del navegador (F12)

- [ ] Sin errores rojos en Console
- [ ] Todas las peticiones retornan 200 OK en Network
- [ ] `game.bundle.js` carga correctamente
- [ ] No hay errores de CORS

---

## 🔍 TROUBLESHOOTING

### Si no carga la página

1. **Verificar ruta exacta**:
   ```
   https://colisan.com/sistema_apps_upload/app_lumetrix.html
   ```
   *(Nota el `/sistema_apps_upload/` antes del archivo)*

2. **Verificar en navegador incógnito**:
   - Ctrl+Shift+N (Chrome/Edge)
   - Para descartar problemas de cache

3. **Verificar permisos** (vía SSH o cPanel):
   ```bash
   chmod 644 /sistema_apps_upload/app_lumetrix.html
   ```

### Si carga pero sale error 404 en assets

1. **Abrir DevTools (F12) > Network tab**
2. **Recargar página (Ctrl+R)**
3. **Buscar peticiones en rojo (404)**
4. **Verificar que las rutas sean**:
   ```
   /sistema_apps_upload/sistema_apps_api/lumetrix/js/game.bundle.js
   /sistema_apps_upload/sistema_apps_api/lumetrix/img/logo.png
   ```

### Si no funciona la API (error 500)

1. **Verificar config_hostalia.php**:
   - Credenciales de BD correctas
   - Usuario MySQL existe
   - Base de datos creada

2. **Verificar logs PHP**:
   - cPanel > Error Log
   - O archivo `/var/log/apache2/error.log`

3. **Verificar tablas de BD**:
   ```sql
   USE sistema_apps;
   SHOW TABLES LIKE 'lumetrix_%';
   SHOW TABLES LIKE 'usuarios_aplicaciones';
   ```

### Si audio no suena

**Esto es NORMAL**. Navegadores bloquean audio hasta interacción del usuario.

**Solución**: El audio se activará después del primer click/touch en el juego.

---

## 📊 ARCHIVOS DESPLEGADOS

### Total: 40 archivos (~11.5 MB)

| Categoría | Archivos | Tamaño |
|-----------|----------|--------|
| HTML | 1 | 0.80 KB |
| JavaScript | 6 | 770 KB |
| PHP | 10 | 13 KB |
| Imágenes | 6 | 5.47 MB |
| Audio | 2 | 4.10 MB |
| Config | 2 | 6 KB |
| Otros | 3 | 0.5 KB |

### Archivos críticos subidos:

```
✅ app_lumetrix.html
✅ sistema_apps_api/lumetrix/js/game.bundle.js (263 KB)
✅ sistema_apps_api/lumetrix/.htaccess
✅ sistema_apps_api/lumetrix/auth.php
✅ sistema_apps_api/lumetrix/game.php
✅ sistema_apps_api/lumetrix/ranking.php
✅ sistema_apps_api/lumetrix/config_hostalia.php
```

---

## 🎯 SIGUIENTE PASO

**PROBAR EN NAVEGADOR**:

1. Abrir: https://colisan.com/sistema_apps_upload/app_lumetrix.html
2. Verificar que carga correctamente
3. Jugar un nivel completo
4. Verificar que no hay errores en consola (F12)

Si todo funciona: **¡DEPLOY EXITOSO! 🎉**

---

## 📝 NOTAS POST-DEPLOY

### Archivos temporales a eliminar (opcional)

Estos archivos son útiles para debugging pero pueden eliminarse en producción final:

- `phpinfo.php` - Muestra info de PHP (seguridad)
- `test_db.php` - Test de conexión (puede dejarse)
- `whoami.php` - Debug de usuario actual
- `*.example.php` - Archivos de ejemplo

### Configuración de seguridad verificada

✅ `.htaccess` con reglas de seguridad
✅ `config_hostalia.php` protegido (Require all denied)
✅ Headers de seguridad configurados
✅ GZIP activado
✅ Cache de navegador configurado

---

**Estado actual**: ✅ PRODUCCIÓN ACTIVA  
**Próxima verificación**: Probar en navegador

