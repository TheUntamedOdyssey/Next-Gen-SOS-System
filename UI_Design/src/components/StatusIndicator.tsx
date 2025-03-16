
import React from 'react';

interface StatusIndicatorProps {
  status: 'standby' | 'sending' | 'sent' | 'responding' | 'arrived';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const statusConfig = {
    standby: {
      label: 'Ready',
      color: 'bg-blue-500',
      pulseColor: 'bg-blue-400'
    },
    sending: {
      label: 'Sending SOS...',
      color: 'bg-yellow-500',
      pulseColor: 'bg-yellow-400'
    },
    sent: {
      label: 'SOS Sent',
      color: 'bg-emergency-500',
      pulseColor: 'bg-emergency-400'
    },
    responding: {
      label: 'Help Responding',
      color: 'bg-emergency-600',
      pulseColor: 'bg-emergency-500'
    },
    arrived: {
      label: 'Help Arrived',
      color: 'bg-green-500',
      pulseColor: 'bg-green-400'
    }
  };
  
  const { label, color, pulseColor } = statusConfig[status];
  
  return (
    <div className="flex items-center space-x-2 p-3 rounded-lg bg-white dark:bg-secondary shadow-md animate-fade-in">
      <div className="relative h-3 w-3">
        <div className={`absolute inset-0 ${color} rounded-full animate-pulse`}></div>
        <div className={`absolute inset-0 ${pulseColor} rounded-full animate-ping opacity-75`}></div>
      </div>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default StatusIndicator;
