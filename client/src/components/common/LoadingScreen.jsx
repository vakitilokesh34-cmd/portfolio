import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_LETTERS = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];
const LETTER_STAGGER = 0.16;
const LETTER_DURATION = 0.55;
const PHOTO_DELAY = INTRO_LETTERS.length * LETTER_STAGGER + LETTER_DURATION + 0.25;
const HOLD_MS = 1100;
const TOTAL_DONE_MS = (PHOTO_DELAY + 1.1) * 1000 + HOLD_MS;

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 70,
    rotateX: -90,
    scale: 1.1,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * LETTER_STAGGER,
      duration: LETTER_DURATION,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);
  return reduced;
};

const LoadingScreen = () => {
  const reduced = usePrefersReducedMotion();
  const [showPhoto, setShowPhoto] = useState(reduced);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setShowPhoto(true);
      const t = setTimeout(() => setDone(true), 250);
      return () => clearTimeout(t);
    }
    const photoTimer = setTimeout(() => setShowPhoto(true), PHOTO_DELAY * 1000);
    const doneTimer = setTimeout(() => setDone(true), TOTAL_DONE_MS);
    return () => {
      clearTimeout(photoTimer);
      clearTimeout(doneTimer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#09090b] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Studio background spotlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 62% 55% at 50% 48%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.015) 45%, transparent 75%)',
            }}
          />
          <div className="absolute inset-0 studio-vignette pointer-events-none" />

          {/* Giant PORTFOLIO letters — appear one by one */}
          <motion.h1
            className="relative font-display font-black tracking-tighter uppercase leading-none text-center select-none pointer-events-none"
            style={{
              fontSize: 'clamp(3.8rem, 14.5vw, 15rem)',
              letterSpacing: '-0.035em',
              perspective: 1000,
            }}
          >
            {INTRO_LETTERS.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial={reduced ? 'visible' : 'hidden'}
                animate="visible"
                className="inline-block text-chrome-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Cutout photo — fades in after letters settle */}
          <AnimatePresence>
            {showPhoto && (
              <motion.div
                initial={{ opacity: 0, y: 45, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              >
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: 'clamp(320px, 42vw, 560px)',
                    height: 'clamp(320px, 42vw, 560px)',
                    background:
                      'radial-gradient(circle, rgba(141,162,192,0.14) 0%, rgba(141,162,192,0.05) 48%, transparent 72%)',
                    maskImage: 'radial-gradient(circle, black 40%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 75%)',
                  }}
                />
                <img
                  src="/avatar_cutout.png"
                  alt="Vakiti Lokesh - Software Developer"
                  className="relative z-10 w-[240px] sm:w-[340px] md:w-[440px] lg:w-[500px] h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 92%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 92%, transparent 100%)',
                  }}
                />

                {/* Name tagline under photo */}
                <motion.p
                  initial={{ opacity: 0, y: 14, letterSpacing: '0.2em' }}
                  animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
                  transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                  className="relative z-10 mt-[-1.5rem] text-xs sm:text-sm font-mono uppercase text-white/60"
                >
                  Vakiti Lokesh
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
