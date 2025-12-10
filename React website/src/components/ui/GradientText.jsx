export default function GradientText({ 
  children, 
  from = 'from-primary-500',
  via = 'via-primary-400',
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
