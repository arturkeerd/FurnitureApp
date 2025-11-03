import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthReq extends Request {
  userId?: string;
}

export function auth(req: AuthReq, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization; // "Bearer <token>"
  if (!hdr?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });

  const token = hdr.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "");
    // @ts-ignore
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}