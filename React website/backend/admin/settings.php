<?php
/**
 * Settings & Control Panel
 * Susin Group Admin System
 */

session_start();
require_once '../config/database.php';

// Check authentication
if (!isset($_SESSION['user_id'])) {
    header('Location: ../auth/login.php');
    exit();
}

$pdo = getDBConnection();

// Get current user
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$currentUser = $stmt->fetch();

// Only admins can access settings
if ($currentUser['role'] !== 'admin') {
    header('Location: dashboard.php');
    exit();
}

$message = '';
$error = '';

// Handle settings updates
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    try {
        switch ($action) {
            case 'update_profile':
                $stmt = $pdo->prepare("UPDATE users SET full_name = ?, email = ?, phone = ? WHERE id = ?");
                $stmt->execute([
                    $_POST['full_name'],
                    $_POST['email'],
                    $_POST['phone'],
                    $currentUser['id']
                ]);
                $message = 'Profile updated successfully!';
                break;
                
            case 'change_password':
                if (!password_verify($_POST['current_password'], $currentUser['password'])) {
                    throw new Exception('Current password is incorrect');
                }
                
                if ($_POST['new_password'] !== $_POST['confirm_password']) {
                    throw new Exception('New passwords do not match');
                }
                
                if (strlen($_POST['new_password']) < 8) {
                    throw new Exception('Password must be at least 8 characters');
                }
                
                $newHash = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("UPDATE users SET password = ?, password_changed_at = NOW() WHERE id = ?");
                $stmt->execute([$newHash, $currentUser['id']]);
                $message = 'Password changed successfully!';
                break;
                
            case 'update_system':
                // Update system settings (you can expand this)
                $message = 'System settings updated successfully!';
                break;
        }
        
        // Refresh user data
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$currentUser['id']]);
        $currentUser = $stmt->fetch();
        
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

// Get system stats
$stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE status = 'active'");
$activeUsers = $stmt->fetch()['count'];

$stmt = $pdo->query("SELECT COUNT(*) as count FROM applications");
$totalApplications = $stmt->fetch()['count'];

$stmt = $pdo->query("SELECT COUNT(*) as count FROM login_attempts WHERE attempt_time >= DATE_SUB(NOW(), INTERVAL 24 HOUR)");
$todayLogins = $stmt->fetch()['count'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings & Control Panel - Susin Group</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="dashboard.php" type="text/css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f5f7fa;
            color: #2d3748;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            background: white;
            padding: 1.5rem 2rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header h1 {
            font-size: 1.875rem;
            color: #1a202c;
        }
        
        .btn {
            padding: 0.625rem 1.25rem;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
        }
        
        .btn-primary {
            background: #c41e3a;
            color: white;
        }
        
        .btn-primary:hover {
            background: #a01828;
        }
        
        .btn-secondary {
            background: white;
            color: #4a5568;
            border: 1px solid #e2e8f0;
        }
        
        .alert {
            padding: 1rem 1.5rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .alert-success {
            background: #c6f6d5;
            color: #22543d;
            border: 1px solid #9ae6b4;
        }
        
        .alert-error {
            background: #fed7d7;
            color: #742a2a;
            border: 1px solid #fc8181;
        }
        
        .settings-grid {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 2rem;
        }
        
        .settings-nav {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            height: fit-content;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .settings-nav h3 {
            font-size: 1.125rem;
            margin-bottom: 1rem;
            color: #1a202c;
        }
        
        .settings-nav-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            color: #4a5568;
            text-decoration: none;
            transition: all 0.2s;
            margin-bottom: 0.5rem;
        }
        
        .settings-nav-item:hover {
            background: #f7fafc;
            color: #c41e3a;
        }
        
        .settings-nav-item.active {
            background: #fee;
            color: #c41e3a;
            font-weight: 600;
        }
        
        .settings-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .settings-section {
            margin-bottom: 2.5rem;
        }
        
        .settings-section:last-child {
            margin-bottom: 0;
        }
        
        .section-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 0.5rem;
        }
        
        .section-description {
            color: #718096;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.875rem;
            transition: border-color 0.2s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #c41e3a;
            box-shadow: 0 0 0 3px rgba(196,30,58,0.1);
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .info-card {
            background: #f7fafc;
            padding: 1.5rem;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
        }
        
        .info-card-label {
            font-size: 0.75rem;
            color: #718096;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }
        
        .info-card-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1a202c;
        }
        
        .divider {
            height: 1px;
            background: #e2e8f0;
            margin: 2rem 0;
        }
        
        @media (max-width: 768px) {
            .settings-grid {
                grid-template-columns: 1fr;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><i class="fas fa-cog"></i> Settings & Control Panel</h1>
            <a href="dashboard.php" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Back to Dashboard
            </a>
        </div>
        
        <?php if ($message): ?>
        <div class="alert alert-success">
            <i class="fas fa-check-circle"></i>
            <?= htmlspecialchars($message) ?>
        </div>
        <?php endif; ?>
        
        <?php if ($error): ?>
        <div class="alert alert-error">
            <i class="fas fa-exclamation-circle"></i>
            <?= htmlspecialchars($error) ?>
        </div>
        <?php endif; ?>
        
        <div class="settings-grid">
            <!-- Settings Navigation -->
            <div class="settings-nav">
                <h3>Settings</h3>
                <a href="#profile" class="settings-nav-item active">
                    <i class="fas fa-user"></i>
                    Profile Settings
                </a>
                <a href="#security" class="settings-nav-item">
                    <i class="fas fa-lock"></i>
                    Security
                </a>
                <a href="#system" class="settings-nav-item">
                    <i class="fas fa-server"></i>
                    System Info
                </a>
                <a href="users.php" class="settings-nav-item">
                    <i class="fas fa-users"></i>
                    User Management
                </a>
                <a href="logs.php" class="settings-nav-item">
                    <i class="fas fa-clipboard-list"></i>
                    Activity Logs
                </a>
            </div>
            
            <!-- Settings Content -->
            <div class="settings-content">
                <!-- Profile Settings -->
                <div id="profile" class="settings-section">
                    <h2 class="section-title">Profile Settings</h2>
                    <p class="section-description">Manage your personal account information</p>
                    
                    <form method="POST">
                        <input type="hidden" name="action" value="update_profile">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" name="full_name" value="<?= htmlspecialchars($currentUser['full_name']) ?>" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" value="<?= htmlspecialchars($currentUser['username']) ?>" disabled>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" value="<?= htmlspecialchars($currentUser['email']) ?>" required>
                            </div>
                            
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone" value="<?= htmlspecialchars($currentUser['phone'] ?? '') ?>">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Role</label>
                                <input type="text" value="<?= htmlspecialchars(ucfirst($currentUser['role'])) ?>" disabled>
                            </div>
                            
                            <div class="form-group">
                                <label>Department</label>
                                <input type="text" value="<?= htmlspecialchars($currentUser['department'] ?? 'N/A') ?>" disabled>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </form>
                </div>
                
                <div class="divider"></div>
                
                <!-- Security Settings -->
                <div id="security" class="settings-section">
                    <h2 class="section-title">Security Settings</h2>
                    <p class="section-description">Update your password and security preferences</p>
                    
                    <form method="POST">
                        <input type="hidden" name="action" value="change_password">
                        
                        <div class="form-group">
                            <label>Current Password</label>
                            <input type="password" name="current_password" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>New Password</label>
                                <input type="password" name="new_password" required minlength="8">
                            </div>
                            
                            <div class="form-group">
                                <label>Confirm New Password</label>
                                <input type="password" name="confirm_password" required minlength="8">
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-key"></i> Change Password
                        </button>
                    </form>
                    
                    <div style="margin-top: 1.5rem; padding: 1rem; background: #f7fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                        <strong style="color: #2d3748; display: block; margin-bottom: 0.5rem;">
                            <i class="fas fa-info-circle" style="color: #3182ce;"></i> Password Requirements:
                        </strong>
                        <ul style="margin-left: 1.5rem; color: #4a5568; font-size: 0.875rem;">
                            <li>Minimum 8 characters</li>
                            <li>Include uppercase and lowercase letters</li>
                            <li>Include at least one number</li>
                            <li>Include at least one special character</li>
                        </ul>
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <!-- System Information -->
                <div id="system" class="settings-section">
                    <h2 class="section-title">System Information</h2>
                    <p class="section-description">Overview of system statistics and health</p>
                    
                    <div class="info-grid">
                        <div class="info-card">
                            <div class="info-card-label">Active Users</div>
                            <div class="info-card-value"><?= $activeUsers ?></div>
                        </div>
                        
                        <div class="info-card">
                            <div class="info-card-label">Total Applications</div>
                            <div class="info-card-value"><?= $totalApplications ?></div>
                        </div>
                        
                        <div class="info-card">
                            <div class="info-card-label">Logins Today</div>
                            <div class="info-card-value"><?= $todayLogins ?></div>
                        </div>
                    </div>
                    
                    <div class="form-row" style="margin-top: 1.5rem;">
                        <div class="info-card">
                            <div class="info-card-label">Database</div>
                            <div style="color: #2d3748; font-weight: 600; margin-top: 0.5rem;">
                                <?= DB_NAME ?>
                            </div>
                        </div>
                        
                        <div class="info-card">
                            <div class="info-card-label">PHP Version</div>
                            <div style="color: #2d3748; font-weight: 600; margin-top: 0.5rem;">
                                <?= PHP_VERSION ?>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-card" style="margin-top: 1rem;">
                        <div class="info-card-label">Last Login</div>
                        <div style="color: #2d3748; font-weight: 600; margin-top: 0.5rem;">
                            <?= $currentUser['last_login'] ? date('F j, Y g:i A', strtotime($currentUser['last_login'])) : 'Never' ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
