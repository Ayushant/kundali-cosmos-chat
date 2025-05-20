
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import KundaliChart from '@/components/kundali/kundali-chart';
import ChatInterface from '@/components/chat/chat-interface';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateKundali } from '@/utils/kundali-calculator';
import { useToast } from '@/components/ui/use-toast';

// Define the KundaliData interface to match what is returned from calculateKundali
interface KundaliData {
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
}

const KundaliChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const birthDetails = location.state?.birthDetails;
  const [showSidebar, setShowSidebar] = useState(true);
  const [kundaliInsights, setKundaliInsights] = useState<KundaliData | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const { toast } = useToast();

  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Add resize listener for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile && showSidebar) {
        setShowSidebar(false);
      } else if (!mobile && !showSidebar) {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, [showSidebar]);

  // Check if birth details exist, if not redirect to birth details page
  useEffect(() => {
    if (!birthDetails) {
      toast({
        title: "Missing Information",
        description: "Please enter your birth details first to generate your Kundali chart.",
        variant: "destructive",
        duration: 5000,
      });
      navigate('/birth-details');
    }
  }, [birthDetails, navigate, toast]);

  // Extract relevant data from the kundali chart for the chat
  useEffect(() => {
    if (birthDetails) {
      setIsCalculating(true);
      try {
        // Calculate Kundali using our algorithm
        const kundaliData = calculateKundali(birthDetails);
        setKundaliInsights(kundaliData);
        toast({
          title: "Kundali Chart Generated",
          description: "Your astrological chart has been calculated successfully.",
          duration: 3000,
        });
      } catch (error) {
        console.error('Error calculating Kundali data:', error);
        toast({
          title: "Calculation Error",
          description: "There was an issue generating your kundali chart. Using fallback data.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsCalculating(false);
      }
    }
  }, [birthDetails, toast]);

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 relative min-h-[calc(100vh-80px)]">
        {/* Mobile Chart Toggle Button (only shown on mobile) */}
        <div className="lg:hidden flex justify-center my-2">
          <Button
            variant="outline"
            onClick={() => setShowSidebar(!showSidebar)}
            className="border-orange-300 text-orange-600 hover:bg-orange-50 w-full max-w-xs"
            aria-label={showSidebar ? "Hide chart" : "Show chart"}
          >
            {showSidebar ? (
              <><ChevronLeft size={16} className="mr-1" /> Hide Kundali Chart</>
            ) : (
              <><ChevronRight size={16} className="mr-1" /> Show Kundali Chart</>
            )}
          </Button>
        </div>
        
        {/* Kundali Chart Sidebar */}
        <div 
          className={`${showSidebar ? 'max-h-[500px] lg:max-h-none lg:w-1/4 w-full' : 'max-h-0 lg:w-0 w-0 overflow-hidden'} 
            transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm overflow-hidden`}
        >
          {showSidebar && <KundaliChart 
            birthDetails={birthDetails} 
            kundaliData={kundaliInsights || undefined} 
            isLoading={isCalculating} 
          />}
        </div>
        
        {/* Desktop Sidebar Toggle */}
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform z-10 bg-white shadow-md border-orange-300 text-orange-600 hover:bg-orange-50 hidden lg:flex"
          aria-label={showSidebar ? "Hide chart" : "Show chart"}
        >
          {showSidebar ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
        
        {/* Chat Interface */}
        <div className={`${showSidebar ? 'lg:w-3/4' : 'lg:w-full'} w-full transition-all duration-300 ease-in-out bg-white rounded-lg shadow-sm`}>
          <ChatInterface isFullWidth={!showSidebar} kundaliInsights={kundaliInsights || {}} />
        </div>
      </div>
    </AppLayout>
  );
};

export default KundaliChatPage;
