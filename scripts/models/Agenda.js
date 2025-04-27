const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['진행중', '종료'], default: '진행중' },
  votes: {
    찬성: { type: Number, default: 0 },
    반대: { type: Number, default: 0 },
    기권: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Agenda', AgendaSchema);
