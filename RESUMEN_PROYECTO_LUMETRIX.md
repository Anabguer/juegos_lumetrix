# 📋 RESUMEN PROYECTO LUMETRIX

## 🎮 DESCRIPCIÓN GENERAL
**LUMETRIX** es un juego innovador tipo "anti-Simón" que desafía la memoria tradicional con mecánicas únicas de arrastre y patrones visuales. El juego evoluciona a través de 4 mundos con diferentes mecánicas de juego.

## 🚀 TECNOLOGÍAS UTILIZADAS

### Frontend
- **React 18** + **Vite** (build system)
- **JavaScript ES6+** con hooks (useState, useEffect, useRef, useMemo, useCallback)
- **CSS personalizado** con efectos neon y glassmorphism
- **Web Audio API** para efectos de sonido
- **Drag & Drop API** nativo para mecánicas de arrastre

### Backend
- **PHP 8.2** con servidor embebido
- **MySQL** para base de datos
- **PDO** para conexiones de base de datos
- **Sesiones PHP** para autenticación

### Fuentes y Assets
- **Fuente principal**: Tektur (Google Fonts) - aplicada globalmente
- **Iconos**: PNG personalizados (32x32px recomendado)
  - `ico_ranking.png` - Icono de ranking
  - `ico_config.png` - Icono de configuración  
  - `ico_user.png` - Icono de usuario
  - `logo.png` - Logo horizontal del juego

## 📁 ESTRUCTURA DEL PROYECTO

```
Lumetrix/
├── frontend/                          # Código fuente React
│   ├── src/
│   │   ├── App.jsx                   # Componente principal del juego
│   │   └── entry.jsx                 # Punto de entrada
│   ├── package.json                  # Dependencias npm
│   ├── vite.config.ts                # Configuración Vite
│   └── dist/                         # Build compilado
│       └── game.bundle.js            # Bundle final
├── PARA_HOSTALIA/                    # Archivos de producción
│   └── sistema_apps_upload/          # Servidor PHP
│       ├── app_lumetrix.html         # Página principal
│       ├── php.ini                   # Configuración PHP local
│       ├── .user.ini                 # Configuración PHP usuario
│       └── sistema_apps_api/lumetrix/
│           ├── config_hostalia.php   # Credenciales BD
│           ├── auth.php              # Autenticación
│           ├── game.php              # Lógica del juego
│           ├── ranking.php           # Sistema de ranking
│           ├── js/
│           │   ├── game.bundle.js    # Frontend compilado
│           │   ├── api.js            # API cliente
│           │   ├── auth.js           # Autenticación cliente
│           │   ├── ui.js             # Lógica de UI
│           │   └── main.js           # Inicialización
│           ├── img/                  # Assets del juego
│           └── css/                  # Estilos adicionales
├── _Origen/                          # Versiones anteriores
└── README.md                         # Documentación principal
```

## 🎯 MECÁNICAS DEL JUEGO

### Mundo 1 - Introducción (Niveles 1-10)
- **Mecánica**: Toques simples (antisimón)
- **Fichas**: 4-8 por nivel (progresión: 4,4,5,5,6,6,7,7,8,8)
- **Tiempo**: 35s → 20s (disminuye progresivamente)
- **Objetivo**: Tocar las fichas en el orden correcto

### Mundo 2 - Arrastre (Niveles 11-20)
- **Mecánica**: Arrastra fichas hacia zonas de drop
- **Fichas**: 4-8 por nivel (misma progresión que Mundo 1)
- **Tiempo**: 35s → 20s
- **Zonas de drop**: Fichas con solo borde de color correspondiente
- **Validación**: Si arrastras la ficha correcta → continúa, si no → reset del nivel

### Mundo 3 - Más fichas + Arrastre (Niveles 21-30)
- **Mecánica**: Más fichas + arrastre combinado
- **Fichas**: 5-9 por nivel (+1 respecto a Mundo 1: 5,5,6,6,7,7,8,8,9,9)
- **Tiempo**: 35s → 20s
- **Complejidad**: Mayor número de fichas con mecánica de arrastre

### Mundo 4 - Nueva mecánica (Niveles 31-40)
- **Mecánica**: Preparado para implementar nueva funcionalidad
- **Fichas**: 5-9 por nivel
- **Tiempo**: 35s → 20s
- **Estado**: "Próximamente..."

## 🖥️ PANTALLAS Y FUNCIONALIDADES

### 1. Pantalla de Inicio (Intro)
**Archivo**: `frontend/src/App.jsx` - Componente `Intro`

**Elementos**:
- Logo LUMETRIX (imagen + efecto glow)
- Texto descriptivo: "Esto no es un Simón: es el **anti‑Simón**"
- Instrucciones: "**Encuentra** la secuencia y pinta **todas** las piezas del color del borde"
- Botones dinámicos:
  - **"Jugar"** (siempre visible)
  - **"Iniciar sesión"** o **"Cerrar sesión"** (según estado de autenticación)
- Efectos visuales: figuras animadas + bordes neon

**Estilos aplicados**:
- Fuente Tektur global
- Panel con glassmorphism (backdrop-filter: blur)
- Bordes neon animados
- Responsive para móvil

### 2. Pantalla de Juego Principal
**Archivo**: `frontend/src/App.jsx` - Componente `Game`

**Elementos**:
- **HUD superior**: Mundo (W), Nivel (N), Tiempo (⏱)
- **Tablero de juego**: Grid de fichas con colores
- **Botón EMPEZAR**: Centrado con efectos neon
- **Texto nivel**: "Nivel X • Mundo Y" (Tektur, 16px)
- **Modales**: Ganar/Perder (compactos)

**Mecánicas implementadas**:
- **Mundo 1**: Click/tap en fichas
- **Mundo 2+**: Drag & drop con zonas de drop
- **Validación**: Sonidos diferentes para correcto/incorrecto
- **Feedback visual**: Fichas se iluminan al ser tocadas/arrastradas

### 3. Modal de Ranking
**Funcionalidad**:
- **Ranking dinámico**: Genera jugadores inventados basados en tu tiempo
- **Tu posición**: Destacada con fondo diferente
- **Medallas**: Iconos según posición (🥇🥈🥉)
- **Scrollable**: Lista con scroll si hay muchos jugadores
- **Título**: "RANKING GLOBAL" (sin emoji en título)

### 4. Modal de Configuración
**Elementos**:
- **Sonido**: Toggle on/off
- **Vibración**: Toggle on/off
- **Debug "Ir a nivel"**: 
  - Input para número de nivel
  - Botón "IR" funcional
  - Te lleva al nivel especificado
- **Estilos**: Bordes neon verdes

### 5. Modal de Usuario/Autenticación
**Funcionalidades**:
- **Login**: Usuario/email + contraseña
- **Registro**: Usuario, email, contraseña
- **Validación**: Campos requeridos
- **Estilos**: Bordes neon magenta y cyan
- **Emojis**: En placeholders de inputs

## 🎨 SISTEMA DE DISEÑO

### Colores Principales
- **Neon Verde**: `#39ff14` (botones principales, éxito)
- **Neon Magenta**: `#ff2fbf` (elementos secundarios)
- **Neon Cyan**: `#00e5ff` (elementos terciarios)
- **Fondo**: Negro con transparencias
- **Texto**: Blanco con opacidades variables

### Efectos Visuales
- **Glassmorphism**: `backdrop-filter: blur(20px)`
- **Bordes neon**: Animaciones con `box-shadow`
- **Glow**: `filter: drop-shadow()` en imágenes
- **Transiciones**: `transition: all 0.3s ease`

### Tipografía
- **Fuente global**: Tektur (Google Fonts)
- **Tamaños**:
  - Logo: 48px
  - Botones: 16px
  - Texto descriptivo: 18px
  - HUD: 14px
  - Nivel: 16px

## 🔊 SISTEMA DE AUDIO

### Sonidos Implementados
- **Inicio**: Acorde ascendente (La→Do#→Mi) con sawtooth
- **Ficha correcta**: Nota individual con triangle
- **Ficha incorrecta**: Sonido grave "meck" con sine
- **Victoria**: Melodía corta (5-6 notas)
- **Derrota**: Sonido de error

### Configuración
- **Toggle de sonido**: On/off en configuración
- **Web Audio API**: Para generación de sonidos
- **Vibración**: Soporte móvil con toggle

## 🗄️ BASE DE DATOS

### Tablas (MySQL)
- **usuarios**: id, username, email, password_hash, created_at
- **progreso**: id, user_id, level, total_time_s, success, created_at
- **ranking**: Vista global ordenada por nivel DESC, tiempo ASC

### Credenciales (config_hostalia.php)
```php
DB_HOST: 'PMYSQL165.dns-servicio.com'
DB_USUARIO: 'sistema_apps_user'
DB_CONTRA: 'GestionUploadSistemaApps!'
DB_NOMBRE: '9606966_sistema_apps_db'
DB_PORT: 3306
```

## 🚀 COMANDOS DE DESARROLLO

### Compilar Frontend
```bash
cd frontend
npm run build
copy dist\game.bundle.js ..\PARA_HOSTALIA\sistema_apps_upload\sistema_apps_api\lumetrix\js\
```

### Servidor PHP Local
```bash
cd PARA_HOSTALIA\sistema_apps_upload
php -S 127.0.0.1:3000 -t "." -c "php.ini"
```

### Acceso Local
- **URL**: `http://127.0.0.1:3000/app_lumetrix.html`

## 📱 OPTIMIZACIÓN MÓVIL

### Características Implementadas
- **Diseño responsive**: Flexbox y porcentajes
- **Botones grandes**: Mínimo 44px para touch
- **Fuente Tektur**: Mejor legibilidad en pantallas pequeñas
- **Efectos adaptados**: Bordes neon visibles en móvil
- **Touch events**: pointerdown para compatibilidad móvil

### Breakpoints
- **Móvil**: < 768px (optimizado)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 FUNCIONALIDADES DE DEBUG

### Consola del Navegador
```javascript
// Objeto global para testing
window.LumetrixTest = {
  start(),           // Iniciar nivel
  tapExpected(),     // Tocar ficha esperada
  state()            // Estado actual del juego
}
```

### Modal de Configuración
- **"Ir a nivel"**: Input + botón para saltar a nivel específico
- **Funcional**: Te lleva directamente al nivel especificado

## 📋 CHECKLIST PARA SUBIR A SERVIDOR

### ✅ Archivos Críticos
- [ ] `app_lumetrix.html` (página principal)
- [ ] `sistema_apps_api/lumetrix/js/game.bundle.js` (frontend compilado)
- [ ] `sistema_apps_api/lumetrix/config_hostalia.php` (credenciales BD)
- [ ] `sistema_apps_api/lumetrix/img/` (todos los assets)
- [ ] `php.ini` y `.user.ini` (configuración PHP)

### ✅ Configuración Servidor
- [ ] PHP 8.2+ con extensiones: `pdo_mysql`, `mysqli`
- [ ] MySQL con base de datos configurada
- [ ] Permisos de escritura para sesiones
- [ ] Document root apuntando a `sistema_apps_upload/`

### ✅ Base de Datos
- [ ] Tablas `usuarios` y `progreso` creadas
- [ ] Usuario de BD con permisos correctos
- [ ] Conexión remota habilitada (si es necesario)

## 🎯 ESTADO ACTUAL DEL PROYECTO

### ✅ Completado
- Mundo 1-4 con mecánicas implementadas
- Sistema de drag & drop funcional
- Autenticación y ranking dinámico
- Optimización móvil completa
- Fuente Tektur aplicada globalmente
- Sistema de audio con sonidos distintivos
- Debug funcional "Ir a nivel"
- Proyecto subido a GitHub

### 🔄 Pendiente de Implementar
- Nueva mecánica para Mundo 4
- Más efectos visuales/animaciones
- Sistema de logros/trofeos
- Modo multijugador
- Más mundos (5+)

## 👨‍💻 INFORMACIÓN DE CONTACTO

**Desarrollador**: @intocables13  
**Repositorio**: https://github.com/Anabguer/juegos_lumetrix.git  
**Versión actual**: v1.3  
**Última actualización**: Enero 2025

---

*Este documento contiene toda la información necesaria para continuar el desarrollo del proyecto LUMETRIX. Para cualquier duda, consultar el código fuente o contactar al desarrollador.*

