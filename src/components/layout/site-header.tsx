
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

export const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // For now this just navigates to login page
    // In a real app, this would handle authentication state
    navigate('/login');
  };

  return (
    <header className="w-full py-3 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold text-red-600">Kundali Cosmos</h1>
      </div>
      <Button 
        variant="ghost" 
        className="flex items-center gap-1 hover:bg-red-100 text-red-600"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </header>
  );
};
