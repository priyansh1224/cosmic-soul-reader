// ═══════════════════════════════════════════════════════════════════
// ✨ STARDUST SELECT - Mobile-Fixed Dropdown (Bottom Sheet on Mobile)
// ═══════════════════════════════════════════════════════════════════

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'

const StardustSelect = memo(({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  icon,
  glowColor = 'purple',
  error,
  optional = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)
  const scrollPosRef = useRef(0)

  const selectedOption = options.find((o) => o.value === value)

  // Glow color map
  const glowColors = {
    purple: {
      border: 'border-cosmic-purple-500',
      bg: 'bg-cosmic-purple-500/5',
      shadow: '0 0 20px rgba(124,58,237,0.2)',
      label: 'rgba(124,58,237,0.8)',
    },
    pink: {
      border: 'border-cosmic-pink-500',
      bg: 'bg-cosmic-pink-500/5',
      shadow: '0 0 20px rgba(236,72,153,0.2)',
      label: 'rgba(236,72,153,0.8)',
    },
    gold: {
      border: 'border-cosmic-gold',
      bg: 'bg-cosmic-gold/5',
      shadow: '0 0 20px rgba(255,213,79,0.2)',
      label: 'rgba(255,213,79,0.8)',
    },
    cyan: {
      border: 'border-cosmic-cyan-500',
      bg: 'bg-cosmic-cyan-500/5',
      shadow: '0 0 20px rgba(6,182,212,0.2)',
      label: 'rgba(6,182,212,0.8)',
    },
  }

  const glow = glowColors[glowColor] || glowColors.purple
  const isActive = isOpen || focused

  // ── LOCK BODY SCROLL on mobile when open ──
  useEffect(() => {
    if (!isOpen) return
    const isMobile = window.innerWidth < 640 || 'ontouchstart' in window
    if (!isMobile) return

    scrollPosRef.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollPosRef.current)
    }
  }, [isOpen])

  // ── CLOSE ON OUTSIDE TAP/CLICK ──
  useEffect(() => {
    if (!isOpen) return

    const handleOutside = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false)
        setFocused(false)
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleOutside, true)
      document.addEventListener('touchstart', handleOutside, true)
    }, 50)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleOutside, true)
      document.removeEventListener('touchstart', handleOutside, true)
    }
  }, [isOpen])

  // ── CLOSE ON ESCAPE ──
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  const handleSelect = useCallback(
    (optionValue) => {
      onChange?.({ target: { name, value: optionValue } })
      setIsOpen(false)
      setFocused(false)
    },
    [onChange, name]
  )

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
    setFocused((prev) => !prev)
  }, [])

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation()
      onChange?.({ target: { name, value: '' } })
    },
    [onChange, name]
  )

  return (
    <div className={cn('relative', className)} ref={triggerRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-body text-white/40 mb-2 tracking-wide">
          {icon && <span className="mr-1.5">{icon}</span>}
          {label}
          {optional && (
            <span className="text-white/20 ml-1 text-xs font-normal">
              (Optional)
            </span>
          )}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={toggleOpen}
        className={cn(
          'w-full rounded-2xl border-2 overflow-hidden transition-all duration-500',
          'text-left relative',
          isActive
            ? `${glow.border} ${glow.bg}`
            : 'border-white/10 bg-white/[0.03]',
          error && 'border-red-500/50',
        )}
        style={{ boxShadow: isActive ? glow.shadow : 'none' }}
      >
        <div className="py-3 sm:py-3.5 px-4 flex items-center justify-between gap-2">
          {selectedOption ? (
            <span className="flex items-center gap-2 text-white font-body truncate">
              {selectedOption.icon && (
                <span className="text-lg flex-shrink-0">{selectedOption.icon}</span>
              )}
              <span className="truncate">{selectedOption.label}</span>
            </span>
          ) : (
            <span className="text-white/25 font-body truncate">{placeholder}</span>
          )}

          <div className="flex items-center gap-1 flex-shrink-0">
            {optional && value && (
              <span
                role="button"
                tabIndex={-1}
                onClick={handleClear}
                className="text-white/30 hover:text-white/60 text-sm p-1 transition-colors"
              >
                ✕
              </span>
            )}
            <motion.span
              className="text-white/30 text-sm"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▾
            </motion.span>
          </div>
        </div>
      </button>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 font-body mt-1.5 pl-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}

      {/* ─── DROPDOWN / BOTTOM SHEET ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[9998] sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setIsOpen(false)
                setFocused(false)
              }}
            />

            {/* Dropdown panel */}
            <motion.div
              ref={dropdownRef}
              className={cn(
                'fixed sm:absolute',
                'bottom-0 left-0 right-0',
                'sm:bottom-auto sm:left-auto sm:right-auto',
                'sm:w-full sm:mt-2',
                'z-[9999]',
                'bg-[#0d0820] sm:bg-[#0a0612]',
                'border-t sm:border border-white/10',
                'rounded-t-3xl sm:rounded-2xl',
                'overflow-hidden',
              )}
              initial={{
                opacity: 0,
                y: typeof window !== 'undefined' && window.innerWidth < 640 ? 300 : -8,
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: typeof window !== 'undefined' && window.innerWidth < 640 ? 300 : -8,
              }}
              transition={{
                type: 'spring',
                damping: 28,
                stiffness: 350,
                mass: 0.8,
              }}
            >
              {/* Mobile drag handle */}
              <div className="sm:hidden pt-3 pb-2 flex justify-center">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Mobile title */}
              <div className="sm:hidden px-5 pb-3 border-b border-white/[0.06]">
                <h4 className="text-white/60 font-display text-sm font-medium tracking-wide">
                  {label || 'Select Option'}
                </h4>
              </div>

              {/* Options list */}
              <div
                className="overflow-y-auto overscroll-contain"
                style={{
                  maxHeight:
                    typeof window !== 'undefined' && window.innerWidth < 640
                      ? '60vh'
                      : '240px',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {optional && (
                  <button
                    type="button"
                    onClick={() => handleSelect('')}
                    className={cn(
                      'w-full flex items-center gap-3',
                      'px-5 sm:px-4 py-4 sm:py-3',
                      'text-left transition-colors duration-100',
                      'active:bg-white/10',
                      !value
                        ? 'bg-white/5 text-white/50'
                        : 'text-white/30 hover:bg-white/5',
                    )}
                  >
                    <span className="text-lg sm:text-base">—</span>
                    <span className="font-body text-base sm:text-sm">None / Skip</span>
                  </button>
                )}

                {options.map((option) => {
                  const isSelected = value === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        'w-full flex items-center gap-3',
                        'px-5 sm:px-4 py-4 sm:py-3',
                        'text-left transition-colors duration-100',
                        'active:bg-white/10',
                        isSelected
                          ? 'bg-cosmic-pink-500/15 text-white'
                          : 'text-white/60 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      {option.icon && (
                        <span className="text-lg sm:text-base flex-shrink-0">
                          {option.icon}
                        </span>
                      )}
                      <span className="font-body text-base sm:text-sm flex-1">
                        {option.label}
                      </span>
                      {isSelected && (
                        <span className="text-cosmic-pink-400 text-xs">✦</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Mobile safe area */}
              <div className="sm:hidden h-6 bg-[#0d0820]" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
})

StardustSelect.displayName = 'StardustSelect'

export default StardustSelect
