<?php
/**
 * Funciones comunes para Lumetrix
 * 
 * config_hostalia.php ya define:
 * - session_start()
 * - db()
 * - json_out()
 * - uakey()
 * - key_from_email() [usa # como separador]
 */

require_once __DIR__.'/config_hostalia.php';

/**
 * Genera la clave canónica usuario_aplicacion_key
 * REGLA: email + '#' + app (sin modificar @ ni .)
 * 
 * @param string $email Email del usuario (será normalizado a lowercase)
 * @param string $app Código de la aplicación (default: 'lumetrix')
 * @return string Clave canónica
 */
function uakey_from_email(string $email, string $app = 'lumetrix'): string {
    $email = strtolower(trim($email));
    return $email . '_' . $app;
}

/**
 * Requiere que el usuario esté logueado
 * Si no hay sesión, retorna 401 y termina la ejecución
 */
function require_login(): void {
    if (!uakey()) {
        http_response_code(401);
        json_out(['success' => false, 'message' => 'unauthorized']);
    }
}
