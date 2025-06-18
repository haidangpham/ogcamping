const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item_type: { type: String, required: true },
  item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  added_at: { type: Date, default: Date.now }
}, {
  comment: 'Cart for multiple product types: gear or package'
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;