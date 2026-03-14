// ═══════════════════════════════════════════════════════════════════
// 🌟 COSMIC WELCOME - Hero Landing Section
// ═══════════════════════════════════════════════════════════════════

import { memo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HolographicButton } from '@components/ui'
import { GravitationalLens, StellarWind, QuantumEntanglement } from '@components/effects'
import useCosmicStore from '@stores/useCosmicStore'

const CosmicWelcome = memo(() => {
  const { goToForm } = useCosmicStore()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const handleBeginReading = () => {
    new Audio('/sounds/whoosh.mp3').play().catch(() => {})
    goToForm()
  }

  // Text animation stagger
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      filter: 'blur(15px)',
      rotateX: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* ─── BACKGROUND ─── */}
      <div className="absolute inset-0 bg-section-welcome" />

      {/* ─── ADD EFFECTS ─── */}
      <QuantumEntanglement
        nodeCount={15}
        connectionDistance={200}
        speed={0.2}
        interactive={true}
      />
      <StellarWind
        direction="right"
        particleCount={20}
        color="gold"
        speed={0.5}
        opacity={0.15}
      />
      <StellarWind
        direction="diagonal"
        particleCount={10}
        color="purple"
        speed={0.3}
        opacity={0.1}
      />

      {/* ─── CELESTIAL ORB ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Outer atmosphere */}
          <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.1) 40%, transparent 70%)',
            }}
          />

          {/* Middle glow */}
          <div className="absolute inset-[15%] rounded-full animate-breathe opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(124,58,237,0.2) 50%, transparent 70%)',
            }}
          />

          {/* Core sphere */}
          <motion.div
            className="absolute inset-[30%] rounded-full"
            animate={{
              boxShadow: [
                '0 0 60px rgba(124,58,237,0.4), inset 0 0 40px rgba(236,72,153,0.3)',
                '0 0 80px rgba(236,72,153,0.5), inset 0 0 60px rgba(124,58,237,0.4)',
                '0 0 60px rgba(124,58,237,0.4), inset 0 0 40px rgba(236,72,153,0.3)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(124,58,237,0.5) 30%, rgba(236,72,153,0.4) 60%, rgba(6,182,212,0.3) 100%)',
            }}
          />

          {/* Orbital rings */}
          <motion.div
            className="absolute inset-[10%] border border-cosmic-purple-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transform: 'rotateX(70deg)' }}
          />
          <motion.div
            className="absolute inset-[5%] border border-cosmic-pink-500/15 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{ transform: 'rotateX(70deg) rotateZ(60deg)' }}
          />
          <motion.div
            className="absolute inset-[20%] border border-cosmic-gold/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ transform: 'rotateX(70deg) rotateZ(120deg)' }}
          />
        </motion.div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <GravitationalLens active={true} size={300} />
      
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ y }}
      >
        {/* Title */}
        <motion.div
          className="mb-8 perspective-1000"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-2"
            variants={wordVariants}
          >
            <span className="text-gradient-gold glow-text-gold">Cosmic</span>
          </motion.h1>

          <motion.h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-2"
            variants={wordVariants}
          >
            <span className="text-gradient-aurora">Soul</span>
          </motion.h1>

          <motion.h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none"
            variants={wordVariants}
          >
            <span className="text-gradient-silver">Reader</span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mb-12 space-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="font-body text-lg sm:text-xl text-white/50 tracking-[0.2em] uppercase">
            Unlock the secrets of the cosmos
          </p>
          <p className="font-body text-base sm:text-lg text-white/30 tracking-wider">
            Discover your zodiac identity, soul purpose & cosmic destiny
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <HolographicButton
            variant="gold"
            size="xl"
            onClick={handleBeginReading}
            icon="✨"
            iconPosition="right"
          >
            Begin Your Reading
          </HolographicButton>
        </motion.div>

        {/* Features Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          {[
            { icon: '♈', label: 'Zodiac Reading' },
            { icon: '🔢', label: 'Numerology' },
            { icon: '💕', label: 'Compatibility' },
            { icon: '🧘', label: 'Chakra Balance' },
            { icon: '🔮', label: 'Predictions' },
          ].map((feature, i) => (
            <motion.div
              key={feature.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-sm font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(255,255,255,0.15)',
                y: -2,
              }}
            >
              <span>{feature.icon}</span>
              <span>{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>


    </motion.section>
  )
})

CosmicWelcome.displayName = 'CosmicWelcome'

export default CosmicWelcome