/**
 * Login System JavaScript
 * Susin Group - Employee Authentication
 */

(function() {
    'use strict';

    // DOM Elements
    const loginToggle = document.getElementById('loginToggle');
    const loginModal = document.getElementById('loginModal');
    const loginClose = document.getElementById('loginClose');
    const loginBackdrop = loginModal?.querySelector('.login-backdrop');
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const loginAlert = document.getElementById('loginAlert');
    const togglePassword = document.getElementById('togglePassword');
    const loginPassword = document.getElementById('loginPassword');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    // Check if user is already logged in
    checkLoginStatus();

    // Event Listeners
    if (loginToggle) {
        loginToggle.addEventListener('click', openLoginModal);
    }

    if (loginClose) {
        loginClose.addEventListener('click', closeLoginModal);
    }

    if (loginBackdrop) {
        loginBackdrop.addEventListener('click', closeLoginModal);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (togglePassword) {
        togglePassword.addEventListener('click', togglePasswordVisibility);
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !loginModal.hidden) {
            closeLoginModal();
        }
    });

    /**
     * Open login modal
     */
    function openLoginModal(e) {
        if (e) e.preventDefault();
        
        loginModal.hidden = false;
        loginModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        setTimeout(() => {
            document.getElementById('loginUsername')?.focus();
        }, 100);
    }

    /**
     * Close login modal
     */
    function closeLoginModal() {
        loginModal.hidden = true;
        loginModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Clear form
        if (loginForm) {
            loginForm.reset();
        }
        hideAlert();
    }

    /**
     * Handle login form submission
     */
    async function handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const remember = document.getElementById('rememberMe').checked;

        // Validate inputs
        if (!username || !password) {
            showAlert('Please enter both username and password', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);
        hideAlert();

        try {
            const response = await fetch('/backend/auth/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    remember: remember
                })
            });

            const data = await response.json();

            if (data.success) {
                showAlert('Login successful! Redirecting...', 'success');
                
                // Store user info if remember me is checked
                if (remember) {
                    localStorage.setItem('susin_username', username);
                } else {
                    localStorage.removeItem('susin_username');
                }

                // Update UI to show logged in state
                updateLoginUI(data.user);

                // Redirect after short delay
                setTimeout(() => {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        closeLoginModal();
                        showSuccessNotification('Welcome back, ' + data.user.full_name);
                    }
                }, 1500);

            } else {
                showAlert(data.message || 'Login failed. Please try again.', 'error');
                setLoadingState(false);
            }

        } catch (error) {
            console.error('Login error:', error);
            showAlert('Connection error. Please check your internet connection.', 'error');
            setLoadingState(false);
        }
    }

    /**
     * Toggle password visibility
     */
    function togglePasswordVisibility() {
        const type = loginPassword.type === 'password' ? 'text' : 'password';
        loginPassword.type = type;
        
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }

    /**
     * Handle forgot password
     */
    function handleForgotPassword(e) {
        e.preventDefault();
        
        showAlert('Please contact IT Support at it@susin.in for password reset.', 'info');
        
        // Could implement email-based password reset here
        // For now, just show contact information
    }

    /**
     * Check if user is already logged in
     */
    async function checkLoginStatus() {
        try {
            const response = await fetch('/backend/auth/check_session.php');
            const data = await response.json();

            if (data.logged_in) {
                updateLoginUI(data.user);
            } else {
                // Pre-fill username if remembered
                const rememberedUsername = localStorage.getItem('susin_username');
                if (rememberedUsername) {
                    const usernameInput = document.getElementById('loginUsername');
                    if (usernameInput) {
                        usernameInput.value = rememberedUsername;
                        document.getElementById('rememberMe').checked = true;
                    }
                }
            }
        } catch (error) {
            console.error('Session check error:', error);
        }
    }

    /**
     * Update UI to show logged in state
     */
    function updateLoginUI(user) {
        if (!loginToggle) return;

        // Change login button to show user name and logout option
        loginToggle.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span class="btn-text">${user.full_name || user.username}</span>
        `;
        
        // Add logout functionality
        loginToggle.removeEventListener('click', openLoginModal);
        loginToggle.addEventListener('click', showUserMenu);
    }

    /**
     * Show user menu (profile, dashboard, logout)
     */
    function showUserMenu(e) {
        e.preventDefault();
        
        // Create dropdown menu
        const existingMenu = document.getElementById('userDropdownMenu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.id = 'userDropdownMenu';
        menu.className = 'user-dropdown-menu';
        menu.innerHTML = `
            <a href="/backend/dashboard/index.php" class="menu-item">
                <i class="fas fa-tachometer-alt"></i> Dashboard
            </a>
            <a href="/backend/dashboard/profile.php" class="menu-item">
                <i class="fas fa-user-cog"></i> Profile
            </a>
            <a href="#" id="logoutLink" class="menu-item">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        `;

        // Position menu below button
        const rect = loginToggle.getBoundingClientRect();
        menu.style.position = 'absolute';
        menu.style.top = (rect.bottom + 5) + 'px';
        menu.style.right = '20px';

        document.body.appendChild(menu);

        // Add logout handler
        document.getElementById('logoutLink').addEventListener('click', handleLogout);

        // Close menu on outside click
        setTimeout(() => {
            document.addEventListener('click', closeUserMenu);
        }, 0);
    }

    /**
     * Close user menu
     */
    function closeUserMenu(e) {
        const menu = document.getElementById('userDropdownMenu');
        if (menu && !menu.contains(e.target) && e.target !== loginToggle) {
            menu.remove();
            document.removeEventListener('click', closeUserMenu);
        }
    }

    /**
     * Handle logout
     */
    async function handleLogout(e) {
        e.preventDefault();

        try {
            const response = await fetch('/backend/auth/logout.php');
            const data = await response.json();

            if (data.success) {
                // Reset UI
                loginToggle.innerHTML = `
                    <i class="fas fa-user"></i>
                    <span class="btn-text">Login</span>
                `;
                
                loginToggle.removeEventListener('click', showUserMenu);
                loginToggle.addEventListener('click', openLoginModal);

                // Remove user menu
                const menu = document.getElementById('userDropdownMenu');
                if (menu) menu.remove();

                showSuccessNotification('Logged out successfully');
                
                // Redirect to home if on protected page
                if (window.location.pathname.includes('/backend/')) {
                    window.location.href = '/index.html';
                }
            }
        } catch (error) {
            console.error('Logout error:', error);
            showAlert('Logout failed. Please try again.', 'error');
        }
    }

    /**
     * Show alert message in modal
     */
    function showAlert(message, type = 'info') {
        if (!loginAlert) return;

        loginAlert.className = `alert alert-${type}`;
        loginAlert.innerHTML = `
            <i class="fas fa-${getAlertIcon(type)}"></i>
            <span>${message}</span>
        `;
        loginAlert.style.display = 'block';
    }

    /**
     * Hide alert message
     */
    function hideAlert() {
        if (loginAlert) {
            loginAlert.style.display = 'none';
        }
    }

    /**
     * Get alert icon based on type
     */
    function getAlertIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    /**
     * Set loading state
     */
    function setLoadingState(loading) {
        if (!loginButton) return;

        if (loading) {
            loginButton.disabled = true;
            loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        } else {
            loginButton.disabled = false;
            loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
        }
    }

    /**
     * Show success notification (toast)
     */
    function showSuccessNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

})();
