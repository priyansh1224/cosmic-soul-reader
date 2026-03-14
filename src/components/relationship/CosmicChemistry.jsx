// ═══════════════════════════════════════════════════════════════════
// ⚗️ COSMIC CHEMISTRY - Element Reaction Visualization
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn, getElementColor } from '@utils/helpers'
import { ELEMENT_COMPATIBILITY } from '@data/compatibility'

const CosmicChemistry = memo(({
  userElement = 'fire',
  partnerElement = 'water',
  className = '',
}) => {
  const compatibility = ELEMENT_COMPATIBILITY[userElement]?.[partnerElement] || {
    score: 60,
    description: 'A unique cosmic interaction.',
  }

  const userColor = getElementColor(userElement)
  const partnerColor = getElementColor(partnerElement)

  // Reaction types based on element combinations
  const reactions = useMemo(() => {
    const combos = {
      'fire-fire': { type: 'Inferno', emoji: '🌋', effect: 'Explosive double fire creates overwhelming passion', intensity: 'extreme' },
      'fire-earth': { type: 'Forge', emoji: '⚒️', effect: 'Fire hardens earth into unbreakable resolve', intensity: 'moderate' },
      'fire-air': { type: 'Wildfire', emoji: '🔥', effect: 'Air fans fire into a magnificent blaze', intensity: 'high' },
      'fire-water': { type: 'Steam', emoji: '♨️', effect: 'Opposing forces create transformative steam', intensity: 'volatile' },
      'earth-earth': { type: 'Mountain', emoji: '🏔️', effect: 'Two earths build an unshakable mountain', intensity: 'stable' },
      'earth-air': { type: 'Sandstorm', emoji: '🌪️', effect: 'Air erodes earth but reveals hidden gems', intensity: 'moderate' },
      'earth-water': { type: 'Garden', emoji: '🌺', effect: 'Water nourishes earth into blooming abundance', intensity: 'harmonious' },
      'air-air': { type: 'Tornado', emoji: '🌀', effect: 'Two winds create a powerful intellectual vortex', intensity: 'dynamic' },
      'air-water': { type: 'Rain', emoji: '🌧️', effect: 'Air carries water to new emotional heights', intensity: 'moderate' },
      'water-water': { type: 'Ocean', emoji: '🌊', effect: 'Two waters merge into an infinite emotional ocean', intensity: 'deep' },
    }

    const key1 = `${userElement}-${partnerElement}`
    const key2 = `${partnerElement}-${userElement}`

    return combos[key1] || combos[key2] || {
      type: 'Cosmic Blend',
      emoji: '✨',
      effect: 'A unique alchemical reaction never before seen in the cosmos',
      intensity: 'unique',
    }
  }, [userElement, partnerElement])

  // Intensity configurations
  const intensityConfigs = {
    extreme: { color: '#ef4444', barWidth: 95, label: 'Extreme' },
    volatile: { color: '#f59e0b', barWidth: 80, label: 'Volatile' },
    high: { color: '#ec4899', barWidth: 85, label: 'High' },
    dynamic: { color: '#8b5cf6', barWidth: 75, label: 'Dynamic' },
    moderate: { color: '#06b6d4', barWidth: 60, label: 'Moderate' },
    harmonious: { color: '#10b981', barWidth: 70, label: 'Harmonious' },
    stable: { color: '#6366f1', barWidth: 55, label: 'Stable' },
    deep: { color: '#3b82f6', barWidth: 90, label: 'Deep' },
    unique: { color: '#ffd54f', barWidth: 65, label: 'Unique' },
  }

  const intensityConfig = intensityConfigs[reactions.intensity] || intensityConfigs.moderate

  // Chemistry metrics
  const metrics = [
    { label: 'Passion', value: Math.min(99, compatibility.score + 10), color: '#ec4899' },
    { label: 'Stability', value: Math.min(99, 100 - Math.abs(compatibility.score - 70)), color: '#10b981' },
    { label: 'Growth', value: Math.min(99, compatibility.score + 5), color: '#8b5cf6' },
    { label: 'Understanding', value: Math.min(99, compatibility.score - 5 > 0 ? compatibility.score - 5 : 50), color: '#06b6d4' },
  ]

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
          <span className="text-xl">⚗️</span>
          <h3 className="font-display text-lg font-semibold text-white">Cosmic Chemistry</h3>
        </div>

        {/* ─── REACTION DISPLAY ─── */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* User element */}
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `${userColor}20`,
              border: `2px solid ${userColor}40`,
            }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-2xl">
              {{ fire: '🔥', earth: '🌍', air: '💨', water: '🌊' }[userElement]}
            </span>
          </motion.div>

          {/* Reaction arrow */}
          <motion.div
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">{reactions.emoji}</span>
            <span className="text-[10px] text-white/30 font-tech mt-1">
              {reactions.type}
            </span>
          </motion.div>

          {/* Partner element */}
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `${partnerColor}20`,
              border: `2px solid ${partnerColor}40`,
            }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <span className="text-2xl">
              {{ fire: '🔥', earth: '🌍', air: '💨', water: '🌊' }[partnerElement]}
            </span>
          </motion.div>
        </div>

        {/* Reaction description */}
        <motion.p
          className="text-center text-white/50 text-sm font-body mb-6 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          &ldquo;{reactions.effect}&rdquo;
        </motion.p>

        {/* ─── INTENSITY METER ─── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-body text-white/30">Reaction Intensity</span>
            <span
              className="text-xs font-tech font-bold"
              style={{ color: intensityConfig.color }}
            >
              {intensityConfig.label}
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: `${intensityConfig.barWidth}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              style={{
                background: `linear-gradient(90deg, ${userColor}, ${intensityConfig.color}, ${partnerColor})`,
              }}
            />
          </div>
        </div>

        {/* ─── CHEMISTRY METRICS ─── */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-body text-white/40">{metric.label}</span>
                <span className="text-xs font-tech" style={{ color: metric.color }}>
                  {metric.value}%
                </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  style={{ backgroundColor: metric.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
})

CosmicChemistry.displayName = 'CosmicChemistry'

export default CosmicChemistry