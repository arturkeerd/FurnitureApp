import { Router } from "express";
import { auth, AuthReq } from "../middleware/auth";
import { Favorite } from "../models/Favorite";
import { Item } from "../models/Item";

const router = Router();
console.log("✅ favorites router LOADED");

//GET /api/favorites/  -- all items
router.get("/", auth, async (req: AuthReq, res) => {
  const favs = await Favorite.find({ userId: req.userId })
    .populate("itemId") // return full item details
    .lean();

  res.json(favs.map(f => f.itemId));
});

//POST /api/favorites/:itemId  -- one item
router.post("/:itemId", auth, async (req: AuthReq, res) => {
  try {
    const fav = await Favorite.create({
      userId: req.userId,
      itemId: req.params.itemId,
    });

    res.status(201).json(fav);
  } catch (e: any) {
    // duplicate favorite -> ignore and return OK
    if (e.code === 11000) {
      return res.json({ ok: true, msg: "Already favorited" });
    }
    res.status(400).json({ error: e.message });
  }
});


//DELETE /api/favorites/:itemId  -- delete item
router.delete("/:itemId", auth, async (req: AuthReq, res) => {
  await Favorite.findOneAndDelete({
    userId: req.userId,
    itemId: req.params.itemId,
  });

  res.json({ ok: true });
});

export default router;