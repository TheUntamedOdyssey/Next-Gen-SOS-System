
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmergencyContacts from '@/components/EmergencyContacts';
import { getUser, saveUser } from '@/utils/storage';
import { User } from '@/types/User';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const userData = getUser();
      setUser(userData);
      setLoading(false);

      if (!userData) {
        toast.error("Please complete your profile setup first");
        navigate('/');
      }
    };

    loadUser();
  }, [navigate]);

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    saveUser(updatedUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading contacts...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <p>Please complete your profile setup first</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 mb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Emergency Contacts</h1>
      </div>
      
      <div className="max-w-md mx-auto">
        <EmergencyContacts user={user} onUpdate={handleUpdateUser} />
      </div>
    </div>
  );
};

export default ContactsPage;
