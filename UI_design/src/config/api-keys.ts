
// Store public API keys here
// Note: These are client-side keys that are meant to be public
// For sensitive keys, use server-side authentication

export const GOOGLE_API_KEY = 'AIzaSyAg7HRHf2Ok0jrjte34VT8D-Ak7aGeDoSQ';

// API service endpoints
export const GOOGLE_MAPS_API_BASE_URL = 'https://maps.googleapis.com/maps/api';
export const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

// Define which Google APIs we're using in the app
export const GOOGLE_APIS = {
  MAPS: true,
  GEMINI: true,
  GEOLOCATION: true,
  GEOCODING: true
};
