
import { User } from '@/types/User';
import { Settings, defaultSettings } from '@/types/Settings';
import { supabase } from '@/integrations/supabase/client';

// User data storage
export const saveUser = (user: User): void => {
  localStorage.setItem('sos_user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userData = localStorage.getItem('sos_user');
  return userData ? JSON.parse(userData) : null;
};

// Settings storage
export const saveSettings = (settings: Settings): void => {
  localStorage.setItem('sos_settings', JSON.stringify(settings));
};

export const getSettings = (): Settings => {
  const settingsData = localStorage.getItem('sos_settings');
  return settingsData ? JSON.parse(settingsData) : defaultSettings;
};

// SOS history storage
export interface SOSEvent {
  id: string;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: 'triggered' | 'cancelled' | 'completed';
  method: 'manual' | 'watch' | 'voice' | 'ai';
}

export const saveSOSEvent = (event: SOSEvent): void => {
  const history = getSOSHistory();
  history.push(event);
  localStorage.setItem('sos_history', JSON.stringify(history));
  
  // Optionally sync with Supabase if we add that functionality later
  const user = getUser();
  if (user) {
    // We could implement Supabase sync here in the future
  }
};

export const getSOSHistory = (): SOSEvent[] => {
  const historyData = localStorage.getItem('sos_history');
  return historyData ? JSON.parse(historyData) : [];
};

export const clearSOSHistory = (): void => {
  localStorage.removeItem('sos_history');
};

// Supabase helpers - using the existing types
export const syncUserToSupabase = async (user: User): Promise<boolean> => {
  try {
    // Check if user exists first
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('phone', user.phone)
      .maybeSingle();
    
    if (existingUser) {
      // Update existing user
      const { error } = await supabase
        .from('users')
        .update({
          name: user.name,
          age: user.age,
          address: user.address,
          gender: user.gender,
          verified: user.verified
        })
        .eq('phone', user.phone);
      
      if (error) throw error;
    } else {
      // Insert new user
      const { error } = await supabase
        .from('users')
        .insert({
          name: user.name,
          phone: user.phone,
          age: user.age,
          address: user.address,
          gender: user.gender,
          verified: user.verified
        });
      
      if (error) throw error;
    }

    // Sync contacts if they exist
    if (user.contacts && user.contacts.length > 0) {
      // Get the user ID from supabase
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('phone', user.phone)
        .single();
      
      if (userData) {
        // First, delete existing contacts to avoid duplicates
        await supabase
          .from('emergency_contacts')
          .delete()
          .eq('user_id', userData.id);
        
        // Then insert all contacts
        const contactsWithUserId = user.contacts.map(contact => ({
          user_id: userData.id,
          name: contact.name,
          phone: contact.phone,
          relationship: contact.relationship
        }));
        
        const { error } = await supabase
          .from('emergency_contacts')
          .insert(contactsWithUserId);
        
        if (error) throw error;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error syncing with Supabase:', error);
    return false;
  }
};

export const getVerificationCode = async (phone: string): Promise<string | null> => {
  try {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the code in Supabase
    const { error } = await supabase
      .from('verification_codes')
      .insert({
        phone,
        code
      });
    
    if (error) throw error;
    
    return code;
  } catch (error) {
    console.error('Error generating verification code:', error);
    return null;
  }
};

export const verifyCode = async (phone: string, code: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('phone', phone)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();
    
    if (error) throw error;
    
    return !!data;
  } catch (error) {
    console.error('Error verifying code:', error);
    return false;
  }
};
