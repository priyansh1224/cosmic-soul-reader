// ═══════════════════════════════════════════════════════════════════
// 🔮 ZODIAC CALCULATOR HOOK
// ═══════════════════════════════════════════════════════════════════

import { useState, useCallback } from 'react'
import { generateReading } from '@utils/calculations'
import { delay } from '@utils/helpers'
import { LOADING_MESSAGES, ANIMATION_DURATIONS } from '@utils/constants'
import useCosmicStore from '@stores/useCosmicStore'
import useAudioStore from '@stores/useAudioStore'

const useZodiacCalculator = () => {
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0])
  const [isError, setIsError] = useState(false)

  const { formData, setReading, goToReading, goToResults, showToast } = useCosmicStore()
  const playSound = useAudioStore((s) => s.playSound)

  /**
   * Run the cosmic reading calculation with loading animation
   */
  const calculateReading = useCallback(async () => {
    setIsError(false)
    setProgress(0)
    goToReading()
    playSound('transition')

    try {
      // Simulate cosmic calculation with progress updates
      const totalDuration = ANIMATION_DURATIONS.READING_CALC
      const messageInterval = totalDuration / LOADING_MESSAGES.length
      const progressInterval = totalDuration / 100

      // Message cycling
      let messageIndex = 0
      const messageTimer = setInterval(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length
        setLoadingMessage(LOADING_MESSAGES[messageIndex])
      }, messageInterval)

      // Progress animation
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev
          const increment = Math.random() * 3 + 0.5
          return Math.min(95, prev + increment)
        })
      }, progressInterval)

      // Actually generate the reading
      await delay(800) // Let animation start
      const reading = generateReading(formData)

      if (!reading) {
        throw new Error('Invalid birth data')
      }

      // Wait for remaining animation
      await delay(totalDuration - 800)

      // Cleanup timers
      clearInterval(messageTimer)
      clearInterval(progressTimer)

      // Final progress
      setProgress(100)
      setLoadingMessage('Your cosmic reading is ready! ✨')
      playSound('success')

      await delay(800) // Show 100% briefly

      // Save reading
      setReading(reading)

      // Save to localStorage
      try {
        const existingReadings = JSON.parse(localStorage.getItem('cosmic_readings') || '[]')
        existingReadings.unshift({
          ...reading,
          savedAt: new Date().toISOString(),
        })
        // Keep only last 10 readings
        localStorage.setItem(
          'cosmic_readings',
          JSON.stringify(existingReadings.slice(0, 10))
        )
      } catch (e) {
        console.warn('Failed to save reading:', e)
      }

      // Navigate to results
      goToResults()

      showToast({
        type: 'success',
        message: `Welcome, Cosmic ${reading.zodiac.name}! Your reading is ready.`,
        duration: 4000,
      })

      return reading
    } catch (error) {
      console.error('Reading calculation failed:', error)
      setIsError(true)
      setLoadingMessage('Something went wrong... Realigning cosmic frequencies...')
      playSound('error')

      showToast({
        type: 'error',
        message: 'Failed to generate reading. Please check your birth data and try again.',
        duration: 5000,
      })

      await delay(2000)
      setProgress(0)
      return null
    }
  }, [formData, setReading, goToReading, goToResults, showToast, playSound])

  /**
   * Get a quick sign preview without full calculation
   */
  const getQuickPreview = useCallback((day, month) => {
    const { getZodiacSignId } = require('@utils/calculations')
    const { ZODIAC_SIGNS } = require('@data/zodiacSigns')
    const signId = getZodiacSignId(day, month)
    if (!signId) return null
    return ZODIAC_SIGNS[signId]
  }, [])

  return {
    calculateReading,
    getQuickPreview,
    progress,
    loadingMessage,
    isError,
  }
}

export default useZodiacCalculator