<?php
/**
 * Database Setup & Initialization Script
 * Run this file ONCE to set up the admin system
 * Access: http://localhost/backend/setup_admin.php
 */

require_once 'config/database.php';

$output = [];
$errors = [];

try {
    $pdo = getDBConnection();
    $output[] = "✓ Database connection successful";
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        full_name VARCHAR(255) NOT NULL,
        employee_id VARCHAR(50),
        role ENUM('admin', 'hr', 'manager', 'employee') DEFAULT 'employee',
        department VARCHAR(100),
        phone VARCHAR(50),
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        password_changed_at TIMESTAMP NULL,
        failed_login_attempts INT DEFAULT 0,
        locked_until TIMESTAMP NULL,
        INDEX idx_username (username),
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_role (role)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    $output[] = "✓ Users table created/verified";
    
    // Create login_attempts table
    $sql = "CREATE TABLE IF NOT EXISTS login_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        user_id INT NULL,
        success TINYINT(1) DEFAULT 0,
        ip_address VARCHAR(45),
        user_agent VARCHAR(500),
        failure_reason VARCHAR(255),
        attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_user_id (user_id),
        INDEX idx_time (attempt_time),
        INDEX idx_ip (ip_address)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    $output[] = "✓ Login attempts table created/verified";
    
    // Create user_sessions table
    $sql = "CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        session_id VARCHAR(255) NOT NULL,
        ip_address VARCHAR(45),
        user_agent VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NULL,
        is_active TINYINT(1) DEFAULT 1,
        INDEX idx_session (session_id),
        INDEX idx_user (user_id),
        INDEX idx_active (is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $pdo->exec($sql);
    $output[] = "✓ User sessions table created/verified";
    
    // Check if admin user exists
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE username = 'admin'");
    $adminExists = $stmt->fetch()['count'] > 0;
    
    if (!$adminExists) {
        // Create default admin user
        // Username: admin
        // Password: Admin@2025
        $adminPassword = password_hash('Admin@2025', PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO users (username, password, email, full_name, role, status, created_at) 
                VALUES ('admin', :password, 'admin@susingroup.com', 'System Administrator', 'admin', 'active', NOW())";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':password' => $adminPassword]);
        
        $output[] = "✓ Default admin user created";
        $output[] = "  Username: admin";
        $output[] = "  Password: Admin@2025";
        $output[] = "  Email: admin@susingroup.com";
    } else {
        $output[] = "⚠ Admin user already exists - skipped creation";
    }
    
    // Check if HR user exists
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE username = 'hr_manager'");
    $hrExists = $stmt->fetch()['count'] > 0;
    
    if (!$hrExists) {
        // Create HR manager user
        // Username: hr_manager
        // Password: HR@2025
        $hrPassword = password_hash('HR@2025', PASSWORD_DEFAULT);
        
        $sql = "INSERT INTO users (username, password, email, full_name, role, department, status, created_at) 
                VALUES ('hr_manager', :password, 'hr@susingroup.com', 'HR Manager', 'hr', 'Human Resources', 'active', NOW())";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':password' => $hrPassword]);
        
        $output[] = "✓ HR manager user created";
        $output[] = "  Username: hr_manager";
        $output[] = "  Password: HR@2025";
        $output[] = "  Email: hr@susingroup.com";
    } else {
        $output[] = "⚠ HR manager already exists - skipped creation";
    }
    
    $output[] = "";
    $output[] = "========================================";
    $output[] = "Setup completed successfully!";
    $output[] = "========================================";
    $output[] = "";
    $output[] = "You can now log in at:";
    $output[] = "→ /backend/auth/login.php";
    $output[] = "";
    $output[] = "IMPORTANT: For security reasons, delete this setup file after completion!";
    
} catch (PDOException $e) {
    $errors[] = "Database Error: " . $e->getMessage();
} catch (Exception $e) {
    $errors[] = "Error: " . $e->getMessage();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin System Setup - Susin Group</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .setup-container {
            background: #1a202c;
            color: #e2e8f0;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 700px;
            width: 100%;
        }
        
        .header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 2px solid #2d3748;
        }
        
        .header h1 {
            font-size: 2rem;
            color: #fff;
            margin-bottom: 0.5rem;
        }
        
        .header p {
            color: #a0aec0;
            font-size: 0.875rem;
        }
        
        .output {
            background: #2d3748;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
            line-height: 1.8;
        }
        
        .output-line {
            margin-bottom: 0.5rem;
        }
        
        .output-line.success {
            color: #68d391;
        }
        
        .output-line.warning {
            color: #f6ad55;
        }
        
        .output-line.error {
            color: #fc8181;
        }
        
        .output-line.info {
            color: #63b3ed;
        }
        
        .credentials {
            background: #c41e3a;
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 1.5rem;
        }
        
        .credentials h3 {
            margin-bottom: 1rem;
            font-size: 1.125rem;
        }
        
        .credential-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        
        .credential-item:last-child {
            border-bottom: none;
        }
        
        .credential-label {
            font-weight: 600;
        }
        
        .credential-value {
            font-family: 'Courier New', monospace;
            background: rgba(0,0,0,0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
        }
        
        .actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .btn {
            flex: 1;
            padding: 0.875rem;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            transition: all 0.2s;
            font-size: 0.875rem;
        }
        
        .btn-primary {
            background: #c41e3a;
            color: white;
        }
        
        .btn-primary:hover {
            background: #a01828;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: #4a5568;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #2d3748;
        }
        
        .warning-box {
            background: #fed7d7;
            color: #742a2a;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1.5rem;
            border-left: 4px solid #fc8181;
        }
        
        .warning-box strong {
            display: block;
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="setup-container">
        <div class="header">
            <h1>🚀 Susin Group Admin Setup</h1>
            <p>Database initialization and user creation</p>
        </div>
        
        <div class="output">
            <?php foreach ($output as $line): ?>
                <?php
                $class = 'info';
                if (strpos($line, '✓') === 0) $class = 'success';
                if (strpos($line, '⚠') === 0) $class = 'warning';
                if (strpos($line, '→') === 0) $class = 'info';
                ?>
                <div class="output-line <?= $class ?>">
                    <?= htmlspecialchars($line) ?>
                </div>
            <?php endforeach; ?>
            
            <?php foreach ($errors as $error): ?>
                <div class="output-line error">
                    ✗ <?= htmlspecialchars($error) ?>
                </div>
            <?php endforeach; ?>
        </div>
        
        <?php if (empty($errors)): ?>
        <div class="credentials">
            <h3>🔐 Default Login Credentials</h3>
            
            <div class="credential-item">
                <span class="credential-label">Admin Username:</span>
                <span class="credential-value">admin</span>
            </div>
            <div class="credential-item">
                <span class="credential-label">Admin Password:</span>
                <span class="credential-value">Admin@2025</span>
            </div>
            <div class="credential-item">
                <span class="credential-label">Admin Email:</span>
                <span class="credential-value">admin@susingroup.com</span>
            </div>
            
            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2);">
                <div class="credential-item">
                    <span class="credential-label">HR Username:</span>
                    <span class="credential-value">hr_manager</span>
                </div>
                <div class="credential-item">
                    <span class="credential-label">HR Password:</span>
                    <span class="credential-value">HR@2025</span>
                </div>
            </div>
        </div>
        
        <div class="actions">
            <a href="auth/login.php" class="btn btn-primary">
                Go to Login Page →
            </a>
            <a href="admin/dashboard.php" class="btn btn-secondary">
                Admin Dashboard
            </a>
        </div>
        
        <div class="warning-box">
            <strong>⚠️ Security Notice</strong>
            Please delete this setup file (setup_admin.php) after successful installation for security reasons. Change the default passwords immediately after first login.
        </div>
        <?php endif; ?>
    </div>
</body>
</html>
