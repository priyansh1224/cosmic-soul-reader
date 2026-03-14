import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import StarfieldParticles from './StarfieldParticles';
import NebulaCloud from './NebulaCloud';
import AuroraBorealis from './AuroraBorealis';
import OrbitalRings from './OrbitalRings';
import QuantumField from './QuantumField';
import CelestialSphere from './CelestialSphere';
import PortalGateway from './PortalGateway';
import CrystalFormation from './CrystalFormation';
import ZodiacConstellation from './ZodiacConstellation';

// Smooth camera that follows mouse
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.015;
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Fallback while loading
function LoadingFallback() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

// Post-processing
function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        height={300}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0008, 0.0008]}
      />
      <Vignette darkness={0.4} offset={0.3} />
    </EffectComposer>
  );
}

// Scene content switcher
function SceneContent({ section = 'welcome', zodiacSign = null }) {
  return (
    <>
      <CameraRig />

      {/* Lighting */}
      <ambientLight intensity={0.08} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#7c3aed" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#ec4899" />
      <pointLight position={[0, -10, 5]} intensity={0.2} color="#06b6d4" />

      {/* Always visible */}
      <StarfieldParticles count={4000} />
      <NebulaCloud />

      {/* Section-specific elements */}
      {section === 'welcome' && (
        <>
          <AuroraBorealis />
          <OrbitalRings />
        </>
      )}

      {section === 'form' && (
        <>
          <QuantumField particleCount={600} />
          <CrystalFormation />
        </>
      )}

      {section === 'reading' && (
        <>
          <PortalGateway active />
          <CelestialSphere />
        </>
      )}

      {section === 'results' && (
        <>
          {zodiacSign && <ZodiacConstellation sign={zodiacSign} />}
          <AuroraBorealis intensity={1.5} />
          <OrbitalRings />
        </>
      )}

      <Effects />
    </>
  );
}

export default function CosmicCanvas({
  className = '',
  section = 'welcome',
  zodiacSign = null,
}) {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mq.matches);
    const handler = (e) => setIsReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (isReduced) {
    return (
      <div
        className={`fixed inset-0 ${className}`}
        style={{
          zIndex: -1,
          background:
            'radial-gradient(ellipse at center, #1a0533 0%, #0a0118 40%, #050510 100%)',
        }}
      />
    );
  }

  return (
    <div className={`fixed inset-0 ${className}`} style={{ zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 25, 100]} />

        <Suspense fallback={<LoadingFallback />}>
          <SceneContent section={section} zodiacSign={zodiacSign} />
        </Suspense>
      </Canvas>
    </div>
  );
}