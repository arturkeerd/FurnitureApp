// server/index.ts
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI!);

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: Number,           // important for filtering
  image: String,              // or:
  images: [String],
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", async (_req, res) => {
  const items = await Product.find().lean();
  res.json(items);
});

app.listen(4000, () => console.log("API on :4000"));