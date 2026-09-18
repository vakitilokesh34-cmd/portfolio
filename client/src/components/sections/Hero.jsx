import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import useMousePosition from '../../hooks/useMousePosition';

const PORTFOLIO_LETTERS = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Auto-scrolling tech stack marquee
const TECH_MARQUEE = [
  { label: 'React', icon: '⚛' },
  { label: 'Node.js', icon: '🟢' },
  { label: 'FastAPI', icon: '⚡' },
  { label: 'MongoDB', icon: '🍃' },
  { label: 'Python', icon: '🐍' },
  { label: 'TypeScript', icon: '📘' },
  { label: 'Socket.IO', icon: '🔌' },
  { label: 'Redis', icon: '🔴' },
  { label: 'Docker', icon: '🐳' },
  { label: 'Java', icon: '☕' },
  { label: 'MySQL', icon: '🐬' },
  { label: 'Three.js', icon: '🎮' },
  { label: 'LangChain', icon: '🔗' },
  { label: 'Agentic AI', icon: '🧠' },
];

/** Scramble text hook — letters randomize rapidly before settling to metallic font */
const useScrambleText = (target, delay = 150, duration = 1200) => {
  const [displayChars, setDisplayChars] = useState(
    target.map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
  );
  const [settled, setSettled] = useState(target.map(() => false));

  useEffect(() => {
    const timeout = setTimeout(() => {
      const settleInterval = duration / target.length;

      target.forEach((char, index) => {
        let scrambles = 0;
        const maxScrambles = Math.floor(Math.random() * 8) + 6;
        const scrambleTimer = setInterval(() => {
          setDisplayChars((prev) => {
            const next = [...prev];
            next[index] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            return next;
          });
          scrambles++;
          if (scrambles >= maxScrambles) {
            clearInterval(scrambleTimer);
            setTimeout(() => {
              setDisplayChars((prev) => {
                const next = [...prev];
                next[index] = char;
                return next;
              });
              setSettled((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * settleInterval * 0.5);
          }
        }, 55);
      });
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return { displayChars, settled };
};

const Hero = () => {
  const mouse = useMousePosition();
  const marqueeRef = useRef(null);

  // Scramble "PORTFOLIO" on load
  const { displayChars, settled } = useScrambleText(PORTFOLIO_LETTERS, 100, 1100);

  // Mouse tilt calculations for cinematic 3D parallax depth
  const tiltX = (mouse?.normalizedY || 0) * 8;
  const tiltY = (mouse?.normalizedX || 0) * 10;
  const parallaxX = (mouse?.normalizedX || 0) * 14;
  const parallaxY = (mouse?.normalizedY || 0) * 10;

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#09090b] pt-20 sm:pt-24 pb-8"
    >
      {/* ── Studio Background Radial Spotlight ───────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.015) 45%, transparent 75%)',
        }}
      />

      {/* Subtle fine film grain / vignette overlay */}
      <div className="absolute inset-0 studio-vignette pointer-events-none -z-10" />

      {/* ── Main Stage (Centered Typography & Portrait) ──────────────────────── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center">

        <div className="relative w-full flex items-center justify-center min-h-[460px] sm:min-h-[540px] md:min-h-[620px] lg:min-h-[680px]">

          {/* 1. GIANT METALLIC "PORTFOLIO" BACKGROUND TEXT */}
          <div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0"
            style={{
              transform: `perspective(1000px) rotateX(${tiltX * 0.25}deg) rotateY(${tiltY * 0.25}deg)`,
              transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <h1
              className="font-display font-black tracking-tighter uppercase leading-none text-center flex items-center justify-center select-none"
              style={{
                fontSize: 'clamp(3.8rem, 14.5vw, 15rem)',
                letterSpacing: '-0.035em',
              }}
            >
              <span
                className="portfolio-wordmark"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 30%, #94A3B8 62%, #475569 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PORTFOLIO
              </span>
            </h1>
          </div>

          {/* 2. REALISTIC CUTOUT PORTRAIT (Centered Foreground) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center select-none pointer-events-none"
            style={{
              transform: `perspective(1000px) rotateX(${tiltX * 0.4}deg) rotateY(${tiltY * 0.4}deg) translate(${parallaxX * -0.3}px, ${parallaxY * -0.3}px)`,
              transition: 'transform 0.12s ease-out',
            }}
          >
            {/* Soft halo glow behind portrait to accent silhouette */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] md:w-[500px] h-[300px] sm:h-[420px] md:h-[500px] rounded-full blur-3xl pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)',
              }}
            />

            {/* Cutout Image of Vakiti Lokesh */}
            <div className="relative w-[280px] sm:w-[360px] md:w-[440px] lg:w-[490px] xl:w-[520px] flex items-end justify-center">
              <img
                src="/avatar_cutout.png"
                alt="Vakiti Lokesh - Software Developer"
                className="w-full h-auto object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)] select-none pointer-events-none"
                style={{
                  // Smooth bottom fade into dark canvas
                  maskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 94%, transparent 100%)',
                }}
              />
            </div>

          </motion.div>

          {/* 3. LOWER-LEFT: "Software Developer" TITLE (Matches Reel) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute left-2 sm:left-6 md:left-10 bottom-12 sm:bottom-16 md:bottom-20 z-20 pointer-events-auto"
          >
            <h2 className="flex items-baseline gap-2 leading-none">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display">
                Software
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic font-light text-slate-300">
                Developer
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-1.5 tracking-wide">
              Anurag University • B.Tech CSE (9.29 CGPA)
            </p>
          </motion.div>

          {/* 4. LOWER-RIGHT: MINIMAL CONTACT BUTTON (Matches Reel) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute right-2 sm:right-6 md:right-10 bottom-12 sm:bottom-16 md:bottom-20 z-20 pointer-events-auto"
          >
            <a
              href="#contact"
              data-cursor="play"
              className="magnetic-btn group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all shadow-lg hover:border-white/40"
            >
              <span>Contact</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </motion.div>

        </div>

      </div>

      {/* ── AUTO-SCROLLING TECH MARQUEE (Bottom Edge) ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="w-full relative overflow-hidden py-2 select-none pointer-events-auto"
      >
        {/* Soft horizontal fade gradients */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden select-none py-1">
          <div ref={marqueeRef} className="animate-marquee flex items-center gap-3">
            {TECH_MARQUEE.concat(TECH_MARQUEE).map((tech, idx) => (
              <div
                key={idx}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white whitespace-nowrap flex items-center gap-2 border border-white/10 hover:border-white/30 transition-all cursor-default"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="text-sm">{tech.icon}</span>
                <span>{tech.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Subtle Scroll Down Indicator ─────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center gap-1 cursor-pointer opacity-50 hover:opacity-100 transition-opacity mt-2"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400">Scroll</span>
        <ArrowDown size={12} className="text-slate-400 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
