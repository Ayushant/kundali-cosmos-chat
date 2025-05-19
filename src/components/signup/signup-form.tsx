
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, UserPlus, User, Mail, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      setIsLoading(false);
      return;
    }

    // For demo, we're just simulating a signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully",
        description: "You can now login with your credentials",
        duration: 5000,
      });
      navigate('/login');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">Join Kundali Cosmos</h1>
        <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto mb-4 rounded-full"></div>
        <p className="text-white/80 text-lg">Begin Your Astrological Journey</p>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-6 text-center">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl border border-white/20 space-y-5">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white text-sm font-medium">Full Name</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <User size={16} />
              </div>
              <Input
                id="name"
                placeholder="Your full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white focus:border-red-400 focus:ring-red-400"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-medium">Email Address</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Mail size={16} />
              </div>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white focus:border-red-400 focus:ring-red-400"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white text-sm font-medium">Password</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Lock size={16} />
              </div>
              <Input
                id="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-white/10 border-white/20 text-white focus:border-red-400 focus:ring-red-400"
                required
              />
              <button 
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">Confirm Password</Label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Lock size={16} />
              </div>
              <Input
                id="confirmPassword"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white focus:border-red-400 focus:ring-red-400"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-white/80 cursor-pointer select-none"
            >
              I agree to the terms and privacy policy
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium flex items-center justify-center gap-2 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserPlus size={18} />
                <span>Create Account</span>
              </div>
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/70">
            Already have an account?{' '}
            <a href="/login" className="text-red-300 hover:text-red-200 hover:underline transition-colors">
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
