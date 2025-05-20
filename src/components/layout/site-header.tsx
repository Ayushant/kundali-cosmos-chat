
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut, Home } from 'lucide-react';

export const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // For now this just navigates to login page
    // In a real app, this would handle authentication state
    navigate('/login');
  };

  return (
    <header className="w-full py-4 px-4 md:px-6 flex justify-between items-center bg-transparent z-10 relative">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-yellow-100 font-playfair">Kundali Cosmos</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1 hover:bg-yellow-500/10 text-yellow-100"
          onClick={() => navigate('/')}
        >
          <Home size={18} />
          <span className="hidden sm:inline">Home</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1 hover:bg-yellow-500/10 text-yellow-100"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};
