import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Zodiac constellation star patterns (simplified x,y coordinates)
const CONSTELLATION_DATA = {
  aries: {
    stars: [[0, 2], [0.5, 1.5], [1.2, 1], [1.8, 0.5], [2.5, 0.8]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    color: '#ef4444',
  },
  taurus: {
    stars: [[-1, 2], [-0.5, 1.5], [0, 1], [0.5, 1.5], [1, 2], [1.5, 1.8], [0, 0], [-0.5, -0.5], [0.5, -0.5]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7], [6, 8]],
    color: '#22c55e',
  },
  gemini: {
    stars: [[-1, 2], [-0.8, 1], [-0.5, 0], [-0.3, -1], [1, 2], [0.8, 1], [0.5, 0], [0.3, -1], [-0.5, 0.5], [0.5, 0.5]],
    lines: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [8, 9], [2, 8], [6, 9]],
    color: '#eab308',
  },
  cancer: {
    stars: [[-1, 0.5], [-0.3, 1], [0.3, 0.5], [1, 1], [0, -0.5], [-0.5, -1]],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5]],
    color: '#94a3b8',
  },
  leo: {
    stars: [[0, 2], [1, 1.5], [1.5, 0.5], [1, -0.5], [0, -1], [-0.5, -0.5], [-0.5, 0.5], [0, 1.2]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]],
    color: '#f97316',
  },
  virgo: {
    stars: [[-1, 2], [-0.5, 1.5], [0, 1], [0.5, 0.5], [0, -0.5], [-0.5, -1], [1, 0], [1.5, -0.5], [0.5, 1.5]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [3, 6], [6, 7], [2, 8]],
    color: '#84cc16',
  },
  libra: {
    stars: [[-1.5, 0], [-0.5, 0], [0.5, 0], [1.5, 0], [0, 1.5], [-0.5, 1], [0.5, 1]],
    lines: [[0, 1], [1, 2], [2, 3], [4, 5], [4, 6], [5, 1], [6, 2]],
    color: '#ec4899',
  },
  scorpio: {
    stars: [[-2, 0], [-1, 0.5], [0, 0], [0.5, -0.5], [1, -1], [1.5, -0.5], [2, -1], [2.5, -0.5]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    color: '#dc2626',
  },
  sagittarius: {
    stars: [[0, 2], [0.5, 1], [0, -0.5], [-0.5, -1.5], [1, 0], [1.5, 0.5], [0.5, 1.5], [-0.5, 0]],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [0, 6], [2, 7]],
    color: '#a855f7',
  },
  capricorn: {
    stars: [[-1, 1.5], [-0.5, 1], [0, 0.5], [0.5, 0], [1, -0.5], [1.5, 0], [1, 0.5], [0.5, 1]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 2]],
    color: '#64748b',
  },
  aquarius: {
    stars: [[-2, 1], [-1, 0.5], [0, 1], [1, 0.5], [2, 1], [-1, -0.5], [0, -1], [1, -0.5]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6], [6, 7], [7, 3]],
    color: '#06b6d4',
  },
  pisces: {
    stars: [[-1.5, 1], [-1, 0.5], [-0.5, 0], [0, -0.5], [0.5, 0], [1, 0.5], [1.5, 1], [0, 0.5]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [2, 7], [4, 7]],
    color: '#818cf8',
  },
};

function ConstellationLines({ stars, lines, color, scale = 2 }) {
  const linesRef = useRef();

  const lineGeometry = useMemo(() => {
    const positions = [];

    lines.forEach(([startIdx, endIdx]) => {
      const start = stars[startIdx];
      const end = stars[endIdx];
      positions.push(
        start[0] * scale, start[1] * scale, 0,
        end[0] * scale, end[1] * scale, 0
      );
    });

    return new Float32Array(positions);
  }, [stars, lines, scale]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={lineGeometry.length / 3}
          array={lineGeometry}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function ConstellationStars({ stars, color, scale = 2 }) {
  const pointsRef = useRef();

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(stars.length * 3);
    const sizes = new Float32Array(stars.length);

    stars.forEach((star, i) => {
      positions[i * 3] = star[0] * scale;
      positions[i * 3 + 1] = star[1] * scale;
      positions[i * 3 + 2] = 0;
      sizes[i] = 0.3;
    });

    return { positions, sizes };
  }, [stars, scale]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const sizeArray = pointsRef.current.geometry.attributes.size.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < stars.length; i++) {
      sizeArray[i] = 0.3 + Math.sin(time * 3 + i * 1.5) * 0.1;
    }

    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={stars.length}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={stars.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.3}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function GlowOrbs({ stars, color, scale = 2 }) {
  return (
    <group>
      {stars.map((star, i) => (
        <mesh key={i} position={[star[0] * scale, star[1] * scale, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      {stars.map((star, i) => (
        <mesh key={`glow-${i}`} position={[star[0] * scale, star[1] * scale, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function ZodiacSymbol({ sign, color }) {
  const SYMBOLS = {
    aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
    leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
    sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
  };

  // We'll create the symbol using a ring with the sign name
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, -4, 0]}>
      {/* Decorative ring under constellation */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function ZodiacConstellation({ sign = 'aries' }) {
  const groupRef = useRef();
  const signKey = sign.toLowerCase();
  const data = CONSTELLATION_DATA[signKey] || CONSTELLATION_DATA.aries;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, -5]}>
      <ConstellationLines
        stars={data.stars}
        lines={data.lines}
        color={data.color}
        scale={2}
      />
      <ConstellationStars
        stars={data.stars}
        color={data.color}
        scale={2}
      />
      <GlowOrbs
        stars={data.stars}
        color={data.color}
        scale={2}
      />
      <ZodiacSymbol sign={signKey} color={data.color} />
    </group>
  );
}