<?php
/**
 * Login Authentication Handler
 * Susin Group - Employee Login System
 */

session_start();
header('Content-Type: application/json');

// Enable error logging
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once '../config/database.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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
        // Try form data
        $data = $_POST;
    }
    
    // Validate input
    if (empty($data['username']) || empty($data['password'])) {
        throw new Exception('Username and password are required');
    }
    
    $username = trim($data['username']);
    $password = $data['password'];
    
    // Get database connection
    $pdo = getDBConnection();
    
    // Find user
    $stmt = $pdo->prepare("
        SELECT id, username, password, email, full_name, role, status, last_login 
        FROM users 
        WHERE username = ? OR email = ?
    ");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch();
    
    if (!$user) {
        throw new Exception('Invalid username or password');
    }
    
    // Check if account is active
    if ($user['status'] !== 'active') {
        throw new Exception('Your account has been disabled. Please contact HR.');
    }
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        // Log failed attempt
        logLoginAttempt($pdo, $username, false, $_SERVER['REMOTE_ADDR']);
        throw new Exception('Invalid username or password');
    }
    
    // Password verified - create session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['logged_in'] = true;
    $_SESSION['login_time'] = time();
    
    // Update last login
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $updateStmt->execute([$user['id']]);
    
    // Log successful login
    logLoginAttempt($pdo, $username, true, $_SERVER['REMOTE_ADDR']);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'username' => $user['username'],
            'email' => $user['email'],
            'full_name' => $user['full_name'],
            'role' => $user['role']
        ],
        'redirect' => getDashboardUrl($user['role'])
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

/**
 * Log login attempt
 */
function logLoginAttempt($pdo, $username, $success, $ip) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO login_attempts (username, success, ip_address, user_agent, attempt_time) 
            VALUES (?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $username,
            $success ? 1 : 0,
            $ip,
            $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
        ]);
    } catch (Exception $e) {
        error_log("Failed to log login attempt: " . $e->getMessage());
    }
}

/**
 * Get dashboard URL based on user role
 */
function getDashboardUrl($role) {
    switch ($role) {
        case 'admin':
            return '/backend/admin/index.php';
        case 'hr':
            return '/backend/admin/index.php';
        case 'manager':
            return '/backend/dashboard/manager.php';
        case 'employee':
            return '/backend/dashboard/employee.php';
        default:
            return '/backend/dashboard/index.php';
    }
}
?>
