// ═══════════════════════════════════════════════════════════════════
// 🧮 COSMIC CALCULATIONS — VEDIC JYOTISH NAME-BASED RASHI SYSTEM
// ═══════════════════════════════════════════════════════════════════

import {
  ZODIAC_SIGNS,
  getRashiByName,
  getRashiByDate,
  getZodiacSign,
} from '@data/zodiacSigns'
import { LIFE_PATH_MEANINGS } from '@data/numerology'
import {
  LOVE_PREDICTIONS,
  CAREER_PREDICTIONS,
  HEALTH_PREDICTIONS,
  SPIRITUAL_PREDICTIONS,
  DAILY_HOROSCOPES,
} from '@data/predictions'
import { COSMIC_MESSAGES, SOUL_AFFIRMATIONS, COSMIC_WISDOM } from '@data/cosmicMessages'
import { CHAKRAS, getPrimaryChakra } from '@data/chakras'
import { getPastLives } from '@data/pastLives'
import { getRecommendations } from '@data/recommendations'
import { LOVE_LANGUAGES, ELEMENT_COMPATIBILITY, RELATIONSHIP_ADVICE } from '@data/compatibility'
import {
  createSeed,
  getSeededItem,
  getSeededItems,
  getSeededNumber,
  getSeededPercentage,
} from '@utils/seededRandom'

// ═══════════════════════════════════════════════════════════════════
// 🔤 PRIMARY: Get Rashi from first name's first letter/syllable
// Uses authentic Vedic Jyotish Nakshatra-Rashi name mapping
// ═══════════════════════════════════════════════════════════════════

/**
 * Determines the Vedic Rashi ID based on the first letter/syllable
 * of the person's first name (as per Jyotish Shastra).
 *
 * Falls back to date-of-birth method if no name match is found.
 *
 * @param {string} firstName - The person's first name
 * @param {number|string} [day] - Birth day (fallback)
 * @param {number|string} [month] - Birth month (fallback)
 * @returns {string|null} - The Vedic Rashi ID (e.g. 'mesha', 'vrishabha') or null
 */
export const getZodiacSignIdFromName = (firstName, day, month) => {
  // --- Step 1: Try Vedic name-based Rashi detection ---
  const rashiByName = getRashiByName(firstName)
  if (rashiByName) {
    return rashiByName.id // e.g. 'mesha', 'karka', etc.
  }

  // --- Step 2: Fallback to date-of-birth if name didn't match ---
  if (day && month) {
    const rashiByDate = getRashiByDate(day, month)
    if (rashiByDate) {
      return rashiByDate.id
    }
  }

  return null
}

/**
 * Determine zodiac sign from day and month (Western/date-based method)
 * Kept as utility — used as fallback inside getZodiacSignIdFromName
 */
export const getZodiacSignId = (day, month) => {
  const d = parseInt(day)
  const m = parseInt(month)

  if (!d || !m || d < 1 || d > 31 || m < 1 || m > 12) return null

  const signs = Object.values(ZODIAC_SIGNS)

  for (const sign of signs) {
    if (sign.startMonth === sign.endMonth) {
      if (m === sign.startMonth && d >= sign.startDay && d <= sign.endDay) {
        return sign.id
      }
    } else if (sign.startMonth > sign.endMonth) {
      // Handles Makara (Dec 22 – Jan 19)
      if (
        (m === sign.startMonth && d >= sign.startDay) ||
        (m === sign.endMonth && d <= sign.endDay)
      ) {
        return sign.id
      }
    } else {
      if (
        (m === sign.startMonth && d >= sign.startDay) ||
        (m === sign.endMonth && d <= sign.endDay)
      ) {
        return sign.id
      }
    }
  }

  return null
}

// ═══════════════════════════════════════════════════════════════════
// 🔢 NUMEROLOGY CALCULATIONS
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate Life Path Number (Numerology)
 */
export const calculateLifePathNumber = (day, month, year) => {
  const d = parseInt(day) || 1
  const m = parseInt(month) || 1
  const y = parseInt(year) || 2000

  const reduceToSingle = (num) => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = String(num)
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0)
    }
    return num
  }

  const dayReduced = reduceToSingle(d)
  const monthReduced = reduceToSingle(m)
  const yearReduced = reduceToSingle(y)

  return reduceToSingle(dayReduced + monthReduced + yearReduced)
}

/**
 * Calculate Soul Urge Number from name (vowels only)
 */
export const calculateSoulUrge = (name) => {
  const vowels = 'aeiou'
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '')
  let sum = 0

  for (const char of cleanName) {
    if (vowels.includes(char)) {
      sum += char.charCodeAt(0) - 96
    }
  }

  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = String(sum)
      .split('')
      .reduce((s, d) => s + parseInt(d), 0)
  }

  return sum
}

/**
 * Calculate Destiny Number from full name (all letters)
 */
export const calculateDestinyNumber = (fullName) => {
  const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '')
  let sum = 0

  for (const char of cleanName) {
    sum += char.charCodeAt(0) - 96
  }

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum)
      .split('')
      .reduce((s, d) => s + parseInt(d), 0)
  }

  return sum
}

// ═══════════════════════════════════════════════════════════════════
// 🌟 MAIN READING GENERATOR
// ═══════════════════════════════════════════════════════════════════

/**
 * Generate complete cosmic reading
 * PRIMARY: Rashi is determined by first name's first letter (Vedic method)
 * FALLBACK: If name doesn't match, uses date of birth
 */
export const generateReading = (formData) => {
  const {
    firstName,
    lastName,
    gender,
    day,
    month,
    year,
    birthTime,
    intention,
    mood,
    relationshipStatus,
    partnerSign,
  } = formData

  // ─────────────────────────────────────────────────────────────
  // 🔤 RASHI DETECTION: Name-first, date-fallback
  // ─────────────────────────────────────────────────────────────
  const signId = getZodiacSignIdFromName(firstName, day, month)
  if (!signId) return null

  const zodiacData = ZODIAC_SIGNS[signId]
  if (!zodiacData) return null

  // Determine which method was used (for UI display if needed)
  const rashiByName = getRashiByName(firstName)
  const rashiMethod = rashiByName ? 'name' : 'date'
  const rashiConfidence = rashiByName ? 'high' : 'medium'
  const matchedNameLetter = firstName
    ? firstName.trim().charAt(0).toUpperCase()
    : ''

  const seed = createSeed(day, month, year)
  const fullName = `${firstName} ${lastName}`.trim()

  // ─────────────────────────────────────────────────────────────
  // 🔢 NUMEROLOGY
  // ─────────────────────────────────────────────────────────────
  const lifePathNumber = calculateLifePathNumber(day, month, year)
  const soulUrge = calculateSoulUrge(firstName)
  const destinyNumber = calculateDestinyNumber(fullName)

  // Life path meaning
  const lifePathMeaning =
    LIFE_PATH_MEANINGS[lifePathNumber] ||
    LIFE_PATH_MEANINGS[lifePathNumber % 9 || 9]

  // ─────────────────────────────────────────────────────────────
  // 🔮 PREDICTIONS
  // ─────────────────────────────────────────────────────────────
  const lovePrediction = getSeededItem(LOVE_PREDICTIONS, seed)
  const careerPrediction = getSeededItem(CAREER_PREDICTIONS, seed + 1)
  const healthPrediction = getSeededItem(HEALTH_PREDICTIONS, seed + 2)
  const spiritualPrediction = getSeededItem(SPIRITUAL_PREDICTIONS, seed + 3)

  // Daily horoscope — changes daily
  const today = new Date()
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 86400000
  )
  const horoscope = getSeededItem(DAILY_HOROSCOPES, seed + dayOfYear)

  // ─────────────────────────────────────────────────────────────
  // ✨ COSMIC MESSAGES
  // ─────────────────────────────────────────────────────────────
  const cosmicMessage = getSeededItem(COSMIC_MESSAGES, seed + 10)
  const affirmation = getSeededItem(SOUL_AFFIRMATIONS, seed + 20)
  const wisdom = getSeededItem(COSMIC_WISDOM, seed + 30)

  // ─────────────────────────────────────────────────────────────
  // 🧘 CHAKRA
  // ─────────────────────────────────────────────────────────────
  const primaryChakra = getPrimaryChakra(signId)
  const chakraBalance = CHAKRAS.map((chakra, i) => ({
    ...chakra,
    level: getSeededPercentage(seed + i + 100),
  }))

  // ─────────────────────────────────────────────────────────────
  // 🔄 PAST LIVES & RECOMMENDATIONS
  // ─────────────────────────────────────────────────────────────
  const pastLives = getPastLives(signId)
  const recommendations = getRecommendations(zodiacData.elementType)

  // ─────────────────────────────────────────────────────────────
  // 💕 LOVE & COMPATIBILITY
  // ─────────────────────────────────────────────────────────────
  const loveLanguage = LOVE_LANGUAGES[signId]
  const elementCompat = ELEMENT_COMPATIBILITY[zodiacData.elementType]
  const relationAdvice = RELATIONSHIP_ADVICE[zodiacData.elementType]

  // Energy meter
  const energyLevel = getSeededPercentage(seed + 50)

  // Lucky number for today
  const luckyNumberToday = getSeededNumber(seed + dayOfYear, 1, 99)

  // ─────────────────────────────────────────────────────────────
  // 💑 PARTNER COMPATIBILITY (if provided)
  // ─────────────────────────────────────────────────────────────
  let partnerCompatibility = null
  if (partnerSign) {
    const partnerKey = partnerSign.toLowerCase()
    const partnerData = ZODIAC_SIGNS[partnerKey]
    if (partnerData) {
      const compatDetail =
        zodiacData.compatibilityDetails?.[partnerData.name]
      const elementCompatScore =
        elementCompat?.[partnerData.elementType]

      partnerCompatibility = {
        partnerSign: partnerData,
        score:
          compatDetail?.score || elementCompatScore?.score || 65,
        description:
          compatDetail?.description ||
          elementCompatScore?.description ||
          'A unique cosmic connection with its own special energy.',
        loveLanguageMatch: LOVE_LANGUAGES[partnerKey],
        elementInteraction: elementCompatScore,
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 📦 RETURN COMPLETE READING
  // ─────────────────────────────────────────────────────────────
  return {
    // User Info
    user: {
      firstName,
      lastName,
      fullName,
      gender,
      birthDate: `${day}/${month}/${year}`,
      birthTime: birthTime || 'Not provided',
      intention,
      mood,
      relationshipStatus,
    },

    // Zodiac — Vedic Rashi
    zodiac: zodiacData,
    signId,
    rashiDetection: {
      method: rashiMethod, // 'name' or 'date'
      confidence: rashiConfidence, // 'high' or 'medium'
      matchedLetter: matchedNameLetter,
      nameLetters: zodiacData.nameLetters,
      nameLettersDetailed: zodiacData.nameLettersDetailed,
    },

    // Numerology
    numerology: {
      lifePathNumber,
      lifePathMeaning,
      soulUrge,
      destinyNumber,
    },

    // Predictions
    predictions: {
      love: lovePrediction,
      career: careerPrediction,
      health: healthPrediction,
      spiritual: spiritualPrediction,
    },

    // Daily
    horoscope,
    energyLevel,
    luckyNumberToday,

    // Cosmic Messages
    cosmicMessage,
    affirmation,
    wisdom,

    // Spiritual
    chakra: {
      primary: primaryChakra,
      balance: chakraBalance,
    },
    pastLives,

    // Recommendations
    recommendations,

    // Relationship
    loveLanguage,
    partnerCompatibility,
    elementCompatibility: elementCompat,
    relationshipAdvice: relationAdvice,

    // Meta
    generatedAt: new Date().toISOString(),
    seed,
  }
}