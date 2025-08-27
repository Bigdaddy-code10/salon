import { Link } from "react-router-dom";

const SalonCard = ({ salon }) => {
  return (
    <div className="card">
      <h3>{salon.name}</h3>
      <p>{salon.address}</p>
      <p>{salon.phone}</p>
      <p>{salon.location?.city}</p>
      <Link to={`/book/${salon._id}`}>
        <button>Book Appointment</button>
      </Link>
    </div>
  );
};

export default SalonCard;
