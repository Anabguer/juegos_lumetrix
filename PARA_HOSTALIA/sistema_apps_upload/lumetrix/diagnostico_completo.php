<?php
/**
 * DIAGNÓSTICO COMPLETO DE LUMETRIX
 * Sube este archivo al servidor y accede a él para ver el estado
 */

header('Content-Type: text/html; charset=utf-8');
echo "<h1>🔍 DIAGNÓSTICO COMPLETO LUMETRIX</h1>";
echo "<p>Fecha: " . date('Y-m-d H:i:s') . "</p>";

echo "<h2>1. VERIFICAR CONEXIÓN A BASE DE DATOS</h2>";
try {
    require_once __DIR__.'/_common.php';
    $pdo = db();
    echo "✅ Conexión a BD: OK<br>";
} catch (Exception $e) {
    echo "❌ Error BD: " . $e->getMessage() . "<br>";
    exit;
}

echo "<h2>2. VERIFICAR TABLA lumetrix_progreso</h2>";
try {
    $st = $pdo->query("SHOW TABLES LIKE 'lumetrix_progreso'");
    if ($st->rowCount() > 0) {
        echo "✅ Tabla lumetrix_progreso: EXISTE<br>";
        
        // Ver estructura
        $st = $pdo->query("DESCRIBE lumetrix_progreso");
        echo "<h3>Estructura de la tabla:</h3><ul>";
        while ($row = $st->fetch(PDO::FETCH_ASSOC)) {
            echo "<li>" . $row['Field'] . " (" . $row['Type'] . ")</li>";
        }
        echo "</ul>";
    } else {
        echo "❌ Tabla lumetrix_progreso: NO EXISTE<br>";
    }
} catch (Exception $e) {
    echo "❌ Error verificando tabla: " . $e->getMessage() . "<br>";
}

echo "<h2>3. PROBAR GUARDADO DE DATOS</h2>";
$uakey = 'bitj2a@gmail.com_lumetrix';
$level = 5;
$time = 300;
$puntos = 125;

try {
    $st = $pdo->prepare("
        INSERT INTO lumetrix_progreso (usuario_aplicacion_key, nivel_actual, total_time_s, total_puntos)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            nivel_actual = VALUES(nivel_actual),
            total_time_s = VALUES(total_time_s),
            total_puntos = VALUES(total_puntos),
            updated_at = CURRENT_TIMESTAMP
    ");
    
    $result = $st->execute([$uakey, $level, $time, $puntos]);
    
    if ($result) {
        echo "✅ INSERT: EXITOSO<br>";
        
        // Verificar que se guardó
        $st2 = $pdo->prepare("SELECT * FROM lumetrix_progreso WHERE usuario_aplicacion_key = ?");
        $st2->execute([$uakey]);
        $data = $st2->fetch(PDO::FETCH_ASSOC);
        
        if ($data) {
            echo "✅ DATOS GUARDADOS:<br>";
            echo "<pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>";
        } else {
            echo "❌ No se encontraron datos después de insertar<br>";
        }
    } else {
        echo "❌ INSERT: FALLÓ<br>";
    }
    
} catch (Exception $e) {
    echo "❌ Error en INSERT: " . $e->getMessage() . "<br>";
    echo "Código: " . $e->getCode() . "<br>";
}

echo "<h2>4. PROBAR ENDPOINT game.php</h2>";
echo "<p>Probando endpoint save_progress...</p>";

// Simular llamada POST
$test_data = [
    'level' => 6,
    'total_time_s' => 400,
    'puntos' => 150,
    'success' => 1
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $http_code . "<br>";
echo "Respuesta: " . $response . "<br>";

echo "<h2>5. VERIFICAR ARCHIVOS EN EL SERVIDOR</h2>";
$files = [
    'game.php',
    'test_upload.php',
    'debug_simple.php',
    'debug_save_progress.php'
];

foreach ($files as $file) {
    if (file_exists(__DIR__ . '/' . $file)) {
        echo "✅ $file: EXISTE<br>";
    } else {
        echo "❌ $file: NO EXISTE<br>";
    }
}

echo "<h2>6. INFORMACIÓN DEL SERVIDOR</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Directorio actual: " . __DIR__ . "<br>";
echo "Archivos en directorio: " . count(scandir(__DIR__)) . "<br>";

echo "<h2>✅ DIAGNÓSTICO COMPLETADO</h2>";
echo "<p>Si ves este mensaje, el archivo se subió correctamente al servidor.</p>";
?>