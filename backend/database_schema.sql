-- Susin Group Career Applications Database Schema
-- Run this SQL script to create the database and tables

CREATE DATABASE IF NOT EXISTS susin_careers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE susin_careers;

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(255) NOT NULL,
    resume_filename VARCHAR(255),
    resume_path VARCHAR(500),
    message TEXT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'reviewed', 'shortlisted', 'rejected', 'hired') DEFAULT 'new',
    notes TEXT,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_date (application_date),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity log table
CREATE TABLE IF NOT EXISTS activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT,
    action VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application (application_id),
    INDEX idx_date (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data (optional)
-- INSERT INTO applications (name, email, phone, role, message, status) VALUES
-- ('John Doe', 'john@example.com', '+91 98765 43210', 'Application Engineer', 'I am interested in this position.', 'new'),
-- ('Jane Smith', 'jane@example.com', '+91 98765 43211', 'Quality Inspector', 'Looking forward to joining your team.', 'reviewed');
