import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import AvatarController from './AvatarController';
import ParticleField from './ParticleField';
import FloatingObjects from './FloatingObjects';
import CameraController from './CameraController';
import useMousePosition from '../../hooks/useMousePosition';

const SceneContent = () => {
  const mousePosition = useMousePosition();

  return (
    <>
      <CameraController mousePosition={mousePosition} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, 3, 2]} intensity={0.3} color="#5c7cfa" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#748ffc" distance={8} />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={0.8} intensity={0.3} color="#5c7cfa" />

      {/* Ambient background 3D particles & objects */}
      <ParticleField count={150} />
      <FloatingObjects />

      <fog attach="fog" args={['#101113', 5, 18]} />
    </>
  );
};

const Scene = ({ className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
