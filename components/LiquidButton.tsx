import React from 'react';

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`liquid-glass-wrapper relative group inline-flex items-center justify-center font-medium transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] active:scale-95 overflow-hidden ${className}`}
    >
      {/* Background Layer with blur */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl group-hover:bg-white/10 transition-colors duration-500"></div>
      
      {/* Subtle internal gradient for depth */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

      {/* Gradient Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-emerald-500/40 blur-2xl"></div>
      
      {/* Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 tracking-wide">
        {children}
      </span>
      
      {/* Border Layer */}
      <div className="absolute inset-0 border border-white/10 rounded-full group-hover:border-white/25 transition-colors duration-500 pointer-events-none"></div>
    </button>
  );
};