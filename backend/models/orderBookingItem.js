const mongoose = require('mongoose');

const orderBookingItemSchema = new mongoose.Schema({
  order_booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderBooking', required: true },
  item_type: { type: String, required: true },
  item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  total_price: { type: Number, required: true }
}, {
  comment: 'Details of each item in an order'
});

const OrderBookingItem = mongoose.model('OrderBookingItem', orderBookingItemSchema);

module.exports = OrderBookingItem;