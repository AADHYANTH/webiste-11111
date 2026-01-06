'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function SmokeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(147, 51, 234, 0.8)',
      'rgba(99, 102, 241, 0.8)',
      'rgba(79, 70, 229, 0.8)',
      'rgba(139, 92, 246, 0.8)',
    ];

    const createParticle = (x?: number, y?: number): Particle => {
      const randomX = x ?? Math.random() * canvas.width;
      const randomY = y ?? canvas.height + 50;
      
      return {
        x: randomX,
        y: randomY,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 1.5 + 0.5),
        size: Math.random() * 60 + 40,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    for (let i = 0; i < 50; i++) {
      particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (particles.length < 60 && Math.random() < 0.3) {
        particles.push(createParticle());
      }

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        const lifeProgress = particle.life / particle.maxLife;
        
        if (lifeProgress < 0.2) {
          particle.opacity = lifeProgress * 5;
        } else if (lifeProgress > 0.8) {
          particle.opacity = (1 - lifeProgress) * 5;
        } else {
          particle.opacity = Math.max(0.1, Math.min(1, particle.opacity));
        }

        particle.vx += (Math.random() - 0.5) * 0.05;
        particle.vy += (Math.random() - 0.5) * 0.03;
        
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.life >= particle.maxLife || particle.y < -100) {
          particles.splice(index, 1);
          return;
        }

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );

        const baseColor = particle.color.replace(/[\d.]+\)$/g, `${particle.opacity * 0.4})`);
        const edgeColor = particle.color.replace(/[\d.]+\)$/g, '0)');

        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.4, particle.color.replace(/[\d.]+\)$/g, `${particle.opacity * 0.2})`));
        gradient.addColorStop(1, edgeColor);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
