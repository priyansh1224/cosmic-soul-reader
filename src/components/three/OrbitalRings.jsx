import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedRing({
  radius,
  tubeRadius = 0.025,
  color,
  speed,
  tilt,
  particleCount = 80,
  opacity = 0.6
}) {
  const ringRef = useRef();
  const glowRef = useRef();
  const particlesRef = useRef();

  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const phases = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      sizes[i] = Math.random() * 0.08 + 0.03;
      phases.push(Math.random() * Math.PI * 2);
    }

    return { positions, sizes, phases };
  }, [radius, particleCount]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (ringRef.current) {
      ringRef.current.rotation.y = time * speed;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = time * speed;
      glowRef.current.material.opacity = 0.08 + Math.sin(time * 2) * 0.04;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * speed * 1.15;
      const sizeArray = particlesRef.current.geometry.attributes.size.array;
      for (let i = 0; i < particleCount; i++) {
        sizeArray[i] = particleData.sizes[i] * (0.7 + 0.6 * Math.sin(time * 3 + particleData.phases[i]));
      }
      particlesRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      {/* Core ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, tubeRadius, 16, 128]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glow ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[radius, tubeRadius * 4, 16, 128]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbiting particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particleData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={particleData.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.08}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function CentralOrb() {
  const orbRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (orbRef.current) {
      const s = 1 + Math.sin(time * 1.5) * 0.05;
      orbRef.current.scale.set(s, s, s);
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#ffd54f" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#ffd54f"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight color="#ffd54f" intensity={2} distance={10} />
    </group>
  );
}

export default function OrbitalRings() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <CentralOrb />

      <AnimatedRing
        radius={3.5}
        color="#7c3aed"
        speed={0.25}
        tilt={Math.PI * 0.35}
        particleCount={60}
      />
      <AnimatedRing
        radius={5}
        color="#ec4899"
        speed={-0.18}
        tilt={Math.PI * 0.15}
        particleCount={70}
        tubeRadius={0.02}
      />
      <AnimatedRing
        radius={6.5}
        color="#06b6d4"
        speed={0.12}
        tilt={Math.PI * 0.5}
        particleCount={80}
        tubeRadius={0.015}
        opacity={0.4}
      />
      <AnimatedRing
        radius={8}
        color="#ffd54f"
        speed={-0.08}
        tilt={Math.PI * 0.25}
        particleCount={90}
        tubeRadius={0.01}
        opacity={0.3}
      />
    </group>
  );
}