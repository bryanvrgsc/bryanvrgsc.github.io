import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './components/Icons';
import { LiquidButton } from './components/LiquidButton';
import { SERVICES, PORTFOLIO, BLOG_POSTS, ENGAGEMENT_MODELS } from './constants';

// --- UTILS ---
// Hook to track mouse position relative to an element for spotlight effects
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

const Header = ({ setView }: { setView: (v: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
      <button 
        onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView('home'); }}
        className={`pointer-events-auto cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full backdrop-blur-xl border border-white/10
          ${scrolled 
            ? 'w-[180px] h-[44px] bg-black/80 shadow-2xl' 
            : 'w-full max-w-[80rem] h-[64px] bg-transparent px-8 border-transparent'}`}
        aria-label="Go to Homepage"
      >
        <div className={`transition-all duration-700 flex items-center gap-2 ${scrolled ? 'scale-90' : 'scale-100'}`}>
          <div className="relative">
             <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
             <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Tech<span className="text-white/40">Solutions</span>
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
      <div className="flex items-center gap-3 p-2.5 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5 backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.02]">
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView(item.id); }}
            aria-current={currentView === item.id ? 'page' : undefined}
            aria-label={item.label}
            className={`dock-item relative group flex flex-col items-center justify-center w-12 h-12 rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
              ${currentView === item.id 
                ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-110 z-10' 
                : 'text-slate-400 hover:bg-white/10 hover:text-white hover:scale-110'}`}
          >
            <item.Icon className="w-[22px] h-[22px]" />
            <span className="dock-tooltip absolute -top-14 px-4 py-2 rounded-xl bg-black/80 text-white text-[11px] font-semibold tracking-wide border border-white/10 shadow-xl whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}

        <div className="w-px h-8 bg-white/10 mx-2" role="separator"></div>

        <LiquidButton 
          onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); setView('contact'); }}
          className={`rounded-[1.5rem] px-6 py-3 text-sm whitespace-nowrap font-semibold focus-visible:ring-2 focus-visible:ring-emerald-500
            ${currentView === 'contact' 
              ? 'bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)] border-white/30 scale-105' 
              : 'text-white border-transparent hover:bg-white/10'}`}
        >
          Contact
        </LiquidButton>
      </div>
    </nav>
  );
};

const CanvasBackground = () => {
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
    const gridSize = 40; // Larger grid for cleaner look
    
    class CircuitNode {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      history: {x: number, y: number}[] = [];
      maxHistory: number = 0;
      speed: number = 1.5; // Slower speed for elegance
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
        this.color = Math.random() > 0.5 ? 'rgba(52, 211, 153, 0.3)' : 'rgba(34, 211, 238, 0.3)';
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
        
        // Leading dot
        ctx!.fillStyle = '#fff';
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
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-1] opacity-40 pointer-events-none" />
      <div className="bg-noise" />
    </>
  );
};

// --- VIEWS ---

const HomeView = ({ setView }: { setView: (v: string) => void }) => (
  <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 w-full overflow-hidden animate-slide-up">
    <h1 className="text-6xl md:text-[7rem] font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 drop-shadow-sm leading-[0.95]">
      Future <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 filter drop-shadow-[0_0_30px_rgba(52,211,153,0.2)]">Architects.</span>
    </h1>
    
    <p className="max-w-xl mx-auto text-xl text-slate-400 mb-14 font-normal leading-relaxed tracking-wide mix-blend-plus-lighter">
      Engineering the next generation of digital experiences.
      <br/><span className="text-slate-500 text-lg mt-2 block">iOS • Web • Intelligence</span>
    </p>
    
    <div className="flex flex-wrap gap-6 justify-center items-center">
      <LiquidButton onClick={() => setView('contact')} className="px-10 py-5 rounded-full text-lg min-w-[200px] bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.15)]">
        Start Project
      </LiquidButton>
      
      <LiquidButton onClick={() => setView('portfolio')} className="px-10 py-5 rounded-full text-lg min-w-[200px] text-white border-white/10 hover:bg-white/5">
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
            <span className="text-3xl font-mono font-bold text-white tracking-tight mb-1 group-hover:scale-110 transition-transform duration-500 group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">{stat.val}</span>
            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-[0.2em] group-hover:text-slate-300 transition-colors">{stat.label}</span>
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
          <h2 className="text-5xl font-bold text-white mb-3 tracking-tight">Services</h2>
          <p className="text-slate-400 text-lg">High-performance engineering solutions.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((s, i) => {
          // @ts-ignore
          const Icon = Icons[s.iconName];
          return (
            <div onMouseMove={handleMouseMove} key={i} className="bento-card rounded-[2.5rem] p-10 flex flex-col h-full group">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center mb-10 border border-white/5 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative z-10">
                <Icon className="w-9 h-9 drop-shadow-lg" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10 tracking-tight">{s.title}</h3>
              <div className="flex-grow space-y-5 relative z-10">
                {s.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-slate-300 group-hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]"></div>
                    <span className="text-[15px] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/5 relative z-10">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Impact</p>
                <div className="space-y-3">
                  {s.valueProp.map((vp, vidx) => (
                    <div key={vidx} className="flex items-center gap-3 text-xs text-slate-400 bg-white/5 p-3 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                      <span className="text-emerald-400"><Icons.CheckCircle className="w-4 h-4" /></span>
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
          <h3 className="text-2xl font-bold mb-8 tracking-tight">Engagement Models</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ENGAGEMENT_MODELS.map((m, i) => {
                 // @ts-ignore
                 const Icon = Icons[m.iconName];
                 return (
                  <div key={i} className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all duration-300 group cursor-default hover:-translate-y-1">
                      <div className="mb-4 text-white/60 group-hover:text-emerald-300 group-hover:scale-110 transition-all"><Icon className="w-8 h-8"/></div>
                      <span className="text-sm font-semibold text-slate-200 tracking-wide">{m.label}</span>
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
        <h2 className="text-5xl font-bold text-white mb-3 tracking-tight">Portfolio</h2>
        <p className="text-slate-400 text-lg">Selected works and case studies.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {PORTFOLIO.map((item, i) => (
          <div onMouseMove={handleMouseMove} key={i} className="bento-card rounded-[3rem] overflow-hidden group p-0 border-0">
            <div className="h-[400px] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-90"></div>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"/>
              <div className="absolute top-8 right-8 z-20">
                  <span className="px-4 py-2 rounded-full bg-black/50 border border-white/10 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-xl shadow-xl">
                    {item.tech.split(',')[0]}
                  </span>
              </div>
            </div>
            <div className="p-10 relative z-20 -mt-24">
              <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg tracking-tight">{item.title}</h3>
              <p className="text-emerald-400 font-semibold mb-8 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Icons.CheckCircle className="w-5 h-5" /> {item.result}
              </p>
              <div className="grid grid-cols-2 gap-6 text-sm text-slate-400">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-3 font-bold">Challenge</span>
                  <span className="text-sm leading-relaxed block">{item.problem}</span>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-3 font-bold">Solution</span>
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
        <h2 className="text-5xl font-bold text-white mb-3 tracking-tight">Insights</h2>
        <p className="text-slate-400 text-lg">Strategic thinking and tech deep dives.</p>
      </div>
      <div className="space-y-8">
        {BLOG_POSTS.map((post, i) => (
          <article onMouseMove={handleMouseMove} key={i} className="bento-card p-10 rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-8 cursor-pointer group">
            <div className="h-28 w-28 rounded-3xl bg-white/5 flex-shrink-0 flex flex-col items-center justify-center border border-white/5 group-hover:scale-105 transition-all duration-500 group-hover:border-emerald-500/30 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]">
              <span className="text-3xl font-bold text-white tracking-tighter">{post.date.split(' ')[1].replace(',','')}</span>
              <span className="text-[11px] uppercase text-slate-500 font-bold tracking-widest mt-1">{post.date.split(' ')[0]}</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest px-3 py-1.5 rounded-lg bg-cyan-950/30 border border-cyan-900/30">{post.category}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors tracking-tight">{post.title}</h3>
              <p className="text-slate-400 leading-relaxed text-base font-light">{post.excerpt}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/5 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 transform group-hover:translate-x-2">
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
        
        <h2 className="text-5xl font-bold text-white mb-6 relative z-10 tracking-tight">Let's talk business.</h2>
        <p className="text-xl text-slate-400 mb-12 leading-relaxed relative z-10 max-w-xl mx-auto font-light">
          Schedule a strategic 30-minute call. <br/>
          We'll analyze your current architecture and growth opportunities.
        </p>

        <form className="space-y-5 text-left mb-12 relative z-10 max-w-lg mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thank you. We will contact you shortly.'); }}>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative group">
              <input id="name" type="text" placeholder="Name" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all text-sm focus:ring-1 focus:ring-emerald-500/50" />
            </div>
            <div className="relative group">
              <input id="email" type="email" placeholder="Email" className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all text-sm focus:ring-1 focus:ring-emerald-500/50" />
            </div>
          </div>
          <div className="relative group">
              <textarea id="message" placeholder="Tell us about your project..." rows={4} className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-black/40 transition-all resize-none text-sm focus:ring-1 focus:ring-emerald-500/50"></textarea>
          </div>
          
          <LiquidButton type="submit" className="w-full py-5 text-lg rounded-2xl bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Schedule Call
          </LiquidButton>
        </form>
        
        <p className="mt-8 text-xs text-slate-600 relative z-10 font-medium uppercase tracking-widest">Average response time: 2 hours.</p>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState('home');

  return (
    <>
      <CanvasBackground />
      
      <Header setView={setView} />
      
      <main className="pt-24 min-h-screen pb-40 flex flex-col">
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'services' && <ServicesView />}
        {view === 'portfolio' && <PortfolioView />}
        {view === 'blog' && <BlogView />}
        {view === 'contact' && <ContactView />}
      </main>
      
      <Dock currentView={view} setView={setView} />
    </>
  );
}