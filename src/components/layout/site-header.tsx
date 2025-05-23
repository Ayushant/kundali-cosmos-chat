
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // For now this just navigates to login page
    // In a real app, this would handle authentication state
    navigate('/login');
  };

  return (
    <header className="w-full py-2 sm:py-3 px-3 sm:px-4 flex justify-between items-center bg-gradient-to-r from-red-100 to-red-50 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-red-600 whitespace-nowrap">Kundali Cosmos</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-2 bg-orange-100 text-orange-700 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                <Info size={10} className="mr-0.5" />
                <span className="hidden xs:inline">Browser</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Using browser-compatible astronomical calculations</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button 
        variant="ghost" 
        className="flex items-center gap-1 hover:bg-red-200 text-red-600 px-2 sm:px-4 py-1 sm:py-2 min-w-[40px] sm:min-w-[80px]"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </header>
  );
};
