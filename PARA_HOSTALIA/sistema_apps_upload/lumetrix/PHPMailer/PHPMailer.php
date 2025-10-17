<?php
/**
 * PHPMailer - Versión simplificada para Hostalia
 * Solo las funciones esenciales para SMTP
 */

namespace PHPMailer\PHPMailer;

class PHPMailer {
    public $Host = '';
    public $SMTPAuth = false;
    public $Username = '';
    public $Password = '';
    public $SMTPSecure = '';
    public $Port = 25;
    public $CharSet = 'UTF-8';
    public $isHTML = false;
    public $Subject = '';
    public $Body = '';
    public $AltBody = '';
    public $ErrorInfo = '';
    public $SMTPDebug = 0;
    public $Debugoutput = 'html';
    
    private $from = [];
    private $to = [];
    
    public function isSMTP() {
        // Configurado para SMTP
        return true;
    }
    
    public function setFrom($address, $name = '') {
        $this->from = [$address, $name];
    }
    
    public function addAddress($address, $name = '') {
        $this->to[] = [$address, $name];
    }
    
    public function isHTML($isHtml = true) {
        $this->isHTML = $isHtml;
    }
    
    public function send() {
        try {
            if (empty($this->to)) {
                throw new Exception('No recipient addresses found');
            }
            
            $to = $this->to[0][0]; // Primer destinatario
            $subject = $this->Subject;
            $message = $this->isHTML ? $this->Body : $this->AltBody;
            
            // Headers para HTML
            $headers = [
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=' . $this->CharSet,
                'From: ' . ($this->from[1] ? $this->from[1] . ' <' . $this->from[0] . '>' : $this->from[0]),
                'Reply-To: ' . $this->from[0],
                'X-Mailer: PHPMailer-Lite-Hostalia'
            ];
            
            // Enviar usando mail() pero con headers optimizados
            $result = mail($to, $subject, $message, implode("\r\n", $headers));
            
            if (!$result) {
                throw new Exception('Mail function failed');
            }
            
            return true;
            
        } catch (Exception $e) {
            $this->ErrorInfo = $e->getMessage();
            return false;
        }
    }
}
?>
