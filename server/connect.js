import mongoose from "mongoose";

async function connectToMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}

export { connectToMongoDB };