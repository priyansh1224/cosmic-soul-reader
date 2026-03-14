// ═══════════════════════════════════════════════════════════════════
// 👋 SOUL GREETING CARD
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'
import { getTimeGreeting, formatDate, capitalize } from '@utils/helpers'

const SoulGreetingCard = memo(({ reading, delay = 0 }) => {
  const { greeting, icon } = getTimeGreeting()

  return (
    <LiquidGlassCard glowColor="gold" entryDelay={delay} className="p-8">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.2) 50%, rgba(255,213,79,0.1) 100%)',
        }}
      />

      <div className="relative z-10 text-center">
        {/* Greeting */}
        <motion.p
          className="text-white/40 font-body text-sm tracking-widest uppercase mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {icon} {greeting}, Cosmic Traveler
        </motion.p>

        {/* Name */}
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-gold mb-4"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: delay + 0.4, duration: 0.6 }}
        >
          {capitalize(reading.user.firstName)} {capitalize(reading.user.lastName)}
        </motion.h2>

        {/* Birth info */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 text-white/30 text-sm font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6 }}
        >
          <span className="flex items-center gap-1.5">
            <span>📅</span>
            {reading.user.birthDate}
          </span>
          {reading.user.birthTime !== 'Not provided' && (
            <span className="flex items-center gap-1.5">
              <span>🕐</span>
              {reading.user.birthTime}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <span>{reading.zodiac.symbol}</span>
            {reading.zodiac.name}
          </span>
        </motion.div>
      </div>
    </LiquidGlassCard>
  )
})

SoulGreetingCard.displayName = 'SoulGreetingCard'

export default SoulGreetingCard