import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className = '',
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          {label}
          {required && <span className="text-error-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon size={16} strokeWidth={2} />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full input-terminal rounded-md px-3 py-2 sm:py-2.5 text-xs sm:text-sm
            ${Icon ? 'pl-8 sm:pl-9' : ''}
            ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            min-h-[44px] sm:min-h-0
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1.5 text-xs text-error-400 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-error-400"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

// Made with Bob
