
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
          <div className="relative">
            <DatePicker
              selected={birthDetails.date}
              onChange={(date) => setBirthDetails({ ...birthDetails, date: date as Date })}
              dateFormat="MMMM d, yyyy"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className={cn(
                "w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                errors.date && "border-red-500"
              )}
              placeholderText="Select date"
              id="birth-date"
            />
            <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
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
              className={cn(errors.time && "border-red-500", "pr-10")}
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
              className={cn(errors.place && "border-red-500", "pr-10")}
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
