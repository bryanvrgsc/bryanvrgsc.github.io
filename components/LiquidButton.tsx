
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
      <div className="absolute inset-0 bg-[var(--card-bg)] backdrop-blur-xl group-hover:bg-[var(--card-hover-bg)] transition-colors duration-500"></div>
      
      {/* Subtle internal gradient for depth (Uses variables for Light/Dark mode support) */}
      <div 
        className="absolute inset-0 opacity-100 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'linear-gradient(to top right, var(--highlight-color) 0%, transparent 40%)' }}
      ></div>

      {/* Gradient Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 blur-2xl"></div>
      
      {/* Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 tracking-wide text-[var(--text-primary)]">
        {children}
      </span>
      
      {/* Border Layer - Slightly stronger in light mode via variable */}
      <div className="absolute inset-0 border border-[var(--card-border)] rounded-full group-hover:border-[var(--glass-glow)] transition-colors duration-500 pointer-events-none"></div>
    </button>
  );
};
