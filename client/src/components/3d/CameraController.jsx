import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useReducedMotion from '../../hooks/useReducedMotion';

const CameraController = ({ mousePosition }) => {
  const { camera } = useThree();
  const reducedMotion = useReducedMotion();
  const targetPosition = useRef(new THREE.Vector3(0, 0.5, 4));

  useFrame(() => {
    if (reducedMotion || !mousePosition) return;

    const targetX = mousePosition.normalizedX * 0.3;
    const targetY = 0.5 + mousePosition.normalizedY * 0.15;

    targetPosition.current.set(targetX, targetY, 4);
    camera.position.lerp(targetPosition.current, 0.02);
    camera.lookAt(0, 0.5, 0);
  });

  return null;
};

export default CameraController;
