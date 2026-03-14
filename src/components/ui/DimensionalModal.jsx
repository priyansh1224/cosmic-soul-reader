// ═══════════════════════════════════════════════════════════════════
// 🌀 DIMENSIONAL MODAL - Portal-Style Modal
// ═══════════════════════════════════════════════════════════════════

import { memo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import useCosmicStore from '@stores/useCosmicStore'
import { cn } from '@utils/helpers'

const DimensionalModal = memo(() => {
  const { isModalOpen, modalContent, closeModal } = useCosmicStore()

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [closeModal])

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-modal bg-cosmic-void/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className={cn(
                'pointer-events-auto relative',
                'w-full max-w-lg max-h-[85vh] overflow-y-auto',
                'bg-white/[0.03] backdrop-blur-3xl',
                'border border-white/10',
                'rounded-3xl p-8',
                'shadow-cosmic-lg',
                'scrollbar-hidden',
              )}
              initial={{
                scale: 0.5,
                opacity: 0,
                rotateX: 20,
                filter: 'blur(20px)',
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotateX: 0,
                filter: 'blur(0px)',
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                rotateX: -10,
                filter: 'blur(10px)',
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-none"
              >
                <HiX className="w-5 h-5" />
              </motion.button>

              {/* Aurora top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-aurora rounded-t-3xl" />

              {/* Content */}
              <div className="relative z-10">
                {modalContent}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})

DimensionalModal.displayName = 'DimensionalModal'

export default DimensionalModal