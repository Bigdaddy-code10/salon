import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createSalon,
  getSalons,
  getSalonById,
  updateSalon,
  deleteSalon,
} from "../controllers/salonController.js";

const router = express.Router();

// ✅ Public Routes
router.get("/", getSalons);
router.get("/:id", getSalonById);

// ✅ Admin Routes
router.post("/", protect, adminOnly, upload.single("image"), createSalon);
router.put("/:id", protect, adminOnly, upload.single("image"), updateSalon);
router.delete("/:id", protect, adminOnly, deleteSalon);

export default router;
