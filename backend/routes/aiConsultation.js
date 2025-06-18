const express = require('express');
const router = express.Router();
const AIConsultation = require('../models/aiConsultation');

/**
 * @swagger
 * /ai-consultations:
 *   post:
 *     summary: Create an AI consultation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               keyword:
 *                 type: string
 *               user_question:
 *                 type: string
 *               preferences:
 *                 type: string
 *               recommended_package_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: AI consultation created successfully
 */
router.post('/', async (req, res) => {
  try {
    const consultation = new AIConsultation(req.body);
    await consultation.save();
    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;