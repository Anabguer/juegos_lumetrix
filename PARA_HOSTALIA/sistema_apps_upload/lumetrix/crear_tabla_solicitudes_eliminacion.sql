-- Tabla para solicitudes de eliminación de cuentas
CREATE TABLE IF NOT EXISTS solicitudes_eliminacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_aplicacion_key VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    nick VARCHAR(255) NOT NULL,
    razon TEXT NOT NULL,
    fecha_solicitud DATETIME NOT NULL,
    estado ENUM('pendiente', 'procesada', 'rechazada') DEFAULT 'pendiente',
    fecha_procesamiento DATETIME NULL,
    notas_admin TEXT NULL,
    INDEX idx_usuario_key (usuario_aplicacion_key),
    INDEX idx_email (email),
    INDEX idx_estado (estado),
    INDEX idx_fecha_solicitud (fecha_solicitud)
);
