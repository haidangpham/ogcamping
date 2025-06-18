const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['customer', 'staff', 'manager', 'guide', 'admin'], default: 'customer' },
  department: { type: String },
  joinDate: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  agreeMarketing: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);