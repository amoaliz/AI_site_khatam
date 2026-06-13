import React from 'react';
import { motion } from 'motion/react';

export default function TechGridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* 1. Global High-Tech Interactive Matrix/Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{ 
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.5) 1px, transparent 0),
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 0),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 0)
          `,
          backgroundSize: '32px 32px, 128px 128px, 128px 128px',
          backgroundPosition: 'center top'
        }}
      />

      {/* 2. Scanning Laser bars that sweep the background */}
      <motion.div 
        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.15)]"
        animate={{
          top: ['0%', '100%', '0%']
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/15 to-transparent"
        animate={{
          top: ['100%', '0%', '100%']
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* 3. Interactive Floating Technical Circuit Elements (Top-Right Section) */}
      <div className="absolute top-12 right-0 w-[300px] h-[300px] opacity-15 md:opacity-20 translate-x-12 hidden lg:block text-cyan-400">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          {/* Circles & concentric orbits */}
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" className="animate-spin-slow" />
          <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1" strokeDasharray="20 40" />
          <circle cx="100" cy="100" r="50" stroke="purple" strokeWidth="0.75" strokeDasharray="3 3" />
          
          {/* Crossing HUD axis paths */}
          <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
          
          {/* Flowing tech coordinates or labels */}
          <text x="110" y="45" fill="currentColor" className="font-mono text-[7px] tracking-widest">SYS.LOC [35.68]*</text>
          <text x="110" y="165" fill="purple" className="font-mono text-[6px] tracking-widest">CORE_SYS.ONLINE_S4</text>
        </svg>
      </div>

      {/* 4. Left Side Vertical Flowing Tech Nodes (Mid-Screen Circuitry) */}
      <div className="absolute top-[800px] left-0 w-[240px] h-[500px] opacity-[0.14] -translate-x-10 hidden md:block">
        <svg viewBox="0 0 100 250" fill="none" className="w-full h-full text-indigo-400" xmlns="http://www.w3.org/2000/svg">
          {/* Main trunk cable line */}
          <path d="M 10 0 L 10 60 L 40 90 L 40 180 L 15 210 L 15 250" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 40 90 L 70 120 L 70 150 L 95 175" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          
          {/* Microchips and technical nodes */}
          <circle cx="10" cy="60" r="3" fill="currentColor" />
          <circle cx="40" cy="90" r="2.5" fill="cyan" />
          <circle cx="40" cy="180" r="3" fill="currentColor" />
          <rect x="62" y="142" width="16" height="16" rx="2" stroke="purple" strokeWidth="1" className="animate-pulse" />
          
          {/* Tiny glowing packet flowing down the circuit path */}
          <motion.circle 
            r="3" 
            fill="#22d3ee" 
            animate={{
              cx: [10, 10, 40, 40, 15, 15],
              cy: [0, 60, 90, 180, 210, 250]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="shadow-md shadow-cyan-400"
          />
        </svg>
      </div>

      {/* 5. Right Side Vertical Circuitry & Concentric Core Node (Showcase Section Background) */}
      <div className="absolute top-[1600px] right-0 w-[260px] h-[600px] opacity-[0.12] translate-x-12 hidden lg:block">
        <svg viewBox="0 0 100 250" fill="none" className="w-full h-full text-purple-400" xmlns="http://www.w3.org/2000/svg">
          <path d="M 90 0 L 90 70 L 60 100 L 60 190 L 80 210 L 80 250" stroke="currentColor" strokeWidth="1" />
          <path d="M 60 100 L 30 130 L 30 180" stroke="indigo" strokeWidth="0.75" />
          
          <circle cx="90" cy="70" r="2.5" fill="currentColor" />
          <circle cx="60" cy="100" r="3" fill="purple" />
          <circle cx="30" cy="130" r="2.5" fill="currentColor" />
          
          {/* Animated data particle */}
          <motion.circle 
            r="2.5" 
            fill="#a78bfa" 
            animate={{
              cx: [90, 90, 60, 60, 80, 80],
              cy: [0, 70, 100, 190, 210, 250]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
              delay: 2.5
            }}
          />
        </svg>
      </div>

      {/* 6. Dynamic Cyber HUD Compass / Technical Targets (Footer Background) */}
      <div className="absolute bottom-[200px] left-8 w-[350px] h-[350px] opacity-[0.1] hidden xl:block text-indigo-500">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="1" strokeDasharray="18 10" className="animate-spin-slow" />
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          
          {/* Compass layout rings */}
          <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" />
          
          <text x="105" y="25" fill="currentColor" className="font-mono text-[6px]">N 00° 00' 00"</text>
          <text x="105" y="185" fill="currentColor" className="font-mono text-[6px]">S 180° 00' 00"</text>
        </svg>
      </div>

    </div>
  );
}
