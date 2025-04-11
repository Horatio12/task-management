const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to our MongoDB database");
  } catch (error) {
    console.error("failde to connect to DB", error);
    process.exit();
  }
};

module.exports = connectDB;
