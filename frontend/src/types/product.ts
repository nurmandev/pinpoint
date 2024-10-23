import { Location } from "./location";
import { User } from "./user";

interface ProductOption {
  optionCategory: string;
  optionName: string;
}

interface IReivew {
  _id: string;
  userId: string;
  content: string;
  rating: number;
}
export interface IProduct {
  priceType: string;
  _id: string;
  user: User;
  name: string;
  description: string;
  price: number;
  images: string[];
  location: Location[];
  mainCategory: string[];
  category: string[];
  subCategory?: string[];
  options?: ProductOption[];
  reviews: IReivew[];
  rating: number;
  availableOnline: boolean;
  productUrl?: string;
  ships: boolean;
  pickupAvailable: boolean;
  inShopOnly: boolean;
  createdAt: Date;
}
