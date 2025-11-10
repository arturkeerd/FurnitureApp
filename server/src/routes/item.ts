import { Router } from "express";
import { auth, AuthReq } from "../middleware/auth";
import { Item } from "../models/Item";
import { User } from "../models/User";

const router = Router();

//GET /api/items/  -- all items
router.get("/", async (_req, res) => {
  const items = await Item.find().sort({ createdAt: -1 }).limit(100).lean();
  res.json(items);
});

//GET /api/items/:id  -- one item
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

//POST /api/items/  -- create item
router.post("/", auth, async (req: AuthReq, res) => {
  try {
    console.log("CREATE /items body:", req.body);

    // 1) read category too
    const { name, price, description, image, category } = req.body;

    // 2) basic validation
    if (!name || price == null || category == null) {
      return res.status(400).json({ error: "name, price and category are required" });
    }
    const nPrice = Number(price);
    if (Number.isNaN(nPrice) || nPrice < 0) {
      return res.status(400).json({ error: "price must be a non-negative number" });
    }

    const seller = req.userId!;
    const item = await Item.create({
      seller,
      name: String(name).trim(),
      price: nPrice,
      description,
      image,
      category: String(category),
    });

    await User.findByIdAndUpdate(seller, { $push: { listings: item._id } });
    res.status(201).json(item);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

//PATCH /api/items/:id  -- change item
router.patch("/:id", auth, async (req: AuthReq, res) => {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, seller: req.userId },
    { $set: req.body },
    { new: true }
  );
  if (!item) return res.status(404).json({ error: "Not found or not owner" });
  res.json(item);
});

//DELETE /api/items/:id  -- delte item
router.delete("/:id", auth, async (req: AuthReq, res) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id, seller: req.userId });
  if (!item) return res.status(404).json({ error: "Not found or not owner" });
  await User.findByIdAndUpdate(req.userId, { $pull: { listings: item._id } });
  res.json({ ok: true });
});

export default router;