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
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [activeTab, setActiveTab] = useState<'chart' | 'info'>('chart');
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Use the hook instead of managing state manually
  const isMobile = useIsMobile();

  // Toggle sidebar function for web view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      {isMobile ? (
        // Mobile view with improved drawer sliding from left and ensuring scrollability
        <div className="container mx-auto px-2 w-full h-full flex flex-col">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button 
                variant="outline"
                className="mb-4 border-orange-300 text-orange-600 hover:bg-orange-50 w-full"
              >
                <ChevronRight size={16} className="mr-2" />
                View Your Kundali Chart
              </Button>
            </DrawerTrigger>
            <DrawerContent className="left-0 right-auto w-[95vw] p-0 h-[85vh] max-w-md">
              <div className="h-full overflow-auto p-4 relative">
                <h2 className="text-xl font-semibold text-orange-700 mb-4">Your Kundali Chart</h2>
                <div className="flex space-x-2 mb-4">
                  <Button 
                    variant={activeTab === 'chart' ? "default" : "outline"} 
                    className={activeTab === 'chart' ? "bg-orange-600" : "border-orange-300 text-orange-600"} 
                    onClick={() => setActiveTab('chart')}
                  >
                    Chart View
                  </Button>
                  <Button 
                    variant={activeTab === 'info' ? "default" : "outline"} 
                    className={activeTab === 'info' ? "bg-orange-600" : "border-orange-300 text-orange-600"} 
                    onClick={() => setActiveTab('info')}
                  >
                    Sign Details
                  </Button>
                </div>
                <div className="h-[calc(100%-100px)] w-full overflow-auto pb-4">
                  {activeTab === 'chart' ? (
                    <KundaliChart 
                      birthDetails={birthDetails} 
                      kundaliData={kundaliInsights || undefined} 
                      isLoading={isCalculating}
                    />
                  ) : (
                    <ZodiacInfo 
                      solarSign={kundaliInsights?.enhancedSolarSign}
                      moonSign={kundaliInsights?.moonSign}
                      nakshatra={kundaliInsights?.planets?.find(p => p.name === "Moon")?.nakshatra}
                    />
                  )}
                </div>
                <DrawerClose className="absolute top-4 right-4">
                  <ChevronLeft className="h-5 w-5" />
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
          
          {/* Chat interface centered on mobile */}
          <div className="w-full mt-2 flex-1 overflow-y-auto bg-white/30 rounded-lg">
            <ChatInterface 
              isFullWidth={true} 
              kundaliInsights={kundaliInsights || {}}
            />
          </div>
        </div>
      ) : (
        // Desktop view with improved sliding sidebar
        <div className="w-full h-[calc(100vh-8rem)] flex overflow-hidden">
          <SidebarProvider defaultOpen={isSidebarOpen}>
            <div className="flex w-full h-full">
              <Sidebar 
                side="left" 
                className={`kundali-sidebar sidebar-shadow sidebar-transition ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                collapsible="offcanvas"
              >
                <SidebarContent className="p-4 w-[350px]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-orange-700">Your Kundali Chart</h2>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-2">
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Hide Kundali Chart</span>
                    </Button>
                  </div>
                  <div className="flex space-x-2 mb-4">
                    <Button 
                      variant={activeTab === 'chart' ? "default" : "outline"} 
                      className={activeTab === 'chart' ? "bg-orange-600" : "border-orange-300 text-orange-600"} 
                      onClick={() => setActiveTab('chart')}
                    >
                      Chart View
                    </Button>
                    <Button 
                      variant={activeTab === 'info' ? "default" : "outline"} 
                      className={activeTab === 'info' ? "bg-orange-600" : "border-orange-300 text-orange-600"} 
                      onClick={() => setActiveTab('info')}
                    >
                      Sign Details
                    </Button>
                  </div>
                  <ScrollArea className="h-[calc(100vh-12rem)]">
                    {activeTab === 'chart' ? (
                      <KundaliChart 
                        birthDetails={birthDetails} 
                        kundaliData={kundaliInsights || undefined} 
                        isLoading={isCalculating}
                      />
                    ) : (
                      <ZodiacInfo 
                        solarSign={kundaliInsights?.enhancedSolarSign}
                        moonSign={kundaliInsights?.moonSign}
                        nakshatra={kundaliInsights?.planets?.find(p => p.name === "Moon")?.nakshatra}
                        className="pb-6"
                      />
                    )}
                  </ScrollArea>
                </SidebarContent>
              </Sidebar>
              
              <div 
                className={`flex-1 p-4 overflow-y-auto flex flex-col transition-all duration-300 ease-in-out ${
                  isSidebarOpen ? 'ml-0' : 'ml-0'
                }`}
              >
                <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col">
                  <div className="flex items-center mb-4">
                    {!isSidebarOpen && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={toggleSidebar}
                        className="mr-2 border-orange-300 text-orange-600 hover:bg-orange-50"
                      >
                        <ChevronRight className="h-5 w-5" />
                        <span className="sr-only">Show Kundali Chart</span>
                      </Button>
                    )}
                    <h2 className="text-xl font-semibold text-orange-700">Astrological Insights Chat</h2>
                  </div>
                  <div className="flex-1 overflow-y-auto bg-white/30 rounded-lg">
                    <ChatInterface 
                      isFullWidth={true} 
                      kundaliInsights={kundaliInsights || {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </div>
      )}
    </AppLayout>
  );
};

export default KundaliChatPage;
