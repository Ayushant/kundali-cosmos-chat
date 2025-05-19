
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // For demo, we're just simulating a login
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        // Navigate to birth details page after successful login
        navigate('/birth-details');
      } else {
        setError('Please enter both email and password');
      }
    }, 1000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/20">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Kundali Cosmos</h1>
        <p className="text-white/70">Login to discover your astrological destiny</p>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-astro"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white">Password</Label>
              <a href="#" className="text-sm text-yellow-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-astro"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:opacity-90 transition-opacity text-black font-medium"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-white">
        <p>
          Don't have an account?{' '}
          <a href="#" className="text-yellow-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
