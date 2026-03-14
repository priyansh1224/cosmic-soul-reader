// ═══════════════════════════════════════════════════════════════════
// 🌀 GALACTIC SLIDER - Cosmic Range Slider with Nebula Track
// ═══════════════════════════════════════════════════════════════════

import { useState, useRef, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { cn, mapRange, clamp } from '@utils/helpers'
import useSoundEffects from '@hooks/useSoundEffects'

const GalacticSlider = memo(({
  label,
  name,
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  valueFormat,
  leftLabel,
  rightLabel,
  color = '#7c3aed',
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const trackRef = useRef(null)
  const { playHover } = useSoundEffects()

  const percentage = mapRange(value, min, max, 0, 100)

  const handleTrackClick = useCallback((e) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
    const newValue = Math.round((x * (max - min) + min) / step) * step
    onChange?.({ target: { name, value: clamp(newValue, min, max) } })
  }, [name, onChange, min, max, step])

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true)
    handleTrackClick(e)

    const handleMove = (e) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
      const newValue = Math.round((x * (max - min) + min) / step) * step
      onChange?.({ target: { name, value: clamp(newValue, min, max) } })
    }

    const handleUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }, [handleTrackClick, name, onChange, min, max, step])

  const displayValue = valueFormat ? valueFormat(value) : value

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {label && (
          <label className="text-sm font-body text-white/40 tracking-wide">{label}</label>
        )}
        {showValue && (
          <motion.span
            className="text-sm font-tech"
            style={{ color }}
            animate={{ scale: isDragging ? 1.2 : 1 }}
          >
            {displayValue}
          </motion.span>
        )}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-3 rounded-full cursor-none group"
        onMouseDown={handleMouseDown}
        onMouseEnter={() => { setIsHovered(true); playHover() }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Track */}
        <div className="absolute inset-0 rounded-full bg-white/[0.06] overflow-hidden">
          {/* Nebula pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(90deg, 
                rgba(124,58,237,0.3) 0%, 
                rgba(236,72,153,0.2) 33%, 
                rgba(6,182,212,0.2) 66%, 
                rgba(255,213,79,0.3) 100%
              )`,
            }}
          />
        </div>

        {/* Filled Track */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(90deg, ${color}90, ${color})`,
            }}
          />
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
              ],
              x: ['-100%', '200%'],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${percentage}%` }}
          animate={{
            scale: isDragging ? 1.3 : isHovered ? 1.1 : 1,
          }}
          transition={{ type: 'spring', damping: 15 }}
        >
          {/* Outer Glow */}
          <motion.div
            className="absolute inset-[-8px] rounded-full"
            animate={{
              opacity: isDragging ? 0.3 : isHovered ? 0.15 : 0,
              scale: isDragging ? 1.5 : 1,
            }}
            style={{ backgroundColor: color }}
          />
          {/* Thumb Circle */}
          <div
            className="relative w-5 h-5 rounded-full border-2 border-white shadow-lg"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 15px ${color}80`,
            }}
          >
            {/* Inner dot */}
            <div className="absolute inset-1 rounded-full bg-white/30" />
          </div>
        </motion.div>

        {/* Step markers */}
        {max - min <= 10 && (
          <div className="absolute inset-0 flex items-center justify-between px-1">
            {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-1 h-1 rounded-full transition-colors duration-300',
                  i * step + min <= value ? 'bg-white/40' : 'bg-white/10',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Labels */}
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-1.5">
          <span className="text-[10px] text-white/20 font-body">{leftLabel}</span>
          <span className="text-[10px] text-white/20 font-body">{rightLabel}</span>
        </div>
      )}
    </div>
  )
})

GalacticSlider.displayName = 'GalacticSlider'

export default GalacticSlider