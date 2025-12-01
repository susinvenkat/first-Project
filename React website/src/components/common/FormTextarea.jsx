import { forwardRef } from 'react';

const FormTextarea = forwardRef(({
  label,
  error,
  hint,
  required,
  disabled,
  maxLength,
  rows = 4,
  className = '',
  containerClassName = '',
  value = '',
  onChange,
  ...props
}, ref) => {
  const charCount = value?.length || 0;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-secondary-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none
          ${error 
            ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
            : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-200'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
          placeholder-secondary-400
          ${className}
        `}
        {...props}
      />

      <div className="flex justify-between items-start mt-2">
        <div>
          {error && (
            <p className="text-red-600 text-sm flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </p>
          )}

          {hint && !error && (
            <p className="text-secondary-500 text-sm flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              {hint}
            </p>
          )}
        </div>

        {maxLength && (
          <span className={`text-xs font-medium ${
            charCount / maxLength > 0.9 ? 'text-red-600' : 'text-secondary-500'
          }`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
