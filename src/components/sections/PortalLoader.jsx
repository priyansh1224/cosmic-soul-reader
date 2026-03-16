// ═══════════════════════════════════════════════════════════════════
// 🕉️ PORTAL LOADER - Chakra Portal Animation (Pure Tailwind)
// File: src/components/sections/PortalLoader.jsx
// No external CSS required - fully responsive
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo, useEffect, useState } from 'react'

// ── 7 CHAKRAS ──
const CHAKRAS = [
  {
    id: 'sahasrara',
    english: 'Crown',
    displayPetals: 12,
    color: '#9b59b6',
    glowColor: 'rgba(155, 89, 182, 0.6)',
  },
  {
    id: 'ajna',
    english: 'Third Eye',
    displayPetals: 6,
    color: '#4a0e8f',
    glowColor: 'rgba(74, 14, 143, 0.6)',
  },
  {
    id: 'vishuddha',
    english: 'Throat',
    displayPetals: 10,
    color: '#00bcd4',
    glowColor: 'rgba(0, 188, 212, 0.6)',
  },
  {
    id: 'anahata',
    english: 'Heart',
    displayPetals: 12,
    color: '#4caf50',
    glowColor: 'rgba(76, 175, 80, 0.6)',
  },
  {
    id: 'manipura',
    english: 'Solar Plexus',
    displayPetals: 10,
    color: '#ffc107',
    glowColor: 'rgba(255, 193, 7, 0.6)',
  },
  {
    id: 'svadhisthana',
    english: 'Sacral',
    displayPetals: 6,
    color: '#ff9800',
    glowColor: 'rgba(255, 152, 0, 0.6)',
  },
  {
    id: 'muladhara',
    english: 'Root',
    displayPetals: 4,
    color: '#f44336',
    glowColor: 'rgba(244, 67, 54, 0.6)',
  },
]

// ── ZODIAC SIGNS ──
const ZODIAC_SIGNS = [
  { symbol: '♈', color: '#ef4444' },
  { symbol: '♉', color: '#22c55e' },
  { symbol: '♊', color: '#eab308' },
  { symbol: '♋', color: '#6366f1' },
  { symbol: '♌', color: '#f97316' },
  { symbol: '♍', color: '#84cc16' },
  { symbol: '♎', color: '#ec4899' },
  { symbol: '♏', color: '#dc2626' },
  { symbol: '♐', color: '#a855f7' },
  { symbol: '♑', color: '#64748b' },
  { symbol: '♒', color: '#06b6d4' },
  { symbol: '♓', color: '#818cf8' },
]

// ═══════════════════════════════════════════════════════════════════
// 🎨 INJECT KEYFRAMES (runs once on mount)
// ═══════════════════════════════════════════════════════════════════

const STYLE_ID = 'portal-loader-keyframes'

const injectKeyframes = () => {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    @keyframes pl-spin {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    @keyframes pl-counter-spin {
      from { rotate: 0deg; }
      to { rotate: 360deg; }
    }
    @keyframes pl-twinkle {
      0%, 100% { opacity: 0.1; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    @keyframes pl-pulse-expand {
      0% { transform: scale(0.8); opacity: 0.8; }
      100% { transform: scale(2.8); opacity: 0; }
    }
    @keyframes pl-breathe {
      0%, 100% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(1.15); opacity: 1; }
    }
    @keyframes pl-core-breathe {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 15px rgba(155,89,182,0.6), 0 0 30px rgba(155,89,182,0.3), 0 0 50px rgba(74,14,143,0.2);
      }
      50% {
        transform: scale(1.12);
        box-shadow: 0 0 20px rgba(155,89,182,0.8), 0 0 40px rgba(155,89,182,0.5), 0 0 70px rgba(74,14,143,0.3), 0 0 90px rgba(255,193,7,0.1);
      }
    }
    @keyframes pl-om-glow {
      0% { text-shadow: 0 0 8px rgba(255,213,79,0.6), 0 0 16px rgba(255,213,79,0.3); opacity: 0.8; }
      100% { text-shadow: 0 0 14px rgba(255,213,79,1), 0 0 28px rgba(255,213,79,0.6), 0 0 42px rgba(255,152,0,0.3); opacity: 1; }
    }
    @keyframes pl-petal-pulse {
      0%, 100% { transform: scale(1); opacity: 0.65; }
      50% { transform: scale(1.6); opacity: 1; }
    }
    @keyframes pl-kundalini-rise {
      0% { transform: translate(-50%, 0) translateX(0px); opacity: 0; }
      10% { opacity: 0.9; }
      50% { transform: translate(-50%, -90px) translateX(var(--k-ox, 20px)); opacity: 0.7; }
      90% { opacity: 0.2; }
      100% { transform: translate(-50%, -180px) translateX(calc(var(--k-ox, 20px) * -1)); opacity: 0; }
    }
    @keyframes pl-zodiac-orbit {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    @keyframes pl-zodiac-float {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.85; }
    }
    @keyframes pl-mantra-glow {
      0% { opacity: 0.3; }
      100% { opacity: 0.85; text-shadow: 0 0 8px rgba(255,213,79,0.5), 0 0 16px rgba(255,213,79,0.25); }
    }
    @keyframes pl-scroll {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    @keyframes pl-dot-bounce {
      0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
      40% { transform: scale(1.3); opacity: 1; }
    }
    @keyframes pl-beam-pulse {
      0%, 100% { opacity: 0.15; height: 160px; }
      50% { opacity: 0.5; height: 220px; }
    }
    @keyframes pl-label-in {
      from { opacity: 0; transform: translateX(-12px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pl-text-fade {
      0%, 100% { opacity: 0.55; }
      50% { opacity: 1; }
    }
    @keyframes pl-vortex-spin-1 {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes pl-vortex-spin-2 {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    @keyframes pl-nebula-drift {
      0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.5; }
      33% { transform: translate(-48%, -52%) scale(1.1) rotate(5deg); opacity: 0.7; }
      66% { transform: translate(-52%, -48%) scale(0.95) rotate(-3deg); opacity: 0.6; }
    }
  `
  document.head.appendChild(style)
}

// ═══════════════════════════════════════════════════════════════════
// ✨ STAR FIELD
// ═══════════════════════════════════════════════════════════════════

const StarField = memo(() => {
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 2.5,
        delay: Math.random() * 5,
        duration: 1.5 + Math.random() * 3,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animation: `pl-twinkle ${star.duration}s ${star.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
})
StarField.displayName = 'StarField'

// ═══════════════════════════════════════════════════════════════════
// 🌀 CHAKRA RING
// ═══════════════════════════════════════════════════════════════════

const ChakraRing = memo(({ chakra, index, baseRadius, scale }) => {
  const radius = (baseRadius + index * 28) * scale
  const spinDuration = 8 + index * 4
  const isReverse = index % 2 === 1
  const petalCount = Math.min(chakra.displayPetals, 12)

  const petals = useMemo(
    () =>
      Array.from({ length: petalCount }, (_, i) => ({
        angle: (i / petalCount) * 360,
        id: i,
      })),
    [petalCount]
  )

  return (
    <>
      {/* Orbit path */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          border: `1px ${index % 2 === 0 ? 'solid' : 'dashed'} ${chakra.color}15`,
        }}
      />

      {/* Spinning container */}
      <div
        className="absolute rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: '50%',
          top: '50%',
          animation: `pl-spin ${spinDuration}s linear infinite ${isReverse ? 'reverse' : 'normal'}`,
        }}
      >
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              transformOrigin: '0 0',
              transform: `rotate(${petal.angle}deg)`,
            }}
          >
            <div
              className="absolute"
              style={{
                left: -5 * scale,
                top: -5 * scale,
                width: 10 * scale,
                height: 10 * scale,
                transform: `translateY(-${radius}px)`,
                animation: `pl-counter-spin ${spinDuration}s linear infinite ${isReverse ? 'normal' : 'reverse'}`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: '100%',
                  height: '100%',
                  background: chakra.color,
                  boxShadow: `0 0 ${6 * scale}px ${chakra.glowColor}, 0 0 ${12 * scale}px ${chakra.glowColor}`,
                  animation: `pl-petal-pulse 2s ${(petal.id * 0.3)}s ease-in-out infinite`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Glow ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: radius * 2 + 6 * scale,
          height: radius * 2 + 6 * scale,
          left: '50%',
          top: '50%',
          background: `conic-gradient(from 0deg, transparent, ${chakra.color}18, transparent, ${chakra.color}0d, transparent)`,
          filter: `blur(${3 * scale}px)`,
          opacity: 0.4,
          animation: `pl-spin ${spinDuration * 0.7}s linear infinite ${isReverse ? 'reverse' : 'normal'}`,
        }}
      />
    </>
  )
})
ChakraRing.displayName = 'ChakraRing'

// ═══════════════════════════════════════════════════════════════════
// 🕉️ CENTRAL PORTAL
// ═══════════════════════════════════════════════════════════════════

const CentralPortal = memo(({ scale }) => {
  const s = scale

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        width: 80 * s,
        height: 80 * s,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
      }}
    >
      {/* Pulse rings */}
      {[
        { size: 50, color: 'rgba(155,89,182,0.45)', dur: 2.5, delay: 0 },
        { size: 65, color: 'rgba(74,14,143,0.35)', dur: 3, delay: 0.5 },
        { size: 80, color: 'rgba(0,188,212,0.25)', dur: 3.5, delay: 1 },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size * s,
            height: ring.size * s,
            border: `1px solid ${ring.color}`,
            animation: `pl-pulse-expand ${ring.dur}s ${ring.delay}s ease-out infinite`,
          }}
        />
      ))}

      {/* Vortex rings */}
      <div
        className="absolute rounded-full"
        style={{
          width: 52 * s,
          height: 52 * s,
          border: '1.5px solid rgba(155,89,182,0.35)',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          animation: `pl-vortex-spin-1 3s linear infinite`,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 40 * s,
          height: 40 * s,
          border: '1.5px solid rgba(76,175,80,0.35)',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          animation: `pl-vortex-spin-2 2s linear infinite`,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 28 * s,
          height: 28 * s,
          border: '1.5px solid rgba(255,193,7,0.45)',
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
          animation: `pl-vortex-spin-1 1.5s linear infinite`,
        }}
      />

      {/* Core */}
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: 36 * s,
          height: 36 * s,
          background: 'radial-gradient(circle, rgba(155,89,182,0.9) 0%, rgba(74,14,143,0.8) 50%, rgba(30,5,60,0.9) 100%)',
          boxShadow: `0 0 ${15*s}px rgba(155,89,182,0.6), 0 0 ${30*s}px rgba(155,89,182,0.3), 0 0 ${50*s}px rgba(74,14,143,0.2), inset 0 0 ${10*s}px rgba(255,255,255,0.1)`,
          animation: 'pl-core-breathe 3s ease-in-out infinite',
          zIndex: 25,
        }}
      >
        <span
          style={{
            fontSize: 18 * s,
            color: '#ffd54f',
            lineHeight: 1,
            animation: 'pl-om-glow 2s ease-in-out infinite alternate',
            zIndex: 30,
          }}
        >
          ॐ
        </span>
      </div>

      {/* Vertical beam */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 2 * s,
          height: 180 * s,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(155,89,182,0.25) 30%, rgba(255,213,79,0.08) 50%, rgba(155,89,182,0.25) 70%, transparent 100%)',
          animation: 'pl-beam-pulse 4s ease-in-out infinite',
        }}
      />
    </div>
  )
})
CentralPortal.displayName = 'CentralPortal'

// ═══════════════════════════════════════════════════════════════════
// 🐍 KUNDALINI PARTICLES
// ═══════════════════════════════════════════════════════════════════

const KundaliniParticles = memo(({ scale }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const ch = CHAKRAS[6 - (i % 7)]
        return {
          id: i,
          color: ch.color,
          glow: ch.glowColor,
          delay: i * 0.55,
          duration: 3.5 + Math.random() * 2,
          ox: (Math.random() - 0.5) * 50,
          size: (3 + Math.random() * 3) * scale,
        }
      }),
    [scale]
  )

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        zIndex: 15,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: '50%',
            bottom: '50%',
            boxShadow: `0 0 ${6*scale}px ${p.glow}, 0 0 ${12*scale}px ${p.glow}`,
            opacity: 0,
            '--k-ox': `${p.ox}px`,
            animation: `pl-kundalini-rise ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
})
KundaliniParticles.displayName = 'KundaliniParticles'

// ═══════════════════════════════════════════════════════════════════
// 🔮 ZODIAC OUTER RING
// ═══════════════════════════════════════════════════════════════════

const ZodiacOuterRing = memo(({ radius, scale }) => (
  <div
    className="absolute rounded-full"
    style={{
      width: radius * 2,
      height: radius * 2,
      left: '50%',
      top: '50%',
      animation: 'pl-zodiac-orbit 55s linear infinite',
      zIndex: 5,
    }}
  >
    {ZODIAC_SIGNS.map((sign, i) => {
      const angle = (i / 12) * 360
      return (
        <div
          key={i}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            transformOrigin: '0 0',
            transform: `rotate(${angle}deg)`,
          }}
        >
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: -10 * scale,
              top: -10 * scale,
              width: 20 * scale,
              height: 20 * scale,
              transform: `translateY(-${radius}px) rotate(-${angle}deg)`,
              fontSize: 13 * scale,
              color: sign.color,
              textShadow: `0 0 8px ${sign.color}`,
              animation: `pl-zodiac-float 3s ${i * 0.25}s ease-in-out infinite`,
              opacity: 0.55,
            }}
          >
            {sign.symbol}
          </div>
        </div>
      )
    })}
  </div>
))
ZodiacOuterRing.displayName = 'ZodiacOuterRing'

// ═══════════════════════════════════════════════════════════════════
// 📿 MANTRA RING
// ═══════════════════════════════════════════════════════════════════

const MantraRing = memo(({ radius, scale }) => {
  const mantras = ['ॐ', 'ह्रीं', 'श्रीं', 'क्लीं', 'ऐं', 'सौः']

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: '50%',
        top: '50%',
        animation: 'pl-spin 20s linear infinite reverse',
        zIndex: 18,
      }}
    >
      {mantras.map((m, i) => {
        const angle = (i / mantras.length) * 360
        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              width: 0,
              height: 0,
              transformOrigin: '0 0',
              transform: `rotate(${angle}deg)`,
            }}
          >
            <span
              className="absolute whitespace-nowrap"
              style={{
                left: -12 * scale,
                top: -8 * scale,
                fontSize: 11 * scale,
                color: 'rgba(255,213,79,0.65)',
                transform: `translateY(-${radius}px) rotate(-${angle}deg)`,
                animation: `pl-mantra-glow 2.5s ${i * 0.4}s ease-in-out infinite alternate`,
              }}
            >
              {m}
            </span>
          </div>
        )
      })}
    </div>
  )
})
MantraRing.displayName = 'MantraRing'

// ═══════════════════════════════════════════════════════════════════
// 🌌 MAIN PORTAL LOADER
// ═══════════════════════════════════════════════════════════════════

const PortalLoader = memo(
  ({
    size = 'default',
    text = 'Awakening your cosmic energy...',
    showText = true,
  }) => {
    // Inject keyframes on mount
    useEffect(() => {
      injectKeyframes()
    }, [])

    // Detect mobile for responsive scaling
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 640)
      check()
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }, [])

    const sizeConfig = {
      small: {
        container: isMobile ? 180 : 240,
        baseRadius: isMobile ? 30 : 40,
        chakraCount: isMobile ? 3 : 4,
        showZodiac: false,
        showMantra: false,
        showKundalini: false,
        scale: isMobile ? 0.65 : 0.85,
      },
      default: {
        container: isMobile ? 280 : 380,
        baseRadius: isMobile ? 32 : 42,
        chakraCount: isMobile ? 5 : 7,
        showZodiac: !isMobile,
        showMantra: false,
        showKundalini: true,
        scale: isMobile ? 0.72 : 1,
      },
      large: {
        container: isMobile ? 320 : 500,
        baseRadius: isMobile ? 34 : 45,
        chakraCount: 7,
        showZodiac: true,
        showMantra: !isMobile,
        showKundalini: true,
        scale: isMobile ? 0.75 : 1,
      },
      fullscreen: {
        container: isMobile ? 340 : 600,
        baseRadius: isMobile ? 35 : 48,
        chakraCount: 7,
        showZodiac: true,
        showMantra: !isMobile,
        showKundalini: true,
        scale: isMobile ? 0.78 : 1,
      },
    }

    const config = sizeConfig[size] || sizeConfig.default
    const s = config.scale

    const visibleChakras = useMemo(
      () => CHAKRAS.slice(0, config.chakraCount),
      [config.chakraCount]
    )

    const outerRadius = (config.baseRadius + config.chakraCount * 28 + 20) * s
    const zodiacRadius = outerRadius + 22 * s
    const mantraRadius = (config.baseRadius + 18) * s

    return (
      <div
        className="relative flex flex-col items-center justify-center w-full overflow-hidden"
        style={{
          minHeight: '100vh',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(15,5,30,1) 0%, rgba(5,2,15,1) 50%, rgba(0,0,5,1) 100%)',
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Stars */}
        <StarField />

        {/* Nebula 1 */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 450 * s,
            height: 450 * s,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(155,89,182,0.07) 0%, rgba(74,14,143,0.03) 40%, transparent 70%)',
            animation: 'pl-nebula-drift 10s ease-in-out infinite',
          }}
        />

        {/* Nebula 2 */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 550 * s,
            height: 550 * s,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(76,175,80,0.04) 0%, rgba(0,188,212,0.02) 40%, transparent 70%)',
            animation: 'pl-nebula-drift 13s -5s ease-in-out infinite',
          }}
        />

        {/* ─── PORTAL CONTAINER ─── */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: config.container,
            height: config.container,
            zIndex: 10,
          }}
        >
          {/* Chakra Rings */}
          {visibleChakras.map((chakra, index) => (
            <ChakraRing
              key={chakra.id}
              chakra={chakra}
              index={index}
              baseRadius={config.baseRadius}
              scale={s}
            />
          ))}

          {/* Zodiac */}
          {config.showZodiac && (
            <ZodiacOuterRing radius={zodiacRadius} scale={s} />
          )}

          {/* Mantras */}
          {config.showMantra && (
            <MantraRing radius={mantraRadius} scale={s} />
          )}

          {/* Kundalini */}
          {config.showKundalini && <KundaliniParticles scale={s} />}

          {/* Central Portal */}
          <CentralPortal scale={s} />
        </div>

        {/* ─── CHAKRA LABELS (hidden on small mobile) ─── */}
        <div
          className={`absolute left-3 sm:left-5 flex flex-col gap-1.5 sm:gap-2 ${
            isMobile && size === 'small' ? 'hidden' : ''
          }`}
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 30,
          }}
        >
          {visibleChakras.map((chakra, i) => (
            <div
              key={chakra.id}
              className="flex items-center gap-1.5"
              style={{
                animation: `pl-label-in 0.5s ${i * 0.3}s ease-out both`,
                opacity: 0,
              }}
            >
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: isMobile ? 4 : 6,
                  height: isMobile ? 4 : 6,
                  background: chakra.color,
                  boxShadow: `0 0 6px ${chakra.glowColor}`,
                  animation: 'pl-petal-pulse 2s ease-in-out infinite',
                }}
              />
              <span
                className="uppercase tracking-wider font-light"
                style={{
                  fontSize: isMobile ? 8 : 10,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {chakra.english}
              </span>
            </div>
          ))}
        </div>

        {/* ─── LOADING TEXT ─── */}
        {showText && (
          <div
            className="flex flex-col items-center gap-2 sm:gap-3"
            style={{ marginTop: isMobile ? 20 : 32, zIndex: 30 }}
          >
            {/* Main text */}
            <p
              className={`italic text-center tracking-wide ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}
              style={{
                color: 'rgba(255,255,255,0.75)',
                maxWidth: isMobile ? 220 : 300,
                animation: 'pl-text-fade 3s ease-in-out infinite',
              }}
            >
              {text}
            </p>

            {/* Scrolling Gayatri Mantra */}
            <div
              className="relative overflow-hidden"
              style={{
                width: isMobile ? 200 : 280,
                height: 16,
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            >
              <span
                className="inline-block whitespace-nowrap"
                style={{
                  color: 'rgba(255,213,79,0.35)',
                  fontSize: isMobile ? 9 : 11,
                  letterSpacing: 2,
                  animation: 'pl-scroll 14s linear infinite',
                }}
              >
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो
                यो नः प्रचोदयात् ॐ
              </span>
            </div>

            {/* Chakra-colored dots */}
            <div className="flex items-center gap-1.5">
              {[6, 4, 3, 1, 0].map((ci, i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: isMobile ? 5 : 6,
                    height: isMobile ? 5 : 6,
                    background: CHAKRAS[ci].color,
                    animation: `pl-dot-bounce 1.2s ${i * 0.15}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

PortalLoader.displayName = 'PortalLoader'

export default PortalLoader