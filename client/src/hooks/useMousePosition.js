import { useState, useEffect, useRef, useCallback } from 'react';

function useMousePosition() {
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    xVelocity: 0,
    yVelocity: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  const last = useRef({ x: 0, y: 0, time: Date.now() });

  const handleMouseMove = useCallback((event) => {
    const now = Date.now();
    const dt = Math.max(now - last.current.time, 1);
    const xVelocity = ((event.clientX - last.current.x) / dt) * 16;
    const yVelocity = ((event.clientY - last.current.y) / dt) * 16;
    last.current = { x: event.clientX, y: event.clientY, time: now };
    setPos({
      x: event.clientX,
      y: event.clientY,
      xVelocity,
      yVelocity,
      normalizedX: (event.clientX / window.innerWidth) * 2 - 1,
      normalizedY: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return pos;
}

export default useMousePosition;