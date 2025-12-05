export default function Card({ 
  className = '', 
  children, 
  variant = 'default',
  hoverable = true,
  glassmorphism = false,
  ...props 
}) {
  const variants = {
    default: 'bg-white border-2 border-secondary-100',
    gradient: 'bg-gradient-to-br from-white to-secondary-50 border-2 border-secondary-200',
    primary: 'bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200',
    dark: 'bg-secondary-900 text-white border-2 border-secondary-800',
  };

  const hoverEffect = hoverable 
    ? 'hover:shadow-2xl hover:border-primary-500 hover:-translate-y-2 transform' 
    : '';

  const glassEffect = glassmorphism
    ? 'bg-white/80 backdrop-blur-lg border-white/20'
    : '';

  return (
    <div
      className={`rounded-2xl shadow-lg transition-all duration-300 ${variants[variant]} ${hoverEffect} ${glassEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
