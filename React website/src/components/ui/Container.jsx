export default function Container({ className = '', children, ...props }) {
  return (
    <div className={`container mx-auto px-4 lg:px-6 safe-area-container ${className}`} {...props}>
      {children}
    </div>
  );
}
