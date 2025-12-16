import React from 'react';
import { useStore } from '@nanostores/react';
import { dockState, showDock } from '../../store';
import { Icons } from '../Icons';
import { DYNAMIC_COLORS } from '../../constants/colors';

/**
 * ShowDockButton Component
 * 
 * Floating button that appears when dock is hidden.
 * Clicking it shows the dock again.
 * Same height as the dock, positioned at bottom-right.
 */
export const ShowDockButton = () => {
    const { hidden } = useStore(dockState);

    if (!hidden) return null;

    return (
        <button
            onClick={showDock}
            className={`fixed right-3 md:right-8 z-40 
                h-[60px] md:h-[64px] px-5 md:px-6
                flex items-center justify-center gap-2 rounded-full 
                bg-[var(--card-bg)] backdrop-blur-2xl border-2 border-[var(--glass-glow)] 
                shadow-[var(--button-shadow)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] 
                group hover:bg-[var(--card-hover-bg)] hover:scale-105 focus:outline-none focus:ring-2 ${DYNAMIC_COLORS.focusRing} 
                bottom-[calc(0.75rem+env(safe-area-inset-bottom))] md:bottom-[calc(1rem+env(safe-area-inset-bottom))]
                animate-pulse-subtle`}
            aria-label="Show navigation dock"
            style={{
                boxShadow: `0 0 20px ${DYNAMIC_COLORS.raw.light.primary}66, 0 4px 12px rgba(0,0,0,0.15)`
            }}
        >
            {/* Glow ring animation */}
            <div
                className="absolute inset-0 rounded-full animate-ping-slow opacity-30"
                style={{
                    background: `radial-gradient(circle, ${DYNAMIC_COLORS.raw.light.primary}40, transparent 70%)`
                }}
            />
            {/* Background gradient */}
            <div
                className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${DYNAMIC_COLORS.raw.light.primary}40, transparent)`
                }}
            />
            <Icons.Menu className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-primary)] transition-all duration-300 relative z-10" />
            <span className="text-sm font-medium text-[var(--text-primary)] relative z-10 hidden md:inline">Menu</span>
        </button>
    );
};
