import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import Appointment from "../models/Appointment.js";
import Salon from "../models/Salon.js";

const router = express.Router();

// ✅ Book an appointment
router.post("/", protect, async (req, res) => {
  const { salon, date, time } = req.body;

  if (!salon || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newAppointment = new Appointment({
    user: req.user._id,
    salon,
    date,
    time
  });

  const saved = await newAppointment.save();
  res.status(201).json(saved);
});

// ✅ Get appointments: user sees own, admin sees all
router.get("/", protect, async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== "admin") {
      query.user = req.user._id;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    const appointments = await Appointment.find(query)
      .populate("user", "name email")
      .populate("salon", "name address")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: err.message });
  }
});

// ✅ Cancel appointment (user)
router.put("/:id/cancel", protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Ensure user owns the appointment
    if (
      appointment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this appointment" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled", appointment });
  } catch (err) {
    res.status(500).json({ message: "Cancel failed", error: err.message });
  }
});

// ✅ Admin: Approve/reject appointment
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;

  if (!["confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: `Appointment ${status}`, appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: err.message });
  }
});

// ✅ Get all appointments grouped by status (for current user)
router.get("/grouped", protect, async (req, res) => {
  try {
    const allAppointments = await Appointment.find({ user: req.user._id })
      .populate("salon", "name address")
      .select("salon date time status");

    const grouped = {
      pending: [],
      confirmed: [],
      cancelled: [],
    };

    allAppointments.forEach((appt) => {
      const status = appt.status?.toLowerCase() || "pending";
      if (grouped[status]) {
        grouped[status].push(appt);
      }
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch grouped appointments",
      error: err.message,
    });
  }
});



export default router;
