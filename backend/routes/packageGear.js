const express = require('express');
const router = express.Router();
const PackageGear = require('../models/packageGear');

/**
 * @swagger
 * /package-gears:
 *   post:
 *     summary: Create a new package-gear association
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               package_id:
 *                 type: string
 *               gear_id:
 *                 type: string
 *               gear_quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Package-gear association created successfully
 */
router.post('/', async (req, res) => {
  try {
    const packageGear = new PackageGear(req.body);
    await packageGear.save();
    res.status(201).json(packageGear);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;