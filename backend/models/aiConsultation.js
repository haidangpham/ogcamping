const mongoose = require('mongoose');

const aiConsultationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  keyword: { type: String, required: true },
  user_question: { type: String },
  preferences: { type: String },
  recommended_package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
  created_at: { type: Date, default: Date.now }
});

const AIConsultation = mongoose.model('AIConsultation', aiConsultationSchema);

module.exports = AIConsultation;