# 🎮 LUMETRIX - Anti-Simón Game

Un juego innovador que desafía la memoria tradicional con mecánicas únicas de arrastre y patrones visuales.

## 🌟 Características

- **Mundo 1**: Introducción con toques simples (antisimón)
- **Mundo 2**: Mecánica de arrastre con zonas de drop
- **Mundo 3**: Más fichas + arrastre combinado
- **Mundo 4**: Nueva mecánica (próximamente)

## 🎯 Mecánicas

### Mundo 1 - Introducción
- **Fichas**: 4-8 por nivel
- **Tiempo**: 35s → 20s (progresivo)
- **Mecánica**: Toques simples (antisimón)

### Mundo 2 - Arrastre
- **Fichas**: 4-8 por nivel
- **Tiempo**: 35s → 20s (progresivo)
- **Mecánica**: Arrastra fichas hacia zonas de drop con bordes de colores

### Mundo 3 - Más fichas + Arrastre
- **Fichas**: 5-9 por nivel (+1 respecto a Mundo 1)
- **Tiempo**: 35s → 20s (progresivo)
- **Mecánica**: Más fichas + arrastre combinado

### Mundo 4 - Nueva mecánica
- **Fichas**: 5-9 por nivel
- **Tiempo**: 35s → 20s (progresivo)
- **Mecánica**: Próximamente...

## 🚀 Tecnologías

- **Frontend**: React + Vite
- **Backend**: PHP + MySQL
- **Estilos**: CSS personalizado con efectos neon
- **Fuente**: Tektur (Google Fonts)

## 📱 Características Móviles

- **Diseño responsive** optimizado para móvil
- **Fuente Tektur** para mejor legibilidad
- **Botones grandes** para mejor UX táctil
- **Efectos visuales** adaptados a pantallas pequeñas

## 🎨 Diseño

- **Estilo cyberpunk** con bordes neon
- **Colores vibrantes** (#39ff14, #ff2fbf, #00e5ff)
- **Efectos de cristal** (backdrop-filter)
- **Animaciones fluidas** y transiciones suaves

## 🛠️ Instalación

1. **Clonar repositorio**:
   ```bash
   git clone https://github.com/Anabguer/juegos_lumetrix.git
   cd juegos_lumetrix
   ```

2. **Instalar dependencias**:
   ```bash
   cd frontend
   npm install
   ```

3. **Compilar frontend**:
   ```bash
   npm run build
   ```

4. **Configurar servidor PHP**:
   ```bash
   php -S localhost:3000
   ```

## 🌐 Acceso

- **Local**: `http://localhost:3000/app_lumetrix.html`
- **Producción**: Configurar en Hostalia

## 📂 Estructura

```
Lumetrix/
├── frontend/                 # React frontend
│   ├── src/App.jsx          # Componente principal
│   ├── package.json         # Dependencias
│   └── vite.config.js       # Configuración Vite
├── PARA_HOSTALIA/           # Archivos de producción
│   └── sistema_apps_upload/ # Servidor PHP
└── README.md               # Este archivo
```

## 🎮 Cómo Jugar

1. **Observa** la secuencia de colores que se reproduce
2. **En Mundo 1**: Toca las fichas en el orden correcto
3. **En Mundo 2+**: Arrastra las fichas hacia sus zonas de drop correspondientes
4. **Completa** la secuencia antes de que se agote el tiempo
5. **Avanza** por los niveles y mundos

## 🔧 Desarrollo

### Compilar cambios:
```bash
cd frontend
npm run build
copy dist\game.bundle.js ..\PARA_HOSTALIA\sistema_apps_upload\sistema_apps_api\lumetrix\js\
```

### Servidor PHP:
```bash
cd PARA_HOSTALIA\sistema_apps_upload
php -S 127.0.0.1:3000 -t "." -c "php.ini"
```

## 📝 Versiones

- **v1.0**: Implementación básica con Mundo 1
- **v1.1**: Mecánica de arrastre (Mundo 2)
- **v1.2**: Optimización móvil y fuente Tektur
- **v1.3**: Sistema de niveles y mundos completado

## 👨‍💻 Autor

**@intocables13** - Desarrollador del juego LUMETRIX

## 📄 Licencia

Todos los derechos reservados © @intocables13
