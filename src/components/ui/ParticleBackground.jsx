// ═══════════════════════════════════════════════════════════════════
// ✨ PARTICLE BACKGROUND - Floating Cosmic Particles
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import useUIStore from '@stores/useUIStore'

const ParticleBackground = memo(({ count = 50, className = '' }) => {
  const particlesEnabled = useUIStore((s) => s.particlesEnabled)
  const isMobile = useUIStore((s) => s.isMobile)

  const actualCount = isMobile ? Math.floor(count / 3) : count

  const particles = useMemo(() => {
    return Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
      color: [
        'rgba(255, 213, 79, VAR)',   // Gold
        'rgba(124, 58, 237, VAR)',    // Purple
        'rgba(236, 72, 153, VAR)',    // Pink
        'rgba(6, 182, 212, VAR)',     // Cyan
        'rgba(255, 255, 255, VAR)',   // White
      ][Math.floor(Math.random() * 5)],
      moveX: (Math.random() - 0.5) * 100,
      moveY: (Math.random() - 0.5) * 80,
    }))
  }, [actualCount])

  if (!particlesEnabled) return null

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          initial={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, p.opacity, p.opacity, 0],
            x: [0, p.moveX, -p.moveX / 2, 0],
            y: [0, p.moveY, -p.moveY / 2, 0],
            scale: [0.5, 1, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color.replace('VAR', String(p.opacity)),
            boxShadow: `0 0 ${p.size * 3}px ${p.color.replace('VAR', String(p.opacity * 0.5))}`,
          }}
        />
      ))}

      {/* Larger Nebula Orbs */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cosmic-purple-500/5 blur-3xl animate-nebula-drift" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cosmic-pink-500/5 blur-3xl animate-nebula-drift animation-delay-5000" style={{ animationDelay: '5s' }} />
          <div className="absolute top-2/3 left-1/2 w-48 h-48 rounded-full bg-cosmic-cyan-500/5 blur-3xl animate-nebula-drift animation-delay-10000" style={{ animationDelay: '10s' }} />
        </>
      )}
    </div>
  )
})

ParticleBackground.displayName = 'ParticleBackground'

export default ParticleBackground