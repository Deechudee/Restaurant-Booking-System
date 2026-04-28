const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    table: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Booking", bookingSchema);

