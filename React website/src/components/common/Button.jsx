const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-lg
    transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white focus:ring-primary-200',
    secondary: 'bg-secondary-200 hover:bg-secondary-300 text-secondary-900 focus:ring-secondary-200',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-200',
    ghost: 'hover:bg-secondary-100 text-secondary-700 focus:ring-secondary-200',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <i className={`fas fa-spinner animate-spin ${icon ? 'mr-2' : ''}`}></i>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <i className={`fas fa-${icon} ${children ? 'mr-2' : ''}`}></i>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <i className={`fas fa-${icon} ${children ? 'ml-2' : ''}`}></i>
      )}
    </button>
  );
};

export default Button;
