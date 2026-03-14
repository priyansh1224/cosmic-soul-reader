// ═══════════════════════════════════════════════════════════════════
// 🔮 COSMIC SOUL READER - COMPLETE ZODIAC DATABASE
// ═══════════════════════════════════════════════════════════════════

export const ZODIAC_SIGNS = {
  aries: {
    id: 'aries',
    symbol: '♈',
    name: 'Aries',
    latinName: 'Aries',
    dates: 'March 21 - April 19',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    season: 'Spring',

    // Element & Modality
    element: 'Fire',
    elementIcon: '🔥',
    elementType: 'fire',
    quality: 'Cardinal',
    polarity: 'Positive (Yang)',

    // Celestial Bodies
    rulingPlanet: 'Mars',
    rulingPlanetSymbol: '♂',
    planetDescription: 'Mars bestows courage, assertiveness, and warrior energy',
    decanRulers: ['Mars', 'Sun', 'Jupiter'],
    exaltedPlanet: 'Sun',
    detrimentPlanet: 'Venus',
    fallPlanet: 'Saturn',

    // Lucky Items
    luckyNumbers: [1, 8, 17, 9, 27],
    luckyColor: 'Red',
    luckyColors: ['#FF4136', '#FF6B6B', '#C0392B', '#E74C3C'],
    luckyGem: 'Diamond',
    luckyGemEmoji: '💎',
    luckyFlower: 'Honeysuckle',
    luckyFlowerEmoji: '🌺',
    luckyDay: 'Tuesday',
    luckyMetal: 'Iron',
    luckyAnimal: 'Ram',
    luckyAnimalEmoji: '🐏',

    // Personality
    personality: 'Bold, ambitious, and fearlessly confident, Aries charges through life with the unstoppable force of a cosmic wildfire. As the first sign of the zodiac, you are a natural-born pioneer who thrives on challenge and adventure. Your inner fire burns with an intensity that inspires everyone around you. You possess an innate courage that allows you to face any obstacle head-on, turning impossible dreams into reality with sheer willpower and determination.',

    strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate', 'Natural Leader'],
    weaknesses: ['Impatient', 'Impulsive', 'Short-tempered', 'Aggressive', 'Self-centered', 'Competitive'],

    // Detailed Traits
    loveStyle: 'In love, Aries burns with an all-consuming passion that lights up any room. You pursue your romantic interests with fierce determination and unapologetic directness. Your ideal partner must match your energy and never try to tame your wild spirit. When you fall in love, you fall hard and fast, showering your partner with attention and grand romantic gestures.',

    careerPath: 'Natural-born leaders, Aries excel in roles that demand quick thinking, bold action, and pioneering vision. You thrive in competitive environments and are drawn to careers in entrepreneurship, athletics, military, emergency services, and leadership positions. Your drive to be first makes you a trailblazer in any field you choose.',

    healthFocus: 'As the ruler of the head, Aries should pay attention to headaches, migraines, and stress-related tension. Your high-energy nature demands regular physical exercise to channel your abundant fire energy. Combat sports, running, and competitive athletics are ideal outlets for your warrior spirit.',

    spiritualPath: 'Your spiritual journey is about learning to channel your tremendous fire energy with wisdom and patience. Meditation practices that focus on stillness and inner peace are transformative for you. Your lesson is discovering that true strength lies not in constant action, but in knowing when to pause and listen to the universe.',

    lifeLesson: 'Learning that true courage includes vulnerability, and that patience is not weakness but profound strength.',

    mantra: 'I am the spark that ignites change. My courage creates new worlds.',

    // Compatibility
    compatibility: {
      best: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      good: ['Aries', 'Libra'],
      challenging: ['Cancer', 'Capricorn', 'Virgo'],
    },

    compatibilityDetails: {
      Leo: { score: 95, description: 'A blazing inferno of passion and mutual admiration. Together you conquer worlds.' },
      Sagittarius: { score: 93, description: 'Adventure partners who fuel each other\'s wanderlust and philosophical fire.' },
      Gemini: { score: 88, description: 'Electric chemistry with endless conversation and spontaneous adventures.' },
      Aquarius: { score: 85, description: 'Revolutionary partners who challenge each other to grow beyond limits.' },
      Aries: { score: 80, description: 'Double fire means double passion, but watch out for power struggles.' },
      Libra: { score: 75, description: 'Opposites attract - your fire balanced by their air creates a mesmerizing dance.' },
      Cancer: { score: 45, description: 'Your fire can overwhelm their water. Requires patience and understanding.' },
      Capricorn: { score: 50, description: 'Both are cardinal signs fighting for control. Compromise is the key.' },
    },

    // Tarot & Mystical
    tarotCard: 'The Emperor',
    tarotDescription: 'Represents authority, structure, and the power to build empires from vision.',
    bodyPart: 'Head & Face',
    house: 'First House - Self & Identity',

    // Yearly themes
    yearlyTheme: 'A year of bold beginnings and courageous leaps of faith.',
  },

  taurus: {
    id: 'taurus',
    symbol: '♉',
    name: 'Taurus',
    latinName: 'Taurus',
    dates: 'April 20 - May 20',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    season: 'Spring',

    element: 'Earth',
    elementIcon: '🌍',
    elementType: 'earth',
    quality: 'Fixed',
    polarity: 'Negative (Yin)',

    rulingPlanet: 'Venus',
    rulingPlanetSymbol: '♀',
    planetDescription: 'Venus blesses you with love for beauty, luxury, and sensual pleasures',
    decanRulers: ['Venus', 'Mercury', 'Saturn'],
    exaltedPlanet: 'Moon',
    detrimentPlanet: 'Mars/Pluto',
    fallPlanet: 'Uranus',

    luckyNumbers: [2, 6, 9, 12, 24],
    luckyColor: 'Green',
    luckyColors: ['#2ecc71', '#55efc4', '#27ae60', '#00b894'],
    luckyGem: 'Emerald',
    luckyGemEmoji: '💚',
    luckyFlower: 'Rose',
    luckyFlowerEmoji: '🌹',
    luckyDay: 'Friday',
    luckyMetal: 'Copper',
    luckyAnimal: 'Bull',
    luckyAnimalEmoji: '🐂',

    personality: 'Steadfast, sensual, and magnificently grounded, Taurus embodies the enduring strength of the earth itself. You possess an innate appreciation for beauty, comfort, and the finer things in life that goes beyond mere materialism — it\'s a deep connection to the physical world and its pleasures. Your determination is legendary; once you set your mind to something, nothing in the universe can move you from your path.',

    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable', 'Sensual', 'Artistic'],
    weaknesses: ['Stubborn', 'Possessive', 'Materialistic', 'Resistant to change', 'Self-indulgent', 'Inflexible'],

    loveStyle: 'In romance, Taurus is the ultimate devoted partner who loves with an unwavering constancy that stands the test of time. You express love through physical touch, beautiful gifts, and creating a luxurious haven for your beloved. You crave stability and deep emotional security, and when you find your person, you hold on with gentle but unbreakable devotion.',

    careerPath: 'With your natural eye for beauty and practical wisdom, Taurus thrives in careers involving finance, art, music, cooking, architecture, real estate, and luxury goods. Your patient determination makes you exceptional at building long-term wealth and creating lasting enterprises.',

    healthFocus: 'As the ruler of the throat and neck, Taurus should care for these areas and also watch for thyroid issues. Your love of food and comfort can lead to overindulgence. Balance your earthy pleasures with regular movement, especially activities in nature like hiking and gardening.',

    spiritualPath: 'Your spiritual journey involves learning that true security comes from within, not from material possessions. Connecting with nature is your most powerful spiritual practice. Earth-based rituals, crystal work, and grounding meditations align perfectly with your Venus-ruled soul.',

    lifeLesson: 'Discovering that change is not your enemy but your greatest teacher, and that letting go can bring the deepest abundance.',

    mantra: 'I am rooted in the abundant earth. My patience creates lasting beauty.',

    compatibility: {
      best: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      good: ['Taurus', 'Scorpio'],
      challenging: ['Leo', 'Aquarius', 'Sagittarius'],
    },

    compatibilityDetails: {
      Virgo: { score: 95, description: 'A harmonious earth connection built on mutual respect and practical love.' },
      Capricorn: { score: 93, description: 'Empire builders together. Your combined determination is unstoppable.' },
      Cancer: { score: 90, description: 'A nurturing, deeply emotional bond that creates the coziest love nest.' },
      Pisces: { score: 87, description: 'Earth meets water in a beautifully creative and emotionally rich union.' },
      Taurus: { score: 82, description: 'Double the luxury, double the stubbornness. A comfortable but potentially stagnant match.' },
      Scorpio: { score: 78, description: 'Magnetic opposites with intense passion but equally intense power struggles.' },
      Leo: { score: 48, description: 'Both fixed signs wanting to lead. Dramatic and challenging but never boring.' },
      Aquarius: { score: 40, description: 'Your need for stability clashes with their need for freedom and change.' },
    },

    tarotCard: 'The Hierophant',
    tarotDescription: 'Represents tradition, spiritual wisdom, and the bridge between heaven and earth.',
    bodyPart: 'Throat & Neck',
    house: 'Second House - Values & Possessions',
    yearlyTheme: 'A year of building foundations and enjoying the fruits of patience.',
  },

  gemini: {
    id: 'gemini',
    symbol: '♊',
    name: 'Gemini',
    latinName: 'Gemini',
    dates: 'May 21 - June 20',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    season: 'Spring/Summer',

    element: 'Air',
    elementIcon: '💨',
    elementType: 'air',
    quality: 'Mutable',
    polarity: 'Positive (Yang)',

    rulingPlanet: 'Mercury',
    rulingPlanetSymbol: '☿',
    planetDescription: 'Mercury gifts you with quicksilver wit, communication mastery, and intellectual brilliance',
    decanRulers: ['Mercury', 'Venus', 'Uranus'],
    exaltedPlanet: 'North Node',
    detrimentPlanet: 'Jupiter',
    fallPlanet: 'South Node',

    luckyNumbers: [3, 5, 7, 12, 23],
    luckyColor: 'Yellow',
    luckyColors: ['#fdcb6e', '#ffeaa7', '#f1c40f', '#f39c12'],
    luckyGem: 'Agate',
    luckyGemEmoji: '🔶',
    luckyFlower: 'Lavender',
    luckyFlowerEmoji: '💜',
    luckyDay: 'Wednesday',
    luckyMetal: 'Mercury/Quicksilver',
    luckyAnimal: 'Butterfly',
    luckyAnimalEmoji: '🦋',

    personality: 'Brilliantly versatile and endlessly curious, Gemini is the cosmic messenger who dances between worlds with effortless grace. Your mind moves at the speed of light, connecting dots that others cannot even see. The Twins symbol reflects your ability to see every situation from multiple perspectives simultaneously. You are the ultimate communicator, storyteller, and social butterfly of the zodiac.',

    strengths: ['Adaptable', 'Versatile', 'Communicative', 'Witty', 'Intellectual', 'Youthful', 'Curious', 'Quick-witted'],
    weaknesses: ['Inconsistent', 'Indecisive', 'Superficial', 'Nervous', 'Restless', 'Gossipy'],

    loveStyle: 'In love, Gemini needs a partner who can keep up with their lightning-fast mind and ever-changing interests. You fall in love with someone\'s intellect first, their humor second, and everything else third. Conversation is your foreplay. You need constant mental stimulation and variety in your relationships.',

    careerPath: 'Born communicators, Gemini excels in writing, journalism, teaching, sales, marketing, social media, translation, and any career that involves connecting people and ideas. Your versatility makes you a natural multitasker.',

    healthFocus: 'Ruling the arms, hands, and lungs, Gemini should focus on respiratory health and hand/wrist care. Your nervous energy needs regular outlets. Yoga, dancing, and swimming help calm your active mind.',

    spiritualPath: 'Your spiritual journey involves learning to quiet the endless chatter of your brilliant mind and discovering the wisdom in silence. Journaling, breathwork, and mantra meditation are powerful practices for you.',

    lifeLesson: 'Understanding that depth is not the enemy of breadth, and that commitment to one path can reveal infinite universes.',

    mantra: 'I am the bridge between worlds. My words weave reality into being.',

    compatibility: {
      best: ['Libra', 'Aquarius', 'Aries', 'Leo'],
      good: ['Gemini', 'Sagittarius'],
      challenging: ['Virgo', 'Pisces', 'Scorpio'],
    },

    compatibilityDetails: {
      Libra: { score: 93, description: 'Intellectual soulmates who create an endless dialogue of beauty and ideas.' },
      Aquarius: { score: 92, description: 'A meeting of brilliant minds that sparks revolution and innovation.' },
      Aries: { score: 88, description: 'Fast-paced excitement with both signs racing to explore new territories.' },
      Leo: { score: 85, description: 'A dazzling social power couple that commands attention wherever they go.' },
      Sagittarius: { score: 78, description: 'Opposite sign magic - together you explore every corner of the universe.' },
      Virgo: { score: 50, description: 'Both Mercury-ruled but different wavelengths. Miscommunication is common.' },
      Pisces: { score: 45, description: 'Your logic vs. their intuition creates beautiful art but confusing relationships.' },
    },

    tarotCard: 'The Lovers',
    tarotDescription: 'Represents choices, duality, and the union of opposing forces within the self.',
    bodyPart: 'Arms, Hands & Lungs',
    house: 'Third House - Communication & Learning',
    yearlyTheme: 'A year of powerful connections and transformative conversations.',
  },

  cancer: {
    id: 'cancer',
    symbol: '♋',
    name: 'Cancer',
    latinName: 'Cancer',
    dates: 'June 21 - July 22',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    season: 'Summer',

    element: 'Water',
    elementIcon: '🌊',
    elementType: 'water',
    quality: 'Cardinal',
    polarity: 'Negative (Yin)',

    rulingPlanet: 'Moon',
    rulingPlanetSymbol: '☽',
    planetDescription: 'The Moon gifts you with deep emotional intelligence, intuition, and nurturing power',
    decanRulers: ['Moon', 'Pluto', 'Neptune'],
    exaltedPlanet: 'Jupiter',
    detrimentPlanet: 'Saturn',
    fallPlanet: 'Mars',

    luckyNumbers: [2, 7, 11, 16, 25],
    luckyColor: 'Silver',
    luckyColors: ['#dfe6e9', '#b2bec3', '#636e72', '#a4b0be'],
    luckyGem: 'Pearl',
    luckyGemEmoji: '🤍',
    luckyFlower: 'White Rose',
    luckyFlowerEmoji: '🤍',
    luckyDay: 'Monday',
    luckyMetal: 'Silver',
    luckyAnimal: 'Crab',
    luckyAnimalEmoji: '🦀',

    personality: 'Deeply intuitive and impossibly compassionate, Cancer carries the emotional wisdom of the ancient ocean within their soul. You feel everything with an intensity that would overwhelm most other signs, yet this extraordinary sensitivity is your greatest superpower. Like the moon that rules you, your moods may ebb and flow, but your devotion to those you love remains as constant as the tides.',

    strengths: ['Intuitive', 'Loyal', 'Emotional', 'Sympathetic', 'Persuasive', 'Nurturing', 'Protective', 'Imaginative'],
    weaknesses: ['Moody', 'Insecure', 'Manipulative', 'Clingy', 'Pessimistic', 'Overly sensitive'],

    loveStyle: 'Cancer loves with a depth that touches the very depths of the ocean. You create a sanctuary of emotional safety for your partner, nurturing them with home-cooked meals, tender touches, and unwavering emotional support. You need a partner who can provide the security you crave and appreciate your incredible gift of making any space feel like home.',

    careerPath: 'Your natural nurturing instinct excels in healthcare, counseling, teaching, cooking, real estate, interior design, and childcare. Your emotional intelligence makes you an exceptional leader who truly cares about their team.',

    healthFocus: 'Ruling the chest, breasts, and stomach, Cancer should pay attention to digestive health and emotional eating patterns. Water activities are deeply healing for you. Swimming, baths, and time near water restore your soul.',

    spiritualPath: 'Your spiritual journey involves learning to protect your empathic gifts without building walls that isolate you from love. Moon rituals, water ceremonies, and ancestral healing are powerful practices for your soul.',

    lifeLesson: 'Learning that vulnerability is strength, and that releasing the past creates space for miraculous new beginnings.',

    mantra: 'I am the ocean of unconditional love. My sensitivity is my sacred gift.',

    compatibility: {
      best: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      good: ['Cancer', 'Capricorn'],
      challenging: ['Aries', 'Libra', 'Aquarius'],
    },

    compatibilityDetails: {
      Scorpio: { score: 97, description: 'The deepest emotional bond in the zodiac. Two water souls becoming one ocean.' },
      Pisces: { score: 95, description: 'A dreamy, intuitive union that creates its own magical reality.' },
      Taurus: { score: 90, description: 'Earth and water create a garden of Eden. Comfort, security, and deep love.' },
      Virgo: { score: 88, description: 'A nurturing partnership where both signs care deeply for each other\'s wellbeing.' },
      Capricorn: { score: 75, description: 'Opposite sign attraction. Your emotions balance their practicality.' },
      Aries: { score: 42, description: 'Fire and water create steam. Intense but requires tremendous understanding.' },
      Libra: { score: 48, description: 'Both cardinal signs with very different approaches to emotional expression.' },
    },

    tarotCard: 'The Chariot',
    tarotDescription: 'Represents emotional willpower, determination, and victory through inner strength.',
    bodyPart: 'Chest, Breasts & Stomach',
    house: 'Fourth House - Home & Family',
    yearlyTheme: 'A year of emotional healing and deepening family bonds.',
  },

  leo: {
    id: 'leo',
    symbol: '♌',
    name: 'Leo',
    latinName: 'Leo',
    dates: 'July 23 - August 22',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    season: 'Summer',

    element: 'Fire',
    elementIcon: '🔥',
    elementType: 'fire',
    quality: 'Fixed',
    polarity: 'Positive (Yang)',

    rulingPlanet: 'Sun',
    rulingPlanetSymbol: '☉',
    planetDescription: 'The Sun centers the universe around your magnificent presence and creative brilliance',
    decanRulers: ['Sun', 'Jupiter', 'Mars'],
    exaltedPlanet: 'Neptune',
    detrimentPlanet: 'Saturn/Uranus',
    fallPlanet: 'Mercury',

    luckyNumbers: [1, 3, 10, 19, 28],
    luckyColor: 'Gold',
    luckyColors: ['#ffd54f', '#ff8f00', '#f39c12', '#e67e22'],
    luckyGem: 'Ruby',
    luckyGemEmoji: '❤️',
    luckyFlower: 'Sunflower',
    luckyFlowerEmoji: '🌻',
    luckyDay: 'Sunday',
    luckyMetal: 'Gold',
    luckyAnimal: 'Lion',
    luckyAnimalEmoji: '🦁',

    personality: 'Magnificent, generous, and radiantly charismatic, Leo is the cosmic sovereign who rules with a golden heart and an iron will. You were born to shine, and shine you do — lighting up every room with your magnetic presence and infectious joy. Your creative spirit is boundless, your loyalty is legendary, and your capacity for love is as vast as the sun that rules you.',

    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous', 'Loyal', 'Charismatic'],
    weaknesses: ['Arrogant', 'Self-centered', 'Dramatic', 'Domineering', 'Stubborn', 'Attention-seeking'],

    loveStyle: 'Leo loves with the full force of the sun — warm, generous, and utterly magnificent. You shower your partner with attention, grand romantic gestures, and unwavering loyalty. You need a partner who adores you publicly, appreciates your grand nature, and isn\'t afraid to share the spotlight with you.',

    careerPath: 'Born for the stage of life, Leo excels in entertainment, performing arts, leadership, politics, luxury brands, event planning, and creative direction. Your natural charisma makes you magnetic in any role that puts you front and center.',

    healthFocus: 'Ruling the heart and spine, Leo should prioritize cardiovascular health and back care. Your generous nature can lead to burnout if you give too much. Creative activities that bring joy are essential medicine for your lion soul.',

    spiritualPath: 'Your spiritual journey involves learning that your light shines brightest when it illuminates others, not just yourself. Heart-centered meditation, creative visualization, and solar rituals align your soul with your cosmic purpose.',

    lifeLesson: 'Discovering that true royalty serves the kingdom, and that your greatest legacy is the light you ignite in others.',

    mantra: 'I am the radiant sun. My light transforms everything it touches.',

    compatibility: {
      best: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      good: ['Leo', 'Aquarius'],
      challenging: ['Taurus', 'Scorpio', 'Capricorn'],
    },

    compatibilityDetails: {
      Aries: { score: 95, description: 'Two fires creating a spectacular blaze of passion and adventure.' },
      Sagittarius: { score: 93, description: 'A grand adventure of laughter, philosophy, and boundless optimism.' },
      Gemini: { score: 85, description: 'A sparkly, social power duo that never runs out of things to talk about.' },
      Libra: { score: 88, description: 'A glamorous, harmonious match that creates beauty wherever they go.' },
      Aquarius: { score: 72, description: 'Opposite signs with magnetic attraction but clashing egos and values.' },
      Taurus: { score: 48, description: 'Both fixed signs creating an immovable clash of wills.' },
      Scorpio: { score: 55, description: 'Intense power dynamics. Both want control but for very different reasons.' },
    },

    tarotCard: 'Strength',
    tarotDescription: 'Represents courage, inner power, and the gentle mastery of one\'s own nature.',
    bodyPart: 'Heart & Spine',
    house: 'Fifth House - Creativity & Romance',
    yearlyTheme: 'A year of creative breakthroughs and heart-centered leadership.',
  },

  virgo: {
    id: 'virgo',
    symbol: '♍',
    name: 'Virgo',
    latinName: 'Virgo',
    dates: 'August 23 - September 22',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    season: 'Summer/Autumn',

    element: 'Earth',
    elementIcon: '🌍',
    elementType: 'earth',
    quality: 'Mutable',
    polarity: 'Negative (Yin)',

    rulingPlanet: 'Mercury',
    rulingPlanetSymbol: '☿',
    planetDescription: 'Mercury grants you analytical precision, attention to detail, and service-oriented wisdom',
    decanRulers: ['Mercury', 'Saturn', 'Venus'],
    exaltedPlanet: 'Mercury',
    detrimentPlanet: 'Jupiter/Neptune',
    fallPlanet: 'Venus',

    luckyNumbers: [5, 14, 15, 23, 32],
    luckyColor: 'Navy Blue',
    luckyColors: ['#00b894', '#55efc4', '#00cec9', '#81ecec'],
    luckyGem: 'Sapphire',
    luckyGemEmoji: '💙',
    luckyFlower: 'Chrysanthemum',
    luckyFlowerEmoji: '🌼',
    luckyDay: 'Wednesday',
    luckyMetal: 'Platinum',
    luckyAnimal: 'Fox',
    luckyAnimalEmoji: '🦊',

    personality: 'Brilliantly analytical and deeply compassionate, Virgo possesses the rare gift of seeing both the tiniest details and the grand pattern they create. You are the cosmic perfectionist, but not out of vanity — out of a genuine desire to make the world a better, more beautiful, and more efficient place. Your service-oriented heart drives everything you do.',

    strengths: ['Analytical', 'Kind', 'Hardworking', 'Practical', 'Methodical', 'Reliable', 'Detail-oriented', 'Humble'],
    weaknesses: ['Overthinking', 'Critical', 'Worry-prone', 'Shy', 'Perfectionist', 'Self-doubting'],

    loveStyle: 'Virgo shows love through acts of service and meticulous attention to their partner\'s needs. You remember every preference, organize their chaos, and show devotion through practical care. You need a partner who appreciates your quiet dedication and doesn\'t mistake your reserved nature for coldness.',

    careerPath: 'Your analytical brilliance excels in healthcare, research, editing, data analysis, nutrition, veterinary science, accounting, and quality assurance. Your attention to detail makes you indispensable in any field.',

    healthFocus: 'Ruling the digestive system, Virgo should focus on gut health and nutrition. Your tendency to worry can manifest as digestive issues. Mindful eating, probiotics, and stress-management techniques are essential.',

    spiritualPath: 'Your spiritual journey involves learning to extend the same compassion you give others to yourself. Self-acceptance is your greatest spiritual challenge and reward. Earth-based practices and healing arts call to your soul.',

    lifeLesson: 'Understanding that imperfection is not failure, and that you deserve the same gentle care you so freely give to others.',

    mantra: 'I am whole and worthy as I am. My service to others begins with self-love.',

    compatibility: {
      best: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      good: ['Virgo', 'Pisces'],
      challenging: ['Gemini', 'Sagittarius', 'Aries'],
    },

    compatibilityDetails: {
      Taurus: { score: 95, description: 'Earth harmony at its finest. A peaceful, productive, and deeply loyal union.' },
      Capricorn: { score: 93, description: 'Two earth signs building an empire of stability and mutual achievement.' },
      Cancer: { score: 88, description: 'A nurturing bond where both signs care deeply and communicate through actions.' },
      Scorpio: { score: 90, description: 'Deep analytical minds meet intense emotions. A transformative partnership.' },
      Pisces: { score: 75, description: 'Opposite signs creating beautiful balance between logic and dreams.' },
      Gemini: { score: 50, description: 'Both Mercury-ruled but expressing it differently. Can be mentally exhausting.' },
      Sagittarius: { score: 45, description: 'Your caution vs. their recklessness creates constant friction.' },
    },

    tarotCard: 'The Hermit',
    tarotDescription: 'Represents inner wisdom, solitude as strength, and the light that guides from within.',
    bodyPart: 'Digestive System',
    house: 'Sixth House - Health & Service',
    yearlyTheme: 'A year of mastering your craft and discovering holistic wellness.',
  },

  libra: {
    id: 'libra',
    symbol: '♎',
    name: 'Libra',
    latinName: 'Libra',
    dates: 'September 23 - October 22',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    season: 'Autumn',

    element: 'Air',
    elementIcon: '💨',
    elementType: 'air',
    quality: 'Cardinal',
    polarity: 'Positive (Yang)',

    rulingPlanet: 'Venus',
    rulingPlanetSymbol: '♀',
    planetDescription: 'Venus bestows upon you an innate sense of beauty, harmony, and the art of relationships',
    decanRulers: ['Venus', 'Uranus/Saturn', 'Mercury'],
    exaltedPlanet: 'Saturn',
    detrimentPlanet: 'Mars',
    fallPlanet: 'Sun',

    luckyNumbers: [4, 6, 13, 15, 24],
    luckyColor: 'Pink',
    luckyColors: ['#fd79a8', '#fab1a0', '#e17055', '#ff7675'],
    luckyGem: 'Opal',
    luckyGemEmoji: '🌈',
    luckyFlower: 'Bluebells',
    luckyFlowerEmoji: '💙',
    luckyDay: 'Friday',
    luckyMetal: 'Copper',
    luckyAnimal: 'Swan',
    luckyAnimalEmoji: '🦢',

    personality: 'Elegant, diplomatic, and endlessly charming, Libra is the cosmic artist who seeks to create harmony in every corner of existence. You possess an extraordinary ability to see beauty where others see chaos, and to find common ground where others see only conflict. Your natural grace and sense of justice make you the peacemaker of the zodiac.',

    strengths: ['Diplomatic', 'Fair-minded', 'Social', 'Cooperative', 'Gracious', 'Artistic', 'Charming', 'Idealistic'],
    weaknesses: ['Indecisive', 'Non-confrontational', 'Self-pitying', 'People-pleasing', 'Superficial', 'Dependent'],

    loveStyle: 'Libra is the sign most in love with love itself. You seek a partner who is your equal in every way — intellectually, aesthetically, and emotionally. Romance is an art form to you, and you create the most beautiful, harmonious relationships in the zodiac. However, your fear of conflict can lead to suppressing your true feelings.',

    careerPath: 'Your Venus-ruled nature excels in law, diplomacy, art, fashion, interior design, event planning, counseling, and public relations. Any career that requires grace, beauty, or mediation is perfect for you.',

    healthFocus: 'Ruling the kidneys and lower back, Libra should focus on kidney health and maintaining balance in all things. Your tendency to avoid stress by pleasing others can create internal tension. Balance is truly your medicine.',

    spiritualPath: 'Your spiritual journey involves finding balance between pleasing others and honoring your own truth. Learning to say "no" is a sacred practice for you. Beauty rituals, art meditation, and heart-opening practices serve your soul.',

    lifeLesson: 'Discovering that true harmony begins within, and that standing for justice sometimes requires beautiful courage.',

    mantra: 'I create harmony by first being true to myself. My beauty reflects inner balance.',

    compatibility: {
      best: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      good: ['Libra', 'Aries'],
      challenging: ['Cancer', 'Capricorn', 'Virgo'],
    },

    compatibilityDetails: {
      Gemini: { score: 93, description: 'Air sign perfection. Endless conversation, social adventures, and intellectual bliss.' },
      Aquarius: { score: 90, description: 'A visionary partnership that dreams big and fights for justice together.' },
      Leo: { score: 88, description: 'A glamorous, warm partnership that lights up every social gathering.' },
      Sagittarius: { score: 85, description: 'An optimistic, adventurous couple that brings out the best in each other.' },
      Aries: { score: 75, description: 'Magnetic opposite attraction. Your grace balances their fire beautifully.' },
      Cancer: { score: 48, description: 'Emotional vs. intellectual approaches to life create misunderstandings.' },
      Capricorn: { score: 50, description: 'Your social butterfly vs. their workaholic nature needs compromise.' },
    },

    tarotCard: 'Justice',
    tarotDescription: 'Represents fairness, truth, and the cosmic law of cause and effect.',
    bodyPart: 'Kidneys & Lower Back',
    house: 'Seventh House - Partnerships & Marriage',
    yearlyTheme: 'A year of finding balance and attracting beautiful partnerships.',
  },

  scorpio: {
    id: 'scorpio',
    symbol: '♏',
    name: 'Scorpio',
    latinName: 'Scorpius',
    dates: 'October 23 - November 21',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    season: 'Autumn',

    element: 'Water',
    elementIcon: '🌊',
    elementType: 'water',
    quality: 'Fixed',
    polarity: 'Negative (Yin)',

    rulingPlanet: 'Pluto & Mars',
    rulingPlanetSymbol: '♇',
    planetDescription: 'Pluto and Mars grant you transformative power, magnetic intensity, and psychic depth',
    decanRulers: ['Pluto', 'Neptune', 'Moon'],
    exaltedPlanet: 'Uranus',
    detrimentPlanet: 'Venus',
    fallPlanet: 'Moon',

    luckyNumbers: [8, 11, 18, 22, 29],
    luckyColor: 'Crimson',
    luckyColors: ['#d63031', '#ff7675', '#e17055', '#6c5ce7'],
    luckyGem: 'Topaz',
    luckyGemEmoji: '🔴',
    luckyFlower: 'Chrysanthemum',
    luckyFlowerEmoji: '🌺',
    luckyDay: 'Tuesday',
    luckyMetal: 'Plutonium/Steel',
    luckyAnimal: 'Phoenix',
    luckyAnimalEmoji: '🦅',

    personality: 'Intensely powerful, mysteriously magnetic, and profoundly transformative, Scorpio is the cosmic alchemist who turns darkness into gold. You possess an emotional depth and psychological insight that borders on the supernatural. Your gaze penetrates masks and pretenses, seeing the raw truth beneath every surface. You are feared and revered in equal measure.',

    strengths: ['Passionate', 'Resourceful', 'Brave', 'Strategic', 'Loyal', 'Focused', 'Perceptive', 'Transformative'],
    weaknesses: ['Jealous', 'Secretive', 'Obsessive', 'Vindictive', 'Controlling', 'Suspicious'],

    loveStyle: 'Scorpio loves with an intensity that can be both intoxicating and overwhelming. When you give your heart, you give it completely — demanding the same total surrender in return. Your passion runs deeper than any ocean, and your loyalty is absolute. Betrayal, however, is the one thing a Scorpio will never forgive.',

    careerPath: 'Your penetrating insight excels in psychology, research, investigation, surgery, finance, forensics, occult studies, and crisis management. You thrive in any role that requires going beneath the surface.',

    healthFocus: 'Ruling the reproductive system and transformation, Scorpio should focus on hormonal health and emotional detoxification. Your intense emotions need regular release. Therapy, journaling, and transformative practices are essential.',

    spiritualPath: 'Your spiritual journey is death and rebirth — the eternal cycle of transformation. Shadow work, past-life regression, and deep meditation are your sacred practices. You are naturally drawn to the mysteries that others fear.',

    lifeLesson: 'Learning that true power lies not in control but in surrender, and that forgiveness is the ultimate transformation.',

    mantra: 'I rise from the ashes transformed. My depth is my infinite power.',

    compatibility: {
      best: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      good: ['Scorpio', 'Taurus'],
      challenging: ['Leo', 'Aquarius', 'Gemini'],
    },

    compatibilityDetails: {
      Cancer: { score: 97, description: 'The most emotionally profound bond in the zodiac. Soul-deep connection.' },
      Pisces: { score: 95, description: 'Two psychics in love. A mystical, transcendent, deeply spiritual union.' },
      Virgo: { score: 90, description: 'Deep minds meeting deep hearts. An analytically passionate partnership.' },
      Capricorn: { score: 88, description: 'Power couple energy. Together you can move mountains and build empires.' },
      Taurus: { score: 78, description: 'Magnetic opposite attraction. Sensual and intense but with power struggles.' },
      Leo: { score: 55, description: 'Two fixed signs in a battle of wills. Explosive passion but volatile dynamics.' },
      Aquarius: { score: 42, description: 'Your emotional depth vs. their intellectual detachment creates a deep divide.' },
    },

    tarotCard: 'Death',
    tarotDescription: 'Represents transformation, endings that birth new beginnings, and the eternal cycle.',
    bodyPart: 'Reproductive System',
    house: 'Eighth House - Transformation & Shared Resources',
    yearlyTheme: 'A year of profound transformation and reclaiming your power.',
  },

  sagittarius: {
    id: 'sagittarius',
    symbol: '♐',
    name: 'Sagittarius',
    latinName: 'Sagittarius',
    dates: 'November 22 - December 21',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    season: 'Autumn/Winter',

    element: 'Fire',
    elementIcon: '🔥',
    elementType: 'fire',
    quality: 'Mutable',
    polarity: 'Positive (Yang)',

    rulingPlanet: 'Jupiter',
    rulingPlanetSymbol: '♃',
    planetDescription: 'Jupiter blesses you with boundless optimism, philosophical wisdom, and expansive fortune',
    decanRulers: ['Jupiter', 'Mars', 'Sun'],
    exaltedPlanet: 'South Node',
    detrimentPlanet: 'Mercury',
    fallPlanet: 'North Node',

    luckyNumbers: [3, 7, 9, 12, 21],
    luckyColor: 'Purple',
    luckyColors: ['#a29bfe', '#6c5ce7', '#fd79a8', '#e056fd'],
    luckyGem: 'Turquoise',
    luckyGemEmoji: '💎',
    luckyFlower: 'Carnation',
    luckyFlowerEmoji: '🌸',
    luckyDay: 'Thursday',
    luckyMetal: 'Tin',
    luckyAnimal: 'Horse',
    luckyAnimalEmoji: '🐎',

    personality: 'Wildly adventurous, infectiously optimistic, and philosophically brilliant, Sagittarius is the cosmic archer who aims their arrow at the stars and never misses. You possess an insatiable hunger for knowledge, experience, and truth that takes you to the far corners of the world — and the mind. Your laugh is medicine, your honesty is legendary, and your spirit is utterly untameable.',

    strengths: ['Optimistic', 'Adventurous', 'Philosophical', 'Generous', 'Honest', 'Humorous', 'Independent', 'Open-minded'],
    weaknesses: ['Tactless', 'Irresponsible', 'Restless', 'Commitment-phobic', 'Overconfident', 'Blunt'],

    loveStyle: 'Sagittarius needs a love that feels like an adventure, not a cage. You fall for fellow travelers, philosophers, and free spirits who can keep up with your boundless energy. Freedom is non-negotiable in your relationships. The partner who gives you wings will have your heart forever.',

    careerPath: 'Your expansive nature excels in travel, education, publishing, philosophy, law, outdoor recreation, foreign affairs, and motivational speaking. Any career that expands horizons and avoids routine is perfect.',

    healthFocus: 'Ruling the hips, thighs, and liver, Sagittarius should focus on liver health and hip flexibility. Your adventurous nature can lead to accidents. Outdoor sports, horseback riding, and hiking are your ideal exercises.',

    spiritualPath: 'Your spiritual journey is the eternal quest for truth and meaning. Every culture, philosophy, and spiritual tradition calls to your seeker soul. Your challenge is going deep enough in one practice before racing off to the next.',

    lifeLesson: 'Understanding that freedom includes responsibility, and that the deepest adventure is the journey inward.',

    mantra: 'I am the arrow of truth flying toward infinite horizons. My journey is my destination.',

    compatibility: {
      best: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      good: ['Sagittarius', 'Gemini'],
      challenging: ['Virgo', 'Pisces', 'Taurus'],
    },

    compatibilityDetails: {
      Aries: { score: 93, description: 'Fire meets fire in an explosion of adventure, passion, and mutual inspiration.' },
      Leo: { score: 93, description: 'The most fun couple in the zodiac. Laughter, drama, and grand adventures.' },
      Libra: { score: 85, description: 'A beautiful balance of social grace and wild adventure.' },
      Aquarius: { score: 88, description: 'Two freedom lovers who change the world together while respecting independence.' },
      Gemini: { score: 78, description: 'Opposite signs creating an intellectual and experiential powerhouse.' },
      Virgo: { score: 45, description: 'Your big-picture thinking vs. their detail focus creates frustration.' },
      Pisces: { score: 50, description: 'Both mutable signs that struggle to anchor each other.' },
    },

    tarotCard: 'Temperance',
    tarotDescription: 'Represents balance, patience, and the alchemical blending of extremes into gold.',
    bodyPart: 'Hips & Thighs',
    house: 'Ninth House - Philosophy & Higher Learning',
    yearlyTheme: 'A year of epic adventures and philosophical breakthroughs.',
  },

  capricorn: {
    id: 'capricorn',
    symbol: '♑',
    name: 'Capricorn',
    latinName: 'Capricornus',
    dates: 'December 22 - January 19',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    season: 'Winter',

    element: 'Earth',
    elementIcon: '🌍',
    elementType: 'earth',
    quality: 'Cardinal',
    polarity: 'Negative (Yin)',

    rulingPlanet: 'Saturn',
    rulingPlanetSymbol: '♄',
    planetDescription: 'Saturn gifts you with discipline, ambition, and the wisdom that comes through time and effort',
    decanRulers: ['Saturn', 'Venus', 'Mercury'],
    exaltedPlanet: 'Mars',
    detrimentPlanet: 'Moon',
    fallPlanet: 'Jupiter',

    luckyNumbers: [4, 8, 13, 22, 26],
    luckyColor: 'Dark Brown',
    luckyColors: ['#636e72', '#b2bec3', '#2d3436', '#dfe6e9'],
    luckyGem: 'Garnet',
    luckyGemEmoji: '🔮',
    luckyFlower: 'Pansy',
    luckyFlowerEmoji: '🌸',
    luckyDay: 'Saturday',
    luckyMetal: 'Lead',
    luckyAnimal: 'Goat',
    luckyAnimalEmoji: '🐐',

    personality: 'Masterfully ambitious, strategically brilliant, and profoundly resilient, Capricorn is the cosmic mountain goat who climbs every peak with unwavering determination. You possess the patience of centuries and the work ethic of a titan. Behind your serious exterior lies a surprisingly dry wit and a deeply caring heart that protects itself behind walls of achievement.',

    strengths: ['Disciplined', 'Responsible', 'Self-controlled', 'Practical', 'Ambitious', 'Strategic', 'Patient', 'Resilient'],
    weaknesses: ['Pessimistic', 'Rigid', 'Workaholic', 'Cold', 'Unforgiving', 'Status-conscious'],

    loveStyle: 'Capricorn approaches love with the same strategic patience applied to climbing corporate ladders. You take relationships seriously and don\'t waste time on casual flings. Your love deepens with time, like fine wine. The partner who earns your trust will discover a surprisingly romantic, deeply loyal, and passionately devoted companion.',

    careerPath: 'Born executives and empire builders, Capricorn excels in business management, finance, politics, architecture, engineering, academia, and government. Your discipline and strategic mind make you destined for positions of authority.',

    healthFocus: 'Ruling the bones, joints, and knees, Capricorn should focus on skeletal health and joint flexibility. Your workaholic tendencies can lead to chronic stress. Yoga, weight-bearing exercises, and regular rest are essential.',

    spiritualPath: 'Your spiritual journey involves learning that you don\'t have to earn your worth through achievement. Meditation on self-acceptance, connecting with ancient traditions, and learning to play are sacred practices for your soul.',

    lifeLesson: 'Understanding that vulnerability is not weakness, and that the highest peak is reached by those who know when to rest.',

    mantra: 'I am the mountain — patient, powerful, and eternal. My legacy is written in the stars.',

    compatibility: {
      best: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      good: ['Capricorn', 'Cancer'],
      challenging: ['Aries', 'Libra', 'Leo'],
    },

    compatibilityDetails: {
      Taurus: { score: 93, description: 'Earth sign royalty. Building empires of comfort and lasting success together.' },
      Virgo: { score: 93, description: 'A practical, supportive partnership where both signs thrive through dedication.' },
      Scorpio: { score: 88, description: 'Power meets depth. An intensely ambitious and emotionally transformative bond.' },
      Pisces: { score: 82, description: 'Earth grounds water beautifully. Your structure supports their dreams.' },
      Cancer: { score: 75, description: 'Opposite signs creating a foundation of security and emotional depth.' },
      Aries: { score: 50, description: 'Two cardinal leaders in a constant negotiation for control.' },
      Libra: { score: 50, description: 'Your seriousness vs. their social lightness needs constant balancing.' },
    },

    tarotCard: 'The Devil',
    tarotDescription: 'Represents mastery over material world, ambition, and breaking free from limiting beliefs.',
    bodyPart: 'Bones, Joints & Knees',
    house: 'Tenth House - Career & Public Image',
    yearlyTheme: 'A year of monumental achievement and hard-won recognition.',
  },

  aquarius: {
    id: 'aquarius',
    symbol: '♒',
    name: 'Aquarius',
    latinName: 'Aquarius',
    dates: 'January 20 - February 18',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    season: 'Winter',

    element: 'Air',
    elementIcon: '💨',
    elementType: 'air',
    quality: 'Fixed',
    polarity: 'Positive (Yang)',

    rulingPlanet: 'Uranus & Saturn',
    rulingPlanetSymbol: '♅',
    planetDescription: 'Uranus sparks your revolutionary genius, while Saturn grounds your vision in reality',
    decanRulers: ['Uranus/Saturn', 'Mercury', 'Venus'],
    exaltedPlanet: 'Neptune',
    detrimentPlanet: 'Sun',
    fallPlanet: 'Pluto',

    luckyNumbers: [4, 7, 11, 22, 29],
    luckyColor: 'Electric Blue',
    luckyColors: ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe'],
    luckyGem: 'Amethyst',
    luckyGemEmoji: '💜',
    luckyFlower: 'Orchid',
    luckyFlowerEmoji: '🌸',
    luckyDay: 'Saturday',
    luckyMetal: 'Uranium/Aluminum',
    luckyAnimal: 'Eagle',
    luckyAnimalEmoji: '🦅',

    personality: 'Brilliantly unconventional, fiercely independent, and cosmically humanitarian, Aquarius is the revolutionary visionary who sees the future before it arrives. You march to a beat that hasn\'t been invented yet, and your mind operates on frequencies that most humans can\'t perceive. You care deeply about humanity while often puzzling individual humans.',

    strengths: ['Innovative', 'Progressive', 'Independent', 'Humanitarian', 'Original', 'Intellectual', 'Visionary', 'Friendly'],
    weaknesses: ['Aloof', 'Rebellious', 'Emotionally detached', 'Unpredictable', 'Stubborn', 'Contrarian'],

    loveStyle: 'Aquarius needs a love that respects their fierce independence and celebrates their uniqueness. You connect through intellect first and emotions second. Traditional romance often feels stifling to you. Your ideal partner is a best friend, intellectual equal, and fellow revolutionary.',

    careerPath: 'Born innovators, Aquarius excels in technology, science, social justice, humanitarian work, astrology, aerospace, and any field that pushes the boundaries of what\'s possible.',

    healthFocus: 'Ruling the circulatory system and ankles, Aquarius should focus on cardiovascular health. Your tendency to live in your head can disconnect you from your body. Grounding exercises and group activities balance your energy.',

    spiritualPath: 'Your spiritual journey involves learning that emotions are not weaknesses but portals to deeper understanding. Community-based spiritual practices, energy healing, and cosmic consciousness exploration call to your soul.',

    lifeLesson: 'Understanding that true revolution begins with the heart, and that belonging doesn\'t mean losing your individuality.',

    mantra: 'I am the lightning bolt of change. My uniqueness is my gift to the world.',

    compatibility: {
      best: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      good: ['Aquarius', 'Leo'],
      challenging: ['Taurus', 'Scorpio', 'Cancer'],
    },

    compatibilityDetails: {
      Gemini: { score: 92, description: 'Mental fireworks. Two brilliant minds creating a revolution of ideas.' },
      Libra: { score: 90, description: 'Air sign harmony creating a beautiful vision for a better world.' },
      Aries: { score: 85, description: 'Two independent spirits who respect each other\'s freedom and fire.' },
      Sagittarius: { score: 88, description: 'Freedom lovers who explore the universe together without chains.' },
      Leo: { score: 72, description: 'Magnetic opposites. Your detachment vs. their need for attention creates tension.' },
      Taurus: { score: 40, description: 'Your need for change vs. their need for stability is fundamentally challenging.' },
      Scorpio: { score: 42, description: 'Your emotional detachment triggers their deepest insecurities.' },
    },

    tarotCard: 'The Star',
    tarotDescription: 'Represents hope, inspiration, and the divine connection between humanity and the cosmos.',
    bodyPart: 'Circulatory System & Ankles',
    house: 'Eleventh House - Community & Future Vision',
    yearlyTheme: 'A year of revolutionary breakthroughs and community building.',
  },

  pisces: {
    id: 'pisces',
    symbol: '♓',
    name: 'Pisces',
    latinName: 'Pisces',
    dates: 'February 19 - March 20',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    season: 'Winter/Spring',

    element: 'Water',
    elementIcon: '🌊',
    elementType: 'water',
    quality: 'Mutable',
    polarity: 'Negative (Yin)',

    rulingPlanet: 'Neptune & Jupiter',
    rulingPlanetSymbol: '♆',
    planetDescription: 'Neptune dissolves boundaries between dreams and reality, gifting you otherworldly intuition',
    decanRulers: ['Neptune/Jupiter', 'Moon', 'Pluto'],
    exaltedPlanet: 'Venus',
    detrimentPlanet: 'Mercury',
    fallPlanet: 'Mercury',

    luckyNumbers: [3, 9, 12, 15, 18],
    luckyColor: 'Sea Green',
    luckyColors: ['#00cec9', '#81ecec', '#55efc4', '#6c5ce7'],
    luckyGem: 'Aquamarine',
    luckyGemEmoji: '💎',
    luckyFlower: 'Water Lily',
    luckyFlowerEmoji: '🪷',
    luckyDay: 'Thursday',
    luckyMetal: 'Neptunium/Tin',
    luckyAnimal: 'Fish',
    luckyAnimalEmoji: '🐟',

    personality: 'Ethereally intuitive, boundlessly compassionate, and mystically creative, Pisces swims in the cosmic ocean of collective consciousness with the grace of a celestial dolphin. You feel the emotions of the entire universe flowing through your being. As the last sign of the zodiac, you carry the wisdom of all eleven signs before you, making you the most empathetic and spiritually evolved soul in the cosmic family.',

    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical', 'Empathetic', 'Selfless'],
    weaknesses: ['Escapist', 'Overly trusting', 'Victim mentality', 'Fearful', 'Boundaries issues', 'Addictive personality'],

    loveStyle: 'Pisces loves with a transcendent, all-encompassing devotion that dissolves the boundaries between two souls into one. You romanticize everything and love through grand gestures of emotional and artistic expression. Your ideal partner must handle your sensitivity with care and never take advantage of your boundless generosity.',

    careerPath: 'Your otherworldly creativity excels in music, film, photography, painting, poetry, spirituality, healing arts, marine biology, and social work. Any career that allows you to channel your vivid imagination is perfect.',

    healthFocus: 'Ruling the feet and immune system, Pisces should focus on grounding practices and immune health. Your porous boundaries can absorb others\' energies. Regular energetic cleansing, foot massage, and time alone in water are essential.',

    spiritualPath: 'You are the most naturally spiritual sign. Your challenge is staying grounded while honoring your psychic gifts. Dream work, mystical art, channeling, and water ceremonies are your sacred practices. You don\'t need to seek the divine — it lives within you.',

    lifeLesson: 'Learning that healthy boundaries protect your gifts, and that you must fill your own cup before you can heal the ocean.',

    mantra: 'I am one with the cosmic ocean. My compassion heals worlds, and I am worthy of that same love.',

    compatibility: {
      best: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
      good: ['Pisces', 'Virgo'],
      challenging: ['Gemini', 'Sagittarius', 'Aquarius'],
    },

    compatibilityDetails: {
      Cancer: { score: 95, description: 'A fairy tale romance of two deeply emotional souls creating their own magical world.' },
      Scorpio: { score: 95, description: 'The most psychically connected pair in the zodiac. Otherworldly intimacy.' },
      Taurus: { score: 87, description: 'Earth grounds your ocean beautifully. A sensual, artistic, and deeply loving bond.' },
      Capricorn: { score: 82, description: 'Your dreams need their structure. A complementary union of vision and discipline.' },
      Virgo: { score: 75, description: 'Opposite signs finding balance between logic and magic, analysis and intuition.' },
      Gemini: { score: 45, description: 'Your emotional depth vs. their mental agility creates beautiful art but confusing love.' },
      Sagittarius: { score: 50, description: 'Both mutable and restless. Beautiful adventures but hard to anchor.' },
    },

    tarotCard: 'The Moon',
    tarotDescription: 'Represents dreams, intuition, the subconscious mind, and the mysteries hidden in moonlight.',
    bodyPart: 'Feet & Immune System',
    house: 'Twelfth House - Spirituality & the Subconscious',
    yearlyTheme: 'A year of spiritual awakening and creative transcendence.',
  },
}

// ─────────────────────────────────────────
// Helper: Get sign by key
// ─────────────────────────────────────────
export const getZodiacSign = (signId) => ZODIAC_SIGNS[signId?.toLowerCase()]

// ─────────────────────────────────────────
// Helper: Get all signs as array
// ─────────────────────────────────────────
export const getAllSigns = () => Object.values(ZODIAC_SIGNS)

// ─────────────────────────────────────────
// Helper: Get sign names
// ─────────────────────────────────────────
export const getSignNames = () => Object.keys(ZODIAC_SIGNS)