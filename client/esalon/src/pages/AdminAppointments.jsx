import { useEffect, useState } from "react";
import API from "../utils/api";
import { toast } from "react-toastify";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await API.get("/appointments"); // Admin fetches all
        setAppointments(res.data);
      } catch (err) {
        setError("Failed to fetch appointments");
      }
    };
    fetchAll();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/appointments/${id}/status`, { status: newStatus });
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
      );
      toast.success(`Appointment ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        All Appointments (Admin)
      </h2>
      {appointments.length === 0 ? (
        <p>No appointments.</p>
      ) : (
        appointments.map((appt) => (
          <div
            key={appt._id}
            className="border p-4 rounded shadow mb-4 bg-white dark:bg-gray-800"
          >
            <p>
              <strong>Salon:</strong> {appt.salon?.name}
            </p>
            <p>
              <strong>User:</strong> {appt.user?.name}
            </p>
            <p>
              <strong>Status:</strong> {appt.status}
            </p>
            <p>
              <strong>Date:</strong> {appt.date}
            </p>
            <p>
              <strong>Time:</strong> {appt.time}
            </p>

            <div className="mt-2 flex gap-2">
              {["confirmed", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(appt._id, status)}
                  className={`px-3 py-1 text-sm rounded ${
                    status === "confirmed"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white`}
                >
                  Mark {status}
                </button>
              ))}
            </div>
          </div>
        ))
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AdminAppointments;
