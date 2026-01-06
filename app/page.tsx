'use client';

import { useEffect, useState } from 'react';
import SmokeEffect from '@/components/SmokeEffect';
import AnimatedHeroText from '@/components/AnimatedHeroText';

export default function Home() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2800);
    const ctaTimer = setTimeout(() => setShowCta(true), 3500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(ctaTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#0f0f1e] to-[#1a1a2e] overflow-x-hidden">
      <SmokeEffect />
      
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8">
        <div 
          className="relative z-10 text-center max-w-6xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 1 - scrollY / 500,
          }}
        >
          <AnimatedHeroText
            text="Sentinent Technologies"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent leading-tight mb-6"
          />
          
          <div
            className={`transition-all duration-1000 ${
              showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light tracking-wide mb-12">
              Pioneering the Future of Intelligence
            </p>
          </div>

          <div
            className={`transition-all duration-1000 ${
              showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10">Explore the Platform</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg
            className="w-8 h-8 text-purple-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <section className="relative z-10 min-h-screen px-6 sm:px-8 py-20">
        <div 
          className="max-w-6xl mx-auto"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 300) / 200)),
            transform: `translateY(${Math.max(0, 50 - (scrollY - 300) / 4)}px)`,
          }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Advanced AI Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Neural Networks',
                description: 'State-of-the-art deep learning models that push the boundaries of artificial intelligence.',
                icon: '🧠',
              },
              {
                title: 'Quantum Computing',
                description: 'Harnessing quantum mechanics to solve complex problems at unprecedented speeds.',
                icon: '⚛️',
              },
              {
                title: 'Autonomous Systems',
                description: 'Self-learning systems that adapt and evolve with minimal human intervention.',
                icon: '🤖',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - 400 - index * 100) / 200)),
                  transform: `translateY(${Math.max(0, 30 - (scrollY - 400 - index * 100) / 8)}px)`,
                }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div
              className="inline-block"
              style={{
                opacity: Math.min(1, Math.max(0, (scrollY - 800) / 200)),
              }}
            >
              <button className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-bold text-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 sm:px-8 py-32">
        <div 
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 1200) / 200)),
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
            Join the Revolution
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            Be part of the next generation of technological innovation. Sentinent Technologies is shaping the future, one breakthrough at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/50">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center text-gray-500">
          <p>&copy; 2024 Sentinent Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
