
import React, { useEffect, useState } from 'react';
import { useSwissEph, WasmLoadingStatus } from '@/hooks/use-swisseph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { 
  Planet, 
  planetNames, 
  getZodiacSign, 
  getSignDegrees, 
  getNakshatra, 
  calculateHouse,
  formatDegrees,
  PlanetPosition,
  BirthDetails
} from '@/utils/kundali-engine';

interface KundaliCalculatorProps {
  birthDetails: BirthDetails;
  onCalculationComplete?: (data: {
    ascendant: string;
    planets: PlanetPosition[];
  }) => void;
}

const KundaliCalculator: React.FC<KundaliCalculatorProps> = ({ 
  birthDetails, 
  onCalculationComplete 
}) => {
  const { swissEph, status, error } = useSwissEph();
  const [planetPositions, setPlanetPositions] = useState<PlanetPosition[]>([]);
  const [ascendant, setAscendant] = useState<PlanetPosition | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  
  useEffect(() => {
    // Only calculate when SwissEph is loaded and we have birth details
    if (status === WasmLoadingStatus.LOADED && 
        swissEph && 
        birthDetails.date && 
        birthDetails.time) {
      
      setIsCalculating(true);
      setCalculationError(null);
      
      try {
        // Extract date components
        const birthDate = birthDetails.date;
        const [hours, minutes] = birthDetails.time.split(':').map(Number);
        
        // Convert to Julian Day
        const year = birthDate.getFullYear();
        const month = birthDate.getMonth() + 1; // JS months are 0-indexed
        const day = birthDate.getDate();
        
        // Convert local time to UTC for calculation
        const localDate = new Date(year, month-1, day, hours, minutes);
        const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
        
        const julDay = swissEph.swe_julday(
          utcDate.getUTCFullYear(),
          utcDate.getUTCMonth() + 1,
          utcDate.getUTCDate(),
          utcDate.getUTCHours() + utcDate.getUTCMinutes()/60,
          swissEph.SE_GREG_CAL
        );
                
        // Get latitude and longitude (use defaults if not provided)
        const latitude = birthDetails.latitude || 28.6139; // Default to New Delhi
        const longitude = birthDetails.longitude || 77.2090;
        
        // Calculate Ascendant (Lagna)
        const ascResult = swissEph.swe_houses_ex(
          julDay,
          swissEph.SEFLG_SIDEREAL, // Use sidereal zodiac (Lahiri)
          latitude,
          longitude,
          'P' // Placidus house system
        );
        
        const ascendantLongitude = ascResult.ascendant;
        const ascendantSign = getZodiacSign(ascendantLongitude);
        const ascendantDegree = getSignDegrees(ascendantLongitude);
        const ascendantNakshatra = getNakshatra(ascendantLongitude);
        
        setAscendant({
          id: -1, // Special ID for ascendant
          name: "Ascendant",
          longitude: ascendantLongitude,
          sign: ascendantSign,
          house: 1, // Ascendant is always 1st house
          degree: ascendantDegree,
          nakshatra: ascendantNakshatra
        });
        
        // Calculate planet positions
        const planetIDs = [
          Planet.SUN, Planet.MOON, Planet.MERCURY, Planet.VENUS, 
          Planet.MARS, Planet.JUPITER, Planet.SATURN, Planet.RAHU
        ];
        
        const positions: PlanetPosition[] = [];
        
        for (const planetId of planetIDs) {
          // Calculate planet's position
          const result = swissEph.swe_calc_ut(
            julDay,
            planetId,
            swissEph.SEFLG_SIDEREAL // Use sidereal zodiac
          );
          
          const longitude = result.longitude;
          const sign = getZodiacSign(longitude);
          const degree = getSignDegrees(longitude);
          const nakshatra = getNakshatra(longitude);
          const house = calculateHouse(longitude, ascendantLongitude);
          
          positions.push({
            id: planetId,
            name: planetNames[planetId],
            longitude,
            sign,
            house,
            degree,
            nakshatra
          });
          
          // Special case for Ketu (South Node) - 180° opposite to Rahu
          if (planetId === Planet.RAHU) {
            let ketuLongitude = (longitude + 180) % 360;
            
            positions.push({
              id: Planet.KETU,
              name: planetNames[Planet.KETU],
              longitude: ketuLongitude,
              sign: getZodiacSign(ketuLongitude),
              house: calculateHouse(ketuLongitude, ascendantLongitude),
              degree: getSignDegrees(ketuLongitude),
              nakshatra: getNakshatra(ketuLongitude)
            });
          }
        }
        
        setPlanetPositions(positions);
        
        // Call the callback if provided
        if (onCalculationComplete) {
          onCalculationComplete({
            ascendant: `${ascendantSign} - ${formatDegrees(ascendantDegree)}`,
            planets: positions
          });
        }
        
      } catch (err) {
        console.error('Error calculating Kundali:', err);
        setCalculationError('Failed to calculate planetary positions. Please try again.');
      } finally {
        setIsCalculating(false);
      }
    }
  }, [swissEph, status, birthDetails, onCalculationComplete]);
  
  // Handle different loading states
  if (status === WasmLoadingStatus.LOADING || isCalculating) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mb-4" />
          <p className="text-lg font-medium">
            {status === WasmLoadingStatus.LOADING 
              ? "Loading Swiss Ephemeris..." 
              : "Calculating planetary positions..."}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a moment...
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (status === WasmLoadingStatus.ERROR || calculationError) {
    return (
      <Card className="w-full border-red-200">
        <CardContent className="p-6">
          <div className="text-red-600 font-medium text-center mb-2">
            {status === WasmLoadingStatus.ERROR 
              ? "Failed to load Swiss Ephemeris" 
              : calculationError}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Please check your internet connection and try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Render results
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-orange-600">
          Planetary Positions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Ascendant Information */}
        {ascendant && (
          <div className="bg-orange-50 p-3 rounded-md mb-4">
            <h3 className="font-semibold text-orange-800">Ascendant (Lagna)</h3>
            <p>
              {ascendant.sign} - {formatDegrees(ascendant.degree)}
              <span className="text-xs ml-2 text-orange-700">
                ({ascendant.nakshatra} Nakshatra)
              </span>
            </p>
          </div>
        )}

        {/* Planets Table */}
        <Table>
          <TableHeader className="bg-orange-100">
            <TableRow>
              <TableHead>Planet</TableHead>
              <TableHead>Sign</TableHead>
              <TableHead>House</TableHead>
              <TableHead>Degrees</TableHead>
              <TableHead>Nakshatra</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planetPositions.map((planet) => (
              <TableRow key={planet.id}>
                <TableCell className="font-medium">{planet.name}</TableCell>
                <TableCell>{planet.sign}</TableCell>
                <TableCell>{planet.house}</TableCell>
                <TableCell>{formatDegrees(planet.degree)}</TableCell>
                <TableCell>{planet.nakshatra}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default KundaliCalculator;
