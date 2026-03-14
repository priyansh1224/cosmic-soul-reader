// ═══════════════════════════════════════════════════════════════════
// 🌌 NEBULA PICKER - Pill-style Multi-Select with Nebula Effects
// ═══════════════════════════════════════════════════════════════════

import { memo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'

const NebulaPicker = memo(({
  label,
  name,
  options = [],
  value = '',
  onChange,
  error = '',
  multiple = false,
  className = '',
}) => {
  const handleSelect = useCallback((optionValue) => {
    if (multiple) {
      const currentValues = value ? value.split(',') : []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue]
      onChange?.({ target: { name, value: newValues.join(',') } })
    } else {
      onChange?.({ target: { name, value: optionValue } })
    }
  }, [name, value, onChange, multiple])

  const isSelected = (optValue) => {
    if (multiple) {
      return value ? value.split(',').includes(optValue) : false
    }
    return value === optValue
  }

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-body text-white/40 mb-3 tracking-wide">
          {label}
        </label>
      )}

      {/* Pills Container */}
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt, index) => {
          const optValue = typeof opt === 'object' ? opt.value : opt
          const optLabel = typeof opt === 'object' ? opt.label : opt
          const optIcon = typeof opt === 'object' ? opt.icon : null
          const optColor = typeof opt === 'object' ? opt.color : '#7c3aed'
          const selected = isSelected(optValue)

          return (
            <motion.button
              key={optValue}
              type="button"
              onClick={() => handleSelect(optValue)}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative overflow-hidden',
                'px-4 py-2.5 rounded-full',
                'border transition-all duration-300 ease-cosmic',
                'font-body text-sm cursor-none',
                'flex items-center gap-2',
                selected
                  ? 'border-white/20 text-white'
                  : 'border-white/[0.06] text-white/50 hover:text-white/70 hover:border-white/10',
              )}
              style={{
                backgroundColor: selected ? `${optColor}20` : 'rgba(255,255,255,0.02)',
                boxShadow: selected ? `0 4px 15px ${optColor}20, 0 0 10px ${optColor}10` : 'none',
              }}
            >
              {/* Selected glow background */}
              {selected && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${optColor}15 0%, transparent 80%)`,
                  }}
                />
              )}

              {/* Icon */}
              {optIcon && (
                <motion.span
                  animate={selected ? {
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {optIcon}
                </motion.span>
              )}

              {/* Label */}
              <span className="relative z-10">{optLabel}</span>

              {/* Selected dot */}
              <AnimatePresence>
                {selected && (
                  <motion.span
                    initial={{ scale: 0, width: 0 }}
                    animate={{ scale: 1, width: 'auto' }}
                    exit={{ scale: 0, width: 0 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="text-xs"
                    style={{ color: optColor }}
                  >
                    ✦
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Shimmer on selected */}
              {selected && (
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  <motion.div
                    className="absolute top-0 -left-full w-full h-full"
                    animate={{ left: ['−100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    }}
                  />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Error */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400 font-body flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span>⚠</span> {error}
        </motion.p>
      )}
    </div>
  )
})

NebulaPicker.displayName = 'NebulaPicker'

export default NebulaPicker