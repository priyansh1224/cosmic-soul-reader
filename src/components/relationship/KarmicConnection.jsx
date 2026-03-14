// ═══════════════════════════════════════════════════════════════════
// 🕯️ KARMIC CONNECTION - Past Life Bond Visualization
// ═══════════════════════════════════════════════════════════════════

import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { getPastLives } from '@data/pastLives'

const KarmicConnection = memo(({
  signId = 'aries',
  showTimeline = true,
  className = '',
}) => {
  const pastLives = getPastLives(signId)

  if (!pastLives || pastLives.length === 0) return null

  return (
    <motion.div
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.06] p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xl">🕯️</span>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Karmic Connections</h3>
            <p className="text-white/30 text-xs font-body">Echoes from your past lives</p>
          </div>
        </div>

        {/* ─── TIMELINE ─── */}
        {showTimeline && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cosmic-purple-500/30 via-cosmic-pink-500/20 to-cosmic-cyan-500/10" />

            {/* Past life entries */}
            <div className="space-y-6">
              {pastLives.map((life, i) => (
                <motion.div
                  key={i}
                  className="relative pl-14"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-[14px] top-2 w-6 h-6 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: `radial-gradient(circle, ${
                        ['#7c3aed', '#ec4899', '#06b6d4'][i % 3]
                      }40, transparent)`,
                      border: `2px solid ${['#7c3aed', '#ec4899', '#06b6d4'][i % 3]}60`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 5px ${['#7c3aed', '#ec4899', '#06b6d4'][i % 3]}30`,
                        `0 0 15px ${['#7c3aed', '#ec4899', '#06b6d4'][i % 3]}50`,
                        `0 0 5px ${['#7c3aed', '#ec4899', '#06b6d4'][i % 3]}30`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ['#7c3aed', '#ec4899', '#06b6d4'][i % 3] }}
                    />
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {/* Era & Role */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-tech tracking-wide"
                        style={{
                          backgroundColor: `${['#7c3aed', '#ec4899', '#06b6d4'][i % 3]}15`,
                          color: ['#7c3aed', '#ec4899', '#06b6d4'][i % 3],
                          border: `1px solid ${['#7c3aed', '#ec4899', '#06b6d4'][i % 3]}20`,
                        }}
                      >
                        {life.era}
                      </span>
                    </div>

                    <h4 className="font-display text-base font-semibold text-white/80 mb-1">
                      {life.role}
                    </h4>

                    {/* Lesson */}
                    <div className="flex items-start gap-2 mt-2">
                      <span className="text-cosmic-gold/60 text-xs mt-0.5">✦</span>
                      <p className="text-white/40 text-sm font-body italic leading-relaxed">
                        {life.lesson}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-cosmic-void/50 to-transparent pointer-events-none" />
          </div>
        )}

        {/* ─── KARMIC INSIGHT ─── */}
        <motion.div
          className="mt-6 pt-4 border-t border-white/[0.05] text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white/20 text-xs font-body mb-1 tracking-widest uppercase">
            Karmic Wisdom
          </p>
          <p className="text-white/40 text-sm font-body italic">
            Your soul carries the wisdom of {pastLives.length} documented past lives.
            Each experience has shaped the magnificent being you are today.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
})

KarmicConnection.displayName = 'KarmicConnection'

export default KarmicConnection