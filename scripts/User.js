const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
