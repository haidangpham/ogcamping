const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gear_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gear', required: true },
  quantity: { type: Number, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, required: true }
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;