const levelClasses = {
  1: 'text-4xl md:text-6xl lg:text-7xl font-heading font-bold',
  2: 'text-3xl md:text-5xl font-heading font-bold',
  3: 'text-2xl md:text-3xl font-heading font-semibold',
  4: 'text-xl md:text-2xl font-heading font-semibold',
};

export default function Heading({ as: Comp = 'h2', level = 2, className = '', children, ...props }) {
  const cls = `${levelClasses[level] || levelClasses[2]} ${className}`;
  return (
    <Comp className={cls} {...props}>
      {children}
    </Comp>
  );
}
