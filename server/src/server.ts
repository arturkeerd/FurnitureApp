// server/src/server.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "server/.env") });

import cors from "cors";
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth";
import itemsRouter from "./routes/item";
import favoritesRouter from "./routes/favorite";
import { connectDB } from "./utils/db";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

console.log("[server] mounting /api/auth");
app.use("/api/auth", authRouter);
app.use("/api/items", itemsRouter);
app.use("/api/favorites", favoritesRouter);

const PORT = Number(process.env.PORT ?? 4000);

    connectDB().then(() => {
    console.log("✅ DB connected, starting server...");
    app.listen(PORT, "0.0.0.0", () => console.log(`API listening on :${PORT}`));
    })
    .catch((err) => {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    });