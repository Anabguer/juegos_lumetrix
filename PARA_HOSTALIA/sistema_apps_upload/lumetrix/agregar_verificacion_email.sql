-- ========================================
-- SISTEMA DE VERIFICACIÓN POR EMAIL
-- LUMETRIX - Agregar columnas a usuarios_aplicaciones
-- ========================================

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

-- Verificar cambios
SELECT COUNT(*) as total_usuarios,
       SUM(email_verificado) as verificados,
       SUM(CASE WHEN email_verificado = 0 THEN 1 ELSE 0 END) as sin_verificar
FROM usuarios_aplicaciones;

