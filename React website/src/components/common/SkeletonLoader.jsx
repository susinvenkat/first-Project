const SkeletonLoader = ({ count = 1, type = 'card', className = '' }) => {
  const skeletons = Array(count).fill(null);

  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow animate-pulse p-6">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="flex p-4 border-b border-gray-200 animate-pulse">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
