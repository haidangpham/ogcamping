// D:\Project4\ogcamping\backend\routes\package.js
const express = require('express');
const router = express.Router();
const Package = require('../models/package');
const authenticateToken = require('../middleware/auth');
const restrictToAdmin = require('../middleware/restrictToAdmin');

/**
 * @swagger
 * /packages:
 *   get:
 *     summary: Get all packages
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   image:
 *                     type: string
 *                   days:
 *                     type: number
 *                   food_type:
 *                     type: string
 *                   tent_type:
 *                     type: string
 *                   activities:
 *                     type: string
 *                   max_people:
 *                     type: number
 *                   available_slots:
 *                     type: number
 *                   price:
 *                     type: number
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const packages = await Package.find().select('-__v');
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Create a new package (admin only)
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *               days:
 *                 type: number
 *               food_type:
 *                 type: string
 *               tent_type:
 *                 type: string
 *               activities:
 *                 type: string
 *               max_people:
 *                 type: number
 *               available_slots:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Package created successfully
 *       400:
 *         description: Invalid data
 *       403:
 *         description: Admin access required
 */
router.post('/', authenticateToken, restrictToAdmin, async (req, res) => {
  try {
    const { name, location, image, days, food_type, tent_type, activities, max_people, available_slots, price } = req.body;
    if (!name || !location || !days || !max_people || !available_slots || !price) {
      return res.status(400).json({ error: 'Required fields: name, location, days, max_people, available_slots, price' });
    }
    const pkg = new Package({
      name,
      location,
      image,
      days,
      food_type,
      tent_type,
      activities,
      max_people,
      available_slots,
      price,
    });
    await pkg.save();
    res.status(201).json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /packages/{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Package ID
 *     responses:
 *       200:
 *         description: Package details
 *       404:
 *         description: Package not found
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id).select('-__v');
    if (!pkg) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;