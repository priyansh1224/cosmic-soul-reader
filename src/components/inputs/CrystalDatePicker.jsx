// ═══════════════════════════════════════════════════════════════════
// 💎 CRYSTAL DATE PICKER - Mobile-Fixed 3-Part Date Input
// ═══════════════════════════════════════════════════════════════════

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'
import { MONTHS } from '@utils/constants'

// ── MOBILE DETECTION ──
const getIsMobile = () =>
  typeof window !== 'undefined' && (window.innerWidth < 640 || 'ontouchstart' in window)

const CrystalDatePicker = memo(({
  day = '',
  month = '',
  year = '',
  onDayChange,
  onMonthChange,
  onYearChange,
  errors = {},
  className = '',
}) => {
  const [focusedField, setFocusedField] = useState(null)
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false)
  const monthRef = useRef(null)
  const dropdownRef = useRef(null)
  const scrollPosRef = useRef(0)

  // ── LOCK BODY SCROLL when dropdown is open on mobile ──
  useEffect(() => {
    if (!monthDropdownOpen) return
    const isMobile = getIsMobile()
    if (!isMobile) return

    // Save scroll position and lock
    scrollPosRef.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'

    return () => {
      // Restore scroll
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollPosRef.current)
    }
  }, [monthDropdownOpen])

  // ── CLOSE ON OUTSIDE TAP/CLICK (handles both touch & mouse) ──
  useEffect(() => {
    if (!monthDropdownOpen) return

    const handleOutside = (e) => {
      const target = e.target
      if (
        monthRef.current && !monthRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setMonthDropdownOpen(false)
        setFocusedField(null)
      }
    }

    // Small delay to prevent the opening tap from immediately closing
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleOutside, true)
      document.addEventListener('touchstart', handleOutside, true)
    }, 50)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleOutside, true)
      document.removeEventListener('touchstart', handleOutside, true)
    }
  }, [monthDropdownOpen])

  // ── CLOSE ON ESCAPE KEY ──
  useEffect(() => {
    if (!monthDropdownOpen) return
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMonthDropdownOpen(false)
        setFocusedField(null)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [monthDropdownOpen])

  const handleDayChange = useCallback((e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2)
    if (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 31)) {
      onDayChange?.({ target: { name: 'day', value: val } })
    }
  }, [onDayChange])

  const handleYearChange = useCallback((e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    onYearChange?.({ target: { name: 'year', value: val } })
  }, [onYearChange])

  const selectMonth = useCallback((monthValue) => {
    onMonthChange?.({ target: { name: 'month', value: monthValue } })
    setMonthDropdownOpen(false)
    setFocusedField(null)
  }, [onMonthChange])

  const toggleDropdown = useCallback(() => {
    setMonthDropdownOpen((prev) => !prev)
    setFocusedField((prev) => (prev === 'month' ? null : 'month'))
  }, [])

  const selectedMonth = MONTHS.find((m) => m.value === parseInt(month))
  const hasError = errors.day || errors.month || errors.year

  return (
    <div className={className}>
      {/* ─── LABEL ─── */}
      <label className="block text-sm font-body text-white/40 mb-3 tracking-wide">
        Date of Birth <span className="text-cosmic-pink-400">*</span>
      </label>

      {/* ─── DATE FIELDS CONTAINER ─── */}
      <div className="flex gap-2 sm:gap-3">

        {/* ─── DAY ─── */}
        <motion.div
          className="relative flex-shrink-0 w-16 sm:w-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className={cn(
              'relative rounded-2xl border-2 overflow-hidden transition-all duration-500',
              focusedField === 'day'
                ? 'border-cosmic-purple-500 bg-cosmic-purple-500/5'
                : 'border-white/10 bg-white/[0.03]',
              errors.day && 'border-red-500/50',
            )}
            style={{
              boxShadow: focusedField === 'day'
                ? '0 0 20px rgba(124,58,237,0.2)'
                : 'none',
            }}
          >
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={day}
              onChange={handleDayChange}
              onFocus={() => setFocusedField('day')}
              onBlur={() => setFocusedField(null)}
              placeholder="DD"
              maxLength={2}
              autoComplete="off"
              className="w-full bg-transparent text-center text-white text-lg 
                         font-body pt-5 pb-2 px-2 outline-none 
                         placeholder:text-white/20"
            />
            <motion.span
              className="absolute top-1 left-0 right-0 text-center text-[10px] 
                         font-body pointer-events-none"
              animate={{
                color: focusedField === 'day'
                  ? 'rgba(124,58,237,0.8)'
                  : 'rgba(255,255,255,0.25)',
              }}
            >
              Day
            </motion.span>
          </div>
        </motion.div>

        {/* ─── SEPARATOR ─── */}
        <div className="flex items-center text-white/20 text-2xl font-thin pt-2">
          /
        </div>

        {/* ─── MONTH ─── */}
        <motion.div
          ref={monthRef}
          className="relative flex-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Trigger button */}
          <button
            type="button"
            onClick={toggleDropdown}
            className={cn(
              'w-full rounded-2xl border-2 overflow-hidden transition-all',
              'duration-500 text-left',
              focusedField === 'month' || monthDropdownOpen
                ? 'border-cosmic-pink-500 bg-cosmic-pink-500/5'
                : 'border-white/10 bg-white/[0.03]',
              errors.month && 'border-red-500/50',
            )}
            style={{
              boxShadow:
                focusedField === 'month' || monthDropdownOpen
                  ? '0 0 20px rgba(236,72,153,0.2)'
                  : 'none',
            }}
          >
            <div className="pt-5 pb-2 px-2 sm:px-4 flex items-center justify-between">
              <span
                className={cn(
                  'text-base sm:text-lg font-body truncate',
                  month ? 'text-white' : 'text-white/20',
                )}
              >
                {selectedMonth ? (
                  <span className="flex items-center gap-1 sm:gap-2">
                    <span className="text-sm sm:text-base">
                      {selectedMonth.icon}
                    </span>
                    <span>{selectedMonth.short}</span>
                  </span>
                ) : (
                  'Month'
                )}
              </span>
              <motion.span
                className="text-white/30 text-sm"
                animate={{ rotate: monthDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▾
              </motion.span>
            </div>
            <span
              className="absolute top-1 left-4 text-[10px] font-body 
                         pointer-events-none"
              style={{
                color:
                  focusedField === 'month'
                    ? 'rgba(236,72,153,0.8)'
                    : 'rgba(255,255,255,0.25)',
              }}
            >
              Month
            </span>
          </button>

          {/* ─── MOBILE: BOTTOM SHEET OVERLAY ─── */}
          {/* ─── DESKTOP: INLINE DROPDOWN ─── */}
          <AnimatePresence>
            {monthDropdownOpen && (
              <>
                {/* Mobile backdrop overlay */}
                <motion.div
                  className="fixed inset-0 bg-black/60 z-[9998] sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setMonthDropdownOpen(false)
                    setFocusedField(null)
                  }}
                />

                {/* Dropdown / Bottom Sheet */}
                <motion.div
                  ref={dropdownRef}
                  className={cn(
                    // ── MOBILE: bottom sheet ──
                    'fixed sm:absolute',
                    'bottom-0 left-0 right-0 sm:bottom-auto sm:left-auto sm:right-auto',
                    'sm:w-full sm:mt-2',
                    'z-[9999]',
                    'bg-[#0d0820] sm:bg-[#0a0612]',
                    'border-t sm:border border-white/10',
                    'rounded-t-3xl sm:rounded-2xl',
                    'overflow-hidden',
                  )}
                  initial={{
                    opacity: 0,
                    y: typeof window !== 'undefined' && window.innerWidth < 640
                      ? 300
                      : -8,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: typeof window !== 'undefined' && window.innerWidth < 640
                      ? 300
                      : -8,
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
                      Select Month
                    </h4>
                  </div>

                  {/* Month list */}
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
                    {MONTHS.map((m) => {
                      const isSelected = parseInt(month) === m.value
                      return (
                        <button
                          key={m.value}
                          type="button"
                          onClick={() => selectMonth(m.value)}
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
                          <span className="text-lg sm:text-base">{m.icon}</span>
                          <span className="font-body text-base sm:text-sm flex-1">
                            {m.label}
                          </span>
                          {isSelected && (
                            <span className="text-cosmic-pink-400 text-xs">✦</span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Mobile bottom safe area */}
                  <div className="sm:hidden h-6 bg-[#0d0820]" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─── SEPARATOR ─── */}
        <div className="flex items-center text-white/20 text-2xl font-thin pt-2">
          /
        </div>

        {/* ─── YEAR ─── */}
        <motion.div
          className="relative flex-shrink-0 w-20 sm:w-24"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className={cn(
              'relative rounded-2xl border-2 overflow-hidden transition-all duration-500',
              focusedField === 'year'
                ? 'border-cosmic-cyan-500 bg-cosmic-cyan-500/5'
                : 'border-white/10 bg-white/[0.03]',
              errors.year && 'border-red-500/50',
            )}
            style={{
              boxShadow: focusedField === 'year'
                ? '0 0 20px rgba(6,182,212,0.2)'
                : 'none',
            }}
          >
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={year}
              onChange={handleYearChange}
              onFocus={() => setFocusedField('year')}
              onBlur={() => setFocusedField(null)}
              placeholder="YYYY"
              maxLength={4}
              autoComplete="off"
              className="w-full bg-transparent text-center text-white text-lg 
                         font-body pt-5 pb-2 px-2 outline-none 
                         placeholder:text-white/20"
            />
            <motion.span
              className="absolute top-1 left-0 right-0 text-center text-[10px] 
                         font-body pointer-events-none"
              animate={{
                color: focusedField === 'year'
                  ? 'rgba(6,182,212,0.8)'
                  : 'rgba(255,255,255,0.25)',
              }}
            >
              Year
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* ─── ZODIAC PREVIEW ─── */}
      {day && month && <ZodiacPreview day={day} month={month} />}

      {/* ─── ERRORS ─── */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            className="mt-2 space-y-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {Object.entries(errors).map(([key, msg]) =>
              msg ? (
                <p
                  key={key}
                  className="text-sm text-red-400 font-body flex items-center 
                             gap-1.5 pl-1"
                >
                  <span>⚠</span> {msg}
                </p>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// ─── Zodiac Preview ───
const ZodiacPreview = memo(({ day, month }) => {
  const getQuickSign = (d, m) => {
    const dd = parseInt(d)
    const mm = parseInt(m)
    if (!dd || !mm) return null
    const signs = [
      { name: 'Capricorn', symbol: '♑', s: [12, 22], e: [1, 19] },
      { name: 'Aquarius', symbol: '♒', s: [1, 20], e: [2, 18] },
      { name: 'Pisces', symbol: '♓', s: [2, 19], e: [3, 20] },
      { name: 'Aries', symbol: '♈', s: [3, 21], e: [4, 19] },
      { name: 'Taurus', symbol: '♉', s: [4, 20], e: [5, 20] },
      { name: 'Gemini', symbol: '♊', s: [5, 21], e: [6, 20] },
      { name: 'Cancer', symbol: '♋', s: [6, 21], e: [7, 22] },
      { name: 'Leo', symbol: '♌', s: [7, 23], e: [8, 22] },
      { name: 'Virgo', symbol: '♍', s: [8, 23], e: [9, 22] },
      { name: 'Libra', symbol: '♎', s: [9, 23], e: [10, 22] },
      { name: 'Scorpio', symbol: '♏', s: [10, 23], e: [11, 21] },
      { name: 'Sagittarius', symbol: '♐', s: [11, 22], e: [12, 21] },
    ]
    for (const sign of signs) {
      if (
        (mm === sign.s[0] && dd >= sign.s[1]) ||
        (mm === sign.e[0] && dd <= sign.e[1])
      )
        return sign
    }
    return null
  }

  const sign = getQuickSign(day, month)
  if (!sign) return null

  return (
    <motion.div
      className="mt-3 flex items-center gap-2 pl-1"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-2xl">{sign.symbol}</span>
      <span className="text-sm font-body text-white/40">
        You are a{' '}
        <span className="text-cosmic-gold font-medium">{sign.name}</span>
      </span>
    </motion.div>
  )
})

CrystalDatePicker.displayName = 'CrystalDatePicker'
ZodiacPreview.displayName = 'ZodiacPreview'

export default CrystalDatePicker;