
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import AppLayout from '@/components/layout/app-layout';
import KundaliChart from '@/components/kundali/kundali-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { calculateKundali } from '@/utils/kundali-calculator';
import { useToast } from '@/components/ui/use-toast';

const KundaliChartPage: React.FC = () => {
  const location = useLocation();
  const birthDetails = location.state?.birthDetails;
  const [kundaliData, setKundaliData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (birthDetails) {
      setIsCalculating(true);
      try {
        // Calculate Kundali using our algorithm
        const calculatedData = calculateKundali(birthDetails);
        setKundaliData(calculatedData);
        toast({
          title: "Kundali Chart Generated",
          description: "Your astrological chart has been calculated successfully.",
          duration: 3000,
        });
      } catch (error) {
        console.error('Error calculating Kundali data:', error);
        toast({
          title: "Calculation Error",
          description: "There was an issue generating your kundali chart. Using fallback data.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsCalculating(false);
      }
    } else {
      // If no birth details provided, show message
      toast({
        title: "Missing Information",
        description: "Please enter your birth details to generate your Kundali chart.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [birthDetails, toast]);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/birth-details">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Birth Details
            </Button>
          </Link>
          
          {kundaliData && (
            <Link to="/kundali-chat" state={{ birthDetails }}>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Chat with Astrologer
              </Button>
            </Link>
          )}
        </div>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-red-50 border-orange-100">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-red-600">Your Kundali Chart</CardTitle>
            <CardDescription className="text-orange-700">
              Based on your birth details, here is your personalized Vedic astrology chart
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-xl mx-auto">
              <KundaliChart 
                birthDetails={birthDetails} 
                kundaliData={kundaliData} 
                isLoading={isCalculating} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default KundaliChartPage;
