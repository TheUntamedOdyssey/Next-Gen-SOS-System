
import React from 'react';
import Layout from '../components/Layout';
import { User, Phone, MapPin, Bell, Shield, Settings } from 'lucide-react';
import { toast } from 'sonner';

const ProfileSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-medium mb-3">{title}</h2>
    <div className="bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-md">
      {children}
    </div>
  </div>
);

const ProfileItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
}> = ({ icon, label, value, onClick }) => (
  <div 
    className="flex items-center p-4 border-b last:border-0 hover:bg-muted/50 transition-colors"
    onClick={onClick}
    role={onClick ? "button" : undefined}
  >
    <div className="mr-3 text-primary">
      {icon}
    </div>
    <div className="flex-1">
      <div className="font-medium">{label}</div>
      {value && <div className="text-sm text-muted-foreground">{value}</div>}
    </div>
    {onClick && (
      <div className="text-sm text-muted-foreground">
        <span className="mr-1">Edit</span>
        <span>›</span>
      </div>
    )}
  </div>
);

const Profile: React.FC = () => {
  const handleEditProfile = () => {
    toast('Profile edit not implemented in this demo');
  };
  
  const handleAddContact = () => {
    toast('Add emergency contact not implemented in this demo');
  };
  
  const handleToggleSetting = () => {
    toast('Setting updated');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-3">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-1">John Doe</h1>
          <p className="text-muted-foreground">SOS ID: #12345678</p>
        </div>
        
        <ProfileSection title="Personal Information">
          <ProfileItem 
            icon={<User className="h-5 w-5" />}
            label="Full Name"
            value="John Doe"
            onClick={handleEditProfile}
          />
          <ProfileItem 
            icon={<Phone className="h-5 w-5" />}
            label="Phone Number"
            value="+1 (555) 123-4567"
            onClick={handleEditProfile}
          />
          <ProfileItem 
            icon={<MapPin className="h-5 w-5" />}
            label="Home Address"
            value="123 Main St, San Francisco, CA 94105"
            onClick={handleEditProfile}
          />
        </ProfileSection>
        
        <ProfileSection title="Emergency Contacts">
          <ProfileItem 
            icon={<User className="h-5 w-5" />}
            label="Jane Doe (Wife)"
            value="+1 (555) 987-6543"
            onClick={handleEditProfile}
          />
          <ProfileItem 
            icon={<User className="h-5 w-5" />}
            label="Add Emergency Contact"
            onClick={handleAddContact}
          />
        </ProfileSection>
        
        <ProfileSection title="Settings">
          <ProfileItem 
            icon={<Bell className="h-5 w-5" />}
            label="Notifications"
            value="Enabled"
            onClick={handleToggleSetting}
          />
          <ProfileItem 
            icon={<Shield className="h-5 w-5" />}
            label="Privacy Settings"
            onClick={handleToggleSetting}
          />
          <ProfileItem 
            icon={<Settings className="h-5 w-5" />}
            label="App Settings"
            onClick={handleToggleSetting}
          />
        </ProfileSection>
      </div>
    </Layout>
  );
};

export default Profile;
