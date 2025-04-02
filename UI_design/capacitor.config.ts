
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4eb6ca0e519640338947d433c8b8e345',
  appName: 'guardian-alert-network',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#e01e1e",
      sound: "beep.wav",
    },
    Geolocation: {
      // Android-specific configuration
      androidPermissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION"
      ],
    },
  },
  server: {
    url: "https://4eb6ca0e-5196-4033-8947-d433c8b8e345.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    manifestTransforms: [
      {
        plugin: "body",
        component: "manifest",
        append: {
          nodes: [
            // Add phone call permission
            {
              tag: "uses-permission",
              attributes: {
                name: "android.permission.CALL_PHONE"
              }
            },
            // Add SMS permission
            {
              tag: "uses-permission",
              attributes: {
                name: "android.permission.SEND_SMS"
              }
            },
            // Add internet permission
            {
              tag: "uses-permission",
              attributes: {
                name: "android.permission.INTERNET"
              }
            },
            // Add biometric authentication permission
            {
              tag: "uses-permission",
              attributes: {
                name: "android.permission.USE_BIOMETRIC"
              }
            },
            // Add wear app meta-data for Wear OS support
            {
              tag: "meta-data",
              attributes: {
                name: "com.google.android.wearable.standalone",
                value: "true"
              }
            }
          ]
        }
      }
    ]
  },
  ios: {
    contentInset: "always",
    infoPlist: {
      // Add biometric authentication permission for iOS
      NSFaceIDUsageDescription: "We use Face ID to authenticate SOS activation.",
      // Add iOS Wear OS companion support
      UIBackgroundModes: ["processing", "remote-notification"],
      WKCompanionAppBundleIdentifier: "app.lovable.4eb6ca0e519640338947d433c8b8e345"
    }
  }
};

export default config;
