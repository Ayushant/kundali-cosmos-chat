
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, LogIn, User, Key, Moon, Sun, Star } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-amber-100 mb-3 font-playfair">Kundali Cosmos</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-yellow-400 mx-auto mb-4 rounded-full"></div>
        <p className="text-yellow-100/90 text-lg">Discover Your Astrological Destiny</p>
      </div>
      
      <Card className="backdrop-blur-lg bg-yellow-900/20 border-yellow-500/30 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 right-0 w-16 h-16 bg-red-500/20 rounded-full blur-lg"></div>
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-yellow-400/20 rounded-full blur-xl"></div>
          <div className="absolute flex items-center justify-center w-full opacity-10 pointer-events-none">
            <Star className="absolute top-12 left-12 text-yellow-200" size={20} />
            <Sun className="absolute bottom-20 right-12 text-yellow-300" size={24} />
            <Moon className="absolute bottom-12 left-1/4 text-yellow-100" size={16} />
            <Star className="absolute top-1/3 right-1/4 text-yellow-200" size={14} />
          </div>
        </div>
        
        <CardHeader className="px-6 pt-6 pb-0 relative z-10">
          <div className="flex items-center justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center">
              <Star className="text-yellow-100" size={26} />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-yellow-100 text-center">Welcome Back</h2>
        </CardHeader>
        
        {error && (
          <div className="mx-6 mt-4 bg-red-500/30 border border-red-500/50 text-yellow-100 p-3 rounded-lg text-center relative z-10">
            <p>{error}</p>
          </div>
        )}
        
        <CardContent className="px-6 pt-4 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-yellow-100/90 text-sm font-medium">Email Address</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-yellow-200/80">
                  <User size={16} />
                </div>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-yellow-950/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50 focus:border-red-400 focus:ring-red-400"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-yellow-100/90 text-sm font-medium">Password</Label>
                <a href="#" className="text-red-300 hover:text-red-200 text-sm transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-3 text-yellow-200/80">
                  <Key size={16} />
                </div>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-yellow-950/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50 focus:border-red-400 focus:ring-red-400"
                  required
                />
                <button 
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-yellow-200/60 hover:text-yellow-100 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 border-yellow-500/50"
              />
              <label 
                htmlFor="remember-me" 
                className="text-sm text-yellow-100/90 cursor-pointer select-none"
              >
                Remember me
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500 text-yellow-50 font-medium flex items-center justify-center gap-2 transition-all border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 border-2 border-t-transparent border-yellow-100 rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn size={18} />
                  <span>Login</span>
                </div>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-2 flex justify-center relative z-10">
          <p className="text-yellow-200/80 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-red-300 hover:text-red-200 hover:underline transition-colors font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
      
      <div className="mt-6 text-center">
        <p className="text-yellow-200/60 text-sm">
          © 2025 Kundali Cosmos | Vedic Astrology Insights
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
