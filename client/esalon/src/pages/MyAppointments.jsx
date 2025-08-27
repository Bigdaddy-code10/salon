import { useEffect, useState } from "react";
import API from "../utils/api";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState("");
  const handleCancel = async (id) => {
    if (!confirm("Cancel this appointment?")) return;

    try {
      await API.put(`/appointments/${id}/cancel`);
      // Refetch or update local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "cancelled" } : appt
        )
      );
    } catch (err) {
      alert("Failed to cancel appointment.");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get(
          statusFilter
            ? `/appointments?status=${statusFilter}`
            : "/appointments"
        );
        setAppointments(res.data);
      } catch (err) {
        setError("Could not load appointments");
      }
    };
    fetchAppointments();
  }, [statusFilter]);

  const grouped = {
    pending: [],
    confirmed: [],
    cancelled: [],
  };

  appointments.forEach((appt) => {
    grouped[appt.status]?.push(appt);
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        My Appointments
      </h2>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {["confirmed", "pending", "cancelled"].map((status) => (
        <div key={status} className="mb-8">
          <h3 className="text-xl font-semibold mb-3 capitalize text-blue-500">
            {status} Appointments
          </h3>

          {grouped[status].length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No {status} appointments.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[status].map((appt) => (
                <div
                  key={appt._id}
                  className="border dark:border-gray-600 rounded p-4 shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
                >
                  <p className="font-semibold">
                    <strong>Salon:</strong> {appt.salon?.name || "N/A"}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Date:</strong>{" "}
                    {new Date(appt.date).toLocaleDateString()}
                  </p>

                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-semibold ${
                      appt.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appt.status}
                  </span>

                  {appt.status === "pending" && (
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="mt-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Cancel
                    </button>
                  )}

                  <p className="text-sm">
                    <strong>Time:</strong> {appt.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {error && (
        <p className="text-red-500 mt-4 font-medium text-center">{error}</p>
      )}
    </div>
  );
};

export default MyAppointments;
