import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';

export default function InteractiveHeroGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dynamic states
  const [systemLoad, setSystemLoad] = useState<'idle' | 'nominal' | 'heavy' | 'attack'>('nominal');
  const [activeNodesCount, setActiveNodesCount] = useState(24);
  const [secureStatus, setSecureStatus] = useState('پیشگیری فعال');
  const [simulatedRps, setSimulatedRps] = useState(482);

  // Sync state values with system load selector
  useEffect(() => {
    switch (systemLoad) {
      case 'idle':
        setActiveNodesCount(12);
        setSecureStatus('پایش فعال (کم‌مصرف)');
        break;
      case 'nominal':
        setActiveNodesCount(28);
        setSecureStatus('جریان تراکنش عادی');
        break;
      case 'heavy':
        setActiveNodesCount(54);
        setSecureStatus('کلاستر پشتیبان آنلاین');
        break;
      case 'attack':
        setActiveNodesCount(92);
        setSecureStatus('پدافند سایبری فعال ۲۴/۷');
        break;
    }
  }, [systemLoad]);

  // Listen to load change events from other elements on the page
  useEffect(() => {
    const handleLoadChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.load) {
        setSystemLoad(customEvent.detail.load);
      }
    };
    window.addEventListener('aria-system-load', handleLoadChange);
    return () => {
      window.removeEventListener('aria-system-load', handleLoadChange);
    };
  }, []);

  // Live fluctuating RPS depending on current simulation mode
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedRps(prev => {
        let minRps = 10;
        let maxRps = 20;

        if (systemLoad === 'idle') {
          minRps = 10; maxRps = 25;
        } else if (systemLoad === 'nominal') {
          minRps = 320; maxRps = 490;
        } else if (systemLoad === 'heavy') {
          minRps = 850; maxRps = 1200;
        } else if (systemLoad === 'attack') {
          minRps = 4200; maxRps = 5800;
        }

        const delta = Math.floor(Math.random() * 41) - 20;
        let next = prev + delta;
        if (next < minRps) next = minRps + 10;
        if (next > maxRps) next = maxRps - 10;
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [systemLoad]);

  // Main Canvas Setup and Particle Animation System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 500);
    let height = (canvas.height = 420);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width = canvas.width = w || 500;
        height = canvas.height = h || 420;
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Interactive circular shockwave on user clicks
    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      color: string;
    }
    const shockwaves: Shockwave[] = [];

    // Speed multiplier lookup
    const getSpeedMultiplier = () => {
      switch (systemLoad) {
        case 'idle': return 0.35;
        case 'nominal': return 1.0;
        case 'heavy': return 1.9;
        case 'attack': return 3.4;
        default: return 1.0;
      }
    };

    // Particle nodes definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      label: string;
      activityPulse: number;

      constructor(x: number, y: number, label = '') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.baseRadius = Math.random() * 2 + 2;
        this.label = label;
        this.activityPulse = Math.random() * Math.PI;
      }

      update(width: number, height: number, mouse: { x: number; y: number; active: boolean }, speedMultiplier: number) {
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;
        this.activityPulse += 0.03 * speedMultiplier;

        // Wall bouncing
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Clamp inside canvas boundary
        if (this.x < 0) this.x = 0;
        if (this.x > width) this.x = width;
        if (this.y < 0) this.y = 0;
        if (this.y > height) this.y = height;

        // Gravity pull towards mouse cursor
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const force = ((140 - dist) / 1000) * speedMultiplier;
            this.vx += (dx / dist) * force * 0.2;
            this.vy += (dy / dist) * force * 0.2;
          }
        }

        // Apply friction/speed limit
        const speed = Math.hypot(this.vx, this.vy);
        const limit = 1.3;
        if (speed > limit) {
          this.vx = (this.vx / speed) * limit;
          this.vy = (this.vy / speed) * limit;
        }
      }

      draw(ctx: CanvasRenderingContext2D, load: 'idle' | 'nominal' | 'heavy' | 'attack') {
        const sizeMultiplier = 1 + Math.sin(this.activityPulse) * 0.3;
        
        // Node color depending on style
        let nodeColor = '#3b82f6'; // tech blue
        let glowColor = 'rgba(59, 130, 246, 0.12)';

        if (load === 'idle') {
          nodeColor = '#64748b'; // slate grey
          glowColor = 'rgba(100, 116, 139, 0.05)';
        } else if (load === 'heavy') {
          nodeColor = '#06b6d4'; // energetic cyber cyan
          glowColor = 'rgba(6, 182, 212, 0.12)';
        } else if (load === 'attack') {
          nodeColor = Math.random() > 0.3 ? '#f43f5e' : '#ffffff'; // pulsing rose red/white alert
          glowColor = 'rgba(244, 63, 94, 0.25)';
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseRadius * sizeMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Node glow circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseRadius * 4.4, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();

        // Label rendering
        if (this.label) {
          ctx.font = '9px Vazirmatn, Arial';
          ctx.fillStyle = load === 'attack' ? 'rgba(244, 63, 94, 0.85)' : 'rgba(59, 130, 246, 0.8)';
          ctx.textAlign = 'right';
          ctx.fillText(this.label, this.x - 8, this.y + 3);
        }
      }
    }

    const labels = [
      'هوش مصنوعی', 'پردازش موازی', 'شبکه عصبی', 'کلاستر ثریا',
      'دیتابیس آریا', 'درگاه مالی بومی', 'پروتکل لایه ۴', 'دیوار دفاعی IPS', 'مدل عارضه‌شناسی'
    ];

    const particles: Particle[] = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      const label = i < labels.length ? labels[i] : '';
      particles.push(
        new Particle(
          Math.random() * width,
          Math.random() * height,
          label
        )
      );
    }

    const mouse = { x: 0, y: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Handle clicking to generate neon visual packet bursts in the canvas!
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let color = 'rgba(59, 130, 246, ';
      if (systemLoad === 'attack') color = 'rgba(244, 63, 94, ';
      else if (systemLoad === 'heavy') color = 'rgba(6, 182, 212, ';
      else if (systemLoad === 'idle') color = 'rgba(100, 116, 139, ';

      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 100 + Math.random() * 40,
        alpha: 1.0,
        color: color
      });

      // Temporary drag/push particles away
      particles.forEach(p => {
        const dX = p.x - clickX;
        const dY = p.y - clickY;
        const dist = Math.hypot(dX, dY);
        if (dist < 120) {
          const pushForce = (120 - dist) * 0.15;
          p.vx += (dX / dist) * pushForce;
          p.vy += (dY / dist) * pushForce;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mousedown', handleMouseDown);

    // Draw lines between nearby floating nodes
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          const maxDist = systemLoad === 'attack' ? 120 : 105;

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (maxDist - dist) / maxDist;
            
            // Neon connection lines depending on the mode
            let strokeStyle = `rgba(59, 130, 246, ${alpha * 0.18})`;
            if (systemLoad === 'attack') {
              strokeStyle = `rgba(244, 63, 94, ${alpha * 0.28})`;
            } else if (systemLoad === 'heavy') {
              strokeStyle = `rgba(6, 182, 212, ${alpha * 0.22})`;
            } else if (systemLoad === 'idle') {
              strokeStyle = `rgba(100, 116, 139, ${alpha * 0.08})`;
            }

            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = systemLoad === 'attack' ? 1.25 : 0.85;
            ctx.stroke();
          }
        }
      }
    };

    // Render shockwave rings in animation
    const drawAndAnimateShockwaves = () => {
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 5;
        sw.alpha -= 0.04;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${sw.color}${sw.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    // Main Canvas Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle high-tech background grid lines
      let gridColor = 'rgba(59, 130, 246, 0.03)';
      if (systemLoad === 'attack') gridColor = 'rgba(244, 63, 94, 0.05)';
      else if (systemLoad === 'heavy') gridColor = 'rgba(6, 182, 212, 0.04)';

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      const gridSize = 35;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw custom danger screen overlay during attack simulation
      if (systemLoad === 'attack') {
        const pulseScanline = 0.02 + Math.sin(Date.now() / 300) * 0.015;
        ctx.fillStyle = `rgba(244, 63, 94, ${pulseScanline})`;
        ctx.fillRect(0, 0, width, height);

        ctx.font = '10px Courier New, monospace';
        ctx.fillStyle = 'rgba(244, 63, 94, 0.3)';
        ctx.textAlign = 'left';
        ctx.fillText('SYSTEM INTRUSION BLOCKED - SHIELD ACTIVE', 15, 30);
      }

      const speedMultiplier = getSpeedMultiplier();

      // Update and draw nodes
      particles.forEach(p => {
        p.update(width, height, mouse, speedMultiplier);
        p.draw(ctx, systemLoad);
      });

      // Connections and click bursts
      drawConnections();
      drawAndAnimateShockwaves();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mousedown', handleMouseDown);
      resizeObserver.disconnect();
    };
  }, [systemLoad]);

  return (
    <div ref={containerRef} className={`relative w-full max-w-[500px] h-[360px] md:h-[420px] rounded-3xl overflow-hidden glass-panel border shadow-xl flex flex-col justify-between transition-colors duration-500 bg-slate-950/45 ${
      systemLoad === 'attack' ? 'border-rose-500 bg-rose-500/[0.01]' : 
      systemLoad === 'heavy' ? 'border-cyan-500 bg-cyan-500/[0.01]' : 'border-white/10'
    }`}>
      
      {/* Interactive top glass status bar */}
      <div className={`absolute top-0 left-0 right-0 h-10 px-4 flex items-center justify-between text-right backdrop-blur-md z-10 border-b transition-colors duration-500 ${
        systemLoad === 'attack' ? 'bg-rose-950/70 border-rose-500/20 text-rose-350' : 
        systemLoad === 'heavy' ? 'bg-cyan-950/70 border-cyan-500/20 text-cyan-300' : 'bg-blue-950/40 border-white/5 text-blue-300'
      }`} style={{ direction: 'rtl' }}>
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full animate-ping shrink-0 ${
            systemLoad === 'attack' ? 'bg-rose-600' :
            systemLoad === 'heavy' ? 'bg-amber-500' : 'bg-emerald-500'
          }`} />
          <span className="text-[10px] font-bold">پایش زنده دیتاسنترهای آریا</span>
        </div>
        <span className="text-[9px] font-mono tracking-widest text-slate-500 hidden xs:inline uppercase">
          {systemLoad === 'attack' ? 'threat-defence active' : 
           systemLoad === 'heavy' ? 'high load performance' : 
           systemLoad === 'idle' ? 'power saving standby' : 'normal operation scale'}
        </span>
      </div>
 
      {/* Dynamic Interactive Canvas */}
      <canvas ref={canvasRef} className="w-full flex-grow cursor-crosshair mt-10" />
 
      {/* Real-time statistics glass tile underlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg flex items-center justify-between gap-4 z-10" style={{ direction: 'rtl' }}>
        
        {/* Metric 1 */}
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg border transition-colors ${
            systemLoad === 'attack' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
            systemLoad === 'heavy' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
          }`}>
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block font-normal leading-none mb-1">خوشه محاسباتی</span>
            <span className="text-[11px] font-black text-white block font-mono">{activeNodesCount} کلاستر زنده</span>
          </div>
        </div>
 
        {/* Metric 2 */}
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg border transition-colors ${
            systemLoad === 'attack' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
            systemLoad === 'heavy' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
          }`}>
            <Activity className={`w-4 h-4 ${systemLoad === 'idle' ? '' : 'animate-pulse'}`} />
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block font-normal leading-none mb-1">بار تراکنش</span>
            <span className="text-[11px] font-black text-white block font-mono">
              {simulatedRps.toLocaleString('fa-IR')} <span className="text-[8px] font-sans font-medium text-slate-400 block sm:inline">RPS/ثانیه</span>
            </span>
          </div>
        </div>
 
        {/* Metric 3 */}
        <div className="flex items-center gap-2 hidden sm:flex">
          <div className={`p-2 rounded-lg border ${
            systemLoad === 'attack' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
          }`}>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[9px] text-slate-400 block font-normal leading-none mb-1">امنیت ترافیکی</span>
            <span className="text-[10px] font-extrabold text-white block">{secureStatus}</span>
          </div>
        </div>
 
      </div>
 
    </div>
  );
}
