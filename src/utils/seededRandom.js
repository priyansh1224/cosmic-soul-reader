// ═══════════════════════════════════════════════════════════════════
// 🎲 SEEDED RANDOM - Consistent Results for Same Input
// ═══════════════════════════════════════════════════════════════════

/**
 * Creates a seed from birth data for consistent random results
 */
export const createSeed = (day, month, year) => {
  const d = parseInt(day) || 1
  const m = parseInt(month) || 1
  const y = parseInt(year) || 2000
  return (d * 31 + m * 12 + y) % 10000
}

/**
 * Seeded random number generator (Mulberry32)
 */
export const seededRandom = (seed) => {
  let t = seed + 0x6D2B79F5
  t = Math.imul(t ^ t >>> 15, t | 1)
  t ^= t + Math.imul(t ^ t >>> 7, t | 61)
  return ((t ^ t >>> 14) >>> 0) / 4294967296
}

/**
 * Get a seeded item from an array
 */
export const getSeededItem = (array, seed) => {
  if (!array || array.length === 0) return null
  const index = Math.floor(seededRandom(seed) * array.length)
  return array[index]
}

/**
 * Get multiple unique seeded items from an array
 */
export const getSeededItems = (array, seed, count) => {
  if (!array || array.length === 0) return []
  const result = []
  const used = new Set()

  for (let i = 0; i < Math.min(count, array.length); i++) {
    let index
    let attempts = 0
    do {
      index = Math.floor(seededRandom(seed + i + attempts * 7) * array.length)
      attempts++
    } while (used.has(index) && attempts < 100)
    used.add(index)
    result.push(array[index])
  }

  return result
}

/**
 * Get a seeded number in range
 */
export const getSeededNumber = (seed, min, max) => {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min
}

/**
 * Get seeded percentage (60-98%)
 */
export const getSeededPercentage = (seed) => {
  return getSeededNumber(seed, 60, 98)
}