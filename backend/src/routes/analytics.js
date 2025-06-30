const express = require('express');
const Receipt = require('../models/Receipt');
const { auth } = require('./auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const totalCount = await Receipt.countDocuments({ user: req.userId });
  const approvedCount = await Receipt.countDocuments({ user: req.userId, status: 'approved' });
  const pendingCount = totalCount - approvedCount;

  // Example: monthly spend
  const agg = await Receipt.aggregate([
    { $match: { user: req.userId, status: 'approved' } },
    { $group: { _id: { $month: '$createdAt' }, sum: { $sum: '$data.total' } } },
    { $sort: { _id: 1 } }
  ]);
  res.json({ totalCount, approvedCount, pendingCount, monthlySpend: agg });
});

module.exports = router;