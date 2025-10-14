<?php
/**
 * MIGRACIÓN: Agregar columnas de verificación por email
 * Ejecutar SOLO UNA VEZ: https://colisan.com/lumetrix/migrar_verificacion_email.php
 */

require_once __DIR__.'/_common.php';

header('Content-Type: text/html; charset=utf-8');

echo "<h2>🔧 Migración: Sistema de Verificación por Email - LUMETRIX</h2>";
echo "<hr>";

try {
    $pdo = db();
    
    // 1. Verificar/Agregar columnas (solo si NO existen)
    echo "<h3>📝 Paso 1: Verificando/Agregando columnas...</h3>";
    
    // Verificar columnas existentes
    $columns = $pdo->query("SHOW COLUMNS FROM usuarios_aplicaciones")->fetchAll(PDO::FETCH_COLUMN);
    $columnas_existentes = array_column($columns, 0);
    
    $columnas_necesarias = ['email_verificado', 'codigo_verificacion', 'tiempo_verificacion'];
    $columnas_faltantes = [];
    
    foreach ($columnas_necesarias as $col) {
        if (!in_array($col, $columnas_existentes)) {
            $columnas_faltantes[] = $col;
        }
    }
    
    if (empty($columnas_faltantes)) {
        echo "<p>✅ Todas las columnas YA EXISTEN. No es necesario agregar nada.</p>";
    } else {
        // Agregar solo las faltantes
        if (in_array('email_verificado', $columnas_faltantes)) {
            $pdo->exec("ALTER TABLE usuarios_aplicaciones ADD COLUMN email_verificado TINYINT(1) DEFAULT 0");
            echo "<p>✅ Columna 'email_verificado' agregada</p>";
        }
        if (in_array('codigo_verificacion', $columnas_faltantes)) {
            $pdo->exec("ALTER TABLE usuarios_aplicaciones ADD COLUMN codigo_verificacion VARCHAR(10) DEFAULT NULL");
            echo "<p>✅ Columna 'codigo_verificacion' agregada</p>";
        }
        if (in_array('tiempo_verificacion', $columnas_faltantes)) {
            $pdo->exec("ALTER TABLE usuarios_aplicaciones ADD COLUMN tiempo_verificacion TIMESTAMP NULL DEFAULT NULL");
            echo "<p>✅ Columna 'tiempo_verificacion' agregada</p>";
        }
    }
    
    // 2. Marcar usuarios existentes como verificados
    echo "<h3>📝 Paso 2: Marcando usuarios existentes como verificados...</h3>";
    $stmt = $pdo->exec("UPDATE usuarios_aplicaciones 
                        SET email_verificado = 1 
                        WHERE email_verificado = 0 AND fecha_registro < NOW()");
    echo "<p>✅ {$stmt} usuarios actualizados</p>";
    
    // 3. Verificar cambios
    echo "<h3>📊 Paso 3: Verificando cambios...</h3>";
    $stats = $pdo->query("SELECT COUNT(*) as total_usuarios,
                                 SUM(email_verificado) as verificados,
                                 SUM(CASE WHEN email_verificado = 0 THEN 1 ELSE 0 END) as sin_verificar
                          FROM usuarios_aplicaciones")->fetch(PDO::FETCH_ASSOC);
    
    echo "<table border='1' cellpadding='10' style='border-collapse:collapse;'>";
    echo "<tr><th>Total Usuarios</th><th>Verificados</th><th>Sin Verificar</th></tr>";
    echo "<tr>";
    echo "<td>{$stats['total_usuarios']}</td>";
    echo "<td>{$stats['verificados']}</td>";
    echo "<td>{$stats['sin_verificar']}</td>";
    echo "</tr>";
    echo "</table>";
    
    echo "<hr>";
    echo "<h2>✅ MIGRACIÓN COMPLETADA EXITOSAMENTE</h2>";
    echo "<p><strong>⚠️ IMPORTANTE:</strong> Elimina este archivo después de ejecutarlo una vez.</p>";
    
} catch (Exception $e) {
    echo "<h2>❌ ERROR EN LA MIGRACIÓN</h2>";
    echo "<p style='color:red;'>{$e->getMessage()}</p>";
}

