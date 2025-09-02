import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ✅ Create appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create appointment." });
  }
});

// ✅ Get all appointments for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.params.userId }).populate("salon");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch appointments." });
  }
});

// ✅ Get all appointments (admin/staff)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("user").populate("salon");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch all appointments." });
  }
});

// ✅ Update appointment status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment." });
  }
});

// ✅ Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment." });
  }
});

export default router;
