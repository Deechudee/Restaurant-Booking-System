const Reservation = require("../models/Reservation");

exports.getAnalytics = async (req, res) => {
  try {
    const { period = 'day' } = req.query;
    const now = new Date();

    let startDate;
    if (period === 'week') startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    else startDate = new Date(now.toDateString());

    const bookings = await Reservation.find({
      createdAt: { $gte: startDate },
      status: 'confirmed'
    });

    const totalBookings = bookings.length;
    const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0);
    const utilization = (totalGuests / 100 * 100).toFixed(1); // Assume 100 cap

    // Peak hours
    const hours = {};
    bookings.forEach(b => {
      const hour = b.startTime.getHours();
      hours[hour] = (hours[hour] || 0) + 1;
    });
    const peakHour = Object.entries(hours).sort((a, b) => b[1] - a[1])[0];

    res.json({
      totalBookings,
      totalGuests,
      avgGroupSize: (totalGuests / totalBookings || 0).toFixed(1),
      utilization: `${utilization}%`,
      peakHour: peakHour ? `${peakHour[0]}:00` : 'N/A',
      cancellationRate: '0%' // Later
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

