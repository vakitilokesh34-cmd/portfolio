import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import useReducedMotion from '../../hooks/useReducedMotion';

const FloatingShape = ({ position, color, speed = 1, shape = 'box', scale = 1 }) => {
  const meshRef = useRef();
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.x += 0.002 * speed;
    meshRef.current.rotation.y += 0.003 * speed;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'octahedron': return <octahedronGeometry args={[scale * 0.3, 0]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[scale * 0.3, 0]} />;
      case 'torus': return <torusGeometry args={[scale * 0.2, scale * 0.06, 8, 16]} />;
      case 'icosahedron': return <icosahedronGeometry args={[scale * 0.25, 0]} />;
      default: return <boxGeometry args={[scale * 0.3, scale * 0.3, scale * 0.3]} />;
    }
  }, [shape, scale]);

  return (
    <Float speed={reducedMotion ? 0 : 2} rotationIntensity={reducedMotion ? 0 : 0.5} floatIntensity={reducedMotion ? 0 : 1}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          wireframe
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

const TechLabel = ({ position, text, color = '#5c7cfa' }) => {
  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
      <Text
        position={position}
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
        fillOpacity={0.4}
      >
        {text}
      </Text>
    </Float>
  );
};

const FloatingObjects = () => {
  const shapes = [
    { position: [-3, 2, -2], color: '#5c7cfa', shape: 'octahedron', speed: 0.8 },
    { position: [3.5, -1, -3], color: '#748ffc', shape: 'tetrahedron', speed: 1.2 },
    { position: [-2.5, -2, -1.5], color: '#91a7ff', shape: 'torus', speed: 0.6 },
    { position: [2, 2.5, -2.5], color: '#4c6ef5', shape: 'icosahedron', speed: 1.0 },
    { position: [-4, 0, -4], color: '#4263eb', shape: 'box', speed: 0.9 },
    { position: [4, 1, -3.5], color: '#5c7cfa', shape: 'octahedron', speed: 0.7 },
    { position: [0, -2.5, -2], color: '#748ffc', shape: 'tetrahedron', speed: 1.1 },
  ];

  const techLabels = [
    { position: [-2.5, 3, -3], text: '</>' },
    { position: [3, -2.5, -2], text: '{ }' },
    { position: [-3.5, -1, -3], text: '( )' },
    { position: [2.5, 3, -2], text: '//' },
  ];

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}
      {techLabels.map((label, i) => (
        <TechLabel key={`label-${i}`} {...label} />
      ))}
    </group>
  );
};

export default FloatingObjects;
