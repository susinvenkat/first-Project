export default function GradientText({ 
  children, 
  from = 'from-primary-600',
  via = 'via-primary-700', 
  to = 'to-secondary-900',
  className = '',
  animate = false,
  ...props 
}) {
  const animationClass = animate ? 'bg-[length:200%_auto] animate-gradient' : '';
  
  return (
    <span
      className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent font-bold ${animationClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
