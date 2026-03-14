// ═══════════════════════════════════════════════════════════════════
// 📝 SOUL INPUT FORM - Multi-Step Cosmic Form
// ═══════════════════════════════════════════════════════════════════

import { memo, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiArrowRight, HiSparkles } from 'react-icons/hi'
import { LiquidGlassCard, HolographicButton, NeuralProgress } from '@components/ui'
import {
  CosmicInput,
  StardustSelect,
  ConstellationRadio,
  NebulaPicker,
  CrystalDatePicker,
  QuantumToggle,
} from '@components/inputs'
import useCosmicStore from '@stores/useCosmicStore'
import useZodiacCalculator from '@hooks/useZodiacCalculator'
import { validateStep } from '@utils/validators'
import {
  GENDER_OPTIONS,
  INTENTIONS,
  MOODS,
  RELATIONSHIP_STATUS,
} from '@utils/constants'
import { ZODIAC_SIGNS } from '@data/zodiacSigns'
import { cn } from '@utils/helpers'

const SoulInputForm = memo(() => {
  const {
    currentStep,
    totalSteps,
    formData,
    formErrors,
    updateFormData,
    setFormErrors,
    nextStep,
    prevStep,
    goToWelcome,
  } = useCosmicStore()

  const { calculateReading } = useZodiacCalculator()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }, [updateFormData])

  // Validate and go next
  const handleNext = useCallback(() => {
    const stepData = getStepData(currentStep, formData)
    const result = validateStep(currentStep, stepData)

    if (!result.success) {
      setFormErrors(result.errors)
      return
    }

    nextStep()
  }, [currentStep, formData, setFormErrors, nextStep])

  // Go back
  const handlePrev = useCallback(() => {
    if (currentStep === 1) {
      goToWelcome()
    } else {
      prevStep()
    }
  }, [currentStep, prevStep, goToWelcome])

  // Submit form
  const handleSubmit = useCallback(async () => {
    const stepData = getStepData(currentStep, formData)
    const result = validateStep(currentStep, stepData)

    if (!result.success) {
      setFormErrors(result.errors)
      return
    }

    setIsSubmitting(true)
    new Audio('/sounds/success.mp3').play().catch(() => {})
    await calculateReading()
    setIsSubmitting(false)
  }, [currentStep, formData, setFormErrors, calculateReading])

  // Step transition variants
  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      transition: {
        duration: 0.3,
      },
    }),
  }

  const [direction, setDirection] = useState(1)

  const goNext = () => {
    setDirection(1)
    new Audio('/sounds/whoosh.mp3').play().catch(() => {})
    handleNext()
  }

  const goPrev = () => {
    setDirection(-1)
    new Audio('/sounds/whoosh.mp3').play().catch(() => {})
    handlePrev()
  }

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-section-form" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* ─── CRYSTAL PANEL ─── */}
        <LiquidGlassCard
          glowColor="aurora"
          tiltEnabled={false}
          className="p-6 sm:p-8 md:p-10"
        >
          {/* ─── PANEL HEADER ─── */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Crystal Ball Icon */}
            <motion.div
              className="mx-auto w-16 h-16 rounded-full mb-4 flex items-center justify-center relative"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(124,58,237,0.3)',
                  '0 0 40px rgba(236,72,153,0.4)',
                  '0 0 20px rgba(124,58,237,0.3)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(124,58,237,0.3), rgba(236,72,153,0.2))',
              }}
            >
              <span className="text-2xl">🔮</span>
              <motion.div
                className="absolute inset-[-4px] rounded-full border border-cosmic-purple-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold mb-2">
              Enter Your Cosmic Details
            </h2>
            <p className="font-body text-white/40 text-sm">
              Share your celestial coordinates to unlock your reading
            </p>
          </motion.div>

          {/* ─── PROGRESS ─── */}
          <NeuralProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            className="mb-8"
          />

          {/* ─── FORM STEPS ─── */}
          <div className="relative min-h-[350px]">
            <AnimatePresence mode="wait" custom={direction}>
              {/* STEP 1: IDENTITY */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <StepHeader
                    icon="👤"
                    title="Your Identity"
                    subtitle="Tell us who you are, cosmic traveler"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <CosmicInput
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={formErrors.firstName}
                      icon="✦"
                      required
                      maxLength={30}
                      glowColor="gold"
                    />
                    <CosmicInput
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={formErrors.lastName}
                      icon="✧"
                      required
                      maxLength={30}
                      glowColor="purple"
                    />
                  </div>

                  <ConstellationRadio
                    name="gender"
                    options={GENDER_OPTIONS}
                    value={formData.gender}
                    onChange={handleChange}
                    error={formErrors.gender}
                    columns={4}
                    size="sm"
                  />
                </motion.div>
              )}

              {/* STEP 2: BIRTH DATA */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-5"
                >
                  <StepHeader
                    icon="⭐"
                    title="Your Birth Chart"
                    subtitle="The exact moment the stars aligned for you"
                  />

                  <CrystalDatePicker
                    day={formData.day}
                    month={formData.month}
                    year={formData.year}
                    onDayChange={handleChange}
                    onMonthChange={handleChange}
                    onYearChange={handleChange}
                    errors={{
                      day: formErrors.day,
                      month: formErrors.month,
                      year: formErrors.year,
                    }}
                  />

                  <CosmicInput
                    label="Birth Time (Optional)"
                    name="birthTime"
                    type="time"
                    value={formData.birthTime}
                    onChange={handleChange}
                    icon="🕐"
                    glowColor="cyan"
                    placeholder="HH:MM"
                  />

                  <p className="text-xs text-white/20 font-body text-center mt-2">
                    Birth time helps with more accurate readings but is optional
                  </p>
                </motion.div>
              )}

              {/* STEP 3: SOUL INTENTION */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <StepHeader
                    icon="🔮"
                    title="Your Soul's Intention"
                    subtitle="What does your heart seek from the cosmos?"
                  />

                  <ConstellationRadio
                    name="intention"
                    options={INTENTIONS}
                    value={formData.intention}
                    onChange={handleChange}
                    error={formErrors.intention}
                    columns={3}
                    size="md"
                  />

                  <NebulaPicker
                    label="Current Cosmic Mood"
                    name="mood"
                    options={MOODS}
                    value={formData.mood}
                    onChange={handleChange}
                    error={formErrors.mood}
                  />
                </motion.div>
              )}

              {/* STEP 4: RELATIONSHIPS */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <StepHeader
                    icon="💫"
                    title="Cosmic Connections"
                    subtitle="Explore your soul's relationship energy"
                  />

                  <ConstellationRadio
                    name="relationshipStatus"
                    options={RELATIONSHIP_STATUS}
                    value={formData.relationshipStatus}
                    onChange={handleChange}
                    columns={3}
                    size="sm"
                  />

                  <StardustSelect
                    label="Partner's Zodiac Sign (Optional)"
                    name="partnerSign"
                    value={formData.partnerSign}
                    onChange={handleChange}
                    icon="💕"
                    glowColor="pink"
                    placeholder="Select partner's sign"
                    options={Object.values(ZODIAC_SIGNS).map(sign => ({
                      value: sign.id,
                      label: sign.name,
                      icon: sign.symbol,
                    }))}
                  />

                  <p className="text-xs text-white/20 font-body text-center">
                    Adding a partner's sign unlocks compatibility insights
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── NAVIGATION BUTTONS ─── */}
          <motion.div
            className="flex items-center justify-between mt-8 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Back Button */}
            <HolographicButton
              variant="glass"
              size="md"
              onClick={goPrev}
              icon={HiArrowLeft}
              iconPosition="left"
            >
              {currentStep === 1 ? 'Home' : 'Back'}
            </HolographicButton>

            {/* Next / Submit Button */}
            {currentStep < totalSteps ? (
              <HolographicButton
                variant="aurora"
                size="md"
                onClick={goNext}
                icon={HiArrowRight}
                iconPosition="right"
              >
                Next
              </HolographicButton>
            ) : (
              <HolographicButton
                variant="gold"
                size="lg"
                onClick={handleSubmit}
                loading={isSubmitting}
                icon={HiSparkles}
                iconPosition="right"
              >
                Reveal My Destiny
              </HolographicButton>
            )}
          </motion.div>
        </LiquidGlassCard>
      </div>
    </motion.section>
  )
})

// ─── Step Header Sub-Component ───
const StepHeader = memo(({ icon, title, subtitle }) => (
  <motion.div
    className="text-center mb-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <motion.span
      className="text-3xl inline-block mb-2"
      animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.span>
    <h3 className="font-display text-xl font-semibold text-white mb-1">{title}</h3>
    <p className="font-body text-sm text-white/30">{subtitle}</p>
  </motion.div>
))

// Helper to get step-specific data for validation
function getStepData(step, formData) {
  switch (step) {
    case 1:
      return {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
      }
    case 2:
      return {
        day: formData.day ? parseInt(formData.day) : undefined,
        month: formData.month ? parseInt(formData.month) : undefined,
        year: formData.year ? parseInt(formData.year) : undefined,
        birthTime: formData.birthTime,
      }
    case 3:
      return {
        intention: formData.intention,
        mood: formData.mood,
      }
    case 4:
      return {
        relationshipStatus: formData.relationshipStatus,
        partnerSign: formData.partnerSign,
      }
    default:
      return {}
  }
}

SoulInputForm.displayName = 'SoulInputForm'
StepHeader.displayName = 'StepHeader'

export default SoulInputForm