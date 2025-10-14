<?php
/**
 * API de diagnóstico para consultar tablas
 * Solo permite SELECT para seguridad
 */

require_once __DIR__.'/_common.php';

header('Content-Type: application/json');

// Verificar que sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa POST.']);
    exit;
}

// Obtener query
$query = $_POST['query'] ?? '';

if (empty($query)) {
    http_response_code(400);
    echo json_encode(['error' => 'Falta el parámetro query']);
    exit;
}

// Validar que solo sea SELECT (seguridad básica)
$query_upper = strtoupper(trim($query));
if (!preg_match('/^SELECT\s/', $query_upper)) {
    http_response_code(403);
    echo json_encode(['error' => 'Solo se permiten consultas SELECT']);
    exit;
}

// Ejecutar query
try {
    $pdo = db();
    $stmt = $pdo->query($query);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'results' => $results,
        'count' => count($results)
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

