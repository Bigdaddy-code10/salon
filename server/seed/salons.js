// seed/salons.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Salon from "../models/Salon.js";

dotenv.config();

const sampleSalons = [
  {
    name: "Bodyworth Beauty and Spa",
    address: "32, Admiralty Way, Lekki, Lagos",
    image: "https://www.shutterstock.com/image-photo/portrait-pretty-relaxed-young-woman-600nw-2478831041.jpg",
    phone: "+234 802 345 6789",
    rating: 4.7,
    services: ["Haircut", "Manicure", "Facial"]
  },
  {
    name: "Glow Haven Studio",
    address: "5B, Bourdillon Road, Ikoyi, Lagos",
    image: "https://plus.unsplash.com/premium_photo-1682090987732-b5ad44bf0d24?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2Fsb25zfGVufDB8fDB8fHww",
    phone: "+234 803 123 4567",
    rating: 4.6,
    services: ["Spa", "Waxing", "Massage"]
  },
  {
    name: "Radiance Touch Spa",
    address: "18, Herbert Macaulay Way, Yaba, Lagos",
    image: "https://images.unsplash.com/photo-1585421514287-27f3cfc3a380?auto=format&fit=crop&w=800&q=80",
    phone: "+234 806 555 2341",
    rating: 4.8,
    services: ["Pedicure", "Facial", "Hot Stone Massage"]
  },
  {
    name: "Velvet Skin Lounge",
    address: "10, Admiralty Road, Lekki Phase 1, Lagos",
    image: "https://images.unsplash.com/photo-1611930022058-0027a73e3f1d?auto=format&fit=crop&w=800&q=80",
    phone: "+234 810 999 7771",
    rating: 4.4,
    services: ["Skin Treatment", "Makeup", "Nail Art"]
  },
  {
    name: "Serenity Bliss Spa",
    address: "22, Awolowo Road, Ikoyi, Lagos",
    image: "https://images.unsplash.com/photo-1579961975094-6b9b53c57c11?auto=format&fit=crop&w=800&q=80",
    phone: "+234 805 222 1133",
    rating: 4.9,
    services: ["Aromatherapy", "Body Scrub", "Massage"]
  }
];

const seedSalons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Salon.deleteMany(); // Optional: Clear old data
    await Salon.insertMany(sampleSalons);

    console.log("✅ Sample salons seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed salons:", err);
    process.exit(1);
  }
};

seedSalons();
