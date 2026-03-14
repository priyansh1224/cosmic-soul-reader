// ═══════════════════════════════════════════════════════════════════
// 🔗 SOUL BOND VISUALIZER - 3D Connection Thread Between Two Souls
// ═══════════════════════════════════════════════════════════════════

import { memo, useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'
import useUIStore from '@stores/useUIStore'

const SoulBondVisualizer = memo(({
  userSign = null,
  partnerSign = null,
  bondStrength = 75, // 0-100
  bondType = 'romantic', // 'romantic' | 'friendship' | 'karmic' | 'soulmate'
  animated = true,
  showLabels = true,
  className = '',
}) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [pulseIntensity, setPulseIntensity] = useState(0)
  const particlesEnabled = useUIStore((s) => s.particlesEnabled)
  const isMobile = useUIStore((s) => s.isMobile)

  // Bond type configurations
  const bondConfigs = {
    romantic: {
      primaryColor: '#ec4899',
      secondaryColor: '#f472b6',
      particleColor: '#ff6b9d',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      label: 'Romantic Bond',
      emoji: '💖',
      threadCount: 5,
      particleCount: 20,
    },
    friendship: {
      primaryColor: '#ffd54f',
      secondaryColor: '#ffe082',
      particleColor: '#ffaa00',
      glowColor: 'rgba(255, 213, 79, 0.4)',
      label: 'Friendship Bond',
      emoji: '🤝',
      threadCount: 3,
      particleCount: 12,
    },
    karmic: {
      primaryColor: '#7c3aed',
      secondaryColor: '#a78bfa',
      particleColor: '#bf5af2',
      glowColor: 'rgba(124, 58, 237, 0.4)',
      label: 'Karmic Bond',
      emoji: '🔮',
      threadCount: 7,
      particleCount: 25,
    },
    soulmate: {
      primaryColor: '#06b6d4',
      secondaryColor: '#22d3ee',
      particleColor: '#67e8f9',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      label: 'Soulmate Bond',
      emoji: '✨',
      threadCount: 9,
      particleCount: 30,
    },
  }

  const config = bondConfigs[bondType] || bondConfigs.romantic

  // Canvas animation for soul threads
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !particlesEnabled || !animated) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width = canvas.parentElement?.offsetWidth || 400
    const height = canvas.height = 200

    const centerY = height / 2
    const leftX = width * 0.15
    const rightX = width * 0.85
    const midX = width / 2

    // Thread particles traveling between nodes
    const particles = Array.from({ length: config.particleCount }, (_, i) => ({
      progress: Math.random(), // 0 = left, 1 = right
      speed: 0.002 + Math.random() * 0.004,
      size: 1.5 + Math.random() * 2.5,
      offset: (Math.random() - 0.5) * 30,
      direction: Math.random() > 0.5 ? 1 : -1,
      brightness: 0.5 + Math.random() * 0.5,
      threadIndex: i % config.threadCount,
    }))

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.016

      // Draw threads
      for (let t = 0; t < config.threadCount; t++) {
        const threadOffset = ((t - (config.threadCount - 1) / 2) / config.threadCount) * 40
        const waveAmplitude = 8 + Math.sin(time * 0.5 + t) * 4
        const waveFreq = 2 + t * 0.3

        // Thread path
        ctx.beginPath()
        ctx.moveTo(leftX, centerY + threadOffset)

        for (let x = leftX; x <= rightX; x += 2) {
          const progress = (x - leftX) / (rightX - leftX)
          const wave = Math.sin(progress * Math.PI * waveFreq + time * 2 + t) * waveAmplitude
          const curve = Math.sin(progress * Math.PI) * threadOffset * 0.5
          const y = centerY + threadOffset + wave + curve

          ctx.lineTo(x, y)
        }

        // Thread style
        const gradient = ctx.createLinearGradient(leftX, 0, rightX, 0)
        const alpha = (bondStrength / 100) * 0.4 * (isHovered ? 1.5 : 1)
        gradient.addColorStop(0, `${config.primaryColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(0.5, `${config.secondaryColor}${Math.round(alpha * 1.5 * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, `${config.primaryColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1 + (bondStrength / 100) * 1.5
        ctx.stroke()
      }

      // Draw particles traveling along threads
      particles.forEach((p) => {
        // Update position
        p.progress += p.speed * p.direction * (bondStrength / 50)

        // Bounce at edges
        if (p.progress > 1) {
          p.progress = 1
          p.direction = -1
        } else if (p.progress < 0) {
          p.progress = 0
          p.direction = 1
        }

        // Calculate position on thread
        const x = leftX + (rightX - leftX) * p.progress
        const threadOffset = ((p.threadIndex - (config.threadCount - 1) / 2) / config.threadCount) * 40
        const waveAmplitude = 8 + Math.sin(time * 0.5 + p.threadIndex) * 4
        const waveFreq = 2 + p.threadIndex * 0.3
        const wave = Math.sin(p.progress * Math.PI * waveFreq + time * 2 + p.threadIndex) * waveAmplitude
        const curve = Math.sin(p.progress * Math.PI) * threadOffset * 0.5
        const y = centerY + threadOffset + wave + curve + p.offset * Math.sin(p.progress * Math.PI)

        // Draw particle glow
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4)
        glowGradient.addColorStop(0, `${config.particleColor}60`)
        glowGradient.addColorStop(1, `${config.particleColor}00`)
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(x, y, p.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw particle core
        ctx.fillStyle = `${config.particleColor}${Math.round(p.brightness * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw node glows
      const drawNode = (x, y, radius) => {
        const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, radius * 2)
        nodeGlow.addColorStop(0, `${config.primaryColor}40`)
        nodeGlow.addColorStop(0.5, `${config.primaryColor}15`)
        nodeGlow.addColorStop(1, `${config.primaryColor}00`)
        ctx.fillStyle = nodeGlow
        ctx.beginPath()
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      drawNode(leftX, centerY, 20 + Math.sin(time * 2) * 3)
      drawNode(rightX, centerY, 20 + Math.sin(time * 2 + 1) * 3)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [bondStrength, bondType, config, isHovered, animated, particlesEnabled])

  // Bond strength pulsing
  useEffect(() => {
    if (!animated) return
    const interval = setInterval(() => {
      setPulseIntensity(prev => {
        const next = prev + 0.05
        return next > Math.PI * 2 ? 0 : next
      })
    }, 50)
    return () => clearInterval(interval)
  }, [animated])

  const pulseScale = 1 + Math.sin(pulseIntensity) * 0.03

  return (
    <motion.div
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── BACKGROUND GLASS ─── */}
      <div className="relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.06] p-6">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${config.glowColor} 0%, transparent 70%)`,
            opacity: isHovered ? 0.35 : 0.15,
          }}
        />

        {/* ─── HEADER ─── */}
        {showLabels && (
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{config.emoji}</span>
              <span className="font-display text-sm font-semibold text-white/80">
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-body text-white/30">Bond Strength</span>
              <motion.span
                className="font-tech text-sm font-bold"
                style={{ color: config.primaryColor }}
                animate={{ scale: [1, pulseScale, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {bondStrength}%
              </motion.span>
            </div>
          </div>
        )}

        {/* ─── SOUL NODES & BOND CANVAS ─── */}
        <div className="relative z-10 flex items-center justify-between">
          {/* Left Soul Node (User) */}
          <motion.div
            className="flex flex-col items-center z-10"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center relative"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), ${config.primaryColor}40)`,
                border: `2px solid ${config.primaryColor}60`,
                boxShadow: `0 0 20px ${config.glowColor}`,
              }}
              animate={{
                boxShadow: [
                  `0 0 15px ${config.glowColor}`,
                  `0 0 30px ${config.glowColor}`,
                  `0 0 15px ${config.glowColor}`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl">
                {userSign?.symbol || '✦'}
              </span>

              {/* Orbiting dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: config.particleColor }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                initial={{ x: 30 }}
              />
            </motion.div>

            {showLabels && (
              <span className="mt-2 text-xs font-body text-white/40">
                {userSign?.name || 'You'}
              </span>
            )}
          </motion.div>

          {/* Bond Canvas (Middle) */}
          <div className="absolute inset-0 z-0">
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ opacity: particlesEnabled ? 0.8 : 0.4 }}
            />
          </div>

          {/* Right Soul Node (Partner) */}
          <motion.div
            className="flex flex-col items-center z-10"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center relative"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), ${config.secondaryColor}40)`,
                border: `2px solid ${config.secondaryColor}60`,
                boxShadow: `0 0 20px ${config.glowColor}`,
              }}
              animate={{
                boxShadow: [
                  `0 0 15px ${config.glowColor}`,
                  `0 0 30px ${config.glowColor}`,
                  `0 0 15px ${config.glowColor}`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <span className="text-2xl">
                {partnerSign?.symbol || '✧'}
              </span>

              <motion.div
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: config.particleColor }}
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                initial={{ x: 30 }}
              />
            </motion.div>

            {showLabels && (
              <span className="mt-2 text-xs font-body text-white/40">
                {partnerSign?.name || 'Partner'}
              </span>
            )}
          </motion.div>
        </div>

        {/* ─── BOND STRENGTH BAR ─── */}
        <div className="relative z-10 mt-4">
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: `${bondStrength}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
              style={{
                background: `linear-gradient(90deg, ${config.primaryColor}, ${config.secondaryColor}, ${config.primaryColor})`,
                backgroundSize: '200% 100%',
                animation: 'gradientFlow 3s linear infinite',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
})

SoulBondVisualizer.displayName = 'SoulBondVisualizer'

export default SoulBondVisualizer