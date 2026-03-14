import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function CosmicInkSplatter({
  active = false,
  color = '#7c3aed',
  count = 8,
}) {
  const splatters = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 60,
      size: Math.random() * 200 + 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 1 + 1.5,
      rotation: Math.random() * 360,
    }))
  }, [count])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {splatters.map((splatter) => (
        <motion.div
          key={splatter.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 0.6, 0] }}
          transition={{
            duration: splatter.duration,
            delay: splatter.delay,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            left: `${splatter.x}%`,
            top: `${splatter.y}%`,
            width: splatter.size,
            height: splatter.size,
            transform: `translate(-50%, -50%) rotate(${splatter.rotation}deg)`,
            background: `radial-gradient(ellipse at center, ${color}80 0%, ${color}40 30%, ${color}10 60%, transparent 80%)`,
            borderRadius: '50%',
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </div>
  )
}