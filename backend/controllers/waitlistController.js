const Waitlist = require("../models/Waitlist");
const Reservation = require("../models/Reservation");
const { allocateTables } = require("../utils/tableService");
const User = require("../models/User");

// ADD TO WAITLIST
exports.addToWaitlist = async (req, res) => {
  try {
    const { partySize, requestedStartTime } = req.body;
    const userId = req.user._id;

    // Calc priority: base + frequent user bonus
    const user = await User.findById(userId);
    const priorityScore = 1 + (user.bookingsCount * 0.5); // Simple

    const entry = new Waitlist({
      userId,
      partySize,
      requestedStartTime: new Date(requestedStartTime),
      priorityScore
    });

    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PROMOTE FROM WAITLIST (called on cancel)
exports.promoteWaitlist = async (req, res) => {
  try {
    const topEntry = await Waitlist.findOne({ status: 'waiting' }).sort({ priorityScore: -1, createdAt: 1 });
    if (!topEntry) return res.json({ message: 'No waitlist' });

    const date = topEntry.requestedStartTime;
    const start = date;
    const end = new Date(start.getTime() + 90 * 60000); // Assume 90min

    const alloc = await allocateTables(topEntry.partySize, date.toISOString().split('T')[0], start, end);
    if (!alloc) return res.json({ message: 'Still no tables' });

    // Create reservation
    const reservation = new Reservation({
      userId: topEntry.userId,
      guests: topEntry.partySize,
      tableIds: alloc.tableIds,
      date,
      startTime: start,
      endTime: end,
      status: 'confirmed'
    });
    await reservation.save();

    // Remove from waitlist
    topEntry.status = 'assigned';
    await topEntry.save();

    // Socket notify

    res.json({ promoted: reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET WAITLIST
exports.getWaitlist = async (req, res) => {
  const waitlist = await Waitlist.find({ status: 'waiting' }).populate('userId', 'name email').sort({ priorityScore: -1 });
  res.json(waitlist);
};

