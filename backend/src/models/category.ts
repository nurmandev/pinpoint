import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  order?: Schema.Types.ObjectId[];
}

// Order Schema
const CategorySchema = new Schema<CategoryDocument>(
  {
    user: { required: true, type: Schema.Types.ObjectId, ref: "User" }, // User making the Order
    name: { required: true, type: String },
    order: { required: false, type: [Schema.Types.ObjectId], ref: "Order" },
  },
  { timestamps: true }
);

const Category = model<CategoryDocument>("Category", CategorySchema);
export default Category;
