
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User, Contact } from '@/types/User';

interface UserRegistrationProps {
  onComplete: (user: User) => void;
}

const UserRegistration = ({ onComplete }: UserRegistrationProps) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<User>({
    name: '',
    age: '',
    address: '',
    phone: '',
    gender: '',
    verified: false,
    contacts: []
  });
  const [otp, setOtp] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Contact>({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setUserData(prev => ({ ...prev, gender: value }));
  };

  const handleNewContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleRelationshipChange = (value: string) => {
    setNewContact(prev => ({ ...prev, relationship: value }));
  };

  const sendVerificationCode = () => {
    // In a real app, this would be an API call to send OTP
    if (!userData.phone || userData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    // For demo purposes, generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    toast.success(`Verification code sent: ${code}`);
  };

  const verifyOtp = () => {
    if (otp === verificationCode) {
      setUserData(prev => ({ ...prev, verified: true }));
      toast.success("Phone number verified successfully!");
      setStep(3);
    } else {
      toast.error("Invalid verification code. Please try again.");
    }
  };

  const addContact = () => {
    if (!newContact.name || !newContact.phone || !newContact.relationship) {
      toast.error("Please fill in all contact details");
      return;
    }
    
    if (contacts.length >= 5) {
      toast.error("You can only add up to 5 emergency contacts");
      return;
    }
    
    setContacts(prev => [...prev, newContact]);
    setNewContact({ name: '', phone: '', relationship: '' });
    toast.success("Contact added successfully!");
  };

  const completeRegistration = () => {
    if (contacts.length === 0) {
      toast.error("Please add at least one emergency contact");
      return;
    }
    
    const completeUserData = { ...userData, contacts };
    onComplete(completeUserData);
    toast.success("Profile setup completed!");
  };

  const renderStepOne = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={userData.name} onChange={handleUserDataChange} placeholder="Enter your full name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" value={userData.age} onChange={handleUserDataChange} placeholder="Enter your age" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={userData.address} onChange={handleUserDataChange} placeholder="Enter your address" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" value={userData.phone} onChange={handleUserDataChange} placeholder="Enter your phone number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select onValueChange={handleGenderChange} value={userData.gender}>
          <SelectTrigger>
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  );

  const renderStepTwo = () => (
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">
        We need to verify your phone number. Please enter the verification code sent to {userData.phone}.
      </p>
      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <div className="flex space-x-2">
          <Input 
            id="otp" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            placeholder="Enter verification code" 
          />
          <Button onClick={sendVerificationCode} variant="outline">
            Send Code
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Didn't receive a code? <Button variant="link" onClick={sendVerificationCode} className="p-0 h-auto">Resend Code</Button>
      </p>
    </CardContent>
  );

  const renderStepThree = () => (
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Add up to 5 emergency contacts who will receive alerts when you activate SOS.
      </p>

      {contacts.length > 0 && (
        <div className="border rounded-md p-4 space-y-2">
          <h3 className="font-medium">Your Emergency Contacts</h3>
          {contacts.map((contact, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-accent rounded-md">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.phone} - {contact.relationship}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setContacts(contacts.filter((_, i) => i !== index))}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="border rounded-md p-4 space-y-2">
        <h3 className="font-medium">Add New Contact</h3>
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input id="contactName" name="name" value={newContact.name} onChange={handleNewContactChange} placeholder="Contact name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input id="contactPhone" name="phone" value={newContact.phone} onChange={handleNewContactChange} placeholder="Contact phone number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="relationship">Relationship</Label>
          <Select onValueChange={handleRelationshipChange} value={newContact.relationship}>
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="colleague">Colleague</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={addContact} className="w-full mt-2">Add Contact</Button>
      </div>
    </CardContent>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Setup</CardTitle>
        <CardDescription>
          {step === 1 && "Let's set up your profile for emergency situations"}
          {step === 2 && "Verify your phone number"}
          {step === 3 && "Add emergency contacts"}
        </CardDescription>
      </CardHeader>
      
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}
      
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        
        {step === 1 && (
          <Button 
            onClick={() => {
              if (!userData.name || !userData.age || !userData.address || !userData.phone || !userData.gender) {
                toast.error("Please fill in all fields");
                return;
              }
              setStep(2);
            }}
          >
            Next
          </Button>
        )}
        
        {step === 2 && (
          <Button onClick={verifyOtp}>
            Verify
          </Button>
        )}
        
        {step === 3 && (
          <Button onClick={completeRegistration}>
            Complete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserRegistration;
