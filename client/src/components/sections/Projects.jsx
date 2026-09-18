import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ExternalLink, Github, X, ChevronRight, Sparkles, Terminal, Shield, Droplets, Cpu, CheckCircle2, Bot, Monitor } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { portfolioData } from '../../data/portfolio';

/* ─── Circuit Board Animated SVG (for AI/Automation projects) ───────────── */
const CircuitBoardBg = ({ color = '#a855f7' }) => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    viewBox="0 0 300 220"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Circuit lines */}
    {[
      'M10,50 L80,50 L80,20 L180,20 L180,50 L250,50',
      'M10,100 L50,100 L50,150 L150,150 L150,100 L290,100',
      'M10,170 L100,170 L100,130 L200,130 L200,170 L290,170',
      'M80,20 L80,0',
      'M180,50 L180,70 L250,70',
      'M150,100 L150,80 L220,80',
      'M50,150 L50,200',
      'M200,130 L200,110 L270,110',
    ].map((d, i) => (
      <path
        key={i}
        d={d}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        filter="url(#glow)"
        className="circuit-line"
        style={{ animationDelay: `${i * 0.5}s` }}
      />
    ))}
    {/* Circuit nodes */}
    {[
      [80, 50], [180, 20], [180, 50], [150, 100], [150, 150],
      [50, 150], [200, 130], [80, 20], [50, 100],
    ].map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r="4"
        fill={color}
        filter="url(#glow)"
        className="circuit-node"
        style={{ animationDelay: `${i * 0.3}s` }}
      />
    ))}
  </svg>
);

/* ─── Neural Network SVG (AI projects) ─────────────────────────────────── */
const NeuralNetBg = ({ color = '#06b6d4' }) => (
  <svg
    className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
    viewBox="0 0 300 220"
    preserveAspectRatio="xMidYMid slice"
  >
    {/* Connections */}
    {[
      [30, 40, 120, 80], [30, 110, 120, 80], [30, 180, 120, 140],
      [120, 80, 210, 60], [120, 80, 210, 110], [120, 140, 210, 110],
      [120, 140, 210, 170], [210, 60, 270, 110], [210, 110, 270, 110],
      [210, 170, 270, 110],
    ].map(([x1, y1, x2, y2], i) => (
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="0.8" opacity="0.5"
        className="neural-node"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
    {/* Nodes */}
    {[
      [30, 40], [30, 110], [30, 180],
      [120, 80], [120, 140],
      [210, 60], [210, 110], [210, 170],
      [270, 110],
    ].map(([cx, cy], i) => (
      <circle
        key={i} cx={cx} cy={cy} r={i === 8 ? 7 : 5}
        fill={color} opacity="0.7"
        className="neural-node"
        style={{ animationDelay: `${i * 0.25}s` }}
      />
    ))}
  </svg>
);

/* ─── Project 3D Visual Cards ─────────────────────────────────────────── */
const Project3DVisual = ({ type, color }) => {
  switch (type) {
    case 'ai':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] rounded-2xl bg-gradient-to-br from-purple-950/80 via-dark-900 to-black p-6 flex flex-col justify-between overflow-hidden border border-purple-500/20 shadow-2xl group-hover:border-purple-500/50 transition-all">
          <CircuitBoardBg color="#a855f7" />
          <NeuralNetBg color="#a855f7" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="text-purple-400" size={18} />
              <span className="text-[11px] font-mono text-purple-300">AI Automation Engine</span>
            </div>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-purple-300">
              GPT-4 • LangChain
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center py-4">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-purple-500/30 border-dashed animate-spin" style={{ animationDuration: '12s' }} />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
                <Bot size={20} className="text-white" />
              </div>
            </div>
            <p className="text-xs text-purple-300 font-mono mt-3 text-center">Autonomous DM Responses</p>
            <div className="flex gap-1.5 mt-2">
              {['Lead Qualify', 'Sentiment', 'Auto-Reply'].map(t => (
                <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20">{t}</span>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-dark-300">
            <span>Model: <strong className="text-white">GPT-4 Turbo</strong></span>
            <span>Type: <strong className="text-white">Agentic AI</strong></span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent pointer-events-none" />
        </div>
      );

    case 'desktop':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] rounded-2xl bg-gradient-to-br from-amber-950/80 via-dark-900 to-black p-6 flex flex-col justify-between overflow-hidden border border-amber-500/20 shadow-2xl group-hover:border-amber-500/50 transition-all">
          <CircuitBoardBg color="#f59e0b" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="text-amber-400" size={18} />
              <span className="text-[11px] font-mono text-amber-300">Desktop Assistant</span>
            </div>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-amber-300">
              {'<'}300ms Response
            </span>
          </div>
          <div className="relative z-10 font-mono text-xs space-y-1.5 py-3">
            <p className="text-dark-400">{'// Voice Command Processing'}</p>
            <p><span className="text-amber-400">USER:</span> <span className="text-white">"Open Chrome and search AI news"</span></p>
            <p><span className="text-emerald-400">AI:</span> <span className="text-emerald-300">Opening Chrome... Searching...</span></p>
            <p><span className="text-cyan-400">SYS:</span> <span className="text-cyan-300">{'chrome.exe launched ✓'}</span></p>
          </div>
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-dark-300">
            <span>Engine: <strong className="text-white">LangChain</strong></span>
            <span>TTS: <strong className="text-white">pyttsx3</strong></span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-transparent pointer-events-none" />
        </div>
      );

    case 'code':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] rounded-2xl bg-gradient-to-br from-indigo-950/80 via-dark-900 to-black p-6 flex flex-col justify-between overflow-hidden border border-indigo-500/20 shadow-2xl group-hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[11px] font-mono text-dark-300 ml-2">collab-editor.jsx</span>
            </div>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400">
              ● Live Sync {'<'}200ms
            </span>
          </div>
          <div className="font-mono text-xs text-indigo-300/90 space-y-1.5 py-4">
            <p className="text-dark-400">{'// Real-time multi-client sync'}</p>
            <p><span className="text-pink-400">const</span> socket = io(<span className="text-emerald-300">'wss://collab.live'</span>);</p>
            <p>socket.on(<span className="text-emerald-300">'code_delta'</span>, <span className="text-amber-300">(delta)</span> {'=>'} {'{'}</p>
            <p className="pl-4 text-emerald-300">applyOperationalTransform(delta);</p>
            <p className="pl-4 text-cyan-300">broadcastCursor(user.position);</p>
            <p>{'}'});</p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-dark-300">
            <span>Accuracy: <strong className="text-white">99%</strong></span>
            <span>Auth: <strong className="text-white">JWT + Rooms</strong></span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
      );

    case 'blockchain':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] rounded-2xl bg-gradient-to-br from-cyan-950/80 via-dark-900 to-black p-6 flex flex-col justify-between overflow-hidden border border-cyan-500/20 shadow-2xl group-hover:border-cyan-500/50 transition-all">
          <NeuralNetBg color="#06b6d4" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="text-cyan-400" size={18} />
              <span className="text-[11px] font-mono text-cyan-300">AI / Blockchain Mesh</span>
            </div>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-cyan-300">
              92% Accuracy • 1.2s
            </span>
          </div>
          <div className="relative z-10 flex items-center justify-center py-6">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-dashed animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-2 rounded-full border border-blue-400/40" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40 transform group-hover:rotate-45 transition-transform duration-500">
                <Shield size={24} className="text-white" />
              </div>
            </div>
          </div>
          <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-dark-300">
            <span>Audit: <strong className="text-white">Tamper-Proof</strong></span>
            <span>Latency: <strong className="text-white">1.2s Inferences</strong></span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
      );

    case 'water':
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] rounded-2xl bg-gradient-to-br from-sky-950/80 via-dark-900 to-black p-6 flex flex-col justify-between overflow-hidden border border-sky-500/20 shadow-2xl group-hover:border-sky-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="text-sky-400" size={18} />
              <span className="text-[11px] font-mono text-sky-300">IoT Telemetry Node</span>
            </div>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-sky-300">
              Real-Time Alerting
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <div className="text-2xl font-bold font-mono text-white">98.4% Flow Health</div>
            <p className="text-[11px] text-dark-300">Telemetry synced with Java Servlets & MySQL</p>
            <div className="w-full max-w-xs bg-dark-700 rounded-full h-2 overflow-hidden mt-2">
              <div className="bg-sky-400 h-full rounded-full" style={{ width: '84%' }} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-dark-300">
            <span>Backend: <strong className="text-white">Java Servlets</strong></span>
            <span>DB: <strong className="text-white">MySQL Cluster</strong></span>
          </div>
        </div>
      );

    default: // shield
      return (
        <div className="relative w-full h-full min-h-[220px] sm:min-h-[260px] rounded-2xl bg-gradient-to-br from-emerald-950/80 via-dark-900 to-black p-6 flex flex-col justify-between overflow-hidden border border-emerald-500/20 shadow-2xl group-hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="text-emerald-400" size={18} />
              <span className="text-[11px] font-mono text-emerald-300">Distributed Rate Limiter</span>
            </div>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400">
              Sub-1ms Overhead
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 space-y-1">
            <div className="text-3xl font-bold font-mono text-white">10,000 req/s</div>
            <p className="text-[11px] text-dark-300">Sliding Window Redis Throttling</p>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] text-dark-300">
            <span>Cache: <strong className="text-white">Redis Cluster</strong></span>
            <span>Stress Test: <strong className="text-white">Zero Drops</strong></span>
          </div>
        </div>
      );
  }
};

/* ─── Magnetic Button ────────────────────────────────────────────────────── */
const MagneticButton = ({ href, children, className, 'data-cursor': dataCursor }) => {
  const btnRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 0.35;
    btn.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.07)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0,0) scale(1)';
    }
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} magnetic-btn`}
      style={{ transition: 'transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.2s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
    >
      {children}
    </a>
  );
};

/* ─── Project Showcase Card ──────────────────────────────────────────────── */
const ProjectShowcaseCard = ({ project, index, isVisible, onSelect }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isAI = project.visualType === 'ai' || project.visualType === 'desktop' || project.visualType === 'blockchain';

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="glass-studio rounded-3xl p-6 md:p-8 relative overflow-hidden group cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      data-cursor="view"
    >
      {/* Circuit board overlay for AI projects */}
      {isAI && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-30">
          <CircuitBoardBg color={project.themeColor} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Interactive Visual */}
        <div className="lg:col-span-5">
          <Project3DVisual type={project.visualType} color={project.themeColor} />
        </div>

        {/* Right: Project Info */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-bold text-primary-400 tracking-wider">
                {project.index || `0${index + 1}`}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-dark-300">
                {project.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase leading-tight group-hover:text-primary-300 transition-colors">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-dark-200 mt-3 leading-relaxed">
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights && (
              <ul className="mt-4 space-y-1.5">
                {project.highlights.slice(0, 2).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-dark-200">
                    <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Pills */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-dark-800/80 text-dark-100 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons — Magnetic with lime Demo + black GitHub */}
          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
            {project.liveUrl && (
              <MagneticButton
                href={project.liveUrl}
                data-cursor="play"
                className="px-5 py-2.5 rounded-full bg-[#a3e635] hover:bg-[#bef264] text-black font-bold text-xs flex items-center gap-2 shadow-lg hover:shadow-[#a3e635]/30 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </MagneticButton>
            )}

            <MagneticButton
              href={project.githubUrl}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold text-xs flex items-center gap-2 transition-all hover:bg-white/10 bg-transparent"
            >
              <Github size={14} />
              <span>GitHub</span>
            </MagneticButton>

            <button
              onClick={() => onSelect(project)}
              className="ml-auto text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 font-semibold"
            >
              Details <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Projects Section ───────────────────────────────────────────────────── */
const Projects = () => {
  const [ref, isVisible] = useScrollAnimation(0.05);
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary-400" />
              <span className="text-xs uppercase tracking-widest font-mono text-primary-400">Engineering Work</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase"
            >
              Featured <span className="text-chrome-3d">Projects</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm text-dark-200 max-w-md font-normal leading-relaxed"
          >
            AI-powered platforms, scalable real-time systems, and distributed infrastructure — built with cutting-edge technology.
          </motion.p>
        </div>

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectShowcaseCard
              key={project._id || i}
              project={project}
              index={i}
              isVisible={isVisible}
              onSelect={setSelectedProject}
            />
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-studio rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Circuit bg in modal for AI projects */}
              {(selectedProject.visualType === 'ai' || selectedProject.visualType === 'desktop') && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20">
                  <CircuitBoardBg color={selectedProject.themeColor} />
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono text-primary-400 uppercase tracking-wider">
                      {selectedProject.index} • {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-xl glass-card text-dark-200 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-sm text-dark-100 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {selectedProject.highlights && (
                  <div className="mb-6">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-3">
                      Key Architectural Highlights
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-dark-200 leading-relaxed">
                          <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-primary-400 mb-2">
                    Stack & Tooling
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-dark-800 text-dark-100 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  {selectedProject.liveUrl && (
                    <MagneticButton
                      href={selectedProject.liveUrl}
                      data-cursor="play"
                      className="px-6 py-2.5 rounded-full bg-[#a3e635] hover:bg-[#bef264] text-black font-bold text-xs flex items-center gap-2"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </MagneticButton>
                  )}
                  <MagneticButton
                    href={selectedProject.githubUrl}
                    className="px-6 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold text-xs flex items-center gap-2 hover:bg-white/10 bg-transparent"
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
