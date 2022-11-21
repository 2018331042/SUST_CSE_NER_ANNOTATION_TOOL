import mongoose, { Document } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
