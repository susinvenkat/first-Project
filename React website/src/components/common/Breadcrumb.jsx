import { Link } from 'react-router-dom';

const Breadcrumb = ({ items = [] }) => {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link
                to={item.href}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-secondary-600">{item.label}</span>
            )}
            
            {index < items.length - 1 && (
              <i className="fas fa-chevron-right text-secondary-400 text-xs"></i>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
