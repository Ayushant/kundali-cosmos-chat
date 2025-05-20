
import React from 'react';
import AppLayout from '@/components/layout/app-layout';
import BirthForm from '@/components/birth-details/birth-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const BirthDetailsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-md mx-auto mt-6 md:mt-10">
        <Card className="border-red-100 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-red-600 font-playfair">Birth Details</CardTitle>
            <CardDescription className="text-center">Enter your birth information to generate your Kundali chart</CardDescription>
          </CardHeader>
          <CardContent>
            <BirthForm />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BirthDetailsPage;
