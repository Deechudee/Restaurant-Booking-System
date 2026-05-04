import { useState } from "react";
import API from "../api/axios";
import TableMap from "./TableMap";

function BookingForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    guests: "",
    date: "",
    time: "",
    duration: 90,
    tableIds: []
  });
  const [loading, setLoading] = useState(false);
  const [manualSelect, setManualSelect] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTableSelect = (tableIds) => {
    setForm({ ...form, tableIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tableIds: form.tableIds.length > 0 ? form.tableIds : undefined
      };
      await API.post("/api/bookings/bookings", payload);
      alert("Booking created! 🥳");
      setForm({
        name: "",
        guests: "",
        date: "",
        time: "",
        duration: 90,
        tableIds: []
      });
      refresh?.();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-container">
      <h2>Smart Booking System</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input name="name" placeholder="Name *" value={form.name} onChange={handleChange} required />
          <input name="guests" type="number" min="1" placeholder="Guests *" value={form.guests} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <input type="date" name="date" min={today} value={form.date} onChange={handleChange} required />
          <input type="time" name="time" value={form.time} onChange={handleChange} required />
          <input name="duration" type="number" min="30" max="240" value={form.duration} onChange={handleChange} placeholder="Duration mins (90)" />
        </div>
        <label>
          <input type="checkbox" onChange={(e) => setManualSelect(e.target.checked)} />
          Manual table select (auto smart alloc default)
        </label>
        {manualSelect && form.date && form.time && (
          <TableMap 
            date={form.date} 
            startTime={form.time}
            onSelectTables={handleTableSelect}
          />
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Book Table (Smart)'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;