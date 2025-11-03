import { Router } from "express";
import { User } from "../models/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = Router();

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