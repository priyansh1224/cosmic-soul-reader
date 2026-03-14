// ═══════════════════════════════════════════════════════════════════
// 💕 COMPATIBILITY HOOK
// ═══════════════════════════════════════════════════════════════════

import { useMemo } from 'react'
import { ZODIAC_SIGNS } from '@data/zodiacSigns'
import { ELEMENT_COMPATIBILITY, LOVE_LANGUAGES, RELATIONSHIP_ADVICE } from '@data/compatibility'

const useCompatibility = (signId, partnerSignId) => {
  const compatibility = useMemo(() => {
    if (!signId) return null

    const userSign = ZODIAC_SIGNS[signId]
    if (!userSign) return null

    const userElement = userSign.elementType
    const userLoveLanguage = LOVE_LANGUAGES[signId]
    const userAdvice = RELATIONSHIP_ADVICE[userElement]

    // If no partner, return general compatibility info
    if (!partnerSignId) {
      return {
        userSign,
        userElement,
        userLoveLanguage,
        advice: userAdvice,
        bestMatches: userSign.compatibility.best.map((name) => {
          const id = name.toLowerCase()
          return {
            id,
            ...ZODIAC_SIGNS[id],
            score: userSign.compatibilityDetails?.[name]?.score || 80,
            description: userSign.compatibilityDetails?.[name]?.description || '',
          }
        }),
        challengingMatches: userSign.compatibility.challenging.map((name) => {
          const id = name.toLowerCase()
          return {
            id,
            ...ZODIAC_SIGNS[id],
            score: userSign.compatibilityDetails?.[name]?.score || 45,
            description: userSign.compatibilityDetails?.[name]?.description || '',
          }
        }),
      }
    }

    // With partner
    const partnerSign = ZODIAC_SIGNS[partnerSignId]
    if (!partnerSign) return null

    const partnerElement = partnerSign.elementType
    const partnerLoveLanguage = LOVE_LANGUAGES[partnerSignId]
    const elementCompat = ELEMENT_COMPATIBILITY[userElement]?.[partnerElement]

    const specificCompat = userSign.compatibilityDetails?.[partnerSign.name]

    // Calculate overall score
    const baseScore = specificCompat?.score || elementCompat?.score || 60

    // Love language compatibility bonus
    const loveLanguageMatch =
      userLoveLanguage?.primary === partnerLoveLanguage?.primary ? 10 :
      userLoveLanguage?.primary === partnerLoveLanguage?.secondary ? 5 :
      userLoveLanguage?.secondary === partnerLoveLanguage?.primary ? 5 : 0

    const overallScore = Math.min(99, baseScore + loveLanguageMatch)

    return {
      userSign,
      partnerSign,
      overallScore,
      elementCompat,
      specificCompat,
      userLoveLanguage,
      partnerLoveLanguage,
      loveLanguageMatch: loveLanguageMatch > 0,
      advice: [...(RELATIONSHIP_ADVICE[userElement] || []), ...(RELATIONSHIP_ADVICE[partnerElement] || [])].slice(0, 4),
      chemistry: getChemistryLevel(overallScore),
    }
  }, [signId, partnerSignId])

  return compatibility
}

function getChemistryLevel(score) {
  if (score >= 90) return { level: 'Cosmic Soulmates', emoji: '🌟💫', color: '#ffd54f', description: 'Your souls recognize each other across lifetimes' }
  if (score >= 80) return { level: 'Deep Connection', emoji: '💖✨', color: '#ec4899', description: 'A powerful bond with beautiful growth potential' }
  if (score >= 70) return { level: 'Harmonious', emoji: '🌈💜', color: '#a29bfe', description: 'Natural compatibility with room to grow together' }
  if (score >= 60) return { level: 'Intriguing', emoji: '🔮💫', color: '#74b9ff', description: 'An interesting match that requires conscious effort' }
  if (score >= 50) return { level: 'Challenging', emoji: '⚡🌙', color: '#ff8f00', description: 'Growth through challenge — not easy but potentially rewarding' }
  return { level: 'Karmic Lesson', emoji: '🌀🔥', color: '#ff6b6b', description: 'A relationship designed to teach profound soul lessons' }
}

export default useCompatibility