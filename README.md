# Project : Next-Gen-SOS-System || Hackathon : SBH-Senior-2025  
# SOS Alert App - SBH Smart Bengal Hackathon Submission

## Title of the Problem:
Enhancing Personal Safety & Accident Response Through a Smart SOS Alert System

## Introduction:
- The SOS Alert App is designed to provide users with a quick and efficient emergency alert system.
- It integrates multi-modal SOS activation, *live location tracking,* offline emergency communication, and *accident detection with automatic alerts to emergency services.*

## Major Societal Benefit / Target Community:
- Women’s Safety: Quick distress alerts and live tracking.
- Elderly Individuals: Emergency assistance for medical situations.
- Travelers & Solo Commuters: Safety in unknown routes.
- People with Disabilities: Voice-activated SOS features.
- *Accident Victims: Automatic crash detection and alerts to the nearest hospital and police station.*

## Other Application Areas:
- Disaster response – Alerting emergency contacts during natural calamities.
- Workplace safety – Ensuring employees’ safety in hazardous environments.
- Student safety – Protection during late-night travel.
- *Road Safety – Accident detection and automated emergency response.*

## Market / Literature Survey:
- Existing apps like bSafe, Noonlight, and Life360 lack offline support, P2P networking, Wear OS integration, and accident detection.
- Studies show 70% of women feel unsafe traveling alone at night, emphasizing the need for *a reliable emergency alert system.*
- Increasing road accidents necessitate an *automated alert system* for rapid emergency response.
- Growing demand for smart security and accident detection apps in India’s tech landscape.

## Technology Features:
- Cross-platform (Flutter/Dart) – Works on Android and iOS.
- Firebase Authentication – Secure user registration.
- Emergency Contact Setup – Up to five emergency contacts.
- SOS Activation – Via press-hold button, voice command, and Wear OS trigger.
- Live Location Sharing – Continuous GPS tracking.
- Offline Mode – SMS-based alert system.
- P2P Networking – Uses Bluetooth/Wi-Fi Direct.
- Wear OS Support – Smartwatch integration.
- Data Security – Implements AES encryption.
- *Accident Detection – Uses accelerometer and GPS to detect crashes.*
- *GSM-Based Emergency Messaging – Sends accident alerts to the nearest hospital and police station.*

## Hardware Components:
- GPS Module (Ublox NEO-6M) – Ensures accurate location tracking.
- Bluetooth/Wi-Fi Module (ESP32) – Facilitates offline peer-to-peer (P2P) networking.
- RFID/NFC Module – Allows quick SOS activation using RFID/NFC tags.
- Microcontroller (Arduino Nano/Raspberry Pi Pico) – Supports external hardware interactions.
- Emergency Button (Tactile Switch) – Dedicated panic button for instant alerts.
- Battery Backup (Lithium-ion with BMS) – Ensures functionality in case of power failure.
- Vibration Motor – Provides haptic feedback for silent alerts.
- *Accelerometer Sensor – Detects sudden impact and triggers accident alerts.*
- *GSM Module (SIM800L) – Sends emergency messages to hospitals and police.*

## Product Price & Business Model:
- Freemium Model: Basic SOS features are free; premium features like *Wear OS sync, cloud backup, and priority emergency services* are monetized.
- Enterprise Partnerships: Security firms, police, and NGOs.
- Subscription-based Services: Advanced tracking and emergency support.

## Novelty & Comparative Study:
| Feature | Existing Apps | SOS Alert App |
|---------|--------------|--------------|
| Offline SMS Alerts | ❌ No | ✅ Yes |
| P2P Networking | ❌ No | ✅ Yes |
| Wear OS Support | ❌ No | ✅ Yes |
| Multi-modal SOS Activation | ⚠ Limited | ✅ Yes |
| AES Encrypted Data Storage | ❌ No | ✅ Yes |
| Hardware Integration | ❌ No | ✅ Yes |
| *Accident Detection & Alerts* | ❌ No | ✅ Yes |
| *GSM-Based Emergency Messaging* | ❌ No | ✅ Yes |

## Architecture / Block Diagram:
- User → SOS App → Emergency Contact(s), Police, Nearby Users
- Backend Services (Firebase, API Calls) → Location & Alert Management
- Wear OS Companion → SOS Sync & Alerts
- Hardware Sensors → Triggers Emergency Alerts
- *Accident Detection Module → Sends GSM Alert to Hospital & Police*

## Data Flow Diagram:
1. User initiates SOS (button press, voice, RFID tag, or smartwatch) OR accident is detected.
2. App requests location & contact permissions.
3. App sends alerts via SMS/P2P networking.
4. Emergency contacts receive live location updates.
5. *In case of an accident, GSM module sends an automatic emergency alert with coordinates to the nearest hospital and police station.*
6. SOS/accident status is displayed on mobile and smartwatch.

## Signal Flow Diagram:
1. User presses SOS button OR accident is detected → Signal sent to Firebase & Contacts.
2. Location services activated → GPS coordinates sent to backend.
3. Alert sent via SMS/P2P Networking.
4. *In case of an accident, GSM module triggers an emergency message to hospitals and police.*
5. Live updates shared periodically until SOS is deactivated.

## Component List:
- Smartphone (Android/iOS) – Core device for SOS alerts.
- Wear OS Smartwatch – Secondary trigger.
- GPS Module – Location tracking.
- Bluetooth/Wi-Fi Module – Offline alerts.
- RFID/NFC Module – Quick activation.
- Microcontroller – Manages hardware interactions.
- Tactile Emergency Button – Physical panic button.
- Battery Backup – Uninterrupted functionality.
- Vibration Motor – Silent feedback.
- *Accelerometer Sensor – Detects accidents.*
- *GSM Module – Sends alerts to emergency services.*

## Software Used:
- Flutter (Dart) – Cross-platform development.
- Firebase – Backend authentication & Firestore.
- Google Maps API – Real-time location tracking.
- Android SMS API (Java) – Offline SMS functionality.
- Wear OS SDK – Smartwatch integration.
- ML Kit (Voice Recognition) – Voice-activated SOS.
- AES Encryption – Secure data storage.
- *Machine Learning Model – Identifies accident patterns using sensor data.*
- *GSM Communication – Sends automated emergency messages.*

## Open Source:
- Core functionalities will be open-source on GitHub.
- Encouraging community contributions.
- API documentation for third-party integrations.

## Conclusion:
The SOS Alert App is a comprehensive, real-time emergency response system ensuring quick, secure, and efficient distress alerts. With *multi-modal SOS activation, accident detection, GSM-based emergency messaging, offline communication, Wear OS support, and integrated hardware components,* the app enhances safety for diverse user groups. The *open-source nature* allows for continuous improvement, collaboration, and scalability.
