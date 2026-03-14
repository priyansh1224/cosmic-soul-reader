// ═══════════════════════════════════════════════════════════════════
// 🌅 DAILY ORACLE CARD
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'
import { getCurrentDate } from '@utils/helpers'

const DailyOracleCard = memo(({ reading, delay = 0 }) => {
  return (
    <LiquidGlassCard glowColor="cyan" entryDelay={delay} className="p-8">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌅</span>
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Daily Oracle</h3>
              <p className="text-white/30 text-xs font-body">{getCurrentDate()}</p>
            </div>
          </div>
        </div>

        {/* Horoscope Text */}
        <motion.p
          className="text-white/60 font-body leading-relaxed text-[15px] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
        >
          {reading.horoscope}
        </motion.p>

        {/* Energy Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-white/40">Cosmic Energy Level</span>
            <span className="text-sm font-tech text-cosmic-gold">{reading.energyLevel}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: `${reading.energyLevel}%` }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                background: reading.energyLevel > 80
                  ? 'linear-gradient(90deg, #2ecc71, #55efc4)'
                  : reading.energyLevel > 60
                    ? 'linear-gradient(90deg, #ffd54f, #ff8f00)'
                    : 'linear-gradient(90deg, #ff6b6b, #ee5a24)',
              }}
            />
          </div>
        </div>

        {/* Lucky Number */}
        <motion.div
          className="mt-4 flex items-center justify-center gap-2 text-white/30 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.6 }}
        >
          <span>🎱</span>
          <span>Today&apos;s Lucky Number: </span>
          <span className="text-cosmic-gold font-tech font-bold">{reading.luckyNumberToday}</span>
        </motion.div>
      </div>
    </LiquidGlassCard>
  )
})

DailyOracleCard.displayName = 'DailyOracleCard'

export default DailyOracleCard