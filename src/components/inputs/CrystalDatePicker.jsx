// ═══════════════════════════════════════════════════════════════════
// 💎 CRYSTAL DATE PICKER - 3-Part Date Input with Crystal Effects
// ═══════════════════════════════════════════════════════════════════

import { memo, useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'
import { MONTHS } from '@utils/constants'
import useSoundEffects from '@hooks/useSoundEffects'

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
  const { playClick, playHover } = useSoundEffects()

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
    playClick()
  }, [onMonthChange, playClick])

  const selectedMonth = MONTHS.find(m => m.value === parseInt(month))
  const hasError = errors.day || errors.month || errors.year

  return (
    <div className={className}>
      {/* ─── LABEL ─── */}
      <label className="block text-sm font-body text-white/40 mb-3 tracking-wide">
        Date of Birth <span className="text-cosmic-pink-400">*</span>
      </label>

      {/* ─── DATE FIELDS CONTAINER ─── */}
      <div className="flex gap-3">
        {/* ─── DAY ─── */}
        <motion.div
          className="relative flex-shrink-0 w-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className={cn(
              'relative rounded-2xl border-2 overflow-hidden transition-all duration-500',
              focusedField === 'day' ? 'border-cosmic-purple-500 bg-cosmic-purple-500/5' : 'border-white/10 bg-white/[0.03]',
              errors.day && 'border-red-500/50',
            )}
            style={{
              boxShadow: focusedField === 'day' ? '0 0 20px rgba(124,58,237,0.2)' : 'none',
            }}
          >
            <input
              type="text"
              inputMode="numeric"
              value={day}
              onChange={handleDayChange}
              onFocus={() => { setFocusedField('day'); playHover() }}
              onBlur={() => setFocusedField(null)}
              placeholder="DD"
              maxLength={2}
              className="w-full bg-transparent text-center text-white text-lg font-body pt-5 pb-2 px-2 outline-none placeholder:text-white/20"
            />
            <motion.span
              className="absolute top-1 left-0 right-0 text-center text-[10px] font-body pointer-events-none"
              animate={{
                color: focusedField === 'day' ? 'rgba(124,58,237,0.8)' : 'rgba(255,255,255,0.25)',
              }}
            >
              Day
            </motion.span>
          </div>
        </motion.div>

        {/* ─── SEPARATOR ─── */}
        <div className="flex items-center text-white/20 text-2xl font-thin pt-2">/</div>

        {/* ─── MONTH ─── */}
        <motion.div
          ref={monthRef}
          className="relative flex-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            type="button"
            onClick={() => {
              setMonthDropdownOpen(!monthDropdownOpen)
              setFocusedField('month')
              playClick()
            }}
            className={cn(
              'w-full rounded-2xl border-2 overflow-hidden transition-all duration-500 text-left',
              focusedField === 'month' || monthDropdownOpen
                ? 'border-cosmic-pink-500 bg-cosmic-pink-500/5'
                : 'border-white/10 bg-white/[0.03]',
              errors.month && 'border-red-500/50',
            )}
            style={{
              boxShadow: focusedField === 'month' || monthDropdownOpen ? '0 0 20px rgba(236,72,153,0.2)' : 'none',
            }}
          >
            <div className="pt-5 pb-2 px-4 flex items-center justify-between">
              <span className={cn('text-lg font-body', month ? 'text-white' : 'text-white/20')}>
                {selectedMonth ? (
                  <span className="flex items-center gap-2">
                    <span>{selectedMonth.icon}</span>
                    <span>{selectedMonth.short}</span>
                  </span>
                ) : 'Month'}
              </span>
              <motion.span
                className="text-white/30 text-sm"
                animate={{ rotate: monthDropdownOpen ? 180 : 0 }}
              >
                ▾
              </motion.span>
            </div>
            <motion.span
              className="absolute top-1 left-4 text-[10px] font-body pointer-events-none"
              animate={{
                color: focusedField === 'month' ? 'rgba(236,72,153,0.8)' : 'rgba(255,255,255,0.25)',
              }}
            >
              Month
            </motion.span>
          </motion.button>

          {/* Month Dropdown */}
          <AnimatePresence>
            {monthDropdownOpen && (
              <motion.div
                className={cn(
                  'absolute z-50 w-full mt-2',
                  'bg-cosmic-abyss/95 backdrop-blur-2xl',
                  'border border-white/10 rounded-2xl',
                  'shadow-cosmic-lg overflow-hidden',
                  'max-h-48 overflow-y-auto scrollbar-hidden',
                )}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {MONTHS.map((m, i) => (
                  <motion.button
                    key={m.value}
                    type="button"
                    onClick={() => selectMonth(m.value)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left cursor-none',
                      'transition-colors duration-150',
                      parseInt(month) === m.value
                        ? 'bg-cosmic-pink-500/10 text-white'
                        : 'text-white/60 hover:bg-white/5 hover:text-white',
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <span>{m.icon}</span>
                    <span className="font-body text-sm">{m.label}</span>
                    {parseInt(month) === m.value && (
                      <span className="ml-auto text-cosmic-pink-400 text-xs">✦</span>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─── SEPARATOR ─── */}
        <div className="flex items-center text-white/20 text-2xl font-thin pt-2">/</div>

        {/* ─── YEAR ─── */}
        <motion.div
          className="relative flex-shrink-0 w-24"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className={cn(
              'relative rounded-2xl border-2 overflow-hidden transition-all duration-500',
              focusedField === 'year' ? 'border-cosmic-cyan-500 bg-cosmic-cyan-500/5' : 'border-white/10 bg-white/[0.03]',
              errors.year && 'border-red-500/50',
            )}
            style={{
              boxShadow: focusedField === 'year' ? '0 0 20px rgba(6,182,212,0.2)' : 'none',
            }}
          >
            <input
              type="text"
              inputMode="numeric"
              value={year}
              onChange={handleYearChange}
              onFocus={() => { setFocusedField('year'); playHover() }}
              onBlur={() => setFocusedField(null)}
              placeholder="YYYY"
              maxLength={4}
              className="w-full bg-transparent text-center text-white text-lg font-body pt-5 pb-2 px-2 outline-none placeholder:text-white/20"
            />
            <motion.span
              className="absolute top-1 left-0 right-0 text-center text-[10px] font-body pointer-events-none"
              animate={{
                color: focusedField === 'year' ? 'rgba(6,182,212,0.8)' : 'rgba(255,255,255,0.25)',
              }}
            >
              Year
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* ─── ZODIAC PREVIEW ─── */}
      {day && month && (
        <ZodiacPreview day={day} month={month} />
      )}

      {/* ─── ERRORS ─── */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            className="mt-2 space-y-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {Object.entries(errors).map(([key, msg]) => (
              msg && (
                <p key={key} className="text-sm text-red-400 font-body flex items-center gap-1.5 pl-1">
                  <span>⚠</span> {msg}
                </p>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// Mini Zodiac Preview Component
const ZodiacPreview = memo(({ day, month }) => {
  // Quick zodiac lookup
  const getQuickSign = (d, m) => {
    const dd = parseInt(d); const mm = parseInt(m)
    if (!dd || !mm) return null
    const signs = [
      { name: 'Capricorn', symbol: '♑', s: [12,22], e: [1,19] },
      { name: 'Aquarius', symbol: '♒', s: [1,20], e: [2,18] },
      { name: 'Pisces', symbol: '♓', s: [2,19], e: [3,20] },
      { name: 'Aries', symbol: '♈', s: [3,21], e: [4,19] },
      { name: 'Taurus', symbol: '♉', s: [4,20], e: [5,20] },
      { name: 'Gemini', symbol: '♊', s: [5,21], e: [6,20] },
      { name: 'Cancer', symbol: '♋', s: [6,21], e: [7,22] },
      { name: 'Leo', symbol: '♌', s: [7,23], e: [8,22] },
      { name: 'Virgo', symbol: '♍', s: [8,23], e: [9,22] },
      { name: 'Libra', symbol: '♎', s: [9,23], e: [10,22] },
      { name: 'Scorpio', symbol: '♏', s: [10,23], e: [11,21] },
      { name: 'Sagittarius', symbol: '♐', s: [11,22], e: [12,21] },
    ]
    for (const sign of signs) {
      if ((mm === sign.s[0] && dd >= sign.s[1]) || (mm === sign.e[0] && dd <= sign.e[1])) {
        return sign
      }
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
      <motion.span
        className="text-2xl"
        animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 0.6 }}
      >
        {sign.symbol}
      </motion.span>
      <span className="text-sm font-body text-white/40">
        You are a <span className="text-cosmic-gold font-medium">{sign.name}</span>
      </span>
    </motion.div>
  )
})

CrystalDatePicker.displayName = 'CrystalDatePicker'
ZodiacPreview.displayName = 'ZodiacPreview'

export default CrystalDatePicker