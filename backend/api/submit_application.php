<?php
/**
 * Resume Submission API Endpoint
 * Susin Group - Careers Application Backend
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../config/database.php';

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Validate required fields
    $required_fields = ['name', 'email', 'role'];
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Field '$field' is required.");
        }
    }
    
    // Sanitize inputs
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST['phone']) ? filter_var($_POST['phone'], FILTER_SANITIZE_STRING) : '';
    $role = filter_var($_POST['role'], FILTER_SANITIZE_STRING);
    $message = isset($_POST['message']) ? filter_var($_POST['message'], FILTER_SANITIZE_STRING) : '';
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email address.");
    }
    
    // Handle file upload
    $resume_filename = null;
    $resume_path = null;
    
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['resume'];
        
        // Validate file size
        if ($file['size'] > MAX_FILE_SIZE) {
            throw new Exception("File size exceeds 5MB limit.");
        }
        
        // Validate file type
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        
        if (!in_array($mime_type, ALLOWED_TYPES)) {
            throw new Exception("Only PDF files are allowed.");
        }
        
        // Validate file extension
        $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($file_extension, ALLOWED_EXTENSIONS)) {
            throw new Exception("Only PDF files are allowed.");
        }
        
        // Generate unique filename
        $timestamp = date('YmdHis');
        $sanitized_name = preg_replace('/[^a-zA-Z0-9_-]/', '', str_replace(' ', '_', $name));
        $resume_filename = $sanitized_name . '_' . $timestamp . '.pdf';
        $resume_path = UPLOAD_DIR . $resume_filename;
        
        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $resume_path)) {
            throw new Exception("Failed to upload resume. Please try again.");
        }
    } else if (isset($_FILES['resume']) && $_FILES['resume']['error'] !== UPLOAD_ERR_NO_FILE) {
        throw new Exception("File upload error. Please try again.");
    }
    
    // Get client information
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    // Insert into database
    $pdo = getDBConnection();
    
    $sql = "INSERT INTO applications (name, email, phone, role, resume_filename, resume_path, message, ip_address, user_agent) 
            VALUES (:name, :email, :phone, :role, :resume_filename, :resume_path, :message, :ip_address, :user_agent)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':role' => $role,
        ':resume_filename' => $resume_filename,
        ':resume_path' => $resume_path,
        ':message' => $message,
        ':ip_address' => $ip_address,
        ':user_agent' => $user_agent
    ]);
    
    $application_id = $pdo->lastInsertId();
    
    // Log activity
    $log_sql = "INSERT INTO activity_log (application_id, action, description) 
                VALUES (:application_id, 'submitted', 'Application submitted via web form')";
    $log_stmt = $pdo->prepare($log_sql);
    $log_stmt->execute([':application_id' => $application_id]);
    
    // Send notification email (optional - configure SMTP)
    sendNotificationEmail($name, $email, $role, $application_id);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Application submitted successfully! Our HR team will review your application and contact you soon.',
        'application_id' => $application_id
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

/**
 * Send notification email to HR
 */
function sendNotificationEmail($name, $email, $role, $application_id) {
    $to = HR_EMAIL;
    $subject = "New Career Application: " . $role;
    
    $body = "New career application received:\n\n";
    $body .= "Application ID: #" . $application_id . "\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Role: " . $role . "\n";
    $body .= "Date: " . date('Y-m-d H:i:s') . "\n\n";
    $body .= "Please review the application in the admin panel.\n";
    
    $headers = "From: " . FROM_EMAIL . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Note: Configure proper SMTP for production
    @mail($to, $subject, $body, $headers);
}

?>
