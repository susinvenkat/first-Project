const Card = ({
  children,
  className = '',
  hover = true,
  shadow = 'md',
  bordered = false,
  onClick,
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg p-6
        transition-all duration-300
        ${shadowClasses[shadow]}
        ${hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''}
        ${bordered ? 'border border-secondary-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
