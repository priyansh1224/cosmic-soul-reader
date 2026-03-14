// ═══════════════════════════════════════════════════════════════════
// 🔊 SOUND EFFECTS HOOK
// ═══════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef } from 'react'
import useAudioStore from '@stores/useAudioStore'
import useUIStore from '@stores/useUIStore'

const useSoundEffects = () => {
  const { playSound, initAudio, resumeAudio, SOUNDS } = useAudioStore()
  const soundEnabled = useUIStore((s) => s.soundEnabled)
  const initialized = useRef(false)

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!initialized.current) {
        initAudio()
        initialized.current = true
      }
      resumeAudio()
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })
    document.addEventListener('keydown', handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [initAudio, resumeAudio])

  // Wrapped play function that respects sound setting
  const play = useCallback(
    (soundType) => {
      if (soundEnabled) {
        playSound(soundType)
      }
    },
    [soundEnabled, playSound]
  )

  return {
    play,
    playClick: () => play(SOUNDS.CLICK),
    playHover: () => play(SOUNDS.HOVER),
    playSuccess: () => play(SOUNDS.SUCCESS),
    playWhoosh: () => play(SOUNDS.WHOOSH),
    playCosmic: () => play(SOUNDS.COSMIC),
    playReveal: () => play(SOUNDS.REVEAL),
    playTransition: () => play(SOUNDS.TRANSITION),
    playChime: () => play(SOUNDS.CHIME),
    playSparkle: () => play(SOUNDS.SPARKLE),
    playError: () => play(SOUNDS.ERROR),
    SOUNDS,
  }
}

export default useSoundEffects