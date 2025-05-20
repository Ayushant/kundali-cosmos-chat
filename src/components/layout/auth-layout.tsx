
import React from 'react';
import { CosmicBackground } from '../ui/cosmic-background';
import { SiteHeader } from './site-header';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <CosmicBackground />
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="cosmic-pattern"></div>
        {/* Decorative celestial elements */}
        <div className="fixed top-[15%] left-[10%] w-32 h-32 rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="fixed bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="fixed top-[45%] right-[5%] w-24 h-24 rounded-full bg-red-600/5 blur-2xl"></div>
        
        {/* Animated stars */}
        <div className="fixed top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
        <div className="fixed top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" style={{animationDelay: '1s'}}></div>
        <div className="fixed top-3/4 left-2/3 w-1 h-1 bg-white rounded-full animate-twinkle" style={{animationDelay: '2s'}}></div>
      </div>
      
      <SiteHeader />
      
      <main className="flex-grow flex items-center justify-center px-4 py-8 md:py-12 relative z-10">
        <div className="relative w-full max-w-md">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl hidden md:block"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl hidden md:block"></div>
          
          {/* Mobile decorative elements (smaller) */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-red-500/10 rounded-full blur-2xl md:hidden"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl md:hidden"></div>
          
          {/* Content */}
          {children}
        </div>
      </main>
      
      {/* Login page footer is now in the LoginForm component for better layout control */}
    </div>
  );
};

export default AuthLayout;
