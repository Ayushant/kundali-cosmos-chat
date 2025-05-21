import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import KundaliChart from '@/components/kundali/kundali-chart';
import KundaliCalculator from '@/components/kundali/kundali-calculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { PlanetPosition } from '@/utils/kundali-engine';
import '@/styles/chat.css';  // Import CSS for chat bubbles

const KundaliChartPage: React.FC = () => {
  const location = useLocation();
  const birthDetails = location.state?.birthDetails;
  const [kundaliData, setKundaliData] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const { toast } = useToast();

  // Handle calculation results from our browser-compatible implementation
  const handleCalculationComplete = (data: { 
    ascendant: string; 
    planets: PlanetPosition[] 
  }) => {
    // Convert the data format to match what KundaliChart expects
    const processedData = {
      ascendant: data.ascendant,
      moonSign: data.planets.find(p => p.name === "Moon")?.sign + " - " + 
               data.planets.find(p => p.name === "Moon")?.nakshatra + " Nakshatra",
      sunSign: data.planets.find(p => p.name === "Sun")?.sign + " - " + 
              data.planets.find(p => p.name === "Sun")?.nakshatra + " Nakshatra",
      currentDasha: "Jupiter Mahadasha (2020-2036)", // This requires a separate calculation
      planets: data.planets.map(planet => ({
        name: planet.name,
        sign: planet.sign,
        house: planet.house,
        degree: planet.degree,
        nakshatra: planet.nakshatra
      })),
      strongHouses: [1, 5, 9], // These would need additional logic to calculate properly
      weakHouses: [6, 8, 12]
    };
    
    setKundaliData(processedData);
    setIsCalculating(false);
    
    toast({
      title: "Kundali Chart Generated",
      description: "Your astrological chart has been calculated successfully.",
      duration: 3000,
    });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-2 sm:px-0">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link to="/birth-details">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Birth Details
            </Button>
          </Link>
          
          {kundaliData && (
            <Link to="/kundali-chat" state={{ birthDetails }}>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto">
                Chat with Astrologer
              </Button>
            </Link>
          )}
        </div>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-red-50 border-orange-100 mb-4 sm:mb-6 overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-red-600">Your Kundali Chart</CardTitle>
            <CardDescription className="text-sm sm:text-base text-orange-700">
              Calculated with browser-compatible algorithms for planetary positions
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            {/* Calculator (hidden when chart is ready) */}
            {(!kundaliData && birthDetails) && (
              <div className="h-[300px] sm:h-[500px]">
                <KundaliCalculator 
                  birthDetails={birthDetails} 
                  onCalculationComplete={handleCalculationComplete} 
                />
              </div>
            )}
            
            {/* Show regular chart once data is available */}
            <div className={`max-w-xl mx-auto ${!kundaliData ? 'hidden' : ''}`}>
              <KundaliChart 
                birthDetails={birthDetails} 
                kundaliData={kundaliData} 
                isLoading={isCalculating && !kundaliData} 
              />
            </div>
            
            {/* No birth details warning */}
            {!birthDetails && (
              <div className="text-center p-4">
                <p className="text-red-500 mb-2">No birth details provided</p>
                <Link to="/birth-details">
                  <Button>Enter Birth Details</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Show the detailed table view when data is available */}
        {kundaliData && (
          <Card className="mb-6 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Planetary Positions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Calculated using browser-compatible astronomical algorithms
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 overflow-x-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-orange-100">
                    <tr>
                      <th className="px-1 sm:px-2 py-1 text-left text-orange-800">Planet</th>
                      <th className="px-1 sm:px-2 py-1 text-left text-orange-800">Sign</th>
                      <th className="px-1 sm:px-2 py-1 text-left text-orange-800">House</th>
                      <th className="px-1 sm:px-2 py-1 text-left text-orange-800">Degree</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {kundaliData?.planets.map((planet, index) => (
                      <tr key={index}>
                        <td className="px-1 sm:px-2 py-1">{planet.name}</td>
                        <td className="px-1 sm:px-2 py-1">{planet.sign}</td>
                        <td className="px-1 sm:px-2 py-1">{planet.house}</td>
                        <td className="px-1 sm:px-2 py-1">{planet.degree ? `${planet.degree}°` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default KundaliChartPage;
