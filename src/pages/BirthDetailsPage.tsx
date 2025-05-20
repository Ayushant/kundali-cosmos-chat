
import React from 'react';
import AppLayout from '@/components/layout/app-layout';
import BirthForm from '@/components/birth-details/birth-form';

const BirthDetailsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-red-600 mb-2">
          Your Cosmic Birth Profile
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your birth details to reveal your personalized Kundali chart and cosmic insights
        </p>
        <BirthForm />
      </div>
    </AppLayout>
  );
};

export default BirthDetailsPage;

