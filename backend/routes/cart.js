const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add an item to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               item_type:
 *                 type: string
 *               item_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart item added successfully
 */
router.post('/', async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;