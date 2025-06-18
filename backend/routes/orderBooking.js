const express = require('express');
const router = express.Router();
const OrderBooking = require('../models/orderBooking');

/**
 * @swagger
 * /order-bookings:
 *   post:
 *     summary: Create a new order booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               status:
 *                 type: string
 *               total_price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order booking created successfully
 */
router.post('/', async (req, res) => {
  try {
    const orderBooking = new OrderBooking(req.body);
    await orderBooking.save();
    res.status(201).json(orderBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;