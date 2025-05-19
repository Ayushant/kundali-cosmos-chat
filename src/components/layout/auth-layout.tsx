
import React from 'react';
import { CosmicBackground } from '../ui/cosmic-background';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
      <CosmicBackground />
      <div className="relative z-10 w-full max-w-md bg-white/90 rounded-lg shadow-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
