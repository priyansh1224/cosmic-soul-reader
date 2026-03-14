import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function QuantumField({ particleCount = 800 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = [];

    const palette = [
      new THREE.Color('#7c3aed'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#a855f7'),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.1 + 0.03;

      velocities.push(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      );
    }

    return { positions, velocities, colors, sizes };
  }, [particleCount]);

  // Connection lines buffer
  const maxLines = 400;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array;
    const bounds = 12.5;

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Apply velocity
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Quantum jitter
      posArray[i3] += Math.sin(time * 3 + i * 0.7) * 0.008;
      posArray[i3 + 1] += Math.cos(time * 2.5 + i * 0.5) * 0.008;
      posArray[i3 + 2] += Math.sin(time * 2 + i * 0.3) * 0.008;

      // Wrap boundaries
      for (let j = 0; j < 3; j++) {
        if (posArray[i3 + j] > bounds) posArray[i3 + j] = -bounds;
        if (posArray[i3 + j] < -bounds) posArray[i3 + j] = bounds;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connection lines
    if (linesRef.current) {
      let lineIdx = 0;
      const threshold = 2.5;
      const sampleSize = Math.min(particleCount, 200);

      for (let i = 0; i < sampleSize && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < sampleSize && lineIdx < maxLines; j++) {
          const i3 = i * 3;
          const j3 = j * 3;

          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < threshold * threshold) {
            const li = lineIdx * 6;
            linePositions[li] = posArray[i3];
            linePositions[li + 1] = posArray[i3 + 1];
            linePositions[li + 2] = posArray[i3 + 2];
            linePositions[li + 3] = posArray[j3];
            linePositions[li + 4] = posArray[j3 + 1];
            linePositions[li + 5] = posArray[j3 + 2];

            const fade = 1 - Math.sqrt(distSq) / threshold;
            lineColors[li] = 0.49 * fade;
            lineColors[li + 1] = 0.23 * fade;
            lineColors[li + 2] = 0.93 * fade;
            lineColors[li + 3] = 0.93 * fade;
            lineColors[li + 4] = 0.29 * fade;
            lineColors[li + 5] = 0.6 * fade;

            lineIdx++;
          }
        }
      }

      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIdx * 2);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          vertexColors
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={maxLines * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </lineSegments>
    </group>
  );
}