const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  partySize: {
    type: Number,
    required: true
  },
  requestedStartTime: {
    type: Date,
    required: true
  },
  priorityScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['waiting', 'assigned', 'cancelled'],
    default: 'waiting'
  }
}, { timestamps: true });

waitlistSchema.index({ userId: 1 });
waitlistSchema.index({ requestedStartTime: 1 });
waitlistSchema.index({ priorityScore: -1 });

module.exports = mongoose.model("Waitlist", waitlistSchema);

