
import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectToMongoDB } from "./connect.js";
import urlRoute from "./routes/url.js";
import userRoutes from "./routes/userRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import URL from "./models/url.js";

const app = express();

// CORS configuration
// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://linkly-urlshortner.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LinkShort API is running!",
  });
});

// API routes
app.use("/url", urlRoute);
app.use("/api/users", userRoutes);
app.use("/api/support", supportRoutes);

// Redirect short URLs
app.get("/:shortId", async (req, res) => {
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId: req.params.shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { returnDocument: "after" }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Redirect error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// Start server
const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables.");
    }

    await connectToMongoDB(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`LinkShort server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
