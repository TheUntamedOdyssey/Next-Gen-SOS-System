
import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, AlertTriangle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'operator';
  emergency: boolean;
  timestamp: Date;
}

// Mock data for chat messages with correct typing
const initialMessages: Message[] = [
  { id: 1, text: 'Emergency operator connected.', sender: 'operator', emergency: false, timestamp: new Date(Date.now() - 120000) },
  { id: 2, text: 'What is your emergency?', sender: 'operator', emergency: false, timestamp: new Date(Date.now() - 90000) },
  { id: 3, text: 'I need help immediately! My location is being shared.', sender: 'user', emergency: true, timestamp: new Date(Date.now() - 60000) },
  { id: 4, text: 'Stay calm. Help is on the way. ETA 5 minutes.', sender: 'operator', emergency: false, timestamp: new Date(Date.now() - 30000) },
];

interface ChatInterfaceProps {
  onEmergencyCall?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onEmergencyCall }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      emergency: false,
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate response after a delay
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: 'Message received. Is there anything else we can help with?',
        sender: 'operator',
        emergency: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
    }, 1500);
  };
  
  const handleEmergencyMessage = () => {
    const emergencyMessage: Message = {
      id: Date.now(),
      text: 'EMERGENCY! I need immediate assistance!',
      sender: 'user',
      emergency: true,
      timestamp: new Date()
    };
    
    setMessages([...messages, emergencyMessage]);
    
    // Simulate an emergency response
    setTimeout(() => {
      const response: Message = {
        id: Date.now() + 1,
        text: 'ALERT RECEIVED. Emergency services dispatched. Stay on this chat.',
        sender: 'operator',
        emergency: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
    }, 1000);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-white dark:bg-secondary py-3 px-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Emergency Chat</h2>
          <p className="text-xs text-muted-foreground">Operator connected</p>
        </div>
        <button 
          className="p-2 bg-emergency-500 text-white rounded-full"
          onClick={onEmergencyCall || (() => window.location.href = 'tel:911')}
        >
          <Phone className="h-5 w-5" />
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-sent' : 'chat-bubble-received'} ${message.emergency ? 'chat-bubble-emergency' : ''}`}
          >
            {message.emergency && message.sender === 'user' && (
              <div className="flex items-center mb-1 text-emergency-100">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-xs font-bold">EMERGENCY ALERT</span>
              </div>
            )}
            <p>{message.text}</p>
            <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-right text-primary-foreground/70' : 'text-secondary-foreground/70'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-3 bg-white dark:bg-secondary border-t flex gap-2">
        <button 
          className="p-2 bg-emergency-500 text-white rounded-full flex-shrink-0"
          onClick={handleEmergencyMessage}
        >
          <AlertTriangle className="h-5 w-5" />
        </button>
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-full bg-muted border-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          className="p-2 bg-primary text-white rounded-full flex-shrink-0"
          onClick={handleSendMessage}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
