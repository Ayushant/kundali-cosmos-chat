
import React from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import KundaliChart from '@/components/kundali/kundali-chart';
import ChatInterface from '@/components/chat/chat-interface';

const KundaliChatPage: React.FC = () => {
  const location = useLocation();
  const birthDetails = location.state?.birthDetails;

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-sm">
          <KundaliChart birthDetails={birthDetails} />
        </div>
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <ChatInterface isFullWidth={true} />
        </div>
      </div>
    </AppLayout>
  );
};

export default KundaliChatPage;
