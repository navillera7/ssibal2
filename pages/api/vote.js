import connectDB from '@/lib/db';
import User from '@/models/User';
import Vote from '@/models/Vote';
import Agenda from '@/models/Agenda';
import sendMail from '@/lib/mailer';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { code, choice } = req.body;

    const user = await User.findOne({ code });
    if (!user || user.hasVoted) {
      return res.status(400).json({ success: false, message: '잘못된 접근입니다.' });
    }

    const agenda = await Agenda.findOne();

    // 🔥 추가: 이미 종료된 안건이면 막기
    if (agenda.status === '종료') {
      return res.status(400).json({ success: false, message: '투표가 이미 종료되었습니다.' });
    }

    // 아직 진행중이면 투표 저장
    await Vote.create({ userCode: code, choice });
    user.hasVoted = true;
    await user.save();

    agenda.votes[choice]++;
    await agenda.save();

    // 투표 반영 후 즉시 과반수 체크
    const totalVotes = await User.countDocuments();
    const 찬성비율 = (agenda.votes['찬성'] / totalVotes) * 100;
    const 반대기권비율 = ((agenda.votes['반대'] + agenda.votes['기권']) / totalVotes) * 100;

    if (찬성비율 > 50 || 반대기권비율 > 50) {
      if (agenda.status === '진행중') {
        //agenda.status = '종료';
        await agenda.save();
        await sendMail(agenda);
        console.log('✅ 과반수 달성, 이메일 발송 완료');
      }
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ success: false, message: '허용되지 않은 메서드입니다.' });
  }
}
