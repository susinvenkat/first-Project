<?php
/**
 * List Documents API
 * Retrieves all documents for an application
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

try {
    $application_id = isset($_GET['application_id']) ? intval($_GET['application_id']) : null;
    
    if (!$application_id) {
        throw new Exception('Application ID is required');
    }
    
    // Fetch all documents for the application
    $stmt = $pdo->prepare("
        SELECT 
            id,
            document_type,
            original_filename,
            file_size,
            file_extension,
            mime_type,
            uploaded_at,
            is_verified,
            download_count,
            last_downloaded_at
        FROM documents
        WHERE application_id = ? AND is_deleted = FALSE
        ORDER BY uploaded_at DESC
    ");
    $stmt->execute([$application_id]);
    $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format file sizes
    foreach ($documents as &$doc) {
        $doc['file_size_kb'] = round($doc['file_size'] / 1024, 2);
        $doc['file_size_mb'] = round($doc['file_size'] / 1024 / 1024, 2);
        $doc['download_url'] = "/backend/api/download_document.php?id=" . $doc['id'];
    }
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $documents,
        'total' => count($documents)
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
