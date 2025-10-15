# 🔐 Variables de Entorno - Lumetrix

## Frontend (React/Vite)

### ❌ NO HAY variables de entorno en frontend

El frontend de Lumetrix **NO usa** variables de entorno. Todas las configuraciones están hardcodeadas por diseño para simplificar el despliegue en Hostalia.

### Rutas hardcodeadas en código

```javascript
// frontend/src/App.jsx
const ASSET_BASE = 'sistema_apps_api/lumetrix/';

// Rutas de imágenes
'sistema_apps_api/lumetrix/img/logo.png'
'sistema_apps_api/lumetrix/img/logo2.png'
'sistema_apps_api/lumetrix/img/ico_config.png'
'sistema_apps_api/lumetrix/img/ico_ranking.png'
'sistema_apps_api/lumetrix/img/ico_user.png'

// Rutas de audio
'sistema_apps_api/lumetrix/audiofondo.mp3'
'sistema_apps_api/lumetrix/jugar.mp3'
```

### ¿Por qué no hay .env?

1. **Simplicidad**: No hay diferentes entornos (dev/staging/prod) que requieran diferentes configs
2. **Hostalia**: Entorno estático sin Node.js en runtime
3. **Seguridad**: No hay claves sensibles en frontend (todo el backend es PHP)
4. **Build único**: Un solo build sirve para todos los entornos

---

## Backend (PHP)

### ✅ SÍ HAY configuración en PHP

Archivo: `PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/config_hostalia.php`

```php
<?php
// Configuración de base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'sistema_apps');
define('DB_USER', 'usuario_db');
define('DB_PASS', 'password_aqui');

// Código de aplicación
define('APP_CODIGO', 'lumetrix');

// Entorno (development / production)
define('ENVIRONMENT', 'production');

// Configuración de sesiones
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1); // Solo HTTPS
ini_set('session.gc_maxlifetime', 604800); // 7 días
```

### 🚨 IMPORTANTE: Seguridad del archivo de config

**⚠️ NUNCA subir config_hostalia.php a Git**

El archivo `config_hostalia.php` está en `.gitignore` por seguridad.

Para cada entorno, crear una copia con credenciales específicas:

```bash
# Desarrollo local
cp config_hostalia.example.php config_hostalia.php
# Editar con credenciales de desarrollo local

# Producción (en servidor Hostalia)
# Crear config_hostalia.php directamente en servidor vía FTP
# con credenciales de producción
```

### Variables de configuración PHP

| Variable | Descripción | Valor desarrollo | Valor producción |
|----------|-------------|------------------|------------------|
| `DB_HOST` | Host MySQL | `localhost` | `localhost` |
| `DB_NAME` | Nombre BD | `sistema_apps_dev` | `sistema_apps` |
| `DB_USER` | Usuario BD | `root` | `usuario_hostalia` |
| `DB_PASS` | Password BD | `password_dev` | `password_seguro_123` |
| `APP_CODIGO` | Código app | `lumetrix` | `lumetrix` |
| `ENVIRONMENT` | Entorno | `development` | `production` |

### Configuración de sesiones

```php
// Tiempo de vida de sesión (segundos)
ini_set('session.gc_maxlifetime', 604800); // 7 días

// Nombre de cookie de sesión
ini_set('session.name', 'LUMETRIX_SID');

// Solo HTTP (no JavaScript)
ini_set('session.cookie_httponly', 1);

// Solo HTTPS (producción)
ini_set('session.cookie_secure', 1);

// Same-site strict
ini_set('session.cookie_samesite', 'Strict');
```

---

## Configuración de desarrollo local

### 1. PHP con servidor local

```bash
# Opción A: PHP built-in server
cd PARA_HOSTALIA/sistema_apps_upload
php -S localhost:8000

# Acceder a:
# http://localhost:8000/app_lumetrix.html
```

### 2. XAMPP / WAMP / MAMP

```bash
# Copiar proyecto a htdocs/www
cp -r PARA_HOSTALIA/sistema_apps_upload/* /xampp/htdocs/lumetrix/

# Acceder a:
# http://localhost/lumetrix/app_lumetrix.html
```

### 3. Base de datos local

```sql
-- Crear base de datos
CREATE DATABASE sistema_apps_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar base de datos
USE sistema_apps_dev;

-- Importar estructura de tablas (si existe dump)
SOURCE /path/to/lumetrix_schema.sql;

-- O crear tablas manualmente (consultar con backend team)
```

---

## API Endpoints y configuración

### Base URL de API

```javascript
// frontend/PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/js/api.js
const BASE = 'sistema_apps_api/lumetrix/';

async function api(path, opt = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'same-origin',
    headers: { 
      'Content-Type': 'application/json',
      ...(opt.headers || {})
    },
    ...opt,
  });
  return res.json();
}
```

### Endpoints disponibles

| Endpoint | Descripción |
|----------|-------------|
| `auth.php?action=register` | Registro de usuario |
| `auth.php?action=login` | Inicio de sesión |
| `auth.php?action=check_session` | Verificar sesión |
| `game.php?action=save_progress` | Guardar progreso |
| `ranking.php?action=global` | Ranking global |

---

## Configuración de .htaccess

### Variables de PHP en .htaccess

```apache
<IfModule mod_php.c>
  # Ocultar errores en producción
  php_flag display_errors off
  php_flag log_errors on
  
  # Tiempo de sesión
  php_value session.gc_maxlifetime 604800
  
  # Tamaño de uploads
  php_value upload_max_filesize 5M
  php_value post_max_size 8M
</IfModule>
```

---

## Configuración de CORS (si es necesario)

### Desarrollo local con frontend y backend separados

Si estás desarrollando con:
- Frontend en: `http://localhost:5173` (Vite dev server)
- Backend en: `http://localhost:8000` (PHP server)

Necesitas habilitar CORS en PHP:

```php
// Al inicio de cada archivo PHP de API
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
```

### Producción

En producción NO necesitas CORS porque frontend y backend están en el mismo dominio:
- HTML: `https://tu-dominio.com/app_lumetrix.html`
- API: `https://tu-dominio.com/sistema_apps_api/lumetrix/*.php`

---

## Resumen de archivos de configuración

```
Lumetrix/
├── frontend/
│   └── vite.config.ts              ✅ Config de Vite (NO tiene env vars)
│
└── PARA_HOSTALIA/
    └── sistema_apps_upload/
        ├── php.ini                 ✅ Config PHP general
        └── sistema_apps_api/
            └── lumetrix/
                ├── .htaccess       ✅ Config Apache
                └── config_hostalia.php  🔐 Config BD (NO en Git)
```

---

## Checklist de configuración

### Desarrollo local

- [ ] `config_hostalia.php` creado con credenciales locales
- [ ] Base de datos `sistema_apps_dev` creada
- [ ] Tablas de BD creadas
- [ ] PHP >= 8.0 instalado
- [ ] MySQL/MariaDB corriendo
- [ ] Servidor PHP corriendo (built-in o XAMPP)

### Producción Hostalia

- [ ] `config_hostalia.php` creado en servidor con credenciales de producción
- [ ] Base de datos `sistema_apps` creada en cPanel
- [ ] Usuario MySQL creado con permisos necesarios
- [ ] Tablas importadas/creadas
- [ ] `.htaccess` subido y activo
- [ ] Permisos de archivos correctos (644/755)
- [ ] HTTPS activo (SSL configurado)
- [ ] Cookies funcionando

---

## Troubleshooting

### Error: "Connection refused" al llamar API

**Causa**: Base de datos no configurada o credenciales incorrectas.

**Solución**: Verificar `config_hostalia.php` y probar conexión:
```bash
curl https://tu-dominio.com/sistema_apps_api/lumetrix/test_db.php
```

### Error: "Session not found"

**Causa**: Cookies bloqueadas o sesiones PHP no funcionando.

**Solución**: 
1. Verificar que el sitio usa HTTPS
2. Verificar configuración de sesiones en `php.ini`
3. Verificar que navegador acepta cookies

### Error: CORS en desarrollo local

**Causa**: Frontend y backend en diferentes puertos.

**Solución**: Añadir headers CORS en PHP (solo en desarrollo).

---

**Última actualización**: 2025-10-08  
**Versión**: 1.0.0

