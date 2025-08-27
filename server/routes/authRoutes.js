// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { registerUser } from "../controllers/authController.js";
// import {
//   registerUser,
//   loginUser,
//   getUserProfile,
// } from "../controllers/authController.js";

// const router = express.Router();
// router.post("/register", registerUser); // ✅ matches /auth/register

// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     const hash = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hash, role });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     const { password: pwd, ...userData } = user._doc; // 👈 hide password

//     res.status(201).json({ token, user: userData });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Registration failed", error: err.message });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     const { password: pwd, ...userData } = user._doc;
//     res.json({ token, user: userData });
//   } catch (err) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// });

// export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// Optional: add this if you're using JWT to get current user info
// router.get("/profile", protect, getUserProfile);

export default router;
