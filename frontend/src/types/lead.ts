import { Location } from "./location";
import { IService } from "./service";
import { User } from "./user";

export interface Lead {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  contactMethod: "text" | "email" | "call";
  address: string;
  serviceRequestDate: Date;
  details: string;
  location: Location;
  service: IService;
  partner: User;
  user: User;
  uploadedMedia?: string[];
  status: string;
  note: string;
  createdAt: string;
  conversationId?: string;
  reason?: string;
  offer?: string;
  dateCompleted?: string;
}