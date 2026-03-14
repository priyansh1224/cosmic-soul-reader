// ═══════════════════════════════════════════════════════════════════
// ⏳ READING REVEAL - Cosmic Loading During Calculation
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StellarLoader } from '@components/ui'
import useZodiacCalculator from '@hooks/useZodiacCalculator'
import { cn } from '@utils/helpers'

const ReadingReveal = memo(() => {
  const { progress, loadingMessage, isError } = useZodiacCalculator()

  return (
    <motion.section
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cosmic-void/95 backdrop-blur-2xl" />

      {/* Background cosmic effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
            top: '30%',
            left: '20%',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
            bottom: '20%',
            right: '15%',
          }}
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 20, -40, 0],
            scale: [1.1, 0.9, 1.15, 1.1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Floating zodiac symbols */}
        {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => (
          <motion.span
            key={i}
            className="absolute text-white/[0.03] text-4xl"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 30}%`,
            }}
            animate={{
              opacity: [0.02, 0.08, 0.02],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', damping: 20 }}
      >
        {/* Cosmic Spinner */}
        <StellarLoader
          size="xl"
          message={loadingMessage}
          progress={progress}
        />

        {/* Additional cosmic decoration */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="cosmic-loading-dots">
            <span />
            <span />
            <span />
          </div>
        </motion.div>

        {/* Error state */}
        {isError && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-400 font-body text-sm">
              ⚠ Cosmic interference detected. Recalibrating...
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  )
})

ReadingReveal.displayName = 'ReadingReveal'

export default ReadingReveal