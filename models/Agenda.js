import mongoose from 'mongoose';

const AgendaSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['진행중', '종료'], default: '진행중' },
  votes: {
    찬성: { type: Number, default: 0 },
    반대: { type: Number, default: 0 },
    기권: { type: Number, default: 0 },
  },
});

export default mongoose.models.Agenda || mongoose.model('Agenda', AgendaSchema);
