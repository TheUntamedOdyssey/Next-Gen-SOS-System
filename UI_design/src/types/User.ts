
export interface Contact {
  name: string;
  phone: string;
  relationship: string;
}

export interface User {
  name: string;
  age: string;
  address: string;
  phone: string;
  gender: string;
  verified: boolean;
  contacts: Contact[];
}
