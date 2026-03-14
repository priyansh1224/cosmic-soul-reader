// ═══════════════════════════════════════════════════════════════════
// ⚖️ PARTNER COMPARISON - Side by Side Zodiac Comparison
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn, getElementColor } from '@utils/helpers'

const PartnerComparison = memo(({
  userSign = null,
  partnerSign = null,
  score = 70,
  className = '',
}) => {
  if (!userSign || !partnerSign) return null

  const userColor = getElementColor(userSign.elementType)
  const partnerColor = getElementColor(partnerSign.elementType)

  // Comparison attributes
  const attributes = [
    {
      label: 'Element',
      user: `${userSign.elementIcon} ${userSign.element}`,
      partner: `${partnerSign.elementIcon} ${partnerSign.element}`,
      match: userSign.elementType === partnerSign.elementType,
    },
    {
      label: 'Quality',
      user: userSign.quality,
      partner: partnerSign.quality,
      match: userSign.quality === partnerSign.quality,
    },
    {
      label: 'Ruling Planet',
      user: `${userSign.rulingPlanetSymbol} ${userSign.rulingPlanet}`,
      partner: `${partnerSign.rulingPlanetSymbol} ${partnerSign.rulingPlanet}`,
      match: userSign.rulingPlanet === partnerSign.rulingPlanet,
    },
    {
      label: 'Polarity',
      user: userSign.polarity?.split(' ')[0],
      partner: partnerSign.polarity?.split(' ')[0],
      match: userSign.polarity === partnerSign.polarity,
    },
    {
      label: 'Love Style',
      user: userSign.loveStyle?.substring(0, 50) + '...',
      partner: partnerSign.loveStyle?.substring(0, 50) + '...',
      match: false,
    },
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
          <span className="text-xl">⚖️</span>
          <h3 className="font-display text-lg font-semibold text-white">Cosmic Comparison</h3>
        </div>

        {/* ─── COMPARISON HEADER ─── */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {/* User */}
          <motion.div
            className="text-center p-3 rounded-xl"
            style={{
              background: `${userColor}10`,
              border: `1px solid ${userColor}20`,
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-3xl block mb-1">{userSign.symbol}</span>
            <p className="font-display text-sm font-medium" style={{ color: userColor }}>
              {userSign.name}
            </p>
            <p className="text-[10px] text-white/20 font-body">{userSign.dates}</p>
          </motion.div>

          {/* VS */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <span className="text-white/40 font-display text-xs font-bold">VS</span>
            </motion.div>
            <motion.p
              className="mt-2 font-tech text-sm font-bold"
              style={{
                color: score >= 80 ? '#2ecc71' : score >= 60 ? '#ffd54f' : '#ff6b6b',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {score}%
            </motion.p>
          </div>

          {/* Partner */}
          <motion.div
            className="text-center p-3 rounded-xl"
            style={{
              background: `${partnerColor}10`,
              border: `1px solid ${partnerColor}20`,
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-3xl block mb-1">{partnerSign.symbol}</span>
            <p className="font-display text-sm font-medium" style={{ color: partnerColor }}>
              {partnerSign.name}
            </p>
            <p className="text-[10px] text-white/20 font-body">{partnerSign.dates}</p>
          </motion.div>
        </div>

        {/* ─── ATTRIBUTE COMPARISON ─── */}
        <div className="space-y-2">
          {attributes.map((attr, i) => (
            <motion.div
              key={attr.label}
              className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center p-2.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              {/* User value */}
              <div className="text-right">
                <p className="text-white/60 text-xs font-body truncate">{attr.user}</p>
              </div>

              {/* Label */}
              <div className="flex flex-col items-center px-2">
                <span className="text-[10px] text-white/25 font-body whitespace-nowrap">
                  {attr.label}
                </span>
                {attr.match && (
                  <motion.span
                    className="text-emerald-400 text-[8px]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                  >
                    ✦ match
                  </motion.span>
                )}
              </div>

              {/* Partner value */}
              <div>
                <p className="text-white/60 text-xs font-body truncate">{attr.partner}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── SHARED STRENGTHS ─── */}
        <motion.div
          className="mt-5 pt-4 border-t border-white/[0.04]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-white/25 text-xs font-body mb-2 text-center">
            Shared Strengths
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {userSign.strengths
              .filter((s) => partnerSign.strengths.includes(s))
              .slice(0, 4)
              .map((strength) => (
                <span
                  key={strength}
                  className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-400/70 font-body"
                >
                  ✦ {strength}
                </span>
              ))}
            {userSign.strengths.filter((s) => partnerSign.strengths.includes(s)).length === 0 && (
              <span className="text-white/20 text-xs font-body italic">
                Your unique differences are your greatest strength together
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
})

PartnerComparison.displayName = 'PartnerComparison'

export default PartnerComparison