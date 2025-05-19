
interface BirthDetails {
  date?: Date;
  time?: string;
  place?: string;
  latitude?: number;
  longitude?: number;
}

interface PlanetPosition {
  name: string;
  sign: string;
  house: number;
  degree?: number;
  nakshatra?: string;
}

interface KundaliData {
  ascendant: string;
  moonSign: string;
  sunSign: string;
  currentDasha: string;
  planets: PlanetPosition[];
  strongHouses: number[];
  weakHouses: number[];
}

// Helper function to determine zodiac sign based on date
function getZodiacSign(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

// Helper function to get nakshatra based on zodiac sign
function getNakshatra(sign: string): string {
  const nakshatraMap: Record<string, string[]> = {
    "Aries": ["Ashwini", "Bharani", "Krittika"],
    "Taurus": ["Rohini", "Mrigashira", "Ardra"],
    "Gemini": ["Punarvasu", "Pushya", "Ashlesha"],
    "Cancer": ["Magha", "Purva Phalguni", "Uttara Phalguni"],
    "Leo": ["Hasta", "Chitra", "Swati"],
    "Virgo": ["Vishakha", "Anuradha", "Jyeshtha"],
    "Libra": ["Mula", "Purva Ashadha", "Uttara Ashadha"],
    "Scorpio": ["Shravana", "Dhanishta", "Shatabhisha"],
    "Sagittarius": ["Purva Bhadrapada", "Uttara Bhadrapada", "Revati"],
    "Capricorn": ["Ashwini", "Bharani", "Krittika"],
    "Aquarius": ["Rohini", "Mrigashira", "Ardra"],
    "Pisces": ["Punarvasu", "Pushya", "Ashlesha"]
  };

  // Get a consistent nakshatra based on the sign
  const nakshatras = nakshatraMap[sign] || ["Rohini"];
  // Use a deterministic approach to select a nakshatra
  const index = sign.length % nakshatras.length;
  return nakshatras[index];
}

// Generate ascendant based on birth time
function getAscendant(dateObj: Date, timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  const hourIndex = hours % 12;
  
  // Map hours to zodiac signs (rough approximation)
  const ascendantSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  return `${ascendantSigns[hourIndex]}`;
}

// Generate planets and their positions
function generatePlanetPositions(birthDate: Date): PlanetPosition[] {
  const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  
  // Seed the RNG with the birth date for consistent results
  const seed = birthDate.getFullYear() * 10000 + 
               (birthDate.getMonth() + 1) * 100 + 
               birthDate.getDate();
  
  // Simple custom pseudo-random number generator
  const customRandom = (min: number, max: number) => {
    const x = Math.sin(seed * planets.length) * 10000;
    const rand = x - Math.floor(x);
    return Math.floor(rand * (max - min + 1)) + min;
  };
  
  return planets.map((planet, index) => {
    // Deterministically assign zodiac sign based on planet and birth date
    const signIndex = (seed + index) % zodiacSigns.length;
    const sign = zodiacSigns[signIndex];
    
    // Assign house (1-12)
    const house = 1 + ((signIndex + customRandom(0, 3)) % 12);
    
    // Calculate degree (0-29)
    const degree = (birthDate.getDate() + index) % 30;
    
    return {
      name: planet,
      sign: sign,
      house: house,
      degree: degree,
      nakshatra: getNakshatra(sign)
    };
  });
}

// Determine current dasha based on birth date
function getCurrentDasha(birthDate: Date): string {
  const dashaLords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const dashaDurations = [7, 20, 6, 10, 7, 18, 16, 19, 17]; // Years
  
  const currentYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const yearsPassed = currentYear - birthYear;
  
  // Determine which dasha we're in
  let totalYears = 0;
  let lordIndex = 0;
  
  // Find current dasha lord based on years passed
  for (let i = 0; i < dashaLords.length; i++) {
    if (totalYears + dashaDurations[i] > yearsPassed) {
      lordIndex = i;
      break;
    }
    totalYears += dashaDurations[i];
  }
  
  // Calculate end year of current dasha
  const endYear = birthYear + totalYears + dashaDurations[lordIndex];
  const startYear = endYear - dashaDurations[lordIndex];
  
  return `${dashaLords[lordIndex]} Mahadasha (${startYear}-${endYear})`;
}

// Determine strong and weak houses based on birthdate
function getHouseStrengths(birthDate: Date): {strongHouses: number[], weakHouses: number[]} {
  // Use birth date to deterministically generate strong and weak houses
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  
  // Generate strong houses (typically houses 1, 5, 9, 10 are considered good in astrology)
  const strongBase = [1, 5, 9, 10];
  const strongHouses = strongBase.map(house => ((house + day % 3) - 1) % 12 + 1);
  
  // Generate weak houses (typically houses 6, 8, 12 are considered challenging in astrology)
  const weakBase = [6, 8, 12];
  const weakHouses = weakBase.map(house => ((house + month % 3) - 1) % 12 + 1);
  
  return {
    strongHouses: strongHouses.filter(h => !weakHouses.includes(h)),
    weakHouses: weakHouses
  };
}

export const calculateKundali = (birthDetails: BirthDetails): KundaliData => {
  try {
    if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
      throw new Error('Birth details are incomplete');
    }

    const dateObj = birthDetails.date;
    const sunSign = getZodiacSign(dateObj);
    const moonSign = getZodiacSign(new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 2));
    const ascendant = getAscendant(dateObj, birthDetails.time);
    const planets = generatePlanetPositions(dateObj);
    const currentDasha = getCurrentDasha(dateObj);
    const houses = getHouseStrengths(dateObj);

    return {
      ascendant: `${ascendant} - ${Math.floor(Math.random() * 30)}°`,
      moonSign: `${moonSign} - ${getNakshatra(moonSign)} Nakshatra`,
      sunSign: `${sunSign} - ${getNakshatra(sunSign)} Nakshatra`,
      currentDasha: currentDasha,
      planets: planets,
      strongHouses: houses.strongHouses,
      weakHouses: houses.weakHouses
    };
  } catch (error) {
    console.error('Error calculating Kundali:', error);
    
    // Return default data as fallback
    return {
      ascendant: "Leo",
      moonSign: "Taurus - Rohini Nakshatra",
      sunSign: "Gemini - Mrigashira Nakshatra",
      currentDasha: "Jupiter Mahadasha (2020-2036)",
      strongHouses: [1, 5, 9, 10],
      weakHouses: [6, 8, 12],
      planets: [
        { name: "Sun", sign: "Gemini", house: 11 },
        { name: "Moon", sign: "Taurus", house: 10 },
        { name: "Mars", sign: "Aries", house: 9 },
        { name: "Mercury", sign: "Gemini", house: 11 },
        { name: "Jupiter", sign: "Pisces", house: 8 },
        { name: "Venus", sign: "Taurus", house: 10 },
        { name: "Saturn", sign: "Capricorn", house: 6 },
        { name: "Rahu", sign: "Gemini", house: 11 },
        { name: "Ketu", sign: "Sagittarius", house: 5 }
      ]
    };
  }
};
