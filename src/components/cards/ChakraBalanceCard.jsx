// src/components/cards/ChakraBalanceCard.jsx
// ═══════════════════════════════════════════════════════════════════
// 🧘 CHAKRA BALANCE CARD
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'

const ChakraBalanceCard = memo(({ reading, delay = 0 }) => {
  const { chakra } = reading
  if (!chakra) return null

  return (
    <LiquidGlassCard glowColor="aurora" entryDelay={delay} className="p-8">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🧘</span>
          <h3 className="font-display text-xl font-semibold text-white">Chakra Balance</h3>
        </div>

        {/* Primary Chakra */}
        {chakra.primary && (
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-center">
            <p className="text-white/30 text-xs mb-2">Primary Chakra</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{chakra.primary.icon}</span>
              <div>
                <p className="font-display text-lg font-semibold text-white">{chakra.primary.name}</p>
                <p className="text-white/30 text-xs">{chakra.primary.sanskritName} • {chakra.primary.frequency}</p>
              </div>
            </div>
            <p className="text-white/40 font-script text-lg mt-2">
              &ldquo;{chakra.primary.affirmation}&rdquo;
            </p>
          </div>
        )}

        {/* Chakra Levels */}
        <div className="space-y-3">
          {chakra.balance?.map((ch, i) => (
            <motion.div
              key={ch.id}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2 + i * 0.06 }}
            >
              <span className="text-sm w-6 text-center">{ch.icon}</span>
              <span className="text-xs font-body text-white/40 w-24 truncate">{ch.name.replace(' Chakra', '')}</span>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${ch.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + 0.3 + i * 0.06, duration: 0.8 }}
                  style={{ backgroundColor: ch.color }}
                />
              </div>
              <span className="text-xs font-tech w-10 text-right" style={{ color: ch.color }}>
                {ch.level}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </LiquidGlassCard>
  )
})

ChakraBalanceCard.displayName = 'ChakraBalanceCard'

export default ChakraBalanceCard