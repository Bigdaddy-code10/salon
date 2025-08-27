import express from "express";
import Booking from "../models/Booking.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { salonId, service, appointmentTime } = req.body;
  try {
    const booking = await Booking.create({
      userId: req.user._id,
      salonId,
      service,
      appointmentTime,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
});

router.get("/user", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate(
      "salonId"
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to get bookings" });
  }
});

export default router;
