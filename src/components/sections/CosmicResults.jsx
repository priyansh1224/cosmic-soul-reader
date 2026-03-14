// ═══════════════════════════════════════════════════════════════════
// 🌌 COSMIC RESULTS - All Reading Result Cards
// ═══════════════════════════════════════════════════════════════════

import { memo, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { HiShare, HiBookmark, HiRefresh } from 'react-icons/hi'
import { HolographicButton, StellarLoader } from '@components/ui'
import { CosmicInkSplatter, StellarWind } from '@components/effects'
import useCosmicStore from '@stores/useCosmicStore'
import useSoundEffects from '@hooks/useSoundEffects'
import { shareResult } from '@utils/helpers'

// Lazy load heavy card components
const SoulGreetingCard = lazy(() => import('@components/cards/SoulGreetingCard'))
const ZodiacIdentityCard = lazy(() => import('@components/cards/ZodiacIdentityCard'))
const PersonalityMatrixCard = lazy(() => import('@components/cards/PersonalityMatrixCard'))
const CosmicWhisperCard = lazy(() => import('@components/cards/CosmicWhisperCard'))
const DailyOracleCard = lazy(() => import('@components/cards/DailyOracleCard'))
const DestinyPredictionCard = lazy(() => import('@components/cards/DestinyPredictionCard'))
const LuckyTalismansCard = lazy(() => import('@components/cards/LuckyTalismansCard'))
const SoulCompatibilityCard = lazy(() => import('@components/cards/SoulCompatibilityCard'))
const LifePathCard = lazy(() => import('@components/cards/LifePathCard'))
const ChakraBalanceCard = lazy(() => import('@components/cards/ChakraBalanceCard'))
const CosmicGuidanceCard = lazy(() => import('@components/cards/CosmicGuidanceCard'))

const CardFallback = () => (
  <div className="flex items-center justify-center py-16">
    <StellarLoader size="sm" />
  </div>
)

const CosmicResults = memo(() => {
  const { reading, resetAll, showToast } = useCosmicStore()
  const { playClick, playSuccess } = useSoundEffects()

  if (!reading) return null

  const handleShare = async () => {
    playClick()
    const success = await shareResult(reading)
    showToast({
      type: success ? 'success' : 'info',
      message: success ? 'Reading shared successfully!' : 'Link copied to clipboard!',
    })
  }

  const handleSave = () => {
    playSuccess()
    showToast({
      type: 'cosmic',
      message: 'Reading saved to your cosmic journal!',
    })
  }

  const handleNewReading = () => {
    playClick()
    resetAll()
  }

  return (
    <motion.section
      className="relative min-h-screen py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-section-results" />
      
      {/* ─── ADD EFFECTS ─── */}
      <StellarWind 
        direction="right" 
        particleCount={15} 
        color="gold" 
        speed={0.3} 
        opacity={0.1} 
      />
      <StellarWind 
        direction="up" 
        particleCount={10} 
        color="purple" 
        speed={0.2} 
        opacity={0.08} 
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">

        {/* ─── SECTION HEADER ─── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.span
            className="text-5xl inline-block mb-4"
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold mb-3">
            Your Cosmic Reading
          </h1>
          <p className="font-body text-white/40 text-lg">
            The stars have spoken. Here is your celestial destiny.
          </p>
        </motion.div>

        {/* ─── RESULT CARDS ─── */}
        <Suspense fallback={<CardFallback />}>
          {/* Greeting with Ink Splatter */}
          <CosmicInkSplatter
            trigger={true}
            colors={reading.zodiac?.luckyColors || ['#7c3aed', '#ec4899']}
            splatterCount={10}
            onComplete={() => console.log('Greeting card revealed!')}
          >
            <SoulGreetingCard reading={reading} delay={0} />
          </CosmicInkSplatter>

          {/* Zodiac Identity */}
          <ZodiacIdentityCard reading={reading} delay={0.1} />

          {/* Personality */}
          <PersonalityMatrixCard reading={reading} delay={0.2} />

          {/* Cosmic Message */}
          <CosmicWhisperCard reading={reading} delay={0.3} />

          {/* Life Path (Numerology) */}
          <LifePathCard reading={reading} delay={0.35} />

          {/* Daily Oracle */}
          <DailyOracleCard reading={reading} delay={0.4} />

          {/* Predictions Grid */}
          <DestinyPredictionCard reading={reading} delay={0.5} />

          {/* Lucky Talismans */}
          <LuckyTalismansCard reading={reading} delay={0.6} />

          {/* Chakra Balance */}
          <ChakraBalanceCard reading={reading} delay={0.65} />

          {/* Compatibility */}
          <SoulCompatibilityCard reading={reading} delay={0.7} />

          {/* Cosmic Guidance */}
          <CosmicGuidanceCard reading={reading} delay={0.8} />
        </Suspense>

        {/* ─── ACTION BUTTONS ─── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <HolographicButton
            variant="glass"
            size="lg"
            onClick={handleShare}
            icon={HiShare}
            iconPosition="left"
          >
            Share Reading
          </HolographicButton>

          <HolographicButton
            variant="cosmic"
            size="lg"
            onClick={handleSave}
            icon={HiBookmark}
            iconPosition="left"
          >
            Save Reading
          </HolographicButton>

          <HolographicButton
            variant="gold"
            size="lg"
            onClick={handleNewReading}
            icon={HiRefresh}
            iconPosition="left"
          >
            New Reading
          </HolographicButton>
        </motion.div>

        {/* ─── FOOTER ─── */}
        <motion.div
          className="text-center py-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/15 text-sm font-body">
            ✨ Cosmic Soul Reader • The stars guide, you decide ✨
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
})

CosmicResults.displayName = 'CosmicResults'

export default CosmicResults