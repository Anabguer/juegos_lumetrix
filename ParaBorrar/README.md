# 🎮 Lumetrix - Anti-Simon Memory Game

**Lumetrix** es un juego de memoria inverso tipo "anti-Simon": en lugar de repetir la secuencia mostrada, debes **encontrar** la secuencia correcta que pinte todas las fichas del color del borde.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.3.0-646cff)
![PHP](https://img.shields.io/badge/PHP-8.x-777bb4)

---

## 🎯 Características

- ✨ **50 niveles** progresivos con 5 mundos temáticos
- 🎨 **Colores neón** dinámicos que cambian por nivel
- 🎵 **Melodías procedurales** únicas en cada partida
- 🎮 **3 mecánicas de juego**: toque simple, arrastre, doble toque
- 📱 **Mobile-first**: Optimizado para dispositivos táctiles
- 🔊 **Audio adaptativo**: Música de fondo y efectos de sonido
- 🏆 **Sistema de ranking** con autenticación
- 💾 **Progreso persistente** guardado en base de datos
- 🌐 **100% estático**: Desplegable sin Node.js en producción

---

## 🏗️ Arquitectura

### Frontend
- **Framework**: React 18.2.0
- **Bundler**: Vite 5.3.0 (modo biblioteca)
- **Estilos**: CSS-in-JS (inyectado por React)
- **Audio**: Web Audio API con fallbacks
- **Output**: `game.bundle.js` (ES Module ~150KB)

### Backend
- **Lenguaje**: PHP 8.x
- **Base de datos**: MySQL/MariaDB
- **Autenticación**: PHP Sessions (PHPSESSID)
- **API**: REST endpoints con JSON

### Estructura de proyecto

```
Lumetrix/
├── frontend/                  # Código fuente React
│   ├── src/
│   │   ├── App.jsx           # Componente principal del juego
│   │   └── entry.jsx         # Entry point con export mount/unmount
│   ├── scripts/              # Scripts de build y deploy
│   │   ├── postexport-fix.js    # Genera manifiesto post-build
│   │   ├── deploy-copy.js       # Copia bundle a PARA_HOSTALIA
│   │   └── smoke-test.js        # Test servidor local
│   ├── dist/                 # Output de build (generado)
│   ├── vite.config.ts        # Configuración Vite
│   └── package.json          # Dependencias y scripts
│
├── PARA_HOSTALIA/            # Carpeta lista para subir a servidor
│   └── sistema_apps_upload/
│       ├── app_lumetrix.html        # HTML principal
│       └── sistema_apps_api/
│           └── lumetrix/
│               ├── js/              # JavaScript (incluye bundle)
│               ├── css/             # CSS (opcional, inline en React)
│               ├── img/             # Imágenes del juego
│               ├── *.mp3            # Audio
│               ├── *.php            # API Backend
│               ├── .htaccess        # Configuración Apache
│               └── config_hostalia.php  # Config BD (no en Git)
│
├── _Origen/                  # Código de respaldo histórico
├── INFORME_DESPLIEGUE_HOSTALIA.md   # Auditoría técnica completa
├── GUIA_RAPIDA_DEPLOY.md            # Guía rápida de deployment
├── VARIABLES_ENTORNO.md             # Documentación de configuración
├── CHECKLIST_DEPLOYMENT.md          # Checklist paso a paso
├── NIVELES_Y_MECANICAS.md           # Diseño de niveles
└── README.md                        # Este archivo
```

---

## 🚀 Instalación y desarrollo

### Requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PHP** >= 8.0
- **MySQL/MariaDB** >= 5.7

### Setup de desarrollo

```bash
# 1. Clonar repositorio
git clone https://github.com/Anabguer/juegos_lumetrix.git
cd Lumetrix

# 2. Instalar dependencias frontend
cd frontend
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# Acceder a http://localhost:5173
```

### Build para producción

```bash
cd frontend

# Build completo con manifiesto
npm run build:hostalia

# Copiar bundle a PARA_HOSTALIA
npm run deploy:copy

# (Opcional) Test local
npm run test:smoke
```

---

## 📦 Deployment a Hostalia

Ver documentación completa en:
- **[GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md)** - Deploy en 3 pasos
- **[INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md)** - Auditoría técnica completa
- **[CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md)** - Checklist detallado

### Resumen rápido

```bash
# 1. Build
cd frontend
npm run build:hostalia

# 2. Copiar a producción
npm run deploy:copy

# 3. Subir por FTP
# Upload: PARA_HOSTALIA/sistema_apps_upload/* → /sistema_apps_upload/
```

---

## 🎮 Mecánicas de juego

### Mundo 1 (Niveles 1-10): Introducción
- **Mecánica**: Toque simple
- **Fichas**: 4-8
- **Tiempo**: 35-16 segundos

### Mundo 2-3 (Niveles 11-30): Arrastre
- **Mecánica**: Arrastre de ficha especial
- **Fichas**: 4-9
- **Tiempo**: 32-15 segundos
- **Innovación**: Una ficha debe arrastrarse a zona específica

### Mundo 4 (Niveles 31-40): Doble toque
- **Mecánica**: Mix arrastre + doble toque
- **Fichas**: 5-9
- **Tiempo**: 30-15 segundos
- **Innovación**: Algunas fichas requieren dos toques

### Mundo 5 (Niveles 41-50): Maestría
- **Mecánica**: Combo de todas las mecánicas
- **Fichas**: 6-9
- **Tiempo**: 26-14 segundos
- **Desafío máximo**: Toque, arrastre y doble toque mezclados

Ver especificaciones completas en [NIVELES_Y_MECANICAS.md](./NIVELES_Y_MECANICAS.md)

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React 18.2.0
- Vite 5.3.0
- Web Audio API
- Pointer Events API
- LocalStorage API

### Backend
- PHP 8.x
- MySQL/MariaDB
- PDO (PHP Data Objects)
- bcrypt (password hashing)

### DevOps
- Git (control de versiones)
- FTP (deployment)
- Apache .htaccess

---

## 📖 API Endpoints

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `auth.php?action=register` | POST | Registro de usuario |
| `auth.php?action=login` | POST | Inicio de sesión |
| `auth.php?action=check_session` | GET | Verificar sesión |
| `game.php?action=save_progress` | POST | Guardar progreso |
| `ranking.php?action=global` | GET | Ranking global |

Ver documentación completa de API en [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md#4%EF%B8%8F%E2%83%A3-ssr-y-api-routes---migraci%C3%B3n-a-php)

---

## 🧪 Testing

### Smoke test

```bash
cd frontend
npm run test:smoke
```

Abre `http://localhost:8080/app_lumetrix.html` y verifica:
- Bundle React carga correctamente
- Imágenes cargan (o muestran fallback)
- Audio funciona
- No hay errores 404

### Test de API

```bash
# Verificar conexión a DB
curl https://tu-dominio.com/sistema_apps_api/lumetrix/test_db.php

# Ping general
curl https://tu-dominio.com/__ping.php
```

---

## 🔐 Configuración

### Frontend
**No requiere configuración**. Todas las rutas están hardcodeadas.

### Backend

Crear `config_hostalia.php` desde el ejemplo:

```bash
cd PARA_HOSTALIA/sistema_apps_upload/sistema_apps_api/lumetrix/
cp config_hostalia.example.php config_hostalia.php
# Editar con credenciales reales
```

Ver detalles en [VARIABLES_ENTORNO.md](./VARIABLES_ENTORNO.md)

---

## 🐛 Troubleshooting

### El juego no carga

**Síntomas**: Pantalla en blanco, errores en consola

**Soluciones**:
1. Verificar que `game.bundle.js` existe en `/sistema_apps_api/lumetrix/js/`
2. Verificar acceso directo: `https://tu-dominio.com/sistema_apps_api/lumetrix/js/game.bundle.js`
3. Revisar consola del navegador (F12)

### Audio no suena

**Causa**: Navegadores bloquean audio hasta interacción del usuario

**Solución**: Normal. El audio se activa después del primer click/touch.

### Error 401 en API

**Causa**: Sesión expirada o no autenticado

**Solución**: Hacer login de nuevo

Ver más soluciones en [GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md#troubleshooting)

---

## 📝 Scripts disponibles

```bash
# Desarrollo
npm run dev              # Servidor dev con hot reload

# Build
npm run build            # Build básico
npm run build:hostalia   # Build + manifiesto
npm run deploy:copy      # Copiar a PARA_HOSTALIA

# Testing
npm run test:smoke       # Smoke test local
npm run preview          # Preview de build
```

---

## 🤝 Contribuir

Este es un proyecto privado. Para contribuir:

1. Crear branch desde `master`
2. Hacer cambios y commit
3. Push y crear Pull Request
4. Esperar revisión

---

## 📄 Licencia

© @intocables13 · Todos los derechos reservados

---

## 📞 Soporte

Para dudas o problemas:
1. Revisar documentación en este README
2. Consultar [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md)
3. Revisar logs de PHP en servidor
4. Contactar al desarrollador

---

## 🎉 Créditos

- **Desarrollo**: @intocables13
- **Concepto**: Anti-Simon (memoria inversa)
- **Música**: Melodías procedurales basadas en temas populares
- **Fuentes**: Tektur (Google Fonts)

---

**Versión actual**: 1.0.0  
**Última actualización**: 2025-10-08
