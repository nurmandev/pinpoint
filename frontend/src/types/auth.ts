import { UserRole } from "./user";

// Common fields for all users
interface CommonRegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  city: string;
  state: string;
}

// Specific fields for Customer
interface CustomerRegistrationData extends CommonRegistrationData {
  role: UserRole.CUSTOMER;
}

// Specific fields for Partner
interface PartnerRegistrationData extends CommonRegistrationData {
  role: UserRole.PARTNER;
  businessLegalName: string;
  businessAddress: string;
  suite: string;
  zipCode: string;
  businessType: string; // "products", "services", "products & services"
  einSsn: string;
}

// Union type for registration data
export type RegistrationData =
  | CustomerRegistrationData
  | PartnerRegistrationData;
