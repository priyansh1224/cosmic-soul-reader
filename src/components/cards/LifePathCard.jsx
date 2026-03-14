// src/components/cards/LifePathCard.jsx
// ═══════════════════════════════════════════════════════════════════
// 🔢 LIFE PATH CARD - Numerology
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'

const LifePathCard = memo(({ reading, delay = 0 }) => {
  const { numerology } = reading
  if (!numerology) return null

  return (
    <LiquidGlassCard glowColor="aurora" entryDelay={delay} className="p-8">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🔢</span>
          <h3 className="font-display text-xl font-semibold text-white">Life Path Number</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Big Number */}
          <motion.div
            className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${numerology.lifePathMeaning?.color || '#7c3aed'}30, transparent)`,
              border: `2px solid ${numerology.lifePathMeaning?.color || '#7c3aed'}40`,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
          >
            <span
              className="text-4xl font-tech font-bold"
              style={{ color: numerology.lifePathMeaning?.color || '#ffd54f' }}
            >
              {numerology.lifePathNumber}
            </span>
          </motion.div>

          <div className="text-center sm:text-left">
            <h4 className="font-display text-lg font-semibold text-gradient-gold mb-2">
              {numerology.lifePathMeaning?.title || 'The Seeker'}
            </h4>
            <p className="text-white/50 font-body text-sm leading-relaxed">
              {numerology.lifePathMeaning?.description || ''}
            </p>
          </div>
        </div>

        {/* Extra Numbers */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/[0.05]">
            <p className="text-white/30 text-xs font-body">Soul Urge</p>
            <p className="text-cosmic-purple-400 font-tech text-xl font-bold">{numerology.soulUrge || '—'}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3 text-center border border-white/[0.05]">
            <p className="text-white/30 text-xs font-body">Destiny</p>
            <p className="text-cosmic-cyan-400 font-tech text-xl font-bold">{numerology.destinyNumber || '—'}</p>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  )
})

LifePathCard.displayName = 'LifePathCard'

export default LifePathCard