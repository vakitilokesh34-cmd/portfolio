import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Shield, Eye, Palette } from 'lucide-react';
import Avatar, { AVATAR_COLOR_THEMES } from './Avatar';
import useMousePosition from '../../hooks/useMousePosition';

const Avatar3DHero = ({ onAvatarClick }) => {
  const mousePosition = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const [colorMode, setColorMode] = useState('cyan');
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeout = useRef(null);

  const activeTheme = AVATAR_COLOR_THEMES[isHovered ? 'ironman' : colorMode] || AVATAR_COLOR_THEMES.cyan;

  // Sound synthesizer for futuristic UI feedback
  const playSfx = (freq = 440, type = 'sine', duration = 0.2) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastMessage(null), 2500);
  };

  const handleHoverChange = (hovered) => {
    setIsHovered(hovered);
    if (hovered) {
      playSfx(220, 'sawtooth', 0.35);
    }
  };

  const handleClick = () => {
    playSfx(587.33, 'triangle', 0.4);
    showToast(isHovered ? '⚡ JARVIS: Repulsors primed!' : "✨ Vakiti Lokesh: Welcome to my 3D space!");
    onAvatarClick?.();
  };

  const handleColorChange = (themeKey, e) => {
    e.stopPropagation();
    setColorMode(themeKey);
    playSfx(520, 'sine', 0.15);
    showToast(`🎨 Color Theme: ${AVATAR_COLOR_THEMES[themeKey]?.name}`);
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Dynamic 3D Backlight Halo matching active animated theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] md:w-[480px] h-[340px] sm:h-[420px] md:h-[480px] rounded-full blur-3xl pointer-events-none transition-all duration-700 -z-10"
        style={{
          background: isHovered
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, rgba(251, 191, 36, 0.3) 40%, transparent 70%)'
            : `radial-gradient(circle, ${activeTheme.primary}45 0%, ${activeTheme.secondary}25 45%, transparent 70%)`,
        }}
      />

      {/* Main 3D Canvas Stage */}
      <div
        className="relative w-[300px] sm:w-[360px] md:w-[420px] lg:w-[460px] h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px] cursor-grab active:cursor-grabbing"
        onClick={handleClick}
      >
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          {/* Studio 3D Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 6, 5]} intensity={1.0} color="#ffffff" />
          <directionalLight position={[-4, 3, -2]} intensity={0.5} color={activeTheme.secondary} />
          <pointLight position={[0, -2, 2]} intensity={0.8} color={activeTheme.primary} distance={6} />

          <Avatar
            mousePosition={mousePosition}
            isHovered={isHovered}
            colorMode={colorMode}
            onClick={handleClick}
            onHoverChange={handleHoverChange}
          />
        </Canvas>

        {/* High-Tech Holographic HUD Crosshairs on Hover (Iron Man Mode) */}
        {isHovered && (
          <div className="absolute inset-4 pointer-events-none flex flex-col justify-between p-3 z-20 transition-all duration-300">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider font-bold">
              <span className="flex items-center gap-1.5 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                JARVIS // MARK VII
              </span>
              <span className="text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
                ARC: 100%
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 rounded-full border border-cyan-400/40 border-dashed animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-28 h-28 rounded-full border border-red-500/40" />
              <div className="absolute w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_15px_#06b6d4] animate-pulse" />
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono font-semibold">
              <span className="text-cyan-300/90 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">
                REPULSORS: ARMED
              </span>
              <span className="text-red-400 animate-pulse drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]">
                LOCK ON
              </span>
            </div>
          </div>
        )}

        {/* Floating Greeting Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-dark-800/95 border border-primary-500/50 rounded-2xl shadow-2xl backdrop-blur-md text-xs font-semibold text-white whitespace-nowrap flex items-center gap-2"
            >
              <Sparkles size={14} className="text-cyan-400" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Status Pill & Interactive Controls */}
      <div className="mt-1 flex flex-col items-center gap-2.5 z-20">
        {/* Status Badge */}
        <div
          className={`glass-pill px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-white border shadow-xl transition-all duration-300 ${
            isHovered
              ? 'border-amber-400/60 bg-red-950/90 shadow-[0_0_22px_rgba(239,68,68,0.55)]'
              : 'border-white/15 hover:border-primary-400/50'
          }`}
        >
          {isHovered ? (
            <>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-amber-300 font-mono tracking-wider font-bold">⚡ IRON MAN PROTOCOL</span>
            </>
          ) : (
            <>
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeTheme.primary }}
              />
              <span>Vakiti Lokesh</span>
              <span className="text-dark-300">•</span>
              <span className="text-xs font-normal text-dark-200">3D Interactive</span>
            </>
          )}
        </div>

        {/* Animated Suitable Color Scheme Switcher */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-900/80 border border-white/10 backdrop-blur-md shadow-lg">
          <Palette size={13} className="text-dark-300 mr-1" />
          <span className="text-[10px] text-dark-300 uppercase font-mono tracking-wider mr-1 hidden sm:inline">
            Colors:
          </span>
          {Object.entries(AVATAR_COLOR_THEMES)
            .filter(([key]) => key !== 'ironman')
            .map(([key, theme]) => {
              const isSelected = colorMode === key && !isHovered;
              return (
                <button
                  key={key}
                  onClick={(e) => handleColorChange(key, e)}
                  title={theme.name}
                  className={`relative w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: theme.primary }}
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Avatar3DHero;
