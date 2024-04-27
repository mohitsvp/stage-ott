import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.MONGODB_URI || "";

const connect = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
};

export default connect;