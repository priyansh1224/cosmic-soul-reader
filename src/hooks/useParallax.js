// ═══════════════════════════════════════════════════════════════════
// 🌊 PARALLAX & MOUSE TRACKING HOOK
// ═══════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from 'react'
import { throttle, mapRange, clamp } from '@utils/helpers'

/**
 * Track mouse position relative to an element for 3D tilt effects
 */
export const useMouseTilt = (options = {}) => {
  const {
    maxTilt = 15,
    scale = 1.02,
    speed = 400,
    glare = true,
    glareMax = 0.3,
    disabled = false,
  } = options

  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback(
    throttle((e) => {
      if (disabled || !ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const tiltX = clamp(
        mapRange(mouseY, -rect.height / 2, rect.height / 2, maxTilt, -maxTilt),
        -maxTilt,
        maxTilt
      )
      const tiltY = clamp(
        mapRange(mouseX, -rect.width / 2, rect.width / 2, -maxTilt, maxTilt),
        -maxTilt,
        maxTilt
      )

      setTilt({ x: tiltX, y: tiltY })

      if (glare) {
        const glareX = mapRange(mouseX, -rect.width / 2, rect.width / 2, 0, 100)
        const glareY = mapRange(mouseY, -rect.height / 2, rect.height / 2, 0, 100)
        setGlarePosition({ x: glareX, y: glareY })
      }
    }, 16),
    [disabled, maxTilt, glare]
  )

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovering(true)
  }, [disabled])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
    setGlarePosition({ x: 50, y: 50 })
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element || disabled) return

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, disabled])

  const style = {
    transform: isHovering
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: isHovering
      ? `transform ${speed * 0.5}ms cubic-bezier(0.23, 1, 0.32, 1)`
      : `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`,
  }

  const glareStyle = glare
    ? {
        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${isHovering ? glareMax : 0}) 0%, transparent 80%)`,
        transition: `opacity ${speed}ms ease`,
        opacity: isHovering ? 1 : 0,
      }
    : {}

  return {
    ref,
    style,
    glareStyle,
    tilt,
    isHovering,
  }
}

/**
 * Magnetic hover effect - element follows cursor slightly
 */
export const useMagneticHover = (strength = 0.3) => {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    throttle((e) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      setOffset({ x: deltaX, y: deltaY })
    }, 16),
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.15s ease-out',
  }

  return { ref, style, offset }
}

export default useMouseTilt