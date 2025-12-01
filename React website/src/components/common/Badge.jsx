const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 border border-primary-300',
    success: 'bg-green-100 text-green-800 border border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    error: 'bg-red-100 text-red-800 border border-red-300',
    info: 'bg-blue-100 text-blue-800 border border-blue-300',
    secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`
      inline-flex items-center gap-1 rounded-full font-semibold
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${className}
    `}>
      {icon && <i className={`fas fa-${icon}`}></i>}
      {children}
    </span>
  );
};

export default Badge;
