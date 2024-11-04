import { Location } from "./location";
import { Media } from "./post";

export interface IStoryItem {
  _id: string;
  location?: Location;
  media?: Media;
  caption?: string;
  views: string[];
  likes: string[];
  createdAt: Date;
}

export interface IStory {
  _id: string;
  stories: IStoryItem[]; // Not an array
  user: {
    username: string;
    avatarUrl: string;
  };
}
