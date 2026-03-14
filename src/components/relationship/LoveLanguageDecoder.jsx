// ═══════════════════════════════════════════════════════════════════
// 💬 LOVE LANGUAGE DECODER - Communication Style Analysis
// ═══════════════════════════════════════════════════════════════════

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { LOVE_LANGUAGES } from '@data/compatibility'

const LoveLanguageDecoder = memo(({
  userSignId = 'aries',
  partnerSignId = null,
  className = '',
}) => {
  const userLanguage = LOVE_LANGUAGES[userSignId]
  const partnerLanguage = partnerSignId ? LOVE_LANGUAGES[partnerSignId] : null

  // Love language details
  const languageDetails = {
    'Physical Touch': {
      emoji: '🤗',
      color: '#ec4899',
      description: 'Expressed through hugs, kisses, holding hands, and physical closeness',
      tips: ['Initiate physical affection', 'Sit close together', 'Offer massages', 'Hold hands in public'],
    },
    'Words of Affirmation': {
      emoji: '💬',
      color: '#8b5cf6',
      description: 'Expressed through verbal compliments, encouragement, and love notes',
      tips: ['Say "I love you" often', 'Leave sweet notes', 'Compliment sincerely', 'Express gratitude'],
    },
    'Quality Time': {
      emoji: '⏰',
      color: '#06b6d4',
      description: 'Expressed through undivided attention and shared experiences',
      tips: ['Plan date nights', 'Put phones away', 'Take walks together', 'Cook together'],
    },
    'Acts of Service': {
      emoji: '🛠️',
      color: '#10b981',
      description: 'Expressed through helpful actions that ease your partner\'s life',
      tips: ['Help with chores', 'Make breakfast', 'Run errands', 'Fix things around home'],
    },
    'Gifts': {
      emoji: '🎁',
      color: '#f59e0b',
      description: 'Expressed through thoughtful presents and visual symbols of love',
      tips: ['Remember special dates', 'Give small surprises', 'Choose meaningful gifts', 'Create handmade gifts'],
    },
  }

  const primaryDetail = languageDetails[userLanguage?.primary] || languageDetails['Quality Time']
  const secondaryDetail = languageDetails[userLanguage?.secondary] || languageDetails['Words of Affirmation']

  // Check compatibility of love languages
  const languageMatch = useMemo(() => {
    if (!partnerLanguage) return null

    const isDirectMatch = userLanguage?.primary === partnerLanguage?.primary
    const isCrossMatch = userLanguage?.primary === partnerLanguage?.secondary ||
                         userLanguage?.secondary === partnerLanguage?.primary
    const noMatch = !isDirectMatch && !isCrossMatch

    if (isDirectMatch) return {
      level: 'Perfect Match',
      emoji: '💖',
      color: '#ec4899',
      description: 'You speak the same love language! Communication flows naturally.',
      score: 95,
    }
    if (isCrossMatch) return {
      level: 'Good Compatibility',
      emoji: '💜',
      color: '#8b5cf6',
      description: 'Your languages overlap — with small effort, you understand each other deeply.',
      score: 75,
    }
    return {
      level: 'Learning Opportunity',
      emoji: '📚',
      color: '#f59e0b',
      description: 'Different languages mean you\'ll need to learn each other\'s expressions of love.',
      score: 55,
    }
  }, [userLanguage, partnerLanguage])

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
          <span className="text-xl">💬</span>
          <h3 className="font-display text-lg font-semibold text-white">Love Language Decoder</h3>
        </div>

        {/* ─── PRIMARY LOVE LANGUAGE ─── */}
        <motion.div
          className="p-5 rounded-2xl mb-4 relative overflow-hidden"
          style={{
            background: `${primaryDetail.color}08`,
            border: `1px solid ${primaryDetail.color}20`,
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl"
            style={{ backgroundColor: primaryDetail.color }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-white/30 font-body tracking-wide uppercase">Primary</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {primaryDetail.emoji}
              </motion.span>
              <h4
                className="font-display text-xl font-semibold"
                style={{ color: primaryDetail.color }}
              >
                {userLanguage?.primary}
              </h4>
            </div>
            <p className="text-white/40 text-sm font-body mb-3">
              {primaryDetail.description}
            </p>

            {/* Tips */}
            <div className="flex flex-wrap gap-1.5">
              {primaryDetail.tips.map((tip, i) => (
                <motion.span
                  key={tip}
                  className="text-[11px] px-2.5 py-1 rounded-full font-body"
                  style={{
                    backgroundColor: `${primaryDetail.color}10`,
                    color: `${primaryDetail.color}bb`,
                    border: `1px solid ${primaryDetail.color}15`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  {tip}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── SECONDARY LOVE LANGUAGE ─── */}
        <motion.div
          className="p-4 rounded-xl mb-4"
          style={{
            background: `${secondaryDetail.color}05`,
            border: `1px solid ${secondaryDetail.color}10`,
          }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{secondaryDetail.emoji}</span>
            <div>
              <span className="text-[10px] text-white/20 font-body tracking-wide uppercase block">
                Secondary
              </span>
              <span
                className="font-display text-sm font-medium"
                style={{ color: secondaryDetail.color }}
              >
                {userLanguage?.secondary}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── PARTNER COMPARISON ─── */}
        {partnerLanguage && languageMatch && (
          <motion.div
            className="mt-4 pt-4 border-t border-white/[0.05]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{languageMatch.emoji}</span>
                <span
                  className="font-display text-sm font-semibold"
                  style={{ color: languageMatch.color }}
                >
                  {languageMatch.level}
                </span>
              </div>
              <span
                className="font-tech text-sm font-bold"
                style={{ color: languageMatch.color }}
              >
                {languageMatch.score}%
              </span>
            </div>

            <p className="text-white/40 text-sm font-body mb-3">
              {languageMatch.description}
            </p>

            {/* Partner's language */}
            <div className="flex items-center gap-2 text-white/30 text-xs font-body">
              <span>Partner speaks:</span>
              <span className="text-white/50 font-medium">
                {partnerLanguage.primary} & {partnerLanguage.secondary}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
})

LoveLanguageDecoder.displayName = 'LoveLanguageDecoder'

export default LoveLanguageDecoder