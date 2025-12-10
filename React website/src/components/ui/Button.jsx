const base = 'inline-flex items-center justify-center rounded-2xl font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-h-[44px] shadow-sm';

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200/70',
  secondary: 'bg-white text-secondary-900 border border-secondary-200 hover:border-primary-400 hover:text-secondary-800',
  ghost: 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-100',
  outline: 'bg-transparent border border-primary-400 text-primary-700 hover:bg-primary-50',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
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
