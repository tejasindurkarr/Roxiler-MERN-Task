const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
  const mongoURI = process.env.MONGODB_URL;

  if (!mongoURI) {
    throw new Error('MONGODB_URL environment variable is not defined');
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToMongo;
