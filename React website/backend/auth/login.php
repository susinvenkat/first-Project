<?php
/**
 * Login Authentication Handler
 * Susin Group - Employee Login System
 */

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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
        SELECT id, username, password, email, full_name, role, status, last_login, 
               locked_until, failed_login_attempts
        FROM users 
        WHERE username = ? OR email = ?
    ");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch();
    
    if (!$user) {
        // Log failed attempt (no user found)
        logLoginAttempt($pdo, $username, null, false, 'User not found', $_SERVER['REMOTE_ADDR']);
        throw new Exception('Invalid username or password');
    }
    
    // Check if account is locked
    if ($user['locked_until'] && strtotime($user['locked_until']) > time()) {
        $timeLeft = ceil((strtotime($user['locked_until']) - time()) / 60);
        throw new Exception("Account is locked. Please try again in {$timeLeft} minutes.");
    }
    
    // Check if account is active
    if ($user['status'] !== 'active') {
        throw new Exception('Your account has been disabled. Please contact administrator.');
    }
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        // Log failed attempt
        logLoginAttempt($pdo, $username, $user['id'], false, 'Invalid password', $_SERVER['REMOTE_ADDR']);
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
    
    // Update last login and reset failed attempts
    $updateStmt = $pdo->prepare("
        UPDATE users 
        SET last_login = NOW(), 
            failed_login_attempts = 0,
            locked_until = NULL
        WHERE id = ?
    ");
    $updateStmt->execute([$user['id']]);
    
    // Log successful login
    logLoginAttempt($pdo, $username, $user['id'], true, null, $_SERVER['REMOTE_ADDR']);
    
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
function logLoginAttempt($pdo, $username, $userId, $success, $failureReason, $ip) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO login_attempts (username, user_id, success, failure_reason, ip_address, user_agent, attempt_time) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([
            $username,
            $userId,
            $success ? 1 : 0,
            $failureReason,
            $ip,
            $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
        ]);
        
        // If failed login, increment failed_login_attempts
        if (!$success && $userId) {
            $lockStmt = $pdo->prepare("
                UPDATE users 
                SET failed_login_attempts = failed_login_attempts + 1,
                    locked_until = CASE 
                        WHEN failed_login_attempts + 1 >= 5 
                        THEN DATE_ADD(NOW(), INTERVAL 30 MINUTE)
                        ELSE locked_until
                    END
                WHERE id = ?
            ");
            $lockStmt->execute([$userId]);
        }
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
        case 'hr':
            return '/backend/admin/dashboard.php';
        case 'manager':
            return '/backend/admin/dashboard.php';
        case 'employee':
            return '/backend/dashboard/index.php';
        default:
            return '/backend/admin/dashboard.php';
    }
}
?>
