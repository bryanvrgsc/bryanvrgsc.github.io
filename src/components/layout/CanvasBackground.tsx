import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { settings, performanceMode } from '../../store';

/**
 * NetworkNode Class
 * 
 * Represents a node in the network visualization.
 * Nodes move around the canvas and can connect to nearby nodes.
 */
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

/**
 * DataPacket Class
 * 
 * Represents a data packet traveling between network nodes.
 * Packets move along connections and can hop to neighboring nodes.
 */
class DataPacket {
    from: NetworkNode;
    to: NetworkNode;
    progress: number = 0;
    speed: number;
    active: boolean = true;

    constructor(startNode: NetworkNode, endNode: NetworkNode) {
        this.from = startNode;
        this.to = endNode;
        // Slightly faster to make them visible but short lived
        this.speed = Math.random() * 0.01 + 0.012; // Increased base speed slightly
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

/**
 * CanvasBackground Component
 * 
 * Animated network visualization background using HTML5 Canvas.
 * Features moving nodes connected by lines with data packets traveling between them.
 * Optimized for performance with throttled updates and configurable quality settings.
 * 
 * Performance modes:
 * - Normal: Full animation with all effects
 * - Lite: Simple gradient background (no animation)
 */
export const CanvasBackground = () => {
    const { theme } = useStore(settings);
    const { lite } = useStore(performanceMode);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<NetworkNode[]>([]);
    const packetsRef = useRef<DataPacket[]>([]);
    const linksRef = useRef<{ a: NetworkNode, b: NetworkNode }[]>([]);
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

            // INCREASED DENSITY DRASTICALLY: More nodes
            const area = width * height;
            let nodeCount;

            // Divisor reduced from 30000 to 15000 approx to double density
            if (width > 1920 || height > 1080) {
                nodeCount = Math.min(Math.floor(area / 15000), 80);
            } else if (dpr > 1.5) {
                nodeCount = Math.min(Math.floor(area / 12000), 90);
            } else {
                nodeCount = Math.min(Math.floor(area / 10000), 100);
            }

            nodeCount = Math.max(nodeCount, 40); // Minimum 40 nodes

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
                    for (let i = 0; i < nodeCount; i++) {
                        nodes[i].neighbors = [];
                    }

                    // Reduced Max Dist slightly to accommodate higher node count (prevent hairball)
                    const maxDist = 120; // Reduced from 140
                    const maxDistSq = maxDist * maxDist;
                    const maxConnections = 6; // Increased connections slightly
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

                            const distSq = dx * dx + dy * dy;

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

                    for (let i = 0; i < links.length; i++) {
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

                        // DECREASED HOP CHANCE drastically (0.2 -> 0.15): "Lleguen menos lejos"
                        // Packets die much sooner, creating "short bursts" of traffic.
                        if (current.neighbors.length > 0 && Math.random() < 0.15) {
                            const next = current.neighbors[Math.floor(Math.random() * current.neighbors.length)];
                            packets.push(new DataPacket(current, next));
                        }
                        packets.splice(i, 1);
                    }
                }

                // INCREASED PACKET COUNT & SPAWN RATE: "Salgan más paquetes"
                const maxPackets = 50; // Increased significantly
                const spawnRate = 0.25; // Very high spawn rate

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
