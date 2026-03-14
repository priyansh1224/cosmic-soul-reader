// ═══════════════════════════════════════════════════════════════════
// 🌀 PORTAL LOADER - 3D Tarot Card Loading Screen
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useCosmicStore from '@stores/useCosmicStore'
import useSoundEffects from '@hooks/useSoundEffects'
import { LOADING_MESSAGES } from '@utils/constants'
import { cn } from '@utils/helpers'

const PortalLoader = memo(() => {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [phase, setPhase] = useState('loading') // 'loading' | 'revealing' | 'exiting'
  const { setLoading, goToWelcome } = useCosmicStore()
  const { playCosmic, playReveal } = useSoundEffects()

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 3 + 0.5
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Message cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Phase transitions
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      setPhase('revealing')
      playReveal()

      setTimeout(() => {
        setPhase('exiting')
      }, 1500)

      setTimeout(() => {
        setLoading(false)
        goToWelcome()
      }, 2500)
    }
  }, [progress, phase, setLoading, goToWelcome, playReveal])

  // Play cosmic sound on mount
  useEffect(() => {
    const timer = setTimeout(() => playCosmic(), 500)
    return () => clearTimeout(timer)
  }, [playCosmic])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-loader flex items-center justify-center bg-cosmic-void"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(20px)',
          }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* ─── BACKGROUND EFFECTS ─── */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Radial gradient */}
            <div className="absolute inset-0 bg-cosmic-radial" />

            {/* Animated nebula blobs */}
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-cosmic-purple-500/10 blur-3xl"
              animate={{
                x: ['-20%', '20%', '-10%'],
                y: ['-10%', '15%', '-20%'],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
              style={{ top: '20%', left: '10%' }}
            />
            <motion.div
              className="absolute w-80 h-80 rounded-full bg-cosmic-pink-500/8 blur-3xl"
              animate={{
                x: ['10%', '-20%', '15%'],
                y: ['5%', '-15%', '10%'],
                scale: [1.1, 0.9, 1.1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              style={{ bottom: '10%', right: '15%' }}
            />

            {/* Floating particles */}
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#ffd54f', '#7c3aed', '#ec4899', '#06b6d4', '#fff'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, -30, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* ─── 3D TAROT CARD ─── */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="perspective-2000 mb-12"
              animate={
                phase === 'revealing'
                  ? { rotateY: [0, 1080], scale: [1, 0.5, 0], opacity: [1, 1, 0] }
                  : {}
              }
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="relative w-48 h-72 sm:w-56 sm:h-80 preserve-3d"
                animate={
                  phase === 'loading'
                    ? { rotateY: [0, 360], y: [0, -15, 0] }
                    : {}
                }
                transition={{
                  rotateY: { duration: 8, repeat: Infinity, ease: 'linear' },
                  y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {/* CARD FRONT */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full flex flex-col items-center justify-center p-6"
                    style={{
                      background: 'linear-gradient(135deg, #1a0533 0%, #0d0d2b 50%, #0a0a1a 100%)',
                      border: '2px solid rgba(255, 213, 79, 0.3)',
                      borderRadius: '1rem',
                    }}
                  >
                    {/* Card border glow */}
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow: 'inset 0 0 30px rgba(124, 58, 237, 0.2), 0 0 40px rgba(124, 58, 237, 0.2)',
                      }}
                    />

                    {/* Stars background */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-cosmic-gold/30 text-xs"
                        style={{
                          left: `${15 + Math.random() * 70}%`,
                          top: `${10 + Math.random() * 80}%`,
                        }}
                        animate={{
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      >
                        ✦
                      </motion.span>
                    ))}

                    {/* Moon symbol */}
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{
                        textShadow: [
                          '0 0 10px rgba(255,213,79,0.3)',
                          '0 0 30px rgba(255,213,79,0.6)',
                          '0 0 10px rgba(255,213,79,0.3)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      🌙
                    </motion.div>

                    {/* Title */}
                    <h2 className="font-display text-lg text-gradient-gold font-bold tracking-wider mb-1">
                      COSMIC
                    </h2>
                    <h3 className="font-display text-sm text-white/60 tracking-ultra-wide">
                      READER
                    </h3>

                    {/* Bottom ornament */}
                    <div className="absolute bottom-6 flex items-center gap-2">
                      <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cosmic-gold/30" />
                      <span className="text-cosmic-gold/40 text-xs">✧</span>
                      <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-cosmic-gold/30" />
                    </div>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #2d0055 0%, #1a0533 50%, #0d1f3c 100%)',
                      border: '2px solid rgba(124, 58, 237, 0.3)',
                      borderRadius: '1rem',
                    }}
                  >
                    {/* Geometric pattern */}
                    <div className="relative w-32 h-32">
                      <motion.div
                        className="absolute inset-0 border border-cosmic-purple-500/30 rounded-lg"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        className="absolute inset-4 border border-cosmic-pink-500/30 rounded-lg"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        className="absolute inset-8 border border-cosmic-cyan-500/30 rounded-lg"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-3xl"
                          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                          transition={{
                            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                            scale: { duration: 2, repeat: Infinity },
                          }}
                        >
                          ⭐
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ─── ORBITING RUNES ─── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {['☽', '☉', '♃', '♄', '♆', '♇'].map((rune, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white/20 text-lg"
                  animate={
                    phase === 'revealing'
                      ? {
                          x: Math.cos((i / 6) * Math.PI * 2) * 300,
                          y: Math.sin((i / 6) * Math.PI * 2) * 300,
                          opacity: 0,
                          scale: 0,
                        }
                      : {
                          x: Math.cos(((i / 6) * Math.PI * 2) + (Date.now() / 3000)) * 120,
                          y: Math.sin(((i / 6) * Math.PI * 2) + (Date.now() / 3000)) * 120,
                        }
                  }
                  transition={
                    phase === 'revealing'
                      ? { duration: 0.5, delay: i * 0.05 }
                      : { duration: 0.1 }
                  }
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%)`,
                    '--orbit-radius': '120px',
                    '--orbit-duration': `${15 + i * 2}s`,
                  }}
                >
                  <motion.span
                    className="celestial-orbit inline-block"
                    style={{
                      '--orbit-radius': `${100 + i * 15}px`,
                      '--orbit-duration': `${12 + i * 3}s`,
                    }}
                  >
                    {rune}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* ─── LOADING TEXT ─── */}
            <motion.div
              className="text-center mt-4"
              animate={phase === 'revealing' ? { opacity: 0, y: 20 } : {}}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  className="text-white/50 font-body text-sm tracking-wide"
                  initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4 }}
                >
                  {LOADING_MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* ─── PROGRESS BAR ─── */}
            <motion.div
              className="w-64 mt-6"
              animate={phase === 'revealing' ? { opacity: 0, scale: 0.8 } : {}}
            >
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4)',
                    width: `${Math.min(progress, 100)}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-center text-xs text-white/20 font-tech mt-2">
                {Math.min(Math.round(progress), 100)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

PortalLoader.displayName = 'PortalLoader'

export default PortalLoader