
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import KundaliChart from '@/components/kundali/kundali-chart';
import ChatInterface from '@/components/chat/chat-interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateKundali } from '@/utils/kundali-calculator';
import { useToast } from '@/components/ui/use-toast';
import '@/styles/chat.css';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

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
  const birthDetails = location.state?.birthDetails;
  const [kundaliInsights, setKundaliInsights] = useState<KundaliData | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const { toast } = useToast();

  // Mobile responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Add resize listener for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {isMobile ? (
        // Mobile view with drawer
        <div className="container mx-auto px-2 w-full">
          <div className="flex flex-col w-full">
            <Drawer>
              <DrawerTrigger asChild>
                <Button 
                  variant="outline"
                  className="mb-4 border-orange-300 text-orange-600 hover:bg-orange-50 w-full"
                >
                  <ChevronRight size={16} className="mr-2" />
                  View Your Kundali Chart
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh] overflow-y-auto">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-orange-700 mb-4">Your Kundali Chart</h2>
                  <KundaliChart 
                    birthDetails={birthDetails} 
                    kundaliData={kundaliInsights || undefined} 
                    isLoading={isCalculating}
                  />
                </div>
                <DrawerClose className="absolute top-4 right-4" />
              </DrawerContent>
            </Drawer>
            
            {/* Chat interface centered on mobile */}
            <div className="w-full mt-2">
              <ChatInterface 
                isFullWidth={true} 
                kundaliInsights={kundaliInsights || {}}
              />
            </div>
          </div>
        </div>
      ) : (
        // Desktop view with sidebar
        <SidebarProvider defaultOpen={true} className="w-full">
          <div className="flex min-h-[calc(100vh-80px)] w-full">
            <Sidebar side="left" className="kundali-sidebar" collapsible="offcanvas">
              <SidebarContent className="p-4 w-80 sidebar-content">
                <h2 className="text-xl font-semibold text-orange-700 mb-4">Your Kundali Chart</h2>
                <div className="overflow-y-auto flex-grow">
                  <KundaliChart 
                    birthDetails={birthDetails} 
                    kundaliData={kundaliInsights || undefined} 
                    isLoading={isCalculating}
                  />
                </div>
              </SidebarContent>
            </Sidebar>
            
            <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-3xl">
                <div className="flex items-center mb-4">
                  <SidebarTrigger className="mr-2">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Kundali Sidebar</span>
                  </SidebarTrigger>
                  <h2 className="text-xl font-semibold text-orange-700">Astrological Insights Chat</h2>
                </div>
                <ChatInterface 
                  isFullWidth={true} 
                  kundaliInsights={kundaliInsights || {}}
                />
              </div>
            </div>
          </div>
        </SidebarProvider>
      )}
    </AppLayout>
  );
};

export default KundaliChatPage;
