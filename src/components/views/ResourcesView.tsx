import React from 'react';
import { useStore } from '@nanostores/react';
import { settings } from '../../store';
import { Icons } from '../Icons';
import { UI_TEXT } from '../../constants/ui-text';
import { RESOURCES } from '../../constants';
import { getCategoryTheme } from '../../utils/helpers';
import { DYNAMIC_COLORS } from '../../constants/colors';

/**
 * ResourcesView Component
 * 
 * Displays blog posts with category-based theming.
 */

// Hook for mouse position tracking
const useMousePosition = () => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    return handleMouseMove;
};

export const ResourcesView = () => {
    const { lang } = useStore(settings);
    const handleMouseMove = useMousePosition();
    const t = UI_TEXT[lang].resources;

    return (
        <div className="max-w-5xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
            <div className="mb-8 md:mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{t.title}</h2>
                <p className="text-[var(--text-secondary)] text-base md:text-lg">{t.subtitle}</p>
            </div>
            <div className="space-y-6 md:space-y-8">
                {RESOURCES[lang].map((post, i) => {
                    const theme = getCategoryTheme(post.category);
                    return (
                        <article onMouseMove={handleMouseMove} key={i} className="bento-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 cursor-pointer group" style={theme.colors as React.CSSProperties}>
                            <div
                                className="h-20 w-20 md:h-28 md:w-28 rounded-3xl bg-[var(--input-bg)] flex-shrink-0 flex flex-col items-center justify-center border border-[var(--card-border)] transition-all duration-500"
                                style={{
                                    transform: 'scale(1)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.borderColor = `${DYNAMIC_COLORS.raw.light.primary}4D`; // 30% opacity
                                    e.currentTarget.style.boxShadow = `0 0 30px rgba(${DYNAMIC_COLORS.raw.light.rgb.r}, ${DYNAMIC_COLORS.raw.light.rgb.g}, ${DYNAMIC_COLORS.raw.light.rgb.b}, 0.1)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.borderColor = 'var(--card-border)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <span className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tighter">{post.date.split(' ')[1].replace(',', '')}</span>
                                <span className="text-[10px] md:text-[11px] uppercase text-[var(--text-secondary)] font-bold tracking-widest mt-1">{post.date.split(' ')[0]}</span>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-3 mb-3"><span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${theme.text} ${theme.bg} border-current opacity-70`}>{post.category}</span></div>
                                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--text-primary)] transition-colors tracking-tight">{post.title}</h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base font-light">{post.excerpt}</p>
                            </div>
                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[var(--input-bg)] text-[var(--text-primary)] flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all duration-300 transform group-hover:translate-x-2 border border-[var(--card-border)]"><Icons.ArrowRight className="w-4 h-4 md:w-5 md:h-5" /></div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};
