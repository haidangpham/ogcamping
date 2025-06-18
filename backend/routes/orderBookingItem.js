const express = require('express');
const router = express.Router();
const OrderBookingItem = require('../models/orderBookingItem');

/**
 * @swagger
 * /order-booking-items:
 *   post:
 *     summary: Create a new order booking item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_booking_id:
 *                 type: string
 *               item_type:
 *                 type: string
 *               item_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unit_price:
 *                 type: number
 *               total_price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order booking item created successfully
 */
router.post('/', async (req, res) => {
  try {
    const orderBookingItem = new OrderBookingItem(req.body);
    await orderBookingItem.save();
    res.status(201).json(orderBookingItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;