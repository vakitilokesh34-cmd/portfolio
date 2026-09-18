import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, ExternalLink, Copy, Check } from 'lucide-react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { portfolioData, defaultProfile } from '../../data/portfolio';
import api from '../../services/api';

/* ─── Particle World Map Canvas ─────────────────────────────────────────── */
const ParticleMap = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate dot grid approximating a world map
    const dots = [];
    const cols = 80;
    const rows = 40;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    // Very rough landmass approximation via exclusion zones for oceans
    const isLand = (x, y, w, h) => {
      const nx = x / w;
      const ny = y / h;
      // Simplified: just render a dense grid but vary opacity by approximate land coords
      // For a nice effect we just render all with varying base opacity
      return true;
    };

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * cellW + cellW / 2;
        const y = r * cellH + cellH / 2;
        dots.push({
          x, y,
          baseOpacity: 0.12 + Math.random() * 0.15,
          size: 1 + Math.random() * 1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.02;

      dots.forEach((dot) => {
        const dx = dot.x - mouseRef.current.x;
        const dy = dot.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 120);
        const pulse = Math.sin(t + dot.pulsePhase) * 0.05;
        const opacity = dot.baseOpacity + influence * 0.6 + pulse;

        const size = dot.size + influence * 2.5;
        const color = influence > 0.3
          ? `rgba(92, 124, 250, ${opacity})`
          : `rgba(255, 255, 255, ${opacity * 0.7})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw glow halo for highlighted dots
        if (influence > 0.5) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, size + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(92, 124, 250, ${influence * 0.15})`;
          ctx.fill();
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto particle-map-canvas"
      style={{ opacity: 0.45 }}
    />
  );
};

/* ─── Floating Label Input ───────────────────────────────────────────────── */
const FloatingInput = ({ label, name, type = 'text', value, onChange, placeholder, required, textarea }) => {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="floating-label-group">
      <Tag
        type={!textarea ? type : undefined}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ' '}
        required={required}
        rows={textarea ? 4 : undefined}
        className={`floating-input ${textarea ? 'resize-none pt-6' : ''}`}
        style={textarea ? { paddingTop: '24px', minHeight: '100px' } : {}}
      />
      <label className={`floating-label ${textarea ? 'floating-textarea-label' : ''}`}>
        {label}
      </label>
    </div>
  );
};

/* ─── Contact Section ────────────────────────────────────────────────────── */
const Contact = () => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.type) setStatus({ type: '', message: '' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/api/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you shortly.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Message queued! You can also email me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative pt-20 md:pt-28 pb-12 overflow-hidden" ref={ref}>

      {/* ── Particle Map Background ─────────────────────────────────────── */}
      <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden pointer-events-none">
        <div className="relative w-full h-full">
          <ParticleMap />
          {/* Fade bottom of particle map into section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090a0d] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Background ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP ROW: Get in Touch + Email */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 pt-12">

          {/* Left: 'Get in touch' heading + email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-2"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-dark-300">
              Connect with me
            </span>

            {/* Giant Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display leading-none mt-2">
              Get in touch
            </h2>

            {/* Giant Clickable Email */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white hover:text-emerald-400 transition-colors tracking-tight font-display break-all"
              >
                {portfolioData.personal.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl glass-card hover:border-emerald-400/40 text-dark-200 hover:text-emerald-400 transition-all"
                title="Copy email"
              >
                {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              </button>
            </div>

            <div className="flex items-center gap-6 mt-3 text-xs text-dark-200 font-mono">
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-primary-400" />
                <span>+91 8074503383</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-primary-400" />
                <span>Nalgonda, Telangana, India</span>
              </span>
            </div>
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col lg:items-end justify-between"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Let's build something
              </h3>
              <p className="text-xs text-dark-200 mt-1">
                Open for software engineering internships, full-time roles & innovative collaborations.
              </p>
            </div>
            <a
              href={`mailto:${portfolioData.personal.email}?subject=Opportunity%20for%20Vakiti%20Lokesh`}
              className="mt-4 px-6 py-2.5 rounded-full bg-white text-dark-950 hover:bg-slate-200 text-xs font-bold transition-all shadow-lg hover:shadow-white/20 flex items-center gap-2 w-max"
            >
              <span>Send Email</span>
              <ExternalLink size={13} />
            </a>
          </motion.div>
        </div>

        {/* MIDDLE: Dev Card + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

          {/* Developer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 glass-studio rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-primary-500/30 shrink-0">
                <img src="/avatar.jpg" alt="Vakiti Lokesh" className="w-full h-full object-cover object-top" />
                <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-dark-900" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Vakiti Lokesh</h4>
                <p className="text-xs text-primary-300 font-mono">B.Tech CSE @ Anurag Univ</p>
                <p className="text-[11px] text-dark-300">CGPA: 9.29 • State 2nd Rank</p>
              </div>
            </div>

            <p className="text-xs text-dark-200 leading-relaxed italic mb-6">
              "I build scalable systems, real-time sync engines, and AI-powered platforms with clean architecture and extreme performance."
            </p>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-300">Availability</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Actively Interviewing
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-300">Response Time</span>
                <span className="text-white font-medium">Within 24 hours</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-dark-300">Email</span>
                <span className="text-primary-300 font-mono">vakitilokesh34@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form with Floating Labels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-7 glass-studio rounded-3xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name / Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingInput
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <FloatingInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </div>

              {/* Row 2: Phone / Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingInput
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                />
                <FloatingInput
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
              </div>

              {/* Message */}
              <FloatingInput
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                required
                textarea
              />

              {/* Status */}
              {status.message && (
                <div className={`flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {status.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Liquid Morph Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="liquid-btn w-full py-3.5 px-6 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-colors shadow-lg hover:shadow-primary-600/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Direct Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* SOCIAL LINKS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-white/10 text-xs font-medium text-dark-200">
          <div className="flex items-center gap-6">
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Vakiti Lokesh's LinkedIn profile"
              title="Open LinkedIn profile"
              className="hover:text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:text-white focus-visible:underline transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Vakiti Lokesh's GitHub profile"
              title="Open GitHub profile"
              className="hover:text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:text-white focus-visible:underline transition-colors flex items-center gap-1.5"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}?subject=Portfolio%20enquiry%20for%20Vakiti%20Lokesh`}
              aria-label="Email Vakiti Lokesh"
              title="Send an email"
              className="hover:text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:text-white focus-visible:underline transition-colors flex items-center gap-1.5"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>
          <p className="text-dark-400 text-[11px]">
            © {new Date().getFullYear()} Vakiti Lokesh. Built with 3D WebGL & React.
          </p>
        </div>

        {/* BOTTOM GIANT "LOKESH" NEON TEXT */}
        <div className="relative w-full pt-10 pb-4 overflow-hidden flex justify-center items-center select-none">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-500/20 via-emerald-500/5 to-transparent blur-2xl pointer-events-none" />
          <h2
            className="font-display text-[19vw] sm:text-[18vw] md:text-[17vw] font-black tracking-tighter uppercase leading-none text-green-glow opacity-90 text-center pointer-events-auto"
            aria-label="Lokesh"
          >
            {Array.from('LOKESH').map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="lokesh-letter"
                style={{ animationDelay: `${index * 70}ms` }}
                aria-hidden="true"
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Contact;
