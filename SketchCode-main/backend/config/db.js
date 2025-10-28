const mongoose = require("mongoose");

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        connectTimeoutMS: 10000,
      });
      console.log("✅ MongoDB connected successfully");
      return true;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1}/${retries} failed:`, error.message);
      if (i < retries - 1) {
        const delay = Math.min(1000 * Math.pow(2, i), 10000); // Exponential backoff, max 10s
        console.log(`Retrying in ${delay/1000} seconds...`);
        await wait(delay);
      }
    }
  }
  console.error("❌ Could not connect to MongoDB after", retries, "attempts");
  return false;
};

// Export both for flexibility
module.exports = connectDB;
module.exports.isConnected = () => mongoose.connection.readyState === 1;
