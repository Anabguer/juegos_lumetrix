-- ========================================
-- LUMETRIX - Esquema de base de datos
-- ========================================
-- Base: sistema_apps (ya existe)
-- Tablas: usuarios_aplicaciones (ya existe)
-- ========================================

USE sistema_apps;

-- ========================================
-- Tabla: lumetrix_progreso
-- Guarda el progreso agregado del usuario
-- ========================================

CREATE TABLE IF NOT EXISTS `lumetrix_progreso` (
  `usuario_aplicacion_key` VARCHAR(190) NOT NULL COMMENT 'Clave canónica: email_app',
  `nivel_actual` INT NOT NULL DEFAULT 1 COMMENT 'Nivel más alto alcanzado',
  `total_time_s` INT NOT NULL DEFAULT 0 COMMENT 'Tiempo total jugado en segundos',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_aplicacion_key`),
  CONSTRAINT `fk_lx_prog_user`
    FOREIGN KEY (`usuario_aplicacion_key`)
    REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Progreso agregado de cada usuario en Lumetrix';

-- ========================================
-- Tabla: lumetrix_runs
-- Histórico de partidas (cada intento)
-- ========================================

CREATE TABLE IF NOT EXISTS `lumetrix_runs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `usuario_aplicacion_key` VARCHAR(190) NOT NULL COMMENT 'Clave canónica: email_app',
  `level` INT NOT NULL COMMENT 'Nivel jugado',
  `duration_s` INT NOT NULL DEFAULT 0 COMMENT 'Duración del intento en segundos',
  `success` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1=victoria, 0=derrota',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_lx_runs_user` (`usuario_aplicacion_key`),
  KEY `idx_lx_runs_level` (`level`),
  KEY `idx_lx_runs_success` (`success`),
  KEY `idx_lx_runs_created` (`created_at`),
  CONSTRAINT `fk_lx_runs_user`
    FOREIGN KEY (`usuario_aplicacion_key`)
    REFERENCES `usuarios_aplicaciones`(`usuario_aplicacion_key`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Histórico de partidas de Lumetrix';

-- ========================================
-- Índices adicionales para queries comunes
-- ========================================

-- Ranking global: usuarios con mayor nivel y menor tiempo
-- Ya cubierto por PRIMARY KEY en lumetrix_progreso

-- Histórico por usuario y nivel
-- Ya cubierto por idx_lx_runs_user e idx_lx_runs_level

-- ========================================
-- Vista de ranking (opcional - para consultas)
-- ========================================

CREATE OR REPLACE VIEW `lumetrix_ranking` AS
SELECT 
    ua.nick,
    ua.email,
    p.nivel_actual,
    p.total_time_s,
    p.updated_at,
    (SELECT COUNT(*) FROM lumetrix_runs r WHERE r.usuario_aplicacion_key = ua.usuario_aplicacion_key AND r.success = 1) AS victorias,
    (SELECT COUNT(*) FROM lumetrix_runs r WHERE r.usuario_aplicacion_key = ua.usuario_aplicacion_key) AS intentos_totales
FROM 
    usuarios_aplicaciones ua
    INNER JOIN lumetrix_progreso p ON p.usuario_aplicacion_key = ua.usuario_aplicacion_key
WHERE 
    ua.app_codigo = 'lumetrix'
    AND ua.activo = 1
ORDER BY 
    p.nivel_actual DESC,
    p.total_time_s ASC;

-- ========================================
-- Datos de ejemplo (COMENTADO - descomentar si necesitas)
-- ========================================

-- INSERT IGNORE INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s)
-- VALUES ('agl0305@gmail.com_lumetrix', 1, 0);

-- ========================================
-- Verificación
-- ========================================

-- SELECT 'Tablas creadas correctamente' AS status;
-- SELECT COUNT(*) AS registros FROM lumetrix_progreso;
-- SELECT COUNT(*) AS registros FROM lumetrix_runs;

-- ========================================
-- Limpiar (si necesitas resetear - CUIDADO)
-- ========================================

-- DROP TABLE IF EXISTS lumetrix_runs;
-- DROP TABLE IF EXISTS lumetrix_progreso;
-- DROP VIEW IF EXISTS lumetrix_ranking;

