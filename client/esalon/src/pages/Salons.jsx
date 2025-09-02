import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

// 🌍 Calculate distance between two coordinates in kilometers
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Salons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Unable to fetch your location.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }

    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    setLoading(true);
    try {
      const res = await API.get("/salons");
      setSalons(res.data);
    } catch (err) {
      console.error("Failed to load salons", err);
      setError("Failed to load salons. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Filter salons within 10km of user
  const filteredSalons = salons.filter((salon) => {
    if (!userLocation) return true; // Show all if user location is unknown

    const { latitude: salonLat, longitude: salonLon } = salon;
    if (salonLat && salonLon) {
      const distance = getDistanceInKm(
        userLocation.latitude,
        userLocation.longitude,
        salonLat,
        salonLon
      );
      return distance <= 10;
    }

    return true; // Show salons without coordinates (optional)
  });

  return (
    <div className="p-6 pt-22 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        This are your Nearby Salons
      </h2>

      {/* 🌐 Show User Location */}
      <div className="text-center mb-4 text-sm text-gray-600 dark:text-gray-400">
        {userLocation ? (
          <p>
            Your Location: Latitude{" "}
            <span className="font-medium">{userLocation.latitude.toFixed(4)}</span>, Longitude{" "}
            <span className="font-medium">{userLocation.longitude.toFixed(4)}</span>
          </p>
        ) : locationError ? (
          <p className="text-red-500">{locationError}</p>
        ) : (
          <p>Detecting your location...</p>
        )}
      </div>

      {/* ⚠️ Error */}
      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}

      {/* 🌀 Loading */}
      {loading ? (
        <p className="text-center">Loading salons...</p>
      ) : filteredSalons.length === 0 ? (
        <p className="text-center text-gray-500">No nearby salons found within 10 km.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSalons.map((salon) => {
            const distance = salon.latitude && salon.longitude && userLocation
              ? getDistanceInKm(userLocation.latitude, userLocation.longitude, salon.latitude, salon.longitude).toFixed(2)
              : null;

            return (
              <div
                key={salon._id}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 transition hover:shadow-lg"
              >
                <img
                  src={salon.image || "https://via.placeholder.com/300x200"}
                  alt={salon.name || "Salon"}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{salon.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {salon.address}
                </p>
                {distance && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {distance} km away
                  </p>
                )}

                <Link
                to={`/salons/${salon._id}/book`}
                className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                  Book Now
                </Link>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Salons;
