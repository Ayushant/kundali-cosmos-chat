
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import KundaliChart from '@/components/kundali/kundali-chart';
import ChatInterface from '@/components/chat/chat-interface';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const KundaliChatPage: React.FC = () => {
  const location = useLocation();
  const birthDetails = location.state?.birthDetails;
  const [showSidebar, setShowSidebar] = useState(true);
  const [kundaliInsights, setKundaliInsights] = useState<Record<string, any>>({});

  // Extract relevant data from the kundali chart for the chat
  useEffect(() => {
    if (birthDetails) {
      // Format data for the chat engine to use
      setKundaliInsights({
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
      });
    }
  }, [birthDetails]);

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 relative min-h-[calc(100vh-80px)]">
        <div 
          className={`${showSidebar ? 'lg:w-1/3 w-full' : 'lg:w-0 w-0'} 
            transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm overflow-hidden`}
        >
          {showSidebar && <KundaliChart birthDetails={birthDetails} />}
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform z-10 bg-white shadow-md border-orange-300 text-orange-600 hover:bg-orange-50 hidden lg:flex"
          aria-label={showSidebar ? "Hide chart" : "Show chart"}
        >
          {showSidebar ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
        
        <div className={`${showSidebar ? 'lg:w-2/3' : 'lg:w-full'} w-full transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm`}>
          <ChatInterface isFullWidth={true} kundaliInsights={kundaliInsights} />
        </div>
      </div>
    </AppLayout>
  );
};

export default KundaliChatPage;
