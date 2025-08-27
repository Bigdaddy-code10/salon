import { useEffect, useState } from "react";
import API from "../utils/api";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const fetchAll = async () => {
    try {
      const res = await API.get("/appointments/admin");
      setAppointments(res.data);
    } catch (err) {
      setError("Could not fetch appointments");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}/status`, { status });
      fetchAll();
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {appointments.map((a) => (
        <div key={a._id} className="card">
          <p>
            <strong>User:</strong> {a.user?.name}
          </p>
          <p>
            <strong>Salon:</strong> {a.salon?.name}
          </p>
          <p>
            <strong>Date:</strong> {a.date} @ {a.time}
          </p>
          <p>
            <strong>Status:</strong> {a.status}
          </p>
          {a.status === "pending" && (
            <div>
              <button onClick={() => handleStatus(a._id, "confirmed")}>
                Confirm
              </button>
              <button onClick={() => handleStatus(a._id, "cancelled")}>
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminDashboard;
