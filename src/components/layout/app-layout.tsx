
import React from 'react';
import { SiteHeader } from './site-header';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <SiteHeader />
      <main className="flex-grow flex w-full overflow-hidden pt-2 pb-2 sm:pt-4 sm:pb-4 px-2 sm:px-4">
        {children}
      </main>
      <footer className="py-3 px-4 text-center text-sm text-red-700/60 bg-red-50 border-t border-red-100">
        <p>© 2025 Kundali Cosmos | Vedic Astrology Insights</p>
      </footer>
    </div>
  );
};

export default AppLayout;
