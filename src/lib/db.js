import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cachedConnection = null;

export const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = await mongoose.connect(MONGO_URI);
  cachedConnection = connection;
  return connection;
};