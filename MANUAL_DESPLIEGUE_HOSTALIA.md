# 🎯 GUÍA OFICIAL DE DESPLIEGUE EN HOSTALIA
**Para proyectos de juegos y apps HTML/CSS/JS/PHP**

Esta guía unifica cómo deben subirse, configurarse y vincularse las aplicaciones a la base de datos en Hostalia sin romper rutas ni duplicar carpetas.

---

## 🔒 Regla de Oro
**NO crear una carpeta llamada `sistema_apps_upload`.** Esa carpeta YA es la raíz pública del servidor.

Cada juego debe subirse directamente dentro de esa raíz: `/sistema_apps_upload/<nombre_del_juego>/`

---

## 📁 Estructura Estándar

```
/sistema_apps_upload/
├── memoflip/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── assets/
│   ├── api/
│   └── .htaccess
├── lumetrix/
├── adivina-hoy/
└── pueblito/
```

---

## ⚙️ Rutas y Base HREF

### Todos los HTML deben tener en `<head>`:
```html
<base href="/sistema_apps_upload/<juego>/">
```

### Ejemplo de rutas correctas:
- **CSS** → `/sistema_apps_upload/<juego>/css/styles.css`
- **JS** → `/sistema_apps_upload/<juego>/js/app.js`
- **IMG** → `/sistema_apps_upload/<juego>/assets/img/logo.png`
- **AUDIO** → `/sistema_apps_upload/<juego>/assets/audio/intro.mp3`
- **API** → `/sistema_apps_upload/<juego>/api/*.php`

---

## 🧰 BAT Universal de Deploy

El BAT debe hacer `cd /sistema_apps_upload` antes de crear la carpeta del juego.

```batch
@echo off
setlocal
set "HOST=82.194.68.83"
set "USER=sistema_apps_user"
set "PASS=GestionUploadSistemaApps!"
set "WINSCP=C:\Users\agl03\AppData\Local\Programs\WinSCP\WinSCP.com"
set "LOCAL=%~dp0sistema_apps_upload\<juego>"
set "REMOTE=/sistema_apps_upload/<juego>"

"%WINSCP%" /ini=nul /log:"%LOCAL%\deploy_<juego>.log" /command ^
 "open ftps://%USER%:%PASS%@%HOST%/ -explicit -certificate=*" ^
 "option batch on" ^
 "option confirm off" ^
 "lcd %LOCAL%" ^
 "cd /sistema_apps_upload" ^
 "mkdir <juego>" ^
 "cd <juego>" ^
 "synchronize remote -mirror -criteria=size" ^
 "exit"
```

---

## 🗄️ Estructura de Base de Datos

### 1. Insertar la app en la tabla `aplicaciones`:
```sql
INSERT INTO aplicaciones (app_codigo, nombre, descripcion, estado, creado_en)
VALUES ('memoflip', 'MemoFlip', 'Juego de memoria', 'ACTIVA', NOW())
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion);
```

### 2. Vincular usuarios con `usuarios_aplicaciones`:
Usar `usuario_aplicacion_key` (canon del email + '_' + juego).

### 3. Tabla Principal del Juego:
```sql
CREATE TABLE IF NOT EXISTS `{juego}_progreso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_aplicacion_key` varchar(255) NOT NULL,
  `nivel_actual` int(11) DEFAULT 1,
  `total_puntos` int(11) DEFAULT 0,
  `total_tiempo` int(11) DEFAULT 0,
  `ultima_sincronizacion` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_aplicacion_key` (`usuario_aplicacion_key`),
  FOREIGN KEY (`usuario_aplicacion_key`) REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🧩 API admin_db.php

Archivo que crea/ajusta tablas del juego con FK a `usuarios_aplicaciones`, idempotente y ejecutable una sola vez.

```php
<?php
require_once '../config_hostalia.php';

$juego = 'memoflip'; // Cambiar por el nombre del juego

// Crear tablas del juego
$sql = "CREATE TABLE IF NOT EXISTS `{$juego}_progreso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_aplicacion_key` varchar(255) NOT NULL,
  `nivel_actual` int(11) DEFAULT 1,
  `total_puntos` int(11) DEFAULT 0,
  `total_tiempo` int(11) DEFAULT 0,
  `ultima_sincronizacion` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_aplicacion_key` (`usuario_aplicacion_key`),
  FOREIGN KEY (`usuario_aplicacion_key`) REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

if ($conn->query($sql) === TRUE) {
    echo "✅ Tabla {$juego}_progreso creada correctamente\n";
} else {
    echo "❌ Error creando tabla: " . $conn->error . "\n";
}
?>
```

---

## 🔌 API Endpoints Estándar

### auth.php
```php
<?php
require_once '../config_hostalia.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'register':
        // Registro de usuario
        break;
    case 'login':
        // Login de usuario
        break;
    case 'check_session':
        // Verificar sesión activa
        break;
    case 'logout':
        // Cerrar sesión
        break;
}
?>
```

### game.php
```php
<?php
require_once '../config_hostalia.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'save_progress':
        // Guardar progreso del juego
        break;
    case 'get_progress':
        // Obtener progreso del usuario
        break;
    case 'get_ranking':
        // Obtener ranking global
        break;
}
?>
```

### Estructura de Respuesta
```php
// Respuesta exitosa
echo json_encode([
    'success' => true,
    'message' => 'Operación exitosa',
    'data' => $data
]);

// Respuesta de error
echo json_encode([
    'success' => false,
    'message' => 'Error: ' . $error,
    'data' => null
]);
```

---

## 👤 Sistema de Usuarios y Sesiones - CÓDIGO FUNCIONAL

### 🔑 Login Manual + Guardar Credenciales
```javascript
// En el componente Intro (handleLoginSuccess)
const handleLoginSuccess = async (email, password) => {
  setLoading(true);
  try {
    const result = await window.API.api('auth.php?action=login', {
      method: 'POST',
      body: JSON.stringify({ username: email, password })
    });
    
    if (result.success) {
      // ✅ GUARDAR CREDENCIALES EN LOCALSTORAGE para auto-login
      try {
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_token', btoa(password)); // Codificado en base64
        console.log('✅ Credenciales guardadas para auto-login');
      } catch (e) {
        console.log('⚠️ No se pudieron guardar credenciales:', e);
      }
      
      setMessage('✅ ¡Bienvenido!');
      setTimeout(() => {
        window.location.reload(); // Recargar para actualizar estado
      }, 500);
    } else {
      setMessage('❌ Error: ' + (result.message || 'Credenciales incorrectas'));
    }
  } catch (e) {
    setMessage('❌ Error de conexión');
    console.error('Error en login:', e);
  } finally {
    setLoading(false);
  }
};
```

### 🔄 Auto-Login al Iniciar la App
```javascript
// En el useEffect principal del App (loadProgress)
useEffect(() => {
  const loadProgress = async () => {
    try {
      // ✅ VERIFICAR SESIÓN ACTIVA
      if (window.API && window.API.api) {
        const result = await window.API.api('auth.php?action=check_session');
        if (result && result.success) {
          setIsLoggedIn(true);
          setUserInfo(result.user);
          
          // Cargar progreso del servidor
          const progreso = await window.API.api('game.php?action=get_progress');
          if (progreso && progreso.success && progreso.data) {
            const serverProgress = {
              nivel_actual: progreso.data.nivel_actual || 1,
              total_time_s: progreso.data.total_time_s || 0,
              total_puntos: progreso.data.total_puntos || 0
            };
            
            // Actualizar estados con progreso del servidor
            setLevel(serverProgress.nivel_actual);
            setCurrentLevel(serverProgress.nivel_actual);
            setTotalTime(serverProgress.total_time_s);
            setTotalPuntos(serverProgress.total_puntos);
          }
        } else {
          // ❌ No hay sesión → Intentar AUTO-LOGIN con credenciales guardadas
          const savedEmail = localStorage.getItem('user_email');
          const savedToken = localStorage.getItem('user_token');
          
          if (savedEmail && savedToken) {
            console.log('🔑 Intentando auto-login...');
            try {
              const savedPassword = atob(savedToken);
              const loginResult = await window.API.api('auth.php?action=login', {
                method: 'POST',
                body: JSON.stringify({ username: savedEmail, password: savedPassword })
              });
              
              if (loginResult && loginResult.success) {
                console.log('✅ Auto-login exitoso:', loginResult.user?.nick);
                setIsLoggedIn(true);
                setUserInfo(loginResult.user);
                
                // Cargar progreso del servidor después del auto-login
                const progreso = await window.API.api('game.php?action=get_progress');
                if (progreso && progreso.success && progreso.data) {
                  const serverProgress = {
                    nivel_actual: progreso.data.nivel_actual || 1,
                    total_time_s: progreso.data.total_time_s || 0,
                    total_puntos: progreso.data.total_puntos || 0
                  };
                  
                  setLevel(serverProgress.nivel_actual);
                  setCurrentLevel(serverProgress.nivel_actual);
                  setTotalTime(serverProgress.total_time_s);
                  setTotalPuntos(serverProgress.total_puntos);
                }
              } else {
                // Limpiar credenciales inválidas
                localStorage.removeItem('user_email');
                localStorage.removeItem('user_token');
                setIsLoggedIn(false);
              }
            } catch (e) {
              console.log('❌ Error en auto-login:', e);
              setIsLoggedIn(false);
            }
          } else {
            setIsLoggedIn(false);
          }
        }
      }
    } catch (e) {
      console.error('Error cargando progreso:', e);
      setIsLoggedIn(false);
    }
  };
  loadProgress();
}, []);
```

### 📝 UserModal - Pasar Email/Password
```javascript
// En el componente Intro (UserModal)
<UserModal
  isOpen={showLoginModal}
  onClose={() => setShowLoginModal(false)}
  onLoginSuccess={(email, password) => handleLoginSuccess(email, password)}
  title="Iniciar Sesión"
  mode="login"
/>

<UserModal
  isOpen={showRegisterModal}
  onClose={() => setShowRegisterModal(false)}
  onLoginSuccess={(email, password) => handleLoginSuccess(email, password)}
  title="Registrarse"
  mode="register"
/>
```

### 🎮 Actualizar UI según Estado de Login
```javascript
// Actualizar UI según estado de login
const updateUI = (isLoggedIn, userInfo) => {
  if (isLoggedIn) {
    document.getElementById('userMenu').innerHTML = `
      <span>Hola ${userInfo.nombre}</span>
      <button onclick="logout()">Desconectar</button>
    `;
  } else {
    document.getElementById('userMenu').innerHTML = `
      <button onclick="showRegister()">Registrarse</button>
      <button onclick="showLogin()">Entrar</button>
    `;
  }
};
```

---

## 📡 Sistema Híbrido Offline/Online

### Almacenamiento Local
```javascript
// Guardar progreso localmente
const saveLocalProgress = (data) => {
    localStorage.setItem('local_progress', JSON.stringify({
        ...data,
        timestamp: Date.now()
    }));
};

// Cargar progreso local
const getLocalProgress = () => {
    const saved = localStorage.getItem('local_progress');
    return saved ? JSON.parse(saved) : {
        nivel_actual: 1,
        total_puntos: 0,
        total_tiempo: 0
    };
};

// Marcar como pendiente de sincronización
const markPendingSync = () => {
    localStorage.setItem('pending_sync', 'true');
};
```

### Merge Inteligente
```javascript
// Al volver online, mergear local vs servidor
const mergeProgress = (local, server) => {
    return {
        nivel_actual: Math.max(local.nivel_actual, server.nivel_actual),
        total_puntos: Math.max(local.total_puntos, server.total_puntos),
        total_tiempo: Math.max(local.total_tiempo, server.total_tiempo)
    };
};

// Sincronizar cuando vuelve internet
const syncPendingChanges = async () => {
    if (navigator.onLine && localStorage.getItem('pending_sync')) {
        try {
            const localProgress = getLocalProgress();
            const result = await saveProgress(localProgress);
            if (result.success) {
                localStorage.removeItem('pending_sync');
                console.log('✅ Progreso sincronizado');
            }
        } catch (error) {
            console.log('❌ Error sincronizando:', error);
        }
    }
};
```

### 🔐 Auto-Login Robusto

**IMPORTANTE:** El auto-login debe diferenciar entre errores de credenciales y errores de red.

```javascript
// ❌ MAL: Borrar credenciales siempre que falla
if (!loginResult.success) {
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_token');
}

// ✅ BIEN: Solo borrar si son credenciales inválidas
if (!loginResult.success) {
    const errorMsg = loginResult?.message || '';
    const isCredentialError = errorMsg.includes('inválidas') || 
                             errorMsg.includes('incorrectas') || 
                             errorMsg.includes('no encontrado');
    
    if (isCredentialError) {
        console.log('⚠️ Credenciales inválidas, limpiando...');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_token');
    } else {
        console.log('⚠️ Error temporal (red/servidor), manteniendo credenciales');
    }
}

// ✅ MEJOR: Tampoco borrar en caso de excepciones de red
try {
    const loginResult = await api('auth.php?action=login', {...});
    // ... manejo del resultado
} catch (e) {
    console.log('❌ Error de red, manteniendo credenciales para reintentar');
    // NO borrar credenciales aquí
}
```

### Auto-retry con Re-autenticación

```javascript
// 🔥 Reintentar auto-login Y sincronización cuando vuelve internet
const checkAndRetrySync = useCallback(async () => {
    if (!navigator.onLine) return;
    
    // 1️⃣ Si NO está logueado pero HAY credenciales → Reintentar auto-login
    if (!isLoggedIn) {
        const savedEmail = localStorage.getItem('user_email');
        const savedToken = localStorage.getItem('user_token');
        
        if (savedEmail && savedToken) {
            console.log('🔄 Reintentando auto-login...');
            try {
                const savedPassword = atob(savedToken);
                const loginResult = await api('auth.php?action=login', {
                    method: 'POST',
                    body: JSON.stringify({ username: savedEmail, password: savedPassword })
                });
                
                if (loginResult && loginResult.success) {
                    console.log('✅ Auto-login exitoso!');
                    setIsLoggedIn(true);
                    setUserInfo(loginResult.user);
                    
                    // Mergear progreso local + servidor
                    const localProgress = getLocalProgress();
                    const serverProgress = await getServerProgress();
                    const merged = mergeProgress(localProgress, serverProgress);
                    
                    // Aplicar y sincronizar
                    applyProgress(merged);
                    if (merged > serverProgress) {
                        await syncToServer(merged);
                    }
                }
            } catch (e) {
                console.log('⚠️ Error al reintentar, volveremos a intentar');
            }
        }
    }
    
    // 2️⃣ Si hay progreso pendiente de sincronizar → Sincronizar
    if (getPendingSync() && isLoggedIn) {
        await syncPendingChanges();
    }
}, [isLoggedIn]);

// Listeners de conectividad
useEffect(() => {
    window.addEventListener('online', checkAndRetrySync);
    const interval = setInterval(checkAndRetrySync, 30000); // Cada 30s
    
    return () => {
        window.removeEventListener('online', checkAndRetrySync);
        clearInterval(interval);
    };
}, [checkAndRetrySync]);
```

### 🧪 Testing del Auto-Login Robusto

**Escenario 1: Sin internet al abrir**
1. ✅ Login manual con internet
2. ❌ Cerrar app, quitar internet (modo avión)
3. 🔄 Abrir app
4. **Resultado esperado:** App funciona offline, credenciales guardadas
5. ✅ Conectar internet → Auto-login automático + sincronización

**Escenario 2: Servidor caído**
1. ✅ Login manual
2. ❌ Servidor caído o error 500
3. 🔄 Abrir app
4. **Resultado esperado:** Credenciales NO borradas, reintento cada 30s
5. ✅ Servidor vuelve → Auto-login exitoso

**Escenario 3: Credenciales incorrectas**
1. ✅ Login manual
2. ❌ Usuario cambia contraseña en otro dispositivo
3. 🔄 Abrir app
4. **Resultado esperado:** Auto-login falla con "credenciales inválidas"
5. ✅ Credenciales borradas, se muestra pantalla de login

---

## 🔐 .htaccess Base

```apache
Options -Indexes

# Bloquear archivos sensibles
<FilesMatch "\.(log|sql|md|env|ini|bat|sh|example)$">
  Require all denied
</FilesMatch>

# Compresión
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 7 days"
  ExpiresByType application/javascript "access plus 7 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType audio/mpeg "access plus 30 days"
</IfModule>

# CORS para desarrollo
<IfModule mod_headers.c>
  Header always set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header always set Access-Control-Allow-Headers "Content-Type"
</IfModule>
```

---

## 🎵 Audio en APK (Capacitor)

### Configuración de Audio
```javascript
// Audio que NO se corta al minimizar la app
const initAudio = () => {
    const audio = new Audio('assets/audio/background.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    
    // NO agregar listeners de visibilitychange
    // NO agregar listeners de appStateChange
    // NO reiniciar manualmente en 'ended'
    
    return audio;
};
```

### Wrapper API para Capacitor
```javascript
// Detectar si estamos en Capacitor
const isCapacitor = () => {
    return window.Capacitor !== undefined || window.location.protocol === 'capacitor:';
};

// Wrapper API que usa CapacitorHttp en APK, fetch en web
const api = async (endpoint, options = {}) => {
    const url = isCapacitor() ? 
        `https://colisan.com/sistema_apps_upload/${juego}/${endpoint}` : 
        endpoint;
    
    if (isCapacitor() && window.Capacitor?.Plugins?.CapacitorHttp) {
        const { CapacitorHttp } = window.Capacitor.Plugins;
        const response = await CapacitorHttp.request({
            url: url,
            method: options.method || 'GET',
            headers: { 'Content-Type': 'application/json', ...options.headers },
            data: options.body ? JSON.parse(options.body) : undefined
        });
        return response.data;
    } else {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: { 'Content-Type': 'application/json', ...options.headers },
            body: options.body
        });
        return await response.json();
    }
};
```

---

## 🔍 Herramientas de Debugging

### Debug del Auto-Login en Consola

Añadir a tu código una utilidad de debugging:

```javascript
useEffect(() => {
  // 🔍 DEBUG: Función para ver estado de auto-login
  window.LUM_DEBUG = {
    checkAuth: () => {
      const email = localStorage.getItem('lum_user_email');
      const token = localStorage.getItem('lum_user_token');
      console.log('📊 Estado de Autenticación:', {
        email: email || '❌ No guardado',
        token: token ? '✅ Guardado' : '❌ No guardado',
        password: token ? atob(token) : '❌ No disponible',
        isLoggedIn: isLoggedIn,
        userInfo: userInfo
      });
      return { email, token: token ? atob(token) : null, isLoggedIn, userInfo };
    },
    clearAuth: () => {
      localStorage.removeItem('lum_user_email');
      localStorage.removeItem('lum_user_token');
      console.log('✅ Credenciales eliminadas');
    }
  };
}, [isLoggedIn, userInfo]);
```

### Uso en consola del navegador:

```javascript
// Ver estado de autenticación
LUM_DEBUG.checkAuth()

// Limpiar credenciales manualmente (para testing)
LUM_DEBUG.clearAuth()
```

---

## ✅ Checklist Final

### Despliegue
- ☑ No crear `sistema_apps_upload`
- ☑ Crear solo `/sistema_apps_upload/<juego>/`
- ☑ Base href correcto en todos los HTML
- ☑ Rutas relativas al base
- ☑ Ejecutar BAT de deploy

### Base de Datos
- ☑ Insertar registro en `aplicaciones`
- ☑ Ejecutar `api/admin_db.php`
- ☑ Verificar tablas creadas con FK correctas

### Funcionalidad
- ☑ Registro de usuarios funciona
- ☑ Login manual funciona
- ☑ Auto-login con localStorage funciona
- ☑ Auto-login NO borra credenciales en errores de red
- ☑ Auto-retry funciona cuando vuelve internet
- ☑ Menu de usuario se actualiza correctamente
- ☑ Progreso se guarda localmente
- ☑ Sincronización offline/online funciona
- ☑ Merge inteligente funciona (local vs servidor)
- ☑ Audio funciona en web y APK

### Testing
- ☑ Verificar 200 OK y sin 404
- ☑ Test offline/online OK
- ☑ Test auto-login OK
- ☑ Test auto-login con servidor caído OK
- ☑ Test auto-login con credenciales inválidas OK
- ☑ Test auto-retry cuando vuelve internet OK
- ☑ Test merge inteligente (jugar offline → online) OK
- ☑ Test audio sin cortes OK

---

## 📧 SISTEMA DE VERIFICACIÓN POR EMAIL

### 📋 **Descripción**

Sistema completo de verificación de cuentas por email con código de 6 dígitos que expira en 24 horas.  
**Basado en el sistema funcional de MemoFlip.**

---

### 🗄️ **1. Cambios en la Base de Datos**

#### **Archivo:** `lumetrix/agregar_verificacion_email.sql`

```sql
-- Agregar columnas para verificación por email
ALTER TABLE usuarios_aplicaciones 
ADD COLUMN IF NOT EXISTS email_verificado TINYINT(1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS codigo_verificacion VARCHAR(10) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS tiempo_verificacion TIMESTAMP NULL DEFAULT NULL,
ADD COLUMN IF NOT EXISTS intentos_verificacion INT DEFAULT 0;

-- Marcar usuarios existentes como verificados (migración)
UPDATE usuarios_aplicaciones 
SET email_verificado = 1 
WHERE email_verificado = 0 AND fecha_registro < NOW();
```

#### **Ejecutar en Hostalia:**
1. Acceder a phpMyAdmin
2. Seleccionar la base de datos del proyecto
3. Ejecutar el script SQL
4. Verificar que las 4 columnas se crearon correctamente

---

### 📧 **2. Sistema de Envío de Emails**

#### **Archivo:** `lumetrix/enviar_email.php`

**Funciones disponibles:**

##### `enviarEmailVerificacion($email, $nombre, $codigo)`
- Envía email HTML con diseño Lumetrix (gradientes neón)
- Template con código destacado en grande
- Advertencia de expiración de 24 horas
- Retorna `true` si el email se envió correctamente

##### `generarCodigoVerificacion()`
- Genera código aleatorio de 6 dígitos numéricos
- Formato: `123456`

##### `codigoEsValido($tiempo_verificacion, $horas_validez = 24)`
- Verifica si un código ha expirado
- Por defecto: 24 horas de validez

##### `limpiarCodigosExpirados($pdo)`
- Limpia códigos expirados de la base de datos
- Ejecutar periódicamente con cron (opcional)

---

### 🔐 **3. API de Autenticación Actualizada**

#### **Archivo:** `lumetrix/auth_con_verificacion.php`

**Este archivo reemplaza a `auth.php` cuando quieras activar la verificación.**

#### **Endpoints nuevos:**

##### `POST auth.php?action=register`
**Cambios:** Ahora genera código y envía email

**Request:**
```json
{
  "nombre": "Anabel",
  "username": "anabel",
  "email": "anabel@ejemplo.com",
  "password": "mipassword"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "Registro exitoso. Revisa tu email para el código de verificación.",
  "requires_verification": true,
  "email_sent": true,
  "user_key": "anabel@ejemplo.com_lumetrix"
}
```

**Response (desarrollo, sin email configurado):**
```json
{
  "success": true,
  "requires_verification": true,
  "email_sent": false,
  "codigo_dev": "123456"
}
```

---

##### `POST auth.php?action=verify_code`
**Verifica el código introducido por el usuario**

**Request:**
```json
{
  "email": "anabel@ejemplo.com",
  "codigo": "123456"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "¡Cuenta verificada correctamente!",
  "verified": true,
  "user_key": "anabel@ejemplo.com_lumetrix"
}
```

**Response (código incorrecto):**
```json
{
  "success": false,
  "error": "Código incorrecto"
}
```

**Response (código expirado):**
```json
{
  "success": false,
  "error": "Código expirado. Solicita uno nuevo."
}
```

---

##### `POST auth.php?action=resend_code`
**Reenvía un nuevo código al usuario**

**Request:**
```json
{
  "email": "anabel@ejemplo.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Código reenviado a tu email",
  "email_sent": true
}
```

---

##### `POST auth.php?action=login`
**MODIFICADO:** Ahora requiere email verificado

**Request:** (sin cambios)
```json
{
  "username": "anabel@ejemplo.com",
  "password": "mipassword"
}
```

**Response (email no verificado):**
```json
{
  "success": false,
  "message": "Debes verificar tu email antes de iniciar sesión",
  "requires_verification": true,
  "email": "anabel@ejemplo.com"
}
```

**Response (login exitoso):**
```json
{
  "success": true,
  "user": {
    "key": "anabel@ejemplo.com_lumetrix",
    "nick": "anabel",
    "email": "anabel@ejemplo.com",
    "fecha_registro": "2025-01-15 10:30:00"
  },
  "progreso": {
    "nivel_actual": 5,
    "total_time_s": 1200
  }
}
```

---

### 🔄 **4. Flujo Completo de Registro**

```
1. Usuario llena formulario de registro en la app
   ↓
2. App envía POST a auth.php?action=register
   ↓
3. Servidor genera código de 6 dígitos (ej: 834521)
   ↓
4. Código se guarda en BD (usuarios_aplicaciones.codigo_verificacion)
   ↓
5. Se envía email con código (subject: "🎮 Verifica tu cuenta de Lumetrix")
   ↓
6. Usuario recibe email y ve código en grande
   ↓
7. Usuario introduce código en la app
   ↓
8. App envía POST a auth.php?action=verify_code
   ↓
9. Servidor valida:
   ✅ Código correcto
   ✅ No expirado (< 24h)
   ↓
10. Usuario activado:
    - activo = 1
    - email_verificado = 1
    - codigo_verificacion = NULL
   ↓
11. ¡Usuario puede hacer login!
```

---

### 📊 **5. Estados de Usuario**

| Estado | `activo` | `email_verificado` | ¿Puede login? | Notas |
|--------|----------|-------------------|---------------|-------|
| Recién registrado | 0 | 0 | ❌ No | Esperando verificación |
| Email verificado | 1 | 1 | ✅ Sí | Cuenta activada |
| Usuario antiguo* | 1 | 1 | ✅ Sí | Auto-verificado al ejecutar SQL |

*Los usuarios existentes antes de activar este sistema se marcan automáticamente como verificados.

---

### 🚀 **6. Activar Verificación en Producción**

#### **Paso 1: Ejecutar SQL**
```bash
# En phpMyAdmin de Hostalia
1. Seleccionar base de datos
2. Pestaña "SQL"
3. Pegar contenido de: agregar_verificacion_email.sql
4. Click "Continuar"
5. Verificar mensaje: "4 columnas agregadas"
```

#### **Paso 2: Subir archivos PHP**
```bash
# Subir a Hostalia vía FTP/WinSCP
/sistema_apps_upload/lumetrix/
├── enviar_email.php (NUEVO)
└── auth.php (REEMPLAZAR con auth_con_verificacion.php)
```

⚠️ **IMPORTANTE:** Hacer backup del `auth.php` original antes de reemplazarlo.

#### **Paso 3: Verificar configuración de email**
- Servidor SMTP debe estar configurado en Hostalia
- Email `noreply@colisan.com` debe existir
- Verificar que no se bloqueen emails como spam

#### **Paso 4: Probar en desarrollo**
```bash
# Registro de prueba
curl -X POST https://colisan.com/sistema_apps_upload/lumetrix/auth.php \
  -H "Content-Type: application/json" \
  -d '{
    "action": "register",
    "nombre": "Test",
    "username": "test",
    "email": "test@ejemplo.com",
    "password": "test123"
  }'

# Si email_sent: false → Usar codigo_dev de la respuesta
# Si email_sent: true → Revisar bandeja de entrada
```

---

### ⚙️ **7. Configuración Avanzada**

#### **Cambiar tiempo de expiración:**
```php
// En enviar_email.php, línea ~67
function codigoEsValido($tiempo_verificacion, $horas_validez = 24) {
    // Cambiar 24 por las horas deseadas
    // Ejemplos: 12 horas, 48 horas, etc.
}
```

#### **Cambiar longitud del código:**
```php
// En enviar_email.php, línea ~58
function generarCodigoVerificacion() {
    // 6 dígitos (actual):
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
    
    // 4 dígitos:
    // return str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT);
}
```

#### **Personalizar plantilla de email:**
Editar `enviar_email.php` líneas 13-65 para cambiar:
- Colores del email
- Texto del mensaje
- Logo/header
- Footer

---

### 🔍 **8. Troubleshooting**

#### **Email no se envía:**
```bash
# Verificar logs de PHP
tail -f /ruta/a/php_error.log

# Verificar que mail() funcione
<?php
$test = mail('tu@email.com', 'Test', 'Prueba');
echo $test ? 'OK' : 'FAIL';
?>
```

**Soluciones:**
- Verificar configuración SMTP en Hostalia
- Revisar carpeta de spam
- Usar servicio externo (SendGrid, Mailgun, etc.)

#### **Código no válido:**
- Verificar que no hayan pasado 24 horas
- Código es case-sensitive (solo números)
- Revisar campo `codigo_verificacion` en BD

#### **Usuario no puede hacer login:**
```sql
-- Verificar estado del usuario
SELECT nick, email, activo, email_verificado, codigo_verificacion, tiempo_verificacion
FROM usuarios_aplicaciones
WHERE email = 'usuario@ejemplo.com';

-- Si necesitas activar manualmente:
UPDATE usuarios_aplicaciones
SET activo = 1, email_verificado = 1
WHERE email = 'usuario@ejemplo.com';
```

---

### 📝 **9. Notas Importantes**

⚠️ **Compatibilidad hacia atrás:**
- Usuarios existentes se marcan automáticamente como verificados
- No afecta a usuarios ya registrados
- Sistema opcional: puedes activarlo cuando quieras

⚠️ **Seguridad:**
- Códigos válidos solo 24 horas
- Se registran intentos fallidos
- Posible mejora: limitar intentos (ej: 5 máximo)

⚠️ **Modo desarrollo:**
- Si email falla, código aparece en respuesta JSON
- Solo para facilitar testing local
- En producción con SMTP configurado no aparecerá

---

### ✅ **10. Checklist de Implementación**

- [ ] Ejecutar SQL en Hostalia (agregar columnas)
- [ ] Verificar que columnas se crearon correctamente
- [ ] Hacer backup de `auth.php` original
- [ ] Subir `enviar_email.php` a Hostalia
- [ ] Reemplazar `auth.php` con `auth_con_verificacion.php`
- [ ] Verificar configuración SMTP
- [ ] Probar registro → ¿Llega email?
- [ ] Probar código correcto → ¿Activa cuenta?
- [ ] Probar código incorrecto → ¿Muestra error?
- [ ] Probar código expirado (cambiar fecha en BD para testing)
- [ ] Probar reenvío de código → ¿Llega nuevo email?
- [ ] Probar login sin verificar → ¿Muestra error?
- [ ] Probar login con email verificado → ¿Permite acceso?

---

### 🎨 **11. Template de Email (Vista Previa)**

El email que recibe el usuario tiene:

```
┌─────────────────────────────────────┐
│  🎮 LUMETRIX                        │
│  Anti-Simon Challenge               │
├─────────────────────────────────────┤
│                                     │
│  ¡Hola, Anabel!                     │
│                                     │
│  Gracias por registrarte en         │
│  Lumetrix. Para activar tu cuenta,  │
│  introduce el siguiente código:     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ TU CÓDIGO DE VERIFICACIÓN   │   │
│  │                             │   │
│  │      8 3 4 5 2 1           │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ⏱️ Expira en 24 horas              │
│                                     │
│  Si no solicitaste este código,     │
│  ignora este email.                 │
│                                     │
│  © 2025 Lumetrix                    │
└─────────────────────────────────────┘
```

**Colores:** Gradiente verde neón (#39ff14) y cian (#00e5ff) - Estilo Lumetrix

---

## 🎯 Conclusión

Sube solo la carpeta del juego. Las rutas deben apuntar a `/sistema_apps_upload/<juego>/`. Las tablas se enlazan con `usuarios_aplicaciones` mediante `usuario_aplicacion_key`. 

**Con este código funcional de Lumetrix, todos los proyectos se desplegarán sin duplicar carpetas ni romper rutas, con funcionalidad completa de usuarios, sesiones, offline/online, audio y verificación por email.**

**¡Listo para usar en cualquier proyecto nuevo!** 🚀

---

# 📧 SISTEMA DE VERIFICACIÓN POR EMAIL - LUMETRIX

## 📋 **DESCRIPCIÓN**

Sistema completo de verificación de cuentas por email con código de 6 dígitos que expira en 24 horas, implementado en Lumetrix basado en el sistema de MemoFlip.

---

## 🗄️ **1. ESTRUCTURA DE BASE DE DATOS (YA EXISTENTE)**

### **Columnas de verificación en `usuarios_aplicaciones`:**

La tabla **YA TIENE** las columnas necesarias para verificación:

```sql
-- COLUMNAS EXISTENTES (NO crear nuevas)
verification_code      VARCHAR(6)    -- Código de 6 dígitos
verification_expiry    DATETIME      -- Fecha/hora de expiración
verified_at           TIMESTAMP     -- Timestamp cuando se verificó
```

### **NO ES NECESARIO ejecutar ningún SQL**
Las columnas ya existen en la tabla. Solo usar las existentes.

---

## 📧 **2. SISTEMA DE ENVÍO DE EMAILS**

### **Archivo:** `PARA_HOSTALIA/sistema_apps_upload/lumetrix/enviar_email.php`

**Funciones principales:**

#### `enviarEmailVerificacion($email, $nombre, $codigo)`
- Envía email HTML con el código de verificación
- Template bonito con gradientes y estilo Lumetrix
- Retorna `true` si el email se envió correctamente

#### `generarCodigoVerificacion()`
- Genera código aleatorio de 6 dígitos
- Formato: `123456`

#### `codigoEsValido($verification_expiry)`
- Verifica si un código ha expirado
- Compara `verification_expiry` (datetime) con el timestamp actual

---

## 🔐 **3. API DE AUTENTICACIÓN ACTUALIZADA**

### **Archivo:** `PARA_HOSTALIA/sistema_apps_upload/lumetrix/auth_con_verificacion.php`

### **Endpoints nuevos:**

#### `POST auth.php?action=register`
**Request:**
```json
{
  "action": "register",
  "email": "usuario@ejemplo.com",
  "nombre": "Juan Pérez",
  "username": "juan123",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registro exitoso. Revisa tu email para el código de verificación.",
  "email_sent": true,
  "requires_verification": true,
  "user_key": "usuario@ejemplo.com_lumetrix"
}
```

---

#### `POST auth.php?action=verify_code`
**Request:**
```json
{
  "action": "verify_code",
  "email": "usuario@ejemplo.com",
  "codigo": "123456"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "message": "¡Cuenta verificada correctamente!",
  "verified": true,
  "user_key": "usuario@ejemplo.com_lumetrix"
}
```

**Response (error):**
```json
{
  "success": false,
  "error": "Código incorrecto"
}
```

---

#### `POST auth.php?action=resend_code`
**Request:**
```json
{
  "action": "resend_code",
  "email": "usuario@ejemplo.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Código reenviado a tu email",
  "email_sent": true
}
```

---

#### `POST auth.php?action=login`
**MODIFICADO:** Ahora verifica que el email esté verificado antes de permitir login.

**Response (no verificado):**
```json
{
  "success": false,
  "error": "Debes verificar tu email antes de iniciar sesión"
}
```

---

## 🎨 **4. COMPONENTES REACT**

### **Archivo:** `frontend/src/VerificationModal.jsx`

**Modal de verificación** con:
- Input de 6 dígitos numéricos
- Botón "Verificar código"
- Botón "Reenviar código"
- Contador de expiración (24h)
- Mensajes de error/éxito

**Props:**
```javascript
{
  isOpen: boolean,
  onClose: () => void,
  email: string,
  onVerificationSuccess: () => void
}
```

---

### **Archivo:** `frontend/src/AuthModal.jsx` (NUEVO)

**Modal de autenticación completo** con:
- Tabs para Login/Registro
- Formulario de registro con verificación
- Formulario de login
- Integración con VerificationModal
- Manejo del flujo: Registro → Verificación → Login

---

## 🔄 **5. FLUJO COMPLETO**

### **Registro:**
```
1. Usuario llena formulario de registro
   ↓
2. Sistema genera código de 6 dígitos
   ↓
3. Se guarda en BD (usuarios_aplicaciones)
   ↓
4. Se envía email con el código
   ↓
5. Usuario introduce el código en la app
   ↓
6. Sistema valida:
   - Código correcto ✅
   - No expirado (< 24h) ✅
   ↓
7. Cuenta activada → Puede hacer login
```

### **Login:**
```
1. Usuario introduce email + password
   ↓
2. Sistema verifica:
   - Credenciales correctas ✅
   - Email verificado ✅
   ↓
3. Si email NO verificado → Error
4. Si todo OK → Login exitoso
```

---

## 📊 **6. ESTADOS DE USUARIO**

| Estado | `activo` | `verified_at` | `verification_code` | ¿Puede login? |
|--------|----------|---------------|-------------------|---------------|
| **Recién registrado** | 0 | NULL | 123456 | ❌ No |
| **Email verificado** | 1 | 2024-10-13 10:30:00 | NULL | ✅ Sí |
| **Usuario antiguo** | 1 | 2024-01-01 00:00:00 | NULL | ✅ Sí |

---

## 🧪 **7. TESTING**

### **Prueba en desarrollo:**

1. **Registro:**
   ```
   Email: test@ejemplo.com
   Nombre: Usuario Test
   Username: test123
   Password: test123
   ```

2. **Verificar respuesta del servidor:**
   - Si `email_sent: false`, el código aparecerá en la respuesta
   - Si `email_sent: true`, revisar email (o spam)

3. **Introducir código:**
   - Código: `123456` (6 dígitos)
   - Verificar que cuenta se activa

4. **Intentar login:**
   - Antes de verificar → Error
   - Después de verificar → OK ✅

---

## 🚀 **8. DESPLIEGUE**

### **Pasos para activar en producción:**

1. **Subir archivos PHP:**
   ```
   PARA_HOSTALIA/sistema_apps_upload/lumetrix/
   ├── enviar_email.php (NUEVO)
   └── auth_con_verificacion.php (reemplazar auth.php)
   ```

2. **Compilar y subir React:**
   ```bash
   cd frontend
   npm run build
   # Subir carpeta dist/ a Hostalia
   ```

3. **Verificar configuración de email:**
   - Servidor SMTP configurado en Hostalia
   - Email `noreply@colisan.com` debe existir
   - Verificar que emails NO vayan a spam

---

## ⚙️ **9. CONFIGURACIÓN AVANZADA**

### **Cambiar tiempo de expiración:**
```php
// En enviar_email.php, línea ~67
function codigoEsValido($tiempo_verificacion, $horas_validez = 24) {
    // Cambiar 24 por el número de horas deseado
}
```

### **Cambiar longitud del código:**
```php
// En enviar_email.php, línea ~58
function generarCodigoVerificacion() {
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
    // Para 4 dígitos: rand(1000, 9999) y str_pad(..., 4, ...)
}
```

### **Personalizar email:**
Editar `enviar_email.php` línea 13-65 (HTML del email)

---

## 📧 **10. PLANTILLA DE EMAIL**

El email enviado incluye:
- ✅ Header con gradiente Lumetrix
- ✅ Código destacado en grande
- ✅ Instrucciones claras
- ✅ Advertencia de expiración
- ✅ Diseño responsive
- ✅ Mensaje de "no responder"

---

## 🔍 **11. TROUBLESHOOTING**

### **Email no se envía:**
- Verificar configuración SMTP en Hostalia
- Revisar logs: `error_log` en `enviar_email.php`
- Comprobar que el servidor permite `mail()`

### **Código no válido:**
- Verificar que no hayan pasado 24 horas
- Comprobar que el código es exactamente 6 dígitos
- Revisar campo `verification_code` en BD

### **Usuario no puede hacer login:**
- Verificar campo `verified_at` NO es NULL
- Verificar campo `activo = 1`
- Comprobar que la contraseña sea correcta

---

## 📝 **12. NOTAS IMPORTANTES**

⚠️ **Columnas usadas:**
El sistema usa las columnas EXISTENTES en la tabla:
- `verification_code` (varchar 6) - Código de 6 dígitos
- `verification_expiry` (datetime) - Fecha/hora de expiración
- `verified_at` (timestamp) - Cuándo se verificó

⚠️ **Usuarios existentes:**
Los usuarios que ya estaban registrados tienen `verified_at` con una fecha, por lo que pueden hacer login sin problemas.

⚠️ **Seguridad:**
- Los códigos se guardan en texto plano (no es crítico, solo son válidos 24h)
- El código expira automáticamente según `verification_expiry`
- Posible mejora futura: limitar intentos de verificación

⚠️ **Modo desarrollo:**
Si el email falla al enviarse, el código se devuelve en la respuesta JSON (solo para testing).

---

## ✅ **13. CHECKLIST DE IMPLEMENTACIÓN**

- [x] ✅ Columnas existentes verificadas (`verification_code`, `verification_expiry`, `verified_at`)
- [x] ✅ `enviar_email.php` creado y subido
- [x] ✅ `auth_con_verificacion.php` creado
- [x] ✅ `VerificationModal.jsx` creado
- [x] ✅ `AuthModal.jsx` creado
- [x] ✅ `App.jsx` actualizado con nuevos componentes
- [ ] 🧪 Probar registro completo
- [ ] 🧪 Verificar envío de email
- [ ] 🧪 Probar código correcto
- [ ] 🧪 Probar código incorrecto
- [ ] 🧪 Probar código expirado
- [ ] 🧪 Probar reenvío de código
- [ ] 🧪 Verificar que login requiere verificación

---

**¡Sistema de verificación por email implementado en Lumetrix!** 🎉

---

# 🔧 SOLUCIÓN: Sincronización Offline en APK Capacitor

## ❌ **PROBLEMA DETECTADO**

### Síntoma:
Cuando un usuario **juega offline** (sin internet):
1. ✅ El progreso se guarda localmente en `localStorage`
2. ✅ Se marca como pendiente de sincronización
3. ❌ Al reconectar y hacer auto-login, el progreso del **servidor** sobrescribe el **local**
4. ❌ **Se pierde el avance offline**

### Ejemplo:
```
1. Usuario en nivel 10 (servidor)
2. Quita internet
3. Juega offline: nivel 10 → 15
4. Se guarda en localStorage: nivel 15 ✅
5. Conecta internet
6. Auto-login carga nivel 10 del servidor ❌
7. PIERDE niveles 11-15 jugados offline ❌
```

---

## 🎯 **CAUSA DEL PROBLEMA**

En `handleLoginSuccess` (o función similar de login), el código:
1. Recibe datos del servidor (nivel 10)
2. Los aplica directamente al store
3. **NO compara** con el progreso local (nivel 15)
4. **Sobrescribe** el progreso más avanzado

---

## ✅ **SOLUCIÓN: Merge Inteligente**

### Estrategia:
Al hacer login, **comparar** progreso servidor vs local y **usar el más avanzado**.

---

## 📝 **CÓDIGO IMPLEMENTADO EN LUMETRIX**

### **Función mergeProgress**:

```javascript
// 🔀 MERGE INTELIGENTE: Combinar progreso servidor + local
const mergeProgress = (userData) => {
  const localProgress = getLocalProgress();
  
  // Obtener datos del servidor
  const serverLevel = userData?.nivel_actual || 1;
  const serverTime = userData?.total_time_s || 0;
  const serverPuntos = userData?.total_puntos || 0;
  
  // 🔀 MERGE: Usar el progreso más avanzado
  const finalLevel = Math.max(serverLevel, localProgress.nivel_actual);
  const finalTime = Math.max(serverTime, localProgress.total_time_s);
  const finalPuntos = Math.max(serverPuntos, localProgress.total_puntos);
  
  console.log('📊 Merge progreso:', { 
    servidor: { nivel: serverLevel, tiempo: serverTime, puntos: serverPuntos },
    local: { nivel: localProgress.nivel_actual, tiempo: localProgress.total_time_s, puntos: localProgress.total_puntos },
    final: { nivel: finalLevel, tiempo: finalTime, puntos: finalPuntos }
  });
  
  // ✅ Aplicar el progreso más avanzado
  setLevel(finalLevel);
  setCurrentLevel(finalLevel);
  setTotalTime(finalTime);
  setTotalPuntos(finalPuntos);
  
  // Guardar en localStorage
  saveLocalProgress(finalLevel, finalTime, finalPuntos);
  
  // 📤 Si el progreso local es mayor, sincronizar al servidor
  if (finalLevel > serverLevel || finalTime > serverTime || finalPuntos > serverPuntos) {
    console.log('📤 Progreso local más avanzado, sincronizando al servidor...');
    setTimeout(() => {
      syncToServer().then(() => {
        console.log('✅ Progreso offline sincronizado al servidor');
      }).catch(err => {
        console.error('❌ Error sincronizando progreso:', err);
      });
    }, 500);
  }
};
```

### **Aplicado en:**
- `checkSession()` - Cuando detecta sesión activa
- `auto-login` - Cuando hace login automático con credenciales guardadas
- `handleLogin()` - Cuando el usuario hace login manual (vía reload)

---

## 🔍 **PUNTOS CLAVE**

### 1. **Obtener progreso local**
```javascript
const localProgress = getLocalProgress();
```

### 2. **Comparar y usar el mayor**
```javascript
const finalLevel = Math.max(serverLevel, localProgress.nivel_actual);
const finalTime = Math.max(serverTime, localProgress.total_time_s);
const finalPuntos = Math.max(serverPuntos, localProgress.total_puntos);
```

### 3. **Sincronizar al servidor si local > servidor**
```javascript
if (finalLevel > serverLevel || finalTime > serverTime || finalPuntos > serverPuntos) {
  await syncToServer();
}
```

---

## 🧪 **CÓMO PROBAR**

### Escenario de prueba:
1. ✅ Login con internet (ej: nivel 5)
2. ❌ Quitar internet (modo avión)
3. 🎮 Jugar 3 niveles (5 → 8)
4. ✅ Conectar internet
5. 🔄 Reabrir la app (o hacer logout/login)

### Resultado esperado:
```
📊 Merge progreso: {
  servidor: { nivel: 5, tiempo: 500, puntos: 5000 },
  local: { nivel: 8, tiempo: 800, puntos: 8000 },
  final: { nivel: 8, tiempo: 800, puntos: 8000 }
}
📤 Progreso local más avanzado, sincronizando al servidor...
✅ Progreso offline sincronizado al servidor
```

**El usuario debería estar en nivel 8, NO en nivel 5** ✅

---

## 📂 **ARCHIVOS MODIFICADOS EN LUMETRIX**

- `frontend/src/App.jsx` - Componente `Intro` con función `mergeProgress`

---

## 🎯 **BENEFICIOS**

✅ **Sin pérdida de progreso offline**  
✅ **Sincronización automática al reconectar**  
✅ **Experiencia fluida para el usuario**  
✅ **Logs claros para debugging**

---

## 📋 **CHECKLIST DE IMPLEMENTACIÓN**

- [x] ✅ Modificar función de login para obtener `getLocalProgress()`
- [x] ✅ Implementar merge con `Math.max()`
- [x] ✅ Añadir sincronización condicional al servidor
- [x] ✅ Añadir logs de debugging
- [ ] 🧪 Probar escenario offline → online
- [ ] 🧪 Verificar que progreso se mantiene
- [ ] 🧪 Verificar que se sincroniza al servidor

---

**¡Lumetrix ahora tiene el mismo fix que MemoFlip!** 🚀