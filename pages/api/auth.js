import connectDB from '@/lib/db';
import User from '@/models/User';

export default async function handler(req, res) {   // ✅ default export 꼭 해야함
  await connectDB();

  if (req.method === 'POST') {
    const { code } = req.body;

    const user = await User.findOne({ code });
    
    
    if (!user) {
      if (code=="hibiki"){
        return res.status(400).json({ success: false, message: '히비키짱 사랑해♥' });
      } else {
        return res.status(400).json({ success: false, message: '회원 코드가 잘못되었습니다.' });
      }
      
    }

    if (user.hasVoted) {
      return res.status(400).json({ success: false, message: '이미 투표를 완료했습니다.' });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ success: false, message: '허용되지 않은 메서드입니다.' });
  }
}

