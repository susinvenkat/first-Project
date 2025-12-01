import { useEffect } from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeButton = true,
  backdrop = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      {backdrop && (
        <div 
          className="absolute inset-0 bg-black/50 transition-opacity duration-200"
          onClick={onClose}
        ></div>
      )}

      {/* Modal */}
      <div className={`relative bg-white rounded-xl shadow-2xl w-full mx-4 ${sizeClasses[size]} animate-slide-up`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
          <h2 className="text-xl font-bold text-secondary-900">{title}</h2>
          {closeButton && (
            <button
              onClick={onClose}
              className="text-secondary-500 hover:text-secondary-700 transition-colors"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-secondary-200 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
