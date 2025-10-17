<?php
/**
 * Sistema de envío de emails mejorado para Lumetrix
 * Usa PHPMailer para mayor compatibilidad y confiabilidad
 */

require_once __DIR__.'/config_hostalia.php';

// Incluir PHPMailer (si no está disponible, usar mail() nativo como fallback)
$use_phpmailer = false;
if (file_exists(__DIR__.'/PHPMailer/PHPMailer.php')) {
    require_once __DIR__.'/PHPMailer/PHPMailer.php';
    require_once __DIR__.'/PHPMailer/SMTP.php';
    require_once __DIR__.'/PHPMailer/Exception.php';
    $use_phpmailer = true;
}

/**
 * Genera código de verificación de 6 dígitos
 */
function generarCodigoVerificacion() {
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
}

/**
 * Verifica si un código ha expirado
 * @param string $verification_expiry Fecha de expiración en formato DATETIME
 * @param int $horas_validez Horas de validez (default: 24)
 * @return bool true si es válido, false si expiró
 */
function codigoEsValido($verification_expiry, $horas_validez = 24) {
    if (!$verification_expiry) return false;
    
    $fecha_expiracion = new DateTime($verification_expiry);
    $ahora = new DateTime();
    $diferencia = $ahora->diff($fecha_expiracion);
    
    $horas_transcurridas = ($diferencia->days * 24) + $diferencia->h;
    
    return $horas_transcurridas < $horas_validez;
}

/**
 * Envía email de verificación con PHPMailer o mail() nativo
 */
function enviarEmailVerificacion($email, $nombre, $codigo) {
    global $use_phpmailer;
    
    $asunto = "🎮 Lumetrix - Código de Verificación";
    
    // Template HTML del email
    $html = generarTemplateEmail($nombre, $codigo, 'verificacion');
    
    if ($use_phpmailer) {
        return enviarConPHPMailer($email, $asunto, $html);
    } else {
        return enviarConMailNativo($email, $asunto, $html);
    }
}

/**
 * Envía email de recuperación de contraseña
 */
function enviarEmailRecuperacion($email, $nombre, $codigo) {
    global $use_phpmailer;
    
    $asunto = "🔐 Lumetrix - Recuperar Contraseña";
    
    // Template HTML del email
    $html = generarTemplateEmail($nombre, $codigo, 'recuperacion');
    
    if ($use_phpmailer) {
        return enviarConPHPMailer($email, $asunto, $html);
    } else {
        return enviarConMailNativo($email, $asunto, $html);
    }
}

/**
 * Envía email usando PHPMailer con SMTP
 */
function enviarConPHPMailer($email, $asunto, $html) {
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        
        // Configuración SMTP para Hostalia
        $mail->isSMTP();
        $mail->Host = 'mail.colisan.com';
        $mail->SMTPAuth = false; // Hostalia no requiere autenticación SMTP
        $mail->Port = 25; // Puerto 25 sin TLS
        $mail->CharSet = 'UTF-8';
        
        // Remitente
        $mail->setFrom('noreply@colisan.com', 'Lumetrix');
        $mail->addAddress($email);
        
        // Contenido
        $mail->isHTML(true);
        $mail->Subject = $asunto;
        $mail->Body = $html;
        $mail->AltBody = strip_tags($html);
        
        $mail->send();
        return true;
        
    } catch (Exception $e) {
        error_log("Error PHPMailer: " . $e->getMessage());
        return false;
    }
}

/**
 * Envía email usando mail() nativo (fallback)
 */
function enviarConMailNativo($email, $asunto, $html) {
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Lumetrix <noreply@colisan.com>',
        'Reply-To: noreply@colisan.com',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail($email, $asunto, $html, implode("\r\n", $headers));
}

/**
 * Genera template HTML para emails
 */
function generarTemplateEmail($nombre, $codigo, $tipo = 'verificacion') {
    $titulo = ($tipo === 'recuperacion') ? 'Recuperar Contraseña' : 'Verificación de Cuenta';
    $mensaje = ($tipo === 'recuperacion') ? 
        'Para cambiar tu contraseña, introduce el siguiente código:' :
        'Para activar tu cuenta, introduce el siguiente código:';
    
    return "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>$titulo - Lumetrix</title>
    </head>
    <body style='margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;'>
        <div style='max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);'>
            
            <!-- Header con gradiente Lumetrix -->
            <div style='background: linear-gradient(135deg, #39ff14 0%, #00e5ff 100%); padding: 30px; text-align: center; color: white;'>
                <h1 style='margin: 0; font-size: 28px; font-weight: bold;'>🎮 LUMETRIX</h1>
                <p style='margin: 5px 0 0 0; font-size: 16px; opacity: 0.9;'>Anti-Simon Challenge</p>
            </div>
            
            <!-- Contenido principal -->
            <div style='padding: 40px 30px; text-align: center;'>
                <h2 style='color: #333; margin: 0 0 20px 0; font-size: 24px;'>¡Hola, $nombre!</h2>
                
                <p style='color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;'>
                    $mensaje
                </p>
                
                <!-- Código destacado -->
                <div style='background: linear-gradient(135deg, #39ff14 0%, #00e5ff 100%); padding: 25px; border-radius: 15px; margin: 30px 0; display: inline-block;'>
                    <div style='background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'>
                        <p style='margin: 0 0 10px 0; color: #333; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;'>TU CÓDIGO</p>
                        <div style='font-size: 36px; font-weight: bold; color: #333; letter-spacing: 8px; margin: 0;'>$codigo</div>
                    </div>
                </div>
                
                <p style='color: #666; font-size: 14px; margin: 20px 0 0 0;'>
                    ⏱️ <strong>Expira en 24 horas</strong>
                </p>
                
                <div style='margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 10px; border-left: 4px solid #39ff14;'>
                    <p style='margin: 0; color: #666; font-size: 14px;'>
                        <strong>¿No solicitaste este código?</strong><br>
                        Simplemente ignora este email. Tu cuenta permanecerá segura.
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style='background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;'>
                <p style='margin: 0; color: #999; font-size: 12px;'>
                    © 2025 Lumetrix - Anti-Simon Challenge<br>
                    Este es un email automático, por favor no respondas.
                </p>
            </div>
            
        </div>
    </body>
    </html>
    ";
}

/**
 * Función de prueba para verificar que el sistema de email funciona
 */
function probarSistemaEmail($email_test) {
    $codigo = generarCodigoVerificacion();
    $resultado = enviarEmailVerificacion($email_test, 'Usuario Test', $codigo);
    
    return [
        'enviado' => $resultado,
        'codigo' => $codigo,
        'metodo' => file_exists(__DIR__.'/PHPMailer/PHPMailer.php') ? 'PHPMailer' : 'mail() nativo'
    ];
}

// Si se llama directamente para testing
if (isset($_GET['test']) && isset($_GET['email'])) {
    header('Content-Type: application/json');
    echo json_encode(probarSistemaEmail($_GET['email']));
    exit;
}
?>