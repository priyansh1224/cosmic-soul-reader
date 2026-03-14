// ═══════════════════════════════════════════════════════════════════
// 🍀 LUCKY TALISMANS CARD
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'

const LuckyTalismansCard = memo(({ reading, delay = 0 }) => {
  const { zodiac } = reading

  const talismans = [
    { icon: '🎨', label: 'Lucky Color', value: zodiac.luckyColor },
    { icon: zodiac.luckyGemEmoji, label: 'Lucky Gem', value: zodiac.luckyGem },
    { icon: zodiac.luckyFlowerEmoji, label: 'Lucky Flower', value: zodiac.luckyFlower },
    { icon: '📅', label: 'Lucky Day', value: zodiac.luckyDay },
    { icon: zodiac.luckyAnimalEmoji, label: 'Spirit Animal', value: zodiac.luckyAnimal },
    { icon: '⚙️', label: 'Lucky Metal', value: zodiac.luckyMetal },
  ]

  return (
    <LiquidGlassCard glowColor="gold" entryDelay={delay} className="p-8">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🍀</span>
          <h3 className="font-display text-xl font-semibold text-white">Lucky Talismans</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {talismans.map((talisman, i) => (
            <motion.div
              key={talisman.label}
              className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05] text-center hover:bg-white/[0.06] transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2 + i * 0.08 }}
              whileHover={{ scale: 1.05, y: -3 }}
            >
              <motion.span
                className="text-3xl block mb-2"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.4 }}
              >
                {talisman.icon}
              </motion.span>
              <p className="text-white/30 text-xs font-body mb-1">{talisman.label}</p>
              <p className="text-white font-display text-sm font-medium">{talisman.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Lucky Numbers */}
        <div className="mt-6 pt-4 border-t border-white/[0.05]">
          <p className="text-white/30 text-xs font-body mb-3 text-center">Lucky Numbers</p>
          <div className="flex justify-center gap-3">
            {zodiac.luckyNumbers.map((num, i) => (
              <motion.div
                key={num}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-cosmic-gold/10 border border-cosmic-gold/20 text-cosmic-gold font-tech text-sm font-bold"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.5 + i * 0.1, type: 'spring', stiffness: 400 }}
                whileHover={{ scale: 1.15, boxShadow: '0 0 15px rgba(255,213,79,0.3)' }}
              >
                {num}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  )
})

LuckyTalismansCard.displayName = 'LuckyTalismansCard'

export default LuckyTalismansCard