import { Schema, model, Document } from "mongoose";

// Define the LocationDocument Schema
interface LocationDocument extends Document {
  partnerId: Schema.Types.ObjectId; // Reference to the Partner
  locationName: string;
  images: string[];
  address: string;
  description: string;
  categories: string[];
  hoursOfOperation: {
    day: string;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  }[];
  // menu: {
  //   category: string;
  //   items: string[];
  // }[];
  menu: string[];
  poll?: {
    question: string;
    options: string[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Mongoose Schema Definition
const locationSchema = new Schema<LocationDocument>(
  {
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      // required: true,
    },
    hoursOfOperation: [
      {
        day: { type: String, required: true },
        isOpen: { type: Boolean, required: true },
        closeTime: { type: String, required: true },
        openTime: { type: String, required: true },
      },
    ],
    // menu: [
    //   {
    //     category: { type: String, required: true },
    //     items: [{ type: String, required: true }],
    //   },
    // ],
    menu: [{ type: String }],
    poll: {
      question: { type: String },
      options: [{ type: String }],
    },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  { timestamps: true }
);

// Create and export the model
const Location = model<LocationDocument>("Location", locationSchema);

export default Location;
