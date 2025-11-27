
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { settings, setLang, setTheme, applyTheme, type Language, type Theme } from '../store';
import { Icons } from './Icons';
import { GlassDock } from './GlassDock';
import { LiquidButton } from './LiquidButton';
import { UI_TEXT } from '../constants';

// Helper for SPA navigation (Hash Mode for GitHub Pages)
const navigateTo = (path: string) => {
  // Update hash which triggers the router in App.tsx
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- CANVAS BACKGROUND ---
export const CanvasBackground = () => {
  const { theme } = useStore(settings);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [noiseDataUrl, setNoiseDataUrl] = useState('');
  const [effectiveTheme, setEffectiveTheme] = useState<'light'|'dark'>('light');

  useEffect(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setEffectiveTheme(isDark ? 'dark' : 'light');
  }, [theme]);

  // Generate Static Noise
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        const idata = ctx.createImageData(128, 128);
        const buffer32 = new Uint32Array(idata.data.buffer);
        for (let i = 0; i < buffer32.length; i++) {
            if (Math.random() < 0.5) buffer32[i] = 0x08000000;
        }
        ctx.putImageData(idata, 0, 0);
        setNoiseDataUrl(canvas.toDataURL());
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let animationFrameId: number;
    
    const nodeCount = Math.min(Math.floor((w * h) / 30000), 30);
    const connectionDistance = Math.min(w, h) * 0.3;
    const signalSpeed = 0.015;

    class NetworkNode {
      x: number; y: number; vx: number; vy: number; r: number;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.r = Math.random() * 2 + 1.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw(color: string) {
        ctx!.beginPath(); ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.fillStyle = color; ctx!.fill();
      }
    }

    class DataPacket {
      start: NetworkNode; end: NetworkNode; progress: number = 0; isDead: boolean = false;
      constructor(n1: NetworkNode, n2: NetworkNode) { this.start = n1; this.end = n2; }
      update() { this.progress += signalSpeed; if (this.progress >= 1) this.isDead = true; }
      draw(color: string, glowColor: string) {
        const cx = this.start.x + (this.end.x - this.start.x) * this.progress;
        const cy = this.start.y + (this.end.y - this.start.y) * this.progress;
        ctx!.beginPath(); ctx!.arc(cx, cy, 4, 0, Math.PI * 2); ctx!.fillStyle = glowColor; ctx!.fill();
        ctx!.beginPath(); ctx!.arc(cx, cy, 2, 0, Math.PI * 2); ctx!.fillStyle = color; ctx!.fill();
      }
    }

    let nodes: NetworkNode[] = [];
    let packets: DataPacket[] = [];

    const init = () => {
      nodes = []; packets = [];
      for(let i=0; i<nodeCount; i++) nodes.push(new NetworkNode());
    };

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx!.scale(dpr, dpr);
      init();
    };

    const animate = () => {
      ctx!.clearRect(0, 0, w, h);
      const isDark = effectiveTheme === 'dark';
      const nodeColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.1)';
      const lineColor = isDark ? '255,255,255' : '15,23,42';
      const packetColor = isDark ? '#34d399' : '#059669';
      const packetGlow = isDark ? 'rgba(52, 211, 153, 0.3)' : 'rgba(5, 150, 105, 0.15)';

      nodes.forEach(n => { n.update(); n.draw(nodeColor); });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const n1 = nodes[i]; const n2 = nodes[j];
            const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (dist < connectionDistance) {
                ctx!.beginPath(); ctx!.moveTo(n1.x, n1.y); ctx!.lineTo(n2.x, n2.y);
                ctx!.strokeStyle = `rgba(${lineColor}, ${(1 - dist/connectionDistance) * 0.15})`;
                ctx!.lineWidth = 1; ctx!.stroke();
                if (Math.random() < 0.003) packets.push(new DataPacket(n1, n2));
            }
        }
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]; p.update();
        if (p.isDead) packets.splice(i, 1); else p.draw(packetColor, packetGlow);
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
  }, [effectiveTheme]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-100 pointer-events-none" style={{ mixBlendMode: 'normal' }} />
      <div className="bg-noise" style={{ backgroundImage: `url(${noiseDataUrl})` }} />
    </>
  );
};

// --- HEADER ---
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useStore(settings);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-2 md:pt-6 pointer-events-none">
      <a 
        href="#/"
        onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
        className={`pointer-events-auto cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full backdrop-blur-xl border border-[var(--card-border)]
          ${scrolled 
            ? 'w-auto px-6 h-[38px] md:h-[44px] bg-[var(--bg-primary)]/80 shadow-2xl' 
            : 'w-full max-w-[80rem] h-[64px] bg-transparent px-4 md:px-8 border-transparent'}`}
        aria-label="Go to Homepage"
      >
        <div className={`transition-all duration-700 flex items-center gap-2 ${scrolled ? 'scale-90' : 'scale-100'}`}>
           <div className="flex items-center gap-3 mr-3">
              <Icons.Windows className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <Icons.Apple className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-black drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]'}`} />
              <Icons.Linux className="w-4 h-4 md:w-5 md:h-5 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
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

// --- DOCK (NAVIGATION) ---
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
    <nav className="fixed left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none bottom-[calc(0.5rem+env(safe-area-inset-bottom))] md:bottom-[calc(2.5rem+env(safe-area-inset-bottom))]" aria-label="Main Navigation">
       <GlassDock>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.href}`}
                onClick={(e) => { e.preventDefault(); navigateTo(item.href); }}
                className={`dock-item group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.3,1)]
                  ${activeId === item.id 
                    ? 'text-[var(--text-primary)]' 
                    : 'text-[var(--dock-text)] hover:text-[var(--text-primary)] hover:scale-125'}`}
              >
                {activeId === item.id && (
                    <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)]"></div>
                )}
                 {activeId === item.id && (
                     <div className="absolute inset-0 bg-[var(--text-primary)] opacity-[0.03] rounded-full scale-110"></div>
                 )}
                <item.Icon className={`w-6 h-6 md:w-7 md:h-7 transition-all duration-300 ${activeId === item.id ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} />
                <span className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 px-3 py-1.5 rounded-xl bg-[var(--dock-bg)] backdrop-blur-xl border border-[var(--card-border)] text-[11px] font-semibold tracking-wide text-[var(--text-primary)] shadow-xl pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </span>
              </a>
            ))}

            <div className="w-[1px] h-6 bg-[var(--card-border)] mx-1 md:mx-2 opacity-50"></div>

            <LiquidButton 
              type="button"
              className={`rounded-full px-5 py-3 md:px-7 md:py-3.5 text-xs md:text-sm font-semibold transition-all duration-500
                ${activeId === 'contact' 
                  ? 'scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                  : 'hover:scale-105 opacity-90 hover:opacity-100'}`}
              style={{
                 '--card-bg': activeId === 'contact' ? 'var(--dock-item-bg-active)' : 'rgba(125,125,125,0.05)',
                 '--card-hover-bg': activeId === 'contact' ? '#f0fdf4' : 'var(--dock-item-bg)',
                 '--card-border': activeId === 'contact' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                 '--text-primary': activeId === 'contact' ? 'var(--button-text)' : 'var(--text-primary)',
                 '--glass-glow': 'rgba(16, 185, 129, 0.4)',
                 color: activeId === 'contact' ? '#064e3b' : undefined,
              } as React.CSSProperties}
              onClick={() => navigateTo('/contact')}
            >
              {t.contact}
            </LiquidButton>
       </GlassDock>
    </nav>
  );
};

// --- TOGGLES ---
export const ThemeToggle = () => {
  const { theme } = useStore(settings);

  const cycleTheme = () => {
    setTheme(theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system');
  };

  return (
    <button onClick={cycleTheme} className="fixed top-3 right-3 md:top-6 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg hover:scale-110 transition-transform duration-300 group">
      <div className="text-[var(--text-primary)] transition-colors">
        {theme === 'system' && <Icons.Monitor className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100" />}
        {theme === 'dark' && <Icons.Moon className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100" />}
        {theme === 'light' && <Icons.Sun className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100" />}
      </div>
    </button>
  );
};

export const LanguageToggle = () => {
  const { lang } = useStore(settings);
  return (
    <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="fixed top-16 right-3 md:top-6 md:right-24 z-50 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg hover:scale-110 transition-transform duration-300 group overflow-hidden">
      <div className="w-full h-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
        {lang === 'en' ? <Icons.FlagUS className="w-5 h-5 md:w-6 md:h-6 rounded-full" /> : <Icons.FlagMX className="w-5 h-5 md:w-6 md:h-6 rounded-full" />}
      </div>
    </button>
  );
};

// --- SCROLL TO TOP ---
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-5 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] shadow-[var(--button-shadow)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] group hover:bg-[var(--card-hover-bg)] hover:scale-110 hover:border-[var(--glass-glow)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-[calc(2rem+env(safe-area-inset-bottom))]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Icons.ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:-translate-y-0.5 transition-all duration-300" />
    </button>
  );
};
