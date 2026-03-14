// ═══════════════════════════════════════════════════════════════════
// 🔮 DESTINY PREDICTION CARD - Love, Career, Health
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'

const predictions = [
  { key: 'love', icon: '💖', title: 'Love & Romance', color: '#fd79a8', gradient: 'from-pink-500/20 to-rose-500/10' },
  { key: 'career', icon: '🚀', title: 'Career & Purpose', color: '#a29bfe', gradient: 'from-purple-500/20 to-indigo-500/10' },
  { key: 'health', icon: '🌿', title: 'Health & Wellness', color: '#55efc4', gradient: 'from-emerald-500/20 to-teal-500/10' },
]

const DestinyPredictionCard = memo(({ reading, delay = 0 }) => {
  return (
    <div>
      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <span className="text-2xl">🔮</span>
        <h3 className="font-display text-xl font-semibold text-white">Destiny Predictions</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.map((pred, i) => (
          <LiquidGlassCard
            key={pred.key}
            glowColor={pred.key === 'love' ? 'pink' : pred.key === 'career' ? 'purple' : 'cyan'}
            entryDelay={delay + i * 0.1}
            className="p-6"
          >
            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${pred.color}15`,
                  border: `1px solid ${pred.color}30`,
                }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                <span className="text-2xl">{pred.icon}</span>
              </motion.div>

              {/* Title */}
              <h4 className="font-display text-base font-semibold text-white mb-3">
                {pred.title}
              </h4>

              {/* Prediction */}
              <p className="text-white/50 font-body text-sm leading-relaxed">
                {reading.predictions[pred.key]}
              </p>
            </div>
          </LiquidGlassCard>
        ))}
      </div>
    </div>
  )
})

DestinyPredictionCard.displayName = 'DestinyPredictionCard'

export default DestinyPredictionCard