<?php
/**
 * Verify Document API
 * Marks a document as verified by admin
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $document_id = isset($data['document_id']) ? intval($data['document_id']) : null;
    $verified_by = isset($data['verified_by']) ? trim($data['verified_by']) : 'admin';
    $notes = isset($data['notes']) ? trim($data['notes']) : '';
    
    if (!$document_id) {
        throw new Exception('Document ID is required');
    }
    
    // Verify document exists
    $stmt = $pdo->prepare("SELECT id, application_id, original_filename, is_verified FROM documents WHERE id = ? AND is_deleted = FALSE");
    $stmt->execute([$document_id]);
    $document = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$document) {
        throw new Exception('Document not found or deleted');
    }
    
    if ($document['is_verified']) {
        throw new Exception('Document is already verified');
    }
    
    // Mark as verified
    $stmt = $pdo->prepare("
        UPDATE documents 
        SET is_verified = TRUE, 
            verified_at = NOW(),
            verified_by = ?
        WHERE id = ?
    ");
    $stmt->execute([$verified_by, $document_id]);
    
    // Log the verification
    $description = "Document verified: {$document['original_filename']}";
    if ($notes) {
        $description .= " - Notes: $notes";
    }
    
    $stmt = $pdo->prepare("
        INSERT INTO activity_log (
            application_id, 
            action_type, 
            action_description,
            performed_by,
            ip_address
        ) VALUES (?, 'document_verified', ?, ?, ?)
    ");
    $stmt->execute([
        $document['application_id'],
        $description,
        $verified_by,
        $_SERVER['REMOTE_ADDR']
    ]);
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Document verified successfully',
        'document_id' => $document_id,
        'verified_by' => $verified_by,
        'verified_at' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
