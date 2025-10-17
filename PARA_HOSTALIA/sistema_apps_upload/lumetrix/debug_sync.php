<?php
/**
 * Debug de sincronización para diagnosticar problemas
 */

require_once __DIR__.'/_common.php';

echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Debug Sync</title>";
echo "<style>body{font-family:monospace;background:#0a0a0a;color:#00ff88;padding:20px;}pre{background:#111;padding:16px;border:1px solid #00ff88;border-radius:8px;}.success{color:#00ff88;}.error{color:#ff4466;}.warning{color:#ffaa00;}.info{color:#00ffff;}table{border-collapse:collapse;margin:10px 0;}td,th{border:1px solid #00ff88;padding:8px;text-align:left;}</style>";
echo "</head><body>";
echo "<h1>🔍 Debug de Sincronización</h1>";
echo "<pre>";

// ========================================
// 1. VERIFICAR SESIÓN
// ========================================

echo "\n<span class='info'>📋 1. Verificando sesión</span>\n\n";

$uakey = uakey();
if ($uakey) {
    echo "<span class='success'>✅ Sesión activa: $uakey</span>\n";
} else {
    echo "<span class='error'>❌ No hay sesión activa</span>\n";
    echo "<span class='warning'>⚠️  La APK necesita estar logueada para sincronizar</span>\n";
}

// ========================================
// 2. VERIFICAR HEADERS
// ========================================

echo "\n<span class='info'>📋 2. Headers de la petición</span>\n\n";

echo "<span class='info'>REQUEST_METHOD: " . ($_SERVER['REQUEST_METHOD'] ?? 'NO DEFINIDO') . "</span>\n";
echo "<span class='info'>CONTENT_TYPE: " . ($_SERVER['CONTENT_TYPE'] ?? 'NO DEFINIDO') . "</span>\n";
echo "<span class='info'>HTTP_ORIGIN: " . ($_SERVER['HTTP_ORIGIN'] ?? 'NO DEFINIDO') . "</span>\n";
echo "<span class='info'>HTTP_USER_AGENT: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'NO DEFINIDO') . "</span>\n";

// ========================================
// 3. VERIFICAR DATOS ENVIADOS
// ========================================

echo "\n<span class='info'>📋 3. Datos enviados</span>\n\n";

$input = file_get_contents('php://input');
if ($input) {
    echo "<span class='success'>✅ Datos recibidos:</span>\n";
    echo "<span class='info'>$input</span>\n";
    
    $data = json_decode($input, true);
    if ($data) {
        echo "<span class='info'>   Level: " . ($data['level'] ?? 'NO DEFINIDO') . "</span>\n";
        echo "<span class='info'>   Total_time_s: " . ($data['total_time_s'] ?? 'NO DEFINIDO') . "</span>\n";
        echo "<span class='info'>   Puntos: " . ($data['puntos'] ?? 'NO DEFINIDO') . "</span>\n";
        echo "<span class='info'>   Success: " . ($data['success'] ?? 'NO DEFINIDO') . "</span>\n";
    }
} else {
    echo "<span class='warning'>⚠️  No se recibieron datos</span>\n";
}

// ========================================
// 4. VERIFICAR ACTION
// ========================================

echo "\n<span class='info'>📋 4. Acción solicitada</span>\n\n";

$action = $_GET['action'] ?? '';
if ($action) {
    echo "<span class='success'>✅ Acción: $action</span>\n";
} else {
    echo "<span class='warning'>⚠️  No se especificó acción</span>\n";
}

// ========================================
// 5. SIMULAR GUARDADO
// ========================================

echo "\n<span class='info'>📋 5. Simulando guardado</span>\n\n";

if ($uakey && $action === 'save_progress' && $input) {
    $data = json_decode($input, true);
    if ($data) {
        try {
            $pdo = db();
            
            $level = max(1, (int)($data['level'] ?? 1));
            $time = max(0, (int)($data['total_time_s'] ?? 0));
            $puntos = max(0, (int)($data['puntos'] ?? 0));
            
            echo "<span class='info'>   Procesando: Nivel $level, Tiempo {$time}s, Puntos $puntos</span>\n";
            
            $st = $pdo->prepare("
                INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
                VALUES (:k, :lvl, :tt, :pts)
                ON DUPLICATE KEY UPDATE
                    nivel_actual = GREATEST(nivel_actual, :lvl),
                    total_time_s = total_time_s + VALUES(total_time_s),
                    total_puntos = VALUES(total_puntos),
                    updated_at = CURRENT_TIMESTAMP
            ");
            
            $st->execute([':k' => $uakey, ':lvl' => $level, ':tt' => $time, ':pts' => $puntos]);
            
            echo "<span class='success'>✅ Guardado exitoso</span>\n";
            
        } catch (Exception $e) {
            echo "<span class='error'>❌ Error al guardar: {$e->getMessage()}</span>\n";
        }
    }
} else {
    echo "<span class='warning'>⚠️  No se puede simular sin sesión, acción o datos</span>\n";
}

echo "\n<span class='info'>========================================</span>\n";
echo "<span class='success'>✅ DEBUG COMPLETADO</span>\n";
echo "<span class='info'>========================================</span>\n";

echo "</pre>";
echo "<p><a href='verificar_puntos.php' style='color:#00ffff'>→ Verificar puntos</a></p>";
echo "<p><a href='test_auth.html' style='color:#00ffff'>→ Test de autenticación</a></p>";
echo "</body></html>";
?>
