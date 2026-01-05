import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export default {
  async signup({ name, email, password }) {
    if (!name || name.trim().length < 2) throw new Error("Name is required");
    email = email.toLowerCase()
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already in use");

    const hashed = await bcrypt.hash(password, 10);
    const role = 
    email === process.env.ADMIN_EMAIL.toLowerCase()
    ? "admin"
    : null

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });
    const safeUser = user.toObject()
    delete safeUser.password

    return {
      token: generateToken(user._id),
      user: safeUser,
    };
  },

  async login({ email, password }) {
    email = email.toLowerCase()
    const user = await User.findOne({ email })
    .select("+password");
    console.log("USER FROM DB:", user);
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");
        const safeUser = user.toObject()
        delete safeUser.password

    return {
      token: generateToken(user._id),
      user:safeUser,
    };
  },

  async setRole(userId, role) {
    if (!["client", "freelancer"].includes(role))
      throw new Error("Invalid role");

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // ❌ Prevent role changes permanently
    if (user.role) throw new Error("Role already selected");

    user.role = role;
    await user.save();

    return user;
  },
};
