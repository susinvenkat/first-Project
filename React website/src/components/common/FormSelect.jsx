const FormSelect = ({
  label,
  error,
  hint,
  required,
  disabled,
  icon,
  className = '',
  containerClassName = '',
  options = [],
  ...props
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-secondary-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none">
            <i className={`fas fa-${icon}`}></i>
          </div>
        )}

        <select
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 appearance-none
            cursor-pointer
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
              : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-200'
            }
            ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-secondary-400">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-2 flex items-center">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {error}
        </p>
      )}

      {hint && !error && (
        <p className="text-secondary-500 text-sm mt-2 flex items-center">
          <i className="fas fa-info-circle mr-2"></i>
          {hint}
        </p>
      )}
    </div>
  );
};

export default FormSelect;
