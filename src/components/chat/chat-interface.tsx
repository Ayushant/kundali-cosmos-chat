
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

interface ChatInterfaceProps {
  isFullWidth?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isFullWidth = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your personal Kundali assistant. Based on your birth chart, I can provide insights about your life path, relationships, career, and more. What would you like to know?",
      sender: 'ai',
      timestamp: Date.now(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockResponseExamples = [
    "Based on your Kundali, I see that Saturn's position in your chart suggests a period of professional growth is approaching. Your 10th house is strong, indicating career success, particularly in the next 5 years. Jupiter's influence adds an element of good fortune to your career path.",
    "Looking at your birth chart, I notice Venus is well-positioned in your 7th house. This suggests harmonious relationships are favored in 2026. The timing aligns well with your Shukra Mahadasha period, which often brings developments in relationships and marriage.",
    "Your Kundali shows a strong influence of Jupiter on your 2nd house of wealth. This indicates good financial prospects, especially on Thursdays (Jupiter's day). Your lucky days tend to be Thursday and Monday, based on the beneficial positions of Jupiter and Moon in your chart."
  ];

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
      const randomResponseIndex = Math.floor(Math.random() * mockResponseExamples.length);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponseExamples[randomResponseIndex],
        sender: 'ai',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`flex flex-col ${isFullWidth ? 'h-full' : 'h-[70vh]'} bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden`}>
      <div className="bg-gradient-to-r from-astro-purple to-astro-purple-dark p-4 text-white">
        <h2 className="text-xl font-semibold">Kundali Chat Assistant</h2>
        <p className="text-sm opacity-80">Ask questions about your astrological chart</p>
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
            placeholder="Ask about your career, relationships, health..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isTyping || !inputMessage.trim()}
            className="bg-astro-purple hover:bg-astro-purple-dark"
          >
            <SendIcon size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
