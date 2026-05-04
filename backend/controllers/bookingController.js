const Reservation = require("../models/Reservation");
const User = require("../models/User");
const { allocateTables } = require("../utils/tableService");

// CREATE BOOKING - Smart allocation
exports.createBooking = async (req, res) => {
  try {
    const userId = req.user._id; // From auth middleware
    const { guests, date, startTime, duration, tableIds: manualTableIds } = req.body;

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(start.getTime() + duration * 60000);

    let tableIds = manualTableIds;
    let allocationInfo = null;

    // Auto smart allocation if no manual tables
    if (!tableIds || tableIds.length === 0) {
      const alloc = await allocateTables(guests, date, start, end);
      if (!alloc) {
        return res.status(409).json({ message: "No suitable tables available. Added to waitlist?" });
      }
      tableIds = alloc.tableIds;
      allocationInfo = { usedTables: alloc.usedTables, waste: alloc.waste };
    }

    // Overlap check (enhanced)
    const existing = await Reservation.findOne({
      tableIds: { $in: tableIds },
      date: new Date(date),
      startTime: { $lt: end },
      endTime: { $gt: start },
      status: { $ne: 'cancelled' }
    });

    if (existing) {
      return res.status(409).json({
        message: "Selected table(s) unavailable due to overlap"
      });
    }

    const reservation = new Reservation({
      name: req.body.name || req.user.name,
      guests,
      tableIds,
      date: new Date(date),
      startTime: start,
      endTime: end,
      userId,
      status: 'confirmed'
    });

    const saved = await reservation.save();

    // Update user bookings count
    await User.findByIdAndUpdate(userId, { $inc: { bookingsCount: 1 } });

    // Socket emit stub - real later
    // io.to('tables').emit('tableUpdate', saved);

    res.status(201).json({ ...saved.toObject(), allocationInfo });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL BOOKING
exports.cancelBooking = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ _id: req.params.id, userId: req.user._id });
    if (!reservation) return res.status(404).json({ message: "Booking not found" });

    reservation.status = 'cancelled';
    await reservation.save();

    // Socket emit stub
    // io.to('tables').emit('bookingCancelled', reservation);



    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Reservation.find({ userId: req.user._id }).sort({ startTime: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BOOKINGS (admin)
exports.getBookings = async (req, res) => {
  try {
    const { date } = req.query;
    let query = { status: { $ne: 'cancelled' } };
    if (date) query.date = new Date(date);

    const bookings = await Reservation.find(query).populate('userId', 'name email').sort({ startTime: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

