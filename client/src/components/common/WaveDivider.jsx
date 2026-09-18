import React from 'react';

/**
 * WaveDivider — animated SVG blob/wave shape used between sections
 * @param {string} flip - 'top' or 'bottom' to control orientation
 * @param {string} from - from-color class
 * @param {string} to - to-color class (background beneath)
 */
const WaveDivider = ({ flip = false, colorFrom = '#090a0d', colorTo = 'transparent', className = '' }) => {
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height: '80px', transform: flip ? 'scaleY(-1)' : 'none' }}
    >
      {/* Animated wave SVG */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id={`wave-grad-${flip ? 'flipped' : 'normal'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Back wave — slower */}
        <path
          className="wave-back"
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={colorFrom}
          fillOpacity="0.4"
          style={{
            animation: 'waveMove1 8s ease-in-out infinite alternate',
          }}
        />

        {/* Front wave — faster */}
        <path
          className="wave-front"
          d="M0,50 C180,10 360,80 540,50 C720,20 900,80 1080,50 C1260,20 1360,60 1440,50 L1440,80 L0,80 Z"
          fill={colorFrom}
          fillOpacity="1"
          style={{
            animation: 'waveMove2 6s ease-in-out infinite alternate',
          }}
        />
      </svg>

      <style>{`
        @keyframes waveMove1 {
          0% { d: path("M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"); }
          100% { d: path("M0,55 C200,10 440,75 720,45 C1000,15 1220,70 1440,35 L1440,80 L0,80 Z"); }
        }
        @keyframes waveMove2 {
          0% { d: path("M0,50 C180,10 360,80 540,50 C720,20 900,80 1080,50 C1260,20 1360,60 1440,50 L1440,80 L0,80 Z"); }
          100% { d: path("M0,35 C200,70 380,15 560,55 C740,85 920,25 1100,55 C1280,75 1380,30 1440,45 L1440,80 L0,80 Z"); }
        }
      `}</style>
    </div>
  );
};

export default WaveDivider;
