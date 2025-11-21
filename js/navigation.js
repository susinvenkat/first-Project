/**
 * SUSIN GROUP - NAVIGATION JAVASCRIPT
 * Enhanced functionality for modern navigation system
 * Features: Search, Mobile menu, Sticky header, Accessibility
 * Last Updated: November 21, 2025
 */

(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
    const CONFIG = {
        stickyThreshold: 100,
        searchDelay: 300,
        mobileBreakpoint: 768,
        focusTrapSelector: '.search-overlay:not([hidden]), .mobile-menu-overlay:not([hidden])',
    };

    // ==================== STATE MANAGEMENT ====================
    const state = {
        isSearchOpen: false,
        isMobileMenuOpen: false,
        lastScrollPosition: 0,
        searchTimeout: null,
    };

    // ==================== DOM ELEMENTS ====================
    const elements = {
        header: null,
        searchToggle: null,
        searchOverlay: null,
        searchInput: null,
        searchClose: null,
        searchForm: null,
        searchBackdrop: null,
        mobileToggle: null,
        mobileMenu: null,
        mobileClose: null,
        mobileBackdrop: null,
        langToggle: null,
        navStatus: null,
        menuLinks: null,
        submenuToggles: null,
    };

    // ==================== INITIALIZATION ====================
    function init() {
        // Cache DOM elements
        cacheElements();
        
        // Setup event listeners
        setupStickyHeader();
        setupSearch();
        setupMobileMenu();
        setupLanguageSelector();
        setupMegaMenus();
        setupAccessibility();
        setupActiveNavigation();
        
        // Announce to screen readers
        announceToScreenReader('Navigation loaded and ready');
        
        console.log('✅ Susin Navigation System Initialized');
    }

    function cacheElements() {
        elements.header = document.getElementById('mainHeader');
        elements.searchToggle = document.getElementById('searchToggle');
        elements.searchOverlay = document.getElementById('searchOverlay');
        elements.searchInput = document.getElementById('searchInput');
        elements.searchClose = document.getElementById('searchClose');
        elements.searchForm = document.getElementById('searchForm');
        elements.searchBackdrop = elements.searchOverlay?.querySelector('.search-backdrop');
        elements.mobileToggle = document.getElementById('mobileToggle');
        elements.mobileMenu = document.getElementById('mobileMenu');
        elements.mobileClose = document.getElementById('mobileClose');
        elements.mobileBackdrop = elements.mobileMenu?.querySelector('.mobile-backdrop');
        elements.langToggle = document.querySelector('.lang-toggle');
        elements.navStatus = document.getElementById('navStatus');
        elements.menuLinks = document.querySelectorAll('.menu-link');
        elements.submenuToggles = document.querySelectorAll('.submenu-toggle');
    }

    // ==================== STICKY HEADER ====================
    function setupStickyHeader() {
        if (!elements.header) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            state.lastScrollPosition = window.pageYOffset;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeaderState();
                    ticking = false;
                });
                ticking = true;
            }
        });

        updateHeaderState();
    }

    function updateHeaderState() {
        if (!elements.header) return;

        if (state.lastScrollPosition > CONFIG.stickyThreshold) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }
    }

    // ==================== SEARCH FUNCTIONALITY ====================
    function setupSearch() {
        if (!elements.searchToggle || !elements.searchOverlay) return;

        // Open search
        elements.searchToggle.addEventListener('click', openSearch);

        // Close search
        elements.searchClose?.addEventListener('click', closeSearch);
        elements.searchBackdrop?.addEventListener('click', closeSearch);

        // Handle form submission
        elements.searchForm?.addEventListener('submit', handleSearchSubmit);

        // Real-time search suggestions
        elements.searchInput?.addEventListener('input', debounce(handleSearchInput, CONFIG.searchDelay));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
            // ESC to close search
            if (e.key === 'Escape' && state.isSearchOpen) {
                closeSearch();
            }
        });
    }

    function openSearch() {
        if (!elements.searchOverlay) return;

        state.isSearchOpen = true;
        elements.searchOverlay.hidden = false;
        elements.searchToggle.setAttribute('aria-expanded', 'true');
        
        // Focus search input
        setTimeout(() => {
            elements.searchInput?.focus();
        }, 100);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Setup focus trap
        setupFocusTrap(elements.searchOverlay);

        announceToScreenReader('Search dialog opened');
    }

    function closeSearch() {
        if (!elements.searchOverlay) return;

        state.isSearchOpen = false;
        elements.searchOverlay.hidden = true;
        elements.searchToggle.setAttribute('aria-expanded', 'false');
        
        // Clear input
        if (elements.searchInput) {
            elements.searchInput.value = '';
        }

        // Hide suggestions
        const suggestions = document.getElementById('searchSuggestions');
        if (suggestions) {
            suggestions.hidden = true;
        }

        // Restore body scroll
        document.body.style.overflow = '';

        // Return focus to toggle button
        elements.searchToggle?.focus();

        announceToScreenReader('Search dialog closed');
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        
        const query = elements.searchInput?.value.trim();
        if (!query) return;

        // Log search for analytics (without sensitive data)
        console.log('Search performed');

        // Redirect to search results page or perform search
        const searchUrl = `search-results.html?q=${encodeURIComponent(query)}`;
        window.location.href = searchUrl;
    }

    function handleSearchInput(e) {
        const query = e.target.value.trim().toLowerCase();
        if (!query || query.length < 2) {
            hideSuggestions();
            return;
        }

        // Simple search database
        const searchData = [
            { title: 'Pneumatic Actuators', url: 'products.html#pneumatic', category: 'Products' },
            { title: 'Electro-Hydraulic Actuators', url: 'products.html#electro-hydraulic', category: 'Products' },
            { title: 'Electrical Actuators', url: 'products.html#electrical', category: 'Products' },
            { title: 'Gearboxes', url: 'products.html#gearboxes', category: 'Products' },
            { title: 'Oil & Gas Solutions', url: 'industries.html#oil-gas', category: 'Industries' },
            { title: 'Water Treatment', url: 'industries.html#water', category: 'Industries' },
            { title: 'Power Generation', url: 'industries.html#power', category: 'Industries' },
            { title: 'Installation Services', url: 'services.html#installation', category: 'Services' },
            { title: 'Maintenance Services', url: 'services.html#maintenance', category: 'Services' },
            { title: 'Technical Training', url: 'services.html#training', category: 'Services' },
            { title: 'Datasheets', url: 'resources.html#datasheets', category: 'Resources' },
            { title: 'User Manuals', url: 'resources.html#manuals', category: 'Resources' },
            { title: 'Contact Us', url: 'contact.html', category: 'Company' },
            { title: 'Careers', url: 'careers.html', category: 'Company' },
            { title: 'About Susin', url: 'about.html', category: 'Company' },
        ];

        // Filter results
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        ).slice(0, 5);

        showSuggestions(results);
    }

    function showSuggestions(results) {
        const container = document.getElementById('searchSuggestions');
        if (!container) return;

        if (results.length === 0) {
            container.hidden = true;
            return;
        }

        container.innerHTML = results.map(result => `
            <a href="${result.url}" class="suggestion-item" role="option">
                <span class="suggestion-category">${result.category}</span>
                <span class="suggestion-title">${result.title}</span>
            </a>
        `).join('');

        container.hidden = false;
        container.setAttribute('aria-label', `${results.length} search suggestions available`);
    }

    function hideSuggestions() {
        const container = document.getElementById('searchSuggestions');
        if (container) {
            container.hidden = true;
        }
    }

    // ==================== MOBILE MENU ====================
    function setupMobileMenu() {
        if (!elements.mobileToggle || !elements.mobileMenu) return;

        // Open mobile menu
        elements.mobileToggle.addEventListener('click', toggleMobileMenu);

        // Close mobile menu
        elements.mobileClose?.addEventListener('click', closeMobileMenu);
        elements.mobileBackdrop?.addEventListener('click', closeMobileMenu);

        // Setup submenu toggles
        elements.submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', toggleSubmenu);
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > CONFIG.mobileBreakpoint && state.isMobileMenuOpen) {
                    closeMobileMenu();
                }
            }, 250);
        });
    }

    function toggleMobileMenu() {
        if (state.isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        if (!elements.mobileMenu) return;

        state.isMobileMenuOpen = true;
        elements.mobileMenu.hidden = false;
        elements.mobileToggle.setAttribute('aria-expanded', 'true');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Setup focus trap
        setupFocusTrap(elements.mobileMenu);

        announceToScreenReader('Mobile menu opened');
    }

    function closeMobileMenu() {
        if (!elements.mobileMenu) return;

        state.isMobileMenuOpen = false;
        elements.mobileMenu.hidden = true;
        elements.mobileToggle.setAttribute('aria-expanded', 'false');

        // Close all submenus
        elements.submenuToggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });

        // Restore body scroll
        document.body.style.overflow = '';

        // Return focus
        elements.mobileToggle?.focus();

        announceToScreenReader('Mobile menu closed');
    }

    function toggleSubmenu(e) {
        const toggle = e.currentTarget;
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        // Close other submenus
        elements.submenuToggles.forEach(t => {
            if (t !== toggle) {
                t.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current submenu
        toggle.setAttribute('aria-expanded', !isExpanded);
    }

    // ==================== LANGUAGE SELECTOR ====================
    function setupLanguageSelector() {
        if (!elements.langToggle) return;

        elements.langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = elements.langToggle.getAttribute('aria-expanded') === 'true';
            elements.langToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close on outside click
        document.addEventListener('click', () => {
            elements.langToggle?.setAttribute('aria-expanded', 'false');
        });

        // Handle language selection
        const langLinks = document.querySelectorAll('.lang-menu a');
        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                const langText = link.textContent.trim();
                
                // Update displayed language
                const langSpan = elements.langToggle.querySelector('span:not(.fa-globe):not(.fa-chevron-down)');
                if (langSpan) {
                    langSpan.textContent = lang.toUpperCase();
                }

                // Store preference
                localStorage.setItem('preferredLanguage', lang);

                // Close dropdown
                elements.langToggle.setAttribute('aria-expanded', 'false');

                announceToScreenReader(`Language changed to ${langText}`);
                console.log(`Language changed to: ${lang}`);
            });
        });

        // Load saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            const langSpan = elements.langToggle.querySelector('span:not(.fa-globe):not(.fa-chevron-down)');
            if (langSpan) {
                langSpan.textContent = savedLang.toUpperCase();
            }
        }
    }

    // ==================== MEGA MENUS ====================
    function setupMegaMenus() {
        elements.menuLinks.forEach(link => {
            const menuItem = link.parentElement;
            const hasMega = menuItem.classList.contains('has-mega');

            if (hasMega) {
                // Desktop: hover to show
                menuItem.addEventListener('mouseenter', () => {
                    link.setAttribute('aria-expanded', 'true');
                });

                menuItem.addEventListener('mouseleave', () => {
                    link.setAttribute('aria-expanded', 'false');
                });

                // Keyboard: Enter/Space to toggle
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const isExpanded = link.getAttribute('aria-expanded') === 'true';
                        link.setAttribute('aria-expanded', !isExpanded);
                    }
                });
            }
        });

        // Close mega menus on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-item')) {
                elements.menuLinks.forEach(link => {
                    link.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    // ==================== ACTIVE NAVIGATION ====================
    function setupActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        elements.menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
                announceToScreenReader(`Current page: ${link.textContent.trim()}`);
            }
        });
    }

    // ==================== ACCESSIBILITY ====================
    function setupAccessibility() {
        // Focus visible on keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    function setupFocusTrap(container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const trapFocus = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        container.addEventListener('keydown', trapFocus);

        // Store cleanup function
        container.removeFocusTrap = () => {
            container.removeEventListener('keydown', trapFocus);
        };
    }

    function announceToScreenReader(message) {
        if (!elements.navStatus) return;
        
        elements.navStatus.textContent = message;
        
        setTimeout(() => {
            elements.navStatus.textContent = '';
        }, 1000);
    }

    // ==================== UTILITY FUNCTIONS ====================
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

    // ==================== PUBLIC API ====================
    window.SusinNavigation = {
        openSearch,
        closeSearch,
        openMobileMenu,
        closeMobileMenu,
        state,
    };

    // ==================== AUTO-INITIALIZE ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// Add suggestion styles dynamically
const suggestionStyles = document.createElement('style');
suggestionStyles.textContent = `
    .suggestion-item {
        display: flex;
        flex-direction: column;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--nav-border, #e2e8f0);
        text-decoration: none;
        transition: background 0.2s;
    }
    
    .suggestion-item:last-child {
        border-bottom: none;
    }
    
    .suggestion-item:hover {
        background: var(--nav-light-bg, #f8f9fa);
    }
    
    .suggestion-category {
        font-size: 0.75rem;
        color: var(--susin-primary, #c41e3a);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.25rem;
    }
    
    .suggestion-title {
        color: var(--nav-dark-text, #1a1a1a);
        font-weight: 500;
    }
    
    .keyboard-nav *:focus {
        outline: 2px solid var(--susin-primary, #c41e3a);
        outline-offset: 2px;
    }
`;
document.head.appendChild(suggestionStyles);
