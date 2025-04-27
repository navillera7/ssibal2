import connectDB from '@/lib/db';
import Agenda from '@/models/Agenda';

export default async function handler(req, res) {
  await connectDB();

  const agenda = await Agenda.findOne();

  const totalVotes = agenda.votes['찬성'] + agenda.votes['반대'] + agenda.votes['기권'];

  const 찬성비율 = (agenda.votes['찬성'] / totalVotes) * 100;
  const 반대기권비율 = ((agenda.votes['반대'] + agenda.votes['기권']) / totalVotes) * 100;

  const shouldEnd = 찬성비율 > 50 || 반대기권비율 > 50;

  res.status(200).json({
    agenda,
    shouldEnd,
  });
}
