// ═══════════════════════════════════════════════════════════════════
// 🔊 AUDIO STORE - Cosmic Audio Engine
// ═══════════════════════════════════════════════════════════════════

import { create } from 'zustand'

// Generate synthetic sounds using Web Audio API
class CosmicAudioEngine {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.ambientNodes = null
    this.isPlaying = false
    this.initialized = false
  }

  init() {
    if (this.initialized) return

    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 0.3
      this.masterGain.connect(this.ctx.destination)
      this.initialized = true
    } catch (e) {
      console.warn('Web Audio API not available:', e)
    }
  }

  ensureContext() {
    if (!this.initialized) this.init()
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  playClick() {
    const audio = new Audio('/sounds/click.mp3')
    audio.volume = 0.4
    audio.play().catch(() => {})
  }

  playSuccess() {
    const audio = new Audio('/sounds/success.mp3')
    audio.volume = 0.5
    audio.play().catch(() => {})
  }

  playWhoosh() {
    const audio = new Audio('/sounds/whoosh.mp3')
    audio.volume = 0.4
    audio.play().catch(() => {})
  }

  startAmbient(src = '/sounds/ambient.mp3') {
    if (this.isPlaying) return
    if (!this.audioEl) {
      this.audioEl = new Audio(src)
      this.audioEl.loop = true
      this.audioEl.volume = 0
    }
    this.audioEl.play().catch(() => {})
    // Fade in over 3s
    let vol = 0
    clearInterval(this.fadeInterval)
    this.fadeInterval = setInterval(() => {
      vol = Math.min(0.35, vol + 0.01)
      if (this.audioEl) this.audioEl.volume = vol
      if (vol >= 0.35) clearInterval(this.fadeInterval)
    }, 100)
    this.isPlaying = true
  }

  startAmbientLegacy() {
    this.ensureContext()
    if (!this.ctx || this.isPlaying) return

    const ctx = this.ctx
    const now = ctx.currentTime
    const oscillators = []
    const gains = []

    // ── REVERB (convolver via impulse response) ──
    const reverbGain = ctx.createGain()
    reverbGain.gain.value = 0.25
    reverbGain.connect(this.masterGain)

    const reverbLen = ctx.sampleRate * 3
    const reverbBuf = ctx.createBuffer(2, reverbLen, ctx.sampleRate)
    for (let ch = 0; ch < 2; ch++) {
      const d = reverbBuf.getChannelData(ch)
      for (let i = 0; i < reverbLen; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2)
      }
    }
    const convolver = ctx.createConvolver()
    convolver.buffer = reverbBuf
    convolver.connect(reverbGain)

    // ── MASTER FILTER (slow breathing LFO) ──
    const masterFilter = ctx.createBiquadFilter()
    masterFilter.type = 'lowpass'
    masterFilter.frequency.value = 800
    masterFilter.Q.value = 1.5
    masterFilter.connect(this.masterGain)
    masterFilter.connect(convolver)

    const filterLfo = ctx.createOscillator()
    const filterLfoGain = ctx.createGain()
    filterLfo.type = 'sine'
    filterLfo.frequency.value = 0.05   // 20s cycle
    filterLfoGain.gain.value = 400
    filterLfo.connect(filterLfoGain)
    filterLfoGain.connect(masterFilter.frequency)
    filterLfo.start(now)
    oscillators.push(filterLfo)
    gains.push(filterLfoGain)

    // ── SUB BASS DRONE (A1 = 55Hz) with slow vibrato ──
    const subVibrato = ctx.createOscillator()
    const subVibratoGain = ctx.createGain()
    subVibrato.type = 'sine'
    subVibrato.frequency.value = 0.08
    subVibratoGain.gain.value = 0.4
    subVibrato.connect(subVibratoGain)
    subVibrato.start(now)
    oscillators.push(subVibrato)
    gains.push(subVibratoGain)

    const sub = ctx.createOscillator()
    const subGain = ctx.createGain()
    sub.type = 'sine'
    sub.frequency.value = 55
    subVibratoGain.connect(sub.frequency)
    subGain.gain.setValueAtTime(0, now)
    subGain.gain.linearRampToValueAtTime(0.06, now + 4)
    sub.connect(subGain)
    subGain.connect(masterFilter)
    sub.start(now)
    oscillators.push(sub)
    gains.push(subGain)

    // ── PAD CHORD: Am pentatonic (A2, E3, A3, C4) ──
    const padNotes = [110, 165, 220, 261.63]
    padNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = i === 0 ? 'sine' : 'triangle'
      osc.frequency.value = freq

      // Slight detune per voice for warmth
      osc.detune.value = (i % 2 === 0 ? 1 : -1) * (i * 3)

      g.gain.setValueAtTime(0, now)
      g.gain.linearRampToValueAtTime(0.022 - i * 0.003, now + 3 + i)
      osc.connect(g)
      g.connect(masterFilter)
      osc.start(now)
      oscillators.push(osc)
      gains.push(g)
    })

    // ── SLOW MELODY (pentatonic random walk) ──
    const melodyNotes = [220, 261.63, 329.63, 392, 440, 523.25]
    let melodyStep = 0
    const melodyOsc = ctx.createOscillator()
    const melodyGain = ctx.createGain()
    const melodyFilter = ctx.createBiquadFilter()
    melodyOsc.type = 'sine'
    melodyOsc.frequency.value = melodyNotes[0]
    melodyFilter.type = 'highpass'
    melodyFilter.frequency.value = 200
    melodyGain.gain.setValueAtTime(0, now)
    melodyGain.gain.linearRampToValueAtTime(0.018, now + 6)
    melodyOsc.connect(melodyFilter)
    melodyFilter.connect(melodyGain)
    melodyGain.connect(masterFilter)
    melodyOsc.start(now)
    oscillators.push(melodyOsc)
    gains.push(melodyGain)

    // Walk melody every 4-8 seconds
    const walkMelody = () => {
      if (!this.isPlaying) return
      const dir = Math.random() > 0.5 ? 1 : -1
      melodyStep = Math.max(0, Math.min(melodyNotes.length - 1, melodyStep + dir))
      const t = ctx.currentTime
      melodyOsc.frequency.setTargetAtTime(melodyNotes[melodyStep], t, 1.5)
      // Soft swell on each note
      melodyGain.gain.setTargetAtTime(0.025, t, 0.5)
      melodyGain.gain.setTargetAtTime(0.012, t + 2, 1)
      this.melodyTimer = setTimeout(walkMelody, 4000 + Math.random() * 4000)
    }
    this.melodyTimer = setTimeout(walkMelody, 5000)

    // ── SPACE NOISE (soft high-freq texture) ──
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const noiseData = noiseBuf.getChannelData(0)
    for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuf
    noiseSource.loop = true
    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'highpass'
    noiseFilter.frequency.value = 6000
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0, now)
    noiseGain.gain.linearRampToValueAtTime(0.012, now + 5)
    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(masterFilter)
    noiseSource.start(now)
    this.noiseSource = noiseSource
    gains.push(noiseGain)

    // ── SHIMMER OVERTONE (A5 = 880Hz, very soft) ──
    const shimmerLfo = ctx.createOscillator()
    const shimmerLfoGain = ctx.createGain()
    shimmerLfo.type = 'sine'
    shimmerLfo.frequency.value = 0.15
    shimmerLfoGain.gain.value = 0.003
    shimmerLfo.connect(shimmerLfoGain)
    shimmerLfo.start(now)
    oscillators.push(shimmerLfo)
    gains.push(shimmerLfoGain)

    const shimmer = ctx.createOscillator()
    const shimmerGain = ctx.createGain()
    shimmer.type = 'sine'
    shimmer.frequency.value = 880
    shimmerLfoGain.connect(shimmerGain.gain)
    shimmerGain.gain.setValueAtTime(0, now)
    shimmerGain.gain.linearRampToValueAtTime(0.006, now + 8)
    shimmer.connect(shimmerGain)
    shimmerGain.connect(masterFilter)
    shimmer.start(now)
    oscillators.push(shimmer)
    gains.push(shimmerGain)

    this.ambientNodes = { oscillators, gains }
    this.isPlaying = true
  }

  stopAmbient() {
    if (!this.isPlaying) return
    // Fade out audio element
    if (this.audioEl) {
      clearInterval(this.fadeInterval)
      let vol = this.audioEl.volume
      this.fadeInterval = setInterval(() => {
        vol = Math.max(0, vol - 0.02)
        if (this.audioEl) this.audioEl.volume = vol
        if (vol <= 0) {
          clearInterval(this.fadeInterval)
          if (this.audioEl) { this.audioEl.pause(); this.audioEl.currentTime = 0 }
        }
      }, 80)
    }
    // Also stop legacy synth nodes if any
    if (this.ambientNodes) {
      const now = this.ctx?.currentTime || 0
      if (this.melodyTimer) { clearTimeout(this.melodyTimer); this.melodyTimer = null }
      if (this.noiseSource) { try { this.noiseSource.stop() } catch (e) {} this.noiseSource = null }
      this.ambientNodes.gains?.forEach((g) => { try { g.gain.linearRampToValueAtTime(0, now + 1) } catch (e) {} })
      setTimeout(() => {
        this.ambientNodes?.oscillators?.forEach((o) => { try { o.stop() } catch (e) {} })
        this.ambientNodes = null
      }, 1100)
    }
    this.isPlaying = false
  }

  setVolume(value) {
    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(
        value,
        this.ctx.currentTime + 0.1
      )
    }
  }

  destroy() {
    this.stopAmbient()
    if (this.ctx) {
      this.ctx.close()
    }
  }
}

const audioEngine = new CosmicAudioEngine()

const useAudioStore = create((set, get) => ({
  isMuted: false,
  volume: 0.3,
  isAmbientPlaying: false,
  engine: audioEngine,

  // Legacy compatibility keys
  isPlaying: false,
  currentTrack: null,
  audioContext: null,
  sounds: {},

  SOUNDS: {
    CLICK: 'click',
    HOVER: 'hover',
    SUCCESS: 'success',
    WHOOSH: 'whoosh',
    COSMIC: 'cosmic',
    REVEAL: 'reveal',
    TRANSITION: 'transition',
    CHIME: 'chime',
    SPARKLE: 'sparkle',
    ERROR: 'error',
  },

  init: () => {
    audioEngine.init()
  },

  // Legacy compatibility
  initAudio: () => {
    audioEngine.init()
  },

  resumeAudio: () => {
    audioEngine.ensureContext()
  },

  toggleMute: () => {
    const muted = !get().isMuted
    set({ isMuted: muted })
    audioEngine.setVolume(muted ? 0 : get().volume)
    if (muted) {
      audioEngine.stopAmbient()
      set({ isAmbientPlaying: false })
    }
  },

  setVolume: (vol) => {
    set({ volume: Math.max(0, Math.min(1, vol)) })
    if (!get().isMuted) {
      audioEngine.setVolume(vol)
    }
  },

  playClick: () => {
    if (!get().isMuted) audioEngine.playClick()
  },

  playSuccess: () => {
    if (!get().isMuted) audioEngine.playSuccess()
  },

  playWhoosh: () => {
    if (!get().isMuted) audioEngine.playWhoosh()
  },

  // Legacy playSound that routes to new engine
  playSound: (soundType) => {
    if (get().isMuted) return
    switch (soundType) {
      case 'click':
      case 'hover':
      case 'sparkle':
        audioEngine.playClick()
        break
      case 'success':
      case 'reveal':
      case 'chime':
        audioEngine.playSuccess()
        break
      case 'whoosh':
      case 'transition':
      case 'cosmic':
        audioEngine.playWhoosh()
        break
      case 'error':
        audioEngine.playClick()
        break
      default:
        audioEngine.playClick()
    }
  },

  toggleAmbient: () => {
    if (get().isAmbientPlaying) {
      audioEngine.stopAmbient()
      set({ isAmbientPlaying: false, isPlaying: false })
    } else {
      if (!get().isMuted) {
        audioEngine.startAmbient()
        set({ isAmbientPlaying: true, isPlaying: true })
      }
    }
  },

  startAmbient: () => {
    if (!get().isMuted && !get().isAmbientPlaying) {
      audioEngine.startAmbient()
      set({ isAmbientPlaying: true, isPlaying: true })
    }
  },

  playAmbient: () => {
    if (!get().isMuted && !get().isAmbientPlaying) {
      audioEngine.startAmbient()
      set({ isAmbientPlaying: true, isPlaying: true })
    }
  },

  stopAmbient: () => {
    audioEngine.stopAmbient()
    set({ isAmbientPlaying: false, isPlaying: false })
  },
}))

export { useAudioStore }
export default useAudioStore