const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);