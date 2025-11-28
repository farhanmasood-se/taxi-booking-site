const mongoose = require("mongoose");

// Cache the connection to reuse in serverless environments
let cachedConnection = null;

const connectDB = async () => {
  // If connection already exists and is ready, reuse it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    // If connection exists but is not ready, close it first
    if (cachedConnection) {
      await mongoose.connection.close();
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedConnection = connection;
    console.log("✔️ MongoDB Connected to " + process.env.MONGO_URI);
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // In serverless, don't exit process, just throw error
    if (process.env.VERCEL !== "1" && process.env.VERCEL_ENV !== "1") {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
