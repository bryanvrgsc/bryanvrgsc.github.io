

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '@nanostores/react';
import { settings, performanceMode } from '../store';
import { Icons } from './Icons';
import { LiquidButton } from './SharedUI';
import { UI_TEXT, SERVICES, PORTFOLIO, BLOG_POSTS, ENGAGEMENT_MODELS, Language } from '../constants';
import * as pdfjsLib from 'pdfjs-dist';
import FocusTrap from 'focus-trap-react';
import { allCountries } from 'country-telephone-data';
import { updateMetaTags } from '../utils/seo';

// @ts-ignore - Vite will handle this import
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

// --- PDF VIEWER COMPONENT ---
const PDFViewer = ({ url }: { url: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load PDF document
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(false);
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadPDF();
  }, [url]);

  // Render current page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d')!;

        // Calculate scale to fit container
        const container = canvas.parentElement!;
        const containerWidth = container.clientWidth;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering page:', err);
      }
    };

    renderPage();
  }, [pdfDoc, currentPage]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Cargando presentación...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-[var(--text-secondary)] mb-4">No se pudo cargar el PDF</p>
          <a href={url} target="_blank" rel="noreferrer" className="text-emerald-500 font-bold hover:underline">
            Descargar PDF
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 flex flex-col">
      {/* PDF Canvas */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <canvas ref={canvasRef} className="max-w-full h-auto shadow-lg" />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 p-4 bg-slate-200 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          <Icons.ArrowUp className="w-4 h-4 rotate-[-90deg]" />
          Anterior
        </button>

        <div className="px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
          <span className="font-mono text-sm">
            <span className="font-bold text-[var(--text-primary)]">{currentPage}</span>
            <span className="text-[var(--text-secondary)]"> / </span>
            <span className="text-[var(--text-secondary)]">{totalPages}</span>
          </span>
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
        >
          Siguiente
          <Icons.ArrowUp className="w-4 h-4 rotate-90" />
        </button>
      </div>
    </div>
  );
};

// --- UTILS ---
const useMousePosition = () => {
  const { lite } = useStore(performanceMode);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Optimization: Skip heavy DOM updates in Lite Mode
    if (lite) return;

    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };
  return handleMouseMove;
};

// Updated for Hash Routing (GitHub Pages compatibility)
const navigateTo = (path: string) => {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const getCategoryTheme = (term: string) => {
  const t = term.toLowerCase();
  if (t.includes('auto') || t.includes('app') || t.includes('desarrollo')) {
    return {
      text: "text-emerald-700 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      bullet: "bg-emerald-600",
      gradientFrom: "from-emerald-600/20",
      colors: { '--card-border': 'rgba(5, 150, 105, 0.3)', '--glass-glow': 'rgba(5, 150, 105, 0.5)', '--neon-glow': 'rgba(5, 150, 105, 0.4)' }
    };
  }
  if (t.includes('business') || t.includes('bi') || t.includes('data')) {
    return {
      text: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      bullet: "bg-blue-600",
      gradientFrom: "from-blue-600/20",
      colors: { '--card-border': 'rgba(37, 99, 235, 0.3)', '--glass-glow': 'rgba(37, 99, 235, 0.5)', '--neon-glow': 'rgba(37, 99, 235, 0.4)' }
    };
  }
  if (t.includes('tec') || t.includes('consult')) {
    return {
      text: "text-violet-700 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      bullet: "bg-violet-600",
      gradientFrom: "from-violet-600/20",
      colors: { '--card-border': 'rgba(124, 58, 237, 0.3)', '--glass-glow': 'rgba(124, 58, 237, 0.5)', '--neon-glow': 'rgba(124, 58, 237, 0.4)' }
    };
  }
  if (t.includes('cloud') || t.includes('nube') || t.includes('devops')) {
    return {
      text: "text-cyan-700 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      bullet: "bg-cyan-600",
      gradientFrom: "from-cyan-600/20",
      colors: { '--card-border': 'rgba(6, 182, 212, 0.3)', '--glass-glow': 'rgba(6, 182, 212, 0.5)', '--neon-glow': 'rgba(6, 182, 212, 0.4)' }
    };
  }
  if (t.includes('network') || t.includes('red') || t.includes('connect') || t.includes('wifi')) {
    return {
      text: "text-rose-700 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      bullet: "bg-rose-600",
      gradientFrom: "from-rose-600/20",
      colors: { '--card-border': 'rgba(225, 29, 72, 0.3)', '--glass-glow': 'rgba(225, 29, 72, 0.5)', '--neon-glow': 'rgba(225, 29, 72, 0.4)' }
    };
  }
  return {
    text: "text-slate-700 dark:text-slate-400",
    bg: "bg-slate-50 dark:bg-slate-500/10",
    bullet: "bg-slate-600",
    gradientFrom: "from-slate-600/20",
    colors: { '--card-border': 'rgba(71, 85, 105, 0.25)', '--glass-glow': 'rgba(148, 163, 184, 0.4)', '--neon-glow': 'rgba(148, 163, 184, 0.3)' }
  };
};

const Typewriter = ({ text, delay = 25, startDelay = 0, cursorColor = "bg-emerald-500", onComplete, active = true }: { text: string, delay?: number, startDelay?: number, cursorColor?: string, onComplete?: () => void, active?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  useEffect(() => { if (active) setStarted(true); }, [active]);
  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) { setDisplayedText(text.slice(0, i + 1)); i++; }
        else { clearInterval(interval); if (onComplete) onComplete(); }
      }, delay);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [started, text, delay, startDelay, onComplete]);

  return (
    <span className="relative block w-full break-words">
      <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">{text}<span className="inline-block w-2 h-4 md:w-2.5 md:h-5 ml-0.5" /></span>
      <span className="absolute inset-0 top-0 left-0">{displayedText}<span className={`animate-pulse inline-block w-2 h-4 md:w-2.5 md:h-5 ${cursorColor} align-text-bottom ml-0.5`} /></span>
    </span>
  );
};

const TechCard = ({ title, children, accentColor = "emerald", className = "" }: { title: string, children?: React.ReactNode, accentColor?: "emerald" | "blue", className?: string }) => {
  const styles = accentColor === 'emerald' ? { border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-600 dark:text-emerald-400", indicator: "bg-emerald-500", glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]" } : { border: "border-cyan-500/20", bg: "bg-cyan-500/5", text: "text-cyan-600 dark:text-cyan-400", indicator: "bg-cyan-500", glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]" };

  // Explicitly defined gradient classes to avoid Tailwind purging issues with dynamic strings
  const gradientDivider = accentColor === 'emerald' ? "from-emerald-500/30" : "from-cyan-500/30";
  const gradientBlob = accentColor === 'emerald' ? "from-emerald-500/10" : "from-cyan-500/10";

  return (
    <div className={`relative overflow-hidden rounded-[20px] border ${styles.border} ${styles.bg} backdrop-blur-md p-6 md:p-8 flex flex-col h-full group transition-all duration-700 hover:border-opacity-60 ${styles.glow} ${className}`}>
      <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 ${styles.border} rounded-tl-[18px] opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 ${styles.border} rounded-br-[18px] opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="absolute top-4 right-4 flex gap-1 opacity-20 group-hover:opacity-50 transition-opacity">
        <div className={`w-1 h-1 rounded-full ${styles.indicator}`}></div><div className={`w-1 h-1 rounded-full ${styles.indicator}`}></div><div className={`w-1 h-1 rounded-full ${styles.indicator}`}></div>
      </div>
      <div className="flex items-center gap-3 mb-5 opacity-90 relative z-10">
        <div className="relative"><div className={`w-2 h-2 rounded-sm ${styles.indicator} shadow-[0_0_10px_rgba(255,255,255,0.5)]`}></div><div className={`absolute inset-0 w-2 h-2 rounded-sm ${styles.indicator} animate-ping opacity-30`}></div></div>
        <span className={`text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase font-mono ${styles.text}`}>{title}</span>
        <div className={`h-[1px] flex-grow bg-gradient-to-r ${gradientDivider} to-transparent`}></div>
      </div>
      <div className={`font-mono text-sm md:text-[15px] leading-relaxed ${styles.text} opacity-90 relative z-10 h-full flex flex-col justify-start`}>{children}</div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-tl ${gradientBlob} to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-700`}></div>
    </div>
  );
};

// --- VIEWS ---

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

  // SEO Meta Tags
  useEffect(() => {
    updateMetaTags({
      title: 'bryanvrgsc | Engineering & Development',
      description: t.heroSubtitle,
      keywords: t.heroTags
    });
  }, [lang]);

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
            <button onClick={() => scrollToSection(2)} className="mt-8 md:mt-10 lg:mt-16 animate-bounce p-2 md:p-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors backdrop-blur-md shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:scale-110"><Icons.ArrowUp className="w-4 h-4 md:w-5 md:h-5 rotate-180" /></button>
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

export const ServicesView = () => {
  const { lang } = useStore(settings);
  const handleMouseMove = useMousePosition();
  const t = UI_TEXT[lang].services;

  // SEO Meta Tags
  useEffect(() => {
    updateMetaTags({
      title: `${t.title} | bryanvrgsc`,
      description: t.subtitle
    });
  }, [lang]);

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

// Portfolio Modal
const PortfolioModal = ({ project, onClose, lang }: { project: any, onClose: () => void, lang: Language }) => {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [currentPdf, setCurrentPdf] = useState<string | null>(project.presentationUrl || project.details?.documents?.[0]?.url || null);
  const t = UI_TEXT[lang].portfolio.modal;

  useEffect(() => { setCurrentPdf(project.presentationUrl || project.details?.documents?.[0]?.url || null); }, [project]);
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  if (!project) return null;
  const images = project.screenshots && project.screenshots.length > 0 ? project.screenshots : [project.image];

  // Basic check for PDF files (local or remote)
  const isPdf = currentPdf?.toLowerCase().endsWith('.pdf');

  // Legacy embedding for Drive links if any remain (though updated to local now)
  const getEmbedUrl = (url: string) => { if (url.includes('drive.google.com')) { if (url.includes('/preview')) return url; return url.replace(/\/view.*/, '/preview'); } return `${url}#view=FitH`; };
  const pdfEmbedSrc = !isPdf && currentPdf ? getEmbedUrl(currentPdf) : null;

  return createPortal(
    <FocusTrap focusTrapOptions={{
      onDeactivate: onClose,
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      fallbackFocus: '#modal-close-btn' // Fallback if no other focusable element found
    }}>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 animate-fadeIn" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
        <div className="bg-[var(--card-bg)] backdrop-blur-3xl border border-[var(--card-border)] w-full max-w-6xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row animate-slide-up">
          <button id="modal-close-btn" onClick={onClose} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500" aria-label="Close modal"><Icons.X className="w-6 h-6" /></button>
          <div className="w-full md:w-1/2 h-[40vh] md:h-auto bg-black relative flex flex-col">
            <div className="flex-grow relative overflow-hidden group"><img src={images[activeScreenshot]} alt="Project Screenshot" className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div></div>
            {images.length > 1 && (<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-20">{images.map((img: string, idx: number) => (<button key={idx} onClick={() => setActiveScreenshot(idx)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${activeScreenshot === idx ? 'border-emerald-500 scale-110' : 'border-white/30 opacity-70 hover:opacity-100'}`}><img src={img} alt="thumb" className="w-full h-full object-cover" /></button>))}</div>)}
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col">
            <div className="mb-6"><span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-2 block">{t.caseStudy}</span><h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 leading-tight">{project.title}</h2><div className="flex flex-wrap gap-2 mt-3">{project.tech.split(',').map((t: string, i: number) => (<span key={i} className="px-3 py-1 rounded-full bg-[var(--input-bg)] border border-[var(--card-border)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">{t.trim()}</span>))}</div></div>
            <div className="space-y-8">
              <div><h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><Icons.Briefcase className="w-5 h-5 text-emerald-500" /> {t.overview}</h3><p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">{project.problem} {project.solution}</p></div>

              {/* PDF Viewer Section */}
              {currentPdf && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <Icons.Book className="w-5 h-5 text-indigo-500" /> {t.presentation}
                  </h3>
                  <div className="w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden border border-[var(--card-border)] shadow-sm bg-[var(--card-bg)] relative">
                    {isPdf ? (
                      <PDFViewer url={currentPdf} />
                    ) : (
                      <iframe src={pdfEmbedSrc!} title="Project Presentation" className="w-full h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                          <p className="text-[var(--text-secondary)] mb-2">{t.pdfError}</p>
                          <a href={currentPdf} target="_blank" rel="noreferrer" className="text-emerald-500 font-bold">{t.downloadPdf}</a>
                        </div>
                      </iframe>
                    )}
                  </div>
                  <div className="mt-2 text-right">
                    <a href={currentPdf} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-500 hover:underline flex items-center justify-end gap-1">
                      {t.openTab} <Icons.ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {project.videoUrl && (project.videoUrl.includes("embed") || project.videoUrl.includes("/preview")) && (<div className="mb-4"><h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><Icons.Video className="w-5 h-5 text-red-500" /> {t.demoVideo}</h3><div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-[var(--card-border)] bg-black/50 shadow-lg group"><iframe src={project.videoUrl} title={project.title} className="absolute top-0 left-0 w-full h-full z-10" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div></div>)}
              {project.videoUrl && !(project.videoUrl.includes("embed") || project.videoUrl.includes("/preview")) && (<div className="mb-6"><a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 rounded-xl bg-[var(--input-bg)] border border-[var(--card-border)] text-[var(--text-primary)] hover:border-red-500/50 hover:bg-red-500/5 transition-all group shadow-sm hover:shadow-md"><div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform"><Icons.Video className="w-5 h-5" /></div><div className="flex flex-col"><span className="text-sm font-bold">{t.watchDemo}</span><span className="text-xs text-[var(--text-secondary)]">{t.externalLink}</span></div><Icons.ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity ml-auto" /></a></div>)}
              {project.details?.currentFeatures && (<div><h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><Icons.Layers className="w-5 h-5 text-blue-500" /> {t.features}</h3><ul className="grid grid-cols-1 gap-2">{project.details.currentFeatures.map((f: string, i: number) => (<li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] bg-[var(--input-bg)] p-3 rounded-xl border border-[var(--card-border)]"><Icons.CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /><span>{f}</span></li>))}</ul></div>)}
              {project.details?.techStack && (<div><h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><Icons.Code className="w-5 h-5 text-orange-500" /> {t.techStack}</h3><ul className="grid grid-cols-1 gap-2">{project.details.techStack.map((f: string, i: number) => (<li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] font-mono opacity-80"><span className="text-emerald-500 font-bold">{'>'}</span><span>{f}</span></li>))}</ul></div>)}
              {project.details?.documents && (<div><h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><Icons.Book className="w-5 h-5 text-indigo-500" /> {t.documentation}</h3><ul className="grid grid-cols-1 md:grid-cols-2 gap-3">{project.details.documents.map((doc: any, i: number) => { const isActive = currentPdf && (currentPdf === doc.url || currentPdf.includes(doc.url) || doc.url.includes(currentPdf)); return (<li key={i}><button onClick={() => setCurrentPdf(doc.url)} className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all group h-full text-left ${isActive ? 'bg-indigo-500/10 border-indigo-500 shadow-md ring-1 ring-indigo-500/30' : 'bg-[var(--input-bg)] border-[var(--card-border)] hover:bg-[var(--glass-glow)]'}`}><div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-indigo-500 text-white' : 'bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white'}`}><Icons.Book className="w-4 h-4" /></div><span className={`text-sm font-medium leading-tight ${isActive ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-primary)]'}`}>{doc.label}</span>{isActive && <div className="ml-auto w-2 h-2 rounded-full bg-indigo-500"></div>}</button></li>); })}</ul></div>)}
              {project.details?.upcomingFeatures && (<div><h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2"><Icons.Rocket className="w-5 h-5 text-purple-500" /> {t.roadmap}</h3><ul className="space-y-2">{project.details.upcomingFeatures.map((f: string, i: number) => (<li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] opacity-80"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div><span>{f}</span></li>))}</ul></div>)}
              <div className="pt-4 border-t border-[var(--card-border)] flex flex-col gap-3">{project.repoUrl && (<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] hover:text-emerald-500 transition-colors group"><Icons.GitHub className="w-5 h-5" />{t.viewRepo}<Icons.ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" /></a>)}</div>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
};

export const PortfolioView = () => {
  const { lang } = useStore(settings);
  const handleMouseMove = useMousePosition();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const t = UI_TEXT[lang].portfolio;

  // SEO Meta Tags
  useEffect(() => {
    updateMetaTags({
      title: `${t.title} | bryanvrgsc`,
      description: t.subtitle
    });
  }, [lang]);

  return (
    <>
      <div className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
        <div className="mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{t.title}</h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PORTFOLIO[lang].map((item, i) => (
            <div
              onMouseMove={handleMouseMove}
              onClick={() => setSelectedProject(item)}
              key={i}
              className="bento-card rounded-[2rem] md:rounded-[3rem] overflow-hidden group p-0 border-0 cursor-pointer relative shadow-2xl transition-all duration-500 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:scale-[1.02]"
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title} details`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(item); } }}
            >
              <div className="h-[200px] md:h-[250px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 opacity-90"></div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white font-bold text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">{t.viewDetails} <Icons.ArrowRight className="w-4 h-4" /></div>
                </div>
              </div>
              <div className="p-6 md:p-8 relative z-20 pointer-events-none">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-tight flex-1">{item.title}</h3>
                </div>
                <p className="text-emerald-500 font-semibold mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider"><Icons.CheckCircle className="w-4 h-4" /> {item.result}</p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tech.split(',').slice(0, 3).map((tech: string, idx: number) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] backdrop-blur-xl">
                      {tech.trim()}
                    </span>
                  ))}
                  {item.tech.split(',').length > 3 && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      +{item.tech.split(',').length - 3}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm text-[var(--text-secondary)]">
                  <div className="bg-[var(--input-bg)] p-4 rounded-xl border border-[var(--card-border)]">
                    <span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2 font-bold">
                      {t.challenge}
                    </span>
                    <span className="text-xs md:text-sm leading-relaxed block">{item.problem}</span>
                  </div>
                  <div className="bg-[var(--input-bg)] p-4 rounded-xl border border-[var(--card-border)]">
                    <span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2 font-bold">
                      {t.solution}
                    </span>
                    <span className="text-xs md:text-sm leading-relaxed block">{item.solution}</span>
                  </div>
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

export const BlogView = () => {
  const { lang } = useStore(settings);
  const handleMouseMove = useMousePosition();
  const t = UI_TEXT[lang].blog;

  // SEO Meta Tags
  useEffect(() => {
    updateMetaTags({
      title: `${t.title} | bryanvrgsc`,
      description: t.subtitle
    });
  }, [lang]);

  return (
    <div className="max-w-5xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
      <div className="mb-8 md:mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{t.title}</h2>
        <p className="text-[var(--text-secondary)] text-base md:text-lg">{t.subtitle}</p>
      </div>
      <div className="space-y-6 md:space-y-8">
        {BLOG_POSTS[lang].map((post, i) => {
          const theme = getCategoryTheme(post.category);
          return (
            <article onMouseMove={handleMouseMove} key={i} className="bento-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 cursor-pointer group" style={theme.colors as React.CSSProperties}>
              <div className="h-20 w-20 md:h-28 md:w-28 rounded-3xl bg-[var(--input-bg)] flex-shrink-0 flex flex-col items-center justify-center border border-[var(--card-border)] group-hover:scale-105 transition-all duration-500 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]">
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

export const ContactView = () => {
  const { lang } = useStore(settings);
  const handleMouseMove = useMousePosition();
  const t = UI_TEXT[lang].contact;

  // SEO Meta Tags
  useEffect(() => {
    updateMetaTags({
      title: `${t.title} | bryanvrgsc`,
      description: t.subtitle
    });
  }, [lang]);

  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget: '', phone: '', countryIso2: 'ca', currency: 'USD' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ name: false, email: false, message: false, budget: false, phone: false, countryIso2: false, currency: false });

  useEffect(() => { setErrorMessage(''); setFieldErrors({ name: false, email: false, message: false, budget: false, phone: false, countryIso2: false, currency: false }); }, [lang]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = e.target.id as keyof typeof formData;
    let value = e.target.value;

    // Restrict phone and budget to numbers only
    if (field === 'phone' || field === 'budget') {
      value = value.replace(/[^0-9]/g, '');
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
    if (fieldErrors[field as keyof typeof fieldErrors]) setFieldErrors(prev => ({ ...prev, [field]: false }));
  };
  const validate = () => {
    const errors = { name: false, email: false, message: false, budget: false, phone: false, countryIso2: false, currency: false };
    let errorMsg = '';
    if (!formData.name.trim()) { errors.name = true; errorMsg = t.errors.name; }
    else if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { errors.email = true; errorMsg = t.errors.email; }
    else if (!formData.message.trim()) { errors.message = true; errorMsg = t.errors.message; }
    setFieldErrors(errors);
    return errorMsg || null;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); const error = validate(); if (error) { setErrorMessage(error); return; }
    setStatus('submitting'); setErrorMessage('');
    const country = countryCodes.find(c => c.iso2 === formData.countryIso2);
    const fullPhone = formData.phone ? `${country?.code || ''} ${formData.phone}` : '';
    const submissionData = { ...formData, phone: fullPhone, countryCode: country?.code || '', countryName: country?.name || '', budgetWithCurrency: formData.budget ? `${formData.currency} ${formData.budget}` : '' };
    try { const response = await fetch("https://formspree.io/f/xzzwknze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(submissionData) }); if (response.ok) setStatus('success'); else { setStatus('error'); setErrorMessage(t.errors.generic); } } catch (error) { setStatus('error'); setErrorMessage(t.errors.network); }
  };
  const handleReset = () => { setStatus('idle'); setFormData({ name: '', email: '', message: '', budget: '', phone: '', countryIso2: 'ca' }); };

  const getFlagEmoji = (iso2: string) => {
    return iso2.toUpperCase().replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
  };

  const countryCodes = allCountries.map((c) => ({
    code: `+${c.dialCode}`,
    label: `${getFlagEmoji(c.iso2)} +${c.dialCode}`,
    name: c.name.split(' (')[0], // Clean up name if it has local script
    iso2: c.iso2
  }));

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = countryCodes.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.includes(countrySearch) ||
    c.label.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const selectedCountry = countryCodes.find(c => c.iso2 === formData.countryIso2) || countryCodes[0];
  const socialLinks = [{ icon: Icons.LinkedIn, url: "https://www.linkedin.com/in/bryanvrgsc", label: "LinkedIn", color: "hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30" }, { icon: Icons.GitHub, url: "https://github.com/bryanvrgsc", label: "GitHub", color: "hover:text-[#333] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20" }, { icon: Icons.WhatsApp, url: "https://api.whatsapp.com/send?phone=12533687369", label: "WhatsApp", color: "hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/30" }, { icon: Icons.Instagram, url: "https://www.instagram.com/bryanvrgsc/", label: "Instagram", color: "hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30" }, { icon: Icons.Mail, url: "mailto:bryanvrgsc@gmail.com", label: "Email", color: "hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30" }];

  if (status === 'success') {
    return (
      <div className="max-w-3xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
        <div onMouseMove={handleMouseMove} className="bento-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
          <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(52,211,153,0.6)] relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
            <svg className="w-14 h-14 md:w-16 md:h-16 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">{t.successTitle}</h2><p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-md">{t.successMessage.replace('{name}', formData.name)}</p>
          <LiquidButton onClick={handleReset} className="px-8 py-4 md:px-8 md:py-4 text-base md:text-lg rounded-full" style={{ '--card-bg': 'rgba(16, 185, 129, 0.15)', '--card-border': 'rgba(16, 185, 129, 0.5)', '--glass-glow': 'rgba(16, 185, 129, 0.6)' } as React.CSSProperties}>{t.sendAnother}</LiquidButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
      <div className="flex flex-col-reverse md:flex-row gap-6 items-stretch">
        <div className="flex md:flex-col gap-3 justify-center md:justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {socialLinks.map((social, idx) => (<a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className={`p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] text-[var(--text-secondary)] transition-all duration-300 transform hover:scale-110 shadow-sm ${social.color} flex items-center justify-center`} aria-label={social.label}><social.icon className="w-5 h-5 md:w-6 md:h-6" /></a>))}
        </div>
        <div onMouseMove={handleMouseMove} className="bento-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-center relative overflow-hidden flex-grow">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-[2rem] mx-auto mb-6 md:mb-10 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center relative z-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"><Icons.Talk className="w-8 h-8 md:w-10 md:h-10 text-white" /></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 relative z-10 tracking-tight">{t.title}</h2><p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 md:mb-12 leading-relaxed relative z-10 max-w-xl mx-auto font-light">{t.subtitle}</p>
          <form className="space-y-4 md:space-y-5 text-left mb-8 md:mb-12 relative z-10 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="relative group"><input id="name" name="name" type="text" placeholder={t.placeholders.name} value={formData.name} onChange={handleChange} disabled={status === 'submitting'} autoComplete="name" className={`w-full bg-[var(--input-bg)] border rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none transition-all text-sm disabled:opacity-50 ${fieldErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-[var(--input-border)] focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] focus:ring-1 focus:ring-emerald-500/50'}`} /></div>
              <div className="relative group"><input id="email" name="email" type="email" placeholder={t.placeholders.email} value={formData.email} onChange={handleChange} disabled={status === 'submitting'} autoComplete="email" className={`w-full bg-[var(--input-bg)] border rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none transition-all text-sm disabled:opacity-50 ${fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-[var(--input-border)] focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] focus:ring-1 focus:ring-emerald-500/50'}`} /></div>
            </div>

            <div className="relative group flex gap-3">
              <div className="relative w-[140px]" ref={countryDropdownRef}>
                <button type="button" onClick={() => setIsCountryOpen(!isCountryOpen)} disabled={status === 'submitting'} className="w-full h-[62px] bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-3 text-[var(--text-primary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{getFlagEmoji(selectedCountry.iso2)}</span>
                    <span className="font-medium">{selectedCountry.code}</span>
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCountryOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[280px] max-h-[300px] overflow-y-auto bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 sticky top-0 bg-[var(--card-bg)] border-b border-[var(--card-border)] z-10">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-emerald-500/50"
                        autoFocus
                      />
                    </div>
                    <div className="p-1">
                      {filteredCountries.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, countryIso2: c.iso2 }));
                            setIsCountryOpen(false);
                            setCountrySearch('');
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-[var(--input-bg)] rounded-xl transition-colors flex items-center gap-3 text-sm text-[var(--text-primary)]"
                        >
                          <span className="text-lg">{c.label.split(' ')[0]}</span>
                          <span className="font-medium">{c.name}</span>
                          <span className="ml-auto text-[var(--text-tertiary)]">{c.code}</span>
                        </button>
                      ))}
                      {filteredCountries.length === 0 && (
                        <div className="p-4 text-center text-[var(--text-tertiary)] text-sm">No countries found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <input id="phone" name="tel" type="tel" inputMode="numeric" pattern="[0-9]*" placeholder={t.placeholders.phone} value={formData.phone} onChange={handleChange} disabled={status === 'submitting'} autoComplete="tel" className="flex-1 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50 h-[62px]" />
            </div>

            <div className="relative group"><textarea id="message" name="message" placeholder={t.placeholders.message} rows={4} value={formData.message} onChange={handleChange} disabled={status === 'submitting'} autoComplete="off" className={`w-full bg-[var(--input-bg)] border rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none transition-all resize-none text-sm disabled:opacity-50 ${fieldErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-[var(--input-border)] focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] focus:ring-1 focus:ring-emerald-500/50'}`}></textarea></div>

            <div className="relative group"><input id="budget" name="budget" type="text" inputMode="numeric" pattern="[0-9]*" placeholder={t.placeholders.budget} value={formData.budget} onChange={handleChange} disabled={status === 'submitting'} autoComplete="off" className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50 h-[62px]" /></div>
            {errorMessage && (<div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-xl border border-red-500/20 animate-pulse">{errorMessage}</div>)}
            <LiquidButton type="submit" className="w-full py-5 md:py-6 text-lg md:text-xl font-bold tracking-wide rounded-full" style={{ '--card-bg': 'rgba(16, 185, 129, 0.15)', '--card-hover-bg': 'rgba(16, 185, 129, 0.25)', '--card-border': 'rgba(16, 185, 129, 0.5)', '--glass-glow': 'rgba(16, 185, 129, 0.6)', '--highlight-color': 'rgba(16, 185, 129, 0.2)' } as React.CSSProperties}>{status === 'submitting' ? t.button.sending : t.button.default}</LiquidButton>
          </form>
          <p className="mt-6 md:mt-8 text-xs text-[var(--text-tertiary)] relative z-10 font-medium uppercase tracking-widest">{t.responseTime}</p>
        </div>
      </div>
    </div>
  );
};
