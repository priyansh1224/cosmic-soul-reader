import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function StellarWind({
  active = false,
  direction = 'right',
  intensity = 1,
}) {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: (Math.random() * 2 + 1) * intensity,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.2,
      length: Math.random() * 60 + 20,
    }))
  }, [intensity])

  if (!active) return null

  const isRight = direction === 'right'

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            top: `${p.y}%`,
            height: p.size,
            background: `linear-gradient(${isRight ? '90deg' : '270deg'}, transparent, rgba(124, 58, 237, ${p.opacity}), rgba(6, 182, 212, ${p.opacity * 0.5}), transparent)`,
            borderRadius: p.size,
            filter: 'blur(0.5px)',
          }}
          initial={{
            left: isRight ? '-20%' : '120%',
            width: 0,
          }}
          animate={{
            left: isRight ? '120%' : '-20%',
            width: [
              `${p.length}px`,
              `${p.length * 1.5}px`,
              `${p.length}px`,
            ],
          }}
          transition={{
            duration: p.speed,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}