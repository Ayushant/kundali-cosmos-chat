
import React from 'react';
import { CosmicBackground } from '../ui/cosmic-background';
import { SiteHeader } from './site-header';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <CosmicBackground />
      <SiteHeader />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
