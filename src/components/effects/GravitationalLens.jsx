import React from 'react'
import { motion } from 'framer-motion'

export default function GravitationalLens({
  active = false,
  position = { x: 50, y: 50 },
  size = 200,
}) {
  if (!active) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-40"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Distortion rings */}
      {[1, 1.3, 1.6, 2].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size * scale,
            height: size * scale,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid rgba(124, 58, 237, ${0.4 - i * 0.08})`,
            boxShadow: `0 0 ${20 + i * 10}px rgba(124, 58, 237, ${0.2 - i * 0.04})`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2 + i * 0.5, repeat: Infinity },
            rotate: {
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
      ))}

      {/* Central glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.8) 0%, rgba(236, 72, 153, 0.4) 40%, transparent 70%)',
          filter: 'blur(5px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}