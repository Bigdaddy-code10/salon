import Salon from "../models/Salon.js";

// ✅ GET all salons (public)
export const getSalons = async (req, res) => {
  try {
    const salons = await Salon.find().sort({ createdAt: -1 });
    res.json(salons);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch salons", error: err.message });
  }
};

// ✅ GET single salon by ID (public)
export const getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) return res.status(404).json({ message: "Salon not found" });
    res.json(salon);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch salon", error: err.message });
  }
};

// ✅ CREATE new salon (admin only)
export const createSalon = async (req, res) => {
  try {
    const salon = await Salon.create({
      name: req.body.name,
      address: req.body.address,
      location: req.body.location ? JSON.parse(req.body.location) : undefined,
      image: req.file ? req.file.path : req.body.image || null, // ✅ support upload
      createdBy: req.user._id,
    });
    res.status(201).json(salon);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create salon", error: err.message });
  }
};

// ✅ UPDATE salon (admin only)
export const updateSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) return res.status(404).json({ message: "Salon not found" });

    salon.name = req.body.name || salon.name;
    salon.address = req.body.address || salon.address;
    salon.location = req.body.location
      ? JSON.parse(req.body.location)
      : salon.location;
    salon.image = req.file ? req.file.path : salon.image; // ✅ update if new file uploaded

    const updatedSalon = await salon.save();
    res.json(updatedSalon);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update salon", error: err.message });
  }
};

// ✅ DELETE salon (admin only)
export const deleteSalon = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id);
    if (!salon) return res.status(404).json({ message: "Salon not found" });

    await salon.deleteOne();
    res.json({ message: "Salon deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete salon", error: err.message });
  }
};
