const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Create a new rental
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               gear_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rental created successfully
 */
router.post('/', async (req, res) => {
  try {
    const rental = new Rental(req.body);
    await rental.save();
    res.status(201).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;