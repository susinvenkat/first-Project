import { useEffect } from 'react';

export const useKeyboardNavigation = (onEnter, onEscape) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && onEnter) onEnter(e);
      if (e.key === 'Escape' && onEscape) onEscape(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, onEscape]);
};

export const useFocusTrap = (ref) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);
};
};

export const useAriaLive = (message, priority = 'polite', timeout = 3000) => {
  useEffect(() => {
    const ariaLive = document.createElement('div');
    ariaLive.setAttribute('role', 'status');
    ariaLive.setAttribute('aria-live', priority);
    ariaLive.setAttribute('aria-atomic', 'true');
    ariaLive.className = 'sr-only';
    ariaLive.textContent = message;

    document.body.appendChild(ariaLive);

    const timer = setTimeout(() => {
      ariaLive.remove();
    }, timeout);

    return () => {
      clearTimeout(timer);
      ariaLive.remove();
    };
  }, [message, priority, timeout]);
};
