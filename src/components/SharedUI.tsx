
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useStore } from '@nanostores/react';
import { settings, setLang, setTheme, performanceMode } from '../store';
import { Icons } from './Icons';
import { UI_TEXT } from '../constants';

// Helper for SPA navigation (Hash Mode for GitHub Pages)
const navigateTo = (path: string) => {
  // MOBILE FIX: Temporarily disable scroll snapping globally.
  // This prevents the browser (especially iOS Safari) from "fighting" the scrollTo animation
  // and snapping back down to the previous section while scrolling up.
  document.documentElement.style.scrollSnapType = 'none';

  // Update hash which triggers the router in App.tsx
  window.location.hash = path;
  
  // Force scroll to top with smooth animation
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-enable scroll snapping after the animation has likely finished (1s).
  // This ensures the "magnetic" feel returns once the user is settled at the top.
  setTimeout(() => {
      // Only restore snap if we are effectively on the Home/Root view
      const currentHash = window.location.hash;
      if (currentHash === '' || currentHash === '#/' || currentHash === '#') {
          document.documentElement.style.scrollSnapType = 'y mandatory';
      } else {
          // Keep it disabled for other pages that don't use snap
          document.documentElement.style.scrollSnapType = '';
      }
  }, 1000);
};

// --- PRIMITIVE COMPONENTS (Consolidated) ---

// 1. LiquidButton
interface LiquidButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({ children, onClick, className = "", type = "button", style }) => {
  return (
    <button 
      type={type}
      onClick={onClick} 
      style={style}
      className={`relative group inline-flex items-center justify-center font-medium transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] active:scale-95 border-none outline-none focus:outline-none ${className}`}
    >
      {/* Outer Glow (Spills out) */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-[var(--glass-glow)] blur-xl"></div>

      {/* Clipped Internal Layer */}
      <div className="absolute inset-0 overflow-hidden rounded-full liquid-glass-wrapper">
          {/* Background Layer with blur */}
          <div className="absolute inset-0 bg-[var(--card-bg)] backdrop-blur-xl group-hover:bg-[var(--card-hover-bg)] transition-colors duration-500"></div>
          
          {/* Subtle internal gradient for depth */}
          <div 
            className="absolute inset-0 opacity-100 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: 'linear-gradient(to top right, var(--highlight-color) 0%, transparent 40%)' }}
          ></div>

          {/* Internal Gradient Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 blur-md"></div>
          
          {/* Border Layer */}
          <div className="absolute inset-0 border border-[var(--card-border)] rounded-full group-hover:border-[var(--glass-glow)] transition-colors duration-500 pointer-events-none"></div>
      </div>
      
      {/* Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 tracking-wide text-[var(--text-primary)]">
        {children}
      </span>
    </button>
  );
};

// 2. GlassElement
type GlassElementProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  height?: number;
  width?: number;
  radius?: number;
  blur?: number;
};

export const GlassElement = ({
  children,
  className = "",
  style = {},
  height,
  width,
  radius,
  blur = 16,
}: GlassElementProps) => {
  
  // Construct dynamic styles based on sizing props
  const dynamicStyle: React.CSSProperties = {
    ...style,
    ...(width ? { width: `${width}px` } : {}),
    ...(height ? { height: `${height}px` } : {}),
    ...(radius ? { borderRadius: `${radius}px` } : {}),
    '--glass-blur': `${blur}px`,
  } as React.CSSProperties;

  return (
    <div className={`glass-element-box ${className}`} style={dynamicStyle}>
      <div className="glass-element-shine" />
      {children}
    </div>
  );
};

// 3. GlassDock
export const GlassDock = ({ children }: { children?: React.ReactNode }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const hiddenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!hiddenRef.current) return;

    // Compatibility check for older browsers (e.g., iOS < 13.4)
    if (typeof ResizeObserver === 'undefined') {
        // Fallback: Set size once and don't observe changes
        if (hiddenRef.current) {
          setSize({
              width: hiddenRef.current.offsetWidth,
              height: hiddenRef.current.offsetHeight
          });
        }
        return;
    }

    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (hiddenRef.current) {
            setSize({
                width: hiddenRef.current.offsetWidth,
                height: hiddenRef.current.offsetHeight
            });
        }
      }
    });
    obs.observe(hiddenRef.current);
    return () => obs.disconnect();
  }, [children]);

  return (
    <div className="relative flex justify-center items-end pb-2">
      {/* Hidden Layout for Sizing: Renders children invisibly to calculate natural width */}
      <div 
        ref={hiddenRef} 
        className="absolute bottom-2 opacity-0 pointer-events-none flex items-center gap-2 md:gap-3 p-1.5 md:p-2 whitespace-nowrap"
        aria-hidden="true"
        style={{ visibility: 'hidden' }} 
      >
        {children}
      </div>

      {/* Actual Visible Glass Element */}
      <div className={`transition-opacity duration-500 ${size.width > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <GlassElement
            width={size.width}
            height={size.height}
            radius={size.height / 2}
            className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2"
          >
            {children}
          </GlassElement>
      </div>
    </div>
  );
};

// --- CUSTOM CANVAS BACKGROUND (Network Data Traffic) ---

class NetworkNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    targetOpacity: number;
    neighbors: NetworkNode[] = [];

    constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // REDUCED SPEED: Slower movement is smoother and less chaotic
        this.vx = (Math.random() - 0.5) * 0.15; 
        this.vy = (Math.random() - 0.5) * 0.15;
        this.radius = Math.random() * 1.5 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.targetOpacity = this.opacity;
    }

    update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Pulse opacity
        if (Math.random() < 0.01) {
            this.targetOpacity = Math.random() * 0.6 + 0.1;
        }
        this.opacity += (this.targetOpacity - this.opacity) * 0.05;
        
        // Note: Neighbors are updated centrally now to allow throttling
    }
}

class DataPacket {
    from: NetworkNode;
    to: NetworkNode;
    progress: number = 0;
    speed: number;
    active: boolean = true;

    constructor(startNode: NetworkNode, endNode: NetworkNode) {
        this.from = startNode;
        this.to = endNode;
        // Slower packets to be more visible
        this.speed = Math.random() * 0.01 + 0.005; 
    }

    update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
            this.progress = 1;
            this.active = false; // Reached destination
        }
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = this.from.y + (this.to.y - this.from.y) * this.progress;

        // Fake Glow (Large, Low Opacity)
        // Optimization: Use globalAlpha instead of parsing color string
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2); 
        ctx.fill();
        
        // Core (Small, High Opacity)
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

export const CanvasBackground = () => {
    const { theme } = useStore(settings);
    const { lite } = useStore(performanceMode);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<NetworkNode[]>([]);
    const packetsRef = useRef<DataPacket[]>([]);
    const linksRef = useRef<{a: NetworkNode, b: NetworkNode}[]>([]);
    const lastTopologyUpdate = useRef<number>(0);
    const animationRef = useRef<number | undefined>(undefined);
    const [noiseDataUrl, setNoiseDataUrl] = useState('');
    
    // Cache para colores y configuración
    const colorsRef = useRef({ nodeColor: '', lineColor: '', packetColor: '' });
    const configRef = useRef({ isDark: false, canvasWidth: 0, canvasHeight: 0 });

    // Generate Static Noise (Optimizado)
    useEffect(() => {
        if (lite) return;
        
        const createNoise = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (ctx) {
                const idata = ctx.createImageData(128, 128);
                const buffer32 = new Uint32Array(idata.data.buffer);
                const len = buffer32.length;
                for (let i = 0; i < len; i++) {
                    if (Math.random() < 0.5) buffer32[i] = 0x08000000;
                }
                ctx.putImageData(idata, 0, 0);
                setNoiseDataUrl(canvas.toDataURL());
            }
        };
        
        createNoise();
    }, [lite]);

    useEffect(() => {
        if (lite) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d', { 
            alpha: false,
            desynchronized: true
        });
        if (!ctx) return;

        // Detectar tema y cachear colores
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        colorsRef.current = {
            nodeColor: isDark ? "rgba(16, 185, 129, " : "rgba(71, 85, 105, ",
            lineColor: isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(71, 85, 105, 0.1)",
            packetColor: isDark ? "#34d399" : "#059669"
        };
        
        configRef.current.isDark = isDark;

        // Initialization con límites optimizados
        const init = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Reducir resolución en pantallas Retina
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            
            // Setting width/height clears context and resets state
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);
            
            configRef.current.canvasWidth = width;
            configRef.current.canvasHeight = height;
            
            // Ajuste conservador de nodos (Reduced node count)
            const area = width * height;
            let nodeCount;
            
            if (width > 1920 || height > 1080) {
                nodeCount = Math.min(Math.floor(area / 50000), 25);
            } else if (dpr > 1.5) {
                nodeCount = Math.min(Math.floor(area / 45000), 30);
            } else {
                nodeCount = Math.min(Math.floor(area / 30000), 35);
            }
            
            nodeCount = Math.max(nodeCount, 12);
            
            nodesRef.current = [];
            packetsRef.current = [];
            linksRef.current = [];
            lastTopologyUpdate.current = 0; // Force update immediately
            
            for (let i = 0; i < nodeCount; i++) {
                nodesRef.current.push(new NetworkNode(width, height));
            }
        };

        // Variables para 60 FPS
        let lastFrameTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;
        
        const draw = (time: number) => {
            animationRef.current = requestAnimationFrame(draw);

            const elapsed = time - lastFrameTime;

            if (elapsed > frameInterval) {
                lastFrameTime = time - (elapsed % frameInterval);

                if (!canvas || !ctx) return;
                
                const { canvasWidth, canvasHeight, isDark } = configRef.current;
                
                // Clear con color de fondo
                ctx.fillStyle = isDark ? '#0a0a0a' : '#ffffff';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                
                // Optimization: Avoid 'lighter' composite as it is expensive
                ctx.globalCompositeOperation = 'source-over';

                const nodes = nodesRef.current;
                const nodeCount = nodes.length;

                // Update Node Positions
                for (let i = 0; i < nodeCount; i++) {
                    nodes[i].update(canvasWidth, canvasHeight);
                }
                
                // Update Topology (Links) Throttled to every 300ms
                if (time - lastTopologyUpdate.current > 300) {
                    lastTopologyUpdate.current = time;
                    linksRef.current = [];
                    
                    // Clear neighbors for routing
                    for(let i=0; i<nodeCount; i++) {
                        nodes[i].neighbors = [];
                    }

                    const maxDist = 160; 
                    const maxDistSq = maxDist * maxDist;
                    const maxConnections = 4;
                    const connectionCounts = new Int8Array(nodeCount).fill(0);

                    for (let i = 0; i < nodeCount; i++) {
                        if (connectionCounts[i] >= maxConnections) continue;
                        const nodeA = nodes[i];
                        
                        for (let j = i + 1; j < nodeCount; j++) {
                            if (connectionCounts[j] >= maxConnections) continue;
                            const nodeB = nodes[j];

                            const dx = nodeA.x - nodeB.x;
                            if (Math.abs(dx) > maxDist) continue;
                            const dy = nodeA.y - nodeB.y;
                            if (Math.abs(dy) > maxDist) continue;

                            const distSq = dx*dx + dy*dy;

                            if (distSq < maxDistSq) {
                                // Add Link
                                linksRef.current.push({ a: nodeA, b: nodeB });
                                
                                // Add Neighbors (for packets)
                                nodeA.neighbors.push(nodeB);
                                nodeB.neighbors.push(nodeA);
                                
                                connectionCounts[i]++;
                                connectionCounts[j]++;
                                
                                if (connectionCounts[i] >= maxConnections) break;
                            }
                        }
                    }
                }

                // Batch drawing de líneas
                const links = linksRef.current;
                if (links.length > 0) {
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = colorsRef.current.lineColor;
                    ctx.beginPath();
                    
                    for(let i = 0; i < links.length; i++) {
                        const link = links[i];
                        ctx.moveTo(link.a.x, link.a.y);
                        ctx.lineTo(link.b.x, link.b.y);
                    }
                    ctx.stroke();
                }

                // Draw Nodes
                for (let i = 0; i < nodeCount; i++) {
                    const node = nodes[i];
                    ctx.fillStyle = colorsRef.current.nodeColor + node.opacity + ")";
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Gestión de Packets
                const packets = packetsRef.current;
                
                for (let i = packets.length - 1; i >= 0; i--) {
                    const packet = packets[i];
                    if (!packet.active) {
                        const current = packet.to;
                        
                        // 40% probabilidad de continuar
                        if (current.neighbors.length > 0 && Math.random() < 0.4) {
                            const next = current.neighbors[Math.floor(Math.random() * current.neighbors.length)];
                            packets.push(new DataPacket(current, next));
                        }
                        packets.splice(i, 1);
                    }
                }

                // Spawn packets (Reduced count)
                const maxPackets = 6;
                const spawnRate = 0.02;
                
                if (packets.length < maxPackets && Math.random() < spawnRate) {
                    const randomNode = nodes[Math.floor(Math.random() * nodeCount)];
                    if (randomNode.neighbors.length > 0) {
                        const target = randomNode.neighbors[Math.floor(Math.random() * randomNode.neighbors.length)];
                        packets.push(new DataPacket(randomNode, target));
                    }
                }

                // Update y Draw Packets
                const packetCount = packets.length;
                for (let i = 0; i < packetCount; i++) {
                    packets[i].update();
                    packets[i].draw(ctx, colorsRef.current.packetColor);
                }
            }
        };

        // Debounce resize
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 300);
        };
        
        // Pause/resume con cleanup
        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                    animationRef.current = undefined;
                }
            } else {
                lastFrameTime = performance.now();
                lastTopologyUpdate.current = 0; // Force update on resume
                animationRef.current = requestAnimationFrame(draw);
            }
        };

        window.addEventListener('resize', handleResize, { passive: true });
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        init();
        animationRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [theme, lite]);

    // Lite Mode
    if (lite) {
        return (
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)]" />
        );
    }

    return (
        <>
            <div 
                className="fixed top-0 left-0 w-full h-full -z-10 bg-[var(--bg-gradient)]" 
                style={{ backgroundAttachment: 'fixed' }}
            />
            
            <canvas 
                ref={canvasRef} 
                className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-60 dark:opacity-100"
            />
            
            {noiseDataUrl && (
                <div 
                    className="bg-noise fixed top-0 left-0 w-full h-full z-0 pointer-events-none" 
                    style={{ backgroundImage: `url(${noiseDataUrl})` }} 
                />
            )}
        </>
    );
};

// --- HEADER ---
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useStore(settings);

  useEffect(() => {
    // Detect scroll to toggle 'pill' mode
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-4 md:pt-6 pointer-events-none">
      <a 
        href="#/"
        onClick={(e) => { e.preventDefault(); navigateTo('/'); }}
        className={`pointer-events-auto cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full
          w-auto px-6 h-[44px]
          ${scrolled 
            ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--card-border)] shadow-2xl opacity-100 translate-y-0' 
            : 'bg-transparent border-transparent shadow-none opacity-100 translate-y-0'}`}
        aria-label="Go to Homepage"
      >
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-3 mr-3">
              <Icons.Windows className="w-5 h-5 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <Icons.Apple className={`w-5 h-5 transition-colors duration-300 ${isDark ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-black drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]'}`} />
              <Icons.Linux className="w-5 h-5 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
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
      onClick={() => navigateTo(window.location.hash.replace(/^#/, '') || '/')}
      className={`fixed right-5 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] shadow-[var(--button-shadow)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] group hover:bg-[var(--card-hover-bg)] hover:scale-110 hover:border-[var(--glass-glow)] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-[calc(2rem+env(safe-area-inset-bottom))]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Icons.ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:-translate-y-0.5 transition-all duration-300" />
    </button>
  );
};
