import { Schema, model, Document } from "mongoose";
import { MediaType } from "./post";

// Order Status
export enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

// Order Confirmation STatus
export enum OrderConfirmation {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

// Order Tyoe
export enum OrderType {
  PICKUP = "pickup",
  DELIVERY = "delivery",
  SHIPPING = "shipping",
}

// interface Product {
//   productId: Schema.Types.ObjectId;
//   volume: number;
// }
export interface OrderDocument extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  // products: Product[];
  type: OrderType;
  status: OrderStatus;
  volume: number;
  // createdAt?: Date;
  // updatedAt: Date;
  deliveryTime: Date;
  note?: string;
  address: string;
  adminConfirmation?: OrderConfirmation;
  userConfirmation?: OrderConfirmation;
  acceptOrder?: boolean;
  category?: string;
}

// Order Schema
const OrderSchema = new Schema<OrderDocument>(
  {
    user: { required: true, type: Schema.Types.ObjectId, ref: "User" }, // User making the Order
    product: { required: true, type: Schema.Types.ObjectId, ref: "Product" },
    // products: [
    //   {
    //     product: {
    //       required: true,
    //       type: Schema.Types.ObjectId,
    //       ref: "Product",
    //     },
    //     volume: Number,
    //   },
    // ], //The product Ordered
    type: { required: true, enum: Object.values(OrderType), type: String }, // type of order
    volume: { required: true, type: Number }, // Volume of the product ordered
    status: {
      required: true,
      type: String,
      enum: Object.values(OrderStatus),
    },
    adminConfirmation: {
      required: false,
      type: String, //confirmation status
      enum: Object.values(OrderConfirmation),
    },
    userConfirmation: {
      required: false,
      type: String, //confirmation status
      enum: Object.values(OrderConfirmation),
    },
    note: { required: false, type: String }, // Order note
    address: { required: true, type: String }, // Address for order to be delivered
    deliveryTime: { required: true, type: Date }, // Time for product to be delivered
    // createdAt: { type: Date, default: Date.now }, // Time order was created
    // updatedAt: { required: true, default: Date.now }, // Time order was updated
    acceptOrder: { required: false, type: Boolean, default: true },
    category: { required: false, type: String },
  },
  { timestamps: true }
);

const Order = model<OrderDocument>("Order", OrderSchema);
export default Order;
