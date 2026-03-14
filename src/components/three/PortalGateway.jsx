import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PortalGateway({ active = false }) {
  const portalRef = useRef();
  const materialRef = useRef();
  const particlesRef = useRef();
  const ringRef = useRef();

  const shader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      active: { value: active ? 1.0 : 0.0 },
      color1: { value: new THREE.Color('#7c3aed') },
      color2: { value: new THREE.Color('#ec4899') },
      color3: { value: new THREE.Color('#06b6d4') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float active;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      #define PI 3.14159265359
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p = rot * p * 2.0;
          a *= 0.5;
        }
        return v;
      }
      
      void main() {
        vec2 center = vUv - 0.5;
        float dist = length(center);
        float angle = atan(center.y, center.x);
        
        // Swirling vortex pattern
        float swirl = sin(angle * 8.0 + time * 3.0 - dist * 20.0) * 0.5 + 0.5;
        float swirl2 = sin(angle * 5.0 - time * 2.0 + dist * 15.0) * 0.5 + 0.5;
        
        // Noise distortion
        float n = fbm(vec2(angle * 2.0 + time, dist * 5.0 - time * 0.5));
        
        // Radial waves
        float waves = sin(dist * 30.0 - time * 5.0) * 0.5 + 0.5;
        
        // Color mixing
        vec3 col = mix(color1, color2, swirl);
        col = mix(col, color3, swirl2 * 0.5);
        col += waves * 0.15;
        col += n * 0.1;
        
        // Portal ring structure
        float outerRing = smoothstep(0.48, 0.43, dist) * smoothstep(0.35, 0.4, dist);
        float innerRing = smoothstep(0.42, 0.38, dist) * smoothstep(0.32, 0.36, dist);
        
        // Event horizon glow
        float horizon = smoothstep(0.5, 0.35, dist) * smoothstep(0.3, 0.35, dist);
        horizon *= 1.0 + sin(time * 10.0 + angle * 3.0) * 0.3;
        
        // Inner void - dark center
        float innerVoid = smoothstep(0.32, 0.0, dist);
        
        // Energy tendrils from center
        float tendrils = 0.0;
        for (float i = 0.0; i < 6.0; i++) {
          float a = angle + i * PI / 3.0 + time * 0.5;
          float t = abs(sin(a * 3.0 + time * 2.0));
          t *= smoothstep(0.0, 0.4, dist) * smoothstep(0.5, 0.3, dist);
          tendrils += t * 0.15;
        }
        
        // Combine alpha layers
        float alpha = outerRing * 0.9 + innerRing * 0.7 + horizon * active + tendrils * active;
        alpha *= active * 0.6 + 0.4;
        
        // Inner void rendering
        if (dist < 0.35 && active > 0.5) {
          vec3 voidColor = vec3(0.02, 0.01, 0.05);
          voidColor += color3 * sin(time * 15.0 + angle * 5.0) * 0.15 * innerVoid;
          voidColor += color1 * fbm(center * 10.0 + time) * 0.2;
          col = mix(col, voidColor, innerVoid * 0.85);
          alpha += innerVoid * 0.4;
        }
        
        // Outer edge fade
        alpha *= smoothstep(0.55, 0.45, dist);
        
        // Pulsing energy
        alpha *= 0.85 + 0.15 * sin(time * 4.0);
        
        gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
      }
    `
  }), [active]);

  // Portal particles
  const particleCount = 300;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = [];

    const palette = [
      new THREE.Color('#7c3aed'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#ffd54f'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.08 + 0.02;

      velocities.push({
        angularSpeed: (Math.random() * 0.08 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        baseRadius: radius,
        currentRadius: radius,
        zSpeed: (Math.random() - 0.5) * 0.05,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return { positions, colors, sizes, velocities };
  }, [particleCount]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Update portal shader
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time;
      materialRef.current.uniforms.active.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.active.value,
        active ? 1.0 : 0.0,
        0.03
      );
    }

    // Rotate portal disc
    if (portalRef.current) {
      portalRef.current.rotation.z = time * 0.15;
    }

    // Animate ring
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.3;
      const scale = 1 + Math.sin(time * 2) * 0.02;
      ringRef.current.scale.set(scale, scale, 1);
    }

    // Animate particles
    if (particlesRef.current && active) {
      const posArray = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const v = particles.velocities[i];
        const angle = time * v.angularSpeed + v.phase;

        // Spiral inward effect
        v.currentRadius -= 0.005;
        if (v.currentRadius < 0.3) {
          v.currentRadius = v.baseRadius;
          v.phase = Math.random() * Math.PI * 2;
        }

        const wobble = Math.sin(time * 3 + i * 0.1) * 0.1;

        posArray[i * 3] = Math.cos(angle) * (v.currentRadius + wobble);
        posArray[i * 3 + 1] = Math.sin(angle) * (v.currentRadius + wobble);
        posArray[i * 3 + 2] += v.zSpeed;

        // Reset Z if too far
        if (Math.abs(posArray[i * 3 + 2]) > 2) {
          posArray[i * 3 + 2] = 0;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, -5]}>
      {/* Portal disc with shader */}
      <mesh ref={portalRef}>
        <circleGeometry args={[3.5, 64]} />
        <shaderMaterial
          ref={materialRef}
          {...shader}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer decorative ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.2, 0.04, 16, 128]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[3.4, 0.02, 16, 128]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Third ring */}
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[3.6, 0.015, 16, 128]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glow sphere at center */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={active ? 0.3 : 0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Spiral particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          vertexColors
        />
      </points>
    </group>
  );
}