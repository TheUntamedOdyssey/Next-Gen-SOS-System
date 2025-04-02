
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4 mb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">About SafeConnect</h1>
      </div>
      
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>SafeConnect</CardTitle>
            <CardDescription>Advanced emergency response system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SafeConnect is a next-generation emergency response system designed to 
              provide immediate assistance in crisis situations.
            </p>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Key Features</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>One-touch SOS activation with location sharing</li>
                <li>Automatic emergency contact notification</li>
                <li>Smartwatch integration for hands-free activation</li>
                <li>AI-powered threat detection and auto-response</li>
                <li>Voice-activated SOS commands</li>
                <li>Biometric authentication to prevent false alarms</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">How It Works</h3>
              <p className="text-sm text-muted-foreground">
                When you activate the SOS function, SafeConnect immediately:
              </p>
              <ol className="space-y-2 list-decimal pl-5 text-sm">
                <li>Places a call to your primary emergency contact</li>
                <li>Sends SMS alerts with your live location to your emergency contacts</li>
                <li>Notifies nearby emergency services of your situation</li>
                <li>Continues to update your location until help arrives</li>
              </ol>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground">
                Your safety is our priority, but so is your privacy. SafeConnect:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-sm">
                <li>Stores all personal data locally on your device</li>
                <li>Only shares your location during active emergencies</li>
                <li>Uses biometric authentication to prevent unauthorized access</li>
                <li>Never sells or shares your data with third parties</li>
              </ul>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">
                SafeConnect v1.0.0
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} SafeConnect
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
