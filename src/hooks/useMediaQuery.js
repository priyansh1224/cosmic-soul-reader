// ═══════════════════════════════════════════════════════════════════
// 📱 MEDIA QUERY HOOK
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react'
import useUIStore from '@stores/useUIStore'

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e) => setMatches(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * Preset media query hooks
 */
export const useIsMobile = () => useMediaQuery('(max-width: 639px)')
export const useIsTablet = () => useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1536px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const usePrefersDark = () => useMediaQuery('(prefers-color-scheme: dark)')

/**
 * Window resize hook that updates UI store
 */
export const useWindowResize = () => {
  const setWindowDimensions = useUIStore((s) => s.setWindowDimensions)

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(window.innerWidth, window.innerHeight)
    }

    handleResize() // Initial
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setWindowDimensions])
}

export default useMediaQuery