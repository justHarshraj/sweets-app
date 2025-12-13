const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async (uri) => {
  if (isConnected) return;

  const mongoURI = uri || process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MongoDB URI not provided");
  }

  await mongoose.connect(mongoURI, {
    dbName: "sweets",
  });

  isConnected = true;
  console.log("MongoDB connected");
};

module.exports = connectDB;
