<?php
/**
 * Modern Admin Dashboard with Control Panel
 * Susin Group - Complete Admin System
 */

session_start();
require_once '../config/database.php';

// Check authentication
if (!isset($_SESSION['user_id'])) {
    header('Location: ../auth/login.php');
    exit();
}

$pdo = getDBConnection();

// Get current user details
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$currentUser = $stmt->fetch();

if (!$currentUser || $currentUser['status'] !== 'active') {
    session_destroy();
    header('Location: ../auth/login.php');
    exit();
}

// Check if user has admin or hr role
$isAdmin = in_array($currentUser['role'], ['admin', 'hr']);

// Get dashboard statistics
$stats = [];

// Total applications
$stmt = $pdo->query("SELECT COUNT(*) as total FROM applications");
$stats['total_applications'] = $stmt->fetch()['total'];

// Applications by status
$stmt = $pdo->query("SELECT status, COUNT(*) as count FROM applications GROUP BY status");
$statusCounts = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
$stats['new'] = $statusCounts['new'] ?? 0;
$stats['reviewed'] = $statusCounts['reviewed'] ?? 0;
$stats['shortlisted'] = $statusCounts['shortlisted'] ?? 0;
$stats['rejected'] = $statusCounts['rejected'] ?? 0;
$stats['hired'] = $statusCounts['hired'] ?? 0;

// Total users (admin only)
if ($isAdmin) {
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM users WHERE status = 'active'");
    $stats['total_users'] = $stmt->fetch()['total'];
    
    // Recent applications (last 7 days)
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM applications WHERE application_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
    $stats['recent_applications'] = $stmt->fetch()['count'];
}

// Recent applications
$stmt = $pdo->query("SELECT * FROM applications ORDER BY application_date DESC LIMIT 10");
$recentApplications = $stmt->fetchAll();

// Recent login attempts (admin only)
$recentLogins = [];
if ($isAdmin) {
    $stmt = $pdo->query("SELECT * FROM login_attempts ORDER BY attempt_time DESC LIMIT 10");
    $recentLogins = $stmt->fetchAll();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Susin Group</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: #f5f7fa;
            color: #2d3748;
        }
        
        .dashboard-wrapper {
            display: flex;
            min-height: 100vh;
        }
        
        /* Sidebar */
        .sidebar {
            width: 260px;
            background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
            color: white;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        
        .sidebar-header {
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .sidebar-header h2 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .sidebar-header .logo {
            width: 32px;
            height: 32px;
            background: #c41e3a;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .sidebar-nav {
            padding: 1rem 0;
        }
        
        .nav-section {
            margin-bottom: 1.5rem;
        }
        
        .nav-section-title {
            padding: 0.5rem 1.5rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            color: #a0aec0;
            font-weight: 600;
            letter-spacing: 0.05em;
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            color: #e2e8f0;
            text-decoration: none;
            transition: all 0.2s;
            border-left: 3px solid transparent;
        }
        
        .nav-item:hover {
            background: rgba(255,255,255,0.1);
            color: white;
            border-left-color: #c41e3a;
        }
        
        .nav-item.active {
            background: rgba(196,30,58,0.2);
            color: white;
            border-left-color: #c41e3a;
        }
        
        .nav-item i {
            width: 20px;
            margin-right: 0.75rem;
            font-size: 1.1rem;
        }
        
        .user-profile {
            padding: 1.5rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: auto;
        }
        
        .user-profile-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #c41e3a;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.1rem;
        }
        
        .user-details {
            flex: 1;
        }
        
        .user-name {
            font-weight: 600;
            font-size: 0.875rem;
        }
        
        .user-role {
            font-size: 0.75rem;
            color: #a0aec0;
            text-transform: capitalize;
        }
        
        /* Main Content */
        .main-content {
            margin-left: 260px;
            flex: 1;
            padding: 2rem;
            width: calc(100% - 260px);
        }
        
        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .page-title h1 {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1a202c;
        }
        
        .page-subtitle {
            color: #718096;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        .top-actions {
            display: flex;
            gap: 1rem;
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
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(196,30,58,0.3);
        }
        
        .btn-secondary {
            background: white;
            color: #4a5568;
            border: 1px solid #e2e8f0;
        }
        
        .btn-secondary:hover {
            background: #f7fafc;
            border-color: #cbd5e0;
        }
        
        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .stat-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
        }
        
        .stat-title {
            font-size: 0.875rem;
            color: #718096;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }
        
        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
        }
        
        .stat-icon.primary { background: #fee; color: #c41e3a; }
        .stat-icon.success { background: #e6fffa; color: #38a169; }
        .stat-icon.warning { background: #fffaf0; color: #dd6b20; }
        .stat-icon.info { background: #ebf8ff; color: #3182ce; }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 0.25rem;
        }
        
        .stat-change {
            font-size: 0.75rem;
            color: #48bb78;
            font-weight: 600;
        }
        
        .stat-change.negative {
            color: #f56565;
        }
        
        /* Content Cards */
        .content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .card-header {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .card-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: #1a202c;
        }
        
        .card-body {
            padding: 1.5rem;
        }
        
        /* Table */
        .table-wrapper {
            overflow-x: auto;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        thead th {
            background: #f7fafc;
            padding: 0.75rem 1rem;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 700;
            color: #4a5568;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #e2e8f0;
        }
        
        tbody td {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
            font-size: 0.875rem;
        }
        
        tbody tr:hover {
            background: #f7fafc;
        }
        
        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: capitalize;
        }
        
        .status-new { background: #bee3f8; color: #2c5282; }
        .status-reviewed { background: #feebc8; color: #7c2d12; }
        .status-shortlisted { background: #c6f6d5; color: #22543d; }
        .status-rejected { background: #fed7d7; color: #742a2a; }
        .status-hired { background: #e9d8fd; color: #44337a; }
        
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }
            
            .main-content {
                margin-left: 0;
                width: 100%;
            }
            
            .content-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-wrapper">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2>
                    <span class="logo">S</span>
                    Susin Group
                </h2>
            </div>
            
            <nav class="sidebar-nav">
                <div class="nav-section">
                    <div class="nav-section-title">Main</div>
                    <a href="dashboard.php" class="nav-item active">
                        <i class="fas fa-home"></i>
                        Dashboard
                    </a>
                    <a href="applications.php" class="nav-item">
                        <i class="fas fa-file-alt"></i>
                        Applications
                    </a>
                    <a href="documents.php" class="nav-item">
                        <i class="fas fa-folder"></i>
                        Documents
                    </a>
                </div>
                
                <?php if ($isAdmin): ?>
                <div class="nav-section">
                    <div class="nav-section-title">Management</div>
                    <a href="users.php" class="nav-item">
                        <i class="fas fa-users"></i>
                        Users
                    </a>
                    <a href="roles.php" class="nav-item">
                        <i class="fas fa-user-shield"></i>
                        Roles & Permissions
                    </a>
                    <a href="settings.php" class="nav-item">
                        <i class="fas fa-cog"></i>
                        Settings
                    </a>
                </div>
                
                <div class="nav-section">
                    <div class="nav-section-title">Reports</div>
                    <a href="reports.php" class="nav-item">
                        <i class="fas fa-chart-bar"></i>
                        Analytics
                    </a>
                    <a href="logs.php" class="nav-item">
                        <i class="fas fa-clipboard-list"></i>
                        Activity Logs
                    </a>
                </div>
                <?php endif; ?>
            </nav>
            
            <div class="user-profile">
                <div class="user-profile-info">
                    <div class="user-avatar">
                        <?= strtoupper(substr($currentUser['full_name'], 0, 1)) ?>
                    </div>
                    <div class="user-details">
                        <div class="user-name"><?= htmlspecialchars($currentUser['full_name']) ?></div>
                        <div class="user-role"><?= htmlspecialchars($currentUser['role']) ?></div>
                    </div>
                </div>
                <a href="../auth/logout.php" class="btn btn-secondary" style="margin-top: 1rem; width: 100%; justify-content: center;">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </a>
            </div>
        </aside>
        
        <!-- Main Content -->
        <main class="main-content">
            <div class="top-bar">
                <div class="page-title">
                    <h1>Dashboard</h1>
                    <p class="page-subtitle">Welcome back, <?= htmlspecialchars($currentUser['full_name']) ?></p>
                </div>
                <div class="top-actions">
                    <a href="applications.php?new=1" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        New Application
                    </a>
                </div>
            </div>
            
            <!-- Statistics -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">Total Applications</div>
                            <div class="stat-value"><?= $stats['total_applications'] ?></div>
                        </div>
                        <div class="stat-icon primary">
                            <i class="fas fa-file-alt"></i>
                        </div>
                    </div>
                    <?php if ($isAdmin && isset($stats['recent_applications'])): ?>
                    <div class="stat-change">
                        <i class="fas fa-arrow-up"></i> <?= $stats['recent_applications'] ?> this week
                    </div>
                    <?php endif; ?>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">Shortlisted</div>
                            <div class="stat-value"><?= $stats['shortlisted'] ?></div>
                        </div>
                        <div class="stat-icon success">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">Under Review</div>
                            <div class="stat-value"><?= $stats['reviewed'] ?></div>
                        </div>
                        <div class="stat-icon warning">
                            <i class="fas fa-clock"></i>
                        </div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-header">
                        <div>
                            <div class="stat-title">New Today</div>
                            <div class="stat-value"><?= $stats['new'] ?></div>
                        </div>
                        <div class="stat-icon info">
                            <i class="fas fa-inbox"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Content Grid -->
            <div class="content-grid">
                <!-- Recent Applications -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Recent Applications</h3>
                        <a href="applications.php" class="btn btn-secondary">View All</a>
                    </div>
                    <div class="card-body" style="padding: 0;">
                        <div class="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Applicant</th>
                                        <th>Position</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach (array_slice($recentApplications, 0, 5) as $app): ?>
                                    <tr>
                                        <td>
                                            <strong><?= htmlspecialchars($app['name']) ?></strong><br>
                                            <small style="color: #718096;"><?= htmlspecialchars($app['email']) ?></small>
                                        </td>
                                        <td><?= htmlspecialchars($app['role']) ?></td>
                                        <td><?= date('M d, Y', strtotime($app['application_date'])) ?></td>
                                        <td>
                                            <span class="status-badge status-<?= $app['status'] ?>">
                                                <?= ucfirst($app['status']) ?>
                                            </span>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Stats -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Application Status</h3>
                    </div>
                    <div class="card-body">
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-size: 0.875rem; color: #4a5568;">New</span>
                                    <span style="font-weight: 700; color: #1a202c;"><?= $stats['new'] ?></span>
                                </div>
                                <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; background: #3182ce; width: <?= $stats['total_applications'] > 0 ? ($stats['new'] / $stats['total_applications'] * 100) : 0 ?>%;"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-size: 0.875rem; color: #4a5568;">Reviewed</span>
                                    <span style="font-weight: 700; color: #1a202c;"><?= $stats['reviewed'] ?></span>
                                </div>
                                <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; background: #dd6b20; width: <?= $stats['total_applications'] > 0 ? ($stats['reviewed'] / $stats['total_applications'] * 100) : 0 ?>%;"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-size: 0.875rem; color: #4a5568;">Shortlisted</span>
                                    <span style="font-weight: 700; color: #1a202c;"><?= $stats['shortlisted'] ?></span>
                                </div>
                                <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; background: #38a169; width: <?= $stats['total_applications'] > 0 ? ($stats['shortlisted'] / $stats['total_applications'] * 100) : 0 ?>%;"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-size: 0.875rem; color: #4a5568;">Hired</span>
                                    <span style="font-weight: 700; color: #1a202c;"><?= $stats['hired'] ?></span>
                                </div>
                                <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                                    <div style="height: 100%; background: #805ad5; width: <?= $stats['total_applications'] > 0 ? ($stats['hired'] / $stats['total_applications'] * 100) : 0 ?>%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</body>
</html>
