
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodiacSignsData, nakshatrasData } from '@/utils/indian-zodiac';

interface ZodiacInfoProps {
  solarSign?: {
    sanskrit: string;
    english: string;
    element: string;
    ruler: string;
  };
  moonSign?: string;
  nakshatra?: string;
  className?: string;
}

const ZodiacInfo: React.FC<ZodiacInfoProps> = ({
  solarSign,
  moonSign,
  nakshatra,
  className = ''
}) => {
  // Find moon sign data if available
  const moonSignData = moonSign 
    ? zodiacSignsData.find(sign => 
        sign.english === moonSign.split(' ')[0] || 
        sign.sanskrit === moonSign.split(' ')[0]
      )
    : undefined;
  
  // Find nakshatra data if available
  const nakshatraData = nakshatra
    ? nakshatrasData.find(n => 
        n.english === nakshatra.split(' ')[0] || 
        n.sanskrit === nakshatra.split(' ')[0]
      )
    : undefined;
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Solar Sign Card */}
      {solarSign && (
        <Card className="zodiac-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Solar Sign (Surya Rashi)</CardTitle>
          </CardHeader>
          <CardContent>
            <h3>{solarSign.english}</h3>
            <p className="sanskrit-name">{solarSign.sanskrit}</p>
            <p className="ruler">Ruler: {solarSign.ruler}</p>
            <span className={`element element-${solarSign.element.toLowerCase()}`}>
              {solarSign.element}
            </span>
          </CardContent>
        </Card>
      )}
      
      {/* Moon Sign Card */}
      {moonSignData && (
        <Card className="zodiac-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Moon Sign (Chandra Rashi)</CardTitle>
          </CardHeader>
          <CardContent>
            <h3>{moonSignData.english}</h3>
            <p className="sanskrit-name">{moonSignData.sanskrit}</p>
            <p className="ruler">Ruler: {moonSignData.ruler}</p>
            <span className={`element element-${moonSignData.element.toLowerCase()}`}>
              {moonSignData.element}
            </span>
          </CardContent>
        </Card>
      )}
      
      {/* Nakshatra Card */}
      {nakshatraData && (
        <Card className="zodiac-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nakshatra (Lunar Mansion)</CardTitle>
          </CardHeader>
          <CardContent>
            <h3>{nakshatraData.english}</h3>
            <p className="ruler">Ruler: {nakshatraData.ruler}</p>
            <p className="text-sm text-gray-600 mt-1">{nakshatraData.degree}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZodiacInfo;
