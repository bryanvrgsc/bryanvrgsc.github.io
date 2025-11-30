import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { settings } from '../../store';
import { Icons } from '../Icons';
import { LiquidButton } from '../common/LiquidButton';
import { TechCard } from '../ui/TechCard';
import { Typewriter } from '../common/Typewriter';
import { UI_TEXT } from '../../constants/ui-text';
import { navigateTo } from '../../utils/navigation';

/**
 * HomeView Component
 * 
 * Main landing page with hero section, mission, and vision.
 * Features scroll-snapping sections and animated typewriter effects.
 */

// Hook for mouse position tracking with performance optimization
const useMousePosition = () => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    return handleMouseMove;
};

export const HomeView = () => {
    const { lang } = useStore(settings);
    const t = UI_TEXT[lang];
    const [activeStep, setActiveStep] = useState(1);
    const handleMouseMove = useMousePosition();
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        // CRITICAL FIX: Delay enabling scroll snapping to prevent conflict with "scrollTo(0)" animation
        // coming from other pages. If we enable it immediately, the browser fights the scroll 
        // and bounces back.
        const timer = setTimeout(() => {
            document.documentElement.style.scrollSnapType = 'y mandatory';
        }, 800);

        return () => {
            document.documentElement.style.scrollSnapType = '';
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            sectionRefs.current.forEach((section, index) => {
                if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                    setActiveStep(index + 1);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (index: number) => {
        sectionRefs.current[index - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="relative flex flex-col items-center w-full">
            <div className="fixed left-3 md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 md:gap-6 pointer-events-auto">
                {[{ id: 1, label: t.homeLabels.overview }, { id: 2, label: t.mission.title }, { id: 3, label: t.vision.title }].map((step) => (
                    <div key={step.id} className="group flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection(step.id)}>
                        <div className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full transition-all duration-500 ease-in-out border border-[var(--card-border)] ${activeStep === step.id ? 'bg-emerald-500 scale-125 shadow-[0_0_15px_rgba(16,185,129,0.6)] border-emerald-500' : 'bg-[var(--dock-item-bg)] hover:bg-[var(--text-tertiary)] group-hover:scale-110'}`}></div>
                        <span className={`hidden md:block text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-500 ${activeStep === step.id ? 'text-[var(--text-primary)] opacity-100 translate-x-0' : 'text-[var(--text-tertiary)] opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'}`}>{step.label}</span>
                    </div>
                ))}
                <div className="absolute left-[4px] md:left-[6px] top-2 bottom-2 w-[1px] bg-[var(--card-border)] -z-10 opacity-30"></div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <section ref={(el) => { sectionRefs.current[0] = el }} className="min-h-screen min-h-[100svh] w-full flex flex-col justify-center items-center py-20 md:py-24 snap-start relative">
                    <div className="flex flex-col items-center text-center animate-slide-up max-w-5xl mx-auto w-full">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-transparent drop-shadow-sm leading-[0.9]">
                            {t.heroTitle.split(' ')[0]} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 filter drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">{t.heroTitle.split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <p className="max-w-xl md:max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-[var(--text-secondary)] mb-8 md:mb-8 font-normal leading-relaxed tracking-wide px-2">{t.heroSubtitle}<br /><span className="text-[var(--text-tertiary)] text-xs md:text-lg mt-2 block font-light">{t.heroTags}</span></p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full px-4 mb-10 md:mb-12">
                            <LiquidButton onClick={() => navigateTo('/contact')} className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-5 text-base md:text-lg min-w-[180px] md:min-w-[200px] rounded-full" style={{ '--card-bg': 'rgba(16, 185, 129, 0.15)', '--card-border': 'rgba(16, 185, 129, 0.4)', '--glass-glow': 'rgba(16, 185, 129, 0.6)' } as React.CSSProperties}>{t.startProject}</LiquidButton>
                            <LiquidButton onClick={() => navigateTo('/portfolio')} className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-5 text-base md:text-lg min-w-[180px] md:min-w-[200px] rounded-full">{t.exploreWork}</LiquidButton>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-4xl mx-auto px-1">
                            {[{ val: "<50ms", label: t.stats.latency }, { val: "99.9%", label: t.stats.uptime }, { val: "A+", label: t.stats.security }, { val: "24/7", label: t.stats.global }].map((stat, i) => (
                                <div onMouseMove={handleMouseMove} key={i} className="bento-card p-3 md:p-4 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center h-20 md:h-28 group">
                                    <span className="text-lg md:text-3xl font-mono font-bold text-[var(--text-primary)] tracking-tight mb-1 group-hover:scale-110 transition-transform duration-500 group-hover:text-emerald-500">{stat.val}</span>
                                    <span className="text-[9px] md:text-[11px] text-[var(--text-secondary)] uppercase font-bold tracking-[0.2em]">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => scrollToSection(2)} className="mt-8 md:mt-10 lg:mt-16 animate-bounce p-2 md:p-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors backdrop-blur-md shadow-sm"><Icons.ArrowUp className="w-4 h-4 md:w-5 md:h-5 rotate-180" /></button>
                    </div>
                </section>

                <section ref={(el) => { sectionRefs.current[1] = el }} className="min-h-screen min-h-[100svh] w-full flex flex-col justify-center items-center py-12 md:py-20 snap-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center w-full max-w-6xl h-auto md:h-[500px]">
                        <div className="order-2 md:order-1 h-full w-full">
                            <TechCard title={`/// ${t.mission.title.toUpperCase()}`} accentColor="emerald" className="h-full flex flex-col justify-center w-full">
                                <div className="flex flex-col h-full justify-center"><div className="text-base md:text-lg lg:text-xl leading-relaxed"><Typewriter text={t.mission.content} startDelay={200} cursorColor="bg-emerald-500" delay={15} active={activeStep >= 2} /></div></div>
                            </TechCard>
                        </div>
                        <div className="order-1 md:order-2 h-[300px] md:h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-[var(--card-border)] relative group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent z-10 mix-blend-multiply"></div>
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Mission Team" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-105" />
                            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20">
                                <div className="bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-100 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse"></div>{t.homeLabels.collaboration}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={(el) => { sectionRefs.current[2] = el }} className="min-h-screen min-h-[100svh] w-full flex flex-col justify-center items-center py-12 md:py-20 snap-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center w-full max-w-6xl h-auto md:h-[500px]">
                        <div className="order-1 h-[300px] md:h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-[var(--card-border)] relative group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 via-transparent to-transparent z-10 mix-blend-multiply"></div>
                            <img src="https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=2070&auto=format&fit=crop" alt="Future Vision" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-105" />
                            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20">
                                <div className="bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 text-cyan-100 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse"></div>{t.homeLabels.future}</div>
                            </div>
                        </div>
                        <div className="order-2 h-full w-full flex flex-col">
                            <TechCard title={`/// ${t.vision.title.toUpperCase()}`} accentColor="blue" className="h-full flex flex-col justify-center w-full">
                                <div className="flex flex-col h-full justify-center"><div className="text-base md:text-lg lg:text-xl leading-relaxed"><Typewriter text={t.vision.content} startDelay={200} cursorColor="bg-cyan-500" delay={15} active={activeStep >= 3} /></div></div>
                            </TechCard>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
