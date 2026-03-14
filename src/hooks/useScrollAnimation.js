// ═══════════════════════════════════════════════════════════════════
// 📜 SCROLL ANIMATION HOOK
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState, useCallback } from 'react'
import useCosmicStore from '@stores/useCosmicStore'

/**
 * Hook to detect when an element enters the viewport
 */
export const useInView = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options

  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        if (triggerOnce) {
          if (inView && !hasTriggered) {
            setIsInView(true)
            setHasTriggered(true)
            observer.unobserve(element)
          }
        } else {
          setIsInView(inView)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return [ref, isInView]
}

/**
 * Hook for staggered animation of children
 */
export const useStaggerAnimation = (isVisible, itemCount, delay = 150) => {
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    if (!isVisible) {
      setVisibleItems([])
      return
    }

    const timers = []

    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => [...prev, i])
      }, i * delay)
      timers.push(timer)
    }

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [isVisible, itemCount, delay])

  return visibleItems
}

/**
 * Hook for scroll progress tracking
 */
export const useScrollProgress = () => {
  const setScrollProgress = useCosmicStore((s) => s.setScrollProgress)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress])
}

/**
 * Hook for parallax effect
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const elementTop = rect.top + scrolled
      const relativeScroll = scrolled - elementTop
      setOffset(relativeScroll * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [ref, offset]
}

/**
 * Hook for reveal animation with different directions
 */
export const useRevealAnimation = (direction = 'up', delay = 0) => {
  const [ref, isInView] = useInView({ threshold: 0.15 })
  const [style, setStyle] = useState({
    opacity: 0,
    transform: getInitialTransform(direction),
    transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
  })

  useEffect(() => {
    if (isInView) {
      setStyle({
        opacity: 1,
        transform: 'translateX(0) translateY(0) scale(1)',
        transition: `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      })
    }
  }, [isInView, delay])

  return [ref, style, isInView]
}

function getInitialTransform(direction) {
  switch (direction) {
    case 'up': return 'translateY(40px) scale(0.95)'
    case 'down': return 'translateY(-40px) scale(0.95)'
    case 'left': return 'translateX(-40px) scale(0.95)'
    case 'right': return 'translateX(40px) scale(0.95)'
    case 'scale': return 'scale(0.8)'
    default: return 'translateY(40px) scale(0.95)'
  }
}

export default useInView