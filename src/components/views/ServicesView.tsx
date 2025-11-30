import React from 'react';
import { useStore } from '@nanostores/react';
import { settings } from '../../store';
import { Icons } from '../Icons';
import { UI_TEXT } from '../../constants/ui-text';
import { SERVICES, ENGAGEMENT_MODELS } from '../../constants';
import { getCategoryTheme } from '../../utils/helpers';

/**
 * ServicesView Component
 * 
 * Displays all services offered with detailed descriptions,
 * value propositions, and engagement models.
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

export const ServicesView = () => {
    const { lang } = useStore(settings);
    const handleMouseMove = useMousePosition();
    const t = UI_TEXT[lang].services;

    return (
        <div className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-40 md:pb-52 animate-slide-up">
            <div className="flex flex-col items-center text-center mb-8 md:mb-16 px-2 md:px-0">
                <div><h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{t.title}</h2><p className="text-[var(--text-secondary)] text-base md:text-lg">{t.subtitle}</p></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {SERVICES[lang].map((s, i) => {
                    const Icon = Icons[s.iconName as keyof typeof Icons];
                    const theme = getCategoryTheme(s.title);
                    return (
                        <div onMouseMove={handleMouseMove} key={i} className="bento-card rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 flex flex-col items-start text-left h-full group w-full md:w-[calc(33.33%-1.5rem)] flex-grow-0" style={theme.colors as React.CSSProperties}>
                            <div className={`h-16 w-16 md:h-20 md:h-20 rounded-3xl bg-gradient-to-br ${theme.gradientFrom} to-transparent flex items-center justify-center mb-6 md:mb-10 border border-[var(--card-border)] ${theme.text} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg relative z-10`}><Icon className="w-7 h-7 md:w-9 md:h-9 drop-shadow-sm" /></div>
                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 relative z-10 tracking-tight">{s.title}</h3>
                            <div className="flex-grow space-y-3 md:space-y-5 relative z-10 w-full flex flex-col items-start">{s.items.map((item, idx) => (<div key={idx} className="flex items-start justify-start gap-3 md:gap-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors w-full"><div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${theme.bullet} shadow-sm flex-shrink-0 mt-2`}></div><span className="text-sm md:text-[15px] font-medium leading-relaxed">{item}</span></div>))}</div>
                            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-[var(--card-border)] relative z-10 w-full flex flex-col items-start"><p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-4">{t.impact}</p><div className="space-y-3 w-full flex flex-col items-start">{s.valueProp.map((vp, vidx) => (<div key={vidx} className="flex items-center justify-start gap-3 text-xs text-[var(--text-secondary)] bg-[var(--input-bg)] p-3 rounded-xl border border-[var(--card-border)] group-hover:bg-[var(--glass-glow)] transition-colors w-full max-w-[280px]"><span className={theme.text}><Icons.CheckCircle className="w-4 h-4" /></span>{vp}</div>))}</div></div>
                        </div>
                    );
                })}
            </div>
            <div onMouseMove={handleMouseMove} className="mt-8 md:mt-12 p-5 md:p-10 bento-card rounded-[2rem] md:rounded-[2.5rem]">
                <h3 className="text-2xl font-bold mb-6 md:mb-8 tracking-tight text-[var(--text-primary)] text-center">{t.engagementModels}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">{ENGAGEMENT_MODELS[lang].map((m, i) => { const Icon = Icons[m.iconName as keyof typeof Icons]; return (<div key={i} className="flex flex-col items-center justify-center p-6 md:p-8 bg-[var(--input-bg)] rounded-3xl border border-[var(--card-border)] hover:bg-[var(--glass-glow)] transition-all duration-300 group cursor-default hover:-translate-y-1 text-center"><div className="mb-4 text-[var(--text-tertiary)] group-hover:text-emerald-500 group-hover:scale-110 transition-all"><Icon className="w-6 h-6 md:w-8 md:h-8" /></div><span className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">{m.label}</span></div>); })}</div>
            </div>
        </div>
    );
};
