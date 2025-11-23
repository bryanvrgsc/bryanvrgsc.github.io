
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './components/Icons';
import { LiquidButton } from './components/LiquidButton';
import { SERVICES, PORTFOLIO, BLOG_POSTS, ENGAGEMENT_MODELS } from './constants';

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
      className="fixed top-6 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-lg hover:scale-110 transition-transform duration-300 group"
      aria-label="Toggle Theme"
    >
      <div className="text-[var(--text-primary)] transition-colors">
        {theme === 'system' && <Icons.Monitor className="w-5 h-5 opacity-70 group-hover:opacity-100" />}
        {theme === 'dark' && <Icons.Moon className="w-5 h-5 opacity-70 group-hover:opacity-100" />}
        {theme === 'light' && <Icons.Sun className="w-5 h-5 opacity-70 group-hover:opacity-100" />}
      </div>
    </button>
  );
};

const Header = ({ setView }: { setView: (v: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 pointer-events-none">
      <button 
        onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView('home'); }}
        className={`pointer-events-auto cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full backdrop-blur-xl border border-[var(--card-border)]
          ${scrolled 
            ? 'w-[180px] h-[44px] bg-[var(--bg-primary)]/80 shadow-2xl' 
            : 'w-full max-w-[80rem] h-[64px] bg-transparent px-8 border-transparent'}`}
        aria-label="Go to Homepage"
      >
        <div className={`transition-all duration-700 flex items-center gap-2 ${scrolled ? 'scale-90' : 'scale-100'}`}>
          <div className="relative">
             <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
             <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            Tech<span className="text-[var(--text-secondary)]">Solutions</span>
          </span>
        </div>
      </button>
    </header>
  );
};

const Dock = ({ currentView, setView }: { currentView: string, setView: (v: string) => void }) => {
  const navItems = [
    { id: 'home', label: 'Home', Icon: Icons.Home },
    { id: 'services', label: 'Services', Icon: Icons.ServicesNav },
    { id: 'portfolio', label: 'Work', Icon: Icons.BriefcaseNav },
    { id: 'blog', label: 'Blog', Icon: Icons.BlogNav },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto px-6" aria-label="Main Navigation">
      <div className="flex items-center gap-3 p-2.5 rounded-[2.5rem] bg-[var(--dock-bg)] border border-[var(--card-border)] shadow-[var(--button-shadow)] ring-1 ring-[var(--card-border)] backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.02]">
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView(item.id); }}
            aria-current={currentView === item.id ? 'page' : undefined}
            aria-label={item.label}
            className={`dock-item relative group flex flex-col items-center justify-center w-12 h-12 rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
              ${currentView === item.id 
                ? 'bg-[var(--dock-item-bg-active)] text-[var(--button-text)] shadow-lg scale-110 z-10' 
                : 'text-[var(--dock-text)] hover:bg-[var(--dock-item-bg)] hover:text-[var(--text-primary)] hover:scale-110'}`}
          >
            <item.Icon className="w-[22px] h-[22px]" />
            <span className="dock-tooltip absolute -top-14 px-4 py-2 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-[11px] font-semibold tracking-wide border border-[var(--card-border)] shadow-xl whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}

        <div className="w-px h-8 bg-[var(--card-border)] mx-2" role="separator"></div>

        <LiquidButton 
          onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView('contact'); }}
          className={`rounded-[1.5rem] px-6 py-3 text-sm whitespace-nowrap font-semibold focus-visible:ring-2 focus-visible:ring-emerald-500
            ${currentView === 'contact' 
              ? 'bg-[var(--dock-item-bg-active)] shadow-md border-[var(--card-border)] scale-105' 
              : 'text-[var(--text-primary)] border-transparent hover:bg-[var(--dock-item-bg)]'}`}
        >
          Contact
        </LiquidButton>
      </div>
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
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] shadow-[var(--button-shadow)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] group hover:bg-[var(--card-hover-bg)] hover:scale-110 hover:border-[var(--glass-glow)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Icons.ArrowUp className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:-translate-y-0.5 transition-all duration-300" />
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
    const gridSize = 40; 
    
    // Get dynamic colors based on CSS variables or specific logic
    const getThemeColors = () => {
       const style = getComputedStyle(document.body);
       const c1 = style.getPropertyValue('--circuit-color-1').trim();
       const c2 = style.getPropertyValue('--circuit-color-2').trim();
       // Fallbacks if variables not set immediately
       return {
         c1: c1 || (theme === 'light' ? 'rgba(4, 120, 87, 0.8)' : 'rgba(52, 211, 153, 0.4)'),
         c2: c2 || (theme === 'light' ? 'rgba(8, 145, 178, 0.8)' : 'rgba(34, 211, 238, 0.4)')
       };
    };

    class CircuitNode {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      history: {x: number, y: number}[] = [];
      maxHistory: number = 0;
      speed: number = 1.5;
      color: string = '#34d399';
      width: number = 1;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
        this.vx = 0;
        this.vy = 0;
        this.history = [];
        this.maxHistory = Math.floor(Math.random() * 20) + 10;
        
        const colors = getThemeColors();
        this.color = Math.random() > 0.5 ? colors.c1 : colors.c2;
        this.width = Math.random() > 0.8 ? 2 : 1;
        
        const dir = Math.floor(Math.random() * 4);
        if(dir === 0) this.vy = -this.speed;
        if(dir === 1) this.vx = this.speed;
        if(dir === 2) this.vy = this.speed;
        if(dir === 3) this.vx = -this.speed;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        this.history.push({x: this.x, y: this.y});
        if(this.history.length > this.maxHistory) this.history.shift();
        
        if(this.x % gridSize === 0 && this.y % gridSize === 0) {
          if(Math.random() < 0.2) { 
            const turn = Math.random() > 0.5 ? 1 : -1;
            if(this.vx !== 0) {
              this.vy = this.vx * turn;
              this.vx = 0;
            } else {
              this.vx = this.vy * turn;
              this.vy = 0;
            }
          }
        }
        
        if(this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }

      draw() {
        if(this.history.length < 2) return;
        ctx!.beginPath();
        ctx!.moveTo(this.history[0].x, this.history[0].y);
        for(let i=1; i<this.history.length; i++) {
            ctx!.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx!.strokeStyle = this.color;
        ctx!.lineWidth = this.width;
        ctx!.lineCap = 'round';
        ctx!.stroke();
        
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = 0.8;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }

    let particles: CircuitNode[] = [];
    
    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((w * h) / 30000), 40); 
      for(let i=0; i<count; i++) particles.push(new CircuitNode());
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
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run effect when theme changes to update colors

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-1] opacity-90 dark:opacity-40 pointer-events-none mix-blend-normal dark:mix-blend-screen" />
      <div className="bg-noise" />
    </>
  );
};

// --- VIEWS ---

const HomeView = ({ setView }: { setView: (v: string) => void }) => (
  <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 w-full overflow-hidden animate-slide-up">
    <h1 className="text-6xl md:text-[7rem] font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-transparent drop-shadow-sm leading-[0.95]">
      Future <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400 filter drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">Architects.</span>
    </h1>
    
    <p className="max-w-xl mx-auto text-xl text-[var(--text-secondary)] mb-14 font-normal leading-relaxed tracking-wide">
      Engineering the next generation of digital experiences.
      <br/><span className="text-[var(--text-tertiary)] text-lg mt-2 block">iOS • Web • Intelligence</span>
    </p>
    
    <div className="flex flex-wrap gap-6 justify-center items-center">
      <LiquidButton onClick={() => setView('contact')} className="px-10 py-5 rounded-full text-lg min-w-[200px] bg-[var(--button-bg)] text-[var(--button-text)] shadow-[var(--button-shadow)] border border-[var(--card-border)]">
        Start Project
      </LiquidButton>
      
      <LiquidButton onClick={() => setView('portfolio')} className="px-10 py-5 rounded-full text-lg min-w-[200px] text-[var(--text-primary)] border-[var(--card-border)] hover:bg-[var(--card-hover-bg)] shadow-[var(--button-shadow)]">
        Explore Work
      </LiquidButton>
    </div>

    <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
      {[
        { val: "<50ms", label: "Latency" },
        { val: "99.9%", label: "Uptime" },
        { val: "A+", label: "Security" },
        { val: "24/7", label: "Global" },
      ].map((stat, i) => {
        const handleMouseMove = useMousePosition();
        return (
          <div onMouseMove={handleMouseMove} key={i} className="bento-card p-6 rounded-3xl flex flex-col items-center justify-center h-32 group">
            <span className="text-3xl font-mono font-bold text-[var(--text-primary)] tracking-tight mb-1 group-hover:scale-110 transition-transform duration-500 group-hover:text-emerald-500 group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">{stat.val}</span>
            <span className="text-[11px] text-[var(--text-secondary)] uppercase font-bold tracking-[0.2em] group-hover:text-[var(--text-primary)] transition-colors">{stat.label}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const ServicesView = () => {
  const handleMouseMove = useMousePosition();
  return (
    <div className="max-w-7xl mx-auto pt-12 px-6 animate-slide-up">
      <div className="flex items-end justify-between mb-16">
        <div>
          <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">Services</h2>
          <p className="text-[var(--text-secondary)] text-lg">High-performance engineering solutions.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((s, i) => {
          // @ts-ignore
          const Icon = Icons[s.iconName];
          return (
            <div onMouseMove={handleMouseMove} key={i} className="bento-card rounded-[2.5rem] p-10 flex flex-col h-full group">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[var(--glass-glow)] to-transparent flex items-center justify-center mb-10 border border-[var(--card-border)] text-[var(--text-primary)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg relative z-10">
                <Icon className="w-9 h-9 drop-shadow-sm" />
              </div>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-6 relative z-10 tracking-tight">{s.title}</h3>
              <div className="flex-grow space-y-5 relative z-10">
                {s.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div>
                    <span className="text-[15px] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-[var(--card-border)] relative z-10">
                <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-[0.2em] mb-4">Impact</p>
                <div className="space-y-3">
                  {s.valueProp.map((vp, vidx) => (
                    <div key={vidx} className="flex items-center gap-3 text-xs text-[var(--text-secondary)] bg-[var(--input-bg)] p-3 rounded-xl border border-[var(--card-border)] group-hover:bg-[var(--glass-glow)] transition-colors">
                      <span className="text-emerald-500"><Icons.CheckCircle className="w-4 h-4" /></span>
                      {vp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div onMouseMove={handleMouseMove} className="mt-12 p-10 bento-card rounded-[2.5rem]">
          <h3 className="text-2xl font-bold mb-8 tracking-tight text-[var(--text-primary)]">Engagement Models</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ENGAGEMENT_MODELS.map((m, i) => {
                 // @ts-ignore
                 const Icon = Icons[m.iconName];
                 return (
                  <div key={i} className="flex flex-col items-center justify-center p-8 bg-[var(--input-bg)] rounded-3xl border border-[var(--card-border)] hover:bg-[var(--glass-glow)] transition-all duration-300 group cursor-default hover:-translate-y-1">
                      <div className="mb-4 text-[var(--text-tertiary)] group-hover:text-emerald-500 group-hover:scale-110 transition-all"><Icon className="w-8 h-8"/></div>
                      <span className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">{m.label}</span>
                  </div>
                 );
              })}
          </div>
      </div>
    </div>
  );
};

const PortfolioView = () => {
  const handleMouseMove = useMousePosition();
  return (
    <div className="max-w-7xl mx-auto pt-12 px-6 animate-slide-up">
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">Portfolio</h2>
        <p className="text-[var(--text-secondary)] text-lg">Selected works and case studies.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PORTFOLIO.map((item, i) => (
          <div onMouseMove={handleMouseMove} key={i} className="bento-card rounded-[3rem] overflow-hidden group p-0 border-0">
            <div className="h-[400px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 opacity-90"></div>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"/>
              <div className="absolute top-8 right-8 z-20">
                  <span className="px-4 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] backdrop-blur-xl shadow-xl">
                    {item.tech.split(',')[0]}
                  </span>
              </div>
            </div>
            <div className="p-10 relative z-20 -mt-24">
              <h3 className="text-4xl font-bold text-[var(--text-primary)] mb-3 drop-shadow-lg tracking-tight">{item.title}</h3>
              <p className="text-emerald-500 font-semibold mb-8 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Icons.CheckCircle className="w-5 h-5" /> {item.result}
              </p>
              <div className="grid grid-cols-2 gap-6 text-sm text-[var(--text-secondary)]">
                <div className="bg-[var(--input-bg)] p-6 rounded-2xl border border-[var(--card-border)] hover:bg-[var(--glass-glow)] transition-colors">
                  <span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-3 font-bold">Challenge</span>
                  <span className="text-sm leading-relaxed block">{item.problem}</span>
                </div>
                <div className="bg-[var(--input-bg)] p-6 rounded-2xl border border-[var(--card-border)] hover:bg-[var(--glass-glow)] transition-colors">
                    <span className="block text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-3 font-bold">Solution</span>
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

const BlogView = () => {
  const handleMouseMove = useMousePosition();
  return (
    <div className="max-w-5xl mx-auto pt-12 px-6 animate-slide-up">
      <div className="mb-16 text-center">
        <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">Insights</h2>
        <p className="text-[var(--text-secondary)] text-lg">Strategic thinking and tech deep dives.</p>
      </div>
      <div className="space-y-8">
        {BLOG_POSTS.map((post, i) => (
          <article onMouseMove={handleMouseMove} key={i} className="bento-card p-10 rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-8 cursor-pointer group">
            <div className="h-28 w-28 rounded-3xl bg-[var(--input-bg)] flex-shrink-0 flex flex-col items-center justify-center border border-[var(--card-border)] group-hover:scale-105 transition-all duration-500 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]">
              <span className="text-3xl font-bold text-[var(--text-primary)] tracking-tighter">{post.date.split(' ')[1].replace(',','')}</span>
              <span className="text-[11px] uppercase text-[var(--text-secondary)] font-bold tracking-widest mt-1">{post.date.split(' ')[0]}</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-300 uppercase tracking-widest px-3 py-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/30">{post.category}</span>
              </div>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-cyan-500 transition-colors tracking-tight">{post.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base font-light">{post.excerpt}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[var(--input-bg)] text-[var(--text-primary)] flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all duration-300 transform group-hover:translate-x-2">
              <Icons.ArrowRight className="w-5 h-5" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const ContactView = () => {
  const handleMouseMove = useMousePosition();
  return (
    <div className="max-w-3xl mx-auto pt-12 px-6 animate-slide-up">
      <div onMouseMove={handleMouseMove} className="bento-card p-12 rounded-[3.5rem] text-center relative overflow-hidden">
        
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-[2rem] mx-auto mb-10 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center relative z-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Icons.Talk className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-5xl font-bold text-[var(--text-primary)] mb-6 relative z-10 tracking-tight">Let's talk business.</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-12 leading-relaxed relative z-10 max-w-xl mx-auto font-light">
          Schedule a strategic 30-minute call. <br/>
          We'll analyze your current architecture and growth opportunities.
        </p>

        <form className="space-y-5 text-left mb-12 relative z-10 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thank you. We will contact you shortly.'); }}>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative group">
              <input id="name" type="text" placeholder="Name" className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50" />
            </div>
            <div className="relative group">
              <input id="email" type="email" placeholder="Email" className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all text-sm focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>
          <div className="relative group">
              <textarea id="message" placeholder="Tell us about your project..." rows={4} className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-2xl px-5 py-5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-emerald-500/50 focus:bg-[var(--glass-glow)] transition-all resize-none text-sm focus:ring-1 focus:ring-emerald-500/50"></textarea>
          </div>
          
          <LiquidButton type="submit" className="w-full py-5 text-lg rounded-full bg-[var(--button-bg)] text-[var(--button-text)] hover:scale-[1.02] shadow-[var(--button-shadow)] border border-[var(--card-border)]">
            Schedule Call
          </LiquidButton>
        </form>
        
        <p className="mt-8 text-xs text-[var(--text-tertiary)] relative z-10 font-medium uppercase tracking-widest">Average response time: 2 hours.</p>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState('home');
  const [theme, setTheme] = useState<Theme>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');

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
      if (resolved === 'dark') {
        root.setAttribute('data-theme', 'dark');
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
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Header setView={setView} />
      
      <main className="pt-24 min-h-screen pb-40 flex flex-col">
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'services' && <ServicesView />}
        {view === 'portfolio' && <PortfolioView />}
        {view === 'blog' && <BlogView />}
        {view === 'contact' && <ContactView />}
      </main>
      
      <Dock currentView={view} setView={setView} />
      <ScrollToTop />
    </>
  );
}
