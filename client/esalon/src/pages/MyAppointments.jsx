//import express from "express";
//import Appointment from "../models/Appointment.js";

//const router = express.Router();

import { useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

const MyAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get(`/appointments/user/${user._id}`);
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setError("Unable to fetch your appointments.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchAppointments();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
        My Appointments
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">You have no appointments yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {appt.salon?.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Address: {appt.salon?.address}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Date: <span className="font-medium">{appt.date}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Time: <span className="font-medium">{appt.time}</span>
              </p>
              <p
                className={`inline-block px-3 py-1 text-sm rounded mt-2 ${
                  appt.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : appt.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appt.status.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
