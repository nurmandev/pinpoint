export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

export enum PostType {
  POST = "post",
  STORY = "story",
}

export interface Media {
  url: string;
  type: MediaType;
}

export interface IContent {
  userId: string;
  location?: string;
  likes: string[];
  createdAt: Date;
}
