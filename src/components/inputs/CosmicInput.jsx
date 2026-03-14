// ═══════════════════════════════════════════════════════════════════
// ✨ COSMIC INPUT - Floating Label Input with Particle Effects
// ═══════════════════════════════════════════════════════════════════

import { useState, useRef, useCallback, memo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'

const CosmicInput = memo(({
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  onBlur,
  placeholder = '',
  error = '',
  icon: Icon,
  required = false,
  disabled = false,
  maxLength,
  min,
  max,
  autoComplete = 'off',
  className = '',
  glowColor = 'purple', // 'purple' | 'gold' | 'pink' | 'cyan'
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [charParticles, setCharParticles] = useState([])
  const [rippleActive, setRippleActive] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const hasValue = value && String(value).length > 0
  const isFloating = isFocused || hasValue

  // Color schemes
  const colors = {
    purple: {
      focus: 'border-cosmic-purple-500',
      glow: 'rgba(124, 58, 237, 0.3)',
      ring: 'ring-cosmic-purple-500/20',
      label: 'text-cosmic-purple-400',
      bg: 'bg-cosmic-purple-500/5',
    },
    gold: {
      focus: 'border-cosmic-gold',
      glow: 'rgba(255, 213, 79, 0.3)',
      ring: 'ring-cosmic-gold/20',
      label: 'text-cosmic-gold',
      bg: 'bg-cosmic-gold/5',
    },
    pink: {
      focus: 'border-cosmic-pink-500',
      glow: 'rgba(236, 72, 153, 0.3)',
      ring: 'ring-cosmic-pink-500/20',
      label: 'text-cosmic-pink-400',
      bg: 'bg-cosmic-pink-500/5',
    },
    cyan: {
      focus: 'border-cosmic-cyan-500',
      glow: 'rgba(6, 182, 212, 0.3)',
      ring: 'ring-cosmic-cyan-500/20',
      label: 'text-cosmic-cyan-400',
      bg: 'bg-cosmic-cyan-500/5',
    },
  }

  const c = colors[glowColor] || colors.purple

  // Create character particle on keypress
  const handleChange = useCallback((e) => {
    const newValue = e.target.value
    onChange?.(e)

    // Spawn particle for new character
    if (newValue.length > String(value).length && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const inputRect = inputRef.current.getBoundingClientRect()
      
      // Estimate cursor position
      const charWidth = 9
      const cursorX = Math.min(
        (newValue.length * charWidth) + 24,
        rect.width - 20
      )

      const particle = {
        id: Date.now() + Math.random(),
        x: cursorX,
        y: inputRect.height / 2,
        char: newValue[newValue.length - 1],
        color: ['#ffd54f', '#7c3aed', '#ec4899', '#06b6d4'][
          Math.floor(Math.random() * 4)
        ],
      }

      setCharParticles(prev => [...prev.slice(-5), particle])

      setTimeout(() => {
        setCharParticles(prev => prev.filter(p => p.id !== particle.id))
      }, 800)
    }
  }, [onChange, value])

  // Focus handler with ripple
  const handleFocus = useCallback((e) => {
    setIsFocused(true)
    setRippleActive(true)
    setTimeout(() => setRippleActive(false), 600)
    props.onFocus?.(e)
  }, [props])

  // Blur handler
  const handleBlur = useCallback((e) => {
    setIsFocused(false)
    onBlur?.(e)
  }, [onBlur])

  return (
    <div className={cn('relative group', className)}>
      {/* ─── CONTAINER ─── */}
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden rounded-2xl transition-all duration-500 ease-cosmic',
          // Border
          'border-2',
          isFocused ? c.focus : error ? 'border-red-500/50' : 'border-white/10',
          // Background
          isFocused ? c.bg : 'bg-white/[0.03]',
          // Shadow
          // Disabled
          disabled && 'opacity-50 cursor-not-allowed',
        )}
        style={{
          boxShadow: isFocused
            ? `0 0 30px ${c.glow}, inset 0 0 15px ${c.glow.replace('0.3', '0.05')}, inset 0 0 0 3px ${c.glow.replace('0.3', '0.25')}`
            : 'none',
        }}
      >
        {/* ─── RIPPLE ON FOCUS ─── */}
        <AnimatePresence>
          {rippleActive && (
            <motion.div
              className="absolute rounded-full pointer-events-none"
              initial={{
                width: 0,
                height: 0,
                opacity: 0.3,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                width: 600,
                height: 600,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* ─── EDGE GLOW LINES ─── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          animate={{
            opacity: isFocused ? 1 : 0,
            background: `linear-gradient(90deg, transparent, ${c.glow.replace('0.3', '0.8')}, transparent)`,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ─── INPUT FIELD ─── */}
        <div className="flex items-center">
          {/* Icon */}
          {Icon && (
            <motion.div
              className={cn(
                'pl-5 flex-shrink-0 transition-colors duration-300',
                isFocused ? c.label : 'text-white/30',
              )}
              animate={{
                scale: isFocused ? 1.1 : 1,
                rotate: isFocused ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {typeof Icon === 'string' ? (
                <span className="text-xl">{Icon}</span>
              ) : (
                <Icon className="w-5 h-5" />
              )}
            </motion.div>
          )}

          <div className="relative flex-1">
            <input
              ref={inputRef}
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              maxLength={maxLength}
              min={min}
              max={max}
              autoComplete={autoComplete}
              placeholder={isFloating ? placeholder : ' '}
              className={cn(
                'w-full bg-transparent outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0',
                'text-white text-lg font-body',
                'transition-all duration-300',
                '[color-scheme:dark]',
                type === "time" && '[&::-webkit-calendar-picker-indicator]:hidden',
                type === "time" && '[&::-webkit-inner-spin-button]:hidden',
                type === "time" && '[&::-webkit-clear-button]:hidden',
                Icon ? 'pl-3 pr-5 pt-6 pb-2' : 'px-6 pt-6 pb-2',
                disabled && 'cursor-not-allowed',
              )}
              {...props}
            />

            {/* ─── FLOATING LABEL ─── */}
            <motion.label
              className={cn(
                'absolute pointer-events-none font-body',
                'transition-all duration-300 ease-cosmic',
                'origin-left',
                Icon ? 'left-3' : 'left-6',
              )}
              animate={{
                top: isFloating ? '6px' : '50%',
                y: isFloating ? 0 : '-50%',
                scale: isFloating ? 0.75 : 1,
                color: isFocused
                  ? c.glow.replace('0.3', '1').replace('rgba', 'rgb').replace(', 1)', ')')
                  : error
                    ? 'rgb(239, 68, 68)'
                    : hasValue
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(255, 255, 255, 0.35)',
              }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {label}
              {required && <span className="text-cosmic-pink-400 ml-1">*</span>}
            </motion.label>
          </div>

          {/* Character count */}
          {maxLength && isFocused && (
            <motion.span
              className="pr-4 text-xs text-white/20 font-tech"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {String(value).length}/{maxLength}
            </motion.span>
          )}
        </div>

        {/* ─── CHARACTER PARTICLES ─── */}
        <AnimatePresence>
          {charParticles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute pointer-events-none text-xs font-bold"
              initial={{
                left: particle.x,
                top: particle.y,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                top: particle.y - 40,
                opacity: 0,
                scale: 0.5,
                rotate: Math.random() > 0.5 ? 30 : -30,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ color: particle.color }}
            >
              {particle.char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* ─── ERROR MESSAGE ─── */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-400 font-body flex items-center gap-1.5 pl-2"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-red-400">⚠</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ─── SUCCESS INDICATOR (has value, no error) ─── */}
      {hasValue && !error && !isFocused && (
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-emerald-400 text-sm">✓</span>
        </motion.div>
      )}
    </div>
  )
})

CosmicInput.displayName = 'CosmicInput'

export default CosmicInput