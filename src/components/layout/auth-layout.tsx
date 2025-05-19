
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
      <div className="absolute inset-0 z-0">
        <div className="cosmic-pattern"></div>
      </div>
      
      <SiteHeader />
      
      <main className="flex-grow flex items-center justify-center px-4 py-6 md:py-12 relative z-10">
        <div className="relative w-full max-w-md">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl hidden md:block"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl hidden md:block"></div>
          
          {/* Mobile decorative elements (smaller) */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-red-500/20 rounded-full blur-2xl md:hidden"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-yellow-500/20 rounded-full blur-2xl md:hidden"></div>
          
          {/* Content */}
          {children}
        </div>
      </main>
      
      {/* Login page footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-white/60 text-sm">
        <p>© 2025 Kundali Cosmos | Vedic Astrology Insights</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
