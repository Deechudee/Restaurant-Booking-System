import { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "./components/BookingForm";

function App() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h1>Restaurant Booking</h1>

      <BookingForm refresh={fetchBookings} />

      <h2>Bookings</h2>
      {bookings.map((b) => (
        <div key={b._id}>
          <p><b>Name:</b> {b.name}</p>
          <p><b>Guests:</b> {b.guests}</p>
          <p><b>Time:</b> {b.time}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;