import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Color themes with vibrant, suitable cybernetic aesthetics
export const AVATAR_COLOR_THEMES = {
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#22d3ee',
    light: '#67e8f9',
    ring1: '#06b6d4',
    ring2: '#6366f1',
  },
  violet: {
    id: 'violet',
    name: 'Cosmic Violet',
    primary: '#a855f7',
    secondary: '#6366f1',
    accent: '#c084fc',
    light: '#e879f9',
    ring1: '#9333ea',
    ring2: '#ec4899',
  },
  emerald: {
    id: 'emerald',
    name: 'Matrix Emerald',
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#34d399',
    light: '#6ee7b7',
    ring1: '#10b981',
    ring2: '#0284c7',
  },
  amber: {
    id: 'amber',
    name: 'Solar Flare',
    primary: '#f59e0b',
    secondary: '#ef4444',
    accent: '#fbbf24',
    light: '#fde047',
    ring1: '#f59e0b',
    ring2: '#ea580c',
  },
  ironman: {
    id: 'ironman',
    name: 'Iron Mark VII',
    primary: '#ef4444',
    secondary: '#fbbf24',
    accent: '#06b6d4',
    light: '#f87171',
    ring1: '#dc2626',
    ring2: '#eab308',
  },
};

const AvatarMesh = ({
  mousePosition,
  isHovered,
  colorMode = 'cyan',
  onClick,
  onHoverChange,
}) => {
  const groupRef = useRef();
  const avatarCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particleGroupRef = useRef();
  const orbitLightRef = useRef();

  const [clicked, setClicked] = useState(false);
  const clickTimeout = useRef(null);

  // Load avatar and Iron Man textures
  const [texture, ironmanTexture] = useLoader(THREE.TextureLoader, ['/avatar.jpg', '/ironman.jpg']);
  useMemo(() => {
    if (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
    }
    if (ironmanTexture) {
      ironmanTexture.generateMipmaps = true;
      ironmanTexture.minFilter = THREE.LinearMipmapLinearFilter;
    }
  }, [texture, ironmanTexture]);

  const activeTheme = AVATAR_COLOR_THEMES[isHovered ? 'ironman' : colorMode] || AVATAR_COLOR_THEMES.cyan;

  // Particle positions for aura
  const auraParticles = useMemo(() => {
    const coords = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      const radius = 1.3 + Math.random() * 0.7;
      const y = (Math.random() - 0.5) * 2.2;
      coords.push({
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        size: Math.random() * 0.04 + 0.02,
        speed: Math.random() * 0.8 + 0.5,
      });
    }
    return coords;
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    setClicked(true);
    onClick?.();
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => setClicked(false), 1600);
  };

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // 1. Idle Floating Bob
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.09;
    }

    // 2. Head & Core Tracking towards Mouse
    if (avatarCoreRef.current && mousePosition) {
      const targetRotY = THREE.MathUtils.clamp((mousePosition.normalizedX || 0) * 0.5, -0.5, 0.5);
      const targetRotX = THREE.MathUtils.clamp(-(mousePosition.normalizedY || 0) * 0.35, -0.35, 0.35);
      avatarCoreRef.current.rotation.y = THREE.MathUtils.lerp(avatarCoreRef.current.rotation.y, targetRotY, 0.08);
      avatarCoreRef.current.rotation.x = THREE.MathUtils.lerp(avatarCoreRef.current.rotation.x, targetRotX, 0.08);
    }

    // 3. Gyroscopic Orbital Rings Rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.55;
      ring1Ref.current.rotation.y = t * 0.75;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.65;
      ring2Ref.current.rotation.z = t * 0.85;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = -t * 0.45;
      ring3Ref.current.rotation.z = -t * 0.35;
    }

    // 4. Orbiting Dynamic Point Light with Animated Colors
    if (orbitLightRef.current) {
      orbitLightRef.current.position.x = Math.sin(t * 2) * 2.2;
      orbitLightRef.current.position.z = Math.cos(t * 2) * 2.2;
      orbitLightRef.current.position.y = Math.sin(t * 1.5) * 1.2;
    }

    // 5. Swirling Particle Aura Rotation
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = t * 0.3;
    }

    // 6. Click 360-spin burst
    if (groupRef.current) {
      if (clicked) {
        groupRef.current.rotation.y += delta * 7.5;
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.08);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={() => onHoverChange?.(true)}
      onPointerOut={() => onHoverChange?.(false)}
      scale={isHovered ? 1.05 : 1}
    >
      {/* Dynamic Colored Orbiting Point Light */}
      <pointLight
        ref={orbitLightRef}
        color={activeTheme.accent}
        intensity={1.8}
        distance={6}
      />

      {/* Central 3D Avatar Unit */}
      <group ref={avatarCoreRef}>
        {/* Front Face: Avatar Portrait */}
        <mesh position={[0, 0, 0.04]}>
          <circleGeometry args={[0.88, 64]} />
          <meshStandardMaterial
            map={isHovered ? ironmanTexture : texture}
            roughness={isHovered ? 0.15 : 0.25}
            metalness={isHovered ? 0.8 : 0.15}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Outer Glowing Neon Bezel Ring */}
        <mesh position={[0, 0, 0.045]}>
          <ringGeometry args={[0.86, 0.93, 64]} />
          <meshStandardMaterial
            color={activeTheme.primary}
            emissive={activeTheme.primary}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>

        {/* Holographic Arc Segment Accents */}
        <mesh position={[0, 0, 0.05]} rotation={[0, 0, 0.3]}>
          <ringGeometry args={[0.96, 0.99, 32, 1, 0, Math.PI * 0.7]} />
          <meshBasicMaterial
            color={activeTheme.accent}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 0, 0.05]} rotation={[0, 0, 2.4]}>
          <ringGeometry args={[0.96, 0.99, 32, 1, 0, Math.PI * 0.7]} />
          <meshBasicMaterial
            color={activeTheme.secondary}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* 3D Cybernetic Chassis Body (Beveled Cylinder/Puck) */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.94, 0.98, 0.08, 64]} />
          <meshStandardMaterial
            color={isHovered ? '#450a0a' : '#11141d'}
            metalness={0.92}
            roughness={0.25}
          />
        </mesh>

        {/* Outer Chamfer Rim */}
        <mesh position={[0, 0, -0.01]}>
          <torusGeometry args={[0.96, 0.035, 16, 64]} />
          <meshStandardMaterial
            color={isHovered ? '#b91c1c' : '#1e293b'}
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>

        {/* Backplate with Metallic Brushed Texture */}
        <mesh position={[0, 0, -0.045]}>
          <circleGeometry args={[0.94, 64]} />
          <meshStandardMaterial
            color="#090d16"
            metalness={0.85}
            roughness={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* GYROSCOPIC ORBITAL RING 1: Primary Colored Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.32, 0.018, 16, 80]} />
        <meshStandardMaterial
          color={activeTheme.ring1}
          emissive={activeTheme.ring1}
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* GYROSCOPIC ORBITAL RING 2: Secondary Contrasting Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.56, 0.015, 16, 80]} />
        <meshStandardMaterial
          color={activeTheme.ring2}
          emissive={activeTheme.ring2}
          emissiveIntensity={1.0}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* GYROSCOPIC ORBITAL RING 3: Subtle Outer Pulse Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.78, 0.01, 16, 80]} />
        <meshStandardMaterial
          color={activeTheme.accent}
          emissive={activeTheme.accent}
          emissiveIntensity={0.8}
          transparent
          opacity={0.65}
          wireframe
        />
      </mesh>

      {/* SATELLITE TECH NODE 1: React / Cyan Energy Sphere */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.9}>
        <group position={[1.65, 0.9, 0.4]}>
          <mesh>
            <sphereGeometry args={[0.13, 24, 24]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.22, 0.012, 12, 32]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
        </group>
      </Float>

      {/* SATELLITE TECH NODE 2: Node.js / Emerald Green Cube */}
      <Float speed={2.0} rotationIntensity={0.8} floatIntensity={0.7}>
        <mesh position={[-1.55, 0.95, -0.3]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={1.1}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* SATELLITE TECH NODE 3: Java / Solar Orange Octahedron */}
      <Float speed={2.8} rotationIntensity={0.7} floatIntensity={1.1}>
        <mesh position={[-1.5, -0.85, 0.45]}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* SATELLITE TECH NODE 4: AI & ML / Cosmic Purple Icosahedron */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[1.5, -0.9, -0.35]}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={1.3}
            roughness={0.15}
            metalness={0.6}
          />
        </mesh>
      </Float>

      {/* Swirling 3D Particle Energy Aura */}
      <group ref={particleGroupRef}>
        {auraParticles.map((pt, i) => (
          <mesh key={i} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[pt.size, 8, 8]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? activeTheme.primary : activeTheme.secondary}
              transparent
              opacity={0.75}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Fallback loader while textures load
const AvatarFallback = () => (
  <mesh position={[0, 0, 0]}>
    <cylinderGeometry args={[0.9, 0.9, 0.08, 32]} />
    <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
  </mesh>
);

const Avatar = (props) => {
  return (
    <Suspense fallback={<AvatarFallback />}>
      <AvatarMesh {...props} />
    </Suspense>
  );
};

export default Avatar;
 
