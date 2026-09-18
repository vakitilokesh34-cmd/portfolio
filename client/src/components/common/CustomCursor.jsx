import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CURSOR_STATES = {
  default: { size: 12, label: '' },
  hover: { size: 44, label: '' },
  view: { size: 56, label: 'View' },
  play: { size: 56, label: 'Play' },
  click: { size: 8, label: '' },
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactive = target.closest('a, button, [data-cursor], input, textarea');
      if (!interactive) return;

      const cursorAttr = interactive.getAttribute('data-cursor');
      if (cursorAttr === 'play') {
        setCursorState('play');
      } else if (cursorAttr === 'view') {
        setCursorState('view');
      } else if (cursorAttr) {
        setCursorState('hover');
      } else {
        setCursorState('hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor], input, textarea')) {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!isVisible) return null;

  const state = isClicking ? CURSOR_STATES.click : CURSOR_STATES[cursorState];
  const isExpanded = cursorState === 'view' || cursorState === 'play';
  const isHover = cursorState !== 'default';
  const ringSize = state.size;

  return (
    <>
      {/* Inner dot — snappy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicking ? 0.5 : isHover ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30, mass: 0.3 }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>

      {/* Outer morph ring — lag behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        animate={{
          x: position.x - ringSize / 2,
          y: position.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.8 }}
      >
        <motion.div
          className="w-full h-full rounded-full flex items-center justify-center"
          animate={{
            borderWidth: isExpanded ? 2 : 1.5,
            borderColor: isExpanded
              ? 'rgba(255,255,255,0.9)'
              : isHover
              ? 'rgba(92,124,250,0.9)'
              : 'rgba(255,255,255,0.35)',
            background: isExpanded
              ? 'rgba(255,255,255,0.12)'
              : isHover
              ? 'rgba(92,124,250,0.08)'
              : 'transparent',
            backdropFilter: isExpanded ? 'blur(4px)' : 'none',
          }}
          style={{ border: '1.5px solid rgba(255,255,255,0.35)' }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {state.label && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="text-[10px] font-black text-white uppercase tracking-wider select-none"
                style={{ mixBlendMode: 'normal' }}
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
