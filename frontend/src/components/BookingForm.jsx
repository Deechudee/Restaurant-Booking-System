import { useState } from "react";
import axios from "axios";

function BookingForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    guests: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/book", form);
      alert("Booking Added ✅");
      refresh(); // refresh list after adding
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="guests" placeholder="Guests" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      <input name="time" placeholder="Time" onChange={handleChange} />
      <button type="submit">Book</button>
    </form>
  );
}

export default BookingForm;