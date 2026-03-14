import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DimensionalRift({ active = false }) {
  const lines = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * 360,
      length: Math.random() * 40 + 20,
      delay: Math.random() * 0.3,
      width: Math.random() * 2 + 1,
    }))
  }, [])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Central rift */}
          <motion.div
            className="relative"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div
              style={{
                width: 4,
                height: 300,
                background:
                  'linear-gradient(180deg, transparent, #7c3aed, #ec4899, #06b6d4, transparent)',
                boxShadow:
                  '0 0 30px #7c3aed, 0 0 60px #ec4899, 0 0 90px #06b6d4',
                borderRadius: 2,
              }}
            />
          </motion.div>

          {/* Energy lines radiating outward */}
          {lines.map((line) => (
            <motion.div
              key={line.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 50%',
                transform: `rotate(${line.angle}deg)`,
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${line.length}%`, opacity: [0, 0.8, 0] }}
              transition={{
                duration: 1.2,
                delay: line.delay,
                ease: 'easeOut',
              }}
            >
              <div
                style={{
                  height: line.width,
                  background: 'linear-gradient(90deg, #7c3aed, transparent)',
                  boxShadow: '0 0 10px #7c3aed',
                }}
              />
            </motion.div>
          ))}

          {/* Shockwave ring */}
          <motion.div
            className="absolute rounded-full border-2 border-purple-500/50"
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 800, height: 800, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 40px #7c3aed, inset 0 0 40px #7c3aed',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}