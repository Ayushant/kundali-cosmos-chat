/**
 * Utility functions for Indian/Vedic astrology calculations
 * Based on the sidereal zodiac rather than the Western tropical zodiac
 */

// Sanskrit and English names for zodiac signs (rashis)
export const zodiacSignsData = [
  { sanskrit: "Mesha", english: "Aries", element: "Fire", ruler: "Mars" },
  { sanskrit: "Vrishabha", english: "Taurus", element: "Earth", ruler: "Venus" },
  { sanskrit: "Mithuna", english: "Gemini", element: "Air", ruler: "Mercury" },
  { sanskrit: "Karka", english: "Cancer", element: "Water", ruler: "Moon" },
  { sanskrit: "Simha", english: "Leo", element: "Fire", ruler: "Sun" },
  { sanskrit: "Kanya", english: "Virgo", element: "Earth", ruler: "Mercury" },
  { sanskrit: "Tula", english: "Libra", element: "Air", ruler: "Venus" },
  { sanskrit: "Vrischika", english: "Scorpio", element: "Water", ruler: "Mars" },
  { sanskrit: "Dhanu", english: "Sagittarius", element: "Fire", ruler: "Jupiter" },
  { sanskrit: "Makara", english: "Capricorn", element: "Earth", ruler: "Saturn" },
  { sanskrit: "Kumbha", english: "Aquarius", element: "Air", ruler: "Saturn" },
  { sanskrit: "Meena", english: "Pisces", element: "Water", ruler: "Jupiter" }
];

// Sanskrit and English names for nakshatras (lunar mansions)
export const nakshatrasData = [
  { sanskrit: "Ashwini", english: "Ashwini", ruler: "Ketu", degree: "0° - 13°20' Aries" },
  { sanskrit: "Bharani", english: "Bharani", ruler: "Venus", degree: "13°20' - 26°40' Aries" },
  { sanskrit: "Krittika", english: "Krittika", ruler: "Sun", degree: "26°40' Aries - 10° Taurus" },
  { sanskrit: "Rohini", english: "Rohini", ruler: "Moon", degree: "10° - 23°20' Taurus" },
  { sanskrit: "Mrigashira", english: "Mrigashira", ruler: "Mars", degree: "23°20' Taurus - 6°40' Gemini" },
  { sanskrit: "Ardra", english: "Ardra", ruler: "Rahu", degree: "6°40' - 20° Gemini" },
  { sanskrit: "Punarvasu", english: "Punarvasu", ruler: "Jupiter", degree: "20° Gemini - 3°20' Cancer" },
  { sanskrit: "Pushya", english: "Pushya", ruler: "Saturn", degree: "3°20' - 16°40' Cancer" },
  { sanskrit: "Ashlesha", english: "Ashlesha", ruler: "Mercury", degree: "16°40' - 30° Cancer" },
  { sanskrit: "Magha", english: "Magha", ruler: "Ketu", degree: "0° - 13°20' Leo" },
  { sanskrit: "Purva Phalguni", english: "Purva Phalguni", ruler: "Venus", degree: "13°20' - 26°40' Leo" },
  { sanskrit: "Uttara Phalguni", english: "Uttara Phalguni", ruler: "Sun", degree: "26°40' Leo - 10° Virgo" },
  { sanskrit: "Hasta", english: "Hasta", ruler: "Moon", degree: "10° - 23°20' Virgo" },
  { sanskrit: "Chitra", english: "Chitra", ruler: "Mars", degree: "23°20' Virgo - 6°40' Libra" },
  { sanskrit: "Swati", english: "Swati", ruler: "Rahu", degree: "6°40' - 20° Libra" },
  { sanskrit: "Vishakha", english: "Vishakha", ruler: "Jupiter", degree: "20° Libra - 3°20' Scorpio" },
  { sanskrit: "Anuradha", english: "Anuradha", ruler: "Saturn", degree: "3°20' - 16°40' Scorpio" },
  { sanskrit: "Jyeshtha", english: "Jyeshtha", ruler: "Mercury", degree: "16°40' - 30° Scorpio" },
  { sanskrit: "Mula", english: "Mula", ruler: "Ketu", degree: "0° - 13°20' Sagittarius" },
  { sanskrit: "Purva Ashadha", english: "Purva Ashadha", ruler: "Venus", degree: "13°20' - 26°40' Sagittarius" },
  { sanskrit: "Uttara Ashadha", english: "Uttara Ashadha", ruler: "Sun", degree: "26°40' Sagittarius - 10° Capricorn" },
  { sanskrit: "Shravana", english: "Shravana", ruler: "Moon", degree: "10° - 23°20' Capricorn" },
  { sanskrit: "Dhanishta", english: "Dhanishta", ruler: "Mars", degree: "23°20' Capricorn - 6°40' Aquarius" },
  { sanskrit: "Shatabhisha", english: "Shatabhisha", ruler: "Rahu", degree: "6°40' - 20° Aquarius" },
  { sanskrit: "Purva Bhadrapada", english: "Purva Bhadrapada", ruler: "Jupiter", degree: "20° Aquarius - 3°20' Pisces" },
  { sanskrit: "Uttara Bhadrapada", english: "Uttara Bhadrapada", ruler: "Saturn", degree: "3°20' - 16°40' Pisces" },
  { sanskrit: "Revati", english: "Revati", ruler: "Mercury", degree: "16°40' - 30° Pisces" }
];

/**
 * Gets the Indian Solar Zodiac sign (Rashi) based on day and month
 * Uses sidereal calendar approximations
 * @param day Day of birth
 * @param month Month of birth (1-12)
 * @returns Object containing Sanskrit and English names of the zodiac sign
 */
export function getIndianZodiacSign(day: number, month: number): {
  sanskrit: string;
  english: string;
  element: string;
  ruler: string;
} {
  // Approximate solar transit dates for sidereal signs
  if ((month === 4 && day >= 14) || (month === 5 && day <= 14))
    return zodiacSignsData[0]; // Mesha (Aries)
  if ((month === 5 && day >= 15) || (month === 6 && day <= 14))
    return zodiacSignsData[1]; // Vrishabha (Taurus)
  if ((month === 6 && day >= 15) || (month === 7 && day <= 14))
    return zodiacSignsData[2]; // Mithuna (Gemini)
  if ((month === 7 && day >= 15) || (month === 8 && day <= 14))
    return zodiacSignsData[3]; // Karka (Cancer)
  if ((month === 8 && day >= 15) || (month === 9 && day <= 15))
    return zodiacSignsData[4]; // Simha (Leo)
  if ((month === 9 && day >= 16) || (month === 10 && day <= 15))
    return zodiacSignsData[5]; // Kanya (Virgo)
  if ((month === 10 && day >= 16) || (month === 11 && day <= 14))
    return zodiacSignsData[6]; // Tula (Libra)
  if ((month === 11 && day >= 15) || (month === 12 && day <= 14))
    return zodiacSignsData[7]; // Vrischika (Scorpio)
  if ((month === 12 && day >= 15) || (month === 1 && day <= 13))
    return zodiacSignsData[8]; // Dhanu (Sagittarius)
  if ((month === 1 && day >= 14) || (month === 2 && day <= 12))
    return zodiacSignsData[9]; // Makara (Capricorn)
  if ((month === 2 && day >= 13) || (month === 3 && day <= 13))
    return zodiacSignsData[10]; // Kumbha (Aquarius)
  if ((month === 3 && day >= 14) || (month === 4 && day <= 13))
    return zodiacSignsData[11]; // Meena (Pisces)

  // Default fallback - should never reach here with valid dates
  return zodiacSignsData[0];
}

/**
 * Gets the Indian Solar Zodiac sign (Rashi) from a Date object
 * @param birthDate Date of birth
 * @returns Object containing Sanskrit and English names of the zodiac sign
 */
export function getIndianZodiacSignFromDate(birthDate: Date): {
  sanskrit: string;
  english: string;
  element: string;
  ruler: string;
} {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // JavaScript months are 0-indexed
  return getIndianZodiacSign(day, month);
}

/**
 * Calculates the longitude of a celestial body using Lahiri Ayanamsa (sidereal)
 * This is a simplified approximation - for precision, an API or Swiss Ephemeris is needed
 * @param tropicalLongitude The tropical longitude (0-360 degrees)
 * @param birthDate The date of birth for ayanamsa calculation
 * @returns The sidereal longitude adjusted for Lahiri ayanamsa
 */
export function calculateSiderealLongitude(tropicalLongitude: number, birthDate: Date): number {
  // Simplified Lahiri ayanamsa calculation
  // Ayanamsa increases by about 50.3 seconds per year
  const baseYear = 1900;
  const baseAyanamsa = 22.460; // Lahiri ayanamsa for Jan 1, 1900
  
  const birthYear = birthDate.getFullYear();
  const yearsSince1900 = birthYear - baseYear;
  
  // Calculate approximate ayanamsa for the birth year
  // 50.3 seconds = 50.3/3600 = 0.01397 degrees per year
  const approximateAyanamsa = baseAyanamsa + (yearsSince1900 * 0.01397);
  
  // Adjust tropical longitude to sidereal
  let siderealLongitude = tropicalLongitude - approximateAyanamsa;
  
  // Ensure longitude is within 0-360 range
  if (siderealLongitude < 0) {
    siderealLongitude += 360;
  } else if (siderealLongitude >= 360) {
    siderealLongitude -= 360;
  }
  
  return siderealLongitude;
}

/**
 * Gets the nakshatra (lunar mansion) based on the moon's longitude
 * @param moonLongitude The moon's sidereal longitude (0-360 degrees)
 * @returns The nakshatra information
 */
export function getNakshatraFromLongitude(moonLongitude: number): {
  sanskrit: string;
  english: string;
  ruler: string;
  degree: string;
} {
  // Each nakshatra spans 13°20' (13.33333 degrees)
  const nakshatraIndex = Math.floor((moonLongitude * 27) / 360) % 27;
  return nakshatrasData[nakshatraIndex];
}

/**
 * API integration example for Swiss Ephemeris
 * Note: This requires the Swiss Ephemeris library to be properly installed and configured
 * For browser usage, Swiss Ephemeris WASM is typically used
 */
export async function calculatePreciseZodiacData(birthDetails: {
  date: Date;
  time: string;
  latitude: number;
  longitude: number;
}) {
  // This is a placeholder for the actual Swiss Ephemeris integration
  // In a real implementation, we would call the Swiss Ephemeris library here
  
  // Simplified example of what the API integration would do:
  const birthDate = birthDetails.date;
  const [hours, minutes] = birthDetails.time.split(':').map(Number);
  
  // Extract date components
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // JS months are 0-indexed
  
  // Get approximate solar sign
  const solarSign = getIndianZodiacSign(day, month);
  
  // For demonstration, generate a random moon longitude
  // In a real implementation, this would come from Swiss Ephemeris
  const randomMoonLongitude = Math.random() * 360;
  const moonNakshatra = getNakshatraFromLongitude(randomMoonLongitude);
  
  // Calculate moon sign from longitude
  const moonSignIndex = Math.floor(randomMoonLongitude / 30);
  const moonSign = zodiacSignsData[moonSignIndex];
  
  return {
    sunSign: solarSign,
    moonSign: moonSign,
    nakshatra: moonNakshatra,
    // Other details that would come from a proper calculation
    ascendant: zodiacSignsData[Math.floor(Math.random() * 12)], // Random for demo
    planets: []
  };
}

/**
 * Integrates with our existing Kundali calculation system
 * @param birthDetails The birth details
 * @returns Enhanced kundali data
 */
export function enhanceKundaliWithPreciseCalculations(kundaliData: any, birthDetails: {
  date: Date;
  time: string;
  latitude?: number;
  longitude?: number;
}) {
  // Get precise solar sign
  const solarSign = getIndianZodiacSignFromDate(birthDetails.date);
  
  // Enhance the existing kundali data
  return {
    ...kundaliData,
    enhancedSolarSign: solarSign,
    // Add other precise calculations here
  };
}
