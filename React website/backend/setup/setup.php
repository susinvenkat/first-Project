<?php
/**
 * Database Initialization Script
 * Run this file once to set up all database tables and default users
 */

require_once 'config/database.php';

echo "<!DOCTYPE html>";
echo "<html><head><title>Database Setup - Susin Group</title>";
echo "<style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #c41e3a; }
    .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 10px 0; }
    .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin: 10px 0; }
    .info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 8px; margin: 10px 0; }
    pre { background: #f8f9fa; padding: 15px; border-radius: 8px; overflow-x: auto; }
    .btn { display: inline-block; padding: 10px 20px; background: #c41e3a; color: #fff; text-decoration: none; border-radius: 8px; margin: 10px 5px; }
</style></head><body>";

echo "<h1>Susin Group - Database Setup</h1>";

try {
    $pdo = getDBConnection();
    echo "<div class='success'>✓ Database connection successful!</div>";
    
    // Initialize tables
    echo "<h2>Creating Database Tables...</h2>";
    initializeDatabase();
    echo "<div class='success'>✓ All tables created successfully!</div>";
    
    // Insert default admin user
    echo "<h2>Creating Default Users...</h2>";
    
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = 'admin'");
    $stmt->execute();
    
    if (!$stmt->fetch()) {
        $stmt = $pdo->prepare("
            INSERT INTO users (username, password, email, full_name, role, status, created_at) 
            VALUES (?, ?, ?, ?, ?, 'active', NOW())
        ");
        
        $adminPassword = password_hash('Admin@123', PASSWORD_BCRYPT);
        $stmt->execute(['admin', $adminPassword, 'admin@susin.in', 'System Administrator', 'admin']);
        echo "<div class='success'>✓ Admin user created</div>";
    } else {
        echo "<div class='info'>ℹ Admin user already exists</div>";
    }
    
    // Insert HR user
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = 'hr_user'");
    $stmt->execute();
    
    if (!$stmt->fetch()) {
        $stmt = $pdo->prepare("
            INSERT INTO users (username, password, email, full_name, role, department, status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, 'active', NOW())
        ");
        
        $hrPassword = password_hash('HR@123456', PASSWORD_BCRYPT);
        $stmt->execute(['hr_user', $hrPassword, 'hr@susin.in', 'HR Manager', 'hr', 'Human Resources']);
        echo "<div class='success'>✓ HR user created</div>";
    } else {
        echo "<div class='info'>ℹ HR user already exists</div>";
    }
    
    // Insert sample employee
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = 'employee1'");
    $stmt->execute();
    
    if (!$stmt->fetch()) {
        $stmt = $pdo->prepare("
            INSERT INTO users (username, password, email, full_name, role, department, employee_id, status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'active', NOW())
        ");
        
        $empPassword = password_hash('Employee@123', PASSWORD_BCRYPT);
        $stmt->execute(['employee1', $empPassword, 'employee@susin.in', 'John Doe', 'employee', 'Operations', 'EMP001']);
        echo "<div class='success'>✓ Sample employee created</div>";
    } else {
        echo "<div class='info'>ℹ Sample employee already exists</div>";
    }
    
    echo "<h2>Setup Complete!</h2>";
    echo "<div class='success'>";
    echo "<h3>Default Login Credentials:</h3>";
    echo "<pre>";
    echo "Administrator:\n";
    echo "  Username: admin\n";
    echo "  Password: Admin@123\n\n";
    echo "HR Manager:\n";
    echo "  Username: hr_user\n";
    echo "  Password: HR@123456\n\n";
    echo "Sample Employee:\n";
    echo "  Username: employee1\n";
    echo "  Password: Employee@123\n";
    echo "</pre>";
    echo "<p><strong>⚠️ IMPORTANT:</strong> Change these default passwords immediately in production!</p>";
    echo "</div>";
    
    echo "<div class='info'>";
    echo "<h3>Next Steps:</h3>";
    echo "<ul>";
    echo "<li>Go to the <a href='/index.html'>home page</a> and click the Login button</li>";
    echo "<li>Login with one of the credentials above</li>";
    echo "<li>Change your password after first login</li>";
    echo "<li>Delete or secure this setup file (setup.php)</li>";
    echo "</ul>";
    echo "</div>";
    
    echo "<a href='/index.html' class='btn'>Go to Home Page</a>";
    echo "<a href='/backend/admin/index.php' class='btn'>Admin Panel</a>";
    
} catch (Exception $e) {
    echo "<div class='error'>";
    echo "<h3>Setup Error:</h3>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<h4>Troubleshooting:</h4>";
    echo "<ul>";
    echo "<li>Make sure MySQL is running</li>";
    echo "<li>Check database credentials in <code>backend/config/database.php</code></li>";
    echo "<li>Verify the database 'susin_careers' exists</li>";
    echo "<li>Check PHP error logs for more details</li>";
    echo "</ul>";
    echo "</div>";
}

echo "</body></html>";
?>
