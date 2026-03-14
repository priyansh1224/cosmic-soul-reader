// ═══════════════════════════════════════════════════════════════════
// 🧲 MAGNETIC MENU - Floating Action Button with Magnetic Effects
// ═══════════════════════════════════════════════════════════════════

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiVolumeUp, HiVolumeOff, HiSparkles, HiMoon, HiSun, HiCog, HiAdjustments } from 'react-icons/hi'
import useUIStore from '@stores/useUIStore'
import useSoundEffects from '@hooks/useSoundEffects'
import { cn } from '@utils/helpers'

const MagneticMenu = memo(() => {
  const [isOpen, setIsOpen] = useState(false)
  const { playClick } = useSoundEffects()

  const {
    soundEnabled,
    toggleSound,
    particlesEnabled,
    toggleParticles,
    theme,
    cycleTheme,
    performanceMode,
    setPerformanceMode,
  } = useUIStore()

  const menuItems = [
    {
      id: 'sound',
      icon: soundEnabled ? HiVolumeUp : HiVolumeOff,
      label: soundEnabled ? 'Sound On' : 'Sound Off',
      color: soundEnabled ? '#ffd54f' : '#636e72',
      action: toggleSound,
    },
    {
      id: 'particles',
      icon: HiSparkles,
      label: particlesEnabled ? 'Effects On' : 'Effects Off',
      color: particlesEnabled ? '#a29bfe' : '#636e72',
      action: toggleParticles,
    },
    {
      id: 'theme',
      icon: theme === 'dark' ? HiMoon : HiSun,
      label: `Theme: ${theme}`,
      color: theme === 'dark' ? '#74b9ff' : '#ffd54f',
      action: cycleTheme,
    },
    {
      id: 'performance',
      icon: HiAdjustments,
      label: `Quality: ${performanceMode}`,
      color: '#55efc4',
      action: () => {
        const modes = ['low', 'medium', 'high']
        const current = modes.indexOf(performanceMode)
        setPerformanceMode(modes[(current + 1) % modes.length])
      },
    },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    playClick()
  }

  return (
    <div className="fixed bottom-6 right-6 z-60">
      {/* ─── MENU ITEMS ─── */}
      <AnimatePresence>
        {isOpen && menuItems.map((item, i) => {
          const Icon = item.icon
          const angle = -90 - (i * 50)
          const radian = (angle * Math.PI) / 180
          const radius = 75
          const x = Math.cos(radian) * radius
          const y = Math.sin(radian) * radius

          return (
            <motion.div
              key={item.id}
              className="absolute bottom-0 right-0"
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{ x, y, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 200,
                delay: i * 0.05,
              }}
            >
              {/* Tooltip */}
              <motion.div
                className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.2 }}
              >
                <span className="px-3 py-1.5 rounded-lg text-xs font-body bg-cosmic-abyss/90 backdrop-blur-sm border border-white/10 text-white/80">
                  {item.label}
                </span>
              </motion.div>

              {/* Button */}
              <motion.button
                onClick={() => {
                  item.action()
                  playClick()
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  'backdrop-blur-xl border border-white/10',
                  'transition-all duration-300 cursor-none',
                  'shadow-lg',
                )}
                style={{
                  backgroundColor: `${item.color}20`,
                  boxShadow: `0 5px 20px ${item.color}30`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: item.color }} />
              </motion.button>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* ─── MAIN FAB BUTTON ─── */}
      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 135 : 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className={cn(
          'relative w-14 h-14 rounded-full flex items-center justify-center',
          'bg-aurora bg-[length:200%_200%] animate-gradient-shift',
          'shadow-glow-aurora',
          'cursor-none',
          'z-10',
        )}
      >
        <HiCog className="w-6 h-6 text-white" />

        {/* Pulse Ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cosmic-purple-500/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>
    </div>
  )
})

MagneticMenu.displayName = 'MagneticMenu'

export default MagneticMenu