import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = portfolioData.navLinks.map((link) => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(sections[i]);
          break;
        }
      }

    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled
            ? 'w-[95%] sm:w-[90%] md:w-[82%] lg:w-[75%]'
            : 'w-[95%] sm:w-[92%] md:w-[88%]'
        }`}
      >
        <div
          className={`glass-studio rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'shadow-2xl shadow-black/80 border-white/15' : ''
          }`}
        >
          {/* Logo Brand matching reference reel */}
          <button
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <span className="text-sm sm:text-base font-black text-white tracking-wider uppercase font-display group-hover:text-primary-300 transition-colors">
              VAKITI LOKESH
            </span>
          </button>

          {/* Desktop Nav Links — HOME, ABOUT, SERVICE, PROJECT, CONTACT */}
          <div className="hidden lg:flex items-center gap-6">
            {portfolioData.navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`relative py-1 text-xs font-bold uppercase tracking-widest transition-all duration-200 group ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Underline hover animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 rounded-full ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Controls: Theme Toggle + Hire Me + Mobile Menu */}
          <div className="flex items-center gap-2">

            {/* Dark / Light Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="relative w-[52px] h-7 rounded-full border transition-all duration-400 flex items-center"
              style={{
                background: theme === 'light' ? 'rgba(92,124,250,0.25)' : 'rgba(255,255,255,0.08)',
                borderColor: theme === 'light' ? 'rgba(92,124,250,0.5)' : 'rgba(255,255,255,0.15)',
              }}
              aria-label="Toggle dark/light mode"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <motion.div
                className="absolute top-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center shadow-md"
                style={{ background: theme === 'dark' ? '#e2e8f0' : '#5c7cfa' }}
                animate={{ x: theme === 'dark' ? 3 : 27 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {theme === 'dark' ? (
                  <Moon size={12} className="text-slate-700" />
                ) : (
                  <Sun size={12} className="text-white" />
                )}
              </motion.div>
            </motion.button>

            {/* Quick Contact CTA Button */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold transition-all shadow-lg hover:shadow-primary-600/30"
            >
              <span>Hire Me</span>
              <ExternalLink size={12} />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 rounded-full glass-pill text-dark-100 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed inset-x-4 top-20 z-50 glass-studio rounded-3xl p-5 lg:hidden border border-white/15 shadow-2xl"
          >
            {/* Header with Avatar in Drawer */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-500/50">
                <img src="/avatar.jpg" alt="Vakiti Lokesh" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-display">Vakiti Lokesh</h4>
                <p className="text-xs text-primary-400 font-mono">Software Developer</p>
                <p className="text-[11px] text-dark-300">Anurag University • 9.29 CGPA</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {portfolioData.navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-primary-600 text-white font-bold'
                      : 'text-dark-100 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-dark-300">Nalgonda, Telangana</span>
              {/* Theme toggle in mobile drawer */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs text-dark-200 hover:text-white transition-all"
              >
                {theme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-primary-400" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
