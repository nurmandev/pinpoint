import { User } from "./user";

export interface Comment {
  _id: string;
  postId: string;
  userId: User;
  content: string;
  likes: string[];
  createdAt: Date;
  replies: Reply[];
}

export interface Reply {
  _id: string;
  postId: string;
  userId: User;
  content: string;
  parentCommentId: string;
  likes: string[];
  createdAt: Date;
}
