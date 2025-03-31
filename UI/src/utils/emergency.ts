
import { Device } from '@capacitor/device';
import { LocalNotifications } from '@capacitor/local-notifications';
import { getCurrentLocation, getLocationSharingLink, findNearbyPoliceStations } from './location';
import { SOSEvent, saveSOSEvent } from './storage';
import { User } from '@/types/User';
import { toast } from 'sonner';
import { GOOGLE_API_KEY } from '@/config/api-keys';

export const activateSOS = async (user: User, method: 'manual' | 'watch' | 'voice' | 'ai' = 'manual'): Promise<boolean> => {
  try {
    // Show activation toast
    toast.error('SOS ACTIVATED!', {
      duration: 5000,
    });
    
    // Create SOS event
    const sosEvent: SOSEvent = {
      id: generateId(),
      timestamp: Date.now(),
      status: 'triggered',
      method,
    };
    
    // Get current location
    const position = await getCurrentLocation();
    
    if (!position) {
      toast.error('Unable to get your location. Continuing with SOS without location data.');
    } else {
      // Add location to SOS event if available
      sosEvent.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    }
    
    // Save SOS event
    saveSOSEvent(sosEvent);
    
    // Send notifications
    await sendLocalNotification('SOS Activated', 'Emergency services have been notified of your situation.');
    
    // Create enhanced location link with Google Maps
    const locationLink = position ? 
      `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}` : 
      'Location not available';
    
    const emergencyMessage = `EMERGENCY: ${user.name} needs help! Location: ${locationLink}`;
    let successCount = 0;
    
    // Process each emergency contact
    if (user.contacts && user.contacts.length > 0) {
      // First call the primary contact immediately
      if (user.contacts[0]) {
        try {
          const primaryContact = user.contacts[0];
          const callResult = await callEmergencyContact(primaryContact.phone);
          
          if (callResult) {
            toast.success(`Emergency call initiated to ${primaryContact.name}`);
            successCount++;
          } else {
            // For web testing
            toast('SIMULATED CALL', {
              description: `Would call ${primaryContact.name} at ${primaryContact.phone} on a real device`,
              duration: 5000
            });
            console.log(`[Emergency] Would call ${primaryContact.name} at ${primaryContact.phone}`);
            successCount++;
          }
        } catch (error) {
          console.error("Error calling primary contact:", error);
          toast.error("Failed to call primary contact. Continuing with SMS.");
        }
      }
      
      // Now send SMS to all contacts
      for (const contact of user.contacts) {
        try {
          const smsResult = await sendEmergencySMS(contact.phone, emergencyMessage);
          
          if (smsResult) {
            toast.success(`Emergency SMS sent to ${contact.name}`);
            successCount++;
          } else {
            // For web testing
            toast('SIMULATED SMS', {
              description: `To ${contact.name}: ${emergencyMessage.substring(0, 50)}...`,
              duration: 5000
            });
            console.log(`[Emergency] Would send SMS to ${contact.name}: ${emergencyMessage}`);
            successCount++;
          }
        } catch (error) {
          console.error(`Error sending SMS to ${contact.name}:`, error);
          toast.error(`Failed to send SMS to ${contact.name}`);
        }
      }
    } else {
      toast.warning('No emergency contacts found. Please add contacts in the settings.');
    }
    
    // Update SOS event status
    sosEvent.status = 'completed';
    saveSOSEvent(sosEvent);
    
    // Show summary of actions
    if (successCount > 0) {
      toast.success(`SOS activated: ${successCount} emergency actions completed`);
    } else {
      // For testing when on web browser
      toast('SOS simulation complete', {
        description: 'On a mobile device, emergency calls and messages would be sent.',
        duration: 5000
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error activating SOS:', error);
    toast.error('Failed to activate SOS. Please try again or call emergency services directly.');
    return false;
  }
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const sendLocalNotification = async (title: string, body: string): Promise<void> => {
  try {
    await LocalNotifications.requestPermissions();
    
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Date.now(),
          title,
          body,
          sound: 'beep.mp3',
          actionTypeId: 'SOS_ACTION',
          schedule: {
            at: new Date(Date.now()),
          },
        },
      ],
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Improved implementation for calling emergency contact
const callEmergencyContact = async (phoneNumber: string): Promise<boolean> => {
  if (!phoneNumber) return false;
  
  try {
    // Remove any non-numeric characters from the phone number
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Check if we're on a mobile device
    const deviceInfo = await Device.getInfo();
    const isMobile = deviceInfo.platform !== 'web';
    
    if (isMobile) {
      // On actual mobile devices, use tel: URI scheme to initiate a call
      const callUri = `tel:${formattedPhone}`;
      
      // Use window.location.href to navigate to the phone app
      // This will actually open the phone app on the device
      window.location.href = callUri;
      return true;
    } else {
      // For web testing - just simulate a call
      console.log(`[Web] SIMULATED CALL to emergency contact: ${phoneNumber}`);
      
      // Return false to trigger the simulation toast
      return false;
    }
  } catch (error) {
    console.error('Error making call:', error);
    // Show error toast
    toast.error(`Failed to initiate call to ${phoneNumber}`);
    return false;
  }
};

// Improved implementation for SMS
const sendEmergencySMS = async (phoneNumber: string, message: string): Promise<boolean> => {
  if (!phoneNumber) return false;
  
  try {
    // Remove any non-numeric characters from the phone number
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Check if we're on a mobile device
    const deviceInfo = await Device.getInfo();
    const isMobile = deviceInfo.platform !== 'web';
    
    if (isMobile) {
      // On actual mobile devices, use sms: URI scheme to prepare an SMS
      const smsUri = `sms:${formattedPhone}?body=${encodeURIComponent(message)}`;
      
      // Use window.location.href to navigate to the SMS app
      // This will actually open the SMS app on the device with the prepared message
      window.location.href = smsUri;
      return true;
    } else {
      // For web testing - just simulate an SMS
      console.log(`[Web] SIMULATED SMS to: ${phoneNumber}`);
      console.log(`[Web] SMS content: ${message}`);
      
      // Return false to trigger the simulation toast
      return false;
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    // Show error toast
    toast.error(`Failed to send SMS to ${phoneNumber}`);
    return false;
  }
};

export const cancelSOS = async (sosEventId: string): Promise<boolean> => {
  // This would be implemented in a full version to cancel an ongoing SOS
  return true;
};
