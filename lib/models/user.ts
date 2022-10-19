import mongoose from "mongoose";

interface IUSER {
  email: string;
  name: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema<IUSER>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUSER>("User", userSchema);

export default User;
