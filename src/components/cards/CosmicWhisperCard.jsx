// ═══════════════════════════════════════════════════════════════════
// 💫 COSMIC WHISPER CARD - Personalized Cosmic Message
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'

const CosmicWhisperCard = memo(({ reading, delay = 0 }) => {
  return (
    <LiquidGlassCard glowColor="pink" entryDelay={delay} className="p-8">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 rounded-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(124,58,237,0.2) 100%)',
        }}
      />

      <div className="relative z-10 text-center py-4">
        {/* Scroll Icon */}
        <motion.div
          className="mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-6"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.2), rgba(124,58,237,0.1))',
            border: '1px solid rgba(236,72,153,0.2)',
          }}
          animate={{
            boxShadow: [
              '0 0 15px rgba(236,72,153,0.2)',
              '0 0 30px rgba(236,72,153,0.4)',
              '0 0 15px rgba(236,72,153,0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-2xl">📜</span>
        </motion.div>

        <p className="text-white/30 text-xs font-body tracking-widest uppercase mb-4">
          A Message from the Cosmos
        </p>

        {/* Cosmic Message */}
        <motion.blockquote
          className="font-script text-2xl sm:text-3xl text-white/80 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
        >
          &ldquo;{reading.cosmicMessage}&rdquo;
        </motion.blockquote>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cosmic-pink-500/30" />
          <span className="text-cosmic-pink-400/50 text-xs">✧</span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cosmic-pink-500/30" />
        </div>

        {/* Affirmation */}
        <motion.p
          className="mt-4 text-cosmic-gold/60 font-body text-sm italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.6 }}
        >
          Today&apos;s affirmation: {reading.affirmation}
        </motion.p>
      </div>
    </LiquidGlassCard>
  )
})

CosmicWhisperCard.displayName = 'CosmicWhisperCard'

export default CosmicWhisperCard