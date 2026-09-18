import React, { useState, useCallback, useRef } from 'react';
import Avatar from './Avatar';
import useMousePosition from '../../hooks/useMousePosition';

const AvatarController = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationState, setAnimationState] = useState('idle');
  const mousePosition = useMousePosition();
  const returnToIdleTimer = useRef(null);

  const handleClick = useCallback(() => {
    setAnimationState('wave');
    if (returnToIdleTimer.current) clearTimeout(returnToIdleTimer.current);
    returnToIdleTimer.current = setTimeout(() => setAnimationState('idle'), 1500);
  }, []);

  return (
    <group
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Avatar
        mousePosition={mousePosition}
        isHovered={isHovered}
        onClick={handleClick}
        animationState={animationState}
      />
    </group>
  );
};

export default AvatarController;
