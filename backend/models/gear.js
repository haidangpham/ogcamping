const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  quantity_in_stock: { type: Number, required: true },
  image: { type: String },
  available: { type: Number, default: 0 },
  price_per_day: { type: Number, required: true },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'available', enum: ['available', 'out_of_stock'] },
  created_at: { type: Date, default: Date.now },
});

const Gear = mongoose.model('Gear', gearSchema);

module.exports = Gear;