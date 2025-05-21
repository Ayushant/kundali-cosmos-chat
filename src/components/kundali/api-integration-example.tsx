
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { calculatePreciseZodiacData } from '@/utils/indian-zodiac';

interface ApiIntegrationExampleProps {
  birthDetails?: {
    date: Date;
    time: string;
    place?: string;
    latitude?: number;
    longitude?: number;
  };
}

const ApiIntegrationExample: React.FC<ApiIntegrationExampleProps> = ({ birthDetails }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleFetchData = async () => {
    if (!birthDetails?.date || !birthDetails?.time) {
      setError('Birth date and time are required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would pass the API key to the function
      // For this demo, we're using our simplified calculation
      const data = await calculatePreciseZodiacData({
        date: birthDetails.date,
        time: birthDetails.time,
        latitude: birthDetails.latitude || 28.6139, // Default to New Delhi
        longitude: birthDetails.longitude || 77.2090
      });
      
      setResult(data);
    } catch (err) {
      console.error('Error fetching zodiac data:', err);
      setError('Failed to fetch zodiac data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Integration Demo</CardTitle>
        <CardDescription>
          This demonstrates how to integrate with astrology APIs for precise calculations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key (for demonstration only)</Label>
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Note: In a production environment, API keys should be stored securely server-side.
            </p>
          </div>
          
          <Button 
            onClick={handleFetchData} 
            disabled={isLoading || !birthDetails?.date}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching data...
              </>
            ) : 'Fetch Precise Zodiac Data'}
          </Button>
          
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
          
          {result && (
            <div className="mt-4 space-y-4">
              <h3 className="font-medium text-lg">Results:</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p><strong>Sun Sign:</strong> {result.sunSign.sanskrit} ({result.sunSign.english})</p>
                <p><strong>Moon Sign:</strong> {result.moonSign.sanskrit} ({result.moonSign.english})</p>
                <p><strong>Nakshatra:</strong> {result.nakshatra.sanskrit}</p>
                <p><strong>Ascendant:</strong> {result.ascendant.sanskrit} ({result.ascendant.english})</p>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Note: This is using simulated data for demonstration purposes. 
                In a real implementation, this would use actual API data or Swiss Ephemeris calculations.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiIntegrationExample;
