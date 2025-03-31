
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SOSButton from '@/components/SOSButton';
import UserRegistration from '@/components/UserRegistration';
import { getUser, saveUser, getSettings } from '@/utils/storage';
import { activateSOS } from '@/utils/emergency';
import { User } from '@/types/User';
import { Settings, defaultSettings } from '@/types/Settings';
import { Mic, Fingerprint, Watch, Brain } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data and settings
    const loadData = async () => {
      const userData = getUser();
      const settingsData = getSettings();
      setUser(userData);
      setSettings(settingsData);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleUserRegistration = (userData: User) => {
    setUser(userData);
    saveUser(userData);
  };

  const handleSOSActivate = async () => {
    if (!user) {
      toast.error("Please complete your profile setup first");
      return;
    }

    if (settings.biometricEnabled) {
      // In a real app, this would trigger biometric authentication
      toast.info("Simulating biometric authentication...", {
        duration: 2000,
      });
      
      // Mock successful authentication after a delay
      setTimeout(async () => {
        toast.success("Biometric authentication successful");
        const success = await activateSOS(user);
        if (success) {
          toast.success("SOS activated after biometric authentication");
        }
      }, 2000);
    } else {
      const success = await activateSOS(user);
      if (success) {
        toast.success("SOS activated successfully");
      }
    }
  };

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'voice':
        toast.info("Voice Activation", {
          description: settings.voiceEnabled 
            ? "Voice activation is enabled. In a real app, you could say 'Help' or 'SOS' to activate emergency services." 
            : "Voice activation is disabled. Enable it in Settings."
        });
        break;
      case 'biometric':
        toast.info("Biometric Authentication", {
          description: settings.biometricEnabled 
            ? "Biometric authentication is enabled. This prevents accidental activation." 
            : "Biometric authentication is disabled. Enable it in Settings for added security."
        });
        break;
      case 'watch':
        toast.info("Smartwatch Integration", {
          description: settings.watchEnabled 
            ? "Smartwatch is connected. You can trigger SOS from your watch." 
            : "Smartwatch is not connected. Connect it in Settings."
        });
        break;
      case 'ai':
        toast.info("AI Protection", {
          description: settings.aiEnabled 
            ? "AI Protection is active. It can detect emergency situations automatically." 
            : "AI Protection is inactive. Enable it in Settings for automatic threat detection."
        });
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading Guardian Alert...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Guardian Alert Network</h1>
        <UserRegistration onComplete={handleUserRegistration} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 mb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">SafeConnect</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <div className="max-w-md mx-auto">
        <SOSButton onActivate={handleSOSActivate} user={user} />
        
        <p className="text-center text-sm text-muted-foreground mb-8">
          Press and hold the SOS button for 3 seconds to activate emergency services
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div 
            className="bg-card rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleFeatureClick('voice')}
          >
            <Mic className={`h-8 w-8 mb-2 ${settings.voiceEnabled ? 'text-green-500' : 'text-muted-foreground'}`} />
            <h3 className="font-medium">Voice Activation</h3>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {settings.voiceEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          
          <div 
            className="bg-card rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleFeatureClick('biometric')}
          >
            <Fingerprint className={`h-8 w-8 mb-2 ${settings.biometricEnabled ? 'text-green-500' : 'text-muted-foreground'}`} />
            <h3 className="font-medium">Biometric Auth</h3>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {settings.biometricEnabled ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          
          <div 
            className="bg-card rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleFeatureClick('watch')}
          >
            <Watch className={`h-8 w-8 mb-2 ${settings.watchEnabled ? 'text-green-500' : 'text-muted-foreground'}`} />
            <h3 className="font-medium">Smartwatch</h3>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {settings.watchEnabled ? 'Connected' : 'Not Connected'}
            </p>
          </div>
          
          <div 
            className="bg-card rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleFeatureClick('ai')}
          >
            <Brain className={`h-8 w-8 mb-2 ${settings.aiEnabled ? 'text-green-500' : 'text-muted-foreground'}`} />
            <h3 className="font-medium">AI Protection</h3>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {settings.aiEnabled ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium mb-2">Primary Emergency Contact</h3>
          {user.contacts && user.contacts.length > 0 ? (
            <div>
              <p>{user.contacts[0].name}</p>
              <p className="text-sm text-muted-foreground">{user.contacts[0].phone}</p>
              <p className="text-xs text-muted-foreground">{user.contacts[0].relationship}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No emergency contacts added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
