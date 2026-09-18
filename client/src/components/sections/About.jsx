import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Award, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { defaultProfile } from '../../data/portfolio';

// Expanded AI-heavy tech stack for marquee
const MARQUEE_ROW1 = [
  'React.js', 'Node.js', 'FastAPI', 'Python', 'LangChain', 'MCP', 'ChatGPT', 'OpenAI',
  'Socket.IO', 'MongoDB', 'PostgreSQL', 'Agentic AI', 'Prompt Engineering', 'Next.js',
];

const MARQUEE_ROW2 = [
  'Java', 'C', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap',
  'Docker', 'Redis', 'MySQL', 'Blockchain', 'AI / ML', 'REST APIs', 'Material UI',
];

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.15);
  const [cardMouse, setCardMouse] = useState({ x: 0, y: 0 });
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const lastScrollRef = useRef(0);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardMouse({ x: x * 20, y: -y * 20 });
  };

  const handleCardMouseLeave = () => setCardMouse({ x: 0, y: 0 });

  // Scroll-velocity reactive marquee
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const velocity = Math.abs(currentScroll - lastScrollRef.current);
      lastScrollRef.current = currentScroll;

      const factor = 1 + Math.min(velocity * 0.4, 2.5);
      if (marquee1Ref.current) {
        marquee1Ref.current.style.animationDuration = `${30 / factor}s`;
      }
      if (marquee2Ref.current) {
        marquee2Ref.current.style.animationDuration = `${25 / factor}s`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-primary-400" />
          <span className="text-xs uppercase tracking-widest font-mono text-primary-400">Discover</span>
        </motion.div>

        {/* 2-Column Layout: Avatar Card Left + Intro Typography Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT: 3D Interactive Developer Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div
              className="relative w-full max-w-md glass-card rounded-3xl p-4 sm:p-5 group cursor-pointer transition-transform duration-200"
              style={{
                transform: `perspective(1000px) rotateX(${cardMouse.y}deg) rotateY(${cardMouse.x}deg)`,
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              data-cursor="view"
            >
              {/* Dynamic Glare */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${50 + cardMouse.x * 2}% ${50 - cardMouse.y * 2}%, rgba(255,255,255,0.12), transparent 70%)`,
                }}
              />

              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 40px rgba(92,124,250,0.3), inset 0 0 40px rgba(92,124,250,0.05)' }}
              />

              {/* Avatar Portrait */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-dark-900 shadow-inner">
                {/* Default Portrait */}
                <img
                  src="/avatar.jpg"
                  alt="Vakiti Lokesh"
                  className="w-full h-full object-cover object-top transition-all duration-400 group-hover:opacity-0 group-hover:scale-105"
                />

                {/* Iron Man Portrait on Hover */}
                <img
                  src="/ironman.jpg"
                  alt="Iron Man - Vakiti Lokesh"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-400 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:brightness-110 z-10"
                />

                {/* Studio Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent pointer-events-none transition-colors duration-500 group-hover:from-red-950/80" />

                {/* Bottom Overlay Information */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-1.5 z-10">
                  <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-primary-300 w-max flex items-center gap-1.5 transition-all duration-300 group-hover:border-amber-400/50 group-hover:text-amber-300">
                    <Sparkles size={11} className="group-hover:text-cyan-400" />
                    <span className="group-hover:hidden">B.Tech CSE • 9.29 CGPA</span>
                    <span className="hidden group-hover:inline">ARC REACTOR • 100% ONLINE</span>
                  </span>
                  <h3 className="text-xl font-bold text-white transition-colors duration-300">
                    <span className="group-hover:hidden">Vakiti Lokesh</span>
                    <span className="hidden group-hover:inline text-amber-300">⚡ Iron Man Protocol</span>
                  </h3>
                  <p className="text-xs text-dark-200">
                    <span className="group-hover:hidden">Anurag University, Hyderabad • Telangana, India</span>
                    <span className="hidden group-hover:inline text-cyan-300 font-mono">Mark VII Armor Engaged</span>
                  </p>
                </div>
              </div>

              {/* Badges row below avatar */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="glass-pill p-3 rounded-xl">
                  <p className="text-[10px] text-dark-300 uppercase font-mono">Academic Honor</p>
                  <p className="text-xs font-bold text-emerald-400">State 2nd Rank</p>
                </div>
                <div className="glass-pill p-3 rounded-xl">
                  <p className="text-[10px] text-dark-300 uppercase font-mono">Certifications</p>
                  <p className="text-xs font-bold text-primary-300">NPTEL Elite + Gold</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Giant "Intro" Typography + Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Giant 3D Metallic "Intro" Headline */}
            <div className="relative">
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-chrome-3d uppercase select-none">
                Intro
              </h2>
              <span className="text-primary-400 text-sm font-mono tracking-widest uppercase block mt-1">
                Background & Expertise
              </span>
            </div>

            {/* Narrative Glassmorphic Card */}
            <div className="glass-studio rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              {/* Ambient top-right glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />

              <p className="text-base sm:text-lg text-dark-100 font-normal leading-relaxed">
                Hey, I'm <strong className="text-white font-bold">Vakiti Lokesh</strong>. An enthusiastic{' '}
                <span className="text-primary-300 font-semibold">AI Full-Stack Developer</span> who loves to build
                state-of-the-art web and mobile applications at{' '}
                <strong className="text-white">Anurag University, Hyderabad (CGPA: 9.29)</strong>.
              </p>

              <p className="text-sm sm:text-base text-dark-200 font-normal leading-relaxed mt-4">
                I love turning concepts into scalable products using tech stacks like{' '}
                <span className="text-cyan-300 font-medium">React</span>,{' '}
                <span className="text-emerald-400 font-medium">FastAPI</span>,{' '}
                <span className="text-amber-400 font-medium">Node.js</span>,{' '}
                <span className="text-purple-300 font-medium">LangChain</span>, and{' '}
                <span className="text-blue-300 font-medium">artificial intelligence</span> technologies. I always strive
                to build something that{' '}
                <em className="text-white font-medium not-italic">actually matters</em>.
              </p>

              {/* Key Competency Pills */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-white">Full-Stack Scale</p>
                    <p className="text-[11px] text-dark-300">Modern reactive web & microservices</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-white">Agentic AI</p>
                    <p className="text-[11px] text-dark-300">LangChain, MCP, Prompt Engineering</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-white">Real-Time Sync</p>
                    <p className="text-[11px] text-dark-300">Sub-200ms collaborative engines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a
                href="#education"
                className="px-5 py-2.5 rounded-xl glass-card hover:border-primary-500/50 text-white text-xs font-semibold flex items-center gap-2 transition-all hover:bg-white/5"
              >
                <GraduationCap size={15} className="text-primary-400" />
                <span>View Education</span>
              </a>
              <a
                href="#achievements"
                className="px-5 py-2.5 rounded-xl glass-card hover:border-primary-500/50 text-white text-xs font-semibold flex items-center gap-2 transition-all hover:bg-white/5"
              >
                <Award size={15} className="text-amber-400" />
                <span>View Honors</span>
              </a>
              <a
                href={defaultProfile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-primary-600/20"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── SCROLL-VELOCITY TECH TICKER — 2 Rows ───────────────────────── */}
        <div className="mt-20 pt-10 border-t border-white/10 relative overflow-hidden">
          <p className="text-center text-xs uppercase font-mono tracking-widest text-dark-300 mb-6">
            Technologies & Tools I Work With
          </p>

          {/* Gradient Fade Edges */}
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#090a0d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#090a0d] to-transparent z-10 pointer-events-none" />

          {/* Row 1 — left to right */}
          <div className="flex overflow-hidden select-none py-2">
            <div ref={marquee1Ref} className="animate-marquee flex items-center gap-3">
              {MARQUEE_ROW1.concat(MARQUEE_ROW1).map((tech, idx) => (
                <div
                  key={idx}
                  className="px-5 py-2.5 rounded-xl glass-card text-xs font-semibold text-dark-100 hover:text-white hover:border-primary-500/50 transition-colors whitespace-nowrap flex items-center gap-2 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — right to left */}
          <div className="flex overflow-hidden select-none py-2 mt-2">
            <div ref={marquee2Ref} className="animate-marquee-reverse flex items-center gap-3">
              {MARQUEE_ROW2.concat(MARQUEE_ROW2).map((tech, idx) => (
                <div
                  key={idx}
                  className="px-5 py-2.5 rounded-xl glass-card text-xs font-semibold text-dark-100 hover:text-white hover:border-cyan-500/40 transition-colors whitespace-nowrap flex items-center gap-2 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
