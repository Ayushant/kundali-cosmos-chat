
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodiacSignsData, nakshatrasData } from '@/utils/indian-zodiac';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  // Get element colors for styling
  const getElementColor = (element: string) => {
    switch(element.toLowerCase()) {
      case 'fire': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'earth': return 'bg-green-100 text-green-800 border-green-200';
      case 'air': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'water': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Get ruler color for styling
  const getRulerColor = (ruler: string) => {
    switch(ruler.toLowerCase()) {
      case 'sun': return 'text-amber-600';
      case 'moon': return 'text-slate-500';
      case 'mercury': return 'text-emerald-500';
      case 'venus': return 'text-pink-500';
      case 'mars': return 'text-red-600';
      case 'jupiter': return 'text-purple-600';
      case 'saturn': return 'text-blue-800';
      case 'rahu': return 'text-slate-700';
      case 'ketu': return 'text-orange-800';
      default: return 'text-gray-700';
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Solar Sign Card */}
      {solarSign && (
        <Card className="zodiac-card overflow-hidden border-t-4" style={{ borderTopColor: solarSign.element === 'Fire' ? '#f97316' : 
          solarSign.element === 'Earth' ? '#16a34a' : 
          solarSign.element === 'Air' ? '#3b82f6' : 
          '#6366f1' }}>
          <CardHeader className="pb-2 bg-gradient-to-r from-orange-50 to-orange-100">
            <CardTitle className="text-lg flex items-center">
              Solar Sign (Surya Rashi)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-amber-100 px-1 text-xs font-medium text-amber-800 hover:bg-amber-200">
                      ?
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your Sun sign represents your core identity and ego</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xl">{solarSign.english}</h3>
                <p className="sanskrit-name text-sm text-gray-500 italic">{solarSign.sanskrit}</p>
              </div>
              <span className={`element px-2 py-1 rounded-md text-sm font-medium border ${getElementColor(solarSign.element)}`}>
                {solarSign.element}
              </span>
            </div>
            <p className="ruler mt-3 flex items-center">
              <span className="text-gray-600 mr-2">Ruled by:</span> 
              <span className={`font-medium ${getRulerColor(solarSign.ruler)}`}>{solarSign.ruler}</span>
            </p>
            <div className="mt-3 text-sm text-gray-600">
              {solarSign.english === 'Aries' && "Bold and ambitious, Aries rushes in headfirst with courage and determination."}
              {solarSign.english === 'Taurus' && "Reliable and practical, Taurus values stability and sensual pleasures."}
              {solarSign.english === 'Gemini' && "Curious and adaptable, Gemini represents the duality of communication and intellect."}
              {solarSign.english === 'Cancer' && "Intuitive and emotional, Cancer is deeply connected to home and family."}
              {solarSign.english === 'Leo' && "Creative and generous, Leo brings warmth and dramatic flair to all endeavors."}
              {solarSign.english === 'Virgo' && "Analytical and practical, Virgo excels at detailed work and service to others."}
              {solarSign.english === 'Libra' && "Harmonious and diplomatic, Libra seeks balance and beauty in relationships."}
              {solarSign.english === 'Scorpio' && "Intense and transformative, Scorpio dives deep into life's mysteries."}
              {solarSign.english === 'Sagittarius' && "Adventurous and philosophical, Sagittarius seeks meaning through exploration."}
              {solarSign.english === 'Capricorn' && "Disciplined and responsible, Capricorn builds foundations for long-term success."}
              {solarSign.english === 'Aquarius' && "Innovative and humanitarian, Aquarius brings vision for future progress."}
              {solarSign.english === 'Pisces' && "Compassionate and intuitive, Pisces connects to universal spiritual truths."}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Moon Sign Card */}
      {moonSignData && (
        <Card className="zodiac-card overflow-hidden border-t-4" style={{ borderTopColor: moonSignData.element === 'Fire' ? '#f97316' : 
          moonSignData.element === 'Earth' ? '#16a34a' : 
          moonSignData.element === 'Air' ? '#3b82f6' : 
          '#6366f1' }}>
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="text-lg flex items-center">
              Moon Sign (Chandra Rashi)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-100 px-1 text-xs font-medium text-blue-800 hover:bg-blue-200">
                      ?
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your Moon sign represents your emotions and subconscious mind</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xl">{moonSignData.english}</h3>
                <p className="sanskrit-name text-sm text-gray-500 italic">{moonSignData.sanskrit}</p>
              </div>
              <span className={`element px-2 py-1 rounded-md text-sm font-medium border ${getElementColor(moonSignData.element)}`}>
                {moonSignData.element}
              </span>
            </div>
            <p className="ruler mt-3 flex items-center">
              <span className="text-gray-600 mr-2">Ruled by:</span> 
              <span className={`font-medium ${getRulerColor(moonSignData.ruler)}`}>{moonSignData.ruler}</span>
            </p>
            <div className="mt-3 text-sm text-gray-600">
              {moonSignData.english === 'Aries' && "With Moon in Aries, your emotions are direct, passionate, and sometimes impulsive."}
              {moonSignData.english === 'Taurus' && "With Moon in Taurus, you find emotional security through stability and physical comfort."}
              {moonSignData.english === 'Gemini' && "With Moon in Gemini, your emotions are intellectually processed and frequently changing."}
              {moonSignData.english === 'Cancer' && "With Moon in Cancer, you experience deep emotional currents and strong nurturing instincts."}
              {moonSignData.english === 'Leo' && "With Moon in Leo, your emotions are warm, dramatic, and need creative expression."}
              {moonSignData.english === 'Virgo' && "With Moon in Virgo, you process emotions through practical analysis and service."}
              {moonSignData.english === 'Libra' && "With Moon in Libra, emotional harmony and balanced relationships are essential to your wellbeing."}
              {moonSignData.english === 'Scorpio' && "With Moon in Scorpio, your emotional life is intense, transformative, and deeply private."}
              {moonSignData.english === 'Sagittarius' && "With Moon in Sagittarius, you seek emotional freedom and philosophical understanding."}
              {moonSignData.english === 'Capricorn' && "With Moon in Capricorn, emotional security comes through achievement and structure."}
              {moonSignData.english === 'Aquarius' && "With Moon in Aquarius, your emotional nature is detached, humanitarian, and unconventional."}
              {moonSignData.english === 'Pisces' && "With Moon in Pisces, your emotions are fluid, compassionate, and psychically receptive."}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Nakshatra Card */}
      {nakshatraData && (
        <Card className="zodiac-card overflow-hidden border-t-4 border-t-purple-300">
          <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardTitle className="text-lg flex items-center">
              Nakshatra (Lunar Mansion)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-purple-100 px-1 text-xs font-medium text-purple-800 hover:bg-purple-200">
                      ?
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Nakshatras are 27 divisions of the zodiac that provide deeper insights into your personality and karma</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xl">{nakshatraData.english}</h3>
                <p className="sanskrit-name text-sm text-gray-500 italic">{nakshatraData.sanskrit}</p>
              </div>
            </div>
            <p className="ruler mt-3 flex items-center">
              <span className="text-gray-600 mr-2">Ruled by:</span> 
              <span className={`font-medium ${getRulerColor(nakshatraData.ruler)}`}>{nakshatraData.ruler}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">{nakshatraData.degree}</p>
            <div className="mt-3 text-sm text-gray-600">
              {/* Brief description of each nakshatra - I'm adding a few example descriptions */}
              {nakshatraData.english === 'Ashwini' && "Ashwini brings swift healing energy, rejuvenation, and fresh beginnings."}
              {nakshatraData.english === 'Bharani' && "Bharani governs transformation, restraint, and the bearing of life's burdens."}
              {nakshatraData.english === 'Krittika' && "Krittika brings purifying fire, cutting through illusions with sharp clarity."}
              {nakshatraData.english === 'Rohini' && "Rohini offers growth, fertility, and abundance through patient cultivation."}
              {nakshatraData.english === 'Mrigashira' && "Mrigashira bestows gentle seeking energy and adaptability."}
              {nakshatraData.english === 'Ardra' && "Ardra brings transformative storms that clear the path for new growth."}
              {nakshatraData.english === 'Punarvasu' && "Punarvasu offers renewal, return, and homecoming after journeys."}
              {nakshatraData.english === 'Pushya' && "Pushya nurtures through nourishment, care, and protection of what is precious."}
              {/* Add other nakshatras with brief descriptions as needed */}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZodiacInfo;
