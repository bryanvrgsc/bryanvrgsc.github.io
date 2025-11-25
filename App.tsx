
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './components/Icons';
import { LiquidButton } from './components/LiquidButton';
import { GlassDock } from './components/GlassDock';
import { SERVICES, PORTFOLIO, BLOG_POSTS, ENGAGEMENT_MODELS, UI_TEXT, Language } from './constants';

// --- UTILS ---
const useMousePosition = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };
  return handleMouseMove;
};

// Helper for dynamic category theming
const getCategoryTheme = (term: string) => {
  const t = term.toLowerCase();
  
  // Automatización / App Development -> Emerald (Green)
  if (t.includes('auto') || t.includes('app') || t.includes('desarrollo')) {
    return {
      text: "text-emerald-700 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      bullet: "bg-emerald-600",
      gradientFrom: "from-emerald-600/20",
      // Liquid Glass Variables
      colors: {
        '--card-border': 'rgba(5, 150, 105, 0.3)',
        '--glass-glow': 'rgba(5, 150, 105, 0.5)',
        '--neon-glow': 'rgba(5, 150, 105, 0.4)',
      }
    };
  }
  
  // Business Intelligence -> Blue
  if (t.includes('business') || t.includes('bi') || t.includes('data')) {
    return {
      text: "text-blue-700 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      bullet: "bg-blue-600",
      gradientFrom: "from-blue-600/20",
      // Liquid Glass Variables
      colors: {
        '--card-border': 'rgba(37, 99, 235, 0.3)',
        '--glass-glow': 'rgba(37, 99, 235, 0.5)',
        '--neon-glow': 'rgba(37, 99, 235, 0.4)',
      }
    };
  }
  
  // Tecnología / Tech Consulting -> Violet (Purple)
  if (t.includes('tec') || t.includes('consult')) {
    return {
      text: "text-violet-700 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
      bullet: "bg-violet-600",
      gradientFrom: "from-violet-600/20",
      // Liquid Glass Variables
      colors: {
        '--card-border': 'rgba(124, 58, 237, 0.3)',
        '--glass-glow': 'rgba(124, 58, 237, 0.5)',
        '--neon-glow': 'rgba(124, 58, 237, 0.4)',
      }
    };
  }

  // Cloud & DevOps -> Cyan/Sky
  if (t.includes('cloud') || t.includes('nube') || t.includes('devops')) {
      return {
      text: "text-cyan-700 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      bullet: "bg-cyan-600",
      gradientFrom: "from-cyan-600/20",
      colors: {
        '--card-border': 'rgba(6, 182, 212, 0.3)',
        '--glass-glow': 'rgba(6, 182, 212, 0.5)',
        '--neon-glow': 'rgba(6, 182, 212, 0.4)',
      }
    };
  }

  // Networks / Redes -> Rose/Pink
  if (t.includes('network') || t.includes('red') || t.includes('connect') || t.includes('wifi')) {
      return {
      text: "text-rose-700 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      bullet: "bg-rose-600",
      gradientFrom: "from-rose-600/20",
      colors: {
        '--card-border': 'rgba(225, 29, 72, 0.3)',
        '--glass-glow': 'rgba(225, 29, 72, 0.5)',
        '--neon-glow': 'rgba(225, 29, 72, 0.4)',
      }
    };
  }

  // Default -> Slate
  return {
    text: "text-slate-700 dark:text-slate-400",
    bg: "bg-slate-50 dark:bg-slate-500/10",
    bullet: "bg-slate-600",
    gradientFrom: "from-slate-600/20",
    colors: {
      '--card-border': 'rgba(71, 85, 105, 0.25)',
      '--glass-glow': 'rgba(148, 163, 184, 0.4)',
      '--neon-glow': 'rgba(148, 163, 184, 0.3)',
    }
  };
};

// --- TYPEWRITER COMPONENTS ---

const Typewriter = ({ text, delay = 25, startDelay = 0, cursorColor = "bg-emerald-500", onComplete, active = true }: { text: string, delay?: number, startDelay?: number, cursorColor?: string, onComplete?: () => void, active?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (active) {
        setStarted(true);
    }
  }, [active]);

  useEffect(() => {
    if (!started) return;

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, delay);
      
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [started, text, delay, startDelay, onComplete]);

  return (
    <span className="relative block w-full break-words">
      {/* Ghost text for layout reservation (Prevents CLS) */}
      <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">
        {text}
        <span className="inline-block w-2 h-4 md:w-2.5 md:h-5 ml-0.5" />
      </span>
      
      {/* Actual Animated Text Overlay */}
      <span className="absolute inset-0 top-0 left-0">
        {displayedText}
        <span className={`animate-pulse inline-block w-2 h-4 md:w-2.5 md:h-5 ${cursorColor} align-text-bottom ml-0.5`} />
      </span>
    </span>
  );
};

// "Tech" Card Design (Futuristic HUD style)
const TechCard = ({ title, children, accentColor = "emerald", className = "" }: { title: string, children: React.ReactNode, accentColor?: "emerald" | "blue", className?: string }) => {
  // Styles based on accent color
  const styles = accentColor === 'emerald' 
    ? {
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/5",
        text: "text-emerald-600 dark:text-emerald-400",
        indicator: "bg-emerald-500",
        glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
      }
    : {
        border: "border-cyan-500/20",
        bg: "bg-cyan-500/5",
        text: "text-cyan-600 dark:text-cyan-400",
        indicator: "bg-cyan-500",
        glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
      };

  return (
    <div className={`relative overflow-hidden rounded-[20px] border ${styles.border} ${styles.bg} backdrop-blur-md p-6 md:p-8 flex flex-col h-full group transition-all duration-700 hover:border-opacity-60 ${styles.glow} ${className}`}>
       
       {/* Decorative Tech Corners */}
       <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 ${styles.border} rounded-tl-[18px] opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
       <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 ${styles.border} rounded-br-[18px] opacity-40 group-hover:opacity-100 transition-opacity duration-500`}></div>
       <div className="absolute top-4 right-4 flex gap-1 opacity-20 group-hover:opacity-50 transition-opacity">
          <div className={`w-1 h-1 rounded-full ${styles.indicator}`}></div>
          <div className={`w-1 h-1 rounded-full ${styles.indicator}`}></div>
          <div className={`w-1 h-1 rounded-full ${styles.indicator}`}></div>
       </div>

       {/* Header */}
       <div className="flex items-center gap-3 mb-5 opacity-90 relative z-10">
          <div className="relative">
             <div className={`w-2 h-2 rounded-sm ${styles.indicator} shadow-[0_0_10px_rgba(255,255,255,0.5)]`}></div>
             <div className={`absolute inset-0 w-2 h-2 rounded-sm ${styles.indicator} animate-ping opacity-30`}></div>
          </div>
          <span className={`text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase font-mono ${styles.text}`}>
            {title}
          </span>
          <div className={`h-[1px] flex-grow bg-gradient-to-r from-${accentColor === 'emerald' ? 'emerald' : 'cyan'}-500/30 to-transparent`}></div>
       </div>

       {/* Content Area */}
       <div className={`font-mono text-sm md:text-[15px] leading-relaxed ${styles.text} opacity-90 relative z-10 h-full flex flex-col justify-start`}>
         {children}
       </div>
       
       {/* Background Scanline/Grid Effect */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
       <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-tl from-${accentColor === 'emerald' ? 'emerald' : 'cyan'}-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-700`}></div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const cycleTheme = () => {
    setTheme(prev => {
      if (prev === 'system') return 'dark';
      if (prev === 'dark') return 'light';
      return 'system';
    });
  };

  return (
    <button
      onClick={cycleTheme}
      className="fixed top-3 right-3 md:top-6 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg hover:scale-110 transition-transform duration-300 group"
      aria-label="Toggle Theme"
    >
      <div className="text-[var(--text-primary)] transition-colors">
        {theme === 'system' && <Icons.Monitor className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100" />}
        {theme === 'dark' && <Icons.Moon className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100" />}
        {theme === 'light' && <Icons.Sun className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100" />}
      </div>
    </button>
  );
};

interface LanguageToggleProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, setLang }) => {
  const toggleLang = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLang}
      className="fixed top-16 right-3 md:top-6 md:right-24 z-50 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg hover:scale-110 transition-transform duration-300 group overflow-hidden"
      aria-label="Switch Language"
    >
      <div className="w-full h-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
        {lang === 'en' ? <Icons.FlagUS className="w-5 h-5 md:w-6 md:h-6 rounded-full" /> : <Icons.FlagMX className="w-5 h-5 md:w-6 md:h-6 rounded-full" />}
      </div>
    </button>
  );
};

const Header = ({ setView, theme }: { setView: (v: string) => void, theme: 'light' | 'dark' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-2 md:pt-6 pointer-events-none">
      <button 
        onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView('home'); }}
        className={`pointer-events-auto cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full backdrop-blur-xl border border-[var(--card-border)]
          ${scrolled 
            ? 'w-auto px-6 h-[38px] md:h-[44px] bg-[var(--bg-primary)]/80 shadow-2xl' 
            : 'w-full max-w-[80rem] h-[64px] bg-transparent px-4 md:px-8 border-transparent'}`}
        aria-label="Go to Homepage"
      >
        <div className={`transition-all duration-700 flex items-center gap-2 ${scrolled ? 'scale-90' : 'scale-100'}`}>
           {/* OS Icons with Gradient Simulation and Glow */}
           <div className="flex items-center gap-3 mr-3">
              <Icons.Windows className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              {/* Apple Icon */}
              <Icons.Apple className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                  : 'text-black drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]'
              }`} />
              <Icons.Linux className="w-4 h-4 md:w-5 md:h-5 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
           </div>

           {/* Terminal Text */}
           <span className="font-mono text-base md:text-lg font-bold tracking-tight text-[var(--text-primary)] flex items-center">
             <span className="text-[var(--text-tertiary)] mr-[1px]">@</span>
             bryan<span className="text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">vrgsc</span>
             <span className="text-[var(--text-secondary)]">~%</span>
             <span className="ml-2 w-2.5 h-4 md:w-3 md:h-5 bg-[var(--text-primary)] animate-cursor-blink block"></span>
           </span>
        </div>
      </button>
    </header>
  );
};

const Dock = ({ currentView, setView, lang }: { currentView: string, setView: (v: string) => void, lang: Language }) => {
  const t = UI_TEXT[lang].nav;
  const navItems = [
    { id: 'home', label: t.home, Icon: Icons.Home },
    { id: 'services', label: t.services, Icon: Icons.Layers }, 
    { id: 'portfolio', label: t.work, Icon: Icons.Briefcase },
    { id: 'blog', label: t.blog, Icon: Icons.Book },
  ];

  return (
    <nav className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none" aria-label="Main Navigation">
       <GlassDock>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView(item.id); }}
                className={`dock-item group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.3,1)]
                  ${currentView === item.id 
                    ? 'text-[var(--text-primary)]' 
                    : 'text-[var(--dock-text)] hover:text-[var(--text-primary)] hover:scale-125'}`}
              >
                {/* Active Indicator (Dot) */}
                {currentView === item.id && (
                    <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)]"></div>
                )}
                
                {/* Active Background Spotlight (Subtle) */}
                 {currentView === item.id && (
                     <div className="absolute inset-0 bg-[var(--text-primary)] opacity-[0.03] rounded-full scale-110"></div>
                 )}

                <item.Icon className={`w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${currentView === item.id ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                
                {/* Tooltip (iOS Style) */}
                <span className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 px-3 py-1.5 rounded-xl bg-[var(--dock-bg)] backdrop-blur-xl border border-[var(--card-border)] text-[11px] font-semibold tracking-wide text-[var(--text-primary)] shadow-xl pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </span>
              </button>
            ))}

            {/* Separator */}
            <div className="w-[1px] h-6 bg-[var(--card-border)] mx-1 md:mx-2 opacity-50"></div>

            {/* Contact Button */}
            <LiquidButton 
              onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView('contact'); }}
              className={`rounded-full px-5 py-3 md:px-7 md:py-3.5 text-xs md:text-sm font-semibold transition-all duration-500
                ${currentView === 'contact' 
                  ? 'scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                  : 'hover:scale-105 opacity-90 hover:opacity-100'}`}
              style={{
                 '--card-bg': currentView === 'contact' ? 'var(--dock-item-bg-active)' : 'rgba(125,125,125,0.05)',
                 '--card-hover-bg': currentView === 'contact' ? '#f0fdf4' : 'var(--dock-item-bg)',
                 '--card-border': currentView === 'contact' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                 '--text-primary': currentView === 'contact' ? 'var(--button-text)' : 'var(--text-primary)',
                 '--glass-glow': 'rgba(16, 185, 129, 0.4)',
                 color: currentView === 'contact' ? '#064e3b' : undefined,
              } as React.CSSProperties}
            >
              {t.contact}
            </LiquidButton>
       </GlassDock>
    </nav>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 md:bottom-8 right-5 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] shadow-[var(--button-shadow)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] group hover:bg-[var(--card-hover-bg)] hover:scale-110 hover:border-[var(--glass-glow)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Icons.ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:-translate-y-0.5 transition-all duration-300" />
    </button>
  );
};

const CanvasBackground = ({ theme }: { theme: 'light' | 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let animationFrameId: number;
    
    // Configuration for "Communication Network"
    const nodeCount = Math.min(Math.floor((w * h) / 20000), 50); 
    const connectionDistance = Math.min(w, h) * 0.3;
    const signalSpeed = 0.015;

    class NetworkNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Slower movement for a background
        this.vx = (Math.random() - 0.5) * 0.3; 
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 2 + 1.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      
      draw(color: string) {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.fill();
      }
    }

    class DataPacket {
      start: NetworkNode;
      end: NetworkNode;
      progress: number;
      isDead: boolean;

      constructor(n1: NetworkNode, n2: NetworkNode) {
        this.start = n1;
        this.end = n2;
        this.progress = 0;
        this.isDead = false;
      }

      update() {
        this.progress += signalSpeed;
        if (this.progress >= 1) this.isDead = true;
      }

      draw(color: string, glowColor: string) {
        const cx = this.start.x + (this.end.x - this.start.x) * this.progress;
        const cy = this.start.y + (this.end.y - this.start.y) * this.progress;
        
        // Glow
        ctx!.beginPath();
        ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx!.fillStyle = glowColor;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.fill();
      }
    }

    let nodes: NetworkNode[] = [];
    let packets: DataPacket[] = [];

    const init = () => {
      nodes = [];
      packets = [];
      for(let i=0; i<nodeCount; i++) nodes.push(new NetworkNode());
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      init();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      const isDark = theme === 'dark';
      // Colors adapted for communication theme
      const nodeColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.1)';
      const lineColor = isDark ? '255,255,255' : '15,23,42'; // base rgb for interpolation
      const packetColor = isDark ? '#34d399' : '#059669'; // Emerald
      const packetGlow = isDark ? 'rgba(52, 211, 153, 0.3)' : 'rgba(5, 150, 105, 0.15)';

      // Update Nodes
      nodes.forEach(n => {
        n.update();
        n.draw(nodeColor);
      });

      // Connections & Packets
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const n1 = nodes[i];
            const n2 = nodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < connectionDistance) {
                // Draw Line
                const alpha = 1 - (dist / connectionDistance);
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.strokeStyle = `rgba(${lineColor}, ${alpha * 0.15})`; // Low opacity lines
                ctx.lineWidth = 1;
                ctx.stroke();

                // Spawn Packet randomly
                if (Math.random() < 0.003) { // rare chance per frame per connection
                    packets.push(new DataPacket(n1, n2));
                }
            }
        }
      }

      // Update Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.update();
        if (p.isDead) {
            packets.splice(i, 1);
        } else {
            p.draw(packetColor, packetGlow);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-0 opacity-100 pointer-events-none transition-opacity duration-700"
        style={{ mixBlendMode: 'normal' }} 
      />
      <div className="bg-noise" />
    </>
  );
};

// --- VIEWS ---

const HomeView = ({ setView, lang }: { setView: (v: string) => void, lang: Language }) => {
  const t = UI_TEXT[lang];
  const [activeStep, setActiveStep] = useState(1);
  const handleMouseMove = useMousePosition();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Enable Scroll Snap for the whole page when in HomeView
  useEffect(() => {
    // Apply styles to both HTML and BODY to ensure compatibility across browsers
    // Using direct style manipulation for strongest effect
    document.documentElement.style.scrollSnapType = 'y mandatory';
    document.body.style.scrollSnapType = 'y mandatory';
    
    return () => {
      document.documentElement.style.scrollSnapType = '';
      document.body.style.scrollSnapType = '';
    };
  }, []);

  // Scroll Listener for Active Step (Spy)
  useEffect(() => {
    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sectionRefs.current.forEach((section, index) => {
            if (section) {
                const { offsetTop, offsetHeight } = section;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActiveStep(index + 1);
                }
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
    // Removed overflow-hidden to prevent conflicts with document-level scroll snap
    <div className="relative flex flex-col items-center w-full">
      
      {/* Left Side Navigation Steps */}
      <div className="fixed left-3 md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 md:gap-6 pointer-events-auto">
        {[
          { id: 1, label: "Overview" },
          { id: 2, label: t.mission.title },
          { id: 3, label: t.vision.title }
        ].map((step) => (
          <div key={step.id} className="group flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection(step.id)}>
             <div 
                className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full transition-all duration-500 ease-in-out border border-[var(--card-border)]
                ${activeStep === step.id 
                    ? 'bg-emerald-500 scale-125 shadow-[0_0_15px_rgba(16,185,129,0.6)] border-emerald-500' 
                    : 'bg-[var(--dock-item-bg)] hover:bg-[var(--text-tertiary)] group-hover:scale-110'}`}
             ></div>
             <span className={`hidden md:block text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-500 ${activeStep === step.id ? 'text-[var(--text-primary)] opacity-100 translate-x-0' : 'text-[var(--text-tertiary)] opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'}`}>
                {step.label}
             </span>
          </div>
        ))}
        {/* Vertical Line connecting steps */}
        <div className="absolute left-[4px] md:left-[6px] top-2 bottom-2 w-[1px] bg-[var(--card-border)] -z-10 opacity-30"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Step 1: Hero & Stats */}
        <section 
          ref={(el) => { sectionRefs.current[0] = el }} 
          className="min-h-screen md:h-screen w-full flex flex-col justify-center items-center py-12 md:py-20 snap-center snap-always relative"
        >
          <div className="flex flex-col items-center text-center animate-slide-up max-w-5xl mx-auto w-full">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-bold tracking-tighter mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-transparent drop-shadow-sm leading-[0.9]">
              {t.heroTitle.split(' ')[0]} <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 filter drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                {t.heroTitle.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <p className="max-w-xl md:max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-[var(--text-secondary)] mb-8 md:mb-12 font-normal leading-relaxed tracking-wide px-2">
              {t.heroSubtitle}
              <br/><span className="text-[var(--text-tertiary)] text-xs md:text-lg mt-2 block font-light">{t.heroTags}</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full px-4 mb-10 md:mb-16">
              <LiquidButton 
                onClick={() => setView('contact')} 
                className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-5 text-base md:text-lg min-w-[180px] md:min-w-[200px] rounded-full"
                style={{
                  '--card-bg': 'rgba(16, 185, 129, 0.15)',
                  '--card-border': 'rgba(16, 185, 129, 0.4)',
                  '--glass-glow': 'rgba(16, 185, 129, 0.6)'
                } as React.CSSProperties}
              >
                {t.startProject}
              </LiquidButton>
              
              <LiquidButton 
                onClick={() => setView('portfolio')} 
                className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-5 text-base md:text-lg min-w-[180px] md:min-w-[200px] rounded-full"
              >
                {t.exploreWork}
              </LiquidButton>
            </div>

            {/* Stats - Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-4xl mx-auto px-1">
              {[
                { val: "<50ms", label: t.stats.latency },
                { val: "99.9%", label: t.stats.uptime },
                { val: "A+", label: t.stats.security },
                { val: "24/7", label: t.stats.global },
              ].map((stat, i) => (
                <div onMouseMove={handleMouseMove} key={i} className="bento-card p-3 md:p-4 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center h-20 md:h-28 group">
                  <span className="text-lg md:text-3xl font-mono font-bold text-[var(--text-primary)] tracking-tight mb-1 group-hover:scale-110 transition-transform duration-500 group-hover:text-emerald-500 group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">{stat.val}</span>
                  <span className="text-[9px] md:text-[11px] text-[var(--text-secondary)] uppercase font-bold tracking-[0.2em] group-hover:text-[var(--text-primary)] transition-colors">{stat.label}</span>
                </div>
              ))}
            </div>
            
             <button 
                onClick={() => scrollToSection(2)}
                className="mt-8 md:mt-16 animate-bounce p-2 md:p-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors backdrop-blur-md shadow-sm"
                aria-label="Scroll Down"
              >
                <Icons.ArrowUp className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
             </button>
          </div>
        </section>

        {/* Step 2: Mission */}
        <section 
          ref={(el) => { sectionRefs.current[1] = el }} 
          className="min-h-screen md:h-screen w-full flex flex-col justify-center items-center py-12 md:py-20 snap-center snap-always"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center w-full max-w-6xl h-auto md:h-[500px]">
              <div className="order-2 md:order-1 h-full w-full">
                 <TechCard title={`/// ${t.mission.title.toUpperCase()}`} accentColor="emerald" className="h-full flex flex-col justify-center w-full">
                    <div className="flex flex-col h-full justify-center">
                       <div className="text-base md:text-lg lg:text-xl leading-relaxed">
                           <Typewriter 
                              text={t.mission.content} 
                              startDelay={200} 
                              cursorColor="bg-emerald-500" 
                              delay={15}
                              active={activeStep >= 2}
                            />
                       </div>
                    </div>
                 </TechCard>
              </div>
              <div className="order-1 md:order-2 h-[300px] md:h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-[var(--card-border)] relative group shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent z-10 mix-blend-multiply"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Mission Team" 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-110"
                 />
                 <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-20">
                    <div className="bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-100 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                       <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                       Collaboration
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Step 3: Vision */}
        <section 
          ref={(el) => { sectionRefs.current[2] = el }} 
          className="min-h-screen md:h-screen w-full flex flex-col justify-center items-center py-12 md:py-20 snap-center snap-always"
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center w-full max-w-6xl h-auto md:h-[500px]">
              <div className="order-1 h-[300px] md:h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-[var(--card-border)] relative group shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 via-transparent to-transparent z-10 mix-blend-multiply"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=2070&auto=format&fit=crop" 
                    alt="Future Vision" 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.3,1)] group-hover:scale-110"
                 />
                 <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20">
                    <div className="bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 text-cyan-100 text-[10px] md:text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                       <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                       Future
                    </div>
                 </div>
              </div>
              <div className="order-2 h-full w-full flex flex-col">
                 <TechCard title={`/// ${t.vision.title.toUpperCase()}`} accentColor="blue" className="h-full flex flex-col justify-center w-full">
                    <div className="flex flex-col h-full justify-center">
                       <div className="text-base md:text-lg lg:text-xl leading-relaxed">
                           <Typewriter 
                              text={t.vision.content} 
                              startDelay={200} 
                              cursorColor="bg-cyan-500" 
                              delay={15}
                              active={activeStep >= 3}
                           />
                       </div>
                    </div>
                 </TechCard>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

const ServicesView = ({ lang }: { lang: Language }) => {
  const handleMouseMove = useMousePosition();
  const t = UI_TEXT[lang].services;
  return (
    <div className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-40 md:pb-52 animate-slide-up">
      <div className="flex flex-col items-center text-center mb-8 md:mb-16 px-2 md:px-0">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{t.title}</h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg">{t.subtitle}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {SERVICES[lang].map((s, i) => {
          const Icon = Icons[s.iconName as keyof typeof Icons];
          const theme = getCategoryTheme(s.title);
          
          return (
            <div 
              onMouseMove={handleMouseMove} 
              key={i} 
              className="bento-card rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 flex flex-col items-start text-left h-full group w-full md:w-[calc(33.33%-1.5rem)] flex-grow-0"
              style={theme.colors as React.CSSProperties}
            >
              <div className={`h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-gradient-to-br ${theme.gradientFrom} to-transparent flex items-center justify-center mb-6 md:mb-10 border border-[var(--card-border)] ${theme.text} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg relative z-10`}>
                <Icon className="w-7 h-7 md:w-9 md:h-9 drop-shadow-sm" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 relative z-10 tracking-tight">{s.title}</h3>
              <div className="flex-grow space-y-3 md:space-y-5 relative z-10 w-full flex flex-col items-start">
                {s.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-start gap-3 md:gap-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors w-full">
                    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${theme.bullet} shadow-sm flex-shrink-0 mt-2`}></div>
                    <span className="text-sm md:text-[15px] font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-[var(--card-border)] relative z-10 w-full flex flex-col items-start">
                <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-4">{t.impact}</p>
                <div className="space-y-3 w-full flex flex-col items-start">
                  {s.valueProp.map((vp, vidx) => (
                    <div key={vidx} className="flex items-center justify-start gap-3 text-xs text-[var(--text-secondary)] bg-[var(--input-bg)] p-3 rounded-xl border border-[var(--card-border)] group-hover:bg-[var(--glass-glow)] transition-colors w-full max-w-[280px]">
                      <span className={theme.text}><Icons.CheckCircle className="w-4 h-4" /></span>
                      {vp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div onMouseMove={handleMouseMove} className="mt-8 md:mt-12 p-5 md:p-10 bento-card rounded-[2rem] md:rounded-[2.5rem]">
          <h3 className="text-2xl font-bold mb-6 md:mb-8 tracking-tight text-[var(--text-primary)] text-center">Engagement Models</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {ENGAGEMENT_MODELS[lang].map((m, i) => {
                 const Icon = Icons[m.iconName as keyof typeof Icons];
                 return (
                  <div key={i} className="flex flex-col items-center justify-center p-6 md:p-8 bg-[var(--input-bg)] rounded-3xl border border-[var(--card-border)] hover:bg-[var(--glass-glow)] transition-all duration-300 group cursor-default hover:-translate-y-1 text-center">
                      <div className="mb-4 text-[var(--text-tertiary)] group-hover:text-emerald-500 group-hover:scale-110 transition-all"><Icon className="w-6 h-6 md:w-8 md:h-8"/></div>
                      <span className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">{m.label}</span>
                  </div>
                 );
              })}
          </div>
      </div>
    </div>
  );
};

const PortfolioView = ({ lang }: { lang: Language }) => {
  const handleMouseMove = useMousePosition();
  const t = UI_TEXT[lang].portfolio;
  return (
    <div className="max-w-7xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
      <div className="mb-8 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">{t.title}</h2>
        <p className="text-[var(--text-secondary)] text-base md:text-lg">{t.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {PORTFOLIO[lang].map((item, i) => (
          <div onMouseMove={handleMouseMove} key={i} className="bento-card rounded-[2rem] md:rounded-[3rem] overflow-hidden group p-0 border-0">
            <div className="h-[250px] md:h-[400px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 opacity-90"></div>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"/>
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
                  <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] backdrop-blur-xl shadow-xl">
                    {item.tech.split(',')[0]}
                  </span>
              </div>
            </div>
            <div className="p-6 md:p-10 relative z-20 -mt-16 md:-mt-24">
              <h3 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 drop-shadow-lg tracking-tight">{item.title}</h3>
              <p className="text-emerald-500 font-semibold mb-6 md:mb-8 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
                <Icons.CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> {item.result}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-sm text-[var(--text-secondary)]">
                <div className="bg-[var(--input-bg)] p-4 md:p-6 rounded-2xl border border-[var(--card-border)] hover:bg-[var(--glass-glow)] transition-colors">
                  <span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2 md:mb-3 font-bold">{t.challenge}</span>
                  <span className="text-sm leading-relaxed block">{item.problem}</span>
                </div>
                <div className="bg-[var(--input-bg)] p-4 md:p-6 rounded-2xl border border-[var(--card-border)] hover:bg-[var(--glass-glow)] transition-colors">
                    <span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2 md:mb-3 font-bold">{t.solution}</span>
                  <span className="text-sm leading-relaxed block">{item.solution}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogView = ({ lang }: { lang: Language }) => {
  const handleMouseMove = useMousePosition();
  const t = UI_TEXT[lang].blog;
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
            <article 
              onMouseMove={handleMouseMove} 
              key={i} 
              className="bento-card p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 cursor-pointer group"
              style={theme.colors as React.CSSProperties}
            >
              <div className="h-20 w-20 md:h-28 md:w-28 rounded-3xl bg-[var(--input-bg)] flex-shrink-0 flex flex-col items-center justify-center border border-[var(--card-border)] group-hover:scale-105 transition-all duration-500 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]">
                <span className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tighter">{post.date.split(' ')[1].replace(',','')}</span>
                <span className="text-[10px] md:text-[11px] uppercase text-[var(--text-secondary)] font-bold tracking-widest mt-1">{post.date.split(' ')[0]}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${theme.text} ${theme.bg} border-current opacity-70`}>
                    {post.category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--text-primary)] transition-colors tracking-tight">{post.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base font-light">{post.excerpt}</p>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[var(--input-bg)] text-[var(--text-primary)] flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all duration-300 transform group-hover:translate-x-2 border border-[var(--card-border)]">
                <Icons.ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

const ContactView = ({ lang }: { lang: Language }) => {
  const handleMouseMove = useMousePosition();
  const t = UI_TEXT[lang].contact;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset form when language changes to prevent stuck error messages in wrong language
  useEffect(() => {
    setErrorMessage('');
  }, [lang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const validate = () => {
    if (!formData.name.trim()) return t.errors.name;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return t.errors.email;
    if (!formData.message.trim()) return t.errors.message;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch("https://formspree.io/f/xzzwknze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(t.errors.generic);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(t.errors.network);
    }
  };

  const handleReset = () => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Icons.LinkedIn, url: "https://www.linkedin.com/in/bryanvrgsc", label: "LinkedIn", color: "hover:text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30" },
    { icon: Icons.GitHub, url: "https://github.com/bryanvrgsc", label: "GitHub", color: "hover:text-[#333] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20" },
    { icon: Icons.WhatsApp, url: "https://api.whatsapp.com/send?phone=12533687369", label: "WhatsApp", color: "hover:text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/30" },
    { icon: Icons.Instagram, url: "https://www.instagram.com/bryanvrgsc/", label: "Instagram", color: "hover:text-[#E4405F] hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30" },
    { icon: Icons.Mail, url: "mailto:bryanvrgsc@gmail.com", label: "Email", color: "hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30" },
  ];

  if (status === 'success') {
      return (
        <div className="max-w-3xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
          <div onMouseMove={handleMouseMove} className="bento-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px]">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
            
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(52,211,153,0.5)] animate-pulse">
                <Icons.CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">{t.successTitle}</h2>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-md">
              {t.successMessage.replace('{name}', formData.name)}
            </p>
            
            <LiquidButton 
                onClick={handleReset}
                className="px-8 py-4 md:px-8 md:py-4 text-base md:text-lg rounded-full"
                 style={{
                   '--card-bg': 'rgba(16, 185, 129, 0.15)',
                   '--card-border': 'rgba(16, 185, 129, 0.5)',
                   '--glass-glow': 'rgba(16, 185, 129, 0.6)'
                } as React.CSSProperties}
            >
                {t.sendAnother}
            </LiquidButton>
          </div>
        </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto pt-24 md:pt-32 px-4 md:px-6 pb-32 md:pb-40 animate-slide-up">
      <div className="flex flex-col-reverse md:flex-row gap-6 items-stretch">
        
        {/* Social Sidebar */}
        <div className="flex md:flex-col gap-3 justify-center md:justify-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {socialLinks.map((social, idx) => (
            <a 
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 md:p-6 rounded-2xl md:rounded-3xl bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] text-[var(--text-secondary)] transition-all duration-300 transform hover:scale-110 shadow-sm ${social.color} flex items-center justify-center`}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          ))}
        </div>

        {/* Main Contact Form */}
        <div onMouseMove={handleMouseMove} className="bento-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] text-center relative overflow-hidden flex-grow">
          
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-[2rem] mx-auto mb-6 md:mb-10 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center relative z-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <Icons.Talk className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 md:mb-6 relative z-10 tracking-tight">{t.title}</h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 md:mb-12 leading-relaxed relative z-10 max-w-xl mx-auto font-light">
            {t.subtitle}
          </p>

          <form className="space-y-4 md:space-y-5 text-left mb-8 md:mb-12 relative z-10 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="relative group">
                <input 
                  id="name" 
                  type="text" 
                  placeholder={t.placeholders.name} 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50" 
                />
              </div>
              <div className="relative group">
                <input 
                  id="email" 
                  type="email" 
                  placeholder={t.placeholders.email} 
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50" 
                />
              </div>
            </div>
            <div className="relative group">
                <textarea 
                  id="message" 
                  placeholder={t.placeholders.message}
                  rows={4} 
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all resize-none text-sm focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50"
                ></textarea>
            </div>
            
            {errorMessage && (
              <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-xl border border-red-500/20 animate-pulse">
                {errorMessage}
              </div>
            )}
            
            <LiquidButton 
              type="submit" 
              className="w-full py-5 md:py-6 text-lg md:text-xl font-bold tracking-wide rounded-full"
              style={{
                 // Adapting material to "Emerald" (Growth/Success)
                 '--card-bg': 'rgba(16, 185, 129, 0.15)',
                 '--card-hover-bg': 'rgba(16, 185, 129, 0.25)',
                 '--card-border': 'rgba(16, 185, 129, 0.5)',
                 '--glass-glow': 'rgba(16, 185, 129, 0.6)',
                 '--highlight-color': 'rgba(16, 185, 129, 0.2)'
              } as React.CSSProperties}
            >
              {status === 'submitting' ? t.button.sending : t.button.default}
            </LiquidButton>
          </form>
          
          <p className="mt-6 md:mt-8 text-xs text-[var(--text-tertiary)] relative z-10 font-medium uppercase tracking-widest">{t.responseTime}</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState('home');
  const [theme, setTheme] = useState<Theme>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<Language>('es'); // Default to Spanish per content

  // Handle Theme Logic
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const resolveTheme = () => {
      if (theme === 'system') return mediaQuery.matches ? 'dark' : 'light';
      return theme;
    };

    const applyTheme = () => {
      const resolved = resolveTheme();
      setEffectiveTheme(resolved);

      root.removeAttribute('data-theme');
      root.classList.remove('dark');

      if (resolved === 'dark') {
        root.setAttribute('data-theme', 'dark');
        root.classList.add('dark');
      }
    };

    applyTheme();

    const handleSystemChange = () => {
      if (theme === 'system') applyTheme();
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  return (
    <>
      <CanvasBackground theme={effectiveTheme} />
      <LanguageToggle lang={lang} setLang={setLang} />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Header setView={setView} theme={effectiveTheme} />
      
      {/* Removed global padding from main to allow HomeView to handle full-screen snapping */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {view === 'home' && <HomeView setView={setView} lang={lang} />}
        {view === 'services' && <ServicesView lang={lang} />}
        {view === 'portfolio' && <PortfolioView lang={lang} />}
        {view === 'blog' && <BlogView lang={lang} />}
        {view === 'contact' && <ContactView lang={lang} />}
      </main>
      
      <Dock currentView={view} setView={setView} lang={lang} />
      <ScrollToTop />
    </>
  );
}
