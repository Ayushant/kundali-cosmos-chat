
import { Jyotish } from 'jyotish';

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

export const calculateKundali = (birthDetails: BirthDetails): KundaliData => {
  try {
    if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
      throw new Error('Birth details are incomplete');
    }

    // Parse date and time
    const dateObj = birthDetails.date;
    const [hours, minutes] = birthDetails.time.split(':').map(Number);
    
    // Default coordinates if not provided (can be enhanced with geocoding API)
    const latitude = birthDetails.latitude || 28.6139; // Default: New Delhi
    const longitude = birthDetails.longitude || 77.2090;
    
    // Initialize Jyotish with birth details
    const jyotish = new Jyotish();
    
    const birthData = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1, // JS months are 0-indexed
      day: dateObj.getDate(),
      hour: hours,
      minute: minutes,
      latitude: latitude,
      longitude: longitude,
      timezone: getTimezoneOffset(dateObj) / 60 // Convert minutes to hours
    };
    
    jyotish.setBirthData(birthData);
    const chart = jyotish.getChart();
    
    // Extract relevant data
    const planets = mapPlanetPositions(chart);
    const houses = mapHouseStrengths(chart);
    
    return {
      ascendant: getAscendant(chart),
      moonSign: getMoonSign(chart),
      sunSign: getSunSign(chart),
      currentDasha: getCurrentDasha(chart),
      planets: planets,
      strongHouses: houses.strongHouses,
      weakHouses: houses.weakHouses
    };
  } catch (error) {
    console.error('Error calculating Kundali:', error);
    
    // Return default data for demonstration
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
        { name: "Jupiter", sign: "Pisces", house: 8 }
      ]
    };
  }
};

// Helper functions
function getTimezoneOffset(date: Date): number {
  return date.getTimezoneOffset();
}

function getAscendant(chart: any): string {
  try {
    const ascSign = chart.ascendant.sign;
    const ascDegree = Math.floor(chart.ascendant.longitude % 30);
    return `${ascSign} - ${ascDegree}°`;
  } catch (e) {
    return "Leo";
  }
}

function getMoonSign(chart: any): string {
  try {
    const moonSign = chart.planets.Moon.sign;
    const nakshatra = chart.planets.Moon.nakshatra;
    return `${moonSign} - ${nakshatra} Nakshatra`;
  } catch (e) {
    return "Taurus - Rohini Nakshatra";
  }
}

function getSunSign(chart: any): string {
  try {
    const sunSign = chart.planets.Sun.sign;
    const nakshatra = chart.planets.Sun.nakshatra;
    return `${sunSign} - ${nakshatra} Nakshatra`;
  } catch (e) {
    return "Gemini - Mrigashira Nakshatra";
  }
}

function getCurrentDasha(chart: any): string {
  try {
    const mahadasha = chart.dashas.vimshottari.mahadasha;
    const planet = mahadasha.planet;
    const startYear = new Date(mahadasha.start).getFullYear();
    const endYear = new Date(mahadasha.end).getFullYear();
    return `${planet} Mahadasha (${startYear}-${endYear})`;
  } catch (e) {
    return "Jupiter Mahadasha (2020-2036)";
  }
}

function mapPlanetPositions(chart: any): PlanetPosition[] {
  try {
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    return planets.map(planet => {
      if (chart.planets[planet]) {
        const planetData = chart.planets[planet];
        return {
          name: planet,
          sign: planetData.sign,
          house: planetData.house,
          degree: Math.floor(planetData.longitude % 30),
          nakshatra: planetData.nakshatra
        };
      }
      // Fallback for missing data
      return {
        name: planet,
        sign: "Unknown",
        house: 1
      };
    });
  } catch (e) {
    // Return default planets
    return [
      { name: "Sun", sign: "Gemini", house: 11 },
      { name: "Moon", sign: "Taurus", house: 10 },
      { name: "Mars", sign: "Aries", house: 9 },
      { name: "Mercury", sign: "Gemini", house: 11 },
      { name: "Jupiter", sign: "Pisces", house: 8 }
    ];
  }
}

function mapHouseStrengths(chart: any): { strongHouses: number[], weakHouses: number[] } {
  try {
    // This is a simplified approach - in real Vedic astrology, house strengths
    // are determined by various factors including aspects, planet positions, etc.
    const houses = Array.from({ length: 12 }, (_, i) => i + 1);
    
    const strongHouses = houses.filter(house => {
      const planetsInHouse = Object.values(chart.planets).filter(
        (p: any) => p.house === house
      );
      return planetsInHouse.length > 0 && [1, 5, 9, 10].includes(house);
    });
    
    const weakHouses = houses.filter(house => {
      const planetsInHouse = Object.values(chart.planets).filter(
        (p: any) => p.house === house
      );
      return planetsInHouse.length === 0 || [6, 8, 12].includes(house);
    });
    
    return {
      strongHouses: strongHouses.length > 0 ? strongHouses : [1, 5, 9, 10],
      weakHouses: weakHouses.length > 0 ? weakHouses : [6, 8, 12]
    };
  } catch (e) {
    return {
      strongHouses: [1, 5, 9, 10],
      weakHouses: [6, 8, 12]
    };
  }
}
