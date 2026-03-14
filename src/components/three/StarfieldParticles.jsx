import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarfieldParticles({
  count = 5000,
  radius = 50,
  speed = 0.05
}) {
  const pointsRef = useRef();

  const { positions, colors, sizes, twinklePhases, driftVelocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinklePhases = new Float32Array(count);
    const driftVelocities = new Float32Array(count * 3);

    const starColors = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#ffe4c4'),
      new THREE.Color('#c4d4ff'),
      new THREE.Color('#ffd54f'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#ec4899'),
    ];

    for (let i = 0; i < count; i++) {
      // Spherical distribution with density falloff
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.pow(Math.random(), 0.5);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Most stars are white/warm, some are colored
      const colorIndex = Math.random() > 0.85
        ? Math.floor(Math.random() * starColors.length)
        : Math.random() > 0.5 ? 0 : 1;
      const color = starColors[colorIndex];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Variable sizes — most small, few larger
      sizes[i] = Math.random() > 0.95
        ? Math.random() * 3 + 2
        : Math.random() * 1.5 + 0.3;

      // Random twinkle phase
      twinklePhases[i] = Math.random() * Math.PI * 2;

      // Very slow drift
      driftVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      driftVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      driftVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions, colors, sizes, twinklePhases, driftVelocities };
  }, [count, radius]);

  // Custom shader for better star appearance
  const starShader = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 customColor;
      attribute float twinklePhase;
      
      varying vec3 vColor;
      varying float vAlpha;
      
      uniform float time;
      uniform float pixelRatio;
      
      void main() {
        vColor = customColor;
        
        // Twinkle effect
        float twinkle = sin(time * 2.0 + twinklePhase) * 0.3 + 0.7;
        vAlpha = twinkle;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float finalSize = size * twinkle * pixelRatio * (150.0 / -mvPosition.z);
        gl_PointSize = clamp(finalSize, 0.5, 20.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      
      void main() {
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        
        // Soft star glow
        float core = exp(-dist * dist * 20.0);
        float glow = exp(-dist * dist * 5.0) * 0.5;
        float spike = max(
          exp(-abs(center.x) * 20.0) * exp(-abs(center.y) * 3.0),
          exp(-abs(center.y) * 20.0) * exp(-abs(center.x) * 3.0)
        ) * 0.3;
        
        float brightness = core + glow + spike;
        
        vec3 finalColor = vColor * brightness;
        float alpha = brightness * vAlpha;
        
        if (alpha < 0.01) discard;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position.array;

    // Slow drift
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += driftVelocities[i * 3];
      posArray[i * 3 + 1] += driftVelocities[i * 3 + 1];
      posArray[i * 3 + 2] += driftVelocities[i * 3 + 2];

      // Wrap around
      for (let j = 0; j < 3; j++) {
        if (Math.abs(posArray[i * 3 + j]) > radius) {
          posArray[i * 3 + j] *= -0.95;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update shader time
    starShader.uniforms.time.value = time;

    // Slow global rotation
    pointsRef.current.rotation.y = time * speed * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-customColor"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-twinklePhase"
          count={count}
          array={twinklePhases}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={starShader} attach="material" />
    </points>
  );
}