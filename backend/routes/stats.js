const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Booking = require('../models/booking');
const authenticateToken = require('../middleware/auth'); // Fixed import
const mongoose = require('mongoose');

/**
 * @swagger
 * /stats:
 *   get:
 *     summary: Get statistics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Time period (month, week)
 *     responses:
 *       200:
 *         description: Statistics data
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { role, userId } = req.user;
    const { period = 'month' } = req.query;
    let stats = [];
    let startDate;

    if (period === 'week') {
      startDate = new Date(new Date().setDate(new Date().getDate() - 7));
    } else {
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    }

    const previousStartDate = period === 'week'
      ? new Date(new Date().setDate(new Date().getDate() - 14))
      : new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);

    if (role === 'admin') {
      const totalUsers = await User.countDocuments();
      const bookingsCurrent = await Booking.countDocuments({ created_at: { $gte: startDate } });
      const bookingsPrevious = await Booking.countDocuments({
        created_at: { $gte: previousStartDate, $lt: startDate }
      });
      const revenueCurrent = await Booking.aggregate([
        { $match: { created_at: { $gte: startDate } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);
      const revenuePrevious = await Booking.aggregate([
        { $match: { created_at: { $gte: previousStartDate, $lt: startDate } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);
      const averageRating = await Booking.aggregate([
        { $match: { status: 'completed', created_at: { $gte: startDate } } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } },
      ]);

      const bookingChange = bookingsPrevious
        ? ((bookingsCurrent - bookingsPrevious) / bookingsPrevious * 100).toFixed(1)
        : '0';
      const revenueChange = revenuePrevious[0]?.total
        ? ((revenueCurrent[0]?.total - revenuePrevious[0]?.total) / revenuePrevious[0]?.total * 100).toFixed(1)
        : '0';

      stats = [
        {
          title: 'Tổng khách hàng',
          value: totalUsers.toString(),
          change: '+0%',
          icon: 'Users',
          color: 'text-blue-600'
        },
        {
          title: 'Đơn hàng tháng này',
          value: bookingsCurrent.toString(),
          change: `${bookingChange}%`,
          icon: 'ShoppingCart',
          color: 'text-green-600'
        },
        {
          title: 'Doanh thu tháng',
          value: `${(revenueCurrent[0]?.total / 1_000_000 || 0).toFixed(1)}M`,
          change: `${revenueChange}%`,
          icon: 'DollarSign',
          color: 'text-yellow-600'
        },
        {
          title: 'Đánh giá TB',
          value: (averageRating[0]?.avgRating || 0).toFixed(1),
          change: '+0.2',
          icon: 'Star',
          color: 'text-purple-600'
        },
      ];
    } else {
      const userBookings = await Booking.countDocuments({ user_id: userId });
      const equipmentRentals = await Booking.countDocuments({ user_id: userId, service: { $regex: 'Thuê', $options: 'i' } });
      const points = (await Booking.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]))[0]?.total / 1000 || 0;
      const averageRating = await Booking.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId), status: 'completed' } },
        { $group: { _id: null, avgRating: { $avg: '$rating' } } },
      ]);

      stats = [
        { title: 'Chuyến đi đã đặt', value: userBookings.toString(), change: '+0%', icon: 'Calendar', color: 'text-blue-600' },
        { title: 'Thiết bị đã thuê', value: equipmentRentals.toString(), change: '+0%', icon: 'Package', color: 'text-green-600' },
        { title: 'Điểm tích lũy', value: points.toLocaleString(), change: '+0%', icon: 'Star', color: 'text-yellow-600' },
        { title: 'Đánh giá trung bình', value: (averageRating[0]?.avgRating || 0).toFixed(1), change: '+0%', icon: 'TrendingUp', color: 'text-purple-600' },
      ];
    }

    res.json({ stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;