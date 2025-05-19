
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface KundaliChartProps {
  birthDetails?: {
    date?: Date;
    time?: string;
    place?: string;
  };
}

const KundaliChart: React.FC<KundaliChartProps> = ({ birthDetails }) => {
  // Traditional Vedic astrology houses arrangement (clockwise)
  const houses = [
    { number: 1, name: "Lagna", signification: "Self, personality" },
    { number: 2, name: "Dhana", signification: "Wealth, family" },
    { number: 3, name: "Parakrama", signification: "Courage, siblings" },
    { number: 4, name: "Sukha", signification: "Home, mother" },
    { number: 5, name: "Putra", signification: "Children, intellect" },
    { number: 6, name: "Ari", signification: "Enemies, illness" },
    { number: 7, name: "Yuvati", signification: "Spouse, partnerships" },
    { number: 8, name: "Ayur", signification: "Longevity, obstacles" },
    { number: 9, name: "Dharma", signification: "Fortune, faith" },
    { number: 10, name: "Karma", signification: "Career, father" },
    { number: 11, name: "Labha", signification: "Gains, aspirations" },
    { number: 12, name: "Vyaya", signification: "Losses, spirituality" }
  ];

  // Planets with their traditional significations
  const planets = [
    { name: "Sun", position: "Leo", signification: "Soul, authority" },
    { name: "Moon", position: "Cancer", signification: "Mind, emotions" },
    { name: "Mars", position: "Aries", signification: "Energy, courage" },
    { name: "Mercury", position: "Gemini", signification: "Communication, intellect" },
    { name: "Jupiter", position: "Sagittarius", signification: "Wisdom, fortune" },
    { name: "Venus", position: "Libra", signification: "Love, harmony" },
    { name: "Saturn", position: "Capricorn", signification: "Discipline, karma" },
    { name: "Rahu", position: "Variable", signification: "Material desires" },
    { name: "Ketu", position: "Variable", signification: "Spirituality, liberation" }
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white backdrop-blur-sm rounded-xl shadow-lg p-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-orange-600">Your Kundali Chart</h3>
        {birthDetails && (
          <div className="text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2 mt-1">
            {birthDetails.date && (
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-orange-500" />
                {birthDetails.date.toLocaleDateString()}
              </span>
            )}
            {birthDetails.time && (
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-orange-500" />
                {birthDetails.time}
              </span>
            )}
            {birthDetails.place && (
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-orange-500" />
                {birthDetails.place}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="kundali-visualization mb-4">
        {/* North Indian style Kundali chart (square format) */}
        <div className="aspect-square border-2 border-orange-500 rounded-lg relative">
          {/* Central diamond */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[70%] h-[70%] border-2 border-orange-400 rotate-45"></div>
          </div>

          {/* Four diagonal lines connecting corners */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full border-b-2 border-r-2 border-orange-300"></div>
            <div className="absolute top-0 left-0 w-full h-full border-t-2 border-r-2 border-orange-300"></div>
          </div>
          
          {/* House labels - positioned according to North Indian style */}
          <div className="absolute inset-0">
            {/* Top row */}
            <div className="absolute top-1 left-1/4 transform -translate-x-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">12</p>
              </div>
            </div>
            <div className="absolute top-1 left-3/4 transform -translate-x-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">11</p>
              </div>
            </div>
            
            {/* Bottom row */}
            <div className="absolute bottom-1 left-1/4 transform -translate-x-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">6</p>
              </div>
            </div>
            <div className="absolute bottom-1 left-3/4 transform -translate-x-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">5</p>
              </div>
            </div>
            
            {/* Left column */}
            <div className="absolute top-1/4 left-1 transform -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">1</p>
              </div>
            </div>
            <div className="absolute top-3/4 left-1 transform -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">7</p>
              </div>
            </div>
            
            {/* Right column */}
            <div className="absolute top-1/4 right-1 transform -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">10</p>
              </div>
            </div>
            <div className="absolute top-3/4 right-1 transform -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">4</p>
              </div>
            </div>
            
            {/* Corner houses */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">2</p>
              </div>
            </div>
            <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">9</p>
              </div>
            </div>
            <div className="absolute top-3/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">8</p>
              </div>
            </div>
            <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 p-1">
              <div className="bg-orange-100/80 p-1 rounded text-center">
                <p className="text-xs font-semibold">3</p>
              </div>
            </div>
          </div>
          
          {/* Lagna (Ascendant) indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 h-1/3 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-500/30 flex items-center justify-center">
              <span className="text-xs font-semibold text-orange-800">Lagna</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-lg">
          <h4 className="font-semibold text-orange-800">Current Dasha</h4>
          <div className="flex flex-col gap-1 mt-1">
            <span>Jupiter Mahadasha</span>
            <span className="text-xs text-orange-700">2020 - 2036</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-lg">
          <h4 className="font-semibold text-orange-800">Ascendant</h4>
          <div className="flex flex-col gap-1 mt-1">
            <span>Leo - 23° 15'</span>
            <span className="text-xs text-orange-700">Ruled by Sun</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-lg">
          <h4 className="font-semibold text-orange-800">Moon Sign</h4>
          <div className="flex flex-col gap-1 mt-1">
            <span>Taurus - 18° 42'</span>
            <span className="text-xs text-orange-700">Rohini Nakshatra</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 rounded-lg">
          <h4 className="font-semibold text-orange-800">Sun Sign</h4>
          <div className="flex flex-col gap-1 mt-1">
            <span>Gemini - 05° 22'</span>
            <span className="text-xs text-orange-700">Mrigashira Nakshatra</span>
          </div>
        </div>
      </div>

      {/* Planet positions table */}
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-sm">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-2 py-1 text-left text-orange-800">Planet</th>
              <th className="px-2 py-1 text-left text-orange-800">Sign</th>
              <th className="px-2 py-1 text-left text-orange-800">House</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            <tr>
              <td className="px-2 py-1">Sun</td>
              <td className="px-2 py-1">Gemini</td>
              <td className="px-2 py-1">11</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Moon</td>
              <td className="px-2 py-1">Taurus</td>
              <td className="px-2 py-1">10</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Mars</td>
              <td className="px-2 py-1">Aries</td>
              <td className="px-2 py-1">9</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Mercury</td>
              <td className="px-2 py-1">Gemini</td>
              <td className="px-2 py-1">11</td>
            </tr>
            <tr>
              <td className="px-2 py-1">Jupiter</td>
              <td className="px-2 py-1">Pisces</td>
              <td className="px-2 py-1">8</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="text-center">
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
          Download Full Kundali (PDF)
        </button>
      </div>
    </div>
  );
};

export default KundaliChart;
