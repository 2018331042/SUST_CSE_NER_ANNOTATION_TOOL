import mongoose from "mongoose";

const connectDb = async () => mongoose.connect(process.env.MONGO_URI);

export default connectDb;
