// ═══════════════════════════════════════════════════════════════════
// 🕯️ PAST LIFE DATA
// ═══════════════════════════════════════════════════════════════════

export const PAST_LIVES = {
  aries: [
    { era: 'Ancient Rome', role: 'Gladiator Champion', lesson: 'Learning when to fight and when to show mercy' },
    { era: 'Viking Age', role: 'Shield Maiden Explorer', lesson: 'Discovering that the greatest battles are won within' },
    { era: 'Renaissance', role: 'Revolutionary Leader', lesson: 'Using passion for creation, not destruction' },
  ],
  taurus: [
    { era: 'Ancient Egypt', role: 'Temple Gardener', lesson: 'Finding the sacred in everyday beauty' },
    { era: 'Medieval Period', role: 'Master Artisan', lesson: 'Understanding that true value cannot be measured in gold' },
    { era: 'Victorian Era', role: 'Estate Owner', lesson: 'Learning that sharing abundance multiplies it' },
  ],
  gemini: [
    { era: 'Ancient Greece', role: 'Philosopher\'s Student', lesson: 'Knowing that wisdom comes from listening, not just speaking' },
    { era: 'Silk Road Era', role: 'Traveling Merchant', lesson: 'Discovering that every culture holds a piece of universal truth' },
    { era: 'Jazz Age', role: 'Journalist & Storyteller', lesson: 'Learning the power and responsibility of words' },
  ],
  cancer: [
    { era: 'Ancient China', role: 'Imperial Healer', lesson: 'Understanding that nurturing others begins with self-care' },
    { era: 'Celtic Period', role: 'Moon Priestess', lesson: 'Trusting the wisdom of emotional tides' },
    { era: 'Colonial America', role: 'Homestead Mother', lesson: 'Finding strength in tenderness and roots in change' },
  ],
  leo: [
    { era: 'Ancient Egypt', role: 'Pharaoh\'s Advisor', lesson: 'Learning that true royalty is service to the people' },
    { era: 'Baroque Period', role: 'Court Performer', lesson: 'Discovering that authentic expression outshines perfection' },
    { era: 'Roaring Twenties', role: 'Hollywood Pioneer', lesson: 'Understanding that fame without purpose is empty light' },
  ],
  virgo: [
    { era: 'Ancient Greece', role: 'Oracle of Delphi', lesson: 'Trusting divine messages even when they defy logic' },
    { era: 'Medieval Period', role: 'Monastery Herbalist', lesson: 'Finding perfection in the imperfect beauty of nature' },
    { era: 'Victorian Era', role: 'Scientific Pioneer', lesson: 'Learning that the heart is as valid a compass as the mind' },
  ],
  libra: [
    { era: 'Renaissance Italy', role: 'Diplomatic Ambassador', lesson: 'Discovering that peace sometimes requires courageous conflict' },
    { era: 'Ancient Japan', role: 'Tea Ceremony Master', lesson: 'Finding beauty in simplicity and presence' },
    { era: 'Belle Époque', role: 'Salon Hostess', lesson: 'Learning that true harmony includes your own voice' },
  ],
  scorpio: [
    { era: 'Ancient Egypt', role: 'High Priestess of Isis', lesson: 'Understanding that death is transformation, not ending' },
    { era: 'Medieval Period', role: 'Alchemist', lesson: 'Learning that the philosopher\'s stone is self-knowledge' },
    { era: 'Aztec Empire', role: 'Shaman Healer', lesson: 'Discovering that power and vulnerability are the same force' },
  ],
  sagittarius: [
    { era: 'Age of Exploration', role: 'Navigator & Explorer', lesson: 'Learning that the greatest discovery is self-understanding' },
    { era: 'Ancient India', role: 'Wandering Sage', lesson: 'Discovering that freedom includes the freedom to commit' },
    { era: 'Wild West', role: 'Frontier Pioneer', lesson: 'Understanding that adventure without wisdom is just running' },
  ],
  capricorn: [
    { era: 'Roman Empire', role: 'Senate Leader', lesson: 'Learning that legacy is built on integrity, not power' },
    { era: 'Industrial Revolution', role: 'Factory Founder', lesson: 'Discovering that success means nothing without compassion' },
    { era: 'Ancient China', role: 'Great Wall Architect', lesson: 'Understanding that the strongest walls protect, not imprison' },
  ],
  aquarius: [
    { era: 'Ancient Greece', role: 'Democratic Reformer', lesson: 'Learning that revolution begins with individual transformation' },
    { era: 'Renaissance', role: 'Inventor & Visionary', lesson: 'Discovering that genius needs community to flourish' },
    { era: 'Space Age', role: 'Astronaut Pioneer', lesson: 'Understanding that the final frontier is inner space' },
  ],
  pisces: [
    { era: 'Ancient Atlantis', role: 'Crystal Temple Keeper', lesson: 'Remembering that other dimensions are as real as this one' },
    { era: 'Medieval Period', role: 'Mystical Artist', lesson: 'Learning to ground divine visions in earthly creation' },
    { era: 'Ancient India', role: 'Devotional Poet', lesson: 'Discovering that divine love flows through every human connection' },
  ],
}

export const getPastLives = (signId) => {
  return PAST_LIVES[signId] || PAST_LIVES.pisces
}