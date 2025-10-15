<?php
/**
 * 🔍 DIAGNÓSTICO COMPLETO DE EMAIL - LUMETRIX
 * 
 * Este script prueba TODAS las configuraciones posibles para encontrar
 * la que funciona en tu servidor de Hostalia.
 */

// Configuraciones a probar
$configuraciones = [
    // Configuración actual
    [
        'nombre' => 'Configuración actual (smtp.colisan.com:587)',
        'host' => 'smtp.colisan.com',
        'puerto' => 587,
        'secure' => 'tls',
        'usuario' => 'info@colisan.com',
        'password' => 'IgdAmg19521954'
    ],
    // Variaciones del servidor
    [
        'nombre' => 'mail.colisan.com:587',
        'host' => 'mail.colisan.com',
        'puerto' => 587,
        'secure' => 'tls',
        'usuario' => 'info@colisan.com',
        'password' => 'IgdAmg19521954'
    ],
    [
        'nombre' => 'smtp.colisan.com:465',
        'host' => 'smtp.colisan.com',
        'puerto' => 465,
        'secure' => 'ssl',
        'usuario' => 'info@colisan.com',
        'password' => 'IgdAmg19521954'
    ],
    // Servidores genéricos de Hostalia
    [
        'nombre' => 'smtp.hostalia.com:587',
        'host' => 'smtp.hostalia.com',
        'puerto' => 587,
        'secure' => 'tls',
        'usuario' => 'info@colisan.com',
        'password' => 'IgdAmg19521954'
    ],
    [
        'nombre' => 'mail.hostalia.com:587',
        'host' => 'mail.hostalia.com',
        'puerto' => 587,
        'secure' => 'tls',
        'usuario' => 'info@colisan.com',
        'password' => 'IgdAmg19521954'
    ],
    // Con usuario diferente
    [
        'nombre' => 'smtp.colisan.com:587 (info@intocables.com)',
        'host' => 'smtp.colisan.com',
        'puerto' => 587,
        'secure' => 'tls',
        'usuario' => 'info@intocables.com',
        'password' => 'IgdAmg19521954'
    ],
    // Puerto 25 (sin encriptación)
    [
        'nombre' => 'smtp.colisan.com:25 (sin TLS)',
        'host' => 'smtp.colisan.com',
        'puerto' => 25,
        'secure' => 'none',
        'usuario' => 'info@colisan.com',
        'password' => 'IgdAmg19521954'
    ]
];

function probarConexionCompleta($config) {
    $resultado = [
        'config' => $config,
        'conexion' => false,
        'tls' => false,
        'auth' => false,
        'mail_from' => false,
        'rcpt_to' => false,
        'data' => false,
        'error' => null,
        'tiempo' => 0,
        'logs' => []
    ];
    
    $inicio = microtime(true);
    
    try {
        // 1. CONEXIÓN
        $socket = @fsockopen($config['host'], $config['puerto'], $errno, $errstr, 10);
        if (!$socket) {
            $resultado['error'] = "No se pudo conectar: $errstr ($errno)";
            return $resultado;
        }
        
        $resultado['conexion'] = true;
        $resultado['logs'][] = "✅ Conexión establecida a {$config['host']}:{$config['puerto']}";
        
        // Leer respuesta inicial
        $response = fgets($socket, 515);
        $resultado['logs'][] = "Server: " . trim($response);
        
        if (strpos($response, '220') === false) {
            fclose($socket);
            $resultado['error'] = "Respuesta inicial incorrecta: " . trim($response);
            return $resultado;
        }
        
        // 2. EHLO
        fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
        $response = leerRespuestaSMTP($socket);
        $resultado['logs'][] = "EHLO: " . trim($response);
        
        // 3. STARTTLS (si es necesario)
        if ($config['secure'] === 'tls') {
            fputs($socket, "STARTTLS\r\n");
            $response = fgets($socket, 515);
            $resultado['logs'][] = "STARTTLS: " . trim($response);
            
            if (strpos($response, '220') === false) {
                fclose($socket);
                $resultado['error'] = "STARTTLS falló: " . trim($response);
                return $resultado;
            }
            
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                fclose($socket);
                $resultado['error'] = "No se pudo habilitar TLS";
                return $resultado;
            }
            
            $resultado['tls'] = true;
            $resultado['logs'][] = "✅ TLS habilitado";
            
            // EHLO de nuevo después de TLS
            fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
            $response = leerRespuestaSMTP($socket);
            $resultado['logs'][] = "EHLO post-TLS: " . trim($response);
        }
        
        // 4. AUTH LOGIN
        fputs($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 515);
        $resultado['logs'][] = "AUTH LOGIN: " . trim($response);
        
        if (strpos($response, '334') === false) {
            fclose($socket);
            $resultado['error'] = "AUTH LOGIN no aceptado: " . trim($response);
            return $resultado;
        }
        
        // Usuario
        fputs($socket, base64_encode($config['usuario']) . "\r\n");
        $response = fgets($socket, 515);
        $resultado['logs'][] = "Usuario: " . trim($response);
        
        if (strpos($response, '334') === false) {
            fclose($socket);
            $resultado['error'] = "Usuario no aceptado: " . trim($response);
            return $resultado;
        }
        
        // Contraseña
        fputs($socket, base64_encode($config['password']) . "\r\n");
        $response = fgets($socket, 515);
        $resultado['logs'][] = "Contraseña: " . trim($response);
        
        if (strpos($response, '235') === false) {
            fclose($socket);
            $resultado['error'] = "Autenticación falló: " . trim($response);
            return $resultado;
        }
        
        $resultado['auth'] = true;
        $resultado['logs'][] = "✅ Autenticación exitosa";
        
        // 5. MAIL FROM
        fputs($socket, "MAIL FROM: <info@intocables.com>\r\n");
        $response = fgets($socket, 515);
        $resultado['logs'][] = "MAIL FROM: " . trim($response);
        
        if (strpos($response, '250') === false) {
            fclose($socket);
            $resultado['error'] = "MAIL FROM falló: " . trim($response);
            return $resultado;
        }
        
        $resultado['mail_from'] = true;
        
        // 6. RCPT TO
        fputs($socket, "RCPT TO: <test@ejemplo.com>\r\n");
        $response = fgets($socket, 515);
        $resultado['logs'][] = "RCPT TO: " . trim($response);
        
        if (strpos($response, '250') === false) {
            fclose($socket);
            $resultado['error'] = "RCPT TO falló: " . trim($response);
            return $resultado;
        }
        
        $resultado['rcpt_to'] = true;
        
        // 7. DATA
        fputs($socket, "DATA\r\n");
        $response = fgets($socket, 515);
        $resultado['logs'][] = "DATA: " . trim($response);
        
        if (strpos($response, '354') === false) {
            fclose($socket);
            $resultado['error'] = "DATA no aceptado: " . trim($response);
            return $resultado;
        }
        
        $resultado['data'] = true;
        
        // QUIT
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        $resultado['logs'][] = "✅ Todas las pruebas pasaron";
        
    } catch (Exception $e) {
        $resultado['error'] = $e->getMessage();
    }
    
    $resultado['tiempo'] = round((microtime(true) - $inicio) * 1000);
    return $resultado;
}

function leerRespuestaSMTP($socket) {
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }
    return $response;
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔍 Diagnóstico Completo - LUMETRIX</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #000 0%, #1a1a2e 100%);
            color: #fff;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid #39ff14;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 0 50px rgba(57, 255, 20, 0.3);
        }
        h1 {
            font-size: 32px;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #39ff14, #00ffff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-align: center;
        }
        .subtitle {
            text-align: center;
            color: #aaa;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .info {
            background: rgba(0, 255, 255, 0.1);
            border: 2px solid #00ffff;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 30px;
            font-size: 14px;
            line-height: 1.6;
        }
        .test-result {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid;
        }
        .test-success {
            background: rgba(57, 255, 20, 0.1);
            border-color: #39ff14;
            color: #39ff14;
        }
        .test-error {
            background: rgba(255, 0, 0, 0.1);
            border-color: #ff0000;
            color: #ff6b6b;
        }
        .test-warning {
            background: rgba(255, 165, 0, 0.1);
            border-color: #ffa500;
            color: #ffa500;
        }
        .test-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .test-details {
            font-size: 14px;
            line-height: 1.4;
        }
        .status {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 10px;
        }
        .status-ok { background: #39ff14; color: #000; }
        .status-error { background: #ff0000; color: #fff; }
        .status-warning { background: #ffa500; color: #000; }
        button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(90deg, #39ff14, #00ffff);
            border: none;
            border-radius: 8px;
            color: #000;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            margin-bottom: 20px;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(57, 255, 20, 0.5);
        }
        .logs {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #39ff14;
            border-radius: 4px;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            margin-top: 10px;
            max-height: 200px;
            overflow-y: auto;
        }
        .config-recommendation {
            background: rgba(57, 255, 20, 0.1);
            border: 2px solid #39ff14;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
            display: none;
        }
        .config-code {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #39ff14;
            border-radius: 4px;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            margin-top: 10px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Diagnóstico Completo</h1>
        <p class="subtitle">Prueba sistemática de TODAS las configuraciones SMTP</p>

        <div class="info">
            🔍 <strong>Diagnóstico exhaustivo:</strong><br>
            Este script probará 7 configuraciones diferentes para encontrar la que funciona.<br>
            Incluye pruebas de conexión, TLS, autenticación, MAIL FROM, RCPT TO y DATA.<br><br>
            ⏱️ <strong>Tiempo estimado:</strong> 2-3 minutos
        </div>

        <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
            <div id="results">
                <h3 style="margin-bottom: 20px; color: #39ff14;">📊 Resultados del diagnóstico completo:</h3>
                
                <?php
                $configuracion_exitosa = null;
                
                foreach ($configuraciones as $config) {
                    $resultado = probarConexionCompleta($config);
                    
                    $clase = 'test-error';
                    $statuses = [];
                    
                    if ($resultado['conexion']) $statuses[] = '<span class="status status-ok">Conexión</span>';
                    else $statuses[] = '<span class="status status-error">Conexión</span>';
                    
                    if ($resultado['tls']) $statuses[] = '<span class="status status-ok">TLS</span>';
                    else $statuses[] = '<span class="status status-warning">TLS</span>';
                    
                    if ($resultado['auth']) $statuses[] = '<span class="status status-ok">Auth</span>';
                    else $statuses[] = '<span class="status status-error">Auth</span>';
                    
                    if ($resultado['mail_from']) $statuses[] = '<span class="status status-ok">MAIL FROM</span>';
                    else $statuses[] = '<span class="status status-error">MAIL FROM</span>';
                    
                    if ($resultado['rcpt_to']) $statuses[] = '<span class="status status-ok">RCPT TO</span>';
                    else $statuses[] = '<span class="status status-error">RCPT TO</span>';
                    
                    if ($resultado['data']) $statuses[] = '<span class="status status-ok">DATA</span>';
                    else $statuses[] = '<span class="status status-error">DATA</span>';
                    
                    if ($resultado['conexion'] && $resultado['auth'] && $resultado['mail_from'] && $resultado['rcpt_to'] && $resultado['data']) {
                        $clase = 'test-success';
                        $configuracion_exitosa = $config;
                    } elseif ($resultado['conexion'] && $resultado['auth']) {
                        $clase = 'test-warning';
                    }
                    
                    echo '<div class="test-result ' . $clase . '">';
                    echo '<div class="test-title">' . $config['nombre'] . '</div>';
                    echo '<div class="test-details">';
                    echo implode('', $statuses);
                    echo '<span style="color: #aaa;">Tiempo: ' . $resultado['tiempo'] . 'ms</span>';
                    if ($resultado['error']) {
                        echo '<br><span style="color: #ff6b6b;">Error: ' . htmlspecialchars($resultado['error']) . '</span>';
                    }
                    echo '</div>';
                    
                    if (!empty($resultado['logs'])) {
                        echo '<div class="logs">';
                        foreach ($resultado['logs'] as $log) {
                            echo htmlspecialchars($log) . '<br>';
                        }
                        echo '</div>';
                    }
                    
                    echo '</div>';
                }
                ?>
                
                <?php if ($configuracion_exitosa): ?>
                    <div class="config-recommendation" style="display: block;">
                        <h3 style="color: #39ff14; margin-bottom: 15px;">🎉 ¡CONFIGURACIÓN FUNCIONAL ENCONTRADA!</h3>
                        <p>La siguiente configuración funciona correctamente:</p>
                        <div class="config-code">
define('SMTP_HOST', '<?php echo $configuracion_exitosa['host']; ?>');<br>
define('SMTP_PORT', <?php echo $configuracion_exitosa['puerto']; ?>);<br>
define('SMTP_USER', '<?php echo $configuracion_exitosa['usuario']; ?>');<br>
define('SMTP_PASS', '<?php echo $configuracion_exitosa['password']; ?>');<br>
define('SMTP_FROM', 'info@intocables.com');<br>
define('SMTP_NAME', 'LUMETRIX');<br>
define('SMTP_SECURE', '<?php echo $configuracion_exitosa['secure']; ?>');
                        </div>
                        <p style="margin-top: 15px;">
                            <strong>Próximo paso:</strong> Actualizar el archivo <code>config_smtp.php</code> con estos valores.
                        </p>
                    </div>
                <?php else: ?>
                    <div class="test-result test-error">
                        <div class="test-title">❌ Ninguna configuración funcionó completamente</div>
                        <div class="test-details">
                            <strong>Análisis:</strong><br>
                            • Revisa los logs de cada configuración para ver dónde falla<br>
                            • Posibles causas: contraseña incorrecta, servidor bloqueado, configuración específica<br>
                            • <strong>Recomendación:</strong> Verificar credenciales en el panel de Hostalia
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        <?php else: ?>
            <form method="POST">
                <button type="submit">🔍 Iniciar Diagnóstico Completo</button>
            </form>
            
            <div class="info">
                <strong>¿Qué hace este diagnóstico?</strong><br>
                1. Prueba 7 configuraciones diferentes<br>
                2. Verifica cada paso del proceso SMTP<br>
                3. Muestra logs detallados de cada prueba<br>
                4. Te da la configuración exacta que funciona<br>
                5. Tiempo estimado: 2-3 minutos
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
