
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface SOSButtonProps {
  size?: 'sm' | 'md' | 'lg';
  onActivate?: () => void;
}

const SOSButton: React.FC<SOSButtonProps> = ({ 
  size = 'lg',
  onActivate 
}) => {
  const [pressed, setPressed] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [ripples, setRipples] = useState<number[]>([]);
  
  // Size class mapping
  const sizeClasses = {
    sm: 'h-20 w-20',
    md: 'h-32 w-32',
    lg: 'h-44 w-44'
  };
  
  // Handle long press activation
  const handlePressStart = () => {
    setPressed(true);
    
    // Create a timer for activation after holding for 2 seconds
    const timer = setTimeout(() => {
      handleActivate();
    }, 2000);
    
    setLongPressTimer(timer);
  };
  
  const handlePressEnd = () => {
    setPressed(false);
    
    // Clear the timer if button is released before activation
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };
  
  const handleActivate = () => {
    // Add a ripple effect
    const id = Date.now();
    setRipples(prev => [...prev, id]);
    
    // Trigger vibration if available
    if (navigator.vibrate) {
      navigator.vibrate(500);
    }
    
    // Call the onActivate callback
    if (onActivate) {
      onActivate();
    }
    
    // Show toast notification
    toast.success('SOS Signal Activated', {
      description: 'Emergency services have been notified.',
      duration: 5000,
    });
  };
  
  // Clean up ripples after animation
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [ripples]);
  
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className={`sos-button ${sizeClasses[size]}`}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
      >
        {/* Ripple effects */}
        {ripples.map(id => (
          <span 
            key={id} 
            className={`sos-button-ripple ${sizeClasses[size]}`}
          />
        ))}
        
        {/* Inner button with scale effect when pressed */}
        <div 
          className={`sos-button-inner ${pressed ? 'scale-90' : 'scale-100'} ${pressed ? 'bg-emergency-700' : 'bg-emergency-600'}`}
        >
          <AlertTriangle 
            className={`${size === 'lg' ? 'h-16 w-16' : size === 'md' ? 'h-12 w-12' : 'h-8 w-8'} animate-pulse`}
          />
        </div>
      </button>
      <p className="mt-4 text-center font-medium">
        {pressed ? 'Hold to Activate SOS' : 'Press & Hold for SOS'}
      </p>
    </div>
  );
};

export default SOSButton;
