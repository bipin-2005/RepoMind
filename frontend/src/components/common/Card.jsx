import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  variant = 'default',
  padding = 'default'
}) => {
  const baseClasses = 'rounded transition-smooth';
  
  const variants = {
    default: 'card-elevated',
    flat: 'bg-slate-900/20 border border-slate-800/40',
    bordered: 'bg-slate-925 border border-slate-800/50',
    ghost: 'bg-transparent',
  };
  
  const paddings = {
    none: '',
    sm: 'p-2 sm:p-3',
    default: 'p-3 sm:p-4 md:p-5',
    lg: 'p-4 sm:p-5 md:p-6 lg:p-7',
  };
  
  const hoverClasses = hover ? 'card-elevated-hover cursor-pointer' : '';
  
  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

// Made with Bob
