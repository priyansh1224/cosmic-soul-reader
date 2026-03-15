// ═══════════════════════════════════════════════════════════════════
// 🕉️ COSMIC SOUL READER - COMPLETE VEDIC JYOTISH RASHI DATABASE
// Based on authentic Drik Panchang Nakshatra-Rashi mapping
// ═══════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────
// 🔤 NAKSHATRA-BASED NAME SYLLABLE → RASHI MAPPING
// Each Rashi is determined by the first syllable of the birth name
// as per Vedic Jyotish tradition
// ─────────────────────────────────────────────────────────────────

const RASHI_NAME_MAP = {
  // ═══ MESHA (Aries) ═══
  // Primary: अ (A), ल (L), इ (E/I)
  // Nakshatra syllables: Chu, Che, Cho, Laa, Li, Loo, Le, Lo, A
  mesha: {
    primary: ['a', 'l', 'e', 'i'],
    syllables: [
      'chu', 'che', 'cho',
      'laa', 'la', 'li', 'lee', 'loo', 'lu', 'le', 'lo',
      'a', 'aa', 'ai', 'ee',
    ],
    hindi: ['अ', 'ल', 'इ'],
    hindiSyllables: ['चू', 'चे', 'चो', 'ला', 'ली', 'लू', 'ले', 'लो', 'अ'],
  },

  // ═══ VRISHABHA (Taurus) ═══
  // Primary: ब (B/Ba), व (V/Va), उ (U)
  // Nakshatra syllables: Ee, U, E, O, Vaa, Vee, Vu, Ve, Vo
  vrishabha: {
    primary: ['b', 'v', 'u', 'w'],
    syllables: [
      'ba', 'bee', 'bi', 'bu', 'boo', 'be', 'bo',
      'va', 'vaa', 'vee', 'vi', 'vu', 'voo', 've', 'vo',
      'wa', 'wee', 'wi', 'wu',
      'u', 'oo',
      'ee', 'o',
    ],
    hindi: ['ब', 'व', 'उ'],
    hindiSyllables: ['ई', 'उ', 'ए', 'ओ', 'वा', 'वी', 'वू', 'वे', 'वो'],
  },

  // ═══ MITHUNA (Gemini) ═══
  // Primary: क (K/Ka), छ (Chh), घ (Gh)
  // Nakshatra syllables: Kaa, Kee, Ku, Gha, Ing, Chha, Ke, Ko, Haa
  mithuna: {
    primary: ['k', 'chh', 'gh'],
    syllables: [
      'ka', 'kaa', 'kee', 'ki', 'ku', 'koo', 'ke', 'ko',
      'chha', 'chhe', 'chhi', 'chho', 'chhu',
      'gha', 'ghee', 'ghi', 'gho', 'ghu',
      'ing',
      'haa',
    ],
    hindi: ['क', 'छ', 'घ'],
    hindiSyllables: ['का', 'की', 'कु', 'घ', 'इं', 'छ', 'के', 'को', 'हा'],
  },

  // ═══ KARKA (Cancer) ═══
  // Primary: ड (D/Da), ह (H/Ha)
  // Nakshatra syllables: Hee, Hu, He, Ho, Daa, Dee, Doo, De, Do
  karka: {
    primary: ['d', 'h'],
    syllables: [
      'da', 'daa', 'dee', 'di', 'doo', 'du', 'de', 'do',
      'ha', 'hee', 'hi', 'hu', 'hoo', 'he', 'ho',
    ],
    hindi: ['ड', 'ह'],
    hindiSyllables: ['ही', 'हु', 'हे', 'हो', 'डा', 'डी', 'डू', 'डे', 'डो'],
  },

  // ═══ SIMHA (Leo) ═══
  // Primary: म (M/Ma), ट (T/Ta)
  // Nakshatra syllables: Maa, Mee, Moo, Me, Mo, Taa, Tee, Too, Te
  simha: {
    primary: ['m', 't'],
    syllables: [
      'ma', 'maa', 'mee', 'mi', 'moo', 'mu', 'me', 'mo',
      'ta', 'taa', 'tee', 'ti', 'too', 'tu', 'te',
    ],
    hindi: ['म', 'ट'],
    hindiSyllables: ['मा', 'मी', 'मू', 'मे', 'मो', 'टा', 'टी', 'टू', 'टे'],
  },

  // ═══ KANYA (Virgo) ═══
  // Primary: प (P/Pa), ठ (Th/Tha), ण (N/Na)
  // Nakshatra syllables: To, Paa, Pee, Poo, Sha, Na, Tha, Pe, Po
  kanya: {
    primary: ['p', 'th', 'n'],
    syllables: [
      'pa', 'paa', 'pee', 'pi', 'poo', 'pu', 'pe', 'po',
      'tha', 'thee', 'thi', 'tho', 'thu',
      'na', 'naa', 'nee', 'ni', 'noo', 'nu',
      'sha',
      'to',
    ],
    hindi: ['प', 'ठ', 'ण'],
    hindiSyllables: ['टो', 'पा', 'पी', 'पू', 'ष', 'ण', 'ठ', 'पे', 'पो'],
  },

  // ═══ TULA (Libra) ═══
  // Primary: र (R/Ra), त (T/Ta)
  // Nakshatra syllables: Raa, Ree, Roo, Re, Ro, Taa, Tee, Too, Te
  tula: {
    primary: ['r'],
    syllables: [
      'ra', 'raa', 'ree', 'ri', 'roo', 'ru', 're', 'ro',
      'taa', 'tee', 'too',
    ],
    hindi: ['र', 'त'],
    hindiSyllables: ['रा', 'री', 'रू', 'रे', 'रो', 'ता', 'ती', 'तू', 'ते'],
  },

  // ═══ VRISHCHIKA (Scorpio) ═══
  // Primary: न (N/Na), य (Y/Ya)
  // Nakshatra syllables: To, Naa, Nee, Noo, Ne, No, Yaa, Yee, Yu
  vrishchika: {
    primary: ['n', 'y'],
    syllables: [
      'naa', 'ne', 'nee', 'no', 'noo', 'nu',
      'ya', 'yaa', 'yee', 'yi', 'yu', 'yoo',
      'to',
    ],
    hindi: ['न', 'य'],
    hindiSyllables: ['तो', 'ना', 'नी', 'नू', 'ने', 'नो', 'या', 'यी', 'यू'],
  },

  // ═══ DHANU (Sagittarius) ═══
  // Primary: भ (Bh/Bha), ध (Dh/Dha), फ (Ph/Pha), ढ (Dha)
  // Nakshatra syllables: Ye, Yo, Bhaa, Bhee, Bhoo, Dhaa, Phaa, Dha, Bhe
  dhanu: {
    primary: ['bh', 'dh', 'ph', 'f'],
    syllables: [
      'ye', 'yo',
      'bha', 'bhaa', 'bhee', 'bhi', 'bhoo', 'bhu', 'bhe', 'bho',
      'dha', 'dhaa', 'dhee', 'dhi', 'dhoo', 'dhu',
      'pha', 'phaa', 'phee', 'phi', 'phoo', 'phu',
      'fa', 'fee', 'fi', 'fo', 'fu',
    ],
    hindi: ['भ', 'ध', 'फ', 'ढ'],
    hindiSyllables: ['ये', 'यो', 'भा', 'भी', 'भू', 'धा', 'फा', 'ढ', 'भे'],
  },

  // ═══ MAKARA (Capricorn) ═══
  // Primary: ख (Kh/Kha), ज (J/Ja)
  // Nakshatra syllables: Bho, Jaa, Jee, Khee, Khoo, Gaa, Gee
  makara: {
    primary: ['kh', 'j'],
    syllables: [
      'bho',
      'ja', 'jaa', 'jee', 'ji', 'joo', 'ju', 'je', 'jo',
      'kha', 'khaa', 'khee', 'khi', 'khoo', 'khu', 'khe', 'kho',
      'gaa', 'gee', 'gi',
    ],
    hindi: ['ख', 'ज'],
    hindiSyllables: ['भो', 'जा', 'जी', 'खी', 'खू', 'गा', 'गी'],
  },

  // ═══ KUMBHA (Aquarius) ═══
  // Primary: ग (G/Ga), श (Sh/Sha), ष (Sh), स (S/Sa)
  // Nakshatra syllables: Gu, Ge, Go, Saa, See, Soo, Se, Daa
  kumbha: {
    primary: ['g', 's', 'sh'],
    syllables: [
      'ga', 'gu', 'goo', 'ge', 'go',
      'sa', 'saa', 'see', 'si', 'soo', 'su', 'se', 'so',
      'sha', 'shaa', 'shee', 'shi', 'shoo', 'shu', 'she', 'sho',
      'daa',
    ],
    hindi: ['ग', 'श', 'ष', 'स'],
    hindiSyllables: ['गु', 'गे', 'गो', 'सा', 'सी', 'सू', 'से', 'दा'],
  },

  // ═══ MEENA (Pisces) ═══
  // Primary: द (D/Da), च (Ch/Cha), झ (Jh/Jha), थ (Th/Tha)
  // Nakshatra syllables: Dee, Doo, Tha, Jha, Yna, De, Do, Cha, Chee
  meena: {
    primary: ['ch', 'jh', 'th'],
    syllables: [
      'dee', 'di', 'doo', 'du', 'de', 'do',
      'cha', 'chaa', 'chee', 'chi', 'choo', 'chu', 'che', 'cho',
      'jha', 'jhee', 'jhi', 'jhoo', 'jhu',
      'tha', 'thaa', 'thee', 'thi', 'thoo', 'thu',
    ],
    hindi: ['द', 'च', 'झ', 'थ'],
    hindiSyllables: ['दी', 'दू', 'थ', 'झ', 'ञ', 'दे', 'दो', 'चा', 'ची'],
  },
}

// ═══════════════════════════════════════════════════════════════════
// 🕉️ COMPLETE VEDIC ZODIAC SIGNS DATABASE
// ═══════════════════════════════════════════════════════════════════

export const ZODIAC_SIGNS = {
  mesha: {
    id: 'mesha',
    westernId: 'aries',
    symbol: '♈',
    name: 'Mesha',
    westernName: 'Aries',
    hindiName: 'मेष',
    latinName: 'Aries',
    dates: 'March 21 - April 19',
    nameLetters: 'A, L, E | अ, ल, इ',
    nameLettersDetailed: 'Chu, Che, Cho, Laa, Li, Loo, Le, Lo, A',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    season: 'Vasant (Spring)',

    // Element & Modality
    element: 'Agni (Fire)',
    elementIcon: '🔥',
    elementType: 'fire',
    quality: 'Chara (Cardinal)',
    polarity: 'Positive (Yang)',
    vedicGuna: 'Rajas',

    // Celestial Bodies
    rulingPlanet: 'Mangal (Mars)',
    rulingPlanetSymbol: '♂',
    planetDescription: 'Mangal bestows courage, warrior energy, and fearless determination upon Mesha natives',
    decanRulers: ['Mangal (Mars)', 'Surya (Sun)', 'Guru (Jupiter)'],
    exaltedPlanet: 'Surya (Sun)',
    detrimentPlanet: 'Shukra (Venus)',
    fallPlanet: 'Shani (Saturn)',
    nakshatras: ['Ashwini', 'Bharani', 'Krittika (1st pada)'],

    // Lucky Items
    luckyNumbers: [1, 8, 17, 9, 27],
    luckyColor: 'Laal (Red)',
    luckyColors: ['#FF4136', '#FF6B6B', '#C0392B', '#E74C3C'],
    luckyGem: 'Moonga (Red Coral)',
    luckyGemEmoji: '🔴',
    luckyFlower: 'Honeysuckle',
    luckyFlowerEmoji: '🌺',
    luckyDay: 'Mangalvar (Tuesday)',
    luckyMetal: 'Loha (Iron)',
    luckyAnimal: 'Mesha (Ram)',
    luckyAnimalEmoji: '🐏',
    luckyDirection: 'Poorv (East)',
    luckyDeity: 'Lord Kartikeya / Hanuman',

    // Personality
    personality: 'Bold, ambitious, and fearlessly confident, Mesha charges through life with the unstoppable force of a cosmic wildfire. As the first Rashi of the zodiac, you are a natural-born pioneer who thrives on challenge and adventure. Ruled by Mangal (Mars), your inner fire burns with an intensity that inspires everyone around you. You possess an innate courage that allows you to face any obstacle head-on, turning impossible dreams into reality with sheer willpower and determination. The Vedic scriptures say Mesha natives carry the spark of creation itself.',

    strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate', 'Natural Leader'],
    weaknesses: ['Impatient', 'Impulsive', 'Short-tempered', 'Aggressive', 'Self-centered', 'Competitive'],

    loveStyle: 'In love, Mesha burns with an all-consuming passion that lights up any room. You pursue your romantic interests with fierce determination and unapologetic directness. Your ideal partner must match your energy and never try to tame your wild spirit. When you fall in love, you fall hard and fast, showering your partner with attention and grand romantic gestures.',

    careerPath: 'Natural-born leaders, Mesha natives excel in roles that demand quick thinking, bold action, and pioneering vision. You thrive in competitive environments and are drawn to careers in entrepreneurship, athletics, military, emergency services, and leadership positions.',

    healthFocus: 'As the ruler of the head, Mesha should pay attention to headaches, migraines, and stress-related tension. Your high-energy nature demands regular physical exercise. Combat sports, running, and competitive athletics are ideal outlets.',

    spiritualPath: 'Your spiritual journey is about learning to channel your tremendous Agni (fire) energy with wisdom and patience. Hanuman Chalisa and Mars-related mantras are transformative for you. Your lesson is discovering that true strength lies in knowing when to pause and listen to the universe.',

    lifeLesson: 'Learning that true courage includes vulnerability, and that patience is not weakness but profound strength.',

    mantra: 'ॐ अं अंगारकाय नमः | Om Ang Angarakaya Namah',
    vedanticWisdom: 'The fire that burns within you is the same divine fire that creates universes. Channel it wisely.',

    // Compatibility
    compatibility: {
      best: ['Simha', 'Dhanu', 'Mithuna', 'Kumbha'],
      good: ['Mesha', 'Tula'],
      challenging: ['Karka', 'Makara', 'Kanya'],
    },

    compatibilityDetails: {
      Simha: { score: 95, description: 'A blazing inferno of passion and mutual admiration. Two Agni Rashis conquering worlds together.' },
      Dhanu: { score: 93, description: 'Adventure partners who fuel each other\'s wanderlust and philosophical fire.' },
      Mithuna: { score: 88, description: 'Electric chemistry with endless conversation and spontaneous adventures.' },
      Kumbha: { score: 85, description: 'Revolutionary partners who challenge each other to grow beyond limits.' },
      Mesha: { score: 80, description: 'Double fire means double passion, but watch out for power struggles.' },
      Tula: { score: 75, description: 'Opposites attract — your fire balanced by their air creates a mesmerizing dance.' },
      Karka: { score: 45, description: 'Your fire can overwhelm their water. Requires patience and understanding.' },
      Makara: { score: 50, description: 'Both Chara Rashis fighting for control. Compromise is the key.' },
    },

    // Tarot & Mystical
    tarotCard: 'The Emperor',
    tarotDescription: 'Represents authority, structure, and the power to build empires from vision.',
    bodyPart: 'Head & Face',
    house: 'First Bhava - Self & Identity',
    yearlyTheme: 'A year of bold beginnings and courageous leaps of faith.',
  },

  vrishabha: {
    id: 'vrishabha',
    westernId: 'taurus',
    symbol: '♉',
    name: 'Vrishabha',
    westernName: 'Taurus',
    hindiName: 'वृषभ',
    latinName: 'Taurus',
    dates: 'April 20 - May 20',
    nameLetters: 'B, V, U | ब, व, उ',
    nameLettersDetailed: 'Ee, U, E, O, Vaa, Vee, Vu, Ve, Vo',
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20,
    season: 'Vasant (Spring)',

    element: 'Prithvi (Earth)', elementIcon: '🌍', elementType: 'earth',
    quality: 'Sthira (Fixed)', polarity: 'Negative (Yin)', vedicGuna: 'Rajas',

    rulingPlanet: 'Shukra (Venus)', rulingPlanetSymbol: '♀',
    planetDescription: 'Shukra blesses you with love for beauty, luxury, and sensual pleasures',
    decanRulers: ['Shukra (Venus)', 'Budh (Mercury)', 'Shani (Saturn)'],
    exaltedPlanet: 'Chandra (Moon)', detrimentPlanet: 'Mangal (Mars)',
    fallPlanet: 'Rahu', nakshatras: ['Krittika (2-4 pada)', 'Rohini', 'Mrigashira (1-2 pada)'],

    luckyNumbers: [2, 6, 9, 12, 24], luckyColor: 'Hara (Green)',
    luckyColors: ['#2ecc71', '#55efc4', '#27ae60', '#00b894'],
    luckyGem: 'Heera (Diamond)', luckyGemEmoji: '💎',
    luckyFlower: 'Gulab (Rose)', luckyFlowerEmoji: '🌹',
    luckyDay: 'Shukravar (Friday)', luckyMetal: 'Tamba (Copper)',
    luckyAnimal: 'Bail (Bull)', luckyAnimalEmoji: '🐂',
    luckyDirection: 'Dakshin (South)', luckyDeity: 'Goddess Lakshmi',

    personality: 'Steadfast, sensual, and magnificently grounded, Vrishabha embodies the enduring strength of Prithvi (Earth) itself. Ruled by Shukra (Venus), you possess an innate appreciation for beauty, comfort, and the finer things in life. Your determination is legendary; once you set your mind to something, nothing in the universe can move you from your path. The Vedic texts describe Vrishabha as the foundation upon which great things are built.',

    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable', 'Sensual', 'Artistic'],
    weaknesses: ['Stubborn', 'Possessive', 'Materialistic', 'Resistant to change', 'Self-indulgent', 'Inflexible'],

    loveStyle: 'In romance, Vrishabha is the ultimate devoted partner who loves with unwavering constancy. You express love through physical touch, beautiful gifts, and creating a luxurious haven for your beloved.',

    careerPath: 'With your natural eye for beauty and practical wisdom, Vrishabha thrives in finance, art, music, cooking, architecture, real estate, and luxury goods.',

    healthFocus: 'As the ruler of the throat and neck, Vrishabha should care for these areas. Balance your earthy pleasures with regular movement in nature.',

    spiritualPath: 'Your spiritual journey involves learning that true security comes from within. Earth-based rituals, crystal work, and Lakshmi mantras align with your Shukra-ruled soul.',

    lifeLesson: 'Discovering that change is not your enemy but your greatest teacher.',
    mantra: 'ॐ शुं शुक्राय नमः | Om Shum Shukraya Namah',
    vedanticWisdom: 'Like the sacred bull Nandi, your devotion and patience carry divine power.',

    compatibility: {
      best: ['Kanya', 'Makara', 'Karka', 'Meena'],
      good: ['Vrishabha', 'Vrishchika'],
      challenging: ['Simha', 'Kumbha', 'Dhanu'],
    },

    compatibilityDetails: {
      Kanya: { score: 95, description: 'A harmonious Prithvi connection built on mutual respect and practical love.' },
      Makara: { score: 93, description: 'Empire builders together. Your combined determination is unstoppable.' },
      Karka: { score: 90, description: 'A nurturing, deeply emotional bond that creates the coziest love nest.' },
      Meena: { score: 87, description: 'Earth meets water in a beautifully creative and emotionally rich union.' },
      Simha: { score: 48, description: 'Both Sthira Rashis wanting to lead. Dramatic and challenging.' },
      Kumbha: { score: 40, description: 'Your need for stability clashes with their need for freedom.' },
    },

    tarotCard: 'The Hierophant', bodyPart: 'Throat & Neck',
    house: 'Second Bhava - Dhana & Values',
    yearlyTheme: 'A year of building foundations and enjoying the fruits of patience.',
  },

  mithuna: {
    id: 'mithuna',
    westernId: 'gemini',
    symbol: '♊',
    name: 'Mithuna',
    westernName: 'Gemini',
    hindiName: 'मिथुन',
    dates: 'May 21 - June 20',
    nameLetters: 'K, Chh, Gh | क, छ, घ',
    nameLettersDetailed: 'Kaa, Kee, Ku, Gha, Ing, Chha, Ke, Ko, Haa',
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20,
    season: 'Grishma (Summer)',

    element: 'Vayu (Air)', elementIcon: '💨', elementType: 'air',
    quality: 'Dvisvabhava (Mutable)', polarity: 'Positive (Yang)', vedicGuna: 'Rajas',

    rulingPlanet: 'Budh (Mercury)', rulingPlanetSymbol: '☿',
    planetDescription: 'Budh gifts you with quicksilver wit, communication mastery, and intellectual brilliance',
    decanRulers: ['Budh (Mercury)', 'Shukra (Venus)', 'Shani (Saturn)'],
    exaltedPlanet: 'Rahu', detrimentPlanet: 'Guru (Jupiter)',
    fallPlanet: 'Ketu', nakshatras: ['Mrigashira (3-4 pada)', 'Ardra', 'Punarvasu (1-3 pada)'],

    luckyNumbers: [3, 5, 7, 12, 23], luckyColor: 'Peela (Yellow)',
    luckyColors: ['#fdcb6e', '#ffeaa7', '#f1c40f', '#f39c12'],
    luckyGem: 'Panna (Emerald)', luckyGemEmoji: '💚',
    luckyFlower: 'Lavender', luckyFlowerEmoji: '💜',
    luckyDay: 'Budhvar (Wednesday)', luckyMetal: 'Paara (Mercury)',
    luckyAnimal: 'Titli (Butterfly)', luckyAnimalEmoji: '🦋',
    luckyDirection: 'Paschim (West)', luckyDeity: 'Lord Vishnu',

    personality: 'Brilliantly versatile and endlessly curious, Mithuna is the cosmic messenger who dances between worlds with effortless grace. Ruled by Budh (Mercury), your mind moves at the speed of light. The Twins symbol reflects your ability to see every situation from multiple perspectives simultaneously.',

    strengths: ['Adaptable', 'Versatile', 'Communicative', 'Witty', 'Intellectual', 'Youthful', 'Curious', 'Quick-witted'],
    weaknesses: ['Inconsistent', 'Indecisive', 'Superficial', 'Nervous', 'Restless', 'Gossipy'],

    loveStyle: 'Mithuna needs a partner who can keep up with their lightning-fast mind. You fall in love with someone\'s intellect first. Conversation is your foreplay.',
    careerPath: 'Born communicators, excelling in writing, journalism, teaching, sales, and social media.',
    healthFocus: 'Ruling the arms, hands, and lungs. Yoga and swimming help calm your active mind.',
    spiritualPath: 'Learning to quiet the mind through Budh mantras, journaling, and breathwork.',
    lifeLesson: 'Understanding that depth is not the enemy of breadth.',
    mantra: 'ॐ बुं बुधाय नमः | Om Bum Budhaya Namah',
    vedanticWisdom: 'Like Budh (Mercury), you bridge heaven and earth through the power of communication.',

    compatibility: {
      best: ['Tula', 'Kumbha', 'Mesha', 'Simha'],
      good: ['Mithuna', 'Dhanu'],
      challenging: ['Kanya', 'Meena', 'Vrishchika'],
    },

    compatibilityDetails: {
      Tula: { score: 93, description: 'Intellectual soulmates creating an endless dialogue of beauty and ideas.' },
      Kumbha: { score: 92, description: 'A meeting of brilliant minds that sparks revolution.' },
      Mesha: { score: 88, description: 'Fast-paced excitement exploring new territories.' },
      Simha: { score: 85, description: 'A dazzling social power couple.' },
    },

    tarotCard: 'The Lovers', bodyPart: 'Arms, Hands & Lungs',
    house: 'Third Bhava - Communication & Siblings',
    yearlyTheme: 'A year of powerful connections and transformative conversations.',
  },

  karka: {
    id: 'karka',
    westernId: 'cancer',
    symbol: '♋',
    name: 'Karka',
    westernName: 'Cancer',
    hindiName: 'कर्क',
    dates: 'June 21 - July 22',
    nameLetters: 'D, H | ड, ह',
    nameLettersDetailed: 'Hee, Hu, He, Ho, Daa, Dee, Doo, De, Do',
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22,
    season: 'Grishma/Varsha (Summer/Monsoon)',

    element: 'Jal (Water)', elementIcon: '🌊', elementType: 'water',
    quality: 'Chara (Cardinal)', polarity: 'Negative (Yin)', vedicGuna: 'Sattva',

    rulingPlanet: 'Chandra (Moon)', rulingPlanetSymbol: '☽',
    planetDescription: 'Chandra gifts you with deep emotional intelligence, intuition, and nurturing power',
    decanRulers: ['Chandra (Moon)', 'Mangal/Pluto', 'Guru (Jupiter)'],
    exaltedPlanet: 'Guru (Jupiter)', detrimentPlanet: 'Shani (Saturn)',
    fallPlanet: 'Mangal (Mars)', nakshatras: ['Punarvasu (4th pada)', 'Pushya', 'Ashlesha'],

    luckyNumbers: [2, 7, 11, 16, 25], luckyColor: 'Chandi (Silver)',
    luckyColors: ['#dfe6e9', '#b2bec3', '#636e72', '#a4b0be'],
    luckyGem: 'Moti (Pearl)', luckyGemEmoji: '🤍',
    luckyFlower: 'Safed Gulab (White Rose)', luckyFlowerEmoji: '🤍',
    luckyDay: 'Somvar (Monday)', luckyMetal: 'Chandi (Silver)',
    luckyAnimal: 'Kekda (Crab)', luckyAnimalEmoji: '🦀',
    luckyDirection: 'Uttar (North)', luckyDeity: 'Goddess Parvati / Lord Shiva',

    personality: 'Deeply intuitive and impossibly compassionate, Karka carries the emotional wisdom of the ancient ocean. Ruled by Chandra (Moon), your moods may ebb and flow, but your devotion to those you love remains as constant as the tides. The Vedic tradition honors Karka as the nurturing mother of the zodiac.',

    strengths: ['Intuitive', 'Loyal', 'Emotional', 'Sympathetic', 'Persuasive', 'Nurturing', 'Protective', 'Imaginative'],
    weaknesses: ['Moody', 'Insecure', 'Manipulative', 'Clingy', 'Pessimistic', 'Overly sensitive'],

    loveStyle: 'Karka loves with a depth that touches the very depths of the ocean. You create a sanctuary of emotional safety for your partner.',
    careerPath: 'Your nurturing instinct excels in healthcare, counseling, teaching, cooking, and real estate.',
    healthFocus: 'Ruling the chest and stomach. Water activities are deeply healing for you.',
    spiritualPath: 'Moon rituals, Chandra mantras, and water ceremonies are powerful practices.',
    lifeLesson: 'Learning that vulnerability is strength.',
    mantra: 'ॐ सों सोमाय नमः | Om Som Somaya Namah',
    vedanticWisdom: 'Like Chandra, your light reflects the divine source, illuminating the darkness for others.',

    compatibility: {
      best: ['Vrishchika', 'Meena', 'Vrishabha', 'Kanya'],
      good: ['Karka', 'Makara'],
      challenging: ['Mesha', 'Tula', 'Kumbha'],
    },

    compatibilityDetails: {
      Vrishchika: { score: 97, description: 'The deepest emotional bond. Two Jal souls becoming one ocean.' },
      Meena: { score: 95, description: 'A dreamy, intuitive union that creates its own magical reality.' },
      Vrishabha: { score: 90, description: 'Prithvi and Jal create a garden of Eden.' },
      Kanya: { score: 88, description: 'A nurturing partnership of deep mutual care.' },
    },

    tarotCard: 'The Chariot', bodyPart: 'Chest, Breasts & Stomach',
    house: 'Fourth Bhava - Sukha & Family',
    yearlyTheme: 'A year of emotional healing and deepening family bonds.',
  },

  simha: {
    id: 'simha',
    westernId: 'leo',
    symbol: '♌',
    name: 'Simha',
    westernName: 'Leo',
    hindiName: 'सिंह',
    dates: 'July 23 - August 22',
    nameLetters: 'M, T | म, ट',
    nameLettersDetailed: 'Maa, Mee, Moo, Me, Mo, Taa, Tee, Too, Te',
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22,
    season: 'Grishma (Summer)',

    element: 'Agni (Fire)', elementIcon: '🔥', elementType: 'fire',
    quality: 'Sthira (Fixed)', polarity: 'Positive (Yang)', vedicGuna: 'Sattva',

    rulingPlanet: 'Surya (Sun)', rulingPlanetSymbol: '☉',
    planetDescription: 'Surya centers the universe around your magnificent presence and creative brilliance',
    decanRulers: ['Surya (Sun)', 'Guru (Jupiter)', 'Mangal (Mars)'],
    exaltedPlanet: 'None', detrimentPlanet: 'Shani (Saturn)',
    fallPlanet: 'None', nakshatras: ['Magha', 'Purva Phalguni', 'Uttara Phalguni (1st pada)'],

    luckyNumbers: [1, 3, 10, 19, 28], luckyColor: 'Sona (Gold)',
    luckyColors: ['#ffd54f', '#ff8f00', '#f39c12', '#e67e22'],
    luckyGem: 'Manik (Ruby)', luckyGemEmoji: '❤️',
    luckyFlower: 'Surajmukhi (Sunflower)', luckyFlowerEmoji: '🌻',
    luckyDay: 'Ravivar (Sunday)', luckyMetal: 'Sona (Gold)',
    luckyAnimal: 'Sinh (Lion)', luckyAnimalEmoji: '🦁',
    luckyDirection: 'Poorv (East)', luckyDeity: 'Lord Surya / Lord Rama',

    personality: 'Magnificent, generous, and radiantly charismatic, Simha is the cosmic sovereign ruled by Surya (Sun). Your creative spirit is boundless, your loyalty is legendary, and your capacity for love is as vast as the sun that rules you. In Vedic tradition, Simha represents the divine king — noble, protective, and inspiring.',

    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous', 'Loyal', 'Charismatic'],
    weaknesses: ['Arrogant', 'Self-centered', 'Dramatic', 'Domineering', 'Stubborn', 'Attention-seeking'],

    loveStyle: 'Simha loves with the full force of Surya — warm, generous, and utterly magnificent.',
    careerPath: 'Born for leadership, excelling in entertainment, politics, luxury brands, and creative direction.',
    healthFocus: 'Ruling the heart and spine. Creative activities are essential medicine.',
    spiritualPath: 'Heart-centered meditation, Surya Namaskar, and solar mantras align your soul.',
    lifeLesson: 'Discovering that true royalty serves the kingdom.',
    mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः | Om Hraam Hreem Hraum Sah Suryaya Namah',
    vedanticWisdom: 'You are Surya\'s child — your light is not borrowed, it emanates from your divine essence.',

    compatibility: {
      best: ['Mesha', 'Dhanu', 'Mithuna', 'Tula'],
      good: ['Simha', 'Kumbha'],
      challenging: ['Vrishabha', 'Vrishchika', 'Makara'],
    },

    compatibilityDetails: {
      Mesha: { score: 95, description: 'Two Agni Rashis creating a spectacular blaze of passion.' },
      Dhanu: { score: 93, description: 'A grand adventure of laughter and boundless optimism.' },
      Tula: { score: 88, description: 'A glamorous, harmonious match that creates beauty.' },
      Mithuna: { score: 85, description: 'A dazzling social power duo.' },
    },

    tarotCard: 'Strength', bodyPart: 'Heart & Spine',
    house: 'Fifth Bhava - Creativity & Progeny',
    yearlyTheme: 'A year of creative breakthroughs and heart-centered leadership.',
  },

  kanya: {
    id: 'kanya',
    westernId: 'virgo',
    symbol: '♍',
    name: 'Kanya',
    westernName: 'Virgo',
    hindiName: 'कन्या',
    dates: 'August 23 - September 22',
    nameLetters: 'P, Th, N | प, ठ, ण',
    nameLettersDetailed: 'To, Paa, Pee, Poo, Sha, Na, Tha, Pe, Po',
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22,
    season: 'Sharad (Autumn)',

    element: 'Prithvi (Earth)', elementIcon: '🌍', elementType: 'earth',
    quality: 'Dvisvabhava (Mutable)', polarity: 'Negative (Yin)', vedicGuna: 'Tamas',

    rulingPlanet: 'Budh (Mercury)', rulingPlanetSymbol: '☿',
    planetDescription: 'Budh grants analytical precision and service-oriented wisdom',
    decanRulers: ['Budh (Mercury)', 'Shani (Saturn)', 'Shukra (Venus)'],
    nakshatras: ['Uttara Phalguni (2-4 pada)', 'Hasta', 'Chitra (1-2 pada)'],

    luckyNumbers: [5, 14, 15, 23, 32], luckyColor: 'Neela (Navy Blue)',
    luckyColors: ['#00b894', '#55efc4', '#00cec9', '#81ecec'],
    luckyGem: 'Panna (Emerald)', luckyGemEmoji: '💚',
    luckyDay: 'Budhvar (Wednesday)', luckyMetal: 'Platinum',
    luckyAnimal: 'Lomdi (Fox)', luckyAnimalEmoji: '🦊',
    luckyDirection: 'Dakshin (South)', luckyDeity: 'Lord Vishnu / Goddess Saraswati',

    personality: 'Brilliantly analytical and deeply compassionate, Kanya possesses the rare gift of seeing both the tiniest details and the grand pattern. Ruled by Budh, you are the cosmic perfectionist who serves with genuine desire to make the world better.',

    strengths: ['Analytical', 'Kind', 'Hardworking', 'Practical', 'Methodical', 'Reliable', 'Detail-oriented', 'Humble'],
    weaknesses: ['Overthinking', 'Critical', 'Worry-prone', 'Shy', 'Perfectionist', 'Self-doubting'],

    loveStyle: 'Kanya shows love through acts of seva (service) and meticulous attention to partner\'s needs.',
    careerPath: 'Excels in healthcare, research, editing, data analysis, and quality assurance.',
    healthFocus: 'Ruling the digestive system. Mindful eating and probiotics are essential.',
    spiritualPath: 'Self-acceptance is your greatest spiritual challenge. Budh mantras and healing arts call to your soul.',
    lifeLesson: 'Understanding that imperfection is not failure.',
    mantra: 'ॐ बुं बुधाय नमः | Om Bum Budhaya Namah',
    vedanticWisdom: 'Your seva (service) is your sadhana (spiritual practice). In serving others, you find the Divine.',

    compatibility: {
      best: ['Vrishabha', 'Makara', 'Karka', 'Vrishchika'],
      good: ['Kanya', 'Meena'],
      challenging: ['Mithuna', 'Dhanu', 'Mesha'],
    },

    compatibilityDetails: {
      Vrishabha: { score: 95, description: 'Prithvi harmony at its finest. Peaceful, productive, deeply loyal.' },
      Makara: { score: 93, description: 'Two Prithvi Rashis building an empire of stability.' },
      Karka: { score: 88, description: 'A nurturing bond of deep mutual care.' },
      Vrishchika: { score: 90, description: 'Deep minds meet intense emotions. Transformative.' },
    },

    tarotCard: 'The Hermit', bodyPart: 'Digestive System',
    house: 'Sixth Bhava - Shatru & Service',
    yearlyTheme: 'A year of mastering your craft and holistic wellness.',
  },

  tula: {
    id: 'tula',
    westernId: 'libra',
    symbol: '♎',
    name: 'Tula',
    westernName: 'Libra',
    hindiName: 'तुला',
    dates: 'September 23 - October 22',
    nameLetters: 'R, T | र, त',
    nameLettersDetailed: 'Raa, Ree, Roo, Re, Ro, Taa, Tee, Too, Te',
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22,
    season: 'Sharad (Autumn)',

    element: 'Vayu (Air)', elementIcon: '💨', elementType: 'air',
    quality: 'Chara (Cardinal)', polarity: 'Positive (Yang)', vedicGuna: 'Rajas',

    rulingPlanet: 'Shukra (Venus)', rulingPlanetSymbol: '♀',
    planetDescription: 'Shukra bestows an innate sense of beauty, harmony, and the art of relationships',
    nakshatras: ['Chitra (3-4 pada)', 'Swati', 'Vishakha (1-3 pada)'],

    luckyNumbers: [4, 6, 13, 15, 24], luckyColor: 'Gulabi (Pink)',
    luckyColors: ['#fd79a8', '#fab1a0', '#e17055', '#ff7675'],
    luckyGem: 'Heera (Diamond)', luckyGemEmoji: '💎',
    luckyDay: 'Shukravar (Friday)', luckyMetal: 'Tamba (Copper)',
    luckyAnimal: 'Hans (Swan)', luckyAnimalEmoji: '🦢',
    luckyDirection: 'Paschim (West)', luckyDeity: 'Goddess Lakshmi',

    personality: 'Elegant, diplomatic, and endlessly charming, Tula is the cosmic artist who seeks harmony in every corner. Ruled by Shukra, you possess an extraordinary ability to see beauty and find common ground. The Vedic tradition sees Tula as the divine balance — Dharma in action.',

    strengths: ['Diplomatic', 'Fair-minded', 'Social', 'Cooperative', 'Gracious', 'Artistic', 'Charming', 'Idealistic'],
    weaknesses: ['Indecisive', 'Non-confrontational', 'Self-pitying', 'People-pleasing', 'Superficial'],

    loveStyle: 'Tula is the sign most in love with love itself. You seek a partner who is your equal in every way.',
    careerPath: 'Excels in law, diplomacy, art, fashion, interior design, and public relations.',
    healthFocus: 'Ruling the kidneys and lower back. Balance is your medicine.',
    spiritualPath: 'Finding balance between pleasing others and honoring your own truth. Shukra mantras serve your soul.',
    lifeLesson: 'Discovering that true harmony begins within.',
    mantra: 'ॐ शुं शुक्राय नमः | Om Shum Shukraya Namah',
    vedanticWisdom: 'You are the divine scales — where dharma and karma find their perfect balance.',

    compatibility: {
      best: ['Mithuna', 'Kumbha', 'Simha', 'Dhanu'],
      good: ['Tula', 'Mesha'],
      challenging: ['Karka', 'Makara', 'Kanya'],
    },

    compatibilityDetails: {
      Mithuna: { score: 93, description: 'Vayu sign perfection. Endless conversation and intellectual bliss.' },
      Kumbha: { score: 90, description: 'A visionary partnership fighting for justice together.' },
      Simha: { score: 88, description: 'A glamorous, warm partnership lighting up every gathering.' },
      Dhanu: { score: 85, description: 'An optimistic, adventurous couple.' },
    },

    tarotCard: 'Justice', bodyPart: 'Kidneys & Lower Back',
    house: 'Seventh Bhava - Partnerships & Marriage',
    yearlyTheme: 'A year of finding balance and attracting partnerships.',
  },

  vrishchika: {
    id: 'vrishchika',
    westernId: 'scorpio',
    symbol: '♏',
    name: 'Vrishchika',
    westernName: 'Scorpio',
    hindiName: 'वृश्चिक',
    dates: 'October 23 - November 21',
    nameLetters: 'N, Y | न, य',
    nameLettersDetailed: 'To, Naa, Nee, Noo, Ne, No, Yaa, Yee, Yu',
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21,
    season: 'Sharad/Hemant (Autumn/Winter)',

    element: 'Jal (Water)', elementIcon: '🌊', elementType: 'water',
    quality: 'Sthira (Fixed)', polarity: 'Negative (Yin)', vedicGuna: 'Tamas',

    rulingPlanet: 'Mangal (Mars) & Ketu',
    rulingPlanetSymbol: '♂',
    planetDescription: 'Mangal and Ketu grant transformative power and psychic depth',
    nakshatras: ['Vishakha (4th pada)', 'Anuradha', 'Jyeshtha'],

    luckyNumbers: [8, 11, 18, 22, 29], luckyColor: 'Mehrun (Crimson)',
    luckyColors: ['#d63031', '#ff7675', '#e17055', '#6c5ce7'],
    luckyGem: 'Moonga (Red Coral)', luckyGemEmoji: '🔴',
    luckyDay: 'Mangalvar (Tuesday)', luckyMetal: 'Loha (Steel)',
    luckyAnimal: 'Garud (Eagle/Phoenix)', luckyAnimalEmoji: '🦅',
    luckyDirection: 'Uttar (North)', luckyDeity: 'Lord Hanuman / Lord Kartikeya',

    personality: 'Intensely powerful, mysteriously magnetic, and profoundly transformative, Vrishchika is the cosmic alchemist. Ruled by Mangal and Ketu, you possess emotional depth and psychological insight that borders on the supernatural. Vedic texts describe Vrishchika as the sign of moksha — spiritual liberation through transformation.',

    strengths: ['Passionate', 'Resourceful', 'Brave', 'Strategic', 'Loyal', 'Focused', 'Perceptive', 'Transformative'],
    weaknesses: ['Jealous', 'Secretive', 'Obsessive', 'Vindictive', 'Controlling', 'Suspicious'],

    loveStyle: 'Vrishchika loves with an intensity that can be both intoxicating and overwhelming.',
    careerPath: 'Excels in psychology, research, investigation, surgery, and crisis management.',
    healthFocus: 'Ruling the reproductive system. Emotional detoxification is essential.',
    spiritualPath: 'Shadow work, Mangal mantras, and deep meditation are your sacred practices.',
    lifeLesson: 'True power lies not in control but in surrender.',
    mantra: 'ॐ अं अंगारकाय नमः | Om Ang Angarakaya Namah',
    vedanticWisdom: 'Like the phoenix, your destruction is always followed by glorious rebirth.',

    compatibility: {
      best: ['Karka', 'Meena', 'Kanya', 'Makara'],
      good: ['Vrishchika', 'Vrishabha'],
      challenging: ['Simha', 'Kumbha', 'Mithuna'],
    },

    compatibilityDetails: {
      Karka: { score: 97, description: 'The most emotionally profound bond. Soul-deep Jal connection.' },
      Meena: { score: 95, description: 'Two psychics in love. Mystical and transcendent.' },
      Kanya: { score: 90, description: 'Deep minds meeting deep hearts.' },
      Makara: { score: 88, description: 'Power couple energy. Moving mountains together.' },
    },

    tarotCard: 'Death (Transformation)', bodyPart: 'Reproductive System',
    house: 'Eighth Bhava - Transformation & Moksha',
    yearlyTheme: 'A year of profound transformation and reclaiming power.',
  },

  dhanu: {
    id: 'dhanu',
    westernId: 'sagittarius',
    symbol: '♐',
    name: 'Dhanu',
    westernName: 'Sagittarius',
    hindiName: 'धनु',
    dates: 'November 22 - December 21',
    nameLetters: 'Bh, Dh, Ph, Dha | भ, ध, फ, ढ',
    nameLettersDetailed: 'Ye, Yo, Bhaa, Bhee, Bhoo, Dhaa, Phaa, Dha, Bhe',
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21,
    season: 'Hemant (Early Winter)',

    element: 'Agni (Fire)', elementIcon: '🔥', elementType: 'fire',
    quality: 'Dvisvabhava (Mutable)', polarity: 'Positive (Yang)', vedicGuna: 'Sattva',

    rulingPlanet: 'Guru (Jupiter)', rulingPlanetSymbol: '♃',
    planetDescription: 'Guru blesses you with wisdom, optimism, and dharmic fortune',
    nakshatras: ['Moola', 'Purva Ashadha', 'Uttara Ashadha (1st pada)'],

    luckyNumbers: [3, 7, 9, 12, 21], luckyColor: 'Baingani (Purple)',
    luckyColors: ['#a29bfe', '#6c5ce7', '#fd79a8', '#e056fd'],
    luckyGem: 'Pukhraj (Yellow Sapphire)', luckyGemEmoji: '💛',
    luckyDay: 'Guruvar (Thursday)', luckyMetal: 'Sona (Gold)',
    luckyAnimal: 'Ghoda (Horse)', luckyAnimalEmoji: '🐎',
    luckyDirection: 'Poorv (East)', luckyDeity: 'Lord Brahaspati / Lord Dattatreya',

    personality: 'Wildly adventurous, infectiously optimistic, and philosophically brilliant, Dhanu is the cosmic archer who aims at the stars. Ruled by Guru (Jupiter), you possess an insatiable hunger for knowledge, experience, and truth. Vedic wisdom sees Dhanu as the eternal seeker of Dharma.',

    strengths: ['Optimistic', 'Adventurous', 'Philosophical', 'Generous', 'Honest', 'Humorous', 'Independent', 'Open-minded'],
    weaknesses: ['Tactless', 'Irresponsible', 'Restless', 'Commitment-phobic', 'Overconfident', 'Blunt'],

    loveStyle: 'Dhanu needs a love that feels like an adventure, not a cage. Freedom is non-negotiable.',
    careerPath: 'Excels in travel, education, publishing, philosophy, law, and motivational speaking.',
    healthFocus: 'Ruling the hips and liver. Outdoor sports and horseback riding are ideal.',
    spiritualPath: 'The eternal quest for truth. Guru mantras and pilgrimage call to your seeker soul.',
    lifeLesson: 'Freedom includes responsibility.',
    mantra: 'ॐ बृं बृहस्पतये नमः | Om Brim Brihaspataye Namah',
    vedanticWisdom: 'You are Guru\'s arrow — aimed at truth, flying toward infinite horizons of dharma.',

    compatibility: {
      best: ['Mesha', 'Simha', 'Tula', 'Kumbha'],
      good: ['Dhanu', 'Mithuna'],
      challenging: ['Kanya', 'Meena', 'Vrishabha'],
    },

    compatibilityDetails: {
      Mesha: { score: 93, description: 'Agni meets Agni in an explosion of adventure and passion.' },
      Simha: { score: 93, description: 'The most fun couple. Laughter and grand adventures.' },
      Kumbha: { score: 88, description: 'Freedom lovers exploring the universe without chains.' },
      Tula: { score: 85, description: 'A beautiful balance of social grace and wild adventure.' },
    },

    tarotCard: 'Temperance', bodyPart: 'Hips & Thighs',
    house: 'Ninth Bhava - Dharma & Higher Learning',
    yearlyTheme: 'A year of epic adventures and philosophical breakthroughs.',
  },

  makara: {
    id: 'makara',
    westernId: 'capricorn',
    symbol: '♑',
    name: 'Makara',
    westernName: 'Capricorn',
    hindiName: 'मकर',
    dates: 'December 22 - January 19',
    nameLetters: 'Kh, J | ख, ज',
    nameLettersDetailed: 'Bho, Jaa, Jee, Khee, Khoo, Gaa, Gee',
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19,
    season: 'Shishir (Winter)',

    element: 'Prithvi (Earth)', elementIcon: '🌍', elementType: 'earth',
    quality: 'Chara (Cardinal)', polarity: 'Negative (Yin)', vedicGuna: 'Tamas',

    rulingPlanet: 'Shani (Saturn)', rulingPlanetSymbol: '♄',
    planetDescription: 'Shani gifts you with discipline, ambition, and wisdom through time and effort',
    nakshatras: ['Uttara Ashadha (2-4 pada)', 'Shravana', 'Dhanishta (1-2 pada)'],

    luckyNumbers: [4, 8, 13, 22, 26], luckyColor: 'Bhura (Brown)',
    luckyColors: ['#636e72', '#b2bec3', '#2d3436', '#dfe6e9'],
    luckyGem: 'Neelam (Blue Sapphire)', luckyGemEmoji: '💙',
    luckyDay: 'Shanivar (Saturday)', luckyMetal: 'Loha (Iron)',
    luckyAnimal: 'Bakri (Goat)', luckyAnimalEmoji: '🐐',
    luckyDirection: 'Dakshin (South)', luckyDeity: 'Lord Shani Dev / Lord Hanuman',

    personality: 'Masterfully ambitious, strategically brilliant, and profoundly resilient, Makara is the cosmic mountain goat. Ruled by Shani (Saturn), you possess the patience of centuries and the work ethic of a titan. Vedic tradition honors Makara as the builder of Dharmic empires.',

    strengths: ['Disciplined', 'Responsible', 'Self-controlled', 'Practical', 'Ambitious', 'Strategic', 'Patient', 'Resilient'],
    weaknesses: ['Pessimistic', 'Rigid', 'Workaholic', 'Cold', 'Unforgiving', 'Status-conscious'],

    loveStyle: 'Makara approaches love with strategic patience. Your love deepens with time, like fine wine.',
    careerPath: 'Born executives excelling in business, finance, politics, architecture, and government.',
    healthFocus: 'Ruling bones, joints, and knees. Yoga and regular rest are essential.',
    spiritualPath: 'Meditation on self-acceptance and Shani mantras are sacred practices.',
    lifeLesson: 'Vulnerability is not weakness.',
    mantra: 'ॐ शं शनैश्चराय नमः | Om Sham Shanaischaraya Namah',
    vedanticWisdom: 'Shani teaches through patience. Your karma is your greatest asset.',

    compatibility: {
      best: ['Vrishabha', 'Kanya', 'Vrishchika', 'Meena'],
      good: ['Makara', 'Karka'],
      challenging: ['Mesha', 'Tula', 'Simha'],
    },

    compatibilityDetails: {
      Vrishabha: { score: 93, description: 'Prithvi royalty building empires of lasting success.' },
      Kanya: { score: 93, description: 'A practical, supportive partnership of dedication.' },
      Vrishchika: { score: 88, description: 'Power meets depth. Intensely ambitious bond.' },
      Meena: { score: 82, description: 'Prithvi grounds Jal. Structure supports dreams.' },
    },

    tarotCard: 'The Devil', bodyPart: 'Bones, Joints & Knees',
    house: 'Tenth Bhava - Karma & Public Image',
    yearlyTheme: 'A year of monumental achievement and hard-won recognition.',
  },

  kumbha: {
    id: 'kumbha',
    westernId: 'aquarius',
    symbol: '♒',
    name: 'Kumbha',
    westernName: 'Aquarius',
    hindiName: 'कुंभ',
    dates: 'January 20 - February 18',
    nameLetters: 'G, S, Sh | ग, श, ष, स',
    nameLettersDetailed: 'Gu, Ge, Go, Saa, See, Soo, Se, Daa',
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18,
    season: 'Shishir (Winter)',

    element: 'Vayu (Air)', elementIcon: '💨', elementType: 'air',
    quality: 'Sthira (Fixed)', polarity: 'Positive (Yang)', vedicGuna: 'Tamas',

    rulingPlanet: 'Shani (Saturn) & Rahu',
    rulingPlanetSymbol: '♄',
    planetDescription: 'Shani grounds your vision while Rahu sparks revolutionary genius',
    nakshatras: ['Dhanishta (3-4 pada)', 'Shatabhisha', 'Purva Bhadrapada (1-3 pada)'],

    luckyNumbers: [4, 7, 11, 22, 29], luckyColor: 'Asmani (Electric Blue)',
    luckyColors: ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe'],
    luckyGem: 'Neelam (Blue Sapphire) / Gomed', luckyGemEmoji: '💜',
    luckyDay: 'Shanivar (Saturday)', luckyMetal: 'Loha (Iron)',
    luckyAnimal: 'Garud (Eagle)', luckyAnimalEmoji: '🦅',
    luckyDirection: 'Paschim (West)', luckyDeity: 'Lord Shani Dev / Lord Vishnu',

    personality: 'Brilliantly unconventional, fiercely independent, and cosmically humanitarian, Kumbha is the revolutionary visionary. Ruled by Shani and Rahu, you see the future before it arrives. Vedic tradition sees Kumbha as the water-bearer who pours divine knowledge upon humanity.',

    strengths: ['Innovative', 'Progressive', 'Independent', 'Humanitarian', 'Original', 'Intellectual', 'Visionary', 'Friendly'],
    weaknesses: ['Aloof', 'Rebellious', 'Emotionally detached', 'Unpredictable', 'Stubborn', 'Contrarian'],

    loveStyle: 'Kumbha needs a love that respects fierce independence. You connect through intellect first.',
    careerPath: 'Born innovators excelling in technology, science, social justice, and astrology.',
    healthFocus: 'Ruling circulatory system and ankles. Grounding exercises balance your energy.',
    spiritualPath: 'Community-based spiritual practices and Shani mantras call to your soul.',
    lifeLesson: 'True revolution begins with the heart.',
    mantra: 'ॐ शं शनैश्चराय नमः | Om Sham Shanaischaraya Namah',
    vedanticWisdom: 'You are the Kumbha (pot) carrying the waters of divine wisdom for all of humanity.',

    compatibility: {
      best: ['Mithuna', 'Tula', 'Mesha', 'Dhanu'],
      good: ['Kumbha', 'Simha'],
      challenging: ['Vrishabha', 'Vrishchika', 'Karka'],
    },

    compatibilityDetails: {
      Mithuna: { score: 92, description: 'Mental fireworks. Two brilliant minds creating revolution.' },
      Tula: { score: 90, description: 'Vayu harmony creating a vision for a better world.' },
      Mesha: { score: 85, description: 'Two independent spirits respecting each other\'s freedom.' },
      Dhanu: { score: 88, description: 'Freedom lovers exploring the universe without chains.' },
    },

    tarotCard: 'The Star', bodyPart: 'Circulatory System & Ankles',
    house: 'Eleventh Bhava - Labha & Community',
    yearlyTheme: 'A year of revolutionary breakthroughs and community building.',
  },

  meena: {
    id: 'meena',
    westernId: 'pisces',
    symbol: '♓',
    name: 'Meena',
    westernName: 'Pisces',
    hindiName: 'मीन',
    dates: 'February 19 - March 20',
    nameLetters: 'D, Ch, Jh, Th | द, च, झ, थ',
    nameLettersDetailed: 'Dee, Doo, Tha, Jha, Yna, De, Do, Cha, Chee',
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20,
    season: 'Shishir/Vasant (Late Winter/Spring)',

    element: 'Jal (Water)', elementIcon: '🌊', elementType: 'water',
    quality: 'Dvisvabhava (Mutable)', polarity: 'Negative (Yin)', vedicGuna: 'Sattva',

    rulingPlanet: 'Guru (Jupiter) & Ketu',
    rulingPlanetSymbol: '♃',
    planetDescription: 'Guru and Ketu dissolve boundaries between dreams and reality, gifting otherworldly intuition',
    nakshatras: ['Purva Bhadrapada (4th pada)', 'Uttara Bhadrapada', 'Revati'],

    luckyNumbers: [3, 9, 12, 15, 18], luckyColor: 'Samudri Hara (Sea Green)',
    luckyColors: ['#00cec9', '#81ecec', '#55efc4', '#6c5ce7'],
    luckyGem: 'Pukhraj (Yellow Sapphire)', luckyGemEmoji: '💛',
    luckyDay: 'Guruvar (Thursday)', luckyMetal: 'Sona (Gold)',
    luckyAnimal: 'Machli (Fish)', luckyAnimalEmoji: '🐟',
    luckyDirection: 'Uttar (North)', luckyDeity: 'Lord Vishnu / Lord Krishna',

    personality: 'Ethereally intuitive, boundlessly compassionate, and mystically creative, Meena swims in the cosmic ocean of collective consciousness. Ruled by Guru and Ketu, you feel the emotions of the entire universe. As the last Rashi, you carry the wisdom of all eleven before you — the most spiritually evolved soul in the cosmic family. Vedic tradition sees Meena as the gateway to Moksha.',

    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical', 'Empathetic', 'Selfless'],
    weaknesses: ['Escapist', 'Overly trusting', 'Victim mentality', 'Fearful', 'Boundary issues', 'Addictive personality'],

    loveStyle: 'Meena loves with a transcendent, all-encompassing devotion that dissolves boundaries between souls.',
    careerPath: 'Excels in music, film, photography, painting, poetry, spirituality, and healing arts.',
    healthFocus: 'Ruling feet and immune system. Water activities and energetic cleansing are essential.',
    spiritualPath: 'You are the most naturally spiritual sign. Dream work, mystical art, and Guru mantras are sacred practices.',
    lifeLesson: 'Healthy boundaries protect your gifts.',
    mantra: 'ॐ बृं बृहस्पतये नमः | Om Brim Brihaspataye Namah',
    vedanticWisdom: 'You are the cosmic ocean itself — infinite, compassionate, and containing all of creation within.',

    compatibility: {
      best: ['Karka', 'Vrishchika', 'Vrishabha', 'Makara'],
      good: ['Meena', 'Kanya'],
      challenging: ['Mithuna', 'Dhanu', 'Kumbha'],
    },

    compatibilityDetails: {
      Karka: { score: 95, description: 'A fairy tale of two deeply emotional Jal souls creating magic.' },
      Vrishchika: { score: 95, description: 'The most psychically connected pair. Otherworldly intimacy.' },
      Vrishabha: { score: 87, description: 'Prithvi grounds your ocean beautifully. Sensual and deeply loving.' },
      Makara: { score: 82, description: 'Your dreams need their structure. Vision meets discipline.' },
    },

    tarotCard: 'The Moon', bodyPart: 'Feet & Immune System',
    house: 'Twelfth Bhava - Moksha & the Subconscious',
    yearlyTheme: 'A year of spiritual awakening and creative transcendence.',
  },
}

// ═══════════════════════════════════════════════════════════════════
// 🔮 RASHI DETECTION ENGINE — BY NAME (Jyotish Method)
// ═══════════════════════════════════════════════════════════════════

/**
 * Determines the Vedic Rashi based on the first letter/syllable
 * of the person's birth name (as per Jyotish Shastra)
 *
 * @param {string} firstName - The person's first name
 * @returns {object|null} - The matched Rashi object or null
 */
export const getRashiByName = (firstName) => {
  if (!firstName || typeof firstName !== 'string') return null

  const name = firstName.trim().toLowerCase()
  if (name.length === 0) return null

  // Try matching longest syllable first (3 chars → 2 chars → 1 char)
  for (let len = 3; len >= 1; len--) {
    const syllable = name.substring(0, len)

    for (const [rashiId, mapping] of Object.entries(RASHI_NAME_MAP)) {
      // Check syllables first (most specific)
      if (mapping.syllables.includes(syllable)) {
        return ZODIAC_SIGNS[rashiId]
      }
    }
  }

  // Fallback: match by first character against primary letters
  const firstChar = name.charAt(0)

  for (const [rashiId, mapping] of Object.entries(RASHI_NAME_MAP)) {
    if (mapping.primary.includes(firstChar)) {
      return ZODIAC_SIGNS[rashiId]
    }
  }

  // Handle special multi-character starting sounds
  const specialPrefixes = [
    { prefix: 'sh', rashi: 'kumbha' },
    { prefix: 'ch', rashi: 'meena' },
    { prefix: 'bh', rashi: 'dhanu' },
    { prefix: 'dh', rashi: 'dhanu' },
    { prefix: 'ph', rashi: 'dhanu' },
    { prefix: 'kh', rashi: 'makara' },
    { prefix: 'jh', rashi: 'meena' },
    { prefix: 'th', rashi: 'meena' },
    { prefix: 'gh', rashi: 'mithuna' },
  ]

  for (const { prefix, rashi } of specialPrefixes) {
    if (name.startsWith(prefix)) {
      return ZODIAC_SIGNS[rashi]
    }
  }

  return null
}

/**
 * Get Rashi by date of birth (Western method — kept as fallback)
 */
export const getRashiByDate = (day, month) => {
  const dd = parseInt(day)
  const mm = parseInt(month)
  if (!dd || !mm) return null

  const dateRanges = [
    { id: 'makara', sm: 12, sd: 22, em: 1, ed: 19 },
    { id: 'kumbha', sm: 1, sd: 20, em: 2, ed: 18 },
    { id: 'meena', sm: 2, sd: 19, em: 3, ed: 20 },
    { id: 'mesha', sm: 3, sd: 21, em: 4, ed: 19 },
    { id: 'vrishabha', sm: 4, sd: 20, em: 5, ed: 20 },
    { id: 'mithuna', sm: 5, sd: 21, em: 6, ed: 20 },
    { id: 'karka', sm: 6, sd: 21, em: 7, ed: 22 },
    { id: 'simha', sm: 7, sd: 23, em: 8, ed: 22 },
    { id: 'kanya', sm: 8, sd: 23, em: 9, ed: 22 },
    { id: 'tula', sm: 9, sd: 23, em: 10, ed: 22 },
    { id: 'vrishchika', sm: 10, sd: 23, em: 11, ed: 21 },
    { id: 'dhanu', sm: 11, sd: 22, em: 12, ed: 21 },
  ]

  for (const range of dateRanges) {
    if (
      (mm === range.sm && dd >= range.sd) ||
      (mm === range.em && dd <= range.ed)
    ) {
      return ZODIAC_SIGNS[range.id]
    }
  }

  return null
}

/**
 * PRIMARY METHOD: Get Rashi using Jyotish name-based method
 * Falls back to date-based if name doesn't match
 */
export const getJyotishRashi = (firstName, day, month) => {
  // Try name-based first (authentic Jyotish method)
  const nameRashi = getRashiByName(firstName)
  if (nameRashi) return { rashi: nameRashi, method: 'name', confidence: 'high' }

  // Fallback to date-based
  const dateRashi = getRashiByDate(day, month)
  if (dateRashi) return { rashi: dateRashi, method: 'date', confidence: 'medium' }

  return null
}

// ─────────────────────────────────────────
// Helper: Get sign by key (supports both Vedic and Western IDs)
// ─────────────────────────────────────────
export const getZodiacSign = (signId) => {
  if (!signId) return null
  const id = signId.toLowerCase()

  // Direct match
  if (ZODIAC_SIGNS[id]) return ZODIAC_SIGNS[id]

  // Search by westernId
  return Object.values(ZODIAC_SIGNS).find(
    (sign) => sign.westernId === id
  ) || null
}

// ─────────────────────────────────────────
// Helper: Get all signs as array
// ─────────────────────────────────────────
export const getAllSigns = () => Object.values(ZODIAC_SIGNS)

// ─────────────────────────────────────────
// Helper: Get sign names (returns Vedic names)
// ─────────────────────────────────────────
export const getSignNames = () => Object.keys(ZODIAC_SIGNS)

// ─────────────────────────────────────────
// Helper: Get all name-to-rashi mappings
// ─────────────────────────────────────────
export const getNameRashiMap = () => RASHI_NAME_MAP

// ─────────────────────────────────────────
// Helper: Western ID to Vedic ID mapping
// ─────────────────────────────────────────
export const WESTERN_TO_VEDIC = {
  aries: 'mesha',
  taurus: 'vrishabha',
  gemini: 'mithuna',
  cancer: 'karka',
  leo: 'simha',
  virgo: 'kanya',
  libra: 'tula',
  scorpio: 'vrishchika',
  sagittarius: 'dhanu',
  capricorn: 'makara',
  aquarius: 'kumbha',
  pisces: 'meena',
}

export const VEDIC_TO_WESTERN = Object.fromEntries(
  Object.entries(WESTERN_TO_VEDIC).map(([w, v]) => [v, w])
)