<?php
/**
 * Test de conexión API para diagnosticar problemas
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Test API Connection</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}table{border-collapse:collapse;margin:10px 0;}td,th{border:1px solid #00ff88;padding:8px;text-align:left;}</style>";
echo "</head><body>";
echo "<h1>🔍 Test de Conexión API</h1>";
echo "<pre>";

// ========================================
// 1. VERIFICAR CONEXIÓN A BD
// ========================================

echo "\n<span class='info'>📋 1. Verificando conexión a base de datos</span>\n\n";

try {
    $pdo = db();
    echo "<span class='success'>✅ Conexión a BD exitosa</span>\n";
} catch (Exception $e) {
    echo "<span class='error'>❌ Error de conexión BD: {$e->getMessage()}</span>\n";
    echo "</pre></body></html>";
    exit;
}

// ========================================
// 2. VERIFICAR SESIÓN
// ========================================

echo "\n<span class='info'>📋 2. Verificando sesión actual</span>\n\n";

$uakey = uakey();
if ($uakey) {
    echo "<span class='success'>✅ Sesión activa: $uakey</span>\n";
    
    // Obtener datos del usuario
    $st = $pdo->prepare("SELECT email, nick, nivel_actual, total_puntos FROM usuarios_aplicaciones ua LEFT JOIN lumetrix_progreso p ON ua.usuario_aplicacion_key = p.usuario_aplicacion_key WHERE ua.usuario_aplicacion_key = ?");
    $st->execute([$uakey]);
    $user = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo "<span class='info'>   Email: {$user['email']}</span>\n";
        echo "<span class='info'>   Nick: {$user['nick']}</span>\n";
        echo "<span class='info'>   Nivel: {$user['nivel_actual']}</span>\n";
        echo "<span class='info'>   Puntos: {$user['total_puntos']}</span>\n";
    }
} else {
    echo "<span class='warning'>⚠️  No hay sesión activa</span>\n";
}

// ========================================
// 3. SIMULAR GUARDADO DE PROGRESO
// ========================================

echo "\n<span class='info'>📋 3. Simulando guardado de progreso</span>\n\n";

if ($uakey) {
    $testLevel = 8;
    $testTime = 100;
    $testPuntos = 200;
    
    try {
        $pdo->beginTransaction();
        
        // 1. Guardar run histórico
        $st = $pdo->prepare("
            INSERT INTO lumetrix_runs (usuario_aplicacion_key, level, duration_s, success, puntos)
            VALUES (?, ?, ?, ?, ?)
        ");
        $st->execute([$uakey, $testLevel, $testTime, 1, $testPuntos]);
        
        // 2. Actualizar progreso agregado
        $st = $pdo->prepare("
            INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
            VALUES (:k, :lvl, :tt, :pts)
            ON DUPLICATE KEY UPDATE
                nivel_actual = GREATEST(nivel_actual, :lvl),
                total_time_s = total_time_s + VALUES(total_time_s),
                total_puntos = VALUES(total_puntos),
                updated_at = CURRENT_TIMESTAMP
        ");
        $st->execute([':k' => $uakey, ':lvl' => $testLevel, ':tt' => $testTime, ':pts' => $testPuntos]);
        
        $pdo->commit();
        
        echo "<span class='success'>✅ Test de guardado exitoso</span>\n";
        echo "<span class='info'>   Nivel: $testLevel</span>\n";
        echo "<span class='info'>   Tiempo: {$testTime}s</span>\n";
        echo "<span class='info'>   Puntos: $testPuntos</span>\n";
        
    } catch (Exception $e) {
        $pdo->rollBack();
        echo "<span class='error'>❌ Error en test de guardado: {$e->getMessage()}</span>\n";
    }
} else {
    echo "<span class='warning'>⚠️  No se puede hacer test sin sesión</span>\n";
}

// ========================================
// 4. VERIFICAR RESULTADO
// ========================================

echo "\n<span class='info'>📋 4. Verificando resultado del test</span>\n\n";

if ($uakey) {
    $st = $pdo->prepare("SELECT nivel_actual, total_puntos, updated_at FROM lumetrix_progreso WHERE usuario_aplicacion_key = ?");
    $st->execute([$uakey]);
    $progreso = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($progreso) {
        echo "<span class='success'>✅ Progreso actualizado:</span>\n";
        echo "<span class='info'>   Nivel: {$progreso['nivel_actual']}</span>\n";
        echo "<span class='info'>   Puntos: {$progreso['total_puntos']}</span>\n";
        echo "<span class='info'>   Actualizado: {$progreso['updated_at']}</span>\n";
    } else {
        echo "<span class='error'>❌ No se encontró progreso</span>\n";
    }
}

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='success'>✅ TEST DE CONEXIÓN COMPLETADO</span>\n";
echo "<span class='info'>========================================</span>\n";

echo "</pre>";
echo "<p><a href='verificar_puntos.php' style='color:#00ffff'>→ Verificar puntos</a></p>";
echo "<p><a href='test_auth.html' style='color:#00ffff'>→ Test de autenticación</a></p>";
echo "</body></html>";
?>
