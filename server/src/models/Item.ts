import { Schema, model, Types } from "mongoose";

export const CATEGORIES = ["chair","table","sofa","bed","lamp","storage"] as const;

const itemSchema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name:   { type: String, required: true, trim: true },
    price:  { type: Number, required: true, min: 0 },
    description: String,
    image:  String,
    category: { type: String, required: true, /* enum: CATEGORIES */ },
  },
  { timestamps: true }
);

export const Item = model("Item", itemSchema);