
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, Loader2, Globe } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

interface ChatInterfaceProps {
  isFullWidth?: boolean;
}

// Define the languages
type Language = 'english' | 'hindi' | 'hinglish';

// Mock translations
const greetings: Record<Language, string> = {
  english: "Hello! I'm your personal Kundali assistant. Based on your birth chart, I can provide insights about your life path, relationships, career, and more. What would you like to know?",
  hindi: "नमस्ते! मैं आपका व्यक्तिगत कुंडली सहायक हूं। आपके जन्म चार्ट के आधार पर, मैं आपके जीवन पथ, संबंधों, कैरियर और अधिक के बारे में जानकारी प्रदान कर सकता हूं। आप क्या जानना चाहेंगे?",
  hinglish: "Hello! Main aapka personal Kundali assistant hoon. Aapke birth chart ke aadhar par, main aapke life path, relationships, career, aur bahut kuch ke baare mein insights provide kar sakta hoon. Aap kya jaanna chahenge?"
};

const mockResponseExamples: Record<Language, string[]> = {
  english: [
    "Based on your Kundali, I see that Saturn's position in your chart suggests a period of professional growth is approaching. Your 10th house is strong, indicating career success, particularly in the next 5 years. Jupiter's influence adds an element of good fortune to your career path.",
    "Looking at your birth chart, I notice Venus is well-positioned in your 7th house. This suggests harmonious relationships are favored in 2026. The timing aligns well with your Shukra Mahadasha period, which often brings developments in relationships and marriage.",
    "Your Kundali shows a strong influence of Jupiter on your 2nd house of wealth. This indicates good financial prospects, especially on Thursdays (Jupiter's day). Your lucky days tend to be Thursday and Monday, based on the beneficial positions of Jupiter and Moon in your chart."
  ],
  hindi: [
    "आपकी कुंडली के आधार पर, मुझे दिखता है कि आपके चार्ट में शनि की स्थिति एक व्यावसायिक विकास की अवधि का संकेत देती है। आपका 10वां भाव मजबूत है, जो अगले 5 वर्षों में विशेष रूप से करियर में सफलता का संकेत देता है। बृहस्पति का प्रभाव आपके करियर पथ में सौभाग्य का तत्व जोड़ता है।",
    "आपके जन्म कुंडली को देखते हुए, मुझे पता चला कि शुक्र आपके 7वें घर में अच्छी तरह से स्थित है। इससे संकेत मिलता है कि 2026 में सामंजस्यपूर्ण संबंधों को वरीयता दी जाती है। समय आपके शुक्र महादशा अवधि के साथ अच्छी तरह से संरेखित है, जो अक्सर रिश्तों और विवाह में विकास लाता है।",
    "आपकी कुंडली धन के 2वें घर पर बृहस्पति के मजबूत प्रभाव को दर्शाती है। यह अच्छे वित्तीय संभावनाओं का संकेत देता है, विशेष रूप से गुरुवार (बृहस्पति के दिन)। आपके भाग्यशाली दिन गुरुवार और सोमवार होते हैं, आपके चार्ट में बृहस्पति और चंद्रमा की फायदेमंद स्थितियों के आधार पर।"
  ],
  hinglish: [
    "Aapki Kundali ke aadhar par, mujhe dikhta hai ki aapke chart mein Shani ki position ek professional growth period ka signal deti hai. Aapka 10th house strong hai, jo next 5 years mein career success ka indication deta hai. Jupiter ka influence aapke career path mein good fortune ka element add karta hai.",
    "Aapke birth chart ko dekhte hue, mujhe pata chala ki Venus aapke 7th house mein well-positioned hai. Isse signal milta hai ki 2026 mein harmonious relationships ko favor kiya jayega. Timing aapke Shukra Mahadasha period ke saath align karta hai, jo often relationships aur marriage mein developments lata hai.",
    "Aapki Kundali wealth ke 2nd house par Jupiter ke strong influence ko dikhati hai. Yeh good financial prospects ka indication hai, especially Thursday (Jupiter's day) ko. Aapke lucky days Thursday aur Monday hote hain, Jupiter aur Moon ki beneficial positions ke aadhar par aapke chart mein."
  ]
};

const placeholders: Record<Language, string> = {
  english: "Ask about your career, relationships, health...",
  hindi: "अपने करियर, रिश्तों, स्वास्थ्य के बारे में पूछें...",
  hinglish: "Apne career, relationships, health ke bare mein poochein..."
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isFullWidth = false }) => {
  const [language, setLanguage] = useState<Language>('english');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    
    // Mock AI response
    setTimeout(() => {
      const randomResponseIndex = Math.floor(Math.random() * mockResponseExamples[language].length);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponseExamples[language][randomResponseIndex],
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

  return (
    <div className={`flex flex-col ${isFullWidth ? 'h-full' : 'h-[70vh]'} bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden`}>
      <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 text-white flex justify-between items-center">
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
      
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={placeholders[language]}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isTyping || !inputMessage.trim()}
            className="bg-red-600 hover:bg-red-700"
          >
            <SendIcon size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
