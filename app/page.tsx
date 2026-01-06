'use client';

import { useState, useRef } from 'react';

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
      className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden"
      style={{
        '--x': `${mousePos.x}px`,
        '--y': `${mousePos.y}px`,
      } as React.CSSProperties}
    >
      <div className="relative z-10 w-full max-w-[90vw] px-4">
        {/* Base dark text */}
        <h1 className="text-[#111] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center select-none uppercase leading-[0.9] flex flex-col items-center">
          <span>Sentinent</span>
          <span>Technologies</span>
        </h1>
        
        {/* Illuminated text layer */}
        <h1 
          className="absolute inset-0 text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center select-none uppercase pointer-events-none leading-[0.9] flex flex-col items-center"
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
          className="absolute inset-0 text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center select-none uppercase pointer-events-none animate-reveal-sweep leading-[0.9] flex flex-col items-center"
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

      {/* Global glow follow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle 500px at var(--x) var(--y), rgba(255,255,255,0.04), transparent 100%)`,
        }}
      />
    </main>
  );
}
