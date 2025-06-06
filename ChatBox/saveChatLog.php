<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $logMessage = $data['logMessage'] ?? '';

    if ($logMessage) {
        $logFile = 'chatlog.txt';
        file_put_contents($logFile, $logMessage, FILE_APPEND | LOCK_EX);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No log message provided']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
