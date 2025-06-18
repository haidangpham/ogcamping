
const express = require('express');
const router = express.Router();
const Gear = require('../models/gear');
const authenticateToken = require('../middleware/auth');
const restrictToAdmin = require('../middleware/restrictToAdmin');
const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for JPEG/PNG
const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ hỗ trợ file JPEG hoặc PNG'), false);
  }
};

// Multer setup
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

/**
 * @swagger
 * /gears:
 *   get:
 *     summary: Get all gears (admin only)
 *     tags: [Gears]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of gears
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
 *                   category:
 *                     type: string
 *                   description:
 *                     type: string
 *                   quantity_in_stock:
 *                     type: number
 *                   image:
 *                     type: string
 *                   available:
 *                     type: number
 *                   price_per_day:
 *                     type: number
 *                   total:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: [available, out_of_stock]
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
router.get('/', authenticateToken, restrictToAdmin, async (req, res) => {
  try {
    const gears = await Gear.find();
    res.json(gears);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /gears:
 *   post:
 *     summary: Create a new gear (admin only)
 *     tags: [Gears]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the gear
 *               category:
 *                 type: string
 *                 description: Category of the gear (e.g., Lều, Túi ngủ)
 *               description:
 *                 type: string
 *                 description: Optional description of the gear
 *               quantity_in_stock:
 *                 type: number
 *                 description: Total stock quantity
 *               available:
 *                 type: number
 *                 description: Available quantity for rent
 *               price_per_day:
 *                 type: number
 *                 description: Rental price per day (VND)
 *               status:
 *                 type: string
 *                 enum: [available, out_of_stock]
 *                 description: Gear status
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG/PNG, max 5MB)
 *             required:
 *               - name
 *               - category
 *               - quantity_in_stock
 *               - available
 *               - price_per_day
 *               - status
 *               - image
 *     responses:
 *       201:
 *         description: Gear created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 description:
 *                   type: string
 *                 quantity_in_stock:
 *                   type: number
 *                 image:
 *                   type: string
 *                 available:
 *                   type: number
 *                 price_per_day:
 *                   type: number
 *                 total:
 *                   type: number
 *                 status:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticateToken, restrictToAdmin, upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      quantity_in_stock,
      available,
      price_per_day,
      status,
    } = req.body;

    if (!name || !category || !quantity_in_stock || !available || !price_per_day || !status) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ các trường bắt buộc' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Vui lòng tải lên hình ảnh' });
    }

    const availableNum = Number(available);
    const quantityInStockNum = Number(quantity_in_stock);
    const pricePerDayNum = Number(price_per_day);

    if (isNaN(availableNum) || isNaN(quantityInStockNum) || isNaN(pricePerDayNum)) {
      return res.status(400).json({ error: 'Các trường số phải là số hợp lệ' });
    }

    if (availableNum > quantityInStockNum) {
      return res.status(400).json({ error: 'Số lượng có sẵn không thể lớn hơn số lượng tồn kho' });
    }

    if (!['available', 'out_of_stock'].includes(status)) {
      return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
    }

    const gear = new Gear({
      name,
      category,
      description,
      quantity_in_stock: quantityInStockNum,
      image: `/uploads/${req.file.filename}`,
      available: availableNum,
      price_per_day: pricePerDayNum,
      status,
      total: quantityInStockNum, // Set total to quantity_in_stock
    });

    await gear.save();
    res.status(201).json(gear);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
