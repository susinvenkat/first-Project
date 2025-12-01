const EmptyState = ({
  icon = 'inbox',
  title = 'No data found',
  description = 'There is no data available to display.',
  action,
  actionLabel = 'Go Back',
  actionIcon = 'arrow-left'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl text-secondary-300 mb-4">
        <i className={`fas fa-${icon}`}></i>
      </div>
      
      <h3 className="text-2xl font-bold text-secondary-900 mb-2">
        {title}
      </h3>
      
      <p className="text-secondary-600 text-center max-w-sm mb-6">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action}
          className="inline-flex items-center px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
        >
          <i className={`fas fa-${actionIcon} mr-2`}></i>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
