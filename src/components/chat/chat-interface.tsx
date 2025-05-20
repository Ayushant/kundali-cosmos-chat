
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, Loader2, Globe, HelpCircle, Star } from 'lucide-react';
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
  // Default response if no insights
  if (!insights || Object.keys(insights).length === 0) {
    return {
      english: "I don't have enough information about your birth chart. Please provide your birth details for more personalized insights.",
      hindi: "मुझे आपके जन्म कुंडली के बारे में पर्याप्त जानकारी नहीं है। अधिक व्यक्तिगत अंतर्दृष्टि के लिए कृपया अपने जन्म विवरण प्रदान करें।",
      hinglish: "Mujhe aapke birth chart ke baare mein paryapt jankari nahi hai. Adhik vyaktigat insights ke liye kripya apne birth details provide karen."
    }[language];
  }

  // Check keywords in the message to provide relevant responses
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('profession')) {
    return {
      english: `Based on your birth chart, with ${insights.ascendant} ascendant and ${insights.planets?.find(p => p.name === "Sun")?.sign} Sun, your 10th house of career is influenced by ${insights.planets?.find(p => p.house === 10)?.name || 'Moon'}. This suggests you may excel in ${insights.ascendant === 'Leo' ? 'leadership roles, entertainment, or creative fields' : 'analytical or service-oriented professions'}. Your current ${insights.currentDasha} period is favorable for professional growth, especially in fields related to communication and analysis.`,
      hindi: `आपके जन्म कुंडली के अनुसार, ${insights.ascendant} लग्न और ${insights.planets?.find(p => p.name === "Sun")?.sign} सूर्य के साथ, आपके करियर का 10वां घर ${insights.planets?.find(p => p.house === 10)?.name || 'चंद्रमा'} से प्रभावित है। इससे संकेत मिलता है कि आप ${insights.ascendant === 'Leo' ? 'नेतृत्व भूमिकाओं, मनोरंजन, या रचनात्मक क्षेत्रों' : 'विश्लेषणात्मक या सेवा-उन्मुख पेशे'} में उत्कृष्टता प्राप्त कर सकते हैं। आपका वर्तमान ${insights.currentDasha} अवधि व्यावसायिक विकास के लिए अनुकूल है, विशेष रूप से संचार और विश्लेषण से संबंधित क्षेत्रों में।`,
      hinglish: `Aapke birth chart ke anusaar, ${insights.ascendant} lagna aur ${insights.planets?.find(p => p.name === "Sun")?.sign} Surya ke saath, aapka career ka 10th house ${insights.planets?.find(p => p.house === 10)?.name || 'Chandra'} se prabhavit hai. Isse sanket milta hai ki aap ${insights.ascendant === 'Leo' ? 'leadership roles, entertainment, ya creative fields' : 'analytical ya service-oriented professions'} mein excel kar sakte hain. Aapka current ${insights.currentDasha} period professional growth ke liye favorable hai, vishesh roop se communication aur analysis se related fields mein.`
    }[language];
  }

  if (lowerMessage.includes('relationship') || lowerMessage.includes('love') || lowerMessage.includes('marriage')) {
    return {
      english: `With your Moon in ${insights.moonSign?.split(' ')[0]}, your emotional needs in relationships are ${insights.moonSign?.includes('Taurus') ? 'centered around stability, loyalty and comfort' : 'focused on communication and adaptability'}. Venus's position in your chart suggests ${insights.planets?.find(p => p.name === 'Venus')?.sign === 'Libra' ? 'harmonious partnerships are favored' : 'you seek depth and passion in relationships'}. The 7th house in your chart indicates potential for a partner who is ${insights.ascendant === 'Leo' ? 'intellectual and communicative' : 'nurturing and supportive'}.`,
      hindi: `${insights.moonSign?.split(' ')[0]} में आपके चंद्रमा के साथ, रिश्तों में आपकी भावनात्मक जरूरतें ${insights.moonSign?.includes('Taurus') ? 'स्थिरता, वफादारी और आराम पर केंद्रित हैं' : 'संचार और अनुकूलन पर केंद्रित हैं'}। आपके चार्ट में शुक्र की स्थिति से पता चलता है कि ${insights.planets?.find(p => p.name === 'Venus')?.sign === 'Libra' ? 'सामंजस्यपूर्ण साझेदारी को प्राथमिकता दी जाती है' : 'आप रिश्तों में गहराई और जुनून चाहते हैं'}। आपके चार्ट में 7वां घर एक साथी की संभावना को इंगित करता है जो ${insights.ascendant === 'Leo' ? 'बौद्धिक और संचारशील है' : 'पोषण और सहायक है'}।`,
      hinglish: `${insights.moonSign?.split(' ')[0]} mein aapke Moon ke saath, relationships mein aapki emotional needs ${insights.moonSign?.includes('Taurus') ? 'stability, loyalty aur comfort par centered hain' : 'communication aur adaptability par focused hain'}. Venus ki position aapke chart mein suggest karti hai ki ${insights.planets?.find(p => p.name === 'Venus')?.sign === 'Libra' ? 'harmonious partnerships ko favor kiya jata hai' : 'aap relationships mein depth aur passion chahte hain'}. 7th house aapke chart mein potential dikhata hai ek partner ke liye jo ${insights.ascendant === 'Leo' ? 'intellectual aur communicative hai' : 'nurturing aur supportive hai'}.`
    }[language];
  }
  
  if (lowerMessage.includes('health') || lowerMessage.includes('wellness') || lowerMessage.includes('medical')) {
    return {
      english: `Your birth chart shows ${insights.ascendant} rising, which relates to ${insights.ascendant === 'Leo' ? 'heart, spine, and circulation' : 'digestive system and metabolism'}. With ${insights.planets?.find(p => p.house === 6)?.name || 'no planets'} in the 6th house of health, you should pay attention to ${insights.ascendant === 'Leo' ? 'cardiac health and stress management' : 'digestive health and immune system'}. Regular exercise is especially beneficial for your constitution, particularly ${insights.ascendant === 'Leo' ? 'cardiovascular activities' : 'yoga and moderate strength training'}.`,
      hindi: `आपकी जन्म कुंडली ${insights.ascendant} उदय दिखाती है, जो ${insights.ascendant === 'Leo' ? 'हृदय, रीढ़ और परिसंचरण' : 'पाचन तंत्र और चयापचय'} से संबंधित है। स्वास्थ्य के 6ठे घर में ${insights.planets?.find(p => p.house === 6)?.name || 'कोई ग्रह नहीं'} के साथ, आपको ${insights.ascendant === 'Leo' ? 'हृदय स्वास्थ्य और तनाव प्रबंधन' : 'पाचन स्वास्थ्य और प्रतिरक्षा प्रणाली'} पर ध्यान देना चाहिए। नियमित व्यायाम आपके संविधान के लिए विशेष रूप से फायदेमंद है, विशेष रूप से ${insights.ascendant === 'Leo' ? 'हृदय संबंधी गतिविधियां' : 'योग और मध्यम शक्ति प्रशिक्षण'}।`,
      hinglish: `Aapki birth chart ${insights.ascendant} rising dikhati hai, jo ${insights.ascendant === 'Leo' ? 'heart, spine, aur circulation' : 'digestive system aur metabolism'} se related hai. Health ke 6th house mein ${insights.planets?.find(p => p.house === 6)?.name || 'koi planet nahi'} ke saath, aapko ${insights.ascendant === 'Leo' ? 'cardiac health aur stress management' : 'digestive health aur immune system'} par dhyan dena chahiye. Regular exercise aapke constitution ke liye vishesh roop se beneficial hai, particularly ${insights.ascendant === 'Leo' ? 'cardiovascular activities' : 'yoga aur moderate strength training'}.`
    }[language];
  }
  
  // General response for other questions
  return {
    english: `Based on your Kundali with ${insights.ascendant} ascendant, ${insights.moonSign} moon, and ${insights.sunSign} sun, I can see that your chart shows strong influences in houses ${insights.strongHouses?.join(', ')}. The current ${insights.currentDasha} period indicates a time of spiritual and philosophical growth. Your ${insights.planets?.find(p => p.name === 'Jupiter')?.sign || 'Jupiter'} placement suggests good fortune in areas related to higher education and personal expansion.`,
    hindi: `${insights.ascendant} लग्न, ${insights.moonSign} चंद्र और ${insights.sunSign} सूर्य के साथ आपकी कुंडली के आधार पर, मैं देख सकता हूं कि आपका चार्ट घरों ${insights.strongHouses?.join(', ')} में मजबूत प्रभाव दिखाता है। वर्तमान ${insights.currentDasha} अवधि आध्यात्मिक और दार्शनिक विकास के समय को दर्शाती है। आपका ${insights.planets?.find(p => p.name === 'Jupiter')?.sign || 'बृहस्पति'} स्थान उच्च शिक्षा और व्यक्तिगत विस्तार से संबंधित क्षेत्रों में अच्छे भाग्य का संकेत देता है।`,
    hinglish: `${insights.ascendant} lagna, ${insights.moonSign} moon, aur ${insights.sunSign} sun ke saath aapki Kundali ke aadhar par, main dekh sakta hoon ki aapka chart houses ${insights.strongHouses?.join(', ')} mein strong influences dikhata hai. Current ${insights.currentDasha} period spiritual aur philosophical growth ke samay ko indicate karta hai. Aapka ${insights.planets?.find(p => p.name === 'Jupiter')?.sign || 'Jupiter'} placement higher education aur personal expansion se related areas mein good fortune suggest karta hai.`
  }[language];
};

// Mock translations
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
    
    // Generate AI response based on kundali insights
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputMessage, language, kundaliInsights),
        sender: 'ai',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
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
