import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AuroraCurtain({
  position = [0, 0, 0],
  color1,
  color2,
  width = 40,
  height = 12,
  segments = 64,
  speed = 1
}) {
  const meshRef = useRef();
  const materialRef = useRef();

  const shader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uSpeed: { value: speed },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vDisplacement;
      uniform float time;
      uniform float uSpeed;
      
      // Simple noise
      float hash(float n) { return fract(sin(n) * 43758.5453); }
      
      float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        
        float n = p.x + p.y * 57.0 + 113.0 * p.z;
        return mix(
          mix(mix(hash(n), hash(n + 1.0), f.x),
              mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
          mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
              mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
      }
      
      void main() {
        vUv = uv;
        
        vec3 pos = position;
        
        // Multi-layered wave displacement
        float wave1 = sin(pos.x * 0.3 + time * uSpeed * 0.5) * 1.5;
        float wave2 = sin(pos.x * 0.5 + time * uSpeed * 0.3) * 0.8;
        float wave3 = cos(pos.x * 0.2 + time * uSpeed * 0.7) * 0.5;
        float wave4 = noise(vec3(pos.x * 0.1, time * 0.2, 0.0)) * 2.0;
        
        float displacement = wave1 + wave2 + wave3 + wave4;
        pos.y += displacement;
        pos.z += sin(pos.x * 0.15 + time * uSpeed * 0.4) * 1.0;
        
        vDisplacement = displacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uSpeed;
      
      varying vec2 vUv;
      varying float vDisplacement;
      
      void main() {
        // Vertical gradient - strongest in middle, fades at top and bottom
        float verticalFade = sin(vUv.y * 3.14159);
        verticalFade = pow(verticalFade, 0.8);
        
        // Horizontal variation
        float horizontalVariation = sin(vUv.x * 20.0 + time * uSpeed) * 0.5 + 0.5;
        horizontalVariation *= sin(vUv.x * 13.0 - time * uSpeed * 0.7) * 0.5 + 0.5;
        
        // Color mixing
        float colorMix = sin(vUv.x * 5.0 + time * 0.3 + vDisplacement) * 0.5 + 0.5;
        vec3 color = mix(uColor1, uColor2, colorMix);
        
        // Shimmer
        float shimmer = sin(vUv.x * 50.0 + time * 5.0) * 0.5 + 0.5;
        shimmer *= sin(vUv.y * 30.0 + time * 3.0) * 0.5 + 0.5;
        color += shimmer * 0.1;
        
        // Alpha
        float alpha = verticalFade * (0.3 + horizontalVariation * 0.4);
        alpha *= smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
        
        // Pulsing intensity
        alpha *= 0.8 + 0.2 * sin(time * 2.0 + vUv.x * 3.0);
        
        gl_FragColor = vec4(color, alpha * 0.6);
      }
    `
  }), [color1, color2, speed]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height, segments, 32]} />
      <shaderMaterial
        ref={materialRef}
        {...shader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function AuroraBorealis({ intensity = 1 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main aurora curtain */}
      <AuroraCurtain
        position={[0, 8, -15]}
        color1="#06b6d4"
        color2="#7c3aed"
        width={50}
        height={12}
        speed={1 * intensity}
      />

      {/* Second layer - offset and different colors */}
      <AuroraCurtain
        position={[5, 10, -20]}
        color1="#7c3aed"
        color2="#ec4899"
        width={45}
        height={10}
        speed={0.7 * intensity}
      />

      {/* Third layer - subtle background */}
      <AuroraCurtain
        position={[-3, 6, -10]}
        color1="#ec4899"
        color2="#06b6d4"
        width={35}
        height={8}
        speed={1.3 * intensity}
      />
    </group>
  );
}