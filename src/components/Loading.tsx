import React from 'react';

export const LoadingAnimation = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)] transition-colors duration-500">
            <div className="relative flex items-center justify-center">
                {/* Minimalist Spinner */}
                <div className="w-12 h-12 rounded-full border-[3px] border-[var(--card-border)] border-t-emerald-500 animate-spin" style={{ animationDuration: '1s' }}></div>

                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/20 animate-pulse"></div>
            </div>
        </div>
    );
};
