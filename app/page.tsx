'use client';

import { useState, useRef } from 'react';
import CosmicCanvas from '../components/CosmicCanvas';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <main 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        '--x': `${mousePos.x}px`,
        '--y': `${mousePos.y}px`,
      } as React.CSSProperties}
    >
      {/* Cosmic Universe Background */}
      <CosmicCanvas />

      {/* Right-side Text Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-end pr-4 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-24">
        <div className="text-right max-w-[80vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[50vw]">
          {/* Base dark text */}
          <h1 className="text-[#111] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter select-none uppercase leading-[0.9] fade-in-text">
            <span>Sentinent</span>
            <span>Technologies</span>
          </h1> 
          
          {/* Illuminated text layer */}
          <h1 
            className="absolute inset-0 text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter select-none uppercase pointer-events-none leading-[0.9] fade-in-text"
            style={{
              maskImage: `radial-gradient(circle 200px at var(--x) var(--y), black 20%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 200px at var(--x) var(--y), black 20%, transparent 100%)`,
            }}
          >
            <span>Sentinent</span>
            <span>Technologies</span>
          </h1>

          {/* Sweep reveal layer */}
          <h1 
            className="absolute inset-0 text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter select-none uppercase pointer-events-none animate-reveal-sweep leading-[0.9] fade-in-text"
            style={{
              maskImage: `linear-gradient(to right, transparent 20%, black 50%, transparent 80%)`,
              WebkitMaskImage: `linear-gradient(to right, transparent 20%, black 50%, transparent 80%)`,
              maskSize: '250% 100%',
              WebkitMaskSize: '250% 100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <span>Sentinent</span>
            <span>Technologies</span>
          </h1>
        </div>
      </div>

      {/* Global glow follow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle 500px at var(--x) var(--y), rgba(255,255,255,0.04), transparent 100%)`,
        }}
      />

      {/* Smokey effect overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-10 smokey-overlay"
        style={{
          maskImage: `radial-gradient(circle 300px at var(--x) var(--y), white 30%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at var(--x) var(--y), white 30%, transparent 100%)`,
        }}
      />
    </main>
  );
}