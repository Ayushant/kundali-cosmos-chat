
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <KundaliChart birthDetails={birthDetails} />
        </div>
        <div className="md:col-span-2">
          <ChatInterface isFullWidth={true} />
        </div>
      </div>
    </AppLayout>
  );
};

export default KundaliChatPage;
