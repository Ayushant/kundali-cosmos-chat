
// Planet IDs as per SwissEph documentation
export enum Planet {
  SUN = 0,
  MOON = 1,
  MERCURY = 2,
  VENUS = 3,
  MARS = 4,
  JUPITER = 5,
  SATURN = 6,
  RAHU = 10, // North Node (SwissEph uses MEAN_NODE)
  KETU = 11  // South Node (calculated from Rahu)
}

export const planetNames: Record<number, string> = {
  [Planet.SUN]: "Sun",
  [Planet.MOON]: "Moon",
  [Planet.MERCURY]: "Mercury",
  [Planet.VENUS]: "Venus",
  [Planet.MARS]: "Mars",
  [Planet.JUPITER]: "Jupiter",
  [Planet.SATURN]: "Saturn",
  [Planet.RAHU]: "Rahu",
  [Planet.KETU]: "Ketu"
};

// Zodiac signs
export const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Get zodiac sign from longitude
export const getZodiacSign = (longitude: number): string => {
  const signIndex = Math.floor(longitude / 30) % 12;
  return zodiacSigns[signIndex];
};

// Get degrees within the sign
export const getSignDegrees = (longitude: number): number => {
  return longitude % 30;
};

// Get nakshatra (lunar mansions) - 27 divisions
export const nakshatras = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

export const getNakshatra = (longitude: number): string => {
  // Each nakshatra is 13°20' (or 13.33°)
  const nakshatraIndex = Math.floor((longitude * 27) / 360) % 27;
  return nakshatras[nakshatraIndex];
};

export interface PlanetPosition {
  id: number;
  name: string;
  longitude: number;
  sign: string;
  house: number;
  degree: number;
  nakshatra: string;
}

// Calculate house from ascendant and longitude
export const calculateHouse = (longitude: number, ascendantLongitude: number): number => {
  let house = Math.floor((longitude - ascendantLongitude) / 30) + 1;
  if (house <= 0) house += 12;
  return ((house - 1) % 12) + 1; // Ensure it's between 1-12
};

// Format degrees to display as degrees°minutes'seconds"
export const formatDegrees = (degrees: number): string => {
  const totalDegrees = Math.floor(degrees);
  const minutesFloat = (degrees - totalDegrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.floor((minutesFloat - minutes) * 60);
  
  return `${totalDegrees}°${minutes}'${seconds}"`;
};

// This interface matches the expected input from birth-form
export interface BirthDetails {
  date?: Date;
  time?: string;
  place?: string;
  latitude?: number;
  longitude?: number;
}
