import React from 'react';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface KundaliChartProps {
  birthDetails?: {
    date?: Date;
    time?: string;
    place?: string;
  };
  kundaliData?: {
    ascendant: string;
    moonSign: string;
    sunSign: string;
    currentDasha: string;
    planets: Array<{
      name: string;
      sign: string;
      house: number;
      degree?: number;
      nakshatra?: string;
    }>;
    strongHouses: number[];
    weakHouses: number[];
  };
  isLoading?: boolean;
}

const KundaliChart: React.FC<KundaliChartProps> = ({ birthDetails, kundaliData, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-white backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[500px]">
        <Loader2 size={40} className="text-orange-500 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-orange-600">Calculating Your Kundali</h3>
        <p className="text-sm text-gray-500 mt-2">Processing birth details...</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full w-full">
      <div className="bg-gradient-to-br from-orange-50 to-white backdrop-blur-sm rounded-xl shadow-lg p-3 sm:p-4 overflow-visible">
        <div className="text-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-orange-600">Your Kundali Chart</h3>
          {birthDetails && (
            <div className="text-xs sm:text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mt-1">
              {birthDetails.date && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-orange-500 flex-shrink-0" />
                  {birthDetails.date.toLocaleDateString()}
                </span>
              )}
              {birthDetails.time && (
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-orange-500 flex-shrink-0" />
                  {birthDetails.time}
                </span>
              )}
              {birthDetails.place && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-orange-500 flex-shrink-0" />
                  {birthDetails.place}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="kundali-visualization mb-3 sm:mb-4 w-full">
          {/* North Indian style Kundali chart (square format) - Ensuring full visibility */}
          <div className="aspect-square border-2 border-orange-500 rounded-lg relative w-full max-w-[400px] mx-auto">
            {/* Central diamond */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[70%] h-[70%] border-2 border-orange-400 rotate-45"></div>
            </div>

            {/* Four diagonal lines connecting corners */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full border-b-2 border-r-2 border-orange-300"></div>
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-r-2 border-orange-300"></div>
            </div>
            
            {/* House labels and planet placements - fixing positioning to prevent jitter */}
            <div className="absolute inset-0">
              {/* Top row */}
              <div className="absolute top-1 left-1/4 transform -translate-x-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">12</p>
                  {kundaliData?.planets.filter(p => p.house === 12).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-1 left-3/4 transform -translate-x-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">11</p>
                  {kundaliData?.planets.filter(p => p.house === 11).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              
              {/* Bottom row */}
              <div className="absolute bottom-1 left-1/4 transform -translate-x-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">6</p>
                  {kundaliData?.planets.filter(p => p.house === 6).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-1 left-3/4 transform -translate-x-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">5</p>
                  {kundaliData?.planets.filter(p => p.house === 5).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              
              {/* Left column */}
              <div className="absolute top-1/4 left-1 transform -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">1</p>
                  {kundaliData?.planets.filter(p => p.house === 1).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-3/4 left-1 transform -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">7</p>
                  {kundaliData?.planets.filter(p => p.house === 7).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              
              {/* Right column */}
              <div className="absolute top-1/4 right-1 transform -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">10</p>
                  {kundaliData?.planets.filter(p => p.house === 10).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-3/4 right-1 transform -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">4</p>
                  {kundaliData?.planets.filter(p => p.house === 4).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              
              {/* Corner houses with fixed widths */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">2</p>
                  {kundaliData?.planets.filter(p => p.house === 2).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">9</p>
                  {kundaliData?.planets.filter(p => p.house === 9).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">8</p>
                  {kundaliData?.planets.filter(p => p.house === 8).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-[20%]">
                <div className="bg-orange-100/80 p-0.5 sm:p-1 rounded text-center">
                  <p className="text-[9px] sm:text-xs font-semibold">3</p>
                  {kundaliData?.planets.filter(p => p.house === 3).map((planet, i) => (
                    <span key={i} className="text-[8px] sm:text-[10px] block truncate">{planet.name}</span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Lagna (Ascendant) indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/3 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-500/30 flex items-center justify-center">
                <span className="text-[9px] sm:text-xs font-semibold text-orange-800">Lagna</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm mb-3 sm:mb-4">
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-2 sm:p-3 rounded-lg">
            <h4 className="font-semibold text-orange-800">Current Dasha</h4>
            <div className="flex flex-col gap-1 mt-1">
              <span className="truncate">{kundaliData?.currentDasha.split("(")[0]}</span>
              <span className="text-[10px] sm:text-xs text-orange-700 truncate">
                {kundaliData?.currentDasha.includes("(") ? 
                  `(${kundaliData.currentDasha.split("(")[1]}` : 
                  "(2020-2036)"}
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-2 sm:p-3 rounded-lg">
            <h4 className="font-semibold text-orange-800">Ascendant</h4>
            <div className="flex flex-col gap-1 mt-1">
              <span className="truncate">{kundaliData?.ascendant}</span>
              <span className="text-[10px] sm:text-xs text-orange-700 truncate">Ruled by {
                kundaliData?.ascendant.includes("Leo") ? "Sun" : 
                kundaliData?.ascendant.includes("Cancer") ? "Moon" :
                kundaliData?.ascendant.includes("Aries") ? "Mars" : "Venus"
              }</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-2 sm:p-3 rounded-lg">
            <h4 className="font-semibold text-orange-800">Moon Sign</h4>
            <div className="flex flex-col gap-1 mt-1">
              <span className="truncate">{kundaliData?.moonSign.split("-")[0]}</span>
              <span className="text-[10px] sm:text-xs text-orange-700 truncate">{
                kundaliData?.moonSign.includes("-") ? 
                  kundaliData.moonSign.split("-")[1].trim() : 
                  "Rohini Nakshatra"
              }</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-2 sm:p-3 rounded-lg">
            <h4 className="font-semibold text-orange-800">Sun Sign</h4>
            <div className="flex flex-col gap-1 mt-1">
              <span className="truncate">{kundaliData?.sunSign.split("-")[0]}</span>
              <span className="text-[10px] sm:text-xs text-orange-700 truncate">{
                kundaliData?.sunSign.includes("-") ? 
                  kundaliData.sunSign.split("-")[1].trim() : 
                  "Mrigashira Nakshatra"
              }</span>
            </div>
          </div>
        </div>

        {/* Planet positions table */}
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-1 sm:px-2 py-1 text-left text-orange-800 whitespace-nowrap">Planet</th>
                <th className="px-1 sm:px-2 py-1 text-left text-orange-800 whitespace-nowrap">Sign</th>
                <th className="px-1 sm:px-2 py-1 text-left text-orange-800 whitespace-nowrap">House</th>
                {kundaliData?.planets.some(p => p.degree !== undefined) && (
                  <th className="px-1 sm:px-2 py-1 text-left text-orange-800 whitespace-nowrap">Degree</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {kundaliData?.planets.map((planet, index) => (
                <tr key={index}>
                  <td className="px-1 sm:px-2 py-1 whitespace-nowrap">{planet.name}</td>
                  <td className="px-1 sm:px-2 py-1">{planet.sign}</td>
                  <td className="px-1 sm:px-2 py-1">{planet.house}</td>
                  {kundaliData?.planets.some(p => p.degree !== undefined) && (
                    <td className="px-1 sm:px-2 py-1">{planet.degree ? `${planet.degree}°` : '-'}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-center">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm transition-colors">
            Download Full Kundali (PDF)
          </button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default KundaliChart;
