
import React from 'react';
import { SiteHeader } from './site-header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <SiteHeader />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {children}
        </div>
      </main>
      <footer className="py-3 px-4 text-center text-sm text-red-700/60 bg-red-50 border-t border-red-100">
        <p>© 2025 Kundali Cosmos | Vedic Astrology Insights</p>
      </footer>
    </div>
  );
};

export default AppLayout;
