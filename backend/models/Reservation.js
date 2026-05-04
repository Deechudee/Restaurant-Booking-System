const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  tableIds: [
    {
      type: String
    }
  ],
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  }
}, { timestamps: true });

// Indexes for queries
reservationSchema.index({ userId: 1 });
reservationSchema.index({ startTime: 1, endTime: 1 });
reservationSchema.index({ tableIds: 1 });

module.exports = mongoose.model("Reservation", reservationSchema);