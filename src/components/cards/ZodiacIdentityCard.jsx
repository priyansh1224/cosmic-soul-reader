// ═══════════════════════════════════════════════════════════════════
// ♈ ZODIAC IDENTITY CARD
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'
import { cn, getElementColor, getElementGradient } from '@utils/helpers'

const ZodiacIdentityCard = memo(({ reading, delay = 0 }) => {
  const { zodiac } = reading
  const elementColor = getElementColor(zodiac.elementType)

  const infoItems = [
    { label: 'Element', value: zodiac.element, icon: zodiac.elementIcon },
    { label: 'Ruling Planet', value: zodiac.rulingPlanet, icon: zodiac.rulingPlanetSymbol },
    { label: 'Quality', value: zodiac.quality, icon: '◈' },
    { label: 'Lucky Number', value: reading.luckyNumberToday, icon: '🔢' },
    { label: 'House', value: zodiac.house?.split(' - ')[0], icon: '🏛️' },
    { label: 'Tarot', value: zodiac.tarotCard, icon: '🃏' },
  ]

  return (
    <LiquidGlassCard glowColor="gold" entryDelay={delay} className="p-8">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          {/* Large Zodiac Symbol */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.2, type: 'spring', damping: 15 }}
          >
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, ${elementColor}30, ${elementColor}10)`,
                border: `2px solid ${elementColor}40`,
                boxShadow: `0 0 30px ${elementColor}20`,
              }}
            >
              <span className="text-5xl">{zodiac.symbol}</span>
            </div>

            {/* Orbit ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-full border"
              style={{ borderColor: `${elementColor}20` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Sign Info */}
          <div className="text-center sm:text-left">
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold mb-1">
              {zodiac.name}
            </h3>
            <p className="text-white/40 font-body text-sm tracking-wide">
              {zodiac.dates}
            </p>
            <p className="text-white/30 font-body text-xs mt-1">
              {zodiac.latinName} • {zodiac.season}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05] text-center hover:bg-white/[0.06] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 + i * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
            >
              <span className="text-xl block mb-1">{item.icon}</span>
              <p className="text-white/30 text-xs font-body mb-0.5">{item.label}</p>
              <p className="text-white font-display text-sm font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </LiquidGlassCard>
  )
})

ZodiacIdentityCard.displayName = 'ZodiacIdentityCard'

export default ZodiacIdentityCard