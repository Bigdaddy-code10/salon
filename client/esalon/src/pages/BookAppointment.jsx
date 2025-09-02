import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api"; // axios instance with token interceptor
import { toast } from "react-toastify";

const BookAppointment = () => {
  const { salonId } = useParams();
  const navigate = useNavigate();

  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const res = await API.get(`/salons/${salonId}`);
        setSalon(res.data);
      } catch (err) {
        console.error("Failed to fetch salon", err);
        toast.error("Failed to load salon info");
      } finally {
        setLoading(false);
      }
    };

    fetchSalon();
  }, [salonId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      toast.error("Please select both date and time");
      return;
    }

    setSubmitting(true);

    try {
      await API.post("/appointments", {
        salon: salonId,
        date,
        time,
      });

      toast.success("Appointment booked successfully!");
      navigate("/appointments");
    } catch (err) {
      console.error("Failed to book appointment", err);
      const msg =
        err.response?.data?.message || "Booking failed. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading salon info...</p>;

  if (!salon)
    return <p className="text-center mt-10 text-red-500">Salon not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">{salon.name}</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        {salon.address}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="date">
            Select Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="time">
            Select Time
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
