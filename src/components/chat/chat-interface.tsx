
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
import { generateAIResponse, createKundaliSystemPrompt } from '@/utils/deepseek-api';

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

// Mock translations for UI elements only
const greetings: Record<Language, string> = {
  english: "Hello! I'm your personal Kundali assistant. Based on your birth chart, I can provide insights about your life path, relationships, career, and more. What would you like to know?",
  hindi: "नमस्ते! मैं आपका व्यक्तिगत कुंडली सहायक हूं। आपके जन्म चार्ट के आधार पर, मैं आपके जीवन पथ, संबंधों, कैरियर और अधिक के बारे में जानकारी प्रदान कर सकता हूं। आप क्या जानना चाहेंगे?",
  hinglish: "Hello! Main aapka personal Kundali assistant hoon. Aapke birth chart ke aadhar par, main aapke life path, relationships, career, aur bahut kuch ke baare mein insights provide kar sakta hoon. Aap kya jaanna chahenge?"
};

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
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('deepseekApiKey') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(!localStorage.getItem('deepseekApiKey'));
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

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('deepseekApiKey', key);
    setShowApiKeyInput(false);
    toast({
      title: "API Key Saved",
      description: "Your DeepSeek API key has been saved in your browser's local storage.",
      duration: 3000,
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Check if API key is available
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your DeepSeek API key to continue.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Create conversation history for the API
    const conversationHistory = messages
      .filter(msg => msg.id !== '1') // Skip the initial greeting
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));
    
    // Add the new user message
    conversationHistory.push({
      role: 'user',
      content: inputMessage
    });
    
    // Add system prompt with kundali insights
    const systemPrompt = createKundaliSystemPrompt(kundaliInsights);
    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory
    ];
    
    try {
      // Call DeepSeek API
      const aiResponseText = await generateAIResponse(apiMessages, apiKey);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: 'ai',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: "Error",
        description: "Failed to generate a response. Please check your API key and try again.",
        variant: "destructive",
        duration: 5000,
      });
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error while generating a response. Please check your API key and try again.",
        sender: 'ai',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChangeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleSampleQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className={`flex flex-col ${isFullWidth ? 'h-[calc(100vh-160px)]' : 'h-[70vh]'} bg-gradient-to-b from-orange-50 to-white backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-orange-100`}>
      <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Kundali Chat Assistant</h2>
          <p className="text-sm opacity-80">Ask questions about your astrological chart</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white/20 border-white/30 hover:bg-white/30">
              <Globe className="mr-2 h-4 w-4" />
              {language === 'english' ? 'English' : language === 'hindi' ? 'हिंदी' : 'Hinglish'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
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
      
      {/* API Key Input Modal */}
      {showApiKeyInput && (
        <div className="bg-white p-4 border-b border-orange-100">
          <h3 className="text-sm font-medium mb-2">Enter your DeepSeek API Key</h3>
          <p className="text-xs text-gray-500 mb-2">
            This key will be stored in your browser's localStorage. 
            You can get an API key from the <a href="https://platform.deepseek.com/" target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">DeepSeek platform</a>.
          </p>
          <div className="flex gap-2">
            <Input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
              placeholder="Enter your DeepSeek API key here"
            />
            <Button 
              onClick={() => saveApiKey(apiKey)}
              disabled={!apiKey.trim()}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Save
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`chat-bubble ${
              message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
            }`}
          >
            <div className="text-sm whitespace-pre-line">{message.content}</div>
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
      
      <div className="mt-2 px-4">
        <div className="flex flex-wrap gap-2 mb-2 justify-center">
          {Object.keys(kundaliInsights).length > 0 && sampleQuestions[language].map((question, index) => (
            <Button 
              key={index}
              variant="outline"
              size="sm"
              className="text-xs bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700"
              onClick={() => handleSampleQuestion(question)}
            >
              {question.length > 30 ? question.substring(0, 30) + '...' : question}
            </Button>
          ))}
        </div>
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
                    if (!apiKey) {
                      setShowApiKeyInput(true);
                    } else {
                      toast({
                        title: "Kundali Assistant Help",
                        description: "Ask questions about your career, relationships, health, finances, or general life path based on your birth chart.",
                        duration: 5000,
                      });
                    }
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

