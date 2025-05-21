
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, Loader2, Globe, HelpCircle } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { generateAstrologicalResponse } from '@/utils/astrology-interpreter';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

interface KundaliInsight {
  ascendant?: string;
  moonSign?: string;
  sunSign?: string;
  currentDasha?: string;
  strongHouses?: number[];
  weakHouses?: number[];
  planets?: Array<{
    name: string;
    sign: string;
    house: number;
    degree?: number;
    nakshatra?: string;
  }>;
}

interface ChatInterfaceProps {
  isFullWidth?: boolean;
  kundaliInsights?: KundaliInsight;
}

// Define the languages
type Language = 'english' | 'hindi' | 'hinglish';

// Template for kundali-aware responses
const generateResponse = (message: string, language: Language, insights?: KundaliInsight): string => {
  // Use our new astrology interpreter if we have insights
  if (insights && Object.keys(insights).length > 0) {
    return generateAstrologicalResponse(message, insights, language);
  }
  
  // Default response if no insights
  return {
    english: "I don't have enough information about your birth chart. Please provide your birth details for more personalized insights.",
    hindi: "मुझे आपके जन्म कुंडली के बारे में पर्याप्त जानकारी नहीं है। अधिक व्यक्तिगत अंतर्दृष्टि के लिए कृपया अपने जन्म विवरण प्रदान करें।",
    hinglish: "Mujhe aapke birth chart ke baare mein paryapt jankari nahi hai. Adhik vyaktigat insights ke liye kripya apne birth details provide karen."
  }[language];
};

// Greetings based on language
const greetings: Record<Language, string> = {
  english: "Hello! I'm your personal Kundali assistant. Based on your birth chart, I can provide insights about your life path, relationships, career, and more. What would you like to know?",
  hindi: "नमस्ते! मैं आपका व्यक्तिगत कुंडली सहायक हूं। आपके जन्म चार्ट के आधार पर, मैं आपके जीवन पथ, संबंधों, कैरियर और अधिक के बारे में जानकारी प्रदान कर सकता हूं। आप क्या जानना चाहेंगे?",
  hinglish: "Hello! Main aapka personal Kundali assistant hoon. Aapke birth chart ke aadhar par, main aapke life path, relationships, career, aur bahut kuch ke baare mein insights provide kar sakta hoon. Aap kya jaanna chahenge?"
};

// Placeholders based on language
const placeholders: Record<Language, string> = {
  english: "Ask about your career, relationships, health...",
  hindi: "अपने करियर, रिश्तों, स्वास्थ्य के बारे में पूछें...",
  hinglish: "Apne career, relationships, health ke bare mein poochein..."
};

// Sample questions based on language
const sampleQuestions: Record<Language, string[]> = {
  english: [
    "What does my career path look like in the next 5 years?",
    "When is a good time for marriage according to my chart?",
    "Which health aspects should I focus on?",
    "What are my financial prospects this year?"
  ],
  hindi: [
    "अगले 5 वर्षों में मेरा करियर कैसा दिखता है?",
    "मेरे चार्ट के अनुसार विवाह के लिए अच्छा समय कब है?",
    "मुझे किन स्वास्थ्य पहलुओं पर ध्यान देना चाहिए?",
    "इस साल मेरी वित्तीय संभावनाएं क्या हैं?"
  ],
  hinglish: [
    "Next 5 years mein mera career kaisa dikhta hai?",
    "Mere chart ke according marriage ke liye accha time kab hai?",
    "Mujhe kin health aspects par dhyan dena chahiye?",
    "Is saal meri financial prospects kya hain?"
  ]
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isFullWidth = false, kundaliInsights = {} }) => {
  const [language, setLanguage] = useState<Language>('english');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize messages with the greeting in the selected language
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: greetings[language],
        sender: 'ai',
        timestamp: Date.now(),
      },
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Effect to notify when kundali insights are loaded
  useEffect(() => {
    if (Object.keys(kundaliInsights).length > 0) {
      toast({
        title: "Kundali insights loaded",
        description: "The AI assistant can now provide personalized insights based on your birth chart.",
        duration: 3000,
      });
    }
  }, [kundaliInsights, toast]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Generate AI response based on kundali insights with variable timing for more natural feel
    const responseTime = Math.floor(Math.random() * 1000) + 800; // 800-1800ms

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputMessage, language, kundaliInsights),
        sender: 'ai',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, responseTime);
  };

  const handleChangeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleSampleQuestion = (question: string) => {
    setInputMessage(question);
  };

  // Function to determine if the chat should show detailed interface elements
  const hasKundaliData = Object.keys(kundaliInsights).length > 0;

  return (    <div className={`flex flex-col ${isFullWidth ? 'h-[calc(100vh-160px)]' : 'h-[70vh]'} bg-gradient-to-b from-orange-50 to-white backdrop-blur-md rounded-xl shadow-lg border border-orange-100`}>
      <div className="chat-header flex-none bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Kundali Chat Assistant</h2>
          <p className="text-sm opacity-80">Ask questions about your astrological chart</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="language-selector bg-white/20 border-white/30 hover:bg-white/30">
              <Globe className="mr-2 h-4 w-4" />
              {language === 'english' ? 'English' : language === 'hindi' ? 'हिंदी' : 'Hinglish'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="language-dropdown bg-white" align="end">
            <DropdownMenuItem onClick={() => handleChangeLanguage('english')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeLanguage('hindi')}>
              हिंदी (Hindi)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeLanguage('hinglish')}>
              Hinglish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`chat-bubble ${
              message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
            }`}
          >
            <div className="text-sm">{message.content}</div>
            <div className="text-xs opacity-70 text-right mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-bubble chat-bubble-ai inline-flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span>Analyzing your Kundali...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
        <div className="mt-2 px-2 sm:px-4">
        {hasKundaliData && (
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 mb-2 justify-center">
            {sampleQuestions[language].map((question, index) => (
              <Button 
                key={index}
                variant="outline"
                size="sm"
                className="text-[10px] sm:text-xs bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700 h-auto py-1 px-2 sm:py-2 sm:px-3 w-full sm:w-auto"
                onClick={() => handleSampleQuestion(question)}
              >
                {question.length > 20 ? question.substring(0, 20) + '...' : question}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t border-orange-100 p-4 bg-white/60">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={placeholders[language]}
            className="flex-1 border-orange-200 focus-visible:ring-orange-500"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="submit" 
                  disabled={isTyping || !inputMessage.trim()}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <SendIcon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-orange-200 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  onClick={() => {
                    toast({
                      title: "Kundali Assistant Help",
                      description: "Ask questions about your career, relationships, health, finances, or general life path based on your birth chart.",
                      duration: 5000,
                    });
                  }}
                >
                  <HelpCircle size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get help</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
