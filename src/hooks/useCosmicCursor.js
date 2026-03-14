// ═══════════════════════════════════════════════════════════════════
// 🖱️ COSMIC CURSOR HOOK - PERFORMANCE OPTIMIZED
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from 'react'
import { isTouchDevice } from '@utils/helpers'
import useUIStore from '@stores/useUIStore'

const useCosmicCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorEnabled = useUIStore((s) => s.cursorEnabled)

  // ── ALL POSITION DATA LIVES IN REFS (no re-renders!) ──
  const targetRef = useRef({ x: -100, y: -100 })
  const smoothRef = useRef({ x: -100, y: -100 })
  const trailRef = useRef([])
  const clickParticlesRef = useRef([])
  const isTouch = useRef(false)
  const animationRef = useRef(null)

  // ── DOM REFS for direct manipulation (bypass React rendering) ──
  const coreDotRef = useRef(null)
  const auraRingRef = useRef(null)
  const trailCanvasRef = useRef(null)
  const hoverRing1Ref = useRef(null)
  const hoverRing2Ref = useRef(null)
  const particleContainerRef = useRef(null)

  useEffect(() => {
    isTouch.current = isTouchDevice()
  }, [])

  // ── MOUSE MOVE - only update refs, ZERO state updates ──
  const handleMouseMove = useCallback((e) => {
    targetRef.current.x = e.clientX
    targetRef.current.y = e.clientY

    if (!isVisible) setIsVisible(true)

    // Add trail point directly to ref
    trailRef.current.push({
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
    })

    // Keep max 12 trail points
    if (trailRef.current.length > 12) {
      trailRef.current = trailRef.current.slice(-12)
    }
  }, [isVisible])

  const handleMouseDown = useCallback(() => {
    setIsClicking(true)

    // Store click particles in ref
    const particles = Array.from({ length: 8 }, (_, i) => ({
      x: targetRef.current.x,
      y: targetRef.current.y,
      angle: (i / 8) * Math.PI * 2,
      speed: 2 + Math.random() * 3,
      size: 3 + Math.random() * 4,
      color: ['#ffd54f', '#7c3aed', '#ec4899', '#06b6d4', '#ff8f00'][
        Math.floor(Math.random() * 5)
      ],
      life: 1,
      startTime: performance.now(),
    }))

    clickParticlesRef.current.push(...particles)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsClicking(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  // ── MAIN ANIMATION LOOP - direct DOM manipulation ──
  useEffect(() => {
    if (isTouch.current || !cursorEnabled) return

    const animate = (now) => {
      const target = targetRef.current
      const smooth = smoothRef.current

      // Lerp with higher factor for snappier response
      smooth.x += (target.x - smooth.x) * 0.35
      smooth.y += (target.y - smooth.y) * 0.35

      // ── UPDATE CORE DOT via transform (GPU accelerated) ──
      if (coreDotRef.current) {
        coreDotRef.current.style.transform =
          `translate3d(${smooth.x}px, ${smooth.y}px, 0) translate(-50%, -50%)`
      }

      // ── UPDATE AURA RING via transform ──
      if (auraRingRef.current) {
        auraRingRef.current.style.transform =
          `translate3d(${smooth.x}px, ${smooth.y}px, 0) translate(-50%, -50%)`
      }

      // ── UPDATE HOVER RINGS via transform ──
      if (hoverRing1Ref.current) {
        hoverRing1Ref.current.style.transform =
          `translate3d(${smooth.x}px, ${smooth.y}px, 0) translate(-50%, -50%)`
      }
      if (hoverRing2Ref.current) {
        hoverRing2Ref.current.style.transform =
          `translate3d(${smooth.x}px, ${smooth.y}px, 0) translate(-50%, -50%)`
      }

      // ── DRAW TRAIL ON CANVAS (way faster than DOM nodes) ──
      const canvas = trailCanvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1

        // Resize canvas if needed
        if (canvas.width !== window.innerWidth * dpr) {
          canvas.width = window.innerWidth * dpr
          canvas.height = window.innerHeight * dpr
          canvas.style.width = window.innerWidth + 'px'
          canvas.style.height = window.innerHeight + 'px'
          ctx.scale(dpr, dpr)
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const trail = trailRef.current
        const colors = ['#ffd54f', '#7c3aed', '#ec4899']

        // Draw constellation lines
        for (let i = 1; i < trail.length; i++) {
          const p = trail[i]
          const prev = trail[i - 1]
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `rgba(255, 213, 79, ${p.opacity * 0.15})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Draw trail dots
        for (let i = 0; i < trail.length; i++) {
          const p = trail[i]
          const color = colors[i % 3]
          const radius = 2 * p.opacity

          ctx.beginPath()
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.globalAlpha = p.opacity * 0.6
          ctx.fill()
          ctx.globalAlpha = 1
        }

        // Draw click particles
        const particles = clickParticlesRef.current
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          const elapsed = (now - p.startTime) / 600 // 600ms duration
          if (elapsed >= 1) {
            particles.splice(i, 1)
            continue
          }

          const progress = elapsed
          const ease = 1 - Math.pow(1 - progress, 3) // easeOut
          const px = p.x + Math.cos(p.angle) * 60 * p.speed * ease
          const py = p.y + Math.sin(p.angle) * 60 * p.speed * ease
          const scale = 1 - progress
          const alpha = 1 - progress

          ctx.beginPath()
          ctx.arc(px, py, (p.size / 2) * scale, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = alpha
          ctx.shadowColor = p.color
          ctx.shadowBlur = p.size * 2
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1
        }

        // Fade trail points
        trailRef.current = trail
          .map((point) => ({
            ...point,
            opacity: point.opacity * 0.92,
          }))
          .filter((point) => point.opacity > 0.05)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [cursorEnabled])

  // ── EVENT LISTENERS ──
  useEffect(() => {
    if (isTouch.current || !cursorEnabled) return

    const handleHoverIn = () => setIsHovering(true)
    const handleHoverOut = () => setIsHovering(false)

    const addHoverListeners = () => {
      const elements = document.querySelectorAll(
        'button, a, input, select, textarea, [data-cursor-hover], [role="button"]'
      )
      elements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
      return elements
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    let currentElements = addHoverListeners()

    // Debounced MutationObserver
    let mutationTimeout = null
    const observer = new MutationObserver(() => {
      if (mutationTimeout) clearTimeout(mutationTimeout)
      mutationTimeout = setTimeout(() => {
        // Clean up old listeners
        currentElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleHoverIn)
          el.removeEventListener('mouseleave', handleHoverOut)
        })
        currentElements = addHoverListeners()
      }, 200) // debounce 200ms
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
      if (mutationTimeout) clearTimeout(mutationTimeout)
      currentElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
      })
    }
  }, [cursorEnabled, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter])

  return {
    isHovering,
    isClicking,
    isVisible: isVisible && cursorEnabled && !isTouch.current,
    // DOM refs for direct manipulation
    coreDotRef,
    auraRingRef,
    trailCanvasRef,
    hoverRing1Ref,
    hoverRing2Ref,
    particleContainerRef,
  }
}

export default useCosmicCursor