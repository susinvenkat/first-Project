<?php
/**
 * User Registration Handler
 * Susin Group - Employee Registration System
 * Note: This should be restricted to admin users only in production
 */

session_start();
header('Content-Type: application/json');

require_once '../config/database.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        $data = $_POST;
    }
    
    // Validate required fields
    $required = ['username', 'password', 'email', 'full_name'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new Exception("Field '$field' is required");
        }
    }
    
    $username = trim($data['username']);
    $password = $data['password'];
    $email = trim($data['email']);
    $full_name = trim($data['full_name']);
    $role = $data['role'] ?? 'employee';
    $department = $data['department'] ?? '';
    $employee_id = $data['employee_id'] ?? '';
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }
    
    // Validate password strength
    if (strlen($password) < 8) {
        throw new Exception('Password must be at least 8 characters long');
    }
    
    // Validate username
    if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
        throw new Exception('Username must be 3-20 characters (letters, numbers, underscore only)');
    }
    
    // Get database connection
    $pdo = getDBConnection();
    
    // Check if username exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        throw new Exception('Username already exists');
    }
    
    // Check if email exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        throw new Exception('Email already registered');
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    // Insert user
    $stmt = $pdo->prepare("
        INSERT INTO users (username, password, email, full_name, role, department, employee_id, status, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'active', NOW())
    ");
    
    $stmt->execute([
        $username,
        $hashedPassword,
        $email,
        $full_name,
        $role,
        $department,
        $employee_id
    ]);
    
    $userId = $pdo->lastInsertId();
    
    // Log activity
    $logStmt = $pdo->prepare("
        INSERT INTO activity_log (action, description, created_at) 
        VALUES ('user_registered', ?, NOW())
    ");
    $logStmt->execute(["New user registered: $username ($email)"]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user_id' => $userId
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
