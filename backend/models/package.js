const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  days: { type: Number, required: true },
  food_type: { type: String },
  tent_type: { type: String },
  activities: { type: String },
  max_people: { type: Number, required: true },
  available_slots: { type: Number, required: true },
  price: { type: Number, required: true }
});
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;