import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';

interface BirthDetails {
  date: Date | undefined;
  time: string;
  place: string;
}

const BirthForm: React.FC = () => {
  const navigate = useNavigate();
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    date: undefined,
    time: '',
    place: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!birthDetails.date) {
      newErrors.date = 'Date of birth is required';
    }
    
    if (!birthDetails.time) {
      newErrors.time = 'Time of birth is required';
    }
    
    if (!birthDetails.place) {
      newErrors.place = 'Place of birth is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulating API call to generate Kundali
      setTimeout(() => {
        setIsSubmitting(false);
        // Navigate to the kundali page with birth details
        navigate('/kundali-chat', { state: { birthDetails } });
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Birth Details</h1>
        <p className="text-gray-600">Enter your birth information to generate your Kundali</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="birth-date" className="text-gray-700">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="birth-date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !birthDetails.date && "text-muted-foreground",
                  errors.date && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDetails.date ? format(birthDetails.date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={birthDetails.date}
                onSelect={(date) => setBirthDetails({ ...birthDetails, date })}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={1900}
                toYear={2100}
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-time" className="text-gray-700">Time of Birth</Label>
          <div className="relative">
            <Input
              id="birth-time"
              type="time"
              value={birthDetails.time}
              onChange={(e) => setBirthDetails({ ...birthDetails, time: e.target.value })}
              className={cn(errors.time && "border-red-500")}
              placeholder="HH:MM"
            />
            <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-place" className="text-gray-700">Place of Birth</Label>
          <div className="relative">
            <Input
              id="birth-place"
              type="text"
              value={birthDetails.place}
              onChange={(e) => setBirthDetails({ ...birthDetails, place: e.target.value })}
              className={cn(errors.place && "border-red-500")}
              placeholder="City, Country"
            />
            <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          {errors.place && <p className="text-red-500 text-sm">{errors.place}</p>}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 transition-opacity text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Generating Kundali...' : 'Generate My Kundali'}
        </Button>
      </form>
    </div>
  );
};

export default BirthForm;
