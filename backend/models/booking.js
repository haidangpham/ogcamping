const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], required: true },
  amount: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5 },
  created_at: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;