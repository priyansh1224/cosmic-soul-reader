// ═══════════════════════════════════════════════════════════════════
// 🕉️ COSMIC SOUL PRELOADER - Sacred Geometry Mandala Animation
// File: src/components/sections/CosmicPreloader.jsx
// Fully responsive - Mobile, Tablet & Desktop optimized
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo, useEffect, useState, useCallback } from 'react'

// ── ENERGY COLORS ──
const ENERGY_PALETTE = {
  violet: { main: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.6)', light: 'rgba(139, 92, 246, 0.15)' },
  indigo: { main: '#6366F1', glow: 'rgba(99, 102, 241, 0.6)', light: 'rgba(99, 102, 241, 0.15)' },
  cyan: { main: '#06B6D4', glow: 'rgba(6, 182, 212, 0.6)', light: 'rgba(6, 182, 212, 0.15)' },
  emerald: { main: '#10B981', glow: 'rgba(16, 185, 129, 0.6)', light: 'rgba(16, 185, 129, 0.15)' },
  amber: { main: '#F59E0B', glow: 'rgba(245, 158, 11, 0.6)', light: 'rgba(245, 158, 11, 0.15)' },
  rose: { main: '#F43F5E', glow: 'rgba(244, 63, 94, 0.6)', light: 'rgba(244, 63, 94, 0.15)' },
  gold: { main: '#FFD700', glow: 'rgba(255, 215, 0, 0.6)', light: 'rgba(255, 215, 0, 0.15)' },
}

const ENERGY_KEYS = Object.keys(ENERGY_PALETTE)

// ── SACRED SYMBOLS ──
const SACRED_SYMBOLS = ['✦', '❋', '✧', '◈', '❖', '✶']
const SANSKRIT_CHARS = ['ॐ', 'श्री', 'ह्रीं', 'क्लीं', 'ऐं', 'सौः', 'हं', 'यं', 'रं', 'वं', 'लं', 'ॐ']

// ═══════════════════════════════════════════════════════════════════
// 🎨 INJECT KEYFRAMES
// ═══════════════════════════════════════════════════════════════════

const STYLE_ID = 'cosmic-preloader-keyframes'

const injectKeyframes = () => {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    @keyframes cp-rotate-cw {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes cp-rotate-ccw {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    @keyframes cp-breathe {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.08); opacity: 1; }
    }
    @keyframes cp-breathe-deep {
      0%, 100% { transform: scale(0.92); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 1; }
    }
    @keyframes cp-float-up {
      0% { transform: translateY(0px) scale(1); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 0.3; }
      100% { transform: translateY(var(--float-dist, -120px)) scale(0.3); opacity: 0; }
    }
    @keyframes cp-orbit-particle {
      0% { transform: rotate(var(--start-angle, 0deg)) translateX(var(--orbit-r, 50px)) rotate(calc(-1 * var(--start-angle, 0deg))); }
      100% { transform: rotate(calc(var(--start-angle, 0deg) + 360deg)) translateX(var(--orbit-r, 50px)) rotate(calc(-1 * (var(--start-angle, 0deg) + 360deg))); }
    }
    @keyframes cp-twinkle {
      0%, 100% { opacity: 0.05; transform: scale(0.5); }
      50% { opacity: 0.9; transform: scale(1.2); }
    }
    @keyframes cp-glow-pulse {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2), 0 0 60px rgba(139, 92, 246, 0.1);
        transform: translate(-50%, -50%) scale(1);
      }
      50% { 
        box-shadow: 0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3), 0 0 90px rgba(99, 102, 241, 0.2), 0 0 120px rgba(6, 182, 212, 0.1);
        transform: translate(-50%, -50%) scale(1.05);
      }
    }
    @keyframes cp-om-pulse {
      0%, 100% { 
        text-shadow: 0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3);
        transform: scale(1);
      }
      50% { 
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.9), 0 0 40px rgba(255, 215, 0, 0.5), 0 0 60px rgba(245, 158, 11, 0.3);
        transform: scale(1.1);
      }
    }
    @keyframes cp-ring-trace {
      0% { stroke-dashoffset: 1000; opacity: 0.3; }
      50% { opacity: 0.8; }
      100% { stroke-dashoffset: 0; opacity: 0.3; }
    }
    @keyframes cp-helix-flow {
      0% { transform: translateY(100%) rotate(0deg); opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 0.5; }
      100% { transform: translateY(-100%) rotate(720deg); opacity: 0; }
    }
    @keyframes cp-mandala-segment {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.05); }
    }
    @keyframes cp-wave-expand {
      0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.8; border-width: 2px; }
      100% { transform: translate(-50%, -50%) scale(3); opacity: 0; border-width: 0.5px; }
    }
    @keyframes cp-fade-in-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cp-shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes cp-dot-wave {
      0%, 100% { transform: scale(0.6); opacity: 0.3; }
      50% { transform: scale(1.4); opacity: 1; }
    }
    @keyframes cp-sacred-float {
      0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
      25% { transform: translateY(-8px) rotate(5deg); opacity: 0.4; }
      75% { transform: translateY(5px) rotate(-3deg); opacity: 0.25; }
    }
    @keyframes cp-energy-stream {
      0% { opacity: 0; transform: scaleY(0); }
      20% { opacity: 0.6; transform: scaleY(1); }
      80% { opacity: 0.3; transform: scaleY(1); }
      100% { opacity: 0; transform: scaleY(0); }
    }
    @keyframes cp-progress-glow {
      0%, 100% { filter: brightness(1); }
      50% { filter: brightness(1.5); }
    }
  `
  document.head.appendChild(style)
}

// ═══════════════════════════════════════════════════════════════════
// 📐 RESPONSIVE HOOK
// ═══════════════════════════════════════════════════════════════════

const useResponsive = () => {
  const [dimensions, setDimensions] = useState({ w: 0, h: 0, type: 'desktop' })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      let type = 'desktop'
      if (w < 480) type = 'mobile-sm'
      else if (w < 640) type = 'mobile'
      else if (w < 768) type = 'tablet-sm'
      else if (w < 1024) type = 'tablet'
      setDimensions({ w, h, type })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return dimensions
}

// ═══════════════════════════════════════════════════════════════════
// ✨ COSMIC DUST (Stars Background)
// ═══════════════════════════════════════════════════════════════════

const CosmicDust = memo(({ count = 80 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 2,
        delay: Math.random() * 6,
        duration: 2 + Math.random() * 4,
        color: Math.random() > 0.7
          ? ENERGY_PALETTE[ENERGY_KEYS[Math.floor(Math.random() * ENERGY_KEYS.length)]].main
          : '#ffffff',
      })),
    [count]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `cp-twinkle ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
})
CosmicDust.displayName = 'CosmicDust'

// ═══════════════════════════════════════════════════════════════════
// 🔮 SACRED GEOMETRY SVG MANDALA
// ═══════════════════════════════════════════════════════════════════

const SacredGeometry = memo(({ size, scale }) => {
  const s = size / 2
  const rings = useMemo(() => {
    const result = []
    const ringCount = scale > 0.8 ? 5 : scale > 0.6 ? 4 : 3

    for (let i = 0; i < ringCount; i++) {
      const r = s * 0.25 + (s * 0.6 * i) / ringCount
      const segments = 6 + i * 2
      const colorKey = ENERGY_KEYS[i % ENERGY_KEYS.length]
      result.push({ radius: r, segments, color: ENERGY_PALETTE[colorKey].main, index: i })
    }
    return result
  }, [s, scale])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
      }}
    >
      {/* Geometric patterns */}
      {rings.map((ring) => {
        const points = []
        for (let j = 0; j < ring.segments; j++) {
          const angle = (j / ring.segments) * Math.PI * 2 - Math.PI / 2
          points.push({
            x: s + Math.cos(angle) * ring.radius,
            y: s + Math.sin(angle) * ring.radius,
          })
        }

        return (
          <g key={ring.index}>
            {/* Polygon */}
            <polygon
              points={points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={ring.color}
              strokeWidth={0.8}
              opacity={0.25}
              style={{
                animation: `cp-breathe ${3 + ring.index * 0.5}s ${ring.index * 0.3}s ease-in-out infinite`,
                transformOrigin: `${s}px ${s}px`,
              }}
            />

            {/* Connecting lines to center */}
            {points.map((p, pi) => (
              <line
                key={pi}
                x1={s}
                y1={s}
                x2={p.x}
                y2={p.y}
                stroke={ring.color}
                strokeWidth={0.3}
                opacity={0.12}
              />
            ))}

            {/* Circle at each vertex */}
            {points.map((p, pi) => (
              <circle
                key={`dot-${pi}`}
                cx={p.x}
                cy={p.y}
                r={1.5 * scale}
                fill={ring.color}
                opacity={0.5}
                style={{
                  animation: `cp-mandala-segment ${2 + ring.index * 0.3}s ${pi * 0.2}s ease-in-out infinite`,
                }}
              />
            ))}

            {/* Orbit circle */}
            <circle
              cx={s}
              cy={s}
              r={ring.radius}
              fill="none"
              stroke={ring.color}
              strokeWidth={0.5}
              strokeDasharray="4 8"
              opacity={0.15}
              style={{
                animation: `cp-rotate-${ring.index % 2 === 0 ? 'cw' : 'ccw'} ${15 + ring.index * 5}s linear infinite`,
                transformOrigin: `${s}px ${s}px`,
              }}
            />
          </g>
        )
      })}

      {/* Flower of Life pattern (inner) */}
      {scale > 0.6 &&
        Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const cx = s + Math.cos(angle) * s * 0.15
          const cy = s + Math.sin(angle) * s * 0.15
          return (
            <circle
              key={`flower-${i}`}
              cx={cx}
              cy={cy}
              r={s * 0.15}
              fill="none"
              stroke={ENERGY_PALETTE.gold.main}
              strokeWidth={0.4}
              opacity={0.12}
              style={{
                animation: `cp-breathe-deep ${4}s ${i * 0.3}s ease-in-out infinite`,
                transformOrigin: `${cx}px ${cy}px`,
              }}
            />
          )
        })}
    </svg>
  )
})
SacredGeometry.displayName = 'SacredGeometry'

// ═══════════════════════════════════════════════════════════════════
// 🌀 ORBITING ENERGY PARTICLES
// ═══════════════════════════════════════════════════════════════════

const OrbitingParticles = memo(({ containerSize, scale }) => {
  const particles = useMemo(() => {
    const count = scale > 0.8 ? 18 : scale > 0.6 ? 12 : 8
    return Array.from({ length: count }, (_, i) => {
      const orbitR = containerSize * 0.15 + Math.random() * containerSize * 0.3
      const colorKey = ENERGY_KEYS[i % ENERGY_KEYS.length]
      return {
        id: i,
        orbitRadius: orbitR,
        startAngle: (i / count) * 360,
        duration: 6 + Math.random() * 8,
        size: (2 + Math.random() * 3) * scale,
        color: ENERGY_PALETTE[colorKey].main,
        glow: ENERGY_PALETTE[colorKey].glow,
        reverse: i % 3 === 0,
      }
    })
  }, [containerSize, scale])

  const center = containerSize / 2

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: containerSize,
        height: containerSize,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 6,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            width: containerSize,
            height: containerSize,
            top: 0,
            left: 0,
            animation: `cp-rotate-${p.reverse ? 'ccw' : 'cw'} ${p.duration}s linear infinite`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.glow}, 0 0 ${p.size * 4}px ${p.glow}`,
              left: center + p.orbitRadius - p.size / 2,
              top: center - p.size / 2,
              transform: `rotate(${p.startAngle}deg)`,
              transformOrigin: `${-p.orbitRadius + p.size / 2}px ${p.size / 2}px`,
            }}
          />
        </div>
      ))}
    </div>
  )
})
OrbitingParticles.displayName = 'OrbitingParticles'

// ═══════════════════════════════════════════════════════════════════
// 🌊 ENERGY WAVES (Expanding Rings)
// ═══════════════════════════════════════════════════════════════════

const EnergyWaves = memo(({ scale }) => {
  const waves = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        delay: i * 1.2,
        duration: 4 + i * 0.5,
        color: ENERGY_PALETTE[ENERGY_KEYS[i % ENERGY_KEYS.length]].main,
      })),
    []
  )

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {waves.map((w) => (
        <div
          key={w.id}
          className="absolute rounded-full"
          style={{
            width: 60 * scale,
            height: 60 * scale,
            top: '50%',
            left: '50%',
            border: `1.5px solid ${w.color}`,
            opacity: 0,
            animation: `cp-wave-expand ${w.duration}s ${w.delay}s ease-out infinite`,
          }}
        />
      ))}
    </div>
  )
})
EnergyWaves.displayName = 'EnergyWaves'

// ═══════════════════════════════════════════════════════════════════
// 🧬 DNA ENERGY HELIX
// ═══════════════════════════════════════════════════════════════════

const EnergyHelix = memo(({ containerSize, scale }) => {
  const strands = useMemo(() => {
    if (scale < 0.6) return []
    const count = scale > 0.8 ? 10 : 6
    return Array.from({ length: count }, (_, i) => {
      const colorKey = ENERGY_KEYS[i % ENERGY_KEYS.length]
      return {
        id: i,
        delay: i * 0.4,
        duration: 4 + Math.random() * 2,
        xOffset: (Math.sin((i / count) * Math.PI * 2) * containerSize * 0.15),
        color: ENERGY_PALETTE[colorKey].main,
        glow: ENERGY_PALETTE[colorKey].glow,
        size: (2 + Math.random() * 2) * scale,
      }
    })
  }, [containerSize, scale])

  if (strands.length === 0) return null

  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        width: containerSize * 0.4,
        height: containerSize * 0.8,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 4,
      }}
    >
      {strands.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.glow}`,
            left: `calc(50% + ${s.xOffset}px)`,
            bottom: 0,
            opacity: 0,
            animation: `cp-float-up ${s.duration}s ${s.delay}s ease-in-out infinite`,
            '--float-dist': `${-containerSize * 0.7}px`,
          }}
        />
      ))}
    </div>
  )
})
EnergyHelix.displayName = 'EnergyHelix'

// ═══════════════════════════════════════════════════════════════════
// 🕉️ CENTRAL SOUL CORE
// ═══════════════════════════════════════════════════════════════════

const SoulCore = memo(({ scale }) => {
  const coreSize = 50 * scale
  const innerSize = 32 * scale

  return (
    <div
      className="absolute"
      style={{
        width: coreSize,
        height: coreSize,
        top: '50%',
        left: '50%',
        zIndex: 20,
        animation: 'cp-glow-pulse 3s ease-in-out infinite',
      }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: coreSize * 1.6,
          height: coreSize * 1.6,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${ENERGY_PALETTE.violet.light} 0%, transparent 70%)`,
          animation: 'cp-breathe-deep 3s ease-in-out infinite',
        }}
      />

      {/* Spinning inner rings */}
      <div
        className="absolute rounded-full"
        style={{
          width: coreSize * 1.2,
          height: coreSize * 1.2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: `1px solid ${ENERGY_PALETTE.violet.main}40`,
          borderTopColor: ENERGY_PALETTE.gold.main,
          borderBottomColor: 'transparent',
          animation: 'cp-rotate-cw 2s linear infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: coreSize * 1.05,
          height: coreSize * 1.05,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          border: `1px solid ${ENERGY_PALETTE.cyan.main}30`,
          borderLeftColor: ENERGY_PALETTE.cyan.main,
          borderRightColor: 'transparent',
          animation: 'cp-rotate-ccw 1.5s linear infinite',
        }}
      />

      {/* Core sphere */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: innerSize,
          height: innerSize,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle at 35% 35%, ${ENERGY_PALETTE.violet.main}E6 0%, ${ENERGY_PALETTE.indigo.main}CC 40%, #1a0533E6 100%)`,
          boxShadow: `
            inset 0 0 ${10 * scale}px rgba(255,255,255,0.15),
            0 0 ${15 * scale}px ${ENERGY_PALETTE.violet.glow},
            0 0 ${30 * scale}px ${ENERGY_PALETTE.violet.glow}
          `,
        }}
      >
        <span
          style={{
            fontSize: 16 * scale,
            color: ENERGY_PALETTE.gold.main,
            lineHeight: 1,
            animation: 'cp-om-pulse 2.5s ease-in-out infinite',
            zIndex: 25,
          }}
        >
          ॐ
        </span>
      </div>
    </div>
  )
})
SoulCore.displayName = 'SoulCore'

// ═══════════════════════════════════════════════════════════════════
// 📿 FLOATING SANSKRIT RING
// ═══════════════════════════════════════════════════════════════════

const SanskritRing = memo(({ radius, scale, reverse = false }) => {
  const chars = scale > 0.7 ? SANSKRIT_CHARS : SANSKRIT_CHARS.slice(0, 6)

  return (
    <div
      className="absolute"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: `cp-rotate-${reverse ? 'ccw' : 'cw'} ${25 + radius * 0.1}s linear infinite`,
        zIndex: 7,
      }}
    >
      {chars.map((char, i) => {
        const angle = (i / chars.length) * 360
        const rad = (angle * Math.PI) / 180
        const x = radius + Math.cos(rad - Math.PI / 2) * radius
        const y = radius + Math.sin(rad - Math.PI / 2) * radius

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${reverse ? 360 - angle : -angle}deg)`,
              fontSize: 10 * scale,
              color: ENERGY_PALETTE.gold.main,
              opacity: 0.25,
              animation: `cp-sacred-float ${3 + i * 0.2}s ${i * 0.3}s ease-in-out infinite`,
              textShadow: `0 0 6px ${ENERGY_PALETTE.gold.glow}`,
            }}
          >
            {char}
          </div>
        )
      })}
    </div>
  )
})
SanskritRing.displayName = 'SanskritRing'

// ═══════════════════════════════════════════════════════════════════
// 🔆 ENERGY BEAMS
// ═══════════════════════════════════════════════════════════════════

const EnergyBeams = memo(({ scale }) => {
  if (scale < 0.65) return null

  const beamCount = scale > 0.85 ? 8 : 6

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: 0,
        height: 0,
        top: '50%',
        left: '50%',
        zIndex: 2,
      }}
    >
      {Array.from({ length: beamCount }, (_, i) => {
        const angle = (i / beamCount) * 360
        const colorKey = ENERGY_KEYS[i % ENERGY_KEYS.length]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 1.5 * scale,
              height: 100 * scale,
              background: `linear-gradient(to top, ${ENERGY_PALETTE[colorKey].main}20, transparent)`,
              transformOrigin: 'bottom center',
              transform: `rotate(${angle}deg)`,
              bottom: 0,
              left: -0.75 * scale,
              animation: `cp-energy-stream ${3 + i * 0.3}s ${i * 0.4}s ease-in-out infinite`,
            }}
          />
        )
      })}
    </div>
  )
})
EnergyBeams.displayName = 'EnergyBeams'

// ═══════════════════════════════════════════════════════════════════
// 📊 PROGRESS INDICATOR
// ═══════════════════════════════════════════════════════════════════

const ProgressIndicator = memo(({ progress, scale, isMobile }) => {
  const barWidth = isMobile ? 160 : 220
  const barHeight = isMobile ? 2 : 3

  return (
    <div
      className="flex flex-col items-center"
      style={{
        gap: 8 * scale,
        animation: 'cp-fade-in-up 0.6s ease-out both',
      }}
    >
      {/* Progress bar */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: barWidth,
          height: barHeight,
          backgroundColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${ENERGY_PALETTE.violet.main}, ${ENERGY_PALETTE.cyan.main}, ${ENERGY_PALETTE.gold.main})`,
            backgroundSize: '200% 100%',
            animation: 'cp-shimmer 2s linear infinite, cp-progress-glow 1.5s ease-in-out infinite',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          fontSize: isMobile ? 10 : 12,
          color: 'rgba(255,255,255,0.35)',
          letterSpacing: 3,
          fontFamily: "'Georgia', serif",
        }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  )
})
ProgressIndicator.displayName = 'ProgressIndicator'

// ═══════════════════════════════════════════════════════════════════
// 🌌 MAIN COSMIC PRELOADER
// ═══════════════════════════════════════════════════════════════════

const CosmicPreloader = memo(
  ({
    text = 'Awakening your cosmic energy...',
    showText = true,
    onComplete,
    duration = 4000,
  }) => {
    const { w, h, type } = useResponsive()
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    // Inject styles
    useEffect(() => {
      injectKeyframes()
    }, [])

    // Simulate progress
    useEffect(() => {
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const p = Math.min((elapsed / duration) * 100, 100)
        setProgress(p)

        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            onComplete?.()
          }, 500)
        }
      }, 30)

      return () => clearInterval(interval)
    }, [duration, onComplete])

    // Responsive config
    const config = useMemo(() => {
      const minDim = Math.min(w || 400, h || 700)

      switch (type) {
        case 'mobile-sm':
          return {
            containerSize: Math.min(minDim * 0.75, 260),
            scale: 0.55,
            starCount: 40,
            showHelix: false,
            showSanskrit: false,
            showBeams: false,
            isMobile: true,
          }
        case 'mobile':
          return {
            containerSize: Math.min(minDim * 0.78, 300),
            scale: 0.65,
            starCount: 50,
            showHelix: true,
            showSanskrit: false,
            showBeams: false,
            isMobile: true,
          }
        case 'tablet-sm':
          return {
            containerSize: Math.min(minDim * 0.7, 380),
            scale: 0.78,
            starCount: 60,
            showHelix: true,
            showSanskrit: true,
            showBeams: true,
            isMobile: false,
          }
        case 'tablet':
          return {
            containerSize: Math.min(minDim * 0.65, 440),
            scale: 0.88,
            starCount: 70,
            showHelix: true,
            showSanskrit: true,
            showBeams: true,
            isMobile: false,
          }
        default:
          return {
            containerSize: Math.min(minDim * 0.55, 520),
            scale: 1,
            starCount: 80,
            showHelix: true,
            showSanskrit: true,
            showBeams: true,
            isMobile: false,
          }
      }
    }, [w, h, type])

    if (!isVisible) return null

    const { containerSize, scale: s, starCount, showHelix, showSanskrit, showBeams, isMobile } = config
    const sanskritRadius = containerSize * 0.42

    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{
          zIndex: 9999,
          background: 'radial-gradient(ellipse at 50% 45%, #0f0520 0%, #070215 40%, #020008 100%)',
          fontFamily: "'Georgia', 'Times New Roman', serif",
          transition: 'opacity 0.5s ease-out',
          opacity: progress >= 100 ? 0 : 1,
        }}
      >
        {/* Cosmic dust background */}
        <CosmicDust count={starCount} />

        {/* Energy waves */}
        <EnergyWaves scale={s} />

        {/* ─── MAIN ANIMATION CONTAINER ─── */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: containerSize,
            height: containerSize,
          }}
        >
          {/* Sacred Geometry Mandala */}
          <SacredGeometry size={containerSize} scale={s} />

          {/* Orbiting Particles */}
          <OrbitingParticles containerSize={containerSize} scale={s} />

          {/* Energy Helix */}
          {showHelix && <EnergyHelix containerSize={containerSize} scale={s} />}

          {/* Sanskrit Ring */}
          {showSanskrit && (
            <>
              <SanskritRing radius={sanskritRadius} scale={s} />
              {s > 0.85 && (
                <SanskritRing
                  radius={sanskritRadius * 0.65}
                  scale={s * 0.85}
                  reverse
                />
              )}
            </>
          )}

          {/* Energy Beams */}
          {showBeams && <EnergyBeams scale={s} />}

          {/* Central Soul Core */}
          <SoulCore scale={s} />
        </div>

        {/* ─── BOTTOM TEXT AREA ─── */}
        {showText && (
          <div
            className="flex flex-col items-center"
            style={{
              marginTop: isMobile ? 16 : 28,
              zIndex: 30,
              gap: isMobile ? 8 : 14,
              maxWidth: isMobile ? '85vw' : '400px',
            }}
          >
            {/* Loading text */}
            <p
              className="text-center italic"
              style={{
                fontSize: isMobile ? 11 : 14,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: 1,
                animation: 'cp-breathe 3s ease-in-out infinite',
                lineHeight: 1.5,
              }}
            >
              {text}
            </p>

            {/* Scrolling mantra */}
            <div
              className="relative overflow-hidden"
              style={{
                width: isMobile ? 180 : 260,
                height: 14,
                maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            >
              <span
                className="inline-block whitespace-nowrap"
                style={{
                  color: ENERGY_PALETTE.gold.main,
                  opacity: 0.25,
                  fontSize: isMobile ? 9 : 10,
                  letterSpacing: 2,
                  animation: 'cp-shimmer 3s linear infinite',
                  backgroundImage: `linear-gradient(90deg, ${ENERGY_PALETTE.gold.main}40, ${ENERGY_PALETTE.gold.main}AA, ${ENERGY_PALETTE.gold.main}40)`,
                  backgroundSize: '200% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॐ
              </span>
            </div>

            {/* Energy dots */}
            <div className="flex items-center" style={{ gap: isMobile ? 4 : 6 }}>
              {ENERGY_KEYS.slice(0, 5).map((key, i) => (
                <span
                  key={key}
                  className="rounded-full"
                  style={{
                    width: isMobile ? 4 : 5,
                    height: isMobile ? 4 : 5,
                    backgroundColor: ENERGY_PALETTE[key].main,
                    boxShadow: `0 0 4px ${ENERGY_PALETTE[key].glow}`,
                    animation: `cp-dot-wave 1.5s ${i * 0.18}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>

            {/* Progress */}
            <ProgressIndicator progress={progress} scale={s} isMobile={isMobile} />
          </div>
        )}
      </div>
    )
  }
)

CosmicPreloader.displayName = 'CosmicPreloader'

export default CosmicPreloader