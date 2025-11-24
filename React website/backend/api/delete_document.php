<?php
/**
 * Delete Document API
 * Soft deletes a document (sets is_deleted flag)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $document_id = isset($data['document_id']) ? intval($data['document_id']) : null;
    $reason = isset($data['reason']) ? trim($data['reason']) : 'User requested deletion';
    
    if (!$document_id) {
        throw new Exception('Document ID is required');
    }
    
    // Verify document exists
    $stmt = $pdo->prepare("SELECT id, application_id, original_filename FROM documents WHERE id = ? AND is_deleted = FALSE");
    $stmt->execute([$document_id]);
    $document = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$document) {
        throw new Exception('Document not found or already deleted');
    }
    
    // Soft delete the document
    $stmt = $pdo->prepare("UPDATE documents SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?");
    $stmt->execute([$document_id]);
    
    // Log the deletion
    $stmt = $pdo->prepare("
        INSERT INTO activity_log (
            application_id, 
            action_type, 
            action_description,
            performed_by,
            ip_address
        ) VALUES (?, 'document_deleted', ?, 'system', ?)
    ");
    $stmt->execute([
        $document['application_id'],
        "Document deleted: {$document['original_filename']} - Reason: $reason",
        $_SERVER['REMOTE_ADDR']
    ]);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Document deleted successfully',
        'document_id' => $document_id
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
