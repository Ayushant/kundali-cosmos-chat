
// This utility provides advanced astrological interpretations based on kundali chart data
// It uses a pattern-matching approach with a comprehensive knowledge base

import { zodiacSigns, nakshatras } from './kundali-engine';

// Types for our interpretation system
export interface PlanetaryInfluence {
  planet: string;
  sign: string;
  house: number;
  strength: 'strong' | 'neutral' | 'weak';
  aspects: Array<{planet: string, type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile'}>;
}

export interface KundaliInsights {
  ascendant?: string;
  moonSign?: string;
  sunSign?: string;
  currentDasha?: string;
  planets?: Array<{
    name: string;
    sign: string;
    house: number;
    degree?: number;
    nakshatra?: string;
  }>;
  strongHouses?: number[];
  weakHouses?: number[];
}

// Planetary rulerships
const planetRulerships: Record<string, string[]> = {
  'Sun': ['self', 'ego', 'vitality', 'leadership', 'father', 'authority'],
  'Moon': ['emotions', 'mother', 'nurturing', 'home', 'habits', 'instincts'],
  'Mercury': ['communication', 'intellect', 'learning', 'siblings', 'local travel', 'thought process'],
  'Venus': ['love', 'relationships', 'beauty', 'arts', 'values', 'pleasure', 'harmony'],
  'Mars': ['energy', 'action', 'passion', 'drive', 'aggression', 'courage'],
  'Jupiter': ['expansion', 'luck', 'philosophy', 'higher learning', 'travel', 'abundance'],
  'Saturn': ['discipline', 'responsibility', 'limitations', 'structure', 'time', 'karma'],
  'Rahu': ['obsession', 'desire', 'illusion', 'innovation', 'unconventional', 'amplification'],
  'Ketu': ['spirituality', 'liberation', 'past life', 'detachment', 'isolation', 'intuition']
};

// House meanings
const houseMeanings: Record<number, string[]> = {
  1: ['self', 'physical body', 'personality', 'appearance', 'beginnings', 'first impressions'],
  2: ['possessions', 'values', 'wealth', 'speech', 'family', 'early childhood'],
  3: ['communication', 'siblings', 'neighbors', 'short journeys', 'early education', 'writing'],
  4: ['home', 'mother', 'real estate', 'emotional foundation', 'private life', 'roots'],
  5: ['creativity', 'romance', 'children', 'pleasure', 'entertainment', 'self-expression'],
  6: ['health', 'daily routine', 'service', 'work', 'pets', 'habits'],
  7: ['partnerships', 'marriage', 'contracts', 'open enemies', 'business relationships', 'cooperation'],
  8: ['transformation', 'joint resources', 'sexuality', 'death', 'taxes', 'occult'],
  9: ['higher education', 'philosophy', 'long-distance travel', 'spirituality', 'publishing', 'foreign cultures'],
  10: ['career', 'reputation', 'public image', 'authority', 'ambition', 'father'],
  11: ['friends', 'groups', 'hopes', 'wishes', 'humanitarian efforts', 'technology'],
  12: ['spirituality', 'isolation', 'hidden enemies', 'institutions', 'self-undoing', 'subconscious']
};

// Sign qualities
const signQualities: Record<string, Record<string, string[]>> = {
  'Aries': {
    keywords: ['initiative', 'courage', 'impulsive', 'leadership', 'pioneering', 'energetic'],
    element: 'fire',
    modality: 'cardinal'
  },
  'Taurus': {
    keywords: ['stability', 'sensuality', 'patience', 'determination', 'practical', 'reliable'],
    element: 'earth',
    modality: 'fixed'
  },
  'Gemini': {
    keywords: ['communication', 'versatility', 'curiosity', 'adaptability', 'intellect', 'social'],
    element: 'air',
    modality: 'mutable'
  },
  'Cancer': {
    keywords: ['nurturing', 'emotional', 'protective', 'intuitive', 'security-oriented', 'sensitive'],
    element: 'water',
    modality: 'cardinal'
  },
  'Leo': {
    keywords: ['creative', 'proud', 'theatrical', 'warm-hearted', 'generous', 'dignified'],
    element: 'fire',
    modality: 'fixed'
  },
  'Virgo': {
    keywords: ['analytical', 'practical', 'detailed', 'perfectionist', 'discriminating', 'service-oriented'],
    element: 'earth',
    modality: 'mutable'
  },
  'Libra': {
    keywords: ['diplomatic', 'harmonious', 'partnership-oriented', 'fair', 'aesthetic', 'balanced'],
    element: 'air',
    modality: 'cardinal'
  },
  'Scorpio': {
    keywords: ['intense', 'passionate', 'secretive', 'transformative', 'investigative', 'powerful'],
    element: 'water',
    modality: 'fixed'
  },
  'Sagittarius': {
    keywords: ['philosophical', 'adventurous', 'optimistic', 'freedom-loving', 'expansive', 'honest'],
    element: 'fire',
    modality: 'mutable'
  },
  'Capricorn': {
    keywords: ['ambitious', 'disciplined', 'responsible', 'cautious', 'practical', 'authoritative'],
    element: 'earth',
    modality: 'cardinal'
  },
  'Aquarius': {
    keywords: ['innovative', 'humanitarian', 'independent', 'intellectual', 'unique', 'progressive'],
    element: 'air',
    modality: 'fixed'
  },
  'Pisces': {
    keywords: ['compassionate', 'intuitive', 'spiritual', 'imaginative', 'sensitive', 'dreamy'],
    element: 'water',
    modality: 'mutable'
  }
};

// Nakshatra meanings for deeper analysis
const nakshatraMeanings: Record<string, {deity: string, symbol: string, qualities: string[]}> = {
  'Ashwini': {
    deity: 'Ashwini Kumaras',
    symbol: 'Horse\'s head',
    qualities: ['healing', 'quick', 'competitive', 'rejuvenating', 'energetic']
  },
  'Bharani': {
    deity: 'Yama',
    symbol: 'Female reproductive organ',
    qualities: ['transformation', 'restraint', 'death', 'rebirth', 'endurance']
  },
  'Krittika': {
    deity: 'Agni',
    symbol: 'Razor or axe',
    qualities: ['purification', 'fiery', 'focused', 'sharp', 'ambitious']
  },
  'Rohini': {
    deity: 'Brahma',
    symbol: 'Chariot or temple',
    qualities: ['growth', 'fertility', 'sensuality', 'creativity', 'grounded']
  },
  'Mrigashira': {
    deity: 'Soma',
    symbol: 'Deer\'s head',
    qualities: ['searching', 'gentle', 'adaptable', 'receptive', 'nurturing']
  },
  'Ardra': {
    deity: 'Rudra',
    symbol: 'Teardrop',
    qualities: ['storm', 'transformation', 'effort', 'volatile', 'passionate']
  },
  // I'm adding a few key nakshatras for brevity, but we would include all 27 in a complete implementation
  'Punarvasu': {
    deity: 'Aditi',
    symbol: 'Bow and quiver',
    qualities: ['renewal', 'return', 'abundance', 'nurturing', 'wisdom']
  },
  'Magha': {
    deity: 'Pitris',
    symbol: 'Throne',
    qualities: ['authority', 'power', 'royalty', 'ancestral ties', 'leadership']
  },
  'Revati': {
    deity: 'Pushan',
    symbol: 'Fish or drum',
    qualities: ['nourishment', 'protection', 'compassion', 'prosperity', 'completion']
  }
  // Additional nakshatras would be defined here
};

// Get the dominant planet based on house placement and aspects
export const getDominantPlanet = (insights: KundaliInsights): string | null => {
  if (!insights.planets || insights.planets.length === 0) return null;
  
  const planetScores: Record<string, number> = {};
  
  // Score planets based on house placement and aspects
  insights.planets.forEach(planet => {
    // Initialize score
    if (!planetScores[planet.name]) planetScores[planet.name] = 0;
    
    // Add score based on house strength
    if (insights.strongHouses?.includes(planet.house)) {
      planetScores[planet.name] += 3;
    }
    
    // Add score based on natural planet strength
    if (['Sun', 'Moon', 'Jupiter'].includes(planet.name)) {
      planetScores[planet.name] += 2;
    }
    
    // Add score if planet is in its own sign
    if ((planet.name === 'Sun' && planet.sign === 'Leo') ||
        (planet.name === 'Moon' && planet.sign === 'Cancer') ||
        (planet.name === 'Mercury' && ['Gemini', 'Virgo'].includes(planet.sign)) ||
        (planet.name === 'Venus' && ['Taurus', 'Libra'].includes(planet.sign)) ||
        (planet.name === 'Mars' && ['Aries', 'Scorpio'].includes(planet.sign)) ||
        (planet.name === 'Jupiter' && ['Sagittarius', 'Pisces'].includes(planet.sign)) ||
        (planet.name === 'Saturn' && ['Capricorn', 'Aquarius'].includes(planet.sign))) {
      planetScores[planet.name] += 3;
    }
    
    // Add score for lagna lord (planet ruling the ascendant sign)
    if (insights.ascendant?.includes('Leo') && planet.name === 'Sun') planetScores[planet.name] += 3;
    if (insights.ascendant?.includes('Cancer') && planet.name === 'Moon') planetScores[planet.name] += 3;
    if (insights.ascendant?.includes('Gemini') && planet.name === 'Mercury') planetScores[planet.name] += 3;
    if (insights.ascendant?.includes('Taurus') && planet.name === 'Venus') planetScores[planet.name] += 3;
    if (insights.ascendant?.includes('Aries') && planet.name === 'Mars') planetScores[planet.name] += 3;
    if (insights.ascendant?.includes('Sagittarius') && planet.name === 'Jupiter') planetScores[planet.name] += 3;
    if (insights.ascendant?.includes('Capricorn') && planet.name === 'Saturn') planetScores[planet.name] += 3;
    
    // Special positions
    if (planet.house === 1 || planet.house === 10) planetScores[planet.name] += 2; // Angular houses
    if (planet.house === 5 || planet.house === 9) planetScores[planet.name] += 1; // Trine houses
  });
  
  // Find the planet with the highest score
  let highestScore = 0;
  let dominantPlanet: string | null = null;
  
  Object.entries(planetScores).forEach(([planet, score]) => {
    if (score > highestScore) {
      highestScore = score;
      dominantPlanet = planet;
    }
  });
  
  return dominantPlanet;
};

// Get planetary dignity (how well-placed a planet is)
export const getPlanetaryDignity = (planet: string, sign: string): 'exalted' | 'domicile' | 'detriment' | 'fall' | 'neutral' => {
  const dignityMap: Record<string, Record<string, 'exalted' | 'domicile' | 'detriment' | 'fall'>> = {
    'Sun': {
      'Aries': 'exalted',
      'Leo': 'domicile',
      'Libra': 'fall',
      'Aquarius': 'detriment'
    },
    'Moon': {
      'Taurus': 'exalted',
      'Cancer': 'domicile',
      'Scorpio': 'fall',
      'Capricorn': 'detriment'
    },
    'Mercury': {
      'Virgo': 'exalted',
      'Gemini': 'domicile',
      'Virgo': 'domicile',
      'Pisces': 'fall',
      'Sagittarius': 'detriment'
    },
    'Venus': {
      'Pisces': 'exalted',
      'Taurus': 'domicile',
      'Libra': 'domicile',
      'Virgo': 'fall',
      'Aries': 'detriment',
      'Scorpio': 'detriment'
    },
    'Mars': {
      'Capricorn': 'exalted',
      'Aries': 'domicile',
      'Scorpio': 'domicile',
      'Cancer': 'fall',
      'Libra': 'detriment',
      'Taurus': 'detriment'
    },
    'Jupiter': {
      'Cancer': 'exalted',
      'Sagittarius': 'domicile',
      'Pisces': 'domicile',
      'Capricorn': 'fall',
      'Gemini': 'detriment',
      'Virgo': 'detriment'
    },
    'Saturn': {
      'Libra': 'exalted',
      'Capricorn': 'domicile',
      'Aquarius': 'domicile',
      'Aries': 'fall',
      'Cancer': 'detriment',
      'Leo': 'detriment'
    },
    'Rahu': {},  // Nodes don't have traditional dignities
    'Ketu': {}   // Nodes don't have traditional dignities
  };
  
  if (dignityMap[planet]?.[sign]) {
    return dignityMap[planet][sign];
  }
  
  return 'neutral';
};

// Generate personalized interpretations based on chart data
export const generatePersonalizedInsight = (
  topic: 'career' | 'relationship' | 'health' | 'spiritual' | 'wealth' | 'general',
  insights: KundaliInsights
): string => {
  if (!insights || !insights.planets || insights.planets.length === 0) {
    return "I don't have enough information about your birth chart to provide insights.";
  }

  // Get relevant houses for the topic
  let relevantHouses: number[] = [];
  let relevantPlanets: string[] = [];

  switch (topic) {
    case 'career':
      relevantHouses = [1, 2, 6, 10];
      relevantPlanets = ['Sun', 'Mars', 'Saturn', 'Jupiter', 'Mercury'];
      break;
    case 'relationship':
      relevantHouses = [1, 5, 7, 8];
      relevantPlanets = ['Venus', 'Mars', 'Moon', 'Jupiter'];
      break;
    case 'health':
      relevantHouses = [1, 6, 8, 12];
      relevantPlanets = ['Sun', 'Moon', 'Mars', 'Saturn'];
      break;
    case 'spiritual':
      relevantHouses = [4, 8, 9, 12];
      relevantPlanets = ['Jupiter', 'Moon', 'Ketu', 'Neptune'];
      break;
    case 'wealth':
      relevantHouses = [1, 2, 5, 8, 9, 11];
      relevantPlanets = ['Jupiter', 'Venus', 'Sun', 'Moon'];
      break;
    case 'general':
      relevantHouses = [1, 4, 7, 10];
      relevantPlanets = ['Sun', 'Moon', 'Jupiter', 'Saturn'];
      break;
  }

  // Find planets in the relevant houses
  const planetsInRelevantHouses = insights.planets.filter(p => 
    relevantHouses.includes(p.house)
  );

  // Find relevant planets regardless of house
  const relevantPlanetObjects = insights.planets.filter(p => 
    relevantPlanets.includes(p.name)
  );

  // Build the interpretation
  let interpretation = '';

  // Start with ascendant analysis
  if (insights.ascendant) {
    const ascSign = insights.ascendant.split('-')[0].trim();
    interpretation += `With ${ascSign} ascendant, your ${
      topic === 'career' ? 'natural approach to work' :
      topic === 'relationship' ? 'relationship style' :
      topic === 'health' ? 'physical constitution' :
      topic === 'spiritual' ? 'spiritual path' :
      topic === 'wealth' ? 'approach to finances' : 'basic nature'
    } tends to be ${signQualities[ascSign]?.keywords.slice(0, 3).join(', ')}. `;
  }

  // Add dominant planet influence
  const dominantPlanet = getDominantPlanet(insights);
  if (dominantPlanet) {
    const planetObj = insights.planets.find(p => p.name === dominantPlanet);
    if (planetObj) {
      interpretation += `Your chart is strongly influenced by ${dominantPlanet} in ${planetObj.sign}, which brings qualities of ${
        planetRulerships[dominantPlanet]?.slice(0, 3).join(', ')
      } to your ${topic} matters. `;
    }
  }

  // Add insights based on planets in relevant houses
  if (planetsInRelevantHouses.length > 0) {
    interpretation += `${
      topic === 'career' ? 'Your career path' :
      topic === 'relationship' ? 'Your relationships' :
      topic === 'health' ? 'Your health' :
      topic === 'spiritual' ? 'Your spiritual journey' :
      topic === 'wealth' ? 'Your financial situation' : 'Your life path'
    } is particularly influenced by `;

    planetsInRelevantHouses.forEach((planet, i) => {
      const dignity = getPlanetaryDignity(planet.name, planet.sign);
      const dignityDescription = 
        dignity === 'exalted' ? 'strongly positive' :
        dignity === 'domicile' ? 'well-placed' :
        dignity === 'detriment' ? 'challenging' :
        dignity === 'fall' ? 'difficult' : 'neutral';

      interpretation += `${planet.name} in ${planet.sign} (${dignityDescription}) in house ${planet.house}`;
      
      if (i < planetsInRelevantHouses.length - 2) {
        interpretation += ', ';
      } else if (i === planetsInRelevantHouses.length - 2) {
        interpretation += ' and ';
      }
    });
    interpretation += '. ';
  }

  // Add topic-specific insights
  switch (topic) {
    case 'career':
      const tenthHousePlanets = insights.planets.filter(p => p.house === 10);
      if (tenthHousePlanets.length > 0) {
        interpretation += `With ${tenthHousePlanets.map(p => p.name).join(' and ')} in your 10th house, you may excel in careers involving ${
          tenthHousePlanets.flatMap(p => planetRulerships[p.name]?.slice(0, 2) || []).join(', ')
        }. `;
      } else {
        const careerRuler = insights.planets.find(p => p.house === 10 || p.name === 'Saturn' || p.name === 'Sun');
        if (careerRuler) {
          interpretation += `Your career may be influenced by qualities of ${careerRuler.sign}, suggesting talents in ${
            signQualities[careerRuler.sign]?.keywords.slice(0, 2).join(' and ')
          }. `;
        }
      }
      
      // Check for Saturn aspects as they relate to career stability
      const saturn = insights.planets.find(p => p.name === 'Saturn');
      if (saturn) {
        interpretation += `Saturn in your ${saturn.house}${saturn.house === 10 ? 'th house of career' : 'th house'} suggests ${
          saturn.house === 10 ? 'a structured career with potential for authority and long-term achievement' :
          saturn.house === 1 ? 'you work hard for your achievements and may face early career challenges' :
          saturn.house === 7 ? 'business partnerships may be significant in your professional life' :
          'discipline and perseverance are important factors in your career development'
        }. `;
      }
      break;
      
    case 'relationship':
      const venus = insights.planets.find(p => p.name === 'Venus');
      const mars = insights.planets.find(p => p.name === 'Mars');
      const moon = insights.planets.find(p => p.name === 'Moon');
      
      if (venus) {
        interpretation += `Venus in ${venus.sign} and house ${venus.house} suggests you ${
          venus.sign === 'Taurus' || venus.sign === 'Libra' ? 'approach relationships with natural harmony and attraction' :
          venus.sign === 'Aries' || venus.sign === 'Scorpio' ? 'seek passion and intensity in relationships' :
          venus.sign === 'Gemini' || venus.sign === 'Aquarius' ? 'value intellectual connection in partnerships' :
          venus.sign === 'Cancer' || venus.sign === 'Pisces' ? 'seek emotional depth and nurturing bonds' :
          'balance practical concerns with romantic ideals'
        }. `;
      }
      
      if (mars && venus) {
        interpretation += `The relationship between your Venus and Mars shows ${
          mars.sign === venus.sign ? 'harmony between your romantic desires and actions' :
          'potential creative tension between what you value and how you pursue it'
        }. `;
      }
      
      if (moon) {
        interpretation += `Your emotional needs in relationships are shaped by Moon in ${moon.sign}, making you ${
          signQualities[moon.sign]?.keywords.slice(0, 2).join(' and ')
        } in matters of the heart. `;
      }
      break;
      
    case 'health':
      // Add more specific health insights based on the lagna (ascendant) and planets
      const ascendantSign = insights.ascendant?.split('-')[0].trim();
      if (ascendantSign) {
        interpretation += `Your ${ascendantSign} ascendant suggests attention to ${
          ascendantSign === 'Aries' ? 'head, brain, and adrenal system' :
          ascendantSign === 'Taurus' ? 'throat, neck and thyroid' :
          ascendantSign === 'Gemini' ? 'lungs, shoulders, arms and nervous system' :
          ascendantSign === 'Cancer' ? 'stomach, breasts and digestive system' :
          ascendantSign === 'Leo' ? 'heart, spine and circulation' :
          ascendantSign === 'Virgo' ? 'intestines, digestive system and assimilation' :
          ascendantSign === 'Libra' ? 'kidneys, lower back and adrenals' :
          ascendantSign === 'Scorpio' ? 'reproductive and elimination systems' :
          ascendantSign === 'Sagittarius' ? 'hips, thighs and liver' :
          ascendantSign === 'Capricorn' ? 'bones, joints and skin' :
          ascendantSign === 'Aquarius' ? 'circulation, ankles and electrical system' :
          'feet, lymphatic system and pineal gland'
        }. `;
      }
      
      // Check planets in 6th house (health)
      const sixthHousePlanets = insights.planets.filter(p => p.house === 6);
      if (sixthHousePlanets.length > 0) {
        interpretation += `Planets in your 6th house of health (${sixthHousePlanets.map(p => p.name).join(', ')}) suggest ${
          sixthHousePlanets.some(p => p.name === 'Saturn') ? 'potential for chronic issues requiring long-term management' :
          sixthHousePlanets.some(p => p.name === 'Jupiter') ? 'generally good vitality but potential for excess' :
          sixthHousePlanets.some(p => p.name === 'Mars') ? 'dynamic energy but potential for inflammation or injuries' :
          'attention to daily health habits is important for your wellbeing'
        }. `;
      }
      break;
      
    case 'spiritual':
      // Check for 9th and 12th house placements
      const spiritualHousePlanets = insights.planets.filter(p => p.house === 9 || p.house === 12);
      const ketu = insights.planets.find(p => p.name === 'Ketu');
      const jupiter = insights.planets.find(p => p.name === 'Jupiter');
      
      if (spiritualHousePlanets.length > 0) {
        interpretation += `Your spiritual nature is highlighted by ${spiritualHousePlanets.map(p => p.name).join(' and ')} in the ${
          spiritualHousePlanets[0].house === 9 ? 'house of philosophy and higher understanding' : 'house of mysticism and transcendence'
        }. `;
      }
      
      if (ketu) {
        interpretation += `Ketu in your ${ketu.house}th house points to ${
          ketu.house === 12 ? 'deep spiritual gifts from past lives' :
          ketu.house === 9 ? 'innate spiritual wisdom requiring less formal religious structure' :
          ketu.house === 3 ? 'intuitive knowledge that transcends intellectual learning' :
          'areas where spiritual detachment helps your evolution'
        }. `;
      }
      
      if (jupiter) {
        interpretation += `Jupiter in ${jupiter.sign} guides your spiritual expansion through ${
          jupiter.sign === 'Sagittarius' || jupiter.sign === 'Pisces' ? 'natural connection to higher wisdom' :
          jupiter.sign === 'Cancer' || jupiter.sign === 'Scorpio' ? 'emotional depth and transformative experiences' :
          jupiter.sign === 'Aries' || jupiter.sign === 'Leo' ? 'inspired leadership and creative expression' :
          'structured learning and practical application of wisdom'
        }. `;
      }
      break;
      
    case 'wealth':
      // Check 2nd, 11th houses (wealth and gains)
      const wealthPlanets = insights.planets.filter(p => p.house === 2 || p.house === 11);
      const secondHousePlanets = insights.planets.filter(p => p.house === 2);
      
      if (secondHousePlanets.length > 0) {
        interpretation += `Your approach to wealth is influenced by ${secondHousePlanets.map(p => p.name).join(' and ')} in the 2nd house, suggesting ${
          secondHousePlanets.some(p => p.name === 'Jupiter') ? 'potential for abundance and financial expansion' :
          secondHousePlanets.some(p => p.name === 'Venus') ? 'appreciation for quality and ability to attract resources' :
          secondHousePlanets.some(p => p.name === 'Saturn') ? 'disciplined approach to building steady wealth over time' :
          'your personal resources are tied to ' + secondHousePlanets.flatMap(p => planetRulerships[p.name]?.slice(0, 1) || []).join(' and ')
        }. `;
      }
      
      // Check Jupiter placement for wealth potential
      if (jupiter) {
        interpretation += `Jupiter in your ${jupiter.house}th house suggests financial opportunities through ${
          jupiter.house === 1 ? 'personal initiatives and self-development' :
          jupiter.house === 2 ? 'steady accumulation of assets and resources' :
          jupiter.house === 5 ? 'creative ventures, investments or speculative activities' :
          jupiter.house === 9 ? 'higher education, publishing or international connections' :
          jupiter.house === 10 ? 'career advancement and professional recognition' :
          jupiter.house === 11 ? 'networks, groups and social connections' :
          houseMeanings[jupiter.house]?.slice(0, 2).join(' and ')
        }. `;
      }
      break;
      
    case 'general':
      // Look at current dasha period
      if (insights.currentDasha) {
        const dashaPlanet = insights.currentDasha.split(' ')[0];
        interpretation += `Your current ${insights.currentDasha} brings focus to qualities of ${dashaPlanet}: ${
          planetRulerships[dashaPlanet]?.slice(0, 3).join(', ')
        }. `;
      }
      
      // Add insights about strong houses
      if (insights.strongHouses && insights.strongHouses.length > 0) {
        interpretation += `Your chart shows strengths in houses ${insights.strongHouses.join(', ')}, highlighting areas of ${
          insights.strongHouses.flatMap(house => houseMeanings[house]?.slice(0, 1) || []).join(', ')
        }. `;
      }
      
      // Note sun and moon positions for general character
      const sun = insights.planets.find(p => p.name === 'Sun');
      const moonSign = insights.moonSign?.split('-')[0].trim();
      
      if (sun && moonSign) {
        interpretation += `With Sun in ${sun.sign} and Moon in ${moonSign}, you balance ${
          signQualities[sun.sign]?.keywords[0]
        } with ${
          signQualities[moonSign]?.keywords[0]
        } qualities. `;
      }
      break;
  }
  
  // Add conclusion based on overall chart strength
  const dominantHouses = insights.strongHouses || [1, 5, 9];
  
  interpretation += `Overall, your chart suggests particular strength in matters of ${
    dominantHouses.flatMap(house => houseMeanings[house]?.slice(0, 1) || []).join(', ')
  }, which can be channeled positively into your ${topic} development.`;

  return interpretation;
};

// Analyze compatibility between two charts (simplified version)
export const analyzeCompatibility = (insights1: KundaliInsights, insights2: KundaliInsights): string => {
  // This would be expanded in a full implementation
  return "Compatibility analysis requires comparing both individuals' complete birth charts. The current implementation focuses on individual interpretations.";
};

// Generate transit interpretations (simplified)
export const generateTransitInsights = (insights: KundaliInsights): string => {
  // This would be expanded in a full implementation to calculate current transits
  const currentDate = new Date();
  return `Transit interpretations analyze how current planetary positions interact with your birth chart. Current date: ${currentDate.toLocaleDateString()}.`;
};

// Chat response generator that uses the chart data to create detailed, personalized astrological insights
export const generateAstrologicalResponse = (
  query: string,
  insights: KundaliInsights,
  language: 'english' | 'hindi' | 'hinglish' = 'english'
): string => {
  // Extract intent from query
  const lowerQuery = query.toLowerCase();
  
  // Determine topic from query
  let topic: 'career' | 'relationship' | 'health' | 'spiritual' | 'wealth' | 'general' = 'general';
  
  if (lowerQuery.includes('career') || lowerQuery.includes('job') || lowerQuery.includes('profession') || 
      lowerQuery.includes('work') || lowerQuery.includes('business')) {
    topic = 'career';
  } else if (lowerQuery.includes('love') || lowerQuery.includes('relationship') || lowerQuery.includes('marriage') || 
            lowerQuery.includes('partner') || lowerQuery.includes('romance')) {
    topic = 'relationship';
  } else if (lowerQuery.includes('health') || lowerQuery.includes('medical') || lowerQuery.includes('wellness') || 
            lowerQuery.includes('disease') || lowerQuery.includes('fitness')) {
    topic = 'health';
  } else if (lowerQuery.includes('spiritual') || lowerQuery.includes('meditation') || lowerQuery.includes('soul') || 
            lowerQuery.includes('yoga') || lowerQuery.includes('dharma')) {
    topic = 'spiritual';
  } else if (lowerQuery.includes('money') || lowerQuery.includes('wealth') || lowerQuery.includes('finance') || 
            lowerQuery.includes('investment') || lowerQuery.includes('income')) {
    topic = 'wealth';
  }

  // Generate personalized insight based on chart data
  const insight = generatePersonalizedInsight(topic, insights);
  
  // Return in the requested language (for a real implementation, this would use proper translation)
  if (language === 'english') {
    return insight;
  } else if (language === 'hindi') {
    // Simplified placeholder for Hindi translation
    return `हिंदी अनुवाद: ${insight}`;
  } else {
    // Simplified placeholder for Hinglish translation
    return `Hinglish: ${insight}`;
  }
};
