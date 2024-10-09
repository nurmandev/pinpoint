import { Schema, Document, model } from "mongoose";

interface IStory extends Document {
  user: Schema.Types.ObjectId;
  location?: Schema.Types.ObjectId;
  media: string;
  mediaType: "image" | "video";
  caption?: string;
  views: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: Date;
}

// Define the schema
const storySchema = new Schema<IStory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  media: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  caption: {
    type: String,
    maxlength: 300,
  },
  views: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isArchived: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "24h",
  },
});

// Create the model
const Story = model<IStory>("Story", storySchema);

export default Story;
