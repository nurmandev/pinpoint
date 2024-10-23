import mongoose, { Schema, Document, Model } from "mongoose";

interface ServiceOption {
  optionCategory: string;
  optionName: string;
}

export interface IReview {
  userId: Schema.Types.ObjectId;
  content: string;
  rating: number;
  image?: string;
}

interface IPriceRange {
  from: number;
  to: number;
}

interface IService extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  description: string;
  priceType: "flat" | "range";
  priceRange?: IPriceRange;
  price?: number;
  images: string[];
  duration: string;
  location: Schema.Types.ObjectId[];
  mainCategory: string[];
  category: string[];
  subCategory?: string[];
  options?: ServiceOption[];
  reviews?: IReview[];
  rating: number;
  homeService: boolean;
  serviceRadius?: string;
}

// Schema for ServiceOption
const ProductOptionSchema: Schema = new Schema({
  optionCategory: { type: String, required: true },
  optionName: { type: String, required: true },
});
const ReviewSchema: Schema<IReview> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const PriceRangeSchema: Schema<IPriceRange> = new Schema({
  from: { type: Number },
  to: { type: Number },
});

// Service Schema
const serviceSchema: Schema<IService> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    priceType: { type: String, enum: ["flat", "range"], required: true },
    price: { type: Number },
    priceRange: PriceRangeSchema,
    images: { type: [String], required: true },
    location: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    mainCategory: { type: [String], required: true },
    category: { type: [String], required: true },
    subCategory: { type: [String] },
    options: { type: [ProductOptionSchema] },
    reviews: { type: [ReviewSchema] },
    rating: { type: Number, default: 0 },
    homeService: { type: Boolean, default: false },
    serviceRadius: { type: String },
  },
  { timestamps: true }
);

// Create the Service model
const Service: Model<IService> = mongoose.model<IService>(
  "Service",
  serviceSchema
);

export default Service;
