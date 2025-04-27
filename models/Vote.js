import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  userCode: { type: String, required: true },
  choice: { type: String, enum: ['찬성', '반대', '기권'], required: true },
});

export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema);
