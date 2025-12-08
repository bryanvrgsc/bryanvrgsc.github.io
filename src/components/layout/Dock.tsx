import React, { useLayoutEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { settings } from '../../store';
import { Icons } from '../Icons';
import { UI_TEXT } from '../../constants';
import { DOCK_COLORS, SEMANTIC_COLORS, DYNAMIC_COLORS } from '../../constants/colors';
import { GlassDock } from '../common/GlassElement';
import { LiquidButton } from '../common/LiquidButton';
import { navigateTo } from '../../utils/navigation';

/**
 * Dock Component
 * 
 * Main navigation dock displayed at the bottom of the screen.
 * Features a glass morphism design with animated liquid indicator that slides between items.
 * Includes navigation items and a contact button.
 * 
 * @param currentPath - The current route path for active state detection
 */
export const Dock = ({ currentPath }: { currentPath: string }) => {
    const { lang } = useStore(settings);
    const t = UI_TEXT[lang].nav;
    const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, height: 0, opacity: 0 });
    const isFirstRender = useRef(true);

    const activeId = currentPath === '/' ? 'home'
        : currentPath.includes('services') ? 'services'
            : currentPath.includes('portfolio') ? 'portfolio'
                : currentPath.includes('resources') ? 'resources'
                    : currentPath.includes('contact') ? 'contact'
                        : 'home';

    const navItems = [
        { id: 'home', label: t.home, Icon: Icons.Home, href: '/' },
        { id: 'services', label: t.services, Icon: Icons.Layers, href: '/services' },
        { id: 'portfolio', label: t.work, Icon: Icons.Briefcase, href: '/portfolio' },
        { id: 'resources', label: t.resources, Icon: Icons.Book, href: '/resources' },
    ];

    // Update indicator position when active item changes - useLayoutEffect for synchronous DOM reads
    useLayoutEffect(() => {
        const updateIndicator = () => {
            // Hide indicator if activeId is contact (it's a separate button)
            if (activeId === 'contact') {
                setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
                return;
            }

            const activeElement = itemRefs.current[activeId];
            const container = containerRef.current;

            if (activeElement && container) {
                const containerRect = container.getBoundingClientRect();
                const activeRect = activeElement.getBoundingClientRect();

                // Only update if we have valid dimensions
                if (activeRect.width > 0 && activeRect.height > 0) {
                    const left = activeRect.left - containerRect.left;

                    console.log('Indicator positioning:', {
                        activeId,
                        containerLeft: containerRect.left,
                        activeLeft: activeRect.left,
                        calculatedLeft: left,
                        width: activeRect.width,
                        height: activeRect.height
                    });

                    setIndicatorStyle({
                        left,
                        width: activeRect.width,
                        height: activeRect.height,
                        opacity: 1,
                    });

                    // After first successful positioning, enable transitions
                    if (isFirstRender.current) {
                        setTimeout(() => {
                            isFirstRender.current = false;
                        }, 200);
                    }
                }
            }
        };

        // Multiple attempts to ensure DOM is fully rendered (especially important on page load)
        // GlassDock uses ResizeObserver which may take time to calculate final size
        const timer1 = setTimeout(updateIndicator, 100);
        const timer2 = setTimeout(updateIndicator, 200);
        const timer3 = setTimeout(updateIndicator, 300);
        const timer4 = setTimeout(updateIndicator, 500);

        window.addEventListener('resize', updateIndicator);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            window.removeEventListener('resize', updateIndicator);
        };
    }, [activeId]);

    return (
        <>
            {/* SVG Filters for Goo Effect */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <filter id="goo-filter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            <nav className="fixed left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none bottom-[calc(0.25rem+env(safe-area-inset-bottom))] md:bottom-[calc(0.5rem+env(safe-area-inset-bottom))]" aria-label="Main Navigation">
                <GlassDock>
                    <div ref={containerRef} className="relative flex items-center gap-2 md:gap-3">
                        {/* Animated Sliding Liquid Indicator */}
                        <div
                            className="liquid-indicator absolute top-1/2 rounded-2xl pointer-events-none overflow-hidden"
                            style={{
                                left: `${indicatorStyle.left}px`,
                                width: `${indicatorStyle.width}px`,
                                height: `${indicatorStyle.height}px`,
                                opacity: indicatorStyle.opacity,
                                transform: 'translateY(-50%)',
                                transition: isFirstRender.current
                                    ? 'none'
                                    : 'left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
                                filter: 'url(#goo-filter)',
                            }}
                        >
                            {/* Glass Background */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: DYNAMIC_COLORS.raw.light.primary,
                                    opacity: 0.15,
                                    backdropFilter: 'blur(12px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                                    boxShadow: `inset 0 0 0 1px ${DYNAMIC_COLORS.raw.light.primary}4D, 0 4px 12px -4px ${DYNAMIC_COLORS.raw.light.primary}66`,
                                }}
                            />
                            {/* Glass Shine Effect */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.08) 20%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.08) 80%, rgba(255, 255, 255, 0.2) 100%)',
                                    opacity: 0.5,
                                }}
                            />
                        </div>

                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                ref={(el) => { itemRefs.current[item.id] = el; }}
                                href={`#${item.href}`}
                                onClick={(e) => { e.preventDefault(); navigateTo(item.href); }}
                                className={`dock-item group relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.25,1,0.3,1)]
                                    ${activeId === item.id
                                        ? 'text-[var(--text-primary)]'
                                        : 'text-[var(--dock-text)] hover:text-[var(--text-primary)] hover:scale-105'}`}
                            >
                                <item.Icon className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 relative z-10 ${activeId === item.id ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                                <span className={`text-[9px] md:text-[10px] font-semibold tracking-wide transition-all duration-300 relative z-10 ${activeId === item.id ? 'opacity-100' : 'opacity-70'}`}>
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </div>

                    <div className="w-[1px] h-6 bg-[var(--card-border)] mx-1 md:mx-2 opacity-50"></div>

                    <LiquidButton
                        type="button"
                        className={`rounded-full px-5 py-3 md:px-7 md:py-3.5 text-xs md:text-sm font-semibold transition-all duration-500
                            ${activeId === 'contact'
                                ? `${DOCK_COLORS.hoverScale}`
                                : 'hover:scale-105 opacity-90 hover:opacity-100'}`}
                        style={{
                            '--card-bg': activeId === 'contact' ? DOCK_COLORS.activeBg : DOCK_COLORS.inactiveBg,
                            '--card-hover-bg': activeId === 'contact' ? `${DYNAMIC_COLORS.raw.light.primary}1A` : 'var(--dock-item-bg)',
                            '--card-border': activeId === 'contact' ? `${DYNAMIC_COLORS.raw.light.primary}4D` : DOCK_COLORS.inactiveBorder,
                            '--text-primary': activeId === 'contact' ? 'var(--button-text)' : 'var(--text-primary)',
                            '--glass-glow': `${DYNAMIC_COLORS.raw.light.primary}66`,
                            color: activeId === 'contact' ? SEMANTIC_COLORS.light.successText : undefined,
                            boxShadow: activeId === 'contact' ? `0 0 20px ${DYNAMIC_COLORS.raw.light.primary}66` : undefined
                        } as React.CSSProperties}
                        onClick={() => navigateTo('/contact')}
                    >
                        {t.contact}
                    </LiquidButton>
                </GlassDock>
            </nav>
        </>
    );
};
