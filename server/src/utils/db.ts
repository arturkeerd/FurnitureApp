import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URL;
  if (!uri) throw new Error("MONGO_URL missing");

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    // keeping defaults; Mongoose 8 chooses sane options
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB error:", err);
  });

  // graceful shutdown
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
}