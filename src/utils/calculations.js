// ═══════════════════════════════════════════════════════════════════
// 🧮 COSMIC CALCULATIONS
// ═══════════════════════════════════════════════════════════════════

import { ZODIAC_SIGNS } from '@data/zodiacSigns'
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

/**
 * Determine zodiac sign from day and month
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
      // Handles Capricorn (Dec-Jan)
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
 * Calculate Soul Urge Number from name
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
 * Calculate Destiny Number from full name
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

/**
 * Generate complete cosmic reading
 */
export const generateReading = (formData) => {
  const { firstName, lastName, gender, day, month, year, birthTime, intention, mood, relationshipStatus, partnerSign } = formData

  const signId = getZodiacSignId(day, month)
  if (!signId) return null

  const zodiacData = ZODIAC_SIGNS[signId]
  const seed = createSeed(day, month, year)
  const fullName = `${firstName} ${lastName}`.trim()

  // Numerology
  const lifePathNumber = calculateLifePathNumber(day, month, year)
  const soulUrge = calculateSoulUrge(firstName)
  const destinyNumber = calculateDestinyNumber(fullName)

  // Life path meaning
  const lifePathMeaning = LIFE_PATH_MEANINGS[lifePathNumber] || LIFE_PATH_MEANINGS[lifePathNumber % 9 || 9]

  // Predictions
  const lovePrediction = getSeededItem(LOVE_PREDICTIONS, seed)
  const careerPrediction = getSeededItem(CAREER_PREDICTIONS, seed + 1)
  const healthPrediction = getSeededItem(HEALTH_PREDICTIONS, seed + 2)
  const spiritualPrediction = getSeededItem(SPIRITUAL_PREDICTIONS, seed + 3)

  // Daily horoscope - based on current date for daily variation
  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)
  const horoscope = getSeededItem(DAILY_HOROSCOPES, seed + dayOfYear)

  // Cosmic message
  const cosmicMessage = getSeededItem(COSMIC_MESSAGES, seed + 10)
  const affirmation = getSeededItem(SOUL_AFFIRMATIONS, seed + 20)
  const wisdom = getSeededItem(COSMIC_WISDOM, seed + 30)

  // Chakra
  const primaryChakra = getPrimaryChakra(signId)
  const chakraBalance = CHAKRAS.map((chakra, i) => ({
    ...chakra,
    level: getSeededPercentage(seed + i + 100),
  }))

  // Past lives
  const pastLives = getPastLives(signId)

  // Recommendations
  const recommendations = getRecommendations(zodiacData.elementType)

  // Love language
  const loveLanguage = LOVE_LANGUAGES[signId]

  // Element compatibility
  const elementCompat = ELEMENT_COMPATIBILITY[zodiacData.elementType]

  // Relationship advice
  const relationAdvice = RELATIONSHIP_ADVICE[zodiacData.elementType]

  // Energy meter
  const energyLevel = getSeededPercentage(seed + 50)

  // Lucky number for today
  const luckyNumberToday = getSeededNumber(seed + dayOfYear, 1, 99)

  // Partner compatibility (if provided)
  let partnerCompatibility = null
  if (partnerSign) {
    const partnerData = ZODIAC_SIGNS[partnerSign.toLowerCase()]
    if (partnerData) {
      const compatDetail = zodiacData.compatibilityDetails?.[partnerData.name]
      const elementCompatScore = elementCompat?.[partnerData.elementType]

      partnerCompatibility = {
        partnerSign: partnerData,
        score: compatDetail?.score || elementCompatScore?.score || 65,
        description: compatDetail?.description || elementCompatScore?.description || 'A unique cosmic connection with its own special energy.',
        loveLanguageMatch: LOVE_LANGUAGES[partnerSign.toLowerCase()],
        elementInteraction: elementCompatScore,
      }
    }
  }

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

    // Zodiac
    zodiac: zodiacData,
    signId,

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