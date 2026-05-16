import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  onClick,
  type = 'button'
}) => {
  const baseClasses = 'font-medium rounded-md transition-smooth flex items-center justify-center gap-1.5 sm:gap-2 focus-ring';
  
  const variants = {
    primary: 'bg-accent-blue-600 hover:bg-accent-blue-700 text-white border border-accent-blue-500/50 shadow-sm hover:shadow-md',
    secondary: 'bg-slate-800 hover:bg-slate-750 text-slate-100 border border-slate-700 shadow-sm',
    outline: 'border border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:border-slate-600',
    ghost: 'text-slate-300 hover:bg-slate-800/50 hover:text-slate-100',
    danger: 'bg-error-600 hover:bg-error-700 text-white border border-error-500/50 shadow-sm',
    success: 'bg-success-600 hover:bg-success-700 text-white border border-success-500/50 shadow-sm'
  };
  
  const sizes = {
    xs: 'px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs min-h-[36px] sm:min-h-0',
    sm: 'px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm min-h-[40px] sm:min-h-0',
    md: 'px-3 sm:px-4 py-2 text-sm min-h-[44px] sm:min-h-0',
    lg: 'px-4 sm:px-5 py-2.5 text-sm sm:text-base min-h-[48px] sm:min-h-0'
  };
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && <Icon size={16} strokeWidth={2} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;

// Made with Bob
