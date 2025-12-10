export default function Card({ 
  className = '', 
  children, 
  variant = 'default',
  hoverable = true,
  glassmorphism = false,
  ...props 
}) {
  const variants = {
    default: 'bg-white border border-secondary-100 shadow-md shadow-secondary-200/70',
    gradient: 'bg-gradient-to-br from-white to-secondary-50 border border-secondary-200 shadow-md shadow-secondary-200/60',
    primary: 'bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-100 shadow-lg shadow-primary-100/70',
    dark: 'bg-secondary-900 text-white border border-secondary-800 shadow-2xl shadow-secondary-900/50',
  };

  const hoverEffect = hoverable 
    ? 'hover:-translate-y-1.5 hover:shadow-xl hover:border-primary-300 transform' 
    : '';

  const glassEffect = glassmorphism
    ? 'bg-white/75 backdrop-blur-2xl border-white/40 shadow-xl shadow-primary-100/60'
    : '';

  return (
    <div
      className={`rounded-2xl transition-all duration-300 ${variants[variant]} ${hoverEffect} ${glassEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
