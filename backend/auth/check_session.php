<?php
/**
 * Session Checker
 * Susin Group - Check if user is logged in
 */

session_start();
header('Content-Type: application/json');

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    echo json_encode([
        'logged_in' => true,
        'user' => [
            'username' => $_SESSION['username'] ?? '',
            'email' => $_SESSION['email'] ?? '',
            'full_name' => $_SESSION['full_name'] ?? '',
            'role' => $_SESSION['role'] ?? 'employee'
        ]
    ]);
} else {
    echo json_encode([
        'logged_in' => false
    ]);
}
?>
