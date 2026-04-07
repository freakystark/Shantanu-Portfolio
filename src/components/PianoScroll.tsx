import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const PianoScroll = () => {
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Number of keys to show in the sidebar
  const keyCount = 24; 
  
  // Audio context for synthesized piano sounds
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const playNote = (index: number) => {
    if (!audioCtx) return;
    
    const now = audioCtx.currentTime;
    // Frequency for C#3 is approx 138.59 Hz
    const baseFreq = 138.59; 
    const freq = baseFreq * Math.pow(2, index / 12);

    const createOscillator = (f: number, type: OscillatorType, volume: number) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(f, now);
      
      // Piano-like envelope: sharp attack, natural decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      return osc;
    };

    // Layering oscillators for a richer, more "piano-like" timbre
    const osc1 = createOscillator(freq, 'triangle', 0.12);
    const osc2 = createOscillator(freq * 2, 'sine', 0.06); // First harmonic
    const osc3 = createOscillator(freq * 3, 'sine', 0.03); // Second harmonic

    [osc1, osc2, osc3].forEach(osc => {
      osc.start(now);
      osc.stop(now + 1.2);
    });
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioCtx) {
        setAudioCtx(new (window.AudioContext || (window as any).webkitAudioContext)());
      }
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('scroll', handleFirstInteraction);
    window.addEventListener('click', handleFirstInteraction);
    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, [audioCtx]);
  
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.floor(latest * (keyCount - 1));
      if (index !== activeIndex) {
        setActiveIndex(index);
        playNote(index);
      }
    });
  }, [scrollYProgress, keyCount, activeIndex, audioCtx]);

  return (
    <div className={cn(
      "fixed z-50 pointer-events-none transition-all duration-500",
      // Mobile: Horizontal at top, smaller and more transparent
      "top-0 left-0 w-full h-8 flex items-center justify-center px-4 opacity-40",
      // Desktop: Vertical at right, full opacity
      "md:top-0 md:right-0 md:left-auto md:w-12 md:h-screen md:flex-col md:items-end md:justify-center md:pr-2 md:opacity-100"
    )}>
      <div className={cn(
        "flex gap-[1px] md:gap-[2px]",
        "flex-row md:flex-col"
      )}>
        {Array.from({ length: keyCount }).map((_, i) => {
          const isBlack = [1, 3, 6, 8, 10].includes(i % 12);
          const isActive = i === activeIndex;
          
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                [window.innerWidth < 768 ? 'y' : 'x']: isActive ? (window.innerWidth < 768 ? 6 : -10) : 0,
                backgroundColor: isActive 
                  ? (isBlack ? '#C5A059' : '#fff') 
                  : (isBlack ? '#1A1A1A' : '#FDFCF0'),
                scale: isActive ? 1.1 : 1,
              }}
              className={cn(
                "rounded-sm transition-colors duration-200",
                // Mobile sizes: even smaller
                "w-3 h-6 md:w-10 md:h-6",
                isBlack ? "w-2 h-4 md:w-6 md:h-6 z-10 -mx-1 md:-mx-0 md:-my-3" : "border border-piano-ebony/10",
                isActive && "shadow-lg z-20 opacity-100"
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
