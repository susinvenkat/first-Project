<?php
/**
 * Employee Dashboard
 * Susin Group - Main Dashboard
 */

session_start();

// Check if user is logged in
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: /index.html');
    exit();
}

require_once '../config/database.php';

$user = [
    'username' => $_SESSION['username'] ?? '',
    'email' => $_SESSION['email'] ?? '',
    'full_name' => $_SESSION['full_name'] ?? '',
    'role' => $_SESSION['role'] ?? 'employee'
];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Susin Group</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/navigation.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .dashboard {
            padding: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }
        .dashboard-header {
            background: linear-gradient(135deg, #c41e3a 0%, #8b1428 100%);
            color: #fff;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .dashboard-header h1 {
            margin: 0 0 0.5rem 0;
        }
        .dashboard-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .stat-card {
            background: #fff;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
            margin: 0 0 0.5rem 0;
            color: #666;
            font-size: 0.9rem;
            font-weight: 600;
        }
        .stat-card .value {
            font-size: 2rem;
            font-weight: 700;
            color: #c41e3a;
        }
        .quick-links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        .quick-link {
            background: #fff;
            padding: 1.5rem;
            border-radius: 12px;
            text-decoration: none;
            color: #333;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .quick-link:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(196, 30, 58, 0.2);
        }
        .quick-link i {
            font-size: 2rem;
            color: #c41e3a;
            margin-bottom: 0.5rem;
        }
        .quick-link h4 {
            margin: 0;
            font-size: 1rem;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="dashboard-header">
            <h1>Welcome, <?php echo htmlspecialchars($user['full_name']); ?>!</h1>
            <p>Role: <?php echo ucfirst(htmlspecialchars($user['role'])); ?> | Email: <?php echo htmlspecialchars($user['email']); ?></p>
        </div>

        <div class="dashboard-stats">
            <div class="stat-card">
                <h3>Your Role</h3>
                <div class="value"><?php echo ucfirst(htmlspecialchars($user['role'])); ?></div>
            </div>
            <div class="stat-card">
                <h3>Account Status</h3>
                <div class="value" style="color: #28a745;">Active</div>
            </div>
            <div class="stat-card">
                <h3>Last Login</h3>
                <div class="value" style="font-size: 1.2rem;">Just now</div>
            </div>
        </div>

        <h2 style="margin-bottom: 1rem;">Quick Access</h2>
        <div class="quick-links">
            <?php if ($user['role'] === 'admin' || $user['role'] === 'hr'): ?>
            <a href="/backend/admin/index.php" class="quick-link">
                <i class="fas fa-briefcase"></i>
                <h4>Job Applications</h4>
                <p>Manage career applications</p>
            </a>
            <?php endif; ?>
            
            <a href="/index.html" class="quick-link">
                <i class="fas fa-home"></i>
                <h4>Main Website</h4>
                <p>Back to home page</p>
            </a>
            
            <a href="/products.html" class="quick-link">
                <i class="fas fa-cogs"></i>
                <h4>Products</h4>
                <p>View product catalog</p>
            </a>
            
            <a href="/resources.html" class="quick-link">
                <i class="fas fa-book"></i>
                <h4>Resources</h4>
                <p>Technical documentation</p>
            </a>
            
            <a href="#" onclick="logout(); return false;" class="quick-link">
                <i class="fas fa-sign-out-alt"></i>
                <h4>Logout</h4>
                <p>Sign out of your account</p>
            </a>
        </div>
    </div>

    <script>
        async function logout() {
            try {
                const response = await fetch('/backend/auth/logout.php');
                const data = await response.json();
                if (data.success) {
                    window.location.href = '/index.html';
                }
            } catch (error) {
                console.error('Logout error:', error);
                window.location.href = '/index.html';
            }
        }
    </script>
</body>
</html>
