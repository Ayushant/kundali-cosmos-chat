import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import KundaliChart from '@/components/kundali/kundali-chart';
import ChatInterface from '@/components/chat/chat-interface';
import ZodiacInfo from '@/components/kundali/zodiac-info';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateKundali } from '@/utils/kundali-calculator';
import { useToast } from '@/hooks/use-toast';
import '@/styles/chat.css';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { enhanceKundaliWithPreciseCalculations } from '@/utils/indian-zodiac';

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
  enhancedSolarSign?: {
    sanskrit: string;
    english: string;
    element: string;
    ruler: string;
  };
}

const KundaliChatPage: React.FC = () => {
  const location = useLocation();
  const birthDetails = location.state?.birthDetails;
  const [kundaliInsights, setKundaliInsights] = useState<KundaliData | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  // Removed tab state since we no longer need it
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Extract relevant data from the kundali chart for the chat
  useEffect(() => {
    if (birthDetails) {
      setIsCalculating(true);
      try {
        // Calculate Kundali using our algorithm
        const kundaliData = calculateKundali(birthDetails);
        
        // Enhance with more precise calculations if available
        const enhancedData = enhanceKundaliWithPreciseCalculations(kundaliData, birthDetails);
        
        setKundaliInsights(enhancedData);
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
    } else {
      // If no birth details provided, redirect or show message
      toast({
        title: "Missing Information",
        description: "Birth details are required to generate your Kundali chart.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [birthDetails, toast]);

  return (
    <AppLayout>
      <div className="w-full flex-1 flex flex-col max-h-full overflow-hidden">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button 
              variant="outline"
              className="mb-4 mx-2 border-orange-300 text-orange-600 hover:bg-orange-50 w-[calc(100%-1rem)]"
            >
              <ChevronRight size={16} className="mr-2" />
              View Your Kundali Chart
            </Button>
          </DrawerTrigger>          <DrawerContent className={`left-0 right-auto ${isMobile ? 'w-[95vw] h-[85vh] max-w-md' : 'w-[450px] h-[95vh]'} p-0`}>
            <div className="flex flex-col h-full">
              <div className="flex-none p-4">                <h2 className="text-xl font-semibold text-orange-700 mb-4">Your Kundali Chart</h2>
              </div>
              <div className="flex-1 overflow-y-auto px-4">
                <KundaliChart 
                  birthDetails={birthDetails} 
                  kundaliData={kundaliInsights || undefined} 
                  isLoading={isCalculating}
                />
              </div>
              <DrawerClose className="absolute top-4 right-4">
                <ChevronLeft className="h-5 w-5" />
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>        <div className="flex-1 rounded-lg mx-2">
          <div className="w-full max-w-3xl mx-auto h-full flex flex-col">
            <div className="flex-1">
              <ChatInterface 
                isFullWidth={true} 
                kundaliInsights={kundaliInsights || {}}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default KundaliChatPage;
