// ═══════════════════════════════════════════════════════════════════
// 💕 SOUL COMPATIBILITY CARD
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LiquidGlassCard } from '@components/ui'
import {
  SoulBondVisualizer,
  AuraCompatibility,
  CosmicChemistry,
  LoveLanguageDecoder,
  KarmicConnection,
  DestinyTimeline,
  PartnerComparison,
} from '@components/relationship'
import { ZODIAC_SIGNS } from '@data/zodiacSigns'
import { getScoreColor } from '@utils/helpers'

const SoulCompatibilityCard = memo(({ reading, delay = 0 }) => {
  const { zodiac, partnerCompatibility, loveLanguage } = reading

  return (
    // ══════════════════════════════════════════════
    // ONLY CHANGE: added disableTilt + maxTilt={0}
    // This stops the card from flipping/shrinking
    // ══════════════════════════════════════════════
    <LiquidGlassCard
      glowColor="pink"
      entryDelay={delay}
      className="p-8"
      disableTilt
      maxTilt={0}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">💕</span>
          <h3 className="font-display text-xl font-semibold text-white">Soul Compatibility</h3>
        </div>

        {/* Partner Compatibility (if provided) */}
        {partnerCompatibility && (
          <motion.div
            className="mb-8 p-5 rounded-2xl bg-white/[0.03] border border-cosmic-pink-500/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{zodiac.symbol}</span>
                <motion.span
                  className="text-cosmic-pink-400 text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
                <span className="text-3xl">{partnerCompatibility.partnerSign.symbol}</span>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-tech font-bold ${getScoreColor(partnerCompatibility.score).class}`}>
                  {partnerCompatibility.score}%
                </p>
                <p className="text-xs text-white/30 font-body">
                  {getScoreColor(partnerCompatibility.score).label}
                </p>
              </div>
            </div>
            <p className="text-white/50 font-body text-sm">
              {partnerCompatibility.description}
            </p>
          </motion.div>
        )}

        {/* Best Matches & Challenging */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Best Matches */}
          <div>
            <h4 className="font-display text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
              <span>💚</span> Best Matches
            </h4>
            <div className="space-y-2">
              {zodiac.compatibility.best.map((signName, i) => {
                const sign = ZODIAC_SIGNS[signName.toLowerCase()]
                const score = zodiac.compatibilityDetails?.[signName]?.score || 85
                return sign ? (
                  <motion.div
                    key={signName}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.3 + i * 0.08 }}
                  >
                    <span className="text-xl">{sign.symbol}</span>
                    <span className="text-sm font-body text-white/70 flex-1">{signName}</span>
                    <span className="text-xs font-tech text-emerald-400">{score}%</span>
                  </motion.div>
                ) : null
              })}
            </div>
          </div>

          {/* Challenging */}
          <div>
            <h4 className="font-display text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <span>⚡</span> Growth Partners
            </h4>
            <div className="space-y-2">
              {zodiac.compatibility.challenging.map((signName, i) => {
                const sign = ZODIAC_SIGNS[signName.toLowerCase()]
                const score = zodiac.compatibilityDetails?.[signName]?.score || 45
                return sign ? (
                  <motion.div
                    key={signName}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + 0.3 + i * 0.08 }}
                  >
                    <span className="text-xl">{sign.symbol}</span>
                    <span className="text-sm font-body text-white/70 flex-1">{signName}</span>
                    <span className="text-xs font-tech text-amber-400">{score}%</span>
                  </motion.div>
                ) : null
              })}
            </div>
          </div>
        </div>

        {/* Love Language */}
        {loveLanguage && (
          <motion.div
            className="mt-6 pt-4 border-t border-white/[0.05] text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.6 }}
          >
            <p className="text-white/30 text-xs font-body mb-1">Your Love Language</p>
            <p className="text-cosmic-pink-400 font-display text-base font-medium">
              {loveLanguage.primary}
            </p>
            <p className="text-white/20 text-xs font-body mt-0.5">
              Secondary: {loveLanguage.secondary}
            </p>
          </motion.div>
        )}

        {/* ─── RELATIONSHIP DEEP DIVE ─── */}
        {partnerCompatibility && (
          <div className="space-y-6 mt-8">
            <SoulBondVisualizer
              userSign={zodiac}
              partnerSign={partnerCompatibility.partnerSign}
              bondStrength={partnerCompatibility.score}
              bondType={partnerCompatibility.score >= 85 ? 'soulmate' : 'romantic'}
            />
            <AuraCompatibility
              userElement={zodiac.elementType}
              partnerElement={partnerCompatibility.partnerSign.elementType}
              score={partnerCompatibility.score}
            />
            <CosmicChemistry
              userElement={zodiac.elementType}
              partnerElement={partnerCompatibility.partnerSign.elementType}
            />
            <PartnerComparison
              userSign={zodiac}
              partnerSign={partnerCompatibility.partnerSign}
              score={partnerCompatibility.score}
            />
          </div>
        )}

        <LoveLanguageDecoder
          userSignId={reading.signId}
          partnerSignId={reading.user?.partnerSign || null}
          className="mt-6"
        />
        <KarmicConnection signId={reading.signId} className="mt-6" />
        <DestinyTimeline
          signId={reading.signId}
          intention={reading.user?.intention}
          birthDay={parseInt(reading.user?.birthDate?.split('/')[0]) || 1}
          birthMonth={parseInt(reading.user?.birthDate?.split('/')[1]) || 1}
          birthYear={parseInt(reading.user?.birthDate?.split('/')[2]) || 2000}
          className="mt-6"
        />
      </div>
    </LiquidGlassCard>
  )
})

SoulCompatibilityCard.displayName = 'SoulCompatibilityCard'

export default SoulCompatibilityCard