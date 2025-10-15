# ✅ CHECKLIST DE DEPLOYMENT - Lumetrix → Hostalia

## 📋 Antes del deployment

### Código y build

- [ ] **Código actualizado en Git**
  ```bash
  git status
  git add .
  git commit -m "Preparar deployment vX.X.X"
  git push origin master
  ```

- [ ] **Dependencias actualizadas**
  ```bash
  cd frontend
  npm install
  ```

- [ ] **Build exitoso**
  ```bash
  npm run build:hostalia
  # Verificar que no hay errores
  # Verificar que se generó dist/game.bundle.js
  ```

- [ ] **Tamaño de bundle aceptable**
  - Verificar en `dist/deploy_manifest.txt`
  - Ideal: < 200 KB
  - Máximo aceptable: < 500 KB

- [ ] **Archivos copiados a PARA_HOSTALIA**
  ```bash
  npm run deploy:copy
  # Verificar que se copiaron:
  # - game.bundle.js
  # - game.bundle.js.map
  ```

### Testing local (opcional pero recomendado)

- [ ] **Smoke test pasado**
  ```bash
  npm run test:smoke
  # Abrir http://localhost:8080/app_lumetrix.html
  # Verificar que carga sin errores
  # Ctrl+C para ver reporte
  ```

- [ ] **Funcionalidades básicas funcionan**
  - [ ] El juego carga correctamente
  - [ ] Audio reproduce (después de interacción)
  - [ ] Imágenes cargan (o muestran fallback)
  - [ ] Mecánicas del juego funcionan
  - [ ] No hay errores en consola del navegador

### Configuración

- [ ] **Variables de entorno configuradas**
  - Frontend: N/A (no usa .env)
  - Backend: `config_hostalia.php` preparado (NO subir a Git)

- [ ] **.htaccess actualizado**
  - [ ] Archivo existe en `PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/.htaccess`
  - [ ] Reglas de seguridad activas
  - [ ] Compresión GZIP habilitada
  - [ ] Cache de navegador configurado

- [ ] **Archivos de configuración PHP**
  - [ ] `config_hostalia.example.php` en repositorio
  - [ ] `config_hostalia.php` preparado para servidor (credenciales de producción)
  - [ ] ⚠️ `config_hostalia.php` NO está en Git (.gitignore)

---

## 🚀 Durante el deployment

### Backup (recomendado)

- [ ] **Backup de archivos actuales en servidor**
  ```bash
  # En servidor Hostalia (vía SSH o cPanel File Manager)
  cd /sistema_apps_upload/sistema_apps_api/lumetrix/
  cp -r js/ js_backup_$(date +%Y%m%d_%H%M%S)/
  ```

- [ ] **Backup de base de datos** (si hay cambios en schema)
  ```bash
  # En cPanel > phpMyAdmin > Export
  # O vía SSH:
  mysqldump -u usuario -p sistema_apps > backup_$(date +%Y%m%d).sql
  ```

### Subida por FTP

- [ ] **Conexión FTP establecida**
  - Host: ftp.tu-dominio.com
  - Usuario: tu_usuario_ftp
  - Puerto: 21 (o 22 para SFTP)

- [ ] **Archivos subidos**
  ```
  Local:  PARA_HOSTALIA/sistema_apps_upload/*
  Remoto: /sistema_apps_upload/
  ```

- [ ] **Archivos específicos actualizados**
  - [ ] `/sistema_apps_upload/sistema_apps_api/lumetrix/js/game.bundle.js`
  - [ ] `/sistema_apps_upload/sistema_apps_api/lumetrix/js/game.bundle.js.map`
  - [ ] `/sistema_apps_upload/sistema_apps_api/lumetrix/.htaccess`

- [ ] **Estructura de carpetas correcta**
  ```
  /sistema_apps_upload/
  ├── app_lumetrix.html
  ├── __ping.php
  ├── php.ini
  └── sistema_apps_api/
      └── lumetrix/
          ├── .htaccess
          ├── js/
          │   ├── game.bundle.js     ← Actualizado
          │   ├── game.bundle.js.map ← Actualizado
          │   ├── api.js
          │   ├── auth.js
          │   ├── main.js
          │   └── ui.js
          ├── css/
          ├── img/
          ├── *.mp3
          ├── *.php
          └── config_hostalia.php     ← Crear en servidor
  ```

### Configuración en servidor

- [ ] **config_hostalia.php creado** (si no existe)
  - [ ] Copiar desde `config_hostalia.example.php`
  - [ ] Editar con credenciales de producción
  - [ ] Verificar `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`
  - [ ] Configurar `ENVIRONMENT = 'production'`

- [ ] **Permisos de archivos correctos**
  ```bash
  # Directorios: 755
  chmod 755 /sistema_apps_upload/sistema_apps_api/lumetrix/
  chmod 755 /sistema_apps_upload/sistema_apps_api/lumetrix/js/
  chmod 755 /sistema_apps_upload/sistema_apps_api/lumetrix/img/
  
  # Archivos: 644
  chmod 644 /sistema_apps_upload/sistema_apps_api/lumetrix/js/*.js
  chmod 644 /sistema_apps_upload/sistema_apps_api/lumetrix/*.php
  chmod 644 /sistema_apps_upload/sistema_apps_api/lumetrix/.htaccess
  
  # Config sensible: 600 (solo propietario)
  chmod 600 /sistema_apps_upload/sistema_apps_api/lumetrix/config_hostalia.php
  ```

---

## 🧪 Después del deployment

### Verificación básica

- [ ] **Sitio accesible**
  - [ ] `https://tu-dominio.com/app_lumetrix.html` carga
  - [ ] No muestra error 500 o página en blanco

- [ ] **Bundle cargado**
  - [ ] Acceso directo: `https://tu-dominio.com/sistema_apps_api/lumetrix/js/game.bundle.js`
  - [ ] Retorna código JavaScript (no error 404)
  - [ ] Header `Content-Type: application/javascript`

- [ ] **Archivos estáticos accesibles**
  - [ ] Imágenes: `https://tu-dominio.com/sistema_apps_api/lumetrix/img/logo.png`
  - [ ] Audio: `https://tu-dominio.com/sistema_apps_api/lumetrix/audiofondo.mp3`

### Testing funcional

- [ ] **Funcionalidades principales**
  - [ ] Pantalla de intro se muestra
  - [ ] Botón "Jugar" funciona
  - [ ] Nivel se inicia correctamente
  - [ ] Fichas se generan en posiciones aleatorias
  - [ ] Mecánica de toque funciona
  - [ ] Timer cuenta regresivamente
  - [ ] Victoria muestra overlay correcto
  - [ ] Derrota muestra overlay correcto

- [ ] **Audio funciona**
  - [ ] Audio de fondo se reproduce (después de interacción)
  - [ ] Efectos de sonido funcionan
  - [ ] Control de volumen en opciones funciona

- [ ] **Imágenes cargan**
  - [ ] Logo principal visible
  - [ ] Iconos de UI visibles
  - [ ] Fallback a emoji/texto si imagen falla

### Testing de API y autenticación

- [ ] **Endpoints PHP funcionan**
  ```bash
  # Test de ping
  curl https://tu-dominio.com/__ping.php
  
  # Test de DB
  curl https://tu-dominio.com/sistema_apps_api/lumetrix/test_db.php
  ```

- [ ] **Registro de usuario**
  - [ ] Formulario de registro accesible
  - [ ] Registro exitoso crea usuario en BD
  - [ ] Contraseña se hashea correctamente

- [ ] **Inicio de sesión**
  - [ ] Login exitoso con credenciales correctas
  - [ ] Login falla con credenciales incorrectas
  - [ ] Sesión persiste al recargar página

- [ ] **Guardar progreso**
  - [ ] Completar nivel guarda progreso
  - [ ] Nivel actual se actualiza en BD
  - [ ] Tiempo total se acumula

- [ ] **Ranking**
  - [ ] Ranking global muestra datos
  - [ ] Datos ordenados correctamente
  - [ ] Usuario actual aparece en ranking

### Testing de navegadores

- [ ] **Chrome/Edge** (Desktop)
- [ ] **Firefox** (Desktop)
- [ ] **Safari** (Desktop - si disponible)
- [ ] **Chrome** (Android)
- [ ] **Safari** (iOS)

### Verificación de consola

- [ ] **Sin errores críticos en consola**
  - Abrir DevTools (F12)
  - Tab Console
  - No debe haber errores rojos (warnings amarillos son OK)

- [ ] **Network tab limpio**
  - No debe haber requests 404
  - Todos los assets cargan (200 OK)
  - API responses correctas (200 OK o 401/403 esperados)

### Performance

- [ ] **Tiempo de carga aceptable**
  - Tiempo hasta interactivo: < 3 segundos
  - Bundle descarga rápidamente
  - Imágenes optimizadas

- [ ] **Compresión GZIP activa**
  ```bash
  curl -I -H "Accept-Encoding: gzip" https://tu-dominio.com/sistema_apps_api/lumetrix/js/game.bundle.js
  # Verificar header: Content-Encoding: gzip
  ```

### Seguridad

- [ ] **HTTPS activo**
  - [ ] Certificado SSL válido
  - [ ] No hay warnings de "sitio inseguro"
  - [ ] Todas las requests usan HTTPS

- [ ] **Archivos sensibles protegidos**
  ```bash
  # Estos NO deben ser accesibles:
  curl https://tu-dominio.com/sistema_apps_api/lumetrix/config_hostalia.php
  # Debe retornar 403 Forbidden
  
  curl https://tu-dominio.com/sistema_apps_api/lumetrix/_common.php
  # Debe retornar 403 Forbidden
  ```

- [ ] **Headers de seguridad presentes**
  ```bash
  curl -I https://tu-dominio.com/app_lumetrix.html
  ```
  Verificar headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-XSS-Protection: 1; mode=block`

---

## 🔥 Rollback (si algo falla)

### Si el deployment falla

1. **Restaurar backup de archivos**
   ```bash
   cd /sistema_apps_upload/sistema_apps_api/lumetrix/
   rm -rf js/
   cp -r js_backup_YYYYMMDD_HHMMSS/ js/
   ```

2. **Restaurar base de datos** (si se hicieron cambios)
   ```bash
   mysql -u usuario -p sistema_apps < backup_YYYYMMDD.sql
   ```

3. **Limpiar cache de navegador**
   - Ctrl+Shift+R (force reload)
   - Limpiar cache del navegador
   - Probar en ventana de incógnito

4. **Verificar logs de PHP**
   ```bash
   # En cPanel > Error Log
   # O vía SSH:
   tail -f /var/log/apache2/error.log
   ```

---

## 📊 Métricas post-deployment

### Monitoreo en las primeras 24h

- [ ] **Sin errores en logs de PHP**
- [ ] **Sin aumento de errores 500**
- [ ] **Usuarios pueden jugar sin problemas**
- [ ] **Progreso se guarda correctamente**
- [ ] **No hay quejas de rendimiento**

### Métricas a revisar

- Tiempo de carga promedio: _____ segundos
- Tasa de error (HTTP 500): _____ %
- Usuarios activos: _____ jugadores
- Niveles completados: _____ partidas
- Tasa de conversión (login): _____ %

---

## 📝 Notas del deployment

**Fecha**: __________________  
**Versión**: __________________  
**Responsable**: __________________  

**Cambios principales**:
- 
- 
- 

**Problemas encontrados**:
- 
- 

**Soluciones aplicadas**:
- 
- 

**Tiempo total de deployment**: _____ minutos

---

## 🎯 Deployment completado exitosamente

Si todos los checkboxes están marcados:

✅ **DEPLOYMENT EXITOSO**

El juego Lumetrix está ahora en producción y funcionando correctamente.

### Siguientes pasos:

1. Monitorear logs durante las próximas 24 horas
2. Recopilar feedback de usuarios
3. Planificar próximas mejoras
4. Actualizar documentación si es necesario

---

**Última actualización**: 2025-10-08  
**Template versión**: 1.0.0

