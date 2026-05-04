import { useEffect, useState } from "react";
import API from "../api/axios";
import BookingForm from "../components/BookingForm";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await API.get("/api/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await API.get("/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchBookings();
}, []);
  return (
    <div>
      <h2>Bookings</h2>
      <BookingForm refresh={fetchBookings} />

      {bookings.map((b, index) => (
        <div key={index}>
          <p>{b.name} - {b.guests} people</p>
          <p>{b.date} at {b.time}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;