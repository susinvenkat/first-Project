export default function Badge({ 
  children, 
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-primary-600/20 text-primary-700 border-primary-400/30',
    success: 'bg-green-600/20 text-green-700 border-green-400/30',
    warning: 'bg-orange-600/20 text-orange-700 border-orange-400/30',
    info: 'bg-blue-600/20 text-blue-700 border-blue-400/30',
    dark: 'bg-secondary-800/20 text-secondary-900 border-secondary-600/30',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <span
      className={`inline-flex items-center backdrop-blur-md border rounded-full font-medium transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <i className={`${icon} mr-2`}></i>}
      {children}
    </span>
  );
}
