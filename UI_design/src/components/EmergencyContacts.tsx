
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Contact, User } from '@/types/User';

interface EmergencyContactsProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const EmergencyContacts = ({ user, onUpdate }: EmergencyContactsProps) => {
  const [contacts, setContacts] = useState<Contact[]>(user.contacts || []);
  const [editing, setEditing] = useState<number | null>(null);
  const [newContact, setNewContact] = useState<Contact>({
    name: '',
    phone: '',
    relationship: ''
  });

  const handleEditContact = (index: number) => {
    setEditing(index);
    setNewContact(contacts[index]);
  };

  const handleUpdateContact = () => {
    if (!newContact.name || !newContact.phone || !newContact.relationship) {
      toast.error("Please fill in all contact details");
      return;
    }

    if (editing !== null) {
      const updatedContacts = [...contacts];
      updatedContacts[editing] = newContact;
      setContacts(updatedContacts);
      onUpdate({ ...user, contacts: updatedContacts });
      setEditing(null);
      toast.success("Contact updated successfully!");
    } else {
      if (contacts.length >= 5) {
        toast.error("You can only add up to 5 emergency contacts");
        return;
      }
      
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      onUpdate({ ...user, contacts: updatedContacts });
      toast.success("Contact added successfully!");
    }
    
    setNewContact({ name: '', phone: '', relationship: '' });
  };

  const handleRemoveContact = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    onUpdate({ ...user, contacts: updatedContacts });
    toast.success("Contact removed successfully!");
  };

  const handleNewContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleRelationshipChange = (value: string) => {
    setNewContact(prev => ({ ...prev, relationship: value }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setNewContact({ name: '', phone: '', relationship: '' });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>Manage your emergency contacts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.length > 0 ? (
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.phone} - {contact.relationship}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditContact(index)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveContact(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No emergency contacts added yet</p>
          </div>
        )}

        <div className="border rounded-md p-4 space-y-2">
          <h3 className="font-medium">{editing !== null ? 'Edit Contact' : 'Add New Contact'}</h3>
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
          <div className="flex space-x-2 mt-4">
            {editing !== null && (
              <Button variant="outline" onClick={cancelEdit} className="flex-1">
                Cancel
              </Button>
            )}
            <Button onClick={handleUpdateContact} className="flex-1">
              {editing !== null ? 'Update' : 'Add'} Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;
