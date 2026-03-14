// ═══════════════════════════════════════════════════════════════════
// 🌌 COSMIC SOUL READER - Main App Component
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useCosmicStore from './stores/useCosmicStore'
import useUIStore from './stores/useUIStore'
import useAudioStore from './stores/useAudioStore'
import useSoundEffects from './hooks/useSoundEffects'
import { SECTIONS } from './utils/constants'

// ═══ Section Components ═══
import PortalLoader from './components/sections/PortalLoader'
import CosmicWelcome from './components/sections/CosmicWelcome'
import SoulInputForm from './components/sections/SoulInputForm'
import ReadingReveal from './components/sections/ReadingReveal'
import CosmicResults from './components/sections/CosmicResults'
import QuantumCursor from './components/ui/QuantumCursor'

function App() {
  const { isLoading, currentSection, setLoading, goToWelcome } = useCosmicStore()
  const { theme } = useUIStore()
  const { startAmbient, isAmbientPlaying } = useAudioStore()
  const [muted, setMuted] = useState(false)
  useSoundEffects()

  // Auto-start ambient on first interaction (browser requires user gesture)
  useEffect(() => {
    const start = () => startAmbient('/sounds/cosmic-ambient.mpeg')
    document.addEventListener('click', start, { once: true })
    document.addEventListener('keydown', start, { once: true })
    return () => {
      document.removeEventListener('click', start)
      document.removeEventListener('keydown', start)
    }
  }, [startAmbient])

  // Mute/unmute by setting audioEl volume directly
  const handleToggleMute = () => {
    const engine = useAudioStore.getState().engine
    const next = !muted
    setMuted(next)
    if (engine?.audioEl) engine.audioEl.volume = next ? 0 : 0.35
  }
  const [stars, setStars] = useState([])

  // ═══ Generate stars once on mount ═══
  useEffect(() => {
    const generatedStars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
      size: Math.random() > 0.8 ? 'w-1.5 h-1.5' : 'w-1 h-1',
    }))
    setStars(generatedStars)
  }, [])

  // ═══ Apply theme to document ═══
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    
    const bgColors = {
      dark: '#050510',
      light: '#f0e6ff',
      nebula: '#0d001a',
    }
    document.body.style.backgroundColor = bgColors[theme] || '#050510'
  }, [theme])

  // ═══ Auto-transition from loader to welcome ═══
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setLoading(false)
        goToWelcome()
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isLoading, setLoading, goToWelcome])

  // ═══ Render current section ═══
  const renderSection = () => {
    // Show loader if loading or on loader section
    if (isLoading || currentSection === SECTIONS.LOADER) {
      return <PortalLoader key="loader" />
    }

    switch (currentSection) {
      case SECTIONS.WELCOME:
        return <CosmicWelcome key="welcome" />
      case SECTIONS.FORM:
        return <SoulInputForm key="form" />
      case SECTIONS.READING:
        return <ReadingReveal key="reading" />
      case SECTIONS.RESULTS:
        return <CosmicResults key="results" />
      default:
        return <CosmicWelcome key="welcome-default" />
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cosmic-void overflow-hidden"
      data-theme={theme}
    >
      {/* ═══ Custom Cursor ═══ */}
      <QuantumCursor />

      {/* ═══ Sound Toggle ═══ */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full
                   bg-white/5 border border-white/10 backdrop-blur-sm
                   flex items-center justify-center text-lg
                   hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
        onClick={handleToggleMute}
        whileTap={{ scale: 0.9 }}
        title={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? '🔇' : '🔊'}
      </motion.button>

      {/* ═══ Background cosmic gradient ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple-900/20 via-transparent to-cosmic-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-cosmic-pink-600/5 via-transparent to-cosmic-blue-600/5" />
      </div>

      {/* ═══ Star field background ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute ${star.size} bg-white rounded-full animate-twinkle`}
            style={{
              top: star.top,
              left: star.left,
              opacity: star.opacity,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* ═══ Main content with page transitions ═══ */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App