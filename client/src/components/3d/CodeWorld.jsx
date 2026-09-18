import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const CodePanel = ({ position, color = '#5c7cfa' }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <RoundedBox args={[1.5, 1, 0.05]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#1A1B1E" transparent opacity={0.8} />
        </RoundedBox>
        <Text position={[0, 0.3, 0.03]} fontSize={0.08} color={color} anchorX="center">
          {'const app = () => {'}
        </Text>
        <Text position={[0, 0.18, 0.03]} fontSize={0.08} color="#91a7ff" anchorX="center">
          {'  return <Portfolio />'}
        </Text>
        <Text position={[0, 0.06, 0.03]} fontSize={0.08} color={color} anchorX="center">
          {'}'}
        </Text>
      </group>
    </Float>
  );
};

const TerminalBox = ({ position }) => {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={position}>
        <RoundedBox args={[1.8, 1.2, 0.05]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#141517" transparent opacity={0.9} />
        </RoundedBox>
        <Text position={[0, 0.4, 0.03]} fontSize={0.07} color="#748ffc" anchorX="center">
          {'$ npm run dev'}
        </Text>
        <Text position={[0, 0.28, 0.03]} fontSize={0.07} color="#91a7ff" anchorX="center">
          {'> Building...'}
        </Text>
        <Text position={[0, 0.16, 0.03]} fontSize={0.07} color="#5c7cfa" anchorX="center">
          {'> Ready on :5173'}
        </Text>
      </group>
    </Float>
  );
};

const DatabaseCylinder = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 0.8, 16]} />
          <meshStandardMaterial color="#4263eb" wireframe transparent opacity={0.3} />
        </mesh>
        <Text position={[0, -0.6, 0]} fontSize={0.1} color="#748ffc" anchorX="center">
          MongoDB
        </Text>
      </group>
    </Float>
  );
};

const NetworkNode = ({ position, label }) => {
  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.4}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#5c7cfa" emissive="#5c7cfa" emissiveIntensity={0.3} transparent opacity={0.7} />
        </mesh>
        <Text position={[0, -0.3, 0]} fontSize={0.08} color="#91a7ff" anchorX="center">
          {label}
        </Text>
      </group>
    </Float>
  );
};

const CodeWorldScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#5c7cfa" />
      <pointLight position={[-3, 2, -2]} intensity={0.3} color="#748ffc" />

      <CodePanel position={[-2, 0.5, 0]} />
      <TerminalBox position={[2, 0, 0]} />
      <DatabaseCylinder position={[0, -1, -1]} />

      <NetworkNode position={[-3, -0.5, 1]} label="REST API" />
      <NetworkNode position={[3, 1, -1]} label="React" />
      <NetworkNode position={[0, 1.5, -2]} label="Node.js" />
      <NetworkNode position={[-1, -1.5, 0]} label="Socket.IO" />

      <fog attach="fog" args={['#101113', 4, 12]} />
    </>
  );
};

const CodeWorld = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/5">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CodeWorldScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CodeWorld;
