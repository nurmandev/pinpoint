import { IReview } from "./service";
import { User } from "./user";

export interface Location {
  _id: string;
  partnerId: User;
  locationName: string;
  address: string;
  images: string[];
  description: string;
  categories: string[];
  hoursOfOperation: {
    day: string;
    openTime: string;
    closeTime: string;
    isOpen: boolean;
  }[];
  menu: {
    category: string;
    items: string[];
  }[];
  poll?: {
    question: string;
    options: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  rating: number;
  reviews: IReview[];
  followers: string[];
  likes: string[];
}
