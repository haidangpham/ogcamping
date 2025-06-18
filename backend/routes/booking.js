// D:\Project4\ogcamping\backend\routes\booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const authenticateToken = require('../middleware/auth');
const restrictToAdmin = require('../middleware/restrictToAdmin');

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings (admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   service:
 *                     type: string
 *                   date:
 *                     type: string
 *                   image:
 *                     type: string
 *                   status:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   rating:
 *                     type: number
 *                   created_at:
 *                     type: string
 *       403:
 *         description: Admin access required
 */
router.get('/', authenticateToken, restrictToAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user_id', 'name email').select('-__v');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /bookings/user:
 *   get:
 *     summary: Get bookings for the authenticated user
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   service:
 *                     type: string
 *                   date:
 *                     type: string
 *                   image:
 *                     type: string
 *                   status:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   rating:
 *                     type: number
 *                   created_at:
 *                     type: string
 */
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.user.userId }).select('-__v');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *               date:
 *                 type: string
 *               image:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { service, date, image, amount } = req.body;
    if (!service || !date || !amount) {
      return res.status(400).json({ error: 'Required fields: service, date, amount' });
    }
    const booking = new Booking({
      user_id: req.user.userId,
      service,
      date,
      image,
      amount,
      status: 'pending',
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;