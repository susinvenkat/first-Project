const base = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 min-h-[44px]';

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md',
  secondary: 'bg-secondary-900 text-white hover:bg-secondary-800',
  ghost: 'bg-transparent text-primary-700 hover:bg-primary-50',
  outline: 'bg-transparent border border-primary-600 text-primary-700 hover:bg-primary-50',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
};

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;
  return (
    <Comp className={cls} {...props}>
      {children}
    </Comp>
  );
}
