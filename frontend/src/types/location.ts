export interface Location {
  _id: string;
  partnerId: string;
  locationName: string;
  address: string;
  images: string[];
  description: string;
  categories: string[];
  hoursOfOperation: {
    day: string;
    open: string;
    close: string;
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
}
