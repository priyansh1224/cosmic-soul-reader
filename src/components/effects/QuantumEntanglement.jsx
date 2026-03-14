import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function QuantumEntanglement({ active = false, particleCount = 30 }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      color: ['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f'][
        Math.floor(Math.random() * 4)
      ],
      targetX: Math.random() * 100,
      targetY: Math.random() * 100,
    }))

    setParticles(newParticles)
  }, [active, particleCount])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Entangled particle pairs */}
      {particles.map((particle, i) => {
        const partner =
          particles[(i + Math.floor(particleCount / 2)) % particleCount]

        return (
          <React.Fragment key={particle.id}>
            {/* Particle */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                filter: 'blur(1px)',
              }}
              initial={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: 0,
              }}
              animate={{
                left: [
                  `${particle.x}%`,
                  `${particle.targetX}%`,
                  `${particle.x}%`,
                ],
                top: [
                  `${particle.y}%`,
                  `${particle.targetY}%`,
                  `${particle.y}%`,
                ],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Connection line to partner */}
            {partner && i < particleCount / 2 && (
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ overflow: 'visible' }}
              >
                <motion.line
                  x1={`${particle.x}%`}
                  y1={`${particle.y}%`}
                  x2={`${partner.x}%`}
                  y2={`${partner.y}%`}
                  stroke={particle.color}
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: particle.duration,
                    delay: particle.delay,
                    repeat: Infinity,
                  }}
                />
              </svg>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}