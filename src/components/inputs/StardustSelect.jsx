// ═══════════════════════════════════════════════════════════════════
// ⭐ STARDUST SELECT - Custom Dropdown with Cosmic Animation
// ═══════════════════════════════════════════════════════════════════

import { useState, useRef, useCallback, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'
import { cn } from '@utils/helpers'

const StardustSelect = memo(({
  label,
  name,
  value = '',
  onChange,
  options = [],
  error = '',
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  icon: Icon,
  className = '',
  glowColor = 'purple',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const selectRef = useRef(null)

  const selectedOption = options.find(opt =>
    (typeof opt === 'object' ? opt.value : opt) === value
  )

  const getOptionLabel = (opt) => typeof opt === 'object' ? opt.label : opt
  const getOptionValue = (opt) => typeof opt === 'object' ? opt.value : opt
  const getOptionIcon = (opt) => typeof opt === 'object' ? opt.icon : null
  const getOptionColor = (opt) => typeof opt === 'object' ? opt.color : null

  // Color schemes
  const colors = {
    purple: { focus: 'border-cosmic-purple-500', glow: 'rgba(124, 58, 237, 0.3)', label: 'text-cosmic-purple-400' },
    gold: { focus: 'border-cosmic-gold', glow: 'rgba(255, 213, 79, 0.3)', label: 'text-cosmic-gold' },
    pink: { focus: 'border-cosmic-pink-500', glow: 'rgba(236, 72, 153, 0.3)', label: 'text-cosmic-pink-400' },
    cyan: { focus: 'border-cosmic-cyan-500', glow: 'rgba(6, 182, 212, 0.3)', label: 'text-cosmic-cyan-400' },
  }
  const c = colors[glowColor] || colors.purple

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const toggleOpen = useCallback(() => {
    if (disabled) return
    setIsOpen(prev => !prev)
  }, [disabled])

  const selectOption = useCallback((opt) => {
    const val = getOptionValue(opt)
    onChange?.({ target: { name, value: val } })
    setIsOpen(false)
  }, [name, onChange])

  return (
    <div ref={selectRef} className={cn('relative', className)} {...props}>
      {/* ─── TRIGGER BUTTON ─── */}
      <motion.button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        className={cn(
          'w-full relative overflow-hidden rounded-2xl transition-all duration-500 ease-cosmic',
          'border-2 text-left cursor-none',
          isOpen ? c.focus : error ? 'border-red-500/50' : 'border-white/10',
          isOpen ? 'bg-white/[0.06]' : 'bg-white/[0.03]',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          boxShadow: isOpen ? `0 0 30px ${c.glow}` : 'none',
        }}
        whileTap={!disabled ? { scale: 0.99 } : {}}
      >
        <div className="flex items-center gap-3 px-6 pt-6 pb-2">
          {/* Selected Icon */}
          {(Icon || (selectedOption && getOptionIcon(selectedOption))) && (
            <span className="mr-3 text-xl">
              {selectedOption ? getOptionIcon(selectedOption) || (typeof Icon === 'string' ? Icon : '') : (typeof Icon === 'string' ? Icon : '')}
            </span>
          )}

          {/* Selected Value */}
          <span className={cn(
            'flex-1 text-lg font-body transition-colors duration-300 truncate',
            value ? 'text-white' : 'text-transparent',
          )}>
            {selectedOption ? getOptionLabel(selectedOption) : placeholder}
          </span>

          {/* Arrow */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={cn('text-white/40 transition-colors', isOpen && c.label)}
          >
            <HiChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Floating Label */}
        <motion.span
          className={cn(
            'absolute left-16 pointer-events-none font-body',
            'transition-all duration-300 origin-left',
          )}
          animate={{
            top: value || isOpen ? '6px' : '50%',
            y: value || isOpen ? 0 : '-50%',
            scale: value || isOpen ? 0.75 : 1,
            color: isOpen
              ? c.glow.replace('0.3', '1').replace('rgba', 'rgb').replace(', 1)', ')')
              : value
                ? 'rgba(255,255,255,0.5)'
                : 'rgba(255,255,255,0.35)',
          }}
        >
          {label}
          {required && <span className="text-cosmic-pink-400 ml-1">*</span>}
        </motion.span>

        {/* Top glow line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          animate={{
            opacity: isOpen ? 1 : 0,
            background: `linear-gradient(90deg, transparent, ${c.glow.replace('0.3', '0.8')}, transparent)`,
          }}
        />
      </motion.button>

      {/* ─── DROPDOWN OPTIONS ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'absolute z-50 w-full mt-2',
              'bg-cosmic-abyss/95 backdrop-blur-2xl',
              'border border-white/10 rounded-2xl',
              'shadow-cosmic-lg overflow-hidden',
              'max-h-60 overflow-y-auto scrollbar-hidden',
            )}
            initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(5px)' }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            style={{
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${c.glow}`,
            }}
          >
            {options.map((opt, index) => {
              const optValue = getOptionValue(opt)
              const optLabel = getOptionLabel(opt)
              const optIcon = getOptionIcon(opt)
              const optColor = getOptionColor(opt)
              const isSelected = optValue === value
              const isHovered = hoveredIndex === index

              return (
                <motion.button
                  key={optValue}
                  type="button"
                  onClick={() => selectOption(opt)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  className={cn(
                    'w-full flex items-center gap-3 px-5 py-3.5',
                    'text-left cursor-none transition-all duration-200',
                    isSelected ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white',
                    isHovered && !isSelected && 'bg-white/5',
                  )}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  {/* Option Icon */}
                  {optIcon && (
                    <motion.span
                      className="text-lg flex-shrink-0"
                      animate={isHovered ? { scale: 1.2, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {optIcon}
                    </motion.span>
                  )}

                  {/* Option Color Dot */}
                  {optColor && !optIcon && (
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: optColor,
                        boxShadow: isHovered ? `0 0 10px ${optColor}` : 'none',
                      }}
                    />
                  )}

                  {/* Option Label */}
                  <span className="flex-1 font-body">{optLabel}</span>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <motion.span
                      className="text-cosmic-gold text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      ✦
                    </motion.span>
                  )}

                  {/* Hover Glow */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      layoutId="selectHover"
                      style={{
                        background: `linear-gradient(90deg, ${c.glow.replace('0.3', '0.05')}, transparent)`,
                      }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── ERROR ─── */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-400 font-body flex items-center gap-1.5 pl-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <span>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

StardustSelect.displayName = 'StardustSelect'

export default StardustSelect