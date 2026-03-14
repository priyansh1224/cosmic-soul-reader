// ═══════════════════════════════════════════════════════════════════
// 📿 COSMIC RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════════

export const RECOMMENDATIONS = {
  fire: {
    meditation: {
      title: 'Active Fire Meditation',
      description: 'Candle gazing meditation to channel your fiery energy into focused intention.',
      icon: '🕯️',
      duration: '10 minutes',
    },
    crystal: {
      title: 'Carnelian Power Stone',
      description: 'Carry carnelian to amplify your natural courage and creative vitality.',
      icon: '🔴',
    },
    activity: {
      title: 'Sunrise Warrior Practice',
      description: 'Practice sun salutations at dawn to align with your solar energy.',
      icon: '🌅',
    },
    music: {
      title: 'Drumming & Rhythmic Music',
      description: 'Tribal drums and powerful rhythms that match your fiery heartbeat.',
      icon: '🥁',
    },
    tea: {
      title: 'Ginger & Cinnamon Tea',
      description: 'Warming spices that fuel your inner fire and boost metabolism.',
      icon: '🍵',
    },
  },
  earth: {
    meditation: {
      title: 'Grounding Earth Meditation',
      description: 'Barefoot meditation on natural ground to strengthen your earth connection.',
      icon: '🌿',
      duration: '15 minutes',
    },
    crystal: {
      title: 'Green Aventurine',
      description: 'The stone of prosperity and growth — perfect for your earth-sign ambitions.',
      icon: '💚',
    },
    activity: {
      title: 'Forest Bathing (Shinrin-yoku)',
      description: 'Immerse yourself in nature to recharge your earthy soul.',
      icon: '🌲',
    },
    music: {
      title: 'Nature Sounds & Acoustic',
      description: 'Flowing water, birdsong, and gentle acoustic instruments.',
      icon: '🎵',
    },
    tea: {
      title: 'Chamomile & Lavender Tea',
      description: 'Soothing herbs that calm your hardworking earth energy.',
      icon: '🌼',
    },
  },
  air: {
    meditation: {
      title: 'Breathwork & Pranayama',
      description: 'Conscious breathing techniques to harness your air element\'s power.',
      icon: '💨',
      duration: '12 minutes',
    },
    crystal: {
      title: 'Blue Lace Agate',
      description: 'Enhances communication and clarity — essential for air signs.',
      icon: '💙',
    },
    activity: {
      title: 'Creative Journaling',
      description: 'Free-write your cosmic downloads to channel your mental energy.',
      icon: '📝',
    },
    music: {
      title: 'Wind Instruments & Ambient',
      description: 'Flutes, wind chimes, and ethereal ambient soundscapes.',
      icon: '🎶',
    },
    tea: {
      title: 'Peppermint & Lemon Balm Tea',
      description: 'Clarifying herbs that sharpen your already brilliant mind.',
      icon: '🍃',
    },
  },
  water: {
    meditation: {
      title: 'Ocean Visualization Meditation',
      description: 'Guided meditation imagining yourself merging with the cosmic ocean.',
      icon: '🌊',
      duration: '20 minutes',
    },
    crystal: {
      title: 'Moonstone',
      description: 'Enhances intuition and emotional balance — your water-sign essentials.',
      icon: '🤍',
    },
    activity: {
      title: 'Sacred Bath Ritual',
      description: 'Moon-charged water bath with crystals and essential oils for soul restoration.',
      icon: '🛁',
    },
    music: {
      title: 'Singing Bowls & Water Sounds',
      description: 'Crystal singing bowls and flowing water sounds for deep emotional healing.',
      icon: '🔔',
    },
    tea: {
      title: 'Jasmine & Rose Tea',
      description: 'Floral elixirs that nourish your emotional depth and psychic sensitivity.',
      icon: '🌹',
    },
  },
}

export const getRecommendations = (elementType) => {
  return RECOMMENDATIONS[elementType] || RECOMMENDATIONS.water
}