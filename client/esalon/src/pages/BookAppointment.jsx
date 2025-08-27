import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const BookAppointment = () => {
  const { salonId } = useParams();
  const navigate = useNavigate();

  const [salon, setSalon] = useState(null);
  const [form, setForm] = useState({ date: "", time: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const res = await API.get(`/salons/${salonId}`);
        setSalon(res.data);
      } catch (err) {
        setError("Failed to load salon");
      }
    };
    fetchSalon();
  }, [salonId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/appointments", {
        salon: salonId,
        date: form.date,
        time: form.time,
      });
      setSuccess("Appointment booked!");
      setTimeout(() => navigate("/appointments"), 1500);
    } catch (err) {
      setError("Failed to book appointment");
    }
  };

  if (!salon) return <p>Loading salon...</p>;

  return (
    <div className="container">
      <h2>Book Appointment at {salon.name}</h2>
      <p>{salon.address}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default BookAppointment;
