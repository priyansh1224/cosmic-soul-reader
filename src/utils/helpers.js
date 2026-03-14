// ═══════════════════════════════════════════════════════════════════
// 🛠️ HELPER UTILITIES
// ═══════════════════════════════════════════════════════════════════

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely
 */
export const cn = (...inputs) => twMerge(clsx(inputs))

/**
 * Format date string
 */
export const formatDate = (day, month, year) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${months[month - 1]} ${day}, ${year}`
}

/**
 * Get current formatted date
 */
export const getCurrentDate = () => {
  const now = new Date()
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get time of day greeting
 */
export const getTimeGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 6) return { greeting: 'Mystical midnight', icon: '🌙' }
  if (hour < 12) return { greeting: 'Blessed morning', icon: '🌅' }
  if (hour < 17) return { greeting: 'Radiant afternoon', icon: '☀️' }
  if (hour < 21) return { greeting: 'Enchanted evening', icon: '🌆' }
  return { greeting: 'Celestial night', icon: '✨' }
}

/**
 * Delay utility
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if device is touch-enabled
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Check if prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get random item from array
 */
export const randomItem = (array) => array[Math.floor(Math.random() * array.length)]

/**
 * Shuffle array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Map a number from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Clamp a value between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Lerp (Linear Interpolation)
 */
export const lerp = (start, end, t) => start + (end - start) * t

/**
 * Generate unique ID
 */
export const generateId = () => {
  return `cosmic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return true
  }
}

/**
 * Share via Web Share API
 */
export const shareResult = async (readingData) => {
  const shareData = {
    title: 'My Cosmic Soul Reading ✨',
    text: `I'm a ${readingData.zodiac.name} ${readingData.zodiac.symbol}! My cosmic message: "${readingData.cosmicMessage?.substring(0, 100)}..."`,
    url: window.location.href,
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
      return true
    } catch {
      return false
    }
  }

  return copyToClipboard(shareData.text)
}

/**
 * Get score color
 */
export const getScoreColor = (score) => {
  if (score >= 85) return { color: '#2ecc71', label: 'Excellent', class: 'text-emerald-400' }
  if (score >= 70) return { color: '#ffd54f', label: 'Good', class: 'text-amber-400' }
  if (score >= 50) return { color: '#ff8f00', label: 'Moderate', class: 'text-orange-400' }
  return { color: '#ff6b6b', label: 'Challenging', class: 'text-red-400' }
}

/**
 * Get element color
 */
export const getElementColor = (elementType) => {
  const colors = {
    fire: '#FF4136',
    earth: '#2ecc71',
    air: '#74b9ff',
    water: '#00cec9',
  }
  return colors[elementType] || '#ffd54f'
}

/**
 * Get element gradient
 */
export const getElementGradient = (elementType) => {
  const gradients = {
    fire: 'from-red-500 via-orange-500 to-yellow-500',
    earth: 'from-emerald-500 via-green-500 to-teal-500',
    air: 'from-blue-400 via-purple-400 to-indigo-400',
    water: 'from-cyan-500 via-blue-500 to-indigo-500',
  }
  return gradients[elementType] || 'from-purple-500 via-pink-500 to-cyan-500'
}