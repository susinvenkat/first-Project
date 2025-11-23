-- Susin Group Authentication Database Schema
-- User Management and Login System
-- Run this SQL script to create authentication tables

USE susin_careers;

-- Users table
CREATE TABLE IF NOT EXISTS users (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Login attempts tracking
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    success TINYINT(1) DEFAULT 0,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_time (attempt_time),
    INDEX idx_ip (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User sessions (optional - for advanced session management)
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session (session_id),
    INDEX idx_user (user_id),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    used TINYINT(1) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user
-- Default credentials: admin / Admin@123
-- IMPORTANT: Change this password immediately in production!
INSERT INTO users (username, password, email, full_name, role, status, created_at) 
VALUES (
    'admin', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Password: Admin@123
    'admin@susin.in', 
    'System Administrator', 
    'admin', 
    'active', 
    NOW()
) ON DUPLICATE KEY UPDATE username=username;

-- Insert sample HR user
-- Default credentials: hr_user / HR@123456
INSERT INTO users (username, password, email, full_name, role, department, status, created_at) 
VALUES (
    'hr_user', 
    '$2y$10$FvX.6tQ3K7XdVxPj9rW9eeQrF0p4EtYGGvPWzXLPqR3H9fKPj2piq', -- Password: HR@123456
    'hr@susin.in', 
    'HR Manager', 
    'hr',
    'Human Resources',
    'active', 
    NOW()
) ON DUPLICATE KEY UPDATE username=username;

-- Sample employee
-- Default credentials: employee1 / Employee@123
INSERT INTO users (username, password, email, full_name, role, department, employee_id, status, created_at) 
VALUES (
    'employee1', 
    '$2y$10$YKx.HqPxZX0p/kHX5x9jKOqz5V6YxZH.F4YXqx.HqPxZX0p/kHX5x', -- Password: Employee@123
    'employee@susin.in', 
    'John Doe', 
    'employee',
    'Operations',
    'EMP001',
    'active', 
    NOW()
) ON DUPLICATE KEY UPDATE username=username;
