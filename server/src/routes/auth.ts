import argon2 from "argon2";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { auth, AuthReq } from "../middleware/auth";
import { User } from "../models/User";

const router = Router();

//POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await argon2.hash(password);
    const user = await User.create({ name, email, passwordHash, listings: [] });

    const token = jwt.sign({}, process.env.JWT_SECRET || "", { subject: user.id, expiresIn: "7d" });
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/auth/
router.get("/", async (req: AuthReq, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, createdAt: 1, updatedAt: 1 })
      .sort({ createdAt: -1 })
      .lean();

    res.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//GET /api/auth/me
router.get("/me", auth, async (req: AuthReq, res) => {
  const user = await User.findById(req.userId).select("_id name email");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ id: user._id.toString(), name: user.name, email: user.email });
});

//POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({}, process.env.JWT_SECRET || "", { subject: user.id, expiresIn: "7d" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;