// ═══════════════════════════════════════════════════════════════════
// 🌈 HOLOGRAPHIC BUTTON - Prismatic Animated Button
// ═══════════════════════════════════════════════════════════════════

import { useRef, useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

const HolographicButton = memo(({
  children,
  onClick,
  variant = 'gold', // 'gold' | 'aurora' | 'glass' | 'cosmic' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ...props
}) => {
  const buttonRef = useRef(null)
  const [ripples, setRipples] = useState([])

  // Size classes
  const sizes = {
    sm: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
    md: 'px-8 py-3.5 text-base gap-2.5 rounded-2xl',
    lg: 'px-10 py-4.5 text-lg gap-3 rounded-2xl',
    xl: 'px-14 py-5 text-xl gap-3.5 rounded-3xl',
  }

  // Variant styles
  const variants = {
    gold: {
      bg: 'bg-gradient-to-r from-cosmic-gold-light via-cosmic-gold to-cosmic-gold-dark',
      text: 'text-cosmic-abyss',
      shadow: '0 10px 30px rgba(255, 213, 79, 0.3)',
      hoverShadow: '0 20px 50px rgba(255, 213, 79, 0.5)',
      rippleColor: 'rgba(255, 255, 255, 0.4)',
    },
    aurora: {
      bg: 'bg-aurora bg-[length:300%_300%] animate-gradient-shift',
      text: 'text-white',
      shadow: '0 10px 30px rgba(124, 58, 237, 0.3)',
      hoverShadow: '0 20px 50px rgba(124, 58, 237, 0.5)',
      rippleColor: 'rgba(255, 255, 255, 0.3)',
    },
    glass: {
      bg: 'bg-white/5 backdrop-blur-xl border border-white/10',
      text: 'text-white',
      shadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      hoverShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      rippleColor: 'rgba(255, 213, 79, 0.3)',
    },
    cosmic: {
      bg: 'bg-gradient-to-r from-cosmic-purple-600 via-cosmic-pink-500 to-cosmic-cyan-500 bg-[length:200%_200%] animate-gradient-shift',
      text: 'text-white',
      shadow: '0 10px 30px rgba(124, 58, 237, 0.4)',
      hoverShadow: '0 20px 50px rgba(236, 72, 153, 0.4)',
      rippleColor: 'rgba(255, 255, 255, 0.3)',
    },
    danger: {
      bg: 'bg-gradient-to-r from-red-500 to-rose-600',
      text: 'text-white',
      shadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
      hoverShadow: '0 20px 50px rgba(239, 68, 68, 0.5)',
      rippleColor: 'rgba(255, 255, 255, 0.3)',
    },
  }

  const v = variants[variant] || variants.gold

  // Ripple effect on click
  const createRipple = useCallback((e) => {
    if (disabled || loading) return

    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    const ripple = {
      id: Date.now(),
      x: x - size / 2,
      y: y - size / 2,
      size,
    }

    setRipples((prev) => [...prev, ripple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
    }, 800)
  }, [disabled, loading])

  // Handle click
  const handleClick = useCallback((e) => {
    if (disabled || loading) return
    createRipple(e)
    onClick?.(e)
  }, [disabled, loading, createRipple, onClick])

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { y: -3, scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97, y: 0 } : {}}
      className={cn(
        // Base
        'relative overflow-hidden font-display font-semibold',
        'transition-all duration-300 ease-cosmic',
        'select-none cursor-none',
        // Size
        sizes[size],
        // Width
        fullWidth && 'w-full',
        // Variant
        v.bg,
        v.text,
        // Disabled
        disabled && 'opacity-50 cursor-not-allowed saturate-50',
        loading && 'cursor-wait',
        className
      )}
      style={{
        boxShadow: v.shadow,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.boxShadow = v.hoverShadow
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = v.shadow
      }}
      {...props}
    >
      {/* ─── AURORA GLOW BEHIND ─── */}
      <div className={cn(
        'absolute inset-[-3px] rounded-[inherit] opacity-0 blur-xl transition-opacity duration-300',
        'group-hover:opacity-60',
        !disabled && !loading && 'hover:opacity-60',
        v.bg
      )} />

      {/* ─── SHIMMER OVERLAY ─── */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <div
          className="absolute top-0 -left-full w-full h-full opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* ─── RIPPLE EFFECTS ─── */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: `radial-gradient(circle, ${v.rippleColor} 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* ─── CONTENT ─── */}
      <span className="relative z-10 flex items-center justify-center gap-inherit">
        {/* Loading Spinner */}
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {/* Icon Left */}
        {Icon && iconPosition === 'left' && !loading && (
          <motion.span
            className="inline-flex"
            whileHover={{ x: -2 }}
          >
            {typeof Icon === 'string' ? Icon : <Icon className="w-5 h-5" />}
          </motion.span>
        )}

        {/* Text */}
        <span>{children}</span>

        {/* Icon Right */}
        {Icon && iconPosition === 'right' && !loading && (
          <motion.span
            className="inline-flex"
            whileHover={{ x: 3 }}
          >
            {typeof Icon === 'string' ? Icon : <Icon className="w-5 h-5" />}
          </motion.span>
        )}
      </span>

      {/* ─── HOLOGRAPHIC BORDER EFFECT ─── */}
      {variant !== 'glass' && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)',
          }}
        />
      )}
    </motion.button>
  )
})

HolographicButton.displayName = 'HolographicButton'

export default HolographicButton