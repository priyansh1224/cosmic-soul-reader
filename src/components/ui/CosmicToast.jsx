// ═══════════════════════════════════════════════════════════════════
// 🍞 COSMIC TOAST - Animated Notification System
// ═══════════════════════════════════════════════════════════════════

import { memo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCheckCircle, HiXCircle, HiExclamation, HiInformationCircle, HiX } from 'react-icons/hi'
import useCosmicStore from '@stores/useCosmicStore'
import { cn } from '@utils/helpers'

const toastConfig = {
  success: {
    icon: HiCheckCircle,
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.2)',
  },
  error: {
    icon: HiXCircle,
    borderColor: 'border-red-500/30',
    bgColor: 'bg-red-500/10',
    iconColor: 'text-red-400',
    glowColor: 'rgba(239, 68, 68, 0.2)',
  },
  warning: {
    icon: HiExclamation,
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.2)',
  },
  info: {
    icon: HiInformationCircle,
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    glowColor: 'rgba(59, 130, 246, 0.2)',
  },
  cosmic: {
    icon: () => <span className="text-xl">✨</span>,
    borderColor: 'border-cosmic-purple-500/30',
    bgColor: 'bg-cosmic-purple-500/10',
    iconColor: 'text-cosmic-gold',
    glowColor: 'rgba(124, 58, 237, 0.2)',
  },
}

const CosmicToast = memo(() => {
  const { activeToast, dismissToast } = useCosmicStore()

  if (!activeToast) return null

  const config = toastConfig[activeToast.type] || toastConfig.info
  const IconComponent = config.icon

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-toast pointer-events-none">
      <AnimatePresence mode="wait">
        {activeToast && (
          <motion.div
            key={activeToast.id}
            initial={{ y: 80, opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ y: 20, opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className={cn(
              'pointer-events-auto',
              'flex items-center gap-3',
              'px-6 py-4 rounded-2xl',
              'backdrop-blur-2xl',
              'border',
              config.borderColor,
              config.bgColor,
              'shadow-2xl',
              'max-w-md min-w-[300px]',
            )}
            style={{
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${config.glowColor}`,
            }}
          >
            {/* Icon */}
            <div className={cn('flex-shrink-0', config.iconColor)}>
              <IconComponent className="w-6 h-6" />
            </div>

            {/* Message */}
            <p className="flex-1 text-sm font-body text-white/90">
              {activeToast.message}
            </p>

            {/* Dismiss Button */}
            <button
              onClick={dismissToast}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white/80"
            >
              <HiX className="w-4 h-4" />
            </button>

            {/* Progress bar for auto-dismiss */}
            <motion.div
              className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full origin-left"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: (activeToast.duration || 3000) / 1000,
                ease: 'linear',
              }}
              style={{
                background: `linear-gradient(90deg, ${config.glowColor}, transparent)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

CosmicToast.displayName = 'CosmicToast'

export default CosmicToast