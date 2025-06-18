const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking_id:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *               transaction_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 */
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;