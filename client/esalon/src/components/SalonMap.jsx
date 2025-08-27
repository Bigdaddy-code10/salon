import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix for marker icons (Leaflet default icons)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// ✅ This was missing
function UserLocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        map.setView(coords, 13); // Zoom to user's location
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
      }
    );
  }, [map]);

  return position ? (
    <Marker position={position}>
      <Popup>Your location</Popup>
    </Marker>
  ) : null;
}

const SalonMap = ({ salons }) => {
  const defaultPosition = [6.5244, 3.3792]; // Lagos

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow my-6">
      {/* Reset Button */}
      <button
        onClick={() => window.location.reload()}
        className="absolute top-4 right-4 z-[999] bg-white text-sm px-3 py-1 rounded shadow hover:bg-gray-100"
      >
        🔄 Reset Map
      </button>

      <MapContainer
        center={defaultPosition}
        zoom={11}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {salons.map((salon) => (
          <Marker
            key={salon._id}
            position={[
              salon.location.coordinates[1],
              salon.location.coordinates[0],
            ]}
          >
            <Popup>
              <strong>{salon.name}</strong>
              <br />
              {salon.address}
            </Popup>
          </Marker>
        ))}

        {/* ✅ Show user location */}
        <UserLocationMarker />
      </MapContainer>
    </div>
  );
};

export default SalonMap;
