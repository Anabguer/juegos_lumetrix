<?php
/**
 * TEST DIRECTO DE URL - Sin JavaScript, solo PHP
 */

header('Content-Type: text/html; charset=utf-8');
echo "<h1>🧪 TEST DIRECTO DE URL</h1>";
echo "<p>Fecha: " . date('Y-m-d H:i:s') . "</p>";

echo "<h2>1. PROBAR ENDPOINT game.php DIRECTAMENTE</h2>";

// Simular exactamente lo que hace la APK
$test_data = [
    'level' => 7,
    'total_time_s' => 500,
    'puntos' => 175,
    'success' => 1
];

echo "<h3>Datos que se envían:</h3>";
echo "<pre>" . json_encode($test_data, JSON_PRETTY_PRINT) . "</pre>";

// Hacer la petición exactamente como la APK
$url = 'https://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'User-Agent: Lumetrix-Test/1.0'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "<h3>Resultado:</h3>";
echo "<p><strong>HTTP Code:</strong> " . $http_code . "</p>";
echo "<p><strong>Error cURL:</strong> " . ($error ?: 'Ninguno') . "</p>";
echo "<p><strong>Respuesta:</strong></p>";
echo "<pre>" . htmlspecialchars($response) . "</pre>";

// Verificar si se guardó en la BD
echo "<h2>2. VERIFICAR SI SE GUARDÓ EN LA BASE DE DATOS</h2>";

try {
    require_once __DIR__.'/_common.php';
    $pdo = db();
    
    $st = $pdo->prepare("SELECT * FROM lumetrix_progreso WHERE usuario_aplicacion_key = 'bitj2a@gmail.com_lumetrix'");
    $st->execute();
    $data = $st->fetch(PDO::FETCH_ASSOC);
    
    if ($data) {
        echo "<p>✅ <strong>Datos en BD:</strong></p>";
        echo "<pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>";
        
        // Verificar si coinciden
        if ($data['nivel_actual'] == 7 && $data['total_puntos'] == 175) {
            echo "<p style='color: green; font-weight: bold;'>✅ ¡LOS DATOS COINCIDEN! El servidor funciona correctamente.</p>";
        } else {
            echo "<p style='color: orange; font-weight: bold;'>⚠️ Los datos no coinciden. Esperado: nivel 7, puntos 175. Actual: nivel " . $data['nivel_actual'] . ", puntos " . $data['total_puntos'] . "</p>";
        }
    } else {
        echo "<p style='color: red; font-weight: bold;'>❌ No se encontraron datos en la BD</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red; font-weight: bold;'>❌ Error consultando BD: " . $e->getMessage() . "</p>";
}

echo "<h2>3. PROBAR DIFERENTES URLs</h2>";

$urls_to_test = [
    'https://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress',
    'https://colisan.com/lumetrix/game.php?action=save_progress',
    'http://colisan.com/sistema_apps_upload/lumetrix/game.php?action=save_progress'
];

foreach ($urls_to_test as $test_url) {
    echo "<h4>Probando: " . $test_url . "</h4>";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $test_url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($test_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    echo "<p>HTTP: " . $http_code . " | Error: " . ($error ?: 'Ninguno') . "</p>";
    echo "<p>Respuesta: " . htmlspecialchars(substr($response, 0, 100)) . "...</p>";
    echo "<hr>";
}

echo "<h2>✅ TEST COMPLETADO</h2>";
echo "<p>Si ves este mensaje, el archivo se ejecutó correctamente.</p>";
?>
