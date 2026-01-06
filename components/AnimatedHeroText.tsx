'use client';

import { useEffect, useState } from 'react';

interface AnimatedHeroTextProps {
  text: string;
  className?: string;
}

export default function AnimatedHeroText({ text, className = '' }: AnimatedHeroTextProps) {
  const [visibleChars, setVisibleChars] = useState<number>(0);
  const [charStates, setCharStates] = useState<Array<{ opacity: number; scale: number; blur: number }>>([]);

  useEffect(() => {
    const chars = text.split('');
    const initialStates = chars.map(() => ({ opacity: 0, scale: 0.5, blur: 20 }));
    setCharStates(initialStates);

    const animationDuration = 2500;
    const delayPerChar = animationDuration / chars.length;
    const animationSteps = 60;
    const stepDuration = 16;

    chars.forEach((_, index) => {
      const startDelay = index * delayPerChar;

      setTimeout(() => {
        let currentStep = 0;

        const charAnimation = setInterval(() => {
          currentStep++;
          const progress = currentStep / animationSteps;
          const easeProgress = 1 - Math.pow(1 - progress, 4);

          setCharStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = {
              opacity: easeProgress,
              scale: 0.5 + easeProgress * 0.5,
              blur: 20 * (1 - easeProgress),
            };
            return newStates;
          });

          if (currentStep >= animationSteps) {
            clearInterval(charAnimation);
          }
        }, stepDuration);
      }, startDelay);
    });

    const totalDuration = animationDuration + (animationSteps * stepDuration);
    const timeout = setTimeout(() => {
      setVisibleChars(chars.length);
    }, totalDuration);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <h1 className={`relative ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-all duration-75"
          style={{
            opacity: charStates[index]?.opacity || 0,
            transform: `scale(${charStates[index]?.scale || 0.5})`,
            filter: `blur(${charStates[index]?.blur || 20}px)`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}
