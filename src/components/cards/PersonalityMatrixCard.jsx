// ═══════════════════════════════════════════════════════════════════
// 🧠 PERSONALITY MATRIX CARD
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'

const PersonalityMatrixCard = memo(({ reading, delay = 0 }) => {
  const { zodiac } = reading

  return (
    <LiquidGlassCard glowColor="purple" entryDelay={delay} className="p-8">
      <div className="relative z-10">
        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🧬</span>
          <h3 className="font-display text-xl font-semibold text-white">Personality Matrix</h3>
        </div>

        {/* Personality Description */}
        <motion.p
          className="text-white/60 font-body leading-relaxed mb-8 text-[15px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
        >
          {zodiac.personality}
        </motion.p>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">☀️</span>
              <h4 className="font-display text-sm font-semibold text-cosmic-gold tracking-wide uppercase">
                Strengths
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {zodiac.strengths.map((strength, i) => (
                <motion.span
                  key={strength}
                  className="px-3 py-1.5 rounded-full text-xs font-body bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(52,211,153,0.2)' }}
                >
                  {strength}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🌙</span>
              <h4 className="font-display text-sm font-semibold text-cosmic-pink-400 tracking-wide uppercase">
                Growth Areas
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {zodiac.weaknesses.map((weakness, i) => (
                <motion.span
                  key={weakness}
                  className="px-3 py-1.5 rounded-full text-xs font-body bg-rose-500/10 border border-rose-500/20 text-rose-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + 0.5 + i * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(244,63,94,0.2)' }}
                >
                  {weakness}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </LiquidGlassCard>
  )
})

PersonalityMatrixCard.displayName = 'PersonalityMatrixCard'

export default PersonalityMatrixCard