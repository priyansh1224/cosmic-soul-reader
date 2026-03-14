// ═══════════════════════════════════════════════════════════════════
// ❤️ COMPATIBILITY DATA
// ═══════════════════════════════════════════════════════════════════

export const LOVE_LANGUAGES = {
  aries: "Words of Affirmation & Physical Touch",
  taurus: "Physical Touch & Quality Time",
  gemini: "Words of Affirmation",
  cancer: "Quality Time & Acts of Service",
  leo: "Receiving Gifts & Words of Affirmation",
  virgo: "Acts of Service",
  libra: "Quality Time & Receiving Gifts",
  scorpio: "Physical Touch & Quality Time",
  sagittarius: "Quality Time",
  capricorn: "Acts of Service & Quality Time",
  aquarius: "Words of Affirmation",
  pisces: "Quality Time & Physical Touch"
};

const elements = ['fire', 'earth', 'air', 'water'];
export const ELEMENT_COMPATIBILITY = {};

for (const e1 of elements) {
  ELEMENT_COMPATIBILITY[e1] = {};
  for (const e2 of elements) {
    let score = 50;
    if (e1 === e2) score = 85;
    else if ((e1==='fire'&&e2==='air') || (e1==='air'&&e2==='fire')) score = 90;
    else if ((e1==='earth'&&e2==='water') || (e1==='water'&&e2==='earth')) score = 90;
    else if ((e1==='fire'&&e2==='water') || (e1==='water'&&e2==='fire')) score = 40;
    else if ((e1==='earth'&&e2==='air') || (e1==='air'&&e2==='earth')) score = 40;
    else score = 65;
    
    ELEMENT_COMPATIBILITY[e1][e2] = { score, description: `A unique cosmic interaction between ${e1} and ${e2} energies.` };
  }
}

export const RELATIONSHIP_ADVICE = {
  fire: ["Keep the passion alive by trying new things together.", "Give each other space to shine individually."],
  earth: ["Build a strong foundation based on trust and routine.", "Appreciate the little things and physical affection."],
  air: ["Communicate openly and honestly.", "Embrace intellectual connection and shared ideas."],
  water: ["Share your deepest feelings without fear.", "Nurture emotional bonds through empathy and care."]
};