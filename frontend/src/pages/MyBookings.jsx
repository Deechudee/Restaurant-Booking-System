import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../App.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelLoading, setCancelLoading] = useState({});
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await API.get('/api/bookings/my-bookings');
        setBookings(res.data || []);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  const handleCancel = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    setCancelLoading((prev) => ({ ...prev, [bookingId]: true }));
    try {
      await API.patch(`/api/bookings/${bookingId}/cancel`);
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
      console.error(err);
    } finally {
      setCancelLoading((prev) => ({ ...prev, [bookingId]: false }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return 'status-pending';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="empty-state">
        <h2>Please log in to view your bookings</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="my-bookings-page content-wrapper">
      <div className="page-header">
        <h1>My Bookings</h1>
        <p>Manage your restaurant reservations</p>
      </div>

      {error && <div className="form-error">{error}</div>}

      {loading ? (
        <div className="loading-skeleton">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Book your first table and track it here</p>
          <Link to="/booking" className="btn">Book Now</Link>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="card-header">
                <div>
                  <h3 className="customer-name">{booking.name}</h3>
                  <div className="meta-row">
                    <span className={`badge ${getStatusClass(booking.status)}`}>
                      {booking.status?.toUpperCase() || 'PENDING'}
                    </span>
                    <span className="date-text">{formatDate(booking.date)}</span>
                  </div>
                </div>
                <div className="table-info">
                  <span className="badge-table">Table {booking.tableNumber}</span>
                </div>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <strong>Guests:</strong> <span>{booking.guests}</span>
                </div>
                <div className="detail-row">
                  <strong>Time:</strong> <span>{booking.timeSlot}</span>
                </div>
                {booking.status !== 'cancelled' && (
                  <button 
                    className="btn" 
                    onClick={() => handleCancel(booking._id)}
                    disabled={cancelLoading[booking._id]}
                  >
                    {cancelLoading[booking._id] ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
