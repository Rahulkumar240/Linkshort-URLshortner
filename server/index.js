
import dns from "node:dns";
import supportRoutes from "./routes/supportRoutes.js";
// Configure public DNS servers
dns.setServers([
    "8.8.8.8",
    "8.8.4.4",
    "1.1.1.1",
    "1.0.0.1"
]);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectToMongoDB } from "./connect.js";
import urlRoute from "./routes/url.js";
import userRoutes from "./routes/userRoutes.js";
import URL from "./models/url.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/url", urlRoute);
app.use("/api/users", userRoutes);
app.use("/api/support", supportRoutes);

// Redirect short URL
app.get("/:shortId", async (req, res) => {
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId: req.params.shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true }
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
        await connectToMongoDB(process.env.MONGO_URI);

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server started at PORT ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
