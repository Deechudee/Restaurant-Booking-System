const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

router.post("/book", async (req, res) => {
    try {
        const { name, guests, date, time, table } = req.body;

        // Check if table is already booked for the same date and time
        const existing = await Booking.findOne({ date: new Date(date), time, table });
        if (existing) {
            return res.status(409).json({ message: `Table ${table} is already booked for this date and time.` });
        }

        const booking = new Booking({ name, guests, date: new Date(date), time, table });
        const saved = await booking.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/bookings", async (req, res) => {
    try {
        const { date } = req.query;
        let query = {};
        if (date) {
            query.date = new Date(date);
        }
        const bookings = await Booking.find(query).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

