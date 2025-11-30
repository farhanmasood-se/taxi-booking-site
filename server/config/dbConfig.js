// lib/mongoose.js
const mongoose = require("mongoose");

// Use a global variable to store the connection across function calls
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn; // Reuse existing connection
  }

  if (!cached.promise) {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("❌ Missing MONGO_URI environment variable");
    }

    // Create the connection promise ONCE
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("✔️ MongoDB Connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
