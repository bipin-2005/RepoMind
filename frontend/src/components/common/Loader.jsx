import React from 'react';

const Loader = ({ size = 'md', text = '', fullScreen = false, variant = 'default' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-2',
    xl: 'w-12 h-12 border-3'
  };
  
  const variants = {
    default: 'border-accent-blue-500 border-t-transparent',
    secondary: 'border-slate-600 border-t-transparent',
    success: 'border-success-500 border-t-transparent',
  };
  
  const loader = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizes[size]}
          ${variants[variant]}
          rounded-full animate-spin
        `}
      />
      {text && (
        <p className="text-slate-400 text-sm font-medium">{text}</p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-50">
        {loader}
      </div>
    );
  }
  
  return loader;
};

export default Loader;

// Made with Bob
