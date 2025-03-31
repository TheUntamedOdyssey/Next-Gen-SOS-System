import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Settings from '@/components/Settings';
import { getUser } from '@/utils/storage';
import { getSettings, saveSettings } from '@/utils/storage';
import { Settings as SettingsType, defaultSettings } from '@/types/Settings';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = () => {
      const userData = getUser();
      const settingsData = getSettings();
      
      if (!userData) {
        toast.error("Please complete your profile setup first");
        navigate('/');
        return;
      }

      setSettings(settingsData);
      setLoading(false);
    };

    loadData();
  }, [navigate]);

  const handleUpdateSettings = (updatedSettings: SettingsType) => {
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 mb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Settings</h1>
      </div>
      
      <div className="max-w-md mx-auto">
        <Settings settings={settings} onUpdate={handleUpdateSettings} />
      </div>
    </div>
  );
};

export default SettingsPage;
