const mongoose = require('mongoose');

const orderBookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: String, required: true },
  total_price: { type: Number, required: true }
});

const OrderBooking = mongoose.model('OrderBooking', orderBookingSchema);

module.exports = OrderBooking;