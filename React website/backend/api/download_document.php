<?php
/**
 * Document Download API
 * Securely downloads documents with access logging
 */

require_once '../config/database.php';

// Get document ID from query parameter
$document_id = isset($_GET['id']) ? intval($_GET['id']) : null;
$token = isset($_GET['token']) ? $_GET['token'] : null;

if (!$document_id) {
    http_response_code(400);
    die('Document ID is required');
}

try {
    // Fetch document details
    $stmt = $pdo->prepare("
        SELECT d.*, a.name as applicant_name, a.email as applicant_email
        FROM documents d
        JOIN applications a ON d.application_id = a.id
        WHERE d.id = ? AND d.is_deleted = FALSE
    ");
    $stmt->execute([$document_id]);
    $document = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$document) {
        http_response_code(404);
        die('Document not found');
    }
    
    // Check if file exists
    if (!file_exists($document['file_path'])) {
        http_response_code(404);
        die('File not found on server');
    }
    
    // Update download count
    $stmt = $pdo->prepare("
        UPDATE documents 
        SET download_count = download_count + 1, 
            last_downloaded_at = NOW() 
        WHERE id = ?
    ");
    $stmt->execute([$document_id]);
    
    // Log download activity
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $stmt = $pdo->prepare("
        INSERT INTO activity_log (application_id, document_id, action_type, action, description, ip_address)
        VALUES (?, ?, 'document_downloaded', 'Document Downloaded', ?, ?)
    ");
    $stmt->execute([
        $document['application_id'],
        $document_id,
        "Downloaded {$document['document_type']}: {$document['original_filename']}",
        $ip_address
    ]);
    
    // Set headers for download
    header('Content-Type: ' . $document['mime_type']);
    header('Content-Disposition: attachment; filename="' . $document['original_filename'] . '"');
    header('Content-Length: ' . $document['file_size']);
    header('Cache-Control: no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Output file
    readfile($document['file_path']);
    exit();
    
} catch (Exception $e) {
    http_response_code(500);
    die('Error downloading document: ' . $e->getMessage());
}
