<?php
/**
 * Admin Dashboard for Resume Management
 * Susin Group - Careers Application Backend
 */

session_start();

// Simple authentication (change credentials in production!)
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'SusinHR2025!');

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['username'] === ADMIN_USERNAME && $_POST['password'] === ADMIN_PASSWORD) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: index.php');
        exit();
    } else {
        $login_error = "Invalid credentials";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit();
}

// Check if logged in
if (!isset($_SESSION['admin_logged_in'])) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login - Susin Careers</title>
        <link rel="stylesheet" href="../../css/style.css">
        <style>
            .login-container {
                max-width: 400px;
                margin: 100px auto;
                padding: 2rem;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .login-container h1 {
                text-align: center;
                color: #c41e3a;
                margin-bottom: 2rem;
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
            .form-group input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .btn-login {
                width: 100%;
                padding: 0.75rem;
                background: #c41e3a;
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
            }
            .btn-login:hover {
                background: #a01828;
            }
            .error {
                color: #c41e3a;
                text-align: center;
                margin-bottom: 1rem;
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h1>Admin Login</h1>
            <?php if (isset($login_error)): ?>
                <p class="error"><?= htmlspecialchars($login_error) ?></p>
            <?php endif; ?>
            <form method="POST">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" name="login" class="btn-login">Login</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit();
}

// Admin is logged in - show dashboard
require_once '../config/database.php';

// Handle status updates
if (isset($_POST['update_status'])) {
    $app_id = (int)$_POST['application_id'];
    $new_status = $_POST['status'];
    $notes = $_POST['notes'] ?? '';
    
    $pdo = getDBConnection();
    $sql = "UPDATE applications SET status = :status, notes = :notes WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':status' => $new_status, ':notes' => $notes, ':id' => $app_id]);
    
    // Log activity
    $log_sql = "INSERT INTO activity_log (application_id, action, description) 
                VALUES (:app_id, 'status_changed', :description)";
    $log_stmt = $pdo->prepare($log_sql);
    $log_stmt->execute([
        ':app_id' => $app_id,
        ':description' => "Status changed to: $new_status"
    ]);
}

// Fetch applications
$pdo = getDBConnection();
$filter_status = $_GET['status'] ?? 'all';
$search = $_GET['search'] ?? '';

$sql = "SELECT * FROM applications WHERE 1=1";
$params = [];

if ($filter_status !== 'all') {
    $sql .= " AND status = :status";
    $params[':status'] = $filter_status;
}

if ($search) {
    $sql .= " AND (name LIKE :search OR email LIKE :search OR role LIKE :search)";
    $params[':search'] = "%$search%";
}

$sql .= " ORDER BY application_date DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$applications = $stmt->fetchAll();

// Get statistics
$stats_sql = "SELECT status, COUNT(*) as count FROM applications GROUP BY status";
$stats = $pdo->query($stats_sql)->fetchAll(PDO::FETCH_KEY_PAIR);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume Management Dashboard - Susin Careers</title>
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            background: #f5f5f5;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        }
        .admin-header {
            background: #c41e3a;
            color: #fff;
            padding: 1.5rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .admin-header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .admin-header h1 {
            margin: 0;
            font-size: 1.5rem;
        }
        .btn-logout {
            padding: 0.5rem 1.5rem;
            background: rgba(255,255,255,0.2);
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.3s;
        }
        .btn-logout:hover {
            background: rgba(255,255,255,0.3);
        }
        .dashboard-container {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .stat-card {
            background: #fff;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .stat-card h3 {
            margin: 0 0 0.5rem 0;
            font-size: 0.875rem;
            color: #666;
            text-transform: uppercase;
        }
        .stat-card .number {
            font-size: 2rem;
            font-weight: 700;
            color: #c41e3a;
        }
        .filters {
            background: #fff;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            margin-bottom: 2rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        .filters input, .filters select {
            padding: 0.5rem 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .applications-table {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            overflow: hidden;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background: #f8f9fa;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            color: #333;
            border-bottom: 2px solid #dee2e6;
        }
        td {
            padding: 1rem;
            border-bottom: 1px solid #dee2e6;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .status-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }
        .status-new { background: #e3f2fd; color: #1976d2; }
        .status-reviewed { background: #fff3e0; color: #f57c00; }
        .status-shortlisted { background: #e8f5e9; color: #388e3c; }
        .status-rejected { background: #ffebee; color: #d32f2f; }
        .status-hired { background: #f3e5f5; color: #7b1fa2; }
        .btn-action {
            padding: 0.25rem 0.75rem;
            background: #c41e3a;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.875rem;
            display: inline-block;
            margin: 0 0.25rem;
        }
        .btn-action:hover {
            background: #a01828;
        }
    </style>
</head>
<body>
    <header class="admin-header">
        <div class="container">
            <h1><i class="fas fa-briefcase"></i> Resume Management Dashboard</h1>
            <a href="?logout=1" class="btn-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </header>

    <div class="dashboard-container">
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Applications</h3>
                <div class="number"><?= count($applications) ?></div>
            </div>
            <div class="stat-card">
                <h3>New</h3>
                <div class="number"><?= $stats['new'] ?? 0 ?></div>
            </div>
            <div class="stat-card">
                <h3>Shortlisted</h3>
                <div class="number"><?= $stats['shortlisted'] ?? 0 ?></div>
            </div>
            <div class="stat-card">
                <h3>Hired</h3>
                <div class="number"><?= $stats['hired'] ?? 0 ?></div>
            </div>
        </div>

        <div class="filters">
            <form method="GET" style="display: flex; gap: 1rem; flex: 1;">
                <input type="text" name="search" placeholder="Search name, email, or role..." value="<?= htmlspecialchars($search) ?>" style="flex: 1;">
                <select name="status">
                    <option value="all" <?= $filter_status === 'all' ? 'selected' : '' ?>>All Status</option>
                    <option value="new" <?= $filter_status === 'new' ? 'selected' : '' ?>>New</option>
                    <option value="reviewed" <?= $filter_status === 'reviewed' ? 'selected' : '' ?>>Reviewed</option>
                    <option value="shortlisted" <?= $filter_status === 'shortlisted' ? 'selected' : '' ?>>Shortlisted</option>
                    <option value="rejected" <?= $filter_status === 'rejected' ? 'selected' : '' ?>>Rejected</option>
                    <option value="hired" <?= $filter_status === 'hired' ? 'selected' : '' ?>>Hired</option>
                </select>
                <button type="submit" class="btn-action"><i class="fas fa-search"></i> Filter</button>
            </form>
        </div>

        <div class="applications-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Resume</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($applications as $app): ?>
                    <tr>
                        <td>#<?= $app['id'] ?></td>
                        <td><?= date('M d, Y', strtotime($app['application_date'])) ?></td>
                        <td><?= htmlspecialchars($app['name']) ?></td>
                        <td><?= htmlspecialchars($app['email']) ?></td>
                        <td><?= htmlspecialchars($app['phone'] ?: 'N/A') ?></td>
                        <td><?= htmlspecialchars($app['role']) ?></td>
                        <td>
                            <?php if ($app['resume_filename']): ?>
                                <a href="download.php?id=<?= $app['id'] ?>" class="btn-action">
                                    <i class="fas fa-download"></i> Download
                                </a>
                            <?php else: ?>
                                <span style="color: #999;">No file</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <span class="status-badge status-<?= $app['status'] ?>">
                                <?= ucfirst($app['status']) ?>
                            </span>
                        </td>
                        <td>
                            <a href="view.php?id=<?= $app['id'] ?>" class="btn-action">
                                <i class="fas fa-eye"></i> View
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    
                    <?php if (empty($applications)): ?>
                    <tr>
                        <td colspan="9" style="text-align: center; padding: 2rem; color: #999;">
                            No applications found
                        </td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
