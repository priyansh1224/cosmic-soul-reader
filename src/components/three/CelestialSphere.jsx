import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CoreSphere() {
  const meshRef = useRef();
  const materialRef = useRef();

  const shader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#7c3aed') },
      color2: { value: new THREE.Color('#ec4899') },
      color3: { value: new THREE.Color('#06b6d4') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float time;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        
        // Subtle vertex displacement
        vec3 pos = position;
        float displacement = sin(pos.x * 5.0 + time) * sin(pos.y * 5.0 + time) * sin(pos.z * 5.0 + time) * 0.05;
        pos += normal * displacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }
      
      void main() {
        // Fresnel effect
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.5);
        
        // Flowing color bands
        float band1 = sin(vPosition.y * 3.0 + time * 0.5 + vPosition.x * 2.0) * 0.5 + 0.5;
        float band2 = sin(vPosition.x * 4.0 - time * 0.3 + vPosition.z * 2.0) * 0.5 + 0.5;
        
        vec3 col = mix(color1, color2, band1);
        col = mix(col, color3, band2 * 0.3);
        
        // Add noise texture
        float n = noise(vPosition * 10.0 + time * 0.1);
        col += n * 0.05;
        
        // Apply fresnel glow
        col += fresnel * color1 * 0.5;
        
        float alpha = 0.7 + fresnel * 0.3;
        
        gl_FragColor = vec4(col, alpha);
      }
    `
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          {...shader}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function EnergyRings() {
  const group1Ref = useRef();
  const group2Ref = useRef();
  const group3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (group1Ref.current) group1Ref.current.rotation.z = time * 0.5;
    if (group2Ref.current) group2Ref.current.rotation.z = -time * 0.35;
    if (group3Ref.current) group3Ref.current.rotation.z = time * 0.25;
  });

  return (
    <>
      <group ref={group1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={group2Ref} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[3.3, 0.015, 16, 100]} />
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={group3Ref} rotation={[Math.PI / 2, -Math.PI / 6, Math.PI / 5]}>
        <mesh>
          <torusGeometry args={[3.6, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </>
  );
}

function OrbitalParticles() {
  const particlesRef = useRef();
  const count = 80;

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const meta = [];

    for (let i = 0; i < count; i++) {
      const orbitRadius = 2.5 + Math.random() * 2;
      const orbitSpeed = (Math.random() * 0.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
      const orbitTilt = (Math.random() - 0.5) * Math.PI;
      const phase = Math.random() * Math.PI * 2;

      const angle = phase;
      positions[i * 3] = Math.cos(angle) * orbitRadius;
      positions[i * 3 + 1] = Math.sin(angle) * orbitRadius * Math.sin(orbitTilt);
      positions[i * 3 + 2] = Math.sin(angle) * orbitRadius * Math.cos(orbitTilt);

      meta.push({ orbitRadius, orbitSpeed, orbitTilt, phase });
    }

    return { positions, meta };
  }, [count]);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const m = data.meta[i];
      const angle = time * m.orbitSpeed + m.phase;
      posArray[i * 3] = Math.cos(angle) * m.orbitRadius;
      posArray[i * 3 + 1] = Math.sin(angle) * m.orbitRadius * Math.sin(m.orbitTilt);
      posArray[i * 3 + 2] = Math.sin(angle) * m.orbitRadius * Math.cos(m.orbitTilt);
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={data.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffd54f"
        size={0.12}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function CelestialSphere() {
  return (
    <group>
      <CoreSphere />
      <EnergyRings />
      <OrbitalParticles />
    </group>
  );
}