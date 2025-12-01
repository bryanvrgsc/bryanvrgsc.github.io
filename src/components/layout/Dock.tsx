import React from 'react';
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
 * Features a glass morphism design with active state indicators.
 * Includes navigation items and a contact button.
 * 
 * @param currentPath - The current route path for active state detection
 */
export const Dock = ({ currentPath }: { currentPath: string }) => {
    const { lang } = useStore(settings);
    const t = UI_TEXT[lang].nav;

    const activeId = currentPath === '/' ? 'home'
        : currentPath.includes('services') ? 'services'
            : currentPath.includes('portfolio') ? 'portfolio'
                : currentPath.includes('blog') ? 'blog'
                    : currentPath.includes('contact') ? 'contact'
                        : 'home';

    const navItems = [
        { id: 'home', label: t.home, Icon: Icons.Home, href: '/' },
        { id: 'services', label: t.services, Icon: Icons.Layers, href: '/services' },
        { id: 'portfolio', label: t.work, Icon: Icons.Briefcase, href: '/portfolio' },
        { id: 'blog', label: t.blog, Icon: Icons.Book, href: '/blog' },
    ];

    return (
        <nav className="fixed left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none bottom-[calc(0.25rem+env(safe-area-inset-bottom))] md:bottom-[calc(0.5rem+env(safe-area-inset-bottom))]" aria-label="Main Navigation">
            <GlassDock>
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.href}`}
                        onClick={(e) => { e.preventDefault(); navigateTo(item.href); }}
                        className={`dock-item group relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.25,1,0.3,1)]
                  ${activeId === item.id
                                ? 'text-[var(--text-primary)]'
                                : 'text-[var(--dock-text)] hover:text-[var(--text-primary)] hover:scale-105'}`}
                    >
                        {activeId === item.id && (
                            <div
                                className="absolute -bottom-1 w-1 h-1 rounded-full"
                                style={{
                                    backgroundColor: DYNAMIC_COLORS.raw.light.primary,
                                    boxShadow: `0 0 12px ${DYNAMIC_COLORS.raw.light.primary}`
                                }}
                            ></div>
                        )}
                        {activeId === item.id && (
                            <div className="absolute inset-0 bg-[var(--text-primary)] opacity-[0.03] rounded-2xl"></div>
                        )}
                        <item.Icon className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${activeId === item.id ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                        <span className={`text-[9px] md:text-[10px] font-semibold tracking-wide transition-all duration-300 ${activeId === item.id ? 'opacity-100' : 'opacity-70'}`}>
                            {item.label}
                        </span>
                    </a>
                ))}

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
    );
};
