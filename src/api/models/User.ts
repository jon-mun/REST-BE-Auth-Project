import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tokenVersion: { type: Number, required: true, default: 0 },
  email: { type: String, required: false },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

const User = mongoose.model("User", userSchema);

export default User;
