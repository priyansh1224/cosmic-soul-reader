// ═══════════════════════════════════════════════════════════════════
// 🖱️ QUANTUM CURSOR - GPU-Accelerated Particle Cursor
// ═══════════════════════════════════════════════════════════════════

import { memo, useEffect } from 'react'
import useCosmicCursor from '@hooks/useCosmicCursor'
import useUIStore from '@stores/useUIStore'
import './QuantumCursor.css'

const QuantumCursor = memo(() => {
  const {
    isHovering,
    isClicking,
    isVisible,
    coreDotRef,
    auraRingRef,
    trailCanvasRef,
    hoverRing1Ref,
    hoverRing2Ref,
  } = useCosmicCursor()

  const cursorEnabled = useUIStore((s) => s.cursorEnabled)
  const isMobile = useUIStore((s) => s.isMobile)

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('hide-default-cursor')
    } else {
      document.body.classList.remove('hide-default-cursor')
    }
    return () => document.body.classList.remove('hide-default-cursor')
  }, [isVisible])

  if (!cursorEnabled || isMobile) return null

  // Build dynamic classes/styles based on state
  const coreSize = isHovering ? 12 : 8
  const auraSize = isHovering ? 56 : 40

  return (
    <div
      className="fixed inset-0 pointer-events-none z-cursor"
      aria-hidden="true"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* ─── CANVAS FOR TRAIL + CLICK PARTICLES ─── */}
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0"
        style={{ willChange: 'auto' }}
      />

      {/* ─── OUTER AURA RING ─── */}
      <div
        ref={auraRingRef}
        className="quantum-cursor-aura"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: auraSize,
          height: auraSize,
          borderRadius: '50%',
          border: `1px solid ${
            isHovering
              ? 'rgba(236, 72, 153, 0.6)'
              : 'rgba(255, 213, 79, 0.4)'
          }`,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, box-shadow 0.2s',
          mixBlendMode: 'screen',
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.8 : 1
          })`,
          boxShadow: isHovering
            ? '0 0 20px rgba(236, 72, 153, 0.3), inset 0 0 10px rgba(236, 72, 153, 0.1)'
            : '0 0 15px rgba(255, 213, 79, 0.2)',
        }}
      />

      {/* ─── INNER CORE DOT ─── */}
      <div
        ref={coreDotRef}
        className="quantum-cursor-core"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: coreSize,
          height: coreSize,
          borderRadius: '50%',
          willChange: 'transform',
          transition: 'width 0.15s, height 0.15s, background 0.2s, box-shadow 0.2s',
          transform: `translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(${
            isClicking ? 1.5 : 1
          })`,
          background: isHovering
            ? 'radial-gradient(circle, #ec4899 0%, #7c3aed 100%)'
            : 'radial-gradient(circle, #ffd54f 0%, #ff8f00 100%)',
          boxShadow: isHovering
            ? '0 0 15px rgba(236, 72, 153, 0.8), 0 0 30px rgba(236, 72, 153, 0.4)'
            : '0 0 10px rgba(255, 213, 79, 0.8), 0 0 20px rgba(255, 213, 79, 0.4)',
        }}
      />

      {/* ─── HOVER EXPANSION RINGS ─── */}
      <div
        ref={hoverRing1Ref}
        className="quantum-cursor-hover-ring"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 70,
          height: 70,
          borderRadius: '50%',
          border: '1px solid rgba(236, 72, 153, 0.2)',
          willChange: 'transform',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.2s',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          animation: isHovering ? 'pulseRing1 2s ease-in-out infinite' : 'none',
        }}
      />
      <div
        ref={hoverRing2Ref}
        className="quantum-cursor-hover-ring"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 90,
          height: 90,
          borderRadius: '50%',
          border: '1px solid rgba(124, 58, 237, 0.15)',
          willChange: 'transform',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.2s',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
          animation: isHovering
            ? 'pulseRing2 2.5s ease-in-out 0.3s infinite'
            : 'none',
        }}
      />
    </div>
  )
})

QuantumCursor.displayName = 'QuantumCursor'

export default QuantumCursor