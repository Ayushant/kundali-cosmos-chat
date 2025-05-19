
import React from 'react';

interface KundaliChartProps {
  birthDetails?: {
    date?: Date;
    time?: string;
    place?: string;
  };
}

const KundaliChart: React.FC<KundaliChartProps> = ({ birthDetails }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-astro-indigo">Your Kundali Chart</h3>
        {birthDetails && (
          <p className="text-sm text-gray-600">
            {birthDetails.date && birthDetails.date.toLocaleDateString()} | {birthDetails.time} | {birthDetails.place}
          </p>
        )}
      </div>
      
      <div className="kundali-visualization">
        {/* This is a simplified visualization; a real application would use a Vedic astrology charting library */}
        <div className="border-2 border-astro-gold rounded-lg aspect-square relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-2 border-astro-purple rotate-45"></div>
          </div>
          
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-astro-gold/20 p-2 text-center">
              <p className="text-sm font-semibold">House 10</p>
              <p className="text-xs">Career</p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-astro-gold/20 p-2 text-center">
              <p className="text-sm font-semibold">House 4</p>
              <p className="text-xs">Home</p>
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-astro-gold/20 p-2 text-center">
              <p className="text-sm font-semibold">House 7</p>
              <p className="text-xs">Relationships</p>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-astro-gold/20 p-2 text-center">
              <p className="text-sm font-semibold">House 1</p>
              <p className="text-xs">Self</p>
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 h-1/3 rounded-full bg-gradient-to-br from-astro-purple/30 to-astro-gold/30 animate-spin-slow flex items-center justify-center">
              <span className="text-xs font-semibold">Lagna</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="bg-astro-purple/10 p-2 rounded">
          <h4 className="font-semibold">Lagna: Taurus</h4>
          <p>Stable, persistent</p>
        </div>
        <div className="bg-astro-purple/10 p-2 rounded">
          <h4 className="font-semibold">Moon: Pisces</h4>
          <p>Intuitive, emotional</p>
        </div>
        <div className="bg-astro-purple/10 p-2 rounded">
          <h4 className="font-semibold">Current Dasha</h4>
          <p>Saturn Mahadasha</p>
        </div>
        <div className="bg-astro-purple/10 p-2 rounded">
          <h4 className="font-semibold">Nakshatra</h4>
          <p>Revati</p>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-astro-purple hover:text-astro-purple-dark text-sm underline">
          Download Full Kundali (PDF)
        </button>
      </div>
    </div>
  );
};

export default KundaliChart;
