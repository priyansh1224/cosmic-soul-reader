// ═══════════════════════════════════════════════════════════════════
// 🌟 COSMIC WELCOME - Hero Landing Section (Enhanced Background)
// ═══════════════════════════════════════════════════════════════════

import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HolographicButton } from '@components/ui'
import useCosmicStore from '@stores/useCosmicStore'

// ── Detect mobile once at module level ──
const getIsMobile = () =>
  typeof window !== 'undefined' ? window.innerWidth < 768 : false
const isMobileInit = getIsMobile()

// ── INJECT ENHANCED KEYFRAMES ──
const STYLE_ID = 'cosmic-welcome-enhanced-keyframes'

const injectStyles = () => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID))
    return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    /* ── Existing animations preserved ── */
    @keyframes twinkle {
      0%, 100% { opacity: 0.1; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(-5px); }
      75% { transform: translateY(-25px) translateX(8px); }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.15); opacity: 1; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* ══════════════════════════════════════════ */
    /* ✨ NEW ENHANCED BACKGROUND ANIMATIONS     */
    /* ══════════════════════════════════════════ */

    /* Constellation lines connecting stars */
    @keyframes cw-constellation-draw {
      0% { stroke-dashoffset: 200; opacity: 0; }
      30% { opacity: 0.15; }
      50% { stroke-dashoffset: 0; opacity: 0.2; }
      70% { opacity: 0.15; }
      100% { stroke-dashoffset: -200; opacity: 0; }
    }

    /* Shooting star across the sky */
    @keyframes cw-shooting-star {
      0% {
        transform: translateX(0) translateY(0) rotate(-35deg);
        opacity: 0;
        width: 0;
      }
      5% { opacity: 1; width: 80px; }
      15% { opacity: 1; }
      30% {
        transform: translateX(300px) translateY(180px) rotate(-35deg);
        opacity: 0;
        width: 80px;
      }
      100% { opacity: 0; width: 0; }
    }

    @keyframes cw-shooting-star-mobile {
      0% {
        transform: translateX(0) translateY(0) rotate(-35deg);
        opacity: 0;
        width: 0;
      }
      5% { opacity: 1; width: 50px; }
      15% { opacity: 1; }
      30% {
        transform: translateX(180px) translateY(110px) rotate(-35deg);
        opacity: 0;
        width: 50px;
      }
      100% { opacity: 0; width: 0; }
    }

    /* Aurora wave flowing across top */
    @keyframes cw-aurora-wave {
      0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
      20% { opacity: 0.08; }
      50% { opacity: 0.12; }
      80% { opacity: 0.06; }
      100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
    }

    /* Sacred geometry rotation with breathe */
    @keyframes cw-sacred-rotate {
      0% { transform: rotate(0deg) scale(1); opacity: 0.06; }
      25% { opacity: 0.1; }
      50% { transform: rotate(180deg) scale(1.05); opacity: 0.08; }
      75% { opacity: 0.1; }
      100% { transform: rotate(360deg) scale(1); opacity: 0.06; }
    }

    /* Particle drift upward */
    @keyframes cw-particle-rise {
      0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
      10% { opacity: 0.6; }
      50% { transform: translateY(var(--rise-y, -200px)) translateX(var(--drift-x, 30px)) scale(0.6); opacity: 0.3; }
      100% { transform: translateY(var(--rise-y2, -400px)) translateX(var(--drift-x2, -20px)) scale(0.2); opacity: 0; }
    }

    /* Nebula cloud morph */
    @keyframes cw-nebula-morph {
      0%, 100% {
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        transform: translate(-50%, -50%) rotate(0deg) scale(1);
      }
      25% {
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
        transform: translate(-48%, -52%) rotate(5deg) scale(1.05);
      }
      50% {
        border-radius: 50% 60% 40% 60% / 40% 50% 60% 50%;
        transform: translate(-52%, -48%) rotate(-3deg) scale(0.98);
      }
      75% {
        border-radius: 40% 50% 60% 50% / 60% 40% 50% 60%;
        transform: translate(-50%, -51%) rotate(2deg) scale(1.03);
      }
    }

    /* Energy ring pulse */
    @keyframes cw-ring-pulse {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.15; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.05; }
      100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.15; }
    }

    /* Cosmic dust swirl */
    @keyframes cw-dust-swirl {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Vertical energy beam */
    @keyframes cw-energy-beam {
      0%, 100% { opacity: 0.03; transform: scaleY(0.8) scaleX(1); }
      50% { opacity: 0.08; transform: scaleY(1.1) scaleX(1.3); }
    }

    /* Star cluster shimmer */
    @keyframes cw-cluster-shimmer {
      0%, 100% { opacity: 0.3; filter: blur(0px); }
      50% { opacity: 0.8; filter: blur(0.5px); }
    }

    /* Chakra color cycle for accent elements */
    @keyframes cw-chakra-cycle {
      0%   { color: rgba(244, 63, 94, 0.15); }
      14%  { color: rgba(255, 152, 0, 0.15); }
      28%  { color: rgba(255, 193, 7, 0.15); }
      42%  { color: rgba(76, 175, 80, 0.15); }
      57%  { color: rgba(6, 182, 212, 0.15); }
      71%  { color: rgba(99, 102, 241, 0.15); }
      85%  { color: rgba(139, 92, 246, 0.15); }
      100% { color: rgba(244, 63, 94, 0.15); }
    }

    /* Subtle grid lines */
    @keyframes cw-grid-reveal {
      0%, 100% { opacity: 0.01; }
      50% { opacity: 0.04; }
    }
  `
  document.head.appendChild(style)
}

// ═══════════════════════════════════════════════════════════════════
// Static data arrays — created once, never re-computed
// ═══════════════════════════════════════════════════════════════════

// Original stars
const STARS = Array.from({ length: isMobileInit ? 18 : 30 }, (_, i) => ({
  id: i,
  top: `${(i * 37 + 11) % 100}%`,
  left: `${(i * 53 + 7) % 100}%`,
  size: i % 5 === 0 ? 2 : 1,
  dur: `${2 + (i % 4)}s`,
  delay: `${(i * 0.3) % 3}s`,
}))

// Additional background stars for depth (smaller, dimmer)
const DEEP_STARS = Array.from(
  { length: isMobileInit ? 25 : 50 },
  (_, i) => ({
    id: i,
    top: `${(i * 43 + 17) % 100}%`,
    left: `${(i * 61 + 23) % 100}%`,
    size: Math.random() > 0.7 ? 1.5 : 0.8,
    dur: `${3 + (i % 5)}s`,
    delay: `${(i * 0.4) % 5}s`,
    color:
      i % 7 === 0
        ? 'rgba(139,92,246,0.8)'
        : i % 11 === 0
          ? 'rgba(6,182,212,0.7)'
          : i % 13 === 0
            ? 'rgba(255,213,79,0.7)'
            : 'rgba(255,255,255,0.6)',
  })
)

// Floating orbs
const ORBS = [
  {
    size: 180,
    top: '10%',
    left: '5%',
    color: 'rgba(124,58,237,0.12)',
    dur: '8s',
    delay: '0s',
  },
  {
    size: 120,
    top: '60%',
    left: '80%',
    color: 'rgba(236,72,153,0.10)',
    dur: '10s',
    delay: '2s',
  },
  {
    size: 90,
    top: '80%',
    left: '15%',
    color: 'rgba(6,182,212,0.08)',
    dur: '7s',
    delay: '1s',
  },
  {
    size: 60,
    top: '25%',
    left: '70%',
    color: 'rgba(255,213,79,0.08)',
    dur: '9s',
    delay: '3s',
  },
]

// Zodiac drifters
const DRIFTERS = ['♈', '♌', '♎', '♓']

// Shooting star configs
const SHOOTING_STARS = [
  { top: '12%', left: '15%', delay: '1s', dur: '6s' },
  { top: '25%', left: '55%', delay: '4s', dur: '7s' },
  { top: '8%', left: '75%', delay: '8s', dur: '5.5s' },
]

// Rising energy particles
const ENERGY_PARTICLES = Array.from(
  { length: isMobileInit ? 8 : 15 },
  (_, i) => {
    const colors = [
      'rgba(124,58,237,0.6)',
      'rgba(236,72,153,0.5)',
      'rgba(6,182,212,0.5)',
      'rgba(255,213,79,0.4)',
      'rgba(139,92,246,0.5)',
      'rgba(16,185,129,0.4)',
    ]
    return {
      id: i,
      left: `${8 + (i * 67 + 13) % 84}%`,
      size: 2 + Math.random() * 3,
      color: colors[i % colors.length],
      delay: `${i * 0.8}s`,
      dur: `${4 + Math.random() * 4}s`,
      riseY: -(150 + Math.random() * 250),
      driftX: (Math.random() - 0.5) * 80,
      riseY2: -(300 + Math.random() * 200),
      driftX2: (Math.random() - 0.5) * 60,
    }
  }
)

// Constellation line pairs (index references into STARS + DEEP_STARS)
const CONSTELLATION_LINES = isMobileInit
  ? [
      { x1: '15%', y1: '20%', x2: '25%', y2: '35%', delay: '0s', dur: '8s' },
      { x1: '70%', y1: '15%', x2: '80%', y2: '30%', delay: '3s', dur: '9s' },
    ]
  : [
      {
        x1: '15%',
        y1: '20%',
        x2: '25%',
        y2: '35%',
        delay: '0s',
        dur: '8s',
      },
      {
        x1: '25%',
        y1: '35%',
        x2: '18%',
        y2: '50%',
        delay: '1s',
        dur: '9s',
      },
      {
        x1: '70%',
        y1: '15%',
        x2: '80%',
        y2: '30%',
        delay: '2s',
        dur: '7s',
      },
      {
        x1: '80%',
        y1: '30%',
        x2: '75%',
        y2: '45%',
        delay: '3s',
        dur: '10s',
      },
      {
        x1: '55%',
        y1: '65%',
        x2: '65%',
        y2: '78%',
        delay: '4s',
        dur: '8s',
      },
      {
        x1: '30%',
        y1: '70%',
        x2: '40%',
        y2: '82%',
        delay: '5s',
        dur: '9s',
      },
    ]

// Sacred geometry symbol positions
const SACRED_SYMBOLS = isMobileInit
  ? []
  : [
      {
        symbol: '⬡',
        size: 120,
        top: '15%',
        left: '78%',
        dur: '25s',
        opacity: 0.04,
      },
      {
        symbol: '△',
        size: 90,
        top: '70%',
        left: '8%',
        dur: '30s',
        opacity: 0.03,
      },
      {
        symbol: '◇',
        size: 100,
        top: '45%',
        left: '88%',
        dur: '22s',
        opacity: 0.035,
      },
    ]

// Feature pills
const FEATURE_PILLS = [
  { icon: '♈', label: 'Zodiac' },
  { icon: '🔢', label: 'Numerology' },
  { icon: '💕', label: 'Compatibility' },
  { icon: '🧘', label: 'Chakra' },
  { icon: '🔮', label: 'Predictions' },
]

// ═══════════════════════════════════════════════════════════════════
// 🌌 BACKGROUND LAYERS (all pure CSS, memoized)
// ═══════════════════════════════════════════════════════════════════

/** Layer 1: Deep space stars with color tints */
const DeepStarField = memo(() => (
  <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
    {DEEP_STARS.map((s) => (
      <div
        key={`ds-${s.id}`}
        className="absolute rounded-full"
        style={{
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          backgroundColor: s.color,
          animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
        }}
      />
    ))}
  </div>
))
DeepStarField.displayName = 'DeepStarField'

/** Layer 2: Constellation lines that draw and fade */
const ConstellationLines = memo(() => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ zIndex: 2 }}
    preserveAspectRatio="none"
  >
    {CONSTELLATION_LINES.map((line, i) => (
      <line
        key={`cl-${i}`}
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke="rgba(139,92,246,0.25)"
        strokeWidth="0.5"
        strokeDasharray="200"
        strokeDashoffset="200"
        style={{
          animation: `cw-constellation-draw ${line.dur} ${line.delay} ease-in-out infinite`,
        }}
      />
    ))}
    {/* Small dots at constellation endpoints */}
    {CONSTELLATION_LINES.map((line, i) => (
      <g key={`cp-${i}`}>
        <circle
          cx={line.x1}
          cy={line.y1}
          r="1.5"
          fill="rgba(139,92,246,0.3)"
          style={{
            animation: `cw-cluster-shimmer ${
              3 + (i % 3)
            }s ${i * 0.5}s ease-in-out infinite`,
          }}
        />
        <circle
          cx={line.x2}
          cy={line.y2}
          r="1.5"
          fill="rgba(139,92,246,0.3)"
          style={{
            animation: `cw-cluster-shimmer ${
              3 + ((i + 1) % 3)
            }s ${(i + 1) * 0.5}s ease-in-out infinite`,
          }}
        />
      </g>
    ))}
  </svg>
))
ConstellationLines.displayName = 'ConstellationLines'

/** Layer 3: Shooting stars */
const ShootingStars = memo(({ isMobile }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
    {SHOOTING_STARS.map((ss, i) => (
      <div
        key={`ss-${i}`}
        className="absolute"
        style={{
          top: ss.top,
          left: ss.left,
          width: 0,
          height: isMobile ? 1 : 1.5,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(139,92,246,0.6), transparent)`,
          borderRadius: 2,
          animation: `${isMobile ? 'cw-shooting-star-mobile' : 'cw-shooting-star'} ${ss.dur} ${ss.delay} ease-in infinite`,
          willChange: 'transform, opacity, width',
        }}
      />
    ))}
  </div>
))
ShootingStars.displayName = 'ShootingStars'

/** Layer 4: Aurora waves at the top */
const AuroraWaves = memo(() => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    style={{ zIndex: 2 }}
  >
    {/* Aurora band 1 */}
    <div
      className="absolute"
      style={{
        top: '5%',
        left: '-50%',
        width: '100%',
        height: 120,
        background:
          'linear-gradient(90deg, transparent, rgba(124,58,237,0.08), rgba(6,182,212,0.06), rgba(236,72,153,0.05), transparent)',
        filter: 'blur(40px)',
        animation: 'cw-aurora-wave 18s 0s ease-in-out infinite',
        willChange: 'transform, opacity',
      }}
    />
    {/* Aurora band 2 */}
    <div
      className="absolute"
      style={{
        top: '15%',
        left: '-50%',
        width: '100%',
        height: 80,
        background:
          'linear-gradient(90deg, transparent, rgba(236,72,153,0.06), rgba(139,92,246,0.08), rgba(255,213,79,0.04), transparent)',
        filter: 'blur(50px)',
        animation: 'cw-aurora-wave 22s 5s ease-in-out infinite',
        willChange: 'transform, opacity',
      }}
    />
  </div>
))
AuroraWaves.displayName = 'AuroraWaves'

/** Layer 5: Nebula morphing clouds */
const NebulaClouds = memo(() => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ zIndex: 1 }}
  >
    {/* Primary nebula */}
    <div
      className="absolute"
      style={{
        width: 500,
        height: 500,
        top: '50%',
        left: '50%',
        background:
          'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, rgba(236,72,153,0.04) 30%, transparent 70%)',
        filter: 'blur(60px)',
        animation: 'cw-nebula-morph 20s ease-in-out infinite',
        willChange: 'border-radius, transform',
      }}
    />
    {/* Secondary nebula offset */}
    <div
      className="absolute"
      style={{
        width: 400,
        height: 350,
        top: '30%',
        left: '60%',
        background:
          'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, rgba(16,185,129,0.03) 40%, transparent 70%)',
        filter: 'blur(50px)',
        animation: 'cw-nebula-morph 25s -8s ease-in-out infinite',
        willChange: 'border-radius, transform',
      }}
    />
    {/* Warm nebula */}
    <div
      className="absolute"
      style={{
        width: 350,
        height: 300,
        top: '65%',
        left: '20%',
        background:
          'radial-gradient(ellipse, rgba(255,213,79,0.04) 0%, rgba(245,158,11,0.02) 40%, transparent 70%)',
        filter: 'blur(45px)',
        animation: 'cw-nebula-morph 22s -12s ease-in-out infinite',
        willChange: 'border-radius, transform',
      }}
    />
  </div>
))
NebulaClouds.displayName = 'NebulaClouds'

/** Layer 6: Rising energy particles */
const EnergyParticles = memo(() => (
  <div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    style={{ zIndex: 4 }}
  >
    {ENERGY_PARTICLES.map((p) => (
      <div
        key={`ep-${p.id}`}
        className="absolute rounded-full"
        style={{
          left: p.left,
          bottom: '5%',
          width: p.size,
          height: p.size,
          backgroundColor: p.color,
          boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          opacity: 0,
          '--rise-y': `${p.riseY}px`,
          '--drift-x': `${p.driftX}px`,
          '--rise-y2': `${p.riseY2}px`,
          '--drift-x2': `${p.driftX2}px`,
          animation: `cw-particle-rise ${p.dur} ${p.delay} ease-in-out infinite`,
          willChange: 'transform, opacity',
        }}
      />
    ))}
  </div>
))
EnergyParticles.displayName = 'EnergyParticles'

/** Layer 7: Sacred geometry symbols (desktop only) */
const SacredGeometryBg = memo(() => {
  if (SACRED_SYMBOLS.length === 0) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {SACRED_SYMBOLS.map((sg, i) => (
        <div
          key={`sg-${i}`}
          className="absolute font-display select-none"
          style={{
            fontSize: sg.size,
            top: sg.top,
            left: sg.left,
            color: 'rgba(139,92,246,1)',
            opacity: sg.opacity,
            animation: `cw-sacred-rotate ${sg.dur} linear infinite`,
            willChange: 'transform, opacity',
          }}
        >
          {sg.symbol}
        </div>
      ))}
    </div>
  )
})
SacredGeometryBg.displayName = 'SacredGeometryBg'

/** Layer 8: Subtle energy rings around center */
const EnergyRings = memo(() => (
  <div
    className="absolute top-1/2 left-1/2 pointer-events-none"
    style={{ zIndex: 2 }}
  >
    {[
      {
        size: 500,
        color: 'rgba(124,58,237,0.06)',
        dur: '8s',
        delay: '0s',
        border: 'solid',
      },
      {
        size: 650,
        color: 'rgba(236,72,153,0.04)',
        dur: '10s',
        delay: '2s',
        border: 'dashed',
      },
      {
        size: 800,
        color: 'rgba(6,182,212,0.03)',
        dur: '12s',
        delay: '4s',
        border: 'dotted',
      },
    ].map((ring, i) => (
      <div
        key={`er-${i}`}
        className="absolute rounded-full"
        style={{
          width: ring.size,
          height: ring.size,
          top: '50%',
          left: '50%',
          border: `1px ${ring.border} ${ring.color}`,
          animation: `cw-ring-pulse ${ring.dur} ${ring.delay} ease-in-out infinite`,
          willChange: 'transform, opacity',
        }}
      />
    ))}
  </div>
))
EnergyRings.displayName = 'EnergyRings'

/** Layer 9: Vertical energy beams from center */
const EnergyBeams = memo(() => (
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style={{ zIndex: 2 }}
  >
    {/* Vertical beam */}
    <div
      className="absolute"
      style={{
        width: 2,
        height: '100vh',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background:
          'linear-gradient(to bottom, transparent 0%, rgba(124,58,237,0.08) 30%, rgba(255,213,79,0.04) 50%, rgba(124,58,237,0.08) 70%, transparent 100%)',
        animation: 'cw-energy-beam 6s ease-in-out infinite',
        willChange: 'transform, opacity',
      }}
    />
    {/* Horizontal beam (subtle) */}
    <div
      className="absolute"
      style={{
        width: '100vw',
        height: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background:
          'linear-gradient(to right, transparent 0%, rgba(236,72,153,0.05) 30%, rgba(6,182,212,0.03) 50%, rgba(236,72,153,0.05) 70%, transparent 100%)',
        animation: 'cw-energy-beam 8s 2s ease-in-out infinite',
        willChange: 'transform, opacity',
      }}
    />
  </div>
))
EnergyBeams.displayName = 'EnergyBeams'

/** Layer 10: Cosmic dust swirl ring */
const CosmicDustSwirl = memo(({ isMobile }) => {
  if (isMobile) return null

  const dustDots = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360
    const rad = (angle * Math.PI) / 180
    const radius = 220 + Math.random() * 40
    return {
      id: i,
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
      size: 1 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.2,
    }
  })

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        width: 0,
        height: 0,
        zIndex: 3,
        animation: 'cw-dust-swirl 60s linear infinite',
        willChange: 'transform',
      }}
    >
      {dustDots.map((d) => (
        <div
          key={`cd-${d.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: d.size,
            height: d.size,
            left: d.x,
            top: d.y,
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  )
})
CosmicDustSwirl.displayName = 'CosmicDustSwirl'

// ═══════════════════════════════════════════════════════════════════
// 🌟 MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════

const CosmicWelcome = memo(() => {
  const { goToForm } = useCosmicStore()
  const [isMobile, setIsMobile] = useState(isMobileInit)

  // Inject enhanced keyframes
  useEffect(() => {
    injectStyles()
  }, [])

  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleBeginReading = () => {
    new Audio('/sounds/whoosh.mp3').play().catch(() => {})
    goToForm()
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-section-welcome">
      {/* ══════════════════════════════════════════════════════ */}
      {/* ✨ ENHANCED BACKGROUND ANIMATION LAYERS               */}
      {/* ══════════════════════════════════════════════════════ */}

      {/* Layer 1: Deep colored stars */}
      <DeepStarField />

      {/* Layer 2: Nebula clouds */}
      <NebulaClouds />

      {/* Layer 3: Aurora waves (top of screen) */}
      {!isMobile && <AuroraWaves />}

      {/* Layer 4: Constellation lines */}
      <ConstellationLines />

      {/* Layer 5: Shooting stars */}
      <ShootingStars isMobile={isMobile} />

      {/* Layer 6: Rising energy particles */}
      <EnergyParticles />

      {/* Layer 7: Sacred geometry (desktop) */}
      <SacredGeometryBg />

      {/* Layer 8: Energy rings around center */}
      {!isMobile && <EnergyRings />}

      {/* Layer 9: Energy beams (crosshair) */}
      {!isMobile && <EnergyBeams />}

      {/* Layer 10: Cosmic dust swirl */}
      <CosmicDustSwirl isMobile={isMobile} />

      {/* ══════════════════════════════════════════════════════ */}
      {/* ORIGINAL LAYERS (preserved exactly)                    */}
      {/* ══════════════════════════════════════════════════════ */}

      {/* ── STATIC STAR FIELD (CSS only) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* ── FLOATING BLOBS (CSS only, will-change: transform) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
        {ORBS.map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: 'blur(30px)',
              willChange: 'transform',
              animation: `float ${orb.dur} ease-in-out ${orb.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* ── DRIFTING ZODIAC SYMBOLS (CSS only) ── */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
          {DRIFTERS.map((sym, i) => (
            <div
              key={i}
              className="absolute text-white/5 font-display select-none"
              style={{
                fontSize: 80 + i * 20,
                top: `${15 + i * 20}%`,
                left: `${5 + i * 22}%`,
                animation: `float ${10 + i * 3}s ease-in-out ${i * 1.5}s infinite`,
                willChange: 'transform',
              }}
            >
              {sym}
            </div>
          ))}
        </div>
      )}

      {/* ── CENTRAL ORB ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ zIndex: 6 }}
      >
        <div className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px]">
          {/* Outer pulse ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
              animation: 'breathe 6s ease-in-out infinite',
            }}
          />
          {/* Mid ring */}
          <div
            className="absolute inset-[20%] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
              animation: 'breathe 5s ease-in-out 1s infinite',
            }}
          />
          {/* Core */}
          <div
            className="absolute inset-[35%] rounded-full"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, rgba(124,58,237,0.5) 40%, rgba(236,72,153,0.3) 70%, transparent 100%)',
              boxShadow:
                '0 0 40px rgba(124,58,237,0.35), inset 0 0 20px rgba(236,72,153,0.2)',
              animation: 'breathe 4s ease-in-out 0.5s infinite',
            }}
          />
          {/* Single slow orbit ring */}
          <div
            className="absolute inset-[8%] rounded-full border border-cosmic-purple-500/15"
            style={{ animation: 'spin 30s linear infinite' }}
          />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-none mb-1">
            <span className="text-gradient-gold">Cosmic</span>
          </h1>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-none mb-1">
            <span className="text-gradient-aurora">Soul</span>
          </h1>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-none">
            <span className="text-white/80">Reader</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mb-10 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <p className="font-body text-base sm:text-lg text-white/50 tracking-[0.2em] uppercase">
            Unlock the secrets of the cosmos
          </p>
          <p className="font-body text-sm sm:text-base text-white/30 tracking-wider">
            Discover your zodiac identity, soul purpose & cosmic destiny
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <HolographicButton
            variant="gold"
            size="xl"
            onClick={handleBeginReading}
            icon="✨"
            iconPosition="right"
          >
            Begin Your Reading
          </HolographicButton>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {FEATURE_PILLS.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                         bg-white/[0.04] border border-white/[0.07] 
                         text-white/40 text-xs sm:text-sm font-body"
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
})

CosmicWelcome.displayName = 'CosmicWelcome'
export default CosmicWelcome