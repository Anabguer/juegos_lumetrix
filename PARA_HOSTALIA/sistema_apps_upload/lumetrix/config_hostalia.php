<?php
declare(strict_types=1);
date_default_timezone_set('Europe/Madrid');
session_start();

/**
 * ⚠️ CREDENCIALES DE BD — DEFINITIVAS (de Neni). NO modificarlas.
 */
define('DB_HOST',    'PMYSQL165.dns-servicio.com');
define('DB_USUARIO', 'sistema_apps_user');
define('DB_CONTRA',  'GestionUploadSistemaApps!');
define('DB_NOMBRE',  '9606966_sistema_apps_db');
define('DB_CHARSET', 'utf8');
define('DB_PORT',    3306);

/** Código de la app */
define('APP_CODIGO', 'lumetrix');

/** CORS - Permitir acceso desde cualquier origen (web y APK) */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
if ($origin !== '*') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

/** Respuesta JSON */
function json_out($arr): void {
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($arr, JSON_UNESCAPED_UNICODE);
  exit;
}

/** Conexión PDO */
function db(): PDO {
  static $pdo = null;
  if ($pdo instanceof PDO) return $pdo;
  $dsn = 'mysql:host='.DB_HOST.';port='.DB_PORT.';dbname='.DB_NOMBRE.';charset=utf8mb4';
  $pdo = new PDO($dsn, DB_USUARIO, DB_CONTRA, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]);
  return $pdo;
}

/** Sesión */
function uakey(): ?string { return $_SESSION['uakey'] ?? null; }

/** Generación de clave */
function key_from_email(string $email): string {
  return strtolower(trim($email)) . '#' . APP_CODIGO;
}