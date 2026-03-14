// src/components/cards/CosmicGuidanceCard.jsx
// ═══════════════════════════════════════════════════════════════════
// 📿 COSMIC GUIDANCE CARD - Recommendations
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'

const CosmicGuidanceCard = memo(({ reading, delay = 0 }) => {
  const { recommendations, zodiac, wisdom } = reading
  if (!recommendations) return null

  const items = Object.entries(recommendations).map(([key, item]) => ({
    key,
    ...item,
  }))

  return (
    <LiquidGlassCard glowColor="gold" entryDelay={delay} className="p-8">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">📿</span>
          <h3 className="font-display text-xl font-semibold text-white">Cosmic Guidance</h3>
        </div>

        {/* Mantra */}
        <motion.div
          className="mb-6 p-5 rounded-2xl bg-cosmic-gold/5 border border-cosmic-gold/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
        >
          <p className="text-white/30 text-xs mb-2 tracking-widest uppercase">Your Mantra</p>
          <p className="font-script text-2xl text-cosmic-gold/80">
            &ldquo;{zodiac.mantra}&rdquo;
          </p>
        </motion.div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3 + i * 0.08 }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h4 className="font-display text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-white/40 font-body text-xs leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Life Lesson */}
        <motion.div
          className="mt-6 pt-4 border-t border-white/[0.05] text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.6 }}
        >
          <p className="text-white/20 text-xs font-body mb-2 tracking-widest uppercase">Life Lesson</p>
          <p className="text-white/50 font-body text-sm italic leading-relaxed max-w-lg mx-auto">
            {zodiac.lifeLesson}
          </p>
        </motion.div>

        {/* Wisdom */}
        {wisdom && (
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.7 }}
          >
            <p className="text-white/15 font-body text-xs italic">
              💫 {wisdom}
            </p>
          </motion.div>
        )}
      </div>
    </LiquidGlassCard>
  )
})

CosmicGuidanceCard.displayName = 'CosmicGuidanceCard'

export default CosmicGuidanceCard