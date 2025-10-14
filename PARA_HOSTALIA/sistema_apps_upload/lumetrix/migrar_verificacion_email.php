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
    
    // 1. Agregar columnas
    echo "<h3>📝 Paso 1: Agregando columnas...</h3>";
    $sql = "ALTER TABLE usuarios_aplicaciones 
            ADD COLUMN IF NOT EXISTS email_verificado TINYINT(1) DEFAULT 0,
            ADD COLUMN IF NOT EXISTS codigo_verificacion VARCHAR(10) DEFAULT NULL,
            ADD COLUMN IF NOT EXISTS tiempo_verificacion TIMESTAMP NULL DEFAULT NULL,
            ADD COLUMN IF NOT EXISTS intentos_verificacion INT DEFAULT 0";
    
    $pdo->exec($sql);
    echo "<p>✅ Columnas agregadas/verificadas correctamente</p>";
    
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

