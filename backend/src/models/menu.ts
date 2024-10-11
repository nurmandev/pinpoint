import { Schema, model, Document } from "mongoose";

// Days of the week interface
interface DisplayDays extends MenuDocument {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}

// Time interface
interface DisplayTime extends MenuDocument {
  start: Date;
  end: Date;
}

// Interface for Menu Document
export interface MenuDocument extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  order?: Schema.Types.ObjectId[];
  location?: String[];
  displayDays: DisplayDays;
  displayTime?: DisplayTime;
}

// "open" and "close" time of menu
const DisplayTimeSchema = new Schema<DisplayTime>({
  start: { required: true, type: Date, default: Date.now },
  end: { required: true, type: Date, default: Date.now },
});

// Days of the week
const DisplayDaysSchema = new Schema<DisplayDays>({
  Monday: { required: true, type: Boolean, default: false },
  Tuesday: { required: true, type: Boolean, default: false },
  Wednesday: { required: true, type: Boolean, default: false },
  Thursday: { required: true, type: Boolean, default: false },
  Friday: { required: true, type: Boolean, default: false },
  Saturday: { required: true, type: Boolean, default: false },
  Sunday: { required: true, type: Boolean, default: false },
});

// Menu Schema
const MenuSchema = new Schema<MenuDocument>(
  {
    user: { required: true, type: Schema.Types.ObjectId, ref: "User" }, // User making the Order
    name: { required: true, type: String },
    order: [{ required: false, type: Schema.Types.ObjectId, ref: "Order" }],
    location: { required: false, type: [String] },
    displayDays: { required: true, type: DisplayDaysSchema },
    displayTime: { required: true, type: DisplayTimeSchema },
  },
  { timestamps: true }
);

const Menu = model<MenuDocument>("Menu", MenuSchema);
export default Menu;
