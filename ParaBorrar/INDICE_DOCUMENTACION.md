# 📚 ÍNDICE DE DOCUMENTACIÓN - Lumetrix

Este documento sirve como índice de toda la documentación del proyecto Lumetrix.

---

## 🎯 Para empezar

| Documento | Descripción | Cuándo usarlo |
|-----------|-------------|---------------|
| **[README.md](./README.md)** | Documentación principal del proyecto | Primera lectura, overview general |
| **[GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md)** | Deploy en 3 pasos | Cuando necesites subir a producción rápidamente |

---

## 📖 Documentación técnica completa

### Arquitectura y despliegue

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| **[INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md)** | Auditoría técnica completa (9 secciones) | Desarrolladores, DevOps |
| **[VARIABLES_ENTORNO.md](./VARIABLES_ENTORNO.md)** | Configuración de variables de entorno | Desarrolladores, SysAdmin |
| **[CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md)** | Checklist paso a paso para deploy | DevOps, QA |

### Diseño y mecánicas

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| **[NIVELES_Y_MECANICAS.md](./NIVELES_Y_MECANICAS.md)** | Especificación de niveles y mecánicas | Game Designers, Desarrolladores |
| **[ESPECIFICACION_NIVELES_LUMETRIX.md](./ESPECIFICACION_NIVELES_LUMETRIX.md)** | Especificación detallada de niveles | Game Designers |
| **[RESUMEN_PROYECTO_LUMETRIX.md](./RESUMEN_PROYECTO_LUMETRIX.md)** | Resumen ejecutivo del proyecto | Stakeholders, Product Owners |

---

## 📂 Por tipo de tarea

### 🚀 Deployment y producción

1. **Primera vez desplegando**
   - [ ] Leer [README.md](./README.md) sección "Deployment"
   - [ ] Leer [GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md)
   - [ ] Revisar [CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md)

2. **Deploy recurrente (actualizaciones)**
   - [ ] [GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md) - Sección "Deploy en 3 pasos"
   - [ ] [CHECKLIST_DEPLOYMENT.md](./CHECKLIST_DEPLOYMENT.md) - Solo secciones relevantes

3. **Troubleshooting de deploy**
   - [ ] [GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md#troubleshooting)
   - [ ] [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Sección 9 (Informe corto)

### 🛠️ Desarrollo

1. **Setup inicial de desarrollo**
   - [ ] [README.md](./README.md) - Sección "Instalación y desarrollo"
   - [ ] [VARIABLES_ENTORNO.md](./VARIABLES_ENTORNO.md) - Sección "Desarrollo local"

2. **Añadir nueva mecánica de juego**
   - [ ] [NIVELES_Y_MECANICAS.md](./NIVELES_Y_MECANICAS.md) - Revisar mecánicas existentes
   - [ ] `frontend/src/App.jsx` - Implementar en código

3. **Modificar niveles**
   - [ ] [ESPECIFICACION_NIVELES_LUMETRIX.md](./ESPECIFICACION_NIVELES_LUMETRIX.md)
   - [ ] `frontend/src/App.jsx` - Variable `LEVEL_CONFIG`

### 🔧 Configuración

1. **Configurar base de datos**
   - [ ] [VARIABLES_ENTORNO.md](./VARIABLES_ENTORNO.md) - Sección "Backend (PHP)"
   - [ ] `PARA_HOSTALIA/.../config_hostalia.example.php`

2. **Configurar servidor web**
   - [ ] [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Sección 6 (.htaccess)
   - [ ] `PARA_HOSTALIA/.../lumetrix/.htaccess`

3. **Configurar API endpoints**
   - [ ] [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Sección 4 (API routes)
   - [ ] [README.md](./README.md) - Sección "API Endpoints"

### 🧪 Testing

1. **Smoke test local**
   - [ ] [GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md) - Sección "Testing"
   - [ ] `frontend/scripts/smoke-test.js`

2. **Test de API**
   - [ ] [README.md](./README.md) - Sección "Testing"
   - [ ] Archivos `test_*.php` en servidor

### 📊 Análisis y auditoría

1. **Auditoría técnica completa**
   - [ ] [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Todas las secciones

2. **Resumen ejecutivo**
   - [ ] [RESUMEN_PROYECTO_LUMETRIX.md](./RESUMEN_PROYECTO_LUMETRIX.md)

---

## 📖 Estructura del INFORME_DESPLIEGUE_HOSTALIA.md

El informe principal tiene 9 secciones:

1. **Detección de stack y bloqueo SSR** - Análisis del framework y arquitectura
2. **Plan de build para estático puro** - Configuración de Vite y proceso de build
3. **Rutas y assets para Hostalia** - Estructura de carpetas y rutas
4. **SSR y API routes** - Migración a PHP y documentación de endpoints
5. **Build script y artefactos** - Scripts NPM y proceso automatizado
6. **.htaccess y permisos** - Configuración de Apache
7. **Smoke test automático** - Testing local simulando producción
8. **Entregables finales** - Archivos para producción
9. **Informe corto** - Resumen ejecutivo

---

## 🗂️ Archivos de código relevantes

### Scripts de deployment

| Archivo | Descripción |
|---------|-------------|
| `frontend/scripts/postexport-fix.js` | Genera manifiesto post-build |
| `frontend/scripts/deploy-copy.js` | Copia bundle a PARA_HOSTALIA |
| `frontend/scripts/smoke-test.js` | Test servidor local |

### Configuración

| Archivo | Descripción |
|---------|-------------|
| `frontend/vite.config.ts` | Config de Vite (build mode library) |
| `frontend/package.json` | Scripts NPM y dependencias |
| `PARA_HOSTALIA/.../lumetrix/.htaccess` | Config Apache |
| `PARA_HOSTALIA/.../lumetrix/config_hostalia.example.php` | Ejemplo de config BD |

### Código principal

| Archivo | Descripción |
|---------|-------------|
| `frontend/src/App.jsx` | Componente principal del juego (1967 líneas) |
| `frontend/src/entry.jsx` | Entry point con mount/unmount |
| `PARA_HOSTALIA/.../app_lumetrix.html` | HTML principal |

### API Backend

| Archivo | Descripción |
|---------|-------------|
| `PARA_HOSTALIA/.../lumetrix/auth.php` | API autenticación |
| `PARA_HOSTALIA/.../lumetrix/game.php` | API guardar progreso |
| `PARA_HOSTALIA/.../lumetrix/ranking.php` | API ranking |
| `PARA_HOSTALIA/.../lumetrix/_common.php` | Funciones comunes PHP |

---

## 🔍 Búsqueda rápida por tema

### Autenticación
- [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Sección 4
- `PARA_HOSTALIA/.../lumetrix/auth.php`

### Base de datos
- [VARIABLES_ENTORNO.md](./VARIABLES_ENTORNO.md) - Sección "Backend (PHP)"
- `PARA_HOSTALIA/.../lumetrix/config_hostalia.example.php`

### Build y bundling
- [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Sección 2 y 5
- `frontend/vite.config.ts`

### Mecánicas de juego
- [NIVELES_Y_MECANICAS.md](./NIVELES_Y_MECANICAS.md)
- `frontend/src/App.jsx` - Variable `LEVEL_CONFIG`

### Permisos y seguridad
- [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Sección 6
- `PARA_HOSTALIA/.../lumetrix/.htaccess`

### Rutas de assets
- [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) - Sección 3
- `frontend/src/App.jsx` - Rutas hardcodeadas

### Testing
- [GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md) - Sección "Testing"
- [README.md](./README.md) - Sección "Testing"
- `frontend/scripts/smoke-test.js`

---

## 📞 ¿Necesitas ayuda?

### Por tipo de problema

| Problema | Consultar |
|----------|-----------|
| El juego no carga | [GUIA_RAPIDA_DEPLOY.md](./GUIA_RAPIDA_DEPLOY.md#troubleshooting) |
| Error en build | [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) Sección 5 |
| Error 404 en assets | [INFORME_DESPLIEGUE_HOSTALIA.md](./INFORME_DESPLIEGUE_HOSTALIA.md) Sección 3 |
| Error de BD | [VARIABLES_ENTORNO.md](./VARIABLES_ENTORNO.md) |
| Audio no suena | [README.md](./README.md#troubleshooting) |
| Sesión no persiste | [VARIABLES_ENTORNO.md](./VARIABLES_ENTORNO.md) - Sección "Sesiones PHP" |

---

## 🎯 Roadmap de documentación

### ✅ Completado

- [x] README principal
- [x] Informe técnico de deployment
- [x] Guía rápida de deploy
- [x] Checklist de deployment
- [x] Documentación de variables de entorno
- [x] Especificación de niveles y mecánicas
- [x] Scripts automatizados de build y deploy

### 🔄 Pendiente (futuro)

- [ ] Documentación de API con Swagger/OpenAPI
- [ ] Guía de contribución detallada
- [ ] Changelog con versiones
- [ ] Documentación de debugging avanzado
- [ ] Diagramas de arquitectura (UML/C4)

---

**Última actualización**: 2025-10-08  
**Versión**: 1.0.0

