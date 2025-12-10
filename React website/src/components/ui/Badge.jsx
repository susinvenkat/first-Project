export default function Badge({ 
  children, 
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200 shadow-sm shadow-primary-100/70',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-100/70',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm shadow-amber-100/70',
    info: 'bg-sky-50 text-sky-700 border-sky-200 shadow-sm shadow-sky-100/70',
    dark: 'bg-secondary-900 text-white border-secondary-700 shadow-inner',
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-6 py-2.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center border rounded-full font-medium transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <i className={`${icon} mr-2`}></i>}
      {children}
    </span>
  );
}
