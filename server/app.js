// server.js or app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import salonRoutes from "./routes/salonRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js"; // ✅ Only import once

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/salons", salonRoutes);
app.use("/api/appointments", appointmentRoutes); // ✅ Only use once

export default app;
