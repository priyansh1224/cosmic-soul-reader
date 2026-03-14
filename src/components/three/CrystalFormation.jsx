import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SingleCrystal({ position, rotation, scale, color, speed, phaseOffset = 0 }) {
  const meshRef = useRef();
  const glowRef = useRef();

  // Custom crystal geometry - elongated octahedron
  const crystalGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const height = 1.5;
    const width = 0.4;

    // Vertices for a crystal shape (hexagonal prism with pointed ends)
    const vertices = new Float32Array([
      // Top point
      0, height, 0,
      // Upper ring
      width, height * 0.6, 0,
      width * 0.5, height * 0.6, width * 0.866,
      -width * 0.5, height * 0.6, width * 0.866,
      -width, height * 0.6, 0,
      -width * 0.5, height * 0.6, -width * 0.866,
      width * 0.5, height * 0.6, -width * 0.866,
      // Lower ring
      width * 0.9, -height * 0.5, 0,
      width * 0.45, -height * 0.5, width * 0.78,
      -width * 0.45, -height * 0.5, width * 0.78,
      -width * 0.9, -height * 0.5, 0,
      -width * 0.45, -height * 0.5, -width * 0.78,
      width * 0.45, -height * 0.5, -width * 0.78,
      // Bottom point
      0, -height, 0,
    ]);

    const indices = [
      // Top cap
      0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 0, 5, 6, 0, 6, 1,
      // Middle band
      1, 7, 8, 1, 8, 2, 2, 8, 9, 2, 9, 3, 3, 9, 10, 3, 10, 4,
      4, 10, 11, 4, 11, 5, 5, 11, 12, 5, 12, 6, 6, 12, 7, 6, 7, 1,
      // Bottom cap
      13, 8, 7, 13, 9, 8, 13, 10, 9, 13, 11, 10, 13, 12, 11, 13, 7, 12,
    ];

    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();

    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.y = time * speed + phaseOffset;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + phaseOffset) * 0.3;
    }

    if (glowRef.current) {
      glowRef.current.material.opacity = 0.15 + Math.sin(time * 2 + phaseOffset) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main crystal body */}
      <mesh ref={meshRef} geometry={crystalGeo}>
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.3}
          transmission={0.6}
          thickness={1.5}
          ior={2.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow */}
      <mesh ref={glowRef} geometry={crystalGeo} scale={[1.1, 1.1, 1.1]}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Energy core */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light for local glow */}
      <pointLight color={color} intensity={0.5} distance={3} />
    </group>
  );
}

function FloatingShards({ count = 30 }) {
  const shardsRef = useRef();

  const shards = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const data = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      sizes[i] = Math.random() * 0.15 + 0.05;
      data.push({
        speed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        orbitSpeed: Math.random() * 0.2 + 0.1,
        radius: radius,
      });
    }

    return { positions, sizes, data };
  }, [count]);

  useFrame((state) => {
    if (!shardsRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = shardsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const d = shards.data[i];
      const angle = time * d.orbitSpeed + d.phase;
      posArray[i * 3] = Math.cos(angle) * d.radius;
      posArray[i * 3 + 1] += Math.sin(time * d.speed + d.phase) * 0.005;
      posArray[i * 3 + 2] = Math.sin(angle) * d.radius;
    }

    shardsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={shardsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={shards.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd54f"
        size={0.1}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function CrystalFormation() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const crystals = [
    {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1.2, 1.2, 1.2],
      color: '#7c3aed',
      speed: 0.3,
      phaseOffset: 0,
    },
    {
      position: [1.5, -0.5, 0.8],
      rotation: [0.3, 0, -0.2],
      scale: [0.7, 0.9, 0.7],
      color: '#ec4899',
      speed: 0.4,
      phaseOffset: 1,
    },
    {
      position: [-1.2, -0.3, -0.6],
      rotation: [-0.2, 0.5, 0.3],
      scale: [0.6, 1.1, 0.6],
      color: '#06b6d4',
      speed: 0.25,
      phaseOffset: 2,
    },
    {
      position: [0.5, 0.8, -1],
      rotation: [0.4, -0.3, 0.1],
      scale: [0.5, 0.8, 0.5],
      color: '#ffd54f',
      speed: 0.35,
      phaseOffset: 3,
    },
    {
      position: [-0.8, 0.5, 1.2],
      rotation: [-0.1, 0.2, -0.4],
      scale: [0.55, 0.75, 0.55],
      color: '#a855f7',
      speed: 0.28,
      phaseOffset: 4,
    },
    {
      position: [1, 0.3, -0.5],
      rotation: [0.15, -0.1, 0.25],
      scale: [0.4, 0.65, 0.4],
      color: '#f472b6',
      speed: 0.45,
      phaseOffset: 5,
    },
  ];

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Ambient light for crystals */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#7c3aed" />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#ec4899" />

      {crystals.map((crystal, i) => (
        <SingleCrystal key={i} {...crystal} />
      ))}

      <FloatingShards count={40} />
    </group>
  );
}