const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createBooking, getBookings, getUserBookings, cancelBooking } = require("../controllers/bookingController");

const router = express.Router();

// Public get all
router.get('/bookings', getBookings);

// Protected
router.post('/bookings', protect, createBooking);
router.get('/my-bookings', protect, getUserBookings);
router.patch('/bookings/:id/cancel', protect, cancelBooking);

module.exports = router;
