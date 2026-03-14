// ═══════════════════════════════════════════════════════════════════
// ⚡ QUANTUM TOGGLE - Cosmic Switch with Energy Transfer
// ═══════════════════════════════════════════════════════════════════

import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import useSoundEffects from '@hooks/useSoundEffects'

const QuantumToggle = memo(({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  size = 'md', // 'sm' | 'md' | 'lg'
  activeColor = '#7c3aed',
  inactiveColor = 'rgba(255,255,255,0.1)',
  activeIcon = '✦',
  inactiveIcon = '○',
  className = '',
}) => {
  const { playClick } = useSoundEffects()

  const handleToggle = useCallback(() => {
    if (disabled) return
    onChange?.({ target: { name, value: !checked, type: 'checkbox', checked: !checked } })
    playClick()
  }, [checked, disabled, name, onChange, playClick])

  const sizes = {
    sm: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translateX(20px)', icon: 'text-[8px]' },
    md: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translateX(28px)', icon: 'text-xs' },
    lg: { track: 'w-18 h-9', thumb: 'w-8 h-8', translate: 'translateX(36px)', icon: 'text-sm' },
  }

  const s = sizes[size] || sizes.md

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Toggle Track */}
      <motion.button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className={cn(
          'relative rounded-full cursor-none transition-all duration-500 ease-cosmic',
          'flex items-center',
          s.track,
          disabled && 'opacity-40 cursor-not-allowed',
        )}
        style={{
          backgroundColor: checked ? `${activeColor}30` : inactiveColor,
          border: `2px solid ${checked ? activeColor : 'rgba(255,255,255,0.1)'}`,
          boxShadow: checked ? `0 0 20px ${activeColor}40, inset 0 0 10px ${activeColor}20` : 'none',
        }}
      >
        {/* Energy Transfer Line */}
        <motion.div
          className="absolute inset-y-0 left-1 right-1 flex items-center"
          style={{ opacity: checked ? 0.3 : 0.1 }}
        >
          <motion.div
            className="h-[1px] rounded-full"
            animate={{
              width: checked ? '100%' : '0%',
              background: checked
                ? `linear-gradient(90deg, ${activeColor}, ${activeColor}00)`
                : 'transparent',
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Thumb */}
        <motion.div
          className={cn(
            'relative rounded-full flex items-center justify-center',
            'shadow-lg',
            s.thumb,
          )}
          animate={{
            x: checked ? parseInt(s.translate.match(/\d+/)[0]) : 2,
            backgroundColor: checked ? activeColor : 'rgba(255,255,255,0.3)',
            boxShadow: checked
              ? `0 0 15px ${activeColor}80, 0 2px 8px rgba(0,0,0,0.3)`
              : '0 2px 8px rgba(0,0,0,0.2)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Icon inside thumb */}
          <motion.span
            className={cn('text-white', s.icon)}
            animate={{
              rotate: checked ? 360 : 0,
              scale: checked ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {checked ? activeIcon : inactiveIcon}
          </motion.span>

          {/* Pulse when toggling */}
          {checked && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ backgroundColor: activeColor }}
            />
          )}
        </motion.div>
      </motion.button>

      {/* Label */}
      {label && (
        <motion.label
          className={cn(
            'font-body text-sm cursor-none transition-colors duration-300 select-none',
            checked ? 'text-white/80' : 'text-white/40',
            disabled && 'cursor-not-allowed',
          )}
          onClick={handleToggle}
          animate={{
            x: checked ? 2 : 0,
          }}
        >
          {label}
        </motion.label>
      )}
    </div>
  )
})

QuantumToggle.displayName = 'QuantumToggle'

export default QuantumToggle