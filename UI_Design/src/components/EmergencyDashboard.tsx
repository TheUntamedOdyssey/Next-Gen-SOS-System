
import React, { useState } from 'react';
import SOSButton from './SOSButton';
import StatusIndicator from './StatusIndicator';
import EmergencyActions from './EmergencyActions';
import LocationDisplay from './LocationDisplay';
import { toast } from 'sonner';

const EmergencyDashboard: React.FC = () => {
  const [status, setStatus] = useState<'standby' | 'sending' | 'sent' | 'responding' | 'arrived'>('standby');
  
  const handleSOSActivate = () => {
    // Update status with a sequence
    setStatus('sending');
    
    setTimeout(() => {
      setStatus('sent');
      
      // Simulate response from emergency services
      setTimeout(() => {
        setStatus('responding');
        toast.success('Help is on the way', {
          description: 'Emergency responders have been dispatched to your location.',
        });
        
        // Simulate arrival
        setTimeout(() => {
          setStatus('arrived');
          toast.success('Help has arrived', {
            description: 'Emergency responders have reached your location.',
          });
        }, 10000);
      }, 5000);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">Emergency SOS</h1>
        <p className="text-muted-foreground">Press & hold the button for help</p>
      </div>
      
      <div className="flex justify-center mb-6">
        <SOSButton onActivate={handleSOSActivate} />
      </div>
      
      <div className="mb-6">
        <StatusIndicator status={status} />
      </div>
      
      <div className="space-y-4">
        <LocationDisplay />
        
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
          <EmergencyActions />
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;
