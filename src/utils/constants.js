// ═══════════════════════════════════════════════════════════════════
// 🌌 COSMIC SOUL READER - CONSTANTS
// ═══════════════════════════════════════════════════════════════════

export const APP_NAME = 'Cosmic Soul Reader'
export const APP_VERSION = '1.0.0'
export const APP_TAGLINE = 'Discover Your Celestial Destiny'

// ─────────────────────────────────────────
// Section Names
// ─────────────────────────────────────────
export const SECTIONS = {
  LOADER: 'loader',
  WELCOME: 'welcome',
  FORM: 'form',
  READING: 'reading',
  RESULTS: 'results',
}

// ─────────────────────────────────────────
// Form Steps
// ─────────────────────────────────────────
export const FORM_STEPS = {
  IDENTITY: 1,
  BIRTH: 2,
  SOUL: 3,
  RELATIONSHIP: 4,
}

export const FORM_STEP_LABELS = {
  1: 'Identity',
  2: 'Birth Chart',
  3: 'Soul Intent',
  4: 'Connections',
}

// ─────────────────────────────────────────
// Gender Options
// ─────────────────────────────────────────
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male', icon: '♂', color: '#74b9ff' },
  { value: 'female', label: 'Female', icon: '♀', color: '#fd79a8' },
  { value: 'nonbinary', label: 'Non-Binary', icon: '⚧', color: '#a29bfe' },
  { value: 'prefer-not', label: 'Prefer not to say', icon: '✦', color: '#ffd54f' },
]

// ─────────────────────────────────────────
// Month Options
// ─────────────────────────────────────────
export const MONTHS = [
  { value: 1, label: 'January', short: 'Jan', icon: '❄️' },
  { value: 2, label: 'February', short: 'Feb', icon: '💜' },
  { value: 3, label: 'March', short: 'Mar', icon: '🌱' },
  { value: 4, label: 'April', short: 'Apr', icon: '🌸' },
  { value: 5, label: 'May', short: 'May', icon: '🌺' },
  { value: 6, label: 'June', short: 'Jun', icon: '☀️' },
  { value: 7, label: 'July', short: 'Jul', icon: '🌊' },
  { value: 8, label: 'August', short: 'Aug', icon: '🌻' },
  { value: 9, label: 'September', short: 'Sep', icon: '🍂' },
  { value: 10, label: 'October', short: 'Oct', icon: '🎃' },
  { value: 11, label: 'November', short: 'Nov', icon: '🍁' },
  { value: 12, label: 'December', short: 'Dec', icon: '⛄' },
]

// ─────────────────────────────────────────
// Intention Options
// ─────────────────────────────────────────
export const INTENTIONS = [
  {
    value: 'love',
    label: 'Love & Romance',
    icon: '💖',
    color: '#fd79a8',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Explore your romantic destiny and heart connections',
  },
  {
    value: 'career',
    label: 'Career & Purpose',
    icon: '🚀',
    color: '#a29bfe',
    gradient: 'from-purple-500 to-indigo-500',
    description: 'Unlock your professional path and life mission',
  },
  {
    value: 'health',
    label: 'Health & Wellness',
    icon: '🌿',
    color: '#55efc4',
    gradient: 'from-emerald-500 to-teal-500',
    description: 'Discover holistic balance and vital energy',
  },
  {
    value: 'spiritual',
    label: 'Spiritual Growth',
    icon: '🔮',
    color: '#ffd54f',
    gradient: 'from-amber-500 to-yellow-500',
    description: 'Deepen your cosmic awareness and inner wisdom',
  },
  {
    value: 'wealth',
    label: 'Wealth & Abundance',
    icon: '💎',
    color: '#00cec9',
    gradient: 'from-cyan-500 to-blue-500',
    description: 'Attract prosperity and financial harmony',
  },
  {
    value: 'creativity',
    label: 'Creativity & Expression',
    icon: '🎨',
    color: '#ff7675',
    gradient: 'from-orange-500 to-red-500',
    description: 'Ignite your creative fire and artistic soul',
  },
]

// ─────────────────────────────────────────
// Mood Options
// ─────────────────────────────────────────
export const MOODS = [
  { value: 'peaceful', label: 'Peaceful', icon: '🌙', color: '#74b9ff' },
  { value: 'excited', label: 'Excited', icon: '✨', color: '#ffd54f' },
  { value: 'curious', label: 'Curious', icon: '🔮', color: '#a29bfe' },
  { value: 'seeking', label: 'Seeking', icon: '💫', color: '#fd79a8' },
  { value: 'anxious', label: 'Anxious', icon: '🌊', color: '#00cec9' },
  { value: 'hopeful', label: 'Hopeful', icon: '🌟', color: '#55efc4' },
  { value: 'reflective', label: 'Reflective', icon: '🪞', color: '#dfe6e9' },
  { value: 'passionate', label: 'Passionate', icon: '🔥', color: '#ff7675' },
]

// ─────────────────────────────────────────
// Relationship Status Options
// ─────────────────────────────────────────
export const RELATIONSHIP_STATUS = [
  { value: 'single', label: 'Single', icon: '🌟', description: 'Free spirit seeking cosmic connection' },
  { value: 'dating', label: 'Dating', icon: '💕', description: 'Exploring romantic possibilities' },
  { value: 'relationship', label: 'In a Relationship', icon: '💑', description: 'Bonded with a soul companion' },
  { value: 'married', label: 'Married', icon: '💍', description: 'United in cosmic partnership' },
  { value: 'complicated', label: "It's Complicated", icon: '🌀', description: 'Navigating complex energies' },
  { value: 'prefer-not', label: 'Prefer not to say', icon: '✦', description: 'Mystery is part of the journey' },
]

// ─────────────────────────────────────────
// Loading Messages
// ─────────────────────────────────────────
export const LOADING_MESSAGES = [
  'Aligning celestial coordinates...',
  'Reading the cosmic tapestry...',
  'Channeling stellar frequencies...',
  'Decoding your birth chart...',
  'Consulting the ancient stars...',
  'Weaving your destiny thread...',
  'Harmonizing planetary energies...',
  'Unlocking cosmic memories...',
  'Calibrating quantum resonance...',
  'Mapping your soul constellation...',
  'Interpreting lunar whispers...',
  'Synchronizing with the cosmos...',
  'Activating astral projection...',
  'Tuning into your vibration...',
  'Processing celestial data...',
]

// ─────────────────────────────────────────
// Zodiac Symbols Map
// ─────────────────────────────────────────
export const ZODIAC_SYMBOLS = {
  aries: '♈',
  taurus: '♉',
  gemini: '♊',
  cancer: '♋',
  leo: '♌',
  virgo: '♍',
  libra: '♎',
  scorpio: '♏',
  sagittarius: '♐',
  capricorn: '♑',
  aquarius: '♒',
  pisces: '♓',
}

// ─────────────────────────────────────────
// Element Icons
// ─────────────────────────────────────────
export const ELEMENT_ICONS = {
  fire: '🔥',
  earth: '🌍',
  air: '💨',
  water: '🌊',
}

// ─────────────────────────────────────────
// Animation Durations
// ─────────────────────────────────────────
export const ANIMATION_DURATIONS = {
  LOADER: 4000,
  TRANSITION: 800,
  CARD_REVEAL: 600,
  CARD_STAGGER: 200,
  READING_CALC: 5000,
}

// ─────────────────────────────────────────
// Breakpoints (matching Tailwind)
// ─────────────────────────────────────────
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
}

// ─────────────────────────────────────────
// Local Storage Keys
// ─────────────────────────────────────────
export const STORAGE_KEYS = {
  READINGS: 'cosmic_readings',
  SETTINGS: 'cosmic_settings',
  THEME: 'cosmic_theme',
  SOUND: 'cosmic_sound',
  LAST_READING: 'cosmic_last_reading',
}