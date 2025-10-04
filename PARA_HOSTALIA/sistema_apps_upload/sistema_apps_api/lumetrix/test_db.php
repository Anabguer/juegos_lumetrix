<?php
require_once __DIR__.'/config_hostalia.php';

try {
    $pdo = db();
    $result = $pdo->query('SELECT 1 as test');
    $row = $result->fetch();
    echo json_encode(['status' => 'ok', 'message' => 'Database connection successful', 'test' => $row['test']]);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>

