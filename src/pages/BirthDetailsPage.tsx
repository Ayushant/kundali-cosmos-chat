
import React from 'react';
import AppLayout from '@/components/layout/app-layout';
import BirthForm from '@/components/birth-details/birth-form';

const BirthDetailsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto mt-10">
        <BirthForm />
      </div>
    </AppLayout>
  );
};

export default BirthDetailsPage;
