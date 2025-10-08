<?php
/**
 * LUMETRIX - Configuración de Base de Datos
 * 
 * IMPORTANTE:
 * - Este es un archivo de EJEMPLO
 * - Copiar como config_hostalia.php y editar con credenciales reales
 * - NUNCA subir config_hostalia.php a Git
 * - Este archivo SÍ puede subirse a Git (no contiene credenciales)
 */

// ========================================
// CONFIGURACIÓN DE BASE DE DATOS
// ========================================

// Host de MySQL (generalmente localhost en Hostalia)
define('DB_HOST', 'localhost');

// Nombre de la base de datos
define('DB_NAME', 'sistema_apps');

// Usuario de MySQL
// En Hostalia: generalmente nombreusuario_dbname
define('DB_USER', 'tu_usuario_db');

// Password de MySQL
// ⚠️ Usar password seguro en producción
define('DB_PASS', 'tu_password_aqui');

// ========================================
// CONFIGURACIÓN DE APLICACIÓN
// ========================================

// Código único de esta aplicación
// NO CAMBIAR - usado en tablas compartidas
define('APP_CODIGO', 'lumetrix');

// Entorno de ejecución
// Opciones: 'development' | 'production'
define('ENVIRONMENT', 'production');

// ========================================
// CONFIGURACIÓN DE SEGURIDAD
// ========================================

// Salt para generación de hashes (opcional)
// Cambiar por string aleatorio único
define('APP_SALT', 'lumetrix_salt_cambiar_en_produccion');

// Tiempo de vida de sesión (segundos)
// 604800 = 7 días
define('SESSION_LIFETIME', 604800);

// ========================================
// CONFIGURACIÓN DE SESIONES
// ========================================

// Solo si HTTPS está activo (producción)
// En desarrollo local (HTTP) poner en 0
ini_set('session.cookie_secure', 1);

// Prevenir acceso a cookies desde JavaScript
ini_set('session.cookie_httponly', 1);

// Same-site policy para cookies
ini_set('session.cookie_samesite', 'Strict');

// Tiempo de vida de sesión
ini_set('session.gc_maxlifetime', SESSION_LIFETIME);

// Nombre de cookie de sesión
ini_set('session.name', 'LUMETRIX_SID');

// ========================================
// CONFIGURACIÓN DE ERRORES
// ========================================

if (ENVIRONMENT === 'development') {
    // Desarrollo: mostrar todos los errores
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
} else {
    // Producción: ocultar errores al usuario
    error_reporting(E_ALL);
    ini_set('display_errors', 0);
    ini_set('display_startup_errors', 0);
    ini_set('log_errors', 1);
    
    // Opcional: ruta de log de errores
    // ini_set('error_log', __DIR__ . '/logs/php_errors.log');
}

// ========================================
// TIMEZONE
// ========================================

date_default_timezone_set('Europe/Madrid');

// ========================================
// CHARSET
// ========================================

ini_set('default_charset', 'UTF-8');

// ========================================
// NOTAS DE CONFIGURACIÓN
// ========================================

/*
 * DESARROLLO LOCAL:
 * -----------------
 * DB_HOST: localhost
 * DB_NAME: sistema_apps_dev
 * DB_USER: root
 * DB_PASS: (tu password local de MySQL)
 * ENVIRONMENT: development
 * session.cookie_secure: 0 (porque HTTP local)
 * 
 * PRODUCCIÓN HOSTALIA:
 * --------------------
 * DB_HOST: localhost
 * DB_NAME: (nombre desde cPanel)
 * DB_USER: (usuario desde cPanel - formato: nombreusuario_dbname)
 * DB_PASS: (password configurado en cPanel)
 * ENVIRONMENT: production
 * session.cookie_secure: 1 (porque HTTPS)
 * 
 * INSTRUCCIONES:
 * --------------
 * 1. Copiar este archivo como config_hostalia.php
 * 2. Editar config_hostalia.php con credenciales reales
 * 3. NUNCA hacer commit de config_hostalia.php
 * 4. Subir config_hostalia.php al servidor por FTP
 * 
 * SEGURIDAD:
 * ----------
 * - El archivo _common.php protege config_hostalia.php con .htaccess
 * - No debe ser accesible desde navegador
 * - Permisos recomendados: 600 o 644
 */

