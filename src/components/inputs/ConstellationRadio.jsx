// ═══════════════════════════════════════════════════════════════════
// ⭐ CONSTELLATION RADIO - Card-Style Radio Selection with Stars
// ═══════════════════════════════════════════════════════════════════

import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

const ConstellationRadio = memo(({
  name,
  options = [],
  value = '',
  onChange,
  error = '',
  columns = 2, // 2 | 3 | 4
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) => {
  const handleSelect = useCallback((optionValue) => {
    onChange?.({ target: { name, value: optionValue } })
  }, [name, onChange])

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }

  const sizes = {
    sm: 'p-3 gap-2',
    md: 'p-4 gap-3',
    lg: 'p-5 gap-4',
  }

  return (
    <div className={className}>
      <div className={cn('grid gap-3', gridCols[columns])}>
        {options.map((opt, index) => {
          const optValue = typeof opt === 'object' ? opt.value : opt
          const optLabel = typeof opt === 'object' ? opt.label : opt
          const optIcon = typeof opt === 'object' ? opt.icon : null
          const optColor = typeof opt === 'object' ? opt.color : '#7c3aed'
          const optDescription = typeof opt === 'object' ? opt.description : null
          const optGradient = typeof opt === 'object' ? opt.gradient : null
          const isSelected = value === optValue

          return (
            <motion.button
              key={optValue}
              type="button"
              onClick={() => handleSelect(optValue)}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'relative overflow-hidden rounded-2xl',
                'border-2 transition-all duration-400 ease-cosmic',
                'text-center cursor-none group',
                sizes[size],
                isSelected
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]',
              )}
              style={{
                boxShadow: isSelected
                  ? `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${optColor}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                  : '0 5px 15px rgba(0,0,0,0.1)',
              }}
            >
              {/* ─── SELECTED BACKGROUND GLOW ─── */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${optColor}20 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* ─── TOP ACCENT ─── */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                animate={{
                  opacity: isSelected ? 1 : 0,
                  background: optGradient
                    ? `linear-gradient(90deg, transparent, ${optColor}, transparent)`
                    : `linear-gradient(90deg, transparent, ${optColor}, transparent)`,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* ─── ICON ─── */}
              {optIcon && (
                <motion.div
                  className="text-3xl mb-2 mx-auto"
                  animate={isSelected ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {optIcon}
                </motion.div>
              )}

              {/* ─── LABEL ─── */}
              <div className={cn(
                'font-display text-sm font-medium transition-colors duration-300',
                isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80',
              )}>
                {optLabel}
              </div>

              {/* ─── DESCRIPTION ─── */}
              {optDescription && (
                <motion.p
                  className={cn(
                    'text-xs mt-1.5 font-body transition-colors duration-300 line-clamp-2',
                    isSelected ? 'text-white/50' : 'text-white/25',
                  )}
                  animate={{ height: isSelected ? 'auto' : 'auto' }}
                >
                  {optDescription}
                </motion.p>
              )}

              {/* ─── SELECTION INDICATOR ─── */}
              <motion.div
                className="absolute top-3 right-3"
                initial={{ scale: 0 }}
                animate={{ scale: isSelected ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${optColor}30`,
                    border: `2px solid ${optColor}`,
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: optColor }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* ─── CORNER SPARKLES (when selected) ─── */}
              {isSelected && (
                <>
                  <motion.span
                    className="absolute top-2 left-2 text-[8px]"
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    style={{ color: optColor }}
                  >
                    ✦
                  </motion.span>
                  <motion.span
                    className="absolute bottom-2 right-8 text-[6px]"
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    style={{ color: optColor }}
                  >
                    ✧
                  </motion.span>
                </>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* ─── ERROR ─── */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400 font-body flex items-center gap-1.5 pl-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>⚠</span> {error}
        </motion.p>
      )}
    </div>
  )
})

ConstellationRadio.displayName = 'ConstellationRadio'

export default ConstellationRadio