
import React from 'react';
import { CosmicBackground } from '../ui/cosmic-background';
import { SiteHeader } from './site-header';
import { Star, Moon, Sun } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-red-900 to-red-950 z-0"></div>
      <CosmicBackground />
      
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="cosmic-pattern opacity-30"></div>
        
        {/* Decorative celestial elements */}
        <div className="fixed top-[15%] left-[10%] w-36 h-36 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="fixed bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-red-500/15 blur-3xl"></div>
        <div className="fixed top-[45%] right-[5%] w-28 h-28 rounded-full bg-yellow-600/10 blur-2xl"></div>
        
        {/* Zodiac symbols as background elements */}
        <div className="fixed top-[10%] right-[20%] text-yellow-500/5 transform rotate-12">
          <Sun size={120} strokeWidth={1} />
        </div>
        <div className="fixed bottom-[15%] left-[10%] text-red-500/5 transform -rotate-12">
          <Moon size={100} strokeWidth={1} />
        </div>
        <div className="fixed top-[30%] left-[25%] text-yellow-500/5">
          <Star size={80} strokeWidth={1} />
        </div>
        
        {/* Animated stars */}
        <div className="fixed top-1/4 left-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-twinkle"></div>
        <div className="fixed top-1/2 left-1/4 w-1 h-1 bg-yellow-200 rounded-full animate-twinkle" style={{animationDelay: '1s'}}></div>
        <div className="fixed top-3/4 left-2/3 w-1 h-1 bg-yellow-200 rounded-full animate-twinkle" style={{animationDelay: '2s'}}></div>
        <div className="fixed top-1/5 right-1/4 w-1 h-1 bg-yellow-200 rounded-full animate-twinkle" style={{animationDelay: '1.5s'}}></div>
        <div className="fixed top-2/3 right-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-twinkle" style={{animationDelay: '0.5s'}}></div>
        
        {/* Hindu astrology decorative elements */}
        <div className="fixed bottom-[10%] right-[30%] w-40 h-40 border border-yellow-500/10 rounded-full"></div>
        <div className="fixed bottom-[10%] right-[30%] w-32 h-32 border border-yellow-500/10 rounded-full"></div>
        <div className="fixed bottom-[10%] right-[30%] w-24 h-24 border border-yellow-500/10 rounded-full"></div>
      </div>
      
      <SiteHeader />
      
      <main className="flex-grow flex items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <div className="relative w-full max-w-md">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl hidden md:block"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl hidden md:block"></div>
          
          {/* Mobile decorative elements (smaller) */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl md:hidden"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-red-500/10 rounded-full blur-2xl md:hidden"></div>
          
          {/* Content */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
