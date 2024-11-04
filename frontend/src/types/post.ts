import { Location } from "./location";
import { User } from "./user";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

export interface Media {
  url: string;
  type: MediaType;
}

export interface Post {
  _id: string;
  userId: User;
  location?: Location;
  content?: string;
  media?: Media[];
  likes: string[];
  createdAt: Date;
  comments: string[];
}
