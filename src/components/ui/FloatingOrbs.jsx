// ═══════════════════════════════════════════════════════════════════
// 🔮 FLOATING ORBS - Animated Background Orbs
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ZODIAC_SYMBOLS } from '@utils/constants'
import useUIStore from '@stores/useUIStore'

const FloatingOrbs = memo(({ showZodiac = true, className = '' }) => {
  const isMobile = useUIStore((s) => s.isMobile)
  const particlesEnabled = useUIStore((s) => s.particlesEnabled)

  const zodiacArray = useMemo(() => Object.entries(ZODIAC_SYMBOLS), [])

  const orbData = useMemo(() => [
    { size: 120, color: 'cosmic-purple-500', opacity: 0.08, x: '10%', y: '20%', duration: 25 },
    { size: 180, color: 'cosmic-pink-500', opacity: 0.06, x: '80%', y: '15%', duration: 30 },
    { size: 100, color: 'cosmic-cyan-500', opacity: 0.07, x: '60%', y: '70%', duration: 22 },
    { size: 150, color: 'cosmic-gold', opacity: 0.05, x: '25%', y: '80%', duration: 28 },
    { size: 90, color: 'cosmic-purple-400', opacity: 0.06, x: '90%', y: '50%', duration: 20 },
  ], [])

  if (!particlesEnabled) return null

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* ─── LARGE BLUR ORBS ─── */}
      {orbData.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full bg-${orb.color} blur-3xl`}
          style={{
            width: isMobile ? orb.size * 0.6 : orb.size,
            height: isMobile ? orb.size * 0.6 : orb.size,
            left: orb.x,
            top: orb.y,
            opacity: orb.opacity,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ─── FLOATING ZODIAC SYMBOLS ─── */}
      {showZodiac && !isMobile && zodiacArray.map(([name, symbol], i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 35 + (i % 3) * 10
        const x = 50 + Math.cos(angle) * radius
        const y = 50 + Math.sin(angle) * radius

        return (
          <motion.div
            key={name}
            className="absolute text-white/[0.07] text-2xl font-display select-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              y: [0, -15, 0, 10, 0],
              x: [0, 8, -5, 3, 0],
              rotate: [0, 10, -5, 8, 0],
              opacity: [0.05, 0.12, 0.08, 0.1, 0.05],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
            whileHover={{
              scale: 1.5,
              opacity: 0.3,
              transition: { duration: 0.3 },
            }}
          >
            {symbol}
          </motion.div>
        )
      })}

      {/* ─── METEOR STREAKS ─── */}
      {!isMobile && (
        <>
          <div
            className="meteor"
            style={{
              top: '10%',
              left: '5%',
              '--meteor-duration': '6s',
              '--meteor-delay': '2s',
            }}
          />
          <div
            className="meteor"
            style={{
              top: '30%',
              left: '40%',
              '--meteor-duration': '8s',
              '--meteor-delay': '7s',
            }}
          />
          <div
            className="meteor"
            style={{
              top: '60%',
              left: '70%',
              '--meteor-duration': '5s',
              '--meteor-delay': '12s',
            }}
          />
        </>
      )}
    </div>
  )
})

FloatingOrbs.displayName = 'FloatingOrbs'

export default FloatingOrbs