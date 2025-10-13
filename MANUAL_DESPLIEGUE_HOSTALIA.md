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

## 🎯 Conclusión

Sube solo la carpeta del juego. Las rutas deben apuntar a `/sistema_apps_upload/<juego>/`. Las tablas se enlazan con `usuarios_aplicaciones` mediante `usuario_aplicacion_key`. 

**Con este código funcional de Lumetrix, todos los proyectos se desplegarán sin duplicar carpetas ni romper rutas, con funcionalidad completa de usuarios, sesiones, offline/online y audio.**

**¡Listo para usar en cualquier proyecto nuevo!** 🚀