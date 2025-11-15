import { Router } from "express";
import { Types } from "mongoose";
import { auth, AuthReq } from "../middleware/auth";
import { Favorite } from "../models/Favorite";

const router = Router();

// GET /api/favorites?userId=...
router.get("/", async (req, res) => {
  const userId = String(req.query.userId || "");
  console.log("[GET /favorites]", { userId });
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  if (!Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid userId" });

  const favorites = await Favorite.find({ userId })
    .populate("itemId")      // <-- note the new field name
    .lean();

  return res.json(favorites);
});

// POST /api/favorites/:itemId
router.post("/:itemId", auth, async (req: AuthReq, res) => {
  const { itemId } = req.params;
  console.log("[POST /favorites]", { userId: req.userId, itemId });
  if (!Types.ObjectId.isValid(itemId)) return res.status(400).json({ error: "Invalid itemId" });

  try {
    const fav = await Favorite.create({ userId: req.userId, itemId });
    return res.status(201).json(fav);
  } catch (e: any) {
    if (e.code === 11000) return res.json({ ok: true, msg: "Already favorited" });
    return res.status(400).json({ error: e.message });
  }
});

// DELETE /api/favorites/:itemId
router.delete("/:favoriteId", auth, async (req: AuthReq, res) => {
  const deleted = await Favorite.findOneAndDelete({
    _id: req.params.favoriteId,  // <-- match _id
    userId: req.userId,          // safety: only delete your own
  });

  if (!deleted) {
    return res.status(404).json({ ok: false, error: "Favorite not found" });
  }

  return res.json({ ok: true });
});

export default router;