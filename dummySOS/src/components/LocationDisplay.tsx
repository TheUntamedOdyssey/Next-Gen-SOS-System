
import React, { useState, useEffect } from 'react';
import { Map, MapPin } from 'lucide-react';

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const LocationDisplay: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<string>('');
  
  // Get current location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      const geoOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setLoading(false);
          
          // For a real app, you would use a reverse geocoding API here
          // This is a placeholder
          setAddress('123 Main St, San Francisco, CA 94105');
        },
        error => {
          setError(`Unable to retrieve your location: ${error.message}`);
          setLoading(false);
        },
        geoOptions
      );
      
      // Set up a watcher for location changes
      const watchId = navigator.geolocation.watchPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          
          // Update address with reverse geocoding in a real app
        },
        error => {
          setError(`Location tracking error: ${error.message}`);
        },
        geoOptions
      );
      
      // Clean up watcher
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  }, []);
  
  if (loading) {
    return (
      <div className="bg-white dark:bg-secondary rounded-xl p-4 shadow-md animate-pulse">
        <div className="flex items-center space-x-2 mb-2">
          <Map className="h-5 w-5 text-muted-foreground" />
          <div className="h-4 bg-muted rounded w-40"></div>
        </div>
        <div className="h-20 bg-muted rounded-lg w-full"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white dark:bg-secondary rounded-xl p-4 shadow-md">
        <div className="flex items-center space-x-2 mb-2 text-destructive">
          <Map className="h-5 w-5" />
          <span className="font-medium">Location Error</span>
        </div>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-secondary rounded-xl p-4 shadow-md animate-fade-in">
      <div className="flex items-center space-x-2 mb-2">
        <MapPin className="h-5 w-5 text-primary" />
        <span className="font-medium">Your Location</span>
      </div>
      
      {location && (
        <>
          <div className="bg-muted rounded-lg p-3 mb-2 overflow-hidden">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-emergency-500 rounded-full"></div>
              <span className="text-sm font-medium">Current Position</span>
            </div>
            <p className="text-sm text-balance truncate">{address}</p>
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Lat: {location.latitude.toFixed(6)}</span>
              <span>Long: {location.longitude.toFixed(6)}</span>
            </div>
            <div className="mt-1">
              <span>Accuracy: {Math.round(location.accuracy)} meters</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDisplay;
