const Alert = ({ type = 'info', title, message, onClose, closeable = true }) => {
  const typeClasses = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const iconClasses = {
    info: 'fa-info-circle text-blue-600',
    success: 'fa-check-circle text-green-600',
    warning: 'fa-exclamation-triangle text-yellow-600',
    error: 'fa-times-circle text-red-600',
  };

  return (
    <div className={`border-l-4 p-4 rounded-lg flex items-start gap-3 ${typeClasses[type]} animate-slide-down`}>
      <i className={`fas ${iconClasses[type]} flex-shrink-0 mt-0.5 text-lg`}></i>
      
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>

      {closeable && onClose && (
        <button
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
          aria-label="Close alert"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
};

export default Alert;
