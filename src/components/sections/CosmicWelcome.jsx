// ═══════════════════════════════════════════════════════════════════
// 🌟 COSMIC WELCOME - Hero Landing Section
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { HolographicButton } from '@components/ui'
import useCosmicStore from '@stores/useCosmicStore'

const isMobile = window.innerWidth < 768

// Static floating orbs — pure CSS, zero JS overhead
const ORBS = [
  { size: 180, top: '10%', left: '5%',  color: 'rgba(124,58,237,0.12)', dur: '8s',  delay: '0s'   },
  { size: 120, top: '60%', left: '80%', color: 'rgba(236,72,153,0.10)', dur: '10s', delay: '2s'   },
  { size: 90,  top: '80%', left: '15%', color: 'rgba(6,182,212,0.08)',  dur: '7s',  delay: '1s'   },
  { size: 60,  top: '25%', left: '70%', color: 'rgba(255,213,79,0.08)', dur: '9s',  delay: '3s'   },
]

// Static stars — generated once, never re-rendered
const STARS = Array.from({ length: isMobile ? 18 : 30 }, (_, i) => ({
  id: i,
  top:  `${(i * 37 + 11) % 100}%`,
  left: `${(i * 53 + 7)  % 100}%`,
  size: i % 5 === 0 ? 2 : 1,
  dur:  `${2 + (i % 4)}s`,
  delay:`${(i * 0.3) % 3}s`,
}))

// Zodiac symbols that drift across — only 4, pure CSS
const DRIFTERS = ['♈','♌','♎','♓']

const CosmicWelcome = memo(() => {
  const { goToForm } = useCosmicStore()

  const handleBeginReading = () => {
    new Audio('/sounds/whoosh.mp3').play().catch(() => {})
    goToForm()
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-section-welcome">

      {/* ── STATIC STAR FIELD (CSS only) ── */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map(s => (
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px]">
          {/* Outer pulse ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
              animation: 'breathe 6s ease-in-out infinite',
            }}
          />
          {/* Mid ring */}
          <div
            className="absolute inset-[20%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
              animation: 'breathe 5s ease-in-out 1s infinite',
            }}
          />
          {/* Core */}
          <div
            className="absolute inset-[35%] rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, rgba(124,58,237,0.5) 40%, rgba(236,72,153,0.3) 70%, transparent 100%)',
              boxShadow: '0 0 40px rgba(124,58,237,0.35), inset 0 0 20px rgba(236,72,153,0.2)',
              animation: 'breathe 4s ease-in-out 0.5s infinite',
            }}
          />
          {/* Single slow orbit ring — CSS only */}
          <div
            className="absolute inset-[8%] rounded-full border border-cosmic-purple-500/15"
            style={{ animation: 'spin 30s linear infinite' }}
          />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        {/* Title — Framer Motion only for entrance, then static */}
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

        {/* Feature pills — static, no hover animations on mobile */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[
            { icon: '♈', label: 'Zodiac' },
            { icon: '🔢', label: 'Numerology' },
            { icon: '💕', label: 'Compatibility' },
            { icon: '🧘', label: 'Chakra' },
            { icon: '🔮', label: 'Predictions' },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs sm:text-sm font-body"
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
