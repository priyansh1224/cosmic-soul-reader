// ═══════════════════════════════════════════════════════════════════
// 🫧 LIQUID GLASS CARD - Morphing Glass Morphism with 3D Tilt
// ═══════════════════════════════════════════════════════════════════

import { useRef, useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { cn, throttle, mapRange, clamp } from '@utils/helpers'
import useUIStore from '@stores/useUIStore'

const LiquidGlassCard = memo(({
  children,
  className = '',
  glowColor = 'purple', // 'purple' | 'gold' | 'pink' | 'cyan' | 'aurora'
  tiltEnabled = true,
  disableTilt = false,
  maxTilt = 12,
  glareEnabled = true,
  borderGlow = true,
  hoverScale = 1,
  animateEntry = true,
  entryDelay = 0,
  onClick,
  as: Component = 'div',
  ...props
}) => {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const isMobile = useUIStore((s) => s.isMobile)
  const shouldTilt = tiltEnabled && !disableTilt && !isMobile

  // Glow color mapping
  const glowColors = {
    purple: {
      border: 'rgba(124, 58, 237, 0.3)',
      shadow: 'rgba(124, 58, 237, 0.15)',
      gradient: 'from-cosmic-purple-500/20 via-transparent to-transparent',
    },
    gold: {
      border: 'rgba(255, 213, 79, 0.3)',
      shadow: 'rgba(255, 213, 79, 0.15)',
      gradient: 'from-cosmic-gold/20 via-transparent to-transparent',
    },
    pink: {
      border: 'rgba(236, 72, 153, 0.3)',
      shadow: 'rgba(236, 72, 153, 0.15)',
      gradient: 'from-cosmic-pink-500/20 via-transparent to-transparent',
    },
    cyan: {
      border: 'rgba(6, 182, 212, 0.3)',
      shadow: 'rgba(6, 182, 212, 0.15)',
      gradient: 'from-cosmic-cyan-500/20 via-transparent to-transparent',
    },
    aurora: {
      border: 'rgba(124, 58, 237, 0.2)',
      shadow: 'rgba(124, 58, 237, 0.1)',
      gradient: 'from-cosmic-purple-500/10 via-cosmic-pink-500/10 to-cosmic-cyan-500/10',
    },
  }

  const colors = glowColors[glowColor] || glowColors.purple

  // Mouse move handler for tilt
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (disableTilt || !shouldTilt || !cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const tiltX = clamp(
        mapRange(mouseY, -rect.height / 2, rect.height / 2, maxTilt, -maxTilt),
        -maxTilt,
        maxTilt
      )
      const tiltY = clamp(
        mapRange(mouseX, -rect.width / 2, rect.width / 2, -maxTilt, maxTilt),
        -maxTilt,
        maxTilt
      )

      setTilt({ x: tiltX, y: tiltY })

      // Glare position
      const glareX = mapRange(e.clientX - rect.left, 0, rect.width, 0, 100)
      const glareY = mapRange(e.clientY - rect.top, 0, rect.height, 0, 100)
      setGlarePos({ x: glareX, y: glareY })

      // Mouse position relative to card for edge glow
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }, 16),
    [shouldTilt, maxTilt]
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  
  const handleMouseLeave = useCallback(() => {
    if (disableTilt) return
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
    setGlarePos({ x: 50, y: 50 })
  }, [disableTilt])

  // Entry animation variants
  const entryVariants = animateEntry
    ? {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay: entryDelay,
            ease: [0.23, 1, 0.32, 1],
          },
        },
      }
    : {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }

  return (
    <motion.div
      ref={cardRef}
      variants={entryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      <Component
        className={cn(
          // Base glass styles
          'relative overflow-hidden',
          'bg-white/[0.03]',
          'border border-white/[0.08]',
          'rounded-3xl',
          'transition-all duration-500 ease-cosmic',
          // Hover effects
          onClick && 'cursor-none',
          className
        )}
        style={{
          transform: shouldTilt
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? hoverScale : 1})`
            : `scale(${isHovered ? hoverScale : 1})`,
          transition: isHovered
            ? 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease'
            : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease',
          boxShadow: isHovered
            ? `0 25px 60px -12px rgba(0,0,0,0.5), 0 0 40px ${colors.shadow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 10px 30px -10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
          borderColor: isHovered ? colors.border : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* ─── LIQUID NEBULA BACKGROUND ─── */}
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-700"
          style={{
            opacity: isHovered ? 0.5 : 0.2,
            background: `
              radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, ${colors.border} 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* ─── GLARE EFFECT ─── */}
        {glareEnabled && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {/* ─── BORDER GLOW ─── */}
        {borderGlow && isHovered && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${colors.border} 0%, transparent 40%)
              `,
              opacity: 0.6,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
          />
        )}

        {/* ─── SHIMMER EFFECT ─── */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.5s' }}
        >
          <div
            className="absolute top-0 h-full w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              animation: isHovered ? 'shimmer 2s ease-in-out infinite' : 'none',
            }}
          />
        </div>

        {/* ─── TOP ACCENT LINE ─── */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0.3,
            background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
          }}
        />

        {/* ─── CONTENT ─── */}
        <div className="relative z-10">{children}</div>
      </Component>
    </motion.div>
  )
})

LiquidGlassCard.displayName = 'LiquidGlassCard'

export default LiquidGlassCard