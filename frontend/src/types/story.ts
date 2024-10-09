import { Location } from "./location";

export interface IStory {
  _id: string; //user id
  stories: {
    _id: string;
    location?: Location;
    media: string;
    mediaType: "image" | "video";
    caption?: string;
    views: string[];
    likes: string[];
    createdAt: Date;
  }[];
  user: {
    username: string;
    avatarUrl: string;
  };
}
