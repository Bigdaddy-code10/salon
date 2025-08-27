// src/pages/Salons.jsx
import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

const Salons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const res = await API.get("/salons");
        setSalons(res.data);
      } catch (err) {
        console.error("Failed to load salons", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Available Salons
      </h2>

      {loading ? (
        <p className="text-center">Loading salons...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {salons.map((salon) => (
            <div
              key={salon._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 transition hover:shadow-lg"
            >
              <img
                src={salon.image || "https://via.placeholder.com/300x200"}
                alt={salon.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{salon.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {salon.address}
              </p>
              <Link
                to={`/salons/${salon._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Salons;
