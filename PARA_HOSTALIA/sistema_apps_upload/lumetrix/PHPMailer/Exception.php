<?php
/**
 * PHPMailer Exception - Versión simplificada
 */

namespace PHPMailer\PHPMailer;

class Exception extends \Exception {
    public function __construct($message = "", $code = 0, \Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
?>
