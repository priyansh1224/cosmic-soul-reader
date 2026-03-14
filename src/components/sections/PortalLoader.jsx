// ═══════════════════════════════════════════════════════════════════
// 🌌 COSMIC SOUL LOADER - Zodiac Solar System Orbiting Loader
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo } from 'react'
import './CosmicSoulLoader.css'

// ── ALL 12 ZODIAC SIGNS ──
const ZODIAC_ORBITS = [
  { symbol: '♈', name: 'Aries', color: '#ef4444', element: 'fire' },
  { symbol: '♉', name: 'Taurus', color: '#22c55e', element: 'earth' },
  { symbol: '♊', name: 'Gemini', color: '#eab308', element: 'air' },
  { symbol: '♋', name: 'Cancer', color: '#6366f1', element: 'water' },
  { symbol: '♌', name: 'Leo', color: '#f97316', element: 'fire' },
  { symbol: '♍', name: 'Virgo', color: '#84cc16', element: 'earth' },
  { symbol: '♎', name: 'Libra', color: '#ec4899', element: 'air' },
  { symbol: '♏', name: 'Scorpio', color: '#dc2626', element: 'water' },
  { symbol: '♐', name: 'Sagittarius', color: '#a855f7', element: 'fire' },
  { symbol: '♑', name: 'Capricorn', color: '#64748b', element: 'earth' },
  { symbol: '♒', name: 'Aquarius', color: '#06b6d4', element: 'air' },
  { symbol: '♓', name: 'Pisces', color: '#818cf8', element: 'water' },
]

// ── ELEMENT GLOW COLORS ──
const ELEMENT_GLOW = {
  fire: 'rgba(239, 68, 68, 0.6)',
  earth: 'rgba(34, 197, 94, 0.5)',
  air: 'rgba(234, 179, 8, 0.5)',
  water: 'rgba(99, 102, 241, 0.5)',
}

// ── STAR FIELD BACKGROUND ──
const StarField = memo(() => {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 2,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="cosmic-loader-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  )
})
StarField.displayName = 'StarField'

// ── CENTRAL SUN ──
const CosmicSun = memo(() => (
  <div className="absolute inset-0 flex items-center justify-center">
    {/* Outermost corona pulse */}
    <div className="cosmic-sun-corona-outer" />

    {/* Middle corona */}
    <div className="cosmic-sun-corona-mid" />

    {/* Inner corona glow */}
    <div className="cosmic-sun-corona-inner" />

    {/* Sun core */}
    <div className="cosmic-sun-core">
      {/* Sun symbol */}
      <span className="cosmic-sun-symbol">☀</span>

      {/* Inner light rays */}
      <div className="cosmic-sun-rays" />
    </div>
  </div>
))
CosmicSun.displayName = 'CosmicSun'

// ── ORBIT RING ──
const OrbitRing = memo(({ radius, opacity = 0.08, dashed = false }) => (
  <div
    className="absolute rounded-full border"
    style={{
      width: radius * 2,
      height: radius * 2,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      borderColor: `rgba(255, 213, 79, ${opacity})`,
      borderStyle: dashed ? 'dashed' : 'solid',
      borderWidth: '1px',
    }}
  />
))
OrbitRing.displayName = 'OrbitRing'

// ── ZODIAC SIGN IN ORBIT ──
const ZodiacOrbitSign = memo(
  ({ sign, index, totalSigns, orbitRadius, orbitDuration }) => {
    const startAngle = (index / totalSigns) * 360
    const glowColor = ELEMENT_GLOW[sign.element]

    return (
      <div
        className="cosmic-orbit-path"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          animationDuration: `${orbitDuration}s`,
          animationDelay: `${(index / totalSigns) * -orbitDuration}s`,
        }}
      >
        {/* The sign itself - counter-rotates to stay upright */}
        <div
          className="cosmic-zodiac-sign"
          style={{
            '--sign-color': sign.color,
            '--glow-color': glowColor,
            animationDuration: `${orbitDuration}s`,
            animationDelay: `${(index / totalSigns) * -orbitDuration}s`,
          }}
        >
          {/* Glow behind sign */}
          <div
            className="cosmic-sign-glow"
            style={{ background: glowColor }}
          />

          {/* Sign symbol */}
          <span
            className="cosmic-sign-symbol"
            style={{ color: sign.color }}
          >
            {sign.symbol}
          </span>

          {/* Tiny orbit dot trail */}
          <div
            className="cosmic-sign-trail"
            style={{
              background: `radial-gradient(circle, ${sign.color}40 0%, transparent 70%)`,
            }}
          />
        </div>
      </div>
    )
  }
)
ZodiacOrbitSign.displayName = 'ZodiacOrbitSign'

// ═══════════════════════════════════════════════════════════════════
// MAIN LOADER COMPONENT
// ═══════════════════════════════════════════════════════════════════

const CosmicSoulLoader = memo(
  ({ size = 'default', text = 'Aligning the cosmos...', showText = true }) => {
    // Size presets
    const sizeConfig = {
      small: { container: 200, orbits: [60, 85], fontSize: 'text-xs' },
      default: { container: 340, orbits: [80, 115, 150], fontSize: 'text-sm' },
      large: { container: 480, orbits: [90, 135, 180, 220], fontSize: 'text-base' },
      fullscreen: { container: 560, orbits: [100, 150, 200, 250], fontSize: 'text-lg' },
    }

    const config = sizeConfig[size] || sizeConfig.default

    // Split zodiac signs across orbits
    const orbits = useMemo(() => {
      const orbitCount = config.orbits.length
      const signsPerOrbit = Math.ceil(ZODIAC_ORBITS.length / orbitCount)

      return config.orbits.map((radius, orbitIndex) => ({
        radius,
        signs: ZODIAC_ORBITS.slice(
          orbitIndex * signsPerOrbit,
          (orbitIndex + 1) * signsPerOrbit
        ),
        duration: 12 + orbitIndex * 8, // outer orbits spin slower
        direction: orbitIndex % 2 === 0 ? 'normal' : 'reverse',
      }))
    }, [config.orbits])

    return (
      <div className="cosmic-loader-wrapper">
        {/* Star field */}
        <StarField />

        {/* Cosmic dust particles */}
        <div className="cosmic-dust-field">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="cosmic-dust-particle"
              style={{
                '--dust-delay': `${i * 0.8}s`,
                '--dust-duration': `${6 + Math.random() * 4}s`,
                '--dust-x': `${30 + Math.random() * 40}%`,
                '--dust-y': `${30 + Math.random() * 40}%`,
                '--dust-color': ZODIAC_ORBITS[i % 12].color,
              }}
            />
          ))}
        </div>

        {/* Solar system container */}
        <div
          className="cosmic-solar-system"
          style={{
            width: config.container,
            height: config.container,
          }}
        >
          {/* Orbit rings */}
          {orbits.map((orbit, i) => (
            <OrbitRing
              key={`ring-${i}`}
              radius={orbit.radius}
              opacity={0.06 + i * 0.02}
              dashed={i % 2 === 1}
            />
          ))}

          {/* Zodiac signs in orbits */}
          {orbits.map((orbit, orbitIndex) =>
            orbit.signs.map((sign, signIndex) => (
              <ZodiacOrbitSign
                key={sign.name}
                sign={sign}
                index={signIndex}
                totalSigns={orbit.signs.length}
                orbitRadius={orbit.radius}
                orbitDuration={
                  orbit.direction === 'reverse'
                    ? -orbit.duration
                    : orbit.duration
                }
              />
            ))
          )}

          {/* Central sun */}
          <CosmicSun />
        </div>

        {/* Loading text */}
        {showText && (
          <div className="cosmic-loader-text-area">
            <p className={`cosmic-loader-text ${config.fontSize}`}>
              {text}
            </p>
            <div className="cosmic-loader-dots">
              <span className="cosmic-dot" style={{ animationDelay: '0s' }} />
              <span className="cosmic-dot" style={{ animationDelay: '0.2s' }} />
              <span className="cosmic-dot" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    )
  }
)

CosmicSoulLoader.displayName = 'CosmicSoulLoader'

export default CosmicSoulLoader