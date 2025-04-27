const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  hasVoted: { type: Boolean, default: false },
});

// Next.js dev 서버에서 모델 재정의 방지용
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
