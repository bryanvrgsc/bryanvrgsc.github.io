import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { settings } from '../../store';
import { Icons } from '../Icons';
import { LOGO_COLORS, GLOW_EFFECTS } from '../../constants/colors';
import { navigateTo } from '../../utils/navigation';

/**
 * Header Component
 * 
 * Displays the site logo/branding in the top center of the page.
 * Transforms into a pill-shaped button when user scrolls down.
 * Clicking the header navigates to the home page.
 */
export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const { theme } = useStore(settings);

    useEffect(() => {
        // Detect scroll to toggle 'pill' mode
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return (
        <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 md:pt-6 pointer-events-none">
            <a
                href="#/"
                onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
                className={`pointer-events-auto cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full
          w-auto px-6 h-[44px]
          ${scrolled
                        ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--card-border)] shadow-2xl opacity-100 translate-y-0'
                        : 'bg-transparent border-transparent shadow-none opacity-100 translate-y-0'}`}
                aria-label="Go to Homepage"
            >
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 md:gap-3">
                        <Icons.Windows className={`w-5 h-5 ${LOGO_COLORS.windows.color} ${LOGO_COLORS.windows.glow}`} />
                        <Icons.Apple className={`w-5 h-5 transition-colors duration-300 ${isDark ? `${LOGO_COLORS.apple.dark} ${LOGO_COLORS.apple.glowDark}` : `${LOGO_COLORS.apple.light} ${LOGO_COLORS.apple.glowLight}`}`} />
                        <Icons.Linux className={`w-5 h-5 ${LOGO_COLORS.linux.color} ${LOGO_COLORS.linux.glow}`} />
                    </div>
                    <span className="font-mono text-base md:text-lg font-bold tracking-tight text-[var(--text-primary)] flex items-center">
                        <span className="text-[var(--text-tertiary)] mr-[1px]">@</span>
                        bryan<span className="text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">vrgsc</span>
                        <span className="text-[var(--text-secondary)]">~%</span>
                        <span className="ml-2 w-2.5 h-4 md:w-3 md:h-5 bg-[var(--text-primary)] animate-cursor-blink block"></span>
                    </span>
                </div>
            </a>
        </header>
    );
};
