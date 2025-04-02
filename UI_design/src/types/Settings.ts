
export interface Settings {
  watchEnabled: boolean;
  watchGestureEnabled: boolean;
  aiEnabled: boolean;
  autoSosEnabled: boolean;
  voiceEnabled: boolean;
  offlineVoiceEnabled: boolean;
  biometricEnabled: boolean;
  emergencyOverrideEnabled: boolean;
  wearOSEnabled: boolean;
  googleMapsEnabled: boolean;
  geminiEnabled: boolean;
}

export const defaultSettings: Settings = {
  watchEnabled: false,
  watchGestureEnabled: false,
  aiEnabled: false,
  autoSosEnabled: false,
  voiceEnabled: false,
  offlineVoiceEnabled: false,
  biometricEnabled: true,
  emergencyOverrideEnabled: false,
  wearOSEnabled: false,
  googleMapsEnabled: true,
  geminiEnabled: false
};
