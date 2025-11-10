import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthReq extends Request {
  userId?: string;
}

export function auth(req: AuthReq, res: Response, next: NextFunction) {
  console.log(`[auth mw] ${req.method} ${req.originalUrl}`);
  const hdr = req.headers.authorization;
  console.log("[auth mw] Authorization:", hdr);
  if (!hdr?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });

  const token = hdr.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "");
    // @ts-ignore
    req.userId = payload.sub as string | undefined;
    console.log("[auth mw] userId:", req.userId);
    next();
  } catch (e) {
    console.log("[auth mw] verify failed:", (e as Error).message);
    return res.status(401).json({ error: "Invalid token" });
  }
}
