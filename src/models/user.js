import mongoose from "mongoose";
import { ROLES } from "../config/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // 👈 fixes your “name optional” issue
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // 👈 auto-normalize email
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES), // 👈 THIS is valid JS
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
