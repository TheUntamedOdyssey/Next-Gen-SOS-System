
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Settings as SettingsType } from '@/types/Settings';
import { MapPin, Bot } from 'lucide-react';

interface SettingsProps {
  settings: SettingsType;
  onUpdate: (settings: SettingsType) => void;
}

const Settings = ({ settings, onUpdate }: SettingsProps) => {
  const [localSettings, setLocalSettings] = useState<SettingsType>(settings);

  const handleToggle = (key: keyof SettingsType) => {
    const updatedSettings = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(updatedSettings);
    onUpdate(updatedSettings);
    toast.success("Settings updated successfully!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Customize your emergency SOS preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Smartwatch Integration</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="watchEnabled">Enable Smartwatch</Label>
              <p className="text-sm text-muted-foreground">
                Connect your smartwatch for SOS activation
              </p>
            </div>
            <Switch 
              id="watchEnabled" 
              checked={localSettings.watchEnabled}
              onCheckedChange={() => handleToggle('watchEnabled')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="watchGestureEnabled">Gesture Activation</Label>
              <p className="text-sm text-muted-foreground">
                Activate SOS with a triple-tap gesture on your watch
              </p>
            </div>
            <Switch 
              id="watchGestureEnabled" 
              checked={localSettings.watchGestureEnabled}
              onCheckedChange={() => handleToggle('watchGestureEnabled')}
              disabled={!localSettings.watchEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="wearOSEnabled">Wear OS Support</Label>
              <p className="text-sm text-muted-foreground">
                Enable dedicated Wear OS experience
              </p>
            </div>
            <Switch 
              id="wearOSEnabled" 
              checked={localSettings.wearOSEnabled}
              onCheckedChange={() => handleToggle('wearOSEnabled')}
              disabled={!localSettings.watchEnabled}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Google Services</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="googleMapsEnabled">Google Maps</Label>
              <p className="text-sm text-muted-foreground">
                Use Google Maps for location sharing
              </p>
            </div>
            <Switch 
              id="googleMapsEnabled" 
              checked={localSettings.googleMapsEnabled}
              onCheckedChange={() => handleToggle('googleMapsEnabled')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="geminiEnabled">Gemini AI</Label>
              <p className="text-sm text-muted-foreground">
                Enable Gemini AI for advanced threat detection
              </p>
            </div>
            <Switch 
              id="geminiEnabled" 
              checked={localSettings.geminiEnabled}
              onCheckedChange={() => handleToggle('geminiEnabled')}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">AI Threat Detection</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="aiEnabled">Enable AI Detection</Label>
              <p className="text-sm text-muted-foreground">
                Detect potential threats using AI analysis
              </p>
            </div>
            <Switch 
              id="aiEnabled" 
              checked={localSettings.aiEnabled}
              onCheckedChange={() => handleToggle('aiEnabled')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoSosEnabled">Auto-SOS Mode</Label>
              <p className="text-sm text-muted-foreground">
                Automatically trigger SOS in high-risk situations
              </p>
            </div>
            <Switch 
              id="autoSosEnabled" 
              checked={localSettings.autoSosEnabled}
              onCheckedChange={() => handleToggle('autoSosEnabled')}
              disabled={!localSettings.aiEnabled}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Voice Activation</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="voiceEnabled">Enable Voice Commands</Label>
              <p className="text-sm text-muted-foreground">
                Activate SOS using voice commands
              </p>
            </div>
            <Switch 
              id="voiceEnabled" 
              checked={localSettings.voiceEnabled}
              onCheckedChange={() => handleToggle('voiceEnabled')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="offlineVoiceEnabled">Offline Voice Recognition</Label>
              <p className="text-sm text-muted-foreground">
                Voice commands work without internet connection
              </p>
            </div>
            <Switch 
              id="offlineVoiceEnabled" 
              checked={localSettings.offlineVoiceEnabled}
              onCheckedChange={() => handleToggle('offlineVoiceEnabled')}
              disabled={!localSettings.voiceEnabled}
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Biometric Authentication</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="biometricEnabled">Require Biometric Auth</Label>
              <p className="text-sm text-muted-foreground">
                Prevent false alarms with fingerprint or face authentication
              </p>
            </div>
            <Switch 
              id="biometricEnabled" 
              checked={localSettings.biometricEnabled}
              onCheckedChange={() => handleToggle('biometricEnabled')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emergencyOverrideEnabled">Emergency Override</Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to bypass authentication in distress situations
              </p>
            </div>
            <Switch 
              id="emergencyOverrideEnabled" 
              checked={localSettings.emergencyOverrideEnabled}
              onCheckedChange={() => handleToggle('emergencyOverrideEnabled')}
              disabled={!localSettings.biometricEnabled || !localSettings.aiEnabled}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Settings;
