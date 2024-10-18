export interface Client {
  name: string;
  company: string;
  address: string;
  email: string;
  phoneNumber: string;
  photoURL?: string | null;
  role: "client";
  parentId: string;
}
export interface User {
  name: string;
  company?: string | null;
  address?: string | null;
  photoURL?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  role: "user";
}

export interface RUser extends User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RClient extends Client {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
