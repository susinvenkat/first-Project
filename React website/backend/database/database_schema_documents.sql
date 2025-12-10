-- Susin Group Document Management & Resume Storage Database Schema
-- Enhanced version with comprehensive document tracking
-- Run this SQL script to create the database and tables

CREATE DATABASE IF NOT EXISTS susin_careers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE susin_careers;

-- Applications table (Enhanced)
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_number VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    position VARCHAR(255) NOT NULL,
    department ENUM('Engineering', 'Sales', 'QC', 'Admin', 'Purchase', 'Production', 'HR', 'Other') DEFAULT 'Other',
    experience_years DECIMAL(4,1),
    current_location VARCHAR(255),
    preferred_location VARCHAR(255),
    expected_salary VARCHAR(100),
    notice_period VARCHAR(100),
    linkedin_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    message TEXT,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'under_review', 'shortlisted', 'interview_scheduled', 'interviewed', 'offer_sent', 'accepted', 'rejected', 'withdrawn') DEFAULT 'new',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    rating INT CHECK(rating >= 1 AND rating <= 5),
    notes TEXT,
    interviewed_by VARCHAR(255),
    interview_date DATETIME,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    referral_source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_date (application_date),
    INDEX idx_position (position),
    INDEX idx_department (department),
    INDEX idx_app_number (application_number),
    INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Documents table (For resumes, cover letters, certificates, etc.)
CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    document_type ENUM('resume', 'cover_letter', 'certificate', 'portfolio', 'id_proof', 'experience_letter', 'education_certificate', 'other') NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    stored_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL COMMENT 'Size in bytes',
    file_extension VARCHAR(10) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_hash VARCHAR(64) COMMENT 'SHA256 hash for duplicate detection',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_notes TEXT,
    download_count INT DEFAULT 0,
    last_downloaded_at TIMESTAMP NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application (application_id),
    INDEX idx_document_type (document_type),
    INDEX idx_uploaded_at (uploaded_at),
    INDEX idx_file_hash (file_hash),
    INDEX idx_is_deleted (is_deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity log table (Enhanced)
CREATE TABLE IF NOT EXISTS activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT,
    document_id INT NULL,
    action_type ENUM('application_created', 'status_changed', 'document_uploaded', 'document_downloaded', 'document_deleted', 'notes_added', 'interview_scheduled', 'email_sent', 'other') NOT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    old_value TEXT,
    new_value TEXT,
    performed_by VARCHAR(255),
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE SET NULL,
    INDEX idx_application (application_id),
    INDEX idx_document (document_id),
    INDEX idx_action_type (action_type),
    INDEX idx_date (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Email notifications log
CREATE TABLE IF NOT EXISTS email_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT,
    recipient_email VARCHAR(255) NOT NULL,
    email_type ENUM('application_received', 'status_update', 'interview_invitation', 'offer_letter', 'rejection', 'other') NOT NULL,
    subject VARCHAR(500),
    body TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
    error_message TEXT,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    INDEX idx_application (application_id),
    INDEX idx_recipient (recipient_email),
    INDEX idx_sent_at (sent_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- File storage statistics
CREATE TABLE IF NOT EXISTS storage_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_date DATE NOT NULL UNIQUE,
    total_files INT DEFAULT 0,
    total_size_bytes BIGINT DEFAULT 0,
    resumes_count INT DEFAULT 0,
    certificates_count INT DEFAULT 0,
    other_docs_count INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_stat_date (stat_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create trigger to generate application number
DELIMITER //
CREATE TRIGGER before_application_insert 
BEFORE INSERT ON applications
FOR EACH ROW
BEGIN
    IF NEW.application_number IS NULL OR NEW.application_number = '' THEN
        SET NEW.application_number = CONCAT('APP-', YEAR(NOW()), LPAD(MONTH(NOW()), 2, '0'), '-', LPAD((SELECT COALESCE(MAX(id), 0) + 1 FROM applications), 5, '0'));
    END IF;
END//
DELIMITER ;

-- Create trigger to log application creation
DELIMITER //
CREATE TRIGGER after_application_insert
AFTER INSERT ON applications
FOR EACH ROW
BEGIN
    INSERT INTO activity_log (application_id, action_type, action, description, performed_by)
    VALUES (NEW.id, 'application_created', 'Application Created', CONCAT('New application submitted for position: ', NEW.position), NEW.email);
END//
DELIMITER ;

-- Create trigger to log status changes
DELIMITER //
CREATE TRIGGER after_application_status_update
AFTER UPDATE ON applications
FOR EACH ROW
BEGIN
    IF NEW.status != OLD.status THEN
        INSERT INTO activity_log (application_id, action_type, action, description, old_value, new_value)
        VALUES (NEW.id, 'status_changed', 'Status Changed', CONCAT('Status updated from ', OLD.status, ' to ', NEW.status), OLD.status, NEW.status);
    END IF;
END//
DELIMITER ;

-- Create trigger to update storage stats when document is uploaded
DELIMITER //
CREATE TRIGGER after_document_insert
AFTER INSERT ON documents
FOR EACH ROW
BEGIN
    INSERT INTO storage_stats (stat_date, total_files, total_size_bytes, 
        resumes_count, certificates_count, other_docs_count)
    VALUES (CURDATE(), 1, NEW.file_size,
        IF(NEW.document_type = 'resume', 1, 0),
        IF(NEW.document_type IN ('certificate', 'education_certificate', 'experience_letter'), 1, 0),
        IF(NEW.document_type NOT IN ('resume', 'certificate', 'education_certificate', 'experience_letter'), 1, 0))
    ON DUPLICATE KEY UPDATE
        total_files = total_files + 1,
        total_size_bytes = total_size_bytes + NEW.file_size,
        resumes_count = resumes_count + IF(NEW.document_type = 'resume', 1, 0),
        certificates_count = certificates_count + IF(NEW.document_type IN ('certificate', 'education_certificate', 'experience_letter'), 1, 0),
        other_docs_count = other_docs_count + IF(NEW.document_type NOT IN ('resume', 'certificate', 'education_certificate', 'experience_letter'), 1, 0);
    
    INSERT INTO activity_log (application_id, document_id, action_type, action, description)
    VALUES (NEW.application_id, NEW.id, 'document_uploaded', 'Document Uploaded', CONCAT('Document uploaded: ', NEW.document_type, ' - ', NEW.original_filename));
END//
DELIMITER ;

-- Create views for easy querying
CREATE OR REPLACE VIEW applications_summary AS
SELECT 
    a.id,
    a.application_number,
    a.name,
    a.email,
    a.phone,
    a.position,
    a.department,
    a.status,
    a.priority,
    a.rating,
    a.application_date,
    COUNT(d.id) as document_count,
    SUM(CASE WHEN d.document_type = 'resume' THEN 1 ELSE 0 END) as resume_count,
    GROUP_CONCAT(DISTINCT d.document_type SEPARATOR ', ') as document_types
FROM applications a
LEFT JOIN documents d ON a.id = d.application_id AND d.is_deleted = FALSE
GROUP BY a.id;

CREATE OR REPLACE VIEW recent_applications AS
SELECT 
    a.*,
    COUNT(d.id) as total_documents
FROM applications a
LEFT JOIN documents d ON a.id = d.application_id AND d.is_deleted = FALSE
WHERE a.application_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY a.id
ORDER BY a.application_date DESC;

CREATE OR REPLACE VIEW storage_overview AS
SELECT 
    COUNT(*) as total_documents,
    SUM(file_size) as total_size_bytes,
    ROUND(SUM(file_size) / 1024 / 1024, 2) as total_size_mb,
    AVG(file_size) as avg_file_size,
    MIN(uploaded_at) as first_upload,
    MAX(uploaded_at) as last_upload,
    SUM(download_count) as total_downloads
FROM documents
WHERE is_deleted = FALSE;

-- Sample indexes for performance
CREATE INDEX idx_app_status_date ON applications(status, application_date);
CREATE INDEX idx_doc_app_type ON documents(application_id, document_type, is_deleted);

-- Grant permissions (adjust username/password as needed)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON susin_careers.* TO 'susin_user'@'localhost' IDENTIFIED BY 'your_secure_password';
-- FLUSH PRIVILEGES;
