const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  payment_method: { type: String, required: true },
  payment_date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  transaction_id: { type: String, required: true, unique: true }
}, {
  comment: 'Records payment for each booking'
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;