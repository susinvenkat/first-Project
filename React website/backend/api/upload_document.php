<?php
/**
 * Document Upload API
 * Handles resume and document uploads for career applications
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

// Configuration
define('UPLOAD_DIR', '../uploads/resumes/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_EXTENSIONS', ['pdf', 'doc', 'docx']);
define('ALLOWED_MIME_TYPES', [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

// Create upload directory if it doesn't exist
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

// Validate request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get application ID from POST data
    $application_id = isset($_POST['application_id']) ? intval($_POST['application_id']) : null;
    $document_type = isset($_POST['document_type']) ? $_POST['document_type'] : 'resume';
    
    if (!$application_id) {
        throw new Exception('Application ID is required');
    }
    
    // Validate file upload
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        $error_messages = [
            UPLOAD_ERR_INI_SIZE => 'File exceeds upload_max_filesize',
            UPLOAD_ERR_FORM_SIZE => 'File exceeds MAX_FILE_SIZE',
            UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
            UPLOAD_ERR_EXTENSION => 'File upload stopped by extension'
        ];
        $error = isset($_FILES['file']['error']) ? $_FILES['file']['error'] : UPLOAD_ERR_NO_FILE;
        throw new Exception($error_messages[$error] ?? 'Unknown upload error');
    }
    
    $file = $_FILES['file'];
    $original_filename = basename($file['name']);
    $file_size = $file['size'];
    $file_tmp = $file['tmp_name'];
    $file_type = $file['type'];
    
    // Validate file size
    if ($file_size > MAX_FILE_SIZE) {
        throw new Exception('File size exceeds maximum limit of 5MB');
    }
    
    // Validate file extension
    $file_ext = strtolower(pathinfo($original_filename, PATHINFO_EXTENSION));
    if (!in_array($file_ext, ALLOWED_EXTENSIONS)) {
        throw new Exception('Invalid file type. Only PDF, DOC, and DOCX files are allowed');
    }
    
    // Validate MIME type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $detected_mime = finfo_file($finfo, $file_tmp);
    finfo_close($finfo);
    
    if (!in_array($detected_mime, ALLOWED_MIME_TYPES)) {
        throw new Exception('Invalid file format detected');
    }
    
    // Generate unique filename
    $timestamp = time();
    $random = bin2hex(random_bytes(8));
    $stored_filename = "resume_{$application_id}_{$timestamp}_{$random}.{$file_ext}";
    $file_path = UPLOAD_DIR . $stored_filename;
    
    // Calculate file hash
    $file_hash = hash_file('sha256', $file_tmp);
    
    // Check for duplicate files
    $stmt = $pdo->prepare("SELECT id, original_filename FROM documents WHERE file_hash = ? AND is_deleted = FALSE LIMIT 1");
    $stmt->execute([$file_hash]);
    $duplicate = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($duplicate) {
        throw new Exception("This file has already been uploaded: {$duplicate['original_filename']}");
    }
    
    // Move uploaded file
    if (!move_uploaded_file($file_tmp, $file_path)) {
        throw new Exception('Failed to save uploaded file');
    }
    
    // Insert document record into database
    $stmt = $pdo->prepare("
        INSERT INTO documents (
            application_id, 
            document_type, 
            original_filename, 
            stored_filename, 
            file_path, 
            file_size, 
            file_extension, 
            mime_type,
            file_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $application_id,
        $document_type,
        $original_filename,
        $stored_filename,
        $file_path,
        $file_size,
        $file_ext,
        $detected_mime,
        $file_hash
    ]);
    
    $document_id = $pdo->lastInsertId();
    
    // Get client IP
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    // Log activity
    $stmt = $pdo->prepare("
        INSERT INTO activity_log (application_id, document_id, action_type, action, description, ip_address)
        VALUES (?, ?, 'document_uploaded', 'Document Uploaded', ?, ?)
    ");
    $stmt->execute([
        $application_id,
        $document_id,
        "Uploaded {$document_type}: {$original_filename} (" . round($file_size / 1024, 2) . " KB)",
        $ip_address
    ]);
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Document uploaded successfully',
        'data' => [
            'document_id' => $document_id,
            'original_filename' => $original_filename,
            'file_size' => $file_size,
            'file_size_kb' => round($file_size / 1024, 2),
            'document_type' => $document_type,
            'uploaded_at' => date('Y-m-d H:i:s')
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
    
    // Clean up file if it was uploaded but database insert failed
    if (isset($file_path) && file_exists($file_path)) {
        @unlink($file_path);
    }
}
