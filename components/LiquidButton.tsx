import React from 'react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  isActive = false,
  ...props 
}) => {
  let baseStyles = "liquid-glass-wrapper relative group inline-flex items-center justify-center font-medium transition-all duration-300 ease-out active:scale-95";
  let variantStyles = "";

  // iOS/macOS Style Variants
  if (variant === 'primary') {
    variantStyles = "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-transparent";
  } else if (variant === 'secondary') {
    variantStyles = "bg-slate-800/40 text-white border border-white/10 hover:bg-slate-700/50 hover:border-white/20 backdrop-blur-md";
  } else if (variant === 'glass') {
    variantStyles = `text-white border border-white/5 backdrop-blur-xl transition-all duration-500
      ${isActive 
        ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)] border-white/20 scale-105' 
        : 'bg-white/5 hover:bg-white/10 hover:border-white/10'}`;
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {/* Liquid Effect Layer */}
      <div className="liquid-glass-effect"></div>
      
      {/* Shine/Tint Layers */}
      <div className="absolute inset-0 z-10 rounded-inherit bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <span className="relative z-20 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default LiquidButton;