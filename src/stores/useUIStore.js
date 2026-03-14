// ═══════════════════════════════════════════════════════════════════
// 🎛️ UI STORE - Settings & Preferences
// ═══════════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@utils/constants'

const useUIStore = create(
  persist(
    (set, get) => ({
      // ─────────────────────────────────────────
      // Theme
      // ─────────────────────────────────────────
      theme: 'dark', // 'dark' | 'light' | 'nebula'
      
      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme)
        set({ theme })
      },
      
      cycleTheme: () => {
        const themes = ['dark', 'light', 'nebula']
        const { theme } = get()
        const currentIndex = themes.indexOf(theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]
        document.documentElement.setAttribute('data-theme', nextTheme)
        set({ theme: nextTheme })
      },

      // ─────────────────────────────────────────
      // Sound
      // ─────────────────────────────────────────
      soundEnabled: true,
      soundVolume: 0.5,
      
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setSoundVolume: (volume) => set({ soundVolume: volume }),

      // ─────────────────────────────────────────
      // Visual Effects
      // ─────────────────────────────────────────
      particlesEnabled: true,
      cursorEnabled: true,
      animationsEnabled: true,
      glowEnabled: true,
      threeEnabled: true,
      
      toggleParticles: () => set((state) => ({ particlesEnabled: !state.particlesEnabled })),
      toggleCursor: () => set((state) => ({ cursorEnabled: !state.cursorEnabled })),
      toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
      toggleGlow: () => set((state) => ({ glowEnabled: !state.glowEnabled })),
      toggleThree: () => set((state) => ({ threeEnabled: !state.threeEnabled })),

      // ─────────────────────────────────────────
      // Accessibility
      // ─────────────────────────────────────────
      reducedMotion: false,
      highContrast: false,
      fontSize: 'normal', // 'small' | 'normal' | 'large'
      
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
      setFontSize: (size) => set({ fontSize: size }),

      // ─────────────────────────────────────────
      // Layout
      // ─────────────────────────────────────────
      isMobile: false,
      isTablet: false,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
      windowHeight: typeof window !== 'undefined' ? window.innerHeight : 1080,
      
      setDeviceType: (width) => {
        set({
          isMobile: width < 640,
          isTablet: width >= 640 && width < 1024,
          windowWidth: width,
        })
      },
      
      setWindowDimensions: (width, height) => {
        set({
          windowWidth: width,
          windowHeight: height,
          isMobile: width < 640,
          isTablet: width >= 640 && width < 1024,
        })
      },

      // ─────────────────────────────────────────
      // Easter Eggs
      // ─────────────────────────────────────────
      konamiActivated: false,
      secretsFound: [],
      
      activateKonami: () => set({ konamiActivated: true }),
      addSecret: (secret) => set((state) => ({
        secretsFound: [...state.secretsFound, secret],
      })),

      // ─────────────────────────────────────────
      // Performance
      // ─────────────────────────────────────────
      performanceMode: 'high', // 'low' | 'medium' | 'high'
      fps: 60,
      
      setPerformanceMode: (mode) => {
        const settings = {
          low: { particlesEnabled: false, cursorEnabled: false, glowEnabled: false, threeEnabled: false },
          medium: { particlesEnabled: true, cursorEnabled: true, glowEnabled: true, threeEnabled: false },
          high: { particlesEnabled: true, cursorEnabled: true, glowEnabled: true, threeEnabled: true },
        }
        set({ performanceMode: mode, ...settings[mode] })
      },
      
      setFps: (fps) => set({ fps }),
    }),
    {
      name: STORAGE_KEYS.SETTINGS,
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        soundVolume: state.soundVolume,
        particlesEnabled: state.particlesEnabled,
        cursorEnabled: state.cursorEnabled,
        animationsEnabled: state.animationsEnabled,
        performanceMode: state.performanceMode,
        reducedMotion: state.reducedMotion,
        fontSize: state.fontSize,
      }),
    }
  )
)

export default useUIStore