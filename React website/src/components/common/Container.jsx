// Unifies container spacing across the app and keeps legacy import paths working.
export default function Container({ className = '', children, ...props }) {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

