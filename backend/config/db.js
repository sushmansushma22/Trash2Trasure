import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully");

    mongoose.connection.on("error", (err) => {
      console.log("MongoDB Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠ MongoDB Disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB Reconnected");
    });

  } catch (error) {
    console.log(error);
  }
};

export default connectDB;