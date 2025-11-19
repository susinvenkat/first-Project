// Enhanced Menu Functionality and Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize header functionality first
    initializeHeaderFunctionality();
    
    // Initialize enhanced menu features
    initializeMenuFeatures();
    
    // Lazy loading for images with Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    // Observe all lazy images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });

    // Animate on scroll optimization
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    // Observe animation elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Smooth scroll for anchor links
    initializeSmoothScroll();
    
    // Initialize header search functionality
    initializeHeaderSearch();
    
    // Initialize modern header dropdowns
    initializeModernHeaderDropdowns();
});

// Modern Header Mega Dropdown Functionality with SEO Enhancements
function initializeModernHeaderDropdowns() {
    const navItems = document.querySelectorAll('.nav-item.has-dropdown');
    
    if (navItems.length === 0) return;
    
    // Preload dropdown links for better SEO crawlability
    const preloadDropdownLinks = () => {
        navItems.forEach(item => {
            const links = item.querySelectorAll('.mega-dropdown a');
            links.forEach(link => {
                link.setAttribute('data-preloaded', 'true');
            });
        });
    };
    setTimeout(preloadDropdownLinks, 1000);
    
    navItems.forEach(item => {
        const trigger = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.mega-dropdown');
        
        if (!trigger || !dropdown) return;
        
        let hoverTimeout;
        let isHovering = false;
        
        // Enhanced desktop hover behavior with optimized timing
        item.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            isHovering = true;
            
            // Faster hover activation for better UX (150ms -> 80ms)
            hoverTimeout = setTimeout(() => {
                if (isHovering) {
                    item.classList.add('active');
                    trigger.setAttribute('aria-expanded', 'true');
                    dropdown.setAttribute('aria-hidden', 'false');
                    
                    // Add descriptive title for SEO
                    const dropdownTitle = trigger.querySelector('span')?.textContent;
                    if (dropdownTitle) {
                        dropdown.setAttribute('aria-label', `${dropdownTitle} menu options`);
                    }
                    
                    // Enhance links for SEO visibility
                    const links = dropdown.querySelectorAll('a');
                    links.forEach(link => {
                        link.setAttribute('tabindex', '0');
                    });
                }
            }, 80);
        });
        
        item.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            isHovering = false;
            
            // Slightly delayed close for better navigation (200ms -> 250ms)
            hoverTimeout = setTimeout(() => {
                item.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                dropdown.setAttribute('aria-hidden', 'true');
                
                // Reset tabindex when closed
                const links = dropdown.querySelectorAll('a');
                links.forEach(link => {
                    link.setAttribute('tabindex', '-1');
                });
            }, 250);
        });
        
        // Touch/click behavior for tablets
        trigger.addEventListener('click', (e) => {
            const isActive = item.classList.contains('active');
            const primaryNav = document.getElementById('primaryNav');
            
            // On mobile, prevent default and toggle
            if (primaryNav && primaryNav.classList.contains('mobile-active')) {
                return; // Mobile click handled by other function
            }
            
            // On tablet/small desktop
            if (window.innerWidth <= 1024 && !isActive) {
                e.preventDefault();
                
                // Close other dropdowns
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Keyboard navigation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                item.classList.toggle('active');
                trigger.setAttribute('aria-expanded', !isActive);
                
                if (!isActive) {
                    const firstLink = dropdown.querySelector('a');
                    if (firstLink) setTimeout(() => firstLink.focus(), 100);
                }
            } else if (e.key === 'Escape') {
                item.classList.remove('active');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item.has-dropdown')) {
            navItems.forEach(item => {
                item.classList.remove('active');
                const trigger = item.querySelector('.nav-link');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// Header Search Functionality
function initializeHeaderSearch() {
    const headerSearchBtn = document.getElementById('headerSearchBtn');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const primaryNav = document.getElementById('primaryNav');
    
    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', () => {
            showSearchModal();
        });
    }
    
    // Enhanced Mobile menu toggle for modern header
    if (mobileMenuToggle && primaryNav) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = primaryNav.classList.toggle('mobile-active');
            mobileMenuToggle.classList.toggle('active', isActive);
            mobileMenuToggle.setAttribute('aria-expanded', isActive);
            
            // Prevent body scroll when menu is open with smooth transition
            if (isActive) {
                document.body.style.overflow = 'hidden';
                // Add backdrop
                const backdrop = document.createElement('div');
                backdrop.className = 'mobile-menu-backdrop';
                backdrop.style.cssText = `
                    position: fixed;
                    top: 115px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 9998;
                    animation: fadeIn 0.3s ease;
                `;
                document.body.appendChild(backdrop);
                
                // Close on backdrop click
                backdrop.addEventListener('click', () => {
                    closeMobileMenu();
                });
            } else {
                closeMobileMenu();
            }
        });
        
        // Function to close mobile menu
        function closeMobileMenu() {
            primaryNav.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            // Remove backdrop
            const backdrop = document.querySelector('.mobile-menu-backdrop');
            if (backdrop) {
                backdrop.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => backdrop.remove(), 300);
            }
            
            // Close all open dropdowns
            primaryNav.querySelectorAll('.nav-item.mobile-open').forEach(item => {
                item.classList.remove('mobile-open');
            });
        }
        
        // Enhanced dropdown clicks in mobile view
        primaryNav.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (primaryNav.classList.contains('mobile-active')) {
                    e.preventDefault();
                    const parentItem = link.closest('.nav-item');
                    const isOpen = parentItem.classList.contains('mobile-open');
                    
                    // Close other dropdowns with animation
                    primaryNav.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
                        if (item !== parentItem && item.classList.contains('mobile-open')) {
                            item.classList.remove('mobile-open');
                        }
                    });
                    
                    // Toggle current dropdown
                    parentItem.classList.toggle('mobile-open');
                    
                    // Smooth scroll to show dropdown if opened
                    if (!isOpen) {
                        setTimeout(() => {
                            const dropdown = parentItem.querySelector('.mega-dropdown');
                            if (dropdown) {
                                dropdown.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                        }, 100);
                    }
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (primaryNav && !primaryNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                if (primaryNav.classList.contains('mobile-active')) {
                    closeMobileMenu();
                }
            }
        });
        
        // Close mobile menu on submenu link click
        if (primaryNav) {
            primaryNav.querySelectorAll('.mega-dropdown a').forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
        }
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && primaryNav.classList.contains('mobile-active')) {
                    closeMobileMenu();
                }
            }, 250);
        });
        
        // Keyboard navigation for mobile menu
        if (primaryNav.classList.contains('mobile-active')) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeMobileMenu();
                }
            });
        }
    }
}

// Add CSS animation for backdrop
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Smooth Scroll for Anchor Links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize Header Functionality
function initializeHeaderFunctionality() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Calculate and set header height dynamically
    function updateHeaderHeight() {
        const headerHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
    
    // Initial height calculation
    updateHeaderHeight();
    
    // Update on resize
    window.addEventListener('resize', debounce(updateHeaderHeight, 150));
    
    // Sticky header with compact mode on scroll
    let lastScroll = 0;
    let ticking = false;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add compact mode after scrolling 80px
        if (currentScroll > 80) {
            navbar.classList.add('header-compact');
        } else {
            navbar.classList.remove('header-compact');
        }
        
        // Update header height after compact mode change
        requestAnimationFrame(updateHeaderHeight);
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = true;
            });
        }
    }, { passive: true });
    
    // Keyboard navigation for header
    initializeKeyboardNavigation();
    
    // Close dropdowns on escape key globally
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown.hover').forEach(dropdown => {
                dropdown.classList.remove('hover');
                const trigger = dropdown.querySelector('a');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
}

// Keyboard Navigation for Accessibility
function initializeKeyboardNavigation() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!trigger || !menu) return;
        
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('hover');
                
                if (dropdown.classList.contains('hover')) {
                    const firstLink = menu.querySelector('a');
                    if (firstLink) firstLink.focus();
                }
            } else if (e.key === 'Escape') {
                dropdown.classList.remove('hover');
                trigger.focus();
            }
        });
        
        // Close on focus out
        menu.addEventListener('focusout', (e) => {
            if (!dropdown.contains(e.relatedTarget)) {
                dropdown.classList.remove('hover');
            }
        });
    });
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced Menu Features Function
function initializeMenuFeatures() {
    // Enhanced Search Functionality
    initializeSearch();
    
    // Enhanced Dropdown Menus
    initializeDropdowns();
    
    // Active Menu State Management
    initializeActiveStates();
    
    // Enhanced Mobile Navigation
    initializeMobileNav();
    
    // Notification System
    initializeNotifications();
    
    // Language Selector
    initializeLanguageSelector();
}

// Enhanced Search with Live Suggestions
function initializeSearch() {
    const searchBtn = document.getElementById('openSearchTop');
    const chatBtn = document.getElementById('chatToggleTop');
    const loginBtn = document.getElementById('employeeLoginBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            showSearchModal();
        });
    }
    
    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            showChatWidget();
        });
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showLoginModal();
        });
    }
}

// Enhanced Dropdown Menu Interactions
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!trigger || !menu) return;
        
        // Add hover delay for better UX
        let hoverTimeout;
        let closeTimeout;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            clearTimeout(closeTimeout);
            
            hoverTimeout = setTimeout(() => {
                dropdown.classList.add('hover');
                trigger.setAttribute('aria-expanded', 'true');
                menu.setAttribute('aria-hidden', 'false');
            }, 100);
        });
        
        dropdown.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            closeTimeout = setTimeout(() => {
                dropdown.classList.remove('hover');
                trigger.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
            }, 200);
        });
        
        // Click handler for touch devices
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                const isOpen = dropdown.classList.contains('hover');
                
                // Close all other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('hover');
                    }
                });
                
                if (!isOpen) {
                    e.preventDefault();
                    dropdown.classList.add('hover');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            }
        });
        
        // Enhanced keyboard navigation
        trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('hover');
                const isExpanded = dropdown.classList.contains('hover');
                trigger.setAttribute('aria-expanded', isExpanded);
                menu.setAttribute('aria-hidden', !isExpanded);
                
                if (isExpanded) {
                    const firstLink = menu.querySelector('a');
                    if (firstLink) {
                        setTimeout(() => firstLink.focus(), 100);
                    }
                }
            } else if (e.key === 'Escape') {
                dropdown.classList.remove('hover');
                trigger.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
                trigger.focus();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!dropdown.classList.contains('hover')) {
                    dropdown.classList.add('hover');
                    trigger.setAttribute('aria-expanded', 'true');
                }
                const firstLink = menu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });
        
        // Navigate within menu
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextLink = menuLinks[index + 1];
                    if (nextLink) nextLink.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (index === 0) {
                        trigger.focus();
                    } else {
                        menuLinks[index - 1].focus();
                    }
                } else if (e.key === 'Escape') {
                    dropdown.classList.remove('hover');
                    trigger.setAttribute('aria-expanded', 'false');
                    menu.setAttribute('aria-hidden', 'true');
                    trigger.focus();
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('hover');
                const trigger = dropdown.querySelector('a');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.setAttribute('aria-hidden', 'true');
                }
            });
        }
    });
}

// Active Menu State Management
function initializeActiveStates() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Enhanced Mobile Navigation
function initializeMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
            
            // Enhanced body scroll prevention
            if (isActive) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });
        
        // Mobile submenu toggle functionality
        const dropdownToggles = navMenu.querySelectorAll('.dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                // Only prevent default and toggle on mobile when menu is active
                if (navMenu.classList.contains('active')) {
                    e.preventDefault();
                    const parentDropdown = toggle.parentElement;
                    const dropdownMenu = parentDropdown.querySelector('.dropdown-menu');
                    
                    if (dropdownMenu) {
                        // Close other open dropdowns
                        navMenu.querySelectorAll('.dropdown').forEach(item => {
                            if (item !== parentDropdown) {
                                item.classList.remove('mobile-open');
                            }
                        });
                        
                        // Toggle current dropdown
                        parentDropdown.classList.toggle('mobile-open');
                    }
                }
            });
        });
    }
}

// Notification System
function initializeNotifications() {
    // Create notification system for updates, alerts, etc.
    // Notifications disabled - uncomment below to enable
    const notifications = [
        // { id: 1, type: 'info', message: 'New product catalog available', link: 'resources.html#catalog' },
        // { id: 2, type: 'success', message: 'Enhanced mobile experience now live', link: null },
        // { id: 3, type: 'alert', message: 'Upcoming maintenance window', link: 'contact.html#support' }
    ];
    
    // Display notifications if user hasn't seen them
    showNotifications(notifications);
}

// Language Selector Enhancement
function initializeLanguageSelector() {
    // Placeholder for future multi-language support
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Future: implement language switching
            console.log('Language selection feature - coming soon!');
        });
    }
}

// Modal Functions
function showSearchModal() {
    const searchModal = createSearchModal();
    document.body.appendChild(searchModal);
    searchModal.style.display = 'flex';
    setTimeout(() => searchModal.classList.add('active'), 10);
}

function showChatWidget() {
    // Create chat widget
    const chatWidget = createChatWidget();
    document.body.appendChild(chatWidget);
    setTimeout(() => chatWidget.classList.add('active'), 10);
}

function showLoginModal() {
    // Create login modal
    const loginModal = createLoginModal();
    document.body.appendChild(loginModal);
    loginModal.style.display = 'flex';
    setTimeout(() => loginModal.classList.add('active'), 10);
}

// Create Search Modal
function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h3><i class="fas fa-search"></i> Search Products & Resources</h3>
                <button class="modal-close" onclick="this.closest('.search-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="search-modal-body">
                <div class="search-box-large">
                    <input type="search" placeholder="Search actuators, gearboxes, industries..." class="search-input-large" autofocus>
                    <button class="search-submit-large"><i class="fas fa-search"></i></button>
                </div>
                <div class="search-categories">
                    <h4>Popular Searches</h4>
                    <div class="search-tags">
                        <a href="products.html#pneumatic" class="search-tag">Pneumatic Actuators</a>
                        <a href="products.html#gearboxes" class="search-tag">Gearboxes</a>
                        <a href="industries.html#oil-gas" class="search-tag">Oil & Gas</a>
                        <a href="resources.html#datasheets" class="search-tag">Datasheets</a>
                        <a href="services.html#maintenance" class="search-tag">Maintenance</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop" onclick="this.closest('.search-modal').remove()"></div>
    `;
    return modal;
}

// Create Chat Widget
function createChatWidget() {
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.innerHTML = `
        <div class="chat-header">
            <h4><i class="fas fa-headset"></i> Technical Support</h4>
            <button class="chat-close" onclick="this.closest('.chat-widget').remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="chat-body">
            <div class="chat-message bot">
                <div class="message-content">
                    <p>Hello! How can we help you with actuators and gearboxes today?</p>
                </div>
            </div>
            <div class="chat-options">
                <button class="chat-option" onclick="selectChatOption('technical')">Technical Support</button>
                <button class="chat-option" onclick="selectChatOption('sales')">Sales Inquiry</button>
                <button class="chat-option" onclick="selectChatOption('quote')">Request Quote</button>
            </div>
        </div>
        <div class="chat-footer">
            <p><small>Connect with our technical team: <a href="tel:+917708097242">+91 77080 97242</a></small></p>
        </div>
    `;
    return widget;
}

// Create Login Modal
function createLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="login-modal-content">
            <div class="login-modal-header">
                <h3><i class="fas fa-user-lock"></i> Employee Access</h3>
                <button class="modal-close" onclick="this.closest('.login-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="login-modal-body">
                <form class="login-form">
                    <div class="form-group">
                        <label for="employeeId">Employee ID</label>
                        <input type="text" id="employeeId" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
                <div class="login-help">
                    <a href="#forgot">Forgot Password?</a> | 
                    <a href="contact.html#support">Need Help?</a>
                </div>
            </div>
        </div>
        <div class="modal-backdrop" onclick="this.closest('.login-modal').remove()"></div>
    `;
    return modal;
}

// Show Notifications
function showNotifications(notifications) {
    if (notifications.length === 0) return;
    
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    
    notifications.forEach(notification => {
        const notif = document.createElement('div');
        notif.className = `notification notification-${notification.type}`;
        notif.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${notification.type === 'info' ? 'info-circle' : notification.type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                <span>${notification.message}</span>
                ${notification.link ? `<a href="${notification.link}" class="notification-link">View</a>` : ''}
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        notificationContainer.appendChild(notif);
    });
    
    document.body.appendChild(notificationContainer);
    
    // Auto-hide notifications after 8 seconds
    setTimeout(() => {
        if (notificationContainer.parentElement) {
            notificationContainer.remove();
        }
    }, 8000);
}

// Enhanced Menu Visibility Features
function initializeMenuVisibility() {
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Initialize breadcrumbs
    initializeBreadcrumbs();
    
    // Add menu item indicators
    addMenuIndicators();
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href.replace('.html', ''))) {
            link.classList.add('active', 'current-page');
            link.setAttribute('aria-current', 'page');
        }
    });
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showSearchModal();
        }
        
        // Ctrl/Cmd + M for menu toggle (mobile)
        if ((e.ctrlKey || e.metaKey) && e.key === 'm' && window.innerWidth <= 768) {
            e.preventDefault();
            const hamburger = document.getElementById('hamburger');
            if (hamburger) hamburger.click();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.search-modal, .login-modal');
            modals.forEach(modal => modal.remove());
            
            const chatWidget = document.querySelector('.chat-widget');
            if (chatWidget) chatWidget.remove();
        }
    });
}

function initializeBreadcrumbs() {
    const breadcrumbWrapper = document.getElementById('breadcrumbWrapper');
    if (!breadcrumbWrapper) return;
    
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment !== '' && segment !== 'index.html');
    
    if (segments.length > 0) {
        breadcrumbWrapper.style.display = 'block';
        // Update breadcrumb based on current page
        updateBreadcrumb(segments);
    }
}

function addMenuIndicators() {
    // Add "NEW" badge to recently added menu items
    const newItems = [
        'careers.html',
        'global-presence/susin-itork-india.html'
    ];
    
    newItems.forEach(item => {
        const link = document.querySelector(`a[href="${item}"]`);
        if (link) {
            link.classList.add('new-feature');
        }
    });
    
    // Add update indicators to frequently updated sections
    const updatedItems = [
        'resources.html',
        'products.html'
    ];
    
    updatedItems.forEach(item => {
        const link = document.querySelector(`a[href="${item}"]`);
        if (link) {
            link.classList.add('has-updates');
        }
    });
}

// Initialize all enhanced features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeMenuVisibility();
});

// Chat option selection
function selectChatOption(option) {
    const chatBody = document.querySelector('.chat-body');
    if (!chatBody) return;
    
    const responses = {
        technical: "I'll connect you with our technical support team. What specific technical issue can we help you with?",
        sales: "Great! I'll connect you with our sales team. What products are you interested in?", 
        quote: "I'll help you get a quote. Please provide details about your actuator or gearbox requirements."
    };
    
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<div class="message-content"><p>${option.charAt(0).toUpperCase() + option.slice(1)}</p></div>`;
    
    const botMessage = document.createElement('div');
    botMessage.className = 'chat-message bot';
    botMessage.innerHTML = `<div class="message-content"><p>${responses[option]}</p></div>`;
    
    chatBody.appendChild(userMessage);
    setTimeout(() => chatBody.appendChild(botMessage), 1000);
    
    // Remove options after selection
    const options = document.querySelector('.chat-options');
    if (options) options.remove();
}

// Mobile Navigation Toggle with performance optimization
// This runs after DOM is fully loaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        // Remove any duplicate listeners and add single click handler
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive);
            
            // Prevent body scroll when menu is open with requestAnimationFrame
            requestAnimationFrame(() => {
                if (isActive) {
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                } else {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            });
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            });
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            const withinNav = navMenu.contains(e.target) || hamburger.contains(e.target);
            if (!withinNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        });

        // Close mobile nav when scrolling (improved mobile UX)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (navMenu.classList.contains('active') && window.innerWidth <= 768) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }, 100);
            }
        }, { passive: true });

        // Ensure nav is reset on resize (avoid mobile menu stuck open)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            }, 150);
        });
    }
});

// Helper to return current header height in pixels (number)
function getHeaderHeightNumber() {
    try {
        // Prefer CSS var if set
        const cssVar = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
        if (cssVar) {
            const px = parseInt(cssVar.trim().replace('px', ''), 10);
            if (!isNaN(px)) return px;
        }

        // Fallback: measure topbar + navbar
        let headerHeight = 0;
        const topbar = document.querySelector('.topbar');
        const navbarEl = document.querySelector('.navbar');
        if (topbar && topbar.offsetHeight) headerHeight += topbar.offsetHeight;
        if (navbarEl) {
            const navWrapper = navbarEl.querySelector('.nav-wrapper');
            headerHeight += navWrapper && navWrapper.offsetHeight ? navWrapper.offsetHeight : navbarEl.offsetHeight;
        }
        return Math.ceil(headerHeight) || 0;
    } catch (e) {
        return 0;
    }
}

// Smooth Scrolling for Anchor Links (accounts for fixed header offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                const headerOffset = getHeaderHeightNumber() || 0;
                const additionalGap = 8; // small breathing room
                const targetRect = target.getBoundingClientRect();
                const targetY = window.pageYOffset + targetRect.top - headerOffset - additionalGap;

                window.scrollTo({ top: targetY, behavior: 'smooth' });

                // Ensure the element is focusable so keyboard users land on it
                const needsTabIndex = !target.hasAttribute('tabindex');
                if (needsTabIndex) target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });

                // Clean up temporary tabindex after a delay
                if (needsTabIndex) {
                    setTimeout(() => {
                        try { target.removeAttribute('tabindex'); } catch (e) {}
                    }, 2000);
                }
            }
        }
    });
});

// Resources Tab Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Navbar Scroll Effect (optimized with requestAnimationFrame to avoid layout thrash)
let lastKnownScroll = 0;
let ticking = false;
const navbar = document.querySelector('.navbar');

function updateNavbar(scrollY) {
    if (!navbar) return;
    // Use a simple threshold for elevated shadow when scrolled
    if (scrollY > 80) {
        navbar.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.14)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    }
    // Compact header: toggle a class on the document element for CSS to shrink header
    try {
        document.documentElement.classList.toggle('header-compact', scrollY > 120);
    } catch (e) {}
}

// Ensure `main#main-content` has a top padding equal to the header height to avoid overlap
function adjustMainPadding() {
    try {
        const main = document.getElementById('main-content');
        if (!main) return;
        // measure banner/header: topbar + navbar combined
        const topbar = document.querySelector('.topbar');
        const navbarEl = document.querySelector('.navbar');

        // compute visible header height: prefer topbar + nav-wrapper height if present
        let headerHeight = 0;
        if (topbar && topbar.offsetHeight) headerHeight += topbar.offsetHeight;
        if (navbarEl) {
            // If nav-wrapper is inside navbar, measure its height; otherwise navbar itself
            const navWrapper = navbarEl.querySelector('.nav-wrapper');
            headerHeight += navWrapper && navWrapper.offsetHeight ? navWrapper.offsetHeight : navbarEl.offsetHeight;
        }

        // set padding-top to headerHeight (plus small safety 4px)
        const safe = Math.ceil(headerHeight) + 4;
        main.style.paddingTop = safe + 'px';
        // also set a CSS variable for consumers
        document.documentElement.style.setProperty('--header-height', safe + 'px');
    } catch (e) {
        // ignore
    }
}

// Call adjustMainPadding on load and resize
// Observe header size changes (ResizeObserver + MutationObserver fallback)
function observeHeaderSize() {
    try {
        const topbar = document.querySelector('.topbar');
        const navbarEl = document.querySelector('.navbar');

        // Use ResizeObserver when available
        if (window.ResizeObserver) {
            // Disconnect previous observer
            if (window.__headerResizeObserver) try { window.__headerResizeObserver.disconnect(); } catch (e) {}
            const ro = new ResizeObserver(() => adjustMainPadding());
            if (topbar) ro.observe(topbar);
            if (navbarEl) ro.observe(navbarEl);
            // keep reference
            window.__headerResizeObserver = ro;
        }

        // Use MutationObserver to catch structural changes that can affect height
        if (window.MutationObserver) {
            if (window.__headerMutationObserver) try { window.__headerMutationObserver.disconnect(); } catch (e) {}
            const mo = new MutationObserver(() => {
                clearTimeout(window.__headerMutationTimer);
                window.__headerMutationTimer = setTimeout(adjustMainPadding, 60);
            });
            const target = document.querySelector('header') || document.querySelector('.site-header') || document.querySelector('.navbar') || document.body;
            mo.observe(target, { attributes: true, childList: true, subtree: true, characterData: true });
            window.__headerMutationObserver = mo;
        }
    } catch (e) {
        // silent
    }
}

window.addEventListener('DOMContentLoaded', () => {
    adjustMainPadding();
    // allow a small delay after fonts/images load
    setTimeout(adjustMainPadding, 250);
    // start observing header size changes
    observeHeaderSize();
});
window.addEventListener('load', () => {
    adjustMainPadding();
    observeHeaderSize();

    // If the page was loaded with a hash, adjust the initial scroll to account for fixed header
    try {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const y = window.pageYOffset + target.getBoundingClientRect().top - getHeaderHeightNumber() - 8;
                window.scrollTo(0, y);
                try { target.focus({ preventScroll: true }); } catch (e) {
                    try { target.setAttribute('tabindex', '-1'); target.focus(); } catch (ee) {}
                }
            }
        }
    } catch (e) {}
});
window.addEventListener('resize', () => {
    // debounce resize quickly
    clearTimeout(window.__adjustMainPaddingTimer);
    window.__adjustMainPaddingTimer = setTimeout(adjustMainPadding, 120);
});

// Ensure adjustments when header-compact toggles via updateNavbar (call adjustMainPadding from update loop)
// updateNavbar runs inside rAF; it toggles the class — call adjustMainPadding after toggling
const originalUpdateNavbar = updateNavbar;
updateNavbar = function(scrollY) {
    originalUpdateNavbar(scrollY);
    adjustMainPadding();
};

window.addEventListener('scroll', () => {
    lastKnownScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbar(lastKnownScroll);
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Active Navigation Link Highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .industry-item, .feature-item, .service-card, .industry-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Product Image Placeholder Enhancement
document.querySelectorAll('.product-placeholder').forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Handle image loading errors - show placeholder if image fails to load
document.querySelectorAll('.product-img, .product-card-img').forEach(img => {
    img.addEventListener('error', function() {
        // Hide broken image
        this.style.display = 'none';
        
        // Show placeholder icon if parent has product-icon class
        const parent = this.closest('.product-icon');
        if (parent) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-image';
            icon.style.fontSize = '3rem';
            icon.style.color = 'var(--primary-color)';
            parent.appendChild(icon);
        }
        
        // Show placeholder if parent has product-image class
        const imageContainer = this.closest('.product-image');
        if (imageContainer) {
            const placeholder = document.createElement('div');
            placeholder.className = 'product-placeholder';
            const icon = document.createElement('i');
            icon.className = 'fas fa-cog fa-5x';
            placeholder.appendChild(icon);
            imageContainer.appendChild(placeholder);
        }
    });
    
    // Add loading state
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set initial opacity for fade-in effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s';
});

/* Product Search Panel Logic */
const openSearch = document.getElementById('openSearch');
const closeSearch = document.getElementById('closeSearch');
const productSearchPanel = document.getElementById('productSearchPanel');
const productSearchInput = document.getElementById('productSearchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

function setSearchVisible(visible) {
    if (!productSearchPanel) return;
    productSearchPanel.setAttribute('aria-hidden', visible ? 'false' : 'true');
    productSearchPanel.style.display = visible ? 'block' : 'none';
    if (visible && productSearchInput) productSearchInput.focus();
}

if (openSearch && productSearchPanel) {
    openSearch.addEventListener('click', () => setSearchVisible(true));
}
if (closeSearch && productSearchPanel) {
    closeSearch.addEventListener('click', () => setSearchVisible(false));
}

// Topbar search button (if present) should open the same panel
const openSearchTop = document.getElementById('openSearchTop');
if (openSearchTop) {
    openSearchTop.addEventListener('click', () => setSearchVisible(true));
}

// Build suggestion index from product sections
function buildProductIndex() {
    const sections = document.querySelectorAll('.product-section');
    const items = [];
    sections.forEach(sec => {
        const titleEl = sec.querySelector('h2');
        const subtitle = sec.querySelector('.product-series');
        const id = sec.id || null;
        const title = titleEl ? titleEl.textContent.trim() : '';
        const desc = sec.textContent.trim().slice(0, 200);
        items.push({title, subtitle: subtitle ? subtitle.textContent.trim() : '', id});
    });
    return items;
}

let productIndex = buildProductIndex();

// Try load sitewide search index and merge with page index (sitewide search)
fetch('assets/search/search-index.json')
    .then(resp => {
        if (!resp.ok) throw new Error('no index');
        return resp.json();
    })
    .then(json => {
        // normalize json entries to match productIndex shape
        const extras = json.map(item => ({
            title: item.title || '',
            subtitle: item.tags ? item.tags.join(', ') : (item.subtitle || ''),
            id: null,
            url: item.url || '#',
            anchor: item.anchor || '' ,
            excerpt: item.excerpt || ''
        }));
        productIndex = productIndex.concat(extras);
        // update suggestions if search panel already rendered
        if (productSearchInput && !productSearchInput.value) renderSuggestions(productIndex);
    })
    .catch(() => {
        // silently ignore if index not found
    });

function renderSuggestions(list) {
    if (!searchSuggestions) return;
    searchSuggestions.innerHTML = '';
    if (list.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No results';
        searchSuggestions.appendChild(li);
        return;
    }
    list.forEach(item => {
        const li = document.createElement('li');
        li.tabIndex = 0;
        // show title and optional subtitle/excerpt
        li.innerHTML = '<strong>' + item.title + '</strong>' + (item.subtitle ? ' &mdash; <small>' + item.subtitle + '</small>' : '') + (item.excerpt ? '<div class="suggest-excerpt">' + item.excerpt + '</div>' : '');
        li.addEventListener('click', () => {
            setSearchVisible(false);
            // if this item refers to an anchor within the same page
            if (item.id) {
                const target = document.getElementById(item.id);
                if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
                return;
            }
            // if item has a url (sitewide index), navigate there
            if (item.url) {
                const dest = item.url + (item.anchor || '');
                window.location.href = dest;
            }
        });
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') li.click();
        });
        searchSuggestions.appendChild(li);
    });
}

if (productSearchInput) {
    productSearchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) return renderSuggestions(productIndex);
        const matches = productIndex.filter(it => {
            const title = (it.title || '').toLowerCase();
            const subtitle = (it.subtitle || '').toLowerCase();
            const excerpt = (it.excerpt || '').toLowerCase();
            return title.includes(q) || subtitle.includes(q) || excerpt.includes(q) || (it.tags && it.tags.join(' ').includes(q));
        });
        renderSuggestions(matches);
    });
    // initial suggestions
    renderSuggestions(productIndex);
}

// Accessibility: close panels with Escape key and manage aria-expanded
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // close search
        if (productSearchPanel && productSearchPanel.getAttribute('aria-hidden') === 'false') setSearchVisible(false);
        // close chat
        if (chatWindow && !chatWindow.hidden) chatWindow.hidden = true;
        // close login
        if (employeeLoginModal && employeeLoginModal.getAttribute('aria-hidden') === 'false') setLoginVisible(false);
    }
});

// enhance aria-expanded for toggles
function setToggleAria(button, expanded) {
    try { if (button) button.setAttribute('aria-expanded', expanded ? 'true' : 'false'); } catch (e) {}
}

// wrap setSearchVisible to update aria attributes
const originalSetSearchVisible = setSearchVisible;
setSearchVisible = function(visible) {
    originalSetSearchVisible(visible);
    setToggleAria(openSearch, visible);
    setToggleAria(openSearchTop, visible);
};

// Chat toggle aria handling is attached below after elements are defined

// Employee login: if SITE_CONFIG has employeeLoginUrl, redirect instead of opening modal
try {
    if (window.SITE_CONFIG && window.SITE_CONFIG.employeeLoginUrl && window.SITE_CONFIG.employeeLoginUrl.trim() !== '') {
        const loginUrl = window.SITE_CONFIG.employeeLoginUrl.trim();
        if (employeeLoginBtn) {
            employeeLoginBtn.addEventListener('click', () => {
                window.location.href = loginUrl;
            });
        }
        // topbar buttons that may exist
        const btns = document.querySelectorAll('.topbar-actions .topbar-login');
        btns.forEach(b => b.addEventListener('click', () => window.location.href = loginUrl));
    }
} catch (e) {
    // ignore
}

/* Lightweight Chatbot — client-side, no server required */
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatbotWrap = document.getElementById('chatbot');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

const cannedFaq = [
    {q: 'installation', a: 'Installation guides and commissioning procedures are available in the Resources section. Which product are you installing?' },
    {q: 'warranty', a: 'Standard product warranty details are listed in the product datasheet. We can share the exact terms for your model.' },
    {q: 'datasheet', a: 'You can download datasheets from the product page or Resources -> Datasheets. Tell me the product series.' },
    {q: 'troubleshoot', a: 'Describe the symptom (error, vibration, leak) and I will suggest checks and next steps.' }
];

function appendChat(message, from = 'bot') {
    if (!chatMessages) return;
    const el = document.createElement('div');
    el.className = 'chat-msg ' + (from === 'user' ? 'user' : 'bot');
    el.textContent = message;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        if (!chatWindow) return;
        const nowOpen = chatWindow.hidden;
        chatWindow.hidden = !nowOpen;
        if (!chatWindow.hidden) {
            chatWindow.classList.add('show');
            if (chatInput) chatInput.focus();
            setToggleAria(chatToggle, true);
            if (chatbotWrap) chatbotWrap.setAttribute('aria-hidden', 'false');
        } else {
            chatWindow.classList.remove('show');
            setToggleAria(chatToggle, false);
            if (chatbotWrap) chatbotWrap.setAttribute('aria-hidden', 'true');
        }
    });
}
if (chatClose) {
    chatClose.addEventListener('click', () => {
        if (chatWindow) { chatWindow.hidden = true; chatWindow.classList.remove('show'); setToggleAria(chatToggle, false); if (chatbotWrap) chatbotWrap.setAttribute('aria-hidden', 'true'); }
    });
}

// Topbar chat toggle
const chatToggleTopBtn = document.getElementById('chatToggleTop');
if (chatToggleTopBtn) {
    chatToggleTopBtn.addEventListener('click', () => {
        if (!chatWindow) return;
        const nowOpen = chatWindow.hidden;
        chatWindow.hidden = !nowOpen;
        if (!chatWindow.hidden) {
            chatWindow.classList.add('show');
            if (chatInput) chatInput.focus();
            setToggleAria(chatToggleTopBtn, true);
            if (chatbotWrap) chatbotWrap.setAttribute('aria-hidden', 'false');
        } else {
            chatWindow.classList.remove('show');
            setToggleAria(chatToggleTopBtn, false);
            if (chatbotWrap) chatbotWrap.setAttribute('aria-hidden', 'true');
        }
    });
}

// Employee login modal logic
const employeeLoginBtn = document.getElementById('employeeLoginBtn');
const employeeLoginModal = document.getElementById('employeeLoginModal');
const loginClose = document.getElementById('loginClose');
const loginCancel = document.getElementById('loginCancel');
const employeeLoginForm = document.getElementById('employeeLoginForm');
const loginMessage = document.getElementById('loginMessage');

function setLoginVisible(visible) {
    if (!employeeLoginModal) return;
    employeeLoginModal.setAttribute('aria-hidden', visible ? 'false' : 'true');
    employeeLoginModal.style.display = visible ? 'flex' : 'none';
    if (visible) {
        const user = document.getElementById('empUser');
        if (user) user.focus();
    }
}

if (employeeLoginBtn) {
    employeeLoginBtn.addEventListener('click', () => setLoginVisible(true));
}
if (loginClose) loginClose.addEventListener('click', () => setLoginVisible(false));
if (loginCancel) loginCancel.addEventListener('click', () => setLoginVisible(false));

if (employeeLoginForm) {
    employeeLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('empUser').value.trim();
        // Basic client-side check (no real auth)
        if (!user) {
            loginMessage.textContent = 'Please enter your username.';
            return;
        }
        loginMessage.textContent = 'Signing in...';
        setTimeout(() => {
            loginMessage.textContent = 'Signed in (demo). Redirecting...';
            // For demo: close modal after a moment
            setTimeout(() => {
                setLoginVisible(false);
                loginMessage.textContent = '';
                employeeLoginForm.reset();
            }, 700);
        }, 800);
    });
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        appendChat(text, 'user');

        // Try match canned FAQ
        const q = text.toLowerCase();
        const match = cannedFaq.find(f => q.includes(f.q));
        setTimeout(() => {
            if (match) {
                appendChat(match.a, 'bot');
            } else {
                appendChat('Thanks — our technical team has received your message. We typically respond within one business day. For urgent support, please call +91 77080 97242.', 'bot');
            }
            // Auto-focus input for next message
            if (chatInput) chatInput.focus();
        }, 700);

        chatForm.reset();
    });
}

// Announce chat messages to screen readers
if (chatMessages) {
    const chatObserver = new MutationObserver(() => {
        const lastMsg = chatMessages.lastElementChild;
        if (lastMsg) {
            lastMsg.setAttribute('role', 'status');
            lastMsg.setAttribute('aria-live', 'polite');
        }
    });
    chatObserver.observe(chatMessages, { childList: true });
}

/* ============================================
   VIDEO FLASH SLIDER - VALVE INDUSTRY
   ============================================ */

// Video Flash Slider Functionality
(function() {
    const sliderWrapper = document.querySelector('.video-slider-wrapper');
    const sliderContainer = document.querySelector('.video-flash-slider');
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const progressBar = document.querySelector('.progress-bar');
    const playPauseBtn = document.getElementById('sliderPlayPause');
    const fullscreenBtn = document.getElementById('sliderFullscreen');
    const currentSlideCounter = document.querySelector('.current-slide');
    const totalSlidesCounter = document.querySelector('.total-slides');
    
    if (!sliderWrapper || slides.length === 0) return;
    
    let currentSlide = 0;
    let autoplayInterval;
    let progressInterval;
    let isPlaying = true;
    let isFullscreen = false;
    const slideDuration = 2000; // 2 seconds per slide
    const progressUpdateInterval = 30; // Update progress every 30ms for smooth animation
    
    // Set total slides counter
    if (totalSlidesCounter) {
        totalSlidesCounter.textContent = slides.length;
    }
    
    // Touch events for swipe
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize slider
    function initSlider() {
        showSlide(0);
        startAutoplay();
        
        // Add event listeners
        if (prevButton) prevButton.addEventListener('click', previousSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Play/Pause button
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }
        
        // Fullscreen button
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', toggleFullscreen);
        }
        
        // Pause autoplay on hover
        sliderWrapper.addEventListener('mouseenter', pauseOnHover);
        sliderWrapper.addEventListener('mouseleave', resumeOnLeave);
        
        // Touch/Swipe events
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
            sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // Pause videos when not active
        pauseInactiveVideos();
    }
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active');
            const video = slide.querySelector('.slide-video');
            if (video) video.pause();
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Play video for active slide
        const activeVideo = slides[index].querySelector('.slide-video');
        if (activeVideo) {
            activeVideo.currentTime = 0;
            activeVideo.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        }
        
        currentSlide = index;
        
        // Update counter
        if (currentSlideCounter) {
            currentSlideCounter.textContent = index + 1;
        }
        
        // Reset progress bar
        resetProgressBar();
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
        resetAutoplay();
    }
    
    function previousSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
        resetAutoplay();
    }
    
    function goToSlide(index) {
        if (index !== currentSlide) {
            showSlide(index);
            resetAutoplay();
        }
    }
    
    function togglePlayPause() {
        if (isPlaying) {
            stopAutoplay();
            isPlaying = false;
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                playPauseBtn.setAttribute('aria-label', 'Play slideshow');
            }
        } else {
            startAutoplay();
            isPlaying = true;
            if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
            }
        }
    }
    
    function toggleFullscreen() {
        if (!isFullscreen) {
            if (sliderContainer.requestFullscreen) {
                sliderContainer.requestFullscreen();
            } else if (sliderContainer.webkitRequestFullscreen) {
                sliderContainer.webkitRequestFullscreen();
            } else if (sliderContainer.msRequestFullscreen) {
                sliderContainer.msRequestFullscreen();
            }
            isFullscreen = true;
            sliderContainer.classList.add('fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                fullscreenBtn.setAttribute('aria-label', 'Exit fullscreen');
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullscreen = false;
            sliderContainer.classList.remove('fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen');
            }
        }
    }
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next slide
                nextSlide();
            } else {
                // Swiped right - previous slide
                previousSlide();
            }
        }
    }
    
    function startAutoplay() {
        if (!isPlaying) return;
        stopAutoplay(); // Clear any existing intervals
        autoplayInterval = setInterval(nextSlide, slideDuration);
        startProgressBar();
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
        stopProgressBar();
    }
    
    function pauseOnHover() {
        if (isPlaying) {
            stopAutoplay();
        }
    }
    
    function resumeOnLeave() {
        if (isPlaying) {
            startAutoplay();
        }
    }
    
    function resetAutoplay() {
        if (isPlaying) {
            stopAutoplay();
            startAutoplay();
        }
    }
    
    function startProgressBar() {
        if (!progressBar) return;
        if (!isPlaying) return;
        
        stopProgressBar();
        
        let progress = 0;
        const increment = (100 / slideDuration) * progressUpdateInterval;
        
        progressInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
            }
            progressBar.style.width = progress + '%';
        }, progressUpdateInterval);
    }
    
    function stopProgressBar() {
        if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
        }
    }
    
    function resetProgressBar() {
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        stopProgressBar();
        if (isPlaying) {
            startProgressBar();
        }
    }
    
    function handleKeyboardNavigation(e) {
        // Only handle if slider is visible
        const sliderSection = document.querySelector('.video-flash-slider');
        if (!sliderSection || !isElementInViewport(sliderSection)) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === ' ') {
            e.preventDefault();
            togglePlayPause();
        } else if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        }
    }
    
    function pauseInactiveVideos() {
        slides.forEach((slide, index) => {
            const video = slide.querySelector('.slide-video');
            if (video && index !== currentSlide) {
                video.pause();
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Listen for fullscreen change events
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        const fullscreenElement = document.fullscreenElement || 
                                 document.webkitFullscreenElement || 
                                 document.msFullscreenElement;
        
        if (!fullscreenElement) {
            isFullscreen = false;
            if (sliderContainer) {
                sliderContainer.classList.remove('fullscreen');
            }
            if (fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                fullscreenBtn.setAttribute('aria-label', 'Toggle fullscreen');
            }
        }
    }
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
            slides.forEach(slide => {
                const video = slide.querySelector('.slide-video');
                if (video) video.pause();
            });
        } else {
            if (isPlaying) {
                startAutoplay();
            }
            const activeVideo = slides[currentSlide].querySelector('.slide-video');
            if (activeVideo) activeVideo.play().catch(() => {});
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Ensure videos are properly sized after resize
            slides.forEach(slide => {
                const video = slide.querySelector('.slide-video');
                if (video) {
                    video.style.width = 'auto';
                    video.style.height = 'auto';
                }
            });
        }, 250);
    });
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlider);
    } else {
        initSlider();
    }
    
    // Intersection Observer to pause slider when not in view
    if ('IntersectionObserver' in window) {
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (isPlaying) {
                        startAutoplay();
                    }
                } else {
                    stopAutoplay();
                }
            });
        }, {
            threshold: 0.5
        });
        
        const sliderSection = document.querySelector('.video-flash-slider');
        if (sliderSection) {
            sliderObserver.observe(sliderSection);
        }
    }
    
    // Touch/Swipe support for mobile - REMOVED (already handled in main slider code)
    
    // Preload next video for smoother transitions
    function preloadNextVideo() {
        const nextIndex = (currentSlide + 1) % slides.length;
        const nextVideo = slides[nextIndex].querySelector('.slide-video');
        if (nextVideo) {
            nextVideo.load();
        }
    }
    
    // Preload on slide change
    slides.forEach((slide, index) => {
        slide.addEventListener('transitionend', () => {
            if (index === currentSlide) {
                preloadNextVideo();
            }
        });
    });
})();

