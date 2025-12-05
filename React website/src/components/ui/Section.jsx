export default function Section({ title, subtitle, className = '', children, ...props }) {
  return (
    <section className={`py-16 lg:py-24 ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="text-center mb-12 lg:mb-16">
          {subtitle && (
            <div className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2">{subtitle}</div>
          )}
          {title && (
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-secondary-900">{title}</h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
