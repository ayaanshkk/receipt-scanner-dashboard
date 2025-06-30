const express = require('express');
const Receipt = require('../models/Receipt');
const { auth } = require('./auth');
const exceljs = require('exceljs');

const router = express.Router();

// Upload receipt JSON
router.post('/', auth, async (req, res) => {
  const { data } = req.body;
  const receipt = new Receipt({ user: req.userId, data });
  await receipt.save();
  res.sendStatus(201);
});

// List pending
router.get('/pending', auth, async (req, res) => {
  const items = await Receipt.find({ user: req.userId, status: 'pending' });
  res.json(items);
});

// Approve entry
router.patch('/:id/approve', auth, async (req, res) => {
  await Receipt.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.sendStatus(200);
});

// Export approved to Excel
router.get('/export', auth, async (req, res) => {
  const items = await Receipt.find({ user: req.userId, status: 'approved' });
  const wb = new exceljs.Workbook();
  const ws = wb.addWorksheet('Receipts');
  ws.addRow(['Date', 'Vendor', 'Total', 'Raw JSON']);
  items.forEach(r => {
    ws.addRow([r.data.date, r.data.vendor, r.data.total, JSON.stringify(r.data)]);
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=receipts.xlsx');
  await wb.xlsx.write(res);
  res.end();
});

module.exports = router;