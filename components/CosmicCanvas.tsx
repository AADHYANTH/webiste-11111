'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  glowIntensity: number;
};

type Nebula = {
  x: number;
  y: number;
  size: number;
  colors: string[];
  density: number;
  rotation: number;
};

export default function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    
    const handleResize = () => {
      resizeCanvas();
      // Reinitialize particles and nebulae on significant size changes
      particlesRef.current = initParticles();
      nebulaeRef.current = initNebulae();
    };
    
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      // Reduce particle count on mobile devices for better performance
      const isMobile = window.innerWidth <= 768;
      const particleDensity = isMobile ? 6000 : 4000;
      const particleCount = Math.floor((canvas.width * canvas.height) / particleDensity);

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const speed = Math.random() * 0.1 + 0.05;
        const angle = Math.random() * Math.PI * 2;

        // Create clusters - 25% chance for particles to be in clusters
        const isCluster = Math.random() < 0.25;
        const clusterX = isCluster ? Math.random() * canvas.width : -1;
        const clusterY = isCluster ? Math.random() * canvas.height : -1;

        // Add some depth variation
        const depthFactor = Math.random() * 0.5 + 0.75;

        // Determine particle type
        const particleType = Math.random();
        let finalColor = 'white';
        let finalSize = size;
        let finalGlow = Math.random() * 0.5 + 0.1;
        
        if (particleType < 0.6) {
          // Regular white star (60%)
          finalColor = 'white';
        } else if (particleType < 0.8) {
          // Blue star (20%)
          finalColor = '#aaddff';
          finalGlow = Math.random() * 0.7 + 0.2;
        } else if (particleType < 0.9) {
          // Purple star (10%)
          finalColor = '#ddaaff';
          finalGlow = Math.random() * 0.6 + 0.3;
        } else if (particleType < 0.95) {
          // Bright white star (5%)
          finalColor = '#ffffff';
          finalSize = size * 1.2;
          finalGlow = Math.random() * 0.8 + 0.3;
        } else {
          // Rare golden star (5%)
          finalColor = '#ffddaa';
          finalSize = size * 1.3;
          finalGlow = Math.random() * 0.9 + 0.4;
        }

        particles.push({
          x: isCluster ? clusterX + (Math.random() - 0.5) * 50 : Math.random() * canvas.width,
          y: isCluster ? clusterY + (Math.random() - 0.5) * 50 : Math.random() * canvas.height,
          size: isCluster ? Math.random() * 2 + 1 : finalSize,
          speedX: Math.cos(angle) * speed * (isCluster ? 0.3 : 1) * depthFactor,
          speedY: Math.sin(angle) * speed * (isCluster ? 0.3 : 1) * depthFactor,
          color: finalColor,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.0005 + 0.0001,
          twinklePhase: Math.random() * Math.PI * 2,
          glowIntensity: finalGlow
        });
      }

      return particles;
    };

    // Initialize nebulae
    const initNebulae = () => {
      const nebulae: Nebula[] = [];
      const nebulaCount = Math.floor(Math.random() * 4) + 3;

      const nebulaColors = [
        ['#1a237e', '#303f9f', '#3949ab'],
        ['#4a148c', '#6a1b9a', '#7b1fa2'],
        ['#0d47a1', '#1565c0', '#1976d2'],
        ['#311b92', '#4527a0', '#512da8'],
        ['#003366', '#004d99', '#0066cc'],
        ['#2c1e4d', '#4a3b7c', '#6a5bac']
      ];

      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 250 + 150,
          colors: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          density: Math.random() * 0.6 + 0.2,
          rotation: Math.random() * Math.PI * 2
        });
      }

      return nebulae;
    };

    particlesRef.current = initParticles();
    nebulaeRef.current = initNebulae();

    // Draw nebula
    const drawNebula = (ctx: CanvasRenderingContext2D, nebula: Nebula) => {
      const gradient = ctx.createRadialGradient(
        nebula.x, nebula.y, 0,
        nebula.x, nebula.y, nebula.size
      );

      gradient.addColorStop(0, nebula.colors[0]);
      gradient.addColorStop(0.5, nebula.colors[1]);
      gradient.addColorStop(1, nebula.colors[2]);

      ctx.save();
      ctx.translate(nebula.x, nebula.y);
      ctx.rotate(nebula.rotation);
      ctx.translate(-nebula.x, -nebula.y);

      ctx.globalAlpha = nebula.density * 0.1;
      ctx.fillStyle = gradient;

      // Create organic shape
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = nebula.size * (0.7 + Math.sin(angle * 3) * 0.3);
        const x = nebula.x + Math.cos(angle) * radius;
        const y = nebula.y + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const cpx1 = nebula.x + Math.cos(angle - 0.1) * radius * 0.9;
          const cpy1 = nebula.y + Math.sin(angle - 0.1) * radius * 0.9;
          const cpx2 = nebula.x + Math.cos(angle + 0.1) * radius * 0.9;
          const cpy2 = nebula.y + Math.sin(angle + 0.1) * radius * 0.9;
          ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
        }
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Draw particle
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      // Create glow effect with multiple layers for depth
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(0.6, particle.color);
      gradient.addColorStop(0.9, 'transparent');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Core particle
      const twinkle = Math.sin(particle.twinklePhase) * 0.4 + 0.8;
      ctx.globalAlpha = particle.opacity * twinkle;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Add subtle white core for brighter stars
      if ((particle.color === 'white' || particle.color === '#ffffff') && particle.size > 1) {
        ctx.globalAlpha = particle.opacity * twinkle * 0.3;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add golden core for golden stars
      if (particle.color === '#ffddaa' && particle.size > 1) {
        ctx.globalAlpha = particle.opacity * twinkle * 0.4;
        ctx.fillStyle = '#ffcc66';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Animation loop with performance optimization
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Performance optimization: skip frames if deltaTime is too large
      if (deltaTime > 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas with deep space black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nebulae with subtle rotation
      nebulaeRef.current.forEach(nebula => {
        nebula.rotation += 0.00005 * deltaTime;
        drawNebula(ctx, nebula);
      });

      // Update and draw particles with organic movement
      // Use a more efficient loop for better performance
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.x += particle.speedX * deltaTime;
        particle.y += particle.speedY * deltaTime;
        particle.twinklePhase += particle.twinkleSpeed * deltaTime;

        // Add subtle organic movement variation (only on larger screens for performance)
        if (canvas.width > 1000) {
          const organicVariation = Math.sin(timestamp * 0.0001 + particle.x * 0.01 + particle.y * 0.01) * 0.001 * deltaTime;
          particle.x += Math.cos(timestamp * 0.0002) * organicVariation;
          particle.y += Math.sin(timestamp * 0.0003) * organicVariation;
        }

        // Wrap around edges for seamless looping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        drawParticle(ctx, particle);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: '#000000' }}
    />
  );
}