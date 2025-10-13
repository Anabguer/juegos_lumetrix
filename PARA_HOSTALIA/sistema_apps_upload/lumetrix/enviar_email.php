<?php
/**
 * SISTEMA DE ENVÍO DE EMAILS - LUMETRIX
 * Gestión de verificación de cuentas por email
 */

/**
 * Enviar email de verificación con código de 6 dígitos
 */
function enviarEmailVerificacion($email, $nombre, $codigo) {
    $asunto = "🎮 Verifica tu cuenta de Lumetrix";
    
    $mensaje = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin:0;padding:0;font-family:Arial,sans-serif;background-color:#0a0a0a;'>
        <div style='max-width:600px;margin:0 auto;background:linear-gradient(135deg,#39ff14 0%,#00e5ff 100%);padding:2px;'>
            <div style='background:#000;padding:40px 30px;'>
                <!-- Header -->
                <div style='text-align:center;margin-bottom:30px;'>
                    <h1 style='color:#39ff14;margin:0;font-size:32px;text-shadow:0 0 10px #39ff14;'>
                        🎮 LUMETRIX
                    </h1>
                    <p style='color:#00e5ff;margin:10px 0 0 0;font-size:14px;'>
                        Anti-Simon Challenge
                    </p>
                </div>
                
                <!-- Contenido -->
                <div style='background:rgba(57,255,20,0.1);border:2px solid #39ff14;border-radius:12px;padding:30px;margin-bottom:20px;'>
                    <h2 style='color:#fff;margin:0 0 20px 0;font-size:22px;'>
                        ¡Hola, " . htmlspecialchars($nombre) . "!
                    </h2>
                    
                    <p style='color:#ccc;line-height:1.6;margin:0 0 20px 0;'>
                        Gracias por registrarte en <strong style='color:#39ff14;'>Lumetrix</strong>. 
                        Para activar tu cuenta, introduce el siguiente código en la aplicación:
                    </p>
                    
                    <!-- Código de verificación -->
                    <div style='background:linear-gradient(135deg,#39ff14,#00e5ff);padding:3px;border-radius:8px;margin:30px 0;'>
                        <div style='background:#000;padding:20px;border-radius:6px;text-align:center;'>
                            <div style='color:#999;font-size:12px;margin-bottom:5px;'>TU CÓDIGO DE VERIFICACIÓN</div>
                            <div style='font-size:42px;font-weight:bold;color:#39ff14;letter-spacing:8px;text-shadow:0 0 20px #39ff14;'>
                                " . $codigo . "
                            </div>
                        </div>
                    </div>
                    
                    <p style='color:#ccc;line-height:1.6;margin:20px 0 0 0;font-size:14px;'>
                        ⏱️ Este código expira en <strong style='color:#00e5ff;'>24 horas</strong>.
                    </p>
                </div>
                
                <!-- Footer -->
                <div style='text-align:center;color:#666;font-size:12px;'>
                    <p style='margin:0 0 10px 0;'>
                        Si no solicitaste este código, ignora este email.
                    </p>
                    <p style='margin:0;'>
                        © " . date('Y') . " Lumetrix - Todos los derechos reservados
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Lumetrix <noreply@colisan.com>\r\n";
    $headers .= "Reply-To: noreply@colisan.com\r\n";
    
    return mail($email, $asunto, $mensaje, $headers);
}

/**
 * Generar código de verificación de 6 dígitos
 */
function generarCodigoVerificacion() {
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
}

/**
 * Verificar si un código es válido (no expirado)
 */
function codigoEsValido($tiempo_verificacion, $horas_validez = 24) {
    if (!$tiempo_verificacion) {
        return false;
    }
    
    $tiempo_actual = time();
    $tiempo_codigo = strtotime($tiempo_verificacion);
    $diferencia_horas = ($tiempo_actual - $tiempo_codigo) / 3600;
    
    return $diferencia_horas <= $horas_validez;
}

/**
 * Limpiar códigos expirados (ejecutar periódicamente con cron)
 */
function limpiarCodigosExpirados($pdo) {
    $sql = "UPDATE usuarios_aplicaciones 
            SET codigo_verificacion = NULL, 
                tiempo_verificacion = NULL 
            WHERE codigo_verificacion IS NOT NULL 
            AND TIMESTAMPDIFF(HOUR, tiempo_verificacion, NOW()) > 24";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    return $stmt->rowCount();
}

