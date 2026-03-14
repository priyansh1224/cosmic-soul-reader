// ═══════════════════════════════════════════════════════════════════
// ⏳ STELLAR LOADER - Cosmic Loading Spinner
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

const StellarLoader = memo(({
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  message = '',
  progress = -1, // -1 = indeterminate
  className = '',
}) => {
  const sizes = {
    sm: { container: 'w-16 h-16', ring: 'w-16 h-16', core: 'w-6 h-6', text: 'text-xs' },
    md: { container: 'w-24 h-24', ring: 'w-24 h-24', core: 'w-10 h-10', text: 'text-sm' },
    lg: { container: 'w-36 h-36', ring: 'w-36 h-36', core: 'w-14 h-14', text: 'text-base' },
    xl: { container: 'w-48 h-48', ring: 'w-48 h-48', core: 'w-20 h-20', text: 'text-lg' },
  }

  const s = sizes[size] || sizes.md

  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      {/* ─── SPINNER ─── */}
      <div className={cn('relative', s.container)}>
        {/* Outer Ring */}
        <motion.div
          className={cn('absolute inset-0 rounded-full border-2 border-transparent', s.ring)}
          style={{
            borderTopColor: '#7c3aed',
            borderRightColor: 'rgba(124, 58, 237, 0.3)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Middle Ring */}
        <motion.div
          className={cn('absolute inset-2 rounded-full border-2 border-transparent')}
          style={{
            borderTopColor: '#ec4899',
            borderLeftColor: 'rgba(236, 72, 153, 0.3)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: '#06b6d4',
            borderBottomColor: 'rgba(6, 182, 212, 0.3)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={cn('rounded-full', s.core)}
            style={{
              background: 'radial-gradient(circle, #ffd54f 0%, #ff8f00 100%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                '0 0 20px rgba(255, 213, 79, 0.5)',
                '0 0 40px rgba(255, 213, 79, 0.8)',
                '0 0 20px rgba(255, 213, 79, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Orbiting Dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#7c3aed', '#ec4899', '#06b6d4'][i],
              boxShadow: `0 0 10px ${['#7c3aed', '#ec4899', '#06b6d4'][i]}`,
              top: '50%',
              left: '50%',
              transformOrigin: `${-20 - i * 8}px 0`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* ─── PROGRESS BAR ─── */}
      {progress >= 0 && (
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* ─── MESSAGE ─── */}
      {message && (
        <motion.p
          className={cn('text-white/60 font-body text-center', s.text)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={message}
        >
          {message}
        </motion.p>
      )}
    </div>
  )
})

StellarLoader.displayName = 'StellarLoader'

export default StellarLoader