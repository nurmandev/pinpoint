export enum UserRole {
  CUSTOMER = "customer",
  PARTNER = "partner",
  ADMIN = "admin",
}

// Base fields for both types of users
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  city: string;
  state: string;
  avatarUrl?: string;
  isVerified: boolean; // Field to check if the user is verified
  followingStores: string; // Stores the customer follows
  likedProducts: string; // Liked products/services
  reportedStores: string; // Reported stores
  reportedProducts: string; // Reported products/services
  businessLegalName: string;
  businessAddress: string;
  suite: string;
  zipCode: string;
  businessType: string; // "products", "services", "products & services"
  einSsn: string;
  products: string;
  services: string;
  locations: string;
  createedAt: Date;
  follower: User[];
  following: string[];
  notification: any;
}
