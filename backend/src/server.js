require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routers
const authRouter = require('./routes/auth');
const receiptsRouter = require('./routes/receipts');
const analyticsRouter = require('./routes/analytics');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRouter);
app.use('/api/receipts', receiptsRouter);
app.use('/api/analytics', analyticsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));