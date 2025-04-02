
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '@/types/User';

interface SOSButtonProps {
  onActivate: () => void;
  user: User | null;
}

const SOSButton = ({ onActivate, user }: SOSButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const HOLD_DURATION = 3000; // 3 seconds hold to activate
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  const handleTouchStart = () => {
    if (!user) {
      toast.error("Please complete your profile setup first");
      return;
    }
    
    setIsPressed(true);
    pressTimer.current = setTimeout(() => {
      setIsActivating(true);
      // Call onActivate after showing the activation state
      onActivate();
      
      // Reset button state after a delay
      setTimeout(() => {
        setIsPressed(false);
        setProgress(0);
        setIsActivating(false);
      }, 1000);
    }, HOLD_DURATION);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (HOLD_DURATION / 100));
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);
  };

  const handleTouchEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    
    if (!isActivating) {
      setIsPressed(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    // Clean up timers when component unmounts
    return () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="sos-button-outer">
        <button
          className={`sos-button ${isPressed ? 'active' : ''} ${isActivating ? 'triggering' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          disabled={isActivating}
          aria-label="Emergency SOS Button"
        >
          {isPressed && <div className="sos-ripple"></div>}
          <span>{isActivating ? 'SENDING...' : 'SOS'}</span>
          {isPressed && (
            <div 
              className="sos-button-progress active" 
              style={{
                background: `conic-gradient(rgba(255, 255, 255, 0.8) ${progress}%, transparent ${progress}%)`
              }}
            />
          )}
        </button>
      </div>

      <style>
        {`
        .sos-button {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background-color: #ef4444;
          color: white;
          font-size: 24px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
          animation: pulse 2s infinite;
          -webkit-tap-highlight-color: transparent;
        }
        
        .sos-button.active {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
          animation: none;
        }
        
        .sos-button.triggering {
          background-color: #dc2626;
          animation: trigger 0.5s infinite alternate;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 0, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
          }
        }
        
        @keyframes trigger {
          0% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .sos-ripple {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 1s ease-out infinite;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        .sos-button-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          clip-path: circle(50% at center);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .sos-button-progress.active {
          opacity: 1;
        }
        `}
      </style>
    </div>
  );
};

export default SOSButton;
