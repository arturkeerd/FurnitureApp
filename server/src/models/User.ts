import { Schema, model, Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  listings: Types.ObjectId[]; // Item refs
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    listings: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);