// ═══════════════════════════════════════════════════════════════════
// 🌈 AURA COMPATIBILITY - Overlapping Energy Field Visualization
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn, getElementColor } from '@utils/helpers'

const AuraCompatibility = memo(({
  userElement = 'fire',
  partnerElement = 'water',
  score = 70,
  showDetails = true,
  className = '',
}) => {
  const userColor = getElementColor(userElement)
  const partnerColor = getElementColor(partnerElement)

  // Aura layers for each element
  const auraLayers = useMemo(() => ({
    user: [
      { radius: 90, opacity: 0.08, blur: 20 },
      { radius: 70, opacity: 0.12, blur: 15 },
      { radius: 50, opacity: 0.18, blur: 10 },
      { radius: 30, opacity: 0.25, blur: 5 },
    ],
    partner: [
      { radius: 90, opacity: 0.08, blur: 20 },
      { radius: 70, opacity: 0.12, blur: 15 },
      { radius: 50, opacity: 0.18, blur: 10 },
      { radius: 30, opacity: 0.25, blur: 5 },
    ],
  }), [])

  // Overlap amount based on score
  const overlapDistance = useMemo(() => {
    // Higher score = more overlap
    return 120 - (score / 100) * 80 // Range: 40px (high) to 120px (low)
  }, [score])

  // Element data
  const elementData = {
    fire: { emoji: '🔥', name: 'Fire', traits: ['Passionate', 'Dynamic', 'Energetic'] },
    earth: { emoji: '🌍', name: 'Earth', traits: ['Stable', 'Grounded', 'Reliable'] },
    air: { emoji: '💨', name: 'Air', traits: ['Intellectual', 'Social', 'Adaptive'] },
    water: { emoji: '🌊', name: 'Water', traits: ['Intuitive', 'Emotional', 'Deep'] },
  }

  const userData = elementData[userElement] || elementData.fire
  const partnerData = elementData[partnerElement] || elementData.water

  // Harmony description
  const getHarmonyText = (s) => {
    if (s >= 90) return 'Perfect Harmony — Your auras merge into one cosmic light'
    if (s >= 75) return 'Strong Resonance — Your energies amplify each other beautifully'
    if (s >= 60) return 'Balanced Exchange — Your auras complement and teach each other'
    if (s >= 45) return 'Dynamic Tension — Your energies challenge and grow each other'
    return 'Transformative Friction — A powerful karmic lesson in energy mastery'
  }

  return (
    <motion.div
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.06] p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl">🌈</span>
          <h3 className="font-display text-lg font-semibold text-white">Aura Compatibility</h3>
        </div>

        {/* ─── AURA VISUALIZATION ─── */}
        <div className="relative h-48 flex items-center justify-center mb-6 overflow-hidden">
          {/* User Aura */}
          <div
            className="absolute"
            style={{
              left: `calc(50% - ${overlapDistance}px)`,
              transform: 'translateX(-50%)',
            }}
          >
            {auraLayers.user.map((layer, i) => (
              <motion.div
                key={`user-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: layer.radius * 2,
                  height: layer.radius * 2,
                  backgroundColor: userColor,
                  opacity: layer.opacity,
                  filter: `blur(${layer.blur}px)`,
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [layer.opacity, layer.opacity * 1.3, layer.opacity],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* User core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), ${userColor}60)`,
                border: `2px solid ${userColor}80`,
                boxShadow: `0 0 20px ${userColor}40`,
              }}
            >
              <span className="text-xl">{userData.emoji}</span>
            </motion.div>
          </div>

          {/* Partner Aura */}
          <div
            className="absolute"
            style={{
              left: `calc(50% + ${overlapDistance}px)`,
              transform: 'translateX(-50%)',
            }}
          >
            {auraLayers.partner.map((layer, i) => (
              <motion.div
                key={`partner-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: layer.radius * 2,
                  height: layer.radius * 2,
                  backgroundColor: partnerColor,
                  opacity: layer.opacity,
                  filter: `blur(${layer.blur}px)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [layer.opacity, layer.opacity * 1.4, layer.opacity],
                }}
                transition={{
                  duration: 3.5 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4 + 0.5,
                }}
              />
            ))}

            {/* Partner core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center z-10"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), ${partnerColor}60)`,
                border: `2px solid ${partnerColor}80`,
                boxShadow: `0 0 20px ${partnerColor}40`,
              }}
            >
              <span className="text-xl">{partnerData.emoji}</span>
            </motion.div>
          </div>

          {/* Overlap/Merge Zone - Heart */}
          {score >= 50 && (
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl compatibility-heart">
                {score >= 85 ? '💖' : score >= 70 ? '💜' : '💛'}
              </span>
            </motion.div>
          )}
        </div>

        {/* ─── ELEMENT COMPARISON ─── */}
        {showDetails && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* User Element */}
            <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xs text-white/30 font-body mb-1">Your Element</p>
              <p className="font-display text-sm font-medium" style={{ color: userColor }}>
                {userData.emoji} {userData.name}
              </p>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {userData.traits.map((trait) => (
                  <span
                    key={trait}
                    className="text-[10px] px-2 py-0.5 rounded-full font-body"
                    style={{
                      backgroundColor: `${userColor}15`,
                      color: `${userColor}cc`,
                      border: `1px solid ${userColor}20`,
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Partner Element */}
            <div className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <p className="text-xs text-white/30 font-body mb-1">Partner Element</p>
              <p className="font-display text-sm font-medium" style={{ color: partnerColor }}>
                {partnerData.emoji} {partnerData.name}
              </p>
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {partnerData.traits.map((trait) => (
                  <span
                    key={trait}
                    className="text-[10px] px-2 py-0.5 rounded-full font-body"
                    style={{
                      backgroundColor: `${partnerColor}15`,
                      color: `${partnerColor}cc`,
                      border: `1px solid ${partnerColor}20`,
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── HARMONY TEXT ─── */}
        <motion.p
          className="text-center text-white/40 text-sm font-body italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {getHarmonyText(score)}
        </motion.p>
      </div>
    </motion.div>
  )
})

AuraCompatibility.displayName = 'AuraCompatibility'

export default AuraCompatibility