import { Schema, model, Document } from "mongoose";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

interface Media {
  url: string;
  type: MediaType;
}

interface PostDocument extends Document {
  userId: Schema.Types.ObjectId;
  location?: Schema.Types.ObjectId;
  content?: string; // Text content of the post
  media?: Media[]; // Array of media files (image or video)
  likes: Schema.Types.ObjectId[]; // Users who liked the post
  comments: Schema.Types.ObjectId[]; // References to comments
  reports: Schema.Types.ObjectId[]; // References to reports
}

// Media Schema
const MediaSchema = new Schema<Media>(
  {
    url: { type: String, required: true },
    type: { type: String, enum: Object.values(MediaType), required: true },
  },
  { _id: false }
);

// Post Schema
const PostSchema = new Schema<PostDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
    content: { type: String },
    media: [MediaSchema],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    reports: [{ type: Schema.Types.ObjectId, ref: "Report" }],
  },
  { timestamps: true }
);

const Post = model<PostDocument>("Post", PostSchema);
export default Post;
