import { Schema, model, Types } from "mongoose";

const FavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

// prevent duplicates
FavoriteSchema.index({ userId: 1, itemId: 1 }, { unique: true });

export const Favorite = model("Favorite", FavoriteSchema);