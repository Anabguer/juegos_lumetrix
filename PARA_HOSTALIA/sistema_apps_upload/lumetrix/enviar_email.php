<?php
/**
 * Sistema de envío de emails para verificación de cuentas - LUMETRIX
 * Basado en el sistema de MemoFlip
 */

function enviarEmailVerificacion($email, $nombre, $codigo) {
    $asunto = "🔐 Verifica tu cuenta en LUMETRIX";
    
    $html = '
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificación de cuenta - LUMETRIX</title>
        <style>
            body { 
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; 
                margin: 0; 
                padding: 0; 
                background: linear-gradient(135deg, #000 0%, #111 50%, #000 100%);
                color: #fff;
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: linear-gradient(135deg, #000 0%, #111 50%, #000 100%);
                border: 2px solid #39ff14;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
            }
            .header { 
                background: linear-gradient(90deg, #39ff14, #00ffff, #ff00ff);
                padding: 30px 20px;
                text-align: center;
                color: #000;
            }
            .header h1 { 
                margin: 0; 
                font-size: 32px; 
                font-weight: 900;
                letter-spacing: 0.1em;
                text-shadow: 0 0 10px rgba(0,0,0,0.5);
            }
            .content { 
                padding: 40px 30px; 
                text-align: center;
            }
            .codigo { 
                font-size: 48px; 
                font-weight: 900; 
                color: #39ff14;
                background: rgba(57, 255, 20, 0.1);
                border: 3px solid #39ff14;
                border-radius: 12px;
                padding: 20px;
                margin: 30px 0;
                letter-spacing: 0.2em;
                text-shadow: 0 0 20px #39ff14;
                box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
            }
            .instrucciones {
                font-size: 16px;
                line-height: 1.6;
                margin: 20px 0;
                color: #e5e7eb;
            }
            .advertencia {
                background: rgba(255, 0, 255, 0.1);
                border: 2px solid #ff00ff;
                border-radius: 8px;
                padding: 15px;
                margin: 20px 0;
                color: #ff00ff;
                font-weight: bold;
            }
            .footer { 
                background: rgba(0, 0, 0, 0.5);
                padding: 20px; 
                text-align: center; 
                font-size: 12px; 
                color: #9ca3af;
                border-top: 1px solid #39ff14;
            }
            .logo {
                font-size: 24px;
                font-weight: 900;
                background: linear-gradient(90deg, #39ff14, #00ffff, #ff00ff);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">LUMETRIX</div>
                <h1>🔐 Verificación de Cuenta</h1>
            </div>
            <div class="content">
                <h2>¡Hola, ' . htmlspecialchars($nombre) . '!</h2>
                <p class="instrucciones">
                    Gracias por registrarte en <strong>LUMETRIX</strong>.<br>
                    Para activar tu cuenta, introduce este código en la aplicación:
                </p>
                
                <div class="codigo">' . $codigo . '</div>
                
                <p class="instrucciones">
                    Este código es válido por <strong>15 minutos</strong>.<br>
                    Una vez verificado, podrás acceder a todos los niveles del juego.
                </p>
                
                <div class="advertencia">
                    ⚠️ Si no solicitaste esta verificación, ignora este email.
                </div>
            </div>
            <div class="footer">
                <p>Este es un email automático, por favor no respondas.</p>
                <p>© 2024 LUMETRIX - Sistema de verificación de cuentas</p>
            </div>
        </div>
    </body>
    </html>';
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: LUMETRIX <noreply@colisan.com>',
        'Reply-To: noreply@colisan.com',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    $resultado = mail($email, $asunto, $html, implode("\r\n", $headers));
    
    if (!$resultado) {
        error_log("Error enviando email de verificación a: $email");
    }
    
    return $resultado;
}

function generarCodigoVerificacion() {
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
}

function codigoEsValido($tiempo_verificacion, $horas_validez = 24) {
    if (!$tiempo_verificacion) return false;
    
    $tiempo_actual = time();
    $tiempo_expiracion = strtotime($tiempo_verificacion) + ($horas_validez * 3600);
    
    return $tiempo_actual < $tiempo_expiracion;
}

function limpiarCodigosExpirados($pdo) {
    try {
        $stmt = $pdo->prepare("
            UPDATE usuarios_aplicaciones 
            SET verification_code = NULL, 
                verification_expiry = NULL 
            WHERE verification_expiry < NOW() 
            AND verification_code IS NOT NULL
        ");
        $stmt->execute();
        
        $limpiados = $stmt->rowCount();
        if ($limpiados > 0) {
            error_log("Limpieza automática: $limpiados códigos expirados eliminados");
        }
        
        return $limpiados;
    } catch (Exception $e) {
        error_log("Error limpiando códigos expirados: " . $e->getMessage());
        return 0;
    }
}

// Función de utilidad para debug
function debugEmail($email, $codigo) {
    return [
        'email' => $email,
        'codigo' => $codigo,
        'timestamp' => date('Y-m-d H:i:s'),
        'debug' => true
    ];
}
?>