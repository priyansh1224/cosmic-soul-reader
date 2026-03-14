// ═══════════════════════════════════════════════════════════════════
// 🗓️ DESTINY TIMELINE - Future Relationship Milestones
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { getSeededItem, getSeededNumber, createSeed } from '@utils/seededRandom'

const DestinyTimeline = memo(({
  signId = 'aries',
  intention = 'love',
  birthDay = 1,
  birthMonth = 1,
  birthYear = 2000,
  className = '',
}) => {
  const seed = createSeed(birthDay, birthMonth, birthYear)

  // Generate timeline milestones
  const milestones = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const milestonePool = {
      love: [
        { title: 'Heart Opening', description: 'A significant emotional barrier dissolves, allowing deeper love', icon: '💖' },
        { title: 'Fateful Encounter', description: 'A destined meeting with someone who changes your perspective on love', icon: '✨' },
        { title: 'Vulnerability Breakthrough', description: 'You find the courage to show your true self to someone special', icon: '🦋' },
        { title: 'Soul Recognition', description: 'A profound moment of recognizing a kindred spirit', icon: '🔮' },
        { title: 'Love Declaration', description: 'Words left unspoken finally find their voice', icon: '💌' },
        { title: 'Deep Commitment', description: 'A relationship reaches a new level of trust and devotion', icon: '💍' },
        { title: 'Healing Together', description: 'Old wounds heal through the power of shared love', icon: '🌿' },
        { title: 'Romantic Adventure', description: 'An unexpected journey that deepens your bond', icon: '🌅' },
      ],
      career: [
        { title: 'Breakthrough Moment', description: 'A career-defining opportunity appears from an unexpected source', icon: '🚀' },
        { title: 'Mentor Arrival', description: 'A wise guide enters your professional life with transformative advice', icon: '🧙' },
        { title: 'Creative Ignition', description: 'An idea that has been dormant suddenly catches fire', icon: '💡' },
        { title: 'Recognition Wave', description: 'Your talents are publicly acknowledged in a meaningful way', icon: '🏆' },
        { title: 'Financial Shift', description: 'A significant positive change in your financial flow', icon: '💎' },
        { title: 'Purpose Clarity', description: 'Your true calling becomes crystal clear', icon: '🎯' },
      ],
      spiritual: [
        { title: 'Awakening Pulse', description: 'A sudden spiritual insight changes how you see everything', icon: '🌟' },
        { title: 'Sacred Teacher', description: 'A spiritual guide or teaching finds you at the perfect moment', icon: '📿' },
        { title: 'Inner Peace Wave', description: 'A period of profound inner tranquility and acceptance', icon: '🕊️' },
        { title: 'Psychic Opening', description: 'Your intuitive abilities significantly deepen', icon: '👁️' },
        { title: 'Karmic Release', description: 'An old pattern finally dissolves, freeing tremendous energy', icon: '🔓' },
        { title: 'Divine Download', description: 'Cosmic wisdom flows through you with unprecedented clarity', icon: '⚡' },
      ],
      health: [
        { title: 'Energy Revival', description: 'A new vitality surges through your body and spirit', icon: '⚡' },
        { title: 'Healing Discovery', description: 'You discover a practice or remedy that transforms your wellbeing', icon: '🌿' },
        { title: 'Balance Point', description: 'Mind, body, and spirit align in beautiful harmony', icon: '☯️' },
        { title: 'Strength Surge', description: 'Physical and emotional resilience reaches a new peak', icon: '💪' },
      ],
    }

    const pool = milestonePool[intention] || milestonePool.love

    return Array.from({ length: 5 }, (_, i) => {
      const monthsAhead = getSeededNumber(seed + i * 7, 1, 6) * (i + 1)
      const futureDate = new Date(currentYear, currentMonth + monthsAhead, 1)
      const milestone = getSeededItem(pool, seed + i * 13)

      return {
        ...milestone,
        id: i,
        date: futureDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        monthsAway: monthsAhead,
        probability: getSeededNumber(seed + i * 19, 65, 95),
      }
    })
  }, [signId, intention, seed])

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
          <span className="text-xl">🗓️</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Destiny Timeline</h3>
            <p className="text-white/30 text-xs font-body">Your cosmic milestones ahead</p>
          </div>
        </div>

        {/* ─── TIMELINE ─── */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-4 bottom-4 w-[2px]">
            <motion.div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(180deg, #7c3aed 0%, #ec4899 30%, #06b6d4 60%, #ffd54f 100%)',
                transformOrigin: 'top'
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>

          {/* Milestone entries */}
          <div className="space-y-5">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.id}
                className="relative pl-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-[12px] top-3 w-[22px] h-[22px] rounded-full flex items-center justify-center z-10"
                  style={{
                    background: 'rgba(10,10,26,0.8)',
                    border: `2px solid ${['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5]}`,
                  }}
                  whileInView={{
                    boxShadow: [
                      `0 0 0 0 ${['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5]}00`,
                      `0 0 10px 4px ${['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5]}30`,
                      `0 0 0 0 ${['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5]}00`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                >
                  <span className="text-[10px]">{milestone.icon}</span>
                </motion.div>

                {/* Content */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors duration-300 group">
                  {/* Date badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-tech"
                      style={{
                        backgroundColor: `${['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5]}10`,
                        color: ['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5],
                        border: `1px solid ${['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5]}20`,
                      }}
                    >
                      {milestone.date}
                    </span>
                    <span className="text-[10px] text-white/20 font-body">
                      ~{milestone.monthsAway} months away
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-sm font-semibold text-white/80 mb-1 group-hover:text-white transition-colors">
                    {milestone.title}
                  </h4>

                  {/* Description */}
                  <p className="text-white/35 text-xs font-body leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Probability */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${milestone.probability}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        style={{
                          backgroundColor: ['#7c3aed', '#ec4899', '#06b6d4', '#ffd54f', '#55efc4'][i % 5],
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-tech text-white/20">
                      {milestone.probability}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── DISCLAIMER ─── */}
        <motion.p
          className="mt-6 text-center text-white/15 text-[10px] font-body italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          ✨ The cosmos guides, but your free will shapes the final path ✨
        </motion.p>
      </div>
    </motion.div>
  )
})

DestinyTimeline.displayName = 'DestinyTimeline'

export default DestinyTimeline