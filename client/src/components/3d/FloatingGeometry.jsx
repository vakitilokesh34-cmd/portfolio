import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import useMousePosition from '../../hooks/useMousePosition';

/**
 * Floating icosahedron + torus geometry that reacts to mouse + scroll
 */
const GeometryMesh = ({ mouse, scrollY }) => {
  const icoRef = useRef();
  const torusRef = useRef();
  const torusKnotRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mx = (mouse?.normalizedX || 0);
    const my = (mouse?.normalizedY || 0);
    const scroll = scrollY * 0.001;

    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.15 + my * 0.3;
      icoRef.current.rotation.y = t * 0.2 + mx * 0.4;
      icoRef.current.position.y = Math.sin(t * 0.5) * 0.3 - scroll * 0.5;
      icoRef.current.position.x = mx * 0.5;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.1 - my * 0.2;
      torusRef.current.rotation.y = t * 0.18 + mx * 0.3;
      torusRef.current.rotation.z = t * 0.08;
      torusRef.current.position.y = Math.cos(t * 0.4) * 0.4 - scroll * 0.3;
      torusRef.current.position.x = -mx * 0.4 + 2.5;
    }

    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.x = t * 0.12 + my * 0.15;
      torusKnotRef.current.rotation.y = t * 0.22 - mx * 0.2;
      torusKnotRef.current.position.y = Math.sin(t * 0.35 + 1) * 0.35 - scroll * 0.4;
      torusKnotRef.current.position.x = mx * 0.3 - 2.5;
    }
  });

  return (
    <>
      {/* Central Icosahedron — wireframe */}
      <mesh ref={icoRef} position={[0, 0, -2]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#5c7cfa"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Right Torus — solid with glow */}
      <mesh ref={torusRef} position={[2.5, 0, -3]}>
        <torusGeometry args={[0.7, 0.25, 16, 60]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>

      {/* Left Torus Knot */}
      <mesh ref={torusKnotRef} position={[-2.5, 0, -3]}>
        <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>

      {/* Ambient + directional lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#5c7cfa" />
      <pointLight position={[-2, -2, 1]} intensity={0.3} color="#06b6d4" />
    </>
  );
};

const FloatingGeometry = () => {
  const mouse = useMousePosition();
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <GeometryMesh mouse={mouse} scrollY={scrollRef.current} />
      </Canvas>
    </div>
  );
};

export default FloatingGeometry;
