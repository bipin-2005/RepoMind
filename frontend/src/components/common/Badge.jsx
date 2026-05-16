import React from 'react';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false
}) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    secondary: 'bg-slate-850 text-slate-400 border border-slate-800',
    primary: 'bg-accent-blue-500/10 text-accent-blue-300 border border-accent-blue-500/30',
    success: 'bg-success-500/10 text-success-400 border border-success-500/30',
    warning: 'bg-warning-500/10 text-warning-400 border border-warning-500/30',
    error: 'bg-error-500/10 text-error-400 border border-error-500/30',
    info: 'bg-accent-cyan-500/10 text-accent-cyan-300 border border-accent-cyan-500/30'
  };
  
  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px] sm:text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs sm:text-sm',
    lg: 'px-3 py-1 text-sm'
  };
  
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-md font-medium
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
      {children}
    </span>
  );
};

export default Badge;

// Made with Bob
