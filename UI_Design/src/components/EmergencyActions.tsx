
import React from 'react';
import { Phone, MapPin, Users, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button 
      className="action-button"
      onClick={onClick}
    >
      <div className="action-button-icon">{icon}</div>
      <span className="action-button-label">{label}</span>
    </button>
  );
};

const EmergencyActions: React.FC = () => {
  const handleCallEmergency = () => {
    // In a real app, this would use the Web Telephony API
    window.location.href = 'tel:911';
    toast('Calling emergency services...');
  };
  
  const handleShareLocation = () => {
    // In a real app, this would share the location via SMS or other channel
    if (navigator.share) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        
        navigator.share({
          title: 'My Emergency Location',
          text: 'I need help! Here is my location:',
          url: locationUrl
        }).catch(error => console.error('Error sharing location:', error));
      });
    } else {
      toast('Location sharing initiated');
    }
  };
  
  const handleContactFamily = () => {
    // This would open a contact list in a real app
    toast('Opening emergency contacts...');
  };
  
  const handleEmergencyChat = () => {
    // This would navigate to the chat in a real app
    window.location.href = '/chat';
    toast('Opening emergency chat...');
  };
  
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <ActionButton 
        icon={<Phone className="h-6 w-6" />}
        label="Call Emergency"
        onClick={handleCallEmergency}
      />
      <ActionButton 
        icon={<MapPin className="h-6 w-6" />}
        label="Share Location"
        onClick={handleShareLocation}
      />
      <ActionButton 
        icon={<Users className="h-6 w-6" />}
        label="Contact Family"
        onClick={handleContactFamily}
      />
      <ActionButton 
        icon={<MessageCircle className="h-6 w-6" />}
        label="Emergency Chat"
        onClick={handleEmergencyChat}
      />
    </div>
  );
};

export default EmergencyActions;
