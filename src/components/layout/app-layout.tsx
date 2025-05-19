
import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white">
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
