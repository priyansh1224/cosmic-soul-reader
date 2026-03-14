// ═══════════════════════════════════════════════════════════════════
// 🧠 NEURAL PROGRESS - Animated Step Progress with Neural Network
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo, useRef, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { FORM_STEP_LABELS } from '@utils/constants'

const NeuralProgress = memo(({ currentStep, totalSteps, className = '' }) => {
  const steps = useMemo(
    () => Array.from({ length: totalSteps }, (_, i) => i + 1),
    [totalSteps]
  )

  // ── Track the actual pixel positions of step nodes ──
  const containerRef = useRef(null)
  const nodeRefs = useRef([])
  const [lineGeometry, setLineGeometry] = useState({ left: 0, width: 0 })
  const [activeWidth, setActiveWidth] = useState(0)

  // Measure real node positions for pixel-perfect lines
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container || nodeRefs.current.length < 2) return

    const measure = () => {
      const containerRect = container.getBoundingClientRect()
      const firstNode = nodeRefs.current[0]
      const lastNode = nodeRefs.current[totalSteps - 1]
      const activeNode = nodeRefs.current[currentStep - 1]

      if (!firstNode || !lastNode || !activeNode) return

      const firstRect = firstNode.getBoundingClientRect()
      const lastRect = lastNode.getBoundingClientRect()
      const activeRect = activeNode.getBoundingClientRect()

      // Line starts at center of first node, ends at center of last node
      const firstCenter = firstRect.left + firstRect.width / 2 - containerRect.left
      const lastCenter = lastRect.left + lastRect.width / 2 - containerRect.left
      const activeCenter = activeRect.left + activeRect.width / 2 - containerRect.left

      setLineGeometry({
        left: firstCenter,
        width: lastCenter - firstCenter,
      })

      setActiveWidth(
        totalSteps === 1 ? 0 : activeCenter - firstCenter
      )
    }

    measure()

    // Re-measure on resize
    const observer = new ResizeObserver(measure)
    observer.observe(container)

    return () => observer.disconnect()
  }, [currentStep, totalSteps])

  return (
    <div className={cn('w-full', className)} ref={containerRef}>
      {/* ─── STEP INDICATORS ─── */}
      <div className="flex items-center justify-between relative mb-4">

        {/* ─── BACKGROUND TRACK LINE (inactive) ─── */}
        <div
          className="absolute top-6 h-[2px] pointer-events-none"
          style={{
            left: lineGeometry.left,
            width: lineGeometry.width,
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />

        {/* ─── ACTIVE CONNECTION LINE ─── */}
        <motion.div
          className="absolute top-6 h-[2px] pointer-events-none origin-left"
          initial={false}
          animate={{ width: activeWidth }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{
            left: lineGeometry.left,
            background: 'linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4)',
          }}
        />

        {/* ─── NEURAL PULSE along active line ─── */}
        {currentStep > 1 && (
          <motion.div
            className="absolute top-[22px] h-[4px] pointer-events-none rounded-full"
            initial={false}
            animate={{
              width: activeWidth,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              width: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
              opacity: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              left: lineGeometry.left,
              background: 'linear-gradient(90deg, transparent, #ffd54f, transparent)',
              filter: 'blur(4px)',
            }}
          />
        )}

        {/* ─── STEP NODES ─── */}
        {steps.map((step, index) => {
          const isActive = step === currentStep
          const isCompleted = step < currentStep
          const isPending = step > currentStep

          return (
            <motion.div
              key={step}
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.08,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* ─── Node Circle ─── */}
              <div
                ref={(el) => { nodeRefs.current[index] = el }}
                className="relative"
              >
                {/* Active outer glow rings */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute inset-[-6px] rounded-full border border-cosmic-purple-500/25"
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.25, 0, 0.25],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute inset-[-10px] rounded-full border border-cosmic-purple-500/12"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.15, 0, 0.15],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.4,
                      }}
                    />
                  </>
                )}

                {/* Completed subtle glow */}
                {isCompleted && (
                  <div
                    className="absolute inset-[-3px] rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,213,79,0.15) 0%, transparent 70%)',
                      filter: 'blur(3px)',
                    }}
                  />
                )}

                {/* Main node */}
                <motion.div
                  className={cn(
                    'relative w-12 h-12 rounded-full flex items-center justify-center',
                    'border-2 font-display font-bold text-sm',
                    'transition-colors duration-400',
                    isCompleted && 'border-cosmic-gold bg-cosmic-gold/20 text-cosmic-gold',
                    isActive && 'border-cosmic-purple-500 bg-cosmic-purple-500/20 text-white',
                    isPending && 'border-white/20 bg-white/5 text-white/30',
                  )}
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            '0 0 0px 0px rgba(124, 58, 237, 0)',
                            '0 0 20px 4px rgba(124, 58, 237, 0.3)',
                            '0 0 0px 0px rgba(124, 58, 237, 0)',
                          ],
                        }
                      : isCompleted
                        ? { boxShadow: '0 0 12px 2px rgba(255, 213, 79, 0.15)' }
                        : { boxShadow: '0 0 0px 0px rgba(0,0,0,0)' }
                  }
                  transition={
                    isActive
                      ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.4 }
                  }
                >
                  {/* Completed checkmark */}
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      />
                    </svg>
                  ) : (
                    <motion.span
                      key={`num-${step}-${isActive}`}
                      initial={isActive ? { scale: 0.5 } : false}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      {step}
                    </motion.span>
                  )}
                </motion.div>
              </div>

              {/* ─── Step Label ─── */}
              <motion.span
                className={cn(
                  'mt-3 text-xs font-body tracking-wide text-center',
                  'max-w-[80px] leading-tight',
                  'transition-colors duration-300',
                  isActive && 'text-white font-medium',
                  isCompleted && 'text-cosmic-gold/80',
                  isPending && 'text-white/25',
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.15 }}
              >
                {FORM_STEP_LABELS[step] || `Step ${step}`}
              </motion.span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
})

NeuralProgress.displayName = 'NeuralProgress'

export default NeuralProgress