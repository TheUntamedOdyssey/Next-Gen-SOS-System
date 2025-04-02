
import { Geolocation, Position } from '@capacitor/geolocation';
import { toast } from 'sonner';
import { GOOGLE_API_KEY, GOOGLE_MAPS_API_BASE_URL } from '@/config/api-keys';

export const getCurrentLocation = async (): Promise<Position | null> => {
  try {
    // Request permissions
    const permissions = await Geolocation.checkPermissions();
    
    if (permissions.location !== 'granted') {
      const request = await Geolocation.requestPermissions();
      if (request.location !== 'granted') {
        toast.error('Location permission is required for emergency services');
        return null;
      }
    }
    
    // Get current position with high accuracy and a reasonable timeout
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });
    
    return position;
  } catch (error) {
    console.error('Error getting location:', error);
    toast.error('Failed to get your location. Please enable location services.');
    return null;
  }
};

export const getLocationSharingLink = (position: Position): string => {
  if (!position || !position.coords) return '';
  
  const { latitude, longitude } = position.coords;
  return `https://maps.google.com/?q=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
};

export const findNearbyPoliceStations = async (position: Position): Promise<string[]> => {
  if (!position || !position.coords) {
    console.error('No position data available to find nearby police stations');
    return ['911', '112']; // Default emergency numbers
  }
  
  try {
    const { latitude, longitude } = position.coords;
    const url = `${GOOGLE_MAPS_API_BASE_URL}/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=police&key=${GOOGLE_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      // Extract phone numbers if available, otherwise return default emergency numbers
      const phoneNumbers = data.results.map(place => place.formatted_phone_number || null)
        .filter(number => number !== null);
      
      return phoneNumbers.length > 0 ? phoneNumbers : ['911', '112'];
    } else {
      console.log('No police stations found or API returned an error:', data.status);
      return ['911', '112']; // Default emergency numbers
    }
  } catch (error) {
    console.error('Error finding nearby police stations:', error);
    return ['911', '112']; // Default emergency numbers on error
  }
};
