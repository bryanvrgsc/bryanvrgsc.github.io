import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { settings } from '../../store';
import { Icons } from '../Icons';
import { UI_TEXT } from '../../constants/ui-text';
import { PORTFOLIO } from '../../constants';
import { PortfolioModal } from '../modals';

/**
 * PortfolioView Component
 * 
 * Displays portfolio projects in a grid layout.
 * Clicking on a project opens a detailed modal.
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

export const PortfolioView = () => {
    const { lang } = useStore(settings);
    const handleMouseMove = useMousePosition();
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const t = UI_TEXT[lang].portfolio;

    return (
        <>
            <div className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
                <div className="mb-8 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{t.title}</h2>
                    <p className="text-[var(--text-secondary)] text-base md:text-lg">{t.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {PORTFOLIO[lang].map((item, i) => (
                        <div onMouseMove={handleMouseMove} onClick={() => setSelectedProject(item)} key={i} className="bento-card rounded-[2rem] md:rounded-[3rem] overflow-hidden group p-0 border-0 cursor-pointer">
                            <div className="h-[250px] md:h-[400px] overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 opacity-90"></div>
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white font-bold text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">{t.viewDetails} <Icons.ArrowRight className="w-4 h-4" /></div>
                                </div>
                                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 pointer-events-none"><span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] backdrop-blur-xl shadow-xl">{item.tech.split(',')[0]}</span></div>
                            </div>
                            <div className="p-6 md:p-10 relative z-20 -mt-16 md:-mt-24 pointer-events-none">
                                <h3 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 drop-shadow-lg tracking-tight">{item.title}</h3>
                                <p className="text-emerald-500 font-semibold mb-6 md:mb-8 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider"><Icons.CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> {item.result}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-sm text-[var(--text-secondary)]">
                                    <div className="bg-[var(--input-bg)] p-4 md:p-6 rounded-2xl border border-[var(--card-border)]"><span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2 md:mb-3 font-bold">{t.challenge}</span><span className="text-sm leading-relaxed block line-clamp-3">{item.problem}</span></div>
                                    <div className="bg-[var(--input-bg)] p-4 md:p-6 rounded-2xl border border-[var(--card-border)]"><span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2 md:mb-3 font-bold">{t.solution}</span><span className="text-sm leading-relaxed block line-clamp-3">{item.solution}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedProject && (<PortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} lang={lang} />)}
        </>
    );
};
