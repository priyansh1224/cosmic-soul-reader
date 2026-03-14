import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural nebula using layered noise
function ProceduralNebula() {
  const meshRef = useRef();
  const materialRef = useRef();

  const shader = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#7c3aed') },
      color2: { value: new THREE.Color('#ec4899') },
      color3: { value: new THREE.Color('#06b6d4') },
      opacity: { value: 0.4 }
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
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float opacity;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      // Simplex noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for (int i = 0; i < 5; i++) {
          value += amplitude * snoise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        
        return value;
      }
      
      void main() {
        vec3 pos = vPosition * 0.1;
        
        // Animated noise layers
        float n1 = fbm(pos + time * 0.02);
        float n2 = fbm(pos * 2.0 - time * 0.015);
        float n3 = fbm(pos * 0.5 + time * 0.01);
        
        // Color mixing based on noise
        vec3 finalColor = mix(color1, color2, n1 * 0.5 + 0.5);
        finalColor = mix(finalColor, color3, n2 * 0.3);
        
        // Density variation
        float density = (n1 + n2 * 0.5 + n3 * 0.25) * 0.5 + 0.5;
        density = pow(density, 1.5);
        
        // Edge fade
        float dist = length(vUv - 0.5) * 2.0;
        float edgeFade = 1.0 - smoothstep(0.5, 1.0, dist);
        
        float alpha = density * edgeFade * opacity;
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -30]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        {...shader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Volumetric nebula clouds
function VolumetricClouds({ count = 50 }) {
  const cloudsRef = useRef();

  const clouds = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30 - 20
        ],
        scale: Math.random() * 15 + 5,
        rotation: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.1 + 0.05,
        color: ['#7c3aed', '#ec4899', '#06b6d4', '#4c1d95'][Math.floor(Math.random() * 4)]
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!cloudsRef.current) return;
    cloudsRef.current.children.forEach((cloud, i) => {
      cloud.rotation.z = state.clock.elapsedTime * clouds[i].speed;
      cloud.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime + i) * 0.05;
    });
  });

  return (
    <group ref={cloudsRef}>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.position} rotation={[0, 0, cloud.rotation]}>
          <circleGeometry args={[cloud.scale, 32]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function NebulaCloud() {
  return (
    <group>
      <ProceduralNebula />
      <VolumetricClouds count={30} />
    </group>
  );
}