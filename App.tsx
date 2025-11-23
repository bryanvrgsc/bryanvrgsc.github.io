import React, { useState, useEffect, useRef } from 'react';
import LiquidButton from './components/LiquidButton';
import { SERVICES, PORTFOLIO, BLOG_POSTS } from './constants';
import { 
  CodeIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  CalendarIcon,
  BriefcaseIcon,
  LayersIcon,
  RocketIcon,
  SmartphoneIcon,
  ChartBarIcon,
  ShieldCheckIcon
} from './components/Icons';

// --- TECH BACKGROUND ANIMATION (CIRCUIT BOARD) ---
const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Circuit Config
    const GRID_SIZE = 30; // Size of the grid cells
    const TRAIL_LENGTH = 20; // How long before a "head" dies
    const MAX_ACTIVE_PATHS = 40;
    const COLORS = ['#10b981', '#06b6d4', '#3b82f6']; // Emerald, Cyan, Blue

    interface Path {
      x: number; // Grid coordinates
      y: number;
      dx: number;
      dy: number;
      life: number;
      color: string;
      width: number;
    }

    let paths: Path[] = [];

    // Helper to snap to grid
    const snap = (val: number) => Math.floor(val / GRID_SIZE) * GRID_SIZE;

    // Create a new path signal
    const spawnPath = (x?: number, y?: number) => {
      const startX = x !== undefined ? snap(x) : snap(Math.random() * width);
      const startY = y !== undefined ? snap(y) : snap(Math.random() * height);
      
      // Random direction: 0=up, 1=right, 2=down, 3=left
      const dir = Math.floor(Math.random() * 4);
      let dx = 0, dy = 0;
      if (dir === 0) dy = -1;
      else if (dir === 1) dx = 1;
      else if (dir === 2) dy = 1;
      else dx = -1;

      paths.push({
        x: startX,
        y: startY,
        dx,
        dy,
        life: Math.random() * 50 + 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: Math.random() > 0.9 ? 2 : 1 // Occasional thick line
      });
    };

    // Initial population
    for(let i=0; i<10; i++) spawnPath();

    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx) return;

      // Fading trails effect: Draw a semi-transparent black rectangle over everything
      ctx.fillStyle = 'rgba(5, 5, 10, 0.1)'; 
      ctx.fillRect(0, 0, width, height);
      
      // Maintain population
      if (paths.length < MAX_ACTIVE_PATHS) {
        if (Math.random() > 0.9) spawnPath();
      }

      // Update and Draw Paths
      for (let i = paths.length - 1; i >= 0; i--) {
        const p = paths[i];
        
        // Move
        const prevX = p.x;
        const prevY = p.y;
        
        // Speed multiplier (move GRID_SIZE pixels per few frames? No, lets move smoothly or in steps)
        // For "Circuit" look, instant steps look techy, but smooth is nicer.
        // Let's do steps per frame for speed.
        const speed = GRID_SIZE / 5; // Pixels per frame
        
        // We will simulate "grid movement" by just updating coordinates.
        // But to make it look like a drawing line, let's just move in grid increments.
        // Actually, let's just draw the line segment for this frame.
        
        // Simplified Logic: The head moves 1 Grid Unit every X frames.
        // To keep it smooth, let's just move pixels.
        
        p.x += p.dx * 3; // Move 3 pixels per frame
        p.y += p.dy * 3;

        // Change Direction logic
        // Only allow turning when we hit a grid intersection roughly
        if (Math.abs(p.x % GRID_SIZE) < 3 && Math.abs(p.y % GRID_SIZE) < 3) {
           if (Math.random() > 0.8) {
             // Turn 90 degrees
             if (p.dx !== 0) {
               p.dx = 0;
               p.dy = Math.random() > 0.5 ? 1 : -1;
             } else {
               p.dy = 0;
               p.dx = Math.random() > 0.5 ? 1 : -1;
             }
             
             // Snap to ensure we stay on grid lines
             p.x = Math.round(p.x / GRID_SIZE) * GRID_SIZE;
             p.y = Math.round(p.y / GRID_SIZE) * GRID_SIZE;
           }
        }

        // Draw
        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.width;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset for performance

        // Draw "Head" dot occasionally
        if (Math.random() > 0.95) {
           ctx.fillStyle = '#ffffff';
           ctx.fillRect(p.x - 1, p.y - 1, 3, 3);
        }

        // Bounds check & Life
        p.life--;
        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          paths.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none"
    />
  );
};

// --- VIEW COMPONENTS ---

const HomeView = ({ setView }: { setView: (v: string) => void }) => (
  <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 animate-slide-up w-full overflow-hidden">
    
    {/* Tech Background is exclusively here */}
    <TechBackground />

    {/* Content Wrapper (z-10 to sit above canvas) */}
    <div className="relative z-10 flex flex-col items-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-8 shadow-2xl hover:bg-black/60 transition-colors cursor-default">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-semibold text-emerald-100/90 tracking-wide uppercase">System Operational</span>
      </div>

      <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 drop-shadow-sm leading-[1.1]">
        Future <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">Architects.</span>
      </h1>
      
      <p className="max-w-xl mx-auto text-xl text-slate-300 mb-12 font-light leading-relaxed tracking-wide">
        Engineering the next generation of digital experiences.
        <br/><span className="text-slate-500">iOS • Web • Intelligence</span>
      </p>
      
      <div className="flex flex-wrap gap-6 justify-center">
        <LiquidButton 
          variant="primary" 
          className="px-8 py-4 rounded-full text-lg w-48"
          onClick={() => setView('contact')}
        >
          Start Project
        </LiquidButton>
        <LiquidButton 
          variant="secondary" 
          className="px-8 py-4 rounded-full text-lg w-48"
          onClick={() => setView('portfolio')}
        >
          Explore
        </LiquidButton>
      </div>

      {/* Quick Stats Bento */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl opacity-80 hover:opacity-100 transition-opacity duration-500">
        {[
          { label: 'Latency', val: '<50ms' },
          { label: 'Uptime', val: '99.9%' },
          { label: 'Security', val: 'A+' },
          { label: 'Global', val: '24/7' },
        ].map((stat, i) => (
          <div key={i} className="bento-card p-4 rounded-2xl flex flex-col items-center justify-center h-24 border-white/5 bg-black/40">
            <span className="text-xl font-mono font-bold text-emerald-300">{stat.val}</span>
            <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ServicesView = () => (
  <div className="max-w-6xl mx-auto pt-10 pb-32 px-4 animate-slide-up">
    <div className="flex items-end justify-between mb-12">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Services</h2>
        <p className="text-slate-400">High-performance engineering solutions.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SERVICES.map((service, index) => (
        <div key={index} className="bento-card rounded-[2rem] p-8 flex flex-col h-full group">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-8 border border-white/10 text-white group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <service.icon size={32} strokeWidth={1.5} />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
          
          <div className="flex-grow space-y-4">
            {service.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-1.5 h-1.5 bg-emerald-400/60 rounded-full" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4">Impact</p>
            <div className="space-y-2">
              {service.valueProp.map((prop, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 p-2 rounded-lg border border-white/5">
                  <CheckCircleIcon size={14} className="text-emerald-400" />
                  {prop}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-12 p-8 bento-card rounded-[2rem]">
       <h3 className="text-xl font-bold mb-6">Engagement Models</h3>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
            { icon: LayersIcon, label: "Full Project" },
            { icon: CodeIcon, label: "Hourly" },
            { icon: BriefcaseIcon, label: "Monthly Retainer" },
            { icon: RocketIcon, label: "Consulting" }
         ].map((m, i) => (
           <div key={i} className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <m.icon className="mb-3 text-white/70" />
              <span className="text-sm font-medium text-slate-200">{m.label}</span>
           </div>
         ))}
       </div>
    </div>
  </div>
);

const PortfolioView = () => (
  <div className="max-w-6xl mx-auto pt-10 pb-32 px-4 animate-slide-up">
    <div className="mb-12">
      <h2 className="text-4xl font-bold text-white mb-2">Portfolio</h2>
      <p className="text-slate-400">Selected works and case studies.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {PORTFOLIO.map((item, index) => (
        <div key={index} className="bento-card rounded-[2.5rem] overflow-hidden group border-0 ring-1 ring-white/10">
          <div className="h-72 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80" />
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute top-6 right-6 z-20">
               <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                 {item.tech.split(',')[0]}
               </span>
            </div>
          </div>
          
          <div className="p-8 relative z-20 -mt-12">
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">{item.title}</h3>
            <p className="text-emerald-400 font-medium mb-6 flex items-center gap-2">
              <CheckCircleIcon size={16} /> {item.result}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <span className="block text-[10px] uppercase tracking-wider text-white/30 mb-2">Challenge</span>
                <span className="text-xs leading-relaxed">{item.problem}</span>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                 <span className="block text-[10px] uppercase tracking-wider text-white/30 mb-2">Solution</span>
                <span className="text-xs leading-relaxed">{item.solution}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BlogView = () => (
  <div className="max-w-4xl mx-auto pt-10 pb-32 px-4 animate-slide-up">
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-bold text-white mb-2">Insights</h2>
      <p className="text-slate-400">Strategic thinking and tech deep dives.</p>
    </div>

    <div className="space-y-6">
      {BLOG_POSTS.map((post, i) => (
        <article key={i} className="bento-card p-8 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center gap-6 cursor-pointer group hover:bg-white/10 hover:border-white/20">
          <div className="h-24 w-24 rounded-2xl bg-white/5 flex-shrink-0 flex flex-col items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-white font-mono">{post.date.split(' ')[1].replace(',','')}</span>
            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">{post.date.split(' ')[0]}</span>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest px-2 py-1 rounded bg-blue-500/10">{post.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{post.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{post.excerpt}</p>
          </div>

          <div className="h-10 w-10 rounded-full bg-white/5 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ArrowRightIcon size={18} />
          </div>
        </article>
      ))}
    </div>
  </div>
);

const ContactView = () => (
  <div className="max-w-2xl mx-auto pt-10 pb-32 px-4 animate-slide-up">
    <div className="bento-card p-10 rounded-[3rem] text-center border-white/10 shadow-2xl relative overflow-hidden">
      {/* Subtle shine background for contact card */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-3xl mx-auto mb-8 shadow-lg shadow-emerald-900/50 flex items-center justify-center relative z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
         <CalendarIcon className="text-white w-10 h-10" />
      </div>
      
      <h2 className="text-4xl font-bold text-white mb-4 relative z-10">Let's talk business.</h2>
      <p className="text-lg text-slate-400 mb-10 leading-relaxed relative z-10">
        Schedule a strategic 30-minute call. <br/>
        We'll analyze your current architecture and growth opportunities.
      </p>

      <form className="space-y-4 text-left mb-10 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all text-sm" />
          <input type="email" placeholder="Email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all text-sm" />
        </div>
        <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all resize-none text-sm"></textarea>
      </form>

      <LiquidButton variant="primary" className="w-full py-4 text-lg rounded-2xl relative z-10">
        Schedule Call
      </LiquidButton>
      
      <p className="mt-6 text-xs text-slate-600 relative z-10">Average response time: 2 hours.</p>
    </div>
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [activeView, setActiveView] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for top bar transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen relative pb-24 font-sans selection:bg-emerald-500/30">
      
      {/* Background Noise Texture */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[-1]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Dynamic Header (Island Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
        <div 
          onClick={() => setActiveView('home')}
          className={`
            pointer-events-auto cursor-pointer
            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            flex items-center justify-center
            ${isScrolled 
              ? 'w-[180px] h-[40px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl' 
              : 'w-full max-w-7xl h-[60px] bg-transparent px-8'
            }
          `}
        >
          <div className={`transition-all duration-500 flex items-center gap-2 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
             <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
             <span className="text-lg font-bold tracking-tight text-white">
                Tech<span className="text-white/40">Solutions</span>
             </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 min-h-screen">
        {activeView === 'home' && <HomeView setView={setActiveView} />}
        {activeView === 'services' && <ServicesView />}
        {activeView === 'portfolio' && <PortfolioView />}
        {activeView === 'blog' && <BlogView />}
        {activeView === 'contact' && <ContactView />}
      </main>

      {/* Floating Glass Dock Navigation (macOS Style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto px-6">
        <div className="flex items-center gap-3 p-2.5 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5 transition-all hover:scale-[1.02] hover:bg-white/10 hover:border-white/20">
          
          <DockItem 
            icon={<BriefcaseIcon size={22} />} 
            label="Home" 
            isActive={activeView === 'home'} 
            onClick={() => setActiveView('home')} 
          />
          
          <div className="w-px h-8 bg-white/10 mx-1"></div>

          <DockItem 
            icon={<LayersIcon size={22} />} 
            label="Services" 
            isActive={activeView === 'services'} 
            onClick={() => setActiveView('services')} 
          />
          
          <DockItem 
            icon={<CodeIcon size={22} />} 
            label="Work" 
            isActive={activeView === 'portfolio'} 
            onClick={() => setActiveView('portfolio')} 
          />
          
          <DockItem 
            icon={<ChartBarIcon size={22} />} 
            label="Blog" 
            isActive={activeView === 'blog'} 
            onClick={() => setActiveView('blog')} 
          />
          
          <div className="w-px h-8 bg-white/10 mx-1"></div>

          <LiquidButton 
            variant="glass" 
            className="!rounded-[1.3rem] !px-6 !py-2.5 !text-sm whitespace-nowrap font-semibold"
            onClick={() => setActiveView('contact')}
            isActive={activeView === 'contact'}
          >
            Contact
          </LiquidButton>

        </div>
      </div>
      
    </div>
  );
};

// Sub-component for Dock Items
const DockItem = ({ icon, label, isActive, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`
      relative group flex flex-col items-center justify-center w-12 h-12 rounded-[1.2rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
      ${isActive 
        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-100' 
        : 'text-slate-400 hover:bg-white/10 hover:text-white hover:scale-110'
      }
    `}
  >
    {icon}
    {/* Tooltip */}
    <span className="absolute -top-12 px-3 py-1.5 rounded-xl bg-black/90 text-white text-[10px] font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 backdrop-blur-md border border-white/10 pointer-events-none">
      {label}
    </span>
  </button>
);

export default App;