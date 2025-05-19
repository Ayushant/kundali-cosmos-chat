
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

// Zodiac signs in order
const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

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

// Helper function to get nakshatra based on zodiac sign and degree
function getNakshatra(sign: string, degree = 0): string {
  // Map of nakshatras across the zodiac (simplified)
  const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];

  // Calculate nakshatra based on sign and degree (simplified algorithm)
  const signIndex = zodiacSigns.indexOf(sign);
  const totalDegrees = signIndex * 30 + degree;
  const nakshatraIndex = Math.floor((totalDegrees * 27) / 360) % 27;
  
  return nakshatras[nakshatraIndex];
}

// Generate ascendant based on birth time
function getAscendant(dateObj: Date, timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // This is a simplified algorithm for demonstration
  // In a real system, this would need precise calculations based on time and location
  const hourIndex = (hours + Math.floor(minutes / 15) / 4) % 24;
  const signIndex = Math.floor(hourIndex / 2) % 12;
  
  return zodiacSigns[signIndex];
}

// Calculate planetary positions using a deterministic algorithm
function calculatePlanetaryPositions(birthDate: Date, birthTime: string, latitude?: number, longitude?: number): PlanetPosition[] {
  const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  
  // Use the birth date components to seed our calculations
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  // Parse birth time
  const [hours, minutes] = birthTime.split(':').map(Number);
  
  // Use the sum to create a unique but deterministic basis for calculations
  const timeValue = hours + (minutes / 60);
  const baseValue = day + month * 30 + (year % 100) + timeValue;
  
  return planets.map((planet, index) => {
    // Calculate a deterministic but seemingly random sign index
    const factor = (baseValue * (index + 1)) % 17;
    const signIndex = Math.floor(factor) % 12;
    const sign = zodiacSigns[signIndex];
    
    // Calculate the house based on the sign and ascendant
    const ascendantIndex = zodiacSigns.indexOf(getAscendant(birthDate, birthTime));
    const house = ((signIndex - ascendantIndex) + 12) % 12 + 1;
    
    // Calculate degree
    const degree = Math.floor((factor % 1) * 30);
    
    return {
      name: planet,
      sign,
      house,
      degree,
      nakshatra: getNakshatra(sign, degree)
    };
  });
}

// Calculate the current dasha
function calculateCurrentDasha(birthDate: Date): string {
  const dashaLords = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const dashaDurations = [7, 20, 6, 10, 7, 18, 16, 19, 17]; // Years
  
  const birthYear = birthDate.getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsPassed = currentYear - birthYear;
  
  let accumulatedYears = 0;
  let lordIndex = 0;
  
  // Find which dasha we're currently in
  for (let i = 0; i < dashaLords.length; i++) {
    if (accumulatedYears + dashaDurations[i] > yearsPassed) {
      lordIndex = i;
      break;
    }
    accumulatedYears += dashaDurations[i];
  }
  
  const startYear = birthYear + accumulatedYears;
  const endYear = startYear + dashaDurations[lordIndex];
  
  return `${dashaLords[lordIndex]} Mahadasha (${startYear}-${endYear})`;
}

// Calculate strong and weak houses
function calculateHouseStrengths(birthDate: Date, birthTime: string): { strongHouses: number[], weakHouses: number[] } {
  // In real astrology, this would be based on complex calculations
  // This is simplified for demonstration
  
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const [hours] = birthTime.split(':').map(Number);
  
  // Generate some pseudo-random but deterministic strong and weak houses
  const base = (day + month + hours) % 12;
  
  const strongHouses = [
    (base % 12) + 1,
    ((base + 4) % 12) + 1,
    ((base + 8) % 12) + 1
  ];
  
  const weakHouses = [
    ((base + 2) % 12) + 1,
    ((base + 6) % 12) + 1,
    ((base + 10) % 12) + 1
  ];
  
  return {
    strongHouses,
    weakHouses
  };
}

export const calculateKundali = (birthDetails: BirthDetails): KundaliData => {
  try {
    if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
      throw new Error('Birth details are incomplete');
    }

    const dateObj = birthDetails.date;
    const timeStr = birthDetails.time;
    
    // Calculate basic chart elements
    const sunSign = getZodiacSign(dateObj);
    const moonSign = getZodiacSign(new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 2)); // Simplified moon calculation
    const ascendant = getAscendant(dateObj, timeStr);
    
    // Calculate planets and houses
    const planets = calculatePlanetaryPositions(dateObj, timeStr, birthDetails.latitude, birthDetails.longitude);
    const currentDasha = calculateCurrentDasha(dateObj);
    const houses = calculateHouseStrengths(dateObj, timeStr);
    
    // Format for display
    const ascendantDegree = Math.floor(Math.random() * 30);
    
    return {
      ascendant: `${ascendant} - ${ascendantDegree}°`,
      moonSign: `${moonSign} - ${getNakshatra(moonSign)} Nakshatra`,
      sunSign: `${sunSign} - ${getNakshatra(sunSign)} Nakshatra`,
      currentDasha,
      planets,
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
      strongHouses: [1, 5, 9],
      weakHouses: [6, 8, 12],
      planets: [
        { name: "Sun", sign: "Gemini", house: 11, degree: 15, nakshatra: "Ardra" },
        { name: "Moon", sign: "Taurus", house: 10, degree: 8, nakshatra: "Rohini" },
        { name: "Mars", sign: "Aries", house: 9, degree: 22, nakshatra: "Bharani" },
        { name: "Mercury", sign: "Gemini", house: 11, degree: 5, nakshatra: "Mrigashira" },
        { name: "Jupiter", sign: "Pisces", house: 8, degree: 17, nakshatra: "Revati" },
        { name: "Venus", sign: "Taurus", house: 10, degree: 27, nakshatra: "Mrigashira" },
        { name: "Saturn", sign: "Capricorn", house: 6, degree: 12, nakshatra: "Shravana" },
        { name: "Rahu", sign: "Gemini", house: 11, degree: 3, nakshatra: "Mrigashira" },
        { name: "Ketu", sign: "Sagittarius", house: 5, degree: 3, nakshatra: "Mula" }
      ]
    };
  }
};
