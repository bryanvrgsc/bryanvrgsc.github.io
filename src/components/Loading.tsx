import React from 'react';

export const LoadingAnimation = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-primary)] transition-colors duration-500">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-[var(--card-border)] rounded-full opacity-20"></div>

                {/* Spinning Gradient Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-cyan-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>

                {/* Inner Pulsing Hexagon/Circle */}
                <div className="absolute w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl backdrop-blur-md border border-emerald-500/30 animate-pulse-glow flex items-center justify-center transform rotate-45">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                </div>

                {/* Orbiting Particle */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <span className="text-[var(--text-primary)] font-mono text-sm tracking-[0.3em] uppercase font-bold animate-pulse">
                    Initializing
                </span>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
};
