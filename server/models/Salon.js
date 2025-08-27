import mongoose from "mongoose";

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    services: [
      {
        type: String,
      },
    ],
    location: {
      city: String,
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Salon", salonSchema);
