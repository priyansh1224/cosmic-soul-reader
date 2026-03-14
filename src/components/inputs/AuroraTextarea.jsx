// ═══════════════════════════════════════════════════════════════════
// 🌈 AURORA TEXTAREA - Flowing Gradient Textarea
// ═══════════════════════════════════════════════════════════════════

import { useState, useRef, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'
import useSoundEffects from '@hooks/useSoundEffects'

const AuroraTextarea = memo(({
  label,
  name,
  value = '',
  onChange,
  onBlur,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  maxLength = 500,
  rows = 4,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef(null)
  const { playHover } = useSoundEffects()

  const hasValue = value && value.length > 0
  const charCount = value ? value.length : 0
  const charPercentage = (charCount / maxLength) * 100

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    playHover()
  }, [playHover])

  const handleBlur = useCallback((e) => {
    setIsFocused(false)
    onBlur?.(e)
  }, [onBlur])

  return (
    <div className={cn('relative', className)}>
      {/* Label */}
      {label && (
        <motion.label
          className={cn(
            'block text-sm font-body mb-2 tracking-wide transition-colors duration-300',
            isFocused ? 'text-cosmic-purple-400' : 'text-white/40',
          )}
          animate={{ x: isFocused ? 3 : 0 }}
        >
          {label}
          {required && <span className="text-cosmic-pink-400 ml-1">*</span>}
        </motion.label>
      )}

      {/* Textarea Container */}
      <div
        className={cn(
          'relative rounded-2xl overflow-hidden transition-all duration-500 ease-cosmic',
          'border-2',
          isFocused ? 'border-cosmic-purple-500' : error ? 'border-red-500/50' : 'border-white/10',
          isFocused ? 'bg-white/[0.06]' : 'bg-white/[0.03]',
          disabled && 'opacity-50',
        )}
        style={{
          boxShadow: isFocused
            ? '0 0 30px rgba(124,58,237,0.2), inset 0 0 15px rgba(124,58,237,0.03)'
            : 'none',
        }}
      >
        {/* Aurora border animation */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `
                linear-gradient(90deg, transparent, rgba(124,58,237,0.1), transparent) top/100% 1px no-repeat,
                linear-gradient(90deg, transparent, rgba(236,72,153,0.1), transparent) bottom/100% 1px no-repeat,
                linear-gradient(180deg, transparent, rgba(124,58,237,0.05), transparent) left/1px 100% no-repeat,
                linear-gradient(180deg, transparent, rgba(236,72,153,0.05), transparent) right/1px 100% no-repeat
              `,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            'w-full bg-transparent resize-none outline-none',
            'text-white text-base font-body leading-relaxed',
            'p-5 placeholder:text-white/20',
            disabled && 'cursor-not-allowed',
          )}
          {...props}
        />

        {/* Character Count Bar */}
        <div className="px-5 pb-3 flex items-center justify-between">
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden mr-3">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${charPercentage}%` }}
              transition={{ duration: 0.3 }}
              style={{
                background: charPercentage > 90
                  ? 'linear-gradient(90deg, #ff6b6b, #ee5a24)'
                  : charPercentage > 70
                    ? 'linear-gradient(90deg, #ffd54f, #ff8f00)'
                    : 'linear-gradient(90deg, #7c3aed, #ec4899)',
              }}
            />
          </div>
          <span className={cn(
            'text-xs font-tech transition-colors',
            charPercentage > 90 ? 'text-red-400' : charPercentage > 70 ? 'text-amber-400' : 'text-white/20',
          )}>
            {charCount}/{maxLength}
          </span>
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-400 font-body flex items-center gap-1.5 pl-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <span>⚠</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
})

AuroraTextarea.displayName = 'AuroraTextarea'

export default AuroraTextarea